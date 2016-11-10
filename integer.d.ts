import {newError} from "./error";

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Integers.
 * @access public
 * @exports Integer
 * @class A Integer class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @constructor
 *
 * @deprecated This class will be removed or made internal in a future version of the driver.
 */
export declare class Integer {
  constructor(low: number, high: number);

  // The internal representation of an Integer is the two given signed, 32-bit values.
  // We use 32-bit pieces because these are the size of integers on which
  // Javascript performs bit-operations.  For operations like addition and
  // multiplication, we split each number into 16 bit pieces, which can easily be
  // multiplied within Javascript's floating-point representation without overflow
  // or change in sign.
  //
  // In the algorithms below, we frequently reduce the negative case to the
  // positive case by negating the input(s) and then post-processing the result.
  // Note that we must ALWAYS check specially whether those values are MIN_VALUE
  // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
  // a positive number, it overflows back into a negative).  Not handling this
  // case would often result in infinite recursion.
  //
  // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
  // methods on which they depend.


  inSafeRange(): boolean;

  /**
   * Converts the Integer to an exact javascript Number, assuming it is a 32 bit integer.
   * @returns {number}
   * @expose
   */
  toInt(): number;

  /**
   * Converts the Integer to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   * @returns {number}
   * @expose
   */
  toNumber(): number;

  /**
   * Converts the Integer to a string written in the specified radix.
   * @param {number=} radix Radix (2-36), defaults to 10
   * @returns {string}
   * @override
   * @throws {RangeError} If `radix` is out of range
   * @expose
   */
  toString(radix: number): string;

  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   * @expose
   */
  getHighBits(): number;

  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   * @expose
   */
  getLowBits(): number;

  /**
   * Gets the number of bits needed to represent the absolute value of this Integer.
   * @returns {number}
   * @expose
   */
  getNumBitsAbs(): number;

  /**
   * Tests if this Integer's value equals zero.
   * @returns {boolean}
   * @expose
   */
  isZero(): boolean;

  /**
   * Tests if this Integer's value is negative.
   * @returns {boolean}
   * @expose
   */
  isNegative(): boolean;

  /**
   * Tests if this Integer's value is positive.
   * @returns {boolean}
   * @expose
   */
  isPositive(): boolean;

  /**
   * Tests if this Integer's value is odd.
   * @returns {boolean}
   * @expose
   */
  isOdd(): boolean;

  /**
   * Tests if this Integer's value is even.
   * @returns {boolean}
   * @expose
   */
  isEven(): boolean;

  /**
   * Tests if this Integer's value equals the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  equals(other: number): boolean;

  /**
   * Tests if this Integer's value differs from the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  notEquals(other: number): boolean;

  /**
   * Tests if this Integer's value is less than the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  lessThan(other: number): boolean;

  /**
   * Tests if this Integer's value is less than or equal the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  lessThanOrEqual(other: number): boolean;

  /**
   * Tests if this Integer's value is greater than the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  greaterThan(other: number): boolean;

  /**
   * Tests if this Integer's value is greater than or equal the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  greaterThanOrEqual(other: number): boolean;

  /**
   * Compares this Integer's value with the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   * @expose
   */
  compare(other: number): number;

  /**
   * Negates this Integer's value.
   * @returns {!Integer} Negated Integer
   * @expose
   */
  negate(): number;

  /**
   * Returns the sum of this and the specified Integer.
   * @param {!Integer|number|string} addend Addend
   * @returns {!Integer} Sum
   * @expose
   */
  add(addend: number): number;

  /**
   * Returns the difference of this and the specified Integer.
   * @param {!Integer|number|string} subtrahend Subtrahend
   * @returns {!Integer} Difference
   * @expose
   */
  subtract(subtrahend: number): number;

  /**
   * Returns the product of this and the specified Integer.
   * @param {!Integer|number|string} multiplier Multiplier
   * @returns {!Integer} Product
   * @expose
   */
  multiply(multiplier: number): number;

  /**
   * Returns this Integer divided by the specified.
   * @param {!Integer|number|string} divisor Divisor
   * @returns {!Integer} Quotient
   * @expose
   */
  div(divisor: Integer|number|string): Integer;

  /**
   * Returns this Integer modulo the specified.
   * @param {!Integer|number|string} divisor Divisor
   * @returns {!Integer} Remainder
   * @expose
   */
  modulo(divisor: Integer|number|string): Integer;

  /**
   * Returns the bitwise NOT of this Integer.
   * @returns {!Integer}
   * @expose
   */
  not(): Integer;

  /**
   * Returns the bitwise AND of this Integer and the specified.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  and(other: Integer|number|string): Integer;

  /**
   * Returns the bitwise OR of this Integer and the specified.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  or(other: Integer|number|string): Integer;

  /**
   * Returns the bitwise XOR of this Integer and the given one.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  xor(other: Integer|number|string): Integer;

  /**
   * Returns this Integer with bits shifted to the left by the given amount.
   * @param {number|!Integer} numBits Number of bits
   * @returns {!Integer} Shifted Integer
   * @expose
   */
  shiftLeft(numBits: number|Integer): Integer;

  /**
   * Returns this Integer with bits arithmetically shifted to the right by the given amount.
   * @param {number|!Integer} numBits Number of bits
   * @returns {!Integer} Shifted Integer
   * @expose
   */
  shiftRight(numBits: number|Integer): Integer;
}

export declare const int: (val: Integer|number|string|{low: number; high: number}) => Integer;
export declare const isInt: (obj: Object) => boolean;
export declare const inSafeRange: (val: Integer|number|string|{low: number; high: number}) => boolean;
export declare const toNumber: (val: any) => number;
export declare const toString: (radix: number) => string;