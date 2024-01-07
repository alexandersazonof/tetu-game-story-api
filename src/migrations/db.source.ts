import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { config } from 'dotenv';

config();

let connectionOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432, // Don't forget to cast to number with +
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["src/models/*{.ts,.js}"],
  migrations: ["src/migrations/data/*{.ts,.js}"],
};

export default new DataSource({
  ...connectionOptions,
});