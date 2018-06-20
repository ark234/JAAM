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
	// CODE GOES HERE
};

module.exports = issueModel;
