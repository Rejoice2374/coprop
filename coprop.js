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
		Copy property-value and descriptors.

		If the property is non-configurable but writable
			it will just transfer the property-value.
	@end-module-documentation

	@include:
		{
			"asyum": "asyum",
			"cnfgrble": "cnfgrble",
			"defyn": "defyn",
			"dscrb": "dscrb",
			"falzy": "falzy",
			"kein": "kein",
			"protype": "protype",
			"wrtble": "wrtble"
		}
	@end-include
*/

const asyum = require( "asyum" );
const cnfgrble = require( "cnfgrble" );
const defyn = require( "defyn" );
const dscrb = require( "dscrb" );
const falzy = require( "falzy" );
const kein = require( "kein" );
const protype = require( "protype" );
const wrtble = require( "wrtble" );

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

	let descriptor = asyum( { }, function flush( ){ } );
	let definition = asyum( { }, function flush( ){ } );

	try{
		/*;
			@note:
				If the property exists and writable but not configurable then just
					transfer the value.
			@end-note
		*/
		if( kein( property, target ) && !cnfgrble( property, target ) ){
			if( wrtble( property, target ) ){
				target[ property ] = source[ property ];
			}

			return target;
		}

		descriptor = dscrb( property, source );

		definition = defyn( property, target ).define( descriptor );

		return target;

	}catch( error ){
		throw new Error( `cannot copy property, ${ error.stack }` );

	}finally{
		descriptor.flush( );

		definition.flush( );
	}
};

module.exports = coprop;
