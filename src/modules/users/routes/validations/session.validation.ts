import { Joi, Segments, celebrate } from 'celebrate';

export const login = celebrate({
  [Segments.BODY]: {
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().required().label('Senha'),
  },
});

export const refresh = celebrate({
  [Segments.BODY]: {
    refresh_token: Joi.string().required().label('Token'),
  },
});
