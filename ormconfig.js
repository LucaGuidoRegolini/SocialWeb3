require('dotenv').config();

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    `${
      process.env.ENV === 'production' ? 'dist' : 'src'
    }/modules/**/entities/*{.js,.ts}`,
  ],
  migrations: [
    `${
      process.env.ENV === 'production' ? 'dist' : 'src'
    }/shared/database/migrations/*{.js,.ts}`,
  ],
  seeds: [
    `${
      process.env.ENV === 'production' ? 'dist' : 'src'
    }/database/seeds/*{.js,.ts}`,
  ],
  cli: {
    migrationsDir: `${
      process.env.ENV === 'production' ? 'dist' : 'src'
    }/shared/database/migrations`,
  },
};
