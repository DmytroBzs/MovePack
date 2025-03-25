import Joi from 'joi';

export const createParcelSchema = Joi.object({
  originCity: Joi.string().min(3).max(25).required(),
  destinationCity: Joi.string().min(3).max(25).required(),
  date: Joi.string().required(),
  parcelType: Joi.string()
    .valid('gadgets', 'drinks', 'clothes', 'medicines', 'other')
    .required(),
  parcelDescription: Joi.string().min(3).optional(),
});

export const updateParcelSchema = Joi.object({
  originCity: Joi.string().min(3).max(20),
  destinationCity: Joi.string().min(3).max(20),
  date: Joi.string().min(3).max(20),
  parcelType: Joi.string().valid(
    'gadgets',
    'drinks',
    'clothes',
    'medicines',
    'other',
  ),
  parcelDescription: Joi.string().min(3).optional(),
});
