export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 8000,
  jwtSecret: process.env.JWT_SECRET_KEY ?? '123456789',
  saltOrRounds: parseInt(process.env.SALT_ROUNDS as string, 10) || 10,
  database: {
    url: process.env.MONGODB_URL ?? 'mongodb://localhost:27017/todo',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ?? true,
  },
});
