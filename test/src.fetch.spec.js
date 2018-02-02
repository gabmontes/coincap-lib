/* eslint-disable no-unused-expressions */

const proxyquire = require('proxyquire')
const sinon = require('sinon')
const chai = require('chai')

chai.should()

const { baseUrl } = require('../config')

describe('Fetch API', function () {
  const response = { test: 'pass' }

  const fetchStub = sinon.stub().resolves({
    json: () => response
  })

  const fetchApi = proxyquire('../src/fetch', {
    'isomorphic-fetch': fetchStub
  })

  it('should GET path', function () {
    const path = '/coins'
    return fetchApi(path).then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith(`${baseUrl}${path}`).should.be.true
    })
  })
})
