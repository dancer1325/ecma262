# Keyed Collections

  <emu-clause id="sec-map-objects">
    <h1>Map Objects</h1>
    <p>Maps are collections of key/value pairs where both the keys and values may be arbitrary ECMAScript language values. A distinct key value may only occur in one key/value pair within the Map's collection. Distinct key values are discriminated using the SameValueZero comparison algorithm.</p>
    <p>Maps must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of elements in the collection. The data structure used in this specification is only intended to describe the required observable semantics of Maps. It is not intended to be a viable implementation model.</p>

    <emu-clause id="sec-map-constructor">
      <h1>The Map Constructor</h1>
      <p>The Map constructor:</p>
      <ul>
        <li>is <dfn>%Map%</dfn>.</li>
        <li>is the initial value of the *"Map"* property of the global object.</li>
        <li>creates and initializes a new Map when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Map behaviour must include a `super` call to the Map constructor to create and initialize the subclass instance with the internal state necessary to support the `Map.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-map-iterable">
        <h1>Map ( [ _iterable_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _map_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Map.prototype%"*, « [[MapData]] »).
          1. Set _map_.[[MapData]] to a new empty List.
          1. If _iterable_ is either *undefined* or *null*, return _map_.
          1. Let _adder_ be ? Get(_map_, *"set"*).
          1. If IsCallable(_adder_) is *false*, throw a *TypeError* exception.
          1. Return ? AddEntriesFromIterable(_map_, _iterable_, _adder_).
        </emu-alg>
        <emu-note>
          <p>If the parameter _iterable_ is present, it is expected to be an object that implements a %Symbol.iterator% method that returns an iterator object that produces a two element array-like object whose first element is a value that will be used as a Map key and whose second element is the value to associate with that key.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-add-entries-from-iterable" type="abstract operation">
        <h1>
          AddEntriesFromIterable (
            _target_: an Object,
            _iterable_: an ECMAScript language value, but not *undefined* or *null*,
            _adder_: a function object,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>_adder_ will be invoked, with _target_ as the receiver.</dd>
        </dl>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_iterable_, ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _target_.
            1. If _next_ is not an Object, then
              1. Let _error_ be ThrowCompletion(a newly created *TypeError* object).
              1. Return ? IteratorClose(_iteratorRecord_, _error_).
            1. Let _k_ be Completion(Get(_next_, *"0"*)).
            1. IfAbruptCloseIterator(_k_, _iteratorRecord_).
            1. Let _v_ be Completion(Get(_next_, *"1"*)).
            1. IfAbruptCloseIterator(_v_, _iteratorRecord_).
            1. Let _status_ be Completion(Call(_adder_, _target_, « _k_, _v_ »)).
            1. IfAbruptCloseIterator(_status_, _iteratorRecord_).
        </emu-alg>
        <emu-note>
          <p>The parameter _iterable_ is expected to be an object that implements a %Symbol.iterator% method that returns an iterator object that produces a two element array-like object whose first element is a value that will be used as a Map key and whose second element is the value to associate with that key.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-map-constructor">
      <h1>Properties of the Map Constructor</h1>
      <p>The Map constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-map.groupby">
        <h1>Map.groupBy ( _items_, _callback_ )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts two arguments. `groupBy` calls _callback_ once for each element in _items_, in ascending order, and constructs a new Map. Each value returned by _callback_ is used as a key in the Map. For each such key, the result Map has an entry whose key is that key and whose value is an array containing all the elements for which _callback_ returned that key.</p>
          <p>_callback_ is called with two arguments: the value of the element and the index of the element.</p>
          <p>The return value of `groupBy` is a Map.</p>
        </emu-note>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _groups_ be ? GroupBy(_items_, _callback_, ~collection~).
          1. Let _map_ be ! Construct(%Map%).
          1. For each Record { [[Key]], [[Elements]] } _g_ of _groups_, do
            1. Let _elements_ be CreateArrayFromList(_g_.[[Elements]]).
            1. Let _entry_ be the Record { [[Key]]: _g_.[[Key]], [[Value]]: _elements_ }.
            1. Append _entry_ to _map_.[[MapData]].
          1. Return _map_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype">
        <h1>Map.prototype</h1>
        <p>The initial value of `Map.prototype` is the Map prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-map-@@species" id="sec-get-map-%symbol.species%">
        <h1>get Map [ %Symbol.species% ]</h1>
        <p>`Map[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p>Methods that create derived collection objects should call %Symbol.species% to determine the constructor to use to create the derived objects. Subclass constructor may over-ride %Symbol.species% to change the default constructor assignment.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-map-prototype-object">
      <h1>Properties of the Map Prototype Object</h1>
      <p>The <dfn>Map prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Map.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[MapData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-map.prototype.clear">
        <h1>Map.prototype.clear ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. Set _p_.[[Key]] to ~empty~.
            1. Set _p_.[[Value]] to ~empty~.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>The existing [[MapData]] List is preserved because there may be existing Map Iterator objects that are suspended midway through iterating over that List.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-map.prototype.constructor">
        <h1>Map.prototype.constructor</h1>
        <p>The initial value of `Map.prototype.constructor` is %Map%.</p>
      </emu-clause>

      <emu-clause id="sec-map.prototype.delete">
        <h1>Map.prototype.delete ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. Set _key_ to CanonicalizeKeyedCollectionKey(_key_).
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, then
              1. Set _p_.[[Key]] to ~empty~.
              1. Set _p_.[[Value]] to ~empty~.
              1. Return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>The value ~empty~ is used as a specification device to indicate that an entry has been deleted. Actual implementations may take other actions such as physically removing the entry from internal data structures.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-map.prototype.entries">
        <h1>Map.prototype.entries ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Return ? CreateMapIterator(_M_, ~key+value~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype.foreach">
        <h1>Map.prototype.forEach ( _callback_ [ , _thisArg_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _entries_ be _M_.[[MapData]].
          1. Let _numEntries_ be the number of elements in _entries_.
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _numEntries_,
            1. Let _e_ be _entries_[_index_].
            1. Set _index_ to _index_ + 1.
            1. If _e_.[[Key]] is not ~empty~, then
              1. Perform ? Call(_callback_, _thisArg_, « _e_.[[Value]], _e_.[[Key]], _M_ »).
              1. NOTE: The number of elements in _entries_ may have increased during execution of _callback_.
              1. Set _numEntries_ to the number of elements in _entries_.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments. `forEach` calls _callback_ once for each key/value pair present in the Map, in key insertion order. _callback_ is called only for keys of the Map which actually exist; it is not called for keys that have been deleted from the Map.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the value of the item, the key of the item, and the Map being traversed.</p>
          <p>`forEach` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_. Each entry of a map's [[MapData]] is only visited once. New keys added after the call to `forEach` begins are visited. A key will be revisited if it is deleted after it has been visited and then re-added before the `forEach` call completes. Keys that are deleted after the call to `forEach` begins and before being visited are not visited unless the key is added again before the `forEach` call completes.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-map.prototype.get">
        <h1>Map.prototype.get ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. Set _key_ to CanonicalizeKeyedCollectionKey(_key_).
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, return _p_.[[Value]].
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype.has">
        <h1>Map.prototype.has ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. Set _key_ to CanonicalizeKeyedCollectionKey(_key_).
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype.keys">
        <h1>Map.prototype.keys ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Return ? CreateMapIterator(_M_, ~key~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype.set">
        <h1>Map.prototype.set ( _key_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. Set _key_ to CanonicalizeKeyedCollectionKey(_key_).
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, then
              1. Set _p_.[[Value]] to _value_.
              1. Return _M_.
          1. Let _p_ be the Record { [[Key]]: _key_, [[Value]]: _value_ }.
          1. Append _p_ to _M_.[[MapData]].
          1. Return _M_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-map.prototype.size">
        <h1>get Map.prototype.size</h1>
        <p>`Map.prototype.size` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[MapData]]).
          1. Let _count_ be 0.
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[MapData]], do
            1. If _p_.[[Key]] is not ~empty~, set _count_ to _count_ + 1.
          1. Return 𝔽(_count_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-map.prototype.values">
        <h1>Map.prototype.values ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Return ? CreateMapIterator(_M_, ~value~).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-map.prototype-@@iterator" id="sec-map.prototype-%symbol.iterator%">
        <h1>Map.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>The initial value of the %Symbol.iterator% property is %Map.prototype.entries%, defined in <emu-xref href="#sec-map.prototype.entries"></emu-xref>.</p>
      </emu-clause>

      <emu-clause oldids="sec-map.prototype-@@tostringtag" id="sec-map.prototype-%symbol.tostringtag%">
        <h1>Map.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"Map"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-map-instances">
      <h1>Properties of Map Instances</h1>
      <p>Map instances are ordinary objects that inherit properties from the Map prototype. Map instances also have a [[MapData]] internal slot.</p>
    </emu-clause>

    <emu-clause id="sec-map-iterator-objects">
      <h1>Map Iterator Objects</h1>
      <p>A <dfn variants="Map Iterators,Map Iterator object,Map Iterator objects">Map Iterator</dfn> is an object that represents a specific iteration over some specific Map instance object. There is not a named constructor for Map Iterator objects. Instead, map iterator objects are created by calling certain methods of Map instance objects.</p>

      <emu-clause id="sec-createmapiterator" type="abstract operation" oldids="sec-properties-of-map-iterator-instances,table-50,table-internal-slots-of-map-iterator-instances">
        <h1>
          CreateMapIterator (
            _map_: an ECMAScript language value,
            _kind_: ~key+value~, ~key~, or ~value~,
          ): either a normal completion containing a Generator or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create iterator objects for Map methods that return such iterators.</dd>
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_map_, [[MapData]]).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _map_ and _kind_ and performs the following steps when called:
            1. Let _entries_ be _map_.[[MapData]].
            1. Let _index_ be 0.
            1. Let _numEntries_ be the number of elements in _entries_.
            1. Repeat, while _index_ &lt; _numEntries_,
              1. Let _e_ be _entries_[_index_].
              1. Set _index_ to _index_ + 1.
              1. If _e_.[[Key]] is not ~empty~, then
                1. If _kind_ is ~key~, then
                  1. Let _result_ be _e_.[[Key]].
                1. Else if _kind_ is ~value~, then
                  1. Let _result_ be _e_.[[Value]].
                1. Else,
                  1. Assert: _kind_ is ~key+value~.
                  1. Let _result_ be CreateArrayFromList(« _e_.[[Key]], _e_.[[Value]] »).
                1. Perform ? GeneratorYield(CreateIteratorResultObject(_result_, *false*)).
                1. NOTE: The number of elements in _entries_ may have increased while execution of this abstract operation was paused by GeneratorYield.
                1. Set _numEntries_ to the number of elements in _entries_.
            1. Return *undefined*.
          1. Return CreateIteratorFromClosure(_closure_, *"%MapIteratorPrototype%"*, %MapIteratorPrototype%).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%mapiteratorprototype%-object">
        <h1>The %MapIteratorPrototype% Object</h1>
        <p>The <dfn>%MapIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all Map Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%mapiteratorprototype%.next">
          <h1>%MapIteratorPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? <emu-meta suppress-effects="user-code">GeneratorResume(*this* value, ~empty~, *"%MapIteratorPrototype%"*)</emu-meta>.
          </emu-alg>
        </emu-clause>

        <emu-clause oldids="sec-%mapiteratorprototype%-@@tostringtag" id="sec-%mapiteratorprototype%-%symbol.tostringtag%">
          <h1>%MapIteratorPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"Map Iterator"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-set-objects">
    <h1>Set Objects</h1>
    <p>Set objects are collections of ECMAScript language values. A distinct value may only occur once as an element of a Set's collection. Distinct values are discriminated using the SameValueZero comparison algorithm.</p>
    <p>Set objects must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of elements in the collection. The data structure used in this specification is only intended to describe the required observable semantics of Set objects. It is not intended to be a viable implementation model.</p>

    <emu-clause id="sec-abstract-operations-for-set-objects">
      <h1>Abstract Operations For Set Objects</h1>

      <emu-clause id="sec-set-records">
        <h1>Set Records</h1>
        <p>A <dfn variants="Set Records">Set Record</dfn> is a Record value used to encapsulate the interface of a Set or similar object.</p>
        <p>Set Records have the fields listed in <emu-xref href="#table-set-record-fields"></emu-xref>.</p>
        <emu-table id="table-set-record-fields" caption="Set Record Fields">
          <table>
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
            <tr>
              <td>
                [[SetObject]]
              </td>
              <td>
                an Object
              </td>
              <td>
                the Set or similar object.
              </td>
            </tr>
            <tr>
              <td>
                [[Size]]
              </td>
              <td>
                a non-negative integer or +∞
              </td>
              <td>
                The reported size of the object.
              </td>
            </tr>
            <tr>
              <td>
                [[Has]]
              </td>
              <td>
                a function object
              </td>
              <td>
                The `has` method of the object.
              </td>
            </tr>
            <tr>
              <td>
                [[Keys]]
              </td>
              <td>
                a function object
              </td>
              <td>
                The `keys` method of the object.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-getsetrecord" type="abstract operation">
        <h1>
          GetSetRecord (
            _obj_: an ECMAScript language value,
          ): either a normal completion containing a Set Record or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _obj_ is not an Object, throw a *TypeError* exception.
          1. Let _rawSize_ be ? Get(_obj_, *"size"*).
          1. Let _numSize_ be ? ToNumber(_rawSize_).
          1. NOTE: If _rawSize_ is *undefined*, then _numSize_ will be *NaN*.
          1. If _numSize_ is *NaN*, throw a *TypeError* exception.
          1. Let _intSize_ be ! ToIntegerOrInfinity(_numSize_).
          1. If _intSize_ &lt; 0, throw a *RangeError* exception.
          1. Let _has_ be ? Get(_obj_, *"has"*).
          1. If IsCallable(_has_) is *false*, throw a *TypeError* exception.
          1. Let _keys_ be ? Get(_obj_, *"keys"*).
          1. If IsCallable(_keys_) is *false*, throw a *TypeError* exception.
          1. Return a new Set Record { [[SetObject]]: _obj_, [[Size]]: _intSize_, [[Has]]: _has_, [[Keys]]: _keys_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-setdatahas" type="abstract operation">
        <h1>
          SetDataHas (
            _setData_: a List of either ECMAScript language values or ~empty~,
            _value_: an ECMAScript language value,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If SetDataIndex(_setData_, _value_) is ~not-found~, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-setdataindex" type="abstract operation">
        <h1>
          SetDataIndex (
            _setData_: a List of either ECMAScript language values or ~empty~,
            _value_: an ECMAScript language value,
          ): a non-negative integer or ~not-found~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Set _value_ to CanonicalizeKeyedCollectionKey(_value_).
          1. Let _size_ be the number of elements in _setData_.
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _size_,
            1. Let _e_ be _setData_[_index_].
            1. If _e_ is not ~empty~ and _e_ is _value_, then
              1. Return _index_.
            1. Set _index_ to _index_ + 1.
          1. Return ~not-found~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-setdatasize" type="abstract operation">
        <h1>
          SetDataSize (
            _setData_: a List of either ECMAScript language values or ~empty~,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _count_ be 0.
          1. For each element _e_ of _setData_, do
            1. If _e_ is not ~empty~, set _count_ to _count_ + 1.
          1. Return _count_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-set-constructor">
      <h1>The Set Constructor</h1>
      <p>The Set constructor:</p>
      <ul>
        <li>is <dfn>%Set%</dfn>.</li>
        <li>is the initial value of the *"Set"* property of the global object.</li>
        <li>creates and initializes a new Set object when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Set behaviour must include a `super` call to the Set constructor to create and initialize the subclass instance with the internal state necessary to support the `Set.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-set-iterable">
        <h1>Set ( [ _iterable_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _set_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Set.prototype%"*, « [[SetData]] »).
          1. Set _set_.[[SetData]] to a new empty List.
          1. If _iterable_ is either *undefined* or *null*, return _set_.
          1. Let _adder_ be ? Get(_set_, *"add"*).
          1. If IsCallable(_adder_) is *false*, throw a *TypeError* exception.
          1. Let _iteratorRecord_ be ? GetIterator(_iterable_, ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _set_.
            1. Let _status_ be Completion(Call(_adder_, _set_, « _next_ »)).
            1. IfAbruptCloseIterator(_status_, _iteratorRecord_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-set-constructor">
      <h1>Properties of the Set Constructor</h1>
      <p>The Set constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-set.prototype">
        <h1>Set.prototype</h1>
        <p>The initial value of `Set.prototype` is the Set prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-set-@@species" id="sec-get-set-%symbol.species%">
        <h1>get Set [ %Symbol.species% ]</h1>
        <p>`Set[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p>Methods that create derived collection objects should call %Symbol.species% to determine the constructor to use to create the derived objects. Subclass constructor may over-ride %Symbol.species% to change the default constructor assignment.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-set-prototype-object">
      <h1>Properties of the Set Prototype Object</h1>
      <p>The <dfn>Set prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Set.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[SetData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-set.prototype.add">
        <h1>Set.prototype.add ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. Set _value_ to CanonicalizeKeyedCollectionKey(_value_).
          1. For each element _e_ of _S_.[[SetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, then
              1. Return _S_.
          1. Append _value_ to _S_.[[SetData]].
          1. Return _S_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.clear">
        <h1>Set.prototype.clear ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. For each element _e_ of _S_.[[SetData]], do
            1. Replace the element of _S_.[[SetData]] whose value is _e_ with an element whose value is ~empty~.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>The existing [[SetData]] List is preserved because there may be existing Set Iterator objects that are suspended midway through iterating over that List.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-set.prototype.constructor">
        <h1>Set.prototype.constructor</h1>
        <p>The initial value of `Set.prototype.constructor` is %Set%.</p>
      </emu-clause>

      <emu-clause id="sec-set.prototype.delete">
        <h1>Set.prototype.delete ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. Set _value_ to CanonicalizeKeyedCollectionKey(_value_).
          1. For each element _e_ of _S_.[[SetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, then
              1. Replace the element of _S_.[[SetData]] whose value is _e_ with an element whose value is ~empty~.
              1. Return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>The value ~empty~ is used as a specification device to indicate that an entry has been deleted. Actual implementations may take other actions such as physically removing the entry from internal data structures.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-set.prototype.difference">
        <h1>Set.prototype.difference ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. Let _resultSetData_ be a copy of _O_.[[SetData]].
          1. If SetDataSize(_O_.[[SetData]]) ≤ _otherRec_.[[Size]], then
            1. Let _thisSize_ be the number of elements in _O_.[[SetData]].
            1. Let _index_ be 0.
            1. Repeat, while _index_ &lt; _thisSize_,
              1. Let _e_ be _resultSetData_[_index_].
              1. If _e_ is not ~empty~, then
                1. Let _inOther_ be ToBoolean(? Call(_otherRec_.[[Has]], _otherRec_.[[SetObject]], « _e_ »)).
                1. If _inOther_ is *true*, then
                  1. Set _resultSetData_[_index_] to ~empty~.
              1. Set _index_ to _index_ + 1.
          1. Else,
            1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
            1. Let _next_ be ~not-started~.
            1. Repeat, while _next_ is not ~done~,
              1. Set _next_ to ? IteratorStepValue(_keysIter_).
              1. If _next_ is not ~done~, then
                1. Set _next_ to CanonicalizeKeyedCollectionKey(_next_).
                1. Let _valueIndex_ be SetDataIndex(_resultSetData_, _next_).
                1. If _valueIndex_ is not ~not-found~, then
                  1. Set _resultSetData_[_valueIndex_] to ~empty~.
          1. Let _result_ be OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »).
          1. Set _result_.[[SetData]] to _resultSetData_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.entries">
        <h1>Set.prototype.entries ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateSetIterator(_S_, ~key+value~).
        </emu-alg>
        <emu-note>
          <p>For iteration purposes, a Set appears similar to a Map where each entry has the same value for its key and value.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-set.prototype.foreach">
        <h1>Set.prototype.forEach ( _callback_ [ , _thisArg_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. If IsCallable(_callback_) is *false*, throw a *TypeError* exception.
          1. Let _entries_ be _S_.[[SetData]].
          1. Let _numEntries_ be the number of elements in _entries_.
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _numEntries_,
            1. Let _e_ be _entries_[_index_].
            1. Set _index_ to _index_ + 1.
            1. If _e_ is not ~empty~, then
              1. Perform ? Call(_callback_, _thisArg_, « _e_, _e_, _S_ »).
              1. NOTE: The number of elements in _entries_ may have increased during execution of _callback_.
              1. Set _numEntries_ to the number of elements in _entries_.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>_callback_ should be a function that accepts three arguments. `forEach` calls _callback_ once for each value present in the Set object, in value insertion order. _callback_ is called only for values of the Set which actually exist; it is not called for keys that have been deleted from the set.</p>
          <p>If a _thisArg_ parameter is provided, it will be used as the *this* value for each invocation of _callback_. If it is not provided, *undefined* is used instead.</p>
          <p>_callback_ is called with three arguments: the first two arguments are a value contained in the Set. The same value is passed for both arguments. The Set object being traversed is passed as the third argument.</p>
          <p>The _callback_ is called with three arguments to be consistent with the call back functions used by `forEach` methods for Map and Array. For Sets, each item value is considered to be both the key and the value.</p>
          <p>`forEach` does not directly mutate the object on which it is called but the object may be mutated by the calls to _callback_.</p>
          <p>Each value is normally visited only once. However, a value will be revisited if it is deleted after it has been visited and then re-added before the `forEach` call completes. Values that are deleted after the call to `forEach` begins and before being visited are not visited unless the value is added again before the `forEach` call completes. New values added after the call to `forEach` begins are visited.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-set.prototype.has">
        <h1>Set.prototype.has ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. Set _value_ to CanonicalizeKeyedCollectionKey(_value_).
          1. For each element _e_ of _S_.[[SetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.intersection">
        <h1>Set.prototype.intersection ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. Let _resultSetData_ be a new empty List.
          1. If SetDataSize(_O_.[[SetData]]) ≤ _otherRec_.[[Size]], then
            1. Let _thisSize_ be the number of elements in _O_.[[SetData]].
            1. Let _index_ be 0.
            1. Repeat, while _index_ &lt; _thisSize_,
              1. Let _e_ be _O_.[[SetData]][_index_].
              1. Set _index_ to _index_ + 1.
              1. If _e_ is not ~empty~, then
                1. Let _inOther_ be ToBoolean(? Call(_otherRec_.[[Has]], _otherRec_.[[SetObject]], « _e_ »)).
                1. If _inOther_ is *true*, then
                  1. NOTE: It is possible for earlier calls to _otherRec_.[[Has]] to remove and re-add an element of _O_.[[SetData]], which can cause the same element to be visited twice during this iteration.
                  1. If SetDataHas(_resultSetData_, _e_) is *false*, then
                    1. Append _e_ to _resultSetData_.
                1. NOTE: The number of elements in _O_.[[SetData]] may have increased during execution of _otherRec_.[[Has]].
                1. Set _thisSize_ to the number of elements in _O_.[[SetData]].
          1. Else,
            1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
            1. Let _next_ be ~not-started~.
            1. Repeat, while _next_ is not ~done~,
              1. Set _next_ to ? IteratorStepValue(_keysIter_).
              1. If _next_ is not ~done~, then
                1. Set _next_ to CanonicalizeKeyedCollectionKey(_next_).
                1. Let _inThis_ be SetDataHas(_O_.[[SetData]], _next_).
                1. If _inThis_ is *true*, then
                  1. NOTE: Because _other_ is an arbitrary object, it is possible for its *"keys"* iterator to produce the same value more than once.
                  1. If SetDataHas(_resultSetData_, _next_) is *false*, then
                    1. Append _next_ to _resultSetData_.
          1. Let _result_ be OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »).
          1. Set _result_.[[SetData]] to _resultSetData_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.isdisjointfrom">
        <h1>Set.prototype.isDisjointFrom ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. If SetDataSize(_O_.[[SetData]]) ≤ _otherRec_.[[Size]], then
            1. Let _thisSize_ be the number of elements in _O_.[[SetData]].
            1. Let _index_ be 0.
            1. Repeat, while _index_ &lt; _thisSize_,
              1. Let _e_ be _O_.[[SetData]][_index_].
              1. Set _index_ to _index_ + 1.
              1. If _e_ is not ~empty~, then
                1. Let _inOther_ be ToBoolean(? Call(_otherRec_.[[Has]], _otherRec_.[[SetObject]], « _e_ »)).
                1. If _inOther_ is *true*, return *false*.
                1. NOTE: The number of elements in _O_.[[SetData]] may have increased during execution of _otherRec_.[[Has]].
                1. Set _thisSize_ to the number of elements in _O_.[[SetData]].
          1. Else,
            1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
            1. Let _next_ be ~not-started~.
            1. Repeat, while _next_ is not ~done~,
              1. Set _next_ to ? IteratorStepValue(_keysIter_).
              1. If _next_ is not ~done~, then
                1. If SetDataHas(_O_.[[SetData]], _next_) is *true*, then
                  1. Perform ? IteratorClose(_keysIter_, NormalCompletion(~unused~)).
                  1. Return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.issubsetof">
        <h1>Set.prototype.isSubsetOf ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. If SetDataSize(_O_.[[SetData]]) > _otherRec_.[[Size]], return *false*.
          1. Let _thisSize_ be the number of elements in _O_.[[SetData]].
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _thisSize_,
            1. Let _e_ be _O_.[[SetData]][_index_].
            1. Set _index_ to _index_ + 1.
            1. If _e_ is not ~empty~, then
              1. Let _inOther_ be ToBoolean(? Call(_otherRec_.[[Has]], _otherRec_.[[SetObject]], « _e_ »)).
              1. If _inOther_ is *false*, return *false*.
              1. NOTE: The number of elements in _O_.[[SetData]] may have increased during execution of _otherRec_.[[Has]].
              1. Set _thisSize_ to the number of elements in _O_.[[SetData]].
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.issupersetof">
        <h1>Set.prototype.isSupersetOf ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. If SetDataSize(_O_.[[SetData]]) &lt; _otherRec_.[[Size]], return *false*.
          1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
          1. Let _next_ be ~not-started~.
          1. Repeat, while _next_ is not ~done~,
            1. Set _next_ to ? IteratorStepValue(_keysIter_).
            1. If _next_ is not ~done~, then
              1. If SetDataHas(_O_.[[SetData]], _next_) is *false*, then
                1. Perform ? IteratorClose(_keysIter_, NormalCompletion(~unused~)).
                1. Return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.keys">
        <h1>Set.prototype.keys ( )</h1>
        <p>The initial value of the *"keys"* property is %Set.prototype.values%, defined in <emu-xref href="#sec-set.prototype.values"></emu-xref>.</p>
        <emu-note>
          <p>For iteration purposes, a Set appears similar to a Map where each entry has the same value for its key and value.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-get-set.prototype.size">
        <h1>get Set.prototype.size</h1>
        <p>`Set.prototype.size` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[SetData]]).
          1. Let _size_ be SetDataSize(_S_.[[SetData]]).
          1. Return 𝔽(_size_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.symmetricdifference">
        <h1>Set.prototype.symmetricDifference ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
          1. Let _resultSetData_ be a copy of _O_.[[SetData]].
          1. Let _next_ be ~not-started~.
          1. Repeat, while _next_ is not ~done~,
            1. Set _next_ to ? IteratorStepValue(_keysIter_).
            1. If _next_ is not ~done~, then
              1. Set _next_ to CanonicalizeKeyedCollectionKey(_next_).
              1. Let _resultIndex_ be SetDataIndex(_resultSetData_, _next_).
              1. If _resultIndex_ is ~not-found~, let _alreadyInResult_ be *false*. Otherwise let _alreadyInResult_ be *true*.
              1. If SetDataHas(_O_.[[SetData]], _next_) is *true*, then
                1. If _alreadyInResult_ is *true*, set _resultSetData_[_resultIndex_] to ~empty~.
              1. Else,
                1. If _alreadyInResult_ is *false*, append _next_ to _resultSetData_.
          1. Let _result_ be OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »).
          1. Set _result_.[[SetData]] to _resultSetData_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.union">
        <h1>Set.prototype.union ( _other_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[SetData]]).
          1. Let _otherRec_ be ? GetSetRecord(_other_).
          1. Let _keysIter_ be ? GetIteratorFromMethod(_otherRec_.[[SetObject]], _otherRec_.[[Keys]]).
          1. Let _resultSetData_ be a copy of _O_.[[SetData]].
          1. Let _next_ be ~not-started~.
          1. Repeat, while _next_ is not ~done~,
            1. Set _next_ to ? IteratorStepValue(_keysIter_).
            1. If _next_ is not ~done~, then
              1. Set _next_ to CanonicalizeKeyedCollectionKey(_next_).
              1. If SetDataHas(_resultSetData_, _next_) is *false*, then
                1. Append _next_ to _resultSetData_.
          1. Let _result_ be OrdinaryObjectCreate(%Set.prototype%, « [[SetData]] »).
          1. Set _result_.[[SetData]] to _resultSetData_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set.prototype.values">
        <h1>Set.prototype.values ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateSetIterator(_S_, ~value~).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-set.prototype-@@iterator" id="sec-set.prototype-%symbol.iterator%">
        <h1>Set.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>The initial value of the %Symbol.iterator% property is %Set.prototype.values%, defined in <emu-xref href="#sec-set.prototype.values"></emu-xref>.</p>
      </emu-clause>

      <emu-clause oldids="sec-set.prototype-@@tostringtag" id="sec-set.prototype-%symbol.tostringtag%">
        <h1>Set.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"Set"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-set-instances">
      <h1>Properties of Set Instances</h1>
      <p>Set instances are ordinary objects that inherit properties from the Set prototype. Set instances also have a [[SetData]] internal slot.</p>
    </emu-clause>

    <emu-clause id="sec-set-iterator-objects">
      <h1>Set Iterator Objects</h1>
      <p>A <dfn variants="Set Iterators,Set Iterator object,Set Iterator objects">Set Iterator</dfn> is an ordinary object, with the structure defined below, that represents a specific iteration over some specific Set instance object. There is not a named constructor for Set Iterator objects. Instead, set iterator objects are created by calling certain methods of Set instance objects.</p>

      <emu-clause id="sec-createsetiterator" type="abstract operation" oldids="sec-properties-of-set-iterator-instances,table-51,table-internal-slots-of-set-iterator-instances">
        <h1>
          CreateSetIterator (
            _set_: an ECMAScript language value,
            _kind_: ~key+value~ or ~value~,
          ): either a normal completion containing a Generator or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create iterator objects for Set methods that return such iterators.</dd>
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_set_, [[SetData]]).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _set_ and _kind_ and performs the following steps when called:
            1. Let _index_ be 0.
            1. Let _entries_ be _set_.[[SetData]].
            1. Let _numEntries_ be the number of elements in _entries_.
            1. Repeat, while _index_ &lt; _numEntries_,
              1. Let _e_ be _entries_[_index_].
              1. Set _index_ to _index_ + 1.
              1. If _e_ is not ~empty~, then
                1. If _kind_ is ~key+value~, then
                  1. Let _result_ be CreateArrayFromList(« _e_, _e_ »).
                  1. Perform ? GeneratorYield(CreateIteratorResultObject(_result_, *false*)).
                1. Else,
                  1. Assert: _kind_ is ~value~.
                  1. Perform ? GeneratorYield(CreateIteratorResultObject(_e_, *false*)).
                1. NOTE: The number of elements in _entries_ may have increased while execution of this abstract operation was paused by GeneratorYield.
                1. Set _numEntries_ to the number of elements in _entries_.
            1. Return *undefined*.
          1. Return CreateIteratorFromClosure(_closure_, *"%SetIteratorPrototype%"*, %SetIteratorPrototype%).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%setiteratorprototype%-object">
        <h1>The %SetIteratorPrototype% Object</h1>
        <p>The <dfn>%SetIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all Set Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%setiteratorprototype%.next">
          <h1>%SetIteratorPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? <emu-meta suppress-effects="user-code">GeneratorResume(*this* value, ~empty~, *"%SetIteratorPrototype%"*)</emu-meta>.
          </emu-alg>
        </emu-clause>

        <emu-clause oldids="sec-%setiteratorprototype%-@@tostringtag" id="sec-%setiteratorprototype%-%symbol.tostringtag%">
          <h1>%SetIteratorPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"Set Iterator"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-weakmap-objects">
    <h1>WeakMap Objects</h1>
    <p>WeakMaps are collections of key/value pairs where the keys are objects and/or symbols and values may be arbitrary ECMAScript language values. A WeakMap may be queried to see if it contains a key/value pair with a specific key, but no mechanism is provided for enumerating the values it holds as keys. In certain conditions, values which are not live are removed as WeakMap keys, as described in <emu-xref href="#sec-weakref-execution"></emu-xref>.</p>
    <p>An implementation may impose an arbitrarily determined latency between the time a key/value pair of a WeakMap becomes inaccessible and the time when the key/value pair is removed from the WeakMap. If this latency was observable to ECMAScript program, it would be a source of indeterminacy that could impact program execution. For that reason, an ECMAScript implementation must not provide any means to observe a key of a WeakMap that does not require the observer to present the observed key.</p>
    <p>WeakMaps must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of key/value pairs in the collection. The data structure used in this specification is only intended to describe the required observable semantics of WeakMaps. It is not intended to be a viable implementation model.</p>
    <emu-note>
      <p>WeakMap and WeakSet are intended to provide mechanisms for dynamically associating state with an object or symbol in a manner that does not “leak” memory resources if, in the absence of the WeakMap or WeakSet instance, the object or symbol otherwise became inaccessible and subject to resource reclamation by the implementation's garbage collection mechanisms. This characteristic can be achieved by using an inverted per-object/symbol mapping of WeakMap or WeakSet instances to keys. Alternatively, each WeakMap or WeakSet instance may internally store its key and value data, but this approach requires coordination between the WeakMap or WeakSet implementation and the garbage collector. The following references describe mechanism that may be useful to implementations of WeakMap and WeakSet:</p>
      <p>Barry Hayes. 1997. Ephemerons: a new finalization mechanism. In <i>Proceedings of the 12th ACM SIGPLAN conference on Object-oriented programming, systems, languages, and applications (OOPSLA '97)</i>, A. Michael Berman (Ed.). ACM, New York, NY, USA, 176-183, <a href="http://doi.acm.org/10.1145/263698.263733">http://doi.acm.org/10.1145/263698.263733</a>.</p>
      <p>Alexandra Barros, Roberto Ierusalimschy, Eliminating Cycles in Weak Tables. Journal of Universal Computer Science - J.UCS, vol. 14, no. 21, pp. 3481-3497, 2008, <a href="http://www.jucs.org/jucs_14_21/eliminating_cycles_in_weak">http://www.jucs.org/jucs_14_21/eliminating_cycles_in_weak</a></p>
    </emu-note>

    <emu-clause id="sec-weakmap-constructor">
      <h1>The WeakMap Constructor</h1>
      <p>The WeakMap constructor:</p>
      <ul>
        <li>is <dfn>%WeakMap%</dfn>.</li>
        <li>is the initial value of the *"WeakMap"* property of the global object.</li>
        <li>creates and initializes a new WeakMap when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified WeakMap behaviour must include a `super` call to the WeakMap constructor to create and initialize the subclass instance with the internal state necessary to support the `WeakMap.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-weakmap-iterable">
        <h1>WeakMap ( [ _iterable_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _map_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%WeakMap.prototype%"*, « [[WeakMapData]] »).
          1. Set _map_.[[WeakMapData]] to a new empty List.
          1. If _iterable_ is either *undefined* or *null*, return _map_.
          1. Let _adder_ be ? Get(_map_, *"set"*).
          1. If IsCallable(_adder_) is *false*, throw a *TypeError* exception.
          1. Return ? AddEntriesFromIterable(_map_, _iterable_, _adder_).
        </emu-alg>
        <emu-note>
          <p>If the parameter _iterable_ is present, it is expected to be an object that implements a %Symbol.iterator% method that returns an iterator object that produces a two element array-like object whose first element is a value that will be used as a WeakMap key and whose second element is the value to associate with that key.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weakmap-constructor">
      <h1>Properties of the WeakMap Constructor</h1>
      <p>The WeakMap constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-weakmap.prototype">
        <h1>WeakMap.prototype</h1>
        <p>The initial value of `WeakMap.prototype` is the WeakMap prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weakmap-prototype-object">
      <h1>Properties of the WeakMap Prototype Object</h1>
      <p>The <dfn>WeakMap prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%WeakMap.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[WeakMapData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-weakmap.prototype.constructor">
        <h1>WeakMap.prototype.constructor</h1>
        <p>The initial value of `WeakMap.prototype.constructor` is %WeakMap%.</p>
      </emu-clause>

      <emu-clause id="sec-weakmap.prototype.delete">
        <h1>WeakMap.prototype.delete ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[WeakMapData]]).
          1. If CanBeHeldWeakly(_key_) is *false*, return *false*.
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[WeakMapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, then
              1. Set _p_.[[Key]] to ~empty~.
              1. Set _p_.[[Value]] to ~empty~.
              1. Return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>The value ~empty~ is used as a specification device to indicate that an entry has been deleted. Actual implementations may take other actions such as physically removing the entry from internal data structures.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-weakmap.prototype.get">
        <h1>WeakMap.prototype.get ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[WeakMapData]]).
          1. If CanBeHeldWeakly(_key_) is *false*, return *undefined*.
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[WeakMapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, return _p_.[[Value]].
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-weakmap.prototype.has">
        <h1>WeakMap.prototype.has ( _key_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[WeakMapData]]).
          1. If CanBeHeldWeakly(_key_) is *false*, return *false*.
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[WeakMapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-weakmap.prototype.set">
        <h1>WeakMap.prototype.set ( _key_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _M_ be the *this* value.
          1. Perform ? RequireInternalSlot(_M_, [[WeakMapData]]).
          1. If CanBeHeldWeakly(_key_) is *false*, throw a *TypeError* exception.
          1. For each Record { [[Key]], [[Value]] } _p_ of _M_.[[WeakMapData]], do
            1. If _p_.[[Key]] is not ~empty~ and SameValue(_p_.[[Key]], _key_) is *true*, then
              1. Set _p_.[[Value]] to _value_.
              1. Return _M_.
          1. Let _p_ be the Record { [[Key]]: _key_, [[Value]]: _value_ }.
          1. Append _p_ to _M_.[[WeakMapData]].
          1. Return _M_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-weakmap.prototype-@@tostringtag" id="sec-weakmap.prototype-%symbol.tostringtag%">
        <h1>WeakMap.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"WeakMap"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-weakmap-instances">
      <h1>Properties of WeakMap Instances</h1>
      <p>WeakMap instances are ordinary objects that inherit properties from the WeakMap prototype. WeakMap instances also have a [[WeakMapData]] internal slot.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-weakset-objects">
    <h1>WeakSet Objects</h1>
    <p>WeakSets are collections of objects and/or symbols. A distinct object or symbol may only occur once as an element of a WeakSet's collection. A WeakSet may be queried to see if it contains a specific value, but no mechanism is provided for enumerating the values it holds. In certain conditions, values which are not live are removed as WeakSet elements, as described in <emu-xref href="#sec-weakref-execution"></emu-xref>.</p>
    <p>An implementation may impose an arbitrarily determined latency between the time a value contained in a WeakSet becomes inaccessible and the time when the value is removed from the WeakSet. If this latency was observable to ECMAScript program, it would be a source of indeterminacy that could impact program execution. For that reason, an ECMAScript implementation must not provide any means to determine if a WeakSet contains a particular value that does not require the observer to present the observed value.</p>
    <p>WeakSets must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of elements in the collection. The data structure used in this specification is only intended to describe the required observable semantics of WeakSets. It is not intended to be a viable implementation model.</p>
    <emu-note>
      <p>See the NOTE in <emu-xref href="#sec-weakmap-objects"></emu-xref>.</p>
    </emu-note>

    <emu-clause id="sec-weakset-constructor">
      <h1>The WeakSet Constructor</h1>
      <p>The WeakSet constructor:</p>
      <ul>
        <li>is <dfn>%WeakSet%</dfn>.</li>
        <li>is the initial value of the *"WeakSet"* property of the global object.</li>
        <li>creates and initializes a new WeakSet when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified WeakSet behaviour must include a `super` call to the WeakSet constructor to create and initialize the subclass instance with the internal state necessary to support the `WeakSet.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-weakset-iterable">
        <h1>WeakSet ( [ _iterable_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _set_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%WeakSet.prototype%"*, « [[WeakSetData]] »).
          1. Set _set_.[[WeakSetData]] to a new empty List.
          1. If _iterable_ is either *undefined* or *null*, return _set_.
          1. Let _adder_ be ? Get(_set_, *"add"*).
          1. If IsCallable(_adder_) is *false*, throw a *TypeError* exception.
          1. Let _iteratorRecord_ be ? GetIterator(_iterable_, ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _set_.
            1. Let _status_ be Completion(Call(_adder_, _set_, « _next_ »)).
            1. IfAbruptCloseIterator(_status_, _iteratorRecord_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weakset-constructor">
      <h1>Properties of the WeakSet Constructor</h1>
      <p>The WeakSet constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-weakset.prototype">
        <h1>WeakSet.prototype</h1>
        <p>The initial value of `WeakSet.prototype` is the WeakSet prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weakset-prototype-object">
      <h1>Properties of the WeakSet Prototype Object</h1>
      <p>The <dfn>WeakSet prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%WeakSet.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[WeakSetData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-weakset.prototype.add">
        <h1>WeakSet.prototype.add ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[WeakSetData]]).
          1. If CanBeHeldWeakly(_value_) is *false*, throw a *TypeError* exception.
          1. For each element _e_ of _S_.[[WeakSetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, then
              1. Return _S_.
          1. Append _value_ to _S_.[[WeakSetData]].
          1. Return _S_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-weakset.prototype.constructor">
        <h1>WeakSet.prototype.constructor</h1>
        <p>The initial value of `WeakSet.prototype.constructor` is %WeakSet%.</p>
      </emu-clause>

      <emu-clause id="sec-weakset.prototype.delete">
        <h1>WeakSet.prototype.delete ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[WeakSetData]]).
          1. If CanBeHeldWeakly(_value_) is *false*, return *false*.
          1. For each element _e_ of _S_.[[WeakSetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, then
              1. Replace the element of _S_.[[WeakSetData]] whose value is _e_ with an element whose value is ~empty~.
              1. Return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>The value ~empty~ is used as a specification device to indicate that an entry has been deleted. Actual implementations may take other actions such as physically removing the entry from internal data structures.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-weakset.prototype.has">
        <h1>WeakSet.prototype.has ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Perform ? RequireInternalSlot(_S_, [[WeakSetData]]).
          1. If CanBeHeldWeakly(_value_) is *false*, return *false*.
          1. For each element _e_ of _S_.[[WeakSetData]], do
            1. If _e_ is not ~empty~ and SameValue(_e_, _value_) is *true*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-weakset.prototype-@@tostringtag" id="sec-weakset.prototype-%symbol.tostringtag%">
        <h1>WeakSet.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"WeakSet"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-weakset-instances">
      <h1>Properties of WeakSet Instances</h1>
      <p>WeakSet instances are ordinary objects that inherit properties from the WeakSet prototype. WeakSet instances also have a [[WeakSetData]] internal slot.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-abstract-operations-for-keyed-collections">
    <h1>Abstract Operations for Keyed Collections</h1>

    <emu-clause id="sec-canonicalizekeyedcollectionkey" type="abstract operation">
      <h1>
        CanonicalizeKeyedCollectionKey (
          _key_: an ECMAScript language value,
        ): an ECMAScript language value
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _key_ is *-0*<sub>𝔽</sub>, return *+0*<sub>𝔽</sub>.
        1. Return _key_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

<h1 id="sec-structured-data"></h1>
