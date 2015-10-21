import express from 'express';
import fs from 'fs';
import {
  decisions
}
from '../db/file';

const router = express.Router();

router.route('/')
  .post((req, res, next) => {

    console.log(decisions);

    decisions.add(req.body)
      .then(() => {
        console.log('yeah');
        res.status(201).end('');
      })
      .catch((err) => res.status(500).end(err.toString()));
  });

export
default router;
