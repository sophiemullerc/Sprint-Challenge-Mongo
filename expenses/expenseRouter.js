const router = require('express').Router();

const expenseModel = require('./expenseModel');

// add endpoints here
router
 .route(`/`)
 .get((req, res) => {
   let query = expenseModel.find({}).populate(`budget`).populate(`category`);

   query
     .then(expenses => {
       if (expenses.length === 0) {
         res.status(404).json({ error: `No expenses found!` });
       } else {
         res.status(200).json(expenses);
       }
     })
     .catch(err => {
      res.status(500).json(err);
     });
 })
 .post((req, res) => {
   // do some error checks
   if (req.body.amount === undefined) {
     res.status(400).json({ error: `Please enter an expense amount` });
     return;
   }

   if (req.body.description === undefined) {
     res.status(400).json({ error: `Please enter an expense description` });
     return;
   }

   if (req.body.budget_id === undefined) {
     res.status(400).json({ error: `Please enter an expense budget id` });
     return;
   }

   if (req.body.category_id === undefined) {
     res.status(400).json({ error: `Please enter an expense category id` });
     return;
   }

   // create a Expense Model
   const expense = new expenseModel(req.body);

   // push in the budget id and category id
   expense.budget.push(req.body.budget_id);
   expense.category.push(req.body.category_id);

   expense
     .save()
     .then(savedExpense => {
       res.status(201).json(savedExpense);
     })
     .catch(err => {
      res.status(500).json(err);
     });
 });

module.exports = router;