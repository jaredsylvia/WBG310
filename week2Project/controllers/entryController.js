const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');
const Interests = require('../models/interests');
const { availableParallelism } = require('os');

module.exports = function (db, availablePages) {
  const formDataModel = new FormData(db);
  const interestsModel = new Interests(db);
  

  router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const entry = await formDataModel.getById(id);
      if (!entry) {
        res.status(404).send('Entry not found');
        return;
      }

      const entries = await formDataModel.getAll();
      const entryInterests = await formDataModel.getInterests(id);

      const relevantInterestNames = entryInterests.map(interest => interest.name);

      res.render('pages/index', {
        entry: entry,
        entries: entries,
        relevantInterests: relevantInterestNames,
        page: 'entry',
        availablePages: availablePages,
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
