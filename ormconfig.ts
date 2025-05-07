import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

// Load env file
dotenv.config({ path: '.env' });

const port: number = parseInt(process.env.DB_PORT || '5432');


const ormConfig: DataSourceOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [
        './src/data/entities/*.entity{.ts,.js}'
    ],
    migrations: [
        './src/data/migrations/*.ts'
    ],
    subscribers: [
        './src/data/subscribers/*.subscriber{.ts,.js}'
    ],
    migrationsRun: false
};

const dataSource = new DataSource(ormConfig);

export default dataSource;