import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().label('Nome'),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().min(8).max(20).required().label('Senha'),
    phone: Joi.string().required().label('Telefone'),
  },
});

export const uuid = celebrate({
  [Segments.PARAMS]: {
    uuid: Joi.string().uuid().required(),
  },
});
