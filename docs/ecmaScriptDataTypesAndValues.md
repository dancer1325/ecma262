# ECMAScript Data Types and Values
  <p>Algorithms within this specification manipulate values each of which has an associated type. The possible value types are exactly those defined in this clause. Types are further classified into ECMAScript language types and specification types.</p>

  <emu-clause id="sec-ecmascript-language-types">
    <h1>ECMAScript Language Types</h1>
    <p>An <dfn variants="ECMAScript language types">ECMAScript language type</dfn> corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object. An <dfn variants="ECMAScript language values">ECMAScript language value</dfn> is a value that is characterized by an ECMAScript language type.</p>

    <emu-clause id="sec-ecmascript-language-types-undefined-type">
      <h1>The Undefined Type</h1>
      <p>The Undefined type has exactly one value, called *undefined*. Any variable that has not been assigned a value has the value *undefined*.</p>
    </emu-clause>

    <emu-clause id="sec-ecmascript-language-types-null-type">
      <h1>The Null Type</h1>
      <p>The Null type has exactly one value, called *null*.</p>
    </emu-clause>

    <emu-clause id="sec-ecmascript-language-types-boolean-type">
      <h1>The Boolean Type</h1>
      <p>The <dfn variants="is a Boolean,is not a Boolean">Boolean type</dfn> represents a logical entity having two values, called *true* and *false*.</p>
    </emu-clause>

    <emu-clause id="sec-ecmascript-language-types-string-type">
      <h1>The String Type</h1>
      <p>The <dfn variants="is a String,is not a String">String type</dfn> is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2<sup>53</sup> - 1 elements. The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a UTF-16 code unit value. Each element is regarded as occupying a position within the sequence. These positions are indexed with non-negative integers. The first element (if any) is at index 0, the next element (if any) at index 1, and so on. The length of a String is the number of elements (i.e., 16-bit values) within it. The empty String has length zero and therefore contains no elements.</p>
      <p>ECMAScript operations that do not interpret String contents apply no further semantics. Operations that do interpret String values treat each element as a single UTF-16 code unit. However, ECMAScript does not restrict the value of or relationships between these code units, so operations that further interpret String contents as sequences of Unicode code points encoded in UTF-16 must account for ill-formed subsequences. Such operations apply special treatment to every code unit with a numeric value in the inclusive interval from 0xD800 to 0xDBFF (defined by the Unicode Standard as a <dfn id="leading-surrogate" variants="leading surrogates">leading surrogate</dfn>, or more formally as a <dfn id="high-surrogate-code-unit" variants="high-surrogate code units">high-surrogate code unit</dfn>) and every code unit with a numeric value in the inclusive interval from 0xDC00 to 0xDFFF (defined as a <dfn id="trailing-surrogate" variants="trailing surrogates">trailing surrogate</dfn>, or more formally as a <dfn id="low-surrogate-code-unit" variants="low-surrogate code units">low-surrogate code unit</dfn>) using the following rules:</p>
      <ul>
        <li>
          A code unit that is not a leading surrogate and not a trailing surrogate is interpreted as a code point with the same value.
        </li>
        <li>
          A sequence of two code units, where the first code unit _c1_ is a leading surrogate and the second code unit _c2_ a trailing surrogate, is a <dfn id="surrogate-pair" variants="surrogate pairs">surrogate pair</dfn> and is interpreted as a code point with the value (_c1_ - 0xD800) × 0x400 + (_c2_ - 0xDC00) + 0x10000. (See <emu-xref href="#sec-utf16decodesurrogatepair"></emu-xref>)
        </li>
        <li>
          A code unit that is a leading surrogate or trailing surrogate, but is not part of a surrogate pair, is interpreted as a code point with the same value.
        </li>
      </ul>
      <p>The function `String.prototype.normalize` (see <emu-xref href="#sec-string.prototype.normalize"></emu-xref>) can be used to explicitly normalize a String value. `String.prototype.localeCompare` (see <emu-xref href="#sec-string.prototype.localecompare"></emu-xref>) internally normalizes String values, but no other operations implicitly normalize the strings upon which they operate. Operation results are not language- and/or locale-sensitive unless stated otherwise.</p>
      <emu-note>
        <p>The rationale behind this design was to keep the implementation of Strings as simple and high-performing as possible. If ECMAScript source text is in Normalized Form C, string literals are guaranteed to also be normalized, as long as they do not contain any Unicode escape sequences.</p>
      </emu-note>
      <p>In this specification, the phrase "the <dfn id="string-concatenation">string-concatenation</dfn> of _A_, _B_, ..." (where each argument is a String value, a code unit, or a sequence of code units) denotes the String value whose sequence of code units is the concatenation of the code units (in order) of each of the arguments (in order).</p>
      <p>The phrase "the <dfn id="substring">substring</dfn> of _S_ from _inclusiveStart_ to _exclusiveEnd_" (where _S_ is a String value or a sequence of code units and _inclusiveStart_ and _exclusiveEnd_ are integers) denotes the String value consisting of the consecutive code units of _S_ beginning at index _inclusiveStart_ and ending immediately before index _exclusiveEnd_ (which is the empty String when _inclusiveStart_ = _exclusiveEnd_). If the "to" suffix is omitted, the length of _S_ is used as the value of _exclusiveEnd_.</p>
      <p>
        The phrase "<dfn id="ASCII-word-characters">the ASCII word characters</dfn>" denotes the following String value, which consists solely of every letter and number in the Unicode Basic Latin block along with U+005F (LOW LINE):<br>
        *"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"*.<br>
        For historical reasons, it has significance to various algorithms.
      </p>

      <emu-clause id="sec-stringindexof" type="abstract operation">
        <h1>
          StringIndexOf (
            _string_: a String,
            _searchValue_: a String,
            _fromIndex_: a non-negative integer,
          ): a non-negative integer or ~not-found~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _len_ be the length of _string_.
          1. If _searchValue_ is the empty String and _fromIndex_ ≤ _len_, return _fromIndex_.
          1. Let _searchLen_ be the length of _searchValue_.
          1. For each integer _i_ such that _fromIndex_ ≤ _i_ ≤ _len_ - _searchLen_, in ascending order, do
            1. Let _candidate_ be the substring of _string_ from _i_ to _i_ + _searchLen_.
            1. If _candidate_ is _searchValue_, return _i_.
          1. Return ~not-found~.
        </emu-alg>
        <emu-note>
          <p>If _searchValue_ is the empty String and _fromIndex_ ≤ the length of _string_, this algorithm returns _fromIndex_. The empty String is effectively found at every position within a string, including after the last code unit.</p>
        </emu-note>
        <emu-note>
          <p>This algorithm always returns ~not-found~ if _fromIndex_ + the length of _searchValue_ > the length of _string_.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-stringlastindexof" type="abstract operation">
        <h1>
          StringLastIndexOf (
            _string_: a String,
            _searchValue_: a String,
            _fromIndex_: a non-negative integer,
          ): a non-negative integer or ~not-found~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _len_ be the length of _string_.
          1. Let _searchLen_ be the length of _searchValue_.
          1. Assert: _fromIndex_ + _searchLen_ ≤ _len_.
          1. For each integer _i_ such that 0 ≤ _i_ ≤ _fromIndex_, in descending order, do
            1. Let _candidate_ be the substring of _string_ from _i_ to _i_ + _searchLen_.
            1. If _candidate_ is _searchValue_, return _i_.
          1. Return ~not-found~.
        </emu-alg>
        <emu-note>
          <p>If _searchValue_ is the empty String, this algorithm returns _fromIndex_. The empty String is effectively found at every position within a string, including after the last code unit.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ecmascript-language-types-symbol-type">
      <h1>The Symbol Type</h1>
      <p>The <dfn variants="is a Symbol,is not a Symbol">Symbol type</dfn> is the set of all non-String values that may be used as the key of an Object property (<emu-xref href="#sec-object-type"></emu-xref>).</p>
      <p>Each possible Symbol value is unique and immutable.</p>
      <p>Each Symbol value immutably holds an associated value called [[Description]] that is either *undefined* or a String value.</p>

      <emu-clause id="sec-well-known-symbols">
        <h1>Well-Known Symbols</h1>
        <p>Well-known symbols are built-in Symbol values that are explicitly referenced by algorithms of this specification. They are typically used as the keys of properties whose values serve as extension points of a specification algorithm. Unless otherwise specified, well-known symbols values are shared by all realms (<emu-xref href="#sec-code-realms"></emu-xref>).</p>
        <p>Within this specification a well-known symbol is referred to using the standard <emu-xref href="#sec-well-known-intrinsic-objects">intrinsic notation</emu-xref> where the intrinsic is one of the values listed in <emu-xref href="#table-well-known-symbols"></emu-xref>.</p>
        <emu-note>Previous editions of this specification used a notation of the form @@name, where the current edition would use `%Symbol.name%`. In particular, the following names were used: @@asyncIterator, @@hasInstance, @@isConcatSpreadable, @@<emu-not-ref>iterator</emu-not-ref>, @@match, @@matchAll, @@replace, @@search, @@species, @@split, @@toPrimitive, @@toStringTag, and @@unscopables.</emu-note>
        <emu-table id="table-well-known-symbols" caption="Well-known Symbols" oldids="table-1">
          <table>
            <thead>
              <tr>
                <th>
                  Specification Name
                </th>
                <th>
                  [[Description]]
                </th>
                <th>
                  Value and Purpose
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                <dfn>%Symbol.asyncIterator%</dfn>
              </td>
              <td>
                *"Symbol.asyncIterator"*
              </td>
              <td>
                A method that returns the default async iterator for an object. Called by the semantics of the `for`-`await`-`of` statement.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.hasInstance%</dfn>
              </td>
              <td>
                *"Symbol.hasInstance"*
              </td>
              <td>
                A method that determines if a constructor object recognizes an object as one of the constructor's instances. Called by the semantics of the `instanceof` operator.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.isConcatSpreadable%</dfn>
              </td>
              <td>
                *"Symbol.isConcatSpreadable"*
              </td>
              <td>
                A Boolean valued property that if true indicates that an object should be flattened to its array elements by <emu-xref href="#sec-array.prototype.concat">`Array.prototype.concat`</emu-xref>.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.iterator%</dfn>
              </td>
              <td>
                *"Symbol.iterator"*
              </td>
              <td>
                A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.match%</dfn>
              </td>
              <td>
                *"Symbol.match"*
              </td>
              <td>
                A regular expression method that matches the regular expression against a string. Called by the <emu-xref href="#sec-string.prototype.match">`String.prototype.match`</emu-xref> method.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.matchAll%</dfn>
              </td>
              <td>
                *"Symbol.matchAll"*
              </td>
              <td>
                A regular expression method that returns an iterator that yields matches of the regular expression against a string. Called by the <emu-xref href="#sec-string.prototype.matchall">`String.prototype.matchAll`</emu-xref> method.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.replace%</dfn>
              </td>
              <td>
                *"Symbol.replace"*
              </td>
              <td>
                A regular expression method that replaces matched substrings of a string. Called by the <emu-xref href="#sec-string.prototype.replace">`String.prototype.replace`</emu-xref> method.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.search%</dfn>
              </td>
              <td>
                *"Symbol.search"*
              </td>
              <td>
                A regular expression method that returns the index within a string that matches the regular expression. Called by the <emu-xref href="#sec-string.prototype.search">`String.prototype.search`</emu-xref> method.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.species%</dfn>
              </td>
              <td>
                *"Symbol.species"*
              </td>
              <td>
                A function valued property that is the constructor function that is used to create derived objects.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.split%</dfn>
              </td>
              <td>
                *"Symbol.split"*
              </td>
              <td>
                A regular expression method that splits a string at the indices that match the regular expression. Called by the <emu-xref href="#sec-string.prototype.split">`String.prototype.split`</emu-xref> method.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.toPrimitive%</dfn>
              </td>
              <td>
                *"Symbol.toPrimitive"*
              </td>
              <td>
                A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.toStringTag%</dfn>
              </td>
              <td>
                *"Symbol.toStringTag"*
              </td>
              <td>
                A String valued property that is used in the creation of the default string description of an object. Accessed by the built-in method <emu-xref href="#sec-object.prototype.tostring">`Object.prototype.toString`</emu-xref>.
              </td>
            </tr>
            <tr>
              <td>
                <dfn>%Symbol.unscopables%</dfn>
              </td>
              <td>
                *"Symbol.unscopables"*
              </td>
              <td>
                An object valued property whose own and inherited property names are property names that are excluded from the `with` environment bindings of the associated object.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-numeric-types">
      <h1>Numeric Types</h1>
      <p>ECMAScript has two built-in numeric types: Number and BigInt. The following abstract operations are defined over these numeric types. The "Result" column shows the return type, along with an indication if it is possible for some invocations of the operation to return an abrupt completion.</p>
      <emu-table id="table-numeric-type-ops" caption="Numeric Type Operations">
        <table>
          <thead>
            <tr>
              <th>
                Operation
              </th>
              <th>
                Example source
              </th>
              <th>
                Invoked by the Evaluation semantics of ...
              </th>
              <th>
                Result
              </th>
            </tr>
          </thead>

          <tr>
            <td>
              Number::unaryMinus
            </td>
            <td rowspan="2">
              `-x`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-unary-minus-operator" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::unaryMinus
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::bitwiseNOT
            </td>
            <td rowspan="2">
              `~x`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-bitwise-not-operator" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::bitwiseNOT
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::exponentiate
            </td>
            <td rowspan="2">
              `x&nbsp;**&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-exp-operator" title></emu-xref>
              and <emu-xref href="#sec-math.pow" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::exponentiate
            </td>
            <td>
              either a normal completion containing a BigInt or a throw completion
            </td>
          </tr>

          <tr>
            <td>
              Number::multiply
            </td>
            <td rowspan="2">
              `x&nbsp;*&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-multiplicative-operators" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::multiply
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::divide
            </td>
            <td rowspan="2">
              `x&nbsp;/&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-multiplicative-operators" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::divide
            </td>
            <td>
              either a normal completion containing a BigInt or a throw completion
            </td>
          </tr>

          <tr>
            <td>
              Number::remainder
            </td>
            <td rowspan="2">
              `x&nbsp;%&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-multiplicative-operators" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::remainder
            </td>
            <td>
              either a normal completion containing a BigInt or a throw completion
            </td>
          </tr>

          <tr>
            <td>
              Number::add
            </td>
            <td rowspan="2">
              `x ++`<br>
              `++ x`<br>
              `x&nbsp;+&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-postfix-increment-operator" title></emu-xref>,
              <emu-xref href="#sec-prefix-increment-operator" title></emu-xref>,
              and <emu-xref href="#sec-addition-operator-plus" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::add
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::subtract
            </td>
            <td rowspan="2">
              `x --`<br>
              `-- x`<br>
              `x&nbsp;-&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-postfix-decrement-operator" title></emu-xref>,
              <emu-xref href="#sec-prefix-decrement-operator" title></emu-xref>,
              and <emu-xref href="#sec-subtraction-operator-minus" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::subtract
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::leftShift
            </td>
            <td rowspan="2">
              `x&nbsp;&lt;&lt;&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-left-shift-operator" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::leftShift
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::signedRightShift
            </td>
            <td rowspan="2">
              `x&nbsp;>>&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-signed-right-shift-operator" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::signedRightShift
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::unsignedRightShift
            </td>
            <td rowspan="2">
              `x&nbsp;>>>&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-unsigned-right-shift-operator" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::unsignedRightShift
            </td>
            <td>
              a throw completion
            </td>
          </tr>

          <tr>
            <td>
              Number::lessThan
            </td>
            <td rowspan="2">
              `x&nbsp;&lt;&nbsp;y`<br>
              `x&nbsp;>&nbsp;y`<br>
              `x&nbsp;&lt;=&nbsp;y`<br>
              `x&nbsp;>=&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-relational-operators" title></emu-xref>,
              via <emu-xref href="#sec-islessthan" title></emu-xref>
            </td>
            <td>
              Boolean or *undefined* (for unordered inputs)
            </td>
          </tr>

          <tr>
            <td>
              BigInt::lessThan
            </td>
            <td>
              Boolean
            </td>
          </tr>

          <tr>
            <td>
              Number::equal
            </td>
            <td rowspan="2">
              `x&nbsp;==&nbsp;y`<br>
              `x&nbsp;!=&nbsp;y`<br>
              `x&nbsp;===&nbsp;y`<br>
              `x&nbsp;!==&nbsp;y`
            </td>
            <td rowspan="2">
              <emu-xref href="#sec-equality-operators" title></emu-xref>,
              via <emu-xref href="#sec-isstrictlyequal" title></emu-xref>
            </td>
            <td rowspan="2">
              Boolean
            </td>
          </tr>
          <tr>
            <td>
              BigInt::equal
            </td>
          </tr>

          <tr>
            <td>
              Number::sameValue
            </td>
            <td>
              `Object.is(x, y)`
            </td>
            <td>
              Object internal methods,
              via <emu-xref href="#sec-samevalue" title></emu-xref>,
              to test exact value equality
            </td>
            <td>
              Boolean
            </td>
          </tr>

          <tr>
            <td>
              Number::sameValueZero
            </td>
            <td>
              `[x].includes(y)`
            </td>
            <td>
              Array, Map, and Set methods,
              via <emu-xref href="#sec-samevaluezero" title></emu-xref>,
              to test value equality, ignoring the difference between *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub>
            </td>
            <td>
              Boolean
            </td>
          </tr>

          <tr>
            <td>
              Number::bitwiseAND
            </td>
            <td rowspan="2">
              `x&nbsp;&amp;&nbsp;y`
            </td>
            <td rowspan="6">
              <emu-xref href="#sec-binary-bitwise-operators" title></emu-xref>
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::bitwiseAND
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::bitwiseXOR
            </td>
            <td rowspan="2">
              `x&nbsp;^&nbsp;y`
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::bitwiseXOR
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::bitwiseOR
            </td>
            <td rowspan="2">
              `x&nbsp;|&nbsp;y`
            </td>
            <td>
              Number
            </td>
          </tr>
          <tr>
            <td>
              BigInt::bitwiseOR
            </td>
            <td>
              BigInt
            </td>
          </tr>

          <tr>
            <td>
              Number::toString
            </td>
            <td rowspan="2">
              `String(x)`
            </td>
            <td rowspan="2">
              Many expressions and built-in functions, via <emu-xref href="#sec-tostring" title></emu-xref>
            </td>
            <td rowspan="2">
              String
            </td>
          </tr>
          <tr>
            <td>
              BigInt::toString
            </td>
          </tr>
        </table>
      </emu-table>
      <p>Because the numeric types are in general not convertible without loss of precision or truncation, the ECMAScript language provides no implicit conversion among these types. Programmers must explicitly call `Number` and `BigInt` functions to convert among types when calling a function which requires another type.</p>
      <emu-note>
        <p>The first and subsequent editions of ECMAScript have provided, for certain operators, implicit numeric conversions that could lose precision or truncate. These legacy implicit conversions are maintained for backward compatibility, but not provided for BigInt in order to minimize opportunity for programmer error, and to leave open the option of generalized <em>value types</em> in a future edition.</p>
      </emu-note>

      <emu-clause id="sec-ecmascript-language-types-number-type">
        <h1>The Number Type</h1>
        <p>The <dfn variants="is a Number,is not a Number">Number type</dfn> has exactly 18,437,736,874,454,810,627 (that is, <emu-eqn>2<sup>64</sup> - 2<sup>53</sup> + 3</emu-eqn>) values, representing the double-precision floating point IEEE 754-2019 binary64 values as specified in the IEEE Standard for Binary Floating-Point Arithmetic, except that the 9,007,199,254,740,990 (that is, <emu-eqn>2<sup>53</sup> - 2</emu-eqn>) distinct “Not-a-Number” values of the IEEE Standard are represented in ECMAScript as a single special *NaN* value. (Note that the *NaN* value is produced by the program expression `NaN`.) In some implementations, external code might be able to detect a difference between various Not-a-Number values, but such behaviour is implementation-defined; to ECMAScript code, all *NaN* values are indistinguishable from each other.</p>
        <emu-note>
          <p>The bit pattern that might be observed in an ArrayBuffer (see <emu-xref href="#sec-arraybuffer-objects"></emu-xref>) or a SharedArrayBuffer (see <emu-xref href="#sec-sharedarraybuffer-objects"></emu-xref>) after a Number value has been stored into it is not necessarily the same as the internal representation of that Number value used by the ECMAScript implementation.</p>
        </emu-note>
        <p>There are two other special values, called *positive Infinity* and *negative Infinity*. For brevity, these values are also referred to for expository purposes by the symbols *+∞*<sub>𝔽</sub> and *-∞*<sub>𝔽</sub>, respectively. (Note that these two infinite Number values are produced by the program expressions `+Infinity` (or simply `Infinity`) and `-Infinity`.)</p>
        <p>The other 18,437,736,874,454,810,624 (that is, <emu-eqn>2<sup>64</sup> - 2<sup>53</sup></emu-eqn>) values are called the <dfn id="finite">finite</dfn> numbers. Half of these are positive numbers and half are negative numbers; for every finite positive Number value there is a corresponding negative value having the same magnitude.</p>
        <p>Note that there is both a *positive zero* and a *negative zero*. For brevity, these values are also referred to for expository purposes by the symbols *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub>, respectively. (Note that these two different zero Number values are produced by the program expressions `+0` (or simply `0`) and `-0`.)</p>
        <p>The 18,437,736,874,454,810,622 (that is, <emu-eqn>2<sup>64</sup> - 2<sup>53</sup> - 2</emu-eqn>) finite non-zero values are of two kinds:</p>
        <p>18,428,729,675,200,069,632 (that is, <emu-eqn>2<sup>64</sup> - 2<sup>54</sup></emu-eqn>) of them are normalized, having the form</p>
        <div class="math-display">
          _s_ × _m_ × 2<sup>_e_</sup>
        </div>
        <p>where _s_ is 1 or -1, _m_ is an integer in the interval from 2<sup>52</sup> (inclusive) to 2<sup>53</sup> (exclusive), and _e_ is an integer in the inclusive interval from -1074 to 971.</p>
        <p>The remaining 9,007,199,254,740,990 (that is, <emu-eqn>2<sup>53</sup> - 2</emu-eqn>) values are denormalized, having the form</p>
        <div class="math-display">
          _s_ × _m_ × 2<sup>_e_</sup>
        </div>
        <p>where _s_ is 1 or -1, _m_ is an integer in the interval from 0 (exclusive) to 2<sup>52</sup> (exclusive), and _e_ is -1074.</p>
        <p>Note that all the positive and negative integers whose magnitude is no greater than 2<sup>53</sup> are representable in the Number type. The integer 0 has two representations in the Number type: *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub>.</p>
        <p>A finite number has an <em>odd significand</em> if it is non-zero and the integer _m_ used to express it (in one of the two forms shown above) is odd. Otherwise, it has an <em>even significand</em>.</p>
        <p>In this specification, the phrase “the <dfn id="number-value-for" oldids="number-value">Number value for</dfn> _x_” where _x_ represents an exact real mathematical quantity (which might even be an irrational number such as π) means a Number value chosen in the following manner. Consider the set of all finite values of the Number type, with *-0*<sub>𝔽</sub> removed and with two additional values added to it that are not representable in the Number type, namely 2<sup>1024</sup> (which is <emu-eqn>+1 × 2<sup>53</sup> × 2<sup>971</sup></emu-eqn>) and <emu-eqn>-2<sup>1024</sup></emu-eqn> (which is <emu-eqn>-1 × 2<sup>53</sup> × 2<sup>971</sup></emu-eqn>). Choose the member of this set that is closest in value to _x_. If two values of the set are equally close, then the one with an even significand is chosen; for this purpose, the two extra values 2<sup>1024</sup> and <emu-eqn>-2<sup>1024</sup></emu-eqn> are considered to have even significands. Finally, if 2<sup>1024</sup> was chosen, replace it with *+∞*<sub>𝔽</sub>; if <emu-eqn>-2<sup>1024</sup></emu-eqn> was chosen, replace it with *-∞*<sub>𝔽</sub>; if *+0*<sub>𝔽</sub> was chosen, replace it with *-0*<sub>𝔽</sub> if and only if _x_ &lt; 0; any other chosen value is used unchanged. The result is the Number value for _x_. (This procedure corresponds exactly to the behaviour of the IEEE 754-2019 roundTiesToEven mode.)</p>
        <p>The Number value for +∞ is *+∞*<sub>𝔽</sub>, and the Number value for -∞ is *-∞*<sub>𝔽</sub>.</p>
        <p>Some ECMAScript operators deal only with integers in specific ranges such as the inclusive interval from <emu-eqn>-2<sup>31</sup></emu-eqn> to <emu-eqn>2<sup>31</sup> - 1</emu-eqn> or the inclusive interval from 0 to <emu-eqn>2<sup>16</sup> - 1</emu-eqn>. These operators accept any value of the Number type but first convert each such value to an integer value in the expected range. See the descriptions of the numeric conversion operations in <emu-xref href="#sec-type-conversion"></emu-xref>.</p>

        <emu-clause id="sec-numeric-types-number-unaryMinus" type="numeric method">
          <h1>
            Number::unaryMinus (
              _x_: a Number,
            ): a Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ is *NaN*, return *NaN*.
            1. Return the negation of _x_; that is, compute a Number with the same magnitude but opposite sign.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-bitwiseNOT" type="numeric method">
          <h1>
            Number::bitwiseNOT (
              _x_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _oldValue_ be ! ToInt32(_x_).
            1. Return the bitwise complement of _oldValue_. The mathematical value of the result is exactly representable as a 32-bit two's complement bit string.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-exponentiate" type="numeric method" oldids="sec-applying-the-exp-operator">
          <h1>
            Number::exponentiate (
              _base_: a Number,
              _exponent_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It returns an implementation-approximated value representing the result of raising _base_ to the _exponent_ power.</dd>
          </dl>
          <emu-alg>
            1. If _exponent_ is *NaN*, return *NaN*.
            1. If _exponent_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
            1. If _base_ is *NaN*, return *NaN*.
            1. If _base_ is *+∞*<sub>𝔽</sub>, then
              1. If _exponent_ > *+0*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>. Otherwise, return *+0*<sub>𝔽</sub>.
            1. If _base_ is *-∞*<sub>𝔽</sub>, then
              1. If _exponent_ > *+0*<sub>𝔽</sub>, then
                1. If _exponent_ is an odd integral Number, return *-∞*<sub>𝔽</sub>. Otherwise, return *+∞*<sub>𝔽</sub>.
              1. Else,
                1. If _exponent_ is an odd integral Number, return *-0*<sub>𝔽</sub>. Otherwise, return *+0*<sub>𝔽</sub>.
            1. If _base_ is *+0*<sub>𝔽</sub>, then
              1. If _exponent_ > *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>. Otherwise, return *+∞*<sub>𝔽</sub>.
            1. If _base_ is *-0*<sub>𝔽</sub>, then
              1. If _exponent_ > *+0*<sub>𝔽</sub>, then
                1. If _exponent_ is an odd integral Number, return *-0*<sub>𝔽</sub>. Otherwise, return *+0*<sub>𝔽</sub>.
              1. Else,
                1. If _exponent_ is an odd integral Number, return *-∞*<sub>𝔽</sub>. Otherwise, return *+∞*<sub>𝔽</sub>.
            1. Assert: _base_ is finite and is neither *+0*<sub>𝔽</sub> nor *-0*<sub>𝔽</sub>.
            1. If _exponent_ is *+∞*<sub>𝔽</sub>, then
              1. If abs(ℝ(_base_)) > 1, return *+∞*<sub>𝔽</sub>.
              1. If abs(ℝ(_base_)) = 1, return *NaN*.
              1. If abs(ℝ(_base_)) &lt; 1, return *+0*<sub>𝔽</sub>.
            1. If _exponent_ is *-∞*<sub>𝔽</sub>, then
              1. If abs(ℝ(_base_)) > 1, return *+0*<sub>𝔽</sub>.
              1. If abs(ℝ(_base_)) = 1, return *NaN*.
              1. If abs(ℝ(_base_)) &lt; 1, return *+∞*<sub>𝔽</sub>.
            1. Assert: _exponent_ is finite and is neither *+0*<sub>𝔽</sub> nor *-0*<sub>𝔽</sub>.
            1. If _base_ &lt; *-0*<sub>𝔽</sub> and _exponent_ is not an integral Number, return *NaN*.
            1. Return an implementation-approximated Number value representing the result of raising ℝ(_base_) to the ℝ(_exponent_) power.
          </emu-alg>
          <emu-note>
            <p>The result of _base_ `**` _exponent_ when _base_ is *1*<sub>𝔽</sub> or *-1*<sub>𝔽</sub> and _exponent_ is *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, or when _base_ is *1*<sub>𝔽</sub> and _exponent_ is *NaN*, differs from IEEE 754-2019. The first edition of ECMAScript specified a result of *NaN* for this operation, whereas later revisions of IEEE 754 specified *1*<sub>𝔽</sub>. The historical ECMAScript behaviour is preserved for compatibility reasons.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-multiply" type="numeric method" oldids="sec-applying-the-mul-operator">
          <h1>
            Number::multiply (
              _x_: a Number,
              _y_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It performs multiplication according to the rules of IEEE 754-2019 binary double-precision arithmetic, producing the product of _x_ and _y_.</dd>
          </dl>
          <emu-alg>
            1. If _x_ is *NaN* or _y_ is *NaN*, return *NaN*.
            1. If _x_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, then
              1. If _y_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *NaN*.
              1. If _y_ > *+0*<sub>𝔽</sub>, return _x_.
              1. Return -_x_.
            1. If _y_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, then
              1. If _x_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *NaN*.
              1. If _x_ > *+0*<sub>𝔽</sub>, return _y_.
              1. Return -_y_.
            1. If _x_ is *-0*<sub>𝔽</sub>, then
              1. If _y_ is *-0*<sub>𝔽</sub> or _y_ &lt; *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
              1. Else, return *-0*<sub>𝔽</sub>.
            1. If _y_ is *-0*<sub>𝔽</sub>, then
              1. If _x_ &lt; *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
              1. Else, return *-0*<sub>𝔽</sub>.
            1. Return 𝔽(ℝ(_x_) × ℝ(_y_)).
          </emu-alg>
          <emu-note>
            <p>Finite-precision multiplication is commutative, but not always associative.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-divide" type="numeric method" oldids="sec-applying-the-div-operator">
          <h1>
            Number::divide (
              _x_: a Number,
              _y_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It performs division according to the rules of IEEE 754-2019 binary double-precision arithmetic, producing the quotient of _x_ and _y_ where _x_ is the dividend and _y_ is the divisor.</dd>
          </dl>
          <emu-alg>
            1. If _x_ is *NaN* or _y_ is *NaN*, return *NaN*.
            1. If _x_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, then
              1. If _y_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *NaN*.
              1. If _y_ is *+0*<sub>𝔽</sub> or _y_ > *+0*<sub>𝔽</sub>, return _x_.
              1. Return -_x_.
            1. If _y_ is *+∞*<sub>𝔽</sub>, then
              1. If _x_ is *+0*<sub>𝔽</sub> or _x_ > *+0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>. Otherwise, return *-0*<sub>𝔽</sub>.
            1. If _y_ is *-∞*<sub>𝔽</sub>, then
              1. If _x_ is *+0*<sub>𝔽</sub> or _x_ > *+0*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>. Otherwise, return *+0*<sub>𝔽</sub>.
            1. If _x_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, then
              1. If _y_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *NaN*.
              1. If _y_ > *+0*<sub>𝔽</sub>, return _x_.
              1. Return -_x_.
            1. If _y_ is *+0*<sub>𝔽</sub>, then
              1. If _x_ > *+0*<sub>𝔽</sub>, return *+∞*<sub>𝔽</sub>. Otherwise, return *-∞*<sub>𝔽</sub>.
            1. If _y_ is *-0*<sub>𝔽</sub>, then
              1. If _x_ > *+0*<sub>𝔽</sub>, return *-∞*<sub>𝔽</sub>. Otherwise, return *+∞*<sub>𝔽</sub>.
            1. Return 𝔽(ℝ(_x_) / ℝ(_y_)).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-remainder" type="numeric method" oldids="sec-applying-the-mod-operator">
          <h1>
            Number::remainder (
              _n_: a Number,
              _d_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It yields the remainder from an implied division of its operands where _n_ is the dividend and _d_ is the divisor.</dd>
          </dl>
          <emu-alg>
            1. If _n_ is *NaN* or _d_ is *NaN*, return *NaN*.
            1. If _n_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return *NaN*.
            1. If _d_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return _n_.
            1. If _d_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *NaN*.
            1. If _n_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return _n_.
            1. Assert: _n_ and _d_ are finite and non-zero.
            1. Let _quotient_ be ℝ(_n_) / ℝ(_d_).
            1. Let _q_ be truncate(_quotient_).
            1. Let _r_ be ℝ(_n_) - (ℝ(_d_) × _q_).
            1. If _r_ = 0 and _n_ &lt; *-0*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
            1. Return 𝔽(_r_).
          </emu-alg>
          <emu-note>
            <p>In C and C++, the remainder operator accepts only integral operands; in ECMAScript, it also accepts floating-point operands.</p>
          </emu-note>
          <emu-note>The result of a floating-point remainder operation as computed by the `%` operator is not the same as the “remainder” operation defined by IEEE 754-2019. The IEEE 754-2019 “remainder” operation computes the remainder from a rounding division, not a truncating division, and so its behaviour is not analogous to that of the usual <emu-not-ref>integer</emu-not-ref> remainder operator. Instead the ECMAScript language defines `%` on floating-point operations to behave in a manner analogous to that of the Java <emu-not-ref>integer</emu-not-ref> remainder operator; this may be compared with the C library function fmod.</emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-add" type="numeric method" oldids="sec-applying-the-additive-operators-to-numbers">
          <h1>
            Number::add (
              _x_: a Number,
              _y_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It performs addition according to the rules of IEEE 754-2019 binary double-precision arithmetic, producing the sum of its arguments.</dd>
          </dl>
          <emu-alg>
            1. If _x_ is *NaN* or _y_ is *NaN*, return *NaN*.
            1. If _x_ is *+∞*<sub>𝔽</sub> and _y_ is *-∞*<sub>𝔽</sub>, return *NaN*.
            1. If _x_ is *-∞*<sub>𝔽</sub> and _y_ is *+∞*<sub>𝔽</sub>, return *NaN*.
            1. If _x_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return _x_.
            1. If _y_ is either *+∞*<sub>𝔽</sub> or *-∞*<sub>𝔽</sub>, return _y_.
            1. Assert: _x_ and _y_ are both finite.
            1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *-0*<sub>𝔽</sub>.
            1. Return 𝔽(ℝ(_x_) + ℝ(_y_)).
          </emu-alg>
          <emu-note>
            <p>Finite-precision addition is commutative, but not always associative.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-subtract" type="numeric method">
          <h1>
            Number::subtract (
              _x_: a Number,
              _y_: a Number,
            ): a Number
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It performs subtraction, producing the difference of its operands; _x_ is the minuend and _y_ is the subtrahend.</dd>
          </dl>
          <emu-alg>
            1. Return Number::add(_x_, Number::unaryMinus(_y_)).
          </emu-alg>
          <emu-note>
            <p>It is always the case that `x - y` produces the same result as `x + (-y)`.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-leftShift" type="numeric method">
          <h1>
            Number::leftShift (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _lNum_ be ! ToInt32(_x_).
            1. Let _rNum_ be ! ToUint32(_y_).
            1. Let _shiftCount_ be ℝ(_rNum_) modulo 32.
            1. Return the result of left shifting _lNum_ by _shiftCount_ bits. The mathematical value of the result is exactly representable as a 32-bit two's complement bit string.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-signedRightShift" type="numeric method">
          <h1>
            Number::signedRightShift (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _lNum_ be ! ToInt32(_x_).
            1. Let _rNum_ be ! ToUint32(_y_).
            1. Let _shiftCount_ be ℝ(_rNum_) modulo 32.
            1. Return the result of performing a sign-extending right shift of _lNum_ by _shiftCount_ bits. The most significant bit is propagated. The mathematical value of the result is exactly representable as a 32-bit two's complement bit string.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-unsignedRightShift" type="numeric method">
          <h1>
            Number::unsignedRightShift (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _lNum_ be ! ToUint32(_x_).
            1. Let _rNum_ be ! ToUint32(_y_).
            1. Let _shiftCount_ be ℝ(_rNum_) modulo 32.
            1. Return the result of performing a zero-filling right shift of _lNum_ by _shiftCount_ bits. Vacated bits are filled with zero. The mathematical value of the result is exactly representable as a 32-bit unsigned bit string.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-lessThan" type="numeric method">
          <h1>
            Number::lessThan (
              _x_: a Number,
              _y_: a Number,
            ): a Boolean or *undefined*
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ is *NaN*, return *undefined*.
            1. If _y_ is *NaN*, return *undefined*.
            1. If _x_ is _y_, return *false*.
            1. If _x_ is *+0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *false*.
            1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *+0*<sub>𝔽</sub>, return *false*.
            1. If _x_ is *+∞*<sub>𝔽</sub>, return *false*.
            1. If _y_ is *+∞*<sub>𝔽</sub>, return *true*.
            1. If _y_ is *-∞*<sub>𝔽</sub>, return *false*.
            1. If _x_ is *-∞*<sub>𝔽</sub>, return *true*.
            1. Assert: _x_ and _y_ are finite.
            1. If ℝ(_x_) &lt; ℝ(_y_), return *true*. Otherwise, return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-equal" type="numeric method">
          <h1>
            Number::equal (
              _x_: a Number,
              _y_: a Number,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ is *NaN*, return *false*.
            1. If _y_ is *NaN*, return *false*.
            1. If _x_ is _y_, return *true*.
            1. If _x_ is *+0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *true*.
            1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *+0*<sub>𝔽</sub>, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-sameValue" type="numeric method">
          <h1>
            Number::sameValue (
              _x_: a Number,
              _y_: a Number,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ is *NaN* and _y_ is *NaN*, return *true*.
            1. If _x_ is *+0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *false*.
            1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *+0*<sub>𝔽</sub>, return *false*.
            1. If _x_ is _y_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-sameValueZero" type="numeric method">
          <h1>
            Number::sameValueZero (
              _x_: a Number,
              _y_: a Number,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ is *NaN* and _y_ is *NaN*, return *true*.
            1. If _x_ is *+0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *true*.
            1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *+0*<sub>𝔽</sub>, return *true*.
            1. If _x_ is _y_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numberbitwiseop" type="abstract operation">
          <h1>
            NumberBitwiseOp (
              _op_: `&amp;`, `^`, or `|`,
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _lNum_ be ! ToInt32(_x_).
            1. Let _rNum_ be ! ToInt32(_y_).
            1. Let _lBits_ be the 32-bit two's complement bit string representing ℝ(_lNum_).
            1. Let _rBits_ be the 32-bit two's complement bit string representing ℝ(_rNum_).
            1. If _op_ is `&amp;`, then
              1. Let _result_ be the result of applying the bitwise AND operation to _lBits_ and _rBits_.
            1. Else if _op_ is `^`, then
              1. Let _result_ be the result of applying the bitwise exclusive OR (XOR) operation to _lBits_ and _rBits_.
            1. Else,
              1. Assert: _op_ is `|`.
              1. Let _result_ be the result of applying the bitwise inclusive OR operation to _lBits_ and _rBits_.
            1. Return the Number value for the integer represented by the 32-bit two's complement bit string _result_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-bitwiseAND" type="numeric method">
          <h1>
            Number::bitwiseAND (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return NumberBitwiseOp(`&amp;`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-bitwiseXOR" type="numeric method">
          <h1>
            Number::bitwiseXOR (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return NumberBitwiseOp(`^`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-bitwiseOR" type="numeric method">
          <h1>
            Number::bitwiseOR (
              _x_: a Number,
              _y_: a Number,
            ): an integral Number
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return NumberBitwiseOp(`|`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-number-tostring" type="numeric method" oldids="sec-tostring-applied-to-the-number-type">
          <h1>
            Number::toString (
              _x_: a Number,
              _radix_: an integer in the inclusive interval from 2 to 36,
            ): a String
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It represents _x_ as a String using a positional numeral system with radix _radix_. The digits used in the representation of a number using radix _r_ are taken from the first _r_ code units of *"0123456789abcdefghijklmnopqrstuvwxyz"* in order. The representation of numbers with magnitude greater than or equal to *1*<sub>𝔽</sub> never includes leading zeroes.</dd>
          </dl>
          <emu-alg>
            1. If _x_ is *NaN*, return *"NaN"*.
            1. If _x_ is either *+0*<sub>𝔽</sub> or *-0*<sub>𝔽</sub>, return *"0"*.
            1. If _x_ &lt; *-0*<sub>𝔽</sub>, return the string-concatenation of *"-"* and Number::toString(-_x_, _radix_).
            1. If _x_ is *+∞*<sub>𝔽</sub>, return *"Infinity"*.
            1. [id="step-number-tostring-intermediate-values"] Let _n_, _k_, and _s_ be integers such that _k_ ≥ 1, _radix_<sup>_k_ - 1</sup> ≤ _s_ &lt; _radix_<sup>_k_</sup>, 𝔽(_s_ × _radix_<sup>_n_ - _k_</sup>) is _x_, and _k_ is as small as possible. Note that _k_ is the number of digits in the representation of _s_ using radix _radix_, that _s_ is not divisible by _radix_, and that the least significant digit of _s_ is not necessarily uniquely determined by these criteria.
            1. If _radix_ ≠ 10 or _n_ is in the inclusive interval from -5 to 21, then
              1. If _n_ ≥ _k_, then
                1. Return the string-concatenation of:
                  * the code units of the _k_ digits of the representation of _s_ using radix _radix_
                  * _n_ - _k_ occurrences of the code unit 0x0030 (DIGIT ZERO)
              1. Else if _n_ > 0, then
                1. Return the string-concatenation of:
                  * the code units of the most significant _n_ digits of the representation of _s_ using radix _radix_
                  * the code unit 0x002E (FULL STOP)
                  * the code units of the remaining _k_ - _n_ digits of the representation of _s_ using radix _radix_
              1. Else,
                1. Assert: _n_ ≤ 0.
                1. Return the string-concatenation of:
                  * the code unit 0x0030 (DIGIT ZERO)
                  * the code unit 0x002E (FULL STOP)
                  * -_n_ occurrences of the code unit 0x0030 (DIGIT ZERO)
                  * the code units of the _k_ digits of the representation of _s_ using radix _radix_
            1. NOTE: In this case, the input will be represented using scientific E notation, such as `1.2e+3`.
            1. Assert: _radix_ is 10.
            1. If _n_ &lt; 0, then
              1. Let _exponentSign_ be the code unit 0x002D (HYPHEN-MINUS).
            1. Else,
              1. Let _exponentSign_ be the code unit 0x002B (PLUS SIGN).
            1. If _k_ = 1, then
              1. Return the string-concatenation of:
                * the code unit of the single digit of _s_
                * the code unit 0x0065 (LATIN SMALL LETTER E)
                * _exponentSign_
                * the code units of the decimal representation of abs(_n_ - 1)
            1. Return the string-concatenation of:
              * the code unit of the most significant digit of the decimal representation of _s_
              * the code unit 0x002E (FULL STOP)
              * the code units of the remaining _k_ - 1 digits of the decimal representation of _s_
              * the code unit 0x0065 (LATIN SMALL LETTER E)
              * _exponentSign_
              * the code units of the decimal representation of abs(_n_ - 1)
          </emu-alg>
          <emu-note>
            <p>The following observations may be useful as guidelines for implementations, but are not part of the normative requirements of this Standard:</p>
            <ul>
              <li>
                If x is any Number value other than *-0*<sub>𝔽</sub>, then ToNumber(ToString(x)) is x.
              </li>
              <li>
                The least significant digit of s is not always uniquely determined by the requirements listed in step <emu-xref href="#step-number-tostring-intermediate-values"></emu-xref>.
              </li>
            </ul>
          </emu-note>
          <emu-note>
            <p>For implementations that provide more accurate conversions than required by the rules above, it is recommended that the following alternative version of step <emu-xref href="#step-number-tostring-intermediate-values"></emu-xref> be used as a guideline:</p>
            <emu-alg replaces-step="step-number-tostring-intermediate-values">
              1. Let _n_, _k_, and _s_ be integers such that _k_ ≥ 1, _radix_<sup>_k_ - 1</sup> ≤ _s_ &lt; _radix_<sup>_k_</sup>, 𝔽(_s_ × _radix_<sup>_n_ - _k_</sup>) is _x_, and _k_ is as small as possible. If there are multiple possibilities for _s_, choose the value of _s_ for which _s_ × _radix_<sup>_n_ - _k_</sup> is closest in value to ℝ(_x_). If there are two such possible values of _s_, choose the one that is even. Note that _k_ is the number of digits in the representation of _s_ using radix _radix_ and that _s_ is not divisible by _radix_.
            </emu-alg>
          </emu-note>
          <emu-note>
            <p>Implementers of ECMAScript may find useful the paper and code written by David M. Gay for binary-to-decimal conversion of floating-point numbers:</p>
            <p>
              Gay, David M. Correctly Rounded Binary-Decimal and Decimal-Binary Conversions. Numerical Analysis, Manuscript 90-10. AT&amp;T Bell Laboratories (Murray Hill, New Jersey). 30 November 1990. Available as<br>
              <a href="https://ampl.com/_archive/first-website/REFS/rounding.pdf">https://ampl.com/_archive/first-website/REFS/rounding.pdf</a>. Associated code available as<br>
              <a href="http://netlib.sandia.gov/fp/dtoa.c">http://netlib.sandia.gov/fp/dtoa.c</a> and as<br>
              <a href="http://netlib.sandia.gov/fp/g_fmt.c">http://netlib.sandia.gov/fp/g_fmt.c</a> and may also be found at the various `netlib` mirror sites.
            </p>
          </emu-note>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-ecmascript-language-types-bigint-type">
        <h1>The BigInt Type</h1>
        <p>The <dfn variants="is a BigInt,is not a BigInt">BigInt type</dfn> represents an integer value. The value may be any size and is not limited to a particular bit-width. Generally, where not otherwise noted, operations are designed to return exact mathematically-based answers. For binary operations, BigInts act as two's complement binary strings, with negative numbers treated as having bits set infinitely to the left.</p>

        <emu-clause id="sec-numeric-types-bigint-unaryMinus" type="numeric method">
          <h1>
            BigInt::unaryMinus (
              _x_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ = *0*<sub>ℤ</sub>, return *0*<sub>ℤ</sub>.
            1. Return -_x_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-bitwiseNOT" type="numeric method">
          <h1>
            BigInt::bitwiseNOT (
              _x_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It returns the one's complement of _x_.</dd>
          </dl>
          <emu-alg>
            1. Return -_x_ - *1*<sub>ℤ</sub>.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-exponentiate" type="numeric method">
          <h1>
            BigInt::exponentiate (
              _base_: a BigInt,
              _exponent_: a BigInt,
            ): either a normal completion containing a BigInt or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _exponent_ &lt; *0*<sub>ℤ</sub>, throw a *RangeError* exception.
            1. If _base_ = *0*<sub>ℤ</sub> and _exponent_ = *0*<sub>ℤ</sub>, return *1*<sub>ℤ</sub>.
            1. Return _base_ raised to the power _exponent_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-multiply" type="numeric method">
          <h1>
            BigInt::multiply (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return _x_ × _y_.
          </emu-alg>
          <emu-note>Even if the result has a much larger bit width than the input, the exact mathematical answer is given.</emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-divide" type="numeric method">
          <h1>
            BigInt::divide (
              _x_: a BigInt,
              _y_: a BigInt,
            ): either a normal completion containing a BigInt or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _y_ = *0*<sub>ℤ</sub>, throw a *RangeError* exception.
            1. Let _quotient_ be ℝ(_x_) / ℝ(_y_).
            1. Return ℤ(truncate(_quotient_)).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-remainder" type="numeric method">
          <h1>
            BigInt::remainder (
              _n_: a BigInt,
              _d_: a BigInt,
            ): either a normal completion containing a BigInt or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _d_ = *0*<sub>ℤ</sub>, throw a *RangeError* exception.
            1. If _n_ = *0*<sub>ℤ</sub>, return *0*<sub>ℤ</sub>.
            1. Let _quotient_ be ℝ(_n_) / ℝ(_d_).
            1. Let _q_ be ℤ(truncate(_quotient_)).
            1. Return _n_ - (_d_ × _q_).
          </emu-alg>
          <emu-note>The sign of the result is the sign of the dividend.</emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-add" type="numeric method">
          <h1>
            BigInt::add (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return _x_ + _y_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-subtract" type="numeric method">
          <h1>
            BigInt::subtract (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return _x_ - _y_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-leftShift" type="numeric method">
          <h1>
            BigInt::leftShift (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _y_ &lt; *0*<sub>ℤ</sub>, then
              1. Return ℤ(floor(ℝ(_x_) / 2<sup>-ℝ(_y_)</sup>)).
            1. Return _x_ × *2*<sub>ℤ</sub><sup>_y_</sup>.
          </emu-alg>
          <emu-note>Semantics here should be equivalent to a bitwise shift, treating the BigInt as an infinite length string of binary two's complement digits.</emu-note>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-signedRightShift" type="numeric method">
          <h1>
            BigInt::signedRightShift (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return BigInt::leftShift(_x_, -_y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-unsignedRightShift" type="numeric method">
          <h1>
            BigInt::unsignedRightShift (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-lessThan" type="numeric method">
          <h1>
            BigInt::lessThan (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If ℝ(_x_) &lt; ℝ(_y_), return *true*; otherwise return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-equal" type="numeric method" oldids="sec-numeric-types-bigint-sameValue,sec-numeric-types-bigint-sameValueZero">
          <h1>
            BigInt::equal (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If ℝ(_x_) = ℝ(_y_), return *true*; otherwise return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-binaryand" type="abstract operation">
          <h1>
            BinaryAnd (
              _x_: 0 or 1,
              _y_: 0 or 1,
            ): 0 or 1
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ = 1 and _y_ = 1, return 1.
            1. Else, return 0.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-binaryor" type="abstract operation">
          <h1>
            BinaryOr (
              _x_: 0 or 1,
              _y_: 0 or 1,
            ): 0 or 1
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ = 1 or _y_ = 1, return 1.
            1. Else, return 0.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-binaryxor" type="abstract operation">
          <h1>
            BinaryXor (
              _x_: 0 or 1,
              _y_: 0 or 1,
            ): 0 or 1
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ = 1 and _y_ = 0, return 1.
            1. Else if _x_ = 0 and _y_ = 1, return 1.
            1. Else, return 0.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-bigintbitwiseop" type="abstract operation">
          <h1>
            BigIntBitwiseOp (
              _op_: `&amp;`, `^`, or `|`,
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Set _x_ to ℝ(_x_).
            1. Set _y_ to ℝ(_y_).
            1. Let _result_ be 0.
            1. Let _shift_ be 0.
            1. Repeat, until (_x_ = 0 or _x_ = -1) and (_y_ = 0 or _y_ = -1),
              1. Let _xDigit_ be _x_ modulo 2.
              1. Let _yDigit_ be _y_ modulo 2.
              1. If _op_ is `&amp;`, then
                1. Set _result_ to _result_ + 2<sup>_shift_</sup> × BinaryAnd(_xDigit_, _yDigit_).
              1. Else if _op_ is `|`, then
                1. Set _result_ to _result_ + 2<sup>_shift_</sup> × BinaryOr(_xDigit_, _yDigit_).
              1. Else,
                1. Assert: _op_ is `^`.
                1. Set _result_ to _result_ + 2<sup>_shift_</sup> × BinaryXor(_xDigit_, _yDigit_).
              1. Set _shift_ to _shift_ + 1.
              1. Set _x_ to (_x_ - _xDigit_) / 2.
              1. Set _y_ to (_y_ - _yDigit_) / 2.
            1. If _op_ is `&amp;`, then
              1. Let _tmp_ be BinaryAnd(_x_ modulo 2, _y_ modulo 2).
            1. Else if _op_ is `|`, then
              1. Let _tmp_ be BinaryOr(_x_ modulo 2, _y_ modulo 2).
            1. Else,
              1. Assert: _op_ is `^`.
              1. Let _tmp_ be BinaryXor(_x_ modulo 2, _y_ modulo 2).
            1. If _tmp_ ≠ 0, then
              1. Set _result_ to _result_ - 2<sup>_shift_</sup>.
              1. NOTE: This extends the sign.
            1. Return the BigInt value for _result_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-bitwiseAND" type="numeric method">
          <h1>
            BigInt::bitwiseAND (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return BigIntBitwiseOp(`&amp;`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-bitwiseXOR" type="numeric method">
          <h1>
            BigInt::bitwiseXOR (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return BigIntBitwiseOp(`^`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-bitwiseOR" type="numeric method">
          <h1>
            BigInt::bitwiseOR (
              _x_: a BigInt,
              _y_: a BigInt,
            ): a BigInt
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return BigIntBitwiseOp(`|`, _x_, _y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-numeric-types-bigint-tostring" type="numeric method">
          <h1>
            BigInt::toString (
              _x_: a BigInt,
              _radix_: an integer in the inclusive interval from 2 to 36,
            ): a String
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It represents _x_ as a String using a positional numeral system with radix _radix_. The digits used in the representation of a BigInt using radix _r_ are taken from the first _r_ code units of *"0123456789abcdefghijklmnopqrstuvwxyz"* in order. The representation of BigInts other than *0*<sub>ℤ</sub> never includes leading zeroes.</dd>
          </dl>
          <emu-alg>
            1. If _x_ &lt; *0*<sub>ℤ</sub>, return the string-concatenation of *"-"* and BigInt::toString(-_x_, _radix_).
            1. Return the String value consisting of the representation of _x_ using radix _radix_.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-object-type">
      <h1>The Object Type</h1>
      <p>Each instance of the <dfn variants="is an Object,is not an Object">Object type</dfn>, also referred to simply as “an Object”, represents a collection of properties. Each property is either a data property, or an accessor property:</p>
      <ul>
        <li>
          A <dfn variants="data properties">data property</dfn> associates a key value with an ECMAScript language value and a set of Boolean attributes.
        </li>
        <li>
          An <dfn variants="accessor properties">accessor property</dfn> associates a key value with one or two accessor functions, and a set of Boolean attributes. The accessor functions are used to store or retrieve an ECMAScript language value that is associated with the property.
        </li>
      </ul>
      <p>The properties of an object are uniquely identified using property keys. A <dfn id="property-key" variants="property keys" oldids="sec-ispropertykey">property key</dfn> is either a String or a Symbol. All Strings and Symbols, including the empty String, are valid as property keys. A <dfn id="property-name">property name</dfn> is a property key that is a String.</p>
      <p>An <dfn id="integer-index" variants="integer indices,integer-indexed">integer index</dfn> is a property name _n_ such that CanonicalNumericIndexString(_n_) returns an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to 𝔽(2<sup>53</sup> - 1). An <dfn id="array-index" variants="array indices">array index</dfn> is an integer index _n_ such that CanonicalNumericIndexString(_n_) returns an integral Number in the inclusive interval from *+0*<sub>𝔽</sub> to 𝔽(2<sup>32</sup> - 2).</p>
      <emu-note>
        <p>Every non-negative safe integer has a corresponding integer index. Every 32-bit unsigned integer except <emu-eqn>2<sup>32</sup> - 1</emu-eqn> has a corresponding array index. *"-0"* is neither an integer index nor an array index.</p>
      </emu-note>
      <p>Property keys are used to access properties and their values. There are two kinds of access for properties: <em>get</em> and <em>set</em>, corresponding to value retrieval and assignment, respectively. The properties accessible via get and set access includes both <em>own properties</em> that are a direct part of an object and <em>inherited properties</em> which are provided by another associated object via a property inheritance relationship. Inherited properties may be either own or inherited properties of the associated object. Each own property of an object must each have a key value that is distinct from the key values of the other own properties of that object.</p>
      <p>All objects are logically collections of properties, but there are multiple forms of objects that differ in their semantics for accessing and manipulating their properties. Please see <emu-xref href="#sec-object-internal-methods-and-internal-slots"></emu-xref> for definitions of the multiple forms of objects.</p>
      <p>In addition, some objects are callable; these are referred to as functions or function objects and are described further below. All functions in ECMAScript are members of the Object type.</p>

      <emu-clause id="sec-property-attributes">
        <h1>Property Attributes</h1>
        <p>Attributes are used in this specification to define and explain the state of Object properties as described in <emu-xref href="#table-object-property-attributes"></emu-xref>. Unless specified explicitly, the initial value of each attribute is its Default Value.</p>
        <emu-table id="table-object-property-attributes" caption="Attributes of an Object property" oldids="table-2,table-3,table-4,table-data-property-attributes,table-accessor-property-attributes,table-default-attribute-values">
          <table>
            <thead>
              <tr>
                <th>Attribute Name</th>
                <th>Types of property for which it is present</th>
                <th>Value Domain</th>
                <th>Default Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tr>
              <td>
                [[Value]]
              </td>
              <td>
                data property
              </td>
              <td>
                an ECMAScript language value
              </td>
              <td>
                *undefined*
              </td>
              <td>
                The value retrieved by a get access of the property.
              </td>
            </tr>
            <tr>
              <td>
                [[Writable]]
              </td>
              <td>
                data property
              </td>
              <td>
                a Boolean
              </td>
              <td>
                *false*
              </td>
              <td>
                If *false*, attempts by ECMAScript code to change the property's [[Value]] attribute using [[Set]] will not succeed.
              </td>
            </tr>
            <tr>
              <td>
                [[Get]]
              </td>
              <td>
                accessor property
              </td>
              <td>
                an Object or *undefined*
              </td>
              <td>
                *undefined*
              </td>
              <td>
                If the value is an Object it must be a function object. The function's [[Call]] internal method (<emu-xref href="#table-additional-essential-internal-methods-of-function-objects"></emu-xref>) is called with an empty arguments list to retrieve the property value each time a get access of the property is performed.
              </td>
            </tr>
            <tr>
              <td>
                [[Set]]
              </td>
              <td>
                accessor property
              </td>
              <td>
                an Object or *undefined*
              </td>
              <td>
                *undefined*
              </td>
              <td>
                If the value is an Object it must be a function object. The function's [[Call]] internal method (<emu-xref href="#table-additional-essential-internal-methods-of-function-objects"></emu-xref>) is called with an arguments list containing the assigned value as its sole argument each time a set access of the property is performed. The effect of a property's [[Set]] internal method may, but is not required to, have an effect on the value returned by subsequent calls to the property's [[Get]] internal method.
              </td>
            </tr>
            <tr>
              <td>
                [[Enumerable]]
              </td>
              <td>
                data property or accessor property
              </td>
              <td>
                a Boolean
              </td>
              <td>
                *false*
              </td>
              <td>
                If *true*, the property will be enumerated by a for-in enumeration (see <emu-xref href="#sec-for-in-and-for-of-statements"></emu-xref>). Otherwise, the property is said to be non-enumerable.
              </td>
            </tr>
            <tr>
              <td>
                [[Configurable]]
              </td>
              <td>
                data property or accessor property
              </td>
              <td>
                a Boolean
              </td>
              <td>
                *false*
              </td>
              <td>
                If *false*, attempts to delete the property, change it from a data property to an accessor property or from an accessor property to a data property, or make any changes to its attributes (other than replacing an existing [[Value]] or setting [[Writable]] to *false*) will fail.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-object-internal-methods-and-internal-slots">
        <h1>Object Internal Methods and Internal Slots</h1>
        <p>The actual semantics of objects, in ECMAScript, are specified via algorithms called <em>internal methods</em>. Each object in an ECMAScript engine is associated with a set of internal methods that defines its runtime behaviour. These internal methods are not part of the ECMAScript language. They are defined by this specification purely for expository purposes. However, each object within an implementation of ECMAScript must behave as specified by the internal methods associated with it. The exact manner in which this is accomplished is determined by the implementation.</p>
        <p>Internal method names are polymorphic. This means that different object values may perform different algorithms when a common internal method name is invoked upon them. That actual object upon which an internal method is invoked is the “target” of the invocation. If, at runtime, the implementation of an algorithm attempts to use an internal method of an object that the object does not support, a *TypeError* exception is thrown.</p>
        <p>Internal slots correspond to internal state that is associated with objects and used by various ECMAScript specification algorithms. Internal slots are not object properties and they are not inherited. Depending upon the specific internal slot specification, such state may consist of values of any ECMAScript language type or of specific ECMAScript specification type values. Unless explicitly specified otherwise, internal slots are allocated as part of the process of creating an object and may not be dynamically added to an object. Unless specified otherwise, the initial value of an internal slot is the value *undefined*. Various algorithms within this specification create objects that have internal slots. However, the ECMAScript language provides no direct way to associate internal slots with an object.</p>
        <p>All objects have an internal slot named [[PrivateElements]], which is a List of PrivateElements. This List represents the values of the private fields, methods, and accessors for the object. Initially, it is an empty List.</p>
        <p>Internal methods and internal slots are identified within this specification using names enclosed in double square brackets [[ ]].</p>
        <p><emu-xref href="#table-essential-internal-methods"></emu-xref> summarizes the <em>essential internal methods</em> used by this specification that are applicable to all objects created or manipulated by ECMAScript code. Every object must have algorithms for all of the essential internal methods. However, all objects do not necessarily use the same algorithms for those methods.</p>
        <p>An <dfn id="ordinary-object" variants="ordinary objects">ordinary object</dfn> is an object that satisfies all of the following criteria:</p>
        <ul>
          <li>
            For the internal methods listed in <emu-xref href="#table-essential-internal-methods"></emu-xref>, the object uses those defined in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>.
          </li>
          <li>
            If the object has a [[Call]] internal method, it uses either the one defined in <emu-xref href="#sec-ecmascript-function-objects-call-thisargument-argumentslist"></emu-xref> or the one defined in <emu-xref href="#sec-built-in-function-objects-call-thisargument-argumentslist"></emu-xref>.
          </li>
          <li>
            If the object has a [[Construct]] internal method, it uses either the one defined in <emu-xref href="#sec-ecmascript-function-objects-construct-argumentslist-newtarget"></emu-xref> or the one defined in <emu-xref href="#sec-built-in-function-objects-construct-argumentslist-newtarget"></emu-xref>.
          </li>
        </ul>
        <p>An <dfn id="exotic-object" variants="exotic objects">exotic object</dfn> is an object that is not an ordinary object.</p>
        <p>This specification recognizes different kinds of exotic objects by those objects' internal methods. An object that is behaviourally equivalent to a particular kind of exotic object (such as an Array exotic object or a bound function exotic object), but does not have the same collection of internal methods specified for that kind, is not recognized as that kind of exotic object.</p>
        <p>The “Signature” column of <emu-xref href="#table-essential-internal-methods"></emu-xref> and other similar tables describes the invocation pattern for each internal method. The invocation pattern always includes a parenthesized list of descriptive parameter names. If a parameter name is the same as an ECMAScript type name then the name describes the required type of the parameter value. If an internal method explicitly returns a value, its parameter list is followed by the symbol “→” and the type name of the returned value. The type names used in signatures refer to the types defined in clause <emu-xref href="#sec-ecmascript-data-types-and-values"></emu-xref> augmented by the following additional names. “<em>any</em>” means the value may be any ECMAScript language type.</p>
        <p>In addition to its parameters, an internal method always has access to the object that is the target of the method invocation.</p>
        <p>An internal method implicitly returns a Completion Record, either a normal completion that wraps a value of the return type shown in its invocation pattern, or a throw completion.</p>
        <emu-table id="table-essential-internal-methods" caption="Essential Internal Methods" oldids="table-5">
          <table>
            <thead>
              <tr>
                <th>
                  Internal Method
                </th>
                <th>
                  Signature
                </th>
                <th>
                  Description
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                [[GetPrototypeOf]]
              </td>
              <td>
                ( ) <b>→</b> Object | Null
              </td>
              <td>
                Determine the object that provides inherited properties for this object. A *null* value indicates that there are no inherited properties.
              </td>
            </tr>
            <tr>
              <td>
                [[SetPrototypeOf]]
              </td>
              <td>
                (Object | Null) <b>→</b> Boolean
              </td>
              <td>
                Associate this object with another object that provides inherited properties. Passing *null* indicates that there are no inherited properties. Returns *true* indicating that the operation was completed successfully or *false* indicating that the operation was not successful.
              </td>
            </tr>
            <tr>
              <td>
                [[IsExtensible]]
              </td>
              <td>
                ( ) <b>→</b> Boolean
              </td>
              <td>
                Determine whether it is permitted to add additional properties to this object.
              </td>
            </tr>
            <tr>
              <td>
                [[PreventExtensions]]
              </td>
              <td>
                ( ) <b>→</b> Boolean
              </td>
              <td>
                Control whether new properties may be added to this object. Returns *true* if the operation was successful or *false* if the operation was unsuccessful.
              </td>
            </tr>
            <tr>
              <td>
                [[GetOwnProperty]]
              </td>
              <td>
                (_propertyKey_) <b>→</b> Undefined | Property Descriptor
              </td>
              <td>
                Return a Property Descriptor for the own property of this object whose key is _propertyKey_, or *undefined* if no such property exists.
              </td>
            </tr>
            <tr>
              <td>
                [[DefineOwnProperty]]
              </td>
              <td>
                (_propertyKey_, _PropertyDescriptor_) <b>→</b> Boolean
              </td>
              <td>
                Create or alter the own property, whose key is _propertyKey_, to have the state described by _PropertyDescriptor_. Return *true* if that property was successfully created/updated or *false* if the property could not be created or updated.
              </td>
            </tr>
            <tr>
              <td>
                [[HasProperty]]
              </td>
              <td>
                (_propertyKey_) <b>→</b> Boolean
              </td>
              <td>
                Return a Boolean value indicating whether this object already has either an own or inherited property whose key is _propertyKey_.
              </td>
            </tr>
            <tr>
              <td>
                [[Get]]
              </td>
              <td>
                (_propertyKey_, _Receiver_) <b>→</b> <em>any</em>
              </td>
              <td>
                Return the value of the property whose key is _propertyKey_ from this object. If any ECMAScript code must be executed to retrieve the property value, _Receiver_ is used as the *this* value when evaluating the code.
              </td>
            </tr>
            <tr>
              <td>
                [[Set]]
              </td>
              <td>
                (_propertyKey_, _value_, _Receiver_) <b>→</b> Boolean
              </td>
              <td>
                Set the value of the property whose key is _propertyKey_ to _value_. If any ECMAScript code must be executed to set the property value, _Receiver_ is used as the *this* value when evaluating the code. Returns *true* if the property value was set or *false* if it could not be set.
              </td>
            </tr>
            <tr>
              <td>
                [[Delete]]
              </td>
              <td>
                (_propertyKey_) <b>→</b> Boolean
              </td>
              <td>
                Remove the own property whose key is _propertyKey_ from this object. Return *false* if the property was not deleted and is still present. Return *true* if the property was deleted or is not present.
              </td>
            </tr>
            <tr>
              <td>
                [[OwnPropertyKeys]]
              </td>
              <td>
                ( ) <b>→</b> List of property keys
              </td>
              <td>
                Return a List whose elements are all of the own property keys for the object.
              </td>
            </tr>
          </table>
        </emu-table>
        <p><emu-xref href="#table-additional-essential-internal-methods-of-function-objects"></emu-xref> summarizes additional essential internal methods that are supported by objects that may be called as functions. A <dfn id="function-object" variants="function objects">function object</dfn> is an object that supports the [[Call]] internal method. A <dfn id="constructor" variants="constructors">constructor</dfn> is an object that supports the [[Construct]] internal method. Every object that supports [[Construct]] must support [[Call]]; that is, every constructor must be a function object. Therefore, a constructor may also be referred to as a <em>constructor function</em> or <em>constructor function object</em>.</p>
        <emu-table id="table-additional-essential-internal-methods-of-function-objects" caption="Additional Essential Internal Methods of Function Objects" oldids="table-6">
          <table>
            <thead>
              <tr>
                <th>
                  Internal Method
                </th>
                <th>
                  Signature
                </th>
                <th>
                  Description
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                [[Call]]
              </td>
              <td>
                (<em>any</em>, a List of <em>any</em>) <b>→</b> <em>any</em>
              </td>
              <td>
                Executes code associated with this object. Invoked via a function call expression. The arguments to the internal method are a *this* value and a List whose elements are the arguments passed to the function by a call expression. Objects that implement this internal method are <em>callable</em>.
              </td>
            </tr>
            <tr>
              <td>
                [[Construct]]
              </td>
              <td>
                (a List of <em>any</em>, Object) <b>→</b> Object
              </td>
              <td>
                Creates an object. Invoked via the `new` operator or a `super` call. The first argument to the internal method is a List whose elements are the arguments of the constructor invocation or the `super` call. The second argument is the object to which the `new` operator was initially applied. Objects that implement this internal method are called <em>constructors</em>. A function object is not necessarily a constructor and such non-constructor function objects do not have a [[Construct]] internal method.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>The semantics of the essential internal methods for ordinary objects and standard exotic objects are specified in clause <emu-xref href="#sec-ordinary-and-exotic-objects-behaviours"></emu-xref>. If any specified use of an internal method of an exotic object is not supported by an implementation, that usage must throw a *TypeError* exception when attempted.</p>
      </emu-clause>

      <emu-clause id="sec-invariants-of-the-essential-internal-methods">
        <h1>Invariants of the Essential Internal Methods</h1>
        <p>The Internal Methods of Objects of an ECMAScript engine must conform to the list of invariants specified below. Ordinary ECMAScript Objects as well as all standard exotic objects in this specification maintain these invariants. ECMAScript Proxy objects maintain these invariants by means of runtime checks on the result of traps invoked on the [[ProxyHandler]] object.</p>
        <p>Any implementation provided exotic objects must also maintain these invariants for those objects. Violation of these invariants may cause ECMAScript code to have unpredictable behaviour and create security issues. However, violation of these invariants must never compromise the memory safety of an implementation.</p>
        <p>An implementation must not allow these invariants to be circumvented in any manner such as by providing alternative interfaces that implement the functionality of the essential internal methods without enforcing their invariants.</p>
        <h2>Definitions:</h2>
        <ul>
          <li>
            The <em>target</em> of an internal method is the object upon which the internal method is called.
          </li>
          <li>
            A target is <em>non-extensible</em> if it has been observed to return *false* from its [[IsExtensible]] internal method, or *true* from its [[PreventExtensions]] internal method.
          </li>
          <li>
            A <em>non-existent</em> property is a property that does not exist as an own property on a non-extensible target.
          </li>
          <li>
            All references to <em>SameValue</em> are according to the definition of the SameValue algorithm.
          </li>
        </ul>
        <h2>Return value:</h2>
        <p>The value returned by any internal method must be a Completion Record with either:</p>
        <ul>
          <li>[[Type]] = ~normal~, [[Target]] = ~empty~, and [[Value]] = a value of the "normal return type" shown below for that internal method, or</li>
          <li>[[Type]] = ~throw~, [[Target]] = ~empty~, and [[Value]] = any ECMAScript language value.</li>
        </ul>
        <emu-note>
          <p>An internal method must not return a continue completion, a break completion, or a return completion.</p>
        </emu-note>
        <h2>[[GetPrototypeOf]] ( )</h2>
        <ul>
          <li>
            The normal return type is either Object or Null.
          </li>
          <li>
            If target is non-extensible, and [[GetPrototypeOf]] returns a value _V_, then any future calls to [[GetPrototypeOf]] should return the SameValue as _V_.
          </li>
        </ul>
        <emu-note>
          <p>An object's prototype chain should have finite length (that is, starting from any object, recursively applying the [[GetPrototypeOf]] internal method to its result should eventually lead to the value *null*). However, this requirement is not enforceable as an object level invariant if the prototype chain includes any exotic objects that do not use the ordinary object definition of [[GetPrototypeOf]]. Such a circular prototype chain may result in infinite loops when accessing object properties.</p>
        </emu-note>
        <h2>[[SetPrototypeOf]] ( _V_ )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If target is non-extensible, [[SetPrototypeOf]] must return *false*, unless _V_ is the SameValue as the target's observed [[GetPrototypeOf]] value.
          </li>
        </ul>
        <h2>[[IsExtensible]] ( )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If [[IsExtensible]] returns *false*, all future calls to [[IsExtensible]] on the target must return *false*.
          </li>
        </ul>
        <h2>[[PreventExtensions]] ( )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If [[PreventExtensions]] returns *true*, all future calls to [[IsExtensible]] on the target must return *false* and the target is now considered non-extensible.
          </li>
        </ul>
        <h2>[[GetOwnProperty]] ( _P_ )</h2>
        <ul>
          <li>
            The normal return type is either Property Descriptor or Undefined.
          </li>
          <li>
            If the return value is a Property Descriptor, it must be a fully populated Property Descriptor.
          </li>
          <li>
            If _P_ is described as a non-configurable, non-writable own data property, all future calls to [[GetOwnProperty]] ( _P_ ) must return Property Descriptor whose [[Value]] is SameValue as _P_'s [[Value]] attribute.
          </li>
          <li>
            If _P_'s attributes other than [[Writable]] and [[Value]] may change over time, or if the property might be deleted, then _P_'s [[Configurable]] attribute must be *true*.
          </li>
          <li>
            If the [[Writable]] attribute may change from *false* to *true*, then the [[Configurable]] attribute must be *true*.
          </li>
          <li>
            If the target is non-extensible and _P_ is non-existent, then all future calls to [[GetOwnProperty]] (_P_) on the target must describe _P_ as non-existent (i.e. [[GetOwnProperty]] (_P_) must return *undefined*).
          </li>
        </ul>
        <emu-note>
          <p>As a consequence of the third invariant, if a property is described as a data property and it may return different values over time, then either or both of the [[Writable]] and [[Configurable]] attributes must be *true* even if no mechanism to change the value is exposed via the other essential internal methods.</p>
        </emu-note>
        <h2>[[DefineOwnProperty]] ( _P_, _Desc_ )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            [[DefineOwnProperty]] must return *false* if _P_ has previously been observed as a non-configurable own property of the target, unless either:
            <ol>
              <li>
                _P_ is a writable data property. A non-configurable writable data property can be changed into a non-configurable non-writable data property.
              </li>
              <li>
                All attributes of _Desc_ are the SameValue as _P_'s attributes.
              </li>
            </ol>
          </li>
          <li>
            [[DefineOwnProperty]] (_P_, _Desc_) must return *false* if target is non-extensible and _P_ is a non-existent own property. That is, a non-extensible target object cannot be extended with new properties.
          </li>
        </ul>
        <h2>[[HasProperty]] ( _P_ )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable own data or accessor property of the target, [[HasProperty]] must return *true*.
          </li>
        </ul>
        <h2>[[Get]] ( _P_, _Receiver_ )</h2>
        <ul>
          <li>
            The normal return type is any ECMAScript language type.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable, non-writable own data property of the target with value _V_, then [[Get]] must return the SameValue as _V_.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable own accessor property of the target whose [[Get]] attribute is *undefined*, the [[Get]] operation must return *undefined*.
          </li>
        </ul>
        <h2>[[Set]] ( _P_, _V_, _Receiver_ )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable, non-writable own data property of the target, then [[Set]] must return *false* unless _V_ is the SameValue as _P_'s [[Value]] attribute.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable own accessor property of the target whose [[Set]] attribute is *undefined*, the [[Set]] operation must return *false*.
          </li>
        </ul>
        <h2>[[Delete]] ( _P_ )</h2>
        <ul>
          <li>
            The normal return type is Boolean.
          </li>
          <li>
            If _P_ was previously observed as a non-configurable own data or accessor property of the target, [[Delete]] must return *false*.
          </li>
        </ul>
        <h2>[[OwnPropertyKeys]] ( )</h2>
        <ul>
          <li>
            The normal return type is List.
          </li>
          <li>
            The returned List must not contain any duplicate entries.
          </li>
          <li>
            Each element of the returned List must be a property key.
          </li>
          <li>
            The returned List must contain at least the keys of all non-configurable own properties that have previously been observed.
          </li>
          <li>
            If the target is non-extensible, the returned List must contain only the keys of all own properties of the target that are observable using [[GetOwnProperty]].
          </li>
        </ul>
        <h2>[[Call]] ( )</h2>
        <ul>
          <li>
            The normal return type is any ECMAScript language type.
          </li>
        </ul>
        <h2>[[Construct]] ( )</h2>
        <ul>
          <li>
            The normal return type is Object.
          </li>
          <li>
            The target must also have a [[Call]] internal method.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-well-known-intrinsic-objects">
        <h1>Well-Known Intrinsic Objects</h1>
        <p>Well-known intrinsics are built-in objects that are explicitly referenced by the algorithms of this specification and which usually have realm-specific identities. Unless otherwise specified each intrinsic object actually corresponds to a set of similar objects, one per realm.</p>
        <p>Within this specification a reference such as %name% means the intrinsic object, associated with the current realm, corresponding to the name. A reference such as %name.a.b% means, as if the *"b"* property of the value of the *"a"* property of the intrinsic object %name% was accessed prior to any ECMAScript code being evaluated. Determination of the current realm and its intrinsics is described in <emu-xref href="#sec-execution-contexts"></emu-xref>. The well-known intrinsics are listed in <emu-xref href="#table-well-known-intrinsic-objects"></emu-xref>.</p>
        <emu-table id="table-well-known-intrinsic-objects" caption="Well-Known Intrinsic Objects" oldids="table-7">
          <table>
            <thead>
              <tr>
                <th>
                  Intrinsic Name
                </th>
                <th>
                  Global Name
                </th>
                <th>
                  ECMAScript Language Association
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                %AggregateError%
              </td>
              <td>
                `AggregateError`
              </td>
              <td>
                The `AggregateError` constructor (<emu-xref href="#sec-aggregate-error-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Array%
              </td>
              <td>
                `Array`
              </td>
              <td>
                The Array constructor (<emu-xref href="#sec-array-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %ArrayBuffer%
              </td>
              <td>
                `ArrayBuffer`
              </td>
              <td>
                The ArrayBuffer constructor (<emu-xref href="#sec-arraybuffer-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %ArrayIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of Array Iterator objects (<emu-xref href="#sec-array-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %AsyncFromSyncIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of async-from-sync iterator objects (<emu-xref href="#sec-async-from-sync-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %AsyncFunction%
              </td>
              <td>
              </td>
              <td>
                The constructor of async function objects (<emu-xref href="#sec-async-function-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %AsyncGeneratorFunction%
              </td>
              <td>
              </td>
              <td>
                The constructor of async generator function objects (<emu-xref href="#sec-asyncgeneratorfunction-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %AsyncGeneratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of async generator objects (<emu-xref href="#sec-asyncgenerator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %AsyncIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                An object that all standard built-in async iterator objects indirectly inherit from
              </td>
            </tr>
            <tr>
              <td>
                %Atomics%
              </td>
              <td>
                `Atomics`
              </td>
              <td>
                The `Atomics` object (<emu-xref href="#sec-atomics-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %BigInt%
              </td>
              <td>
                `BigInt`
              </td>
              <td>
                The BigInt constructor (<emu-xref href="#sec-bigint-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %BigInt64Array%
              </td>
              <td>
                `BigInt64Array`
              </td>
              <td>
                The BigInt64Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %BigUint64Array%
              </td>
              <td>
                `BigUint64Array`
              </td>
              <td>
                The BigUint64Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Boolean%
              </td>
              <td>
                `Boolean`
              </td>
              <td>
                The Boolean constructor (<emu-xref href="#sec-boolean-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %DataView%
              </td>
              <td>
                `DataView`
              </td>
              <td>
                The DataView constructor (<emu-xref href="#sec-dataview-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Date%
              </td>
              <td>
                `Date`
              </td>
              <td>
                The Date constructor (<emu-xref href="#sec-date-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %decodeURI%
              </td>
              <td>
                `decodeURI`
              </td>
              <td>
                The `decodeURI` function (<emu-xref href="#sec-decodeuri-encodeduri"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %decodeURIComponent%
              </td>
              <td>
                `decodeURIComponent`
              </td>
              <td>
                The `decodeURIComponent` function (<emu-xref href="#sec-decodeuricomponent-encodeduricomponent"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %encodeURI%
              </td>
              <td>
                `encodeURI`
              </td>
              <td>
                The `encodeURI` function (<emu-xref href="#sec-encodeuri-uri"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %encodeURIComponent%
              </td>
              <td>
                `encodeURIComponent`
              </td>
              <td>
                The `encodeURIComponent` function (<emu-xref href="#sec-encodeuricomponent-uricomponent"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Error%
              </td>
              <td>
                `Error`
              </td>
              <td>
                The Error constructor (<emu-xref href="#sec-error-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %eval%
              </td>
              <td>
                `eval`
              </td>
              <td>
                The `eval` function (<emu-xref href="#sec-eval-x"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %EvalError%
              </td>
              <td>
                `EvalError`
              </td>
              <td>
                The EvalError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-evalerror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %FinalizationRegistry%
              </td>
              <td>
                `FinalizationRegistry`
              </td>
              <td>
                The FinalizationRegistry constructor (<emu-xref href="#sec-finalization-registry-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Float32Array%
              </td>
              <td>
                `Float32Array`
              </td>
              <td>
                The Float32Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Float64Array%
              </td>
              <td>
                `Float64Array`
              </td>
              <td>
                The Float64Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %ForInIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of For-In iterator objects (<emu-xref href="#sec-for-in-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Function%
              </td>
              <td>
                `Function`
              </td>
              <td>
                The Function constructor (<emu-xref href="#sec-function-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %GeneratorFunction%
              </td>
              <td>
              </td>
              <td>
                The constructor of generator function objects (<emu-xref href="#sec-generatorfunction-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %GeneratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of generator objects (<emu-xref href="#sec-generator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Int8Array%
              </td>
              <td>
                `Int8Array`
              </td>
              <td>
                The Int8Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Int16Array%
              </td>
              <td>
                `Int16Array`
              </td>
              <td>
                The Int16Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Int32Array%
              </td>
              <td>
                `Int32Array`
              </td>
              <td>
                The Int32Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %isFinite%
              </td>
              <td>
                `isFinite`
              </td>
              <td>
                The `isFinite` function (<emu-xref href="#sec-isfinite-number"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %isNaN%
              </td>
              <td>
                `isNaN`
              </td>
              <td>
                The `isNaN` function (<emu-xref href="#sec-isnan-number"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Iterator%
              </td>
              <td>
                `Iterator`
              </td>
              <td>
                The `Iterator` constructor (<emu-xref href="#sec-iterator-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %IteratorHelperPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of Iterator Helper objects (<emu-xref href="#sec-%iteratorhelperprototype%-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %JSON%
              </td>
              <td>
                `JSON`
              </td>
              <td>
                The `JSON` object (<emu-xref href="#sec-json-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Map%
              </td>
              <td>
                `Map`
              </td>
              <td>
                The Map constructor (<emu-xref href="#sec-map-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %MapIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of Map Iterator objects (<emu-xref href="#sec-map-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Math%
              </td>
              <td>
                `Math`
              </td>
              <td>
                The `Math` object (<emu-xref href="#sec-math-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Number%
              </td>
              <td>
                `Number`
              </td>
              <td>
                The Number constructor (<emu-xref href="#sec-number-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Object%
              </td>
              <td>
                `Object`
              </td>
              <td>
                The Object constructor (<emu-xref href="#sec-object-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %parseFloat%
              </td>
              <td>
                `parseFloat`
              </td>
              <td>
                The `parseFloat` function (<emu-xref href="#sec-parsefloat-string"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %parseInt%
              </td>
              <td>
                `parseInt`
              </td>
              <td>
                The `parseInt` function (<emu-xref href="#sec-parseint-string-radix"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Promise%
              </td>
              <td>
                `Promise`
              </td>
              <td>
                The Promise constructor (<emu-xref href="#sec-promise-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Proxy%
              </td>
              <td>
                `Proxy`
              </td>
              <td>
                The Proxy constructor (<emu-xref href="#sec-proxy-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %RangeError%
              </td>
              <td>
                `RangeError`
              </td>
              <td>
                The RangeError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-rangeerror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %ReferenceError%
              </td>
              <td>
                `ReferenceError`
              </td>
              <td>
                The ReferenceError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-referenceerror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Reflect%
              </td>
              <td>
                `Reflect`
              </td>
              <td>
                The `Reflect` object (<emu-xref href="#sec-reflect-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %RegExp%
              </td>
              <td>
                `RegExp`
              </td>
              <td>
                The RegExp constructor (<emu-xref href="#sec-regexp-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %RegExpStringIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of RegExp String Iterator objects (<emu-xref href="#sec-regexp-string-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Set%
              </td>
              <td>
                `Set`
              </td>
              <td>
                The Set constructor (<emu-xref href="#sec-set-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %SetIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of Set Iterator objects (<emu-xref href="#sec-set-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %SharedArrayBuffer%
              </td>
              <td>
                `SharedArrayBuffer`
              </td>
              <td>
                The SharedArrayBuffer constructor (<emu-xref href="#sec-sharedarraybuffer-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %String%
              </td>
              <td>
                `String`
              </td>
              <td>
                The String constructor (<emu-xref href="#sec-string-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %StringIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of String Iterator objects (<emu-xref href="#sec-string-iterator-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Symbol%
              </td>
              <td>
                `Symbol`
              </td>
              <td>
                The Symbol constructor (<emu-xref href="#sec-symbol-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %SyntaxError%
              </td>
              <td>
                `SyntaxError`
              </td>
              <td>
                The SyntaxError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-syntaxerror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %ThrowTypeError%
              </td>
              <td>
              </td>
              <td>
                A function object that unconditionally throws a new instance of %TypeError%
              </td>
            </tr>
            <tr>
              <td>
                %TypedArray%
              </td>
              <td>
              </td>
              <td>
                The super class of all typed Array constructors (<emu-xref href="#sec-%typedarray%-intrinsic-object"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %TypeError%
              </td>
              <td>
                `TypeError`
              </td>
              <td>
                The TypeError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-typeerror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Uint8Array%
              </td>
              <td>
                `Uint8Array`
              </td>
              <td>
                The Uint8Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Uint8ClampedArray%
              </td>
              <td>
                `Uint8ClampedArray`
              </td>
              <td>
                The Uint8ClampedArray constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Uint16Array%
              </td>
              <td>
                `Uint16Array`
              </td>
              <td>
                The Uint16Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %Uint32Array%
              </td>
              <td>
                `Uint32Array`
              </td>
              <td>
                The Uint32Array constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %URIError%
              </td>
              <td>
                `URIError`
              </td>
              <td>
                The URIError constructor (<emu-xref href="#sec-native-error-types-used-in-this-standard-urierror"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %WeakMap%
              </td>
              <td>
                `WeakMap`
              </td>
              <td>
                The WeakMap constructor (<emu-xref href="#sec-weakmap-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %WeakRef%
              </td>
              <td>
                `WeakRef`
              </td>
              <td>
                The WeakRef constructor (<emu-xref href="#sec-weak-ref-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %WeakSet%
              </td>
              <td>
                `WeakSet`
              </td>
              <td>
                The WeakSet constructor (<emu-xref href="#sec-weakset-constructor"></emu-xref>)
              </td>
            </tr>
            <tr>
              <td>
                %WrapForValidIteratorPrototype%
              </td>
              <td>
              </td>
              <td>
                The prototype of wrapped iterator objects returned by Iterator.from (<emu-xref href="#sec-%wrapforvaliditeratorprototype%-object"></emu-xref>)
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>Additional entries in <emu-xref href="#table-additional-well-known-intrinsic-objects"></emu-xref>.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-ecmascript-specification-types">
    <h1>ECMAScript Specification Types</h1>
    <p>A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types include Reference Record, List, Completion Record, Property Descriptor, Environment Record, Abstract Closure, and Data Block. Specification type values are specification artefacts that do not necessarily correspond to any specific entity within an ECMAScript implementation. Specification type values may be used to describe intermediate results of ECMAScript expression evaluation but such values cannot be stored as properties of objects or values of ECMAScript language variables.</p>

    <emu-clause id="sec-enum-specification-type">
      <h1>The Enum Specification Type</h1>
      <p><dfn variants="enum,enums">Enums</dfn> are values which are internal to the specification and not directly observable from ECMAScript code. Enums are denoted using a ~sans-serif~ typeface. For instance, a Completion Record's [[Type]] field takes on values like ~normal~, ~return~, or ~throw~. Enums have no characteristics other than their name. The name of an enum serves no purpose other than to distinguish it from other enums, and implies nothing about its usage or meaning in context.</p>
    </emu-clause>

    <emu-clause id="sec-list-and-record-specification-type">
      <h1>The List and Record Specification Types</h1>
      <p>The <dfn variants="Lists">List</dfn> type is used to explain the evaluation of argument lists (see <emu-xref href="#sec-argument-lists"></emu-xref>) in `new` expressions, in function calls, and in other algorithms where a simple ordered list of values is needed. Values of the List type are simply ordered sequences of list elements containing the individual values. These sequences may be of any length. The elements of a list may be randomly accessed using 0-origin indices. For notational convenience an array-like syntax can be used to access List elements. For example, _arguments_[2] is shorthand for saying the 3<sup>rd</sup> element of the List _arguments_.</p>
      <p>When an algorithm iterates over the elements of a List without specifying an order, the order used is the order of the elements in the List.</p>
      <p>For notational convenience within this specification, a literal syntax can be used to express a new List value. For example, « 1, 2 » defines a List value that has two elements each of which is initialized to a specific value. A new empty List can be expressed as « ».</p>
      <p>In this specification, the phrase "the <dfn id="list-concatenation">list-concatenation</dfn> of _A_, _B_, ..." (where each argument is a possibly empty List) denotes a new List value whose elements are the concatenation of the elements (in order) of each of the arguments (in order).</p>
      <p>As applied to a List of Strings, the phrase "sorted according to <dfn id="lexicographic-code-unit-order">lexicographic code unit order</dfn>" means sorting by the numeric value of each code unit up to the length of the shorter string, and sorting the shorter string before the longer string if all are equal, as described in the abstract operation IsLessThan.</p>
      <p>The <dfn variants="Records">Record</dfn> type is used to describe data aggregations within the algorithms of this specification. A Record type value consists of one or more named fields. The value of each field is an ECMAScript language value or specification value. Field names are always enclosed in double brackets, for example [[Value]].</p>
      <p>For notational convenience within this specification, an object literal-like syntax can be used to express a Record value. For example, { [[Field1]]: 42, [[Field2]]: *false*, [[Field3]]: ~empty~ } defines a Record value that has three fields, each of which is initialized to a specific value. Field name order is not significant. Any fields that are not explicitly listed are considered to be absent.</p>
      <p>In specification text and algorithms, dot notation may be used to refer to a specific field of a Record value. For example, if R is the record shown in the previous paragraph then R.[[Field2]] is shorthand for “the field of R named [[Field2]]”.</p>
      <p>Schema for commonly used Record field combinations may be named, and that name may be used as a prefix to a literal Record value to identify the specific kind of aggregations that is being described. For example: PropertyDescriptor { [[Value]]: 42, [[Writable]]: *false*, [[Configurable]]: *true* }.</p>
    </emu-clause>

    <emu-clause id="sec-set-and-relation-specification-type">
      <h1>The Set and Relation Specification Types</h1>
      <p>The <em>Set</em> type is used to explain a collection of unordered elements for use in the memory model. It is distinct from the ECMAScript collection type of the same name. To disambiguate, instances of the ECMAScript collection are consistently referred to as "Set objects" within this specification. Values of the Set type are simple collections of elements, where no element appears more than once. Elements may be added to and removed from Sets. Sets may be unioned, intersected, or subtracted from each other.</p>
      <p>The <dfn variants="Relations">Relation</dfn> type is used to explain constraints on Sets. Values of the Relation type are Sets of ordered pairs of values from its value domain. For example, a Relation on events is a set of ordered pairs of events. For a Relation _R_ and two values _a_ and _b_ in the value domain of _R_, _a_ _R_ _b_ is shorthand for saying the ordered pair (_a_, _b_) is a member of _R_. A Relation is the <dfn id="least-relation">least Relation</dfn> with respect to some conditions when it is the smallest Relation that satisfies those conditions.</p>
      <p>A <dfn variants="strict partial orders">strict partial order</dfn> is a Relation value _R_ that satisfies the following.</p>
      <ul>
        <li>
          <p>For all _a_, _b_, and _c_ in _R_'s domain:</p>
          <ul>
            <li>It is not the case that _a_ _R_ _a_, and</li>
            <li>If _a_ _R_ _b_ and _b_ _R_ _c_, then _a_ _R_ _c_.</li>
          </ul>
        </li>
      </ul>
      <emu-note>
        <p>The two properties above are called irreflexivity and transitivity, respectively.</p>
      </emu-note>
      <p>A <dfn variants="strict total orders">strict total order</dfn> is a Relation value _R_ that satisfies the following.</p>
      <ul>
        <li>
          <p>For all _a_, _b_, and _c_ in _R_'s domain:</p>
          <ul>
            <li>_a_ is _b_ or _a_ _R_ _b_ or _b_ _R_ _a_, and</li>
            <li>It is not the case that _a_ _R_ _a_, and</li>
            <li>If _a_ _R_ _b_ and _b_ _R_ _c_, then _a_ _R_ _c_.</li>
          </ul>
        </li>
      </ul>
      <emu-note>
        <p>The three properties above are called totality, irreflexivity, and transitivity, respectively.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-completion-record-specification-type">
      <h1>The Completion Record Specification Type</h1>
      <p>The <dfn variants="Completion Records">Completion Record</dfn> specification type is used to explain the runtime propagation of values and control flow such as the behaviour of statements (`break`, `continue`, `return` and `throw`) that perform nonlocal transfers of control.</p>
      <p>Completion Records have the fields defined in <emu-xref href="#table-completion-record-fields"></emu-xref>.</p>
      <emu-table id="table-completion-record-fields" caption="Completion Record Fields" oldids="table-8">
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
              [[Type]]
            </td>
            <td>
              ~normal~, ~break~, ~continue~, ~return~, or ~throw~
            </td>
            <td>
              The type of completion that occurred.
            </td>
          </tr>
          <tr>
            <td>
              [[Value]]
            </td>
            <td>
              any value except a Completion Record
            </td>
            <td>
              The value that was produced.
            </td>
          </tr>
          <tr>
            <td>
              [[Target]]
            </td>
            <td>
              a String or ~empty~
            </td>
            <td>
              The target label for directed control transfers.
            </td>
          </tr>
        </table>
      </emu-table>
      <p>The following shorthand terms are sometimes used to refer to Completion Records.</p>
      <ul>
        <li><dfn variants="normal completions">normal completion</dfn> refers to any Completion Record with a [[Type]] value of ~normal~.</li>
        <li><dfn variants="break completions">break completion</dfn> refers to any Completion Record with a [[Type]] value of ~break~.</li>
        <li><dfn variants="continue completions">continue completion</dfn> refers to any Completion Record with a [[Type]] value of ~continue~.</li>
        <li><dfn variants="return completions">return completion</dfn> refers to any Completion Record with a [[Type]] value of ~return~.</li>
        <li><dfn variants="throw completions">throw completion</dfn> refers to any Completion Record with a [[Type]] value of ~throw~.</li>
        <li><dfn variants="abrupt completions">abrupt completion</dfn> refers to any Completion Record with a [[Type]] value other than ~normal~.</li>
        <li>a <dfn variants="normal completions containing">normal completion containing</dfn> some type of value refers to a normal completion that has a value of that type in its [[Value]] field.</li>
      </ul>
      <p>Callable objects that are defined in this specification only return a normal completion or a throw completion. Returning any other kind of Completion Record is considered an editorial error.</p>
      <p>Implementation-defined callable objects must return either a normal completion or a throw completion.</p>

      <emu-clause id="sec-normalcompletion" type="abstract operation">
        <h1>
          NormalCompletion (
            _value_: any value except a Completion Record,
          ): a normal completion
        </h1>
        <dl class="header">
          <dt>skip return checks</dt>
          <dd>true</dd>
        </dl>
        <emu-alg>
          1. Return Completion Record { [[Type]]: ~normal~, [[Value]]: _value_, [[Target]]: ~empty~ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-throwcompletion" type="abstract operation">
        <h1>
          ThrowCompletion (
            _value_: an ECMAScript language value,
          ): a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return Completion Record { [[Type]]: ~throw~, [[Value]]: _value_, [[Target]]: ~empty~ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-returncompletion" type="abstract operation">
        <h1>
          ReturnCompletion (
            _value_: an ECMAScript language value,
          ): a return completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return Completion Record { [[Type]]: ~return~, [[Value]]: _value_, [[Target]]: ~empty~ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-updateempty" type="abstract operation">
        <h1>
          UpdateEmpty (
            _completionRecord_: a Completion Record,
            _value_: any value except a Completion Record,
          ): a Completion Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: If _completionRecord_ is either a return completion or a throw completion, then _completionRecord_.[[Value]] is not ~empty~.
          1. If _completionRecord_.[[Value]] is not ~empty~, return ? _completionRecord_.
          1. Return Completion Record { [[Type]]: _completionRecord_.[[Type]], [[Value]]: _value_, [[Target]]: _completionRecord_.[[Target]] }.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-reference-record-specification-type" oldids="sec-reference-specification-type">
      <h1>The Reference Record Specification Type</h1>
      <p>The <dfn variants="Reference Records">Reference Record</dfn> type is used to explain the behaviour of such operators as `delete`, `typeof`, the assignment operators, the `super` keyword and other language features. For example, the left-hand operand of an assignment is expected to produce a Reference Record.</p>
      <p>A Reference Record is a resolved name or (possibly not-yet-resolved) property binding; its fields are defined by <emu-xref href="#table-reference-record-fields"></emu-xref>.</p>

      <emu-table id="table-reference-record-fields" caption="Reference Record Fields">
        <table>
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Value</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tr>
            <td oldids="sec-getbase,ao-getbase">[[Base]]</td>
            <td>an ECMAScript language value, an Environment Record, or ~unresolvable~</td>
            <td>The value or Environment Record which holds the binding. A [[Base]] of ~unresolvable~ indicates that the binding could not be resolved.</td>
          </tr>
          <tr>
            <td oldids="sec-getreferencedname,ao-getreferencedname">[[ReferencedName]]</td>
            <td>an ECMAScript language value or a Private Name</td>
            <td>The name of the binding. Always a String if [[Base]] value is an Environment Record. Otherwise, may be an ECMAScript language value other than a String or a Symbol until ToPropertyKey is performed.</td>
          </tr>
          <tr>
            <td oldids="sec-isstrictreference,ao-isstrictreference">[[Strict]]</td>
            <td>a Boolean</td>
            <td>*true* if the Reference Record originated in strict mode code, *false* otherwise.</td>
          </tr>
          <tr>
            <td>[[ThisValue]]</td>
            <td>an ECMAScript language value or ~empty~</td>
            <td>If not ~empty~, the Reference Record represents a property binding that was expressed using the `super` keyword; it is called a <dfn id="super-reference-record" oldids="super-reference" variants="Super Reference Records">Super Reference Record</dfn> and its [[Base]] value will never be an Environment Record. In that case, the [[ThisValue]] field holds the *this* value at the time the Reference Record was created.</td>
          </tr>
        </table>
      </emu-table>

      <p>The following abstract operations are used in this specification to operate upon Reference Records:</p>

      <emu-clause id="sec-ispropertyreference" type="abstract operation" oldids="ao-ispropertyreference">
        <h1>
          IsPropertyReference (
            _V_: a Reference Record,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_.[[Base]] is ~unresolvable~, return *false*.
          1. If _V_.[[Base]] is an Environment Record, return *false*; otherwise return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isunresolvablereference" type="abstract operation" oldids="ao-isunresolvablereference">
        <h1>
          IsUnresolvableReference (
            _V_: a Reference Record,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_.[[Base]] is ~unresolvable~, return *true*; otherwise return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-issuperreference" type="abstract operation" oldids="ao-issuperreference">
        <h1>
          IsSuperReference (
            _V_: a Reference Record,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_.[[ThisValue]] is not ~empty~, return *true*; otherwise return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isprivatereference" type="abstract operation">
        <h1>
          IsPrivateReference (
            _V_: a Reference Record,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_.[[ReferencedName]] is a Private Name, return *true*; otherwise return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getvalue" type="abstract operation">
        <h1>
          GetValue (
            _V_: a Reference Record or an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_ is not a Reference Record, return _V_.
          1. If IsUnresolvableReference(_V_) is *true*, throw a *ReferenceError* exception.
          1. If IsPropertyReference(_V_) is *true*, then
            1. [id="step-getvalue-toobject"] Let _baseObj_ be ? ToObject(_V_.[[Base]]).
            1. If IsPrivateReference(_V_) is *true*, then
              1. Return ? PrivateGet(_baseObj_, _V_.[[ReferencedName]]).
            1. If _V_.[[ReferencedName]] is not a property key, then
              1. Set _V_.[[ReferencedName]] to ? ToPropertyKey(_V_.[[ReferencedName]]).
            1. Return ? <emu-meta effects="user-code">_baseObj_.[[Get]]</emu-meta>(_V_.[[ReferencedName]], GetThisValue(_V_)).
          1. Else,
            1. Let _base_ be _V_.[[Base]].
            1. Assert: _base_ is an Environment Record.
            1. Return ? <emu-meta effects="user-code">_base_.GetBindingValue</emu-meta>(_V_.[[ReferencedName]], _V_.[[Strict]]) (see <emu-xref href="#sec-environment-records"></emu-xref>).
        </emu-alg>
        <emu-note>
          <p>The object that may be created in step <emu-xref href="#step-getvalue-toobject"></emu-xref> is not accessible outside of the above abstract operation and the ordinary object [[Get]] internal method. An implementation might choose to avoid the actual creation of the object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-putvalue" type="abstract operation">
        <h1>
          PutValue (
            _V_: a Reference Record or an ECMAScript language value,
            _W_: an ECMAScript language value,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _V_ is not a Reference Record, throw a *ReferenceError* exception.
          1. If IsUnresolvableReference(_V_) is *true*, then
            1. If _V_.[[Strict]] is *true*, throw a *ReferenceError* exception.
            1. Let _globalObj_ be GetGlobalObject().
            1. Perform ? Set(_globalObj_, _V_.[[ReferencedName]], _W_, *false*).
            1. Return ~unused~.
          1. If IsPropertyReference(_V_) is *true*, then
            1. [id="step-putvalue-toobject"] Let _baseObj_ be ? ToObject(_V_.[[Base]]).
            1. If IsPrivateReference(_V_) is *true*, then
              1. Return ? PrivateSet(_baseObj_, _V_.[[ReferencedName]], _W_).
            1. If _V_.[[ReferencedName]] is not a property key, then
              1. Set _V_.[[ReferencedName]] to ? ToPropertyKey(_V_.[[ReferencedName]]).
            1. Let _succeeded_ be ? <emu-meta effects="user-code">_baseObj_.[[Set]]</emu-meta>(_V_.[[ReferencedName]], _W_, GetThisValue(_V_)).
            1. If _succeeded_ is *false* and _V_.[[Strict]] is *true*, throw a *TypeError* exception.
            1. Return ~unused~.
          1. Else,
            1. Let _base_ be _V_.[[Base]].
            1. Assert: _base_ is an Environment Record.
            1. Return ? <emu-meta effects="user-code">_base_.SetMutableBinding</emu-meta>(_V_.[[ReferencedName]], _W_, _V_.[[Strict]]) (see <emu-xref href="#sec-environment-records"></emu-xref>).
        </emu-alg>
        <emu-note>
          <p>The object that may be created in step <emu-xref href="#step-putvalue-toobject"></emu-xref> is not accessible outside of the above abstract operation and the ordinary object [[Set]] internal method. An implementation might choose to avoid the actual creation of that object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-getthisvalue" type="abstract operation">
        <h1>
          GetThisValue (
            _V_: a Reference Record,
          ): an ECMAScript language value
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsPropertyReference(_V_) is *true*.
          1. If IsSuperReference(_V_) is *true*, return _V_.[[ThisValue]]; otherwise return _V_.[[Base]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-initializereferencedbinding" type="abstract operation">
        <h1>
          InitializeReferencedBinding (
            _V_: a Reference Record,
            _W_: an ECMAScript language value,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsUnresolvableReference(_V_) is *false*.
          1. Let _base_ be _V_.[[Base]].
          1. Assert: _base_ is an Environment Record.
          1. Return ? _base_.InitializeBinding(_V_.[[ReferencedName]], _W_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-makeprivatereference" type="abstract operation">
        <h1>
          MakePrivateReference (
            _baseValue_: an ECMAScript language value,
            _privateIdentifier_: a String,
          ): a Reference Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
          1. Assert: _privateEnv_ is not *null*.
          1. Let _privateName_ be ResolvePrivateIdentifier(_privateEnv_, _privateIdentifier_).
          1. Return the Reference Record { [[Base]]: _baseValue_, [[ReferencedName]]: _privateName_, [[Strict]]: *true*, [[ThisValue]]: ~empty~ }.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-property-descriptor-specification-type">
      <h1>The Property Descriptor Specification Type</h1>
      <p>The <dfn variants="Property Descriptors">Property Descriptor</dfn> type is used to explain the manipulation and reification of Object property attributes. A Property Descriptor is a Record with zero or more fields, where each field's name is an attribute name and its value is a corresponding attribute value as specified in <emu-xref href="#sec-property-attributes"></emu-xref>. The schema name used within this specification to tag literal descriptions of Property Descriptor records is “PropertyDescriptor”.</p>
      <p>Property Descriptor values may be further classified as data Property Descriptors and accessor Property Descriptors based upon the existence or use of certain fields. A data Property Descriptor is one that includes any fields named either [[Value]] or [[Writable]]. An accessor Property Descriptor is one that includes any fields named either [[Get]] or [[Set]]. Any Property Descriptor may have fields named [[Enumerable]] and [[Configurable]]. A Property Descriptor value may not be both a data Property Descriptor and an accessor Property Descriptor; however, it may be neither (in which case it is a generic Property Descriptor). A <dfn>fully populated Property Descriptor</dfn> is one that is either an accessor Property Descriptor or a data Property Descriptor and that has all of the corresponding fields defined in <emu-xref href="#table-object-property-attributes"></emu-xref>.</p>
      <p>The following abstract operations are used in this specification to operate upon Property Descriptor values:</p>

      <emu-clause id="sec-isaccessordescriptor" type="abstract operation">
        <h1>
          IsAccessorDescriptor (
            _Desc_: a Property Descriptor or *undefined*,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Desc_ is *undefined*, return *false*.
          1. If _Desc_ has a [[Get]] field, return *true*.
          1. If _Desc_ has a [[Set]] field, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isdatadescriptor" type="abstract operation">
        <h1>
          IsDataDescriptor (
            _Desc_: a Property Descriptor or *undefined*,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Desc_ is *undefined*, return *false*.
          1. If _Desc_ has a [[Value]] field, return *true*.
          1. If _Desc_ has a [[Writable]] field, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isgenericdescriptor" type="abstract operation">
        <h1>
          IsGenericDescriptor (
            _Desc_: a Property Descriptor or *undefined*,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Desc_ is *undefined*, return *false*.
          1. If IsAccessorDescriptor(_Desc_) is *true*, return *false*.
          1. If IsDataDescriptor(_Desc_) is *true*, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-frompropertydescriptor" type="abstract operation">
        <h1>
          FromPropertyDescriptor (
            _Desc_: a Property Descriptor or *undefined*,
          ): an Object or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Desc_ is *undefined*, return *undefined*.
          1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Assert: _obj_ is an extensible ordinary object with no own properties.
          1. If _Desc_ has a [[Value]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"value"*, _Desc_.[[Value]]).
          1. If _Desc_ has a [[Writable]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"writable"*, _Desc_.[[Writable]]).
          1. If _Desc_ has a [[Get]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"get"*, _Desc_.[[Get]]).
          1. If _Desc_ has a [[Set]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"set"*, _Desc_.[[Set]]).
          1. If _Desc_ has an [[Enumerable]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"enumerable"*, _Desc_.[[Enumerable]]).
          1. If _Desc_ has a [[Configurable]] field, then
            1. Perform ! CreateDataPropertyOrThrow(_obj_, *"configurable"*, _Desc_.[[Configurable]]).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-topropertydescriptor" type="abstract operation">
        <h1>
          ToPropertyDescriptor (
            _Obj_: an ECMAScript language value,
          ): either a normal completion containing a Property Descriptor or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Obj_ is not an Object, throw a *TypeError* exception.
          1. Let _desc_ be a new Property Descriptor that initially has no fields.
          1. Let _hasEnumerable_ be ? HasProperty(_Obj_, *"enumerable"*).
          1. If _hasEnumerable_ is *true*, then
            1. Let _enumerable_ be ToBoolean(? Get(_Obj_, *"enumerable"*)).
            1. Set _desc_.[[Enumerable]] to _enumerable_.
          1. Let _hasConfigurable_ be ? HasProperty(_Obj_, *"configurable"*).
          1. If _hasConfigurable_ is *true*, then
            1. Let _configurable_ be ToBoolean(? Get(_Obj_, *"configurable"*)).
            1. Set _desc_.[[Configurable]] to _configurable_.
          1. Let _hasValue_ be ? HasProperty(_Obj_, *"value"*).
          1. If _hasValue_ is *true*, then
            1. Let _value_ be ? Get(_Obj_, *"value"*).
            1. Set _desc_.[[Value]] to _value_.
          1. Let _hasWritable_ be ? HasProperty(_Obj_, *"writable"*).
          1. If _hasWritable_ is *true*, then
            1. Let _writable_ be ToBoolean(? Get(_Obj_, *"writable"*)).
            1. Set _desc_.[[Writable]] to _writable_.
          1. Let _hasGet_ be ? HasProperty(_Obj_, *"get"*).
          1. If _hasGet_ is *true*, then
            1. Let _getter_ be ? Get(_Obj_, *"get"*).
            1. If IsCallable(_getter_) is *false* and _getter_ is not *undefined*, throw a *TypeError* exception.
            1. Set _desc_.[[Get]] to _getter_.
          1. Let _hasSet_ be ? HasProperty(_Obj_, *"set"*).
          1. If _hasSet_ is *true*, then
            1. Let _setter_ be ? Get(_Obj_, *"set"*).
            1. If IsCallable(_setter_) is *false* and _setter_ is not *undefined*, throw a *TypeError* exception.
            1. Set _desc_.[[Set]] to _setter_.
          1. If _desc_ has a [[Get]] field or _desc_ has a [[Set]] field, then
            1. If _desc_ has a [[Value]] field or _desc_ has a [[Writable]] field, throw a *TypeError* exception.
          1. Return _desc_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-completepropertydescriptor" type="abstract operation">
        <h1>
          CompletePropertyDescriptor (
            _Desc_: a Property Descriptor,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _like_ be the Record { [[Value]]: *undefined*, [[Writable]]: *false*, [[Get]]: *undefined*, [[Set]]: *undefined*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.
          1. If IsGenericDescriptor(_Desc_) is *true* or IsDataDescriptor(_Desc_) is *true*, then
            1. If _Desc_ does not have a [[Value]] field, set _Desc_.[[Value]] to _like_.[[Value]].
            1. If _Desc_ does not have a [[Writable]] field, set _Desc_.[[Writable]] to _like_.[[Writable]].
          1. Else,
            1. If _Desc_ does not have a [[Get]] field, set _Desc_.[[Get]] to _like_.[[Get]].
            1. If _Desc_ does not have a [[Set]] field, set _Desc_.[[Set]] to _like_.[[Set]].
          1. If _Desc_ does not have an [[Enumerable]] field, set _Desc_.[[Enumerable]] to _like_.[[Enumerable]].
          1. If _Desc_ does not have a [[Configurable]] field, set _Desc_.[[Configurable]] to _like_.[[Configurable]].
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-lexical-environment-and-environment-record-specification-types">
      <h1>The Environment Record Specification Type</h1>
      <p>The Environment Record type is used to explain the behaviour of name resolution in nested functions and blocks. This type and the operations upon it are defined in <emu-xref href="#sec-environment-records"></emu-xref>.</p>
    </emu-clause>

    <emu-clause id="sec-abstract-closure">
      <h1>The Abstract Closure Specification Type</h1>
      <p>The <dfn variants="Abstract Closures">Abstract Closure</dfn> specification type is used to refer to algorithm steps together with a collection of values. Abstract Closures are meta-values and are invoked using function application style such as _closure_(_arg1_, _arg2_). Like abstract operations, invocations perform the algorithm steps described by the Abstract Closure.</p>
      <p>In algorithm steps that create an Abstract Closure, values are captured with the verb "capture" followed by a list of aliases. When an Abstract Closure is created, it captures the value that is associated with each alias at that time. In steps that specify the algorithm to be performed when an Abstract Closure is called, each captured value is referred to by the alias that was used to capture the value.</p>
      <p>If an Abstract Closure returns a Completion Record, that Completion Record must be either a normal completion or a throw completion.</p>
      <p>Abstract Closures are created inline as part of other algorithms, shown in the following example.</p>
      <emu-alg example>
        1. Let _addend_ be 41.
        1. Let _closure_ be a new Abstract Closure with parameters (_x_) that captures _addend_ and performs the following steps when called:
          1. Return _x_ + _addend_.
        1. Let _val_ be _closure_(1).
        1. Assert: _val_ is 42.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-data-blocks">
      <h1>Data Blocks</h1>
      <p>The <dfn variants="Data Blocks">Data Block</dfn> specification type is used to describe a distinct and mutable sequence of byte-sized (8 bit) numeric values. A <dfn variants="byte values">byte value</dfn> is an integer in the inclusive interval from 0 to 255. A Data Block value is created with a fixed number of bytes that each have the initial value 0.</p>
      <p>For notational convenience within this specification, an array-like syntax can be used to access the individual bytes of a Data Block value. This notation presents a Data Block value as a 0-based <emu-not-ref>integer-indexed</emu-not-ref> sequence of bytes. For example, if _db_ is a 5 byte Data Block value then _db_[2] can be used to access its 3<sup>rd</sup> byte.</p>
      <p>A data block that resides in memory that can be referenced from multiple agents concurrently is designated a <dfn variants="Shared Data Blocks">Shared Data Block</dfn>. A Shared Data Block has an identity (for the purposes of equality testing Shared Data Block values) that is <em>address-free</em>: it is tied not to the virtual addresses the block is mapped to in any process, but to the set of locations in memory that the block represents. Two data blocks are equal only if the sets of the locations they contain are equal; otherwise, they are not equal and the intersection of the sets of locations they contain is empty. Finally, Shared Data Blocks can be distinguished from Data Blocks.</p>
      <p>The semantics of Shared Data Blocks is defined using Shared Data Block events by the memory model. Abstract operations below introduce Shared Data Block events and act as the interface between evaluation semantics and the event semantics of the memory model. The events form a candidate execution, on which the memory model acts as a filter. Please consult the memory model for full semantics.</p>
      <p>Shared Data Block events are modelled by Records, defined in the memory model.</p>
      <p>The following abstract operations are used in this specification to operate upon Data Block values:</p>

      <emu-clause id="sec-createbytedatablock" type="abstract operation">
        <h1>
          CreateByteDataBlock (
            _size_: a non-negative integer,
          ): either a normal completion containing a Data Block or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _size_ > 2<sup>53</sup> - 1, throw a *RangeError* exception.
          1. Let _db_ be a new Data Block value consisting of _size_ bytes. If it is impossible to create such a Data Block, throw a *RangeError* exception.
          1. Set all of the bytes of _db_ to 0.
          1. Return _db_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createsharedbytedatablock" type="abstract operation">
        <h1>
          CreateSharedByteDataBlock (
            _size_: a non-negative integer,
          ): either a normal completion containing a Shared Data Block or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _db_ be a new Shared Data Block value consisting of _size_ bytes. If it is impossible to create such a Shared Data Block, throw a *RangeError* exception.
          1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
          1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
          1. Let _zero_ be « 0 ».
          1. For each index _i_ of _db_, do
            1. Append WriteSharedMemory { [[Order]]: ~init~, [[NoTear]]: *true*, [[Block]]: _db_, [[ByteIndex]]: _i_, [[ElementSize]]: 1, [[Payload]]: _zero_ } to _eventsRecord_.[[EventList]].
          1. Return _db_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-copydatablockbytes" type="abstract operation">
        <h1>
          CopyDataBlockBytes (
            _toBlock_: a Data Block or a Shared Data Block,
            _toIndex_: a non-negative integer,
            _fromBlock_: a Data Block or a Shared Data Block,
            _fromIndex_: a non-negative integer,
            _count_: a non-negative integer,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _fromBlock_ and _toBlock_ are distinct values.
          1. Let _fromSize_ be the number of bytes in _fromBlock_.
          1. Assert: _fromIndex_ + _count_ ≤ _fromSize_.
          1. Let _toSize_ be the number of bytes in _toBlock_.
          1. Assert: _toIndex_ + _count_ ≤ _toSize_.
          1. Repeat, while _count_ > 0,
            1. If _fromBlock_ is a Shared Data Block, then
              1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
              1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
              1. Let _bytes_ be a List whose sole element is a nondeterministically chosen byte value.
              1. NOTE: In implementations, _bytes_ is the result of a non-atomic read instruction on the underlying hardware. The nondeterminism is a semantic prescription of the memory model to describe observable behaviour of hardware with weak consistency.
              1. Let _readEvent_ be ReadSharedMemory { [[Order]]: ~unordered~, [[NoTear]]: *true*, [[Block]]: _fromBlock_, [[ByteIndex]]: _fromIndex_, [[ElementSize]]: 1 }.
              1. Append _readEvent_ to _eventsRecord_.[[EventList]].
              1. Append Chosen Value Record { [[Event]]: _readEvent_, [[ChosenValue]]: _bytes_ } to _execution_.[[ChosenValues]].
              1. If _toBlock_ is a Shared Data Block, then
                1. Append WriteSharedMemory { [[Order]]: ~unordered~, [[NoTear]]: *true*, [[Block]]: _toBlock_, [[ByteIndex]]: _toIndex_, [[ElementSize]]: 1, [[Payload]]: _bytes_ } to _eventsRecord_.[[EventList]].
              1. Else,
                1. Set _toBlock_[_toIndex_] to _bytes_[0].
            1. Else,
              1. Assert: _toBlock_ is not a Shared Data Block.
              1. Set _toBlock_[_toIndex_] to _fromBlock_[_fromIndex_].
            1. Set _toIndex_ to _toIndex_ + 1.
            1. Set _fromIndex_ to _fromIndex_ + 1.
            1. Set _count_ to _count_ - 1.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-privateelement-specification-type">
      <h1>The PrivateElement Specification Type</h1>
      <p>The PrivateElement type is a Record used in the specification of private class fields, methods, and accessors. Although Property Descriptors are not used for private elements, private fields behave similarly to non-configurable, non-enumerable, writable data properties, private methods behave similarly to non-configurable, non-enumerable, non-writable data properties, and private accessors behave similarly to non-configurable, non-enumerable accessor properties.</p>
      <p>Values of the PrivateElement type are Record values whose fields are defined by <emu-xref href="#table-privateelement-fields"></emu-xref>. Such values are referred to as <dfn variants="PrivateElement">PrivateElements</dfn>.</p>
      <emu-table id="table-privateelement-fields" caption="PrivateElement Fields">
        <table>
          <thead>
            <tr>
              <th>
                Field Name
              </th>
              <th>
                Values of the [[Kind]] field for which it is present
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
              [[Key]]
            </td>
            <td>
              All
            </td>
            <td>
              a Private Name
            </td>
            <td>
              The name of the field, method, or accessor.
            </td>
          </tr>
          <tr>
            <td>
              [[Kind]]
            </td>
            <td>
              All
            </td>
            <td>
              ~field~, ~method~, or ~accessor~
            </td>
            <td>
              The kind of the element.
            </td>
          </tr>
          <tr>
            <td>
              [[Value]]
            </td>
            <td>
              ~field~ and ~method~
            </td>
            <td>
              an ECMAScript language value
            </td>
            <td>
              The value of the field.
            </td>
          </tr>
          <tr>
            <td>
              [[Get]]
            </td>
            <td>
              ~accessor~
            </td>
            <td>
              a function object or *undefined*
            </td>
            <td>
              The getter for a private accessor.
            </td>
          </tr>
          <tr>
            <td>
              [[Set]]
            </td>
            <td>
              ~accessor~
            </td>
            <td>
              a function object or *undefined*
            </td>
            <td>
              The setter for a private accessor.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-classfielddefinition-record-specification-type">
      <h1>The ClassFieldDefinition Record Specification Type</h1>
      <p>The ClassFieldDefinition type is a Record used in the specification of class fields.</p>
      <p>Values of the ClassFieldDefinition type are Record values whose fields are defined by <emu-xref href="#table-classfielddefinition-fields"></emu-xref>. Such values are referred to as <dfn variants="ClassFieldDefinition Record">ClassFieldDefinition Records</dfn>.</p>
      <emu-table id="table-classfielddefinition-fields" caption="ClassFieldDefinition Record Fields">
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
              [[Name]]
            </td>
            <td>
              a Private Name, a String, or a Symbol
            </td>
            <td>
              The name of the field.
            </td>
          </tr>
          <tr>
            <td>
              [[Initializer]]
            </td>
            <td>
              an ECMAScript function object or ~empty~
            </td>
            <td>
              The initializer of the field, if any.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-private-names">
      <h1>Private Names</h1>
      <p>The <dfn variants="Private Names">Private Name</dfn> specification type is used to describe a globally unique value (one which differs from any other Private Name, even if they are otherwise indistinguishable) which represents the key of a private class element (field, method, or accessor). Each Private Name has an associated immutable [[Description]] which is a String value. A Private Name may be installed on any ECMAScript object with PrivateFieldAdd or PrivateMethodOrAccessorAdd, and then read or written using PrivateGet and PrivateSet.</p>
    </emu-clause>

    <emu-clause id="sec-classstaticblockdefinition-record-specification-type">
      <h1>The ClassStaticBlockDefinition Record Specification Type</h1>
      <p>A <dfn variants="ClassStaticBlockDefinition Records">ClassStaticBlockDefinition Record</dfn> is a Record value used to encapsulate the executable code for a class static initialization block.</p>
      <p>ClassStaticBlockDefinition Records have the fields listed in <emu-xref href="#table-classstaticblockdefinition-record-fields"></emu-xref>.</p>
      <emu-table id="table-classstaticblockdefinition-record-fields" caption="ClassStaticBlockDefinition Record Fields">
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
              [[BodyFunction]]
            </td>
            <td>
              an ECMAScript function object
            </td>
            <td>
              The function object to be called during static initialization of a class.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>
  </emu-clause>

<h1 id="sec-abstract-operations"></h1>
