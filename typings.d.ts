import * as Knex from 'knex';

declare module 'express' {
  interface Request {
    db: any;
    knex: Knex;
    decoded: any;
    io: any;

  }



}

declare global {
  namespace Express {

    export interface Application {
      io: any;
    }
  }
}



