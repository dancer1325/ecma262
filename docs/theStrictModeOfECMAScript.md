# The Strict Mode of ECMAScript
  <p><b>The strict mode restriction and exceptions</b></p>
  <ul>
    <li>
      `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield` are reserved words within strict mode code. (<emu-xref href="#sec-keywords-and-reserved-words"></emu-xref>).
    </li>
    <li>
      A conforming implementation, when processing strict mode code, must disallow instances of the productions <emu-grammar>NumericLiteral :: LegacyOctalIntegerLiteral</emu-grammar> and <emu-grammar>DecimalIntegerLiteral :: NonOctalDecimalIntegerLiteral</emu-grammar>.
    </li>
    <li>
      A conforming implementation, when processing strict mode code, must disallow instances of the productions <emu-grammar>EscapeSequence :: LegacyOctalEscapeSequence</emu-grammar> and <emu-grammar>EscapeSequence :: NonOctalDecimalEscapeSequence</emu-grammar>.
    </li>
    <li>
      Assignment to an undeclared identifier or otherwise unresolvable reference does not create a property in the global object. When a simple assignment occurs within strict mode code, its |LeftHandSideExpression| must not evaluate to an unresolvable Reference. If it does a *ReferenceError* exception is thrown (<emu-xref href="#sec-putvalue"></emu-xref>). The |LeftHandSideExpression| also may not be a reference to a data property with the attribute value { [[Writable]]: *false* }, to an accessor property with the attribute value { [[Set]]: *undefined* }, nor to a non-existent property of an object whose [[Extensible]] internal slot is *false*. In these cases a `TypeError` exception is thrown (<emu-xref href="#sec-assignment-operators"></emu-xref>).
    </li>
    <li>
      An |IdentifierReference| with the StringValue *"eval"* or *"arguments"* may not appear as the |LeftHandSideExpression| of an Assignment operator (<emu-xref href="#sec-assignment-operators"></emu-xref>) or of an |UpdateExpression| (<emu-xref href="#sec-update-expressions"></emu-xref>) or as the |UnaryExpression| operated upon by a Prefix Increment (<emu-xref href="#sec-prefix-increment-operator"></emu-xref>) or a Prefix Decrement (<emu-xref href="#sec-prefix-decrement-operator"></emu-xref>) operator.
    </li>
    <li>
      Arguments objects for strict functions define a non-configurable accessor property *"callee"* which throws a *TypeError* exception on access (<emu-xref href="#sec-createunmappedargumentsobject"></emu-xref>).
    </li>
    <li>
      Arguments objects for strict functions do not dynamically share their <emu-xref href="#array-index">array-indexed</emu-xref> property values with the corresponding formal parameter bindings of their functions. (<emu-xref href="#sec-arguments-exotic-objects"></emu-xref>).
    </li>
    <li>
      For strict functions, if an arguments object is created the binding of the local identifier `arguments` to the arguments object is immutable and hence may not be the target of an assignment expression. (<emu-xref href="#sec-functiondeclarationinstantiation"></emu-xref>).
    </li>
    <li>
      It is a *SyntaxError* if the StringValue of a |BindingIdentifier| is either *"eval"* or *"arguments"* within strict mode code (<emu-xref href="#sec-identifiers-static-semantics-early-errors"></emu-xref>).
    </li>
    <li>
      Strict mode eval code cannot instantiate variables or functions in the variable environment of the caller to eval. Instead, a new variable environment is created and that environment is used for declaration binding instantiation for the eval code (<emu-xref href="#sec-eval-x"></emu-xref>).
    </li>
    <li>
      If *this* is evaluated within strict mode code, then the *this* value is not coerced to an object. A *this* value of either *undefined* or *null* is not converted to the global object and primitive values are not converted to wrapper objects. The *this* value passed via a function call (including calls made using `Function.prototype.apply` and `Function.prototype.call`) do not coerce the passed *this* value to an object (<emu-xref href="#sec-ordinarycallbindthis"></emu-xref>, <emu-xref href="#sec-function.prototype.apply"></emu-xref>, <emu-xref href="#sec-function.prototype.call"></emu-xref>).
    </li>
    <li>
      When a `delete` operator occurs within strict mode code, a *SyntaxError* is thrown if its |UnaryExpression| is a direct reference to a variable, function argument, or function name (<emu-xref href="#sec-delete-operator-static-semantics-early-errors"></emu-xref>).
    </li>
    <li>
      When a `delete` operator occurs within strict mode code, a *TypeError* is thrown if the property to be deleted has the attribute { [[Configurable]]: *false* } or otherwise cannot be deleted (<emu-xref href="#sec-delete-operator-runtime-semantics-evaluation"></emu-xref>).
    </li>
    <li>
      Strict mode code may not include a |WithStatement|. The occurrence of a |WithStatement| in such a context is a *SyntaxError* (<emu-xref href="#sec-with-statement-static-semantics-early-errors"></emu-xref>).
    </li>
    <li>
      It is a *SyntaxError* if a |CatchParameter| occurs within strict mode code and the BoundNames of |CatchParameter| contains either `eval` or `arguments` (<emu-xref href="#sec-try-statement-static-semantics-early-errors"></emu-xref>).
    </li>
    <li>
      It is a *SyntaxError* if the same |BindingIdentifier| appears more than once in the |FormalParameters| of a strict function. An attempt to create such a function using a Function, Generator, or AsyncFunction constructor is a *SyntaxError* (<emu-xref href="#sec-function-definitions-static-semantics-early-errors"></emu-xref>, <emu-xref href="#sec-createdynamicfunction"></emu-xref>).
    </li>
    <li>
      An implementation may not extend, beyond that defined in this specification, the meanings within strict functions of properties named *"caller"* or *"arguments"* of function instances.
    </li>
  </ul>

<h1 id="sec-host-layering-points"></h1>
