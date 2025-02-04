# Grammar Summary

  <emu-annex id="sec-lexical-grammar">
    <h1>Lexical Grammar</h1>
    <emu-prodref name="SourceCharacter"></emu-prodref>
    <emu-prodref name="InputElementDiv"></emu-prodref>
    <emu-prodref name="InputElementRegExp"></emu-prodref>
    <emu-prodref name="InputElementRegExpOrTemplateTail"></emu-prodref>
    <emu-prodref name="InputElementTemplateTail"></emu-prodref>
    <emu-prodref name="InputElementHashbangOrRegExp"></emu-prodref>
    <emu-prodref name="WhiteSpace"></emu-prodref>
    <emu-prodref name="LineTerminator"></emu-prodref>
    <emu-prodref name="LineTerminatorSequence"></emu-prodref>
    <emu-prodref name="Comment"></emu-prodref>
    <emu-prodref name="MultiLineComment"></emu-prodref>
    <emu-prodref name="MultiLineCommentChars"></emu-prodref>
    <emu-prodref name="PostAsteriskCommentChars"></emu-prodref>
    <emu-prodref name="MultiLineNotAsteriskChar"></emu-prodref>
    <emu-prodref name="MultiLineNotForwardSlashOrAsteriskChar"></emu-prodref>
    <emu-prodref name="SingleLineComment"></emu-prodref>
    <emu-prodref name="SingleLineCommentChars"></emu-prodref>
    <emu-prodref name="SingleLineCommentChar"></emu-prodref>
    <emu-prodref name="HashbangComment"></emu-prodref>
    <emu-prodref name="CommonToken"></emu-prodref>
    <emu-prodref name="PrivateIdentifier"></emu-prodref>
    <emu-prodref name="IdentifierName"></emu-prodref>
    <emu-prodref name="IdentifierStart"></emu-prodref>
    <emu-prodref name="IdentifierPart"></emu-prodref>
    <emu-prodref name="IdentifierStartChar"></emu-prodref>
    <emu-prodref name="IdentifierPartChar"></emu-prodref>
    <emu-prodref name="AsciiLetter"></emu-prodref>
    <emu-prodref name="UnicodeIDStart"></emu-prodref>
    <emu-prodref name="UnicodeIDContinue"></emu-prodref>
    <emu-prodref name="ReservedWord"></emu-prodref>
    <emu-prodref name="Punctuator"></emu-prodref>
    <emu-prodref name="OptionalChainingPunctuator"></emu-prodref>
    <emu-prodref name="OtherPunctuator"></emu-prodref>
    <emu-prodref name="DivPunctuator"></emu-prodref>
    <emu-prodref name="RightBracePunctuator"></emu-prodref>
    <emu-prodref name="NullLiteral"></emu-prodref>
    <emu-prodref name="BooleanLiteral"></emu-prodref>
    <emu-prodref name="NumericLiteralSeparator"></emu-prodref>
    <emu-prodref name="NumericLiteral"></emu-prodref>
    <emu-prodref name="DecimalBigIntegerLiteral"></emu-prodref>
    <emu-prodref name="NonDecimalIntegerLiteral"></emu-prodref>
    <emu-prodref name="BigIntLiteralSuffix"></emu-prodref>
    <emu-prodref name="DecimalLiteral"></emu-prodref>
    <emu-prodref name="DecimalIntegerLiteral"></emu-prodref>
    <emu-prodref name="DecimalDigits"></emu-prodref>
    <emu-prodref name="DecimalDigit"></emu-prodref>
    <emu-prodref name="NonZeroDigit"></emu-prodref>
    <emu-prodref name="ExponentPart"></emu-prodref>
    <emu-prodref name="ExponentIndicator"></emu-prodref>
    <emu-prodref name="SignedInteger"></emu-prodref>
    <emu-prodref name="BinaryIntegerLiteral"></emu-prodref>
    <emu-prodref name="BinaryDigits"></emu-prodref>
    <emu-prodref name="BinaryDigit"></emu-prodref>
    <emu-prodref name="OctalIntegerLiteral"></emu-prodref>
    <emu-prodref name="OctalDigits"></emu-prodref>
    <emu-prodref name="LegacyOctalIntegerLiteral"></emu-prodref>
    <emu-prodref name="NonOctalDecimalIntegerLiteral"></emu-prodref>
    <emu-prodref name="LegacyOctalLikeDecimalIntegerLiteral"></emu-prodref>
    <emu-prodref name="OctalDigit"></emu-prodref>
    <emu-prodref name="NonOctalDigit"></emu-prodref>
    <emu-prodref name="HexIntegerLiteral"></emu-prodref>
    <emu-prodref name="HexDigits"></emu-prodref>
    <emu-prodref name="HexDigit"></emu-prodref>
    <emu-prodref name="StringLiteral"></emu-prodref>
    <emu-prodref name="DoubleStringCharacters"></emu-prodref>
    <emu-prodref name="SingleStringCharacters"></emu-prodref>
    <emu-prodref name="DoubleStringCharacter"></emu-prodref>
    <emu-prodref name="SingleStringCharacter"></emu-prodref>
    <emu-prodref name="LineContinuation"></emu-prodref>
    <emu-prodref name="EscapeSequence"></emu-prodref>
    <emu-prodref name="CharacterEscapeSequence"></emu-prodref>
    <emu-prodref name="SingleEscapeCharacter"></emu-prodref>
    <emu-prodref name="NonEscapeCharacter"></emu-prodref>
    <emu-prodref name="EscapeCharacter"></emu-prodref>
    <emu-prodref name="LegacyOctalEscapeSequence"></emu-prodref>
    <emu-prodref name="NonZeroOctalDigit"></emu-prodref>
    <emu-prodref name="ZeroToThree"></emu-prodref>
    <emu-prodref name="FourToSeven"></emu-prodref>
    <emu-prodref name="NonOctalDecimalEscapeSequence"></emu-prodref>
    <emu-prodref name="HexEscapeSequence"></emu-prodref>
    <emu-prodref name="UnicodeEscapeSequence"></emu-prodref>
    <emu-prodref name="Hex4Digits"></emu-prodref>
    <emu-prodref name="RegularExpressionLiteral"></emu-prodref>
    <emu-prodref name="RegularExpressionBody"></emu-prodref>
    <emu-prodref name="RegularExpressionChars"></emu-prodref>
    <emu-prodref name="RegularExpressionFirstChar"></emu-prodref>
    <emu-prodref name="RegularExpressionChar"></emu-prodref>
    <emu-prodref name="RegularExpressionBackslashSequence"></emu-prodref>
    <emu-prodref name="RegularExpressionNonTerminator"></emu-prodref>
    <emu-prodref name="RegularExpressionClass"></emu-prodref>
    <emu-prodref name="RegularExpressionClassChars"></emu-prodref>
    <emu-prodref name="RegularExpressionClassChar"></emu-prodref>
    <emu-prodref name="RegularExpressionFlags"></emu-prodref>
    <emu-prodref name="Template"></emu-prodref>
    <emu-prodref name="NoSubstitutionTemplate"></emu-prodref>
    <emu-prodref name="TemplateHead"></emu-prodref>
    <emu-prodref name="TemplateSubstitutionTail"></emu-prodref>
    <emu-prodref name="TemplateMiddle"></emu-prodref>
    <emu-prodref name="TemplateTail"></emu-prodref>
    <emu-prodref name="TemplateCharacters"></emu-prodref>
    <emu-prodref name="TemplateCharacter"></emu-prodref>
    <emu-prodref name="TemplateEscapeSequence"></emu-prodref>
    <emu-prodref name="NotEscapeSequence"></emu-prodref>
    <emu-prodref name="NotCodePoint"></emu-prodref>
    <emu-prodref name="CodePoint"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-expressions">
    <h1>Expressions</h1>
    <emu-prodref name="IdentifierReference"></emu-prodref>
    <emu-prodref name="BindingIdentifier"></emu-prodref>
    <emu-prodref name="LabelIdentifier"></emu-prodref>
    <emu-prodref name="Identifier"></emu-prodref>
    <emu-prodref name="PrimaryExpression"></emu-prodref>
    <emu-prodref name="CoverParenthesizedExpressionAndArrowParameterList"></emu-prodref>
    <p>
      When processing an instance of the production<br>
      <emu-prodref name="PrimaryExpression" a="parencover"></emu-prodref><br>
      the interpretation of |CoverParenthesizedExpressionAndArrowParameterList| is refined using the following grammar:
    </p>
    <emu-prodref name="ParenthesizedExpression"></emu-prodref>
    <p>&nbsp;</p>
    <emu-prodref name="Literal"></emu-prodref>
    <emu-prodref name="ArrayLiteral"></emu-prodref>
    <emu-prodref name="ElementList"></emu-prodref>
    <emu-prodref name="Elision"></emu-prodref>
    <emu-prodref name="SpreadElement"></emu-prodref>
    <emu-prodref name="ObjectLiteral"></emu-prodref>
    <emu-prodref name="PropertyDefinitionList"></emu-prodref>
    <emu-prodref name="PropertyDefinition"></emu-prodref>
    <emu-prodref name="PropertyName"></emu-prodref>
    <emu-prodref name="LiteralPropertyName"></emu-prodref>
    <emu-prodref name="ComputedPropertyName"></emu-prodref>
    <emu-prodref name="CoverInitializedName"></emu-prodref>
    <emu-prodref name="Initializer"></emu-prodref>
    <emu-prodref name="TemplateLiteral"></emu-prodref>
    <emu-prodref name="SubstitutionTemplate"></emu-prodref>
    <emu-prodref name="TemplateSpans"></emu-prodref>
    <emu-prodref name="TemplateMiddleList"></emu-prodref>
    <emu-prodref name="MemberExpression"></emu-prodref>
    <emu-prodref name="SuperProperty"></emu-prodref>
    <emu-prodref name="MetaProperty"></emu-prodref>
    <emu-prodref name="NewTarget"></emu-prodref>
    <emu-prodref name="ImportMeta"></emu-prodref>
    <emu-prodref name="NewExpression"></emu-prodref>
    <emu-prodref name="CallExpression"></emu-prodref>
    <p>
      When processing an instance of the production<br>
      <emu-prodref name="CallExpression" a="callcover"></emu-prodref><br>
      the interpretation of |CoverCallExpressionAndAsyncArrowHead| is refined using the following grammar:
    </p>
    <emu-prodref name="CallMemberExpression"></emu-prodref>
    <p>&nbsp;</p>
    <emu-prodref name="SuperCall"></emu-prodref>
    <emu-prodref name="ImportCall"></emu-prodref>
    <emu-prodref name="Arguments"></emu-prodref>
    <emu-prodref name="ArgumentList"></emu-prodref>
    <emu-prodref name="OptionalExpression"></emu-prodref>
    <emu-prodref name="OptionalChain"></emu-prodref>
    <emu-prodref name="LeftHandSideExpression"></emu-prodref>
    <emu-prodref name="UpdateExpression"></emu-prodref>
    <emu-prodref name="UnaryExpression"></emu-prodref>
    <emu-prodref name="ExponentiationExpression"></emu-prodref>
    <emu-prodref name="MultiplicativeExpression"></emu-prodref>
    <emu-prodref name="MultiplicativeOperator"></emu-prodref>
    <emu-prodref name="AdditiveExpression"></emu-prodref>
    <emu-prodref name="ShiftExpression"></emu-prodref>
    <emu-prodref name="RelationalExpression"></emu-prodref>
    <emu-prodref name="EqualityExpression"></emu-prodref>
    <emu-prodref name="BitwiseANDExpression"></emu-prodref>
    <emu-prodref name="BitwiseXORExpression"></emu-prodref>
    <emu-prodref name="BitwiseORExpression"></emu-prodref>
    <emu-prodref name="LogicalANDExpression"></emu-prodref>
    <emu-prodref name="LogicalORExpression"></emu-prodref>
    <emu-prodref name="CoalesceExpression"></emu-prodref>
    <emu-prodref name="CoalesceExpressionHead"></emu-prodref>
    <emu-prodref name="ShortCircuitExpression"></emu-prodref>
    <emu-prodref name="ConditionalExpression"></emu-prodref>
    <emu-prodref name="AssignmentExpression"></emu-prodref>
    <emu-prodref name="AssignmentOperator"></emu-prodref>
    <p>
      In certain circumstances when processing an instance of the production<br>
      <emu-prodref name="AssignmentExpression" a="assignment"></emu-prodref><br>
      the interpretation of |LeftHandSideExpression| is refined using the following grammar:
    </p>
    <emu-prodref name="AssignmentPattern"></emu-prodref>
    <emu-prodref name="ObjectAssignmentPattern"></emu-prodref>
    <emu-prodref name="ArrayAssignmentPattern"></emu-prodref>
    <emu-prodref name="AssignmentRestProperty"></emu-prodref>
    <emu-prodref name="AssignmentPropertyList"></emu-prodref>
    <emu-prodref name="AssignmentElementList"></emu-prodref>
    <emu-prodref name="AssignmentElisionElement"></emu-prodref>
    <emu-prodref name="AssignmentProperty"></emu-prodref>
    <emu-prodref name="AssignmentElement"></emu-prodref>
    <emu-prodref name="AssignmentRestElement"></emu-prodref>
    <emu-prodref name="DestructuringAssignmentTarget"></emu-prodref>
    <p>&nbsp;</p>
    <emu-prodref name="Expression"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-statements">
    <h1>Statements</h1>
    <emu-prodref name="Statement"></emu-prodref>
    <emu-prodref name="Declaration"></emu-prodref>
    <emu-prodref name="HoistableDeclaration"></emu-prodref>
    <emu-prodref name="BreakableStatement"></emu-prodref>
    <emu-prodref name="BlockStatement"></emu-prodref>
    <emu-prodref name="Block"></emu-prodref>
    <emu-prodref name="StatementList"></emu-prodref>
    <emu-prodref name="StatementListItem"></emu-prodref>
    <emu-prodref name="LexicalDeclaration"></emu-prodref>
    <emu-prodref name="LetOrConst"></emu-prodref>
    <emu-prodref name="BindingList"></emu-prodref>
    <emu-prodref name="LexicalBinding"></emu-prodref>
    <emu-prodref name="VariableStatement"></emu-prodref>
    <emu-prodref name="VariableDeclarationList"></emu-prodref>
    <emu-prodref name="VariableDeclaration"></emu-prodref>
    <emu-prodref name="BindingPattern"></emu-prodref>
    <emu-prodref name="ObjectBindingPattern"></emu-prodref>
    <emu-prodref name="ArrayBindingPattern"></emu-prodref>
    <emu-prodref name="BindingRestProperty"></emu-prodref>
    <emu-prodref name="BindingPropertyList"></emu-prodref>
    <emu-prodref name="BindingElementList"></emu-prodref>
    <emu-prodref name="BindingElisionElement"></emu-prodref>
    <emu-prodref name="BindingProperty"></emu-prodref>
    <emu-prodref name="BindingElement"></emu-prodref>
    <emu-prodref name="SingleNameBinding"></emu-prodref>
    <emu-prodref name="BindingRestElement"></emu-prodref>
    <emu-prodref name="EmptyStatement"></emu-prodref>
    <emu-prodref name="ExpressionStatement"></emu-prodref>
    <emu-prodref name="IfStatement"></emu-prodref>
    <emu-prodref name="IterationStatement"></emu-prodref>
    <emu-prodref name="DoWhileStatement"></emu-prodref>
    <emu-prodref name="WhileStatement"></emu-prodref>
    <emu-prodref name="ForStatement"></emu-prodref>
    <emu-prodref name="ForInOfStatement"></emu-prodref>
    <emu-prodref name="ForDeclaration"></emu-prodref>
    <emu-prodref name="ForBinding"></emu-prodref>
    <emu-prodref name="ContinueStatement"></emu-prodref>
    <emu-prodref name="BreakStatement"></emu-prodref>
    <emu-prodref name="ReturnStatement"></emu-prodref>
    <emu-prodref name="WithStatement"></emu-prodref>
    <emu-prodref name="SwitchStatement"></emu-prodref>
    <emu-prodref name="CaseBlock"></emu-prodref>
    <emu-prodref name="CaseClauses"></emu-prodref>
    <emu-prodref name="CaseClause"></emu-prodref>
    <emu-prodref name="DefaultClause"></emu-prodref>
    <emu-prodref name="LabelledStatement"></emu-prodref>
    <emu-prodref name="LabelledItem"></emu-prodref>
    <emu-prodref name="ThrowStatement"></emu-prodref>
    <emu-prodref name="TryStatement"></emu-prodref>
    <emu-prodref name="Catch"></emu-prodref>
    <emu-prodref name="Finally"></emu-prodref>
    <emu-prodref name="CatchParameter"></emu-prodref>
    <emu-prodref name="DebuggerStatement"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-functions-and-classes">
    <h1>Functions and Classes</h1>
    <emu-prodref name="UniqueFormalParameters"></emu-prodref>
    <emu-prodref name="FormalParameters"></emu-prodref>
    <emu-prodref name="FormalParameterList"></emu-prodref>
    <emu-prodref name="FunctionRestParameter"></emu-prodref>
    <emu-prodref name="FormalParameter"></emu-prodref>
    <emu-prodref name="FunctionDeclaration"></emu-prodref>
    <emu-prodref name="FunctionExpression"></emu-prodref>
    <emu-prodref name="FunctionBody"></emu-prodref>
    <emu-prodref name="FunctionStatementList"></emu-prodref>
    <emu-prodref name="ArrowFunction"></emu-prodref>
    <emu-prodref name="ArrowParameters"></emu-prodref>
    <emu-prodref name="ConciseBody"></emu-prodref>
    <emu-prodref name="ExpressionBody"></emu-prodref>
    <p>
      When processing an instance of the production<br>
      <emu-prodref name="ArrowParameters" a="parencover"></emu-prodref><br>
      the interpretation of |CoverParenthesizedExpressionAndArrowParameterList| is refined using the following grammar:
    </p>
    <emu-prodref name="ArrowFormalParameters"></emu-prodref>
    <p>&nbsp;</p>
    <emu-prodref name="AsyncArrowFunction"></emu-prodref>
    <emu-prodref name="AsyncConciseBody"></emu-prodref>
    <emu-prodref name="AsyncArrowBindingIdentifier"></emu-prodref>
    <emu-prodref name="CoverCallExpressionAndAsyncArrowHead"></emu-prodref>
    <p>
      When processing an instance of the production<br>
      <emu-prodref name="AsyncArrowFunction" a="callcover"></emu-prodref><br>
      the interpretation of |CoverCallExpressionAndAsyncArrowHead| is refined using the following grammar:
    </p>
    <emu-prodref name="AsyncArrowHead"></emu-prodref>
    <p>&nbsp;</p>
    <emu-prodref name="MethodDefinition"></emu-prodref>
    <emu-prodref name="PropertySetParameterList"></emu-prodref>
    <emu-prodref name="GeneratorDeclaration"></emu-prodref>
    <emu-prodref name="GeneratorExpression"></emu-prodref>
    <emu-prodref name="GeneratorMethod"></emu-prodref>
    <emu-prodref name="GeneratorBody"></emu-prodref>
    <emu-prodref name="YieldExpression"></emu-prodref>
    <emu-prodref name="AsyncGeneratorDeclaration"></emu-prodref>
    <emu-prodref name="AsyncGeneratorExpression"></emu-prodref>
    <emu-prodref name="AsyncGeneratorMethod"></emu-prodref>
    <emu-prodref name="AsyncGeneratorBody"></emu-prodref>
    <emu-prodref name="AsyncFunctionDeclaration"></emu-prodref>
    <emu-prodref name="AsyncFunctionExpression"></emu-prodref>
    <emu-prodref name="AsyncMethod"></emu-prodref>
    <emu-prodref name="AsyncFunctionBody"></emu-prodref>
    <emu-prodref name="AwaitExpression"></emu-prodref>
    <emu-prodref name="ClassDeclaration"></emu-prodref>
    <emu-prodref name="ClassExpression"></emu-prodref>
    <emu-prodref name="ClassTail"></emu-prodref>
    <emu-prodref name="ClassHeritage"></emu-prodref>
    <emu-prodref name="ClassBody"></emu-prodref>
    <emu-prodref name="ClassElementList"></emu-prodref>
    <emu-prodref name="ClassElement"></emu-prodref>
    <emu-prodref name="FieldDefinition"></emu-prodref>
    <emu-prodref name="ClassElementName"></emu-prodref>
    <emu-prodref name="ClassStaticBlock"></emu-prodref>
    <emu-prodref name="ClassStaticBlockBody"></emu-prodref>
    <emu-prodref name="ClassStaticBlockStatementList"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-scripts-and-modules">
    <h1>Scripts and Modules</h1>
    <emu-prodref name="Script"></emu-prodref>
    <emu-prodref name="ScriptBody"></emu-prodref>
    <emu-prodref name="Module"></emu-prodref>
    <emu-prodref name="ModuleBody"></emu-prodref>
    <emu-prodref name="ModuleItemList"></emu-prodref>
    <emu-prodref name="ModuleItem"></emu-prodref>
    <emu-prodref name="ModuleExportName"></emu-prodref>
    <emu-prodref name="ImportDeclaration"></emu-prodref>
    <emu-prodref name="ImportClause"></emu-prodref>
    <emu-prodref name="ImportedDefaultBinding"></emu-prodref>
    <emu-prodref name="NameSpaceImport"></emu-prodref>
    <emu-prodref name="NamedImports"></emu-prodref>
    <emu-prodref name="FromClause"></emu-prodref>
    <emu-prodref name="ImportsList"></emu-prodref>
    <emu-prodref name="ImportSpecifier"></emu-prodref>
    <emu-prodref name="ModuleSpecifier"></emu-prodref>
    <emu-prodref name="ImportedBinding"></emu-prodref>
    <emu-prodref name="ExportDeclaration"></emu-prodref>
    <emu-prodref name="ExportFromClause"></emu-prodref>
    <emu-prodref name="NamedExports"></emu-prodref>
    <emu-prodref name="ExportsList"></emu-prodref>
    <emu-prodref name="ExportSpecifier"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-number-conversions">
    <h1>Number Conversions</h1>
    <emu-prodref name="StringNumericLiteral"></emu-prodref>
    <emu-prodref name="StrWhiteSpace"></emu-prodref>
    <emu-prodref name="StrWhiteSpaceChar"></emu-prodref>
    <emu-prodref name="StrNumericLiteral"></emu-prodref>
    <emu-prodref name="StrDecimalLiteral"></emu-prodref>
    <emu-prodref name="StrUnsignedDecimalLiteral"></emu-prodref>
    <p>All grammar symbols not explicitly defined by the |StringNumericLiteral| grammar have the definitions used in the <emu-xref href="#sec-literals-numeric-literals">Lexical Grammar for numeric literals</emu-xref>.</p>
    <emu-prodref name="StringIntegerLiteral"></emu-prodref>
    <emu-prodref name="StrIntegerLiteral"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-time-zone-offset-string-format">
    <h1>Time Zone Offset String Format</h1>
    <emu-prodref name="UTCOffset"></emu-prodref>
    <emu-prodref name="ASCIISign"></emu-prodref>
    <emu-prodref name="Hour"></emu-prodref>
    <emu-prodref name="HourSubcomponents"></emu-prodref>
    <emu-prodref name="TimeSeparator"></emu-prodref>
    <emu-prodref name="MinuteSecond"></emu-prodref>
    <emu-prodref name="TemporalDecimalFraction"></emu-prodref>
    <emu-prodref name="TemporalDecimalSeparator"></emu-prodref>
  </emu-annex>

  <emu-annex id="sec-regular-expressions">
    <h1>Regular Expressions</h1>
    <emu-prodref name="Pattern"></emu-prodref>
    <emu-prodref name="Disjunction"></emu-prodref>
    <emu-prodref name="Alternative"></emu-prodref>
    <emu-prodref name="Term"></emu-prodref>
    <emu-prodref name="Assertion"></emu-prodref>
    <emu-prodref name="Quantifier"></emu-prodref>
    <emu-prodref name="QuantifierPrefix"></emu-prodref>
    <emu-prodref name="Atom"></emu-prodref>
    <emu-prodref name="SyntaxCharacter"></emu-prodref>
    <emu-prodref name="PatternCharacter"></emu-prodref>
    <emu-prodref name="AtomEscape"></emu-prodref>
    <emu-prodref name="CharacterEscape"></emu-prodref>
    <emu-prodref name="ControlEscape"></emu-prodref>
    <emu-prodref name="GroupSpecifier"></emu-prodref>
    <emu-prodref name="GroupName"></emu-prodref>
    <emu-prodref name="RegExpIdentifierName"></emu-prodref>
    <emu-prodref name="RegExpIdentifierStart"></emu-prodref>
    <emu-prodref name="RegExpIdentifierPart"></emu-prodref>
    <emu-prodref name="RegExpUnicodeEscapeSequence"></emu-prodref>
    <emu-prodref name="UnicodeLeadSurrogate"></emu-prodref>
    <emu-prodref name="UnicodeTrailSurrogate"></emu-prodref>
    <p>Each `\\u` |HexTrailSurrogate| for which the choice of associated `u` |HexLeadSurrogate| is ambiguous shall be associated with the nearest possible `u` |HexLeadSurrogate| that would otherwise have no corresponding `\\u` |HexTrailSurrogate|.</p>
    <p>&nbsp;</p>
    <emu-prodref name="HexLeadSurrogate"></emu-prodref>
    <emu-prodref name="HexTrailSurrogate"></emu-prodref>
    <emu-prodref name="HexNonSurrogate"></emu-prodref>
    <emu-prodref name="IdentityEscape"></emu-prodref>
    <emu-prodref name="DecimalEscape"></emu-prodref>
    <emu-prodref name="CharacterClassEscape"></emu-prodref>
    <emu-prodref name="UnicodePropertyValueExpression"></emu-prodref>
    <emu-prodref name="UnicodePropertyName"></emu-prodref>
    <emu-prodref name="UnicodePropertyNameCharacters"></emu-prodref>
    <emu-prodref name="UnicodePropertyValue"></emu-prodref>
    <emu-prodref name="LoneUnicodePropertyNameOrValue"></emu-prodref>
    <emu-prodref name="UnicodePropertyValueCharacters"></emu-prodref>
    <emu-prodref name="UnicodePropertyValueCharacter"></emu-prodref>
    <emu-prodref name="UnicodePropertyNameCharacter"></emu-prodref>
    <emu-prodref name="CharacterClass"></emu-prodref>
    <emu-prodref name="ClassContents"></emu-prodref>
    <emu-prodref name="NonemptyClassRanges"></emu-prodref>
    <emu-prodref name="NonemptyClassRangesNoDash"></emu-prodref>
    <emu-prodref name="ClassAtom"></emu-prodref>
    <emu-prodref name="ClassAtomNoDash"></emu-prodref>
    <emu-prodref name="ClassEscape"></emu-prodref>
    <emu-prodref name="ClassSetExpression"></emu-prodref>
    <emu-prodref name="ClassUnion"></emu-prodref>
    <emu-prodref name="ClassIntersection"></emu-prodref>
    <emu-prodref name="ClassSubtraction"></emu-prodref>
    <emu-prodref name="ClassSetRange"></emu-prodref>
    <emu-prodref name="ClassSetOperand"></emu-prodref>
    <emu-prodref name="NestedClass"></emu-prodref>
    <emu-prodref name="ClassStringDisjunction"></emu-prodref>
    <emu-prodref name="ClassStringDisjunctionContents"></emu-prodref>
    <emu-prodref name="ClassString"></emu-prodref>
    <emu-prodref name="NonEmptyClassString"></emu-prodref>
    <emu-prodref name="ClassSetCharacter"></emu-prodref>
    <emu-prodref name="ClassSetReservedDoublePunctuator"></emu-prodref>
    <emu-prodref name="ClassSetSyntaxCharacter"></emu-prodref>
    <emu-prodref name="ClassSetReservedPunctuator"></emu-prodref>
  </emu-annex>

<h1 id="sec-additional-ecmascript-features-for-web-browsers"></h1>
