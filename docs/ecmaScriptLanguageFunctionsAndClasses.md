# ECMAScript Language: Functions and Classes
  <emu-note>
    <p>Various ECMAScript language elements cause the creation of ECMAScript function objects (<emu-xref href="#sec-ecmascript-function-objects"></emu-xref>). Evaluation of such functions starts with the execution of their [[Call]] internal method (<emu-xref href="#sec-ecmascript-function-objects-call-thisargument-argumentslist"></emu-xref>).</p>
  </emu-note>

  <emu-clause id="sec-parameter-lists">
    <h1>Parameter Lists</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      UniqueFormalParameters[Yield, Await] :
        FormalParameters[?Yield, ?Await]

      FormalParameters[Yield, Await] :
        [empty]
        FunctionRestParameter[?Yield, ?Await]
        FormalParameterList[?Yield, ?Await]
        FormalParameterList[?Yield, ?Await] `,`
        FormalParameterList[?Yield, ?Await] `,` FunctionRestParameter[?Yield, ?Await]

      FormalParameterList[Yield, Await] :
        FormalParameter[?Yield, ?Await]
        FormalParameterList[?Yield, ?Await] `,` FormalParameter[?Yield, ?Await]

      FunctionRestParameter[Yield, Await] :
        BindingRestElement[?Yield, ?Await]

      FormalParameter[Yield, Await] :
        BindingElement[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-parameter-lists-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>UniqueFormalParameters : FormalParameters</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the BoundNames of |FormalParameters| contains any duplicate elements.
        </li>
      </ul>
      <emu-grammar>FormalParameters : FormalParameterList</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsSimpleParameterList of |FormalParameterList| is *false* and the BoundNames of |FormalParameterList| contains any duplicate elements.
        </li>
      </ul>
      <emu-note>
        <p>Multiple occurrences of the same |BindingIdentifier| in a |FormalParameterList| is only allowed for functions which have simple parameter lists and which are not defined in strict mode code.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-containsexpression" oldids="sec-destructuring-binding-patterns-static-semantics-containsexpression,sec-function-definitions-static-semantics-containsexpression,sec-arrow-function-definitions-static-semantics-containsexpression,sec-async-arrow-function-definitions-static-semantics-ContainsExpression" type="sdo">
      <h1>Static Semantics: ContainsExpression ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        ObjectBindingPattern :
          `{` `}`
          `{` BindingRestProperty `}`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` BindingPropertyList `,` BindingRestProperty `}`</emu-grammar>
      <emu-alg>
        1. Return ContainsExpression of |BindingPropertyList|.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision? `]`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. Return ContainsExpression of |BindingRestElement|.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision? `]`</emu-grammar>
      <emu-alg>
        1. Return ContainsExpression of |BindingElementList|.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. Let _has_ be ContainsExpression of |BindingElementList|.
        1. If _has_ is *true*, return *true*.
        1. Return ContainsExpression of |BindingRestElement|.
      </emu-alg>
      <emu-grammar>BindingPropertyList : BindingPropertyList `,` BindingProperty</emu-grammar>
      <emu-alg>
        1. Let _has_ be ContainsExpression of |BindingPropertyList|.
        1. If _has_ is *true*, return *true*.
        1. Return ContainsExpression of |BindingProperty|.
      </emu-alg>
      <emu-grammar>BindingElementList : BindingElementList `,` BindingElisionElement</emu-grammar>
      <emu-alg>
        1. Let _has_ be ContainsExpression of |BindingElementList|.
        1. If _has_ is *true*, return *true*.
        1. Return ContainsExpression of |BindingElisionElement|.
      </emu-alg>
      <emu-grammar>BindingElisionElement : Elision? BindingElement</emu-grammar>
      <emu-alg>
        1. Return ContainsExpression of |BindingElement|.
      </emu-alg>
      <emu-grammar>BindingProperty : PropertyName `:` BindingElement</emu-grammar>
      <emu-alg>
        1. Let _has_ be IsComputedPropertyKey of |PropertyName|.
        1. If _has_ is *true*, return *true*.
        1. Return ContainsExpression of |BindingElement|.
      </emu-alg>
      <emu-grammar>BindingElement : BindingPattern Initializer</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier Initializer</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>BindingRestElement : `...` BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>BindingRestElement : `...` BindingPattern</emu-grammar>
      <emu-alg>
        1. Return ContainsExpression of |BindingPattern|.
      </emu-alg>
      <emu-grammar>FormalParameters : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>FormalParameters : FormalParameterList `,` FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. If ContainsExpression of |FormalParameterList| is *true*, return *true*.
        1. Return ContainsExpression of |FunctionRestParameter|.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. If ContainsExpression of |FormalParameterList| is *true*, return *true*.
        1. Return ContainsExpression of |FormalParameter|.
      </emu-alg>
      <emu-grammar>ArrowParameters : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return ContainsExpression of _formals_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowBindingIdentifier : BindingIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-issimpleparameterlist" oldids="sec-destructuring-binding-patterns-static-semantics-issimpleparameterlist,sec-function-definitions-static-semantics-issimpleparameterlist,sec-arrow-function-definitions-static-semantics-issimpleparameterlist,sec-async-arrow-function-definitions-static-semantics-IsSimpleParameterList" type="sdo">
      <h1>Static Semantics: IsSimpleParameterList ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>BindingElement : BindingPattern</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>BindingElement : BindingPattern Initializer</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier Initializer</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>FormalParameters : [empty]</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>FormalParameters : FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>FormalParameters : FormalParameterList `,` FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. If IsSimpleParameterList of |FormalParameterList| is *false*, return *false*.
        1. Return IsSimpleParameterList of |FormalParameter|.
      </emu-alg>
      <emu-grammar>FormalParameter : BindingElement</emu-grammar>
      <emu-alg>
        1. Return IsSimpleParameterList of |BindingElement|.
      </emu-alg>
      <emu-grammar>ArrowParameters : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return IsSimpleParameterList of _formals_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowBindingIdentifier : BindingIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>
        CoverCallExpressionAndAsyncArrowHead : MemberExpression Arguments
      </emu-grammar>
      <emu-alg>
        1. Let _head_ be the |AsyncArrowHead| that is covered by |CoverCallExpressionAndAsyncArrowHead|.
        1. Return IsSimpleParameterList of _head_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-hasinitializer" oldids="sec-destructuring-binding-patterns-static-semantics-hasinitializer,sec-function-definitions-static-semantics-hasinitializer" type="sdo">
      <h1>Static Semantics: HasInitializer ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>BindingElement : BindingPattern</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>BindingElement : BindingPattern Initializer</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier Initializer</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. If HasInitializer of |FormalParameterList| is *true*, return *true*.
        1. Return HasInitializer of |FormalParameter|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-expectedargumentcount" oldids="sec-function-definitions-static-semantics-expectedargumentcount,sec-arrow-function-definitions-static-semantics-expectedargumentcount,sec-method-definitions-static-semantics-expectedargumentcount,sec-async-arrow-function-definitions-static-semantics-ExpectedArgumentCount" type="sdo">
      <h1>Static Semantics: ExpectedArgumentCount ( ): a non-negative integer</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        FormalParameters :
          [empty]
          FunctionRestParameter
      </emu-grammar>
      <emu-alg>
        1. Return 0.
      </emu-alg>
      <emu-grammar>FormalParameters : FormalParameterList `,` FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. Return the ExpectedArgumentCount of |FormalParameterList|.
      </emu-alg>
      <emu-note>
        <p>The ExpectedArgumentCount of a |FormalParameterList| is the number of |FormalParameters| to the left of either the rest parameter or the first |FormalParameter| with an Initializer. A |FormalParameter| without an initializer is allowed after the first parameter with an initializer but such parameters are considered to be optional with *undefined* as their default value.</p>
      </emu-note>
      <emu-grammar>FormalParameterList : FormalParameter</emu-grammar>
      <emu-alg>
        1. If HasInitializer of |FormalParameter| is *true*, return 0.
        1. Return 1.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. Let _count_ be the ExpectedArgumentCount of |FormalParameterList|.
        1. If HasInitializer of |FormalParameterList| is *true* or HasInitializer of |FormalParameter| is *true*, return _count_.
        1. Return _count_ + 1.
      </emu-alg>
      <emu-grammar>ArrowParameters : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Return 1.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return the ExpectedArgumentCount of _formals_.
      </emu-alg>
      <emu-grammar>PropertySetParameterList : FormalParameter</emu-grammar>
      <emu-alg>
        1. If HasInitializer of |FormalParameter| is *true*, return 0.
        1. Return 1.
      </emu-alg>
      <emu-grammar>
        AsyncArrowBindingIdentifier : BindingIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return 1.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-function-definitions">
    <h1>Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      FunctionDeclaration[Yield, Await, Default] :
        `function` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[~Yield, ~Await] `)` `{` FunctionBody[~Yield, ~Await] `}`
        [+Default] `function` `(` FormalParameters[~Yield, ~Await] `)` `{` FunctionBody[~Yield, ~Await] `}`

      FunctionExpression :
        `function` BindingIdentifier[~Yield, ~Await]? `(` FormalParameters[~Yield, ~Await] `)` `{` FunctionBody[~Yield, ~Await] `}`

      FunctionBody[Yield, Await] :
        FunctionStatementList[?Yield, ?Await]

      FunctionStatementList[Yield, Await] :
        StatementList[?Yield, ?Await, +Return]?
    </emu-grammar>

    <emu-clause id="sec-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>
        FunctionDeclaration :
          `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
          `function` `(` FormalParameters `)` `{` FunctionBody `}`

        FunctionExpression :
          `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`
      </emu-grammar>
      <ul>
        <li>
          If IsStrict(|FormalParameters|) is *true*, the Early Error rules for <emu-grammar>UniqueFormalParameters : FormalParameters</emu-grammar> are applied.
        </li>
        <li>
          If |BindingIdentifier| is present and IsStrict(|BindingIdentifier|) is *true*, it is a Syntax Error if the StringValue of |BindingIdentifier| is either *"eval"* or *"arguments"*.
        </li>
        <li>
          It is a Syntax Error if FunctionBodyContainsUseStrict of |FunctionBody| is *true* and IsSimpleParameterList of |FormalParameters| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |FormalParameters| also occurs in the LexicallyDeclaredNames of |FunctionBody|.
        </li>
        <li>
          It is a Syntax Error if |FormalParameters| Contains |SuperProperty| is *true*.
        </li>
        <li>
          It is a Syntax Error if |FunctionBody| Contains |SuperProperty| is *true*.
        </li>
        <li>
          It is a Syntax Error if |FormalParameters| Contains |SuperCall| is *true*.
        </li>
        <li>
          It is a Syntax Error if |FunctionBody| Contains |SuperCall| is *true*.
        </li>
      </ul>
      <emu-note>
        <p>The LexicallyDeclaredNames of a |FunctionBody| does not include identifiers bound using var or function declarations.</p>
      </emu-note>
      <emu-grammar>FunctionBody : FunctionStatementList</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the LexicallyDeclaredNames of |FunctionStatementList| contains any duplicate entries.
        </li>
        <li>
          It is a Syntax Error if any element of the LexicallyDeclaredNames of |FunctionStatementList| also occurs in the VarDeclaredNames of |FunctionStatementList|.
        </li>
        <li>
          It is a Syntax Error if ContainsDuplicateLabels of |FunctionStatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedBreakTarget of |FunctionStatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedContinueTarget of |FunctionStatementList| with arguments « » and « » is *true*.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-static-semantics-functionbodycontainsusestrict" oldids="sec-function-definitions-static-semantics-containsusestrict" type="sdo">
      <h1>Static Semantics: FunctionBodyContainsUseStrict ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>FunctionBody : FunctionStatementList</emu-grammar>
      <emu-alg>
        1. If the Directive Prologue of |FunctionBody| contains a Use Strict Directive, return *true*; otherwise, return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluatefunctionbody" oldids="sec-function-definitions-runtime-semantics-evaluatebody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateFunctionBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a return completion or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>FunctionBody : FunctionStatementList</emu-grammar>
      <emu-alg>
        1. Perform ? FunctionDeclarationInstantiation(_functionObject_, _argumentsList_).
        1. Perform ? Evaluation of |FunctionStatementList|.
        1. NOTE: If the previous step resulted in a normal completion, then evaluation finished by proceeding past the end of the |FunctionStatementList|.
        1. Return ReturnCompletion(*undefined*).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateordinaryfunctionobject" oldids="sec-function-definitions-runtime-semantics-instantiatefunctionobject" type="sdo">
      <h1>
        Runtime Semantics: InstantiateOrdinaryFunctionObject (
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>FunctionDeclaration : `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _name_ be the StringValue of |BindingIdentifier|.
        1. Let _sourceText_ be the source text matched by |FunctionDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |FormalParameters|, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, _name_).
        1. Perform MakeConstructor(_F_).
        1. Return _F_.
      </emu-alg>
      <emu-grammar>FunctionDeclaration : `function` `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _sourceText_ be the source text matched by |FunctionDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |FormalParameters|, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, *"default"*).
        1. Perform MakeConstructor(_F_).
        1. Return _F_.
      </emu-alg>
      <emu-note>
        <p>An anonymous |FunctionDeclaration| can only occur as part of an `export default` declaration, and its function code is therefore always strict mode code.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateordinaryfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateOrdinaryFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>FunctionExpression : `function` `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |FunctionExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |FormalParameters|, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Perform MakeConstructor(_closure_).
        1. Return _closure_.
      </emu-alg>
      <emu-grammar>FunctionExpression : `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Assert: _name_ is not present.
        1. Set _name_ to the StringValue of |BindingIdentifier|.
        1. Let _outerEnv_ be the running execution context's LexicalEnvironment.
        1. Let _funcEnv_ be NewDeclarativeEnvironment(_outerEnv_).
        1. Perform ! _funcEnv_.CreateImmutableBinding(_name_, *false*).
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |FunctionExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |FormalParameters|, |FunctionBody|, ~non-lexical-this~, _funcEnv_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Perform MakeConstructor(_closure_).
        1. Perform ! _funcEnv_.InitializeBinding(_name_, _closure_).
        1. Return _closure_.
      </emu-alg>
      <emu-note>
        <p>The |BindingIdentifier| in a |FunctionExpression| can be referenced from inside the |FunctionExpression|'s |FunctionBody| to allow the function to call itself recursively. However, unlike in a |FunctionDeclaration|, the |BindingIdentifier| in a |FunctionExpression| cannot be referenced from and does not affect the scope enclosing the |FunctionExpression|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-function-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>FunctionDeclaration : `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-note>
        <p>An alternative semantics is provided in <emu-xref href="#sec-block-level-function-declarations-web-legacy-compatibility-semantics"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>FunctionDeclaration : `function` `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>
        FunctionExpression : `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateOrdinaryFunctionExpression of |FunctionExpression|.
      </emu-alg>
      <emu-note>
        <p>A *"prototype"* property is automatically created for every function defined using a |FunctionDeclaration| or |FunctionExpression|, to allow for the possibility that the function will be used as a constructor.</p>
      </emu-note>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *undefined*.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-arrow-function-definitions">
    <h1>Arrow Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ArrowFunction[In, Yield, Await] :
        ArrowParameters[?Yield, ?Await] [no LineTerminator here] `=>` ConciseBody[?In]

      ArrowParameters[Yield, Await] :
        BindingIdentifier[?Yield, ?Await]
        CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await] #parencover

      ConciseBody[In] :
        [lookahead != `{`] ExpressionBody[?In, ~Await]
        `{` FunctionBody[~Yield, ~Await] `}`

      ExpressionBody[In, Await] :
        AssignmentExpression[?In, ~Yield, ?Await]
    </emu-grammar>
    <h2>Supplemental Syntax</h2>
    <p>
      When processing an instance of the production<br>
      <emu-grammar>ArrowParameters[Yield, Await] : CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]</emu-grammar><br>
      the interpretation of |CoverParenthesizedExpressionAndArrowParameterList| is refined using the following grammar:
    </p>
    <emu-grammar type="definition">
      ArrowFormalParameters[Yield, Await] :
        `(` UniqueFormalParameters[?Yield, ?Await] `)`
    </emu-grammar>

    <emu-clause id="sec-arrow-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>ArrowFunction : ArrowParameters `=>` ConciseBody</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if |ArrowParameters| Contains |YieldExpression| is *true*.
        </li>
        <li>
          It is a Syntax Error if |ArrowParameters| Contains |AwaitExpression| is *true*.
        </li>
        <li>
          It is a Syntax Error if ConciseBodyContainsUseStrict of |ConciseBody| is *true* and IsSimpleParameterList of |ArrowParameters| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |ArrowParameters| also occurs in the LexicallyDeclaredNames of |ConciseBody|.
        </li>
      </ul>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <ul>
        <li>
          |CoverParenthesizedExpressionAndArrowParameterList| must cover an |ArrowFormalParameters|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-static-semantics-concisebodycontainsusestrict" oldids="sec-arrow-function-definitions-static-semantics-containsusestrict" type="sdo">
      <h1>Static Semantics: ConciseBodyContainsUseStrict ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ConciseBody : `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return FunctionBodyContainsUseStrict of |FunctionBody|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluateconcisebody" oldids="sec-arrow-function-definitions-runtime-semantics-evaluatebody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateConciseBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a return completion or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Perform ? FunctionDeclarationInstantiation(_functionObject_, _argumentsList_).
        1. Return ? Evaluation of |ExpressionBody|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiatearrowfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateArrowFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>ArrowFunction : ArrowParameters `=>` ConciseBody</emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |ArrowFunction|.
        1. [id="step-arrowfunction-evaluation-functioncreate"] Let _closure_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |ArrowParameters|, |ConciseBody|, ~lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Return _closure_.
      </emu-alg>
      <emu-note>
        <p>An |ArrowFunction| does not define local bindings for `arguments`, `super`, `this`, or `new.target`. Any reference to `arguments`, `super`, `this`, or `new.target` within an |ArrowFunction| must resolve to a binding in a lexically enclosing environment. Typically this will be the Function Environment of an immediately enclosing function. Even though an |ArrowFunction| may contain references to `super`, the function object created in step <emu-xref href="#step-arrowfunction-evaluation-functioncreate"></emu-xref> is not made into a method by performing MakeMethod. An |ArrowFunction| that references `super` is always contained within a non-|ArrowFunction| and the necessary state to implement `super` is accessible via the _env_ that is captured by the function object of the |ArrowFunction|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-arrow-function-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ArrowFunction : ArrowParameters `=>` ConciseBody</emu-grammar>
      <emu-alg>
        1. Return InstantiateArrowFunctionExpression of |ArrowFunction|.
      </emu-alg>
      <emu-grammar>ExpressionBody : AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |AssignmentExpression|.
        1. Let _exprValue_ be ? GetValue(_exprRef_).
        1. Return ReturnCompletion(_exprValue_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-method-definitions">
    <h1>Method Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      MethodDefinition[Yield, Await] :
        ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[~Yield, ~Await] `)` `{` FunctionBody[~Yield, ~Await] `}`
        GeneratorMethod[?Yield, ?Await]
        AsyncMethod[?Yield, ?Await]
        AsyncGeneratorMethod[?Yield, ?Await]
        `get` ClassElementName[?Yield, ?Await] `(` `)` `{` FunctionBody[~Yield, ~Await] `}`
        `set` ClassElementName[?Yield, ?Await] `(` PropertySetParameterList `)` `{` FunctionBody[~Yield, ~Await] `}`

      PropertySetParameterList :
        FormalParameter[~Yield, ~Await]
    </emu-grammar>

    <emu-clause id="sec-method-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>MethodDefinition : ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if FunctionBodyContainsUseStrict of |FunctionBody| is *true* and IsSimpleParameterList of |UniqueFormalParameters| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |UniqueFormalParameters| also occurs in the LexicallyDeclaredNames of |FunctionBody|.
        </li>
      </ul>
      <emu-grammar>MethodDefinition : `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the BoundNames of |PropertySetParameterList| contains any duplicate elements.
        </li>
        <li>
          It is a Syntax Error if FunctionBodyContainsUseStrict of |FunctionBody| is *true* and IsSimpleParameterList of |PropertySetParameterList| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |PropertySetParameterList| also occurs in the LexicallyDeclaredNames of |FunctionBody|.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-static-semantics-hasdirectsuper" oldids="sec-method-definitions-static-semantics-hasdirectsuper,sec-generator-function-definitions-static-semantics-hasdirectsuper,sec-async-generator-function-definitions-static-semantics-hasdirectsuper,sec-async-function-definitions-static-semantics-HasDirectSuper" type="sdo">
      <h1>Static Semantics: HasDirectSuper ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>MethodDefinition : ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. If |UniqueFormalParameters| Contains |SuperCall| is *true*, return *true*.
        1. Return |FunctionBody| Contains |SuperCall|.
      </emu-alg>
      <emu-grammar>MethodDefinition : `get` ClassElementName `(` `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return |FunctionBody| Contains |SuperCall|.
      </emu-alg>
      <emu-grammar>MethodDefinition : `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. If |PropertySetParameterList| Contains |SuperCall| is *true*, return *true*.
        1. Return |FunctionBody| Contains |SuperCall|.
      </emu-alg>
      <emu-grammar>GeneratorMethod : `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. If |UniqueFormalParameters| Contains |SuperCall| is *true*, return *true*.
        1. Return |GeneratorBody| Contains |SuperCall|.
      </emu-alg>
      <emu-grammar>AsyncGeneratorMethod : `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. If |UniqueFormalParameters| Contains |SuperCall| is *true*, return *true*.
        1. Return |AsyncGeneratorBody| Contains |SuperCall|.
      </emu-alg>
      <emu-grammar>
        AsyncMethod : `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. If |UniqueFormalParameters| Contains |SuperCall| is *true*, return *true*.
        1. Return |AsyncFunctionBody| Contains |SuperCall|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-specialmethod" type="sdo">
      <h1>Static Semantics: SpecialMethod ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>MethodDefinition : ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        MethodDefinition :
          GeneratorMethod
          AsyncMethod
          AsyncGeneratorMethod
          `get` ClassElementName `(` `)` `{` FunctionBody `}`
          `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-definemethod" type="sdo">
      <h1>
        Runtime Semantics: DefineMethod (
          _object_: an Object,
          optional _functionPrototype_: an Object,
        ): either a normal completion containing a Record with fields [[Key]] (a property key) and [[Closure]] (an ECMAScript function object) or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>MethodDefinition : ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. If _functionPrototype_ is present, then
          1. Let _prototype_ be _functionPrototype_.
        1. Else,
          1. Let _prototype_ be %Function.prototype%.
        1. Let _sourceText_ be the source text matched by |MethodDefinition|.
        1. Let _closure_ be OrdinaryFunctionCreate(_prototype_, _sourceText_, |UniqueFormalParameters|, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Return the Record { [[Key]]: _propKey_, [[Closure]]: _closure_ }.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-methoddefinitionevaluation" oldids="sec-method-definitions-runtime-semantics-propertydefinitionevaluation,sec-generator-function-definitions-runtime-semantics-propertydefinitionevaluation,sec-asyncgenerator-definitions-propertydefinitionevaluation,sec-async-function-definitions-PropertyDefinitionEvaluation" type="sdo">
      <h1>
        Runtime Semantics: MethodDefinitionEvaluation (
          _object_: an Object,
          _enumerable_: a Boolean,
        ): either a normal completion containing either a PrivateElement or ~unused~, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>MethodDefinition : ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _methodDef_ be ? DefineMethod of |MethodDefinition| with argument _object_.
        1. Perform SetFunctionName(_methodDef_.[[Closure]], _methodDef_.[[Key]]).
        1. Return ? DefineMethodProperty(_object_, _methodDef_.[[Key]], _methodDef_.[[Closure]], _enumerable_).
      </emu-alg>
      <emu-grammar>MethodDefinition : `get` ClassElementName `(` `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |MethodDefinition|.
        1. Let _formalParameterList_ be an instance of the production <emu-grammar>FormalParameters : [empty]</emu-grammar>.
        1. Let _closure_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, _formalParameterList_, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Perform SetFunctionName(_closure_, _propKey_, *"get"*).
        1. If _propKey_ is a Private Name, then
          1. Return PrivateElement { [[Key]]: _propKey_, [[Kind]]: ~accessor~, [[Get]]: _closure_, [[Set]]: *undefined* }.
        1. Else,
          1. Let _desc_ be the PropertyDescriptor { [[Get]]: _closure_, [[Enumerable]]: _enumerable_, [[Configurable]]: *true* }.
          1. Perform ? DefinePropertyOrThrow(_object_, _propKey_, _desc_).
          1. Return ~unused~.
      </emu-alg>
      <emu-grammar>MethodDefinition : `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |MethodDefinition|.
        1. Let _closure_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, |PropertySetParameterList|, |FunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Perform SetFunctionName(_closure_, _propKey_, *"set"*).
        1. If _propKey_ is a Private Name, then
          1. Return PrivateElement { [[Key]]: _propKey_, [[Kind]]: ~accessor~, [[Get]]: *undefined*, [[Set]]: _closure_ }.
        1. Else,
          1. Let _desc_ be the PropertyDescriptor { [[Set]]: _closure_, [[Enumerable]]: _enumerable_, [[Configurable]]: *true* }.
          1. Perform ? DefinePropertyOrThrow(_object_, _propKey_, _desc_).
          1. Return ~unused~.
      </emu-alg>
      <emu-grammar>GeneratorMethod : `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |GeneratorMethod|.
        1. Let _closure_ be OrdinaryFunctionCreate(%GeneratorFunction.prototype%, _sourceText_, |UniqueFormalParameters|, |GeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Perform SetFunctionName(_closure_, _propKey_).
        1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return ? DefineMethodProperty(_object_, _propKey_, _closure_, _enumerable_).
      </emu-alg>
      <emu-grammar>
        AsyncGeneratorMethod : `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncGeneratorMethod|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncGeneratorFunction.prototype%, _sourceText_, |UniqueFormalParameters|, |AsyncGeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Perform SetFunctionName(_closure_, _propKey_).
        1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return ? DefineMethodProperty(_object_, _propKey_, _closure_, _enumerable_).
      </emu-alg>
      <emu-grammar>
        AsyncMethod : `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _propKey_ be ? Evaluation of |ClassElementName|.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncMethod|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, |UniqueFormalParameters|, |AsyncFunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform MakeMethod(_closure_, _object_).
        1. Perform SetFunctionName(_closure_, _propKey_).
        1. Return ? DefineMethodProperty(_object_, _propKey_, _closure_, _enumerable_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-generator-function-definitions">
    <h1>Generator Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      GeneratorDeclaration[Yield, Await, Default] :
        `function` `*` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[+Yield, ~Await] `)` `{` GeneratorBody `}`
        [+Default] `function` `*` `(` FormalParameters[+Yield, ~Await] `)` `{` GeneratorBody `}`

      GeneratorExpression :
        `function` `*` BindingIdentifier[+Yield, ~Await]? `(` FormalParameters[+Yield, ~Await] `)` `{` GeneratorBody `}`

      GeneratorMethod[Yield, Await] :
        `*` ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[+Yield, ~Await] `)` `{` GeneratorBody `}`

      GeneratorBody :
        FunctionBody[+Yield, ~Await]

      YieldExpression[In, Await] :
        `yield`
        `yield` [no LineTerminator here] AssignmentExpression[?In, +Yield, ?Await]
        `yield` [no LineTerminator here] `*` AssignmentExpression[?In, +Yield, ?Await]
    </emu-grammar>
    <emu-note>
      <p>The syntactic context immediately following `yield` requires use of the |InputElementRegExpOrTemplateTail| lexical goal.</p>
    </emu-note>
    <emu-note>
      <p>|YieldExpression| cannot be used within the |FormalParameters| of a generator function because any expressions that are part of |FormalParameters| are evaluated before the resulting Generator is in a resumable state.</p>
    </emu-note>
    <emu-note>
      <p>Abstract operations relating to Generators are defined in <emu-xref href="#sec-generator-abstract-operations"></emu-xref>.</p>
    </emu-note>

    <emu-clause id="sec-generator-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>GeneratorMethod : `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if HasDirectSuper of |GeneratorMethod| is *true*.
        </li>
        <li>
          It is a Syntax Error if |UniqueFormalParameters| Contains |YieldExpression| is *true*.
        </li>
        <li>
          It is a Syntax Error if FunctionBodyContainsUseStrict of |GeneratorBody| is *true* and IsSimpleParameterList of |UniqueFormalParameters| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |UniqueFormalParameters| also occurs in the LexicallyDeclaredNames of |GeneratorBody|.
        </li>
      </ul>
      <emu-grammar>
        GeneratorDeclaration :
          `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
          `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`

        GeneratorExpression :
          `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`
      </emu-grammar>
      <ul>
        <li>
          If IsStrict(|FormalParameters|) is *true*, the Early Error rules for <emu-grammar>UniqueFormalParameters : FormalParameters</emu-grammar> are applied.
        </li>
        <li>
          If |BindingIdentifier| is present and IsStrict(|BindingIdentifier|) is *true*, it is a Syntax Error if the StringValue of |BindingIdentifier| is either *"eval"* or *"arguments"*.
        </li>
        <li>
          It is a Syntax Error if FunctionBodyContainsUseStrict of |GeneratorBody| is *true* and IsSimpleParameterList of |FormalParameters| is *false*.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |FormalParameters| also occurs in the LexicallyDeclaredNames of |GeneratorBody|.
        </li>
        <li>
          It is a Syntax Error if |FormalParameters| Contains |YieldExpression| is *true*.
        </li>
        <li>
          It is a Syntax Error if |FormalParameters| Contains |SuperProperty| is *true*.
        </li>
        <li>
          It is a Syntax Error if |GeneratorBody| Contains |SuperProperty| is *true*.
        </li>
        <li>
          It is a Syntax Error if |FormalParameters| Contains |SuperCall| is *true*.
        </li>
        <li>
          It is a Syntax Error if |GeneratorBody| Contains |SuperCall| is *true*.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluategeneratorbody" oldids="sec-generator-function-definitions-runtime-semantics-evaluatebody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateGeneratorBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a throw completion or a return completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>GeneratorBody : FunctionBody</emu-grammar>
      <emu-alg>
        1. Perform ? FunctionDeclarationInstantiation(_functionObject_, _argumentsList_).
        1. Let _G_ be ? OrdinaryCreateFromConstructor(_functionObject_, *"%GeneratorPrototype%"*, « [[GeneratorState]], [[GeneratorContext]], [[GeneratorBrand]] »).
        1. Set _G_.[[GeneratorBrand]] to ~empty~.
        1. Set _G_.[[GeneratorState]] to ~suspended-start~.
        1. Perform GeneratorStart(_G_, |FunctionBody|).
        1. Return ReturnCompletion(_G_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiategeneratorfunctionobject" oldids="sec-generator-function-definitions-runtime-semantics-instantiatefunctionobject" type="sdo">
      <h1>
        Runtime Semantics: InstantiateGeneratorFunctionObject (
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>GeneratorDeclaration : `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Let _name_ be the StringValue of |BindingIdentifier|.
        1. Let _sourceText_ be the source text matched by |GeneratorDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%GeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |GeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _F_.
      </emu-alg>
      <emu-grammar>GeneratorDeclaration : `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Let _sourceText_ be the source text matched by |GeneratorDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%GeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |GeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, *"default"*).
        1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _F_.
      </emu-alg>
      <emu-note>
        <p>An anonymous |GeneratorDeclaration| can only occur as part of an `export default` declaration, and its function code is therefore always strict mode code.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiategeneratorfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateGeneratorFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>GeneratorExpression : `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |GeneratorExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%GeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |GeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _closure_.
      </emu-alg>
      <emu-grammar>GeneratorExpression : `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Assert: _name_ is not present.
        1. Set _name_ to the StringValue of |BindingIdentifier|.
        1. Let _outerEnv_ be the running execution context's LexicalEnvironment.
        1. Let _funcEnv_ be NewDeclarativeEnvironment(_outerEnv_).
        1. Perform ! _funcEnv_.CreateImmutableBinding(_name_, *false*).
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |GeneratorExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%GeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |GeneratorBody|, ~non-lexical-this~, _funcEnv_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%GeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Perform ! _funcEnv_.InitializeBinding(_name_, _closure_).
        1. Return _closure_.
      </emu-alg>
      <emu-note>
        <p>The |BindingIdentifier| in a |GeneratorExpression| can be referenced from inside the |GeneratorExpression|'s |FunctionBody| to allow the generator code to call itself recursively. However, unlike in a |GeneratorDeclaration|, the |BindingIdentifier| in a |GeneratorExpression| cannot be referenced from and does not affect the scope enclosing the |GeneratorExpression|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-generator-function-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        GeneratorExpression : `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateGeneratorFunctionExpression of |GeneratorExpression|.
      </emu-alg>
      <emu-grammar>YieldExpression : `yield`</emu-grammar>
      <emu-alg>
        1. Return ? Yield(*undefined*).
      </emu-alg>
      <emu-grammar>YieldExpression : `yield` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |AssignmentExpression|.
        1. Let _value_ be ? GetValue(_exprRef_).
        1. Return ? Yield(_value_).
      </emu-alg>
      <emu-grammar>YieldExpression : `yield` `*` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _generatorKind_ be GetGeneratorKind().
        1. Let _exprRef_ be ? Evaluation of |AssignmentExpression|.
        1. Let _value_ be ? GetValue(_exprRef_).
        1. Let _iteratorRecord_ be ? GetIterator(_value_, _generatorKind_).
        1. Let _iterator_ be _iteratorRecord_.[[Iterator]].
        1. Let _received_ be NormalCompletion(*undefined*).
        1. Repeat,
          1. If _received_ is a normal completion, then
            1. Let _innerResult_ be ? Call(_iteratorRecord_.[[NextMethod]], _iteratorRecord_.[[Iterator]], « _received_.[[Value]] »).
            1. If _generatorKind_ is ~async~, set _innerResult_ to ? Await(_innerResult_).
            1. If _innerResult_ is not an Object, throw a *TypeError* exception.
            1. Let _done_ be ? IteratorComplete(_innerResult_).
            1. If _done_ is *true*, then
              1. Return ? IteratorValue(_innerResult_).
            1. If _generatorKind_ is ~async~, set _received_ to Completion(AsyncGeneratorYield(? IteratorValue(_innerResult_))).
            1. Else, set _received_ to Completion(GeneratorYield(_innerResult_)).
          1. Else if _received_ is a throw completion, then
            1. Let _throw_ be ? GetMethod(_iterator_, *"throw"*).
            1. If _throw_ is not *undefined*, then
              1. Let _innerResult_ be ? Call(_throw_, _iterator_, « _received_.[[Value]] »).
              1. If _generatorKind_ is ~async~, set _innerResult_ to ? Await(_innerResult_).
              1. NOTE: Exceptions from the inner iterator `throw` method are propagated. Normal completions from an inner `throw` method are processed similarly to an inner `next`.
              1. If _innerResult_ is not an Object, throw a *TypeError* exception.
              1. Let _done_ be ? IteratorComplete(_innerResult_).
              1. If _done_ is *true*, then
                1. Return ? IteratorValue(_innerResult_).
              1. If _generatorKind_ is ~async~, set _received_ to Completion(AsyncGeneratorYield(? IteratorValue(_innerResult_))).
              1. Else, set _received_ to Completion(GeneratorYield(_innerResult_)).
            1. Else,
              1. NOTE: If _iterator_ does not have a `throw` method, this throw is going to terminate the `yield*` loop. But first we need to give _iterator_ a chance to clean up.
              1. Let _closeCompletion_ be NormalCompletion(~empty~).
              1. If _generatorKind_ is ~async~, perform ? AsyncIteratorClose(_iteratorRecord_, _closeCompletion_).
              1. Else, perform ? IteratorClose(_iteratorRecord_, _closeCompletion_).
              1. NOTE: The next step throws a *TypeError* to indicate that there was a `yield*` protocol violation: _iterator_ does not have a `throw` method.
              1. Throw a *TypeError* exception.
          1. Else,
            1. Assert: _received_ is a return completion.
            1. Let _return_ be ? GetMethod(_iterator_, *"return"*).
            1. If _return_ is *undefined*, then
              1. Set _value_ to _received_.[[Value]].
              1. If _generatorKind_ is ~async~, then
                1. Set _value_ to ? Await(_value_).
              1. Return ReturnCompletion(_value_).
            1. Let _innerReturnResult_ be ? Call(_return_, _iterator_, « _received_.[[Value]] »).
            1. If _generatorKind_ is ~async~, set _innerReturnResult_ to ? Await(_innerReturnResult_).
            1. If _innerReturnResult_ is not an Object, throw a *TypeError* exception.
            1. Let _done_ be ? IteratorComplete(_innerReturnResult_).
            1. If _done_ is *true*, then
              1. Set _value_ to ? IteratorValue(_innerReturnResult_).
              1. Return ReturnCompletion(_value_).
            1. If _generatorKind_ is ~async~, set _received_ to Completion(AsyncGeneratorYield(? IteratorValue(_innerReturnResult_))).
            1. Else, set _received_ to Completion(GeneratorYield(_innerReturnResult_)).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-async-generator-function-definitions">
    <h1>Async Generator Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      AsyncGeneratorDeclaration[Yield, Await, Default] :
        `async` [no LineTerminator here] `function` `*` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`
        [+Default] `async` [no LineTerminator here] `function` `*` `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

      AsyncGeneratorExpression :
        `async` [no LineTerminator here] `function` `*` BindingIdentifier[+Yield, +Await]? `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

      AsyncGeneratorMethod[Yield, Await] :
        `async` [no LineTerminator here] `*` ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

      AsyncGeneratorBody :
        FunctionBody[+Yield, +Await]
    </emu-grammar>
    <emu-note>
      <p>|YieldExpression| and |AwaitExpression| cannot be used within the |FormalParameters| of an async generator function because any expressions that are part of |FormalParameters| are evaluated before the resulting AsyncGenerator is in a resumable state.</p>
    </emu-note>
    <emu-note>
      <p>Abstract operations relating to AsyncGenerators are defined in <emu-xref href="#sec-asyncgenerator-abstract-operations"></emu-xref>.</p>
    </emu-note>

    <emu-clause id="sec-async-generator-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>AsyncGeneratorMethod : `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <ul>
        <li>It is a Syntax Error if HasDirectSuper of |AsyncGeneratorMethod| is *true*.</li>
        <li>It is a Syntax Error if |UniqueFormalParameters| Contains |YieldExpression| is *true*.</li>
        <li>It is a Syntax Error if |UniqueFormalParameters| Contains |AwaitExpression| is *true*.</li>
        <li>It is a Syntax Error if FunctionBodyContainsUseStrict of |AsyncGeneratorBody| is *true* and IsSimpleParameterList of |UniqueFormalParameters| is *false*.</li>
        <li>It is a Syntax Error if any element of the BoundNames of |UniqueFormalParameters| also occurs in the LexicallyDeclaredNames of |AsyncGeneratorBody|.</li>
      </ul>
      <emu-grammar>
        AsyncGeneratorDeclaration :
          `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
          `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncGeneratorExpression :
          `async` `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <ul>
        <li>If IsStrict(|FormalParameters|) is *true*, the Early Error rules for <emu-grammar>UniqueFormalParameters : FormalParameters</emu-grammar> are applied.</li>
        <li>If |BindingIdentifier| is present and IsStrict(|BindingIdentifier|) is *true*, it is a Syntax Error if the StringValue of |BindingIdentifier| is either *"eval"* or *"arguments"*.</li>
        <li>It is a Syntax Error if FunctionBodyContainsUseStrict of |AsyncGeneratorBody| is *true* and IsSimpleParameterList of |FormalParameters| is *false*.</li>
        <li>It is a Syntax Error if any element of the BoundNames of |FormalParameters| also occurs in the LexicallyDeclaredNames of |AsyncGeneratorBody|.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |YieldExpression| is *true*.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |AwaitExpression| is *true*.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |SuperProperty| is *true*.</li>
        <li>It is a Syntax Error if |AsyncGeneratorBody| Contains |SuperProperty| is *true*.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |SuperCall| is *true*.</li>
        <li>It is a Syntax Error if |AsyncGeneratorBody| Contains |SuperCall| is *true*.</li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluateasyncgeneratorbody" oldids="sec-asyncgenerator-definitions-evaluatebody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateAsyncGeneratorBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a throw completion or a return completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncGeneratorBody : FunctionBody
      </emu-grammar>
      <emu-alg>
        1. Perform ? FunctionDeclarationInstantiation(_functionObject_, _argumentsList_).
        1. Let _generator_ be ? OrdinaryCreateFromConstructor(_functionObject_, *"%AsyncGeneratorPrototype%"*, « [[AsyncGeneratorState]], [[AsyncGeneratorContext]], [[AsyncGeneratorQueue]], [[GeneratorBrand]] »).
        1. Set _generator_.[[GeneratorBrand]] to ~empty~.
        1. Set _generator_.[[AsyncGeneratorState]] to ~suspended-start~.
        1. Perform AsyncGeneratorStart(_generator_, |FunctionBody|).
        1. Return ReturnCompletion(_generator_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateasyncgeneratorfunctionobject" oldids="sec-asyncgenerator-definitions-instantiatefunctionobject" type="sdo">
      <h1>
        Runtime Semantics: InstantiateAsyncGeneratorFunctionObject (
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncGeneratorDeclaration : `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _name_ be the StringValue of |BindingIdentifier|.
        1. Let _sourceText_ be the source text matched by |AsyncGeneratorDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%AsyncGeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncGeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _F_.
      </emu-alg>
      <emu-grammar>
        AsyncGeneratorDeclaration : `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _sourceText_ be the source text matched by |AsyncGeneratorDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%AsyncGeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncGeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, *"default"*).
        1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_F_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _F_.
      </emu-alg>
      <emu-note>
        <p>An anonymous |AsyncGeneratorDeclaration| can only occur as part of an `export default` declaration.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateasyncgeneratorfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateAsyncGeneratorFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncGeneratorExpression : `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncGeneratorExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncGeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncGeneratorBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Return _closure_.
      </emu-alg>
      <emu-grammar>
        AsyncGeneratorExpression : `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Assert: _name_ is not present.
        1. Set _name_ to the StringValue of |BindingIdentifier|.
        1. Let _outerEnv_ be the running execution context's LexicalEnvironment.
        1. Let _funcEnv_ be NewDeclarativeEnvironment(_outerEnv_).
        1. Perform ! _funcEnv_.CreateImmutableBinding(_name_, *false*).
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncGeneratorExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncGeneratorFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncGeneratorBody|, ~non-lexical-this~, _funcEnv_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Let _prototype_ be OrdinaryObjectCreate(%AsyncGeneratorPrototype%).
        1. Perform ! DefinePropertyOrThrow(_closure_, *"prototype"*, PropertyDescriptor { [[Value]]: _prototype_, [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
        1. Perform ! _funcEnv_.InitializeBinding(_name_, _closure_).
        1. Return _closure_.
      </emu-alg>
      <emu-note>
        <p>The |BindingIdentifier| in an |AsyncGeneratorExpression| can be referenced from inside the |AsyncGeneratorExpression|'s |AsyncGeneratorBody| to allow the generator code to call itself recursively. However, unlike in an |AsyncGeneratorDeclaration|, the |BindingIdentifier| in an |AsyncGeneratorExpression| cannot be referenced from and does not affect the scope enclosing the |AsyncGeneratorExpression|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-asyncgenerator-definitions-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        AsyncGeneratorExpression : `async` `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncGeneratorFunctionExpression of |AsyncGeneratorExpression|.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-class-definitions">
    <h1>Class Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ClassDeclaration[Yield, Await, Default] :
        `class` BindingIdentifier[?Yield, ?Await] ClassTail[?Yield, ?Await]
        [+Default] `class` ClassTail[?Yield, ?Await]

      ClassExpression[Yield, Await] :
        `class` BindingIdentifier[?Yield, ?Await]? ClassTail[?Yield, ?Await]

      ClassTail[Yield, Await] :
        ClassHeritage[?Yield, ?Await]? `{` ClassBody[?Yield, ?Await]? `}`

      ClassHeritage[Yield, Await] :
        `extends` LeftHandSideExpression[?Yield, ?Await]

      ClassBody[Yield, Await] :
        ClassElementList[?Yield, ?Await]

      ClassElementList[Yield, Await] :
        ClassElement[?Yield, ?Await]
        ClassElementList[?Yield, ?Await] ClassElement[?Yield, ?Await]

      ClassElement[Yield, Await] :
        MethodDefinition[?Yield, ?Await]
        `static` MethodDefinition[?Yield, ?Await]
        FieldDefinition[?Yield, ?Await] `;`
        `static` FieldDefinition[?Yield, ?Await] `;`
        ClassStaticBlock
        `;`

      FieldDefinition[Yield, Await] :
        ClassElementName[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]?

      ClassElementName[Yield, Await] :
        PropertyName[?Yield, ?Await]
        PrivateIdentifier

      ClassStaticBlock :
        `static` `{` ClassStaticBlockBody `}`

      ClassStaticBlockBody :
        ClassStaticBlockStatementList

      ClassStaticBlockStatementList :
        StatementList[~Yield, +Await, ~Return]?
    </emu-grammar>
    <emu-note>
      <p>A class definition is always strict mode code.</p>
    </emu-note>

    <emu-clause id="sec-class-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>ClassTail : ClassHeritage? `{` ClassBody `}`</emu-grammar>
      <ul>
        <li>
          <p>It is a Syntax Error if |ClassHeritage| is not present and the following algorithm returns *true*:</p>
          <emu-alg>
            1. Let _constructor_ be the ConstructorMethod of |ClassBody|.
            1. If _constructor_ is ~empty~, return *false*.
            1. Return HasDirectSuper of _constructor_.
          </emu-alg>
        </li>
      </ul>
      <emu-grammar>ClassBody : ClassElementList</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the PrototypePropertyNameList of |ClassElementList| contains more than one occurrence of *"constructor"*.
        </li>
        <li>
          It is a Syntax Error if the PrivateBoundIdentifiers of |ClassElementList| contains any duplicate entries, unless the name is used once for a getter and once for a setter and in no other entries, and the getter and setter are either both static or both non-static.
        </li>
      </ul>
      <emu-grammar>ClassElement : MethodDefinition</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the PropName of |MethodDefinition| is not *"constructor"* and HasDirectSuper of |MethodDefinition| is *true*.
        </li>
        <li>
          It is a Syntax Error if the PropName of |MethodDefinition| is *"constructor"* and SpecialMethod of |MethodDefinition| is *true*.
        </li>
      </ul>
      <emu-grammar>ClassElement : `static` MethodDefinition</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if HasDirectSuper of |MethodDefinition| is *true*.
        </li>
        <li>
          It is a Syntax Error if the PropName of |MethodDefinition| is *"prototype"*.
        </li>
      </ul>

      <emu-grammar>ClassElement : FieldDefinition `;`</emu-grammar>
      <ul>
        <li>It is a Syntax Error if the PropName of |FieldDefinition| is *"constructor"*.</li>
      </ul>

      <emu-grammar>ClassElement : `static` FieldDefinition `;`</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the PropName of |FieldDefinition| is either *"prototype"* or *"constructor"*.
        </li>
      </ul>

      <emu-grammar>
        FieldDefinition :
          ClassElementName Initializer?
      </emu-grammar>
      <ul>
        <li>It is a Syntax Error if |Initializer| is present and ContainsArguments of |Initializer| is *true*.</li>
        <li>It is a Syntax Error if |Initializer| is present and |Initializer| Contains |SuperCall| is *true*.</li>
      </ul>

      <emu-grammar>ClassElementName : PrivateIdentifier</emu-grammar>
      <ul>
        <li>It is a Syntax Error if the StringValue of |PrivateIdentifier| is *"#constructor"*.</li>
      </ul>

      <emu-grammar>ClassStaticBlockBody : ClassStaticBlockStatementList</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the LexicallyDeclaredNames of |ClassStaticBlockStatementList| contains any duplicate entries.
        </li>
        <li>
          It is a Syntax Error if any element of the LexicallyDeclaredNames of |ClassStaticBlockStatementList| also occurs in the VarDeclaredNames of |ClassStaticBlockStatementList|.
        </li>
        <li>
          It is a Syntax Error if ContainsDuplicateLabels of |ClassStaticBlockStatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedBreakTarget of |ClassStaticBlockStatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedContinueTarget of |ClassStaticBlockStatementList| with arguments « » and « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsArguments of |ClassStaticBlockStatementList| is *true*.
        </li>
        <li>
          It is a Syntax Error if |ClassStaticBlockStatementList| Contains |SuperCall| is *true*.
        </li>
        <li>
          It is a Syntax Error if |ClassStaticBlockStatementList| Contains `await` is *true*.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-static-semantics-classelementkind" type="sdo">
      <h1>Static Semantics: ClassElementKind ( ): ~constructor-method~, ~non-constructor-method~, or ~empty~</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassElement : MethodDefinition</emu-grammar>
      <emu-alg>
        1. If the PropName of |MethodDefinition| is *"constructor"*, return ~constructor-method~.
        1. Return ~non-constructor-method~.
      </emu-alg>
      <emu-grammar>
        ClassElement :
          `static` MethodDefinition
          FieldDefinition `;`
          `static` FieldDefinition `;`
      </emu-grammar>
      <emu-alg>
        1. Return ~non-constructor-method~.
      </emu-alg>
      <emu-grammar>ClassElement : ClassStaticBlock</emu-grammar>
      <emu-alg>
        1. Return ~non-constructor-method~.
      </emu-alg>
      <emu-grammar>ClassElement : `;`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-constructormethod" type="sdo">
      <h1>Static Semantics: ConstructorMethod ( ): a |ClassElement| Parse Node or ~empty~</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassElementList : ClassElement</emu-grammar>
      <emu-alg>
        1. If the ClassElementKind of |ClassElement| is ~constructor-method~, return |ClassElement|.
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>ClassElementList : ClassElementList ClassElement</emu-grammar>
      <emu-alg>
        1. Let _head_ be the ConstructorMethod of |ClassElementList|.
        1. If _head_ is not ~empty~, return _head_.
        1. If the ClassElementKind of |ClassElement| is ~constructor-method~, return |ClassElement|.
        1. Return ~empty~.
      </emu-alg>
      <emu-note>
        <p>Early Error rules ensure that there is only one method definition named *"constructor"* and that it is not an accessor property or generator definition.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-isstatic" type="sdo">
      <h1>Static Semantics: IsStatic ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassElement : MethodDefinition</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassElement : `static` MethodDefinition</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>ClassElement : FieldDefinition `;`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassElement : `static` FieldDefinition `;`</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>ClassElement : ClassStaticBlock</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>ClassElement : `;`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-nonconstructorelements" oldids="sec-static-semantics-nonconstructormethoddefinitions" type="sdo">
      <h1>Static Semantics: NonConstructorElements ( ): a List of |ClassElement| Parse Nodes</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassElementList : ClassElement</emu-grammar>
      <emu-alg>
        1. If the ClassElementKind of |ClassElement| is ~non-constructor-method~, then
          1. Return « |ClassElement| ».
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ClassElementList : ClassElementList ClassElement</emu-grammar>
      <emu-alg>
        1. Let _list_ be the NonConstructorElements of |ClassElementList|.
        1. If the ClassElementKind of |ClassElement| is ~non-constructor-method~, then
          1. Append |ClassElement| to the end of _list_.
        1. Return _list_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-prototypepropertynamelist" type="sdo">
      <h1>Static Semantics: PrototypePropertyNameList ( ): a List of property keys</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassElementList : ClassElement</emu-grammar>
      <emu-alg>
        1. Let _propName_ be the PropName of |ClassElement|.
        1. If _propName_ is ~empty~, return a new empty List.
        1. If IsStatic of |ClassElement| is *true*, return a new empty List.
        1. Return « _propName_ ».
      </emu-alg>
      <emu-grammar>ClassElementList : ClassElementList ClassElement</emu-grammar>
      <emu-alg>
        1. Let _list_ be the PrototypePropertyNameList of |ClassElementList|.
        1. Let _propName_ be the PropName of |ClassElement|.
        1. If _propName_ is ~empty~, return _list_.
        1. If IsStatic of |ClassElement| is *true*, return _list_.
        1. Return the list-concatenation of _list_ and « _propName_ ».
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-allprivateidentifiersvalid" type="sdo">
      <h1>
        Static Semantics: AllPrivateIdentifiersValid (
          _names_: a List of Strings,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <p>Every grammar production alternative in this specification which is not listed below implicitly has the following default definition of AllPrivateIdentifiersValid:</p>
      <emu-alg>
        1. For each child node _child_ of this Parse Node, do
          1. If _child_ is an instance of a nonterminal, then
            1. If AllPrivateIdentifiersValid of _child_ with argument _names_ is *false*, return *false*.
        1. Return *true*.
      </emu-alg>

      <emu-grammar>MemberExpression : MemberExpression `.` PrivateIdentifier</emu-grammar>
      <emu-alg>
        1. If _names_ contains the StringValue of |PrivateIdentifier|, then
          1. Return AllPrivateIdentifiersValid of |MemberExpression| with argument _names_.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>CallExpression : CallExpression `.` PrivateIdentifier</emu-grammar>
      <emu-alg>
        1. If _names_ contains the StringValue of |PrivateIdentifier|, then
          1. Return AllPrivateIdentifiersValid of |CallExpression| with argument _names_.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>OptionalChain : `?.` PrivateIdentifier</emu-grammar>
      <emu-alg>
        1. If _names_ contains the StringValue of |PrivateIdentifier|, return *true*.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>OptionalChain : OptionalChain `.` PrivateIdentifier</emu-grammar>
      <emu-alg>
        1. If _names_ contains the StringValue of |PrivateIdentifier|, then
          1. Return AllPrivateIdentifiersValid of |OptionalChain| with argument _names_.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>ClassBody : ClassElementList</emu-grammar>
      <emu-alg>
        1. Let _newNames_ be the list-concatenation of _names_ and the PrivateBoundIdentifiers of |ClassBody|.
        1. Return AllPrivateIdentifiersValid of |ClassElementList| with argument _newNames_.
      </emu-alg>

      <emu-grammar>RelationalExpression : PrivateIdentifier `in` ShiftExpression</emu-grammar>
      <emu-alg>
        1. If _names_ contains the StringValue of |PrivateIdentifier|, then
          1. Return AllPrivateIdentifiersValid of |ShiftExpression| with argument _names_.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-privateboundidentifiers" type="sdo">
      <h1>Static Semantics: PrivateBoundIdentifiers ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        FieldDefinition : ClassElementName Initializer?
      </emu-grammar>
      <emu-alg>
        1. Return the PrivateBoundIdentifiers of |ClassElementName|.
      </emu-alg>

      <emu-grammar>
        ClassElementName : PrivateIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is the StringValue of |PrivateIdentifier|.
      </emu-alg>

      <emu-grammar>
        ClassElementName :
          PropertyName

        ClassElement :
          ClassStaticBlock
          `;`
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>

      <emu-grammar>
        ClassElementList : ClassElementList ClassElement
      </emu-grammar>
      <emu-alg>
        1. Let _names1_ be the PrivateBoundIdentifiers of |ClassElementList|.
        1. Let _names2_ be the PrivateBoundIdentifiers of |ClassElement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>

      <emu-grammar>
        MethodDefinition :
          ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`
          `get` ClassElementName `(` `)` `{` FunctionBody `}`
          `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`

        GeneratorMethod :
          `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`

        AsyncMethod :
          `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`

        AsyncGeneratorMethod :
          `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the PrivateBoundIdentifiers of |ClassElementName|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-containsarguments" type="sdo">
      <h1>Static Semantics: ContainsArguments ( ): a Boolean</h1>
      <dl class="header">
      </dl>

      <p>Every grammar production alternative in this specification which is not listed below implicitly has the following default definition of ContainsArguments:</p>
      <emu-alg>
        1. For each child node _child_ of this Parse Node, do
          1. If _child_ is an instance of a nonterminal, then
            1. If ContainsArguments of _child_ is *true*, return *true*.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>
        IdentifierReference : Identifier
      </emu-grammar>
      <emu-alg>
        1. If the StringValue of |Identifier| is *"arguments"*, return *true*.
        1. Return *false*.
      </emu-alg>

      <emu-grammar>
        FunctionDeclaration :
          `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
          `function` `(` FormalParameters `)` `{` FunctionBody `}`

        FunctionExpression :
          `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`

        GeneratorDeclaration :
          `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
          `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`

        GeneratorExpression :
          `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorDeclaration :
          `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
          `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncGeneratorExpression :
          `async` `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncFunctionDeclaration :
          `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
          `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`

        AsyncFunctionExpression :
          `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>

      <emu-grammar>
        MethodDefinition :
          ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`
          `get` ClassElementName `(` `)` `{` FunctionBody `}`
          `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`

        GeneratorMethod :
          `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorMethod :
          `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncMethod :
          `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return ContainsArguments of |ClassElementName|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-classfielddefinitionevaluation" type="sdo">
      <h1>
        Runtime Semantics: ClassFieldDefinitionEvaluation (
          _homeObject_: an Object,
        ): either a normal completion containing a ClassFieldDefinition Record or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        FieldDefinition : ClassElementName Initializer?
      </emu-grammar>
      <emu-alg>
        1. Let _name_ be ? Evaluation of |ClassElementName|.
        1. If |Initializer| is present, then
          1. Let _formalParameterList_ be an instance of the production <emu-grammar>FormalParameters : [empty]</emu-grammar>.
          1. Let _env_ be the LexicalEnvironment of the running execution context.
          1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
          1. Let _sourceText_ be the empty sequence of Unicode code points.
          1. Let _initializer_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, _formalParameterList_, |Initializer|, ~non-lexical-this~, _env_, _privateEnv_).
          1. Perform MakeMethod(_initializer_, _homeObject_).
          1. Set _initializer_.[[ClassFieldInitializerName]] to _name_.
        1. Else,
          1. Let _initializer_ be ~empty~.
        1. Return the ClassFieldDefinition Record { [[Name]]: _name_, [[Initializer]]: _initializer_ }.
      </emu-alg>
      <emu-note>
        The function created for _initializer_ is never directly accessible to ECMAScript code.
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-classstaticblockdefinitionevaluation" type="sdo">
      <h1>
        Runtime Semantics: ClassStaticBlockDefinitionEvaluation (
          _homeObject_: an Object,
        ): a ClassStaticBlockDefinition Record
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassStaticBlock : `static` `{` ClassStaticBlockBody `}`</emu-grammar>
      <emu-alg>
        1. Let _lex_ be the running execution context's LexicalEnvironment.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the empty sequence of Unicode code points.
        1. Let _formalParameters_ be an instance of the production <emu-grammar>FormalParameters : [empty]</emu-grammar>.
        1. [id="step-synthetic-class-static-block-fn"] Let _bodyFunction_ be OrdinaryFunctionCreate(%Function.prototype%, _sourceText_, _formalParameters_, |ClassStaticBlockBody|, ~non-lexical-this~, _lex_, _privateEnv_).
        1. Perform MakeMethod(_bodyFunction_, _homeObject_).
        1. Return the ClassStaticBlockDefinition Record { [[BodyFunction]]: _bodyFunction_ }.
      </emu-alg>
      <emu-note>The function _bodyFunction_ is never directly accessible to ECMAScript code.</emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluateclassstaticblockbody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateClassStaticBlockBody (
          _functionObject_: an ECMAScript function object,
        ): a return completion or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassStaticBlockBody : ClassStaticBlockStatementList</emu-grammar>
      <emu-alg>
        1. Assert: _functionObject_ is a synthetic function created by ClassStaticBlockDefinitionEvaluation step <emu-xref href="#step-synthetic-class-static-block-fn"></emu-xref>.
        1. Perform ! FunctionDeclarationInstantiation(_functionObject_, « »).
        1. Perform ? Evaluation of |ClassStaticBlockStatementList|.
        1. Return ReturnCompletion(*undefined*).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-classelementevaluation" type="sdo">
      <h1>
        Runtime Semantics: ClassElementEvaluation (
          _object_: an Object,
        ): either a normal completion containing either a ClassFieldDefinition Record, a ClassStaticBlockDefinition Record, a PrivateElement, or ~unused~, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>

      <emu-grammar>
        ClassElement :
          FieldDefinition `;`
          `static` FieldDefinition `;`
      </emu-grammar>
      <emu-alg>
        1. Return ? ClassFieldDefinitionEvaluation of |FieldDefinition| with argument _object_.
      </emu-alg>

      <emu-grammar>
        ClassElement :
          MethodDefinition
          `static` MethodDefinition
      </emu-grammar>
      <emu-alg>
        1. Return ? MethodDefinitionEvaluation of |MethodDefinition| with arguments _object_ and *false*.
      </emu-alg>

      <emu-grammar>ClassElement : ClassStaticBlock</emu-grammar>
      <emu-alg>
        1. Return the ClassStaticBlockDefinitionEvaluation of |ClassStaticBlock| with argument _object_.
      </emu-alg>

      <emu-grammar>
        ClassElement : `;`
      </emu-grammar>
      <emu-alg>
        1. Return ~unused~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-classdefinitionevaluation" oldids="sec-default-constructor-functions" type="sdo">
      <h1>
        Runtime Semantics: ClassDefinitionEvaluation (
          _classBinding_: a String or *undefined*,
          _className_: a property key or a Private Name,
        ): either a normal completion containing a function object or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-note>
        <p>For ease of specification, private methods and accessors are included alongside private fields in the [[PrivateElements]] slot of class instances. However, any given object has either all or none of the private methods and accessors defined by a given class. This feature has been designed so that implementations may choose to implement private methods and accessors using a strategy which does not require tracking each method or accessor individually.</p>
        <p>For example, an implementation could directly associate instance private methods with their corresponding Private Name and track, for each object, which class constructors have run with that object as their `this` value. Looking up an instance private method on an object then consists of checking that the class constructor which defines the method has been used to initialize the object, then returning the method associated with the Private Name.</p>
        <p>This differs from private fields: because field initializers can throw during class instantiation, an individual object may have some proper subset of the private fields of a given class, and so private fields must in general be tracked individually.</p>
      </emu-note>
      <emu-grammar>ClassTail : ClassHeritage? `{` ClassBody? `}`</emu-grammar>
      <emu-alg>
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _classEnv_ be NewDeclarativeEnvironment(_env_).
        1. If _classBinding_ is not *undefined*, then
          1. Perform ! _classEnv_.CreateImmutableBinding(_classBinding_, *true*).
        1. Let _outerPrivateEnvironment_ be the running execution context's PrivateEnvironment.
        1. Let _classPrivateEnvironment_ be NewPrivateEnvironment(_outerPrivateEnvironment_).
        1. If |ClassBody| is present, then
          1. For each String _dn_ of the PrivateBoundIdentifiers of |ClassBody|, do
            1. If _classPrivateEnvironment_.[[Names]] contains a Private Name _pn_ such that _pn_.[[Description]] is _dn_, then
              1. Assert: This is only possible for getter/setter pairs.
            1. Else,
              1. Let _name_ be a new Private Name whose [[Description]] is _dn_.
              1. Append _name_ to _classPrivateEnvironment_.[[Names]].
        1. If |ClassHeritage| is not present, then
          1. Let _protoParent_ be %Object.prototype%.
          1. Let _constructorParent_ be %Function.prototype%.
        1. Else,
          1. Set the running execution context's LexicalEnvironment to _classEnv_.
          1. NOTE: The running execution context's PrivateEnvironment is _outerPrivateEnvironment_ when evaluating |ClassHeritage|.
          1. Let _superclassRef_ be Completion(Evaluation of |ClassHeritage|).
          1. Set the running execution context's LexicalEnvironment to _env_.
          1. Let _superclass_ be ? GetValue(? _superclassRef_).
          1. If _superclass_ is *null*, then
            1. Let _protoParent_ be *null*.
            1. Let _constructorParent_ be %Function.prototype%.
          1. Else if IsConstructor(_superclass_) is *false*, then
            1. Throw a *TypeError* exception.
          1. Else,
            1. Let _protoParent_ be ? Get(_superclass_, *"prototype"*).
            1. If _protoParent_ is not an Object and _protoParent_ is not *null*, throw a *TypeError* exception.
            1. Let _constructorParent_ be _superclass_.
        1. Let _proto_ be OrdinaryObjectCreate(_protoParent_).
        1. If |ClassBody| is not present, let _constructor_ be ~empty~.
        1. Else, let _constructor_ be the ConstructorMethod of |ClassBody|.
        1. Set the running execution context's LexicalEnvironment to _classEnv_.
        1. Set the running execution context's PrivateEnvironment to _classPrivateEnvironment_.
        1. If _constructor_ is ~empty~, then
          1. Let _defaultConstructor_ be a new Abstract Closure with no parameters that captures nothing and performs the following steps when called:
            1. Let _args_ be the List of arguments that was passed to this function by [[Call]] or [[Construct]].
            1. If NewTarget is *undefined*, throw a *TypeError* exception.
            1. Let _F_ be the active function object.
            1. If _F_.[[ConstructorKind]] is ~derived~, then
              1. NOTE: This branch behaves similarly to `constructor(...args) { super(...args); }`. The most notable distinction is that while the aforementioned ECMAScript source text observably calls the %Symbol.iterator% method on `%Array.prototype%`, this function does not.
              1. Let _func_ be ! _F_.[[GetPrototypeOf]]().
              1. If IsConstructor(_func_) is *false*, throw a *TypeError* exception.
              1. Let _result_ be ? Construct(_func_, _args_, NewTarget).
            1. Else,
              1. NOTE: This branch behaves similarly to `constructor() {}`.
              1. Let _result_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%Object.prototype%"*).
            1. Perform ? InitializeInstanceElements(_result_, _F_).
            1. Return _result_.
          1. Let _F_ be CreateBuiltinFunction(_defaultConstructor_, 0, _className_, « [[ConstructorKind]], [[SourceText]] », the current Realm Record, _constructorParent_).
        1. Else,
          1. Let _constructorInfo_ be ! DefineMethod of _constructor_ with arguments _proto_ and _constructorParent_.
          1. Let _F_ be _constructorInfo_.[[Closure]].
          1. Perform MakeClassConstructor(_F_).
          1. Perform SetFunctionName(_F_, _className_).
        1. Perform MakeConstructor(_F_, *false*, _proto_).
        1. If |ClassHeritage| is present, set _F_.[[ConstructorKind]] to ~derived~.
        1. Perform ! DefineMethodProperty(_proto_, *"constructor"*, _F_, *false*).
        1. If |ClassBody| is not present, let _elements_ be a new empty List.
        1. Else, let _elements_ be the NonConstructorElements of |ClassBody|.
        1. Let _instancePrivateMethods_ be a new empty List.
        1. Let _staticPrivateMethods_ be a new empty List.
        1. Let _instanceFields_ be a new empty List.
        1. Let _staticElements_ be a new empty List.
        1. For each |ClassElement| _e_ of _elements_, do
          1. If IsStatic of _e_ is *false*, then
            1. Let _element_ be Completion(ClassElementEvaluation of _e_ with argument _proto_).
          1. Else,
            1. Let _element_ be Completion(ClassElementEvaluation of _e_ with argument _F_).
          1. If _element_ is an abrupt completion, then
            1. Set the running execution context's LexicalEnvironment to _env_.
            1. Set the running execution context's PrivateEnvironment to _outerPrivateEnvironment_.
            1. Return ? _element_.
          1. Set _element_ to ! _element_.
          1. If _element_ is a PrivateElement, then
            1. Assert: _element_.[[Kind]] is either ~method~ or ~accessor~.
            1. If IsStatic of _e_ is *false*, let _container_ be _instancePrivateMethods_.
            1. Else, let _container_ be _staticPrivateMethods_.
            1. If _container_ contains a PrivateElement _pe_ such that _pe_.[[Key]] is _element_.[[Key]], then
              1. Assert: _element_.[[Kind]] and _pe_.[[Kind]] are both ~accessor~.
              1. If _element_.[[Get]] is *undefined*, then
                1. Let _combined_ be PrivateElement { [[Key]]: _element_.[[Key]], [[Kind]]: ~accessor~, [[Get]]: _pe_.[[Get]], [[Set]]: _element_.[[Set]] }.
              1. Else,
                1. Let _combined_ be PrivateElement { [[Key]]: _element_.[[Key]], [[Kind]]: ~accessor~, [[Get]]: _element_.[[Get]], [[Set]]: _pe_.[[Set]] }.
              1. Replace _pe_ in _container_ with _combined_.
            1. Else,
              1. Append _element_ to _container_.
          1. Else if _element_ is a ClassFieldDefinition Record, then
            1. If IsStatic of _e_ is *false*, append _element_ to _instanceFields_.
            1. Else, append _element_ to _staticElements_.
          1. Else if _element_ is a ClassStaticBlockDefinition Record, then
            1. Append _element_ to _staticElements_.
        1. Set the running execution context's LexicalEnvironment to _env_.
        1. If _classBinding_ is not *undefined*, then
          1. Perform ! _classEnv_.InitializeBinding(_classBinding_, _F_).
        1. Set _F_.[[PrivateMethods]] to _instancePrivateMethods_.
        1. Set _F_.[[Fields]] to _instanceFields_.
        1. For each PrivateElement _method_ of _staticPrivateMethods_, do
          1. Perform ! PrivateMethodOrAccessorAdd(_F_, _method_).
        1. For each element _elementRecord_ of _staticElements_, do
          1. If _elementRecord_ is a ClassFieldDefinition Record, then
            1. Let _result_ be Completion(DefineField(_F_, _elementRecord_)).
          1. Else,
            1. Assert: _elementRecord_ is a ClassStaticBlockDefinition Record.
            1. Let _result_ be Completion(Call(_elementRecord_.[[BodyFunction]], _F_)).
          1. If _result_ is an abrupt completion, then
            1. Set the running execution context's PrivateEnvironment to _outerPrivateEnvironment_.
            1. Return ? _result_.
        1. Set the running execution context's PrivateEnvironment to _outerPrivateEnvironment_.
        1. Return _F_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-bindingclassdeclarationevaluation" type="sdo">
      <h1>Runtime Semantics: BindingClassDeclarationEvaluation ( ): either a normal completion containing a function object or an abrupt completion</h1>
      <dl class="header">
      </dl>
      <emu-grammar>ClassDeclaration : `class` BindingIdentifier ClassTail</emu-grammar>
      <emu-alg>
        1. Let _className_ be the StringValue of |BindingIdentifier|.
        1. Let _value_ be ? ClassDefinitionEvaluation of |ClassTail| with arguments _className_ and _className_.
        1. Set _value_.[[SourceText]] to the source text matched by |ClassDeclaration|.
        1. Let _env_ be the running execution context's LexicalEnvironment.
        1. Perform ? InitializeBoundName(_className_, _value_, _env_).
        1. Return _value_.
      </emu-alg>
      <emu-grammar>ClassDeclaration : `class` ClassTail</emu-grammar>
      <emu-alg>
        1. Let _value_ be ? ClassDefinitionEvaluation of |ClassTail| with arguments *undefined* and *"default"*.
        1. Set _value_.[[SourceText]] to the source text matched by |ClassDeclaration|.
        1. Return _value_.
      </emu-alg>
      <emu-note>
        <p><emu-grammar>ClassDeclaration : `class` ClassTail</emu-grammar> only occurs as part of an |ExportDeclaration| and establishing its binding is handled as part of the evaluation action for that production. See <emu-xref href="#sec-exports-runtime-semantics-evaluation"></emu-xref>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-class-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ClassDeclaration : `class` BindingIdentifier ClassTail</emu-grammar>
      <emu-alg>
        1. Perform ? BindingClassDeclarationEvaluation of this |ClassDeclaration|.
        1. Return ~empty~.
      </emu-alg>
      <emu-note>
        <p><emu-grammar>ClassDeclaration : `class` ClassTail</emu-grammar> only occurs as part of an |ExportDeclaration| and is never directly evaluated.</p>
      </emu-note>
      <emu-grammar>ClassExpression : `class` ClassTail</emu-grammar>
      <emu-alg>
        1. Let _value_ be ? ClassDefinitionEvaluation of |ClassTail| with arguments *undefined* and *""*.
        1. Set _value_.[[SourceText]] to the source text matched by |ClassExpression|.
        1. Return _value_.
      </emu-alg>
      <emu-grammar>ClassExpression : `class` BindingIdentifier ClassTail</emu-grammar>
      <emu-alg>
        1. Let _className_ be the StringValue of |BindingIdentifier|.
        1. Let _value_ be ? ClassDefinitionEvaluation of |ClassTail| with arguments _className_ and _className_.
        1. Set _value_.[[SourceText]] to the source text matched by |ClassExpression|.
        1. Return _value_.
      </emu-alg>
      <emu-grammar>ClassElementName : PrivateIdentifier</emu-grammar>
      <emu-alg>
        1. Let _privateIdentifier_ be the StringValue of |PrivateIdentifier|.
        1. Let _privateEnvRec_ be the running execution context's PrivateEnvironment.
        1. Let _names_ be _privateEnvRec_.[[Names]].
        1. Assert: Exactly one element of _names_ is a Private Name whose [[Description]] is _privateIdentifier_.
        1. Let _privateName_ be the Private Name in _names_ whose [[Description]] is _privateIdentifier_.
        1. Return _privateName_.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *undefined*.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-async-function-definitions">
    <h1>Async Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      AsyncFunctionDeclaration[Yield, Await, Default] :
        `async` [no LineTerminator here] `function` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`
        [+Default] `async` [no LineTerminator here] `function` `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

      AsyncFunctionExpression :
        `async` [no LineTerminator here] `function` BindingIdentifier[~Yield, +Await]? `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

      AsyncMethod[Yield, Await] :
        `async` [no LineTerminator here] ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

      AsyncFunctionBody :
        FunctionBody[~Yield, +Await]

      AwaitExpression[Yield] :
        `await` UnaryExpression[?Yield, +Await]
    </emu-grammar>

    <emu-note>
      <p>`await` is parsed as a keyword of an |AwaitExpression| when the <sub>[Await]</sub> parameter is present. The <sub>[Await]</sub> parameter is present in the top level of the following contexts, although the parameter may be absent in some contexts depending on the nonterminals, such as |FunctionBody|:</p>
      <ul>
        <li>In an |AsyncFunctionBody|.</li>
        <li>In the |FormalParameters| of an |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, or |AsyncGeneratorExpression|. |AwaitExpression| in this position is a Syntax error via static semantics.</li>
        <li>In a |Module|.</li>
      </ul>
      <p>When |Script| is the syntactic goal symbol, `await` may be parsed as an identifier when the <sub>[Await]</sub> parameter is absent. This includes the following contexts:</p>
      <ul>
        <li>Anywhere outside of an |AsyncFunctionBody| or |FormalParameters| of an |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, or |AsyncGeneratorExpression|.</li>
        <li>In the |BindingIdentifier| of a |FunctionExpression|, |GeneratorExpression|, or |AsyncGeneratorExpression|.</li>
      </ul>
    </emu-note>

    <emu-note>
      <p>Unlike |YieldExpression|, it is a Syntax Error to omit the operand of an |AwaitExpression|. You must await something.</p>
    </emu-note>

    <emu-clause id="sec-async-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>
        AsyncMethod : `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <ul>
        <li>It is a Syntax Error if FunctionBodyContainsUseStrict of |AsyncFunctionBody| is *true* and IsSimpleParameterList of |UniqueFormalParameters| is *false*.</li>
        <li>It is a Syntax Error if HasDirectSuper of |AsyncMethod| is *true*.</li>
        <li>It is a Syntax Error if |UniqueFormalParameters| Contains |AwaitExpression| is *true*.</li>
        <li>It is a Syntax Error if any element of the BoundNames of |UniqueFormalParameters| also occurs in the LexicallyDeclaredNames of |AsyncFunctionBody|.</li>
      </ul>
      <emu-grammar>
        AsyncFunctionDeclaration :
          `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
          `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`

        AsyncFunctionExpression :
          `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <ul>
        <li>It is a Syntax Error if FunctionBodyContainsUseStrict of |AsyncFunctionBody| is *true* and IsSimpleParameterList of |FormalParameters| is *false*.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |AwaitExpression| is *true*.</li>
        <li>If IsStrict(|FormalParameters|) is *true*, the Early Error rules for <emu-grammar>UniqueFormalParameters : FormalParameters</emu-grammar> are applied.</li>
        <li>If |BindingIdentifier| is present and IsStrict(|BindingIdentifier|) is *true*, it is a Syntax Error if the StringValue of |BindingIdentifier| is either *"eval"* or *"arguments"*.</li>
        <li>It is a Syntax Error if any element of the BoundNames of |FormalParameters| also occurs in the LexicallyDeclaredNames of |AsyncFunctionBody|.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |SuperProperty| is *true*.</li>
        <li>It is a Syntax Error if |AsyncFunctionBody| Contains |SuperProperty| is *true*.</li>
        <li>It is a Syntax Error if |FormalParameters| Contains |SuperCall| is *true*.</li>
        <li>It is a Syntax Error if |AsyncFunctionBody| Contains |SuperCall| is *true*.</li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateasyncfunctionobject" oldids="sec-async-function-definitions-InstantiateFunctionObject" type="sdo">
      <h1>
        Runtime Semantics: InstantiateAsyncFunctionObject (
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncFunctionDeclaration : `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _name_ be the StringValue of |BindingIdentifier|.
        1. Let _sourceText_ be the source text matched by |AsyncFunctionDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncFunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, _name_).
        1. Return _F_.
      </emu-alg>
      <emu-grammar>
        AsyncFunctionDeclaration : `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Let _sourceText_ be the source text matched by |AsyncFunctionDeclaration|.
        1. Let _F_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncFunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_F_, *"default"*).
        1. Return _F_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateasyncfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateAsyncFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncFunctionExpression : `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncFunctionExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncFunctionBody|, ~non-lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Return _closure_.
      </emu-alg>
      <emu-grammar>
        AsyncFunctionExpression : `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Assert: _name_ is not present.
        1. Set _name_ to the StringValue of |BindingIdentifier|.
        1. Let _outerEnv_ be the LexicalEnvironment of the running execution context.
        1. Let _funcEnv_ be NewDeclarativeEnvironment(_outerEnv_).
        1. Perform ! _funcEnv_.CreateImmutableBinding(_name_, *false*).
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncFunctionExpression|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, |FormalParameters|, |AsyncFunctionBody|, ~non-lexical-this~, _funcEnv_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Perform ! _funcEnv_.InitializeBinding(_name_, _closure_).
        1. Return _closure_.
      </emu-alg>
      <emu-note>
        <p>The |BindingIdentifier| in an |AsyncFunctionExpression| can be referenced from inside the |AsyncFunctionExpression|'s |AsyncFunctionBody| to allow the function to call itself recursively. However, unlike in a |FunctionDeclaration|, the |BindingIdentifier| in a |AsyncFunctionExpression| cannot be referenced from and does not affect the scope enclosing the |AsyncFunctionExpression|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluateasyncfunctionbody" oldids="sec-async-function-definitions-EvaluateBody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateAsyncFunctionBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a return completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncFunctionBody : FunctionBody
      </emu-grammar>
      <emu-alg>
        1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
        1. Let _completion_ be Completion(FunctionDeclarationInstantiation(_functionObject_, _argumentsList_)).
        1. If _completion_ is an abrupt completion, then
          1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _completion_.[[Value]] »).
        1. Else,
          1. Perform AsyncFunctionStart(_promiseCapability_, |FunctionBody|).
        1. Return ReturnCompletion(_promiseCapability_.[[Promise]]).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-async-function-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        AsyncFunctionExpression :
          `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncFunctionExpression of |AsyncFunctionExpression|.
      </emu-alg>
      <emu-grammar>
        AwaitExpression : `await` UnaryExpression
      </emu-grammar>
      <emu-alg>
        1. Let _exprRef_ be ? Evaluation of |UnaryExpression|.
        1. Let _value_ be ? GetValue(_exprRef_).
        1. Return ? Await(_value_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-async-arrow-function-definitions">
    <h1>Async Arrow Function Definitions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      AsyncArrowFunction[In, Yield, Await] :
        `async` [no LineTerminator here] AsyncArrowBindingIdentifier[?Yield] [no LineTerminator here] `=>` AsyncConciseBody[?In]
        CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] [no LineTerminator here] `=>` AsyncConciseBody[?In] #callcover

      AsyncConciseBody[In] :
        [lookahead != `{`] ExpressionBody[?In, +Await]
        `{` AsyncFunctionBody `}`

      AsyncArrowBindingIdentifier[Yield] :
        BindingIdentifier[?Yield, +Await]

      CoverCallExpressionAndAsyncArrowHead[Yield, Await] :
        MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
    </emu-grammar>
    <h2>Supplemental Syntax</h2>
    <p>
      When processing an instance of the production<br>
      <emu-grammar>AsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody</emu-grammar><br>
      the interpretation of |CoverCallExpressionAndAsyncArrowHead| is refined using the following grammar:
    </p>

    <emu-grammar type="definition">
      AsyncArrowHead :
        `async` [no LineTerminator here] ArrowFormalParameters[~Yield, +Await]
    </emu-grammar>

    <emu-clause id="sec-async-arrow-function-definitions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>
        AsyncArrowFunction : `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
      </emu-grammar>
      <ul>
        <li>It is a Syntax Error if any element of the BoundNames of |AsyncArrowBindingIdentifier| also occurs in the LexicallyDeclaredNames of |AsyncConciseBody|.</li>
      </ul>
      <emu-grammar>
        AsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody
      </emu-grammar>
      <ul>
        <li>|CoverCallExpressionAndAsyncArrowHead| must cover an |AsyncArrowHead|.</li>
        <li>It is a Syntax Error if |CoverCallExpressionAndAsyncArrowHead| Contains |YieldExpression| is *true*.</li>
        <li>It is a Syntax Error if |CoverCallExpressionAndAsyncArrowHead| Contains |AwaitExpression| is *true*.</li>
        <li>It is a Syntax Error if any element of the BoundNames of |CoverCallExpressionAndAsyncArrowHead| also occurs in the LexicallyDeclaredNames of |AsyncConciseBody|.</li>
        <li>It is a Syntax Error if AsyncConciseBodyContainsUseStrict of |AsyncConciseBody| is *true* and IsSimpleParameterList of |CoverCallExpressionAndAsyncArrowHead| is *false*.</li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-static-semantics-asyncconcisebodycontainsusestrict" oldids="sec-async-arrow-function-definitions-static-semantics-containsusestrict" type="sdo">
      <h1>Static Semantics: AsyncConciseBodyContainsUseStrict ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>AsyncConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>AsyncConciseBody : `{` AsyncFunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return FunctionBodyContainsUseStrict of |AsyncFunctionBody|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-evaluateasyncconcisebody" oldids="sec-async-arrow-function-definitions-EvaluateBody" type="sdo">
      <h1>
        Runtime Semantics: EvaluateAsyncConciseBody (
          _functionObject_: an ECMAScript function object,
          _argumentsList_: a List of ECMAScript language values,
        ): a return completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncConciseBody : ExpressionBody
      </emu-grammar>
      <emu-alg>
        1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
        1. Let _completion_ be Completion(FunctionDeclarationInstantiation(_functionObject_, _argumentsList_)).
        1. If _completion_ is an abrupt completion, then
          1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _completion_.[[Value]] »).
        1. Else,
          1. Perform AsyncFunctionStart(_promiseCapability_, |ExpressionBody|).
        1. Return ReturnCompletion(_promiseCapability_.[[Promise]]).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-instantiateasyncarrowfunctionexpression" type="sdo">
      <h1>
        Runtime Semantics: InstantiateAsyncArrowFunctionExpression (
          optional _name_: a property key or a Private Name,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        AsyncArrowFunction : `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncArrowFunction|.
        1. Let _parameters_ be |AsyncArrowBindingIdentifier|.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, _parameters_, |AsyncConciseBody|, ~lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Return _closure_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. If _name_ is not present, set _name_ to *""*.
        1. Let _env_ be the LexicalEnvironment of the running execution context.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Let _sourceText_ be the source text matched by |AsyncArrowFunction|.
        1. Let _head_ be the |AsyncArrowHead| that is covered by |CoverCallExpressionAndAsyncArrowHead|.
        1. Let _parameters_ be the |ArrowFormalParameters| of _head_.
        1. Let _closure_ be OrdinaryFunctionCreate(%AsyncFunction.prototype%, _sourceText_, _parameters_, |AsyncConciseBody|, ~lexical-this~, _env_, _privateEnv_).
        1. Perform SetFunctionName(_closure_, _name_).
        1. Return _closure_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-async-arrow-function-definitions-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        AsyncArrowFunction :
          `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
          CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncArrowFunctionExpression of |AsyncArrowFunction|.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-tail-position-calls">
    <h1>Tail Position Calls</h1>

    <emu-clause id="sec-isintailposition" type="abstract operation">
      <h1>
        Static Semantics: IsInTailPosition (
          _call_: a |CallExpression| Parse Node, a |MemberExpression| Parse Node, or an |OptionalChain| Parse Node,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If IsStrict(_call_) is *false*, return *false*.
        1. If _call_ is not contained within a |FunctionBody|, a |ConciseBody|, or an |AsyncConciseBody|, return *false*.
        1. Let _body_ be the |FunctionBody|, |ConciseBody|, or |AsyncConciseBody| that most closely contains _call_.
        1. If _body_ is the |FunctionBody| of a |GeneratorBody|, return *false*.
        1. If _body_ is the |FunctionBody| of an |AsyncFunctionBody|, return *false*.
        1. If _body_ is the |FunctionBody| of an |AsyncGeneratorBody|, return *false*.
        1. If _body_ is an |AsyncConciseBody|, return *false*.
        1. Return the result of HasCallInTailPosition of _body_ with argument _call_.
      </emu-alg>
      <emu-note>
        <p>Tail Position calls are only defined in strict mode code because of a common non-standard language extension (see <emu-xref href="#sec-addrestrictedfunctionproperties"></emu-xref>) that enables observation of the chain of caller contexts.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-hascallintailposition" type="sdo" oldids="sec-statement-rules,sec-expression-rules">
      <h1>
        Static Semantics: HasCallInTailPosition (
          _call_: a |CallExpression| Parse Node, a |MemberExpression| Parse Node, or an |OptionalChain| Parse Node,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-note>
        <p>_call_ is a Parse Node that represents a specific range of source text. When the following algorithms compare _call_ to another Parse Node, it is a test of whether they represent the same source text.</p>
      </emu-note>
      <emu-note>
        <p>A potential tail position call that is immediately followed by return GetValue of the call result is also a possible tail position call. A function call cannot return a Reference Record, so such a GetValue operation will always return the same value as the actual function call result.</p>
      </emu-note>

      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _has_ be HasCallInTailPosition of |StatementList| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. Return HasCallInTailPosition of |StatementListItem| with argument _call_.
      </emu-alg>
      <emu-grammar>
        FunctionStatementList :
          [empty]

        StatementListItem :
          Declaration

        Statement :
          VariableStatement
          EmptyStatement
          ExpressionStatement
          ContinueStatement
          BreakStatement
          ThrowStatement
          DebuggerStatement

        Block :
          `{` `}`

        ReturnStatement :
          `return` `;`

        LabelledItem :
          FunctionDeclaration

        ForInOfStatement :
          `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
          `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
          `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement

        CaseBlock :
          `{` `}`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _has_ be HasCallInTailPosition of the first |Statement| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. Return HasCallInTailPosition of the second |Statement| with argument _call_.
      </emu-alg>
      <emu-grammar>
        IfStatement :
          `if` `(` Expression `)` Statement

        DoWhileStatement :
          `do` Statement `while` `(` Expression `)` `;`

        WhileStatement :
          `while` `(` Expression `)` Statement

        ForStatement :
          `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement
          `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
          `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement

        ForInOfStatement :
          `for` `(` LeftHandSideExpression `in` Expression `)` Statement
          `for` `(` `var` ForBinding `in` Expression `)` Statement
          `for` `(` ForDeclaration `in` Expression `)` Statement

        WithStatement :
          `with` `(` Expression `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Statement| with argument _call_.
      </emu-alg>
      <emu-grammar>
        LabelledStatement :
          LabelIdentifier `:` LabelledItem
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |LabelledItem| with argument _call_.
      </emu-alg>
      <emu-grammar>ReturnStatement : `return` Expression `;`</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Expression| with argument _call_.
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |CaseBlock| with argument _call_.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. Let _has_ be *false*.
        1. If the first |CaseClauses| is present, set _has_ to HasCallInTailPosition of the first |CaseClauses| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. Set _has_ to HasCallInTailPosition of |DefaultClause| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. If the second |CaseClauses| is present, set _has_ to HasCallInTailPosition of the second |CaseClauses| with argument _call_.
        1. Return _has_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _has_ be HasCallInTailPosition of |CaseClauses| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. Return HasCallInTailPosition of |CaseClause| with argument _call_.
      </emu-alg>
      <emu-grammar>
        CaseClause : `case` Expression `:` StatementList?

        DefaultClause : `default` `:` StatementList?
      </emu-grammar>
      <emu-alg>
        1. If |StatementList| is present, return HasCallInTailPosition of |StatementList| with argument _call_.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Catch| with argument _call_.
      </emu-alg>
      <emu-grammar>
        TryStatement :
          `try` Block Finally
          `try` Block Catch Finally
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Finally| with argument _call_.
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Block| with argument _call_.
      </emu-alg>

      <emu-grammar>
        AssignmentExpression :
          YieldExpression
          ArrowFunction
          AsyncArrowFunction
          LeftHandSideExpression `=` AssignmentExpression
          LeftHandSideExpression AssignmentOperator AssignmentExpression
          LeftHandSideExpression `&amp;&amp;=` AssignmentExpression
          LeftHandSideExpression `||=` AssignmentExpression
          LeftHandSideExpression `??=` AssignmentExpression

        BitwiseANDExpression :
          BitwiseANDExpression `&amp;` EqualityExpression

        BitwiseXORExpression :
          BitwiseXORExpression `^` BitwiseANDExpression

        BitwiseORExpression :
          BitwiseORExpression `|` BitwiseXORExpression

        EqualityExpression :
          EqualityExpression `==` RelationalExpression
          EqualityExpression `!=` RelationalExpression
          EqualityExpression `===` RelationalExpression
          EqualityExpression `!==` RelationalExpression

        RelationalExpression :
          RelationalExpression `&lt;` ShiftExpression
          RelationalExpression `&gt;` ShiftExpression
          RelationalExpression `&lt;=` ShiftExpression
          RelationalExpression `&gt;=` ShiftExpression
          RelationalExpression `instanceof` ShiftExpression
          RelationalExpression `in` ShiftExpression
          PrivateIdentifier `in` ShiftExpression

        ShiftExpression :
          ShiftExpression `&lt;&lt;` AdditiveExpression
          ShiftExpression `&gt;&gt;` AdditiveExpression
          ShiftExpression `&gt;&gt;&gt;` AdditiveExpression

        AdditiveExpression :
          AdditiveExpression `+` MultiplicativeExpression
          AdditiveExpression `-` MultiplicativeExpression

        MultiplicativeExpression :
          MultiplicativeExpression MultiplicativeOperator ExponentiationExpression

        ExponentiationExpression :
          UpdateExpression `**` ExponentiationExpression

        UpdateExpression :
          LeftHandSideExpression `++`
          LeftHandSideExpression `--`
          `++` UnaryExpression
          `--` UnaryExpression

        UnaryExpression :
          `delete` UnaryExpression
          `void` UnaryExpression
          `typeof` UnaryExpression
          `+` UnaryExpression
          `-` UnaryExpression
          `~` UnaryExpression
          `!` UnaryExpression
          AwaitExpression

        CallExpression :
          SuperCall
          ImportCall
          CallExpression `[` Expression `]`
          CallExpression `.` IdentifierName
          CallExpression `.` PrivateIdentifier

        NewExpression :
          `new` NewExpression

        MemberExpression :
          MemberExpression `[` Expression `]`
          MemberExpression `.` IdentifierName
          SuperProperty
          MetaProperty
          `new` MemberExpression Arguments
          MemberExpression `.` PrivateIdentifier

        PrimaryExpression :
          `this`
          IdentifierReference
          Literal
          ArrayLiteral
          ObjectLiteral
          FunctionExpression
          ClassExpression
          GeneratorExpression
          AsyncFunctionExpression
          AsyncGeneratorExpression
          RegularExpressionLiteral
          TemplateLiteral
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        Expression :
          AssignmentExpression
          Expression `,` AssignmentExpression
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |AssignmentExpression| with argument _call_.
      </emu-alg>
      <emu-grammar>ConditionalExpression : ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _has_ be HasCallInTailPosition of the first |AssignmentExpression| with argument _call_.
        1. If _has_ is *true*, return *true*.
        1. Return HasCallInTailPosition of the second |AssignmentExpression| with argument _call_.
      </emu-alg>
      <emu-grammar>LogicalANDExpression : LogicalANDExpression `&amp;&amp;` BitwiseORExpression</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |BitwiseORExpression| with argument _call_.
      </emu-alg>
      <emu-grammar>LogicalORExpression : LogicalORExpression `||` LogicalANDExpression</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |LogicalANDExpression| with argument _call_.
      </emu-alg>
      <emu-grammar>CoalesceExpression : CoalesceExpressionHead `??` BitwiseORExpression</emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |BitwiseORExpression| with argument _call_.
      </emu-alg>
      <emu-grammar>
        CallExpression :
          CoverCallExpressionAndAsyncArrowHead
          CallExpression Arguments
          CallExpression TemplateLiteral
      </emu-grammar>
      <emu-alg>
        1. If this |CallExpression| is _call_, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        OptionalExpression :
          MemberExpression OptionalChain
          CallExpression OptionalChain
          OptionalExpression OptionalChain
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |OptionalChain| with argument _call_.
      </emu-alg>
      <emu-grammar>
        OptionalChain :
          `?.` `[` Expression `]`
          `?.` IdentifierName
          `?.` PrivateIdentifier
          OptionalChain `[` Expression `]`
          OptionalChain `.` IdentifierName
          OptionalChain `.` PrivateIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        OptionalChain :
          `?.` Arguments
          OptionalChain Arguments
      </emu-grammar>
      <emu-alg>
        1. If this |OptionalChain| is _call_, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        MemberExpression :
          MemberExpression TemplateLiteral
      </emu-grammar>
      <emu-alg>
        1. If this |MemberExpression| is _call_, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return HasCallInTailPosition of _expr_ with argument _call_.
      </emu-alg>
      <emu-grammar>
        ParenthesizedExpression :
          `(` Expression `)`
      </emu-grammar>
      <emu-alg>
        1. Return HasCallInTailPosition of |Expression| with argument _call_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-preparefortailcall" type="abstract operation">
      <h1>PrepareForTailCall ( ): ~unused~</h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: The current execution context will not subsequently be used for the evaluation of any ECMAScript code or built-in functions. The invocation of Call subsequent to the invocation of this abstract operation will create and push a new execution context before performing any such evaluation.
        1. Discard all resources associated with the current execution context.
        1. Return ~unused~.
      </emu-alg>
      <p>A tail position call must either release any transient internal resources associated with the currently executing function execution context before invoking the target function or reuse those resources in support of the target function.</p>
      <emu-note>
        <p>For example, a tail position call should only grow an implementation's activation record stack by the amount that the size of the target function's activation record exceeds the size of the calling function's activation record. If the target function's activation record is smaller, then the total size of the stack should decrease.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

<h1 id="sec-ecmascript-language-scripts-and-modules"></h1>
