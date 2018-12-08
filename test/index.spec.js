'use strict';


process.env.NODE_ENV = 'test';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const {
  include,
  includeFrom,
  includeFromDirname,
  includeFromCwd
} = require(path.join(__dirname, '..'));


describe('include', () => {

  it('should export a factory', () => {
    expect(include).to.exist;
    expect(include).to.be.a('function');
    expect(include.name).to.be.equal('include');
  });

  it('should be able to import', () => {
    const a = include(__dirname, 'fixtures', 'a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should be able to import', () => {
    const a = include(__dirname, 'fixtures/a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should throw if not exist', () => {
    expect(() => {
      include(__dirname, 'fixtures', 'x');
    }).to.throw(/Cannot find module/);
  });

  it('should throw if not exist', () => {
    expect(() => {
      include(__dirname, 'fixtures/x');
    }).to.throw(/Cannot find module/);
  });

});


describe('includeFrom', () => {

  it('should export a factory', () => {
    expect(includeFrom).to.exist;
    expect(includeFrom).to.be.a('function');
    expect(includeFrom.name).to.be.equal('includeFrom');
  });

  it('should be able to import', () => {
    const a = includeFrom(__dirname, 'fixtures')('a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should be able to import', () => {
    const includeFixture = includeFrom(__dirname, 'fixtures');
    const a = includeFixture('a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should throw if not exist', () => {
    expect(() => {
      includeFrom(__dirname, 'fixtures')('x');
    }).to.throw(/Cannot find module/);
  });

  it('should throw if not exist', () => {
    const includeFixture = includeFrom(__dirname, 'fixtures');
    expect(() => {
      includeFixture('x');
    }).to.throw(/Cannot find module/);
  });

});

describe('includeFromDirname', () => {

  it('should export a factory', () => {
    expect(includeFromDirname).to.exist;
    expect(includeFromDirname).to.be.a('function');
    expect(includeFromDirname.name).to.be.equal('includeFromDirname');
  });

  it('should be able to import', () => {
    const a = includeFromDirname('a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should throw if not exist', () => {
    expect(() => {
      includeFromDirname('x');
    }).to.throw(/Cannot find module/);
  });

});


describe('includeFromCwd', () => {

  it('should export a factory', () => {
    expect(includeFromCwd).to.exist;
    expect(includeFromCwd).to.be.a('function');
    expect(includeFromCwd.name).to.be.equal('includeFromCwd');
  });

  it('should be able to import', () => {
    const a = includeFromCwd('test', 'fixtures', 'a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should be able to import', () => {
    const a = includeFromCwd('test/fixtures/a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should be able to import', () => {
    const a = includeFromCwd('test', 'a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should be able to import', () => {
    const a = includeFromCwd('test/a');
    expect(a).to.exist;
    expect(a).to.be.an('object');
    expect(a.b).to.be.equal(1);
  });

  it('should throw if not exist', () => {
    expect(() => {
      includeFromCwd('x');
    }).to.throw(/Cannot find module/);
  });

  it('should throw if not exist', () => {
    expect(() => {
      includeFromCwd('test', 'x');
    }).to.throw(/Cannot find module/);
  });

  it('should throw if not exist', () => {
    expect(() => {
      includeFromCwd('test/x');
    }).to.throw(/Cannot find module/);
  });

});
