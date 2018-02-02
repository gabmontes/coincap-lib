/* eslint-disable no-unused-expressions */

const proxyquire = require('proxyquire')
const sinon = require('sinon')
const chai = require('chai')

chai.should()

const { baseUrl } = require('../config')

describe('JSON API', function () {
  const fetchStub = sinon.stub()

  const coincap = proxyquire('..', {
    './fetch': fetchStub
  })

  const response = { test: 'pass' }

  beforeEach(function () {
    fetchStub.resolves(response)
  })

  it('should get coins', function () {
    return coincap.coins().then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith('/coins').should.be.true
    })
  })

  it('should get coins map', function () {
    return coincap.map().then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith('/map').should.be.true
    })
  })

  it('should get front page', function () {
    return coincap.front().then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith('/front').should.be.true
    })
  })

  it('should get global', function () {
    return coincap.global().then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith('/global').should.be.true
    })
  })

  it('should get coin page', function () {
    const coin = 'BTC'
    return coincap.coin(coin).then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith(`/page/${coin}`).should.be.true
    })
  })

  it('should get full coin history', function () {
    const coin = 'BTC'
    return coincap.coinHistory(coin).then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith(`/history/${coin}`).should.be.true
    })
  })

  it('should get limited coin history', function () {
    const coin = 'BTC'
    const days = 7
    return coincap.coinHistory(coin, days).then(function (res) {
      res.should.deep.equal(response)
      fetchStub.calledOnce.should.be.true
      fetchStub.calledWith(`/history/${days}day/${coin}`).should.be.true
    })
  })

  afterEach(function () {
    fetchStub.reset()
  })
})

describe('Socket.IO API', function () {
  const ioSpies = {
    open: sinon.spy(),
    close: sinon.spy(),
    on: sinon.spy(),
    off: sinon.spy()
  }

  const socketStub = sinon.stub().returns(ioSpies)

  const coincap = proxyquire('..', {
    'socket.io-client': socketStub
  })

  it('should initialize Socket.IO correctly', function () {
    socketStub.calledWith(baseUrl, { autoConnect: false })
      .should.be.true
  })

  it('should open connection', function () {
    coincap.open()
    ioSpies.open.calledOnce.should.be.true
  })

  it('should close connection', function () {
    coincap.close()
    ioSpies.close.calledOnce.should.be.true
  })

  it('should on connection', function () {
    const event = 'event'
    const fn = () => {}
    coincap.on(event, fn)
    ioSpies.on.calledOnce.should.be.true
    ioSpies.on.calledWith(event, fn).should.be.true
  })

  it('should off connection', function () {
    const event = 'event'
    const fn = () => {}
    coincap.off(event, fn)
    ioSpies.off.calledOnce.should.be.true
    ioSpies.off.calledWith(event, fn).should.be.true
  })
})
