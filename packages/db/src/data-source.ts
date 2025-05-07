import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Book } from '../../../src/data/entities/Book.entity';
import { Copy } from '../../../src/data/entities/Copy.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Book, Copy],
  migrations: [path.join(__dirname, 'migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true
});
