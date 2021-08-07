const request = require('supertest')
const Users = require('../../models/Users')
let server

/**
 * Testing POST /api/auth
 */
describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  describe('POST /', () => {
    it('should return a user', async () => {
      // Add User
      const resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      const res = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })

      expect(res.status).toBe(200)
      expect(res.body.token).toBeTruthy()
    })

    it('should throw if email is falsy or is not valid', async () => {
      const args = [
        null,
        '',
        undefined,
        NaN,
        0,
        false,
        'gone',
        'example.com',
        'A@b@c@domain.com',
        'a”b(c)d,e:f;gi[jk]l@domain.com',
        'abc”test”email@domain.com',
        'abc is”not\valid@domain.com',
        'abc is”not\valid@domain.com',
        '.test@domain.com',
        'test@domain..com',
      ]

      args.forEach((a) => {
        expect(async () => {
          await request(server).post('/api/auth').send({ email: a, password: 'john123' }).toThrow()
        })
      })
    })
    it('should throw if password is falsy or is less than 6 characters', async () => {
      const args = [null, '', undefined, NaN, 0, false, 'gone']

      args.forEach((a) => {
        expect(async () => {
          await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: a }).toThrow()
        })
      })
    })
  })
})
/**
 * Testing GET /api/auth
 */
describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  describe('GET /', () => {
    let id
    let token
    it('should return a user', async () => {
      // Add User
      const resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      // console.log(resCreate.body)
      // console.log(resCreate.body._id)
      const resToken = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })

      // console.log(resToken.body)
      id = resCreate.body._id
      token = resToken.body.token

      const res = await request(server).get('/api/auth').set({ 'x-auth-token': token }).send({ id })

      // console.log(res.body)
      expect(res.status).toBe(200)
      expect(res.body.email).toContain('johndoe@gmail.com')
    })

    it('should return an error message if token does not exist', async () => {
      const res = await request(server).get('/api/auth').send({ id })

      // console.log(res.body)
      expect(res.status).toBe(401)
      expect(res.body.error[0].msg).toContain('No token, authorization denied')
    })

    it('should return an error message if token is wrong or expired', async () => {
      const res = await request(server)
        .get('/api/auth')
        .set({ 'x-auth-token': token + 'f' })
        .send({ id })

      // console.log(res.body)
      expect(res.status).toBe(401)
      expect(res.body.error[0].msg).toContain('Token not valid')
    })
  })
})
