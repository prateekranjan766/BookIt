import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('zzzzzz', 10),
    isAdmin: true,
  },
  {
    name: 'Jill Jhonson',
    email: 'jill@gmail.com',
    password: bcrypt.hashSync('zzzzzz', 10),
  },
  {
    name: 'Sam Smith',
    email: 'sam@gmail.com',
    password: bcrypt.hashSync('zzzzzz', 10),
  },
];

export default users;
