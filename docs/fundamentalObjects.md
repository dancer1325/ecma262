# Fundamental Objects

  <emu-clause id="sec-object-objects">
    <h1>Object Objects</h1>

    <emu-clause id="sec-object-constructor">
      <h1>The Object Constructor</h1>
      <p>The Object constructor:</p>
      <ul>
        <li>is <dfn>%Object%</dfn>.</li>
        <li>is the initial value of the *"Object"* property of the global object.</li>
        <li>creates a new ordinary object when called as a constructor.</li>
        <li>performs a type conversion when called as a function rather than as a constructor.</li>
        <li>may be used as the value of an `extends` clause of a class definition.</li>
      </ul>

      <emu-clause id="sec-object-value">
        <h1>Object ( [ _value_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is neither *undefined* nor the active function object, then
            1. Return ? OrdinaryCreateFromConstructor(NewTarget, *"%Object.prototype%"*).
          1. If _value_ is either *undefined* or *null*, return OrdinaryObjectCreate(%Object.prototype%).
          1. Return ! ToObject(_value_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-object-constructor">
      <h1>Properties of the Object Constructor</h1>
      <p>The Object constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has the following additional properties:</li>
      </ul>

      <emu-clause id="sec-object.assign">
        <h1>Object.assign ( _target_, ..._sources_ )</h1>
        <p>This function copies the values of all of the enumerable own properties from one or more source objects to a _target_ object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _to_ be ? ToObject(_target_).
          1. If only one argument was passed, return _to_.
          1. For each element _nextSource_ of _sources_, do
            1. If _nextSource_ is neither *undefined* nor *null*, then
              1. Let _from_ be ! ToObject(_nextSource_).
              1. Let _keys_ be ? <emu-meta effects="user-code">_from_.[[OwnPropertyKeys]]()</emu-meta>.
              1. For each element _nextKey_ of _keys_, do
                1. Let _desc_ be ? <emu-meta effects="user-code">_from_.[[GetOwnProperty]]</emu-meta>(_nextKey_).
                1. If _desc_ is not *undefined* and _desc_.[[Enumerable]] is *true*, then
                  1. Let _propValue_ be ? Get(_from_, _nextKey_).
                  1. Perform ? Set(_to_, _nextKey_, _propValue_, *true*).
          1. Return _to_.
        </emu-alg>
        <p>The *"length"* property of this function is *2*<sub>𝔽</sub>.</p>
      </emu-clause>

      <emu-clause id="sec-object.create">
        <h1>Object.create ( _O_, _Properties_ )</h1>
        <p>This function creates a new object with a specified prototype.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object and _O_ is not *null*, throw a *TypeError* exception.
          1. Let _obj_ be OrdinaryObjectCreate(_O_).
          1. If _Properties_ is not *undefined*, then
            1. Return ? ObjectDefineProperties(_obj_, _Properties_).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.defineproperties">
        <h1>Object.defineProperties ( _O_, _Properties_ )</h1>
        <p>This function adds own properties and/or updates the attributes of existing own properties of an object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Return ? ObjectDefineProperties(_O_, _Properties_).
        </emu-alg>

        <emu-clause id="sec-objectdefineproperties" type="abstract operation">
          <h1>
            ObjectDefineProperties (
              _O_: an Object,
              _Properties_: an ECMAScript language value,
            ): either a normal completion containing an Object or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _props_ be ? ToObject(_Properties_).
            1. Let _keys_ be ? <emu-meta effects="user-code">_props_.[[OwnPropertyKeys]]()</emu-meta>.
            1. Let _descriptors_ be a new empty List.
            1. For each element _nextKey_ of _keys_, do
              1. Let _propDesc_ be ? <emu-meta effects="user-code">_props_.[[GetOwnProperty]]</emu-meta>(_nextKey_).
              1. If _propDesc_ is not *undefined* and _propDesc_.[[Enumerable]] is *true*, then
                1. Let _descObj_ be ? Get(_props_, _nextKey_).
                1. Let _desc_ be ? ToPropertyDescriptor(_descObj_).
                1. Append the Record { [[Key]]: _nextKey_, [[Descriptor]]: _desc_ } to _descriptors_.
            1. For each element _property_ of _descriptors_, do
              1. Perform ? DefinePropertyOrThrow(_O_, _property_.[[Key]], _property_.[[Descriptor]]).
            1. Return _O_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-object.defineproperty">
        <h1>Object.defineProperty ( _O_, _P_, _Attributes_ )</h1>
        <p>This function adds an own property and/or updates the attributes of an existing own property of an object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Let _key_ be ? ToPropertyKey(_P_).
          1. Let _desc_ be ? ToPropertyDescriptor(_Attributes_).
          1. Perform ? DefinePropertyOrThrow(_O_, _key_, _desc_).
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.entries">
        <h1>Object.entries ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _entryList_ be ? EnumerableOwnProperties(_obj_, ~key+value~).
          1. Return CreateArrayFromList(_entryList_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.freeze">
        <h1>Object.freeze ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return _O_.
          1. Let _status_ be ? SetIntegrityLevel(_O_, ~frozen~).
          1. If _status_ is *false*, throw a *TypeError* exception.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.fromentries" oldids="sec-create-data-property-on-object-functions">
        <h1>Object.fromEntries ( _iterable_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Perform ? RequireObjectCoercible(_iterable_).
          1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Assert: _obj_ is an extensible ordinary object with no own properties.
          1. Let _closure_ be a new Abstract Closure with parameters (_key_, _value_) that captures _obj_ and performs the following steps when called:
            1. Let _propertyKey_ be ? ToPropertyKey(_key_).
            1. Perform ! CreateDataPropertyOrThrow(_obj_, _propertyKey_, _value_).
            1. Return *undefined*.
          1. Let _adder_ be CreateBuiltinFunction(_closure_, 2, *""*, « »).
          1. Return ? AddEntriesFromIterable(_obj_, _iterable_, _adder_).
        </emu-alg>
        <emu-note>
          The function created for _adder_ is never directly accessible to ECMAScript code.
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.getownpropertydescriptor">
        <h1>Object.getOwnPropertyDescriptor ( _O_, _P_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _key_ be ? ToPropertyKey(_P_).
          1. Let _desc_ be ? <emu-meta effects="user-code">_obj_.[[GetOwnProperty]]</emu-meta>(_key_).
          1. Return FromPropertyDescriptor(_desc_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.getownpropertydescriptors">
        <h1>Object.getOwnPropertyDescriptors ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _ownKeys_ be ? <emu-meta effects="user-code">_obj_.[[OwnPropertyKeys]]()</emu-meta>.
          1. Let _descriptors_ be OrdinaryObjectCreate(%Object.prototype%).
          1. For each element _key_ of _ownKeys_, do
            1. Let _desc_ be ? <emu-meta effects="user-code">_obj_.[[GetOwnProperty]]</emu-meta>(_key_).
            1. Let _descriptor_ be FromPropertyDescriptor(_desc_).
            1. If _descriptor_ is not *undefined*, perform ! CreateDataPropertyOrThrow(_descriptors_, _key_, _descriptor_).
          1. Return _descriptors_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.getownpropertynames">
        <h1>Object.getOwnPropertyNames ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return CreateArrayFromList(? GetOwnPropertyKeys(_O_, ~string~)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.getownpropertysymbols">
        <h1>Object.getOwnPropertySymbols ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return CreateArrayFromList(? GetOwnPropertyKeys(_O_, ~symbol~)).
        </emu-alg>

        <emu-clause id="sec-getownpropertykeys" type="abstract operation">
          <h1>
            GetOwnPropertyKeys (
              _O_: an ECMAScript language value,
              _type_: ~string~ or ~symbol~,
            ): either a normal completion containing a List of property keys or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _obj_ be ? ToObject(_O_).
            1. Let _keys_ be ? <emu-meta effects="user-code">_obj_.[[OwnPropertyKeys]]()</emu-meta>.
            1. Let _nameList_ be a new empty List.
            1. For each element _nextKey_ of _keys_, do
              1. If _nextKey_ is a Symbol and _type_ is ~symbol~, or if _nextKey_ is a String and _type_ is ~string~, then
                1. Append _nextKey_ to _nameList_.
            1. Return _nameList_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-object.getprototypeof">
        <h1>Object.getPrototypeOf ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Return ? <emu-meta effects="user-code">_obj_.[[GetPrototypeOf]]()</emu-meta>.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.groupby">
        <h1>Object.groupBy ( _items_, _callback_ )</h1>
        <emu-note>
          <p>_callback_ should be a function that accepts two arguments. `groupBy` calls _callback_ once for each element in _items_, in ascending order, and constructs a new object. Each value returned by _callback_ is coerced to a property key. For each such property key, the result object has a property whose key is that property key and whose value is an array containing all the elements for which the _callback_ return value coerced to that key.</p>
          <p>_callback_ is called with two arguments: the value of the element and the index of the element.</p>
          <p>The return value of `groupBy` is an object that does not inherit from %Object.prototype%.</p>
        </emu-note>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _groups_ be ? GroupBy(_items_, _callback_, ~property~).
          1. Let _obj_ be OrdinaryObjectCreate(*null*).
          1. For each Record { [[Key]], [[Elements]] } _g_ of _groups_, do
            1. Let _elements_ be CreateArrayFromList(_g_.[[Elements]]).
            1. Perform ! CreateDataPropertyOrThrow(_obj_, _g_.[[Key]], _elements_).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.hasown">
        <h1>Object.hasOwn ( _O_, _P_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _key_ be ? ToPropertyKey(_P_).
          1. Return ? HasOwnProperty(_obj_, _key_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.is">
        <h1>Object.is ( _value1_, _value2_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return SameValue(_value1_, _value2_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.isextensible">
        <h1>Object.isExtensible ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return *false*.
          1. Return ? IsExtensible(_O_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.isfrozen">
        <h1>Object.isFrozen ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return *true*.
          1. Return ? TestIntegrityLevel(_O_, ~frozen~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.issealed">
        <h1>Object.isSealed ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return *true*.
          1. Return ? TestIntegrityLevel(_O_, ~sealed~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.keys">
        <h1>Object.keys ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _keyList_ be ? EnumerableOwnProperties(_obj_, ~key~).
          1. Return CreateArrayFromList(_keyList_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.preventextensions">
        <h1>Object.preventExtensions ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return _O_.
          1. Let _status_ be ? <emu-meta effects="user-code">_O_.[[PreventExtensions]]()</emu-meta>.
          1. If _status_ is *false*, throw a *TypeError* exception.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.prototype">
        <h1>Object.prototype</h1>
        <p>The initial value of `Object.prototype` is the Object prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-object.seal">
        <h1>Object.seal ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _O_ is not an Object, return _O_.
          1. Let _status_ be ? SetIntegrityLevel(_O_, ~sealed~).
          1. If _status_ is *false*, throw a *TypeError* exception.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.setprototypeof">
        <h1>Object.setPrototypeOf ( _O_, _proto_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Set _O_ to ? RequireObjectCoercible(_O_).
          1. If _proto_ is not an Object and _proto_ is not *null*, throw a *TypeError* exception.
          1. If _O_ is not an Object, return _O_.
          1. Let _status_ be ? <emu-meta effects="user-code">_O_.[[SetPrototypeOf]]</emu-meta>(_proto_).
          1. If _status_ is *false*, throw a *TypeError* exception.
          1. Return _O_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.values">
        <h1>Object.values ( _O_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _obj_ be ? ToObject(_O_).
          1. Let _valueList_ be ? EnumerableOwnProperties(_obj_, ~value~).
          1. Return CreateArrayFromList(_valueList_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-object-prototype-object" oldids="sec-additional-properties-of-the-object.prototype-object">
      <h1>Properties of the Object Prototype Object</h1>
      <p>The <dfn>Object prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Object.prototype%</dfn>.</li>
        <li>has an [[Extensible]] internal slot whose value is *true*.</li>
        <li>has the internal methods defined for ordinary objects, except for the [[SetPrototypeOf]] method, which is as defined in <emu-xref href="#sec-immutable-prototype-exotic-objects-setprototypeof-v"></emu-xref>. (Thus, it is an immutable prototype exotic object.)</li>
        <li>has a [[Prototype]] internal slot whose value is *null*.</li>
      </ul>

      <emu-clause id="sec-object.prototype.constructor">
        <h1>Object.prototype.constructor</h1>
        <p>The initial value of `Object.prototype.constructor` is %Object%.</p>
      </emu-clause>

      <emu-clause id="sec-object.prototype.hasownproperty">
        <h1>Object.prototype.hasOwnProperty ( _V_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. [id="step-hasownproperty-topropertykey"] Let _P_ be ? ToPropertyKey(_V_).
          1. [id="step-hasownproperty-toobject"] Let _O_ be ? ToObject(*this* value).
          1. Return ? HasOwnProperty(_O_, _P_).
        </emu-alg>
        <emu-note>
          <p>The ordering of steps <emu-xref href="#step-hasownproperty-topropertykey"></emu-xref> and <emu-xref href="#step-hasownproperty-toobject"></emu-xref> is chosen to ensure that any exception that would have been thrown by step <emu-xref href="#step-hasownproperty-topropertykey"></emu-xref> in previous editions of this specification will continue to be thrown even if the *this* value is *undefined* or *null*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.prototype.isprototypeof">
        <h1>Object.prototype.isPrototypeOf ( _V_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. [id="step-isprototypeof-check-object"] If _V_ is not an Object, return *false*.
          1. [id="step-isprototypeof-toobject"] Let _O_ be ? ToObject(*this* value).
          1. Repeat,
            1. Set _V_ to ? <emu-meta effects="user-code">_V_.[[GetPrototypeOf]]()</emu-meta>.
            1. If _V_ is *null*, return *false*.
            1. If SameValue(_O_, _V_) is *true*, return *true*.
        </emu-alg>
        <emu-note>
          <p>The ordering of steps <emu-xref href="#step-isprototypeof-check-object"></emu-xref> and <emu-xref href="#step-isprototypeof-toobject"></emu-xref> preserves the behaviour specified by previous editions of this specification for the case where _V_ is not an object and the *this* value is *undefined* or *null*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.prototype.propertyisenumerable">
        <h1>Object.prototype.propertyIsEnumerable ( _V_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. [id="step-propertyisenumerable-topropertykey"] Let _P_ be ? ToPropertyKey(_V_).
          1. [id="step-propertyisenumerable-toobject"] Let _O_ be ? ToObject(*this* value).
          1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. If _desc_ is *undefined*, return *false*.
          1. Return _desc_.[[Enumerable]].
        </emu-alg>
        <emu-note>
          <p>This method does not consider objects in the prototype chain.</p>
        </emu-note>
        <emu-note>
          <p>The ordering of steps <emu-xref href="#step-propertyisenumerable-topropertykey"></emu-xref> and <emu-xref href="#step-propertyisenumerable-toobject"></emu-xref> is chosen to ensure that any exception that would have been thrown by step <emu-xref href="#step-propertyisenumerable-topropertykey"></emu-xref> in previous editions of this specification will continue to be thrown even if the *this* value is *undefined* or *null*.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.prototype.tolocalestring">
        <h1>Object.prototype.toLocaleString ( [ _reserved1_ [ , _reserved2_ ] ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Return ? Invoke(_O_, *"toString"*).
        </emu-alg>
        <p>The optional parameters to this method are not used but are intended to correspond to the parameter pattern used by ECMA-402 `toLocaleString` methods. Implementations that do not include ECMA-402 support must not use those parameter positions for other purposes.</p>
        <emu-note>
          <p>This method provides a generic `toLocaleString` implementation for objects that have no locale-sensitive `toString` behaviour. `Array`, `Number`, `Date`, and %TypedArray% provide their own locale-sensitive `toLocaleString` methods.</p>
        </emu-note>
        <emu-note>
          <p>ECMA-402 intentionally does not provide an alternative to this default implementation.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.prototype.tostring">
        <h1>Object.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. If the *this* value is *undefined*, return *"[object Undefined]"*.
          1. If the *this* value is *null*, return *"[object Null]"*.
          1. Let _O_ be ! ToObject(*this* value).
          1. Let _isArray_ be ? IsArray(_O_).
          1. If _isArray_ is *true*, let _builtinTag_ be *"Array"*.
          1. Else if _O_ has a [[ParameterMap]] internal slot, let _builtinTag_ be *"Arguments"*.
          1. Else if _O_ has a [[Call]] internal method, let _builtinTag_ be *"Function"*.
          1. Else if _O_ has an [[ErrorData]] internal slot, let _builtinTag_ be *"Error"*.
          1. Else if _O_ has a [[BooleanData]] internal slot, let _builtinTag_ be *"Boolean"*.
          1. Else if _O_ has a [[NumberData]] internal slot, let _builtinTag_ be *"Number"*.
          1. Else if _O_ has a [[StringData]] internal slot, let _builtinTag_ be *"String"*.
          1. Else if _O_ has a [[DateValue]] internal slot, let _builtinTag_ be *"Date"*.
          1. Else if _O_ has a [[RegExpMatcher]] internal slot, let _builtinTag_ be *"RegExp"*.
          1. Else, let _builtinTag_ be *"Object"*.
          1. Let _tag_ be ? Get(_O_, %Symbol.toStringTag%).
          1. If _tag_ is not a String, set _tag_ to _builtinTag_.
          1. Return the string-concatenation of *"[object "*, _tag_, and *"]"*.
        </emu-alg>
        <emu-note>
          <p>Historically, this method was occasionally used to access the String value of the [[Class]] internal slot that was used in previous editions of this specification as a nominal type tag for various built-in objects. The above definition of `toString` preserves compatibility for legacy code that uses `toString` as a test for those specific kinds of built-in objects. It does not provide a reliable type testing mechanism for other kinds of built-in or program defined objects. In addition, programs can use %Symbol.toStringTag% in ways that will invalidate the reliability of such legacy type tests.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-object.prototype.valueof">
        <h1>Object.prototype.valueOf ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ToObject(*this* value).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object.prototype.__proto__" legacy normative-optional>
        <h1>Object.prototype.__proto__</h1>
        <p>`Object.prototype.__proto__` is an accessor property with attributes { [[Enumerable]]: *false*, [[Configurable]]: *true* }. The [[Get]] and [[Set]] attributes are defined as follows:</p>

        <emu-clause id="sec-get-object.prototype.__proto__">
          <h1>get Object.prototype.__proto__</h1>
          <p>The value of the [[Get]] attribute is a built-in function that requires no arguments. It performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? ToObject(*this* value).
            1. Return ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]()</emu-meta>.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-set-object.prototype.__proto__">
          <h1>set Object.prototype.__proto__</h1>
          <p>The value of the [[Set]] attribute is a built-in function that takes an argument _proto_. It performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? RequireObjectCoercible(*this* value).
            1. If _proto_ is not an Object and _proto_ is not *null*, return *undefined*.
            1. If _O_ is not an Object, return *undefined*.
            1. Let _status_ be ? <emu-meta effects="user-code">_O_.[[SetPrototypeOf]]</emu-meta>(_proto_).
            1. If _status_ is *false*, throw a *TypeError* exception.
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-object.prototype-legacy-accessor-methods" legacy normative-optional>
        <h1>Legacy Object.prototype Accessor Methods</h1>

        <emu-clause id="sec-object.prototype.__defineGetter__">
          <h1>Object.prototype.__defineGetter__ ( _P_, _getter_ )</h1>
          <p>This method performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? ToObject(*this* value).
            1. If IsCallable(_getter_) is *false*, throw a *TypeError* exception.
            1. Let _desc_ be PropertyDescriptor { [[Get]]: _getter_, [[Enumerable]]: *true*, [[Configurable]]: *true* }.
            1. Let _key_ be ? ToPropertyKey(_P_).
            1. Perform ? DefinePropertyOrThrow(_O_, _key_, _desc_).
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object.prototype.__defineSetter__">
          <h1>Object.prototype.__defineSetter__ ( _P_, _setter_ )</h1>
          <p>This method performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? ToObject(*this* value).
            1. If IsCallable(_setter_) is *false*, throw a *TypeError* exception.
            1. Let _desc_ be PropertyDescriptor { [[Set]]: _setter_, [[Enumerable]]: *true*, [[Configurable]]: *true* }.
            1. Let _key_ be ? ToPropertyKey(_P_).
            1. Perform ? DefinePropertyOrThrow(_O_, _key_, _desc_).
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object.prototype.__lookupGetter__">
          <h1>Object.prototype.__lookupGetter__ ( _P_ )</h1>
          <p>This method performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? ToObject(*this* value).
            1. Let _key_ be ? ToPropertyKey(_P_).
            1. Repeat,
              1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_key_).
              1. If _desc_ is not *undefined*, then
                1. If IsAccessorDescriptor(_desc_) is *true*, return _desc_.[[Get]].
                1. Return *undefined*.
              1. Set _O_ to ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]()</emu-meta>.
              1. If _O_ is *null*, return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object.prototype.__lookupSetter__">
          <h1>Object.prototype.__lookupSetter__ ( _P_ )</h1>
          <p>This method performs the following steps when called:</p>
          <emu-alg>
            1. Let _O_ be ? ToObject(*this* value).
            1. Let _key_ be ? ToPropertyKey(_P_).
            1. Repeat,
              1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_key_).
              1. If _desc_ is not *undefined*, then
                1. If IsAccessorDescriptor(_desc_) is *true*, return _desc_.[[Set]].
                1. Return *undefined*.
              1. Set _O_ to ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]()</emu-meta>.
              1. If _O_ is *null*, return *undefined*.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-object-instances">
      <h1>Properties of Object Instances</h1>
      <p>Object instances have no special properties beyond those inherited from the Object prototype object.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-function-objects">
    <h1>Function Objects</h1>

    <emu-clause id="sec-function-constructor">
      <h1>The Function Constructor</h1>
      <p>The Function constructor:</p>
      <ul>
        <li>is <dfn>%Function%</dfn>.</li>
        <li>is the initial value of the *"Function"* property of the global object.</li>
        <li>creates and initializes a new function object when called as a function rather than as a constructor. Thus the function call `Function(…)` is equivalent to the object creation expression `new Function(…)` with the same arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Function behaviour must include a `super` call to the Function constructor to create and initialize a subclass instance with the internal slots necessary for built-in function behaviour. All ECMAScript syntactic forms for defining function objects create instances of Function. There is no syntactic means to create instances of Function subclasses except for the built-in GeneratorFunction, AsyncFunction, and AsyncGeneratorFunction subclasses.</li>
      </ul>

      <emu-clause id="sec-function-p1-p2-pn-body">
        <h1>Function ( ..._parameterArgs_, _bodyArg_ )</h1>
        <p>The last argument (if any) specifies the body (executable code) of a function; any preceding arguments specify formal parameters.</p>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _C_ be the active function object.
          1. If _bodyArg_ is not present, set _bodyArg_ to the empty String.
          1. Return ? CreateDynamicFunction(_C_, NewTarget, ~normal~, _parameterArgs_, _bodyArg_).
        </emu-alg>
        <emu-note>
          <p>It is permissible but not necessary to have one argument for each formal parameter to be specified. For example, all three of the following expressions produce the same result:</p>
          <pre><code class="javascript">
            new Function("a", "b", "c", "return a+b+c")
            new Function("a, b, c", "return a+b+c")
            new Function("a,b", "c", "return a+b+c")
          </code></pre>
        </emu-note>

        <emu-clause id="sec-createdynamicfunction" type="abstract operation" oldids="table-dynamic-function-sourcetext-prefixes">
          <h1>
            CreateDynamicFunction (
              _constructor_: a constructor,
              _newTarget_: a constructor or *undefined*,
              _kind_: ~normal~, ~generator~, ~async~, or ~async-generator~,
              _parameterArgs_: a List of ECMAScript language values,
              _bodyArg_: an ECMAScript language value,
            ): either a normal completion containing an ECMAScript function object or a throw completion
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>_constructor_ is the constructor function that is performing this action. _newTarget_ is the constructor that `new` was initially applied to. _parameterArgs_ and _bodyArg_ reflect the argument values that were passed to _constructor_.</dd>
          </dl>
          <emu-alg>
            1. If _newTarget_ is *undefined*, set _newTarget_ to _constructor_.
            1. If _kind_ is ~normal~, then
              1. Let _prefix_ be *"function"*.
              1. Let _exprSym_ be the grammar symbol |FunctionExpression|.
              1. Let _bodySym_ be the grammar symbol |FunctionBody[~Yield, ~Await]|.
              1. Let _parameterSym_ be the grammar symbol |FormalParameters[~Yield, ~Await]|.
              1. Let _fallbackProto_ be *"%Function.prototype%"*.
            1. Else if _kind_ is ~generator~, then
              1. Let _prefix_ be *"function\*"*.
              1. Let _exprSym_ be the grammar symbol |GeneratorExpression|.
              1. Let _bodySym_ be the grammar symbol |GeneratorBody|.
              1. Let _parameterSym_ be the grammar symbol |FormalParameters[+Yield, ~Await]|.
              1. Let _fallbackProto_ be *"%GeneratorFunction.prototype%"*.
            1. Else if _kind_ is ~async~, then
              1. Let _prefix_ be *"async function"*.
              1. Let _exprSym_ be the grammar symbol |AsyncFunctionExpression|.
              1. Let _bodySym_ be the grammar symbol |AsyncFunctionBody|.
              1. Let _parameterSym_ be the grammar symbol |FormalParameters[~Yield, +Await]|.
              1. Let _fallbackProto_ be *"%AsyncFunction.prototype%"*.
            1. Else,
              1. Assert: _kind_ is ~async-generator~.
              1. Let _prefix_ be *"async function\*"*.
              1. Let _exprSym_ be the grammar symbol |AsyncGeneratorExpression|.
              1. Let _bodySym_ be the grammar symbol |AsyncGeneratorBody|.
              1. Let _parameterSym_ be the grammar symbol |FormalParameters[+Yield, +Await]|.
              1. Let _fallbackProto_ be *"%AsyncGeneratorFunction.prototype%"*.
            1. Let _argCount_ be the number of elements in _parameterArgs_.
            1. Let _parameterStrings_ be a new empty List.
            1. For each element _arg_ of _parameterArgs_, do
              1. Append ? ToString(_arg_) to _parameterStrings_.
            1. Let _bodyString_ be ? ToString(_bodyArg_).
            1. Let _currentRealm_ be the current Realm Record.
            1. Perform ? HostEnsureCanCompileStrings(_currentRealm_, _parameterStrings_, _bodyString_, *false*).
            1. Let _P_ be the empty String.
            1. If _argCount_ > 0, then
              1. Set _P_ to _parameterStrings_[0].
              1. Let _k_ be 1.
              1. Repeat, while _k_ &lt; _argCount_,
                1. Let _nextArgString_ be _parameterStrings_[_k_].
                1. Set _P_ to the string-concatenation of _P_, *","* (a comma), and _nextArgString_.
                1. Set _k_ to _k_ + 1.
            1. Let _bodyParseString_ be the string-concatenation of 0x000A (LINE FEED), _bodyString_, and 0x000A (LINE FEED).
            1. Let _sourceString_ be the string-concatenation of _prefix_, *" anonymous("*, _P_, 0x000A (LINE FEED), *") {"*, _bodyParseString_, and *"}"*.
            1. Let _sourceText_ be StringToCodePoints(_sourceString_).
            1. Let _parameters_ be ParseText(_P_, _parameterSym_).
            1. If _parameters_ is a List of errors, throw a *SyntaxError* exception.
            1. Let _body_ be ParseText(_bodyParseString_, _bodySym_).
            1. If _body_ is a List of errors, throw a *SyntaxError* exception.
            1. NOTE: The parameters and body are parsed separately to ensure that each is valid alone. For example, `new Function("/*", "*/ ) {")` does not evaluate to a function.
            1. NOTE: If this step is reached, _sourceText_ must have the syntax of _exprSym_ (although the reverse implication does not hold). The purpose of the next two steps is to enforce any Early Error rules which apply to _exprSym_ directly.
            1. Let _expr_ be ParseText(_sourceText_, _exprSym_).
            1. If _expr_ is a List of errors, throw a *SyntaxError* exception.
            1. Let _proto_ be ? GetPrototypeFromConstructor(_newTarget_, _fallbackProto_).
            1. Let _env_ be _currentRealm_.[[GlobalEnv]].
            1. Let _privateEnv_ be *null*.
            1. Let _F_ be OrdinaryFunctionCreate(_proto_, _sourceText_, _parameters_, _body_, ~non-lexical-this~, _env_, _privateEnv_).
            1. Perform SetFunctionName(_F_, *"anonymous"*).
            1. If _kind_ is ~generator~, then
              1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
              1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
            1. Else if _kind_ is ~async-generator~, then
              1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
              1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
            1. Else if _kind_ is ~normal~, then
              1. Perform MakeConstructor(_F_).
            1. NOTE: Functions whose _kind_ is ~async~ are not constructable and do not have a [[Construct]] internal method or a *"prototype"* property.
            1. Return _F_.
          </emu-alg>
          <emu-note>
            <p>CreateDynamicFunction defines a *"prototype"* property on any function it creates whose _kind_ is not ~async~ to provide for the possibility that the function will be used as a constructor.</p>
          </emu-note>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-function-constructor">
      <h1>Properties of the Function Constructor</h1>
      <p>The Function constructor:</p>
      <ul>
        <li>is itself a built-in function object.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li oldids="sec-function.length">has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-function.prototype">
        <h1>Function.prototype</h1>
        <p>The value of `Function.prototype` is the Function prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-function-prototype-object">
      <h1>Properties of the Function Prototype Object</h1>
      <p>The <dfn>Function prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Function.prototype%</dfn>.</li>
        <li>is itself a built-in function object.</li>
        <li>accepts any arguments and returns *undefined* when invoked.</li>
        <li>does not have a [[Construct]] internal method; it cannot be used as a constructor with the `new` operator.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>does not have a *"prototype"* property.</li>
        <li>has a *"length"* property whose value is *+0*<sub>𝔽</sub>.</li>
        <li>has a *"name"* property whose value is the empty String.</li>
      </ul>
      <emu-note>
        <p>The Function prototype object is specified to be a function object to ensure compatibility with ECMAScript code that was created prior to the ECMAScript 2015 specification.</p>
      </emu-note>

      <emu-clause id="sec-function.prototype.apply">
        <h1>Function.prototype.apply ( _thisArg_, _argArray_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _func_ be the *this* value.
          1. If IsCallable(_func_) is *false*, throw a *TypeError* exception.
          1. If _argArray_ is either *undefined* or *null*, then
            1. Perform PrepareForTailCall().
            1. Return ? Call(_func_, _thisArg_).
          1. Let _argList_ be ? CreateListFromArrayLike(_argArray_).
          1. Perform PrepareForTailCall().
          1. [id="step-function-proto-apply-call"] Return ? Call(_func_, _thisArg_, _argList_).
        </emu-alg>
        <emu-note>
          <p>The _thisArg_ value is passed without modification as the *this* value. This is a change from Edition 3, where an *undefined* or *null* _thisArg_ is replaced with the global object and ToObject is applied to all other values and that result is passed as the *this* value. Even though the _thisArg_ is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p>
        </emu-note>
        <emu-note>
          <p>If _func_ is either an arrow function or a bound function exotic object, then the _thisArg_ will be ignored by the function [[Call]] in step <emu-xref href="#step-function-proto-apply-call"></emu-xref>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-function.prototype.bind">
        <h1>Function.prototype.bind ( _thisArg_, ..._args_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _Target_ be the *this* value.
          1. If IsCallable(_Target_) is *false*, throw a *TypeError* exception.
          1. Let _F_ be ? BoundFunctionCreate(_Target_, _thisArg_, _args_).
          1. Let _L_ be 0.
          1. Let _targetHasLength_ be ? HasOwnProperty(_Target_, *"length"*).
          1. If _targetHasLength_ is *true*, then
            1. Let _targetLen_ be ? Get(_Target_, *"length"*).
            1. If _targetLen_ is a Number, then
              1. If _targetLen_ is *+∞*<sub>𝔽</sub>, then
                1. Set _L_ to +∞.
              1. Else if _targetLen_ is *-∞*<sub>𝔽</sub>, then
                1. Set _L_ to 0.
              1. Else,
                1. Let _targetLenAsInt_ be ! ToIntegerOrInfinity(_targetLen_).
                1. Assert: _targetLenAsInt_ is finite.
                1. Let _argCount_ be the number of elements in _args_.
                1. Set _L_ to max(_targetLenAsInt_ - _argCount_, 0).
          1. Perform SetFunctionLength(_F_, _L_).
          1. Let _targetName_ be ? Get(_Target_, *"name"*).
          1. If _targetName_ is not a String, set _targetName_ to the empty String.
          1. Perform SetFunctionName(_F_, _targetName_, *"bound"*).
          1. Return _F_.
        </emu-alg>
        <emu-note>
          <p>Function objects created using `Function.prototype.bind` are exotic objects. They also do not have a *"prototype"* property.</p>
        </emu-note>
        <emu-note>
          <p>If _Target_ is either an arrow function or a bound function exotic object, then the _thisArg_ passed to this method will not be used by subsequent calls to _F_.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-function.prototype.call">
        <h1>Function.prototype.call ( _thisArg_, ..._args_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _func_ be the *this* value.
          1. If IsCallable(_func_) is *false*, throw a *TypeError* exception.
          1. Perform PrepareForTailCall().
          1. [id="step-function-proto-call-call"] Return ? Call(_func_, _thisArg_, _args_).
        </emu-alg>
        <emu-note>
          <p>The _thisArg_ value is passed without modification as the *this* value. This is a change from Edition 3, where an *undefined* or *null* _thisArg_ is replaced with the global object and ToObject is applied to all other values and that result is passed as the *this* value. Even though the _thisArg_ is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p>
        </emu-note>
        <emu-note>
          <p>If _func_ is either an arrow function or a bound function exotic object, then the _thisArg_ will be ignored by the function [[Call]] in step <emu-xref href="#step-function-proto-call-call"></emu-xref>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-function.prototype.constructor">
        <h1>Function.prototype.constructor</h1>
        <p>The initial value of `Function.prototype.constructor` is %Function%.</p>
      </emu-clause>

      <emu-clause id="sec-function.prototype.tostring">
        <h1>Function.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _func_ be the *this* value.
          1. If _func_ is an Object, _func_ has a [[SourceText]] internal slot, _func_.[[SourceText]] is a sequence of Unicode code points, and HostHasSourceTextAvailable(_func_) is *true*, then
            1. Return CodePointsToString(_func_.[[SourceText]]).
          1. If _func_ is a <emu-xref href="#sec-built-in-function-objects">built-in function object</emu-xref>, return an implementation-defined String source code representation of _func_. The representation must have the syntax of a |NativeFunction|. Additionally, if _func_ has an [[InitialName]] internal slot and _func_.[[InitialName]] is a String, the portion of the returned String that would be matched by |NativeFunctionAccessor?| |PropertyName| must be the value of _func_.[[InitialName]].
          1. If _func_ is an Object and IsCallable(_func_) is *true*, return an implementation-defined String source code representation of _func_. The representation must have the syntax of a |NativeFunction|.
          1. Throw a *TypeError* exception.
        </emu-alg>

        <emu-grammar type="definition">
          NativeFunction :
            `function` NativeFunctionAccessor? PropertyName[~Yield, ~Await]? `(` FormalParameters[~Yield, ~Await] `)` `{` `[` `native` `code` `]` `}`

          NativeFunctionAccessor :
            `get`
            `set`
        </emu-grammar>
      </emu-clause>

      <emu-clause oldids="sec-function.prototype-@@hasinstance" id="sec-function.prototype-%symbol.hasinstance%">
        <h1>Function.prototype [ %Symbol.hasInstance% ] ( _V_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _F_ be the *this* value.
          1. Return ? OrdinaryHasInstance(_F_, _V_).
        </emu-alg>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>This is the default implementation of `%Symbol.hasInstance%` that most functions inherit. `%Symbol.hasInstance%` is called by the `instanceof` operator to determine whether a value is an instance of a specific constructor. An expression such as</p>
          <pre><code class="javascript">
            v instanceof F
          </code></pre>
          <p>evaluates as</p>
          <pre><code class="javascript">
            F[%Symbol.hasInstance%](v)
          </code></pre>
          <p>A constructor function can control which objects are recognized as its instances by `instanceof` by exposing a different `%Symbol.hasInstance%` method on the function.</p>
        </emu-note>
        <p>This property is non-writable and non-configurable to prevent tampering that could be used to globally expose the target function of a bound function.</p>
        <p>The value of the *"name"* property of this method is *"[Symbol.hasInstance]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-function-instances">
      <h1>Function Instances</h1>
      <p>Every Function instance is an ECMAScript function object and has the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>. Function objects created using the `Function.prototype.bind` method (<emu-xref href="#sec-function.prototype.bind"></emu-xref>) have the internal slots listed in <emu-xref href="#table-internal-slots-of-bound-function-exotic-objects"></emu-xref>.</p>
      <p>Function instances have the following properties:</p>

      <emu-clause id="sec-function-instances-length">
        <h1>length</h1>
        <p>The value of the *"length"* property is an integral Number that indicates the typical number of arguments expected by the function. However, the language permits the function to be invoked with some other number of arguments. The behaviour of a function when invoked on a number of arguments other than the number specified by its *"length"* property depends on the function. This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-function-instances-name">
        <h1>name</h1>
        <p>The value of the *"name"* property is a String that is descriptive of the function. The name has no semantic significance but is typically a variable or property name that is used to refer to the function at its point of definition in ECMAScript source text. This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        <p>Anonymous functions objects that do not have a contextual name associated with them by this specification use the empty String as the value of the *"name"* property.</p>
      </emu-clause>

      <emu-clause id="sec-function-instances-prototype">
        <h1>prototype</h1>
        <p>Function instances that can be used as a constructor have a *"prototype"* property. Whenever such a Function instance is created another ordinary object is also created and is the initial value of the function's *"prototype"* property. Unless otherwise specified, the value of the *"prototype"* property is used to initialize the [[Prototype]] internal slot of the object created when that function is invoked as a constructor.</p>
        <p>This property has the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>Function objects created using `Function.prototype.bind`, or by evaluating a |MethodDefinition| (that is not a |GeneratorMethod| or |AsyncGeneratorMethod|) or an |ArrowFunction| do not have a *"prototype"* property.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-hosthassourcetextavailable" type="host-defined abstract operation">
      <h1>
        HostHasSourceTextAvailable (
          _func_: a function object,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It allows host environments to prevent the source text from being provided for _func_.</dd>
      </dl>
      <p>An implementation of HostHasSourceTextAvailable must conform to the following requirements:</p>
      <ul>
        <li>It must be deterministic with respect to its parameters. Each time it is called with a specific _func_ as its argument, it must return the same result.</li>
      </ul>
      <p>The default implementation of HostHasSourceTextAvailable is to return *true*.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-boolean-objects">
    <h1>Boolean Objects</h1>

    <emu-clause id="sec-boolean-constructor">
      <h1>The Boolean Constructor</h1>
      <p>The Boolean constructor:</p>
      <ul>
        <li>is <dfn>%Boolean%</dfn>.</li>
        <li>is the initial value of the *"Boolean"* property of the global object.</li>
        <li>creates and initializes a new Boolean object when called as a constructor.</li>
        <li>performs a type conversion when called as a function rather than as a constructor.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Boolean behaviour must include a `super` call to the Boolean constructor to create and initialize the subclass instance with a [[BooleanData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-boolean-constructor-boolean-value">
        <h1>Boolean ( _value_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _b_ be ToBoolean(_value_).
          1. If NewTarget is *undefined*, return _b_.
          1. Let _O_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Boolean.prototype%"*, « [[BooleanData]] »).
          1. Set _O_.[[BooleanData]] to _b_.
          1. Return _O_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-boolean-constructor">
      <h1>Properties of the Boolean Constructor</h1>
      <p>The Boolean constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-boolean.prototype">
        <h1>Boolean.prototype</h1>
        <p>The initial value of `Boolean.prototype` is the Boolean prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-boolean-prototype-object">
      <h1>Properties of the Boolean Prototype Object</h1>
      <p>The <dfn>Boolean prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Boolean.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is itself a Boolean object; it has a [[BooleanData]] internal slot with the value *false*.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>

      <emu-clause id="sec-boolean.prototype.constructor">
        <h1>Boolean.prototype.constructor</h1>
        <p>The initial value of `Boolean.prototype.constructor` is %Boolean%.</p>
      </emu-clause>

      <emu-clause id="sec-boolean.prototype.tostring">
        <h1>Boolean.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _b_ be ? ThisBooleanValue(*this* value).
          1. If _b_ is *true*, return *"true"*; else return *"false"*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-boolean.prototype.valueof">
        <h1>Boolean.prototype.valueOf ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ThisBooleanValue(*this* value).
        </emu-alg>

        <emu-clause id="sec-thisbooleanvalue" type="abstract operation" oldids="thisbooleanvalue">
          <h1>
            ThisBooleanValue (
              _value_: an ECMAScript language value,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _value_ is a Boolean, return _value_.
            1. If _value_ is an Object and _value_ has a [[BooleanData]] internal slot, then
              1. Let _b_ be _value_.[[BooleanData]].
              1. Assert: _b_ is a Boolean.
              1. Return _b_.
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-boolean-instances">
      <h1>Properties of Boolean Instances</h1>
      <p>Boolean instances are ordinary objects that inherit properties from the Boolean prototype object. Boolean instances have a [[BooleanData]] internal slot. The [[BooleanData]] internal slot is the Boolean value represented by this Boolean object.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-symbol-objects">
    <h1>Symbol Objects</h1>

    <emu-clause id="sec-symbol-constructor">
      <h1>The Symbol Constructor</h1>
      <p>The Symbol constructor:</p>
      <ul>
        <li>is <dfn>%Symbol%</dfn>.</li>
        <li>is the initial value of the *"Symbol"* property of the global object.</li>
        <li>returns a new Symbol value when called as a function.</li>
        <li>is not intended to be used with the `new` operator.</li>
        <li>is not intended to be subclassed.</li>
        <li>may be used as the value of an `extends` clause of a class definition but a `super` call to it will cause an exception.</li>
      </ul>

      <emu-clause id="sec-symbol-description">
        <h1>Symbol ( [ _description_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is not *undefined*, throw a *TypeError* exception.
          1. If _description_ is *undefined*, let _descString_ be *undefined*.
          1. Else, let _descString_ be ? ToString(_description_).
          1. Return a new Symbol whose [[Description]] is _descString_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-symbol-constructor">
      <h1>Properties of the Symbol Constructor</h1>
      <p>The Symbol constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-symbol.asynciterator">
        <h1>Symbol.asyncIterator</h1>
        <p>The initial value of `Symbol.asyncIterator` is the well-known symbol %Symbol.asyncIterator% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.for">
        <h1>Symbol.for ( _key_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _stringKey_ be ? ToString(_key_).
          1. For each element _e_ of the GlobalSymbolRegistry List, do
            1. If _e_.[[Key]] is _stringKey_, return _e_.[[Symbol]].
          1. Assert: GlobalSymbolRegistry does not currently contain an entry for _stringKey_.
          1. Let _newSymbol_ be a new Symbol whose [[Description]] is _stringKey_.
          1. Append the Record { [[Key]]: _stringKey_, [[Symbol]]: _newSymbol_ } to the GlobalSymbolRegistry List.
          1. Return _newSymbol_.
        </emu-alg>
        <p>The GlobalSymbolRegistry is an append-only List that is globally available. It is shared by all realms. Prior to the evaluation of any ECMAScript code, it is initialized as a new empty List. Elements of the GlobalSymbolRegistry are Records with the structure defined in <emu-xref href="#table-globalsymbolregistry-record-fields"></emu-xref>.</p>
        <emu-table id="table-globalsymbolregistry-record-fields" caption="GlobalSymbolRegistry Record Fields" oldids="table-44">
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
                  Usage
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                [[Key]]
              </td>
              <td>
                a String
              </td>
              <td>
                A string key used to globally identify a Symbol.
              </td>
            </tr>
            <tr>
              <td>
                [[Symbol]]
              </td>
              <td>
                a Symbol
              </td>
              <td>
                A symbol that can be retrieved from any realm.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-symbol.hasinstance">
        <h1>Symbol.hasInstance</h1>
        <p>The initial value of `Symbol.hasInstance` is the well-known symbol %Symbol.hasInstance% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.isconcatspreadable">
        <h1>Symbol.isConcatSpreadable</h1>
        <p>The initial value of `Symbol.isConcatSpreadable` is the well-known symbol %Symbol.isConcatSpreadable% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.iterator">
        <h1>Symbol.iterator</h1>
        <p>The initial value of `Symbol.iterator` is the well-known symbol %Symbol.iterator% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.keyfor">
        <h1>Symbol.keyFor ( _sym_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _sym_ is not a Symbol, throw a *TypeError* exception.
          1. Return KeyForSymbol(_sym_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-symbol.match">
        <h1>Symbol.match</h1>
        <p>The initial value of `Symbol.match` is the well-known symbol %Symbol.match% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.matchall">
        <h1>Symbol.matchAll</h1>
        <p>The initial value of `Symbol.matchAll` is the well-known symbol %Symbol.matchAll% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.prototype">
        <h1>Symbol.prototype</h1>
        <p>The initial value of `Symbol.prototype` is the Symbol prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.replace">
        <h1>Symbol.replace</h1>
        <p>The initial value of `Symbol.replace` is the well-known symbol %Symbol.replace% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.search">
        <h1>Symbol.search</h1>
        <p>The initial value of `Symbol.search` is the well-known symbol %Symbol.search% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.species">
        <h1>Symbol.species</h1>
        <p>The initial value of `Symbol.species` is the well-known symbol %Symbol.species% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.split">
        <h1>Symbol.split</h1>
        <p>The initial value of `Symbol.split` is the well-known symbol %Symbol.split% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.toprimitive">
        <h1>Symbol.toPrimitive</h1>
        <p>The initial value of `Symbol.toPrimitive` is the well-known symbol %Symbol.toPrimitive% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.tostringtag">
        <h1>Symbol.toStringTag</h1>
        <p>The initial value of `Symbol.toStringTag` is the well-known symbol %Symbol.toStringTag% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.unscopables">
        <h1>Symbol.unscopables</h1>
        <p>The initial value of `Symbol.unscopables` is the well-known symbol %Symbol.unscopables% (<emu-xref href="#table-well-known-symbols"></emu-xref>).</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-symbol-prototype-object">
      <h1>Properties of the Symbol Prototype Object</h1>
      <p>The <dfn>Symbol prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Symbol.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a Symbol instance and does not have a [[SymbolData]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>

      <emu-clause id="sec-symbol.prototype.constructor">
        <h1>Symbol.prototype.constructor</h1>
        <p>The initial value of `Symbol.prototype.constructor` is %Symbol%.</p>
      </emu-clause>

      <emu-clause id="sec-symbol.prototype.description">
        <h1>get Symbol.prototype.description</h1>
        <p>`Symbol.prototype.description` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _s_ be the *this* value.
          1. Let _sym_ be ? ThisSymbolValue(_s_).
          1. Return _sym_.[[Description]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-symbol.prototype.tostring">
        <h1>Symbol.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _sym_ be ? ThisSymbolValue(*this* value).
          1. Return SymbolDescriptiveString(_sym_).
        </emu-alg>

        <emu-clause id="sec-symboldescriptivestring" type="abstract operation">
          <h1>
            SymbolDescriptiveString (
              _sym_: a Symbol,
            ): a String
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _desc_ be _sym_'s [[Description]] value.
            1. If _desc_ is *undefined*, set _desc_ to the empty String.
            1. Assert: _desc_ is a String.
            1. Return the string-concatenation of *"Symbol("*, _desc_, and *")"*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-symbol.prototype.valueof">
        <h1>Symbol.prototype.valueOf ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ThisSymbolValue(*this* value).
        </emu-alg>

        <emu-clause id="sec-thissymbolvalue" type="abstract operation" oldids="thissymbolvalue">
          <h1>
            ThisSymbolValue (
              _value_: an ECMAScript language value,
            ): either a normal completion containing a Symbol or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If _value_ is a Symbol, return _value_.
            1. If _value_ is an Object and _value_ has a [[SymbolData]] internal slot, then
              1. Let _s_ be _value_.[[SymbolData]].
              1. Assert: _s_ is a Symbol.
              1. Return _s_.
            1. Throw a *TypeError* exception.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause oldids="sec-symbol.prototype-@@toprimitive" id="sec-symbol.prototype-%symbol.toprimitive%">
        <h1>Symbol.prototype [ %Symbol.toPrimitive% ] ( _hint_ )</h1>
        <p>This method is called by ECMAScript language operators to convert a Symbol object to a primitive value.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Return ? ThisSymbolValue(*this* value).
        </emu-alg>
        <emu-note>
          <p>The argument is ignored.</p>
        </emu-note>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        <p>The value of the *"name"* property of this method is *"[Symbol.toPrimitive]"*.</p>
      </emu-clause>

      <emu-clause oldids="sec-symbol.prototype-@@tostringtag" id="sec-symbol.prototype-%symbol.tostringtag%">
        <h1>Symbol.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"Symbol"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-symbol-instances">
      <h1>Properties of Symbol Instances</h1>
      <p>Symbol instances are ordinary objects that inherit properties from the Symbol prototype object. Symbol instances have a [[SymbolData]] internal slot. The [[SymbolData]] internal slot is the Symbol value represented by this Symbol object.</p>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-symbols">
      <h1>Abstract Operations for Symbols</h1>

      <emu-clause id="sec-keyforsymbol" type="abstract operation">
        <h1>
          KeyForSymbol (
            _sym_: a Symbol,
          ): a String or *undefined*
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>If _sym_ is in the GlobalSymbolRegistry (see <emu-xref href="#sec-symbol.for"></emu-xref>) the String used to register _sym_ will be returned.</dd>
        </dl>
        <emu-alg>
          1. For each element _e_ of the GlobalSymbolRegistry List, do
            1. If SameValue(_e_.[[Symbol]], _sym_) is *true*, return _e_.[[Key]].
          1. Assert: GlobalSymbolRegistry does not currently contain an entry for _sym_.
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-error-objects">
    <h1>Error Objects</h1>
    <p>Instances of Error objects are thrown as exceptions when runtime errors occur. The Error objects may also serve as base objects for user-defined exception classes.</p>
    <p>When an ECMAScript implementation detects a runtime error, it throws a new instance of one of the _NativeError_ objects defined in <emu-xref href="#sec-native-error-types-used-in-this-standard"></emu-xref> or a new instance of the AggregateError object defined in <emu-xref href="#sec-aggregate-error-objects"></emu-xref>.</p>

    <emu-clause id="sec-error-constructor">
      <h1>The Error Constructor</h1>
      <p>The Error constructor:</p>
      <ul>
        <li>is <dfn>%Error%</dfn>.</li>
        <li>is the initial value of the *"Error"* property of the global object.</li>
        <li>creates and initializes a new Error object when called as a function rather than as a constructor. Thus the function call `Error(…)` is equivalent to the object creation expression `new Error(…)` with the same arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Error behaviour must include a `super` call to the Error constructor to create and initialize subclass instances with an [[ErrorData]] internal slot.</li>
      </ul>

      <emu-clause id="sec-error-message">
        <h1>Error ( _message_ [ , _options_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, let _newTarget_ be the active function object; else let _newTarget_ be NewTarget.
          1. Let _O_ be ? OrdinaryCreateFromConstructor(_newTarget_, *"%Error.prototype%"*, « [[ErrorData]] »).
          1. If _message_ is not *undefined*, then
            1. Let _msg_ be ? ToString(_message_).
            1. Perform CreateNonEnumerableDataPropertyOrThrow(_O_, *"message"*, _msg_).
          1. Perform ? InstallErrorCause(_O_, _options_).
          1. Return _O_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-error-constructor">
      <h1>Properties of the Error Constructor</h1>
      <p>The Error constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-error.prototype">
        <h1>Error.prototype</h1>
        <p>The initial value of `Error.prototype` is the Error prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-error-prototype-object">
      <h1>Properties of the Error Prototype Object</h1>
      <p>The <dfn>Error prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%Error.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not an Error instance and does not have an [[ErrorData]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      </ul>

      <emu-clause id="sec-error.prototype.constructor">
        <h1>Error.prototype.constructor</h1>
        <p>The initial value of `Error.prototype.constructor` is %Error%.</p>
      </emu-clause>

      <emu-clause id="sec-error.prototype.message">
        <h1>Error.prototype.message</h1>
        <p>The initial value of `Error.prototype.message` is the empty String.</p>
      </emu-clause>

      <emu-clause id="sec-error.prototype.name">
        <h1>Error.prototype.name</h1>
        <p>The initial value of `Error.prototype.name` is *"Error"*.</p>
      </emu-clause>

      <emu-clause id="sec-error.prototype.tostring">
        <h1>Error.prototype.toString ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Let _name_ be ? Get(_O_, *"name"*).
          1. If _name_ is *undefined*, set _name_ to *"Error"*; otherwise set _name_ to ? ToString(_name_).
          1. Let _msg_ be ? Get(_O_, *"message"*).
          1. If _msg_ is *undefined*, set _msg_ to the empty String; otherwise set _msg_ to ? ToString(_msg_).
          1. If _name_ is the empty String, return _msg_.
          1. If _msg_ is the empty String, return _name_.
          1. Return the string-concatenation of _name_, the code unit 0x003A (COLON), the code unit 0x0020 (SPACE), and _msg_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-error-instances">
      <h1>Properties of Error Instances</h1>
      <p>Error instances are ordinary objects that inherit properties from the Error prototype object and have an [[ErrorData]] internal slot whose value is *undefined*. The only specified uses of [[ErrorData]] is to identify Error, AggregateError, and _NativeError_ instances as Error objects within `Object.prototype.toString`.</p>
    </emu-clause>

    <emu-clause id="sec-native-error-types-used-in-this-standard">
      <h1>Native Error Types Used in This Standard</h1>
      <p>A new instance of one of the _NativeError_ objects below or of the AggregateError object is thrown when a runtime error is detected. All _NativeError_ objects share the same structure, as described in <emu-xref href="#sec-nativeerror-object-structure"></emu-xref>.</p>

      <emu-clause id="sec-native-error-types-used-in-this-standard-evalerror">
        <h1>EvalError</h1>
        <p>The EvalError constructor is <dfn>%EvalError%</dfn>.</p>
        <p>This exception is not currently used within this specification. This object remains for compatibility with previous editions of this specification.</p>
      </emu-clause>

      <emu-clause id="sec-native-error-types-used-in-this-standard-rangeerror">
        <h1>RangeError</h1>
        <p>The RangeError constructor is <dfn>%RangeError%</dfn>.</p>
        <p>Indicates a value that is not in the set or range of allowable values.</p>
      </emu-clause>

      <emu-clause id="sec-native-error-types-used-in-this-standard-referenceerror">
        <h1>ReferenceError</h1>
        <p>The ReferenceError constructor is <dfn>%ReferenceError%</dfn>.</p>
        <p>Indicate that an invalid reference has been detected.</p>
      </emu-clause>

      <emu-clause id="sec-native-error-types-used-in-this-standard-syntaxerror">
        <h1>SyntaxError</h1>
        <p>The SyntaxError constructor is <dfn>%SyntaxError%</dfn>.</p>
        <p>Indicates that a parsing error has occurred.</p>
      </emu-clause>

      <emu-clause id="sec-native-error-types-used-in-this-standard-typeerror">
        <h1>TypeError</h1>
        <p>The TypeError constructor is <dfn>%TypeError%</dfn>.</p>
        <p>TypeError is used to indicate an unsuccessful operation when none of the other _NativeError_ objects are an appropriate indication of the failure cause.</p>
      </emu-clause>

      <emu-clause id="sec-native-error-types-used-in-this-standard-urierror">
        <h1>URIError</h1>
        <p>The URIError constructor is <dfn>%URIError%</dfn>.</p>
        <p>Indicates that one of the global URI handling functions was used in a way that is incompatible with its definition.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-nativeerror-object-structure">
      <h1>_NativeError_ Object Structure</h1>
      <p>Each of these objects has the structure described below, differing only in the name used as the constructor name and in the *"name"* property of the prototype object.</p>
      <p>For each error object, references to _NativeError_ in the definition should be replaced with the appropriate error object name from <emu-xref href="#sec-native-error-types-used-in-this-standard"></emu-xref>.</p>

      <emu-clause id="sec-nativeerror-constructors">
        <h1>The _NativeError_ Constructors</h1>
        <p>Each _NativeError_ constructor:</p>
        <ul>
          <li>creates and initializes a new _NativeError_ object when called as a function rather than as a constructor. A call of the object as a function is equivalent to calling it as a constructor with the same arguments. Thus the function call <code><var>NativeError</var>(&hellip;)</code> is equivalent to the object creation expression <code>new <var>NativeError</var>(&hellip;)</code> with the same arguments.</li>
          <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified _NativeError_ behaviour must include a `super` call to the _NativeError_ constructor to create and initialize subclass instances with an [[ErrorData]] internal slot.</li>
        </ul>

        <emu-clause id="sec-nativeerror">
          <h1>_NativeError_ ( _message_ [ , _options_ ] )</h1>
          <p>Each _NativeError_ function performs the following steps when called:</p>
          <emu-alg>
            1. If NewTarget is *undefined*, let _newTarget_ be the active function object; else let _newTarget_ be NewTarget.
            1. [id="step-nativeerror-ordinarycreatefromconstructor"] Let _O_ be ? OrdinaryCreateFromConstructor(_newTarget_, <code>"%<var>NativeError</var>.prototype%"</code>, « [[ErrorData]] »).
            1. If _message_ is not *undefined*, then
              1. Let _msg_ be ? ToString(_message_).
              1. Perform CreateNonEnumerableDataPropertyOrThrow(_O_, *"message"*, _msg_).
            1. Perform ? InstallErrorCause(_O_, _options_).
            1. Return _O_.
          </emu-alg>
          <p>The actual value of the string passed in step <emu-xref href="#step-nativeerror-ordinarycreatefromconstructor"></emu-xref> is either *"%EvalError.prototype%"*, *"%RangeError.prototype%"*, *"%ReferenceError.prototype%"*, *"%SyntaxError.prototype%"*, *"%TypeError.prototype%"*, or *"%URIError.prototype%"* corresponding to which _NativeError_ constructor is being defined.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-the-nativeerror-constructors">
        <h1>Properties of the _NativeError_ Constructors</h1>
        <p>Each _NativeError_ constructor:</p>
        <ul>
          <li>has a [[Prototype]] internal slot whose value is %Error%.</li>
          <li>has a *"name"* property whose value is the String value <emu-val>"<var>NativeError</var>"</emu-val>.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-nativeerror.prototype">
          <h1>_NativeError_.prototype</h1>
          <p>The initial value of <code><var>NativeError</var>.prototype</code> is a _NativeError_ prototype object (<emu-xref href="#sec-properties-of-the-nativeerror-prototype-objects"></emu-xref>). Each _NativeError_ constructor has a distinct prototype object.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-the-nativeerror-prototype-objects">
        <h1>Properties of the _NativeError_ Prototype Objects</h1>
        <p>Each <dfn>_NativeError_ prototype object</dfn>:</p>
        <ul>
          <li>is an ordinary object.</li>
          <li>is not an Error instance and does not have an [[ErrorData]] internal slot.</li>
          <li>has a [[Prototype]] internal slot whose value is %Error.prototype%.</li>
        </ul>

        <emu-clause id="sec-nativeerror.prototype.constructor">
          <h1>_NativeError_.prototype.constructor</h1>
          <p>The initial value of the *"constructor"* property of the prototype for a given _NativeError_ constructor is the constructor itself.</p>
        </emu-clause>

        <emu-clause id="sec-nativeerror.prototype.message">
          <h1>_NativeError_.prototype.message</h1>
          <p>The initial value of the *"message"* property of the prototype for a given _NativeError_ constructor is the empty String.</p>
        </emu-clause>

        <emu-clause id="sec-nativeerror.prototype.name">
          <h1>_NativeError_.prototype.name</h1>
          <p>The initial value of the *"name"* property of the prototype for a given _NativeError_ constructor is the String value consisting of the name of the constructor (the name used instead of _NativeError_).</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-nativeerror-instances">
        <h1>Properties of _NativeError_ Instances</h1>
        <p>_NativeError_ instances are ordinary objects that inherit properties from their _NativeError_ prototype object and have an [[ErrorData]] internal slot whose value is *undefined*. The only specified use of [[ErrorData]] is by `Object.prototype.toString` (<emu-xref href="#sec-object.prototype.tostring"></emu-xref>) to identify Error, AggregateError, or _NativeError_ instances.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-aggregate-error-objects">
      <h1>AggregateError Objects</h1>

      <emu-clause id="sec-aggregate-error-constructor">
        <h1>The AggregateError Constructor</h1>
        <p>The AggregateError constructor:</p>
        <ul>
          <li>is <dfn>%AggregateError%</dfn>.</li>
          <li>is the initial value of the *"AggregateError"* property of the global object.</li>
          <li>creates and initializes a new AggregateError object when called as a function rather than as a constructor. Thus the function call `AggregateError(…)` is equivalent to the object creation expression `new AggregateError(…)` with the same arguments.</li>
          <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified AggregateError behaviour must include a `super` call to the AggregateError constructor to create and initialize subclass instances with an [[ErrorData]] internal slot.</li>
        </ul>

        <emu-clause id="sec-aggregate-error">
          <h1>AggregateError ( _errors_, _message_ [ , _options_ ] )</h1>
          <p>This function performs the following steps when called:</p>
          <emu-alg>
            1. If NewTarget is *undefined*, let _newTarget_ be the active function object; else let _newTarget_ be NewTarget.
            1. Let _O_ be ? OrdinaryCreateFromConstructor(_newTarget_, *"%AggregateError.prototype%"*, « [[ErrorData]] »).
            1. If _message_ is not *undefined*, then
              1. Let _msg_ be ? ToString(_message_).
              1. Perform CreateNonEnumerableDataPropertyOrThrow(_O_, *"message"*, _msg_).
            1. Perform ? InstallErrorCause(_O_, _options_).
            1. Let _errorsList_ be ? IteratorToList(? GetIterator(_errors_, ~sync~)).
            1. Perform ! DefinePropertyOrThrow(_O_, *"errors"*, PropertyDescriptor { [[Configurable]]: *true*, [[Enumerable]]: *false*, [[Writable]]: *true*, [[Value]]: CreateArrayFromList(_errorsList_) }).
            1. Return _O_.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-the-aggregate-error-constructors">
        <h1>Properties of the AggregateError Constructor</h1>
        <p>The AggregateError constructor:</p>
        <ul>
          <li>has a [[Prototype]] internal slot whose value is %Error%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-aggregate-error.prototype">
          <h1>AggregateError.prototype</h1>
          <p>The initial value of `AggregateError.prototype` is %AggregateError.prototype%.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-the-aggregate-error-prototype-objects">
        <h1>Properties of the AggregateError Prototype Object</h1>
        <p>The <dfn>AggregateError prototype object</dfn>:</p>
        <ul>
          <li>is <dfn>%AggregateError.prototype%</dfn>.</li>
          <li>is an ordinary object.</li>
          <li>is not an Error instance or an AggregateError instance and does not have an [[ErrorData]] internal slot.</li>
          <li>has a [[Prototype]] internal slot whose value is %Error.prototype%.</li>
        </ul>

        <emu-clause id="sec-aggregate-error.prototype.constructor">
          <h1>AggregateError.prototype.constructor</h1>
          <p>The initial value of `AggregateError.prototype.constructor` is %AggregateError%.</p>
        </emu-clause>

        <emu-clause id="sec-aggregate-error.prototype.message">
          <h1>AggregateError.prototype.message</h1>
          <p>The initial value of `AggregateError.prototype.message` is the empty String.</p>
        </emu-clause>

        <emu-clause id="sec-aggregate-error.prototype.name">
          <h1>AggregateError.prototype.name</h1>
          <p>The initial value of `AggregateError.prototype.name` is *"AggregateError"*.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-aggregate-error-instances">
        <h1>Properties of AggregateError Instances</h1>
        <p>AggregateError instances are ordinary objects that inherit properties from their AggregateError prototype object and have an [[ErrorData]] internal slot whose value is *undefined*. The only specified use of [[ErrorData]] is by `Object.prototype.toString` (<emu-xref href="#sec-object.prototype.tostring"></emu-xref>) to identify Error, AggregateError, or _NativeError_ instances.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-error-objects">
      <h1>Abstract Operations for Error Objects</h1>

      <emu-clause id="sec-installerrorcause" type="abstract operation">
        <h1>
          InstallErrorCause (
            _O_: an Object,
            _options_: an ECMAScript language value,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create a *"cause"* property on _O_ when a *"cause"* property is present on _options_.</dd>
        </dl>
        <emu-alg>
          1. If _options_ is an Object and ? HasProperty(_options_, *"cause"*) is *true*, then
            1. Let _cause_ be ? Get(_options_, *"cause"*).
            1. Perform CreateNonEnumerableDataPropertyOrThrow(_O_, *"cause"*, _cause_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<h1 id="sec-numbers-and-dates"></h1>
