const request = require('supertest')
let server

describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(() => {
    server.close()
  })
  describe('POST /', () => {
    it('should return a user', async () => {
      const res = await request(server).post('/api/auth').send({ email: 'karadz@gmail.com', password: 'karadz123456' })
      console.log(res.body)
      expect(res.status).toBe(200)
    })
  })
})
