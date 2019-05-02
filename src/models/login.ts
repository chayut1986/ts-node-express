import * as Knex from 'knex';

export class Login {
  doLogin(db: Knex, username: string, password: string) {
    return db('users as u')
      .select('u.user_id', 'u.first_name', 'u.last_name', 'd.department_name', 'ut.user_type_name')
      .leftJoin('departments as d', 'd.department_id', 'u.department_id')
      .leftJoin('user_types as ut', 'u.user_type_id', 'ut.user_type_id')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }

  // doAdminLogin(db: Knex, username: string, password: string) {
  //   return db('technicians as t')
  //     .select('t.technician_id', 't.first_name', 't.last_name')
  //     .where('username', username)
  //     .where('password', password)
  //     .limit(1);
  // }
}