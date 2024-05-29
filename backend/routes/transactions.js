const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const verifyUser = require("../middlewares/verifyUser");

const router = require("express").Router();

router
  .post("/add-income", verifyUser, addIncome)
  .get("/get-incomes", verifyUser, getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", verifyUser, addExpense)
  .get("/get-expenses", verifyUser, getExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
