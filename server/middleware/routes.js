'use strict'

module.exports = function (app, c) {

  app.get('/', c.root.getIndex);
  app.get('/version.js', c.root.getVersion);

  app.post('/api/v1/register', c.auth.register);
  app.post('/api/v1/login', c.auth.login, c.auth.postLogin);

  app.get('/api/v1/users', c.users.getUsers);
  app.head('/api/v1/users/', c.users.emailExists);
  app.head('/api/v1/users/:username', c.users.userExists);
  app.get('/api/v1/users/:username', c.users.getUser);
  app.put('/api/v1/users/:username', c.users.updateUser);

};