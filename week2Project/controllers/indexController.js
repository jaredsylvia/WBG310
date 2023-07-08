const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');
const Interests = require('../models/interests');




module.exports = function (db, availablePages) {
  const formDataModel = new FormData(db);
  const interestsModel = new Interests(db);
  
  
  // Route to display the index page with all entries
  router.get(['/', '/:page'], async (req, res) => {
    let page = req.params.page;
    if (page == null) {
      page = 'home';
    }
    let title = page.charAt(0).toUpperCase() + page.slice(1);

    try {
      // Retrieve all entries from the database using the model's getAll function
      const entries = await formDataModel.getAll();

      // Retrieve all interests from the database using the interests model
      const interests = await interestsModel.getAll();

      res.render('pages/index', {
        pageTitle: 'Jared Sylvia',
        title: title,
        entries: entries,
        interests: interests,
        page: page,
        availablePages: availablePages
      });
    } catch (err) {
      console.error('Error retrieving entries from the database:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
