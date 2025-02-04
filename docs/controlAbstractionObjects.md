# Control Abstraction Objects

<emu-clause id="sec-iteration">

## Iteration

    <emu-clause id="sec-common-iteration-interfaces">
      <h1>Common Iteration Interfaces</h1>
      <p>An interface is a set of property keys whose associated values match a specific specification. Any object that provides all the properties as described by an interface's specification <em>conforms</em> to that interface. An interface is not represented by a distinct object. There may be many separately implemented objects that conform to any interface. An individual object may conform to multiple interfaces.</p>

      <emu-clause id="sec-iterable-interface">
        <h1>The Iterable Interface</h1>
        <p>The <dfn variants="iterable,iterables,iterable object,iterable objects">iterable interface</dfn> includes the property described in <emu-xref href="#table-iterable-interface-required-properties"></emu-xref>:</p>
        <emu-table id="table-iterable-interface-required-properties" caption="Iterable Interface Required Properties" oldids="table-52">
          <table>
            <thead>
              <tr>
                <th>
                  Property
                </th>
                <th>
                  Value
                </th>
                <th>
                  Requirements
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                `%Symbol.iterator%`
              </td>
              <td>
                a function that returns an iterator object
              </td>
              <td>
                The returned object must conform to the iterator interface.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-iterator-interface">
        <h1>The Iterator Interface</h1>
        <p>An object that implements the <dfn variants="iterator object,iterator objects,iterator,iterators">iterator interface</dfn> must include the property in <emu-xref href="#table-iterator-interface-required-properties"></emu-xref>. Such objects may also implement the properties in <emu-xref href="#table-iterator-interface-optional-properties"></emu-xref>.</p>
        <emu-table id="table-iterator-interface-required-properties" caption="Iterator Interface Required Properties" oldids="table-53">
          <table>
            <thead>
              <tr>
                <th>
                  Property
                </th>
                <th>
                  Value
                </th>
                <th>
                  Requirements
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                *"next"*
              </td>
              <td>
                a function that returns an IteratorResult object
              </td>
              <td>
                The returned object must conform to the IteratorResult interface. If a previous call to the `next` method of an iterator has returned an IteratorResult object whose *"done"* property is *true*, then all subsequent calls to the `next` method of that object should also return an IteratorResult object whose *"done"* property is *true*. However, this requirement is not enforced.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>Arguments may be passed to the `next` function but their interpretation and validity is dependent upon the target iterator. The for-of statement and other common users of <em>Iterators</em> do not pass any arguments, so iterator objects that expect to be used in such a manner must be prepared to deal with being called with no arguments.</p>
        </emu-note>
        <emu-table id="table-iterator-interface-optional-properties" caption="Iterator Interface Optional Properties" oldids="table-54">
          <table>
            <thead>
              <tr>
                <th>
                  Property
                </th>
                <th>
                  Value
                </th>
                <th>
                  Requirements
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                *"return"*
              </td>
              <td>
                a function that returns an IteratorResult object
              </td>
              <td>
                The returned object must conform to the IteratorResult interface. Invoking this method notifies the iterator object that the caller does not intend to make any more `next` method calls to the iterator. The returned IteratorResult object will typically have a *"done"* property whose value is *true*, and a *"value"* property with the value passed as the argument of the `return` method. However, this requirement is not enforced.
              </td>
            </tr>
            <tr>
              <td>
                *"throw"*
              </td>
              <td>
                a function that returns an IteratorResult object
              </td>
              <td>
                The returned object must conform to the IteratorResult interface. Invoking this method notifies the iterator object that the caller has detected an error condition. The argument may be used to identify the error condition and typically will be an exception object. A typical response is to `throw` the value passed as the argument. If the method does not `throw`, the returned IteratorResult object will typically have a *"done"* property whose value is *true*.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>Typically callers of these methods should check for their existence before invoking them. Certain ECMAScript language features including `for`-`of`, `yield*`, and array destructuring call these methods after performing an existence check. Most ECMAScript library functions that accept iterable objects as arguments also conditionally call them.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-asynciterable-interface">
        <h1>The Async Iterable Interface</h1>
        <p>The <dfn variants="async iterable,async iterables,async iterable object,async iterable objects">async iterable interface</dfn> includes the properties described in <emu-xref href="#table-async-iterable"></emu-xref>:</p>
        <emu-table id="table-async-iterable" caption="Async Iterable Interface Required Properties">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
                <th>Requirements</th>
              </tr>
            </thead>
            <tr>
              <td>`%Symbol.asyncIterator%`</td>
              <td>a function that returns an async iterator object</td>
              <td>The returned object must conform to the async iterator interface.</td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-asynciterator-interface">
        <h1>The Async Iterator Interface</h1>
        <p>An object that implements the <dfn variants="async iterator object,async iterator objects,async iterator,async iterators">async iterator interface</dfn> must include the properties in <emu-xref href="#table-async-iterator-required"></emu-xref>. Such objects may also implement the properties in <emu-xref href="#table-async-iterator-optional"></emu-xref>.</p>
        <emu-table id="table-async-iterator-required" caption="Async Iterator Interface Required Properties">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
                <th>Requirements</th>
              </tr>
            </thead>
            <tr>
              <td>*"next"*</td>
              <td>a function that returns a promise for an IteratorResult object</td>
              <td>
                <p>The returned promise, when fulfilled, must fulfill with an object that conforms to the IteratorResult interface. If a previous call to the `next` method of an async iterator has returned a promise for an IteratorResult object whose *"done"* property is *true*, then all subsequent calls to the `next` method of that object should also return a promise for an IteratorResult object whose *"done"* property is *true*. However, this requirement is not enforced.</p>

                <p>Additionally, the IteratorResult object that serves as a fulfillment value should have a *"value"* property whose value is not a promise (or "thenable"). However, this requirement is also not enforced.</p>
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>Arguments may be passed to the `next` function but their interpretation and validity is dependent upon the target async iterator. The `for`-`await`-`of` statement and other common users of <em>AsyncIterators</em> do not pass any arguments, so async iterator objects that expect to be used in such a manner must be prepared to deal with being called with no arguments.</p>
        </emu-note>
        <emu-table id="table-async-iterator-optional" caption="Async Iterator Interface Optional Properties">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
                <th>Requirements</th>
              </tr>
            </thead>
            <tr>
              <td>*"return"*</td>
              <td>a function that returns a promise for an IteratorResult object</td>
              <td>
                <p>The returned promise, when fulfilled, must fulfill with an object that conforms to the IteratorResult interface. Invoking this method notifies the async iterator object that the caller does not intend to make any more `next` method calls to the async iterator. The returned promise will fulfill with an IteratorResult object which will typically have a *"done"* property whose value is *true*, and a *"value"* property with the value passed as the argument of the `return` method. However, this requirement is not enforced.</p>

                <p>Additionally, the IteratorResult object that serves as a fulfillment value should have a *"value"* property whose value is not a promise (or "thenable"). If the argument value is used in the typical manner, then if it is a rejected promise, a promise rejected with the same reason should be returned; if it is a fulfilled promise, then its fulfillment value should be used as the *"value"* property of the returned promise's IteratorResult object fulfillment value. However, these requirements are also not enforced.</p>
              </td>
            </tr>
            <tr>
              <td>*"throw"*</td>
              <td>a function that returns a promise for an IteratorResult object</td>
              <td>
                <p>The returned promise, when fulfilled, must fulfill with an object that conforms to the IteratorResult interface. Invoking this method notifies the async iterator object that the caller has detected an error condition. The argument may be used to identify the error condition and typically will be an exception object. A typical response is to return a rejected promise which rejects with the value passed as the argument.</p>

                <p>If the returned promise is fulfilled, the IteratorResult object fulfillment value will typically have a *"done"* property whose value is *true*. Additionally, it should have a *"value"* property whose value is not a promise (or "thenable"), but this requirement is not enforced.</p>
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p>Typically callers of these methods should check for their existence before invoking them. Certain ECMAScript language features including `for`-`await`-`of` and `yield*` call these methods after performing an existence check.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-iteratorresult-interface">
        <h1>The IteratorResult Interface</h1>
        <p>The <dfn variants="IteratorResult object,IteratorResult objects">IteratorResult interface</dfn> includes the properties listed in <emu-xref href="#table-iteratorresult-interface-properties"></emu-xref>:</p>
        <emu-table id="table-iteratorresult-interface-properties" caption="IteratorResult Interface Properties" oldids="table-55">
          <table>
            <thead>
              <tr>
                <th>
                  Property
                </th>
                <th>
                  Value
                </th>
                <th>
                  Requirements
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                *"done"*
              </td>
              <td>
                a Boolean
              </td>
              <td>
                This is the result status of an <em>iterator</em> `next` method call. If the end of the iterator was reached *"done"* is *true*. If the end was not reached *"done"* is *false* and a value is available. If a *"done"* property (either own or inherited) does not exist, it is considered to have the value *false*.
              </td>
            </tr>
            <tr>
              <td>
                *"value"*
              </td>
              <td>
                an ECMAScript language value
              </td>
              <td>
                If done is *false*, this is the current iteration element value. If done is *true*, this is the return value of the iterator, if it supplied one. If the iterator does not have a return value, *"value"* is *undefined*. In that case, the *"value"* property may be absent from the conforming object if it does not inherit an explicit *"value"* property.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-iterator-helper-objects">
      <h1>Iterator Helper Objects</h1>
      <p>An <dfn variants="Iterator Helper objects">Iterator Helper object</dfn> is an ordinary object that represents a lazy transformation of some specific source iterator object. There is not a named constructor for Iterator Helper objects. Instead, Iterator Helper objects are created by calling certain methods of Iterator instance objects.</p>

      <emu-clause id="sec-%iteratorhelperprototype%-object">
        <h1>The %IteratorHelperPrototype% Object</h1>
        <p>The <dfn>%IteratorHelperPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all Iterator Helper objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%iteratorhelperprototype%.next">
          <h1>%IteratorHelperPrototype%.next ( )</h1>
          <emu-alg>
            1. Return ? GeneratorResume(*this* value, *undefined*, *"Iterator Helper"*).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-%iteratorhelperprototype%.return">
          <h1>%IteratorHelperPrototype%.return ( )</h1>
          <emu-alg>
            1. Let _O_ be *this* value.
            1. Perform ? RequireInternalSlot(_O_, [[UnderlyingIterator]]).
            1. Assert: _O_ has a [[GeneratorState]] internal slot.
            1. If _O_.[[GeneratorState]] is ~suspended-start~, then
              1. Set _O_.[[GeneratorState]] to ~completed~.
              1. NOTE: Once a generator enters the completed state it never leaves it and its associated execution context is never resumed. Any execution state associated with _O_ can be discarded at this point.
              1. Perform ? IteratorClose(_O_.[[UnderlyingIterator]], ReturnCompletion(*undefined*)).
              1. Return CreateIteratorResultObject(*undefined*, *true*).
            1. Let _C_ be ReturnCompletion(*undefined*).
            1. Return ? GeneratorResumeAbrupt(_O_, _C_, *"Iterator Helper"*).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-%iteratorhelperprototype%-%symbol.tostringtag%">
          <h1>%IteratorHelperPrototype% [ %Symbol.toStringTag% ]</h1>
          <p>The initial value of the %Symbol.toStringTag% property is the String value *"Iterator Helper"*.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-iterator-objects">
      <h1>Iterator Objects</h1>

      <emu-clause id="sec-iterator-constructor">
        <h1>The Iterator Constructor</h1>
        <p>The <dfn>Iterator</dfn> constructor:</p>
        <ul>
          <li>is <dfn>%Iterator%</dfn>.</li>
          <li>is the initial value of the *"Iterator"* property of the global object.</li>
          <li>is designed to be subclassable. It may be used as the value of an *extends* clause of a class definition.</li>
        </ul>

        <emu-clause id="sec-iterator">
          <h1>Iterator ( )</h1>
          <p>This function performs the following steps when called:</p>
          <emu-alg>
            1. If NewTarget is either *undefined* or the active function object, throw a *TypeError* exception.
            1. Return ? OrdinaryCreateFromConstructor(NewTarget, *"%Iterator.prototype%"*).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-the-iterator-constructor">
        <h1>Properties of the Iterator Constructor</h1>
        <p>The Iterator constructor:</p>
        <ul>
          <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-iterator.from">
          <h1>Iterator.from ( _O_ )</h1>
          <emu-alg>
            1. Let _iteratorRecord_ be ? GetIteratorFlattenable(_O_, ~iterate-string-primitives~).
            1. Let _hasInstance_ be ? OrdinaryHasInstance(%Iterator%, _iteratorRecord_.[[Iterator]]).
            1. If _hasInstance_ is *true*, then
              1. Return _iteratorRecord_.[[Iterator]].
            1. Let _wrapper_ be OrdinaryObjectCreate(%WrapForValidIteratorPrototype%, « [[Iterated]] »).
            1. Set _wrapper_.[[Iterated]] to _iteratorRecord_.
            1. Return _wrapper_.
          </emu-alg>

          <emu-clause id="sec-%wrapforvaliditeratorprototype%-object">
            <h1>The %WrapForValidIteratorPrototype% Object</h1>
            <p>The <dfn>%WrapForValidIteratorPrototype%</dfn> object:</p>
            <ul>
              <li>is an ordinary object.</li>
              <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
            </ul>

            <emu-clause id="sec-%wrapforvaliditeratorprototype%.next">
              <h1>%WrapForValidIteratorPrototype%.next ( )</h1>
              <emu-alg>
                1. Let _O_ be *this* value.
                1. Perform ? RequireInternalSlot(_O_, [[Iterated]]).
                1. Let _iteratorRecord_ be _O_.[[Iterated]].
                1. Return ? Call(_iteratorRecord_.[[NextMethod]], _iteratorRecord_.[[Iterator]]).
              </emu-alg>
            </emu-clause>

            <emu-clause id="sec-%wrapforvaliditeratorprototype%.return">
              <h1>%WrapForValidIteratorPrototype%.return ( )</h1>
              <emu-alg>
                1. Let _O_ be *this* value.
                1. Perform ? RequireInternalSlot(_O_, [[Iterated]]).
                1. Let _iterator_ be _O_.[[Iterated]].[[Iterator]].
                1. Assert: _iterator_ is an Object.
                1. Let _returnMethod_ be ? GetMethod(_iterator_, *"return"*).
                1. If _returnMethod_ is *undefined*, then
                  1. Return CreateIteratorResultObject(*undefined*, *true*).
                1. Return ? Call(_returnMethod_, _iterator_).
              </emu-alg>
            </emu-clause>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-iterator.prototype">
          <h1>Iterator.prototype</h1>
          <p>The initial value of Iterator.prototype is %Iterator.prototype%.</p>
          <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause oldids="sec-%iteratorprototype%-object" id="sec-%iterator.prototype%-object">
      <h1>The %Iterator.prototype% Object</h1>
      <p>The <dfn>%Iterator.prototype%</dfn> object:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
      </ul>
      <emu-note>
        <p>All objects defined in this specification that implement the Iterator interface also inherit from %Iterator.prototype%. ECMAScript code may also define objects that inherit from %Iterator.prototype%. The %Iterator.prototype% object provides a place where additional methods that are applicable to all iterator objects may be added.</p>
        <p>The following expression is one way that ECMAScript code can access the %Iterator.prototype% object:</p>
        <pre><code class="javascript">Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))</code></pre>
      </emu-note>

      <emu-clause id="sec-iterator.prototype.constructor">
        <h1>Iterator.prototype.constructor</h1>
        <p>`Iterator.prototype.constructor` is an accessor property with attributes { [[Enumerable]]: *false*, [[Configurable]]: *true* }. The [[Get]] and [[Set]] attributes are defined as follows:</p>

        <emu-clause id="sec-get-iterator.prototype.constructor">
          <h1>get Iterator.prototype.constructor</h1>
          <p>The value of the [[Get]] attribute is a built-in function that requires no arguments. It performs the following steps when called:</p>
          <emu-alg>
            1. Return %Iterator%.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-set-iterator.prototype.constructor">
          <h1>set Iterator.prototype.constructor</h1>
          <p>The value of the [[Set]] attribute is a built-in function that takes an argument _v_. It performs the following steps when called:</p>
          <emu-alg>
            1. Perform ? SetterThatIgnoresPrototypeProperties(*this* value, %Iterator.prototype%, *"constructor"*, _v_).
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-note>
          <p>Unlike the *"constructor"* property on most built-in prototypes, for web-compatibility reasons this property must be an accessor.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.drop">
        <h1>Iterator.prototype.drop ( _limit_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Let _numLimit_ be ? ToNumber(_limit_).
          1. If _numLimit_ is *NaN*, throw a *RangeError* exception.
          1. Let _integerLimit_ be ! ToIntegerOrInfinity(_numLimit_).
          1. If _integerLimit_ &lt; 0, throw a *RangeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _iterated_ and _integerLimit_ and performs the following steps when called:
            1. Let _remaining_ be _integerLimit_.
            1. Repeat, while _remaining_ > 0,
              1. If _remaining_ ≠ +∞, then
                1. Set _remaining_ to _remaining_ - 1.
              1. Let _next_ be ? IteratorStep(_iterated_).
              1. If _next_ is ~done~, return ReturnCompletion(*undefined*).
            1. Repeat,
              1. Let _value_ be ? IteratorStepValue(_iterated_).
              1. If _value_ is ~done~, return ReturnCompletion(*undefined*).
              1. Let _completion_ be Completion(Yield(_value_)).
              1. IfAbruptCloseIterator(_completion_, _iterated_).
          1. Let _result_ be CreateIteratorFromClosure(_closure_, *"Iterator Helper"*, %IteratorHelperPrototype%, « [[UnderlyingIterator]] »).
          1. Set _result_.[[UnderlyingIterator]] to _iterated_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.every">
        <h1>Iterator.prototype.every ( _predicate_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_predicate_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _counter_ be 0.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return *true*.
            1. Let _result_ be Completion(Call(_predicate_, *undefined*, « _value_, 𝔽(_counter_) »)).
            1. IfAbruptCloseIterator(_result_, _iterated_).
            1. If ToBoolean(_result_) is *false*, return ? IteratorClose(_iterated_, NormalCompletion(*false*)).
            1. Set _counter_ to _counter_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.filter">
        <h1>Iterator.prototype.filter ( _predicate_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_predicate_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _iterated_ and _predicate_ and performs the following steps when called:
            1. Let _counter_ be 0.
            1. Repeat,
              1. Let _value_ be ? IteratorStepValue(_iterated_).
              1. If _value_ is ~done~, return ReturnCompletion(*undefined*).
              1. Let _selected_ be Completion(Call(_predicate_, *undefined*, « _value_, 𝔽(_counter_) »)).
              1. IfAbruptCloseIterator(_selected_, _iterated_).
              1. If ToBoolean(_selected_) is *true*, then
                1. Let _completion_ be Completion(Yield(_value_)).
                1. IfAbruptCloseIterator(_completion_, _iterated_).
              1. Set _counter_ to _counter_ + 1.
          1. Let _result_ be CreateIteratorFromClosure(_closure_, *"Iterator Helper"*, %IteratorHelperPrototype%, « [[UnderlyingIterator]] »).
          1. Set _result_.[[UnderlyingIterator]] to _iterated_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.find">
        <h1>Iterator.prototype.find ( _predicate_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_predicate_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _counter_ be 0.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return *undefined*.
            1. Let _result_ be Completion(Call(_predicate_, *undefined*, « _value_, 𝔽(_counter_) »)).
            1. IfAbruptCloseIterator(_result_, _iterated_).
            1. If ToBoolean(_result_) is *true*, return ? IteratorClose(_iterated_, NormalCompletion(_value_)).
            1. Set _counter_ to _counter_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.flatmap">
        <h1>Iterator.prototype.flatMap ( _mapper_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_mapper_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _iterated_ and _mapper_ and performs the following steps when called:
            1. Let _counter_ be 0.
            1. Repeat,
              1. Let _value_ be ? IteratorStepValue(_iterated_).
              1. If _value_ is ~done~, return ReturnCompletion(*undefined*).
              1. Let _mapped_ be Completion(Call(_mapper_, *undefined*, « _value_, 𝔽(_counter_) »)).
              1. IfAbruptCloseIterator(_mapped_, _iterated_).
              1. Let _innerIterator_ be Completion(GetIteratorFlattenable(_mapped_, ~reject-primitives~)).
              1. IfAbruptCloseIterator(_innerIterator_, _iterated_).
              1. Let _innerAlive_ be *true*.
              1. Repeat, while _innerAlive_ is *true*,
                1. Let _innerValue_ be Completion(IteratorStepValue(_innerIterator_)).
                1. IfAbruptCloseIterator(_innerValue_, _iterated_).
                1. If _innerValue_ is ~done~, then
                  1. Set _innerAlive_ to *false*.
                1. Else,
                  1. Let _completion_ be Completion(Yield(_innerValue_)).
                  1. If _completion_ is an abrupt completion, then
                    1. Let _backupCompletion_ be Completion(IteratorClose(_innerIterator_, _completion_)).
                    1. IfAbruptCloseIterator(_backupCompletion_, _iterated_).
                    1. Return ? IteratorClose(_iterated_, _completion_).
              1. Set _counter_ to _counter_ + 1.
          1. Let _result_ be CreateIteratorFromClosure(_closure_, *"Iterator Helper"*, %IteratorHelperPrototype%, « [[UnderlyingIterator]] »).
          1. Set _result_.[[UnderlyingIterator]] to _iterated_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.foreach">
        <h1>Iterator.prototype.forEach ( _procedure_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_procedure_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _counter_ be 0.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return *undefined*.
            1. Let _result_ be Completion(Call(_procedure_, *undefined*, « _value_, 𝔽(_counter_) »)).
            1. IfAbruptCloseIterator(_result_, _iterated_).
            1. Set _counter_ to _counter_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.map">
        <h1>Iterator.prototype.map ( _mapper_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_mapper_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _iterated_ and _mapper_ and performs the following steps when called:
            1. Let _counter_ be 0.
            1. Repeat,
              1. Let _value_ be ? IteratorStepValue(_iterated_).
              1. If _value_ is ~done~, return ReturnCompletion(*undefined*).
              1. Let _mapped_ be Completion(Call(_mapper_, *undefined*, « _value_, 𝔽(_counter_) »)).
              1. IfAbruptCloseIterator(_mapped_, _iterated_).
              1. Let _completion_ be Completion(Yield(_mapped_)).
              1. IfAbruptCloseIterator(_completion_, _iterated_).
              1. Set _counter_ to _counter_ + 1.
          1. Let _result_ be CreateIteratorFromClosure(_closure_, *"Iterator Helper"*, %IteratorHelperPrototype%, « [[UnderlyingIterator]] »).
          1. Set _result_.[[UnderlyingIterator]] to _iterated_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.reduce">
        <h1>Iterator.prototype.reduce ( _reducer_ [ , _initialValue_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_reducer_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. If _initialValue_ is not present, then
            1. Let _accumulator_ be ? IteratorStepValue(_iterated_).
            1. If _accumulator_ is ~done~, throw a *TypeError* exception.
            1. Let _counter_ be 1.
          1. Else,
            1. Let _accumulator_ be _initialValue_.
            1. Let _counter_ be 0.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return _accumulator_.
            1. Let _result_ be Completion(Call(_reducer_, *undefined*, « _accumulator_, _value_, 𝔽(_counter_) »)).
            1. IfAbruptCloseIterator(_result_, _iterated_).
            1. Set _accumulator_ to _result_.
            1. Set _counter_ to _counter_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.some">
        <h1>Iterator.prototype.some ( _predicate_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_predicate_) is *false*, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _counter_ be 0.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return *false*.
            1. Let _result_ be Completion(Call(_predicate_, *undefined*, « _value_, 𝔽(_counter_) »)).
            1. IfAbruptCloseIterator(_result_, _iterated_).
            1. If ToBoolean(_result_) is *true*, return ? IteratorClose(_iterated_, NormalCompletion(*true*)).
            1. Set _counter_ to _counter_ + 1.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.take">
        <h1>Iterator.prototype.take ( _limit_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Let _numLimit_ be ? ToNumber(_limit_).
          1. If _numLimit_ is *NaN*, throw a *RangeError* exception.
          1. Let _integerLimit_ be ! ToIntegerOrInfinity(_numLimit_).
          1. If _integerLimit_ &lt; 0, throw a *RangeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _iterated_ and _integerLimit_ and performs the following steps when called:
            1. Let _remaining_ be _integerLimit_.
            1. Repeat,
              1. If _remaining_ = 0, then
                1. Return ? IteratorClose(_iterated_, ReturnCompletion(*undefined*)).
              1. If _remaining_ ≠ +∞, then
                1. Set _remaining_ to _remaining_ - 1.
              1. Let _value_ be ? IteratorStepValue(_iterated_).
              1. If _value_ is ~done~, return ReturnCompletion(*undefined*).
              1. Let _completion_ be Completion(Yield(_value_)).
              1. IfAbruptCloseIterator(_completion_, _iterated_).
          1. Let _result_ be CreateIteratorFromClosure(_closure_, *"Iterator Helper"*, %IteratorHelperPrototype%, « [[UnderlyingIterator]] »).
          1. Set _result_.[[UnderlyingIterator]] to _iterated_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype.toarray">
        <h1>Iterator.prototype.toArray ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. If _O_ is not an Object, throw a *TypeError* exception.
          1. Let _iterated_ be ? GetIteratorDirect(_O_).
          1. Let _items_ be a new empty List.
          1. Repeat,
            1. Let _value_ be ? IteratorStepValue(_iterated_).
            1. If _value_ is ~done~, return CreateArrayFromList(_items_).
            1. Append _value_ to _items_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-%iteratorprototype%-@@iterator,sec-%iteratorprototype%-%symbol.iterator%" id="sec-iterator.prototype-%symbol.iterator%">
        <h1>Iterator.prototype [ %Symbol.iterator% ] ( )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"[Symbol.iterator]"*.</p>
      </emu-clause>

      <emu-clause id="sec-iterator.prototype-%symbol.tostringtag%">
        <h1>Iterator.prototype [ %Symbol.toStringTag% ]</h1>
        <p>`Iterator.prototype[%Symbol.toStringTag%]` is an accessor property with attributes { [[Enumerable]]: *false*, [[Configurable]]: *true* }. The [[Get]] and [[Set]] attributes are defined as follows:</p>

        <emu-clause id="sec-get-iterator.prototype-%symbol.tostringtag%">
          <h1>get Iterator.prototype [ %Symbol.toStringTag% ]</h1>
          <p>The value of the [[Get]] attribute is a built-in function that requires no arguments. It performs the following steps when called:</p>
          <emu-alg>
            1. Return *"Iterator"*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-set-iterator.prototype-%symbol.tostringtag%">
          <h1>set Iterator.prototype [ %Symbol.toStringTag% ]</h1>
          <p>The value of the [[Set]] attribute is a built-in function that takes an argument _v_. It performs the following steps when called:</p>
          <emu-alg>
            1. Perform ? SetterThatIgnoresPrototypeProperties(*this* value, %Iterator.prototype%, %Symbol.toStringTag%, _v_).
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-note>
          <p>Unlike the %Symbol.toStringTag% property on most built-in prototypes, for web-compatibility reasons this property must be an accessor.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-asynciteratorprototype">
      <h1>The %AsyncIteratorPrototype% Object</h1>
      <p>The <dfn>%AsyncIteratorPrototype%</dfn> object:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
      </ul>
      <emu-note>
        <p>All objects defined in this specification that implement the async iterator interface also inherit from %AsyncIteratorPrototype%. ECMAScript code may also define objects that inherit from %AsyncIteratorPrototype%. The %AsyncIteratorPrototype% object provides a place where additional methods that are applicable to all async iterator objects may be added.</p>
      </emu-note>

      <emu-clause oldids="sec-asynciteratorprototype-asynciterator" id="sec-%asynciteratorprototype%-%symbol.asynciterator%">
        <h1>%AsyncIteratorPrototype% [ %Symbol.asyncIterator% ] ( )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"[Symbol.asyncIterator]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-async-from-sync-iterator-objects">
      <h1>Async-from-Sync Iterator Objects</h1>
      <p>An <dfn variants="Async-from-Sync Iterator objects">Async-from-Sync Iterator object</dfn> is an async iterator that adapts a specific synchronous iterator. Async-from-Sync Iterator objects are never directly accessible to ECMAScript code. There is not a named constructor for Async-from-Sync Iterator objects. Instead, Async-from-Sync Iterator objects are created by the CreateAsyncFromSyncIterator abstract operation as needed.</p>

      <emu-clause id="sec-createasyncfromsynciterator" type="abstract operation">
        <h1>
          CreateAsyncFromSyncIterator (
            _syncIteratorRecord_: an Iterator Record,
          ): an Iterator Record
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create an async Iterator Record from a synchronous Iterator Record.</dd>
        </dl>
        <emu-alg>
          1. Let _asyncIterator_ be OrdinaryObjectCreate(%AsyncFromSyncIteratorPrototype%, « [[SyncIteratorRecord]] »).
          1. Set _asyncIterator_.[[SyncIteratorRecord]] to _syncIteratorRecord_.
          1. Let _nextMethod_ be ! Get(_asyncIterator_, *"next"*).
          1. Let _iteratorRecord_ be the Iterator Record { [[Iterator]]: _asyncIterator_, [[NextMethod]]: _nextMethod_, [[Done]]: *false* }.
          1. Return _iteratorRecord_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-%asyncfromsynciteratorprototype%-object">
        <h1>The %AsyncFromSyncIteratorPrototype% Object</h1>
        <p>The <dfn>%AsyncFromSyncIteratorPrototype%</dfn> object:</p>
        <ul>
          <li>has properties that are inherited by all Async-from-Sync Iterator objects.</li>
          <li>is an ordinary object.</li>
          <li>has a [[Prototype]] internal slot whose value is %AsyncIteratorPrototype%.</li>
          <li>is never directly accessible to ECMAScript code.</li>
          <li>has the following properties:</li>
        </ul>

        <emu-clause id="sec-%asyncfromsynciteratorprototype%.next">
          <h1>%AsyncFromSyncIteratorPrototype%.next ( [ _value_ ] )</h1>
          <emu-alg>
            1. Let _O_ be the *this* value.
            1. Assert: _O_ is an Object that has a [[SyncIteratorRecord]] internal slot.
            1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
            1. Let _syncIteratorRecord_ be _O_.[[SyncIteratorRecord]].
            1. If _value_ is present, then
              1. Let _result_ be Completion(IteratorNext(_syncIteratorRecord_, _value_)).
            1. Else,
              1. Let _result_ be Completion(IteratorNext(_syncIteratorRecord_)).
            1. IfAbruptRejectPromise(_result_, _promiseCapability_).
            1. Return AsyncFromSyncIteratorContinuation(_result_, _promiseCapability_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-%asyncfromsynciteratorprototype%.return">
          <h1>%AsyncFromSyncIteratorPrototype%.return ( [ _value_ ] )</h1>

          <emu-alg>
            1. Let _O_ be the *this* value.
            1. Assert: _O_ is an Object that has a [[SyncIteratorRecord]] internal slot.
            1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
            1. Let _syncIterator_ be _O_.[[SyncIteratorRecord]].[[Iterator]].
            1. Let _return_ be Completion(GetMethod(_syncIterator_, *"return"*)).
            1. IfAbruptRejectPromise(_return_, _promiseCapability_).
            1. If _return_ is *undefined*, then
              1. Let _iteratorResult_ be CreateIteratorResultObject(_value_, *true*).
              1. Perform ! <emu-meta effects="user-code">Call</emu-meta>(_promiseCapability_.[[Resolve]], *undefined*, « _iteratorResult_ »).
              1. Return _promiseCapability_.[[Promise]].
            1. If _value_ is present, then
              1. Let _result_ be Completion(Call(_return_, _syncIterator_, « _value_ »)).
            1. Else,
              1. Let _result_ be Completion(Call(_return_, _syncIterator_)).
            1. IfAbruptRejectPromise(_result_, _promiseCapability_).
            1. If _result_ is not an Object, then
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « a newly created *TypeError* object »).
              1. Return _promiseCapability_.[[Promise]].
            1. Return AsyncFromSyncIteratorContinuation(_result_, _promiseCapability_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-%asyncfromsynciteratorprototype%.throw">
          <h1>%AsyncFromSyncIteratorPrototype%.throw ( [ _value_ ] )</h1>
          <emu-note>In this specification, _value_ is always provided, but is left optional for consistency with <emu-xref title href="#sec-%asyncfromsynciteratorprototype%.return"></emu-xref>.</emu-note>

          <emu-alg>
            1. Let _O_ be the *this* value.
            1. Assert: _O_ is an Object that has a [[SyncIteratorRecord]] internal slot.
            1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
            1. Let _syncIterator_ be _O_.[[SyncIteratorRecord]].[[Iterator]].
            1. Let _throw_ be Completion(GetMethod(_syncIterator_, *"throw"*)).
            1. IfAbruptRejectPromise(_throw_, _promiseCapability_).
            1. If _throw_ is *undefined*, then
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _value_ »).
              1. Return _promiseCapability_.[[Promise]].
            1. If _value_ is present, then
              1. Let _result_ be Completion(Call(_throw_, _syncIterator_, « _value_ »)).
            1. Else,
              1. Let _result_ be Completion(Call(_throw_, _syncIterator_)).
            1. IfAbruptRejectPromise(_result_, _promiseCapability_).
            1. If _result_ is not an Object, then
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « a newly created *TypeError* object »).
              1. Return _promiseCapability_.[[Promise]].
            1. Return AsyncFromSyncIteratorContinuation(_result_, _promiseCapability_).
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-properties-of-async-from-sync-iterator-instances">
        <h1>Properties of Async-from-Sync Iterator Instances</h1>
        <p>Async-from-Sync Iterator instances are ordinary objects that inherit properties from the %AsyncFromSyncIteratorPrototype% intrinsic object. Async-from-Sync Iterator instances are initially created with the internal slots listed in <emu-xref href="#table-async-from-sync-iterator-internal-slots"></emu-xref>.</p>
        <emu-table id="table-async-from-sync-iterator-internal-slots" caption="Internal Slots of Async-from-Sync Iterator Instances">
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
                [[SyncIteratorRecord]]
              </td>
              <td>
                an Iterator Record
              </td>
              <td>
                Represents the original synchronous iterator which is being adapted.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-asyncfromsynciteratorcontinuation" type="abstract operation" oldids="sec-async-from-sync-iterator-value-unwrap-functions">
        <h1>
          AsyncFromSyncIteratorContinuation (
            _result_: an Object,
            _promiseCapability_: a PromiseCapability Record for an intrinsic %Promise%,
          ): a Promise
        </h1>
        <dl class="header">
        </dl>

        <emu-alg>
          1. NOTE: Because _promiseCapability_ is derived from the intrinsic %Promise%, the calls to _promiseCapability_.[[Reject]] entailed by the use IfAbruptRejectPromise below are guaranteed not to throw.
          1. Let _done_ be Completion(IteratorComplete(_result_)).
          1. IfAbruptRejectPromise(_done_, _promiseCapability_).
          1. Let _value_ be Completion(IteratorValue(_result_)).
          1. IfAbruptRejectPromise(_value_, _promiseCapability_).
          1. Let _valueWrapper_ be Completion(PromiseResolve(%Promise%, _value_)).
          1. IfAbruptRejectPromise(_valueWrapper_, _promiseCapability_).
          1. Let _unwrap_ be a new Abstract Closure with parameters (_v_) that captures _done_ and performs the following steps when called:
            1. Return CreateIteratorResultObject(_v_, _done_).
          1. Let _onFulfilled_ be CreateBuiltinFunction(_unwrap_, 1, *""*, « »).
          1. NOTE: _onFulfilled_ is used when processing the *"value"* property of an IteratorResult object in order to wait for its value if it is a promise and re-package the result in a new "unwrapped" IteratorResult object.
          1. Perform PerformPromiseThen(_valueWrapper_, _onFulfilled_, *undefined*, _promiseCapability_).
          1. Return _promiseCapability_.[[Promise]].
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-promise-objects">

## Promise Objects

* Promise
  * := object /
    * uses
      * eventual results of a deferred (and possibly asynchronous) computation's placeholder
    * ALLOWED EXCLUSIVE states
      * <em>fulfilled</em>, <em>rejected</em>, and <em>pending</em>:</p>
        <ul>
        <li>
        A promise `p` is fulfilled if `p.then(f, r)` will immediately enqueue a Job to call the function `f`.
        </li>
        <li>
        A promise `p` is rejected if `p.then(f, r)` will immediately enqueue a Job to call the function `r`.
        </li>
        <li>
        A promise is pending if it is neither fulfilled nor rejected.
        </li>
        </ul>
        <p>A promise is said to be <em>settled</em> if it is not pending, i.e. if it is either fulfilled or rejected.</p>
        <p>A promise is <em>resolved</em> if it is settled or if it has been “locked in” to match the state of another promise. Attempting to resolve or reject a resolved promise has no effect. A promise is <em>unresolved</em> if it is not resolved. An unresolved promise is always in the pending state. A resolved promise may be pending, fulfilled or rejected.</p>

            <emu-clause id="sec-promise-abstract-operations">
              <h1>Promise Abstract Operations</h1>

              <emu-clause id="sec-promisecapability-records">
                <h1>PromiseCapability Records</h1>
                <p>A <dfn variants="PromiseCapability Records">PromiseCapability Record</dfn> is a Record value used to encapsulate a Promise or promise-like object along with the functions that are capable of resolving or rejecting that promise. PromiseCapability Records are produced by the NewPromiseCapability abstract operation.</p>
                <p>PromiseCapability Records have the fields listed in <emu-xref href="#table-promisecapability-record-fields"></emu-xref>.</p>
                <emu-table id="table-promisecapability-record-fields" caption="PromiseCapability Record Fields" oldids="table-57">
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
                        [[Promise]]
                      </td>
                      <td>
                        an Object
                      </td>
                      <td>
                        An object that is usable as a promise.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        [[Resolve]]
                      </td>
                      <td>
                        a function object
                      </td>
                      <td>
                        The function that is used to resolve the given promise.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        [[Reject]]
                      </td>
                      <td>
                        a function object
                      </td>
                      <td>
                        The function that is used to reject the given promise.
                      </td>
                    </tr>
                  </table>
                </emu-table>

                <emu-clause id="sec-ifabruptrejectpromise" aoid="IfAbruptRejectPromise">
                  <h1>IfAbruptRejectPromise ( _value_, _capability_ )</h1>
                  <p>IfAbruptRejectPromise is a shorthand for a sequence of algorithm steps that use a PromiseCapability Record. An algorithm step of the form:</p>
                  <emu-alg>
                    1. IfAbruptRejectPromise(_value_, _capability_).
                  </emu-alg>
                  <p>means the same thing as:</p>
                  <emu-alg>
                    1. Assert: _value_ is a Completion Record.
                    1. If _value_ is an abrupt completion, then
                      1. Perform ? Call(_capability_.[[Reject]], *undefined*, « _value_.[[Value]] »).
                      1. Return _capability_.[[Promise]].
                    1. Else,
                      1. Set _value_ to ! _value_.
                  </emu-alg>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promisereaction-records">
                <h1>PromiseReaction Records</h1>
                <p>A <dfn variants="PromiseReaction Records">PromiseReaction Record</dfn> is a Record value used to store information about how a promise should react when it becomes resolved or rejected with a given value. PromiseReaction Records are created by the PerformPromiseThen abstract operation, and are used by the Abstract Closure returned by NewPromiseReactionJob.</p>
                <p>PromiseReaction Records have the fields listed in <emu-xref href="#table-promisereaction-record-fields"></emu-xref>.</p>
                <emu-table id="table-promisereaction-record-fields" caption="PromiseReaction Record Fields" oldids="table-58">
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
                        [[Capability]]
                      </td>
                      <td>
                        a PromiseCapability Record or *undefined*
                      </td>
                      <td>
                        The capabilities of the promise for which this record provides a reaction handler.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        [[Type]]
                      </td>
                      <td>
                        ~fulfill~ or ~reject~
                      </td>
                      <td>
                        The [[Type]] is used when [[Handler]] is ~empty~ to allow for behaviour specific to the settlement type.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        [[Handler]]
                      </td>
                      <td>
                        a JobCallback Record or ~empty~
                      </td>
                      <td>
                        The function that should be applied to the incoming value, and whose return value will govern what happens to the derived promise. If [[Handler]] is ~empty~, a function that depends on the value of [[Type]] will be used instead.
                      </td>
                    </tr>
                  </table>
                </emu-table>
              </emu-clause>

              <emu-clause id="sec-createresolvingfunctions" type="abstract operation">
                <h1>
                  CreateResolvingFunctions (
                    _promise_: a Promise,
                  ): a Record with fields [[Resolve]] (a function object) and [[Reject]] (a function object)
                </h1>
                <dl class="header">
                </dl>
                <emu-alg>
                  1. Let _alreadyResolved_ be the Record { [[Value]]: *false* }.
                  1. Let _stepsResolve_ be the algorithm steps defined in <emu-xref href="#sec-promise-resolve-functions" title></emu-xref>.
                  1. Let _lengthResolve_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise-resolve-functions" title></emu-xref>.
                  1. Let _resolve_ be CreateBuiltinFunction(_stepsResolve_, _lengthResolve_, *""*, « [[Promise]], [[AlreadyResolved]] »).
                  1. Set _resolve_.[[Promise]] to _promise_.
                  1. Set _resolve_.[[AlreadyResolved]] to _alreadyResolved_.
                  1. Let _stepsReject_ be the algorithm steps defined in <emu-xref href="#sec-promise-reject-functions" title></emu-xref>.
                  1. Let _lengthReject_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise-reject-functions" title></emu-xref>.
                  1. Let _reject_ be CreateBuiltinFunction(_stepsReject_, _lengthReject_, *""*, « [[Promise]], [[AlreadyResolved]] »).
                  1. Set _reject_.[[Promise]] to _promise_.
                  1. Set _reject_.[[AlreadyResolved]] to _alreadyResolved_.
                  1. Return the Record { [[Resolve]]: _resolve_, [[Reject]]: _reject_ }.
                </emu-alg>

                <emu-clause id="sec-promise-reject-functions">
                  <h1>Promise Reject Functions</h1>
                  <p>A promise reject function is an anonymous built-in function that has [[Promise]] and [[AlreadyResolved]] internal slots.</p>
                  <p>When a promise reject function is called with argument _reason_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. Assert: _F_ has a [[Promise]] internal slot whose value is an Object.
                    1. Let _promise_ be _F_.[[Promise]].
                    1. Let _alreadyResolved_ be _F_.[[AlreadyResolved]].
                    1. If _alreadyResolved_.[[Value]] is *true*, return *undefined*.
                    1. Set _alreadyResolved_.[[Value]] to *true*.
                    1. Perform RejectPromise(_promise_, _reason_).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a promise reject function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>

                <emu-clause id="sec-promise-resolve-functions">
                  <h1>Promise Resolve Functions</h1>
                  <p>A promise resolve function is an anonymous built-in function that has [[Promise]] and [[AlreadyResolved]] internal slots.</p>
                  <p>When a promise resolve function is called with argument _resolution_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. Assert: _F_ has a [[Promise]] internal slot whose value is an Object.
                    1. Let _promise_ be _F_.[[Promise]].
                    1. Let _alreadyResolved_ be _F_.[[AlreadyResolved]].
                    1. If _alreadyResolved_.[[Value]] is *true*, return *undefined*.
                    1. Set _alreadyResolved_.[[Value]] to *true*.
                    1. If SameValue(_resolution_, _promise_) is *true*, then
                      1. Let _selfResolutionError_ be a newly created *TypeError* object.
                      1. Perform RejectPromise(_promise_, _selfResolutionError_).
                      1. Return *undefined*.
                    1. If _resolution_ is not an Object, then
                      1. Perform FulfillPromise(_promise_, _resolution_).
                      1. Return *undefined*.
                    1. Let _then_ be Completion(Get(_resolution_, *"then"*)).
                    1. If _then_ is an abrupt completion, then
                      1. Perform RejectPromise(_promise_, _then_.[[Value]]).
                      1. Return *undefined*.
                    1. Let _thenAction_ be _then_.[[Value]].
                    1. If IsCallable(_thenAction_) is *false*, then
                      1. Perform FulfillPromise(_promise_, _resolution_).
                      1. Return *undefined*.
                    1. Let _thenJobCallback_ be HostMakeJobCallback(_thenAction_).
                    1. Let _job_ be NewPromiseResolveThenableJob(_promise_, _resolution_, _thenJobCallback_).
                    1. Perform HostEnqueuePromiseJob(_job_.[[Job]], _job_.[[Realm]]).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a promise resolve function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-fulfillpromise" type="abstract operation">
                <h1>
                  FulfillPromise (
                    _promise_: a Promise,
                    _value_: an ECMAScript language value,
                  ): ~unused~
                </h1>
                <dl class="header">
                </dl>
                <emu-alg>
                  1. Assert: The value of _promise_.[[PromiseState]] is ~pending~.
                  1. Let _reactions_ be _promise_.[[PromiseFulfillReactions]].
                  1. Set _promise_.[[PromiseResult]] to _value_.
                  1. Set _promise_.[[PromiseFulfillReactions]] to *undefined*.
                  1. Set _promise_.[[PromiseRejectReactions]] to *undefined*.
                  1. Set _promise_.[[PromiseState]] to ~fulfilled~.
                  1. Perform TriggerPromiseReactions(_reactions_, _value_).
                  1. Return ~unused~.
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-newpromisecapability" type="abstract operation" oldids="sec-getcapabilitiesexecutor-functions">
                <h1>
                  NewPromiseCapability (
                    _C_: an ECMAScript language value,
                  ): either a normal completion containing a PromiseCapability Record or a throw completion
                </h1>
                <dl class="header">
                  <dt>description</dt>
                  <dd>It attempts to use _C_ as a constructor in the fashion of the built-in Promise constructor to create a promise and extract its `resolve` and `reject` functions. The promise plus the `resolve` and `reject` functions are used to initialize a new PromiseCapability Record.</dd>
                </dl>
                <emu-alg>
                  1. If IsConstructor(_C_) is *false*, throw a *TypeError* exception.
                  1. NOTE: _C_ is assumed to be a constructor function that supports the parameter conventions of the Promise constructor (see <emu-xref href="#sec-promise-executor"></emu-xref>).
                  1. Let _resolvingFunctions_ be the Record { [[Resolve]]: *undefined*, [[Reject]]: *undefined* }.
                  1. Let _executorClosure_ be a new Abstract Closure with parameters (_resolve_, _reject_) that captures _resolvingFunctions_ and performs the following steps when called:
                    1. If _resolvingFunctions_.[[Resolve]] is not *undefined*, throw a *TypeError* exception.
                    1. If _resolvingFunctions_.[[Reject]] is not *undefined*, throw a *TypeError* exception.
                    1. Set _resolvingFunctions_.[[Resolve]] to _resolve_.
                    1. Set _resolvingFunctions_.[[Reject]] to _reject_.
                    1. Return *undefined*.
                  1. Let _executor_ be CreateBuiltinFunction(_executorClosure_, 2, *""*, « »).
                  1. Let _promise_ be ? Construct(_C_, « _executor_ »).
                  1. If IsCallable(_resolvingFunctions_.[[Resolve]]) is *false*, throw a *TypeError* exception.
                  1. If IsCallable(_resolvingFunctions_.[[Reject]]) is *false*, throw a *TypeError* exception.
                  1. Return the PromiseCapability Record { [[Promise]]: _promise_, [[Resolve]]: _resolvingFunctions_.[[Resolve]], [[Reject]]: _resolvingFunctions_.[[Reject]] }.
                </emu-alg>
                <emu-note>
                  <p>This abstract operation supports Promise subclassing, as it is generic on any constructor that calls a passed executor function argument in the same way as the Promise constructor. It is used to generalize static methods of the Promise constructor to any subclass.</p>
                </emu-note>
              </emu-clause>

              <emu-clause id="sec-ispromise" type="abstract operation">
                <h1>
                  IsPromise (
                    _x_: an ECMAScript language value,
                  ): a Boolean
                </h1>
                <dl class="header">
                  <dt>description</dt>
                  <dd>It checks for the promise brand on an object.</dd>
                </dl>
                <emu-alg>
                  1. If _x_ is not an Object, return *false*.
                  1. If _x_ does not have a [[PromiseState]] internal slot, return *false*.
                  1. Return *true*.
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-rejectpromise" type="abstract operation">
                <h1>
                  RejectPromise (
                    _promise_: a Promise,
                    _reason_: an ECMAScript language value,
                  ): ~unused~
                </h1>
                <dl class="header">
                </dl>
                <emu-alg>
                  1. Assert: The value of _promise_.[[PromiseState]] is ~pending~.
                  1. Let _reactions_ be _promise_.[[PromiseRejectReactions]].
                  1. Set _promise_.[[PromiseResult]] to _reason_.
                  1. Set _promise_.[[PromiseFulfillReactions]] to *undefined*.
                  1. Set _promise_.[[PromiseRejectReactions]] to *undefined*.
                  1. Set _promise_.[[PromiseState]] to ~rejected~.
                  1. If _promise_.[[PromiseIsHandled]] is *false*, perform HostPromiseRejectionTracker(_promise_, *"reject"*).
                  1. Perform TriggerPromiseReactions(_reactions_, _reason_).
                  1. Return ~unused~.
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-triggerpromisereactions" type="abstract operation">
                <h1>
                  TriggerPromiseReactions (
                    _reactions_: a List of PromiseReaction Records,
                    _argument_: an ECMAScript language value,
                  ): ~unused~
                </h1>
                <dl class="header">
                  <dt>description</dt>
                  <dd>It enqueues a new Job for each record in _reactions_. Each such Job processes the [[Type]] and [[Handler]] of the PromiseReaction Record, and if the [[Handler]] is not ~empty~, calls it passing the given argument. If the [[Handler]] is ~empty~, the behaviour is determined by the [[Type]].</dd>
                </dl>
                <emu-alg>
                  1. For each element _reaction_ of _reactions_, do
                    1. Let _job_ be NewPromiseReactionJob(_reaction_, _argument_).
                    1. Perform HostEnqueuePromiseJob(_job_.[[Job]], _job_.[[Realm]]).
                  1. Return ~unused~.
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-host-promise-rejection-tracker" type="host-defined abstract operation">
                <h1>
                  HostPromiseRejectionTracker (
                    _promise_: a Promise,
                    _operation_: *"reject"* or *"handle"*,
                  ): ~unused~
                </h1>
                <dl class="header">
                  <dt>description</dt>
                  <dd>It allows host environments to track promise rejections.</dd>
                </dl>
                <p>The default implementation of HostPromiseRejectionTracker is to return ~unused~.</p>

                <emu-note>
                  <p>HostPromiseRejectionTracker is called in two scenarios:</p>

                  <ul>
                    <li>When a promise is rejected without any handlers, it is called with its _operation_ argument set to *"reject"*.</li>
                    <li>When a handler is added to a rejected promise for the first time, it is called with its _operation_ argument set to *"handle"*.</li>
                  </ul>

                  <p>A typical implementation of HostPromiseRejectionTracker might try to notify developers of unhandled rejections, while also being careful to notify them if such previous notifications are later invalidated by new handlers being attached.</p>
                </emu-note>

                <emu-note>
                  <p>If _operation_ is *"handle"*, an implementation should not hold a reference to _promise_ in a way that would interfere with garbage collection. An implementation may hold a reference to _promise_ if _operation_ is *"reject"*, since it is expected that rejections will be rare and not on hot code paths.</p>
                </emu-note>
              </emu-clause>
            </emu-clause>

            <emu-clause id="sec-promise-jobs">
              <h1>Promise Jobs</h1>

              <emu-clause id="sec-newpromisereactionjob" type="abstract operation" oldids="sec-promisereactionjob">
                <h1>
                  NewPromiseReactionJob (
                    _reaction_: a PromiseReaction Record,
                    _argument_: an ECMAScript language value,
                  ): a Record with fields [[Job]] (a Job Abstract Closure) and [[Realm]] (a Realm Record or *null*)
                </h1>
                <dl class="header">
                  <dt>description</dt>
                  <dd>It returns a new Job Abstract Closure that applies the appropriate handler to the incoming value, and uses the handler's return value to resolve or reject the derived promise associated with that handler.</dd>
                </dl>
                <emu-alg>
                  1. Let _job_ be a new Job Abstract Closure with no parameters that captures _reaction_ and _argument_ and performs the following steps when called:
                    1. Let _promiseCapability_ be _reaction_.[[Capability]].
                    1. Let _type_ be _reaction_.[[Type]].
                    1. Let _handler_ be _reaction_.[[Handler]].
                    1. If _handler_ is ~empty~, then
                      1. If _type_ is ~fulfill~, then
                        1. Let _handlerResult_ be NormalCompletion(_argument_).
                      1. Else,
                        1. Assert: _type_ is ~reject~.
                        1. Let _handlerResult_ be ThrowCompletion(_argument_).
                    1. Else,
                      1. Let _handlerResult_ be Completion(HostCallJobCallback(_handler_, *undefined*, « _argument_ »)).
                    1. If _promiseCapability_ is *undefined*, then
                      1. Assert: _handlerResult_ is not an abrupt completion.
                      1. Return ~empty~.
                    1. Assert: _promiseCapability_ is a PromiseCapability Record.
                    1. If _handlerResult_ is an abrupt completion, then
                      1. Return ? Call(_promiseCapability_.[[Reject]], *undefined*, « _handlerResult_.[[Value]] »).
                    1. Else,
                      1. Return ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _handlerResult_.[[Value]] »).
                  1. Let _handlerRealm_ be *null*.
                  1. If _reaction_.[[Handler]] is not ~empty~, then
                    1. Let _getHandlerRealmResult_ be Completion(GetFunctionRealm(_reaction_.[[Handler]].[[Callback]])).
                    1. If _getHandlerRealmResult_ is a normal completion, set _handlerRealm_ to _getHandlerRealmResult_.[[Value]].
                    1. Else, set _handlerRealm_ to the current Realm Record.
                    1. NOTE: _handlerRealm_ is never *null* unless the handler is *undefined*. When the handler is a revoked Proxy and no ECMAScript code runs, _handlerRealm_ is used to create error objects.
                  1. Return the Record { [[Job]]: _job_, [[Realm]]: _handlerRealm_ }.
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-newpromiseresolvethenablejob" type="abstract operation" oldids="sec-promiseresolvethenablejob">
                <h1>
                  NewPromiseResolveThenableJob (
                    _promiseToResolve_: a Promise,
                    _thenable_: an Object,
                    _then_: a JobCallback Record,
                  ): a Record with fields [[Job]] (a Job Abstract Closure) and [[Realm]] (a Realm Record)
                </h1>
                <dl class="header">
                </dl>
                <emu-alg>
                  1. Let _job_ be a new Job Abstract Closure with no parameters that captures _promiseToResolve_, _thenable_, and _then_ and performs the following steps when called:
                    1. Let _resolvingFunctions_ be CreateResolvingFunctions(_promiseToResolve_).
                    1. Let _thenCallResult_ be Completion(HostCallJobCallback(_then_, _thenable_, « _resolvingFunctions_.[[Resolve]], _resolvingFunctions_.[[Reject]] »)).
                    1. If _thenCallResult_ is an abrupt completion, then
                      1. Return ? Call(_resolvingFunctions_.[[Reject]], *undefined*, « _thenCallResult_.[[Value]] »).
                    1. Return ? _thenCallResult_.
                  1. Let _getThenRealmResult_ be Completion(GetFunctionRealm(_then_.[[Callback]])).
                  1. If _getThenRealmResult_ is a normal completion, let _thenRealm_ be _getThenRealmResult_.[[Value]].
                  1. Else, let _thenRealm_ be the current Realm Record.
                  1. NOTE: _thenRealm_ is never *null*. When _then_.[[Callback]] is a revoked Proxy and no code runs, _thenRealm_ is used to create error objects.
                  1. Return the Record { [[Job]]: _job_, [[Realm]]: _thenRealm_ }.
                </emu-alg>
                <emu-note>
                  <p>This Job uses the supplied thenable and its `then` method to resolve the given promise. This process must take place as a Job to ensure that the evaluation of the `then` method occurs after evaluation of any surrounding code has completed.</p>
                </emu-note>
              </emu-clause>
            </emu-clause>

            <emu-clause id="sec-promise-constructor">
              <h1>The Promise Constructor</h1>
              <p>The Promise constructor:</p>
              <ul>
                <li>is <dfn>%Promise%</dfn>.</li>
                <li>is the initial value of the *"Promise"* property of the global object.</li>
                <li>creates and initializes a new Promise when called as a constructor.</li>
                <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
                <li>may be used as the value in an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified Promise behaviour must include a `super` call to the Promise constructor to create and initialize the subclass instance with the internal state necessary to support the `Promise` and `Promise.prototype` built-in methods.</li>
              </ul>

              <emu-clause id="sec-promise-executor">
                <h1>Promise ( _executor_ )</h1>
                <p>This function performs the following steps when called:</p>
                <emu-alg>
                  1. If NewTarget is *undefined*, throw a *TypeError* exception.
                  1. If IsCallable(_executor_) is *false*, throw a *TypeError* exception.
                  1. Let _promise_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Promise.prototype%"*, « [[PromiseState]], [[PromiseResult]], [[PromiseFulfillReactions]], [[PromiseRejectReactions]], [[PromiseIsHandled]] »).
                  1. Set _promise_.[[PromiseState]] to ~pending~.
                  1. Set _promise_.[[PromiseFulfillReactions]] to a new empty List.
                  1. Set _promise_.[[PromiseRejectReactions]] to a new empty List.
                  1. Set _promise_.[[PromiseIsHandled]] to *false*.
                  1. Let _resolvingFunctions_ be CreateResolvingFunctions(_promise_).
                  1. Let _completion_ be Completion(Call(_executor_, *undefined*, « _resolvingFunctions_.[[Resolve]], _resolvingFunctions_.[[Reject]] »)).
                  1. If _completion_ is an abrupt completion, then
                    1. Perform ? Call(_resolvingFunctions_.[[Reject]], *undefined*, « _completion_.[[Value]] »).
                  1. Return _promise_.
                </emu-alg>
                <emu-note>
                  <p>The _executor_ argument must be a function object. It is called for initiating and reporting completion of the possibly deferred action represented by this Promise. The executor is called with two arguments: _resolve_ and _reject_. These are functions that may be used by the _executor_ function to report eventual completion or failure of the deferred computation. Returning from the executor function does not mean that the deferred action has been completed but only that the request to eventually perform the deferred action has been accepted.</p>
                  <p>The _resolve_ function that is passed to an _executor_ function accepts a single argument. The _executor_ code may eventually call the _resolve_ function to indicate that it wishes to resolve the associated Promise. The argument passed to the _resolve_ function represents the eventual value of the deferred action and can be either the actual fulfillment value or another promise which will provide the value if it is fulfilled.</p>
                  <p>The _reject_ function that is passed to an _executor_ function accepts a single argument. The _executor_ code may eventually call the _reject_ function to indicate that the associated Promise is rejected and will never be fulfilled. The argument passed to the _reject_ function is used as the rejection value of the promise. Typically it will be an Error object.</p>
                  <p>The resolve and reject functions passed to an _executor_ function by the Promise constructor have the capability to actually resolve and reject the associated promise. Subclasses may have different constructor behaviour that passes in customized values for resolve and reject.</p>
                </emu-note>
              </emu-clause>
            </emu-clause>

            <emu-clause id="sec-properties-of-the-promise-constructor">
              <h1>Properties of the Promise Constructor</h1>
              <p>The Promise constructor:</p>
              <ul>
                <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
                <li>has the following properties:</li>
              </ul>

              <emu-clause id="sec-promise.all">
                <h1>Promise.all ( _iterable_ )</h1>
                <p>This function returns a new promise which is fulfilled with an array of fulfillment values for the passed promises, or rejects with the reason of the first passed promise that rejects. It resolves all elements of the passed iterable to promises as it runs this algorithm.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _promiseResolve_ be Completion(GetPromiseResolve(_C_)).
                  1. IfAbruptRejectPromise(_promiseResolve_, _promiseCapability_).
                  1. Let _iteratorRecord_ be Completion(GetIterator(_iterable_, ~sync~)).
                  1. IfAbruptRejectPromise(_iteratorRecord_, _promiseCapability_).
                  1. Let _result_ be Completion(PerformPromiseAll(_iteratorRecord_, _C_, _promiseCapability_, _promiseResolve_)).
                  1. If _result_ is an abrupt completion, then
                    1. If _iteratorRecord_.[[Done]] is *false*, set _result_ to Completion(IteratorClose(_iteratorRecord_, _result_)).
                    1. IfAbruptRejectPromise(_result_, _promiseCapability_).
                  1. Return ? _result_.
                </emu-alg>
                <emu-note>
                  <p>This function requires its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor.</p>
                </emu-note>

                <emu-clause id="sec-getpromiseresolve" type="abstract operation">
                  <h1>
                    GetPromiseResolve (
                      _promiseConstructor_: a constructor,
                    ): either a normal completion containing a function object or a throw completion
                  </h1>
                  <dl class="header">
                  </dl>
                  <emu-alg>
                    1. Let _promiseResolve_ be ? Get(_promiseConstructor_, *"resolve"*).
                    1. If IsCallable(_promiseResolve_) is *false*, throw a *TypeError* exception.
                    1. Return _promiseResolve_.
                  </emu-alg>
                </emu-clause>

                <emu-clause id="sec-performpromiseall" type="abstract operation">
                  <h1>
                    PerformPromiseAll (
                      _iteratorRecord_: an Iterator Record,
                      _constructor_: a constructor,
                      _resultCapability_: a PromiseCapability Record,
                      _promiseResolve_: a function object,
                    ): either a normal completion containing an ECMAScript language value or a throw completion
                  </h1>
                  <dl class="header">
                  </dl>
                  <emu-alg>
                    1. Let _values_ be a new empty List.
                    1. Let _remainingElementsCount_ be the Record { [[Value]]: 1 }.
                    1. Let _index_ be 0.
                    1. Repeat,
                      1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
                      1. If _next_ is ~done~, then
                        1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                        1. If _remainingElementsCount_.[[Value]] = 0, then
                          1. Let _valuesArray_ be CreateArrayFromList(_values_).
                          1. Perform ? Call(_resultCapability_.[[Resolve]], *undefined*, « _valuesArray_ »).
                        1. Return _resultCapability_.[[Promise]].
                      1. Append *undefined* to _values_.
                      1. Let _nextPromise_ be ? Call(_promiseResolve_, _constructor_, « _next_ »).
                      1. Let _steps_ be the algorithm steps defined in <emu-xref href="#sec-promise.all-resolve-element-functions" title></emu-xref>.
                      1. Let _length_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise.all-resolve-element-functions" title></emu-xref>.
                      1. Let _onFulfilled_ be CreateBuiltinFunction(_steps_, _length_, *""*, « [[AlreadyCalled]], [[Index]], [[Values]], [[Capability]], [[RemainingElements]] »).
                      1. Set _onFulfilled_.[[AlreadyCalled]] to *false*.
                      1. Set _onFulfilled_.[[Index]] to _index_.
                      1. Set _onFulfilled_.[[Values]] to _values_.
                      1. Set _onFulfilled_.[[Capability]] to _resultCapability_.
                      1. Set _onFulfilled_.[[RemainingElements]] to _remainingElementsCount_.
                      1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] + 1.
                      1. Perform ? Invoke(_nextPromise_, *"then"*, « _onFulfilled_, _resultCapability_.[[Reject]] »).
                      1. Set _index_ to _index_ + 1.
                  </emu-alg>
                </emu-clause>

                <emu-clause id="sec-promise.all-resolve-element-functions">
                  <h1>`Promise.all` Resolve Element Functions</h1>
                  <p>A `Promise.all` resolve element function is an anonymous built-in function that is used to resolve a specific `Promise.all` element. Each `Promise.all` resolve element function has [[Index]], [[Values]], [[Capability]], [[RemainingElements]], and [[AlreadyCalled]] internal slots.</p>
                  <p>When a `Promise.all` resolve element function is called with argument _x_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. If _F_.[[AlreadyCalled]] is *true*, return *undefined*.
                    1. Set _F_.[[AlreadyCalled]] to *true*.
                    1. Let _index_ be _F_.[[Index]].
                    1. Let _values_ be _F_.[[Values]].
                    1. Let _promiseCapability_ be _F_.[[Capability]].
                    1. Let _remainingElementsCount_ be _F_.[[RemainingElements]].
                    1. Set _values_[_index_] to _x_.
                    1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                    1. If _remainingElementsCount_.[[Value]] = 0, then
                      1. Let _valuesArray_ be CreateArrayFromList(_values_).
                      1. Return ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _valuesArray_ »).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a `Promise.all` resolve element function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promise.allsettled">
                <h1>Promise.allSettled ( _iterable_ )</h1>
                <p>This function returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled, i.e. become either fulfilled or rejected. It resolves all elements of the passed iterable to promises as it runs this algorithm.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _promiseResolve_ be Completion(GetPromiseResolve(_C_)).
                  1. IfAbruptRejectPromise(_promiseResolve_, _promiseCapability_).
                  1. Let _iteratorRecord_ be Completion(GetIterator(_iterable_, ~sync~)).
                  1. IfAbruptRejectPromise(_iteratorRecord_, _promiseCapability_).
                  1. Let _result_ be Completion(PerformPromiseAllSettled(_iteratorRecord_, _C_, _promiseCapability_, _promiseResolve_)).
                  1. If _result_ is an abrupt completion, then
                    1. If _iteratorRecord_.[[Done]] is *false*, set _result_ to Completion(IteratorClose(_iteratorRecord_, _result_)).
                    1. IfAbruptRejectPromise(_result_, _promiseCapability_).
                  1. Return ? _result_.
                </emu-alg>
                <emu-note>
                  <p>This function requires its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor.</p>
                </emu-note>

                <emu-clause id="sec-performpromiseallsettled" type="abstract operation">
                  <h1>
                    PerformPromiseAllSettled (
                      _iteratorRecord_: an Iterator Record,
                      _constructor_: a constructor,
                      _resultCapability_: a PromiseCapability Record,
                      _promiseResolve_: a function object,
                    ): either a normal completion containing an ECMAScript language value or a throw completion
                  </h1>
                  <dl class="header">
                  </dl>
                  <emu-alg>
                    1. Let _values_ be a new empty List.
                    1. Let _remainingElementsCount_ be the Record { [[Value]]: 1 }.
                    1. Let _index_ be 0.
                    1. Repeat,
                      1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
                      1. If _next_ is ~done~, then
                        1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                        1. If _remainingElementsCount_.[[Value]] = 0, then
                          1. Let _valuesArray_ be CreateArrayFromList(_values_).
                          1. Perform ? Call(_resultCapability_.[[Resolve]], *undefined*, « _valuesArray_ »).
                        1. Return _resultCapability_.[[Promise]].
                      1. Append *undefined* to _values_.
                      1. Let _nextPromise_ be ? Call(_promiseResolve_, _constructor_, « _next_ »).
                      1. Let _stepsFulfilled_ be the algorithm steps defined in <emu-xref href="#sec-promise.allsettled-resolve-element-functions" title></emu-xref>.
                      1. Let _lengthFulfilled_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise.allsettled-resolve-element-functions" title></emu-xref>.
                      1. Let _onFulfilled_ be CreateBuiltinFunction(_stepsFulfilled_, _lengthFulfilled_, *""*, « [[AlreadyCalled]], [[Index]], [[Values]], [[Capability]], [[RemainingElements]] »).
                      1. Let _alreadyCalled_ be the Record { [[Value]]: *false* }.
                      1. Set _onFulfilled_.[[AlreadyCalled]] to _alreadyCalled_.
                      1. Set _onFulfilled_.[[Index]] to _index_.
                      1. Set _onFulfilled_.[[Values]] to _values_.
                      1. Set _onFulfilled_.[[Capability]] to _resultCapability_.
                      1. Set _onFulfilled_.[[RemainingElements]] to _remainingElementsCount_.
                      1. Let _stepsRejected_ be the algorithm steps defined in <emu-xref href="#sec-promise.allsettled-reject-element-functions" title></emu-xref>.
                      1. Let _lengthRejected_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise.allsettled-reject-element-functions" title></emu-xref>.
                      1. Let _onRejected_ be CreateBuiltinFunction(_stepsRejected_, _lengthRejected_, *""*, « [[AlreadyCalled]], [[Index]], [[Values]], [[Capability]], [[RemainingElements]] »).
                      1. Set _onRejected_.[[AlreadyCalled]] to _alreadyCalled_.
                      1. Set _onRejected_.[[Index]] to _index_.
                      1. Set _onRejected_.[[Values]] to _values_.
                      1. Set _onRejected_.[[Capability]] to _resultCapability_.
                      1. Set _onRejected_.[[RemainingElements]] to _remainingElementsCount_.
                      1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] + 1.
                      1. Perform ? Invoke(_nextPromise_, *"then"*, « _onFulfilled_, _onRejected_ »).
                      1. Set _index_ to _index_ + 1.
                  </emu-alg>
                </emu-clause>

                <emu-clause id="sec-promise.allsettled-resolve-element-functions">
                  <h1>`Promise.allSettled` Resolve Element Functions</h1>
                  <p>A `Promise.allSettled` resolve element function is an anonymous built-in function that is used to resolve a specific `Promise.allSettled` element. Each `Promise.allSettled` resolve element function has [[Index]], [[Values]], [[Capability]], [[RemainingElements]], and [[AlreadyCalled]] internal slots.</p>
                  <p>When a `Promise.allSettled` resolve element function is called with argument _x_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. Let _alreadyCalled_ be _F_.[[AlreadyCalled]].
                    1. If _alreadyCalled_.[[Value]] is *true*, return *undefined*.
                    1. Set _alreadyCalled_.[[Value]] to *true*.
                    1. Let _index_ be _F_.[[Index]].
                    1. Let _values_ be _F_.[[Values]].
                    1. Let _promiseCapability_ be _F_.[[Capability]].
                    1. Let _remainingElementsCount_ be _F_.[[RemainingElements]].
                    1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
                    1. Perform ! CreateDataPropertyOrThrow(_obj_, *"status"*, *"fulfilled"*).
                    1. Perform ! CreateDataPropertyOrThrow(_obj_, *"value"*, _x_).
                    1. Set _values_[_index_] to _obj_.
                    1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                    1. If _remainingElementsCount_.[[Value]] = 0, then
                      1. Let _valuesArray_ be CreateArrayFromList(_values_).
                      1. Return ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _valuesArray_ »).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a `Promise.allSettled` resolve element function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>

                <emu-clause id="sec-promise.allsettled-reject-element-functions">
                  <h1>`Promise.allSettled` Reject Element Functions</h1>
                  <p>A `Promise.allSettled` reject element function is an anonymous built-in function that is used to reject a specific `Promise.allSettled` element. Each `Promise.allSettled` reject element function has [[Index]], [[Values]], [[Capability]], [[RemainingElements]], and [[AlreadyCalled]] internal slots.</p>
                  <p>When a `Promise.allSettled` reject element function is called with argument _x_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. Let _alreadyCalled_ be _F_.[[AlreadyCalled]].
                    1. If _alreadyCalled_.[[Value]] is *true*, return *undefined*.
                    1. Set _alreadyCalled_.[[Value]] to *true*.
                    1. Let _index_ be _F_.[[Index]].
                    1. Let _values_ be _F_.[[Values]].
                    1. Let _promiseCapability_ be _F_.[[Capability]].
                    1. Let _remainingElementsCount_ be _F_.[[RemainingElements]].
                    1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
                    1. Perform ! CreateDataPropertyOrThrow(_obj_, *"status"*, *"rejected"*).
                    1. Perform ! CreateDataPropertyOrThrow(_obj_, *"reason"*, _x_).
                    1. Set _values_[_index_] to _obj_.
                    1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                    1. If _remainingElementsCount_.[[Value]] = 0, then
                      1. Let _valuesArray_ be CreateArrayFromList(_values_).
                      1. Return ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _valuesArray_ »).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a `Promise.allSettled` reject element function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promise.any">
                <h1>Promise.any ( _iterable_ )</h1>
                <p>This function returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an `AggregateError` holding the rejection reasons if all of the given promises are rejected. It resolves all elements of the passed iterable to promises as it runs this algorithm.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _promiseResolve_ be Completion(GetPromiseResolve(_C_)).
                  1. IfAbruptRejectPromise(_promiseResolve_, _promiseCapability_).
                  1. Let _iteratorRecord_ be Completion(GetIterator(_iterable_, ~sync~)).
                  1. IfAbruptRejectPromise(_iteratorRecord_, _promiseCapability_).
                  1. Let _result_ be Completion(PerformPromiseAny(_iteratorRecord_, _C_, _promiseCapability_, _promiseResolve_)).
                  1. If _result_ is an abrupt completion, then
                    1. If _iteratorRecord_.[[Done]] is *false*, set _result_ to Completion(IteratorClose(_iteratorRecord_, _result_)).
                    1. IfAbruptRejectPromise(_result_, _promiseCapability_).
                  1. Return ? _result_.
                </emu-alg>
                <emu-note>
                  <p>This function requires its *this* value to be a constructor function that supports the parameter conventions of the `Promise` constructor.</p>
                </emu-note>

                <emu-clause id="sec-performpromiseany" type="abstract operation">
                  <h1>
                    PerformPromiseAny (
                      _iteratorRecord_: an Iterator Record,
                      _constructor_: a constructor,
                      _resultCapability_: a PromiseCapability Record,
                      _promiseResolve_: a function object,
                    ): either a normal completion containing an ECMAScript language value or a throw completion
                  </h1>
                  <dl class="header">
                  </dl>
                  <emu-alg>
                    1. Let _errors_ be a new empty List.
                    1. Let _remainingElementsCount_ be the Record { [[Value]]: 1 }.
                    1. Let _index_ be 0.
                    1. Repeat,
                      1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
                      1. If _next_ is ~done~, then
                        1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                        1. If _remainingElementsCount_.[[Value]] = 0, then
                          1. Let _error_ be a newly created *AggregateError* object.
                          1. Perform ! DefinePropertyOrThrow(_error_, *"errors"*, PropertyDescriptor { [[Configurable]]: *true*, [[Enumerable]]: *false*, [[Writable]]: *true*, [[Value]]: CreateArrayFromList(_errors_) }).
                          1. Return ThrowCompletion(_error_).
                        1. Return _resultCapability_.[[Promise]].
                      1. Append *undefined* to _errors_.
                      1. Let _nextPromise_ be ? Call(_promiseResolve_, _constructor_, « _next_ »).
                      1. Let _stepsRejected_ be the algorithm steps defined in <emu-xref href="#sec-promise.any-reject-element-functions" title></emu-xref>.
                      1. Let _lengthRejected_ be the number of non-optional parameters of the function definition in <emu-xref href="#sec-promise.any-reject-element-functions" title></emu-xref>.
                      1. Let _onRejected_ be CreateBuiltinFunction(_stepsRejected_, _lengthRejected_, *""*, « [[AlreadyCalled]], [[Index]], [[Errors]], [[Capability]], [[RemainingElements]] »).
                      1. Set _onRejected_.[[AlreadyCalled]] to *false*.
                      1. Set _onRejected_.[[Index]] to _index_.
                      1. Set _onRejected_.[[Errors]] to _errors_.
                      1. Set _onRejected_.[[Capability]] to _resultCapability_.
                      1. Set _onRejected_.[[RemainingElements]] to _remainingElementsCount_.
                      1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] + 1.
                      1. Perform ? Invoke(_nextPromise_, *"then"*, « _resultCapability_.[[Resolve]], _onRejected_ »).
                      1. Set _index_ to _index_ + 1.
                  </emu-alg>
                </emu-clause>

                <emu-clause id="sec-promise.any-reject-element-functions">
                  <h1>`Promise.any` Reject Element Functions</h1>
                  <p>A `Promise.any` reject element function is an anonymous built-in function that is used to reject a specific `Promise.any` element. Each `Promise.any` reject element function has [[Index]], [[Errors]], [[Capability]], [[RemainingElements]], and [[AlreadyCalled]] internal slots.</p>
                  <p>When a `Promise.any` reject element function is called with argument _x_, the following steps are taken:</p>
                  <emu-alg>
                    1. Let _F_ be the active function object.
                    1. If _F_.[[AlreadyCalled]] is *true*, return *undefined*.
                    1. Set _F_.[[AlreadyCalled]] to *true*.
                    1. Let _index_ be _F_.[[Index]].
                    1. Let _errors_ be _F_.[[Errors]].
                    1. Let _promiseCapability_ be _F_.[[Capability]].
                    1. Let _remainingElementsCount_ be _F_.[[RemainingElements]].
                    1. Set _errors_[_index_] to _x_.
                    1. Set _remainingElementsCount_.[[Value]] to _remainingElementsCount_.[[Value]] - 1.
                    1. If _remainingElementsCount_.[[Value]] = 0, then
                      1. Let _error_ be a newly created *AggregateError* object.
                      1. Perform ! DefinePropertyOrThrow(_error_, *"errors"*, PropertyDescriptor { [[Configurable]]: *true*, [[Enumerable]]: *false*, [[Writable]]: *true*, [[Value]]: CreateArrayFromList(_errors_) }).
                      1. Return ? Call(_promiseCapability_.[[Reject]], *undefined*, « _error_ »).
                    1. Return *undefined*.
                  </emu-alg>
                  <p>The *"length"* property of a `Promise.any` reject element function is *1*<sub>𝔽</sub>.</p>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promise.prototype">
                <h1>Promise.prototype</h1>
                <p>The initial value of `Promise.prototype` is the Promise prototype object.</p>
                <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
              </emu-clause>

              <emu-clause id="sec-promise.race">
                <h1>Promise.race ( _iterable_ )</h1>
                <p>This function returns a new promise which is settled in the same way as the first passed promise to settle. It resolves all elements of the passed _iterable_ to promises as it runs this algorithm.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _promiseResolve_ be Completion(GetPromiseResolve(_C_)).
                  1. IfAbruptRejectPromise(_promiseResolve_, _promiseCapability_).
                  1. Let _iteratorRecord_ be Completion(GetIterator(_iterable_, ~sync~)).
                  1. IfAbruptRejectPromise(_iteratorRecord_, _promiseCapability_).
                  1. Let _result_ be Completion(PerformPromiseRace(_iteratorRecord_, _C_, _promiseCapability_, _promiseResolve_)).
                  1. If _result_ is an abrupt completion, then
                    1. If _iteratorRecord_.[[Done]] is *false*, set _result_ to Completion(IteratorClose(_iteratorRecord_, _result_)).
                    1. IfAbruptRejectPromise(_result_, _promiseCapability_).
                  1. Return ? _result_.
                </emu-alg>
                <emu-note>
                  <p>If the _iterable_ argument yields no values or if none of the promises yielded by _iterable_ ever settle, then the pending promise returned by this method will never be settled.</p>
                </emu-note>
                <emu-note>
                  <p>This function expects its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor. It also expects that its *this* value provides a `resolve` method.</p>
                </emu-note>

                <emu-clause id="sec-performpromiserace" type="abstract operation">
                  <h1>
                    PerformPromiseRace (
                      _iteratorRecord_: an Iterator Record,
                      _constructor_: a constructor,
                      _resultCapability_: a PromiseCapability Record,
                      _promiseResolve_: a function object,
                    ): either a normal completion containing an ECMAScript language value or a throw completion
                  </h1>
                  <dl class="header">
                  </dl>
                  <emu-alg>
                    1. Repeat,
                      1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
                      1. If _next_ is ~done~, then
                        1. Return _resultCapability_.[[Promise]].
                      1. Let _nextPromise_ be ? Call(_promiseResolve_, _constructor_, « _next_ »).
                      1. Perform ? Invoke(_nextPromise_, *"then"*, « _resultCapability_.[[Resolve]], _resultCapability_.[[Reject]] »).
                  </emu-alg>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promise.reject">
                <h1>Promise.reject ( _r_ )</h1>
                <p>This function returns a new promise rejected with the passed argument.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Perform ? Call(_promiseCapability_.[[Reject]], *undefined*, « _r_ »).
                  1. Return _promiseCapability_.[[Promise]].
                </emu-alg>
                <emu-note>
                  <p>This function expects its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor.</p>
                </emu-note>
              </emu-clause>

              <emu-clause id="sec-promise.resolve">
                <h1>Promise.resolve ( _x_ )</h1>
                <p>This function returns either a new promise resolved with the passed argument, or the argument itself if the argument is a promise produced by this constructor.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. If _C_ is not an Object, throw a *TypeError* exception.
                  1. Return ? PromiseResolve(_C_, _x_).
                </emu-alg>
                <emu-note>
                  <p>This function expects its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor.</p>
                </emu-note>

                <emu-clause id="sec-promise-resolve" type="abstract operation">
                  <h1>
                    PromiseResolve (
                      _C_: an Object,
                      _x_: an ECMAScript language value,
                    ): either a normal completion containing an ECMAScript language value or a throw completion
                  </h1>
                  <dl class="header">
                    <dt>description</dt>
                    <dd>It returns a new promise resolved with _x_.</dd>
                  </dl>
                  <emu-alg>
                    1. If IsPromise(_x_) is *true*, then
                      1. Let _xConstructor_ be ? Get(_x_, *"constructor"*).
                      1. If SameValue(_xConstructor_, _C_) is *true*, return _x_.
                    1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                    1. Perform ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _x_ »).
                    1. Return _promiseCapability_.[[Promise]].
                  </emu-alg>
                </emu-clause>
              </emu-clause>

              <emu-clause id="sec-promise.try">
                <h1>Promise.try ( _callback_, ..._args_ )</h1>
                <p>This function performs the following steps when called:</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. If _C_ is not an Object, throw a *TypeError* exception.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _status_ be Completion(Call(_callback_, *undefined*, _args_)).
                  1. If _status_ is an abrupt completion, then
                    1. Perform ? Call(_promiseCapability_.[[Reject]], *undefined*, « _status_.[[Value]] »).
                  1. Else,
                    1. Perform ? Call(_promiseCapability_.[[Resolve]], *undefined*, « _status_.[[Value]] »).
                  1. Return _promiseCapability_.[[Promise]].
                </emu-alg>
                <emu-note>
                  <p>This function expects its *this* value to be a constructor function that supports the parameter conventions of the Promise constructor.</p>
                </emu-note>
              </emu-clause>

              <emu-clause id="sec-promise.withResolvers">
                <h1>Promise.withResolvers ( )</h1>
                <p>This function returns an object with three properties: a new promise together with the `resolve` and `reject` functions associated with it.</p>
                <emu-alg>
                  1. Let _C_ be the *this* value.
                  1. Let _promiseCapability_ be ? NewPromiseCapability(_C_).
                  1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
                  1. Perform ! CreateDataPropertyOrThrow(_obj_, *"promise"*, _promiseCapability_.[[Promise]]).
                  1. Perform ! CreateDataPropertyOrThrow(_obj_, *"resolve"*, _promiseCapability_.[[Resolve]]).
                  1. Perform ! CreateDataPropertyOrThrow(_obj_, *"reject"*, _promiseCapability_.[[Reject]]).
                  1. Return _obj_.
                </emu-alg>
              </emu-clause>

              <emu-clause oldids="sec-get-promise-@@species" id="sec-get-promise-%symbol.species%">
                <h1>get Promise [ %Symbol.species% ]</h1>
                <p>`Promise[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
                <emu-alg>
                  1. Return the *this* value.
                </emu-alg>
                <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
                <emu-note>
                  <p>Promise prototype methods normally use their *this* value's constructor to create a derived object. However, a subclass constructor may over-ride that default behaviour by redefining its %Symbol.species% property.</p>
                </emu-note>
              </emu-clause>
            </emu-clause>

            <emu-clause id="sec-properties-of-the-promise-prototype-object">
              <h1>Properties of the Promise Prototype Object</h1>
              <p>The <dfn>Promise prototype object</dfn>:</p>
              <ul>
                <li>is <dfn>%Promise.prototype%</dfn>.</li>
                <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
                <li>is an ordinary object.</li>
                <li>does not have a [[PromiseState]] internal slot or any of the other internal slots of Promise instances.</li>
              </ul>

              <emu-clause id="sec-promise.prototype.catch">
                <h1>Promise.prototype.catch ( _onRejected_ )</h1>
                <p>This method performs the following steps when called:</p>
                <emu-alg>
                  1. Let _promise_ be the *this* value.
                  1. Return ? Invoke(_promise_, *"then"*, « *undefined*, _onRejected_ »).
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-promise.prototype.constructor">
                <h1>Promise.prototype.constructor</h1>
                <p>The initial value of `Promise.prototype.constructor` is %Promise%.</p>
              </emu-clause>

              <emu-clause id="sec-promise.prototype.finally" oldids="sec-thenfinallyfunctions,sec-catchfinallyfunctions">
                <h1>Promise.prototype.finally ( _onFinally_ )</h1>
                <p>This method performs the following steps when called:</p>
                <emu-alg>
                  1. Let _promise_ be the *this* value.
                  1. If _promise_ is not an Object, throw a *TypeError* exception.
                  1. Let _C_ be ? SpeciesConstructor(_promise_, %Promise%).
                  1. Assert: IsConstructor(_C_) is *true*.
                  1. If IsCallable(_onFinally_) is *false*, then
                    1. Let _thenFinally_ be _onFinally_.
                    1. Let _catchFinally_ be _onFinally_.
                  1. Else,
                    1. Let _thenFinallyClosure_ be a new Abstract Closure with parameters (_value_) that captures _onFinally_ and _C_ and performs the following steps when called:
                      1. Let _result_ be ? Call(_onFinally_, *undefined*).
                      1. Let _p_ be ? PromiseResolve(_C_, _result_).
                      1. Let _returnValue_ be a new Abstract Closure with no parameters that captures _value_ and performs the following steps when called:
                        1. Return _value_.
                      1. Let _valueThunk_ be CreateBuiltinFunction(_returnValue_, 0, *""*, « »).
                      1. Return ? Invoke(_p_, *"then"*, « _valueThunk_ »).
                    1. Let _thenFinally_ be CreateBuiltinFunction(_thenFinallyClosure_, 1, *""*, « »).
                    1. Let _catchFinallyClosure_ be a new Abstract Closure with parameters (_reason_) that captures _onFinally_ and _C_ and performs the following steps when called:
                      1. Let _result_ be ? Call(_onFinally_, *undefined*).
                      1. Let _p_ be ? PromiseResolve(_C_, _result_).
                      1. Let _throwReason_ be a new Abstract Closure with no parameters that captures _reason_ and performs the following steps when called:
                        1. Return ThrowCompletion(_reason_).
                      1. Let _thrower_ be CreateBuiltinFunction(_throwReason_, 0, *""*, « »).
                      1. Return ? Invoke(_p_, *"then"*, « _thrower_ »).
                    1. Let _catchFinally_ be CreateBuiltinFunction(_catchFinallyClosure_, 1, *""*, « »).
                  1. Return ? Invoke(_promise_, *"then"*, « _thenFinally_, _catchFinally_ »).
                </emu-alg>
              </emu-clause>

              <emu-clause id="sec-promise.prototype.then">
                <h1>Promise.prototype.then ( _onFulfilled_, _onRejected_ )</h1>
                <p>This method performs the following steps when called:</p>
                <emu-alg>
                  1. Let _promise_ be the *this* value.
                  1. If IsPromise(_promise_) is *false*, throw a *TypeError* exception.
                  1. Let _C_ be ? SpeciesConstructor(_promise_, %Promise%).
                  1. Let _resultCapability_ be ? NewPromiseCapability(_C_).
                  1. Return PerformPromiseThen(_promise_, _onFulfilled_, _onRejected_, _resultCapability_).
                </emu-alg>

                <emu-clause id="sec-performpromisethen" type="abstract operation">
                  <h1>
                    PerformPromiseThen (
                      _promise_: a Promise,
                      _onFulfilled_: an ECMAScript language value,
                      _onRejected_: an ECMAScript language value,
                      optional _resultCapability_: a PromiseCapability Record,
                    ): an ECMAScript language value
                  </h1>
                  <dl class="header">
                    <dt>description</dt>
                    <dd>It performs the “then” operation on _promise_ using _onFulfilled_ and _onRejected_ as its settlement actions. If _resultCapability_ is passed, the result is stored by updating _resultCapability_'s promise. If it is not passed, then PerformPromiseThen is being called by a specification-internal operation where the result does not matter.</dd>
                  </dl>
                  <emu-alg>
                    1. Assert: IsPromise(_promise_) is *true*.
                    1. If _resultCapability_ is not present, then
                      1. Set _resultCapability_ to *undefined*.
                    1. If IsCallable(_onFulfilled_) is *false*, then
                      1. Let _onFulfilledJobCallback_ be ~empty~.
                    1. Else,
                      1. Let _onFulfilledJobCallback_ be HostMakeJobCallback(_onFulfilled_).
                    1. If IsCallable(_onRejected_) is *false*, then
                      1. Let _onRejectedJobCallback_ be ~empty~.
                    1. Else,
                      1. Let _onRejectedJobCallback_ be HostMakeJobCallback(_onRejected_).
                    1. Let _fulfillReaction_ be the PromiseReaction Record { [[Capability]]: _resultCapability_, [[Type]]: ~fulfill~, [[Handler]]: _onFulfilledJobCallback_ }.
                    1. Let _rejectReaction_ be the PromiseReaction Record { [[Capability]]: _resultCapability_, [[Type]]: ~reject~, [[Handler]]: _onRejectedJobCallback_ }.
                    1. If _promise_.[[PromiseState]] is ~pending~, then
                      1. Append _fulfillReaction_ to _promise_.[[PromiseFulfillReactions]].
                      1. Append _rejectReaction_ to _promise_.[[PromiseRejectReactions]].
                    1. Else if _promise_.[[PromiseState]] is ~fulfilled~, then
                      1. Let _value_ be _promise_.[[PromiseResult]].
                      1. Let _fulfillJob_ be NewPromiseReactionJob(_fulfillReaction_, _value_).
                      1. Perform HostEnqueuePromiseJob(_fulfillJob_.[[Job]], _fulfillJob_.[[Realm]]).
                    1. Else,
                      1. Assert: The value of _promise_.[[PromiseState]] is ~rejected~.
                      1. Let _reason_ be _promise_.[[PromiseResult]].
                      1. If _promise_.[[PromiseIsHandled]] is *false*, perform HostPromiseRejectionTracker(_promise_, *"handle"*).
                      1. Let _rejectJob_ be NewPromiseReactionJob(_rejectReaction_, _reason_).
                      1. Perform HostEnqueuePromiseJob(_rejectJob_.[[Job]], _rejectJob_.[[Realm]]).
                    1. Set _promise_.[[PromiseIsHandled]] to *true*.
                    1. If _resultCapability_ is *undefined*, then
                      1. Return *undefined*.
                    1. Else,
                      1. Return _resultCapability_.[[Promise]].
                  </emu-alg>
                </emu-clause>
              </emu-clause>

              <emu-clause oldids="sec-promise.prototype-@@tostringtag" id="sec-promise.prototype-%symbol.tostringtag%">
                <h1>Promise.prototype [ %Symbol.toStringTag% ]</h1>
                <p>The initial value of the %Symbol.toStringTag% property is the String value *"Promise"*.</p>
                <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
              </emu-clause>
            </emu-clause>

            <emu-clause id="sec-properties-of-promise-instances">
              <h1>Properties of Promise Instances</h1>
              <p>Promise instances are ordinary objects that inherit properties from the Promise prototype object (the intrinsic, %Promise.prototype%). Promise instances are initially created with the internal slots described in <emu-xref href="#table-internal-slots-of-promise-instances"></emu-xref>.</p>
              <emu-table id="table-internal-slots-of-promise-instances" caption="Internal Slots of Promise Instances" oldids="table-59">
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
                      [[PromiseState]]
                    </td>
                    <td>
                      ~pending~, ~fulfilled~, or ~rejected~
                    </td>
                    <td>
                      Governs how a promise will react to incoming calls to its `then` method.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [[PromiseResult]]
                    </td>
                    <td>
                      an ECMAScript language value
                    </td>
                    <td>
                      The value with which the promise has been fulfilled or rejected, if any. Only meaningful if [[PromiseState]] is not ~pending~.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [[PromiseFulfillReactions]]
                    </td>
                    <td>
                      a List of PromiseReaction Records
                    </td>
                    <td>
                      Records to be processed when/if the promise transitions from the ~pending~ state to the ~fulfilled~ state.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [[PromiseRejectReactions]]
                    </td>
                    <td>
                      a List of PromiseReaction Records
                    </td>
                    <td>
                      Records to be processed when/if the promise transitions from the ~pending~ state to the ~rejected~ state.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [[PromiseIsHandled]]
                    </td>
                    <td>
                      a Boolean
                    </td>
                    <td>
                      Indicates whether the promise has ever had a fulfillment or rejection handler; used in unhandled rejection tracking.
                    </td>
                  </tr>
                </table>
              </emu-table>
            </emu-clause>
          </emu-clause>

<emu-clause id="sec-generatorfunction-objects">

## GeneratorFunction Objects
    <p>GeneratorFunctions are functions that are usually created by evaluating |GeneratorDeclaration|s, |GeneratorExpression|s, and |GeneratorMethod|s. They may also be created by calling the %GeneratorFunction% intrinsic.</p>
    <emu-figure id="figure-2" caption="Generator Objects Relationships" informative>
      <img alt="A staggering variety of boxes and arrows." height="700" src="img/figure-2.svg" width="900">
    </emu-figure>

    <emu-clause id="sec-generatorfunction-constructor">
      <h1>The GeneratorFunction Constructor</h1>
      <p>The GeneratorFunction constructor:</p>
      <ul>
        <li>is <dfn>%GeneratorFunction%</dfn>.</li>
        <li>is a subclass of `Function`.</li>
        <li>creates and initializes a new GeneratorFunction when called as a function rather than as a constructor. Thus the function call `GeneratorFunction (…)` is equivalent to the object creation expression `new GeneratorFunction (…)` with the same arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified GeneratorFunction behaviour must include a `super` call to the GeneratorFunction constructor to create and initialize subclass instances with the internal slots necessary for built-in GeneratorFunction behaviour. All ECMAScript syntactic forms for defining generator function objects create direct instances of GeneratorFunction. There is no syntactic means to create instances of GeneratorFunction subclasses.</li>
      </ul>

      <emu-clause id="sec-generatorfunction">
        <h1>GeneratorFunction ( ..._parameterArgs_, _bodyArg_ )</h1>
        <p>The last argument (if any) specifies the body (executable code) of a generator function; any preceding arguments specify formal parameters.</p>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _C_ be the active function object.
          1. If _bodyArg_ is not present, set _bodyArg_ to the empty String.
          1. Return ? CreateDynamicFunction(_C_, NewTarget, ~generator~, _parameterArgs_, _bodyArg_).
        </emu-alg>
        <emu-note>
          <p>See NOTE for <emu-xref href="#sec-function-p1-p2-pn-body"></emu-xref>.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-generatorfunction-constructor">
      <h1>Properties of the GeneratorFunction Constructor</h1>
      <p>The GeneratorFunction constructor:</p>
      <ul>
        <li>is a standard built-in function object that inherits from the Function constructor.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function%.</li>
        <li oldids="sec-generatorfunction.length">has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has a *"name"* property whose value is *"GeneratorFunction"*.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-generatorfunction.prototype">
        <h1>GeneratorFunction.prototype</h1>
        <p>The initial value of `GeneratorFunction.prototype` is the GeneratorFunction prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-generatorfunction-prototype-object">
      <h1>Properties of the GeneratorFunction Prototype Object</h1>
      <p>The <dfn>GeneratorFunction prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%GeneratorFunction.prototype%</dfn> (see <emu-xref href="#figure-2"></emu-xref>).</li>
        <li>is an ordinary object.</li>
        <li>is not a function object and does not have an [[ECMAScriptCode]] internal slot or any other of the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref> or <emu-xref href="#table-internal-slots-of-generator-instances"></emu-xref>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
      </ul>

      <emu-clause id="sec-generatorfunction.prototype.constructor">
        <h1>GeneratorFunction.prototype.constructor</h1>
        <p>The initial value of `GeneratorFunction.prototype.constructor` is %GeneratorFunction%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-generatorfunction.prototype.prototype">
        <h1>GeneratorFunction.prototype.prototype</h1>
        <p>The initial value of `GeneratorFunction.prototype.prototype` is %GeneratorPrototype%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-generatorfunction.prototype-@@tostringtag" id="sec-generatorfunction.prototype-%symbol.tostringtag%">
        <h1>GeneratorFunction.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"GeneratorFunction"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-generatorfunction-instances">
      <h1>GeneratorFunction Instances</h1>
      <p>Every GeneratorFunction instance is an ECMAScript function object and has the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>. The value of the [[IsClassConstructor]] internal slot for all such instances is *false*.</p>
      <p>Each GeneratorFunction instance has the following own properties:</p>

      <emu-clause id="sec-generatorfunction-instances-length">
        <h1>length</h1>
        <p>The specification for the *"length"* property of Function instances given in <emu-xref href="#sec-function-instances-length"></emu-xref> also applies to GeneratorFunction instances.</p>
      </emu-clause>

      <emu-clause id="sec-generatorfunction-instances-name">
        <h1>name</h1>
        <p>The specification for the *"name"* property of Function instances given in <emu-xref href="#sec-function-instances-name"></emu-xref> also applies to GeneratorFunction instances.</p>
      </emu-clause>

      <emu-clause id="sec-generatorfunction-instances-prototype">
        <h1>prototype</h1>
        <p>Whenever a GeneratorFunction instance is created another ordinary object is also created and is the initial value of the generator function's *"prototype"* property. The value of the prototype property is used to initialize the [[Prototype]] internal slot of a newly created Generator when the generator function object is invoked using [[Call]].</p>
        <p>This property has the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>Unlike Function instances, the object that is the value of a GeneratorFunction's *"prototype"* property does not have a *"constructor"* property whose value is the GeneratorFunction instance.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-asyncgeneratorfunction-objects">

## AsyncGeneratorFunction Objects
    <p>AsyncGeneratorFunctions are functions that are usually created by evaluating |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, and |AsyncGeneratorMethod| syntactic productions. They may also be created by calling the %AsyncGeneratorFunction% intrinsic.</p>

    <emu-clause id="sec-asyncgeneratorfunction-constructor">
      <h1>The AsyncGeneratorFunction Constructor</h1>
      <p>The AsyncGeneratorFunction constructor:</p>
      <ul>
        <li>is <dfn>%AsyncGeneratorFunction%</dfn>.</li>
        <li>is a subclass of `Function`.</li>
        <li>creates and initializes a new AsyncGeneratorFunction when called as a function rather than as a constructor. Thus the function call `AsyncGeneratorFunction (...)` is equivalent to the object creation expression `new AsyncGeneratorFunction (...)` with the same arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified AsyncGeneratorFunction behaviour must include a `super` call to the AsyncGeneratorFunction constructor to create and initialize subclass instances with the internal slots necessary for built-in AsyncGeneratorFunction behaviour. All ECMAScript syntactic forms for defining async generator function objects create direct instances of AsyncGeneratorFunction. There is no syntactic means to create instances of AsyncGeneratorFunction subclasses.</li>
      </ul>

      <emu-clause id="sec-asyncgeneratorfunction">
        <h1>AsyncGeneratorFunction ( ..._parameterArgs_, _bodyArg_ )</h1>
        <p>The last argument (if any) specifies the body (executable code) of an async generator function; any preceding arguments specify formal parameters.</p>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. Let _C_ be the active function object.
          1. If _bodyArg_ is not present, set _bodyArg_ to the empty String.
          1. Return ? CreateDynamicFunction(_C_, NewTarget, ~async-generator~, _parameterArgs_, _bodyArg_).
        </emu-alg>
        <emu-note>
          <p>See NOTE for <emu-xref href="#sec-function-p1-p2-pn-body"></emu-xref>.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-asyncgeneratorfunction">
      <h1>Properties of the AsyncGeneratorFunction Constructor</h1>
      <p>The AsyncGeneratorFunction constructor:</p>
      <ul>
        <li>is a standard built-in function object that inherits from the Function constructor.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function%.</li>
        <li oldids="sec-asyncgeneratorfunction-length">has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has a *"name"* property whose value is *"AsyncGeneratorFunction"*.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-asyncgeneratorfunction-prototype">
        <h1>AsyncGeneratorFunction.prototype</h1>
        <p>The initial value of `AsyncGeneratorFunction.prototype` is the AsyncGeneratorFunction prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-asyncgeneratorfunction-prototype">
      <h1>Properties of the AsyncGeneratorFunction Prototype Object</h1>
      <p>The <dfn>AsyncGeneratorFunction prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%AsyncGeneratorFunction.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a function object and does not have an [[ECMAScriptCode]] internal slot or any other of the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref> or <emu-xref href="#table-internal-slots-of-asyncgenerator-instances"></emu-xref>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
      </ul>

      <emu-clause id="sec-asyncgeneratorfunction-prototype-constructor">
        <h1>AsyncGeneratorFunction.prototype.constructor</h1>
        <p>The initial value of `AsyncGeneratorFunction.prototype.constructor` is %AsyncGeneratorFunction%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorfunction-prototype-prototype">
        <h1>AsyncGeneratorFunction.prototype.prototype</h1>
        <p>The initial value of `AsyncGeneratorFunction.prototype.prototype` is %AsyncGeneratorPrototype%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-asyncgeneratorfunction-prototype-tostringtag" id="sec-asyncgeneratorfunction-prototype-%symbol.tostringtag%">
        <h1>AsyncGeneratorFunction.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"AsyncGeneratorFunction"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-asyncgeneratorfunction-instances">
      <h1>AsyncGeneratorFunction Instances</h1>
      <p>Every AsyncGeneratorFunction instance is an ECMAScript function object and has the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>. The value of the [[IsClassConstructor]] internal slot for all such instances is *false*.</p>
      <p>Each AsyncGeneratorFunction instance has the following own properties:</p>

      <emu-clause id="sec-asyncgeneratorfunction-instance-length">
        <h1>length</h1>
        <p>The value of the *"length"* property is an integral Number that indicates the typical number of arguments expected by the AsyncGeneratorFunction. However, the language permits the function to be invoked with some other number of arguments. The behaviour of an AsyncGeneratorFunction when invoked on a number of arguments other than the number specified by its *"length"* property depends on the function.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorfunction-instance-name">
        <h1>name</h1>
        <p>The specification for the *"name"* property of Function instances given in <emu-xref href="#sec-function-instances-name"></emu-xref> also applies to AsyncGeneratorFunction instances.</p>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorfunction-instance-prototype">
        <h1>prototype</h1>
        <p>Whenever an AsyncGeneratorFunction instance is created, another ordinary object is also created and is the initial value of the async generator function's *"prototype"* property. The value of the prototype property is used to initialize the [[Prototype]] internal slot of a newly created AsyncGenerator when the generator function object is invoked using [[Call]].</p>
        <p>This property has the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        <emu-note>
          <p>Unlike function instances, the object that is the value of an AsyncGeneratorFunction's *"prototype"* property does not have a *"constructor"* property whose value is the AsyncGeneratorFunction instance.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-generator-objects">

## Generator Objects
    <p>A Generator is created by calling a generator function and conforms to both the iterator interface and the iterable interface.</p>
    <p>Generator instances directly inherit properties from the initial value of the *"prototype"* property of the generator function that created the instance. Generator instances indirectly inherit properties from %GeneratorPrototype%.</p>

    <emu-clause id="sec-properties-of-generator-prototype">
      <h1>The %GeneratorPrototype% Object</h1>
      <p>The <dfn>%GeneratorPrototype%</dfn> object:</p>
      <ul>
        <li>is <dfn>%GeneratorFunction.prototype.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a Generator instance and does not have a [[GeneratorState]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
        <li>has properties that are indirectly inherited by all Generator instances.</li>
      </ul>

      <emu-clause id="sec-generator.prototype.constructor">
        <h1>%GeneratorPrototype%.constructor</h1>
        <p>The initial value of %GeneratorPrototype%`.constructor` is %GeneratorFunction.prototype%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-generator.prototype.next">
        <h1>%GeneratorPrototype%.next ( _value_ )</h1>
        <emu-alg>
          1. Return ? GeneratorResume(*this* value, _value_, ~empty~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generator.prototype.return">
        <h1>%GeneratorPrototype%.return ( _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _g_ be the *this* value.
          1. Let _C_ be ReturnCompletion(_value_).
          1. Return ? GeneratorResumeAbrupt(_g_, _C_, ~empty~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generator.prototype.throw">
        <h1>%GeneratorPrototype%.throw ( _exception_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _g_ be the *this* value.
          1. Let _C_ be ThrowCompletion(_exception_).
          1. Return ? GeneratorResumeAbrupt(_g_, _C_, ~empty~).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-generator.prototype-@@tostringtag" id="sec-generator.prototype-%symbol.tostringtag%">
        <h1>%GeneratorPrototype% [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"Generator"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-generator-instances">
      <h1>Properties of Generator Instances</h1>
      <p>Generator instances are initially created with the internal slots described in <emu-xref href="#table-internal-slots-of-generator-instances"></emu-xref>.</p>
      <emu-table id="table-internal-slots-of-generator-instances" caption="Internal Slots of Generator Instances" oldids="table-56">
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
              [[GeneratorState]]
            </td>
            <td>
              ~suspended-start~, ~suspended-yield~, ~executing~, or ~completed~
            </td>
            <td>
              The current execution state of the generator.
            </td>
          </tr>
          <tr>
            <td>
              [[GeneratorContext]]
            </td>
            <td>
              an execution context
            </td>
            <td>
              The execution context that is used when executing the code of this generator.
            </td>
          </tr>
          <tr>
            <td>
              [[GeneratorBrand]]
            </td>
            <td>
              a String or ~empty~
            </td>
            <td>
              A brand used to distinguish different kinds of generators. The [[GeneratorBrand]] of generators declared by ECMAScript source text is always ~empty~.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-generator-abstract-operations">
      <h1>Generator Abstract Operations</h1>

      <emu-clause id="sec-generatorstart" type="abstract operation">
        <h1>
          GeneratorStart (
            _generator_: a Generator,
            _generatorBody_: a |FunctionBody| Parse Node or an Abstract Closure with no parameters,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The value of _generator_.[[GeneratorState]] is ~suspended-start~.
          1. Let _genContext_ be the running execution context.
          1. Set the Generator component of _genContext_ to _generator_.
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _generatorBody_ and performs the following steps when called:
            1. Let _acGenContext_ be the running execution context.
            1. Let _acGenerator_ be the Generator component of _acGenContext_.
            1. If _generatorBody_ is a Parse Node, then
              1. Let _result_ be Completion(Evaluation of _generatorBody_).
            1. Else,
              1. Assert: _generatorBody_ is an Abstract Closure with no parameters.
              1. Let _result_ be _generatorBody_().
            1. Assert: If we return here, the generator either threw an exception or performed either an implicit or explicit return.
            1. Remove _acGenContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
            1. Set _acGenerator_.[[GeneratorState]] to ~completed~.
            1. NOTE: Once a generator enters the ~completed~ state it never leaves it and its associated execution context is never resumed. Any execution state associated with _acGenerator_ can be discarded at this point.
            1. If _result_ is a normal completion, then
              1. Let _resultValue_ be *undefined*.
            1. Else if _result_ is a return completion, then
              1. Let _resultValue_ be _result_.[[Value]].
            1. Else,
              1. Assert: _result_ is a throw completion.
              1. Return ? _result_.
            1. Return CreateIteratorResultObject(_resultValue_, *true*).
          1. Set the code evaluation state of _genContext_ such that when evaluation is resumed for that execution context, _closure_ will be called with no arguments.
          1. Set _generator_.[[GeneratorContext]] to _genContext_.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generatorvalidate" type="abstract operation">
        <h1>
          GeneratorValidate (
            _generator_: an ECMAScript language value,
            _generatorBrand_: a String or ~empty~,
          ): either a normal completion containing one of ~suspended-start~, ~suspended-yield~, or ~completed~, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_generator_, [[GeneratorState]]).
          1. Perform ? RequireInternalSlot(_generator_, [[GeneratorBrand]]).
          1. If _generator_.[[GeneratorBrand]] is not _generatorBrand_, throw a *TypeError* exception.
          1. Assert: _generator_ also has a [[GeneratorContext]] internal slot.
          1. Let _state_ be _generator_.[[GeneratorState]].
          1. If _state_ is ~executing~, throw a *TypeError* exception.
          1. Return _state_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generatorresume" type="abstract operation">
        <h1>
          GeneratorResume (
            _generator_: an ECMAScript language value,
            _value_: an ECMAScript language value or ~empty~,
            _generatorBrand_: a String or ~empty~,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _state_ be ? GeneratorValidate(_generator_, _generatorBrand_).
          1. If _state_ is ~completed~, return CreateIteratorResultObject(*undefined*, *true*).
          1. Assert: _state_ is either ~suspended-start~ or ~suspended-yield~.
          1. Let _genContext_ be _generator_.[[GeneratorContext]].
          1. Let _methodContext_ be the running execution context.
          1. Suspend _methodContext_.
          1. Set _generator_.[[GeneratorState]] to ~executing~.
          1. Push _genContext_ onto the execution context stack; _genContext_ is now the running execution context.
          1. <emu-meta effects="user-code">Resume the suspended evaluation of _genContext_</emu-meta> using NormalCompletion(_value_) as the result of the operation that suspended it. Let _result_ be the value returned by the resumed computation.
          1. Assert: When we return here, _genContext_ has already been removed from the execution context stack and _methodContext_ is the currently running execution context.
          1. Return ? _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generatorresumeabrupt" type="abstract operation">
        <h1>
          GeneratorResumeAbrupt (
            _generator_: an ECMAScript language value,
            _abruptCompletion_: a return completion or a throw completion,
            _generatorBrand_: a String or ~empty~,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _state_ be ? GeneratorValidate(_generator_, _generatorBrand_).
          1. If _state_ is ~suspended-start~, then
            1. Set _generator_.[[GeneratorState]] to ~completed~.
            1. NOTE: Once a generator enters the ~completed~ state it never leaves it and its associated execution context is never resumed. Any execution state associated with _generator_ can be discarded at this point.
            1. Set _state_ to ~completed~.
          1. If _state_ is ~completed~, then
            1. If _abruptCompletion_ is a return completion, then
              1. Return CreateIteratorResultObject(_abruptCompletion_.[[Value]], *true*).
            1. Return ? _abruptCompletion_.
          1. Assert: _state_ is ~suspended-yield~.
          1. Let _genContext_ be _generator_.[[GeneratorContext]].
          1. Let _methodContext_ be the running execution context.
          1. Suspend _methodContext_.
          1. Set _generator_.[[GeneratorState]] to ~executing~.
          1. Push _genContext_ onto the execution context stack; _genContext_ is now the running execution context.
          1. <emu-meta effects="user-code">Resume the suspended evaluation of _genContext_</emu-meta> using _abruptCompletion_ as the result of the operation that suspended it. Let _result_ be the Completion Record returned by the resumed computation.
          1. Assert: When we return here, _genContext_ has already been removed from the execution context stack and _methodContext_ is the currently running execution context.
          1. Return ? _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getgeneratorkind" type="abstract operation">
        <h1>GetGeneratorKind ( ): ~non-generator~, ~sync~, or ~async~</h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _genContext_ be the running execution context.
          1. If _genContext_ does not have a Generator component, return ~non-generator~.
          1. Let _generator_ be the Generator component of _genContext_.
          1. If _generator_ has an [[AsyncGeneratorState]] internal slot, return ~async~.
          1. Else, return ~sync~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-generatoryield" type="abstract operation">
        <h1>
          GeneratorYield (
            _iteratorResult_: an Object that conforms to the IteratorResult interface,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
          <dt>skip return checks</dt>
          <dd>true</dd>
        </dl>
        <emu-alg>
          1. Let _genContext_ be the running execution context.
          1. Assert: _genContext_ is the execution context of a generator.
          1. Let _generator_ be the value of the Generator component of _genContext_.
          1. Assert: GetGeneratorKind() is ~sync~.
          1. Set _generator_.[[GeneratorState]] to ~suspended-yield~.
          1. Remove _genContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
          1. Let _callerContext_ be the running execution context.
          1. Resume _callerContext_ passing NormalCompletion(_iteratorResult_). If _genContext_ is ever resumed again, let _resumptionValue_ be the Completion Record with which it is resumed.
          1. Assert: If control reaches here, then _genContext_ is the running execution context again.
          1. Return _resumptionValue_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-yield" type="abstract operation">
        <h1>
          Yield (
            _value_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _generatorKind_ be GetGeneratorKind().
          1. If _generatorKind_ is ~async~, return ? AsyncGeneratorYield(? Await(_value_)).
          1. Otherwise, return ? GeneratorYield(CreateIteratorResultObject(_value_, *false*)).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createiteratorfromclosure" type="abstract operation">
        <h1>
          CreateIteratorFromClosure (
            _closure_: an Abstract Closure with no parameters,
            _generatorBrand_: a String or ~empty~,
            _generatorPrototype_: an Object,
            optional _extraSlots_: a List of names of internal slots,
          ): a Generator
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. NOTE: _closure_ can contain uses of the Yield operation to yield an IteratorResult object.
          1. If _extraSlots_ is not present, set _extraSlots_ to a new empty List.
          1. Let _internalSlotsList_ be the list-concatenation of _extraSlots_ and « [[GeneratorState]], [[GeneratorContext]], [[GeneratorBrand]] ».
          1. Let _generator_ be OrdinaryObjectCreate(_generatorPrototype_, _internalSlotsList_).
          1. Set _generator_.[[GeneratorBrand]] to _generatorBrand_.
          1. Set _generator_.[[GeneratorState]] to ~suspended-start~.
          1. Let _callerContext_ be the running execution context.
          1. Let _calleeContext_ be a new execution context.
          1. Set the Function of _calleeContext_ to *null*.
          1. Set the Realm of _calleeContext_ to the current Realm Record.
          1. Set the ScriptOrModule of _calleeContext_ to _callerContext_'s ScriptOrModule.
          1. If _callerContext_ is not already suspended, suspend _callerContext_.
          1. Push _calleeContext_ onto the execution context stack; _calleeContext_ is now the running execution context.
          1. Perform GeneratorStart(_generator_, _closure_).
          1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
          1. Return _generator_.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-asyncgenerator-objects">

## AsyncGenerator Objects
    <p>An AsyncGenerator is created by calling an async generator function and conforms to both the async iterator interface and the async iterable interface.</p>

    <p>AsyncGenerator instances directly inherit properties from the initial value of the *"prototype"* property of the async generator function that created the instance. AsyncGenerator instances indirectly inherit properties from %AsyncGeneratorPrototype%.</p>

    <emu-clause id="sec-properties-of-asyncgenerator-prototype">
      <h1>The %AsyncGeneratorPrototype% Object</h1>
      <p>The <dfn>%AsyncGeneratorPrototype%</dfn> object:</p>
      <ul>
        <li>is <dfn>%AsyncGeneratorFunction.prototype.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not an AsyncGenerator instance and does not have an [[AsyncGeneratorState]] internal slot.</li>
        <li>has a [[Prototype]] internal slot whose value is %AsyncIteratorPrototype%.</li>
        <li>has properties that are indirectly inherited by all AsyncGenerator instances.</li>
      </ul>

      <emu-clause id="sec-asyncgenerator-prototype-constructor">
        <h1>%AsyncGeneratorPrototype%.constructor</h1>
        <p>The initial value of %AsyncGeneratorPrototype%`.constructor` is %AsyncGeneratorFunction.prototype%.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause id="sec-asyncgenerator-prototype-next">
        <h1>%AsyncGeneratorPrototype%.next ( _value_ )</h1>
        <emu-alg>
          1. Let _generator_ be the *this* value.
          1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
          1. Let _result_ be Completion(AsyncGeneratorValidate(_generator_, ~empty~)).
          1. IfAbruptRejectPromise(_result_, _promiseCapability_).
          1. Let _state_ be _generator_.[[AsyncGeneratorState]].
          1. If _state_ is ~completed~, then
            1. Let _iteratorResult_ be CreateIteratorResultObject(*undefined*, *true*).
            1. Perform ! <emu-meta effects="user-code">Call</emu-meta>(_promiseCapability_.[[Resolve]], *undefined*, « _iteratorResult_ »).
            1. Return _promiseCapability_.[[Promise]].
          1. Let _completion_ be NormalCompletion(_value_).
          1. Perform AsyncGeneratorEnqueue(_generator_, _completion_, _promiseCapability_).
          1. If _state_ is either ~suspended-start~ or ~suspended-yield~, then
            1. Perform AsyncGeneratorResume(_generator_, _completion_).
          1. Else,
            1. Assert: _state_ is either ~executing~ or ~draining-queue~.
          1. Return _promiseCapability_.[[Promise]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgenerator-prototype-return">
        <h1>%AsyncGeneratorPrototype%.return ( _value_ )</h1>
        <emu-alg>
          1. Let _generator_ be the *this* value.
          1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
          1. Let _result_ be Completion(AsyncGeneratorValidate(_generator_, ~empty~)).
          1. IfAbruptRejectPromise(_result_, _promiseCapability_).
          1. Let _completion_ be ReturnCompletion(_value_).
          1. Perform AsyncGeneratorEnqueue(_generator_, _completion_, _promiseCapability_).
          1. Let _state_ be _generator_.[[AsyncGeneratorState]].
          1. If _state_ is either ~suspended-start~ or ~completed~, then
            1. Set _generator_.[[AsyncGeneratorState]] to ~draining-queue~.
            1. Perform AsyncGeneratorAwaitReturn(_generator_).
          1. Else if _state_ is ~suspended-yield~, then
            1. Perform AsyncGeneratorResume(_generator_, _completion_).
          1. Else,
            1. Assert: _state_ is either ~executing~ or ~draining-queue~.
          1. Return _promiseCapability_.[[Promise]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgenerator-prototype-throw">
        <h1>%AsyncGeneratorPrototype%.throw ( _exception_ )</h1>
        <emu-alg>
          1. Let _generator_ be the *this* value.
          1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
          1. Let _result_ be Completion(AsyncGeneratorValidate(_generator_, ~empty~)).
          1. IfAbruptRejectPromise(_result_, _promiseCapability_).
          1. Let _state_ be _generator_.[[AsyncGeneratorState]].
          1. If _state_ is ~suspended-start~, then
            1. Set _generator_.[[AsyncGeneratorState]] to ~completed~.
            1. Set _state_ to ~completed~.
          1. If _state_ is ~completed~, then
            1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _exception_ »).
            1. Return _promiseCapability_.[[Promise]].
          1. Let _completion_ be ThrowCompletion(_exception_).
          1. Perform AsyncGeneratorEnqueue(_generator_, _completion_, _promiseCapability_).
          1. If _state_ is ~suspended-yield~, then
            1. Perform AsyncGeneratorResume(_generator_, _completion_).
          1. Else,
            1. Assert: _state_ is either ~executing~ or ~draining-queue~.
          1. Return _promiseCapability_.[[Promise]].
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-asyncgenerator-prototype-tostringtag" id="sec-asyncgenerator-prototype-%symbol.tostringtag%">
        <h1>%AsyncGeneratorPrototype% [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"AsyncGenerator"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-asyncgenerator-intances">
      <h1>Properties of AsyncGenerator Instances</h1>
      <p>AsyncGenerator instances are initially created with the internal slots described below:</p>
      <emu-table id="table-internal-slots-of-asyncgenerator-instances" caption="Internal Slots of AsyncGenerator Instances">
        <table>
          <thead>
            <tr>
              <th>Internal Slot</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tr>
            <td>[[AsyncGeneratorState]]</td>
            <td>~suspended-start~, ~suspended-yield~, ~executing~, ~draining-queue~, or ~completed~</td>
            <td>The current execution state of the async generator.</td>
          </tr>
          <tr>
            <td>[[AsyncGeneratorContext]]</td>
            <td>an execution context</td>
            <td>The execution context that is used when executing the code of this async generator.</td>
          </tr>
          <tr>
            <td>[[AsyncGeneratorQueue]]</td>
            <td>a List of AsyncGeneratorRequest Records</td>
            <td>Records which represent requests to resume the async generator. Except during state transitions, it is non-empty if and only if [[AsyncGeneratorState]] is either ~executing~ or ~draining-queue~.</td>
          </tr>
          <tr>
            <td>[[GeneratorBrand]]</td>
            <td>a String or ~empty~</td>
            <td>A brand used to distinguish different kinds of async generators. The [[GeneratorBrand]] of async generators declared by ECMAScript source text is always ~empty~.</td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-asyncgenerator-abstract-operations">
      <h1>AsyncGenerator Abstract Operations</h1>

      <emu-clause id="sec-asyncgeneratorrequest-records">
        <h1>AsyncGeneratorRequest Records</h1>
        <p>An <dfn variants="AsyncGeneratorRequests">AsyncGeneratorRequest</dfn> is a Record value used to store information about how an async generator should be resumed and contains capabilities for fulfilling or rejecting the corresponding promise.</p>
        <p>They have the following fields:</p>
        <emu-table caption="AsyncGeneratorRequest Record Fields">
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tr>
              <td>[[Completion]]</td>
              <td>a Completion Record</td>
              <td>The Completion Record which should be used to resume the async generator.</td>
            </tr>
            <tr>
              <td>[[Capability]]</td>
              <td>a PromiseCapability Record</td>
              <td>The promise capabilities associated with this request.</td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorstart" type="abstract operation">
        <h1>
          AsyncGeneratorStart (
            _generator_: an AsyncGenerator,
            _generatorBody_: a |FunctionBody| Parse Node or an Abstract Closure with no parameters,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _generator_.[[AsyncGeneratorState]] is ~suspended-start~.
          1. Let _genContext_ be the running execution context.
          1. Set the Generator component of _genContext_ to _generator_.
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _generatorBody_ and performs the following steps when called:
            1. Let _acGenContext_ be the running execution context.
            1. Let _acGenerator_ be the Generator component of _acGenContext_.
            1. If _generatorBody_ is a Parse Node, then
              1. Let _result_ be Completion(Evaluation of _generatorBody_).
            1. Else,
              1. Assert: _generatorBody_ is an Abstract Closure with no parameters.
              1. Let _result_ be Completion(_generatorBody_()).
            1. Assert: If we return here, the async generator either threw an exception or performed either an implicit or explicit return.
            1. Remove _acGenContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
            1. Set _acGenerator_.[[AsyncGeneratorState]] to ~draining-queue~.
            1. If _result_ is a normal completion, set _result_ to NormalCompletion(*undefined*).
            1. If _result_ is a return completion, set _result_ to NormalCompletion(_result_.[[Value]]).
            1. Perform AsyncGeneratorCompleteStep(_acGenerator_, _result_, *true*).
            1. Perform AsyncGeneratorDrainQueue(_acGenerator_).
            1. Return *undefined*.
          1. Set the code evaluation state of _genContext_ such that when evaluation is resumed for that execution context, _closure_ will be called with no arguments.
          1. Set _generator_.[[AsyncGeneratorContext]] to _genContext_.
          1. Set _generator_.[[AsyncGeneratorQueue]] to a new empty List.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorvalidate" type="abstract operation">
        <h1>
          AsyncGeneratorValidate (
            _generator_: an ECMAScript language value,
            _generatorBrand_: a String or ~empty~,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_generator_, [[AsyncGeneratorContext]]).
          1. Perform ? RequireInternalSlot(_generator_, [[AsyncGeneratorState]]).
          1. Perform ? RequireInternalSlot(_generator_, [[AsyncGeneratorQueue]]).
          1. If _generator_.[[GeneratorBrand]] is not _generatorBrand_, throw a *TypeError* exception.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorenqueue" type="abstract operation">
        <h1>
          AsyncGeneratorEnqueue (
            _generator_: an AsyncGenerator,
            _completion_: a Completion Record,
            _promiseCapability_: a PromiseCapability Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _request_ be AsyncGeneratorRequest { [[Completion]]: _completion_, [[Capability]]: _promiseCapability_ }.
          1. Append _request_ to _generator_.[[AsyncGeneratorQueue]].
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorcompletestep" type="abstract operation">
        <h1>
          AsyncGeneratorCompleteStep (
            _generator_: an AsyncGenerator,
            _completion_: a Completion Record,
            _done_: a Boolean,
            optional _realm_: a Realm Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _generator_.[[AsyncGeneratorQueue]] is not empty.
          1. Let _next_ be the first element of _generator_.[[AsyncGeneratorQueue]].
          1. Remove the first element from _generator_.[[AsyncGeneratorQueue]].
          1. Let _promiseCapability_ be _next_.[[Capability]].
          1. Let _value_ be _completion_.[[Value]].
          1. If _completion_ is a throw completion, then
            1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _value_ »).
          1. Else,
            1. Assert: _completion_ is a normal completion.
            1. If _realm_ is present, then
              1. Let _oldRealm_ be the running execution context's Realm.
              1. Set the running execution context's Realm to _realm_.
              1. Let _iteratorResult_ be CreateIteratorResultObject(_value_, _done_).
              1. Set the running execution context's Realm to _oldRealm_.
            1. Else,
              1. Let _iteratorResult_ be CreateIteratorResultObject(_value_, _done_).
            1. Perform ! <emu-meta effects="user-code">Call</emu-meta>(_promiseCapability_.[[Resolve]], *undefined*, « _iteratorResult_ »).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorresume" type="abstract operation">
        <h1>
          AsyncGeneratorResume (
            _generator_: an AsyncGenerator,
            _completion_: a Completion Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _generator_.[[AsyncGeneratorState]] is either ~suspended-start~ or ~suspended-yield~.
          1. Let _genContext_ be _generator_.[[AsyncGeneratorContext]].
          1. Let _callerContext_ be the running execution context.
          1. Suspend _callerContext_.
          1. Set _generator_.[[AsyncGeneratorState]] to ~executing~.
          1. Push _genContext_ onto the execution context stack; _genContext_ is now the running execution context.
          1. <emu-meta effects="user-code">Resume the suspended evaluation of _genContext_</emu-meta> using _completion_ as the result of the operation that suspended it. Let _result_ be the Completion Record returned by the resumed computation.
          1. Assert: _result_ is never an abrupt completion.
          1. Assert: When we return here, _genContext_ has already been removed from the execution context stack and _callerContext_ is the currently running execution context.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorunwrapyieldresumption" type="abstract operation">
        <h1>
          AsyncGeneratorUnwrapYieldResumption (
            _resumptionValue_: a Completion Record,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _resumptionValue_ is not a return completion, return ? _resumptionValue_.
          1. Let _awaited_ be Completion(Await(_resumptionValue_.[[Value]])).
          1. If _awaited_ is a throw completion, return ? _awaited_.
          1. Assert: _awaited_ is a normal completion.
          1. Return ReturnCompletion(_awaited_.[[Value]]).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratoryield" type="abstract operation">
        <h1>
          AsyncGeneratorYield (
            _value_: an ECMAScript language value,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _genContext_ be the running execution context.
          1. Assert: _genContext_ is the execution context of a generator.
          1. Let _generator_ be the value of the Generator component of _genContext_.
          1. Assert: GetGeneratorKind() is ~async~.
          1. Let _completion_ be NormalCompletion(_value_).
          1. Assert: The execution context stack has at least two elements.
          1. Let _previousContext_ be the second to top element of the execution context stack.
          1. Let _previousRealm_ be _previousContext_'s Realm.
          1. Perform AsyncGeneratorCompleteStep(_generator_, _completion_, *false*, _previousRealm_).
          1. Let _queue_ be _generator_.[[AsyncGeneratorQueue]].
          1. If _queue_ is not empty, then
            1. NOTE: Execution continues without suspending the generator.
            1. Let _toYield_ be the first element of _queue_.
            1. Let _resumptionValue_ be Completion(_toYield_.[[Completion]]).
            1. Return ? AsyncGeneratorUnwrapYieldResumption(_resumptionValue_).
          1. Else,
            1. Set _generator_.[[AsyncGeneratorState]] to ~suspended-yield~.
            1. Remove _genContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
            1. Let _callerContext_ be the running execution context.
            1. Resume _callerContext_ passing *undefined*. If _genContext_ is ever resumed again, let _resumptionValue_ be the Completion Record with which it is resumed.
            1. Assert: If control reaches here, then _genContext_ is the running execution context again.
            1. Return ? AsyncGeneratorUnwrapYieldResumption(_resumptionValue_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratorawaitreturn" type="abstract operation">
        <h1>
          AsyncGeneratorAwaitReturn (
            _generator_: an AsyncGenerator,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _generator_.[[AsyncGeneratorState]] is ~draining-queue~.
          1. Let _queue_ be _generator_.[[AsyncGeneratorQueue]].
          1. Assert: _queue_ is not empty.
          1. Let _next_ be the first element of _queue_.
          1. Let _completion_ be Completion(_next_.[[Completion]]).
          1. Assert: _completion_ is a return completion.
          1. Let _promiseCompletion_ be Completion(PromiseResolve(%Promise%, _completion_.[[Value]])).
          1. If _promiseCompletion_ is an abrupt completion, then
            1. Perform AsyncGeneratorCompleteStep(_generator_, _promiseCompletion_, *true*).
            1. Perform AsyncGeneratorDrainQueue(_generator_).
            1. Return ~unused~.
          1. Assert: _promiseCompletion_ is a normal completion.
          1. Let _promise_ be _promiseCompletion_.[[Value]].
          1. Let _fulfilledClosure_ be a new Abstract Closure with parameters (_value_) that captures _generator_ and performs the following steps when called:
            1. Assert: _generator_.[[AsyncGeneratorState]] is ~draining-queue~.
            1. Let _result_ be NormalCompletion(_value_).
            1. Perform AsyncGeneratorCompleteStep(_generator_, _result_, *true*).
            1. Perform AsyncGeneratorDrainQueue(_generator_).
            1. Return *undefined*.
          1. Let _onFulfilled_ be CreateBuiltinFunction(_fulfilledClosure_, 1, *""*, « »).
          1. Let _rejectedClosure_ be a new Abstract Closure with parameters (_reason_) that captures _generator_ and performs the following steps when called:
            1. Assert: _generator_.[[AsyncGeneratorState]] is ~draining-queue~.
            1. Let _result_ be ThrowCompletion(_reason_).
            1. Perform AsyncGeneratorCompleteStep(_generator_, _result_, *true*).
            1. Perform AsyncGeneratorDrainQueue(_generator_).
            1. Return *undefined*.
          1. Let _onRejected_ be CreateBuiltinFunction(_rejectedClosure_, 1, *""*, « »).
          1. Perform PerformPromiseThen(_promise_, _onFulfilled_, _onRejected_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncgeneratordrainqueue" type="abstract operation">
        <h1>
          AsyncGeneratorDrainQueue (
            _generator_: an AsyncGenerator,
          ): ~unused~
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It drains the generator's AsyncGeneratorQueue until it encounters an AsyncGeneratorRequest which holds a return completion.</dd>
        </dl>
        <emu-alg>
          1. Assert: _generator_.[[AsyncGeneratorState]] is ~draining-queue~.
          1. Let _queue_ be _generator_.[[AsyncGeneratorQueue]].
          1. If _queue_ is empty, then
            1. Set _generator_.[[AsyncGeneratorState]] to ~completed~.
            1. Return ~unused~.
          1. Let _done_ be *false*.
          1. Repeat, while _done_ is *false*,
            1. Let _next_ be the first element of _queue_.
            1. Let _completion_ be Completion(_next_.[[Completion]]).
            1. If _completion_ is a return completion, then
              1. Perform AsyncGeneratorAwaitReturn(_generator_).
              1. Set _done_ to *true*.
            1. Else,
              1. If _completion_ is a normal completion, then
                1. Set _completion_ to NormalCompletion(*undefined*).
              1. Perform AsyncGeneratorCompleteStep(_generator_, _completion_, *true*).
              1. If _queue_ is empty, then
                1. Set _generator_.[[AsyncGeneratorState]] to ~completed~.
                1. Set _done_ to *true*.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createasynciteratorfromclosure" type="abstract operation">
        <h1>
          CreateAsyncIteratorFromClosure (
            _closure_: an Abstract Closure with no parameters,
            _generatorBrand_: a String or ~empty~,
            _generatorPrototype_: an Object,
          ): an AsyncGenerator
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. NOTE: _closure_ can contain uses of the Await operation and uses of the Yield operation to yield an IteratorResult object.
          1. Let _internalSlotsList_ be « [[AsyncGeneratorState]], [[AsyncGeneratorContext]], [[AsyncGeneratorQueue]], [[GeneratorBrand]] ».
          1. Let _generator_ be OrdinaryObjectCreate(_generatorPrototype_, _internalSlotsList_).
          1. Set _generator_.[[GeneratorBrand]] to _generatorBrand_.
          1. Set _generator_.[[AsyncGeneratorState]] to ~suspended-start~.
          1. Let _callerContext_ be the running execution context.
          1. Let _calleeContext_ be a new execution context.
          1. Set the Function of _calleeContext_ to *null*.
          1. Set the Realm of _calleeContext_ to the current Realm Record.
          1. Set the ScriptOrModule of _calleeContext_ to _callerContext_'s ScriptOrModule.
          1. If _callerContext_ is not already suspended, suspend _callerContext_.
          1. Push _calleeContext_ onto the execution context stack; _calleeContext_ is now the running execution context.
          1. Perform AsyncGeneratorStart(_generator_, _closure_).
          1. Remove _calleeContext_ from the execution context stack and restore _callerContext_ as the running execution context.
          1. Return _generator_.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<emu-clause id="sec-async-function-objects">

## AsyncFunction Objects
    <p>AsyncFunctions are functions that are usually created by evaluating |AsyncFunctionDeclaration|s, |AsyncFunctionExpression|s, |AsyncMethod|s, and |AsyncArrowFunction|s. They may also be created by calling the %AsyncFunction% intrinsic.</p>

    <emu-clause id="sec-async-function-constructor">
      <h1>The AsyncFunction Constructor</h1>

      <p>The AsyncFunction constructor:</p>
      <ul>
        <li>is <dfn>%AsyncFunction%</dfn>.</li>
        <li>is a subclass of `Function`.</li>
        <li>creates and initializes a new AsyncFunction when called as a function rather than as a constructor. Thus the function call `AsyncFunction(…)` is equivalent to the object creation expression `new AsyncFunction(…)` with the same arguments.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified AsyncFunction behaviour must include a `super` call to the AsyncFunction constructor to create and initialize a subclass instance with the internal slots necessary for built-in async function behaviour. All ECMAScript syntactic forms for defining async function objects create direct instances of AsyncFunction. There is no syntactic means to create instances of AsyncFunction subclasses.</li>
      </ul>

      <emu-clause id="sec-async-function-constructor-arguments">
        <h1>AsyncFunction ( ..._parameterArgs_, _bodyArg_ )</h1>
        <p>The last argument (if any) specifies the body (executable code) of an async function. Any preceding arguments specify formal parameters.</p>
        <p>This function performs the following steps when called:</p>

        <emu-alg>
          1. Let _C_ be the active function object.
          1. If _bodyArg_ is not present, set _bodyArg_ to the empty String.
          1. Return ? CreateDynamicFunction(_C_, NewTarget, ~async~, _parameterArgs_, _bodyArg_).
        </emu-alg>

        <emu-note>See NOTE for <emu-xref href="#sec-function-p1-p2-pn-body"></emu-xref>.</emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-async-function-constructor-properties">
      <h1>Properties of the AsyncFunction Constructor</h1>

      <p>The AsyncFunction constructor:</p>
      <ul>
        <li>is a standard built-in function object that inherits from the Function constructor.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function%.</li>
        <li oldids="sec-async-function-constructor-length">has a *"length"* property whose value is *1*<sub>𝔽</sub>.</li>
        <li>has a *"name"* property whose value is *"AsyncFunction"*.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-async-function-constructor-prototype">
        <h1>AsyncFunction.prototype</h1>
        <p>The initial value of `AsyncFunction.prototype` is the AsyncFunction prototype object.</p>

        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-async-function-prototype-properties">
      <h1>Properties of the AsyncFunction Prototype Object</h1>
      <p>The <dfn>AsyncFunction prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%AsyncFunction.prototype%</dfn>.</li>
        <li>is an ordinary object.</li>
        <li>is not a function object and does not have an [[ECMAScriptCode]] internal slot or any other of the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
      </ul>

      <emu-clause id="sec-async-function-prototype-properties-constructor">
        <h1>AsyncFunction.prototype.constructor</h1>

        <p>The initial value of `AsyncFunction.prototype.constructor` is %AsyncFunction%.</p>

        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-async-function-prototype-properties-toStringTag" id="sec-async-function-prototype-%symbol.tostringtag%">
        <h1>AsyncFunction.prototype [ %Symbol.toStringTag% ]</h1>

        <p>The initial value of the %Symbol.toStringTag% property is the String value *"AsyncFunction"*.</p>

        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-async-function-instances">
      <h1>AsyncFunction Instances</h1>

      <p>Every AsyncFunction instance is an ECMAScript function object and has the internal slots listed in <emu-xref href="#table-internal-slots-of-ecmascript-function-objects"></emu-xref>. The value of the [[IsClassConstructor]] internal slot for all such instances is *false*. AsyncFunction instances are not constructors and do not have a [[Construct]] internal method. AsyncFunction instances do not have a prototype property as they are not constructable.</p>
      <p>Each AsyncFunction instance has the following own properties:</p>

      <emu-clause id="sec-async-function-instances-length">
        <h1>length</h1>
        <p>The specification for the *"length"* property of Function instances given in <emu-xref href="#sec-function-instances-length"></emu-xref> also applies to AsyncFunction instances.</p>
      </emu-clause>

      <emu-clause id="sec-async-function-instances-name">
        <h1>name</h1>
        <p>The specification for the *"name"* property of Function instances given in <emu-xref href="#sec-function-instances-name"></emu-xref> also applies to AsyncFunction instances.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-async-functions-abstract-operations">
      <h1>Async Functions Abstract Operations</h1>

      <emu-clause id="sec-async-functions-abstract-operations-async-function-start" type="abstract operation">
        <h1>
          AsyncFunctionStart (
            _promiseCapability_: a PromiseCapability Record,
            _asyncFunctionBody_: a |FunctionBody| Parse Node, an |ExpressionBody| Parse Node, or an Abstract Closure with no parameters,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _runningContext_ be the running execution context.
          1. Let _asyncContext_ be a copy of _runningContext_.
          1. NOTE: Copying the execution state is required for AsyncBlockStart to resume its execution. It is ill-defined to resume a currently executing context.
          1. Perform AsyncBlockStart(_promiseCapability_, _asyncFunctionBody_, _asyncContext_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-asyncblockstart" type="abstract operation">
        <h1>
          AsyncBlockStart (
            _promiseCapability_: a PromiseCapability Record,
            _asyncBody_: a Parse Node or an Abstract Closure with no parameters,
            _asyncContext_: an execution context,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _runningContext_ be the running execution context.
          1. Let _closure_ be a new Abstract Closure with no parameters that captures _promiseCapability_ and _asyncBody_ and performs the following steps when called:
            1. Let _acAsyncContext_ be the running execution context.
            1. If _asyncBody_ is a Parse Node, then
              1. Let _result_ be Completion(Evaluation of _asyncBody_).
            1. Else,
              1. Assert: _asyncBody_ is an Abstract Closure with no parameters.
              1. Let _result_ be _asyncBody_().
            1. Assert: If we return here, the async function either threw an exception or performed an implicit or explicit return; all awaiting is done.
            1. Remove _acAsyncContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
            1. If _result_ is a normal completion, then
              1. Perform ! Call(_promiseCapability_.[[Resolve]], *undefined*, « *undefined* »).
            1. Else if _result_ is a return completion, then
              1. Perform ! <emu-meta effects="user-code">Call</emu-meta>(_promiseCapability_.[[Resolve]], *undefined*, « _result_.[[Value]] »).
            1. Else,
              1. Assert: _result_ is a throw completion.
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _result_.[[Value]] »).
            1. [id="step-asyncblockstart-return-undefined"] Return ~unused~.
          1. Set the code evaluation state of _asyncContext_ such that when evaluation is resumed for that execution context, _closure_ will be called with no arguments.
          1. Push _asyncContext_ onto the execution context stack; _asyncContext_ is now the running execution context.
          1. <emu-meta effects="user-code">Resume the suspended evaluation of _asyncContext_</emu-meta>. Let _result_ be the value returned by the resumed computation.
          1. Assert: When we return here, _asyncContext_ has already been removed from the execution context stack and _runningContext_ is the currently running execution context.
          1. Assert: _result_ is a normal completion with a value of ~unused~. The possible sources of this value are Await or, if the async function doesn't await anything, step <emu-xref href="#step-asyncblockstart-return-undefined"></emu-xref> above.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="await" oldids="await-fulfilled,await-rejected" type="abstract operation">
        <h1>
          Await (
            _value_: an ECMAScript language value,
          ): either a normal completion containing either an ECMAScript language value or ~empty~, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _asyncContext_ be the running execution context.
          1. Let _promise_ be ? PromiseResolve(%Promise%, _value_).
          1. Let _fulfilledClosure_ be a new Abstract Closure with parameters (_v_) that captures _asyncContext_ and performs the following steps when called:
            1. Let _prevContext_ be the running execution context.
            1. Suspend _prevContext_.
            1. Push _asyncContext_ onto the execution context stack; _asyncContext_ is now the running execution context.
            1. <emu-meta effects="user-code">Resume the suspended evaluation of _asyncContext_</emu-meta> using NormalCompletion(_v_) as the result of the operation that suspended it.
            1. Assert: When we reach this step, _asyncContext_ has already been removed from the execution context stack and _prevContext_ is the currently running execution context.
            1. Return *undefined*.
          1. Let _onFulfilled_ be CreateBuiltinFunction(_fulfilledClosure_, 1, *""*, « »).
          1. Let _rejectedClosure_ be a new Abstract Closure with parameters (_reason_) that captures _asyncContext_ and performs the following steps when called:
            1. Let _prevContext_ be the running execution context.
            1. Suspend _prevContext_.
            1. Push _asyncContext_ onto the execution context stack; _asyncContext_ is now the running execution context.
            1. <emu-meta effects="user-code">Resume the suspended evaluation of _asyncContext_</emu-meta> using ThrowCompletion(_reason_) as the result of the operation that suspended it.
            1. Assert: When we reach this step, _asyncContext_ has already been removed from the execution context stack and _prevContext_ is the currently running execution context.
            1. Return *undefined*.
          1. Let _onRejected_ be CreateBuiltinFunction(_rejectedClosure_, 1, *""*, « »).
          1. Perform PerformPromiseThen(_promise_, _onFulfilled_, _onRejected_).
          1. Remove _asyncContext_ from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
          1. Let _callerContext_ be the running execution context.
          1. Resume _callerContext_ passing ~empty~. If _asyncContext_ is ever resumed again, let _completion_ be the Completion Record with which it is resumed.
          1. Assert: If control reaches here, then _asyncContext_ is the running execution context again.
          1. Return _completion_.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

<h1 id="sec-reflection"></h1>
