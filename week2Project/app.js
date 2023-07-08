const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

const db = require('./models/db');
const Interests = require('./models/interests');

// Initialize tables and insert interests
db.createTables(() => {
    const interestsModel = new Interests(db.db);
    const interests = ["Technology", "Sports", "Music", "Art", "Food"];
  
    const insertInterests = async () => {
      for (const interest of interests) {
        try {
          const existingInterest = await interestsModel.getByName(interest);
          if (!existingInterest) {
            const interestId = await interestsModel.addInterest(interest);
            console.log(`Interest "${interest}" inserted successfully with ID: ${interestId}`);
          } else {
            console.log(`Interest "${interest}" already exists in the database.`);
          }
        } catch (error) {
          console.error(`Error inserting interest "${interest}":`, error);
        }
      }
    };
  
    insertInterests();
  });

  // Set the path to the partials directory
const partialsDirectory = path.join(__dirname,  'views/partials');

// Get the list of files in the partials directory
const partialsFiles = fs.readdirSync(partialsDirectory);

// Exclude specific files
const excludedFiles = ['head.ejs', 'header.ejs', 'leftCol.ejs', 'rightCol.ejs', 'footer.ejs', 'entry.ejs'];

// Filter and transform the filenames
const availablePages = partialsFiles
  .filter(file => !excludedFiles.includes(file))
  .map(file => {
    const partialName = file.replace('.ejs', '');
    return partialName.charAt(0).toUpperCase() + partialName.slice(1);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Form submission route
const submitController = require('./controllers/submitController')(db.db, availablePages);
app.use('/submit', submitController);

// Routes
const indexController = require('./controllers/indexController')(db.db, availablePages);
app.use(['/', '/:page'], indexController);

// Route to display the full entry for a given ID
const entryController = require('./controllers/entryController')(db.db, availablePages);
app.use('/entry', entryController);

// Close the database connection
process.on('exit', () => {
  db.db.close();
  console.log('Database connection closed.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
