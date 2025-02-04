# ECMAScript Language: Lexical Grammar
  <p>The source text of an ECMAScript |Script| or |Module| is first converted into a sequence of input elements, which are tokens, line terminators, comments, or white space. The source text is scanned from left to right, repeatedly taking the longest possible sequence of code points as the next input element.</p>
  <p>There are several situations where the identification of lexical input elements is sensitive to the syntactic grammar context that is consuming the input elements. This requires multiple goal symbols for the lexical grammar. The |InputElementHashbangOrRegExp| goal is used at the start of a |Script| or |Module|. The |InputElementRegExpOrTemplateTail| goal is used in syntactic grammar contexts where a |RegularExpressionLiteral|, a |TemplateMiddle|, or a |TemplateTail| is permitted. The |InputElementRegExp| goal symbol is used in all syntactic grammar contexts where a |RegularExpressionLiteral| is permitted but neither a |TemplateMiddle|, nor a |TemplateTail| is permitted. The |InputElementTemplateTail| goal is used in all syntactic grammar contexts where a |TemplateMiddle| or a |TemplateTail| is permitted but a |RegularExpressionLiteral| is not permitted. In all other contexts, |InputElementDiv| is used as the lexical goal symbol.</p>
  <emu-note>
    <p>The use of multiple lexical goals ensures that there are no lexical ambiguities that would affect automatic semicolon insertion. For example, there are no syntactic grammar contexts where both a leading division or division-assignment, and a leading |RegularExpressionLiteral| are permitted. This is not affected by semicolon insertion (see <emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>); in examples such as the following:</p>
    <pre><code class="javascript">
      a = b
      /hi/g.exec(c).map(d);
    </code></pre>
    <p>where the first non-whitespace, non-comment code point after a |LineTerminator| is U+002F (SOLIDUS) and the syntactic context allows division or division-assignment, no semicolon is inserted at the |LineTerminator|. That is, the above example is interpreted in the same way as:</p>
    <pre><code class="javascript">
      a = b / hi / g.exec(c).map(d);
    </code></pre>
  </emu-note>
  <h2>Syntax</h2>
  <emu-grammar type="definition">
    InputElementDiv ::
      WhiteSpace
      LineTerminator
      Comment
      CommonToken
      DivPunctuator
      RightBracePunctuator

    InputElementRegExp ::
      WhiteSpace
      LineTerminator
      Comment
      CommonToken
      RightBracePunctuator
      RegularExpressionLiteral

    InputElementRegExpOrTemplateTail ::
      WhiteSpace
      LineTerminator
      Comment
      CommonToken
      RegularExpressionLiteral
      TemplateSubstitutionTail

    InputElementTemplateTail ::
      WhiteSpace
      LineTerminator
      Comment
      CommonToken
      DivPunctuator
      TemplateSubstitutionTail

    InputElementHashbangOrRegExp ::
      WhiteSpace
      LineTerminator
      Comment
      CommonToken
      HashbangComment
      RegularExpressionLiteral
  </emu-grammar>

  <emu-clause id="sec-unicode-format-control-characters">
    <h1>Unicode Format-Control Characters</h1>
    <p>The Unicode format-control characters (i.e., the characters in category “Cf” in the Unicode Character Database such as LEFT-TO-RIGHT MARK or RIGHT-TO-LEFT MARK) are control codes used to control the formatting of a range of text in the absence of higher-level protocols for this (such as mark-up languages).</p>
    <p>It is useful to allow format-control characters in source text to facilitate editing and display. All format control characters may be used within comments, and within string literals, template literals, and regular expression literals.</p>
    <p>U+FEFF (ZERO WIDTH NO-BREAK SPACE) is a format-control character used primarily at the start of a text to mark it as Unicode and to allow detection of the text's encoding and byte order. &lt;ZWNBSP> characters intended for this purpose can sometimes also appear after the start of a text, for example as a result of concatenating files. In ECMAScript source text &lt;ZWNBSP> code points are treated as white space characters (see <emu-xref href="#sec-white-space"></emu-xref>) outside of comments, string literals, template literals, and regular expression literals.</p>
  </emu-clause>

  <emu-clause id="sec-white-space">
    <h1>White Space</h1>
    <p>White space code points are used to improve source text readability and to separate tokens (indivisible lexical units) from each other, but are otherwise insignificant. White space code points may occur between any two tokens and at the start or end of input. White space code points may occur within a |StringLiteral|, a |RegularExpressionLiteral|, a |Template|, or a |TemplateSubstitutionTail| where they are considered significant code points forming part of a literal value. They may also occur within a |Comment|, but cannot appear within any other kind of token.</p>
    <p>The ECMAScript white space code points are listed in <emu-xref href="#table-white-space-code-points"></emu-xref>.</p>
    <emu-table id="table-white-space-code-points" caption="White Space Code Points" oldids="table-32">
      <table>
        <thead>
          <tr>
            <th>
              Code Points
            </th>
            <th>
              Name
            </th>
            <th>
              Abbreviation
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            `U+0009`
          </td>
          <td>
            CHARACTER TABULATION
          </td>
          <td>
            &lt;TAB>
          </td>
        </tr>
        <tr>
          <td>
            `U+000B`
          </td>
          <td>
            LINE TABULATION
          </td>
          <td>
            &lt;VT>
          </td>
        </tr>
        <tr>
          <td>
            `U+000C`
          </td>
          <td>
            FORM FEED (FF)
          </td>
          <td>
            &lt;FF>
          </td>
        </tr>
        <tr>
          <td>
            `U+FEFF`
          </td>
          <td>
            ZERO WIDTH NO-BREAK SPACE
          </td>
          <td>
            &lt;ZWNBSP>
          </td>
        </tr>
        <tr>
          <td>
            any code point in general category “Space_Separator”
          </td>
          <td>
          </td>
          <td>
            &lt;USP>
          </td>
        </tr>
      </table>
    </emu-table>
    <emu-note>
      <p>U+0020 (SPACE) and U+00A0 (NO-BREAK SPACE) code points are part of &lt;USP>.</p>
    </emu-note>
    <emu-note>
      <p>Other than for the code points listed in <emu-xref href="#table-white-space-code-points"></emu-xref>, ECMAScript |WhiteSpace| intentionally excludes all code points that have the Unicode “White_Space” property but which are not classified in general category “Space_Separator” (“Zs”).</p>
    </emu-note>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      WhiteSpace ::
        &lt;TAB&gt;
        &lt;VT&gt;
        &lt;FF&gt;
        &lt;ZWNBSP&gt;
        &lt;USP&gt;
    </emu-grammar>
  </emu-clause>

  <emu-clause id="sec-line-terminators">
    <h1>Line Terminators</h1>
    <p>Like white space code points, line terminator code points are used to improve source text readability and to separate tokens (indivisible lexical units) from each other. However, unlike white space code points, line terminators have some influence over the behaviour of the syntactic grammar. In general, line terminators may occur between any two tokens, but there are a few places where they are forbidden by the syntactic grammar. Line terminators also affect the process of automatic semicolon insertion (<emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>). A line terminator cannot occur within any token except a |StringLiteral|, |Template|, or |TemplateSubstitutionTail|. &lt;LF> and &lt;CR> line terminators cannot occur within a |StringLiteral| token except as part of a |LineContinuation|.</p>
    <p>A line terminator can occur within a |MultiLineComment| but cannot occur within a |SingleLineComment|.</p>
    <p>Line terminators are included in the set of white space code points that are matched by the `\\s` class in regular expressions.</p>
    <p>The ECMAScript line terminator code points are listed in <emu-xref href="#table-line-terminator-code-points"></emu-xref>.</p>
    <emu-table id="table-line-terminator-code-points" caption="Line Terminator Code Points" oldids="table-33">
      <table>
        <thead>
          <tr>
            <th>
              Code Point
            </th>
            <th>
              Unicode Name
            </th>
            <th>
              Abbreviation
            </th>
          </tr>
        </thead>
        <tr>
          <td>
            `U+000A`
          </td>
          <td>
            LINE FEED (LF)
          </td>
          <td>
            &lt;LF>
          </td>
        </tr>
        <tr>
          <td>
            `U+000D`
          </td>
          <td>
            CARRIAGE RETURN (CR)
          </td>
          <td>
            &lt;CR>
          </td>
        </tr>
        <tr>
          <td>
            `U+2028`
          </td>
          <td>
            LINE SEPARATOR
          </td>
          <td>
            &lt;LS>
          </td>
        </tr>
        <tr>
          <td>
            `U+2029`
          </td>
          <td>
            PARAGRAPH SEPARATOR
          </td>
          <td>
            &lt;PS>
          </td>
        </tr>
      </table>
    </emu-table>
    <p>Only the Unicode code points in <emu-xref href="#table-line-terminator-code-points"></emu-xref> are treated as line terminators. Other new line or line breaking Unicode code points are not treated as line terminators but are treated as white space if they meet the requirements listed in <emu-xref href="#table-white-space-code-points"></emu-xref>. The sequence &lt;CR>&lt;LF> is commonly used as a line terminator. It should be considered a single |SourceCharacter| for the purpose of reporting line numbers.</p>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      LineTerminator ::
        &lt;LF&gt;
        &lt;CR&gt;
        &lt;LS&gt;
        &lt;PS&gt;

      LineTerminatorSequence ::
        &lt;LF&gt;
        &lt;CR&gt; [lookahead != &lt;LF&gt;]
        &lt;LS&gt;
        &lt;PS&gt;
        &lt;CR&gt; &lt;LF&gt;
    </emu-grammar>
  </emu-clause>

  <emu-clause id="sec-comments">
    <h1>Comments</h1>
    <p>Comments can be either single or multi-line. Multi-line comments cannot nest.</p>
    <p>Because a single-line comment can contain any Unicode code point except a |LineTerminator| code point, and because of the general rule that a token is always as long as possible, a single-line comment always consists of all code points from the `//` marker to the end of the line. However, the |LineTerminator| at the end of the line is not considered to be part of the single-line comment; it is recognized separately by the lexical grammar and becomes part of the stream of input elements for the syntactic grammar. This point is very important, because it implies that the presence or absence of single-line comments does not affect the process of automatic semicolon insertion (see <emu-xref href="#sec-automatic-semicolon-insertion"></emu-xref>).</p>
    <p>Comments behave like white space and are discarded except that, if a |MultiLineComment| contains a line terminator code point, then the entire comment is considered to be a |LineTerminator| for purposes of parsing by the syntactic grammar.</p>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      Comment ::
        MultiLineComment
        SingleLineComment

      MultiLineComment ::
        `/*` MultiLineCommentChars? `*/`

      MultiLineCommentChars ::
        MultiLineNotAsteriskChar MultiLineCommentChars?
        `*` PostAsteriskCommentChars?

      PostAsteriskCommentChars ::
        MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars?
        `*` PostAsteriskCommentChars?

      MultiLineNotAsteriskChar ::
        SourceCharacter but not `*`

      MultiLineNotForwardSlashOrAsteriskChar ::
        SourceCharacter but not one of `/` or `*`

      SingleLineComment ::
        `//` SingleLineCommentChars?

      SingleLineCommentChars ::
        SingleLineCommentChar SingleLineCommentChars?

      SingleLineCommentChar ::
        SourceCharacter but not LineTerminator
    </emu-grammar>
    <p>A number of productions in this section are given alternative definitions in section <emu-xref href="#sec-html-like-comments"></emu-xref></p>
  </emu-clause>

  <emu-clause id="sec-hashbang">
    <h1>Hashbang Comments</h1>

    <p>Hashbang Comments are location-sensitive and like other types of comments are discarded from the stream of input elements for the syntactic grammar.</p>

    <h2>Syntax</h2>
    <emu-grammar type="definition">
      HashbangComment ::
        `#!` SingleLineCommentChars?
    </emu-grammar>
  </emu-clause>

  <emu-clause id="sec-tokens">
    <h1>Tokens</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      CommonToken ::
        IdentifierName
        PrivateIdentifier
        Punctuator
        NumericLiteral
        StringLiteral
        Template
    </emu-grammar>
    <emu-note>
      <p>The |DivPunctuator|, |RegularExpressionLiteral|, |RightBracePunctuator|, and |TemplateSubstitutionTail| productions derive additional tokens that are not included in the |CommonToken| production.</p>
    </emu-note>
  </emu-clause>

  <emu-clause id="sec-names-and-keywords">
    <h1>Names and Keywords</h1>
    <p>|IdentifierName| and |ReservedWord| are tokens that are interpreted according to the Default Identifier Syntax given in Unicode Standard Annex #31, Identifier and Pattern Syntax, with some small modifications. |ReservedWord| is an enumerated subset of |IdentifierName|. The syntactic grammar defines |Identifier| as an |IdentifierName| that is not a |ReservedWord|. The Unicode identifier grammar is based on character properties specified by the Unicode Standard. The Unicode code points in the specified categories in the latest version of the Unicode Standard must be treated as in those categories by all conforming ECMAScript implementations. ECMAScript implementations may recognize identifier code points defined in later editions of the Unicode Standard.</p>
    <emu-note>
      <p>This standard specifies specific code point additions: U+0024 (DOLLAR SIGN) and U+005F (LOW LINE) are permitted anywhere in an |IdentifierName|.</p>
    </emu-note>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      PrivateIdentifier ::
        `#` IdentifierName

      IdentifierName ::
        IdentifierStart
        IdentifierName IdentifierPart

      IdentifierStart ::
        IdentifierStartChar
        `\` UnicodeEscapeSequence

      IdentifierPart ::
        IdentifierPartChar
        `\` UnicodeEscapeSequence

      IdentifierStartChar ::
        UnicodeIDStart
        `$`
        `_`

      IdentifierPartChar ::
        UnicodeIDContinue
        `$`

      // emu-format ignore
      AsciiLetter :: one of
        `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m` `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
        `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M` `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`

      UnicodeIDStart ::
        &gt; any Unicode code point with the Unicode property &ldquo;ID_Start&rdquo;

      UnicodeIDContinue ::
        &gt; any Unicode code point with the Unicode property &ldquo;ID_Continue&rdquo;
    </emu-grammar>
    <p>The definitions of the nonterminal |UnicodeEscapeSequence| is given in <emu-xref href="#sec-literals-string-literals"></emu-xref>.</p>
    <emu-note>
      <p>The nonterminal |IdentifierPart| derives `_` via |UnicodeIDContinue|.</p>
    </emu-note>
    <emu-note>
      <p>The sets of code points with Unicode properties “ID_Start” and “ID_Continue” include, respectively, the code points with Unicode properties “Other_ID_Start” and “Other_ID_Continue”.</p>
    </emu-note>

    <emu-clause id="sec-identifier-names">
      <h1>Identifier Names</h1>
      <p>Unicode escape sequences are permitted in an |IdentifierName|, where they contribute a single Unicode code point equal to the IdentifierCodePoint of the |UnicodeEscapeSequence|. The `\\` preceding the |UnicodeEscapeSequence| does not contribute any code points. A |UnicodeEscapeSequence| cannot be used to contribute a code point to an |IdentifierName| that would otherwise be invalid. In other words, if a `\\` |UnicodeEscapeSequence| sequence were replaced by the |SourceCharacter| it contributes, the result must still be a valid |IdentifierName| that has the exact same sequence of |SourceCharacter| elements as the original |IdentifierName|. All interpretations of |IdentifierName| within this specification are based upon their actual code points regardless of whether or not an escape sequence was used to contribute any particular code point.</p>
      <p>Two |IdentifierName|s that are canonically equivalent according to the Unicode Standard are <em>not</em> equal unless, after replacement of each |UnicodeEscapeSequence|, they are represented by the exact same sequence of code points.</p>

      <emu-clause id="sec-identifier-names-static-semantics-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>IdentifierStart :: `\` UnicodeEscapeSequence</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the IdentifierCodePoint of |UnicodeEscapeSequence| is not some Unicode code point matched by the |IdentifierStartChar| lexical grammar production.
          </li>
        </ul>
        <emu-grammar>IdentifierPart :: `\` UnicodeEscapeSequence</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the IdentifierCodePoint of |UnicodeEscapeSequence| is not some Unicode code point matched by the |IdentifierPartChar| lexical grammar production.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-identifiercodepoints" type="sdo">
        <h1>Static Semantics: IdentifierCodePoints ( ): a List of code points</h1>
        <dl class="header">
        </dl>
        <emu-grammar>IdentifierName :: IdentifierStart</emu-grammar>
        <emu-alg>
          1. Let _cp_ be the IdentifierCodePoint of |IdentifierStart|.
          1. Return « _cp_ ».
        </emu-alg>
        <emu-grammar>IdentifierName :: IdentifierName IdentifierPart</emu-grammar>
        <emu-alg>
          1. Let _cps_ be the IdentifierCodePoints of the derived |IdentifierName|.
          1. Let _cp_ be the IdentifierCodePoint of |IdentifierPart|.
          1. Return the list-concatenation of _cps_ and « _cp_ ».
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-identifiercodepoint" type="sdo">
        <h1>Static Semantics: IdentifierCodePoint ( ): a code point</h1>
        <dl class="header">
        </dl>
        <emu-grammar>IdentifierStart :: IdentifierStartChar</emu-grammar>
        <emu-alg>
          1. Return the code point matched by |IdentifierStartChar|.
        </emu-alg>
        <emu-grammar>IdentifierPart :: IdentifierPartChar</emu-grammar>
        <emu-alg>
          1. Return the code point matched by |IdentifierPartChar|.
        </emu-alg>
        <emu-grammar>UnicodeEscapeSequence :: `u` Hex4Digits</emu-grammar>
        <emu-alg>
          1. Return the code point whose numeric value is the MV of |Hex4Digits|.
        </emu-alg>
        <emu-grammar>UnicodeEscapeSequence :: `u{` CodePoint `}`</emu-grammar>
        <emu-alg>
          1. Return the code point whose numeric value is the MV of |CodePoint|.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-keywords-and-reserved-words" oldids="sec-reserved-words,sec-keywords,sec-future-reserved-words">
      <h1>Keywords and Reserved Words</h1>
      <p>A <dfn variants="keywords">keyword</dfn> is a token that matches |IdentifierName|, but also has a syntactic use; that is, it appears literally, in a `fixed width` font, in some syntactic production. The keywords of ECMAScript include `if`, `while`, `async`, `await`, and many others.</p>
      <p>A <dfn variants="reserved words">reserved word</dfn> is an |IdentifierName| that cannot be used as an identifier. Many keywords are reserved words, but some are not, and some are reserved only in certain contexts. `if` and `while` are reserved words. `await` is reserved only inside async functions and modules. `async` is not reserved; it can be used as a variable name or statement label without restriction.</p>
      <p>This specification uses a combination of grammatical productions and early error rules to specify which names are valid identifiers and which are reserved words. All tokens in the |ReservedWord| list below, except for `await` and `yield`, are unconditionally reserved. Exceptions for `await` and `yield` are specified in <emu-xref href="#sec-identifiers"></emu-xref>, using parameterized syntactic productions. Lastly, several early error rules restrict the set of valid identifiers. See <emu-xref href="#sec-identifiers-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-let-and-const-declarations-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-for-in-and-for-of-statements-static-semantics-early-errors"></emu-xref>, and <emu-xref href="#sec-class-definitions-static-semantics-early-errors"></emu-xref>. In summary, there are five categories of identifier names:</p>
      <ul>
        <li>
          <p>Those that are always allowed as identifiers, and are not keywords, such as `Math`, `window`, `toString`, and `_`;</p>
        </li>
        <li>
          <p>Those that are never allowed as identifiers, namely the |ReservedWord|s listed below except `await` and `yield`;</p>
        </li>
        <li>
          <p>Those that are contextually allowed as identifiers, namely `await` and `yield`;</p>
        </li>
        <li>
          <p>Those that are contextually disallowed as identifiers, in strict mode code: `let`, `static`, `implements`, `interface`, `package`, `private`, `protected`, and `public`;</p>
        </li>
        <li>
          <p>Those that are always allowed as identifiers, but also appear as keywords within certain syntactic productions, at places where |Identifier| is not allowed: `as`, `async`, `from`, `get`, `meta`, `of`, `set`, and `target`.</p>
        </li>
      </ul>
      <p>The term <dfn variants="conditional keywords">conditional keyword</dfn>, or <dfn variants="contextual keywords">contextual keyword</dfn>, is sometimes used to refer to the keywords that fall in the last three categories, and thus can be used as identifiers in some contexts and as keywords in others.</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        // emu-format ignore
        ReservedWord :: one of
          `await`
          `break`
          `case` `catch` `class` `const` `continue`
          `debugger` `default` `delete` `do`
          `else` `enum` `export` `extends`
          `false` `finally` `for` `function`
          `if` `import` `in` `instanceof`
          `new` `null`
          `return`
          `super` `switch`
          `this` `throw` `true` `try` `typeof`
          `var` `void`
          `while` `with`
          `yield`
      </emu-grammar>
      <emu-note>
        <p>Per <emu-xref href="#sec-grammar-notation"></emu-xref>, keywords in the grammar match literal sequences of specific |SourceCharacter| elements. A code point in a keyword cannot be expressed by a `\\` |UnicodeEscapeSequence|.</p>
        <p>An |IdentifierName| can contain `\\` |UnicodeEscapeSequence|s, but it is not possible to declare a variable named "else" by spelling it `els\u{65}`. The early error rules in <emu-xref href="#sec-identifiers-static-semantics-early-errors"></emu-xref> rule out identifiers with the same StringValue as a reserved word.</p>
      </emu-note>
      <emu-note>
        <p>`enum` is not currently used as a keyword in this specification. It is a <em>future reserved word</em>, set aside for use as a keyword in future language extensions.</p>
        <p>Similarly, `implements`, `interface`, `package`, `private`, `protected`, and `public` are future reserved words in strict mode code.</p>
      </emu-note>
      <emu-note>
        <p>The names `arguments` and `eval` are not keywords, but they are subject to some restrictions in strict mode code. See <emu-xref href="#sec-identifiers-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-static-semantics-assignmenttargettype"></emu-xref>, <emu-xref href="#sec-function-definitions-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-generator-function-definitions-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-async-generator-function-definitions-static-semantics-early-errors"></emu-xref>, and <emu-xref href="#sec-async-function-definitions-static-semantics-early-errors"></emu-xref>.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-punctuators">
    <h1>Punctuators</h1>
    <h2>Syntax</h2>
    <emu-grammar type="definition">
      Punctuator ::
        OptionalChainingPunctuator
        OtherPunctuator

      OptionalChainingPunctuator ::
        `?.` [lookahead &notin; DecimalDigit]

      // emu-format ignore
      OtherPunctuator :: one of
        `{` `(` `)` `[` `]`
        `.` `...` `;` `,`
        `&lt;` `&gt;` `&lt;=` `&gt;=`
        `==` `!=` `===` `!==`
        `+` `-` `*` `%` `**`
        `++` `--`
        `&lt;&lt;` `&gt;&gt;` `&gt;&gt;&gt;`
        `&amp;` `|` `^`
        `!` `~`
        `&amp;&amp;` `||` `??`
        `?` `:`
        `=` `+=` `-=` `*=` `%=` `**=` `&lt;&lt;=` `&gt;&gt;=` `&gt;&gt;&gt;=` `&amp;=` `|=` `^=`
        `&amp;&amp;=` `||=` `??=`
        `=&gt;`

      DivPunctuator ::
        `/`
        `/=`

      RightBracePunctuator ::
        `}`
    </emu-grammar>
  </emu-clause>

  <emu-clause id="sec-ecmascript-language-lexical-grammar-literals">
    <h1>Literals</h1>

    <emu-clause id="sec-null-literals">
      <h1>Null Literals</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        NullLiteral ::
          `null`
      </emu-grammar>
    </emu-clause>

    <emu-clause id="sec-boolean-literals">
      <h1>Boolean Literals</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        BooleanLiteral ::
          `true`
          `false`
      </emu-grammar>
    </emu-clause>

    <emu-clause id="sec-literals-numeric-literals" oldids="sec-additional-syntax-numeric-literals">
      <h1>Numeric Literals</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        NumericLiteralSeparator ::
          `_`

        NumericLiteral ::
          DecimalLiteral
          DecimalBigIntegerLiteral
          NonDecimalIntegerLiteral[+Sep]
          NonDecimalIntegerLiteral[+Sep] BigIntLiteralSuffix
          LegacyOctalIntegerLiteral

        DecimalBigIntegerLiteral ::
          `0` BigIntLiteralSuffix
          NonZeroDigit DecimalDigits[+Sep]? BigIntLiteralSuffix
          NonZeroDigit NumericLiteralSeparator DecimalDigits[+Sep] BigIntLiteralSuffix

        NonDecimalIntegerLiteral[Sep] ::
          BinaryIntegerLiteral[?Sep]
          OctalIntegerLiteral[?Sep]
          HexIntegerLiteral[?Sep]

        BigIntLiteralSuffix ::
          `n`

        DecimalLiteral ::
          DecimalIntegerLiteral `.` DecimalDigits[+Sep]? ExponentPart[+Sep]?
          `.` DecimalDigits[+Sep] ExponentPart[+Sep]?
          DecimalIntegerLiteral ExponentPart[+Sep]?

        DecimalIntegerLiteral ::
          `0`
          NonZeroDigit
          NonZeroDigit NumericLiteralSeparator? DecimalDigits[+Sep]
          NonOctalDecimalIntegerLiteral

        DecimalDigits[Sep] ::
          DecimalDigit
          DecimalDigits[?Sep] DecimalDigit
          [+Sep] DecimalDigits[+Sep] NumericLiteralSeparator DecimalDigit

        DecimalDigit :: one of
          `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`

        NonZeroDigit :: one of
          `1` `2` `3` `4` `5` `6` `7` `8` `9`

        ExponentPart[Sep] ::
          ExponentIndicator SignedInteger[?Sep]

        ExponentIndicator :: one of
          `e` `E`

        SignedInteger[Sep] ::
          DecimalDigits[?Sep]
          `+` DecimalDigits[?Sep]
          `-` DecimalDigits[?Sep]

        BinaryIntegerLiteral[Sep] ::
          `0b` BinaryDigits[?Sep]
          `0B` BinaryDigits[?Sep]

        BinaryDigits[Sep] ::
          BinaryDigit
          BinaryDigits[?Sep] BinaryDigit
          [+Sep] BinaryDigits[+Sep] NumericLiteralSeparator BinaryDigit

        BinaryDigit :: one of
          `0` `1`

        OctalIntegerLiteral[Sep] ::
          `0o` OctalDigits[?Sep]
          `0O` OctalDigits[?Sep]

        OctalDigits[Sep] ::
          OctalDigit
          OctalDigits[?Sep] OctalDigit
          [+Sep] OctalDigits[+Sep] NumericLiteralSeparator OctalDigit

        LegacyOctalIntegerLiteral ::
          `0` OctalDigit
          LegacyOctalIntegerLiteral OctalDigit

        NonOctalDecimalIntegerLiteral ::
          `0` NonOctalDigit
          LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit
          NonOctalDecimalIntegerLiteral DecimalDigit

        LegacyOctalLikeDecimalIntegerLiteral ::
          `0` OctalDigit
          LegacyOctalLikeDecimalIntegerLiteral OctalDigit

        OctalDigit :: one of
          `0` `1` `2` `3` `4` `5` `6` `7`

        NonOctalDigit :: one of
          `8` `9`

        HexIntegerLiteral[Sep] ::
          `0x` HexDigits[?Sep]
          `0X` HexDigits[?Sep]

        HexDigits[Sep] ::
          HexDigit
          HexDigits[?Sep] HexDigit
          [+Sep] HexDigits[+Sep] NumericLiteralSeparator HexDigit

        // emu-format ignore
        HexDigit :: one of
          `0` `1` `2` `3` `4` `5` `6` `7` `8` `9` `a` `b` `c` `d` `e` `f` `A` `B` `C` `D` `E` `F`
      </emu-grammar>
      <p>The |SourceCharacter| immediately following a |NumericLiteral| must not be an |IdentifierStart| or |DecimalDigit|.</p>
      <emu-note>
        <p>For example: `3in` is an error and not the two input elements `3` and `in`.</p>
      </emu-note>

      <emu-clause id="sec-numeric-literals-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          NumericLiteral :: LegacyOctalIntegerLiteral

          DecimalIntegerLiteral :: NonOctalDecimalIntegerLiteral
        </emu-grammar>
        <ul>
          <li>It is a Syntax Error if IsStrict(this production) is *true*.</li>
        </ul>
        <emu-note>In non-strict code, this syntax is Legacy.</emu-note>
      </emu-clause>

      <emu-clause id="sec-static-semantics-mv" oldids="sec-additional-syntax-numeric-literals-status-semantics">
        <h1>Static Semantics: MV</h1>
        <p>A numeric literal stands for a value of the Number type or the BigInt type.</p>
        <ul>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: DecimalIntegerLiteral `.` DecimalDigits</emu-grammar> is the MV of |DecimalIntegerLiteral| plus (the MV of |DecimalDigits| × 10<sup>-_n_</sup>), where _n_ is the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: DecimalIntegerLiteral `.` ExponentPart</emu-grammar> is the MV of |DecimalIntegerLiteral| × 10<sup>_e_</sup>, where _e_ is the MV of |ExponentPart|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: DecimalIntegerLiteral `.` DecimalDigits ExponentPart</emu-grammar> is (the MV of |DecimalIntegerLiteral| plus (the MV of |DecimalDigits| × 10<sup>-_n_</sup>)) × 10<sup>_e_</sup>, where _n_ is the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator| and _e_ is the MV of |ExponentPart|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: `.` DecimalDigits</emu-grammar> is the MV of |DecimalDigits| × 10<sup>-_n_</sup>, where _n_ is the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: `.` DecimalDigits ExponentPart</emu-grammar> is the MV of |DecimalDigits| × 10<sup>_e_ - _n_</sup>, where _n_ is the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator|, and _e_ is the MV of |ExponentPart|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalLiteral :: DecimalIntegerLiteral ExponentPart</emu-grammar> is the MV of |DecimalIntegerLiteral| × 10<sup>_e_</sup>, where _e_ is the MV of |ExponentPart|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalIntegerLiteral :: `0`</emu-grammar> is 0.
          </li>
          <li>
            The MV of <emu-grammar>DecimalIntegerLiteral :: NonZeroDigit NumericLiteralSeparator? DecimalDigits</emu-grammar> is (the MV of |NonZeroDigit| × 10<sup>_n_</sup>) plus the MV of |DecimalDigits|, where _n_ is the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigits :: DecimalDigits DecimalDigit</emu-grammar> is (the MV of |DecimalDigits| × 10) plus the MV of |DecimalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigits :: DecimalDigits NumericLiteralSeparator DecimalDigit</emu-grammar> is (the MV of |DecimalDigits| × 10) plus the MV of |DecimalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>ExponentPart :: ExponentIndicator SignedInteger</emu-grammar> is the MV of |SignedInteger|.
          </li>
          <li>
            The MV of <emu-grammar>SignedInteger :: `-` DecimalDigits</emu-grammar> is the negative of the MV of |DecimalDigits|.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `0`</emu-grammar> or of <emu-grammar>HexDigit :: `0`</emu-grammar> or of <emu-grammar>OctalDigit :: `0`</emu-grammar> or of <emu-grammar>LegacyOctalEscapeSequence :: `0`</emu-grammar> or of <emu-grammar>BinaryDigit :: `0`</emu-grammar> is 0.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `1`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `1`</emu-grammar> or of <emu-grammar>HexDigit :: `1`</emu-grammar> or of <emu-grammar>OctalDigit :: `1`</emu-grammar> or of <emu-grammar>BinaryDigit :: `1`</emu-grammar> is 1.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `2`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `2`</emu-grammar> or of <emu-grammar>HexDigit :: `2`</emu-grammar> or of <emu-grammar>OctalDigit :: `2`</emu-grammar> is 2.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `3`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `3`</emu-grammar> or of <emu-grammar>HexDigit :: `3`</emu-grammar> or of <emu-grammar>OctalDigit :: `3`</emu-grammar> is 3.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `4`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `4`</emu-grammar> or of <emu-grammar>HexDigit :: `4`</emu-grammar> or of <emu-grammar>OctalDigit :: `4`</emu-grammar> is 4.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `5`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `5`</emu-grammar> or of <emu-grammar>HexDigit :: `5`</emu-grammar> or of <emu-grammar>OctalDigit :: `5`</emu-grammar> is 5.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `6`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `6`</emu-grammar> or of <emu-grammar>HexDigit :: `6`</emu-grammar> or of <emu-grammar>OctalDigit :: `6`</emu-grammar> is 6.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `7`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `7`</emu-grammar> or of <emu-grammar>HexDigit :: `7`</emu-grammar> or of <emu-grammar>OctalDigit :: `7`</emu-grammar> is 7.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `8`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `8`</emu-grammar> or of <emu-grammar>NonOctalDigit :: `8`</emu-grammar> or of <emu-grammar>HexDigit :: `8`</emu-grammar> is 8.
          </li>
          <li>
            The MV of <emu-grammar>DecimalDigit :: `9`</emu-grammar> or of <emu-grammar>NonZeroDigit :: `9`</emu-grammar> or of <emu-grammar>NonOctalDigit :: `9`</emu-grammar> or of <emu-grammar>HexDigit :: `9`</emu-grammar> is 9.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `a`</emu-grammar> or of <emu-grammar>HexDigit :: `A`</emu-grammar> is 10.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `b`</emu-grammar> or of <emu-grammar>HexDigit :: `B`</emu-grammar> is 11.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `c`</emu-grammar> or of <emu-grammar>HexDigit :: `C`</emu-grammar> is 12.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `d`</emu-grammar> or of <emu-grammar>HexDigit :: `D`</emu-grammar> is 13.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `e`</emu-grammar> or of <emu-grammar>HexDigit :: `E`</emu-grammar> is 14.
          </li>
          <li>
            The MV of <emu-grammar>HexDigit :: `f`</emu-grammar> or of <emu-grammar>HexDigit :: `F`</emu-grammar> is 15.
          </li>
          <li>
            The MV of <emu-grammar>BinaryDigits :: BinaryDigits BinaryDigit</emu-grammar> is (the MV of |BinaryDigits| × 2) plus the MV of |BinaryDigit|.
          </li>
          <li>
            The MV of <emu-grammar>BinaryDigits :: BinaryDigits NumericLiteralSeparator BinaryDigit</emu-grammar> is (the MV of |BinaryDigits| × 2) plus the MV of |BinaryDigit|.
          </li>
          <li>
            The MV of <emu-grammar>OctalDigits :: OctalDigits OctalDigit</emu-grammar> is (the MV of |OctalDigits| × 8) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>OctalDigits :: OctalDigits NumericLiteralSeparator OctalDigit</emu-grammar> is (the MV of |OctalDigits| × 8) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>LegacyOctalIntegerLiteral :: LegacyOctalIntegerLiteral OctalDigit</emu-grammar> is (the MV of |LegacyOctalIntegerLiteral| times 8) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>NonOctalDecimalIntegerLiteral :: LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit</emu-grammar> is (the MV of |LegacyOctalLikeDecimalIntegerLiteral| times 10) plus the MV of |NonOctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>NonOctalDecimalIntegerLiteral :: NonOctalDecimalIntegerLiteral DecimalDigit</emu-grammar> is (the MV of |NonOctalDecimalIntegerLiteral| times 10) plus the MV of |DecimalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>LegacyOctalLikeDecimalIntegerLiteral :: LegacyOctalLikeDecimalIntegerLiteral OctalDigit</emu-grammar> is (the MV of |LegacyOctalLikeDecimalIntegerLiteral| times 10) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>HexDigits :: HexDigits HexDigit</emu-grammar> is (the MV of |HexDigits| × 16) plus the MV of |HexDigit|.
          </li>
          <li>
            The MV of <emu-grammar>HexDigits :: HexDigits NumericLiteralSeparator HexDigit</emu-grammar> is (the MV of |HexDigits| × 16) plus the MV of |HexDigit|.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-numericvalue" type="sdo">
        <h1>Static Semantics: NumericValue ( ): a Number or a BigInt</h1>
        <dl class="header">
        </dl>
        <emu-grammar>NumericLiteral :: DecimalLiteral</emu-grammar>
        <emu-alg>
          1. Return RoundMVResult(MV of |DecimalLiteral|).
        </emu-alg>
        <emu-grammar>NumericLiteral :: NonDecimalIntegerLiteral</emu-grammar>
        <emu-alg>
          1. Return 𝔽(MV of |NonDecimalIntegerLiteral|).
        </emu-alg>
        <emu-grammar>NumericLiteral :: LegacyOctalIntegerLiteral</emu-grammar>
        <emu-alg>
          1. Return 𝔽(MV of |LegacyOctalIntegerLiteral|).
        </emu-alg>
        <emu-grammar>NumericLiteral :: NonDecimalIntegerLiteral BigIntLiteralSuffix</emu-grammar>
        <emu-alg>
          1. Return the BigInt value for the MV of |NonDecimalIntegerLiteral|.
        </emu-alg>
        <emu-grammar>DecimalBigIntegerLiteral :: `0` BigIntLiteralSuffix</emu-grammar>
        <emu-alg>
          1. Return *0*<sub>ℤ</sub>.
        </emu-alg>
        <emu-grammar>DecimalBigIntegerLiteral :: NonZeroDigit BigIntLiteralSuffix</emu-grammar>
        <emu-alg>
          1. Return the BigInt value for the MV of |NonZeroDigit|.
        </emu-alg>
        <emu-grammar>
          DecimalBigIntegerLiteral ::
            NonZeroDigit DecimalDigits BigIntLiteralSuffix
            NonZeroDigit NumericLiteralSeparator DecimalDigits BigIntLiteralSuffix
        </emu-grammar>
        <emu-alg>
          1. Let _n_ be the number of code points in |DecimalDigits|, excluding all occurrences of |NumericLiteralSeparator|.
          1. Let _mv_ be (the MV of |NonZeroDigit| × 10<sup>_n_</sup>) plus the MV of |DecimalDigits|.
          1. Return ℤ(_mv_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-literals-string-literals" oldids="sec-additional-syntax-string-literals">
      <h1>String Literals</h1>
      <emu-note>
        <p>A string literal is 0 or more Unicode code points enclosed in single or double quotes. Unicode code points may also be represented by an escape sequence. All code points may appear literally in a string literal except for the closing quote code points, U+005C (REVERSE SOLIDUS), U+000D (CARRIAGE RETURN), and U+000A (LINE FEED). Any code points may appear in the form of an escape sequence. String literals evaluate to ECMAScript String values. When generating these String values Unicode code points are UTF-16 encoded as defined in <emu-xref href="#sec-utf16encodecodepoint"></emu-xref>. Code points belonging to the Basic Multilingual Plane are encoded as a single code unit element of the string. All other code points are encoded as two code unit elements of the string.</p>
      </emu-note>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        StringLiteral ::
          `"` DoubleStringCharacters? `"`
          `'` SingleStringCharacters? `'`

        DoubleStringCharacters ::
          DoubleStringCharacter DoubleStringCharacters?

        SingleStringCharacters ::
          SingleStringCharacter SingleStringCharacters?

        DoubleStringCharacter ::
          SourceCharacter but not one of `"` or `\` or LineTerminator
          &lt;LS&gt;
          &lt;PS&gt;
          `\` EscapeSequence
          LineContinuation

        SingleStringCharacter ::
          SourceCharacter but not one of `'` or `\` or LineTerminator
          &lt;LS&gt;
          &lt;PS&gt;
          `\` EscapeSequence
          LineContinuation

        LineContinuation ::
          `\` LineTerminatorSequence

        EscapeSequence ::
          CharacterEscapeSequence
          `0` [lookahead &notin; DecimalDigit]
          LegacyOctalEscapeSequence
          NonOctalDecimalEscapeSequence
          HexEscapeSequence
          UnicodeEscapeSequence

        CharacterEscapeSequence ::
          SingleEscapeCharacter
          NonEscapeCharacter

        SingleEscapeCharacter :: one of
          `'` `"` `\` `b` `f` `n` `r` `t` `v`

        NonEscapeCharacter ::
          SourceCharacter but not one of EscapeCharacter or LineTerminator

        EscapeCharacter ::
          SingleEscapeCharacter
          DecimalDigit
          `x`
          `u`

        LegacyOctalEscapeSequence ::
          `0` [lookahead &isin; { `8`, `9` }]
          NonZeroOctalDigit [lookahead &notin; OctalDigit]
          ZeroToThree OctalDigit [lookahead &notin; OctalDigit]
          FourToSeven OctalDigit
          ZeroToThree OctalDigit OctalDigit

        NonZeroOctalDigit ::
          OctalDigit but not `0`

        ZeroToThree :: one of
          `0` `1` `2` `3`

        FourToSeven :: one of
          `4` `5` `6` `7`

        NonOctalDecimalEscapeSequence :: one of
          `8` `9`

        HexEscapeSequence ::
          `x` HexDigit HexDigit

        UnicodeEscapeSequence ::
          `u` Hex4Digits
          `u{` CodePoint `}`

        Hex4Digits ::
          HexDigit HexDigit HexDigit HexDigit
      </emu-grammar>
      <p>The definition of the nonterminal |HexDigit| is given in <emu-xref href="#sec-literals-numeric-literals"></emu-xref>. |SourceCharacter| is defined in <emu-xref href="#sec-source-text"></emu-xref>.</p>
      <emu-note>
        <p>&lt;LF> and &lt;CR> cannot appear in a string literal, except as part of a |LineContinuation| to produce the empty code points sequence. The proper way to include either in the String value of a string literal is to use an escape sequence such as `\\n` or `\\u000A`.</p>
      </emu-note>

      <emu-clause id="sec-string-literals-early-errors">
        <h1>Static Semantics: Early Errors</h1>
        <emu-grammar>
          EscapeSequence ::
            LegacyOctalEscapeSequence
            NonOctalDecimalEscapeSequence
        </emu-grammar>
        <ul>
          <li>It is a Syntax Error if IsStrict(this production) is *true*.</li>
        </ul>
        <emu-note>In non-strict code, this syntax is Legacy.</emu-note>
        <emu-note>
          <p>It is possible for string literals to precede a Use Strict Directive that places the enclosing code in <emu-xref href="#sec-strict-mode-code">strict mode</emu-xref>, and implementations must take care to enforce the above rules for such literals. For example, the following source text contains a Syntax Error:</p>
          <pre><code class="javascript">
            function invalid() { "\7"; "use strict"; }
          </code></pre>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-static-semantics-sv" oldids="sec-string-literals-static-semantics-stringvalue,sec-additional-syntax-string-literals-static-semantics" type="sdo">
        <h1>Static Semantics: SV ( ): a String</h1>
        <dl class="header">
          <dt>description</dt>
          <dd>
            <p>A string literal stands for a value of the String type. SV produces String values for string literals through recursive application on the various parts of the string literal. As part of this process, some Unicode code points within the string literal are interpreted as having a mathematical value, as described below or in <emu-xref href="#sec-literals-numeric-literals"></emu-xref>.</p>
          </dd>
        </dl>
        <ul>
          <li>
            The SV of <emu-grammar>StringLiteral :: `"` `"`</emu-grammar> is the empty String.
          </li>
          <li>
            The SV of <emu-grammar>StringLiteral :: `'` `'`</emu-grammar> is the empty String.
          </li>
          <li>
            The SV of <emu-grammar>DoubleStringCharacters :: DoubleStringCharacter DoubleStringCharacters</emu-grammar> is the string-concatenation of the SV of |DoubleStringCharacter| and the SV of |DoubleStringCharacters|.
          </li>
          <li>
            The SV of <emu-grammar>SingleStringCharacters :: SingleStringCharacter SingleStringCharacters</emu-grammar> is the string-concatenation of the SV of |SingleStringCharacter| and the SV of |SingleStringCharacters|.
          </li>
          <li>
            The SV of <emu-grammar>DoubleStringCharacter :: SourceCharacter but not one of `"` or `\` or LineTerminator</emu-grammar> is the result of performing UTF16EncodeCodePoint on the code point matched by |SourceCharacter|.
          </li>
          <li>
            The SV of <emu-grammar>DoubleStringCharacter :: &lt;LS&gt;</emu-grammar> is the String value consisting of the code unit 0x2028 (LINE SEPARATOR).
          </li>
          <li>
            The SV of <emu-grammar>DoubleStringCharacter :: &lt;PS&gt;</emu-grammar> is the String value consisting of the code unit 0x2029 (PARAGRAPH SEPARATOR).
          </li>
          <li>
            The SV of <emu-grammar>DoubleStringCharacter :: LineContinuation</emu-grammar> is the empty String.
          </li>
          <li>
            The SV of <emu-grammar>SingleStringCharacter :: SourceCharacter but not one of `'` or `\` or LineTerminator</emu-grammar> is the result of performing UTF16EncodeCodePoint on the code point matched by |SourceCharacter|.
          </li>
          <li>
            The SV of <emu-grammar>SingleStringCharacter :: &lt;LS&gt;</emu-grammar> is the String value consisting of the code unit 0x2028 (LINE SEPARATOR).
          </li>
          <li>
            The SV of <emu-grammar>SingleStringCharacter :: &lt;PS&gt;</emu-grammar> is the String value consisting of the code unit 0x2029 (PARAGRAPH SEPARATOR).
          </li>
          <li>
            The SV of <emu-grammar>SingleStringCharacter :: LineContinuation</emu-grammar> is the empty String.
          </li>
          <li>
            The SV of <emu-grammar>EscapeSequence :: `0`</emu-grammar> is the String value consisting of the code unit 0x0000 (NULL).
          </li>
          <li>
            The SV of <emu-grammar>CharacterEscapeSequence :: SingleEscapeCharacter</emu-grammar> is the String value consisting of the code unit whose numeric value is determined by the |SingleEscapeCharacter| according to <emu-xref href="#table-string-single-character-escape-sequences"></emu-xref>.
          </li>
        </ul>
        <emu-table id="table-string-single-character-escape-sequences" caption="String Single Character Escape Sequences" oldids="table-34">
          <table>
            <thead>
              <tr>
                <th>
                  Escape Sequence
                </th>
                <th>
                  Code Unit Value
                </th>
                <th>
                  Unicode Character Name
                </th>
                <th>
                  Symbol
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                `\\b`
              </td>
              <td>
                `0x0008`
              </td>
              <td>
                BACKSPACE
              </td>
              <td>
                &lt;BS>
              </td>
            </tr>
            <tr>
              <td>
                `\\t`
              </td>
              <td>
                `0x0009`
              </td>
              <td>
                CHARACTER TABULATION
              </td>
              <td>
                &lt;HT>
              </td>
            </tr>
            <tr>
              <td>
                `\\n`
              </td>
              <td>
                `0x000A`
              </td>
              <td>
                LINE FEED (LF)
              </td>
              <td>
                &lt;LF>
              </td>
            </tr>
            <tr>
              <td>
                `\\v`
              </td>
              <td>
                `0x000B`
              </td>
              <td>
                LINE TABULATION
              </td>
              <td>
                &lt;VT>
              </td>
            </tr>
            <tr>
              <td>
                `\\f`
              </td>
              <td>
                `0x000C`
              </td>
              <td>
                FORM FEED (FF)
              </td>
              <td>
                &lt;FF>
              </td>
            </tr>
            <tr>
              <td>
                `\\r`
              </td>
              <td>
                `0x000D`
              </td>
              <td>
                CARRIAGE RETURN (CR)
              </td>
              <td>
                &lt;CR>
              </td>
            </tr>
            <tr>
              <td>
                `\\"`
              </td>
              <td>
                `0x0022`
              </td>
              <td>
                QUOTATION MARK
              </td>
              <td>
                `"`
              </td>
            </tr>
            <tr>
              <td>
                `\\'`
              </td>
              <td>
                `0x0027`
              </td>
              <td>
                APOSTROPHE
              </td>
              <td>
                `'`
              </td>
            </tr>
            <tr>
              <td>
                `\\\\`
              </td>
              <td>
                `0x005C`
              </td>
              <td>
                REVERSE SOLIDUS
              </td>
              <td>
                `\\`
              </td>
            </tr>
          </table>
        </emu-table>
        <ul>
          <li>
            The SV of <emu-grammar>NonEscapeCharacter :: SourceCharacter but not one of EscapeCharacter or LineTerminator</emu-grammar> is the result of performing UTF16EncodeCodePoint on the code point matched by |SourceCharacter|.
          </li>
          <li>
            The SV of <emu-grammar>EscapeSequence :: LegacyOctalEscapeSequence</emu-grammar> is the String value consisting of the code unit whose numeric value is the MV of |LegacyOctalEscapeSequence|.
          </li>
          <li>
            The SV of <emu-grammar>NonOctalDecimalEscapeSequence :: `8`</emu-grammar> is the String value consisting of the code unit 0x0038 (DIGIT EIGHT).
          </li>
          <li>
            The SV of <emu-grammar>NonOctalDecimalEscapeSequence :: `9`</emu-grammar> is the String value consisting of the code unit 0x0039 (DIGIT NINE).
          </li>
          <li>
            The SV of <emu-grammar>HexEscapeSequence :: `x` HexDigit HexDigit</emu-grammar> is the String value consisting of the code unit whose numeric value is the MV of |HexEscapeSequence|.
          </li>
          <li>
            The SV of <emu-grammar>Hex4Digits :: HexDigit HexDigit HexDigit HexDigit</emu-grammar> is the String value consisting of the code unit whose numeric value is the MV of |Hex4Digits|.
          </li>
          <li>
            The SV of <emu-grammar>UnicodeEscapeSequence :: `u{` CodePoint `}`</emu-grammar> is the result of performing UTF16EncodeCodePoint on the MV of |CodePoint|.
          </li>
          <li>
            The SV of <emu-grammar>TemplateEscapeSequence :: `0`</emu-grammar> is the String value consisting of the code unit 0x0000 (NULL).
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-string-literals-static-semantics-mv">
        <h1>Static Semantics: MV</h1>
        <ul>
          <li>
            The MV of <emu-grammar>LegacyOctalEscapeSequence :: ZeroToThree OctalDigit</emu-grammar> is (8 times the MV of |ZeroToThree|) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>LegacyOctalEscapeSequence :: FourToSeven OctalDigit</emu-grammar> is (8 times the MV of |FourToSeven|) plus the MV of |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>LegacyOctalEscapeSequence :: ZeroToThree OctalDigit OctalDigit</emu-grammar> is (64 (that is, 8<sup>2</sup>) times the MV of |ZeroToThree|) plus (8 times the MV of the first |OctalDigit|) plus the MV of the second |OctalDigit|.
          </li>
          <li>
            The MV of <emu-grammar>ZeroToThree :: `0`</emu-grammar> is 0.
          </li>
          <li>
            The MV of <emu-grammar>ZeroToThree :: `1`</emu-grammar> is 1.
          </li>
          <li>
            The MV of <emu-grammar>ZeroToThree :: `2`</emu-grammar> is 2.
          </li>
          <li>
            The MV of <emu-grammar>ZeroToThree :: `3`</emu-grammar> is 3.
          </li>
          <li>
            The MV of <emu-grammar>FourToSeven :: `4`</emu-grammar> is 4.
          </li>
          <li>
            The MV of <emu-grammar>FourToSeven :: `5`</emu-grammar> is 5.
          </li>
          <li>
            The MV of <emu-grammar>FourToSeven :: `6`</emu-grammar> is 6.
          </li>
          <li>
            The MV of <emu-grammar>FourToSeven :: `7`</emu-grammar> is 7.
          </li>
          <li>
            The MV of <emu-grammar>HexEscapeSequence :: `x` HexDigit HexDigit</emu-grammar> is (16 times the MV of the first |HexDigit|) plus the MV of the second |HexDigit|.
          </li>
          <li>
            The MV of <emu-grammar>Hex4Digits :: HexDigit HexDigit HexDigit HexDigit</emu-grammar> is (0x1000 × the MV of the first |HexDigit|) plus (0x100 × the MV of the second |HexDigit|) plus (0x10 × the MV of the third |HexDigit|) plus the MV of the fourth |HexDigit|.
          </li>
        </ul>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-literals-regular-expression-literals">
      <h1>Regular Expression Literals</h1>
      <emu-note>
        <p>A regular expression literal is an input element that is converted to a RegExp object (see <emu-xref href="#sec-regexp-regular-expression-objects"></emu-xref>) each time the literal is evaluated. Two regular expression literals in a program evaluate to regular expression objects that never compare as `===` to each other even if the two literals' contents are identical. A RegExp object may also be created at runtime by `new RegExp` or calling the RegExp constructor as a function (see <emu-xref href="#sec-regexp-constructor"></emu-xref>).</p>
      </emu-note>
      <p>The productions below describe the syntax for a regular expression literal and are used by the input element scanner to find the end of the regular expression literal. The source text comprising the |RegularExpressionBody| and the |RegularExpressionFlags| are subsequently parsed again using the more stringent ECMAScript Regular Expression grammar (<emu-xref href="#sec-patterns"></emu-xref>).</p>
      <p>An implementation may extend the ECMAScript Regular Expression grammar defined in <emu-xref href="#sec-patterns"></emu-xref>, but it must not extend the |RegularExpressionBody| and |RegularExpressionFlags| productions defined below or the productions used by these productions.</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        RegularExpressionLiteral ::
          `/` RegularExpressionBody `/` RegularExpressionFlags

        RegularExpressionBody ::
          RegularExpressionFirstChar RegularExpressionChars

        RegularExpressionChars ::
          [empty]
          RegularExpressionChars RegularExpressionChar

        RegularExpressionFirstChar ::
          RegularExpressionNonTerminator but not one of `*` or `\` or `/` or `[`
          RegularExpressionBackslashSequence
          RegularExpressionClass

        RegularExpressionChar ::
          RegularExpressionNonTerminator but not one of `\` or `/` or `[`
          RegularExpressionBackslashSequence
          RegularExpressionClass

        RegularExpressionBackslashSequence ::
          `\` RegularExpressionNonTerminator

        RegularExpressionNonTerminator ::
          SourceCharacter but not LineTerminator

        RegularExpressionClass ::
          `[` RegularExpressionClassChars `]`

        RegularExpressionClassChars ::
          [empty]
          RegularExpressionClassChars RegularExpressionClassChar

        RegularExpressionClassChar ::
          RegularExpressionNonTerminator but not one of `]` or `\`
          RegularExpressionBackslashSequence

        RegularExpressionFlags ::
          [empty]
          RegularExpressionFlags IdentifierPartChar
      </emu-grammar>
      <emu-note>
        <p>Regular expression literals may not be empty; instead of representing an empty regular expression literal, the code unit sequence `//` starts a single-line comment. To specify an empty regular expression, use: `/(?:)/`.</p>
      </emu-note>

      <emu-clause id="sec-static-semantics-bodytext" type="sdo">
        <h1>Static Semantics: BodyText ( ): source text</h1>
        <dl class="header">
        </dl>
        <emu-grammar>RegularExpressionLiteral :: `/` RegularExpressionBody `/` RegularExpressionFlags</emu-grammar>
        <emu-alg>
          1. Return the source text that was recognized as |RegularExpressionBody|.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-static-semantics-flagtext" type="sdo">
        <h1>Static Semantics: FlagText ( ): source text</h1>
        <dl class="header">
        </dl>
        <emu-grammar>RegularExpressionLiteral :: `/` RegularExpressionBody `/` RegularExpressionFlags</emu-grammar>
        <emu-alg>
          1. Return the source text that was recognized as |RegularExpressionFlags|.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-template-literal-lexical-components">
      <h1>Template Literal Lexical Components</h1>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        Template ::
          NoSubstitutionTemplate
          TemplateHead

        NoSubstitutionTemplate ::
          ``` TemplateCharacters? ```

        TemplateHead ::
          ``` TemplateCharacters? `${`

        TemplateSubstitutionTail ::
          TemplateMiddle
          TemplateTail

        TemplateMiddle ::
          `}` TemplateCharacters? `${`

        TemplateTail ::
          `}` TemplateCharacters? ```

        TemplateCharacters ::
          TemplateCharacter TemplateCharacters?

        TemplateCharacter ::
          `$` [lookahead != `{`]
          `\` TemplateEscapeSequence
          `\` NotEscapeSequence
          LineContinuation
          LineTerminatorSequence
          SourceCharacter but not one of ``` or `\` or `$` or LineTerminator

        TemplateEscapeSequence ::
          CharacterEscapeSequence
          `0` [lookahead &notin; DecimalDigit]
          HexEscapeSequence
          UnicodeEscapeSequence

        NotEscapeSequence ::
          `0` DecimalDigit
          DecimalDigit but not `0`
          `x` [lookahead &notin; HexDigit]
          `x` HexDigit [lookahead &notin; HexDigit]
          `u` [lookahead &notin; HexDigit] [lookahead != `{`]
          `u` HexDigit [lookahead &notin; HexDigit]
          `u` HexDigit HexDigit [lookahead &notin; HexDigit]
          `u` HexDigit HexDigit HexDigit [lookahead &notin; HexDigit]
          `u` `{` [lookahead &notin; HexDigit]
          `u` `{` NotCodePoint [lookahead &notin; HexDigit]
          `u` `{` CodePoint [lookahead &notin; HexDigit] [lookahead != `}`]

        NotCodePoint ::
          HexDigits[~Sep] [> but only if the MV of |HexDigits| > 0x10FFFF]

        CodePoint ::
          HexDigits[~Sep] [> but only if the MV of |HexDigits| &le; 0x10FFFF]
      </emu-grammar>
      <emu-note>
        <p>|TemplateSubstitutionTail| is used by the |InputElementTemplateTail| alternative lexical goal.</p>
      </emu-note>

      <emu-clause id="sec-static-semantics-tv" type="sdo" oldids="sec-static-semantics-tv-and-trv">
        <h1>Static Semantics: TV ( ): a String or *undefined*</h1>
        <dl class="header">
          <dt>description</dt>
          <dd>A template literal component is interpreted by TV as a value of the String type. TV is used to construct the indexed components of a template object (colloquially, the template values). In TV, escape sequences are replaced by the UTF-16 code unit(s) of the Unicode code point represented by the escape sequence.</dd>
        </dl>
        <ul>
          <li>
            The TV of <emu-grammar>NoSubstitutionTemplate :: ``` ```</emu-grammar> is the empty String.
          </li>
          <li>
            The TV of <emu-grammar>TemplateHead :: ``` `${`</emu-grammar> is the empty String.
          </li>
          <li>
            The TV of <emu-grammar>TemplateMiddle :: `}` `${`</emu-grammar> is the empty String.
          </li>
          <li>
            The TV of <emu-grammar>TemplateTail :: `}` ```</emu-grammar> is the empty String.
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacters :: TemplateCharacter TemplateCharacters</emu-grammar> is *undefined* if the TV of |TemplateCharacter| is *undefined* or the TV of |TemplateCharacters| is *undefined*. Otherwise, it is the string-concatenation of the TV of |TemplateCharacter| and the TV of |TemplateCharacters|.
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacter :: SourceCharacter but not one of ``` or `\` or `$` or LineTerminator</emu-grammar> is the result of performing UTF16EncodeCodePoint on the code point matched by |SourceCharacter|.
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacter :: `$`</emu-grammar> is the String value consisting of the code unit 0x0024 (DOLLAR SIGN).
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacter :: `\` TemplateEscapeSequence</emu-grammar> is the SV of |TemplateEscapeSequence|.
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacter :: `\` NotEscapeSequence</emu-grammar> is *undefined*.
          </li>
          <li>
            The TV of <emu-grammar>TemplateCharacter :: LineTerminatorSequence</emu-grammar> is the TRV of |LineTerminatorSequence|.
          </li>
          <li>
            The TV of <emu-grammar>LineContinuation :: `\` LineTerminatorSequence</emu-grammar> is the empty String.
          </li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-static-semantics-trv" type="sdo">
        <h1>Static Semantics: TRV ( ): a String</h1>
        <dl class="header">
          <dt>description</dt>
          <dd>A template literal component is interpreted by TRV as a value of the String type. TRV is used to construct the raw components of a template object (colloquially, the template raw values). TRV is similar to TV with the difference being that in TRV, escape sequences are interpreted as they appear in the literal.</dd>
        </dl>
        <ul>
          <li>
            The TRV of <emu-grammar>NoSubstitutionTemplate :: ``` ```</emu-grammar> is the empty String.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateHead :: ``` `${`</emu-grammar> is the empty String.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateMiddle :: `}` `${`</emu-grammar> is the empty String.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateTail :: `}` ```</emu-grammar> is the empty String.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateCharacters :: TemplateCharacter TemplateCharacters</emu-grammar> is the string-concatenation of the TRV of |TemplateCharacter| and the TRV of |TemplateCharacters|.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateCharacter :: SourceCharacter but not one of ``` or `\` or `$` or LineTerminator</emu-grammar> is the result of performing UTF16EncodeCodePoint on the code point matched by |SourceCharacter|.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateCharacter :: `$`</emu-grammar> is the String value consisting of the code unit 0x0024 (DOLLAR SIGN).
          </li>
          <li>
            The TRV of <emu-grammar>TemplateCharacter :: `\` TemplateEscapeSequence</emu-grammar> is the string-concatenation of the code unit 0x005C (REVERSE SOLIDUS) and the TRV of |TemplateEscapeSequence|.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateCharacter :: `\` NotEscapeSequence</emu-grammar> is the string-concatenation of the code unit 0x005C (REVERSE SOLIDUS) and the TRV of |NotEscapeSequence|.
          </li>
          <li>
            The TRV of <emu-grammar>TemplateEscapeSequence :: `0`</emu-grammar> is the String value consisting of the code unit 0x0030 (DIGIT ZERO).
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `0` DecimalDigit</emu-grammar> is the string-concatenation of the code unit 0x0030 (DIGIT ZERO) and the TRV of |DecimalDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `x` [lookahead &notin; HexDigit]</emu-grammar> is the String value consisting of the code unit 0x0078 (LATIN SMALL LETTER X).
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `x` HexDigit [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0078 (LATIN SMALL LETTER X) and the TRV of |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` [lookahead &notin; HexDigit] [lookahead != `{`]</emu-grammar> is the String value consisting of the code unit 0x0075 (LATIN SMALL LETTER U).
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` HexDigit [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U) and the TRV of |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` HexDigit HexDigit [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U), the TRV of the first |HexDigit|, and the TRV of the second |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` HexDigit HexDigit HexDigit [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U), the TRV of the first |HexDigit|, the TRV of the second |HexDigit|, and the TRV of the third |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` `{` [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U) and the code unit 0x007B (LEFT CURLY BRACKET).
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` `{` NotCodePoint [lookahead &notin; HexDigit]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U), the code unit 0x007B (LEFT CURLY BRACKET), and the TRV of |NotCodePoint|.
          </li>
          <li>
            The TRV of <emu-grammar>NotEscapeSequence :: `u` `{` CodePoint [lookahead &notin; HexDigit] [lookahead != `}`]</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U), the code unit 0x007B (LEFT CURLY BRACKET), and the TRV of |CodePoint|.
          </li>
          <li>
            The TRV of <emu-grammar>DecimalDigit :: one of `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`</emu-grammar> is the result of performing UTF16EncodeCodePoint on the single code point matched by this production.
          </li>
          <li>
            The TRV of <emu-grammar>CharacterEscapeSequence :: NonEscapeCharacter</emu-grammar> is the SV of |NonEscapeCharacter|.
          </li>
          <li>
            The TRV of <emu-grammar>SingleEscapeCharacter :: one of `'` `"` `\` `b` `f` `n` `r` `t` `v`</emu-grammar> is the result of performing UTF16EncodeCodePoint on the single code point matched by this production.
          </li>
          <li>
            The TRV of <emu-grammar>HexEscapeSequence :: `x` HexDigit HexDigit</emu-grammar> is the string-concatenation of the code unit 0x0078 (LATIN SMALL LETTER X), the TRV of the first |HexDigit|, and the TRV of the second |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>UnicodeEscapeSequence :: `u` Hex4Digits</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U) and the TRV of |Hex4Digits|.
          </li>
          <li>
            The TRV of <emu-grammar>UnicodeEscapeSequence :: `u{` CodePoint `}`</emu-grammar> is the string-concatenation of the code unit 0x0075 (LATIN SMALL LETTER U), the code unit 0x007B (LEFT CURLY BRACKET), the TRV of |CodePoint|, and the code unit 0x007D (RIGHT CURLY BRACKET).
          </li>
          <li>
            The TRV of <emu-grammar>Hex4Digits :: HexDigit HexDigit HexDigit HexDigit</emu-grammar> is the string-concatenation of the TRV of the first |HexDigit|, the TRV of the second |HexDigit|, the TRV of the third |HexDigit|, and the TRV of the fourth |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>HexDigits :: HexDigits HexDigit</emu-grammar> is the string-concatenation of the TRV of |HexDigits| and the TRV of |HexDigit|.
          </li>
          <li>
            The TRV of <emu-grammar>HexDigit :: one of `0` `1` `2` `3` `4` `5` `6` `7` `8` `9` `a` `b` `c` `d` `e` `f` `A` `B` `C` `D` `E` `F`</emu-grammar> is the result of performing UTF16EncodeCodePoint on the single code point matched by this production.
          </li>
          <li>
            The TRV of <emu-grammar>LineContinuation :: `\` LineTerminatorSequence</emu-grammar> is the string-concatenation of the code unit 0x005C (REVERSE SOLIDUS) and the TRV of |LineTerminatorSequence|.
          </li>
          <li>
            The TRV of <emu-grammar>LineTerminatorSequence :: &lt;LF&gt;</emu-grammar> is the String value consisting of the code unit 0x000A (LINE FEED).
          </li>
          <li>
            The TRV of <emu-grammar>LineTerminatorSequence :: &lt;CR&gt;</emu-grammar> is the String value consisting of the code unit 0x000A (LINE FEED).
          </li>
          <li>
            The TRV of <emu-grammar>LineTerminatorSequence :: &lt;LS&gt;</emu-grammar> is the String value consisting of the code unit 0x2028 (LINE SEPARATOR).
          </li>
          <li>
            The TRV of <emu-grammar>LineTerminatorSequence :: &lt;PS&gt;</emu-grammar> is the String value consisting of the code unit 0x2029 (PARAGRAPH SEPARATOR).
          </li>
          <li>
            The TRV of <emu-grammar>LineTerminatorSequence :: &lt;CR&gt; &lt;LF&gt;</emu-grammar> is the String value consisting of the code unit 0x000A (LINE FEED).
          </li>
        </ul>
        <emu-note>
          <p>TV excludes the code units of |LineContinuation| while TRV includes them. &lt;CR>&lt;LF> and &lt;CR> |LineTerminatorSequence|s are normalized to &lt;LF> for both TV and TRV. An explicit |TemplateEscapeSequence| is needed to include a &lt;CR> or &lt;CR>&lt;LF> sequence.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-automatic-semicolon-insertion">
    <h1>Automatic Semicolon Insertion</h1>
    <p>Most ECMAScript statements and declarations must be terminated with a semicolon. Such semicolons may always appear explicitly in the source text. For convenience, however, such semicolons may be omitted from the source text in certain situations. These situations are described by saying that semicolons are automatically inserted into the source code token stream in those situations.</p>

    <emu-clause id="sec-rules-of-automatic-semicolon-insertion" namespace="asi-rules">
      <h1>Rules of Automatic Semicolon Insertion</h1>
      <p>In the following rules, “token” means the actual recognized lexical token determined using the current lexical goal symbol as described in clause <emu-xref href="#sec-ecmascript-language-lexical-grammar"></emu-xref>.</p>
      <p>There are three basic rules of semicolon insertion:</p>
      <ol>
        <li>
          <p>When, as the source text is parsed from left to right, a token (called the <em>offending token</em>) is encountered that is not allowed by any production of the grammar, then a semicolon is automatically inserted before the offending token if one or more of the following conditions is true:</p>
          <ul>
            <li>
              The offending token is separated from the previous token by at least one |LineTerminator|.
            </li>
            <li>
              The offending token is `}`.
            </li>
            <li>
              The previous token is `)` and the inserted semicolon would then be parsed as the terminating semicolon of a do-while statement (<emu-xref href="#sec-do-while-statement"></emu-xref>).
            </li>
          </ul>
        </li>
        <li>
          When, as the source text is parsed from left to right, the end of the input stream of tokens is encountered and the parser is unable to parse the input token stream as a single instance of the goal nonterminal, then a semicolon is automatically inserted at the end of the input stream.
        </li>
        <li>
          When, as the source text is parsed from left to right, a token is encountered that is allowed by some production of the grammar, but the production is a <em>restricted production</em> and the token would be the first token for a terminal or nonterminal immediately following the annotation “[no |LineTerminator| here]” within the restricted production (and therefore such a token is called a restricted token), and the restricted token is separated from the previous token by at least one |LineTerminator|, then a semicolon is automatically inserted before the restricted token.
        </li>
      </ol>
      <p>However, there is an additional overriding condition on the preceding rules: a semicolon is never inserted automatically if the semicolon would then be parsed as an empty statement or if that semicolon would become one of the two semicolons in the header of a `for` statement (see <emu-xref href="#sec-for-statement"></emu-xref>).</p>
      <emu-note>
        <p>The following are the only restricted productions in the grammar:</p>
        <emu-grammar>
          UpdateExpression[Yield, Await] :
            LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] `++`
            LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] `--`

          ContinueStatement[Yield, Await] :
            `continue` `;`
            `continue` [no LineTerminator here] LabelIdentifier[?Yield, ?Await] `;`

          BreakStatement[Yield, Await] :
            `break` `;`
            `break` [no LineTerminator here] LabelIdentifier[?Yield, ?Await] `;`

          ReturnStatement[Yield, Await] :
            `return` `;`
            `return` [no LineTerminator here] Expression[+In, ?Yield, ?Await] `;`

          ThrowStatement[Yield, Await] :
            `throw` [no LineTerminator here] Expression[+In, ?Yield, ?Await] `;`

          YieldExpression[In, Await] :
            `yield`
            `yield` [no LineTerminator here] AssignmentExpression[?In, +Yield, ?Await]
            `yield` [no LineTerminator here] `*` AssignmentExpression[?In, +Yield, ?Await]

          ArrowFunction[In, Yield, Await] :
            ArrowParameters[?Yield, ?Await] [no LineTerminator here] `=>` ConciseBody[?In]

          AsyncFunctionDeclaration[Yield, Await, Default] :
            `async` [no LineTerminator here] `function` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`
            [+Default] `async` [no LineTerminator here] `function` `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

          AsyncFunctionExpression :
            `async` [no LineTerminator here] `function` BindingIdentifier[~Yield, +Await]? `(` FormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

          AsyncMethod[Yield, Await] :
            `async` [no LineTerminator here] ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[~Yield, +Await] `)` `{` AsyncFunctionBody `}`

          AsyncGeneratorDeclaration[Yield, Await, Default] :
            `async` [no LineTerminator here] `function` `*` BindingIdentifier[?Yield, ?Await] `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`
            [+Default] `async` [no LineTerminator here] `function` `*` `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

          AsyncGeneratorExpression :
            `async` [no LineTerminator here] `function` `*` BindingIdentifier[+Yield, +Await]? `(` FormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

          AsyncGeneratorMethod[Yield, Await] :
            `async` [no LineTerminator here] `*` ClassElementName[?Yield, ?Await] `(` UniqueFormalParameters[+Yield, +Await] `)` `{` AsyncGeneratorBody `}`

          AsyncArrowFunction[In, Yield, Await] :
            `async` [no LineTerminator here] AsyncArrowBindingIdentifier[?Yield] [no LineTerminator here] `=>` AsyncConciseBody[?In]
            CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] [no LineTerminator here] `=>` AsyncConciseBody[?In] #callcover

          AsyncArrowHead :
            `async` [no LineTerminator here] ArrowFormalParameters[~Yield, +Await]
        </emu-grammar>
        <p>The practical effect of these restricted productions is as follows:</p>
        <ul>
          <li>
            When a `++` or `--` token is encountered where the parser would treat it as a postfix operator, and at least one |LineTerminator| occurred between the preceding token and the `++` or `--` token, then a semicolon is automatically inserted before the `++` or `--` token.
          </li>
          <li>
            When a `continue`, `break`, `return`, `throw`, or `yield` token is encountered and a |LineTerminator| is encountered before the next token, a semicolon is automatically inserted after the `continue`, `break`, `return`, `throw`, or `yield` token.
          </li>
          <li>
            When arrow function parameter(s) are followed by a |LineTerminator| before a `=>` token, a semicolon is automatically inserted and the punctuator causes a syntax error.
          </li>
          <li>
            When an `async` token is followed by a |LineTerminator| before a `function` or |IdentifierName| or `(` token, a semicolon is automatically inserted and the `async` token is not treated as part of the same expression or class element as the following tokens.
          </li>
          <li>
            When an `async` token is followed by a |LineTerminator| before a `*` token, a semicolon is automatically inserted and the punctuator causes a syntax error.
          </li>
        </ul>
        <p>The resulting practical advice to ECMAScript programmers is:</p>
        <ul>
          <li>
            A postfix `++` or `--` operator should be on the same line as its operand.
          </li>
          <li>
            An |Expression| in a `return` or `throw` statement or an |AssignmentExpression| in a `yield` expression should start on the same line as the `return`, `throw`, or `yield` token.
          </li>
          <li>
            A |LabelIdentifier| in a `break` or `continue` statement should be on the same line as the `break` or `continue` token.
          </li>
          <li>
            The end of an arrow function's parameter(s) and its `=>` should be on the same line.
          </li>
          <li>
            The `async` token preceding an asynchronous function or method should be on the same line as the immediately following token.
          </li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-examples-of-automatic-semicolon-insertion">
      <h1>Examples of Automatic Semicolon Insertion</h1>
      <em>This section is non-normative.</em>
      <p>The source</p>
      <pre><code class="javascript">{ 1 2 } 3</code></pre>
      <p>is not a valid sentence in the ECMAScript grammar, even with the automatic semicolon insertion rules. In contrast, the source</p>
      <pre><code class="javascript">
        { 1
        2 } 3
      </code></pre>
      <p>is also not a valid ECMAScript sentence, but is transformed by automatic semicolon insertion into the following:</p>
      <pre><code class="javascript">
        { 1
        ;2 ;} 3;
      </code></pre>
      <p>which is a valid ECMAScript sentence.</p>
      <p>The source</p>
      <pre><code class="javascript">
        for (a; b
        )
      </code></pre>
      <p>is not a valid ECMAScript sentence and is not altered by automatic semicolon insertion because the semicolon is needed for the header of a `for` statement. Automatic semicolon insertion never inserts one of the two semicolons in the header of a `for` statement.</p>
      <p>The source</p>
      <pre><code class="javascript">
        return
        a + b
      </code></pre>
      <p>is transformed by automatic semicolon insertion into the following:</p>
      <pre><code class="javascript">
        return;
        a + b;
      </code></pre>
      <emu-note>
        <p>The expression `a + b` is not treated as a value to be returned by the `return` statement, because a |LineTerminator| separates it from the token `return`.</p>
      </emu-note>
      <p>The source</p>
      <pre><code class="javascript">
        a = b
        ++c
      </code></pre>
      <p>is transformed by automatic semicolon insertion into the following:</p>
      <pre><code class="javascript">
        a = b;
        ++c;
      </code></pre>
      <emu-note>
        <p>The token `++` is not treated as a postfix operator applying to the variable `b`, because a |LineTerminator| occurs between `b` and `++`.</p>
      </emu-note>
      <p>The source</p>
      <pre><code class="javascript">
        if (a &gt; b)
        else c = d
      </code></pre>
      <p>is not a valid ECMAScript sentence and is not altered by automatic semicolon insertion before the `else` token, even though no production of the grammar applies at that point, because an automatically inserted semicolon would then be parsed as an empty statement.</p>
      <p>The source</p>
      <pre><code class="javascript">
        a = b + c
        (d + e).print()
      </code></pre>
      <p>is <em>not</em> transformed by automatic semicolon insertion, because the parenthesized expression that begins the second line can be interpreted as an argument list for a function call:</p>
      <pre><code class="javascript">a = b + c(d + e).print()</code></pre>
      <p>In the circumstance that an assignment statement must begin with a left parenthesis, it is a good idea for the programmer to provide an explicit semicolon at the end of the preceding statement rather than to rely on automatic semicolon insertion.</p>
    </emu-clause>

    <emu-clause id="sec-interesting-cases-of-automatic-semicolon-insertion">
      <h1>Interesting Cases of Automatic Semicolon Insertion</h1>
      <em>This section is non-normative.</em>
      <p>ECMAScript programs can be written in a style with very few semicolons by relying on automatic semicolon insertion. As described above, semicolons are not inserted at every newline, and automatic semicolon insertion can depend on multiple tokens across line terminators.</p>

      <p>As new syntactic features are added to ECMAScript, additional grammar productions could be added that cause lines relying on automatic semicolon insertion preceding them to change grammar productions when parsed.</p>

      <p>For the purposes of this section, a case of automatic semicolon insertion is considered interesting if it is a place where a semicolon may or may not be inserted, depending on the source text which precedes it. The rest of this section describes a number of interesting cases of automatic semicolon insertion in this version of ECMAScript.</p>

      <emu-clause id="sec-asi-interesting-cases-in-statement-lists">
        <h1>Interesting Cases of Automatic Semicolon Insertion in Statement Lists</h1>
        <p>In a |StatementList|, many |StatementListItem|s end in semicolons, which may be omitted using automatic semicolon insertion. As a consequence of the rules above, at the end of a line ending an expression, a semicolon is required if the following line begins with any of the following:</p>
        <ul>
          <li><strong>An opening parenthesis (<code>(</code>)</strong>. Without a semicolon, the two lines together are treated as a |CallExpression|.</li>
          <li><strong>An opening square bracket (<code>[</code>)</strong>. Without a semicolon, the two lines together are treated as property access, rather than an |ArrayLiteral| or |ArrayAssignmentPattern|.</li>
          <li><strong>A template literal (<code>`</code>)</strong>. Without a semicolon, the two lines together are interpreted as a tagged Template (<emu-xref href="#sec-tagged-templates"></emu-xref>), with the previous expression as the |MemberExpression|.</li>
          <li><strong>Unary <code>+</code> or <code>-</code></strong>. Without a semicolon, the two lines together are interpreted as a usage of the corresponding binary operator.</li>
          <li><strong>A RegExp literal</strong>. Without a semicolon, the two lines together may be parsed instead as the `/` |MultiplicativeOperator|, for example if the RegExp has flags.</li>
        </ul>
      </emu-clause>

      <emu-clause id="sec-asi-cases-with-no-lineterminator-here">
        <h1>Cases of Automatic Semicolon Insertion and “[no |LineTerminator| here]”</h1>
        <em>This section is non-normative.</em>
        <p>ECMAScript contains grammar productions which include “[no |LineTerminator| here]”. These productions are sometimes a means to have optional operands in the grammar. Introducing a |LineTerminator| in these locations would change the grammar production of a source text by using the grammar production without the optional operand.</p>

        <p>The rest of this section describes a number of productions using “[no |LineTerminator| here]” in this version of ECMAScript.</p>

        <emu-clause id="sec-no-lineterminator-here-automatic-semicolon-insertion-list">
          <h1>List of Grammar Productions with Optional Operands and “[no |LineTerminator| here]”</h1>
          <ul>
            <li>|UpdateExpression|.</li>
            <li>|ContinueStatement|.</li>
            <li>|BreakStatement|.</li>
            <li>|ReturnStatement|.</li>
            <li>|YieldExpression|.</li>
            <li>Async Function Definitions (<emu-xref href="#sec-async-function-definitions"></emu-xref>) with relation to Function Definitions (<emu-xref href="#sec-function-definitions"></emu-xref>)</li>
          </ul>
        </emu-clause>
      </emu-clause>
    </emu-clause>
  </emu-clause>
</emu-clause>

<h1 id="sec-ecmascript-language-expressions"></h1>
