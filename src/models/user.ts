import * as Knex from 'knex';


export class UserModel {
  getUsers(db: Knex) {
    return db('users as u')
      .select('u.user_id', 'u.birth', 'u.sex', 'u.is_active', 'u.username', 'u.first_name', 'u.last_name', 's.name', 'ut.user_type_name')
      .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
      .leftJoin('sex as s', 'code', 'sex')
      .orderBy('u.user_id', 'DESC')

    // .limit(10)
  }

  search(db: Knex, query: any) {

    let _query = '%' + query + '%';

    return db('users as u')
      .select('u.user_id', 'u.is_active', 'u.username', 'u.first_name', 's.code', 's.name', 'u.last_name', 'ut.user_type_name')
      .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
      .leftJoin('sex as s', 'code', 'sex')
      .where(w => {
        w.where('u.username', 'like', _query)
          .orWhere('u.first_name', 'like', _query)
          .orWhere('u.last_name', 'like', _query)
          .orWhere('s.name', 'like', _query);
      })
      .limit(10)
  }

  removeUser(db: Knex, userId: any) {
    let sql = 'DELETE FROM users WHERE user_id=?'
    return db.raw(sql, [userId])
  }

  getUserTypeList(db: Knex) {
    let subQuery = db('users as u')
      .whereRaw('u.user_type_id=ut.user_type_id')
      .count('*')
      .as('total');

    return db('user_types as ut')
      .select('ut.user_type_name', subQuery);
  }

  saveUser(db: Knex, user: any) {
    return db('users').insert(user); // INSERT INTO users(xx,yy,zz) VALUES()
  }

  updateUser(db: Knex, userId: any, user: any) {
    return db('users')
      .where('user_id', userId)
      .update(user); // UPDATE users SET xx=yy WHERE user_id=xxx
  }

  updateLatLng(db: Knex, userId: any, lat: any, lng: any) {
    return db('users')
      .where('user_id', userId)
      .update({
        lat: lat,
        lng: lng
      });
  }

  getLatLng(db: Knex, userId: any) {
    return db('users')
      .select('lat', 'lng')
      .where('user_id', userId);
  }

  getDetail(db: Knex, userId: any) {
    return db('users')
      .where('user_id', userId); // SELECT * FROM users WHERE user_id=xxx
  }

  getSex(db: Knex) {
    return db('sex').select('code', 'name');

  }



  // doLogin(db: Knex, username: any, password: any) {
  //   return db('users')
  //     .select('user_id', db.raw('concat(first_name, " ", last_name) as fullname'))
  //     .where({
  //       username: username,
  //       password: password
  //     });
  // }

}

export class UserTypeModel {
  getUserTypeList(db: Knex) {
    return db('user_types').orderBy('user_type_name', 'DESC')
    // SELECT * FROM user_types ORDER BY user_type_name DESC
  }
}