import { Joi, Segments, celebrate } from 'celebrate';

export const uuid = celebrate({
  [Segments.PARAMS]: {
    uuid: Joi.string().uuid().required(),
  },
});

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

export const update = celebrate({
  [Segments.BODY]: {
    name: Joi.string().label('Nome'),
    phone: Joi.string().label('Telefone'),
    avatar: Joi.string().label('Avatar'),
    coverage: Joi.string().label('Cobertura'),
  },
});
