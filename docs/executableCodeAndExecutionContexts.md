# Executable Code and Execution Contexts

  <emu-clause id="sec-environment-records" oldids="sec-lexical-environments">
    <h1>Environment Records</h1>
    <p><dfn variants="Environment Records">Environment Record</dfn> is a specification type used to define the association of |Identifier|s to specific variables and functions, based upon the lexical nesting structure of ECMAScript code. Usually an Environment Record is associated with some specific syntactic structure of ECMAScript code such as a |FunctionDeclaration|, a |BlockStatement|, or a |Catch| clause of a |TryStatement|. Each time such code is evaluated, a new Environment Record is created to record the identifier bindings that are created by that code.</p>
    <p>Every Environment Record has an [[OuterEnv]] field, which is either *null* or a reference to an outer Environment Record. This is used to model the logical nesting of Environment Record values. The outer reference of an (inner) Environment Record is a reference to the Environment Record that logically surrounds the inner Environment Record. An outer Environment Record may, of course, have its own outer Environment Record. An Environment Record may serve as the outer environment for multiple inner Environment Records. For example, if a |FunctionDeclaration| contains two nested |FunctionDeclaration|s then the Environment Records of each of the nested functions will have as their outer Environment Record the Environment Record of the current evaluation of the surrounding function.</p>
    <p>Environment Records are purely specification mechanisms and need not correspond to any specific artefact of an ECMAScript implementation. It is impossible for an ECMAScript program to directly access or manipulate such values.</p>

    <emu-clause id="sec-the-environment-record-type-hierarchy">
      <h1>The Environment Record Type Hierarchy</h1>
      <p>Environment Records can be thought of as existing in a simple object-oriented hierarchy where Environment Record is an abstract class with three concrete subclasses: Declarative Environment Record, Object Environment Record, and Global Environment Record. Function Environment Records and Module Environment Records are subclasses of Declarative Environment Record.</p>
      <ul>
        <li>
          <p>Environment Record (abstract)</p>
          <ul>
            <li>
              <p>A <em>Declarative Environment Record</em> is used to define the effect of ECMAScript language syntactic elements such as |FunctionDeclaration|s, |VariableDeclaration|s, and |Catch| clauses that directly associate identifier bindings with ECMAScript language values.</p>
              <ul>
                <li>
                  <p>A <em>Function Environment Record</em> corresponds to the invocation of an ECMAScript function object, and contains bindings for the top-level declarations within that function. It may establish a new `this` binding. It also captures the state necessary to support `super` method invocations.</p>
                </li>
                <li>
                  <p>A <em>Module Environment Record</em> contains the bindings for the top-level declarations of a |Module|. It also contains the bindings that are explicitly imported by the |Module|. Its [[OuterEnv]] is a Global Environment Record.</p>
                </li>
              </ul>
            </li>
            <li>
              <p>An <em>Object Environment Record</em> is used to define the effect of ECMAScript elements such as |WithStatement| that associate identifier bindings with the properties of some object.</p>
            </li>
            <li>
              <p>A <em>Global Environment Record</em> is used for |Script| global declarations. It does not have an outer environment; its [[OuterEnv]] is *null*. It may be prepopulated with identifier bindings and it includes an associated global object whose properties provide some of the global environment's identifier bindings. As ECMAScript code is executed, additional properties may be added to the global object and the initial properties may be modified.</p>
            </li>
          </ul>
        </li>
      </ul>

      <p>The Environment Record abstract class includes the abstract specification methods defined in <emu-xref href="#table-abstract-methods-of-environment-records"></emu-xref>. These abstract methods have distinct concrete algorithms for each of the concrete subclasses.</p>
      <emu-table id="table-abstract-methods-of-environment-records" caption="Abstract Methods of Environment Records" oldids="table-15">
        <table>
          <thead>
            <tr>
              <th>
                Method
              </th>
              <th>
                Purpose
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              HasBinding(N)
            </td>
            <td>
              Determine if an Environment Record has a binding for the String value _N_. Return *true* if it does and *false* if it does not.
            </td>
          </tr>
          <tr>
            <td>
              CreateMutableBinding(N, D)
            </td>
            <td>
              Create a new but uninitialized mutable binding in an Environment Record. The String value _N_ is the text of the bound name. If the Boolean argument _D_ is *true* the binding may be subsequently deleted.
            </td>
          </tr>
          <tr>
            <td>
              CreateImmutableBinding(N, S)
            </td>
            <td>
              Create a new but uninitialized immutable binding in an Environment Record. The String value _N_ is the text of the bound name. If _S_ is *true* then attempts to set it after it has been initialized will always throw an exception, regardless of the strict mode setting of operations that reference that binding.
            </td>
          </tr>
          <tr>
            <td>
              InitializeBinding(N, V)
            </td>
            <td>
              Set the value of an already existing but uninitialized binding in an Environment Record. The String value _N_ is the text of the bound name. _V_ is the value for the binding and is a value of any ECMAScript language type.
            </td>
          </tr>
          <tr>
            <td>
              SetMutableBinding(N, V, S)
            </td>
            <td>
              Set the value of an already existing mutable binding in an Environment Record. The String value _N_ is the text of the bound name. _V_ is the value for the binding and may be a value of any ECMAScript language type. _S_ is a Boolean flag. If _S_ is *true* and the binding cannot be set throw a *TypeError* exception.
            </td>
          </tr>
          <tr>
            <td>
              GetBindingValue(N, S)
            </td>
            <td>
              Returns the value of an already existing binding from an Environment Record. The String value _N_ is the text of the bound name. _S_ is used to identify references originating in strict mode code or that otherwise require strict mode reference semantics. If _S_ is *true* and the binding does not exist throw a *ReferenceError* exception. If the binding exists but is uninitialized a *ReferenceError* is thrown, regardless of the value of _S_.
            </td>
          </tr>
          <tr>
            <td>
              DeleteBinding(N)
            </td>
            <td>
              Delete a binding from an Environment Record. The String value _N_ is the text of the bound name. If a binding for _N_ exists, remove the binding and return *true*. If the binding exists but cannot be removed return *false*. If the binding does not exist return *true*.
            </td>
          </tr>
          <tr>
            <td>
              HasThisBinding()
            </td>
            <td>
              Determine if an Environment Record establishes a `this` binding. Return *true* if it does and *false* if it does not.
            </td>
          </tr>
          <tr>
            <td>
              HasSuperBinding()
            </td>
            <td>
              Determine if an Environment Record establishes a `super` method binding. Return *true* if it does and *false* if it does not.
            </td>
          </tr>
          <tr>
            <td>
              WithBaseObject()
            </td>
            <td>
              If this Environment Record is associated with a `with` statement, return the with object. Otherwise, return *undefined*.
            </td>
          </tr>
        </table>
      </emu-table>

      <emu-clause id="sec-declarative-environment-records">
        <h1>Declarative Environment Records</h1>
        <p>Each <dfn variants="Declarative Environment Records">Declarative Environment Record</dfn> is associated with an ECMAScript program scope containing variable, constant, let, class, module, import, and/or function declarations. A Declarative Environment Record binds the set of identifiers defined by the declarations contained within its scope.</p>
        <p>The behaviour of the concrete specification methods for Declarative Environment Records is defined by the following algorithms.</p>

        <emu-clause id="sec-declarative-environment-records-hasbinding-n" type="concrete method">
          <h1>
            HasBinding (
              _N_: a String,
            ): a normal completion containing a Boolean
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if the argument identifier is one of the identifiers bound by the record.</dd>
          </dl>
          <emu-alg>
            1. If _envRec_ has a binding for _N_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-createmutablebinding-n-d" type="concrete method">
          <h1>
            CreateMutableBinding (
              _N_: a String,
              _D_: a Boolean,
            ): a normal completion containing ~unused~
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates a new mutable binding for the name _N_ that is uninitialized. A binding must not already exist in this Environment Record for _N_. If _D_ is *true*, the new binding is marked as being subject to deletion.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ does not already have a binding for _N_.
            1. Create a mutable binding in _envRec_ for _N_ and record that it is uninitialized. If _D_ is *true*, record that the newly created binding may be deleted by a subsequent DeleteBinding call.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-createimmutablebinding-n-s" type="concrete method">
          <h1>
            CreateImmutableBinding (
              _N_: a String,
              _S_: a Boolean,
            ): a normal completion containing ~unused~
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates a new immutable binding for the name _N_ that is uninitialized. A binding must not already exist in this Environment Record for _N_. If _S_ is *true*, the new binding is marked as a strict binding.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ does not already have a binding for _N_.
            1. Create an immutable binding in _envRec_ for _N_ and record that it is uninitialized. If _S_ is *true*, record that the newly created binding is a strict binding.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-initializebinding-n-v" type="concrete method">
          <h1>
            InitializeBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
            ): a normal completion containing ~unused~
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It is used to set the bound value of the current binding of the identifier whose name is _N_ to the value _V_. An uninitialized binding for _N_ must already exist.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ must have an uninitialized binding for _N_.
            1. Set the bound value for _N_ in _envRec_ to _V_.
            1. <emu-not-ref>Record</emu-not-ref> that the binding for _N_ in _envRec_ has been initialized.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-setmutablebinding-n-v-s" type="concrete method">
          <h1>
            SetMutableBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
              _S_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It attempts to change the bound value of the current binding of the identifier whose name is _N_ to the value _V_. A binding for _N_ normally already exists, but in rare cases it may not. If the binding is an immutable binding, a *TypeError* is thrown if _S_ is *true*.</dd>
          </dl>
          <emu-alg>
            1. [id="step-setmutablebinding-missing-binding"] If _envRec_ does not have a binding for _N_, then
              1. If _S_ is *true*, throw a *ReferenceError* exception.
              1. Perform ! _envRec_.CreateMutableBinding(_N_, *true*).
              1. Perform ! _envRec_.InitializeBinding(_N_, _V_).
              1. Return ~unused~.
            1. If the binding for _N_ in _envRec_ is a strict binding, set _S_ to *true*.
            1. If the binding for _N_ in _envRec_ has not yet been initialized, then
              1. Throw a *ReferenceError* exception.
            1. Else if the binding for _N_ in _envRec_ is a mutable binding, then
              1. Change its bound value to _V_.
            1. Else,
              1. Assert: This is an attempt to change the value of an immutable binding.
              1. If _S_ is *true*, throw a *TypeError* exception.
            1. Return ~unused~.
          </emu-alg>
          <emu-note>
            <p>An example of ECMAScript code that results in a missing binding at step <emu-xref href="#step-setmutablebinding-missing-binding"></emu-xref> is:</p>
            <pre><code class="javascript">function f() { eval("var x; x = (delete x, 0);"); }</code></pre>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-getbindingvalue-n-s" type="concrete method">
          <h1>
            GetBindingValue (
              _N_: a String,
              _S_: a Boolean,
            ): either a normal completion containing an ECMAScript language value or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It returns the value of its bound identifier whose name is _N_. If the binding exists but is uninitialized a *ReferenceError* is thrown, regardless of the value of _S_.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ has a binding for _N_.
            1. If the binding for _N_ in _envRec_ is an uninitialized binding, throw a *ReferenceError* exception.
            1. Return the value currently bound to _N_ in _envRec_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-deletebinding-n" type="concrete method">
          <h1>
            DeleteBinding (
              _N_: a String,
            ): a normal completion containing a Boolean
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It can only delete bindings that have been explicitly designated as being subject to deletion.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ has a binding for _N_.
            1. If the binding for _N_ in _envRec_ cannot be deleted, return *false*.
            1. Remove the binding for _N_ from _envRec_.
            1. Return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-hasthisbinding" type="concrete method">
          <h1>HasThisBinding ( ): *false*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *false*.
          </emu-alg>
          <emu-note>
            <p>A regular Declarative Environment Record (i.e., one that is neither a Function Environment Record nor a Module Environment Record) does not provide a `this` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-hassuperbinding" type="concrete method">
          <h1>HasSuperBinding ( ): *false*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *false*.
          </emu-alg>
          <emu-note>
            <p>A regular Declarative Environment Record (i.e., one that is neither a Function Environment Record nor a Module Environment Record) does not provide a `super` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-declarative-environment-records-withbaseobject" type="concrete method">
          <h1>WithBaseObject ( ): *undefined*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Declarative Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-object-environment-records">
        <h1>Object Environment Records</h1>
        <p>Each <dfn variants="Object Environment Records">Object Environment Record</dfn> is associated with an object called its <em>binding object</em>. An Object Environment Record binds the set of string identifier names that directly correspond to the property names of its binding object. Property keys that are not strings in the form of an |IdentifierName| are not included in the set of bound identifiers. Both own and inherited properties are included in the set regardless of the setting of their [[Enumerable]] attribute. Because properties can be dynamically added and deleted from objects, the set of identifiers bound by an Object Environment Record may potentially change as a side-effect of any operation that adds or deletes properties. Any bindings that are created as a result of such a side-effect are considered to be a mutable binding even if the Writable attribute of the corresponding property is *false*. Immutable bindings do not exist for Object Environment Records.</p>
        <p>Object Environment Records created for `with` statements (<emu-xref href="#sec-with-statement"></emu-xref>) can provide their binding object as an implicit *this* value for use in function calls. The capability is controlled by a Boolean [[IsWithEnvironment]] field.</p>
        <p>Object Environment Records have the additional state fields listed in <emu-xref href="#table-additional-fields-of-object-environment-records"></emu-xref>.</p>
        <emu-table id="table-additional-fields-of-object-environment-records" caption="Additional Fields of Object Environment Records">
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
                [[BindingObject]]
              </td>
              <td>
                an Object
              </td>
              <td>
                The binding object of this Environment Record.
              </td>
            </tr>
            <tr>
              <td>
                [[IsWithEnvironment]]
              </td>
              <td>
                a Boolean
              </td>
              <td>
                Indicates whether this Environment Record is created for a `with` statement.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>The behaviour of the concrete specification methods for Object Environment Records is defined by the following algorithms.</p>

        <emu-clause id="sec-object-environment-records-hasbinding-n" type="concrete method">
          <h1>
            HasBinding (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if its associated binding object has a property whose name is _N_.</dd>
          </dl>
          <emu-alg>
            1. Let _bindingObject_ be _envRec_.[[BindingObject]].
            1. Let _foundBinding_ be ? HasProperty(_bindingObject_, _N_).
            1. If _foundBinding_ is *false*, return *false*.
            1. If _envRec_.[[IsWithEnvironment]] is *false*, return *true*.
            1. Let _unscopables_ be ? Get(_bindingObject_, %Symbol.unscopables%).
            1. If _unscopables_ is an Object, then
              1. Let _blocked_ be ToBoolean(? Get(_unscopables_, _N_)).
              1. If _blocked_ is *true*, return *false*.
            1. Return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-createmutablebinding-n-d" type="concrete method">
          <h1>
            CreateMutableBinding (
              _N_: a String,
              _D_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates in an Environment Record's associated binding object a property whose name is _N_ and initializes it to the value *undefined*. If _D_ is *true*, the new property's [[Configurable]] attribute is set to *true*; otherwise it is set to *false*.</dd>
          </dl>
          <emu-alg>
            1. Let _bindingObject_ be _envRec_.[[BindingObject]].
            1. Perform ? DefinePropertyOrThrow(_bindingObject_, _N_, PropertyDescriptor { [[Value]]: *undefined*, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: _D_ }).
            1. Return ~unused~.
          </emu-alg>
          <emu-note>
            <p>Normally _envRec_ will not have a binding for _N_ but if it does, the semantics of DefinePropertyOrThrow may result in an existing binding being replaced or shadowed or cause an abrupt completion to be returned.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-createimmutablebinding-n-s">
          <h1>CreateImmutableBinding ( _N_, _S_ )</h1>
          <p>The CreateImmutableBinding concrete method of an Object Environment Record is never used within this specification.</p>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-initializebinding-n-v" type="concrete method">
          <h1>
            InitializeBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It is used to set the bound value of the current binding of the identifier whose name is _N_ to the value _V_.</dd>
          </dl>
          <emu-alg>
            1. Perform ? <emu-meta effects="user-code">_envRec_.SetMutableBinding</emu-meta>(_N_, _V_, *false*).
            1. Return ~unused~.
          </emu-alg>
          <emu-note>
            <p>In this specification, all uses of CreateMutableBinding for Object Environment Records are immediately followed by a call to InitializeBinding for the same name. Hence, this specification does not explicitly track the initialization state of bindings in Object Environment Records.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-setmutablebinding-n-v-s" type="concrete method">
          <h1>
            SetMutableBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
              _S_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It attempts to set the value of the Environment Record's associated binding object's property whose name is _N_ to the value _V_. A property named _N_ normally already exists but if it does not or is not currently writable, error handling is determined by _S_.</dd>
          </dl>
          <emu-alg>
            1. Let _bindingObject_ be _envRec_.[[BindingObject]].
            1. Let _stillExists_ be ? HasProperty(_bindingObject_, _N_).
            1. If _stillExists_ is *false* and _S_ is *true*, throw a *ReferenceError* exception.
            1. Perform ? Set(_bindingObject_, _N_, _V_, _S_).
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-getbindingvalue-n-s" type="concrete method">
          <h1>
            GetBindingValue (
              _N_: a String,
              _S_: a Boolean,
            ): either a normal completion containing an ECMAScript language value or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It returns the value of its associated binding object's property whose name is _N_. The property should already exist but if it does not the result depends upon _S_.</dd>
          </dl>
          <emu-alg>
            1. Let _bindingObject_ be _envRec_.[[BindingObject]].
            1. Let _value_ be ? HasProperty(_bindingObject_, _N_).
            1. If _value_ is *false*, then
              1. If _S_ is *false*, return *undefined*; otherwise throw a *ReferenceError* exception.
            1. Return ? Get(_bindingObject_, _N_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-deletebinding-n" type="concrete method">
          <h1>
            DeleteBinding (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It can only delete bindings that correspond to properties of the environment object whose [[Configurable]] attribute have the value *true*.</dd>
          </dl>
          <emu-alg>
            1. Let _bindingObject_ be _envRec_.[[BindingObject]].
            1. Return ? <emu-meta effects="user-code">_bindingObject_.[[Delete]]</emu-meta>(_N_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-hasthisbinding" type="concrete method">
          <h1>HasThisBinding ( ): *false*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *false*.
          </emu-alg>
          <emu-note>
            <p>Object Environment Records do not provide a `this` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-hassuperbinding" type="concrete method">
          <h1>HasSuperBinding ( ): *false*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *false*.
          </emu-alg>
          <emu-note>
            <p>Object Environment Records do not provide a `super` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-object-environment-records-withbaseobject" type="concrete method">
          <h1>WithBaseObject ( ): an Object or *undefined*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>an Object Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. If _envRec_.[[IsWithEnvironment]] is *true*, return _envRec_.[[BindingObject]].
            1. Otherwise, return *undefined*.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-function-environment-records" oldids="function-environment">
        <h1>Function Environment Records</h1>
        <p>A <dfn variants="Function Environment Records">Function Environment Record</dfn> is a Declarative Environment Record that is used to represent the top-level scope of a function and, if the function is not an |ArrowFunction|, provides a `this` binding. If a function is not an |ArrowFunction| function and references `super`, its Function Environment Record also contains the state that is used to perform `super` method invocations from within the function.</p>
        <p>Function Environment Records have the additional state fields listed in <emu-xref href="#table-additional-fields-of-function-environment-records"></emu-xref>.</p>
        <emu-table id="table-additional-fields-of-function-environment-records" caption="Additional Fields of Function Environment Records" oldids="table-16">
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
                [[ThisValue]]
              </td>
              <td>
                an ECMAScript language value
              </td>
              <td>
                This is the *this* value used for this invocation of the function.
              </td>
            </tr>
            <tr>
              <td>
                [[ThisBindingStatus]]
              </td>
              <td>
                ~lexical~, ~initialized~, or ~uninitialized~
              </td>
              <td>
                If the value is ~lexical~, this is an |ArrowFunction| and does not have a local *this* value.
              </td>
            </tr>
            <tr>
              <td>
                [[FunctionObject]]
              </td>
              <td>
                an ECMAScript function object
              </td>
              <td>
                The function object whose invocation caused this Environment Record to be created.
              </td>
            </tr>
            <tr>
              <td>
                [[NewTarget]]
              </td>
              <td>
                an Object or *undefined*
              </td>
              <td>
                If this Environment Record was created by the [[Construct]] internal method, [[NewTarget]] is the value of the [[Construct]] _newTarget_ parameter. Otherwise, its value is *undefined*.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>Function Environment Records support all of the Declarative Environment Record methods listed in <emu-xref href="#table-abstract-methods-of-environment-records"></emu-xref> and share the same specifications for all of those methods except for HasThisBinding and HasSuperBinding. In addition, Function Environment Records support the methods listed in <emu-xref href="#table-additional-methods-of-function-environment-records"></emu-xref>:</p>
        <emu-table id="table-additional-methods-of-function-environment-records" caption="Additional Methods of Function Environment Records" oldids="table-17">
          <table>
            <thead>
              <tr>
                <th>
                  Method
                </th>
                <th>
                  Purpose
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                BindThisValue(V)
              </td>
              <td>
                Set the [[ThisValue]] and record that it has been initialized.
              </td>
            </tr>
            <tr>
              <td>
                GetThisBinding()
              </td>
              <td>
                Return the value of this Environment Record's `this` binding. Throws a *ReferenceError* if the `this` binding has not been initialized.
              </td>
            </tr>
            <tr>
              <td>
                GetSuperBase()
              </td>
              <td>
                Return the object that is the base for `super` property accesses bound in this Environment Record. The value *undefined* indicates that such accesses will produce runtime errors.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>The behaviour of the additional concrete specification methods for Function Environment Records is defined by the following algorithms:</p>

        <emu-clause id="sec-bindthisvalue" type="concrete method">
          <h1>
            BindThisValue (
              _V_: an ECMAScript language value,
            ): either a normal completion containing an ECMAScript language value or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Function Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_.[[ThisBindingStatus]] is not ~lexical~.
            1. If _envRec_.[[ThisBindingStatus]] is ~initialized~, throw a *ReferenceError* exception.
            1. Set _envRec_.[[ThisValue]] to _V_.
            1. Set _envRec_.[[ThisBindingStatus]] to ~initialized~.
            1. Return _V_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-function-environment-records-hasthisbinding" type="concrete method">
          <h1>HasThisBinding ( ): a Boolean</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Function Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. If _envRec_.[[ThisBindingStatus]] is ~lexical~, return *false*; otherwise, return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-function-environment-records-hassuperbinding" type="concrete method">
          <h1>HasSuperBinding ( ): a Boolean</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Function Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. If _envRec_.[[ThisBindingStatus]] is ~lexical~, return *false*.
            1. If _envRec_.[[FunctionObject]].[[HomeObject]] is *undefined*, return *false*; otherwise, return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-function-environment-records-getthisbinding" type="concrete method">
          <h1>GetThisBinding ( ): either a normal completion containing an ECMAScript language value or a throw completion</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Function Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_.[[ThisBindingStatus]] is not ~lexical~.
            1. If _envRec_.[[ThisBindingStatus]] is ~uninitialized~, throw a *ReferenceError* exception.
            1. Return _envRec_.[[ThisValue]].
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-getsuperbase" type="concrete method">
          <h1>GetSuperBase ( ): an Object, *null*, or *undefined*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Function Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Let _home_ be _envRec_.[[FunctionObject]].[[HomeObject]].
            1. If _home_ is *undefined*, return *undefined*.
            1. Assert: _home_ is an ordinary object.
            1. Return ! _home_.[[GetPrototypeOf]]().
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-global-environment-records" oldids="global-environment">
        <h1>Global Environment Records</h1>
        <p>A <dfn variants="Global Environment Records">Global Environment Record</dfn> is used to represent the outer most scope that is shared by all of the ECMAScript |Script| elements that are processed in a common realm. A Global Environment Record provides the bindings for built-in globals (clause <emu-xref href="#sec-global-object"></emu-xref>), properties of the global object, and for all top-level declarations (<emu-xref href="#sec-static-semantics-toplevellexicallyscopeddeclarations"></emu-xref>, <emu-xref href="#sec-static-semantics-toplevelvarscopeddeclarations"></emu-xref>) that occur within a |Script|.</p>
        <p>A Global Environment Record is logically a single record but it is specified as a composite encapsulating an Object Environment Record and a Declarative Environment Record. The Object Environment Record has as its base object the global object of the associated Realm Record. This global object is the value returned by the Global Environment Record's GetThisBinding concrete method. The Object Environment Record component of a Global Environment Record contains the bindings for all built-in globals (clause <emu-xref href="#sec-global-object"></emu-xref>) and all bindings introduced by a |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, |AsyncGeneratorDeclaration|, or |VariableStatement| contained in global code. The bindings for all other ECMAScript declarations in global code are contained in the Declarative Environment Record component of the Global Environment Record.</p>
        <p>Properties may be created directly on a global object. Hence, the Object Environment Record component of a Global Environment Record may contain both bindings created explicitly by |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, |AsyncGeneratorDeclaration|, or |VariableDeclaration| declarations and bindings created implicitly as properties of the global object. In order to identify which bindings were explicitly created using declarations, a Global Environment Record maintains a list of the names bound using its CreateGlobalVarBinding and CreateGlobalFunctionBinding concrete methods.</p>
        <p>Global Environment Records have the additional fields listed in <emu-xref href="#table-additional-fields-of-global-environment-records"></emu-xref> and the additional methods listed in <emu-xref href="#table-additional-methods-of-global-environment-records"></emu-xref>.</p>
        <emu-table id="table-additional-fields-of-global-environment-records" caption="Additional Fields of Global Environment Records" oldids="table-18">
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
                [[ObjectRecord]]
              </td>
              <td>
                an Object Environment Record
              </td>
              <td>
                Binding object is the global object. It contains global built-in bindings as well as |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, |AsyncGeneratorDeclaration|, and |VariableDeclaration| bindings in global code for the associated realm.
              </td>
            </tr>
            <tr>
              <td>
                [[GlobalThisValue]]
              </td>
              <td>
                an Object
              </td>
              <td>
                The value returned by `this` in global scope. Hosts may provide any ECMAScript Object value.
              </td>
            </tr>
            <tr>
              <td>
                [[DeclarativeRecord]]
              </td>
              <td>
                a Declarative Environment Record
              </td>
              <td>
                <emu-not-ref>Contains</emu-not-ref> bindings for all declarations in global code for the associated realm code except for |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, |AsyncGeneratorDeclaration|, and |VariableDeclaration| bindings.
              </td>
            </tr>
            <tr>
              <td>
                [[VarNames]]
              </td>
              <td>
                a List of Strings
              </td>
              <td>
                The string names bound by |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, |AsyncGeneratorDeclaration|, and |VariableDeclaration| declarations in global code for the associated realm.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-table id="table-additional-methods-of-global-environment-records" caption="Additional Methods of Global Environment Records" oldids="table-19">
          <table>
            <thead>
              <tr>
                <th>
                  Method
                </th>
                <th>
                  Purpose
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                GetThisBinding()
              </td>
              <td>
                Return the value of this Environment Record's `this` binding.
              </td>
            </tr>
            <tr>
              <td>
                HasVarDeclaration (N)
              </td>
              <td>
                Determines if the argument identifier has a binding in this Environment Record that was created using a |VariableDeclaration|, |FunctionDeclaration|, |GeneratorDeclaration|, |AsyncFunctionDeclaration|, or |AsyncGeneratorDeclaration|.
              </td>
            </tr>
            <tr>
              <td>
                HasLexicalDeclaration (N)
              </td>
              <td>
                Determines if the argument identifier has a binding in this Environment Record that was created using a lexical declaration such as a |LexicalDeclaration| or a |ClassDeclaration|.
              </td>
            </tr>
            <tr>
              <td>
                HasRestrictedGlobalProperty (N)
              </td>
              <td>
                Determines if the argument is the name of a global object property that may not be shadowed by a global lexical binding.
              </td>
            </tr>
            <tr>
              <td>
                CanDeclareGlobalVar (N)
              </td>
              <td>
                Determines if a corresponding CreateGlobalVarBinding call would succeed if called for the same argument _N_.
              </td>
            </tr>
            <tr>
              <td>
                CanDeclareGlobalFunction (N)
              </td>
              <td>
                Determines if a corresponding CreateGlobalFunctionBinding call would succeed if called for the same argument _N_.
              </td>
            </tr>
            <tr>
              <td>
                CreateGlobalVarBinding(N, D)
              </td>
              <td>
                Used to create and initialize to *undefined* a global `var` binding in the [[ObjectRecord]] component of a Global Environment Record. The binding will be a mutable binding. The corresponding global object property will have attribute values appropriate for a `var`. The String value _N_ is the bound name. If _D_ is *true*, the binding may be deleted. Logically equivalent to CreateMutableBinding followed by a SetMutableBinding but it allows var declarations to receive special treatment.
              </td>
            </tr>
            <tr>
              <td>
                CreateGlobalFunctionBinding(N, V, D)
              </td>
              <td>
                Create and initialize a global `function` binding in the [[ObjectRecord]] component of a Global Environment Record. The binding will be a mutable binding. The corresponding global object property will have attribute values appropriate for a `function`. The String value _N_ is the bound name. _V_ is the initialization value. If the Boolean argument _D_ is *true*, the binding may be deleted. Logically equivalent to CreateMutableBinding followed by a SetMutableBinding but it allows function declarations to receive special treatment.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>The behaviour of the concrete specification methods for Global Environment Records is defined by the following algorithms.</p>

        <emu-clause id="sec-global-environment-records-hasbinding-n" type="concrete method">
          <h1>
            HasBinding (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if the argument identifier is one of the identifiers bound by the record.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, return *true*.
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Return ? <emu-meta effects="user-code">_ObjRec_.HasBinding</emu-meta>(_N_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-createmutablebinding-n-d" type="concrete method">
          <h1>
            CreateMutableBinding (
              _N_: a String,
              _D_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates a new mutable binding for the name _N_ that is uninitialized. The binding is created in the associated DeclarativeRecord. A binding for _N_ must not already exist in the DeclarativeRecord. If _D_ is *true*, the new binding is marked as being subject to deletion.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, throw a *TypeError* exception.
            1. Return ! _DclRec_.CreateMutableBinding(_N_, _D_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-createimmutablebinding-n-s" type="concrete method">
          <h1>
            CreateImmutableBinding (
              _N_: a String,
              _S_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates a new immutable binding for the name _N_ that is uninitialized. A binding must not already exist in this Environment Record for _N_. If _S_ is *true*, the new binding is marked as a strict binding.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, throw a *TypeError* exception.
            1. Return ! _DclRec_.CreateImmutableBinding(_N_, _S_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-initializebinding-n-v" type="concrete method">
          <h1>
            InitializeBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It is used to set the bound value of the current binding of the identifier whose name is _N_ to the value _V_. An uninitialized binding for _N_ must already exist.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, then
              1. Return ! _DclRec_.InitializeBinding(_N_, _V_).
            1. Assert: If the binding exists, it must be in the Object Environment Record.
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Return ? <emu-meta effects="user-code">_ObjRec_.InitializeBinding</emu-meta>(_N_, _V_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-setmutablebinding-n-v-s" type="concrete method">
          <h1>
            SetMutableBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
              _S_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It attempts to change the bound value of the current binding of the identifier whose name is _N_ to the value _V_. If the binding is an immutable binding and _S_ is *true*, a *TypeError* is thrown. A property named _N_ normally already exists but if it does not or is not currently writable, error handling is determined by _S_.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, then
              1. Return ? _DclRec_.SetMutableBinding(_N_, _V_, _S_).
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Return ? <emu-meta effects="user-code">_ObjRec_.SetMutableBinding</emu-meta>(_N_, _V_, _S_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-getbindingvalue-n-s" type="concrete method">
          <h1>
            GetBindingValue (
              _N_: a String,
              _S_: a Boolean,
            ): either a normal completion containing an ECMAScript language value or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It returns the value of its bound identifier whose name is _N_. If the binding is an uninitialized binding throw a *ReferenceError* exception. A property named _N_ normally already exists but if it does not or is not currently writable, error handling is determined by _S_.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, then
              1. Return ? _DclRec_.GetBindingValue(_N_, _S_).
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Return ? <emu-meta effects="user-code">_ObjRec_.GetBindingValue</emu-meta>(_N_, _S_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-deletebinding-n" type="concrete method">
          <h1>
            DeleteBinding (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It can only delete bindings that have been explicitly designated as being subject to deletion.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. If ! _DclRec_.HasBinding(_N_) is *true*, then
              1. Return ! _DclRec_.DeleteBinding(_N_).
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _existingProp_ be ? HasOwnProperty(_globalObject_, _N_).
            1. If _existingProp_ is *true*, then
              1. Let _status_ be ? <emu-meta effects="user-code">_ObjRec_.DeleteBinding</emu-meta>(_N_).
              1. If _status_ is *true* and _envRec_.[[VarNames]] contains _N_, then
                1. Remove _N_ from _envRec_.[[VarNames]].
              1. Return _status_.
            1. Return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-hasthisbinding" type="concrete method">
          <h1>HasThisBinding ( ): *true*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *true*.
          </emu-alg>
          <emu-note>
            <p>Global Environment Records always provide a `this` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-hassuperbinding" type="concrete method">
          <h1>HasSuperBinding ( ): *false*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *false*.
          </emu-alg>
          <emu-note>
            <p>Global Environment Records do not provide a `super` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-withbaseobject" type="concrete method">
          <h1>WithBaseObject ( ): *undefined*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-global-environment-records-getthisbinding" type="concrete method">
          <h1>GetThisBinding ( ): a normal completion containing an Object</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return _envRec_.[[GlobalThisValue]].
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-hasvardeclaration" type="concrete method">
          <h1>
            HasVarDeclaration (
              _N_: a String,
            ): a Boolean
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if the argument identifier has a binding in this record that was created using a |VariableStatement| or a |FunctionDeclaration|.</dd>
          </dl>
          <emu-alg>
            1. Let _varDeclaredNames_ be _envRec_.[[VarNames]].
            1. If _varDeclaredNames_ contains _N_, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-haslexicaldeclaration" type="concrete method">
          <h1>
            HasLexicalDeclaration (
              _N_: a String,
            ): a Boolean
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if the argument identifier has a binding in this record that was created using a lexical declaration such as a |LexicalDeclaration| or a |ClassDeclaration|.</dd>
          </dl>
          <emu-alg>
            1. Let _DclRec_ be _envRec_.[[DeclarativeRecord]].
            1. Return ! _DclRec_.HasBinding(_N_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-hasrestrictedglobalproperty" type="concrete method">
          <h1>
            HasRestrictedGlobalProperty (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if the argument identifier is the name of a property of the global object that must not be shadowed by a global lexical binding.</dd>
          </dl>
          <emu-alg>
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _existingProp_ be ? <emu-meta effects="user-code">_globalObject_.[[GetOwnProperty]]</emu-meta>(_N_).
            1. If _existingProp_ is *undefined*, return *false*.
            1. If _existingProp_.[[Configurable]] is *true*, return *false*.
            1. Return *true*.
          </emu-alg>
          <emu-note>
            <p>Properties may exist upon a global object that were directly created rather than being declared using a var or function declaration. A global lexical binding may not be created that has the same name as a non-configurable property of the global object. The global property *"undefined"* is an example of such a property.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-candeclareglobalvar" type="concrete method">
          <h1>
            CanDeclareGlobalVar (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if a corresponding CreateGlobalVarBinding call would succeed if called for the same argument _N_. Redundant var declarations and var declarations for pre-existing global object properties are allowed.</dd>
          </dl>
          <emu-alg>
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _hasProperty_ be ? HasOwnProperty(_globalObject_, _N_).
            1. If _hasProperty_ is *true*, return *true*.
            1. Return ? IsExtensible(_globalObject_).
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-candeclareglobalfunction" type="concrete method">
          <h1>
            CanDeclareGlobalFunction (
              _N_: a String,
            ): either a normal completion containing a Boolean or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It determines if a corresponding CreateGlobalFunctionBinding call would succeed if called for the same argument _N_.</dd>
          </dl>
          <emu-alg>
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _existingProp_ be ? <emu-meta effects="user-code">_globalObject_.[[GetOwnProperty]]</emu-meta>(_N_).
            1. If _existingProp_ is *undefined*, return ? IsExtensible(_globalObject_).
            1. If _existingProp_.[[Configurable]] is *true*, return *true*.
            1. If IsDataDescriptor(_existingProp_) is *true* and _existingProp_ has attribute values { [[Writable]]: *true*, [[Enumerable]]: *true* }, return *true*.
            1. Return *false*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-createglobalvarbinding" type="concrete method">
          <h1>
            CreateGlobalVarBinding (
              _N_: a String,
              _D_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates and initializes a mutable binding in the associated Object Environment Record and records the bound name in the associated [[VarNames]] List. If a binding already exists, it is reused and assumed to be initialized.</dd>
          </dl>
          <emu-alg>
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _hasProperty_ be ? HasOwnProperty(_globalObject_, _N_).
            1. Let _extensible_ be ? IsExtensible(_globalObject_).
            1. If _hasProperty_ is *false* and _extensible_ is *true*, then
              1. Perform ? <emu-meta effects="user-code">_ObjRec_.CreateMutableBinding</emu-meta>(_N_, _D_).
              1. Perform ? <emu-meta effects="user-code">_ObjRec_.InitializeBinding</emu-meta>(_N_, *undefined*).
            1. If _envRec_.[[VarNames]] does not contain _N_, then
              1. Append _N_ to _envRec_.[[VarNames]].
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-createglobalfunctionbinding" type="concrete method">
          <h1>
            CreateGlobalFunctionBinding (
              _N_: a String,
              _V_: an ECMAScript language value,
              _D_: a Boolean,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Global Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates and initializes a mutable binding in the associated Object Environment Record and records the bound name in the associated [[VarNames]] List. If a binding already exists, it is replaced.</dd>
          </dl>
          <emu-alg>
            1. Let _ObjRec_ be _envRec_.[[ObjectRecord]].
            1. Let _globalObject_ be _ObjRec_.[[BindingObject]].
            1. Let _existingProp_ be ? <emu-meta effects="user-code">_globalObject_.[[GetOwnProperty]]</emu-meta>(_N_).
            1. If _existingProp_ is *undefined* or _existingProp_.[[Configurable]] is *true*, then
              1. Let _desc_ be the PropertyDescriptor { [[Value]]: _V_, [[Writable]]: *true*, [[Enumerable]]: *true*, [[Configurable]]: _D_ }.
            1. Else,
              1. Let _desc_ be the PropertyDescriptor { [[Value]]: _V_ }.
            1. Perform ? DefinePropertyOrThrow(_globalObject_, _N_, _desc_).
            1. [id="step-createglobalfunctionbinding-set"] Perform ? Set(_globalObject_, _N_, _V_, *false*).
            1. If _envRec_.[[VarNames]] does not contain _N_, then
              1. Append _N_ to _envRec_.[[VarNames]].
            1. Return ~unused~.
          </emu-alg>
          <emu-note>
            <p>Global function declarations are always represented as own properties of the global object. If possible, an existing own property is reconfigured to have a standard set of attribute values. Step <emu-xref href="#step-createglobalfunctionbinding-set"></emu-xref> is equivalent to what calling the InitializeBinding concrete method would do and if _globalObject_ is a Proxy will produce the same sequence of Proxy trap calls.</p>
          </emu-note>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-module-environment-records" oldids="module-environment">
        <h1>Module Environment Records</h1>
        <p>A <dfn variants="Module Environment Records">Module Environment Record</dfn> is a Declarative Environment Record that is used to represent the outer scope of an ECMAScript |Module|. In additional to normal mutable and immutable bindings, Module Environment Records also provide immutable import bindings which are bindings that provide indirect access to a target binding that exists in another Environment Record.</p>
        <p>Module Environment Records support all of the Declarative Environment Record methods listed in <emu-xref href="#table-abstract-methods-of-environment-records"></emu-xref> and share the same specifications for all of those methods except for GetBindingValue, DeleteBinding, HasThisBinding and GetThisBinding. In addition, Module Environment Records support the methods listed in <emu-xref href="#table-additional-methods-of-module-environment-records"></emu-xref>:</p>
        <emu-table id="table-additional-methods-of-module-environment-records" caption="Additional Methods of Module Environment Records" oldids="table-20">
          <table>
            <thead>
              <tr>
                <th>
                  Method
                </th>
                <th>
                  Purpose
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                CreateImportBinding(N, M, N2)
              </td>
              <td>
                Create an immutable indirect binding in a Module Environment Record. The String value _N_ is the text of the bound name. _M_ is a Module Record, and _N2_ is a binding that exists in _M_'s Module Environment Record.
              </td>
            </tr>
            <tr>
              <td>
                GetThisBinding()
              </td>
              <td>
                Return the value of this Environment Record's `this` binding.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>The behaviour of the additional concrete specification methods for Module Environment Records are defined by the following algorithms:</p>

        <emu-clause id="sec-module-environment-records-getbindingvalue-n-s" type="concrete method">
          <h1>
            GetBindingValue (
              _N_: a String,
              _S_: a Boolean,
            ): either a normal completion containing an ECMAScript language value or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Module Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It returns the value of its bound identifier whose name is _N_. However, if the binding is an indirect binding the value of the target binding is returned. If the binding exists but is uninitialized a *ReferenceError* is thrown.</dd>
          </dl>
          <emu-alg>
            1. Assert: _S_ is *true*.
            1. Assert: _envRec_ has a binding for _N_.
            1. If the binding for _N_ is an indirect binding, then
              1. Let _M_ and _N2_ be the indirection values provided when this binding for _N_ was created.
              1. Let _targetEnv_ be _M_.[[Environment]].
              1. If _targetEnv_ is ~empty~, throw a *ReferenceError* exception.
              1. Return ? <emu-meta effects="user-code">_targetEnv_.GetBindingValue</emu-meta>(_N2_, *true*).
            1. If the binding for _N_ in _envRec_ is an uninitialized binding, throw a *ReferenceError* exception.
            1. Return the value currently bound to _N_ in _envRec_.
          </emu-alg>
          <emu-note>
            <p>_S_ will always be *true* because a |Module| is always strict mode code.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-module-environment-records-deletebinding-n">
          <h1>DeleteBinding ( _N_ )</h1>
          <p>The DeleteBinding concrete method of a Module Environment Record is never used within this specification.</p>
          <emu-note>
            <p>Module Environment Records are only used within strict code and an early error rule prevents the delete operator, in strict code, from being applied to a Reference Record that would resolve to a Module Environment Record binding. See <emu-xref href="#sec-delete-operator-static-semantics-early-errors"></emu-xref>.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-module-environment-records-hasthisbinding" type="concrete method">
          <h1>HasThisBinding ( ): *true*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Module Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *true*.
          </emu-alg>
          <emu-note>
            <p>Module Environment Records always provide a `this` binding.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-module-environment-records-getthisbinding" type="concrete method">
          <h1>GetThisBinding ( ): a normal completion containing *undefined*</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Module Environment Record _envRec_</dd>
          </dl>
          <emu-alg>
            1. Return *undefined*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-createimportbinding" type="concrete method">
          <h1>
            CreateImportBinding (
              _N_: a String,
              _M_: a Module Record,
              _N2_: a String,
            ): ~unused~
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Module Environment Record _envRec_</dd>

            <dt>description</dt>
            <dd>It creates a new initialized immutable indirect binding for the name _N_. A binding must not already exist in this Environment Record for _N_. _N2_ is the name of a binding that exists in _M_'s Module Environment Record. Accesses to the value of the new binding will indirectly access the bound value of the target binding.</dd>
          </dl>
          <emu-alg>
            1. Assert: _envRec_ does not already have a binding for _N_.
            1. Assert: When _M_.[[Environment]] is instantiated, it will have a direct binding for _N2_.
            1. Create an immutable indirect binding in _envRec_ for _N_ that references _M_ and _N2_ as its target binding and record that the binding is initialized.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-environment-record-operations" oldids="sec-lexical-environment-operations">
      <h1>Environment Record Operations</h1>
      <p>The following abstract operations are used in this specification to operate upon Environment Records:</p>

      <emu-clause id="sec-getidentifierreference" type="abstract operation">
        <h1>
          GetIdentifierReference (
            _env_: an Environment Record or *null*,
            _name_: a String,
            _strict_: a Boolean,
          ): either a normal completion containing a Reference Record or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _env_ is *null*, then
            1. Return the Reference Record { [[Base]]: ~unresolvable~, [[ReferencedName]]: _name_, [[Strict]]: _strict_, [[ThisValue]]: ~empty~ }.
          1. Let _exists_ be ? <emu-meta effects="user-code">_env_.HasBinding</emu-meta>(_name_).
          1. If _exists_ is *true*, then
            1. Return the Reference Record { [[Base]]: _env_, [[ReferencedName]]: _name_, [[Strict]]: _strict_, [[ThisValue]]: ~empty~ }.
          1. Else,
            1. Let _outer_ be _env_.[[OuterEnv]].
            1. Return ? GetIdentifierReference(_outer_, _name_, _strict_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-newdeclarativeenvironment" type="abstract operation">
        <h1>
          NewDeclarativeEnvironment (
            _E_: an Environment Record or *null*,
          ): a Declarative Environment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _env_ be a new Declarative Environment Record containing no bindings.
          1. Set _env_.[[OuterEnv]] to _E_.
          1. Return _env_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-newobjectenvironment" type="abstract operation">
        <h1>
          NewObjectEnvironment (
            _O_: an Object,
            _W_: a Boolean,
            _E_: an Environment Record or *null*,
          ): an Object Environment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _env_ be a new Object Environment Record.
          1. Set _env_.[[BindingObject]] to _O_.
          1. Set _env_.[[IsWithEnvironment]] to _W_.
          1. Set _env_.[[OuterEnv]] to _E_.
          1. Return _env_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-newfunctionenvironment" type="abstract operation">
        <h1>
          NewFunctionEnvironment (
            _F_: an ECMAScript function object,
            _newTarget_: an Object or *undefined*,
          ): a Function Environment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _env_ be a new Function Environment Record containing no bindings.
          1. Set _env_.[[FunctionObject]] to _F_.
          1. If _F_.[[ThisMode]] is ~lexical~, set _env_.[[ThisBindingStatus]] to ~lexical~.
          1. Else, set _env_.[[ThisBindingStatus]] to ~uninitialized~.
          1. Set _env_.[[NewTarget]] to _newTarget_.
          1. Set _env_.[[OuterEnv]] to _F_.[[Environment]].
          1. Return _env_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-newglobalenvironment" type="abstract operation">
        <h1>
          NewGlobalEnvironment (
            _G_: an Object,
            _thisValue_: an Object,
          ): a Global Environment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _objRec_ be NewObjectEnvironment(_G_, *false*, *null*).
          1. Let _dclRec_ be NewDeclarativeEnvironment(*null*).
          1. Let _env_ be a new Global Environment Record.
          1. Set _env_.[[ObjectRecord]] to _objRec_.
          1. Set _env_.[[GlobalThisValue]] to _thisValue_.
          1. Set _env_.[[DeclarativeRecord]] to _dclRec_.
          1. Set _env_.[[VarNames]] to a new empty List.
          1. Set _env_.[[OuterEnv]] to *null*.
          1. Return _env_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-newmoduleenvironment" type="abstract operation">
        <h1>
          NewModuleEnvironment (
            _E_: an Environment Record,
          ): a Module Environment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _env_ be a new Module Environment Record containing no bindings.
          1. Set _env_.[[OuterEnv]] to _E_.
          1. Return _env_.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-privateenvironment-records">
    <h1>PrivateEnvironment Records</h1>
    <p>A <dfn id="privateenvironment-record" variants="PrivateEnvironment Records">PrivateEnvironment Record</dfn> is a specification mechanism used to track Private Names based upon the lexical nesting structure of |ClassDeclaration|s and |ClassExpression|s in ECMAScript code. They are similar to, but distinct from, Environment Records. Each PrivateEnvironment Record is associated with a |ClassDeclaration| or |ClassExpression|. Each time such a class is evaluated, a new PrivateEnvironment Record is created to record the Private Names declared by that class.</p>
    <p>Each PrivateEnvironment Record has the fields defined in <emu-xref href="#table-privateenvironment-records"></emu-xref>.</p>
    <emu-table id="table-privateenvironment-records" caption="PrivateEnvironment Record Fields">
      <table>
        <thead>
          <tr>
            <th>
              Field Name
            </th>
            <th>
              Value Type
            </th>
            <th>
              Meaning
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            [[OuterPrivateEnvironment]]
          </td>
          <td>
            a PrivateEnvironment Record or *null*
          </td>
          <td>
            The PrivateEnvironment Record of the nearest containing class. *null* if the class with which this PrivateEnvironment Record is associated is not contained in any other class.
          </td>
        </tr>
        <tr>
          <td>
            [[Names]]
          </td>
          <td>
            a List of Private Names
          </td>
          <td>
            The Private Names declared by this class.
          </td>
        </tr>
      </table>
    </emu-table>

    <emu-clause id="sec-privateenvironment-record-operations">
      <h1>PrivateEnvironment Record Operations</h1>
      <p>The following abstract operations are used in this specification to operate upon PrivateEnvironment Records:</p>

      <emu-clause id="sec-newprivateenvironment" type="abstract operation">
        <h1>
          NewPrivateEnvironment (
            _outerPrivateEnv_: a PrivateEnvironment Record or *null*,
          ): a PrivateEnvironment Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _names_ be a new empty List.
          1. Return the PrivateEnvironment Record { [[OuterPrivateEnvironment]]: _outerPrivateEnv_, [[Names]]: _names_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-resolve-private-identifier" type="abstract operation">
        <h1>
          ResolvePrivateIdentifier (
            _privateEnv_: a PrivateEnvironment Record,
            _identifier_: a String,
          ): a Private Name
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _names_ be _privateEnv_.[[Names]].
          1. For each Private Name _pn_ of _names_, do
            1. If _pn_.[[Description]] is _identifier_, then
              1. Return _pn_.
          1. Let _outerPrivateEnv_ be _privateEnv_.[[OuterPrivateEnvironment]].
          1. Assert: _outerPrivateEnv_ is not *null*.
          1. Return ResolvePrivateIdentifier(_outerPrivateEnv_, _identifier_).
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-code-realms">
    <h1>Realms</h1>
    <p>Before it is evaluated, all ECMAScript code must be associated with a <dfn id="realm" variants="realms">realm</dfn>. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.</p>
    <p>A realm is represented in this specification as a <dfn id="realm-record" variants="Realm Records">Realm Record</dfn> with the fields specified in <emu-xref href="#table-realm-record-fields"></emu-xref>:</p>
    <emu-table id="table-realm-record-fields" caption="Realm Record Fields" oldids="table-21">
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
            [[AgentSignifier]]
          </td>
          <td>
            an agent signifier
          </td>
          <td>
            The agent that owns this realm
          </td>
        </tr>
        <tr>
          <td>
            [[Intrinsics]]
          </td>
          <td>
            a Record whose field names are intrinsic keys and whose values are objects
          </td>
          <td>
            The intrinsic values used by code associated with this realm
          </td>
        </tr>
        <tr>
          <td>
            [[GlobalObject]]
          </td>
          <td>
            an Object
          </td>
          <td>
            The global object for this realm
          </td>
        </tr>
        <tr>
          <td>
            [[GlobalEnv]]
          </td>
          <td>
            a Global Environment Record
          </td>
          <td>
            The global environment for this realm
          </td>
        </tr>
        <tr>
          <td>
            [[TemplateMap]]
          </td>
          <td>
            a List of Records with fields [[Site]] (a |TemplateLiteral| Parse Node) and [[Array]] (an Array)
          </td>
          <td>
            <p>Template objects are canonicalized separately for each realm using its Realm Record's [[TemplateMap]]. Each [[Site]] value is a Parse Node that is a |TemplateLiteral|. The associated [[Array]] value is the corresponding template object that is passed to a tag function.</p>
            <emu-note>Once a Parse Node becomes unreachable, the corresponding [[Array]] is also unreachable, and it would be unobservable if an implementation removed the pair from the [[TemplateMap]] list.</emu-note>
          </td>
        </tr>
        <tr>
          <td>
            [[LoadedModules]]
          </td>
          <td>
            a List of Records with fields [[Specifier]] (a String) and [[Module]] (a Module Record)
          </td>
          <td>
            <p>A map from the specifier strings imported by this realm to the resolved Module Record. The list does not contain two different Records with the same [[Specifier]].</p>
            <emu-note>
              As mentioned in HostLoadImportedModule (<emu-xref href="#note-HostLoadImportedModule-referrer-Realm-Record"></emu-xref>), [[LoadedModules]] in Realm Records is only used when running an `import()` expression in a context where there is no active script or module.
            </emu-note>
          </td>
        </tr>
        <tr>
          <td>
            [[HostDefined]]
          </td>
          <td>
            anything (default value is *undefined*)
          </td>
          <td>
            Field reserved for use by hosts that need to associate additional information with a Realm Record.
          </td>
        </tr>
      </table>
    </emu-table>

    <emu-clause id="sec-initializehostdefinedrealm" type="abstract operation" oldids="sec-createrealm,sec-setrealmglobalobject">
      <h1>InitializeHostDefinedRealm ( ): either a normal completion containing ~unused~ or a throw completion</h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _realm_ be a new Realm Record.
        1. Perform CreateIntrinsics(_realm_).
        1. Set _realm_.[[AgentSignifier]] to AgentSignifier().
        1. Set _realm_.[[GlobalEnv]] to *undefined*.
        1. Set _realm_.[[TemplateMap]] to a new empty List.
        1. Let _newContext_ be a new execution context.
        1. Set the Function of _newContext_ to *null*.
        1. Set the Realm of _newContext_ to _realm_.
        1. Set the ScriptOrModule of _newContext_ to *null*.
        1. Push _newContext_ onto the execution context stack; _newContext_ is now the running execution context.
        1. If the host requires use of an exotic object to serve as _realm_'s global object, then
          1. Let _global_ be such an object created in a host-defined manner.
        1. Else,
          1. Let _global_ be OrdinaryObjectCreate(_realm_.[[Intrinsics]].[[%Object.prototype%]]).
        1. If the host requires that the `this` binding in _realm_'s global scope return an object other than the global object, then
          1. Let _thisValue_ be such an object created in a host-defined manner.
        1. Else,
          1. Let _thisValue_ be _global_.
        1. Set _realm_.[[GlobalObject]] to _global_.
        1. Set _realm_.[[GlobalEnv]] to NewGlobalEnvironment(_global_, _thisValue_).
        1. Perform ? SetDefaultGlobalBindings(_realm_).
        1. Create any host-defined global object properties on _global_.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-createintrinsics" type="abstract operation">
      <h1>
        CreateIntrinsics (
          _realmRec_: a Realm Record,
        ): ~unused~
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Set _realmRec_.[[Intrinsics]] to a new Record.
        1. [declared="steps,name,length,slots,prototype"] Set fields of _realmRec_.[[Intrinsics]] with the values listed in <emu-xref href="#table-well-known-intrinsic-objects"></emu-xref>. The field names are the names listed in column one of the table. The value of each field is a new object value fully and recursively populated with property values as defined by the specification of each object in clauses <emu-xref href="#sec-global-object"></emu-xref> through <emu-xref href="#sec-reflection"></emu-xref>. All object property values are newly created object values. All values that are built-in function objects are created by performing CreateBuiltinFunction(_steps_, _length_, _name_, _slots_, _realmRec_, _prototype_) where _steps_ is the definition of that function provided by this specification, _name_ is the initial value of the function's *"name"* property, _length_ is the initial value of the function's *"length"* property, _slots_ is a list of the names, if any, of the function's specified internal slots, and _prototype_ is the specified value of the function's [[Prototype]] internal slot. The creation of the intrinsics and their properties must be ordered to avoid any dependencies upon objects that have not yet been created.
        1. Perform AddRestrictedFunctionProperties(_realmRec_.[[Intrinsics]].[[%Function.prototype%]], _realmRec_).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-setdefaultglobalbindings" type="abstract operation">
      <h1>
        SetDefaultGlobalBindings (
          _realmRec_: a Realm Record,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _global_ be _realmRec_.[[GlobalObject]].
        1. For each property of the Global Object specified in clause <emu-xref href="#sec-global-object"></emu-xref>, do
          1. Let _name_ be the String value of the property name.
          1. Let _desc_ be the fully populated data Property Descriptor for the property, containing the specified attributes for the property. For properties listed in <emu-xref href="#sec-function-properties-of-the-global-object"></emu-xref>, <emu-xref href="#sec-constructor-properties-of-the-global-object"></emu-xref>, or <emu-xref href="#sec-other-properties-of-the-global-object"></emu-xref> the value of the [[Value]] attribute is the corresponding intrinsic object from _realmRec_.
          1. Perform ? DefinePropertyOrThrow(_global_, _name_, _desc_).
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-execution-contexts">
    <h1>Execution Contexts</h1>
    <p>An <dfn variants="execution contexts">execution context</dfn> is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation. At any point in time, there is at most one execution context per agent that is actually executing code. This is known as the agent's <dfn id="running-execution-context" variants="running execution contexts">running execution context</dfn>. All references to the running execution context in this specification denote the running execution context of the surrounding agent.</p>
    <p>The <dfn id="execution-context-stack" variants="execution context stacks">execution context stack</dfn> is used to track execution contexts. The running execution context is always the top element of this stack. A new execution context is created whenever control is transferred from the executable code associated with the currently running execution context to executable code that is not associated with that execution context. The newly created execution context is pushed onto the stack and becomes the running execution context.</p>
    <p>An execution context contains whatever implementation specific state is necessary to track the execution progress of its associated code. Each execution context has at least the state components listed in <emu-xref href="#table-state-components-for-all-execution-contexts"></emu-xref>.</p>
    <emu-table id="table-state-components-for-all-execution-contexts" caption="State Components for All Execution Contexts" oldids="table-22">
      <table>
        <thead>
          <tr>
            <th>
              Component
            </th>
            <th>
              Purpose
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            code evaluation state
          </td>
          <td>
            Any state needed to perform, suspend, and resume evaluation of the code associated with this execution context.
          </td>
        </tr>
        <tr>
          <td>
            Function
          </td>
          <td>
            If this execution context is evaluating the code of a function object, then the value of this component is that function object. If the context is evaluating the code of a |Script| or |Module|, the value is *null*.
          </td>
        </tr>
        <tr>
          <td>
            Realm
          </td>
          <td>
            The Realm Record from which associated code accesses ECMAScript resources.
          </td>
        </tr>
        <tr>
          <td>
            ScriptOrModule
          </td>
          <td>
            The Module Record or Script Record from which associated code originates. If there is no originating script or module, as is the case for the original execution context created in InitializeHostDefinedRealm, the value is *null*.
          </td>
        </tr>
      </table>
    </emu-table>
    <p>Evaluation of code by the running execution context may be suspended at various points defined within this specification. Once the running execution context has been suspended a different execution context may become the running execution context and commence evaluating its code. At some later time a suspended execution context may again become the running execution context and continue evaluating its code at the point where it had previously been suspended. Transition of the running execution context status among execution contexts usually occurs in stack-like last-in/first-out manner. However, some ECMAScript features require non-LIFO transitions of the running execution context.</p>
    <p>The value of the Realm component of the running execution context is also called <dfn id="current-realm">the current Realm Record</dfn>. The value of the Function component of the running execution context is also called the <dfn id="active-function-object">active function object</dfn>.</p>
    <p><dfn id="ecmascript-code-execution-context" variants="ECMAScript code execution context">ECMAScript code execution contexts</dfn> have the additional state components listed in <emu-xref href="#table-additional-state-components-for-ecmascript-code-execution-contexts"></emu-xref>.</p>
    <emu-table id="table-additional-state-components-for-ecmascript-code-execution-contexts" caption="Additional State Components for ECMAScript Code Execution Contexts" oldids="table-23">
      <table>
        <thead>
          <tr>
            <th>
              Component
            </th>
            <th>
              Purpose
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            LexicalEnvironment
          </td>
          <td>
            Identifies the Environment Record used to resolve identifier references made by code within this execution context.
          </td>
        </tr>
        <tr>
          <td>
            VariableEnvironment
          </td>
          <td>
            Identifies the Environment Record that holds bindings created by |VariableStatement|s within this execution context.
          </td>
        </tr>
        <tr>
          <td>
            PrivateEnvironment
          </td>
          <td>
            Identifies the PrivateEnvironment Record that holds Private Names created by |ClassElement|s in the nearest containing class. *null* if there is no containing class.
          </td>
        </tr>
      </table>
    </emu-table>
    <p>The LexicalEnvironment and VariableEnvironment components of an execution context are always Environment Records.</p>
    <p>Execution contexts representing the evaluation of Generators have the additional state components listed in <emu-xref href="#table-additional-state-components-for-generator-execution-contexts"></emu-xref>.</p>
    <emu-table id="table-additional-state-components-for-generator-execution-contexts" caption="Additional State Components for Generator Execution Contexts" oldids="table-24">
      <table>
        <thead>
          <tr>
            <th>
              Component
            </th>
            <th>
              Purpose
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            Generator
          </td>
          <td>
            The Generator that this execution context is evaluating.
          </td>
        </tr>
      </table>
    </emu-table>
    <p>In most situations only the running execution context (the top of the execution context stack) is directly manipulated by algorithms within this specification. Hence when the terms “LexicalEnvironment”, and “VariableEnvironment” are used without qualification they are in reference to those components of the running execution context.</p>
    <p>An execution context is purely a specification mechanism and need not correspond to any particular artefact of an ECMAScript implementation. It is impossible for ECMAScript code to directly access or observe an execution context.</p>

    <emu-clause id="sec-getactivescriptormodule" type="abstract operation">
      <h1>GetActiveScriptOrModule ( ): a Script Record, a Module Record, or *null*</h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine the running script or module, based on the running execution context.</dd>
      </dl>

      <emu-alg>
        1. If the execution context stack is empty, return *null*.
        1. Let _ec_ be the topmost execution context on the execution context stack whose ScriptOrModule component is not *null*.
        1. If no such execution context exists, return *null*. Otherwise, return _ec_'s ScriptOrModule.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-resolvebinding" type="abstract operation">
      <h1>
        ResolveBinding (
          _name_: a String,
          optional _env_: an Environment Record or *undefined*,
        ): either a normal completion containing a Reference Record or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It is used to determine the binding of _name_. _env_ can be used to explicitly provide the Environment Record that is to be searched for the binding.</dd>
      </dl>
      <emu-alg>
        1. If _env_ is not present or _env_ is *undefined*, then
          1. Set _env_ to the running execution context's LexicalEnvironment.
        1. Assert: _env_ is an Environment Record.
        1. Let _strict_ be IsStrict(the syntactic production that is being evaluated).
        1. Return ? GetIdentifierReference(_env_, _name_, _strict_).
      </emu-alg>
      <emu-note>
        <p>The result of ResolveBinding is always a Reference Record whose [[ReferencedName]] field is _name_.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-getthisenvironment" type="abstract operation">
      <h1>GetThisEnvironment ( ): an Environment Record</h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It finds the Environment Record that currently supplies the binding of the keyword `this`.</dd>
      </dl>
      <emu-alg>
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. [id="step-getthisenvironment-loop"] Repeat,
          1. Let _exists_ be _env_.HasThisBinding().
          1. If _exists_ is *true*, return _env_.
          1. Let _outer_ be _env_.[[OuterEnv]].
          1. Assert: _outer_ is not *null*.
          1. Set _env_ to _outer_.
      </emu-alg>
      <emu-note>
        <p>The loop in step <emu-xref href="#step-getthisenvironment-loop"></emu-xref> will always terminate because the list of environments always ends with the global environment which has a `this` binding.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-resolvethisbinding" type="abstract operation">
      <h1>ResolveThisBinding ( ): either a normal completion containing an ECMAScript language value or a throw completion</h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines the binding of the keyword `this` using the LexicalEnvironment of the running execution context.</dd>
      </dl>
      <emu-alg>
        1. Let _envRec_ be GetThisEnvironment().
        1. Return ? _envRec_.GetThisBinding().
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getnewtarget" type="abstract operation">
      <h1>GetNewTarget ( ): an Object or *undefined*</h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines the NewTarget value using the LexicalEnvironment of the running execution context.</dd>
      </dl>
      <emu-alg>
        1. Let _envRec_ be GetThisEnvironment().
        1. Assert: _envRec_ has a [[NewTarget]] field.
        1. Return _envRec_.[[NewTarget]].
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-getglobalobject" type="abstract operation">
      <h1>GetGlobalObject ( ): an Object</h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It returns the global object used by the currently running execution context.</dd>
      </dl>
      <emu-alg>
        1. Let _currentRealm_ be the current Realm Record.
        1. Return _currentRealm_.[[GlobalObject]].
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-jobs" oldids="sec-jobs-and-job-queues,sec-enqueuejob,sec-runjobs,job-queue">
    <h1>Jobs and Host Operations to Enqueue Jobs</h1>
    <p>A <dfn id="job" variants="Jobs">Job</dfn> is an Abstract Closure with no parameters that initiates an ECMAScript computation when no other ECMAScript computation is currently in progress.</p>
    <p>Jobs are scheduled for execution by ECMAScript host environments in a particular agent. This specification describes the host hooks HostEnqueueGenericJob, HostEnqueueFinalizationRegistryCleanupJob, HostEnqueuePromiseJob, and HostEnqueueTimeoutJob to schedule jobs. The host hooks in this specification are organized by the additional constraints imposed on the scheduling of jobs. Hosts may define additional abstract operations which schedule jobs. Such operations accept a Job Abstract Closure and a realm (a Realm Record or *null*) as parameters. If a Realm Record is provided, these operations schedule the job to be performed at some future time in the provided realm, in the agent that owns the realm. If *null* is provided instead for the realm, then the job does not evaluate ECMAScript code. Their implementations must conform to the following requirements:</p>

    <ul>
      <li>At some future point in time, when there is no running context in the agent for which the job is scheduled and that agent's execution context stack is empty, the implementation must:
        <ol>
          <li>Perform any host-defined preparation steps.</li>
          <li><emu-not-ref>Invoke</emu-not-ref> the Job Abstract Closure.</li>
          <li>Perform any host-defined cleanup steps, after which the execution context stack must be empty.</li>
        </ol>
      </li>
      <li>Only one Job may be actively undergoing evaluation at any point in time in an agent.</li>
      <li>Once evaluation of a Job starts, it must run to completion before evaluation of any other Job starts in an agent.</li>
      <li>The Abstract Closure must return a normal completion, implementing its own handling of errors.</li>
    </ul>

    <emu-note>
      Host environments are not required to treat Jobs uniformly with respect to scheduling. For example, web browsers and Node.js treat Promise-handling Jobs as a higher priority than other work; future features may add Jobs that are not treated at such a high priority.
    </emu-note>

    <p>At any particular time, _scriptOrModule_ (a Script Record, a Module Record, or *null*) is the <dfn id="job-activescriptormodule">active script or module</dfn> if all of the following conditions are true:</p>
    <ul>
      <li>GetActiveScriptOrModule() is _scriptOrModule_.</li>
      <li>If _scriptOrModule_ is a Script Record or Module Record, let _ec_ be the topmost execution context on the execution context stack whose ScriptOrModule component is _scriptOrModule_. The Realm component of _ec_ is _scriptOrModule_.[[Realm]].</li>
    </ul>

    <p>At any particular time, an execution is <dfn id="job-preparedtoevaluatecode">prepared to evaluate ECMAScript code</dfn> if all of the following conditions are true:</p>
    <ul>
      <li>The execution context stack is not empty.</li>
      <li>The Realm component of the topmost execution context on the execution context stack is a Realm Record.</li>
    </ul>

    <emu-note>
      <p>Host environments may prepare an execution to evaluate code by pushing execution contexts onto the execution context stack. The specific steps are implementation-defined.</p>
      <p>The specific choice of Realm is up to the host environment. This initial execution context and Realm is only in use before any callback function is invoked. When a callback function related to a Job, like a Promise handler, is invoked, the invocation pushes its own execution context and Realm.</p>
    </emu-note>

    <p>Particular kinds of Jobs have additional conformance requirements.</p>

    <emu-clause id="sec-jobcallback-records">
      <h1>JobCallback Records</h1>
      <p>A <dfn variants="JobCallback Records">JobCallback Record</dfn> is a Record value used to store a function object and a host-defined value. Function objects that are invoked via a Job enqueued by the host may have additional host-defined context. To propagate the state, Job Abstract Closures should not capture and call function objects directly. Instead, use HostMakeJobCallback and HostCallJobCallback.</p>
      <emu-note>
        <p>The WHATWG HTML specification (<a href="https://html.spec.whatwg.org/">https://html.spec.whatwg.org/</a>), for example, uses the host-defined value to propagate the incumbent settings object for Promise callbacks.</p>
      </emu-note>
      <p>JobCallback Records have the fields listed in <emu-xref href="#table-jobcallback-records"></emu-xref>.</p>
      <emu-table id="table-jobcallback-records" caption="JobCallback Record Fields">
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
              [[Callback]]
            </td>
            <td>
              a function object
            </td>
            <td>
              The function to invoke when the Job is invoked.
            </td>
          </tr>
          <tr>
            <td>
              [[HostDefined]]
            </td>
            <td>
              anything (default value is ~empty~)
            </td>
            <td>
              Field reserved for use by hosts.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-hostmakejobcallback" type="host-defined abstract operation">
      <h1>
        HostMakeJobCallback (
          _callback_: a function object,
        ): a JobCallback Record
      </h1>
      <dl class="header">
      </dl>
      <p>An implementation of HostMakeJobCallback must conform to the following requirements:</p>
      <ul>
        <li>It must return a JobCallback Record whose [[Callback]] field is _callback_.</li>
      </ul>
      <p>The default implementation of HostMakeJobCallback performs the following steps when called:</p>
      <emu-alg>
        1. Return the JobCallback Record { [[Callback]]: _callback_, [[HostDefined]]: ~empty~ }.
      </emu-alg>
      <p>ECMAScript hosts that are not web browsers must use the default implementation of HostMakeJobCallback.</p>
      <emu-note>
        <p>This is called at the time that the callback is passed to the function that is responsible for its being eventually scheduled and run. For example, `promise.then(thenAction)` calls MakeJobCallback on `thenAction` at the time of invoking `Promise.prototype.then`, not at the time of scheduling the reaction Job.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-hostcalljobcallback" type="host-defined abstract operation">
      <h1>
        HostCallJobCallback (
          _jobCallback_: a JobCallback Record,
          _V_: an ECMAScript language value,
          _argumentsList_: a List of ECMAScript language values,
        ): either a normal completion containing an ECMAScript language value or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <p>An implementation of HostCallJobCallback must conform to the following requirements:</p>
      <ul>
        <li>It must perform and return the result of Call(_jobCallback_.[[Callback]], _V_, _argumentsList_).</li>
      </ul>
      <emu-note>
        <p>This requirement means that hosts cannot change the [[Call]] behaviour of function objects defined in this specification.</p>
      </emu-note>
      <p>The default implementation of HostCallJobCallback performs the following steps when called:</p>
      <emu-alg>
        1. Assert: IsCallable(_jobCallback_.[[Callback]]) is *true*.
        1. Return ? Call(_jobCallback_.[[Callback]], _V_, _argumentsList_).
      </emu-alg>
      <p>ECMAScript hosts that are not web browsers must use the default implementation of HostCallJobCallback.</p>
    </emu-clause>

    <emu-clause id="sec-hostenqueuegenericjob" type="host-defined abstract operation">
      <h1>
        HostEnqueueGenericJob (
          _job_: a Job Abstract Closure,
          _realm_: a Realm Record,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It schedules _job_ in the realm _realm_ in the agent signified by _realm_.[[AgentSignifier]] to be performed at some future time. The Abstract Closures used with this algorithm are intended to be scheduled without additional constraints, such as priority and ordering.</dd>
      </dl>
      <p>An implementation of HostEnqueueGenericJob must conform to the requirements in <emu-xref href="#sec-jobs"></emu-xref>.</p>
    </emu-clause>

    <emu-clause id="sec-hostenqueuepromisejob" type="host-defined abstract operation">
      <h1>
        HostEnqueuePromiseJob (
          _job_: a Job Abstract Closure,
          _realm_: a Realm Record or *null*,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It schedules _job_ to be performed at some future time. The Abstract Closures used with this algorithm are intended to be related to the handling of Promises, or otherwise, to be scheduled with equal priority to Promise handling operations.</dd>
      </dl>

      <p>An implementation of HostEnqueuePromiseJob must conform to the requirements in <emu-xref href="#sec-jobs"></emu-xref> as well as the following:</p>
      <ul>
        <li>If _realm_ is not *null*, each time _job_ is invoked the implementation must perform implementation-defined steps such that execution is prepared to evaluate ECMAScript code at the time of _job_'s invocation.</li>
        <li>Let _scriptOrModule_ be GetActiveScriptOrModule() at the time HostEnqueuePromiseJob is invoked. If _realm_ is not *null*, each time _job_ is invoked the implementation must perform implementation-defined steps such that _scriptOrModule_ is the active script or module at the time of _job_'s invocation.</li>
        <li>Jobs must run in the same order as the HostEnqueuePromiseJob invocations that scheduled them.</li>
      </ul>

      <emu-note>
        <p>The _realm_ for Jobs returned by NewPromiseResolveThenableJob is usually the result of calling GetFunctionRealm on the _then_ function object. The _realm_ for Jobs returned by NewPromiseReactionJob is usually the result of calling GetFunctionRealm on the handler if the handler is not *undefined*. If the handler is *undefined*, _realm_ is *null*. For both kinds of Jobs, when GetFunctionRealm completes abnormally (i.e. called on a revoked Proxy), _realm_ is the current Realm Record at the time of the GetFunctionRealm call. When the _realm_ is *null*, no user ECMAScript code will be evaluated and no new ECMAScript objects (e.g. Error objects) will be created. The WHATWG HTML specification (<a href="https://html.spec.whatwg.org/">https://html.spec.whatwg.org/</a>), for example, uses _realm_ to check for the ability to run script and for the <a href="https://html.spec.whatwg.org/#entry">entry</a> concept.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-hostenqueuetimeoutjob" type="host-defined abstract operation">
      <h1>
        HostEnqueueTimeoutJob (
          _timeoutJob_: a Job Abstract Closure,
          _realm_: a Realm Record,
          _milliseconds_: a non-negative finite Number,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It schedules _timeoutJob_ in the realm _realm_ in the agent signified by _realm_.[[AgentSignifier]] to be performed after at least _milliseconds_ milliseconds.</dd>
      </dl>
      <p>An implementation of HostEnqueueTimeoutJob must conform to the requirements in <emu-xref href="#sec-jobs"></emu-xref>.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-agents">
    <h1>Agents</h1>

    <p>An <dfn id="agent" variants="agents">agent</dfn> comprises a set of ECMAScript execution contexts, an execution context stack, a running execution context, an <dfn id="agent-record" variants="Agent Records">Agent Record</dfn>, and an <dfn id="executing-thread" variants="executing threads">executing thread</dfn>. Except for the executing thread, the constituents of an agent belong exclusively to that agent.</p>
    <p>An agent's executing thread executes algorithmic steps on the agent's execution contexts independently of other agents, except that an executing thread may be used as the executing thread by multiple agents, provided none of the agents sharing the thread have an Agent Record whose [[CanBlock]] field is *true*.</p>
    <emu-note>
      <p>Some web browsers share a single executing thread across multiple unrelated tabs of a browser window, for example.</p>
    </emu-note>
    <p>While an agent's executing thread is executing algorithmic steps, the agent is the <dfn id="surrounding-agent" variants="surrounding agents">surrounding agent</dfn> for those steps. The steps use the surrounding agent to access the specification-level execution objects held within the agent: the running execution context, the execution context stack, and the Agent Record's fields.</p>
    <p>An <dfn variants="agent signifiers">agent signifier</dfn> is a globally-unique opaque value used to identify an Agent.</p>
    <emu-table id="table-agent-record" caption="Agent Record Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[LittleEndian]]</td>
          <td>a Boolean</td>
          <td>The default value computed for the <em>isLittleEndian</em> parameter when it is needed by the algorithms GetValueFromBuffer and SetValueInBuffer. The choice is implementation-defined and should be the alternative that is most efficient for the implementation. Once the value has been observed it cannot change.</td>
        </tr>
        <tr>
          <td>[[CanBlock]]</td>
          <td>a Boolean</td>
          <td>Determines whether the agent can block or not.</td>
        </tr>
        <tr>
          <td>[[Signifier]]</td>
          <td>an agent signifier</td>
          <td>Uniquely identifies the agent within its agent cluster.</td>
        </tr>
        <tr>
          <td>[[IsLockFree1]]</td>
          <td>a Boolean</td>
          <td>*true* if atomic operations on one-<emu-not-ref>byte values</emu-not-ref> are lock-free, *false* otherwise.</td>
        </tr>
        <tr>
          <td>[[IsLockFree2]]</td>
          <td>a Boolean</td>
          <td>*true* if atomic operations on two-<emu-not-ref>byte values</emu-not-ref> are lock-free, *false* otherwise.</td>
        </tr>
        <tr>
          <td>[[IsLockFree8]]</td>
          <td>a Boolean</td>
          <td>*true* if atomic operations on eight-<emu-not-ref>byte values</emu-not-ref> are lock-free, *false* otherwise.</td>
        </tr>
        <tr>
          <td>[[CandidateExecution]]</td>
          <td>a candidate execution Record</td>
          <td>See the memory model.</td>
        </tr>
        <tr>
          <td>[[KeptAlive]]</td>
          <td>a List of either Objects or Symbols</td>
          <td>Initially a new empty List, representing the list of objects and/or symbols to be kept alive until the end of the current Job</td>
        </tr>
      </table>
    </emu-table>

    <p>Once the values of [[Signifier]], [[IsLockFree1]], and [[IsLockFree2]] have been observed by any agent in the agent cluster they cannot change.</p>

    <emu-note>
      <p>The values of [[IsLockFree1]] and [[IsLockFree2]] are not necessarily determined by the hardware, but may also reflect implementation choices that can vary over time and between ECMAScript implementations.</p>

      <p>There is no [[IsLockFree4]] field: 4-byte atomic operations are always lock-free.</p>

      <p>In practice, if an atomic operation is implemented with any type of lock the operation is not lock-free. Lock-free does not imply wait-free: there is no upper bound on how many machine steps may be required to complete a lock-free atomic operation.</p>

      <p>That an atomic access of size <em>n</em> is lock-free does not imply anything about the (perceived) atomicity of non-atomic accesses of size <em>n</em>, specifically, non-atomic accesses may still be performed as a sequence of several separate memory accesses. See ReadSharedMemory and WriteSharedMemory for details.</p>
    </emu-note>

    <emu-note>
      <p>An agent is a specification mechanism and need not correspond to any particular artefact of an ECMAScript implementation.</p>
    </emu-note>

    <emu-clause id="sec-agentsignifier" type="abstract operation">
      <h1>AgentSignifier ( ): an agent signifier</h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _AR_ be the Agent Record of the surrounding agent.
        1. Return _AR_.[[Signifier]].
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-agentcansuspend" type="abstract operation">
      <h1>AgentCanSuspend ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _AR_ be the Agent Record of the surrounding agent.
        1. Return _AR_.[[CanBlock]].
      </emu-alg>
      <emu-note>
        <p>In some environments it may not be reasonable for a given agent to suspend. For example, in a web browser environment, it may be reasonable to disallow suspending a document's main event handling thread, while still allowing workers' event handling threads to suspend.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-agent-clusters">
    <h1>Agent Clusters</h1>

    <p>An <dfn variants="agent clusters">agent cluster</dfn> is a maximal set of agents that can communicate by operating on shared memory.</p>

    <emu-note>
      <p>Programs within different agents may share memory by unspecified means. At a minimum, the backing memory for SharedArrayBuffers can be shared among the agents in the cluster.</p>

      <p>There may be agents that can communicate by message passing that cannot share memory; they are never in the same agent cluster.</p>
    </emu-note>

    <p>Every agent belongs to exactly one agent cluster.</p>

    <emu-note>
      <p>The agents in a cluster need not all be alive at some particular point in time. If agent <b>A</b> creates another agent <b>B</b>, after which <b>A</b> terminates and <b>B</b> creates agent <b>C</b>, the three agents are in the same cluster if <b>A</b> could share some memory with <b>B</b> and <b>B</b> could share some memory with <b>C</b>.</p>
    </emu-note>

    <p>All agents within a cluster must have the same value for the [[LittleEndian]] field in their respective Agent Records.</p>

    <emu-note>
      <p>If different agents within an agent cluster have different values of [[LittleEndian]] it becomes hard to use shared memory for multi-byte data.</p>
    </emu-note>

    <p>All agents within a cluster must have the same values for the [[IsLockFree1]] field in their respective Agent Records; similarly for the [[IsLockFree2]] field.</p>

    <p>All agents within a cluster must have different values for the [[Signifier]] field in their respective Agent Records.</p>

    <p>An embedding may deactivate (stop forward progress) or activate (resume forward progress) an agent without the agent's knowledge or cooperation. If the embedding does so, it must not leave some agents in the cluster active while other agents in the cluster are deactivated indefinitely.</p>

    <emu-note>
      <p>The purpose of the preceding restriction is to avoid a situation where an agent deadlocks or starves because another agent has been deactivated. For example, if an HTML shared worker that has a lifetime independent of documents in any windows were allowed to share memory with the dedicated worker of such an independent document, and the document and its dedicated worker were to be deactivated while the dedicated worker holds a lock (say, the document is pushed into its window's history), and the shared worker then tries to acquire the lock, then the shared worker will be blocked until the dedicated worker is activated again, if ever. Meanwhile other workers trying to access the shared worker from other windows will starve.</p>

      <p>The implication of the restriction is that it will not be possible to share memory between agents that don't belong to the same suspend/wake collective within the embedding.</p>
    </emu-note>

    <p>An embedding may terminate an agent without any of the agent's cluster's other agents' prior knowledge or cooperation. If an agent is terminated not by programmatic action of its own or of another agent in the cluster but by forces external to the cluster, then the embedding must choose one of two strategies: Either terminate all the agents in the cluster, or provide reliable APIs that allow the agents in the cluster to coordinate so that at least one remaining member of the cluster will be able to detect the termination, with the termination data containing enough information to identify the agent that was terminated.</p>

    <emu-note>
      <p>Examples of that type of termination are: operating systems or users terminating agents that are running in separate processes; the embedding itself terminating an agent that is running in-process with the other agents when per-agent resource accounting indicates that the agent is runaway.</p>
    </emu-note>

    <p>Each of the following specification values, and values transitively reachable from them, belong to exactly one agent cluster.</p>
    <ul>
      <li>candidate execution Record</li>
      <li>Shared Data Block</li>
      <li>WaiterList Record</li>
    </ul>

    <p>Prior to any evaluation of any ECMAScript code by any agent in a cluster, the [[CandidateExecution]] field of the Agent Record for all agents in the cluster is set to the initial candidate execution. The initial candidate execution is an empty candidate execution whose [[EventsRecords]] field is a List containing, for each agent, an Agent Events Record whose [[AgentSignifier]] field is that agent's agent signifier, and whose [[EventList]] and [[AgentSynchronizesWith]] fields are empty Lists.</p>

    <emu-note>
      <p>All agents in an agent cluster share the same candidate execution in its Agent Record's [[CandidateExecution]] field. The candidate execution is a specification mechanism used by the memory model.</p>
    </emu-note>

    <emu-note>
      <p>An agent cluster is a specification mechanism and need not correspond to any particular artefact of an ECMAScript implementation.</p>
    </emu-note>
  </emu-clause>

  <emu-clause id="sec-forward-progress">
    <h1>Forward Progress</h1>
    <p>For an agent to <em>make forward progress</em> is for it to perform an evaluation step according to this specification.</p>
    <p>An agent becomes <em>blocked</em> when its running execution context waits synchronously and indefinitely for an external event. Only agents whose Agent Record's [[CanBlock]] field is *true* can become blocked in this sense. An <em>unblocked</em> agent is one that is not blocked.</p>

    <p>Implementations must ensure that:</p>
    <ul>
      <li>every unblocked agent with a dedicated executing thread eventually makes forward progress</li>
      <li>in a set of agents that share an executing thread, one agent eventually makes forward progress</li>
      <li>an agent does not cause another agent to become blocked except via explicit APIs that provide blocking.</li>
    </ul>

    <emu-note>
      <p>This, along with the liveness guarantee in the memory model, ensures that all ~seq-cst~ writes eventually become observable to all agents.</p>
    </emu-note>
  </emu-clause>

  <emu-clause id="sec-weakref-processing-model">
    <h1>Processing Model of WeakRef and FinalizationRegistry Targets</h1>

    <emu-clause id="sec-weakref-invariants">
      <h1>Objectives</h1>

      <p>This specification does not make any guarantees that any object or symbol will be garbage collected. Objects or symbols which are not live may be released after long periods of time, or never at all. For this reason, this specification uses the term "may" when describing behaviour triggered by garbage collection.</p>

      <p>The semantics of WeakRefs and FinalizationRegistrys is based on two operations which happen at particular points in time:</p>

      <ul>
        <li>
          When `WeakRef.prototype.deref` is called, the referent (if *undefined* is not returned) is kept alive so that subsequent, synchronous accesses also return the same value. This list is reset when synchronous work is done using the ClearKeptObjects abstract operation.
        </li>

        <li>
          When an object or symbol which is registered with a FinalizationRegistry becomes unreachable, a call of the FinalizationRegistry's cleanup callback may eventually be made, after synchronous ECMAScript execution completes. The FinalizationRegistry cleanup is performed with the CleanupFinalizationRegistry abstract operation.
        </li>
      </ul>

      <p>Neither of these actions (ClearKeptObjects or CleanupFinalizationRegistry) may interrupt synchronous ECMAScript execution. Because hosts may assemble longer, synchronous ECMAScript execution runs, this specification defers the scheduling of ClearKeptObjects and CleanupFinalizationRegistry to the host environment.</p>

      <p>Some ECMAScript implementations include garbage collector implementations which run in the background, including when ECMAScript is idle. Letting the host environment schedule CleanupFinalizationRegistry allows it to resume ECMAScript execution in order to run finalizer work, which may free up held values, reducing overall memory usage.</p>
    </emu-clause>

    <emu-clause id="sec-liveness">
      <h1>Liveness</h1>

      <p>For some set of objects and/or symbols _S_ a <dfn>hypothetical WeakRef-oblivious</dfn> execution with respect to _S_ is an execution whereby the abstract operation WeakRefDeref of a WeakRef whose referent is an element of _S_ always returns *undefined*.</p>

      <emu-note>
        WeakRef-obliviousness, together with liveness, capture two notions. One, that a WeakRef itself does not keep its referent alive. Two, that cycles in liveness does not imply that a value is live. To be concrete, if determining _v_'s liveness depends on determining the liveness of a WeakRef referent, _r_, _r_'s liveness cannot assume _v_'s liveness, which would be circular reasoning.
      </emu-note>
      <emu-note>
        WeakRef-obliviousness is defined on sets of objects or symbols instead of individual values to account for cycles. If it were defined on individual values, then a WeakRef referent in a cycle will be considered live even though its identity is only observed via other WeakRef referents in the cycle.
      </emu-note>
      <emu-note>
        Colloquially, we say that an individual object or symbol is live if every set containing it is live.
      </emu-note>

      <p>At any point during evaluation, a set of objects and/or symbols _S_ is considered <dfn>live</dfn> if either of the following conditions is met:</p>

      <ul>
        <li>
          Any element in _S_ is included in any agent's [[KeptAlive]] List.
        </li>
        <li>
          There exists a valid future hypothetical WeakRef-oblivious execution with respect to _S_ that observes the identity of any value in _S_.
        </li>
      </ul>
      <emu-note>
        The second condition above intends to capture the intuition that a value is live if its identity is observable via non-WeakRef means. A value's identity may be observed by observing a strict equality comparison or observing the value being used as key in a Map.
      </emu-note>
      <emu-note>
        <p>Presence of an object or a symbol in a field, an internal slot, or a property does not imply that the value is live. For example if the value in question is never passed back to the program, then it cannot be observed.</p>

        <p>This is the case for keys in a WeakMap, members of a WeakSet, as well as the [[WeakRefTarget]] and [[UnregisterToken]] fields of a FinalizationRegistry Cell record.</p>

        <p>The above definition implies that, if a key in a WeakMap is not live, then its corresponding value is not necessarily live either.</p>
      </emu-note>
      <emu-note>
        Liveness is the lower bound for guaranteeing which WeakRefs engines must not empty. Liveness as defined here is undecidable. In practice, engines use conservative approximations such as reachability. There is expected to be significant implementation leeway.
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-weakref-execution">
      <h1>Execution</h1>

      <p>At any time, if a set of objects and/or symbols _S_ is not live, an ECMAScript implementation may perform the following steps atomically:</p>

      <emu-alg>
        1. For each element _value_ of _S_, do
          1. For each WeakRef _ref_ such that _ref_.[[WeakRefTarget]] is _value_, do
            1. Set _ref_.[[WeakRefTarget]] to ~empty~.
          1. For each FinalizationRegistry _fg_ such that _fg_.[[Cells]] contains a Record _cell_ such that _cell_.[[WeakRefTarget]] is _value_, do
            1. Set _cell_.[[WeakRefTarget]] to ~empty~.
            1. Optionally, perform HostEnqueueFinalizationRegistryCleanupJob(_fg_).
          1. For each WeakMap _map_ such that _map_.[[WeakMapData]] contains a Record _r_ such that _r_.[[Key]] is _value_, do
            1. Set _r_.[[Key]] to ~empty~.
            1. Set _r_.[[Value]] to ~empty~.
          1. For each WeakSet _set_ such that _set_.[[WeakSetData]] contains _value_, do
            1. Replace the element of _set_.[[WeakSetData]] whose value is _value_ with an element whose value is ~empty~.
      </emu-alg>

      <emu-note>
        <p>Together with the definition of liveness, this clause prescribes optimizations that an implementation may apply regarding WeakRefs.</p>

        <p>It is possible to access an object without observing its identity. Optimizations such as dead variable elimination and scalar replacement on properties of non-escaping objects whose identity is not observed are allowed. These optimizations are thus allowed to observably empty WeakRefs that point to such objects.</p>

        <p>On the other hand, if an object's identity is observable, and that object is in the [[WeakRefTarget]] internal slot of a WeakRef, optimizations such as rematerialization that observably empty the WeakRef are prohibited.</p>

        <p>Because calling HostEnqueueFinalizationRegistryCleanupJob is optional, registered objects in a FinalizationRegistry do not necessarily hold that FinalizationRegistry live. Implementations may omit FinalizationRegistry callbacks for any reason, e.g., if the FinalizationRegistry itself becomes dead, or if the application is shutting down.</p>
      </emu-note>
      <emu-note>
        <p>Implementations are not obligated to empty WeakRefs for maximal sets of non-live objects or symbols.</p>
        <p>If an implementation chooses a non-live set _S_ in which to empty WeakRefs, this definition requires that it empties WeakRefs for all values in _S_ simultaneously. In other words, it is not conformant for an implementation to empty a WeakRef pointing to a value _v_ without emptying out other WeakRefs that, if not emptied, could result in an execution that observes the value of _v_.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-weakref-host-hooks">
      <h1>Host Hooks</h1>

      <emu-clause id="sec-host-cleanup-finalization-registry" type="host-defined abstract operation">
        <h1>
          HostEnqueueFinalizationRegistryCleanupJob (
            _finalizationRegistry_: a FinalizationRegistry,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <p>Let _cleanupJob_ be a new Job Abstract Closure with no parameters that captures _finalizationRegistry_ and performs the following steps when called:</p>
        <emu-alg>
          1. Let _cleanupResult_ be Completion(CleanupFinalizationRegistry(_finalizationRegistry_)).
          1. If _cleanupResult_ is an abrupt completion, perform any host-defined steps for reporting the error.
          1. Return ~unused~.
        </emu-alg>
        <p>An implementation of HostEnqueueFinalizationRegistryCleanupJob schedules _cleanupJob_ to be performed at some future time, if possible. It must also conform to the requirements in <emu-xref href="#sec-jobs"></emu-xref>.</p>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-clear-kept-objects" type="abstract operation">
    <h1>ClearKeptObjects ( ): ~unused~</h1>
    <dl class="header">
      <dt>description</dt>
      <dd>ECMAScript implementations are expected to call ClearKeptObjects when a synchronous sequence of ECMAScript executions completes.</dd>
    </dl>
    <emu-alg>
      1. Let _agentRecord_ be the surrounding agent's Agent Record.
      1. Set _agentRecord_.[[KeptAlive]] to a new empty List.
      1. Return ~unused~.
    </emu-alg>
  </emu-clause>

  <emu-clause id="sec-addtokeptobjects" type="abstract operation">
    <h1>
      AddToKeptObjects (
        _value_: an Object or a Symbol,
      ): ~unused~
    </h1>
    <dl class="header">
    </dl>
    <emu-alg>
      1. Let _agentRecord_ be the surrounding agent's Agent Record.
      1. Append _value_ to _agentRecord_.[[KeptAlive]].
      1. Return ~unused~.
    </emu-alg>
    <emu-note>
      When the abstract operation AddToKeptObjects is called with a target object or symbol, it adds the target to a list that will point strongly at the target until ClearKeptObjects is called.
    </emu-note>
  </emu-clause>

  <emu-clause id="sec-cleanup-finalization-registry" type="abstract operation">
    <h1>
      CleanupFinalizationRegistry (
        _finalizationRegistry_: a FinalizationRegistry,
      ): either a normal completion containing ~unused~ or a throw completion
    </h1>
    <dl class="header">
    </dl>
    <emu-alg>
      1. Assert: _finalizationRegistry_ has [[Cells]] and [[CleanupCallback]] internal slots.
      1. Let _callback_ be _finalizationRegistry_.[[CleanupCallback]].
      1. While _finalizationRegistry_.[[Cells]] contains a Record _cell_ such that _cell_.[[WeakRefTarget]] is ~empty~, an implementation may perform the following steps:
        1. Choose any such _cell_.
        1. Remove _cell_ from _finalizationRegistry_.[[Cells]].
        1. Perform ? HostCallJobCallback(_callback_, *undefined*, « _cell_.[[HeldValue]] »).
      1. Return ~unused~.
    </emu-alg>
  </emu-clause>

  <emu-clause id="sec-canbeheldweakly" type="abstract operation">
    <h1>
      CanBeHeldWeakly (
        _v_: an ECMAScript language value,
      ): a Boolean
    </h1>
    <dl class="header">
      <dt>description</dt>
      <dd>It returns *true* if and only if _v_ is suitable for use as a weak reference. Only values that are suitable for use as a weak reference may be a key of a WeakMap, an element of a WeakSet, the target of a WeakRef, or one of the targets of a FinalizationRegistry.</dd>
    </dl>
    <emu-alg>
      1. If _v_ is an Object, return *true*.
      1. If _v_ is a Symbol and KeyForSymbol(_v_) is *undefined*, return *true*.
      1. Return *false*.
    </emu-alg>
    <emu-note>
      <p>A language value without <emu-xref href="#sec-identity">language identity</emu-xref> can be manifested without prior reference and is unsuitable for use as a weak reference. A Symbol value produced by <emu-xref href="#sec-symbol.for">Symbol.for</emu-xref>, unlike other Symbol values, does not have language identity and is unsuitable for use as a weak reference. <emu-xref href="#sec-well-known-symbols">Well-known symbols</emu-xref> are likely to never be collected, but are nonetheless treated as suitable for use as a weak reference because they are limited in number and therefore manageable by a variety of implementation approaches. However, any value associated to a well-known symbol in a live WeakMap is unlikely to be collected and could “leak” memory resources in implementations.</p>
    </emu-note>
  </emu-clause>

<h1 id="sec-ordinary-and-exotic-objects-behaviours"></h1>
