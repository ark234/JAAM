// Import dependencies
const Issue = require('../models/issue.js');
const router = require('express').Router();

// Import auth
const auth = require('../services/auth.js');

router.post(
	'/',
	auth.restrict, // Middleware that redirects unauthenticated users to login
	Issue.getIssues,
	(req, res, next) => {
		console.log('issue route hit');
		res.json(res.locals.issueData);
	}
);

module.exports = router;
