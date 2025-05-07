module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'db'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'koros_cliente1_db'),
      user: env('DATABASE_USERNAME', 'koros_user'),
      password: env('DATABASE_PASSWORD', 'KorosSecurePass123!'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});