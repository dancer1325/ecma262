# Text Processing

  <emu-clause id="sec-string-objects">
    <h1>String Objects</h1>

    <emu-clause id="sec-string-constructor">
      <h1>The String Constructor</h1>
      <p>The String constructor:</p>
      <ul>
        <li>is <dfn>%String%</dfn>.</li>
        <li>is the initial value of the *"String"* property of the global object.</li>
        <li>creates and initializes a new String object when called as a constructor.</li>
        <li>performs a type conversion when called as a function rather than as a constructor.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified String behaviour must include a `super` call to the String constructor to create and initialize the subclass instance with a [[StringData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-string-constructor-string-value">
        <h1>String ( _value_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _value_ is not present, then
            1. Let _s_ be the empty String.
          1. Else,
            1. If NewTarget is *undefined* and _value_ is a Symbol, return SymbolDescriptiveString(_value_).
            1. Let _s_ be ? ToString(_value_).
          1. If NewTarget is *undefined*, return _s_.
          1. Return StringCreate(_s_, ? GetPrototypeFromConstructor(NewTarget, *"%String.prototype%"*)).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-string-constructor">
      <h1>Properties of the String Constructor</h1>
      <p>The String constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-string.fromcharcode">
        <h1>String.fromCharCode ( ..._codeUnits_ )</h1>
        <p>This function may be called with any number of arguments which form the rest parameter _codeUnits_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _result_ be the empty String.
          1. For each element _next_ of _codeUnits_, do
            1. Let _nextCU_ be the code unit whose numeric value is ℝ(? ToUint16(_next_)).
            1. Set _result_ to the string-concatenation of _result_ and _nextCU_.
          1. Return _result_.
        </emu-alg>
        <p>The *"length"* property of this function is *1*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-string.fromcodepoint">
        <h1>String.fromCodePoint ( ..._codePoints_ )</h1>
        <p>This function may be called with any number of arguments which form the rest parameter _codePoints_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _result_ be the empty String.
          1. For each element _next_ of _codePoints_, do
            1. Let _nextCP_ be ? ToNumber(_next_).
            1. If _nextCP_ is not an integral Number, throw a *RangeError* exception.
            1. If ℝ(_nextCP_) &lt; 0 or ℝ(_nextCP_) > 0x10FFFF, throw a *RangeError* exception.
            1. Set _result_ to the string-concatenation of _result_ and UTF16EncodeCodePoint(ℝ(_nextCP_)).
          1. Assert: If _codePoints_ is empty, then _result_ is the empty String.
          1. Return _result_.
        </emu-alg>
        <p>The *"length"* property of this function is *1*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-string.prototype">
        <h1>String.prototype</h1>
        <p>The initial value of `String.prototype` is the String prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-string.raw">
        <h1>String.raw ( _template_, ..._substitutions_ )</h1>
        <p>This function may be called with a variable number of arguments. The first argument is _template_ and the remainder of the arguments form the List _substitutions_.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _substitutionCount_ be the number of elements in _substitutions_.
          1. Let _cooked_ be ? ToObject(_template_).
          1. Let _literals_ be ? ToObject(? Get(_cooked_, *"raw"*)).
          1. Let _literalCount_ be ? LengthOfArrayLike(_literals_).
          1. If _literalCount_ ≤ 0, return the empty String.
          1. Let _R_ be the empty String.
          1. Let _nextIndex_ be 0.
          1. Repeat,
            1. Let _nextLiteralVal_ be ? Get(_literals_, ! ToString(𝔽(_nextIndex_))).
            1. Let _nextLiteral_ be ? ToString(_nextLiteralVal_).
            1. Set _R_ to the string-concatenation of _R_ and _nextLiteral_.
            1. If _nextIndex_ + 1 = _literalCount_, return _R_.
            1. If _nextIndex_ &lt; _substitutionCount_, then
              1. Let _nextSubVal_ be _substitutions_[_nextIndex_].
              1. Let _nextSub_ be ? ToString(_nextSubVal_).
              1. Set _R_ to the string-concatenation of _R_ and _nextSub_.
            1. Set _nextIndex_ to _nextIndex_ + 1.
        </emu-alg>
        <emu-note>
          <p>This function is intended for use as a tag function of a Tagged Template (<emu-xref href="#sec-tagged-templates"></emu-xref>). When called as such, the first argument will be a well formed template object and the rest parameter will contain the substitution values.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-string-prototype-object">
      <h1>Properties of the String Prototype Object</h1>
      <p>The <dfn>String prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%String.prototype%</dfn>.</li>
        <li>is a String exotic object and has the internal methods specified for such objects.</li>
        <li>has a [[StringData]] internal slot whose value is the empty String.</li>
        <li>has a *"length"* property whose initial value is *+0*<sub>𝔽</sub> and whose attributes are { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <p>Unless explicitly stated otherwise, the methods of the String prototype object defined below are not generic and the *this* value passed to them must be either a String value or an object that has a [[StringData]] internal slot that has been initialized to a String value.</p>

      <emu-clause id="sec-string.prototype.at">
        <h1>String.prototype.at ( _index_ )</h1>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _len_ be the length of _S_.
          1. Let _relativeIndex_ be ? ToIntegerOrInfinity(_index_).
          1. If _relativeIndex_ ≥ 0, then
            1. Let _k_ be _relativeIndex_.
          1. Else,
            1. Let _k_ be _len_ + _relativeIndex_.
          1. If _k_ &lt; 0 or _k_ ≥ _len_, return *undefined*.
          1. Return the substring of _S_ from _k_ to _k_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string.prototype.charat">
        <h1>String.prototype.charAt ( _pos_ )</h1>
        <emu-note>
          <p>This method returns a single element String containing the code unit at index _pos_ within the String value resulting from converting this object to a String. If there is no element at that index, the result is the empty String. The result is a String value, not a String object.</p>
          <p>If `pos` is an integral Number, then the result of `x.charAt(pos)` is equivalent to the result of `x.substring(pos, pos + 1)`.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _position_ be ? ToIntegerOrInfinity(_pos_).
          1. Let _size_ be the length of _S_.
          1. If _position_ &lt; 0 or _position_ ≥ _size_, return the empty String.
          1. Return the substring of _S_ from _position_ to _position_ + 1.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.charcodeat">
        <h1>String.prototype.charCodeAt ( _pos_ )</h1>
        <emu-note>
          <p>This method returns a Number (a non-negative integral Number less than 2<sup>16</sup>) that is the numeric value of the code unit at index _pos_ within the String resulting from converting this object to a String. If there is no element at that index, the result is *NaN*.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _position_ be ? ToIntegerOrInfinity(_pos_).
          1. Let _size_ be the length of _S_.
          1. If _position_ &lt; 0 or _position_ ≥ _size_, return *NaN*.
          1. Return the Number value for the numeric value of the code unit at index _position_ within the String _S_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.codepointat">
        <h1>String.prototype.codePointAt ( _pos_ )</h1>
        <emu-note>
          <p>This method returns a non-negative integral Number less than or equal to *0x10FFFF*<sub>𝔽</sub> that is the numeric value of the UTF-16 encoded code point (<emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>) starting at the string element at index _pos_ within the String resulting from converting this object to a String. If there is no element at that index, the result is *undefined*. If a valid UTF-16 surrogate pair does not begin at _pos_, the result is the code unit at _pos_.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _position_ be ? ToIntegerOrInfinity(_pos_).
          1. Let _size_ be the length of _S_.
          1. If _position_ &lt; 0 or _position_ ≥ _size_, return *undefined*.
          1. Let _cp_ be CodePointAt(_S_, _position_).
          1. Return 𝔽(_cp_.[[CodePoint]]).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.concat">
        <h1>String.prototype.concat ( ..._args_ )</h1>
        <emu-note>
          <p>When this method is called it returns the String value consisting of the code units of the *this* value (converted to a String) followed by the code units of each of the arguments converted to a String. The result is a String value, not a String object.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _R_ be _S_.
          1. For each element _next_ of _args_, do
            1. Let _nextString_ be ? ToString(_next_).
            1. Set _R_ to the string-concatenation of _R_ and _nextString_.
          1. Return _R_.
        </emu-alg>
        <p>The *"length"* property of this method is *1*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.constructor">
        <h1>String.prototype.constructor</h1>
        <p>The initial value of `String.prototype.constructor` is %String%.</p>
      </emu-clause>

      <emu-clause id="sec-string.prototype.endswith">
        <h1>String.prototype.endsWith ( _searchString_ [ , _endPosition_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _isRegExp_ be ? IsRegExp(_searchString_).
          1. If _isRegExp_ is *true*, throw a *TypeError* exception.
          1. Let _searchStr_ be ? ToString(_searchString_).
          1. Let _len_ be the length of _S_.
          1. If _endPosition_ is *undefined*, let _pos_ be _len_; else let _pos_ be ? ToIntegerOrInfinity(_endPosition_).
          1. Let _end_ be the result of clamping _pos_ between 0 and _len_.
          1. Let _searchLength_ be the length of _searchStr_.
          1. If _searchLength_ = 0, return *true*.
          1. Let _start_ be _end_ - _searchLength_.
          1. If _start_ &lt; 0, return *false*.
          1. Let _substring_ be the substring of _S_ from _start_ to _end_.
          1. If _substring_ is _searchStr_, return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>This method returns *true* if the sequence of code units of _searchString_ converted to a String is the same as the corresponding code units of this object (converted to a String) starting at _endPosition_ - length(this). Otherwise it returns *false*.</p>
        </emu-note>
        <emu-note>
          <p>Throwing an exception if the first argument is a RegExp is specified in order to allow future editions to define extensions that allow such argument values.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.includes">
        <h1>String.prototype.includes ( _searchString_ [ , _position_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _isRegExp_ be ? IsRegExp(_searchString_).
          1. If _isRegExp_ is *true*, throw a *TypeError* exception.
          1. Let _searchStr_ be ? ToString(_searchString_).
          1. Let _pos_ be ? ToIntegerOrInfinity(_position_).
          1. Assert: If _position_ is *undefined*, then _pos_ is 0.
          1. Let _len_ be the length of _S_.
          1. Let _start_ be the result of clamping _pos_ between 0 and _len_.
          1. Let _index_ be StringIndexOf(_S_, _searchStr_, _start_).
          1. If _index_ is ~not-found~, return *false*.
          1. Return *true*.
        </emu-alg>
        <emu-note>
          <p>If _searchString_ appears as a <emu-not-ref>substring</emu-not-ref> of the result of converting this object to a String, at one or more indices that are greater than or equal to _position_, this function returns *true*; otherwise, it returns *false*. If _position_ is *undefined*, 0 is assumed, so as to search all of the String.</p>
        </emu-note>
        <emu-note>
          <p>Throwing an exception if the first argument is a RegExp is specified in order to allow future editions to define extensions that allow such argument values.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.indexof">
        <h1>String.prototype.indexOf ( _searchString_ [ , _position_ ] )</h1>
        <emu-note>
          <p>If _searchString_ appears as a <emu-not-ref>substring</emu-not-ref> of the result of converting this object to a String, at one or more indices that are greater than or equal to _position_, then the smallest such index is returned; otherwise, *-1*<sub>𝔽</sub> is returned. If _position_ is *undefined*, *+0*<sub>𝔽</sub> is assumed, so as to search all of the String.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _searchStr_ be ? ToString(_searchString_).
          1. Let _pos_ be ? ToIntegerOrInfinity(_position_).
          1. Assert: If _position_ is *undefined*, then _pos_ is 0.
          1. Let _len_ be the length of _S_.
          1. Let _start_ be the result of clamping _pos_ between 0 and _len_.
          1. Let _result_ be StringIndexOf(_S_, _searchStr_, _start_).
          1. If _result_ is ~not-found~, return *-1*<sub>𝔽</sub>.
          1. Return 𝔽(_result_).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.iswellformed">
        <h1>String.prototype.isWellFormed ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Return IsStringWellFormedUnicode(_S_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string.prototype.lastindexof">
        <h1>String.prototype.lastIndexOf ( _searchString_ [ , _position_ ] )</h1>
        <emu-note>
          <p>If _searchString_ appears as a <emu-not-ref>substring</emu-not-ref> of the result of converting this object to a String at one or more indices that are smaller than or equal to _position_, then the greatest such index is returned; otherwise, *-1*<sub>𝔽</sub> is returned. If _position_ is *undefined*, the length of the String value is assumed, so as to search all of the String.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _searchStr_ be ? ToString(_searchString_).
          1. Let _numPos_ be ? ToNumber(_position_).
          1. Assert: If _position_ is *undefined*, then _numPos_ is *NaN*.
          1. If _numPos_ is *NaN*, let _pos_ be +∞; otherwise, let _pos_ be ! ToIntegerOrInfinity(_numPos_).
          1. Let _len_ be the length of _S_.
          1. Let _searchLen_ be the length of _searchStr_.
          1. Let _start_ be the result of clamping _pos_ between 0 and _len_ - _searchLen_.
          1. Let _result_ be StringLastIndexOf(_S_, _searchStr_, _start_).
          1. If _result_ is ~not-found~, return *-1*<sub>𝔽</sub>.
          1. Return 𝔽(_result_).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.localecompare">
        <h1>String.prototype.localeCompare ( _that_ [ , _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method returns a Number other than *NaN* representing the result of an implementation-defined locale-sensitive String comparison of the *this* value (converted to a String _S_) with _that_ (converted to a String _thatValue_). The result is intended to correspond with a sort order of String values according to conventions of the host environment's current locale, and will be negative when _S_ is ordered before _thatValue_, positive when _S_ is ordered after _thatValue_, and zero in all other cases (representing no relative ordering between _S_ and _thatValue_).</p>
        <p>Before performing the comparisons, this method performs the following steps to prepare the Strings:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _thatValue_ be ? ToString(_that_).
        </emu-alg>
        <p>The meaning of the optional second and third parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not assign any other interpretation to those parameter positions.</p>
        <p>The actual return values are implementation-defined to permit encoding additional information in them, but this method, when considered as a method of two arguments, is required to be a consistent comparator defining a total ordering on the set of all Strings. This method is also required to recognize and honour canonical equivalence according to the Unicode Standard, including returning *+0*<sub>𝔽</sub> when comparing distinguishable Strings that are canonically equivalent.</p>
        <emu-note>
          <p>This method itself is not directly suitable as an argument to `Array.prototype.sort` because the latter requires a function of two arguments.</p>
        </emu-note>
        <emu-note>
          <p>This method may rely on whatever language- and/or locale-sensitive comparison functionality is available to the ECMAScript environment from the host environment, and is intended to compare according to the conventions of the host environment's current locale. However, regardless of comparison capabilities, this method must recognize and honour canonical equivalence according to the Unicode Standard—for example, the following comparisons must all return *+0*<sub>𝔽</sub>:</p>
          <pre><code class="javascript">
            // &#x212B; ANGSTROM SIGN vs.
            // A&#x030A; LATIN CAPITAL LETTER A + COMBINING RING ABOVE
            "\u212B".localeCompare("A\u030A")

            // &#x2126; OHM SIGN vs.
            // &#x03A9; GREEK CAPITAL LETTER OMEGA
            "\u2126".localeCompare("\u03A9")

            // &#x1E69; LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE vs.
            // s&#x0307;&#x0323; LATIN SMALL LETTER S + COMBINING DOT ABOVE + COMBINING DOT BELOW
            "\u1E69".localeCompare("s\u0307\u0323")

            // &#x1E0B;&#x0323; LATIN SMALL LETTER D WITH DOT ABOVE + COMBINING DOT BELOW vs.
            // &#x1E0D;&#x0307; LATIN SMALL LETTER D WITH DOT BELOW + COMBINING DOT ABOVE
            "\u1E0B\u0323".localeCompare("\u1E0D\u0307")

            // &#x1100;&#x1161; HANGUL CHOSEONG KIYEOK + HANGUL JUNGSEONG A vs.
            // &#xAC00; HANGUL SYLLABLE GA
            "\u1100\u1161".localeCompare("\uAC00")
          </code></pre>
          <p>For a definition and discussion of canonical equivalence see the Unicode Standard, chapters 2 and 3, as well as <a href="https://unicode.org/reports/tr15/">Unicode Standard Annex #15, Unicode Normalization Forms</a> and <a href="https://unicode.org/notes/tn5/">Unicode Technical Note #5, Canonical Equivalence in Applications</a>. Also see <a href="https://unicode.org/reports/tr10/">Unicode Technical Standard #10, Unicode Collation Algorithm</a>.</p>
          <p>It is recommended that this method should not honour Unicode compatibility equivalents or compatibility decompositions as defined in the Unicode Standard, chapter 3, section 3.7.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.match">
        <h1>String.prototype.match ( _regexp_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _regexp_ is neither *undefined* nor *null*, then
            1. Let _matcher_ be ? GetMethod(_regexp_, %Symbol.match%).
            1. If _matcher_ is not *undefined*, then
              1. Return ? Call(_matcher_, _regexp_, « _O_ »).
          1. Let _S_ be ? ToString(_O_).
          1. Let _rx_ be ? RegExpCreate(_regexp_, *undefined*).
          1. Return ? Invoke(_rx_, %Symbol.match%, « _S_ »).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.matchall">
        <h1>String.prototype.matchAll ( _regexp_ )</h1>
        <p>This method performs a regular expression match of the String representing the *this* value against _regexp_ and returns an iterator that yields match results. Each match result is an Array containing the matched portion of the String as the first element, followed by the portions matched by any capturing groups. If the regular expression never matches, the returned iterator does not yield any match results.</p>
        <p>It performs the following steps when called:</p>

        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _regexp_ is neither *undefined* nor *null*, then
            1. Let _isRegExp_ be ? IsRegExp(_regexp_).
            1. If _isRegExp_ is *true*, then
              1. Let _flags_ be ? Get(_regexp_, *"flags"*).
              1. Perform ? RequireObjectCoercible(_flags_).
              1. If ? ToString(_flags_) does not contain *"g"*, throw a *TypeError* exception.
            1. Let _matcher_ be ? GetMethod(_regexp_, %Symbol.matchAll%).
            1. If _matcher_ is not *undefined*, then
              1. Return ? Call(_matcher_, _regexp_, « _O_ »).
          1. Let _S_ be ? ToString(_O_).
          1. Let _rx_ be ? RegExpCreate(_regexp_, *"g"*).
          1. Return ? Invoke(_rx_, %Symbol.matchAll%, « _S_ »).
        </emu-alg>
        <emu-note>This method is intentionally generic, it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</emu-note>
        <emu-note>Similarly to `String.prototype.split`, `String.prototype.matchAll` is designed to typically act without mutating its inputs.</emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.normalize">
        <h1>String.prototype.normalize ( [ _form_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. If _form_ is *undefined*, let _f_ be *"NFC"*.
          1. Else, let _f_ be ? ToString(_form_).
          1. If _f_ is not one of *"NFC"*, *"NFD"*, *"NFKC"*, or *"NFKD"*, throw a *RangeError* exception.
          1. Let _ns_ be the String value that is the result of normalizing _S_ into the normalization form named by _f_ as specified in <a href="https://www.unicode.org/versions/latest/ch03.pdf">the latest Unicode Standard, Normalization Forms</a>.
          1. Return _ns_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.padend">
        <h1>String.prototype.padEnd ( _maxLength_ [ , _fillString_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Return ? StringPaddingBuiltinsImpl(_O_, _maxLength_, _fillString_, ~end~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string.prototype.padstart">
        <h1>String.prototype.padStart ( _maxLength_ [ , _fillString_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Return ? StringPaddingBuiltinsImpl(_O_, _maxLength_, _fillString_, ~start~).
        </emu-alg>

        <emu-clause id="sec-stringpaddingbuiltinsimpl" type="abstract operation">
          <h1>
            StringPaddingBuiltinsImpl (
              _O_: an ECMAScript language value,
              _maxLength_: an ECMAScript language value,
              _fillString_: an ECMAScript language value,
              _placement_: ~start~ or ~end~,
            ): either a normal completion containing a String or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _S_ be ? ToString(_O_).
            1. Let _intMaxLength_ be ℝ(? ToLength(_maxLength_)).
            1. Let _stringLength_ be the length of _S_.
            1. If _intMaxLength_ ≤ _stringLength_, return _S_.
            1. If _fillString_ is *undefined*, set _fillString_ to the String value consisting solely of the code unit 0x0020 (SPACE).
            1. Else, set _fillString_ to ? ToString(_fillString_).
            1. Return StringPad(_S_, _intMaxLength_, _fillString_, _placement_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-stringpad" type="abstract operation">
          <h1>
            StringPad (
              _S_: a String,
              _maxLength_: a non-negative integer,
              _fillString_: a String,
              _placement_: ~start~ or ~end~,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _stringLength_ be the length of _S_.
            1. If _maxLength_ ≤ _stringLength_, return _S_.
            1. If _fillString_ is the empty String, return _S_.
            1. Let _fillLen_ be _maxLength_ - _stringLength_.
            1. Let _truncatedStringFiller_ be the String value consisting of repeated concatenations of _fillString_ truncated to length _fillLen_.
            1. If _placement_ is ~start~, return the string-concatenation of _truncatedStringFiller_ and _S_.
            1. Else, return the string-concatenation of _S_ and _truncatedStringFiller_.
          </emu-alg>
          <emu-note>
            <p>The argument _maxLength_ will be clamped such that it can be no smaller than the length of _S_.</p>
          </emu-note>
          <emu-note>
            <p>The argument _fillString_ defaults to *" "* (the String value consisting of the code unit 0x0020 SPACE).</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-tozeropaddeddecimalstring" type="abstract operation">
          <h1>
            ToZeroPaddedDecimalString (
              _n_: a non-negative integer,
              _minLength_: a non-negative integer,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _S_ be the String representation of _n_, formatted as a decimal number.
            1. Return StringPad(_S_, _minLength_, *"0"*, ~start~).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-string.prototype.repeat">
        <h1>String.prototype.repeat ( _count_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _n_ be ? ToIntegerOrInfinity(_count_).
          1. If _n_ &lt; 0 or _n_ = +∞, throw a *RangeError* exception.
          1. If _n_ = 0, return the empty String.
          1. Return the String value that is made from _n_ copies of _S_ appended together.
        </emu-alg>
        <emu-note>
          <p>This method creates the String value consisting of the code units of the *this* value (converted to String) repeated _count_ times.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.replace">
        <h1>String.prototype.replace ( _searchValue_, _replaceValue_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _searchValue_ is neither *undefined* nor *null*, then
            1. Let _replacer_ be ? GetMethod(_searchValue_, %Symbol.replace%).
            1. If _replacer_ is not *undefined*, then
              1. Return ? Call(_replacer_, _searchValue_, « _O_, _replaceValue_ »).
          1. Let _string_ be ? ToString(_O_).
          1. Let _searchString_ be ? ToString(_searchValue_).
          1. Let _functionalReplace_ be IsCallable(_replaceValue_).
          1. If _functionalReplace_ is *false*, then
            1. Set _replaceValue_ to ? ToString(_replaceValue_).
          1. Let _searchLength_ be the length of _searchString_.
          1. Let _position_ be StringIndexOf(_string_, _searchString_, 0).
          1. If _position_ is ~not-found~, return _string_.
          1. Let _preceding_ be the substring of _string_ from 0 to _position_.
          1. Let _following_ be the substring of _string_ from _position_ + _searchLength_.
          1. If _functionalReplace_ is *true*, then
            1. Let _replacement_ be ? ToString(? Call(_replaceValue_, *undefined*, « _searchString_, 𝔽(_position_), _string_ »)).
          1. Else,
            1. Assert: _replaceValue_ is a String.
            1. Let _captures_ be a new empty List.
            1. Let _replacement_ be ! GetSubstitution(_searchString_, _string_, _position_, _captures_, *undefined*, _replaceValue_).
          1. Return the string-concatenation of _preceding_, _replacement_, and _following_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-getsubstitution" type="abstract operation" oldids="table-replacement-text-symbol-substitutions,table-45">
          <h1>
            GetSubstitution (
              _matched_: a String,
              _str_: a String,
              _position_: a non-negative integer,
              _captures_: a List of either Strings or *undefined*,
              _namedCaptures_: an Object or *undefined*,
              _replacementTemplate_: a String,
            ): either a normal completion containing a String or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>For the purposes of this abstract operation, a <em>decimal digit</em> is a code unit in the inclusive interval from 0x0030 (DIGIT ZERO) to 0x0039 (DIGIT NINE).</dd>
          </dl>
          <emu-alg>
            1. Let _stringLength_ be the length of _str_.
            1. Assert: _position_ ≤ _stringLength_.
            1. Let _result_ be the empty String.
            1. Let _templateRemainder_ be _replacementTemplate_.
            1. Repeat, while _templateRemainder_ is not the empty String,
              1. [declared="ref,refReplacement"] NOTE: The following steps isolate _ref_ (a prefix of _templateRemainder_), determine _refReplacement_ (its replacement), and then append that replacement to _result_.
              1. If _templateRemainder_ starts with *"$$"*, then
                1. Let _ref_ be *"$$"*.
                1. Let _refReplacement_ be *"$"*.
              1. Else if _templateRemainder_ starts with *"$`"*, then
                1. Let _ref_ be *"$`"*.
                1. Let _refReplacement_ be the substring of _str_ from 0 to _position_.
              1. Else if _templateRemainder_ starts with *"$&amp;"*, then
                1. Let _ref_ be *"$&amp;"*.
                1. Let _refReplacement_ be _matched_.
              1. Else if _templateRemainder_ starts with *"$'"* (0x0024 (DOLLAR SIGN) followed by 0x0027 (APOSTROPHE)), then
                1. Let _ref_ be *"$'"*.
                1. Let _matchLength_ be the length of _matched_.
                1. Let _tailPos_ be _position_ + _matchLength_.
                1. Let _refReplacement_ be the substring of _str_ from min(_tailPos_, _stringLength_).
                1. NOTE: _tailPos_ can exceed _stringLength_ only if this abstract operation was invoked by a call to the intrinsic %Symbol.replace% method of %RegExp.prototype% on an object whose *"exec"* property is not the intrinsic %RegExp.prototype.exec%.
              1. Else if _templateRemainder_ starts with *"$"* followed by 1 or more decimal digits, then
                1. If _templateRemainder_ starts with *"$"* followed by 2 or more decimal digits, let _digitCount_ be 2. Otherwise, let _digitCount_ be 1.
                1. Let _digits_ be the substring of _templateRemainder_ from 1 to 1 + _digitCount_.
                1. Let _index_ be ℝ(StringToNumber(_digits_)).
                1. Assert: 0 ≤ _index_ ≤ 99.
                1. Let _captureLen_ be the number of elements in _captures_.
                1. If _index_ > _captureLen_ and _digitCount_ = 2, then
                  1. NOTE: When a two-digit replacement pattern specifies an index exceeding the count of capturing groups, it is treated as a one-digit replacement pattern followed by a literal digit.
                  1. Set _digitCount_ to 1.
                  1. Set _digits_ to the substring of _digits_ from 0 to 1.
                  1. Set _index_ to ℝ(StringToNumber(_digits_)).
                1. Let _ref_ be the substring of _templateRemainder_ from 0 to 1 + _digitCount_.
                1. If 1 ≤ _index_ ≤ _captureLen_, then
                  1. Let _capture_ be _captures_[_index_ - 1].
                  1. If _capture_ is *undefined*, then
                    1. Let _refReplacement_ be the empty String.
                  1. Else,
                    1. Let _refReplacement_ be _capture_.
                1. Else,
                  1. Let _refReplacement_ be _ref_.
              1. Else if _templateRemainder_ starts with *"$&lt;"*, then
                1. Let _gtPos_ be StringIndexOf(_templateRemainder_, *">"*, 0).
                1. If _gtPos_ is ~not-found~ or _namedCaptures_ is *undefined*, then
                  1. Let _ref_ be *"$&lt;"*.
                  1. Let _refReplacement_ be _ref_.
                1. Else,
                  1. Let _ref_ be the substring of _templateRemainder_ from 0 to _gtPos_ + 1.
                  1. Let _groupName_ be the substring of _templateRemainder_ from 2 to _gtPos_.
                  1. Assert: _namedCaptures_ is an Object.
                  1. Let _capture_ be ? Get(_namedCaptures_, _groupName_).
                  1. If _capture_ is *undefined*, then
                    1. Let _refReplacement_ be the empty String.
                  1. Else,
                    1. Let _refReplacement_ be ? ToString(_capture_).
              1. Else,
                1. Let _ref_ be the substring of _templateRemainder_ from 0 to 1.
                1. Let _refReplacement_ be _ref_.
              1. Let _refLength_ be the length of _ref_.
              1. Set _templateRemainder_ to the substring of _templateRemainder_ from _refLength_.
              1. Set _result_ to the string-concatenation of _result_ and _refReplacement_.
            1. Return _result_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-string.prototype.replaceall">
        <h1>String.prototype.replaceAll ( _searchValue_, _replaceValue_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _searchValue_ is neither *undefined* nor *null*, then
            1. Let _isRegExp_ be ? IsRegExp(_searchValue_).
            1. If _isRegExp_ is *true*, then
              1. Let _flags_ be ? Get(_searchValue_, *"flags"*).
              1. Perform ? RequireObjectCoercible(_flags_).
              1. If ? ToString(_flags_) does not contain *"g"*, throw a *TypeError* exception.
            1. Let _replacer_ be ? GetMethod(_searchValue_, %Symbol.replace%).
            1. If _replacer_ is not *undefined*, then
              1. Return ? Call(_replacer_, _searchValue_, « _O_, _replaceValue_ »).
          1. Let _string_ be ? ToString(_O_).
          1. Let _searchString_ be ? ToString(_searchValue_).
          1. Let _functionalReplace_ be IsCallable(_replaceValue_).
          1. If _functionalReplace_ is *false*, then
            1. Set _replaceValue_ to ? ToString(_replaceValue_).
          1. Let _searchLength_ be the length of _searchString_.
          1. Let _advanceBy_ be max(1, _searchLength_).
          1. Let _matchPositions_ be a new empty List.
          1. Let _position_ be StringIndexOf(_string_, _searchString_, 0).
          1. Repeat, while _position_ is not ~not-found~,
            1. Append _position_ to _matchPositions_.
            1. Set _position_ to StringIndexOf(_string_, _searchString_, _position_ + _advanceBy_).
          1. Let _endOfLastMatch_ be 0.
          1. Let _result_ be the empty String.
          1. For each element _p_ of _matchPositions_, do
            1. Let _preserved_ be the substring of _string_ from _endOfLastMatch_ to _p_.
            1. If _functionalReplace_ is *true*, then
              1. Let _replacement_ be ? ToString(? Call(_replaceValue_, *undefined*, « _searchString_, 𝔽(_p_), _string_ »)).
            1. Else,
              1. Assert: _replaceValue_ is a String.
              1. Let _captures_ be a new empty List.
              1. Let _replacement_ be ! GetSubstitution(_searchString_, _string_, _p_, _captures_, *undefined*, _replaceValue_).
            1. Set _result_ to the string-concatenation of _result_, _preserved_, and _replacement_.
            1. Set _endOfLastMatch_ to _p_ + _searchLength_.
          1. If _endOfLastMatch_ &lt; the length of _string_, then
            1. Set _result_ to the string-concatenation of _result_ and the substring of _string_ from _endOfLastMatch_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string.prototype.search">
        <h1>String.prototype.search ( _regexp_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _regexp_ is neither *undefined* nor *null*, then
            1. Let _searcher_ be ? GetMethod(_regexp_, %Symbol.search%).
            1. If _searcher_ is not *undefined*, then
              1. Return ? Call(_searcher_, _regexp_, « _O_ »).
          1. Let _string_ be ? ToString(_O_).
          1. Let _rx_ be ? RegExpCreate(_regexp_, *undefined*).
          1. Return ? Invoke(_rx_, %Symbol.search%, « _string_ »).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.slice">
        <h1>String.prototype.slice ( _start_, _end_ )</h1>
        <p>This method returns a <emu-not-ref>substring</emu-not-ref> of the result of converting this object to a String, starting from index _start_ and running to, but not including, index _end_ (or through the end of the String if _end_ is *undefined*). If _start_ is negative, it is treated as <emu-eqn>_sourceLength_ + _start_</emu-eqn> where _sourceLength_ is the length of the String. If _end_ is negative, it is treated as <emu-eqn>_sourceLength_ + _end_</emu-eqn> where _sourceLength_ is the length of the String. The result is a String value, not a String object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _len_ be the length of _S_.
          1. Let _intStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _intStart_ = -∞, let _from_ be 0.
          1. Else if _intStart_ &lt; 0, let _from_ be max(_len_ + _intStart_, 0).
          1. Else, let _from_ be min(_intStart_, _len_).
          1. If _end_ is *undefined*, let _intEnd_ be _len_; else let _intEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _intEnd_ = -∞, let _to_ be 0.
          1. Else if _intEnd_ &lt; 0, let _to_ be max(_len_ + _intEnd_, 0).
          1. Else, let _to_ be min(_intEnd_, _len_).
          1. If _from_ ≥ _to_, return the empty String.
          1. Return the substring of _S_ from _from_ to _to_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.split">
        <h1>String.prototype.split ( _separator_, _limit_ )</h1>
        <p>This method returns an Array into which substrings of the result of converting this object to a String have been stored. The substrings are determined by searching from left to right for occurrences of _separator_; these occurrences are not part of any String in the returned array, but serve to divide up the String value. The value of _separator_ may be a String of any length or it may be an object, such as a RegExp, that has a %Symbol.split% method.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. If _separator_ is neither *undefined* nor *null*, then
            1. Let _splitter_ be ? GetMethod(_separator_, %Symbol.split%).
            1. If _splitter_ is not *undefined*, then
              1. Return ? Call(_splitter_, _separator_, « _O_, _limit_ »).
          1. Let _S_ be ? ToString(_O_).
          1. If _limit_ is *undefined*, let _lim_ be 2<sup>32</sup> - 1; else let _lim_ be ℝ(? ToUint32(_limit_)).
          1. Let _R_ be ? ToString(_separator_).
          1. If _lim_ = 0, then
            1. Return CreateArrayFromList(« »).
          1. If _separator_ is *undefined*, then
            1. Return CreateArrayFromList(« _S_ »).
          1. Let _separatorLength_ be the length of _R_.
          1. If _separatorLength_ = 0, then
            1. Let _strLen_ be the length of _S_.
            1. Let _outLen_ be the result of clamping _lim_ between 0 and _strLen_.
            1. Let _head_ be the substring of _S_ from 0 to _outLen_.
            1. Let _codeUnits_ be a List consisting of the sequence of code units that are the elements of _head_.
            1. Return CreateArrayFromList(_codeUnits_).
          1. If _S_ is the empty String, return CreateArrayFromList(« _S_ »).
          1. Let _substrings_ be a new empty List.
          1. Let _i_ be 0.
          1. Let _j_ be StringIndexOf(_S_, _R_, 0).
          1. Repeat, while _j_ is not ~not-found~,
            1. Let _T_ be the substring of _S_ from _i_ to _j_.
            1. Append _T_ to _substrings_.
            1. If the number of elements in _substrings_ is _lim_, return CreateArrayFromList(_substrings_).
            1. Set _i_ to _j_ + _separatorLength_.
            1. Set _j_ to StringIndexOf(_S_, _R_, _i_).
          1. Let _T_ be the substring of _S_ from _i_.
          1. Append _T_ to _substrings_.
          1. Return CreateArrayFromList(_substrings_).
        </emu-alg>
        <emu-note>
          <p>The value of _separator_ may be an empty String. In this case, _separator_ does not match the empty <emu-not-ref>substring</emu-not-ref> at the beginning or end of the input String, nor does it match the empty <emu-not-ref>substring</emu-not-ref> at the end of the previous separator match. If _separator_ is the empty String, the String is split up into individual code unit elements; the length of the result array equals the length of the String, and each <emu-not-ref>substring</emu-not-ref> contains one code unit.</p>
          <p>If the *this* value is (or converts to) the empty String, the result depends on whether _separator_ can match the empty String. If it can, the result array contains no elements. Otherwise, the result array contains one element, which is the empty String.</p>
          <p>If _separator_ is *undefined*, then the result array contains just one String, which is the *this* value (converted to a String). If _limit_ is not *undefined*, then the output array is truncated so that it contains no more than _limit_ elements.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.startswith">
        <h1>String.prototype.startsWith ( _searchString_ [ , _position_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _isRegExp_ be ? IsRegExp(_searchString_).
          1. If _isRegExp_ is *true*, throw a *TypeError* exception.
          1. Let _searchStr_ be ? ToString(_searchString_).
          1. Let _len_ be the length of _S_.
          1. If _position_ is *undefined*, let _pos_ be 0; else let _pos_ be ? ToIntegerOrInfinity(_position_).
          1. Let _start_ be the result of clamping _pos_ between 0 and _len_.
          1. Let _searchLength_ be the length of _searchStr_.
          1. If _searchLength_ = 0, return *true*.
          1. Let _end_ be _start_ + _searchLength_.
          1. If _end_ > _len_, return *false*.
          1. Let _substring_ be the substring of _S_ from _start_ to _end_.
          1. If _substring_ is _searchStr_, return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>This method returns *true* if the sequence of code units of _searchString_ converted to a String is the same as the corresponding code units of this object (converted to a String) starting at index _position_. Otherwise it returns *false*.</p>
        </emu-note>
        <emu-note>
          <p>Throwing an exception if the first argument is a RegExp is specified in order to allow future editions to define extensions that allow such argument values.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.substring">
        <h1>String.prototype.substring ( _start_, _end_ )</h1>
        <p>This method returns a <emu-not-ref>substring</emu-not-ref> of the result of converting this object to a String, starting from index _start_ and running to, but not including, index _end_ of the String (or through the end of the String if _end_ is *undefined*). The result is a String value, not a String object.</p>
        <p>If either argument is *NaN* or negative, it is replaced with zero; if either argument is strictly greater than the length of the String, it is replaced with the length of the String.</p>
        <p>If _start_ is strictly greater than _end_, they are swapped.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _len_ be the length of _S_.
          1. Let _intStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _end_ is *undefined*, let _intEnd_ be _len_; else let _intEnd_ be ? ToIntegerOrInfinity(_end_).
          1. Let _finalStart_ be the result of clamping _intStart_ between 0 and _len_.
          1. Let _finalEnd_ be the result of clamping _intEnd_ between 0 and _len_.
          1. Let _from_ be min(_finalStart_, _finalEnd_).
          1. Let _to_ be max(_finalStart_, _finalEnd_).
          1. Return the substring of _S_ from _from_ to _to_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.tolocalelowercase">
        <h1>String.prototype.toLocaleLowerCase ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It works exactly the same as `toLowerCase` except that it is intended to yield a locale-sensitive result corresponding with conventions of the host environment's current locale. There will only be a difference in the few cases (such as Turkish) where the rules for that language conflict with the regular Unicode case mappings.</p>
        <p>The meaning of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.tolocaleuppercase">
        <h1>String.prototype.toLocaleUpperCase ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used:</p>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It works exactly the same as `toUpperCase` except that it is intended to yield a locale-sensitive result corresponding with conventions of the host environment's current locale. There will only be a difference in the few cases (such as Turkish) where the rules for that language conflict with the regular Unicode case mappings.</p>
        <p>The meaning of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.tolowercase">
        <h1>String.prototype.toLowerCase ( )</h1>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _sText_ be StringToCodePoints(_S_).
          1. Let _lowerText_ be toLowercase(_sText_), according to the Unicode Default Case Conversion algorithm.
          1. Let _L_ be CodePointsToString(_lowerText_).
          1. Return _L_.
        </emu-alg>
        <p>The result must be derived according to the locale-insensitive case mappings in the Unicode Character Database (this explicitly includes not only the file <a href="https://unicode.org/Public/UCD/latest/ucd/UnicodeData.txt"><code>UnicodeData.txt</code></a>, but also all locale-insensitive mappings in the file <a href="https://unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt"><code>SpecialCasing.txt</code></a> that accompanies it).</p>
        <emu-note>
          <p>The case mapping of some code points may produce multiple code points. In this case the result String may not be the same length as the source String. Because both `toUpperCase` and `toLowerCase` have context-sensitive behaviour, the methods are not symmetrical. In other words, `s.toUpperCase().toLowerCase()` is not necessarily equal to `s.toLowerCase()`.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.tostring">
        <h1>String.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ThisStringValue(*this* value).
        </emu-alg>
        <emu-note>
          <p>For a String object, this method happens to return the same thing as the `valueOf` method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.touppercase">
        <h1>String.prototype.toUpperCase ( )</h1>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It behaves in exactly the same way as `String.prototype.toLowerCase`, except that the String is mapped using the toUppercase algorithm of the Unicode Default Case Conversion.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.towellformed">
        <h1>String.prototype.toWellFormed ( )</h1>
        <p>This method returns a String representation of this object with all leading surrogates and trailing surrogates that are not part of a surrogate pair replaced with U+FFFD (REPLACEMENT CHARACTER).</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _strLen_ be the length of _S_.
          1. Let _k_ be 0.
          1. Let _result_ be the empty String.
          1. Repeat, while _k_ &lt; _strLen_,
            1. Let _cp_ be CodePointAt(_S_, _k_).
            1. If _cp_.[[IsUnpairedSurrogate]] is *true*, then
              1. Set _result_ to the string-concatenation of _result_ and 0xFFFD (REPLACEMENT CHARACTER).
            1. Else,
              1. Set _result_ to the string-concatenation of _result_ and UTF16EncodeCodePoint(_cp_.[[CodePoint]]).
            1. Set _k_ to _k_ + _cp_.[[CodeUnitCount]].
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string.prototype.trim">
        <h1>String.prototype.trim ( )</h1>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? TrimString(_S_, ~start+end~).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-trimstring" type="abstract operation">
          <h1>
            TrimString (
              _string_: an ECMAScript language value,
              _where_: ~start~, ~end~, or ~start+end~,
            ): either a normal completion containing a String or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It interprets _string_ as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</dd>
          </dl>
          <emu-alg>
            1. Let _str_ be ? RequireObjectCoercible(_string_).
            1. Let _S_ be ? ToString(_str_).
            1. If _where_ is ~start~, then
              1. Let _T_ be the String value that is a copy of _S_ with leading white space removed.
            1. Else if _where_ is ~end~, then
              1. Let _T_ be the String value that is a copy of _S_ with trailing white space removed.
            1. Else,
              1. Assert: _where_ is ~start+end~.
              1. Let _T_ be the String value that is a copy of _S_ with both leading and trailing white space removed.
            1. Return _T_.
          </emu-alg>
          <p>The definition of white space is the union of |WhiteSpace| and |LineTerminator|. When determining whether a Unicode code point is in Unicode general category “Space_Separator” (“Zs”), code unit sequences are interpreted as UTF-16 encoded code point sequences as specified in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-string.prototype.trimend">
        <h1>String.prototype.trimEnd ( )</h1>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? TrimString(_S_, ~end~).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.trimstart">
        <h1>String.prototype.trimStart ( )</h1>
        <p>This method interprets a String value as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? TrimString(_S_, ~start~).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-string.prototype.valueof">
        <h1>String.prototype.valueOf ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ThisStringValue(*this* value).
        </emu-alg>

        <emu-clause id="sec-thisstringvalue" type="abstract operation" oldids="thisstringvalue">
          <h1>
            ThisStringValue (
              _value_: an ECMAScript language value,
            ): either a normal completion containing a String or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _value_ is a String, return _value_.
            1. If _value_ is an Object and _value_ has a [[StringData]] internal slot, then
              1. Let _s_ be _value_.[[StringData]].
              1. Assert: _s_ is a String.
              1. Return _s_.
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-string.prototype-%symbol.iterator%" oldids="sec-string.prototype-@@iterator,sec-createstringiterator,sec-properties-of-string-iterator-instances,table-46,table-internal-slots-of-string-iterator-instances">
        <h1>String.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>This method returns an iterator object that iterates over the code points of a String value, returning each code point as a String value.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _s_ be ? ToString(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _s_ and performs the following steps when called:
            1. Let _len_ be the length of _s_.
            1. Let _position_ be 0.
            1. Repeat, while _position_ &lt; _len_,
              1. Let _cp_ be CodePointAt(_s_, _position_).
              1. Let _nextIndex_ be _position_ + _cp_.[[CodeUnitCount]].
              1. Let _resultString_ be the substring of _s_ from _position_ to _nextIndex_.
              1. Set _position_ to _nextIndex_.
              1. Perform ? GeneratorYield(CreateIteratorResultObject(_resultString_, *false*)).
            1. Return *undefined*.
          1. Return CreateIteratorFromClosure(_closure_, *"%StringIteratorPrototype%"*, %StringIteratorPrototype%).
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.iterator]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-string-instances">
      <h1>Properties of String Instances</h1>
      <p>String instances are String exotic objects and have the internal methods specified for such objects. String instances inherit properties from the String prototype object. String instances also have a [[StringData]] internal slot. The [[StringData]] internal slot is the String value represented by this String object.</p>
      <p>String instances have a *"length"* property, and a set of enumerable properties with integer-indexed names.</p>

      <emu-clause id="sec-properties-of-string-instances-length">
        <h1>length</h1>
        <p>The number of elements in the String value represented by this String object.</p>
        <p>Once a String object is initialized, this property is unchanging. It has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-string-iterator-objects">
      <h1>String Iterator Objects</h1>
      <p>A <dfn variants="String Iterators,String Iterator object,String Iterator objects">String Iterator</dfn> is an object that represents a specific iteration over some specific String instance object. There is not a named constructor for String Iterator objects. Instead, String Iterator objects are created by calling certain methods of String instance objects.</p>

      <emu-clause id="sec-%stringiteratorprototype%-object">
        <h1>The %StringIteratorPrototype% Object</h1>
        <p>The <dfn>%StringIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all String Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%stringiteratorprototype%.next">
          <h1>%StringIteratorPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? <emu-meta suppress-effects="user-code">GeneratorResume(*this* value, ~empty~, *"%StringIteratorPrototype%"*)</emu-meta>.
          </emu-alg>
        </emu-clause>

        <emu-clause oldids="sec-%stringiteratorprototype%-@@tostringtag" id="sec-%stringiteratorprototype%-%symbol.tostringtag%">
          <h1>%StringIteratorPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"String Iterator"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-regexp-regular-expression-objects">
    <h1>RegExp (Regular Expression) Objects</h1>
    <p>A RegExp object contains a regular expression and the associated flags.</p>
    <emu-note>
      <p>The form and functionality of regular expressions is modelled after the regular expression facility in the Perl 5 programming language.</p>
    </emu-note>

    <emu-clause id="sec-patterns">
      <h1>Patterns</h1>
      <p>The RegExp constructor applies the following grammar to the input pattern String. An error occurs if the grammar cannot interpret the String as an expansion of |Pattern|.</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        Pattern[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]

        Disjunction[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          Alternative[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]
          Alternative[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `|` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]

        Alternative[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          [empty]
          Alternative[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] Term[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]

        Term[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          Assertion[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]
          Atom[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]
          Atom[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] Quantifier

        Assertion[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          `^`
          `$`
          `\b`
          `\B`
          `(?=` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?!` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?&lt;=` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?&lt;!` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`

        Quantifier ::
          QuantifierPrefix
          QuantifierPrefix `?`

        QuantifierPrefix ::
          `*`
          `+`
          `?`
          `{` DecimalDigits[~Sep] `}`
          `{` DecimalDigits[~Sep] `,}`
          `{` DecimalDigits[~Sep] `,` DecimalDigits[~Sep] `}`

        Atom[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          PatternCharacter
          `.`
          `\` AtomEscape[?UnicodeMode, ?NamedCaptureGroups]
          CharacterClass[?UnicodeMode, ?UnicodeSetsMode]
          `(` GroupSpecifier[?UnicodeMode]? Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?:` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`

        SyntaxCharacter :: one of
          `^` `$` `\` `.` `*` `+` `?` `(` `)` `[` `]` `{` `}` `|`

        PatternCharacter ::
          SourceCharacter but not SyntaxCharacter

        AtomEscape[UnicodeMode, NamedCaptureGroups] ::
          DecimalEscape
          CharacterClassEscape[?UnicodeMode]
          CharacterEscape[?UnicodeMode]
          [+NamedCaptureGroups] `k` GroupName[?UnicodeMode]

        CharacterEscape[UnicodeMode] ::
          ControlEscape
          `c` AsciiLetter
          `0` [lookahead &notin; DecimalDigit]
          HexEscapeSequence
          RegExpUnicodeEscapeSequence[?UnicodeMode]
          IdentityEscape[?UnicodeMode]

        ControlEscape :: one of
          `f` `n` `r` `t` `v`

        GroupSpecifier[UnicodeMode] ::
          `?` GroupName[?UnicodeMode]

        GroupName[UnicodeMode] ::
          `&lt;` RegExpIdentifierName[?UnicodeMode] `&gt;`

        RegExpIdentifierName[UnicodeMode] ::
          RegExpIdentifierStart[?UnicodeMode]
          RegExpIdentifierName[?UnicodeMode] RegExpIdentifierPart[?UnicodeMode]

        RegExpIdentifierStart[UnicodeMode] ::
          IdentifierStartChar
          `\` RegExpUnicodeEscapeSequence[+UnicodeMode]
          [~UnicodeMode] UnicodeLeadSurrogate UnicodeTrailSurrogate

        RegExpIdentifierPart[UnicodeMode] ::
          IdentifierPartChar
          `\` RegExpUnicodeEscapeSequence[+UnicodeMode]
          [~UnicodeMode] UnicodeLeadSurrogate UnicodeTrailSurrogate

        RegExpUnicodeEscapeSequence[UnicodeMode] ::
          [+UnicodeMode] `u` HexLeadSurrogate `\u` HexTrailSurrogate
          [+UnicodeMode] `u` HexLeadSurrogate
          [+UnicodeMode] `u` HexTrailSurrogate
          [+UnicodeMode] `u` HexNonSurrogate
          [~UnicodeMode] `u` Hex4Digits
          [+UnicodeMode] `u{` CodePoint `}`

        UnicodeLeadSurrogate ::
          &gt; any Unicode code point in the inclusive interval from U+D800 to U+DBFF

        UnicodeTrailSurrogate ::
          &gt; any Unicode code point in the inclusive interval from U+DC00 to U+DFFF
      </emu-grammar>
      <p>Each `\\u` |HexTrailSurrogate| for which the choice of associated `u` |HexLeadSurrogate| is ambiguous shall be associated with the nearest possible `u` |HexLeadSurrogate| that would otherwise have no corresponding `\\u` |HexTrailSurrogate|.</p>
      <emu-grammar type="definition">
        HexLeadSurrogate ::
          Hex4Digits [> but only if the MV of |Hex4Digits| is in the inclusive interval from 0xD800 to 0xDBFF]

        HexTrailSurrogate ::
          Hex4Digits [> but only if the MV of |Hex4Digits| is in the inclusive interval from 0xDC00 to 0xDFFF]

        HexNonSurrogate ::
          Hex4Digits [> but only if the MV of |Hex4Digits| is not in the inclusive interval from 0xD800 to 0xDFFF]

        IdentityEscape[UnicodeMode] ::
          [+UnicodeMode] SyntaxCharacter
          [+UnicodeMode] `/`
          [~UnicodeMode] SourceCharacter but not UnicodeIDContinue

        DecimalEscape ::
          NonZeroDigit DecimalDigits[~Sep]? [lookahead &notin; DecimalDigit]

        CharacterClassEscape[UnicodeMode] ::
          `d`
          `D`
          `s`
          `S`
          `w`
          `W`
          [+UnicodeMode] `p{` UnicodePropertyValueExpression `}`
          [+UnicodeMode] `P{` UnicodePropertyValueExpression `}`

        UnicodePropertyValueExpression ::
          UnicodePropertyName `=` UnicodePropertyValue
          LoneUnicodePropertyNameOrValue

        UnicodePropertyName ::
          UnicodePropertyNameCharacters

        UnicodePropertyNameCharacters ::
          UnicodePropertyNameCharacter UnicodePropertyNameCharacters?

        UnicodePropertyValue ::
          UnicodePropertyValueCharacters

        LoneUnicodePropertyNameOrValue ::
          UnicodePropertyValueCharacters

        UnicodePropertyValueCharacters ::
          UnicodePropertyValueCharacter UnicodePropertyValueCharacters?

        UnicodePropertyValueCharacter ::
          UnicodePropertyNameCharacter
          DecimalDigit

        UnicodePropertyNameCharacter ::
          AsciiLetter
          `_`

        CharacterClass[UnicodeMode, UnicodeSetsMode] ::
          `[` [lookahead != `^`] ClassContents[?UnicodeMode, ?UnicodeSetsMode] `]`
          `[^` ClassContents[?UnicodeMode, ?UnicodeSetsMode] `]`

        ClassContents[UnicodeMode, UnicodeSetsMode] ::
          [empty]
          [~UnicodeSetsMode] NonemptyClassRanges[?UnicodeMode]
          [+UnicodeSetsMode] ClassSetExpression

        NonemptyClassRanges[UnicodeMode] ::
          ClassAtom[?UnicodeMode]
          ClassAtom[?UnicodeMode] NonemptyClassRangesNoDash[?UnicodeMode]
          ClassAtom[?UnicodeMode] `-` ClassAtom[?UnicodeMode] ClassContents[?UnicodeMode, ~UnicodeSetsMode]

        NonemptyClassRangesNoDash[UnicodeMode] ::
          ClassAtom[?UnicodeMode]
          ClassAtomNoDash[?UnicodeMode] NonemptyClassRangesNoDash[?UnicodeMode]
          ClassAtomNoDash[?UnicodeMode] `-` ClassAtom[?UnicodeMode] ClassContents[?UnicodeMode, ~UnicodeSetsMode]

        ClassAtom[UnicodeMode] ::
          `-`
          ClassAtomNoDash[?UnicodeMode]

        ClassAtomNoDash[UnicodeMode] ::
          SourceCharacter but not one of `\` or `]` or `-`
          `\` ClassEscape[?UnicodeMode]

        ClassEscape[UnicodeMode] ::
          `b`
          [+UnicodeMode] `-`
          CharacterClassEscape[?UnicodeMode]
          CharacterEscape[?UnicodeMode]

        ClassSetExpression ::
          ClassUnion
          ClassIntersection
          ClassSubtraction

        ClassUnion ::
          ClassSetRange ClassUnion?
          ClassSetOperand ClassUnion?

        ClassIntersection ::
          ClassSetOperand `&amp;&amp;` [lookahead != `&amp;`] ClassSetOperand
          ClassIntersection `&amp;&amp;` [lookahead != `&amp;`] ClassSetOperand

        ClassSubtraction ::
          ClassSetOperand `--` ClassSetOperand
          ClassSubtraction `--` ClassSetOperand

        ClassSetRange ::
          ClassSetCharacter `-` ClassSetCharacter

        ClassSetOperand ::
          NestedClass
          ClassStringDisjunction
          ClassSetCharacter

        NestedClass ::
          `[` [lookahead != `^`] ClassContents[+UnicodeMode, +UnicodeSetsMode] `]`
          `[^` ClassContents[+UnicodeMode, +UnicodeSetsMode] `]`
          `\` CharacterClassEscape[+UnicodeMode]
      </emu-grammar>
      <emu-note>
        <p>The first two lines here are equivalent to CharacterClass.</p>
      </emu-note>
      <emu-grammar type="definition">
        ClassStringDisjunction ::
          `\q{` ClassStringDisjunctionContents `}`

        ClassStringDisjunctionContents ::
          ClassString
          ClassString `|` ClassStringDisjunctionContents

        ClassString ::
          [empty]
          NonEmptyClassString

        NonEmptyClassString ::
          ClassSetCharacter NonEmptyClassString?

        ClassSetCharacter ::
          [lookahead &notin; ClassSetReservedDoublePunctuator] SourceCharacter but not ClassSetSyntaxCharacter
          `\` CharacterEscape[+UnicodeMode]
          `\` ClassSetReservedPunctuator
          `\b`

        ClassSetReservedDoublePunctuator :: one of
          `&amp;&amp;` `!!` `##`
          `$$` `%%` `**`
          `++` `,,` `..`
          `::` `;;` `&lt;&lt;`
          `==` `&gt;&gt;` `??`
          `@@` `^^` `&grave;&grave;`
          `~~`
      </emu-grammar>
      <emu-grammar type="definition">
        ClassSetSyntaxCharacter :: one of
          `(` `)` `[` `]` `{` `}` `/` `-` `\` `|`
      </emu-grammar>
      <emu-grammar type="definition">
        ClassSetReservedPunctuator :: one of
          `&amp;` `-` `!` `#` `%` `,`
          `:` `;` `&lt;` `=` `&gt;` `@`
          `&grave;` `~`
      </emu-grammar>
      <emu-note>
        <p>A number of productions in this section are given alternative definitions in section <emu-xref href="#sec-regular-expressions-patterns"></emu-xref>.</p>
      </emu-note>

      <emu-clause id="sec-patterns-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-patterns-static-semantics-early-errors-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-grammar>Pattern :: Disjunction</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if CountLeftCapturingParensWithin(|Pattern|) ≥ 2<sup>32</sup> - 1.
          </li>
          <li>
            It is a Syntax Error if |Pattern| contains two distinct |GroupSpecifier|s _x_ and _y_ such that the CapturingGroupName of _x_ is the CapturingGroupName of _y_ and such that MightBothParticipate(_x_, _y_) is *true*.
          </li>
        </ul>
        <emu-grammar>QuantifierPrefix :: `{` DecimalDigits `,` DecimalDigits `}`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the MV of the first |DecimalDigits| is strictly greater than the MV of the second |DecimalDigits|.
          </li>
        </ul>
        <emu-grammar>AtomEscape :: `k` GroupName</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if GroupSpecifiersThatMatch(|GroupName|) is empty.
          </li>
        </ul>
        <emu-grammar>AtomEscape :: DecimalEscape</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the CapturingGroupNumber of |DecimalEscape| is strictly greater than CountLeftCapturingParensWithin(the |Pattern| containing |AtomEscape|).
          </li>
        </ul>
        <emu-grammar>NonemptyClassRanges :: ClassAtom `-` ClassAtom ClassContents</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsCharacterClass of the first |ClassAtom| is *true* or IsCharacterClass of the second |ClassAtom| is *true*.
          </li>
          <li>
            It is a Syntax Error if IsCharacterClass of the first |ClassAtom| is *false*, IsCharacterClass of the second |ClassAtom| is *false*, and the CharacterValue of the first |ClassAtom| is strictly greater than the CharacterValue of the second |ClassAtom|.
          </li>
        </ul>
        <emu-grammar>NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtom ClassContents</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsCharacterClass of |ClassAtomNoDash| is *true* or IsCharacterClass of |ClassAtom| is *true*.
          </li>
          <li>
            It is a Syntax Error if IsCharacterClass of |ClassAtomNoDash| is *false*, IsCharacterClass of |ClassAtom| is *false*, and the CharacterValue of |ClassAtomNoDash| is strictly greater than the CharacterValue of |ClassAtom|.
          </li>
        </ul>
        <emu-grammar>RegExpIdentifierStart :: `\` RegExpUnicodeEscapeSequence</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the CharacterValue of |RegExpUnicodeEscapeSequence| is not the numeric value of some code point matched by the |IdentifierStartChar| lexical grammar production.
          </li>
        </ul>
        <emu-grammar>RegExpIdentifierStart :: UnicodeLeadSurrogate UnicodeTrailSurrogate</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the RegExpIdentifierCodePoint of |RegExpIdentifierStart| is not matched by the |UnicodeIDStart| lexical grammar production.
          </li>
        </ul>
        <emu-grammar>RegExpIdentifierPart :: `\` RegExpUnicodeEscapeSequence</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the CharacterValue of |RegExpUnicodeEscapeSequence| is not the numeric value of some code point matched by the |IdentifierPartChar| lexical grammar production.
          </li>
        </ul>
        <emu-grammar>RegExpIdentifierPart :: UnicodeLeadSurrogate UnicodeTrailSurrogate</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the RegExpIdentifierCodePoint of |RegExpIdentifierPart| is not matched by the |UnicodeIDContinue| lexical grammar production.
          </li>
        </ul>
        <emu-grammar>UnicodePropertyValueExpression :: UnicodePropertyName `=` UnicodePropertyValue</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the source text matched by |UnicodePropertyName| is not a Unicode property name or property alias listed in the “Property name and aliases” column of <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref>.
          </li>
          <li>
            It is a Syntax Error if the source text matched by |UnicodePropertyValue| is not a property value or property value alias for the Unicode property or property alias given by the source text matched by |UnicodePropertyName| listed in <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"><code>PropertyValueAliases.txt</code></a>.
          </li>
        </ul>
        <emu-grammar>UnicodePropertyValueExpression :: LoneUnicodePropertyNameOrValue</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the source text matched by |LoneUnicodePropertyNameOrValue| is not a Unicode property value or property value alias for the General_Category (gc) property listed in <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"><code>PropertyValueAliases.txt</code></a>, nor a binary property or binary property alias listed in the “Property name and aliases” column of <emu-xref href="#table-binary-unicode-properties"></emu-xref>, nor a binary property of strings listed in the “Property name” column of <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>.
          </li>
          <li>
            It is a Syntax Error if the enclosing |Pattern| does not have a <sub>[UnicodeSetsMode]</sub> parameter and the source text matched by |LoneUnicodePropertyNameOrValue| is a binary property of strings listed in the “Property name” column of <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>.
          </li>
        </ul>
        <emu-grammar>CharacterClassEscape :: `P{` UnicodePropertyValueExpression `}`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if MayContainStrings of the |UnicodePropertyValueExpression| is *true*.
          </li>
        </ul>
        <emu-grammar>CharacterClass :: `[^` ClassContents `]`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if MayContainStrings of the |ClassContents| is *true*.
          </li>
        </ul>
        <emu-grammar>NestedClass :: `[^` ClassContents `]`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if MayContainStrings of the |ClassContents| is *true*.
          </li>
        </ul>
        <emu-grammar>ClassSetRange :: ClassSetCharacter `-` ClassSetCharacter</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the CharacterValue of the first |ClassSetCharacter| is strictly greater than the CharacterValue of the second |ClassSetCharacter|.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-countleftcapturingparenswithin" type="abstract operation">
        <h1>
          Static Semantics: CountLeftCapturingParensWithin (
            _node_: a Parse Node,
          ): a non-negative integer
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the number of left-capturing parentheses in _node_. A <dfn variants="left-capturing parentheses">left-capturing parenthesis</dfn> is any `(` pattern character that is matched by the `(` terminal of the <emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> production.</dd>
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-countleftcapturingparens-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-alg>
          1. Assert: _node_ is an instance of a production in <emu-xref href="#sec-patterns">the RegExp Pattern grammar</emu-xref>.
          1. Return the number of <emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> Parse Nodes contained within _node_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-countleftcapturingparensbefore" type="abstract operation">
        <h1>
          Static Semantics: CountLeftCapturingParensBefore (
            _node_: a Parse Node,
          ): a non-negative integer
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns the number of left-capturing parentheses within the enclosing pattern that occur to the left of _node_.</dd>
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-countleftcapturingparens-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-alg>
          1. Assert: _node_ is an instance of a production in <emu-xref href="#sec-patterns">the RegExp Pattern grammar</emu-xref>.
          1. Let _pattern_ be the |Pattern| containing _node_.
          1. Return the number of <emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> Parse Nodes contained within _pattern_ that either occur before _node_ or contain _node_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-mightbothparticipate" type="abstract operation">
        <h1>
          Static Semantics: MightBothParticipate (
            _x_: a Parse Node,
            _y_: a Parse Node,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _x_ and _y_ have the same enclosing |Pattern|.
          1. If the enclosing |Pattern| contains a <emu-grammar>Disjunction :: Alternative `|` Disjunction</emu-grammar> Parse Node such that either _x_ is contained within the |Alternative| and _y_ is contained within the derived |Disjunction|, or _x_ is contained within the derived |Disjunction| and _y_ is contained within the |Alternative|, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-patterns-static-semantics-capturing-group-number" type="sdo">
        <h1>Static Semantics: CapturingGroupNumber ( ): a positive integer</h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-patterns-static-semantics-early-errors-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-grammar>DecimalEscape :: NonZeroDigit</emu-grammar>
        <emu-alg>
          1. Return the MV of |NonZeroDigit|.
        </emu-alg>
        <emu-grammar>DecimalEscape :: NonZeroDigit DecimalDigits</emu-grammar>
        <emu-alg>
          1. Let _n_ be the number of code points in |DecimalDigits|.
          1. Return (the MV of |NonZeroDigit| × 10<sup>_n_</sup> plus the MV of |DecimalDigits|).
        </emu-alg>
        <p>The definitions of “the MV of |NonZeroDigit|” and “the MV of |DecimalDigits|” are in <emu-xref href="#sec-literals-numeric-literals"></emu-xref>.</p>
      </emu-clause>

      <emu-clause id="sec-patterns-static-semantics-is-character-class" type="sdo">
        <h1>Static Semantics: IsCharacterClass ( ): a Boolean</h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-patterns-static-semantics-is-character-class-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-grammar>
          ClassAtom ::
            `-`

          ClassAtomNoDash ::
            SourceCharacter but not one of `\` or `]` or `-`

          ClassEscape ::
            `b`
            `-`
            CharacterEscape
        </emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ClassEscape :: CharacterClassEscape</emu-grammar>
        <emu-alg>
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-patterns-static-semantics-character-value" type="sdo">
        <h1>Static Semantics: CharacterValue ( ): a non-negative integer</h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-patterns-static-semantics-character-value-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-grammar>
          ClassAtom :: `-`
        </emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+002D (HYPHEN-MINUS).
        </emu-alg>
        <emu-grammar>
          ClassAtomNoDash :: SourceCharacter but not one of `\` or `]` or `-`
        </emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |SourceCharacter|.
          1. Return the numeric value of _ch_.
        </emu-alg>
        <emu-grammar>
          ClassEscape :: `b`
        </emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+0008 (BACKSPACE).
        </emu-alg>
        <emu-grammar>
          ClassEscape :: `-`
        </emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+002D (HYPHEN-MINUS).
        </emu-alg>
        <emu-grammar>CharacterEscape :: ControlEscape</emu-grammar>
        <emu-alg>
          1. Return the numeric value according to <emu-xref href="#table-controlescape-code-point-values"></emu-xref>.
        </emu-alg>
        <emu-table id="table-controlescape-code-point-values" caption="ControlEscape Code Point Values" oldids="table-47">
          <table>
            <thead>
              <tr>
                <th>
                  ControlEscape
                </th>
                <th>
                  Numeric Value
                </th>
                <th>
                  Code Point
                </th>
                <th>
                  Unicode Name
                </th>
                <th>
                  Symbol
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                `t`
              </td>
              <td>
                9
              </td>
              <td>
                `U+0009`
              </td>
              <td>
                CHARACTER TABULATION
              </td>
              <td>
                &lt;HT>
              </td>
            </tr>
            <tr>
              <td>
                `n`
              </td>
              <td>
                10
              </td>
              <td>
                `U+000A`
              </td>
              <td>
                LINE FEED (LF)
              </td>
              <td>
                &lt;LF>
              </td>
            </tr>
            <tr>
              <td>
                `v`
              </td>
              <td>
                11
              </td>
              <td>
                `U+000B`
              </td>
              <td>
                LINE TABULATION
              </td>
              <td>
                &lt;VT>
              </td>
            </tr>
            <tr>
              <td>
                `f`
              </td>
              <td>
                12
              </td>
              <td>
                `U+000C`
              </td>
              <td>
                FORM FEED (FF)
              </td>
              <td>
                &lt;FF>
              </td>
            </tr>
            <tr>
              <td>
                `r`
              </td>
              <td>
                13
              </td>
              <td>
                `U+000D`
              </td>
              <td>
                CARRIAGE RETURN (CR)
              </td>
              <td>
                &lt;CR>
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-grammar>CharacterEscape :: `c` AsciiLetter</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |AsciiLetter|.
          1. Let _i_ be the numeric value of _ch_.
          1. Return the remainder of dividing _i_ by 32.
        </emu-alg>
        <emu-grammar>CharacterEscape :: `0` [lookahead &notin; DecimalDigit]</emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+0000 (NULL).
        </emu-alg>
        <emu-note>
          <p>`\\0` represents the &lt;NUL> character and cannot be followed by a decimal digit.</p>
        </emu-note>
        <emu-grammar>CharacterEscape :: HexEscapeSequence</emu-grammar>
        <emu-alg>
          1. Return the MV of |HexEscapeSequence|.
        </emu-alg>
        <emu-grammar>RegExpUnicodeEscapeSequence :: `u` HexLeadSurrogate `\u` HexTrailSurrogate</emu-grammar>
        <emu-alg>
          1. Let _lead_ be the CharacterValue of |HexLeadSurrogate|.
          1. Let _trail_ be the CharacterValue of |HexTrailSurrogate|.
          1. Let _cp_ be UTF16SurrogatePairToCodePoint(_lead_, _trail_).
          1. Return the numeric value of _cp_.
        </emu-alg>
        <emu-grammar>RegExpUnicodeEscapeSequence :: `u` Hex4Digits</emu-grammar>
        <emu-alg>
          1. Return the MV of |Hex4Digits|.
        </emu-alg>
        <emu-grammar>RegExpUnicodeEscapeSequence :: `u{` CodePoint `}`</emu-grammar>
        <emu-alg>
          1. Return the MV of |CodePoint|.
        </emu-alg>
        <emu-grammar>
          HexLeadSurrogate :: Hex4Digits

          HexTrailSurrogate :: Hex4Digits

          HexNonSurrogate :: Hex4Digits
        </emu-grammar>
        <emu-alg>
          1. Return the MV of |Hex4Digits|.
        </emu-alg>
        <emu-grammar>CharacterEscape :: IdentityEscape</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |IdentityEscape|.
          1. Return the numeric value of _ch_.
        </emu-alg>
        <emu-grammar>ClassSetCharacter :: SourceCharacter but not ClassSetSyntaxCharacter</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |SourceCharacter|.
          1. Return the numeric value of _ch_.
        </emu-alg>
        <emu-grammar>ClassSetCharacter :: `\` ClassSetReservedPunctuator</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |ClassSetReservedPunctuator|.
          1. Return the numeric value of _ch_.
        </emu-alg>
        <emu-grammar>ClassSetCharacter :: `\b`</emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+0008 (BACKSPACE).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-maycontainstrings" type="sdo">
        <h1>Static Semantics: MayContainStrings ( ): a Boolean</h1>
        <dl class="header">
        </dl>
        <emu-grammar>
          CharacterClassEscape ::
            `d`
            `D`
            `s`
            `S`
            `w`
            `W`
            `P{` UnicodePropertyValueExpression `}`

          UnicodePropertyValueExpression ::
            UnicodePropertyName `=` UnicodePropertyValue

          NestedClass ::
            `[^` ClassContents `]`

          ClassContents ::
            [empty]
            NonemptyClassRanges

          ClassSetOperand ::
            ClassSetCharacter
        </emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
        <emu-grammar>UnicodePropertyValueExpression :: LoneUnicodePropertyNameOrValue</emu-grammar>
        <emu-alg>
          1. If the source text matched by |LoneUnicodePropertyNameOrValue| is a binary property of strings listed in the “Property name” column of <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>, return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ClassUnion :: ClassSetRange ClassUnion?</emu-grammar>
        <emu-alg>
          1. If the |ClassUnion| is present, return MayContainStrings of the |ClassUnion|.
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ClassUnion :: ClassSetOperand ClassUnion?</emu-grammar>
        <emu-alg>
          1. If MayContainStrings of the |ClassSetOperand| is *true*, return *true*.
          1. If |ClassUnion| is present, return MayContainStrings of the |ClassUnion|.
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ClassIntersection :: ClassSetOperand `&amp;&amp;` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. If MayContainStrings of the first |ClassSetOperand| is *false*, return *false*.
          1. If MayContainStrings of the second |ClassSetOperand| is *false*, return *false*.
          1. Return *true*.
        </emu-alg>
        <emu-grammar>ClassIntersection :: ClassIntersection `&amp;&amp;` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. If MayContainStrings of the |ClassIntersection| is *false*, return *false*.
          1. If MayContainStrings of the |ClassSetOperand| is *false*, return *false*.
          1. Return *true*.
        </emu-alg>
        <emu-grammar>ClassSubtraction :: ClassSetOperand `--` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Return MayContainStrings of the first |ClassSetOperand|.
        </emu-alg>
        <emu-grammar>ClassSubtraction :: ClassSubtraction `--` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Return MayContainStrings of the |ClassSubtraction|.
        </emu-alg>
        <emu-grammar>ClassStringDisjunctionContents :: ClassString `|` ClassStringDisjunctionContents</emu-grammar>
        <emu-alg>
          1. If MayContainStrings of the |ClassString| is *true*, return *true*.
          1. Return MayContainStrings of the |ClassStringDisjunctionContents|.
        </emu-alg>
        <emu-grammar>ClassString :: [empty]</emu-grammar>
        <emu-alg>
          1. Return *true*.
        </emu-alg>
        <emu-grammar>ClassString :: NonEmptyClassString</emu-grammar>
        <emu-alg>
          1. Return MayContainStrings of the |NonEmptyClassString|.
        </emu-alg>
        <emu-grammar>NonEmptyClassString :: ClassSetCharacter NonEmptyClassString?</emu-grammar>
        <emu-alg>
          1. If |NonEmptyClassString| is present, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-groupspecifiersthatmatch" type="abstract operation">
        <h1>
          Static Semantics: GroupSpecifiersThatMatch (
            _thisGroupName_: a |GroupName| Parse Node,
          ): a List of |GroupSpecifier| Parse Nodes
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _name_ be the CapturingGroupName of _thisGroupName_.
          1. Let _pattern_ be the |Pattern| containing _thisGroupName_.
          1. Let _result_ be a new empty List.
          1. For each |GroupSpecifier| _gs_ that _pattern_ contains, do
            1. If the CapturingGroupName of _gs_ is _name_, then
              1. Append _gs_ to _result_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-capturinggroupname" oldids="sec-regexp-identifier-names-static-semantics-stringvalue" type="sdo">
        <h1>Static Semantics: CapturingGroupName ( ): a String</h1>
        <dl class="header">
        </dl>
        <emu-grammar>
          GroupName :: `&lt;` RegExpIdentifierName `&gt;`
        </emu-grammar>
        <emu-alg>
          1. Let _idTextUnescaped_ be the RegExpIdentifierCodePoints of |RegExpIdentifierName|.
          1. Return CodePointsToString(_idTextUnescaped_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexpidentifiercodepoints" type="sdo">
        <h1>Static Semantics: RegExpIdentifierCodePoints ( ): a List of code points</h1>
        <dl class="header">
        </dl>
        <emu-grammar>RegExpIdentifierName :: RegExpIdentifierStart</emu-grammar>
        <emu-alg>
          1. Let _cp_ be the RegExpIdentifierCodePoint of |RegExpIdentifierStart|.
          1. Return « _cp_ ».
        </emu-alg>
        <emu-grammar>RegExpIdentifierName :: RegExpIdentifierName RegExpIdentifierPart</emu-grammar>
        <emu-alg>
          1. Let _cps_ be the RegExpIdentifierCodePoints of the derived |RegExpIdentifierName|.
          1. Let _cp_ be the RegExpIdentifierCodePoint of |RegExpIdentifierPart|.
          1. Return the list-concatenation of _cps_ and « _cp_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexpidentifiercodepoint" type="sdo">
        <h1>Static Semantics: RegExpIdentifierCodePoint ( ): a code point</h1>
        <dl class="header">
        </dl>
        <emu-grammar>RegExpIdentifierStart :: IdentifierStartChar</emu-grammar>
        <emu-alg>
          1. Return the code point matched by |IdentifierStartChar|.
        </emu-alg>
        <emu-grammar>RegExpIdentifierPart :: IdentifierPartChar</emu-grammar>
        <emu-alg>
          1. Return the code point matched by |IdentifierPartChar|.
        </emu-alg>
        <emu-grammar>
          RegExpIdentifierStart :: `\` RegExpUnicodeEscapeSequence

          RegExpIdentifierPart :: `\` RegExpUnicodeEscapeSequence
        </emu-grammar>
        <emu-alg>
          1. Return the code point whose numeric value is the CharacterValue of |RegExpUnicodeEscapeSequence|.
        </emu-alg>
        <emu-grammar>
          RegExpIdentifierStart :: UnicodeLeadSurrogate UnicodeTrailSurrogate

          RegExpIdentifierPart :: UnicodeLeadSurrogate UnicodeTrailSurrogate
        </emu-grammar>
        <emu-alg>
          1. Let _lead_ be the code unit whose numeric value is the numeric value of the code point matched by |UnicodeLeadSurrogate|.
          1. Let _trail_ be the code unit whose numeric value is the numeric value of the code point matched by |UnicodeTrailSurrogate|.
          1. Return UTF16SurrogatePairToCodePoint(_lead_, _trail_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-pattern-semantics">
      <h1>Pattern Semantics</h1>
      <p>A regular expression pattern is converted into an Abstract Closure using the process described below. An implementation is encouraged to use more efficient algorithms than the ones listed below, as long as the results are the same. The Abstract Closure is used as the value of a RegExp object's [[RegExpMatcher]] internal slot.</p>
      <p>A |Pattern| is a BMP pattern if its associated flags contain neither a `u` nor a `v`. Otherwise, it is a Unicode pattern. A BMP pattern matches against a String interpreted as consisting of a sequence of 16-bit values that are Unicode code points in the range of the Basic Multilingual Plane. A Unicode pattern matches against a String interpreted as consisting of Unicode code points encoded using UTF-16. In the context of describing the behaviour of a BMP pattern “character” means a single 16-bit Unicode BMP code point. In the context of describing the behaviour of a Unicode pattern “character” means a UTF-16 encoded code point (<emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>). In either context, “character value” means the numeric value of the corresponding non-encoded code point.</p>
      <p>The syntax and semantics of |Pattern| is defined as if the source text for the |Pattern| was a List of |SourceCharacter| values where each |SourceCharacter| corresponds to a Unicode code point. If a BMP pattern contains a non-BMP |SourceCharacter| the entire pattern is encoded using UTF-16 and the individual code units of that encoding are used as the elements of the List.</p>
      <emu-note>
        <p>For example, consider a pattern expressed in source text as the single non-BMP character U+1D11E (MUSICAL SYMBOL G CLEF). Interpreted as a Unicode pattern, it would be a single element (character) List consisting of the single code point U+1D11E. However, interpreted as a BMP pattern, it is first UTF-16 encoded to produce a two element List consisting of the code units 0xD834 and 0xDD1E.</p>
        <p>Patterns are passed to the RegExp constructor as ECMAScript String values in which non-BMP characters are UTF-16 encoded. For example, the single character MUSICAL SYMBOL G CLEF pattern, expressed as a String value, is a String of length 2 whose elements were the code units 0xD834 and 0xDD1E. So no further translation of the string would be necessary to process it as a BMP pattern consisting of two pattern characters. However, to process it as a Unicode pattern UTF16SurrogatePairToCodePoint must be used in producing a List whose sole element is a single pattern character, the code point U+1D11E.</p>
        <p>An implementation may not actually perform such translations to or from UTF-16, but the semantics of this specification requires that the result of pattern matching be as if such translations were performed.</p>
      </emu-note>

      <emu-clause id="sec-pattern-notation" oldids="sec-notation">
        <h1>Notation</h1>
        <p>The descriptions below use the following internal data structures:</p>
        <ul>
          <li>
            A <dfn>CharSetElement</dfn> is one of the two following entities:
            <ul>
              <li>
                If _rer_.[[UnicodeSets]] is *false*, then a CharSetElement is a character in the sense of the Pattern Semantics above.
              </li>
              <li>
                If _rer_.[[UnicodeSets]] is *true*, then a CharSetElement is a sequence whose elements are characters in the sense of the Pattern Semantics above. This includes the empty sequence, sequences of one character, and sequences of more than one character. For convenience, when working with CharSetElements of this kind, an individual character is treated interchangeably with a sequence of one character.
              </li>
            </ul>
          </li>
          <li>
            A <dfn id="pattern-charset" variants="CharSets">CharSet</dfn> is a mathematical set of CharSetElements.
          </li>
          <li>
            A <dfn id="pattern-capturerange" variants="CaptureRanges">CaptureRange</dfn> is a Record { [[StartIndex]], [[EndIndex]] } that represents the range of characters included in a capture, where [[StartIndex]] is an integer representing the start index (inclusive) of the range within _Input_, and [[EndIndex]] is an integer representing the end index (exclusive) of the range within _Input_. For any CaptureRange, these indices must satisfy the invariant that [[StartIndex]] ≤ [[EndIndex]].
          </li>
          <li>
            A <dfn id="pattern-matchstate" variants="MatchStates">MatchState</dfn> is a Record { [[Input]], [[EndIndex]], [[Captures]] } where [[Input]] is a List of characters representing the String being matched, [[EndIndex]] is an integer, and [[Captures]] is a List of values, one for each left-capturing parenthesis in the pattern. States are used to represent partial match states in the regular expression matching algorithms. The [[EndIndex]] is one plus the index of the last input character matched so far by the pattern, while [[Captures]] holds the results of capturing parentheses. The _n_<sup>th</sup> element of [[Captures]] is either a CaptureRange representing the range of characters captured by the _n_<sup>th</sup> set of capturing parentheses, or *undefined* if the _n_<sup>th</sup> set of capturing parentheses hasn't been reached yet. Due to backtracking, many States may be in use at any time during the matching process.
          </li>
          <li>
            A <dfn id="pattern-matchresult" variants="MatchResults">MatchResult</dfn> is either a MatchState or the special token ~failure~ that indicates that the match failed.
          </li>
          <li>
            A <dfn id="pattern-matchercontinuation" variants="MatcherContinuations">MatcherContinuation</dfn> is an Abstract Closure that takes one MatchState argument and returns a MatchResult result. The MatcherContinuation attempts to match the remaining portion (specified by the closure's captured values) of the pattern against _Input_, starting at the intermediate state given by its MatchState argument. If the match succeeds, the MatcherContinuation returns the final MatchState that it reached; if the match fails, the MatcherContinuation returns ~failure~.
          </li>
          <li>
            A <dfn id="pattern-matcher" variants="Matchers">Matcher</dfn> is an Abstract Closure that takes two arguments—a MatchState and a MatcherContinuation—and returns a MatchResult result. A Matcher attempts to match a middle subpattern (specified by the closure's captured values) of the pattern against the MatchState's [[Input]], starting at the intermediate state given by its MatchState argument. The MatcherContinuation argument should be a closure that matches the rest of the pattern. After matching the subpattern of a pattern to obtain a new MatchState, the Matcher then calls MatcherContinuation on that new MatchState to test if the rest of the pattern can match as well. If it can, the Matcher returns the MatchState returned by MatcherContinuation; if not, the Matcher may try different choices at its choice points, repeatedly calling MatcherContinuation until it either succeeds or all possibilities have been exhausted.
          </li>
        </ul>

        <emu-clause id="sec-regexp-records">
          <h1>RegExp Records</h1>
          <p>A <dfn variants="RegExp Records">RegExp Record</dfn> is a Record value used to store information about a RegExp that is needed during compilation and possibly during matching.</p>
          <p>It has the following fields:</p>
          <emu-table id="table-regexp-record-fields" caption="RegExp Record Fields">
            <table>
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Value</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tr>
                <td>[[IgnoreCase]]</td>
                <td>a Boolean</td>
                <td>indicates whether *"i"* appears in the RegExp's flags</td>
              </tr>
              <tr>
                <td>[[Multiline]]</td>
                <td>a Boolean</td>
                <td>indicates whether *"m"* appears in the RegExp's flags</td>
              </tr>
              <tr>
                <td>[[DotAll]]</td>
                <td>a Boolean</td>
                <td>indicates whether *"s"* appears in the RegExp's flags</td>
              </tr>
              <tr>
                <td>[[Unicode]]</td>
                <td>a Boolean</td>
                <td>indicates whether *"u"* appears in the RegExp's flags</td>
              </tr>
              <tr>
                <td>[[UnicodeSets]]</td>
                <td>a Boolean</td>
                <td>indicates whether *"v"* appears in the RegExp's flags</td>
              </tr>
              <tr>
                <td>[[CapturingGroupsCount]]</td>
                <td>a non-negative integer</td>
                <td>the number of left-capturing parentheses in the RegExp's pattern</td>
              </tr>
            </table>
          </emu-table>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-compilepattern" type="sdo" oldids="sec-pattern">
        <h1>
          Runtime Semantics: CompilePattern (
            _rer_: a RegExp Record,
          ): an Abstract Closure that takes a List of characters and a non-negative integer and returns a MatchResult
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>Pattern :: Disjunction</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and ~forward~.
          1. Return a new Abstract Closure with parameters (_Input_, _index_) that captures _rer_ and _m_ and performs the following steps when called:
            1. Assert: _Input_ is a List of characters.
            1. Assert: 0 ≤ _index_ ≤ the number of elements in _Input_.
            1. Let _c_ be a new MatcherContinuation with parameters (_y_) that captures nothing and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Return _y_.
            1. Let _cap_ be a List of _rer_.[[CapturingGroupsCount]] *undefined* values, indexed 1 through _rer_.[[CapturingGroupsCount]].
            1. Let _x_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _index_, [[Captures]]: _cap_ }.
            1. Return _m_(_x_, _c_).
        </emu-alg>
        <emu-note>
          <p>A Pattern compiles to an Abstract Closure value. RegExpBuiltinExec can then apply this procedure to a List of characters and an offset within that List to determine whether the pattern would match starting at exactly that offset within the List, and, if it does match, what the values of the capturing parentheses would be. The algorithms in <emu-xref href="#sec-pattern-semantics"></emu-xref> are designed so that compiling a pattern may throw a *SyntaxError* exception; on the other hand, once the pattern is successfully compiled, applying the resulting Abstract Closure to find a match in a List of characters cannot throw an exception (except for any implementation-defined exceptions that can occur anywhere such as out-of-memory).</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-compilesubpattern" type="sdo" oldids="sec-disjunction,sec-alternative,sec-term">
        <h1>
          Runtime Semantics: CompileSubpattern (
            _rer_: a RegExp Record,
            _direction_: ~forward~ or ~backward~,
          ): a Matcher
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-compilesubpattern-annexb"></emu-xref>.</p>
        </emu-note>

        <!-- Disjunction -->
        <emu-grammar>Disjunction :: Alternative `|` Disjunction</emu-grammar>
        <emu-alg>
          1. Let _m1_ be CompileSubpattern of |Alternative| with arguments _rer_ and _direction_.
          1. Let _m2_ be CompileSubpattern of |Disjunction| with arguments _rer_ and _direction_.
          1. Return MatchTwoAlternatives(_m1_, _m2_).
        </emu-alg>
        <emu-note>
          <p>The `|` regular expression operator separates two alternatives. The pattern first tries to match the left |Alternative| (followed by the sequel of the regular expression); if it fails, it tries to match the right |Disjunction| (followed by the sequel of the regular expression). If the left |Alternative|, the right |Disjunction|, and the sequel all have choice points, all choices in the sequel are tried before moving on to the next choice in the left |Alternative|. If choices in the left |Alternative| are exhausted, the right |Disjunction| is tried instead of the left |Alternative|. Any capturing parentheses inside a portion of the pattern skipped by `|` produce *undefined* values instead of Strings. Thus, for example,</p>
          <pre><code class="javascript">/a|ab/.exec("abc")</code></pre>
          <p>returns the result *"a"* and not *"ab"*. Moreover,</p>
          <pre><code class="javascript">/((a)|(ab))((c)|(bc))/.exec("abc")</code></pre>
          <p>returns the array</p>
          <pre><code class="javascript">["abc", "a", "a", undefined, "bc", undefined, "bc"]</code></pre>
          <p>and not</p>
          <pre><code class="javascript">["abc", "ab", undefined, "ab", "c", "c", undefined]</code></pre>
          <p>The order in which the two alternatives are tried is independent of the value of _direction_.</p>
        </emu-note>

        <!-- Alternative -->
        <emu-grammar>Alternative :: [empty]</emu-grammar>
        <emu-alg>
          1. Return EmptyMatcher().
        </emu-alg>
        <emu-grammar>Alternative :: Alternative Term</emu-grammar>
        <emu-alg>
          1. Let _m1_ be CompileSubpattern of |Alternative| with arguments _rer_ and _direction_.
          1. Let _m2_ be CompileSubpattern of |Term| with arguments _rer_ and _direction_.
          1. Return MatchSequence(_m1_, _m2_, _direction_).
        </emu-alg>
        <emu-note>
          <p>Consecutive |Term|s try to simultaneously match consecutive portions of _Input_. When _direction_ is ~forward~, if the left |Alternative|, the right |Term|, and the sequel of the regular expression all have choice points, all choices in the sequel are tried before moving on to the next choice in the right |Term|, and all choices in the right |Term| are tried before moving on to the next choice in the left |Alternative|. When _direction_ is ~backward~, the evaluation order of |Alternative| and |Term| are reversed.</p>
        </emu-note>

        <!-- Term -->
        <emu-grammar>Term :: Assertion</emu-grammar>
        <emu-alg>
          1. Return CompileAssertion of |Assertion| with argument _rer_.
        </emu-alg>
        <emu-note>
          <p>The resulting Matcher is independent of _direction_.</p>
        </emu-note>
        <emu-grammar>Term :: Atom</emu-grammar>
        <emu-alg>
          1. Return CompileAtom of |Atom| with arguments _rer_ and _direction_.
        </emu-alg>
        <emu-grammar>Term :: Atom Quantifier</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileAtom of |Atom| with arguments _rer_ and _direction_.
          1. Let _q_ be CompileQuantifier of |Quantifier|.
          1. Assert: _q_.[[Min]] ≤ _q_.[[Max]].
          1. Let _parenIndex_ be CountLeftCapturingParensBefore(|Term|).
          1. Let _parenCount_ be CountLeftCapturingParensWithin(|Atom|).
          1. Return a new Matcher with parameters (_x_, _c_) that captures _m_, _q_, _parenIndex_, and _parenCount_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Return RepeatMatcher(_m_, _q_.[[Min]], _q_.[[Max]], _q_.[[Greedy]], _x_, _c_, _parenIndex_, _parenCount_).
        </emu-alg>

        <emu-clause id="sec-runtime-semantics-repeatmatcher-abstract-operation" type="abstract operation">
          <h1>
            RepeatMatcher (
              _m_: a Matcher,
              _min_: a non-negative integer,
              _max_: a non-negative integer or +&infin;,
              _greedy_: a Boolean,
              _x_: a MatchState,
              _c_: a MatcherContinuation,
              _parenIndex_: a non-negative integer,
              _parenCount_: a non-negative integer,
            ): a MatchResult
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _max_ = 0, return _c_(_x_).
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures _m_, _min_, _max_, _greedy_, _x_, _c_, _parenIndex_, and _parenCount_ and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. [id="step-repeatmatcher-done"] If _min_ = 0 and _y_.[[EndIndex]] = _x_.[[EndIndex]], return ~failure~.
              1. If _min_ = 0, let _min2_ be 0; otherwise let _min2_ be _min_ - 1.
              1. If _max_ = +∞, let _max2_ be +∞; otherwise let _max2_ be _max_ - 1.
              1. Return RepeatMatcher(_m_, _min2_, _max2_, _greedy_, _y_, _c_, _parenIndex_, _parenCount_).
            1. Let _cap_ be a copy of _x_.[[Captures]].
            1. [id="step-repeatmatcher-clear-captures"] For each integer _k_ in the inclusive interval from _parenIndex_ + 1 to _parenIndex_ + _parenCount_, set _cap_[_k_] to *undefined*.
            1. Let _Input_ be _x_.[[Input]].
            1. Let _e_ be _x_.[[EndIndex]].
            1. Let _xr_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _e_, [[Captures]]: _cap_ }.
            1. If _min_ ≠ 0, return _m_(_xr_, _d_).
            1. If _greedy_ is *false*, then
              1. Let _z_ be _c_(_x_).
              1. If _z_ is not ~failure~, return _z_.
              1. Return _m_(_xr_, _d_).
            1. Let _z_ be _m_(_xr_, _d_).
            1. If _z_ is not ~failure~, return _z_.
            1. Return _c_(_x_).
          </emu-alg>
          <emu-note>
            <p>An |Atom| followed by a |Quantifier| is repeated the number of times specified by the |Quantifier|. A |Quantifier| can be non-greedy, in which case the |Atom| pattern is repeated as few times as possible while still matching the sequel, or it can be greedy, in which case the |Atom| pattern is repeated as many times as possible while still matching the sequel. The |Atom| pattern is repeated rather than the input character sequence that it matches, so different repetitions of the |Atom| can match different input substrings.</p>
          </emu-note>
          <emu-note>
            <p>If the |Atom| and the sequel of the regular expression all have choice points, the |Atom| is first matched as many (or as few, if non-greedy) times as possible. All choices in the sequel are tried before moving on to the next choice in the last repetition of |Atom|. All choices in the last (n<sup>th</sup>) repetition of |Atom| are tried before moving on to the next choice in the next-to-last (n - 1)<sup>st</sup> repetition of |Atom|; at which point it may turn out that more or fewer repetitions of |Atom| are now possible; these are exhausted (again, starting with either as few or as many as possible) before moving on to the next choice in the (n - 1)<sup>st</sup> repetition of |Atom| and so on.</p>
            <p>Compare</p>
            <pre><code class="javascript">/a[a-z]{2,4}/.exec("abcdefghi")</code></pre>
            <p>which returns *"abcde"* with</p>
            <pre><code class="javascript">/a[a-z]{2,4}?/.exec("abcdefghi")</code></pre>
            <p>which returns *"abc"*.</p>
            <p>Consider also</p>
            <pre><code class="javascript">/(aa|aabaac|ba|b|c)*/.exec("aabaac")</code></pre>
            <p>which, by the choice point ordering above, returns the array</p>
            <pre><code class="javascript">["aaba", "ba"]</code></pre>
            <p>and not any of:</p>
            <pre><code class="javascript">
              ["aabaac", "aabaac"]
              ["aabaac", "c"]
            </code></pre>
            <p>The above ordering of choice points can be used to write a regular expression that calculates the greatest common divisor of two numbers (represented in unary notation). The following example calculates the gcd of 10 and 15:</p>
            <pre><code class="javascript">"aaaaaaaaaa,aaaaaaaaaaaaaaa".replace(/^(a+)\1*,\1+$/, "$1")</code></pre>
            <p>which returns the gcd in unary notation *"aaaaa"*.</p>
          </emu-note>
          <emu-note>
            <p>Step <emu-xref href="#step-repeatmatcher-clear-captures"></emu-xref> of the RepeatMatcher clears |Atom|'s captures each time |Atom| is repeated. We can see its behaviour in the regular expression</p>
            <pre><code class="javascript">/(z)((a+)?(b+)?(c))*/.exec("zaacbbbcac")</code></pre>
            <p>which returns the array</p>
            <pre><code class="javascript">["zaacbbbcac", "z", "ac", "a", undefined, "c"]</code></pre>
            <p>and not</p>
            <pre><code class="javascript">["zaacbbbcac", "z", "ac", "a", "bbb", "c"]</code></pre>
            <p>because each iteration of the outermost `*` clears all captured Strings contained in the quantified |Atom|, which in this case includes capture Strings numbered 2, 3, 4, and 5.</p>
          </emu-note>
          <emu-note>
            <p>Step <emu-xref href="#step-repeatmatcher-done"></emu-xref> of the RepeatMatcher states that once the minimum number of repetitions has been satisfied, any more expansions of |Atom| that match the empty character sequence are not considered for further repetitions. This prevents the regular expression engine from falling into an infinite loop on patterns such as:</p>
            <pre><code class="javascript">/(a*)*/.exec("b")</code></pre>
            <p>or the slightly more complicated:</p>
            <pre><code class="javascript">/(a*)b\1+/.exec("baaaac")</code></pre>
            <p>which returns the array</p>
            <pre><code class="javascript">["b", ""]</code></pre>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-emptymatcher" type="abstract operation">
          <h1>EmptyMatcher ( ): a Matcher</h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return a new Matcher with parameters (_x_, _c_) that captures nothing and performs the following steps when called:
              1. Assert: _x_ is a MatchState.
              1. Assert: _c_ is a MatcherContinuation.
              1. Return _c_(_x_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-matchtwoalternatives" type="abstract operation">
          <h1>
            MatchTwoAlternatives (
              _m1_: a Matcher,
              _m2_: a Matcher,
            ): a Matcher
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return a new Matcher with parameters (_x_, _c_) that captures _m1_ and _m2_ and performs the following steps when called:
              1. Assert: _x_ is a MatchState.
              1. Assert: _c_ is a MatcherContinuation.
              1. Let _r_ be _m1_(_x_, _c_).
              1. If _r_ is not ~failure~, return _r_.
              1. Return _m2_(_x_, _c_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-matchsequence" type="abstract operation">
          <h1>
            MatchSequence (
              _m1_: a Matcher,
              _m2_: a Matcher,
              _direction_: ~forward~ or ~backward~,
            ): a Matcher
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _direction_ is ~forward~, then
              1. Return a new Matcher with parameters (_x_, _c_) that captures _m1_ and _m2_ and performs the following steps when called:
                1. Assert: _x_ is a MatchState.
                1. Assert: _c_ is a MatcherContinuation.
                1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures _c_ and _m2_ and performs the following steps when called:
                  1. Assert: _y_ is a MatchState.
                  1. Return _m2_(_y_, _c_).
                1. Return _m1_(_x_, _d_).
            1. Else,
              1. Assert: _direction_ is ~backward~.
              1. Return a new Matcher with parameters (_x_, _c_) that captures _m1_ and _m2_ and performs the following steps when called:
                1. Assert: _x_ is a MatchState.
                1. Assert: _c_ is a MatcherContinuation.
                1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures _c_ and _m1_ and performs the following steps when called:
                  1. Assert: _y_ is a MatchState.
                  1. Return _m1_(_y_, _c_).
                1. Return _m2_(_x_, _d_).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-compileassertion" type="sdo" oldids="sec-assertion">
        <h1>
          Runtime Semantics: CompileAssertion (
            _rer_: a RegExp Record,
          ): a Matcher
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-compileassertion-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-grammar>Assertion :: `^`</emu-grammar>
        <emu-alg>
          1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _Input_ be _x_.[[Input]].
            1. Let _e_ be _x_.[[EndIndex]].
            1. If _e_ = 0, or if _rer_.[[Multiline]] is *true* and the character _Input_[_e_ - 1] is matched by |LineTerminator|, then
              1. Return _c_(_x_).
            1. Return ~failure~.
        </emu-alg>
        <emu-note>
          <p>Even when the `y` flag is used with a pattern, `^` always matches only at the beginning of _Input_, or (if _rer_.[[Multiline]] is *true*) at the beginning of a line.</p>
        </emu-note>
        <emu-grammar>Assertion :: `$`</emu-grammar>
        <emu-alg>
          1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _Input_ be _x_.[[Input]].
            1. Let _e_ be _x_.[[EndIndex]].
            1. Let _InputLength_ be the number of elements in _Input_.
            1. If _e_ = _InputLength_, or if _rer_.[[Multiline]] is *true* and the character _Input_[_e_] is matched by |LineTerminator|, then
              1. Return _c_(_x_).
            1. Return ~failure~.
        </emu-alg>
        <emu-grammar>Assertion :: `\b`</emu-grammar>
        <emu-alg>
          1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _Input_ be _x_.[[Input]].
            1. Let _e_ be _x_.[[EndIndex]].
            1. Let _a_ be IsWordChar(_rer_, _Input_, _e_ - 1).
            1. Let _b_ be IsWordChar(_rer_, _Input_, _e_).
            1. If _a_ is *true* and _b_ is *false*, or if _a_ is *false* and _b_ is *true*, return _c_(_x_).
            1. Return ~failure~.
        </emu-alg>
        <emu-grammar>Assertion :: `\B`</emu-grammar>
        <emu-alg>
          1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _Input_ be _x_.[[Input]].
            1. Let _e_ be _x_.[[EndIndex]].
            1. Let _a_ be IsWordChar(_rer_, _Input_, _e_ - 1).
            1. Let _b_ be IsWordChar(_rer_, _Input_, _e_).
            1. If _a_ is *true* and _b_ is *true*, or if _a_ is *false* and _b_ is *false*, return _c_(_x_).
            1. Return ~failure~.
        </emu-alg>
        <emu-grammar>Assertion :: `(?=` Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and ~forward~.
          1. Return a new Matcher with parameters (_x_, _c_) that captures _m_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures nothing and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Return _y_.
            1. Let _r_ be _m_(_x_, _d_).
            1. If _r_ is ~failure~, return ~failure~.
            1. Assert: _r_ is a MatchState.
            1. Let _cap_ be _r_.[[Captures]].
            1. Let _Input_ be _x_.[[Input]].
            1. Let _xe_ be _x_.[[EndIndex]].
            1. Let _z_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _xe_, [[Captures]]: _cap_ }.
            1. Return _c_(_z_).
        </emu-alg>
        <emu-note>
          <p>The form `(?=` |Disjunction| `)` specifies a zero-width positive lookahead. In order for it to succeed, the pattern inside |Disjunction| must match at the current position, but the current position is not advanced before matching the sequel. If |Disjunction| can match at the current position in several ways, only the first one is tried. Unlike other regular expression operators, there is no backtracking into a `(?=` form (this unusual behaviour is inherited from Perl). This only matters when the |Disjunction| contains capturing parentheses and the sequel of the pattern contains backreferences to those captures.</p>
          <p>For example,</p>
          <pre><code class="javascript">/(?=(a+))/.exec("baaabac")</code></pre>
          <p>matches the empty String immediately after the first `b` and therefore returns the array:</p>
          <pre><code class="javascript">["", "aaa"]</code></pre>
          <p>To illustrate the lack of backtracking into the lookahead, consider:</p>
          <pre><code class="javascript">/(?=(a+))a*b\1/.exec("baaabac")</code></pre>
          <p>This expression returns</p>
          <pre><code class="javascript">["aba", "a"]</code></pre>
          <p>and not:</p>
          <pre><code class="javascript">["aaaba", "a"]</code></pre>
        </emu-note>
        <emu-grammar>Assertion :: `(?!` Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and ~forward~.
          1. Return a new Matcher with parameters (_x_, _c_) that captures _m_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures nothing and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Return _y_.
            1. Let _r_ be _m_(_x_, _d_).
            1. If _r_ is not ~failure~, return ~failure~.
            1. Return _c_(_x_).
        </emu-alg>
        <emu-note>
          <p>The form `(?!` |Disjunction| `)` specifies a zero-width negative lookahead. In order for it to succeed, the pattern inside |Disjunction| must fail to match at the current position. The current position is not advanced before matching the sequel. |Disjunction| can contain capturing parentheses, but backreferences to them only make sense from within |Disjunction| itself. Backreferences to these capturing parentheses from elsewhere in the pattern always return *undefined* because the negative lookahead must fail for the pattern to succeed. For example,</p>
          <pre><code class="javascript">/(.*?)a(?!(a+)b\2c)\2(.*)/.exec("baaabaac")</code></pre>
          <p>looks for an `a` not immediately followed by some positive number n of `a`'s, a `b`, another n `a`'s (specified by the first `\\2`) and a `c`. The second `\\2` is outside the negative lookahead, so it matches against *undefined* and therefore always succeeds. The whole expression returns the array:</p>
          <pre><code class="javascript">["baaabaac", "ba", undefined, "abaac"]</code></pre>
        </emu-note>
        <emu-grammar>Assertion :: `(?&lt;=` Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and ~backward~.
          1. Return a new Matcher with parameters (_x_, _c_) that captures _m_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures nothing and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Return _y_.
            1. Let _r_ be _m_(_x_, _d_).
            1. If _r_ is ~failure~, return ~failure~.
            1. Assert: _r_ is a MatchState.
            1. Let _cap_ be _r_.[[Captures]].
            1. Let _Input_ be _x_.[[Input]].
            1. Let _xe_ be _x_.[[EndIndex]].
            1. Let _z_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _xe_, [[Captures]]: _cap_ }.
            1. Return _c_(_z_).
        </emu-alg>
        <emu-grammar>Assertion :: `(?&lt;!` Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and ~backward~.
          1. Return a new Matcher with parameters (_x_, _c_) that captures _m_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures nothing and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Return _y_.
            1. Let _r_ be _m_(_x_, _d_).
            1. If _r_ is not ~failure~, return ~failure~.
            1. Return _c_(_x_).
        </emu-alg>

        <emu-clause id="sec-runtime-semantics-iswordchar-abstract-operation" type="abstract operation">
          <h1>
            IsWordChar (
              _rer_: a RegExp Record,
              _Input_: a List of characters,
              _e_: an integer,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _InputLength_ be the number of elements in _Input_.
            1. If _e_ = -1 or _e_ = _InputLength_, return *false*.
            1. Let _c_ be the character _Input_[_e_].
            1. If WordCharacters(_rer_) contains _c_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-compilequantifier" type="sdo" oldids="sec-quantifier">
        <h1>Runtime Semantics: CompileQuantifier ( ): a Record with fields [[Min]] (a non-negative integer), [[Max]] (a non-negative integer or +&infin;), and [[Greedy]] (a Boolean)</h1>
        <dl class="header">
        </dl>
        <emu-grammar>Quantifier :: QuantifierPrefix</emu-grammar>
        <emu-alg>
          1. Let _qp_ be CompileQuantifierPrefix of |QuantifierPrefix|.
          1. Return the Record { [[Min]]: _qp_.[[Min]], [[Max]]: _qp_.[[Max]], [[Greedy]]: *true* }.
        </emu-alg>
        <emu-grammar>Quantifier :: QuantifierPrefix `?`</emu-grammar>
        <emu-alg>
          1. Let _qp_ be CompileQuantifierPrefix of |QuantifierPrefix|.
          1. Return the Record { [[Min]]: _qp_.[[Min]], [[Max]]: _qp_.[[Max]], [[Greedy]]: *false* }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-compilequantifierprefix" type="sdo">
        <h1>Runtime Semantics: CompileQuantifierPrefix ( ): a Record with fields [[Min]] (a non-negative integer) and [[Max]] (a non-negative integer or +&infin;)</h1>
        <dl class="header">
        </dl>
        <emu-grammar>QuantifierPrefix :: `*`</emu-grammar>
        <emu-alg>
          1. Return the Record { [[Min]]: 0, [[Max]]: +∞ }.
        </emu-alg>
        <emu-grammar>QuantifierPrefix :: `+`</emu-grammar>
        <emu-alg>
          1. Return the Record { [[Min]]: 1, [[Max]]: +∞ }.
        </emu-alg>
        <emu-grammar>QuantifierPrefix :: `?`</emu-grammar>
        <emu-alg>
          1. Return the Record { [[Min]]: 0, [[Max]]: 1 }.
        </emu-alg>
        <emu-grammar>QuantifierPrefix :: `{` DecimalDigits `}`</emu-grammar>
        <emu-alg>
          1. Let _i_ be the MV of |DecimalDigits| (see <emu-xref href="#sec-literals-numeric-literals"></emu-xref>).
          1. Return the Record { [[Min]]: _i_, [[Max]]: _i_ }.
        </emu-alg>
        <emu-grammar>QuantifierPrefix :: `{` DecimalDigits `,}`</emu-grammar>
        <emu-alg>
          1. Let _i_ be the MV of |DecimalDigits|.
          1. Return the Record { [[Min]]: _i_, [[Max]]: +∞ }.
        </emu-alg>
        <emu-grammar>QuantifierPrefix :: `{` DecimalDigits `,` DecimalDigits `}`</emu-grammar>
        <emu-alg>
          1. Let _i_ be the MV of the first |DecimalDigits|.
          1. Let _j_ be the MV of the second |DecimalDigits|.
          1. Return the Record { [[Min]]: _i_, [[Max]]: _j_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-compileatom" type="sdo" oldids="sec-atom,sec-atomescape,sec-characterescape,sec-decimalescape">
        <h1>
          Runtime Semantics: CompileAtom (
            _rer_: a RegExp Record,
            _direction_: ~forward~ or ~backward~,
          ): a Matcher
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-compileatom-annexb"></emu-xref>.</p>
        </emu-note>

        <!-- Atom -->
        <emu-grammar>Atom :: PatternCharacter</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the character matched by |PatternCharacter|.
          1. Let _A_ be a one-element CharSet containing the character _ch_.
          1. Return CharacterSetMatcher(_rer_, _A_, *false*, _direction_).
        </emu-alg>
        <emu-grammar>Atom :: `.`</emu-grammar>
        <emu-alg>
          1. Let _A_ be AllCharacters(_rer_).
          1. If _rer_.[[DotAll]] is not *true*, then
            1. Remove from _A_ all characters corresponding to a code point on the right-hand side of the |LineTerminator| production.
          1. Return CharacterSetMatcher(_rer_, _A_, *false*, _direction_).
        </emu-alg>
        <emu-grammar>Atom :: CharacterClass</emu-grammar>
        <emu-alg>
          1. Let _cc_ be CompileCharacterClass of |CharacterClass| with argument _rer_.
          1. Let _cs_ be _cc_.[[CharSet]].
          1. If _rer_.[[UnicodeSets]] is *false*, or if every CharSetElement of _cs_ consists of a single character (including if _cs_ is empty), return CharacterSetMatcher(_rer_, _cs_, _cc_.[[Invert]], _direction_).
          1. Assert: _cc_.[[Invert]] is *false*.
          1. Let _lm_ be an empty List of Matchers.
          1. For each CharSetElement _s_ in _cs_ containing more than 1 character, iterating in descending order of length, do
            1. Let _cs2_ be a one-element CharSet containing the last code point of _s_.
            1. Let _m2_ be CharacterSetMatcher(_rer_, _cs2_, *false*, _direction_).
            1. For each code point _c1_ in _s_, iterating backwards from its second-to-last code point, do
              1. Let _cs1_ be a one-element CharSet containing _c1_.
              1. Let _m1_ be CharacterSetMatcher(_rer_, _cs1_, *false*, _direction_).
              1. Set _m2_ to MatchSequence(_m1_, _m2_, _direction_).
            1. Append _m2_ to _lm_.
          1. Let _singles_ be the CharSet containing every CharSetElement of _cs_ that consists of a single character.
          1. Append CharacterSetMatcher(_rer_, _singles_, *false*, _direction_) to _lm_.
          1. If _cs_ contains the empty sequence of characters, append EmptyMatcher() to _lm_.
          1. Let _m2_ be the last Matcher in _lm_.
          1. For each Matcher _m1_ of _lm_, iterating backwards from its second-to-last element, do
            1. Set _m2_ to MatchTwoAlternatives(_m1_, _m2_).
          1. Return _m2_.
        </emu-alg>
        <emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Let _m_ be CompileSubpattern of |Disjunction| with arguments _rer_ and _direction_.
          1. Let _parenIndex_ be CountLeftCapturingParensBefore(|Atom|).
          1. Return a new Matcher with parameters (_x_, _c_) that captures _direction_, _m_, and _parenIndex_ and performs the following steps when called:
            1. Assert: _x_ is a MatchState.
            1. Assert: _c_ is a MatcherContinuation.
            1. Let _d_ be a new MatcherContinuation with parameters (_y_) that captures _x_, _c_, _direction_, and _parenIndex_ and performs the following steps when called:
              1. Assert: _y_ is a MatchState.
              1. Let _cap_ be a copy of _y_.[[Captures]].
              1. Let _Input_ be _x_.[[Input]].
              1. Let _xe_ be _x_.[[EndIndex]].
              1. Let _ye_ be _y_.[[EndIndex]].
              1. If _direction_ is ~forward~, then
                1. Assert: _xe_ ≤ _ye_.
                1. Let _r_ be the CaptureRange { [[StartIndex]]: _xe_, [[EndIndex]]: _ye_ }.
              1. Else,
                1. Assert: _direction_ is ~backward~.
                1. Assert: _ye_ ≤ _xe_.
                1. Let _r_ be the CaptureRange { [[StartIndex]]: _ye_, [[EndIndex]]: _xe_ }.
              1. Set _cap_[_parenIndex_ + 1] to _r_.
              1. Let _z_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _ye_, [[Captures]]: _cap_ }.
              1. Return _c_(_z_).
            1. Return _m_(_x_, _d_).
        </emu-alg>
        <emu-note>
          <p>Parentheses of the form `(` |Disjunction| `)` serve both to group the components of the |Disjunction| pattern together and to save the result of the match. The result can be used either in a backreference (`\\` followed by a non-zero decimal number), referenced in a replace String, or returned as part of an array from the regular expression matching Abstract Closure. To inhibit the capturing behaviour of parentheses, use the form `(?:` |Disjunction| `)` instead.</p>
        </emu-note>
        <emu-grammar>Atom :: `(?:` Disjunction `)`</emu-grammar>
        <emu-alg>
          1. Return CompileSubpattern of |Disjunction| with arguments _rer_ and _direction_.
        </emu-alg>

        <!-- AtomEscape -->
        <emu-grammar>AtomEscape :: DecimalEscape</emu-grammar>
        <emu-alg>
          1. Let _n_ be the CapturingGroupNumber of |DecimalEscape|.
          1. Assert: _n_ ≤ _rer_.[[CapturingGroupsCount]].
          1. Return BackreferenceMatcher(_rer_, « _n_ », _direction_).
        </emu-alg>
        <emu-note>
          <p>An escape sequence of the form `\\` followed by a non-zero decimal number _n_ matches the result of the _n_<sup>th</sup> set of capturing parentheses (<emu-xref href="#sec-pattern-notation"></emu-xref>). It is an error if the regular expression has fewer than _n_ capturing parentheses. If the regular expression has _n_ or more capturing parentheses but the _n_<sup>th</sup> one is *undefined* because it has not captured anything, then the backreference always succeeds.</p>
        </emu-note>
        <emu-grammar>AtomEscape :: CharacterEscape</emu-grammar>
        <emu-alg>
          1. Let _cv_ be the CharacterValue of |CharacterEscape|.
          1. Let _ch_ be the character whose character value is _cv_.
          1. Let _A_ be a one-element CharSet containing the character _ch_.
          1. Return CharacterSetMatcher(_rer_, _A_, *false*, _direction_).
        </emu-alg>
        <emu-grammar>AtomEscape :: CharacterClassEscape</emu-grammar>
        <emu-alg>
          1. Let _cs_ be CompileToCharSet of |CharacterClassEscape| with argument _rer_.
          1. If _rer_.[[UnicodeSets]] is *false*, or if every CharSetElement of _cs_ consists of a single character (including if _cs_ is empty), return CharacterSetMatcher(_rer_, _cs_, *false*, _direction_).
          1. Let _lm_ be an empty List of Matchers.
          1. For each CharSetElement _s_ in _cs_ containing more than 1 character, iterating in descending order of length, do
            1. Let _cs2_ be a one-element CharSet containing the last code point of _s_.
            1. Let _m2_ be CharacterSetMatcher(_rer_, _cs2_, *false*, _direction_).
            1. For each code point _c1_ in _s_, iterating backwards from its second-to-last code point, do
              1. Let _cs1_ be a one-element CharSet containing _c1_.
              1. Let _m1_ be CharacterSetMatcher(_rer_, _cs1_, *false*, _direction_).
              1. Set _m2_ to MatchSequence(_m1_, _m2_, _direction_).
            1. Append _m2_ to _lm_.
          1. Let _singles_ be the CharSet containing every CharSetElement of _cs_ that consists of a single character.
          1. Append CharacterSetMatcher(_rer_, _singles_, *false*, _direction_) to _lm_.
          1. If _cs_ contains the empty sequence of characters, append EmptyMatcher() to _lm_.
          1. Let _m2_ be the last Matcher in _lm_.
          1. For each Matcher _m1_ of _lm_, iterating backwards from its second-to-last element, do
            1. Set _m2_ to MatchTwoAlternatives(_m1_, _m2_).
          1. Return _m2_.
        </emu-alg>
        <emu-grammar>AtomEscape :: `k` GroupName</emu-grammar>
        <emu-alg>
          1. Let _matchingGroupSpecifiers_ be GroupSpecifiersThatMatch(|GroupName|).
          1. Let _parenIndices_ be a new empty List.
          1. For each |GroupSpecifier| _groupSpecifier_ of _matchingGroupSpecifiers_, do
            1. Let _parenIndex_ be CountLeftCapturingParensBefore(_groupSpecifier_).
            1. Append _parenIndex_ to _parenIndices_.
          1. Return BackreferenceMatcher(_rer_, _parenIndices_, _direction_).
        </emu-alg>

        <emu-clause id="sec-runtime-semantics-charactersetmatcher-abstract-operation" type="abstract operation">
          <h1>
            CharacterSetMatcher (
              _rer_: a RegExp Record,
              _A_: a CharSet,
              _invert_: a Boolean,
              _direction_: ~forward~ or ~backward~,
            ): a Matcher
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _rer_.[[UnicodeSets]] is *true*, then
              1. Assert: _invert_ is *false*.
              1. Assert: Every CharSetElement of _A_ consists of a single character.
            1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_, _A_, _invert_, and _direction_ and performs the following steps when called:
              1. Assert: _x_ is a MatchState.
              1. Assert: _c_ is a MatcherContinuation.
              1. Let _Input_ be _x_.[[Input]].
              1. Let _e_ be _x_.[[EndIndex]].
              1. If _direction_ is ~forward~, let _f_ be _e_ + 1.
              1. Else, let _f_ be _e_ - 1.
              1. Let _InputLength_ be the number of elements in _Input_.
              1. If _f_ &lt; 0 or _f_ > _InputLength_, return ~failure~.
              1. Let _index_ be min(_e_, _f_).
              1. Let _ch_ be the character _Input_[_index_].
              1. Let _cc_ be Canonicalize(_rer_, _ch_).
              1. If there exists a CharSetElement in _A_ containing exactly one character _a_ such that Canonicalize(_rer_, _a_) is _cc_, let _found_ be *true*. Otherwise, let _found_ be *false*.
              1. If _invert_ is *false* and _found_ is *false*, return ~failure~.
              1. If _invert_ is *true* and _found_ is *true*, return ~failure~.
              1. Let _cap_ be _x_.[[Captures]].
              1. Let _y_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _f_, [[Captures]]: _cap_ }.
              1. Return _c_(_y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-backreference-matcher" type="abstract operation">
          <h1>
            BackreferenceMatcher (
              _rer_: a RegExp Record,
              _ns_: a List of positive integers,
              _direction_: ~forward~ or ~backward~,
            ): a Matcher
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Return a new Matcher with parameters (_x_, _c_) that captures _rer_, _ns_, and _direction_ and performs the following steps when called:
              1. Assert: _x_ is a MatchState.
              1. Assert: _c_ is a MatcherContinuation.
              1. Let _Input_ be _x_.[[Input]].
              1. Let _cap_ be _x_.[[Captures]].
              1. Let _r_ be *undefined*.
              1. For each integer _n_ of _ns_, do
                1. If _cap_[_n_] is not *undefined*, then
                  1. Assert: _r_ is *undefined*.
                  1. Set _r_ to _cap_[_n_].
              1. If _r_ is *undefined*, return _c_(_x_).
              1. Let _e_ be _x_.[[EndIndex]].
              1. Let _rs_ be _r_.[[StartIndex]].
              1. Let _re_ be _r_.[[EndIndex]].
              1. Let _len_ be _re_ - _rs_.
              1. If _direction_ is ~forward~, let _f_ be _e_ + _len_.
              1. Else, let _f_ be _e_ - _len_.
              1. Let _InputLength_ be the number of elements in _Input_.
              1. If _f_ &lt; 0 or _f_ > _InputLength_, return ~failure~.
              1. Let _g_ be min(_e_, _f_).
              1. If there exists an integer _i_ in the interval from 0 (inclusive) to _len_ (exclusive) such that Canonicalize(_rer_, _Input_[_rs_ + _i_]) is not Canonicalize(_rer_, _Input_[_g_ + _i_]), return ~failure~.
              1. Let _y_ be the MatchState { [[Input]]: _Input_, [[EndIndex]]: _f_, [[Captures]]: _cap_ }.
              1. Return _c_(_y_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-runtime-semantics-canonicalize-ch" type="abstract operation">
          <h1>
            Canonicalize (
              _rer_: a RegExp Record,
              _ch_: a character,
            ): a character
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If HasEitherUnicodeFlag(_rer_) is *true* and _rer_.[[IgnoreCase]] is *true*, then
              1. If the file <a href="https://unicode.org/Public/UCD/latest/ucd/CaseFolding.txt"><code>CaseFolding.txt</code></a> of the Unicode Character Database provides a simple or common case folding mapping for _ch_, return the result of applying that mapping to _ch_.
              1. Return _ch_.
            1. If _rer_.[[IgnoreCase]] is *false*, return _ch_.
            1. Assert: _ch_ is a UTF-16 code unit.
            1. Let _cp_ be the code point whose numeric value is the numeric value of _ch_.
            1. Let _u_ be toUppercase(« _cp_ »), according to the Unicode Default Case Conversion algorithm.
            1. Let _uStr_ be CodePointsToString(_u_).
            1. If the length of _uStr_ ≠ 1, return _ch_.
            1. Let _cu_ be _uStr_'s single code unit element.
            1. If the numeric value of _ch_ ≥ 128 and the numeric value of _cu_ &lt; 128, return _ch_.
            1. Return _cu_.
          </emu-alg>
          <emu-note>
            <p>In case-insignificant matches when HasEitherUnicodeFlag(_rer_) is *true*, all characters are implicitly case-folded using the simple mapping provided by the Unicode Standard immediately before they are compared. The simple mapping always maps to a single code point, so it does not map, for example, `ß` (U+00DF LATIN SMALL LETTER SHARP S) to `ss` or `SS`. It may however map code points outside the Basic Latin block to code points within it—for example, `ſ` (U+017F LATIN SMALL LETTER LONG S) case-folds to `s` (U+0073 LATIN SMALL LETTER S) and `K` (U+212A KELVIN SIGN) case-folds to `k` (U+006B LATIN SMALL LETTER K). Strings containing those code points are matched by regular expressions such as `/[a-z]/ui`.</p>
            <p>In case-insignificant matches when HasEitherUnicodeFlag(_rer_) is *false*, the mapping is based on Unicode Default Case Conversion algorithm toUppercase rather than toCasefold, which results in some subtle differences. For example, `Ω` (U+2126 OHM SIGN) is mapped by toUppercase to itself but by toCasefold to `ω` (U+03C9 GREEK SMALL LETTER OMEGA) along with `Ω` (U+03A9 GREEK CAPITAL LETTER OMEGA), so *"\u2126"* is matched by `/[ω]/ui` and `/[\u03A9]/ui` but not by `/[ω]/i` or `/[\u03A9]/i`. Also, no code point outside the Basic Latin block is mapped to a code point within it, so strings such as *"\u017F ſ"* and *"\u212A K"* are not matched by `/[a-z]/i`.</p>
          </emu-note>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-compilecharacterclass" type="sdo" oldids="sec-characterclass">
        <h1>
          Runtime Semantics: CompileCharacterClass (
            _rer_: a RegExp Record,
          ): a Record with fields [[CharSet]] (a CharSet) and [[Invert]] (a Boolean)
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>CharacterClass :: `[` ClassContents `]`</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Return the Record { [[CharSet]]: _A_, [[Invert]]: *false* }.
        </emu-alg>
        <emu-grammar>CharacterClass :: `[^` ClassContents `]`</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. If _rer_.[[UnicodeSets]] is *true*, then
            1. Return the Record { [[CharSet]]: CharacterComplement(_rer_, _A_), [[Invert]]: *false* }.
          1. Return the Record { [[CharSet]]: _A_, [[Invert]]: *true* }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-compiletocharset" type="sdo" oldids="sec-classranges,sec-nonemptyclassranges,sec-nonemptyclassrangesnodash,sec-classatom,sec-classatomnodash,sec-classescape,sec-characterclassescape">
        <h1>
          Runtime Semantics: CompileToCharSet (
            _rer_: a RegExp Record,
          ): a CharSet
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-compiletocharset-annexb"></emu-xref>.</p>
        </emu-note>

        <!-- ClassContents -->
        <emu-grammar>ClassContents :: [empty]</emu-grammar>
        <emu-alg>
          1. Return the empty CharSet.
        </emu-alg>

        <!-- NonemptyClassRanges -->
        <emu-grammar>NonemptyClassRanges :: ClassAtom NonemptyClassRangesNoDash</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassAtom| with argument _rer_.
          1. Let _B_ be CompileToCharSet of |NonemptyClassRangesNoDash| with argument _rer_.
          1. Return the union of CharSets _A_ and _B_.
        </emu-alg>
        <emu-grammar>NonemptyClassRanges :: ClassAtom `-` ClassAtom ClassContents</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the first |ClassAtom| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the second |ClassAtom| with argument _rer_.
          1. Let _C_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Let _D_ be CharacterRange(_A_, _B_).
          1. Return the union of _D_ and _C_.
        </emu-alg>

        <!-- NonemptyClassRangesNoDash -->
        <emu-grammar>NonemptyClassRangesNoDash :: ClassAtomNoDash NonemptyClassRangesNoDash</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassAtomNoDash| with argument _rer_.
          1. Let _B_ be CompileToCharSet of |NonemptyClassRangesNoDash| with argument _rer_.
          1. Return the union of CharSets _A_ and _B_.
        </emu-alg>
        <emu-grammar>NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtom ClassContents</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassAtomNoDash| with argument _rer_.
          1. Let _B_ be CompileToCharSet of |ClassAtom| with argument _rer_.
          1. Let _C_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Let _D_ be CharacterRange(_A_, _B_).
          1. Return the union of _D_ and _C_.
        </emu-alg>
        <emu-note>
          <p>|ClassContents| can expand into a single |ClassAtom| and/or ranges of two |ClassAtom| separated by dashes. In the latter case the |ClassContents| includes all characters between the first |ClassAtom| and the second |ClassAtom|, inclusive; an error occurs if either |ClassAtom| does not represent a single character (for example, if one is \w) or if the first |ClassAtom|'s character value is strictly greater than the second |ClassAtom|'s character value.</p>
        </emu-note>
        <emu-note>
          <p>Even if the pattern ignores case, the case of the two ends of a range is significant in determining which characters belong to the range. Thus, for example, the pattern `/[E-F]/i` matches only the letters `E`, `F`, `e`, and `f`, while the pattern `/[E-f]/i` matches all uppercase and lowercase letters in the Unicode Basic Latin block as well as the symbols `[`, `\\`, `]`, `^`, `_`, and <code>`</code>.</p>
        </emu-note>
        <emu-note>
          <p>A `-` character can be treated literally or it can denote a range. It is treated literally if it is the first or last character of |ClassContents|, the beginning or end limit of a range specification, or immediately follows a range specification.</p>
        </emu-note>

        <!-- ClassAtom -->
        <emu-grammar>ClassAtom :: `-`</emu-grammar>
        <emu-alg>
          1. Return the CharSet containing the single character `-` U+002D (HYPHEN-MINUS).
        </emu-alg>

        <!-- ClassAtomNoDash -->
        <emu-grammar>ClassAtomNoDash :: SourceCharacter but not one of `\` or `]` or `-`</emu-grammar>
        <emu-alg>
          1. Return the CharSet containing the character matched by |SourceCharacter|.
        </emu-alg>

        <!-- ClassEscape -->
        <emu-grammar>
          ClassEscape ::
            `b`
            `-`
            CharacterEscape
        </emu-grammar>
        <emu-alg>
          1. Let _cv_ be the CharacterValue of this |ClassEscape|.
          1. Let _c_ be the character whose character value is _cv_.
          1. Return the CharSet containing the single character _c_.
        </emu-alg>
        <emu-note>
          <p>A |ClassAtom| can use any of the escape sequences that are allowed in the rest of the regular expression except for `\\b`, `\\B`, and backreferences. Inside a |CharacterClass|, `\\b` means the backspace character, while `\\B` and backreferences raise errors. Using a backreference inside a |ClassAtom| causes an error.</p>
        </emu-note>

        <!-- CharacterClassEscape -->
        <emu-grammar>CharacterClassEscape :: `d`</emu-grammar>
        <emu-alg>
          1. Return the ten-element CharSet containing the characters `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, and `9`.
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `D`</emu-grammar>
        <emu-alg>
          1. Let _S_ be the CharSet returned by <emu-grammar>CharacterClassEscape :: `d`</emu-grammar>.
          1. Return CharacterComplement(_rer_, _S_).
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `s`</emu-grammar>
        <emu-alg>
          1. Return the CharSet containing all characters corresponding to a code point on the right-hand side of the |WhiteSpace| or |LineTerminator| productions.
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `S`</emu-grammar>
        <emu-alg>
          1. Let _S_ be the CharSet returned by <emu-grammar>CharacterClassEscape :: `s`</emu-grammar>.
          1. Return CharacterComplement(_rer_, _S_).
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `w`</emu-grammar>
        <emu-alg>
          1. Return MaybeSimpleCaseFolding(_rer_, WordCharacters(_rer_)).
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `W`</emu-grammar>
        <emu-alg>
          1. Let _S_ be the CharSet returned by <emu-grammar>CharacterClassEscape :: `w`</emu-grammar>.
          1. Return CharacterComplement(_rer_, _S_).
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `p{` UnicodePropertyValueExpression `}`</emu-grammar>
        <emu-alg>
          1. Return CompileToCharSet of |UnicodePropertyValueExpression| with argument _rer_.
        </emu-alg>
        <emu-grammar>CharacterClassEscape :: `P{` UnicodePropertyValueExpression `}`</emu-grammar>
        <emu-alg>
          1. Let _S_ be CompileToCharSet of |UnicodePropertyValueExpression| with argument _rer_.
          1. Assert: _S_ contains only single code points.
          1. Return CharacterComplement(_rer_, _S_).
        </emu-alg>
        <emu-grammar>UnicodePropertyValueExpression :: UnicodePropertyName `=` UnicodePropertyValue</emu-grammar>
        <emu-alg>
          1. Let _ps_ be the source text matched by |UnicodePropertyName|.
          1. Let _p_ be UnicodeMatchProperty(_rer_, _ps_).
          1. Assert: _p_ is a Unicode property name or property alias listed in the “Property name and aliases” column of <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref>.
          1. Let _vs_ be the source text matched by |UnicodePropertyValue|.
          1. Let _v_ be UnicodeMatchPropertyValue(_p_, _vs_).
          1. Let _A_ be the CharSet containing all Unicode code points whose character database definition includes the property _p_ with value _v_.
          1. Return MaybeSimpleCaseFolding(_rer_, _A_).
        </emu-alg>
        <emu-grammar>UnicodePropertyValueExpression :: LoneUnicodePropertyNameOrValue</emu-grammar>
        <emu-alg>
          1. Let _s_ be the source text matched by |LoneUnicodePropertyNameOrValue|.
          1. If UnicodeMatchPropertyValue(`General_Category`, _s_) is a Unicode property value or property value alias for the General_Category (gc) property listed in <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"><code>PropertyValueAliases.txt</code></a>, then
            1. Return the CharSet containing all Unicode code points whose character database definition includes the property “General_Category” with value _s_.
          1. Let _p_ be UnicodeMatchProperty(_rer_, _s_).
          1. Assert: _p_ is a binary Unicode property or binary property alias listed in the “<emu-not-ref>Property name</emu-not-ref> and aliases” column of <emu-xref href="#table-binary-unicode-properties"></emu-xref>, or a binary Unicode property of strings listed in the “<emu-not-ref>Property name</emu-not-ref>” column of <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>.
          1. Let _A_ be the CharSet containing all CharSetElements whose character database definition includes the property _p_ with value “True”.
          1. Return MaybeSimpleCaseFolding(_rer_, _A_).
        </emu-alg>

        <!-- ClassUnion -->
        <emu-grammar>ClassUnion :: ClassSetRange ClassUnion?</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassSetRange| with argument _rer_.
          1. If |ClassUnion| is present, then
            1. Let _B_ be CompileToCharSet of |ClassUnion| with argument _rer_.
            1. Return the union of CharSets _A_ and _B_.
          1. Return _A_.
        </emu-alg>
        <emu-grammar>ClassUnion :: ClassSetOperand ClassUnion?</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassSetOperand| with argument _rer_.
          1. If |ClassUnion| is present, then
            1. Let _B_ be CompileToCharSet of |ClassUnion| with argument _rer_.
            1. Return the union of CharSets _A_ and _B_.
          1. Return _A_.
        </emu-alg>

        <!-- ClassIntersection -->
        <emu-grammar>ClassIntersection :: ClassSetOperand `&amp;&amp;` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the first |ClassSetOperand| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the second |ClassSetOperand| with argument _rer_.
          1. Return the intersection of CharSets _A_ and _B_.
        </emu-alg>
        <emu-grammar>ClassIntersection :: ClassIntersection `&amp;&amp;` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the |ClassIntersection| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the |ClassSetOperand| with argument _rer_.
          1. Return the intersection of CharSets _A_ and _B_.
        </emu-alg>

        <!-- ClassSubtraction -->
        <emu-grammar>ClassSubtraction :: ClassSetOperand `--` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the first |ClassSetOperand| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the second |ClassSetOperand| with argument _rer_.
          1. Return the CharSet containing the CharSetElements of _A_ which are not also CharSetElements of _B_.
        </emu-alg>
        <emu-grammar>ClassSubtraction :: ClassSubtraction `--` ClassSetOperand</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the |ClassSubtraction| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the |ClassSetOperand| with argument _rer_.
          1. Return the CharSet containing the CharSetElements of _A_ which are not also CharSetElements of _B_.
        </emu-alg>

        <!-- ClassSetRange -->
        <emu-grammar>ClassSetRange :: ClassSetCharacter `-` ClassSetCharacter</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the first |ClassSetCharacter| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the second |ClassSetCharacter| with argument _rer_.
          1. Return MaybeSimpleCaseFolding(_rer_, CharacterRange(_A_, _B_)).
        </emu-alg>
        <emu-note>
          <p>The result will often consist of two or more ranges. When UnicodeSets is *true* and IgnoreCase is *true*, then MaybeSimpleCaseFolding(_rer_, [Ā-č]) will include only the odd-numbered code points of that range.</p>
        </emu-note>

        <!-- ClassSetOperand -->
        <emu-grammar>ClassSetOperand :: ClassSetCharacter</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassSetCharacter| with argument _rer_.
          1. Return MaybeSimpleCaseFolding(_rer_, _A_).
        </emu-alg>
        <emu-grammar>ClassSetOperand :: ClassStringDisjunction</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassStringDisjunction| with argument _rer_.
          1. Return MaybeSimpleCaseFolding(_rer_, _A_).
        </emu-alg>
        <emu-grammar>ClassSetOperand :: NestedClass</emu-grammar>
        <emu-alg>
          1. Return CompileToCharSet of |NestedClass| with argument _rer_.
        </emu-alg>

        <!-- NestedClass -->
        <emu-grammar>NestedClass :: `[` ClassContents `]`</emu-grammar>
        <emu-alg>
          1. Return CompileToCharSet of |ClassContents| with argument _rer_.
        </emu-alg>
        <emu-grammar>NestedClass :: `[^` ClassContents `]`</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Return CharacterComplement(_rer_, _A_).
        </emu-alg>
        <emu-grammar>NestedClass :: `\` CharacterClassEscape</emu-grammar>
        <emu-alg>
          1. Return CompileToCharSet of |CharacterClassEscape| with argument _rer_.
        </emu-alg>

        <!-- ClassStringDisjunction -->
        <emu-grammar>ClassStringDisjunction :: `\q{` ClassStringDisjunctionContents `}`</emu-grammar>
        <emu-alg>
          1. Return CompileToCharSet of |ClassStringDisjunctionContents| with argument _rer_.
        </emu-alg>

        <!-- ClassStringDisjunctionContents -->
        <emu-grammar>ClassStringDisjunctionContents :: ClassString</emu-grammar>
        <emu-alg>
          1. Let _s_ be CompileClassSetString of |ClassString| with argument _rer_.
          1. Return the CharSet containing the one string _s_.
        </emu-alg>
        <emu-grammar>ClassStringDisjunctionContents :: ClassString `|` ClassStringDisjunctionContents</emu-grammar>
        <emu-alg>
          1. Let _s_ be CompileClassSetString of |ClassString| with argument _rer_.
          1. Let _A_ be the CharSet containing the one string _s_.
          1. Let _B_ be CompileToCharSet of |ClassStringDisjunctionContents| with argument _rer_.
          1. Return the union of CharSets _A_ and _B_.
        </emu-alg>

        <!-- ClassSetCharacter -->
        <emu-grammar>
          ClassSetCharacter ::
            SourceCharacter but not ClassSetSyntaxCharacter
            `\` CharacterEscape
            `\` ClassSetReservedPunctuator
        </emu-grammar>
        <emu-alg>
          1. Let _cv_ be the CharacterValue of this |ClassSetCharacter|.
          1. Let _c_ be the character whose character value is _cv_.
          1. Return the CharSet containing the single character _c_.
        </emu-alg>
        <emu-grammar>ClassSetCharacter :: `\b`</emu-grammar>
        <emu-alg>
          1. Return the CharSet containing the single character U+0008 (BACKSPACE).
        </emu-alg>

        <emu-clause id="sec-runtime-semantics-characterrange-abstract-operation" type="abstract operation">
          <h1>
            CharacterRange (
              _A_: a CharSet,
              _B_: a CharSet,
            ): a CharSet
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Assert: _A_ and _B_ each contain exactly one character.
            1. Let _a_ be the one character in CharSet _A_.
            1. Let _b_ be the one character in CharSet _B_.
            1. Let _i_ be the character value of character _a_.
            1. Let _j_ be the character value of character _b_.
            1. Assert: _i_ ≤ _j_.
            1. Return the CharSet containing all characters with a character value in the inclusive interval from _i_ to _j_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-runtime-semantics-haseitherunicodeflag-abstract-operation" type="abstract operation">
          <h1>
            HasEitherUnicodeFlag (
              _rer_: a RegExp Record,
            ): a Boolean
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _rer_.[[Unicode]] is *true* or _rer_.[[UnicodeSets]] is *true*, then
              1. Return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-wordcharacters" type="abstract operation" oldids="sec-runtime-semantics-wordcharacters-abstract-operation">
          <h1>
            WordCharacters (
              _rer_: a RegExp Record,
            ): a CharSet
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>Returns a CharSet containing the characters considered "word characters" for the purposes of `\\b`, `\\B`, `\\w`, and `\\W`</dd>
          </dl>
          <emu-alg>
            1. Let _basicWordChars_ be the CharSet containing every character in the ASCII word characters.
            1. Let _extraWordChars_ be the CharSet containing all characters _c_ such that _c_ is not in _basicWordChars_ but Canonicalize(_rer_, _c_) is in _basicWordChars_.
            1. Assert: _extraWordChars_ is empty unless HasEitherUnicodeFlag(_rer_) is *true* and _rer_.[[IgnoreCase]] is *true*.
            1. Return the union of _basicWordChars_ and _extraWordChars_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-allcharacters" type="abstract operation">
          <h1>
            AllCharacters (
              _rer_: a RegExp Record,
            ): a CharSet
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>Returns the set of “all characters” according to the regular expression flags.</dd>
          </dl>
          <emu-alg>
            1. If _rer_.[[UnicodeSets]] is *true* and _rer_.[[IgnoreCase]] is *true*, then
              1. [declared="c"] Return the CharSet containing all Unicode code points _c_ that do not have a <a href="https://www.unicode.org/reports/tr44/#Simple_Case_Folding">Simple Case Folding</a> mapping (that is, scf(_c_)=_c_).
            1. Else if HasEitherUnicodeFlag(_rer_) is *true*, then
              1. Return the CharSet containing all code point values.
            1. Else,
              1. Return the CharSet containing all code unit values.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-maybesimplecasefolding" type="abstract operation">
          <h1>
            MaybeSimpleCaseFolding (
              _rer_: a RegExp Record,
              _A_: a CharSet,
            ): a CharSet
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>If _rer_.[[UnicodeSets]] is *false* or _rer_.[[IgnoreCase]] is *false*, it returns _A_. Otherwise, it uses the <a href="https://www.unicode.org/reports/tr44/#Simple_Case_Folding">Simple Case Folding</a> (<emu-eqn id="eqn-scf" aoid="scf">scf(_cp_)</emu-eqn>) definitions in the file <a href="https://unicode.org/Public/UCD/latest/ucd/CaseFolding.txt"><code>CaseFolding.txt</code></a> of the Unicode Character Database (each of which maps a single code point to another single code point) to map each CharSetElement of _A_ character-by-character into a canonical form and returns the resulting CharSet.</dd>
          </dl>
          <emu-alg>
            1. If _rer_.[[UnicodeSets]] is *false* or _rer_.[[IgnoreCase]] is *false*, return _A_.
            1. Let _B_ be a new empty CharSet.
            1. For each CharSetElement _s_ of _A_, do
              1. Let _t_ be an empty sequence of characters.
              1. For each single code point _cp_ in _s_, do
                1. Append scf(_cp_) to _t_.
              1. Add _t_ to _B_.
            1. Return _B_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-charactercomplement" type="abstract operation">
          <h1>
            CharacterComplement (
              _rer_: a RegExp Record,
              _S_: a CharSet,
            ): a CharSet
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _A_ be AllCharacters(_rer_).
            1. Return the CharSet containing the CharSetElements of _A_ which are not also CharSetElements of _S_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-runtime-semantics-unicodematchproperty-p" type="abstract operation">
          <h1>
            UnicodeMatchProperty (
              _rer_: a RegExp Record,
              _p_: ECMAScript source text,
            ): a Unicode property name
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _rer_.[[UnicodeSets]] is *true* and _p_ is a Unicode <emu-not-ref>property name</emu-not-ref> listed in the “<emu-not-ref>Property name</emu-not-ref>” column of <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>, then
              1. Return the List of Unicode code points _p_.
            1. Assert: _p_ is a Unicode <emu-not-ref>property name</emu-not-ref> or property alias listed in the “<emu-not-ref>Property name</emu-not-ref> and aliases” column of <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref> or <emu-xref href="#table-binary-unicode-properties"></emu-xref>.
            1. Let _c_ be the canonical <emu-not-ref>property name</emu-not-ref> of _p_ as given in the “Canonical <emu-not-ref>property name</emu-not-ref>” column of the corresponding row.
            1. Return the List of Unicode code points _c_.
          </emu-alg>
          <p>Implementations must support the Unicode property names and aliases listed in <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref>, <emu-xref href="#table-binary-unicode-properties"></emu-xref>, and <emu-xref href="#table-binary-unicode-properties-of-strings"></emu-xref>. To ensure interoperability, implementations must not support any other property names or aliases.</p>
          <emu-note>
            <p>For example, `Script_Extensions` (property name) and `scx` (property alias) are valid, but `script_extensions` or `Scx` aren't.</p>
          </emu-note>
          <emu-note>
            <p>The listed properties form a superset of what <a href="https://unicode.org/reports/tr18/#RL1.2">UTS18 RL1.2</a> requires.</p>
          </emu-note>
          <emu-note>
            <p>The spellings of entries in these tables (including casing) match the spellings used in the file <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyAliases.txt"><code>PropertyAliases.txt</code></a> in the Unicode Character Database. The precise spellings in that file are <a href="https://www.unicode.org/policies/stability_policy.html#Alias_Stability">guaranteed to be stable</a>.</p>
          </emu-note>
          <emu-import href="table-nonbinary-unicode-properties.html"></emu-import>
          <emu-import href="table-binary-unicode-properties.html"></emu-import>
          <emu-import href="table-binary-unicode-properties-of-strings.html"></emu-import>
        </emu-clause>

        <emu-clause id="sec-runtime-semantics-unicodematchpropertyvalue-p-v" type="abstract operation">
          <h1>
            UnicodeMatchPropertyValue (
              _p_: ECMAScript source text,
              _v_: ECMAScript source text,
            ): a Unicode property value
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Assert: _p_ is a canonical, unaliased Unicode property name listed in the “Canonical property name” column of <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref>.
            1. Assert: _v_ is a property value or property value alias for the Unicode property _p_ listed in <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"><code>PropertyValueAliases.txt</code></a>.
            1. Let _value_ be the canonical property value of _v_ as given in the “Canonical property value” column of the corresponding row.
            1. Return the List of Unicode code points _value_.
          </emu-alg>
          <p>Implementations must support the Unicode property values and property value aliases listed in <a href="https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"><code>PropertyValueAliases.txt</code></a> for the properties listed in <emu-xref href="#table-nonbinary-unicode-properties"></emu-xref>. To ensure interoperability, implementations must not support any other property values or property value aliases.</p>
          <emu-note>
            <p>For example, `Xpeo` and `Old_Persian` are valid `Script_Extensions` values, but `xpeo` and `Old Persian` aren't.</p>
          </emu-note>
          <emu-note>
            <p>This algorithm differs from <a href="https://unicode.org/reports/tr44/#Matching_Symbolic">the matching rules for symbolic values listed in UAX44</a>: case, <emu-xref href="#sec-white-space">white space</emu-xref>, U+002D (HYPHEN-MINUS), and U+005F (LOW LINE) are not ignored, and the `Is` prefix is not supported.</p>
          </emu-note>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-compileclasssetstring" type="sdo">
        <h1>
          Runtime Semantics: CompileClassSetString (
            _rer_: a RegExp Record,
          ): a sequence of characters
        </h1>
        <dl class="header">
        </dl>

        <emu-grammar>ClassString :: [empty]</emu-grammar>
        <emu-alg>
          1. Return an empty sequence of characters.
        </emu-alg>
        <emu-grammar>ClassString :: NonEmptyClassString</emu-grammar>
        <emu-alg>
          1. Return CompileClassSetString of |NonEmptyClassString| with argument _rer_.
        </emu-alg>
        <emu-grammar>NonEmptyClassString :: ClassSetCharacter NonEmptyClassString?</emu-grammar>
        <emu-alg>
          1. Let _cs_ be CompileToCharSet of |ClassSetCharacter| with argument _rer_.
          1. Let _s1_ be the sequence of characters that is the single CharSetElement of _cs_.
          1. If |NonEmptyClassString| is present, then
            1. Let _s2_ be CompileClassSetString of |NonEmptyClassString| with argument _rer_.
            1. Return the concatenation of _s1_ and _s2_.
          1. Return _s1_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-regexp-creation" oldids="sec-abstract-operations-for-the-regexp-constructor">
      <h1>Abstract Operations for RegExp Creation</h1>

      <emu-clause id="sec-regexpcreate" type="abstract operation">
        <h1>
          RegExpCreate (
            _P_: an ECMAScript language value,
            _F_: a String or *undefined*,
          ): either a normal completion containing an Object or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _obj_ be ! RegExpAlloc(%RegExp%).
          1. Return ? RegExpInitialize(_obj_, _P_, _F_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexpalloc" type="abstract operation">
        <h1>
          RegExpAlloc (
            _newTarget_: a constructor,
          ): either a normal completion containing an Object or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _obj_ be ? OrdinaryCreateFromConstructor(_newTarget_, *"%RegExp.prototype%"*, « [[OriginalSource]], [[OriginalFlags]], [[RegExpRecord]], [[RegExpMatcher]] »).
          1. Perform ! DefinePropertyOrThrow(_obj_, *"lastIndex"*, PropertyDescriptor { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexpinitialize" type="abstract operation">
        <h1>
          RegExpInitialize (
            _obj_: an Object,
            _pattern_: an ECMAScript language value,
            _flags_: an ECMAScript language value,
          ): either a normal completion containing an Object or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _pattern_ is *undefined*, let _P_ be the empty String.
          1. Else, let _P_ be ? ToString(_pattern_).
          1. If _flags_ is *undefined*, let _F_ be the empty String.
          1. Else, let _F_ be ? ToString(_flags_).
          1. If _F_ contains any code unit other than *"d"*, *"g"*, *"i"*, *"m"*, *"s"*, *"u"*, *"v"*, or *"y"*, or if _F_ contains any code unit more than once, throw a *SyntaxError* exception.
          1. If _F_ contains *"i"*, let _i_ be *true*; else let _i_ be *false*.
          1. If _F_ contains *"m"*, let _m_ be *true*; else let _m_ be *false*.
          1. If _F_ contains *"s"*, let _s_ be *true*; else let _s_ be *false*.
          1. If _F_ contains *"u"*, let _u_ be *true*; else let _u_ be *false*.
          1. If _F_ contains *"v"*, let _v_ be *true*; else let _v_ be *false*.
          1. If _u_ is *true* or _v_ is *true*, then
            1. Let _patternText_ be StringToCodePoints(_P_).
          1. Else,
            1. Let _patternText_ be the result of interpreting each of _P_'s 16-bit elements as a Unicode BMP code point. UTF-16 decoding is not applied to the elements.
          1. Let _parseResult_ be ParsePattern(_patternText_, _u_, _v_).
          1. If _parseResult_ is a non-empty List of *SyntaxError* objects, throw a *SyntaxError* exception.
          1. Assert: _parseResult_ is a |Pattern| Parse Node.
          1. Set _obj_.[[OriginalSource]] to _P_.
          1. Set _obj_.[[OriginalFlags]] to _F_.
          1. Let _capturingGroupsCount_ be CountLeftCapturingParensWithin(_parseResult_).
          1. Let _rer_ be the RegExp Record { [[IgnoreCase]]: _i_, [[Multiline]]: _m_, [[DotAll]]: _s_, [[Unicode]]: _u_, [[UnicodeSets]]: _v_, [[CapturingGroupsCount]]: _capturingGroupsCount_ }.
          1. Set _obj_.[[RegExpRecord]] to _rer_.
          1. Set _obj_.[[RegExpMatcher]] to CompilePattern of _parseResult_ with argument _rer_.
          1. Perform ? Set(_obj_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-parsepattern" type="abstract operation">
        <h1>
          Static Semantics: ParsePattern (
            _patternText_: a sequence of Unicode code points,
            _u_: a Boolean,
            _v_: a Boolean,
          ): a Parse Node or a non-empty List of *SyntaxError* objects
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This section is amended in <emu-xref href="#sec-parsepattern-annexb"></emu-xref>.</p>
        </emu-note>
        <emu-alg>
          1. If _v_ is *true* and _u_ is *true*, then
            1. Let _parseResult_ be a List containing one or more *SyntaxError* objects.
          1. Else if _v_ is *true*, then
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[+UnicodeMode, +UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Else if _u_ is *true*, then
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[+UnicodeMode, ~UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Else,
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[~UnicodeMode, ~UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Return _parseResult_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-regexp-constructor">
      <h1>The RegExp Constructor</h1>
      <p>The RegExp constructor:</p>
      <ul>
        <li>is <dfn>%RegExp%</dfn>.</li>
        <li>is the initial value of the *"RegExp"* property of the global object.</li>
        <li>creates and initializes a new RegExp object when called as a constructor.</li>
        <li>when called as a function rather than as a constructor, returns either a new RegExp object, or the argument itself if the only argument is a RegExp object.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified RegExp behaviour must include a `super` call to the RegExp constructor to create and initialize subclass instances with the necessary internal slots.</li>
      </ul>

      <emu-clause id="sec-regexp-pattern-flags">
        <h1>RegExp ( _pattern_, _flags_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _patternIsRegExp_ be ? IsRegExp(_pattern_).
          1. If NewTarget is *undefined*, then
            1. Let _newTarget_ be the active function object.
            1. If _patternIsRegExp_ is *true* and _flags_ is *undefined*, then
              1. Let _patternConstructor_ be ? Get(_pattern_, *"constructor"*).
              1. If SameValue(_newTarget_, _patternConstructor_) is *true*, return _pattern_.
          1. Else,
            1. Let _newTarget_ be NewTarget.
          1. If _pattern_ is an Object and _pattern_ has a [[RegExpMatcher]] internal slot, then
            1. Let _P_ be _pattern_.[[OriginalSource]].
            1. If _flags_ is *undefined*, let _F_ be _pattern_.[[OriginalFlags]].
            1. Else, let _F_ be _flags_.
          1. Else if _patternIsRegExp_ is *true*, then
            1. Let _P_ be ? Get(_pattern_, *"source"*).
            1. If _flags_ is *undefined*, then
              1. Let _F_ be ? Get(_pattern_, *"flags"*).
            1. Else,
              1. Let _F_ be _flags_.
          1. Else,
            1. Let _P_ be _pattern_.
            1. Let _F_ be _flags_.
          1. Let _O_ be ? RegExpAlloc(_newTarget_).
          1. Return ? RegExpInitialize(_O_, _P_, _F_).
        </emu-alg>
        <emu-note>
          <p>If pattern is supplied using a |StringLiteral|, the usual escape sequence substitutions are performed before the String is processed by this function. If pattern must contain an escape sequence to be recognized by this function, any U+005C (REVERSE SOLIDUS) code points must be escaped within the |StringLiteral| to prevent them being removed when the contents of the |StringLiteral| are formed.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-regexp-constructor">
      <h1>Properties of the RegExp Constructor</h1>
      <p>The RegExp constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-regexp.prototype">
        <h1>RegExp.prototype</h1>
        <p>The initial value of `RegExp.prototype` is the RegExp prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-regexp-@@species" id="sec-get-regexp-%symbol.species%">
        <h1>get RegExp [ %Symbol.species% ]</h1>
        <p>`RegExp[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p>RegExp prototype methods normally use their *this* value's constructor to create a derived object. However, a subclass constructor may over-ride that default behaviour by redefining its %Symbol.species% property.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-regexp-prototype-object">
      <h1>Properties of the RegExp Prototype Object</h1>
      <p>The <dfn>RegExp prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%RegExp.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a RegExp instance and does not have a [[RegExpMatcher]] internal slot or any of the other internal slots of RegExp instance objects.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <emu-note>
        <p>The RegExp prototype object does not have a *"valueOf"* property of its own; however, it inherits the *"valueOf"* property from the Object prototype object.</p>
      </emu-note>

      <emu-clause id="sec-regexp.prototype.constructor">
        <h1>RegExp.prototype.constructor</h1>
        <p>The initial value of `RegExp.prototype.constructor` is %RegExp%.</p>
      </emu-clause>

      <emu-clause id="sec-regexp.prototype.exec">
        <h1>RegExp.prototype.exec ( _string_ )</h1>
        <p>This method searches _string_ for an occurrence of the regular expression pattern and returns an Array containing the results of the match, or *null* if _string_ did not match.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Perform ? RequireInternalSlot(_R_, [[RegExpMatcher]]).
          1. Let _S_ be ? ToString(_string_).
          1. Return ? RegExpBuiltinExec(_R_, _S_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.dotAll">
        <h1>get RegExp.prototype.dotAll</h1>
        <p>`RegExp.prototype.dotAll` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0073 (LATIN SMALL LETTER S).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.flags">
        <h1>get RegExp.prototype.flags</h1>
        <p>`RegExp.prototype.flags` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. If _R_ is not an Object, throw a *TypeError* exception.
          1. Let _codeUnits_ be a new empty List.
          1. Let _hasIndices_ be ToBoolean(? Get(_R_, *"hasIndices"*)).
          1. If _hasIndices_ is *true*, append the code unit 0x0064 (LATIN SMALL LETTER D) to _codeUnits_.
          1. Let _global_ be ToBoolean(? Get(_R_, *"global"*)).
          1. If _global_ is *true*, append the code unit 0x0067 (LATIN SMALL LETTER G) to _codeUnits_.
          1. Let _ignoreCase_ be ToBoolean(? Get(_R_, *"ignoreCase"*)).
          1. If _ignoreCase_ is *true*, append the code unit 0x0069 (LATIN SMALL LETTER I) to _codeUnits_.
          1. Let _multiline_ be ToBoolean(? Get(_R_, *"multiline"*)).
          1. If _multiline_ is *true*, append the code unit 0x006D (LATIN SMALL LETTER M) to _codeUnits_.
          1. Let _dotAll_ be ToBoolean(? Get(_R_, *"dotAll"*)).
          1. If _dotAll_ is *true*, append the code unit 0x0073 (LATIN SMALL LETTER S) to _codeUnits_.
          1. Let _unicode_ be ToBoolean(? Get(_R_, *"unicode"*)).
          1. If _unicode_ is *true*, append the code unit 0x0075 (LATIN SMALL LETTER U) to _codeUnits_.
          1. Let _unicodeSets_ be ToBoolean(? Get(_R_, *"unicodeSets"*)).
          1. If _unicodeSets_ is *true*, append the code unit 0x0076 (LATIN SMALL LETTER V) to _codeUnits_.
          1. Let _sticky_ be ToBoolean(? Get(_R_, *"sticky"*)).
          1. If _sticky_ is *true*, append the code unit 0x0079 (LATIN SMALL LETTER Y) to _codeUnits_.
          1. Return the String value whose code units are the elements of the List _codeUnits_. If _codeUnits_ has no elements, the empty String is returned.
        </emu-alg>

        <emu-clause id="sec-regexphasflag" type="abstract operation">
          <h1>
            RegExpHasFlag (
              _R_: an ECMAScript language value,
              _codeUnit_: a code unit,
            ): either a normal completion containing either a Boolean or *undefined*, or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _R_ is not an Object, throw a *TypeError* exception.
            1. If _R_ does not have an [[OriginalFlags]] internal slot, then
              1. If SameValue(_R_, %RegExp.prototype%) is *true*, return *undefined*.
              1. Otherwise, throw a *TypeError* exception.
            1. Let _flags_ be _R_.[[OriginalFlags]].
            1. If _flags_ contains _codeUnit_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.global">
        <h1>get RegExp.prototype.global</h1>
        <p>`RegExp.prototype.global` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0067 (LATIN SMALL LETTER G).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.hasIndices">
        <h1>get RegExp.prototype.hasIndices</h1>
        <p>`RegExp.prototype.hasIndices` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0064 (LATIN SMALL LETTER D).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.ignorecase">
        <h1>get RegExp.prototype.ignoreCase</h1>
        <p>`RegExp.prototype.ignoreCase` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0069 (LATIN SMALL LETTER I).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-regexp.prototype-@@match" id="sec-regexp.prototype-%symbol.match%">
        <h1>RegExp.prototype [ %Symbol.match% ] ( _string_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _rx_ be the *this* value.
          1. If _rx_ is not an Object, throw a *TypeError* exception.
          1. Let _S_ be ? ToString(_string_).
          1. Let _flags_ be ? ToString(? Get(_rx_, *"flags"*)).
          1. If _flags_ does not contain *"g"*, then
            1. Return ? RegExpExec(_rx_, _S_).
          1. Else,
            1. If _flags_ contains *"u"* or _flags_ contains *"v"*, let _fullUnicode_ be *true*. Otherwise, let _fullUnicode_ be *false*.
            1. Perform ? Set(_rx_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
            1. Let _A_ be ! ArrayCreate(0).
            1. Let _n_ be 0.
            1. Repeat,
              1. Let _result_ be ? RegExpExec(_rx_, _S_).
              1. If _result_ is *null*, then
                1. If _n_ = 0, return *null*.
                1. Return _A_.
              1. Else,
                1. Let _matchStr_ be ? ToString(? Get(_result_, *"0"*)).
                1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _matchStr_).
                1. If _matchStr_ is the empty String, then
                  1. Let _thisIndex_ be ℝ(? ToLength(? Get(_rx_, *"lastIndex"*))).
                  1. Let _nextIndex_ be AdvanceStringIndex(_S_, _thisIndex_, _fullUnicode_).
                  1. Perform ? Set(_rx_, *"lastIndex"*, 𝔽(_nextIndex_), *true*).
                1. Set _n_ to _n_ + 1.
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.match]"*.</p>
        <emu-note>
          <p>The %Symbol.match% property is used by the IsRegExp abstract operation to identify objects that have the basic behaviour of regular expressions. The absence of a %Symbol.match% property or the existence of such a property whose value does not Boolean coerce to *true* indicates that the object is not intended to be used as a regular expression object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause oldids="sec-regexp-prototype-matchall" id="sec-regexp-prototype-%symbol.matchall%">
        <h1>RegExp.prototype [ %Symbol.matchAll% ] ( _string_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. If _R_ is not an Object, throw a *TypeError* exception.
          1. Let _S_ be ? ToString(_string_).
          1. Let _C_ be ? SpeciesConstructor(_R_, %RegExp%).
          1. Let _flags_ be ? ToString(? Get(_R_, *"flags"*)).
          1. Let _matcher_ be ? Construct(_C_, « _R_, _flags_ »).
          1. Let _lastIndex_ be ? ToLength(? Get(_R_, *"lastIndex"*)).
          1. Perform ? Set(_matcher_, *"lastIndex"*, _lastIndex_, *true*).
          1. If _flags_ contains *"g"*, let _global_ be *true*.
          1. Else, let _global_ be *false*.
          1. If _flags_ contains *"u"* or _flags_ contains *"v"*, let _fullUnicode_ be *true*.
          1. Else, let _fullUnicode_ be *false*.
          1. Return CreateRegExpStringIterator(_matcher_, _S_, _global_, _fullUnicode_).
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.matchAll]"*.</p>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.multiline">
        <h1>get RegExp.prototype.multiline</h1>
        <p>`RegExp.prototype.multiline` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x006D (LATIN SMALL LETTER M).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-regexp.prototype-@@replace" id="sec-regexp.prototype-%symbol.replace%">
        <h1>RegExp.prototype [ %Symbol.replace% ] ( _string_, _replaceValue_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _rx_ be the *this* value.
          1. If _rx_ is not an Object, throw a *TypeError* exception.
          1. Let _S_ be ? ToString(_string_).
          1. Let _lengthS_ be the length of _S_.
          1. Let _functionalReplace_ be IsCallable(_replaceValue_).
          1. If _functionalReplace_ is *false*, then
            1. Set _replaceValue_ to ? ToString(_replaceValue_).
          1. Let _flags_ be ? ToString(? Get(_rx_, *"flags"*)).
          1. If _flags_ contains *"g"*, let _global_ be *true*. Otherwise, let _global_ be *false*.
          1. If _global_ is *true*, then
            1. Perform ? Set(_rx_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
          1. Let _results_ be a new empty List.
          1. Let _done_ be *false*.
          1. Repeat, while _done_ is *false*,
            1. Let _result_ be ? RegExpExec(_rx_, _S_).
            1. If _result_ is *null*, then
              1. Set _done_ to *true*.
            1. Else,
              1. Append _result_ to _results_.
              1. If _global_ is *false*, then
                1. Set _done_ to *true*.
              1. Else,
                1. Let _matchStr_ be ? ToString(? Get(_result_, *"0"*)).
                1. If _matchStr_ is the empty String, then
                  1. Let _thisIndex_ be ℝ(? ToLength(? Get(_rx_, *"lastIndex"*))).
                  1. If _flags_ contains *"u"* or _flags_ contains *"v"*, let _fullUnicode_ be *true*. Otherwise, let _fullUnicode_ be *false*.
                  1. Let _nextIndex_ be AdvanceStringIndex(_S_, _thisIndex_, _fullUnicode_).
                  1. Perform ? Set(_rx_, *"lastIndex"*, 𝔽(_nextIndex_), *true*).
          1. Let _accumulatedResult_ be the empty String.
          1. Let _nextSourcePosition_ be 0.
          1. For each element _result_ of _results_, do
            1. Let _resultLength_ be ? LengthOfArrayLike(_result_).
            1. Let _nCaptures_ be max(_resultLength_ - 1, 0).
            1. Let _matched_ be ? ToString(? Get(_result_, *"0"*)).
            1. Let _matchLength_ be the length of _matched_.
            1. Let _position_ be ? ToIntegerOrInfinity(? Get(_result_, *"index"*)).
            1. Set _position_ to the result of clamping _position_ between 0 and _lengthS_.
            1. Let _captures_ be a new empty List.
            1. Let _n_ be 1.
            1. Repeat, while _n_ ≤ _nCaptures_,
              1. Let _capN_ be ? Get(_result_, ! ToString(𝔽(_n_))).
              1. If _capN_ is not *undefined*, then
                1. Set _capN_ to ? ToString(_capN_).
              1. Append _capN_ to _captures_.
              1. NOTE: When _n_ = 1, the preceding step puts the first element into _captures_ (at index 0). More generally, the _n_<sup>th</sup> capture (the characters captured by the _n_<sup>th</sup> set of capturing parentheses) is at _captures_[_n_ - 1].
              1. Set _n_ to _n_ + 1.
            1. Let _namedCaptures_ be ? Get(_result_, *"groups"*).
            1. If _functionalReplace_ is *true*, then
              1. Let _replacerArgs_ be the list-concatenation of « _matched_ », _captures_, and « 𝔽(_position_), _S_ ».
              1. If _namedCaptures_ is not *undefined*, then
                1. Append _namedCaptures_ to _replacerArgs_.
              1. Let _replacementValue_ be ? Call(_replaceValue_, *undefined*, _replacerArgs_).
              1. Let _replacementString_ be ? ToString(_replacementValue_).
            1. Else,
              1. If _namedCaptures_ is not *undefined*, then
                1. Set _namedCaptures_ to ? ToObject(_namedCaptures_).
              1. Let _replacementString_ be ? GetSubstitution(_matched_, _S_, _position_, _captures_, _namedCaptures_, _replaceValue_).
            1. If _position_ ≥ _nextSourcePosition_, then
              1. NOTE: _position_ should not normally move backwards. If it does, it is an indication of an ill-behaving RegExp subclass or use of an access triggered side-effect to change the global flag or other characteristics of _rx_. In such cases, the corresponding substitution is ignored.
              1. Set _accumulatedResult_ to the string-concatenation of _accumulatedResult_, the substring of _S_ from _nextSourcePosition_ to _position_, and _replacementString_.
              1. Set _nextSourcePosition_ to _position_ + _matchLength_.
          1. If _nextSourcePosition_ ≥ _lengthS_, return _accumulatedResult_.
          1. Return the string-concatenation of _accumulatedResult_ and the substring of _S_ from _nextSourcePosition_.
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.replace]"*.</p>
      </emu-clause>

      <emu-clause oldids="sec-regexp.prototype-@@search" id="sec-regexp.prototype-%symbol.search%">
        <h1>RegExp.prototype [ %Symbol.search% ] ( _string_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _rx_ be the *this* value.
          1. If _rx_ is not an Object, throw a *TypeError* exception.
          1. Let _S_ be ? ToString(_string_).
          1. Let _previousLastIndex_ be ? Get(_rx_, *"lastIndex"*).
          1. If _previousLastIndex_ is not *+0*<sub>𝔽</sub>, then
            1. Perform ? Set(_rx_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
          1. Let _result_ be ? RegExpExec(_rx_, _S_).
          1. Let _currentLastIndex_ be ? Get(_rx_, *"lastIndex"*).
          1. If SameValue(_currentLastIndex_, _previousLastIndex_) is *false*, then
            1. Perform ? Set(_rx_, *"lastIndex"*, _previousLastIndex_, *true*).
          1. If _result_ is *null*, return *-1*<sub>𝔽</sub>.
          1. Return ? Get(_result_, *"index"*).
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.search]"*.</p>
        <emu-note>
          <p>The *"lastIndex"* and *"global"* properties of this RegExp object are ignored when performing the search. The *"lastIndex"* property is left unchanged.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.source">
        <h1>get RegExp.prototype.source</h1>
        <p>`RegExp.prototype.source` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. If _R_ is not an Object, throw a *TypeError* exception.
          1. If _R_ does not have an [[OriginalSource]] internal slot, then
            1. If SameValue(_R_, %RegExp.prototype%) is *true*, return *"(?:)"*.
            1. Otherwise, throw a *TypeError* exception.
          1. Assert: _R_ has an [[OriginalFlags]] internal slot.
          1. Let _src_ be _R_.[[OriginalSource]].
          1. Let _flags_ be _R_.[[OriginalFlags]].
          1. Return EscapeRegExpPattern(_src_, _flags_).
        </emu-alg>

        <emu-clause id="sec-escaperegexppattern" type="abstract operation">
          <h1>
            EscapeRegExpPattern (
              _P_: a String,
              _F_: a String,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _F_ contains *"v"*, then
              1. Let _patternSymbol_ be |Pattern[+UnicodeMode, +UnicodeSetsMode]|.
            1. Else if _F_ contains *"u"*, then
              1. Let _patternSymbol_ be |Pattern[+UnicodeMode, ~UnicodeSetsMode]|.
            1. Else,
              1. Let _patternSymbol_ be |Pattern[~UnicodeMode, ~UnicodeSetsMode]|.
            1. Let _S_ be a String in the form of a _patternSymbol_ equivalent to _P_ interpreted as UTF-16 encoded Unicode code points (<emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>), in which certain code points are escaped as described below. _S_ may or may not differ from _P_; however, the Abstract Closure that would result from evaluating _S_ as a _patternSymbol_ must behave identically to the Abstract Closure given by the constructed object's [[RegExpMatcher]] internal slot. Multiple calls to this abstract operation using the same values for _P_ and _F_ must produce identical results.
            1. The code points `/` or any |LineTerminator| occurring in the pattern shall be escaped in _S_ as necessary to ensure that the string-concatenation of *"/"*, _S_, *"/"*, and _F_ can be parsed (in an appropriate lexical context) as a |RegularExpressionLiteral| that behaves identically to the constructed regular expression. For example, if _P_ is *"/"*, then _S_ could be *"\\/"* or *"\\u002F"*, among other possibilities, but not *"/"*, because `///` followed by _F_ would be parsed as a |SingleLineComment| rather than a |RegularExpressionLiteral|. If _P_ is the empty String, this specification can be met by letting _S_ be *"(?:)"*.
            1. Return _S_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause oldids="sec-regexp.prototype-@@split" id="sec-regexp.prototype-%symbol.split%">
        <h1>RegExp.prototype [ %Symbol.split% ] ( _string_, _limit_ )</h1>
        <emu-note>
          <p>This method returns an Array into which substrings of the result of converting _string_ to a String have been stored. The substrings are determined by searching from left to right for matches of the *this* value regular expression; these occurrences are not part of any String in the returned array, but serve to divide up the String value.</p>
          <p>The *this* value may be an empty regular expression or a regular expression that can match an empty String. In this case, the regular expression does not match the empty <emu-not-ref>substring</emu-not-ref> at the beginning or end of the input String, nor does it match the empty <emu-not-ref>substring</emu-not-ref> at the end of the previous separator match. (For example, if the regular expression matches the empty String, the String is split up into individual code unit elements; the length of the result array equals the length of the String, and each <emu-not-ref>substring</emu-not-ref> contains one code unit.) Only the first match at a given index of the String is considered, even if backtracking could yield a non-empty <emu-not-ref>substring</emu-not-ref> match at that index. (For example, `/a*?/[Symbol.split]("ab")` evaluates to the array `["a", "b"]`, while `/a*/[Symbol.split]("ab")` evaluates to the array `["","b"]`.)</p>
          <p>If _string_ is (or converts to) the empty String, the result depends on whether the regular expression can match the empty String. If it can, the result array contains no elements. Otherwise, the result array contains one element, which is the empty String.</p>
          <p>If the regular expression contains capturing parentheses, then each time _separator_ is matched the results (including any *undefined* results) of the capturing parentheses are spliced into the output array. For example,</p>
          <pre><code class="javascript">/&lt;(\/)?([^&lt;&gt;]+)&gt;/[Symbol.split]("A&lt;B&gt;bold&lt;/B&gt;and&lt;CODE&gt;coded&lt;/CODE&gt;")</code></pre>
          <p>evaluates to the array</p>
          <pre><code class="javascript">["A", undefined, "B", "bold", "/", "B", "and", undefined, "CODE", "coded", "/", "CODE", ""]</code></pre>
          <p>If _limit_ is not *undefined*, then the output array is truncated so that it contains no more than _limit_ elements.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _rx_ be the *this* value.
          1. If _rx_ is not an Object, throw a *TypeError* exception.
          1. Let _S_ be ? ToString(_string_).
          1. Let _C_ be ? SpeciesConstructor(_rx_, %RegExp%).
          1. Let _flags_ be ? ToString(? Get(_rx_, *"flags"*)).
          1. If _flags_ contains *"u"* or _flags_ contains *"v"*, let _unicodeMatching_ be *true*.
          1. Else, let _unicodeMatching_ be *false*.
          1. If _flags_ contains *"y"*, let _newFlags_ be _flags_.
          1. Else, let _newFlags_ be the string-concatenation of _flags_ and *"y"*.
          1. Let _splitter_ be ? Construct(_C_, « _rx_, _newFlags_ »).
          1. Let _A_ be ! ArrayCreate(0).
          1. Let _lengthA_ be 0.
          1. If _limit_ is *undefined*, let _lim_ be 2<sup>32</sup> - 1; else let _lim_ be ℝ(? ToUint32(_limit_)).
          1. If _lim_ = 0, return _A_.
          1. If _S_ is the empty String, then
            1. Let _z_ be ? RegExpExec(_splitter_, _S_).
            1. If _z_ is not *null*, return _A_.
            1. Perform ! CreateDataPropertyOrThrow(_A_, *"0"*, _S_).
            1. Return _A_.
          1. Let _size_ be the length of _S_.
          1. Let _p_ be 0.
          1. Let _q_ be _p_.
          1. Repeat, while _q_ &lt; _size_,
            1. Perform ? Set(_splitter_, *"lastIndex"*, 𝔽(_q_), *true*).
            1. Let _z_ be ? RegExpExec(_splitter_, _S_).
            1. If _z_ is *null*, then
              1. Set _q_ to AdvanceStringIndex(_S_, _q_, _unicodeMatching_).
            1. Else,
              1. Let _e_ be ℝ(? ToLength(? Get(_splitter_, *"lastIndex"*))).
              1. Set _e_ to min(_e_, _size_).
              1. If _e_ = _p_, then
                1. Set _q_ to AdvanceStringIndex(_S_, _q_, _unicodeMatching_).
              1. Else,
                1. Let _T_ be the substring of _S_ from _p_ to _q_.
                1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_lengthA_)), _T_).
                1. Set _lengthA_ to _lengthA_ + 1.
                1. If _lengthA_ = _lim_, return _A_.
                1. Set _p_ to _e_.
                1. Let _numberOfCaptures_ be ? LengthOfArrayLike(_z_).
                1. Set _numberOfCaptures_ to max(_numberOfCaptures_ - 1, 0).
                1. Let _i_ be 1.
                1. Repeat, while _i_ ≤ _numberOfCaptures_,
                  1. Let _nextCapture_ be ? Get(_z_, ! ToString(𝔽(_i_))).
                  1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_lengthA_)), _nextCapture_).
                  1. Set _i_ to _i_ + 1.
                  1. Set _lengthA_ to _lengthA_ + 1.
                  1. If _lengthA_ = _lim_, return _A_.
                1. Set _q_ to _p_.
          1. Let _T_ be the substring of _S_ from _p_ to _size_.
          1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_lengthA_)), _T_).
          1. Return _A_.
        </emu-alg>
        <p>The value of the *"name"* property of this method is *"[Symbol.split]"*.</p>
        <emu-note>
          <p>This method ignores the value of the *"global"* and *"sticky"* properties of this RegExp object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.sticky">
        <h1>get RegExp.prototype.sticky</h1>
        <p>`RegExp.prototype.sticky` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0079 (LATIN SMALL LETTER Y).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexp.prototype.test">
        <h1>RegExp.prototype.test ( _S_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. If _R_ is not an Object, throw a *TypeError* exception.
          1. Let _string_ be ? ToString(_S_).
          1. Let _match_ be ? RegExpExec(_R_, _string_).
          1. If _match_ is not *null*, return *true*; else return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regexp.prototype.tostring">
        <h1>RegExp.prototype.toString ( )</h1>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. If _R_ is not an Object, throw a *TypeError* exception.
          1. Let _pattern_ be ? ToString(? Get(_R_, *"source"*)).
          1. Let _flags_ be ? ToString(? Get(_R_, *"flags"*)).
          1. Let _result_ be the string-concatenation of *"/"*, _pattern_, *"/"*, and _flags_.
          1. Return _result_.
        </emu-alg>
        <emu-note>
          <p>The returned String has the form of a |RegularExpressionLiteral| that evaluates to another RegExp object with the same behaviour as this object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.unicode">
        <h1>get RegExp.prototype.unicode</h1>
        <p>`RegExp.prototype.unicode` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0075 (LATIN SMALL LETTER U).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-regexp.prototype.unicodesets">
        <h1>get RegExp.prototype.unicodeSets</h1>
        <p>`RegExp.prototype.unicodeSets` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _R_ be the *this* value.
          1. Let _cu_ be the code unit 0x0076 (LATIN SMALL LETTER V).
          1. Return ? RegExpHasFlag(_R_, _cu_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-regexp-matching">
      <h1>Abstract Operations for RegExp Matching</h1>

      <emu-clause id="sec-regexpexec" type="abstract operation">
        <h1>
          RegExpExec (
            _R_: an Object,
            _S_: a String,
          ): either a normal completion containing either an Object or *null*, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _exec_ be ? Get(_R_, *"exec"*).
          1. If IsCallable(_exec_) is *true*, then
            1. Let _result_ be ? Call(_exec_, _R_, « _S_ »).
            1. If _result_ is not an Object and _result_ is not *null*, throw a *TypeError* exception.
            1. Return _result_.
          1. Perform ? RequireInternalSlot(_R_, [[RegExpMatcher]]).
          1. Return ? RegExpBuiltinExec(_R_, _S_).
        </emu-alg>
        <emu-note>
          <p>If a callable *"exec"* property is not found this algorithm falls back to attempting to use the built-in RegExp matching algorithm. This provides compatible behaviour for code written for prior editions where most built-in algorithms that use regular expressions did not perform a dynamic property lookup of *"exec"*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-regexpbuiltinexec" type="abstract operation">
        <h1>
          RegExpBuiltinExec (
            _R_: an initialized RegExp instance,
            _S_: a String,
          ): either a normal completion containing either an Array exotic object or *null*, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _length_ be the length of _S_.
          1. Let _lastIndex_ be ℝ(? ToLength(? Get(_R_, *"lastIndex"*))).
          1. Let _flags_ be _R_.[[OriginalFlags]].
          1. If _flags_ contains *"g"*, let _global_ be *true*; else let _global_ be *false*.
          1. If _flags_ contains *"y"*, let _sticky_ be *true*; else let _sticky_ be *false*.
          1. If _flags_ contains *"d"*, let _hasIndices_ be *true*; else let _hasIndices_ be *false*.
          1. If _global_ is *false* and _sticky_ is *false*, set _lastIndex_ to 0.
          1. Let _matcher_ be _R_.[[RegExpMatcher]].
          1. If _flags_ contains *"u"* or _flags_ contains *"v"*, let _fullUnicode_ be *true*; else let _fullUnicode_ be *false*.
          1. Let _matchSucceeded_ be *false*.
          1. If _fullUnicode_ is *true*, let _input_ be StringToCodePoints(_S_). Otherwise, let _input_ be a List whose elements are the code units that are the elements of _S_.
          1. NOTE: Each element of _input_ is considered to be a character.
          1. Repeat, while _matchSucceeded_ is *false*,
            1. If _lastIndex_ > _length_, then
              1. If _global_ is *true* or _sticky_ is *true*, then
                1. Perform ? Set(_R_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
              1. Return *null*.
            1. Let _inputIndex_ be the index into _input_ of the character that was obtained from element _lastIndex_ of _S_.
            1. Let _r_ be _matcher_(_input_, _inputIndex_).
            1. If _r_ is ~failure~, then
              1. If _sticky_ is *true*, then
                1. Perform ? Set(_R_, *"lastIndex"*, *+0*<sub>𝔽</sub>, *true*).
                1. Return *null*.
              1. Set _lastIndex_ to AdvanceStringIndex(_S_, _lastIndex_, _fullUnicode_).
            1. Else,
              1. Assert: _r_ is a MatchState.
              1. Set _matchSucceeded_ to *true*.
          1. Let _e_ be _r_.[[EndIndex]].
          1. If _fullUnicode_ is *true*, set _e_ to GetStringIndex(_S_, _e_).
          1. If _global_ is *true* or _sticky_ is *true*, then
            1. Perform ? Set(_R_, *"lastIndex"*, 𝔽(_e_), *true*).
          1. Let _n_ be the number of elements in _r_.[[Captures]].
          1. Assert: _n_ = _R_.[[RegExpRecord]].[[CapturingGroupsCount]].
          1. Assert: _n_ &lt; 2<sup>32</sup> - 1.
          1. Let _A_ be ! ArrayCreate(_n_ + 1).
          1. Assert: The mathematical value of _A_'s *"length"* property is _n_ + 1.
          1. Perform ! CreateDataPropertyOrThrow(_A_, *"index"*, 𝔽(_lastIndex_)).
          1. Perform ! CreateDataPropertyOrThrow(_A_, *"input"*, _S_).
          1. Let _match_ be the Match Record { [[StartIndex]]: _lastIndex_, [[EndIndex]]: _e_ }.
          1. Let _indices_ be a new empty List.
          1. Let _groupNames_ be a new empty List.
          1. Append _match_ to _indices_.
          1. Let _matchedSubstr_ be GetMatchString(_S_, _match_).
          1. Perform ! CreateDataPropertyOrThrow(_A_, *"0"*, _matchedSubstr_).
          1. If _R_ contains any |GroupName|, then
            1. Let _groups_ be OrdinaryObjectCreate(*null*).
            1. Let _hasGroups_ be *true*.
          1. Else,
            1. Let _groups_ be *undefined*.
            1. Let _hasGroups_ be *false*.
          1. Perform ! CreateDataPropertyOrThrow(_A_, *"groups"*, _groups_).
          1. Let _matchedGroupNames_ be a new empty List.
          1. For each integer _i_ such that 1 ≤ _i_ ≤ _n_, in ascending order, do
            1. Let _captureI_ be _i_<sup>th</sup> element of _r_.[[Captures]].
            1. If _captureI_ is *undefined*, then
              1. Let _capturedValue_ be *undefined*.
              1. Append *undefined* to _indices_.
            1. Else,
              1. Let _captureStart_ be _captureI_.[[StartIndex]].
              1. Let _captureEnd_ be _captureI_.[[EndIndex]].
              1. If _fullUnicode_ is *true*, then
                1. Set _captureStart_ to GetStringIndex(_S_, _captureStart_).
                1. Set _captureEnd_ to GetStringIndex(_S_, _captureEnd_).
              1. Let _capture_ be the Match Record { [[StartIndex]]: _captureStart_, [[EndIndex]]: _captureEnd_ }.
              1. Let _capturedValue_ be GetMatchString(_S_, _capture_).
              1. Append _capture_ to _indices_.
            1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_i_)), _capturedValue_).
            1. If the _i_<sup>th</sup> capture of _R_ was defined with a |GroupName|, then
              1. Let _s_ be the CapturingGroupName of that |GroupName|.
              1. If _matchedGroupNames_ contains _s_, then
                1. Assert: _capturedValue_ is *undefined*.
                1. Append *undefined* to _groupNames_.
              1. Else,
                1. If _capturedValue_ is not *undefined*, append _s_ to _matchedGroupNames_.
                1. NOTE: If there are multiple groups named _s_, _groups_ may already have an _s_ property at this point. However, because _groups_ is an ordinary object whose properties are all writable data properties, the call to CreateDataPropertyOrThrow is nevertheless guaranteed to succeed.
                1. Perform ! CreateDataPropertyOrThrow(_groups_, _s_, _capturedValue_).
                1. Append _s_ to _groupNames_.
            1. Else,
              1. Append *undefined* to _groupNames_.
          1. If _hasIndices_ is *true*, then
            1. Let _indicesArray_ be MakeMatchIndicesIndexPairArray(_S_, _indices_, _groupNames_, _hasGroups_).
            1. Perform ! CreateDataPropertyOrThrow(_A_, *"indices"*, _indicesArray_).
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-advancestringindex" type="abstract operation">
        <h1>
          AdvanceStringIndex (
            _S_: a String,
            _index_: a non-negative integer,
            _unicode_: a Boolean,
          ): an integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _index_ ≤ 2<sup>53</sup> - 1.
          1. If _unicode_ is *false*, return _index_ + 1.
          1. Let _length_ be the length of _S_.
          1. If _index_ + 1 ≥ _length_, return _index_ + 1.
          1. Let _cp_ be CodePointAt(_S_, _index_).
          1. Return _index_ + _cp_.[[CodeUnitCount]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getstringindex" type="abstract operation">
        <h1>
          GetStringIndex (
            _S_: a String,
            _codePointIndex_: a non-negative integer,
          ): a non-negative integer
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It interprets _S_ as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>, and returns the code unit index corresponding to code point index _codePointIndex_ when such an index exists. Otherwise, it returns the length of _S_.</dd>
        </dl>
        <emu-alg>
          1. If _S_ is the empty String, return 0.
          1. Let _len_ be the length of _S_.
          1. Let _codeUnitCount_ be 0.
          1. Let _codePointCount_ be 0.
          1. Repeat, while _codeUnitCount_ &lt; _len_,
            1. If _codePointCount_ = _codePointIndex_, return _codeUnitCount_.
            1. Let _cp_ be CodePointAt(_S_, _codeUnitCount_).
            1. Set _codeUnitCount_ to _codeUnitCount_ + _cp_.[[CodeUnitCount]].
            1. Set _codePointCount_ to _codePointCount_ + 1.
          1. Return _len_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-match-records">
        <h1>Match Records</h1>
        <p>A <dfn variants="Match Records">Match Record</dfn> is a Record value used to encapsulate the start and end indices of a regular expression match or capture.</p>
        <p>Match Records have the fields listed in <emu-xref href="#table-match-record"></emu-xref>.</p>
        <emu-table id="table-match-record" caption="Match Record Fields">
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tr>
              <td>[[StartIndex]]</td>
              <td>a non-negative integer</td>
              <td>The number of code units from the start of a string at which the match begins (inclusive).</td>
            </tr>
            <tr>
              <td>[[EndIndex]]</td>
              <td>an integer ≥ [[StartIndex]]</td>
              <td>The number of code units from the start of a string at which the match ends (exclusive).</td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-getmatchstring" type="abstract operation">
        <h1>
          GetMatchString (
            _S_: a String,
            _match_: a Match Record,
          ): a String
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _match_.[[StartIndex]] ≤ _match_.[[EndIndex]] ≤ the length of _S_.
          1. Return the substring of _S_ from _match_.[[StartIndex]] to _match_.[[EndIndex]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getmatchindexpair" type="abstract operation">
        <h1>
          GetMatchIndexPair (
            _S_: a String,
            _match_: a Match Record,
          ): an Array
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _match_.[[StartIndex]] ≤ _match_.[[EndIndex]] ≤ the length of _S_.
          1. Return CreateArrayFromList(« 𝔽(_match_.[[StartIndex]]), 𝔽(_match_.[[EndIndex]]) »).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-makematchindicesindexpairarray" type="abstract operation">
        <h1>
          MakeMatchIndicesIndexPairArray (
            _S_: a String,
            _indices_: a List of either Match Records or *undefined*,
            _groupNames_: a List of either Strings or *undefined*,
            _hasGroups_: a Boolean,
          ): an Array
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _n_ be the number of elements in _indices_.
          1. Assert: _n_ &lt; 2<sup>32</sup> - 1.
          1. Assert: _groupNames_ has _n_ - 1 elements.
          1. NOTE: The _groupNames_ List contains elements aligned with the _indices_ List starting at _indices_[1].
          1. Let _A_ be ! ArrayCreate(_n_).
          1. If _hasGroups_ is *true*, then
            1. Let _groups_ be OrdinaryObjectCreate(*null*).
          1. Else,
            1. Let _groups_ be *undefined*.
          1. Perform ! CreateDataPropertyOrThrow(_A_, *"groups"*, _groups_).
          1. For each integer _i_ such that 0 ≤ _i_ &lt; _n_, in ascending order, do
            1. Let _matchIndices_ be _indices_[_i_].
            1. If _matchIndices_ is not *undefined*, then
              1. Let _matchIndexPair_ be GetMatchIndexPair(_S_, _matchIndices_).
            1. Else,
              1. Let _matchIndexPair_ be *undefined*.
            1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_i_)), _matchIndexPair_).
            1. If _i_ > 0 and _groupNames_[_i_ - 1] is not *undefined*, then
              1. Assert: _groups_ is not *undefined*.
              1. Let _s_ be _groupNames_[_i_ - 1].
              1. NOTE: If there are multiple groups named _s_, _groups_ may already have an _s_ property at this point. However, because _groups_ is an ordinary object whose properties are all writable data properties, the call to CreateDataPropertyOrThrow is nevertheless guaranteed to succeed.
              1. Perform ! CreateDataPropertyOrThrow(_groups_, _s_, _matchIndexPair_).
          1. Return _A_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-regexp-instances">
      <h1>Properties of RegExp Instances</h1>
      <p>RegExp instances are ordinary objects that inherit properties from the RegExp prototype object. RegExp instances have internal slots [[OriginalSource]], [[OriginalFlags]], [[RegExpRecord]], and [[RegExpMatcher]]. The value of the [[RegExpMatcher]] internal slot is an Abstract Closure representation of the |Pattern| of the RegExp object.</p>
      <emu-note>
        <p>Prior to ECMAScript 2015, RegExp instances were specified as having the own data properties *"source"*, *"global"*, *"ignoreCase"*, and *"multiline"*. Those properties are now specified as accessor properties of `RegExp.prototype`.</p>
      </emu-note>
      <p>RegExp instances also have the following property:</p>

      <emu-clause id="sec-lastindex">
        <h1>lastIndex</h1>
        <p>The value of the *"lastIndex"* property specifies the String index at which to start the next match. It is coerced to an integral Number when used (see <emu-xref href="#sec-regexpbuiltinexec"></emu-xref>). This property shall have the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-regexp-string-iterator-objects">
      <h1>RegExp String Iterator Objects</h1>
      <p>A <dfn variants="RegExp String Iterators,RegExp String Iterator object,RegExp String Iterator objects">RegExp String Iterator</dfn> is an object that represents a specific iteration over some specific String instance object, matching against some specific RegExp instance object. There is not a named constructor for RegExp String Iterator objects. Instead, RegExp String Iterator objects are created by calling certain methods of RegExp instance objects.</p>

      <emu-clause id="sec-createregexpstringiterator" type="abstract operation" oldids="sec-properties-of-regexp-string-iterator-instances,table-regexp-string-iterator-instance-slots">
        <h1>
          CreateRegExpStringIterator (
            _R_: an Object,
            _S_: a String,
            _global_: a Boolean,
            _fullUnicode_: a Boolean,
          ): a Generator
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _R_, _S_, _global_, and _fullUnicode_ and performs the following steps when called:
            1. Repeat,
              1. Let _match_ be ? RegExpExec(_R_, _S_).
              1. If _match_ is *null*, return *undefined*.
              1. If _global_ is *false*, then
                1. Perform ? GeneratorYield(CreateIteratorResultObject(_match_, *false*)).
                1. Return *undefined*.
              1. Let _matchStr_ be ? ToString(? Get(_match_, *"0"*)).
              1. If _matchStr_ is the empty String, then
                1. Let _thisIndex_ be ℝ(? ToLength(? Get(_R_, *"lastIndex"*))).
                1. Let _nextIndex_ be AdvanceStringIndex(_S_, _thisIndex_, _fullUnicode_).
                1. Perform ? Set(_R_, *"lastIndex"*, 𝔽(_nextIndex_), *true*).
              1. Perform ? GeneratorYield(CreateIteratorResultObject(_match_, *false*)).
          1. Return CreateIteratorFromClosure(_closure_, *"%RegExpStringIteratorPrototype%"*, %RegExpStringIteratorPrototype%).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%regexpstringiteratorprototype%-object">
        <h1>The %RegExpStringIteratorPrototype% Object</h1>
        <p>The <dfn>%RegExpStringIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all RegExp String Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%regexpstringiteratorprototype%.next">
          <h1>%RegExpStringIteratorPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? GeneratorResume(*this* value, ~empty~, *"%RegExpStringIteratorPrototype%"*).
          </emu-alg>
        </emu-clause>

        <emu-clause oldids="sec-%regexpstringiteratorprototype%-@@tostringtag" id="sec-%regexpstringiteratorprototype%-%symbol.tostringtag%">
          <h1>%RegExpStringIteratorPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"RegExp String Iterator"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<h1 id="sec-indexed-collections"></h1>
