# ECMAScript Language: Expressions

  <emu-clause id="sec-identifiers">
    <h1>Identifiers</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      IdentifierReference[Yield, Await] :
        Identifier
        [~Yield] `yield`
        [~Await] `await`

      BindingIdentifier[Yield, Await] :
        Identifier
        `yield`
        `await`

      LabelIdentifier[Yield, Await] :
        Identifier
        [~Yield] `yield`
        [~Await] `await`

      Identifier :
        IdentifierName but not ReservedWord
    </emu-grammar>

    <emu-note>
      <p>`yield` and `await` are permitted as |BindingIdentifier| in the grammar, and prohibited with static semantics below, to prohibit automatic semicolon insertion in cases such as</p>
      <pre><code class="javascript">
        let
        await 0;
      </code></pre>
    </emu-note>

    <emu-clause id="sec-identifiers-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>BindingIdentifier : Identifier</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsStrict(this production) is *true* and the StringValue of |Identifier| is either *"arguments"* or *"eval"*.
        </li>
      </ul>
      <emu-grammar>
        IdentifierReference : `yield`

        BindingIdentifier : `yield`

        LabelIdentifier : `yield`
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsStrict(this production) is *true*.
        </li>
      </ul>
      <emu-grammar>
        IdentifierReference : `await`

        BindingIdentifier : `await`

        LabelIdentifier : `await`
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the goal symbol of the syntactic grammar is |Module|.
        </li>
      </ul>
      <emu-grammar>
        BindingIdentifier[Yield, Await] : `yield`
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if this production has a <sub>[Yield]</sub> parameter.
        </li>
      </ul>
      <emu-grammar>
        BindingIdentifier[Yield, Await] : `await`
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if this production has an <sub>[Await]</sub> parameter.
        </li>
      </ul>
      <emu-grammar>
        IdentifierReference[Yield, Await] : Identifier

        BindingIdentifier[Yield, Await] : Identifier

        LabelIdentifier[Yield, Await] : Identifier
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if this production has a <sub>[Yield]</sub> parameter and the StringValue of |Identifier| is *"yield"*.
        </li>
        <li>
          It is a Syntax Error if this production has an <sub>[Await]</sub> parameter and the StringValue of |Identifier| is *"await"*.
        </li>
      </ul>
      <emu-grammar>Identifier : IdentifierName but not ReservedWord</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if IsStrict(this phrase) is *true* and the StringValue of |IdentifierName| is one of *"implements"*, *"interface"*, *"let"*, *"package"*, *"private"*, *"protected"*, *"public"*, *"static"*, or *"yield"*.
        </li>
        <li>
          It is a Syntax Error if the goal symbol of the syntactic grammar is |Module| and the StringValue of |IdentifierName| is *"await"*.
        </li>
        <li>
          It is a Syntax Error if the StringValue of |IdentifierName| is the StringValue of any |ReservedWord| except for `yield` or `await`.
        </li>
      </ul>
      <emu-note>
        <p>The StringValue of |IdentifierName| normalizes any Unicode escape sequences in |IdentifierName| hence such escapes cannot be used to write an |Identifier| whose code point sequence is the same as a |ReservedWord|.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-stringvalue" oldids="sec-identifiers-static-semantics-stringvalue,sec-identifier-names-static-semantics-stringvalue" type="sdo">
      <h1>Static Semantics: StringValue ( ): a String</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        IdentifierName ::
          IdentifierStart
          IdentifierName IdentifierPart
      </emu-grammar>
      <emu-alg>
        1. Let _idTextUnescaped_ be the IdentifierCodePoints of |IdentifierName|.
        1. Return CodePointsToString(_idTextUnescaped_).
      </emu-alg>
      <emu-grammar>
        IdentifierReference : `yield`

        BindingIdentifier : `yield`

        LabelIdentifier : `yield`
      </emu-grammar>
      <emu-alg>
        1. Return *"yield"*.
      </emu-alg>
      <emu-grammar>
        IdentifierReference : `await`

        BindingIdentifier : `await`

        LabelIdentifier : `await`
      </emu-grammar>
      <emu-alg>
        1. Return *"await"*.
      </emu-alg>
      <emu-grammar>Identifier : IdentifierName but not ReservedWord</emu-grammar>
      <emu-alg>
        1. Return the StringValue of |IdentifierName|.
      </emu-alg>
      <emu-grammar>
        PrivateIdentifier ::
          `#` IdentifierName
      </emu-grammar>
      <emu-alg>
        1. Return the string-concatenation of 0x0023 (NUMBER SIGN) and the StringValue of |IdentifierName|.
      </emu-alg>
      <emu-grammar>
        ModuleExportName : StringLiteral
      </emu-grammar>
      <emu-alg>
        1. Return the SV of |StringLiteral|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-identifiers-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>IdentifierReference : Identifier</emu-grammar>
      <emu-alg>
        1. Return ? ResolveBinding(StringValue of |Identifier|).
      </emu-alg>
      <emu-grammar>IdentifierReference : `yield`</emu-grammar>
      <emu-alg>
        1. Return ? ResolveBinding(*"yield"*).
      </emu-alg>
      <emu-grammar>IdentifierReference : `await`</emu-grammar>
      <emu-alg>
        1. Return ? ResolveBinding(*"await"*).
      </emu-alg>
      <emu-note>
        <p>The result of evaluating an |IdentifierReference| is always a value of type Reference.</p>
      </emu-note>
      <emu-note>
        <p>In non-strict code, the keyword `yield` may be used as an identifier. Evaluating the |IdentifierReference| resolves the binding of `yield` as if it was an |Identifier|. Early Error restriction ensures that such an evaluation only can occur for non-strict code.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-primary-expression">
    <h1>Primary Expression</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      PrimaryExpression[Yield, Await] :
        `this`
        IdentifierReference[?Yield, ?Await]
        Literal
        ArrayLiteral[?Yield, ?Await]
        ObjectLiteral[?Yield, ?Await]
        FunctionExpression
        ClassExpression[?Yield, ?Await]
        GeneratorExpression
        AsyncFunctionExpression
        AsyncGeneratorExpression
        RegularExpressionLiteral
        TemplateLiteral[?Yield, ?Await, ~Tagged]
        CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await] #parencover

      CoverParenthesizedExpressionAndArrowParameterList[Yield, Await] :
        `(` Expression[+In, ?Yield, ?Await] `)`
        `(` Expression[+In, ?Yield, ?Await] `,` `)`
        `(` `)`
        `(` `...` BindingIdentifier[?Yield, ?Await] `)`
        `(` `...` BindingPattern[?Yield, ?Await] `)`
        `(` Expression[+In, ?Yield, ?Await] `,` `...` BindingIdentifier[?Yield, ?Await] `)`
        `(` Expression[+In, ?Yield, ?Await] `,` `...` BindingPattern[?Yield, ?Await] `)`
    </emu-grammar>
    <h2>Supplemental Syntax</h2>
    <p>
      When processing an instance of the production<br>
      <emu-grammar>PrimaryExpression[Yield, Await] : CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]</emu-grammar><br>
      the interpretation of |CoverParenthesizedExpressionAndArrowParameterList| is refined using the following grammar:
    </p>
    <emu-grammar type="definition">
      ParenthesizedExpression[Yield, Await] :
        `(` Expression[+In, ?Yield, ?Await] `)`
    </emu-grammar>

    <emu-clause id="sec-this-keyword">
      <h1>The `this` Keyword</h1>

      <emu-clause id="sec-this-keyword-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>PrimaryExpression : `this`</emu-grammar>
        <emu-alg>
          1. Return ? ResolveThisBinding().
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-identifier-reference">
      <h1>Identifier Reference</h1>
      <p>See <emu-xref href="#sec-identifiers"></emu-xref> for |IdentifierReference|.</p>
    </emu-clause>

    <emu-clause id="sec-primary-expression-literals">
      <h1>Literals</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        Literal :
          NullLiteral
          BooleanLiteral
          NumericLiteral
          StringLiteral
      </emu-grammar>

      <emu-clause id="sec-literals-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>Literal : NullLiteral</emu-grammar>
        <emu-alg>
          1. Return *null*.
        </emu-alg>
        <emu-grammar>Literal : BooleanLiteral</emu-grammar>
        <emu-alg>
          1. If |BooleanLiteral| is the token `false`, return *false*.
          1. If |BooleanLiteral| is the token `true`, return *true*.
        </emu-alg>
        <emu-grammar>Literal : NumericLiteral</emu-grammar>
        <emu-alg>
          1. Return the NumericValue of |NumericLiteral| as defined in <emu-xref href="#sec-literals-numeric-literals"></emu-xref>.
        </emu-alg>
        <emu-grammar>Literal : StringLiteral</emu-grammar>
        <emu-alg>
          1. Return the SV of |StringLiteral| as defined in <emu-xref href="#sec-static-semantics-sv"></emu-xref>.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-array-initializer">
      <h1>Array Initializer</h1>
      <emu-note>
        <p>An |ArrayLiteral| is an expression describing the initialization of an Array, using a list, of zero or more expressions each of which represents an array element, enclosed in square brackets. The elements need not be literals; they are evaluated each time the array initializer is evaluated.</p>
      </emu-note>
      <p>Array elements may be elided at the beginning, middle or end of the element list. Whenever a comma in the element list is not preceded by an |AssignmentExpression| (i.e., a comma at the beginning or after another comma), the missing array element contributes to the length of the Array and increases the index of subsequent elements. Elided array elements are not defined. If an element is elided at the end of an array, that element does not contribute to the length of the Array.</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        ArrayLiteral[Yield, Await] :
          `[` Elision? `]`
          `[` ElementList[?Yield, ?Await] `]`
          `[` ElementList[?Yield, ?Await] `,` Elision? `]`

        ElementList[Yield, Await] :
          Elision? AssignmentExpression[+In, ?Yield, ?Await]
          Elision? SpreadElement[?Yield, ?Await]
          ElementList[?Yield, ?Await] `,` Elision? AssignmentExpression[+In, ?Yield, ?Await]
          ElementList[?Yield, ?Await] `,` Elision? SpreadElement[?Yield, ?Await]

        Elision :
          `,`
          Elision `,`

        SpreadElement[Yield, Await] :
          `...` AssignmentExpression[+In, ?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-runtime-semantics-arrayaccumulation" oldids="sec-static-semantics-elisionwidth" type="sdo">
        <h1>
          Runtime Semantics: ArrayAccumulation (
            _array_: an Array,
            _nextIndex_: an integer,
          ): either a normal completion containing an integer or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>Elision : `,`</emu-grammar>
        <emu-alg>
          1. Let _len_ be _nextIndex_ + 1.
          1. Perform ? Set(_array_, *"length"*, 𝔽(_len_), *true*).
          1. NOTE: The above step throws if _len_ exceeds 2<sup>32</sup> - 1.
          1. Return _len_.
        </emu-alg>
        <emu-grammar>Elision : Elision `,`</emu-grammar>
        <emu-alg>
          1. Return ? ArrayAccumulation of |Elision| with arguments _array_ and (_nextIndex_ + 1).
        </emu-alg>
        <emu-grammar>ElementList : Elision? AssignmentExpression</emu-grammar>
        <emu-alg>
          1. If |Elision| is present, then
            1. Set _nextIndex_ to ? ArrayAccumulation of |Elision| with arguments _array_ and _nextIndex_.
          1. Let _initResult_ be ? Evaluation of |AssignmentExpression|.
          1. Let _initValue_ be ? GetValue(_initResult_).
          1. Perform ! CreateDataPropertyOrThrow(_array_, ! ToString(𝔽(_nextIndex_)), _initValue_).
          1. Return _nextIndex_ + 1.
        </emu-alg>
        <emu-grammar>ElementList : Elision? SpreadElement</emu-grammar>
        <emu-alg>
          1. If |Elision| is present, then
            1. Set _nextIndex_ to ? ArrayAccumulation of |Elision| with arguments _array_ and _nextIndex_.
          1. Return ? ArrayAccumulation of |SpreadElement| with arguments _array_ and _nextIndex_.
        </emu-alg>
        <emu-grammar>ElementList : ElementList `,` Elision? AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Set _nextIndex_ to ? ArrayAccumulation of |ElementList| with arguments _array_ and _nextIndex_.
          1. If |Elision| is present, then
            1. Set _nextIndex_ to ? ArrayAccumulation of |Elision| with arguments _array_ and _nextIndex_.
          1. Let _initResult_ be ? Evaluation of |AssignmentExpression|.
          1. Let _initValue_ be ? GetValue(_initResult_).
          1. Perform ! CreateDataPropertyOrThrow(_array_, ! ToString(𝔽(_nextIndex_)), _initValue_).
          1. Return _nextIndex_ + 1.
        </emu-alg>
        <emu-grammar>ElementList : ElementList `,` Elision? SpreadElement</emu-grammar>
        <emu-alg>
          1. Set _nextIndex_ to ? ArrayAccumulation of |ElementList| with arguments _array_ and _nextIndex_.
          1. If |Elision| is present, then
            1. Set _nextIndex_ to ? ArrayAccumulation of |Elision| with arguments _array_ and _nextIndex_.
          1. Return ? ArrayAccumulation of |SpreadElement| with arguments _array_ and _nextIndex_.
        </emu-alg>
        <emu-grammar>SpreadElement : `...` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _spreadRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _spreadObj_ be ? GetValue(_spreadRef_).
          1. Let _iteratorRecord_ be ? GetIterator(_spreadObj_, ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _nextIndex_.
            1. Perform ! CreateDataPropertyOrThrow(_array_, ! ToString(𝔽(_nextIndex_)), _next_).
            1. Set _nextIndex_ to _nextIndex_ + 1.
        </emu-alg>
        <emu-note>
          <p>CreateDataPropertyOrThrow is used to ensure that own properties are defined for the array even if the standard built-in Array prototype object has been modified in a manner that would preclude the creation of new own properties using [[Set]].</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-array-initializer-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>ArrayLiteral : `[` Elision? `]`</emu-grammar>
        <emu-alg>
          1. Let _array_ be ! ArrayCreate(0).
          1. If |Elision| is present, then
            1. Perform ? ArrayAccumulation of |Elision| with arguments _array_ and 0.
          1. Return _array_.
        </emu-alg>
        <emu-grammar>ArrayLiteral : `[` ElementList `]`</emu-grammar>
        <emu-alg>
          1. Let _array_ be ! ArrayCreate(0).
          1. Perform ? ArrayAccumulation of |ElementList| with arguments _array_ and 0.
          1. Return _array_.
        </emu-alg>
        <emu-grammar>ArrayLiteral : `[` ElementList `,` Elision? `]`</emu-grammar>
        <emu-alg>
          1. Let _array_ be ! ArrayCreate(0).
          1. Let _nextIndex_ be ? ArrayAccumulation of |ElementList| with arguments _array_ and 0.
          1. If |Elision| is present, then
            1. Perform ? ArrayAccumulation of |Elision| with arguments _array_ and _nextIndex_.
          1. Return _array_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-object-initializer">
      <h1>Object Initializer</h1>
      <emu-note>
        <p>An object initializer is an expression describing the initialization of an Object, written in a form resembling a literal. It is a list of zero or more pairs of property keys and associated values, enclosed in curly brackets. The values need not be literals; they are evaluated each time the object initializer is evaluated.</p>
      </emu-note>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        ObjectLiteral[Yield, Await] :
          `{` `}`
          `{` PropertyDefinitionList[?Yield, ?Await] `}`
          `{` PropertyDefinitionList[?Yield, ?Await] `,` `}`

        PropertyDefinitionList[Yield, Await] :
          PropertyDefinition[?Yield, ?Await]
          PropertyDefinitionList[?Yield, ?Await] `,` PropertyDefinition[?Yield, ?Await]

        PropertyDefinition[Yield, Await] :
          IdentifierReference[?Yield, ?Await]
          CoverInitializedName[?Yield, ?Await]
          PropertyName[?Yield, ?Await] `:` AssignmentExpression[+In, ?Yield, ?Await]
          MethodDefinition[?Yield, ?Await]
          `...` AssignmentExpression[+In, ?Yield, ?Await]

        PropertyName[Yield, Await] :
          LiteralPropertyName
          ComputedPropertyName[?Yield, ?Await]

        LiteralPropertyName :
          IdentifierName
          StringLiteral
          NumericLiteral

        ComputedPropertyName[Yield, Await] :
          `[` AssignmentExpression[+In, ?Yield, ?Await] `]`

        CoverInitializedName[Yield, Await] :
          IdentifierReference[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]

        Initializer[In, Yield, Await] :
          `=` AssignmentExpression[?In, ?Yield, ?Await]
      </emu-grammar>
      <emu-note>
        <p>|MethodDefinition| is defined in <emu-xref href="#sec-method-definitions"></emu-xref>.</p>
      </emu-note>
      <emu-note>
        <p>In certain contexts, |ObjectLiteral| is used as a cover grammar for a more restricted secondary grammar. The |CoverInitializedName| production is necessary to fully cover these secondary grammars. However, use of this production results in an early Syntax Error in normal contexts where an actual |ObjectLiteral| is expected.</p>
      </emu-note>

      <emu-clause id="sec-object-initializer-static-semantics-early-errors" oldids="sec-__proto__-property-names-in-object-initializers">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>PropertyDefinition : MethodDefinition</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if HasDirectSuper of |MethodDefinition| is *true*.
          </li>
          <li>
            It is a Syntax Error if the PrivateBoundIdentifiers of |MethodDefinition| is not empty.
          </li>
        </ul>
        <p>In addition to describing an actual object initializer the |ObjectLiteral| productions are also used as a cover grammar for |ObjectAssignmentPattern| and may be recognized as part of a |CoverParenthesizedExpressionAndArrowParameterList|. When |ObjectLiteral| appears in a context where |ObjectAssignmentPattern| is required the following Early Error rules are <b>not</b> applied. In addition, they are not applied when initially parsing a |CoverParenthesizedExpressionAndArrowParameterList| or |CoverCallExpressionAndAsyncArrowHead|.</p>
        <emu-grammar>PropertyDefinition : CoverInitializedName</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if any source text is matched by this production.
          </li>
        </ul>
        <emu-note>
          <p>This production exists so that |ObjectLiteral| can serve as a cover grammar for |ObjectAssignmentPattern|. It cannot occur in an actual object initializer.</p>
        </emu-note>
        <emu-grammar>
          ObjectLiteral :
            `{` PropertyDefinitionList `}`
            `{` PropertyDefinitionList `,` `}`
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the PropertyNameList of |PropertyDefinitionList| contains any duplicate entries for *"__proto__"* and at least two of those entries were obtained from productions of the form <emu-grammar>PropertyDefinition : PropertyName `:` AssignmentExpression</emu-grammar>. This rule is not applied if this |ObjectLiteral| is contained within a |Script| that is being parsed for JSON.parse (see step <emu-xref href="#step-json-parse-parse"></emu-xref> of <emu-xref href="#sec-json.parse">JSON.parse</emu-xref>).
          </li>
        </ul>
        <emu-note>
          <p>The List returned by PropertyNameList does not include property names defined using a |ComputedPropertyName|.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-static-semantics-iscomputedpropertykey" type="sdo">
        <h1>Static Semantics: IsComputedPropertyKey ( ): a Boolean</h1>
        <dl class="header">
        </dl>
        <emu-grammar>PropertyName : LiteralPropertyName</emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
        <emu-grammar>PropertyName : ComputedPropertyName</emu-grammar>
        <emu-alg>
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-propertynamelist" type="sdo">
        <h1>Static Semantics: PropertyNameList ( ): a List of Strings</h1>
        <dl class="header">
        </dl>
        <emu-grammar>PropertyDefinitionList : PropertyDefinition</emu-grammar>
        <emu-alg>
          1. Let _propName_ be the PropName of |PropertyDefinition|.
          1. If _propName_ is ~empty~, return a new empty List.
          1. Return « _propName_ ».
        </emu-alg>
        <emu-grammar>PropertyDefinitionList : PropertyDefinitionList `,` PropertyDefinition</emu-grammar>
        <emu-alg>
          1. Let _list_ be the PropertyNameList of |PropertyDefinitionList|.
          1. Let _propName_ be the PropName of |PropertyDefinition|.
          1. If _propName_ is ~empty~, return _list_.
          1. Return the list-concatenation of _list_ and « _propName_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-object-initializer-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>ObjectLiteral : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return OrdinaryObjectCreate(%Object.prototype%).
        </emu-alg>
        <emu-grammar>
          ObjectLiteral :
            `{` PropertyDefinitionList `}`
            `{` PropertyDefinitionList `,` `}`
        </emu-grammar>
        <emu-alg>
          1. Let _obj_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Perform ? PropertyDefinitionEvaluation of |PropertyDefinitionList| with argument _obj_.
          1. Return _obj_.
        </emu-alg>
        <emu-grammar>LiteralPropertyName : IdentifierName</emu-grammar>
        <emu-alg>
          1. Return the StringValue of |IdentifierName|.
        </emu-alg>
        <emu-grammar>LiteralPropertyName : StringLiteral</emu-grammar>
        <emu-alg>
          1. Return the SV of |StringLiteral|.
        </emu-alg>
        <emu-grammar>LiteralPropertyName : NumericLiteral</emu-grammar>
        <emu-alg>
          1. Let _nbr_ be the NumericValue of |NumericLiteral|.
          1. Return ! ToString(_nbr_).
        </emu-alg>
        <emu-grammar>ComputedPropertyName : `[` AssignmentExpression `]`</emu-grammar>
        <emu-alg>
          1. Let _exprValue_ be ? Evaluation of |AssignmentExpression|.
          1. Let _propName_ be ? GetValue(_exprValue_).
          1. Return ? ToPropertyKey(_propName_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-propertydefinitionevaluation" oldids="sec-object-initializer-runtime-semantics-propertydefinitionevaluation" type="sdo">
        <h1>
          Runtime Semantics: PropertyDefinitionEvaluation (
            _object_: an Object,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>PropertyDefinitionList : PropertyDefinitionList `,` PropertyDefinition</emu-grammar>
        <emu-alg>
          1. Perform ? PropertyDefinitionEvaluation of |PropertyDefinitionList| with argument _object_.
          1. Perform ? PropertyDefinitionEvaluation of |PropertyDefinition| with argument _object_.
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>PropertyDefinition : `...` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _exprValue_ be ? Evaluation of |AssignmentExpression|.
          1. Let _fromValue_ be ? GetValue(_exprValue_).
          1. Let _excludedNames_ be a new empty List.
          1. Perform ? CopyDataProperties(_object_, _fromValue_, _excludedNames_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>PropertyDefinition : IdentifierReference</emu-grammar>
        <emu-alg>
          1. Let _propName_ be the StringValue of |IdentifierReference|.
          1. Let _exprValue_ be ? Evaluation of |IdentifierReference|.
          1. Let _propValue_ be ? GetValue(_exprValue_).
          1. Assert: _object_ is an ordinary, extensible object with no non-configurable properties.
          1. Perform ! CreateDataPropertyOrThrow(_object_, _propName_, _propValue_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>PropertyDefinition : PropertyName `:` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _propKey_ be ? Evaluation of |PropertyName|.
          1. If this |PropertyDefinition| is contained within a |Script| that is being evaluated for JSON.parse (see step <emu-xref href="#step-json-parse-eval"></emu-xref> of <emu-xref href="#sec-json.parse">JSON.parse</emu-xref>), then
            1. Let _isProtoSetter_ be *false*.
          1. Else if _propKey_ is *"__proto__"* and IsComputedPropertyKey of |PropertyName| is *false*, then
            1. Let _isProtoSetter_ be *true*.
          1. Else,
            1. Let _isProtoSetter_ be *false*.
          1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
            1. Let _propValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
          1. Else,
            1. Let _exprValueRef_ be ? Evaluation of |AssignmentExpression|.
            1. Let _propValue_ be ? GetValue(_exprValueRef_).
          1. If _isProtoSetter_ is *true*, then
            1. If _propValue_ is an Object or _propValue_ is *null*, then
              1. Perform ! <emu-meta effects="user-code">_object_.[[SetPrototypeOf]]</emu-meta>(_propValue_).
            1. Return ~unused~.
          1. Assert: _object_ is an ordinary, extensible object with no non-configurable properties.
          1. Perform ! CreateDataPropertyOrThrow(_object_, _propKey_, _propValue_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>PropertyDefinition : MethodDefinition</emu-grammar>
        <emu-alg>
          1. Perform ? MethodDefinitionEvaluation of |MethodDefinition| with arguments _object_ and *true*.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-function-defining-expressions">
      <h1>Function Defining Expressions</h1>
      <p>See <emu-xref href="#sec-function-definitions"></emu-xref> for <emu-grammar>PrimaryExpression : FunctionExpression</emu-grammar>.</p>
      <p>See <emu-xref href="#sec-generator-function-definitions"></emu-xref> for <emu-grammar>PrimaryExpression : GeneratorExpression</emu-grammar>.</p>
      <p>See <emu-xref href="#sec-class-definitions"></emu-xref> for <emu-grammar>PrimaryExpression : ClassExpression</emu-grammar>.</p>
      <p>See <emu-xref href="#sec-async-function-definitions"></emu-xref> for <emu-grammar>PrimaryExpression : AsyncFunctionExpression</emu-grammar>.</p>
      <p>See <emu-xref href="#sec-async-generator-function-definitions"></emu-xref> for <emu-grammar>PrimaryExpression : AsyncGeneratorExpression</emu-grammar>.</p>
    </emu-clause>

    <emu-clause id="sec-primary-expression-regular-expression-literals">
      <h1>Regular Expression Literals</h1>
      <h2>Syntax</h2>
      <p>See <emu-xref href="#sec-literals-regular-expression-literals"></emu-xref>.</p>

      <emu-clause id="sec-primary-expression-regular-expression-literals-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>PrimaryExpression : RegularExpressionLiteral</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsValidRegularExpressionLiteral(|RegularExpressionLiteral|) is *false*.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-isvalidregularexpressionliteral" type="abstract operation">
        <h1>
          Static Semantics: IsValidRegularExpressionLiteral (
            _literal_: a |RegularExpressionLiteral| Parse Node,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It determines if its argument is a valid regular expression literal.</dd>
        </dl>
        <emu-alg>
          1. Let _flags_ be the FlagText of _literal_.
          1. If _flags_ contains any code points other than `d`, `g`, `i`, `m`, `s`, `u`, `v`, or `y`, or if _flags_ contains any code point more than once, return *false*.
          1. If _flags_ contains `u`, let _u_ be *true*; else let _u_ be *false*.
          1. If _flags_ contains `v`, let _v_ be *true*; else let _v_ be *false*.
          1. Let _patternText_ be the BodyText of _literal_.
          1. If _u_ is *false* and _v_ is *false*, then
            1. Let _stringValue_ be CodePointsToString(_patternText_).
            1. Set _patternText_ to the sequence of code points resulting from interpreting each of the 16-bit elements of _stringValue_ as a Unicode BMP code point. UTF-16 decoding is not applied to the elements.
          1. Let _parseResult_ be ParsePattern(_patternText_, _u_, _v_).
          1. If _parseResult_ is a Parse Node, return *true*; else return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-regular-expression-literals-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>PrimaryExpression : RegularExpressionLiteral</emu-grammar>
        <emu-alg>
          1. Let _pattern_ be CodePointsToString(BodyText of |RegularExpressionLiteral|).
          1. Let _flags_ be CodePointsToString(FlagText of |RegularExpressionLiteral|).
          1. Return ! RegExpCreate(_pattern_, _flags_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-template-literals">
      <h1>Template Literals</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        TemplateLiteral[Yield, Await, Tagged] :
          NoSubstitutionTemplate
          SubstitutionTemplate[?Yield, ?Await, ?Tagged]

        SubstitutionTemplate[Yield, Await, Tagged] :
          TemplateHead Expression[+In, ?Yield, ?Await] TemplateSpans[?Yield, ?Await, ?Tagged]

        TemplateSpans[Yield, Await, Tagged] :
          TemplateTail
          TemplateMiddleList[?Yield, ?Await, ?Tagged] TemplateTail

        TemplateMiddleList[Yield, Await, Tagged] :
          TemplateMiddle Expression[+In, ?Yield, ?Await]
          TemplateMiddleList[?Yield, ?Await, ?Tagged] TemplateMiddle Expression[+In, ?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-static-semantics-template-early-errors" oldids="sec-primary-expression-template-literals-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          TemplateLiteral[Yield, Await, Tagged] : NoSubstitutionTemplate
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the <sub>[Tagged]</sub> parameter was not set and |NoSubstitutionTemplate| Contains |NotEscapeSequence|.
          </li>
        </ul>

        <emu-grammar>
          TemplateLiteral[Yield, Await, Tagged] : SubstitutionTemplate[?Yield, ?Await, ?Tagged]
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the number of elements in the TemplateStrings of |TemplateLiteral| with argument *false* is greater than or equal to 2<sup>32</sup>.
          </li>
        </ul>

        <emu-grammar>
          SubstitutionTemplate[Yield, Await, Tagged] : TemplateHead Expression[+In, ?Yield, ?Await] TemplateSpans[?Yield, ?Await, ?Tagged]
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the <sub>[Tagged]</sub> parameter was not set and |TemplateHead| Contains |NotEscapeSequence|.
          </li>
        </ul>

        <emu-grammar>
          TemplateSpans[Yield, Await, Tagged] : TemplateTail
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the <sub>[Tagged]</sub> parameter was not set and |TemplateTail| Contains |NotEscapeSequence|.
          </li>
        </ul>

        <emu-grammar>
          TemplateMiddleList[Yield, Await, Tagged] :
            TemplateMiddle Expression[+In, ?Yield, ?Await]
            TemplateMiddleList[?Yield, ?Await, ?Tagged] TemplateMiddle Expression[+In, ?Yield, ?Await]
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the <sub>[Tagged]</sub> parameter was not set and |TemplateMiddle| Contains |NotEscapeSequence|.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-static-semantics-templatestrings" type="sdo">
        <h1>
          Static Semantics: TemplateStrings (
            _raw_: a Boolean,
          ): a List of either Strings or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>TemplateLiteral : NoSubstitutionTemplate</emu-grammar>
        <emu-alg>
          1. Return « TemplateString(|NoSubstitutionTemplate|, _raw_) ».
        </emu-alg>
        <emu-grammar>SubstitutionTemplate : TemplateHead Expression TemplateSpans</emu-grammar>
        <emu-alg>
          1. Let _head_ be « TemplateString(|TemplateHead|, _raw_) ».
          1. Let _tail_ be the TemplateStrings of |TemplateSpans| with argument _raw_.
          1. Return the list-concatenation of _head_ and _tail_.
        </emu-alg>
        <emu-grammar>TemplateSpans : TemplateTail</emu-grammar>
        <emu-alg>
          1. Return « TemplateString(|TemplateTail|, _raw_) ».
        </emu-alg>
        <emu-grammar>TemplateSpans : TemplateMiddleList TemplateTail</emu-grammar>
        <emu-alg>
          1. Let _middle_ be the TemplateStrings of |TemplateMiddleList| with argument _raw_.
          1. Let _tail_ be « TemplateString(|TemplateTail|, _raw_) ».
          1. Return the list-concatenation of _middle_ and _tail_.
        </emu-alg>
        <emu-grammar>TemplateMiddleList : TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Return « TemplateString(|TemplateMiddle|, _raw_) ».
        </emu-alg>
        <emu-grammar>TemplateMiddleList : TemplateMiddleList TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Let _front_ be the TemplateStrings of |TemplateMiddleList| with argument _raw_.
          1. Let _last_ be « TemplateString(|TemplateMiddle|, _raw_) ».
          1. Return the list-concatenation of _front_ and _last_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-templatestring" type="abstract operation">
        <h1>
          Static Semantics: TemplateString (
            _templateToken_: a |NoSubstitutionTemplate| Parse Node, a |TemplateHead| Parse Node, a |TemplateMiddle| Parse Node, or a |TemplateTail| Parse Node,
            _raw_: a Boolean,
          ): a String or *undefined*
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _raw_ is *true*, then
            1. Let _string_ be the TRV of _templateToken_.
          1. Else,
            1. Let _string_ be the TV of _templateToken_.
          1. Return _string_.
        </emu-alg>
        <emu-note>
          <p>This operation returns *undefined* if _raw_ is *false* and _templateToken_ contains a |NotEscapeSequence|. In all other cases, it returns a String.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-gettemplateobject" type="abstract operation">
        <h1>
          GetTemplateObject (
            _templateLiteral_: a Parse Node,
          ): an Array
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _realm_ be the current Realm Record.
          1. Let _templateRegistry_ be _realm_.[[TemplateMap]].
          1. For each element _e_ of _templateRegistry_, do
            1. If _e_.[[Site]] is the same Parse Node as _templateLiteral_, then
              1. Return _e_.[[Array]].
          1. Let _rawStrings_ be the TemplateStrings of _templateLiteral_ with argument *true*.
          1. Assert: _rawStrings_ is a List of Strings.
          1. Let _cookedStrings_ be the TemplateStrings of _templateLiteral_ with argument *false*.
          1. Let _count_ be the number of elements in the List _cookedStrings_.
          1. Assert: _count_ ≤ 2<sup>32</sup> - 1.
          1. Let _template_ be ! ArrayCreate(_count_).
          1. Let _rawObj_ be ! ArrayCreate(_count_).
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _count_,
            1. Let _prop_ be ! ToString(𝔽(_index_)).
            1. Let _cookedValue_ be _cookedStrings_[_index_].
            1. Perform ! DefinePropertyOrThrow(_template_, _prop_, PropertyDescriptor { [[Value]]: _cookedValue_, [[Writable]]: *false*, [[Enumerable]]: *true*, [[Configurable]]: *false* }).
            1. Let _rawValue_ be the String value _rawStrings_[_index_].
            1. Perform ! DefinePropertyOrThrow(_rawObj_, _prop_, PropertyDescriptor { [[Value]]: _rawValue_, [[Writable]]: *false*, [[Enumerable]]: *true*, [[Configurable]]: *false* }).
            1. Set _index_ to _index_ + 1.
          1. Perform ! SetIntegrityLevel(_rawObj_, ~frozen~).
          1. Perform ! DefinePropertyOrThrow(_template_, *"raw"*, PropertyDescriptor { [[Value]]: _rawObj_, [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }).
          1. Perform ! SetIntegrityLevel(_template_, ~frozen~).
          1. Append the Record { [[Site]]: _templateLiteral_, [[Array]]: _template_ } to _realm_.[[TemplateMap]].
          1. Return _template_.
        </emu-alg>
        <emu-note>
          <p>The creation of a template object cannot result in an abrupt completion.</p>
        </emu-note>
        <emu-note>
          <p>Each |TemplateLiteral| in the program code of a realm is associated with a unique template object that is used in the evaluation of tagged Templates (<emu-xref href="#sec-template-literals-runtime-semantics-evaluation"></emu-xref>). The template objects are frozen and the same template object is used each time a specific tagged Template is evaluated. Whether template objects are created lazily upon first evaluation of the |TemplateLiteral| or eagerly prior to first evaluation is an implementation choice that is not observable to ECMAScript code.</p>
        </emu-note>
        <emu-note>
          <p>Future editions of this specification may define additional non-enumerable properties of template objects.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-substitutionevaluation" type="sdo">
        <h1>Runtime Semantics: SubstitutionEvaluation ( ): either a normal completion containing a List of ECMAScript language values or an abrupt completion</h1>
        <dl class="header">
        </dl>
        <emu-grammar>TemplateSpans : TemplateTail</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>TemplateSpans : TemplateMiddleList TemplateTail</emu-grammar>
        <emu-alg>
          1. Return ? SubstitutionEvaluation of |TemplateMiddleList|.
        </emu-alg>
        <emu-grammar>TemplateMiddleList : TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Let _subRef_ be ? Evaluation of |Expression|.
          1. Let _sub_ be ? GetValue(_subRef_).
          1. Return « _sub_ ».
        </emu-alg>
        <emu-grammar>TemplateMiddleList : TemplateMiddleList TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Let _preceding_ be ? SubstitutionEvaluation of |TemplateMiddleList|.
          1. Let _nextRef_ be ? Evaluation of |Expression|.
          1. Let _next_ be ? GetValue(_nextRef_).
          1. Return the list-concatenation of _preceding_ and « _next_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-template-literals-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>TemplateLiteral : NoSubstitutionTemplate</emu-grammar>
        <emu-alg>
          1. Return the TV of |NoSubstitutionTemplate| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
        </emu-alg>
        <emu-grammar>SubstitutionTemplate : TemplateHead Expression TemplateSpans</emu-grammar>
        <emu-alg>
          1. Let _head_ be the TV of |TemplateHead| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
          1. Let _subRef_ be ? Evaluation of |Expression|.
          1. Let _sub_ be ? GetValue(_subRef_).
          1. Let _middle_ be ? ToString(_sub_).
          1. Let _tail_ be ? Evaluation of |TemplateSpans|.
          1. Return the string-concatenation of _head_, _middle_, and _tail_.
        </emu-alg>
        <emu-note>
          <p>The string conversion semantics applied to the |Expression| value are like `String.prototype.concat` rather than the `+` operator.</p>
        </emu-note>
        <emu-grammar>TemplateSpans : TemplateTail</emu-grammar>
        <emu-alg>
          1. Return the TV of |TemplateTail| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
        </emu-alg>
        <emu-grammar>TemplateSpans : TemplateMiddleList TemplateTail</emu-grammar>
        <emu-alg>
          1. Let _head_ be ? Evaluation of |TemplateMiddleList|.
          1. Let _tail_ be the TV of |TemplateTail| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
          1. Return the string-concatenation of _head_ and _tail_.
        </emu-alg>
        <emu-grammar>TemplateMiddleList : TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Let _head_ be the TV of |TemplateMiddle| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
          1. Let _subRef_ be ? Evaluation of |Expression|.
          1. Let _sub_ be ? GetValue(_subRef_).
          1. Let _middle_ be ? ToString(_sub_).
          1. Return the string-concatenation of _head_ and _middle_.
        </emu-alg>
        <emu-note>
          <p>The string conversion semantics applied to the |Expression| value are like `String.prototype.concat` rather than the `+` operator.</p>
        </emu-note>
        <emu-grammar>TemplateMiddleList : TemplateMiddleList TemplateMiddle Expression</emu-grammar>
        <emu-alg>
          1. Let _rest_ be ? Evaluation of |TemplateMiddleList|.
          1. Let _middle_ be the TV of |TemplateMiddle| as defined in <emu-xref href="#sec-template-literal-lexical-components"></emu-xref>.
          1. Let _subRef_ be ? Evaluation of |Expression|.
          1. Let _sub_ be ? GetValue(_subRef_).
          1. Let _last_ be ? ToString(_sub_).
          1. Return the string-concatenation of _rest_, _middle_, and _last_.
        </emu-alg>
        <emu-note>
          <p>The string conversion semantics applied to the |Expression| value are like `String.prototype.concat` rather than the `+` operator.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-grouping-operator">
      <h1>The Grouping Operator</h1>

      <emu-clause id="sec-grouping-operator-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
        <ul>
          <li>
            |CoverParenthesizedExpressionAndArrowParameterList| must cover a |ParenthesizedExpression|.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-grouping-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
        <emu-alg>
          1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
          1. Return ? Evaluation of _expr_.
        </emu-alg>
        <emu-grammar>ParenthesizedExpression : `(` Expression `)`</emu-grammar>
        <emu-alg>
          1. Return ? Evaluation of |Expression|. This may be of type Reference.
        </emu-alg>
        <emu-note>
          <p>This algorithm does not apply GetValue to Evaluation of |Expression|. The principal motivation for this is so that operators such as `delete` and `typeof` may be applied to parenthesized expressions.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-left-hand-side-expressions">
    <h1>Left-Hand-Side Expressions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      MemberExpression[Yield, Await] :
        PrimaryExpression[?Yield, ?Await]
        MemberExpression[?Yield, ?Await] `[` Expression[+In, ?Yield, ?Await] `]`
        MemberExpression[?Yield, ?Await] `.` IdentifierName
        MemberExpression[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
        SuperProperty[?Yield, ?Await]
        MetaProperty
        `new` MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
        MemberExpression[?Yield, ?Await] `.` PrivateIdentifier

      SuperProperty[Yield, Await] :
        `super` `[` Expression[+In, ?Yield, ?Await] `]`
        `super` `.` IdentifierName

      MetaProperty :
        NewTarget
        ImportMeta

      NewTarget :
        `new` `.` `target`

      ImportMeta :
        `import` `.` `meta`

      NewExpression[Yield, Await] :
        MemberExpression[?Yield, ?Await]
        `new` NewExpression[?Yield, ?Await]

      CallExpression[Yield, Await] :
        CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] #callcover
        SuperCall[?Yield, ?Await]
        ImportCall[?Yield, ?Await]
        CallExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
        CallExpression[?Yield, ?Await] `[` Expression[+In, ?Yield, ?Await] `]`
        CallExpression[?Yield, ?Await] `.` IdentifierName
        CallExpression[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
        CallExpression[?Yield, ?Await] `.` PrivateIdentifier

      SuperCall[Yield, Await] :
        `super` Arguments[?Yield, ?Await]

      ImportCall[Yield, Await] :
        `import` `(` AssignmentExpression[+In, ?Yield, ?Await] `)`

      Arguments[Yield, Await] :
        `(` `)`
        `(` ArgumentList[?Yield, ?Await] `)`
        `(` ArgumentList[?Yield, ?Await] `,` `)`

      ArgumentList[Yield, Await] :
        AssignmentExpression[+In, ?Yield, ?Await]
        `...` AssignmentExpression[+In, ?Yield, ?Await]
        ArgumentList[?Yield, ?Await] `,` AssignmentExpression[+In, ?Yield, ?Await]
        ArgumentList[?Yield, ?Await] `,` `...` AssignmentExpression[+In, ?Yield, ?Await]

      OptionalExpression[Yield, Await] :
        MemberExpression[?Yield, ?Await] OptionalChain[?Yield, ?Await]
        CallExpression[?Yield, ?Await] OptionalChain[?Yield, ?Await]
        OptionalExpression[?Yield, ?Await] OptionalChain[?Yield, ?Await]

      OptionalChain[Yield, Await] :
        `?.` Arguments[?Yield, ?Await]
        `?.` `[` Expression[+In, ?Yield, ?Await] `]`
        `?.` IdentifierName
        `?.` TemplateLiteral[?Yield, ?Await, +Tagged]
        `?.` PrivateIdentifier
        OptionalChain[?Yield, ?Await] Arguments[?Yield, ?Await]
        OptionalChain[?Yield, ?Await] `[` Expression[+In, ?Yield, ?Await] `]`
        OptionalChain[?Yield, ?Await] `.` IdentifierName
        OptionalChain[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
        OptionalChain[?Yield, ?Await] `.` PrivateIdentifier

      LeftHandSideExpression[Yield, Await] :
        NewExpression[?Yield, ?Await]
        CallExpression[?Yield, ?Await]
        OptionalExpression[?Yield, ?Await]
    </emu-grammar>
    <h2>Supplemental Syntax</h2>
    <p>
      When processing an instance of the production<br>
      <emu-grammar>CallExpression : CoverCallExpressionAndAsyncArrowHead</emu-grammar><br>
      the interpretation of |CoverCallExpressionAndAsyncArrowHead| is refined using the following grammar:
    </p>
    <emu-grammar type="definition">
      CallMemberExpression[Yield, Await] :
        MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-static-semantics">
      <h1>Static Semantics</h1>

      <emu-clause id="sec-left-hand-side-expressions-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          OptionalChain :
            `?.` TemplateLiteral
            OptionalChain TemplateLiteral
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if any source text is matched by this production.
          </li>
        </ul>
        <emu-note>
          <p>This production exists in order to prevent automatic semicolon insertion rules (<emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>) from being applied to the following code:</p>
          <pre><code class="javascript">
            a?.b
            `c`
          </code></pre>
          <p>so that it would be interpreted as two valid statements. The purpose is to maintain consistency with similar code without optional chaining:</p>
          <pre><code class="javascript">
            a.b
            `c`
          </code></pre>
          <p>which is a valid statement and where automatic semicolon insertion does not apply.</p>
        </emu-note>

        <emu-grammar>
          ImportMeta :
            `import` `.` `meta`
        </emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the syntactic goal symbol is not |Module|.
          </li>
        </ul>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-property-accessors">
      <h1>Property Accessors</h1>
      <emu-note>
        <p>Properties are accessed by name, using either the dot notation:</p>
        <div class="rhs">
          |MemberExpression| `.` |IdentifierName|<br>
          |CallExpression| `.` |IdentifierName|
        </div>
        <p>or the bracket notation:</p>
        <div class="rhs">
          |MemberExpression| `[` |Expression| `]`<br>
          |CallExpression| `[` |Expression| `]`
        </div>
        <p>The dot notation is explained by the following syntactic conversion:</p>
        <div class="rhs">
          |MemberExpression| `.` |IdentifierName|
        </div>
        <p>is identical in its behaviour to</p>
        <div class="rhs">
          |MemberExpression| `[` &lt;<i>identifier-name-string</i>> `]`
        </div>
        <p>and similarly</p>
        <div class="rhs">
          |CallExpression| `.` |IdentifierName|
        </div>
        <p>is identical in its behaviour to</p>
        <div class="rhs">
          |CallExpression| `[` &lt;<i>identifier-name-string</i>> `]`
        </div>
        <p>where &lt;<i>identifier-name-string</i>> is the StringValue of |IdentifierName|.</p>
      </emu-note>

      <emu-clause id="sec-property-accessors-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>MemberExpression : MemberExpression `[` Expression `]`</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |MemberExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _strict_ be IsStrict(this |MemberExpression|).
          1. Return ? EvaluatePropertyAccessWithExpressionKey(_baseValue_, |Expression|, _strict_).
        </emu-alg>
        <emu-grammar>MemberExpression : MemberExpression `.` IdentifierName</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |MemberExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _strict_ be IsStrict(this |MemberExpression|).
          1. Return EvaluatePropertyAccessWithIdentifierKey(_baseValue_, |IdentifierName|, _strict_).
        </emu-alg>
        <emu-grammar>MemberExpression : MemberExpression `.` PrivateIdentifier</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |MemberExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _fieldNameString_ be the StringValue of |PrivateIdentifier|.
          1. Return MakePrivateReference(_baseValue_, _fieldNameString_).
        </emu-alg>
        <emu-grammar>CallExpression : CallExpression `[` Expression `]`</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |CallExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _strict_ be IsStrict(this |CallExpression|).
          1. Return ? EvaluatePropertyAccessWithExpressionKey(_baseValue_, |Expression|, _strict_).
        </emu-alg>
        <emu-grammar>CallExpression : CallExpression `.` IdentifierName</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |CallExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _strict_ be IsStrict(this |CallExpression|).
          1. Return EvaluatePropertyAccessWithIdentifierKey(_baseValue_, |IdentifierName|, _strict_).
        </emu-alg>
        <emu-grammar>CallExpression : CallExpression `.` PrivateIdentifier</emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |CallExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. Let _fieldNameString_ be the StringValue of |PrivateIdentifier|.
          1. Return MakePrivateReference(_baseValue_, _fieldNameString_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-evaluate-property-access-with-expression-key" type="abstract operation" oldids="sec-evaluate-expression-key-property-access">
      <h1>
        EvaluatePropertyAccessWithExpressionKey (
          _baseValue_: an ECMAScript language value,
          _expression_: an |Expression| Parse Node,
          _strict_: a Boolean,
        ): either a normal completion containing a Reference Record or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _propertyNameReference_ be ? Evaluation of _expression_.
        1. Let _propertyNameValue_ be ? GetValue(_propertyNameReference_).
        1. NOTE: In most cases, ToPropertyKey will be performed on _propertyNameValue_ immediately after this step. However, in the case of `a[b] = c`, it will not be performed until after evaluation of `c`.
        1. Return the Reference Record { [[Base]]: _baseValue_, [[ReferencedName]]: _propertyNameValue_, [[Strict]]: _strict_, [[ThisValue]]: ~empty~ }.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-evaluate-property-access-with-identifier-key" type="abstract operation" oldids="sec-evaluate-identifier-key-property-access">
      <h1>
        EvaluatePropertyAccessWithIdentifierKey (
          _baseValue_: an ECMAScript language value,
          _identifierName_: an |IdentifierName| Parse Node,
          _strict_: a Boolean,
        ): a Reference Record
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _propertyNameString_ be the StringValue of _identifierName_.
        1. Return the Reference Record { [[Base]]: _baseValue_, [[ReferencedName]]: _propertyNameString_, [[Strict]]: _strict_, [[ThisValue]]: ~empty~ }.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-new-operator">
      <h1>The `new` Operator</h1>

      <emu-clause id="sec-new-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>NewExpression : `new` NewExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateNew(|NewExpression|, ~empty~).
        </emu-alg>
        <emu-grammar>MemberExpression : `new` MemberExpression Arguments</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateNew(|MemberExpression|, |Arguments|).
        </emu-alg>

        <emu-clause id="sec-evaluatenew" type="abstract operation">
          <h1>
            EvaluateNew (
              _constructExpr_: a |NewExpression| Parse Node or a |MemberExpression| Parse Node,
              _arguments_: ~empty~ or an |Arguments| Parse Node,
            ): either a normal completion containing an ECMAScript language value or an abrupt completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _ref_ be ? Evaluation of _constructExpr_.
            1. Let _constructor_ be ? GetValue(_ref_).
            1. If _arguments_ is ~empty~, then
              1. Let _argList_ be a new empty List.
            1. Else,
              1. Let _argList_ be ? ArgumentListEvaluation of _arguments_.
            1. If IsConstructor(_constructor_) is *false*, throw a *TypeError* exception.
            1. Return ? Construct(_constructor_, _argList_).
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-function-calls">
      <h1>Function Calls</h1>

      <emu-clause id="sec-function-calls-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>CallExpression : CoverCallExpressionAndAsyncArrowHead</emu-grammar>
        <emu-alg>
          1. Let _expr_ be the |CallMemberExpression| that is covered by |CoverCallExpressionAndAsyncArrowHead|.
          1. Let _memberExpr_ be the |MemberExpression| of _expr_.
          1. Let _arguments_ be the |Arguments| of _expr_.
          1. Let _ref_ be ? Evaluation of _memberExpr_.
          1. Let _func_ be ? GetValue(_ref_).
          1. If _ref_ is a Reference Record, IsPropertyReference(_ref_) is *false*, and _ref_.[[ReferencedName]] is *"eval"*, then
            1. If SameValue(_func_, %eval%) is *true*, then
              1. Let _argList_ be ? ArgumentListEvaluation of _arguments_.
              1. If _argList_ has no elements, return *undefined*.
              1. Let _evalArg_ be the first element of _argList_.
              1. If IsStrict(this |CallExpression|) is *true*, let _strictCaller_ be *true*. Otherwise let _strictCaller_ be *false*.
              1. [id="step-callexpression-evaluation-direct-eval"] Return ? PerformEval(_evalArg_, _strictCaller_, *true*).
          1. Let _thisCall_ be this |CallExpression|.
          1. Let _tailCall_ be IsInTailPosition(_thisCall_).
          1. Return ? EvaluateCall(_func_, _ref_, _arguments_, _tailCall_).
        </emu-alg>
        <p>A |CallExpression| evaluation that executes step <emu-xref href="#step-callexpression-evaluation-direct-eval"></emu-xref> is a <dfn variants="direct evals">direct eval</dfn>.</p>
        <emu-grammar>CallExpression : CallExpression Arguments</emu-grammar>
        <emu-alg>
          1. Let _ref_ be ? Evaluation of |CallExpression|.
          1. Let _func_ be ? GetValue(_ref_).
          1. Let _thisCall_ be this |CallExpression|.
          1. Let _tailCall_ be IsInTailPosition(_thisCall_).
          1. Return ? EvaluateCall(_func_, _ref_, |Arguments|, _tailCall_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-evaluatecall" type="abstract operation" oldids="sec-evaluatedirectcall">
        <h1>
          EvaluateCall (
            _func_: an ECMAScript language value,
            _ref_: an ECMAScript language value or a Reference Record,
            _arguments_: a Parse Node,
            _tailPosition_: a Boolean,
          ): either a normal completion containing an ECMAScript language value or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _ref_ is a Reference Record, then
            1. If IsPropertyReference(_ref_) is *true*, then
              1. Let _thisValue_ be GetThisValue(_ref_).
            1. Else,
              1. Let _refEnv_ be _ref_.[[Base]].
              1. Assert: _refEnv_ is an Environment Record.
              1. Let _thisValue_ be _refEnv_.WithBaseObject().
          1. Else,
            1. Let _thisValue_ be *undefined*.
          1. Let _argList_ be ? ArgumentListEvaluation of _arguments_.
          1. If _func_ is not an Object, throw a *TypeError* exception.
          1. If IsCallable(_func_) is *false*, throw a *TypeError* exception.
          1. If _tailPosition_ is *true*, perform PrepareForTailCall().
          1. Return ? Call(_func_, _thisValue_, _argList_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-super-keyword">
      <h1>The `super` Keyword</h1>

      <emu-clause id="sec-super-keyword-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>SuperProperty : `super` `[` Expression `]`</emu-grammar>
        <emu-alg>
          1. Let _env_ be GetThisEnvironment().
          1. Let _actualThis_ be ? _env_.GetThisBinding().
          1. Let _propertyNameReference_ be ? Evaluation of |Expression|.
          1. Let _propertyNameValue_ be ? GetValue(_propertyNameReference_).
          1. Let _strict_ be IsStrict(this |SuperProperty|).
          1. NOTE: In most cases, ToPropertyKey will be performed on _propertyNameValue_ immediately after this step. However, in the case of `super[b] = c`, it will not be performed until after evaluation of `c`.
          1. Return MakeSuperPropertyReference(_actualThis_, _propertyNameValue_, _strict_).
        </emu-alg>
        <emu-grammar>SuperProperty : `super` `.` IdentifierName</emu-grammar>
        <emu-alg>
          1. Let _env_ be GetThisEnvironment().
          1. Let _actualThis_ be ? _env_.GetThisBinding().
          1. Let _propertyKey_ be the StringValue of |IdentifierName|.
          1. Let _strict_ be IsStrict(this |SuperProperty|).
          1. Return MakeSuperPropertyReference(_actualThis_, _propertyKey_, _strict_).
        </emu-alg>
        <emu-grammar>SuperCall : `super` Arguments</emu-grammar>
        <emu-alg>
          1. Let _newTarget_ be GetNewTarget().
          1. Assert: _newTarget_ is an Object.
          1. Let _func_ be GetSuperConstructor().
          1. Let _argList_ be ? ArgumentListEvaluation of |Arguments|.
          1. If IsConstructor(_func_) is *false*, throw a *TypeError* exception.
          1. Let _result_ be ? Construct(_func_, _argList_, _newTarget_).
          1. Let _thisER_ be GetThisEnvironment().
          1. Perform ? _thisER_.BindThisValue(_result_).
          1. Let _F_ be _thisER_.[[FunctionObject]].
          1. Assert: _F_ is an ECMAScript function object.
          1. Perform ? InitializeInstanceElements(_result_, _F_).
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getsuperconstructor" type="abstract operation">
        <h1>GetSuperConstructor ( ): an ECMAScript language value</h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _envRec_ be GetThisEnvironment().
          1. Assert: _envRec_ is a Function Environment Record.
          1. Let _activeFunction_ be _envRec_.[[FunctionObject]].
          1. Assert: _activeFunction_ is an ECMAScript function object.
          1. Let _superConstructor_ be ! _activeFunction_.[[GetPrototypeOf]]().
          1. Return _superConstructor_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-makesuperpropertyreference" type="abstract operation">
        <h1>
          MakeSuperPropertyReference (
            _actualThis_: an ECMAScript language value,
            _propertyKey_: an ECMAScript language value,
            _strict_: a Boolean,
          ): a Super Reference Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _env_ be GetThisEnvironment().
          1. Assert: _env_.HasSuperBinding() is *true*.
          1. Let _baseValue_ be _env_.GetSuperBase().
          1. Return the Reference Record { [[Base]]: _baseValue_, [[ReferencedName]]: _propertyKey_, [[Strict]]: _strict_, [[ThisValue]]: _actualThis_ }.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-argument-lists">
      <h1>Argument Lists</h1>
      <emu-note>
        <p>The evaluation of an argument list produces a List of values.</p>
      </emu-note>

      <emu-clause id="sec-runtime-semantics-argumentlistevaluation" oldids="sec-template-literals-runtime-semantics-argumentlistevaluation,sec-argument-lists-runtime-semantics-argumentlistevaluation" type="sdo">
        <h1>Runtime Semantics: ArgumentListEvaluation ( ): either a normal completion containing a List of ECMAScript language values or an abrupt completion</h1>
        <dl class="header">
        </dl>
        <emu-grammar>Arguments : `(` `)`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ArgumentList : AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _ref_ be ? Evaluation of |AssignmentExpression|.
          1. Let _arg_ be ? GetValue(_ref_).
          1. Return « _arg_ ».
        </emu-alg>
        <emu-grammar>ArgumentList : `...` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _list_ be a new empty List.
          1. Let _spreadRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _spreadObj_ be ? GetValue(_spreadRef_).
          1. Let _iteratorRecord_ be ? GetIterator(_spreadObj_, ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _list_.
            1. Append _next_ to _list_.
        </emu-alg>
        <emu-grammar>ArgumentList : ArgumentList `,` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _precedingArgs_ be ? ArgumentListEvaluation of |ArgumentList|.
          1. Let _ref_ be ? Evaluation of |AssignmentExpression|.
          1. Let _arg_ be ? GetValue(_ref_).
          1. Return the list-concatenation of _precedingArgs_ and « _arg_ ».
        </emu-alg>
        <emu-grammar>ArgumentList : ArgumentList `,` `...` AssignmentExpression</emu-grammar>
        <emu-alg>
          1. Let _precedingArgs_ be ? ArgumentListEvaluation of |ArgumentList|.
          1. Let _spreadRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _iteratorRecord_ be ? GetIterator(? GetValue(_spreadRef_), ~sync~).
          1. Repeat,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is ~done~, return _precedingArgs_.
            1. Append _next_ to _precedingArgs_.
        </emu-alg>
        <emu-grammar>TemplateLiteral : NoSubstitutionTemplate</emu-grammar>
        <emu-alg>
          1. Let _templateLiteral_ be this |TemplateLiteral|.
          1. Let _siteObj_ be GetTemplateObject(_templateLiteral_).
          1. Return « _siteObj_ ».
        </emu-alg>
        <emu-grammar>TemplateLiteral : SubstitutionTemplate</emu-grammar>
        <emu-alg>
          1. Let _templateLiteral_ be this |TemplateLiteral|.
          1. Let _siteObj_ be GetTemplateObject(_templateLiteral_).
          1. Let _remaining_ be ? ArgumentListEvaluation of |SubstitutionTemplate|.
          1. Return the list-concatenation of « _siteObj_ » and _remaining_.
        </emu-alg>
        <emu-grammar>SubstitutionTemplate : TemplateHead Expression TemplateSpans</emu-grammar>
        <emu-alg>
          1. Let _firstSubRef_ be ? Evaluation of |Expression|.
          1. Let _firstSub_ be ? GetValue(_firstSubRef_).
          1. Let _restSub_ be ? SubstitutionEvaluation of |TemplateSpans|.
          1. Assert: _restSub_ is a possibly empty List.
          1. Return the list-concatenation of « _firstSub_ » and _restSub_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-optional-chains">
      <h1>Optional Chains</h1>
      <emu-note>An optional chain is a chain of one or more property accesses and function calls, the first of which begins with the token `?.`.</emu-note>

      <emu-clause id="sec-optional-chaining-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>
          OptionalExpression :
            MemberExpression OptionalChain
        </emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |MemberExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. If _baseValue_ is either *undefined* or *null*, then
            1. Return *undefined*.
          1. Return ? ChainEvaluation of |OptionalChain| with arguments _baseValue_ and _baseReference_.
        </emu-alg>
        <emu-grammar>
          OptionalExpression :
            CallExpression OptionalChain
        </emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |CallExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. If _baseValue_ is either *undefined* or *null*, then
            1. Return *undefined*.
          1. Return ? ChainEvaluation of |OptionalChain| with arguments _baseValue_ and _baseReference_.
        </emu-alg>
        <emu-grammar>
          OptionalExpression :
            OptionalExpression OptionalChain
        </emu-grammar>
        <emu-alg>
          1. Let _baseReference_ be ? Evaluation of |OptionalExpression|.
          1. Let _baseValue_ be ? GetValue(_baseReference_).
          1. If _baseValue_ is either *undefined* or *null*, then
            1. Return *undefined*.
          1. Return ? ChainEvaluation of |OptionalChain| with arguments _baseValue_ and _baseReference_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-optional-chaining-chain-evaluation" type="sdo">
        <h1>
          Runtime Semantics: ChainEvaluation (
            _baseValue_: an ECMAScript language value,
            _baseReference_: an ECMAScript language value or a Reference Record,
          ): either a normal completion containing either an ECMAScript language value or a Reference Record, or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>OptionalChain : `?.` Arguments</emu-grammar>
        <emu-alg>
          1. Let _thisChain_ be this |OptionalChain|.
          1. Let _tailCall_ be IsInTailPosition(_thisChain_).
          1. Return ? EvaluateCall(_baseValue_, _baseReference_, |Arguments|, _tailCall_).
        </emu-alg>
        <emu-grammar>OptionalChain : `?.` `[` Expression `]`</emu-grammar>
        <emu-alg>
          1. Let _strict_ be IsStrict(this |OptionalChain|).
          1. Return ? EvaluatePropertyAccessWithExpressionKey(_baseValue_, |Expression|, _strict_).
        </emu-alg>
        <emu-grammar>OptionalChain : `?.` IdentifierName</emu-grammar>
        <emu-alg>
          1. Let _strict_ be IsStrict(this |OptionalChain|).
          1. Return EvaluatePropertyAccessWithIdentifierKey(_baseValue_, |IdentifierName|, _strict_).
        </emu-alg>
        <emu-grammar>OptionalChain : `?.` PrivateIdentifier</emu-grammar>
        <emu-alg>
          1. Let _fieldNameString_ be the StringValue of |PrivateIdentifier|.
          1. Return MakePrivateReference(_baseValue_, _fieldNameString_).
        </emu-alg>
        <emu-grammar>OptionalChain : OptionalChain Arguments</emu-grammar>
        <emu-alg>
          1. Let _optionalChain_ be |OptionalChain|.
          1. Let _newReference_ be ? ChainEvaluation of _optionalChain_ with arguments _baseValue_ and _baseReference_.
          1. Let _newValue_ be ? GetValue(_newReference_).
          1. Let _thisChain_ be this |OptionalChain|.
          1. Let _tailCall_ be IsInTailPosition(_thisChain_).
          1. Return ? EvaluateCall(_newValue_, _newReference_, |Arguments|, _tailCall_).
        </emu-alg>
        <emu-grammar>OptionalChain : OptionalChain `[` Expression `]`</emu-grammar>
        <emu-alg>
          1. Let _optionalChain_ be |OptionalChain|.
          1. Let _newReference_ be ? ChainEvaluation of _optionalChain_ with arguments _baseValue_ and _baseReference_.
          1. Let _newValue_ be ? GetValue(_newReference_).
          1. Let _strict_ be IsStrict(this |OptionalChain|).
          1. Return ? EvaluatePropertyAccessWithExpressionKey(_newValue_, |Expression|, _strict_).
        </emu-alg>
        <emu-grammar>OptionalChain : OptionalChain `.` IdentifierName</emu-grammar>
        <emu-alg>
          1. Let _optionalChain_ be |OptionalChain|.
          1. Let _newReference_ be ? ChainEvaluation of _optionalChain_ with arguments _baseValue_ and _baseReference_.
          1. Let _newValue_ be ? GetValue(_newReference_).
          1. Let _strict_ be IsStrict(this |OptionalChain|).
          1. Return EvaluatePropertyAccessWithIdentifierKey(_newValue_, |IdentifierName|, _strict_).
        </emu-alg>
        <emu-grammar>OptionalChain : OptionalChain `.` PrivateIdentifier</emu-grammar>
        <emu-alg>
          1. Let _optionalChain_ be |OptionalChain|.
          1. Let _newReference_ be ? ChainEvaluation of _optionalChain_ with arguments _baseValue_ and _baseReference_.
          1. Let _newValue_ be ? GetValue(_newReference_).
          1. Let _fieldNameString_ be the StringValue of |PrivateIdentifier|.
          1. Return MakePrivateReference(_newValue_, _fieldNameString_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-import-calls">
      <h1>Import Calls</h1>

      <emu-clause id="sec-import-call-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>

        <emu-grammar>ImportCall : `import` `(` AssignmentExpression `)`</emu-grammar>
        <emu-alg>
          1. Let _referrer_ be GetActiveScriptOrModule().
          1. If _referrer_ is *null*, set _referrer_ to the current Realm Record.
          1. Let _argRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _specifier_ be ? GetValue(_argRef_).
          1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
          1. Let _specifierString_ be Completion(ToString(_specifier_)).
          1. IfAbruptRejectPromise(_specifierString_, _promiseCapability_).
          1. Perform HostLoadImportedModule(_referrer_, _specifierString_, ~empty~, _promiseCapability_).
          1. Return _promiseCapability_.[[Promise]].
        </emu-alg>

        <emu-clause id="sec-ContinueDynamicImport" type="abstract operation">
          <h1>
            ContinueDynamicImport (
              _promiseCapability_: a PromiseCapability Record,
              _moduleCompletion_: either a normal completion containing a Module Record or a throw completion,
            ): ~unused~
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It completes the process of a dynamic import originally started by an <emu-xref href="#sec-import-calls">`import()`</emu-xref> call, resolving or rejecting the promise returned by that call as appropriate.</dd>
          </dl>
          <emu-alg>
            1. If _moduleCompletion_ is an abrupt completion, then
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _moduleCompletion_.[[Value]] »).
              1. Return ~unused~.
            1. Let _module_ be _moduleCompletion_.[[Value]].
            1. Let _loadPromise_ be _module_.LoadRequestedModules().
            1. Let _rejectedClosure_ be a new Abstract Closure with parameters (_reason_) that captures _promiseCapability_ and performs the following steps when called:
              1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _reason_ »).
              1. Return ~unused~.
            1. Let _onRejected_ be CreateBuiltinFunction(_rejectedClosure_, 1, *""*, « »).
            1. Let _linkAndEvaluateClosure_ be a new Abstract Closure with no parameters that captures _module_, _promiseCapability_, and _onRejected_ and performs the following steps when called:
              1. Let _link_ be Completion(_module_.Link()).
              1. If _link_ is an abrupt completion, then
                1. Perform ! Call(_promiseCapability_.[[Reject]], *undefined*, « _link_.[[Value]] »).
                1. Return ~unused~.
              1. Let _evaluatePromise_ be _module_.Evaluate().
              1. Let _fulfilledClosure_ be a new Abstract Closure with no parameters that captures _module_ and _promiseCapability_ and performs the following steps when called:
                1. Let _namespace_ be GetModuleNamespace(_module_).
                1. Perform ! <emu-meta effects="user-code">Call</emu-meta>(_promiseCapability_.[[Resolve]], *undefined*, « _namespace_ »).
                1. Return ~unused~.
              1. Let _onFulfilled_ be CreateBuiltinFunction(_fulfilledClosure_, 0, *""*, « »).
              1. Perform PerformPromiseThen(_evaluatePromise_, _onFulfilled_, _onRejected_).
              1. Return ~unused~.
            1. Let _linkAndEvaluate_ be CreateBuiltinFunction(_linkAndEvaluateClosure_, 0, *""*, « »).
            1. Perform PerformPromiseThen(_loadPromise_, _linkAndEvaluate_, _onRejected_).
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-tagged-templates">
      <h1>Tagged Templates</h1>
      <emu-note>
        <p>A tagged template is a function call where the arguments of the call are derived from a |TemplateLiteral| (<emu-xref href="#sec-template-literals"></emu-xref>). The actual arguments include a template object (<emu-xref href="#sec-gettemplateobject"></emu-xref>) and the values produced by evaluating the expressions embedded within the |TemplateLiteral|.</p>
      </emu-note>

      <emu-clause id="sec-tagged-templates-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>MemberExpression : MemberExpression TemplateLiteral</emu-grammar>
        <emu-alg>
          1. Let _tagRef_ be ? Evaluation of |MemberExpression|.
          1. Let _tagFunc_ be ? GetValue(_tagRef_).
          1. Let _thisCall_ be this |MemberExpression|.
          1. Let _tailCall_ be IsInTailPosition(_thisCall_).
          1. Return ? EvaluateCall(_tagFunc_, _tagRef_, |TemplateLiteral|, _tailCall_).
        </emu-alg>
        <emu-grammar>CallExpression : CallExpression TemplateLiteral</emu-grammar>
        <emu-alg>
          1. Let _tagRef_ be ? Evaluation of |CallExpression|.
          1. Let _tagFunc_ be ? GetValue(_tagRef_).
          1. Let _thisCall_ be this |CallExpression|.
          1. Let _tailCall_ be IsInTailPosition(_thisCall_).
          1. Return ? EvaluateCall(_tagFunc_, _tagRef_, |TemplateLiteral|, _tailCall_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-meta-properties">
      <h1>Meta Properties</h1>

      <emu-clause id="sec-meta-properties-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>NewTarget : `new` `.` `target`</emu-grammar>
        <emu-alg>
          1. Return GetNewTarget().
        </emu-alg>

        <emu-grammar>ImportMeta : `import` `.` `meta`</emu-grammar>
        <emu-alg>
          1. Let _module_ be GetActiveScriptOrModule().
          1. Assert: _module_ is a Source Text Module Record.
          1. Let _importMeta_ be _module_.[[ImportMeta]].
          1. If _importMeta_ is ~empty~, then
            1. Set _importMeta_ to OrdinaryObjectCreate(*null*).
            1. Let _importMetaValues_ be HostGetImportMetaProperties(_module_).
            1. For each Record { [[Key]], [[Value]] } _p_ of _importMetaValues_, do
              1. Perform ! CreateDataPropertyOrThrow(_importMeta_, _p_.[[Key]], _p_.[[Value]]).
            1. Perform HostFinalizeImportMeta(_importMeta_, _module_).
            1. Set _module_.[[ImportMeta]] to _importMeta_.
            1. Return _importMeta_.
          1. Else,
            1. Assert: _importMeta_ is an Object.
            1. Return _importMeta_.
        </emu-alg>

        <emu-clause id="sec-hostgetimportmetaproperties" type="host-defined abstract operation">
          <h1>
            HostGetImportMetaProperties (
              _moduleRecord_: a Module Record,
            ): a List of Records with fields [[Key]] (a property key) and [[Value]] (an ECMAScript language value)
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It allows hosts to provide property keys and values for the object returned from `import.meta`.</dd>
          </dl>

          <p>The default implementation of HostGetImportMetaProperties is to return a new empty List.</p>
        </emu-clause>

        <emu-clause id="sec-hostfinalizeimportmeta" type="host-defined abstract operation">
          <h1>
            HostFinalizeImportMeta (
              _importMeta_: an Object,
              _moduleRecord_: a Module Record,
            ): ~unused~
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It allows hosts to perform any extraordinary operations to prepare the object returned from `import.meta`.</dd>
          </dl>

          <p>Most hosts will be able to simply define HostGetImportMetaProperties, and leave HostFinalizeImportMeta with its default behaviour. However, HostFinalizeImportMeta provides an "escape hatch" for hosts which need to directly manipulate the object before it is exposed to ECMAScript code.</p>

          <p>The default implementation of HostFinalizeImportMeta is to return ~unused~.</p>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-update-expressions">
    <h1>Update Expressions</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      UpdateExpression[Yield, Await] :
        LeftHandSideExpression[?Yield, ?Await]
        LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] `++`
        LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] `--`
        `++` UnaryExpression[?Yield, ?Await]
        `--` UnaryExpression[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-update-expressions-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>
        UpdateExpression :
          LeftHandSideExpression `++`
          LeftHandSideExpression `--`
      </emu-grammar>
      <ul>
        <li>
          It is an early Syntax Error if the AssignmentTargetType of |LeftHandSideExpression| is not ~simple~.
        </li>
      </ul>

      <emu-grammar>
        UpdateExpression :
          `++` UnaryExpression
          `--` UnaryExpression
      </emu-grammar>
      <ul>
        <li>
          It is an early Syntax Error if the AssignmentTargetType of |UnaryExpression| is not ~simple~.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-postfix-increment-operator">
      <h1>Postfix Increment Operator</h1>

      <emu-clause id="sec-postfix-increment-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UpdateExpression : LeftHandSideExpression `++`</emu-grammar>
        <emu-alg>
          1. Let _lhs_ be ? Evaluation of |LeftHandSideExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_lhs_)).
          1. If _oldValue_ is a Number, then
            1. Let _newValue_ be Number::add(_oldValue_, *1*<sub>𝔽</sub>).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Let _newValue_ be BigInt::add(_oldValue_, *1*<sub>ℤ</sub>).
          1. Perform ? PutValue(_lhs_, _newValue_).
          1. Return _oldValue_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-postfix-decrement-operator">
      <h1>Postfix Decrement Operator</h1>

      <emu-clause id="sec-postfix-decrement-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UpdateExpression : LeftHandSideExpression `--`</emu-grammar>
        <emu-alg>
          1. Let _lhs_ be ? Evaluation of |LeftHandSideExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_lhs_)).
          1. If _oldValue_ is a Number, then
            1. Let _newValue_ be Number::subtract(_oldValue_, *1*<sub>𝔽</sub>).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Let _newValue_ be BigInt::subtract(_oldValue_, *1*<sub>ℤ</sub>).
          1. Perform ? PutValue(_lhs_, _newValue_).
          1. Return _oldValue_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-prefix-increment-operator">
      <h1>Prefix Increment Operator</h1>

      <emu-clause id="sec-prefix-increment-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UpdateExpression : `++` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_expr_)).
          1. If _oldValue_ is a Number, then
            1. Let _newValue_ be Number::add(_oldValue_, *1*<sub>𝔽</sub>).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Let _newValue_ be BigInt::add(_oldValue_, *1*<sub>ℤ</sub>).
          1. Perform ? PutValue(_expr_, _newValue_).
          1. Return _newValue_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-prefix-decrement-operator">
      <h1>Prefix Decrement Operator</h1>

      <emu-clause id="sec-prefix-decrement-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UpdateExpression : `--` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_expr_)).
          1. If _oldValue_ is a Number, then
            1. Let _newValue_ be Number::subtract(_oldValue_, *1*<sub>𝔽</sub>).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Let _newValue_ be BigInt::subtract(_oldValue_, *1*<sub>ℤ</sub>).
          1. Perform ? PutValue(_expr_, _newValue_).
          1. Return _newValue_.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-unary-operators">
    <h1>Unary Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      UnaryExpression[Yield, Await] :
        UpdateExpression[?Yield, ?Await]
        `delete` UnaryExpression[?Yield, ?Await]
        `void` UnaryExpression[?Yield, ?Await]
        `typeof` UnaryExpression[?Yield, ?Await]
        `+` UnaryExpression[?Yield, ?Await]
        `-` UnaryExpression[?Yield, ?Await]
        `~` UnaryExpression[?Yield, ?Await]
        `!` UnaryExpression[?Yield, ?Await]
        [+Await] AwaitExpression[?Yield]
    </emu-grammar>

    <emu-clause id="sec-delete-operator">
      <h1>The `delete` Operator</h1>

      <emu-clause id="sec-delete-operator-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>UnaryExpression : `delete` UnaryExpression</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsStrict(the |UnaryExpression|) is *true* and the derived |UnaryExpression| is <emu-grammar>PrimaryExpression : IdentifierReference</emu-grammar>, <emu-grammar>MemberExpression : MemberExpression `.` PrivateIdentifier</emu-grammar>, <emu-grammar>CallExpression : CallExpression `.` PrivateIdentifier</emu-grammar>, <emu-grammar>OptionalChain : `?.` PrivateIdentifier</emu-grammar>, or <emu-grammar>OptionalChain : OptionalChain `.` PrivateIdentifier</emu-grammar>.
          </li>
          <li>
            <p>
              It is a Syntax Error if the derived |UnaryExpression| is<br>
              <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar><br>
              and |CoverParenthesizedExpressionAndArrowParameterList| ultimately derives a phrase that, if used in place of |UnaryExpression|, would produce a Syntax Error according to these rules. This rule is recursively applied.
            </p>
          </li>
        </ul>
        <emu-note>
          <p>The last rule means that expressions such as `delete (((foo)))` produce early errors because of recursive application of the first rule.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-delete-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `delete` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _ref_ be ? Evaluation of |UnaryExpression|.
          1. If _ref_ is not a Reference Record, return *true*.
          1. If IsUnresolvableReference(_ref_) is *true*, then
            1. Assert: _ref_.[[Strict]] is *false*.
            1. Return *true*.
          1. If IsPropertyReference(_ref_) is *true*, then
            1. Assert: IsPrivateReference(_ref_) is *false*.
            1. If IsSuperReference(_ref_) is *true*, throw a *ReferenceError* exception.
            1. [id="step-delete-operator-toobject"] Let _baseObj_ be ? ToObject(_ref_.[[Base]]).
            1. If _ref_.[[ReferencedName]] is not a property key, then
              1. Set _ref_.[[ReferencedName]] to ? ToPropertyKey(_ref_.[[ReferencedName]]).
            1. Let _deleteStatus_ be ? <emu-meta effects="user-code">_baseObj_.[[Delete]]</emu-meta>(_ref_.[[ReferencedName]]).
            1. If _deleteStatus_ is *false* and _ref_.[[Strict]] is *true*, throw a *TypeError* exception.
            1. Return _deleteStatus_.
          1. Else,
            1. Let _base_ be _ref_.[[Base]].
            1. Assert: _base_ is an Environment Record.
            1. Return ? <emu-meta effects="user-code">_base_.DeleteBinding</emu-meta>(_ref_.[[ReferencedName]]).
        </emu-alg>
        <emu-note>
          <p>When a `delete` operator occurs within strict mode code, a *SyntaxError* exception is thrown if its |UnaryExpression| is a direct reference to a variable, function argument, or function name. In addition, if a `delete` operator occurs within strict mode code and the property to be deleted has the attribute { [[Configurable]]: *false* } (or otherwise cannot be deleted), a *TypeError* exception is thrown.</p>
        </emu-note>
        <emu-note>
          <p>The object that may be created in step <emu-xref href="#step-delete-operator-toobject"></emu-xref> is not accessible outside of the above abstract operation and the ordinary object [[Delete]] internal method. An implementation might choose to avoid the actual creation of that object.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-void-operator">
      <h1>The `void` Operator</h1>

      <emu-clause id="sec-void-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `void` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Perform ? GetValue(_expr_).
          1. Return *undefined*.
        </emu-alg>
        <emu-note>
          <p>GetValue must be called even though its value is not used because it may have observable side-effects.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-typeof-operator">
      <h1>The `typeof` Operator</h1>

      <emu-clause id="sec-typeof-operator-runtime-semantics-evaluation" oldids="table-typeof-operator-results" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `typeof` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _val_ be ? Evaluation of |UnaryExpression|.
          1. If _val_ is a Reference Record, then
            1. If IsUnresolvableReference(_val_) is *true*, return *"undefined"*.
          1. Set _val_ to ? GetValue(_val_).
          1. If _val_ is *undefined*, return *"undefined"*.
          1. If _val_ is *null*, return *"object"*.
          1. If _val_ is a String, return *"string"*.
          1. If _val_ is a Symbol, return *"symbol"*.
          1. If _val_ is a Boolean, return *"boolean"*.
          1. If _val_ is a Number, return *"number"*.
          1. If _val_ is a BigInt, return *"bigint"*.
          1. Assert: _val_ is an Object.
          1. [id="step-typeof-web-compat-insertion-point"] NOTE: This step is replaced in section <emu-xref href="#sec-IsHTMLDDA-internal-slot-typeof"></emu-xref>.
          1. If _val_ has a [[Call]] internal slot, return *"function"*.
          1. Return *"object"*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-unary-plus-operator">
      <h1>Unary `+` Operator</h1>
      <emu-note>
        <p>The unary + operator converts its operand to Number type.</p>
      </emu-note>

      <emu-clause id="sec-unary-plus-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `+` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Return ? ToNumber(? GetValue(_expr_)).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-unary-minus-operator">
      <h1>Unary `-` Operator</h1>
      <emu-note>
        <p>The unary `-` operator converts its operand to a numeric value and then negates it. Negating *+0*<sub>𝔽</sub> produces *-0*<sub>𝔽</sub>, and negating *-0*<sub>𝔽</sub> produces *+0*<sub>𝔽</sub>.</p>
      </emu-note>

      <emu-clause id="sec-unary-minus-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `-` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_expr_)).
          1. If _oldValue_ is a Number, then
            1. Return Number::unaryMinus(_oldValue_).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Return BigInt::unaryMinus(_oldValue_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-bitwise-not-operator">
      <h1>Bitwise NOT Operator ( `~` )</h1>

      <emu-clause id="sec-bitwise-not-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `~` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Let _oldValue_ be ? ToNumeric(? GetValue(_expr_)).
          1. If _oldValue_ is a Number, then
            1. Return Number::bitwiseNOT(_oldValue_).
          1. Else,
            1. Assert: _oldValue_ is a BigInt.
            1. Return BigInt::bitwiseNOT(_oldValue_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-logical-not-operator">
      <h1>Logical NOT Operator ( `!` )</h1>

      <emu-clause id="sec-logical-not-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>UnaryExpression : `!` UnaryExpression</emu-grammar>
        <emu-alg>
          1. Let _expr_ be ? Evaluation of |UnaryExpression|.
          1. Let _oldValue_ be ToBoolean(? GetValue(_expr_)).
          1. If _oldValue_ is *true*, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-exp-operator">
    <h1>Exponentiation Operator</h1>
    <h2>Syntax</h2>

    <emu-grammar type="definition">
      ExponentiationExpression[Yield, Await] :
        UnaryExpression[?Yield, ?Await]
        UpdateExpression[?Yield, ?Await] `**` ExponentiationExpression[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-exp-operator-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>
        ExponentiationExpression : UpdateExpression `**` ExponentiationExpression
      </emu-grammar>
      <emu-alg>
        1. Return ? EvaluateStringOrNumericBinaryExpression(|UpdateExpression|, `**`, |ExponentiationExpression|).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-multiplicative-operators">
    <h1>Multiplicative Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      MultiplicativeExpression[Yield, Await] :
        ExponentiationExpression[?Yield, ?Await]
        MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator ExponentiationExpression[?Yield, ?Await]

      MultiplicativeOperator : one of
        `*` `/` `%`
    </emu-grammar>
    <emu-note>
      <ul>
        <li>The `*` operator performs multiplication, producing the product of its operands.</li>
        <li>The `/` operator performs division, producing the quotient of its operands.</li>
        <li>The `%` operator yields the remainder of its operands from an implied division.</li>
      </ul>
    </emu-note>

    <emu-clause id="sec-multiplicative-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>MultiplicativeExpression : MultiplicativeExpression MultiplicativeOperator ExponentiationExpression</emu-grammar>
      <emu-alg>
        1. Let _opText_ be the source text matched by |MultiplicativeOperator|.
        1. Return ? EvaluateStringOrNumericBinaryExpression(|MultiplicativeExpression|, _opText_, |ExponentiationExpression|).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-additive-operators">
    <h1>Additive Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      AdditiveExpression[Yield, Await] :
        MultiplicativeExpression[?Yield, ?Await]
        AdditiveExpression[?Yield, ?Await] `+` MultiplicativeExpression[?Yield, ?Await]
        AdditiveExpression[?Yield, ?Await] `-` MultiplicativeExpression[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-addition-operator-plus">
      <h1>The Addition Operator ( `+` )</h1>
      <emu-note>
        <p>The addition operator either performs string concatenation or numeric addition.</p>
      </emu-note>

      <emu-clause id="sec-addition-operator-plus-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>AdditiveExpression : AdditiveExpression `+` MultiplicativeExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateStringOrNumericBinaryExpression(|AdditiveExpression|, `+`, |MultiplicativeExpression|).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-subtraction-operator-minus">
      <h1>The Subtraction Operator ( `-` )</h1>
      <emu-note>
        <p>The `-` operator performs subtraction, producing the difference of its operands.</p>
      </emu-note>

      <emu-clause id="sec-subtraction-operator-minus-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>AdditiveExpression : AdditiveExpression `-` MultiplicativeExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateStringOrNumericBinaryExpression(|AdditiveExpression|, `-`, |MultiplicativeExpression|).
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-bitwise-shift-operators">
    <h1>Bitwise Shift Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ShiftExpression[Yield, Await] :
        AdditiveExpression[?Yield, ?Await]
        ShiftExpression[?Yield, ?Await] `&lt;&lt;` AdditiveExpression[?Yield, ?Await]
        ShiftExpression[?Yield, ?Await] `&gt;&gt;` AdditiveExpression[?Yield, ?Await]
        ShiftExpression[?Yield, ?Await] `&gt;&gt;&gt;` AdditiveExpression[?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-left-shift-operator">
      <h1>The Left Shift Operator ( `&lt;&lt;` )</h1>
      <emu-note>
        <p>Performs a bitwise left shift operation on the left operand by the amount specified by the right operand.</p>
      </emu-note>

      <emu-clause id="sec-left-shift-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>ShiftExpression : ShiftExpression `&lt;&lt;` AdditiveExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateStringOrNumericBinaryExpression(|ShiftExpression|, `&lt;&lt;`, |AdditiveExpression|).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-signed-right-shift-operator">
      <h1>The Signed Right Shift Operator ( `>>` )</h1>
      <emu-note>
        <p>Performs a sign-filling bitwise right shift operation on the left operand by the amount specified by the right operand.</p>
      </emu-note>

      <emu-clause id="sec-signed-right-shift-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>ShiftExpression : ShiftExpression `&gt;&gt;` AdditiveExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateStringOrNumericBinaryExpression(|ShiftExpression|, `>>`, |AdditiveExpression|).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-unsigned-right-shift-operator">
      <h1>The Unsigned Right Shift Operator ( `>>>` )</h1>
      <emu-note>
        <p>Performs a zero-filling bitwise right shift operation on the left operand by the amount specified by the right operand.</p>
      </emu-note>

      <emu-clause id="sec-unsigned-right-shift-operator-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>ShiftExpression : ShiftExpression `&gt;&gt;&gt;` AdditiveExpression</emu-grammar>
        <emu-alg>
          1. Return ? EvaluateStringOrNumericBinaryExpression(|ShiftExpression|, `>>>`, |AdditiveExpression|).
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-relational-operators">
    <h1>Relational Operators</h1>
    <emu-note>
      <p>The result of evaluating a relational operator is always of type Boolean, reflecting whether the relationship named by the operator holds between its two operands.</p>
    </emu-note>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      RelationalExpression[In, Yield, Await] :
        ShiftExpression[?Yield, ?Await]
        RelationalExpression[?In, ?Yield, ?Await] `&lt;` ShiftExpression[?Yield, ?Await]
        RelationalExpression[?In, ?Yield, ?Await] `&gt;` ShiftExpression[?Yield, ?Await]
        RelationalExpression[?In, ?Yield, ?Await] `&lt;=` ShiftExpression[?Yield, ?Await]
        RelationalExpression[?In, ?Yield, ?Await] `&gt;=` ShiftExpression[?Yield, ?Await]
        RelationalExpression[?In, ?Yield, ?Await] `instanceof` ShiftExpression[?Yield, ?Await]
        [+In] RelationalExpression[+In, ?Yield, ?Await] `in` ShiftExpression[?Yield, ?Await]
        [+In] PrivateIdentifier `in` ShiftExpression[?Yield, ?Await]
    </emu-grammar>
    <emu-note>
      <p>The <sub>[In]</sub> grammar parameter is needed to avoid confusing the `in` operator in a relational expression with the `in` operator in a `for` statement.</p>
    </emu-note>

    <emu-clause id="sec-relational-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>RelationalExpression : RelationalExpression `&lt;` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be ? IsLessThan(_lVal_, _rVal_, *true*).
        1. If _r_ is *undefined*, return *false*. Otherwise, return _r_.
      </emu-alg>
      <emu-grammar>RelationalExpression : RelationalExpression `&gt;` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be ? IsLessThan(_rVal_, _lVal_, *false*).
        1. If _r_ is *undefined*, return *false*. Otherwise, return _r_.
      </emu-alg>
      <emu-grammar>RelationalExpression : RelationalExpression `&lt;=` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be ? IsLessThan(_rVal_, _lVal_, *false*).
        1. If _r_ is either *true* or *undefined*, return *false*. Otherwise, return *true*.
      </emu-alg>
      <emu-grammar>RelationalExpression : RelationalExpression `&gt;=` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be ? IsLessThan(_lVal_, _rVal_, *true*).
        1. If _r_ is either *true* or *undefined*, return *false*. Otherwise, return *true*.
      </emu-alg>
      <emu-grammar>RelationalExpression : RelationalExpression `instanceof` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Return ? InstanceofOperator(_lVal_, _rVal_).
      </emu-alg>
      <emu-grammar>RelationalExpression : RelationalExpression `in` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. If _rVal_ is not an Object, throw a *TypeError* exception.
        1. Return ? HasProperty(_rVal_, ? ToPropertyKey(_lVal_)).
      </emu-alg>
      <emu-grammar>RelationalExpression : PrivateIdentifier `in` ShiftExpression</emu-grammar>
      <emu-alg>
        1. Let _privateIdentifier_ be the StringValue of |PrivateIdentifier|.
        1. Let _rRef_ be ? Evaluation of |ShiftExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. If _rVal_ is not an Object, throw a *TypeError* exception.
        1. Let _privateEnv_ be the running execution context's PrivateEnvironment.
        1. Assert: _privateEnv_ is not *null*.
        1. Let _privateName_ be ResolvePrivateIdentifier(_privateEnv_, _privateIdentifier_).
        1. If PrivateElementFind(_rVal_, _privateName_) is not ~empty~, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-instanceofoperator" type="abstract operation">
      <h1>
        InstanceofOperator (
          _V_: an ECMAScript language value,
          _target_: an ECMAScript language value,
        ): either a normal completion containing a Boolean or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It implements the generic algorithm for determining if _V_ is an instance of _target_ either by consulting _target_'s %Symbol.hasInstance% method or, if absent, determining whether the value of _target_'s *"prototype"* property is present in _V_'s prototype chain.</dd>
      </dl>
      <emu-alg>
        1. If _target_ is not an Object, throw a *TypeError* exception.
        1. Let _instOfHandler_ be ? GetMethod(_target_, %Symbol.hasInstance%).
        1. If _instOfHandler_ is not *undefined*, then
          1. Return ToBoolean(? Call(_instOfHandler_, _target_, « _V_ »)).
        1. [id="step-instanceof-check-function"] If IsCallable(_target_) is *false*, throw a *TypeError* exception.
        1. [id="step-instanceof-fallback"] Return ? OrdinaryHasInstance(_target_, _V_).
      </emu-alg>
      <emu-note>
        <p>Steps <emu-xref href="#step-instanceof-check-function"></emu-xref> and <emu-xref href="#step-instanceof-fallback"></emu-xref> provide compatibility with previous editions of ECMAScript that did not use a %Symbol.hasInstance% method to define the `instanceof` operator semantics. If an object does not define or inherit %Symbol.hasInstance% it uses the default `instanceof` semantics.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-equality-operators">
    <h1>Equality Operators</h1>
    <emu-note>
      <p>The result of evaluating an equality operator is always of type Boolean, reflecting whether the relationship named by the operator holds between its two operands.</p>
    </emu-note>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      EqualityExpression[In, Yield, Await] :
        RelationalExpression[?In, ?Yield, ?Await]
        EqualityExpression[?In, ?Yield, ?Await] `==` RelationalExpression[?In, ?Yield, ?Await]
        EqualityExpression[?In, ?Yield, ?Await] `!=` RelationalExpression[?In, ?Yield, ?Await]
        EqualityExpression[?In, ?Yield, ?Await] `===` RelationalExpression[?In, ?Yield, ?Await]
        EqualityExpression[?In, ?Yield, ?Await] `!==` RelationalExpression[?In, ?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-equality-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>EqualityExpression : EqualityExpression `==` RelationalExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |EqualityExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Return ? IsLooselyEqual(_rVal_, _lVal_).
      </emu-alg>
      <emu-grammar>EqualityExpression : EqualityExpression `!=` RelationalExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |EqualityExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be ? IsLooselyEqual(_rVal_, _lVal_).
        1. If _r_ is *true*, return *false*. Otherwise, return *true*.
      </emu-alg>
      <emu-grammar>EqualityExpression : EqualityExpression `===` RelationalExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |EqualityExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Return IsStrictlyEqual(_rVal_, _lVal_).
      </emu-alg>
      <emu-grammar>EqualityExpression : EqualityExpression `!==` RelationalExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |EqualityExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |RelationalExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _r_ be IsStrictlyEqual(_rVal_, _lVal_).
        1. If _r_ is *true*, return *false*. Otherwise, return *true*.
      </emu-alg>
      <emu-note>
        <p>Given the above definition of equality:</p>
        <ul>
          <li>
            String comparison can be forced by: `\`${a}\` == \`${b}\``.
          </li>
          <li>
            Numeric comparison can be forced by: `+a == +b`.
          </li>
          <li>
            Boolean comparison can be forced by: `!a == !b`.
          </li>
        </ul>
      </emu-note>
      <emu-note>
        <p>The equality operators maintain the following invariants:</p>
        <ul>
          <li>
            `A != B` is equivalent to `!(A == B)`.
          </li>
          <li>
            `A == B` is equivalent to `B == A`, except in the order of evaluation of `A` and `B`.
          </li>
        </ul>
      </emu-note>
      <emu-note>
        <p>The equality operator is not always transitive. For example, there might be two distinct String objects, each representing the same String value; each String object would be considered equal to the String value by the `==` operator, but the two String objects would not be equal to each other. For example:</p>
        <ul>
          <li>
            `new String("a") == "a"` and `"a" == new String("a")` are both *true*.
          </li>
          <li>
            `new String("a") == new String("a")` is *false*.
          </li>
        </ul>
      </emu-note>
      <emu-note>
        <p>Comparison of Strings uses a simple equality test on sequences of code unit values. There is no attempt to use the more complex, semantically oriented definitions of character or string equality and collating order defined in the Unicode specification. Therefore Strings values that are canonically equal according to the Unicode Standard could test as unequal. In effect this algorithm assumes that both Strings are already in normalized form.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-binary-bitwise-operators">
    <h1>Binary Bitwise Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      BitwiseANDExpression[In, Yield, Await] :
        EqualityExpression[?In, ?Yield, ?Await]
        BitwiseANDExpression[?In, ?Yield, ?Await] `&amp;` EqualityExpression[?In, ?Yield, ?Await]

      BitwiseXORExpression[In, Yield, Await] :
        BitwiseANDExpression[?In, ?Yield, ?Await]
        BitwiseXORExpression[?In, ?Yield, ?Await] `^` BitwiseANDExpression[?In, ?Yield, ?Await]

      BitwiseORExpression[In, Yield, Await] :
        BitwiseXORExpression[?In, ?Yield, ?Await]
        BitwiseORExpression[?In, ?Yield, ?Await] `|` BitwiseXORExpression[?In, ?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-binary-bitwise-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>BitwiseANDExpression : BitwiseANDExpression `&amp;` EqualityExpression</emu-grammar>
      <emu-alg>
        1. Return ? EvaluateStringOrNumericBinaryExpression(|BitwiseANDExpression|, `&amp;`, |EqualityExpression|).
      </emu-alg>
      <emu-grammar>BitwiseXORExpression : BitwiseXORExpression `^` BitwiseANDExpression</emu-grammar>
      <emu-alg>
        1. Return ? EvaluateStringOrNumericBinaryExpression(|BitwiseXORExpression|, `^`, |BitwiseANDExpression|).
      </emu-alg>
      <emu-grammar>BitwiseORExpression : BitwiseORExpression `|` BitwiseXORExpression</emu-grammar>
      <emu-alg>
        1. Return ? EvaluateStringOrNumericBinaryExpression(|BitwiseORExpression|, `|`, |BitwiseXORExpression|).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-binary-logical-operators">
    <h1>Binary Logical Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      LogicalANDExpression[In, Yield, Await] :
        BitwiseORExpression[?In, ?Yield, ?Await]
        LogicalANDExpression[?In, ?Yield, ?Await] `&amp;&amp;` BitwiseORExpression[?In, ?Yield, ?Await]

      LogicalORExpression[In, Yield, Await] :
        LogicalANDExpression[?In, ?Yield, ?Await]
        LogicalORExpression[?In, ?Yield, ?Await] `||` LogicalANDExpression[?In, ?Yield, ?Await]

      CoalesceExpression[In, Yield, Await] :
        CoalesceExpressionHead[?In, ?Yield, ?Await] `??` BitwiseORExpression[?In, ?Yield, ?Await]

      CoalesceExpressionHead[In, Yield, Await] :
        CoalesceExpression[?In, ?Yield, ?Await]
        BitwiseORExpression[?In, ?Yield, ?Await]

      ShortCircuitExpression[In, Yield, Await] :
        LogicalORExpression[?In, ?Yield, ?Await]
        CoalesceExpression[?In, ?Yield, ?Await]
    </emu-grammar>
    <emu-note>
      <p>The value produced by a `&amp;&amp;` or `||` operator is not necessarily of type Boolean. The value produced will always be the value of one of the two operand expressions.</p>
    </emu-note>

    <emu-clause id="sec-binary-logical-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>LogicalANDExpression : LogicalANDExpression `&amp;&amp;` BitwiseORExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LogicalANDExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. If ToBoolean(_lVal_) is *false*, return _lVal_.
        1. Let _rRef_ be ? Evaluation of |BitwiseORExpression|.
        1. Return ? GetValue(_rRef_).
      </emu-alg>
      <emu-grammar>LogicalORExpression : LogicalORExpression `||` LogicalANDExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LogicalORExpression|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. If ToBoolean(_lVal_) is *true*, return _lVal_.
        1. Let _rRef_ be ? Evaluation of |LogicalANDExpression|.
        1. Return ? GetValue(_rRef_).
      </emu-alg>
      <emu-grammar>CoalesceExpression : CoalesceExpressionHead `??` BitwiseORExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |CoalesceExpressionHead|.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. If _lVal_ is either *undefined* or *null*, then
          1. Let _rRef_ be ? Evaluation of |BitwiseORExpression|.
          1. Return ? GetValue(_rRef_).
        1. Else,
          1. Return _lVal_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-conditional-operator">
    <h1>Conditional Operator ( `? :` )</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      ConditionalExpression[In, Yield, Await] :
        ShortCircuitExpression[?In, ?Yield, ?Await]
        ShortCircuitExpression[?In, ?Yield, ?Await] `?` AssignmentExpression[+In, ?Yield, ?Await] `:` AssignmentExpression[?In, ?Yield, ?Await]
    </emu-grammar>
    <emu-note>
      <p>The grammar for a |ConditionalExpression| in ECMAScript is slightly different from that in C and Java, which each allow the second subexpression to be an |Expression| but restrict the third expression to be a |ConditionalExpression|. The motivation for this difference in ECMAScript is to allow an assignment expression to be governed by either arm of a conditional and to eliminate the confusing and fairly useless case of a comma expression as the centre expression.</p>
    </emu-note>

    <emu-clause id="sec-conditional-operator-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>ConditionalExpression : ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |ShortCircuitExpression|.
        1. Let _lVal_ be ToBoolean(? GetValue(_lRef_)).
        1. If _lVal_ is *true*, then
          1. Let _trueRef_ be ? Evaluation of the first |AssignmentExpression|.
          1. Return ? GetValue(_trueRef_).
        1. Else,
          1. Let _falseRef_ be ? Evaluation of the second |AssignmentExpression|.
          1. Return ? GetValue(_falseRef_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-assignment-operators">
    <h1>Assignment Operators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      AssignmentExpression[In, Yield, Await] :
        ConditionalExpression[?In, ?Yield, ?Await]
        [+Yield] YieldExpression[?In, ?Await]
        ArrowFunction[?In, ?Yield, ?Await]
        AsyncArrowFunction[?In, ?Yield, ?Await]
        LeftHandSideExpression[?Yield, ?Await] `=` AssignmentExpression[?In, ?Yield, ?Await] #assignment
        LeftHandSideExpression[?Yield, ?Await] AssignmentOperator AssignmentExpression[?In, ?Yield, ?Await]
        LeftHandSideExpression[?Yield, ?Await] `&amp;&amp;=` AssignmentExpression[?In, ?Yield, ?Await]
        LeftHandSideExpression[?Yield, ?Await] `||=` AssignmentExpression[?In, ?Yield, ?Await]
        LeftHandSideExpression[?Yield, ?Await] `??=` AssignmentExpression[?In, ?Yield, ?Await]

      // emu-format ignore
      AssignmentOperator : one of
        `*=` `/=` `%=` `+=` `-=` `&lt;&lt;=` `&gt;&gt;=` `&gt;&gt;&gt;=` `&amp;=` `^=` `|=` `**=`
    </emu-grammar>

    <emu-clause id="sec-assignment-operators-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression</emu-grammar>
      <ul>
        <li>
          If |LeftHandSideExpression| is either an |ObjectLiteral| or an |ArrayLiteral|, |LeftHandSideExpression| must cover an |AssignmentPattern|.
        </li>
        <li>
          If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, it is a Syntax Error if the AssignmentTargetType of |LeftHandSideExpression| is not ~simple~.
        </li>
      </ul>
      <emu-grammar>
        AssignmentExpression :
          LeftHandSideExpression AssignmentOperator AssignmentExpression
          LeftHandSideExpression `&amp;&amp;=` AssignmentExpression
          LeftHandSideExpression `||=` AssignmentExpression
          LeftHandSideExpression `??=` AssignmentExpression
      </emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the AssignmentTargetType of |LeftHandSideExpression| is not ~simple~.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-assignment-operators-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
          1. Let _lRef_ be ? Evaluation of |LeftHandSideExpression|.
          1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
            1. Let _lhs_ be the StringValue of |LeftHandSideExpression|.
            1. Let _rVal_ be ? NamedEvaluation of |AssignmentExpression| with argument _lhs_.
          1. Else,
            1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
            1. Let _rVal_ be ? GetValue(_rRef_).
          1. [id="step-assignmentexpression-evaluation-simple-putvalue"] Perform ? PutValue(_lRef_, _rVal_).
          1. Return _rVal_.
        1. Let _assignmentPattern_ be the |AssignmentPattern| that is covered by |LeftHandSideExpression|.
        1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Perform ? DestructuringAssignmentEvaluation of _assignmentPattern_ with argument _rVal_.
        1. Return _rVal_.
      </emu-alg>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression AssignmentOperator AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LeftHandSideExpression|.
        1. [id="step-assignmentexpression-evaluation-compound-getvalue"] Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Let _assignmentOpText_ be the source text matched by |AssignmentOperator|.
        1. Let _opText_ be the sequence of Unicode code points associated with _assignmentOpText_ in the following table:
          <figure>
            <!-- emu-format ignore -->
            <table class="lightweight-table">
              <thead>
                <tr><th> _assignmentOpText_ </th><th> _opText_       </th></tr>
              </thead>
              <tr><td> `**=`              </td><td> `**`           </td></tr>
              <tr><td> `*=`               </td><td> `*`            </td></tr>
              <tr><td> `/=`               </td><td> `/`            </td></tr>
              <tr><td> `%=`               </td><td> `%`            </td></tr>
              <tr><td> `+=`               </td><td> `+`            </td></tr>
              <tr><td> `-=`               </td><td> `-`            </td></tr>
              <tr><td> `&lt;&lt;=`        </td><td> `&lt;&lt;`     </td></tr>
              <tr><td> `&gt;&gt;=`        </td><td> `&gt;&gt;`     </td></tr>
              <tr><td> `&gt;&gt;&gt;=`    </td><td> `&gt;&gt;&gt;` </td></tr>
              <tr><td> `&amp;=`           </td><td> `&amp;`        </td></tr>
              <tr><td> `^=`               </td><td> `^`            </td></tr>
              <tr><td> `|=`               </td><td> `|`            </td></tr>
            </table>
          </figure>
        1. Let _r_ be ? ApplyStringOrNumericBinaryOperator(_lVal_, _opText_, _rVal_).
        1. [id="step-assignmentexpression-evaluation-compound-putvalue"] Perform ? PutValue(_lRef_, _r_).
        1. Return _r_.
      </emu-alg>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression `&amp;&amp;=` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LeftHandSideExpression|.
        1. [id="step-assignmentexpression-evaluation-lgcl-and-getvalue"] Let _lVal_ be ? GetValue(_lRef_).
        1. If ToBoolean(_lVal_) is *false*, return _lVal_.
        1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
          1. Let _lhs_ be the StringValue of |LeftHandSideExpression|.
          1. Let _rVal_ be ? NamedEvaluation of |AssignmentExpression| with argument _lhs_.
        1. Else,
          1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _rVal_ be ? GetValue(_rRef_).
        1. [id="step-assignmentexpression-evaluation-lgcl-and-putvalue"] Perform ? PutValue(_lRef_, _rVal_).
        1. Return _rVal_.
      </emu-alg>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LeftHandSideExpression|.
        1. [id="step-assignmentexpression-evaluation-lgcl-or-getvalue"] Let _lVal_ be ? GetValue(_lRef_).
        1. If ToBoolean(_lVal_) is *true*, return _lVal_.
        1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
          1. Let _lhs_ be the StringValue of |LeftHandSideExpression|.
          1. Let _rVal_ be ? NamedEvaluation of |AssignmentExpression| with argument _lhs_.
        1. Else,
          1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _rVal_ be ? GetValue(_rRef_).
        1. [id="step-assignmentexpression-evaluation-lgcl-or-putvalue"] Perform ? PutValue(_lRef_, _rVal_).
        1. Return _rVal_.
      </emu-alg>
      <emu-grammar>AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |LeftHandSideExpression|.
        1. [id="step-assignmentexpression-evaluation-lgcl-nullish-getvalue"] Let _lVal_ be ? GetValue(_lRef_).
        1. If _lVal_ is neither *undefined* nor *null*, return _lVal_.
        1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
          1. Let _lhs_ be the StringValue of |LeftHandSideExpression|.
          1. Let _rVal_ be ? NamedEvaluation of |AssignmentExpression| with argument _lhs_.
        1. Else,
          1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
          1. Let _rVal_ be ? GetValue(_rRef_).
        1. [id="step-assignmentexpression-evaluation-lgcl-nullish-putvalue"] Perform ? PutValue(_lRef_, _rVal_).
        1. Return _rVal_.
      </emu-alg>
      <emu-note>
        <p>When this expression occurs within strict mode code, it is a runtime error if _lRef_ in step <emu-xref href="#step-assignmentexpression-evaluation-simple-putvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-compound-getvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-and-getvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-or-getvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-nullish-getvalue"></emu-xref> is an unresolvable reference. If it is, a *ReferenceError* exception is thrown. Additionally, it is a runtime error if the _lRef_ in step <emu-xref href="#step-assignmentexpression-evaluation-compound-putvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-and-putvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-or-putvalue"></emu-xref>, <emu-xref href="#step-assignmentexpression-evaluation-lgcl-nullish-putvalue"></emu-xref> is a reference to a data property with the attribute value { [[Writable]]: *false* }, to an accessor property with the attribute value { [[Set]]: *undefined* }, or to a non-existent property of an object for which the IsExtensible predicate returns the value *false*. In these cases a *TypeError* exception is thrown.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-applystringornumericbinaryoperator" type="abstract operation">
      <h1>
        ApplyStringOrNumericBinaryOperator (
          _lVal_: an ECMAScript language value,
          _opText_: `**`, `*`, `/`, `%`, `+`, `-`, `&lt;&lt;`, `&gt;&gt;`, `&gt;&gt;&gt;`, `&amp;`, `^`, or `|`,
          _rVal_: an ECMAScript language value,
        ): either a normal completion containing either a String, a BigInt, or a Number, or a throw completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _opText_ is `+`, then
          1. [id="step-binary-op-toprimitive-lval"] Let _lPrim_ be ? ToPrimitive(_lVal_).
          1. [id="step-binary-op-toprimitive-rval"] Let _rPrim_ be ? ToPrimitive(_rVal_).
          1. [id="step-binary-op-string-check"] If _lPrim_ is a String or _rPrim_ is a String, then
            1. Let _lStr_ be ? ToString(_lPrim_).
            1. Let _rStr_ be ? ToString(_rPrim_).
            1. Return the string-concatenation of _lStr_ and _rStr_.
          1. Set _lVal_ to _lPrim_.
          1. Set _rVal_ to _rPrim_.
        1. NOTE: At this point, it must be a numeric operation.
        1. Let _lNum_ be ? ToNumeric(_lVal_).
        1. Let _rNum_ be ? ToNumeric(_rVal_).
        1. If SameType(_lNum_, _rNum_) is *false*, throw a *TypeError* exception.
        1. If _lNum_ is a BigInt, then
          1. If _opText_ is `**`, return ? BigInt::exponentiate(_lNum_, _rNum_).
          1. If _opText_ is `/`, return ? BigInt::divide(_lNum_, _rNum_).
          1. If _opText_ is `%`, return ? BigInt::remainder(_lNum_, _rNum_).
          1. If _opText_ is `>>>`, return ? BigInt::unsignedRightShift(_lNum_, _rNum_).
          1. Let _operation_ be the abstract operation associated with _opText_ in the following table:
            <figure>
              <!-- emu-format ignore -->
              <table class="lightweight-table">
                <thead>
                  <tr><th> _opText_   </th><th> _operation_              </th></tr>
                </thead>
                <tbody>
                  <tr><td> `*`        </td><td> BigInt::multiply         </td></tr>
                  <tr><td> `+`        </td><td> BigInt::add              </td></tr>
                  <tr><td> `-`        </td><td> BigInt::subtract         </td></tr>
                  <tr><td> `&lt;&lt;` </td><td> BigInt::leftShift        </td></tr>
                  <tr><td> `&gt;&gt;` </td><td> BigInt::signedRightShift </td></tr>
                  <tr><td> `&amp;`    </td><td> BigInt::bitwiseAND       </td></tr>
                  <tr><td> `^`        </td><td> BigInt::bitwiseXOR       </td></tr>
                  <tr><td> `|`        </td><td> BigInt::bitwiseOR        </td></tr>
                </tbody>
              </table>
            </figure>
        1. Else,
          1. Assert: _lNum_ is a Number.
          1. Let _operation_ be the abstract operation associated with _opText_ in the following table:
            <figure>
              <!-- emu-format ignore -->
              <table class="lightweight-table">
                <thead>
                  <tr><th> _opText_       </th><th> _operation_                </th></tr>
                </thead>
                <tbody>
                  <tr><td> `**`           </td><td> Number::exponentiate       </td></tr>
                  <tr><td> `*`            </td><td> Number::multiply           </td></tr>
                  <tr><td> `/`            </td><td> Number::divide             </td></tr>
                  <tr><td> `%`            </td><td> Number::remainder          </td></tr>
                  <tr><td> `+`            </td><td> Number::add                </td></tr>
                  <tr><td> `-`            </td><td> Number::subtract           </td></tr>
                  <tr><td> `&lt;&lt;`     </td><td> Number::leftShift          </td></tr>
                  <tr><td> `&gt;&gt;`     </td><td> Number::signedRightShift   </td></tr>
                  <tr><td> `&gt;&gt;&gt;` </td><td> Number::unsignedRightShift </td></tr>
                  <tr><td> `&amp;`        </td><td> Number::bitwiseAND         </td></tr>
                  <tr><td> `^`            </td><td> Number::bitwiseXOR         </td></tr>
                  <tr><td> `|`            </td><td> Number::bitwiseOR          </td></tr>
                </tbody>
              </table>
            </figure>
        1. Return _operation_(_lNum_, _rNum_).
      </emu-alg>
      <emu-note>
        <p>No hint is provided in the calls to ToPrimitive in steps <emu-xref href="#step-binary-op-toprimitive-lval"></emu-xref> and <emu-xref href="#step-binary-op-toprimitive-rval"></emu-xref>. All standard objects except Dates handle the absence of a hint as if ~number~ were given; Dates handle the absence of a hint as if ~string~ were given. Exotic objects may handle the absence of a hint in some other manner.</p>
      </emu-note>
      <emu-note>
        <p>Step <emu-xref href="#step-binary-op-string-check"></emu-xref> differs from step <emu-xref href="#step-arc-string-check"></emu-xref> of the IsLessThan algorithm, by using the logical-or operation instead of the logical-and operation.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-evaluatestringornumericbinaryexpression" type="abstract operation">
      <h1>
        EvaluateStringOrNumericBinaryExpression (
          _leftOperand_: a Parse Node,
          _opText_: a sequence of Unicode code points,
          _rightOperand_: a Parse Node,
        ): either a normal completion containing either a String, a BigInt, or a Number, or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of _leftOperand_.
        1. Let _lVal_ be ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of _rightOperand_.
        1. Let _rVal_ be ? GetValue(_rRef_).
        1. Return ? ApplyStringOrNumericBinaryOperator(_lVal_, _opText_, _rVal_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-destructuring-assignment">
      <h1>Destructuring Assignment</h1>
      <h2>Supplemental Syntax</h2>
      <p>
        In certain circumstances when processing an instance of the production<br>
        <emu-grammar>AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression</emu-grammar><br>
        the interpretation of |LeftHandSideExpression| is refined using the following grammar:
      </p>
      <emu-grammar type="definition">
        AssignmentPattern[Yield, Await] :
          ObjectAssignmentPattern[?Yield, ?Await]
          ArrayAssignmentPattern[?Yield, ?Await]

        ObjectAssignmentPattern[Yield, Await] :
          `{` `}`
          `{` AssignmentRestProperty[?Yield, ?Await] `}`
          `{` AssignmentPropertyList[?Yield, ?Await] `}`
          `{` AssignmentPropertyList[?Yield, ?Await] `,` AssignmentRestProperty[?Yield, ?Await]? `}`

        ArrayAssignmentPattern[Yield, Await] :
          `[` Elision? AssignmentRestElement[?Yield, ?Await]? `]`
          `[` AssignmentElementList[?Yield, ?Await] `]`
          `[` AssignmentElementList[?Yield, ?Await] `,` Elision? AssignmentRestElement[?Yield, ?Await]? `]`

        AssignmentRestProperty[Yield, Await] :
          `...` DestructuringAssignmentTarget[?Yield, ?Await]

        AssignmentPropertyList[Yield, Await] :
          AssignmentProperty[?Yield, ?Await]
          AssignmentPropertyList[?Yield, ?Await] `,` AssignmentProperty[?Yield, ?Await]

        AssignmentElementList[Yield, Await] :
          AssignmentElisionElement[?Yield, ?Await]
          AssignmentElementList[?Yield, ?Await] `,` AssignmentElisionElement[?Yield, ?Await]

        AssignmentElisionElement[Yield, Await] :
          Elision? AssignmentElement[?Yield, ?Await]

        AssignmentProperty[Yield, Await] :
          IdentifierReference[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]?
          PropertyName[?Yield, ?Await] `:` AssignmentElement[?Yield, ?Await]

        AssignmentElement[Yield, Await] :
          DestructuringAssignmentTarget[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]?

        AssignmentRestElement[Yield, Await] :
          `...` DestructuringAssignmentTarget[?Yield, ?Await]

        DestructuringAssignmentTarget[Yield, Await] :
          LeftHandSideExpression[?Yield, ?Await]
      </emu-grammar>

      <emu-clause id="sec-destructuring-assignment-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>AssignmentProperty : IdentifierReference Initializer?</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the AssignmentTargetType of |IdentifierReference| is not ~simple~.
          </li>
        </ul>
        <emu-grammar>AssignmentRestProperty : `...` DestructuringAssignmentTarget</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if |DestructuringAssignmentTarget| is either an |ArrayLiteral| or an |ObjectLiteral|.
          </li>
        </ul>
        <emu-grammar>DestructuringAssignmentTarget : LeftHandSideExpression</emu-grammar>
        <ul>
          <li>
            If |LeftHandSideExpression| is either an |ObjectLiteral| or an |ArrayLiteral|, |LeftHandSideExpression| must cover an |AssignmentPattern|.
          </li>
          <li>
            If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, it is a Syntax Error if the AssignmentTargetType of |LeftHandSideExpression| is not ~simple~.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-destructuringassignmentevaluation" type="sdo">
        <h1>
          Runtime Semantics: DestructuringAssignmentEvaluation (
            _value_: an ECMAScript language value,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ObjectAssignmentPattern : `{` `}`</emu-grammar>
        <emu-alg>
          1. Perform ? RequireObjectCoercible(_value_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>
          ObjectAssignmentPattern :
            `{` AssignmentPropertyList `}`
            `{` AssignmentPropertyList `,` `}`
        </emu-grammar>
        <emu-alg>
          1. Perform ? RequireObjectCoercible(_value_).
          1. Perform ? PropertyDestructuringAssignmentEvaluation of |AssignmentPropertyList| with argument _value_.
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>ObjectAssignmentPattern : `{` AssignmentRestProperty `}`</emu-grammar>
        <emu-alg>
          1. Perform ? RequireObjectCoercible(_value_).
          1. Let _excludedNames_ be a new empty List.
          1. Return ? RestDestructuringAssignmentEvaluation of |AssignmentRestProperty| with arguments _value_ and _excludedNames_.
        </emu-alg>
        <emu-grammar>ObjectAssignmentPattern : `{` AssignmentPropertyList `,` AssignmentRestProperty `}`</emu-grammar>
        <emu-alg>
          1. Perform ? RequireObjectCoercible(_value_).
          1. Let _excludedNames_ be ? PropertyDestructuringAssignmentEvaluation of |AssignmentPropertyList| with argument _value_.
          1. Return ? RestDestructuringAssignmentEvaluation of |AssignmentRestProperty| with arguments _value_ and _excludedNames_.
        </emu-alg>
        <emu-grammar>ArrayAssignmentPattern : `[` `]`</emu-grammar>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
          1. Return ? IteratorClose(_iteratorRecord_, NormalCompletion(~unused~)).
        </emu-alg>
        <emu-grammar>ArrayAssignmentPattern : `[` Elision `]`</emu-grammar>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
          1. Let _result_ be Completion(IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_).
          1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _result_).
          1. Return _result_.
        </emu-alg>
        <emu-grammar>ArrayAssignmentPattern : `[` Elision? AssignmentRestElement `]`</emu-grammar>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
          1. If |Elision| is present, then
            1. Let _status_ be Completion(IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_).
            1. If _status_ is an abrupt completion, then
              1. Assert: _iteratorRecord_.[[Done]] is *true*.
              1. Return ? _status_.
          1. Let _result_ be Completion(IteratorDestructuringAssignmentEvaluation of |AssignmentRestElement| with argument _iteratorRecord_).
          1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _result_).
          1. Return _result_.
        </emu-alg>
        <emu-grammar>ArrayAssignmentPattern : `[` AssignmentElementList `]`</emu-grammar>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
          1. Let _result_ be Completion(IteratorDestructuringAssignmentEvaluation of |AssignmentElementList| with argument _iteratorRecord_).
          1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _result_).
          1. Return _result_.
        </emu-alg>
        <emu-grammar>ArrayAssignmentPattern : `[` AssignmentElementList `,` Elision? AssignmentRestElement? `]`</emu-grammar>
        <emu-alg>
          1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
          1. Let _status_ be Completion(IteratorDestructuringAssignmentEvaluation of |AssignmentElementList| with argument _iteratorRecord_).
          1. If _status_ is an abrupt completion, then
            1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _status_).
            1. Return ? _status_.
          1. If |Elision| is present, then
            1. Set _status_ to Completion(IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_).
            1. If _status_ is an abrupt completion, then
              1. Assert: _iteratorRecord_.[[Done]] is *true*.
              1. Return ? _status_.
          1. If |AssignmentRestElement| is present, then
            1. Set _status_ to Completion(IteratorDestructuringAssignmentEvaluation of |AssignmentRestElement| with argument _iteratorRecord_).
          1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _status_).
          1. Return ? _status_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-propertydestructuringassignmentevaluation" type="sdo">
        <h1>
          Runtime Semantics: PropertyDestructuringAssignmentEvaluation (
            _value_: an ECMAScript language value,
          ): either a normal completion containing a List of property keys or an abrupt completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It collects a list of all destructured property keys.</dd>
        </dl>
        <emu-grammar>AssignmentPropertyList : AssignmentPropertyList `,` AssignmentProperty</emu-grammar>
        <emu-alg>
          1. Let _propertyNames_ be ? PropertyDestructuringAssignmentEvaluation of |AssignmentPropertyList| with argument _value_.
          1. Let _nextNames_ be ? PropertyDestructuringAssignmentEvaluation of |AssignmentProperty| with argument _value_.
          1. Return the list-concatenation of _propertyNames_ and _nextNames_.
        </emu-alg>

        <emu-grammar>AssignmentProperty : IdentifierReference Initializer?</emu-grammar>
        <emu-alg>
          1. Let _P_ be the StringValue of |IdentifierReference|.
          1. Let _lRef_ be ? ResolveBinding(_P_).
          1. Let _v_ be ? GetV(_value_, _P_).
          1. If |Initializer| is present and _v_ is *undefined*, then
            1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
              1. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
            1. Else,
              1. Let _defaultValue_ be ? Evaluation of |Initializer|.
              1. Set _v_ to ? GetValue(_defaultValue_).
          1. Perform ? PutValue(_lRef_, _v_).
          1. Return « _P_ ».
        </emu-alg>

        <emu-grammar>AssignmentProperty : PropertyName `:` AssignmentElement</emu-grammar>
        <emu-alg>
          1. Let _name_ be ? Evaluation of |PropertyName|.
          1. Perform ? KeyedDestructuringAssignmentEvaluation of |AssignmentElement| with arguments _value_ and _name_.
          1. Return « _name_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-restdestructuringassignmentevaluation" type="sdo">
        <h1>
          Runtime Semantics: RestDestructuringAssignmentEvaluation (
            _value_: an ECMAScript language value,
            _excludedNames_: a List of property keys,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>AssignmentRestProperty : `...` DestructuringAssignmentTarget</emu-grammar>
        <emu-alg>
          1. Let _lRef_ be ? Evaluation of |DestructuringAssignmentTarget|.
          1. Let _restObj_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Perform ? CopyDataProperties(_restObj_, _value_, _excludedNames_).
          1. Return ? PutValue(_lRef_, _restObj_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-iteratordestructuringassignmentevaluation" type="sdo">
        <h1>
          Runtime Semantics: IteratorDestructuringAssignmentEvaluation (
            _iteratorRecord_: an Iterator Record,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>AssignmentElementList : AssignmentElisionElement</emu-grammar>
        <emu-alg>
          1. Return ? IteratorDestructuringAssignmentEvaluation of |AssignmentElisionElement| with argument _iteratorRecord_.
        </emu-alg>
        <emu-grammar>AssignmentElementList : AssignmentElementList `,` AssignmentElisionElement</emu-grammar>
        <emu-alg>
          1. Perform ? IteratorDestructuringAssignmentEvaluation of |AssignmentElementList| with argument _iteratorRecord_.
          1. Return ? IteratorDestructuringAssignmentEvaluation of |AssignmentElisionElement| with argument _iteratorRecord_.
        </emu-alg>
        <emu-grammar>AssignmentElisionElement : AssignmentElement</emu-grammar>
        <emu-alg>
          1. Return ? IteratorDestructuringAssignmentEvaluation of |AssignmentElement| with argument _iteratorRecord_.
        </emu-alg>
        <emu-grammar>AssignmentElisionElement : Elision AssignmentElement</emu-grammar>
        <emu-alg>
          1. Perform ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
          1. Return ? IteratorDestructuringAssignmentEvaluation of |AssignmentElement| with argument _iteratorRecord_.
        </emu-alg>
        <emu-grammar>Elision : `,`</emu-grammar>
        <emu-alg>
          1. If _iteratorRecord_.[[Done]] is *false*, then
            1. Perform ? IteratorStep(_iteratorRecord_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>Elision : Elision `,`</emu-grammar>
        <emu-alg>
          1. Perform ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
          1. If _iteratorRecord_.[[Done]] is *false*, then
            1. Perform ? IteratorStep(_iteratorRecord_).
          1. Return ~unused~.
        </emu-alg>
        <emu-grammar>AssignmentElement : DestructuringAssignmentTarget Initializer?</emu-grammar>
        <emu-alg>
          1. If |DestructuringAssignmentTarget| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
            1. Let _lRef_ be ? Evaluation of |DestructuringAssignmentTarget|.
          1. Let _value_ be *undefined*.
          1. If _iteratorRecord_.[[Done]] is *false*, then
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is not ~done~, then
              1. Set _value_ to _next_.
          1. If |Initializer| is present and _value_ is *undefined*, then
            1. If IsAnonymousFunctionDefinition(|Initializer|) is *true* and IsIdentifierRef of |DestructuringAssignmentTarget| is *true*, then
              1. Let _target_ be the StringValue of |DestructuringAssignmentTarget|.
              1. Let _v_ be ? NamedEvaluation of |Initializer| with argument _target_.
            1. Else,
              1. Let _defaultValue_ be ? Evaluation of |Initializer|.
              1. Let _v_ be ? GetValue(_defaultValue_).
          1. Else,
            1. Let _v_ be _value_.
          1. If |DestructuringAssignmentTarget| is either an |ObjectLiteral| or an |ArrayLiteral|, then
            1. Let _nestedAssignmentPattern_ be the |AssignmentPattern| that is covered by |DestructuringAssignmentTarget|.
            1. Return ? DestructuringAssignmentEvaluation of _nestedAssignmentPattern_ with argument _v_.
          1. Return ? PutValue(_lRef_, _v_).
        </emu-alg>
        <emu-note>
          <p>Left to right evaluation order is maintained by evaluating a |DestructuringAssignmentTarget| that is not a destructuring pattern prior to accessing the iterator or evaluating the |Initializer|.</p>
        </emu-note>
        <emu-grammar>AssignmentRestElement : `...` DestructuringAssignmentTarget</emu-grammar>
        <emu-alg>
          1. If |DestructuringAssignmentTarget| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
            1. Let _lRef_ be ? Evaluation of |DestructuringAssignmentTarget|.
          1. Let _A_ be ! ArrayCreate(0).
          1. Let _n_ be 0.
          1. Repeat, while _iteratorRecord_.[[Done]] is *false*,
            1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
            1. If _next_ is not ~done~, then
              1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _next_).
              1. Set _n_ to _n_ + 1.
          1. If |DestructuringAssignmentTarget| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
            1. Return ? PutValue(_lRef_, _A_).
          1. Let _nestedAssignmentPattern_ be the |AssignmentPattern| that is covered by |DestructuringAssignmentTarget|.
          1. Return ? DestructuringAssignmentEvaluation of _nestedAssignmentPattern_ with argument _A_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-runtime-semantics-keyeddestructuringassignmentevaluation" type="sdo">
        <h1>
          Runtime Semantics: KeyedDestructuringAssignmentEvaluation (
            _value_: an ECMAScript language value,
            _propertyName_: a property key,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>AssignmentElement : DestructuringAssignmentTarget Initializer?</emu-grammar>
        <emu-alg>
          1. If |DestructuringAssignmentTarget| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
            1. Let _lRef_ be ? Evaluation of |DestructuringAssignmentTarget|.
          1. Let _v_ be ? GetV(_value_, _propertyName_).
          1. If |Initializer| is present and _v_ is *undefined*, then
            1. If IsAnonymousFunctionDefinition(|Initializer|) is *true* and IsIdentifierRef of |DestructuringAssignmentTarget| is *true*, then
              1. Let _target_ be the StringValue of |DestructuringAssignmentTarget|.
              1. Let _rhsValue_ be ? NamedEvaluation of |Initializer| with argument _target_.
            1. Else,
              1. Let _defaultValue_ be ? Evaluation of |Initializer|.
              1. Let _rhsValue_ be ? GetValue(_defaultValue_).
          1. Else,
            1. Let _rhsValue_ be _v_.
          1. If |DestructuringAssignmentTarget| is either an |ObjectLiteral| or an |ArrayLiteral|, then
            1. Let _assignmentPattern_ be the |AssignmentPattern| that is covered by |DestructuringAssignmentTarget|.
            1. Return ? DestructuringAssignmentEvaluation of _assignmentPattern_ with argument _rhsValue_.
          1. Return ? PutValue(_lRef_, _rhsValue_).
        </emu-alg>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-comma-operator">
    <h1>Comma Operator ( `,` )</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      Expression[In, Yield, Await] :
        AssignmentExpression[?In, ?Yield, ?Await]
        Expression[?In, ?Yield, ?Await] `,` AssignmentExpression[?In, ?Yield, ?Await]
    </emu-grammar>

    <emu-clause id="sec-comma-operator-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>Expression : Expression `,` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Let _lRef_ be ? Evaluation of |Expression|.
        1. Perform ? GetValue(_lRef_).
        1. Let _rRef_ be ? Evaluation of |AssignmentExpression|.
        1. Return ? GetValue(_rRef_).
      </emu-alg>
      <emu-note>
        <p>GetValue must be called even though its value is not used because it may have observable side-effects.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>
</emu-clause>

<h1 id="sec-ecmascript-language-statements-and-declarations"></h1>
