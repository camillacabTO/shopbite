import bcryptjs from 'bcryptjs'

const users = [
  {
    name: 'Administrator',
    email: 'admin@gmail.com',
    password: bcryptjs.hashSync('12345678', 10),
    isAdmin: true
  },
  {
    name: 'Luke Doggy',
    email: 'john@gmail.com',
    password: bcryptjs.hashSync('12345678', 10)
  },
  {
    name: 'Camila Barros',
    email: 'millacab@gmail.com',
    password: bcryptjs.hashSync('12345678', 10)
  }
]

export default users
