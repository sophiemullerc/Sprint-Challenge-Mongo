const router = require('express').Router();

const categoryModel = require('./categoryModel');

// add endpoints here
router
  .route(`/`)
  .get((req, res) => {
    let query = categoryModel.find({});

    query
      .then(categories => {
        if (categories.length === 0) {
          res.status(404).json({ error: `No categories found!` });
        } else {
          res.status(200).json(categories);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    // do some error checks
    if (req.body.title === undefined) {
      res.status(400).json({ error: `Please enter a category title` });
      return;
    }

    // create a category Model
    const category = new categoryModel(req.body);

    category
      .save()
      .then(savedCategory => {
        res.status(201).json(savedCategory);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;