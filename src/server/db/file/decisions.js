import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _ from 'lodash';

const filePath = path.join(__dirname, '..', '..', 'state', 'decisions.json');

export

function add(decision) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, decisionsText) => {
      if (err) {
        reject(err);
        return;
      }

      const decisions = JSON.parse(decisionsText);
      console.log(decisions);
      decisions.push(decision);
      fs.writeFile(filePath, JSON.stringify(decisions, null, '\t'), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

export

function get(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, decisions) => {
      if (err) {
        reject(err);
        return;
      }

      const decisionsJson = JSON.parse(decisions);
      const result = (typeof id === undefined) ? decisionsJson : decisionsJson.find(_.compose(_.eq(id), _.property('id')));

      resolve(result);
    });
  });
}
