"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "coprop",
			"path": "coprop/coprop.js",
			"file": "coprop.js",
			"module": "coprop",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/coprop.git",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Copy property and descriptors.
	@end-module-documentation

	@include:
		{
			"falzy": "falzy",
			"protype": "protype"
		}
	@end-include
*/

const falzy = require( "falzy" );
const protype = require( "protype" );

const coprop = function coprop( property, source, target ){
	/*;
		@meta-configuration:
			{
				"property:required": [
					"number",
					"string",
					"symbol"
				],
				"source:required": "*",
				"target:required": "*"
			}
		@end-meta-configuration
	*/

	if( falzy( property ) || !protype( property, NUMBER + STRING + SYMBOL ) ){
		throw new Error( "invalid property" );
	}

	if( falzy( source ) ){
		throw new Error( "invalid source" );
	}

	if( falzy( target ) ){
		throw new Error( "invalid target" );
	}

	try{
		let descriptor = Object.getOwnPropertyDescriptor( source, property );

		Object.defineProperty( target, property, descriptor );

		return target;

	}catch( error ){
		throw new Error( `cannot copy property, ${ error.stack }` );
	}
};

module.exports = coprop;
