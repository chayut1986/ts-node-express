import * as Knex from 'knex';

export class DepartmentModel {

    getDepartmentList(db: Knex) {
        return db('departments')
            .orderBy('department_id', 'ASC');

    }

    addDepartment(db: Knex, data: any) {
        return db('departments')
            .insert(data);
    }

    updateDepartment(db: Knex, departmentId: any, depertmentName: any) {
        return db('departments')
            .where('deparitment_id', departmentId)
            .update({ department_name: depertmentName });
    }


    deleteDepartment(db: Knex, departmentId: any) {
        return db('departments')
            .del();
    }
}