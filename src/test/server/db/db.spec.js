import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
import immutable from 'immutable';
import db from 'server/db';

chai.use(chaiImmutable);

describe('db module', () => {

  it('should expose submodules', () => {
    expect(db).to.have.property('file');
    expect(db.file).to.have.property('decisions');
  });

});
