const express = require('express');
const router = express.Router();

module.exports = function (db) {
  // Route to display the full entry for a given ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    // Retrieve the entry from the database for the given ID
    db.get('SELECT * FROM formData WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error retrieving entry from the database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Retrieve the interests for the current entry
        db.all(
          'SELECT name FROM interests INNER JOIN message_interests ON interests.id = message_interests.interest_id WHERE message_interests.message_id = ?',
          [id],
          (err, rows) => {
            if (err) {
              console.error('Error retrieving interests from the database:', err);
              res.status(500).send('Internal Server Error');
            } else {
              // Pass the entry and interests data to the template
              res.render('entry', { entry: row, interests: rows });
            }
          }
        );
      }
    });
  });

  return router;
};
