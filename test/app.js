import path from 'path';
import assert from 'yeoman-assert';
import { test } from 'yeoman-generator';

describe('generator-ionic-webpack-es-2015:app', ()=> {
  before(function (done) {
    test.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', ()=> {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
