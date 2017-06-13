
const User = require('../../models/users');

/**
 *  Get single user
 *  @return {Json}
 */
function findUser(req, res) {

  req.checkParams('userId', 'Invalid user').notEmpty();

  let errors = req.validationErrors();

  if (errors)
    return res.status(400)
              .sent({ success: false, message: 'Invalid parameters', errors: errors });

  let userId = req.params.userId;

  let exclude = '-password';

  User.findOne({ _id: userId }, exclude, (err, user) => {
    if (err) return res.status(400).send({ success: false, error: err });
    if (!user) return res.status(404).send({ success: false, error: 'User do not exists' });
    return res.status(200).send({ success: true, data: user });
  });
}

/**
 * Get all users
 * @return {Json}     Response from query
 */
function getUsers(req, res) {

  let exclude = '-password';

  req.checkBody('lastname', 'Invalid lastname').notEmpty().isString();
  req.checkBody('firstname', 'Invalid firstname').notEmpty().isString();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();

  let errors = req.validationErrors();

  if (errors)
    return res.status(400)
              .sent({ success: false, message: 'Invalid parameters', errors: errors })

  let find = {};

  if(req.query.lastname)
    find.lastname = req.query.lastname;
  if(req.query.email)
    find.email = req.query.email;
  if(req.query.firstname)
    find.firstname = req.query.firstname;


  User.find(find, exclude, (err, users) => {
    if (err) return res.status(500).send({ success: false, message: 'Internal error', error: err });
    return res.status(200).send({ success: true, data: users });
  });
}

/**
 * Update User
 * @return {Json}
 */
function updateUser(req, res) {

  req.checkBody('lastname', 'Invalid lastname').notEmpty().isString();
  req.checkBody('firstname', 'Invalid firstname').notEmpty().isString();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('membershipType', 'Invalid Membership Type').notEmpty().isString();
  req.checkBody('accountNumber', 'Invalid Membership Type').notEmpty();
  req.checkBody('password', 'Invalid Membership Type').notEmpty().isString();

  req.checkParams('userId', 'Invalid user').notEmpty();

  let errors = req.validationErrors();

  if (errors)
    return res.status(400)
              .sent({ success: false, message: 'Invalid parameters', errors: errors });

  let userId = req.params.userId;
  let data = req.body;

  User.findByIdAndUpdate(userId, data, (err, user) => {
    if (err) return res.status(400).send({ success: false, error: err });
    return res.status(201).send({ success: true, data: user });
  });
}

/**
 * Create User
 * @return {Json}
 */
function createUser(req, res) {

  req.checkBody('lastname', 'Invalid lastname').notEmpty().isString();
  req.checkBody('firstname', 'Invalid firstname').notEmpty().isString();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('membershipType', 'Invalid Membership Type').notEmpty().isString();
  req.checkBody('accountNumber', 'Invalid Membership Type').notEmpty();
  req.checkBody('password', 'Invalid Membership Type').notEmpty().isString();

  let errors = req.validationErrors();

  if (errors)
    return res.status(400)
              .sent({ success: false, message: 'Invalid parameters', errors: errors });

  let data = req.body;

  User.create(data, (err, user) => {
    if (err) return res.status(500).send({ success: false, message: 'Internal Error', error: err });
    return res.status(201).send({ success: true, data: user });
  });
}

/**
 *  Remove user
 * @return {Json}
 */
function deleteUser(req, res) {

  req.checkParams('userId', 'Invalid user').notEmpty();

  let errors = req.validationErrors();

  if (errors)
    return res.status(400)
              .sent({ success: false, message: 'Invalid parameters', errors: errors });

  let userId = req.params.userId;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(400).send({ success: false, error: err });
    if (!user) return res.status(202).send({ success: false, error: 'This user do not exits' });

    user.remove((err) => {
      if (err) return res.status(400).send({ success: false, error: err });
      return res.status(201).send({ success: true, message: 'User deleted' });
    });
  });
}

// export controller
module.exports = {
  findUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
