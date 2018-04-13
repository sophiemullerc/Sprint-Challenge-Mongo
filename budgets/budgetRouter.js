const router = require('express').Router();

const budgetModel = require('./budgetModel');

// add endpoints here
router
  .route(`/`)
  .get((req, res) => {
    let query = budgetModel.find({});

    query
      .then(budgets => {
        if (budgets.length === 0) {
          res.status(404).json({ error: `No budgets found!` });
        } else {
          res.status(200).json(budgets);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    // do some error checks
    if (req.body.title === undefined) {
      res.status(400).json({ error: `Please enter a budget title` });
      return;
    }

    if (req.body.budgetAmount === undefined) {
      res.status(400).json({ error: `Please enter a budget amount` });
      return;
    }

    // create a budget Model
    const budget = new budgetModel(req.body);

    budget
      .save()
      .then(savedBudget => {
        res.status(201).json(savedBudget);
      })
      .catch(err => {
        res.status(500).json(err);
      });
    
});

module.exports = router;