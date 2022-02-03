import { Joi, Segments, celebrate } from 'celebrate';

export const uuid = celebrate({
  [Segments.PARAMS]: {
    uuid: Joi.string().uuid().required(),
  },
});

export const create = celebrate({
  [Segments.BODY]: {
    followUuid: Joi.string().uuid().required(),
  },
});

export const pages = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(60).default(10),
  },
});
