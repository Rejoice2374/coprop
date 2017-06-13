
const assert = require( "assert" );
const coprop = require( "./coprop.js" );

let source = { "hello": "world" };
let target = { "yeah": "world" };

coprop( "hello", source, target );

assert.equal( "hello" in target, true, "should be true" );

assert.equal( target.hello, "world", "should have value 'world'" );

console.log( "ok" );
