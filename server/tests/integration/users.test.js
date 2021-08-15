const request = require('supertest')
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
let server

/**
 * Testing GET /api/users
 */
describe('/api/users', () => {
  const encrypt = async (password) => {
    // Encrypt the password
    try {
      const salt = await bcrypt.genSalt(10)
      await bcrypt.hash(password, salt).then((encryptPassword) => {
        console.log(encryptPassword)
        return encryptPassword
      })
    } catch (error) {
      console.log(error)
    }
  }

  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  describe('GET /', () => {
    let token
    it('should return all user if user is admin', async () => {
      let resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      resCreate = await request(server).post('/api/users').send({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        role: 'sales',
        mobile: '0789123456',
        password: 'jane123',
        password2: 'jane123',
      })

      resCreate = await request(server).post('/api/users').send({
        name: 'john juba',
        email: 'johnjuba@gmail.com',
        role: 'sales',
        mobile: '0789123456',
        password: 'juba123',
        password2: 'juba123',
      })

      const resToken = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })

      token = resToken.body.token

      const res = await request(server).get('/api/users').set({ 'x-auth-token': token })

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(3)
    })
    it('should return user profile if not admin', async () => {
      let resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      resCreate = await request(server).post('/api/users').send({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        role: 'sales',
        mobile: '0789123456',
        password: 'jane123',
        password2: 'jane123',
      })

      resCreate = await request(server).post('/api/users').send({
        name: 'john juba',
        email: 'johnjuba@gmail.com',
        role: 'sales',
        mobile: '0789123456',
        password: 'juba123',
        password2: 'juba123',
      })

      const resToken = await request(server).post('/api/auth').send({ email: 'janedoe@gmail.com', password: 'jane123' })

      // console.log(resToken.body)
      token = resToken.body.token

      const res = await request(server).get('/api/users').set({ 'x-auth-token': token })

      // console.log(res.body)
      expect(res.status).toBe(200)
      // expect(res.body.length).toBe(3)
      expect(res.body.email).toContain('janedoe@gmail.com')
    })
    it('should return an error message if token does not exist', async () => {
      const res = await request(server).get('/api/users').set({ 'x-auth-token': '' })
      expect(res.status).toBe(401)
      expect(res.body.error[0].msg).toContain('No token, authorization denied')
    })
    it('should return an error message if token is wrong or expired', async () => {
      const res = await request(server)
        .get('/api/users')
        .set({ 'x-auth-token': token + 'f' })
      expect(res.status).toBe(401)
      expect(res.body.error[0].msg).toContain('Token not valid')
    })
  })
})

/**
 * Testing POST /api/users
 */
describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    server.close()
    await Users.deleteMany({})
  })
  /**
   * Does not need Auth ????
   * Maybe you can change the Auth middleware to to allow first admin
   * TODO: Try to change middleware to allow first admin
   */
  describe('POST /', () => {
    let token
    it('add users if you are an administrator', async () => {
      const resCreate = await request(server).post('/api/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
        mobile: '0789123456',
        password: 'john123',
        password2: 'john123',
      })

      const resToken = await request(server).post('/api/auth').send({ email: 'johndoe@gmail.com', password: 'john123' })

      // console.log(resToken.body)
      token = resToken.body.token

      const res = await request(server).get('/api/users').set({ 'x-auth-token': token })

      // console.log(res.body)
      expect(res.status).toBe(200)
    })
  })
})
