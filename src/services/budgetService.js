const { Budget } = require("../models");

exports.updateBudgetAfterExpense = async (budgetId, amount) => {
    const budget = await Budget.findById(budgetId);
    if (!budget) throw new Error("Budget not found");
    budget.disbursed_amount += amount;
    budget.balance -= amount;
    await budget.save();
    return budget;
};
