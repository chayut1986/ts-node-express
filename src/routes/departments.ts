/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import { DepartmentModel } from '../models/department';

import * as HttpStatus from 'http-status-codes';
import { isNull } from 'util';

const departmentModel = new DepartmentModel();

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {

    let db = req.db;

    try {
        let rs = await departmentModel.getDepartment(db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }


});




router.post('/', async (req: Request, res: Response) => {
    let db = req.db;
    let departmentName = req.body.departmentName;

    if (departmentName) {
        try {

            let data: any = {};

            data.department_name = departmentName;

            await departmentModel.addDepartment(db, data);
            res.send({ ok: true, message: "save OK" });
        } catch (error) {
            res.send({ ok: false, message: error.message });
        }

    } else {
        res.send({ ok: false, message: 'ข้อมูลไม่ถูกต้อง แก้ไขก่อน' });
    }

});





router.put('/:departmentId', async (req: Request, res: Response) => {

    let db = req.db;

    let departmentId = req.params.departmentId;

    let departmentName = req.body.departmentName;

    if (departmentName) {
        try {
            await departmentModel.updateDepartment(db, departmentId, departmentName);
            res.send({ ok: true, message: "update OK" });
        } catch (error) {
            res.send({ ok: false, error: error.message });
        }
    } else {
        res.send({ ok: false, message: "error ตรวจสอบข้อมูลก่อน" });
    }



});

router.delete('/:departmentId', async (req: Request, res: Response) => {

    let db = req.db;

    let departmentId = req.params.departmentId;

    try {
        await departmentModel.deleteDepartment(db, departmentId);
        res.send({ ok: true, message: "delete OK" });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }


});



export default router;