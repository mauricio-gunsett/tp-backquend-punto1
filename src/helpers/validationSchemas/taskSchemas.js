import Joi from 'joi';

export const post_taskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo title debe tener al menos 3 caracteres',
    'string.max': 'El campo title debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo title es requerido',
    '*': 'Revisa el campo title',
  }),
  description: Joi.string().trim().min(3).max(1000).required().messages({
    'string.min': 'El campo description debe tener al menos 3 caracteres',
    'string.max':
      'El campo description debe tener, como mucho, 1000 caracteres',
    'any.required': 'El campo description es requerido',
    '*': 'Revisa el campo description',
  }),
});

export const put_taskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30).messages({
    'string.min': 'El campo title debe tener al menos 3 caracteres',
    'string.max': 'El campo title debe tener, como mucho, 30 caracteres',
    '*': 'Revisa el campo title',
  }),
  description: Joi.string().trim().min(3).max(1000).messages({
    'string.min': 'El campo description debe tener al menos 3 caracteres',
    'string.max':
      'El campo description debe tener, como mucho, 1000 caracteres',
    '*': 'Revisa el campo description',
  }),
}).custom((value, helper) => {
  const { title, description } = value;
  if (!title && !description) {
    return helper.message('Al menos debe estar presente en el body');
  }
  return true;
});
