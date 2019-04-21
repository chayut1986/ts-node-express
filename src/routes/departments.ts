

import * as express from 'express';
import { Router, Request, Response } from 'express';
import { DepartmentModel } from '../models/department';

import * as HttpStatus from 'http-status-codes';

const departmentModel = new DepartmentModel();

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {

    let db = req.db;

    try {
        let rs = await departmentModel.getDepartmentList(db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }


});

router.get('/', async (req: Request, res: Response) => {

    let db = req.db;

    try {
        let rs = await departmentModel.getDepartmentList(db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }


});



export default router;