# ECMAScript Language: Statements and Declarations
<h2>Syntax</h2>
<emu-grammar type="definition">
Statement[Yield, Await, Return] :
BlockStatement[?Yield, ?Await, ?Return]
VariableStatement[?Yield, ?Await]
EmptyStatement
ExpressionStatement[?Yield, ?Await]
IfStatement[?Yield, ?Await, ?Return]
BreakableStatement[?Yield, ?Await, ?Return]
ContinueStatement[?Yield, ?Await]
BreakStatement[?Yield, ?Await]
[+Return] ReturnStatement[?Yield, ?Await]
WithStatement[?Yield, ?Await, ?Return]
LabelledStatement[?Yield, ?Await, ?Return]
ThrowStatement[?Yield, ?Await]
TryStatement[?Yield, ?Await, ?Return]
DebuggerStatement

    Declaration[Yield, Await] :
      HoistableDeclaration[?Yield, ?Await, ~Default]
      ClassDeclaration[?Yield, ?Await, ~Default]
      LexicalDeclaration[+In, ?Yield, ?Await]

    HoistableDeclaration[Yield, Await, Default] :
      FunctionDeclaration[?Yield, ?Await, ?Default]
      GeneratorDeclaration[?Yield, ?Await, ?Default]
      AsyncFunctionDeclaration[?Yield, ?Await, ?Default]
      AsyncGeneratorDeclaration[?Yield, ?Await, ?Default]

    BreakableStatement[Yield, Await, Return] :
      IterationStatement[?Yield, ?Await, ?Return]
      SwitchStatement[?Yield, ?Await, ?Return]
  </emu-grammar>

  <emu-clause id="sec-statement-semantics">
    <h1>Statement Semantics</h1>

    <emu-clause id="sec-statement-semantics-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        HoistableDeclaration :
          GeneratorDeclaration
          AsyncFunctionDeclaration
          AsyncGeneratorDeclaration
      </emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>
        HoistableDeclaration : FunctionDeclaration
      </emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |FunctionDeclaration|.
      </emu-alg>
      <emu-grammar>
        BreakableStatement :
          IterationStatement
          SwitchStatement
      </emu-grammar>
      <emu-alg>
        1. Let _newLabelSet_ be a new empty List.
        1. Return ? LabelledEvaluation of this |BreakableStatement| with argument _newLabelSet_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-block">
    <h1>Block</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      BlockStatement[Yield, Await, Return] :
        Block[?Yield, ?Await, ?Return]

      Block[Yield, Await, Return] :
        `{` StatementList[?Yield, ?Await, ?Return]? `}`

      StatementList[Yield, Await, Return] :
        StatementListItem[?Yield, ?Await, ?Return]
        StatementList[?Yield, ?Await, ?Return] StatementListItem[?Yield, ?Await, ?Return]

      StatementListItem[Yield, Await, Return] :
        Statement[?Yield, ?Await, ?Return]
        Declaration[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-block-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>Block : `{` StatementList `}`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the LexicallyDeclaredNames of |StatementList| contains any duplicate entries.
        </li>
        <li>
          It is a Syntax Error if any element of the LexicallyDeclaredNames of |StatementList| also occurs in the VarDeclaredNames of |StatementList|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-block-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>Block : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>Block : `{` StatementList `}`</emu-grammar>
      <emu-alg>
        1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
        1. Let _blockEnv_ be NewDeclarativeEnvironment(_oldEnv_).
        1. Perform BlockDeclarationInstantiation(|StatementList|, _blockEnv_).
        1. Set the running execution context's LexicalEnvironment to _blockEnv_.
        1. Let _blockValue_ be Completion(Evaluation of |StatementList|).
        1. Set the running execution context's LexicalEnvironment to _oldEnv_.
        1. Return ? _blockValue_.
      </emu-alg>
      <emu-note>
        <p>No matter how control leaves the |Block| the LexicalEnvironment is always restored to its former state.</p>
      </emu-note>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _sl_ be ? Evaluation of |StatementList|.
        1. Let _s_ be Completion(Evaluation of |StatementListItem|).
        1. Return ? UpdateEmpty(_s_, _sl_).
      </emu-alg>
      <emu-note>
        <p>The value of a |StatementList| is the value of the last value-producing item in the |StatementList|. For example, the following calls to the `eval` function all return the value 1:</p>
        <pre><code class="javascript">
          eval("1;;;;;")
          eval("1;{}")
          eval("1;var a;")
        </code></pre>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-blockdeclarationinstantiation" type="abstract operation">
      <h1>
        BlockDeclarationInstantiation (
          _code_: a Parse Node,
          _env_: a Declarative Environment Record,
        ): ~unused~
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>_code_ is the Parse Node corresponding to the body of the block. _env_ is the Environment Record in which bindings are to be created.</dd>
      </dl>
      <emu-note>
        <p>When a |Block| or |CaseBlock| is evaluated a new Declarative Environment Record is created and bindings for each block scoped variable, constant, function, or class declared in the block are instantiated in the Environment Record.</p>
      </emu-note>
      <p>It performs the following steps when called:</p>
      <!--
        WARNING: If you add, remove, rename, or repurpose any variable names
                 within this algorithm, you may need to update
                 #sec-web-compat-blockdeclarationinstantiation accordingly.
      -->
      <emu-alg>
        1. Let _declarations_ be the LexicallyScopedDeclarations of _code_.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. For each element _d_ of _declarations_, do
          1. For each element _dn_ of the BoundNames of _d_, do
            1. If IsConstantDeclaration of _d_ is *true*, then
              1. Perform ! _env_.CreateImmutableBinding(_dn_, *true*).
            1. Else,
              1. [id="step-blockdeclarationinstantiation-createmutablebinding"] Perform ! _env_.CreateMutableBinding(_dn_, *false*). NOTE: This step is replaced in section <emu-xref href="#sec-web-compat-blockdeclarationinstantiation"></emu-xref>.
          1. If _d_ is either a |FunctionDeclaration|, a |GeneratorDeclaration|, an |AsyncFunctionDeclaration|, or an |AsyncGeneratorDeclaration|, then
            1. Let _fn_ be the sole element of the BoundNames of _d_.
            1. Let _fo_ be InstantiateFunctionObject of _d_ with arguments _env_ and _privateEnv_.
            1. [id="step-blockdeclarationinstantiation-initializebinding"] Perform ! _env_.InitializeBinding(_fn_, _fo_). NOTE: This step is replaced in section <emu-xref href="#sec-web-compat-blockdeclarationinstantiation"></emu-xref>.
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-declarations-and-the-variable-statement">
    <h1>Declarations and the Variable Statement</h1>

    <emu-clause id="sec-let-and-const-declarations">
      <h1>Let and Const Declarations</h1>
      <emu-note>
        <p>`let` and `const` declarations define variables that are scoped to the running execution context's LexicalEnvironment. The variables are created when their containing Environment Record is instantiated but may not be accessed in any way until the variable's |LexicalBinding| is evaluated. A variable defined by a |LexicalBinding| with an |Initializer| is assigned the value of its |Initializer|'s |AssignmentExpression| when the |LexicalBinding| is evaluated, not when the variable is created. If a |LexicalBinding| in a `let` declaration does not have an |Initializer| the variable is assigned the value *undefined* when the |LexicalBinding| is evaluated.</p>
      </emu-note>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        LexicalDeclaration[In, Yield, Await] :
          LetOrConst BindingList[?In, ?Yield, ?Await] `;`

        LetOrConst :
          `let`
          `const`

        BindingList[In, Yield, Await] :
          LexicalBinding[?In, ?Yield, ?Await]
          BindingList[?In, ?Yield, ?Await] `,` LexicalBinding[?In, ?Yield, ?Await]

        LexicalBinding[In, Yield, Await] :
          BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]?
          BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-let-and-const-declarations-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>LexicalDeclaration : LetOrConst BindingList `;`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the BoundNames of |BindingList| contains *"let"*.
          </li>
          <li>
            It is a Syntax Error if the BoundNames of |BindingList| contains any duplicate entries.
          </li>
        </ul>
        <emu-grammar>LexicalBinding : BindingIdentifier Initializer?</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if |Initializer| is not present and IsConstantDeclaration of the |LexicalDeclaration| containing this |LexicalBinding| is *true*.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-let-and-const-declarations-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>LexicalDeclaration : LetOrConst BindingList `;`</emu-grammar>
        <emu-alg>
          1. Perform ? Evaluation of |BindingList|.
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>BindingList : BindingList `,` LexicalBinding</emu-grammar>
        <emu-alg>
          1. Perform ? Evaluation of |BindingList|.
          1. Return ? Evaluation of |LexicalBinding|.
        </emu-alg>
        <emu-grammar>LexicalBinding : BindingIdentifier</emu-grammar>
        <emu-alg>
          1. Let _lhs_ be ! ResolveBinding(StringValue of |BindingIdentifier|).
          1. Perform ! InitializeReferencedBinding(_lhs_, *undefined*).
          1. Return ~empty~.
        </emu-alg>
        <emu-note>
          <p>A static semantics rule ensures that this form of |LexicalBinding| never occurs in a `const` declaration.</p>
        </emu-note>
        <emu-grammar>LexicalBinding : BindingIdentifier Initializer</emu-grammar>
        <emu-alg>
          1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
          1. Let _lhs_ be ! ResolveBinding(_bindingId_).
          1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
            1. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
          1. Else,
            1. Let _rhs_ be ? Evaluation of |Initializer|.
            1. Let _value_ be ? GetValue(_rhs_).
          1. Perform ! InitializeReferencedBinding(_lhs_, _value_).
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>LexicalBinding : BindingPattern Initializer</emu-grammar>
        <emu-alg>
          1. Let _rhs_ be ? Evaluation of |Initializer|.
          1. Let _value_ be ? GetValue(_rhs_).
          1. Let _env_ be the running execution context's LexicalEnvironment.
          1. Return ? BindingInitialization of |BindingPattern| with arguments _value_ and _env_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-variable-statement">
      <h1>Variable Statement</h1>
      <emu-note>
        <p>A `var` statement declares variables that are scoped to the running execution context's VariableEnvironment. Var variables are created when their containing Environment Record is instantiated and are initialized to *undefined* when created. Within the scope of any VariableEnvironment a common |BindingIdentifier| may appear in more than one |VariableDeclaration| but those declarations collectively define only one variable. A variable defined by a |VariableDeclaration| with an |Initializer| is assigned the value of its |Initializer|'s |AssignmentExpression| when the |VariableDeclaration| is executed, not when the variable is created.</p>
      </emu-note>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        VariableStatement[Yield, Await] :
          `var` VariableDeclarationList[+In, ?Yield, ?Await] `;`

        VariableDeclarationList[In, Yield, Await] :
          VariableDeclaration[?In, ?Yield, ?Await]
          VariableDeclarationList[?In, ?Yield, ?Await] `,` VariableDeclaration[?In, ?Yield, ?Await]

        VariableDeclaration[In, Yield, Await] :
          BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]?
          BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-variable-statement-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>VariableStatement : `var` VariableDeclarationList `;`</emu-grammar>
        <emu-alg>
          1. Perform ? Evaluation of |VariableDeclarationList|.
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>VariableDeclarationList : VariableDeclarationList `,` VariableDeclaration</emu-grammar>
        <emu-alg>
          1. Perform ? Evaluation of |VariableDeclarationList|.
          1. Return ? Evaluation of |VariableDeclaration|.
        </emu-alg>
        <emu-grammar>VariableDeclaration : BindingIdentifier</emu-grammar>
        <emu-alg>
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>VariableDeclaration : BindingIdentifier Initializer</emu-grammar>
        <emu-alg>
          1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
          1. Let _lhs_ be ? ResolveBinding(_bindingId_).
          1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
            1. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
          1. Else,
            1. Let _rhs_ be ? Evaluation of |Initializer|.
            1. Let _value_ be ? GetValue(_rhs_).
          1. [id="step-vardecllist-evaluation-putvalue"] Perform ? PutValue(_lhs_, _value_).
          1. Return ~empty~.
        </emu-alg>
        <emu-note>
          <p>If a |VariableDeclaration| is nested within a with statement and the |BindingIdentifier| in the |VariableDeclaration| is the same as a property name of the binding object of the with statement's Object Environment Record, then step <emu-xref href="#step-vardecllist-evaluation-putvalue"></emu-xref> will assign _value_ to the property instead of assigning to the VariableEnvironment binding of the |Identifier|.</p>
        </emu-note>
        <emu-grammar>VariableDeclaration : BindingPattern Initializer</emu-grammar>
        <emu-alg>
          1. Let _rhs_ be ? Evaluation of |Initializer|.
          1. Let _rVal_ be ? GetValue(_rhs_).
          1. Return ? BindingInitialization of |BindingPattern| with arguments _rVal_ and *undefined*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-destructuring-binding-patterns">
      <h1>Destructuring Binding Patterns</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        BindingPattern[Yield, Await] :
          ObjectBindingPattern[?Yield, ?Await]
          ArrayBindingPattern[?Yield, ?Await]

        ObjectBindingPattern[Yield, Await] :
          `{` `}`
          `{` BindingRestProperty[?Yield, ?Await] `}`
          `{` BindingPropertyList[?Yield, ?Await] `}`
          `{` BindingPropertyList[?Yield, ?Await] `,` BindingRestProperty[?Yield, ?Await]? `}`

        ArrayBindingPattern[Yield, Await] :
          `[` Elision? BindingRestElement[?Yield, ?Await]? `]`
          `[` BindingElementList[?Yield, ?Await] `]`
          `[` BindingElementList[?Yield, ?Await] `,` Elision? BindingRestElement[?Yield, ?Await]? `]`

        BindingRestProperty[Yield, Await] :
          `...` BindingIdentifier[?Yield, ?Await]

        BindingPropertyList[Yield, Await] :
          BindingProperty[?Yield, ?Await]
          BindingPropertyList[?Yield, ?Await] `,` BindingProperty[?Yield, ?Await]

        BindingElementList[Yield, Await] :
          BindingElisionElement[?Yield, ?Await]
          BindingElementList[?Yield, ?Await] `,` BindingElisionElement[?Yield, ?Await]

        BindingElisionElement[Yield, Await] :
          Elision? BindingElement[?Yield, ?Await]

        BindingProperty[Yield, Await] :
          SingleNameBinding[?Yield, ?Await]
          PropertyName[?Yield, ?Await] `:` BindingElement[?Yield, ?Await]

        BindingElement[Yield, Await] :
          SingleNameBinding[?Yield, ?Await]
          BindingPattern[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]?

        SingleNameBinding[Yield, Await] :
          BindingIdentifier[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]?

        BindingRestElement[Yield, Await] :
          `...` BindingIdentifier[?Yield, ?Await]
          `...` BindingPattern[?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-destructuring-binding-patterns-runtime-semantics-propertybindinginitialization" type="sdo">
        <h1>
          Runtime Semantics: PropertyBindingInitialization (
            _value_: an ECMAScript language value,
            _environment_: an Environment Record or *undefined*,
          ): either a normal completion containing a List of property keys or an abrupt completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It collects a list of all bound property names.</dd>
        </dl>
        <emu-grammar>BindingPropertyList : BindingPropertyList `,` BindingProperty</emu-grammar>
        <emu-alg>
          1. Let _boundNames_ be ? PropertyBindingInitialization of |BindingPropertyList| with arguments _value_ and _environment_.
          1. Let _nextNames_ be ? PropertyBindingInitialization of |BindingProperty| with arguments _value_ and _environment_.
          1. Return the list-concatenation of _boundNames_ and _nextNames_.
        </emu-alg>

        <emu-grammar>BindingProperty : SingleNameBinding</emu-grammar>
        <emu-alg>
          1. Let _name_ be the sole element of the BoundNames of |SingleNameBinding|.
          1. Perform ? KeyedBindingInitialization of |SingleNameBinding| with arguments _value_, _environment_, and _name_.
          1. Return « _name_ ».
        </emu-alg>

        <emu-grammar>BindingProperty : PropertyName `:` BindingElement</emu-grammar>
        <emu-alg>
          1. Let _P_ be ? Evaluation of |PropertyName|.
          1. Perform ? KeyedBindingInitialization of |BindingElement| with arguments _value_, _environment_, and _P_.
          1. Return « _P_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-destructuring-binding-patterns-runtime-semantics-restbindinginitialization" type="sdo">
        <h1>
          Runtime Semantics: RestBindingInitialization (
            _value_: an ECMAScript language value,
            _environment_: an Environment Record or *undefined*,
            _excludedNames_: a List of property keys,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>BindingRestProperty : `...` BindingIdentifier</emu-grammar>
        <emu-alg>
          1. Let _lhs_ be ? ResolveBinding(StringValue of |BindingIdentifier|, _environment_).
          1. Let _restObj_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Perform ? CopyDataProperties(_restObj_, _value_, _excludedNames_).
          1. If _environment_ is *undefined*, return ? PutValue(_lhs_, _restObj_).
          1. Return ? InitializeReferencedBinding(_lhs_, _restObj_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-keyedbindinginitialization" type="sdo">
        <h1>
          Runtime Semantics: KeyedBindingInitialization (
            _value_: an ECMAScript language value,
            _environment_: an Environment Record or *undefined*,
            _propertyName_: a property key,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>When *undefined* is passed for _environment_ it indicates that a PutValue operation should be used to assign the initialization value. This is the case for formal parameter lists of non-strict functions. In that case the formal parameter bindings are preinitialized in order to deal with the possibility of multiple parameters with the same name.</p>
        </emu-note>
        <emu-grammar>BindingElement : BindingPattern Initializer?</emu-grammar>
        <emu-alg>
          1. Let _v_ be ? GetV(_value_, _propertyName_).
          1. If |Initializer| is present and _v_ is *undefined*, then
            1. Let _defaultValue_ be ? Evaluation of |Initializer|.
            1. Set _v_ to ? GetValue(_defaultValue_).
          1. Return ? BindingInitialization of |BindingPattern| with arguments _v_ and _environment_.
        </emu-alg>
        <emu-grammar>SingleNameBinding : BindingIdentifier Initializer?</emu-grammar>
        <emu-alg>
          1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
          1. Let _lhs_ be ? ResolveBinding(_bindingId_, _environment_).
          1. Let _v_ be ? GetV(_value_, _propertyName_).
          1. If |Initializer| is present and _v_ is *undefined*, then
            1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
              1. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
            1. Else,
              1. Let _defaultValue_ be ? Evaluation of |Initializer|.
              1. Set _v_ to ? GetValue(_defaultValue_).
          1. If _environment_ is *undefined*, return ? PutValue(_lhs_, _v_).
          1. Return ? InitializeReferencedBinding(_lhs_, _v_).
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-empty-statement">
    <h1>Empty Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      EmptyStatement :
        `;`
    </emu-grammar>

    <emu-clause id="sec-empty-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>EmptyStatement : `;`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-expression-statement">
    <h1>Expression Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ExpressionStatement[Yield, Await] :
        [lookahead &notin; { `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` }] Expression[+In, ?Yield, ?Await] `;`
    </emu-grammar>
    <emu-note>
      <p>An |ExpressionStatement| cannot start with a U+007B (LEFT CURLY BRACKET) because that might make it ambiguous with a |Block|. An |ExpressionStatement| cannot start with the `function` or `class` keywords because that would make it ambiguous with a |FunctionDeclaration|, a |GeneratorDeclaration|, or a |ClassDeclaration|. An |ExpressionStatement| cannot start with `async function` because that would make it ambiguous with an |AsyncFunctionDeclaration| or a |AsyncGeneratorDeclaration|. An |ExpressionStatement| cannot start with the two token sequence `let [` because that would make it ambiguous with a `let` |LexicalDeclaration| whose first |LexicalBinding| was an |ArrayBindingPattern|.</p>
    </emu-note>

    <emu-clause id="sec-expression-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ExpressionStatement : Expression `;`</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Return ? GetValue(_exprRef_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-if-statement">
    <h1>The `if` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      IfStatement[Yield, Await, Return] :
        `if` `(` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return] `else` Statement[?Yield, ?Await, ?Return]
        `if` `(` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return] [lookahead != `else`]
    </emu-grammar>
    <emu-note>The lookahead-restriction [lookahead ≠ `else`] resolves the classic "dangling else" problem in the usual way. That is, when the choice of associated `if` is otherwise ambiguous, the `else` is associated with the nearest (innermost) of the candidate `if`s</emu-note>

    <emu-clause id="sec-if-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsLabelledFunction(the first |Statement|) is *true*.
        </li>
        <li>
          It is a Syntax Error if IsLabelledFunction(the second |Statement|) is *true*.
        </li>
      </ul>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
        </li>
      </ul>
      <emu-note>
        <p>It is only necessary to apply this rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-if-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Let _exprValue_ be ToBoolean(? GetValue(_exprRef_)).
        1. If _exprValue_ is *true*, then
          1. Let _stmtCompletion_ be Completion(Evaluation of the first |Statement|).
        1. Else,
          1. Let _stmtCompletion_ be Completion(Evaluation of the second |Statement|).
        1. Return ? UpdateEmpty(_stmtCompletion_, *undefined*).
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Let _exprValue_ be ToBoolean(? GetValue(_exprRef_)).
        1. If _exprValue_ is *false*, then
          1. Return *undefined*.
        1. Else,
          1. Let _stmtCompletion_ be Completion(Evaluation of |Statement|).
          1. Return ? UpdateEmpty(_stmtCompletion_, *undefined*).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-iteration-statements">
    <h1>Iteration Statements</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      IterationStatement[Yield, Await, Return] :
        DoWhileStatement[?Yield, ?Await, ?Return]
        WhileStatement[?Yield, ?Await, ?Return]
        ForStatement[?Yield, ?Await, ?Return]
        ForInOfStatement[?Yield, ?Await, ?Return]
    </emu-grammar>

    <emu-clause id="sec-iteration-statements-semantics">
      <h1>Semantics</h1>

      <emu-clause id="sec-loopcontinues" type="abstract operation">
        <h1>
          LoopContinues (
            _completion_: a Completion Record,
            _labelSet_: a List of Strings,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _completion_ is a normal completion, return *true*.
          1. If _completion_ is not a continue completion, return *false*.
          1. If _completion_.[[Target]] is ~empty~, return *true*.
          1. If _labelSet_ contains _completion_.[[Target]], return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-note>
          <p>Within the |Statement| part of an |IterationStatement| a |ContinueStatement| may be used to begin a new iteration.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-loopevaluation" type="sdo">
        <h1>
          Runtime Semantics: LoopEvaluation (
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>IterationStatement : DoWhileStatement</emu-grammar>
        <emu-alg>
          1. Return ? DoWhileLoopEvaluation of |DoWhileStatement| with argument _labelSet_.
        </emu-alg>
        <emu-grammar>IterationStatement : WhileStatement</emu-grammar>
        <emu-alg>
          1. Return ? WhileLoopEvaluation of |WhileStatement| with argument _labelSet_.
        </emu-alg>
        <emu-grammar>IterationStatement : ForStatement</emu-grammar>
        <emu-alg>
          1. Return ? ForLoopEvaluation of |ForStatement| with argument _labelSet_.
        </emu-alg>
        <emu-grammar>IterationStatement : ForInOfStatement</emu-grammar>
        <emu-alg>
          1. Return ? ForInOfLoopEvaluation of |ForInOfStatement| with argument _labelSet_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-do-while-statement">
      <h1>The `do`-`while` Statement</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        DoWhileStatement[Yield, Await, Return] :
          `do` Statement[?Yield, ?Await, ?Return] `while` `(` Expression[+In, ?Yield, ?Await] `)` `;`
      </emu-grammar>

      <emu-clause id="sec-do-while-statement-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
          </li>
        </ul>
        <emu-note>
          <p>It is only necessary to apply this rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-dowhileloopevaluation" oldids="sec-do-while-statement-runtime-semantics-labelledevaluation" type="sdo">
        <h1>
          Runtime Semantics: DoWhileLoopEvaluation (
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
        <emu-alg>
          1. Let _V_ be *undefined*.
          1. Repeat,
            1. Let _stmtResult_ be Completion(Evaluation of |Statement|).
            1. If LoopContinues(_stmtResult_, _labelSet_) is *false*, return ? UpdateEmpty(_stmtResult_, _V_).
            1. If _stmtResult_.[[Value]] is not ~empty~, set _V_ to _stmtResult_.[[Value]].
            1. Let _exprRef_ be ? Evaluation of |Expression|.
            1. Let _exprValue_ be ? GetValue(_exprRef_).
            1. If ToBoolean(_exprValue_) is *false*, return _V_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-while-statement">
      <h1>The `while` Statement</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        WhileStatement[Yield, Await, Return] :
          `while` `(` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
      </emu-grammar>

      <emu-clause id="sec-while-statement-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
          </li>
        </ul>
        <emu-note>
          <p>It is only necessary to apply this rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-whileloopevaluation" oldids="sec-while-statement-runtime-semantics-labelledevaluation" type="sdo">
        <h1>
          Runtime Semantics: WhileLoopEvaluation (
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _V_ be *undefined*.
          1. Repeat,
            1. Let _exprRef_ be ? Evaluation of |Expression|.
            1. Let _exprValue_ be ? GetValue(_exprRef_).
            1. If ToBoolean(_exprValue_) is *false*, return _V_.
            1. Let _stmtResult_ be Completion(Evaluation of |Statement|).
            1. If LoopContinues(_stmtResult_, _labelSet_) is *false*, return ? UpdateEmpty(_stmtResult_, _V_).
            1. If _stmtResult_.[[Value]] is not ~empty~, set _V_ to _stmtResult_.[[Value]].
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-for-statement">
      <h1>The `for` Statement</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        ForStatement[Yield, Await, Return] :
          `for` `(` [lookahead != `let` `[`] Expression[~In, ?Yield, ?Await]? `;` Expression[+In, ?Yield, ?Await]? `;` Expression[+In, ?Yield, ?Await]? `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` `var` VariableDeclarationList[~In, ?Yield, ?Await] `;` Expression[+In, ?Yield, ?Await]? `;` Expression[+In, ?Yield, ?Await]? `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` LexicalDeclaration[~In, ?Yield, ?Await] Expression[+In, ?Yield, ?Await]? `;` Expression[+In, ?Yield, ?Await]? `)` Statement[?Yield, ?Await, ?Return]
      </emu-grammar>

      <emu-clause id="sec-for-statement-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          ForStatement :
            `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement
            `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
            `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
          </li>
        </ul>
        <emu-note>
          <p>It is only necessary to apply this rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
        </emu-note>
        <emu-grammar>ForStatement : `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if any element of the BoundNames of |LexicalDeclaration| also occurs in the VarDeclaredNames of |Statement|.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-forloopevaluation" oldids="sec-for-statement-runtime-semantics-labelledevaluation" type="sdo">
        <h1>
          Runtime Semantics: ForLoopEvaluation (
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ForStatement : `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement</emu-grammar>
        <emu-alg>
          1. If the first |Expression| is present, then
            1. Let _exprRef_ be ? Evaluation of the first |Expression|.
            1. Perform ? GetValue(_exprRef_).
          1. If the second |Expression| is present, let _test_ be the second |Expression|; otherwise, let _test_ be ~empty~.
          1. If the third |Expression| is present, let _increment_ be the third |Expression|; otherwise, let _increment_ be ~empty~.
          1. Return ? ForBodyEvaluation(_test_, _increment_, |Statement|, « », _labelSet_).
        </emu-alg>
        <emu-grammar>ForStatement : `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement</emu-grammar>
        <emu-alg>
          1. Perform ? Evaluation of |VariableDeclarationList|.
          1. If the first |Expression| is present, let _test_ be the first |Expression|; otherwise, let _test_ be ~empty~.
          1. If the second |Expression| is present, let _increment_ be the second |Expression|; otherwise, let _increment_ be ~empty~.
          1. Return ? ForBodyEvaluation(_test_, _increment_, |Statement|, « », _labelSet_).
        </emu-alg>
        <emu-grammar>ForStatement : `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
          1. Let _loopEnv_ be NewDeclarativeEnvironment(_oldEnv_).
          1. Let _isConst_ be IsConstantDeclaration of |LexicalDeclaration|.
          1. Let _boundNames_ be the BoundNames of |LexicalDeclaration|.
          1. For each element _dn_ of _boundNames_, do
            1. If _isConst_ is *true*, then
              1. Perform ! _loopEnv_.CreateImmutableBinding(_dn_, *true*).
            1. Else,
              1. Perform ! _loopEnv_.CreateMutableBinding(_dn_, *false*).
          1. Set the running execution context's LexicalEnvironment to _loopEnv_.
          1. Let _forDcl_ be Completion(Evaluation of |LexicalDeclaration|).
          1. If _forDcl_ is an abrupt completion, then
            1. Set the running execution context's LexicalEnvironment to _oldEnv_.
            1. Return ? _forDcl_.
          1. If _isConst_ is *false*, let _perIterationLets_ be _boundNames_; otherwise let _perIterationLets_ be a new empty List.
          1. If the first |Expression| is present, let _test_ be the first |Expression|; otherwise, let _test_ be ~empty~.
          1. If the second |Expression| is present, let _increment_ be the second |Expression|; otherwise, let _increment_ be ~empty~.
          1. Let _bodyResult_ be Completion(ForBodyEvaluation(_test_, _increment_, |Statement|, _perIterationLets_, _labelSet_)).
          1. Set the running execution context's LexicalEnvironment to _oldEnv_.
          1. Return ? _bodyResult_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-forbodyevaluation" type="abstract operation">
        <h1>
          ForBodyEvaluation (
            _test_: an |Expression| Parse Node or ~empty~,
            _increment_: an |Expression| Parse Node or ~empty~,
            _stmt_: a |Statement| Parse Node,
            _perIterationBindings_: a List of Strings,
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _V_ be *undefined*.
          1. Perform ? CreatePerIterationEnvironment(_perIterationBindings_).
          1. Repeat,
            1. If _test_ is not ~empty~, then
              1. Let _testRef_ be ? Evaluation of _test_.
              1. Let _testValue_ be ? GetValue(_testRef_).
              1. If ToBoolean(_testValue_) is *false*, return _V_.
            1. Let _result_ be Completion(Evaluation of _stmt_).
            1. If LoopContinues(_result_, _labelSet_) is *false*, return ? UpdateEmpty(_result_, _V_).
            1. If _result_.[[Value]] is not ~empty~, set _V_ to _result_.[[Value]].
            1. Perform ? CreatePerIterationEnvironment(_perIterationBindings_).
            1. If _increment_ is not ~empty~, then
              1. Let _incRef_ be ? Evaluation of _increment_.
              1. Perform ? GetValue(_incRef_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-createperiterationenvironment" type="abstract operation">
        <h1>
          CreatePerIterationEnvironment (
            _perIterationBindings_: a List of Strings,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _perIterationBindings_ has any elements, then
            1. Let _lastIterationEnv_ be the running execution context's LexicalEnvironment.
            1. Let _outer_ be _lastIterationEnv_.[[OuterEnv]].
            1. Assert: _outer_ is not *null*.
            1. Let _thisIterationEnv_ be NewDeclarativeEnvironment(_outer_).
            1. For each element _bn_ of _perIterationBindings_, do
              1. Perform ! _thisIterationEnv_.CreateMutableBinding(_bn_, *false*).
              1. Let _lastValue_ be ? _lastIterationEnv_.GetBindingValue(_bn_, *true*).
              1. Perform ! _thisIterationEnv_.InitializeBinding(_bn_, _lastValue_).
            1. Set the running execution context's LexicalEnvironment to _thisIterationEnv_.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-for-in-and-for-of-statements">
      <h1>The `for`-`in`, `for`-`of`, and `for`-`await`-`of` Statements</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        ForInOfStatement[Yield, Await, Return] :
          `for` `(` [lookahead != `let` `[`] LeftHandSideExpression[?Yield, ?Await] `in` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` `var` ForBinding[?Yield, ?Await] `in` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` ForDeclaration[?Yield, ?Await] `in` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` [lookahead &notin; { `let`, `async` `of` }] LeftHandSideExpression[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` `var` ForBinding[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          `for` `(` ForDeclaration[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          [+Await] `for` `await` `(` [lookahead != `let`] LeftHandSideExpression[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          [+Await] `for` `await` `(` `var` ForBinding[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
          [+Await] `for` `await` `(` ForDeclaration[?Yield, ?Await] `of` AssignmentExpression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]

        ForDeclaration[Yield, Await] :
          LetOrConst ForBinding[?Yield, ?Await]

        ForBinding[Yield, Await] :
          BindingIdentifier[?Yield, ?Await]
          BindingPattern[?Yield, ?Await]
      </emu-grammar>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>

      <emu-clause id="sec-for-in-and-for-of-statements-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          ForInOfStatement :
            `for` `(` LeftHandSideExpression `in` Expression `)` Statement
            `for` `(` `var` ForBinding `in` Expression `)` Statement
            `for` `(` ForDeclaration `in` Expression `)` Statement
            `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
            `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
            `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement
            `for` `await` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
            `for` `await` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
            `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
          </li>
        </ul>
        <emu-note>
          <p>It is only necessary to apply this rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
        </emu-note>
        <emu-grammar>
          ForInOfStatement :
            `for` `(` LeftHandSideExpression `in` Expression `)` Statement
            `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
            `for` `await` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <ul>
          <li>
            If |LeftHandSideExpression| is either an |ObjectLiteral| or an |ArrayLiteral|, |LeftHandSideExpression| must cover an |AssignmentPattern|.
          </li>
          <li>
            If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, it is a Syntax Error if the AssignmentTargetType of |LeftHandSideExpression| is not ~simple~.
          </li>
        </ul>
        <emu-grammar>
          ForInOfStatement :
            `for` `(` ForDeclaration `in` Expression `)` Statement
            `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement
            `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the BoundNames of |ForDeclaration| contains *"let"*.
          </li>
          <li>
            It is a Syntax Error if any element of the BoundNames of |ForDeclaration| also occurs in the VarDeclaredNames of |Statement|.
          </li>
          <li>
            It is a Syntax Error if the BoundNames of |ForDeclaration| contains any duplicate entries.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-static-semantics-isdestructuring" oldids="sec-static-semantics-static-semantics-isdestructuring,sec-for-in-and-for-of-statements-static-semantics-isdestructuring" type="sdo">
        <h1>Static Semantics: IsDestructuring ( ): a Boolean</h1>
        <dl class="header">
        </dl>
        <emu-grammar>MemberExpression : PrimaryExpression</emu-grammar>
        <emu-alg>
          1. If |PrimaryExpression| is either an |ObjectLiteral| or an |ArrayLiteral|, return *true*.
          1. Return *false*.
        </emu-alg>
        <emu-grammar>
          MemberExpression :
            MemberExpression `[` Expression `]`
            MemberExpression `.` IdentifierName
            MemberExpression TemplateLiteral
            SuperProperty
            MetaProperty
            `new` MemberExpression Arguments
            MemberExpression `.` PrivateIdentifier

          NewExpression :
            `new` NewExpression

          LeftHandSideExpression :
            CallExpression
            OptionalExpression
        </emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ForDeclaration : LetOrConst ForBinding</emu-grammar>
        <emu-alg>
          1. Return IsDestructuring of |ForBinding|.
        </emu-alg>
        <emu-grammar>ForBinding : BindingIdentifier</emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
        <emu-grammar>ForBinding : BindingPattern</emu-grammar>
        <emu-alg>
          1. Return *true*.
        </emu-alg>
        <emu-note>
          <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-fordeclarationbindinginitialization" oldids="sec-for-in-and-for-of-statements-runtime-semantics-bindinginitialization" type="sdo">
        <h1>
          Runtime Semantics: ForDeclarationBindingInitialization (
            _value_: an ECMAScript language value,
            _environment_: an Environment Record or *undefined*,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>*undefined* is passed for _environment_ to indicate that a PutValue operation should be used to assign the initialization value. This is the case for `var` statements and the formal parameter lists of some non-strict functions (see <emu-xref href="#sec-functiondeclarationinstantiation"></emu-xref>). In those cases a lexical binding is hoisted and preinitialized prior to evaluation of its initializer.</p>
        </emu-note>
        <emu-grammar>ForDeclaration : LetOrConst ForBinding</emu-grammar>
        <emu-alg>
          1. Return ? BindingInitialization of |ForBinding| with arguments _value_ and _environment_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-fordeclarationbindinginstantiation" oldids="sec-runtime-semantics-bindinginstantiation" type="sdo">
        <h1>
          Runtime Semantics: ForDeclarationBindingInstantiation (
            _environment_: a Declarative Environment Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ForDeclaration : LetOrConst ForBinding</emu-grammar>
        <emu-alg>
          1. For each element _name_ of the BoundNames of |ForBinding|, do
            1. If IsConstantDeclaration of |LetOrConst| is *true*, then
              1. Perform ! _environment_.CreateImmutableBinding(_name_, *true*).
            1. Else,
              1. Perform ! _environment_.CreateMutableBinding(_name_, *false*).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-forinofloopevaluation" oldids="sec-for-in-and-for-of-statements-runtime-semantics-labelledevaluation" type="sdo">
        <h1>
          Runtime Semantics: ForInOfLoopEvaluation (
            _labelSet_: a List of Strings,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ForInOfStatement : `for` `(` LeftHandSideExpression `in` Expression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |Expression|, ~enumerate~).
          1. Return ? ForIn/OfBodyEvaluation(|LeftHandSideExpression|, |Statement|, _keyResult_, ~enumerate~, ~assignment~, _labelSet_).
        </emu-alg>
        <emu-grammar>ForInOfStatement : `for` `(` `var` ForBinding `in` Expression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |Expression|, ~enumerate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForBinding|, |Statement|, _keyResult_, ~enumerate~, ~var-binding~, _labelSet_).
        </emu-alg>
        <emu-grammar>ForInOfStatement : `for` `(` ForDeclaration `in` Expression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(BoundNames of |ForDeclaration|, |Expression|, ~enumerate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForDeclaration|, |Statement|, _keyResult_, ~enumerate~, ~lexical-binding~, _labelSet_).
        </emu-alg>
        <emu-grammar>ForInOfStatement : `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |AssignmentExpression|, ~iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|LeftHandSideExpression|, |Statement|, _keyResult_, ~iterate~, ~assignment~, _labelSet_).
        </emu-alg>
        <emu-grammar>ForInOfStatement : `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |AssignmentExpression|, ~iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForBinding|, |Statement|, _keyResult_, ~iterate~, ~var-binding~, _labelSet_).
        </emu-alg>
        <emu-grammar>ForInOfStatement : `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement</emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(BoundNames of |ForDeclaration|, |AssignmentExpression|, ~iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForDeclaration|, |Statement|, _keyResult_, ~iterate~, ~lexical-binding~, _labelSet_).
        </emu-alg>
        <emu-grammar>
          ForInOfStatement : `for` `await` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |AssignmentExpression|, ~async-iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|LeftHandSideExpression|, |Statement|, _keyResult_, ~iterate~, ~assignment~, _labelSet_, ~async~).
        </emu-alg>
        <emu-grammar>
          ForInOfStatement : `for` `await` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |AssignmentExpression|, ~async-iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForBinding|, |Statement|, _keyResult_, ~iterate~, ~var-binding~, _labelSet_, ~async~).
        </emu-alg>
        <emu-grammar>
          ForInOfStatement : `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement
        </emu-grammar>
        <emu-alg>
          1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(BoundNames of |ForDeclaration|, |AssignmentExpression|, ~async-iterate~).
          1. Return ? ForIn/OfBodyEvaluation(|ForDeclaration|, |Statement|, _keyResult_, ~iterate~, ~lexical-binding~, _labelSet_, ~async~).
        </emu-alg>
        <emu-note>
          <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-forinofheadevaluation" type="abstract operation" oldids="sec-runtime-semantics-forin-div-ofheadevaluation-tdznames-expr-iterationkind">
        <h1>
          ForIn/OfHeadEvaluation (
            _uninitializedBoundNames_: a List of Strings,
            _expr_: an |Expression| Parse Node or an |AssignmentExpression| Parse Node,
            _iterationKind_: ~enumerate~, ~iterate~, or ~async-iterate~,
          ): either a normal completion containing an Iterator Record or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
          1. If _uninitializedBoundNames_ is not empty, then
            1. Assert: _uninitializedBoundNames_ has no duplicate entries.
            1. Let _newEnv_ be NewDeclarativeEnvironment(_oldEnv_).
            1. For each String _name_ of _uninitializedBoundNames_, do
              1. Perform ! _newEnv_.CreateMutableBinding(_name_, *false*).
            1. Set the running execution context's LexicalEnvironment to _newEnv_.
          1. Let _exprRef_ be Completion(Evaluation of _expr_).
          1. Set the running execution context's LexicalEnvironment to _oldEnv_.
          1. Let _exprValue_ be ? GetValue(? _exprRef_).
          1. If _iterationKind_ is ~enumerate~, then
            1. If _exprValue_ is either *undefined* or *null*, then
              1. Return Completion Record { [[Type]]: ~break~, [[Value]]: ~empty~, [[Target]]: ~empty~ }.
            1. Let _obj_ be ! ToObject(_exprValue_).
            1. Let _iterator_ be EnumerateObjectProperties(_obj_).
            1. Let _nextMethod_ be ! GetV(_iterator_, *"next"*).
            1. Return the Iterator Record { [[Iterator]]: _iterator_, [[NextMethod]]: _nextMethod_, [[Done]]: *false* }.
          1. Else,
            1. Assert: _iterationKind_ is either ~iterate~ or ~async-iterate~.
            1. If _iterationKind_ is ~async-iterate~, let _iteratorKind_ be ~async~.
            1. Else, let _iteratorKind_ be ~sync~.
            1. Return ? GetIterator(_exprValue_, _iteratorKind_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-forin-div-ofbodyevaluation-lhs-stmt-iterator-lhskind-labelset" type="abstract operation">
        <h1>
          ForIn/OfBodyEvaluation (
            _lhs_: a Parse Node,
            _stmt_: a |Statement| Parse Node,
            _iteratorRecord_: an Iterator Record,
            _iterationKind_: ~enumerate~ or ~iterate~,
            _lhsKind_: ~assignment~, ~var-binding~, or ~lexical-binding~,
            _labelSet_: a List of Strings,
            optional _iteratorKind_: ~sync~ or ~async~,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _iteratorKind_ is not present, set _iteratorKind_ to ~sync~.
          1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
          1. Let _V_ be *undefined*.
          1. Let _destructuring_ be IsDestructuring of _lhs_.
          1. If _destructuring_ is *true* and _lhsKind_ is ~assignment~, then
            1. Assert: _lhs_ is a |LeftHandSideExpression|.
            1. Let _assignmentPattern_ be the |AssignmentPattern| that is covered by _lhs_.
          1. Repeat,
            1. Let _nextResult_ be ? Call(_iteratorRecord_.[[NextMethod]], _iteratorRecord_.[[Iterator]]).
            1. If _iteratorKind_ is ~async~, set _nextResult_ to ? Await(_nextResult_).
            1. If _nextResult_ is not an Object, throw a *TypeError* exception.
            1. Let _done_ be ? IteratorComplete(_nextResult_).
            1. If _done_ is *true*, return _V_.
            1. Let _nextValue_ be ? IteratorValue(_nextResult_).
            1. If _lhsKind_ is either ~assignment~ or ~var-binding~, then
              1. If _destructuring_ is *true*, then
                1. If _lhsKind_ is ~assignment~, then
                  1. Let _status_ be Completion(DestructuringAssignmentEvaluation of _assignmentPattern_ with argument _nextValue_).
                1. Else,
                  1. Assert: _lhsKind_ is ~var-binding~.
                  1. Assert: _lhs_ is a |ForBinding|.
                  1. Let _status_ be Completion(BindingInitialization of _lhs_ with arguments _nextValue_ and *undefined*).
              1. Else,
                1. Let _lhsRef_ be Completion(Evaluation of _lhs_). (It may be evaluated repeatedly.)
                1. If _lhsRef_ is an abrupt completion, then
                  1. Let _status_ be _lhsRef_.
                1. Else,
                  1. Let _status_ be Completion(PutValue(_lhsRef_.[[Value]], _nextValue_)).
            1. Else,
              1. Assert: _lhsKind_ is ~lexical-binding~.
              1. Assert: _lhs_ is a |ForDeclaration|.
              1. Let _iterationEnv_ be NewDeclarativeEnvironment(_oldEnv_).
              1. Perform ForDeclarationBindingInstantiation of _lhs_ with argument _iterationEnv_.
              1. Set the running execution context's LexicalEnvironment to _iterationEnv_.
              1. If _destructuring_ is *true*, then
                1. Let _status_ be Completion(ForDeclarationBindingInitialization of _lhs_ with arguments _nextValue_ and _iterationEnv_).
              1. Else,
                1. Assert: _lhs_ binds a single name.
                1. Let _lhsName_ be the sole element of the BoundNames of _lhs_.
                1. Let _lhsRef_ be ! ResolveBinding(_lhsName_).
                1. Let _status_ be Completion(InitializeReferencedBinding(_lhsRef_, _nextValue_)).
            1. If _status_ is an abrupt completion, then
              1. Set the running execution context's LexicalEnvironment to _oldEnv_.
              1. If _iteratorKind_ is ~async~, return ? AsyncIteratorClose(_iteratorRecord_, _status_).
              1. If _iterationKind_ is ~enumerate~, then
                1. Return ? _status_.
              1. Else,
                1. Assert: _iterationKind_ is ~iterate~.
                1. Return ? IteratorClose(_iteratorRecord_, _status_).
            1. Let _result_ be Completion(Evaluation of _stmt_).
            1. Set the running execution context's LexicalEnvironment to _oldEnv_.
            1. If LoopContinues(_result_, _labelSet_) is *false*, then
              1. If _iterationKind_ is ~enumerate~, then
                1. Return ? UpdateEmpty(_result_, _V_).
              1. Else,
                1. Assert: _iterationKind_ is ~iterate~.
                1. Set _status_ to Completion(UpdateEmpty(_result_, _V_)).
                1. If _iteratorKind_ is ~async~, return ? AsyncIteratorClose(_iteratorRecord_, _status_).
                1. Return ? IteratorClose(_iteratorRecord_, _status_).
            1. If _result_.[[Value]] is not ~empty~, set _V_ to _result_.[[Value]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-for-in-and-for-of-statements-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>
          BindingIdentifier :
            Identifier
            `yield`
            `await`
        </emu-grammar>
        <emu-alg>
          1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
          1. Return ? ResolveBinding(_bindingId_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-enumerate-object-properties" type="abstract operation">
        <h1>
          EnumerateObjectProperties (
            _O_: an Object,
          ): an iterator object
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Return an iterator object whose `next` method iterates over all the String-valued keys of enumerable properties of _O_. The iterator object is never directly accessible to ECMAScript code. The mechanics and order of enumerating the properties is not specified but must conform to the rules specified below.
        </emu-alg>
        <p>The iterator's `throw` and `return` methods are *null* and are never invoked. The iterator's `next` method processes object properties to determine whether the property key should be returned as an iterator value. Returned property keys do not include keys that are Symbols. Properties of the target object may be deleted during enumeration. A property that is deleted before it is processed by the iterator's `next` method is ignored. If new properties are added to the target object during enumeration, the newly added properties are not guaranteed to be processed in the active enumeration. A property name will be returned by the iterator's `next` method at most once in any enumeration.</p>
        <p>Enumerating the properties of the target object includes enumerating properties of its prototype, and the prototype of the prototype, and so on, recursively; but a property of a prototype is not processed if it has the same name as a property that has already been processed by the iterator's `next` method. The values of [[Enumerable]] attributes are not considered when determining if a property of a prototype object has already been processed. The enumerable property names of prototype objects must be obtained by invoking EnumerateObjectProperties passing the prototype object as the argument. EnumerateObjectProperties must obtain the own property keys of the target object by calling its [[OwnPropertyKeys]] internal method. Property attributes of the target object must be obtained by calling its [[GetOwnProperty]] internal method.</p>
        <p>In addition, if neither _O_ nor any object in its prototype chain is a Proxy exotic object, TypedArray, module namespace exotic object, or implementation provided exotic object, then the iterator must behave as would the iterator given by CreateForInIterator(_O_) until one of the following occurs:</p>
        <ul>
          <li>the value of the [[Prototype]] internal slot of _O_ or an object in its prototype chain changes,</li>
          <li>a property is removed from _O_ or an object in its prototype chain,</li>
          <li>a property is added to an object in _O_'s prototype chain, or</li>
          <li>the value of the [[Enumerable]] attribute of a property of _O_ or an object in its prototype chain changes.</li>
        </ul>

        <emu-note>
          <p>ECMAScript implementations are not required to implement the algorithm in <emu-xref href="#sec-%foriniteratorprototype%.next"></emu-xref> directly. They may choose any implementation whose behaviour will not deviate from that algorithm unless one of the constraints in the previous paragraph is violated.</p>
          <p>The following is an informative definition of an ECMAScript generator function that conforms to these rules:</p>
          <pre><code class="javascript">
            function* EnumerateObjectProperties(obj) {
              const visited = new Set();
              for (const key of Reflect.ownKeys(obj)) {
                if (typeof key === "symbol") continue;
                const desc = Reflect.getOwnPropertyDescriptor(obj, key);
                if (desc) {
                  visited.add(key);
                  if (desc.enumerable) yield key;
                }
              }
              const proto = Reflect.getPrototypeOf(obj);
              if (proto === null) return;
              for (const protoKey of EnumerateObjectProperties(proto)) {
                if (!visited.has(protoKey)) yield protoKey;
              }
            }
          </code></pre>
        </emu-note>
        <emu-note>
          The list of exotic objects for which implementations are not required to match CreateForInIterator was chosen because implementations historically differed in behaviour for those cases, and agreed in all others.
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-for-in-iterator-objects">
        <h1>For-In Iterator Objects</h1>
        <p>A <dfn variants="For-In Iterator object,For-In Iterator objects">For-In Iterator</dfn> is an object that represents a specific iteration over some specific object. For-In Iterator objects are never directly accessible to ECMAScript code; they exist solely to illustrate the behaviour of EnumerateObjectProperties.</p>

        <emu-clause id="sec-createforiniterator" type="abstract operation">
          <h1>
            CreateForInIterator (
              _object_: an Object,
            ): a For-In Iterator
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It is used to create a For-In Iterator object which iterates over the own and inherited enumerable string properties of _object_ in a specific order.</dd>
          </dl>
          <emu-alg>
            1. Let _iterator_ be OrdinaryObjectCreate(%ForInIteratorPrototype%, « [[Object]], [[ObjectWasVisited]], [[VisitedKeys]], [[RemainingKeys]] »).
            1. Set _iterator_.[[Object]] to _object_.
            1. Set _iterator_.[[ObjectWasVisited]] to *false*.
            1. Set _iterator_.[[VisitedKeys]] to a new empty List.
            1. Set _iterator_.[[RemainingKeys]] to a new empty List.
            1. Return _iterator_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-%foriniteratorprototype%-object">
          <h1>The %ForInIteratorPrototype% Object</h1>
          <p>The <dfn>%ForInIteratorPrototype%</dfn> object:</p>
          <ul>
            <li>has properties that are inherited by all For-In Iterator objects.</li>
            <li>is an ordinary object.</li>
            <li>has a [[Prototype]] internal slot whose value is %Iterator.prototype%.</li>
            <li>is never directly accessible to ECMAScript code.</li>
            <li>has the following properties:</li>
          </ul>

          <emu-clause id="sec-%foriniteratorprototype%.next">
            <h1>%ForInIteratorPrototype%.next ( )</h1>
            <emu-alg>
              1. Let _O_ be the *this* value.
              1. Assert: _O_ is an Object.
              1. Assert: _O_ has all of the internal slots of a For-In Iterator Instance (<emu-xref href="#sec-properties-of-for-in-iterator-instances"></emu-xref>).
              1. Let _object_ be _O_.[[Object]].
              1. Repeat,
                1. If _O_.[[ObjectWasVisited]] is *false*, then
                  1. Let _keys_ be ? <emu-meta effects="user-code">_object_.[[OwnPropertyKeys]]()</emu-meta>.
                  1. For each element _key_ of _keys_, do
                    1. If _key_ is a String, then
                      1. Append _key_ to _O_.[[RemainingKeys]].
                  1. Set _O_.[[ObjectWasVisited]] to *true*.
                1. Repeat, while _O_.[[RemainingKeys]] is not empty,
                  1. Let _r_ be the first element of _O_.[[RemainingKeys]].
                  1. Remove the first element from _O_.[[RemainingKeys]].
                  1. If _O_.[[VisitedKeys]] does not contain _r_, then
                    1. Let _desc_ be ? <emu-meta effects="user-code">_object_.[[GetOwnProperty]]</emu-meta>(_r_).
                    1. If _desc_ is not *undefined*, then
                      1. Append _r_ to _O_.[[VisitedKeys]].
                      1. If _desc_.[[Enumerable]] is *true*, return CreateIteratorResultObject(_r_, *false*).
                1. Set _object_ to ? <emu-meta effects="user-code">_object_.[[GetPrototypeOf]]()</emu-meta>.
                1. Set _O_.[[Object]] to _object_.
                1. Set _O_.[[ObjectWasVisited]] to *false*.
                1. If _object_ is *null*, return CreateIteratorResultObject(*undefined*, *true*).
            </emu-alg>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-properties-of-for-in-iterator-instances">
          <h1>Properties of For-In Iterator Instances</h1>
          <p>For-In Iterator instances are ordinary objects that inherit properties from the %ForInIteratorPrototype% intrinsic object. For-In Iterator instances are initially created with the internal slots listed in <emu-xref href="#table-for-in-iterator-instance-slots"></emu-xref>.</p>
          <emu-table id="table-for-in-iterator-instance-slots" caption="Internal Slots of For-In Iterator Instances">
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
                  [[Object]]
                </td>
                <td>
                  an Object
                </td>
                <td>
                  The Object value whose properties are being iterated.
                </td>
              </tr>
              <tr>
                <td>
                  [[ObjectWasVisited]]
                </td>
                <td>
                  a Boolean
                </td>
                <td>
                  *true* if the iterator has invoked [[OwnPropertyKeys]] on [[Object]], *false* otherwise.
                </td>
              </tr>
              <tr>
                <td>
                  [[VisitedKeys]]
                </td>
                <td>
                  a List of Strings
                </td>
                <td>
                  The values that have been emitted by this iterator thus far.
                </td>
              </tr>
              <tr>
                <td>
                  [[RemainingKeys]]
                </td>
                <td>
                  a List of Strings
                </td>
                <td>
                  The values remaining to be emitted for the current object, before iterating the properties of its prototype (if its prototype is not *null*).
                </td>
              </tr>
            </table>
          </emu-table>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-continue-statement">
    <h1>The `continue` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ContinueStatement[Yield, Await] :
        `continue` `;`
        `continue` [no LineTerminator here] LabelIdentifier[?Yield, ?Await] `;`
    </emu-grammar>

    <emu-clause id="sec-continue-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>
        ContinueStatement :
          `continue` `;`
          `continue` LabelIdentifier `;`
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if this |ContinueStatement| is not nested, directly or indirectly (but not crossing function or `static` initialization block boundaries), within an |IterationStatement|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-continue-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ContinueStatement : `continue` `;`</emu-grammar>
      <emu-alg>
        1. Return Completion Record { [[Type]]: ~continue~, [[Value]]: ~empty~, [[Target]]: ~empty~ }.
      </emu-alg>
      <emu-grammar>ContinueStatement : `continue` LabelIdentifier `;`</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. Return Completion Record { [[Type]]: ~continue~, [[Value]]: ~empty~, [[Target]]: _label_ }.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-break-statement">
    <h1>The `break` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      BreakStatement[Yield, Await] :
        `break` `;`
        `break` [no LineTerminator here] LabelIdentifier[?Yield, ?Await] `;`
    </emu-grammar>

    <emu-clause id="sec-break-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>BreakStatement : `break` `;`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if this |BreakStatement| is not nested, directly or indirectly (but not crossing function or `static` initialization block boundaries), within an |IterationStatement| or a |SwitchStatement|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-break-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>BreakStatement : `break` `;`</emu-grammar>
      <emu-alg>
        1. Return Completion Record { [[Type]]: ~break~, [[Value]]: ~empty~, [[Target]]: ~empty~ }.
      </emu-alg>
      <emu-grammar>BreakStatement : `break` LabelIdentifier `;`</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. Return Completion Record { [[Type]]: ~break~, [[Value]]: ~empty~, [[Target]]: _label_ }.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-return-statement">
    <h1>The `return` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ReturnStatement[Yield, Await] :
        `return` `;`
        `return` [no LineTerminator here] Expression[+In, ?Yield, ?Await] `;`
    </emu-grammar>
    <emu-note>
      <p>A `return` statement causes a function to cease execution and, in most cases, returns a value to the caller. If |Expression| is omitted, the return value is *undefined*. Otherwise, the return value is the value of |Expression|. A `return` statement may not actually return a value to the caller depending on surrounding context. For example, in a `try` block, a `return` statement's Completion Record may be replaced with another Completion Record during evaluation of the `finally` block.</p>
    </emu-note>

    <emu-clause id="sec-return-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ReturnStatement : `return` `;`</emu-grammar>
      <emu-alg>
        1. Return ReturnCompletion(*undefined*).
      </emu-alg>
      <emu-grammar>ReturnStatement : `return` Expression `;`</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Let _exprValue_ be ? GetValue(_exprRef_).
        1. If GetGeneratorKind() is ~async~, set _exprValue_ to ? Await(_exprValue_).
        1. Return ReturnCompletion(_exprValue_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-with-statement" legacy>
    <h1>The `with` Statement</h1>
    <emu-note>
      <p>Use of the Legacy `with` statement is discouraged in new ECMAScript code. Consider alternatives that are permitted in both strict mode code and non-strict code, such as <emu-xref href="#sec-destructuring-assignment">destructuring assignment</emu-xref>.</p>
    </emu-note>

    <h2>Syntax</h2>
    <emu-grammar type="definition">
      WithStatement[Yield, Await, Return] :
        `with` `(` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
    </emu-grammar>
    <emu-note>
      <p>The `with` statement adds an Object Environment Record for a computed object to the lexical environment of the running execution context. It then executes a statement using this augmented lexical environment. Finally, it restores the original lexical environment.</p>
    </emu-note>

    <emu-clause id="sec-with-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsStrict(this production) is *true*.
        </li>
        <li>
          It is a Syntax Error if IsLabelledFunction(|Statement|) is *true*.
        </li>
      </ul>
      <emu-note>
        <p>It is only necessary to apply the second rule if the extension specified in <emu-xref href="#sec-labelled-function-declarations"></emu-xref> is implemented.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-with-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _val_ be ? Evaluation of |Expression|.
        1. Let _obj_ be ? ToObject(? GetValue(_val_)).
        1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
        1. Let _newEnv_ be NewObjectEnvironment(_obj_, *true*, _oldEnv_).
        1. Set the running execution context's LexicalEnvironment to _newEnv_.
        1. Let _C_ be Completion(Evaluation of |Statement|).
        1. Set the running execution context's LexicalEnvironment to _oldEnv_.
        1. Return ? UpdateEmpty(_C_, *undefined*).
      </emu-alg>
      <emu-note>
        <p>No matter how control leaves the embedded |Statement|, whether normally or by some form of abrupt completion or exception, the LexicalEnvironment is always restored to its former state.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-switch-statement">
    <h1>The `switch` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      SwitchStatement[Yield, Await, Return] :
        `switch` `(` Expression[+In, ?Yield, ?Await] `)` CaseBlock[?Yield, ?Await, ?Return]

      CaseBlock[Yield, Await, Return] :
        `{` CaseClauses[?Yield, ?Await, ?Return]? `}`
        `{` CaseClauses[?Yield, ?Await, ?Return]? DefaultClause[?Yield, ?Await, ?Return] CaseClauses[?Yield, ?Await, ?Return]? `}`

      CaseClauses[Yield, Await, Return] :
        CaseClause[?Yield, ?Await, ?Return]
        CaseClauses[?Yield, ?Await, ?Return] CaseClause[?Yield, ?Await, ?Return]

      CaseClause[Yield, Await, Return] :
        `case` Expression[+In, ?Yield, ?Await] `:` StatementList[?Yield, ?Await, ?Return]?

      DefaultClause[Yield, Await, Return] :
        `default` `:` StatementList[?Yield, ?Await, ?Return]?
    </emu-grammar>

    <emu-clause id="sec-switch-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the LexicallyDeclaredNames of |CaseBlock| contains any duplicate entries.
        </li>
        <li>
          It is a Syntax Error if any element of the LexicallyDeclaredNames of |CaseBlock| also occurs in the VarDeclaredNames of |CaseBlock|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-caseblockevaluation" type="sdo">
      <h1>
        Runtime Semantics: CaseBlockEvaluation (
          _input_: an ECMAScript language value,
        ): either a normal completion containing an ECMAScript language value or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return *undefined*.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses `}`</emu-grammar>
      <emu-alg>
        1. Let _V_ be *undefined*.
        1. Let _A_ be the List of |CaseClause| items in |CaseClauses|, in source text order.
        1. Let _found_ be *false*.
        1. For each |CaseClause| _C_ of _A_, do
          1. If _found_ is *false*, then
            1. Set _found_ to ? CaseClauseIsSelected(_C_, _input_).
          1. If _found_ is *true*, then
            1. Let _R_ be Completion(Evaluation of _C_).
            1. If _R_.[[Value]] is not ~empty~, set _V_ to _R_.[[Value]].
            1. If _R_ is an abrupt completion, return ? UpdateEmpty(_R_, _V_).
        1. Return _V_.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. Let _V_ be *undefined*.
        1. If the first |CaseClauses| is present, then
          1. Let _A_ be the List of |CaseClause| items in the first |CaseClauses|, in source text order.
        1. Else,
          1. Let _A_ be a new empty List.
        1. Let _found_ be *false*.
        1. For each |CaseClause| _C_ of _A_, do
          1. If _found_ is *false*, then
            1. Set _found_ to ? CaseClauseIsSelected(_C_, _input_).
          1. If _found_ is *true*, then
            1. Let _R_ be Completion(Evaluation of _C_).
            1. If _R_.[[Value]] is not ~empty~, set _V_ to _R_.[[Value]].
            1. If _R_ is an abrupt completion, return ? UpdateEmpty(_R_, _V_).
        1. Let _foundInB_ be *false*.
        1. If the second |CaseClauses| is present, then
          1. Let _B_ be the List of |CaseClause| items in the second |CaseClauses|, in source text order.
        1. Else,
          1. Let _B_ be a new empty List.
        1. If _found_ is *false*, then
          1. For each |CaseClause| _C_ of _B_, do
            1. If _foundInB_ is *false*, then
              1. Set _foundInB_ to ? CaseClauseIsSelected(_C_, _input_).
            1. If _foundInB_ is *true*, then
              1. Let _R_ be Completion(Evaluation of |CaseClause| _C_).
              1. If _R_.[[Value]] is not ~empty~, set _V_ to _R_.[[Value]].
              1. If _R_ is an abrupt completion, return ? UpdateEmpty(_R_, _V_).
        1. If _foundInB_ is *true*, return _V_.
        1. Let _defaultR_ be Completion(Evaluation of |DefaultClause|).
        1. If _defaultR_.[[Value]] is not ~empty~, set _V_ to _defaultR_.[[Value]].
        1. If _defaultR_ is an abrupt completion, return ? UpdateEmpty(_defaultR_, _V_).
        1. NOTE: The following is another complete iteration of the second |CaseClauses|.
        1. For each |CaseClause| _C_ of _B_, do
          1. Let _R_ be Completion(Evaluation of |CaseClause| _C_).
          1. If _R_.[[Value]] is not ~empty~, set _V_ to _R_.[[Value]].
          1. If _R_ is an abrupt completion, return ? UpdateEmpty(_R_, _V_).
        1. Return _V_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-caseclauseisselected" type="abstract operation" oldids="sec-runtime-semantics-caseselectorevaluation">
      <h1>
        CaseClauseIsSelected (
          _C_: a |CaseClause| Parse Node,
          _input_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or an abrupt completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines whether _C_ matches _input_.</dd>
      </dl>
      <emu-alg>
        1. Assert: _C_ is an instance of the production <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>.
        1. Let _exprRef_ be ? Evaluation of the |Expression| of _C_.
        1. Let _clauseSelector_ be ? GetValue(_exprRef_).
        1. Return IsStrictlyEqual(_input_, _clauseSelector_).
      </emu-alg>
      <emu-note>
        <p>This operation does not execute _C_'s |StatementList| (if any). The |CaseBlock| algorithm uses its return value to determine which |StatementList| to start executing.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-switch-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Let _switchValue_ be ? GetValue(_exprRef_).
        1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
        1. Let _blockEnv_ be NewDeclarativeEnvironment(_oldEnv_).
        1. Perform BlockDeclarationInstantiation(|CaseBlock|, _blockEnv_).
        1. Set the running execution context's LexicalEnvironment to _blockEnv_.
        1. Let _R_ be Completion(CaseBlockEvaluation of |CaseBlock| with argument _switchValue_).
        1. Set the running execution context's LexicalEnvironment to _oldEnv_.
        1. Return _R_.
      </emu-alg>
      <emu-note>
        <p>No matter how control leaves the |SwitchStatement| the LexicalEnvironment is always restored to its former state.</p>
      </emu-note>
      <emu-grammar>CaseClause : `case` Expression `:`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList</emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |StatementList|.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList</emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |StatementList|.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-labelled-statements">
    <h1>Labelled Statements</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      LabelledStatement[Yield, Await, Return] :
        LabelIdentifier[?Yield, ?Await] `:` LabelledItem[?Yield, ?Await, ?Return]

      LabelledItem[Yield, Await, Return] :
        Statement[?Yield, ?Await, ?Return]
        FunctionDeclaration[?Yield, ?Await, ~Default]
    </emu-grammar>
    <emu-note>
      <p>A |Statement| may be prefixed by a label. Labelled statements are only used in conjunction with labelled `break` and `continue` statements. ECMAScript has no `goto` statement. A |Statement| can be part of a |LabelledStatement|, which itself can be part of a |LabelledStatement|, and so on. The labels introduced this way are collectively referred to as the “current label set” when describing the semantics of individual statements.</p>
    </emu-note>

    <emu-clause id="sec-labelled-statements-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if any source text is matched by this production.
        </li>
      </ul>
      <emu-note>
        <p>An alternative definition for this rule is provided in <emu-xref href="#sec-labelled-function-declarations"></emu-xref>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-islabelledfunction" type="abstract operation">
      <h1>
        Static Semantics: IsLabelledFunction (
          _stmt_: a |Statement| Parse Node,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _stmt_ is not a |LabelledStatement|, return *false*.
        1. Let _item_ be the |LabelledItem| of _stmt_.
        1. If _item_ is <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>, return *true*.
        1. Let _subStmt_ be the |Statement| of _item_.
        1. Return IsLabelledFunction(_subStmt_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-labelled-statements-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return ? LabelledEvaluation of this |LabelledStatement| with argument « ».
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-labelledevaluation" oldids="sec-statement-semantics-runtime-semantics-labelledevaluation,sec-labelled-statements-runtime-semantics-labelledevaluation" type="sdo">
      <h1>
        Runtime Semantics: LabelledEvaluation (
          _labelSet_: a List of Strings,
        ): either a normal completion containing either an ECMAScript language value or ~empty~, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>BreakableStatement : IterationStatement</emu-grammar>
      <emu-alg>
        1. Let _stmtResult_ be Completion(LoopEvaluation of |IterationStatement| with argument _labelSet_).
        1. If _stmtResult_ is a break completion, then
          1. If _stmtResult_.[[Target]] is ~empty~, then
            1. If _stmtResult_.[[Value]] is ~empty~, set _stmtResult_ to NormalCompletion(*undefined*).
            1. Else, set _stmtResult_ to NormalCompletion(_stmtResult_.[[Value]]).
        1. Return ? _stmtResult_.
      </emu-alg>
      <emu-grammar>BreakableStatement : SwitchStatement</emu-grammar>
      <emu-alg>
        1. Let _stmtResult_ be Completion(Evaluation of |SwitchStatement|).
        1. If _stmtResult_ is a break completion, then
          1. If _stmtResult_.[[Target]] is ~empty~, then
            1. If _stmtResult_.[[Value]] is ~empty~, set _stmtResult_ to NormalCompletion(*undefined*).
            1. Else, set _stmtResult_ to NormalCompletion(_stmtResult_.[[Value]]).
        1. Return ? _stmtResult_.
      </emu-alg>
      <emu-note>
        <p>A |BreakableStatement| is one that can be exited via an unlabelled |BreakStatement|.</p>
      </emu-note>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. Let _newLabelSet_ be the list-concatenation of _labelSet_ and « _label_ ».
        1. Let _stmtResult_ be Completion(LabelledEvaluation of |LabelledItem| with argument _newLabelSet_).
        1. If _stmtResult_ is a break completion and _stmtResult_.[[Target]] is _label_, then
          1. Set _stmtResult_ to NormalCompletion(_stmtResult_.[[Value]]).
        1. Return ? _stmtResult_.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |FunctionDeclaration|.
      </emu-alg>
      <emu-grammar>
        Statement :
          BlockStatement
          VariableStatement
          EmptyStatement
          ExpressionStatement
          IfStatement
          ContinueStatement
          BreakStatement
          ReturnStatement
          WithStatement
          ThrowStatement
          TryStatement
          DebuggerStatement
      </emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |Statement|.
      </emu-alg>
      <emu-note>
        <p>The only two productions of |Statement| which have special semantics for LabelledEvaluation are |BreakableStatement| and |LabelledStatement|.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-throw-statement">
    <h1>The `throw` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ThrowStatement[Yield, Await] :
        `throw` [no LineTerminator here] Expression[+In, ?Yield, ?Await] `;`
    </emu-grammar>

    <emu-clause id="sec-throw-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ThrowStatement : `throw` Expression `;`</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |Expression|.
        1. Let _exprValue_ be ? GetValue(_exprRef_).
        1. Return ThrowCompletion(_exprValue_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-try-statement">
    <h1>The `try` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      TryStatement[Yield, Await, Return] :
        `try` Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return]
        `try` Block[?Yield, ?Await, ?Return] Finally[?Yield, ?Await, ?Return]
        `try` Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return] Finally[?Yield, ?Await, ?Return]

      Catch[Yield, Await, Return] :
        `catch` `(` CatchParameter[?Yield, ?Await] `)` Block[?Yield, ?Await, ?Return]
        `catch` Block[?Yield, ?Await, ?Return]

      Finally[Yield, Await, Return] :
        `finally` Block[?Yield, ?Await, ?Return]

      CatchParameter[Yield, Await] :
        BindingIdentifier[?Yield, ?Await]
        BindingPattern[?Yield, ?Await]
    </emu-grammar>
    <emu-note>
      <p>The `try` statement encloses a block of code in which an exceptional condition can occur, such as a runtime error or a `throw` statement. The `catch` clause provides the exception-handling code. When a catch clause catches an exception, its |CatchParameter| is bound to that exception.</p>
    </emu-note>

    <emu-clause id="sec-try-statement-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the BoundNames of |CatchParameter| contains any duplicate elements.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |CatchParameter| also occurs in the LexicallyDeclaredNames of |Block|.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |CatchParameter| also occurs in the VarDeclaredNames of |Block|.
        </li>
      </ul>
      <emu-note>
        <p>An alternative static semantics for this production is given in <emu-xref href="#sec-variablestatements-in-catch-blocks"></emu-xref>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-catchclauseevaluation" type="sdo">
      <h1>
        Runtime Semantics: CatchClauseEvaluation (
          _thrownValue_: an ECMAScript language value,
        ): either a normal completion containing either an ECMAScript language value or ~empty~, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Let _oldEnv_ be the running execution context's LexicalEnvironment.
        1. Let _catchEnv_ be NewDeclarativeEnvironment(_oldEnv_).
        1. For each element _argName_ of the BoundNames of |CatchParameter|, do
          1. Perform ! _catchEnv_.CreateMutableBinding(_argName_, *false*).
        1. Set the running execution context's LexicalEnvironment to _catchEnv_.
        1. Let _status_ be Completion(BindingInitialization of |CatchParameter| with arguments _thrownValue_ and _catchEnv_).
        1. If _status_ is an abrupt completion, then
          1. Set the running execution context's LexicalEnvironment to _oldEnv_.
          1. Return ? _status_.
        1. Let _B_ be Completion(Evaluation of |Block|).
        1. Set the running execution context's LexicalEnvironment to _oldEnv_.
        1. Return ? _B_.
      </emu-alg>
      <emu-grammar>Catch : `catch` Block</emu-grammar>
      <emu-alg>
        1. Return ? Evaluation of |Block|.
      </emu-alg>
      <emu-note>
        <p>No matter how control leaves the |Block| the LexicalEnvironment is always restored to its former state.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-try-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _B_ be Completion(Evaluation of |Block|).
        1. If _B_ is a throw completion, let _C_ be Completion(CatchClauseEvaluation of |Catch| with argument _B_.[[Value]]).
        1. Else, let _C_ be _B_.
        1. Return ? UpdateEmpty(_C_, *undefined*).
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _B_ be Completion(Evaluation of |Block|).
        1. Let _F_ be Completion(Evaluation of |Finally|).
        1. If _F_ is a normal completion, set _F_ to _B_.
        1. Return ? UpdateEmpty(_F_, *undefined*).
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. Let _B_ be Completion(Evaluation of |Block|).
        1. If _B_ is a throw completion, let _C_ be Completion(CatchClauseEvaluation of |Catch| with argument _B_.[[Value]]).
        1. Else, let _C_ be _B_.
        1. Let _F_ be Completion(Evaluation of |Finally|).
        1. If _F_ is a normal completion, set _F_ to _C_.
        1. Return ? UpdateEmpty(_F_, *undefined*).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-debugger-statement">
    <h1>The `debugger` Statement</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      DebuggerStatement :
        `debugger` `;`
    </emu-grammar>

    <emu-clause id="sec-debugger-statement-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-note>
        <p>Evaluating a |DebuggerStatement| may allow an implementation to cause a breakpoint when run under a debugger. If a debugger is not present or active this statement has no observable effect.</p>
      </emu-note>
      <emu-grammar>DebuggerStatement : `debugger` `;`</emu-grammar>
      <emu-alg>
        1. If an implementation-defined debugging facility is available and enabled, then
          1. Perform an implementation-defined debugging action.
          1. Return a new implementation-defined Completion Record.
        1. Else,
          1. Return ~empty~.
      </emu-alg>
    </emu-clause>
  </emu-clause>

<h1 id="sec-ecmascript-language-functions-and-classes"></h1>
