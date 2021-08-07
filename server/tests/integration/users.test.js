const request = require('supertest')
const Users = require('../../models/Users')
let server

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  describe('GET /', () => {
    let token
    it('should return a user', async () => {
      const resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })
      // Add Users
      await Users.collection.insertMany([
        {
          name: 'Jane Doe',
          email: 'janedoe@gmail.com',
          role: 'sales',
          mobile: '0789123456',
          password: 'jane123',
        },
        {
          name: 'john juba',
          email: 'johnjuba@gmail.com',
          role: 'sales',
          mobile: '0789123456',
          password: 'juba123',
        },
      ])

      const resToken = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })

      // console.log(resToken.body)
      token = resToken.body.token

      const res = await request(server).get('/api/users').set({ 'x-auth-token': token })

      // console.log(res.body)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(3)
      // expect(res.body.email).toContain('johndoe@gmail.com')
    })
  })
})
