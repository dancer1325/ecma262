# ECMAScript Language: Scripts and Modules

<h1 id="sec-scripts"></h1>

## Scripts
* TODO:
  <h2>Syntax</h2>
  <emu-grammar type="definition">
  Script :
  ScriptBody?

      ScriptBody :
        StatementList[~Yield, ~Await, ~Return]
    </emu-grammar>

    <emu-clause id="sec-scripts-static-semantics-early-errors">
      <h1>Static Semantics: Early Errors</h1>
      <emu-grammar>Script : ScriptBody</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the LexicallyDeclaredNames of |ScriptBody| contains any duplicate entries.
        </li>
        <li>
          It is a Syntax Error if any element of the LexicallyDeclaredNames of |ScriptBody| also occurs in the VarDeclaredNames of |ScriptBody|.
        </li>
      </ul>
      <emu-grammar>ScriptBody : StatementList</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if |StatementList| Contains `super` unless the source text containing `super` is eval code that is being processed by a direct eval. Additional early error rules for `super` within direct eval are defined in <emu-xref href="#sec-performeval"></emu-xref>.
        </li>
        <li>
          It is a Syntax Error if |StatementList| Contains |NewTarget| unless the source text containing |NewTarget| is eval code that is being processed by a direct eval. Additional early error rules for |NewTarget| in direct eval are defined in <emu-xref href="#sec-performeval"></emu-xref>.
        </li>
        <li>
          It is a Syntax Error if ContainsDuplicateLabels of |StatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedBreakTarget of |StatementList| with argument « » is *true*.
        </li>
        <li>
          It is a Syntax Error if ContainsUndefinedContinueTarget of |StatementList| with arguments « » and « » is *true*.
        </li>
        <li>
          It is a Syntax Error if AllPrivateIdentifiersValid of |StatementList| with argument « » is *false* unless the source text containing |ScriptBody| is eval code that is being processed by a direct eval.
        </li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-scriptisstrict" oldids="sec-static-semantics-isstrict" type="sdo">
      <h1>Static Semantics: ScriptIsStrict ( ): a Boolean</h1>
      <dl class="header">
      </dl>
      <emu-grammar>Script : ScriptBody?</emu-grammar>
      <emu-alg>
        1. If |ScriptBody| is present and the Directive Prologue of |ScriptBody| contains a Use Strict Directive, return *true*; otherwise, return *false*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-script-semantics-runtime-semantics-evaluation" type="sdo">
      <h1>Runtime Semantics: Evaluation</h1>
      <emu-grammar>Script : [empty]</emu-grammar>
      <emu-alg>
        1. Return *undefined*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-script-records">
      <h1>Script Records</h1>

      <p>A <dfn id="script-record" variants="Script Records">Script Record</dfn> encapsulates information about a script being evaluated. Each script record contains the fields listed in <emu-xref href="#table-script-records"></emu-xref>.</p>

      <emu-table id="table-script-records" caption="Script Record Fields">
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
              [[Realm]]
            </td>
            <td>
              a Realm Record
            </td>
            <td>
              The realm within which this script was created.
            </td>
          </tr>
          <tr>
            <td>
              [[ECMAScriptCode]]
            </td>
            <td>
              a |Script| Parse Node
            </td>
            <td>
              The result of parsing the source text of this script.
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
              A map from the specifier strings imported by this script to the resolved Module Record. The list does not contain two different Records with the same [[Specifier]].
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
              Field reserved for use by host environments that need to associate additional information with a script.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-parse-script" type="abstract operation">
      <h1>
        ParseScript (
          _sourceText_: ECMAScript source text,
          _realm_: a Realm Record,
          _hostDefined_: anything,
        ): a Script Record or a non-empty List of *SyntaxError* objects
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It creates a Script Record based upon the result of parsing _sourceText_ as a |Script|.</dd>
      </dl>

      <emu-alg>
        1. Let _script_ be ParseText(_sourceText_, |Script|).
        1. If _script_ is a List of errors, return _script_.
        1. Return Script Record { [[Realm]]: _realm_, [[ECMAScriptCode]]: _script_, [[LoadedModules]]: « », [[HostDefined]]: _hostDefined_ }.
      </emu-alg>
      <emu-note>
        <p>An implementation may parse script source text and analyse it for Early Error conditions prior to evaluation of ParseScript for that script source text. However, the reporting of any errors must be deferred until the point where this specification actually performs ParseScript upon that source text.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics-scriptevaluation" type="abstract operation">
      <h1>
        ScriptEvaluation (
          _scriptRecord_: a Script Record,
        ): either a normal completion containing an ECMAScript language value or an abrupt completion
      </h1>
      <dl class="header">
      </dl>

      <emu-alg>
        1. Let _globalEnv_ be _scriptRecord_.[[Realm]].[[GlobalEnv]].
        1. Let _scriptContext_ be a new ECMAScript code execution context.
        1. Set the Function of _scriptContext_ to *null*.
        1. Set the Realm of _scriptContext_ to _scriptRecord_.[[Realm]].
        1. Set the ScriptOrModule of _scriptContext_ to _scriptRecord_.
        1. Set the VariableEnvironment of _scriptContext_ to _globalEnv_.
        1. Set the LexicalEnvironment of _scriptContext_ to _globalEnv_.
        1. Set the PrivateEnvironment of _scriptContext_ to *null*.
        1. Suspend the running execution context.
        1. Push _scriptContext_ onto the execution context stack; _scriptContext_ is now the running execution context.
        1. Let _script_ be _scriptRecord_.[[ECMAScriptCode]].
        1. Let _result_ be Completion(GlobalDeclarationInstantiation(_script_, _globalEnv_)).
        1. If _result_ is a normal completion, then
          1. Set _result_ to Completion(Evaluation of _script_).
          1. If _result_ is a normal completion and _result_.[[Value]] is ~empty~, then
            1. Set _result_ to NormalCompletion(*undefined*).
        1. Suspend _scriptContext_ and remove it from the execution context stack.
        1. Assert: The execution context stack is not empty.
        1. Resume the context that is now on the top of the execution context stack as the running execution context.
        1. Return ? _result_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-globaldeclarationinstantiation" type="abstract operation">
      <h1>
        GlobalDeclarationInstantiation (
          _script_: a |Script| Parse Node,
          _env_: a Global Environment Record,
        ): either a normal completion containing ~unused~ or a throw completion
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>_script_ is the |Script| for which the execution context is being established. _env_ is the global environment in which bindings are to be created.</dd>
      </dl>
      <emu-note>
        <p>When an execution context is established for evaluating scripts, declarations are instantiated in the current global environment. Each global binding declared in the code is instantiated.</p>
      </emu-note>
      <p>It performs the following steps when called:</p>
      <!--
        WARNING: If you add, remove, rename, or repurpose any variable names
                 within this algorithm, you may need to update
                 #sec-web-compat-globaldeclarationinstantiation accordingly.
      -->
      <emu-alg>
        1. Let _lexNames_ be the LexicallyDeclaredNames of _script_.
        1. Let _varNames_ be the VarDeclaredNames of _script_.
        1. For each element _name_ of _lexNames_, do
          1. If _env_.HasVarDeclaration(_name_) is *true*, throw a *SyntaxError* exception.
          1. If _env_.HasLexicalDeclaration(_name_) is *true*, throw a *SyntaxError* exception.
          1. Let _hasRestrictedGlobal_ be ? _env_.HasRestrictedGlobalProperty(_name_).
          1. If _hasRestrictedGlobal_ is *true*, throw a *SyntaxError* exception.
        1. For each element _name_ of _varNames_, do
          1. If _env_.HasLexicalDeclaration(_name_) is *true*, throw a *SyntaxError* exception.
        1. Let _varDeclarations_ be the VarScopedDeclarations of _script_.
        1. Let _functionsToInitialize_ be a new empty List.
        1. Let _declaredFunctionNames_ be a new empty List.
        1. For each element _d_ of _varDeclarations_, in reverse List order, do
          1. If _d_ is not either a |VariableDeclaration|, a |ForBinding|, or a |BindingIdentifier|, then
            1. Assert: _d_ is either a |FunctionDeclaration|, a |GeneratorDeclaration|, an |AsyncFunctionDeclaration|, or an |AsyncGeneratorDeclaration|.
            1. NOTE: If there are multiple function declarations for the same name, the last declaration is used.
            1. Let _fn_ be the sole element of the BoundNames of _d_.
            1. If _declaredFunctionNames_ does not contain _fn_, then
              1. Let _fnDefinable_ be ? _env_.CanDeclareGlobalFunction(_fn_).
              1. If _fnDefinable_ is *false*, throw a *TypeError* exception.
              1. Append _fn_ to _declaredFunctionNames_.
              1. Insert _d_ as the first element of _functionsToInitialize_.
        1. Let _declaredVarNames_ be a new empty List.
        1. For each element _d_ of _varDeclarations_, do
          1. If _d_ is either a |VariableDeclaration|, a |ForBinding|, or a |BindingIdentifier|, then
            1. For each String _vn_ of the BoundNames of _d_, do
              1. If _declaredFunctionNames_ does not contain _vn_, then
                1. Let _vnDefinable_ be ? _env_.CanDeclareGlobalVar(_vn_).
                1. If _vnDefinable_ is *false*, throw a *TypeError* exception.
                1. If _declaredVarNames_ does not contain _vn_, then
                  1. Append _vn_ to _declaredVarNames_.
        1. NOTE: No abnormal terminations occur after this algorithm step if the global object is an ordinary object. However, if the global object is a Proxy exotic object it may exhibit behaviours that cause abnormal terminations in some of the following steps.
        1. [id="step-globaldeclarationinstantiation-web-compat-insertion-point"] NOTE: Annex <emu-xref href="#sec-web-compat-globaldeclarationinstantiation"></emu-xref> adds additional steps at this point.
        1. Let _lexDeclarations_ be the LexicallyScopedDeclarations of _script_.
        1. Let _privateEnv_ be *null*.
        1. For each element _d_ of _lexDeclarations_, do
          1. NOTE: Lexically declared names are only instantiated here but not initialized.
          1. For each element _dn_ of the BoundNames of _d_, do
            1. If IsConstantDeclaration of _d_ is *true*, then
              1. Perform ? <emu-meta effects="user-code">_env_.CreateImmutableBinding</emu-meta>(_dn_, *true*).
            1. Else,
              1. Perform ? <emu-meta effects="user-code">_env_.CreateMutableBinding</emu-meta>(_dn_, *false*).
        1. For each Parse Node _f_ of _functionsToInitialize_, do
          1. Let _fn_ be the sole element of the BoundNames of _f_.
          1. Let _fo_ be InstantiateFunctionObject of _f_ with arguments _env_ and _privateEnv_.
          1. Perform ? <emu-meta effects="user-code">_env_.CreateGlobalFunctionBinding</emu-meta>(_fn_, _fo_, *false*).
        1. For each String _vn_ of _declaredVarNames_, do
          1. Perform ? <emu-meta effects="user-code">_env_.CreateGlobalVarBinding</emu-meta>(_vn_, *false*).
        1. Return ~unused~.
      </emu-alg>
      <emu-note>
        <p>Early errors specified in <emu-xref href="#sec-scripts-static-semantics-early-errors"></emu-xref> prevent name conflicts between function/var declarations and let/const/class declarations as well as redeclaration of let/const/class bindings for declaration contained within a single |Script|. However, such conflicts and redeclarations that span more than one |Script| are detected as runtime errors during GlobalDeclarationInstantiation. If any such errors are detected, no bindings are instantiated for the script. However, if the global object is defined using Proxy exotic objects then the runtime tests for conflicting declarations may be unreliable resulting in an abrupt completion and some global declarations not being instantiated. If this occurs, the code for the |Script| is not evaluated.</p>
        <p>Unlike explicit var or function declarations, properties that are directly created on the global object result in global bindings that may be shadowed by let/const/class declarations.</p>
      </emu-note>
    </emu-clause>

<h2 id="sec-modules"></h2>

## Modules
* Syntax
    ```
      Module :
        ModuleBody?

      ModuleBody :
        ModuleItemList

      ModuleItemList :
        ModuleItem
        ModuleItemList ModuleItem

      ModuleItem :
        ImportDeclaration
        ExportDeclaration
        StatementListItem[~Yield, +Await, ~Return]

      ModuleExportName :
        IdentifierName
        StringLiteral
    ```

