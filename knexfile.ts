import type { Knex } from "knex";
import { knexSetup } from "./src/config/knex";

const migrations = {
  tableName: "knex_migrations",
  extension: "ts",
};

const seeds = {
  directory: './seeds/'
}

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: knexSetup.client,
    connection: knexSetup.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
    seeds
  },

  production: {
    client: knexSetup.client,
    connection: knexSetup.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
    seeds
  },
};

export default knexConfig;
