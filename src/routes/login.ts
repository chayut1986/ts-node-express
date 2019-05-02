/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { Login } from '../models/login';

import { Jwt } from '../models/jwt';

const loginModel = new Login();
const jwt = new Jwt();

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  let db = req.db;
  let username: string = req.body.username;
  let password: string = req.body.password;
  //let userTypeId: string = req.body.user_type_id;

  let encPassword = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

  let token: any = null;
  let isError: boolean = false;


  let rs: any = await loginModel.doLogin(db, username, encPassword);
  if (rs.length) {
    let playload: any = {};
    playload.id = rs[0].user_id;
    playload.fullname = rs[0].first_name + ' ' + rs[0].last_name;
    playload.userTypeName = rs[0].user_type_name;
    playload.userTypeId = rs[0].user_type_id;
    token = jwt.sign(playload);

  } else {
    isError = true;
  }

  if (isError) {
    res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง' });
  } else {
    res.send({ ok: true, token: token });
  }

});

//  staff
router.post('/user', async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  let db = req.db;

  try {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs: any = await loginModel.doLogin(db, username, encPassword);

    if (rs.length) {

      let payload = {
        fullname: `${rs[0].first_name} ${rs[0].last_name}`,
        id: rs[0].user_id,
        userTypeName: 'User'
      }

      let token = jwt.sign(payload);
      res.send({ ok: true, token: token, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Login failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

// admin
router.post('/admin', async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  let db = req.db;

  try {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs: any = await loginModel.doLogin(db, username, encPassword);

    if (rs.length) {

      let payload = {
        fullname: rs[0].fullname,
        username: username,
        userType: 'Admin'
      }

      let token = jwt.sign(payload);
      res.send({ ok: true, token: token, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Login failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

export default router;