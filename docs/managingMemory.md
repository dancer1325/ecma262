# Managing Memory

  <emu-clause id="sec-weak-ref-objects">
    <h1>WeakRef Objects</h1>
    <p>A WeakRef is an object that is used to refer to a target object or symbol without preserving it from garbage collection. WeakRefs can be dereferenced to allow access to the target value, if the target hasn't been reclaimed by garbage collection.</p>

    <emu-clause id="sec-weak-ref-constructor">
      <h1>The WeakRef Constructor</h1>
      <p>The <dfn variants="WeakRefs">WeakRef</dfn> constructor:</p>
      <ul>
        <li>is <dfn>%WeakRef%</dfn>.</li>
        <li>
          is the initial value of the *"WeakRef"* property of the global object.
        </li>
        <li>
          creates and initializes a new WeakRef when called as a constructor.
        </li>
        <li>
          is not intended to be called as a function and will throw an exception when called in that manner.
        </li>
        <li>
          may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified `WeakRef` behaviour must include a `super` call to the `WeakRef` constructor to create and initialize the subclass instance with the internal state necessary to support the `WeakRef.prototype` built-in methods.
        </li>
      </ul>

      <emu-clause id="sec-weak-ref-target">
        <h1>WeakRef ( _target_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. If CanBeHeldWeakly(_target_) is *false*, throw a *TypeError* exception.
          1. Let _weakRef_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%WeakRef.prototype%"*, « [[WeakRefTarget]] »).
          1. Perform AddToKeptObjects(_target_).
          1. Set _weakRef_.[[WeakRefTarget]] to _target_.
          1. Return _weakRef_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weak-ref-constructor">
      <h1>Properties of the WeakRef Constructor</h1>
      <p>The WeakRef constructor:</p>
      <ul>
        <li>
          has a [[Prototype]] internal slot whose value is %Function.prototype%.
        </li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-weak-ref.prototype">
        <h1>WeakRef.prototype</h1>
        <p>The initial value of `WeakRef.prototype` is the WeakRef prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-weak-ref-prototype-object">
      <h1>Properties of the WeakRef Prototype Object</h1>
      <p>The <dfn>WeakRef prototype</dfn> object:</p>
      <ul>
        <li>is <dfn>%WeakRef.prototype%</dfn>.</li>
        <li>
          has a [[Prototype]] internal slot whose value is %Object.prototype%.
        </li>
        <li>is an ordinary object.</li>
        <li>does not have a [[WeakRefTarget]] internal slot.</li>
      </ul>

      <emu-clause id="sec-weak-ref.prototype.constructor" normative-optional>
        <h1>WeakRef.prototype.constructor</h1>

        <p>The initial value of `WeakRef.prototype.constructor` is %WeakRef%.</p>

        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-weak-ref.prototype.deref">
        <h1>WeakRef.prototype.deref ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _weakRef_ be the *this* value.
          1. Perform ? RequireInternalSlot(_weakRef_, [[WeakRefTarget]]).
          1. Return WeakRefDeref(_weakRef_).
        </emu-alg>

        <emu-note>
          <p>If the WeakRef returns a _target_ value that is not *undefined*, then this _target_ value should not be garbage collected until the current execution of ECMAScript code has completed. The AddToKeptObjects operation makes sure read consistency is maintained.</p>

          <pre><code class="javascript">
            let target = { foo() {} };
            let weakRef = new WeakRef(target);

            // ... later ...

            if (weakRef.deref()) {
              weakRef.deref().foo();
            }
          </code></pre>

          <p>In the above example, if the first deref does not evaluate to *undefined* then the second deref cannot either.</p>
        </emu-note>
      </emu-clause>

      <emu-clause oldids="sec-weak-ref.prototype-@@tostringtag" id="sec-weak-ref.prototype-%symbol.tostringtag%">
        <h1>WeakRef.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"WeakRef"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-weakref-abstract-operations">
      <h1>WeakRef Abstract Operations</h1>

      <emu-clause id="sec-weakrefderef" type="abstract operation">
        <h1>
          WeakRefDeref (
            _weakRef_: a WeakRef,
          ): an ECMAScript language value
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _target_ be _weakRef_.[[WeakRefTarget]].
          1. If _target_ is not ~empty~, then
            1. Perform AddToKeptObjects(_target_).
            1. Return _target_.
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>This abstract operation is defined separately from WeakRef.prototype.deref strictly to make it possible to succinctly define liveness.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-weak-ref-instances">
      <h1>Properties of WeakRef Instances</h1>
      <p>WeakRef instances are ordinary objects that inherit properties from the WeakRef prototype. WeakRef instances also have a [[WeakRefTarget]] internal slot.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-finalization-registry-objects">
    <h1>FinalizationRegistry Objects</h1>
    <p>A FinalizationRegistry is an object that manages registration and unregistration of cleanup operations that are performed when target objects and symbols are garbage collected.</p>

    <emu-clause id="sec-finalization-registry-constructor">
      <h1>The FinalizationRegistry Constructor</h1>
      <p>The <dfn variants="FinalizationRegistrys">FinalizationRegistry</dfn> constructor:</p>
      <ul>
        <li>is <dfn>%FinalizationRegistry%</dfn>.</li>
        <li>
          is the initial value of the *"FinalizationRegistry"* property of the global object.
        </li>
        <li>
          creates and initializes a new FinalizationRegistry when called as a constructor.
        </li>
        <li>
          is not intended to be called as a function and will throw an exception when called in that manner.
        </li>
        <li>
          may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified `FinalizationRegistry` behaviour must include a `super` call to the `FinalizationRegistry` constructor to create and initialize the subclass instance with the internal state necessary to support the `FinalizationRegistry.prototype` built-in methods.
        </li>
      </ul>

      <emu-clause id="sec-finalization-registry-cleanup-callback">
        <h1>FinalizationRegistry ( _cleanupCallback_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. If IsCallable(_cleanupCallback_) is *false*, throw a *TypeError* exception.
          1. Let _finalizationRegistry_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%FinalizationRegistry.prototype%"*, « [[Realm]], [[CleanupCallback]], [[Cells]] »).
          1. Let _fn_ be the active function object.
          1. Set _finalizationRegistry_.[[Realm]] to _fn_.[[Realm]].
          1. Set _finalizationRegistry_.[[CleanupCallback]] to HostMakeJobCallback(_cleanupCallback_).
          1. Set _finalizationRegistry_.[[Cells]] to a new empty List.
          1. Return _finalizationRegistry_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-finalization-registry-constructor">
      <h1>Properties of the FinalizationRegistry Constructor</h1>
      <p>The FinalizationRegistry constructor:</p>
      <ul>
        <li>
          has a [[Prototype]] internal slot whose value is %Function.prototype%.
        </li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-finalization-registry.prototype">
        <h1>FinalizationRegistry.prototype</h1>
        <p>The initial value of `FinalizationRegistry.prototype` is the FinalizationRegistry prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-finalization-registry-prototype-object">
      <h1>Properties of the FinalizationRegistry Prototype Object</h1>
      <p>The <dfn>FinalizationRegistry prototype</dfn> object:</p>
      <ul>
        <li>is <dfn>%FinalizationRegistry.prototype%</dfn>.</li>
        <li>
          has a [[Prototype]] internal slot whose value is %Object.prototype%.
        </li>
        <li>is an ordinary object.</li>
        <li>
          does not have [[Cells]] and [[CleanupCallback]] internal slots.
        </li>
      </ul>

      <emu-clause id="sec-finalization-registry.prototype.constructor">
        <h1>FinalizationRegistry.prototype.constructor</h1>
        <p>The initial value of `FinalizationRegistry.prototype.constructor` is %FinalizationRegistry%.</p>
      </emu-clause>

      <emu-clause id="sec-finalization-registry.prototype.register">
        <h1>FinalizationRegistry.prototype.register ( _target_, _heldValue_ [ , _unregisterToken_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _finalizationRegistry_ be the *this* value.
          1. Perform ? RequireInternalSlot(_finalizationRegistry_, [[Cells]]).
          1. If CanBeHeldWeakly(_target_) is *false*, throw a *TypeError* exception.
          1. If SameValue(_target_, _heldValue_) is *true*, throw a *TypeError* exception.
          1. If CanBeHeldWeakly(_unregisterToken_) is *false*, then
            1. If _unregisterToken_ is not *undefined*, throw a *TypeError* exception.
            1. Set _unregisterToken_ to ~empty~.
          1. Let _cell_ be the Record { [[WeakRefTarget]]: _target_, [[HeldValue]]: _heldValue_, [[UnregisterToken]]: _unregisterToken_ }.
          1. Append _cell_ to _finalizationRegistry_.[[Cells]].
          1. Return *undefined*.
        </emu-alg>

        <emu-note>
          <p>Based on the algorithms and definitions in this specification, _cell_.[[HeldValue]] is live when _finalizationRegistry_.[[Cells]] contains _cell_; however, this does not necessarily mean that _cell_.[[UnregisterToken]] or _cell_.[[Target]] are live. For example, registering an object with itself as its unregister token would not keep the object alive forever.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-finalization-registry.prototype.unregister">
        <h1>FinalizationRegistry.prototype.unregister ( _unregisterToken_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _finalizationRegistry_ be the *this* value.
          1. Perform ? RequireInternalSlot(_finalizationRegistry_, [[Cells]]).
          1. If CanBeHeldWeakly(_unregisterToken_) is *false*, throw a *TypeError* exception.
          1. Let _removed_ be *false*.
          1. For each Record { [[WeakRefTarget]], [[HeldValue]], [[UnregisterToken]] } _cell_ of _finalizationRegistry_.[[Cells]], do
            1. If _cell_.[[UnregisterToken]] is not ~empty~ and SameValue(_cell_.[[UnregisterToken]], _unregisterToken_) is *true*, then
              1. Remove _cell_ from _finalizationRegistry_.[[Cells]].
              1. Set _removed_ to *true*.
          1. Return _removed_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-finalization-registry.prototype-@@tostringtag" id="sec-finalization-registry.prototype-%symbol.tostringtag%">
        <h1>FinalizationRegistry.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"FinalizationRegistry"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-finalization-registry-instances">
      <h1>Properties of FinalizationRegistry Instances</h1>
      <p>FinalizationRegistry instances are ordinary objects that inherit properties from the FinalizationRegistry prototype. FinalizationRegistry instances also have [[Cells]] and [[CleanupCallback]] internal slots.</p>
    </emu-clause>
  </emu-clause>

<h1 id="sec-control-abstraction-objects"></h1>
