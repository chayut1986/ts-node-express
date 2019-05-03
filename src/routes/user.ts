/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { UserModel, UserTypeModel } from '../models/user';

import { Jwt } from '../models/jwt';


const jwt = new Jwt();

const router: Router = Router();

const userModel = new UserModel();
const userTypeModel = new UserTypeModel();

// localhost:8080/api/users
router.get('/users', async (req: Request, res: Response) => {
  let db = req.db;
  try {
    let rs = await userModel.getUsers(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

})

// localhost:8080/api/users
router.get('/users/:userId', async (req: Request, res: Response) => {
  let db = req.db;
  let userId = req.params.userId;
  try {
    let rs = await userModel.getDetail(db, userId);
    res.send({ ok: true, rows: rs[0] });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

})

router.get('/users/maps/:userId', async (req: Request, res: Response) => {
  let db = req.db;
  let userId = req.params.userId;
  try {
    let rs = await userModel.getLatLng(db, userId);
    if (rs.length) {
      res.send({ ok: true, lat: rs[0].lat, lng: rs[0].lng });
    } else {
      res.send({ ok: false })
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
})

router.put('/users/maps/:userId', async (req: Request, res: Response) => {
  let db = req.db;
  let userId = req.params.userId;
  let lat = req.body.lat;
  let lng = req.body.lng;

  try {
    let rs = await userModel.updateLatLng(db, userId, lat, lng);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
})

router.get('/user-types', async (req: Request, res: Response) => {
  let db = req.db;
  try {
    let rs = await userModel.getUserTypeList(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

})

// localhost:8080/api/types
router.get('/types', async (req: Request, res: Response) => {
  let db = req.db;
  try {
    let rs = await userTypeModel.getUserTypeList(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

})

// localhost:8080/api/users
router.post('/users', async (req: Request, res: Response) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive;
  let userTypeId = req.body.userType;

  if (username && password && firstName && lastName) {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');

    let user = {
      username: username,
      password: encPassword,
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
      user_type_id: userTypeId
    }

    req.io.emit('added-user', firstName);
    req.io.emit('change-graph');

    await userModel.saveUser(req.db, user);
    res.send({ ok: true });

  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' })
  }

});

// localhost:8080/api/users/xx
router.put('/users/:userId', async (req: Request, res: Response) => {
  let db = req.db;
  let userId = req.params.userId;

  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive;
  let userTypeId = req.body.userType;

  if (userId && firstName && lastName) {

    let user: any = {
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
      user_type_id: userTypeId
    }

    if (password) {
      let encPassword = crypto.createHash('md5').update(password).digest('hex');
      user.password = encPassword;
    }

    await userModel.updateUser(db, userId, user);
    res.send({ ok: true })
  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' })
  }

});

// localhost:8080/api/users/xx
router.delete('/users/:userId', async (req: Request, res: Response) => {
  let db = req.db;
  try {
    let userId = req.params.userId;
    req.io.emit('removed-user');
    req.io.emit('change-graph');
    await userModel.removeUser(db, userId);
    res.send({ ok: true })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  }
})

export default router;