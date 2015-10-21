import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
import immutable from 'immutable';
import * as db from 'server/db';

chai.use(chaiImmutable);

describe('db module', () => {

  before(() => {
    db.initialize('file');
  });

  it('should expose submodules', () => {
    const theDb = db.get();
    expect(theDb).to.have.property('decisions');
  });

});
