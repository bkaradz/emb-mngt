const request = require('supertest')
const Users = require('../../models/Users')
let server

describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  describe('POST /', () => {
    // Add User
    it('should return a user', async () => {
      // await Users.collection.insertMany([
      //   ,
      // ])
      const resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      console.log(resCreate.body)

      const res = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })
      console.log(res.body)
      expect(res.status).toBe(200)
    })
  })
})
