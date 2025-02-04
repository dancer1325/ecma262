# Error Handling and Language Extensions
  <p>An implementation must report most errors at the time the relevant ECMAScript language construct is evaluated. An <dfn id="early-error" variants="early errors">early error</dfn> is an error that can be detected and reported prior to the evaluation of any construct in the |Script| containing the error. The presence of an early error prevents the evaluation of the construct. An implementation must report early errors in a |Script| as part of parsing that |Script| in ParseScript. Early errors in a |Module| are reported at the point when the |Module| would be evaluated and the |Module| is never initialized. Early errors in <b>eval</b> code are reported at the time `eval` is called and prevent evaluation of the <b>eval</b> code. All errors that are not early errors are runtime errors.</p>
  <p>An implementation must report as an early error any occurrence of a condition that is listed in a “Static Semantics: Early Errors” subclause of this specification.</p>
  <p>An implementation shall not treat other kinds of errors as early errors even if the compiler can prove that a construct cannot execute without error under any circumstances. An implementation may issue an early warning in such a case, but it should not report the error until the relevant construct is actually executed.</p>
  <p>An implementation shall report all errors as specified, except for the following:</p>
  <ul>
    <li>
      Except as restricted in <emu-xref href="#sec-forbidden-extensions"></emu-xref>, a host or implementation may extend |Script| syntax, |Module| syntax, and regular expression pattern or flag syntax. To permit this, all operations (such as calling `eval`, using a regular expression literal, or using the Function or RegExp constructor) that are allowed to throw *SyntaxError* are permitted to exhibit host-defined behaviour instead of throwing *SyntaxError* when they encounter a host-defined extension to the script syntax or regular expression pattern or flag syntax.
    </li>
    <li>
      Except as restricted in <emu-xref href="#sec-forbidden-extensions"></emu-xref>, a host or implementation may provide additional types, values, objects, properties, and functions beyond those described in this specification. This may cause constructs (such as looking up a variable in the global scope) to have host-defined behaviour instead of throwing an error (such as *ReferenceError*).
    </li>
  </ul>

  <emu-clause id="sec-forbidden-extensions">
    <h1>Forbidden Extensions</h1>
    <p>An implementation must not extend this specification in the following ways:</p>
    <ul>
      <li>
        ECMAScript function objects defined using syntactic constructors in strict mode code must not be created with own properties named *"caller"* or *"arguments"*. Such own properties also must not be created for function objects defined using an |ArrowFunction|, |MethodDefinition|, |GeneratorDeclaration|, |GeneratorExpression|, |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, |ClassDeclaration|, |ClassExpression|, |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, or |AsyncArrowFunction| regardless of whether the definition is contained in strict mode code. Built-in functions, strict functions created using the Function constructor, generator functions created using the Generator constructor, async functions created using the AsyncFunction constructor, and functions created using the `bind` method also must not be created with such own properties.
      </li>
      <li>
        If an implementation extends any function object with an own property named *"caller"* the value of that property, as observed using [[Get]] or [[GetOwnProperty]], must not be a strict function object. If it is an accessor property, the function that is the value of the property's [[Get]] attribute must never return a strict function when called.
      </li>
      <li>
        Neither mapped nor unmapped arguments objects may be created with an own property named *"caller"*.
      </li>
      <li>
        The behaviour of built-in methods which are specified in ECMA-402, such as those named `toLocaleString`, must not be extended except as specified in ECMA-402.
      </li>
      <li>
        The RegExp pattern grammars in <emu-xref href="#sec-patterns"></emu-xref> and <emu-xref href="#sec-regular-expressions-patterns"></emu-xref> must not be extended to recognize any of the source characters A-Z or a-z as |IdentityEscape[+UnicodeMode]| when the <sub>[UnicodeMode]</sub> grammar parameter is present.
      </li>
      <li>
        The Syntactic Grammar must not be extended in any manner that allows the token `:` to immediately follow source text that is matched by the |BindingIdentifier| nonterminal symbol.
      </li>
      <li>
        When processing strict mode code, an implementation must not relax the early error rules of <emu-xref href="#sec-numeric-literals-early-errors"></emu-xref>.
      </li>
      <li>
        |TemplateEscapeSequence| must not be extended to include |LegacyOctalEscapeSequence| or |NonOctalDecimalEscapeSequence| as defined in <emu-xref href="#sec-literals-string-literals"></emu-xref>.
      </li>
      <li>
        When processing strict mode code, the extensions defined in <emu-xref href="#sec-labelled-function-declarations"></emu-xref>, <emu-xref href="#sec-block-level-function-declarations-web-legacy-compatibility-semantics"></emu-xref>, <emu-xref href="#sec-functiondeclarations-in-ifstatement-statement-clauses"></emu-xref>, and <emu-xref href="#sec-initializers-in-forin-statement-heads"></emu-xref> must not be supported.
      </li>
      <li>
        When parsing for the |Module| goal symbol, the lexical grammar extensions defined in <emu-xref href="#sec-html-like-comments"></emu-xref> must not be supported.
      </li>
      <!-- The following is so that in the future we can potentially add new arguments or support ArgumentList. -->
      <li>
        |ImportCall| must not be extended.
      </li>
    </ul>
  </emu-clause>

<h1 id="sec-ecmascript-standard-built-in-objects"></h1>
