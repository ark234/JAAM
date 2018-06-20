// Import dependencies
const Issue = require('../models/issue.js');
const router = require('express').Router();

// Import auth
const auth = require('../services/auth.js');

// getting all issues
router.get(
	'/',
	auth.restrict, // Middleware that redirects unauthenticated users to login
	Issue.getIssues,
	(req, res, next) => {
		console.log('getIssues route hit');
		res.json(res.locals.issueData);
	}
);

// getting one issue by id
router.get(
  '/:id',
  auth.restrict, // Middleware that redirects unauthenticated users to login
  Issue.findById,
  (req, res, next) => {
    console.log('findById issue route hit');
    res.json(res.locals.issueData);
  }
);

// posting a new issue
router.post(
  '/',
  auth.restrict, // Middleware that redirects unauthenticated users to login
  Issue.addIssue,
  (req, res, next) => {
    console.log('addIssue route hit');
    res.json(res.locals.issueData);
  }
);

// editing existing issue
router.put(
  '/:id',
  auth.restrict, // Middleware that redirects unauthenticated users to login
  Issue.editIssue,
  (req, res, next) => {
    console.log('editIssue route hit');
    res.json(res.locals.issueData);
  }
);

// deleting existing issue
router.delete(
  '/:id',
  auth.restrict, // Middleware that redirects unauthenticated users to login
  Issue.deleteIssue,
  (req, res, next) => {
    console.log('deleteIssue route hit');
    res.json(res.locals.issueData);
  }
);

module.exports = router;
