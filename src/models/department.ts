import * as Knex from 'knex';

export class DepartmentModel {

    getDepartment(db: Knex) {
        return db('departments').orderBy('department_name', 'DESC');
    }

    addDepartment(db: Knex, data: any) {
        return db('departments').insert(data);
    }

    updateDepartment(db: Knex, departmentId: any, departmentName: any) {
        return db('departments')
            .where('department_id', departmentId)
            .update({ department_name: departmentName });
    }

    deleteDepartment(db: Knex, departmentId: any) {
        return db('departments')
            .where('department_id', departmentId)
            .del();
    }
}