const { user } = require('../data/setData');

const getUsers = async (req, res) => {
  const { email } = req.params;
  res.status(200).json(user.filter(v => v.email === email));
};

const add = async (req, res) => {
  const { name, age, job, email } = req.body;
  const newUsers = {
    name,
    age,
    job,
    email,
  };
  user.unshift(newUsers);
  res.status(201).json(newUsers);
};

module.exports = { getUsers, add };
