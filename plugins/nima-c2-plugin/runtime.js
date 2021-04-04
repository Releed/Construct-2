/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.2
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER

	exports._glMatrix = __webpack_require__(1);
	exports._mat2 = __webpack_require__(2);
	exports._mat2d = __webpack_require__(3);
	exports._mat3 = __webpack_require__(4);
	exports._mat4 = __webpack_require__(5);
	exports._quat = __webpack_require__(6);
	exports._vec2 = __webpack_require__(9);
	exports._vec3 = __webpack_require__(7);
	exports._vec4 = __webpack_require__(8);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	/**
	 * @class Common utilities
	 * @name _glMatrix
	 */
	var _glMatrix = {};

	// Configuration Constants
	_glMatrix.EPSILON = 0.000001;
	_glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	_glMatrix.RANDOM = Math.random;
	_glMatrix.ENABLE_SIMD = false;

	// Capability detection
	_glMatrix.SIMD_AVAILABLE = (_glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
	_glMatrix.USE_SIMD = _glMatrix.ENABLE_SIMD && _glMatrix.SIMD_AVAILABLE;

	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	_glMatrix.setMatrixArrayType = function(type) {
	    _glMatrix.ARRAY_TYPE = type;
	}

	var degree = Math.PI / 180;

	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	_glMatrix.toRadian = function(a){
	     return a * degree;
	}

	module.exports = _glMatrix;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 2x2 Matrix
	 * @name _mat2
	 */
	var _mat2 = {};

	/**
	 * Creates a new identity _mat2
	 *
	 * @returns {_mat2} a new 2x2 matrix
	 */
	_mat2.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Creates a new _mat2 initialized with values from an existing matrix
	 *
	 * @param {_mat2} a matrix to clone
	 * @returns {_mat2} a new 2x2 matrix
	 */
	_mat2.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Copy the values from one _mat2 to another
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the source matrix
	 * @returns {_mat2} out
	 */
	_mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set a _mat2 to the identity matrix
	 *
	 * @param {_mat2} out the receiving matrix
	 * @returns {_mat2} out
	 */
	_mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a _mat2
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the source matrix
	 * @returns {_mat2} out
	 */
	_mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a _mat2
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the source matrix
	 * @returns {_mat2} out
	 */
	_mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a _mat2
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the source matrix
	 * @returns {_mat2} out
	 */
	_mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;

	    return out;
	};

	/**
	 * Calculates the determinant of a _mat2
	 *
	 * @param {_mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	_mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};

	/**
	 * Multiplies two _mat2's
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the first operand
	 * @param {_mat2} b the second operand
	 * @returns {_mat2} out
	 */
	_mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};

	/**
	 * Alias for {@link _mat2.multiply}
	 * @function
	 */
	_mat2.mul = _mat2.multiply;

	/**
	 * Rotates a _mat2 by the given angle
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat2} out
	 */
	_mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};

	/**
	 * Scales the _mat2 by the dimensions in the given _vec2
	 *
	 * @param {_mat2} out the receiving matrix
	 * @param {_mat2} a the matrix to rotate
	 * @param {_vec2} v the _vec2 to scale the matrix by
	 * @returns {_mat2} out
	 **/
	_mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat2.identity(dest);
	 *     _mat2.rotate(dest, dest, rad);
	 *
	 * @param {_mat2} out _mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat2} out
	 */
	_mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat2.identity(dest);
	 *     _mat2.scale(dest, dest, vec);
	 *
	 * @param {_mat2} out _mat2 receiving operation result
	 * @param {_vec2} v Scaling vector
	 * @returns {_mat2} out
	 */
	_mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a _mat2
	 *
	 * @param {_mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	_mat2.str = function (a) {
	    return '_mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns Frobenius norm of a _mat2
	 *
	 * @param {_mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	_mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {_mat2} L the lower triangular matrix 
	 * @param {_mat2} D the diagonal matrix 
	 * @param {_mat2} U the upper triangular matrix 
	 * @param {_mat2} a the input matrix to factorize
	 */

	_mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 


	module.exports = _mat2;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 2x3 Matrix
	 * @name _mat2d
	 * 
	 * @description 
	 * A _mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var _mat2d = {};

	/**
	 * Creates a new identity _mat2d
	 *
	 * @returns {_mat2d} a new 2x3 matrix
	 */
	_mat2d.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Creates a new _mat2d initialized with values from an existing matrix
	 *
	 * @param {_mat2d} a matrix to clone
	 * @returns {_mat2d} a new 2x3 matrix
	 */
	_mat2d.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Copy the values from one _mat2d to another
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the source matrix
	 * @returns {_mat2d} out
	 */
	_mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Set a _mat2d to the identity matrix
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @returns {_mat2d} out
	 */
	_mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Inverts a _mat2d
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the source matrix
	 * @returns {_mat2d} out
	 */
	_mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];

	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};

	/**
	 * Calculates the determinant of a _mat2d
	 *
	 * @param {_mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	_mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};

	/**
	 * Multiplies two _mat2d's
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the first operand
	 * @param {_mat2d} b the second operand
	 * @returns {_mat2d} out
	 */
	_mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};

	/**
	 * Alias for {@link _mat2d.multiply}
	 * @function
	 */
	_mat2d.mul = _mat2d.multiply;

	/**
	 * Rotates a _mat2d by the given angle
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat2d} out
	 */
	_mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Scales the _mat2d by the dimensions in the given _vec2
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the matrix to translate
	 * @param {_vec2} v the _vec2 to scale the matrix by
	 * @returns {_mat2d} out
	 **/
	_mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Translates the _mat2d by the dimensions in the given _vec2
	 *
	 * @param {_mat2d} out the receiving matrix
	 * @param {_mat2d} a the matrix to translate
	 * @param {_vec2} v the _vec2 to translate the matrix by
	 * @returns {_mat2d} out
	 **/
	_mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat2d.identity(dest);
	 *     _mat2d.rotate(dest, dest, rad);
	 *
	 * @param {_mat2d} out _mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat2d} out
	 */
	_mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat2d.identity(dest);
	 *     _mat2d.scale(dest, dest, vec);
	 *
	 * @param {_mat2d} out _mat2d receiving operation result
	 * @param {_vec2} v Scaling vector
	 * @returns {_mat2d} out
	 */
	_mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat2d.identity(dest);
	 *     _mat2d.translate(dest, dest, vec);
	 *
	 * @param {_mat2d} out _mat2d receiving operation result
	 * @param {_vec2} v Translation vector
	 * @returns {_mat2d} out
	 */
	_mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a _mat2d
	 *
	 * @param {_mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	_mat2d.str = function (a) {
	    return '_mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};

	/**
	 * Returns Frobenius norm of a _mat2d
	 *
	 * @param {_mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	_mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 

	module.exports = _mat2d;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 3x3 Matrix
	 * @name _mat3
	 */
	var _mat3 = {};

	/**
	 * Creates a new identity _mat3
	 *
	 * @returns {_mat3} a new 3x3 matrix
	 */
	_mat3.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Copies the upper-left 3x3 values into the given _mat3.
	 *
	 * @param {_mat3} out the receiving 3x3 matrix
	 * @param {_mat4} a   the source 4x4 matrix
	 * @returns {_mat3} out
	 */
	_mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};

	/**
	 * Creates a new _mat3 initialized with values from an existing matrix
	 *
	 * @param {_mat3} a matrix to clone
	 * @returns {_mat3} a new 3x3 matrix
	 */
	_mat3.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Copy the values from one _mat3 to another
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the source matrix
	 * @returns {_mat3} out
	 */
	_mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Set a _mat3 to the identity matrix
	 *
	 * @param {_mat3} out the receiving matrix
	 * @returns {_mat3} out
	 */
	_mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a _mat3
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the source matrix
	 * @returns {_mat3} out
	 */
	_mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a _mat3
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the source matrix
	 * @returns {_mat3} out
	 */
	_mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,

	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};

	/**
	 * Calculates the adjugate of a _mat3
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the source matrix
	 * @returns {_mat3} out
	 */
	_mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};

	/**
	 * Calculates the determinant of a _mat3
	 *
	 * @param {_mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	_mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	/**
	 * Multiplies two _mat3's
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the first operand
	 * @param {_mat3} b the second operand
	 * @returns {_mat3} out
	 */
	_mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];

	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};

	/**
	 * Alias for {@link _mat3.multiply}
	 * @function
	 */
	_mat3.mul = _mat3.multiply;

	/**
	 * Translate a _mat3 by the given vector
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the matrix to translate
	 * @param {_vec2} v vector to translate by
	 * @returns {_mat3} out
	 */
	_mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];

	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;

	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;

	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};

	/**
	 * Rotates a _mat3 by the given angle
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat3} out
	 */
	_mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        s = Math.sin(rad),
	        c = Math.cos(rad);

	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;

	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;

	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};

	/**
	 * Scales the _mat3 by the dimensions in the given _vec2
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat3} a the matrix to rotate
	 * @param {_vec2} v the _vec2 to scale the matrix by
	 * @returns {_mat3} out
	 **/
	_mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];

	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];

	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];

	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat3.identity(dest);
	 *     _mat3.translate(dest, dest, vec);
	 *
	 * @param {_mat3} out _mat3 receiving operation result
	 * @param {_vec2} v Translation vector
	 * @returns {_mat3} out
	 */
	_mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat3.identity(dest);
	 *     _mat3.rotate(dest, dest, rad);
	 *
	 * @param {_mat3} out _mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat3} out
	 */
	_mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);

	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;

	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat3.identity(dest);
	 *     _mat3.scale(dest, dest, vec);
	 *
	 * @param {_mat3} out _mat3 receiving operation result
	 * @param {_vec2} v Scaling vector
	 * @returns {_mat3} out
	 */
	_mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;

	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Copies the values from a _mat2d into a _mat3
	 *
	 * @param {_mat3} out the receiving matrix
	 * @param {_mat2d} a the matrix to copy
	 * @returns {_mat3} out
	 **/
	_mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;

	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;

	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};

	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {_mat3} out _mat3 receiving operation result
	* @param {_quat} q Quaternion to create matrix from
	*
	* @returns {_mat3} out
	*/
	_mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;

	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;

	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;

	    return out;
	};

	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {_mat3} out _mat3 receiving operation result
	* @param {_mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {_mat3} out
	*/
	_mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

	    return out;
	};

	/**
	 * Returns a string representation of a _mat3
	 *
	 * @param {_mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	_mat3.str = function (a) {
	    return '_mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};

	/**
	 * Returns Frobenius norm of a _mat3
	 *
	 * @param {_mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	_mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};


	module.exports = _mat3;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 4x4 Matrix
	 * @name _mat4
	 */
	var _mat4 = {
	  scalar: {},
	  SIMD: {},
	};

	/**
	 * Creates a new identity _mat4
	 *
	 * @returns {_mat4} a new 4x4 matrix
	 */
	_mat4.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Creates a new _mat4 initialized with values from an existing matrix
	 *
	 * @param {_mat4} a matrix to clone
	 * @returns {_mat4} a new 4x4 matrix
	 */
	_mat4.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Copy the values from one _mat4 to another
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Set a _mat4 to the identity matrix
	 *
	 * @param {_mat4} out the receiving matrix
	 * @returns {_mat4} out
	 */
	_mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a _mat4 not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.scalar.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];

	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }

	    return out;
	};

	/**
	 * Transpose the values of a _mat4 using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.transpose = function(out, a) {
	    var a0, a1, a2, a3,
	        tmp01, tmp23,
	        out0, out1, out2, out3;

	    a0 = SIMD.Float32x4.load(a, 0);
	    a1 = SIMD.Float32x4.load(a, 4);
	    a2 = SIMD.Float32x4.load(a, 8);
	    a3 = SIMD.Float32x4.load(a, 12);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 0,  out0);
	    SIMD.Float32x4.store(out, 4,  out1);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 8,  out2);
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Transpse a _mat4 using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.transpose = _glMatrix.USE_SIMD ? _mat4.SIMD.transpose : _mat4.scalar.transpose;

	/**
	 * Inverts a _mat4 not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.scalar.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	    return out;
	};

	/**
	 * Inverts a _mat4 using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.invert = function(out, a) {
	  var row0, row1, row2, row3,
	      tmp1,
	      minor0, minor1, minor2, minor3,
	      det,
	      a0 = SIMD.Float32x4.load(a, 0),
	      a1 = SIMD.Float32x4.load(a, 4),
	      a2 = SIMD.Float32x4.load(a, 8),
	      a3 = SIMD.Float32x4.load(a, 12);

	  // Compute matrix adjugate
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  // Compute matrix determinant
	  det   = SIMD.Float32x4.mul(row0, minor0);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
	  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
	  det   = SIMD.Float32x4.sub(
	               SIMD.Float32x4.add(tmp1, tmp1),
	               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
	  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
	  if (!det) {
	      return null;
	  }

	  // Compute matrix inverse
	  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
	  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
	  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
	  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
	  return out;
	}

	/**
	 * Inverts a _mat4 using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.invert = _glMatrix.USE_SIMD ? _mat4.SIMD.invert : _mat4.scalar.invert;

	/**
	 * Calculates the adjugate of a _mat4 not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.scalar.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};

	/**
	 * Calculates the adjugate of a _mat4 using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.adjoint = function(out, a) {
	  var a0, a1, a2, a3;
	  var row0, row1, row2, row3;
	  var tmp1;
	  var minor0, minor1, minor2, minor3;

	  var a0 = SIMD.Float32x4.load(a, 0);
	  var a1 = SIMD.Float32x4.load(a, 4);
	  var a2 = SIMD.Float32x4.load(a, 8);
	  var a3 = SIMD.Float32x4.load(a, 12);

	  // Transpose the source matrix.  Sort of.  Not a true transpose operation
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  SIMD.Float32x4.store(out, 0,  minor0);
	  SIMD.Float32x4.store(out, 4,  minor1);
	  SIMD.Float32x4.store(out, 8,  minor2);
	  SIMD.Float32x4.store(out, 12, minor3);
	  return out;
	};

	/**
	 * Calculates the adjugate of a _mat4 using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the source matrix
	 * @returns {_mat4} out
	 */
	 _mat4.adjoint = _glMatrix.USE_SIMD ? _mat4.SIMD.adjoint : _mat4.scalar.adjoint;

	/**
	 * Calculates the determinant of a _mat4
	 *
	 * @param {_mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	_mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;

	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};

	/**
	 * Multiplies two _mat4's explicitly using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the first operand, must be a Float32Array
	 * @param {_mat4} b the second operand, must be a Float32Array
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.multiply = function (out, a, b) {
	    var a0 = SIMD.Float32x4.load(a, 0);
	    var a1 = SIMD.Float32x4.load(a, 4);
	    var a2 = SIMD.Float32x4.load(a, 8);
	    var a3 = SIMD.Float32x4.load(a, 12);

	    var b0 = SIMD.Float32x4.load(b, 0);
	    var out0 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 0, out0);

	    var b1 = SIMD.Float32x4.load(b, 4);
	    var out1 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 4, out1);

	    var b2 = SIMD.Float32x4.load(b, 8);
	    var out2 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 8, out2);

	    var b3 = SIMD.Float32x4.load(b, 12);
	    var out3 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
	                        SIMD.Float32x4.add(
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Multiplies two _mat4's explicitly not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the first operand
	 * @param {_mat4} b the second operand
	 * @returns {_mat4} out
	 */
	_mat4.scalar.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

	/**
	 * Multiplies two _mat4's using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the first operand
	 * @param {_mat4} b the second operand
	 * @returns {_mat4} out
	 */
	_mat4.multiply = _glMatrix.USE_SIMD ? _mat4.SIMD.multiply : _mat4.scalar.multiply;

	/**
	 * Alias for {@link _mat4.multiply}
	 * @function
	 */
	_mat4.mul = _mat4.multiply;

	/**
	 * Translate a _mat4 by the given vector not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to translate
	 * @param {_vec3} v vector to translate by
	 * @returns {_mat4} out
	 */
	_mat4.scalar.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

	/**
	 * Translates a _mat4 by the given vector using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to translate
	 * @param {_vec3} v vector to translate by
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.translate = function (out, a, v) {
	    var a0 = SIMD.Float32x4.load(a, 0),
	        a1 = SIMD.Float32x4.load(a, 4),
	        a2 = SIMD.Float32x4.load(a, 8),
	        a3 = SIMD.Float32x4.load(a, 12),
	        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

	    if (a !== out) {
	        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
	        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
	        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
	    }

	    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
	    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
	    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

	    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
	    SIMD.Float32x4.store(out, 12, t0);

	    return out;
	};

	/**
	 * Translates a _mat4 by the given vector using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to translate
	 * @param {_vec3} v vector to translate by
	 * @returns {_mat4} out
	 */
	_mat4.translate = _glMatrix.USE_SIMD ? _mat4.SIMD.translate : _mat4.scalar.translate;

	/**
	 * Scales the _mat4 by the dimensions in the given _vec3 not using vectorization
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to scale
	 * @param {_vec3} v the _vec3 to scale the matrix by
	 * @returns {_mat4} out
	 **/
	_mat4.scalar.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the _mat4 by the dimensions in the given _vec3 using vectorization
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to scale
	 * @param {_vec3} v the _vec3 to scale the matrix by
	 * @returns {_mat4} out
	 **/
	_mat4.SIMD.scale = function(out, a, v) {
	    var a0, a1, a2;
	    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

	    a0 = SIMD.Float32x4.load(a, 0);
	    SIMD.Float32x4.store(
	        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

	    a1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(
	        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

	    a2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(
	        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the _mat4 by the dimensions in the given _vec3 using SIMD if available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to scale
	 * @param {_vec3} v the _vec3 to scale the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.scale = _glMatrix.USE_SIMD ? _mat4.SIMD.scale : _mat4.scalar.scale;

	/**
	 * Rotates a _mat4 by the given angle around the given axis
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {_vec3} axis the axis to rotate around
	 * @returns {_mat4} out
	 */
	_mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < _glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.scalar.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.rotateX = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	      out[0]  = a[0];
	      out[1]  = a[1];
	      out[2]  = a[2];
	      out[3]  = a[3];
	      out[12] = a[12];
	      out[13] = a[13];
	      out[14] = a[14];
	      out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.rotateX = _glMatrix.USE_SIMD ? _mat4.SIMD.rotateX : _mat4.scalar.rotateX;

	/**
	 * Rotates a matrix by the given angle around the Y axis not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.scalar.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.rotateY = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	 _mat4.rotateY = _glMatrix.USE_SIMD ? _mat4.SIMD.rotateY : _mat4.scalar.rotateY;

	/**
	 * Rotates a matrix by the given angle around the Z axis not using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.scalar.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis using SIMD
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.SIMD.rotateZ = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
	 *
	 * @param {_mat4} out the receiving matrix
	 * @param {_mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	 _mat4.rotateZ = _glMatrix.USE_SIMD ? _mat4.SIMD.rotateZ : _mat4.scalar.rotateZ;

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.translate(dest, dest, vec);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {_vec3} v Translation vector
	 * @returns {_mat4} out
	 */
	_mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.scale(dest, dest, vec);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {_vec3} v Scaling vector
	 * @returns {_mat4} out
	 */
	_mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {_vec3} axis the axis to rotate around
	 * @returns {_mat4} out
	 */
	_mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;

	    if (Math.abs(len) < _glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.rotateX(dest, dest, rad);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.rotateY(dest, dest, rad);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {_mat4} out
	 */
	_mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.translate(dest, vec);
	 *     var quatMat = _mat4.create();
	 *     quat4.toMat4(_quat, quatMat);
	 *     _mat4.multiply(dest, quatMat);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {_vec3} v Translation vector
	 * @returns {_mat4} out
	 */
	_mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.translate(dest, vec);
	 *     var quatMat = _mat4.create();
	 *     quat4.toMat4(_quat, quatMat);
	 *     _mat4.multiply(dest, quatMat);
	 *     _mat4.scale(dest, scale)
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {_vec3} v Translation vector
	 * @param {_vec3} s Scaling vector
	 * @returns {_mat4} out
	 */
	_mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];

	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     _mat4.identity(dest);
	 *     _mat4.translate(dest, vec);
	 *     _mat4.translate(dest, origin);
	 *     var quatMat = _mat4.create();
	 *     quat4.toMat4(_quat, quatMat);
	 *     _mat4.multiply(dest, quatMat);
	 *     _mat4.scale(dest, scale)
	 *     _mat4.translate(dest, negativeOrigin);
	 *
	 * @param {_mat4} out _mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {_vec3} v Translation vector
	 * @param {_vec3} s Scaling vector
	 * @param {_vec3} o The origin vector around which to scale and rotate
	 * @returns {_mat4} out
	 */
	_mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,

	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,

	      sx = s[0],
	      sy = s[1],
	      sz = s[2],

	      ox = o[0],
	      oy = o[1],
	      oz = o[2];

	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;

	  return out;
	};

	_mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;

	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;

	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;

	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;

	    return out;
	};

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {_mat4} out _mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {_mat4} out
	 */
	_mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {_mat4} out _mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {_mat4} out
	 */
	_mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {_mat4} out _mat4 frustum matrix will be written into
	 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {_mat4} out
	 */
	_mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);

	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {_mat4} out _mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {_mat4} out
	 */
	_mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {_mat4} out _mat4 frustum matrix will be written into
	 * @param {_vec3} eye Position of the viewer
	 * @param {_vec3} center Point the viewer is looking at
	 * @param {_vec3} up _vec3 pointing up
	 * @returns {_mat4} out
	 */
	_mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < _glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < _glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < _glMatrix.EPSILON) {
	        return _mat4.identity(out);
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns a string representation of a _mat4
	 *
	 * @param {_mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	_mat4.str = function (a) {
	    return '_mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};

	/**
	 * Returns Frobenius norm of a _mat4
	 *
	 * @param {_mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	_mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};


	module.exports = _mat4;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);
	var _mat3 = __webpack_require__(4);
	var _vec3 = __webpack_require__(7);
	var _vec4 = __webpack_require__(8);

	/**
	 * @class Quaternion
	 * @name _quat
	 */
	var _quat = {};

	/**
	 * Creates a new identity _quat
	 *
	 * @returns {_quat} a new quaternion
	 */
	_quat.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {_quat} out the receiving quaternion.
	 * @param {_vec3} a the initial vector
	 * @param {_vec3} b the destination vector
	 * @returns {_quat} out
	 */
	_quat.rotationTo = (function() {
	    var tmpvec3 = _vec3.create();
	    var xUnitVec3 = _vec3.fromValues(1,0,0);
	    var yUnitVec3 = _vec3.fromValues(0,1,0);

	    return function(out, a, b) {
	        var dot = _vec3.dot(a, b);
	        if (dot < -0.999999) {
	            _vec3.cross(tmpvec3, xUnitVec3, a);
	            if (_vec3.length(tmpvec3) < 0.000001)
	                _vec3.cross(tmpvec3, yUnitVec3, a);
	            _vec3.normalize(tmpvec3, tmpvec3);
	            _quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            _vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return _quat.normalize(out, out);
	        }
	    };
	})();

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a _vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {_vec3} view  the vector representing the viewing direction
	 * @param {_vec3} right the vector representing the local "right" direction
	 * @param {_vec3} up    the vector representing the local "up" direction
	 * @returns {_quat} out
	 */
	_quat.setAxes = (function() {
	    var matr = _mat3.create();

	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];

	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];

	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];

	        return _quat.normalize(out, _quat.fromMat3(out, matr));
	    };
	})();

	/**
	 * Creates a new _quat initialized with values from an existing quaternion
	 *
	 * @param {_quat} a quaternion to clone
	 * @returns {_quat} a new quaternion
	 * @function
	 */
	_quat.clone = _vec4.clone;

	/**
	 * Creates a new _quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {_quat} a new quaternion
	 * @function
	 */
	_quat.fromValues = _vec4.fromValues;

	/**
	 * Copy the values from one _quat to another
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the source quaternion
	 * @returns {_quat} out
	 * @function
	 */
	_quat.copy = _vec4.copy;

	/**
	 * Set the components of a _quat to the given values
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {_quat} out
	 * @function
	 */
	_quat.set = _vec4.set;

	/**
	 * Set a _quat to the identity quaternion
	 *
	 * @param {_quat} out the receiving quaternion
	 * @returns {_quat} out
	 */
	_quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a _quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {_quat} out
	 **/
	_quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};

	/**
	 * Adds two _quat's
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @returns {_quat} out
	 * @function
	 */
	_quat.add = _vec4.add;

	/**
	 * Multiplies two _quat's
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @returns {_quat} out
	 */
	_quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};

	/**
	 * Alias for {@link _quat.multiply}
	 * @function
	 */
	_quat.mul = _quat.multiply;

	/**
	 * Scales a _quat by a scalar number
	 *
	 * @param {_quat} out the receiving vector
	 * @param {_quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {_quat} out
	 * @function
	 */
	_quat.scale = _vec4.scale;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {_quat} out _quat receiving operation result
	 * @param {_quat} a _quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {_quat} out
	 */
	_quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {_quat} out _quat receiving operation result
	 * @param {_quat} a _quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {_quat} out
	 */
	_quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {_quat} out _quat receiving operation result
	 * @param {_quat} a _quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {_quat} out
	 */
	_quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};

	/**
	 * Calculates the W component of a _quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a _quat to calculate W component of
	 * @returns {_quat} out
	 */
	_quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];

	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};

	/**
	 * Calculates the dot product of two _quat's
	 *
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	_quat.dot = _vec4.dot;

	/**
	 * Performs a linear interpolation between two _quat's
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_quat} out
	 * @function
	 */
	_quat.lerp = _vec4.lerp;

	/**
	 * Performs a spherical linear interpolation between two _quat
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_quat} out
	 */
	_quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    var        omega, cosom, sinom, scale0, scale1;

	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a the first operand
	 * @param {_quat} b the second operand
	 * @param {_quat} c the third operand
	 * @param {_quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {_quat} out
	 */
	_quat.sqlerp = (function () {
	  var temp1 = _quat.create();
	  var temp2 = _quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    _quat.slerp(temp1, a, d, t);
	    _quat.slerp(temp2, b, c, t);
	    _quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());

	/**
	 * Calculates the inverse of a _quat
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a _quat to calculate inverse of
	 * @returns {_quat} out
	 */
	_quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};

	/**
	 * Calculates the conjugate of a _quat
	 * If the quaternion is normalized, this function is faster than _quat.inverse and produces the same result.
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a _quat to calculate conjugate of
	 * @returns {_quat} out
	 */
	_quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Calculates the length of a _quat
	 *
	 * @param {_quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	_quat.length = _vec4.length;

	/**
	 * Alias for {@link _quat.length}
	 * @function
	 */
	_quat.len = _quat.length;

	/**
	 * Calculates the squared length of a _quat
	 *
	 * @param {_quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	_quat.squaredLength = _vec4.squaredLength;

	/**
	 * Alias for {@link _quat.squaredLength}
	 * @function
	 */
	_quat.sqrLen = _quat.squaredLength;

	/**
	 * Normalize a _quat
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_quat} a quaternion to normalize
	 * @returns {_quat} out
	 * @function
	 */
	_quat.normalize = _vec4.normalize;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {_quat} out the receiving quaternion
	 * @param {_mat3} m rotation matrix
	 * @returns {_quat} out
	 * @function
	 */
	_quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;

	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {_quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	_quat.str = function (a) {
	    return '_quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = _quat;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 3 Dimensional Vector
	 * @name _vec3
	 */
	var _vec3 = {};

	/**
	 * Creates a new, empty _vec3
	 *
	 * @returns {_vec3} a new 3D vector
	 */
	_vec3.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};

	/**
	 * Creates a new _vec3 initialized with values from an existing vector
	 *
	 * @param {_vec3} a vector to clone
	 * @returns {_vec3} a new 3D vector
	 */
	_vec3.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Creates a new _vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {_vec3} a new 3D vector
	 */
	_vec3.fromValues = function(x, y, z) {
	    var out = new _glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Copy the values from one _vec3 to another
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the source vector
	 * @returns {_vec3} out
	 */
	_vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Set the components of a _vec3 to the given values
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {_vec3} out
	 */
	_vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Adds two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};

	/**
	 * Alias for {@link _vec3.subtract}
	 * @function
	 */
	_vec3.sub = _vec3.subtract;

	/**
	 * Multiplies two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};

	/**
	 * Alias for {@link _vec3.multiply}
	 * @function
	 */
	_vec3.mul = _vec3.multiply;

	/**
	 * Divides two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};

	/**
	 * Alias for {@link _vec3.divide}
	 * @function
	 */
	_vec3.div = _vec3.divide;

	/**
	 * Returns the minimum of two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};

	/**
	 * Returns the maximum of two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};

	/**
	 * Scales a _vec3 by a scalar number
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {_vec3} out
	 */
	_vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};

	/**
	 * Adds two _vec3's after scaling the second operand by a scalar value
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {_vec3} out
	 */
	_vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two _vec3's
	 *
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	_vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link _vec3.distance}
	 * @function
	 */
	_vec3.dist = _vec3.distance;

	/**
	 * Calculates the squared euclidian distance between two _vec3's
	 *
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	_vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link _vec3.squaredDistance}
	 * @function
	 */
	_vec3.sqrDist = _vec3.squaredDistance;

	/**
	 * Calculates the length of a _vec3
	 *
	 * @param {_vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	_vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link _vec3.length}
	 * @function
	 */
	_vec3.len = _vec3.length;

	/**
	 * Calculates the squared length of a _vec3
	 *
	 * @param {_vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	_vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link _vec3.squaredLength}
	 * @function
	 */
	_vec3.sqrLen = _vec3.squaredLength;

	/**
	 * Negates the components of a _vec3
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a vector to negate
	 * @returns {_vec3} out
	 */
	_vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a _vec3
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a vector to invert
	 * @returns {_vec3} out
	 */
	_vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};

	/**
	 * Normalize a _vec3
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a vector to normalize
	 * @returns {_vec3} out
	 */
	_vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two _vec3's
	 *
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	_vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	/**
	 * Computes the cross product of two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @returns {_vec3} out
	 */
	_vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];

	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two _vec3's
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_vec3} out
	 */
	_vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};

	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @param {_vec3} c the third operand
	 * @param {_vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_vec3} out
	 */
	_vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the first operand
	 * @param {_vec3} b the second operand
	 * @param {_vec3} c the third operand
	 * @param {_vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_vec3} out
	 */
	_vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {_vec3} out
	 */
	_vec3.random = function (out, scale) {
	    scale = scale || 1.0;

	    var r = _glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (_glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;

	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};

	/**
	 * Transforms the _vec3 with a _mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the vector to transform
	 * @param {_mat4} m matrix to transform with
	 * @returns {_vec3} out
	 */
	_vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};

	/**
	 * Transforms the _vec3 with a _mat3.
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the vector to transform
	 * @param {_mat4} m the 3x3 matrix to transform with
	 * @returns {_vec3} out
	 */
	_vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};

	/**
	 * Transforms the _vec3 with a _quat
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec3} a the vector to transform
	 * @param {_quat} q quaternion to transform with
	 * @returns {_vec3} out
	 */
	_vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-_vec3-implementations

	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate _quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse _quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {_vec3} out The receiving _vec3
	 * @param {_vec3} a The _vec3 point to rotate
	 * @param {_vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {_vec3} out
	 */
	_vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];

		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];

	  	return out;
	};

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {_vec3} out The receiving _vec3
	 * @param {_vec3} a The _vec3 point to rotate
	 * @param {_vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {_vec3} out
	 */
	_vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {_vec3} out The receiving _vec3
	 * @param {_vec3} a The _vec3 point to rotate
	 * @param {_vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {_vec3} out
	 */
	_vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each _vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	_vec3.forEach = (function() {
	    var vec = _vec3.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Get the angle between two 3D vectors
	 * @param {_vec3} a The first operand
	 * @param {_vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	_vec3.angle = function(a, b) {
	   
	    var tempA = _vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = _vec3.fromValues(b[0], b[1], b[2]);
	 
	    _vec3.normalize(tempA, tempA);
	    _vec3.normalize(tempB, tempB);
	 
	    var cosine = _vec3.dot(tempA, tempB);

	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {_vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	_vec3.str = function (a) {
	    return '_vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};

	module.exports = _vec3;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 4 Dimensional Vector
	 * @name _vec4
	 */
	var _vec4 = {};

	/**
	 * Creates a new, empty _vec4
	 *
	 * @returns {_vec4} a new 4D vector
	 */
	_vec4.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};

	/**
	 * Creates a new _vec4 initialized with values from an existing vector
	 *
	 * @param {_vec4} a vector to clone
	 * @returns {_vec4} a new 4D vector
	 */
	_vec4.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Creates a new _vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {_vec4} a new 4D vector
	 */
	_vec4.fromValues = function(x, y, z, w) {
	    var out = new _glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Copy the values from one _vec4 to another
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the source vector
	 * @returns {_vec4} out
	 */
	_vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set the components of a _vec4 to the given values
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {_vec4} out
	 */
	_vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Adds two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link _vec4.subtract}
	 * @function
	 */
	_vec4.sub = _vec4.subtract;

	/**
	 * Multiplies two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};

	/**
	 * Alias for {@link _vec4.multiply}
	 * @function
	 */
	_vec4.mul = _vec4.multiply;

	/**
	 * Divides two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};

	/**
	 * Alias for {@link _vec4.divide}
	 * @function
	 */
	_vec4.div = _vec4.divide;

	/**
	 * Returns the minimum of two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};

	/**
	 * Returns the maximum of two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {_vec4} out
	 */
	_vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};

	/**
	 * Scales a _vec4 by a scalar number
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {_vec4} out
	 */
	_vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two _vec4's after scaling the second operand by a scalar value
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {_vec4} out
	 */
	_vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two _vec4's
	 *
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	_vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link _vec4.distance}
	 * @function
	 */
	_vec4.dist = _vec4.distance;

	/**
	 * Calculates the squared euclidian distance between two _vec4's
	 *
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	_vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link _vec4.squaredDistance}
	 * @function
	 */
	_vec4.sqrDist = _vec4.squaredDistance;

	/**
	 * Calculates the length of a _vec4
	 *
	 * @param {_vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	_vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link _vec4.length}
	 * @function
	 */
	_vec4.len = _vec4.length;

	/**
	 * Calculates the squared length of a _vec4
	 *
	 * @param {_vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	_vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link _vec4.squaredLength}
	 * @function
	 */
	_vec4.sqrLen = _vec4.squaredLength;

	/**
	 * Negates the components of a _vec4
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a vector to negate
	 * @returns {_vec4} out
	 */
	_vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a _vec4
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a vector to invert
	 * @returns {_vec4} out
	 */
	_vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};

	/**
	 * Normalize a _vec4
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a vector to normalize
	 * @returns {_vec4} out
	 */
	_vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two _vec4's
	 *
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	_vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	/**
	 * Performs a linear interpolation between two _vec4's
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the first operand
	 * @param {_vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_vec4} out
	 */
	_vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {_vec4} out
	 */
	_vec4.random = function (out, scale) {
	    scale = scale || 1.0;

	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = _glMatrix.RANDOM();
	    out[1] = _glMatrix.RANDOM();
	    out[2] = _glMatrix.RANDOM();
	    out[3] = _glMatrix.RANDOM();
	    _vec4.normalize(out, out);
	    _vec4.scale(out, out, scale);
	    return out;
	};

	/**
	 * Transforms the _vec4 with a _mat4.
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the vector to transform
	 * @param {_mat4} m matrix to transform with
	 * @returns {_vec4} out
	 */
	_vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};

	/**
	 * Transforms the _vec4 with a _quat
	 *
	 * @param {_vec4} out the receiving vector
	 * @param {_vec4} a the vector to transform
	 * @param {_quat} q quaternion to transform with
	 * @returns {_vec4} out
	 */
	_vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate _quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse _quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each _vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	_vec4.forEach = (function() {
	    var vec = _vec4.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {_vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	_vec4.str = function (a) {
	    return '_vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = _vec4;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var _glMatrix = __webpack_require__(1);

	/**
	 * @class 2 Dimensional Vector
	 * @name _vec2
	 */
	var _vec2 = {};

	/**
	 * Creates a new, empty _vec2
	 *
	 * @returns {_vec2} a new 2D vector
	 */
	_vec2.create = function() {
	    var out = new _glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};

	/**
	 * Creates a new _vec2 initialized with values from an existing vector
	 *
	 * @param {_vec2} a vector to clone
	 * @returns {_vec2} a new 2D vector
	 */
	_vec2.clone = function(a) {
	    var out = new _glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Creates a new _vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {_vec2} a new 2D vector
	 */
	_vec2.fromValues = function(x, y) {
	    var out = new _glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Copy the values from one _vec2 to another
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the source vector
	 * @returns {_vec2} out
	 */
	_vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Set the components of a _vec2 to the given values
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {_vec2} out
	 */
	_vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Adds two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};

	/**
	 * Alias for {@link _vec2.subtract}
	 * @function
	 */
	_vec2.sub = _vec2.subtract;

	/**
	 * Multiplies two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};

	/**
	 * Alias for {@link _vec2.multiply}
	 * @function
	 */
	_vec2.mul = _vec2.multiply;

	/**
	 * Divides two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};

	/**
	 * Alias for {@link _vec2.divide}
	 * @function
	 */
	_vec2.div = _vec2.divide;

	/**
	 * Returns the minimum of two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};

	/**
	 * Returns the maximum of two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec2} out
	 */
	_vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};

	/**
	 * Scales a _vec2 by a scalar number
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {_vec2} out
	 */
	_vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};

	/**
	 * Adds two _vec2's after scaling the second operand by a scalar value
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {_vec2} out
	 */
	_vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two _vec2's
	 *
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	_vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link _vec2.distance}
	 * @function
	 */
	_vec2.dist = _vec2.distance;

	/**
	 * Calculates the squared euclidian distance between two _vec2's
	 *
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	_vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link _vec2.squaredDistance}
	 * @function
	 */
	_vec2.sqrDist = _vec2.squaredDistance;

	/**
	 * Calculates the length of a _vec2
	 *
	 * @param {_vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	_vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link _vec2.length}
	 * @function
	 */
	_vec2.len = _vec2.length;

	/**
	 * Calculates the squared length of a _vec2
	 *
	 * @param {_vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	_vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link _vec2.squaredLength}
	 * @function
	 */
	_vec2.sqrLen = _vec2.squaredLength;

	/**
	 * Negates the components of a _vec2
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a vector to negate
	 * @returns {_vec2} out
	 */
	_vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a _vec2
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a vector to invert
	 * @returns {_vec2} out
	 */
	_vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};

	/**
	 * Normalize a _vec2
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a vector to normalize
	 * @returns {_vec2} out
	 */
	_vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two _vec2's
	 *
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	_vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};

	/**
	 * Computes the cross product of two _vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {_vec3} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @returns {_vec3} out
	 */
	_vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two _vec2's
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the first operand
	 * @param {_vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {_vec2} out
	 */
	_vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {_vec2} out
	 */
	_vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = _glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};

	/**
	 * Transforms the _vec2 with a _mat2
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the vector to transform
	 * @param {_mat2} m matrix to transform with
	 * @returns {_vec2} out
	 */
	_vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};

	/**
	 * Transforms the _vec2 with a _mat2d
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the vector to transform
	 * @param {_mat2d} m matrix to transform with
	 * @returns {_vec2} out
	 */
	_vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};

	/**
	 * Transforms the _vec2 with a _mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the vector to transform
	 * @param {_mat3} m matrix to transform with
	 * @returns {_vec2} out
	 */
	_vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};

	/**
	 * Transforms the _vec2 with a _mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {_vec2} out the receiving vector
	 * @param {_vec2} a the vector to transform
	 * @param {_mat4} m matrix to transform with
	 * @returns {_vec2} out
	 */
	_vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each _vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	_vec2.forEach = (function() {
	    var vec = _vec2.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {_vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	_vec2.str = function (a) {
	    return '_vec2(' + a[0] + ', ' + a[1] + ')';
	};

	module.exports = _vec2;


/***/ }
/******/ ])
});
;
var Dispatcher = (function()
{
	function Dispatcher()
	{
		this._Events = {};
	}

	Dispatcher.prototype.addEventListener = function(event, callback)
	{
		var evt = this._Events[event];
		if(!evt)
		{
			this._Events[event] = evt = [];
		}
		if(evt.indexOf(callback) != -1)
		{
			return;
		}
		evt.push(callback);
	};

	Dispatcher.prototype.removeEventListener = function(event, callback)
	{
		var evt = this._Events[event];
		if(!evt)
		{
			return true;
		}
		for(var i = 0; i < evt.length; i++)
		{
			if(evt[i] === callback)
			{
				evt.splice(i, 1);
				return true;
			}
		}
		return false;
	};

	Dispatcher.prototype.dispatch = function(event, data, extraContext)
	{
		var evt = this._Events[event];
		if(evt)
		{
			for(var i = 0; i < evt.length; i++)
			{
				evt[i].call(this, data, extraContext);
			}
		}
	}

	Dispatcher.subclass = function(other)
	{
		other.prototype.addEventListener = Dispatcher.prototype.addEventListener;
		other.prototype.removeEventListener = Dispatcher.prototype.removeEventListener;
		other.prototype.dispatch = Dispatcher.prototype.dispatch;
	};


	return Dispatcher;
}());
var Graphics = (function()
{
	function Graphics(canvas)
	{
		var contextOptions = {
			premultipliedAlpha: false,
			preserveDrawingBuffer: true
		};

		var _GL = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions) || canvas.getContext("webgl2", contextOptions);

		var _AnisotropyExtension = _GL.getExtension("EXT_texture_filter_anisotropic");
		var _MaxAnisotropy;
		if(_AnisotropyExtension)
		{
			_MaxAnisotropy = _GL.getParameter(_AnisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		}

		var _Projection = _mat4.create();
		var _Transform = _mat4.create();
		var _ViewTransform = _mat4.create();
		var _ColorBuffer = new Float32Array(4);
		var _ViewportWidth = 0;
		var _ViewportHeight = 0;
		var _BlendMode = null;

		function _SetSize(width, height)
		{
			// Check if the canvas is not the same size.
			if (canvas.width != width || canvas.height != height)
			{
				// Make the canvas the same size
				canvas.width = width;
				canvas.height = height;

				_ViewportWidth = width;
				_ViewportHeight = height;
				_mat4.ortho(_Projection, 0, _ViewportWidth, 0, _ViewportHeight, 0, 1);
				_GL.viewport(0, 0, _ViewportWidth, _ViewportHeight);
				return true;
			}
			return false;
		}

		function _Clear()
		{
			//_GL.clearColor(0.0, 0.0, 0.0, 0.0);
			_GL.clearColor(0.3628, 0.3628, 0.3628, 1.0);
			_GL.clear(_GL.COLOR_BUFFER_BIT);
		}

		function _DeleteTexture(tex)
		{
			_GL.deleteTexture(tex);
		}

		function _LoadTexture(blob)
		{
			var tex = _GL.createTexture();
			tex.ready = false;

			_GL.bindTexture(_GL.TEXTURE_2D, tex);
			_GL.texImage2D(_GL.TEXTURE_2D, 0, _GL.RGBA, 1, 1, 0, _GL.RGBA, _GL.UNSIGNED_BYTE, null);
			_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MAG_FILTER, _GL.LINEAR);
			_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MIN_FILTER, _GL.LINEAR);
			_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_S, _GL.CLAMP_TO_EDGE);
			_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_T, _GL.CLAMP_TO_EDGE);
			_GL.bindTexture(_GL.TEXTURE_2D, null);
			_GL.pixelStorei(_GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			if(blob.constructor !== Blob)
			{
				_GL.bindTexture(_GL.TEXTURE_2D, tex);
				_GL.texImage2D(_GL.TEXTURE_2D, 0, _GL.RGBA, _GL.RGBA, _GL.UNSIGNED_BYTE, blob.img);
				_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MAG_FILTER, _GL.LINEAR);
				_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MIN_FILTER, _GL.LINEAR_MIPMAP_LINEAR);
				_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_S, _GL.CLAMP_TO_EDGE);
				_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_T, _GL.CLAMP_TO_EDGE);
				if(_AnisotropyExtension)
				{
					_GL.texParameterf(_GL.TEXTURE_2D, _AnisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, _MaxAnisotropy);
				}
				_GL.generateMipmap(_GL.TEXTURE_2D);
				_GL.bindTexture(_GL.TEXTURE_2D, null);

				tex.ready = true;
			}
			else
			{
				var reader = new FileReader();
				reader.onload = function(e)
				{
					var img = new Image();
					img.src = e.target.result;
					img.onload = function()
					{
						_GL.bindTexture(_GL.TEXTURE_2D, tex);
						_GL.texImage2D(_GL.TEXTURE_2D, 0, _GL.RGBA, _GL.RGBA, _GL.UNSIGNED_BYTE, this);
						_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MAG_FILTER, _GL.LINEAR);
						_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_MIN_FILTER, _GL.LINEAR_MIPMAP_LINEAR);
						_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_S, _GL.CLAMP_TO_EDGE);
						_GL.texParameteri(_GL.TEXTURE_2D, _GL.TEXTURE_WRAP_T, _GL.CLAMP_TO_EDGE);
						if(_AnisotropyExtension)
						{
							_GL.texParameterf(_GL.TEXTURE_2D, _AnisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, _MaxAnisotropy);
						}
						_GL.generateMipmap(_GL.TEXTURE_2D);
						_GL.bindTexture(_GL.TEXTURE_2D, null);

						tex.ready = true;
					};
				};
				reader.readAsDataURL(blob);
			}

			return tex;
		}

		function _Bind(shader, buffer, buffer2)
		{
			var boundBuffer = _GL.getParameter(_GL.ARRAY_BUFFER_BINDING);
			var boundShader = _GL.getParameter(_GL.CURRENT_PROGRAM);

			// May need to revisit this based on buffer2
			if (boundShader === shader && boundBuffer === buffer)
			{
				return false;
			}

			// Disable anything necessary for the old shader.
			if (boundShader)
			{
				var attribCount = _GL.getProgramParameter(boundShader, _GL.ACTIVE_ATTRIBUTES);
				for (var i = 1; i < attribCount; i++)
				{
					_GL.disableVertexAttribArray(i);
				}
			}

			if (shader == null)
			{
				_GL.useProgram(null);
				return;
			}

			// Bind the new one.
			_GL.useProgram(shader.program);

			// Assume the user knows what they are doing, binding a secondary set of attribs from another buffer.
			if (buffer2)
			{
				_GL.bindBuffer(_GL.ARRAY_BUFFER, buffer2);

				var atts = shader.attributes2;
				for (var a in atts)
				{
					var at = atts[a];

					if (at.index != -1)
					{
						_GL.enableVertexAttribArray(at.index);
						_GL.vertexAttribPointer(at.index, at.size, _GL.FLOAT, false, at.stride, at.offset);
					}
				}
			}

			_GL.bindBuffer(_GL.ARRAY_BUFFER, buffer);

			var atts = shader.attributes;
			for (var a in atts)
			{
				var at = atts[a];

				if (at.index != -1)
				{
					_GL.enableVertexAttribArray(at.index);
					_GL.vertexAttribPointer(at.index, at.size, _GL.FLOAT, false, at.stride, at.offset);
				}
			}

			return true;
		};

		function _DisableBlending()
		{
			if (_BlendMode === 0)
			{
				return;
			}
			_BlendMode = 0;
			_GL.disable(_GL.BLEND);
		};

		function _EnableBlending()
		{
			if (_BlendMode === 1)
			{
				return;
			}
			_BlendMode = 1;
			_GL.enable(_GL.BLEND);
			//_GL.blendFuncSeparate(_GL.SRC_ALPHA, _GL.ONE_MINUS_SRC_ALPHA, _GL.ONE, _GL.ONE_MINUS_SRC_ALPHA);
			_GL.blendFunc(_GL.ONE, _GL.ONE_MINUS_SRC_ALPHA);
		};

		function _EnableScreenBlending()
		{
			if (_BlendMode === 2)
			{
				return;
			}
			_BlendMode = 2;
			_GL.enable(_GL.BLEND);
			_GL.blendFuncSeparate(_GL.ONE, _GL.ONE_MINUS_SRC_COLOR, _GL.ONE, _GL.ONE_MINUS_SRC_ALPHA);
		};

		function _EnableMultiplyBlending()
		{
			if (_BlendMode === 3)
			{
				return;
			}
			_BlendMode = 3;
			_GL.enable(_GL.BLEND);
			_GL.blendFuncSeparate(_GL.DST_COLOR, _GL.ONE_MINUS_SRC_ALPHA, _GL.DST_ALPHA, _GL.ONE_MINUS_SRC_ALPHA);
		};

		function _EnablePremultipliedBlending()
		{
			if (_BlendMode === 4)
			{
				return;
			}
			_BlendMode = 4;
			_GL.enable(_GL.BLEND);
			_GL.blendFuncSeparate(_GL.ONE, _GL.ONE_MINUS_SRC_ALPHA, _GL.ONE, _GL.ONE_MINUS_SRC_ALPHA);
		};

		function _EnableAdditiveBlending()
		{
			if (_BlendMode === 5)
			{
				return;
			}
			_BlendMode = 5;
			_GL.enable(_GL.BLEND);
			_GL.blendFuncSeparate(_GL.ONE, _GL.ONE, _GL.ONE, _GL.ONE);
		};

		function VertexBuffer(id)
		{
			var _Size = 0;
			this.update = function(data)
			{
				_GL.bindBuffer(_GL.ARRAY_BUFFER, id);
				_GL.bufferData(_GL.ARRAY_BUFFER, data instanceof Float32Array ? data : new Float32Array(data), _GL.DYNAMIC_DRAW);

				_Size = data.length;
			};

			this.__defineGetter__("id", function()
			{
				return id;
			});

			this.__defineGetter__("size", function()
			{
				return _Size;
			});

			this.dispose = function()
			{
				_GL.deleteBuffer(id);
			};
		}

		function _MakeVertexBuffer(data)
		{
			var buffer = _GL.createBuffer();
			var vtxBuffer = new VertexBuffer(buffer);
			if (data)
			{
				vtxBuffer.update(data);
			}

			return vtxBuffer;
		}

		function IndexBuffer(id)
		{
			var _Size = 0;

			this.update = function(data)
			{
				_GL.bindBuffer(_GL.ELEMENT_ARRAY_BUFFER, id);
				_GL.bufferData(_GL.ELEMENT_ARRAY_BUFFER, data instanceof Uint16Array ? data : new Uint16Array(data), _GL.DYNAMIC_DRAW);

				_Size = data.length;
			};

			this.__defineGetter__("id", function()
			{
				return id;
			});

			this.__defineGetter__("size", function()
			{
				return _Size;
			});

			this.dispose = function()
			{
				_GL.deleteBuffer(id);
			};
		}

		function _MakeIndexBuffer(data)
		{
			var buffer = _GL.createBuffer();
			var indexBuffer = new IndexBuffer(buffer);
			if (data)
			{
				indexBuffer.update(data);
			}

			return indexBuffer;
		}

		function _InitializeShader(s)
		{
			if (!(s.fragment = _GetShader(s.fragment)))
			{
				return null;
			}
			if (!(s.vertex = _GetShader(s.vertex)))
			{
				return null;
			}
			s.program = _GL.createProgram();

			_GL.attachShader(s.program, s.vertex);
			_GL.attachShader(s.program, s.fragment);
			_GL.linkProgram(s.program);

			if (!_GL.getProgramParameter(s.program, _GL.LINK_STATUS))
			{
				console.log("Could not link shader", s.name, _GL.getProgramInfoLog(s.program));
			}
			else
			{
				_GL.useProgram(s.program);

				for (var a in s.attributes)
				{
					if ((s.attributes[a].index = _GL.getAttribLocation(s.program, s.attributes[a].name)) == -1)
					{
						console.log("Could not find attribute", s.attributes[a].name, "for shader", s.name);
					}
				}
				if (s.attributes2)
				{
					for (var a in s.attributes2)
					{
						if ((s.attributes2[a].index = _GL.getAttribLocation(s.program, s.attributes2[a].name)) == -1)
						{
							console.log("Could not find attribute", s.attributes2[a].name, "for shader", s.name);
						}
					}
				}
				for (var u in s.uniforms)
				{
					var name = s.uniforms[u];
					if ((s.uniforms[u] = _GL.getUniformLocation(s.program, name)) == null)
					{
						console.log("Could not find uniform", name, "for shader", s.name);
					}
				}
			}

			return s;
		};

		function _GetShader(id)
		{
			var s = _CompiledShaders[id];
			if (s)
			{
				return s;
			}

			var shader = null;

			var shaderScript = _ShaderSources[id];
			if (shaderScript)
			{
				if (id.indexOf(".fs") == id.length - 3)
				{
					shader = _GL.createShader(_GL.FRAGMENT_SHADER);
				}
				else if (id.indexOf(".vs") == id.length - 3)
				{
					shader = _GL.createShader(_GL.VERTEX_SHADER);
				}

				_GL.shaderSource(shader, shaderScript);
				_GL.compileShader(shader);

				if (!_GL.getShaderParameter(shader, _GL.COMPILE_STATUS))
				{
					console.log("Failed to compile", id);
					return null;
				}
				_CompiledShaders[id] = shader;
			}
			return shader;
		};

		var _CompiledShaders = {};
		var _ShaderSources = {
			"Textured.vs": "attribute vec2 VertexPosition; attribute vec2 VertexTexCoord; uniform mat4 ProjectionMatrix; uniform mat4 WorldMatrix; uniform mat4 ViewMatrix; varying vec2 TexCoord; void main(void) {TexCoord = VertexTexCoord; vec4 pos = ViewMatrix * WorldMatrix * vec4(VertexPosition.x, VertexPosition.y, 0.0, 1.0); gl_Position = ProjectionMatrix * vec4(pos.xyz, 1.0); }",
			"Textured.fs": "#ifdef GL_ES \nprecision highp float;\n #endif\n uniform vec4 Color; uniform float Opacity; uniform sampler2D TextureSampler; varying vec2 TexCoord; void main(void) {vec4 color = texture2D(TextureSampler, TexCoord) * Color * Opacity; gl_FragColor = color; }",
			"TexturedSkin.vs": "attribute vec2 VertexPosition; attribute vec2 VertexTexCoord; attribute vec4 VertexBoneIndices; attribute vec4 VertexWeights; uniform mat4 ProjectionMatrix; uniform mat4 WorldMatrix; uniform mat4 ViewMatrix; uniform vec3 BoneMatrices[82]; varying vec2 TexCoord; void main(void) {TexCoord = VertexTexCoord; vec2 position = vec2(0.0, 0.0); vec4 p = WorldMatrix * vec4(VertexPosition.x, VertexPosition.y, 0.0, 1.0); float x = p[0]; float y = p[1]; for(int i = 0; i < 4; i++) {float weight = VertexWeights[i]; int matrixIndex = int(VertexBoneIndices[i])*2; vec3 m = BoneMatrices[matrixIndex]; vec3 n = BoneMatrices[matrixIndex+1]; position[0] += (m[0] * x + m[2] * y + n[1]) * weight; position[1] += (m[1] * x + n[0] * y + n[2]) * weight; } vec4 pos = ViewMatrix * vec4(position.x, position.y, 0.0, 1.0); gl_Position = ProjectionMatrix * vec4(pos.xyz, 1.0); }"
		};

		var _TexturedShader = _InitializeShader(
		{
			name: "TexturedShader",

			vertex: "Textured.vs",
			fragment: "Textured.fs",

			attributes:
			{
				VertexPosition:
				{
					name: "VertexPosition",
					size: 2,
					stride: 16,
					offset: 0
				},
				VertexNormal:
				{
					name: "VertexTexCoord",
					size: 2,
					stride: 16,
					offset: 8
				}
			},

			uniforms:
			{
				ProjectionMatrix: "ProjectionMatrix",
				ViewMatrix: "ViewMatrix",
				WorldMatrix: "WorldMatrix",
				TextureSampler: "TextureSampler",
				Opacity: "Opacity",
				Color: "Color"
			}
		});

		var _DeformedTexturedShader = _InitializeShader(
		{
			name: "DeformedTexturedShader",

			vertex: "Textured.vs",
			fragment: "Textured.fs",

			attributes:
			{
				VertexNormal:
				{
					name: "VertexTexCoord",
					size: 2,
					stride: 16,
					offset: 8
				}
			},

			attributes2:
			{
				VertexPosition:
				{
					name: "VertexPosition",
					size: 2,
					stride: 8,
					offset: 0
				}
			},

			uniforms:
			{
				ProjectionMatrix: "ProjectionMatrix",
				ViewMatrix: "ViewMatrix",
				WorldMatrix: "WorldMatrix",
				TextureSampler: "TextureSampler",
				Opacity: "Opacity",
				Color: "Color"
			}
		});

		var _TexturedSkinShader = _InitializeShader(
		{
			name: "TexturedSkinShader",

			vertex: "TexturedSkin.vs",
			fragment: "Textured.fs",

			attributes:
			{
				VertexPosition:
				{
					name: "VertexPosition",
					size: 2,
					stride: 48,
					offset: 0
				},
				VertexNormal:
				{
					name: "VertexTexCoord",
					size: 2,
					stride: 48,
					offset: 8
				},
				VertexBoneIndices:
				{
					name: "VertexBoneIndices",
					size: 4,
					stride: 48,
					offset: 16
				},
				VertexWeights:
				{
					name: "VertexWeights",
					size: 4,
					stride: 48,
					offset: 32
				}
			},

			uniforms:
			{
				ProjectionMatrix: "ProjectionMatrix",
				ViewMatrix: "ViewMatrix",
				WorldMatrix: "WorldMatrix",
				TextureSampler: "TextureSampler",
				Opacity: "Opacity",
				Color: "Color",
				BoneMatrices: "BoneMatrices"
			}
		});

		var _DeformedTexturedSkinShader = _InitializeShader(
		{
			name: "DeformedTexturedSkinShader",

			vertex: "TexturedSkin.vs",
			fragment: "Textured.fs",

			attributes:
			{
				VertexTexCoord:
				{
					name: "VertexTexCoord",
					size: 2,
					stride: 48,
					offset: 8
				},
				VertexBoneIndices:
				{
					name: "VertexBoneIndices",
					size: 4,
					stride: 48,
					offset: 16
				},
				VertexWeights:
				{
					name: "VertexWeights",
					size: 4,
					stride: 48,
					offset: 32
				}
			},

			attributes2:
			{
				VertexPosition:
				{
					name: "VertexPosition",
					size: 2,
					stride: 8,
					offset: 0
				}
			},

			uniforms:
			{
				ProjectionMatrix: "ProjectionMatrix",
				ViewMatrix: "ViewMatrix",
				WorldMatrix: "WorldMatrix",
				TextureSampler: "TextureSampler",
				Opacity: "Opacity",
				Color: "Color",
				BoneMatrices: "BoneMatrices"
			}
		});


		function _SetView(view)
		{
			_ViewTransform[0] = view[0];
			_ViewTransform[1] = view[1];
			_ViewTransform[4] = view[2];
			_ViewTransform[5] = view[3];
			_ViewTransform[12] = view[4];
			_ViewTransform[13] = view[5];
		}

		function _DrawTextured(transform, vertexBuffer, indexBuffer, opacity, color, tex)
		{
			_Transform[0] = transform[0];
			_Transform[1] = transform[1];
			_Transform[4] = transform[2];
			_Transform[5] = transform[3];
			_Transform[12] = transform[4];
			_Transform[13] = transform[5];

			var uniforms = _TexturedShader.uniforms;
			if(_Bind(_TexturedShader, vertexBuffer.id))
			{
				_GL.uniformMatrix4fv(uniforms.ViewMatrix, false, _ViewTransform);
				_GL.uniformMatrix4fv(uniforms.ProjectionMatrix, false, _Projection);
			}

			for (var i = 0; i < 4; i++) _ColorBuffer[i] = color[i];

			_GL.uniform1f(uniforms.Opacity, opacity);
			_GL.uniform4fv(uniforms.Color, _ColorBuffer);

			_GL.uniformMatrix4fv(uniforms.WorldMatrix, false, _Transform);

			_GL.activeTexture(_GL.TEXTURE0);
			_GL.bindTexture(_GL.TEXTURE_2D, tex);
			_GL.uniform1i(uniforms.TextureSampler, 0);

			_GL.bindBuffer(_GL.ELEMENT_ARRAY_BUFFER, indexBuffer.id);
			_GL.drawElements(_GL.TRIANGLES, indexBuffer.size, _GL.UNSIGNED_SHORT, 0);
		};

		function _DrawTexturedAndDeformed(transform, deformBuffer, vertexBuffer, indexBuffer, opacity, color, tex)
		{
			_Transform[0] = transform[0];
			_Transform[1] = transform[1];
			_Transform[4] = transform[2];
			_Transform[5] = transform[3];
			_Transform[12] = transform[4];
			_Transform[13] = transform[5];

			var uniforms = _DeformedTexturedShader.uniforms;
			if(_Bind(_DeformedTexturedShader, vertexBuffer.id, deformBuffer.id))
			{
				_GL.uniformMatrix4fv(uniforms.ViewMatrix, false, _ViewTransform);
				_GL.uniformMatrix4fv(uniforms.ProjectionMatrix, false, _Projection);
			}

			for (var i = 0; i < 4; i++) _ColorBuffer[i] = color[i];

			_GL.uniform1f(uniforms.Opacity, opacity);
			_GL.uniform4fv(uniforms.Color, _ColorBuffer);

			_GL.uniformMatrix4fv(uniforms.WorldMatrix, false, _Transform);

			_GL.activeTexture(_GL.TEXTURE0);
			_GL.bindTexture(_GL.TEXTURE_2D, tex);
			_GL.uniform1i(uniforms.TextureSampler, 0);

			_GL.bindBuffer(_GL.ELEMENT_ARRAY_BUFFER, indexBuffer.id);
			_GL.drawElements(_GL.TRIANGLES, indexBuffer.size, _GL.UNSIGNED_SHORT, 0);
		};

		function _DrawTexturedSkin(transform, vertexBuffer, indexBuffer, boneMatrices, opacity, color, tex)
		{
			_Transform[0] = transform[0];
			_Transform[1] = transform[1];
			_Transform[4] = transform[2];
			_Transform[5] = transform[3];
			_Transform[12] = transform[4];
			_Transform[13] = transform[5];

			var uniforms = _TexturedSkinShader.uniforms;
			if(_Bind(_TexturedSkinShader, vertexBuffer.id))
			{
				_GL.uniformMatrix4fv(uniforms.ViewMatrix, false, _ViewTransform);
				_GL.uniformMatrix4fv(uniforms.ProjectionMatrix, false, _Projection);
			}

			for (var i = 0; i < 4; i++) _ColorBuffer[i] = color[i];

			_GL.uniform1f(uniforms.Opacity, opacity);
			_GL.uniform4fv(uniforms.Color, _ColorBuffer);
			_GL.uniform3fv(uniforms.BoneMatrices, boneMatrices);

			_GL.uniformMatrix4fv(uniforms.WorldMatrix, false, _Transform);

			_GL.activeTexture(_GL.TEXTURE0);
			_GL.bindTexture(_GL.TEXTURE_2D, tex);
			_GL.uniform1i(uniforms.TextureSampler, 0);

			_GL.bindBuffer(_GL.ELEMENT_ARRAY_BUFFER, indexBuffer.id);
			_GL.drawElements(_GL.TRIANGLES, indexBuffer.size, _GL.UNSIGNED_SHORT, 0);
		};

		function _DrawTexturedAndDeformedSkin(transform, deformBuffer, vertexBuffer, indexBuffer, boneMatrices, opacity, color, tex)
		{
			_Transform[0] = transform[0];
			_Transform[1] = transform[1];
			_Transform[4] = transform[2];
			_Transform[5] = transform[3];
			_Transform[12] = transform[4];
			_Transform[13] = transform[5];

			var uniforms = _DeformedTexturedSkinShader.uniforms;
			if(_Bind(_DeformedTexturedSkinShader, vertexBuffer.id, deformBuffer.id))
			{
				_GL.uniformMatrix4fv(uniforms.ViewMatrix, false, _ViewTransform);
				_GL.uniformMatrix4fv(uniforms.ProjectionMatrix, false, _Projection);
			}

			for (var i = 0; i < 4; i++) _ColorBuffer[i] = color[i];

			_GL.uniform1f(uniforms.Opacity, opacity);
			_GL.uniform4fv(uniforms.Color, _ColorBuffer);
			_GL.uniform3fv(uniforms.BoneMatrices, boneMatrices);

			_GL.uniformMatrix4fv(uniforms.WorldMatrix, false, _Transform);

			_GL.activeTexture(_GL.TEXTURE0);
			_GL.bindTexture(_GL.TEXTURE_2D, tex);
			_GL.uniform1i(uniforms.TextureSampler, 0);

			_GL.bindBuffer(_GL.ELEMENT_ARRAY_BUFFER, indexBuffer.id);
			_GL.drawElements(_GL.TRIANGLES, indexBuffer.size, _GL.UNSIGNED_SHORT, 0);
		};

		this.loadTexture = _LoadTexture;
		this.deleteTexture = _DeleteTexture;
		this.setSize = _SetSize;
		this.disableBlending = _DisableBlending;
		this.enableBlending = _EnableBlending;
		this.enablePremultipliedBlending = _EnablePremultipliedBlending;
		this.enableAdditiveBlending = _EnableAdditiveBlending;
		this.enableScreenBlending = _EnableScreenBlending;
		this.enableMultiplyBlending = _EnableMultiplyBlending;
		this.clear = _Clear;
		this.makeVertexBuffer = _MakeVertexBuffer;
		this.makeIndexBuffer = _MakeIndexBuffer;
		this.drawTextured = _DrawTextured;
		this.drawTexturedAndDeformed = _DrawTexturedAndDeformed;
		this.drawTexturedSkin = _DrawTexturedSkin;
		this.drawTexturedAndDeformedSkin = _DrawTexturedAndDeformedSkin;
		this.setView = _SetView;
		this.projection = _Projection;

		this.__defineGetter__("viewportWidth", function()
		{
			return _ViewportWidth;
		});

		this.__defineGetter__("viewportHeight", function()
		{
			return _ViewportHeight;
		});
	}

	return Graphics;
}());
var Actor = (function ()
{
	function Actor()
	{
		Dispatcher.call(this);

		this._Components = [];
		this._Nodes = [];
		this._Images = [];
		this._Atlases = [];
		this._RootNode = new ActorNode();
		this._Components.push(this._RootNode);
		this._Nodes.push(this._RootNode);
		this._Animations = [];
		this._Solvers = [];
		this._IsInstance = false;
		this._IsImageSortDirty = false;
		this._Alpha = 1.0;
	}

	Actor.prototype = 
	{ 
		constructor:Actor,
		get root()
		{
			return this._RootNode;
		}
	};
	
	Dispatcher.subclass(Actor);

	Actor.prototype.resolveHierarchy = function(graphics)
	{
		var components = this._Components;
		for(var i = 1; i < components.length; i++)
		{
			var component = components[i];
			if(component != null)
			{
				component.resolveComponentIndices(components);
				if(component.isNode)
				{
					this._Nodes.push(component);
				}
				switch(component.constructor)
				{
					case ActorImage:
						this._Images.push(component);
						break;
					case ActorIKTarget:
						this._Solvers.push(component);
						break;
				}
			}
		}

		this._Images.sort(function(a,b)
		{
			return a._DrawOrder - b._DrawOrder;
		});

		this._Solvers.sort(function(a,b)
		{
			return a._Order - b._Order;
		});
	};

	Actor.prototype.dispose = function(graphics)
	{
		if(!this._IsInstance)
		{
			// Load all the atlases.
			var atlases = this._Atlases;
			for(var i = 0; i < atlases.length; i++)
			{
				var atlas = atlases[i];
				graphics.deleteTexture(atlas);
			}
		}
		var images = this._Images;
		for(var i = 0; i < images.length; i++)
		{
			images[i].dispose(this, graphics);
		}
	};

	Actor.prototype.initialize = function(graphics)
	{
		if(!this._IsInstance)
		{
			// Load all the atlases.
			var atlases = this._Atlases;
			for(var i = 0; i < atlases.length; i++)
			{
				var atlas = atlases[i];
				atlases[i] = graphics.loadTexture(atlas);
			}
		}
		var images = this._Images;
		for(var i = 0; i < images.length; i++)
		{
			images[i].initialize(this, graphics);
		}
	}

	Actor.prototype.advance = function(seconds)
	{
		// First iterate solvers to see if any is dirty.
		var solvers = this._Solvers;
		var runSolvers = false;
		for(var i = 0; i < solvers.length; i++)
		{
			var solver = solvers[i];
			if(solver.needsSolve())
			{
				runSolvers = true;
				break;
			}
		}

		var nodes = this._Nodes;
		for(var i = 0; i < nodes.length; i++)
		{
			var node = nodes[i];
			if(node)
			{
				node.updateTransforms();
			}
		}

		if(runSolvers)
		{
			for(var i = 0; i < solvers.length; i++)
			{
				var solver = solvers[i];
				solver.solveStart();
			}	

			for(var i = 0; i < solvers.length; i++)
			{
				var solver = solvers[i];
				solver.solve();
			}

			for(var i = 0; i < solvers.length; i++)
			{
				var solver = solvers[i];
				solver._SuppressMarkDirty = true;
			}

			for(var i = 0; i < nodes.length; i++)
			{
				var node = nodes[i];
				if(node)
				{
					node.updateTransforms();
				}
			}

			for(var i = 0; i < solvers.length; i++)
			{
				var solver = solvers[i];
				solver._SuppressMarkDirty = false;
			}
		}

		var components = this._Components;
		// Advance last (update graphics buffers and such).
		for(var i = 0; i < components.length; i++)
		{
			var component = components[i];
			if(component)
			{
				component.advance(seconds);
			}
		}

		if(this._IsImageSortDirty)
		{
			this._Images.sort(function(a,b)
			{
				return a._DrawOrder - b._DrawOrder;
			});
			this._IsImageSortDirty = false;
		}
	};

	Actor.prototype.draw = function(graphics)
	{
		var images = this._Images;
		for(var i = 0; i < images.length; i++)
		{
			var img = images[i];
			img.draw(graphics, this._Alpha);
		}
	};

	Actor.prototype.getNode = function(name)
	{
		var nodes = this._Nodes;
		for(var i = 0; i < nodes.length; i++)
		{
			var node = nodes[i];
			if(node._Name === name)
			{
				return node;
			}
		}
		return null;
	};

	Actor.prototype.getAnimation = function(name)
	{
		var animations = this._Animations;
		for(var i = 0; i < animations.length; i++)
		{
			var animation = animations[i];
			if(animation._Name === name)
			{
				return animation;
			}
		}
		return null;
	};

	Actor.prototype.getAnimationInstance = function(name)
	{
		var animation = this.getAnimation(name);
		if(!animation)
		{
			return null;
		}
		return new AnimationInstance(this, animation);
	};

	Actor.prototype.makeInstance = function()
	{
		var actorInstance = new Actor();
		actorInstance._IsInstance = true;
		actorInstance.copy(this);
		return actorInstance;
	};

	Actor.prototype.copy = function(actor)
	{
		var components = actor._Components;
		this._Animations = actor._Animations;
		this._Atlases = actor._Atlases;
		this._Components.length = 0;
		for(var i = 0; i < components.length; i++)
		{
			var component = components[i];
			if(!component)
			{
				this._Components.push(null);
				continue;
			}
			var instanceNode = component.makeInstance(this);
			switch(instanceNode.constructor)
			{
				case ActorImage:
					this._Images.push(instanceNode);
					break;

				case ActorIKTarget:
					this._Solvers.push(instanceNode);
					break;
			}
			if(instanceNode.isNode)
			{
				this._Nodes.push(instanceNode);
			}
			this._Components.push(instanceNode);
		}
		this._RootNode = this._Components[0];

		for(var i = 1; i < this._Components.length; i++)
		{
			var component = this._Components[i];
			if(component == null)
			{
				continue;
			}
			component.resolveComponentIndices(this._Components);
		}

		this._Images.sort(function(a,b)
		{
			return a._DrawOrder - b._DrawOrder;
		});

		this._Solvers.sort(function(a,b)
		{
			return a._Order - b._Order;
		});
	};	


	Actor.prototype._ScaleX = function()
	{
		return this._RootNode._Scale[0];
	}

	Actor.prototype.setScaleX = function(scaleX)
	{
		this._RootNode._Scale[0] = scaleX;	
		this._RootNode._IsDirty = true;
		this._RootNode.markWorldDirty();
	};

	Actor.prototype._ScaleY = function()
	{
		return this._RootNode._Scale[1];
	}

	Actor.prototype.setScaleY = function(scaleY)
	{
		this._RootNode._Scale[1] = scaleY;
		this._RootNode._IsDirty = true;
		this._RootNode.markWorldDirty();
	};

	Actor.prototype.setXY = function(xVal, yVal)
	{
		this._RootNode._Translation[0] = xVal;
		this._RootNode._Translation[1] = yVal;
		this._RootNode._IsDirty = true;
		this._RootNode.markWorldDirty();
	}

	Actor.prototype._X = function()
	{
		return this._RootNode._Translation[0];
	}

	Actor.prototype._Y = function()
	{
		return this._RootNode._Translation[1];
	}

	return Actor;
}());
var ActorComponent = (function ()
{
	function ActorComponent()
	{
		this._Name = "Component";
		this._Parent = null;
		this._CustomProperties = [];
	}

	/*ActorComponent.prototype = 
	{ 
		constructor:ActorComponent,
		get parent() 
		{ 
			return this._Parent;
		},
	};*/

	ActorComponent.defineProperties = function(prototype)
	{
		Object.defineProperties(prototype,
		{
			parent:
			{
				get: function()
				{
					return this._Parent;
				}
			}
		});
	};

	ActorComponent.defineProperties(ActorComponent.prototype);

	ActorComponent.subclass = function(other)
	{
		other.prototype.initialize = ActorComponent.prototype.initialize;
		other.prototype.advance = ActorComponent.prototype.advance;
		other.prototype.resolveComponentIndices = ActorComponent.prototype.resolveComponentIndices;
		other.prototype.getCustomProperty = ActorComponent.prototype.getCustomProperty;
	};


	ActorComponent.prototype.initialize = function(actor, graphics)
	{

	};

	ActorComponent.prototype.advance = function(seconds)
	{
	};

	ActorComponent.prototype.resolveComponentIndices = function(components)
	{
		if(this._ParentIdx !== undefined)
		{
			this._Parent = components[this._ParentIdx];
			if(this.isNode && this._Parent && this._Parent._Children)
			{
				this._Parent._Children.push(this);
			}
		}
	};

	ActorComponent.prototype.copy = function(component, resetActor)
	{
		this._Name = component._Name;
		this._ParentIdx = component._ParentIdx;
		this._Idx = component._Idx;
	};

	ActorComponent.prototype.getCustomProperty = function(name)
	{
		var props = this._CustomProperties;
		for(var i = 0; i < props.length; i++)
		{
			var prop = props[i];
			if(prop._Name === name)
			{
				return prop;
			}
		}
		return null;
	};
	
	return ActorComponent;
}());
var ActorEvent = (function ()
{
	function ActorEvent()
	{
		ActorComponent.call(this);
	}

	ActorComponent.defineProperties(ActorEvent);
	ActorComponent.subclass(ActorEvent);
	
	ActorEvent.prototype.getTipWorldTranslation = function()
	{
		var transform = _mat2d.create();
		transform[4] = this._Length;
		_mat2d.mul(transform, this.getWorldTransform(), transform);
		return _vec2.set(_vec2.create(), transform[4], transform[5]);
	};

	ActorEvent.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorEvent();
		ActorEvent.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorEvent.prototype.copy = function(node, resetActor)
	{
		ActorComponent.prototype.copy.call(this, node, resetActor);
		this._Length = node._Length;
		this._IsConnectedToImage = node._IsConnectedToImage;
	};

	return ActorEvent;
}());
var ActorNode = (function ()
{
	function ActorNode()
	{
		ActorComponent.call(this);
		this._Children = [];
		this._Dependents = [];
		this._Transform = _mat2d.create();
		this._WorldTransform = _mat2d.create();
		this._OverrideWorldTransform = false;
		this._OverrideRotation = null;
		
		this._Translation = _vec2.create();
		this._Rotation = 0;
		this._ParentIdx = 0;
		this._Scale = _vec2.set(_vec2.create(), 1, 1);
		this._Opacity = 1;
		this._RenderOpacity = 1;

		this._IsDirty = true;
		this._IsWorldDirty = true;

		this._SuppressMarkDirty = false;
	}

	function _UpdateWorldTransform(node)
	{
		node._IsWorldDirty = false;

		var transform = node._OverrideWorldTransform ? node._WorldTransform : _mat2d.copy(node._WorldTransform, node.getTransform());
		
		node._RenderOpacity = node._Opacity;
		
		var parent = node._Parent;
		if(parent)
		{
			parent.updateTransforms();
			node._RenderOpacity *= parent._RenderOpacity;
			if(!node._OverrideWorldTransform)
			{
				transform = _mat2d.mul(transform, parent._WorldTransform, transform);
			}
		}

		return transform;
	}

	function _UpdateTransform(node)
	{

		node._IsDirty = false;

		var r = node._OverrideRotation !== null ? node._OverrideRotation : node._Rotation;
		var t = node._Translation;

		//t[0] += 0.01;
		var s = node._Scale;
		var transform = node._Transform;

		_mat2d.fromRotation(transform, r);

		transform[4] = t[0];
		transform[5] = t[1];

		_mat2d.scale(transform, transform, s);

		return transform;
	}

	ActorNode.defineProperties = function(prototype)
	{
		ActorComponent.defineProperties(prototype);

		Object.defineProperties(prototype,
		{
			isNode:
			{
				get: function()
				{
					return true;
				}
			},
			x:
			{
				get: function()
				{
					return this._Translation[0];
				},
				set: function(value)
				{
					if(this._Translation[0] != value)
					{
						this._Translation[0] = value;
						this._IsDirty = true;
						this.markWorldDirty();
					}
				}
			},
			y:
			{
				get: function()
				{
					return this._Translation[1];
				},
				set: function(value)
				{
					if(this._Translation[1] != value)
					{
						this._Translation[1] = value;
						this._IsDirty = true;
						this.markWorldDirty();
					}
				}
			},
			scaleX:
			{
				get: function()
				{
					return this._Scale[0];
				},
				set: function(value)
				{
					if(this._Scale[0] != value)
					{
						this._Scale[0] = value;
						this._IsDirty = true;
						this.markWorldDirty();
					}
				}
			},
			scaleY:
			{
				get: function()
				{
					return this._Scale[1];
				},
				set: function(value)
				{
					if(this._Scale[1] != value)
					{
						this._Scale[1] = value;
						this._IsDirty = true;
						this.markWorldDirty();
					}
				}
			},
			rotation:
			{
				get: function()
				{
					return this._Rotation;
				},
				set: function(value)
				{
					if(this._Rotation != value)
					{
						this._Rotation = value;
						this._IsDirty = true;
						this.markWorldDirty();
					}
				}
			},
			opacity:
			{
				get: function()
				{
					return this._Opacity;
				},
				set: function(value)
				{
					if(this._Opacity != value)
					{
						this._Opacity = value;
						this.markWorldDirty();
					}
				}
			}
		});
	};

	ActorNode.defineProperties(ActorNode.prototype);
/*
	ActorNode.prototype = 
	{ 
		constructor:ActorNode,
		get isNode()
		{
			return true;
		},
		get x() 
		{ 
			return this._Translation[0];
		},
		set x(value)
		{
			if(this._Translation[0] != value)
			{
				this._Translation[0] = value;
				this._IsDirty = true;
				this.markWorldDirty();
			}
		},
		get y() 
		{ 
			return this._Translation[1];
		},
		set y(value)
		{
			if(this._Translation[1] != value)
			{
				this._Translation[1] = value;
				this._IsDirty = true;
				this.markWorldDirty();
			}
		},
		get scaleX() 
		{ 
			return this._Scale[0];
		},
		set scaleX(value)
		{
			if(this._Scale[0] != value)
			{
				this._Scale[0] = value;
				this._IsDirty = true;
				this.markWorldDirty();
			}
		},
		get scaleY() 
		{ 
			return this._Scale[1];
		},
		set scaleY(value)
		{
			if(this._Scale[1] != value)
			{
				this._Scale[1] = value;
				this._IsDirty = true;
				this.markWorldDirty();
			}
		},
		get rotation() 
		{ 
			return this._Rotation;
		},
		set rotation(value)
		{
			if(this._Rotation != value)
			{
				this._Rotation = value;
				this._IsDirty = true;
				this.markWorldDirty();
			}
		},
		get opacity() 
		{ 
			return this._Opacity;
		},
		set opacity(value)
		{
			if(this._Opacity != value)
			{
				this._Opacity = value;
				this.markWorldDirty();
			}
		}
	};
*/
	ActorComponent.subclass(ActorNode);

	ActorNode.prototype.overrideRotation = function(r)
	{
		if(this._OverrideRotation !== r)
		{
			this._OverrideRotation = r;
			this._IsDirty = true;
			this.markWorldDirty();
		}
	};

	ActorNode.prototype.getWorldTransform = function()
	{
		if(this._IsWorldDirty)
		{
			return _UpdateWorldTransform(this);
		}
		return this._WorldTransform;
		
	};

	ActorNode.prototype.updateTransforms = function()
	{
		if(this._IsDirty)
		{
			_UpdateTransform(this);
		}
		if(this._IsWorldDirty)
		{
			_UpdateWorldTransform(this);
		}
	};

	ActorNode.prototype.getTransform = function()
	{
		if(this._IsDirty)
		{
			_UpdateTransform(this);
		}
		return this._Transform;
	};

	ActorNode.prototype.markWorldDirty = function()
	{
		if(this._IsWorldDirty || this._SuppressMarkDirty)
		{
			return;
		}
		var c = this._Children;
		for(var i = 0; i < c.length; i++)
		{
			c[i].markWorldDirty();
		}

		var c = this._Dependents;
		for(var i = 0; i < c.length; i++)
		{
			c[i].markWorldDirty();
		}

		this._IsWorldDirty = true;
	};

	ActorNode.prototype.getWorldTranslation = function()
	{
		var transform = this.getWorldTransform();
		return _vec2.set(_vec2.create(), transform[4], transform[5]);
	};

	ActorNode.subclass = function(other)
	{
		ActorComponent.subclass(other);
		other.prototype.getWorldTransform = ActorNode.prototype.getWorldTransform;
		other.prototype.getTransform = ActorNode.prototype.getTransform;
		other.prototype.updateTransforms = ActorNode.prototype.updateTransforms;
		other.prototype.markWorldDirty = ActorNode.prototype.markWorldDirty;
		other.prototype.getWorldTranslation = ActorNode.prototype.getWorldTranslation;
		other.prototype.overrideRotation = ActorNode.prototype.overrideRotation;
	};

	ActorNode.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorNode();
		ActorNode.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorNode.prototype.copy = function(node, resetActor)
	{
		ActorComponent.prototype.copy.call(this, node, resetActor);
		this._IsDirty = true;
		this._IsWorldDirty = true;
		_mat2d.copy(this._Transform, node._Transform);
		_mat2d.copy(this._WorldTransform, node._WorldTransform);
		_vec2.copy(this._Translation, node._Translation);
		_vec2.copy(this._Scale, node._Scale);
		this._Rotation = node._Rotation;
		this._Opacity = node._Opacity;
		this._RenderOpacity = node._RenderOpacity;
		this._OverrideWorldTransform = node._OverrideWorldTransform;
		this._OverrideRotation = node._OverrideRotation;
	};
	
	return ActorNode;
}());
var ActorBone = (function ()
{
	function ActorBone()
	{
		ActorNode.call(this);

		this._Length = 0;
		this._IsConnectedToImage = false;
	}

	ActorNode.defineProperties(ActorBone.prototype);
	ActorNode.subclass(ActorBone);
	
	ActorBone.prototype.getTipWorldTranslation = function()
	{
		var transform = _mat2d.create();
		transform[4] = this._Length;
		_mat2d.mul(transform, this.getWorldTransform(), transform);
		return _vec2.set(_vec2.create(), transform[4], transform[5]);
	};

	ActorBone.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorBone();
		ActorBone.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorBone.prototype.copy = function(node, resetActor)
	{
		ActorNode.prototype.copy.call(this, node, resetActor);
		this._Length = node._Length;
		this._IsConnectedToImage = node._IsConnectedToImage;
	};

	return ActorBone;
}());
var ActorImage = (function ()
{
	function ActorImage()
	{
		ActorNode.call(this);
		this._DrawOrder = 0;
		this._BlendMode = ActorImage.BlendModes.Normal;
		this._AtlasIndex = -1;
		this._NumVertices = 0;
		this._HasVertexDeformAnimation = false;
		this._AnimationDeformedVertices = null;
		this._Vertices = null;
		this._Triangles = null;
		this._ConnectedBones = null;
		this._BoneMatrices = null;
		this._IsInstance = false;

		this._VertexBuffer = null;
		this._IndexBuffer = null;
		this._DeformVertexBuffer = null;
	}

	/*ActorImage.prototype = 
	{ 
		constructor:ActorImage,
		get hasVertexDeformAnimation() 
		{ 
			return this._HasVertexDeformAnimation; 
		},
		set hasVertexDeformAnimation(value)
		{
			this._HasVertexDeformAnimation = value;
			this._AnimationDeformedVertices = new Float32Array(this._NumVertices * 2);

			// Copy the deform verts from the rig verts.
			var writeIdx = 0;
			var readIdx = 0;
			var readStride = this._VertexStride;
			for(var i = 0; i < this._NumVertices; i++)
			{
				this._AnimationDeformedVertices[writeIdx++] = this._Vertices[readIdx];
				this._AnimationDeformedVertices[writeIdx++] = this._Vertices[readIdx+1];
				readIdx += readStride;
			}
		}
	};*/


	ActorImage.defineProperties = function(prototype)
	{
		ActorNode.defineProperties(prototype);

		Object.defineProperties(prototype,
		{
			hasVertexDeformAnimation:
			{
				get: function()
				{
					return this._HasVertexDeformAnimation;
				},
				set: function(value)
				{
					this._HasVertexDeformAnimation = value;
					this._AnimationDeformedVertices = new Float32Array(this._NumVertices * 2);

					// Copy the deform verts from the rig verts.
					var writeIdx = 0;
					var readIdx = 0;
					var readStride = this._VertexStride;
					for(var i = 0; i < this._NumVertices; i++)
					{
						this._AnimationDeformedVertices[writeIdx++] = this._Vertices[readIdx];
						this._AnimationDeformedVertices[writeIdx++] = this._Vertices[readIdx+1];
						readIdx += readStride;
					}
				}
			}
		});
	};

	ActorImage.defineProperties(ActorImage.prototype);

	ActorNode.subclass(ActorImage);
	
	ActorImage.BlendModes = 
	{
		"Normal":0,
		"Multiply":1,
		"Screen":2,
		"Additive":3
	};

	ActorImage.prototype.dispose = function(actor, graphics)
	{
		if(this._IsInstance)
		{
			if(this._DeformVertexBuffer)
			{
				this._DeformVertexBuffer.dispose();
				this._DeformVertexBuffer = null;
			}
		}
		else
		{
			if(this._VertexBuffer)
			{
				this._VertexBuffer.dispose();
				this._VertexBuffer = null;
			}
			if(this._IndexBuffer)
			{
				this._IndexBuffer.dispose();
				this._IndexBuffer = null;
			}

		}
	};

	ActorImage.prototype.initialize = function(actor, graphics)
	{
		if(!this._IsInstance)
		{
			this._VertexBuffer = graphics.makeVertexBuffer(this._Vertices);
			this._IndexBuffer = graphics.makeIndexBuffer(this._Triangles);
		}
		else if(this._HasVertexDeformAnimation)
		{
			this._DeformVertexBuffer = graphics.makeVertexBuffer(this._AnimationDeformedVertices);
		}

		if(this._IsInstance && this._ConnectedBones)
		{
			var bt = this._BoneMatrices = new Float32Array((this._ConnectedBones.length+1) * 6);

			// First bone transform is always identity.
			bt[0] = 1;
			bt[1] = 0;
			bt[2] = 0;
			bt[3] = 1;
			bt[4] = 0;
			bt[5] = 0;
		}
		delete this._Vertices;
		delete this._Triangles;

		this._Texture = actor._Atlases[this._AtlasIndex];
	};

	ActorImage.prototype.advance = function()
	{
		if(this._HasVertexDeformAnimation && this._VerticesDirty)
		{
			this._DeformVertexBuffer.update(this._AnimationDeformedVertices);
			this._VerticesDirty = false;
		}

		if(this._ConnectedBones)
		{
			var bt = this._BoneMatrices;
			var bidx = 6; // Start after first identity.

			var mat = _mat2d.create();

			for(var i = 0; i < this._ConnectedBones.length; i++)
			{
				var cb = this._ConnectedBones[i];

				cb.node.updateTransforms();
				var wt = _mat2d.mul(mat, cb.node.getWorldTransform(), cb.ibind);

				bt[bidx++] = wt[0];
				bt[bidx++] = wt[1];
				bt[bidx++] = wt[2];
				bt[bidx++] = wt[3];
				bt[bidx++] = wt[4];
				bt[bidx++] = wt[5];
			}
		}
	};

	ActorImage.prototype.draw = function(graphics, alpha)
	{
		var t = this._WorldTransform;
		switch(this._BlendMode)
		{
			case ActorImage.BlendModes.Normal:
				graphics.enableBlending();
				break;
			case ActorImage.BlendModes.Multiply:
				graphics.enableMultiplyBlending();
				break;
			case ActorImage.BlendModes.Screen:
				graphics.enableScreenBlending();
				break;
			case ActorImage.BlendModes.Additive:
				graphics.enableAdditiveBlending();
				break;

		}

		var color = [1.0, 1.0, 1.0, 1.0];
		var realOpacity = this._RenderOpacity * (alpha != null ? alpha : 1.0);
		if(this._ConnectedBones)
		{
			if(this._DeformVertexBuffer)
			{
				graphics.drawTexturedAndDeformedSkin(t, this._DeformVertexBuffer, this._VertexBuffer, this._IndexBuffer, this._BoneMatrices, realOpacity, color, this._Texture);
			}
			else
			{
				graphics.drawTexturedSkin(t, this._VertexBuffer, this._IndexBuffer, this._BoneMatrices, realOpacity, color, this._Texture);
			}
		}
		else
		{
			if(this._DeformVertexBuffer)
			{
				graphics.drawTexturedAndDeformed(t, this._DeformVertexBuffer, this._VertexBuffer, this._IndexBuffer, realOpacity, color, this._Texture);
			}
			else
			{
				graphics.drawTextured(t, this._VertexBuffer, this._IndexBuffer, realOpacity, color, this._Texture);
			}
		}
	};

	ActorImage.prototype.resolveComponentIndices = function(components)
	{
		ActorNode.prototype.resolveComponentIndices.call(this, components);

		if(this._ConnectedBones)
		{
			for(var j = 0; j < this._ConnectedBones.length; j++)
			{
				var cb = this._ConnectedBones[j];
				cb.node = components[cb.componentIndex];
				cb.node._IsConnectedToImage = true;
			}
		}
	};

	ActorImage.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorImage();
		node._IsInstance = true;
		ActorImage.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorImage.prototype.copy = function(node, resetActor)
	{
		ActorNode.prototype.copy.call(this, node, resetActor);

		this._DrawOrder = node._DrawOrder;
		this._BlendMode = node._BlendMode;
		this._AtlasIndex = node._AtlasIndex;
		this._NumVertices = node._NumVertices;
		this._VertexStride = node._VertexStride;
		this._HasVertexDeformAnimation = node._HasVertexDeformAnimation;
		this._Vertices = node._Vertices;
		this._Triangles = node._Triangles;
		// N.B. actor.initialize must've been called before instancing.
		this._VertexBuffer = node._VertexBuffer;
		this._IndexBuffer = node._IndexBuffer;
		if (node._HasVertexDeformAnimation)
		{
			var deformedVertexLength = this._NumVertices * 2;
			this._AnimationDeformedVertices = new Float32Array(deformedVertexLength);
			for(var i = 0; i < deformedVertexLength; i++)
			{
				this._AnimationDeformedVertices[i] = node._AnimationDeformedVertices[i];
			}
		}

		if(node._ConnectedBones)
		{
			this._ConnectedBones = [];
			for(var i = 0; i < node._ConnectedBones.length; i++)
			{
				var cb = node._ConnectedBones[i];
				// Copy all props except for the actual node reference which will update in our resolve.
				this._ConnectedBones.push({
						componentIndex:cb.componentIndex,
						bind:cb.bind,
						ibind:cb.ibind
					});
			}
		}
	};

	return ActorImage;
}());
var ActorRootBone = (function ()
{
	function ActorRootBone()
	{
		ActorNode.call(this);
	}

	ActorNode.defineProperties(ActorRootBone.prototype);
	ActorNode.subclass(ActorRootBone);

	ActorRootBone.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorRootBone();
		ActorRootBone.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorRootBone.prototype.copy = function(node, resetActor)
	{
		ActorNode.prototype.copy.call(this, node, resetActor);
	};
	
	return ActorRootBone;
}());
var ActorIKTarget = (function ()
{
	function ActorIKTarget()
	{
		ActorNode.call(this);

		this._Order = 0;
		this._Strength = 0;
		this._InvertDirection = false;
		this._InfluencedBones = null;


		// Solve properties.
		this._Bone1 = null;
		this._Bone1Child = null;
		this._Bone2 = null;
		this._Chain = null;
	}

	ActorNode.defineProperties(ActorIKTarget.prototype);
	ActorNode.subclass(ActorIKTarget);

	ActorIKTarget.prototype.resolveComponentIndices = function(components)
	{
		ActorNode.prototype.resolveComponentIndices.call(this, components);

		if(this._InfluencedBones)
		{
			for(var j = 0; j < this._InfluencedBones.length; j++)
			{
				var componentIndex = this._InfluencedBones[j];
				if(componentIndex.constructor !== Number)
				{
					componentIndex = componentIndex._Index;
				}

				{
					this._InfluencedBones[j] = components[componentIndex];
					this._InfluencedBones[j]._Dependents.push(this);
				}
			}
		}

		var bones = this._InfluencedBones;
		if(!bones.length)
		{
			return;
		}
		this._Bone1 = bones[0];
		this._Bone2 = bones[bones.length-1];
		var b1c = this._Bone2;
		var b1 = this._Bone1;
		if(bones.length > 1)
		{
			while(b1c && b1c._Parent != b1)
			{
				b1c = b1c._Parent;
			}
		}

		this._Bone1Child = b1c;

		var end = this._Bone2;
		this._Chain = [];
		while(end && end != b1._Parent)
		{
			// if the bone or the parent of the bone is in, then we will manipulate the rotation, so it's in.
			this._Chain.push({bone:end, angle:0, in:bones.indexOf(end) != -1 || bones.indexOf(end._Parent) != -1});
			end = end._Parent;
		}
	};

	ActorIKTarget.prototype.initialize = function()
	{
		var bones = this._InfluencedBones;
		if(!bones.length)
		{
			return;
		}
		this._Bone1 = bones[0];
		this._Bone2 = bones[bones.length-1];
		var b1c = this._Bone2;
		var b1 = this._Bone1;
		if(bones.length > 1)
		{
			while(b1c && b1c._Parent != b1)
			{
				b1c = b1c._Parent;
			}
		}

		this._Bone1Child = b1c;

		var end = this._Bone2;
		this._Chain = [];
		while(end && end != b1._Parent)
		{
			// if the bone or the parent of the bone is in, then we will manipulate the rotation, so it's in.
			this._Chain.push({bone:end, angle:0, in:bones.indexOf(end) != -1 || bones.indexOf(end._Parent) != -1});
			end = end._Parent;
		}
	};

	ActorIKTarget.prototype.needsSolve = function()
	{
		if(this._IsWorldDirty || this._IsDirty)
		{
			return true;
		}
		return false;
	};

	ActorIKTarget.prototype.solveStart = function()
	{
		if(this._Bone1 === null)
		{
			return;
		}

		// Reset all rotation overrides to FK ones,

		if(this._Bone1Child !== this._Bone2)
		{
			this._Bone1Child.overrideRotation(this._Bone1Child._Rotation);
		}

		var bones = this._InfluencedBones;
		for(var i = 0; i < bones.length; i++)
		{
			var b = bones[i];
			b.overrideRotation(b._Rotation);
		}
	};

	function _Solve2(b1, b2, worldTargetTranslation, invert)
	{
		var world = b1._Parent.getWorldTransform();
		var b1c = b2;
		while(b1c && b1c._Parent != b1)
		{
			b1c = b1c._Parent;
		}
		// Transform to root bone space
		if(b1._Parent._Length)
		{
			var t = _mat2d.fromTranslation(_mat2d.create(), [b1._Parent._Length, 0]);
			world = _mat2d.mul(t, world, t);
		}

		var iworld = _mat2d.invert(_mat2d.create(), world);

		var pA = b1.getWorldTranslation();
		var pC = b1.getTipWorldTranslation();
		var pB = b2.getTipWorldTranslation();
		var pBT = _vec2.copy(_vec2.create(), worldTargetTranslation);

		var pA = _vec2.transformMat2d(pA, pA, iworld);
		var pC = _vec2.transformMat2d(pC, pC, iworld);
		var pB = _vec2.transformMat2d(pB, pB, iworld);
		var pBT = _vec2.transformMat2d(pBT, pBT, iworld);

		// http://mathworld.wolfram.com/LawofCosines.html
		var av = _vec2.subtract(_vec2.create(), pB, pC);
		var a = _vec2.length(av);

		var bv = _vec2.subtract(_vec2.create(), pC, pA);
		var b = _vec2.length(bv);

		var cv = _vec2.subtract(_vec2.create(), pBT, pA);
		var c = _vec2.length(cv);

		var A = Math.acos(Math.max(-1,Math.min(1,(-a*a+b*b+c*c)/(2*b*c))));
		var C = Math.acos(Math.max(-1, Math.min(1,(a*a+b*b-c*c)/(2*a*b))));

		var angleCorrection = 0;
		if(b1c != b2)
		{
			var world2 = b1c.getWorldTransform();
			var iworld2 = _mat2d.invert(_mat2d.create(), world2);

			var pa2 = b2.getTipWorldTranslation();
			var tipBone2Local = _vec2.transformMat2d(pa2, pa2, iworld2);
			var a = Math.atan2(tipBone2Local[1], tipBone2Local[0]);

			angleCorrection = -a;
		}
		if(invert)
		{
			b1.overrideRotation(Math.atan2(pBT[1],pBT[0]) - A);
			b1c.overrideRotation(-C+Math.PI+angleCorrection);
		}
		else
		{
			b1.overrideRotation(A+Math.atan2(pBT[1],pBT[0]));
			b1c.overrideRotation(C-Math.PI+angleCorrection);
		}
	}

	function _Solve1(b1, worldTargetTranslation)
	{
		var world2 = b1.getWorldTransform();
		var iworld2 = _mat2d.invert(_mat2d.create(), world2);

		var targetLocal = _vec2.transformMat2d(_vec2.create(), worldTargetTranslation, iworld2);
		var a = Math.atan2(targetLocal[1], targetLocal[0]);

		b1.overrideRotation(b1._OverrideRotation+a);
	}

	ActorIKTarget.prototype.solve = function()
	{
		/*if(this._Bone1 === null || (!this._IsWorldDirty && !this._IsDirty))
		{
			return true;
		}*/

		var worldTargetTranslation = _vec2.create();
		var wt = this.getWorldTransform();
		worldTargetTranslation[0] = wt[4];
		worldTargetTranslation[1] = wt[5];
		//if(this._Name === "Foot Left Target")
		//console.log(worldTargetTranslation, this._Name, this._Translation);
		var strength = this._Strength;
		var bones = this._InfluencedBones;
		var chain = this._Chain;
		var tip = this._Bone2;
		var invert = this._InvertDirection;

		for(var i = 0; i < chain.length; i++)
		{
			var fk = chain[i];
			fk.angle = fk.bone._OverrideRotation;
		}

		if(bones.length === 1)
		{
			_Solve1(bones[0], worldTargetTranslation);
		}
		else if(bones.length == 2)
		{
			_Solve2(bones[0], bones[1], worldTargetTranslation, invert);
		}
		else
		{
			for(var i = 0; i < bones.length-1; i++)
			{
				_Solve2(bones[i], tip, worldTargetTranslation);
			}
		}

		// At the end, mix the FK angle with the IK angle by strength
		var m = strength;
		if(m != 1.0)
		{
			var im = 1.0-strength;
			for(var i = 0; i < chain.length; i++)
			{
				var fk = chain[i];
				if(fk.in)
				{
					fk.bone.overrideRotation(fk.bone._OverrideRotation * m + fk.angle * im);
				}
			}
		}

		
	};


	ActorIKTarget.prototype.makeInstance = function(resetActor)
	{
		var node = new ActorIKTarget();
		ActorIKTarget.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	ActorIKTarget.prototype.copy = function(node, resetActor)
	{
		ActorNode.prototype.copy.call(this, node, resetActor);
		

		this._Order = node._Order;
		this._Strength = node._Strength;
		this._InvertDirection = node._InvertDirection;
		this._InfluencedBones = [];
		for (var i = 0; i < node._InfluencedBones.length; i++)
		{
			var ib = node._InfluencedBones[i];
			if(ib.constructor === ActorBone)
			{
				this._InfluencedBones.push(ib._Index);
			}
			else
			{
				this._InfluencedBones.push(ib);
			}
		}
	};
	
	return ActorIKTarget;
}());
var Animation = (function ()
{
	function Animation(actor)
	{
		this._Actor = actor;
		this._Components = [];
		this._TriggerComponents = [];
		this._DisplayStart = 0;
		this._DisplayEnd = 0;

		this._Name = null;
		this._FPS = 60;
		this._Duration = 0;
		this._Loop = false;
	}

	function keyFrameLocation(seconds, list, start, end)
	{
		var mid;
		var element;
		while (start <= end) 
		{
	    	mid = ((start + end) >> 1);
			element = list[mid]._Time;
			if (element < seconds) 
			{
				start = mid + 1;
			} 
			else if (element > seconds) 
			{
				end = mid - 1;
			} 
			else 
			{
				return mid;
			}
		}
		return start;
	}

	Animation.prototype.triggerEvents = function(actorComponents, fromTime, toTime, triggered)
	{
		var keyedTriggerComponents = this._TriggerComponents;
		for(var i = 0; i < keyedTriggerComponents.length; i++)
		{
			var keyedComponent = keyedTriggerComponents[i];
			var properties = keyedComponent._Properties;
			for(var j = 0; j < properties.length; j++)
			{
				var property = properties[j];
				switch(property._Type)
				{
					case AnimatedProperty.Properties.Trigger:
						var keyFrames = property._KeyFrames;

						var kfl = keyFrames.length;
						if(kfl === 0)
						{
							continue;
						}

						var idx = keyFrameLocation(toTime, keyFrames, 0, keyFrames.length-1);
						if(idx === 0)
						{
							if(keyFrames.length > 0 && keyFrames[0]._Time === toTime)
							{
								var component = actorComponents[keyedComponent._ComponentIndex];
								triggered.push({
									name:component._Name,
									component:component,
									propertyType:property._Type,
									keyFrameTime:toTime,
									elapsed:0
								});
							}
						}
						else
						{
							for(var k = idx-1; k >= 0; k--)
							{
								var frame = keyFrames[k];	
								if(frame._Time > fromTime)
								{
									var component = actorComponents[keyedComponent._ComponentIndex];
									triggered.push({
										name:component._Name,
										component:component,
										propertyType:property._Type,
										keyFrameTime:frame._Time,
										elapsed:toTime-frame._Time
									});
								}
								else
								{
									break;
								}
							}
						}
						break;
					default:
						break;
				}
			}
		}
	};

	Animation.prototype.apply = function(time, actor, mix)
	{
		var components = this._Components;
		var imix = 1.0-mix;
		var actorComponents = actor._Components;
		for(var i = 0; i < components.length; i++)
		{
			var animatedComponent = components[i];
			var component = actorComponents[animatedComponent._ComponentIndex];
			if(!component)
			{
				continue;
			}

			var properties = animatedComponent._Properties;
			for(var j = 0; j < properties.length; j++)
			{
				var property = properties[j];
				var keyFrames = property._KeyFrames;

				var kfl = keyFrames.length;
				if(kfl === 0)
				{
					continue;
				}

				var idx = keyFrameLocation(time, keyFrames, 0, keyFrames.length-1);
				var value = 0.0;

				if(idx === 0)
				{
					value = keyFrames[0]._Value;
				}
				else
				{
					if(idx < keyFrames.length)
					{
						var fromFrame = keyFrames[idx-1];
						var toFrame = keyFrames[idx];
						if(time == toFrame._Time)
						{
							value = toFrame._Value;
						}
						else
						{
							value = fromFrame.interpolate(time, toFrame);
						}
					}
					else
					{
						var kf = keyFrames[idx-1];
						value = kf._Value;
					}
				}

				var markDirty = false;
				switch(property._Type)
				{
					case AnimatedProperty.Properties.PosX:
						if(mix === 1.0)
						{
							component._Translation[0] = value;	
						}
						else
						{
							component._Translation[0] = component._Translation[0] * imix + value * mix;
						}
						
						markDirty = true;
						break;
					case AnimatedProperty.Properties.PosY:
						if(mix === 1.0)
						{
							component._Translation[1] = value;
						}
						else
						{
							component._Translation[1] = component._Translation[1] * imix + value * mix;
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.ScaleX:
						if(mix === 1.0)
						{
							component._Scale[0] = value;
						}
						else
						{
							component._Scale[0] = value * imix + value * mix;
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.ScaleY:
						if(mix === 1.0)
						{
							component._Scale[1] = value;
						}
						else
						{
							component._Scale[1] = value * imix + value * mix;
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.Rotation:
						if(mix === 1.0)
						{
							component._Rotation = value;
						}
						else
						{
							component._Rotation = component._Rotation * imix + value * mix;
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.Opacity:
						if(mix === 1.0)
						{
							component._Opacity = value;
						}
						else
						{
							component._Opacity = component._Opacity * imix + value * mix;
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.IKStrength:
						if(mix === 1.0)
						{
							component._Strength = value;
						}
						else
						{
							component._Strength = component._Strength * imix + value * mix;	
						}
						markDirty = true;
						break;
					case AnimatedProperty.Properties.DrawOrder:
						if(actor._LastSetDrawOrder != value)
						{
							actor._LastSetDrawOrder = value;
							for(var i = 0; i < value.length; i++)
							{
								var v = value[i];
								actorComponents[v.componentIdx]._DrawOrder = v.value;
							}
							actor._IsImageSortDirty = true;
						}
						break;
					case AnimatedProperty.Properties.Length:
						markDirty = true;
						if(mix === 1.0)
						{
							component._Length = value;
						}
						else
						{
							component._Length = component._Length * imix + value * mix;
						}
						
						for(var l = 0; l < component._Children.length; l++)
						{
							var chd = component._Children[l];
							if(chd.constructor === ActorBone)
							{
								chd._Translation[0] = component._Length;
								chd._IsDirty = true;
							}
						}
						break;
					case AnimatedProperty.Properties.VertexDeform:
						component._VerticesDirty = true;
						var nv = component._NumVertices;
						var stride = component._VertexStride;
						var to = component._AnimationDeformedVertices;
						//console.log("TO", component, to);
						var from = value;
						var tidx = 0;
						var fidx = 0;
						if(mix === 1.0)
						{
							for(var l = 0; l < nv; l++)
							{
								to[tidx] = value[fidx++];
								to[tidx+1] = value[fidx++];
								tidx+=2;
								//tidx += stride;
							}
						}
						else
						{
							for(var l = 0; l < nv; l++)
							{
								to[tidx] = to[tidx] * imix + value[fidx++] * mix;
								to[tidx+1] = to[tidx+1] * imix + value[fidx++] * mix;
								tidx+=2;
								//tidx += stride;
							}
						}
						break;
					case AnimatedProperty.Properties.StringProperty:
						component._Value = value;
						break;
					case AnimatedProperty.Properties.IntProperty:
						if(mix === 1.0)
						{
							component._Value = value;	
						}
						else
						{
							component._Value = Math.round(component._Value * imix + value * mix);
						}
						break;
					case AnimatedProperty.Properties.FloatProperty:
						if(mix === 1.0)
						{
							component._Value = value;	
						}
						else
						{
							component._Value = component._Value * imix + value * mix;
						}
						break;
				}

				if(markDirty)
				{
					component._IsDirty = true;
					component.markWorldDirty();
				}
			}
		}
	};

	return Animation;
}());

var AnimatedComponent = (function ()
{
	function AnimatedComponent(componentIndex)
	{
		this._ComponentIndex = componentIndex;
		this._Properties = [];
	}

	return AnimatedComponent;
}());

var AnimatedProperty = (function ()
{
	function AnimatedProperty(type)
	{
		this._Type = type;
		this._KeyFrames = [];
	}

	AnimatedProperty.Properties = 
	{
		Unknown:0,
		PosX:1,
		PosY:2,
		ScaleX:3,
		ScaleY:4,
		Rotation:5,
		Opacity:6,
		DrawOrder:7,
		Length:8,
		VertexDeform:9,
		IKStrength:10,
		Trigger:11,
		IntProperty:12,
		FloatProperty:13,
		StringProperty:14
	};


	return AnimatedProperty;
}());

var KeyFrame = (function ()
{
	function KeyFrame()
	{
		this._Value = 0.0;
		this._Time = 0.0;
		this._Type = 0;
		this._InFactor = 0;
		this._InValue = 0;
		this._OutFactor = 0;
		this._OutValue = 0;
		this._Curve = null;
	}

	KeyFrame.Type =
	{
		Hold:0,
		Linear:1,
		Mirrored:2,
		Asymmetric:3,
		Disconnected:4,
		Progression:5
	};

	KeyFrame.prototype.setNext = function(nxt)
	{
		var t = this._Type;
		var ts = KeyFrame.Type;

		if(this._Value.constructor === Float32Array)
		{
			this._Curve = null;
			this._TmpBuffer = new Float32Array(this._Value.length);
			this.interpolate = KeyFrame.prototype.interpolateVertexBuffer;
		}
		else if(!nxt || (t === ts.Linear && nxt._type === ts.Linear) || t === ts.Hold)
		{
			this._Curve = null;
			this.interpolate = t === ts.Hold ? KeyFrame.prototype.interpolateHold : KeyFrame.prototype.interpolateLinear;
		}
		else
		{
			var timeRange = nxt._Time - this._Time;
			var outTime = this._Time + timeRange * this._OutFactor;
			var inTime = nxt._Time - timeRange * nxt._InFactor;

			this._Curve = new BezierAnimationCurve([this._Time, this._Value], [outTime, this._OutValue], [inTime, nxt._InValue], [nxt._Time, nxt._Value]);
			this.interpolate = KeyFrame.prototype.interpolateCurve;
		}
	};

	KeyFrame.prototype.interpolateVertexBuffer = function(t, nxt)
	{
		var mix = (t - this._Time)/(nxt._Time-this._Time);
		var mixi = 1.0 - mix;
		var wr = this._TmpBuffer;
		var from = this._Value;
		var to = nxt._Value;
		var l = to.length;

		for(var i = 0; i < l; i++)
		{
			wr[i] = from[i] * mixi + to[i] * mix;
		}

		return wr;
	};

	KeyFrame.prototype.interpolateHold = function(t, nxt)
	{
		return this._Value;
	};

	KeyFrame.prototype.interpolateCurve = function(t, nxt)
	{
		return this._Curve.get(t);
	};

	KeyFrame.prototype.interpolateLinear = function(t, nxt)
	{
		var mix = (t - this._Time)/(nxt._Time-this._Time);
		return this._Value * (1.0-mix) + nxt._Value * mix;
	};
	
	/*KeyFrame.prototype.interpolate = function(t, nxt)
	{
		if(this._Type === KeyFrame.Type.Hold)
		{
			return this._Value;
		}
		else if(!this._Curve)
		{	
			var mix = (t - this._Time)/(nxt._Time-this._Time);
			return this._Value * (1.0-mix) + nxt._Value * mix;
		}

		return this._Curve.get(t);
	};*/

	return KeyFrame;
}());

var AnimationInstance = (function ()
{
	function AnimationInstance(actor, animation)
	{
		Dispatcher.call(this);
		this._Actor = actor;
		this._Animation = animation;
		this._Time = 0;

		this._Min = 0;
		this._Max = animation._Duration;
		this._Loop = animation._Loop;
		this._Range = this._Max - this._Min;
	}

	Dispatcher.subclass(AnimationInstance);

	Object.defineProperties(AnimationInstance.prototype,
	{
		loop:
		{
			get: function()
			{
				return this._Loop;
			},
			set: function(value)
			{
				this._Loop = value;
			}
		},
		time:
		{
			get: function()
			{
				return this._Time;
			},
			set: function(newTime)
			{
				var delta = newTime - this._Time;
				var time = this._Time + (delta % this._Range);

				if(time < this._Min)
				{
					if(this._Loop)
					{
						time = this._Max - (this._Min - time);	
					}
					else
					{
						time = this._Min;
					}
				}
				else if(time > this._Max)
				{
					if(this._Loop)
					{
						time = this._Min + (time - this._Max);
					}
					else
					{
						time = this._Max;
					}
				}
				this._Time = time;
			}
		}
	});

	AnimationInstance.prototype.advance = function(seconds)
	{
		var triggeredEvents = [];
		var actorComponents = this._Actor._Components;
		var time = this._Time;
		time += seconds%this._Range;

		var completeTrigger = {
			name:"_Complete",
			// component:component,
			propertyType:AnimatedProperty.Properties.Trigger,
			keyFrameTime:this._Max,
			elapsed:time
		};

		if(time < this._Min)
		{
			if(this._Loop)
			{
				this._Animation.triggerEvents(actorComponents, time, this._Time, triggeredEvents);
				time = this._Max - (this._Min - time);
				this._Animation.triggerEvents(actorComponents, time, this._Max, triggeredEvents);
				triggeredEvents.push(completeTrigger);
			}
			else
			{
				time = this._Min;
				if(this._Time != time)
				{
					this._Animation.triggerEvents(actorComponents, this._Min, this._Time, triggeredEvents);
					triggeredEvents.push(completeTrigger);
				}
			}
		}
		else if(time > this._Max)
		{
			if(this._Loop)
			{
				this._Animation.triggerEvents(actorComponents, time, this._Time, triggeredEvents);
				time = this._Min + (time - this._Max);
				this._Animation.triggerEvents(actorComponents, this._Min-0.001, time, triggeredEvents);
				triggeredEvents.push(completeTrigger);
			}
			else
			{
				time = this._Max;
				if(this._Time != time)
				{
					this._Animation.triggerEvents(actorComponents, this._Time, this._Max, triggeredEvents);
					triggeredEvents.push(completeTrigger);
				}
			}
		}
		else if(time > this._Time)
		{
			this._Animation.triggerEvents(actorComponents, this._Time, time, triggeredEvents);
		}
		else
		{
			this._Animation.triggerEvents(actorComponents, time, this._Time, triggeredEvents);
		}

		for(var i = 0; i < triggeredEvents.length; i++)
		{
			var event = triggeredEvents[i];
			this.dispatch("animationEvent", event);
			this._Actor.dispatch("animationEvent", event);
		}
		this._Time = time;
	};

	AnimationInstance.prototype.apply = function(actor, mix)
	{
		this._Animation.apply(this._Time, actor, mix);
	};

	return AnimationInstance;
}());
function BezierAnimationCurve(pos1, control1, control2, pos2)
{
	var y0a = pos1[1]; // initial y
	var x0a = pos1[0]; // initial x 
	var y1a = control1[1];    // 1st influence y   
	var x1a = control1[0];    // 1st influence x 
	var y2a = control2[1];    // 2nd influence y
	var x2a = control2[0];    // 2nd influence x
	var y3a = pos2[1]; // final y 
	var x3a = pos2[0]; // final x 

	var E =   y3a - 3*y2a + 3*y1a - y0a;    
	var F = 3*y2a - 6*y1a + 3*y0a;             
	var G = 3*y1a - 3*y0a;             
	var H =   y0a;

	function yFromT (t, E, F, G, H)
	{
		var y = E*(t*t*t) + F*(t*t) + G*t + H;
		return y;
	}

	function cuberoot(x) 
	{
    	var y = Math.pow(Math.abs(x), 1/3);
    	return x < 0 ? -y : y;
	}	
	// http://stackoverflow.com/questions/27176423/function-to-solve-cubic-equation-analytically

	function solveCubic(a, b, c, d) 
	{
		if (Math.abs(a) < 1e-8) 
		{ 
			// Quadratic case, ax^2+bx+c=0
        	a = b; b = c; c = d;
        	if (Math.abs(a) < 1e-8) 
        	{ 
        		// Linear case, ax+b=0
            	a = b; b = c;
            	if (Math.abs(a) < 1e-8) // Degenerate case
                {
                	return [];
                }
            	return [-b/a];
        	}
			
			var D = b*b - 4*a*c;
        	if (Math.abs(D) < 1e-8)
				return [-b/(2*a)];
			else if (D > 0)
				return [(-b+Math.sqrt(D))/(2*a), (-b-Math.sqrt(D))/(2*a)];
			return [];
		}
		
		// Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
		var p = (3*a*c - b*b)/(3*a*a);
		var q = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
		var roots;

		if (Math.abs(p) < 1e-8) 
		{ 
			// p = 0 -> t^3 = -q -> t = -q^1/3
        	roots = [cuberoot(-q)];
    	} 
    	else if (Math.abs(q) < 1e-8) 
    	{ 
    		// q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
        	roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    	} 
    	else 
    	{
        	var D = q*q/4 + p*p*p/27;
        	if (Math.abs(D) < 1e-8) 
        	{       // D = 0 -> two roots
            	roots = [-1.5*q/p, 3*q/p];
        	} 
        	else if (D > 0) 
        	{
        		// Only one real root
            	var u = cuberoot(-q/2 - Math.sqrt(D));
            	roots = [u - p/(3*u)];
        	} 
        	else 
        	{
        		// D < 0, three roots, but needs to use complex numbers/trigonometric solution
				var u = 2*Math.sqrt(-p/3);
				var t = Math.acos(3*q/p/u)/3;  // D < 0 implies p < 0 and acos argument in [-1..1]
				var k = 2*Math.PI/3;
				roots = [u*Math.cos(t), u*Math.cos(t-k), u*Math.cos(t-2*k)];
        	}
		}
		
		// Convert back from depressed cubic
		for (var i = 0; i < roots.length; i++)
        {
        	roots[i] -= b/(3*a);
        }
        return roots;
	}

	this.get = function(x)
	{
		//console.log("GET FOR X", x);
		// First solve for t given x.
		var p0 = x0a-x;
		var p1 = x1a-x;
		var p2 = x2a-x;
		var p3 = x3a-x;

		var a = p3 - 3 * p2 + 3 * p1 - p0;
		var b = 3 * p2 - 6 * p1 + 3 * p0;
		var c = 3 * p1 - 3 * p0;
		var d = p0;

		var roots = solveCubic(a, b, c, d);
		var t = 0;
		for(var i = 0; i < roots.length; i++)
		{
			var r = roots[i];
			if(r >= 0.0 && r <= 1.0)
			{
				t = r;
				break;
			}
		}
		return yFromT(t, E, F, G, H);
	};

	// Bounds computation.
	function evalBez(p0, p1, p2, p3, t) 
	{
		var x = p0 * (1 - t) * (1 - t) * (1 - t) + 3 * p1 * t * (1 - t) * (1 - t) + 3 * p2 * t * t * (1 - t) + p3 * t * t * t;
		return x;
	}

	this.getBounds = function()
	{
		if(this.bounds)
		{
			return this.bounds;
		}

		var a = 3 * x3a - 9 * x2a + 9 * x1a - 3 * x0a;
		var b = 6 * x0a - 12 * x1a + 6 * x2a;
		var c = 3 * x1a - 3 * x0a;

		var disc = b * b - 4 * a * c;
		var xl = x0a;
		var xh = x0a;
		if (x3a < xl) xl = x3a;
		if (x3a > xh) xh = x3a;
		if (disc >= 0) 
		{
		    var t1 = (-b + Math.sqrt(disc)) / (2 * a);
		    //alert("t1 " + t1);
		    if (t1 > 0 && t1 < 1) 
		    {
		        var x1 = evalBez(x0a, x1a, x2a, x3a, t1);
		        if (x1 < xl) xl = x1;
		        if (x1 > xh) xh = x1;
		    }

		    var t2 = (-b - Math.sqrt(disc)) / (2 * a);
		    //alert("t2 " + t2);
		    if (t2 > 0 && t2 < 1) 
		    {
		        var x2 = evalBez(x0a, x1a, x2a, x3a, t2);
		        if (x2 < xl) xl = x2;
		        if (x2 > xh) xh = x2;
		    }
		}

		a = 3 * y3a - 9 * y2a + 9 * y1a - 3 * y0a;
		b = 6 * y0a - 12 * y1a + 6 * y2a;
		c = 3 * y1a - 3 * y0a;
		disc = b * b - 4 * a * c;
		var yl = y0a;
		var yh = y0a;
		if (y3a < yl) yl = y3a;
		if (y3a > yh) yh = y3a;
		if (disc >= 0) 
		{
		    var t1 = (-b + Math.sqrt(disc)) / (2 * a);

		    if (t1 > 0 && t1 < 1) 
		    {
		        var y1 = evalBez(y0a, y1a, y2a, y3a, t1);
		        if (y1 < yl) yl = y1;
		        if (y1 > yh) yh = y1;
		    }

		    var t2 = (-b - Math.sqrt(disc)) / (2 * a);

		    if (t2 > 0 && t2 < 1) 
		    {
		        var y2 = evalBez(y0a, y1a, y2a, y3a, t2);
		        if (y2 < yl) yl = y2;
		        if (y2 > yh) yh = y2;
		    }
		}

		this.bounds = [yl, yh];
		return this.bounds;
	};
}
var BinaryReader = (function()
{
	function BinaryReader(uint8Array)
	{
		this.isBigEndian = function()
		{
			var b = new ArrayBuffer(4);
			var a = new Uint32Array(b);
			var c = new Uint8Array(b);
			a[0] = 0xdeadbeef;
			return c[0] == 0xde;
		}();

		this.raw = uint8Array;
		this.dataView = new DataView(uint8Array.buffer);
		this.readIndex = 0;
	}

	BinaryReader.prototype.readFloat32 = function()
	{
		var v = this.dataView.getFloat32(this.readIndex, !this.isBigEndian);
		this.readIndex += 4;
		return v;
	};

	BinaryReader.prototype.readFloat32Array = function(ar, length)
	{
		if (!length)
		{
			length = ar.length;
		}
		for (var i = 0; i < length; i++)
		{
			ar[i] = this.dataView.getFloat32(this.readIndex, !this.isBigEndian);
			this.readIndex += 4;
		}
		return ar;
	};

	BinaryReader.prototype.readFloat64 = function()
	{
		var v = this.dataView.getFloat64(this.readIndex, !this.isBigEndian);
		this.readIndex += 8;
		return v;
	};

	BinaryReader.prototype.readUint8 = function()
	{
		return this.raw[this.readIndex++];
	};

	BinaryReader.prototype.isEOF = function()
	{
		return this.readIndex >= this.raw.length;
	};

	BinaryReader.prototype.readInt8 = function()
	{
		var v = this.dataView.getInt8(this.readIndex);
		this.readIndex += 1;
		return v;
	};

	BinaryReader.prototype.readUint16 = function()
	{
		var v = this.dataView.getUint16(this.readIndex, !this.isBigEndian);
		this.readIndex += 2;
		return v;
	};

	BinaryReader.prototype.readUint16Array = function(ar, length)
	{
		if (!length)
		{
			length = ar.length;
		}
		for (var i = 0; i < length; i++)
		{
			ar[i] = this.dataView.getUint16(this.readIndex, !this.isBigEndian);
			this.readIndex += 2;
		}
		return ar;
	};

	BinaryReader.prototype.readInt16 = function()
	{
		var v = this.dataView.getInt16(this.readIndex, !this.isBigEndian);
		this.readIndex += 2;
		return v;
	};

	BinaryReader.prototype.readUint32 = function()
	{
		var v = this.dataView.getUint32(this.readIndex, !this.isBigEndian);
		this.readIndex += 4;
		return v;
	};

	BinaryReader.prototype.readInt32 = function()
	{
		var v = this.dataView.getInt32(this.readIndex, !this.isBigEndian);
		this.readIndex += 4;
		return v;
	};

	BinaryReader.prototype.byteArrayToString = function(bytes)
	{
		var out = [],
			pos = 0,
			c = 0;
		while (pos < bytes.length)
		{
			var c1 = bytes[pos++];
			if (c1 < 128)
			{
				out[c++] = String.fromCharCode(c1);
			}
			else if (c1 > 191 && c1 < 224)
			{
				var c2 = bytes[pos++];
				out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
			}
			else if (c1 > 239 && c1 < 365)
			{
				// Surrogate Pair
				var c2 = bytes[pos++];
				var c3 = bytes[pos++];
				var c4 = bytes[pos++];
				var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
					0x10000;
				out[c++] = String.fromCharCode(0xD800 + (u >> 10));
				out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
			}
			else
			{
				var c2 = bytes[pos++];
				var c3 = bytes[pos++];
				out[c++] =
					String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			}
		}
		return out.join('');
	};

	BinaryReader.prototype.readString = function()
	{
		var length = this.readUint32();
		var ua = new Uint8Array(length);
		for (var i = 0; i < length; i++)
		{
			ua[i] = this.raw[this.readIndex++];
		}
		return this.byteArrayToString(ua);
	};

	BinaryReader.prototype.readRaw = function(to, length)
	{
		for (var i = 0; i < length; i++)
		{
			to[i] = this.raw[this.readIndex++];
		}
	};

	BinaryReader.alignment = 1024;

	return BinaryReader;
}());
var ActorLoader = (function ()
{
	var _FirstVersion = 1065353216;
	var _BlockTypes = {
		Components:1,
		ActorNode:2,
		ActorBone:3,
		ActorRootBone:4,
		ActorImage:5,
		View:6,
		Animation:7,
		Animations:8,
		Atlases:9,
		Atlas:10,
		ActorIKTarget:11,
		ActorEvent:12,
		CustomIntProperty:13,
		CustomFloatProperty:14,
		CustomStringProperty:15
	};

	function ActorLoader()
	{

	}	

	ActorLoader.prototype.load = function(url, callback)
	{
		if(url.constructor === String)
		{
			var req = new XMLHttpRequest();
			req.open("GET", url, true);
			req.responseType = "blob";
			req.onload = function()
			{
				var fileReader = new FileReader();
				fileReader.onload = function() 
				{
					_ReadShot(this.result, callback);
				};
				fileReader.readAsArrayBuffer(this.response);
			};
			req.send();
		}
		else
		{
			var fileReader = new FileReader();
			fileReader.onload = function() 
			{
				_ReadShot(this.result, callback);
			};
			fileReader.readAsArrayBuffer(url);
		}
	}

	function _ReadNextBlock(reader, error)
	{
		if(reader.isEOF())
		{
			return null;
		}
		try
		{
			var blockType = reader.readUint8();
			if(blockType === undefined)
			{
				return null;
			}
			var length = reader.readUint32();

			var uint8 = new Uint8Array(length);
			//console.log("TYPE", blockType, "LENGTH", length);
			reader.readRaw(uint8, length);
		}
		catch(err)
		{
			console.log(err.constructor);
			if(error)
			{
				error(err);
			}
			return null;
		}
		return {type:blockType, reader:new BinaryReader(uint8)};
	}

	function _ReadComponentsBlock(actor, reader)
	{
		var componentCount = reader.readUint16();
		var actorComponents = actor._Components;

		// Guaranteed from the exporter to be in index order.
		var block = null;
		while((block=_ReadNextBlock(reader, function(err) {actor.error = err;})) !== null)
		{
			var component = null;
			switch(block.type)
			{
				case _BlockTypes.CustomIntProperty:
				case _BlockTypes.CustomStringProperty:
				case _BlockTypes.CustomFloatProperty:
					component = _ReadCustomProperty(block.reader, new CustomProperty(), block.type);
					break;
				case _BlockTypes.ActorEvent:
					component = _ReadActorEvent(block.reader, new ActorEvent());
					break;
				case _BlockTypes.ActorNode:
					component = _ReadActorNode(block.reader, new ActorNode());
					break;
				case _BlockTypes.ActorBone:
					component = _ReadActorBone(block.reader, new ActorBone());
					break;
				case _BlockTypes.ActorRootBone:
					component = _ReadActorRootBone(block.reader, new ActorRootBone());
					break;
				case _BlockTypes.ActorImage:
					component = _ReadActorImage(block.reader, new ActorImage());
					break;
				case _BlockTypes.ActorIKTarget:
					component = _ReadActorIKTarget(block.reader, new ActorIKTarget());
					break;
			}
			if(component)
			{
				component._Index = actorComponents.length;
			}
			actorComponents.push(component);
		};

		actor.resolveHierarchy();
	}

	function _ReadAnimationBlock(actor, reader)
	{
		var animation = new Animation(actor);
		actor._Animations.push(animation);

		if(actor.dataVersion >= 11)
		{
			animation._Name = reader.readString();
			animation._FPS = reader.readUint8();
			animation._Duration = reader.readFloat32();
			animation._Loop = reader.readUint8() === 1;
		}

		// Read the number of keyed nodes.
		var numKeyedComponents = reader.readUint16();
		if(numKeyedComponents > 0)
		{	
			for(var i = 0; i < numKeyedComponents; i++)
			{
				var componentIndex = reader.readUint16();
				var component = actor._Components[componentIndex];
				if(!component)
				{
					// Bad component was loaded, read past the animation data.
 					// Note this only works after version 12 as we can read by the entire set of properties.
 					var props = reader.readUint16();
 					for(var j = 0; j < props; j++)
 					{
 						var propertyBlock = _ReadNextBlock(reader, function(err) {actor.error = err;});
 					}
				}
				else
				{
					var animatedComponent = new AnimatedComponent(componentIndex);
					if(component.constructor === ActorEvent)
					{
						// N.B. ActorEvents currently only keyframe their trigger so we cn optimize them into a separate array.
						animation._TriggerComponents.push(animatedComponent);	
					}
					else
					{
						animation._Components.push(animatedComponent);
					}
					

					var props = reader.readUint16();
					for(var j = 0; j < props; j++)
					{
						var propertyReader = null;
						var propertyType;
						
						if(actor.dataVersion >= 12)
						{
							// Since version 12 we write properties as blocks in order to allow for reading past unknown animated properties
							var propertyBlock = _ReadNextBlock(reader, function(err) {actor.error = err;});
							propertyReader = propertyBlock.reader;
							propertyType = propertyBlock.type;
						}
						else
						{
							propertyReader = reader;
							propertyType = reader.readUint8();	
						}

						var validProperty = false;
						switch(propertyType)
						{
							case AnimatedProperty.Properties.PosX:
							case AnimatedProperty.Properties.PosY:
							case AnimatedProperty.Properties.ScaleX:
							case AnimatedProperty.Properties.ScaleY:
							case AnimatedProperty.Properties.Rotation:
							case AnimatedProperty.Properties.Opacity:
							case AnimatedProperty.Properties.DrawOrder:
							case AnimatedProperty.Properties.Length:
							case AnimatedProperty.Properties.VertexDeform:
							case AnimatedProperty.Properties.IKStrength:
							case AnimatedProperty.Properties.Trigger:
							case AnimatedProperty.Properties.IntProperty:
							case AnimatedProperty.Properties.FloatProperty:
							case AnimatedProperty.Properties.StringProperty:
								validProperty = true;
								break;
							default:
								break;
						}
						if(!validProperty)
						{
							continue;
						}
						var animatedProperty = new AnimatedProperty(propertyType);
						animatedComponent._Properties.push(animatedProperty);

						var keyFrameCount = propertyReader.readUint16();
						var lastKeyFrame = null;
						for(var k = 0; k < keyFrameCount; k++)
						{
							var keyFrame = new KeyFrame();

							keyFrame._Time = propertyReader.readFloat64();

							// On newer version we write the interpolation first.
							if(actor.dataVersion >= 11)
							{
								switch(propertyType)
								{
									case AnimatedProperty.Properties.StringProperty:
									case AnimatedProperty.Properties.Trigger:
									case AnimatedProperty.Properties.DrawOrder:
										// These do not interpolate.
										break;
									default:
										keyFrame._Type = propertyReader.readUint8();
										switch(keyFrame._Type)
										{
											case KeyFrame.Type.Asymmetric:
											case KeyFrame.Type.Mirrored:
											case KeyFrame.Type.Disconnected:
												keyFrame._InFactor = propertyReader.readFloat64();
												keyFrame._InValue = propertyReader.readFloat32();
												keyFrame._OutFactor = propertyReader.readFloat64();
												keyFrame._OutValue = propertyReader.readFloat32();
												break;

											case KeyFrame.Type.Hold:
												keyFrame._InFactor = propertyReader.readFloat64();
												keyFrame._InValue = propertyReader.readFloat32();
												break;

											default:
												keyFrame._InValue = keyFrame._Value;
												keyFrame._OutValue = keyFrame._Value;
												break;
										}
										break;
								}
							}

							if(propertyType === AnimatedProperty.Properties.Trigger)
							{
								// No value on keyframe.
							}
							else if(propertyType === AnimatedProperty.Properties.IntProperty)
							{
								keyFrame._Value = propertyReader.readInt32();
							}
							else if(propertyType === AnimatedProperty.Properties.StringProperty)
							{
								keyFrame._Value = propertyReader.readString();
							}
							else if(propertyType === AnimatedProperty.Properties.DrawOrder)
							{
								var orderedImages = propertyReader.readUint16();
								var orderValue = [];
								for(var l = 0; l < orderedImages; l++)
								{
									var idx = propertyReader.readUint16();
									var order = propertyReader.readUint16();
									orderValue.push({
										componentIdx:idx,
										value:order
									});
								}
								keyFrame._Value = orderValue;
							}
							else if(propertyType === AnimatedProperty.Properties.VertexDeform)
							{
								keyFrame._Value = new Float32Array(component._NumVertices * 2);
								component.hasVertexDeformAnimation = true;
								propertyReader.readFloat32Array(keyFrame._Value);
							}
							else
							{
								keyFrame._Value = propertyReader.readFloat32();
							}
							if(actor.dataVersion === 1)
							{
								keyFrame._Type = propertyReader.readUint8();
								switch(keyFrame._Type)
								{
									case KeyFrame.Type.Asymmetric:
									case KeyFrame.Type.Mirrored:
									case KeyFrame.Type.Disconnected:
										keyFrame._InFactor = propertyReader.readFloat64();
										keyFrame._InValue = propertyReader.readFloat32();
										keyFrame._OutFactor = propertyReader.readFloat64();
										keyFrame._OutValue = propertyReader.readFloat32();
										break;

									case KeyFrame.Type.Hold:
										keyFrame._InFactor = propertyReader.readFloat64();
										keyFrame._InValue = propertyReader.readFloat32();
										break;

									default:
										keyFrame._InValue = keyFrame._Value;
										keyFrame._OutValue = keyFrame._Value;
										break;
								}
							}
							else
							{
								switch(keyFrame._Type)
								{
									case KeyFrame.Type.Asymmetric:
									case KeyFrame.Type.Mirrored:
									case KeyFrame.Type.Disconnected:
									case KeyFrame.Type.Hold:
										break;

									default:
										keyFrame._InValue = keyFrame._Value;
										keyFrame._OutValue = keyFrame._Value;
										break;
								}
							}
							if(propertyType === AnimatedProperty.Properties.DrawOrder)
							{
								// Always hold draw order.
								keyFrame._Type = KeyFrame.Type.Hold;
								//console.log("DRAW ORDER TYPE SHOULD BE HOLD", keyFrame._Type);
							}
							else if(propertyType === AnimatedProperty.Properties.VertexDeform)
							{
								keyFrame._Type = KeyFrame.Type.Linear;
							}

							if(lastKeyFrame)
							{
								lastKeyFrame.setNext(keyFrame);
							}
							animatedProperty._KeyFrames.push(keyFrame);
							lastKeyFrame = keyFrame;
						}
						if(lastKeyFrame)
						{
							lastKeyFrame.setNext(null);
						}
					}
				}
			}

			if(actor.dataVersion == 1)
			{
				animation._FPS  = reader.readUint8();
			}
			animation._DisplayStart = reader.readFloat32();
			animation._DisplayEnd = reader.readFloat32();
			//animation._DisplayStart = 0;
			//animation._DisplayEnd = 50/60;
		}
	}

	function _ReadAnimationsBlock(actor, reader)
	{
		var animationsCount = reader.readUint16();
		var block = null;
		while((block=_ReadNextBlock(reader, function(err) {actor.error = err;})) !== null)
		{
			switch(block.type)
			{
				case _BlockTypes.Animation:
					_ReadAnimationBlock(actor, block.reader);
					break;
			}
		};
	}

	function _BuildJpegAtlas(atlas, img, imga, callback)
	{
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var imageDataRGB = ctx.getImageData(0,0,canvas.width, canvas.height);
        var dataRGB = imageDataRGB.data;

        var canvasAlpha = document.createElement("canvas");
		canvasAlpha.width = img.width;
        canvasAlpha.height = img.height;
        var actx = canvasAlpha.getContext('2d');
        actx.drawImage(imga, 0, 0, imga.width, imga.height);

        var imageDataAlpha = actx.getImageData(0,0,canvasAlpha.width, canvasAlpha.height);
        var dataAlpha = imageDataAlpha.data;

        var pixels = dataAlpha.length/4;
        var widx = 3;

        for(var j = 0; j < pixels; j++)
        {
            dataRGB[widx] = dataAlpha[widx-1];
            widx+=4;
        }
        ctx.putImageData(imageDataRGB, 0, 0);

        var img = new Image();
		img.src = canvas.toDataURL();
		img.onload = function()
		{
			atlas.img = this;
			callback();
		};
	}

	function _JpegAtlas(dataRGB, dataAlpha, callback)
	{
		var _This = this;
		var img = document.createElement("img");
		var c = 0;
		img.onload = function()
		{
			c++;
			if(c==2)
			{
				_BuildJpegAtlas(_This, img, imga, callback);
			}
		};
		
		var imga = document.createElement("img");
		imga.onload = function()
		{
			c++;
			if(c==2)
			{
				_BuildJpegAtlas(_This, img, imga, callback);
			}
		};

		img.src = URL.createObjectURL(dataRGB);
		imga.src = URL.createObjectURL(dataAlpha);
	}

	function _ReadAtlasesBlock(actor, reader, callback)
	{
		// Read atlases.
		var numAtlases = reader.readUint16();

		var waitCount = 0;
		var loadedCount = 0;
		function loaded()
		{
			loadedCount++;
			if(loadedCount === waitCount)
			{
				callback();
			}
		}

		for(var i = 0; i < numAtlases; i++)
		{
			var size = reader.readUint32();
			var atlasDataRGB = new Uint8Array(size);
			reader.readRaw(atlasDataRGB, atlasDataRGB.length);

			var size = reader.readUint32();
			var atlasDataAlpha = new Uint8Array(size);
			reader.readRaw(atlasDataAlpha, atlasDataAlpha.length);

			var rgbSrc = new Blob([atlasDataRGB], {type: "image/jpeg"});
			var alphaSrc = new Blob([atlasDataAlpha], {type: "image/jpeg"});

			waitCount++;
			var atlas = new _JpegAtlas(rgbSrc, alphaSrc, loaded);

			actor._Atlases.push(atlas);//new Blob([atlasDataRGB], {type: "image/jpeg"}));
		}

		// Return true if we are waiting for atlases
		return waitCount !== loadedCount;
	}

	function _ReadShot(data, callback)
	{
		var reader = new BinaryReader(new Uint8Array(data));
		// Check signature
		if(reader.readUint8() !== 78 || reader.readUint8() !== 73 || reader.readUint8() !== 77 || reader.readUint8() !== 65)
		{
			console.log("Bad nima signature.");
			callback(null);
		}

		var version = reader.readUint32();
		var actor = new Actor();
		actor.dataVersion = version === _FirstVersion ? 1 : version;
		var block = null;
		var waitForAtlas = false;
		while((block=_ReadNextBlock(reader, function(err) {actor.error = err;})) !== null)
		{
			switch(block.type)
			{
				case _BlockTypes.Components:
					_ReadComponentsBlock(actor, block.reader);
					break;
				case _BlockTypes.View:
					block.reader.readFloat32Array(actor._ViewCenter);
					actor._ViewWidth = block.reader.readFloat32();
					actor._ViewHeight = block.reader.readFloat32();
					break;
				case _BlockTypes.Animations:
					_ReadAnimationsBlock(actor, block.reader);
					break;
				case _BlockTypes.Atlases:

					if(_ReadAtlasesBlock(actor, block.reader, function()
						{
							callback(actor);
						}))
					{
						waitForAtlas = true;
					}
					break;
			}
		}
		if(!waitForAtlas)
		{
			callback(actor);
		}
	}

	function _ReadActorComponent(reader, component)
	{
		component._Name = reader.readString();
		component._ParentIdx = reader.readUint16();
		return component;
	}

	function _ReadCustomProperty(reader, component, type)
	{
		_ReadActorComponent(reader, component);

		switch(type)
		{
			case _BlockTypes.CustomIntProperty:
				component._PropertyType = CustomProperty.Type.Integer;
				component._Value = reader.readInt32();
				break;
			case _BlockTypes.CustomFloatProperty:
				component._PropertyType = CustomProperty.Type.Float;
				component._Value = reader.readFloat32();
				break;
			case _BlockTypes.CustomStringProperty:
				component._PropertyType = CustomProperty.Type.String;
				component._Value = reader.readString();
				break;
		}

		return component;
	}

	function _ReadActorEvent(reader, component)
	{
		_ReadActorComponent(reader, component);
		return component;
	}

	function _ReadActorNode(reader, component)
	{
		_ReadActorComponent(reader, component);

		reader.readFloat32Array(component._Translation);
		component._Rotation = reader.readFloat32();
		reader.readFloat32Array(component._Scale);
		component._Opacity = reader.readFloat32();

		return component;
	}

	function _ReadActorBone(reader, component)
	{
		_ReadActorNode(reader, component);
		component._Length = reader.readFloat32();

		return component;
	}

	function _ReadActorRootBone(reader, component)
	{
		_ReadActorNode(reader, component);

		return component;
	}

	function _ReadActorIKTarget(reader, component)
	{
		_ReadActorNode(reader, component);

		component._Order = reader.readUint16();
		component._Strength = reader.readFloat32();
		component._InvertDirection = reader.readUint8() === 1;

		var numInfluencedBones = reader.readUint8();
		if(numInfluencedBones > 0)
		{
			component._InfluencedBones = [];

			for(var i = 0; i < numInfluencedBones; i++)
			{
				component._InfluencedBones.push(reader.readUint16());
			}
		}

		return component;
	}

	function _ReadActorImage(reader, component)
	{
		_ReadActorNode(reader, component);
		var isVisible = reader.readUint8();
		if(isVisible)
		{
			component._BlendMode = reader.readUint8();
			component._DrawOrder = reader.readUint16();
			component._AtlasIndex = reader.readUint8();

			var numConnectedBones = reader.readUint8();
			if(numConnectedBones > 0)
			{
				component._ConnectedBones = [];
				for(var i = 0; i < numConnectedBones; i++)
				{
					var bind = _mat2d.create();
					var componentIndex = reader.readUint16();
					reader.readFloat32Array(bind);

					component._ConnectedBones.push({
						componentIndex:componentIndex,
						bind:bind,
						ibind:_mat2d.invert(_mat2d.create(), bind)
					});
				}

				// Read the final override parent world.
				var overrideWorld = _mat2d.create();
				reader.readFloat32Array(overrideWorld);
				_mat2d.copy(component._WorldTransform, overrideWorld);
				component._OverrideWorldTransform = true;
			}

			var numVertices = reader.readUint32();
			var vertexStride = numConnectedBones > 0 ? 12 : 4;
			
			component._NumVertices = numVertices;
			component._VertexStride = vertexStride;
			component._Vertices = new Float32Array(numVertices * vertexStride);
			reader.readFloat32Array(component._Vertices);

			var numTris = reader.readUint32();
			component._Triangles = new Uint16Array(numTris * 3);
			reader.readUint16Array(component._Triangles);
		}

		return component;
	}

	return ActorLoader;
}());
var CustomProperty = (function ()
{
	function CustomProperty()
	{
		ActorComponent.call(this);
		this._PropertyType = CustomProperty.Integer;
		this._Value = 0;
	}

	CustomProperty.defineProperties = function(prototype)
	{
		ActorComponent.defineProperties(prototype);

		Object.defineProperties(prototype,
		{
			propertyType:
			{
				get: function()
				{
					return this._PropertyType;
				}
			},
			value:
			{
				get: function()
				{
					return this._Value;
				}
			}
		});
	};

	CustomProperty.defineProperties(CustomProperty.prototype);
	ActorComponent.subclass(CustomProperty);

	CustomProperty.prototype.makeInstance = function(resetActor)
	{
		var node = new CustomProperty();
		CustomProperty.prototype.copy.call(node, this, resetActor);
		return node;	
	};

	CustomProperty.prototype.copy = function(node, resetActor)
	{
		ActorComponent.prototype.copy.call(this, node, resetActor);
		this._PropertyType = node._PropertyType;
		this._Value = node._Value;
	};

	CustomProperty.prototype.resolveComponentIndices = function(components)
	{
		ActorComponent.prototype.resolveComponentIndices.call(this, components);
		if(this._ParentIdx !== undefined)
		{
			this._Parent = components[this._ParentIdx];
			if(this._Parent)
			{
				this._Parent._CustomProperties.push(this);	
			}
		}
	};

	CustomProperty.Type =
	{
		Integer:0,
		Float:1,
		String:2
	};

	return CustomProperty;
}());
// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.NimaPlugin = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.NimaPlugin.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
		// Associative array of loaded actors.
		this.actors = [];
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		
		// Nima Data
		this.NimaDataUrl = this.properties[0] || "";
		// The starting animation name to play. 
		this.StartAnim = this.properties[1] || "";
		this.BaseWidth = this.properties[2] || "";
		this.BaseHeight = this.properties[3] || "";
		// Keep track of the currently playing animation. 
		this.CurrentAnimation = null;

		this._Graphics = new Graphics(this.runtime.canvas);

		this._ViewTransform = _mat2d.create();
		this._Graphics.setView(this._ViewTransform);

		this._Actor = null;
		this._ActorInstance = null;

		this._IsPlaying = true;
		this._AnimSpeed = 1.0;

		if ( this.type.actors[this.NimaDataUrl] != null )
		{
			this.setActor(this.type.actors[this.NimaDataUrl]);
		}
		else
		{
			var loader = new ActorLoader();
			var _This = this;
			loader.load(this.NimaDataUrl, function(actor)
			{
				if(!actor || actor.error)
				{
					console.log("Error loading Nima data at url: " + _This.NimaDataUrl);
				}
				else
				{
					_This.type.actors[_This.NimaDataUrl] = actor;
					actor.initialize(_This._Graphics);
					_This.setActor(actor);
				}
			});
		}

	};
	
	instanceProto.setActor = function(actor)
	{
		var actorInstance = actor.makeInstance();
		actorInstance.initialize(this._Graphics);

		this._Actor = actor;
		this._ActorInstance = actorInstance;

		var _This = this;

		this._ActorInstance.addEventListener("animationEvent", function(event)
		{
			_This.CurrAnimEvent = event.name;
			switch(event.name)
			{
				case "_Complete":
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnyAnimFinished, _This);
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnimFinished, _This);
				break;

				default:
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnimEvent, _This);
				break;
			}
		});

		this.CurrentAnimation = actorInstance.getAnimationInstance(this.StartAnim);

		// Make sure the animation has the first frame ready.
		this.CurrentAnimation.advance(0);
		this.CurrentAnimation.apply(this._ActorInstance, 1);
		this._ActorInstance.advance(0);

		this.runtime.tickMe(this);
	}

	instanceProto.tick = function()
	{
		if ( this._IsPlaying )
		{
			var dt = this.runtime.getDt(this) * this._AnimSpeed;

			this.CurrentAnimation.advance(dt);
			this.CurrentAnimation.apply(this._ActorInstance, 1);
			this._ActorInstance._Alpha = this.opacity;
			this._ActorInstance.advance(dt);
		}
		this.runtime.redraw = true;
	}

	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
		if(this._ActorInstance)
		{
			this._ActorInstance.dispose(this._Graphics);
		}
		this.NimaDataUrl = null;
		this.StartAnim = null;
		this.DefaultScale = null;
		this.CurrentAnimation = null;
		this._Actor = null;
		this._ActorInstance = null;
		this._Graphics = null;
		this._ViewTransform = null;
		this._IsPlaying = true;
		this._AnimSpeed = 1.0;
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
		// Sadly don't support Canvas 2D at the moment. ;(
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
		if ( this._ActorInstance != null )
		{
			if (glw.gl !== this.runtime.gl) {
			  console.log("error: gl", glw.gl, this.runtime.gl);
			}

			// suspend glwrap
			var gl = this.runtime.gl;
			glw.endBatch();

			var projection = this._Graphics.projection;
			// var color = instance.extra.render_webgl.color;

			var flip_x = (this.width < 0)?(-1):(1);
			var flip_y = (this.height < 0)?(-1):(1);
			var tx = this.x;
			var ty = this.y;
			var rz = this.angle * flip_x * flip_y;
			var sx = this.width / this.BaseWidth;
			var sy = -this.height / this.BaseHeight;

			_mat4.multiply(projection, glw.matP, glw.matMV);
			_mat4.translate(projection, projection, _vec3.fromValues(tx, ty, 0.0));
			_mat4.rotateZ(projection, projection, rz);
			_mat4.scale(projection, projection, _vec3.fromValues(sx, sy, 1.0));

			// color[3] = instance.opacity;


			// this._Graphics.clear();
			this._ActorInstance.draw(this._Graphics);

			/// resume glwrap

			// the Nima renderer might change this
			glw.lastSrcBlend = gl.ONE;
			glw.lastDestBlend = gl.ONE_MINUS_SRC_ALPHA;
			gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

			// GLBatchJob::doQuad does not bind the element array buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glw.indexBuffer);

			// the Nima renderer changes this
			glw.lastTexture0 = null;
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, null);

			// reload the GLWrap program
			glw.lastProgram = -1;
			glw.switchProgram(0);
		}
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	
// Conditions
	

function Cnds() {};



// For the collision memory in 'On collision'.
	var arrCache = [];
	
	function allocArr()
	{
		if (arrCache.length)
			return arrCache.pop();
		else
			return [0, 0, 0];
	};
	
	function freeArr(a)
	{
		a[0] = 0;
		a[1] = 0;
		a[2] = 0;
		arrCache.push(a);
	};
	
	function makeCollKey(a, b)
	{
		// comma separated string with lowest value first
		if (a < b)
			return "" + a + "," + b;
		else
			return "" + b + "," + a;
	};
	
	function collmemory_add(collmemory, a, b, tickcount)
	{
		var a_uid = a.uid;
		var b_uid = b.uid;

		var key = makeCollKey(a_uid, b_uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			// added already; just update tickcount
			collmemory[key][2] = tickcount;
			return;
		}
		
		var arr = allocArr();
		arr[0] = a_uid;
		arr[1] = b_uid;
		arr[2] = tickcount;
		collmemory[key] = arr;
	};
	
	function collmemory_remove(collmemory, a, b)
	{
		var key = makeCollKey(a.uid, b.uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			freeArr(collmemory[key]);
			delete collmemory[key];
		}
	};
	
	function collmemory_removeInstance(collmemory, inst)
	{
		var uid = inst.uid;
		var p, entry;
		for (p in collmemory)
		{
			if (collmemory.hasOwnProperty(p))
			{
				entry = collmemory[p];
				
				// Referenced in either UID: must be removed
				if (entry[0] === uid || entry[1] === uid)
				{
					freeArr(collmemory[p]);
					delete collmemory[p];
				}
			}
		}
	};
	
	var last_coll_tickcount = -2;
	
	function collmemory_has(collmemory, a, b)
	{
		var key = makeCollKey(a.uid, b.uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			last_coll_tickcount = collmemory[key][2];
			return true;
		}
		else
		{
			last_coll_tickcount = -2;
			return false;
		}
	};
	
	var candidates1 = [];
	
	Cnds.prototype.OnCollision = function (rtype)
	{	
		if (!rtype)
			return false;
			
		var runtime = this.runtime;
			
		// Static condition: perform picking manually.
		// Get the current condition.  This is like the 'is overlapping' condition
		// but with a built in 'trigger once' for the l instances.
		var cnd = runtime.getCurrentCondition();
		var ltype = cnd.type;
		var collmemory = null;
		
		// Create the collision memory, which remembers pairs of collisions that
		// are already overlapping
		if (cnd.extra["collmemory"])
		{
			collmemory = cnd.extra["collmemory"];
		}
		else
		{
			collmemory = {};
			cnd.extra["collmemory"] = collmemory;
		}
		
		// Once per condition, add a destroy callback to remove destroyed instances from collision memory
		// which helps avoid a memory leak. Note the spriteCreatedDestroyCallback property is not saved
		// to savegames, so loading a savegame will still cause a callback to be created, as intended.
		if (!cnd.extra["spriteCreatedDestroyCallback"])
		{
			cnd.extra["spriteCreatedDestroyCallback"] = true;
			
			runtime.addDestroyCallback(function(inst) {
				collmemory_removeInstance(cnd.extra["collmemory"], inst);
			});
		}
		
		// Get the currently active SOLs for both objects involved in the overlap test
		var lsol = ltype.getCurrentSol();
		var rsol = rtype.getCurrentSol();
		var linstances = lsol.getObjects();
		var rinstances;
		
		// Iterate each combination of instances
		var l, linst, r, rinst;
		var curlsol, currsol;
		
		var tickcount = this.runtime.tickcount;
		var lasttickcount = tickcount - 1;
		var exists, run;
		
		var current_event = runtime.getCurrentEventStack().current_event;
		var orblock = current_event.orblock;
		
		// Note: don't cache lengths of linstances or rinstances. They can change if objects get destroyed in the event
		// retriggering.
		for (l = 0; l < linstances.length; l++)
		{
			linst = linstances[l];
			
			if (rsol.select_all)
			{
				linst.update_bbox();
				this.runtime.getCollisionCandidates(linst.layer, rtype, linst.bbox, candidates1);
				rinstances = candidates1;
			}
			else
				rinstances = rsol.getObjects();
			
			for (r = 0; r < rinstances.length; r++)
			{
				rinst = rinstances[r];
				
				if (runtime.testOverlap(linst, rinst) || runtime.checkRegisteredCollision(linst, rinst))
				{
					exists = collmemory_has(collmemory, linst, rinst);
					run = (!exists || (last_coll_tickcount < lasttickcount));
					
					// objects are still touching so update the tickcount
					collmemory_add(collmemory, linst, rinst, tickcount);
					
					if (run)
					{						
						runtime.pushCopySol(current_event.solModifiers);
						curlsol = ltype.getCurrentSol();
						currsol = rtype.getCurrentSol();
						curlsol.select_all = false;
						currsol.select_all = false;
						
						// If ltype === rtype, it's the same object (e.g. Sprite collides with Sprite)
						// In which case, pick both instances
						if (ltype === rtype)
						{
							curlsol.instances.length = 2;	// just use lsol, is same reference as rsol
							curlsol.instances[0] = linst;
							curlsol.instances[1] = rinst;
							ltype.applySolToContainer();
						}
						else
						{
							// Pick each instance in its respective SOL
							curlsol.instances.length = 1;
							currsol.instances.length = 1;
							curlsol.instances[0] = linst;
							currsol.instances[0] = rinst;
							ltype.applySolToContainer();
							rtype.applySolToContainer();
						}
						
						current_event.retrigger();
						runtime.popSol(current_event.solModifiers);
					}
				}
				else
				{
					// Pair not overlapping: ensure any record removed (mainly to save memory)
					collmemory_remove(collmemory, linst, rinst);
				}
			}
			
			cr.clearArray(candidates1);
		}
		
		// We've aleady run the event by now.
		return false;
	};
	
	var rpicktype = null;
	var rtopick = new cr.ObjectSet();
	var needscollisionfinish = false;
	
	var candidates2 = [];
	var temp_bbox = new cr.rect(0, 0, 0, 0);
	
	function DoOverlapCondition(rtype, offx, offy)
	{
		if (!rtype)
			return false;
			
		var do_offset = (offx !== 0 || offy !== 0);
		var oldx, oldy, ret = false, r, lenr, rinst;
		var cnd = this.runtime.getCurrentCondition();
		var ltype = cnd.type;
		var inverted = cnd.inverted;
		var rsol = rtype.getCurrentSol();
		var orblock = this.runtime.getCurrentEventStack().current_event.orblock;
		var rinstances;
		
		if (rsol.select_all)
		{
			this.update_bbox();
			
			// Make sure queried box is offset the same as the collision offset so we look in
			// the right cells
			temp_bbox.copy(this.bbox);
			temp_bbox.offset(offx, offy);
			this.runtime.getCollisionCandidates(this.layer, rtype, temp_bbox, candidates2);
			rinstances = candidates2;
		}
		else if (orblock)
		{
			// Normally the instances to process are in the else_instances array. However if a parent normal block
			// already picked from rtype, it will have select_all off, no else_instances, and just some content
			// in 'instances'. Look for this case in the first condition only.
			if (this.runtime.isCurrentConditionFirst() && !rsol.else_instances.length && rsol.instances.length)
				rinstances = rsol.instances;
			else
				rinstances = rsol.else_instances;
		}
		else
		{
			rinstances = rsol.instances;
		}
		
		rpicktype = rtype;
		needscollisionfinish = (ltype !== rtype && !inverted);
		
		if (do_offset)
		{
			oldx = this.x;
			oldy = this.y;
			this.x += offx;
			this.y += offy;
			this.set_bbox_changed();
		}
		
		for (r = 0, lenr = rinstances.length; r < lenr; r++)
		{
			rinst = rinstances[r];
			
			// objects overlap: true for this instance, ensure both are picked
			// (if ltype and rtype are same, e.g. "Sprite overlaps Sprite", don't pick the other instance,
			// it will be picked when it gets iterated to itself)
			if (this.runtime.testOverlap(this, rinst))
			{
				ret = true;
				
				// Inverted condition: just bail out now, don't pick right hand instance -
				// also note we still return true since the condition invert flag makes that false
				if (inverted)
					break;
					
				if (ltype !== rtype)
					rtopick.add(rinst);
			}
		}
		
		if (do_offset)
		{
			this.x = oldx;
			this.y = oldy;
			this.set_bbox_changed();
		}
		
		cr.clearArray(candidates2);
		return ret;
	};
	
	typeProto.finish = function (do_pick)
	{
		if (!needscollisionfinish)
			return;
		
		if (do_pick)
		{
			var orblock = this.runtime.getCurrentEventStack().current_event.orblock;
			var sol = rpicktype.getCurrentSol();
			var topick = rtopick.valuesRef();
			var i, len, inst;
			
			if (sol.select_all)
			{
				// All selected: filter down to just those in topick
				sol.select_all = false;
				cr.clearArray(sol.instances);
			
				for (i = 0, len = topick.length; i < len; ++i)
				{
					sol.instances[i] = topick[i];
				}
				
				// In OR blocks, else_instances must also be filled with objects not in topick
				if (orblock)
				{
					cr.clearArray(sol.else_instances);
					
					for (i = 0, len = rpicktype.instances.length; i < len; ++i)
					{
						inst = rpicktype.instances[i];
						
						if (!rtopick.contains(inst))
							sol.else_instances.push(inst);
					}
				}
			}
			else
			{
				if (orblock)
				{
					var initsize = sol.instances.length;
				
					for (i = 0, len = topick.length; i < len; ++i)
					{
						sol.instances[initsize + i] = topick[i];
						cr.arrayFindRemove(sol.else_instances, topick[i]);
					}
				}
				else
				{
					cr.shallowAssignArray(sol.instances, topick);
				}
			}
			
			rpicktype.applySolToContainer();
		}
		
		rtopick.clear();
		needscollisionfinish = false;
	};
	
	Cnds.prototype.IsOverlapping = function (rtype)
	{
		return DoOverlapCondition.call(this, rtype, 0, 0);
	};
	
	Cnds.prototype.IsOverlappingOffset = function (rtype, offx, offy)
	{
		return DoOverlapCondition.call(this, rtype, offx, offy);
	};

	// the example condition
	
	Cnds.prototype.MyCondition = function (myparam)
	
	{

		// return true if number is positive
		
		return myparam >= 0;
	
	};

	
	Cnds.prototype.IsMirrored = function ()
	{
		return this.width < 0;
	};
	
	Cnds.prototype.IsFlipped = function ()
	{
		return this.height < 0;
	};

	Cnds.prototype.IsCollisionEnabled = function ()
	{
		return this.collisionsEnabled;
	};
	
	Cnds.prototype.IsAnimPlaying = function(animName)
	{
		if ( this.CurrentAnimation == null )
			return false;

		return this.CurrentAnimation._Animation._Name == animName;
	}
	
	Cnds.prototype.OnAnimFinished = function(animName)
	{
		return this.CurrentAnimation._Animation._Name == animName;
	}

	Cnds.prototype.OnAnyAnimFinished = function()
	{
		return true;
	}

	Cnds.prototype.OnAnimEvent = function(eventName)
	{
		return this.CurrAnimEvent == eventName;
	}


// ... other conditions here ...
	
	
pluginProto.cnds = new Cnds();
	
	

//////////////////////////////////////
	
// Actions
	

function Acts() {};


// the example action
	
	Acts.prototype.MyAction = function (myparam)
	
	{

		// alert the message

		alert(myparam);
	
	};


	Acts.prototype.SetMirrored = function (m)
	{
		var neww = cr.abs(this.width) * (m === 0 ? -1 : 1);
		
		if (this.width === neww)
			return;
			
		this.width = neww;
		this.set_bbox_changed();
	};
	
	Acts.prototype.SetFlipped = function (f)
	{
		var newh = cr.abs(this.height) * (f === 0 ? -1 : 1);
		
		if (this.height === newh)
			return;
			
		this.height = newh;
		this.set_bbox_changed();
	};

	Acts.prototype.SetCollisions = function (set_)
	{
		if (this.collisionsEnabled === (set_ !== 0))
			return;		// no change
		
		this.collisionsEnabled = (set_ !== 0);
		
		if (this.collisionsEnabled)
			this.set_bbox_changed();		// needs to be added back to cells
		else
		{
			// remove from any current cells and restore to uninitialised state
			if (this.collcells.right >= this.collcells.left)
				this.type.collision_grid.update(this, this.collcells, null);
			
			this.collcells.set(0, 0, -1, -1);
		}
	};

	Acts.prototype.SetCollisions = function (set_)
	{
		if (this.collisionsEnabled === (set_ !== 0))
			return;		// no change
		
		this.collisionsEnabled = (set_ !== 0);
		
		if (this.collisionsEnabled)
			this.set_bbox_changed();		// needs to be added back to cells
		else
		{
			// remove from any current cells and restore to uninitialised state
			if (this.collcells.right >= this.collcells.left)
				this.type.collision_grid.update(this, this.collcells, null);
			
			this.collcells.set(0, 0, -1, -1);
		}
	};

	Acts.prototype.SetAnim = function(animName, fromChoice, startTime)
	{
		var currTime = this.CurrentAnimation._Time;
		this.CurrentAnimation = this._ActorInstance.getAnimationInstance(animName);

		// Current Time
		if ( fromChoice === 0 )
		{
			this.CurrentAnimation._Time = currTime;
		}
		else
		{
			this.CurrentAnimation._Time = startTime;
		}
	}

	Acts.prototype.StopAnim = function()
	{
		this._IsPlaying = false;
	}

	Acts.prototype.StartAnim = function(from)
	{
		this._IsPlaying = true;

		// Start from beginning
		if ( from === 1 )
		{
			this.CurrentAnimation._Time = this.CurrentAnimation._Min;
		}
	}
	
	Acts.prototype.SetAnimSpeed = function(newSpeed)
	{
		this._AnimSpeed = newSpeed;
	}

// ... other actions here ...
	
	

pluginProto.acts = new Acts();
	
	

//////////////////////////////////////
	
// Expressions
	

function Exps() {};
	
	

// the example expression
	
Exps.prototype.MyExpression = function (ret)	
// 'ret' must always be the first parameter - always return the expression's result through it!
	{

	ret.set_int(1337);
	// return our value

	// ret.set_float(0.5);	
	// for returning floats
	
	// ret.set_string("Hello");
	// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	Exps.prototype.AnimationName = function (ret)	
	{
		ret.set_string(this.CurrentAnimation._Animation._Name);
	}
	
	Exps.prototype.AnimationSpeed = function (ret)	
	{
		ret.set_float(this._AnimSpeed);
	}


	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());