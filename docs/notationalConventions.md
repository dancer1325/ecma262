# Notational Conventions

  <emu-clause id="sec-syntactic-and-lexical-grammars">
    <h1>Syntactic and Lexical Grammars</h1>

    <emu-clause id="sec-context-free-grammars">
      <h1>Context-Free Grammars</h1>
      <p>A <em>context-free grammar</em> consists of a number of <em>productions</em>. Each production has an abstract symbol called a <em>nonterminal</em> as its <em>left-hand side</em>, and a sequence of zero or more nonterminal and <em>terminal</em> symbols as its <em>right-hand side</em>. For each grammar, the terminal symbols are drawn from a specified alphabet.</p>
      <p>A <dfn variants="chain productions">chain production</dfn> is a production that has exactly one nonterminal symbol on its right-hand side along with zero or more terminal symbols.</p>
      <p>Starting from a sentence consisting of a single distinguished nonterminal, called the <dfn variants="goal symbols">goal symbol</dfn>, a given context-free grammar specifies a <em>language</em>, namely, the (perhaps infinite) set of possible sequences of terminal symbols that can result from repeatedly replacing any nonterminal in the sequence with a right-hand side of a production for which the nonterminal is the left-hand side.</p>
    </emu-clause>

    <emu-clause id="sec-lexical-and-regexp-grammars">
      <h1>The Lexical and RegExp Grammars</h1>
      <p>A <em>lexical grammar</em> for ECMAScript is given in clause <emu-xref href="#sec-ecmascript-language-lexical-grammar"></emu-xref>. This grammar has as its terminal symbols Unicode code points that conform to the rules for |SourceCharacter| defined in <emu-xref href="#sec-source-text"></emu-xref>. It defines a set of productions, starting from the goal symbol |InputElementDiv|, |InputElementTemplateTail|, |InputElementRegExp|, |InputElementRegExpOrTemplateTail|, or |InputElementHashbangOrRegExp|, that describe how sequences of such code points are translated into a sequence of input elements.</p>
      <p>Input elements other than white space and comments form the terminal symbols for the syntactic grammar for ECMAScript and are called ECMAScript <em>tokens</em>. These tokens are the reserved words, identifiers, literals, and punctuators of the ECMAScript language. Moreover, line terminators, although not considered to be tokens, also become part of the stream of input elements and guide the process of automatic semicolon insertion (<emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>). Simple white space and single-line comments are discarded and do not appear in the stream of input elements for the syntactic grammar. A |MultiLineComment| (that is, a comment of the form `/*`…`*/` regardless of whether it spans more than one line) is likewise simply discarded if it contains no line terminator; but if a |MultiLineComment| contains one or more line terminators, then it is replaced by a single line terminator, which becomes part of the stream of input elements for the syntactic grammar.</p>
      <p>A <em>RegExp grammar</em> for ECMAScript is given in <emu-xref href="#sec-patterns"></emu-xref>. This grammar also has as its terminal symbols the code points as defined by |SourceCharacter|. It defines a set of productions, starting from the goal symbol |Pattern|, that describe how sequences of code points are translated into regular expression patterns.</p>
      <p>Productions of the lexical and RegExp grammars are distinguished by having two colons “<b>::</b>” as separating punctuation. The lexical and RegExp grammars share some productions.</p>
    </emu-clause>

    <emu-clause id="sec-numeric-string-grammar">
      <h1>The Numeric String Grammar</h1>
      <p>A <em>numeric string grammar</em> appears in <emu-xref href="#sec-tonumber-applied-to-the-string-type"></emu-xref>. It has as its terminal symbols |SourceCharacter|, and is used for translating Strings into numeric values starting from the goal symbol |StringNumericLiteral| (which is similar to but distinct from the <emu-xref href="#sec-literals-numeric-literals">lexical grammar for numeric literals</emu-xref>).</p>
      <p>Productions of the numeric string grammar are distinguished by having three colons “<b>:::</b>” as punctuation, and are never used for parsing source text.</p>
    </emu-clause>

    <emu-clause id="sec-syntactic-grammar">
      <h1>The Syntactic Grammar</h1>
      <p>The <em>syntactic grammar</em> for ECMAScript is given in clauses <emu-xref href="#sec-ecmascript-language-expressions"></emu-xref> through <emu-xref href="#sec-ecmascript-language-scripts-and-modules"></emu-xref>. This grammar has ECMAScript tokens defined by the lexical grammar as its terminal symbols (<emu-xref href="#sec-lexical-and-regexp-grammars"></emu-xref>). It defines a set of productions, starting from two alternative goal symbols |Script| and |Module|, that describe how sequences of tokens form syntactically correct independent components of ECMAScript programs.</p>
      <p>When a stream of code points is to be parsed as an ECMAScript |Script| or |Module|, it is first converted to a stream of input elements by repeated application of the lexical grammar; this stream of input elements is then parsed by a single application of the syntactic grammar. The input stream is syntactically in error if the tokens in the stream of input elements cannot be parsed as a single instance of the goal nonterminal (|Script| or |Module|), with no tokens left over.</p>
      <p>When a parse is successful, it constructs a <em>parse tree</em>, a rooted tree structure in which each node is a <dfn variants="Parse Nodes">Parse Node</dfn>. Each Parse Node is an <em>instance</em> of a symbol in the grammar; it represents a span of the source text that can be derived from that symbol. The root node of the parse tree, representing the whole of the source text, is an instance of the parse's goal symbol. When a Parse Node is an instance of a nonterminal, it is also an instance of some production that has that nonterminal as its left-hand side. Moreover, it has zero or more <em>children</em>, one for each symbol on the production's right-hand side: each child is a Parse Node that is an instance of the corresponding symbol.</p>
      <p>New Parse Nodes are instantiated for each invocation of the parser and never reused between parses even of identical source text. Parse Nodes are considered <dfn>the same Parse Node</dfn> if and only if they represent the same span of source text, are instances of the same grammar symbol, and resulted from the same parser invocation.</p>
      <emu-note>
        <p>Parsing the same String multiple times will lead to different Parse Nodes. For example, consider:</p>
        <pre><code class="javascript">
          let str = "1 + 1;";
          eval(str);
          eval(str);
        </code></pre>
        <p>Each call to `eval` converts the value of `str` into ECMAScript source text and performs an independent parse that creates its own separate tree of Parse Nodes. The trees are distinct even though each parse operates upon a source text that was derived from the same String value.</p>
      </emu-note>
      <emu-note>Parse Nodes are specification artefacts, and implementations are not required to use an analogous data structure.</emu-note>
      <p>Productions of the syntactic grammar are distinguished by having just one colon “<b>:</b>” as punctuation.</p>
      <p>The syntactic grammar as presented in clauses <emu-xref href="#sec-ecmascript-language-expressions"></emu-xref> through <emu-xref href="#sec-ecmascript-language-scripts-and-modules"></emu-xref> is not a complete account of which token sequences are accepted as a correct ECMAScript |Script| or |Module|. Certain additional token sequences are also accepted, namely, those that would be described by the grammar if only semicolons were added to the sequence in certain places (such as before line terminator characters). Furthermore, certain token sequences that are described by the grammar are not considered acceptable if a line terminator character appears in certain “awkward” places.</p>
      <p>In certain cases, in order to avoid ambiguities, the syntactic grammar uses generalized productions that permit token sequences that do not form a valid ECMAScript |Script| or |Module|. For example, this technique is used for object literals and object destructuring patterns. In such cases a more restrictive <em>supplemental grammar</em> is provided that further restricts the acceptable token sequences. Typically, an early error rule will then state that, in certain contexts, "_P_ <dfn id="must-cover">must cover</dfn> an _N_", where _P_ is a Parse Node (an instance of the generalized production) and _N_ is a nonterminal from the supplemental grammar. This means:</p>
      <ol>
        <li>The sequence of tokens originally matched by _P_ is parsed again using _N_ as the goal symbol. If _N_ takes grammatical parameters, then they are set to the same values used when _P_ was originally parsed.</li>
        <li>If the sequence of tokens can be parsed as a single instance of _N_, with no tokens left over, then:
          <ol>
            <li>We refer to that instance of _N_ (a Parse Node, unique for a given _P_) as "the _N_ that is <dfn>covered</dfn> by _P_".</li>
            <li>All Early Error rules for _N_ and its derived productions also apply to the _N_ that is covered by _P_.</li>
          </ol>
        </li>
        <li>Otherwise (if the parse fails), it is an early Syntax Error.</li>
      </ol>
    </emu-clause>

    <emu-clause id="sec-grammar-notation" namespace="grammar-notation">
      <h1>Grammar Notation</h1>

      <emu-clause id="sec-terminal-symbols">
        <h1>Terminal Symbols</h1>
        <p>In the ECMAScript grammars, some terminal symbols are shown in `fixed-width` font. These are to appear in a source text exactly as written. All terminal symbol code points specified in this way are to be understood as the appropriate Unicode code points from the Basic Latin block, as opposed to any similar-looking code points from other Unicode ranges. A code point in a terminal symbol cannot be expressed by a `\\` |UnicodeEscapeSequence|.</p>
        <p>In grammars whose terminal symbols are individual Unicode code points (i.e., the lexical, RegExp, and numeric string grammars), a contiguous run of multiple fixed-width code points appearing in a production is a simple shorthand for the same sequence of code points, written as standalone terminal symbols.</p>
        <p>For example, the production:</p>
        <emu-grammar type="definition" example>
          HexIntegerLiteral :: `0x` HexDigits
        </emu-grammar>
        <p>is a shorthand for:</p>
        <emu-grammar type="definition" example>
          HexIntegerLiteral :: `0` `x` HexDigits
        </emu-grammar>
        <p>In contrast, in the syntactic grammar, a contiguous run of fixed-width code points is a single terminal symbol.</p>
        <p>Terminal symbols come in two other forms:</p>
        <ul>
          <li>In the lexical and RegExp grammars, Unicode code points without a conventional printed representation are instead shown in the form "&lt;ABBREV>" where "ABBREV" is a mnemonic for the code point or set of code points. These forms are defined in <emu-xref href="#sec-unicode-format-control-characters" title></emu-xref>, <emu-xref href="#sec-white-space" title></emu-xref>, and <emu-xref href="#sec-line-terminators" title></emu-xref>.</li>
          <li>In the syntactic grammar, certain terminal symbols (e.g. |IdentifierName| and |RegularExpressionLiteral|) are shown in italics, as they refer to the nonterminals of the same name in the lexical grammar.</li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-nonterminal-symbols-and-productions">
        <h1>Nonterminal Symbols and Productions</h1>
        <p>Nonterminal symbols are shown in <i>italic</i> type. The definition of a nonterminal (also called a “production”) is introduced by the name of the nonterminal being defined followed by one or more colons. (The number of colons indicates to which grammar the production belongs.) One or more alternative right-hand sides for the nonterminal then follow on succeeding lines. For example, the syntactic definition:</p>
        <emu-grammar type="definition" example>
          WhileStatement :
            `while` `(` Expression `)` Statement
        </emu-grammar>
        <p>states that the nonterminal |WhileStatement| represents the token `while`, followed by a left parenthesis token, followed by an |Expression|, followed by a right parenthesis token, followed by a |Statement|. The occurrences of |Expression| and |Statement| are themselves nonterminals. As another example, the syntactic definition:</p>
        <emu-grammar type="definition" example>
          ArgumentList :
            AssignmentExpression
            ArgumentList `,` AssignmentExpression
        </emu-grammar>
        <p>states that an |ArgumentList| may represent either a single |AssignmentExpression| or an |ArgumentList|, followed by a comma, followed by an |AssignmentExpression|. This definition of |ArgumentList| is recursive, that is, it is defined in terms of itself. The result is that an |ArgumentList| may contain any positive number of arguments, separated by commas, where each argument expression is an |AssignmentExpression|. Such recursive definitions of nonterminals are common.</p>
      </emu-clause>

      <emu-clause id="sec-optional-symbols">
        <h1>Optional Symbols</h1>
        <p>The subscripted suffix “<sub>opt</sub>”, which may appear after a terminal or nonterminal, indicates an optional symbol. The alternative containing the optional symbol actually specifies two right-hand sides, one that omits the optional element and one that includes it. This means that:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration :
            BindingIdentifier Initializer?
        </emu-grammar>
        <p>is a convenient abbreviation for:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration :
            BindingIdentifier
            BindingIdentifier Initializer
        </emu-grammar>
        <p>and that:</p>
        <emu-grammar type="definition" example>
          ForStatement :
            `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
        </emu-grammar>
        <p>is a convenient abbreviation for:</p>
        <emu-grammar type="definition" example>
          ForStatement :
            `for` `(` LexicalDeclaration `;` Expression? `)` Statement
            `for` `(` LexicalDeclaration Expression `;` Expression? `)` Statement
        </emu-grammar>
        <p>which in turn is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          ForStatement :
            `for` `(` LexicalDeclaration `;` `)` Statement
            `for` `(` LexicalDeclaration `;` Expression `)` Statement
            `for` `(` LexicalDeclaration Expression `;` `)` Statement
            `for` `(` LexicalDeclaration Expression `;` Expression `)` Statement
        </emu-grammar>
        <p>so, in this example, the nonterminal |ForStatement| actually has four alternative right-hand sides.</p>
      </emu-clause>

      <emu-clause id="sec-grammatical-parameters">
        <h1>Grammatical Parameters</h1>
        <p>A production may be parameterized by a subscripted annotation of the form “<sub>[parameters]</sub>”, which may appear as a suffix to the nonterminal symbol defined by the production. “<sub>parameters</sub>” may be either a single name or a comma separated list of names. A parameterized production is shorthand for a set of productions defining all combinations of the parameter names, preceded by an underscore, appended to the parameterized nonterminal symbol. This means that:</p>
        <emu-grammar type="definition" example>
          StatementList[Return] :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>is a convenient abbreviation for:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement

          StatementList_Return :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>and that:</p>
        <emu-grammar type="definition" example>
          StatementList[Return, In] :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement

          StatementList_Return :
            ReturnStatement
            ExpressionStatement

          StatementList_In :
            ReturnStatement
            ExpressionStatement

          StatementList_Return_In :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>Multiple parameters produce a combinatoric number of productions, not all of which are necessarily referenced in a complete grammar.</p>
        <p>References to nonterminals on the right-hand side of a production can also be parameterized. For example:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement[+In]
        </emu-grammar>
        <p>is equivalent to saying:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement_In
        </emu-grammar>
        <p>and:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement[~In]
        </emu-grammar>
        <p>is equivalent to:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>A nonterminal reference may have both a parameter list and an “<sub>opt</sub>” suffix. For example:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration :
            BindingIdentifier Initializer[+In]?
        </emu-grammar>
        <p>is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration :
            BindingIdentifier
            BindingIdentifier Initializer_In
        </emu-grammar>
        <p>Prefixing a parameter name with “<sub>?</sub>” on a right-hand side nonterminal reference makes that parameter value dependent upon the occurrence of the parameter name on the reference to the current production's left-hand side symbol. For example:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration[In] :
            BindingIdentifier Initializer[?In]
        </emu-grammar>
        <p>is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          VariableDeclaration :
            BindingIdentifier Initializer

          VariableDeclaration_In :
            BindingIdentifier Initializer_In
        </emu-grammar>
        <p>If a right-hand side alternative is prefixed with “[+parameter]” that alternative is only available if the named parameter was used in referencing the production's nonterminal symbol. If a right-hand side alternative is prefixed with “[\~parameter]” that alternative is only available if the named parameter was <em>not</em> used in referencing the production's nonterminal symbol. This means that:</p>
        <emu-grammar type="definition" example>
          StatementList[Return] :
            [+Return] ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ExpressionStatement

          StatementList_Return :
            ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>and that:</p>
        <emu-grammar type="definition" example>
          StatementList[Return] :
            [~Return] ReturnStatement
            ExpressionStatement
        </emu-grammar>
        <p>is an abbreviation for:</p>
        <emu-grammar type="definition" example>
          StatementList :
            ReturnStatement
            ExpressionStatement

          StatementList_Return :
            ExpressionStatement
        </emu-grammar>
      </emu-clause>

      <emu-clause id="sec-one-of">
        <h1>one of</h1>
        <p>When the words “<b>one of</b>” follow the colon(s) in a grammar definition, they signify that each of the terminal symbols on the following line or lines is an alternative definition. For example, the lexical grammar for ECMAScript contains the production:</p>
        <emu-grammar type="definition" example>
          NonZeroDigit :: one of
            `1` `2` `3` `4` `5` `6` `7` `8` `9`
        </emu-grammar>
        <p>which is merely a convenient abbreviation for:</p>
        <emu-grammar type="definition" example>
          NonZeroDigit ::
            `1`
            `2`
            `3`
            `4`
            `5`
            `6`
            `7`
            `8`
            `9`
        </emu-grammar>
      </emu-clause>

      <emu-clause id="sec-empty">
        <h1>[empty]</h1>
        <p>If the phrase “[empty]” appears as the right-hand side of a production, it indicates that the production's right-hand side contains no terminals or nonterminals.</p>
      </emu-clause>

      <emu-clause id="sec-lookahead-restrictions">
        <h1>Lookahead Restrictions</h1>
        <p>If the phrase “[lookahead = _seq_]” appears in the right-hand side of a production, it indicates that the production may only be used if the token sequence _seq_ is a prefix of the immediately following input token sequence. Similarly, “[lookahead ∈ _set_]”, where _set_ is a finite non-empty set of token sequences, indicates that the production may only be used if some element of _set_ is a prefix of the immediately following token sequence. For convenience, the set can also be written as a nonterminal, in which case it represents the set of all token sequences to which that nonterminal could expand. It is considered an editorial error if the nonterminal could expand to infinitely many distinct token sequences.</p>
        <p>These conditions may be negated. “[lookahead ≠ _seq_]” indicates that the containing production may only be used if _seq_ is <em>not</em> a prefix of the immediately following input token sequence, and “[lookahead ∉ _set_]” indicates that the production may only be used if <em>no</em> element of _set_ is a prefix of the immediately following token sequence.</p>
        <p>As an example, given the definitions:</p>
        <emu-grammar type="definition" example>
          DecimalDigit :: one of
            `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`

          DecimalDigits ::
            DecimalDigit
            DecimalDigits DecimalDigit
        </emu-grammar>
        <p>the definition:</p>
        <emu-grammar type="definition" example>
          LookaheadExample ::
            `n` [lookahead &notin; { `1`, `3`, `5`, `7`, `9` }] DecimalDigits
            DecimalDigit [lookahead &notin; DecimalDigit]
        </emu-grammar>
        <p>matches either the letter `n` followed by one or more decimal digits the first of which is even, or a decimal digit not followed by another decimal digit.</p>
        <p>Note that when these phrases are used in the syntactic grammar, it may not be possible to unambiguously identify the immediately following token sequence because determining later tokens requires knowing which lexical goal symbol to use at later positions. As such, when these are used in the syntactic grammar, it is considered an editorial error for a token sequence _seq_ to appear in a lookahead restriction (including as part of a set of sequences) if the choices of lexical goal symbols to use could change whether or not _seq_ would be a prefix of the resulting token sequence.</p>
      </emu-clause>

      <emu-clause id="sec-no-lineterminator-here">
        <h1>[no |LineTerminator| here]</h1>
        <p>If the phrase “[no |LineTerminator| here]” appears in the right-hand side of a production of the syntactic grammar, it indicates that the production is <em>a restricted production</em>: it may not be used if a |LineTerminator| occurs in the input stream at the indicated position. For example, the production:</p>
        <emu-grammar type="definition" example>
          ThrowStatement :
            `throw` [no LineTerminator here] Expression `;`
        </emu-grammar>
        <p>indicates that the production may not be used if a |LineTerminator| occurs in the script between the `throw` token and the |Expression|.</p>
        <p>Unless the presence of a |LineTerminator| is forbidden by a restricted production, any number of occurrences of |LineTerminator| may appear between any two consecutive tokens in the stream of input elements without affecting the syntactic acceptability of the script.</p>
      </emu-clause>

      <emu-clause id="sec-but-not">
        <h1>but not</h1>
        <p>The right-hand side of a production may specify that certain expansions are not permitted by using the phrase “<b>but not</b>” and then indicating the expansions to be excluded. For example, the production:</p>
        <emu-grammar type="definition" example>
          Identifier ::
            IdentifierName but not ReservedWord
        </emu-grammar>
        <p>means that the nonterminal |Identifier| may be replaced by any sequence of code points that could replace |IdentifierName| provided that the same sequence of code points could not replace |ReservedWord|.</p>
      </emu-clause>

      <emu-clause id="sec-descriptive-phrases">
        <h1>Descriptive Phrases</h1>
        <p>Finally, a few nonterminal symbols are described by a descriptive phrase in sans-serif type in cases where it would be impractical to list all the alternatives:</p>
        <emu-grammar type="definition" example>
          SourceCharacter ::
            &gt; any Unicode code point
        </emu-grammar>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-algorithm-conventions">
    <h1>Algorithm Conventions</h1>
    <p>The specification often uses a numbered list to specify steps in an algorithm. These algorithms are used to precisely specify the required semantics of ECMAScript language constructs. The algorithms are not intended to imply the use of any specific implementation technique. In practice, there may be more efficient algorithms available to implement a given feature.</p>
    <p>Algorithms may be explicitly parameterized with an ordered, comma-separated sequence of alias names which may be used within the algorithm steps to reference the argument passed in that position. Optional parameters are denoted with surrounding brackets ([ , _name_ ]) and are no different from required parameters within algorithm steps. A rest parameter may appear at the end of a parameter list, denoted with leading ellipsis (, ..._name_). The rest parameter captures all of the arguments provided following the required and optional parameters into a List. If there are no such additional arguments, that List is empty.</p>
    <p>Algorithm steps may be subdivided into sequential substeps. Substeps are indented and may themselves be further divided into indented substeps. Outline numbering conventions are used to identify substeps with the first level of substeps labelled with lowercase alphabetic characters and the second level of substeps labelled with lowercase roman numerals. If more than three levels are required these rules repeat with the fourth level using numeric labels. For example:</p>
    <emu-alg example>
      1. Top-level step
        1. Substep.
        1. Substep.
          1. Subsubstep.
            1. Subsubsubstep
              1. Subsubsubsubstep
                1. Subsubsubsubsubstep
    </emu-alg>
    <p>A step or substep may be written as an “if” predicate that conditions its substeps. In this case, the substeps are only applied if the predicate is true. If a step or substep begins with the word “else”, it is a predicate that is the negation of the preceding “if” predicate step at the same level.</p>
    <p>A step may specify the iterative application of its substeps.</p>
    <p>A step that begins with “<dfn id="assert">Assert</dfn>:” asserts an invariant condition of its algorithm. Such assertions are used to make explicit algorithmic invariants that would otherwise be implicit. Such assertions add no additional semantic requirements and hence need not be checked by an implementation. They are used simply to clarify algorithms.</p>
    <p>Algorithm steps may declare named aliases for any value using the form “Let _x_ be _someValue_”. These aliases are reference-like in that both _x_ and _someValue_ refer to the same underlying data and modifications to either are visible to both. Algorithm steps that want to avoid this reference-like behaviour should explicitly make a copy of the right-hand side: “Let _x_ be a copy of _someValue_” creates a shallow copy of _someValue_.</p>
    <p>Once declared, an alias may be referenced in any subsequent steps and must not be referenced from steps prior to the alias's declaration. Aliases may be modified using the form “Set _x_ to _someOtherValue_”.</p>

    <emu-clause id="sec-algorithm-conventions-abstract-operations">
      <h1>Abstract Operations</h1>
      <p>In order to facilitate their use in multiple parts of this specification, some algorithms, called <dfn>abstract operations</dfn>, are named and written in parameterized functional form so that they may be referenced by name from within other algorithms. Abstract operations are typically referenced using a functional application style such as OperationName(_arg1_, _arg2_). Some abstract operations are treated as polymorphically dispatched methods of class-like specification abstractions. Such method-like abstract operations are typically referenced using a method application style such as _someValue_.OperationName(_arg1_, _arg2_).</p>
    </emu-clause>

    <emu-clause id="sec-algorithm-conventions-syntax-directed-operations">
      <h1>Syntax-Directed Operations</h1>
      <p>A <dfn variants="syntax-directed operations">syntax-directed operation</dfn> is a named operation whose definition consists of algorithms, each of which is associated with one or more productions from one of the ECMAScript grammars. A production that has multiple alternative definitions will typically have a distinct algorithm for each alternative. When an algorithm is associated with a grammar production, it may reference the terminal and nonterminal symbols of the production alternative as if they were parameters of the algorithm. When used in this manner, nonterminal symbols refer to the actual alternative definition that is matched when parsing the source text. The <dfn oldids="sec-static-semantics-sourcetext">source text matched by</dfn> a grammar production or Parse Node derived from it is the portion of the source text that starts at the beginning of the first terminal that participated in the match and ends at the end of the last terminal that participated in the match.</p>
      <p>When an algorithm is associated with a production alternative, the alternative is typically shown without any “[ ]” grammar annotations. Such annotations should only affect the syntactic recognition of the alternative and have no effect on the associated semantics for the alternative.</p>
      <p>Syntax-directed operations are invoked with a parse node and, optionally, other parameters by using the conventions on steps <emu-xref href="#step-sdo-invocation-example-1"></emu-xref>, <emu-xref href="#step-sdo-invocation-example-2"></emu-xref>, and <emu-xref href="#step-sdo-invocation-example-3"></emu-xref> in the following algorithm:</p>
      <emu-alg example>
        1. [id="step-sdo-invocation-example-1"] Let _status_ be SyntaxDirectedOperation of |SomeNonTerminal|.
        1. Let _someParseNode_ be the parse of some source text.
        1. [id="step-sdo-invocation-example-2"] Perform SyntaxDirectedOperation of _someParseNode_.
        1. [id="step-sdo-invocation-example-3"] Perform SyntaxDirectedOperation of _someParseNode_ with argument *"value"*.
      </emu-alg>
      <p>Unless explicitly specified otherwise, all chain productions have an implicit definition for every operation that might be applied to that production's left-hand side nonterminal. The implicit definition simply reapplies the same operation with the same parameters, if any, to the chain production's sole right-hand side nonterminal and then returns the result. For example, assume that some algorithm has a step of the form: “Return Evaluation of |Block|” and that there is a production:</p>
      <emu-grammar example>
        Block :
          `{` StatementList `}`
      </emu-grammar>
      <p>but the Evaluation operation does not associate an algorithm with that production. In that case, the Evaluation operation implicitly includes an association of the form:</p>
      <p><b>Runtime Semantics: Evaluation</b></p>
      <emu-grammar example>Block : `{` StatementList `}`</emu-grammar>
      <emu-alg example>
        1. Return Evaluation of |StatementList|.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-runtime-semantics">
      <h1>Runtime Semantics</h1>
      <p>Algorithms which specify semantics that must be called at runtime are called <dfn>runtime semantics</dfn>. Runtime semantics are defined by abstract operations or syntax-directed operations.</p>

      <emu-clause id="sec-completion-ao" type="abstract operation">
        <h1>
          Completion (
            _completionRecord_: a Completion Record,
          ): a Completion Record
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to emphasize that a Completion Record is being returned.</dd>
          <dt>skip return checks</dt>
          <dd>true</dd>
        </dl>
        <emu-alg>
          1. Assert: _completionRecord_ is a Completion Record.
          1. Return _completionRecord_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-throw-an-exception">
        <h1>Throw an Exception</h1>
        <p>Algorithms steps that say to throw an exception, such as</p>
        <emu-alg example>
          1. Throw a *TypeError* exception.
        </emu-alg>
        <p>mean the same things as:</p>
        <emu-alg example>
          1. Return ThrowCompletion(a newly created *TypeError* object).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-returnifabrupt" aoid="ReturnIfAbrupt">
        <h1>ReturnIfAbrupt</h1>
        <p>Algorithms steps that say or are otherwise equivalent to:</p>
        <emu-alg example>
          1. ReturnIfAbrupt(_argument_).
        </emu-alg>
        <p>mean the same thing as:</p>
        <emu-alg example>
          1. Assert: _argument_ is a Completion Record.
          1. If _argument_ is an abrupt completion, return Completion(_argument_).
          1. Else, set _argument_ to _argument_.[[Value]].
        </emu-alg>
        <p>Algorithms steps that say or are otherwise equivalent to:</p>
        <emu-alg example>
          1. ReturnIfAbrupt(AbstractOperation()).
        </emu-alg>
        <p>mean the same thing as:</p>
        <emu-alg example>
          1. Let _hygienicTemp_ be AbstractOperation().
          1. Assert: _hygienicTemp_ is a Completion Record.
          1. If _hygienicTemp_ is an abrupt completion, return Completion(_hygienicTemp_).
          1. Else, set _hygienicTemp_ to _hygienicTemp_.[[Value]].
        </emu-alg>
        <p>Where _hygienicTemp_ is ephemeral and visible only in the steps pertaining to ReturnIfAbrupt.</p>
        <p>Algorithms steps that say or are otherwise equivalent to:</p>
        <emu-alg example>
          1. Let _result_ be AbstractOperation(ReturnIfAbrupt(_argument_)).
        </emu-alg>
        <p>mean the same thing as:</p>
        <emu-alg example>
          1. Assert: _argument_ is a Completion Record.
          1. If _argument_ is an abrupt completion, return Completion(_argument_).
          1. Else, set _argument_ to _argument_.[[Value]].
          1. Let _result_ be AbstractOperation(_argument_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-returnifabrupt-shorthands">
        <h1>ReturnIfAbrupt Shorthands</h1>
        <p>Invocations of abstract operations and syntax-directed operations that are prefixed by `?` indicate that ReturnIfAbrupt should be applied to the resulting Completion Record. For example, the step:</p>
        <emu-alg example>
          1. ? OperationName().
        </emu-alg>
        <p>is equivalent to the following step:</p>
        <emu-alg example>
          1. ReturnIfAbrupt(OperationName()).
        </emu-alg>
        <p>Similarly, for method application style, the step:</p>
        <emu-alg example>
          1. ? _someValue_.OperationName().
        </emu-alg>
        <p>is equivalent to:</p>
        <emu-alg example>
          1. ReturnIfAbrupt(_someValue_.OperationName()).
        </emu-alg>
        <p>Similarly, prefix `!` is used to indicate that the following invocation of an abstract or syntax-directed operation will never return an abrupt completion and that the resulting Completion Record's [[Value]] field should be used in place of the return value of the operation. For example, the step:</p>
        <emu-alg example>
          1. Let _val_ be ! OperationName().
        </emu-alg>
        <p>is equivalent to the following steps:</p>
        <emu-alg example>
          1. Let _val_ be OperationName().
          1. Assert: _val_ is a normal completion.
          1. Set _val_ to _val_.[[Value]].
        </emu-alg>
        <p>Syntax-directed operations for runtime semantics make use of this shorthand by placing `!` or `?` before the invocation of the operation:</p>
        <emu-alg example>
          1. Perform ! SyntaxDirectedOperation of |NonTerminal|.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-implicit-normal-completion" oldids="sec-implicit-completion-values">
        <h1>Implicit Normal Completion</h1>
        <p>In algorithms within abstract operations which are declared to return a Completion Record, and within all built-in functions, the returned value is first passed to NormalCompletion, and the result is used instead. This rule does not apply within the Completion algorithm or when the value being returned is clearly marked as a Completion Record in that step; these cases are:</p>
        <ul>
          <li>when the result of applying Completion, NormalCompletion, ThrowCompletion, or ReturnCompletion is directly returned</li>
          <li>when the result of constructing a Completion Record is directly returned</li>
        </ul>
        <p>It is an editorial error if a Completion Record is returned from such an abstract operation through any other means. For example, within these abstract operations,</p>
        <emu-alg example>
          1. Return *true*.
        </emu-alg>
        <p>means the same things as any of</p>
        <emu-alg example>
          1. Return NormalCompletion(*true*).
        </emu-alg>
        <p>or</p>
        <emu-alg example>
          1. Let _completion_ be NormalCompletion(*true*).
          1. Return Completion(_completion_).
        </emu-alg>
        <p>or</p>
        <emu-alg example>
          1. Return Completion Record { [[Type]]: ~normal~, [[Value]]: *true*, [[Target]]: ~empty~ }.
        </emu-alg>
        <p>Note that, through the ReturnIfAbrupt expansion, the following example is allowed, as within the expanded steps, the result of applying Completion is returned directly in the abrupt case and the implicit NormalCompletion application occurs after unwrapping in the normal case.</p>
        <emu-alg example>
          1. Return ? _completion_.
        </emu-alg>
        <p>The following example would be an editorial error because a Completion Record is being returned without being annotated in that step.</p>
        <emu-alg example>
          1. Let _completion_ be NormalCompletion(*true*).
          1. Return _completion_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-static-semantic-rules">
      <h1>Static Semantics</h1>
      <p>Context-free grammars are not sufficiently powerful to express all the rules that define whether a stream of input elements form a valid ECMAScript |Script| or |Module| that may be evaluated. In some situations additional rules are needed that may be expressed using either ECMAScript algorithm conventions or prose requirements. Such rules are always associated with a production of a grammar and are called the <dfn>static semantics</dfn> of the production.</p>
      <p>Static Semantic Rules have names and typically are defined using an algorithm. Named Static Semantic Rules are associated with grammar productions and a production that has multiple alternative definitions will typically have for each alternative a distinct algorithm for each applicable named static semantic rule.</p>
      <p>A special kind of static semantic rule is an <dfn id="early-error-rule">Early Error Rule</dfn>. Early error rules define early error conditions (see clause <emu-xref href="#sec-error-handling-and-language-extensions"></emu-xref>) that are associated with specific grammar productions. Evaluation of most early error rules are not explicitly invoked within the algorithms of this specification. A conforming implementation must, prior to the first evaluation of a |Script| or |Module|, validate all of the early error rules of the productions used to parse that |Script| or |Module|. If any of the early error rules are violated the |Script| or |Module| is invalid and cannot be evaluated.</p>
    </emu-clause>

    <emu-clause id="sec-mathematical-operations">
      <h1>Mathematical Operations</h1>
      <p>This specification makes reference to these kinds of numeric values:</p>
      <ul>
        <li><dfn id="mathematical-value" variants="mathematical value,mathematical values">Mathematical values</dfn>: Arbitrary real numbers, used as the default numeric type.</li>
        <li><dfn id="extended-mathematical-value" variants="extended mathematical value,extended mathematical values">Extended mathematical values</dfn>: Mathematical values together with +∞ and -∞.</li>
        <li><em>Numbers</em>: IEEE 754-2019 binary64 (double-precision floating point) values.</li>
        <li><em>BigInts</em>: ECMAScript language values representing arbitrary integers in a one-to-one correspondence.</li>
      </ul>

      <p>In the language of this specification, numerical values are distinguished among different numeric kinds using subscript suffixes. The subscript <sub>𝔽</sub> refers to Numbers, and the subscript <sub>ℤ</sub> refers to BigInts. Numeric values without a subscript suffix refer to mathematical values. This specification denotes most numeric values in base 10; it also uses numeric values of the form 0x followed by digits 0-9 or A-F as base-16 values.</p>
      <p>In general, when this specification refers to a numerical value, such as in the phrase, "the length of _y_" or "the integer represented by the four hexadecimal digits ...", without explicitly specifying a numeric kind, the phrase refers to a mathematical value. Phrases which refer to a Number or a BigInt value are explicitly annotated as such; for example, "the Number value for the number of code points in …" or "the BigInt value for …".</p>
      <p>When the term <dfn id="integer" oldids="mathematical integer" variants="integers">integer</dfn> is used in this specification, it refers to a mathematical value which is in the set of integers, unless otherwise stated. When the term <dfn id="integral-number" oldids="sec-isintegralnumber,sec-isinteger" variants="integral Numbers">integral Number</dfn> is used in this specification, it refers to a finite Number value whose mathematical value is in the set of integers.</p>
      <p>Numeric operators such as +, ×, =, and ≥ refer to those operations as determined by the type of the operands. When applied to mathematical values, the operators refer to the usual mathematical operations. When applied to extended mathematical values, the operators refer to the usual mathematical operations over the extended real numbers; indeterminate forms are not defined and their use in this specification should be considered an editorial error. When applied to Numbers, the operators refer to the relevant operations within IEEE 754-2019. When applied to BigInts, the operators refer to the usual mathematical operations applied to the mathematical value of the BigInt. Numeric operators applied to mixed-type operands (such as a Number and a mathematical value) are not defined and should be considered an editorial error in this specification.</p>
      <p>Conversions between mathematical values and Numbers or BigInts are always explicit in this document. A conversion from a mathematical value or extended mathematical value _x_ to a Number is denoted as "the Number value for _x_" or <emu-eqn id="𝔽" aoid="𝔽">𝔽(_x_)</emu-eqn>, and is defined in <emu-xref href="#sec-ecmascript-language-types-number-type"></emu-xref>. A conversion from an integer _x_ to a BigInt is denoted as "the <dfn id="bigint-value-for">BigInt value for</dfn> _x_" or <emu-eqn id="ℤ" aoid="ℤ">ℤ(_x_)</emu-eqn>. A conversion from a Number or BigInt _x_ to a mathematical value is denoted as "the <dfn id="mathematical-value-of">mathematical value of</dfn> _x_", or <emu-eqn id="ℝ" aoid="ℝ">ℝ(_x_)</emu-eqn>. The mathematical value of *+0*<sub>𝔽</sub> and *-0*<sub>𝔽</sub> is the mathematical value 0. The mathematical value of non-finite values is not defined. The <dfn id="extended-mathematical-value-of">extended mathematical value of</dfn> _x_ is the mathematical value of _x_ for finite values, and is +∞ and -∞ for *+∞*<sub>𝔽</sub> and *-∞*<sub>𝔽</sub> respectively; it is not defined for *NaN*.</p>
      <p>The mathematical function <emu-eqn id="eqn-abs" aoid="abs">abs(_x_)</emu-eqn> produces the absolute value of _x_, which is <emu-eqn>-_x_</emu-eqn> if _x_ &lt; 0 and otherwise is _x_ itself.</p>
      <p>The mathematical function <emu-eqn id="eqn-min" aoid="min">min(_x1_, _x2_, … , _xN_)</emu-eqn> produces the mathematically smallest of <emu-eqn>_x1_</emu-eqn> through <emu-eqn>_xN_</emu-eqn>. The mathematical function <emu-eqn id="eqn-max" aoid="max">max(_x1_, _x2_, ..., _xN_)</emu-eqn> produces the mathematically largest of <emu-eqn>_x1_</emu-eqn> through <emu-eqn>_xN_</emu-eqn>. The domain and range of these mathematical functions are the extended mathematical values.</p>
      <p>The notation “<emu-eqn id="eqn-modulo" aoid="modulo">_x_ modulo _y_</emu-eqn>” (_y_ must be finite and non-zero) computes a value _k_ of the same sign as _y_ (or zero) such that <emu-eqn>abs(_k_) &lt; abs(_y_) and _x_ - _k_ = _q_ × _y_</emu-eqn> for some integer _q_.</p>
      <p>The phrase "the result of <dfn id="clamping">clamping</dfn> _x_ between _lower_ and _upper_" (where _x_ is an extended mathematical value and _lower_ and _upper_ are mathematical values such that _lower_ ≤ _upper_) produces _lower_ if _x_ &lt; _lower_, produces _upper_ if _x_ > _upper_, and otherwise produces _x_.</p>
      <p>The mathematical function <emu-eqn id="eqn-floor" aoid="floor">floor(_x_)</emu-eqn> produces the largest integer (closest to +∞) that is not larger than _x_.</p>
      <emu-note>
        <p><emu-eqn>floor(_x_) = _x_ - (_x_ modulo 1)</emu-eqn>.</p>
      </emu-note>
      <p>The mathematical function <emu-eqn id="eqn-truncate" aoid="truncate">truncate(_x_)</emu-eqn> removes the fractional part of _x_ by rounding towards zero, producing <emu-eqn>-floor(-_x_)</emu-eqn> if _x_ &lt; 0 and otherwise producing <emu-eqn>floor(_x_)</emu-eqn>.</p>
      <p>Mathematical functions min, max, abs, floor, and truncate are not defined for Numbers and BigInts, and any usage of those methods that have non-mathematical value arguments would be an editorial error in this specification.</p>
      <p>An <dfn id="interval">interval</dfn> from lower bound _a_ to upper bound _b_ is a possibly-infinite, possibly-empty set of numeric values of the same numeric type. Each bound will be described as either inclusive or exclusive, but not both. There are four kinds of intervals, as follows:</p>
      <ul>
        <li>An interval from _a_ (inclusive) to _b_ (inclusive), also called an <dfn id="inclusive-interval">inclusive interval</dfn> from _a_ to _b_, includes all values _x_ of the same numeric type such that _a_ ≤ _x_ ≤ _b_, and no others.</li>
        <li>An interval from _a_ (inclusive) to _b_ (exclusive) includes all values _x_ of the same numeric type such that _a_ ≤ _x_ &lt; _b_, and no others.</li>
        <li>An interval from _a_ (exclusive) to _b_ (inclusive) includes all values _x_ of the same numeric type such that _a_ &lt; _x_ ≤ _b_, and no others.</li>
        <li>An interval from _a_ (exclusive) to _b_ (exclusive) includes all values _x_ of the same numeric type such that _a_ &lt; _x_ &lt; _b_, and no others.</li>
      </ul>
      <p>For example, the interval from 1 (inclusive) to 2 (exclusive) consists of all mathematical values between 1 and 2, including 1 and not including 2. For the purpose of defining intervals, *-0*<sub>𝔽</sub> &lt; <!-- this comment here to avoid ecmarkup complaining about comparison to 0 --> *+0*<sub>𝔽</sub>, so, for example, an inclusive interval with a lower bound of *+0*<sub>𝔽</sub> includes *+0*<sub>𝔽</sub> but not *-0*<sub>𝔽</sub>. *NaN* is never included in an interval.</p>
    </emu-clause>

    <emu-clause id="sec-value-notation">
      <h1>Value Notation</h1>
      <p>In this specification, ECMAScript language values are displayed in *bold*. Examples include *null*, *true*, or *"hello"*. These are distinguished from ECMAScript source text such as `Function.prototype.apply` or `let n = 42;`.</p>
    </emu-clause>

    <emu-clause id="sec-identity">
      <h1>Identity</h1>
      <p>In this specification, both specification values and ECMAScript language values are compared for equality. When comparing for equality, values fall into one of two categories. <dfn variants="values without identity,value without identity">Values without identity</dfn> are equal to other values without identity if all of their innate characteristics are the same — characteristics such as the magnitude of an integer or the length of a sequence. Values without identity may be manifest without prior reference by fully describing their characteristics. In contrast, each <dfn variants="values with identity">value with identity</dfn> is unique and therefore only equal to itself. Values with identity are like values without identity but with an additional unguessable, unchangeable, universally-unique characteristic called <em>identity</em>. References to existing values with identity cannot be manifest simply by describing them, as the identity itself is indescribable; instead, references to these values must be explicitly passed from one place to another. Some values with identity are mutable and therefore can have their characteristics (except their identity) changed in-place, causing all holders of the value to observe the new characteristics. A value without identity is never equal to a value with identity.</p>
      <p>From the perspective of this specification, the word “is” is used to compare two values for equality, as in “If _bool_ is *true*, then ...”, and the word “contains” is used to search for a value inside lists using equality comparisons, as in "If _list_ contains a Record _r_ such that _r_.[[Foo]] is *true*, then ...". The <em>specification identity</em> of values determines the result of these comparisons and is axiomatic in this specification.</p>
      <p>From the perspective of the ECMAScript language, language values are compared for equality using the SameValue abstract operation and the abstract operations it transitively calls. The algorithms of these comparison abstract operations determine <em>language identity</em> of ECMAScript language values.</p>
      <p>For specification values, examples of values without specification identity include, but are not limited to: mathematical values and extended mathematical values; ECMAScript source text, surrogate pairs, Directive Prologues, etc; UTF-16 code units; Unicode code points; enums; abstract operations, including syntax-directed operations, host hooks, etc; and ordered pairs. Examples of specification values with specification identity include, but are not limited to: any kind of Records, including Property Descriptors, PrivateElements, etc; Parse Nodes; Lists; <emu-xref href="#sec-set-and-relation-specification-type">Sets</emu-xref> and Relations; Abstract Closures; Data Blocks; Private Names; execution contexts and execution context stacks; agent signifiers; and WaiterList Records.</p>
      <p>Specification identity agrees with language identity for all ECMAScript language values except Symbol values produced by <emu-xref href="#sec-symbol.for">Symbol.for</emu-xref>. The ECMAScript language values without specification identity and without language identity are <emu-xref href="#sec-ecmascript-language-types-undefined-type">*undefined*</emu-xref>, <emu-xref href="#sec-ecmascript-language-types-null-type">*null*</emu-xref>, <emu-xref href="#sec-ecmascript-language-types-boolean-type">Booleans</emu-xref>, <emu-xref href="#sec-ecmascript-language-types-string-type">Strings</emu-xref>, <emu-xref href="#sec-ecmascript-language-types-number-type">Numbers</emu-xref>, and <emu-xref href="#sec-ecmascript-language-types-bigint-type">BigInts</emu-xref>. The ECMAScript language values with specification identity and language identity are <emu-xref href="#sec-ecmascript-language-types-symbol-type">Symbols</emu-xref> not produced by <emu-xref href="#sec-symbol.for">Symbol.for</emu-xref> and <emu-xref href="#sec-object-type">Objects</emu-xref>. Symbol values produced by <emu-xref href="#sec-symbol.for">Symbol.for</emu-xref> have specification identity, but not language identity.</p>
    </emu-clause>
  </emu-clause>

<h1 id="sec-ecmascript-data-types-and-values"></h1>
