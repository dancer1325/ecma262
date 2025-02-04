# Syntax-Directed Operations
  <p>In addition to those defined in this section, specialized syntax-directed operations are defined throughout this specification.</p>

  <emu-clause id="sec-evaluation" type="sdo">
    <h1>Runtime Semantics: Evaluation ( ): a Completion Record</h1>
    <dl class="header">
      <dt>effects</dt>
      <dd>user-code</dd>
    </dl>
    <emu-note>
      The definitions for this operation are distributed over the "ECMAScript Language" sections of this specification. Each definition appears after the defining occurrence of the relevant productions.
    </emu-note>
  </emu-clause>

  <emu-clause id="sec-syntax-directed-operations-scope-analysis">
    <h1>Scope Analysis</h1>

    <emu-clause id="sec-static-semantics-boundnames" oldids="sec-identifiers-static-semantics-boundnames,sec-let-and-const-declarations-static-semantics-boundnames,sec-variable-statement-static-semantics-boundnames,sec-destructuring-binding-patterns-static-semantics-boundnames,sec-for-in-and-for-of-statements-static-semantics-boundnames,sec-function-definitions-static-semantics-boundnames,sec-arrow-function-definitions-static-semantics-boundnames,sec-generator-function-definitions-static-semantics-boundnames,sec-async-generator-function-definitions-static-semantics-boundnames,sec-class-definitions-static-semantics-boundnames,sec-async-function-definitions-static-semantics-BoundNames,sec-async-arrow-function-definitions-static-semantics-BoundNames,sec-imports-static-semantics-boundnames,sec-exports-static-semantics-boundnames" type="sdo">
      <h1>Static Semantics: BoundNames ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-note id="note-star-default-star">
        <p>*"\*default\*"* is used within this specification as a synthetic name for a module's default export when it does not have another name. An entry in the module's [[Environment]] is created with that name and holds the corresponding value, and resolving the export named *"default"* by calling <emu-xref href="#sec-resolveexport" title></emu-xref> for the module will return a ResolvedBinding Record whose [[BindingName]] is *"\*default\*"*, which will then resolve in the module's [[Environment]] to the above-mentioned value. This is done only for ease of specification, so that anonymous default exports can be resolved like any other export. This *"\*default\*"* string is never accessible to ECMAScript code or to the module linking algorithm.</p>
      </emu-note>
      <emu-grammar>BindingIdentifier : Identifier</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is the StringValue of |Identifier|.
      </emu-alg>
      <emu-grammar>BindingIdentifier : `yield`</emu-grammar>
      <emu-alg>
        1. Return « *"yield"* ».
      </emu-alg>
      <emu-grammar>BindingIdentifier : `await`</emu-grammar>
      <emu-alg>
        1. Return « *"await"* ».
      </emu-alg>
      <emu-grammar>LexicalDeclaration : LetOrConst BindingList `;`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingList|.
      </emu-alg>
      <emu-grammar>BindingList : BindingList `,` LexicalBinding</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingList|.
        1. Let _names2_ be the BoundNames of |LexicalBinding|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>LexicalBinding : BindingIdentifier Initializer?</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>LexicalBinding : BindingPattern Initializer</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingPattern|.
      </emu-alg>
      <emu-grammar>VariableDeclarationList : VariableDeclarationList `,` VariableDeclaration</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |VariableDeclarationList|.
        1. Let _names2_ be the BoundNames of |VariableDeclaration|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>VariableDeclaration : BindingIdentifier Initializer?</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>VariableDeclaration : BindingPattern Initializer</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingPattern|.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` BindingPropertyList `,` BindingRestProperty `}`</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingPropertyList|.
        1. Let _names2_ be the BoundNames of |BindingRestProperty|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision? `]`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingRestElement|.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision? `]`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingElementList|.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingElementList|.
        1. Let _names2_ be the BoundNames of |BindingRestElement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>BindingPropertyList : BindingPropertyList `,` BindingProperty</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingPropertyList|.
        1. Let _names2_ be the BoundNames of |BindingProperty|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>BindingElementList : BindingElementList `,` BindingElisionElement</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingElementList|.
        1. Let _names2_ be the BoundNames of |BindingElisionElement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>BindingElisionElement : Elision? BindingElement</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingElement|.
      </emu-alg>
      <emu-grammar>BindingProperty : PropertyName `:` BindingElement</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingElement|.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier Initializer?</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>BindingElement : BindingPattern Initializer?</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingPattern|.
      </emu-alg>
      <emu-grammar>ForDeclaration : LetOrConst ForBinding</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |ForBinding|.
      </emu-alg>
      <emu-grammar>FunctionDeclaration : `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>FunctionDeclaration : `function` `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
      <emu-grammar>FormalParameters : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>FormalParameters : FormalParameterList `,` FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |FormalParameterList|.
        1. Let _names2_ be the BoundNames of |FunctionRestParameter|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |FormalParameterList|.
        1. Let _names2_ be the BoundNames of |FormalParameter|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return the BoundNames of _formals_.
      </emu-alg>
      <emu-grammar>GeneratorDeclaration : `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>GeneratorDeclaration : `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
      <emu-grammar>AsyncGeneratorDeclaration : `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>AsyncGeneratorDeclaration : `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
      <emu-grammar>ClassDeclaration : `class` BindingIdentifier ClassTail</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>ClassDeclaration : `class` ClassTail</emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
      <emu-grammar>
        AsyncFunctionDeclaration : `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |BindingIdentifier|.
      </emu-alg>
      <emu-grammar>
        AsyncFunctionDeclaration : `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
      <emu-grammar>
        CoverCallExpressionAndAsyncArrowHead : MemberExpression Arguments
      </emu-grammar>
      <emu-alg>
        1. Let _head_ be the |AsyncArrowHead| that is covered by |CoverCallExpressionAndAsyncArrowHead|.
        1. Return the BoundNames of _head_.
      </emu-alg>
      <emu-grammar>ImportDeclaration : `import` ImportClause FromClause `;`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |ImportClause|.
      </emu-alg>
      <emu-grammar>ImportDeclaration : `import` ModuleSpecifier `;`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ImportClause : ImportedDefaultBinding `,` NameSpaceImport</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |ImportedDefaultBinding|.
        1. Let _names2_ be the BoundNames of |NameSpaceImport|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ImportClause : ImportedDefaultBinding `,` NamedImports</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |ImportedDefaultBinding|.
        1. Let _names2_ be the BoundNames of |NamedImports|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>NamedImports : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ImportsList : ImportsList `,` ImportSpecifier</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |ImportsList|.
        1. Let _names2_ be the BoundNames of |ImportSpecifier|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ImportSpecifier : ModuleExportName `as` ImportedBinding</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |ImportedBinding|.
      </emu-alg>
      <emu-grammar>
        ExportDeclaration :
          `export` ExportFromClause FromClause `;`
          `export` NamedExports `;`
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` VariableStatement</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |VariableStatement|.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |Declaration|.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` HoistableDeclaration</emu-grammar>
      <emu-alg>
        1. Let _declarationNames_ be the BoundNames of |HoistableDeclaration|.
        1. If _declarationNames_ does not include the element *"\*default\*"*, append *"\*default\*"* to _declarationNames_.
        1. Return _declarationNames_.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` ClassDeclaration</emu-grammar>
      <emu-alg>
        1. Let _declarationNames_ be the BoundNames of |ClassDeclaration|.
        1. If _declarationNames_ does not include the element *"\*default\*"*, append *"\*default\*"* to _declarationNames_.
        1. Return _declarationNames_.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` AssignmentExpression `;`</emu-grammar>
      <emu-alg>
        1. Return « *"\*default\*"* ».
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-declarationpart" type="sdo">
      <h1>Static Semantics: DeclarationPart ( ): a Parse Node</h1>
      <dl class="header">
      </dl>
      <emu-grammar>HoistableDeclaration : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return |FunctionDeclaration|.
      </emu-alg>
      <emu-grammar>HoistableDeclaration : GeneratorDeclaration</emu-grammar>
      <emu-alg>
        1. Return |GeneratorDeclaration|.
      </emu-alg>
      <emu-grammar>HoistableDeclaration : AsyncFunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return |AsyncFunctionDeclaration|.
      </emu-alg>
      <emu-grammar>HoistableDeclaration : AsyncGeneratorDeclaration</emu-grammar>
      <emu-alg>
        1. Return |AsyncGeneratorDeclaration|.
      </emu-alg>
      <emu-grammar>Declaration : ClassDeclaration</emu-grammar>
      <emu-alg>
        1. Return |ClassDeclaration|.
      </emu-alg>
      <emu-grammar>Declaration : LexicalDeclaration</emu-grammar>
      <emu-alg>
        1. Return |LexicalDeclaration|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-isconstantdeclaration" oldids="sec-let-and-const-declarations-static-semantics-isconstantdeclaration,sec-function-definitions-static-semantics-isconstantdeclaration,sec-generator-function-definitions-static-semantics-isconstantdeclaration,sec-async-generator-function-definitions-static-semantics-isconstantdeclaration,sec-class-definitions-static-semantics-isconstantdeclaration,sec-async-function-definitions-static-semantics-IsConstantDeclaration,sec-exports-static-semantics-isconstantdeclaration" type="sdo">
      <h1>Static Semantics: IsConstantDeclaration ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>LexicalDeclaration : LetOrConst BindingList `;`</emu-grammar>
      <emu-alg>
        1. Return IsConstantDeclaration of |LetOrConst|.
      </emu-alg>
      <emu-grammar>LetOrConst : `let`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>LetOrConst : `const`</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>
        FunctionDeclaration :
          `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
          `function` `(` FormalParameters `)` `{` FunctionBody `}`

        GeneratorDeclaration :
          `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
          `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorDeclaration :
          `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
          `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncFunctionDeclaration :
          `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
          `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        ClassDeclaration :
          `class` BindingIdentifier ClassTail
          `class` ClassTail
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        ExportDeclaration :
          `export` ExportFromClause FromClause `;`
          `export` NamedExports `;`
          `export` `default` AssignmentExpression `;`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-note>
        <p>It is not necessary to treat `export default` |AssignmentExpression| as a constant declaration because there is no syntax that permits assignment to the internal bound name used to reference a module's default object.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-lexicallydeclarednames" oldids="sec-block-static-semantics-lexicallydeclarednames,sec-switch-statement-static-semantics-lexicallydeclarednames,sec-labelled-statements-static-semantics-lexicallydeclarednames,sec-function-definitions-static-semantics-lexicallydeclarednames,sec-arrow-function-definitions-static-semantics-lexicallydeclarednames,sec-async-arrow-function-definitions-static-semantics-LexicallyDeclaredNames,sec-scripts-static-semantics-lexicallydeclarednames,sec-module-semantics-static-semantics-lexicallydeclarednames" type="sdo">
      <h1>Static Semantics: LexicallyDeclaredNames ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-grammar>Block : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the LexicallyDeclaredNames of |StatementList|.
        1. Let _names2_ be the LexicallyDeclaredNames of |StatementListItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the LexicallyDeclaredNames of |LabelledStatement|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |Declaration|.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, let _names1_ be the LexicallyDeclaredNames of the first |CaseClauses|.
        1. Else, let _names1_ be a new empty List.
        1. Let _names2_ be the LexicallyDeclaredNames of |DefaultClause|.
        1. If the second |CaseClauses| is present, let _names3_ be the LexicallyDeclaredNames of the second |CaseClauses|.
        1. Else, let _names3_ be a new empty List.
        1. Return the list-concatenation of _names1_, _names2_, and _names3_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the LexicallyDeclaredNames of |CaseClauses|.
        1. Let _names2_ be the LexicallyDeclaredNames of |CaseClause|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the LexicallyDeclaredNames of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the LexicallyDeclaredNames of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the LexicallyDeclaredNames of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : Statement</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |FunctionDeclaration|.
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>FunctionStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>
        AsyncConciseBody : ExpressionBody
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Script : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ScriptBody : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-note>
        <p>At the top level of a |Script|, function declarations are treated like var declarations rather than like lexical declarations.</p>
      </emu-note>
      <emu-note>
        <p>The LexicallyDeclaredNames of a |Module| includes the names of all of its imported bindings.</p>
      </emu-note>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the LexicallyDeclaredNames of |ModuleItemList|.
        1. Let _names2_ be the LexicallyDeclaredNames of |ModuleItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |ImportDeclaration|.
      </emu-alg>
      <emu-grammar>ModuleItem : ExportDeclaration</emu-grammar>
      <emu-alg>
        1. If |ExportDeclaration| is `export` |VariableStatement|, return a new empty List.
        1. Return the BoundNames of |ExportDeclaration|.
      </emu-alg>
      <emu-grammar>ModuleItem : StatementListItem</emu-grammar>
      <emu-alg>
        1. Return the LexicallyDeclaredNames of |StatementListItem|.
      </emu-alg>
      <emu-note>
        <p>At the top level of a |Module|, function declarations are treated like lexical declarations rather than like var declarations.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-lexicallyscopeddeclarations" oldids="sec-block-static-semantics-lexicallyscopeddeclarations,sec-switch-statement-static-semantics-lexicallyscopeddeclarations,sec-labelled-statements-static-semantics-lexicallyscopeddeclarations,sec-function-definitions-static-semantics-lexicallyscopeddeclarations,sec-arrow-function-definitions-static-semantics-lexicallyscopeddeclarations,sec-async-arrow-function-definitions-static-semantics-LexicallyScopedDeclarations,sec-scripts-static-semantics-lexicallyscopeddeclarations,sec-module-semantics-static-semantics-lexicallyscopeddeclarations,sec-exports-static-semantics-lexicallyscopeddeclarations" type="sdo">
      <h1>Static Semantics: LexicallyScopedDeclarations ( ): a List of Parse Nodes</h1>
      <dl class="header">
      </dl>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the LexicallyScopedDeclarations of |StatementList|.
        1. Let _declarations2_ be the LexicallyScopedDeclarations of |StatementListItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the LexicallyScopedDeclarations of |LabelledStatement|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is the DeclarationPart of |Declaration|.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, let _declarations1_ be the LexicallyScopedDeclarations of the first |CaseClauses|.
        1. Else, let _declarations1_ be a new empty List.
        1. Let _declarations2_ be the LexicallyScopedDeclarations of |DefaultClause|.
        1. If the second |CaseClauses| is present, let _declarations3_ be the LexicallyScopedDeclarations of the second |CaseClauses|.
        1. Else, let _declarations3_ be a new empty List.
        1. Return the list-concatenation of _declarations1_, _declarations2_, and _declarations3_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the LexicallyScopedDeclarations of |CaseClauses|.
        1. Let _declarations2_ be the LexicallyScopedDeclarations of |CaseClause|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the LexicallyScopedDeclarations of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the LexicallyScopedDeclarations of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the LexicallyScopedDeclarations of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : Statement</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return « |FunctionDeclaration| ».
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>FunctionStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>
        AsyncConciseBody : ExpressionBody
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Script : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ScriptBody : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelLexicallyScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>Module : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the LexicallyScopedDeclarations of |ModuleItemList|.
        1. Let _declarations2_ be the LexicallyScopedDeclarations of |ModuleItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>
        ExportDeclaration :
          `export` ExportFromClause FromClause `;`
          `export` NamedExports `;`
          `export` VariableStatement
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is the DeclarationPart of |Declaration|.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` HoistableDeclaration</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is the DeclarationPart of |HoistableDeclaration|.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` ClassDeclaration</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is |ClassDeclaration|.
      </emu-alg>
      <emu-grammar>ExportDeclaration : `export` `default` AssignmentExpression `;`</emu-grammar>
      <emu-alg>
        1. Return a List whose sole element is this |ExportDeclaration|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-vardeclarednames" oldids="sec-statement-semantics-static-semantics-vardeclarednames,sec-block-static-semantics-vardeclarednames,sec-variable-statement-static-semantics-vardeclarednames,sec-if-statement-static-semantics-vardeclarednames,sec-do-while-statement-static-semantics-vardeclarednames,sec-while-statement-static-semantics-vardeclarednames,sec-for-statement-static-semantics-vardeclarednames,sec-for-in-and-for-of-statements-static-semantics-vardeclarednames,sec-with-statement-static-semantics-vardeclarednames,sec-switch-statement-static-semantics-vardeclarednames,sec-labelled-statements-static-semantics-vardeclarednames,sec-try-statement-static-semantics-vardeclarednames,sec-function-definitions-static-semantics-vardeclarednames,sec-arrow-function-definitions-static-semantics-vardeclarednames,sec-async-arrow-function-definitions-static-semantics-VarDeclaredNames,sec-scripts-static-semantics-vardeclarednames,sec-module-semantics-static-semantics-vardeclarednames" type="sdo">
      <h1>Static Semantics: VarDeclaredNames ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        Statement :
          EmptyStatement
          ExpressionStatement
          ContinueStatement
          BreakStatement
          ReturnStatement
          ThrowStatement
          DebuggerStatement
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Block : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |StatementList|.
        1. Let _names2_ be the VarDeclaredNames of |StatementListItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>VariableStatement : `var` VariableDeclarationList `;`</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |VariableDeclarationList|.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of the first |Statement|.
        1. Let _names2_ be the VarDeclaredNames of the second |Statement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |VariableDeclarationList|.
        1. Let _names2_ be the VarDeclaredNames of |Statement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>
        ForInOfStatement :
          `for` `(` LeftHandSideExpression `in` Expression `)` Statement
          `for` `(` ForDeclaration `in` Expression `)` Statement
          `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
          `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement
          `for` `await` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
          `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>
        ForInOfStatement :
          `for` `(` `var` ForBinding `in` Expression `)` Statement
          `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
          `for` `await` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |ForBinding|.
        1. Let _names2_ be the VarDeclaredNames of |Statement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |CaseBlock|.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, let _names1_ be the VarDeclaredNames of the first |CaseClauses|.
        1. Else, let _names1_ be a new empty List.
        1. Let _names2_ be the VarDeclaredNames of |DefaultClause|.
        1. If the second |CaseClauses| is present, let _names3_ be the VarDeclaredNames of the second |CaseClauses|.
        1. Else, let _names3_ be a new empty List.
        1. Return the list-concatenation of _names1_, _names2_, and _names3_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |CaseClauses|.
        1. Let _names2_ be the VarDeclaredNames of |CaseClause|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the VarDeclaredNames of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the VarDeclaredNames of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |Block|.
        1. Let _names2_ be the VarDeclaredNames of |Catch|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |Block|.
        1. Let _names2_ be the VarDeclaredNames of |Finally|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |Block|.
        1. Let _names2_ be the VarDeclaredNames of |Catch|.
        1. Let _names3_ be the VarDeclaredNames of |Finally|.
        1. Return the list-concatenation of _names1_, _names2_, and _names3_.
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return the VarDeclaredNames of |Block|.
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>FunctionStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>
        AsyncConciseBody : ExpressionBody
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Script : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ScriptBody : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarDeclaredNames of |StatementList|.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the VarDeclaredNames of |ModuleItemList|.
        1. Let _names2_ be the VarDeclaredNames of |ModuleItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ModuleItem : ExportDeclaration</emu-grammar>
      <emu-alg>
        1. If |ExportDeclaration| is `export` |VariableStatement|, return the BoundNames of |ExportDeclaration|.
        1. Return a new empty List.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-varscopeddeclarations" oldids="sec-statement-semantics-static-semantics-varscopeddeclarations,sec-block-static-semantics-varscopeddeclarations,sec-variable-statement-static-semantics-varscopeddeclarations,sec-if-statement-static-semantics-varscopeddeclarations,sec-do-while-statement-static-semantics-varscopeddeclarations,sec-while-statement-static-semantics-varscopeddeclarations,sec-for-statement-static-semantics-varscopeddeclarations,sec-for-in-and-for-of-statements-static-semantics-varscopeddeclarations,sec-with-statement-static-semantics-varscopeddeclarations,sec-switch-statement-static-semantics-varscopeddeclarations,sec-labelled-statements-static-semantics-varscopeddeclarations,sec-try-statement-static-semantics-varscopeddeclarations,sec-function-definitions-static-semantics-varscopeddeclarations,sec-arrow-function-definitions-static-semantics-varscopeddeclarations,sec-async-arrow-function-definitions-static-semantics-VarScopedDeclarations,sec-scripts-static-semantics-varscopeddeclarations,sec-module-semantics-static-semantics-varscopeddeclarations" type="sdo">
      <h1>Static Semantics: VarScopedDeclarations ( ): a List of Parse Nodes</h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        Statement :
          EmptyStatement
          ExpressionStatement
          ContinueStatement
          BreakStatement
          ReturnStatement
          ThrowStatement
          DebuggerStatement
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Block : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |StatementList|.
        1. Let _declarations2_ be the VarScopedDeclarations of |StatementListItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>VariableDeclarationList : VariableDeclaration</emu-grammar>
      <emu-alg>
        1. Return « |VariableDeclaration| ».
      </emu-alg>
      <emu-grammar>VariableDeclarationList : VariableDeclarationList `,` VariableDeclaration</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |VariableDeclarationList|.
        1. Return the list-concatenation of _declarations1_ and « |VariableDeclaration| ».
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of the first |Statement|.
        1. Let _declarations2_ be the VarScopedDeclarations of the second |Statement|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |VariableDeclarationList|.
        1. Let _declarations2_ be the VarScopedDeclarations of |Statement|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>ForStatement : `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>
        ForInOfStatement :
          `for` `(` LeftHandSideExpression `in` Expression `)` Statement
          `for` `(` ForDeclaration `in` Expression `)` Statement
          `for` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
          `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement
          `for` `await` `(` LeftHandSideExpression `of` AssignmentExpression `)` Statement
          `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>
        ForInOfStatement :
          `for` `(` `var` ForBinding `in` Expression `)` Statement
          `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
          `for` `await` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be « |ForBinding| ».
        1. Let _declarations2_ be the VarScopedDeclarations of |Statement|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |CaseBlock|.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, let _declarations1_ be the VarScopedDeclarations of the first |CaseClauses|.
        1. Else, let _declarations1_ be a new empty List.
        1. Let _declarations2_ be the VarScopedDeclarations of |DefaultClause|.
        1. If the second |CaseClauses| is present, let _declarations3_ be the VarScopedDeclarations of the second |CaseClauses|.
        1. Else, let _declarations3_ be a new empty List.
        1. Return the list-concatenation of _declarations1_, _declarations2_, and _declarations3_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |CaseClauses|.
        1. Let _declarations2_ be the VarScopedDeclarations of |CaseClause|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the VarScopedDeclarations of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return the VarScopedDeclarations of |StatementList|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |Block|.
        1. Let _declarations2_ be the VarScopedDeclarations of |Catch|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |Block|.
        1. Let _declarations2_ be the VarScopedDeclarations of |Finally|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |Block|.
        1. Let _declarations2_ be the VarScopedDeclarations of |Catch|.
        1. Let _declarations3_ be the VarScopedDeclarations of |Finally|.
        1. Return the list-concatenation of _declarations1_, _declarations2_, and _declarations3_.
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return the VarScopedDeclarations of |Block|.
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>FunctionStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>ConciseBody : ExpressionBody</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>
        AsyncConciseBody : ExpressionBody
      </emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>Script : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ScriptBody : StatementList</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarScopedDeclarations of |StatementList|.
      </emu-alg>
      <emu-grammar>Module : [empty]</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the VarScopedDeclarations of |ModuleItemList|.
        1. Let _declarations2_ be the VarScopedDeclarations of |ModuleItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>ModuleItem : ExportDeclaration</emu-grammar>
      <emu-alg>
        1. If |ExportDeclaration| is `export` |VariableStatement|, return the VarScopedDeclarations of |VariableStatement|.
        1. Return a new empty List.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-toplevellexicallydeclarednames" oldids="sec-block-static-semantics-toplevellexicallydeclarednames,sec-labelled-statements-static-semantics-toplevellexicallydeclarednames" type="sdo">
      <h1>Static Semantics: TopLevelLexicallyDeclaredNames ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the TopLevelLexicallyDeclaredNames of |StatementList|.
        1. Let _names2_ be the TopLevelLexicallyDeclaredNames of |StatementListItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. If |Declaration| is <emu-grammar>Declaration : HoistableDeclaration</emu-grammar>, then
          1. Return a new empty List.
        1. Return the BoundNames of |Declaration|.
      </emu-alg>
      <emu-note>
        <p>At the top level of a function, or script, function declarations are treated like var declarations rather than like lexical declarations.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-static-semantics-toplevellexicallyscopeddeclarations" oldids="sec-block-static-semantics-toplevellexicallyscopeddeclarations,sec-labelled-statements-static-semantics-toplevellexicallyscopeddeclarations" type="sdo">
      <h1>Static Semantics: TopLevelLexicallyScopedDeclarations ( ): a List of Parse Nodes</h1>
      <dl class="header">
      </dl>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the TopLevelLexicallyScopedDeclarations of |StatementList|.
        1. Let _declarations2_ be the TopLevelLexicallyScopedDeclarations of |StatementListItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. If |Declaration| is <emu-grammar>Declaration : HoistableDeclaration</emu-grammar>, then
          1. Return a new empty List.
        1. Return « |Declaration| ».
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-toplevelvardeclarednames" oldids="sec-block-static-semantics-toplevelvardeclarednames,sec-labelled-statements-static-semantics-toplevelvardeclarednames" type="sdo">
      <h1>Static Semantics: TopLevelVarDeclaredNames ( ): a List of Strings</h1>
      <dl class="header">
      </dl>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the TopLevelVarDeclaredNames of |StatementList|.
        1. Let _names2_ be the TopLevelVarDeclaredNames of |StatementListItem|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. If |Declaration| is <emu-grammar>Declaration : HoistableDeclaration</emu-grammar>, then
          1. Return the BoundNames of |HoistableDeclaration|.
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the TopLevelVarDeclaredNames of |Statement|.
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-note>
        <p>At the top level of a function or script, inner function declarations are treated like var declarations.</p>
      </emu-note>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarDeclaredNames of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the TopLevelVarDeclaredNames of |Statement|.
        1. Return the VarDeclaredNames of |Statement|.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return the BoundNames of |FunctionDeclaration|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-toplevelvarscopeddeclarations" oldids="sec-block-static-semantics-toplevelvarscopeddeclarations,sec-labelled-statements-static-semantics-toplevelvarscopeddeclarations" type="sdo">
      <h1>Static Semantics: TopLevelVarScopedDeclarations ( ): a List of Parse Nodes</h1>
      <dl class="header">
      </dl>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be the TopLevelVarScopedDeclarations of |StatementList|.
        1. Let _declarations2_ be the TopLevelVarScopedDeclarations of |StatementListItem|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <emu-grammar>StatementListItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the TopLevelVarScopedDeclarations of |Statement|.
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>StatementListItem : Declaration</emu-grammar>
      <emu-alg>
        1. If |Declaration| is <emu-grammar>Declaration : HoistableDeclaration</emu-grammar>, then
          1. Let _declaration_ be the DeclarationPart of |HoistableDeclaration|.
          1. Return « _declaration_ ».
        1. Return a new empty List.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Return the TopLevelVarScopedDeclarations of |LabelledItem|.
      </emu-alg>
      <emu-grammar>LabelledItem : Statement</emu-grammar>
      <emu-alg>
        1. If |Statement| is <emu-grammar>Statement : LabelledStatement</emu-grammar>, return the TopLevelVarScopedDeclarations of |Statement|.
        1. Return the VarScopedDeclarations of |Statement|.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return « |FunctionDeclaration| ».
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-syntax-directed-operations-labels">
    <h1>Labels</h1>

    <emu-clause id="sec-static-semantics-containsduplicatelabels" oldids="sec-statement-semantics-static-semantics-containsduplicatelabels,sec-block-static-semantics-containsduplicatelabels,sec-if-statement-static-semantics-containsduplicatelabels,sec-do-while-statement-static-semantics-containsduplicatelabels,sec-while-statement-static-semantics-containsduplicatelabels,sec-for-statement-static-semantics-containsduplicatelabels,sec-for-in-and-for-of-statements-static-semantics-containsduplicatelabels,sec-with-statement-static-semantics-containsduplicatelabels,sec-switch-statement-static-semantics-containsduplicatelabels,sec-labelled-statements-static-semantics-containsduplicatelabels,sec-try-statement-static-semantics-containsduplicatelabels,sec-function-definitions-static-semantics-containsduplicatelabels,sec-module-semantics-static-semantics-containsduplicatelabels" type="sdo">
      <h1>
        Static Semantics: ContainsDuplicateLabels (
          _labelSet_: a List of Strings,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        Statement :
          VariableStatement
          EmptyStatement
          ExpressionStatement
          ContinueStatement
          BreakStatement
          ReturnStatement
          ThrowStatement
          DebuggerStatement

        Block :
          `{` `}`

        StatementListItem :
          Declaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicates_ be ContainsDuplicateLabels of |StatementList| with argument _labelSet_.
        1. If _hasDuplicates_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |StatementListItem| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicate_ be ContainsDuplicateLabels of the first |Statement| with argument _labelSet_.
        1. If _hasDuplicate_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of the second |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>
        ForStatement :
          `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement
          `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
          `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
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
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |CaseBlock| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, then
          1. If ContainsDuplicateLabels of the first |CaseClauses| with argument _labelSet_ is *true*, return *true*.
        1. If ContainsDuplicateLabels of |DefaultClause| with argument _labelSet_ is *true*, return *true*.
        1. If the second |CaseClauses| is not present, return *false*.
        1. Return ContainsDuplicateLabels of the second |CaseClauses| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicates_ be ContainsDuplicateLabels of |CaseClauses| with argument _labelSet_.
        1. If _hasDuplicates_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |CaseClause| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsDuplicateLabels of |StatementList| with argument _labelSet_.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsDuplicateLabels of |StatementList| with argument _labelSet_.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. If _labelSet_ contains _label_, return *true*.
        1. Let _newLabelSet_ be the list-concatenation of _labelSet_ and « _label_ ».
        1. Return ContainsDuplicateLabels of |LabelledItem| with argument _newLabelSet_.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicates_ be ContainsDuplicateLabels of |Block| with argument _labelSet_.
        1. If _hasDuplicates_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |Catch| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicates_ be ContainsDuplicateLabels of |Block| with argument _labelSet_.
        1. If _hasDuplicates_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |Finally| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. If ContainsDuplicateLabels of |Block| with argument _labelSet_ is *true*, return *true*.
        1. If ContainsDuplicateLabels of |Catch| with argument _labelSet_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |Finally| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Block| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _hasDuplicates_ be ContainsDuplicateLabels of |ModuleItemList| with argument _labelSet_.
        1. If _hasDuplicates_ is *true*, return *true*.
        1. Return ContainsDuplicateLabels of |ModuleItem| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>
        ModuleItem :
          ImportDeclaration
          ExportDeclaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-containsundefinedbreaktarget" oldids="sec-statement-semantics-static-semantics-containsundefinedbreaktarget,sec-block-static-semantics-containsundefinedbreaktarget,sec-if-statement-static-semantics-containsundefinedbreaktarget,sec-do-while-statement-static-semantics-containsundefinedbreaktarget,sec-while-statement-static-semantics-containsundefinedbreaktarget,sec-for-statement-static-semantics-containsundefinedbreaktarget,sec-for-in-and-for-of-statements-static-semantics-containsundefinedbreaktarget,sec-break-statement-static-semantics-containsundefinedbreaktarget,sec-with-statement-static-semantics-containsundefinedbreaktarget,sec-switch-statement-static-semantics-containsundefinedbreaktarget,sec-labelled-statements-static-semantics-containsundefinedbreaktarget,sec-try-statement-static-semantics-containsundefinedbreaktarget,sec-function-definitions-static-semantics-containsundefinedbreaktarget,sec-module-semantics-static-semantics-containsundefinedbreaktarget" type="sdo">
      <h1>
        Static Semantics: ContainsUndefinedBreakTarget (
          _labelSet_: a List of Strings,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        Statement :
          VariableStatement
          EmptyStatement
          ExpressionStatement
          ContinueStatement
          ReturnStatement
          ThrowStatement
          DebuggerStatement

        Block :
          `{` `}`

        StatementListItem :
          Declaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of |StatementList| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |StatementListItem| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of the first |Statement| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of the second |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>
        ForStatement :
          `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement
          `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
          `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
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
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>BreakStatement : `break` `;`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>BreakStatement : `break` LabelIdentifier `;`</emu-grammar>
      <emu-alg>
        1. If _labelSet_ does not contain the StringValue of |LabelIdentifier|, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |CaseBlock| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, then
          1. If ContainsUndefinedBreakTarget of the first |CaseClauses| with argument _labelSet_ is *true*, return *true*.
        1. If ContainsUndefinedBreakTarget of |DefaultClause| with argument _labelSet_ is *true*, return *true*.
        1. If the second |CaseClauses| is not present, return *false*.
        1. Return ContainsUndefinedBreakTarget of the second |CaseClauses| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of |CaseClauses| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |CaseClause| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsUndefinedBreakTarget of |StatementList| with argument _labelSet_.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsUndefinedBreakTarget of |StatementList| with argument _labelSet_.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. Let _newLabelSet_ be the list-concatenation of _labelSet_ and « _label_ ».
        1. Return ContainsUndefinedBreakTarget of |LabelledItem| with argument _newLabelSet_.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of |Block| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |Catch| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of |Block| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |Finally| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. If ContainsUndefinedBreakTarget of |Block| with argument _labelSet_ is *true*, return *true*.
        1. If ContainsUndefinedBreakTarget of |Catch| with argument _labelSet_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |Finally| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Block| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedBreakTarget of |ModuleItemList| with argument _labelSet_.
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedBreakTarget of |ModuleItem| with argument _labelSet_.
      </emu-alg>
      <emu-grammar>
        ModuleItem :
          ImportDeclaration
          ExportDeclaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-containsundefinedcontinuetarget" oldids="sec-statement-semantics-static-semantics-containsundefinedcontinuetarget,sec-block-static-semantics-containsundefinedcontinuetarget,sec-if-statement-static-semantics-containsundefinedcontinuetarget,sec-do-while-statement-static-semantics-containsundefinedcontinuetarget,sec-while-statement-static-semantics-containsundefinedcontinuetarget,sec-for-statement-static-semantics-containsundefinedcontinuetarget,sec-for-in-and-for-of-statements-static-semantics-containsundefinedcontinuetarget,sec-continue-statement-static-semantics-containsundefinedcontinuetarget,sec-with-statement-static-semantics-containsundefinedcontinuetarget,sec-switch-statement-static-semantics-containsundefinedcontinuetarget,sec-labelled-statements-static-semantics-containsundefinedcontinuetarget,sec-try-statement-static-semantics-containsundefinedcontinuetarget,sec-function-definitions-static-semantics-containsundefinedcontinuetarget,sec-module-semantics-static-semantics-containsundefinedcontinuetarget" type="sdo">
      <h1>
        Static Semantics: ContainsUndefinedContinueTarget (
          _iterationSet_: a List of Strings,
          _labelSet_: a List of Strings,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        Statement :
          VariableStatement
          EmptyStatement
          ExpressionStatement
          BreakStatement
          ReturnStatement
          ThrowStatement
          DebuggerStatement

        Block :
          `{` `}`

        StatementListItem :
          Declaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>Statement : BlockStatement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |BlockStatement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>BreakableStatement : IterationStatement</emu-grammar>
      <emu-alg>
        1. Let _newIterationSet_ be the list-concatenation of _iterationSet_ and _labelSet_.
        1. Return ContainsUndefinedContinueTarget of |IterationStatement| with arguments _newIterationSet_ and « ».
      </emu-alg>
      <emu-grammar>StatementList : StatementList StatementListItem</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of |StatementList| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |StatementListItem| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement `else` Statement</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of the first |Statement| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of the second |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>IfStatement : `if` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>DoWhileStatement : `do` Statement `while` `(` Expression `)` `;`</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>WhileStatement : `while` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>
        ForStatement :
          `for` `(` Expression? `;` Expression? `;` Expression? `)` Statement
          `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
          `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
      </emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
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
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-note>
        <p>This section is extended by Annex <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref>.</p>
      </emu-note>
      <emu-grammar>ContinueStatement : `continue` `;`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ContinueStatement : `continue` LabelIdentifier `;`</emu-grammar>
      <emu-alg>
        1. If _iterationSet_ does not contain the StringValue of |LabelIdentifier|, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>WithStatement : `with` `(` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |CaseBlock| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>CaseBlock : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>CaseBlock : `{` CaseClauses? DefaultClause CaseClauses? `}`</emu-grammar>
      <emu-alg>
        1. If the first |CaseClauses| is present, then
          1. If ContainsUndefinedContinueTarget of the first |CaseClauses| with arguments _iterationSet_ and « » is *true*, return *true*.
        1. If ContainsUndefinedContinueTarget of |DefaultClause| with arguments _iterationSet_ and « » is *true*, return *true*.
        1. If the second |CaseClauses| is not present, return *false*.
        1. Return ContainsUndefinedContinueTarget of the second |CaseClauses| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>CaseClauses : CaseClauses CaseClause</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of |CaseClauses| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |CaseClause| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>CaseClause : `case` Expression `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsUndefinedContinueTarget of |StatementList| with arguments _iterationSet_ and « ».
        1. Return *false*.
      </emu-alg>
      <emu-grammar>DefaultClause : `default` `:` StatementList?</emu-grammar>
      <emu-alg>
        1. If the |StatementList| is present, return ContainsUndefinedContinueTarget of |StatementList| with arguments _iterationSet_ and « ».
        1. Return *false*.
      </emu-alg>
      <emu-grammar>LabelledStatement : LabelIdentifier `:` LabelledItem</emu-grammar>
      <emu-alg>
        1. Let _label_ be the StringValue of |LabelIdentifier|.
        1. Let _newLabelSet_ be the list-concatenation of _labelSet_ and « _label_ ».
        1. Return ContainsUndefinedContinueTarget of |LabelledItem| with arguments _iterationSet_ and _newLabelSet_.
      </emu-alg>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of |Block| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |Catch| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Finally</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of |Block| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |Finally| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>TryStatement : `try` Block Catch Finally</emu-grammar>
      <emu-alg>
        1. If ContainsUndefinedContinueTarget of |Block| with arguments _iterationSet_ and « » is *true*, return *true*.
        1. If ContainsUndefinedContinueTarget of |Catch| with arguments _iterationSet_ and « » is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |Finally| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Block| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>FunctionStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassStaticBlockStatementList : [empty]</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
      <emu-alg>
        1. Let _hasUndefinedLabels_ be ContainsUndefinedContinueTarget of |ModuleItemList| with arguments _iterationSet_ and « ».
        1. If _hasUndefinedLabels_ is *true*, return *true*.
        1. Return ContainsUndefinedContinueTarget of |ModuleItem| with arguments _iterationSet_ and « ».
      </emu-alg>
      <emu-grammar>
        ModuleItem :
          ImportDeclaration
          ExportDeclaration
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-syntax-directed-operations-function-name-inference">
    <h1>Function Name Inference</h1>

    <emu-clause id="sec-static-semantics-hasname" oldids="sec-semantics-static-semantics-hasname,sec-function-definitions-static-semantics-hasname,sec-arrow-function-definitions-static-semantics-hasname,sec-generator-function-definitions-static-semantics-hasname,sec-async-generator-function-definitions-static-semantics-hasname,sec-class-definitions-static-semantics-hasname,sec-async-function-definitions-static-semantics-HasName,sec-async-arrow-function-definitions-static-semantics-HasName" type="sdo">
      <h1>Static Semantics: HasName ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. If IsFunctionDefinition of _expr_ is *false*, return *false*.
        1. Return HasName of _expr_.
      </emu-alg>
      <emu-grammar>
        FunctionExpression :
          `function` `(` FormalParameters `)` `{` FunctionBody `}`

        GeneratorExpression :
          `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorExpression :
          `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncFunctionExpression :
          `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`

        ArrowFunction :
          ArrowParameters `=>` ConciseBody

        AsyncArrowFunction :
          `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
          CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody

        ClassExpression :
          `class` ClassTail
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        FunctionExpression :
          `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`

        GeneratorExpression :
          `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorExpression :
          `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncFunctionExpression :
          `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`

        ClassExpression :
          `class` BindingIdentifier ClassTail
      </emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-isfunctiondefinition" oldids="sec-semantics-static-semantics-isfunctiondefinition,sec-grouping-operator-static-semantics-isfunctiondefinition,sec-static-semantics-static-semantics-isfunctiondefinition,sec-update-expressions-static-semantics-isfunctiondefinition,sec-unary-operators-static-semantics-isfunctiondefinition,sec-exp-operator-static-semantics-isfunctiondefinition,sec-multiplicative-operators-static-semantics-isfunctiondefinition,sec-additive-operators-static-semantics-isfunctiondefinition,sec-bitwise-shift-operators-static-semantics-isfunctiondefinition,sec-relational-operators-static-semantics-isfunctiondefinition,sec-equality-operators-static-semantics-isfunctiondefinition,sec-binary-bitwise-operators-static-semantics-isfunctiondefinition,sec-binary-logical-operators-static-semantics-isfunctiondefinition,sec-conditional-operator-static-semantics-isfunctiondefinition,sec-assignment-operators-static-semantics-isfunctiondefinition,sec-comma-operator-static-semantics-isfunctiondefinition,sec-function-definitions-static-semantics-isfunctiondefinition,sec-generator-function-definitions-static-semantics-isfunctiondefinition,sec-async-generator-function-definitions-static-semantics-isfunctiondefinition,sec-class-definitions-static-semantics-isfunctiondefinition,sec-async-function-definitions-static-semantics-IsFunctionDefinition" type="sdo">
      <h1>Static Semantics: IsFunctionDefinition ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return IsFunctionDefinition of _expr_.
      </emu-alg>
      <emu-grammar>
        PrimaryExpression :
          `this`
          IdentifierReference
          Literal
          ArrayLiteral
          ObjectLiteral
          RegularExpressionLiteral
          TemplateLiteral

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

        ExponentiationExpression :
          UpdateExpression `**` ExponentiationExpression

        MultiplicativeExpression :
          MultiplicativeExpression MultiplicativeOperator ExponentiationExpression

        AdditiveExpression :
          AdditiveExpression `+` MultiplicativeExpression
          AdditiveExpression `-` MultiplicativeExpression

        ShiftExpression :
          ShiftExpression `&lt;&lt;` AdditiveExpression
          ShiftExpression `&gt;&gt;` AdditiveExpression
          ShiftExpression `&gt;&gt;&gt;` AdditiveExpression

        RelationalExpression :
          RelationalExpression `&lt;` ShiftExpression
          RelationalExpression `&gt;` ShiftExpression
          RelationalExpression `&lt;=` ShiftExpression
          RelationalExpression `&gt;=` ShiftExpression
          RelationalExpression `instanceof` ShiftExpression
          RelationalExpression `in` ShiftExpression
          PrivateIdentifier `in` ShiftExpression

        EqualityExpression :
          EqualityExpression `==` RelationalExpression
          EqualityExpression `!=` RelationalExpression
          EqualityExpression `===` RelationalExpression
          EqualityExpression `!==` RelationalExpression

        BitwiseANDExpression :
          BitwiseANDExpression `&amp;` EqualityExpression

        BitwiseXORExpression :
          BitwiseXORExpression `^` BitwiseANDExpression

        BitwiseORExpression :
          BitwiseORExpression `|` BitwiseXORExpression

        LogicalANDExpression :
          LogicalANDExpression `&amp;&amp;` BitwiseORExpression

        LogicalORExpression :
          LogicalORExpression `||` LogicalANDExpression

        CoalesceExpression :
          CoalesceExpressionHead `??` BitwiseORExpression

        ConditionalExpression :
          ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression

        AssignmentExpression :
          YieldExpression
          LeftHandSideExpression `=` AssignmentExpression
          LeftHandSideExpression AssignmentOperator AssignmentExpression
          LeftHandSideExpression `&amp;&amp;=` AssignmentExpression
          LeftHandSideExpression `||=` AssignmentExpression
          LeftHandSideExpression `??=` AssignmentExpression

        Expression :
          Expression `,` AssignmentExpression
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        AssignmentExpression :
          ArrowFunction
          AsyncArrowFunction

        FunctionExpression :
          `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`

        GeneratorExpression :
          `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`

        AsyncGeneratorExpression :
          `async` `function` `*` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`

        AsyncFunctionExpression :
          `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`

        ClassExpression :
          `class` BindingIdentifier? ClassTail
      </emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-isanonymousfunctiondefinition" type="abstract operation">
      <h1>
        Static Semantics: IsAnonymousFunctionDefinition (
          _expr_: an |AssignmentExpression| Parse Node, an |Initializer| Parse Node, or an |Expression| Parse Node,
        ): a Boolean
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It determines if its argument is a function definition that does not bind a name.</dd>
      </dl>
      <emu-alg>
        1. If IsFunctionDefinition of _expr_ is *false*, return *false*.
        1. Let _hasName_ be HasName of _expr_.
        1. If _hasName_ is *true*, return *false*.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-isidentifierref" oldids="sec-semantics-static-semantics-isidentifierref,sec-static-semantics-static-semantics-isidentifierref" type="sdo">
      <h1>Static Semantics: IsIdentifierRef ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>PrimaryExpression : IdentifierReference</emu-grammar>
      <emu-alg>
        1. Return *true*.
      </emu-alg>
      <emu-grammar>
        PrimaryExpression :
          `this`
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
          CoverParenthesizedExpressionAndArrowParameterList

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
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-namedevaluation" oldids="sec-grouping-operator-runtime-semantics-namedevaluation,sec-function-definitions-runtime-semantics-namedevaluation,sec-arrow-function-definitions-runtime-semantics-namedevaluation,sec-generator-function-definitions-runtime-semantics-namedevaluation,sec-asyncgenerator-definitions-namedevaluation,sec-class-definitions-runtime-semantics-namedevaluation,sec-async-function-definitions-runtime-semantics-namedevaluation,sec-async-arrow-function-definitions-runtime-semantics-namedevaluation" type="sdo">
      <h1>
        Runtime Semantics: NamedEvaluation (
          _name_: a property key or a Private Name,
        ): either a normal completion containing a function object or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>PrimaryExpression : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return ? NamedEvaluation of _expr_ with argument _name_.
      </emu-alg>
      <emu-grammar>ParenthesizedExpression : `(` Expression `)`</emu-grammar>
      <emu-alg>
        1. Assert: IsAnonymousFunctionDefinition(|Expression|) is *true*.
        1. Return ? NamedEvaluation of |Expression| with argument _name_.
      </emu-alg>
      <emu-grammar>FunctionExpression : `function` `(` FormalParameters `)` `{` FunctionBody `}`</emu-grammar>
      <emu-alg>
        1. Return InstantiateOrdinaryFunctionExpression of |FunctionExpression| with argument _name_.
      </emu-alg>
      <emu-grammar>GeneratorExpression : `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return InstantiateGeneratorFunctionExpression of |GeneratorExpression| with argument _name_.
      </emu-alg>
      <emu-grammar>
        AsyncGeneratorExpression : `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncGeneratorFunctionExpression of |AsyncGeneratorExpression| with argument _name_.
      </emu-alg>
      <emu-grammar>
        AsyncFunctionExpression : `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncFunctionExpression of |AsyncFunctionExpression| with argument _name_.
      </emu-alg>
      <emu-grammar>ArrowFunction : ArrowParameters `=>` ConciseBody</emu-grammar>
      <emu-alg>
        1. Return InstantiateArrowFunctionExpression of |ArrowFunction| with argument _name_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowFunction :
          `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
          CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncArrowFunctionExpression of |AsyncArrowFunction| with argument _name_.
      </emu-alg>
      <emu-grammar>ClassExpression : `class` ClassTail</emu-grammar>
      <emu-alg>
        1. Let _value_ be ? ClassDefinitionEvaluation of |ClassTail| with arguments *undefined* and _name_.
        1. Set _value_.[[SourceText]] to the source text matched by |ClassExpression|.
        1. Return _value_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-syntax-directed-operations-contains">
    <h1>Contains</h1>

    <emu-clause id="sec-static-semantics-contains" oldids="sec-object-initializer-static-semantics-contains,sec-static-semantics-static-semantics-contains,sec-function-definitions-static-semantics-contains,sec-arrow-function-definitions-static-semantics-contains,sec-generator-function-definitions-static-semantics-contains,sec-async-generator-function-definitions-static-semantics-contains,sec-class-definitions-static-semantics-contains,sec-async-function-definitions-static-semantics-Contains,sec-async-arrow-function-definitions-static-semantics-Contains" type="sdo">
      <h1>
        Static Semantics: Contains (
          _symbol_: a grammar symbol,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <p>Every grammar production alternative in this specification which is not listed below implicitly has the following default definition of Contains:</p>
      <emu-alg>
        1. For each child node _child_ of this Parse Node, do
          1. If _child_ is an instance of _symbol_, return *true*.
          1. If _child_ is an instance of a nonterminal, then
            1. Let _contained_ be the result of _child_ Contains _symbol_.
            1. If _contained_ is *true*, return *true*.
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
      <emu-note>
        <p>Static semantic rules that depend upon substructure generally do not look into function definitions.</p>
      </emu-note>
      <emu-grammar>ClassTail : ClassHeritage? `{` ClassBody `}`</emu-grammar>
      <emu-alg>
        1. If _symbol_ is |ClassBody|, return *true*.
        1. If _symbol_ is |ClassHeritage|, then
          1. If |ClassHeritage| is present, return *true*; otherwise return *false*.
        1. If |ClassHeritage| is present, then
          1. If |ClassHeritage| Contains _symbol_ is *true*, return *true*.
        1. Return the result of ComputedPropertyContains of |ClassBody| with argument _symbol_.
      </emu-alg>
      <emu-note>
        <p>Static semantic rules that depend upon substructure generally do not look into class bodies except for |PropertyName|s.</p>
      </emu-note>
      <emu-grammar>ClassStaticBlock : `static` `{` ClassStaticBlockBody `}`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-note>
        <p>Static semantic rules that depend upon substructure generally do not look into `static` initialization blocks.</p>
      </emu-note>
      <emu-grammar>ArrowFunction : ArrowParameters `=>` ConciseBody</emu-grammar>
      <emu-alg>
        1. If _symbol_ is not one of |NewTarget|, |SuperProperty|, |SuperCall|, `super`, or `this`, return *false*.
        1. If |ArrowParameters| Contains _symbol_ is *true*, return *true*.
        1. Return |ConciseBody| Contains _symbol_.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return _formals_ Contains _symbol_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowFunction : `async` AsyncArrowBindingIdentifier `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. If _symbol_ is not one of |NewTarget|, |SuperProperty|, |SuperCall|, `super`, or `this`, return *false*.
        1. Return |AsyncConciseBody| Contains _symbol_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead `=>` AsyncConciseBody
      </emu-grammar>
      <emu-alg>
        1. If _symbol_ is not one of |NewTarget|, |SuperProperty|, |SuperCall|, `super`, or `this`, return *false*.
        1. Let _head_ be the |AsyncArrowHead| that is covered by |CoverCallExpressionAndAsyncArrowHead|.
        1. If _head_ Contains _symbol_ is *true*, return *true*.
        1. Return |AsyncConciseBody| Contains _symbol_.
      </emu-alg>
      <emu-note>
        <p>Contains is used to detect `new.target`, `this`, and `super` usage within an |ArrowFunction| or |AsyncArrowFunction|.</p>
      </emu-note>
      <emu-grammar>PropertyDefinition : MethodDefinition</emu-grammar>
      <emu-alg>
        1. If _symbol_ is |MethodDefinition|, return *true*.
        1. Return the result of ComputedPropertyContains of |MethodDefinition| with argument _symbol_.
      </emu-alg>
      <emu-grammar>LiteralPropertyName : IdentifierName</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>MemberExpression : MemberExpression `.` IdentifierName</emu-grammar>
      <emu-alg>
        1. If |MemberExpression| Contains _symbol_ is *true*, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>SuperProperty : `super` `.` IdentifierName</emu-grammar>
      <emu-alg>
        1. If _symbol_ is the |ReservedWord| `super`, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>CallExpression : CallExpression `.` IdentifierName</emu-grammar>
      <emu-alg>
        1. If |CallExpression| Contains _symbol_ is *true*, return *true*.
        1. Return *false*.
      </emu-alg>
      <emu-grammar>OptionalChain : `?.` IdentifierName</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>OptionalChain : OptionalChain `.` IdentifierName</emu-grammar>
      <emu-alg>
        1. If |OptionalChain| Contains _symbol_ is *true*, return *true*.
        1. Return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-computedpropertycontains" oldids="sec-object-initializer-static-semantics-computedpropertycontains,sec-method-definitions-static-semantics-computedpropertycontains,sec-generator-function-definitions-static-semantics-computedpropertycontains,sec-async-generator-function-definitions-static-semantics-computedpropertycontains,sec-class-definitions-static-semantics-computedpropertycontains,sec-async-function-definitions-static-semantics-ComputedPropertyContains" type="sdo">
      <h1>
        Static Semantics: ComputedPropertyContains (
          _symbol_: a grammar symbol,
        ): a Boolean
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        ClassElementName : PrivateIdentifier

        PropertyName : LiteralPropertyName
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>PropertyName : ComputedPropertyName</emu-grammar>
      <emu-alg>
        1. Return the result of |ComputedPropertyName| Contains _symbol_.
      </emu-alg>
      <emu-grammar>
        MethodDefinition :
          ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`
          `get` ClassElementName `(` `)` `{` FunctionBody `}`
          `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the result of ComputedPropertyContains of |ClassElementName| with argument _symbol_.
      </emu-alg>
      <emu-grammar>GeneratorMethod : `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the result of ComputedPropertyContains of |ClassElementName| with argument _symbol_.
      </emu-alg>
      <emu-grammar>AsyncGeneratorMethod : `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the result of ComputedPropertyContains of |ClassElementName| with argument _symbol_.
      </emu-alg>
      <emu-grammar>ClassElementList : ClassElementList ClassElement</emu-grammar>
      <emu-alg>
        1. Let _inList_ be ComputedPropertyContains of |ClassElementList| with argument _symbol_.
        1. If _inList_ is *true*, return *true*.
        1. Return the result of ComputedPropertyContains of |ClassElement| with argument _symbol_.
      </emu-alg>
      <emu-grammar>ClassElement : ClassStaticBlock</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>ClassElement : `;`</emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <emu-grammar>
        AsyncMethod : `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the result of ComputedPropertyContains of |ClassElementName| with argument _symbol_.
      </emu-alg>
      <emu-grammar>
        FieldDefinition : ClassElementName Initializer?
      </emu-grammar>
      <emu-alg>
        1. Return the result of ComputedPropertyContains of |ClassElementName| with argument _symbol_.
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-syntax-directed-operations-miscellaneous">
    <h1>Miscellaneous</h1>
    <p>These operations are used in multiple places throughout the specification.</p>

    <emu-clause id="sec-runtime-semantics-instantiatefunctionobject" type="sdo">
      <h1>
        Runtime Semantics: InstantiateFunctionObject (
          _env_: an Environment Record,
          _privateEnv_: a PrivateEnvironment Record or *null*,
        ): an ECMAScript function object
      </h1>
      <dl class="header">
      </dl>
      <emu-grammar>
        FunctionDeclaration :
          `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
          `function` `(` FormalParameters `)` `{` FunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateOrdinaryFunctionObject of |FunctionDeclaration| with arguments _env_ and _privateEnv_.
      </emu-alg>
      <emu-grammar>
        GeneratorDeclaration :
          `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
          `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateGeneratorFunctionObject of |GeneratorDeclaration| with arguments _env_ and _privateEnv_.
      </emu-alg>
      <emu-grammar>
        AsyncGeneratorDeclaration :
          `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
          `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncGeneratorFunctionObject of |AsyncGeneratorDeclaration| with arguments _env_ and _privateEnv_.
      </emu-alg>
      <emu-grammar>
        AsyncFunctionDeclaration :
          `async` `function` BindingIdentifier `(` FormalParameters `)` `{` AsyncFunctionBody `}`
          `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return InstantiateAsyncFunctionObject of |AsyncFunctionDeclaration| with arguments _env_ and _privateEnv_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-bindinginitialization" oldids="sec-identifiers-runtime-semantics-bindinginitialization,sec-destructuring-binding-patterns-runtime-semantics-bindinginitialization" type="sdo">
      <h1>
        Runtime Semantics: BindingInitialization (
          _value_: an ECMAScript language value,
          _environment_: an Environment Record or *undefined*,
        ): either a normal completion containing ~unused~ or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-note>
        <p>*undefined* is passed for _environment_ to indicate that a PutValue operation should be used to assign the initialization value. This is the case for `var` statements and formal parameter lists of some non-strict functions (See <emu-xref href="#sec-functiondeclarationinstantiation"></emu-xref>). In those cases a lexical binding is hoisted and preinitialized prior to evaluation of its initializer.</p>
      </emu-note>
      <emu-grammar>BindingIdentifier : Identifier</emu-grammar>
      <emu-alg>
        1. Let _name_ be the StringValue of |Identifier|.
        1. Return ? InitializeBoundName(_name_, _value_, _environment_).
      </emu-alg>
      <emu-grammar>BindingIdentifier : `yield`</emu-grammar>
      <emu-alg>
        1. Return ? InitializeBoundName(*"yield"*, _value_, _environment_).
      </emu-alg>
      <emu-grammar>BindingIdentifier : `await`</emu-grammar>
      <emu-alg>
        1. Return ? InitializeBoundName(*"await"*, _value_, _environment_).
      </emu-alg>
      <emu-grammar>BindingPattern : ObjectBindingPattern</emu-grammar>
      <emu-alg>
        1. Perform ? RequireObjectCoercible(_value_).
        1. Return ? BindingInitialization of |ObjectBindingPattern| with arguments _value_ and _environment_.
      </emu-alg>
      <emu-grammar>BindingPattern : ArrayBindingPattern</emu-grammar>
      <emu-alg>
        1. Let _iteratorRecord_ be ? GetIterator(_value_, ~sync~).
        1. Let _result_ be Completion(IteratorBindingInitialization of |ArrayBindingPattern| with arguments _iteratorRecord_ and _environment_).
        1. If _iteratorRecord_.[[Done]] is *false*, return ? IteratorClose(_iteratorRecord_, _result_).
        1. Return ? _result_.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` `}`</emu-grammar>
      <emu-alg>
        1. Return ~unused~.
      </emu-alg>
      <emu-grammar>
        ObjectBindingPattern :
          `{` BindingPropertyList `}`
          `{` BindingPropertyList `,` `}`
      </emu-grammar>
      <emu-alg>
        1. Perform ? PropertyBindingInitialization of |BindingPropertyList| with arguments _value_ and _environment_.
        1. Return ~unused~.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` BindingRestProperty `}`</emu-grammar>
      <emu-alg>
        1. Let _excludedNames_ be a new empty List.
        1. Return ? RestBindingInitialization of |BindingRestProperty| with arguments _value_, _environment_, and _excludedNames_.
      </emu-alg>
      <emu-grammar>ObjectBindingPattern : `{` BindingPropertyList `,` BindingRestProperty `}`</emu-grammar>
      <emu-alg>
        1. Let _excludedNames_ be ? PropertyBindingInitialization of |BindingPropertyList| with arguments _value_ and _environment_.
        1. Return ? RestBindingInitialization of |BindingRestProperty| with arguments _value_, _environment_, and _excludedNames_.
      </emu-alg>

      <emu-clause id="sec-initializeboundname" type="abstract operation">
        <h1>
          InitializeBoundName (
            _name_: a String,
            _value_: an ECMAScript language value,
            _environment_: an Environment Record or *undefined*,
          ): either a normal completion containing ~unused~ or an abrupt completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _environment_ is not *undefined*, then
            1. Perform ! _environment_.InitializeBinding(_name_, _value_).
            1. Return ~unused~.
          1. Else,
            1. Let _lhs_ be ? ResolveBinding(_name_).
            1. Return ? PutValue(_lhs_, _value_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-iteratorbindinginitialization" oldids="sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization,sec-function-definitions-runtime-semantics-iteratorbindinginitialization,sec-arrow-function-definitions-runtime-semantics-iteratorbindinginitialization,sec-async-arrow-function-definitions-IteratorBindingInitialization" type="sdo">
      <h1>
        Runtime Semantics: IteratorBindingInitialization (
          _iteratorRecord_: an Iterator Record,
          _environment_: an Environment Record or *undefined*,
        ): either a normal completion containing ~unused~ or an abrupt completion
      </h1>
      <dl class="header">
      </dl>
      <emu-note>
        <p>When *undefined* is passed for _environment_ it indicates that a PutValue operation should be used to assign the initialization value. This is the case for formal parameter lists of non-strict functions. In that case the formal parameter bindings are preinitialized in order to deal with the possibility of multiple parameters with the same name.</p>
      </emu-note>
      <emu-grammar>ArrayBindingPattern : `[` `]`</emu-grammar>
      <emu-alg>
        1. Return ~unused~.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision `]`</emu-grammar>
      <emu-alg>
        1. Return ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. If |Elision| is present, then
          1. Perform ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
        1. Return ? IteratorBindingInitialization of |BindingRestElement| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision `]`</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorBindingInitialization of |BindingElementList| with arguments _iteratorRecord_ and _environment_.
        1. Return ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
      </emu-alg>
      <emu-grammar>ArrayBindingPattern : `[` BindingElementList `,` Elision? BindingRestElement `]`</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorBindingInitialization of |BindingElementList| with arguments _iteratorRecord_ and _environment_.
        1. If |Elision| is present, then
          1. Perform ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
        1. Return ? IteratorBindingInitialization of |BindingRestElement| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>BindingElementList : BindingElementList `,` BindingElisionElement</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorBindingInitialization of |BindingElementList| with arguments _iteratorRecord_ and _environment_.
        1. Return ? IteratorBindingInitialization of |BindingElisionElement| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>BindingElisionElement : Elision BindingElement</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorDestructuringAssignmentEvaluation of |Elision| with argument _iteratorRecord_.
        1. Return ? IteratorBindingInitialization of |BindingElement| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>SingleNameBinding : BindingIdentifier Initializer?</emu-grammar>
      <emu-alg>
        1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
        1. Let _lhs_ be ? ResolveBinding(_bindingId_, _environment_).
        1. Let _v_ be *undefined*.
        1. If _iteratorRecord_.[[Done]] is *false*, then
          1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is not ~done~, then
            1. Set _v_ to _next_.
        1. If |Initializer| is present and _v_ is *undefined*, then
          1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
            1. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
          1. Else,
            1. Let _defaultValue_ be ? Evaluation of |Initializer|.
            1. Set _v_ to ? GetValue(_defaultValue_).
        1. If _environment_ is *undefined*, return ? PutValue(_lhs_, _v_).
        1. Return ? InitializeReferencedBinding(_lhs_, _v_).
      </emu-alg>
      <emu-grammar>BindingElement : BindingPattern Initializer?</emu-grammar>
      <emu-alg>
        1. Let _v_ be *undefined*.
        1. If _iteratorRecord_.[[Done]] is *false*, then
          1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is not ~done~, then
            1. Set _v_ to _next_.
        1. If |Initializer| is present and _v_ is *undefined*, then
          1. Let _defaultValue_ be ? Evaluation of |Initializer|.
          1. Set _v_ to ? GetValue(_defaultValue_).
        1. Return ? BindingInitialization of |BindingPattern| with arguments _v_ and _environment_.
      </emu-alg>
      <emu-grammar>BindingRestElement : `...` BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Let _lhs_ be ? ResolveBinding(StringValue of |BindingIdentifier|, _environment_).
        1. Let _A_ be ! ArrayCreate(0).
        1. Let _n_ be 0.
        1. Repeat,
          1. Let _next_ be ~done~.
          1. If _iteratorRecord_.[[Done]] is *false*, then
            1. Set _next_ to ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is ~done~, then
            1. If _environment_ is *undefined*, return ? PutValue(_lhs_, _A_).
            1. Return ? InitializeReferencedBinding(_lhs_, _A_).
          1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _next_).
          1. Set _n_ to _n_ + 1.
      </emu-alg>
      <emu-grammar>BindingRestElement : `...` BindingPattern</emu-grammar>
      <emu-alg>
        1. Let _A_ be ! ArrayCreate(0).
        1. Let _n_ be 0.
        1. Repeat,
          1. Let _next_ be ~done~.
          1. If _iteratorRecord_.[[Done]] is *false*, then
            1. Set _next_ to ? IteratorStepValue(_iteratorRecord_).
          1. If _next_ is ~done~, then
            1. Return ? BindingInitialization of |BindingPattern| with arguments _A_ and _environment_.
          1. Perform ! CreateDataPropertyOrThrow(_A_, ! ToString(𝔽(_n_)), _next_).
          1. Set _n_ to _n_ + 1.
      </emu-alg>
      <emu-grammar>FormalParameters : [empty]</emu-grammar>
      <emu-alg>
        1. Return ~unused~.
      </emu-alg>
      <emu-grammar>FormalParameters : FormalParameterList `,` FunctionRestParameter</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorBindingInitialization of |FormalParameterList| with arguments _iteratorRecord_ and _environment_.
        1. Return ? IteratorBindingInitialization of |FunctionRestParameter| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>FormalParameterList : FormalParameterList `,` FormalParameter</emu-grammar>
      <emu-alg>
        1. Perform ? IteratorBindingInitialization of |FormalParameterList| with arguments _iteratorRecord_ and _environment_.
        1. Return ? IteratorBindingInitialization of |FormalParameter| with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>ArrowParameters : BindingIdentifier</emu-grammar>
      <emu-alg>
        1. Let _v_ be *undefined*.
        1. Assert: _iteratorRecord_.[[Done]] is *false*.
        1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
        1. If _next_ is not ~done~, then
          1. Set _v_ to _next_.
        1. Return ? BindingInitialization of |BindingIdentifier| with arguments _v_ and _environment_.
      </emu-alg>
      <emu-grammar>ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList</emu-grammar>
      <emu-alg>
        1. Let _formals_ be the |ArrowFormalParameters| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return ? IteratorBindingInitialization of _formals_ with arguments _iteratorRecord_ and _environment_.
      </emu-alg>
      <emu-grammar>
        AsyncArrowBindingIdentifier : BindingIdentifier
      </emu-grammar>
      <emu-alg>
        1. Let _v_ be *undefined*.
        1. Assert: _iteratorRecord_.[[Done]] is *false*.
        1. Let _next_ be ? IteratorStepValue(_iteratorRecord_).
        1. If _next_ is not ~done~, then
          1. Set _v_ to _next_.
        1. Return ? BindingInitialization of |BindingIdentifier| with arguments _v_ and _environment_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-assignmenttargettype" oldids="sec-identifiers-static-semantics-assignmenttargettype,sec-identifiers-static-semantics-isvalidsimpleassignmenttarget,sec-semantics-static-semantics-assignmenttargettype,sec-semantics-static-semantics-isvalidsimpleassignmenttarget,sec-grouping-operator-static-semantics-assignmenttargettype,sec-grouping-operator-static-semantics-isvalidsimpleassignmenttarget,sec-static-semantics-static-semantics-assignmenttargettype,sec-static-semantics-static-semantics-isvalidsimpleassignmenttarget,sec-update-expressions-static-semantics-assignmenttargettype,sec-update-expressions-static-semantics-isvalidsimpleassignmenttarget,sec-unary-operators-static-semantics-assignmenttargettype,sec-unary-operators-static-semantics-isvalidsimpleassignmenttarget,sec-exp-operator-static-semantics-assignmenttargettype,sec-exp-operator-static-semantics-isvalidsimpleassignmenttarget,sec-multiplicative-operators-static-semantics-assignmenttargettype,sec-multiplicative-operators-static-semantics-isvalidsimpleassignmenttarget,sec-additive-operators-static-semantics-assignmenttargettype,sec-additive-operators-static-semantics-isvalidsimpleassignmenttarget,sec-bitwise-shift-operators-static-semantics-assignmenttargettype,sec-bitwise-shift-operators-static-semantics-isvalidsimpleassignmenttarget,sec-relational-operators-static-semantics-assignmenttargettype,sec-relational-operators-static-semantics-isvalidsimpleassignmenttarget,sec-equality-operators-static-semantics-assignmenttargettype,sec-equality-operators-static-semantics-isvalidsimpleassignmenttarget,sec-binary-bitwise-operators-static-semantics-assignmenttargettype,sec-binary-bitwise-operators-static-semantics-isvalidsimpleassignmenttarget,sec-binary-logical-operators-static-semantics-assignmenttargettype,sec-binary-logical-operators-static-semantics-isvalidsimpleassignmenttarget,sec-conditional-operator-static-semantics-assignmenttargettype,sec-conditional-operator-static-semantics-isvalidsimpleassignmenttarget,sec-assignment-operators-static-semantics-assignmenttargettype,sec-assignment-operators-static-semantics-isvalidsimpleassignmenttarget,sec-comma-operator-static-semantics-assignmenttargettype,sec-comma-operator-static-semantics-isvalidsimpleassignmenttarget" type="sdo">
      <h1>Static Semantics: AssignmentTargetType ( ): ~simple~ or ~invalid~</h1>
      <dl class="header">
      </dl>
      <emu-grammar>IdentifierReference : Identifier</emu-grammar>
      <emu-alg>
        1. If IsStrict(this |IdentifierReference|) is *true* and the StringValue of |Identifier| is either *"eval"* or *"arguments"*, return ~invalid~.
        1. Return ~simple~.
      </emu-alg>
      <emu-grammar>
        IdentifierReference :
          `yield`
          `await`

        CallExpression :
          CallExpression `[` Expression `]`
          CallExpression `.` IdentifierName
          CallExpression `.` PrivateIdentifier

        MemberExpression :
          MemberExpression `[` Expression `]`
          MemberExpression `.` IdentifierName
          SuperProperty
          MemberExpression `.` PrivateIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return ~simple~.
      </emu-alg>
      <emu-grammar>
        PrimaryExpression :
          CoverParenthesizedExpressionAndArrowParameterList
      </emu-grammar>
      <emu-alg>
        1. Let _expr_ be the |ParenthesizedExpression| that is covered by |CoverParenthesizedExpressionAndArrowParameterList|.
        1. Return the AssignmentTargetType of _expr_.
      </emu-alg>
      <emu-grammar>
        PrimaryExpression :
          `this`
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

        CallExpression :
          CoverCallExpressionAndAsyncArrowHead
          SuperCall
          ImportCall
          CallExpression Arguments
          CallExpression TemplateLiteral

        NewExpression :
          `new` NewExpression

        MemberExpression :
          MemberExpression TemplateLiteral
          `new` MemberExpression Arguments

        NewTarget :
          `new` `.` `target`

        ImportMeta :
          `import` `.` `meta`

        LeftHandSideExpression :
          OptionalExpression

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

        ExponentiationExpression :
          UpdateExpression `**` ExponentiationExpression

        MultiplicativeExpression :
          MultiplicativeExpression MultiplicativeOperator ExponentiationExpression

        AdditiveExpression :
          AdditiveExpression `+` MultiplicativeExpression
          AdditiveExpression `-` MultiplicativeExpression

        ShiftExpression :
          ShiftExpression `&lt;&lt;` AdditiveExpression
          ShiftExpression `&gt;&gt;` AdditiveExpression
          ShiftExpression `&gt;&gt;&gt;` AdditiveExpression

        RelationalExpression :
          RelationalExpression `&lt;` ShiftExpression
          RelationalExpression `&gt;` ShiftExpression
          RelationalExpression `&lt;=` ShiftExpression
          RelationalExpression `&gt;=` ShiftExpression
          RelationalExpression `instanceof` ShiftExpression
          RelationalExpression `in` ShiftExpression
          PrivateIdentifier `in` ShiftExpression

        EqualityExpression :
          EqualityExpression `==` RelationalExpression
          EqualityExpression `!=` RelationalExpression
          EqualityExpression `===` RelationalExpression
          EqualityExpression `!==` RelationalExpression

        BitwiseANDExpression :
          BitwiseANDExpression `&amp;` EqualityExpression

        BitwiseXORExpression :
          BitwiseXORExpression `^` BitwiseANDExpression

        BitwiseORExpression :
          BitwiseORExpression `|` BitwiseXORExpression

        LogicalANDExpression :
          LogicalANDExpression `&amp;&amp;` BitwiseORExpression

        LogicalORExpression :
          LogicalORExpression `||` LogicalANDExpression

        CoalesceExpression :
          CoalesceExpressionHead `??` BitwiseORExpression

        ConditionalExpression :
          ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression

        AssignmentExpression :
          YieldExpression
          ArrowFunction
          AsyncArrowFunction
          LeftHandSideExpression `=` AssignmentExpression
          LeftHandSideExpression AssignmentOperator AssignmentExpression
          LeftHandSideExpression `&amp;&amp;=` AssignmentExpression
          LeftHandSideExpression `||=` AssignmentExpression
          LeftHandSideExpression `??=` AssignmentExpression

        Expression :
          Expression `,` AssignmentExpression
      </emu-grammar>
      <emu-alg>
        1. Return ~invalid~.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-static-semantics-propname" oldids="sec-object-initializer-static-semantics-propname,sec-method-definitions-static-semantics-propname,sec-generator-function-definitions-static-semantics-propname,sec-async-generator-function-definitions-static-semantics-propname,sec-class-definitions-static-semantics-propname,sec-async-function-definitions-static-semantics-PropName" type="sdo">
      <h1>Static Semantics: PropName ( ): a String or ~empty~</h1>
      <dl class="header">
      </dl>
      <emu-grammar>PropertyDefinition : IdentifierReference</emu-grammar>
      <emu-alg>
        1. Return the StringValue of |IdentifierReference|.
      </emu-alg>
      <emu-grammar>PropertyDefinition : `...` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>PropertyDefinition : PropertyName `:` AssignmentExpression</emu-grammar>
      <emu-alg>
        1. Return the PropName of |PropertyName|.
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
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>
        MethodDefinition :
          ClassElementName `(` UniqueFormalParameters `)` `{` FunctionBody `}`
          `get` ClassElementName `(` `)` `{` FunctionBody `}`
          `set` ClassElementName `(` PropertySetParameterList `)` `{` FunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the PropName of |ClassElementName|.
      </emu-alg>
      <emu-grammar>GeneratorMethod : `*` ClassElementName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the PropName of |ClassElementName|.
      </emu-alg>
      <emu-grammar>AsyncGeneratorMethod : `async` `*` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`</emu-grammar>
      <emu-alg>
        1. Return the PropName of |ClassElementName|.
      </emu-alg>
      <emu-grammar>ClassElement : ClassStaticBlock</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>ClassElement : `;`</emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
      <emu-grammar>
        AsyncMethod : `async` ClassElementName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
      </emu-grammar>
      <emu-alg>
        1. Return the PropName of |ClassElementName|.
      </emu-alg>
      <emu-grammar>
        FieldDefinition : ClassElementName Initializer?
      </emu-grammar>
      <emu-alg>
        1. Return the PropName of |ClassElementName|.
      </emu-alg>
      <emu-grammar>
        ClassElementName : PrivateIdentifier
      </emu-grammar>
      <emu-alg>
        1. Return ~empty~.
      </emu-alg>
    </emu-clause>
  </emu-clause>
</emu-clause>

<h1 id="sec-executable-code-and-execution-contexts"></h1>
