# The Global Object

* global object
  * | BEFORE control enters any execution context,
    * created
  * ❌ INVALID `new` operator ❌
    * Reason: 🧠NOT have a [[Construct]] internal method 🧠
  * ❌can NOT be invoked -- as a -- function ❌
    * Reason: 🧠 NOT have a [[Call]] internal method 🧠
  * 's [[Prototype]] internal slot
    * 's value -- depends on  -- host
  * -- may have -- ADDITIONAL host-defined properties
    * _Example:_ property / 's value == global object itself
* TODO:
  <emu-clause id="sec-value-properties-of-the-global-object">
  <h1>Value Properties of the Global Object</h1>

        <emu-clause id="sec-globalthis">
          <h1>globalThis</h1>
          <p>The initial value of the *"globalThis"* property of the global object in a Realm Record _realm_ is _realm_.[[GlobalEnv]].[[GlobalThisValue]].</p>
          <p>This property has the attributes { [[Writable]]: *true*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
        </emu-clause>

        <emu-clause id="sec-value-properties-of-the-global-object-infinity">
          <h1>Infinity</h1>
          <p>The value of `Infinity` is *+∞*<sub>𝔽</sub> (see <emu-xref href="#sec-ecmascript-language-types-number-type"></emu-xref>). This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>

        <emu-clause id="sec-value-properties-of-the-global-object-nan">
          <h1>NaN</h1>
          <p>The value of `NaN` is *NaN* (see <emu-xref href="#sec-ecmascript-language-types-number-type"></emu-xref>). This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>

        <emu-clause id="sec-undefined">
          <h1>undefined</h1>
          <p>The value of `undefined` is *undefined* (see <emu-xref href="#sec-ecmascript-language-types-undefined-type"></emu-xref>). This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-function-properties-of-the-global-object">
        <h1>Function Properties of the Global Object</h1>

        <emu-clause id="sec-eval-x">
          <h1>eval ( _x_ )</h1>
          <p>This function is the <dfn>%eval%</dfn> intrinsic object.</p>
          <p>It performs the following steps when called:</p>
          <emu-alg>
            1. Return ? PerformEval(_x_, *false*, *false*).
          </emu-alg>

          <emu-clause id="sec-performeval" type="abstract operation" oldids="sec-performeval-rules-outside-functions,sec-performeval-rules-outside-methods,sec-performeval-rules-outside-constructors">
            <h1>
              PerformEval (
                _x_: an ECMAScript language value,
                _strictCaller_: a Boolean,
                _direct_: a Boolean,
              ): either a normal completion containing an ECMAScript language value or a throw completion
            </h1>
            <dl class="header">
            </dl>
            <emu-alg>
              1. Assert: If _direct_ is *false*, then _strictCaller_ is also *false*.
              1. If _x_ is not a String, return _x_.
              1. Let _evalRealm_ be the current Realm Record.
              1. NOTE: In the case of a direct eval, _evalRealm_ is the realm of both the caller of `eval` and of the `eval` function itself.
              1. Perform ? HostEnsureCanCompileStrings(_evalRealm_, « », _x_, _direct_).
              1. Let _inFunction_ be *false*.
              1. Let _inMethod_ be *false*.
              1. Let _inDerivedConstructor_ be *false*.
              1. Let _inClassFieldInitializer_ be *false*.
              1. If _direct_ is *true*, then
                1. Let _thisEnvRec_ be GetThisEnvironment().
                1. If _thisEnvRec_ is a Function Environment Record, then
                  1. Let _F_ be _thisEnvRec_.[[FunctionObject]].
                  1. Set _inFunction_ to *true*.
                  1. Set _inMethod_ to _thisEnvRec_.HasSuperBinding().
                  1. If _F_.[[ConstructorKind]] is ~derived~, set _inDerivedConstructor_ to *true*.
                  1. Let _classFieldInitializerName_ be _F_.[[ClassFieldInitializerName]].
                  1. If _classFieldInitializerName_ is not ~empty~, set _inClassFieldInitializer_ to *true*.
              1. Perform the following substeps in an implementation-defined order, possibly interleaving parsing and error detection:
                1. Let _script_ be ParseText(_x_, |Script|).
                1. If _script_ is a List of errors, throw a *SyntaxError* exception.
                1. If _script_ Contains |ScriptBody| is *false*, return *undefined*.
                1. Let _body_ be the |ScriptBody| of _script_.
                1. If _inFunction_ is *false* and _body_ Contains |NewTarget|, throw a *SyntaxError* exception.
                1. If _inMethod_ is *false* and _body_ Contains |SuperProperty|, throw a *SyntaxError* exception.
                1. If _inDerivedConstructor_ is *false* and _body_ Contains |SuperCall|, throw a *SyntaxError* exception.
                1. If _inClassFieldInitializer_ is *true* and ContainsArguments of _body_ is *true*, throw a *SyntaxError* exception.
              1. If _strictCaller_ is *true*, let _strictEval_ be *true*.
              1. Else, let _strictEval_ be ScriptIsStrict of _script_.
              1. Let _runningContext_ be the running execution context.
              1. NOTE: If _direct_ is *true*, _runningContext_ will be the execution context that performed the direct eval. If _direct_ is *false*, _runningContext_ will be the execution context for the invocation of the `eval` function.
              1. If _direct_ is *true*, then
                1. Let _lexEnv_ be NewDeclarativeEnvironment(_runningContext_'s LexicalEnvironment).
                1. Let _varEnv_ be _runningContext_'s VariableEnvironment.
                1. Let _privateEnv_ be _runningContext_'s PrivateEnvironment.
              1. Else,
                1. Let _lexEnv_ be NewDeclarativeEnvironment(_evalRealm_.[[GlobalEnv]]).
                1. Let _varEnv_ be _evalRealm_.[[GlobalEnv]].
                1. Let _privateEnv_ be *null*.
              1. If _strictEval_ is *true*, set _varEnv_ to _lexEnv_.
              1. If _runningContext_ is not already suspended, suspend _runningContext_.
              1. Let _evalContext_ be a new ECMAScript code execution context.
              1. Set _evalContext_'s Function to *null*.
              1. Set _evalContext_'s Realm to _evalRealm_.
              1. Set _evalContext_'s ScriptOrModule to _runningContext_'s ScriptOrModule.
              1. Set _evalContext_'s VariableEnvironment to _varEnv_.
              1. Set _evalContext_'s LexicalEnvironment to _lexEnv_.
              1. Set _evalContext_'s PrivateEnvironment to _privateEnv_.
              1. Push _evalContext_ onto the execution context stack; _evalContext_ is now the running execution context.
              1. Let _result_ be Completion(EvalDeclarationInstantiation(_body_, _varEnv_, _lexEnv_, _privateEnv_, _strictEval_)).
              1. If _result_ is a normal completion, then
                1. Set _result_ to Completion(Evaluation of _body_).
              1. If _result_ is a normal completion and _result_.[[Value]] is ~empty~, then
                1. Set _result_ to NormalCompletion(*undefined*).
              1. Suspend _evalContext_ and remove it from the execution context stack.
              1. Resume the context that is now on the top of the execution context stack as the running execution context.
              1. Return ? _result_.
            </emu-alg>
            <emu-note>
              <p>The eval code cannot instantiate variable or function bindings in the variable environment of the calling context that invoked the eval if either the code of the calling context or the eval code is strict mode code. Instead such bindings are instantiated in a new VariableEnvironment that is only accessible to the eval code. Bindings introduced by `let`, `const`, or `class` declarations are always instantiated in a new LexicalEnvironment.</p>
            </emu-note>
          </emu-clause>

          <emu-clause id="sec-hostensurecancompilestrings" type="host-defined abstract operation">
            <h1>
              HostEnsureCanCompileStrings (
                _calleeRealm_: a Realm Record,
                _parameterStrings_: a List of Strings,
                _bodyString_: a String,
                _direct_: a Boolean,
              ): either a normal completion containing ~unused~ or a throw completion
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It allows host environments to block certain ECMAScript functions which allow developers to interpret and evaluate strings as ECMAScript code.</dd>
            </dl>
            <p>
              _parameterStrings_ represents the strings that, when using one of the function constructors, will be concatenated together to build the parameters list. _bodyString_ represents the function body or the string passed to an `eval` call.
              _direct_ signifies whether the evaluation is a direct eval.
            </p>
            <p>The default implementation of HostEnsureCanCompileStrings is to return NormalCompletion(~unused~).</p>
          </emu-clause>

          <emu-clause id="sec-evaldeclarationinstantiation" type="abstract operation">
            <h1>
              EvalDeclarationInstantiation (
                _body_: a |ScriptBody| Parse Node,
                _varEnv_: an Environment Record,
                _lexEnv_: a Declarative Environment Record,
                _privateEnv_: a PrivateEnvironment Record or *null*,
                _strict_: a Boolean,
              ): either a normal completion containing ~unused~ or a throw completion
            </h1>
            <dl class="header">
            </dl>
            <!--
              WARNING: If you add, remove, rename, or repurpose any variable names
                       within this algorithm, you may need to update
                       #sec-web-compat-evaldeclarationinstantiation and
                       #sec-variablestatements-in-catch-blocks accordingly.
            -->
            <emu-alg>
              1. Let _varNames_ be the VarDeclaredNames of _body_.
              1. Let _varDeclarations_ be the VarScopedDeclarations of _body_.
              1. If _strict_ is *false*, then
                1. If _varEnv_ is a Global Environment Record, then
                  1. For each element _name_ of _varNames_, do
                    1. If _varEnv_.HasLexicalDeclaration(_name_) is *true*, throw a *SyntaxError* exception.
                    1. NOTE: `eval` will not create a global var declaration that would be shadowed by a global lexical declaration.
                1. Let _thisEnv_ be _lexEnv_.
                1. Assert: The following loop will terminate.
                1. Repeat, while _thisEnv_ and _varEnv_ are not the same Environment Record,
                  1. If _thisEnv_ is not an Object Environment Record, then
                    1. NOTE: The environment of with statements cannot contain any lexical declaration so it doesn't need to be checked for var/let hoisting conflicts.
                    1. For each element _name_ of _varNames_, do
                      1. If ! _thisEnv_.HasBinding(_name_) is *true*, then
                        1. [id="step-evaldeclarationinstantiation-throw-duplicate-binding"] Throw a *SyntaxError* exception.
                        1. NOTE: Annex <emu-xref href="#sec-variablestatements-in-catch-blocks"></emu-xref> defines alternate semantics for the above step.
                      1. NOTE: A direct eval will not hoist var declaration over a like-named lexical declaration.
                  1. Set _thisEnv_ to _thisEnv_.[[OuterEnv]].
              1. Let _privateIdentifiers_ be a new empty List.
              1. Let _pointer_ be _privateEnv_.
              1. Repeat, while _pointer_ is not *null*,
                1. For each Private Name _binding_ of _pointer_.[[Names]], do
                  1. If _privateIdentifiers_ does not contain _binding_.[[Description]], append _binding_.[[Description]] to _privateIdentifiers_.
                1. Set _pointer_ to _pointer_.[[OuterPrivateEnvironment]].
              1. If AllPrivateIdentifiersValid of _body_ with argument _privateIdentifiers_ is *false*, throw a *SyntaxError* exception.
              1. Let _functionsToInitialize_ be a new empty List.
              1. Let _declaredFunctionNames_ be a new empty List.
              1. For each element _d_ of _varDeclarations_, in reverse List order, do
                1. If _d_ is not either a |VariableDeclaration|, a |ForBinding|, or a |BindingIdentifier|, then
                  1. Assert: _d_ is either a |FunctionDeclaration|, a |GeneratorDeclaration|, an |AsyncFunctionDeclaration|, or an |AsyncGeneratorDeclaration|.
                  1. NOTE: If there are multiple function declarations for the same name, the last declaration is used.
                  1. Let _fn_ be the sole element of the BoundNames of _d_.
                  1. If _declaredFunctionNames_ does not contain _fn_, then
                    1. If _varEnv_ is a Global Environment Record, then
                      1. Let _fnDefinable_ be ? _varEnv_.CanDeclareGlobalFunction(_fn_).
                      1. If _fnDefinable_ is *false*, throw a *TypeError* exception.
                    1. Append _fn_ to _declaredFunctionNames_.
                    1. Insert _d_ as the first element of _functionsToInitialize_.
              1. Let _declaredVarNames_ be a new empty List.
              1. For each element _d_ of _varDeclarations_, do
                1. If _d_ is either a |VariableDeclaration|, a |ForBinding|, or a |BindingIdentifier|, then
                  1. For each String _vn_ of the BoundNames of _d_, do
                    1. If _declaredFunctionNames_ does not contain _vn_, then
                      1. If _varEnv_ is a Global Environment Record, then
                        1. Let _vnDefinable_ be ? _varEnv_.CanDeclareGlobalVar(_vn_).
                        1. If _vnDefinable_ is *false*, throw a *TypeError* exception.
                      1. If _declaredVarNames_ does not contain _vn_, then
                        1. Append _vn_ to _declaredVarNames_.
              1. [id="step-evaldeclarationinstantiation-web-compat-insertion-point"] NOTE: Annex <emu-xref href="#sec-web-compat-evaldeclarationinstantiation"></emu-xref> adds additional steps at this point.
              1. [id="step-evaldeclarationinstantiation-post-validation"] NOTE: No abnormal terminations occur after this algorithm step unless _varEnv_ is a Global Environment Record and the global object is a Proxy exotic object.
              1. Let _lexDeclarations_ be the LexicallyScopedDeclarations of _body_.
              1. For each element _d_ of _lexDeclarations_, do
                1. NOTE: Lexically declared names are only instantiated here but not initialized.
                1. For each element _dn_ of the BoundNames of _d_, do
                  1. If IsConstantDeclaration of _d_ is *true*, then
                    1. Perform ? _lexEnv_.CreateImmutableBinding(_dn_, *true*).
                  1. Else,
                    1. Perform ? _lexEnv_.CreateMutableBinding(_dn_, *false*).
              1. For each Parse Node _f_ of _functionsToInitialize_, do
                1. Let _fn_ be the sole element of the BoundNames of _f_.
                1. Let _fo_ be InstantiateFunctionObject of _f_ with arguments _lexEnv_ and _privateEnv_.
                1. If _varEnv_ is a Global Environment Record, then
                  1. Perform ? _varEnv_.CreateGlobalFunctionBinding(_fn_, _fo_, *true*).
                1. Else,
                  1. Let _bindingExists_ be ! _varEnv_.HasBinding(_fn_).
                  1. If _bindingExists_ is *false*, then
                    1. NOTE: The following invocation cannot return an abrupt completion because of the validation preceding step <emu-xref href="#step-evaldeclarationinstantiation-post-validation"></emu-xref>.
                    1. Perform ! _varEnv_.CreateMutableBinding(_fn_, *true*).
                    1. Perform ! _varEnv_.InitializeBinding(_fn_, _fo_).
                  1. Else,
                    1. Perform ! _varEnv_.SetMutableBinding(_fn_, _fo_, *false*).
              1. For each String _vn_ of _declaredVarNames_, do
                1. If _varEnv_ is a Global Environment Record, then
                  1. Perform ? _varEnv_.CreateGlobalVarBinding(_vn_, *true*).
                1. Else,
                  1. Let _bindingExists_ be ! _varEnv_.HasBinding(_vn_).
                  1. If _bindingExists_ is *false*, then
                    1. NOTE: The following invocation cannot return an abrupt completion because of the validation preceding step <emu-xref href="#step-evaldeclarationinstantiation-post-validation"></emu-xref>.
                    1. Perform ! _varEnv_.CreateMutableBinding(_vn_, *true*).
                    1. Perform ! _varEnv_.InitializeBinding(_vn_, *undefined*).
              1. Return ~unused~.
            </emu-alg>
            <emu-note>
              <p>An alternative version of this algorithm is described in <emu-xref href="#sec-variablestatements-in-catch-blocks"></emu-xref>.</p>
            </emu-note>
          </emu-clause>
        </emu-clause>

        <emu-clause id="sec-isfinite-number">
          <h1>isFinite ( _number_ )</h1>
          <p>This function is the <dfn>%isFinite%</dfn> intrinsic object.</p>
          <p>It performs the following steps when called:</p>
          <emu-alg>
            1. Let _num_ be ? ToNumber(_number_).
            1. If _num_ is not finite, return *false*.
            1. Otherwise, return *true*.
          </emu-alg>
        </emu-clause>

        <emu-clause id="sec-isnan-number">
          <h1>isNaN ( _number_ )</h1>
          <p>This function is the <dfn>%isNaN%</dfn> intrinsic object.</p>
          <p>It performs the following steps when called:</p>
          <emu-alg>
            1. Let _num_ be ? ToNumber(_number_).
            1. If _num_ is *NaN*, return *true*.
            1. Otherwise, return *false*.
          </emu-alg>
          <emu-note>
            <p>A reliable way for ECMAScript code to test if a value `X` is *NaN* is an expression of the form `X !== X`. The result will be *true* if and only if `X` is *NaN*.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-parsefloat-string">
          <h1>parseFloat ( _string_ )</h1>
          <p>This function produces a Number value dictated by interpretation of the contents of the _string_ argument as a decimal literal.</p>
          <p>It is the <dfn>%parseFloat%</dfn> intrinsic object.</p>
          <p>It performs the following steps when called:</p>
          <emu-alg>
            1. Let _inputString_ be ? ToString(_string_).
            1. Let _trimmedString_ be ! TrimString(_inputString_, ~start~).
            1. Let _trimmed_ be StringToCodePoints(_trimmedString_).
            1. Let _trimmedPrefix_ be the longest prefix of _trimmed_ that satisfies the syntax of a |StrDecimalLiteral|, which might be _trimmed_ itself. If there is no such prefix, return *NaN*.
            1. Let _parsedNumber_ be ParseText(_trimmedPrefix_, |StrDecimalLiteral|).
            1. Assert: _parsedNumber_ is a Parse Node.
            1. Return the StringNumericValue of _parsedNumber_.
          </emu-alg>
          <emu-note>
            <p>This function may interpret only a leading portion of _string_ as a Number value; it ignores any code units that cannot be interpreted as part of the notation of a decimal literal, and no indication is given that any such code units were ignored.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-parseint-string-radix">
          <h1>parseInt ( _string_, _radix_ )</h1>
          <p>This function produces an integral Number dictated by interpretation of the contents of _string_ according to the specified _radix_. Leading white space in _string_ is ignored. If _radix_ coerces to 0 (such as when it is *undefined*), it is assumed to be 10 except when the number representation begins with *"0x"* or *"0X"*, in which case it is assumed to be 16. If _radix_ is 16, the number representation may optionally begin with *"0x"* or *"0X"*.</p>
          <p>It is the <dfn>%parseInt%</dfn> intrinsic object.</p>
          <p>It performs the following steps when called:</p>
          <emu-alg>
            1. Let _inputString_ be ? ToString(_string_).
            1. Let _S_ be ! TrimString(_inputString_, ~start~).
            1. Let _sign_ be 1.
            1. If _S_ is not empty and the first code unit of _S_ is the code unit 0x002D (HYPHEN-MINUS), set _sign_ to -1.
            1. If _S_ is not empty and the first code unit of _S_ is either the code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS), set _S_ to the substring of _S_ from index 1.
            1. Let _R_ be ℝ(? ToInt32(_radix_)).
            1. Let _stripPrefix_ be *true*.
            1. If _R_ ≠ 0, then
              1. If _R_ &lt; 2 or _R_ > 36, return *NaN*.
              1. If _R_ ≠ 16, set _stripPrefix_ to *false*.
            1. Else,
              1. Set _R_ to 10.
            1. If _stripPrefix_ is *true*, then
              1. If the length of _S_ is at least 2 and the first two code units of _S_ are either *"0x"* or *"0X"*, then
                1. Set _S_ to the substring of _S_ from index 2.
                1. Set _R_ to 16.
            1. If _S_ contains a code unit that is not a radix-_R_ digit, let _end_ be the index within _S_ of the first such code unit; otherwise, let _end_ be the length of _S_.
            1. Let _Z_ be the substring of _S_ from 0 to _end_.
            1. If _Z_ is empty, return *NaN*.
            1. Let _mathInt_ be the integer value that is represented by _Z_ in radix-_R_ notation, using the letters <b>A</b> through <b>Z</b> and <b>a</b> through <b>z</b> for digits with values 10 through 35. (However, if _R_ = 10 and _Z_ contains more than 20 significant digits, every significant digit after the 20th may be replaced by a 0 digit, at the option of the implementation; and if _R_ is not one of 2, 4, 8, 10, 16, or 32, then _mathInt_ may be an implementation-approximated integer representing the integer value denoted by _Z_ in radix-_R_ notation.)
            1. If _mathInt_ = 0, then
              1. If _sign_ = -1, return *-0*<sub>𝔽</sub>.
              1. Return *+0*<sub>𝔽</sub>.
            1. Return 𝔽(_sign_ × _mathInt_).
          </emu-alg>
          <emu-note>
            <p>This function may interpret only a leading portion of _string_ as an integer value; it ignores any code units that cannot be interpreted as part of the notation of an integer, and no indication is given that any such code units were ignored.</p>
          </emu-note>
        </emu-clause>

        <emu-clause id="sec-uri-handling-functions" oldids="sec-uri-syntax-and-semantics">
          <h1>URI Handling Functions</h1>
          <p>Uniform Resource Identifiers, or URIs, are Strings that identify resources (e.g. web pages or files) and transport protocols by which to access them (e.g. HTTP or FTP) on the Internet. The ECMAScript language itself does not provide any support for using URIs except for functions that encode and decode URIs as described in this section. `encodeURI` and `decodeURI` are intended to work with complete URIs; they assume that any reserved characters are intended to have special meaning (e.g., as delimiters) and so are not encoded. `encodeURIComponent` and `decodeURIComponent` are intended to work with the individual components of a URI; they assume that any reserved characters represent text and must be encoded to avoid special meaning when the component is part of a complete URI.</p>
          <emu-note>
            <p>The set of reserved characters is based upon RFC 2396 and does not reflect changes introduced by the more recent RFC 3986.</p>
          </emu-note>
          <emu-note>
            <p>Many implementations of ECMAScript provide additional functions and methods that manipulate web pages; these functions are beyond the scope of this standard.</p>
          </emu-note>

          <emu-clause id="sec-decodeuri-encodeduri">
            <h1>decodeURI ( _encodedURI_ )</h1>
            <p>This function computes a new version of a URI in which each escape sequence and UTF-8 encoding of the sort that might be introduced by the `encodeURI` function is replaced with the UTF-16 encoding of the code point that it represents. Escape sequences that could not have been introduced by `encodeURI` are not replaced.</p>
            <p>It is the <dfn>%decodeURI%</dfn> intrinsic object.</p>
            <p>It performs the following steps when called:</p>
            <emu-alg>
              1. Let _uriString_ be ? ToString(_encodedURI_).
              1. Let _preserveEscapeSet_ be *";/?:@&=+$,#"*.
              1. Return ? Decode(_uriString_, _preserveEscapeSet_).
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-decodeuricomponent-encodeduricomponent">
            <h1>decodeURIComponent ( _encodedURIComponent_ )</h1>
            <p>This function computes a new version of a URI in which each escape sequence and UTF-8 encoding of the sort that might be introduced by the `encodeURIComponent` function is replaced with the UTF-16 encoding of the code point that it represents.</p>
            <p>It is the <dfn>%decodeURIComponent%</dfn> intrinsic object.</p>
            <p>It performs the following steps when called:</p>
            <emu-alg>
              1. Let _componentString_ be ? ToString(_encodedURIComponent_).
              1. Let _preserveEscapeSet_ be the empty String.
              1. Return ? Decode(_componentString_, _preserveEscapeSet_).
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-encodeuri-uri">
            <h1>encodeURI ( _uri_ )</h1>
            <p>This function computes a new version of a UTF-16 encoded (<emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>) URI in which each instance of certain code points is replaced by one, two, three, or four escape sequences representing the UTF-8 encoding of the code point.</p>
            <p>It is the <dfn>%encodeURI%</dfn> intrinsic object.</p>
            <p>It performs the following steps when called:</p>
            <emu-alg>
              1. Let _uriString_ be ? ToString(_uri_).
              1. Let _extraUnescaped_ be *";/?:@&=+$,#"*.
              1. Return ? Encode(_uriString_, _extraUnescaped_).
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-encodeuricomponent-uricomponent">
            <h1>encodeURIComponent ( _uriComponent_ )</h1>
            <p>This function computes a new version of a UTF-16 encoded (<emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>) URI in which each instance of certain code points is replaced by one, two, three, or four escape sequences representing the UTF-8 encoding of the code point.</p>
            <p>It is the <dfn>%encodeURIComponent%</dfn> intrinsic object.</p>
            <p>It performs the following steps when called:</p>
            <emu-alg>
              1. Let _componentString_ be ? ToString(_uriComponent_).
              1. Let _extraUnescaped_ be the empty String.
              1. Return ? Encode(_componentString_, _extraUnescaped_).
            </emu-alg>
          </emu-clause>

          <emu-clause id="sec-encode" type="abstract operation">
            <h1>
              Encode (
                _string_: a String,
                _extraUnescaped_: a String,
              ): either a normal completion containing a String or a throw completion
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It performs URI encoding and escaping, interpreting _string_ as a sequence of UTF-16 encoded code points as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>. If a character is identified as unreserved in RFC 2396 or appears in _extraUnescaped_, it is not escaped.</dd>
            </dl>
            <emu-alg>
              1. Let _len_ be the length of _string_.
              1. Let _R_ be the empty String.
              1. Let _alwaysUnescaped_ be the string-concatenation of the ASCII word characters and *"-.!~\*'()"*.
              1. Let _unescapedSet_ be the string-concatenation of _alwaysUnescaped_ and _extraUnescaped_.
              1. Let _k_ be 0.
              1. Repeat, while _k_ &lt; _len_,
                1. Let _C_ be the code unit at index _k_ within _string_.
                1. If _unescapedSet_ contains _C_, then
                  1. Set _k_ to _k_ + 1.
                  1. Set _R_ to the string-concatenation of _R_ and _C_.
                1. Else,
                  1. Let _cp_ be CodePointAt(_string_, _k_).
                  1. If _cp_.[[IsUnpairedSurrogate]] is *true*, throw a *URIError* exception.
                  1. Set _k_ to _k_ + _cp_.[[CodeUnitCount]].
                  1. Let _Octets_ be the List of octets resulting by applying the UTF-8 transformation to _cp_.[[CodePoint]].
                  1. For each element _octet_ of _Octets_, do
                    1. Let _hex_ be the String representation of _octet_, formatted as an uppercase hexadecimal number.
                    1. Set _R_ to the string-concatenation of _R_, *"%"*, and StringPad(_hex_, 2, *"0"*, ~start~).
              1. Return _R_.
            </emu-alg>
            <emu-note>
              <p>Because percent-encoding is used to represent individual octets, a single code point may be expressed as multiple consecutive escape sequences (one for each of its 8-bit UTF-8 code units).</p>
            </emu-note>
          </emu-clause>

          <emu-clause id="sec-decode" type="abstract operation">
            <h1>
              Decode (
                _string_: a String,
                _preserveEscapeSet_: a String,
              ): either a normal completion containing a String or a throw completion
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It performs URI unescaping and decoding, preserving any escape sequences that correspond to Basic Latin characters in _preserveEscapeSet_.</dd>
            </dl>
            <emu-alg>
              1. Let _len_ be the length of _string_.
              1. Let _R_ be the empty String.
              1. Let _k_ be 0.
              1. Repeat, while _k_ &lt; _len_,
                1. Let _C_ be the code unit at index _k_ within _string_.
                1. Let _S_ be _C_.
                1. If _C_ is the code unit 0x0025 (PERCENT SIGN), then
                  1. If _k_ + 3 > _len_, throw a *URIError* exception.
                  1. Let _escape_ be the substring of _string_ from _k_ to _k_ + 3.
                  1. Let _B_ be ParseHexOctet(_string_, _k_ + 1).
                  1. If _B_ is not an integer, throw a *URIError* exception.
                  1. Set _k_ to _k_ + 2.
                  1. Let _n_ be the number of leading 1 bits in _B_.
                  1. If _n_ = 0, then
                    1. Let _asciiChar_ be the code unit whose numeric value is _B_.
                    1. If _preserveEscapeSet_ contains _asciiChar_, set _S_ to _escape_. Otherwise, set _S_ to _asciiChar_.
                  1. Else,
                    1. If _n_ = 1 or _n_ > 4, throw a *URIError* exception.
                    1. Let _Octets_ be « _B_ ».
                    1. Let _j_ be 1.
                    1. Repeat, while _j_ &lt; _n_,
                      1. Set _k_ to _k_ + 1.
                      1. If _k_ + 3 > _len_, throw a *URIError* exception.
                      1. If the code unit at index _k_ within _string_ is not the code unit 0x0025 (PERCENT SIGN), throw a *URIError* exception.
                      1. Let _continuationByte_ be ParseHexOctet(_string_, _k_ + 1).
                      1. If _continuationByte_ is not an integer, throw a *URIError* exception.
                      1. Append _continuationByte_ to _Octets_.
                      1. Set _k_ to _k_ + 2.
                      1. Set _j_ to _j_ + 1.
                    1. Assert: The length of _Octets_ is _n_.
                    1. If _Octets_ does not contain a valid UTF-8 encoding of a Unicode code point, throw a *URIError* exception.
                    1. Let _V_ be the code point obtained by applying the UTF-8 transformation to _Octets_, that is, from a List of octets into a 21-bit value.
                    1. Set _S_ to UTF16EncodeCodePoint(_V_).
                1. Set _R_ to the string-concatenation of _R_ and _S_.
                1. Set _k_ to _k_ + 1.
              1. Return _R_.
            </emu-alg>
            <emu-note>
              <p>RFC 3629 prohibits the decoding of invalid UTF-8 octet sequences. For example, the invalid sequence 0xC0 0x80 must not decode into the code unit 0x0000. Implementations of the Decode algorithm are required to throw a *URIError* when encountering such invalid sequences.</p>
            </emu-note>
          </emu-clause>

          <emu-clause id="sec-parsehexoctet" type="abstract operation">
            <h1>
              ParseHexOctet (
                _string_: a String,
                _position_: a non-negative integer,
              ): either a non-negative integer or a non-empty List of *SyntaxError* objects
            </h1>
            <dl class="header">
              <dt>description</dt>
              <dd>It parses a sequence of two hexadecimal characters at the specified _position_ in _string_ into an unsigned 8-bit integer.</dd>
            </dl>
            <emu-alg>
              1. Let _len_ be the length of _string_.
              1. Assert: _position_ + 2 ≤ _len_.
              1. Let _hexDigits_ be the substring of _string_ from _position_ to _position_ + 2.
              1. Let _parseResult_ be ParseText(_hexDigits_, |HexDigits[~Sep]|).
              1. If _parseResult_ is not a Parse Node, return _parseResult_.
              1. Let _n_ be the MV of _parseResult_.
              1. Assert: _n_ is in the inclusive interval from 0 to 255.
              1. Return _n_.
            </emu-alg>
          </emu-clause>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-constructor-properties-of-the-global-object">
        <h1>Constructor Properties of the Global Object</h1>

        <emu-clause id="sec-constructor-properties-of-the-global-object-aggregate-error">
          <h1>AggregateError ( . . . )</h1>
          <p>See <emu-xref href="#sec-aggregate-error-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-array">
          <h1>Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-array-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-arraybuffer">
          <h1>ArrayBuffer ( . . . )</h1>
          <p>See <emu-xref href="#sec-arraybuffer-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-bigint">
          <h1>BigInt ( . . . )</h1>
          <p>See <emu-xref href="#sec-bigint-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-bigint64array">
          <h1>BigInt64Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-biguint64array">
          <h1>BigUint64Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-boolean">
          <h1>Boolean ( . . . )</h1>
          <p>See <emu-xref href="#sec-boolean-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-dataview">
          <h1>DataView ( . . . )</h1>
          <p>See <emu-xref href="#sec-dataview-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-date">
          <h1>Date ( . . . )</h1>
          <p>See <emu-xref href="#sec-date-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-error">
          <h1>Error ( . . . )</h1>
          <p>See <emu-xref href="#sec-error-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-evalerror">
          <h1>EvalError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-evalerror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-finalization-registry" oldids="sec-constructor-properties-of-the-global-object-finnalization-registry">
          <h1>FinalizationRegistry ( . . . )</h1>
          <p>See <emu-xref href="#sec-finalization-registry-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-float32array">
          <h1>Float32Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-float64array">
          <h1>Float64Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-function">
          <h1>Function ( . . . )</h1>
          <p>See <emu-xref href="#sec-function-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-int8array">
          <h1>Int8Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-int16array">
          <h1>Int16Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-int32array">
          <h1>Int32Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-iterator">
          <h1>Iterator ( . . . )</h1>
          <p>See <emu-xref href="#sec-iterator-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-map">
          <h1>Map ( . . . )</h1>
          <p>See <emu-xref href="#sec-map-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-number">
          <h1>Number ( . . . )</h1>
          <p>See <emu-xref href="#sec-number-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-object">
          <h1>Object ( . . . )</h1>
          <p>See <emu-xref href="#sec-object-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-promise">
          <h1>Promise ( . . . )</h1>
          <p>See <emu-xref href="#sec-promise-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-proxy">
          <h1>Proxy ( . . . )</h1>
          <p>See <emu-xref href="#sec-proxy-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-rangeerror">
          <h1>RangeError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-rangeerror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-referenceerror">
          <h1>ReferenceError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-referenceerror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-regexp">
          <h1>RegExp ( . . . )</h1>
          <p>See <emu-xref href="#sec-regexp-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-set">
          <h1>Set ( . . . )</h1>
          <p>See <emu-xref href="#sec-set-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-sharedarraybuffer">
          <h1>SharedArrayBuffer ( . . . )</h1>
          <p>See <emu-xref href="#sec-sharedarraybuffer-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-string">
          <h1>String ( . . . )</h1>
          <p>See <emu-xref href="#sec-string-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-symbol">
          <h1>Symbol ( . . . )</h1>
          <p>See <emu-xref href="#sec-symbol-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-syntaxerror">
          <h1>SyntaxError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-syntaxerror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-typeerror">
          <h1>TypeError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-typeerror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-uint8array">
          <h1>Uint8Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-uint8clampedarray">
          <h1>Uint8ClampedArray ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-uint16array">
          <h1>Uint16Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-uint32array">
          <h1>Uint32Array ( . . . )</h1>
          <p>See <emu-xref href="#sec-typedarray-constructors"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-urierror">
          <h1>URIError ( . . . )</h1>
          <p>See <emu-xref href="#sec-native-error-types-used-in-this-standard-urierror"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-weakmap">
          <h1>WeakMap ( . . . )</h1>
          <p>See <emu-xref href="#sec-weakmap-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-weakref">
          <h1>WeakRef ( . . . )</h1>
          <p>See <emu-xref href="#sec-weak-ref-constructor"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-constructor-properties-of-the-global-object-weakset">
          <h1>WeakSet ( . . . )</h1>
          <p>See <emu-xref href="#sec-weakset-objects"></emu-xref>.</p>
        </emu-clause>
      </emu-clause>

      <emu-clause id="sec-other-properties-of-the-global-object">
        <h1>Other Properties of the Global Object</h1>

        <emu-clause id="sec-atomics">
          <h1>Atomics</h1>
          <p>See <emu-xref href="#sec-atomics-object"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-json">
          <h1>JSON</h1>
          <p>See <emu-xref href="#sec-json-object"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-math">
          <h1>Math</h1>
          <p>See <emu-xref href="#sec-math-object"></emu-xref>.</p>
        </emu-clause>

        <emu-clause id="sec-reflect">
          <h1>Reflect</h1>
          <p>See <emu-xref href="#sec-reflect-object"></emu-xref>.</p>
        </emu-clause>
      </emu-clause>

<h1 id="sec-fundamental-objects"></h1>