<h3 id="sec-module-semantics"></h3>
### Module Semantics
* TODO:
  <emu-clause id="sec-module-semantics-static-semantics-early-errors">
  <h1>Static Semantics: Early Errors</h1>
  <emu-grammar>ModuleBody : ModuleItemList</emu-grammar>
  <ul>
  <li>
  It is a Syntax Error if the LexicallyDeclaredNames of |ModuleItemList| contains any duplicate entries.
  </li>
  <li>
  It is a Syntax Error if any element of the LexicallyDeclaredNames of |ModuleItemList| also occurs in the VarDeclaredNames of |ModuleItemList|.
  </li>
  <li>
  It is a Syntax Error if the ExportedNames of |ModuleItemList| contains any duplicate entries.
  </li>
  <li>
  It is a Syntax Error if any element of the ExportedBindings of |ModuleItemList| does not also occur in either the VarDeclaredNames of |ModuleItemList|, or the LexicallyDeclaredNames of |ModuleItemList|.
  </li>
  <li>
  It is a Syntax Error if |ModuleItemList| Contains `super`.
  </li>
  <li>
  It is a Syntax Error if |ModuleItemList| Contains |NewTarget|.
  </li>
  <li>
  It is a Syntax Error if ContainsDuplicateLabels of |ModuleItemList| with argument « » is *true*.
  </li>
  <li>
  It is a Syntax Error if ContainsUndefinedBreakTarget of |ModuleItemList| with argument « » is *true*.
  </li>
  <li>
  It is a Syntax Error if ContainsUndefinedContinueTarget of |ModuleItemList| with arguments « » and « » is *true*.
  </li>
  <li>
  It is a Syntax Error if AllPrivateIdentifiersValid of |ModuleItemList| with argument « » is *false*.
  </li>
  </ul>
  <emu-note>
  <p>The duplicate ExportedNames rule implies that multiple `export default` |ExportDeclaration| items within a |ModuleBody| is a Syntax Error. Additional error conditions relating to conflicting or duplicate declarations are checked during module linking prior to evaluation of a |Module|. If any such errors are detected the |Module| is not evaluated.</p>
  </emu-note>
  <emu-grammar>ModuleExportName : StringLiteral</emu-grammar>
  <ul>
  <li>It is a Syntax Error if IsStringWellFormedUnicode(SV of |StringLiteral|) is *false*.</li>
  </ul>
  </emu-clause>

      <emu-clause id="sec-importedlocalnames" type="abstract operation">
        <h1>
          Static Semantics: ImportedLocalNames (
            _importEntries_: a List of ImportEntry Records,
          ): a List of Strings
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It creates a List of all of the local name bindings defined by _importEntries_.</dd>
        </dl>
        <emu-alg>
          1. Let _localNames_ be a new empty List.
          1. For each ImportEntry Record _i_ of _importEntries_, do
            1. Append _i_.[[LocalName]] to _localNames_.
          1. Return _localNames_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-modulerequests" oldids="sec-module-semantics-static-semantics-modulerequests,sec-imports-static-semantics-modulerequests,sec-exports-static-semantics-modulerequests" type="sdo">
        <h1>Static Semantics: ModuleRequests ( ): a List of Strings</h1>
        <dl class="header">
        </dl>
        <emu-grammar>Module : [empty]</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ModuleItemList : ModuleItem</emu-grammar>
        <emu-alg>
          1. Return the ModuleRequests of |ModuleItem|.
        </emu-alg>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _moduleNames_ be the ModuleRequests of |ModuleItemList|.
          1. Let _additionalNames_ be the ModuleRequests of |ModuleItem|.
          1. For each String _name_ of _additionalNames_, do
            1. If _moduleNames_ does not contain _name_, then
              1. Append _name_ to _moduleNames_.
          1. Return _moduleNames_.
        </emu-alg>
        <emu-grammar>ModuleItem : StatementListItem</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ImportDeclaration : `import` ImportClause FromClause `;`</emu-grammar>
        <emu-alg>
          1. Return the ModuleRequests of |FromClause|.
        </emu-alg>
        <emu-grammar>ModuleSpecifier : StringLiteral</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the SV of |StringLiteral|.
        </emu-alg>
        <emu-grammar>
          ExportDeclaration : `export` ExportFromClause FromClause `;`
        </emu-grammar>
        <emu-alg>
          1. Return the ModuleRequests of |FromClause|.
        </emu-alg>
        <emu-grammar>
          ExportDeclaration :
            `export` NamedExports `;`
            `export` VariableStatement
            `export` Declaration
            `export` `default` HoistableDeclaration
            `export` `default` ClassDeclaration
            `export` `default` AssignmentExpression `;`
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-abstract-module-records">
        <h1>Abstract Module Records</h1>
        <p>A <dfn variants="Module Records">Module Record</dfn> encapsulates structural information about the imports and exports of a single module. This information is used to link the imports and exports of sets of connected modules. A Module Record includes four fields that are only used when evaluating a module.</p>
        <p>For specification purposes Module Record values are values of the Record specification type and can be thought of as existing in a simple object-oriented hierarchy where Module Record is an abstract class with both abstract and concrete subclasses. This specification defines the abstract subclass named Cyclic Module Record and its concrete subclass named Source Text Module Record. Other specifications and implementations may define additional Module Record subclasses corresponding to alternative module definition facilities that they defined.</p>
        <p>Module Record defines the fields listed in <emu-xref href="#table-module-record-fields"></emu-xref>. All Module Definition subclasses include at least those fields. Module Record also defines the abstract method list in <emu-xref href="#table-abstract-methods-of-module-records"></emu-xref>. All Module definition subclasses must provide concrete implementations of these abstract methods.</p>
        <emu-table id="table-module-record-fields" caption="Module Record Fields" oldids="table-36">
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
                [[Realm]]
              </td>
              <td>
                a Realm Record
              </td>
              <td>
                The Realm within which this module was created.
              </td>
            </tr>
            <tr>
              <td>
                [[Environment]]
              </td>
              <td>
                a Module Environment Record or ~empty~
              </td>
              <td>
                The Environment Record containing the top level bindings for this module. This field is set when the module is linked.
              </td>
            </tr>
            <tr>
              <td>
                [[Namespace]]
              </td>
              <td>
                an Object or ~empty~
              </td>
              <td>
                The Module Namespace Object (<emu-xref href="#sec-module-namespace-objects"></emu-xref>) if one has been created for this module.
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
                Field reserved for use by host environments that need to associate additional information with a module.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-table id="table-abstract-methods-of-module-records" caption="Abstract Methods of Module Records" oldids="table-37">
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
                LoadRequestedModules( [ _hostDefined_ ] )
              </td>
              <td>
                <p>Prepares the module for linking by recursively loading all its dependencies, and returns a promise.</p>
              </td>
            </tr>
            <tr>
              <td>
                GetExportedNames([_exportStarSet_])
              </td>
              <td>
                <p>Return a list of all names that are either directly or indirectly exported from this module.</p>
                <p>LoadRequestedModules must have completed successfully prior to invoking this method.</p>
              </td>
            </tr>
            <tr>
              <td>
                ResolveExport(_exportName_ [, _resolveSet_])
              </td>
              <td>
                <p>Return the binding of a name exported by this module. Bindings are represented by a <dfn id="resolvedbinding-record" variants="ResolvedBinding Records">ResolvedBinding Record</dfn>, of the form { [[Module]]: Module Record, [[BindingName]]: String | ~namespace~ }. If the export is a Module Namespace Object without a direct binding in any module, [[BindingName]] will be set to ~namespace~. Return *null* if the name cannot be resolved, or ~ambiguous~ if multiple bindings were found.</p>
                <p>Each time this operation is called with a specific _exportName_, _resolveSet_ pair as arguments it must return the same result.</p>
                <p>LoadRequestedModules must have completed successfully prior to invoking this method.</p>
              </td>
            </tr>
            <tr>
              <td>
                Link()
              </td>
              <td>
                <p>Prepare the module for evaluation by transitively resolving all module dependencies and creating a Module Environment Record.</p>
                <p>LoadRequestedModules must have completed successfully prior to invoking this method.</p>
              </td>
            </tr>
            <tr>
              <td>
                Evaluate()
              </td>
              <td>
                <p>Returns a promise for the evaluation of this module and its dependencies, resolving on successful evaluation or if it has already been evaluated successfully, and rejecting for an evaluation error or if it has already been evaluated unsuccessfully. If the promise is rejected, hosts are expected to handle the promise rejection and rethrow the evaluation error.</p>
                <p>Link must have completed successfully prior to invoking this method.</p>
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-cyclic-module-records">
        <h1>Cyclic Module Records</h1>
        <p>A <dfn id="cyclic-module-record" variants="Cyclic Module Records">Cyclic Module Record</dfn> is used to represent information about a module that can participate in dependency cycles with other modules that are subclasses of the Cyclic Module Record type. Module Records that are not subclasses of the Cyclic Module Record type must not participate in dependency cycles with Source Text Module Records.</p>
        <p>In addition to the fields defined in <emu-xref href="#table-module-record-fields"></emu-xref> Cyclic Module Records have the additional fields listed in <emu-xref href="#table-cyclic-module-fields"></emu-xref></p>
        <emu-table id="table-cyclic-module-fields" caption="Additional Fields of Cyclic Module Records">
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
                [[Status]]
              </td>
              <td>
                ~new~, ~unlinked~, ~linking~, ~linked~, ~evaluating~, ~evaluating-async~, or ~evaluated~
              </td>
              <td>
                Initially ~new~. Transitions to ~unlinked~, ~linking~, ~linked~, ~evaluating~, possibly ~evaluating-async~, ~evaluated~ (in that order) as the module progresses throughout its lifecycle. ~evaluating-async~ indicates this module is queued to execute on completion of its asynchronous dependencies or it is a module whose [[HasTLA]] field is *true* that has been executed and is pending top-level completion.
              </td>
            </tr>
            <tr>
              <td>
                [[EvaluationError]]
              </td>
              <td>
                a throw completion or ~empty~
              </td>
              <td>
                A throw completion representing the exception that occurred during evaluation. *undefined* if no exception occurred or if [[Status]] is not ~evaluated~.
              </td>
            </tr>
            <tr>
              <td>
                [[DFSIndex]]
              </td>
              <td>
                an integer or ~empty~
              </td>
              <td>
                Auxiliary field used during Link and Evaluate only. If [[Status]] is either ~linking~ or ~evaluating~, this non-negative number records the point at which the module was first visited during the depth-first traversal of the dependency graph.
              </td>
            </tr>
            <tr>
              <td>
                [[DFSAncestorIndex]]
              </td>
              <td>
                an integer or ~empty~
              </td>
              <td>
                Auxiliary field used during Link and Evaluate only. If [[Status]] is either ~linking~ or ~evaluating~, this is either the module's own [[DFSIndex]] or that of an "earlier" module in the same strongly connected component.
              </td>
            </tr>
            <tr>
              <td>
                [[RequestedModules]]
              </td>
              <td>
                a List of Strings
              </td>
              <td>
                A List of all the |ModuleSpecifier| strings used by the module represented by this record to request the importation of a module. The List is in source text occurrence order.
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
                A map from the specifier strings used by the module represented by this record to request the importation of a module to the resolved Module Record. The list does not contain two different Records with the same [[Specifier]].
              </td>
            </tr>
            <tr>
              <td>
                [[CycleRoot]]
              </td>
              <td>
                a Cyclic Module Record or ~empty~
              </td>
              <td>
                The first visited module of the cycle, the root DFS ancestor of the strongly connected component. For a module not in a cycle, this would be the module itself. Once Evaluate has completed, a module's [[DFSAncestorIndex]] is the [[DFSIndex]] of its [[CycleRoot]].
              </td>
            </tr>
            <tr>
              <td>
                [[HasTLA]]
              </td>
              <td>
                a Boolean
              </td>
              <td>
                Whether this module is individually asynchronous (for example, if it's a Source Text Module Record containing a top-level await). Having an asynchronous dependency does not mean this field is *true*. This field must not change after the module is parsed.
              </td>
            </tr>
            <tr>
              <td>
                [[AsyncEvaluation]]
              </td>
              <td>
                a Boolean
              </td>
              <td>
                Whether this module is either itself asynchronous or has an asynchronous dependency. Note: The order in which this field is set is used to order queued executions, see <emu-xref href="#sec-async-module-execution-fulfilled"></emu-xref>.
              </td>
            </tr>
            <tr>
              <td>
                [[TopLevelCapability]]
              </td>
              <td>
                a PromiseCapability Record or ~empty~
              </td>
              <td>
                If this module is the [[CycleRoot]] of some cycle, and Evaluate() was called on some module in that cycle, this field contains the PromiseCapability Record for that entire evaluation. It is used to settle the Promise object that is returned from the Evaluate() abstract method. This field will be ~empty~ for any dependencies of that module, unless a top-level Evaluate() has been initiated for some of those dependencies.
              </td>
            </tr>
            <tr>
              <td>
                [[AsyncParentModules]]
              </td>
              <td>
                a List of Cyclic Module Records
              </td>
              <td>
                If this module or a dependency has [[HasTLA]] *true*, and execution is in progress, this tracks the parent importers of this module for the top-level execution job. These parent modules will not start executing before this module has successfully completed execution.
              </td>
            </tr>
            <tr>
              <td>
                [[PendingAsyncDependencies]]
              </td>
              <td>
                an integer or ~empty~
              </td>
              <td>
                If this module has any asynchronous dependencies, this tracks the number of asynchronous dependency modules remaining to execute for this module. A module with asynchronous dependencies will be executed when this field reaches 0 and there are no execution errors.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>In addition to the methods defined in <emu-xref href="#table-abstract-methods-of-module-records"></emu-xref> Cyclic Module Records have the additional methods listed in <emu-xref href="#table-cyclic-module-methods"></emu-xref></p>
        <emu-table id="table-cyclic-module-methods" caption="Additional Abstract Methods of Cyclic Module Records">
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
                InitializeEnvironment()
              </td>
              <td>
                Initialize the Environment Record of the module, including resolving all imported bindings, and create the module's execution context.
              </td>
            </tr>
            <tr>
              <td>
                ExecuteModule( [ _promiseCapability_ ] )
              </td>
              <td>
                Evaluate the module's code within its execution context. If this module has *true* in [[HasTLA]], then a PromiseCapability Record is passed as an argument, and the method is expected to resolve or reject the given capability. In this case, the method must not throw an exception, but instead reject the PromiseCapability Record if necessary.
              </td>
            </tr>
          </table>
        </emu-table>

        <p>A <dfn id="graphloadingstate-record" variants="GraphLoadingState Records">GraphLoadingState Record</dfn> is a Record that contains information about the loading process of a module graph. It's used to continue loading after a call to HostLoadImportedModule. Each GraphLoadingState Record has the fields defined in <emu-xref href="#table-graphloadingstate-record-fields"></emu-xref>:</p>
        <emu-table id="table-graphloadingstate-record-fields" caption="GraphLoadingState Record Fields">
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
                [[PromiseCapability]]
              </td>
              <td>
                a PromiseCapability Record
              </td>
              <td>
                The promise to resolve when the loading process finishes.
              </td>
            </tr>
            <tr>
              <td>
                [[IsLoading]]
              </td>
              <td>
                a Boolean
              </td>
              <td>
                It is true if the loading process has not finished yet, neither successfully nor with an error.
              </td>
            </tr>
            <tr>
              <td>
                [[PendingModulesCount]]
              </td>
              <td>
                a non-negative integer
              </td>
              <td>
                It tracks the number of pending HostLoadImportedModule calls.
              </td>
            </tr>
            <tr>
              <td>
                [[Visited]]
              </td>
              <td>
                a List of Cyclic Module Records
              </td>
              <td>
                It is a list of the Cyclic Module Records that have been already loaded by the current loading process, to avoid infinite loops with circular dependencies.
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
                It contains host-defined data to pass from the LoadRequestedModules caller to HostLoadImportedModule.
              </td>
            </tr>
          </table>
        </emu-table>

        <emu-clause id="sec-LoadRequestedModules" type="concrete method">
          <h1>
            LoadRequestedModules (
              optional _hostDefined_: anything,
            ): a Promise
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Cyclic Module Record _module_</dd>

            <dt>description</dt>
            <dd>It populates the [[LoadedModules]] of all the Module Records in the dependency graph of _module_ (most of the work is done by the auxiliary function InnerModuleLoading). It takes an optional _hostDefined_ parameter that is passed to the HostLoadImportedModule hook.</dd>
          </dl>

          <emu-alg>
            1. If _hostDefined_ is not present, let _hostDefined_ be ~empty~.
            1. Let _pc_ be ! NewPromiseCapability(%Promise%).
            1. Let _state_ be the GraphLoadingState Record { [[IsLoading]]: *true*, [[PendingModulesCount]]: 1, [[Visited]]: « », [[PromiseCapability]]: _pc_, [[HostDefined]]: _hostDefined_ }.
            1. Perform InnerModuleLoading(_state_, _module_).
            1. Return _pc_.[[Promise]].
          </emu-alg>

          <emu-note>
            The _hostDefined_ parameter can be used to pass additional information necessary to fetch the imported modules. It is used, for example, by HTML to set the correct fetch destination for <code>&lt;link rel="preload" as="..."&gt;</code> tags.
            <code>import()</code> expressions never set the _hostDefined_ parameter.
          </emu-note>

          <emu-clause id="sec-InnerModuleLoading" type="abstract operation">
            <h1>
              InnerModuleLoading (
                _state_: a GraphLoadingState Record,
                _module_: a Module Record,
              ): ~unused~
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It is used by LoadRequestedModules to recursively perform the actual loading process for _module_'s dependency graph.</dd>
            </dl>

            <emu-alg>
              1. Assert: _state_.[[IsLoading]] is *true*.
              1. If _module_ is a Cyclic Module Record, _module_.[[Status]] is ~new~, and _state_.[[Visited]] does not contain _module_, then
                1. Append _module_ to _state_.[[Visited]].
                1. Let _requestedModulesCount_ be the number of elements in _module_.[[RequestedModules]].
                1. Set _state_.[[PendingModulesCount]] to _state_.[[PendingModulesCount]] + _requestedModulesCount_.
                1. For each String _required_ of _module_.[[RequestedModules]], do
                  1. If _module_.[[LoadedModules]] contains a Record whose [[Specifier]] is _required_, then
                    1. Let _record_ be that Record.
                    1. Perform InnerModuleLoading(_state_, _record_.[[Module]]).
                  1. Else,
                    1. Perform HostLoadImportedModule(_module_, _required_, _state_.[[HostDefined]], _state_).
                    1. NOTE: HostLoadImportedModule will call FinishLoadingImportedModule, which re-enters the graph loading process through ContinueModuleLoading.
                  1. If _state_.[[IsLoading]] is *false*, return ~unused~.
              1. Assert: _state_.[[PendingModulesCount]] ≥ 1.
              1. Set _state_.[[PendingModulesCount]] to _state_.[[PendingModulesCount]] - 1.
              1. If _state_.[[PendingModulesCount]] = 0, then
                1. Set _state_.[[IsLoading]] to *false*.
                1. For each Cyclic Module Record _loaded_ of _state_.[[Visited]], do
                  1. If _loaded_.[[Status]] is ~new~, set _loaded_.[[Status]] to ~unlinked~.
                1. Perform ! Call(_state_.[[PromiseCapability]].[[Resolve]], *undefined*, « *undefined* »).
              1. Return ~unused~.
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-ContinueModuleLoading" type="abstract operation">
            <h1>
              ContinueModuleLoading (
                _state_: a GraphLoadingState Record,
                _moduleCompletion_: either a normal completion containing a Module Record or a throw completion,
              ): ~unused~
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It is used to re-enter the loading process after a call to HostLoadImportedModule.</dd>
            </dl>

            <emu-alg>
              1. If _state_.[[IsLoading]] is *false*, return ~unused~.
              1. If _moduleCompletion_ is a normal completion, then
                1. Perform InnerModuleLoading(_state_, _moduleCompletion_.[[Value]]).
              1. Else,
                1. Set _state_.[[IsLoading]] to *false*.
                1. Perform ! Call(_state_.[[PromiseCapability]].[[Reject]], *undefined*, « _moduleCompletion_.[[Value]] »).
              1. Return ~unused~.
            </emu-alg>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-moduledeclarationlinking" type="concrete method" oldids="sec-moduledeclarationinstantiation">
          <h1>Link ( ): either a normal completion containing ~unused~ or a throw completion</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Cyclic Module Record _module_</dd>

            <dt>description</dt>
            <dd>On success, Link transitions this module's [[Status]] from ~unlinked~ to ~linked~. On failure, an exception is thrown and this module's [[Status]] remains ~unlinked~. (Most of the work is done by the auxiliary function InnerModuleLinking.)</dd>
          </dl>

          <emu-alg>
            1. Assert: _module_.[[Status]] is one of ~unlinked~, ~linked~, ~evaluating-async~, or ~evaluated~.
            1. Let _stack_ be a new empty List.
            1. Let _result_ be Completion(InnerModuleLinking(_module_, _stack_, 0)).
            1. If _result_ is an abrupt completion, then
              1. For each Cyclic Module Record _m_ of _stack_, do
                1. Assert: _m_.[[Status]] is ~linking~.
                1. Set _m_.[[Status]] to ~unlinked~.
              1. Assert: _module_.[[Status]] is ~unlinked~.
              1. Return ? _result_.
            1. Assert: _module_.[[Status]] is one of ~linked~, ~evaluating-async~, or ~evaluated~.
            1. Assert: _stack_ is empty.
            1. Return ~unused~.
          </emu-alg>

          <emu-clause id="sec-InnerModuleLinking" type="abstract operation" oldids="sec-innermoduleinstantiation">
            <h1>
              InnerModuleLinking (
                _module_: a Module Record,
                _stack_: a List of Cyclic Module Records,
                _index_: a non-negative integer,
              ): either a normal completion containing a non-negative integer or a throw completion
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It is used by Link to perform the actual linking process for _module_, as well as recursively on all other modules in the dependency graph. The _stack_ and _index_ parameters, as well as a module's [[DFSIndex]] and [[DFSAncestorIndex]] fields, keep track of the depth-first search (DFS) traversal. In particular, [[DFSAncestorIndex]] is used to discover strongly connected components (SCCs), such that all modules in an SCC transition to ~linked~ together.</dd>
            </dl>

            <emu-alg>
              1. If _module_ is not a Cyclic Module Record, then
                1. Perform ? _module_.Link().
                1. Return _index_.
              1. If _module_.[[Status]] is one of ~linking~, ~linked~, ~evaluating-async~, or ~evaluated~, then
                1. Return _index_.
              1. Assert: _module_.[[Status]] is ~unlinked~.
              1. Set _module_.[[Status]] to ~linking~.
              1. Set _module_.[[DFSIndex]] to _index_.
              1. Set _module_.[[DFSAncestorIndex]] to _index_.
              1. Set _index_ to _index_ + 1.
              1. Append _module_ to _stack_.
              1. For each String _required_ of _module_.[[RequestedModules]], do
                1. Let _requiredModule_ be GetImportedModule(_module_, _required_).
                1. Set _index_ to ? InnerModuleLinking(_requiredModule_, _stack_, _index_).
                1. If _requiredModule_ is a Cyclic Module Record, then
                  1. Assert: _requiredModule_.[[Status]] is one of ~linking~, ~linked~, ~evaluating-async~, or ~evaluated~.
                  1. Assert: _requiredModule_.[[Status]] is ~linking~ if and only if _stack_ contains _requiredModule_.
                  1. If _requiredModule_.[[Status]] is ~linking~, then
                    1. Set _module_.[[DFSAncestorIndex]] to min(_module_.[[DFSAncestorIndex]], _requiredModule_.[[DFSAncestorIndex]]).
              1. Perform ? _module_.InitializeEnvironment().
              1. Assert: _module_ occurs exactly once in _stack_.
              1. Assert: _module_.[[DFSAncestorIndex]] ≤ _module_.[[DFSIndex]].
              1. If _module_.[[DFSAncestorIndex]] = _module_.[[DFSIndex]], then
                1. Let _done_ be *false*.
                1. Repeat, while _done_ is *false*,
                  1. Let _requiredModule_ be the last element of _stack_.
                  1. Remove the last element of _stack_.
                  1. Assert: _requiredModule_ is a Cyclic Module Record.
                  1. Set _requiredModule_.[[Status]] to ~linked~.
                  1. If _requiredModule_ and _module_ are the same Module Record, set _done_ to *true*.
              1. Return _index_.
            </emu-alg>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-moduleevaluation" type="concrete method">
          <h1>Evaluate ( ): a Promise</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Cyclic Module Record _module_</dd>

            <dt>description</dt>
            <dd>Evaluate transitions this module's [[Status]] from ~linked~ to either ~evaluating-async~ or ~evaluated~. The first time it is called on a module in a given strongly connected component, Evaluate creates and returns a Promise which resolves when the module has finished evaluating. This Promise is stored in the [[TopLevelCapability]] field of the [[CycleRoot]] for the component. Future invocations of Evaluate on any module in the component return the same Promise. (Most of the work is done by the auxiliary function InnerModuleEvaluation.)</dd>
          </dl>

          <emu-alg>
            1. Assert: This call to Evaluate is not happening at the same time as another call to Evaluate within the surrounding agent.
            1. Assert: _module_.[[Status]] is one of ~linked~, ~evaluating-async~, or ~evaluated~.
            1. If _module_.[[Status]] is either ~evaluating-async~ or ~evaluated~, set _module_ to _module_.[[CycleRoot]].
            1. If _module_.[[TopLevelCapability]] is not ~empty~, then
              1. Return _module_.[[TopLevelCapability]].[[Promise]].
            1. Let _stack_ be a new empty List.
            1. Let _capability_ be ! NewPromiseCapability(%Promise%).
            1. Set _module_.[[TopLevelCapability]] to _capability_.
            1. Let _result_ be Completion(InnerModuleEvaluation(_module_, _stack_, 0)).
            1. If _result_ is an abrupt completion, then
              1. For each Cyclic Module Record _m_ of _stack_, do
                1. Assert: _m_.[[Status]] is ~evaluating~.
                1. Set _m_.[[Status]] to ~evaluated~.
                1. Set _m_.[[EvaluationError]] to _result_.
              1. Assert: _module_.[[Status]] is ~evaluated~.
              1. Assert: _module_.[[EvaluationError]] and _result_ are the same Completion Record.
              1. Perform ! Call(_capability_.[[Reject]], *undefined*, « _result_.[[Value]] »).
            1. Else,
              1. Assert: _module_.[[Status]] is either ~evaluating-async~ or ~evaluated~.
              1. Assert: _module_.[[EvaluationError]] is ~empty~.
              1. If _module_.[[AsyncEvaluation]] is *false*, then
                1. Assert: _module_.[[Status]] is ~evaluated~.
                1. Perform ! Call(_capability_.[[Resolve]], *undefined*, « *undefined* »).
              1. Assert: _stack_ is empty.
            1. Return _capability_.[[Promise]].
          </emu-alg>

          <emu-clause id="sec-innermoduleevaluation" type="abstract operation">
            <h1>
              InnerModuleEvaluation (
                _module_: a Module Record,
                _stack_: a List of Cyclic Module Records,
                _index_: a non-negative integer,
              ): either a normal completion containing a non-negative integer or a throw completion
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It is used by Evaluate to perform the actual evaluation process for _module_, as well as recursively on all other modules in the dependency graph. The _stack_ and _index_ parameters, as well as _module_'s [[DFSIndex]] and [[DFSAncestorIndex]] fields, are used the same way as in InnerModuleLinking.</dd>
            </dl>

            <emu-alg>
              1. If _module_ is not a Cyclic Module Record, then
                1. Let _promise_ be ! _module_.Evaluate().
                1. Assert: _promise_.[[PromiseState]] is not ~pending~.
                1. If _promise_.[[PromiseState]] is ~rejected~, then
                  1. Return ThrowCompletion(_promise_.[[PromiseResult]]).
                1. Return _index_.
              1. If _module_.[[Status]] is either ~evaluating-async~ or ~evaluated~, then
                1. If _module_.[[EvaluationError]] is ~empty~, return _index_.
                1. Otherwise, return ? _module_.[[EvaluationError]].
              1. If _module_.[[Status]] is ~evaluating~, return _index_.
              1. Assert: _module_.[[Status]] is ~linked~.
              1. Set _module_.[[Status]] to ~evaluating~.
              1. Set _module_.[[DFSIndex]] to _index_.
              1. Set _module_.[[DFSAncestorIndex]] to _index_.
              1. Set _module_.[[PendingAsyncDependencies]] to 0.
              1. Set _index_ to _index_ + 1.
              1. Append _module_ to _stack_.
              1. For each String _required_ of _module_.[[RequestedModules]], do
                1. Let _requiredModule_ be GetImportedModule(_module_, _required_).
                1. Set _index_ to ? InnerModuleEvaluation(_requiredModule_, _stack_, _index_).
                1. If _requiredModule_ is a Cyclic Module Record, then
                  1. Assert: _requiredModule_.[[Status]] is one of ~evaluating~, ~evaluating-async~, or ~evaluated~.
                  1. Assert: _requiredModule_.[[Status]] is ~evaluating~ if and only if _stack_ contains _requiredModule_.
                  1. If _requiredModule_.[[Status]] is ~evaluating~, then
                    1. Set _module_.[[DFSAncestorIndex]] to min(_module_.[[DFSAncestorIndex]], _requiredModule_.[[DFSAncestorIndex]]).
                  1. Else,
                    1. Set _requiredModule_ to _requiredModule_.[[CycleRoot]].
                    1. Assert: _requiredModule_.[[Status]] is either ~evaluating-async~ or ~evaluated~.
                    1. If _requiredModule_.[[EvaluationError]] is not ~empty~, return ? _requiredModule_.[[EvaluationError]].
                  1. If _requiredModule_.[[AsyncEvaluation]] is *true*, then
                    1. Set _module_.[[PendingAsyncDependencies]] to _module_.[[PendingAsyncDependencies]] + 1.
                    1. Append _module_ to _requiredModule_.[[AsyncParentModules]].
              1. If _module_.[[PendingAsyncDependencies]] > 0 or _module_.[[HasTLA]] is *true*, then
                1. Assert: _module_.[[AsyncEvaluation]] is *false* and was never previously set to *true*.
                1. Set _module_.[[AsyncEvaluation]] to *true*.
                1. NOTE: The order in which module records have their [[AsyncEvaluation]] fields transition to *true* is significant. (See <emu-xref href="#sec-async-module-execution-fulfilled"></emu-xref>.)
                1. If _module_.[[PendingAsyncDependencies]] = 0, perform ExecuteAsyncModule(_module_).
              1. Else,
                1. Perform ? <emu-meta effects="user-code">_module_.ExecuteModule()</emu-meta>.
              1. Assert: _module_ occurs exactly once in _stack_.
              1. Assert: _module_.[[DFSAncestorIndex]] ≤ _module_.[[DFSIndex]].
              1. If _module_.[[DFSAncestorIndex]] = _module_.[[DFSIndex]], then
                1. Let _done_ be *false*.
                1. Repeat, while _done_ is *false*,
                  1. Let _requiredModule_ be the last element of _stack_.
                  1. Remove the last element of _stack_.
                  1. Assert: _requiredModule_ is a Cyclic Module Record.
                  1. If _requiredModule_.[[AsyncEvaluation]] is *false*, set _requiredModule_.[[Status]] to ~evaluated~.
                  1. Otherwise, set _requiredModule_.[[Status]] to ~evaluating-async~.
                  1. If _requiredModule_ and _module_ are the same Module Record, set _done_ to *true*.
                  1. Set _requiredModule_.[[CycleRoot]] to _module_.
              1. Return _index_.
            </emu-alg>
            <emu-note>
              <p>A module is ~evaluating~ while it is being traversed by InnerModuleEvaluation. A module is ~evaluated~ on execution completion or ~evaluating-async~ during execution if its [[HasTLA]] field is *true* or if it has asynchronous dependencies.</p>
            </emu-note>
            <emu-note>
              <p>Any modules depending on a module of an asynchronous cycle when that cycle is not ~evaluating~ will instead depend on the execution of the root of the cycle via [[CycleRoot]]. This ensures that the cycle state can be treated as a single strongly connected component through its root module state.</p>
            </emu-note>
          </emu-clause>

          <emu-clause id="sec-execute-async-module" type="abstract operation">
            <h1>
              ExecuteAsyncModule (
                _module_: a Cyclic Module Record,
              ): ~unused~
            </h1>
            <dl class="header">
            </dl>

            <emu-alg>
              1. Assert: _module_.[[Status]] is either ~evaluating~ or ~evaluating-async~.
              1. Assert: _module_.[[HasTLA]] is *true*.
              1. Let _capability_ be ! NewPromiseCapability(%Promise%).
              1. Let _fulfilledClosure_ be a new Abstract Closure with no parameters that captures _module_ and performs the following steps when called:
                1. Perform AsyncModuleExecutionFulfilled(_module_).
                1. Return *undefined*.
              1. Let _onFulfilled_ be CreateBuiltinFunction(_fulfilledClosure_, 0, *""*, « »).
              1. Let _rejectedClosure_ be a new Abstract Closure with parameters (_error_) that captures _module_ and performs the following steps when called:
                1. Perform AsyncModuleExecutionRejected(_module_, _error_).
                1. Return *undefined*.
              1. Let _onRejected_ be CreateBuiltinFunction(_rejectedClosure_, 0, *""*, « »).
              1. Perform PerformPromiseThen(_capability_.[[Promise]], _onFulfilled_, _onRejected_).
              1. Perform ! <emu-meta effects="user-code">_module_.ExecuteModule</emu-meta>(_capability_).
              1. Return ~unused~.
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-gather-available-ancestors" type="abstract operation">
            <h1>
              GatherAvailableAncestors (
                _module_: a Cyclic Module Record,
                _execList_: a List of Cyclic Module Records,
              ): ~unused~
            </h1>
            <dl class="header">
            </dl>
            <emu-alg>
              1. For each Cyclic Module Record _m_ of _module_.[[AsyncParentModules]], do
                1. If _execList_ does not contain _m_ and _m_.[[CycleRoot]].[[EvaluationError]] is ~empty~, then
                  1. Assert: _m_.[[Status]] is ~evaluating-async~.
                  1. Assert: _m_.[[EvaluationError]] is ~empty~.
                  1. Assert: _m_.[[AsyncEvaluation]] is *true*.
                  1. Assert: _m_.[[PendingAsyncDependencies]] > 0.
                  1. Set _m_.[[PendingAsyncDependencies]] to _m_.[[PendingAsyncDependencies]] - 1.
                  1. If _m_.[[PendingAsyncDependencies]] = 0, then
                    1. Append _m_ to _execList_.
                    1. If _m_.[[HasTLA]] is *false*, perform GatherAvailableAncestors(_m_, _execList_).
              1. Return ~unused~.
            </emu-alg>
            <emu-note>
              <p>When an asynchronous execution for a root _module_ is fulfilled, this function determines the list of modules which are able to synchronously execute together on this completion, populating them in _execList_.</p>
            </emu-note>
          </emu-clause>

          <emu-clause id="sec-async-module-execution-fulfilled" type="abstract operation">
            <h1>
              AsyncModuleExecutionFulfilled (
                _module_: a Cyclic Module Record,
              ): ~unused~
            </h1>
            <dl class="header">
            </dl>
            <emu-alg>
              1. If _module_.[[Status]] is ~evaluated~, then
                1. Assert: _module_.[[EvaluationError]] is not ~empty~.
                1. Return ~unused~.
              1. Assert: _module_.[[Status]] is ~evaluating-async~.
              1. Assert: _module_.[[AsyncEvaluation]] is *true*.
              1. Assert: _module_.[[EvaluationError]] is ~empty~.
              1. Set _module_.[[AsyncEvaluation]] to *false*.
              1. Set _module_.[[Status]] to ~evaluated~.
              1. If _module_.[[TopLevelCapability]] is not ~empty~, then
                1. Assert: _module_.[[CycleRoot]] and _module_ are the same Module Record.
                1. Perform ! Call(_module_.[[TopLevelCapability]].[[Resolve]], *undefined*, « *undefined* »).
              1. Let _execList_ be a new empty List.
              1. Perform GatherAvailableAncestors(_module_, _execList_).
              1. Let _sortedExecList_ be a List whose elements are the elements of _execList_, in the order in which they had their [[AsyncEvaluation]] fields set to *true* in InnerModuleEvaluation.
              1. Assert: All elements of _sortedExecList_ have their [[AsyncEvaluation]] field set to *true*, [[PendingAsyncDependencies]] field set to 0, and [[EvaluationError]] field set to ~empty~.
              1. For each Cyclic Module Record _m_ of _sortedExecList_, do
                1. If _m_.[[Status]] is ~evaluated~, then
                  1. Assert: _m_.[[EvaluationError]] is not ~empty~.
                1. Else if _m_.[[HasTLA]] is *true*, then
                  1. Perform ExecuteAsyncModule(_m_).
                1. Else,
                  1. Let _result_ be <emu-meta effects="user-code">_m_.ExecuteModule()</emu-meta>.
                  1. If _result_ is an abrupt completion, then
                    1. Perform AsyncModuleExecutionRejected(_m_, _result_.[[Value]]).
                  1. Else,
                    1. Set _m_.[[AsyncEvaluation]] to *false*.
                    1. Set _m_.[[Status]] to ~evaluated~.
                    1. If _m_.[[TopLevelCapability]] is not ~empty~, then
                      1. Assert: _m_.[[CycleRoot]] and _m_ are the same Module Record.
                      1. Perform ! Call(_m_.[[TopLevelCapability]].[[Resolve]], *undefined*, « *undefined* »).
              1. Return ~unused~.
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-async-module-execution-rejected" type="abstract operation">
            <h1>
              AsyncModuleExecutionRejected (
                _module_: a Cyclic Module Record,
                _error_: an ECMAScript language value,
              ): ~unused~
            </h1>
            <dl class="header">
            </dl>
            <emu-alg>
              1. If _module_.[[Status]] is ~evaluated~, then
                1. Assert: _module_.[[EvaluationError]] is not ~empty~.
                1. Return ~unused~.
              1. Assert: _module_.[[Status]] is ~evaluating-async~.
              1. Assert: _module_.[[AsyncEvaluation]] is *true*.
              1. Assert: _module_.[[EvaluationError]] is ~empty~.
              1. Set _module_.[[EvaluationError]] to ThrowCompletion(_error_).
              1. Set _module_.[[Status]] to ~evaluated~.
              1. Set _module_.[[AsyncEvaluation]] to *false*.
              1. NOTE: _module_.[[AsyncEvaluation]] is set to *false* for symmetry with AsyncModuleExecutionFulfilled. In InnerModuleEvaluation, the value of a module's [[AsyncEvaluation]] internal slot is unused when its [[EvaluationError]] internal slot is not ~empty~.
              1. For each Cyclic Module Record _m_ of _module_.[[AsyncParentModules]], do
                1. Perform AsyncModuleExecutionRejected(_m_, _error_).
              1. If _module_.[[TopLevelCapability]] is not ~empty~, then
                1. Assert: _module_.[[CycleRoot]] and _module_ are the same Module Record.
                1. Perform ! Call(_module_.[[TopLevelCapability]].[[Reject]], *undefined*, « _error_ »).
              1. Return ~unused~.
            </emu-alg>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-example-cyclic-module-record-graphs">
          <h1>Example Cyclic Module Record Graphs</h1>

          <p>This non-normative section gives a series of examples of the linking and evaluation of a few common module graphs, with a specific focus on how errors can occur.</p>

          <p>First consider the following simple module graph:</p>

          <emu-figure id="figure-module-graph-simple" caption="A simple module graph">
            <img alt="A module graph in which module A depends on module B, and module B depends on module C" width="121" height="211" src="img/module-graph-simple.svg">
          </emu-figure>

          <p>Let's first assume that there are no error conditions. When a host first calls _A_.LoadRequestedModules(), this will complete successfully by assumption, and recursively load the dependencies of _B_ and _C_ as well (respectively, _C_ and none), and then set _A_.[[Status]] = _B_.[[Status]] = _C_.[[Status]] = ~unlinked~. Then, when the host calls _A_.Link(), it will complete successfully (again by assumption) such that _A_.[[Status]] = _B_.[[Status]] = _C_.[[Status]] = linked. These preparatory steps can be performed at any time. Later, when the host is ready to incur any possible side effects of the modules, it can call _A_.Evaluate(), which will complete successfully, returning a Promise resolving to *undefined* (again by assumption), recursively having evaluated first _C_ and then _B_. Each module's [[Status]] at this point will be ~evaluated~.</p>

          <p>Consider then cases involving linking errors, after a successful call to _A_.LoadRequestedModules(). If InnerModuleLinking of _C_ succeeds but, thereafter, fails for _B_, for example because it imports something that _C_ does not provide, then the original _A_.Link() will fail, and both _A_ and _B_'s [[Status]] remain ~unlinked~. _C_'s [[Status]] has become ~linked~, though.</p>

          <p>Finally, consider a case involving evaluation errors after a successful call to Link(). If InnerModuleEvaluation of _C_ succeeds but, thereafter, fails for _B_, for example because _B_ contains code that throws an exception, then the original _A_.Evaluate() will fail, returning a rejected Promise. The resulting exception will be recorded in both _A_ and _B_'s [[EvaluationError]] fields, and their [[Status]] will become ~evaluated~. _C_ will also become ~evaluated~ but, in contrast to _A_ and _B_, will remain without an [[EvaluationError]], as it successfully completed evaluation. Storing the exception ensures that any time a host tries to reuse _A_ or _B_ by calling their Evaluate() method, it will encounter the same exception. (Hosts are not required to reuse Cyclic Module Records; similarly, hosts are not required to expose the exception objects thrown by these methods. However, the specification enables such uses.)</p>

          <p>Now consider a different type of error condition:</p>

          <emu-figure id="figure-module-graph-missing" caption="A module graph with an unresolvable module">
            <img alt="A module graph in which module A depends on a missing (unresolvable) module, represented by ???" width="121" height="121" src="img/module-graph-missing.svg">
          </emu-figure>

          <p>In this scenario, module _A_ declares a dependency on some other module, but no Module Record exists for that module, i.e. HostLoadImportedModule calls FinishLoadingImportedModule with an exception when asked for it. This could occur for a variety of reasons, such as the corresponding resource not existing, or the resource existing but ParseModule returning some errors when trying to parse the resulting source text. Hosts can choose to expose the cause of failure via the completion they pass to FinishLoadingImportedModule. In any case, this exception causes a loading failure, which results in _A_'s [[Status]] remaining ~new~.</p>

          <p>The difference here between loading, linking and evaluation errors is due to the following characteristic:</p>
          <ul>
            <li>Evaluation must be only performed once, as it can cause side effects; it is thus important to remember whether evaluation has already been performed, even if unsuccessfully. (In the error case, it makes sense to also remember the exception because otherwise subsequent Evaluate() calls would have to synthesize a new one.)</li>
            <li>Linking, on the other hand, is side-effect-free, and thus even if it fails, it can be retried at a later time with no issues.</li>
            <li>Loading closely interacts with the host, and it may be desirable for some of them to allow users to retry failed loads (for example, if the failure is caused by temporarily bad network conditions).</li>
          </ul>

          <p>Now, consider a module graph with a cycle:</p>

          <emu-figure id="figure-module-graph-cycle" caption="A cyclic module graph">
            <img alt="A module graph in which module A depends on module B and C, but module B also depends on module A" width="181" height="121" src="img/module-graph-cycle.svg">
          </emu-figure>

          <p>Here we assume that the entry point is module _A_, so that the host proceeds by calling _A_.LoadRequestedModules(), which performs InnerModuleLoading on _A_. This in turn calls InnerModuleLoading on _B_ and _C_. Because of the cycle, this again triggers InnerModuleLoading on _A_, but at this point it is a no-op since _A_'s dependencies loading has already been triggered during this LoadRequestedModules process. When all the modules in the graph have been successfully loaded, their [[Status]] transitions from ~new~ to ~unlinked~ at the same time.</p>

          <p>Then the host proceeds by calling _A_.Link(), which performs InnerModuleLinking on _A_. This in turn calls InnerModuleLinking on _B_. Because of the cycle, this again triggers InnerModuleLinking on _A_, but at this point it is a no-op since _A_.[[Status]] is already ~linking~. _B_.[[Status]] itself remains ~linking~ when control gets back to _A_ and InnerModuleLinking is triggered on _C_. After this returns with _C_.[[Status]] being ~linked~, both _A_ and _B_ transition from ~linking~ to ~linked~ together; this is by design, since they form a strongly connected component. It's possible to transition the status of modules in the same SCC at the same time because during this phase the module graph is traversed with a depth-first search.</p>

          <p>An analogous story occurs for the evaluation phase of a cyclic module graph, in the success case.</p>

          <p>Now consider a case where _A_ has a linking error; for example, it tries to import a binding from _C_ that does not exist. In that case, the above steps still occur, including the early return from the second call to InnerModuleLinking on _A_. However, once we unwind back to the original InnerModuleLinking on _A_, it fails during InitializeEnvironment, namely right after _C_.ResolveExport(). The thrown *SyntaxError* exception propagates up to _A_.Link, which resets all modules that are currently on its _stack_ (these are always exactly the modules that are still ~linking~). Hence both _A_ and _B_ become ~unlinked~. Note that _C_ is left as ~linked~.</p>

          <p>Alternatively, consider a case where _A_ has an evaluation error; for example, its source code throws an exception. In that case, the evaluation-time analogue of the above steps still occurs, including the early return from the second call to InnerModuleEvaluation on _A_. However, once we unwind back to the original InnerModuleEvaluation on _A_, it fails by assumption. The exception thrown propagates up to _A_.Evaluate(), which records the error in all modules that are currently on its _stack_ (i.e., the modules that are still ~evaluating~) as well as via [[AsyncParentModules]], which form a chain for modules which contain or depend on top-level `await` through the whole dependency graph through the AsyncModuleExecutionRejected algorithm. Hence both _A_ and _B_ become ~evaluated~ and the exception is recorded in both _A_ and _B_'s [[EvaluationError]] fields, while _C_ is left as ~evaluated~ with no [[EvaluationError]].</p>

          <p>Lastly, consider a module graph with a cycle, where all modules complete asynchronously:</p>
          <emu-figure id="figure-module-graph-cycle-async" caption="An asynchronous cyclic module graph">
            <img alt="A module graph in which module A depends on module B and C, module B depends on module D, module C depends on module D and E, and module D depends on module A" width="241" height="211" src="img/module-graph-cycle-async.svg">
          </emu-figure>
          <p>Loading and linking happen as before, and all modules end up with [[Status]] set to ~linked~.</p>

          <p>Calling _A_.Evaluate() calls InnerModuleEvaluation on _A_, _B_, and _D_, which all transition to ~evaluating~. Then InnerModuleEvaluation is called on _A_ again, which is a no-op because it is already ~evaluating~. At this point, _D_.[[PendingAsyncDependencies]] is 0, so ExecuteAsyncModule(_D_) is called and we call _D_.ExecuteModule with a new PromiseCapability tracking the asynchronous execution of _D_. We unwind back to the InnerModuleEvaluation on _B_, setting _B_.[[PendingAsyncDependencies]] to 1 and _B_.[[AsyncEvaluation]] to *true*. We unwind back to the original InnerModuleEvaluation on _A_, setting _A_.[[PendingAsyncDependencies]] to 1. In the next iteration of the loop over _A_'s dependencies, we call InnerModuleEvaluation on _C_ and thus on _D_ (again a no-op) and _E_. As _E_ has no dependencies and is not part of a cycle, we call ExecuteAsyncModule(_E_) in the same manner as _D_ and _E_ is immediately removed from the stack. We unwind once more to the original InnerModuleEvaluation on _A_, setting _C_.[[AsyncEvaluation]] to *true*. Now we finish the loop over _A_'s dependencies, set _A_.[[AsyncEvaluation]] to *true*, and remove the entire strongly connected component from the stack, transitioning all of the modules to ~evaluating-async~ at once. At this point, the fields of the modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-1"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-1" caption="Module fields after the initial Evaluate() call">
            <table>
              <thead>
                <tr>
                  <th class="corner-cell">
                    <span class="column">Field</span>
                    <div class="slash">
                    </div>
                    <span class="row">Module</span>
                  </th>
                  <th>_A_</th>
                  <th>_B_</th>
                  <th>_C_</th>
                  <th>_D_</th>
                  <th>_E_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
                <td>1</td>
                <td>3</td>
                <td>2</td>
                <td>4</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>4</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluating-async~</td>
                <td>~evaluating-async~</td>
                <td>~evaluating-async~</td>
                <td>~evaluating-async~</td>
                <td>~evaluating-async~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
                <td>*true*</td>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
                <td>« _A_ »</td>
                <td>« _A_ »</td>
                <td>« _B_, _C_ »</td>
                <td>« _C_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>2 (_B_ and _C_)</td>
                <td>1 (_D_)</td>
                <td>2 (_D_ and _E_)</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>Let us assume that _E_ finishes executing first. When that happens, AsyncModuleExecutionFulfilled is called, _E_.[[Status]] is set to ~evaluated~ and _C_.[[PendingAsyncDependencies]] is decremented to become 1. The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-2"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-2" caption="Module fields after module _E_ finishes executing">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_C_</th>
                  <th>_E_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>3</td>
                <td>4</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>4</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluating-async~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« _A_ »</td>
                <td>« _C_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>1 (_D_)</td>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>_D_ is next to finish (as it was the only module that was still executing). When that happens, AsyncModuleExecutionFulfilled is called again and _D_.[[Status]] is set to ~evaluated~. Then _B_.[[PendingAsyncDependencies]] is decremented to become 0, ExecuteAsyncModule is called on _B_, and it starts executing. _C_.[[PendingAsyncDependencies]] is also decremented to become 0, and _C_ starts executing (potentially in parallel to _B_ if _B_ contains an `await`). The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-3"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-3" caption="Module fields after module _D_ finishes executing">
            <table>
              <thead>
                <tr>
                  <th>Fields / Module</th>
                  <th>_B_</th>
                  <th>_C_</th>
                  <th>_D_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>1</td>
                <td>3</td>
                <td>2</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluating-async~</td>
                <td>~evaluating-async~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« _A_ »</td>
                <td>« _A_ »</td>
                <td>« _B_, _C_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>Let us assume that _C_ finishes executing next. When that happens, AsyncModuleExecutionFulfilled is called again, _C_.[[Status]] is set to ~evaluated~ and _A_.[[PendingAsyncDependencies]] is decremented to become 1. The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-4"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-4" caption="Module fields after module _C_ finishes executing">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                  <th>_C_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
                <td>3</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluating-async~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
                <td>« _A_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>1 (_B_)</td>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>Then, _B_ finishes executing. When that happens, AsyncModuleExecutionFulfilled is called again and _B_.[[Status]] is set to ~evaluated~. _A_.[[PendingAsyncDependencies]] is decremented to become 0, so ExecuteAsyncModule is called and it starts executing. The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-5"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-5" caption="Module fields after module _B_ finishes executing">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                  <th>_B_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
                <td>1</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluating-async~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
                <td>« _A_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>Finally, _A_ finishes executing. When that happens, AsyncModuleExecutionFulfilled is called again and _A_.[[Status]] is set to ~evaluated~. At this point, the Promise in _A_.[[TopLevelCapability]] (which was returned from _A_.Evaluate()) is resolved, and this concludes the handling of this module graph. The fields of the updated module are as given in <emu-xref href="#table-module-graph-cycle-async-fields-6"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-6" caption="Module fields after module _A_ finishes executing">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>0</td>
              </tr>
            </table>
          </emu-table>

          <p>Alternatively, consider a failure case where _C_ fails execution and returns an error before _B_ has finished executing. When that happens, AsyncModuleExecutionRejected is called, which sets _C_.[[Status]] to ~evaluated~ and _C_.[[EvaluationError]] to the error. It then propagates this error to all of the AsyncParentModules by performing AsyncModuleExecutionRejected on each of them. The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-7"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-7" caption="Module fields after module _C_ finishes with an error">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                  <th>_C_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
                <td>3</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluated~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
                <td>« _A_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>1 (_B_)</td>
                <th>0</th>
              </tr>
              <tr>
                <th>[[EvaluationError]]</th>
                <td>~empty~</td>
                <td>_C_'s evaluation error</td>
              </tr>
            </table>
          </emu-table>

          <p>_A_ will be rejected with the same error as _C_ since _C_ will call AsyncModuleExecutionRejected on _A_ with _C_'s error. _A_.[[Status]] is set to ~evaluated~. At this point the Promise in _A_.[[TopLevelCapability]] (which was returned from _A_.Evaluate()) is rejected. The fields of the updated module are as given in <emu-xref href="#table-module-graph-cycle-async-fields-8"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-8" caption="Module fields after module _A_ is rejected">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>0</td>
              </tr>
              <tr>
                <th>[[EvaluationError]]</th>

                <td>_C_'s Evaluation Error</td>
              </tr>
            </table>
          </emu-table>

          <p>Then, _B_ finishes executing without an error. When that happens, AsyncModuleExecutionFulfilled is called again and _B_.[[Status]] is set to ~evaluated~. GatherAvailableAncestors is called on _B_. However, _A_.[[CycleRoot]] is _A_ which has an evaluation error, so it will not be added to the returned _sortedExecList_ and AsyncModuleExecutionFulfilled will return without further processing. Any future importer of _B_ will resolve the rejection of _B_.[[CycleRoot]].[[EvaluationError]] from the evaluation error from _C_ that was set on the cycle root _A_. The fields of the updated modules are as given in <emu-xref href="#table-module-graph-cycle-async-fields-9"></emu-xref>.</p>

          <emu-table id="table-module-graph-cycle-async-fields-9" caption="Module fields after module _B_ finishes executing in an erroring graph">
            <table>
              <thead>
                <tr>
                  <th>Fields / Modules</th>
                  <th>_A_</th>
                  <th>_B_</th>
                </tr>
              </thead>
              <tr>
                <th>[[DFSIndex]]</th>
                <td>0</td>
                <td>1</td>
              </tr>
              <tr>
                <th>[[DFSAncestorIndex]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[Status]]</th>
                <td>~evaluated~</td>
                <td>~evaluated~</td>
              </tr>
              <tr>
                <th>[[AsyncEvaluation]]</th>
                <td>*true*</td>
                <td>*true*</td>
              </tr>
              <tr>
                <th>[[AsyncParentModules]]</th>
                <td>« »</td>
                <td>« _A_ »</td>
              </tr>
              <tr>
                <th>[[PendingAsyncDependencies]]</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>[[EvaluationError]]</th>
                <td>_C_'s Evaluation Error</td>
                <td>~empty~</td>
              </tr>
            </table>
          </emu-table>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-source-text-module-records">
        <h1>Source Text Module Records</h1>

        <p>A <dfn id="sourctextmodule-record" variants="Source Text Module Records">Source Text Module Record</dfn> is used to represent information about a module that was defined from ECMAScript source text (<emu-xref href="#sec-ecmascript-language-source-code"></emu-xref>) that was parsed using the goal symbol |Module|. Its fields contain digested information about the names that are imported and exported by the module, and its concrete methods use these digests to link and evaluate the module.</p>

        <p>A Source Text Module Record can exist in a module graph with other subclasses of the abstract Module Record type, and can participate in cycles with other subclasses of the Cyclic Module Record type.</p>

        <p>In addition to the fields defined in <emu-xref href="#table-cyclic-module-fields"></emu-xref>, Source Text Module Records have the additional fields listed in <emu-xref href="#table-additional-fields-of-source-text-module-records"></emu-xref>. Each of these fields is initially set in ParseModule.</p>
        <emu-table id="table-additional-fields-of-source-text-module-records" caption="Additional Fields of Source Text Module Records" oldids="table-38">
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
                [[ECMAScriptCode]]
              </td>
              <td>
                a Parse Node
              </td>
              <td>
                The result of parsing the source text of this module using |Module| as the goal symbol.
              </td>
            </tr>
            <tr>
              <td>
                [[Context]]
              </td>
              <td>
                an ECMAScript code execution context or ~empty~
              </td>
              <td>
                The execution context associated with this module. It is ~empty~ until the module's environment has been initialized.
              </td>
            </tr>
            <tr>
              <td>
                [[ImportMeta]]
              </td>
              <td>
                an Object or ~empty~
              </td>
              <td>
                An object exposed through the `import.meta` meta property. It is ~empty~ until it is accessed by ECMAScript code.
              </td>
            </tr>
            <tr>
              <td>
                [[ImportEntries]]
              </td>
              <td>
                a List of ImportEntry Records
              </td>
              <td>
                A List of ImportEntry records derived from the code of this module.
              </td>
            </tr>
            <tr>
              <td>
                [[LocalExportEntries]]
              </td>
              <td>
                a List of ExportEntry Records
              </td>
              <td>
                A List of ExportEntry records derived from the code of this module that correspond to declarations that occur within the module.
              </td>
            </tr>
            <tr>
              <td>
                [[IndirectExportEntries]]
              </td>
              <td>
                a List of ExportEntry Records
              </td>
              <td>
                A List of ExportEntry records derived from the code of this module that correspond to reexported imports that occur within the module or exports from `export * as namespace` declarations.
              </td>
            </tr>
            <tr>
              <td>
                [[StarExportEntries]]
              </td>
              <td>
                a List of ExportEntry Records
              </td>
              <td>
                A List of ExportEntry records derived from the code of this module that correspond to `export *` declarations that occur within the module, not including `export * as namespace` declarations.
              </td>
            </tr>
          </table>
        </emu-table>
        <p>An <dfn id="importentry-record" variants="ImportEntry Records">ImportEntry Record</dfn> is a Record that digests information about a single declarative import. Each ImportEntry Record has the fields defined in <emu-xref href="#table-importentry-record-fields"></emu-xref>:</p>
        <emu-table id="table-importentry-record-fields" caption="ImportEntry Record Fields" oldids="table-39">
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
                [[ModuleRequest]]
              </td>
              <td>
                a String
              </td>
              <td>
                String value of the |ModuleSpecifier| of the |ImportDeclaration|.
              </td>
            </tr>
            <tr>
              <td>
                [[ImportName]]
              </td>
              <td>
                a String or ~namespace-object~
              </td>
              <td>
                The name under which the desired binding is exported by the module identified by [[ModuleRequest]]. The value ~namespace-object~ indicates that the import request is for the target module's namespace object.
              </td>
            </tr>
            <tr>
              <td>
                [[LocalName]]
              </td>
              <td>
                a String
              </td>
              <td>
                The name that is used to locally access the imported value from within the importing module.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p><emu-xref href="#table-import-forms-mapping-to-importentry-records"></emu-xref> gives examples of ImportEntry records fields used to represent the syntactic import forms:</p>
          <emu-table id="table-import-forms-mapping-to-importentry-records" caption="Import Forms Mappings to ImportEntry Records" informative oldids="table-40">
            <table>
              <thead>
                <tr>
                  <th>
                    Import Statement Form
                  </th>
                  <th>
                    [[ModuleRequest]]
                  </th>
                  <th>
                    [[ImportName]]
                  </th>
                  <th>
                    [[LocalName]]
                  </th>
                </tr>
              </thead>
              <tr>
                <td>
                  `import v from "mod";`
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  *"default"*
                </td>
                <td>
                  *"v"*
                </td>
              </tr>
              <tr>
                <td>
                  `import * as ns from "mod";`
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  ~namespace-object~
                </td>
                <td>
                  *"ns"*
                </td>
              </tr>
              <tr>
                <td>
                  `import {x} from "mod";`
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *"x"*
                </td>
              </tr>
              <tr>
                <td>
                  `import {x as v} from "mod";`
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *"v"*
                </td>
              </tr>
              <tr>
                <td>
                  `import "mod";`
                </td>
                <td colspan="3">
                  An ImportEntry Record is not created.
                </td>
              </tr>
            </table>
          </emu-table>
        </emu-note>
        <p>An <dfn id="exportentry-record" variants="ExportEntry Records">ExportEntry Record</dfn> is a Record that digests information about a single declarative export. Each ExportEntry Record has the fields defined in <emu-xref href="#table-exportentry-records"></emu-xref>:</p>
        <emu-table id="table-exportentry-records" caption="ExportEntry Record Fields" oldids="table-41">
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
                [[ExportName]]
              </td>
              <td>
                a String or *null*
              </td>
              <td>
                The name used to export this binding by this module.
              </td>
            </tr>
            <tr>
              <td>
                [[ModuleRequest]]
              </td>
              <td>
                a String or *null*
              </td>
              <td>
                The String value of the |ModuleSpecifier| of the |ExportDeclaration|. *null* if the |ExportDeclaration| does not have a |ModuleSpecifier|.
              </td>
            </tr>
            <tr>
              <td>
                [[ImportName]]
              </td>
              <td>
                a String, *null*, ~all~, or ~all-but-default~
              </td>
              <td>
                The name under which the desired binding is exported by the module identified by [[ModuleRequest]]. *null* if the |ExportDeclaration| does not have a |ModuleSpecifier|. ~all~ is used for `export * as ns from "mod"` declarations. ~all-but-default~ is used for `export * from "mod"` declarations.
              </td>
            </tr>
            <tr>
              <td>
                [[LocalName]]
              </td>
              <td>
                a String or *null*
              </td>
              <td>
                The name that is used to locally access the exported value from within the importing module. *null* if the exported value is not locally accessible from within the module.
              </td>
            </tr>
          </table>
        </emu-table>
        <emu-note>
          <p><emu-xref href="#table-export-forms-mapping-to-exportentry-records"></emu-xref> gives examples of the ExportEntry record fields used to represent the syntactic export forms:</p>
          <emu-table id="table-export-forms-mapping-to-exportentry-records" caption="Export Forms Mappings to ExportEntry Records" informative oldids="table-42">
            <table>
              <thead>
                <tr>
                  <th>
                    Export Statement Form
                  </th>
                  <th>
                    [[ExportName]]
                  </th>
                  <th>
                    [[ModuleRequest]]
                  </th>
                  <th>
                    [[ImportName]]
                  </th>
                  <th>
                    [[LocalName]]
                  </th>
                </tr>
              </thead>
              <tr>
                <td>
                  `export var v;`
                </td>
                <td>
                  *"v"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"v"*
                </td>
              </tr>
              <tr>
                <td>
                  `export default function f() {}`
                </td>
                <td>
                  *"default"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"f"*
                </td>
              </tr>
              <tr>
                <td>
                  `export default function () {}`
                </td>
                <td>
                  *"default"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"\*default\*"*
                </td>
              </tr>
              <tr>
                <td>
                  `export default 42;`
                </td>
                <td>
                  *"default"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"\*default\*"*
                </td>
              </tr>
              <tr>
                <td>
                  `export {x};`
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"x"*
                </td>
              </tr>
              <tr>
                <td>
                  `export {v as x};`
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"v"*
                </td>
              </tr>
              <tr>
                <td>
                  `export {x} from "mod";`
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *null*
                </td>
              </tr>
              <tr>
                <td>
                  `export {v as x} from "mod";`
                </td>
                <td>
                  *"x"*
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  *"v"*
                </td>
                <td>
                  *null*
                </td>
              </tr>
              <tr>
                <td>
                  `export * from "mod";`
                </td>
                <td>
                  *null*
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  ~all-but-default~
                </td>
                <td>
                  *null*
                </td>
              </tr>
              <tr>
                <td>
                  `export * as ns from "mod";`
                </td>
                <td>
                  *"ns"*
                </td>
                <td>
                  *"mod"*
                </td>
                <td>
                  ~all~
                </td>
                <td>
                  *null*
                </td>
              </tr>
            </table>
          </emu-table>
        </emu-note>
        <p>The following definitions specify the required concrete methods and other abstract operations for Source Text Module Records</p>

        <emu-clause id="sec-parsemodule" type="abstract operation">
          <h1>
            ParseModule (
              _sourceText_: ECMAScript source text,
              _realm_: a Realm Record,
              _hostDefined_: anything,
            ): a Source Text Module Record or a non-empty List of *SyntaxError* objects
          </h1>
          <dl class="header">
            <dt>description</dt>
            <dd>It creates a Source Text Module Record based upon the result of parsing _sourceText_ as a |Module|.</dd>
          </dl>
          <emu-alg>
            1. Let _body_ be ParseText(_sourceText_, |Module|).
            1. If _body_ is a List of errors, return _body_.
            1. Let _requestedModules_ be the ModuleRequests of _body_.
            1. Let _importEntries_ be the ImportEntries of _body_.
            1. Let _importedBoundNames_ be ImportedLocalNames(_importEntries_).
            1. Let _indirectExportEntries_ be a new empty List.
            1. Let _localExportEntries_ be a new empty List.
            1. Let _starExportEntries_ be a new empty List.
            1. Let _exportEntries_ be the ExportEntries of _body_.
            1. For each ExportEntry Record _ee_ of _exportEntries_, do
              1. If _ee_.[[ModuleRequest]] is *null*, then
                1. If _importedBoundNames_ does not contain _ee_.[[LocalName]], then
                  1. Append _ee_ to _localExportEntries_.
                1. Else,
                  1. Let _ie_ be the element of _importEntries_ whose [[LocalName]] is _ee_.[[LocalName]].
                  1. If _ie_.[[ImportName]] is ~namespace-object~, then
                    1. NOTE: This is a re-export of an imported module namespace object.
                    1. Append _ee_ to _localExportEntries_.
                  1. Else,
                    1. NOTE: This is a re-export of a single name.
                    1. Append the ExportEntry Record { [[ModuleRequest]]: _ie_.[[ModuleRequest]], [[ImportName]]: _ie_.[[ImportName]], [[LocalName]]: *null*, [[ExportName]]: _ee_.[[ExportName]] } to _indirectExportEntries_.
              1. Else if _ee_.[[ImportName]] is ~all-but-default~, then
                1. Assert: _ee_.[[ExportName]] is *null*.
                1. Append _ee_ to _starExportEntries_.
              1. Else,
                1. Append _ee_ to _indirectExportEntries_.
            1. Let _async_ be _body_ Contains `await`.
            1. Return Source Text Module Record { [[Realm]]: _realm_, [[Environment]]: ~empty~, [[Namespace]]: ~empty~, [[CycleRoot]]: ~empty~, [[HasTLA]]: _async_, [[AsyncEvaluation]]: *false*, [[TopLevelCapability]]: ~empty~, [[AsyncParentModules]]: « », [[PendingAsyncDependencies]]: ~empty~, [[Status]]: ~new~, [[EvaluationError]]: ~empty~, [[HostDefined]]: _hostDefined_, [[ECMAScriptCode]]: _body_, [[Context]]: ~empty~, [[ImportMeta]]: ~empty~, [[RequestedModules]]: _requestedModules_, [[LoadedModules]]: « », [[ImportEntries]]: _importEntries_, [[LocalExportEntries]]: _localExportEntries_, [[IndirectExportEntries]]: _indirectExportEntries_, [[StarExportEntries]]: _starExportEntries_, [[DFSIndex]]: ~empty~, [[DFSAncestorIndex]]: ~empty~ }.
          </emu-alg>
          <emu-note>
            <p>An implementation may parse module source text and analyse it for Early Error conditions prior to the evaluation of ParseModule for that module source text. However, the reporting of any errors must be deferred until the point where this specification actually performs ParseModule upon that source text.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-getexportednames" type="concrete method">
          <h1>
            GetExportedNames (
              optional _exportStarSet_: a List of Source Text Module Records,
            ): a List of Strings
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Source Text Module Record _module_</dd>
          </dl>
          <emu-alg>
            1. Assert: _module_.[[Status]] is not ~new~.
            1. If _exportStarSet_ is not present, set _exportStarSet_ to a new empty List.
            1. If _exportStarSet_ contains _module_, then
              1. Assert: We've reached the starting point of an `export *` circularity.
              1. Return a new empty List.
            1. Append _module_ to _exportStarSet_.
            1. Let _exportedNames_ be a new empty List.
            1. For each ExportEntry Record _e_ of _module_.[[LocalExportEntries]], do
              1. Assert: _module_ provides the direct binding for this export.
              1. Assert: _e_.[[ExportName]] is not *null*.
              1. Append _e_.[[ExportName]] to _exportedNames_.
            1. For each ExportEntry Record _e_ of _module_.[[IndirectExportEntries]], do
              1. Assert: _module_ imports a specific binding for this export.
              1. Assert: _e_.[[ExportName]] is not *null*.
              1. Append _e_.[[ExportName]] to _exportedNames_.
            1. For each ExportEntry Record _e_ of _module_.[[StarExportEntries]], do
              1. Assert: _e_.[[ModuleRequest]] is not *null*.
              1. Let _requestedModule_ be GetImportedModule(_module_, _e_.[[ModuleRequest]]).
              1. Let _starNames_ be _requestedModule_.GetExportedNames(_exportStarSet_).
              1. For each element _n_ of _starNames_, do
                1. If _n_ is not *"default"*, then
                  1. If _exportedNames_ does not contain _n_, then
                    1. Append _n_ to _exportedNames_.
            1. Return _exportedNames_.
          </emu-alg>
          <emu-note>
            <p>GetExportedNames does not filter out or throw an exception for names that have ambiguous star export bindings.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-resolveexport" type="concrete method">
          <h1>
            ResolveExport (
              _exportName_: a String,
              optional _resolveSet_: a List of Records with fields [[Module]] (a Module Record) and [[ExportName]] (a String),
            ): a ResolvedBinding Record, *null*, or ~ambiguous~
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Source Text Module Record _module_</dd>

            <dt>description</dt>
            <dd>
              <p>ResolveExport attempts to resolve an imported binding to the actual defining module and local binding name. The defining module may be the module represented by the Module Record this method was invoked on or some other module that is imported by that module. The parameter _resolveSet_ is used to detect unresolved circular import/export paths. If a pair consisting of specific Module Record and _exportName_ is reached that is already in _resolveSet_, an import circularity has been encountered. Before recursively calling ResolveExport, a pair consisting of _module_ and _exportName_ is added to _resolveSet_.</p>
              <p>If a defining module is found, a ResolvedBinding Record { [[Module]], [[BindingName]] } is returned. This record identifies the resolved binding of the originally requested export, unless this is the export of a namespace with no local binding. In this case, [[BindingName]] will be set to ~namespace~. If no definition was found or the request is found to be circular, *null* is returned. If the request is found to be ambiguous, ~ambiguous~ is returned.</p>
            </dd>
          </dl>

          <emu-alg>
            1. Assert: _module_.[[Status]] is not ~new~.
            1. If _resolveSet_ is not present, set _resolveSet_ to a new empty List.
            1. For each Record { [[Module]], [[ExportName]] } _r_ of _resolveSet_, do
              1. If _module_ and _r_.[[Module]] are the same Module Record and _exportName_ is _r_.[[ExportName]], then
                1. Assert: This is a circular import request.
                1. Return *null*.
            1. Append the Record { [[Module]]: _module_, [[ExportName]]: _exportName_ } to _resolveSet_.
            1. For each ExportEntry Record _e_ of _module_.[[LocalExportEntries]], do
              1. If _e_.[[ExportName]] is _exportName_, then
                1. Assert: _module_ provides the direct binding for this export.
                1. Return ResolvedBinding Record { [[Module]]: _module_, [[BindingName]]: _e_.[[LocalName]] }.
            1. For each ExportEntry Record _e_ of _module_.[[IndirectExportEntries]], do
              1. If _e_.[[ExportName]] is _exportName_, then
                1. Assert: _e_.[[ModuleRequest]] is not *null*.
                1. Let _importedModule_ be GetImportedModule(_module_, _e_.[[ModuleRequest]]).
                1. If _e_.[[ImportName]] is ~all~, then
                  1. Assert: _module_ does not provide the direct binding for this export.
                  1. Return ResolvedBinding Record { [[Module]]: _importedModule_, [[BindingName]]: ~namespace~ }.
                1. Else,
                  1. Assert: _module_ imports a specific binding for this export.
                  1. Return _importedModule_.ResolveExport(_e_.[[ImportName]], _resolveSet_).
            1. If _exportName_ is *"default"*, then
              1. Assert: A `default` export was not explicitly defined by this module.
              1. Return *null*.
              1. NOTE: A `default` export cannot be provided by an `export * from "mod"` declaration.
            1. Let _starResolution_ be *null*.
            1. For each ExportEntry Record _e_ of _module_.[[StarExportEntries]], do
              1. Assert: _e_.[[ModuleRequest]] is not *null*.
              1. Let _importedModule_ be GetImportedModule(_module_, _e_.[[ModuleRequest]]).
              1. Let _resolution_ be _importedModule_.ResolveExport(_exportName_, _resolveSet_).
              1. If _resolution_ is ~ambiguous~, return ~ambiguous~.
              1. If _resolution_ is not *null*, then
                1. Assert: _resolution_ is a ResolvedBinding Record.
                1. If _starResolution_ is *null*, then
                  1. Set _starResolution_ to _resolution_.
                1. Else,
                  1. Assert: There is more than one `*` import that includes the requested name.
                  1. If _resolution_.[[Module]] and _starResolution_.[[Module]] are not the same Module Record, return ~ambiguous~.
                  1. If _resolution_.[[BindingName]] is not _starResolution_.[[BindingName]] and either _resolution_.[[BindingName]] or _starResolution_.[[BindingName]] is ~namespace~, return ~ambiguous~.
                  1. If _resolution_.[[BindingName]] is a String, _starResolution_.[[BindingName]] is a String, and _resolution_.[[BindingName]] is not _starResolution_.[[BindingName]], return ~ambiguous~.
            1. Return _starResolution_.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-source-text-module-record-initialize-environment" type="concrete method">
          <h1>InitializeEnvironment ( ): either a normal completion containing ~unused~ or a throw completion</h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Source Text Module Record _module_</dd>
          </dl>

          <emu-alg>
            1. For each ExportEntry Record _e_ of _module_.[[IndirectExportEntries]], do
              1. Assert: _e_.[[ExportName]] is not *null*.
              1. Let _resolution_ be _module_.ResolveExport(_e_.[[ExportName]]).
              1. If _resolution_ is either *null* or ~ambiguous~, throw a *SyntaxError* exception.
              1. Assert: _resolution_ is a ResolvedBinding Record.
            1. Assert: All named exports from _module_ are resolvable.
            1. Let _realm_ be _module_.[[Realm]].
            1. Assert: _realm_ is not *undefined*.
            1. Let _env_ be NewModuleEnvironment(_realm_.[[GlobalEnv]]).
            1. Set _module_.[[Environment]] to _env_.
            1. For each ImportEntry Record _in_ of _module_.[[ImportEntries]], do
              1. Let _importedModule_ be GetImportedModule(_module_, _in_.[[ModuleRequest]]).
              1. If _in_.[[ImportName]] is ~namespace-object~, then
                1. Let _namespace_ be GetModuleNamespace(_importedModule_).
                1. Perform ! _env_.CreateImmutableBinding(_in_.[[LocalName]], *true*).
                1. Perform ! _env_.InitializeBinding(_in_.[[LocalName]], _namespace_).
              1. Else,
                1. Let _resolution_ be _importedModule_.ResolveExport(_in_.[[ImportName]]).
                1. If _resolution_ is either *null* or ~ambiguous~, throw a *SyntaxError* exception.
                1. If _resolution_.[[BindingName]] is ~namespace~, then
                  1. Let _namespace_ be GetModuleNamespace(_resolution_.[[Module]]).
                  1. Perform ! _env_.CreateImmutableBinding(_in_.[[LocalName]], *true*).
                  1. Perform ! _env_.InitializeBinding(_in_.[[LocalName]], _namespace_).
                1. Else,
                  1. Perform _env_.CreateImportBinding(_in_.[[LocalName]], _resolution_.[[Module]], _resolution_.[[BindingName]]).
            1. Let _moduleContext_ be a new ECMAScript code execution context.
            1. Set the Function of _moduleContext_ to *null*.
            1. Assert: _module_.[[Realm]] is not *undefined*.
            1. Set the Realm of _moduleContext_ to _module_.[[Realm]].
            1. Set the ScriptOrModule of _moduleContext_ to _module_.
            1. Set the VariableEnvironment of _moduleContext_ to _module_.[[Environment]].
            1. Set the LexicalEnvironment of _moduleContext_ to _module_.[[Environment]].
            1. Set the PrivateEnvironment of _moduleContext_ to *null*.
            1. Set _module_.[[Context]] to _moduleContext_.
            1. Push _moduleContext_ onto the execution context stack; _moduleContext_ is now the running execution context.
            1. Let _code_ be _module_.[[ECMAScriptCode]].
            1. Let _varDeclarations_ be the VarScopedDeclarations of _code_.
            1. Let _declaredVarNames_ be a new empty List.
            1. For each element _d_ of _varDeclarations_, do
              1. For each element _dn_ of the BoundNames of _d_, do
                1. If _declaredVarNames_ does not contain _dn_, then
                  1. Perform ! _env_.CreateMutableBinding(_dn_, *false*).
                  1. Perform ! _env_.InitializeBinding(_dn_, *undefined*).
                  1. Append _dn_ to _declaredVarNames_.
            1. Let _lexDeclarations_ be the LexicallyScopedDeclarations of _code_.
            1. Let _privateEnv_ be *null*.
            1. For each element _d_ of _lexDeclarations_, do
              1. For each element _dn_ of the BoundNames of _d_, do
                1. If IsConstantDeclaration of _d_ is *true*, then
                  1. Perform ! _env_.CreateImmutableBinding(_dn_, *true*).
                1. Else,
                  1. Perform ! _env_.CreateMutableBinding(_dn_, *false*).
                1. If _d_ is either a |FunctionDeclaration|, a |GeneratorDeclaration|, an |AsyncFunctionDeclaration|, or an |AsyncGeneratorDeclaration|, then
                  1. Let _fo_ be InstantiateFunctionObject of _d_ with arguments _env_ and _privateEnv_.
                  1. Perform ! _env_.InitializeBinding(_dn_, _fo_).
            1. Remove _moduleContext_ from the execution context stack.
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-source-text-module-record-execute-module" type="concrete method">
          <h1>
            ExecuteModule (
              optional _capability_: a PromiseCapability Record,
            ): either a normal completion containing ~unused~ or a throw completion
          </h1>
          <dl class="header">
            <dt>for</dt>
            <dd>a Source Text Module Record _module_</dd>
          </dl>

          <emu-alg>
            1. Let _moduleContext_ be a new ECMAScript code execution context.
            1. Set the Function of _moduleContext_ to *null*.
            1. Set the Realm of _moduleContext_ to _module_.[[Realm]].
            1. Set the ScriptOrModule of _moduleContext_ to _module_.
            1. Assert: _module_ has been linked and declarations in its module environment have been instantiated.
            1. Set the VariableEnvironment of _moduleContext_ to _module_.[[Environment]].
            1. Set the LexicalEnvironment of _moduleContext_ to _module_.[[Environment]].
            1. Suspend the running execution context.
            1. If _module_.[[HasTLA]] is *false*, then
              1. Assert: _capability_ is not present.
              1. Push _moduleContext_ onto the execution context stack; _moduleContext_ is now the running execution context.
              1. Let _result_ be Completion(Evaluation of _module_.[[ECMAScriptCode]]).
              1. Suspend _moduleContext_ and remove it from the execution context stack.
              1. Resume the context that is now on the top of the execution context stack as the running execution context.
              1. If _result_ is an abrupt completion, then
                1. Return ? _result_.
            1. Else,
              1. Assert: _capability_ is a PromiseCapability Record.
              1. Perform AsyncBlockStart(_capability_, _module_.[[ECMAScriptCode]], _moduleContext_).
            1. Return ~unused~.
          </emu-alg>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-GetImportedModule" type="abstract operation">
        <h1>
          GetImportedModule (
            _referrer_: a Cyclic Module Record,
            _specifier_: a String,
          ): a Module Record
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd></dd>
        </dl>

        <emu-alg>
          1. Assert: Exactly one element of _referrer_.[[LoadedModules]] is a Record whose [[Specifier]] is _specifier_, since LoadRequestedModules has completed successfully on _referrer_ prior to invoking this abstract operation.
          1. Let _record_ be the Record in _referrer_.[[LoadedModules]] whose [[Specifier]] is _specifier_.
          1. Return _record_.[[Module]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-HostLoadImportedModule" type="host-defined abstract operation" oldids="sec-hostresolveimportedmodule,sec-hostimportmoduledynamically">
        <h1>
          HostLoadImportedModule (
            _referrer_: a Script Record, a Cyclic Module Record, or a Realm Record,
            _specifier_: a String,
            _hostDefined_: anything,
            _payload_: a GraphLoadingState Record or a PromiseCapability Record,
          ): ~unused~
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd></dd>
        </dl>

        <emu-note id="note-HostLoadImportedModule-referrer-Realm-Record">
          <p>An example of when _referrer_ can be a Realm Record is in a web browser host. There, if a user clicks on a control given by</p>

          <pre><code class="html">&lt;button type="button" onclick="import('./foo.mjs')"&gt;Click me&lt;/button&gt;</code></pre>

          <p>there will be no active script or module at the time the <emu-xref href="#sec-import-calls">`import()`</emu-xref> expression runs. More generally, this can happen in any situation where the host pushes execution contexts with *null* ScriptOrModule components onto the execution context stack.</p>
        </emu-note>

        <p>An implementation of HostLoadImportedModule must conform to the following requirements:</p>
        <ul>
          <li>
            The host environment must perform FinishLoadingImportedModule(_referrer_, _specifier_, _payload_, _result_), where _result_ is either a normal completion containing the loaded Module Record or a throw completion, either synchronously or asynchronously.
          </li>
          <li>
            If this operation is called multiple times with the same (_referrer_, _specifier_) pair and it performs FinishLoadingImportedModule(_referrer_, _specifier_, _payload_, _result_) where _result_ is a normal completion, then it must perform FinishLoadingImportedModule(_referrer_, _specifier_, _payload_, _result_) with the same _result_ each time.
          </li>
          <li>
            The operation must treat _payload_ as an opaque value to be passed through to FinishLoadingImportedModule.
          </li>
        </ul>

        <p>The actual process performed is host-defined, but typically consists of performing whatever I/O operations are necessary to load the appropriate Module Record. Multiple different (_referrer_, _specifier_) pairs may map to the same Module Record instance. The actual mapping semantics is host-defined but typically a normalization process is applied to _specifier_ as part of the mapping process. A typical normalization process would include actions such as expansion of relative and abbreviated path specifiers.</p>
      </emu-clause>

      <emu-clause id="sec-FinishLoadingImportedModule" type="abstract operation" oldids="sec-finishdynamicimport">
        <h1>
          FinishLoadingImportedModule (
            _referrer_: a Script Record, a Cyclic Module Record, or a Realm Record,
            _specifier_: a String,
            _payload_: a GraphLoadingState Record or a PromiseCapability Record,
            _result_: either a normal completion containing a Module Record or a throw completion,
          ): ~unused~
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd></dd>
        </dl>
        <emu-alg>
          1. If _result_ is a normal completion, then
            1. If _referrer_.[[LoadedModules]] contains a Record whose [[Specifier]] is _specifier_, then
              1. Assert: That Record's [[Module]] is _result_.[[Value]].
            1. Else,
              1. Append the Record { [[Specifier]]: _specifier_, [[Module]]: _result_.[[Value]] } to _referrer_.[[LoadedModules]].
          1. If _payload_ is a GraphLoadingState Record, then
            1. Perform ContinueModuleLoading(_payload_, _result_).
          1. Else,
            1. Perform ContinueDynamicImport(_payload_, _result_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getmodulenamespace" type="abstract operation">
        <h1>
          GetModuleNamespace (
            _module_: an instance of a concrete subclass of Module Record,
          ): a Module Namespace Object
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It retrieves the Module Namespace Object representing _module_'s exports, lazily creating it the first time it was requested, and storing it in _module_.[[Namespace]] for future retrieval.</dd>
        </dl>

        <emu-alg>
          1. Assert: If _module_ is a Cyclic Module Record, then _module_.[[Status]] is not ~new~ or ~unlinked~.
          1. Let _namespace_ be _module_.[[Namespace]].
          1. If _namespace_ is ~empty~, then
            1. Let _exportedNames_ be _module_.GetExportedNames().
            1. Let _unambiguousNames_ be a new empty List.
            1. For each element _name_ of _exportedNames_, do
              1. Let _resolution_ be _module_.ResolveExport(_name_).
              1. If _resolution_ is a ResolvedBinding Record, append _name_ to _unambiguousNames_.
            1. Set _namespace_ to ModuleNamespaceCreate(_module_, _unambiguousNames_).
          1. Return _namespace_.
        </emu-alg>
        <emu-note>
          <p>GetModuleNamespace never throws. Instead, unresolvable names are simply excluded from the namespace at this point. They will lead to a real linking error later unless they are all ambiguous star exports that are not explicitly requested anywhere.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-module-semantics-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>Module : [empty]</emu-grammar>
        <emu-alg>
          1. Return *undefined*.
        </emu-alg>
        <emu-grammar>ModuleBody : ModuleItemList</emu-grammar>
        <emu-alg>
          1. Let _result_ be Completion(Evaluation of |ModuleItemList|).
          1. If _result_ is a normal completion and _result_.[[Value]] is ~empty~, then
            1. Return *undefined*.
          1. Return ? _result_.
        </emu-alg>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _sl_ be ? Evaluation of |ModuleItemList|.
          1. Let _s_ be Completion(Evaluation of |ModuleItem|).
          1. Return ? UpdateEmpty(_s_, _sl_).
        </emu-alg>
        <emu-note>
          <p>The value of a |ModuleItemList| is the value of the last value-producing item in the |ModuleItemList|.</p>
        </emu-note>
        <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
        <emu-alg>
          1. Return ~empty~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<h3 id="sec-imports"></h3>

### Imports
* Syntax

  ```
        ImportDeclaration :
          `import` ImportClause FromClause `;`
          `import` ModuleSpecifier `;`

        ImportClause :
          ImportedDefaultBinding
          NameSpaceImport
          NamedImports
          ImportedDefaultBinding `,` NameSpaceImport
          ImportedDefaultBinding `,` NamedImports

        ImportedDefaultBinding :
          ImportedBinding

        NameSpaceImport :
          `*` `as` ImportedBinding

        NamedImports :
          `{` `}`
          `{` ImportsList `}`
          `{` ImportsList `,` `}`

        FromClause :
          `from` ModuleSpecifier

        ImportsList :
          ImportSpecifier
          ImportsList `,` ImportSpecifier

        ImportSpecifier :
          ImportedBinding
          ModuleExportName `as` ImportedBinding

        ModuleSpecifier :
          StringLiteral

        ImportedBinding :
          BindingIdentifier[~Yield, +Await]
  ```

* TODO:
  <emu-clause id="sec-imports-static-semantics-early-errors">
  <h1>Static Semantics: Early Errors</h1>
  <emu-grammar>ModuleItem : ImportDeclaration</emu-grammar>
  <ul>
  <li>
  It is a Syntax Error if the BoundNames of |ImportDeclaration| contains any duplicate entries.
  </li>
  </ul>
  </emu-clause>

      <emu-clause id="sec-static-semantics-importentries" oldids="sec-module-semantics-static-semantics-importentries,sec-imports-static-semantics-importentries" type="sdo">
        <h1>Static Semantics: ImportEntries ( ): a List of ImportEntry Records</h1>
        <dl class="header">
        </dl>
        <emu-grammar>Module : [empty]</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _entries1_ be the ImportEntries of |ModuleItemList|.
          1. Let _entries2_ be the ImportEntries of |ModuleItem|.
          1. Return the list-concatenation of _entries1_ and _entries2_.
        </emu-alg>
        <emu-grammar>
          ModuleItem :
            ExportDeclaration
            StatementListItem
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ImportDeclaration : `import` ImportClause FromClause `;`</emu-grammar>
        <emu-alg>
          1. Let _module_ be the sole element of the ModuleRequests of |FromClause|.
          1. Return the ImportEntriesForModule of |ImportClause| with argument _module_.
        </emu-alg>
        <emu-grammar>ImportDeclaration : `import` ModuleSpecifier `;`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-importentriesformodule" type="sdo">
        <h1>
          Static Semantics: ImportEntriesForModule (
            _module_: a String,
          ): a List of ImportEntry Records
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ImportClause : ImportedDefaultBinding `,` NameSpaceImport</emu-grammar>
        <emu-alg>
          1. Let _entries1_ be the ImportEntriesForModule of |ImportedDefaultBinding| with argument _module_.
          1. Let _entries2_ be the ImportEntriesForModule of |NameSpaceImport| with argument _module_.
          1. Return the list-concatenation of _entries1_ and _entries2_.
        </emu-alg>
        <emu-grammar>ImportClause : ImportedDefaultBinding `,` NamedImports</emu-grammar>
        <emu-alg>
          1. Let _entries1_ be the ImportEntriesForModule of |ImportedDefaultBinding| with argument _module_.
          1. Let _entries2_ be the ImportEntriesForModule of |NamedImports| with argument _module_.
          1. Return the list-concatenation of _entries1_ and _entries2_.
        </emu-alg>
        <emu-grammar>ImportedDefaultBinding : ImportedBinding</emu-grammar>
        <emu-alg>
          1. Let _localName_ be the sole element of the BoundNames of |ImportedBinding|.
          1. Let _defaultEntry_ be the ImportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: *"default"*, [[LocalName]]: _localName_ }.
          1. Return « _defaultEntry_ ».
        </emu-alg>
        <emu-grammar>NameSpaceImport : `*` `as` ImportedBinding</emu-grammar>
        <emu-alg>
          1. Let _localName_ be the StringValue of |ImportedBinding|.
          1. Let _entry_ be the ImportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: ~namespace-object~, [[LocalName]]: _localName_ }.
          1. Return « _entry_ ».
        </emu-alg>
        <emu-grammar>NamedImports : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ImportsList : ImportsList `,` ImportSpecifier</emu-grammar>
        <emu-alg>
          1. Let _specs1_ be the ImportEntriesForModule of |ImportsList| with argument _module_.
          1. Let _specs2_ be the ImportEntriesForModule of |ImportSpecifier| with argument _module_.
          1. Return the list-concatenation of _specs1_ and _specs2_.
        </emu-alg>
        <emu-grammar>ImportSpecifier : ImportedBinding</emu-grammar>
        <emu-alg>
          1. Let _localName_ be the sole element of the BoundNames of |ImportedBinding|.
          1. Let _entry_ be the ImportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: _localName_, [[LocalName]]: _localName_ }.
          1. Return « _entry_ ».
        </emu-alg>
        <emu-grammar>ImportSpecifier : ModuleExportName `as` ImportedBinding</emu-grammar>
        <emu-alg>
          1. Let _importName_ be the StringValue of |ModuleExportName|.
          1. Let _localName_ be the StringValue of |ImportedBinding|.
          1. Let _entry_ be the ImportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: _importName_, [[LocalName]]: _localName_ }.
          1. Return « _entry_ ».
        </emu-alg>
      </emu-clause>
    </emu-clause>

