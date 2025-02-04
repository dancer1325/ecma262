# Ordinary and Exotic Objects Behaviours

<emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots">

## Ordinary Object Internal Methods and Internal Slots

* TODO:
    <p>All ordinary objects have an internal slot called [[Prototype]]. The value of this internal slot is either *null* or an object and is used for implementing inheritance. Assume a property named _P_ is missing from an ordinary object _O_ but exists on its [[Prototype]] object. If _P_ refers to a data property on the [[Prototype]] object, _O_ inherits it for get access, making it behave as if _P_ was a property of _O_. If _P_ refers to a writable data property on the [[Prototype]] object, set access of _P_ on _O_ creates a new data property named _P_ on _O_. If _P_ refers to a non-writable data property on the [[Prototype]] object, set access of _P_ on _O_ fails. If _P_ refers to an accessor property on the [[Prototype]] object, the accessor is inherited by _O_ for both get access and set access.</p>
    <p>Every ordinary object has a Boolean-valued [[Extensible]] internal slot which is used to fulfill the extensibility-related internal method invariants specified in <emu-xref href="#sec-invariants-of-the-essential-internal-methods"></emu-xref>. Namely, once the value of an object's [[Extensible]] internal slot has been set to *false*, it is no longer possible to add properties to the object, to modify the value of the object's [[Prototype]] internal slot, or to subsequently change the value of [[Extensible]] to *true*.</p>
    <p>In the following algorithm descriptions, assume _O_ is an ordinary object, _P_ is a property key value, _V_ is any ECMAScript language value, and _Desc_ is a Property Descriptor record.</p>
    <p>Each ordinary object internal method delegates to a similarly-named abstract operation. If such an abstract operation depends on another internal method, then the internal method is invoked on _O_ rather than calling the similarly-named abstract operation directly. These semantics ensure that exotic objects have their overridden internal methods invoked when ordinary object internal methods are applied to them.</p>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-getprototypeof" type="internal method">
      <h1>[[GetPrototypeOf]] ( ): a normal completion containing either an Object or *null*</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinaryGetPrototypeOf(_O_).
      </emu-alg>

      <emu-clause id="sec-ordinarygetprototypeof" type="abstract operation">
        <h1>
          OrdinaryGetPrototypeOf (
            _O_: an Object,
          ): an Object or *null*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return _O_.[[Prototype]].
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-setprototypeof-v" type="internal method">
      <h1>
        [[SetPrototypeOf]] (
          _V_: an Object or *null*,
        ): a normal completion containing a Boolean
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinarySetPrototypeOf(_O_, _V_).
      </emu-alg>

      <emu-clause id="sec-ordinarysetprototypeof" type="abstract operation">
        <h1>
          OrdinarySetPrototypeOf (
            _O_: an Object,
            _V_: an Object or *null*,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _current_ be _O_.[[Prototype]].
          1. If SameValue(_V_, _current_) is *true*, return *true*.
          1. Let _extensible_ be _O_.[[Extensible]].
          1. If _extensible_ is *false*, return *false*.
          1. Let _p_ be _V_.
          1. Let _done_ be *false*.
          1. [id="step-ordinarysetprototypeof-loop"] Repeat, while _done_ is *false*,
            1. If _p_ is *null*, then
              1. Set _done_ to *true*.
            1. Else if SameValue(_p_, _O_) is *true*, then
              1. Return *false*.
            1. Else,
              1. If _p_.[[GetPrototypeOf]] is not the ordinary object internal method defined in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots-getprototypeof"></emu-xref>, set _done_ to *true*.
              1. Else, set _p_ to _p_.[[Prototype]].
          1. Set _O_.[[Prototype]] to _V_.
          1. Return *true*.
        </emu-alg>
        <emu-note>
          <p>The loop in step <emu-xref href="#step-ordinarysetprototypeof-loop"></emu-xref> guarantees that there will be no cycles in any prototype chain that only includes objects that use the ordinary object definitions for [[GetPrototypeOf]] and [[SetPrototypeOf]].</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-isextensible" type="internal method">
      <h1>[[IsExtensible]] ( ): a normal completion containing a Boolean</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinaryIsExtensible(_O_).
      </emu-alg>

      <emu-clause id="sec-ordinaryisextensible" type="abstract operation">
        <h1>
          OrdinaryIsExtensible (
            _O_: an Object,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return _O_.[[Extensible]].
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-preventextensions" type="internal method">
      <h1>[[PreventExtensions]] ( ): a normal completion containing *true*</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinaryPreventExtensions(_O_).
      </emu-alg>

      <emu-clause id="sec-ordinarypreventextensions" type="abstract operation">
        <h1>
          OrdinaryPreventExtensions (
            _O_: an Object,
          ): *true*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Set _O_.[[Extensible]] to *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-getownproperty-p" type="internal method">
      <h1>
        [[GetOwnProperty]] (
          _P_: a property key,
        ): a normal completion containing either a Property Descriptor or *undefined*
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinaryGetOwnProperty(_O_, _P_).
      </emu-alg>

      <emu-clause id="sec-ordinarygetownproperty" type="abstract operation">
        <h1>
          OrdinaryGetOwnProperty (
            _O_: an Object,
            _P_: a property key,
          ): a Property Descriptor or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _O_ does not have an own property with key _P_, return *undefined*.
          1. Let _D_ be a newly created Property Descriptor with no fields.
          1. Let _X_ be _O_'s own property whose key is _P_.
          1. If _X_ is a data property, then
            1. Set _D_.[[Value]] to the value of _X_'s [[Value]] attribute.
            1. Set _D_.[[Writable]] to the value of _X_'s [[Writable]] attribute.
          1. Else,
            1. Assert: _X_ is an accessor property.
            1. Set _D_.[[Get]] to the value of _X_'s [[Get]] attribute.
            1. Set _D_.[[Set]] to the value of _X_'s [[Set]] attribute.
          1. Set _D_.[[Enumerable]] to the value of _X_'s [[Enumerable]] attribute.
          1. Set _D_.[[Configurable]] to the value of _X_'s [[Configurable]] attribute.
          1. Return _D_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-defineownproperty-p-desc" type="internal method">
      <h1>
        [[DefineOwnProperty]] (
          _P_: a property key,
          _Desc_: a Property Descriptor,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return ? OrdinaryDefineOwnProperty(_O_, _P_, _Desc_).
      </emu-alg>

      <emu-clause id="sec-ordinarydefineownproperty" type="abstract operation">
        <h1>
          OrdinaryDefineOwnProperty (
            _O_: an Object,
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _current_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. Let _extensible_ be ? IsExtensible(_O_).
          1. Return ValidateAndApplyPropertyDescriptor(_O_, _P_, _extensible_, _Desc_, _current_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iscompatiblepropertydescriptor" type="abstract operation">
        <h1>
          IsCompatiblePropertyDescriptor (
            _Extensible_: a Boolean,
            _Desc_: a Property Descriptor,
            _Current_: a Property Descriptor or *undefined*,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return ValidateAndApplyPropertyDescriptor(*undefined*, *""*, _Extensible_, _Desc_, _Current_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-validateandapplypropertydescriptor" type="abstract operation">
        <h1>
          ValidateAndApplyPropertyDescriptor (
            _O_: an Object or *undefined*,
            _P_: a property key,
            _extensible_: a Boolean,
            _Desc_: a Property Descriptor,
            _current_: a Property Descriptor or *undefined*,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It returns *true* if and only if _Desc_ can be applied as the property of an object with specified _extensibility_ and current property _current_ while upholding <emu-xref href="#sec-invariants-of-the-essential-internal-methods">invariants</emu-xref>. When such application is possible and _O_ is not *undefined*, it is performed for the property named _P_ (which is created if necessary).</dd>
        </dl>
        <emu-alg>
          1. Assert: _P_ is a property key.
          1. If _current_ is *undefined*, then
            1. If _extensible_ is *false*, return *false*.
            1. If _O_ is *undefined*, return *true*.
            1. If IsAccessorDescriptor(_Desc_) is *true*, then
              1. Create an own accessor property named _P_ of object _O_ whose [[Get]], [[Set]], [[Enumerable]], and [[Configurable]] attributes are set to the value of the corresponding field in _Desc_ if _Desc_ has that field, or to the attribute's <emu-xref href="#table-object-property-attributes">default value</emu-xref> otherwise.
            1. Else,
              1. Create an own data property named _P_ of object _O_ whose [[Value]], [[Writable]], [[Enumerable]], and [[Configurable]] attributes are set to the value of the corresponding field in _Desc_ if _Desc_ has that field, or to the attribute's <emu-xref href="#table-object-property-attributes">default value</emu-xref> otherwise.
            1. Return *true*.
          1. Assert: _current_ is a fully populated Property Descriptor.
          1. If _Desc_ does not have any fields, return *true*.
          1. If _current_.[[Configurable]] is *false*, then
            1. If _Desc_ has a [[Configurable]] field and _Desc_.[[Configurable]] is *true*, return *false*.
            1. If _Desc_ has an [[Enumerable]] field and _Desc_.[[Enumerable]] is not _current_.[[Enumerable]], return *false*.
            1. If IsGenericDescriptor(_Desc_) is *false* and IsAccessorDescriptor(_Desc_) is not IsAccessorDescriptor(_current_), return *false*.
            1. If IsAccessorDescriptor(_current_) is *true*, then
              1. If _Desc_ has a [[Get]] field and SameValue(_Desc_.[[Get]], _current_.[[Get]]) is *false*, return *false*.
              1. If _Desc_ has a [[Set]] field and SameValue(_Desc_.[[Set]], _current_.[[Set]]) is *false*, return *false*.
            1. Else if _current_.[[Writable]] is *false*, then
              1. If _Desc_ has a [[Writable]] field and _Desc_.[[Writable]] is *true*, return *false*.
              1. NOTE: SameValue returns *true* for *NaN* values which may be distinguishable by other means. Returning here ensures that any existing property of _O_ remains unmodified.
              1. If _Desc_ has a [[Value]] field, return SameValue(_Desc_.[[Value]], _current_.[[Value]]).
          1. If _O_ is not *undefined*, then
            1. If IsDataDescriptor(_current_) is *true* and IsAccessorDescriptor(_Desc_) is *true*, then
              1. If _Desc_ has a [[Configurable]] field, let _configurable_ be _Desc_.[[Configurable]]; else let _configurable_ be _current_.[[Configurable]].
              1. If _Desc_ has a [[Enumerable]] field, let _enumerable_ be _Desc_.[[Enumerable]]; else let _enumerable_ be _current_.[[Enumerable]].
              1. Replace the property named _P_ of object _O_ with an accessor property whose [[Configurable]] and [[Enumerable]] attributes are set to _configurable_ and _enumerable_, respectively, and whose [[Get]] and [[Set]] attributes are set to the value of the corresponding field in _Desc_ if _Desc_ has that field, or to the attribute's <emu-xref href="#table-object-property-attributes">default value</emu-xref> otherwise.
            1. Else if IsAccessorDescriptor(_current_) is *true* and IsDataDescriptor(_Desc_) is *true*, then
              1. If _Desc_ has a [[Configurable]] field, let _configurable_ be _Desc_.[[Configurable]]; else let _configurable_ be _current_.[[Configurable]].
              1. If _Desc_ has a [[Enumerable]] field, let _enumerable_ be _Desc_.[[Enumerable]]; else let _enumerable_ be _current_.[[Enumerable]].
              1. Replace the property named _P_ of object _O_ with a data property whose [[Configurable]] and [[Enumerable]] attributes are set to _configurable_ and _enumerable_, respectively, and whose [[Value]] and [[Writable]] attributes are set to the value of the corresponding field in _Desc_ if _Desc_ has that field, or to the attribute's <emu-xref href="#table-object-property-attributes">default value</emu-xref> otherwise.
            1. Else,
              1. For each field of _Desc_, set the corresponding attribute of the property named _P_ of object _O_ to the value of the field.
          1. Return *true*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-hasproperty-p" type="internal method">
      <h1>
        [[HasProperty]] (
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return ? OrdinaryHasProperty(_O_, _P_).
      </emu-alg>

      <emu-clause id="sec-ordinaryhasproperty" type="abstract operation">
        <h1>
          OrdinaryHasProperty (
            _O_: an Object,
            _P_: a property key,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _hasOwn_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. If _hasOwn_ is not *undefined*, return *true*.
          1. Let _parent_ be ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]</emu-meta>().
          1. If _parent_ is not *null*, then
            1. Return ? <emu-meta effects="user-code">_parent_.[[HasProperty]]</emu-meta>(_P_).
          1. Return *false*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver" type="internal method">
      <h1>
        [[Get]] (
          _P_: a property key,
          _Receiver_: an ECMAScript language value,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>

      <emu-alg>
        1. Return ? OrdinaryGet(_O_, _P_, _Receiver_).
      </emu-alg>

      <emu-clause id="sec-ordinaryget" type="abstract operation">
        <h1>
          OrdinaryGet (
            _O_: an Object,
            _P_: a property key,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
        </dl>

        <emu-alg>
          1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. If _desc_ is *undefined*, then
            1. Let _parent_ be ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]</emu-meta>().
            1. If _parent_ is *null*, return *undefined*.
            1. Return ? <emu-meta effects="user-code">_parent_.[[Get]]</emu-meta>(_P_, _Receiver_).
          1. If IsDataDescriptor(_desc_) is *true*, return _desc_.[[Value]].
          1. Assert: IsAccessorDescriptor(_desc_) is *true*.
          1. Let _getter_ be _desc_.[[Get]].
          1. If _getter_ is *undefined*, return *undefined*.
          1. Return ? Call(_getter_, _Receiver_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-set-p-v-receiver" type="internal method">
      <h1>
        [[Set]] (
          _P_: a property key,
          _V_: an ECMAScript language value,
          _Receiver_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return ? OrdinarySet(_O_, _P_, _V_, _Receiver_).
      </emu-alg>

      <emu-clause id="sec-ordinaryset" type="abstract operation">
        <h1>
          OrdinarySet (
            _O_: an Object,
            _P_: a property key,
            _V_: an ECMAScript language value,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>

        <emu-alg>
          1. Let _ownDesc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. Return ? OrdinarySetWithOwnDescriptor(_O_, _P_, _V_, _Receiver_, _ownDesc_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-ordinarysetwithowndescriptor" type="abstract operation">
        <h1>
          OrdinarySetWithOwnDescriptor (
            _O_: an Object,
            _P_: a property key,
            _V_: an ECMAScript language value,
            _Receiver_: an ECMAScript language value,
            _ownDesc_: a Property Descriptor or *undefined*,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>

        <emu-alg>
          1. If _ownDesc_ is *undefined*, then
            1. Let _parent_ be ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]</emu-meta>().
            1. If _parent_ is not *null*, then
              1. Return ? <emu-meta effects="user-code">_parent_.[[Set]]</emu-meta>(_P_, _V_, _Receiver_).
            1. Else,
              1. Set _ownDesc_ to the PropertyDescriptor { [[Value]]: *undefined*, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: *true* }.
          1. If IsDataDescriptor(_ownDesc_) is *true*, then
            1. If _ownDesc_.[[Writable]] is *false*, return *false*.
            1. If _Receiver_ is not an Object, return *false*.
            1. Let _existingDescriptor_ be ? <emu-meta effects="user-code">_Receiver_.[[GetOwnProperty]]</emu-meta>(_P_).
            1. If _existingDescriptor_ is not *undefined*, then
              1. If IsAccessorDescriptor(_existingDescriptor_) is *true*, return *false*.
              1. If _existingDescriptor_.[[Writable]] is *false*, return *false*.
              1. Let _valueDesc_ be the PropertyDescriptor { [[Value]]: _V_ }.
              1. Return ? <emu-meta effects="user-code">_Receiver_.[[DefineOwnProperty]]</emu-meta>(_P_, _valueDesc_).
            1. Else,
              1. Assert: _Receiver_ does not currently have a property _P_.
              1. Return ? CreateDataProperty(_Receiver_, _P_, _V_).
          1. Assert: IsAccessorDescriptor(_ownDesc_) is *true*.
          1. Let _setter_ be _ownDesc_.[[Set]].
          1. If _setter_ is *undefined*, return *false*.
          1. Perform ? Call(_setter_, _Receiver_, « _V_ »).
          1. Return *true*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-delete-p" type="internal method">
      <h1>
        [[Delete]] (
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return ? OrdinaryDelete(_O_, _P_).
      </emu-alg>

      <emu-clause id="sec-ordinarydelete" type="abstract operation">
        <h1>
          OrdinaryDelete (
            _O_: an Object,
            _P_: a property key,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _desc_ be ? <emu-meta effects="user-code">_O_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. If _desc_ is *undefined*, return *true*.
          1. If _desc_.[[Configurable]] is *true*, then
            1. Remove the own property with name _P_ from _O_.
            1. Return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys" type="internal method">
      <h1>[[OwnPropertyKeys]] ( ): a normal completion containing a List of property keys</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ordinary object _O_</dd>
      </dl>
      <emu-alg>
        1. Return OrdinaryOwnPropertyKeys(_O_).
      </emu-alg>

      <emu-clause id="sec-ordinaryownpropertykeys" type="abstract operation">
        <h1>
          OrdinaryOwnPropertyKeys (
            _O_: an Object,
          ): a List of property keys
        </h1>
        <dl class="header">
        </dl>

        <emu-alg>
          1. Let _keys_ be a new empty List.
          1. For each own property key _P_ of _O_ such that _P_ is an array index, in ascending numeric index order, do
            1. Append _P_ to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a String and _P_ is not an array index, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a Symbol, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. Return _keys_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ordinaryobjectcreate" type="abstract operation" oldids="sec-objectcreate">
      <h1>
        OrdinaryObjectCreate (
          _proto_: an Object or *null*,
          optional _additionalInternalSlotsList_: a List of names of internal slots,
        ): an Object
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to specify the runtime creation of new ordinary objects. _additionalInternalSlotsList_ contains the names of additional internal slots that must be defined as part of the object, beyond [[Prototype]] and [[Extensible]]. If _additionalInternalSlotsList_ is not provided, a new empty List is used.</dd>
      </dl>
      <emu-alg>
        1. Let _internalSlotsList_ be « [[Prototype]], [[Extensible]] ».
        1. If _additionalInternalSlotsList_ is present, set _internalSlotsList_ to the list-concatenation of _internalSlotsList_ and _additionalInternalSlotsList_.
        1. Let _O_ be MakeBasicObject(_internalSlotsList_).
        1. Set _O_.[[Prototype]] to _proto_.
        1. Return _O_.
      </emu-alg>

      <emu-note>
        <p>Although OrdinaryObjectCreate does little more than call MakeBasicObject, its use communicates the intention to create an ordinary object, and not an exotic one. Thus, within this specification, it is not called by any algorithm that subsequently modifies the internal methods of the object in ways that would make the result non-ordinary. Operations that create exotic objects invoke MakeBasicObject directly.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-ordinarycreatefromconstructor" type="abstract operation">
      <h1>
        OrdinaryCreateFromConstructor (
          _constructor_: a function object,
          _intrinsicDefaultProto_: a String,
          optional _internalSlotsList_: a List of names of internal slots,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It creates an ordinary object whose [[Prototype]] value is retrieved from a constructor's *"prototype"* property, if it exists. Otherwise the intrinsic named by _intrinsicDefaultProto_ is used for [[Prototype]]. _internalSlotsList_ contains the names of additional internal slots that must be defined as part of the object. If _internalSlotsList_ is not provided, a new empty List is used.</dd>
      </dl>
      <emu-alg>
        1. Assert: _intrinsicDefaultProto_ is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
        1. Let _proto_ be ? GetPrototypeFromConstructor(_constructor_, _intrinsicDefaultProto_).
        1. If _internalSlotsList_ is present, let _slotsList_ be _internalSlotsList_.
        1. Else, let _slotsList_ be a new empty List.
        1. Return OrdinaryObjectCreate(_proto_, _slotsList_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getprototypefromconstructor" type="abstract operation">
      <h1>
        GetPrototypeFromConstructor (
          _constructor_: a function object,
          _intrinsicDefaultProto_: a String,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines the [[Prototype]] value that should be used to create an object corresponding to a specific constructor. The value is retrieved from the constructor's *"prototype"* property, if it exists. Otherwise the intrinsic named by _intrinsicDefaultProto_ is used for [[Prototype]].</dd>
      </dl>
      <emu-alg>
        1. Assert: _intrinsicDefaultProto_ is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
        1. Let _proto_ be ? Get(_constructor_, *"prototype"*).
        1. If _proto_ is not an Object, then
          1. Let _realm_ be ? GetFunctionRealm(_constructor_).
          1. Set _proto_ to _realm_'s intrinsic object named _intrinsicDefaultProto_.
        1. Return _proto_.
      </emu-alg>
      <emu-note>
        <p>If _constructor_ does not supply a [[Prototype]] value, the default value that is used is obtained from the realm of the _constructor_ function rather than from the running execution context.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-requireinternalslot" type="abstract operation">
      <h1>
        RequireInternalSlot (
          _O_: an ECMAScript language value,
          _internalSlot_: an internal slot name,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It throws an exception unless _O_ is an Object and has the given internal slot.</dd>
      </dl>
      <emu-alg>
        1. If _O_ is not an Object, throw a *TypeError* exception.
        1. If _O_ does not have an _internalSlot_ internal slot, throw a *TypeError* exception.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-ecmascript-function-objects">

## ECMAScript Function Objects
* TODO:
    <p>ECMAScript function objects encapsulate parameterized ECMAScript code closed over a lexical environment and support the dynamic evaluation of that code. An ECMAScript function object is an ordinary object and has the same internal slots and the same internal methods as other ordinary objects. The code of an ECMAScript function object may be either strict mode code (<emu-xref href="#sec-strict-mode-code"></emu-xref>) or non-strict code. An ECMAScript function object whose code is strict mode code is called a <dfn id="strict-function" variants="strict functions">strict function</dfn>. One whose code is not strict mode code is called a <dfn id="non-strict-function" variants="non-strict functions">non-strict function</dfn>.</p>
    <p>In addition to [[Extensible]] and [[Prototype]], ECMAScript function objects also have the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>.</p>
    <emu-table id="table-internal-slots-of-ecmascript-function-objects" caption="Internal Slots of ECMAScript Function Objects" oldids="table-27">
      <table>
        <thead>
          <tr>
            <th>
              Internal Slot
            </th>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            [[Environment]]
          </td>
          <td>
            an Environment Record
          </td>
          <td>
            The Environment Record that the function was closed over. Used as the outer environment when evaluating the code of the function.
          </td>
        </tr>
        <tr>
          <td>
            [[PrivateEnvironment]]
          </td>
          <td>
            a PrivateEnvironment Record or *null*
          </td>
          <td>
            The PrivateEnvironment Record for Private Names that the function was closed over. *null* if this function is not syntactically contained within a class. Used as the outer PrivateEnvironment for inner classes when evaluating the code of the function.
          </td>
        </tr>
        <tr>
          <td>
            [[FormalParameters]]
          </td>
          <td>
            a Parse Node
          </td>
          <td>
            The root parse node of the source text that defines the function's formal parameter list.
          </td>
        </tr>
        <tr>
          <td>
            [[ECMAScriptCode]]
          </td>
          <td>
            a Parse Node
          </td>
          <td>
            The root parse node of the source text that defines the function's body.
          </td>
        </tr>
        <tr>
          <td>
            [[ConstructorKind]]
          </td>
          <td>
            ~base~ or ~derived~
          </td>
          <td>
            Whether or not the function is a derived class constructor.
          </td>
        </tr>
        <tr>
          <td>
            [[Realm]]
          </td>
          <td>
            a Realm Record
          </td>
          <td>
            The realm in which the function was created and which provides any intrinsic objects that are accessed when evaluating the function.
          </td>
        </tr>
        <tr>
          <td>
            [[ScriptOrModule]]
          </td>
          <td>
            a Script Record or a Module Record
          </td>
          <td>
            The script or module in which the function was created.
          </td>
        </tr>
        <tr>
          <td>
            [[ThisMode]]
          </td>
          <td>
            ~lexical~, ~strict~, or ~global~
          </td>
          <td>
            Defines how `this` references are interpreted within the formal parameters and code body of the function. ~lexical~ means that `this` refers to the *this* value of a lexically enclosing function. ~strict~ means that the *this* value is used exactly as provided by an invocation of the function. ~global~ means that a *this* value of *undefined* or *null* is interpreted as a reference to the global object, and any other *this* value is first passed to ToObject.
          </td>
        </tr>
        <tr>
          <td>
            [[Strict]]
          </td>
          <td>
            a Boolean
          </td>
          <td>
            *true* if this is a strict function, *false* if this is a non-strict function.
          </td>
        </tr>
        <tr>
          <td>
            [[HomeObject]]
          </td>
          <td>
            an Object
          </td>
          <td>
            If the function uses `super`, this is the object whose [[GetPrototypeOf]] provides the object where `super` property lookups begin.
          </td>
        </tr>
        <tr>
          <td>
            [[SourceText]]
          </td>
          <td>
            a sequence of Unicode code points
          </td>
          <td>
            The <emu-xref href="#sec-source-text">source text</emu-xref> that defines the function.
          </td>
        </tr>
        <tr>
          <td>
            [[Fields]]
          </td>
          <td>
            a List of ClassFieldDefinition Records
          </td>
          <td>
            If the function is a class, this is a list of Records representing the non-static fields and corresponding initializers of the class.
          </td>
        </tr>
        <tr>
          <td>
            [[PrivateMethods]]
          </td>
          <td>
            a List of PrivateElements
          </td>
          <td>
            If the function is a class, this is a list representing the non-static private methods and accessors of the class.
          </td>
        </tr>
        <tr>
          <td>
            [[ClassFieldInitializerName]]
          </td>
          <td>
            a String, a Symbol, a Private Name, or ~empty~
          </td>
          <td>
            If the function is created as the initializer of a class field, the name to use for NamedEvaluation of the field; ~empty~ otherwise.
          </td>
        </tr>
        <tr>
          <td>
            [[IsClassConstructor]]
          </td>
          <td>
            a Boolean
          </td>
          <td>
            Indicates whether the function is a class constructor. (If *true*, invoking the function's [[Call]] will immediately throw a *TypeError* exception.)
          </td>
        </tr>
      </table>
    </emu-table>
    <p>All ECMAScript function objects have the [[Call]] internal method defined here. ECMAScript functions that are also constructors in addition have the [[Construct]] internal method.</p>

    <emu-clause id="sec-ecmascript-function-objects-call-thisargument-argumentslist" type="internal method">
      <h1>
        [[Call]] (
          _thisArgument_: an ECMAScript language value,
          _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ECMAScript function object _F_</dd>
      </dl>
      <emu-alg>
        1. Let _callerContext_ be the running execution context.
        1. Let _calleeContext_ be PrepareForOrdinaryCall(_F_, *undefined*).
        1. Assert: _calleeContext_ is now the running execution context.
        1. If _F_.[[IsClassConstructor]] is *true*, then
          1. Let _error_ be a newly created *TypeError* object.
          1. NOTE: _error_ is created in _calleeContext_ with _F_'s associated Realm Record.
          1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
          1. Return ThrowCompletion(_error_).
        1. Perform OrdinaryCallBindThis(_F_, _calleeContext_, _thisArgument_).
        1. Let _result_ be Completion(OrdinaryCallEvaluateBody(_F_, _argumentsList_)).
        1. [id="step-call-pop-context-stack"] Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
        1. If _result_ is a return completion, return _result_.[[Value]].
        1. Assert: _result_ is a throw completion.
        1. Return ? _result_.
      </emu-alg>
      <emu-note>
        <p>When _calleeContext_ is removed from the execution context stack in step <emu-xref href="#step-call-pop-context-stack"></emu-xref> it must not be destroyed if it is suspended and retained for later resumption by an accessible Generator.</p>
      </emu-note>

      <emu-clause id="sec-prepareforordinarycall" type="abstract operation">
        <h1>
          PrepareForOrdinaryCall (
            _F_: an ECMAScript function object,
            _newTarget_: an Object or *undefined*,
          ): an execution context
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _callerContext_ be the running execution context.
          1. Let _calleeContext_ be a new ECMAScript code execution context.
          1. Set the Function of _calleeContext_ to _F_.
          1. Let _calleeRealm_ be _F_.[[Realm]].
          1. Set the Realm of _calleeContext_ to _calleeRealm_.
          1. Set the ScriptOrModule of _calleeContext_ to _F_.[[ScriptOrModule]].
          1. Let _localEnv_ be NewFunctionEnvironment(_F_, _newTarget_).
          1. Set the LexicalEnvironment of _calleeContext_ to _localEnv_.
          1. Set the VariableEnvironment of _calleeContext_ to _localEnv_.
          1. Set the PrivateEnvironment of _calleeContext_ to _F_.[[PrivateEnvironment]].
          1. If _callerContext_ is not already suspended, suspend _callerContext_.
          1. Push _calleeContext_ onto the execution context stack; _calleeContext_ is now the running execution context.
          1. NOTE: Any exception objects produced after this point are associated with _calleeRealm_.
          1. Return _calleeContext_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-ordinarycallbindthis" type="abstract operation">
        <h1>
          OrdinaryCallBindThis (
            _F_: an ECMAScript function object,
            _calleeContext_: an execution context,
            _thisArgument_: an ECMAScript language value,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _thisMode_ be _F_.[[ThisMode]].
          1. If _thisMode_ is ~lexical~, return ~unused~.
          1. Let _calleeRealm_ be _F_.[[Realm]].
          1. Let _localEnv_ be the LexicalEnvironment of _calleeContext_.
          1. If _thisMode_ is ~strict~, then
            1. Let _thisValue_ be _thisArgument_.
          1. Else,
            1. If _thisArgument_ is either *undefined* or *null*, then
              1. Let _globalEnv_ be _calleeRealm_.[[GlobalEnv]].
              1. Assert: _globalEnv_ is a Global Environment Record.
              1. Let _thisValue_ be _globalEnv_.[[GlobalThisValue]].
            1. Else,
              1. Let _thisValue_ be ! ToObject(_thisArgument_).
              1. NOTE: ToObject produces wrapper objects using _calleeRealm_.
          1. Assert: _localEnv_ is a Function Environment Record.
          1. Assert: The next step never returns an abrupt completion because _localEnv_.[[ThisBindingStatus]] is not ~initialized~.
          1. Perform ! _localEnv_.BindThisValue(_thisValue_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-evaluatebody" type="sdo">
        <h1>
          Runtime Semantics: EvaluateBody (
            _functionObject_: an ECMAScript function object,
            _argumentsList_: a List of ECMAScript language values,
          ): a return completion or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>FunctionBody : FunctionStatementList</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateFunctionBody of |FunctionBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateConciseBody of |ConciseBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>GeneratorBody : FunctionBody</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateGeneratorBody of |GeneratorBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>
          AsyncGeneratorBody : FunctionBody
        </emu-grammar>
        <emu-alg>
          1. Return ? EvaluateAsyncGeneratorBody of |AsyncGeneratorBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>
          AsyncFunctionBody : FunctionBody
        </emu-grammar>
        <emu-alg>
          1. Return ? EvaluateAsyncFunctionBody of |AsyncFunctionBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>
          AsyncConciseBody : ExpressionBody
        </emu-grammar>
        <emu-alg>
          1. Return ? EvaluateAsyncConciseBody of |AsyncConciseBody| with arguments _functionObject_ and _argumentsList_.
        </emu-alg>
        <emu-grammar>
          Initializer :
            `=` AssignmentExpression
        </emu-grammar>
        <emu-alg>
          1. Assert: _argumentsList_ is empty.
          1. Assert: _functionObject_.[[ClassFieldInitializerName]] is not ~empty~.
          1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
            1. Let _value_ be ? NamedEvaluation of |Initializer| with argument _functionObject_.[[ClassFieldInitializerName]].
          1. Else,
            1. Let _rhs_ be ? Evaluation of |AssignmentExpression|.
            1. Let _value_ be ? GetValue(_rhs_).
          1. Return ReturnCompletion(_value_).
        </emu-alg>
        <emu-note>
          <p>Even though field initializers constitute a function boundary, calling FunctionDeclarationInstantiation does not have any observable effect and so is omitted.</p>
        </emu-note>
        <emu-grammar>
          ClassStaticBlockBody : ClassStaticBlockStatementList
        </emu-grammar>
        <emu-alg>
          1. Assert: _argumentsList_ is empty.
          1. Return ? EvaluateClassStaticBlockBody of |ClassStaticBlockBody| with argument _functionObject_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-ordinarycallevaluatebody" type="abstract operation">
        <h1>
          OrdinaryCallEvaluateBody (
            _F_: an ECMAScript function object,
            _argumentsList_: a List of ECMAScript language values,
          ): a return completion or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return ? EvaluateBody of _F_.[[ECMAScriptCode]] with arguments _F_ and _argumentsList_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-ecmascript-function-objects-construct-argumentslist-newtarget" type="internal method">
      <h1>
        [[Construct]] (
          _argumentsList_: a List of ECMAScript language values,
          _newTarget_: a constructor,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>an ECMAScript function object _F_</dd>
      </dl>
      <emu-alg>
        1. Let _callerContext_ be the running execution context.
        1. Let _kind_ be _F_.[[ConstructorKind]].
        1. If _kind_ is ~base~, then
          1. Let _thisArgument_ be ? OrdinaryCreateFromConstructor(_newTarget_, *"%Object.prototype%"*).
        1. Let _calleeContext_ be PrepareForOrdinaryCall(_F_, _newTarget_).
        1. Assert: _calleeContext_ is now the running execution context.
        1. If _kind_ is ~base~, then
          1. Perform OrdinaryCallBindThis(_F_, _calleeContext_, _thisArgument_).
          1. Let _initializeResult_ be Completion(InitializeInstanceElements(_thisArgument_, _F_)).
          1. If _initializeResult_ is an abrupt completion, then
            1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
            1. Return ? _initializeResult_.
        1. Let _constructorEnv_ be the LexicalEnvironment of _calleeContext_.
        1. Let _result_ be Completion(OrdinaryCallEvaluateBody(_F_, _argumentsList_)).
        1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
        1. If _result_ is a throw completion, then
          1. Return ? _result_.
        1. Assert: _result_ is a return completion.
        1. If _result_.[[Value]] is an Object, return _result_.[[Value]].
        1. If _kind_ is ~base~, return _thisArgument_.
        1. If _result_.[[Value]] is not *undefined*, throw a *TypeError* exception.
        1. Let _thisBinding_ be ? _constructorEnv_.GetThisBinding().
        1. Assert: _thisBinding_ is an Object.
        1. Return _thisBinding_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-ordinaryfunctioncreate" type="abstract operation" oldids="sec-functionallocate,sec-functioninitialize,sec-functioncreate,sec-generatorfunctioncreate,sec-asyncgeneratorfunctioncreate,sec-async-functions-abstract-operations-async-function-create">
      <h1>
        OrdinaryFunctionCreate (
          _functionPrototype_: an Object,
          _sourceText_: a sequence of Unicode code points,
          _ParameterList_: a Parse Node,
          _Body_: a Parse Node,
          _thisMode_: ~lexical-this~ or ~non-lexical-this~,
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to specify the runtime creation of a new function with a default [[Call]] internal method and no [[Construct]] internal method (although one may be subsequently added by an operation such as MakeConstructor). _sourceText_ is the source text of the syntactic definition of the function to be created.</dd>
      </dl>
      <emu-alg>
        1. Let _internalSlotsList_ be the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>.
        1. Let _F_ be OrdinaryObjectCreate(_functionPrototype_, _internalSlotsList_).
        1. Set _F_.[[Call]] to the definition specified in <emu-xref href="#sec-ecmascript-function-objects-call-thisargument-argumentslist"></emu-xref>.
        1. Set _F_.[[SourceText]] to _sourceText_.
        1. Set _F_.[[FormalParameters]] to _ParameterList_.
        1. Set _F_.[[ECMAScriptCode]] to _Body_.
        1. Let _Strict_ be IsStrict(_Body_).
        1. Set _F_.[[Strict]] to _Strict_.
        1. If _thisMode_ is ~lexical-this~, set _F_.[[ThisMode]] to ~lexical~.
        1. Else if _Strict_ is *true*, set _F_.[[ThisMode]] to ~strict~.
        1. Else, set _F_.[[ThisMode]] to ~global~.
        1. Set _F_.[[IsClassConstructor]] to *false*.
        1. Set _F_.[[Environment]] to _env_.
        1. Set _F_.[[PrivateEnvironment]] to _privateEnv_.
        1. Set _F_.[[ScriptOrModule]] to GetActiveScriptOrModule().
        1. Set _F_.[[Realm]] to the current Realm Record.
        1. Set _F_.[[HomeObject]] to *undefined*.
        1. Set _F_.[[Fields]] to a new empty List.
        1. Set _F_.[[PrivateMethods]] to a new empty List.
        1. Set _F_.[[ClassFieldInitializerName]] to ~empty~.
        1. Let _len_ be the ExpectedArgumentCount of _ParameterList_.
        1. Perform SetFunctionLength(_F_, _len_).
        1. Return _F_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-addrestrictedfunctionproperties" type="abstract operation">
      <h1>
        AddRestrictedFunctionProperties (
          _F_: a function object,
          _realm_: a Realm Record,
        ): ~unused~
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: _realm_.[[Intrinsics]].[[%ThrowTypeError%]] exists and has been initialized.
        1. Let _thrower_ be _realm_.[[Intrinsics]].[[%ThrowTypeError%]].
        1. Perform ! DefinePropertyOrThrow(_F_, *"caller"*, PropertyDescriptor { [[Get]]: _thrower_, [[Set]]: _thrower_, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
        1. Perform ! DefinePropertyOrThrow(_F_, *"arguments"*, PropertyDescriptor { [[Get]]: _thrower_, [[Set]]: _thrower_, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
        1. Return ~unused~.
      </emu-alg>

      <emu-clause id="sec-%throwtypeerror%">
        <h1>%ThrowTypeError% ( )</h1>
        <p>This function is the <dfn>%ThrowTypeError%</dfn> intrinsic object.</p>
        <p>It is an anonymous built-in function object that is defined once for each realm.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Throw a *TypeError* exception.
        </emu-alg>
        <p>The value of the [[Extensible]] internal slot of this function is *false*.</p>
        <p>The *"length"* property of this function has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <p>The *"name"* property of this function has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-makeconstructor" type="abstract operation">
      <h1>
        MakeConstructor (
          _F_: an ECMAScript function object or a built-in function object,
          optional _writablePrototype_: a Boolean,
          optional _prototype_: an Object,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _F_ into a constructor.</dd>
      </dl>
      <emu-alg>
        1. If _F_ is an ECMAScript function object, then
          1. Assert: IsConstructor(_F_) is *false*.
          1. Assert: _F_ is an extensible object that does not have a *"prototype"* own property.
          1. Set _F_.[[Construct]] to the definition specified in <emu-xref href="#sec-ecmascript-function-objects-construct-argumentslist-newtarget"></emu-xref>.
        1. Else,
          1. Set _F_.[[Construct]] to the definition specified in <emu-xref href="#sec-built-in-function-objects-construct-argumentslist-newtarget"></emu-xref>.
        1. Set _F_.[[ConstructorKind]] to ~base~.
        1. If _writablePrototype_ is not present, set _writablePrototype_ to *true*.
        1. If _prototype_ is not present, then
          1. Set _prototype_ to OrdinaryObjectCreate(%Object.prototype%).
          1. Perform ! DefinePropertyOrThrow(_prototype_, *"constructor"*, PropertyDescriptor { [[Value]]: _F_, [[Writable]]: _writablePrototype_, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
        1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: _writablePrototype_, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-makeclassconstructor" type="abstract operation">
      <h1>
        MakeClassConstructor (
          _F_: an ECMAScript function object,
        ): ~unused~
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: _F_.[[IsClassConstructor]] is *false*.
        1. Set _F_.[[IsClassConstructor]] to *true*.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-makemethod" type="abstract operation">
      <h1>
        MakeMethod (
          _F_: an ECMAScript function object,
          _homeObject_: an Object,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It configures _F_ as a method.</dd>
      </dl>
      <emu-alg>
        1. Assert: _homeObject_ is an ordinary object.
        1. Set _F_.[[HomeObject]] to _homeObject_.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-definemethodproperty" oldids="sec-createmethodproperty" type="abstract operation">
      <h1>
        DefineMethodProperty (
          _homeObject_: an Object,
          _key_: a property key or Private Name,
          _closure_: a function object,
          _enumerable_: a Boolean,
        ): either a normal completion containing either a PrivateElement or ~unused~, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: _homeObject_ is an ordinary, extensible object.
        1. If _key_ is a Private Name, then
          1. Return PrivateElement { [[Key]]: _key_, [[Kind]]: ~method~, [[Value]]: _closure_ }.
        1. Else,
          1. Let _desc_ be the PropertyDescriptor { [[Value]]: _closure_, [[Writable]]: *true*, [[Enumerable]]: _enumerable_, [[Configurable]]: *true* }.
          1. Perform ? DefinePropertyOrThrow(_homeObject_, _key_, _desc_).
          1. NOTE: DefinePropertyOrThrow only returns an abrupt completion when attempting to define a class static method whose _key_ is *"prototype"*.
          1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-setfunctionname" type="abstract operation">
      <h1>
        SetFunctionName (
          _F_: a function object,
          _name_: a property key or Private Name,
          optional _prefix_: a String,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It adds a *"name"* property to _F_.</dd>
      </dl>
      <emu-alg>
        1. Assert: _F_ is an extensible object that does not have a *"name"* own property.
        1. If _name_ is a Symbol, then
          1. Let _description_ be _name_'s [[Description]] value.
          1. If _description_ is *undefined*, set _name_ to the empty String.
          1. Else, set _name_ to the string-concatenation of *"["*, _description_, and *"]"*.
        1. Else if _name_ is a Private Name, then
          1. Set _name_ to _name_.[[Description]].
        1. If _F_ has an [[InitialName]] internal slot, then
          1. Set _F_.[[InitialName]] to _name_.
        1. If _prefix_ is present, then
          1. Set _name_ to the string-concatenation of _prefix_, the code unit 0x0020 (SPACE), and _name_.
          1. If _F_ has an [[InitialName]] internal slot, then
            1. Optionally, set _F_.[[InitialName]] to _name_.
        1. Perform ! DefinePropertyOrThrow(_F_, *"name"*, PropertyDescriptor { [[Value]]: _name_, [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-setfunctionlength" type="abstract operation">
      <h1>
        SetFunctionLength (
          _F_: a function object,
          _length_: a non-negative integer or +&infin;,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It adds a *"length"* property to _F_.</dd>
      </dl>
      <emu-alg>
        1. Assert: _F_ is an extensible object that does not have a *"length"* own property.
        1. Perform ! DefinePropertyOrThrow(_F_, *"length"*, PropertyDescriptor { [[Value]]: 𝔽(_length_), [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-functiondeclarationinstantiation" type="abstract operation">
      <h1>
        FunctionDeclarationInstantiation (
          _func_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing ~unused~ or an abrupt completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>_func_ is the function object for which the execution context is being established.</dd>
      </dl>
      <emu-note>
        <p>When an execution context is established for evaluating an ECMAScript function a new Function Environment Record is created and bindings for each formal parameter are instantiated in that Environment Record. Each declaration in the function body is also instantiated. If the function's formal parameters do not include any default value initializers then the body declarations are instantiated in the same Environment Record as the parameters. If default value parameter initializers exist, a second Environment Record is created for the body declarations. Formal parameters and functions are initialized as part of FunctionDeclarationInstantiation. All other bindings are initialized during evaluation of the function body.</p>
      </emu-note>
      <p>It performs the following steps when called:</p>
      <!--
        WARNING: If you add, remove, rename, or repurpose any variable names
                 within this algorithm, you may need to update
                 #sec-web-compat-functiondeclarationinstantiation accordingly.
      -->
      <emu-alg>
        1. Let _calleeContext_ be the running execution context.
        1. Let _code_ be _func_.[[ECMAScriptCode]].
        1. Let _strict_ be _func_.[[Strict]].
        1. Let _formals_ be _func_.[[FormalParameters]].
        1. Let _parameterNames_ be the BoundNames of _formals_.
        1. If _parameterNames_ has any duplicate entries, let _hasDuplicates_ be *true*. Otherwise, let _hasDuplicates_ be *false*.
        1. Let _simpleParameterList_ be IsSimpleParameterList of _formals_.
        1. Let _hasParameterExpressions_ be ContainsExpression of _formals_.
        1. Let _varNames_ be the VarDeclaredNames of _code_.
        1. Let _varDeclarations_ be the VarScopedDeclarations of _code_.
        1. Let _lexicalNames_ be the LexicallyDeclaredNames of _code_.
        1. Let _functionNames_ be a new empty List.
        1. Let _functionsToInitialize_ be a new empty List.
        1. For each element _d_ of _varDeclarations_, in reverse List order, do
          1. If _d_ is neither a |VariableDeclaration| nor a |ForBinding| nor a |BindingIdentifier|, then
            1. Assert: _d_ is either a |FunctionDeclaration|, a |GeneratorDeclaration|, an |AsyncFunctionDeclaration|, or an |AsyncGeneratorDeclaration|.
            1. Let _fn_ be the sole element of the BoundNames of _d_.
            1. If _functionNames_ does not contain _fn_, then
              1. Insert _fn_ as the first element of _functionNames_.
              1. NOTE: If there are multiple function declarations for the same name, the last declaration is used.
              1. Insert _d_ as the first element of _functionsToInitialize_.
        1. Let _argumentsObjectNeeded_ be *true*.
        1. If _func_.[[ThisMode]] is ~lexical~, then
          1. NOTE: Arrow functions never have an arguments object.
          1. Set _argumentsObjectNeeded_ to *false*.
        1. Else if _parameterNames_ contains *"arguments"*, then
          1. Set _argumentsObjectNeeded_ to *false*.
        1. Else if _hasParameterExpressions_ is *false*, then
          1. If _functionNames_ contains *"arguments"* or _lexicalNames_ contains *"arguments"*, then
            1. Set _argumentsObjectNeeded_ to *false*.
        1. If _strict_ is *true* or _hasParameterExpressions_ is *false*, then
          1. NOTE: Only a single Environment Record is needed for the parameters, since calls to `eval` in strict mode code cannot create new bindings which are visible outside of the `eval`.
          1. Let _env_ be the LexicalEnvironment of _calleeContext_.
        1. Else,
          1. NOTE: A separate Environment Record is needed to ensure that bindings created by direct eval calls in the formal parameter list are outside the environment where parameters are declared.
          1. Let _calleeEnv_ be the LexicalEnvironment of _calleeContext_.
          1. Let _env_ be NewDeclarativeEnvironment(_calleeEnv_).
          1. Assert: The VariableEnvironment of _calleeContext_ and _calleeEnv_ are the same Environment Record.
          1. Set the LexicalEnvironment of _calleeContext_ to _env_.
        1. For each String _paramName_ of _parameterNames_, do
          1. Let _alreadyDeclared_ be ! _env_.HasBinding(_paramName_).
          1. NOTE: Early errors ensure that duplicate parameter names can only occur in non-strict functions that do not have parameter default values or rest parameters.
          1. If _alreadyDeclared_ is *false*, then
            1. Perform ! _env_.CreateMutableBinding(_paramName_, *false*).
            1. If _hasDuplicates_ is *true*, then
              1. Perform ! _env_.InitializeBinding(_paramName_, *undefined*).
        1. If _argumentsObjectNeeded_ is *true*, then
          1. If _strict_ is *true* or _simpleParameterList_ is *false*, then
            1. Let _ao_ be CreateUnmappedArgumentsObject(_argumentsList_).
          1. Else,
            1. NOTE: A mapped argument object is only provided for non-strict functions that don't have a rest parameter, any parameter default value initializers, or any destructured parameters.
            1. Let _ao_ be CreateMappedArgumentsObject(_func_, _formals_, _argumentsList_, _env_).
          1. If _strict_ is *true*, then
            1. Perform ! _env_.CreateImmutableBinding(*"arguments"*, *false*).
            1. NOTE: In strict mode code early errors prevent attempting to assign to this binding, so its mutability is not observable.
          1. Else,
            1. Perform ! _env_.CreateMutableBinding(*"arguments"*, *false*).
          1. Perform ! _env_.InitializeBinding(*"arguments"*, _ao_).
          1. Let _parameterBindings_ be the list-concatenation of _parameterNames_ and « *"arguments"* ».
        1. Else,
          1. Let _parameterBindings_ be _parameterNames_.
        1. Let _iteratorRecord_ be CreateListIteratorRecord(_argumentsList_).
        1. If _hasDuplicates_ is *true*, then
          1. Perform ? IteratorBindingInitialization of _formals_ with arguments _iteratorRecord_ and *undefined*.
        1. Else,
          1. Perform ? IteratorBindingInitialization of _formals_ with arguments _iteratorRecord_ and _env_.
        1. If _hasParameterExpressions_ is *false*, then
          1. NOTE: Only a single Environment Record is needed for the parameters and top-level vars.
          1. Let _instantiatedVarNames_ be a copy of the List _parameterBindings_.
          1. For each element _n_ of _varNames_, do
            1. If _instantiatedVarNames_ does not contain _n_, then
              1. Append _n_ to _instantiatedVarNames_.
              1. Perform ! _env_.CreateMutableBinding(_n_, *false*).
              1. Perform ! _env_.InitializeBinding(_n_, *undefined*).
          1. Let _varEnv_ be _env_.
        1. Else,
          1. NOTE: A separate Environment Record is needed to ensure that closures created by expressions in the formal parameter list do not have visibility of declarations in the function body.
          1. Let _varEnv_ be NewDeclarativeEnvironment(_env_).
          1. Set the VariableEnvironment of _calleeContext_ to _varEnv_.
          1. Let _instantiatedVarNames_ be a new empty List.
          1. For each element _n_ of _varNames_, do
            1. If _instantiatedVarNames_ does not contain _n_, then
              1. Append _n_ to _instantiatedVarNames_.
              1. Perform ! _varEnv_.CreateMutableBinding(_n_, *false*).
              1. If _parameterBindings_ does not contain _n_, or if _functionNames_ contains _n_, then
                1. Let _initialValue_ be *undefined*.
              1. Else,
                1. Let _initialValue_ be ! _env_.GetBindingValue(_n_, *false*).
              1. Perform ! _varEnv_.InitializeBinding(_n_, _initialValue_).
              1. NOTE: A var with the same name as a formal parameter initially has the same value as the corresponding initialized parameter.
        1. [id="step-functiondeclarationinstantiation-web-compat-insertion-point"] NOTE: Annex <emu-xref href="#sec-web-compat-functiondeclarationinstantiation"></emu-xref> adds additional steps at this point.
        1. If _strict_ is *false*, then
          1. Let _lexEnv_ be NewDeclarativeEnvironment(_varEnv_).
          1. NOTE: Non-strict functions use a separate Environment Record for top-level lexical declarations so that a direct eval can determine whether any var scoped declarations introduced by the eval code conflict with pre-existing top-level lexically scoped declarations. This is not needed for strict functions because a strict direct eval always places all declarations into a new Environment Record.
        1. Else,
          1. Let _lexEnv_ be _varEnv_.
        1. Set the LexicalEnvironment of _calleeContext_ to _lexEnv_.
        1. Let _lexDeclarations_ be the LexicallyScopedDeclarations of _code_.
        1. For each element _d_ of _lexDeclarations_, do
          1. NOTE: A lexically declared name cannot be the same as a function/generator declaration, formal parameter, or a var name. Lexically declared names are only instantiated here but not initialized.
          1. For each element _dn_ of the BoundNames of _d_, do
            1. If IsConstantDeclaration of _d_ is *true*, then
              1. Perform ! _lexEnv_.CreateImmutableBinding(_dn_, *true*).
            1. Else,
              1. Perform ! _lexEnv_.CreateMutableBinding(_dn_, *false*).
        1. Let _privateEnv_ be the PrivateEnvironment of _calleeContext_.
        1. For each Parse Node _f_ of _functionsToInitialize_, do
          1. Let _fn_ be the sole element of the BoundNames of _f_.
          1. Let _fo_ be InstantiateFunctionObject of _f_ with arguments _lexEnv_ and _privateEnv_.
          1. Perform ! _varEnv_.SetMutableBinding(_fn_, _fo_, *false*).
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p><emu-xref href="#sec-block-level-function-declarations-web-legacy-compatibility-semantics"></emu-xref> provides an extension to the above algorithm that is necessary for backwards compatibility with web browser implementations of ECMAScript that predate ECMAScript 2015.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-built-in-function-objects">

## Built-in Function Objects
    <p>A built-in function object is an ordinary object; it must satisfy the requirements for ordinary objects set out in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>.</p>
    <p>In addition to the internal slots required of every ordinary object (see <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>), a built-in function object must also have the following internal slots:</p>
    <ul>
      <li>[[Realm]], a Realm Record that represents the realm in which the function was created.</li>
      <li>[[InitialName]], a String that is the initial name of the function. It is used by <emu-xref href="#sec-function.prototype.tostring"></emu-xref>.</li>
    </ul>
    <p>The initial value of a built-in function object's [[Prototype]] internal slot is %Function.prototype%, unless otherwise specified.</p>
    <p>A built-in function object must have a [[Call]] internal method that conforms to the definition in <emu-xref href="#sec-built-in-function-objects-call-thisargument-argumentslist"></emu-xref>.</p>
    <p>A built-in function object has a [[Construct]] internal method if and only if it is described as a “constructor”, or some algorithm in this specification explicitly sets its [[Construct]] internal method. Such a [[Construct]] internal method must conform to the definition in <emu-xref href="#sec-built-in-function-objects-construct-argumentslist-newtarget"></emu-xref>.</p>
    <p>An implementation may provide additional built-in function objects that are not defined in this specification.</p>

    <emu-clause id="sec-built-in-function-objects-call-thisargument-argumentslist" type="internal method">
      <h1>
        [[Call]] (
          _thisArgument_: an ECMAScript language value,
          _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a built-in function object _F_</dd>
      </dl>
      <emu-alg>
        1. Return ? BuiltinCallOrConstruct(_F_, _thisArgument_, _argumentsList_, *undefined*).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-built-in-function-objects-construct-argumentslist-newtarget" type="internal method">
      <h1>
        [[Construct]] (
          _argumentsList_: a List of ECMAScript language values,
          _newTarget_: a constructor,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a built-in function object _F_ (when the method is present)</dd>
      </dl>
      <emu-alg>
        1. Let _result_ be ? BuiltinCallOrConstruct(_F_, ~uninitialized~, _argumentsList_, _newTarget_).
        1. Assert: _result_ is an Object.
        1. Return _result_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-builtincallorconstruct" type="abstract operation">
      <h1>
        BuiltinCallOrConstruct (
          _F_: a built-in function object,
          _thisArgument_: an ECMAScript language value or ~uninitialized~,
          _argumentsList_: a List of ECMAScript language values,
          _newTarget_: a constructor or *undefined*,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _callerContext_ be the running execution context.
        1. If _callerContext_ is not already suspended, suspend _callerContext_.
        1. Let _calleeContext_ be a new execution context.
        1. Set the Function of _calleeContext_ to _F_.
        1. Let _calleeRealm_ be _F_.[[Realm]].
        1. Set the Realm of _calleeContext_ to _calleeRealm_.
        1. Set the ScriptOrModule of _calleeContext_ to *null*.
        1. Perform any necessary implementation-defined initialization of _calleeContext_.
        1. Push _calleeContext_ onto the execution context stack; _calleeContext_ is now the running execution context.
        1. [id="step-call-builtin-function-result"] Let _result_ be the Completion Record that is <emu-meta effects="user-code">the result of evaluating</emu-meta> _F_ in a manner that conforms to the specification of _F_. If _thisArgument_ is ~uninitialized~, the *this* value is uninitialized; otherwise, _thisArgument_ provides the *this* value. _argumentsList_ provides the named parameters. _newTarget_ provides the NewTarget value.
        1. NOTE: If _F_ is defined in this document, “the specification of _F_” is the behaviour specified for it via algorithm steps or other means.
        1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
        1. Return ? _result_.
      </emu-alg>
      <emu-note>
        <p>When _calleeContext_ is removed from the execution context stack it must not be destroyed if it has been suspended and retained by an accessible Generator for later resumption.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-createbuiltinfunction" type="abstract operation">
      <h1>
        CreateBuiltinFunction (
          _behaviour_: an Abstract Closure, a set of algorithm steps, or some other definition of a function's behaviour provided in this specification,
          _length_: a non-negative integer or +&infin;,
          _name_: a property key or a Private Name,
          _additionalInternalSlotsList_: a List of names of internal slots,
          optional _realm_: a Realm Record,
          optional _prototype_: an Object or *null*,
          optional _prefix_: a String,
        ): a built-in function object
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>_additionalInternalSlotsList_ contains the names of additional internal slots that must be defined as part of the object. This operation creates a built-in function object.</dd>
      </dl>
      <emu-alg>
        1. If _realm_ is not present, set _realm_ to the current Realm Record.
        1. If _prototype_ is not present, set _prototype_ to _realm_.[[Intrinsics]].[[%Function.prototype%]].
        1. Let _internalSlotsList_ be a List containing the names of all the internal slots that <emu-xref href="#sec-built-in-function-objects"></emu-xref> requires for the built-in function object that is about to be created.
        1. Append to _internalSlotsList_ the elements of _additionalInternalSlotsList_.
        1. Let _func_ be a new built-in function object that, when called, performs the action described by _behaviour_ using the provided arguments as the values of the corresponding parameters specified by _behaviour_. The new function object has internal slots whose names are the elements of _internalSlotsList_, and an [[InitialName]] internal slot.
        1. Set _func_.[[Prototype]] to _prototype_.
        1. Set _func_.[[Extensible]] to *true*.
        1. Set _func_.[[Realm]] to _realm_.
        1. Set _func_.[[InitialName]] to *null*.
        1. Perform SetFunctionLength(_func_, _length_).
        1. If _prefix_ is not present, then
          1. Perform SetFunctionName(_func_, _name_).
        1. Else,
          1. Perform SetFunctionName(_func_, _name_, _prefix_).
        1. Return _func_.
      </emu-alg>
      <p>Each built-in function defined in this specification is created by calling the CreateBuiltinFunction abstract operation.</p>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-built-in-exotic-object-internal-methods-and-slots">

## Built-in Exotic Object Internal Methods and Slots
    <p>This specification defines several kinds of built-in exotic objects. These objects generally behave similar to ordinary objects except for a few specific situations. The following exotic objects use the ordinary object internal methods except where it is explicitly specified otherwise below:</p>

<emu-clause id="sec-bound-function-exotic-objects">

### Bound Function Exotic Objects
      <p>A bound function exotic object is an exotic object that wraps another function object. A bound function exotic object is callable (it has a [[Call]] internal method and may have a [[Construct]] internal method). Calling a bound function exotic object generally results in a call of its wrapped function.</p>

      <p>An object is a <dfn id="bound-function-exotic-object" variants="bound function exotic objects">bound function exotic object</dfn> if its [[Call]] and (if applicable) [[Construct]] internal methods use the following implementations, and its other essential internal methods use the definitions found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed in BoundFunctionCreate.</p>

      <p>Bound function exotic objects do not have the internal slots of ECMAScript function objects listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>. Instead they have the internal slots listed in <emu-xref href="#table-internal-slots-of-bound-function-exotic-objects"></emu-xref>, in addition to [[Prototype]] and [[Extensible]].</p>
      <emu-table id="table-internal-slots-of-bound-function-exotic-objects" caption="Internal Slots of Bound Function Exotic Objects" oldids="table-28">
        <table>
          <thead>
            <tr>
              <th>
                Internal Slot
              </th>
              <th>
                Type
              </th>
              <th>
                Description
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              [[BoundTargetFunction]]
            </td>
            <td>
              a callable Object
            </td>
            <td>
              The wrapped function object.
            </td>
          </tr>
          <tr>
            <td>
              [[BoundThis]]
            </td>
            <td>
              an ECMAScript language value
            </td>
            <td>
              The value that is always passed as the *this* value when calling the wrapped function.
            </td>
          </tr>
          <tr>
            <td>
              [[BoundArguments]]
            </td>
            <td>
              a List of ECMAScript language values
            </td>
            <td>
              A list of values whose elements are used as the first arguments to any call to the wrapped function.
            </td>
          </tr>
        </table>
      </emu-table>

      <emu-clause id="sec-bound-function-exotic-objects-call-thisargument-argumentslist" type="internal method">
        <h1>
          [[Call]] (
            _thisArgument_: an ECMAScript language value,
            _argumentsList_: a List of ECMAScript language values,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a bound function exotic object _F_</dd>
        </dl>
        <emu-alg>
          1. Let _target_ be _F_.[[BoundTargetFunction]].
          1. Let _boundThis_ be _F_.[[BoundThis]].
          1. Let _boundArgs_ be _F_.[[BoundArguments]].
          1. Let _args_ be the list-concatenation of _boundArgs_ and _argumentsList_.
          1. Return ? Call(_target_, _boundThis_, _args_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-bound-function-exotic-objects-construct-argumentslist-newtarget" type="internal method">
        <h1>
          [[Construct]] (
            _argumentsList_: a List of ECMAScript language values,
            _newTarget_: a constructor,
          ): either a normal completion containing an Object or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a bound function exotic object _F_</dd>
        </dl>
        <emu-alg>
          1. Let _target_ be _F_.[[BoundTargetFunction]].
          1. Assert: IsConstructor(_target_) is *true*.
          1. Let _boundArgs_ be _F_.[[BoundArguments]].
          1. Let _args_ be the list-concatenation of _boundArgs_ and _argumentsList_.
          1. If SameValue(_F_, _newTarget_) is *true*, set _newTarget_ to _target_.
          1. Return ? Construct(_target_, _args_, _newTarget_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-boundfunctioncreate" type="abstract operation">
        <h1>
          BoundFunctionCreate (
            _targetFunction_: a function object,
            _boundThis_: an ECMAScript language value,
            _boundArgs_: a List of ECMAScript language values,
          ): either a normal completion containing a function object or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of new bound function exotic objects.</dd>
        </dl>
        <emu-alg>
          1. Let _proto_ be ? <emu-meta effects="user-code">_targetFunction_.[[GetPrototypeOf]]</emu-meta>().
          1. Let _internalSlotsList_ be the list-concatenation of « [[Prototype]], [[Extensible]] » and the internal slots listed in <emu-xref href="#table-internal-slots-of-bound-function-exotic-objects"></emu-xref>.
          1. Let _obj_ be MakeBasicObject(_internalSlotsList_).
          1. Set _obj_.[[Prototype]] to _proto_.
          1. Set _obj_.[[Call]] as described in <emu-xref href="#sec-bound-function-exotic-objects-call-thisargument-argumentslist"></emu-xref>.
          1. If IsConstructor(_targetFunction_) is *true*, then
            1. Set _obj_.[[Construct]] as described in <emu-xref href="#sec-bound-function-exotic-objects-construct-argumentslist-newtarget"></emu-xref>.
          1. Set _obj_.[[BoundTargetFunction]] to _targetFunction_.
          1. Set _obj_.[[BoundThis]] to _boundThis_.
          1. Set _obj_.[[BoundArguments]] to _boundArgs_.
          1. Return _obj_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-array-exotic-objects">

### Array Exotic Objects
      <p>An Array is an exotic object that gives special treatment to array index property keys (see <emu-xref href="#sec-object-type"></emu-xref>). A property whose property name is an array index is also called an <em>element</em>. Every Array has a non-configurable *"length"* property whose value is always a non-negative integral Number whose mathematical value is strictly less than 2<sup>32</sup>. The value of the *"length"* property is numerically greater than the name of every own property whose name is an array index; whenever an own property of an Array is created or changed, other properties are adjusted as necessary to maintain this invariant. Specifically, whenever an own property is added whose name is an array index, the value of the *"length"* property is changed, if necessary, to be one more than the numeric value of that array index; and whenever the value of the *"length"* property is changed, every own property whose name is an array index whose value is not smaller than the new length is deleted. This constraint applies only to own properties of an Array and is unaffected by *"length"* or array index properties that may be inherited from its prototypes.</p>

      <p>An object is an <dfn id="array-exotic-object" variants="Array exotic objects">Array exotic object</dfn> (or simply, an Array) if its [[DefineOwnProperty]] internal method uses the following implementation, and its other essential internal methods use the definitions found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed in ArrayCreate.</p>

      <emu-clause id="sec-array-exotic-objects-defineownproperty-p-desc" type="internal method">
        <h1>
          [[DefineOwnProperty]] (
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an Array exotic object _A_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is *"length"*, then
            1. Return ? ArraySetLength(_A_, _Desc_).
          1. Else if _P_ is an array index, then
            1. Let _lengthDesc_ be OrdinaryGetOwnProperty(_A_, *"length"*).
            1. Assert: IsDataDescriptor(_lengthDesc_) is *true*.
            1. Assert: _lengthDesc_.[[Configurable]] is *false*.
            1. Let _length_ be _lengthDesc_.[[Value]].
            1. Assert: _length_ is a non-negative integral Number.
            1. Let _index_ be ! ToUint32(_P_).
            1. If _index_ ≥ _length_ and _lengthDesc_.[[Writable]] is *false*, return *false*.
            1. Let _succeeded_ be ! OrdinaryDefineOwnProperty(_A_, _P_, _Desc_).
            1. If _succeeded_ is *false*, return *false*.
            1. If _index_ ≥ _length_, then
              1. Set _lengthDesc_.[[Value]] to _index_ + *1*<sub>𝔽</sub>.
              1. Set _succeeded_ to ! OrdinaryDefineOwnProperty(_A_, *"length"*, _lengthDesc_).
              1. Assert: _succeeded_ is *true*.
            1. Return *true*.
          1. Return ? OrdinaryDefineOwnProperty(_A_, _P_, _Desc_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraycreate" type="abstract operation">
        <h1>
          ArrayCreate (
            _length_: a non-negative integer,
            optional _proto_: an Object,
          ): either a normal completion containing an Array exotic object or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of new Arrays.</dd>
        </dl>
        <emu-alg>
          1. If _length_ > 2<sup>32</sup> - 1, throw a *RangeError* exception.
          1. If _proto_ is not present, set _proto_ to %Array.prototype%.
          1. Let _A_ be MakeBasicObject(« [[Prototype]], [[Extensible]] »).
          1. Set _A_.[[Prototype]] to _proto_.
          1. Set _A_.[[DefineOwnProperty]] as specified in <emu-xref href="#sec-array-exotic-objects-defineownproperty-p-desc"></emu-xref>.
          1. Perform ! OrdinaryDefineOwnProperty(_A_, *"length"*, PropertyDescriptor { [[Value]]: 𝔽(_length_), [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arrayspeciescreate" type="abstract operation">
        <h1>
          ArraySpeciesCreate (
            _originalArray_: an Object,
            _length_: a non-negative integer,
          ): either a normal completion containing an Object or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of a new Array or similar object using a constructor function that is derived from _originalArray_. It does not enforce that the constructor function returns an Array.</dd>
        </dl>
        <emu-alg>
          1. Let _isArray_ be ? IsArray(_originalArray_).
          1. If _isArray_ is *false*, return ? ArrayCreate(_length_).
          1. Let _C_ be ? Get(_originalArray_, *"constructor"*).
          1. If IsConstructor(_C_) is *true*, then
            1. Let _thisRealm_ be the current Realm Record.
            1. Let _realmC_ be ? GetFunctionRealm(_C_).
            1. If _thisRealm_ and _realmC_ are not the same Realm Record, then
              1. If SameValue(_C_, _realmC_.[[Intrinsics]].[[%Array%]]) is *true*, set _C_ to *undefined*.
          1. If _C_ is an Object, then
            1. Set _C_ to ? Get(_C_, %Symbol.species%).
            1. If _C_ is *null*, set _C_ to *undefined*.
          1. If _C_ is *undefined*, return ? ArrayCreate(_length_).
          1. If IsConstructor(_C_) is *false*, throw a *TypeError* exception.
          1. Return ? Construct(_C_, « 𝔽(_length_) »).
        </emu-alg>
        <emu-note>
          <p>If _originalArray_ was created using the standard built-in Array constructor for a realm that is not the realm of the running execution context, then a new Array is created using the realm of the running execution context. This maintains compatibility with Web browsers that have historically had that behaviour for the `Array.prototype` methods that now are defined using ArraySpeciesCreate.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-arraysetlength" type="abstract operation">
        <h1>
          ArraySetLength (
            _A_: an Array,
            _Desc_: a Property Descriptor,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _Desc_ does not have a [[Value]] field, then
            1. Return ! OrdinaryDefineOwnProperty(_A_, *"length"*, _Desc_).
          1. Let _newLenDesc_ be a copy of _Desc_.
          1. [id="step-arraysetlength-newlen"] Let _newLen_ be ? ToUint32(_Desc_.[[Value]]).
          1. [id="step-arraysetlength-numberlen"] Let _numberLen_ be ? ToNumber(_Desc_.[[Value]]).
          1. If SameValueZero(_newLen_, _numberLen_) is *false*, throw a *RangeError* exception.
          1. Set _newLenDesc_.[[Value]] to _newLen_.
          1. Let _oldLenDesc_ be OrdinaryGetOwnProperty(_A_, *"length"*).
          1. Assert: IsDataDescriptor(_oldLenDesc_) is *true*.
          1. Assert: _oldLenDesc_.[[Configurable]] is *false*.
          1. Let _oldLen_ be _oldLenDesc_.[[Value]].
          1. If _newLen_ ≥ _oldLen_, then
            1. Return ! OrdinaryDefineOwnProperty(_A_, *"length"*, _newLenDesc_).
          1. If _oldLenDesc_.[[Writable]] is *false*, return *false*.
          1. If _newLenDesc_ does not have a [[Writable]] field or _newLenDesc_.[[Writable]] is *true*, then
            1. Let _newWritable_ be *true*.
          1. Else,
            1. NOTE: Setting the [[Writable]] attribute to *false* is deferred in case any elements cannot be deleted.
            1. Let _newWritable_ be *false*.
            1. Set _newLenDesc_.[[Writable]] to *true*.
          1. Let _succeeded_ be ! OrdinaryDefineOwnProperty(_A_, *"length"*, _newLenDesc_).
          1. If _succeeded_ is *false*, return *false*.
          1. For each own property key _P_ of _A_ such that _P_ is an array index and ! ToUint32(_P_) ≥ _newLen_, in descending numeric index order, do
            1. Let _deleteSucceeded_ be ! _A_.[[Delete]](_P_).
            1. If _deleteSucceeded_ is *false*, then
              1. Set _newLenDesc_.[[Value]] to ! ToUint32(_P_) + *1*<sub>𝔽</sub>.
              1. If _newWritable_ is *false*, set _newLenDesc_.[[Writable]] to *false*.
              1. Perform ! OrdinaryDefineOwnProperty(_A_, *"length"*, _newLenDesc_).
              1. Return *false*.
          1. If _newWritable_ is *false*, then
            1. Set _succeeded_ to ! OrdinaryDefineOwnProperty(_A_, *"length"*, PropertyDescriptor { [[Writable]]: *false* }).
            1. Assert: _succeeded_ is *true*.
          1. Return *true*.
        </emu-alg>
        <emu-note>
          <p>In steps <emu-xref href="#step-arraysetlength-newlen"></emu-xref> and <emu-xref href="#step-arraysetlength-numberlen"></emu-xref>, if _Desc_.[[Value]] is an object then its `valueOf` method is called twice. This is legacy behaviour that was specified with this effect starting with the 2<sup>nd</sup> Edition of this specification.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-string-exotic-objects">

### String Exotic Objects
      <p>A String object is an exotic object that encapsulates a String value and exposes virtual integer-indexed data properties corresponding to the individual code unit elements of the String value. String exotic objects always have a data property named *"length"* whose value is the length of the encapsulated String value. Both the code unit data properties and the *"length"* property are non-writable and non-configurable.</p>

      <p>An object is a <dfn id="string-exotic-object" variants="String exotic objects">String exotic object</dfn> (or simply, a String object) if its [[GetOwnProperty]], [[DefineOwnProperty]], and [[OwnPropertyKeys]] internal methods use the following implementations, and its other essential internal methods use the definitions found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed in StringCreate.</p>

      <p>String exotic objects have the same internal slots as ordinary objects. They also have a [[StringData]] internal slot.</p>

      <emu-clause id="sec-string-exotic-objects-getownproperty-p" type="internal method">
        <h1>
          [[GetOwnProperty]] (
            _P_: a property key,
          ): a normal completion containing either a Property Descriptor or *undefined*
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a String exotic object _S_</dd>
        </dl>
        <emu-alg>
          1. Let _desc_ be OrdinaryGetOwnProperty(_S_, _P_).
          1. If _desc_ is not *undefined*, return _desc_.
          1. Return StringGetOwnProperty(_S_, _P_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string-exotic-objects-defineownproperty-p-desc" type="internal method">
        <h1>
          [[DefineOwnProperty]] (
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a String exotic object _S_</dd>
        </dl>
        <emu-alg>
          1. Let _stringDesc_ be StringGetOwnProperty(_S_, _P_).
          1. If _stringDesc_ is not *undefined*, then
            1. Let _extensible_ be _S_.[[Extensible]].
            1. Return IsCompatiblePropertyDescriptor(_extensible_, _Desc_, _stringDesc_).
          1. Return ! OrdinaryDefineOwnProperty(_S_, _P_, _Desc_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-string-exotic-objects-ownpropertykeys" type="internal method">
        <h1>[[OwnPropertyKeys]] ( ): a normal completion containing a List of property keys</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a String exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. Let _keys_ be a new empty List.
          1. Let _str_ be _O_.[[StringData]].
          1. Assert: _str_ is a String.
          1. Let _len_ be the length of _str_.
          1. For each integer _i_ such that 0 ≤ _i_ &lt; _len_, in ascending order, do
            1. Append ! ToString(𝔽(_i_)) to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is an array index and ! ToIntegerOrInfinity(_P_) ≥ _len_, in ascending numeric index order, do
            1. Append _P_ to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a String and _P_ is not an array index, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a Symbol, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. Return _keys_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-stringcreate" type="abstract operation">
        <h1>
          StringCreate (
            _value_: a String,
            _prototype_: an Object,
          ): a String exotic object
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of new String exotic objects.</dd>
        </dl>
        <emu-alg>
          1. Let _S_ be MakeBasicObject(« [[Prototype]], [[Extensible]], [[StringData]] »).
          1. Set _S_.[[Prototype]] to _prototype_.
          1. Set _S_.[[StringData]] to _value_.
          1. Set _S_.[[GetOwnProperty]] as specified in <emu-xref href="#sec-string-exotic-objects-getownproperty-p"></emu-xref>.
          1. Set _S_.[[DefineOwnProperty]] as specified in <emu-xref href="#sec-string-exotic-objects-defineownproperty-p-desc"></emu-xref>.
          1. Set _S_.[[OwnPropertyKeys]] as specified in <emu-xref href="#sec-string-exotic-objects-ownpropertykeys"></emu-xref>.
          1. Let _length_ be the length of _value_.
          1. Perform ! DefinePropertyOrThrow(_S_, *"length"*, PropertyDescriptor { [[Value]]: 𝔽(_length_), [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
          1. Return _S_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-stringgetownproperty" type="abstract operation">
        <h1>
          StringGetOwnProperty (
            _S_: an Object that has a [[StringData]] internal slot,
            _P_: a property key,
          ): a Property Descriptor or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _P_ is not a String, return *undefined*.
          1. Let _index_ be CanonicalNumericIndexString(_P_).
          1. If _index_ is *undefined*, return *undefined*.
          1. If _index_ is not an integral Number, return *undefined*.
          1. If _index_ is *-0*<sub>𝔽</sub>, return *undefined*.
          1. Let _str_ be _S_.[[StringData]].
          1. Assert: _str_ is a String.
          1. Let _len_ be the length of _str_.
          1. If ℝ(_index_) &lt; 0 or _len_ ≤ ℝ(_index_), return *undefined*.
          1. Let _resultStr_ be the substring of _str_ from ℝ(_index_) to ℝ(_index_) + 1.
          1. Return the PropertyDescriptor { [[Value]]: _resultStr_, [[Writable]]: *false*, [[Enumerable]]: *true*, [[Configurable]]: *false* }.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-arguments-exotic-objects">

### Arguments Exotic Objects

      <p>Most ECMAScript functions make an arguments object available to their code. Depending upon the characteristics of the function definition, its arguments object is either an ordinary object or an arguments exotic object. An arguments exotic object is an exotic object whose array index properties map to the formal parameters bindings of an invocation of its associated ECMAScript function.</p>

      <p>An object is an <dfn id="arguments-exotic-object" variants="arguments exotic objects">arguments exotic object</dfn> if its internal methods use the following implementations, with the ones not specified here using those found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed in CreateMappedArgumentsObject.</p>

      <emu-note>
        <p>While CreateUnmappedArgumentsObject is grouped into this clause, it creates an ordinary object, not an arguments exotic object.</p>
      </emu-note>

      <p>Arguments exotic objects have the same internal slots as ordinary objects. They also have a [[ParameterMap]] internal slot. Ordinary arguments objects also have a [[ParameterMap]] internal slot whose value is always undefined. For ordinary argument objects the [[ParameterMap]] internal slot is only used by `Object.prototype.toString` (<emu-xref href="#sec-object.prototype.tostring"></emu-xref>) to identify them as such.</p>

      <emu-note>
        <p>The integer-indexed data properties of an arguments exotic object whose numeric name values are less than the number of formal parameters of the corresponding function object initially share their values with the corresponding argument bindings in the function's execution context. This means that changing the property changes the corresponding value of the argument binding and vice-versa. This correspondence is broken if such a property is deleted and then redefined or if the property is changed into an accessor property. If the arguments object is an ordinary object, the values of its properties are simply a copy of the arguments passed to the function and there is no dynamic linkage between the property values and the formal parameter values.</p>
      </emu-note>
      <emu-note>
        <p>The ParameterMap object and its property values are used as a device for specifying the arguments object correspondence to argument bindings. The ParameterMap object and the objects that are the values of its properties are not directly observable from ECMAScript code. An ECMAScript implementation does not need to actually create or use such objects to implement the specified semantics.</p>
      </emu-note>
      <emu-note>
        <p>Ordinary arguments objects define a non-configurable accessor property named *"callee"* which throws a *TypeError* exception on access. The *"callee"* property has a more specific meaning for arguments exotic objects, which are created only for some class of non-strict functions. The definition of this property in the ordinary variant exists to ensure that it is not defined in any other manner by conforming ECMAScript implementations.</p>
      </emu-note>
      <emu-note>
        <p>ECMAScript implementations of arguments exotic objects have historically contained an accessor property named *"caller"*. Prior to ECMAScript 2017, this specification included the definition of a throwing *"caller"* property on ordinary arguments objects. Since implementations do not contain this extension any longer, ECMAScript 2017 dropped the requirement for a throwing *"caller"* accessor.</p>
      </emu-note>

      <emu-clause id="sec-arguments-exotic-objects-getownproperty-p" type="internal method">
        <h1>
          [[GetOwnProperty]] (
            _P_: a property key,
          ): a normal completion containing either a Property Descriptor or *undefined*
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an arguments exotic object _args_</dd>
        </dl>
        <emu-alg>
          1. Let _desc_ be OrdinaryGetOwnProperty(_args_, _P_).
          1. If _desc_ is *undefined*, return *undefined*.
          1. Let _map_ be _args_.[[ParameterMap]].
          1. Let _isMapped_ be ! HasOwnProperty(_map_, _P_).
          1. If _isMapped_ is *true*, then
            1. Set _desc_.[[Value]] to ! Get(_map_, _P_).
          1. Return _desc_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arguments-exotic-objects-defineownproperty-p-desc" type="internal method">
        <h1>
          [[DefineOwnProperty]] (
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an arguments exotic object _args_</dd>
        </dl>
        <emu-alg>
          1. Let _map_ be _args_.[[ParameterMap]].
          1. Let _isMapped_ be ! HasOwnProperty(_map_, _P_).
          1. Let _newArgDesc_ be _Desc_.
          1. If _isMapped_ is *true* and IsDataDescriptor(_Desc_) is *true*, then
            1. If _Desc_ does not have a [[Value]] field, _Desc_ has a [[Writable]] field, and _Desc_.[[Writable]] is *false*, then
              1. Set _newArgDesc_ to a copy of _Desc_.
              1. Set _newArgDesc_.[[Value]] to ! Get(_map_, _P_).
          1. Let _allowed_ be ! OrdinaryDefineOwnProperty(_args_, _P_, _newArgDesc_).
          1. If _allowed_ is *false*, return *false*.
          1. If _isMapped_ is *true*, then
            1. If IsAccessorDescriptor(_Desc_) is *true*, then
              1. Perform ! _map_.[[Delete]](_P_).
            1. Else,
              1. If _Desc_ has a [[Value]] field, then
                1. Assert: The following Set will succeed, since formal parameters mapped by arguments objects are always writable.
                1. Perform ! Set(_map_, _P_, _Desc_.[[Value]], *false*).
              1. If _Desc_ has a [[Writable]] field and _Desc_.[[Writable]] is *false*, then
                1. Perform ! _map_.[[Delete]](_P_).
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arguments-exotic-objects-get-p-receiver" type="internal method">
        <h1>
          [[Get]] (
            _P_: a property key,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an arguments exotic object _args_</dd>
        </dl>
        <emu-alg>
          1. Let _map_ be _args_.[[ParameterMap]].
          1. Let _isMapped_ be ! HasOwnProperty(_map_, _P_).
          1. If _isMapped_ is *false*, then
            1. Return ? OrdinaryGet(_args_, _P_, _Receiver_).
          1. Else,
            1. Assert: _map_ contains a formal parameter mapping for _P_.
            1. Return ! Get(_map_, _P_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arguments-exotic-objects-set-p-v-receiver" type="internal method">
        <h1>
          [[Set]] (
            _P_: a property key,
            _V_: an ECMAScript language value,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an arguments exotic object _args_</dd>
        </dl>
        <emu-alg>
          1. If SameValue(_args_, _Receiver_) is *false*, then
            1. Let _isMapped_ be *false*.
          1. Else,
            1. Let _map_ be _args_.[[ParameterMap]].
            1. Let _isMapped_ be ! HasOwnProperty(_map_, _P_).
          1. If _isMapped_ is *true*, then
            1. Assert: The following Set will succeed, since formal parameters mapped by arguments objects are always writable.
            1. Perform ! Set(_map_, _P_, _V_, *false*).
          1. Return ? OrdinarySet(_args_, _P_, _V_, _Receiver_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arguments-exotic-objects-delete-p" type="internal method">
        <h1>
          [[Delete]] (
            _P_: a property key,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an arguments exotic object _args_</dd>
        </dl>
        <emu-alg>
          1. Let _map_ be _args_.[[ParameterMap]].
          1. Let _isMapped_ be ! HasOwnProperty(_map_, _P_).
          1. Let _result_ be ? OrdinaryDelete(_args_, _P_).
          1. If _result_ is *true* and _isMapped_ is *true*, then
            1. Perform ! _map_.[[Delete]](_P_).
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createunmappedargumentsobject" type="abstract operation">
        <h1>
          CreateUnmappedArgumentsObject (
            _argumentsList_: a List of ECMAScript language values,
          ): an ordinary object
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _len_ be the number of elements in _argumentsList_.
          1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%, « [[ParameterMap]] »).
          1. Set _obj_.[[ParameterMap]] to *undefined*.
          1. Perform ! DefinePropertyOrThrow(_obj_, *"length"*, PropertyDescriptor { [[Value]]: 𝔽(_len_), [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _len_,
            1. Let _val_ be _argumentsList_[_index_].
            1. Perform ! CreateDataPropertyOrThrow(_obj_, ! ToString(𝔽(_index_)), _val_).
            1. Set _index_ to _index_ + 1.
          1. Perform ! DefinePropertyOrThrow(_obj_, %Symbol.iterator%, PropertyDescriptor { [[Value]]: %Array.prototype.values%, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
          1. Perform ! DefinePropertyOrThrow(_obj_, *"callee"*, PropertyDescriptor { [[Get]]: %ThrowTypeError%, [[Set]]: %ThrowTypeError%, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createmappedargumentsobject" type="abstract operation">
        <h1>
          CreateMappedArgumentsObject (
            _func_: an Object,
            _formals_: a Parse Node,
            _argumentsList_: a List of ECMAScript language values,
            _env_: an Environment Record,
          ): an arguments exotic object
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _formals_ does not contain a rest parameter, any binding patterns, or any initializers. It may contain duplicate identifiers.
          1. Let _len_ be the number of elements in _argumentsList_.
          1. Let _obj_ be MakeBasicObject(« [[Prototype]], [[Extensible]], [[ParameterMap]] »).
          1. Set _obj_.[[GetOwnProperty]] as specified in <emu-xref href="#sec-arguments-exotic-objects-getownproperty-p"></emu-xref>.
          1. Set _obj_.[[DefineOwnProperty]] as specified in <emu-xref href="#sec-arguments-exotic-objects-defineownproperty-p-desc"></emu-xref>.
          1. Set _obj_.[[Get]] as specified in <emu-xref href="#sec-arguments-exotic-objects-get-p-receiver"></emu-xref>.
          1. Set _obj_.[[Set]] as specified in <emu-xref href="#sec-arguments-exotic-objects-set-p-v-receiver"></emu-xref>.
          1. Set _obj_.[[Delete]] as specified in <emu-xref href="#sec-arguments-exotic-objects-delete-p"></emu-xref>.
          1. Set _obj_.[[Prototype]] to %Object.prototype%.
          1. Let _map_ be OrdinaryObjectCreate(*null*).
          1. Set _obj_.[[ParameterMap]] to _map_.
          1. Let _parameterNames_ be the BoundNames of _formals_.
          1. Let _numberOfParameters_ be the number of elements in _parameterNames_.
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _len_,
            1. Let _val_ be _argumentsList_[_index_].
            1. Perform ! CreateDataPropertyOrThrow(_obj_, ! ToString(𝔽(_index_)), _val_).
            1. Set _index_ to _index_ + 1.
          1. Perform ! DefinePropertyOrThrow(_obj_, *"length"*, PropertyDescriptor { [[Value]]: 𝔽(_len_), [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
          1. Let _mappedNames_ be a new empty List.
          1. Set _index_ to _numberOfParameters_ - 1.
          1. Repeat, while _index_ ≥ 0,
            1. Let _name_ be _parameterNames_[_index_].
            1. If _mappedNames_ does not contain _name_, then
              1. Append _name_ to _mappedNames_.
              1. If _index_ &lt; _len_, then
                1. Let _g_ be MakeArgGetter(_name_, _env_).
                1. Let _p_ be MakeArgSetter(_name_, _env_).
                1. Perform ! _map_.[[DefineOwnProperty]](! ToString(𝔽(_index_)), PropertyDescriptor { [[Set]]: _p_, [[Get]]: _g_, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
            1. Set _index_ to _index_ - 1.
          1. Perform ! DefinePropertyOrThrow(_obj_, %Symbol.iterator%, PropertyDescriptor { [[Value]]: %Array.prototype.values%, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
          1. Perform ! DefinePropertyOrThrow(_obj_, *"callee"*, PropertyDescriptor { [[Value]]: _func_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }).
          1. Return _obj_.
        </emu-alg>

        <emu-clause id="sec-makearggetter" type="abstract operation">
          <h1>
            MakeArgGetter (
              _name_: a String,
              _env_: an Environment Record,
            ): a function object
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It creates a built-in function object that when executed returns the value bound for _name_ in _env_.</dd>
          </dl>
          <emu-alg>
            1. Let _getterClosure_ be a new Abstract Closure with no parameters that captures _name_ and _env_ and performs the following steps when called:
              1. Return _env_.GetBindingValue(_name_, *false*).
            1. Let _getter_ be CreateBuiltinFunction(_getterClosure_, 0, *""*, « »).
            1. NOTE: _getter_ is never directly accessible to ECMAScript code.
            1. Return _getter_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-makeargsetter" type="abstract operation">
          <h1>
            MakeArgSetter (
              _name_: a String,
              _env_: an Environment Record,
            ): a function object
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It creates a built-in function object that when executed sets the value bound for _name_ in _env_.</dd>
          </dl>
          <emu-alg>
            1. Let _setterClosure_ be a new Abstract Closure with parameters (_value_) that captures _name_ and _env_ and performs the following steps when called:
              1. Return ! _env_.SetMutableBinding(_name_, _value_, *false*).
            1. Let _setter_ be CreateBuiltinFunction(_setterClosure_, 1, *""*, « »).
            1. NOTE: _setter_ is never directly accessible to ECMAScript code.
            1. Return _setter_.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-typedarray-exotic-objects" oldids="sec-integer-indexed-exotic-objects">

### TypedArray Exotic Objects
      <p>A TypedArray is an exotic object that performs special handling of integer index property keys.</p>
      <p>TypedArrays have the same internal slots as ordinary objects and additionally [[ViewedArrayBuffer]], [[ArrayLength]], [[ByteOffset]], [[ContentType]], and [[TypedArrayName]] internal slots.</p>
      <p>An object is a <dfn id="typedarray" oldids="integer-indexed-exotic-object" variants="TypedArrays">TypedArray</dfn> if its [[PreventExtensions]], [[GetOwnProperty]], [[HasProperty]], [[DefineOwnProperty]], [[Get]], [[Set]], [[Delete]], and [[OwnPropertyKeys]], internal methods use the definitions in this section, and its other essential internal methods use the definitions found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed by TypedArrayCreate.</p>

      <emu-clause id="sec-typedarray-preventextensions" type="internal method">
        <h1>[[PreventExtensions]] ( ): a normal completion containing a Boolean</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. NOTE: The extensibility-related invariants specified in <emu-xref href="#sec-invariants-of-the-essential-internal-methods"></emu-xref> do not allow this method to return *true* when _O_ can gain (or lose and then regain) properties, which might occur for properties with integer index names when its underlying buffer is resized.
          1. If IsTypedArrayFixedLength(_O_) is *false*, return *false*.
          1. Return OrdinaryPreventExtensions(_O_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-getownproperty" oldids="sec-integer-indexed-exotic-objects-getownproperty-p" type="internal method">
        <h1>
          [[GetOwnProperty]] (
            _P_: a property key,
          ): a normal completion containing either a Property Descriptor or *undefined*
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, then
              1. Let _value_ be TypedArrayGetElement(_O_, _numericIndex_).
              1. If _value_ is *undefined*, return *undefined*.
              1. Return the PropertyDescriptor { [[Value]]: _value_, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: *true* }.
          1. Return OrdinaryGetOwnProperty(_O_, _P_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-hasproperty" oldids="sec-integer-indexed-exotic-objects-hasproperty-p" type="internal method">
        <h1>
          [[HasProperty]] (
            _P_: a property key,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, return IsValidIntegerIndex(_O_, _numericIndex_).
          1. Return ? OrdinaryHasProperty(_O_, _P_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-defineownproperty" oldids="sec-integer-indexed-exotic-objects-defineownproperty-p-desc" type="internal method">
        <h1>
          [[DefineOwnProperty]] (
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, then
              1. If IsValidIntegerIndex(_O_, _numericIndex_) is *false*, return *false*.
              1. If _Desc_ has a [[Configurable]] field and _Desc_.[[Configurable]] is *false*, return *false*.
              1. If _Desc_ has an [[Enumerable]] field and _Desc_.[[Enumerable]] is *false*, return *false*.
              1. If IsAccessorDescriptor(_Desc_) is *true*, return *false*.
              1. If _Desc_ has a [[Writable]] field and _Desc_.[[Writable]] is *false*, return *false*.
              1. If _Desc_ has a [[Value]] field, perform ? TypedArraySetElement(_O_, _numericIndex_, _Desc_.[[Value]]).
              1. Return *true*.
          1. Return ! OrdinaryDefineOwnProperty(_O_, _P_, _Desc_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-get" oldids="sec-integer-indexed-exotic-objects-get-p-receiver" type="internal method">
        <h1>
          [[Get]] (
            _P_: a property key,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, then
              1. Return TypedArrayGetElement(_O_, _numericIndex_).
          1. Return ? OrdinaryGet(_O_, _P_, _Receiver_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-set" oldids="sec-integer-indexed-exotic-objects-set-p-v-receiver" type="internal method">
        <h1>
          [[Set]] (
            _P_: a property key,
            _V_: an ECMAScript language value,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, then
              1. If SameValue(_O_, _Receiver_) is *true*, then
                1. Perform ? TypedArraySetElement(_O_, _numericIndex_, _V_).
                1. Return *true*.
              1. If IsValidIntegerIndex(_O_, _numericIndex_) is *false*, return *true*.
          1. Return ? OrdinarySet(_O_, _P_, _V_, _Receiver_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-delete" oldids="sec-integer-indexed-exotic-objects-delete-p" type="internal method">
        <h1>
          [[Delete]] (
            _P_: a property key,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a String, then
            1. Let _numericIndex_ be CanonicalNumericIndexString(_P_).
            1. If _numericIndex_ is not *undefined*, then
              1. If IsValidIntegerIndex(_O_, _numericIndex_) is *false*, return *true*; else return *false*.
          1. Return ! OrdinaryDelete(_O_, _P_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-ownpropertykeys" oldids="sec-integer-indexed-exotic-objects-ownpropertykeys" type="internal method">
        <h1>[[OwnPropertyKeys]] ( ): a normal completion containing a List of property keys</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a TypedArray _O_</dd>
        </dl>
        <emu-alg>
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. Let _keys_ be a new empty List.
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *false*, then
            1. Let _length_ be TypedArrayLength(_taRecord_).
            1. For each integer _i_ such that 0 ≤ _i_ &lt; _length_, in ascending order, do
              1. Append ! ToString(𝔽(_i_)) to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a String and _P_ is not an integer index, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. For each own property key _P_ of _O_ such that _P_ is a Symbol, in ascending chronological order of property creation, do
            1. Append _P_ to _keys_.
          1. Return _keys_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarray-with-buffer-witness-records" oldids="sec-integer-indexed-object-with-buffer-witness-records">
        <h1>TypedArray With Buffer Witness Records</h1>
        <p>An <dfn variants="TypedArray With Buffer Witness Records">TypedArray With Buffer Witness Record</dfn> is a Record value used to encapsulate a TypedArray along with a cached byte length of the viewed buffer. It is used to help ensure there is a single shared memory read event of the byte length data block when the viewed buffer is a growable SharedArrayBuffer.</p>
        <p>TypedArray With Buffer Witness Records have the fields listed in <emu-xref href="#table-typedarray-with-buffer-witness-record-fields"></emu-xref>.</p>
        <emu-table id="table-typedarray-with-buffer-witness-record-fields" oldids="table-integer-indexed-object-with-buffer-witness-record-fields" caption="TypedArray With Buffer Witness Record Fields">
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
                [[Object]]
              </td>
              <td>
                a TypedArray
              </td>
              <td>
                The TypedArray whose buffer's byte length is loaded.
              </td>
            </tr>
            <tr>
              <td>
                [[CachedBufferByteLength]]
              </td>
              <td>
                a non-negative integer or ~detached~
              </td>
              <td>
                The byte length of the object's [[ViewedArrayBuffer]] when the Record was created.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-maketypedarraywithbufferwitnessrecord" oldids="sec-makeintegerindexedobjectwithbufferwitnessrecord" type="abstract operation">
        <h1>
          MakeTypedArrayWithBufferWitnessRecord (
            _obj_: a TypedArray,
            _order_: ~seq-cst~ or ~unordered~,
          ): a TypedArray With Buffer Witness Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _buffer_ be _obj_.[[ViewedArrayBuffer]].
          1. If IsDetachedBuffer(_buffer_) is *true*, then
            1. Let _byteLength_ be ~detached~.
          1. Else,
            1. Let _byteLength_ be ArrayBufferByteLength(_buffer_, _order_).
          1. Return the TypedArray With Buffer Witness Record { [[Object]]: _obj_, [[CachedBufferByteLength]]: _byteLength_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraycreate" oldids="sec-integerindexedobjectcreate" type="abstract operation">
        <h1>
          TypedArrayCreate (
            _prototype_: an Object,
          ): a TypedArray
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of new TypedArrays.</dd>
        </dl>
        <emu-alg>
          1. Let _internalSlotsList_ be « [[Prototype]], [[Extensible]], [[ViewedArrayBuffer]], [[TypedArrayName]], [[ContentType]], [[ByteLength]], [[ByteOffset]], [[ArrayLength]] ».
          1. Let _A_ be MakeBasicObject(_internalSlotsList_).
          1. Set _A_.[[PreventExtensions]] as specified in <emu-xref href="#sec-typedarray-preventextensions"></emu-xref>.
          1. Set _A_.[[GetOwnProperty]] as specified in <emu-xref href="#sec-typedarray-getownproperty"></emu-xref>.
          1. Set _A_.[[HasProperty]] as specified in <emu-xref href="#sec-typedarray-hasproperty"></emu-xref>.
          1. Set _A_.[[DefineOwnProperty]] as specified in <emu-xref href="#sec-typedarray-defineownproperty"></emu-xref>.
          1. Set _A_.[[Get]] as specified in <emu-xref href="#sec-typedarray-get"></emu-xref>.
          1. Set _A_.[[Set]] as specified in <emu-xref href="#sec-typedarray-set"></emu-xref>.
          1. Set _A_.[[Delete]] as specified in <emu-xref href="#sec-typedarray-delete"></emu-xref>.
          1. Set _A_.[[OwnPropertyKeys]] as specified in <emu-xref href="#sec-typedarray-ownpropertykeys"></emu-xref>.
          1. Set _A_.[[Prototype]] to _prototype_.
          1. Return _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraybytelength" oldids="sec-integerindexedobjectbytelength" type="abstract operation">
        <h1>
          TypedArrayByteLength (
            _taRecord_: a TypedArray With Buffer Witness Record,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, return 0.
          1. Let _length_ be TypedArrayLength(_taRecord_).
          1. If _length_ = 0, return 0.
          1. Let _O_ be _taRecord_.[[Object]].
          1. If _O_.[[ByteLength]] is not ~auto~, return _O_.[[ByteLength]].
          1. Let _elementSize_ be TypedArrayElementSize(_O_).
          1. Return _length_ × _elementSize_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraylength" oldids="sec-integerindexedobjectlength" type="abstract operation">
        <h1>
          TypedArrayLength (
            _taRecord_: a TypedArray With Buffer Witness Record,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsTypedArrayOutOfBounds(_taRecord_) is *false*.
          1. Let _O_ be _taRecord_.[[Object]].
          1. If _O_.[[ArrayLength]] is not ~auto~, return _O_.[[ArrayLength]].
          1. Assert: IsFixedLengthArrayBuffer(_O_.[[ViewedArrayBuffer]]) is *false*.
          1. Let _byteOffset_ be _O_.[[ByteOffset]].
          1. Let _elementSize_ be TypedArrayElementSize(_O_).
          1. Let _byteLength_ be _taRecord_.[[CachedBufferByteLength]].
          1. Assert: _byteLength_ is not ~detached~.
          1. Return floor((_byteLength_ - _byteOffset_) / _elementSize_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-istypedarrayoutofbounds" oldids="sec-isintegerindexedobjectoutofbounds" type="abstract operation">
        <h1>
          IsTypedArrayOutOfBounds (
            _taRecord_: a TypedArray With Buffer Witness Record,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It checks if any of the object's numeric properties reference a value at an index not contained within the underlying buffer's bounds.</dd>
        </dl>
        <emu-alg>
          1. Let _O_ be _taRecord_.[[Object]].
          1. Let _bufferByteLength_ be _taRecord_.[[CachedBufferByteLength]].
          1. Assert: IsDetachedBuffer(_O_.[[ViewedArrayBuffer]]) is *true* if and only if _bufferByteLength_ is ~detached~.
          1. If _bufferByteLength_ is ~detached~, return *true*.
          1. Let _byteOffsetStart_ be _O_.[[ByteOffset]].
          1. If _O_.[[ArrayLength]] is ~auto~, then
            1. Let _byteOffsetEnd_ be _bufferByteLength_.
          1. Else,
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _byteOffsetEnd_ be _byteOffsetStart_ + _O_.[[ArrayLength]] × _elementSize_.
          1. If _byteOffsetStart_ > _bufferByteLength_ or _byteOffsetEnd_ > _bufferByteLength_, return *true*.
          1. NOTE: 0-length TypedArrays are not considered out-of-bounds.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-istypedarrayfixedlength" type="abstract operation">
        <h1>
          IsTypedArrayFixedLength (
            _O_: a TypedArray,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _O_.[[ArrayLength]] is ~auto~, return *false*.
          1. Let _buffer_ be _O_.[[ViewedArrayBuffer]].
          1. If IsFixedLengthArrayBuffer(_buffer_) is *false* and IsSharedArrayBuffer(_buffer_) is *false*, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isvalidintegerindex" type="abstract operation">
        <h1>
          IsValidIntegerIndex (
            _O_: a TypedArray,
            _index_: a Number,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If IsDetachedBuffer(_O_.[[ViewedArrayBuffer]]) is *true*, return *false*.
          1. If _index_ is not an integral Number, return *false*.
          1. If _index_ is *-0*<sub>𝔽</sub>, return *false*.
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~unordered~).
          1. NOTE: Bounds checking is not a synchronizing operation when _O_'s backing buffer is a growable SharedArrayBuffer.
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, return *false*.
          1. Let _length_ be TypedArrayLength(_taRecord_).
          1. If ℝ(_index_) &lt; 0 or ℝ(_index_) ≥ _length_, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraygetelement" oldids="sec-integerindexedelementget" type="abstract operation">
        <h1>
          TypedArrayGetElement (
            _O_: a TypedArray,
            _index_: a Number,
          ): a Number, a BigInt, or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If IsValidIntegerIndex(_O_, _index_) is *false*, return *undefined*.
          1. Let _offset_ be _O_.[[ByteOffset]].
          1. Let _elementSize_ be TypedArrayElementSize(_O_).
          1. Let _byteIndexInBuffer_ be (ℝ(_index_) × _elementSize_) + _offset_.
          1. Let _elementType_ be TypedArrayElementType(_O_).
          1. Return GetValueFromBuffer(_O_.[[ViewedArrayBuffer]], _byteIndexInBuffer_, _elementType_, *true*, ~unordered~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-typedarraysetelement" oldids="sec-integerindexedelementset" type="abstract operation">
        <h1>
          TypedArraySetElement (
            _O_: a TypedArray,
            _index_: a Number,
            _value_: an ECMAScript language value,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _O_.[[ContentType]] is ~bigint~, let _numValue_ be ? ToBigInt(_value_).
          1. Otherwise, let _numValue_ be ? ToNumber(_value_).
          1. If IsValidIntegerIndex(_O_, _index_) is *true*, then
            1. Let _offset_ be _O_.[[ByteOffset]].
            1. Let _elementSize_ be TypedArrayElementSize(_O_).
            1. Let _byteIndexInBuffer_ be (ℝ(_index_) × _elementSize_) + _offset_.
            1. Let _elementType_ be TypedArrayElementType(_O_).
            1. Perform SetValueInBuffer(_O_.[[ViewedArrayBuffer]], _byteIndexInBuffer_, _elementType_, _numValue_, *true*, ~unordered~).
          1. Return ~unused~.
        </emu-alg>
        <emu-note>
          <p>This operation always appears to succeed, but it has no effect when attempting to write past the end of a TypedArray or to a TypedArray which is backed by a detached ArrayBuffer.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-isarraybufferviewoutofbounds" type="abstract operation">
        <h1>
          IsArrayBufferViewOutOfBounds (
            _O_: a TypedArray or a DataView,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It checks if either any of a TypedArray's numeric properties or a DataView object's methods can reference a value at an index not contained within the underlying data block's bounds. This abstract operation exists as a convenience for upstream specifications.</dd>
        </dl>
        <emu-alg>
          1. If _O_ has a [[DataView]] internal slot, then
            1. Let _viewRecord_ be MakeDataViewWithBufferWitnessRecord(_O_, ~seq-cst~).
            1. Return IsViewOutOfBounds(_viewRecord_).
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. Return IsTypedArrayOutOfBounds(_taRecord_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-module-namespace-exotic-objects">

### Module Namespace Exotic Objects
      <p>A module namespace exotic object is an exotic object that exposes the bindings exported from an ECMAScript |Module| (See <emu-xref href="#sec-exports"></emu-xref>). There is a one-to-one correspondence between the String-keyed own properties of a module namespace exotic object and the binding names exported by the |Module|. The exported bindings include any bindings that are indirectly exported using `export *` export items. Each String-valued own property key is the StringValue of the corresponding exported binding name. These are the only String-keyed properties of a module namespace exotic object. Each such property has the attributes { [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: *false* }. Module namespace exotic objects are not extensible.</p>
      <p>An object is a <dfn id="module-namespace-exotic-object" variants="module namespace exotic objects">module namespace exotic object</dfn> if its [[GetPrototypeOf]], [[SetPrototypeOf]], [[IsExtensible]], [[PreventExtensions]], [[GetOwnProperty]], [[DefineOwnProperty]], [[HasProperty]], [[Get]], [[Set]], [[Delete]], and [[OwnPropertyKeys]] internal methods use the definitions in this section, and its other essential internal methods use the definitions found in <emu-xref href="#sec-ordinary-object-internal-methods-and-internal-slots"></emu-xref>. These methods are installed by ModuleNamespaceCreate.</p>
      <p>Module namespace exotic objects have the internal slots defined in <emu-xref href="#table-internal-slots-of-module-namespace-exotic-objects"></emu-xref>.</p>
      <emu-table id="table-internal-slots-of-module-namespace-exotic-objects" caption="Internal Slots of Module Namespace Exotic Objects" oldids="table-29">
        <table>
          <thead>
            <tr>
              <th>
                Internal Slot
              </th>
              <th>
                Type
              </th>
              <th>
                Description
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              [[Module]]
            </td>
            <td>
              a Module Record
            </td>
            <td>
              The Module Record whose exports this namespace exposes.
            </td>
          </tr>
          <tr>
            <td>
              [[Exports]]
            </td>
            <td>
              a List of Strings
            </td>
            <td>
              A List whose elements are the String values of the exported names exposed as own properties of this object. The list is sorted according to lexicographic code unit order.
            </td>
          </tr>
        </table>
      </emu-table>

      <emu-clause id="sec-module-namespace-exotic-objects-getprototypeof" type="internal method">
        <h1>[[GetPrototypeOf]] ( ): a normal completion containing *null*</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object</dd>
        </dl>
        <emu-alg>
          1. Return *null*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-setprototypeof-v" type="internal method">
        <h1>
          [[SetPrototypeOf]] (
            _V_: an Object or *null*,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. Return ! SetImmutablePrototype(_O_, _V_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-isextensible" type="internal method">
        <h1>[[IsExtensible]] ( ): a normal completion containing *false*</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object</dd>
        </dl>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-preventextensions" type="internal method">
        <h1>[[PreventExtensions]] ( ): a normal completion containing *true*</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object</dd>
        </dl>
        <emu-alg>
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-getownproperty-p" type="internal method">
        <h1>
          [[GetOwnProperty]] (
            _P_: a property key,
          ): either a normal completion containing either a Property Descriptor or *undefined*, or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a Symbol, return OrdinaryGetOwnProperty(_O_, _P_).
          1. Let _exports_ be _O_.[[Exports]].
          1. If _exports_ does not contain _P_, return *undefined*.
          1. Let _value_ be ? _O_.[[Get]](_P_, _O_).
          1. Return PropertyDescriptor { [[Value]]: _value_, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: *false* }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-defineownproperty-p-desc" type="internal method">
        <h1>
          [[DefineOwnProperty]] (
            _P_: a property key,
            _Desc_: a Property Descriptor,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a Symbol, return ! OrdinaryDefineOwnProperty(_O_, _P_, _Desc_).
          1. Let _current_ be ? _O_.[[GetOwnProperty]](_P_).
          1. If _current_ is *undefined*, return *false*.
          1. If _Desc_ has a [[Configurable]] field and _Desc_.[[Configurable]] is *true*, return *false*.
          1. If _Desc_ has an [[Enumerable]] field and _Desc_.[[Enumerable]] is *false*, return *false*.
          1. If IsAccessorDescriptor(_Desc_) is *true*, return *false*.
          1. If _Desc_ has a [[Writable]] field and _Desc_.[[Writable]] is *false*, return *false*.
          1. If _Desc_ has a [[Value]] field, return SameValue(_Desc_.[[Value]], _current_.[[Value]]).
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-hasproperty-p" type="internal method">
        <h1>
          [[HasProperty]] (
            _P_: a property key,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a Symbol, return ! OrdinaryHasProperty(_O_, _P_).
          1. Let _exports_ be _O_.[[Exports]].
          1. If _exports_ contains _P_, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-get-p-receiver" type="internal method">
        <h1>
          [[Get]] (
            _P_: a property key,
            _Receiver_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a Symbol, then
            1. Return ! OrdinaryGet(_O_, _P_, _Receiver_).
          1. Let _exports_ be _O_.[[Exports]].
          1. If _exports_ does not contain _P_, return *undefined*.
          1. Let _m_ be _O_.[[Module]].
          1. Let _binding_ be _m_.ResolveExport(_P_).
          1. Assert: _binding_ is a ResolvedBinding Record.
          1. Let _targetModule_ be _binding_.[[Module]].
          1. Assert: _targetModule_ is not *undefined*.
          1. If _binding_.[[BindingName]] is ~namespace~, then
            1. Return GetModuleNamespace(_targetModule_).
          1. Let _targetEnv_ be _targetModule_.[[Environment]].
          1. If _targetEnv_ is ~empty~, throw a *ReferenceError* exception.
          1. Return ? _targetEnv_.GetBindingValue(_binding_.[[BindingName]], *true*).
        </emu-alg>
        <emu-note>
          <p>ResolveExport is side-effect free. Each time this operation is called with a specific _exportName_, _resolveSet_ pair as arguments it must return the same result. An implementation might choose to pre-compute or cache the ResolveExport results for the [[Exports]] of each module namespace exotic object.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-set-p-v-receiver" type="internal method">
        <h1>
          [[Set]] (
            _P_: a property key,
            _V_: an ECMAScript language value,
            _Receiver_: an ECMAScript language value,
          ): a normal completion containing *false*
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object</dd>
        </dl>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-delete-p" type="internal method">
        <h1>
          [[Delete]] (
            _P_: a property key,
          ): a normal completion containing a Boolean
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. If _P_ is a Symbol, then
            1. Return ! OrdinaryDelete(_O_, _P_).
          1. Let _exports_ be _O_.[[Exports]].
          1. If _exports_ contains _P_, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-module-namespace-exotic-objects-ownpropertykeys" type="internal method">
        <h1>[[OwnPropertyKeys]] ( ): a normal completion containing a List of property keys</h1>
        <dl class="header">
          <dt>for</dt>
          <dd>a module namespace exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. Let _exports_ be _O_.[[Exports]].
          1. Let _symbolKeys_ be OrdinaryOwnPropertyKeys(_O_).
          1. Return the list-concatenation of _exports_ and _symbolKeys_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-modulenamespacecreate" type="abstract operation">
        <h1>
          ModuleNamespaceCreate (
            _module_: a Module Record,
            _exports_: a List of Strings,
          ): a module namespace exotic object
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to specify the creation of new module namespace exotic objects.</dd>
        </dl>
        <emu-alg>
          1. Assert: _module_.[[Namespace]] is ~empty~.
          1. Let _internalSlotsList_ be the internal slots listed in <emu-xref href="#table-internal-slots-of-module-namespace-exotic-objects"></emu-xref>.
          1. Let _M_ be MakeBasicObject(_internalSlotsList_).
          1. Set _M_'s essential internal methods to the definitions specified in <emu-xref href="#sec-module-namespace-exotic-objects"></emu-xref>.
          1. Set _M_.[[Module]] to _module_.
          1. Let _sortedExports_ be a List whose elements are the elements of _exports_, sorted according to lexicographic code unit order.
          1. Set _M_.[[Exports]] to _sortedExports_.
          1. Create own properties of _M_ corresponding to the definitions in <emu-xref href="#sec-module-namespace-objects"></emu-xref>.
          1. Set _module_.[[Namespace]] to _M_.
          1. Return _M_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<emu-clause id="sec-immutable-prototype-exotic-objects">

### Immutable Prototype Exotic Objects
      <p>An immutable prototype exotic object is an exotic object that has a [[Prototype]] internal slot that will not change once it is initialized.</p>

      <p>An object is an <dfn id="immutable-prototype-exotic-object" variants="immutable prototype exotic objects">immutable prototype exotic object</dfn> if its [[SetPrototypeOf]] internal method uses the following implementation. (Its other essential internal methods may use any implementation, depending on the specific immutable prototype exotic object in question.)</p>

      <emu-note>
        <p>Unlike other exotic objects, there is not a dedicated creation abstract operation provided for immutable prototype exotic objects. This is because they are only used by %Object.prototype% and by host environments, and in host environments, the relevant objects are potentially exotic in other ways and thus need their own dedicated creation operation.</p>
      </emu-note>

      <emu-clause id="sec-immutable-prototype-exotic-objects-setprototypeof-v" type="internal method">
        <h1>
          [[SetPrototypeOf]] (
            _V_: an Object or *null*,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
          <dt>for</dt>
          <dd>an immutable prototype exotic object _O_</dd>
        </dl>
        <emu-alg>
          1. Return ? SetImmutablePrototype(_O_, _V_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-set-immutable-prototype" type="abstract operation">
        <h1>
          SetImmutablePrototype (
            _O_: an Object,
            _V_: an Object or *null*,
          ): either a normal completion containing a Boolean or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _current_ be ? <emu-meta effects="user-code">_O_.[[GetPrototypeOf]]</emu-meta>().
          1. If SameValue(_V_, _current_) is *true*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-proxy-object-internal-methods-and-internal-slots">

## Proxy Object Internal Methods and Internal Slots
    <p>A Proxy object is an exotic object whose essential internal methods are partially implemented using ECMAScript code. Every Proxy object has an internal slot called [[ProxyHandler]]. The value of [[ProxyHandler]] is an object, called the proxy's <em>handler object</em>, or *null*. Methods (see <emu-xref href="#table-proxy-handler-methods"></emu-xref>) of a handler object may be used to augment the implementation for one or more of the Proxy object's internal methods. Every Proxy object also has an internal slot called [[ProxyTarget]] whose value is either an object or the *null* value. This object is called the proxy's <em>target object</em>.</p>

    <p>An object is a <dfn id="proxy-exotic-object" variants="Proxy exotic objects">Proxy exotic object</dfn> if its essential internal methods (including [[Call]] and [[Construct]], if applicable) use the definitions in this section. These internal methods are installed in ProxyCreate.</p>

    <emu-table id="table-proxy-handler-methods" caption="Proxy Handler Methods" oldids="table-30">
      <table>
        <thead>
          <tr>
            <th>
              Internal Method
            </th>
            <th>
              Handler Method
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            [[GetPrototypeOf]]
          </td>
          <td>
            `getPrototypeOf`
          </td>
        </tr>
        <tr>
          <td>
            [[SetPrototypeOf]]
          </td>
          <td>
            `setPrototypeOf`
          </td>
        </tr>
        <tr>
          <td>
            [[IsExtensible]]
          </td>
          <td>
            `isExtensible`
          </td>
        </tr>
        <tr>
          <td>
            [[PreventExtensions]]
          </td>
          <td>
            `preventExtensions`
          </td>
        </tr>
        <tr>
          <td>
            [[GetOwnProperty]]
          </td>
          <td>
            `getOwnPropertyDescriptor`
          </td>
        </tr>
        <tr>
          <td>
            [[DefineOwnProperty]]
          </td>
          <td>
            `defineProperty`
          </td>
        </tr>
        <tr>
          <td>
            [[HasProperty]]
          </td>
          <td>
            `has`
          </td>
        </tr>
        <tr>
          <td>
            [[Get]]
          </td>
          <td>
            `get`
          </td>
        </tr>
        <tr>
          <td>
            [[Set]]
          </td>
          <td>
            `set`
          </td>
        </tr>
        <tr>
          <td>
            [[Delete]]
          </td>
          <td>
            `deleteProperty`
          </td>
        </tr>
        <tr>
          <td>
            [[OwnPropertyKeys]]
          </td>
          <td>
            `ownKeys`
          </td>
        </tr>
        <tr>
          <td>
            [[Call]]
          </td>
          <td>
            `apply`
          </td>
        </tr>
        <tr>
          <td>
            [[Construct]]
          </td>
          <td>
            `construct`
          </td>
        </tr>
      </table>
    </emu-table>
    <p>When a handler method is called to provide the implementation of a Proxy object internal method, the handler method is passed the proxy's target object as a parameter. A proxy's handler object does not necessarily have a method corresponding to every essential internal method. Invoking an internal method on the proxy results in the invocation of the corresponding internal method on the proxy's target object if the handler object does not have a method corresponding to the internal trap.</p>
    <p>The [[ProxyHandler]] and [[ProxyTarget]] internal slots of a Proxy object are always initialized when the object is created and typically may not be modified. Some Proxy objects are created in a manner that permits them to be subsequently <em>revoked</em>. When a proxy is revoked, its [[ProxyHandler]] and [[ProxyTarget]] internal slots are set to *null* causing subsequent invocations of internal methods on that Proxy object to throw a *TypeError* exception.</p>
    <p>Because Proxy objects permit the implementation of internal methods to be provided by arbitrary ECMAScript code, it is possible to define a Proxy object whose handler methods violates the invariants defined in <emu-xref href="#sec-invariants-of-the-essential-internal-methods"></emu-xref>. Some of the internal method invariants defined in <emu-xref href="#sec-invariants-of-the-essential-internal-methods"></emu-xref> are essential integrity invariants. These invariants are explicitly enforced by the Proxy object internal methods specified in this section. An ECMAScript implementation must be robust in the presence of all possible invariant violations.</p>
    <p>In the following algorithm descriptions, assume _O_ is an ECMAScript Proxy object, _P_ is a property key value, _V_ is any ECMAScript language value and _Desc_ is a Property Descriptor record.</p>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-getprototypeof" type="internal method">
      <h1>[[GetPrototypeOf]] ( ): either a normal completion containing either an Object or *null*, or a throw completion</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"getPrototypeOf"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[GetPrototypeOf]]</emu-meta>().
        1. Let _handlerProto_ be ? Call(_trap_, _handler_, « _target_ »).
        1. If _handlerProto_ is not an Object and _handlerProto_ is not *null*, throw a *TypeError* exception.
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. If _extensibleTarget_ is *true*, return _handlerProto_.
        1. Let _targetProto_ be ? <emu-meta effects="user-code">_target_.[[GetPrototypeOf]]</emu-meta>().
        1. If SameValue(_handlerProto_, _targetProto_) is *false*, throw a *TypeError* exception.
        1. Return _handlerProto_.
      </emu-alg>
      <emu-note>
        <p>[[GetPrototypeOf]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[GetPrototypeOf]] must be either an Object or *null*.
          </li>
          <li>
            If the target object is not extensible, [[GetPrototypeOf]] applied to the Proxy object must return the same value as [[GetPrototypeOf]] applied to the Proxy object's target object.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-setprototypeof-v" type="internal method">
      <h1>
        [[SetPrototypeOf]] (
          _V_: an Object or *null*,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"setPrototypeOf"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[SetPrototypeOf]]</emu-meta>(_V_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_, _V_ »)).
        1. If _booleanTrapResult_ is *false*, return *false*.
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. If _extensibleTarget_ is *true*, return *true*.
        1. Let _targetProto_ be ? <emu-meta effects="user-code">_target_.[[GetPrototypeOf]]</emu-meta>().
        1. If SameValue(_V_, _targetProto_) is *false*, throw a *TypeError* exception.
        1. Return *true*.
      </emu-alg>
      <emu-note>
        <p>[[SetPrototypeOf]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[SetPrototypeOf]] is a Boolean value.
          </li>
          <li>
            If the target object is not extensible, the argument value must be the same as the result of [[GetPrototypeOf]] applied to target object.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-isextensible" type="internal method">
      <h1>[[IsExtensible]] ( ): either a normal completion containing a Boolean or a throw completion</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"isExtensible"*).
        1. If _trap_ is *undefined*, then
          1. Return ? IsExtensible(_target_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_ »)).
        1. Let _targetResult_ be ? IsExtensible(_target_).
        1. If _booleanTrapResult_ is not _targetResult_, throw a *TypeError* exception.
        1. Return _booleanTrapResult_.
      </emu-alg>
      <emu-note>
        <p>[[IsExtensible]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[IsExtensible]] is a Boolean value.
          </li>
          <li>
            [[IsExtensible]] applied to the Proxy object must return the same value as [[IsExtensible]] applied to the Proxy object's target object with the same argument.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-preventextensions" type="internal method">
      <h1>[[PreventExtensions]] ( ): either a normal completion containing a Boolean or a throw completion</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"preventExtensions"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[PreventExtensions]]()</emu-meta>.
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_ »)).
        1. If _booleanTrapResult_ is *true*, then
          1. Let _extensibleTarget_ be ? IsExtensible(_target_).
          1. If _extensibleTarget_ is *true*, throw a *TypeError* exception.
        1. Return _booleanTrapResult_.
      </emu-alg>
      <emu-note>
        <p>[[PreventExtensions]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[PreventExtensions]] is a Boolean value.
          </li>
          <li>
            [[PreventExtensions]] applied to the Proxy object only returns *true* if [[IsExtensible]] applied to the Proxy object's target object is *false*.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-getownproperty-p" type="internal method">
      <h1>
        [[GetOwnProperty]] (
          _P_: a property key,
        ): either a normal completion containing either a Property Descriptor or *undefined*, or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"getOwnPropertyDescriptor"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. Let _trapResultObj_ be ? Call(_trap_, _handler_, « _target_, _P_ »).
        1. If _trapResultObj_ is not an Object and _trapResultObj_ is not *undefined*, throw a *TypeError* exception.
        1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. If _trapResultObj_ is *undefined*, then
          1. If _targetDesc_ is *undefined*, return *undefined*.
          1. If _targetDesc_.[[Configurable]] is *false*, throw a *TypeError* exception.
          1. Let _extensibleTarget_ be ? IsExtensible(_target_).
          1. If _extensibleTarget_ is *false*, throw a *TypeError* exception.
          1. Return *undefined*.
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. Let _resultDesc_ be ? ToPropertyDescriptor(_trapResultObj_).
        1. Perform CompletePropertyDescriptor(_resultDesc_).
        1. Let _valid_ be IsCompatiblePropertyDescriptor(_extensibleTarget_, _resultDesc_, _targetDesc_).
        1. If _valid_ is *false*, throw a *TypeError* exception.
        1. If _resultDesc_.[[Configurable]] is *false*, then
          1. If _targetDesc_ is *undefined* or _targetDesc_.[[Configurable]] is *true*, then
            1. Throw a *TypeError* exception.
          1. If _resultDesc_ has a [[Writable]] field and _resultDesc_.[[Writable]] is *false*, then
            1. Assert: _targetDesc_ has a [[Writable]] field.
            1. If _targetDesc_.[[Writable]] is *true*, throw a *TypeError* exception.
        1. Return _resultDesc_.
      </emu-alg>
      <emu-note>
        <p>[[GetOwnProperty]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[GetOwnProperty]] must be either an Object or *undefined*.
          </li>
          <li>
            A property cannot be reported as non-existent, if it exists as a non-configurable own property of the target object.
          </li>
          <li>
            A property cannot be reported as non-existent, if it exists as an own property of a non-extensible target object.
          </li>
          <li>
            A property cannot be reported as existent, if it does not exist as an own property of the target object and the target object is not extensible.
          </li>
          <li>
            A property cannot be reported as non-configurable, unless it exists as a non-configurable own property of the target object.
          </li>
          <li>
            A property cannot be reported as both non-configurable and non-writable, unless it exists as a non-configurable, non-writable own property of the target object.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc" type="internal method">
      <h1>
        [[DefineOwnProperty]] (
          _P_: a property key,
          _Desc_: a Property Descriptor,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"defineProperty"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[DefineOwnProperty]]</emu-meta>(_P_, _Desc_).
        1. Let _descObj_ be FromPropertyDescriptor(_Desc_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_, _P_, _descObj_ »)).
        1. If _booleanTrapResult_ is *false*, return *false*.
        1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. If _Desc_ has a [[Configurable]] field and _Desc_.[[Configurable]] is *false*, then
          1. Let _settingConfigFalse_ be *true*.
        1. Else,
          1. Let _settingConfigFalse_ be *false*.
        1. If _targetDesc_ is *undefined*, then
          1. If _extensibleTarget_ is *false*, throw a *TypeError* exception.
          1. If _settingConfigFalse_ is *true*, throw a *TypeError* exception.
        1. Else,
          1. If IsCompatiblePropertyDescriptor(_extensibleTarget_, _Desc_, _targetDesc_) is *false*, throw a *TypeError* exception.
          1. If _settingConfigFalse_ is *true* and _targetDesc_.[[Configurable]] is *true*, throw a *TypeError* exception.
          1. If IsDataDescriptor(_targetDesc_) is *true*, _targetDesc_.[[Configurable]] is *false*, and _targetDesc_.[[Writable]] is *true*, then
            1. If _Desc_ has a [[Writable]] field and _Desc_.[[Writable]] is *false*, throw a *TypeError* exception.
        1. Return *true*.
      </emu-alg>
      <emu-note>
        <p>[[DefineOwnProperty]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[DefineOwnProperty]] is a Boolean value.
          </li>
          <li>
            A property cannot be added, if the target object is not extensible.
          </li>
          <li>
            A property cannot be non-configurable, unless there exists a corresponding non-configurable own property of the target object.
          </li>
          <li>
            A non-configurable property cannot be non-writable, unless there exists a corresponding non-configurable, non-writable own property of the target object.
          </li>
          <li>
            If a property has a corresponding target object property then applying the Property Descriptor of the property to the target object using [[DefineOwnProperty]] will not throw an exception.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-hasproperty-p" type="internal method">
      <h1>
        [[HasProperty]] (
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"has"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[HasProperty]]</emu-meta>(_P_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_, _P_ »)).
        1. If _booleanTrapResult_ is *false*, then
          1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
          1. If _targetDesc_ is not *undefined*, then
            1. If _targetDesc_.[[Configurable]] is *false*, throw a *TypeError* exception.
            1. Let _extensibleTarget_ be ? IsExtensible(_target_).
            1. If _extensibleTarget_ is *false*, throw a *TypeError* exception.
        1. Return _booleanTrapResult_.
      </emu-alg>
      <emu-note>
        <p>[[HasProperty]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[HasProperty]] is a Boolean value.
          </li>
          <li>
            A property cannot be reported as non-existent, if it exists as a non-configurable own property of the target object.
          </li>
          <li>
            A property cannot be reported as non-existent, if it exists as an own property of the target object and the target object is not extensible.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver" type="internal method">
      <h1>
        [[Get]] (
          _P_: a property key,
          _Receiver_: an ECMAScript language value,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"get"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[Get]]</emu-meta>(_P_, _Receiver_).
        1. Let _trapResult_ be ? Call(_trap_, _handler_, « _target_, _P_, _Receiver_ »).
        1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. If _targetDesc_ is not *undefined* and _targetDesc_.[[Configurable]] is *false*, then
          1. If IsDataDescriptor(_targetDesc_) is *true* and _targetDesc_.[[Writable]] is *false*, then
            1. If SameValue(_trapResult_, _targetDesc_.[[Value]]) is *false*, throw a *TypeError* exception.
          1. If IsAccessorDescriptor(_targetDesc_) is *true* and _targetDesc_.[[Get]] is *undefined*, then
            1. If _trapResult_ is not *undefined*, throw a *TypeError* exception.
        1. Return _trapResult_.
      </emu-alg>
      <emu-note>
        <p>[[Get]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable own data property.
          </li>
          <li>
            The value reported for a property must be *undefined* if the corresponding target object property is a non-configurable own accessor property that has *undefined* as its [[Get]] attribute.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver" type="internal method">
      <h1>
        [[Set]] (
          _P_: a property key,
          _V_: an ECMAScript language value,
          _Receiver_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"set"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[Set]]</emu-meta>(_P_, _V_, _Receiver_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_, _P_, _V_, _Receiver_ »)).
        1. If _booleanTrapResult_ is *false*, return *false*.
        1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. If _targetDesc_ is not *undefined* and _targetDesc_.[[Configurable]] is *false*, then
          1. If IsDataDescriptor(_targetDesc_) is *true* and _targetDesc_.[[Writable]] is *false*, then
            1. If SameValue(_V_, _targetDesc_.[[Value]]) is *false*, throw a *TypeError* exception.
          1. If IsAccessorDescriptor(_targetDesc_) is *true*, then
            1. If _targetDesc_.[[Set]] is *undefined*, throw a *TypeError* exception.
        1. Return *true*.
      </emu-alg>
      <emu-note>
        <p>[[Set]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[Set]] is a Boolean value.
          </li>
          <li>
            Cannot change the value of a property to be different from the value of the corresponding target object property if the corresponding target object property is a non-writable, non-configurable own data property.
          </li>
          <li>
            Cannot set the value of a property if the corresponding target object property is a non-configurable own accessor property that has *undefined* as its [[Set]] attribute.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-delete-p" type="internal method">
      <h1>
        [[Delete]] (
          _P_: a property key,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"deleteProperty"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[Delete]]</emu-meta>(_P_).
        1. Let _booleanTrapResult_ be ToBoolean(? Call(_trap_, _handler_, « _target_, _P_ »)).
        1. If _booleanTrapResult_ is *false*, return *false*.
        1. Let _targetDesc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_P_).
        1. If _targetDesc_ is *undefined*, return *true*.
        1. If _targetDesc_.[[Configurable]] is *false*, throw a *TypeError* exception.
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. If _extensibleTarget_ is *false*, throw a *TypeError* exception.
        1. Return *true*.
      </emu-alg>
      <emu-note>
        <p>[[Delete]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[Delete]] is a Boolean value.
          </li>
          <li>
            A property cannot be reported as deleted, if it exists as a non-configurable own property of the target object.
          </li>
          <li>
            A property cannot be reported as deleted, if it exists as an own property of the target object and the target object is non-extensible.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys" type="internal method">
      <h1>[[OwnPropertyKeys]] ( ): either a normal completion containing a List of property keys or a throw completion</h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"ownKeys"*).
        1. If _trap_ is *undefined*, then
          1. Return ? <emu-meta effects="user-code">_target_.[[OwnPropertyKeys]]()</emu-meta>.
        1. Let _trapResultArray_ be ? Call(_trap_, _handler_, « _target_ »).
        1. Let _trapResult_ be ? CreateListFromArrayLike(_trapResultArray_, ~property-key~).
        1. If _trapResult_ contains any duplicate entries, throw a *TypeError* exception.
        1. Let _extensibleTarget_ be ? IsExtensible(_target_).
        1. Let _targetKeys_ be ? <emu-meta effects="user-code">_target_.[[OwnPropertyKeys]]()</emu-meta>.
        1. Assert: _targetKeys_ is a List of property keys.
        1. Assert: _targetKeys_ contains no duplicate entries.
        1. Let _targetConfigurableKeys_ be a new empty List.
        1. Let _targetNonconfigurableKeys_ be a new empty List.
        1. For each element _key_ of _targetKeys_, do
          1. Let _desc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_key_).
          1. If _desc_ is not *undefined* and _desc_.[[Configurable]] is *false*, then
            1. Append _key_ to _targetNonconfigurableKeys_.
          1. Else,
            1. Append _key_ to _targetConfigurableKeys_.
        1. If _extensibleTarget_ is *true* and _targetNonconfigurableKeys_ is empty, then
          1. Return _trapResult_.
        1. Let _uncheckedResultKeys_ be a List whose elements are the elements of _trapResult_.
        1. For each element _key_ of _targetNonconfigurableKeys_, do
          1. If _uncheckedResultKeys_ does not contain _key_, throw a *TypeError* exception.
          1. Remove _key_ from _uncheckedResultKeys_.
        1. If _extensibleTarget_ is *true*, return _trapResult_.
        1. For each element _key_ of _targetConfigurableKeys_, do
          1. If _uncheckedResultKeys_ does not contain _key_, throw a *TypeError* exception.
          1. Remove _key_ from _uncheckedResultKeys_.
        1. If _uncheckedResultKeys_ is not empty, throw a *TypeError* exception.
        1. Return _trapResult_.
      </emu-alg>
      <emu-note>
        <p>[[OwnPropertyKeys]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[OwnPropertyKeys]] is a List.
          </li>
          <li>
            The returned List contains no duplicate entries.
          </li>
          <li>
            Each element of the returned List is a property key.
          </li>
          <li>
            The result List must contain the keys of all non-configurable own properties of the target object.
          </li>
          <li>
            If the target object is not extensible, then the result List must contain all the keys of the own properties of the target object and no other values.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist" type="internal method">
      <h1>
        [[Call]] (
          _thisArgument_: an ECMAScript language value,
          _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"apply"*).
        1. If _trap_ is *undefined*, then
          1. Return ? Call(_target_, _thisArgument_, _argumentsList_).
        1. Let _argArray_ be CreateArrayFromList(_argumentsList_).
        1. Return ? Call(_trap_, _handler_, « _target_, _thisArgument_, _argArray_ »).
      </emu-alg>
      <emu-note>
        <p>A Proxy exotic object only has a [[Call]] internal method if the initial value of its [[ProxyTarget]] internal slot is an object that has a [[Call]] internal method.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-proxy-object-internal-methods-and-internal-slots-construct-argumentslist-newtarget" type="internal method">
      <h1>
        [[Construct]] (
          _argumentsList_: a List of ECMAScript language values,
          _newTarget_: a constructor,
        ): either a normal completion containing an Object or a throw completion
      </h1>
      <dl class="header">
        <dt>for</dt>
        <dd>a Proxy exotic object _O_</dd>
      </dl>
      <emu-alg>
        1. Perform ? ValidateNonRevokedProxy(_O_).
        1. Let _target_ be _O_.[[ProxyTarget]].
        1. Assert: IsConstructor(_target_) is *true*.
        1. Let _handler_ be _O_.[[ProxyHandler]].
        1. Assert: _handler_ is an Object.
        1. Let _trap_ be ? GetMethod(_handler_, *"construct"*).
        1. If _trap_ is *undefined*, then
          1. Return ? Construct(_target_, _argumentsList_, _newTarget_).
        1. Let _argArray_ be CreateArrayFromList(_argumentsList_).
        1. Let _newObj_ be ? Call(_trap_, _handler_, « _target_, _argArray_, _newTarget_ »).
        1. If _newObj_ is not an Object, throw a *TypeError* exception.
        1. Return _newObj_.
      </emu-alg>
      <emu-note>
        <p>A Proxy exotic object only has a [[Construct]] internal method if the initial value of its [[ProxyTarget]] internal slot is an object that has a [[Construct]] internal method.</p>
      </emu-note>
      <emu-note>
        <p>[[Construct]] for Proxy objects enforces the following invariants:</p>
        <ul>
          <li>
            The result of [[Construct]] must be an Object.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-validatenonrevokedproxy" type="abstract operation">
      <h1>
        ValidateNonRevokedProxy (
          _proxy_: a Proxy exotic object,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It throws a *TypeError* exception if _proxy_ has been revoked.</dd>
      </dl>
      <emu-alg>
        1. If _proxy_.[[ProxyTarget]] is *null*, throw a *TypeError* exception.
        1. Assert: _proxy_.[[ProxyHandler]] is not *null*.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-proxycreate" type="abstract operation">
      <h1>
        ProxyCreate (
          _target_: an ECMAScript language value,
          _handler_: an ECMAScript language value,
        ): either a normal completion containing a Proxy exotic object or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to specify the creation of new Proxy objects.</dd>
      </dl>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. If _handler_ is not an Object, throw a *TypeError* exception.
        1. Let _P_ be MakeBasicObject(« [[ProxyHandler]], [[ProxyTarget]] »).
        1. Set _P_'s essential internal methods, except for [[Call]] and [[Construct]], to the definitions specified in <emu-xref href="#sec-proxy-object-internal-methods-and-internal-slots"></emu-xref>.
        1. If IsCallable(_target_) is *true*, then
          1. Set _P_.[[Call]] as specified in <emu-xref href="#sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist"></emu-xref>.
          1. If IsConstructor(_target_) is *true*, then
            1. Set _P_.[[Construct]] as specified in <emu-xref href="#sec-proxy-object-internal-methods-and-internal-slots-construct-argumentslist-newtarget"></emu-xref>.
        1. Set _P_.[[ProxyTarget]] to _target_.
        1. Set _P_.[[ProxyHandler]] to _handler_.
        1. Return _P_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

<h1 id="sec-ecmascript-language-source-code"></h1>
