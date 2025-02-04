# Additional ECMAScript Features for Web Browsers
  <p>The ECMAScript language syntax and semantics defined in this annex are required when the ECMAScript host is a web browser. The content of this annex is normative but optional if the ECMAScript host is not a web browser.</p>
  <emu-note>
    <p>This annex describes various legacy features and other characteristics of web browser ECMAScript hosts. All of the language features and behaviours specified in this annex have one or more undesirable characteristics and in the absence of legacy usage would be removed from this specification. However, the usage of these features by large numbers of existing web pages means that web browsers must continue to support them. The specifications in this annex define the requirements for interoperable implementations of these legacy features.</p>
    <p>These features are not considered part of the core ECMAScript language. Programmers should not use or assume the existence of these features and behaviours when writing new ECMAScript code. ECMAScript implementations are discouraged from implementing these features unless the implementation is part of a web browser or is required to run the same legacy ECMAScript code that web browsers encounter.</p>
  </emu-note>

  <emu-annex id="sec-additional-syntax">
    <h1>Additional Syntax</h1>

    <emu-annex id="sec-html-like-comments">
      <h1>HTML-like Comments</h1>
      <p>The syntax and semantics of <emu-xref href="#sec-comments"></emu-xref> is extended as follows except that this extension is not allowed when parsing source text using the goal symbol |Module|:</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        InputElementHashbangOrRegExp ::
          WhiteSpace
          LineTerminator
          Comment
          CommonToken
          HashbangComment
          RegularExpressionLiteral
          HTMLCloseComment

        Comment ::
          MultiLineComment
          SingleLineComment
          SingleLineHTMLOpenComment
          SingleLineHTMLCloseComment
          SingleLineDelimitedComment

        MultiLineComment ::
          `/*` FirstCommentLine? LineTerminator MultiLineCommentChars? `*/` HTMLCloseComment?

        FirstCommentLine ::
          SingleLineDelimitedCommentChars

        SingleLineHTMLOpenComment ::
          `&lt;!--` SingleLineCommentChars?

        SingleLineHTMLCloseComment ::
          LineTerminatorSequence HTMLCloseComment

        SingleLineDelimitedComment ::
          `/*` SingleLineDelimitedCommentChars? `*/`

        HTMLCloseComment ::
          WhiteSpaceSequence? SingleLineDelimitedCommentSequence? `--&gt;` SingleLineCommentChars?

        SingleLineDelimitedCommentChars ::
          SingleLineNotAsteriskChar SingleLineDelimitedCommentChars?
          `*` SingleLinePostAsteriskCommentChars?

        SingleLineNotAsteriskChar ::
          SourceCharacter but not one of `*` or LineTerminator

        SingleLinePostAsteriskCommentChars ::
          SingleLineNotForwardSlashOrAsteriskChar SingleLineDelimitedCommentChars?
          `*` SingleLinePostAsteriskCommentChars?

        SingleLineNotForwardSlashOrAsteriskChar ::
          SourceCharacter but not one of `/` or `*` or LineTerminator

        WhiteSpaceSequence ::
          WhiteSpace WhiteSpaceSequence?

        SingleLineDelimitedCommentSequence ::
          SingleLineDelimitedComment WhiteSpaceSequence? SingleLineDelimitedCommentSequence?
      </emu-grammar>
      <p>Similar to a |MultiLineComment| that contains a line terminator code point, a |SingleLineHTMLCloseComment| is considered to be a |LineTerminator| for purposes of parsing by the syntactic grammar.</p>
    </emu-annex>

    <emu-annex id="sec-regular-expressions-patterns">
      <h1>Regular Expressions Patterns</h1>
      <p>The syntax of <emu-xref href="#sec-patterns"></emu-xref> is modified and extended as follows. These changes introduce ambiguities that are broken by the ordering of grammar productions and by contextual information. When parsing using the following grammar, each alternative is considered only if previous production alternatives do not match.</p>
      <p>This alternative pattern grammar and semantics only changes the syntax and semantics of BMP patterns. The following grammar extensions include productions parameterized with the [UnicodeMode] parameter. However, none of these extensions change the syntax of Unicode patterns recognized when parsing with the [UnicodeMode] parameter present on the goal symbol.</p>
      <h2>Syntax</h2>
      <emu-grammar type="definition">
        Term[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          [+UnicodeMode] Assertion[+UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]
          [+UnicodeMode] Atom[+UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] Quantifier
          [+UnicodeMode] Atom[+UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups]
          [~UnicodeMode] QuantifiableAssertion[?NamedCaptureGroups] Quantifier
          [~UnicodeMode] Assertion[~UnicodeMode, ~UnicodeSetsMode, ?NamedCaptureGroups]
          [~UnicodeMode] ExtendedAtom[?NamedCaptureGroups] Quantifier
          [~UnicodeMode] ExtendedAtom[?NamedCaptureGroups]

        Assertion[UnicodeMode, UnicodeSetsMode, NamedCaptureGroups] ::
          `^`
          `$`
          `\b`
          `\B`
          [+UnicodeMode] `(?=` Disjunction[+UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          [+UnicodeMode] `(?!` Disjunction[+UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          [~UnicodeMode] QuantifiableAssertion[?NamedCaptureGroups]
          `(?&lt;=` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?&lt;!` Disjunction[?UnicodeMode, ?UnicodeSetsMode, ?NamedCaptureGroups] `)`

        QuantifiableAssertion[NamedCaptureGroups] ::
          `(?=` Disjunction[~UnicodeMode, ~UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?!` Disjunction[~UnicodeMode, ~UnicodeSetsMode, ?NamedCaptureGroups] `)`

        ExtendedAtom[NamedCaptureGroups] ::
          `.`
          `\` AtomEscape[~UnicodeMode, ?NamedCaptureGroups]
          `\` [lookahead == `c`]
          CharacterClass[~UnicodeMode, ~UnicodeSetsMode]
          `(` GroupSpecifier[~UnicodeMode]? Disjunction[~UnicodeMode, ~UnicodeSetsMode, ?NamedCaptureGroups] `)`
          `(?:` Disjunction[~UnicodeMode, ~UnicodeSetsMode, ?NamedCaptureGroups] `)`
          InvalidBracedQuantifier
          ExtendedPatternCharacter

        InvalidBracedQuantifier ::
          `{` DecimalDigits[~Sep] `}`
          `{` DecimalDigits[~Sep] `,}`
          `{` DecimalDigits[~Sep] `,` DecimalDigits[~Sep] `}`

        ExtendedPatternCharacter ::
          SourceCharacter but not one of `^` `$` `\` `.` `*` `+` `?` `(` `)` `[` `|`

        AtomEscape[UnicodeMode, NamedCaptureGroups] ::
          [+UnicodeMode] DecimalEscape
          [~UnicodeMode] DecimalEscape [> but only if the CapturingGroupNumber of |DecimalEscape| is &le; CountLeftCapturingParensWithin(the |Pattern| containing |DecimalEscape|)]
          CharacterClassEscape[?UnicodeMode]
          CharacterEscape[?UnicodeMode, ?NamedCaptureGroups]
          [+NamedCaptureGroups] `k` GroupName[?UnicodeMode]

        CharacterEscape[UnicodeMode, NamedCaptureGroups] ::
          ControlEscape
          `c` AsciiLetter
          `0` [lookahead &notin; DecimalDigit]
          HexEscapeSequence
          RegExpUnicodeEscapeSequence[?UnicodeMode]
          [~UnicodeMode] LegacyOctalEscapeSequence
          IdentityEscape[?UnicodeMode, ?NamedCaptureGroups]

        IdentityEscape[UnicodeMode, NamedCaptureGroups] ::
          [+UnicodeMode] SyntaxCharacter
          [+UnicodeMode] `/`
          [~UnicodeMode] SourceCharacterIdentityEscape[?NamedCaptureGroups]

        SourceCharacterIdentityEscape[NamedCaptureGroups] ::
          [~NamedCaptureGroups] SourceCharacter but not `c`
          [+NamedCaptureGroups] SourceCharacter but not one of `c` or `k`

        ClassAtomNoDash[UnicodeMode, NamedCaptureGroups] ::
          SourceCharacter but not one of `\` or `]` or `-`
          `\` ClassEscape[?UnicodeMode, ?NamedCaptureGroups]
          `\` [lookahead == `c`]

        ClassEscape[UnicodeMode, NamedCaptureGroups] ::
          `b`
          [+UnicodeMode] `-`
          [~UnicodeMode] `c` ClassControlLetter
          CharacterClassEscape[?UnicodeMode]
          CharacterEscape[?UnicodeMode, ?NamedCaptureGroups]

        ClassControlLetter ::
          DecimalDigit
          `_`
      </emu-grammar>
      <emu-note>
        <p>When the same left-hand sides occurs with both [+UnicodeMode] and [\~UnicodeMode] guards it is to control the disambiguation priority.</p>
      </emu-note>

      <emu-annex id="sec-patterns-static-semantics-early-errors-annexb">
        <h1>Static Semantics: Early Errors</h1>
        <p>The semantics of <emu-xref href="#sec-patterns-static-semantics-early-errors"></emu-xref> is extended as follows:</p>
        <emu-grammar>ExtendedAtom :: InvalidBracedQuantifier</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if any source text is matched by this production.
          </li>
        </ul>
        <p>Additionally, the rules for the following productions are modified with the addition of the <ins>highlighted</ins> text:</p>
        <emu-grammar>NonemptyClassRanges :: ClassAtom `-` ClassAtom ClassContents</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsCharacterClass of the first |ClassAtom| is *true* or IsCharacterClass of the second |ClassAtom| is *true* <ins>and this production has a <sub>[UnicodeMode]</sub> parameter</ins>.
          </li>
          <li>
            It is a Syntax Error if IsCharacterClass of the first |ClassAtom| is *false*, IsCharacterClass of the second |ClassAtom| is *false*, and the CharacterValue of the first |ClassAtom| is strictly greater than the CharacterValue of the second |ClassAtom|.
          </li>
        </ul>
        <emu-grammar>NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtom ClassContents</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if IsCharacterClass of |ClassAtomNoDash| is *true* or IsCharacterClass of |ClassAtom| is *true* <ins>and this production has a <sub>[UnicodeMode]</sub> parameter</ins>.
          </li>
          <li>
            It is a Syntax Error if IsCharacterClass of |ClassAtomNoDash| is *false*, IsCharacterClass of |ClassAtom| is *false*, and the CharacterValue of |ClassAtomNoDash| is strictly greater than the CharacterValue of |ClassAtom|.
          </li>
        </ul>
      </emu-annex>

      <emu-annex id="sec-countleftcapturingparens-annexb">
        <h1>Static Semantics: CountLeftCapturingParensWithin and CountLeftCapturingParensBefore</h1>
        <p>In the definitions of CountLeftCapturingParensWithin and CountLeftCapturingParensBefore, references to “<emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> ” are to be interpreted as meaning “<emu-grammar>Atom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> ” or “<emu-grammar>ExtendedAtom :: `(` GroupSpecifier? Disjunction `)`</emu-grammar> ”.</p>
      </emu-annex>

      <emu-annex id="sec-patterns-static-semantics-is-character-class-annexb">
        <h1>Static Semantics: IsCharacterClass</h1>
        <p>The semantics of <emu-xref href="#sec-patterns-static-semantics-is-character-class"></emu-xref> is extended as follows:</p>
        <emu-grammar>
          ClassAtomNoDash :: `\` [lookahead == `c`]
        </emu-grammar>
        <emu-alg>
          1. Return *false*.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-patterns-static-semantics-character-value-annexb">
        <h1>Static Semantics: CharacterValue</h1>
        <p>The semantics of <emu-xref href="#sec-patterns-static-semantics-character-value"></emu-xref> is extended as follows:</p>
        <emu-grammar>
          ClassAtomNoDash :: `\` [lookahead == `c`]
        </emu-grammar>
        <emu-alg>
          1. Return the numeric value of U+005C (REVERSE SOLIDUS).
        </emu-alg>
        <emu-grammar>ClassEscape :: `c` ClassControlLetter</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the code point matched by |ClassControlLetter|.
          1. Let _i_ be the numeric value of _ch_.
          1. Return the remainder of dividing _i_ by 32.
        </emu-alg>
        <emu-grammar>CharacterEscape :: LegacyOctalEscapeSequence</emu-grammar>
        <emu-alg>
          1. Return the MV of |LegacyOctalEscapeSequence| (see <emu-xref href="#sec-string-literals-static-semantics-mv"></emu-xref>).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-compilesubpattern-annexb" oldids="sec-regular-expression-patterns-semantics">
        <h1>Runtime Semantics: CompileSubpattern</h1>
        <p>The semantics of CompileSubpattern is extended as follows:</p>

        <p>The rule for <emu-grammar>Term :: QuantifiableAssertion Quantifier</emu-grammar> is the same as for <emu-grammar>Term :: Atom Quantifier</emu-grammar> but with |QuantifiableAssertion| substituted for |Atom|.</p>
        <p>The rule for <emu-grammar>Term :: ExtendedAtom Quantifier</emu-grammar> is the same as for <emu-grammar>Term :: Atom Quantifier</emu-grammar> but with |ExtendedAtom| substituted for |Atom|.</p>
        <p>The rule for <emu-grammar>Term :: ExtendedAtom</emu-grammar> is the same as for <emu-grammar>Term :: Atom</emu-grammar> but with |ExtendedAtom| substituted for |Atom|.</p>
      </emu-annex>

      <emu-annex id="sec-compileassertion-annexb">
        <h1>Runtime Semantics: CompileAssertion</h1>
        <p>CompileAssertion rules for the <emu-grammar>Assertion :: `(?=` Disjunction `)`</emu-grammar> and <emu-grammar>Assertion :: `(?!` Disjunction `)`</emu-grammar> productions are also used for the |QuantifiableAssertion| productions, but with |QuantifiableAssertion| substituted for |Assertion|.</p>
      </emu-annex>

      <emu-annex id="sec-compileatom-annexb">
        <h1>Runtime Semantics: CompileAtom</h1>
        <p>CompileAtom rules for the |Atom| productions except for <emu-grammar>Atom :: PatternCharacter</emu-grammar> are also used for the |ExtendedAtom| productions, but with |ExtendedAtom| substituted for |Atom|. The following rules, with parameter _direction_, are also added:</p>
        <emu-grammar>ExtendedAtom :: `\` [lookahead == `c`]</emu-grammar>
        <emu-alg>
          1. Let _A_ be the CharSet containing the single character `\\` U+005C (REVERSE SOLIDUS).
          1. Return CharacterSetMatcher(_rer_, _A_, *false*, _direction_).
        </emu-alg>
        <emu-grammar>ExtendedAtom :: ExtendedPatternCharacter</emu-grammar>
        <emu-alg>
          1. Let _ch_ be the character represented by |ExtendedPatternCharacter|.
          1. Let _A_ be a one-element CharSet containing the character _ch_.
          1. Return CharacterSetMatcher(_rer_, _A_, *false*, _direction_).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-compiletocharset-annexb">
        <h1>Runtime Semantics: CompileToCharSet</h1>
        <p>The semantics of <emu-xref href="#sec-compiletocharset"></emu-xref> is extended as follows:</p>

        <p>The following two rules replace the corresponding rules of CompileToCharSet.</p>
        <emu-grammar>NonemptyClassRanges :: ClassAtom `-` ClassAtom ClassContents</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of the first |ClassAtom| with argument _rer_.
          1. Let _B_ be CompileToCharSet of the second |ClassAtom| with argument _rer_.
          1. Let _C_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Let _D_ be CharacterRangeOrUnion(_rer_, _A_, _B_).
          1. Return the union of _D_ and _C_.
        </emu-alg>
        <emu-grammar>NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtom ClassContents</emu-grammar>
        <emu-alg>
          1. Let _A_ be CompileToCharSet of |ClassAtomNoDash| with argument _rer_.
          1. Let _B_ be CompileToCharSet of |ClassAtom| with argument _rer_.
          1. Let _C_ be CompileToCharSet of |ClassContents| with argument _rer_.
          1. Let _D_ be CharacterRangeOrUnion(_rer_, _A_, _B_).
          1. Return the union of _D_ and _C_.
        </emu-alg>

        <p>In addition, the following rules are added to CompileToCharSet.</p>
        <emu-grammar>ClassEscape :: `c` ClassControlLetter</emu-grammar>
        <emu-alg>
          1. Let _cv_ be the CharacterValue of this |ClassEscape|.
          1. Let _c_ be the character whose character value is _cv_.
          1. Return the CharSet containing the single character _c_.
        </emu-alg>
        <emu-grammar>ClassAtomNoDash :: `\` [lookahead == `c`]</emu-grammar>
        <emu-alg>
          1. Return the CharSet containing the single character `\\` U+005C (REVERSE SOLIDUS).
        </emu-alg>

        <emu-note>This production can only be reached from the sequence `\c` within a character class where it is not followed by an acceptable control character.</emu-note>

        <emu-annex id="sec-runtime-semantics-characterrangeorunion-abstract-operation" type="abstract operation">
          <h1>
            CharacterRangeOrUnion (
              _rer_: a RegExp Record,
              _A_: a CharSet,
              _B_: a CharSet,
            ): a CharSet
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. If HasEitherUnicodeFlag(_rer_) is *false*, then
              1. If _A_ does not contain exactly one character or _B_ does not contain exactly one character, then
                1. Let _C_ be the CharSet containing the single character `-` U+002D (HYPHEN-MINUS).
                1. Return the union of CharSets _A_, _B_ and _C_.
            1. Return CharacterRange(_A_, _B_).
          </emu-alg>
        </emu-annex>
      </emu-annex>

      <emu-annex id="sec-parsepattern-annexb">
        <h1>Static Semantics: ParsePattern ( _patternText_, _u_, _v_ )</h1>
        <p>The semantics of <emu-xref href="#sec-parsepattern"></emu-xref> is extended as follows:</p>
        <p>The abstract operation ParsePattern takes arguments _patternText_ (a sequence of Unicode code points), _u_ (a Boolean), and _v_ (a Boolean). It performs the following steps when called:</p>
        <emu-alg>
          1. If _v_ is *true* and _u_ is *true*, then
            1. Let _parseResult_ be a List containing one or more *SyntaxError* objects.
          1. Else if _v_ is *true*, then
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[+UnicodeMode, +UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Else if _u_ is *true*, then
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[+UnicodeMode, ~UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Else,
            1. Let _parseResult_ be ParseText(_patternText_, |Pattern[~UnicodeMode, ~UnicodeSetsMode, ~NamedCaptureGroups]|).
            1. If _parseResult_ is a Parse Node and _parseResult_ contains a |GroupName|, then
              1. Set _parseResult_ to ParseText(_patternText_, |Pattern[~UnicodeMode, ~UnicodeSetsMode, +NamedCaptureGroups]|).
          1. Return _parseResult_.
        </emu-alg>
      </emu-annex>
    </emu-annex>
  </emu-annex>

  <emu-annex id="sec-additional-built-in-properties">
    <h1>Additional Built-in Properties</h1>
    <p>When the ECMAScript host is a web browser the following additional properties of the standard built-in objects are defined.</p>

    <emu-annex id="sec-additional-properties-of-the-global-object">
      <h1>Additional Properties of the Global Object</h1>
      <p>The entries in <emu-xref href="#table-additional-well-known-intrinsic-objects"></emu-xref> are added to <emu-xref href="#table-well-known-intrinsic-objects"></emu-xref>.</p>
      <emu-table id="table-additional-well-known-intrinsic-objects" caption="Additional Well-known Intrinsic Objects" oldids="table-60">
        <table>
          <thead>
            <tr>
              <th>
                Intrinsic Name
              </th>
              <th>
                Global Name
              </th>
              <th>
                ECMAScript Language Association
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              %escape%
            </td>
            <td>
              `escape`
            </td>
            <td>
              The `escape` function (<emu-xref href="#sec-escape-string"></emu-xref>)
            </td>
          </tr>
          <tr>
            <td>
              %unescape%
            </td>
            <td>
              `unescape`
            </td>
            <td>
              The `unescape` function (<emu-xref href="#sec-unescape-string"></emu-xref>)
            </td>
          </tr>
        </table>
      </emu-table>

      <emu-annex id="sec-escape-string">
        <h1>escape ( _string_ )</h1>
        <p>This function is a property of the global object. It computes a new version of a String value in which certain code units have been replaced by a hexadecimal escape sequence.</p>
        <p>When replacing a code unit of numeric value less than or equal to 0x00FF, a two-digit escape sequence of the form <code>%<var>xx</var></code> is used. When replacing a code unit of numeric value strictly greater than 0x00FF, a four-digit escape sequence of the form <code>%u<var>xxxx</var></code> is used.</p>
        <p>It is the <dfn>%escape%</dfn> intrinsic object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Set _string_ to ? ToString(_string_).
          1. Let _len_ be the length of _string_.
          1. Let _R_ be the empty String.
          1. Let _unescapedSet_ be the string-concatenation of the ASCII word characters and *"@\*+-./"*.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _C_ be the code unit at index _k_ within _string_.
            1. If _unescapedSet_ contains _C_, then
              1. Let _S_ be _C_.
            1. Else,
              1. Let _n_ be the numeric value of _C_.
              1. If _n_ &lt; 256, then
                1. Let _hex_ be the String representation of _n_, formatted as an uppercase hexadecimal number.
                1. Let _S_ be the string-concatenation of *"%"* and StringPad(_hex_, 2, *"0"*, ~start~).
              1. Else,
                1. Let _hex_ be the String representation of _n_, formatted as an uppercase hexadecimal number.
                1. Let _S_ be the string-concatenation of *"%u"* and StringPad(_hex_, 4, *"0"*, ~start~).
            1. Set _R_ to the string-concatenation of _R_ and _S_.
            1. Set _k_ to _k_ + 1.
          1. Return _R_.
        </emu-alg>
        <emu-note>
          <p>The encoding is partly based on the encoding described in RFC 1738, but the entire encoding specified in this standard is described above without regard to the contents of RFC 1738. This encoding does not reflect changes to RFC 1738 made by RFC 3986.</p>
        </emu-note>
      </emu-annex>

      <emu-annex id="sec-unescape-string">
        <h1>unescape ( _string_ )</h1>
        <p>This function is a property of the global object. It computes a new version of a String value in which each escape sequence of the sort that might be introduced by the `escape` function is replaced with the code unit that it represents.</p>
        <p>It is the <dfn>%unescape%</dfn> intrinsic object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Set _string_ to ? ToString(_string_).
          1. Let _len_ be the length of _string_.
          1. Let _R_ be the empty String.
          1. Let _k_ be 0.
          1. Repeat, while _k_ &lt; _len_,
            1. Let _C_ be the code unit at index _k_ within _string_.
            1. If _C_ is the code unit 0x0025 (PERCENT SIGN), then
              1. Let _hexDigits_ be the empty String.
              1. Let _optionalAdvance_ be 0.
              1. If _k_ + 5 &lt; _len_ and the code unit at index _k_ + 1 within _string_ is the code unit 0x0075 (LATIN SMALL LETTER U), then
                1. Set _hexDigits_ to the substring of _string_ from _k_ + 2 to _k_ + 6.
                1. Set _optionalAdvance_ to 5.
              1. Else if _k_ + 3 ≤ _len_, then
                1. Set _hexDigits_ to the substring of _string_ from _k_ + 1 to _k_ + 3.
                1. Set _optionalAdvance_ to 2.
              1. Let _parseResult_ be ParseText(_hexDigits_, |HexDigits[~Sep]|).
              1. If _parseResult_ is a Parse Node, then
                1. Let _n_ be the MV of _parseResult_.
                1. Set _C_ to the code unit whose numeric value is _n_.
                1. Set _k_ to _k_ + _optionalAdvance_.
            1. Set _R_ to the string-concatenation of _R_ and _C_.
            1. Set _k_ to _k_ + 1.
          1. Return _R_.
        </emu-alg>
      </emu-annex>
    </emu-annex>

    <emu-annex id="sec-additional-properties-of-the-string.prototype-object">
      <h1>Additional Properties of the String.prototype Object</h1>

      <emu-annex id="sec-string.prototype.substr">
        <h1>String.prototype.substr ( _start_, _length_ )</h1>
        <p>This method returns a <emu-not-ref>substring</emu-not-ref> of the result of converting the *this* value to a String, starting from index _start_ and running for _length_ code units (or through the end of the String if _length_ is *undefined*). If _start_ is negative, it is treated as <emu-eqn>_sourceLength_ + _start_</emu-eqn> where _sourceLength_ is the length of the String. The result is a String value, not a String object.</p>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be ? RequireObjectCoercible(*this* value).
          1. Let _S_ be ? ToString(_O_).
          1. Let _size_ be the length of _S_.
          1. Let _intStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _intStart_ = -∞, set _intStart_ to 0.
          1. Else if _intStart_ &lt; 0, set _intStart_ to max(_size_ + _intStart_, 0).
          1. Else, set _intStart_ to min(_intStart_, _size_).
          1. If _length_ is *undefined*, let _intLength_ be _size_; otherwise let _intLength_ be ? ToIntegerOrInfinity(_length_).
          1. Set _intLength_ to the result of clamping _intLength_ between 0 and _size_.
          1. Let _intEnd_ be min(_intStart_ + _intLength_, _size_).
          1. Return the substring of _S_ from _intStart_ to _intEnd_.
        </emu-alg>
        <emu-note>
          <p>This method is intentionally generic; it does not require that its *this* value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.</p>
        </emu-note>
      </emu-annex>

      <emu-annex id="sec-string.prototype.anchor">
        <h1>String.prototype.anchor ( _name_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"a"*, *"name"*, _name_).
        </emu-alg>

        <emu-annex id="sec-createhtml" type="abstract operation">
          <h1>
            CreateHTML (
              _string_: an ECMAScript language value,
              _tag_: a String,
              _attribute_: a String,
              _value_: an ECMAScript language value,
            ): either a normal completion containing a String or a throw completion
          </h1>
          <dl class="header">
          </dl>
          <emu-alg>
            1. Let _str_ be ? RequireObjectCoercible(_string_).
            1. Let _S_ be ? ToString(_str_).
            1. Let _p1_ be the string-concatenation of *"&lt;"* and _tag_.
            1. If _attribute_ is not the empty String, then
              1. Let _V_ be ? ToString(_value_).
              1. Let _escapedV_ be the String value that is the same as _V_ except that each occurrence of the code unit 0x0022 (QUOTATION MARK) in _V_ has been replaced with the six code unit sequence *"&amp;quot;"*.
              1. Set _p1_ to the string-concatenation of:
                * _p1_
                * the code unit 0x0020 (SPACE)
                * _attribute_
                * the code unit 0x003D (EQUALS SIGN)
                * the code unit 0x0022 (QUOTATION MARK)
                * _escapedV_
                * the code unit 0x0022 (QUOTATION MARK)
            1. Let _p2_ be the string-concatenation of _p1_ and *">"*.
            1. Let _p3_ be the string-concatenation of _p2_ and _S_.
            1. Let _p4_ be the string-concatenation of _p3_, *"&lt;/"*, _tag_, and *">"*.
            1. Return _p4_.
          </emu-alg>
        </emu-annex>
      </emu-annex>

      <emu-annex id="sec-string.prototype.big">
        <h1>String.prototype.big ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"big"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.blink">
        <h1>String.prototype.blink ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"blink"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.bold">
        <h1>String.prototype.bold ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"b"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.fixed">
        <h1>String.prototype.fixed ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"tt"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.fontcolor">
        <h1>String.prototype.fontcolor ( _colour_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"font"*, *"color"*, _colour_).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.fontsize">
        <h1>String.prototype.fontsize ( _size_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"font"*, *"size"*, _size_).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.italics">
        <h1>String.prototype.italics ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"i"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.link">
        <h1>String.prototype.link ( _url_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"a"*, *"href"*, _url_).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.small">
        <h1>String.prototype.small ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"small"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.strike">
        <h1>String.prototype.strike ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"strike"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.sub">
        <h1>String.prototype.sub ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"sub"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-string.prototype.sup">
        <h1>String.prototype.sup ( )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _S_ be the *this* value.
          1. Return ? CreateHTML(_S_, *"sup"*, *""*, *""*).
        </emu-alg>
      </emu-annex>

      <emu-annex id="String.prototype.trimleft">
        <h1>String.prototype.trimLeft ( )</h1>
        <emu-note>
          <p>The property *"trimStart"* is preferred. The *"trimLeft"* property is provided principally for compatibility with old code. It is recommended that the *"trimStart"* property be used in new ECMAScript code.</p>
        </emu-note>
        <p>The initial value of the *"trimLeft"* property is %String.prototype.trimStart%, defined in <emu-xref href="#sec-string.prototype.trimstart"></emu-xref>.</p>
      </emu-annex>

      <emu-annex id="String.prototype.trimright">
        <h1>String.prototype.trimRight ( )</h1>
        <emu-note>
          <p>The property *"trimEnd"* is preferred. The *"trimRight"* property is provided principally for compatibility with old code. It is recommended that the *"trimEnd"* property be used in new ECMAScript code.</p>
        </emu-note>
        <p>The initial value of the *"trimRight"* property is %String.prototype.trimEnd%, defined in <emu-xref href="#sec-string.prototype.trimend"></emu-xref>.</p>
      </emu-annex>
    </emu-annex>

    <emu-annex id="sec-additional-properties-of-the-date.prototype-object">
      <h1>Additional Properties of the Date.prototype Object</h1>

      <emu-annex id="sec-date.prototype.getyear">
        <h1>Date.prototype.getYear ( )</h1>
        <emu-note>
          <p>The `getFullYear` method is preferred for nearly all purposes, because it avoids the “year 2000 problem.”</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. If _t_ is *NaN*, return *NaN*.
          1. Return YearFromTime(LocalTime(_t_)) - *1900*<sub>𝔽</sub>.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-date.prototype.setyear">
        <h1>Date.prototype.setYear ( _year_ )</h1>
        <emu-note>
          <p>The `setFullYear` method is preferred for nearly all purposes, because it avoids the “year 2000 problem.”</p>
        </emu-note>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _dateObject_ be the *this* value.
          1. Perform ? RequireInternalSlot(_dateObject_, [[DateValue]]).
          1. Let _t_ be _dateObject_.[[DateValue]].
          1. Let _y_ be ? ToNumber(_year_).
          1. If _t_ is *NaN*, set _t_ to *+0*<sub>𝔽</sub>; otherwise, set _t_ to LocalTime(_t_).
          1. Let _yyyy_ be MakeFullYear(_y_).
          1. Let _d_ be MakeDay(_yyyy_, MonthFromTime(_t_), DateFromTime(_t_)).
          1. Let _date_ be MakeDate(_d_, TimeWithinDay(_t_)).
          1. Let _u_ be TimeClip(UTC(_date_)).
          1. Set _dateObject_.[[DateValue]] to _u_.
          1. Return _u_.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-date.prototype.togmtstring">
        <h1>Date.prototype.toGMTString ( )</h1>
        <emu-note>
          <p>The `toUTCString` method is preferred. This method is provided principally for compatibility with old code.</p>
        </emu-note>
        <p>The initial value of the *"toGMTString"* property is %Date.prototype.toUTCString%, defined in <emu-xref href="#sec-date.prototype.toutcstring"></emu-xref>.</p>
      </emu-annex>
    </emu-annex>

    <emu-annex id="sec-additional-properties-of-the-regexp.prototype-object">
      <h1>Additional Properties of the RegExp.prototype Object</h1>

      <emu-annex id="sec-regexp.prototype.compile">
        <h1>RegExp.prototype.compile ( _pattern_, _flags_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[RegExpMatcher]]).
          1. If _pattern_ is an Object and _pattern_ has a [[RegExpMatcher]] internal slot, then
            1. If _flags_ is not *undefined*, throw a *TypeError* exception.
            1. Let _P_ be _pattern_.[[OriginalSource]].
            1. Let _F_ be _pattern_.[[OriginalFlags]].
          1. Else,
            1. Let _P_ be _pattern_.
            1. Let _F_ be _flags_.
          1. Return ? RegExpInitialize(_O_, _P_, _F_).
        </emu-alg>
        <emu-note>
          <p>This method completely reinitializes the *this* value RegExp with a new pattern and flags. An implementation may interpret use of this method as an assertion that the resulting RegExp object will be used multiple times and hence is a candidate for extra optimization.</p>
        </emu-note>
      </emu-annex>
    </emu-annex>
  </emu-annex>

  <emu-annex id="sec-other-additional-features">
    <h1>Other Additional Features</h1>

    <emu-annex id="sec-labelled-function-declarations">
      <h1>Labelled Function Declarations</h1>
      <p>Prior to ECMAScript 2015, the specification of |LabelledStatement| did not allow for the association of a statement label with a |FunctionDeclaration|. However, a labelled |FunctionDeclaration| was an allowable extension for non-strict code and most browser-hosted ECMAScript implementations supported that extension. In ECMAScript 2015 and later, the grammar production for |LabelledStatement| permits use of |FunctionDeclaration| as a |LabelledItem| but <emu-xref href="#sec-labelled-statements-static-semantics-early-errors"></emu-xref> includes an Early Error rule that produces a Syntax Error if that occurs. That rule is modified with the addition of the <ins>highlighted</ins> text:</p>
      <emu-grammar>LabelledItem : FunctionDeclaration</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if any source text <ins>that is strict mode code</ins> is matched by this production.
        </li>
      </ul>
      <emu-note>
        <p>The early error rules for |WithStatement|, |IfStatement|, and |IterationStatement| prevent these statements from containing a labelled |FunctionDeclaration| in non-strict code.</p>
      </emu-note>
    </emu-annex>

    <emu-annex id="sec-block-level-function-declarations-web-legacy-compatibility-semantics">
      <h1>Block-Level Function Declarations Web Legacy Compatibility Semantics</h1>
      <p>Prior to ECMAScript 2015, the ECMAScript specification did not define the occurrence of a |FunctionDeclaration| as an element of a |Block| statement's |StatementList|. However, support for that form of |FunctionDeclaration| was an allowable extension and most browser-hosted ECMAScript implementations permitted them. Unfortunately, the semantics of such declarations differ among those implementations. Because of these semantic differences, existing web ECMAScript source text that uses |Block| level function declarations is only portable among browser implementations if the usage only depends upon the semantic intersection of all of the browser implementations for such declarations. The following are the use cases that fall within that intersection semantics:</p>
      <ol>
        <li>
          <p>A function is declared and only referenced within a single block.</p>
          <ul>
            <li>
              One or more |FunctionDeclaration|s whose |BindingIdentifier| is the name _f_ occur within the function code of an enclosing function _g_ and that declaration is nested within a |Block|.
            </li>
            <li>
              No other declaration of _f_ that is not a `var` declaration occurs within the function code of _g_.
            </li>
            <li>
              All occurrences of _f_ as an |IdentifierReference| are within the |StatementList| of the |Block| containing the declaration of _f_.
            </li>
          </ul>
        </li>
        <li>
          <p>A function is declared and possibly used within a single |Block| but also referenced by an inner function definition that is not contained within that same |Block|.</p>
          <ul>
            <li>
              One or more |FunctionDeclaration|s whose |BindingIdentifier| is the name _f_ occur within the function code of an enclosing function _g_ and that declaration is nested within a |Block|.
            </li>
            <li>
              No other declaration of _f_ that is not a `var` declaration occurs within the function code of _g_.
            </li>
            <li>
              There may be occurrences of _f_ as an |IdentifierReference| within the |StatementList| of the |Block| containing the declaration of _f_.
            </li>
            <li>
              There is at least one occurrence of _f_ as an |IdentifierReference| within another function _h_ that is nested within _g_ and no other declaration of _f_ shadows the references to _f_ from within _h_.
            </li>
            <li>
              All invocations of _h_ occur after the declaration of _f_ has been evaluated.
            </li>
          </ul>
        </li>
        <li>
          <p>A function is declared and possibly used within a single block but also referenced within subsequent blocks.</p>
          <ul>
            <li>
              One or more |FunctionDeclaration| whose |BindingIdentifier| is the name _f_ occur within the function code of an enclosing function _g_ and that declaration is nested within a |Block|.
            </li>
            <li>
              No other declaration of _f_ that is not a `var` declaration occurs within the function code of _g_.
            </li>
            <li>
              There may be occurrences of _f_ as an |IdentifierReference| within the |StatementList| of the |Block| containing the declaration of _f_.
            </li>
            <li>
              There is at least one occurrence of _f_ as an |IdentifierReference| within the function code of _g_ that lexically follows the |Block| containing the declaration of _f_.
            </li>
          </ul>
        </li>
      </ol>
      <p>The first use case is interoperable with the semantics of |Block| level function declarations provided by ECMAScript 2015. Any pre-existing ECMAScript source text that employs that use case will operate using the Block level function declarations semantics defined by clauses <emu-xref href="#sec-ordinary-and-exotic-objects-behaviours"></emu-xref>, <emu-xref href="#sec-ecmascript-language-statements-and-declarations"></emu-xref>, and <emu-xref href="#sec-ecmascript-language-functions-and-classes"></emu-xref>.</p>
      <p>ECMAScript 2015 interoperability for the second and third use cases requires the following extensions to the clause <emu-xref href="#sec-ordinary-and-exotic-objects-behaviours"></emu-xref>, clause <emu-xref href="#sec-ecmascript-language-functions-and-classes"></emu-xref>, clause <emu-xref href="#sec-eval-x"></emu-xref> and clause <emu-xref href="#sec-globaldeclarationinstantiation"></emu-xref> semantics.</p>
      <p>If an ECMAScript implementation has a mechanism for reporting diagnostic warning messages, a warning should be produced when code contains a |FunctionDeclaration| for which these compatibility semantics are applied and introduce observable differences from non-compatibility semantics. For example, if a var binding is not introduced because its introduction would create an early error, a warning message should not be produced.</p>

      <emu-annex id="sec-web-compat-functiondeclarationinstantiation">
        <h1>Changes to FunctionDeclarationInstantiation</h1>
        <p>During FunctionDeclarationInstantiation the following steps are performed in place of step <emu-xref href="#step-functiondeclarationinstantiation-web-compat-insertion-point"></emu-xref>:</p>
        <emu-alg replaces-step="step-functiondeclarationinstantiation-web-compat-insertion-point">
          1. If _strict_ is *false*, then
            1. For each |FunctionDeclaration| _f_ that is directly contained in the |StatementList| of any |Block|, |CaseClause|, or |DefaultClause| _x_ such that _code_ Contains _x_ is *true*, do
              1. Let _F_ be the StringValue of the |BindingIdentifier| of _f_.
              1. If replacing the |FunctionDeclaration| _f_ with a |VariableStatement| that has _F_ as a |BindingIdentifier| would not produce any Early Errors for _func_ and _parameterNames_ does not contain _F_, then
                1. NOTE: A var binding for _F_ is only instantiated here if it is neither a VarDeclaredName, the name of a formal parameter, or another |FunctionDeclaration|.
                1. If _instantiatedVarNames_ does not contain _F_ and _F_ is not *"arguments"*, then
                  1. Perform ! _varEnv_.CreateMutableBinding(_F_, *false*).
                  1. Perform ! _varEnv_.InitializeBinding(_F_, *undefined*).
                  1. Append _F_ to _instantiatedVarNames_.
                1. When the |FunctionDeclaration| _f_ is evaluated, perform the following steps in place of the |FunctionDeclaration| Evaluation algorithm provided in <emu-xref href="#sec-function-definitions-runtime-semantics-evaluation"></emu-xref>:
                  1. Let _fEnv_ be the running execution context's VariableEnvironment.
                  1. Let _bEnv_ be the running execution context's LexicalEnvironment.
                  1. Let _fObj_ be ! _bEnv_.GetBindingValue(_F_, *false*).
                  1. Perform ! _fEnv_.SetMutableBinding(_F_, _fObj_, *false*).
                  1. Return ~unused~.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-web-compat-globaldeclarationinstantiation">
        <h1>Changes to GlobalDeclarationInstantiation</h1>
        <p>During GlobalDeclarationInstantiation the following steps are performed in place of step <emu-xref href="#step-globaldeclarationinstantiation-web-compat-insertion-point"></emu-xref>:</p>
        <emu-alg replaces-step="step-globaldeclarationinstantiation-web-compat-insertion-point">
          1. Perform the following steps:
            1. Let _strict_ be ScriptIsStrict of _script_.
            1. If _strict_ is *false*, then
              1. Let _declaredFunctionOrVarNames_ be the list-concatenation of _declaredFunctionNames_ and _declaredVarNames_.
              1. For each |FunctionDeclaration| _f_ that is directly contained in the |StatementList| of any |Block|, |CaseClause|, or |DefaultClause| _x_ such that _script_ Contains _x_ is *true*, do
                1. Let _F_ be the StringValue of the |BindingIdentifier| of _f_.
                1. If replacing the |FunctionDeclaration| _f_ with a |VariableStatement| that has _F_ as a |BindingIdentifier| would not produce any Early Errors for _script_, then
                  1. If _env_.HasLexicalDeclaration(_F_) is *false*, then
                    1. Let _fnDefinable_ be ? _env_.CanDeclareGlobalVar(_F_).
                    1. If _fnDefinable_ is *true*, then
                      1. NOTE: A var binding for _F_ is only instantiated here if it is neither a VarDeclaredName nor the name of another |FunctionDeclaration|.
                      1. If _declaredFunctionOrVarNames_ does not contain _F_, then
                        1. Perform ? _env_.CreateGlobalVarBinding(_F_, *false*).
                        1. Append _F_ to _declaredFunctionOrVarNames_.
                      1. When the |FunctionDeclaration| _f_ is evaluated, perform the following steps in place of the |FunctionDeclaration| Evaluation algorithm provided in <emu-xref href="#sec-function-definitions-runtime-semantics-evaluation"></emu-xref>:
                        1. Let _gEnv_ be the running execution context's VariableEnvironment.
                        1. Let _bEnv_ be the running execution context's LexicalEnvironment.
                        1. Let _fObj_ be ! _bEnv_.GetBindingValue(_F_, *false*).
                        1. Perform ? <emu-meta effects="user-code">_gEnv_.SetMutableBinding</emu-meta>(_F_, _fObj_, *false*).
                        1. Return ~unused~.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-web-compat-evaldeclarationinstantiation">
        <h1>Changes to EvalDeclarationInstantiation</h1>
        <p>During EvalDeclarationInstantiation the following steps are performed in place of step <emu-xref href="#step-evaldeclarationinstantiation-web-compat-insertion-point"></emu-xref>:</p>
        <emu-alg replaces-step="step-evaldeclarationinstantiation-web-compat-insertion-point">
          1. If _strict_ is *false*, then
            1. Let _declaredFunctionOrVarNames_ be the list-concatenation of _declaredFunctionNames_ and _declaredVarNames_.
            1. For each |FunctionDeclaration| _f_ that is directly contained in the |StatementList| of any |Block|, |CaseClause|, or |DefaultClause| _x_ such that _body_ Contains _x_ is *true*, do
              1. Let _F_ be the StringValue of the |BindingIdentifier| of _f_.
              1. If replacing the |FunctionDeclaration| _f_ with a |VariableStatement| that has _F_ as a |BindingIdentifier| would not produce any Early Errors for _body_, then
                1. Let _bindingExists_ be *false*.
                1. Let _thisEnv_ be _lexEnv_.
                1. Assert: The following loop will terminate.
                1. Repeat, while _thisEnv_ is not _varEnv_,
                  1. If _thisEnv_ is not an Object Environment Record, then
                    1. If ! _thisEnv_.HasBinding(_F_) is *true*, then
                      1. [id="step-evaldeclarationinstantiation-web-compat-bindingexists"] Let _bindingExists_ be *true*.
                  1. Set _thisEnv_ to _thisEnv_.[[OuterEnv]].
                1. If _bindingExists_ is *false* and _varEnv_ is a Global Environment Record, then
                  1. If _varEnv_.HasLexicalDeclaration(_F_) is *false*, then
                    1. Let _fnDefinable_ be ? _varEnv_.CanDeclareGlobalVar(_F_).
                  1. Else,
                    1. Let _fnDefinable_ be *false*.
                1. Else,
                  1. Let _fnDefinable_ be *true*.
                1. If _bindingExists_ is *false* and _fnDefinable_ is *true*, then
                  1. If _declaredFunctionOrVarNames_ does not contain _F_, then
                    1. If _varEnv_ is a Global Environment Record, then
                      1. Perform ? _varEnv_.CreateGlobalVarBinding(_F_, *true*).
                    1. Else,
                      1. Let _bindingExists_ be ! _varEnv_.HasBinding(_F_).
                      1. If _bindingExists_ is *false*, then
                        1. Perform ! _varEnv_.CreateMutableBinding(_F_, *true*).
                        1. Perform ! _varEnv_.InitializeBinding(_F_, *undefined*).
                    1. Append _F_ to _declaredFunctionOrVarNames_.
                  1. When the |FunctionDeclaration| _f_ is evaluated, perform the following steps in place of the |FunctionDeclaration| Evaluation algorithm provided in <emu-xref href="#sec-function-definitions-runtime-semantics-evaluation"></emu-xref>:
                    1. Let _gEnv_ be the running execution context's VariableEnvironment.
                    1. Let _bEnv_ be the running execution context's LexicalEnvironment.
                    1. Let _fObj_ be ! _bEnv_.GetBindingValue(_F_, *false*).
                    1. Perform ? <emu-meta effects="user-code">_gEnv_.SetMutableBinding</emu-meta>(_F_, _fObj_, *false*).
                    1. Return ~unused~.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-block-duplicates-allowed-static-semantics">
        <h1>Changes to Block Static Semantics: Early Errors</h1>
        <p>The rules for the following production in <emu-xref href="#sec-block-static-semantics-early-errors"></emu-xref> are modified with the addition of the <ins>highlighted</ins> text:</p>
        <emu-grammar>Block : `{` StatementList `}`</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the LexicallyDeclaredNames of |StatementList| contains any duplicate entries<ins>, unless IsStrict(this production) is *false* and the duplicate entries are only bound by FunctionDeclarations</ins>.
          </li>
          <li>
            It is a Syntax Error if any element of the LexicallyDeclaredNames of |StatementList| also occurs in the VarDeclaredNames of |StatementList|.
          </li>
        </ul>
      </emu-annex>

      <emu-annex id="sec-switch-duplicates-allowed-static-semantics">
        <h1>Changes to `switch` Statement Static Semantics: Early Errors</h1>
        <p>The rules for the following production in <emu-xref href="#sec-switch-statement-static-semantics-early-errors"></emu-xref> are modified with the addition of the <ins>highlighted</ins> text:</p>
        <emu-grammar>SwitchStatement : `switch` `(` Expression `)` CaseBlock</emu-grammar>
        <ul>
          <li>
            It is a Syntax Error if the LexicallyDeclaredNames of |CaseBlock| contains any duplicate entries<ins>, unless IsStrict(this production) is *false* and the duplicate entries are only bound by FunctionDeclarations</ins>.
          </li>
          <li>
            It is a Syntax Error if any element of the LexicallyDeclaredNames of |CaseBlock| also occurs in the VarDeclaredNames of |CaseBlock|.
          </li>
        </ul>
      </emu-annex>

      <emu-annex id="sec-web-compat-blockdeclarationinstantiation">
        <h1>Changes to BlockDeclarationInstantiation</h1>
        <p>During BlockDeclarationInstantiation the following steps are performed in place of step <emu-xref href="#step-blockdeclarationinstantiation-createmutablebinding"></emu-xref>:</p>
        <emu-alg replaces-step="step-blockdeclarationinstantiation-createmutablebinding">
          1. If ! _env_.HasBinding(_dn_) is *false*, then
            1. Perform ! _env_.CreateMutableBinding(_dn_, *false*).
        </emu-alg>
        <p>During BlockDeclarationInstantiation the following steps are performed in place of step <emu-xref href="#step-blockdeclarationinstantiation-initializebinding"></emu-xref>:</p>
        <emu-alg replaces-step="step-blockdeclarationinstantiation-initializebinding">
          1. Perform the following steps:
            1. If the binding for _fn_ in _env_ is an uninitialized binding, then
              1. Perform ! _env_.InitializeBinding(_fn_, _fo_).
            1. Else,
              1. Assert: _d_ is a |FunctionDeclaration|.
              1. Perform ! _env_.SetMutableBinding(_fn_, _fo_, *false*).
        </emu-alg>
      </emu-annex>
    </emu-annex>

    <emu-annex id="sec-functiondeclarations-in-ifstatement-statement-clauses">
      <h1>FunctionDeclarations in IfStatement Statement Clauses</h1>
      <p>The following augments the |IfStatement| production in <emu-xref href="#sec-if-statement"></emu-xref>:</p>
      <emu-grammar type="definition">
        IfStatement[Yield, Await, Return] :
          `if` `(` Expression[+In, ?Yield, ?Await] `)` FunctionDeclaration[?Yield, ?Await, ~Default] `else` Statement[?Yield, ?Await, ?Return]
          `if` `(` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return] `else` FunctionDeclaration[?Yield, ?Await, ~Default]
          `if` `(` Expression[+In, ?Yield, ?Await] `)` FunctionDeclaration[?Yield, ?Await, ~Default] `else` FunctionDeclaration[?Yield, ?Await, ~Default]
          `if` `(` Expression[+In, ?Yield, ?Await] `)` FunctionDeclaration[?Yield, ?Await, ~Default] [lookahead != `else`]
      </emu-grammar>
      <p>This production only applies when parsing non-strict code. Source text matched by this production is processed as if each matching occurrence of |FunctionDeclaration[?Yield, ?Await, ~Default]| was the sole |StatementListItem| of a |BlockStatement| occupying that position in the source text. The semantics of such a synthetic |BlockStatement| includes the web legacy compatibility semantics specified in <emu-xref href="#sec-block-level-function-declarations-web-legacy-compatibility-semantics"></emu-xref>.</p>
    </emu-annex>

    <emu-annex id="sec-variablestatements-in-catch-blocks">
      <h1>VariableStatements in Catch Blocks</h1>
      <p>The content of subclause <emu-xref href="#sec-try-statement-static-semantics-early-errors"></emu-xref> is replaced with the following:</p>
      <emu-grammar>Catch : `catch` `(` CatchParameter `)` Block</emu-grammar>
      <ul>
        <li>
          It is a Syntax Error if the BoundNames of |CatchParameter| contains any duplicate elements.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |CatchParameter| also occurs in the LexicallyDeclaredNames of |Block|.
        </li>
        <li>
          It is a Syntax Error if any element of the BoundNames of |CatchParameter| also occurs in the VarDeclaredNames of |Block| unless |CatchParameter| is <emu-grammar>CatchParameter : BindingIdentifier</emu-grammar>.
        </li>
      </ul>
      <emu-note>
        <p>The |Block| of a |Catch| clause may contain `var` declarations that bind a name that is also bound by the |CatchParameter|. At runtime, such bindings are instantiated in the VariableDeclarationEnvironment. They do not shadow the same-named bindings introduced by the |CatchParameter| and hence the |Initializer| for such `var` declarations will assign to the corresponding catch parameter rather than the `var` binding.</p>
      </emu-note>
      <p>This modified behaviour also applies to `var` and `function` declarations introduced by direct eval calls contained within the |Block| of a |Catch| clause. This change is accomplished by modifying the algorithm of <emu-xref href="#sec-evaldeclarationinstantiation"></emu-xref> as follows:</p>
      <p>Step <emu-xref href="#step-evaldeclarationinstantiation-throw-duplicate-binding"></emu-xref> is replaced by:</p>
      <emu-alg replaces-step="step-evaldeclarationinstantiation-throw-duplicate-binding">
        1. If _thisEnv_ is not the Environment Record for a |Catch| clause, throw a *SyntaxError* exception.
      </emu-alg>
      <p>Step <emu-xref href="#step-evaldeclarationinstantiation-web-compat-bindingexists"></emu-xref> is replaced by:</p>
      <emu-alg replaces-step="step-evaldeclarationinstantiation-web-compat-bindingexists">
        1. If _thisEnv_ is not the Environment Record for a |Catch| clause, let _bindingExists_ be *true*.
      </emu-alg>
    </emu-annex>

    <emu-annex id="sec-initializers-in-forin-statement-heads">
      <h1>Initializers in ForIn Statement Heads</h1>
      <p>The following augments the |ForInOfStatement| production in <emu-xref href="#sec-for-in-and-for-of-statements"></emu-xref>:</p>
      <emu-grammar type="definition">
        ForInOfStatement[Yield, Await, Return] :
          `for` `(` `var` BindingIdentifier[?Yield, ?Await] Initializer[~In, ?Yield, ?Await] `in` Expression[+In, ?Yield, ?Await] `)` Statement[?Yield, ?Await, ?Return]
      </emu-grammar>
      <p>This production only applies when parsing non-strict code.</p>
      <p>The static semantics of ContainsDuplicateLabels in <emu-xref href="#sec-static-semantics-containsduplicatelabels"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsDuplicateLabels of |Statement| with argument _labelSet_.
      </emu-alg>
      <p>The static semantics of ContainsUndefinedBreakTarget in <emu-xref href="#sec-static-semantics-containsundefinedbreaktarget"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedBreakTarget of |Statement| with argument _labelSet_.
      </emu-alg>
      <p>The static semantics of ContainsUndefinedContinueTarget in <emu-xref href="#sec-static-semantics-containsundefinedcontinuetarget"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Return ContainsUndefinedContinueTarget of |Statement| with arguments _iterationSet_ and « ».
      </emu-alg>
      <p>The static semantics of IsDestructuring in <emu-xref href="#sec-static-semantics-isdestructuring"></emu-xref> are augmented with the following:</p>
      <emu-grammar>
        BindingIdentifier :
          Identifier
          `yield`
          `await`
      </emu-grammar>
      <emu-alg>
        1. Return *false*.
      </emu-alg>
      <p>The static semantics of VarDeclaredNames in <emu-xref href="#sec-static-semantics-vardeclarednames"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _names1_ be the BoundNames of |BindingIdentifier|.
        1. Let _names2_ be the VarDeclaredNames of |Statement|.
        1. Return the list-concatenation of _names1_ and _names2_.
      </emu-alg>
      <p>The static semantics of VarScopedDeclarations in <emu-xref href="#sec-static-semantics-varscopeddeclarations"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _declarations1_ be « |BindingIdentifier| ».
        1. Let _declarations2_ be the VarScopedDeclarations of |Statement|.
        1. Return the list-concatenation of _declarations1_ and _declarations2_.
      </emu-alg>
      <p>The runtime semantics of ForInOfLoopEvaluation in <emu-xref href="#sec-runtime-semantics-forinofloopevaluation"></emu-xref> are augmented with the following:</p>
      <emu-grammar>ForInOfStatement : `for` `(` `var` BindingIdentifier Initializer `in` Expression `)` Statement</emu-grammar>
      <emu-alg>
        1. Let _bindingId_ be the StringValue of |BindingIdentifier|.
        1. Let _lhs_ be ? ResolveBinding(_bindingId_).
        1. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
          1. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
        1. Else,
          1. Let _rhs_ be ? Evaluation of |Initializer|.
          1. Let _value_ be ? GetValue(_rhs_).
        1. Perform ? PutValue(_lhs_, _value_).
        1. Let _keyResult_ be ? ForIn/OfHeadEvaluation(« », |Expression|, ~enumerate~).
        1. Return ? ForIn/OfBodyEvaluation(|BindingIdentifier|, |Statement|, _keyResult_, ~enumerate~, ~var-binding~, _labelSet_).
      </emu-alg>
    </emu-annex>

    <emu-annex id="sec-IsHTMLDDA-internal-slot">
      <h1>The [[IsHTMLDDA]] Internal Slot</h1>
      <p>An <dfn>[[IsHTMLDDA]] internal slot</dfn> may exist on host-defined objects. Objects with an [[IsHTMLDDA]] internal slot behave like *undefined* in the <emu-xref href="#sec-toboolean">ToBoolean</emu-xref> and IsLooselyEqual abstract operations and when used as an operand for the <emu-xref href="#sec-typeof-operator">`typeof` operator</emu-xref>.</p>
      <emu-note>
        <p>Objects with an [[IsHTMLDDA]] internal slot are never created by this specification. However, the <a href="https://html.spec.whatwg.org/multipage/obsolete.html#dom-document-all"><code>document.all</code> object</a> in web browsers is a host-defined exotic object with this slot that exists for web compatibility purposes. There are no other known examples of this type of object and implementations should not create any with the exception of `document.all`.</p>
      </emu-note>

      <emu-annex id="sec-IsHTMLDDA-internal-slot-to-boolean">
        <h1>Changes to ToBoolean</h1>
        <p>The following step replaces step <emu-xref href="#step-to-boolean-web-compat-insertion-point"></emu-xref> of ToBoolean:</p>
        <emu-alg replaces-step="step-to-boolean-web-compat-insertion-point">
          1. If _argument_ is an Object and _argument_ has an [[IsHTMLDDA]] internal slot, return *false*.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-IsHTMLDDA-internal-slot-aec">
        <h1>Changes to IsLooselyEqual</h1>
        <p>The following steps replace step <emu-xref href="#step-abstract-equality-comparison-web-compat-insertion-point"></emu-xref> of IsLooselyEqual:</p>
        <emu-alg replaces-step="step-abstract-equality-comparison-web-compat-insertion-point">
          1. Perform the following steps:
            1. If _x_ is an Object, _x_ has an [[IsHTMLDDA]] internal slot, and _y_ is either *undefined* or *null*, return *true*.
            1. If _x_ is either *undefined* or *null*, _y_ is an Object, and _y_ has an [[IsHTMLDDA]] internal slot, return *true*.
        </emu-alg>
      </emu-annex>

      <emu-annex id="sec-IsHTMLDDA-internal-slot-typeof">
        <h1>Changes to the `typeof` Operator</h1>
        <p>The following step replaces step <emu-xref href="#step-typeof-web-compat-insertion-point"></emu-xref> of <emu-xref href="#sec-typeof-operator-runtime-semantics-evaluation">the evaluation semantics for `typeof`</emu-xref>:</p>
        <emu-alg replaces-step="step-typeof-web-compat-insertion-point">
          1. If _val_ has an [[IsHTMLDDA]] internal slot, return *"undefined"*.
        </emu-alg>
      </emu-annex>
    </emu-annex>

    <emu-annex id="sec-web-compat-host-make-job-callback">
      <h1>Non-default behaviour in HostMakeJobCallback</h1>
      <p>The HostMakeJobCallback abstract operation allows hosts which are web browsers to specify non-default behaviour.</p>
    </emu-annex>

    <emu-annex id="sec-web-compat-host-ensure-can-add-private-field">
      <h1>Non-default behaviour in HostEnsureCanAddPrivateElement</h1>
      <p>The HostEnsureCanAddPrivateElement abstract operation allows hosts which are web browsers to specify non-default behaviour.</p>
    </emu-annex>
  </emu-annex>

<h1 id="sec-strict-mode-of-ecmascript"></h1>
