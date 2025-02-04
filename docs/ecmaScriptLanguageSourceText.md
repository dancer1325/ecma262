# ECMAScript Language: Source Text

  <emu-clause id="sec-source-text">
    <h1>Source Text</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      SourceCharacter ::
        &gt; any Unicode code point
    </emu-grammar>
    <p><dfn>ECMAScript source text</dfn> is a sequence of Unicode code points. All Unicode code point values from U+0000 to U+10FFFF, including surrogate code points, may occur in ECMAScript source text where permitted by the ECMAScript grammars. The actual encodings used to store and interchange ECMAScript source text is not relevant to this specification. Regardless of the external source text encoding, a conforming ECMAScript implementation processes the source text as if it was an equivalent sequence of |SourceCharacter| values, each |SourceCharacter| being a Unicode code point. Conforming ECMAScript implementations are not required to perform any normalization of source text, or behave as though they were performing normalization of source text.</p>
    <p>The components of a combining character sequence are treated as individual Unicode code points even though a user might think of the whole sequence as a single character.</p>
    <emu-note>
      <p>In string literals, regular expression literals, template literals and identifiers, any Unicode code point may also be expressed using Unicode escape sequences that explicitly express a code point's numeric value. Within a comment, such an escape sequence is effectively ignored as part of the comment.</p>
      <p>ECMAScript differs from the Java programming language in the behaviour of Unicode escape sequences. In a Java program, if the Unicode escape sequence `\\u000A`, for example, occurs within a single-line comment, it is interpreted as a line terminator (Unicode code point U+000A is LINE FEED (LF)) and therefore the next code point is not part of the comment. Similarly, if the Unicode escape sequence `\\u000A` occurs within a string literal in a Java program, it is likewise interpreted as a line terminator, which is not allowed within a string literal—one must write `\\n` instead of `\\u000A` to cause a LINE FEED (LF) to be part of the value of a string literal. In an ECMAScript program, a Unicode escape sequence occurring within a comment is never interpreted and therefore cannot contribute to termination of the comment. Similarly, a Unicode escape sequence occurring within a string literal in an ECMAScript program always contributes to the literal and is never interpreted as a line terminator or as a code point that might terminate the string literal.</p>
    </emu-note>

    <emu-clause id="sec-utf16encodecodepoint" type="abstract operation" oldids="sec-utf16encoding,sec-codepointtoutf16codeunits">
      <h1>
        Static Semantics: UTF16EncodeCodePoint (
          _cp_: a Unicode code point,
        ): a String
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Assert: 0 ≤ _cp_ ≤ 0x10FFFF.
        1. If _cp_ ≤ 0xFFFF, return the String value consisting of the code unit whose numeric value is _cp_.
        1. Let _cu1_ be the code unit whose numeric value is floor((_cp_ - 0x10000) / 0x400) + 0xD800.
        1. Let _cu2_ be the code unit whose numeric value is ((_cp_ - 0x10000) modulo 0x400) + 0xDC00.
        1. Return the string-concatenation of _cu1_ and _cu2_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-codepointstostring" type="abstract operation" oldids="sec-utf16encode">
      <h1>
        Static Semantics: CodePointsToString (
          _text_: a sequence of Unicode code points,
        ): a String
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It converts _text_ into a String value, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</dd>
      </dl>
      <emu-alg>
        1. Let _result_ be the empty String.
        1. For each code point _cp_ of _text_, do
          1. Set _result_ to the string-concatenation of _result_ and UTF16EncodeCodePoint(_cp_).
        1. Return _result_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-utf16decodesurrogatepair" type="abstract operation" oldids="sec-utf16decode,utf16decodesurrogatepair">
      <h1>
        Static Semantics: UTF16SurrogatePairToCodePoint (
          _lead_: a code unit,
          _trail_: a code unit,
        ): a code point
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>Two code units that form a UTF-16 surrogate pair are converted to a code point.</dd>
      </dl>
      <emu-alg>
        1. Assert: _lead_ is a leading surrogate and _trail_ is a trailing surrogate.
        1. Let _cp_ be (_lead_ - 0xD800) × 0x400 + (_trail_ - 0xDC00) + 0x10000.
        1. Return the code point _cp_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-codepointat" type="abstract operation">
      <h1>
        Static Semantics: CodePointAt (
          _string_: a String,
          _position_: a non-negative integer,
        ): a Record with fields [[CodePoint]] (a code point), [[CodeUnitCount]] (a positive integer), and [[IsUnpairedSurrogate]] (a Boolean)
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It interprets _string_ as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>, and reads from it a single code point starting with the code unit at index _position_.</dd>
      </dl>
      <emu-alg>
        1. Let _size_ be the length of _string_.
        1. Assert: _position_ ≥ 0 and _position_ &lt; _size_.
        1. Let _first_ be the code unit at index _position_ within _string_.
        1. Let _cp_ be the code point whose numeric value is the numeric value of _first_.
        1. If _first_ is neither a leading surrogate nor a trailing surrogate, then
          1. Return the Record { [[CodePoint]]: _cp_, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: *false* }.
        1. If _first_ is a trailing surrogate or _position_ + 1 = _size_, then
          1. Return the Record { [[CodePoint]]: _cp_, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: *true* }.
        1. Let _second_ be the code unit at index _position_ + 1 within _string_.
        1. If _second_ is not a trailing surrogate, then
          1. Return the Record { [[CodePoint]]: _cp_, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: *true* }.
        1. Set _cp_ to UTF16SurrogatePairToCodePoint(_first_, _second_).
        1. Return the Record { [[CodePoint]]: _cp_, [[CodeUnitCount]]: 2, [[IsUnpairedSurrogate]]: *false* }.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-stringtocodepoints" type="abstract operation" oldids="sec-utf16decodestring">
      <h1>
        Static Semantics: StringToCodePoints (
          _string_: a String,
        ): a List of code points
      </h1>
      <dl class="header">
        <dt>description</dt>
        <dd>It returns the sequence of Unicode code points that results from interpreting _string_ as UTF-16 encoded Unicode text as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</dd>
      </dl>
      <emu-alg>
        1. Let _codePoints_ be a new empty List.
        1. Let _size_ be the length of _string_.
        1. Let _position_ be 0.
        1. Repeat, while _position_ &lt; _size_,
          1. Let _cp_ be CodePointAt(_string_, _position_).
          1. Append _cp_.[[CodePoint]] to _codePoints_.
          1. Set _position_ to _position_ + _cp_.[[CodeUnitCount]].
        1. Return _codePoints_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-parsetext" type="abstract operation">
      <h1>
        Static Semantics: ParseText (
          _sourceText_: a String or a sequence of Unicode code points,
          _goalSymbol_: a nonterminal in one of the ECMAScript grammars,
        ): a Parse Node or a non-empty List of *SyntaxError* objects
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. If _sourceText_ is a String, set _sourceText_ to StringToCodePoints(_sourceText_).
        1. Attempt to parse _sourceText_ using _goalSymbol_ as the goal symbol, and analyse the parse result for any early error conditions. Parsing and early error detection may be interleaved in an implementation-defined manner.
        1. If the parse succeeded and no early errors were found, return the Parse Node (an instance of _goalSymbol_) at the root of the parse tree resulting from the parse.
        1. Otherwise, return a List of one or more *SyntaxError* objects representing the parsing errors and/or early errors. If more than one parsing error or early error is present, the number and ordering of error objects in the list is implementation-defined, but at least one must be present.
      </emu-alg>
      <emu-note>
        <p>Consider a text that has an early error at a particular point, and also a syntax error at a later point. An implementation that does a parse pass followed by an early errors pass might report the syntax error and not proceed to the early errors pass. An implementation that interleaves the two activities might report the early error and not proceed to find the syntax error. A third implementation might report both errors. All of these behaviours are conformant.</p>
      </emu-note>
      <emu-note>
        <p>See also clause <emu-xref href="#sec-error-handling-and-language-extensions"></emu-xref>.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-types-of-source-code">
    <h1>Types of Source Code</h1>
    <p>There are four types of ECMAScript code:</p>
    <ul>
      <li>
        <dfn>Global code</dfn> is source text that is treated as an ECMAScript |Script|. The global code of a particular |Script| does not include any source text that is parsed as part of a |FunctionDeclaration|, |FunctionExpression|, |GeneratorDeclaration|, |GeneratorExpression|, |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, |MethodDefinition|, |ArrowFunction|, |AsyncArrowFunction|, |ClassDeclaration|, or |ClassExpression|.
      </li>
      <li>
        <dfn>Eval code</dfn> is the source text supplied to the built-in `eval` function. More precisely, if the parameter to the built-in `eval` function is a String, it is treated as an ECMAScript |Script|. The eval code for a particular invocation of `eval` is the global code portion of that |Script|.
      </li>
      <li>
        <p><dfn>Function code</dfn> is source text that is parsed to supply the value of the [[ECMAScriptCode]] and [[FormalParameters]] internal slots (see <emu-xref href="#sec-ecmascript-function-objects"></emu-xref>) of an ECMAScript function object. The function code of a particular ECMAScript function does not include any source text that is parsed as the function code of a nested |FunctionDeclaration|, |FunctionExpression|, |GeneratorDeclaration|, |GeneratorExpression|, |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, |MethodDefinition|, |ArrowFunction|, |AsyncArrowFunction|, |ClassDeclaration|, or |ClassExpression|.</p>
        <p>In addition, if the source text referred to above is parsed as:</p>
        <ul>
          <li>the |FormalParameters| and |FunctionBody| of a |FunctionDeclaration| or |FunctionExpression|,</li>
          <li>the |FormalParameters| and |GeneratorBody| of a |GeneratorDeclaration| or |GeneratorExpression|,</li>
          <li>the |FormalParameters| and |AsyncFunctionBody| of an |AsyncFunctionDeclaration| or |AsyncFunctionExpression|, or</li>
          <li>the |FormalParameters| and |AsyncGeneratorBody| of an |AsyncGeneratorDeclaration| or |AsyncGeneratorExpression|,</li>
        </ul>
        <p>then the source text matched by the |BindingIdentifier| (if any) of that declaration or expression is also included in the function code of the corresponding function.</p>
      </li>
      <li>
        <dfn>Module code</dfn> is source text that is code that is provided as a |ModuleBody|. It is the code that is directly evaluated when a module is initialized. The module code of a particular module does not include any source text that is parsed as part of a nested |FunctionDeclaration|, |FunctionExpression|, |GeneratorDeclaration|, |GeneratorExpression|, |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, |MethodDefinition|, |ArrowFunction|, |AsyncArrowFunction|, |ClassDeclaration|, or |ClassExpression|.
      </li>
    </ul>
    <emu-note>
      <p>Function code is generally provided as the bodies of Function Definitions (<emu-xref href="#sec-function-definitions"></emu-xref>), Arrow Function Definitions (<emu-xref href="#sec-arrow-function-definitions"></emu-xref>), Method Definitions (<emu-xref href="#sec-method-definitions"></emu-xref>), Generator Function Definitions (<emu-xref href="#sec-generator-function-definitions"></emu-xref>), Async Function Definitions (<emu-xref href="#sec-async-function-definitions"></emu-xref>), Async Generator Function Definitions (<emu-xref href="#sec-async-generator-function-definitions"></emu-xref>), and Async Arrow Functions (<emu-xref href="#sec-async-arrow-function-definitions"></emu-xref>). Function code is also derived from the arguments to the Function constructor (<emu-xref href="#sec-function-p1-p2-pn-body"></emu-xref>), the GeneratorFunction constructor (<emu-xref href="#sec-generatorfunction"></emu-xref>), and the AsyncFunction constructor (<emu-xref href="#sec-async-function-constructor-arguments"></emu-xref>).</p>
    </emu-note>
    <emu-note>
      <p>The practical effect of including the |BindingIdentifier| in function code is that the Early Errors for strict mode code are applied to a |BindingIdentifier| that is the name of a function whose body contains a "use strict" directive, even if the surrounding code is not strict mode code.</p>
    </emu-note>

    <emu-clause id="sec-directive-prologues-and-the-use-strict-directive">
      <h1>Directive Prologues and the Use Strict Directive</h1>
      <p>A <dfn id="directive-prologue" variants="Directive Prologues">Directive Prologue</dfn> is the longest sequence of |ExpressionStatement|s occurring as the initial |StatementListItem|s or |ModuleItem|s of a |FunctionBody|, a |ScriptBody|, or a |ModuleBody| and where each |ExpressionStatement| in the sequence consists entirely of a |StringLiteral| token followed by a semicolon. The semicolon may appear explicitly or may be inserted by automatic semicolon insertion (<emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>). A Directive Prologue may be an empty sequence.</p>
      <p>A <dfn id="use-strict-directive" variants="Use Strict Directives">Use Strict Directive</dfn> is an |ExpressionStatement| in a Directive Prologue whose |StringLiteral| is either of the exact code point sequences `"use strict"` or `'use strict'`. A Use Strict Directive may not contain an |EscapeSequence| or |LineContinuation|.</p>
      <p>A Directive Prologue may contain more than one Use Strict Directive. However, an implementation may issue a warning if this occurs.</p>
      <emu-note>
        <p>The |ExpressionStatement|s of a Directive Prologue are evaluated normally during evaluation of the containing production. Implementations may define implementation specific meanings for |ExpressionStatement|s which are not a Use Strict Directive and which occur in a Directive Prologue. If an appropriate notification mechanism exists, an implementation should issue a warning if it encounters in a Directive Prologue an |ExpressionStatement| that is not a Use Strict Directive and which does not have a meaning defined by the implementation.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-strict-mode-code">
      <h1>Strict Mode Code</h1>
      <p>An ECMAScript syntactic unit may be processed using either unrestricted or strict mode syntax and semantics (<emu-xref href="#sec-strict-variant-of-ecmascript"></emu-xref>). Code is interpreted as <dfn>strict mode code</dfn> in the following situations:</p>
      <ul>
        <li>
          Global code is strict mode code if it begins with a Directive Prologue that contains a Use Strict Directive.
        </li>
        <li>
          Module code is always strict mode code.
        </li>
        <li>
          All parts of a |ClassDeclaration| or a |ClassExpression| are strict mode code.
        </li>
        <li>
          Eval code is strict mode code if it begins with a Directive Prologue that contains a Use Strict Directive or if the call to `eval` is a direct eval that is contained in strict mode code.
        </li>
        <li>
          Function code is strict mode code if the associated |FunctionDeclaration|, |FunctionExpression|, |GeneratorDeclaration|, |GeneratorExpression|, |AsyncFunctionDeclaration|, |AsyncFunctionExpression|, |AsyncGeneratorDeclaration|, |AsyncGeneratorExpression|, |MethodDefinition|, |ArrowFunction|, or |AsyncArrowFunction| is contained in strict mode code or if the code that produces the value of the function's [[ECMAScriptCode]] internal slot begins with a Directive Prologue that contains a Use Strict Directive.
        </li>
        <li>
          Function code that is supplied as the arguments to the built-in Function, Generator, AsyncFunction, and AsyncGenerator constructors is strict mode code if the last argument is a String that when processed is a |FunctionBody| that begins with a Directive Prologue that contains a Use Strict Directive.
        </li>
      </ul>
      <p>ECMAScript code that is not strict mode code is called <dfn id="non-strict-code">non-strict code</dfn>.</p>

      <emu-clause id="sec-isstrict" type="abstract operation">
        <h1>
          Static Semantics: IsStrict (
            _node_: a Parse Node,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If the source text matched by _node_ is strict mode code, return *true*; else return *false*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-non-ecmascript-functions">
      <h1>Non-ECMAScript Functions</h1>
      <p>An ECMAScript implementation may support the evaluation of function exotic objects whose evaluative behaviour is expressed in some host-defined form of executable code other than ECMAScript source text. Whether a function object is defined within ECMAScript code or is a built-in function is not observable from the perspective of ECMAScript code that calls or is called by such a function object.</p>
    </emu-clause>
  </emu-clause>
</emu-clause>

<h1 id="sec-ecmascript-language-lexical-grammar"></h1>
