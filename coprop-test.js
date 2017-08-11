
const assert = require( "assert" );
const coprop = require( "./coprop.js" );

let source = { "hello": "world" };
let target = { "yeah": "world" };

coprop( "hello", source, target );

assert.equal( "hello" in target, true, "should be equal to true" );

assert.equal( target.hello, "world", "should be equal to 'world'" );

console.log( "ok" );
