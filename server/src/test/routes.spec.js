process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', () => {

  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach(done => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/clients', () => {
    it('should return all clients', done => {
      chai.request(server)
      .get('/api/v1/clients')
      .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(3);
      res.body[0].should.have.property('name');
      res.body[0].name.should.equal('client1');
      res.body[0].should.have.property('city');
      res.body[0].city.should.equal('Edinburgh');
      done();
      });
    });
  });

  describe('GET /api/v1/clients/:id', () => {
    it('should return a single client', done => {
      chai.request(server)
      .get('/api/v1/clients/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('client1');
        res.body.should.have.property('address');
        res.body.address.should.equal('1 Street');
        res.body.company_id.should.equal(1);
        done();
      });
    });
  });

  describe('POST /api/v1/clients', () => {
    it('should add a client', done => {
      chai.request(server)
      .post('/api/v1/clients')
      .send({
        name: 'client4',
        address: '4 Street',
        postcode: 'AB78 90CD',
        city: 'Edinburgh',
        country: 'UK',
        notes: 'bla bla bla',
        company_id: 4,
        type_id: 987
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('client4');
        res.body.should.have.property('notes');
        res.body.notes.should.equal('bla bla bla');
        res.body.should.have.property('company_id');
        res.body.company_id.should.equal(4);
        done();
      });
    });
  });
  
  describe('PUT /api/v1/clients/:id', () => {
    it('should update a client', done => {
      chai.request(server)
      .put('/api/v1/clients/1')
      .send({
          city: 'Glasgow',
          type_id: 889
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('city');
          res.body.city.should.equal('Glasgow');
          res.body.type_id.should.equal(889);
          done();
        });
      });
  
    it('should NOT update a client with new id', done => {
      chai.request(server)
      .put('/api/v1/clients/1')
      .send({
        id: 20,
        city: 'Berlin'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('HOW DARE YOU UPDATE THE ID FIELD');
        done();
      })
    });
  });
  
  describe('DELETE /api/v1/clients/:id', () => {
    it('should delete a client ', done => {
      chai.request(server)
      .delete('/api/v1/clients/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        chai.request(server)
        .get('/api/v1/clients')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array')
          done();
        });
      });
    });
  
  });
});
