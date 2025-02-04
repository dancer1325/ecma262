# Numbers and Dates

  <emu-clause id="sec-number-objects">
    <h1>Number Objects</h1>

    <emu-clause id="sec-number-constructor">
      <h1>The Number Constructor</h1>
      <p>The Number constructor:</p>
      <ul>
        <li>is <dfn>%Number%</dfn>.</li>
        <li>is the initial value of the *"Number"* property of the global object.</li>
        <li>creates and initializes a new Number object when called as a constructor.</li>
        <li>performs a type conversion when called as a function rather than as a constructor.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Number behaviour must include a `super` call to the Number constructor to create and initialize the subclass instance with a [[NumberData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-number-constructor-number-value">
        <h1>Number ( _value_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _value_ is present, then
            1. Let _prim_ be ? ToNumeric(_value_).
            1. If _prim_ is a BigInt, let _n_ be 𝔽(ℝ(_prim_)).
            1. Otherwise, let _n_ be _prim_.
          1. Else,
            1. Let _n_ be *+0*<sub>𝔽</sub>.
          1. If NewTarget is *undefined*, return _n_.
          1. Let _O_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Number.prototype%"*, « [[NumberData]] »).
          1. Set _O_.[[NumberData]] to _n_.
          1. Return _O_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-number-constructor">
      <h1>Properties of the Number Constructor</h1>
      <p>The Number constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-number.epsilon">
        <h1>Number.EPSILON</h1>
        <p>The value of `Number.EPSILON` is the Number value for the magnitude of the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately 2.2204460492503130808472633361816 × 10<sup>-16</sup>.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.isfinite">
        <h1>Number.isFinite ( _number_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _number_ is not a Number, return *false*.
          1. If _number_ is not finite, return *false*.
          1. Otherwise, return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-number.isinteger">
        <h1>Number.isInteger ( _number_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _number_ is an integral Number, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-number.isnan">
        <h1>Number.isNaN ( _number_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _number_ is not a Number, return *false*.
          1. If _number_ is *NaN*, return *true*.
          1. Otherwise, return *false*.
        </emu-alg>
        <emu-note>
          <p>This function differs from the global isNaN function (<emu-xref href="#sec-isnan-number"></emu-xref>) in that it does not convert its argument to a Number before determining whether it is *NaN*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-number.issafeinteger">
        <h1>Number.isSafeInteger ( _number_ )</h1>
        <emu-note>
          <p>An integer _n_ is a "<dfn id="safe-integer">safe integer</dfn>" if and only if the Number value for _n_ is not the Number value for any other integer.</p>
        </emu-note>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _number_ is an integral Number, then
            1. If abs(ℝ(_number_)) ≤ 2<sup>53</sup> - 1, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-number.max_safe_integer">
        <h1>Number.MAX_SAFE_INTEGER</h1>
        <emu-note>
          <p>Due to rounding behaviour necessitated by precision limitations of IEEE 754-2019, the Number value for every integer greater than `Number.MAX_SAFE_INTEGER` is shared with at least one other integer. Such large-magnitude integers are therefore not <emu-xref href="#safe-integer">safe</emu-xref>, and are not guaranteed to be exactly representable as Number values or even to be distinguishable from each other. For example, both `9007199254740992` and `9007199254740993` evaluate to the Number value *9007199254740992*<sub>𝔽</sub>.</p>
        </emu-note>
        <p>The value of `Number.MAX_SAFE_INTEGER` is *9007199254740991*<sub>𝔽</sub> (𝔽(2<sup>53</sup> - 1)).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.max_value">
        <h1>Number.MAX_VALUE</h1>
        <p>The value of `Number.MAX_VALUE` is the largest positive finite value of the Number type, which is approximately <emu-eqn>1.7976931348623157 × 10<sup>308</sup></emu-eqn>.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.min_safe_integer">
        <h1>Number.MIN_SAFE_INTEGER</h1>
        <emu-note>
          <p>Due to rounding behaviour necessitated by precision limitations of IEEE 754-2019, the Number value for every integer less than `Number.MIN_SAFE_INTEGER` is shared with at least one other integer. Such large-magnitude integers are therefore not <emu-xref href="#safe-integer">safe</emu-xref>, and are not guaranteed to be exactly representable as Number values or even to be distinguishable from each other. For example, both `-9007199254740992` and `-9007199254740993` evaluate to the Number value *-9007199254740992*<sub>𝔽</sub>.</p>
        </emu-note>
        <p>The value of `Number.MIN_SAFE_INTEGER` is *-9007199254740991*<sub>𝔽</sub> (𝔽(-(2<sup>53</sup> - 1))).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.min_value">
        <h1>Number.MIN_VALUE</h1>
        <p>The value of `Number.MIN_VALUE` is the smallest positive value of the Number type, which is approximately <emu-eqn>5 × 10<sup>-324</sup></emu-eqn>.</p>
        <p>In the IEEE 754-2019 double precision binary representation, the smallest possible value is a denormalized number. If an implementation does not support denormalized values, the value of `Number.MIN_VALUE` must be the smallest non-zero positive value that can actually be represented by the implementation.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.nan">
        <h1>Number.NaN</h1>
        <p>The value of `Number.NaN` is *NaN*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.negative_infinity">
        <h1>Number.NEGATIVE_INFINITY</h1>
        <p>The value of `Number.NEGATIVE_INFINITY` is *-∞*<sub>𝔽</sub>.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.parsefloat">
        <h1>Number.parseFloat ( _string_ )</h1>
        <p>The initial value of the *"parseFloat"* property is %parseFloat%.</p>
      </emu-clause>

      <emu-clause id="sec-number.parseint">
        <h1>Number.parseInt ( _string_, _radix_ )</h1>
        <p>The initial value of the *"parseInt"* property is %parseInt%.</p>
      </emu-clause>

      <emu-clause id="sec-number.positive_infinity">
        <h1>Number.POSITIVE_INFINITY</h1>
        <p>The value of `Number.POSITIVE_INFINITY` is *+∞*<sub>𝔽</sub>.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-number.prototype">
        <h1>Number.prototype</h1>
        <p>The initial value of `Number.prototype` is the Number prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-number-prototype-object">
      <h1>Properties of the Number Prototype Object</h1>
      <p>The <dfn>Number prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Number.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is itself a Number object; it has a [[NumberData]] internal slot with the value *+0*<sub>𝔽</sub>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <p>Unless explicitly stated otherwise, the methods of the Number prototype object defined below are not generic and the *this* value passed to them must be either a Number value or an object that has a [[NumberData]] internal slot that has been initialized to a Number value.</p>
      <p>The phrase “this Number value” within the specification of a method refers to the result returned by calling the abstract operation ThisNumberValue with the *this* value of the method invocation passed as the argument.</p>

      <emu-clause id="sec-number.prototype.constructor">
        <h1>Number.prototype.constructor</h1>
        <p>The initial value of `Number.prototype.constructor` is %Number%.</p>
      </emu-clause>

      <emu-clause id="sec-number.prototype.toexponential">
        <h1>Number.prototype.toExponential ( _fractionDigits_ )</h1>
        <p>This method returns a String containing this Number value represented in decimal exponential notation with one digit before the significand's decimal point and _fractionDigits_ digits after the significand's decimal point. If _fractionDigits_ is *undefined*, it includes as many significand digits as necessary to uniquely specify the Number (just like in ToString except that in this case the Number is always output in exponential notation).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _x_ be ? ThisNumberValue(*this* value).
          1. Let _f_ be ? ToIntegerOrInfinity(_fractionDigits_).
          1. Assert: If _fractionDigits_ is *undefined*, then _f_ is 0.
          1. If _x_ is not finite, return Number::toString(_x_, 10).
          1. If _f_ &lt; 0 or _f_ > 100, throw a *RangeError* exception.
          1. Set _x_ to ℝ(_x_).
          1. Let _s_ be the empty String.
          1. If _x_ &lt; 0, then
            1. Set _s_ to *"-"*.
            1. Set _x_ to -_x_.
          1. If _x_ = 0, then
            1. Let _m_ be the String value consisting of _f_ + 1 occurrences of the code unit 0x0030 (DIGIT ZERO).
            1. Let _e_ be 0.
          1. Else,
            1. If _fractionDigits_ is not *undefined*, then
              1. Let _e_ and _n_ be integers such that 10<sup>_f_</sup> ≤ _n_ &lt; 10<sup>_f_ + 1</sup> and for which _n_ × 10<sup>_e_ - _f_</sup> - _x_ is as close to zero as possible. If there are two such sets of _e_ and _n_, pick the _e_ and _n_ for which _n_ × 10<sup>_e_ - _f_</sup> is larger.
            1. Else,
              1. [id="step-number-proto-toexponential-intermediate-values"] Let _e_, _n_, and _ff_ be integers such that _ff_ ≥ 0, 10<sup>_ff_</sup> ≤ _n_ &lt; 10<sup>_ff_ + 1</sup>, 𝔽(_n_ × 10<sup>_e_ - _ff_</sup>) is 𝔽(_x_), and _ff_ is as small as possible. Note that the decimal representation of _n_ has _ff_ + 1 digits, _n_ is not divisible by 10, and the least significant digit of _n_ is not necessarily uniquely determined by these criteria.
              1. Set _f_ to _ff_.
            1. Let _m_ be the String value consisting of the digits of the decimal representation of _n_ (in order, with no leading zeroes).
          1. If _f_ ≠ 0, then
            1. Let _a_ be the first code unit of _m_.
            1. Let _b_ be the other _f_ code units of _m_.
            1. Set _m_ to the string-concatenation of _a_, *"."*, and _b_.
          1. If _e_ = 0, then
            1. Let _c_ be *"+"*.
            1. Let _d_ be *"0"*.
          1. Else,
            1. If _e_ > 0, then
              1. Let _c_ be *"+"*.
            1. Else,
              1. Assert: _e_ &lt; 0.
              1. Let _c_ be *"-"*.
              1. Set _e_ to -_e_.
            1. Let _d_ be the String value consisting of the digits of the decimal representation of _e_ (in order, with no leading zeroes).
          1. Set _m_ to the string-concatenation of _m_, *"e"*, _c_, and _d_.
          1. Return the string-concatenation of _s_ and _m_.
        </emu-alg>
        <emu-note>
          <p>For implementations that provide more accurate conversions than required by the rules above, it is recommended that the following alternative version of step <emu-xref href="#step-number-proto-toexponential-intermediate-values"></emu-xref> be used as a guideline:</p>
          <emu-alg replaces-step="step-number-proto-toexponential-intermediate-values">
            1. Let _e_, _n_, and _f_ be integers such that _f_ ≥ 0, 10<sup>_f_</sup> ≤ _n_ &lt; 10<sup>_f_ + 1</sup>, 𝔽(_n_ × 10<sup>_e_ - _f_</sup>) is 𝔽(_x_), and _f_ is as small as possible. If there are multiple possibilities for _n_, choose the value of _n_ for which 𝔽(_n_ × 10<sup>_e_ - _f_</sup>) is closest in value to 𝔽(_x_). If there are two such possible values of _n_, choose the one that is even.
          </emu-alg>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-number.prototype.tofixed">
        <h1>Number.prototype.toFixed ( _fractionDigits_ )</h1>
        <emu-note>
          <p>This method returns a String containing this Number value represented in decimal fixed-point notation with _fractionDigits_ digits after the decimal point. If _fractionDigits_ is *undefined*, 0 is assumed.</p>
        </emu-note>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _x_ be ? ThisNumberValue(*this* value).
          1. Let _f_ be ? ToIntegerOrInfinity(_fractionDigits_).
          1. Assert: If _fractionDigits_ is *undefined*, then _f_ is 0.
          1. If _f_ is not finite, throw a *RangeError* exception.
          1. If _f_ &lt; 0 or _f_ > 100, throw a *RangeError* exception.
          1. If _x_ is not finite, return Number::toString(_x_, 10).
          1. Set _x_ to ℝ(_x_).
          1. Let _s_ be the empty String.
          1. If _x_ &lt; 0, then
            1. Set _s_ to *"-"*.
            1. Set _x_ to -_x_.
          1. If _x_ ≥ 10<sup>21</sup>, then
            1. Let _m_ be ! ToString(𝔽(_x_)).
          1. Else,
            1. Let _n_ be an integer for which _n_ / 10<sup>_f_</sup> - _x_ is as close to zero as possible. If there are two such _n_, pick the larger _n_.
            1. If _n_ = 0, let _m_ be *"0"*. Otherwise, let _m_ be the String value consisting of the digits of the decimal representation of _n_ (in order, with no leading zeroes).
            1. If _f_ ≠ 0, then
              1. Let _k_ be the length of _m_.
              1. If _k_ ≤ _f_, then
                1. Let _z_ be the String value consisting of _f_ + 1 - _k_ occurrences of the code unit 0x0030 (DIGIT ZERO).
                1. Set _m_ to the string-concatenation of _z_ and _m_.
                1. Set _k_ to _f_ + 1.
              1. Let _a_ be the first _k_ - _f_ code units of _m_.
              1. Let _b_ be the other _f_ code units of _m_.
              1. Set _m_ to the string-concatenation of _a_, *"."*, and _b_.
          1. Return the string-concatenation of _s_ and _m_.
        </emu-alg>
        <emu-note>
          <p>The output of `toFixed` may be more precise than `toString` for some values because toString only prints enough significant digits to distinguish the number from adjacent Number values. For example,</p>
          <p>
            `(1000000000000000128).toString()` returns *"1000000000000000100"*, while<br>
            `(1000000000000000128).toFixed(0)` returns *"1000000000000000128"*.
          </p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-number.prototype.tolocalestring">
        <h1>Number.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method produces a String value that represents this Number value formatted according to the conventions of the host environment's current locale. This method is implementation-defined, and it is permissible, but not encouraged, for it to return the same thing as `toString`.</p>
        <p>The meanings of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
      </emu-clause>

      <emu-clause id="sec-number.prototype.toprecision">
        <h1>Number.prototype.toPrecision ( _precision_ )</h1>
        <p>This method returns a String containing this Number value represented either in decimal exponential notation with one digit before the significand's decimal point and <emu-eqn>_precision_ - 1</emu-eqn> digits after the significand's decimal point or in decimal fixed notation with _precision_ significant digits. If _precision_ is *undefined*, it calls ToString instead.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _x_ be ? ThisNumberValue(*this* value).
          1. If _precision_ is *undefined*, return ! ToString(_x_).
          1. Let _p_ be ? ToIntegerOrInfinity(_precision_).
          1. If _x_ is not finite, return Number::toString(_x_, 10).
          1. If _p_ &lt; 1 or _p_ > 100, throw a *RangeError* exception.
          1. Set _x_ to ℝ(_x_).
          1. Let _s_ be the empty String.
          1. If _x_ &lt; 0, then
            1. Set _s_ to the code unit 0x002D (HYPHEN-MINUS).
            1. Set _x_ to -_x_.
          1. If _x_ = 0, then
            1. Let _m_ be the String value consisting of _p_ occurrences of the code unit 0x0030 (DIGIT ZERO).
            1. Let _e_ be 0.
          1. Else,
            1. Let _e_ and _n_ be integers such that 10<sup>_p_ - 1</sup> ≤ _n_ &lt; 10<sup>_p_</sup> and for which _n_ × 10<sup>_e_ - _p_ + 1</sup> - _x_ is as close to zero as possible. If there are two such sets of _e_ and _n_, pick the _e_ and _n_ for which _n_ × 10<sup>_e_ - _p_ + 1</sup> is larger.
            1. Let _m_ be the String value consisting of the digits of the decimal representation of _n_ (in order, with no leading zeroes).
            1. If _e_ &lt; -6 or _e_ ≥ _p_, then
              1. Assert: _e_ ≠ 0.
              1. If _p_ ≠ 1, then
                1. Let _a_ be the first code unit of _m_.
                1. Let _b_ be the other _p_ - 1 code units of _m_.
                1. Set _m_ to the string-concatenation of _a_, *"."*, and _b_.
              1. If _e_ > 0, then
                1. Let _c_ be the code unit 0x002B (PLUS SIGN).
              1. Else,
                1. Assert: _e_ &lt; 0.
                1. Let _c_ be the code unit 0x002D (HYPHEN-MINUS).
                1. Set _e_ to -_e_.
              1. Let _d_ be the String value consisting of the digits of the decimal representation of _e_ (in order, with no leading zeroes).
              1. Return the string-concatenation of _s_, _m_, the code unit 0x0065 (LATIN SMALL LETTER E), _c_, and _d_.
          1. If _e_ = _p_ - 1, return the string-concatenation of _s_ and _m_.
          1. If _e_ ≥ 0, then
            1. Set _m_ to the string-concatenation of the first _e_ + 1 code units of _m_, the code unit 0x002E (FULL STOP), and the remaining _p_ - (_e_ + 1) code units of _m_.
          1. Else,
            1. Set _m_ to the string-concatenation of the code unit 0x0030 (DIGIT ZERO), the code unit 0x002E (FULL STOP), -(_e_ + 1) occurrences of the code unit 0x0030 (DIGIT ZERO), and the String _m_.
          1. Return the string-concatenation of _s_ and _m_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-number.prototype.tostring">
        <h1>Number.prototype.toString ( [ _radix_ ] )</h1>
        <emu-note>
          <p>The optional _radix_ should be an integral Number value in the inclusive interval from *2*<sub>𝔽</sub> to *36*<sub>𝔽</sub>. If _radix_ is *undefined* then *10*<sub>𝔽</sub> is used as the value of _radix_.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _x_ be ? ThisNumberValue(*this* value).
          1. If _radix_ is *undefined*, let _radixMV_ be 10.
          1. Else, let _radixMV_ be ? ToIntegerOrInfinity(_radix_).
          1. If _radixMV_ is not in the inclusive interval from 2 to 36, throw a *RangeError* exception.
          1. Return Number::toString(_x_, _radixMV_).
        </emu-alg>
        <p>This method is not generic; it throws a *TypeError* exception if its *this* value is not a Number or a Number object. Therefore, it cannot be transferred to other kinds of objects for use as a method.</p>
        <p>The *"length"* property of this method is *1*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-number.prototype.valueof">
        <h1>Number.prototype.valueOf ( )</h1>
        <emu-alg>
          1. Return ? ThisNumberValue(*this* value).
        </emu-alg>

        <emu-clause id="sec-thisnumbervalue" type="abstract operation" oldids="thisnumbervalue">
          <h1>
            ThisNumberValue (
              _value_: an ECMAScript language value,
            ): either a normal completion containing a Number or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _value_ is a Number, return _value_.
            1. If _value_ is an Object and _value_ has a [[NumberData]] internal slot, then
              1. Let _n_ be _value_.[[NumberData]].
              1. Assert: _n_ is a Number.
              1. Return _n_.
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-number-instances">
      <h1>Properties of Number Instances</h1>
      <p>Number instances are ordinary objects that inherit properties from the Number prototype object. Number instances also have a [[NumberData]] internal slot. The [[NumberData]] internal slot is the Number value represented by this Number object.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-bigint-objects">
    <h1>BigInt Objects</h1>

    <emu-clause id="sec-bigint-constructor">
      <h1>The BigInt Constructor</h1>
      <p>The BigInt constructor:</p>
      <ul>
        <li>is <dfn>%BigInt%</dfn>.</li>
        <li>is the initial value of the *"BigInt"* property of the global object.</li>
        <li>performs a type conversion when called as a function rather than as a constructor.</li>
        <li>is not intended to be used with the `new` operator or to be subclassed. It may be used as the value of an `extends` clause of a class definition but a `super` call to the BigInt constructor will cause an exception.</li>
      </ul>

      <emu-clause id="sec-bigint-constructor-number-value">
        <h1>BigInt ( _value_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is not *undefined*, throw a *TypeError* exception.
          1. Let _prim_ be ? ToPrimitive(_value_, ~number~).
          1. If _prim_ is a Number, return ? NumberToBigInt(_prim_).
          1. Otherwise, return ? <emu-meta suppress-effects="user-code">ToBigInt(_prim_)</emu-meta>.
        </emu-alg>

        <emu-clause id="sec-numbertobigint" type="abstract operation">
          <h1>
            NumberToBigInt (
              _number_: a Number,
            ): either a normal completion containing a BigInt or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _number_ is not an integral Number, throw a *RangeError* exception.
            1. Return ℤ(ℝ(_number_)).
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-bigint-constructor">
      <h1>Properties of the BigInt Constructor</h1>
      <p>The BigInt constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-bigint.asintn">
        <h1>BigInt.asIntN ( _bits_, _bigint_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Set _bits_ to ? ToIndex(_bits_).
          1. Set _bigint_ to ? ToBigInt(_bigint_).
          1. Let _mod_ be ℝ(_bigint_) modulo 2<sup>_bits_</sup>.
          1. If _mod_ ≥ 2<sup>_bits_ - 1</sup>, return ℤ(_mod_ - 2<sup>_bits_</sup>); otherwise, return ℤ(_mod_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-bigint.asuintn">
        <h1>BigInt.asUintN ( _bits_, _bigint_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Set _bits_ to ? ToIndex(_bits_).
          1. Set _bigint_ to ? ToBigInt(_bigint_).
          1. Return ℤ(ℝ(_bigint_) modulo 2<sup>_bits_</sup>).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-bigint.prototype">
        <h1>BigInt.prototype</h1>
        <p>The initial value of `BigInt.prototype` is the BigInt prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-bigint-prototype-object">
      <h1>Properties of the BigInt Prototype Object</h1>
      <p>The <dfn>BigInt prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%BigInt.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a BigInt object; it does not have a [[BigIntData]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <p>The phrase “this BigInt value” within the specification of a method refers to the result returned by calling the abstract operation ThisBigIntValue with the *this* value of the method invocation passed as the argument.</p>

      <emu-clause id="sec-bigint.prototype.constructor">
        <h1>BigInt.prototype.constructor</h1>
        <p>The initial value of `BigInt.prototype.constructor` is %BigInt%.</p>
      </emu-clause>

      <emu-clause id="sec-bigint.prototype.tolocalestring">
        <h1>BigInt.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method produces a String value that represents this BigInt value formatted according to the conventions of the host environment's current locale. This method is implementation-defined, and it is permissible, but not encouraged, for it to return the same thing as `toString`.</p>
        <p>The meanings of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
      </emu-clause>

      <emu-clause id="sec-bigint.prototype.tostring">
        <h1>BigInt.prototype.toString ( [ _radix_ ] )</h1>
        <emu-note>
          <p>The optional _radix_ should be an integral Number value in the inclusive interval from *2*<sub>𝔽</sub> to *36*<sub>𝔽</sub>. If _radix_ is *undefined* then *10*<sub>𝔽</sub> is used as the value of _radix_.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _x_ be ? ThisBigIntValue(*this* value).
          1. If _radix_ is *undefined*, let _radixMV_ be 10.
          1. Else, let _radixMV_ be ? ToIntegerOrInfinity(_radix_).
          1. If _radixMV_ is not in the inclusive interval from 2 to 36, throw a *RangeError* exception.
          1. Return BigInt::toString(_x_, _radixMV_).
        </emu-alg>
        <p>This method is not generic; it throws a *TypeError* exception if its *this* value is not a BigInt or a BigInt object. Therefore, it cannot be transferred to other kinds of objects for use as a method.</p>
      </emu-clause>

      <emu-clause id="sec-bigint.prototype.valueof">
        <h1>BigInt.prototype.valueOf ( )</h1>
        <emu-alg>
          1. Return ? ThisBigIntValue(*this* value).
        </emu-alg>

        <emu-clause id="sec-thisbigintvalue" type="abstract operation" oldids="thisbigintvalue">
          <h1>
            ThisBigIntValue (
              _value_: an ECMAScript language value,
            ): either a normal completion containing a BigInt or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _value_ is a BigInt, return _value_.
            1. If _value_ is an Object and _value_ has a [[BigIntData]] internal slot, then
              1. Assert: _value_.[[BigIntData]] is a BigInt.
              1. Return _value_.[[BigIntData]].
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause oldids="sec-bigint.prototype-@@tostringtag" id="sec-bigint.prototype-%symbol.tostringtag%">
        <h1>BigInt.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"BigInt"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-bigint-instances">
      <h1>Properties of BigInt Instances</h1>
      <p>BigInt instances are ordinary objects that inherit properties from the BigInt prototype object. BigInt instances also have a [[BigIntData]] internal slot. The [[BigIntData]] internal slot is the BigInt value represented by this BigInt object.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-math-object">
    <h1>The Math Object</h1>
    <p>The Math object:</p>
    <ul>
      <li>is <dfn>%Math%</dfn>.</li>
      <li>is the initial value of the *"Math"* property of the global object.</li>
      <li>is an ordinary object.</li>
      <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      <li>is not a function object.</li>
      <li>does not have a [[Construct]] internal method; it cannot be used as a constructor with the `new` operator.</li>
      <li>does not have a [[Call]] internal method; it cannot be invoked as a function.</li>
    </ul>
    <emu-note>
      <p>In this specification, the phrase “the Number value for _x_” has a technical meaning defined in <emu-xref href="#sec-ecmascript-language-types-number-type"></emu-xref>.</p>
    </emu-note>

    <emu-clause id="sec-value-properties-of-the-math-object">
      <h1>Value Properties of the Math Object</h1>

      <emu-clause id="sec-math.e">
        <h1>Math.E</h1>
        <p>The Number value for <i>e</i>, the base of the natural logarithms, which is approximately 2.7182818284590452354.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-math.ln10">
        <h1>Math.LN10</h1>
        <p>The Number value for the natural logarithm of 10, which is approximately 2.302585092994046.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-math.ln2">
        <h1>Math.LN2</h1>
        <p>The Number value for the natural logarithm of 2, which is approximately 0.6931471805599453.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-math.log10e">
        <h1>Math.LOG10E</h1>
        <p>The Number value for the base-10 logarithm of <i>e</i>, the base of the natural logarithms; this value is approximately 0.4342944819032518.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>The value of `Math.LOG10E` is approximately the reciprocal of the value of `Math.LN10`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.log2e">
        <h1>Math.LOG2E</h1>
        <p>The Number value for the base-2 logarithm of <i>e</i>, the base of the natural logarithms; this value is approximately 1.4426950408889634.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>The value of `Math.LOG2E` is approximately the reciprocal of the value of `Math.LN2`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.pi">
        <h1>Math.PI</h1>
        <p>The Number value for π, the ratio of the circumference of a circle to its diameter, which is approximately 3.1415926535897932.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-math.sqrt1_2">
        <h1>Math.SQRT1_2</h1>
        <p>The Number value for the square root of ½, which is approximately 0.7071067811865476.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>The value of `Math.SQRT1_2` is approximately the reciprocal of the value of `Math.SQRT2`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.sqrt2">
        <h1>Math.SQRT2</h1>
        <p>The Number value for the square root of 2, which is approximately 1.4142135623730951.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-math-@@tostringtag" id="sec-math-%symbol.tostringtag%">
        <h1>Math [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"Math"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-function-properties-of-the-math-object">
      <h1>Function Properties of the Math Object</h1>
      <emu-note>
        <p>The behaviour of the functions `acos`, `acosh`, `asin`, `asinh`, `atan`, `atanh`, `atan2`, `cbrt`, `cos`, `cosh`, `exp`, `expm1`, `hypot`, `log`, `log1p`, `log2`, `log10`, `pow`, `random`, `sin`, `sinh`, `tan`, and `tanh` is not precisely specified here except to require specific results for certain argument values that represent boundary cases of interest. For other argument values, these functions are intended to compute approximations to the results of familiar mathematical functions, but some latitude is allowed in the choice of approximation algorithms. The general intent is that an implementer should be able to use the same mathematical library for ECMAScript on a given hardware platform that is available to C programmers on that platform.</p>
        <p>Although the choice of algorithms is left to the implementation, it is recommended (but not specified by this standard) that implementations use the approximation algorithms for IEEE 754-2019 arithmetic contained in `fdlibm`, the freely distributable mathematical library from Sun Microsystems (<a href="http://www.netlib.org/fdlibm">http://www.netlib.org/fdlibm</a>).</p>
      </emu-note>

      <emu-clause id="sec-math.abs">
        <h1>Math.abs ( _x_ )</h1>
        <p>This function returns the absolute value of _x_; the result has the same magnitude as _x_ but has positive sign.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is *NaN*, return *NaN*.
          1. If _n_ is *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ is *-∞*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return -_n_.
          1. Return _n_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.acos">
        <h1>Math.acos ( _x_ )</h1>
        <p>This function returns the inverse cosine of _x_. The result is expressed in radians and is in the inclusive interval from *+0*<sub>𝔽</sub> to 𝔽(π).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is *NaN*, _n_ > *1*<sub>𝔽</sub>, or _n_ &lt; *-1*<sub>𝔽</sub>, return *NaN*.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the inverse cosine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.acosh">
        <h1>Math.acosh ( _x_ )</h1>
        <p>This function returns the inverse hyperbolic cosine of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is either *NaN* or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ &lt; *1*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the inverse hyperbolic cosine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.asin">
        <h1>Math.asin ( _x_ )</h1>
        <p>This function returns the inverse sine of _x_. The result is expressed in radians and is in the inclusive interval from 𝔽(-π / 2) to 𝔽(π / 2).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ > *1*<sub>𝔽</sub> or _n_ &lt; *-1*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the inverse sine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.asinh">
        <h1>Math.asinh ( _x_ )</h1>
        <p>This function returns the inverse hyperbolic sine of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. Return an implementation-approximated Number value representing the inverse hyperbolic sine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.atan">
        <h1>Math.atan ( _x_ )</h1>
        <p>This function returns the inverse tangent of _x_. The result is expressed in radians and is in the inclusive interval from 𝔽(-π / 2) to 𝔽(π / 2).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *+∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing π / 2.
          1. If _n_ is *-∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing -π / 2.
          1. Return an implementation-approximated Number value representing the inverse tangent of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.atanh">
        <h1>Math.atanh ( _x_ )</h1>
        <p>This function returns the inverse hyperbolic tangent of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ > *1*<sub>𝔽</sub> or _n_ &lt; *-1*<sub>𝔽</sub>, return *NaN*.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>.
          1. If _n_ is *-1*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the inverse hyperbolic tangent of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.atan2">
        <h1>Math.atan2 ( _y_, _x_ )</h1>
        <p>This function returns the inverse tangent of the quotient <emu-eqn>_y_ / _x_</emu-eqn> of the arguments _y_ and _x_, where the signs of _y_ and _x_ are used to determine the quadrant of the result. Note that it is intentional and traditional for the two-argument inverse tangent function that the argument named _y_ be first and the argument named _x_ be second. The result is expressed in radians and is in the inclusive interval from -π to +π.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _ny_ be ? ToNumber(_y_).
          1. Let _nx_ be ? ToNumber(_x_).
          1. If _ny_ is *NaN* or _nx_ is *NaN*, return *NaN*.
          1. If _ny_ is *+∞*<sub>𝔽</sub>, then
            1. If _nx_ is *+∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing π / 4.
            1. If _nx_ is *-∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing 3π / 4.
            1. Return an implementation-approximated Number value representing π / 2.
          1. If _ny_ is *-∞*<sub>𝔽</sub>, then
            1. If _nx_ is *+∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing -π / 4.
            1. If _nx_ is *-∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing -3π / 4.
            1. Return an implementation-approximated Number value representing -π / 2.
          1. If _ny_ is *+0*<sub>𝔽</sub>, then
            1. If _nx_ > *+0*<sub>𝔽</sub> or _nx_ is *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
            1. Return an implementation-approximated Number value representing π.
          1. If _ny_ is *-0*<sub>𝔽</sub>, then
            1. If _nx_ > *+0*<sub>𝔽</sub> or _nx_ is *+0*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
            1. Return an implementation-approximated Number value representing -π.
          1. Assert: _ny_ is finite and is neither *+0*<sub>𝔽</sub> nor *-0*<sub>𝔽</sub>.
          1. If _ny_ > *+0*<sub>𝔽</sub>, then
            1. If _nx_ is *+∞*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
            1. If _nx_ is *-∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing π.
            1. If _nx_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return an implementation-approximated Number value representing π / 2.
          1. If _ny_ &lt; *-0*<sub>𝔽</sub>, then
            1. If _nx_ is *+∞*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
            1. If _nx_ is *-∞*<sub>𝔽</sub>, return an implementation-approximated Number value representing -π.
            1. If _nx_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return an implementation-approximated Number value representing -π / 2.
          1. Assert: _nx_ is finite and is neither *+0*<sub>𝔽</sub> nor *-0*<sub>𝔽</sub>.
          1. Let _r_ be the inverse tangent of abs(ℝ(_ny_) / ℝ(_nx_)).
          1. If _nx_ &lt; *-0*<sub>𝔽</sub>, then
            1. If _ny_ > *+0*<sub>𝔽</sub>, set _r_ to π - _r_.
            1. Else, set _r_ to -π + _r_.
          1. Else,
            1. If _ny_ &lt; *-0*<sub>𝔽</sub>, set _r_ to -_r_.
          1. Return an implementation-approximated Number value representing _r_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.cbrt">
        <h1>Math.cbrt ( _x_ )</h1>
        <p>This function returns the cube root of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. Return an implementation-approximated Number value representing the cube root of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.ceil">
        <h1>Math.ceil ( _x_ )</h1>
        <p>This function returns the smallest (closest to -∞) integral Number value that is not less than _x_. If _x_ is already an integral Number, the result is _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ &lt; *-0*<sub>𝔽</sub> and _n_ > *-1*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
          1. If _n_ is an integral Number, return _n_.
          1. Return the smallest (closest to -∞) integral Number value that is not less than _n_.
        </emu-alg>
        <emu-note>
          <p>The value of `Math.ceil(x)` is the same as the value of `-Math.floor(-x)`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.clz32">
        <h1>Math.clz32 ( _x_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToUint32(_x_).
          1. Let _p_ be the number of leading zero bits in the unsigned 32-bit binary representation of _n_.
          1. Return 𝔽(_p_).
        </emu-alg>
        <emu-note>
          <p>If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, this method returns *32*<sub>𝔽</sub>. If the most significant bit of the 32-bit binary encoding of _n_ is 1, this method returns *+0*<sub>𝔽</sub>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.cos">
        <h1>Math.cos ( _x_ )</h1>
        <p>This function returns the cosine of _x_. The argument is expressed in radians.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite, return *NaN*.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the cosine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.cosh">
        <h1>Math.cosh ( _x_ )</h1>
        <p>This function returns the hyperbolic cosine of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is *NaN*, return *NaN*.
          1. If _n_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the hyperbolic cosine of ℝ(_n_).
        </emu-alg>
        <emu-note>
          <p>The value of `Math.cosh(x)` is the same as the value of `(Math.exp(x) + Math.exp(-x)) / 2`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.exp">
        <h1>Math.exp ( _x_ )</h1>
        <p>This function returns the exponential function of _x_ (_e_ raised to the power of _x_, where _e_ is the base of the natural logarithms).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is either *NaN* or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
          1. If _n_ is *-∞*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the exponential function of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.expm1">
        <h1>Math.expm1 ( _x_ )</h1>
        <p>This function returns the result of subtracting 1 from the exponential function of _x_ (_e_ raised to the power of _x_, where _e_ is the base of the natural logarithms). The result is computed in a way that is accurate even when the value of _x_ is close to 0.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, *-0*<sub>𝔽</sub>, or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *-∞*<sub>𝔽</sub>, return *-1*<sub>𝔽</sub>.
          1. Let _exp_ be the exponential function of ℝ(_n_).
          1. Return an implementation-approximated Number value representing _exp_ - 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.floor">
        <h1>Math.floor ( _x_ )</h1>
        <p>This function returns the greatest (closest to +∞) integral Number value that is not greater than _x_. If _x_ is already an integral Number, the result is _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ &lt; *1*<sub>𝔽</sub> and _n_ > *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ is an integral Number, return _n_.
          1. Return the greatest (closest to +∞) integral Number value that is not greater than _n_.
        </emu-alg>
        <emu-note>
          <p>The value of `Math.floor(x)` is the same as the value of `-Math.ceil(-x)`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.fround">
        <h1>Math.fround ( _x_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is *NaN*, return *NaN*.
          1. If _n_ is one of *+0*<sub>𝔽</sub>, *-0*<sub>𝔽</sub>, *+∞*<sub>𝔽</sub>, or *-∞*<sub>𝔽</sub>, return _n_.
          1. Let _n32_ be the result of converting _n_ to IEEE 754-2019 binary32 format using roundTiesToEven mode.
          1. Let _n64_ be the result of converting _n32_ to IEEE 754-2019 binary64 format.
          1. Return the ECMAScript Number value corresponding to _n64_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.hypot">
        <h1>Math.hypot ( ..._args_ )</h1>
        <p>Given zero or more arguments, this function returns the square root of the sum of squares of its arguments.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _coerced_ be a new empty List.
          1. For each element _arg_ of _args_, do
            1. Let _n_ be ? ToNumber(_arg_).
            1. Append _n_ to _coerced_.
          1. For each element _number_ of _coerced_, do
            1. If _number_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>.
          1. Let _onlyZero_ be *true*.
          1. For each element _number_ of _coerced_, do
            1. If _number_ is *NaN*, return *NaN*.
            1. If _number_ is neither *+0*<sub>𝔽</sub> nor *-0*<sub>𝔽</sub>, set _onlyZero_ to *false*.
          1. If _onlyZero_ is *true*, return *+0*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the square root of the sum of squares of the mathematical values of the elements of _coerced_.
        </emu-alg>
        <p>The *"length"* property of this function is *2*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>Implementations should take care to avoid the loss of precision from overflows and underflows that are prone to occur in naive implementations when this function is called with two or more arguments.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.imul">
        <h1>Math.imul ( _x_, _y_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _a_ be ℝ(? ToUint32(_x_)).
          1. Let _b_ be ℝ(? ToUint32(_y_)).
          1. Let _product_ be (_a_ × _b_) modulo 2<sup>32</sup>.
          1. If _product_ ≥ 2<sup>31</sup>, return 𝔽(_product_ - 2<sup>32</sup>); otherwise return 𝔽(_product_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.log">
        <h1>Math.log ( _x_ )</h1>
        <p>This function returns the natural logarithm of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is either *NaN* or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the natural logarithm of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.log1p">
        <h1>Math.log1p ( _x_ )</h1>
        <p>This function returns the natural logarithm of 1 + _x_. The result is computed in a way that is accurate even when the value of x is close to zero.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, *-0*<sub>𝔽</sub>, or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *-1*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>.
          1. If _n_ &lt; *-1*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the natural logarithm of 1 + ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.log10">
        <h1>Math.log10 ( _x_ )</h1>
        <p>This function returns the base 10 logarithm of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is either *NaN* or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the base 10 logarithm of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.log2">
        <h1>Math.log2 ( _x_ )</h1>
        <p>This function returns the base 2 logarithm of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is either *NaN* or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *1*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the base 2 logarithm of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.max">
        <h1>Math.max ( ..._args_ )</h1>
        <p>Given zero or more arguments, this function calls ToNumber on each of the arguments and returns the largest of the resulting values.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _coerced_ be a new empty List.
          1. For each element _arg_ of _args_, do
            1. Let _n_ be ? ToNumber(_arg_).
            1. Append _n_ to _coerced_.
          1. Let _highest_ be *-∞*<sub>𝔽</sub>.
          1. For each element _number_ of _coerced_, do
            1. If _number_ is *NaN*, return *NaN*.
            1. If _number_ is *+0*<sub>𝔽</sub> and _highest_ is *-0*<sub>𝔽</sub>, set _highest_ to *+0*<sub>𝔽</sub>.
            1. If _number_ > _highest_, set _highest_ to _number_.
          1. Return _highest_.
        </emu-alg>
        <emu-note>
          <p>The comparison of values to determine the largest value is done using the IsLessThan algorithm except that *+0*<sub>𝔽</sub> is considered to be larger than *-0*<sub>𝔽</sub>.</p>
        </emu-note>
        <p>The *"length"* property of this function is *2*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-math.min">
        <h1>Math.min ( ..._args_ )</h1>
        <p>Given zero or more arguments, this function calls ToNumber on each of the arguments and returns the smallest of the resulting values.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _coerced_ be a new empty List.
          1. For each element _arg_ of _args_, do
            1. Let _n_ be ? ToNumber(_arg_).
            1. Append _n_ to _coerced_.
          1. Let _lowest_ be *+∞*<sub>𝔽</sub>.
          1. For each element _number_ of _coerced_, do
            1. If _number_ is *NaN*, return *NaN*.
            1. If _number_ is *-0*<sub>𝔽</sub> and _lowest_ is *+0*<sub>𝔽</sub>, set _lowest_ to *-0*<sub>𝔽</sub>.
            1. If _number_ &lt; _lowest_, set _lowest_ to _number_.
          1. Return _lowest_.
        </emu-alg>
        <emu-note>
          <p>The comparison of values to determine the largest value is done using the IsLessThan algorithm except that *+0*<sub>𝔽</sub> is considered to be larger than *-0*<sub>𝔽</sub>.</p>
        </emu-note>
        <p>The *"length"* property of this function is *2*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-math.pow">
        <h1>Math.pow ( _base_, _exponent_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Set _base_ to ? ToNumber(_base_).
          1. Set _exponent_ to ? ToNumber(_exponent_).
          1. Return Number::exponentiate(_base_, _exponent_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.random">
        <h1>Math.random ( )</h1>
        <p>This function returns a Number value with positive sign, greater than or equal to *+0*<sub>𝔽</sub> but strictly less than *1*<sub>𝔽</sub>, chosen randomly or pseudo randomly with approximately uniform distribution over that range, using an implementation-defined algorithm or strategy.</p>
        <p>Each `Math.random` function created for distinct realms must produce a distinct sequence of values from successive calls.</p>
      </emu-clause>

      <emu-clause id="sec-math.round">
        <h1>Math.round ( _x_ )</h1>
        <p>This function returns the Number value that is closest to _x_ and is integral. If two integral Numbers are equally close to _x_, then the result is the Number value that is closer to +∞. If _x_ is already integral, the result is _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is an integral Number, return _n_.
          1. If _n_ &lt; *0.5*<sub>𝔽</sub> and _n_ > *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub> and _n_ ≥ *-0.5*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
          1. Return the integral Number closest to _n_, preferring the Number closer to +∞ in the case of a tie.
        </emu-alg>
        <emu-note>
          <p>`Math.round(3.5)` returns 4, but `Math.round(-3.5)` returns -3.</p>
        </emu-note>
        <emu-note>
          <p>The value of `Math.round(x)` is not always the same as the value of `Math.floor(x + 0.5)`. When `x` is *-0*<sub>𝔽</sub> or `x` is less than *+0*<sub>𝔽</sub> but greater than or equal to *-0.5*<sub>𝔽</sub>, `Math.round(x)` returns *-0*<sub>𝔽</sub>, but `Math.floor(x + 0.5)` returns *+0*<sub>𝔽</sub>. `Math.round(x)` may also differ from the value of `Math.floor(x + 0.5)`because of internal rounding when computing `x + 0.5`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.sign">
        <h1>Math.sign ( _x_ )</h1>
        <p>This function returns the sign of _x_, indicating whether _x_ is positive, negative, or zero.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return *-1*<sub>𝔽</sub>.
          1. Return *1*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.sin">
        <h1>Math.sin ( _x_ )</h1>
        <p>This function returns the sine of _x_. The argument is expressed in radians.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the sine of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.sinh">
        <h1>Math.sinh ( _x_ )</h1>
        <p>This function returns the hyperbolic sine of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. Return an implementation-approximated Number value representing the hyperbolic sine of ℝ(_n_).
        </emu-alg>
        <emu-note>
          <p>The value of `Math.sinh(x)` is the same as the value of `(Math.exp(x) - Math.exp(-x)) / 2`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.sqrt">
        <h1>Math.sqrt ( _x_ )</h1>
        <p>This function returns the square root of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, *-0*<sub>𝔽</sub>, or *+∞*<sub>𝔽</sub>, return _n_.
          1. If _n_ &lt; *-0*<sub>𝔽</sub>, return *NaN*.
          1. Return 𝔽(the square root of ℝ(_n_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.tan">
        <h1>Math.tan ( _x_ )</h1>
        <p>This function returns the tangent of _x_. The argument is expressed in radians.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *NaN*.
          1. Return an implementation-approximated Number value representing the tangent of ℝ(_n_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-math.tanh">
        <h1>Math.tanh ( _x_ )</h1>
        <p>This function returns the hyperbolic tangent of _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ is *+∞*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
          1. If _n_ is *-∞*<sub>𝔽</sub>, return *-1*<sub>𝔽</sub>.
          1. Return an implementation-approximated Number value representing the hyperbolic tangent of ℝ(_n_).
        </emu-alg>
        <emu-note>
          <p>The value of `Math.tanh(x)` is the same as the value of `(Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-math.trunc">
        <h1>Math.trunc ( _x_ )</h1>
        <p>This function returns the integral part of the number _x_, removing any fractional digits. If _x_ is already integral, the result is _x_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _n_ be ? ToNumber(_x_).
          1. If _n_ is not finite or _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
          1. If _n_ &lt; *1*<sub>𝔽</sub> and _n_ > *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _n_ &lt; *-0*<sub>𝔽</sub> and _n_ > *-1*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
          1. Return the integral Number nearest _n_ in the direction of *+0*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-date-objects">
    <h1>Date Objects</h1>

    <emu-clause id="sec-overview-of-date-objects-and-definitions-of-abstract-operations">
      <h1>Overview of Date Objects and Definitions of Abstract Operations</h1>
      <p>The following abstract operations operate on time values (defined in <emu-xref href="#sec-time-values-and-time-range"></emu-xref>). Note that, in every case, if any argument to one of these functions is *NaN*, the result will be *NaN*.</p>

      <emu-clause id="sec-time-values-and-time-range">
        <h1>Time Values and Time Range</h1>
        <p>Time measurement in ECMAScript is analogous to time measurement in POSIX, in particular sharing definition in terms of the proleptic Gregorian calendar, an <dfn id="epoch">epoch</dfn> of midnight at the beginning of 1 January 1970 UTC, and an accounting of every day as comprising exactly 86,400 seconds (each of which is 1000 milliseconds long).</p>
        <p>An ECMAScript <dfn variants="time values">time value</dfn> is a Number, either a finite integral Number representing an instant in time to millisecond precision or *NaN* representing no specific instant. A time value that is a multiple of <emu-eqn>24 × 60 × 60 × 1000 = 86,400,000</emu-eqn> (i.e., is 86,400,000 × _d_ for some integer _d_) represents the instant at the start of the UTC day that follows the epoch by _d_ whole UTC days (preceding the epoch for negative _d_). Every other finite time value _t_ is defined relative to the greatest preceding time value _s_ that is such a multiple, and represents the instant that occurs within the same UTC day as _s_ but follows it by (_t_ - _s_) milliseconds.</p>
        <p>Time values do not account for UTC leap seconds—there are no time values representing instants within positive leap seconds, and there are time values representing instants removed from the UTC timeline by negative leap seconds. However, the definition of time values nonetheless yields piecewise alignment with UTC, with discontinuities only at leap second boundaries and zero difference outside of leap seconds.</p>
        <p>A Number can exactly represent all integers from -9,007,199,254,740,992 to 9,007,199,254,740,992 (<emu-xref href="#sec-number.min_safe_integer"></emu-xref> and <emu-xref href="#sec-number.max_safe_integer"></emu-xref>). A time value supports a slightly smaller range of -8,640,000,000,000,000 to 8,640,000,000,000,000 milliseconds. This yields a supported time value range of exactly -100,000,000 days to 100,000,000 days relative to midnight at the beginning of 1 January 1970 UTC.</p>
        <p>The exact moment of midnight at the beginning of 1 January 1970 UTC is represented by the time value *+0*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>In the proleptic Gregorian calendar, leap years are precisely those which are both divisible by 4 and either divisible by 400 or not divisible by 100.</p>
          <p>The 400 year cycle of the proleptic Gregorian calendar contains 97 leap years. This yields an average of 365.2425 days per year, which is 31,556,952,000 milliseconds. Therefore, the maximum range a Number could represent exactly with millisecond precision is approximately -285,426 to 285,426 years relative to 1970. The smaller range supported by a time value as specified in this section is approximately -273,790 to 273,790 years relative to 1970.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-time-related-constants">
        <h1>Time-related Constants</h1>
        <p>These constants are referenced by algorithms in the following sections.</p>
        <emu-eqn id="eqn-HoursPerDay" aoid="HoursPerDay">HoursPerDay = 24</emu-eqn>
        <emu-eqn id="eqn-MinutesPerHour" aoid="MinutesPerHour">MinutesPerHour = 60</emu-eqn>
        <emu-eqn id="eqn-SecondsPerMinute" aoid="SecondsPerMinute">SecondsPerMinute = 60</emu-eqn>
        <emu-eqn id="eqn-msPerSecond" aoid="msPerSecond">msPerSecond = *1000*<sub>𝔽</sub></emu-eqn>
        <emu-eqn id="eqn-msPerMinute" aoid="msPerMinute">msPerMinute = *60000*<sub>𝔽</sub> = msPerSecond × 𝔽(SecondsPerMinute)</emu-eqn>
        <emu-eqn id="eqn-msPerHour" aoid="msPerHour">msPerHour = *3600000*<sub>𝔽</sub> = msPerMinute × 𝔽(MinutesPerHour)</emu-eqn>
        <emu-eqn id="eqn-msPerDay" aoid="msPerDay">msPerDay = *86400000*<sub>𝔽</sub> = msPerHour × 𝔽(HoursPerDay)</emu-eqn>
      </emu-clause>

      <emu-clause id="sec-day" type="abstract operation" oldids="eqn-Day,sec-day-number-and-time-within-day">
        <h1>
          Day (
            _t_: a finite time value,
          ): an integral Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the day number of the day in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(floor(ℝ(_t_ / msPerDay))).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-timewithinday" type="abstract operation" oldids="eqn-TimeWithinDay">
        <h1>
          TimeWithinDay (
            _t_: a finite time value,
          ): an integral Number in the interval from *+0*<sub>𝔽</sub> (inclusive) to msPerDay (exclusive)
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the number of milliseconds since the start of the day in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(ℝ(_t_) modulo ℝ(msPerDay)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-daysinyear" type="abstract operation" oldids="eqn-DaysInYear,sec-year-number">
        <h1>
          DaysInYear (
            _y_: an integral Number,
          ): *365*<sub>𝔽</sub> or *366*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the number of days in year _y_. Leap years have 366 days; all other years have 365.</dd>
        </dl>
        <emu-alg>
          1. Let _ry_ be ℝ(_y_).
          1. If (_ry_ modulo 400) = 0, return *366*<sub>𝔽</sub>.
          1. If (_ry_ modulo 100) = 0, return *365*<sub>𝔽</sub>.
          1. If (_ry_ modulo 4) = 0, return *366*<sub>𝔽</sub>.
          1. Return *365*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dayfromyear" type="abstract operation" oldids="eqn-DaysFromYear">
        <h1>
          DayFromYear (
            _y_: an integral Number,
          ): an integral Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the day number of the first day of year _y_.</dd>
        </dl>
        <emu-alg>
          1. Let _ry_ be ℝ(_y_).
          1. [declared="numYears1,numYears4,numYears100,numYears400"] NOTE: In the following steps, _numYears1_, _numYears4_, _numYears100_, and _numYears400_ represent the number of years divisible by 1, 4, 100, and 400, respectively, that occur between the epoch and the start of year _y_. The number is negative if _y_ is before the epoch.
          1. Let _numYears1_ be (_ry_ - 1970).
          1. Let _numYears4_ be floor((_ry_ - 1969) / 4).
          1. Let _numYears100_ be floor((_ry_ - 1901) / 100).
          1. Let _numYears400_ be floor((_ry_ - 1601) / 400).
          1. Return 𝔽(365 × _numYears1_ + _numYears4_ - _numYears100_ + _numYears400_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-timefromyear" type="abstract operation" oldids="eqn-TimeFromYear">
        <h1>
          TimeFromYear (
            _y_: an integral Number,
          ): a time value
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the time value of the start of year _y_.</dd>
        </dl>
        <emu-alg>
          1. Return msPerDay × DayFromYear(_y_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-yearfromtime" type="abstract operation" oldids="eqn-YearFromTime">
        <h1>
          YearFromTime (
            _t_: a finite time value,
          ): an integral Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the year in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. [declared="y"] Return the largest integral Number _y_ (closest to +∞) such that TimeFromYear(_y_) ≤ _t_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-daywithinyear" type="abstract operation" oldids="eqn-DayWithinYear">
        <h1>
          DayWithinYear (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *365*<sub>𝔽</sub>
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return Day(_t_) - DayFromYear(YearFromTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-inleapyear" type="abstract operation" oldids="eqn-InLeapYear">
        <h1>
          InLeapYear (
            _t_: a finite time value,
          ): *+0*<sub>𝔽</sub> or *1*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns *1*<sub>𝔽</sub> if _t_ is within a leap year and *+0*<sub>𝔽</sub> otherwise.</dd>
        </dl>
        <emu-alg>
          1. If DaysInYear(YearFromTime(_t_)) is *366*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>; else return *+0*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-monthfromtime" type="abstract operation" oldids="eqn-MonthFromTime,sec-month-number">
        <h1>
          MonthFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *11*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns a Number identifying the month in which _t_ falls. A month value of *+0*<sub>𝔽</sub> specifies January; *1*<sub>𝔽</sub> specifies February; *2*<sub>𝔽</sub> specifies March; *3*<sub>𝔽</sub> specifies April; *4*<sub>𝔽</sub> specifies May; *5*<sub>𝔽</sub> specifies June; *6*<sub>𝔽</sub> specifies July; *7*<sub>𝔽</sub> specifies August; *8*<sub>𝔽</sub> specifies September; *9*<sub>𝔽</sub> specifies October; *10*<sub>𝔽</sub> specifies November; and *11*<sub>𝔽</sub> specifies December. Note that <emu-eqn>MonthFromTime(*+0*<sub>𝔽</sub>) = *+0*<sub>𝔽</sub></emu-eqn>, corresponding to Thursday, 1 January 1970.</dd>
        </dl>
        <emu-alg>
          1. Let _inLeapYear_ be InLeapYear(_t_).
          1. Let _dayWithinYear_ be DayWithinYear(_t_).
          1. If _dayWithinYear_ &lt; *31*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *59*<sub>𝔽</sub> + _inLeapYear_, return *1*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *90*<sub>𝔽</sub> + _inLeapYear_, return *2*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *120*<sub>𝔽</sub> + _inLeapYear_, return *3*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *151*<sub>𝔽</sub> + _inLeapYear_, return *4*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *181*<sub>𝔽</sub> + _inLeapYear_, return *5*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *212*<sub>𝔽</sub> + _inLeapYear_, return *6*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *243*<sub>𝔽</sub> + _inLeapYear_, return *7*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *273*<sub>𝔽</sub> + _inLeapYear_, return *8*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *304*<sub>𝔽</sub> + _inLeapYear_, return *9*<sub>𝔽</sub>.
          1. If _dayWithinYear_ &lt; *334*<sub>𝔽</sub> + _inLeapYear_, return *10*<sub>𝔽</sub>.
          1. Assert: _dayWithinYear_ &lt; *365*<sub>𝔽</sub> + _inLeapYear_.
          1. Return *11*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-datefromtime" type="abstract operation" oldids="sec-date-number">
        <h1>
          DateFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *1*<sub>𝔽</sub> to *31*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the day of the month in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Let _inLeapYear_ be InLeapYear(_t_).
          1. Let _dayWithinYear_ be DayWithinYear(_t_).
          1. Let _month_ be MonthFromTime(_t_).
          1. If _month_ is *+0*<sub>𝔽</sub>, return _dayWithinYear_ + *1*<sub>𝔽</sub>.
          1. If _month_ is *1*<sub>𝔽</sub>, return _dayWithinYear_ - *30*<sub>𝔽</sub>.
          1. If _month_ is *2*<sub>𝔽</sub>, return _dayWithinYear_ - *58*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *3*<sub>𝔽</sub>, return _dayWithinYear_ - *89*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *4*<sub>𝔽</sub>, return _dayWithinYear_ - *119*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *5*<sub>𝔽</sub>, return _dayWithinYear_ - *150*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *6*<sub>𝔽</sub>, return _dayWithinYear_ - *180*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *7*<sub>𝔽</sub>, return _dayWithinYear_ - *211*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *8*<sub>𝔽</sub>, return _dayWithinYear_ - *242*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *9*<sub>𝔽</sub>, return _dayWithinYear_ - *272*<sub>𝔽</sub> - _inLeapYear_.
          1. If _month_ is *10*<sub>𝔽</sub>, return _dayWithinYear_ - *303*<sub>𝔽</sub> - _inLeapYear_.
          1. Assert: _month_ is *11*<sub>𝔽</sub>.
          1. Return _dayWithinYear_ - *333*<sub>𝔽</sub> - _inLeapYear_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-weekday" type="abstract operation" oldids="sec-week-day">
        <h1>
          WeekDay (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *6*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns a Number identifying the day of the week in which _t_ falls. A weekday value of *+0*<sub>𝔽</sub> specifies Sunday; *1*<sub>𝔽</sub> specifies Monday; *2*<sub>𝔽</sub> specifies Tuesday; *3*<sub>𝔽</sub> specifies Wednesday; *4*<sub>𝔽</sub> specifies Thursday; *5*<sub>𝔽</sub> specifies Friday; and *6*<sub>𝔽</sub> specifies Saturday. Note that <emu-eqn>WeekDay(*+0*<sub>𝔽</sub>) = *4*<sub>𝔽</sub></emu-eqn>, corresponding to Thursday, 1 January 1970.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(ℝ(Day(_t_) + *4*<sub>𝔽</sub>) modulo 7).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-hourfromtime" type="abstract operation" oldids="eqn-HourFromTime,sec-hours-minutes-second-and-milliseconds">
        <h1>
          HourFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *23*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the hour of the day in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(floor(ℝ(_t_ / msPerHour)) modulo HoursPerDay).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-minfromtime" type="abstract operation" oldids="eqn-MinFromTime">
        <h1>
          MinFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *59*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the minute of the hour in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(floor(ℝ(_t_ / msPerMinute)) modulo MinutesPerHour).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-secfromtime" type="abstract operation" oldids="eqn-SecFromTime">
        <h1>
          SecFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *59*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the second of the minute in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(floor(ℝ(_t_ / msPerSecond)) modulo SecondsPerMinute).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-msfromtime" type="abstract operation" oldids="eqn-msFromTime">
        <h1>
          msFromTime (
            _t_: a finite time value,
          ): an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to *999*<sub>𝔽</sub>
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the millisecond of the second in which _t_ falls.</dd>
        </dl>
        <emu-alg>
          1. Return 𝔽(ℝ(_t_) modulo ℝ(msPerSecond)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getutcepochnanoseconds" type="abstract operation">
        <h1>
          GetUTCEpochNanoseconds (
            _year_: an integer,
            _month_: an integer in the inclusive interval from 1 to 12,
            _day_: an integer in the inclusive interval from 1 to 31,
            _hour_: an integer in the inclusive interval from 0 to 23,
            _minute_: an integer in the inclusive interval from 0 to 59,
            _second_: an integer in the inclusive interval from 0 to 59,
            _millisecond_: an integer in the inclusive interval from 0 to 999,
            _microsecond_: an integer in the inclusive interval from 0 to 999,
            _nanosecond_: an integer in the inclusive interval from 0 to 999,
          ): a BigInt
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>The returned value represents a number of nanoseconds since the epoch that corresponds to the given ISO 8601 calendar date and wall-clock time in UTC.</dd>
        </dl>
        <emu-alg>
          1. Let _date_ be MakeDay(𝔽(_year_), 𝔽(_month_ - 1), 𝔽(_day_)).
          1. Let _time_ be MakeTime(𝔽(_hour_), 𝔽(_minute_), 𝔽(_second_), 𝔽(_millisecond_)).
          1. Let _ms_ be MakeDate(_date_, _time_).
          1. Assert: _ms_ is an integral Number.
          1. Return ℤ(ℝ(_ms_) × 10<sup>6</sup> + _microsecond_ × 10<sup>3</sup> + _nanosecond_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-time-zone-identifiers">
        <h1>Time Zone Identifiers</h1>

        <p>
          Time zones in ECMAScript are represented by <dfn variants="time zone identifier">time zone identifiers</dfn>, which are Strings composed entirely of code units in the inclusive interval from 0x0000 to 0x007F.
          Time zones supported by an ECMAScript implementation may be <dfn variants="available named time zone">available named time zones</dfn>, represented by the [[Identifier]] field of the Time Zone Identifier Records returned by AvailableNamedTimeZoneIdentifiers, or <dfn variants="offset time zone">offset time zones</dfn>, represented by Strings for which IsTimeZoneOffsetString returns *true*.
        </p>
        <p>
          A <dfn variants="primary time zone identifiers">primary time zone identifier</dfn> is the preferred identifier for an available named time zone.
          A <dfn variants="non-primary time zone identifiers">non-primary time zone identifier</dfn> is an identifier for an available named time zone that is not a primary time zone identifier.
          An <dfn variants="available named time zone identifiers">available named time zone identifier</dfn> is either a primary time zone identifier or a non-primary time zone identifier.
          Each available named time zone identifier is associated with exactly one available named time zone.
          Each available named time zone is associated with exactly one primary time zone identifier and zero or more non-primary time zone identifiers.
        </p>
        <p>
          ECMAScript implementations must support an available named time zone with the identifier *"UTC"*, which must be the primary time zone identifier for the UTC time zone.
          In addition, implementations may support any number of other available named time zones.
        </p>
        <p>
          Implementations that follow the requirements for time zones as described in the ECMA-402 Internationalization API specification are called <dfn>time zone aware</dfn>.
          Time zone aware implementations must support available named time zones corresponding to the Zone and Link names of the IANA Time Zone Database, and only such names.
          In time zone aware implementations, a primary time zone identifier is a Zone name, and a non-primary time zone identifier is a Link name, respectively, in the IANA Time Zone Database except as specifically overridden by AvailableNamedTimeZoneIdentifiers as specified in the ECMA-402 specification.
          Implementations that do not support the entire IANA Time Zone Database are still recommended to use IANA Time Zone Database names as identifiers to represent time zones.
        </p>
      </emu-clause>

      <emu-clause id="sec-getnamedtimezoneepochnanoseconds" type="implementation-defined abstract operation">
        <h1>
          GetNamedTimeZoneEpochNanoseconds (
            _timeZoneIdentifier_: a String,
            _year_: an integer,
            _month_: an integer in the inclusive interval from 1 to 12,
            _day_: an integer in the inclusive interval from 1 to 31,
            _hour_: an integer in the inclusive interval from 0 to 23,
            _minute_: an integer in the inclusive interval from 0 to 59,
            _second_: an integer in the inclusive interval from 0 to 59,
            _millisecond_: an integer in the inclusive interval from 0 to 999,
            _microsecond_: an integer in the inclusive interval from 0 to 999,
            _nanosecond_: an integer in the inclusive interval from 0 to 999,
          ): a List of BigInts
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            Each value in the returned List represents a number of nanoseconds since the epoch that corresponds to the given ISO 8601 calendar date and wall-clock time in the named time zone identified by _timeZoneIdentifier_.
          </dd>
        </dl>
        <p>
          When the input represents a local time occurring more than once because of a negative time zone transition (e.g. when daylight saving time ends or the time zone offset is decreased due to a time zone rule change), the returned List will have more than one element and will be sorted by ascending numerical value.
          When the input represents a local time skipped because of a positive time zone transition (e.g. when daylight saving time begins or the time zone offset is increased due to a time zone rule change), the returned List will be empty.
          Otherwise, the returned List will have one element.
        </p>
        <p>The default implementation of GetNamedTimeZoneEpochNanoseconds, to be used for ECMAScript implementations that do not include local political rules for any time zones, performs the following steps when called:</p>
        <emu-alg>
          1. Assert: _timeZoneIdentifier_ is *"UTC"*.
          1. Let _epochNanoseconds_ be GetUTCEpochNanoseconds(_year_, _month_, _day_, _hour_, _minute_, _second_, _millisecond_, _microsecond_, _nanosecond_).
          1. Return « _epochNanoseconds_ ».
        </emu-alg>
        <emu-note>
          <p>It is required for time zone aware implementations (and recommended for all others) to use the time zone information of the IANA Time Zone Database <a href="https://www.iana.org/time-zones/">https://www.iana.org/time-zones/</a>.</p>
          <p>1:30 AM on 5 November 2017 in America/New_York is repeated twice, so GetNamedTimeZoneEpochNanoseconds(*"America/New_York"*, 2017, 11, 5, 1, 30, 0, 0, 0, 0) would return a List of length 2 in which the first element represents 05:30 UTC (corresponding with 01:30 US Eastern Daylight Time at UTC offset -04:00) and the second element represents 06:30 UTC (corresponding with 01:30 US Eastern Standard Time at UTC offset -05:00).</p>
          <p>2:30 AM on 12 March 2017 in America/New_York does not exist, so GetNamedTimeZoneEpochNanoseconds(*"America/New_York"*, 2017, 3, 12, 2, 30, 0, 0, 0, 0) would return an empty List.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-getnamedtimezoneoffsetnanoseconds" oldids="sec-local-time-zone-adjustment" type="implementation-defined abstract operation">
        <h1>
          GetNamedTimeZoneOffsetNanoseconds (
            _timeZoneIdentifier_: a String,
            _epochNanoseconds_: a BigInt,
          ): an integer
        </h1>
        <dl class="header">
        </dl>
        <p>The returned integer represents the offset from UTC of the named time zone identified by _timeZoneIdentifier_, at the instant corresponding with _epochNanoseconds_ relative to the epoch, both in nanoseconds.</p>
        <p>The default implementation of GetNamedTimeZoneOffsetNanoseconds, to be used for ECMAScript implementations that do not include local political rules for any time zones, performs the following steps when called:</p>
        <emu-alg>
          1. Assert: _timeZoneIdentifier_ is *"UTC"*.
          1. Return 0.
        </emu-alg>
        <emu-note>
          <p>Time zone offset values may be positive or negative.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-time-zone-identifier-record">
        <h1>Time Zone Identifier Record</h1>
        <p>A <dfn variants="Time Zone Identifier Records">Time Zone Identifier Record</dfn> is a Record used to describe an available named time zone identifier and its corresponding primary time zone identifier.</p>
        <p>Time Zone Identifier Records have the fields listed in <emu-xref href="#table-time-zone-identifier-record-fields"></emu-xref>.</p>
        <emu-table id="table-time-zone-identifier-record-fields" caption="Time Zone Identifier Record Fields">
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tr>
              <td>[[Identifier]]</td>
              <td>a String</td>
              <td>An available named time zone identifier that is supported by the implementation.</td>
            </tr>
            <tr>
              <td>[[PrimaryIdentifier]]</td>
              <td>a String</td>
              <td>The primary time zone identifier that [[Identifier]] resolves to.</td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>If [[Identifier]] is a primary time zone identifier, then [[Identifier]] is [[PrimaryIdentifier]].</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-availablenamedtimezoneidentifiers" type="implementation-defined abstract operation">
        <h1>AvailableNamedTimeZoneIdentifiers ( ): a List of Time Zone Identifier Records</h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            Its result describes all available named time zone identifiers in this implementation, as well as the primary time zone identifier corresponding to each available named time zone identifier.
            The List is ordered according to the [[Identifier]] field of each Time Zone Identifier Record.
          </dd>
        </dl>
        <p>
          Time zone aware implementations, including all implementations that implement the ECMA-402 Internationalization API, must implement the AvailableNamedTimeZoneIdentifiers abstract operation as specified in the ECMA-402 specification.
          For implementations that are not time zone aware, AvailableNamedTimeZoneIdentifiers performs the following steps when called:
        </p>
        <emu-alg>
          1. If the implementation does not include local political rules for any time zones, then
            1. Return « the Time Zone Identifier Record { [[Identifier]]: *"UTC"*, [[PrimaryIdentifier]]: *"UTC"* } ».
          1. Let _identifiers_ be the List of unique available named time zone identifiers, sorted according to lexicographic code unit order.
          1. Let _result_ be a new empty List.
          1. For each element _identifier_ of _identifiers_, do
            1. Let _primary_ be _identifier_.
            1. If _identifier_ is a non-primary time zone identifier in this implementation and _identifier_ is not *"UTC"*, then
              1. Set _primary_ to the primary time zone identifier associated with _identifier_.
              1. NOTE: An implementation may need to resolve _identifier_ iteratively to obtain the primary time zone identifier.
            1. Let _record_ be the Time Zone Identifier Record { [[Identifier]]: _identifier_, [[PrimaryIdentifier]]: _primary_ }.
            1. Append _record_ to _result_.
          1. Assert: _result_ contains a Time Zone Identifier Record _r_ such that _r_.[[Identifier]] is *"UTC"* and _r_.[[PrimaryIdentifier]] is *"UTC"*.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-systemtimezoneidentifier" oldids="sec-defaulttimezone" type="implementation-defined abstract operation">
        <h1>SystemTimeZoneIdentifier ( ): a String</h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            It returns a String representing the host environment's current time zone, which is either a String representing a UTC offset for which IsTimeZoneOffsetString returns *true*, or a primary time zone identifier.
          </dd>
        </dl>

        <emu-alg>
          1. If the implementation only supports the UTC time zone, return *"UTC"*.
          1. Let _systemTimeZoneString_ be the String representing the host environment's current time zone, either a primary time zone identifier or an offset time zone identifier.
          1. Return _systemTimeZoneString_.
        </emu-alg>

        <emu-note>
          <p>
            To ensure the level of functionality that implementations commonly provide in the methods of the Date object, it is recommended that SystemTimeZoneIdentifier return an IANA time zone name corresponding to the host environment's time zone setting, if such a thing exists.
            GetNamedTimeZoneEpochNanoseconds and GetNamedTimeZoneOffsetNanoseconds must reflect the local political rules for standard time and daylight saving time in that time zone, if such rules exist.
          </p>
          <p>For example, if the host environment is a browser on a system where the user has chosen US Eastern Time as their time zone, SystemTimeZoneIdentifier returns *"America/New_York"*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-localtime" type="abstract operation">
        <h1>
          LocalTime (
            _t_: a finite time value,
          ): an integral Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            It converts _t_ from UTC to local time.
            The local political rules for standard time and daylight saving time in effect at _t_ should be used to determine the result in the way specified in this section.
          </dd>
        </dl>
        <emu-alg>
          1. Let _systemTimeZoneIdentifier_ be SystemTimeZoneIdentifier().
          1. If IsTimeZoneOffsetString(_systemTimeZoneIdentifier_) is *true*, then
            1. Let _offsetNs_ be ParseTimeZoneOffsetString(_systemTimeZoneIdentifier_).
          1. Else,
            1. Let _offsetNs_ be GetNamedTimeZoneOffsetNanoseconds(_systemTimeZoneIdentifier_, ℤ(ℝ(_t_) × 10<sup>6</sup>)).
          1. Let _offsetMs_ be truncate(_offsetNs_ / 10<sup>6</sup>).
          1. Return _t_ + 𝔽(_offsetMs_).
        </emu-alg>
        <emu-note>
          <p>If political rules for the local time _t_ are not available within the implementation, the result is _t_ because SystemTimeZoneIdentifier returns *"UTC"* and GetNamedTimeZoneOffsetNanoseconds returns 0.</p>
        </emu-note>
        <emu-note>
          <p>It is required for time zone aware implementations (and recommended for all others) to use the time zone information of the IANA Time Zone Database <a href="https://www.iana.org/time-zones/">https://www.iana.org/time-zones/</a>.</p>
        </emu-note>
        <emu-note>
          <p>Two different input time values <emu-eqn>_t_<sub>UTC</sub></emu-eqn> are converted to the same local time <emu-eqn>t<sub>local</sub></emu-eqn> at a negative time zone transition when there are repeated times (e.g. the daylight saving time ends or the time zone adjustment is decreased.).</p>
          <p><emu-eqn>LocalTime(UTC(_t_<sub>local</sub>))</emu-eqn> is not necessarily always equal to <emu-eqn>_t_<sub>local</sub></emu-eqn>. Correspondingly, <emu-eqn>UTC(LocalTime(_t_<sub>UTC</sub>))</emu-eqn> is not necessarily always equal to <emu-eqn>_t_<sub>UTC</sub></emu-eqn>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-utc-t" type="abstract operation">
        <h1>
          UTC (
            _t_: a Number,
          ): a time value
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            It converts _t_ from local time to a UTC time value.
            The local political rules for standard time and daylight saving time in effect at _t_ should be used to determine the result in the way specified in this section.
          </dd>
        </dl>
        <emu-alg>
          1. If _t_ is not finite, return *NaN*.
          1. Let _systemTimeZoneIdentifier_ be SystemTimeZoneIdentifier().
          1. If IsTimeZoneOffsetString(_systemTimeZoneIdentifier_) is *true*, then
            1. Let _offsetNs_ be ParseTimeZoneOffsetString(_systemTimeZoneIdentifier_).
          1. Else,
            1. Let _possibleInstants_ be GetNamedTimeZoneEpochNanoseconds(_systemTimeZoneIdentifier_, ℝ(YearFromTime(_t_)), ℝ(MonthFromTime(_t_)) + 1, ℝ(DateFromTime(_t_)), ℝ(HourFromTime(_t_)), ℝ(MinFromTime(_t_)), ℝ(SecFromTime(_t_)), ℝ(msFromTime(_t_)), 0, 0).
            1. NOTE: The following steps ensure that when _t_ represents local time repeating multiple times at a negative time zone transition (e.g. when the daylight saving time ends or the time zone offset is decreased due to a time zone rule change) or skipped local time at a positive time zone transition (e.g. when the daylight saving time starts or the time zone offset is increased due to a time zone rule change), _t_ is interpreted using the time zone offset before the transition.
            1. If _possibleInstants_ is not empty, then
              1. Let _disambiguatedInstant_ be _possibleInstants_[0].
            1. Else,
              1. NOTE: _t_ represents a local time skipped at a positive time zone transition (e.g. due to daylight saving time starting or a time zone rule change increasing the UTC offset).
              1. [declared="tBefore"] Let _possibleInstantsBefore_ be GetNamedTimeZoneEpochNanoseconds(_systemTimeZoneIdentifier_, ℝ(YearFromTime(_tBefore_)), ℝ(MonthFromTime(_tBefore_)) + 1, ℝ(DateFromTime(_tBefore_)), ℝ(HourFromTime(_tBefore_)), ℝ(MinFromTime(_tBefore_)), ℝ(SecFromTime(_tBefore_)), ℝ(msFromTime(_tBefore_)), 0, 0), where _tBefore_ is the largest integral Number &lt; _t_ for which _possibleInstantsBefore_ is not empty (i.e., _tBefore_ represents the last local time before the transition).
              1. Let _disambiguatedInstant_ be the last element of _possibleInstantsBefore_.
            1. Let _offsetNs_ be GetNamedTimeZoneOffsetNanoseconds(_systemTimeZoneIdentifier_, _disambiguatedInstant_).
          1. Let _offsetMs_ be truncate(_offsetNs_ / 10<sup>6</sup>).
          1. Return _t_ - 𝔽(_offsetMs_).
        </emu-alg>
        <p>
          Input _t_ is nominally a time value but may be any Number value.
          The algorithm must not limit _t_ to the time value range, so that inputs corresponding with a boundary of the time value range can be supported regardless of local UTC offset.
          For example, the maximum time value is 8.64 × 10<sup>15</sup>, corresponding with *"+275760-09-13T00:00:00Z"*.
          In an environment where the local time zone offset is ahead of UTC by 1 hour at that instant, it is represented by the larger input of 8.64 × 10<sup>15</sup> + 3.6 × 10<sup>6</sup>, corresponding with *"+275760-09-13T01:00:00+01:00"*.
        </p>
        <p>If political rules for the local time _t_ are not available within the implementation, the result is _t_ because SystemTimeZoneIdentifier returns *"UTC"* and GetNamedTimeZoneOffsetNanoseconds returns 0.</p>
        <emu-note>
          <p>It is required for time zone aware implementations (and recommended for all others) to use the time zone information of the IANA Time Zone Database <a href="https://www.iana.org/time-zones/">https://www.iana.org/time-zones/</a>.</p>
          <p>
            1:30 AM on 5 November 2017 in America/New_York is repeated twice (fall backward), but it must be interpreted as 1:30 AM UTC-04 instead of 1:30 AM UTC-05.
            In UTC(TimeClip(MakeDate(MakeDay(2017, 10, 5), MakeTime(1, 30, 0, 0)))), the value of _offsetMs_ is <emu-eqn>-4 × msPerHour</emu-eqn>.
          </p>
          <p>
            2:30 AM on 12 March 2017 in America/New_York does not exist, but it must be interpreted as 2:30 AM UTC-05 (equivalent to 3:30 AM UTC-04).
            In UTC(TimeClip(MakeDate(MakeDay(2017, 2, 12), MakeTime(2, 30, 0, 0)))), the value of _offsetMs_ is <emu-eqn>-5 × msPerHour</emu-eqn>.
          </p>
        </emu-note>
        <emu-note>
          <p><emu-eqn>UTC(LocalTime(_t_<sub>UTC</sub>))</emu-eqn> is not necessarily always equal to <emu-eqn>_t_<sub>UTC</sub></emu-eqn>. Correspondingly, <emu-eqn>LocalTime(UTC(_t_<sub>local</sub>))</emu-eqn> is not necessarily always equal to <emu-eqn>_t_<sub>local</sub></emu-eqn>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-maketime" type="abstract operation">
        <h1>
          MakeTime (
            _hour_: a Number,
            _min_: a Number,
            _sec_: a Number,
            _ms_: a Number,
          ): a Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It calculates a number of milliseconds.</dd>
        </dl>
        <emu-alg>
          1. If _hour_ is not finite, _min_ is not finite, _sec_ is not finite, or _ms_ is not finite, return *NaN*.
          1. Let _h_ be 𝔽(! ToIntegerOrInfinity(_hour_)).
          1. Let _m_ be 𝔽(! ToIntegerOrInfinity(_min_)).
          1. Let _s_ be 𝔽(! ToIntegerOrInfinity(_sec_)).
          1. Let _milli_ be 𝔽(! ToIntegerOrInfinity(_ms_)).
          1. Return ((_h_ × msPerHour + _m_ × msPerMinute) + _s_ × msPerSecond) + _milli_.
        </emu-alg>
        <emu-note>
          <p>The arithmetic in MakeTime is floating-point arithmetic, which is not associative, so the operations must be performed in the correct order.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-makeday" type="abstract operation">
        <h1>
          MakeDay (
            _year_: a Number,
            _month_: a Number,
            _date_: a Number,
          ): a Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It calculates a number of days.</dd>
        </dl>
        <emu-alg>
          1. If _year_ is not finite, _month_ is not finite, or _date_ is not finite, return *NaN*.
          1. Let _y_ be 𝔽(! ToIntegerOrInfinity(_year_)).
          1. Let _m_ be 𝔽(! ToIntegerOrInfinity(_month_)).
          1. Let _dt_ be 𝔽(! ToIntegerOrInfinity(_date_)).
          1. Let _ym_ be _y_ + 𝔽(floor(ℝ(_m_) / 12)).
          1. If _ym_ is not finite, return *NaN*.
          1. Let _mn_ be 𝔽(ℝ(_m_) modulo 12).
          1. Find a finite time value _t_ such that YearFromTime(_t_) is _ym_, MonthFromTime(_t_) is _mn_, and DateFromTime(_t_) is *1*<sub>𝔽</sub>; but if this is not possible (because some argument is out of range), return *NaN*.
          1. Return Day(_t_) + _dt_ - *1*<sub>𝔽</sub>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-makedate" type="abstract operation">
        <h1>
          MakeDate (
            _day_: a Number,
            _time_: a Number,
          ): a Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It calculates a number of milliseconds.</dd>
        </dl>
        <emu-alg>
          1. If _day_ is not finite or _time_ is not finite, return *NaN*.
          1. Let _tv_ be _day_ × msPerDay + _time_.
          1. If _tv_ is not finite, return *NaN*.
          1. Return _tv_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-makefullyear" type="abstract operation">
        <h1>
          MakeFullYear (
            _year_: a Number,
          ): an integral Number or *NaN*
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the full year associated with the integer part of _year_, interpreting any value in the inclusive interval from 0 to 99 as a count of years since the start of 1900. For alignment with the proleptic Gregorian calendar, "full year" is defined as the signed count of complete years since the start of year 0 (1 B.C.).</dd>
        </dl>
        <emu-alg>
          1. If _year_ is *NaN*, return *NaN*.
          1. Let _truncated_ be ! ToIntegerOrInfinity(_year_).
          1. If _truncated_ is in the inclusive interval from 0 to 99, return *1900*<sub>𝔽</sub> + 𝔽(_truncated_).
          1. Return 𝔽(_truncated_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-timeclip" type="abstract operation">
        <h1>
          TimeClip (
            _time_: a Number,
          ): a Number
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It calculates a number of milliseconds.</dd>
        </dl>
        <emu-alg>
          1. If _time_ is not finite, return *NaN*.
          1. If abs(ℝ(_time_)) > 8.64 × 10<sup>15</sup>, return *NaN*.
          1. Return 𝔽(! ToIntegerOrInfinity(_time_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date-time-string-format">
        <h1>Date Time String Format</h1>
        <p>ECMAScript defines a string interchange format for date-times based upon a simplification of the ISO 8601 calendar date extended format. The format is as follows: `YYYY-MM-DDTHH:mm:ss.sssZ`</p>
        <p>Where the elements are as follows:</p>
        <figure>
          <table class="lightweight-table">
            <tr>
              <td>
                `YYYY`
              </td>
              <td>
                is the year in the proleptic Gregorian calendar as four decimal digits from 0000 to 9999, or as an <emu-xref href="#sec-expanded-years">expanded year</emu-xref> of *"+"* or *"-"* followed by six decimal digits.
              </td>
            </tr>
            <tr>
              <td>
                `-`
              </td>
              <td>
                *"-"* (hyphen) appears literally twice in the string.
              </td>
            </tr>
            <tr>
              <td>
                `MM`
              </td>
              <td>
                is the month of the year as two decimal digits from 01 (January) to 12 (December).
              </td>
            </tr>
            <tr>
              <td>
                `DD`
              </td>
              <td>
                is the day of the month as two decimal digits from 01 to 31.
              </td>
            </tr>
            <tr>
              <td>
                `T`
              </td>
              <td>
                *"T"* appears literally in the string, to indicate the beginning of the time element.
              </td>
            </tr>
            <tr>
              <td>
                `HH`
              </td>
              <td>
                is the number of complete hours that have passed since midnight as two decimal digits from 00 to 24.
              </td>
            </tr>
            <tr>
              <td>
                `:`
              </td>
              <td>
                *":"* (colon) appears literally twice in the string.
              </td>
            </tr>
            <tr>
              <td>
                `mm`
              </td>
              <td>
                is the number of complete minutes since the start of the hour as two decimal digits from 00 to 59.
              </td>
            </tr>
            <tr>
              <td>
                `ss`
              </td>
              <td>
                is the number of complete seconds since the start of the minute as two decimal digits from 00 to 59.
              </td>
            </tr>
            <tr>
              <td>
                `.`
              </td>
              <td>
                *"."* (dot) appears literally in the string.
              </td>
            </tr>
            <tr>
              <td>
                `sss`
              </td>
              <td>
                is the number of complete milliseconds since the start of the second as three decimal digits.
              </td>
            </tr>
            <tr>
              <td>
                `Z`
              </td>
              <td>
                is the UTC offset representation specified as *"Z"* (for UTC with no offset) or as either *"+"* or *"-"* followed by a time expression `HH:mm` (a subset of the <emu-xref href="#sec-time-zone-offset-strings">time zone offset string format</emu-xref> for indicating local time ahead of or behind UTC, respectively)
              </td>
            </tr>
          </table>
        </figure>
        <p>This format includes date-only forms:</p>
        <pre>
YYYY
YYYY-MM
YYYY-MM-DD
</pre>
<p>It also includes “date-time” forms that consist of one of the above date-only forms immediately followed by one of the following time forms with an optional UTC offset representation appended:</p>
<pre>
THH:mm
THH:mm:ss
THH:mm:ss.sss
</pre>
<p>A string containing out-of-bounds or nonconforming elements is not a valid instance of this format.</p>
<emu-note>
<p>As every day both starts and ends with midnight, the two notations `00:00` and `24:00` are available to distinguish the two midnights that can be associated with one date. This means that the following two notations refer to exactly the same point in time: `1995-02-04T24:00` and `1995-02-05T00:00`. This interpretation of the latter form as "end of a calendar day" is consistent with ISO 8601, even though that specification reserves it for describing time intervals and does not permit it within representations of single points in time.</p>
</emu-note>
<emu-note>
<p>There exists no international standard that specifies abbreviations for civil time zones like CET, EST, etc. and sometimes the same abbreviation is even used for two very different time zones. For this reason, both ISO 8601 and this format specify numeric representations of time zone offsets.</p>
</emu-note>

        <emu-clause id="sec-expanded-years" oldids="sec-extended-years">
          <h1>Expanded Years</h1>
          <p>Covering the full time value range of approximately 273,790 years forward or backward from 1 January 1970 (<emu-xref href="#sec-time-values-and-time-range"></emu-xref>) requires representing years before 0 or after 9999. ISO 8601 permits expansion of the year representation, but only by mutual agreement of the partners in information interchange. In the simplified ECMAScript format, such an expanded year representation shall have 6 digits and is always prefixed with a + or - sign. The year 0 is considered positive and must be prefixed with a + sign. The representation of the year 0 as -000000 is invalid. Strings matching the <emu-xref href="#sec-date-time-string-format">Date Time String Format</emu-xref> with expanded years representing instants in time outside the range of a time value are treated as unrecognizable by <emu-xref href="#sec-date.parse">`Date.parse`</emu-xref> and cause that function to return *NaN* without falling back to implementation-specific behaviour or heuristics.</p>
          <emu-note>
            <p>Examples of date-<emu-not-ref>time values</emu-not-ref> with expanded years:</p>
            <figure>
              <table class="lightweight-table">
                <tr>
                  <td>-271821-04-20T00:00:00Z</td>
                  <td>271822 B.C.</td>
                </tr>
                <tr>
                  <td>-000001-01-01T00:00:00Z</td>
                  <td>2 B.C.</td>
                </tr>
                <tr>
                  <td>+000000-01-01T00:00:00Z</td>
                  <td>1 B.C.</td>
                </tr>
                <tr>
                  <td>+000001-01-01T00:00:00Z</td>
                  <td>1 A.D.</td>
                </tr>
                <tr>
                  <td>+001970-01-01T00:00:00Z</td>
                  <td>1970 A.D.</td>
                </tr>
                <tr>
                  <td>+002009-12-15T00:00:00Z</td>
                  <td>2009 A.D.</td>
                </tr>
                <tr>
                  <td>+275760-09-13T00:00:00Z</td>
                  <td>275760 A.D.</td>
                </tr>
              </table>
            </figure>
          </emu-note>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-time-zone-offset-strings">
        <h1>Time Zone Offset String Format</h1>

        <p>
          ECMAScript defines a string interchange format for UTC offsets, derived from ISO 8601.
          The format is described by the following grammar.
        </p>

        <h2>Syntax</h2>
        <emu-grammar type="definition">
          UTCOffset :::
            ASCIISign Hour
            ASCIISign Hour HourSubcomponents[+Extended]
            ASCIISign Hour HourSubcomponents[~Extended]

          ASCIISign ::: one of
            `+` `-`

          Hour :::
            `0` DecimalDigit
            `1` DecimalDigit
            `20`
            `21`
            `22`
            `23`

          HourSubcomponents[Extended] :::
            TimeSeparator[?Extended] MinuteSecond
            TimeSeparator[?Extended] MinuteSecond TimeSeparator[?Extended] MinuteSecond TemporalDecimalFraction?

          TimeSeparator[Extended] :::
            [+Extended] `:`
            [~Extended] [empty]

          MinuteSecond :::
            `0` DecimalDigit
            `1` DecimalDigit
            `2` DecimalDigit
            `3` DecimalDigit
            `4` DecimalDigit
            `5` DecimalDigit

          TemporalDecimalFraction :::
            TemporalDecimalSeparator DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit
            TemporalDecimalSeparator DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit DecimalDigit

          TemporalDecimalSeparator ::: one of
            `.` `,`
        </emu-grammar>

        <emu-clause id="sec-istimezoneoffsetstring" type="abstract operation">
          <h1>
            IsTimeZoneOffsetString (
              _offsetString_: a String,
            ): a Boolean
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>The return value indicates whether _offsetString_ conforms to the grammar given by |UTCOffset|.</dd>
          </dl>
          <emu-alg>
            1. Let _parseResult_ be ParseText(_offsetString_, |UTCOffset|).
            1. If _parseResult_ is a List of errors, return *false*.
            1. Return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-parsetimezoneoffsetstring" type="abstract operation">
          <h1>
            ParseTimeZoneOffsetString (
              _offsetString_: a String,
            ): an integer
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>The return value is the UTC offset, as a number of nanoseconds, that corresponds to the String _offsetString_.</dd>
          </dl>
          <emu-alg>
            1. Let _parseResult_ be ParseText(_offsetString_, |UTCOffset|).
            1. Assert: _parseResult_ is not a List of errors.
            1. Assert: _parseResult_ contains a |ASCIISign| Parse Node.
            1. Let _parsedSign_ be the source text matched by the |ASCIISign| Parse Node contained within _parseResult_.
            1. If _parsedSign_ is the single code point U+002D (HYPHEN-MINUS), then
              1. Let _sign_ be -1.
            1. Else,
              1. Let _sign_ be 1.
            1. NOTE: Applications of StringToNumber below do not lose precision, since each of the parsed values is guaranteed to be a sufficiently short string of decimal digits.
            1. Assert: _parseResult_ contains an |Hour| Parse Node.
            1. Let _parsedHours_ be the source text matched by the |Hour| Parse Node contained within _parseResult_.
            1. Let _hours_ be ℝ(StringToNumber(CodePointsToString(_parsedHours_))).
            1. If _parseResult_ does not contain a |MinuteSecond| Parse Node, then
              1. Let _minutes_ be 0.
            1. Else,
              1. Let _parsedMinutes_ be the source text matched by the first |MinuteSecond| Parse Node contained within _parseResult_.
              1. Let _minutes_ be ℝ(StringToNumber(CodePointsToString(_parsedMinutes_))).
            1. If _parseResult_ does not contain two |MinuteSecond| Parse Nodes, then
              1. Let _seconds_ be 0.
            1. Else,
              1. Let _parsedSeconds_ be the source text matched by the second |MinuteSecond| Parse Node contained within _parseResult_.
              1. Let _seconds_ be ℝ(StringToNumber(CodePointsToString(_parsedSeconds_))).
            1. If _parseResult_ does not contain a |TemporalDecimalFraction| Parse Node, then
              1. Let _nanoseconds_ be 0.
            1. Else,
              1. Let _parsedFraction_ be the source text matched by the |TemporalDecimalFraction| Parse Node contained within _parseResult_.
              1. Let _fraction_ be the string-concatenation of CodePointsToString(_parsedFraction_) and *"000000000"*.
              1. Let _nanosecondsString_ be the substring of _fraction_ from 1 to 10.
              1. Let _nanoseconds_ be ℝ(StringToNumber(_nanosecondsString_)).
            1. Return _sign_ × (((_hours_ × 60 + _minutes_) × 60 + _seconds_) × 10<sup>9</sup> + _nanoseconds_).
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-date-constructor" oldids="this-time-value,sec-thistimevalue,thistimevalue,this-Date-object">
      <h1>The Date Constructor</h1>
      <p>The Date constructor:</p>
      <ul>
        <li>is <dfn>%Date%</dfn>.</li>
        <li>is the initial value of the *"Date"* property of the global object.</li>
        <li>creates and initializes a new Date when called as a constructor.</li>
        <li>returns a String representing the current time (UTC) when called as a function rather than as a constructor.</li>
        <li>is a function whose behaviour differs based upon the number and types of its arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Date behaviour must include a `super` call to the Date constructor to create and initialize the subclass instance with a [[DateValue]] internal slot.</li>
      </ul>

      <emu-clause id="sec-date" oldids="sec-date-constructor-date,sec-date-value,sec-date-year-month-date-hours-minutes-seconds-ms">
        <h1>Date ( ..._values_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, then
            1. Let _now_ be the time value (UTC) identifying the current time.
            1. Return ToDateString(_now_).
          1. Let _numberOfArgs_ be the number of elements in _values_.
          1. If _numberOfArgs_ = 0, then
            1. Let _dv_ be the time value (UTC) identifying the current time.
          1. Else if _numberOfArgs_ = 1, then
            1. Let _value_ be _values_[0].
            1. If _value_ is an Object and _value_ has a [[DateValue]] internal slot, then
              1. Let _tv_ be _value_.[[DateValue]].
            1. Else,
              1. Let _v_ be ? ToPrimitive(_value_).
              1. If _v_ is a String, then
                1. Assert: The next step never returns an abrupt completion because _v_ is a String.
                1. Let _tv_ be the result of parsing _v_ as a date, in exactly the same manner as for the `parse` method (<emu-xref href="#sec-date.parse"></emu-xref>).
              1. Else,
                1. Let _tv_ be ? ToNumber(_v_).
            1. Let _dv_ be TimeClip(_tv_).
          1. Else,
            1. Assert: _numberOfArgs_ ≥ 2.
            1. Let _y_ be ? ToNumber(_values_[0]).
            1. Let _m_ be ? ToNumber(_values_[1]).
            1. If _numberOfArgs_ > 2, let _dt_ be ? ToNumber(_values_[2]); else let _dt_ be *1*<sub>𝔽</sub>.
            1. If _numberOfArgs_ > 3, let _h_ be ? ToNumber(_values_[3]); else let _h_ be *+0*<sub>𝔽</sub>.
            1. If _numberOfArgs_ > 4, let _min_ be ? ToNumber(_values_[4]); else let _min_ be *+0*<sub>𝔽</sub>.
            1. If _numberOfArgs_ > 5, let _s_ be ? ToNumber(_values_[5]); else let _s_ be *+0*<sub>𝔽</sub>.
            1. If _numberOfArgs_ > 6, let _milli_ be ? ToNumber(_values_[6]); else let _milli_ be *+0*<sub>𝔽</sub>.
            1. Let _yr_ be MakeFullYear(_y_).
            1. Let _finalDate_ be MakeDate(MakeDay(_yr_, _m_, _dt_), MakeTime(_h_, _min_, _s_, _milli_)).
            1. Let _dv_ be TimeClip(UTC(_finalDate_)).
          1. Let _O_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Date.prototype%"*, « [[DateValue]] »).
          1. Set _O_.[[DateValue]] to _dv_.
          1. Return _O_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-date-constructor">
      <h1>Properties of the Date Constructor</h1>
      <p>The Date constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has a *"length"* property whose value is *7*<sub>𝔽</sub>.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-date.now">
        <h1>Date.now ( )</h1>
        <p>This function returns the time value designating the UTC date and time of the occurrence of the call to it.</p>
      </emu-clause>

      <emu-clause id="sec-date.parse">
        <h1>Date.parse ( _string_ )</h1>
        <p>This function applies the ToString operator to its argument. If ToString results in an abrupt completion the Completion Record is immediately returned. Otherwise, this function interprets the resulting String as a date and time; it returns a Number, the UTC time value corresponding to the date and time. The String may be interpreted as a local time, a UTC time, or a time in some other time zone, depending on the contents of the String. The function first attempts to parse the String according to the format described in Date Time String Format (<emu-xref href="#sec-date-time-string-format"></emu-xref>), including expanded years. If the String does not conform to that format the function may fall back to any implementation-specific heuristics or implementation-specific date formats. Strings that are unrecognizable or contain out-of-bounds format element values shall cause this function to return *NaN*.</p>
        <p>If the String conforms to the <emu-xref href="#sec-date-time-string-format">Date Time String Format</emu-xref>, substitute values take the place of absent format elements. When the `MM` or `DD` elements are absent, *"01"* is used. When the `HH`, `mm`, or `ss` elements are absent, *"00"* is used. When the `sss` element is absent, *"000"* is used. When the UTC offset representation is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as a local time.</p>
        <p>If `x` is any Date whose milliseconds amount is zero within a particular implementation of ECMAScript, then all of the following expressions should produce the same numeric value in that implementation, if all the properties referenced have their initial values:</p>
        <pre><code class="javascript">
          x.valueOf()
          Date.parse(x.toString())
          Date.parse(x.toUTCString())
          Date.parse(x.toISOString())
        </code></pre>
        <p>However, the expression</p>
        <pre><code class="javascript">
          Date.parse(x.toLocaleString())
        </code></pre>
        <p>is not required to produce the same Number value as the preceding three expressions and, in general, the value produced by this function is implementation-defined when given any String value that does not conform to the Date Time String Format (<emu-xref href="#sec-date-time-string-format"></emu-xref>) and that could not be produced in that implementation by the `toString` or `toUTCString` method.</p>
      </emu-clause>

      <emu-clause id="sec-date.prototype">
        <h1>Date.prototype</h1>
        <p>The initial value of `Date.prototype` is the Date prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-date.utc">
        <h1>Date.UTC ( _year_ [ , _month_ [ , _date_ [ , _hours_ [ , _minutes_ [ , _seconds_ [ , _ms_ ] ] ] ] ] ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _y_ be ? ToNumber(_year_).
          1. If _month_ is present, let _m_ be ? ToNumber(_month_); else let _m_ be *+0*<sub>𝔽</sub>.
          1. If _date_ is present, let _dt_ be ? ToNumber(_date_); else let _dt_ be *1*<sub>𝔽</sub>.
          1. If _hours_ is present, let _h_ be ? ToNumber(_hours_); else let _h_ be *+0*<sub>𝔽</sub>.
          1. If _minutes_ is present, let _min_ be ? ToNumber(_minutes_); else let _min_ be *+0*<sub>𝔽</sub>.
          1. If _seconds_ is present, let _s_ be ? ToNumber(_seconds_); else let _s_ be *+0*<sub>𝔽</sub>.
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_); else let _milli_ be *+0*<sub>𝔽</sub>.
          1. Let _yr_ be MakeFullYear(_y_).
          1. Return TimeClip(MakeDate(MakeDay(_yr_, _m_, _dt_), MakeTime(_h_, _min_, _s_, _milli_))).
        </emu-alg>
        <p>The *"length"* property of this function is *7*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>This function differs from the Date constructor in two ways: it returns a time value as a Number, rather than creating a Date, and it interprets the arguments in UTC rather than as local time.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-date-prototype-object">
      <h1>Properties of the Date Prototype Object</h1>
      <p>The <dfn>Date prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Date.prototype%</dfn>.</li>
        <li>is itself an ordinary object.</li>
        <li>is not a Date instance and does not have a [[DateValue]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <p>Unless explicitly defined otherwise, the methods of the Date prototype object defined below are not generic and the *this* value passed to them must be an object that has a [[DateValue]] internal slot that has been initialized to a time value.</p>

      <emu-clause id="sec-date.prototype.constructor">
        <h1>Date.prototype.constructor</h1>
        <p>The initial value of `Date.prototype.constructor` is %Date%.</p>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getdate">
        <h1>Date.prototype.getDate ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return DateFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getday">
        <h1>Date.prototype.getDay ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return WeekDay(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getfullyear">
        <h1>Date.prototype.getFullYear ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return YearFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.gethours">
        <h1>Date.prototype.getHours ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return HourFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getmilliseconds">
        <h1>Date.prototype.getMilliseconds ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return msFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getminutes">
        <h1>Date.prototype.getMinutes ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return MinFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getmonth">
        <h1>Date.prototype.getMonth ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return MonthFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getseconds">
        <h1>Date.prototype.getSeconds ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return SecFromTime(LocalTime(_t_)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.gettime">
        <h1>Date.prototype.getTime ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Return _dateObject_.[[DateValue]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.gettimezoneoffset">
        <h1>Date.prototype.getTimezoneOffset ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return (_t_ - LocalTime(_t_)) / msPerMinute.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcdate">
        <h1>Date.prototype.getUTCDate ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return DateFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcday">
        <h1>Date.prototype.getUTCDay ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return WeekDay(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcfullyear">
        <h1>Date.prototype.getUTCFullYear ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return YearFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutchours">
        <h1>Date.prototype.getUTCHours ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return HourFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcmilliseconds">
        <h1>Date.prototype.getUTCMilliseconds ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return msFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcminutes">
        <h1>Date.prototype.getUTCMinutes ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return MinFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcmonth">
        <h1>Date.prototype.getUTCMonth ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return MonthFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.getutcseconds">
        <h1>Date.prototype.getUTCSeconds ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return SecFromTime(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setdate">
        <h1>Date.prototype.setDate ( _date_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _dt_ be ? ToNumber(_date_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. Let _newDate_ be MakeDate(MakeDay(YearFromTime(_t_), MonthFromTime(_t_), _dt_), TimeWithinDay(_t_)).
          1. Let _u_ be TimeClip(UTC(_newDate_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setfullyear">
        <h1>Date.prototype.setFullYear ( _year_ [ , _month_ [ , _date_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _y_ be ? ToNumber(_year_).
          1. If _t_ is *NaN*, set _t_ to *+0*<sub>𝔽</sub>; otherwise, set _t_ to LocalTime(_t_).
          1. If _month_ is not present, let _m_ be MonthFromTime(_t_); otherwise, let _m_ be ? ToNumber(_month_).
          1. If _date_ is not present, let _dt_ be DateFromTime(_t_); otherwise, let _dt_ be ? ToNumber(_date_).
          1. Let _newDate_ be MakeDate(MakeDay(_y_, _m_, _dt_), TimeWithinDay(_t_)).
          1. Let _u_ be TimeClip(UTC(_newDate_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
        <p>The *"length"* property of this method is *3*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _month_ is not present, this method behaves as if _month_ was present with the value `getMonth()`. If _date_ is not present, it behaves as if _date_ was present with the value `getDate()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.sethours">
        <h1>Date.prototype.setHours ( _hour_ [ , _min_ [ , _sec_ [ , _ms_ ] ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _h_ be ? ToNumber(_hour_).
          1. If _min_ is present, let _m_ be ? ToNumber(_min_).
          1. If _sec_ is present, let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. If _min_ is not present, let _m_ be MinFromTime(_t_).
          1. If _sec_ is not present, let _s_ be SecFromTime(_t_).
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(_h_, _m_, _s_, _milli_)).
          1. Let _u_ be TimeClip(UTC(_date_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
        <p>The *"length"* property of this method is *4*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _min_ is not present, this method behaves as if _min_ was present with the value `getMinutes()`. If _sec_ is not present, it behaves as if _sec_ was present with the value `getSeconds()`. If _ms_ is not present, it behaves as if _ms_ was present with the value `getMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setmilliseconds">
        <h1>Date.prototype.setMilliseconds ( _ms_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Set _ms_ to ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. Let _time_ be MakeTime(HourFromTime(_t_), MinFromTime(_t_), SecFromTime(_t_), _ms_).
          1. Let _u_ be TimeClip(UTC(MakeDate(Day(_t_), _time_))).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setminutes">
        <h1>Date.prototype.setMinutes ( _min_ [ , _sec_ [ , _ms_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _m_ be ? ToNumber(_min_).
          1. If _sec_ is present, let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. If _sec_ is not present, let _s_ be SecFromTime(_t_).
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(HourFromTime(_t_), _m_, _s_, _milli_)).
          1. Let _u_ be TimeClip(UTC(_date_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
        <p>The *"length"* property of this method is *3*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _sec_ is not present, this method behaves as if _sec_ was present with the value `getSeconds()`. If _ms_ is not present, this behaves as if _ms_ was present with the value `getMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setmonth">
        <h1>Date.prototype.setMonth ( _month_ [ , _date_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _m_ be ? ToNumber(_month_).
          1. If _date_ is present, let _dt_ be ? ToNumber(_date_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. If _date_ is not present, let _dt_ be DateFromTime(_t_).
          1. Let _newDate_ be MakeDate(MakeDay(YearFromTime(_t_), _m_, _dt_), TimeWithinDay(_t_)).
          1. Let _u_ be TimeClip(UTC(_newDate_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
        <p>The *"length"* property of this method is *2*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _date_ is not present, this method behaves as if _date_ was present with the value `getDate()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setseconds">
        <h1>Date.prototype.setSeconds ( _sec_ [ , _ms_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Set _t_ to LocalTime(_t_).
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(HourFromTime(_t_), MinFromTime(_t_), _s_, _milli_)).
          1. Let _u_ be TimeClip(UTC(_date_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
        <p>The *"length"* property of this method is *2*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _ms_ is not present, this method behaves as if _ms_ was present with the value `getMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.settime">
        <h1>Date.prototype.setTime ( _time_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be ? ToNumber(_time_).
          1. Let _v_ be TimeClip(_t_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcdate">
        <h1>Date.prototype.setUTCDate ( _date_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _dt_ be ? ToNumber(_date_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Let _newDate_ be MakeDate(MakeDay(YearFromTime(_t_), MonthFromTime(_t_), _dt_), TimeWithinDay(_t_)).
          1. Let _v_ be TimeClip(_newDate_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcfullyear">
        <h1>Date.prototype.setUTCFullYear ( _year_ [ , _month_ [ , _date_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, set _t_ to *+0*<sub>𝔽</sub>.
          1. Let _y_ be ? ToNumber(_year_).
          1. If _month_ is not present, let _m_ be MonthFromTime(_t_); otherwise, let _m_ be ? ToNumber(_month_).
          1. If _date_ is not present, let _dt_ be DateFromTime(_t_); otherwise, let _dt_ be ? ToNumber(_date_).
          1. Let _newDate_ be MakeDate(MakeDay(_y_, _m_, _dt_), TimeWithinDay(_t_)).
          1. Let _v_ be TimeClip(_newDate_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
        <p>The *"length"* property of this method is *3*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _month_ is not present, this method behaves as if _month_ was present with the value `getUTCMonth()`. If _date_ is not present, it behaves as if _date_ was present with the value `getUTCDate()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutchours">
        <h1>Date.prototype.setUTCHours ( _hour_ [ , _min_ [ , _sec_ [ , _ms_ ] ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _h_ be ? ToNumber(_hour_).
          1. If _min_ is present, let _m_ be ? ToNumber(_min_).
          1. If _sec_ is present, let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. If _min_ is not present, let _m_ be MinFromTime(_t_).
          1. If _sec_ is not present, let _s_ be SecFromTime(_t_).
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(_h_, _m_, _s_, _milli_)).
          1. Let _v_ be TimeClip(_date_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
        <p>The *"length"* property of this method is *4*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _min_ is not present, this method behaves as if _min_ was present with the value `getUTCMinutes()`. If _sec_ is not present, it behaves as if _sec_ was present with the value `getUTCSeconds()`. If _ms_ is not present, it behaves as if _ms_ was present with the value `getUTCMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcmilliseconds">
        <h1>Date.prototype.setUTCMilliseconds ( _ms_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Set _ms_ to ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. Let _time_ be MakeTime(HourFromTime(_t_), MinFromTime(_t_), SecFromTime(_t_), _ms_).
          1. Let _v_ be TimeClip(MakeDate(Day(_t_), _time_)).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcminutes">
        <h1>Date.prototype.setUTCMinutes ( _min_ [ , _sec_ [ , _ms_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _m_ be ? ToNumber(_min_).
          1. If _sec_ is present, let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. If _sec_ is not present, let _s_ be SecFromTime(_t_).
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(HourFromTime(_t_), _m_, _s_, _milli_)).
          1. Let _v_ be TimeClip(_date_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
        <p>The *"length"* property of this method is *3*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _sec_ is not present, this method behaves as if _sec_ was present with the value `getUTCSeconds()`. If _ms_ is not present, it behaves as if _ms_ was present with the value return by `getUTCMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcmonth">
        <h1>Date.prototype.setUTCMonth ( _month_ [ , _date_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _m_ be ? ToNumber(_month_).
          1. If _date_ is present, let _dt_ be ? ToNumber(_date_).
          1. If _t_ is *NaN*, return *NaN*.
          1. If _date_ is not present, let _dt_ be DateFromTime(_t_).
          1. Let _newDate_ be MakeDate(MakeDay(YearFromTime(_t_), _m_, _dt_), TimeWithinDay(_t_)).
          1. Let _v_ be TimeClip(_newDate_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
        <p>The *"length"* property of this method is *2*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _date_ is not present, this method behaves as if _date_ was present with the value `getUTCDate()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.setutcseconds">
        <h1>Date.prototype.setUTCSeconds ( _sec_ [ , _ms_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _s_ be ? ToNumber(_sec_).
          1. If _ms_ is present, let _milli_ be ? ToNumber(_ms_).
          1. If _t_ is *NaN*, return *NaN*.
          1. If _ms_ is not present, let _milli_ be msFromTime(_t_).
          1. Let _date_ be MakeDate(Day(_t_), MakeTime(HourFromTime(_t_), MinFromTime(_t_), _s_, _milli_)).
          1. Let _v_ be TimeClip(_date_).
          1. Set _dateObject_.[[DateValue]] to _v_.
          1. Return _v_.
        </emu-alg>
        <p>The *"length"* property of this method is *2*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>If _ms_ is not present, this method behaves as if _ms_ was present with the value `getUTCMilliseconds()`.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.todatestring">
        <h1>Date.prototype.toDateString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _tv_ be _dateObject_.[[DateValue]].
          1. If _tv_ is *NaN*, return *"Invalid Date"*.
          1. Let _t_ be LocalTime(_tv_).
          1. Return DateString(_t_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.toisostring">
        <h1>Date.prototype.toISOString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _tv_ be _dateObject_.[[DateValue]].
          1. If _tv_ is *NaN*, throw a *RangeError* exception.
          1. Assert: _tv_ is an integral Number.
          1. If _tv_ corresponds with a year that cannot be represented in the <emu-xref href="#sec-date-time-string-format">Date Time String Format</emu-xref>, throw a *RangeError* exception.
          1. Return a String representation of _tv_ in the <emu-xref href="#sec-date-time-string-format">Date Time String Format</emu-xref> on the UTC time scale, including all format elements and the UTC offset representation *"Z"*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.tojson">
        <h1>Date.prototype.toJSON ( _key_ )</h1>
        <p>This method provides a String representation of a Date for use by `JSON.stringify` (<emu-xref href="#sec-json.stringify"></emu-xref>).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _tv_ be ? ToPrimitive(_O_, ~number~).
          1. If _tv_ is a Number and _tv_ is not finite, return *null*.
          1. Return ? Invoke(_O_, *"toISOString"*).
        </emu-alg>
        <emu-note>
          <p>The argument is ignored.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a Date. Therefore, it can be transferred to other kinds of objects for use as a method. However, it does require that any such object have a `toISOString` method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-date.prototype.tolocaledatestring">
        <h1>Date.prototype.toLocaleDateString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method returns a String value. The contents of the String are implementation-defined, but are intended to represent the “date” portion of the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment's current locale.</p>
        <p>The meaning of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
      </emu-clause>

      <emu-clause id="sec-date.prototype.tolocalestring">
        <h1>Date.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method returns a String value. The contents of the String are implementation-defined, but are intended to represent the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment's current locale.</p>
        <p>The meaning of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
      </emu-clause>

      <emu-clause id="sec-date.prototype.tolocaletimestring">
        <h1>Date.prototype.toLocaleTimeString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method returns a String value. The contents of the String are implementation-defined, but are intended to represent the “time” portion of the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment's current locale.</p>
        <p>The meaning of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
      </emu-clause>

      <emu-clause id="sec-date.prototype.tostring">
        <h1>Date.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _tv_ be _dateObject_.[[DateValue]].
          1. Return ToDateString(_tv_).
        </emu-alg>
        <emu-note>
          <p>For any Date `d` such that `d.[[DateValue]]` is evenly divisible by 1000, the result of `Date.parse(d.toString())` = `d.valueOf()`. See <emu-xref href="#sec-date.parse"></emu-xref>.</p>
        </emu-note>
        <emu-note>
          <p>This method is not generic; it throws a *TypeError* exception if its *this* value is not a Date. Therefore, it cannot be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-timestring" type="abstract operation">
          <h1>
            TimeString (
              _tv_: a Number, but not *NaN*,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _hour_ be ToZeroPaddedDecimalString(ℝ(HourFromTime(_tv_)), 2).
            1. Let _minute_ be ToZeroPaddedDecimalString(ℝ(MinFromTime(_tv_)), 2).
            1. Let _second_ be ToZeroPaddedDecimalString(ℝ(SecFromTime(_tv_)), 2).
            1. Return the string-concatenation of _hour_, *":"*, _minute_, *":"*, _second_, the code unit 0x0020 (SPACE), and *"GMT"*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-datestring" type="abstract operation">
          <h1>
            DateString (
              _tv_: a Number, but not *NaN*,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _weekday_ be the Name of the entry in <emu-xref href="#sec-todatestring-day-names"></emu-xref> with the Number WeekDay(_tv_).
            1. Let _month_ be the Name of the entry in <emu-xref href="#sec-todatestring-month-names"></emu-xref> with the Number MonthFromTime(_tv_).
            1. Let _day_ be ToZeroPaddedDecimalString(ℝ(DateFromTime(_tv_)), 2).
            1. Let _yv_ be YearFromTime(_tv_).
            1. If _yv_ is *+0*<sub>𝔽</sub> or _yv_ > *+0*<sub>𝔽</sub>, let _yearSign_ be the empty String; otherwise, let _yearSign_ be *"-"*.
            1. Let _paddedYear_ be ToZeroPaddedDecimalString(abs(ℝ(_yv_)), 4).
            1. Return the string-concatenation of _weekday_, the code unit 0x0020 (SPACE), _month_, the code unit 0x0020 (SPACE), _day_, the code unit 0x0020 (SPACE), _yearSign_, and _paddedYear_.
          </emu-alg>
          <emu-table id="sec-todatestring-day-names" caption="Names of days of the week">
            <table>
              <thead>
                <tr>
                  <th>
                    Number
                  </th>
                  <th>
                    Name
                  </th>
                </tr>
              </thead>
              <tr>
                <td>
                  *+0*<sub>𝔽</sub>
                </td>
                <td>
                  *"Sun"*
                </td>
              </tr>
              <tr>
                <td>
                  *1*<sub>𝔽</sub>
                </td>
                <td>
                  *"Mon"*
                </td>
              </tr>
              <tr>
                <td>
                  *2*<sub>𝔽</sub>
                </td>
                <td>
                  *"Tue"*
                </td>
              </tr>
              <tr>
                <td>
                  *3*<sub>𝔽</sub>
                </td>
                <td>
                  *"Wed"*
                </td>
              </tr>
              <tr>
                <td>
                  *4*<sub>𝔽</sub>
                </td>
                <td>
                  *"Thu"*
                </td>
              </tr>
              <tr>
                <td>
                  *5*<sub>𝔽</sub>
                </td>
                <td>
                  *"Fri"*
                </td>
              </tr>
              <tr>
                <td>
                  *6*<sub>𝔽</sub>
                </td>
                <td>
                  *"Sat"*
                </td>
              </tr>
            </table>
          </emu-table>
          <emu-table id="sec-todatestring-month-names" caption="Names of months of the year">
            <table>
              <thead>
                <tr>
                  <th>
                    Number
                  </th>
                  <th>
                    Name
                  </th>
                </tr>
              </thead>
              <tr>
                <td>
                  *+0*<sub>𝔽</sub>
                </td>
                <td>
                  *"Jan"*
                </td>
              </tr>
              <tr>
                <td>
                  *1*<sub>𝔽</sub>
                </td>
                <td>
                  *"Feb"*
                </td>
              </tr>
              <tr>
                <td>
                  *2*<sub>𝔽</sub>
                </td>
                <td>
                  *"Mar"*
                </td>
              </tr>
              <tr>
                <td>
                  *3*<sub>𝔽</sub>
                </td>
                <td>
                  *"Apr"*
                </td>
              </tr>
              <tr>
                <td>
                  *4*<sub>𝔽</sub>
                </td>
                <td>
                  *"May"*
                </td>
              </tr>
              <tr>
                <td>
                  *5*<sub>𝔽</sub>
                </td>
                <td>
                  *"Jun"*
                </td>
              </tr>
              <tr>
                <td>
                  *6*<sub>𝔽</sub>
                </td>
                <td>
                  *"Jul"*
                </td>
              </tr>
              <tr>
                <td>
                  *7*<sub>𝔽</sub>
                </td>
                <td>
                  *"Aug"*
                </td>
              </tr>
              <tr>
                <td>
                  *8*<sub>𝔽</sub>
                </td>
                <td>
                  *"Sep"*
                </td>
              </tr>
              <tr>
                <td>
                  *9*<sub>𝔽</sub>
                </td>
                <td>
                  *"Oct"*
                </td>
              </tr>
              <tr>
                <td>
                  *10*<sub>𝔽</sub>
                </td>
                <td>
                  *"Nov"*
                </td>
              </tr>
              <tr>
                <td>
                  *11*<sub>𝔽</sub>
                </td>
                <td>
                  *"Dec"*
                </td>
              </tr>
            </table>
          </emu-table>
        </emu-clause>

        <emu-clause id="sec-timezoneestring" type="abstract operation">
          <h1>
            TimeZoneString (
              _tv_: an integral Number,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _systemTimeZoneIdentifier_ be SystemTimeZoneIdentifier().
            1. If IsTimeZoneOffsetString(_systemTimeZoneIdentifier_) is *true*, then
              1. Let _offsetNs_ be ParseTimeZoneOffsetString(_systemTimeZoneIdentifier_).
            1. Else,
              1. Let _offsetNs_ be GetNamedTimeZoneOffsetNanoseconds(_systemTimeZoneIdentifier_, ℤ(ℝ(_tv_) × 10<sup>6</sup>)).
            1. Let _offset_ be 𝔽(truncate(_offsetNs_ / 10<sup>6</sup>)).
            1. If _offset_ is *+0*<sub>𝔽</sub> or _offset_ > *+0*<sub>𝔽</sub>, then
              1. Let _offsetSign_ be *"+"*.
              1. Let _absOffset_ be _offset_.
            1. Else,
              1. Let _offsetSign_ be *"-"*.
              1. Let _absOffset_ be -_offset_.
            1. Let _offsetMin_ be ToZeroPaddedDecimalString(ℝ(MinFromTime(_absOffset_)), 2).
            1. Let _offsetHour_ be ToZeroPaddedDecimalString(ℝ(HourFromTime(_absOffset_)), 2).
            1. Let _tzName_ be an implementation-defined string that is either the empty String or the string-concatenation of the code unit 0x0020 (SPACE), the code unit 0x0028 (LEFT PARENTHESIS), an implementation-defined timezone name, and the code unit 0x0029 (RIGHT PARENTHESIS).
            1. Return the string-concatenation of _offsetSign_, _offsetHour_, _offsetMin_, and _tzName_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-todatestring" type="abstract operation">
          <h1>
            ToDateString (
              _tv_: an integral Number or *NaN*,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _tv_ is *NaN*, return *"Invalid Date"*.
            1. Let _t_ be LocalTime(_tv_).
            1. Return the string-concatenation of DateString(_t_), the code unit 0x0020 (SPACE), TimeString(_t_), and TimeZoneString(_tv_).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-date.prototype.totimestring">
        <h1>Date.prototype.toTimeString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _tv_ be _dateObject_.[[DateValue]].
          1. If _tv_ is *NaN*, return *"Invalid Date"*.
          1. Let _t_ be LocalTime(_tv_).
          1. Return the string-concatenation of TimeString(_t_) and TimeZoneString(_tv_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.toutcstring">
        <h1>Date.prototype.toUTCString ( )</h1>
        <p>This method returns a String value representing the instant in time corresponding to the *this* value. The format of the String is based upon "HTTP-date" from RFC 7231, generalized to support the full range of times supported by ECMAScript Dates.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _tv_ be _dateObject_.[[DateValue]].
          1. If _tv_ is *NaN*, return *"Invalid Date"*.
          1. Let _weekday_ be the Name of the entry in <emu-xref href="#sec-todatestring-day-names"></emu-xref> with the Number WeekDay(_tv_).
          1. Let _month_ be the Name of the entry in <emu-xref href="#sec-todatestring-month-names"></emu-xref> with the Number MonthFromTime(_tv_).
          1. Let _day_ be ToZeroPaddedDecimalString(ℝ(DateFromTime(_tv_)), 2).
          1. Let _yv_ be YearFromTime(_tv_).
          1. If _yv_ is *+0*<sub>𝔽</sub> or _yv_ > *+0*<sub>𝔽</sub>, let _yearSign_ be the empty String; otherwise, let _yearSign_ be *"-"*.
          1. Let _paddedYear_ be ToZeroPaddedDecimalString(abs(ℝ(_yv_)), 4).
          1. Return the string-concatenation of _weekday_, *","*, the code unit 0x0020 (SPACE), _day_, the code unit 0x0020 (SPACE), _month_, the code unit 0x0020 (SPACE), _yearSign_, _paddedYear_, the code unit 0x0020 (SPACE), and TimeString(_tv_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-date.prototype.valueof">
        <h1>Date.prototype.valueOf ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Return _dateObject_.[[DateValue]].
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-date.prototype-@@toprimitive" id="sec-date.prototype-%symbol.toprimitive%">
        <h1>Date.prototype [ %Symbol.toPrimitive% ] ( _hint_ )</h1>
        <p>This method is called by ECMAScript language operators to convert a Date to a primitive value. The allowed values for _hint_ are *"default"*, *"number"*, and *"string"*. Dates are unique among built-in ECMAScript object in that they treat *"default"* as being equivalent to *"string"*, All other built-in ECMAScript objects treat *"default"* as being equivalent to *"number"*.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If _hint_ is either *"string"* or *"default"*, then
            1. Let _tryFirst_ be ~string~.
          1. Else if _hint_ is *"number"*, then
            1. Let _tryFirst_ be ~number~.
          1. Else,
            1. Throw a *TypeError* exception.
          1. Return ? OrdinaryToPrimitive(_O_, _tryFirst_).
        </emu-alg>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        <p>The value of the *"name"* property of this method is *"[Symbol.toPrimitive]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-date-instances">
      <h1>Properties of Date Instances</h1>
      <p>Date instances are ordinary objects that inherit properties from the Date prototype object. Date instances also have a [[DateValue]] internal slot. The [[DateValue]] internal slot is the time value represented by this Date.</p>
    </emu-clause>
  </emu-clause>

<h1 id="sec-text-processing"></h1>
