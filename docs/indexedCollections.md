# Indexed Collections

  <emu-clause id="sec-array-objects">
    <h1>Array Objects</h1>
    <p>Arrays are exotic objects that give special treatment to a certain class of property names. See <emu-xref href="#sec-array-exotic-objects"></emu-xref> for a definition of this special treatment.</p>

    <emu-clause id="sec-array-constructor">
      <h1>The Array Constructor</h1>
      <p>The Array constructor:</p>
      <ul>
        <li>is <dfn>%Array%</dfn>.</li>
        <li>is the initial value of the *"Array"* property of the global object.</li>
        <li>creates and initializes a new Array when called as a constructor.</li>
        <li>also creates and initializes a new Array when called as a function rather than as a constructor. Thus the function call `Array(…)` is equivalent to the object creation expression `new Array(…)` with the same arguments.</li>
        <li>is a function whose behaviour differs based upon the number and types of its arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the exotic Array behaviour must include a `super` call to the Array constructor to initialize subclass instances that are Array exotic objects. However, most of the `Array.prototype` methods are generic methods that are not dependent upon their *this* value being an Array exotic object.</li>
      </ul>

      <emu-clause id="sec-array" oldids="sec-array-constructor-array,sec-array-len,sec-array-items">
        <h1>Array ( ..._values_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, let _newTarget_ be the active function object; else let _newTarget_ be NewTarget.
          1. Let _proto_ be ? GetPrototypeFromConstructor(_newTarget_, *"%Array.prototype%"*).
          1. Let _numberOfArgs_ be the number of elements in _values_.
          1. If _numberOfArgs_ = 0, then
            1. Return ! ArrayCreate(0, _proto_).
          1. Else if _numberOfArgs_ = 1, then
            1. Let _len_ be _values_[0].
            1. Let _array_ be ! ArrayCreate(0, _proto_).
            1. If _len_ is not a Number, then
              1. Perform ! CreateDataPropertyOrThrow(_array_, *"0"*, _len_).
              1. Let _intLen_ be *1*<sub>𝔽</sub>.
            1. Else,
              1. Let _intLen_ be ! ToUint32(_len_).
              1. If SameValueZero(_intLen_, _len_) is *false*, throw a *RangeError* exception.
            1. Perform ! Set(_array_, *"length"*, _intLen_, *true*).
            1. Return _array_.
          1. Else,
            1. Assert: _numberOfArgs_ ≥ 2.
            1. Let _array_ be ? ArrayCreate(_numberOfArgs_, _proto_).
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _numberOfArgs_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _itemK_ be _values_[_k_].
              1. Perform ! CreateDataPropertyOrThrow(_array_, _Pk_, _itemK_).
              1. Set _k_ to _k_ + 1.
            1. Assert: The mathematical value of _array_'s *"length"* property is _numberOfArgs_.
            1. Return _array_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-array-constructor">
      <h1>Properties of the Array Constructor</h1>
      <p>The Array constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-array.from">
        <h1>Array.from ( _items_ [ , _mapper_ [ , _thisArg_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _C_ be the *this* value.
          1. If _mapper_ is *undefined*, then
            1. Let _mapping_ be *false*.
          1. Else,
            1. If IsCallable(_mapper_) is *false*, throw a *TypeError* exception.
            1. Let _mapping_ be *true*.
          1. Let _usingIterator_ be ? GetMethod(_items_, %Symbol.iterator%).
          1. If _usingIterator_ is not *undefined*, then
            1. If IsConstructor(_C_) is *true*, then
              1. Let _A_ be ? Construct(_C_).
            1. Else,
              1. Let _A_ be ! ArrayCreate(0).
            1. Let _iteratorRecord_ be ? GetIteratorFromMethod(_items_, _usingIterator_).
            1. Let _k_ be 0.
            1. Repeat,
              1. If _k_ ≥ 2<sup>53</sup> - 1, then
                1. Let _error_ be ThrowCompletion(a newly created *TypeError* object).
                1. Return ? IteratorClose(_iteratorRecord_, _error_).
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
              1. If _next_ is ~done~, then
                1. Perform ? Set(_A_, *"length"*, 𝔽(_k_), *true*).
                1. Return _A_.
              1. If _mapping_ is *true*, then
                1. Let _mappedValue_ be Completion(Call(_mapper_, _thisArg_, « _next_, 𝔽(_k_) »)).
                1. IfAbruptCloseIterator(_mappedValue_, _iteratorRecord_).
              1. Else,
                1. Let _mappedValue_ be _next_.
              1. Let _defineStatus_ be Completion(CreateDataPropertyOrThrow(_A_, _Pk_, _mappedValue_)).
              1. IfAbruptCloseIterator(_defineStatus_, _iteratorRecord_).
              1. Set _k_ to _k_ + 1.
          1. NOTE: _items_ is not iterable so assume it is an array-like object.
          1. Let _arrayLike_ be ! ToObject(_items_).
          1. Let _len_ be ? LengthOfArrayLike(_arrayLike_).
          1. If IsConstructor(_C_) is *true*, then
            1. Let _A_ be ? Construct(_C_, « 𝔽(_len_) »).
          1. Else,
            1. Let _A_ be ? ArrayCreate(_len_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ? Get(_arrayLike_, _Pk_).
            1. If _mapping_ is *true*, then
              1. Let _mappedValue_ be ? Call(_mapper_, _thisArg_, « _kValue_, 𝔽(_k_) »).
            1. Else,
              1. Let _mappedValue_ be _kValue_.
            1. Perform ? CreateDataPropertyOrThrow(_A_, _Pk_, _mappedValue_).
            1. Set _k_ to _k_ + 1.
          1. Perform ? Set(_A_, *"length"*, 𝔽(_len_), *true*).
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>This method is an intentionally generic factory method; it does not require that its *this* value be the Array constructor. Therefore it can be transferred to or inherited by any other constructors that may be called with a single numeric argument.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.isarray">
        <h1>Array.isArray ( _arg_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return ? IsArray(_arg_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.of">
        <h1>Array.of ( ..._items_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _len_ be the number of elements in _items_.
          1. Let _lenNumber_ be 𝔽(_len_).
          1. Let _C_ be the *this* value.
          1. If IsConstructor(_C_) is *true*, then
            1. Let _A_ be ? Construct(_C_, « _lenNumber_ »).
          1. Else,
            1. Let _A_ be ? ArrayCreate(_len_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _kValue_ be _items_[_k_].
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Perform ? CreateDataPropertyOrThrow(_A_, _Pk_, _kValue_).
            1. Set _k_ to _k_ + 1.
          1. Perform ? Set(_A_, *"length"*, _lenNumber_, *true*).
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>This method is an intentionally generic factory method; it does not require that its *this* value be the Array constructor. Therefore it can be transferred to or inherited by other constructors that may be called with a single numeric argument.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype">
        <h1>Array.prototype</h1>
        <p>The value of `Array.prototype` is the Array prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-array-@@species" id="sec-get-array-%symbol.species%">
        <h1>get Array [ %Symbol.species% ]</h1>
        <p>`Array[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p>Array prototype methods normally use their *this* value's constructor to create a derived object. However, a subclass constructor may over-ride that default behaviour by redefining its %Symbol.species% property.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-array-prototype-object">
      <h1>Properties of the Array Prototype Object</h1>
      <p>The <dfn>Array prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Array.prototype%</dfn>.</li>
        <li>is an Array exotic object and has the internal methods specified for such objects.</li>
        <li>has a *"length"* property whose initial value is *+0*<sub>𝔽</sub> and whose attributes are { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>
      <emu-note>
        <p>The Array prototype object is specified to be an Array exotic object to ensure compatibility with ECMAScript code that was created prior to the ECMAScript 2015 specification.</p>
      </emu-note>

      <emu-clause id="sec-array.prototype.at">
        <h1>Array.prototype.at ( _index_ )</h1>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeIndex_ be ? ToIntegerOrInfinity(_index_).
          1. If _relativeIndex_ ≥ 0, then
            1. Let _k_ be _relativeIndex_.
          1. Else,
            1. Let _k_ be _len_ + _relativeIndex_.
          1. If _k_ &lt; 0 or _k_ ≥ _len_, return *undefined*.
          1. Return ? Get(_O_, ! ToString(𝔽(_k_))).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.concat">
        <h1>Array.prototype.concat ( ..._items_ )</h1>
        <p>This method returns an array containing the array elements of the object followed by the array elements of each argument.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _A_ be ? ArraySpeciesCreate(_O_, 0).
          1. Let _n_ be 0.
          1. Prepend _O_ to _items_.
          1. For each element _E_ of _items_, do
            1. Let _spreadable_ be ? IsConcatSpreadable(_E_).
            1. If _spreadable_ is *true*, then
              1. Let _len_ be ? LengthOfArrayLike(_E_).
              1. If _n_ + _len_ > 2<sup>53</sup> - 1, throw a *TypeError* exception.
              1. Let _k_ be 0.
              1. Repeat, while _k_ &lt; _len_,
                1. Let _Pk_ be ! ToString(𝔽(_k_)).
                1. Let _exists_ be ? HasProperty(_E_, _Pk_).
                1. If _exists_ is *true*, then
                  1. Let _subElement_ be ? Get(_E_, _Pk_).
                  1. Perform ? CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _subElement_).
                1. Set _n_ to _n_ + 1.
                1. Set _k_ to _k_ + 1.
            1. Else,
              1. NOTE: _E_ is added as a single item rather than spread.
              1. If _n_ ≥ 2<sup>53</sup> - 1, throw a *TypeError* exception.
              1. Perform ? CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _E_).
              1. Set _n_ to _n_ + 1.
          1. [id="step-array-proto-concat-set-length"] Perform ? Set(_A_, *"length"*, 𝔽(_n_), *true*).
          1. Return _A_.
        </emu-alg>
        <p>The *"length"* property of this method is *1*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>The explicit setting of the *"length"* property in step <emu-xref href="#step-array-proto-concat-set-length"></emu-xref> is intended to ensure the length is correct when the final non-empty element of _items_ has trailing holes or when _A_ is not a built-in Array.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-isconcatspreadable" type="abstract operation">
          <h1>
            IsConcatSpreadable (
              _O_: an ECMAScript language value,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _O_ is not an Object, return *false*.
            1. Let _spreadable_ be ? Get(_O_, %Symbol.isConcatSpreadable%).
            1. If _spreadable_ is not *undefined*, return ToBoolean(_spreadable_).
            1. Return ? IsArray(_O_).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-array.prototype.constructor">
        <h1>Array.prototype.constructor</h1>
        <p>The initial value of `Array.prototype.constructor` is %Array%.</p>
      </emu-clause>

      <emu-clause id="sec-array.prototype.copywithin">
        <h1>Array.prototype.copyWithin ( _target_, _start_ [ , _end_ ] )</h1>
        <emu-note>
          <p>The _end_ argument is optional. If it is not provided, the length of the *this* value is used.</p>
        </emu-note>
        <emu-note>
          <p>If _target_ is negative, it is treated as <emu-eqn>_length_ + _target_</emu-eqn> where _length_ is the length of the array. If _start_ is negative, it is treated as <emu-eqn>_length_ + _start_</emu-eqn>. If _end_ is negative, it is treated as <emu-eqn>_length_ + _end_</emu-eqn>.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeTarget_ be ? ToIntegerOrInfinity(_target_).
          1. If _relativeTarget_ = -∞, let _to_ be 0.
          1. Else if _relativeTarget_ &lt; 0, let _to_ be max(_len_ + _relativeTarget_, 0).
          1. Else, let _to_ be min(_relativeTarget_, _len_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _from_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _from_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _from_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _final_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _final_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _final_ be min(_relativeEnd_, _len_).
          1. Let _count_ be min(_final_ - _from_, _len_ - _to_).
          1. If _from_ &lt; _to_ and _to_ &lt; _from_ + _count_, then
            1. Let _direction_ be -1.
            1. Set _from_ to _from_ + _count_ - 1.
            1. Set _to_ to _to_ + _count_ - 1.
          1. Else,
            1. Let _direction_ be 1.
          1. Repeat, while _count_ > 0,
            1. Let _fromKey_ be ! ToString(𝔽(_from_)).
            1. Let _toKey_ be ! ToString(𝔽(_to_)).
            1. Let _fromPresent_ be ? HasProperty(_O_, _fromKey_).
            1. If _fromPresent_ is *true*, then
              1. Let _fromValue_ be ? Get(_O_, _fromKey_).
              1. Perform ? Set(_O_, _toKey_, _fromValue_, *true*).
            1. Else,
              1. Assert: _fromPresent_ is *false*.
              1. Perform ? DeletePropertyOrThrow(_O_, _toKey_).
            1. Set _from_ to _from_ + _direction_.
            1. Set _to_ to _to_ + _direction_.
            1. Set _count_ to _count_ - 1.
          1. Return _O_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.entries">
        <h1>Array.prototype.entries ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Return CreateArrayIterator(_O_, ~key+value~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.every">
        <h1>Array.prototype.every ( _callback_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments and returns a value that is coercible to a Boolean value. `every` calls _callback_ once for each element present in the array, in ascending order, until it finds one where _callback_ returns *false*. If such an element is found, `every` immediately returns *false*. Otherwise, `every` returns *true*. _callback_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.</p>
          <p>`every` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `every` is set before the first call to _callback_. Elements which are appended to the array after the call to `every` begins will not be visited by _callback_. If existing elements of the array are changed, their value as passed to _callback_ will be the value at the time `every` visits them; elements that are deleted after the call to `every` begins and before being visited are not visited. `every` acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns *true*.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Let _testResult_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
              1. If _testResult_ is *false*, return *false*.
            1. Set _k_ to _k_ + 1.
          1. Return *true*.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.fill">
        <h1>Array.prototype.fill ( _value_ [ , _start_ [ , _end_ ] ] )</h1>
        <emu-note>
          <p>The _start_ argument is optional. If it is not provided, *+0*<sub>𝔽</sub> is used.</p>
          <p>The _end_ argument is optional. If it is not provided, the length of the *this* value is used.</p>
        </emu-note>
        <emu-note>
          <p>If _start_ is negative, it is treated as <emu-eqn>_length_ + _start_</emu-eqn> where _length_ is the length of the array. If _end_ is negative, it is treated as <emu-eqn>_length_ + _end_</emu-eqn>.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _k_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _k_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _k_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _final_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _final_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _final_ be min(_relativeEnd_, _len_).
          1. Repeat, while _k_ &lt; _final_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Perform ? Set(_O_, _Pk_, _value_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _O_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.filter">
        <h1>Array.prototype.filter ( _callback_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments and returns a value that is coercible to a Boolean value. `filter` calls _callback_ once for each element in the array, in ascending order, and constructs a new array of all the values for which _callback_ returns *true*. _callback_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.</p>
          <p>`filter` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `filter` is set before the first call to _callback_. Elements which are appended to the array after the call to `filter` begins will not be visited by _callback_. If existing elements of the array are changed their value as passed to _callback_ will be the value at the time `filter` visits them; elements that are deleted after the call to `filter` begins and before being visited are not visited.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _A_ be ? ArraySpeciesCreate(_O_, 0).
          1. Let _k_ be 0.
          1. Let _to_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Let _selected_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
              1. If _selected_ is *true*, then
                1. Perform ? CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_to_)), _kValue_).
                1. Set _to_ to _to_ + 1.
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.find">
        <h1>Array.prototype.find ( _predicate_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>This method calls _predicate_ once for each element of the array, in ascending index order, until it finds one where _predicate_ returns a value that coerces to *true*. If such an element is found, `find` immediately returns that element value. Otherwise, `find` returns *undefined*.</p>
          <p>See FindViaPredicate for additional information.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~ascending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Value]].
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.findindex">
        <h1>Array.prototype.findIndex ( _predicate_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>This method calls _predicate_ once for each element of the array, in ascending index order, until it finds one where _predicate_ returns a value that coerces to *true*. If such an element is found, `findIndex` immediately returns the index of that element value. Otherwise, `findIndex` returns -1.</p>
          <p>See FindViaPredicate for additional information.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~ascending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Index]].
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.findlast">
        <h1>Array.prototype.findLast ( _predicate_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>This method calls _predicate_ once for each element of the array, in descending index order, until it finds one where _predicate_ returns a value that coerces to *true*. If such an element is found, `findLast` immediately returns that element value. Otherwise, `findLast` returns *undefined*.</p>
          <p>See FindViaPredicate for additional information.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~descending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Value]].
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.findlastindex">
        <h1>Array.prototype.findLastIndex ( _predicate_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>This method calls _predicate_ once for each element of the array, in descending index order, until it finds one where _predicate_ returns a value that coerces to *true*. If such an element is found, `findLastIndex` immediately returns the index of that element value. Otherwise, `findLastIndex` returns -1.</p>
          <p>See FindViaPredicate for additional information.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~descending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Index]].
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-findviapredicate" type="abstract operation">
          <h1>
            FindViaPredicate (
              _O_: an Object,
              _len_: a non-negative integer,
              _direction_: ~ascending~ or ~descending~,
              _predicate_: an ECMAScript language value,
              _thisArg_: an ECMAScript language value,
            ): either a normal completion containing a Record with fields [[Index]] (an integral Number) and [[Value]] (an ECMAScript language value) or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>
              <p>_O_ should be an array-like object or a TypedArray. This operation calls _predicate_ once for each element of _O_, in either ascending index order or descending index order (as indicated by _direction_), until it finds one where _predicate_ returns a value that coerces to *true*. At that point, this operation returns a Record that gives the index and value of the element found. If no such element is found, this operation returns a Record that specifies *-1*<sub>𝔽</sub> for the index and *undefined* for the value.</p>
              <p>_predicate_ should be a function. When called for an element of the array, it is passed three arguments: the value of the element, the index of the element, and the object being traversed. Its return value will be coerced to a Boolean value.</p>
              <p>_thisArg_ will be used as the *this* value for each invocation of _predicate_.</p>
              <p>This operation does not directly mutate the object on which it is called, but the object may be mutated by the calls to _predicate_.</p>
              <p>The range of elements processed is set before the first call to _predicate_, just before the traversal begins. Elements that are appended to the array after this will not be visited by _predicate_. If existing elements of the array are changed, their value as passed to _predicate_ will be the value at the time that this operation visits them. Elements that are deleted after traversal begins and before being visited are still visited and are either looked up from the prototype or are *undefined*.</p>
            </dd>
          </dl>
          <emu-alg>
            1. If IsCallable(_predicate_) is *false*, throw a *TypeError* exception.
            1. If _direction_ is ~ascending~, then
              1. Let _indices_ be a List of the integers in the interval from 0 (inclusive) to _len_ (exclusive), in ascending order.
            1. Else,
              1. Let _indices_ be a List of the integers in the interval from 0 (inclusive) to _len_ (exclusive), in descending order.
            1. For each integer _k_ of _indices_, do
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. NOTE: If _O_ is a TypedArray, the following invocation of Get will return a normal completion.
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Let _testResult_ be ? Call(_predicate_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »).
              1. If ToBoolean(_testResult_) is *true*, return the Record { [[Index]]: 𝔽(_k_), [[Value]]: _kValue_ }.
            1. Return the Record { [[Index]]: *-1*<sub>𝔽</sub>, [[Value]]: *undefined* }.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-array.prototype.flat">
        <h1>Array.prototype.flat ( [ _depth_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _sourceLen_ be ? LengthOfArrayLike(_O_).
          1. Let _depthNum_ be 1.
          1. If _depth_ is not *undefined*, then
            1. Set _depthNum_ to ? ToIntegerOrInfinity(_depth_).
            1. If _depthNum_ &lt; 0, set _depthNum_ to 0.
          1. Let _A_ be ? ArraySpeciesCreate(_O_, 0).
          1. Perform ? FlattenIntoArray(_A_, _O_, _sourceLen_, 0, _depthNum_).
          1. Return _A_.
        </emu-alg>

        <emu-clause id="sec-flattenintoarray" type="abstract operation">
          <h1>
            FlattenIntoArray (
              _target_: an Object,
              _source_: an Object,
              _sourceLen_: a non-negative integer,
              _start_: a non-negative integer,
              _depth_: a non-negative integer or +&infin;,
              optional _mapperFunction_: a function object,
              optional _thisArg_: an ECMAScript language value,
            ): either a normal completion containing a non-negative integer or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Assert: If _mapperFunction_ is present, then IsCallable(_mapperFunction_) is *true*, _thisArg_ is present, and _depth_ is 1.
            1. Let _targetIndex_ be _start_.
            1. Let _sourceIndex_ be *+0*<sub>𝔽</sub>.
            1. Repeat, while ℝ(_sourceIndex_) &lt; _sourceLen_,
              1. Let _P_ be ! ToString(_sourceIndex_).
              1. Let _exists_ be ? HasProperty(_source_, _P_).
              1. If _exists_ is *true*, then
                1. Let _element_ be ? Get(_source_, _P_).
                1. If _mapperFunction_ is present, then
                  1. Set _element_ to ? Call(_mapperFunction_, _thisArg_, « _element_, _sourceIndex_, _source_ »).
                1. Let _shouldFlatten_ be *false*.
                1. If _depth_ > 0, then
                  1. Set _shouldFlatten_ to ? IsArray(_element_).
                1. If _shouldFlatten_ is *true*, then
                  1. If _depth_ = +∞, let _newDepth_ be +∞.
                  1. Else, let _newDepth_ be _depth_ - 1.
                  1. Let _elementLen_ be ? LengthOfArrayLike(_element_).
                  1. Set _targetIndex_ to ? FlattenIntoArray(_target_, _element_, _elementLen_, _targetIndex_, _newDepth_).
                1. Else,
                  1. If _targetIndex_ ≥ 2<sup>53</sup> - 1, throw a *TypeError* exception.
                  1. Perform ? CreateDataPropertyOrThrow(_target_, ! ToString(𝔽(_targetIndex_)), _element_).
                  1. Set _targetIndex_ to _targetIndex_ + 1.
              1. Set _sourceIndex_ to _sourceIndex_ + *1*<sub>𝔽</sub>.
            1. Return _targetIndex_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-array.prototype.flatmap">
        <h1>Array.prototype.flatMap ( _mapperFunction_ [ , _thisArg_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _sourceLen_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_mapperFunction_) is *false*, throw a *TypeError* exception.
          1. Let _A_ be ? ArraySpeciesCreate(_O_, 0).
          1. Perform ? FlattenIntoArray(_A_, _O_, _sourceLen_, 0, 1, _mapperFunction_, _thisArg_).
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.foreach">
        <h1>Array.prototype.forEach ( _callback_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments. `forEach` calls _callback_ once for each element present in the array, in ascending order. _callback_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.</p>
          <p>`forEach` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `forEach` is set before the first call to _callback_. Elements which are appended to the array after the call to `forEach` begins will not be visited by _callback_. If existing elements of the array are changed, their value as passed to _callback_ will be the value at the time `forEach` visits them; elements that are deleted after the call to `forEach` begins and before being visited are not visited.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Perform ? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ + 1.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.includes">
        <h1>Array.prototype.includes ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <emu-note>
          <p>This method compares _searchElement_ to the elements of the array, in ascending order, using the SameValueZero algorithm, and if found at any position, returns *true*; otherwise, it returns *false*.</p>
          <p>The optional second argument _fromIndex_ defaults to *+0*<sub>𝔽</sub> (i.e. the whole array is searched). If it is greater than or equal to the length of the array, *false* is returned, i.e. the array will not be searched. If it is less than *-0*<sub>𝔽</sub>, it is used as the offset from the end of the array to compute _fromIndex_. If the computed index is less than or equal to *+0*<sub>𝔽</sub>, the whole array will be searched.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _len_ = 0, return *false*.
          1. Let _n_ be ? ToIntegerOrInfinity(_fromIndex_).
          1. Assert: If _fromIndex_ is *undefined*, then _n_ is 0.
          1. If _n_ = +∞, return *false*.
          1. Else if _n_ = -∞, set _n_ to 0.
          1. If _n_ ≥ 0, then
            1. Let _k_ be _n_.
          1. Else,
            1. Let _k_ be _len_ + _n_.
            1. If _k_ &lt; 0, set _k_ to 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _elementK_ be ? Get(_O_, ! ToString(𝔽(_k_))).
            1. If SameValueZero(_searchElement_, _elementK_) is *true*, return *true*.
            1. Set _k_ to _k_ + 1.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
        <emu-note>
          <p>This method intentionally differs from the similar `indexOf` method in two ways. First, it uses the SameValueZero algorithm, instead of IsStrictlyEqual, allowing it to detect *NaN* array elements. Second, it does not skip missing array elements, instead treating them as *undefined*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.indexof">
        <h1>Array.prototype.indexOf ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <p>This method compares _searchElement_ to the elements of the array, in ascending order, using the IsStrictlyEqual algorithm, and if found at one or more indices, returns the smallest such index; otherwise, it returns *-1*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>The optional second argument _fromIndex_ defaults to *+0*<sub>𝔽</sub> (i.e. the whole array is searched). If it is greater than or equal to the length of the array, *-1*<sub>𝔽</sub> is returned, i.e. the array will not be searched. If it is less than *-0*<sub>𝔽</sub>, it is used as the offset from the end of the array to compute _fromIndex_. If the computed index is less than or equal to *+0*<sub>𝔽</sub>, the whole array will be searched.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _len_ = 0, return *-1*<sub>𝔽</sub>.
          1. Let _n_ be ? ToIntegerOrInfinity(_fromIndex_).
          1. Assert: If _fromIndex_ is *undefined*, then _n_ is 0.
          1. If _n_ = +∞, return *-1*<sub>𝔽</sub>.
          1. Else if _n_ = -∞, set _n_ to 0.
          1. If _n_ ≥ 0, then
            1. Let _k_ be _n_.
          1. Else,
            1. Let _k_ be _len_ + _n_.
            1. If _k_ &lt; 0, set _k_ to 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _elementK_ be ? Get(_O_, _Pk_).
              1. If IsStrictlyEqual(_searchElement_, _elementK_) is *true*, return 𝔽(_k_).
            1. Set _k_ to _k_ + 1.
          1. Return *-1*<sub>𝔽</sub>.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.join">
        <h1>Array.prototype.join ( _separator_ )</h1>
        <p>This method converts the elements of the array to Strings, and then concatenates these Strings, separated by occurrences of the _separator_. If no separator is provided, a single comma is used as the separator.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _separator_ is *undefined*, let _sep_ be *","*.
          1. Else, let _sep_ be ? ToString(_separator_).
          1. Let _R_ be the empty String.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. If _k_ > 0, set _R_ to the string-concatenation of _R_ and _sep_.
            1. Let _element_ be ? Get(_O_, ! ToString(𝔽(_k_))).
            1. If _element_ is neither *undefined* nor *null*, then
              1. Let _S_ be ? ToString(_element_).
              1. Set _R_ to the string-concatenation of _R_ and _S_.
            1. Set _k_ to _k_ + 1.
          1. Return _R_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.keys">
        <h1>Array.prototype.keys ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Return CreateArrayIterator(_O_, ~key~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.lastindexof">
        <h1>Array.prototype.lastIndexOf ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <emu-note>
          <p>This method compares _searchElement_ to the elements of the array in descending order using the IsStrictlyEqual algorithm, and if found at one or more indices, returns the largest such index; otherwise, it returns *-1*<sub>𝔽</sub>.</p>
          <p>The optional second argument _fromIndex_ defaults to the array's length minus one (i.e. the whole array is searched). If it is greater than or equal to the length of the array, the whole array will be searched. If it is less than *-0*<sub>𝔽</sub>, it is used as the offset from the end of the array to compute _fromIndex_. If the computed index is less than or equal to *+0*<sub>𝔽</sub>, *-1*<sub>𝔽</sub> is returned.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _len_ = 0, return *-1*<sub>𝔽</sub>.
          1. If _fromIndex_ is present, let _n_ be ? ToIntegerOrInfinity(_fromIndex_); else let _n_ be _len_ - 1.
          1. If _n_ = -∞, return *-1*<sub>𝔽</sub>.
          1. If _n_ ≥ 0, then
            1. Let _k_ be min(_n_, _len_ - 1).
          1. Else,
            1. Let _k_ be _len_ + _n_.
          1. Repeat, while _k_ ≥ 0,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _elementK_ be ? Get(_O_, _Pk_).
              1. If IsStrictlyEqual(_searchElement_, _elementK_) is *true*, return 𝔽(_k_).
            1. Set _k_ to _k_ - 1.
          1. Return *-1*<sub>𝔽</sub>.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.map">
        <h1>Array.prototype.map ( _callback_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments. `map` calls _callback_ once for each element in the array, in ascending order, and constructs a new Array from the results. _callback_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.</p>
          <p>`map` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `map` is set before the first call to _callback_. Elements which are appended to the array after the call to `map` begins will not be visited by _callback_. If existing elements of the array are changed, their value as passed to _callback_ will be the value at the time `map` visits them; elements that are deleted after the call to `map` begins and before being visited are not visited.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _A_ be ? ArraySpeciesCreate(_O_, _len_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Let _mappedValue_ be ? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »).
              1. Perform ? CreateDataPropertyOrThrow(_A_, _Pk_, _mappedValue_).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.pop">
        <h1>Array.prototype.pop ( )</h1>
        <emu-note>
          <p>This method removes the last element of the array and returns it.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _len_ = 0, then
            1. Perform ? Set(_O_, *"length"*, *+0*<sub>𝔽</sub>, *true*).
            1. Return *undefined*.
          1. Else,
            1. Assert: _len_ > 0.
            1. Let _newLen_ be 𝔽(_len_ - 1).
            1. Let _index_ be ! ToString(_newLen_).
            1. Let _element_ be ? Get(_O_, _index_).
            1. Perform ? DeletePropertyOrThrow(_O_, _index_).
            1. Perform ? Set(_O_, *"length"*, _newLen_, *true*).
            1. Return _element_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.push">
        <h1>Array.prototype.push ( ..._items_ )</h1>
        <emu-note>
          <p>This method appends the arguments to the end of the array, in the order in which they appear. It returns the new length of the array.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _argCount_ be the number of elements in _items_.
          1. If _len_ + _argCount_ > 2<sup>53</sup> - 1, throw a *TypeError* exception.
          1. For each element _E_ of _items_, do
            1. Perform ? Set(_O_, ! ToString(𝔽(_len_)), _E_, *true*).
            1. Set _len_ to _len_ + 1.
          1. Perform ? Set(_O_, *"length"*, 𝔽(_len_), *true*).
          1. Return 𝔽(_len_).
        </emu-alg>
        <p>The *"length"* property of this method is *1*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.reduce">
        <h1>Array.prototype.reduce ( _callback_ [ , _initialValue_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that takes four arguments. `reduce` calls the callback, as a function, once for each element after the first element present in the array, in ascending order.</p>
          <p>_callback_ is called with four arguments: the _previousValue_ (value from the previous call to _callback_), the _currentValue_ (value of the current element), the _currentIndex_, and the object being traversed. The first time that callback is called, the _previousValue_ and _currentValue_ can be one of two values. If an _initialValue_ was supplied in the call to `reduce`, then _previousValue_ will be _initialValue_ and _currentValue_ will be the first value in the array. If no _initialValue_ was supplied, then _previousValue_ will be the first value in the array and _currentValue_ will be the second. It is a *TypeError* if the array contains no elements and _initialValue_ is not provided.</p>
          <p>`reduce` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `reduce` is set before the first call to _callback_. Elements that are appended to the array after the call to `reduce` begins will not be visited by _callback_. If existing elements of the array are changed, their value as passed to _callback_ will be the value at the time `reduce` visits them; elements that are deleted after the call to `reduce` begins and before being visited are not visited.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. If _len_ = 0 and _initialValue_ is not present, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Let _accumulator_ be *undefined*.
          1. If _initialValue_ is present, then
            1. Set _accumulator_ to _initialValue_.
          1. Else,
            1. Let _kPresent_ be *false*.
            1. Repeat, while _kPresent_ is *false* and _k_ &lt; _len_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Set _kPresent_ to ? HasProperty(_O_, _Pk_).
              1. If _kPresent_ is *true*, then
                1. Set _accumulator_ to ? Get(_O_, _Pk_).
              1. Set _k_ to _k_ + 1.
            1. If _kPresent_ is *false*, throw a *TypeError* exception.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Set _accumulator_ to ? Call(_callback_, *undefined*, « _accumulator_, _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ + 1.
          1. Return _accumulator_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.reduceright">
        <h1>Array.prototype.reduceRight ( _callback_ [ , _initialValue_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that takes four arguments. `reduceRight` calls the callback, as a function, once for each element after the first element present in the array, in descending order.</p>
          <p>_callback_ is called with four arguments: the _previousValue_ (value from the previous call to _callback_), the _currentValue_ (value of the current element), the _currentIndex_, and the object being traversed. The first time the function is called, the _previousValue_ and _currentValue_ can be one of two values. If an _initialValue_ was supplied in the call to `reduceRight`, then _previousValue_ will be _initialValue_ and _currentValue_ will be the last value in the array. If no _initialValue_ was supplied, then _previousValue_ will be the last value in the array and _currentValue_ will be the second-to-last value. It is a *TypeError* if the array contains no elements and _initialValue_ is not provided.</p>
          <p>`reduceRight` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `reduceRight` is set before the first call to _callback_. Elements that are appended to the array after the call to `reduceRight` begins will not be visited by _callback_. If existing elements of the array are changed by _callback_, their value as passed to _callback_ will be the value at the time `reduceRight` visits them; elements that are deleted after the call to `reduceRight` begins and before being visited are not visited.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. If _len_ = 0 and _initialValue_ is not present, throw a *TypeError* exception.
          1. Let _k_ be _len_ - 1.
          1. Let _accumulator_ be *undefined*.
          1. If _initialValue_ is present, then
            1. Set _accumulator_ to _initialValue_.
          1. Else,
            1. Let _kPresent_ be *false*.
            1. Repeat, while _kPresent_ is *false* and _k_ ≥ 0,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Set _kPresent_ to ? HasProperty(_O_, _Pk_).
              1. If _kPresent_ is *true*, then
                1. Set _accumulator_ to ? Get(_O_, _Pk_).
              1. Set _k_ to _k_ - 1.
            1. If _kPresent_ is *false*, throw a *TypeError* exception.
          1. Repeat, while _k_ ≥ 0,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Set _accumulator_ to ? Call(_callback_, *undefined*, « _accumulator_, _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ - 1.
          1. Return _accumulator_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.reverse">
        <h1>Array.prototype.reverse ( )</h1>
        <emu-note>
          <p>This method rearranges the elements of the array so as to reverse their order. It returns the reversed array.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _middle_ be floor(_len_ / 2).
          1. Let _lower_ be 0.
          1. Repeat, while _lower_ ≠ _middle_,
            1. Let _upper_ be _len_ - _lower_ - 1.
            1. Let _upperP_ be ! ToString(𝔽(_upper_)).
            1. Let _lowerP_ be ! ToString(𝔽(_lower_)).
            1. Let _lowerExists_ be ? HasProperty(_O_, _lowerP_).
            1. If _lowerExists_ is *true*, then
              1. Let _lowerValue_ be ? Get(_O_, _lowerP_).
            1. Let _upperExists_ be ? HasProperty(_O_, _upperP_).
            1. If _upperExists_ is *true*, then
              1. Let _upperValue_ be ? Get(_O_, _upperP_).
            1. If _lowerExists_ is *true* and _upperExists_ is *true*, then
              1. Perform ? Set(_O_, _lowerP_, _upperValue_, *true*).
              1. Perform ? Set(_O_, _upperP_, _lowerValue_, *true*).
            1. Else if _lowerExists_ is *false* and _upperExists_ is *true*, then
              1. Perform ? Set(_O_, _lowerP_, _upperValue_, *true*).
              1. Perform ? DeletePropertyOrThrow(_O_, _upperP_).
            1. Else if _lowerExists_ is *true* and _upperExists_ is *false*, then
              1. Perform ? DeletePropertyOrThrow(_O_, _lowerP_).
              1. Perform ? Set(_O_, _upperP_, _lowerValue_, *true*).
            1. Else,
              1. Assert: _lowerExists_ and _upperExists_ are both *false*.
              1. NOTE: No action is required.
            1. Set _lower_ to _lower_ + 1.
          1. Return _O_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.shift">
        <h1>Array.prototype.shift ( )</h1>
        <p>This method removes the first element of the array and returns it.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If _len_ = 0, then
            1. Perform ? Set(_O_, *"length"*, *+0*<sub>𝔽</sub>, *true*).
            1. Return *undefined*.
          1. Let _first_ be ? Get(_O_, *"0"*).
          1. Let _k_ be 1.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _from_ be ! ToString(𝔽(_k_)).
            1. Let _to_ be ! ToString(𝔽(_k_ - 1)).
            1. Let _fromPresent_ be ? HasProperty(_O_, _from_).
            1. If _fromPresent_ is *true*, then
              1. Let _fromValue_ be ? Get(_O_, _from_).
              1. Perform ? Set(_O_, _to_, _fromValue_, *true*).
            1. Else,
              1. Assert: _fromPresent_ is *false*.
              1. Perform ? DeletePropertyOrThrow(_O_, _to_).
            1. Set _k_ to _k_ + 1.
          1. Perform ? DeletePropertyOrThrow(_O_, ! ToString(𝔽(_len_ - 1))).
          1. Perform ? Set(_O_, *"length"*, 𝔽(_len_ - 1), *true*).
          1. Return _first_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.slice">
        <h1>Array.prototype.slice ( _start_, _end_ )</h1>
        <p>This method returns an array containing the elements of the array from element _start_ up to, but not including, element _end_ (or through the end of the array if _end_ is *undefined*). If _start_ is negative, it is treated as <emu-eqn>_length_ + _start_</emu-eqn> where _length_ is the length of the array. If _end_ is negative, it is treated as <emu-eqn>_length_ + _end_</emu-eqn> where _length_ is the length of the array.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _k_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _k_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _k_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _final_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _final_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _final_ be min(_relativeEnd_, _len_).
          1. Let _count_ be max(_final_ - _k_, 0).
          1. Let _A_ be ? ArraySpeciesCreate(_O_, _count_).
          1. Let _n_ be 0.
          1. Repeat, while _k_ &lt; _final_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Perform ? CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _kValue_).
            1. Set _k_ to _k_ + 1.
            1. Set _n_ to _n_ + 1.
          1. [id="step-array-proto-slice-set-length"] Perform ? Set(_A_, *"length"*, 𝔽(_n_), *true*).
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>The explicit setting of the *"length"* property in step <emu-xref href="#step-array-proto-slice-set-length"></emu-xref> is intended to ensure the length is correct even when _A_ is not a built-in Array.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.some">
        <h1>Array.prototype.some ( _callback_ [ , _thisArg_ ] )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments and returns a value that is coercible to a Boolean value. `some` calls _callback_ once for each element present in the array, in ascending order, until it finds one where _callback_ returns *true*. If such an element is found, `some` immediately returns *true*. Otherwise, `some` returns *false*. _callback_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.</p>
          <p>`some` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>The range of elements processed by `some` is set before the first call to _callback_. Elements that are appended to the array after the call to `some` begins will not be visited by _callback_. If existing elements of the array are changed, their value as passed to _callback_ will be the value at the time that `some` visits them; elements that are deleted after the call to `some` begins and before being visited are not visited. `some` acts like the "exists" quantifier in mathematics. In particular, for an empty array, it returns *false*.</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kPresent_ be ? HasProperty(_O_, _Pk_).
            1. If _kPresent_ is *true*, then
              1. Let _kValue_ be ? Get(_O_, _Pk_).
              1. Let _testResult_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
              1. If _testResult_ is *true*, return *true*.
            1. Set _k_ to _k_ + 1.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.sort" oldids="sec-sortcompare">
        <h1>Array.prototype.sort ( _comparator_ )</h1>
        <p>This method sorts the elements of this array. If _comparator_ is not *undefined*, it should be a function that accepts two arguments _x_ and _y_ and returns a negative Number if _x_ &lt; _y_, a positive Number if _x_ > _y_, or a zero otherwise.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. [id="step-array-sort-comparefn"] If _comparator_ is not *undefined* and IsCallable(_comparator_) is *false*, throw a *TypeError* exception.
          1. Let _obj_ be ? ToObject(*this* value).
          1. [id="step-array-sort-len"] Let _len_ be ? LengthOfArrayLike(_obj_).
          1. Let _SortCompare_ be a new Abstract Closure with parameters (_x_, _y_) that captures _comparator_ and performs the following steps when called:
            1. Return ? CompareArrayElements(_x_, _y_, _comparator_).
          1. [id="step-array-sortindexedproperties"] Let _sortedList_ be ? SortIndexedProperties(_obj_, _len_, _SortCompare_, ~skip-holes~).
          1. Let _itemCount_ be the number of elements in _sortedList_.
          1. Let _j_ be 0.
          1. Repeat, while _j_ &lt; _itemCount_,
            1. Perform ? Set(_obj_, ! ToString(𝔽(_j_)), _sortedList_[_j_], *true*).
            1. Set _j_ to _j_ + 1.
          1. NOTE: The call to SortIndexedProperties in step <emu-xref href="#step-array-sortindexedproperties"></emu-xref> uses ~skip-holes~. The remaining indices are deleted to preserve the number of holes that were detected and excluded from the sort.
          1. Repeat, while _j_ &lt; _len_,
            1. Perform ? DeletePropertyOrThrow(_obj_, ! ToString(𝔽(_j_))).
            1. Set _j_ to _j_ + 1.
          1. Return _obj_.
        </emu-alg>
        <emu-note>
          <p>Because non-existent property values always compare greater than *undefined* property values, and *undefined* always compares greater than any other value (see CompareArrayElements), *undefined* property values always sort to the end of the result, followed by non-existent property values.</p>
        </emu-note>
        <emu-note>
          <p>Method calls performed by the ToString abstract operations in steps <emu-xref href="#step-sortcompare-tostring-x"></emu-xref> and <emu-xref href="#step-sortcompare-tostring-y"></emu-xref> have the potential to cause _SortCompare_ to not behave as a consistent comparator.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore, it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>

        <emu-clause id="sec-sortindexedproperties" type="abstract operation">
          <h1>
            SortIndexedProperties (
              _obj_: an Object,
              _len_: a non-negative integer,
              _SortCompare_: an Abstract Closure with two parameters,
              _holes_: ~skip-holes~ or ~read-through-holes~,
            ): either a normal completion containing a List of ECMAScript language values or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _items_ be a new empty List.
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _len_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. If _holes_ is ~skip-holes~, then
                1. Let _kRead_ be ? HasProperty(_obj_, _Pk_).
              1. Else,
                1. Assert: _holes_ is ~read-through-holes~.
                1. Let _kRead_ be *true*.
              1. If _kRead_ is *true*, then
                1. Let _kValue_ be ? Get(_obj_, _Pk_).
                1. Append _kValue_ to _items_.
              1. Set _k_ to _k_ + 1.
            1. [id="step-array-sort"] Sort _items_ using an implementation-defined sequence of <emu-meta effects="user-code">calls to _SortCompare_</emu-meta>. If any such call returns an abrupt completion, stop before performing any further calls to _SortCompare_ and return that Completion Record.
            1. Return _items_.
          </emu-alg>
          <p>The <dfn id="sort-order">sort order</dfn> is the ordering of _items_ after completion of step <emu-xref href="#step-array-sort"></emu-xref> of the algorithm above. The sort order is implementation-defined if _SortCompare_ is not a consistent comparator for the elements of _items_. When SortIndexedProperties is invoked by <emu-xref href="#sec-array.prototype.sort">Array.prototype.sort</emu-xref> or <emu-xref href="#sec-array.prototype.tosorted">Array.prototype.toSorted</emu-xref>, the sort order is also implementation-defined if _comparator_ is *undefined*, and all applications of ToString, to any specific value passed as an argument to _SortCompare_, do not produce the same result.</p>
          <p>Unless the sort order is specified to be implementation-defined, it must satisfy all of the following conditions:</p>
          <ul>
            <li>
              There must be some mathematical permutation π of the non-negative integers less than _itemCount_, such that for every non-negative integer _j_ less than _itemCount_, the element <emu-eqn>old[_j_]</emu-eqn> is exactly the same as <emu-eqn>new[π(_j_)]</emu-eqn>.
            </li>
            <li>
              Then for all non-negative integers _j_ and _k_, each less than _itemCount_, if <emu-eqn>ℝ(_SortCompare_(old[_j_], old[_k_])) &lt; 0</emu-eqn>, then <emu-eqn>π(_j_) &lt; π(_k_)</emu-eqn>.
            </li>
            <li>
              And for all non-negative integers _j_ and _k_ such that _j_ &lt; _k_ &lt; _itemCount_, if <emu-eqn>ℝ(_SortCompare_(old[_j_], old[_k_])) = 0</emu-eqn>, then <emu-eqn>π(_j_) &lt; π(_k_)</emu-eqn>; i.e., the sort is stable.
            </li>
          </ul>
          <p>Here the notation <emu-eqn>old[_j_]</emu-eqn> is used to refer to <emu-eqn>_items_[_j_]</emu-eqn> before step <emu-xref href="#step-array-sort"></emu-xref> is executed, and the notation <emu-eqn>new[_j_]</emu-eqn> to refer to <emu-eqn>_items_[_j_]</emu-eqn> after step <emu-xref href="#step-array-sort"></emu-xref> has been executed.</p>
          <p>An abstract closure or function _comparator_ is a <dfn id="consistent-comparator">consistent comparator</dfn> for a set of values _S_ if all of the requirements below are met for all values _a_, _b_, and _c_ (possibly the same value) in the set _S_: The notation <emu-eqn>_a_ &lt;<sub>C</sub> _b_</emu-eqn> means <emu-eqn>ℝ(_comparator_(_a_, _b_)) &lt; 0</emu-eqn>; <emu-eqn>_a_ =<sub>C</sub> _b_</emu-eqn> means <emu-eqn>ℝ(_comparator_(_a_, _b_)) = 0</emu-eqn>; and <emu-eqn>_a_ ><sub>C</sub> _b_</emu-eqn> means <emu-eqn>ℝ(_comparator_(_a_, _b_)) > 0</emu-eqn>.</p>
          <ul>
            <li>
              Calling _comparator_(_a_, _b_) always returns the same value _v_ when given a specific pair of values _a_ and _b_ as its two arguments. Furthermore, _v_ is a Number, and _v_ is not *NaN*. Note that this implies that exactly one of _a_ &lt;<sub>C</sub> _b_, _a_ =<sub>C</sub> _b_, and _a_ ><sub>C</sub> _b_ will be true for a given pair of _a_ and _b_.
            </li>
            <li>
              Calling _comparator_(_a_, _b_) does not modify _obj_ or any object on _obj_'s prototype chain.
            </li>
            <li>
              _a_ =<sub>C</sub> _a_ (reflexivity)
            </li>
            <li>
              If _a_ =<sub>C</sub> _b_, then _b_ =<sub>C</sub> _a_ (symmetry)
            </li>
            <li>
              If _a_ =<sub>C</sub> _b_ and _b_ =<sub>C</sub> _c_, then _a_ =<sub>C</sub> _c_ (transitivity of =<sub>C</sub>)
            </li>
            <li>
              If _a_ &lt;<sub>C</sub> _b_ and _b_ &lt;<sub>C</sub> _c_, then _a_ &lt;<sub>C</sub> _c_ (transitivity of &lt;<sub>C</sub>)
            </li>
            <li>
              If _a_ ><sub>C</sub> _b_ and _b_ ><sub>C</sub> _c_, then _a_ ><sub>C</sub> _c_ (transitivity of ><sub>C</sub>)
            </li>
          </ul>
          <emu-note>
            <p>The above conditions are necessary and sufficient to ensure that _comparator_ divides the set _S_ into equivalence classes and that these equivalence classes are totally ordered.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-comparearrayelements" type="abstract operation">
          <h1>
            CompareArrayElements (
              _x_: an ECMAScript language value,
              _y_: an ECMAScript language value,
              _comparator_: a function object or *undefined*,
            ): either a normal completion containing a Number or an abrupt completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _x_ and _y_ are both *undefined*, return *+0*<sub>𝔽</sub>.
            1. If _x_ is *undefined*, return *1*<sub>𝔽</sub>.
            1. If _y_ is *undefined*, return *-1*<sub>𝔽</sub>.
            1. If _comparator_ is not *undefined*, then
              1. Let _v_ be ? ToNumber(? Call(_comparator_, *undefined*, « _x_, _y_ »)).
              1. If _v_ is *NaN*, return *+0*<sub>𝔽</sub>.
              1. Return _v_.
            1. [id="step-sortcompare-tostring-x"] Let _xString_ be ? ToString(_x_).
            1. [id="step-sortcompare-tostring-y"] Let _yString_ be ? ToString(_y_).
            1. Let _xSmaller_ be ! IsLessThan(_xString_, _yString_, *true*).
            1. If _xSmaller_ is *true*, return *-1*<sub>𝔽</sub>.
            1. Let _ySmaller_ be ! IsLessThan(_yString_, _xString_, *true*).
            1. If _ySmaller_ is *true*, return *1*<sub>𝔽</sub>.
            1. Return *+0*<sub>𝔽</sub>.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-array.prototype.splice">
        <h1>Array.prototype.splice ( _start_, _deleteCount_, ..._items_ )</h1>
        <emu-note>
          <p>This method deletes the _deleteCount_ elements of the array starting at integer index _start_ and replaces them with the elements of _items_. It returns an Array containing the deleted elements (if any).</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _actualStart_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _actualStart_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _actualStart_ be min(_relativeStart_, _len_).
          1. Let _itemCount_ be the number of elements in _items_.
          1. If _start_ is not present, then
            1. Let _actualDeleteCount_ be 0.
          1. Else if _deleteCount_ is not present, then
            1. Let _actualDeleteCount_ be _len_ - _actualStart_.
          1. Else,
            1. Let _dc_ be ? ToIntegerOrInfinity(_deleteCount_).
            1. Let _actualDeleteCount_ be the result of clamping _dc_ between 0 and _len_ - _actualStart_.
          1. If _len_ + _itemCount_ - _actualDeleteCount_ > 2<sup>53</sup> - 1, throw a *TypeError* exception.
          1. Let _A_ be ? ArraySpeciesCreate(_O_, _actualDeleteCount_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _actualDeleteCount_,
            1. Let _from_ be ! ToString(𝔽(_actualStart_ + _k_)).
            1. If ? HasProperty(_O_, _from_) is *true*, then
              1. Let _fromValue_ be ? Get(_O_, _from_).
              1. Perform ? CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_k_)), _fromValue_).
            1. Set _k_ to _k_ + 1.
          1. [id="step-array-proto-splice-set-length"] Perform ? Set(_A_, *"length"*, 𝔽(_actualDeleteCount_), *true*).
          1. If _itemCount_ &lt; _actualDeleteCount_, then
            1. Set _k_ to _actualStart_.
            1. Repeat, while _k_ &lt; (_len_ - _actualDeleteCount_),
              1. Let _from_ be ! ToString(𝔽(_k_ + _actualDeleteCount_)).
              1. Let _to_ be ! ToString(𝔽(_k_ + _itemCount_)).
              1. If ? HasProperty(_O_, _from_) is *true*, then
                1. Let _fromValue_ be ? Get(_O_, _from_).
                1. Perform ? Set(_O_, _to_, _fromValue_, *true*).
              1. Else,
                1. Perform ? DeletePropertyOrThrow(_O_, _to_).
              1. Set _k_ to _k_ + 1.
            1. Set _k_ to _len_.
            1. Repeat, while _k_ > (_len_ - _actualDeleteCount_ + _itemCount_),
              1. Perform ? DeletePropertyOrThrow(_O_, ! ToString(𝔽(_k_ - 1))).
              1. Set _k_ to _k_ - 1.
          1. Else if _itemCount_ > _actualDeleteCount_, then
            1. Set _k_ to (_len_ - _actualDeleteCount_).
            1. Repeat, while _k_ > _actualStart_,
              1. Let _from_ be ! ToString(𝔽(_k_ + _actualDeleteCount_ - 1)).
              1. Let _to_ be ! ToString(𝔽(_k_ + _itemCount_ - 1)).
              1. If ? HasProperty(_O_, _from_) is *true*, then
                1. Let _fromValue_ be ? Get(_O_, _from_).
                1. Perform ? Set(_O_, _to_, _fromValue_, *true*).
              1. Else,
                1. Perform ? DeletePropertyOrThrow(_O_, _to_).
              1. Set _k_ to _k_ - 1.
          1. Set _k_ to _actualStart_.
          1. For each element _E_ of _items_, do
            1. Perform ? Set(_O_, ! ToString(𝔽(_k_)), _E_, *true*).
            1. Set _k_ to _k_ + 1.
          1. [id="step-array-proto-splice-set-length-2"] Perform ? Set(_O_, *"length"*, 𝔽(_len_ - _actualDeleteCount_ + _itemCount_), *true*).
          1. Return _A_.
        </emu-alg>
        <emu-note>
          <p>The explicit setting of the *"length"* property in steps <emu-xref href="#step-array-proto-splice-set-length"></emu-xref> and <emu-xref href="#step-array-proto-splice-set-length-2"></emu-xref> is intended to ensure the lengths are correct even when the objects are not built-in Arrays.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.tolocalestring">
        <h1>Array.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement this method as specified in the ECMA-402 specification. If an ECMAScript implementation does not include the ECMA-402 API the following specification of this method is used.</p>
        <emu-note>
          <p>The first edition of ECMA-402 did not include a replacement specification for this method.</p>
        </emu-note>
        <p>The meanings of the optional parameters to this method are defined in the ECMA-402 specification; implementations that do not include ECMA-402 support must not use those parameter positions for anything else.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _array_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_array_).
          1. Let _separator_ be the implementation-defined list-separator String value appropriate for the host environment's current locale (such as *", "*).
          1. Let _R_ be the empty String.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. If _k_ > 0, set _R_ to the string-concatenation of _R_ and _separator_.
            1. Let _element_ be ? Get(_array_, ! ToString(𝔽(_k_))).
            1. If _element_ is neither *undefined* nor *null*, then
              1. Let _S_ be ? ToString(? Invoke(_element_, *"toLocaleString"*)).
              1. Set _R_ to the string-concatenation of _R_ and _S_.
            1. Set _k_ to _k_ + 1.
          1. Return _R_.
        </emu-alg>
        <emu-note>
          <p>This method converts the elements of the array to Strings using their `toLocaleString` methods, and then concatenates these Strings, separated by occurrences of an implementation-defined locale-sensitive separator String. This method is analogous to `toString` except that it is intended to yield a locale-sensitive result corresponding with conventions of the host environment's current locale.</p>
        </emu-note>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.toreversed">
        <h1>Array.prototype.toReversed ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _A_ be ? ArrayCreate(_len_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _from_ be ! ToString(𝔽(_len_ - _k_ - 1)).
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _fromValue_ be ? Get(_O_, _from_).
            1. Perform ! CreateDataPropertyOrThrow(_A_, _Pk_, _fromValue_).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.tosorted">
        <h1>Array.prototype.toSorted ( _comparator_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. If _comparator_ is not *undefined* and IsCallable(_comparator_) is *false*, throw a *TypeError* exception.
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _A_ be ? ArrayCreate(_len_).
          1. Let _SortCompare_ be a new Abstract Closure with parameters (_x_, _y_) that captures _comparator_ and performs the following steps when called:
            1. Return ? CompareArrayElements(_x_, _y_, _comparator_).
          1. Let _sortedList_ be ? SortIndexedProperties(_O_, _len_, _SortCompare_, ~read-through-holes~).
          1. Let _j_ be 0.
          1. Repeat, while _j_ &lt; _len_,
            1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_j_)), _sortedList_[_j_]).
            1. Set _j_ to _j_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.tospliced">
        <h1>Array.prototype.toSpliced ( _start_, _skipCount_, ..._items_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _actualStart_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _actualStart_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _actualStart_ be min(_relativeStart_, _len_).
          1. Let _insertCount_ be the number of elements in _items_.
          1. If _start_ is not present, then
            1. Let _actualSkipCount_ be 0.
          1. Else if _skipCount_ is not present, then
            1. Let _actualSkipCount_ be _len_ - _actualStart_.
          1. Else,
            1. Let _sc_ be ? ToIntegerOrInfinity(_skipCount_).
            1. Let _actualSkipCount_ be the result of clamping _sc_ between 0 and _len_ - _actualStart_.
          1. Let _newLen_ be _len_ + _insertCount_ - _actualSkipCount_.
          1. If _newLen_ > 2<sup>53</sup> - 1, throw a *TypeError* exception.
          1. Let _A_ be ? ArrayCreate(_newLen_).
          1. Let _i_ be 0.
          1. Let _r_ be _actualStart_ + _actualSkipCount_.
          1. Repeat, while _i_ &lt; _actualStart_,
            1. Let _Pi_ be ! ToString(𝔽(_i_)).
            1. Let _iValue_ be ? Get(_O_, _Pi_).
            1. Perform ! CreateDataPropertyOrThrow(_A_, _Pi_, _iValue_).
            1. Set _i_ to _i_ + 1.
          1. For each element _E_ of _items_, do
            1. Let _Pi_ be ! ToString(𝔽(_i_)).
            1. Perform ! CreateDataPropertyOrThrow(_A_, _Pi_, _E_).
            1. Set _i_ to _i_ + 1.
          1. Repeat, while _i_ &lt; _newLen_,
            1. Let _Pi_ be ! ToString(𝔽(_i_)).
            1. Let _from_ be ! ToString(𝔽(_r_)).
            1. Let _fromValue_ be ? Get(_O_, _from_).
            1. Perform ! CreateDataPropertyOrThrow(_A_, _Pi_, _fromValue_).
            1. Set _i_ to _i_ + 1.
            1. Set _r_ to _r_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.tostring">
        <h1>Array.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _array_ be ? ToObject(*this* value).
          1. Let _func_ be ? Get(_array_, *"join"*).
          1. If IsCallable(_func_) is *false*, set _func_ to the intrinsic function %Object.prototype.toString%.
          1. Return ? Call(_func_, _array_).
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.unshift">
        <h1>Array.prototype.unshift ( ..._items_ )</h1>
        <p>This method prepends the arguments to the start of the array, such that their order within the array is the same as the order in which they appear in the argument list.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _argCount_ be the number of elements in _items_.
          1. If _argCount_ > 0, then
            1. If _len_ + _argCount_ > 2<sup>53</sup> - 1, throw a *TypeError* exception.
            1. Let _k_ be _len_.
            1. Repeat, while _k_ > 0,
              1. Let _from_ be ! ToString(𝔽(_k_ - 1)).
              1. Let _to_ be ! ToString(𝔽(_k_ + _argCount_ - 1)).
              1. Let _fromPresent_ be ? HasProperty(_O_, _from_).
              1. If _fromPresent_ is *true*, then
                1. Let _fromValue_ be ? Get(_O_, _from_).
                1. Perform ? Set(_O_, _to_, _fromValue_, *true*).
              1. Else,
                1. Assert: _fromPresent_ is *false*.
                1. Perform ? DeletePropertyOrThrow(_O_, _to_).
              1. Set _k_ to _k_ - 1.
            1. Let _j_ be *+0*<sub>𝔽</sub>.
            1. For each element _E_ of _items_, do
              1. Perform ? Set(_O_, ! ToString(_j_), _E_, *true*).
              1. Set _j_ to _j_ + *1*<sub>𝔽</sub>.
          1. Perform ? Set(_O_, *"length"*, 𝔽(_len_ + _argCount_), *true*).
          1. Return 𝔽(_len_ + _argCount_).
        </emu-alg>
        <p>The *"length"* property of this method is *1*<sub>𝔽</sub>.</p>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be an Array. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array.prototype.values">
        <h1>Array.prototype.values ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Return CreateArrayIterator(_O_, ~value~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-array.prototype.with">
        <h1>Array.prototype.with ( _index_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? ToObject(*this* value).
          1. Let _len_ be ? LengthOfArrayLike(_O_).
          1. Let _relativeIndex_ be ? ToIntegerOrInfinity(_index_).
          1. If _relativeIndex_ ≥ 0, let _actualIndex_ be _relativeIndex_.
          1. Else, let _actualIndex_ be _len_ + _relativeIndex_.
          1. If _actualIndex_ ≥ _len_ or _actualIndex_ &lt; 0, throw a *RangeError* exception.
          1. Let _A_ be ? ArrayCreate(_len_).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. If _k_ = _actualIndex_, let _fromValue_ be _value_.
            1. Else, let _fromValue_ be ? Get(_O_, _Pk_).
            1. Perform ! CreateDataPropertyOrThrow(_A_, _Pk_, _fromValue_).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-array.prototype-@@iterator" id="sec-array.prototype-%symbol.iterator%">
        <h1>Array.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>The initial value of the %Symbol.iterator% property is %Array.prototype.values%, defined in <emu-xref href="#sec-array.prototype.values"></emu-xref>.</p>
      </emu-clause>

      <emu-clause oldids="sec-array.prototype-@@unscopables" id="sec-array.prototype-%symbol.unscopables%">
        <h1>Array.prototype [ %Symbol.unscopables% ]</h1>
        <p>The initial value of the %Symbol.unscopables% data property is an object created by the following steps:</p>
        <emu-alg>
          1. Let _unscopableList_ be OrdinaryObjectCreate(*null*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"at"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"copyWithin"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"entries"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"fill"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"find"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"findIndex"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"findLast"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"findLastIndex"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"flat"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"flatMap"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"includes"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"keys"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"toReversed"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"toSorted"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"toSpliced"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_unscopableList_, *"values"*, *true*).
          1. Return _unscopableList_.
        </emu-alg>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        <emu-note>
          <p>The own property names of this object are property names that were not included as standard properties of `Array.prototype` prior to the ECMAScript 2015 specification. These names are ignored for `with` statement binding purposes in order to preserve the behaviour of existing code that might use one of these names as a binding in an outer scope that is shadowed by a `with` statement whose binding object is an Array.</p>
          <p>The reason that *"with"* is not included in the _unscopableList_ is because it is already a <emu-xref href="#sec-keywords-and-reserved-words">reserved word</emu-xref>.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-array-instances">
      <h1>Properties of Array Instances</h1>
      <p>Array instances are Array exotic objects and have the internal methods specified for such objects. Array instances inherit properties from the Array prototype object.</p>
      <p>Array instances have a *"length"* property, and a set of enumerable properties with array index names.</p>

      <emu-clause id="sec-properties-of-array-instances-length">
        <h1>length</h1>
        <p>The *"length"* property of an Array instance is a data property whose value is always numerically greater than the name of every configurable own property whose name is an array index.</p>
        <p>The *"length"* property initially has the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>Reducing the value of the *"length"* property has the side-effect of deleting own array elements whose array index is between the old and new length values. However, non-configurable properties can not be deleted. Attempting to set the *"length"* property of an Array to a value that is numerically less than or equal to the largest numeric own property name of an existing non-configurable <emu-xref href="#array-index">array-indexed</emu-xref> property of the array will result in the length being set to a numeric value that is one greater than that non-configurable numeric own property name. See <emu-xref href="#sec-array-exotic-objects-defineownproperty-p-desc"></emu-xref>.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-array-iterator-objects">
      <h1>Array Iterator Objects</h1>
      <p>An <dfn variants="Array Iterators,Array Iterator object,Array Iterator objects">Array Iterator</dfn> is an object that represents a specific iteration over some specific Array instance object. There is not a named constructor for Array Iterator objects. Instead, Array Iterator objects are created by calling certain methods of Array instance objects.</p>

      <emu-clause id="sec-createarrayiterator" type="abstract operation" oldids="sec-properties-of-array-iterator-instances,table-48,table-internal-slots-of-array-iterator-instances">
        <h1>
          CreateArrayIterator (
            _array_: an Object,
            _kind_: ~key+value~, ~key~, or ~value~,
          ): a Generator
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create iterator objects for Array methods that return such iterators.</dd>
        </dl>
        <emu-alg>
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _kind_ and _array_ and performs the following steps when called:
            1. Let _index_ be 0.
            1. Repeat,
              1. If _array_ has a [[TypedArrayName]] internal slot, then
                1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_array_, ~seq-cst~).
                1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
                1. Let _len_ be TypedArrayLength(_taRecord_).
              1. Else,
                1. Let _len_ be ? LengthOfArrayLike(_array_).
              1. If _index_ ≥ _len_, return NormalCompletion(*undefined*).
              1. Let _indexNumber_ be 𝔽(_index_).
              1. If _kind_ is ~key~, then
                1. Let _result_ be _indexNumber_.
              1. Else,
                1. Let _elementKey_ be ! ToString(_indexNumber_).
                1. Let _elementValue_ be ? Get(_array_, _elementKey_).
                1. If _kind_ is ~value~, then
                  1. Let _result_ be _elementValue_.
                1. Else,
                  1. Assert: _kind_ is ~key+value~.
                  1. Let _result_ be CreateArrayFromList(« _indexNumber_, _elementValue_ »).
              1. Perform ? GeneratorYield(CreateIteratorResultObject(_result_, *false*)).
              1. Set _index_ to _index_ + 1.
          1. Return CreateIteratorFromClosure(_closure_, *"%ArrayIteratorPrototype%"*, %ArrayIteratorPrototype%).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%arrayiteratorprototype%-object">
        <h1>The %ArrayIteratorPrototype% Object</h1>
        <p>The <dfn>%ArrayIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all Array Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%arrayiteratorprototype%.next">
          <h1>%ArrayIteratorPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? GeneratorResume(*this* value, ~empty~, *"%ArrayIteratorPrototype%"*).
          </emu-alg>
        </emu-clause>

        <emu-clause oldids="sec-%arrayiteratorprototype%-@@tostringtag" id="sec-%arrayiteratorprototype%-%symbol.tostringtag%">
          <h1>%ArrayIteratorPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"Array Iterator"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-typedarray-objects">
    <h1>TypedArray Objects</h1>
    <p>A _TypedArray_ presents an array-like view of an underlying binary data buffer (<emu-xref href="#sec-arraybuffer-objects"></emu-xref>). A <dfn variants="TypedArray element types">TypedArray element type</dfn> is the underlying binary scalar data type that all elements of a _TypedArray_ instance have. There is a distinct _TypedArray_ constructor, listed in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>, for each of the supported element types. Each constructor in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> has a corresponding distinct prototype object.</p>
    <emu-table id="table-the-typedarray-constructors" caption="The TypedArray Constructors" oldids="table-49">
      <table>
        <thead>
          <tr>
            <th>
              Constructor Name and Intrinsic
            </th>
            <th>
              Element Type
            </th>
            <th>
              Element Size
            </th>
            <th>
              Conversion Operation
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            Int8Array<br>
            <dfn>%Int8Array%</dfn>
          </td>
          <td>
            ~int8~
          </td>
          <td>
            1
          </td>
          <td>
            ToInt8
          </td>
          <td>
            8-bit two's complement signed integer
          </td>
        </tr>
        <tr>
          <td>
            Uint8Array<br>
            <dfn>%Uint8Array%</dfn>
          </td>
          <td>
            ~uint8~
          </td>
          <td>
            1
          </td>
          <td>
            ToUint8
          </td>
          <td>
            8-bit unsigned integer
          </td>
        </tr>
        <tr>
          <td>
            Uint8ClampedArray<br>
            <dfn>%Uint8ClampedArray%</dfn>
          </td>
          <td>
            ~uint8clamped~
          </td>
          <td>
            1
          </td>
          <td>
            ToUint8Clamp
          </td>
          <td>
            8-bit unsigned integer (clamped conversion)
          </td>
        </tr>
        <tr>
          <td>
            Int16Array<br>
            <dfn>%Int16Array%</dfn>
          </td>
          <td>
            ~int16~
          </td>
          <td>
            2
          </td>
          <td>
            ToInt16
          </td>
          <td>
            16-bit two's complement signed integer
          </td>
        </tr>
        <tr>
          <td>
            Uint16Array<br>
            <dfn>%Uint16Array%</dfn>
          </td>
          <td>
            ~uint16~
          </td>
          <td>
            2
          </td>
          <td>
            ToUint16
          </td>
          <td>
            16-bit unsigned integer
          </td>
        </tr>
        <tr>
          <td>
            Int32Array<br>
            <dfn>%Int32Array%</dfn>
          </td>
          <td>
            ~int32~
          </td>
          <td>
            4
          </td>
          <td>
            ToInt32
          </td>
          <td>
            32-bit two's complement signed integer
          </td>
        </tr>
        <tr>
          <td>
            Uint32Array<br>
            <dfn>%Uint32Array%</dfn>
          </td>
          <td>
            ~uint32~
          </td>
          <td>
            4
          </td>
          <td>
            ToUint32
          </td>
          <td>
            32-bit unsigned integer
          </td>
        </tr>
        <tr>
          <td>
            BigInt64Array<br>
            <dfn>%BigInt64Array%</dfn>
          </td>
          <td>
            ~bigint64~
          </td>
          <td>
            8
          </td>
          <td>
            ToBigInt64
          </td>
          <td>
            64-bit two's complement signed integer
          </td>
        </tr>
        <tr>
          <td>
            BigUint64Array<br>
            <dfn>%BigUint64Array%</dfn>
          </td>
          <td>
            ~biguint64~
          </td>
          <td>
            8
          </td>
          <td>
            ToBigUint64
          </td>
          <td>
            64-bit unsigned integer
          </td>
        </tr>
        <tr>
          <td>
            Float32Array<br>
            <dfn>%Float32Array%</dfn>
          </td>
          <td>
            ~float32~
          </td>
          <td>
            4
          </td>
          <td>
          </td>
          <td>
            32-bit IEEE floating point
          </td>
        </tr>
        <tr>
          <td>
            Float64Array<br>
            <dfn>%Float64Array%</dfn>
          </td>
          <td>
            ~float64~
          </td>
          <td>
            8
          </td>
          <td>
          </td>
          <td>
            64-bit IEEE floating point
          </td>
        </tr>
      </table>
    </emu-table>
    <p>In the definitions below, references to _TypedArray_ should be replaced with the appropriate constructor name from the above table.</p>

    <emu-clause id="sec-%typedarray%-intrinsic-object">
      <h1>The %TypedArray% Intrinsic Object</h1>
      <p>The <dfn>%TypedArray%</dfn> intrinsic object:</p>
      <ul>
        <li>is a constructor function object that all of the _TypedArray_ constructor objects inherit from.</li>
        <li>along with its corresponding prototype object, provides common properties that are inherited by all _TypedArray_ constructors and their instances.</li>
        <li>does not have a global name or appear as a property of the global object.</li>
        <li>acts as the abstract superclass of the various _TypedArray_ constructors.</li>
        <li>will throw an error when invoked, because it is an abstract class constructor. The _TypedArray_ constructors do not perform a `super` call to it.</li>
      </ul>

      <emu-clause id="sec-%typedarray%">
        <h1>%TypedArray% ( )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Throw a *TypeError* exception.
        </emu-alg>
        <p>The *"length"* property of this function is *+0*<sub>𝔽</sub>.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-%typedarray%-intrinsic-object">
      <h1>Properties of the %TypedArray% Intrinsic Object</h1>
      <p>The %TypedArray% intrinsic object:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has a *"name"* property whose value is *"TypedArray"*.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-%typedarray%.from">
        <h1>%TypedArray%.from ( _source_ [ , _mapper_ [ , _thisArg_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _C_ be the *this* value.
          1. If IsConstructor(_C_) is *false*, throw a *TypeError* exception.
          1. If _mapper_ is *undefined*, then
            1. Let _mapping_ be *false*.
          1. Else,
            1. If IsCallable(_mapper_) is *false*, throw a *TypeError* exception.
            1. Let _mapping_ be *true*.
          1. Let _usingIterator_ be ? GetMethod(_source_, %Symbol.iterator%).
          1. If _usingIterator_ is not *undefined*, then
            1. Let _values_ be ? IteratorToList(? GetIteratorFromMethod(_source_, _usingIterator_)).
            1. Let _len_ be the number of elements in _values_.
            1. Let _targetObj_ be ? TypedArrayCreateFromConstructor(_C_, « 𝔽(_len_) »).
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _len_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _kValue_ be the first element of _values_.
              1. Remove the first element from _values_.
              1. If _mapping_ is *true*, then
                1. Let _mappedValue_ be ? Call(_mapper_, _thisArg_, « _kValue_, 𝔽(_k_) »).
              1. Else,
                1. Let _mappedValue_ be _kValue_.
              1. Perform ? Set(_targetObj_, _Pk_, _mappedValue_, *true*).
              1. Set _k_ to _k_ + 1.
            1. Assert: _values_ is now an empty List.
            1. Return _targetObj_.
          1. NOTE: _source_ is not an iterable object, so assume it is already an array-like object.
          1. Let _arrayLike_ be ! ToObject(_source_).
          1. Let _len_ be ? LengthOfArrayLike(_arrayLike_).
          1. Let _targetObj_ be ? TypedArrayCreateFromConstructor(_C_, « 𝔽(_len_) »).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ? Get(_arrayLike_, _Pk_).
            1. If _mapping_ is *true*, then
              1. Let _mappedValue_ be ? Call(_mapper_, _thisArg_, « _kValue_, 𝔽(_k_) »).
            1. Else,
              1. Let _mappedValue_ be _kValue_.
            1. Perform ? Set(_targetObj_, _Pk_, _mappedValue_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _targetObj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.of">
        <h1>%TypedArray%.of ( ..._items_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _len_ be the number of elements in _items_.
          1. Let _C_ be the *this* value.
          1. If IsConstructor(_C_) is *false*, throw a *TypeError* exception.
          1. Let _newObj_ be ? TypedArrayCreateFromConstructor(_C_, « 𝔽(_len_) »).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _kValue_ be _items_[_k_].
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Perform ? Set(_newObj_, _Pk_, _kValue_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _newObj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype">
        <h1>%TypedArray%.prototype</h1>
        <p>The initial value of %TypedArray%`.prototype` is the %TypedArray% prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-%typedarray%-@@species" id="sec-get-%typedarray%-%symbol.species%">
        <h1>get %TypedArray% [ %Symbol.species% ]</h1>
        <p>%TypedArray%`[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p>%TypedArray.prototype% methods normally use their *this* value's constructor to create a derived object. However, a subclass constructor may over-ride that default behaviour by redefining its %Symbol.species% property.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-%typedarrayprototype%-object">
      <h1>Properties of the %TypedArray% Prototype Object</h1>
      <p>The <dfn>%TypedArray% prototype object</dfn>:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is <dfn>%TypedArray.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[ViewedArrayBuffer]] or any other of the internal slots that are specific to _TypedArray_ instance objects.</li>
      </ul>

      <emu-clause id="sec-%typedarray%.prototype.at">
        <h1>%TypedArray%.prototype.at ( _index_ )</h1>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _relativeIndex_ be ? ToIntegerOrInfinity(_index_).
          1. If _relativeIndex_ ≥ 0, then
            1. Let _k_ be _relativeIndex_.
          1. Else,
            1. Let _k_ be _len_ + _relativeIndex_.
          1. If _k_ &lt; 0 or _k_ ≥ _len_, return *undefined*.
          1. Return ! Get(_O_, ! ToString(𝔽(_k_))).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-%typedarray%.prototype.buffer">
        <h1>get %TypedArray%.prototype.buffer</h1>
        <p>%TypedArray%`.prototype.buffer` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _buffer_ be _O_.[[ViewedArrayBuffer]].
          1. Return _buffer_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-%typedarray%.prototype.bytelength">
        <h1>get %TypedArray%.prototype.byteLength</h1>
        <p>%TypedArray%`.prototype.byteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. Let _size_ be TypedArrayByteLength(_taRecord_).
          1. Return 𝔽(_size_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-%typedarray%.prototype.byteoffset">
        <h1>get %TypedArray%.prototype.byteOffset</h1>
        <p>%TypedArray%`.prototype.byteOffset` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, return *+0*<sub>𝔽</sub>.
          1. Let _offset_ be _O_.[[ByteOffset]].
          1. Return 𝔽(_offset_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.constructor">
        <h1>%TypedArray%.prototype.constructor</h1>
        <p>The initial value of %TypedArray%`.prototype.constructor` is %TypedArray%.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.copywithin">
        <h1>%TypedArray%.prototype.copyWithin ( _target_, _start_ [ , _end_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.copyWithin` as defined in <emu-xref href="#sec-array.prototype.copywithin"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _relativeTarget_ be ? ToIntegerOrInfinity(_target_).
          1. If _relativeTarget_ = -∞, let _targetIndex_ be 0.
          1. Else if _relativeTarget_ &lt; 0, let _targetIndex_ be max(_len_ + _relativeTarget_, 0).
          1. Else, let _targetIndex_ be min(_relativeTarget_, _len_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _startIndex_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _startIndex_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _startIndex_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _endIndex_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _endIndex_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _endIndex_ be min(_relativeEnd_, _len_).
          1. Let _count_ be min(_endIndex_ - _startIndex_, _len_ - _targetIndex_).
          1. If _count_ > 0, then
            1. NOTE: The copying must be performed in a manner that preserves the bit-level encoding of the source data.
            1. Let _buffer_ be _O_.[[ViewedArrayBuffer]].
            1. Set _taRecord_ to MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
            1. Set _len_ to TypedArrayLength(_taRecord_).
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _byteOffset_ be _O_.[[ByteOffset]].
            1. Let _bufferByteLimit_ be (_len_ × _elementSize_) + _byteOffset_.
            1. Let _toByteIndex_ be (_targetIndex_ × _elementSize_) + _byteOffset_.
            1. Let _fromByteIndex_ be (_startIndex_ × _elementSize_) + _byteOffset_.
            1. Let _countBytes_ be _count_ × _elementSize_.
            1. If _fromByteIndex_ &lt; _toByteIndex_ and _toByteIndex_ &lt; _fromByteIndex_ + _countBytes_, then
              1. Let _direction_ be -1.
              1. Set _fromByteIndex_ to _fromByteIndex_ + _countBytes_ - 1.
              1. Set _toByteIndex_ to _toByteIndex_ + _countBytes_ - 1.
            1. Else,
              1. Let _direction_ be 1.
            1. Repeat, while _countBytes_ > 0,
              1. If _fromByteIndex_ &lt; _bufferByteLimit_ and _toByteIndex_ &lt; _bufferByteLimit_, then
                1. Let _value_ be GetValueFromBuffer(_buffer_, _fromByteIndex_, ~uint8~, *true*, ~unordered~).
                1. Perform SetValueInBuffer(_buffer_, _toByteIndex_, ~uint8~, _value_, *true*, ~unordered~).
                1. Set _fromByteIndex_ to _fromByteIndex_ + _direction_.
                1. Set _toByteIndex_ to _toByteIndex_ + _direction_.
                1. Set _countBytes_ to _countBytes_ - 1.
              1. Else,
                1. Set _countBytes_ to 0.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.entries">
        <h1>%TypedArray%.prototype.entries ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Return CreateArrayIterator(_O_, ~key+value~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.every">
        <h1>%TypedArray%.prototype.every ( _callback_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.every` as defined in <emu-xref href="#sec-array.prototype.every"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Let _testResult_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
            1. If _testResult_ is *false*, return *false*.
            1. Set _k_ to _k_ + 1.
          1. Return *true*.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.fill">
        <h1>%TypedArray%.prototype.fill ( _value_ [ , _start_ [ , _end_ ] ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.fill` as defined in <emu-xref href="#sec-array.prototype.fill"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If _O_.[[ContentType]] is ~bigint~, set _value_ to ? ToBigInt(_value_).
          1. Otherwise, set _value_ to ? ToNumber(_value_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _startIndex_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _startIndex_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _startIndex_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _endIndex_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _endIndex_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _endIndex_ be min(_relativeEnd_, _len_).
          1. Set _taRecord_ to MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
          1. Set _len_ to TypedArrayLength(_taRecord_).
          1. Set _endIndex_ to min(_endIndex_, _len_).
          1. Let _k_ be _startIndex_.
          1. Repeat, while _k_ &lt; _endIndex_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Perform ! Set(_O_, _Pk_, _value_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.filter">
        <h1>%TypedArray%.prototype.filter ( _callback_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.filter` as defined in <emu-xref href="#sec-array.prototype.filter"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _kept_ be a new empty List.
          1. Let _captured_ be 0.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Let _selected_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
            1. If _selected_ is *true*, then
              1. Append _kValue_ to _kept_.
              1. Set _captured_ to _captured_ + 1.
            1. Set _k_ to _k_ + 1.
          1. Let _A_ be ? TypedArraySpeciesCreate(_O_, « 𝔽(_captured_) »).
          1. Let _n_ be 0.
          1. For each element _e_ of _kept_, do
            1. Perform ! Set(_A_, ! ToString(𝔽(_n_)), _e_, *true*).
            1. Set _n_ to _n_ + 1.
          1. Return _A_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.find">
        <h1>%TypedArray%.prototype.find ( _predicate_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.find` as defined in <emu-xref href="#sec-array.prototype.find"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~ascending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Value]].
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.findindex">
        <h1>%TypedArray%.prototype.findIndex ( _predicate_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.findIndex` as defined in <emu-xref href="#sec-array.prototype.findindex"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~ascending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Index]].
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.findlast">
        <h1>%TypedArray%.prototype.findLast ( _predicate_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.findLast` as defined in <emu-xref href="#sec-array.prototype.findlast"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~descending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Value]].
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.findlastindex">
        <h1>%TypedArray%.prototype.findLastIndex ( _predicate_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.findLastIndex` as defined in <emu-xref href="#sec-array.prototype.findlastindex"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _findRec_ be ? FindViaPredicate(_O_, _len_, ~descending~, _predicate_, _thisArg_).
          1. Return _findRec_.[[Index]].
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.foreach">
        <h1>%TypedArray%.prototype.forEach ( _callback_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.forEach` as defined in <emu-xref href="#sec-array.prototype.foreach"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Perform ? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ + 1.
          1. Return *undefined*.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.includes">
        <h1>%TypedArray%.prototype.includes ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.includes` as defined in <emu-xref href="#sec-array.prototype.includes"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If _len_ = 0, return *false*.
          1. Let _n_ be ? ToIntegerOrInfinity(_fromIndex_).
          1. Assert: If _fromIndex_ is *undefined*, then _n_ is 0.
          1. If _n_ = +∞, return *false*.
          1. Else if _n_ = -∞, set _n_ to 0.
          1. If _n_ ≥ 0, then
            1. Let _k_ be _n_.
          1. Else,
            1. Let _k_ be _len_ + _n_.
            1. If _k_ &lt; 0, set _k_ to 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _elementK_ be ! Get(_O_, ! ToString(𝔽(_k_))).
            1. If SameValueZero(_searchElement_, _elementK_) is *true*, return *true*.
            1. Set _k_ to _k_ + 1.
          1. Return *false*.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.indexof">
        <h1>%TypedArray%.prototype.indexOf ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.indexOf` as defined in <emu-xref href="#sec-array.prototype.indexof"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If _len_ = 0, return *-1*<sub>𝔽</sub>.
          1. Let _n_ be ? ToIntegerOrInfinity(_fromIndex_).
          1. Assert: If _fromIndex_ is *undefined*, then _n_ is 0.
          1. If _n_ = +∞, return *-1*<sub>𝔽</sub>.
          1. Else if _n_ = -∞, set _n_ to 0.
          1. If _n_ ≥ 0, then
            1. Let _k_ be _n_.
          1. Else,
            1. Let _k_ be _len_ + _n_.
            1. If _k_ &lt; 0, set _k_ to 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _kPresent_ be ! HasProperty(_O_, ! ToString(𝔽(_k_))).
            1. If _kPresent_ is *true*, then
              1. Let _elementK_ be ! Get(_O_, ! ToString(𝔽(_k_))).
              1. If IsStrictlyEqual(_searchElement_, _elementK_) is *true*, return 𝔽(_k_).
            1. Set _k_ to _k_ + 1.
          1. Return *-1*<sub>𝔽</sub>.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.join">
        <h1>%TypedArray%.prototype.join ( _separator_ )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.join` as defined in <emu-xref href="#sec-array.prototype.join"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If _separator_ is *undefined*, let _sep_ be *","*.
          1. Else, let _sep_ be ? ToString(_separator_).
          1. Let _R_ be the empty String.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. If _k_ > 0, set _R_ to the string-concatenation of _R_ and _sep_.
            1. Let _element_ be ! Get(_O_, ! ToString(𝔽(_k_))).
            1. If _element_ is not *undefined*, then
              1. Let _S_ be ! ToString(_element_).
              1. Set _R_ to the string-concatenation of _R_ and _S_.
            1. Set _k_ to _k_ + 1.
          1. Return _R_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.keys">
        <h1>%TypedArray%.prototype.keys ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Return CreateArrayIterator(_O_, ~key~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.lastindexof">
        <h1>%TypedArray%.prototype.lastIndexOf ( _searchElement_ [ , _fromIndex_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.lastIndexOf` as defined in <emu-xref href="#sec-array.prototype.lastindexof"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If _len_ = 0, return *-1*<sub>𝔽</sub>.
          1. If _fromIndex_ is present, let _n_ be ? ToIntegerOrInfinity(_fromIndex_); else let _n_ be _len_ - 1.
          1. If _n_ = -∞, return *-1*<sub>𝔽</sub>.
          1. If _n_ ≥ 0, then
            1. Let _k_ be min(_n_, _len_ - 1).
          1. Else,
            1. Let _k_ be _len_ + _n_.
          1. Repeat, while _k_ ≥ 0,
            1. Let _kPresent_ be ! HasProperty(_O_, ! ToString(𝔽(_k_))).
            1. If _kPresent_ is *true*, then
              1. Let _elementK_ be ! Get(_O_, ! ToString(𝔽(_k_))).
              1. If IsStrictlyEqual(_searchElement_, _elementK_) is *true*, return 𝔽(_k_).
            1. Set _k_ to _k_ - 1.
          1. Return *-1*<sub>𝔽</sub>.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-get-%typedarray%.prototype.length">
        <h1>get %TypedArray%.prototype.length</h1>
        <p>%TypedArray%`.prototype.length` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has [[ViewedArrayBuffer]] and [[ArrayLength]] internal slots.
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, return *+0*<sub>𝔽</sub>.
          1. Let _length_ be TypedArrayLength(_taRecord_).
          1. Return 𝔽(_length_).
        </emu-alg>
        <p>This function is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.map">
        <h1>%TypedArray%.prototype.map ( _callback_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.map` as defined in <emu-xref href="#sec-array.prototype.map"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _A_ be ? TypedArraySpeciesCreate(_O_, « 𝔽(_len_) »).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Let _mappedValue_ be ? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »).
            1. Perform ? Set(_A_, _Pk_, _mappedValue_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.reduce">
        <h1>%TypedArray%.prototype.reduce ( _callback_ [ , _initialValue_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.reduce` as defined in <emu-xref href="#sec-array.prototype.reduce"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. If _len_ = 0 and _initialValue_ is not present, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Let _accumulator_ be *undefined*.
          1. If _initialValue_ is present, then
            1. Set _accumulator_ to _initialValue_.
          1. Else,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Set _accumulator_ to ! Get(_O_, _Pk_).
            1. Set _k_ to _k_ + 1.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Set _accumulator_ to ? Call(_callback_, *undefined*, « _accumulator_, _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ + 1.
          1. Return _accumulator_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.reduceright">
        <h1>%TypedArray%.prototype.reduceRight ( _callback_ [ , _initialValue_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.reduceRight` as defined in <emu-xref href="#sec-array.prototype.reduceright"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. If _len_ = 0 and _initialValue_ is not present, throw a *TypeError* exception.
          1. Let _k_ be _len_ - 1.
          1. Let _accumulator_ be *undefined*.
          1. If _initialValue_ is present, then
            1. Set _accumulator_ to _initialValue_.
          1. Else,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Set _accumulator_ to ! Get(_O_, _Pk_).
            1. Set _k_ to _k_ - 1.
          1. Repeat, while _k_ ≥ 0,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Set _accumulator_ to ? Call(_callback_, *undefined*, « _accumulator_, _kValue_, 𝔽(_k_), _O_ »).
            1. Set _k_ to _k_ - 1.
          1. Return _accumulator_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.reverse">
        <h1>%TypedArray%.prototype.reverse ( )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.reverse` as defined in <emu-xref href="#sec-array.prototype.reverse"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _middle_ be floor(_len_ / 2).
          1. Let _lower_ be 0.
          1. Repeat, while _lower_ ≠ _middle_,
            1. Let _upper_ be _len_ - _lower_ - 1.
            1. Let _upperP_ be ! ToString(𝔽(_upper_)).
            1. Let _lowerP_ be ! ToString(𝔽(_lower_)).
            1. Let _lowerValue_ be ! Get(_O_, _lowerP_).
            1. Let _upperValue_ be ! Get(_O_, _upperP_).
            1. Perform ! Set(_O_, _lowerP_, _upperValue_, *true*).
            1. Perform ! Set(_O_, _upperP_, _lowerValue_, *true*).
            1. Set _lower_ to _lower_ + 1.
          1. Return _O_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.set" oldids="sec-%typedarray%.prototype.set-overloaded-offset">
        <h1>%TypedArray%.prototype.set ( _source_ [ , _offset_ ] )</h1>
        <p>This method sets multiple values in this _TypedArray_, reading the values from _source_. The details differ based upon the type of _source_. The optional _offset_ value indicates the first element index in this _TypedArray_ where values are written. If omitted, it is assumed to be 0.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _target_ be the *this* value.
          1. Perform ? RequireInternalSlot(_target_, [[TypedArrayName]]).
          1. Assert: _target_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _targetOffset_ be ? ToIntegerOrInfinity(_offset_).
          1. If _targetOffset_ &lt; 0, throw a *RangeError* exception.
          1. If _source_ is an Object that has a [[TypedArrayName]] internal slot, then
            1. Perform ? SetTypedArrayFromTypedArray(_target_, _targetOffset_, _source_).
          1. Else,
            1. Perform ? SetTypedArrayFromArrayLike(_target_, _targetOffset_, _source_).
          1. Return *undefined*.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>

        <emu-clause id="sec-settypedarrayfromtypedarray" type="abstract operation" oldids="sec-%typedarray%.prototype.set-typedarray-offset">
          <h1>
            SetTypedArrayFromTypedArray (
              _target_: a TypedArray,
              _targetOffset_: a non-negative integer or +&infin;,
              _source_: a TypedArray,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It sets multiple values in _target_, starting at index _targetOffset_, reading the values from _source_.</dd>
          </dl>
          <emu-alg>
            1. Let _targetBuffer_ be _target_.[[ViewedArrayBuffer]].
            1. Let _targetRecord_ be MakeTypedArrayWithBufferWitnessRecord(_target_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_targetRecord_) is *true*, throw a *TypeError* exception.
            1. Let _targetLength_ be TypedArrayLength(_targetRecord_).
            1. Let _srcBuffer_ be _source_.[[ViewedArrayBuffer]].
            1. Let _srcRecord_ be MakeTypedArrayWithBufferWitnessRecord(_source_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_srcRecord_) is *true*, throw a *TypeError* exception.
            1. Let _srcLength_ be TypedArrayLength(_srcRecord_).
            1. Let _targetType_ be TypedArrayElementType(_target_).
            1. Let _targetElementSize_ be TypedArrayElementSize(_target_).
            1. Let _targetByteOffset_ be _target_.[[ByteOffset]].
            1. Let _srcType_ be TypedArrayElementType(_source_).
            1. Let _srcElementSize_ be TypedArrayElementSize(_source_).
            1. Let _srcByteOffset_ be _source_.[[ByteOffset]].
            1. If _targetOffset_ = +∞, throw a *RangeError* exception.
            1. If _srcLength_ + _targetOffset_ > _targetLength_, throw a *RangeError* exception.
            1. If _target_.[[ContentType]] is not _source_.[[ContentType]], throw a *TypeError* exception.
            1. If IsSharedArrayBuffer(_srcBuffer_) is *true*, IsSharedArrayBuffer(_targetBuffer_) is *true*, and _srcBuffer_.[[ArrayBufferData]] is _targetBuffer_.[[ArrayBufferData]], let _sameSharedArrayBuffer_ be *true*; otherwise, let _sameSharedArrayBuffer_ be *false*.
            1. If SameValue(_srcBuffer_, _targetBuffer_) is *true* or _sameSharedArrayBuffer_ is *true*, then
              1. Let _srcByteLength_ be TypedArrayByteLength(_srcRecord_).
              1. Set _srcBuffer_ to ? CloneArrayBuffer(_srcBuffer_, _srcByteOffset_, _srcByteLength_).
              1. Let _srcByteIndex_ be 0.
            1. Else,
              1. Let _srcByteIndex_ be _srcByteOffset_.
            1. Let _targetByteIndex_ be (_targetOffset_ × _targetElementSize_) + _targetByteOffset_.
            1. Let _limit_ be _targetByteIndex_ + (_targetElementSize_ × _srcLength_).
            1. If _srcType_ is _targetType_, then
              1. NOTE: The transfer must be performed in a manner that preserves the bit-level encoding of the source data.
              1. Repeat, while _targetByteIndex_ &lt; _limit_,
                1. Let _value_ be GetValueFromBuffer(_srcBuffer_, _srcByteIndex_, ~uint8~, *true*, ~unordered~).
                1. Perform SetValueInBuffer(_targetBuffer_, _targetByteIndex_, ~uint8~, _value_, *true*, ~unordered~).
                1. Set _srcByteIndex_ to _srcByteIndex_ + 1.
                1. Set _targetByteIndex_ to _targetByteIndex_ + 1.
            1. Else,
              1. Repeat, while _targetByteIndex_ &lt; _limit_,
                1. Let _value_ be GetValueFromBuffer(_srcBuffer_, _srcByteIndex_, _srcType_, *true*, ~unordered~).
                1. Perform SetValueInBuffer(_targetBuffer_, _targetByteIndex_, _targetType_, _value_, *true*, ~unordered~).
                1. Set _srcByteIndex_ to _srcByteIndex_ + _srcElementSize_.
                1. Set _targetByteIndex_ to _targetByteIndex_ + _targetElementSize_.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-settypedarrayfromarraylike" type="abstract operation" oldids="sec-%typedarray%.prototype.set-array-offset">
          <h1>
            SetTypedArrayFromArrayLike (
              _target_: a TypedArray,
              _targetOffset_: a non-negative integer or +&infin;,
              _source_: an ECMAScript language value, but not a TypedArray,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It sets multiple values in _target_, starting at index _targetOffset_, reading the values from _source_.</dd>
          </dl>
          <emu-alg>
            1. Let _targetRecord_ be MakeTypedArrayWithBufferWitnessRecord(_target_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_targetRecord_) is *true*, throw a *TypeError* exception.
            1. Let _targetLength_ be TypedArrayLength(_targetRecord_).
            1. Let _src_ be ? ToObject(_source_).
            1. Let _srcLength_ be ? LengthOfArrayLike(_src_).
            1. If _targetOffset_ = +∞, throw a *RangeError* exception.
            1. If _srcLength_ + _targetOffset_ > _targetLength_, throw a *RangeError* exception.
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _srcLength_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _value_ be ? Get(_src_, _Pk_).
              1. Let _targetIndex_ be 𝔽(_targetOffset_ + _k_).
              1. Perform ? TypedArraySetElement(_target_, _targetIndex_, _value_).
              1. Set _k_ to _k_ + 1.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.slice">
        <h1>%TypedArray%.prototype.slice ( _start_, _end_ )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.slice` as defined in <emu-xref href="#sec-array.prototype.slice"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _srcArrayLength_ be TypedArrayLength(_taRecord_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _startIndex_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _startIndex_ be max(_srcArrayLength_ + _relativeStart_, 0).
          1. Else, let _startIndex_ be min(_relativeStart_, _srcArrayLength_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _srcArrayLength_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _endIndex_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _endIndex_ be max(_srcArrayLength_ + _relativeEnd_, 0).
          1. Else, let _endIndex_ be min(_relativeEnd_, _srcArrayLength_).
          1. Let _countBytes_ be max(_endIndex_ - _startIndex_, 0).
          1. Let _A_ be ? TypedArraySpeciesCreate(_O_, « 𝔽(_countBytes_) »).
          1. If _countBytes_ > 0, then
            1. Set _taRecord_ to MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
            1. Set _endIndex_ to min(_endIndex_, TypedArrayLength(_taRecord_)).
            1. Set _countBytes_ to max(_endIndex_ - _startIndex_, 0).
            1. Let _srcType_ be TypedArrayElementType(_O_).
            1. Let _targetType_ be TypedArrayElementType(_A_).
            1. If _srcType_ is _targetType_, then
              1. NOTE: The transfer must be performed in a manner that preserves the bit-level encoding of the source data.
              1. Let _srcBuffer_ be _O_.[[ViewedArrayBuffer]].
              1. Let _targetBuffer_ be _A_.[[ViewedArrayBuffer]].
              1. Let _elementSize_ be TypedArrayElementSize(_O_).
              1. Let _srcByteOffset_ be _O_.[[ByteOffset]].
              1. Let _srcByteIndex_ be (_startIndex_ × _elementSize_) + _srcByteOffset_.
              1. Let _targetByteIndex_ be _A_.[[ByteOffset]].
              1. Let _endByteIndex_ be _targetByteIndex_ + (_countBytes_ × _elementSize_).
              1. Repeat, while _targetByteIndex_ &lt; _endByteIndex_,
                1. Let _value_ be GetValueFromBuffer(_srcBuffer_, _srcByteIndex_, ~uint8~, *true*, ~unordered~).
                1. Perform SetValueInBuffer(_targetBuffer_, _targetByteIndex_, ~uint8~, _value_, *true*, ~unordered~).
                1. Set _srcByteIndex_ to _srcByteIndex_ + 1.
                1. Set _targetByteIndex_ to _targetByteIndex_ + 1.
            1. Else,
              1. Let _n_ be 0.
              1. Let _k_ be _startIndex_.
              1. Repeat, while _k_ &lt; _endIndex_,
                1. Let _Pk_ be ! ToString(𝔽(_k_)).
                1. Let _kValue_ be ! Get(_O_, _Pk_).
                1. Perform ! Set(_A_, ! ToString(𝔽(_n_)), _kValue_, *true*).
                1. Set _k_ to _k_ + 1.
                1. Set _n_ to _n_ + 1.
          1. Return _A_.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.some">
        <h1>%TypedArray%.prototype.some ( _callback_ [ , _thisArg_ ] )</h1>
        <p>The interpretation and use of the arguments of this method are the same as for `Array.prototype.some` as defined in <emu-xref href="#sec-array.prototype.some"></emu-xref>.</p>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _kValue_ be ! Get(_O_, _Pk_).
            1. Let _testResult_ be ToBoolean(? Call(_callback_, _thisArg_, « _kValue_, 𝔽(_k_), _O_ »)).
            1. If _testResult_ is *true*, return *true*.
            1. Set _k_ to _k_ + 1.
          1. Return *false*.
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.sort" oldids="sec-typedarraysortcompare">
        <h1>%TypedArray%.prototype.sort ( _comparator_ )</h1>
        <p>This is a distinct method that, except as described below, implements the same requirements as those of `Array.prototype.sort` as defined in <emu-xref href="#sec-array.prototype.sort"></emu-xref>. The implementation of this method may be optimized with the knowledge that the *this* value is an object that has a fixed length and whose integer-indexed properties are not sparse.</p>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. If _comparator_ is not *undefined* and IsCallable(_comparator_) is *false*, throw a *TypeError* exception.
          1. Let _obj_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_obj_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. NOTE: The following closure performs a numeric comparison rather than the string comparison used in <emu-xref href="#sec-array.prototype.sort"></emu-xref>.
          1. Let _SortCompare_ be a new Abstract Closure with parameters (_x_, _y_) that captures _comparator_ and performs the following steps when called:
            1. Return ? CompareTypedArrayElements(_x_, _y_, _comparator_).
          1. Let _sortedList_ be ? SortIndexedProperties(_obj_, _len_, _SortCompare_, ~read-through-holes~).
          1. Let _j_ be 0.
          1. Repeat, while _j_ &lt; _len_,
            1. Perform ! Set(_obj_, ! ToString(𝔽(_j_)), _sortedList_[_j_], *true*).
            1. Set _j_ to _j_ + 1.
          1. Return _obj_.
        </emu-alg>
        <emu-note>
          <p>Because *NaN* always compares greater than any other value (see CompareTypedArrayElements), *NaN* property values always sort to the end of the result when _comparator_ is not provided.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.subarray">
        <h1>%TypedArray%.prototype.subarray ( _start_, _end_ )</h1>
        <p>This method returns a new _TypedArray_ whose element type is the element type of this _TypedArray_ and whose ArrayBuffer is the ArrayBuffer of this _TypedArray_, referencing the elements in the interval from _start_ (inclusive) to _end_ (exclusive). If either _start_ or _end_ is negative, it refers to an index from the end of the array, as opposed to from the beginning.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _buffer_ be _O_.[[ViewedArrayBuffer]].
          1. Let _srcRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsTypedArrayOutOfBounds(_srcRecord_) is *true*, then
            1. Let _srcLength_ be 0.
          1. Else,
            1. Let _srcLength_ be TypedArrayLength(_srcRecord_).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _startIndex_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _startIndex_ be max(_srcLength_ + _relativeStart_, 0).
          1. Else, let _startIndex_ be min(_relativeStart_, _srcLength_).
          1. Let _elementSize_ be TypedArrayElementSize(_O_).
          1. Let _srcByteOffset_ be _O_.[[ByteOffset]].
          1. Let _beginByteOffset_ be _srcByteOffset_ + (_startIndex_ × _elementSize_).
          1. If _O_.[[ArrayLength]] is ~auto~ and _end_ is *undefined*, then
            1. Let _argumentsList_ be « _buffer_, 𝔽(_beginByteOffset_) ».
          1. Else,
            1. If _end_ is *undefined*, let _relativeEnd_ be _srcLength_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
            1. If _relativeEnd_ = -∞, let _endIndex_ be 0.
            1. Else if _relativeEnd_ &lt; 0, let _endIndex_ be max(_srcLength_ + _relativeEnd_, 0).
            1. Else, let _endIndex_ be min(_relativeEnd_, _srcLength_).
            1. Let _newLength_ be max(_endIndex_ - _startIndex_, 0).
            1. Let _argumentsList_ be « _buffer_, 𝔽(_beginByteOffset_), 𝔽(_newLength_) ».
          1. Return ? TypedArraySpeciesCreate(_O_, _argumentsList_).
        </emu-alg>
        <p>This method is not generic. The *this* value must be an object with a [[TypedArrayName]] internal slot.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.tolocalestring">
        <h1>%TypedArray%.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>This is a distinct method that implements the same algorithm as `Array.prototype.toLocaleString` as defined in <emu-xref href="#sec-array.prototype.tolocalestring"></emu-xref> except that TypedArrayLength is called in place of performing a [[Get]] of *"length"*. The implementation of the algorithm may be optimized with the knowledge that the *this* value has a fixed length when the underlying buffer is not resizable and whose integer-indexed properties are not sparse. However, such optimization must not introduce any observable changes in the specified behaviour of the algorithm.</p>
        <p>This method is not generic. ValidateTypedArray is called with the *this* value and ~seq-cst~ as arguments prior to evaluating the algorithm. If its result is an abrupt completion that exception is thrown instead of evaluating the algorithm.</p>
        <emu-note>
          <p>If the ECMAScript implementation includes the ECMA-402 Internationalization API this method is based upon the algorithm for `Array.prototype.toLocaleString` that is in the ECMA-402 specification.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.toreversed">
        <h1>%TypedArray%.prototype.toReversed ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _length_ be TypedArrayLength(_taRecord_).
          1. Let _A_ be ? TypedArrayCreateSameType(_O_, « 𝔽(_length_) »).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _length_,
            1. Let _from_ be ! ToString(𝔽(_length_ - _k_ - 1)).
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. Let _fromValue_ be ! Get(_O_, _from_).
            1. Perform ! Set(_A_, _Pk_, _fromValue_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.tosorted">
        <h1>%TypedArray%.prototype.toSorted ( _comparator_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. If _comparator_ is not *undefined* and IsCallable(_comparator_) is *false*, throw a *TypeError* exception.
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _A_ be ? TypedArrayCreateSameType(_O_, « 𝔽(_len_) »).
          1. NOTE: The following closure performs a numeric comparison rather than the string comparison used in <emu-xref href="#sec-array.prototype.tosorted"></emu-xref>.
          1. Let _SortCompare_ be a new Abstract Closure with parameters (_x_, _y_) that captures _comparator_ and performs the following steps when called:
            1. Return ? CompareTypedArrayElements(_x_, _y_, _comparator_).
          1. Let _sortedList_ be ? SortIndexedProperties(_O_, _len_, _SortCompare_, ~read-through-holes~).
          1. Let _j_ be 0.
          1. Repeat, while _j_ &lt; _len_,
            1. Perform ! Set(_A_, ! ToString(𝔽(_j_)), _sortedList_[_j_], *true*).
            1. Set _j_ to _j_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.tostring">
        <h1>%TypedArray%.prototype.toString ( )</h1>
        <p>The initial value of the *"toString"* property is %Array.prototype.toString%, defined in <emu-xref href="#sec-array.prototype.tostring"></emu-xref>.</p>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.values">
        <h1>%TypedArray%.prototype.values ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Return CreateArrayIterator(_O_, ~value~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%typedarray%.prototype.with">
        <h1>%TypedArray%.prototype.with ( _index_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Let _taRecord_ be ? ValidateTypedArray(_O_, ~seq-cst~).
          1. Let _len_ be TypedArrayLength(_taRecord_).
          1. Let _relativeIndex_ be ? ToIntegerOrInfinity(_index_).
          1. If _relativeIndex_ ≥ 0, let _actualIndex_ be _relativeIndex_.
          1. Else, let _actualIndex_ be _len_ + _relativeIndex_.
          1. If _O_.[[ContentType]] is ~bigint~, let _numericValue_ be ? ToBigInt(_value_).
          1. Else, let _numericValue_ be ? ToNumber(_value_).
          1. If IsValidIntegerIndex(_O_, 𝔽(_actualIndex_)) is *false*, throw a *RangeError* exception.
          1. Let _A_ be ? TypedArrayCreateSameType(_O_, « 𝔽(_len_) »).
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _Pk_ be ! ToString(𝔽(_k_)).
            1. If _k_ = _actualIndex_, let _fromValue_ be _numericValue_.
            1. Else, let _fromValue_ be ! Get(_O_, _Pk_).
            1. Perform ! Set(_A_, _Pk_, _fromValue_, *true*).
            1. Set _k_ to _k_ + 1.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-%typedarray%.prototype-@@iterator" id="sec-%typedarray%.prototype-%symbol.iterator%">
        <h1>%TypedArray%.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>The initial value of the %Symbol.iterator% property is %TypedArray.prototype.values%, defined in <emu-xref href="#sec-%typedarray%.prototype.values"></emu-xref>.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-%typedarray%.prototype-@@tostringtag" id="sec-get-%typedarray%.prototype-%symbol.tostringtag%">
        <h1>get %TypedArray%.prototype [ %Symbol.toStringTag% ]</h1>
        <p>%TypedArray%`.prototype[%Symbol.toStringTag%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, return *undefined*.
          1. If _O_ does not have a [[TypedArrayName]] internal slot, return *undefined*.
          1. Let _name_ be _O_.[[TypedArrayName]].
          1. Assert: _name_ is a String.
          1. Return _name_.
        </emu-alg>
        <p>This property has the attributes { [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        <p>The initial value of the *"name"* property of this function is *"get [Symbol.toStringTag]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-typedarray-objects">
      <h1>Abstract Operations for TypedArray Objects</h1>

      <emu-clause id="typedarray-species-create" type="abstract operation">
        <h1>
          TypedArraySpeciesCreate (
            _exemplar_: a TypedArray,
            _argumentList_: a List of ECMAScript language values,
          ): either a normal completion containing a TypedArray or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of a new TypedArray using a constructor function that is derived from _exemplar_. Unlike ArraySpeciesCreate, which can create non-Array objects through the use of %Symbol.species%, this operation enforces that the constructor function creates an actual TypedArray.</dd>
        </dl>
        <emu-alg>
          1. Let _defaultConstructor_ be the intrinsic object associated with the constructor name _exemplar_.[[TypedArrayName]] in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>.
          1. Let _constructor_ be ? SpeciesConstructor(_exemplar_, _defaultConstructor_).
          1. Let _result_ be ? TypedArrayCreateFromConstructor(_constructor_, _argumentList_).
          1. Assert: _result_ has [[TypedArrayName]] and [[ContentType]] internal slots.
          1. If _result_.[[ContentType]] is not _exemplar_.[[ContentType]], throw a *TypeError* exception.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraycreatefromconstructor" oldids="typedarray-create" type="abstract operation">
        <h1>
          TypedArrayCreateFromConstructor (
            _constructor_: a constructor,
            _argumentList_: a List of ECMAScript language values,
          ): either a normal completion containing a TypedArray or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of a new TypedArray using a constructor function.</dd>
        </dl>
        <emu-alg>
          1. Let _newTypedArray_ be ? Construct(_constructor_, _argumentList_).
          1. Let _taRecord_ be ? ValidateTypedArray(_newTypedArray_, ~seq-cst~).
          1. If the number of elements in _argumentList_ is 1 and _argumentList_[0] is a Number, then
            1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
            1. Let _length_ be TypedArrayLength(_taRecord_).
            1. If _length_ &lt; ℝ(_argumentList_[0]), throw a *TypeError* exception.
          1. Return _newTypedArray_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-create-same-type" type="abstract operation">
        <h1>
          TypedArrayCreateSameType (
            _exemplar_: a TypedArray,
            _argumentList_: a List of ECMAScript language values,
          ): either a normal completion containing a TypedArray or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of a new TypedArray using a constructor function that is derived from _exemplar_. Unlike TypedArraySpeciesCreate, which can construct custom TypedArray subclasses through the use of %Symbol.species%, this operation always uses one of the built-in TypedArray constructors.</dd>
        </dl>
        <emu-alg>
          1. Let _constructor_ be the intrinsic object associated with the constructor name _exemplar_.[[TypedArrayName]] in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>.
          1. Let _result_ be ? TypedArrayCreateFromConstructor(_constructor_, _argumentList_).
          1. Assert: _result_ has [[TypedArrayName]] and [[ContentType]] internal slots.
          1. Assert: _result_.[[ContentType]] is _exemplar_.[[ContentType]].
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-validatetypedarray" type="abstract operation">
        <h1>
          ValidateTypedArray (
            _O_: an ECMAScript language value,
            _order_: ~seq-cst~ or ~unordered~,
          ): either a normal completion containing a TypedArray With Buffer Witness Record or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_O_, [[TypedArrayName]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, _order_).
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
          1. Return _taRecord_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarrayelementsize" type="abstract operation">
        <h1>
          TypedArrayElementSize (
            _O_: a TypedArray,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for _O_.[[TypedArrayName]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarrayelementtype" type="abstract operation">
        <h1>
          TypedArrayElementType (
            _O_: a TypedArray,
          ): a TypedArray element type
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return the Element Type value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for _O_.[[TypedArrayName]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-comparetypedarrayelements" type="abstract operation">
        <h1>
          CompareTypedArrayElements (
            _x_: a Number or a BigInt,
            _y_: a Number or a BigInt,
            _comparator_: a function object or *undefined*,
          ): either a normal completion containing a Number or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _x_ is a Number and _y_ is a Number, or _x_ is a BigInt and _y_ is a BigInt.
          1. If _comparator_ is not *undefined*, then
            1. Let _v_ be ? ToNumber(? Call(_comparator_, *undefined*, « _x_, _y_ »)).
            1. If _v_ is *NaN*, return *+0*<sub>𝔽</sub>.
            1. Return _v_.
          1. If _x_ and _y_ are both *NaN*, return *+0*<sub>𝔽</sub>.
          1. If _x_ is *NaN*, return *1*<sub>𝔽</sub>.
          1. If _y_ is *NaN*, return *-1*<sub>𝔽</sub>.
          1. If _x_ &lt; _y_, return *-1*<sub>𝔽</sub>.
          1. If _x_ > _y_, return *1*<sub>𝔽</sub>.
          1. If _x_ is *-0*<sub>𝔽</sub> and _y_ is *+0*<sub>𝔽</sub>, return *-1*<sub>𝔽</sub>.
          1. If _x_ is *+0*<sub>𝔽</sub> and _y_ is *-0*<sub>𝔽</sub>, return *1*<sub>𝔽</sub>.
          1. Return *+0*<sub>𝔽</sub>.
        </emu-alg>
        <emu-note>
          This performs a numeric comparison rather than the string comparison used in <emu-xref href="#sec-comparearrayelements"></emu-xref>.
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-typedarray-constructors">
      <h1>The _TypedArray_ Constructors</h1>
      <p>Each _TypedArray_ constructor:</p>
      <ul>
        <li>is an intrinsic object that has the structure described below, differing only in the name used as the constructor name instead of _TypedArray_, in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>.</li>
        <li>is a function whose behaviour differs based upon the number and types of its arguments. The actual behaviour of a call of _TypedArray_ depends upon the number and kind of arguments that are passed to it.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified _TypedArray_ behaviour must include a `super` call to the _TypedArray_ constructor to create and initialize the subclass instance with the internal state necessary to support the %TypedArray%`.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-typedarray" oldids="sec-typedarray-length,sec-typedarray-object">
        <h1>_TypedArray_ ( ..._args_ )</h1>
        <p>Each _TypedArray_ constructor performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _constructorName_ be the String value of the Constructor Name value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for this <var>TypedArray</var> constructor.
          1. Let _proto_ be <code>"%<var>TypedArray</var>.prototype%"</code>.
          1. Let _numberOfArgs_ be the number of elements in _args_.
          1. If _numberOfArgs_ = 0, then
            1. Return ? AllocateTypedArray(_constructorName_, NewTarget, _proto_, 0).
          1. Else,
            1. Let _firstArgument_ be _args_[0].
            1. If _firstArgument_ is an Object, then
              1. Let _O_ be ? AllocateTypedArray(_constructorName_, NewTarget, _proto_).
              1. If _firstArgument_ has a [[TypedArrayName]] internal slot, then
                1. Perform ? InitializeTypedArrayFromTypedArray(_O_, _firstArgument_).
              1. Else if _firstArgument_ has an [[ArrayBufferData]] internal slot, then
                1. If _numberOfArgs_ > 1, let _byteOffset_ be _args_[1]; else let _byteOffset_ be *undefined*.
                1. If _numberOfArgs_ > 2, let _length_ be _args_[2]; else let _length_ be *undefined*.
                1. Perform ? InitializeTypedArrayFromArrayBuffer(_O_, _firstArgument_, _byteOffset_, _length_).
              1. Else,
                1. Assert: _firstArgument_ is an Object and _firstArgument_ does not have either a [[TypedArrayName]] or an [[ArrayBufferData]] internal slot.
                1. Let _usingIterator_ be ? GetMethod(_firstArgument_, %Symbol.iterator%).
                1. If _usingIterator_ is not *undefined*, then
                  1. Let _values_ be ? IteratorToList(? GetIteratorFromMethod(_firstArgument_, _usingIterator_)).
                  1. Perform ? InitializeTypedArrayFromList(_O_, _values_).
                1. Else,
                  1. NOTE: _firstArgument_ is not an iterable object, so assume it is already an array-like object.
                  1. Perform ? InitializeTypedArrayFromArrayLike(_O_, _firstArgument_).
              1. Return _O_.
            1. Else,
              1. Assert: _firstArgument_ is not an Object.
              1. Let _elementLength_ be ? ToIndex(_firstArgument_).
              1. Return ? AllocateTypedArray(_constructorName_, NewTarget, _proto_, _elementLength_).
        </emu-alg>

        <emu-clause id="sec-allocatetypedarray" type="abstract operation">
          <h1>
            AllocateTypedArray (
              _constructorName_: a String which is the name of a TypedArray constructor in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>,
              _newTarget_: a constructor,
              _defaultProto_: a String,
              optional _length_: a non-negative integer,
            ): either a normal completion containing a TypedArray or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It is used to validate and create an instance of a TypedArray constructor. If the _length_ argument is passed, an ArrayBuffer of that length is also allocated and associated with the new TypedArray instance. AllocateTypedArray provides common semantics that is used by _TypedArray_.</dd>
          </dl>
          <emu-alg>
            1. Let _proto_ be ? GetPrototypeFromConstructor(_newTarget_, _defaultProto_).
            1. Let _obj_ be TypedArrayCreate(_proto_).
            1. Assert: _obj_.[[ViewedArrayBuffer]] is *undefined*.
            1. Set _obj_.[[TypedArrayName]] to _constructorName_.
            1. If _constructorName_ is either *"BigInt64Array"* or *"BigUint64Array"*, set _obj_.[[ContentType]] to ~bigint~.
            1. Otherwise, set _obj_.[[ContentType]] to ~number~.
            1. If _length_ is not present, then
              1. Set _obj_.[[ByteLength]] to 0.
              1. Set _obj_.[[ByteOffset]] to 0.
              1. Set _obj_.[[ArrayLength]] to 0.
            1. Else,
              1. Perform ? AllocateTypedArrayBuffer(_obj_, _length_).
            1. Return _obj_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-initializetypedarrayfromtypedarray" type="abstract operation" oldids="sec-typedarray-typedarray">
          <h1>
            InitializeTypedArrayFromTypedArray (
              _O_: a TypedArray,
              _srcArray_: a TypedArray,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _srcData_ be _srcArray_.[[ViewedArrayBuffer]].
            1. Let _elementType_ be TypedArrayElementType(_O_).
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _srcType_ be TypedArrayElementType(_srcArray_).
            1. Let _srcElementSize_ be TypedArrayElementSize(_srcArray_).
            1. Let _srcByteOffset_ be _srcArray_.[[ByteOffset]].
            1. Let _srcRecord_ be MakeTypedArrayWithBufferWitnessRecord(_srcArray_, ~seq-cst~).
            1. If IsTypedArrayOutOfBounds(_srcRecord_) is *true*, throw a *TypeError* exception.
            1. Let _elementLength_ be TypedArrayLength(_srcRecord_).
            1. Let _byteLength_ be _elementSize_ × _elementLength_.
            1. If _elementType_ is _srcType_, then
              1. Let _data_ be ? CloneArrayBuffer(_srcData_, _srcByteOffset_, _byteLength_).
            1. Else,
              1. Let _data_ be ? <emu-meta suppress-effects="user-code">AllocateArrayBuffer(%ArrayBuffer%, _byteLength_)</emu-meta>.
              1. If _srcArray_.[[ContentType]] is not _O_.[[ContentType]], throw a *TypeError* exception.
              1. Let _srcByteIndex_ be _srcByteOffset_.
              1. Let _targetByteIndex_ be 0.
              1. Let _count_ be _elementLength_.
              1. Repeat, while _count_ > 0,
                1. Let _value_ be GetValueFromBuffer(_srcData_, _srcByteIndex_, _srcType_, *true*, ~unordered~).
                1. Perform SetValueInBuffer(_data_, _targetByteIndex_, _elementType_, _value_, *true*, ~unordered~).
                1. Set _srcByteIndex_ to _srcByteIndex_ + _srcElementSize_.
                1. Set _targetByteIndex_ to _targetByteIndex_ + _elementSize_.
                1. Set _count_ to _count_ - 1.
            1. Set _O_.[[ViewedArrayBuffer]] to _data_.
            1. Set _O_.[[ByteLength]] to _byteLength_.
            1. Set _O_.[[ByteOffset]] to 0.
            1. Set _O_.[[ArrayLength]] to _elementLength_.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-initializetypedarrayfromarraybuffer" type="abstract operation" oldids="sec-typedarray-buffer-byteoffset-length">
          <h1>
            InitializeTypedArrayFromArrayBuffer (
              _O_: a TypedArray,
              _buffer_: an ArrayBuffer or a SharedArrayBuffer,
              _byteOffset_: an ECMAScript language value,
              _length_: an ECMAScript language value,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _offset_ be ? ToIndex(_byteOffset_).
            1. If _offset_ modulo _elementSize_ ≠ 0, throw a *RangeError* exception.
            1. Let _bufferIsFixedLength_ be IsFixedLengthArrayBuffer(_buffer_).
            1. If _length_ is not *undefined*, then
              1. Let _newLength_ be ? ToIndex(_length_).
            1. If IsDetachedBuffer(_buffer_) is *true*, throw a *TypeError* exception.
            1. Let _bufferByteLength_ be ArrayBufferByteLength(_buffer_, ~seq-cst~).
            1. If _length_ is *undefined* and _bufferIsFixedLength_ is *false*, then
              1. If _offset_ > _bufferByteLength_, throw a *RangeError* exception.
              1. Set _O_.[[ByteLength]] to ~auto~.
              1. Set _O_.[[ArrayLength]] to ~auto~.
            1. Else,
              1. If _length_ is *undefined*, then
                1. If _bufferByteLength_ modulo _elementSize_ ≠ 0, throw a *RangeError* exception.
                1. Let _newByteLength_ be _bufferByteLength_ - _offset_.
                1. If _newByteLength_ &lt; 0, throw a *RangeError* exception.
              1. Else,
                1. Let _newByteLength_ be _newLength_ × _elementSize_.
                1. If _offset_ + _newByteLength_ > _bufferByteLength_, throw a *RangeError* exception.
              1. Set _O_.[[ByteLength]] to _newByteLength_.
              1. Set _O_.[[ArrayLength]] to _newByteLength_ / _elementSize_.
            1. Set _O_.[[ViewedArrayBuffer]] to _buffer_.
            1. Set _O_.[[ByteOffset]] to _offset_.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-initializetypedarrayfromlist" type="abstract operation">
          <h1>
            InitializeTypedArrayFromList (
              _O_: a TypedArray,
              _values_: a List of ECMAScript language values,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _len_ be the number of elements in _values_.
            1. Perform ? AllocateTypedArrayBuffer(_O_, _len_).
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _len_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _kValue_ be the first element of _values_.
              1. Remove the first element from _values_.
              1. Perform ? Set(_O_, _Pk_, _kValue_, *true*).
              1. Set _k_ to _k_ + 1.
            1. Assert: _values_ is now an empty List.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-initializetypedarrayfromarraylike" type="abstract operation">
          <h1>
            InitializeTypedArrayFromArrayLike (
              _O_: a TypedArray,
              _arrayLike_: an Object, but not a TypedArray or an ArrayBuffer,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _len_ be ? LengthOfArrayLike(_arrayLike_).
            1. Perform ? AllocateTypedArrayBuffer(_O_, _len_).
            1. Let _k_ be 0.
            1. Repeat, while _k_ &lt; _len_,
              1. Let _Pk_ be ! ToString(𝔽(_k_)).
              1. Let _kValue_ be ? Get(_arrayLike_, _Pk_).
              1. Perform ? Set(_O_, _Pk_, _kValue_, *true*).
              1. Set _k_ to _k_ + 1.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-allocatetypedarraybuffer" type="abstract operation">
          <h1>
            AllocateTypedArrayBuffer (
              _O_: a TypedArray,
              _length_: a non-negative integer,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It allocates and associates an ArrayBuffer with _O_.</dd>
          </dl>
          <emu-alg>
            1. Assert: _O_.[[ViewedArrayBuffer]] is *undefined*.
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _byteLength_ be _elementSize_ × _length_.
            1. Let _data_ be ? <emu-meta suppress-effects="user-code">AllocateArrayBuffer(%ArrayBuffer%, _byteLength_)</emu-meta>.
            1. Set _O_.[[ViewedArrayBuffer]] to _data_.
            1. Set _O_.[[ByteLength]] to _byteLength_.
            1. Set _O_.[[ByteOffset]] to 0.
            1. Set _O_.[[ArrayLength]] to _length_.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-typedarray-constructors">
      <h1>Properties of the _TypedArray_ Constructors</h1>
      <p>Each _TypedArray_ constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %TypedArray%.</li>
        <li>has a *"length"* property whose value is *3*<sub>𝔽</sub>.</li>
        <li>has a *"name"* property whose value is the String value of the constructor name specified for it in <emu-xref href="#table-the-typedarray-constructors"></emu-xref>.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-typedarray.bytes_per_element">
        <h1>_TypedArray_.BYTES_PER_ELEMENT</h1>
        <p>The value of _TypedArray_`.BYTES_PER_ELEMENT` is the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for _TypedArray_.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-typedarray.prototype">
        <h1>_TypedArray_.prototype</h1>
        <p>The initial value of _TypedArray_`.prototype` is the corresponding _TypedArray_ prototype intrinsic object (<emu-xref href="#sec-properties-of-typedarray-prototype-objects"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-typedarray-prototype-objects">
      <h1>Properties of the _TypedArray_ Prototype Objects</h1>
      <p>Each _TypedArray_ prototype object:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %TypedArray.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[ViewedArrayBuffer]] or any other of the internal slots that are specific to _TypedArray_ instance objects.</li>
      </ul>

      <emu-clause id="sec-typedarray.prototype.bytes_per_element">
        <h1>_TypedArray_.prototype.BYTES_PER_ELEMENT</h1>
        <p>The value of _TypedArray_`.prototype.BYTES_PER_ELEMENT` is the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for _TypedArray_.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-typedarray.prototype.constructor">
        <h1>_TypedArray_.prototype.constructor</h1>
        <p>The initial value of the *"constructor"* property of the prototype for a given _TypedArray_ constructor is the constructor itself.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-typedarray-instances">
      <h1>Properties of _TypedArray_ Instances</h1>
      <p>_TypedArray_ instances are TypedArrays. Each _TypedArray_ instance inherits properties from the corresponding _TypedArray_ prototype object. Each _TypedArray_ instance has the following internal slots: [[TypedArrayName]], [[ViewedArrayBuffer]], [[ByteLength]], [[ByteOffset]], and [[ArrayLength]].</p>
    </emu-clause>
  </emu-clause>

<h1 id="sec-keyed-collections" oldids="sec-keyed-collection"></h1>
