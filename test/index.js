var assert = require('assert');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jquery = require('..');
var cheerio = require('cheerio');

describe('metalsmith-jquery', function() {

    it('should apply changes to basic HTML', function(done) {
        var metalsmith = Metalsmith('test/fixtures/basic');
        metalsmith
            .use(markdown())
            .use(jquery(function($) {
                $('h2').addClass('welcome');
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                    $ = cheerio.load(files[file].contents);
                    $('h2').each(function() {
                        assert.equal(true,$(this).hasClass('welcome'));
                    });
                });
                done();
            }
        });
    });

    it('should apply changes to GFM tables', function(done) {
        var metalsmith = Metalsmith('test/fixtures/table');
        metalsmith
            .use(markdown())
            .use(jquery(function($) {
                $('table').addClass('table table-bordered');
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                    $ = cheerio.load(files[file].contents);
                    $('table').each(function() {
                        assert.equal(true,$(this).hasClass('table'));
                        assert.equal(true,$(this).hasClass('table-bordered'))
                    });
                });
                done();
            }
        });
    });

    it('should read the function from a file', function(done) {
        var metalsmith = Metalsmith('test/fixtures/table');
        metalsmith
            .use(markdown())
            .use(jquery('test/fixtures/file/fixit.js'))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                    $ = cheerio.load(files[file].contents);
                    $('table').each(function() {
                        assert.equal(true,$(this).hasClass('table'));
                        assert.equal(true,$(this).hasClass('table-bordered'))
                    });
                    $('h2').each(function() {
                        assert.equal(true,$(this).hasClass('welcome'));
                    });
                });
                done();
            }
        });
    });
});