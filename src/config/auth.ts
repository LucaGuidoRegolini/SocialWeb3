export const authConfig = {
  jwt: {
    secret: process.env.API_SECRET || 'default',
    expiresIn: '1d',
  },
  refreshToken: {
    bytesSize: 35,
    expiresIn: '864000',
  },
};
