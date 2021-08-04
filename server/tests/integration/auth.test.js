const request = require('supertest')
let server

describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../server')
  })
  afterEach(async () => {
    await server.close()
  })
  describe('POST /', () => {
    it('should return a auth token', () => {})
  })
})
