const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const dbPath = __dirname + '/data/formdata.db';
//const dbPath = './data/formdata.db'; // Specify the file path for the database

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

//create tables if not exist

db.run(`
    CREATE TABLE IF NOT EXISTS formData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        newsletter TEXT NOT NULL,
        message TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS interests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS message_interests (
        message_id INTEGER,
        interest_id INTEGER,
        FOREIGN KEY (message_id) REFERENCES formData(id),
        FOREIGN KEY (interest_id) REFERENCES interests(id),
        PRIMARY KEY (message_id, interest_id)
    )
`);

// Prepopulate interests table
db.serialize(() => {
    const interests = ["Technology", "Sports", "Music", "Art", "Food"];

    interests.forEach((interest) => {
        db.get("SELECT id FROM interests WHERE name = ?", [interest], (err, row) => {
            if (err) {
                console.error('Error checking interest:', err);
            } else if (!row) {
                db.run("INSERT INTO interests (name) VALUES (?)", [interest], (err) => {
                    if (err) {
                        console.error('Error inserting interest:', err);
                    } else {
                        console.log(`Interest "${interest}" inserted successfully.`);
                    }
                });
            }
        });
    });
});



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



// Routes
const indexController = require('./controllers/indexController')(db);
app.use('/', indexController);

// Form submission route
const submitController = require('./controllers/submitController')(db);
app.use('/submit', submitController);


// Route to display the full entry for a given ID
const entryController = require('./controllers/entryController')(db);
app.use('/entry', entryController);

// Route to fetch the list of messages
app.get('/messages', (req, res) => {
    // Retrieve all entries from the database
    db.all('SELECT id, lastName FROM formData', (err, rows) => {
        if (err) {
            console.error('Error retrieving messages from the database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

// Close the database connection
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
