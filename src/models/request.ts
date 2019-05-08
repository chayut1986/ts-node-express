import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('requests')
      .insert(data);
  }

  updateRequest(db: Knex, data: any, requestId: any) {
    return db('requests')
      .where('request_id', requestId)
      .update(data);
  }

  removeRequest(db: Knex, requestId: any) {
    return db('requests').where('request_id', requestId).del();
  }

  getDetail(db: Knex, requestId: any) {
    return db('requests').where('request_id', requestId);
  }

  getList(db: Knex, userId: any) {  // , limit: number, offset: number
    return db('requests as r')
      .select('r.*', 'rc.request_category_name', 'rs.request_status_name', 'rs.color')
      .where('r.user_id', userId)
      .leftJoin('request_categories as rc', 'rc.request_category_id', 'r.request_category_id')
      .leftJoin('request_status as rs', 'rs.request_status_id', 'r.request_status_id')
      // .limit(limit)
      // .offset(offset)
      .orderBy('r.request_date');
  }

  getTotal(db: Knex, userId: any) {
    return db('requests').where('user_id', userId)
      .select(db.raw('count(*) as total'));
  }

  getRequestLogs(db: Knex, requestId: any) {
    let sql = `
    select l.*, u.first_name, u.last_name
    from request_logs as rl
    inner join users as u on u.user_id=rl.user_id
    where rl.request_id=?
    `;

    return db.raw(sql, [requestId]);
  }

}