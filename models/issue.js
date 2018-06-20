const db = require('../db/index.js');
const axios = require('axios');
const moment = require('moment');

const issueModel = {};
const today = moment().format('YYYY-MM-DD'); // get today's date

/**
 * Get all issues by user.
 * @param {*} req request object (location data from client)
 * @param {*} res response object (response data to client)
 * @param {*} next next middleware function
 */
issueModel.getIssues = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM issues;')
    .then(data => {
      res.locals.issueData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in issueModel.getIssues. Error:', error);
      next(error);
    });
};

issueModel.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one('SELECT * FROM issues WHERE user_id = ${id};', { id: id })
    .then(data => {
      res.locals.issueData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in issueModel.findById. Error:', error);
      next(error);
    });
};

issueModel.addIssue = (req, res, next) => {
  console.log('req.body is ', req.body);
  db
    .one(
      'INSERT INTO issues (user_id, title, description, LOCATION, date_opened, date_closed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [req.body.user_id, req.body.title, req.body.description, req.body.LOCATION, req.body.date_opened, req.body.date_closed]
    )
    .then(data => {
      res.locals.issueData = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in issueModel.addIssue pgpromise call, error:',
        err
      );
    });
};

issueModel.editIssue = (req, res, next) => {
  db
    .one(
      'UPDATE issues SET title = $1, description = $2, LOCATION = $3, date_closed = $4) WHERE id = $5 RETURNING *;',
      [req.body.title, req.body.description, req.body.LOCATION, req.body.date_closed, req.params.id]
    )
    .then(data => {
      res.locals.issueData = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in issueModel.editIssue pgpromise call, error:',
        err
      );
    });
};

issueModel.deleteIssue = (req, res, next) => {
  db
    .one('DELETE FROM issues WHERE id = $1 RETURNING *', [req.params.id])
    .then(data => {
      res.locals.issueData = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in issueModel.deleteIssue pgpromise call, error:',
        err
      );
    });
};

module.exports = issueModel;
