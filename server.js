const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const db = require('./data/db.js')

const budgetRouter = require('./budgets/budgetRouter');
const expenseRouter = require('./expenses/expenseRouter');
const categoryRouter = require('./categories/categoryRouter');

const server = express();

// to enable json parsing
server.use(express.json());

// bring in mongoose
db
  .connectTo(`budgetdb`)
  .then(() => console.log(`\n... API Connected to Database ...\n`))
  .catch(err => console.log(`\n*** ERROR Connecting to Database ***\n`, err));

//security
server.use(helmet());

//cross origin request sharing permissions
const corsOptions = {
  origin: `*`,
  methods: `GET, HEAD, PUT, PATCH, POST, DELETE`,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
//server.use(cors(corsOptions));

// connect to the routes
server.use('/api/budgets', budgetRouter);
server.use('/api/expenses', expenseRouter);
server.use('/api/categories', categoryRouter);

// root get request
server.get(`/`, (req, res) =>
  // send a json response
  res.json({ api: `API is running successfully!!` })
);

// define a port to use
const port = 5000;

server.listen(port, () => {
  console.log(`\n\nServer up and running on ${port}`);
});