<h3 id="sec-exports"></h3>

### Exports

* Syntax

  ```
        ExportDeclaration :
          `export` ExportFromClause FromClause `;`
          `export` NamedExports `;`
          `export` VariableStatement[~Yield, +Await]
          `export` Declaration[~Yield, +Await]
          `export` `default` HoistableDeclaration[~Yield, +Await, +Default]
          `export` `default` ClassDeclaration[~Yield, +Await, +Default]
          `export` `default` [lookahead &notin; { `function`, `async` [no LineTerminator here] `function`, `class` }] AssignmentExpression[+In, ~Yield, +Await] `;`

        ExportFromClause :
          `*`
          `*` `as` ModuleExportName
          NamedExports

        NamedExports :
          `{` `}`
          `{` ExportsList `}`
          `{` ExportsList `,` `}`

        ExportsList :
          ExportSpecifier
          ExportsList `,` ExportSpecifier

        ExportSpecifier :
          ModuleExportName
          ModuleExportName `as` ModuleExportName
  ```
* TODO:
  <emu-clause id="sec-exports-static-semantics-early-errors">
  <h1>Static Semantics: Early Errors</h1>
  <emu-grammar>ExportDeclaration : `export` NamedExports `;`</emu-grammar>
  <ul>
  <li>
  It is a Syntax Error if the ReferencedBindings of |NamedExports| contains any |StringLiteral|s.
  </li>
  <li>
  For each |IdentifierName| _n_ in the ReferencedBindings of |NamedExports|: It is a Syntax Error if the StringValue of _n_ is a |ReservedWord| or the StringValue of _n_ is one of *"implements"*, *"interface"*, *"let"*, *"package"*, *"private"*, *"protected"*, *"public"*, or *"static"*.
  </li>
  </ul>
  <emu-note>
  <p>The above rule means that each ReferencedBindings of |NamedExports| is treated as an |IdentifierReference|.</p>
  </emu-note>
  </emu-clause>

      <emu-clause id="sec-static-semantics-exportedbindings" oldids="sec-module-semantics-static-semantics-exportedbindings,sec-exports-static-semantics-exportedbindings" type="sdo">
        <h1>Static Semantics: ExportedBindings ( ): a List of Strings</h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>ExportedBindings are the locally bound names that are explicitly associated with a |Module|'s ExportedNames.</p>
        </emu-note>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _names1_ be the ExportedBindings of |ModuleItemList|.
          1. Let _names2_ be the ExportedBindings of |ModuleItem|.
          1. Return the list-concatenation of _names1_ and _names2_.
        </emu-alg>
        <emu-grammar>
          ModuleItem :
            ImportDeclaration
            StatementListItem
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>
          ExportDeclaration :
            `export` ExportFromClause FromClause `;`
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` NamedExports `;`</emu-grammar>
        <emu-alg>
          1. Return the ExportedBindings of |NamedExports|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` VariableStatement</emu-grammar>
        <emu-alg>
          1. Return the BoundNames of |VariableStatement|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
        <emu-alg>
          1. Return the BoundNames of |Declaration|.
        </emu-alg>
        <emu-grammar>
          ExportDeclaration :
            `export` `default` HoistableDeclaration
            `export` `default` ClassDeclaration
            `export` `default` AssignmentExpression `;`
        </emu-grammar>
        <emu-alg>
          1. Return the BoundNames of this |ExportDeclaration|.
        </emu-alg>
        <emu-grammar>NamedExports : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportsList : ExportsList `,` ExportSpecifier</emu-grammar>
        <emu-alg>
          1. Let _names1_ be the ExportedBindings of |ExportsList|.
          1. Let _names2_ be the ExportedBindings of |ExportSpecifier|.
          1. Return the list-concatenation of _names1_ and _names2_.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the StringValue of |ModuleExportName|.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the StringValue of the first |ModuleExportName|.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-exportednames" oldids="sec-module-semantics-static-semantics-exportednames,sec-exports-static-semantics-exportednames" type="sdo">
        <h1>Static Semantics: ExportedNames ( ): a List of Strings</h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>ExportedNames are the externally visible names that a |Module| explicitly maps to one of its local name bindings.</p>
        </emu-note>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _names1_ be the ExportedNames of |ModuleItemList|.
          1. Let _names2_ be the ExportedNames of |ModuleItem|.
          1. Return the list-concatenation of _names1_ and _names2_.
        </emu-alg>
        <emu-grammar>ModuleItem : ExportDeclaration</emu-grammar>
        <emu-alg>
          1. Return the ExportedNames of |ExportDeclaration|.
        </emu-alg>
        <emu-grammar>
          ModuleItem :
            ImportDeclaration
            StatementListItem
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` ExportFromClause FromClause `;`</emu-grammar>
        <emu-alg>
          1. Return the ExportedNames of |ExportFromClause|.
        </emu-alg>
        <emu-grammar>ExportFromClause : `*`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportFromClause : `*` `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the StringValue of |ModuleExportName|.
        </emu-alg>
        <emu-grammar>ExportFromClause : NamedExports</emu-grammar>
        <emu-alg>
          1. Return the ExportedNames of |NamedExports|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` VariableStatement</emu-grammar>
        <emu-alg>
          1. Return the BoundNames of |VariableStatement|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
        <emu-alg>
          1. Return the BoundNames of |Declaration|.
        </emu-alg>
        <emu-grammar>
          ExportDeclaration :
            `export` `default` HoistableDeclaration
            `export` `default` ClassDeclaration
            `export` `default` AssignmentExpression `;`
        </emu-grammar>
        <emu-alg>
          1. Return « *"default"* ».
        </emu-alg>
        <emu-grammar>NamedExports : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportsList : ExportsList `,` ExportSpecifier</emu-grammar>
        <emu-alg>
          1. Let _names1_ be the ExportedNames of |ExportsList|.
          1. Let _names2_ be the ExportedNames of |ExportSpecifier|.
          1. Return the list-concatenation of _names1_ and _names2_.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the StringValue of |ModuleExportName|.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the StringValue of the second |ModuleExportName|.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-exportentries" oldids="sec-module-semantics-static-semantics-exportentries,sec-exports-static-semantics-exportentries" type="sdo">
        <h1>Static Semantics: ExportEntries ( ): a List of ExportEntry Records</h1>
        <dl class="header">
        </dl>
        <emu-grammar>Module : [empty]</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ModuleItemList : ModuleItemList ModuleItem</emu-grammar>
        <emu-alg>
          1. Let _entries1_ be the ExportEntries of |ModuleItemList|.
          1. Let _entries2_ be the ExportEntries of |ModuleItem|.
          1. Return the list-concatenation of _entries1_ and _entries2_.
        </emu-alg>
        <emu-grammar>
          ModuleItem :
            ImportDeclaration
            StatementListItem
        </emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` ExportFromClause FromClause `;`</emu-grammar>
        <emu-alg>
          1. Let _module_ be the sole element of the ModuleRequests of |FromClause|.
          1. Return the ExportEntriesForModule of |ExportFromClause| with argument _module_.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` NamedExports `;`</emu-grammar>
        <emu-alg>
          1. Return the ExportEntriesForModule of |NamedExports| with argument *null*.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` VariableStatement</emu-grammar>
        <emu-alg>
          1. Let _entries_ be a new empty List.
          1. Let _names_ be the BoundNames of |VariableStatement|.
          1. For each element _name_ of _names_, do
            1. Append the ExportEntry Record { [[ModuleRequest]]: *null*, [[ImportName]]: *null*, [[LocalName]]: _name_, [[ExportName]]: _name_ } to _entries_.
          1. Return _entries_.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
        <emu-alg>
          1. Let _entries_ be a new empty List.
          1. Let _names_ be the BoundNames of |Declaration|.
          1. For each element _name_ of _names_, do
            1. Append the ExportEntry Record { [[ModuleRequest]]: *null*, [[ImportName]]: *null*, [[LocalName]]: _name_, [[ExportName]]: _name_ } to _entries_.
          1. Return _entries_.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` HoistableDeclaration</emu-grammar>
        <emu-alg>
          1. Let _names_ be the BoundNames of |HoistableDeclaration|.
          1. Let _localName_ be the sole element of _names_.
          1. Return a List whose sole element is a new ExportEntry Record { [[ModuleRequest]]: *null*, [[ImportName]]: *null*, [[LocalName]]: _localName_, [[ExportName]]: *"default"* }.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` ClassDeclaration</emu-grammar>
        <emu-alg>
          1. Let _names_ be the BoundNames of |ClassDeclaration|.
          1. Let _localName_ be the sole element of _names_.
          1. Return a List whose sole element is a new ExportEntry Record { [[ModuleRequest]]: *null*, [[ImportName]]: *null*, [[LocalName]]: _localName_, [[ExportName]]: *"default"* }.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` AssignmentExpression `;`</emu-grammar>
        <emu-alg>
          1. Let _entry_ be the ExportEntry Record { [[ModuleRequest]]: *null*, [[ImportName]]: *null*, [[LocalName]]: *"\*default\*"*, [[ExportName]]: *"default"* }.
          1. Return « _entry_ ».
        </emu-alg>
        <emu-note>
          <p>*"\*default\*"* is used within this specification as a synthetic name for anonymous default export values. See <emu-xref href="#note-star-default-star">this note</emu-xref> for more details.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-static-semantics-exportentriesformodule" type="sdo">
        <h1>
          Static Semantics: ExportEntriesForModule (
            _module_: a String or *null*,
          ): a List of ExportEntry Records
        </h1>
        <dl class="header">
        </dl>
        <emu-grammar>ExportFromClause : `*`</emu-grammar>
        <emu-alg>
          1. Let _entry_ be the ExportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: ~all-but-default~, [[LocalName]]: *null*, [[ExportName]]: *null* }.
          1. Return « _entry_ ».
        </emu-alg>
        <emu-grammar>ExportFromClause : `*` `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Let _exportName_ be the StringValue of |ModuleExportName|.
          1. Let _entry_ be the ExportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: ~all~, [[LocalName]]: *null*, [[ExportName]]: _exportName_ }.
          1. Return « _entry_ ».
        </emu-alg>
        <emu-grammar>NamedExports : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportsList : ExportsList `,` ExportSpecifier</emu-grammar>
        <emu-alg>
          1. Let _specs1_ be the ExportEntriesForModule of |ExportsList| with argument _module_.
          1. Let _specs2_ be the ExportEntriesForModule of |ExportSpecifier| with argument _module_.
          1. Return the list-concatenation of _specs1_ and _specs2_.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName</emu-grammar>
        <emu-alg>
          1. Let _sourceName_ be the StringValue of |ModuleExportName|.
          1. If _module_ is *null*, then
            1. Let _localName_ be _sourceName_.
            1. Let _importName_ be *null*.
          1. Else,
            1. Let _localName_ be *null*.
            1. Let _importName_ be _sourceName_.
          1. Return a List whose sole element is a new ExportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: _importName_, [[LocalName]]: _localName_, [[ExportName]]: _sourceName_ }.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Let _sourceName_ be the StringValue of the first |ModuleExportName|.
          1. Let _exportName_ be the StringValue of the second |ModuleExportName|.
          1. If _module_ is *null*, then
            1. Let _localName_ be _sourceName_.
            1. Let _importName_ be *null*.
          1. Else,
            1. Let _localName_ be *null*.
            1. Let _importName_ be _sourceName_.
          1. Return a List whose sole element is a new ExportEntry Record { [[ModuleRequest]]: _module_, [[ImportName]]: _importName_, [[LocalName]]: _localName_, [[ExportName]]: _exportName_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-referencedbindings" type="sdo">
        <h1>Static Semantics: ReferencedBindings ( ): a List of Parse Nodes</h1>
        <dl class="header">
        </dl>
        <emu-grammar>NamedExports : `{` `}`</emu-grammar>
        <emu-alg>
          1. Return a new empty List.
        </emu-alg>
        <emu-grammar>ExportsList : ExportsList `,` ExportSpecifier</emu-grammar>
        <emu-alg>
          1. Let _names1_ be the ReferencedBindings of |ExportsList|.
          1. Let _names2_ be the ReferencedBindings of |ExportSpecifier|.
          1. Return the list-concatenation of _names1_ and _names2_.
        </emu-alg>
        <emu-grammar>ExportSpecifier : ModuleExportName `as` ModuleExportName</emu-grammar>
        <emu-alg>
          1. Return the ReferencedBindings of the first |ModuleExportName|.
        </emu-alg>
        <emu-grammar>ModuleExportName : IdentifierName</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the |IdentifierName|.
        </emu-alg>
        <emu-grammar>ModuleExportName : StringLiteral</emu-grammar>
        <emu-alg>
          1. Return a List whose sole element is the |StringLiteral|.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-exports-runtime-semantics-evaluation" type="sdo">
        <h1>Runtime Semantics: Evaluation</h1>
        <emu-grammar>
          ExportDeclaration :
            `export` ExportFromClause FromClause `;`
            `export` NamedExports `;`
        </emu-grammar>
        <emu-alg>
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` VariableStatement</emu-grammar>
        <emu-alg>
          1. Return ? Evaluation of |VariableStatement|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` Declaration</emu-grammar>
        <emu-alg>
          1. Return ? Evaluation of |Declaration|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` HoistableDeclaration</emu-grammar>
        <emu-alg>
          1. Return ? Evaluation of |HoistableDeclaration|.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` ClassDeclaration</emu-grammar>
        <emu-alg>
          1. Let _value_ be ? BindingClassDeclarationEvaluation of |ClassDeclaration|.
          1. Let _className_ be the sole element of the BoundNames of |ClassDeclaration|.
          1. If _className_ is *"\*default\*"*, then
            1. Let _env_ be the running execution context's LexicalEnvironment.
            1. Perform ? InitializeBoundName(*"\*default\*"*, _value_, _env_).
          1. Return ~empty~.
        </emu-alg>
        <emu-grammar>ExportDeclaration : `export` `default` AssignmentExpression `;`</emu-grammar>
        <emu-alg>
          1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
            1. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument *"default"*.
          1. Else,
            1. Let _rhs_ be ? Evaluation of |AssignmentExpression|.
            1. Let _value_ be ? GetValue(_rhs_).
          1. Let _env_ be the running execution context's LexicalEnvironment.
          1. Perform ? InitializeBoundName(*"\*default\*"*, _value_, _env_).
          1. Return ~empty~.
        </emu-alg>
      </emu-clause>
    </emu-clause>

<h1 id="sec-error-handling-and-language-extensions"></h1>
