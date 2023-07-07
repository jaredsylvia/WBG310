const express = require('express');
const router = express.Router();

module.exports = function(db) {
    // Route to display the index page with all entries
    router.get('/', (req, res) => {
        // Retrieve all entries from the database
        db.all('SELECT * FROM formData', (err, rows) => {
            if (err) {
                console.error('Error retrieving entries from the database:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Retrieve all interests from the database
                db.all('SELECT * FROM interests', (err, interests) => {
                    if (err) {
                        console.error('Error retrieving interests from the database:', err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.render('index', { title: 'Jared Sylvia', entries: rows, interests: interests });
                    }
                });
            }
        });
    });

    return router;
};
