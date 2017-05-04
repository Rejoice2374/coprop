
const assert = require( "assert" );
const coprop = require( "./coprop.js" );

var source = { "hello": "world" };
var target = { "yeah": "world" };

coprop( "hello", source, target );

assert.equal( "hello" in target, true, "should be true" );

assert.equal( target.hello, "world", "should have value 'world'" );

console.log( "ok" );
