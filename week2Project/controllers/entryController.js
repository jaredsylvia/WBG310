const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');
const Interests = require('../models/interests');

module.exports = function (db) {
  const formDataModel = new FormData(db);
  const interestsModel = new Interests(db);

  // Route to display the full entry for a given ID
  router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
      // Retrieve the entry by ID using the formDataModel's getById function
      const entry = await formDataModel.getById(id);
      if (!entry) {
        res.status(404).send('Entry not found');
        return;
      }

      // Retrieve all entries from the database using the formDataModel's getAll function
      const entries = await formDataModel.getAll();

      // Retrieve all interests from the database using the interestsModel's getAll function
      const interests = await interestsModel.getAll();

      // Retrieve the interests for the current entry using the formDataModel's getInterests function
      const entryInterests = await formDataModel.getInterests(id);

      res.render('pages/index', {
        entry: entry,
        entries: entries,
        interests: interests,
        entryInterests: entryInterests,
        page: 'entry',
        pageTitle: 'Jared Sylvia',
        title: `Message ${id}`
      });
    } catch (err) {
      console.error('Error retrieving entry from the database:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
