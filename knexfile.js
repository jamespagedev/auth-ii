// Update with your config settings.

module.exports = {

  development: {
    connection: { filename: './data/auth.sqlite3' },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './data/seeds' },
    useNullAsDefault: true, // used to avoid warning on console
  }
};
