# Abstract Operations
  <p>These operations are not a part of the ECMAScript language; they are defined here solely to aid the specification of the semantics of the ECMAScript language. Other, more specialized abstract operations are defined throughout this specification.</p>

  <emu-clause id="sec-type-conversion">
    <h1>Type Conversion</h1>
    <p>The ECMAScript language implicitly performs automatic type conversion as needed. To clarify the semantics of certain constructs it is useful to define a set of conversion abstract operations. The conversion abstract operations are polymorphic; they can accept a value of any ECMAScript language type. But no other specification types are used with these operations.</p>
    <p>The BigInt type has no implicit conversions in the ECMAScript language; programmers must call BigInt explicitly to convert values from other types.</p>

    <emu-clause id="sec-toprimitive" type="abstract operation" oldids="table-9">
      <h1>
        ToPrimitive (
          _input_: an ECMAScript language value,
          optional _preferredType_: ~string~ or ~number~,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts its _input_ argument to a non-Object type. If an object is capable of converting to more than one primitive type, it may use the optional hint _preferredType_ to favour that type.</dd>
      </dl>
      <emu-alg>
        1. If _input_ is an Object, then
          1. Let _exoticToPrim_ be ? GetMethod(_input_, %Symbol.toPrimitive%).
          1. If _exoticToPrim_ is not *undefined*, then
            1. If _preferredType_ is not present, then
              1. Let _hint_ be *"default"*.
            1. Else if _preferredType_ is ~string~, then
              1. Let _hint_ be *"string"*.
            1. Else,
              1. Assert: _preferredType_ is ~number~.
              1. Let _hint_ be *"number"*.
            1. Let _result_ be ? Call(_exoticToPrim_, _input_, « _hint_ »).
            1. If _result_ is not an Object, return _result_.
            1. Throw a *TypeError* exception.
          1. If _preferredType_ is not present, let _preferredType_ be ~number~.
          1. Return ? OrdinaryToPrimitive(_input_, _preferredType_).
        1. Return _input_.
      </emu-alg>
      <emu-note>
        <p>When ToPrimitive is called without a hint, then it generally behaves as if the hint were ~number~. However, objects may over-ride this behaviour by defining a %Symbol.toPrimitive% method. Of the objects defined in this specification only Dates (see <emu-xref href="#sec-date.prototype-%symbol.toprimitive%"></emu-xref>) and Symbol objects (see <emu-xref href="#sec-symbol.prototype-%symbol.toprimitive%"></emu-xref>) over-ride the default ToPrimitive behaviour. Dates treat the absence of a hint as if the hint were ~string~.</p>
      </emu-note>

      <emu-clause id="sec-ordinarytoprimitive" type="abstract operation">
        <h1>
          OrdinaryToPrimitive (
            _O_: an Object,
            _hint_: ~string~ or ~number~,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _hint_ is ~string~, then
            1. Let _methodNames_ be « *"toString"*, *"valueOf"* ».
          1. Else,
            1. Let _methodNames_ be « *"valueOf"*, *"toString"* ».
          1. For each element _name_ of _methodNames_, do
            1. Let _method_ be ? Get(_O_, _name_).
            1. If IsCallable(_method_) is *true*, then
              1. Let _result_ be ? Call(_method_, _O_).
              1. If _result_ is not an Object, return _result_.
          1. Throw a *TypeError* exception.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-toboolean" oldids="table-toboolean-conversions" type="abstract operation">
      <h1>
        ToBoolean (
          _argument_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a value of type Boolean.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is a Boolean, return _argument_.
        1. If _argument_ is one of *undefined*, *null*, *+0*<sub>𝔽</sub>, *-0*<sub>𝔽</sub>, *NaN*, *0*<sub>ℤ</sub>, or the empty String, return *false*.
        1. [id="step-to-boolean-web-compat-insertion-point"] NOTE: This step is replaced in section <emu-xref href="#sec-IsHTMLDDA-internal-slot-to-boolean"></emu-xref>.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tonumeric" type="abstract operation">
      <h1>
        ToNumeric (
          _value_: an ECMAScript language value,
        ): either a normal completion containing either a Number or a BigInt, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It returns _value_ converted to a Number or a BigInt.</dd>
      </dl>
      <emu-alg>
        1. Let _primValue_ be ? ToPrimitive(_value_, ~number~).
        1. If _primValue_ is a BigInt, return _primValue_.
        1. Return ? <emu-meta suppress-effects="user-code">ToNumber(_primValue_)</emu-meta>.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tonumber" oldids="table-tonumber-conversions" type="abstract operation">
      <h1>
        ToNumber (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a value of type Number.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is a Number, return _argument_.
        1. If _argument_ is either a Symbol or a BigInt, throw a *TypeError* exception.
        1. If _argument_ is *undefined*, return *NaN*.
        1. If _argument_ is either *null* or *false*, return *+0*<sub>𝔽</sub>.
        1. If _argument_ is *true*, return *1*<sub>𝔽</sub>.
        1. If _argument_ is a String, return StringToNumber(_argument_).
        1. Assert: _argument_ is an Object.
        1. Let _primValue_ be ? ToPrimitive(_argument_, ~number~).
        1. Assert: _primValue_ is not an Object.
        1. Return ? ToNumber(_primValue_).
      </emu-alg>

      <emu-clause id="sec-tonumber-applied-to-the-string-type">
        <h1>ToNumber Applied to the String Type</h1>
        <p>The abstract operation StringToNumber specifies how to convert a String value to a Number value, using the following grammar.</p>
        <h2>Syntax</h2>
        <emu-grammar type="definition">
          StringNumericLiteral :::
            StrWhiteSpace?
            StrWhiteSpace? StrNumericLiteral StrWhiteSpace?

          StrWhiteSpace :::
            StrWhiteSpaceChar StrWhiteSpace?

          StrWhiteSpaceChar :::
            WhiteSpace
            LineTerminator

          StrNumericLiteral :::
            StrDecimalLiteral
            NonDecimalIntegerLiteral[~Sep]

          StrDecimalLiteral :::
            StrUnsignedDecimalLiteral
            `+` StrUnsignedDecimalLiteral
            `-` StrUnsignedDecimalLiteral

          StrUnsignedDecimalLiteral :::
            `Infinity`
            DecimalDigits[~Sep] `.` DecimalDigits[~Sep]? ExponentPart[~Sep]?
            `.` DecimalDigits[~Sep] ExponentPart[~Sep]?
            DecimalDigits[~Sep] ExponentPart[~Sep]?
        </emu-grammar>
        <p>All grammar symbols not explicitly defined above have the definitions used in the Lexical Grammar for numeric literals (<emu-xref href="#sec-literals-numeric-literals"></emu-xref>)</p>
        <emu-note>
          <p>Some differences should be noted between the syntax of a |StringNumericLiteral| and a |NumericLiteral|:</p>
          <ul>
            <li>
              A |StringNumericLiteral| may include leading and/or trailing white space and/or line terminators.
            </li>
            <li>
              A |StringNumericLiteral| that is decimal may have any number of leading `0` digits.
            </li>
            <li>
              A |StringNumericLiteral| that is decimal may include a `+` or `-` to indicate its sign.
            </li>
            <li>
              A |StringNumericLiteral| that is empty or contains only white space is converted to *+0*<sub>𝔽</sub>.
            </li>
            <li>
              `Infinity` and `-Infinity` are recognized as a |StringNumericLiteral| but not as a |NumericLiteral|.
            </li>
            <li>
              A |StringNumericLiteral| cannot include a |BigIntLiteralSuffix|.
            </li>
            <li>
              A |StringNumericLiteral| cannot include a |NumericLiteralSeparator|.
            </li>
          </ul>
        </emu-note>

        <emu-clause id="sec-stringtonumber" type="abstract operation">
          <h1>
            StringToNumber (
              _str_: a String,
            ): a Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _literal_ be ParseText(_str_, |StringNumericLiteral|).
            1. If _literal_ is a List of errors, return *NaN*.
            1. Return the StringNumericValue of _literal_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-runtime-semantics-stringnumericvalue" type="sdo" oldids="sec-runtime-semantics-mv-s">
          <h1>Runtime Semantics: StringNumericValue ( ): a Number</h1>
          <dl class="header">
          </dl>
          <emu-note>
            <p>The conversion of a |StringNumericLiteral| to a Number value is similar overall to the determination of the NumericValue of a |NumericLiteral| (see <emu-xref href="#sec-literals-numeric-literals"></emu-xref>), but some of the details are different.</p>
          </emu-note>
          <emu-grammar>StringNumericLiteral ::: StrWhiteSpace?</emu-grammar>
          <emu-alg>
            1. Return *+0*<sub>𝔽</sub>.
          </emu-alg>
          <emu-grammar>StringNumericLiteral ::: StrWhiteSpace? StrNumericLiteral StrWhiteSpace?</emu-grammar>
          <emu-alg>
            1. Return the StringNumericValue of |StrNumericLiteral|.
          </emu-alg>
          <emu-grammar>StrNumericLiteral ::: NonDecimalIntegerLiteral</emu-grammar>
          <emu-alg>
            1. Return 𝔽(MV of |NonDecimalIntegerLiteral|).
          </emu-alg>
          <emu-grammar>StrDecimalLiteral ::: `-` StrUnsignedDecimalLiteral</emu-grammar>
          <emu-alg>
            1. Let _a_ be the StringNumericValue of |StrUnsignedDecimalLiteral|.
            1. If _a_ is *+0*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
            1. Return -_a_.
          </emu-alg>
          <emu-grammar>StrUnsignedDecimalLiteral ::: `Infinity`</emu-grammar>
          <emu-alg>
            1. Return *+∞*<sub>𝔽</sub>.
          </emu-alg>
          <emu-grammar>StrUnsignedDecimalLiteral ::: DecimalDigits `.` DecimalDigits? ExponentPart?</emu-grammar>
          <emu-alg>
            1. Let _a_ be the MV of the first |DecimalDigits|.
            1. If the second |DecimalDigits| is present, then
              1. Let _b_ be the MV of the second |DecimalDigits|.
              1. Let _n_ be the number of code points in the second |DecimalDigits|.
            1. Else,
              1. Let _b_ be 0.
              1. Let _n_ be 0.
            1. If |ExponentPart| is present, let _e_ be the MV of |ExponentPart|. Otherwise, let _e_ be 0.
            1. Return RoundMVResult((_a_ + (_b_ × 10<sup>-_n_</sup>)) × 10<sup>_e_</sup>).
          </emu-alg>
          <emu-grammar>StrUnsignedDecimalLiteral ::: `.` DecimalDigits ExponentPart?</emu-grammar>
          <emu-alg>
            1. Let _b_ be the MV of |DecimalDigits|.
            1. If |ExponentPart| is present, let _e_ be the MV of |ExponentPart|. Otherwise, let _e_ be 0.
            1. Let _n_ be the number of code points in |DecimalDigits|.
            1. Return RoundMVResult(_b_ × 10<sup>_e_ - _n_</sup>).
          </emu-alg>
          <emu-grammar>StrUnsignedDecimalLiteral ::: DecimalDigits ExponentPart?</emu-grammar>
          <emu-alg>
            1. Let _a_ be the MV of |DecimalDigits|.
            1. If |ExponentPart| is present, let _e_ be the MV of |ExponentPart|. Otherwise, let _e_ be 0.
            1. Return RoundMVResult(_a_ × 10<sup>_e_</sup>).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-roundmvresult" type="abstract operation">
          <h1>
            RoundMVResult (
              _n_: a mathematical value,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It converts _n_ to a Number in an implementation-defined manner. For the purposes of this abstract operation, a digit is significant if it is not zero or there is a non-zero digit to its left and there is a non-zero digit to its right. For the purposes of this abstract operation, "the mathematical value denoted by" a representation of a mathematical value is the inverse of "the decimal representation of" a mathematical value.</dd>
          </dl>
          <emu-alg>
            1. If the decimal representation of _n_ has 20 or fewer significant digits, return 𝔽(_n_).
            1. Let _option1_ be the mathematical value denoted by the result of replacing each significant digit in the decimal representation of _n_ after the 20th with a 0 digit.
            1. Let _option2_ be the mathematical value denoted by the result of replacing each significant digit in the decimal representation of _n_ after the 20th with a 0 digit and then incrementing it at the 20th position (with carrying as necessary).
            1. Let _chosen_ be an implementation-defined choice of either _option1_ or _option2_.
            1. Return 𝔽(_chosen_).
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-tointegerorinfinity" type="abstract operation" oldids="sec-tointeger">
      <h1>
        ToIntegerOrInfinity (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing either an integer, +&infin;, or -&infin;, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to an integer representing its Number value with fractional part truncated, or to +∞ or -∞ when that Number value is infinite.</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is one of *NaN*, *+0*<sub>𝔽</sub>, or *-0*<sub>𝔽</sub>, return 0.
        1. If _number_ is *+∞*<sub>𝔽</sub>, return +∞.
        1. If _number_ is *-∞*<sub>𝔽</sub>, return -∞.
        1. Return truncate(ℝ(_number_)).
      </emu-alg>
      <emu-note>
        𝔽(ToIntegerOrInfinity(_x_)) never returns *-0*<sub>𝔽</sub> for any value of _x_. The truncation of the fractional part is performed after converting _x_ to a mathematical value.
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-toint32" type="abstract operation">
      <h1>
        ToInt32 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>32</sup> integral Number values in the inclusive interval from 𝔽(-2<sup>31</sup>) to 𝔽(2<sup>31</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. Let _int32bit_ be _int_ modulo 2<sup>32</sup>.
        1. If _int32bit_ ≥ 2<sup>31</sup>, return 𝔽(_int32bit_ - 2<sup>32</sup>); otherwise return 𝔽(_int32bit_).
      </emu-alg>
      <emu-note>
        <p>Given the above definition of ToInt32:</p>
        <ul>
          <li>
            The ToInt32 abstract operation is idempotent: if applied to a result that it produced, the second application leaves that value unchanged.
          </li>
          <li>
            ToInt32(ToUint32(_x_)) is the same value as ToInt32(_x_) for all values of _x_. (It is to preserve this latter property that *+∞*<sub>𝔽</sub> and *-∞*<sub>𝔽</sub> are mapped to *+0*<sub>𝔽</sub>.)
          </li>
          <li>
            ToInt32 maps *-0*<sub>𝔽</sub> to *+0*<sub>𝔽</sub>.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-touint32" type="abstract operation">
      <h1>
        ToUint32 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>32</sup> integral Number values in the inclusive interval from *+0*<sub>𝔽</sub> to 𝔽(2<sup>32</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. Let _int32bit_ be _int_ modulo 2<sup>32</sup>.
        1. [id="step-touint32-return"] Return 𝔽(_int32bit_).
      </emu-alg>
      <emu-note>
        <p>Given the above definition of ToUint32:</p>
        <ul>
          <li>
            Step <emu-xref href="#step-touint32-return"></emu-xref> is the only difference between ToUint32 and ToInt32.
          </li>
          <li>
            The ToUint32 abstract operation is idempotent: if applied to a result that it produced, the second application leaves that value unchanged.
          </li>
          <li>
            ToUint32(ToInt32(_x_)) is the same value as ToUint32(_x_) for all values of _x_. (It is to preserve this latter property that *+∞*<sub>𝔽</sub> and *-∞*<sub>𝔽</sub> are mapped to *+0*<sub>𝔽</sub>.)
          </li>
          <li>
            ToUint32 maps *-0*<sub>𝔽</sub> to *+0*<sub>𝔽</sub>.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-toint16" type="abstract operation">
      <h1>
        ToInt16 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>16</sup> integral Number values in the inclusive interval from 𝔽(-2<sup>15</sup>) to 𝔽(2<sup>15</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. Let _int16bit_ be _int_ modulo 2<sup>16</sup>.
        1. If _int16bit_ ≥ 2<sup>15</sup>, return 𝔽(_int16bit_ - 2<sup>16</sup>); otherwise return 𝔽(_int16bit_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-touint16" type="abstract operation">
      <h1>
        ToUint16 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>16</sup> integral Number values in the inclusive interval from *+0*<sub>𝔽</sub> to 𝔽(2<sup>16</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. [id="step-touint16-mod"] Let _int16bit_ be _int_ modulo 2<sup>16</sup>.
        1. Return 𝔽(_int16bit_).
      </emu-alg>
      <emu-note>
        <p>Given the above definition of ToUint16:</p>
        <ul>
          <li>
            The substitution of 2<sup>16</sup> for 2<sup>32</sup> in step <emu-xref href="#step-touint16-mod"></emu-xref> is the only difference between ToUint32 and ToUint16.
          </li>
          <li>
            ToUint16 maps *-0*<sub>𝔽</sub> to *+0*<sub>𝔽</sub>.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-toint8" type="abstract operation">
      <h1>
        ToInt8 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>8</sup> integral Number values in the inclusive interval from *-128*<sub>𝔽</sub> to *127*<sub>𝔽</sub>.</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. Let _int8bit_ be _int_ modulo 2<sup>8</sup>.
        1. If _int8bit_ ≥ 2<sup>7</sup>, return 𝔽(_int8bit_ - 2<sup>8</sup>); otherwise return 𝔽(_int8bit_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-touint8" type="abstract operation">
      <h1>
        ToUint8 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>8</sup> integral Number values in the inclusive interval from *+0*<sub>𝔽</sub> to *255*<sub>𝔽</sub>.</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is not finite or _number_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Let _int_ be truncate(ℝ(_number_)).
        1. Let _int8bit_ be _int_ modulo 2<sup>8</sup>.
        1. Return 𝔽(_int8bit_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-touint8clamp" type="abstract operation">
      <h1>
        ToUint8Clamp (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It clamps and rounds _argument_ to one of 2<sup>8</sup> integral Number values in the inclusive interval from *+0*<sub>𝔽</sub> to *255*<sub>𝔽</sub>.</dd>
      </dl>
      <emu-alg>
        1. Let _number_ be ? ToNumber(_argument_).
        1. If _number_ is *NaN*, return *+0*<sub>𝔽</sub>.
        1. Let _mv_ be the extended mathematical value of _number_.
        1. Let _clamped_ be the result of clamping _mv_ between 0 and 255.
        1. Let _f_ be floor(_clamped_).
        1. If _clamped_ &lt; _f_ + 0.5, return 𝔽(_f_).
        1. If _clamped_ > _f_ + 0.5, return 𝔽(_f_ + 1).
        1. If _f_ is even, return 𝔽(_f_). Otherwise, return 𝔽(_f_ + 1).
      </emu-alg>
      <emu-note>
        <p>Unlike most other ECMAScript integer conversion operations, ToUint8Clamp rounds rather than truncates non-integral values. It also uses “round half to even” tie-breaking, which differs from the “round half up” tie-breaking of <emu-xref href="#sec-math.round">`Math.round`</emu-xref>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-tobigint" type="abstract operation">
      <h1>
        ToBigInt (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a BigInt or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a BigInt value, or throws if an implicit conversion from Number would be required.</dd>
      </dl>
      <emu-alg>
        1. Let _prim_ be ? ToPrimitive(_argument_, ~number~).
        1. Return the value that _prim_ corresponds to in <emu-xref href="#table-tobigint"></emu-xref>.
      </emu-alg>
      <emu-table id="table-tobigint" caption="BigInt Conversions">
        <table>
          <thead>
            <tr>
              <th>
                Argument Type
              </th>
              <th>
                Result
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              Undefined
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Null
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Boolean
            </td>
            <td>
              Return `1n` if _prim_ is *true* and `0n` if _prim_ is *false*.
            </td>
          </tr>
          <tr>
            <td>
              BigInt
            </td>
            <td>
              Return _prim_.
            </td>
          </tr>
          <tr>
            <td>
              Number
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              String
            </td>
            <td>
              <emu-alg>
                1. Let _n_ be StringToBigInt(_prim_).
                1. If _n_ is *undefined*, throw a *SyntaxError* exception.
                1. Return _n_.
              </emu-alg>
            </td>
          </tr>
          <tr>
            <td>
              Symbol
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-stringtobigint" type="abstract operation">
      <h1>
        StringToBigInt (
          _str_: a String,
        ): a BigInt or *undefined*
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _literal_ be ParseText(_str_, |StringIntegerLiteral|).
        1. If _literal_ is a List of errors, return *undefined*.
        1. Let _mv_ be the MV of _literal_.
        1. Assert: _mv_ is an integer.
        1. Return ℤ(_mv_).
      </emu-alg>

      <emu-clause id="sec-stringintegerliteral-grammar">
        <h1>StringIntegerLiteral Grammar</h1>
        <p>StringToBigInt uses the following grammar.</p>
        <h2>Syntax</h2>
        <emu-grammar type="definition">
          StringIntegerLiteral :::
            StrWhiteSpace?
            StrWhiteSpace? StrIntegerLiteral StrWhiteSpace?

          StrIntegerLiteral :::
            SignedInteger[~Sep]
            NonDecimalIntegerLiteral[~Sep]
        </emu-grammar>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-mv-for-stringintegerliteral">
        <h1>Runtime Semantics: MV</h1>
        <ul>
          <li>
            The MV of <emu-grammar>StringIntegerLiteral ::: StrWhiteSpace?</emu-grammar> is 0.
          </li>
          <li>
            The MV of <emu-grammar>StringIntegerLiteral ::: StrWhiteSpace? StrIntegerLiteral StrWhiteSpace?</emu-grammar> is the MV of |StrIntegerLiteral|.
          </li>
        </ul>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-tobigint64" type="abstract operation">
      <h1>
        ToBigInt64 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a BigInt or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>64</sup> BigInt values in the inclusive interval from ℤ(-2<sup>63</sup>) to ℤ(2<sup>63</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _n_ be ? ToBigInt(_argument_).
        1. Let _int64bit_ be ℝ(_n_) modulo 2<sup>64</sup>.
        1. If _int64bit_ ≥ 2<sup>63</sup>, return ℤ(_int64bit_ - 2<sup>64</sup>); otherwise return ℤ(_int64bit_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tobiguint64" type="abstract operation">
      <h1>
        ToBigUint64 (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a BigInt or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to one of 2<sup>64</sup> BigInt values in the inclusive interval from *0*<sub>ℤ</sub> to ℤ(2<sup>64</sup> - 1).</dd>
      </dl>
      <emu-alg>
        1. Let _n_ be ? ToBigInt(_argument_).
        1. Let _int64bit_ be ℝ(_n_) modulo 2<sup>64</sup>.
        1. Return ℤ(_int64bit_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tostring" oldids="table-tostring-conversions" type="abstract operation">
      <h1>
        ToString (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a String or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a value of type String.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is a String, return _argument_.
        1. If _argument_ is a Symbol, throw a *TypeError* exception.
        1. If _argument_ is *undefined*, return *"undefined"*.
        1. If _argument_ is *null*, return *"null"*.
        1. If _argument_ is *true*, return *"true"*.
        1. If _argument_ is *false*, return *"false"*.
        1. If _argument_ is a Number, return Number::toString(_argument_, 10).
        1. If _argument_ is a BigInt, return BigInt::toString(_argument_, 10).
        1. Assert: _argument_ is an Object.
        1. Let _primValue_ be ? ToPrimitive(_argument_, ~string~).
        1. Assert: _primValue_ is not an Object.
        1. Return ? ToString(_primValue_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-toobject" type="abstract operation">
      <h1>
        ToObject (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a value of type Object according to <emu-xref href="#table-toobject-conversions"></emu-xref>:</dd>
      </dl>
      <emu-table id="table-toobject-conversions" caption="ToObject Conversions" oldids="table-13">
        <table>
          <thead>
            <tr>
              <th>
                Argument Type
              </th>
              <th>
                Result
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              Undefined
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Null
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Boolean
            </td>
            <td>
              Return a new Boolean object whose [[BooleanData]] internal slot is set to _argument_. See <emu-xref href="#sec-boolean-objects"></emu-xref> for a description of Boolean objects.
            </td>
          </tr>
          <tr>
            <td>
              Number
            </td>
            <td>
              Return a new Number object whose [[NumberData]] internal slot is set to _argument_. See <emu-xref href="#sec-number-objects"></emu-xref> for a description of Number objects.
            </td>
          </tr>
          <tr>
            <td>
              String
            </td>
            <td>
              Return a new String object whose [[StringData]] internal slot is set to _argument_. See <emu-xref href="#sec-string-objects"></emu-xref> for a description of String objects.
            </td>
          </tr>
          <tr>
            <td>
              Symbol
            </td>
            <td>
              Return a new Symbol object whose [[SymbolData]] internal slot is set to _argument_. See <emu-xref href="#sec-symbol-objects"></emu-xref> for a description of Symbol objects.
            </td>
          </tr>
          <tr>
            <td>
              BigInt
            </td>
            <td>
              Return a new BigInt object whose [[BigIntData]] internal slot is set to _argument_. See <emu-xref href="#sec-bigint-objects"></emu-xref> for a description of BigInt objects.
            </td>
          </tr>
          <tr>
            <td>
              Object
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-topropertykey" type="abstract operation">
      <h1>
        ToPropertyKey (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a property key or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _argument_ to a value that can be used as a property key.</dd>
      </dl>
      <emu-alg>
        1. Let _key_ be ? ToPrimitive(_argument_, ~string~).
        1. If _key_ is a Symbol, then
          1. Return _key_.
        1. Return ! ToString(_key_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tolength" type="abstract operation">
      <h1>
        ToLength (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a non-negative integral Number or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It clamps and truncates _argument_ to a non-negative integral Number suitable for use as the length of an array-like object.</dd>
      </dl>
      <emu-alg>
        1. Let _len_ be ? ToIntegerOrInfinity(_argument_).
        1. If _len_ ≤ 0, return *+0*<sub>𝔽</sub>.
        1. Return 𝔽(min(_len_, 2<sup>53</sup> - 1)).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-canonicalnumericindexstring" type="abstract operation">
      <h1>
        CanonicalNumericIndexString (
          _argument_: a String,
        ): a Number or *undefined*
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>If _argument_ is either *"-0"* or exactly matches ToString(_n_) for some Number value _n_, it returns the respective Number value. Otherwise, it returns *undefined*.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is *"-0"*, return *-0*<sub>𝔽</sub>.
        1. Let _n_ be ! ToNumber(_argument_).
        1. If ! ToString(_n_) is _argument_, return _n_.
        1. Return *undefined*.
      </emu-alg>
      <p>A <dfn variants="canonical numeric strings">canonical numeric string</dfn> is any String value for which the CanonicalNumericIndexString abstract operation does not return *undefined*.</p>
    </emu-clause>

    <emu-clause id="sec-toindex" type="abstract operation">
      <h1>
        ToIndex (
          _value_: an ECMAScript language value,
        ): either a normal completion containing a non-negative integer or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _value_ to an integer and returns that integer if it is non-negative and corresponds with an integer index. Otherwise, it throws an exception.</dd>
      </dl>
      <emu-alg>
        1. Let _integer_ be ? ToIntegerOrInfinity(_value_).
        1. If _integer_ is not in the inclusive interval from 0 to 2<sup>53</sup> - 1, throw a *RangeError* exception.
        1. Return _integer_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-testing-and-comparison-operations">
    <h1>Testing and Comparison Operations</h1>

    <emu-clause id="sec-requireobjectcoercible" type="abstract operation">
      <h1>
        RequireObjectCoercible (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It throws an error if _argument_ is a value that cannot be converted to an Object using ToObject. It is defined by <emu-xref href="#table-requireobjectcoercible-results"></emu-xref>:</dd>
      </dl>
      <emu-table id="table-requireobjectcoercible-results" caption="RequireObjectCoercible Results" oldids="table-14">
        <table>
          <thead>
            <tr>
              <th>
                Argument Type
              </th>
              <th>
                Result
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              Undefined
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Null
            </td>
            <td>
              Throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              Boolean
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
          <tr>
            <td>
              Number
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
          <tr>
            <td>
              String
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
          <tr>
            <td>
              Symbol
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
          <tr>
            <td>
              BigInt
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
          <tr>
            <td>
              Object
            </td>
            <td>
              Return _argument_.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-isarray" type="abstract operation">
      <h1>
        IsArray (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _argument_ is not an Object, return *false*.
        1. If _argument_ is an Array exotic object, return *true*.
        1. If _argument_ is a Proxy exotic object, then
          1. Perform ? ValidateNonRevokedProxy(_argument_).
          1. Let _proxyTarget_ be _argument_.[[ProxyTarget]].
          1. Return ? IsArray(_proxyTarget_).
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iscallable" type="abstract operation">
      <h1>
        IsCallable (
          _argument_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines if _argument_ is a callable function with a [[Call]] internal method.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is not an Object, return *false*.
        1. If _argument_ has a [[Call]] internal method, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isconstructor" type="abstract operation">
      <h1>
        IsConstructor (
          _argument_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines if _argument_ is a function object with a [[Construct]] internal method.</dd>
      </dl>
      <emu-alg>
        1. If _argument_ is not an Object, return *false*.
        1. If _argument_ has a [[Construct]] internal method, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isextensible-o" type="abstract operation">
      <h1>
        IsExtensible (
          _O_: an Object,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine whether additional properties can be added to _O_.</dd>
      </dl>
      <emu-alg>
        1. Return ? <emu-meta effects="user-code">_O_.[[IsExtensible]]</emu-meta>().
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isregexp" type="abstract operation">
      <h1>
        IsRegExp (
          _argument_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _argument_ is not an Object, return *false*.
        1. Let _matcher_ be ? Get(_argument_, %Symbol.match%).
        1. If _matcher_ is not *undefined*, return ToBoolean(_matcher_).
        1. If _argument_ has a [[RegExpMatcher]] internal slot, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isstringwellformedunicode" type="abstract operation">
      <h1>
        Static Semantics: IsStringWellFormedUnicode (
          _string_: a String,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It interprets _string_ as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>, and determines whether it is a <a href="http://www.unicode.org/glossary/#well_formed_code_unit_sequence">well formed</a> UTF-16 sequence.</dd>
      </dl>
      <emu-alg>
        1. Let _len_ be the length of _string_.
        1. Let _k_ be 0.
        1. Repeat, while _k_ &lt; _len_,
          1. Let _cp_ be CodePointAt(_string_, _k_).
          1. If _cp_.[[IsUnpairedSurrogate]] is *true*, return *false*.
          1. Set _k_ to _k_ + _cp_.[[CodeUnitCount]].
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-sametype" type="abstract operation">
      <h1>
        SameType (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines whether or not the two arguments are the same type.</dd>
      </dl>
      <emu-alg>
        1. If _x_ is *undefined* and _y_ is *undefined*, return *true*.
        1. If _x_ is *null* and _y_ is *null*, return *true*.
        1. If _x_ is a Boolean and _y_ is a Boolean, return *true*.
        1. If _x_ is a Number and _y_ is a Number, return *true*.
        1. If _x_ is a BigInt and _y_ is a BigInt, return *true*.
        1. If _x_ is a Symbol and _y_ is a Symbol, return *true*.
        1. If _x_ is a String and _y_ is a String, return *true*.
        1. If _x_ is an Object and _y_ is an Object, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-samevalue" type="abstract operation">
      <h1>
        SameValue (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines whether or not the two arguments are the same value.</dd>
      </dl>
      <emu-alg>
        1. If SameType(_x_, _y_) is *false*, return *false*.
        1. If _x_ is a Number, then
          1. Return Number::sameValue(_x_, _y_).
        1. Return SameValueNonNumber(_x_, _y_).
      </emu-alg>
      <emu-note>
        <p>This algorithm differs from the IsStrictlyEqual Algorithm by treating all *NaN* values as equivalent and by differentiating *+0*<sub>𝔽</sub> from *-0*<sub>𝔽</sub>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-samevaluezero" type="abstract operation">
      <h1>
        SameValueZero (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines whether or not the two arguments are the same value (ignoring the difference between *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub>).</dd>
      </dl>
      <emu-alg>
        1. If SameType(_x_, _y_) is *false*, return *false*.
        1. If _x_ is a Number, then
          1. Return Number::sameValueZero(_x_, _y_).
        1. Return SameValueNonNumber(_x_, _y_).
      </emu-alg>
      <emu-note>
        <p>SameValueZero differs from SameValue only in that it treats *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub> as equivalent.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-samevaluenonnumber" type="abstract operation" oldids="sec-samevaluenonnumeric">
      <h1>
        SameValueNonNumber (
          _x_: an ECMAScript language value, but not a Number,
          _y_: an ECMAScript language value, but not a Number,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: SameType(_x_, _y_) is *true*.
        1. If _x_ is either *null* or *undefined*, return *true*.
        1. If _x_ is a BigInt, then
          1. Return BigInt::equal(_x_, _y_).
        1. If _x_ is a String, then
          1. If _x_ and _y_ have the same length and the same code units in the same positions, return *true*; otherwise, return *false*.
        1. If _x_ is a Boolean, then
          1. If _x_ and _y_ are both *true* or both *false*, return *true*; otherwise, return *false*.
        1. NOTE: All other ECMAScript language values are compared by identity.
        1. If _x_ is _y_, return *true*; otherwise, return *false*.
      </emu-alg>
      <emu-note>
        For expository purposes, some cases are handled separately within this algorithm even if it is unnecessary to do so.
      </emu-note>
      <emu-note>
        The specifics of what "_x_ is _y_" means are detailed in <emu-xref href="#sec-identity"></emu-xref>.
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-islessthan" type="abstract operation" oldids="sec-abstract-relational-comparison">
      <h1>
        IsLessThan (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
          _LeftFirst_: a Boolean,
        ): either a normal completion containing either a Boolean or *undefined*, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It provides the semantics for the comparison _x_ &lt; _y_, returning *true*, *false*, or *undefined* (which indicates that at least one operand is *NaN*). The _LeftFirst_ flag is used to control the order in which operations with potentially visible side-effects are performed upon _x_ and _y_. It is necessary because ECMAScript specifies left to right evaluation of expressions. If _LeftFirst_ is *true*, the _x_ parameter corresponds to an expression that occurs to the left of the _y_ parameter's corresponding expression. If _LeftFirst_ is *false*, the reverse is the case and operations must be performed upon _y_ before _x_.</dd>
      </dl>
      <emu-alg>
        1. If _LeftFirst_ is *true*, then
          1. Let _px_ be ? ToPrimitive(_x_, ~number~).
          1. Let _py_ be ? ToPrimitive(_y_, ~number~).
        1. Else,
          1. NOTE: The order of evaluation needs to be reversed to preserve left to right evaluation.
          1. Let _py_ be ? ToPrimitive(_y_, ~number~).
          1. Let _px_ be ? ToPrimitive(_x_, ~number~).
        1. [id="step-arc-string-check"] If _px_ is a String and _py_ is a String, then
          1. Let _lx_ be the length of _px_.
          1. Let _ly_ be the length of _py_.
          1. For each integer _i_ such that 0 ≤ _i_ &lt; min(_lx_, _ly_), in ascending order, do
            1. Let _cx_ be the numeric value of the code unit at index _i_ within _px_.
            1. Let _cy_ be the numeric value of the code unit at index _i_ within _py_.
            1. If _cx_ &lt; _cy_, return *true*.
            1. If _cx_ > _cy_, return *false*.
          1. If _lx_ &lt; _ly_, return *true*. Otherwise, return *false*.
        1. Else,
          1. If _px_ is a BigInt and _py_ is a String, then
            1. Let _ny_ be StringToBigInt(_py_).
            1. If _ny_ is *undefined*, return *undefined*.
            1. Return BigInt::lessThan(_px_, _ny_).
          1. If _px_ is a String and _py_ is a BigInt, then
            1. Let _nx_ be StringToBigInt(_px_).
            1. If _nx_ is *undefined*, return *undefined*.
            1. Return BigInt::lessThan(_nx_, _py_).
          1. NOTE: Because _px_ and _py_ are primitive values, evaluation order is not important.
          1. Let _nx_ be ? <emu-meta suppress-effects="user-code">ToNumeric(_px_)</emu-meta>.
          1. Let _ny_ be ? <emu-meta suppress-effects="user-code">ToNumeric(_py_)</emu-meta>.
          1. If SameType(_nx_, _ny_) is *true*, then
            1. If _nx_ is a Number, then
              1. Return Number::lessThan(_nx_, _ny_).
            1. Else,
              1. Assert: _nx_ is a BigInt.
              1. Return BigInt::lessThan(_nx_, _ny_).
          1. Assert: _nx_ is a BigInt and _ny_ is a Number, or _nx_ is a Number and _ny_ is a BigInt.
          1. If _nx_ or _ny_ is *NaN*, return *undefined*.
          1. If _nx_ is *-∞*<sub>𝔽</sub> or _ny_ is *+∞*<sub>𝔽</sub>, return *true*.
          1. If _nx_ is *+∞*<sub>𝔽</sub> or _ny_ is *-∞*<sub>𝔽</sub>, return *false*.
          1. If ℝ(_nx_) &lt; ℝ(_ny_), return *true*; otherwise return *false*.
      </emu-alg>
      <emu-note>
        <p>Step <emu-xref href="#step-arc-string-check"></emu-xref> differs from step <emu-xref href="#step-binary-op-string-check"></emu-xref> in the algorithm that handles the addition operator `+` (<emu-xref href="#sec-applystringornumericbinaryoperator"></emu-xref>) by using the logical-and operation instead of the logical-or operation.</p>
      </emu-note>
      <emu-note>
        <p>The comparison of Strings uses a simple lexicographic ordering on sequences of UTF-16 code unit values. There is no attempt to use the more complex, semantically oriented definitions of character or string equality and collating order defined in the Unicode specification. Therefore String values that are canonically equal according to the Unicode Standard but not in the same normalization form could test as unequal. Also note that lexicographic ordering by <em>code unit</em> differs from ordering by <em>code point</em> for Strings containing surrogate pairs.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-islooselyequal" type="abstract operation" oldids="sec-abstract-equality-comparison">
      <h1>
        IsLooselyEqual (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It provides the semantics for the `==` operator.</dd>
      </dl>
      <emu-alg>
        1. If SameType(_x_, _y_) is *true*, then
          1. Return IsStrictlyEqual(_x_, _y_).
        1. If _x_ is *null* and _y_ is *undefined*, return *true*.
        1. If _x_ is *undefined* and _y_ is *null*, return *true*.
        1. [id="step-abstract-equality-comparison-web-compat-insertion-point"] NOTE: This step is replaced in section <emu-xref href="#sec-IsHTMLDDA-internal-slot-aec"></emu-xref>.
        1. If _x_ is a Number and _y_ is a String, return ! IsLooselyEqual(_x_, ! ToNumber(_y_)).
        1. If _x_ is a String and _y_ is a Number, return ! IsLooselyEqual(! ToNumber(_x_), _y_).
        1. If _x_ is a BigInt and _y_ is a String, then
          1. Let _n_ be StringToBigInt(_y_).
          1. If _n_ is *undefined*, return *false*.
          1. Return ! IsLooselyEqual(_x_, _n_).
        1. If _x_ is a String and _y_ is a BigInt, return ! IsLooselyEqual(_y_, _x_).
        1. If _x_ is a Boolean, return ! IsLooselyEqual(! ToNumber(_x_), _y_).
        1. If _y_ is a Boolean, return ! IsLooselyEqual(_x_, ! ToNumber(_y_)).
        1. If _x_ is either a String, a Number, a BigInt, or a Symbol and _y_ is an Object, return ! IsLooselyEqual(_x_, ? ToPrimitive(_y_)).
        1. If _x_ is an Object and _y_ is either a String, a Number, a BigInt, or a Symbol, return ! IsLooselyEqual(? ToPrimitive(_x_), _y_).
        1. If _x_ is a BigInt and _y_ is a Number, or if _x_ is a Number and _y_ is a BigInt, then
          1. If _x_ is not finite or _y_ is not finite, return *false*.
          1. If ℝ(_x_) = ℝ(_y_), return *true*; otherwise return *false*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isstrictlyequal" type="abstract operation" oldids="sec-strict-equality-comparison">
      <h1>
        IsStrictlyEqual (
          _x_: an ECMAScript language value,
          _y_: an ECMAScript language value,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It provides the semantics for the `===` operator.</dd>
      </dl>
      <emu-alg>
        1. If SameType(_x_, _y_) is *false*, return *false*.
        1. If _x_ is a Number, then
          1. Return Number::equal(_x_, _y_).
        1. Return SameValueNonNumber(_x_, _y_).
      </emu-alg>
      <emu-note>
        <p>This algorithm differs from the SameValue Algorithm in its treatment of signed zeroes and NaNs.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-operations-on-objects">
    <h1>Operations on Objects</h1>

    <emu-clause id="sec-makebasicobject" type="abstract operation">
      <h1>
        MakeBasicObject (
          _internalSlotsList_: a List of internal slot names,
        ): an Object
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is the source of all ECMAScript objects that are created algorithmically, including both ordinary objects and exotic objects. It factors out common steps used in creating all objects, and centralizes object creation.</dd>
      </dl>

      <emu-alg>
        1. Set _internalSlotsList_ to the list-concatenation of _internalSlotsList_ and « [[PrivateElements]] ».
        1. Let _obj_ be a newly created object with an internal slot for each name in _internalSlotsList_.
        1. Set _obj_.[[PrivateElements]] to a new empty List.
        1. Set _obj_'s essential internal methods to the default ordinary object definitions specified in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>.
        1. Assert: If the caller will not be overriding both _obj_'s [[GetPrototypeOf]] and [[SetPrototypeOf]] essential internal methods, then _internalSlotsList_ contains [[Prototype]].
        1. Assert: If the caller will not be overriding all of _obj_'s [[SetPrototypeOf]], [[IsExtensible]], and [[PreventExtensions]] essential internal methods, then _internalSlotsList_ contains [[Extensible]].
        1. If _internalSlotsList_ contains [[Extensible]], set _obj_.[[Extensible]] to *true*.
        1. Return _obj_.
      </emu-alg>

      <emu-note>
        <p>Within this specification, exotic objects are created in abstract operations such as ArrayCreate and BoundFunctionCreate by first calling MakeBasicObject to obtain a basic, foundational object, and then overriding some or all of that object's internal methods. In order to encapsulate exotic object creation, the object's essential internal methods are never modified outside those operations.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-get-o-p" type="abstract operation">
      <h1>
        Get (
          _O_: an Object,
          _P_: a property key,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to retrieve the value of a specific property of an object.</dd>
      </dl>
      <emu-alg>
        1. Return ? <emu-meta effects="user-code">_O_.[[Get]]</emu-meta>(_P_, _O_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getv" type="abstract operation">
      <h1>
        GetV (
          _V_: an ECMAScript language value,
          _P_: a property key,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to retrieve the value of a specific property of an ECMAScript language value. If the value is not an object, the property lookup is performed using a wrapper object appropriate for the type of the value.</dd>
      </dl>
      <emu-alg>
        1. Let _O_ be ? ToObject(_V_).
        1. Return ? <emu-meta effects="user-code">_O_.[[Get]]</emu-meta>(_P_, _V_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-set-o-p-v-throw" type="abstract operation">
      <h1>
        Set (
          _O_: an Object,
          _P_: a property key,
          _V_: an ECMAScript language value,
          _Throw_: a Boolean,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to set the value of a specific property of an object. _V_ is the new value for the property.</dd>
      </dl>
      <emu-alg>
        1. Let _success_ be ? <emu-meta effects="user-code">_O_.[[Set]]</emu-meta>(_P_, _V_, _O_).
        1. If _success_ is *false* and _Throw_ is *true*, throw a *TypeError* exception.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-createdataproperty" type="abstract operation">
      <h1>
        CreateDataProperty (
          _O_: an Object,
          _P_: a property key,
          _V_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to create a new own property of an object.</dd>
      </dl>
      <emu-alg>
        1. Let _newDesc_ be the PropertyDescriptor { [[Value]]: _V_, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: *true* }.
        1. Return ? <emu-meta effects="user-code">_O_.[[DefineOwnProperty]]</emu-meta>(_P_, _newDesc_).
      </emu-alg>
      <emu-note>
        <p>This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator. Normally, the property will not already exist. If it does exist and is not configurable or if _O_ is not extensible, [[DefineOwnProperty]] will return *false*.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-createdatapropertyorthrow" type="abstract operation">
      <h1>
        CreateDataPropertyOrThrow (
          _O_: an Object,
          _P_: a property key,
          _V_: an ECMAScript language value,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to create a new own property of an object. It throws a *TypeError* exception if the requested property update cannot be performed.</dd>
      </dl>
      <emu-alg>
        1. Let _success_ be ? CreateDataProperty(_O_, _P_, _V_).
        1. If _success_ is *false*, throw a *TypeError* exception.
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p>This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator. Normally, the property will not already exist. If it does exist and is not configurable or if _O_ is not extensible, [[DefineOwnProperty]] will return *false* causing this operation to throw a *TypeError* exception.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-createnonenumerabledatapropertyorthrow" type="abstract operation">
      <h1>
        CreateNonEnumerableDataPropertyOrThrow (
          _O_: an Object,
          _P_: a property key,
          _V_: an ECMAScript language value,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to create a new non-enumerable own property of an ordinary object.</dd>
      </dl>
      <emu-alg>
        1. Assert: _O_ is an ordinary, extensible object with no non-configurable properties.
        1. Let _newDesc_ be the PropertyDescriptor { [[Value]]: _V_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.
        1. Perform ! DefinePropertyOrThrow(_O_, _P_, _newDesc_).
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p>This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator except it is not enumerable. Normally, the property will not already exist. If it does exist, DefinePropertyOrThrow is guaranteed to complete normally.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-definepropertyorthrow" type="abstract operation">
      <h1>
        DefinePropertyOrThrow (
          _O_: an Object,
          _P_: a property key,
          _desc_: a Property Descriptor,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to call the [[DefineOwnProperty]] internal method of an object in a manner that will throw a *TypeError* exception if the requested property update cannot be performed.</dd>
      </dl>
      <emu-alg>
        1. Let _success_ be ? <emu-meta effects="user-code">_O_.[[DefineOwnProperty]]</emu-meta>(_P_, _desc_).
        1. If _success_ is *false*, throw a *TypeError* exception.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-deletepropertyorthrow" type="abstract operation">
      <h1>
        DeletePropertyOrThrow (
          _O_: an Object,
          _P_: a property key,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to remove a specific own property of an object. It throws an exception if the property is not configurable.</dd>
      </dl>
      <emu-alg>
        1. Let _success_ be ? <emu-meta effects="user-code">_O_.[[Delete]]</emu-meta>(_P_).
        1. If _success_ is *false*, throw a *TypeError* exception.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getmethod" type="abstract operation">
      <h1>
        GetMethod (
          _V_: an ECMAScript language value,
          _P_: a property key,
        ): either a normal completion containing either a function object or *undefined*, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to get the value of a specific property of an ECMAScript language value when the value of the property is expected to be a function.</dd>
      </dl>
      <emu-alg>
        1. Let _func_ be ? GetV(_V_, _P_).
        1. If _func_ is either *undefined* or *null*, return *undefined*.
        1. If IsCallable(_func_) is *false*, throw a *TypeError* exception.
        1. Return _func_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-hasproperty" type="abstract operation">
      <h1>
        HasProperty (
          _O_: an Object,
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine whether an object has a property with the specified property key. The property may be either own or inherited.</dd>
      </dl>
      <emu-alg>
        1. Return ? <emu-meta effects="user-code">_O_.[[HasProperty]]</emu-meta>(_P_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-hasownproperty" type="abstract operation">
      <h1>
        HasOwnProperty (
          _O_: an Object,
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine whether an object has an own property with the specified property key.</dd>
      </dl>
      <emu-alg>
        1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. If _desc_ is *undefined*, return *false*.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-call" type="abstract operation">
      <h1>
        Call (
          _F_: an ECMAScript language value,
          _V_: an ECMAScript language value,
          optional _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to call the [[Call]] internal method of a function object. _F_ is the function object, _V_ is an ECMAScript language value that is the *this* value of the [[Call]], and _argumentsList_ is the value passed to the corresponding argument of the internal method. If _argumentsList_ is not present, a new empty List is used as its value.</dd>
      </dl>
      <emu-alg>
        1. If _argumentsList_ is not present, set _argumentsList_ to a new empty List.
        1. If IsCallable(_F_) is *false*, throw a *TypeError* exception.
        1. Return ? <emu-meta effects="user-code">_F_.[[Call]]</emu-meta>(_V_, _argumentsList_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-construct" type="abstract operation">
      <h1>
        Construct (
          _F_: a constructor,
          optional _argumentsList_: a List of ECMAScript language values,
          optional _newTarget_: a constructor,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to call the [[Construct]] internal method of a function object. _argumentsList_ and _newTarget_ are the values to be passed as the corresponding arguments of the internal method. If _argumentsList_ is not present, a new empty List is used as its value. If _newTarget_ is not present, _F_ is used as its value.</dd>
      </dl>
      <emu-alg>
        1. If _newTarget_ is not present, set _newTarget_ to _F_.
        1. If _argumentsList_ is not present, set _argumentsList_ to a new empty List.
        1. Return ? <emu-meta effects="user-code">_F_.[[Construct]]</emu-meta>(_argumentsList_, _newTarget_).
      </emu-alg>
      <emu-note>
        <p>If _newTarget_ is not present, this operation is equivalent to: `new F(...argumentsList)`</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-setintegritylevel" type="abstract operation">
      <h1>
        SetIntegrityLevel (
          _O_: an Object,
          _level_: ~sealed~ or ~frozen~,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to fix the set of own properties of an object.</dd>
      </dl>
      <emu-alg>
        1. Let _status_ be ? _O_.[[PreventExtensions]]().
        1. If _status_ is *false*, return *false*.
        1. Let _keys_ be ? _O_.[[OwnPropertyKeys]]().
        1. If _level_ is ~sealed~, then
          1. For each element _k_ of _keys_, do
            1. Perform ? DefinePropertyOrThrow(_O_, _k_, PropertyDescriptor { [[Configurable]]: *false* }).
        1. Else,
          1. Assert: _level_ is ~frozen~.
          1. For each element _k_ of _keys_, do
            1. Let _currentDesc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_k_).
            1. If _currentDesc_ is not *undefined*, then
              1. If IsAccessorDescriptor(_currentDesc_) is *true*, then
                1. Let _desc_ be the PropertyDescriptor { [[Configurable]]: *false* }.
              1. Else,
                1. Let _desc_ be the PropertyDescriptor { [[Configurable]]: *false*, [[Writable]]: *false* }.
              1. Perform ? DefinePropertyOrThrow(_O_, _k_, _desc_).
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-testintegritylevel" type="abstract operation">
      <h1>
        TestIntegrityLevel (
          _O_: an Object,
          _level_: ~sealed~ or ~frozen~,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine if the set of own properties of an object are fixed.</dd>
      </dl>
      <emu-alg>
        1. Let _extensible_ be ? IsExtensible(_O_).
        1. If _extensible_ is *true*, return *false*.
        1. NOTE: If the object is extensible, none of its properties are examined.
        1. Let _keys_ be ? _O_.[[OwnPropertyKeys]]().
        1. For each element _k_ of _keys_, do
          1. Let _currentDesc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_k_).
          1. If _currentDesc_ is not *undefined*, then
            1. If _currentDesc_.[[Configurable]] is *true*, return *false*.
            1. If _level_ is ~frozen~ and IsDataDescriptor(_currentDesc_) is *true*, then
              1. If _currentDesc_.[[Writable]] is *true*, return *false*.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-createarrayfromlist" type="abstract operation">
      <h1>
        CreateArrayFromList (
          _elements_: a List of ECMAScript language values,
        ): an Array
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to create an Array whose elements are provided by _elements_.</dd>
      </dl>
      <emu-alg>
        1. Let _array_ be ! ArrayCreate(0).
        1. Let _n_ be 0.
        1. For each element _e_ of _elements_, do
          1. Perform ! CreateDataPropertyOrThrow(_array_, ! ToString(𝔽(_n_)), _e_).
          1. Set _n_ to _n_ + 1.
        1. Return _array_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-lengthofarraylike" type="abstract operation">
      <h1>
        LengthOfArrayLike (
          _obj_: an Object,
        ): either a normal completion containing a non-negative integer or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It returns the value of the *"length"* property of an array-like object.</dd>
      </dl>
      <emu-alg>
        1. Return ℝ(? ToLength(? Get(_obj_, *"length"*))).
      </emu-alg>
      <p>An <dfn variants="array-like objects">array-like object</dfn> is any object for which this operation returns a normal completion.</p>
      <emu-note>
        Typically, an array-like object would also have some properties with integer index names. However, that is not a requirement of this definition.
      </emu-note>
      <emu-note>
        Arrays and String objects are examples of array-like objects.
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-createlistfromarraylike" type="abstract operation">
      <h1>
        CreateListFromArrayLike (
          _obj_: an ECMAScript language value,
          optional _validElementTypes_: ~all~ or ~property-key~,
        ): either a normal completion containing a List of ECMAScript language values or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to create a List value whose elements are provided by the indexed properties of _obj_. _validElementTypes_ indicates the types of values that are allowed as elements.</dd>
      </dl>
      <emu-alg>
        1. If _validElementTypes_ is not present, set _validElementTypes_ to ~all~.
        1. If _obj_ is not an Object, throw a *TypeError* exception.
        1. Let _len_ be ? LengthOfArrayLike(_obj_).
        1. Let _list_ be a new empty List.
        1. Let _index_ be 0.
        1. Repeat, while _index_ &lt; _len_,
          1. Let _indexName_ be ! ToString(𝔽(_index_)).
          1. Let _next_ be ? Get(_obj_, _indexName_).
          1. If _validElementTypes_ is ~property-key~ and _next_ is not a property key, throw a *TypeError* exception.
          1. Append _next_ to _list_.
          1. Set _index_ to _index_ + 1.
        1. Return _list_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-invoke" type="abstract operation">
      <h1>
        Invoke (
          _V_: an ECMAScript language value,
          _P_: a property key,
          optional _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to call a method property of an ECMAScript language value. _V_ serves as both the lookup point for the property and the *this* value of the call. _argumentsList_ is the list of arguments values passed to the method. If _argumentsList_ is not present, a new empty List is used as its value.</dd>
      </dl>

      <emu-alg>
        1. If _argumentsList_ is not present, set _argumentsList_ to a new empty List.
        1. Let _func_ be ? GetV(_V_, _P_).
        1. Return ? Call(_func_, _V_, _argumentsList_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-ordinaryhasinstance" type="abstract operation">
      <h1>
        OrdinaryHasInstance (
          _C_: an ECMAScript language value,
          _O_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It implements the default algorithm for determining if _O_ inherits from the instance object inheritance path provided by _C_.</dd>
      </dl>
      <emu-alg>
        1. If IsCallable(_C_) is *false*, return *false*.
        1. If _C_ has a [[BoundTargetFunction]] internal slot, then
          1. Let _BC_ be _C_.[[BoundTargetFunction]].
          1. Return ? InstanceofOperator(_O_, _BC_).
        1. If _O_ is not an Object, return *false*.
        1. Let _P_ be ? Get(_C_, *"prototype"*).
        1. If _P_ is not an Object, throw a *TypeError* exception.
        1. Repeat,
          1. Set _O_ to ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]</emu-meta>().
          1. If _O_ is *null*, return *false*.
          1. If SameValue(_P_, _O_) is *true*, return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-speciesconstructor" type="abstract operation">
      <h1>
        SpeciesConstructor (
          _O_: an Object,
          _defaultConstructor_: a constructor,
        ): either a normal completion containing a constructor or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to retrieve the constructor that should be used to create new objects that are derived from _O_. _defaultConstructor_ is the constructor to use if a constructor %Symbol.species% property cannot be found starting from _O_.</dd>
      </dl>
      <emu-alg>
        1. Let _C_ be ? Get(_O_, *"constructor"*).
        1. If _C_ is *undefined*, return _defaultConstructor_.
        1. If _C_ is not an Object, throw a *TypeError* exception.
        1. Let _S_ be ? Get(_C_, %Symbol.species%).
        1. If _S_ is either *undefined* or *null*, return _defaultConstructor_.
        1. If IsConstructor(_S_) is *true*, return _S_.
        1. Throw a *TypeError* exception.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-enumerableownproperties" type="abstract operation" oldids="sec-enumerableownpropertynames">
      <h1>
        EnumerableOwnProperties (
          _O_: an Object,
          _kind_: ~key~, ~value~, or ~key+value~,
        ): either a normal completion containing a List of ECMAScript language values or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _ownKeys_ be ? <emu-meta effects="user-code">_O_.[[OwnPropertyKeys]]</emu-meta>().
        1. Let _results_ be a new empty List.
        1. For each element _key_ of _ownKeys_, do
          1. If _key_ is a String, then
            1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_key_).
            1. If _desc_ is not *undefined* and _desc_.[[Enumerable]] is *true*, then
              1. If _kind_ is ~key~, then
                1. Append _key_ to _results_.
              1. Else,
                1. Let _value_ be ? Get(_O_, _key_).
                1. If _kind_ is ~value~, then
                  1. Append _value_ to _results_.
                1. Else,
                  1. Assert: _kind_ is ~key+value~.
                  1. Let _entry_ be CreateArrayFromList(« _key_, _value_ »).
                  1. Append _entry_ to _results_.
        1. Return _results_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getfunctionrealm" type="abstract operation">
      <h1>
        GetFunctionRealm (
          _obj_: a function object,
        ): either a normal completion containing a Realm Record or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _obj_ has a [[Realm]] internal slot, then
          1. Return _obj_.[[Realm]].
        1. If _obj_ is a bound function exotic object, then
          1. Let _boundTargetFunction_ be _obj_.[[BoundTargetFunction]].
          1. Return ? GetFunctionRealm(_boundTargetFunction_).
        1. If _obj_ is a Proxy exotic object, then
          1. Perform ? ValidateNonRevokedProxy(_obj_).
          1. Let _proxyTarget_ be _obj_.[[ProxyTarget]].
          1. Assert: _proxyTarget_ is a function object.
          1. Return ? GetFunctionRealm(_proxyTarget_).
        1. [id="step-getfunctionrealm-default-return"] Return the current Realm Record.
      </emu-alg>
      <emu-note>
        <p>Step <emu-xref href="#step-getfunctionrealm-default-return"></emu-xref> will only be reached if _obj_ is a non-standard function exotic object that does not have a [[Realm]] internal slot.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-copydataproperties" type="abstract operation">
      <h1>
        CopyDataProperties (
          _target_: an Object,
          _source_: an ECMAScript language value,
          _excludedItems_: a List of property keys,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _source_ is either *undefined* or *null*, return ~unused~.
        1. Let _from_ be ! ToObject(_source_).
        1. Let _keys_ be ? <emu-meta effects="user-code">_from_.[[OwnPropertyKeys]]</emu-meta>().
        1. For each element _nextKey_ of _keys_, do
          1. Let _excluded_ be *false*.
          1. For each element _e_ of _excludedItems_, do
            1. If SameValue(_e_, _nextKey_) is *true*, then
              1. Set _excluded_ to *true*.
          1. If _excluded_ is *false*, then
            1. Let _desc_ be ? <emu-meta effects="user-code">_from_.[[GetOwnProperty]]</emu-meta>(_nextKey_).
            1. If _desc_ is not *undefined* and _desc_.[[Enumerable]] is *true*, then
              1. Let _propValue_ be ? Get(_from_, _nextKey_).
              1. Perform ! CreateDataPropertyOrThrow(_target_, _nextKey_, _propValue_).
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p>The target passed in here is always a newly created object which is not directly accessible in case of an error being thrown.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-privateelementfind" type="abstract operation">
      <h1>
        PrivateElementFind (
          _O_: an Object,
          _P_: a Private Name,
        ): a PrivateElement or ~empty~
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _O_.[[PrivateElements]] contains a PrivateElement _pe_ such that _pe_.[[Key]] is _P_, then
          1. Return _pe_.
        1. Return ~empty~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-privatefieldadd" type="abstract operation">
      <h1>
        PrivateFieldAdd (
          _O_: an Object,
          _P_: a Private Name,
          _value_: an ECMAScript language value,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If the host is a web browser, then
          1. Perform ? HostEnsureCanAddPrivateElement(_O_).
        1. Let _entry_ be PrivateElementFind(_O_, _P_).
        1. If _entry_ is not ~empty~, throw a *TypeError* exception.
        1. Append PrivateElement { [[Key]]: _P_, [[Kind]]: ~field~, [[Value]]: _value_ } to _O_.[[PrivateElements]].
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-privatemethodoraccessoradd" type="abstract operation">
      <h1>
        PrivateMethodOrAccessorAdd (
          _O_: an Object,
          _method_: a PrivateElement,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: _method_.[[Kind]] is either ~method~ or ~accessor~.
        1. If the host is a web browser, then
          1. Perform ? HostEnsureCanAddPrivateElement(_O_).
        1. Let _entry_ be PrivateElementFind(_O_, _method_.[[Key]]).
        1. If _entry_ is not ~empty~, throw a *TypeError* exception.
        1. Append _method_ to _O_.[[PrivateElements]].
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p>The values for private methods and accessors are shared across instances. This operation does not create a new copy of the method or accessor.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-hostensurecanaddprivateelement" type="host-defined abstract operation">
      <h1>
        HostEnsureCanAddPrivateElement (
          _O_: an Object,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It allows host environments to prevent the addition of private elements to particular host-defined exotic objects.</dd>
      </dl>
      <p>An implementation of HostEnsureCanAddPrivateElement must conform to the following requirements:</p>
      <ul>
        <li>If _O_ is not a host-defined exotic object, this abstract operation must return NormalCompletion(~unused~) and perform no other steps.</li>
        <li>Any two calls of this abstract operation with the same argument must return the same kind of Completion Record.</li>
      </ul>
      <p>The default implementation of HostEnsureCanAddPrivateElement is to return NormalCompletion(~unused~).</p>
      <p>This abstract operation is only invoked by ECMAScript hosts that are web browsers.</p>
    </emu-clause>

    <emu-clause id="sec-privateget" type="abstract operation">
      <h1>
        PrivateGet (
          _O_: an Object,
          _P_: a Private Name,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _entry_ be PrivateElementFind(_O_, _P_).
        1. If _entry_ is ~empty~, throw a *TypeError* exception.
        1. If _entry_.[[Kind]] is either ~field~ or ~method~, then
          1. Return _entry_.[[Value]].
        1. Assert: _entry_.[[Kind]] is ~accessor~.
        1. If _entry_.[[Get]] is *undefined*, throw a *TypeError* exception.
        1. Let _getter_ be _entry_.[[Get]].
        1. Return ? Call(_getter_, _O_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-privateset" type="abstract operation">
      <h1>
        PrivateSet (
          _O_: an Object,
          _P_: a Private Name,
          _value_: an ECMAScript language value,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _entry_ be PrivateElementFind(_O_, _P_).
        1. If _entry_ is ~empty~, throw a *TypeError* exception.
        1. If _entry_.[[Kind]] is ~field~, then
          1. Set _entry_.[[Value]] to _value_.
        1. Else if _entry_.[[Kind]] is ~method~, then
          1. Throw a *TypeError* exception.
        1. Else,
          1. Assert: _entry_.[[Kind]] is ~accessor~.
          1. If _entry_.[[Set]] is *undefined*, throw a *TypeError* exception.
          1. Let _setter_ be _entry_.[[Set]].
          1. Perform ? Call(_setter_, _O_, « _value_ »).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-definefield" type="abstract operation">
      <h1>
        DefineField (
          _receiver_: an Object,
          _fieldRecord_: a ClassFieldDefinition Record,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _fieldName_ be _fieldRecord_.[[Name]].
        1. Let _initializer_ be _fieldRecord_.[[Initializer]].
        1. If _initializer_ is not ~empty~, then
          1. Let _initValue_ be ? Call(_initializer_, _receiver_).
        1. Else,
          1. Let _initValue_ be *undefined*.
        1. If _fieldName_ is a Private Name, then
          1. Perform ? PrivateFieldAdd(_receiver_, _fieldName_, _initValue_).
        1. Else,
          1. Assert: _fieldName_ is a property key.
          1. Perform ? CreateDataPropertyOrThrow(_receiver_, _fieldName_, _initValue_).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-initializeinstanceelements" type="abstract operation">
      <h1>
        InitializeInstanceElements (
          _O_: an Object,
          _constructor_: an ECMAScript function object,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _methods_ be the value of _constructor_.[[PrivateMethods]].
        1. For each PrivateElement _method_ of _methods_, do
          1. Perform ? PrivateMethodOrAccessorAdd(_O_, _method_).
        1. Let _fields_ be the value of _constructor_.[[Fields]].
        1. For each element _fieldRecord_ of _fields_, do
          1. Perform ? DefineField(_O_, _fieldRecord_).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-add-value-to-keyed-group" type="abstract operation">
      <h1>
        AddValueToKeyedGroup (
          _groups_: a List of Records with fields [[Key]] (an ECMAScript language value) and [[Elements]] (a List of ECMAScript language values),
          _key_: an ECMAScript language value,
          _value_: an ECMAScript language value,
        ): ~unused~
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. For each Record { [[Key]], [[Elements]] } _g_ of _groups_, do
          1. If SameValue(_g_.[[Key]], _key_) is *true*, then
            1. Assert: Exactly one element of _groups_ meets this criterion.
            1. Append _value_ to _g_.[[Elements]].
            1. Return ~unused~.
        1. Let _group_ be the Record { [[Key]]: _key_, [[Elements]]: « _value_ » }.
        1. Append _group_ to _groups_.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-groupby" type="abstract operation">
      <h1>
        GroupBy (
          _items_: an ECMAScript language value,
          _callback_: an ECMAScript language value,
          _keyCoercion_: ~property~ or ~collection~,
        ): either a normal completion containing a List of Records with fields [[Key]] (an ECMAScript language value) and [[Elements]] (a List of ECMAScript language values), or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Perform ? RequireObjectCoercible(_items_).
        1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
        1. Let _groups_ be a new empty List.
        1. Let _iteratorRecord_ be ? GetIterator(_items_, ~sync~).
        1. Let _k_ be 0.
        1. Repeat,
          1. If _k_ ≥ 2<sup>53</sup> - 1, then
            1. Let _error_ be ThrowCompletion(a newly created *TypeError* object).
            1. Return ? IteratorClose(_iteratorRecord_, _error_).
          1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is ~done~, then
            1. Return _groups_.
          1. Let _value_ be _next_.
          1. Let _key_ be Completion(Call(_callback_, *undefined*, « _value_, 𝔽(_k_) »)).
          1. IfAbruptCloseIterator(_key_, _iteratorRecord_).
          1. If _keyCoercion_ is ~property~, then
            1. Set _key_ to Completion(ToPropertyKey(_key_)).
            1. IfAbruptCloseIterator(_key_, _iteratorRecord_).
          1. Else,
            1. Assert: _keyCoercion_ is ~collection~.
            1. Set _key_ to CanonicalizeKeyedCollectionKey(_key_).
          1. Perform AddValueToKeyedGroup(_groups_, _key_, _value_).
          1. Set _k_ to _k_ + 1.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-SetterThatIgnoresPrototypeProperties" type="abstract operation">
      <h1>
        SetterThatIgnoresPrototypeProperties (
          _thisValue_: an ECMAScript language value,
          _home_: an Object,
          _p_: a property key,
          _v_: an ECMAScript language value,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _thisValue_ is not an Object, then
          1. Throw a *TypeError* exception.
        1. If SameValue(_thisValue_, _home_) is *true*, then
          1. NOTE: Throwing here emulates assignment to a non-writable data property on the _home_ object in strict mode code.
          1. Throw a *TypeError* exception.
        1. Let _desc_ be ? _thisValue_.[[GetOwnProperty]](_p_).
        1. If _desc_ is *undefined*, then
          1. Perform ? CreateDataPropertyOrThrow(_thisValue_, _p_, _v_).
        1. Else,
          1. Perform ? Set(_thisValue_, _p_, _v_, *true*).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-operations-on-iterator-objects">
    <h1>Operations on Iterator Objects</h1>
    <p>See Common Iteration Interfaces (<emu-xref href="#sec-iteration"></emu-xref>).</p>

    <emu-clause id="sec-iterator-records">
      <h1>Iterator Records</h1>
      <p>An <dfn variants="Iterator Records">Iterator Record</dfn> is a Record value used to encapsulate an iterator or async iterator along with the `next` method.</p>
      <p>Iterator Records have the fields listed in <emu-xref href="#table-iterator-record-fields"></emu-xref>.</p>
      <emu-table id="table-iterator-record-fields" caption="Iterator Record Fields">
        <table>
          <thead>
            <tr>
              <th>
                Field Name
              </th>
              <th>
                Value
              </th>
              <th>
                Meaning
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              [[Iterator]]
            </td>
            <td>
              an Object
            </td>
            <td>
              An object that conforms to the iterator interface or the async iterator interface.
            </td>
          </tr>
          <tr>
            <td>
              [[NextMethod]]
            </td>
            <td>
              an ECMAScript language value
            </td>
            <td>
              The `next` method of the [[Iterator]] object.
            </td>
          </tr>
          <tr>
            <td>
              [[Done]]
            </td>
            <td>
              a Boolean
            </td>
            <td>
              Whether the iterator has completed or been closed.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-getiteratordirect" type="abstract operation">
      <h1>
        GetIteratorDirect (
          _obj_: an Object,
        ): either a normal completion containing an Iterator Record or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _nextMethod_ be ? Get(_obj_, *"next"*).
        1. Let _iteratorRecord_ be the Iterator Record { [[Iterator]]: _obj_, [[NextMethod]]: _nextMethod_, [[Done]]: *false* }.
        1. Return _iteratorRecord_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getiteratorfrommethod" type="abstract operation">
      <h1>
        GetIteratorFromMethod (
          _obj_: an ECMAScript language value,
          _method_: a function object,
        ): either a normal completion containing an Iterator Record or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _iterator_ be ? Call(_method_, _obj_).
        1. If _iterator_ is not an Object, throw a *TypeError* exception.
        1. Return ? GetIteratorDirect(_iterator_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getiterator" type="abstract operation">
      <h1>
        GetIterator (
          _obj_: an ECMAScript language value,
          _kind_: ~sync~ or ~async~,
        ): either a normal completion containing an Iterator Record or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _kind_ is ~async~, then
          1. Let _method_ be ? GetMethod(_obj_, %Symbol.asyncIterator%).
          1. If _method_ is *undefined*, then
            1. Let _syncMethod_ be ? GetMethod(_obj_, %Symbol.iterator%).
            1. If _syncMethod_ is *undefined*, throw a *TypeError* exception.
            1. Let _syncIteratorRecord_ be ? GetIteratorFromMethod(_obj_, _syncMethod_).
            1. Return CreateAsyncFromSyncIterator(_syncIteratorRecord_).
        1. Else,
          1. Let _method_ be ? GetMethod(_obj_, %Symbol.iterator%).
        1. If _method_ is *undefined*, throw a *TypeError* exception.
        1. Return ? GetIteratorFromMethod(_obj_, _method_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getiteratorflattenable" type="abstract operation">
      <h1>
        GetIteratorFlattenable (
          _obj_: an ECMAScript language value,
          _primitiveHandling_: ~iterate-string-primitives~ or ~reject-primitives~,
        ): either a normal completion containing an Iterator Record or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _obj_ is not an Object, then
          1. If _primitiveHandling_ is ~reject-primitives~, throw a *TypeError* exception.
          1. Assert: _primitiveHandling_ is ~iterate-string-primitives~.
          1. If _obj_ is not a String, throw a *TypeError* exception.
        1. Let _method_ be ? GetMethod(_obj_, %Symbol.iterator%).
        1. If _method_ is *undefined*, then
          1. Let _iterator_ be _obj_.
        1. Else,
          1. Let _iterator_ be ? Call(_method_, _obj_).
        1. If _iterator_ is not an Object, throw a *TypeError* exception.
        1. Return ? GetIteratorDirect(_iterator_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratornext" type="abstract operation">
      <h1>
        IteratorNext (
          _iteratorRecord_: an Iterator Record,
          optional _value_: an ECMAScript language value,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _value_ is not present, then
          1. Let _result_ be Completion(Call(_iteratorRecord_.[[NextMethod]], _iteratorRecord_.[[Iterator]])).
        1. Else,
          1. Let _result_ be Completion(Call(_iteratorRecord_.[[NextMethod]], _iteratorRecord_.[[Iterator]], « _value_ »)).
        1. If _result_ is a throw completion, then
          1. Set _iteratorRecord_.[[Done]] to *true*.
          1. Return ? _result_.
        1. Set _result_ to ! _result_.
        1. If _result_ is not an Object, then
          1. Set _iteratorRecord_.[[Done]] to *true*.
          1. Throw a *TypeError* exception.
        1. Return _result_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratorcomplete" type="abstract operation">
      <h1>
        IteratorComplete (
          _iteratorResult_: an Object,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Return ToBoolean(? Get(_iteratorResult_, *"done"*)).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratorvalue" type="abstract operation">
      <h1>
        IteratorValue (
          _iteratorResult_: an Object,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Return ? Get(_iteratorResult_, *"value"*).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratorstep" type="abstract operation">
      <h1>
        IteratorStep (
          _iteratorRecord_: an Iterator Record,
        ): either a normal completion containing either an Object or ~done~, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It requests the next value from _iteratorRecord_.[[Iterator]] by calling _iteratorRecord_.[[NextMethod]] and returns either ~done~ indicating that the iterator has reached its end or the IteratorResult object if a next value is available.</dd>
      </dl>
      <emu-alg>
        1. Let _result_ be ? IteratorNext(_iteratorRecord_).
        1. Let _done_ be Completion(IteratorComplete(_result_)).
        1. If _done_ is a throw completion, then
          1. Set _iteratorRecord_.[[Done]] to *true*.
          1. Return ? _done_.
        1. Set _done_ to ! _done_.
        1. If _done_ is *true*, then
          1. Set _iteratorRecord_.[[Done]] to *true*.
          1. Return ~done~.
        1. Return _result_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratorstepvalue" type="abstract operation">
      <h1>
        IteratorStepValue (
          _iteratorRecord_: an Iterator Record,
        ): either a normal completion containing either an ECMAScript language value or ~done~, or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It requests the next value from _iteratorRecord_.[[Iterator]] by calling _iteratorRecord_.[[NextMethod]] and returns either ~done~ indicating that the iterator has reached its end or the value from the IteratorResult object if a next value is available.</dd>
      </dl>
      <emu-alg>
        1. Let _result_ be ? IteratorStep(_iteratorRecord_).
        1. If _result_ is ~done~, then
          1. Return ~done~.
        1. Let _value_ be Completion(IteratorValue(_result_)).
        1. If _value_ is a throw completion, then
          1. Set _iteratorRecord_.[[Done]] to *true*.
        1. Return ? _value_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-iteratorclose" type="abstract operation">
      <h1>
        IteratorClose (
          _iteratorRecord_: an Iterator Record,
          _completion_: a Completion Record,
        ): a Completion Record
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to notify an iterator that it should perform any actions it would normally perform when it has reached its completed state.</dd>
      </dl>
      <emu-alg>
        1. Assert: _iteratorRecord_.[[Iterator]] is an Object.
        1. Let _iterator_ be _iteratorRecord_.[[Iterator]].
        1. Let _innerResult_ be Completion(GetMethod(_iterator_, *"return"*)).
        1. If _innerResult_ is a normal completion, then
          1. Let _return_ be _innerResult_.[[Value]].
          1. If _return_ is *undefined*, return ? _completion_.
          1. Set _innerResult_ to Completion(Call(_return_, _iterator_)).
        1. If _completion_ is a throw completion, return ? _completion_.
        1. If _innerResult_ is a throw completion, return ? _innerResult_.
        1. If _innerResult_.[[Value]] is not an Object, throw a *TypeError* exception.
        1. Return ? _completion_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-ifabruptcloseiterator" aoid="IfAbruptCloseIterator">
      <h1>IfAbruptCloseIterator ( _value_, _iteratorRecord_ )</h1>
      <p>IfAbruptCloseIterator is a shorthand for a sequence of algorithm steps that use an Iterator Record. An algorithm step of the form:</p>
      <emu-alg>
        1. IfAbruptCloseIterator(_value_, _iteratorRecord_).
      </emu-alg>
      <p>means the same thing as:</p>
      <emu-alg>
        1. Assert: _value_ is a Completion Record.
        1. If _value_ is an abrupt completion, return ? IteratorClose(_iteratorRecord_, _value_).
        1. Else, set _value_ to ! _value_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-asynciteratorclose" type="abstract operation">
      <h1>
        AsyncIteratorClose (
          _iteratorRecord_: an Iterator Record,
          _completion_: a Completion Record,
        ): a Completion Record
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to notify an async iterator that it should perform any actions it would normally perform when it has reached its completed state.</dd>
      </dl>
      <emu-alg>
        1. Assert: _iteratorRecord_.[[Iterator]] is an Object.
        1. Let _iterator_ be _iteratorRecord_.[[Iterator]].
        1. Let _innerResult_ be Completion(GetMethod(_iterator_, *"return"*)).
        1. If _innerResult_ is a normal completion, then
          1. Let _return_ be _innerResult_.[[Value]].
          1. If _return_ is *undefined*, return ? _completion_.
          1. Set _innerResult_ to Completion(Call(_return_, _iterator_)).
          1. If _innerResult_ is a normal completion, set _innerResult_ to Completion(Await(_innerResult_.[[Value]])).
        1. If _completion_ is a throw completion, return ? _completion_.
        1. If _innerResult_ is a throw completion, return ? _innerResult_.
        1. If _innerResult_.[[Value]] is not an Object, throw a *TypeError* exception.
        1. Return ? _completion_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-createiterresultobject" type="abstract operation">
      <h1>
        CreateIteratorResultObject (
          _value_: an ECMAScript language value,
          _done_: a Boolean,
        ): an Object that conforms to the IteratorResult interface
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It creates an object that conforms to the IteratorResult interface.</dd>
      </dl>
      <emu-alg>
        1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
        1. Perform ! CreateDataPropertyOrThrow(_obj_, *"value"*, _value_).
        1. Perform ! CreateDataPropertyOrThrow(_obj_, *"done"*, _done_).
        1. Return _obj_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-createlistiteratorRecord" type="abstract operation" oldids="sec-createlistiterator,sec-listiteratornext-functions,sec-listiterator-next">
      <h1>
        CreateListIteratorRecord (
          _list_: a List of ECMAScript language values,
        ): an Iterator Record
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It creates an Iterator Record whose [[NextMethod]] returns the successive elements of _list_.</dd>
      </dl>
      <emu-alg>
        1. Let _closure_ be a new Abstract Closure with no parameters that captures _list_ and performs the following steps when called:
          1. For each element _E_ of _list_, do
            1. Perform ? GeneratorYield(CreateIteratorResultObject(_E_, *false*)).
          1. Return NormalCompletion(*undefined*).
        1. Let _iterator_ be CreateIteratorFromClosure(_closure_, ~empty~, %Iterator.prototype%).
        1. Return the Iterator Record { [[Iterator]]: _iterator_, [[NextMethod]]: %GeneratorPrototype.next%, [[Done]]: *false* }.
      </emu-alg>
      <emu-note>
        <p>The list iterator object is never directly accessible to ECMAScript code.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-iteratortolist" oldids="sec-iterabletolist" type="abstract operation">
      <h1>
        IteratorToList (
          _iteratorRecord_: an Iterator Record,
        ): either a normal completion containing a List of ECMAScript language values or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _values_ be a new empty List.
        1. Repeat,
          1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is ~done~, then
            1. Return _values_.
          1. Append _next_ to _values_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

<h1 id="sec-syntax-directed-operations"></h1>
