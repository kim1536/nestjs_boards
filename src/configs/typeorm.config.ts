import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: process.env.MYSQL_PORT || dbConfig.port,
  username: process.env.MYSQL_USER || dbConfig.username,
  password: process.env.MYSQL_PASSWORD || dbConfig.password,
  database: process.env.MYSQL_DATABASE || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
