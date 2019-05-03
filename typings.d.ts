import * as Knex from 'knex';

declare module 'express' {
  export interface Request {
    db: any // Actually should be something like `multer.Body`
    knex: Knex,
    decoded: any,
    io: any // Actually should be something like `multer.Files`
  }


}



