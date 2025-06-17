const Joi = require('joi');

exports.budgetSchema = Joi.object({
  totalBudget: Joi.number().positive().required(),
  salary: Joi.number().positive().required(),
  categoryBudgets: Joi.array().items(
    Joi.object({
      category: Joi.string().required(),
      amount: Joi.number().positive().required()
    })
  ).required()
});

exports.budgetUpdateSchema = Joi.object({
  category: Joi.string().min(2).max(50).required(),
  amount: Joi.number().precision(2).positive().required()
});
