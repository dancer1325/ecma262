# Reflection

<h2 id="sec-reflect-object"></h2>

## The Reflect Object
* TODO:
    <p>The Reflect object:</p>
    <ul>
      <li>is <dfn>%Reflect%</dfn>.</li>
      <li>is the initial value of the *"Reflect"* property of the global object.</li>
      <li>is an ordinary object.</li>
      <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      <li>is not a function object.</li>
      <li>does not have a [[Construct]] internal method; it cannot be used as a constructor with the `new` operator.</li>
      <li>does not have a [[Call]] internal method; it cannot be invoked as a function.</li>
    </ul>

    <emu-clause id="sec-reflect.apply">
      <h1>Reflect.apply ( _target_, _thisArgument_, _argumentsList_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If IsCallable(_target_) is *false*, throw a *TypeError* exception.
        1. Let _args_ be ? CreateListFromArrayLike(_argumentsList_).
        1. Perform PrepareForTailCall().
        1. Return ? Call(_target_, _thisArgument_, _args_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.construct">
      <h1>Reflect.construct ( _target_, _argumentsList_ [ , _newTarget_ ] )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If IsConstructor(_target_) is *false*, throw a *TypeError* exception.
        1. If _newTarget_ is not present, set _newTarget_ to _target_.
        1. Else if IsConstructor(_newTarget_) is *false*, throw a *TypeError* exception.
        1. Let _args_ be ? CreateListFromArrayLike(_argumentsList_).
        1. Return ? Construct(_target_, _args_, _newTarget_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.defineproperty">
      <h1>Reflect.defineProperty ( _target_, _propertyKey_, _attributes_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. Let _desc_ be ? ToPropertyDescriptor(_attributes_).
        1. Return ? <emu-meta effects="user-code">_target_.[[DefineOwnProperty]]</emu-meta>(_key_, _desc_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.deleteproperty">
      <h1>Reflect.deleteProperty ( _target_, _propertyKey_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. Return ? <emu-meta effects="user-code">_target_.[[Delete]]</emu-meta>(_key_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.get">
      <h1>Reflect.get ( _target_, _propertyKey_ [ , _receiver_ ] )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. If _receiver_ is not present, then
          1. Set _receiver_ to _target_.
        1. Return ? <emu-meta effects="user-code">_target_.[[Get]]</emu-meta>(_key_, _receiver_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.getownpropertydescriptor">
      <h1>Reflect.getOwnPropertyDescriptor ( _target_, _propertyKey_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. Let _desc_ be ? <emu-meta effects="user-code">_target_.[[GetOwnProperty]]</emu-meta>(_key_).
        1. Return FromPropertyDescriptor(_desc_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.getprototypeof">
      <h1>Reflect.getPrototypeOf ( _target_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Return ? <emu-meta effects="user-code">_target_.[[GetPrototypeOf]]()</emu-meta>.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.has">
      <h1>Reflect.has ( _target_, _propertyKey_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. Return ? <emu-meta effects="user-code">_target_.[[HasProperty]]</emu-meta>(_key_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.isextensible">
      <h1>Reflect.isExtensible ( _target_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Return ? <emu-meta effects="user-code">_target_.[[IsExtensible]]()</emu-meta>.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.ownkeys">
      <h1>Reflect.ownKeys ( _target_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _keys_ be ? <emu-meta effects="user-code">_target_.[[OwnPropertyKeys]]()</emu-meta>.
        1. Return CreateArrayFromList(_keys_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.preventextensions">
      <h1>Reflect.preventExtensions ( _target_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Return ? <emu-meta effects="user-code">_target_.[[PreventExtensions]]()</emu-meta>.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.set">
      <h1>Reflect.set ( _target_, _propertyKey_, _V_ [ , _receiver_ ] )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _key_ be ? ToPropertyKey(_propertyKey_).
        1. If _receiver_ is not present, then
          1. Set _receiver_ to _target_.
        1. Return ? <emu-meta effects="user-code">_target_.[[Set]]</emu-meta>(_key_, _V_, _receiver_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-reflect.setprototypeof">
      <h1>Reflect.setPrototypeOf ( _target_, _proto_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. If _proto_ is not an Object and _proto_ is not *null*, throw a *TypeError* exception.
        1. Return ? <emu-meta effects="user-code">_target_.[[SetPrototypeOf]]</emu-meta>(_proto_).
      </emu-alg>
    </emu-clause>

    <emu-clause oldids="sec-reflect-@@tostringtag" id="sec-reflect-%symbol.tostringtag%">
      <h1>Reflect [ %Symbol.toStringTag% ]</h1>
      <p>The initial value of the %Symbol.toStringTag% property is the String value *"Reflect"*.</p>
      <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
    </emu-clause>

<h2 id="sec-proxy-objects"></h2>

## Proxy Objects

* TODO:
  <emu-clause id="sec-proxy-constructor">
  <h1>The Proxy Constructor</h1>
  <p>The Proxy constructor:</p>
  <ul>
  <li>is <dfn>%Proxy%</dfn>.</li>
  <li>is the initial value of the *"Proxy"* property of the global object.</li>
  <li>creates and initializes a new Proxy object when called as a constructor.</li>
  <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
  </ul>

      <emu-clause id="sec-proxy-target-handler">
        <h1>Proxy ( _target_, _handler_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Return ? ProxyCreate(_target_, _handler_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-proxy-constructor">
      <h1>Properties of the Proxy Constructor</h1>
      <p>The Proxy constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>does not have a *"prototype"* property because Proxy objects do not have a [[Prototype]] internal slot that requires initialization.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-proxy.revocable" oldids="sec-proxy-revocation-functions">
        <h1>Proxy.revocable ( _target_, _handler_ )</h1>
        <p>This function creates a revocable Proxy object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _proxy_ be ? ProxyCreate(_target_, _handler_).
          1. Let _revokerClosure_ be a new Abstract Closure with no parameters that captures nothing and performs the following steps when called:
            1. Let _F_ be the active function object.
            1. Let _p_ be _F_.[[RevocableProxy]].
            1. If _p_ is *null*, return *undefined*.
            1. Set _F_.[[RevocableProxy]] to *null*.
            1. Assert: _p_ is a Proxy exotic object.
            1. Set _p_.[[ProxyTarget]] to *null*.
            1. Set _p_.[[ProxyHandler]] to *null*.
            1. Return *undefined*.
          1. Let _revoker_ be CreateBuiltinFunction(_revokerClosure_, 0, *""*, « [[RevocableProxy]] »).
          1. Set _revoker_.[[RevocableProxy]] to _proxy_.
          1. Let _result_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Perform ! CreateDataPropertyOrThrow(_result_, *"proxy"*, _proxy_).
          1. Perform ! CreateDataPropertyOrThrow(_result_, *"revoke"*, _revoker_).
          1. Return _result_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<h2 id="sec-module-namespace-objects"></h2>

## Module Namespace Objects

* Module Namespace Object
  * == module namespace exotic object /
    * provides
      * runtime property-based access -- to a -- module's exported bindings
  * way to create it
    * ❌NO exist constructor function ❌
    * created / EACH module / -- imported by an -- `ImportDeclaration` / contains a `NameSpaceImport`
  * properties
    * module namespace exotic object's properties
    * `%Symbol.toStringTag%`
      * initial value = `"Module"`
      * attributes
        ```
        {
          [[Writable]]: *false*,
          [[Enumerable]]: *false*,
          [[Configurable]]: *false*
        }
        ```

<h1 id="sec-memory-model"></h1>
