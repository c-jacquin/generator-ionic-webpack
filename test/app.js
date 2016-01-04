import path from 'path';
import assert from 'yeoman-assert';
import test from 'yeoman-test';

describe('generator-ionic-webpack-es-2015:app', ()=> {
  before(function (done) {
    test.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appNAme: 'testApp'})
      .on('end', done);
  });

  it('creates files', ()=> {
    assert.file([
      'package.json'
    ]);
  });
});
