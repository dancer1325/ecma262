# Overview
  <p>This section contains a non-normative overview of the ECMAScript language.</p>
  <p>ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment. ECMAScript as defined here is not intended to be computationally self-sufficient; indeed, there are no provisions in this specification for input of external data or output of computed results. Instead, it is expected that the computational environment of an ECMAScript program will provide not only the objects and other facilities described in this specification but also certain environment-specific objects, whose description and behaviour are beyond the scope of this specification except to indicate that they may provide certain properties that can be accessed and certain functions that can be called from an ECMAScript program.</p>
  <p>ECMAScript was originally designed to be used as a scripting language, but has become widely used as a general-purpose programming language. A <em>scripting language</em> is a programming language that is used to manipulate, customize, and automate the facilities of an existing system. In such systems, useful functionality is already available through a user interface, and the scripting language is a mechanism for exposing that functionality to program control. In this way, the existing system is said to provide a host environment of objects and facilities, which completes the capabilities of the scripting language. A scripting language is intended for use by both professional and non-professional programmers.</p>
  <p>ECMAScript was originally designed to be a <em>Web scripting language</em>, providing a mechanism to enliven Web pages in browsers and to perform server computation as part of a Web-based client-server architecture. ECMAScript is now used to provide core scripting capabilities for a variety of host environments. Therefore the core language is specified in this document apart from any particular host environment.</p>
  <p>ECMAScript usage has moved beyond simple scripting and it is now used for the full spectrum of programming tasks in many different environments and scales. As the usage of ECMAScript has expanded, so have the features and facilities it provides. ECMAScript is now a fully featured general-purpose programming language.</p>

<h2 id="sec-web-scripting">Web Scripting</h2>
## Web Scripting
    <p>A web browser provides an ECMAScript host environment for client-side computation including, for instance, objects that represent windows, menus, pop-ups, dialog boxes, text areas, anchors, frames, history, cookies, and input/output. Further, the host environment provides a means to attach scripting code to events such as change of focus, page and image loading, unloading, error and abort, selection, form submission, and mouse actions. Scripting code appears within the HTML and the displayed page is a combination of user interface elements and fixed and computed text and images. The scripting code is reactive to user interaction, and there is no need for a main program.</p>
    <p>A web server provides a different host environment for server-side computation including objects representing requests, clients, and files; and mechanisms to lock and share data. By using browser-side and server-side scripting together, it is possible to distribute computation between the client and server while providing a customized user interface for a Web-based application.</p>
    <p>Each Web browser and server that supports ECMAScript supplies its own host environment, completing the ECMAScript execution environment.</p>

<h2 id="sec-hosts-and-implementations">Hosts and Implementations</h2>
## Hosts and Implementations
    <p>To aid integrating ECMAScript into host environments, this specification defers the definition of certain facilities (e.g., abstract operations), either in whole or in part, to a source outside of this specification. Editorially, this specification distinguishes the following kinds of deferrals.</p>
    <!-- "implementation" below is not a dfn but an em to avoid excessive auto-linking. -->
    <p>An <em id="implementation">implementation</em> is an external source that further defines facilities enumerated in Annex <emu-xref href="#sec-host-layering-points"></emu-xref> or those that are marked as implementation-defined or implementation-approximated. In informal use, an implementation refers to a concrete artefact, such as a particular web browser.</p>
    <p>An <dfn id="implementation-defined">implementation-defined</dfn> facility is one that defers its definition to an external source without further qualification. This specification does not make any recommendations for particular behaviours, and conforming implementations are free to choose any behaviour within the constraints put forth by this specification.</p>
    <p>An <dfn id="implementation-approximated">implementation-approximated</dfn> facility is one that defers its definition to an external source while recommending an ideal behaviour. While conforming implementations are free to choose any behaviour within the constraints put forth by this specification, they are encouraged to strive to approximate the ideal. Some mathematical operations, such as <emu-xref href="#sec-math.exp"><code>Math.exp</code></emu-xref>, are implementation-approximated.</p>
    <p>A <dfn id="host" variants="hosts">host</dfn> is an external source that further defines facilities listed in Annex <emu-xref href="#sec-host-layering-points"></emu-xref> but does not further define other implementation-defined or implementation-approximated facilities. In informal use, a host refers to the set of all implementations, such as the set of all web browsers, that interface with this specification in the same way via Annex <emu-xref href="#sec-host-layering-points"></emu-xref>. A host is often an external specification, such as WHATWG HTML (<a href="https://html.spec.whatwg.org/">https://html.spec.whatwg.org/</a>). In other words, facilities that are host-defined are often further defined in external specifications.</p>
    <p>A <dfn id="host-hook" variants="host hooks">host hook</dfn> is an abstract operation that is defined in whole or in part by an external source. All host hooks must be listed in Annex <emu-xref href="#sec-host-layering-points"></emu-xref>. A host hook must conform to at least the following requirements:</p>
    <ul>
      <li>It must return either a normal completion or a throw completion.</li>
    </ul>
    <p>A <dfn id="host-defined">host-defined</dfn> facility is one that defers its definition to an external source without further qualification and is listed in Annex <emu-xref href="#sec-host-layering-points"></emu-xref>. Implementations that are not hosts may also provide definitions for host-defined facilities.</p>
    <p>A <dfn id="host-environment" variants="host environments">host environment</dfn> is a particular choice of definition for all host-defined facilities. A host environment typically includes objects or functions which allow obtaining input and providing output as host-defined properties of the global object.</p>
    <p>This specification follows the editorial convention of always using the most specific term. For example, if a facility is host-defined, it should not be referred to as implementation-defined.</p>
    <p>Both hosts and implementations may interface with this specification via the language types, specification types, abstract operations, grammar productions, intrinsic objects, and intrinsic symbols defined herein.</p>

<h2 id="sec-ecmascript-overview">ECMAScript Overview</h2>
## ECMAScript Overview
    <p>The following is an informal overview of ECMAScript—not all parts of the language are described. This overview is not part of the standard proper.</p>
    <p>ECMAScript is object-based: basic language and host facilities are provided by objects, and an ECMAScript program is a cluster of communicating objects. In ECMAScript, an <em>object</em> is a collection of zero or more <em>properties</em> each with <em>attributes</em> that determine how each property can be used—for example, when the Writable attribute for a property is set to *false*, any attempt by executed ECMAScript code to assign a different value to the property fails. Properties are containers that hold other objects, <em>primitive values</em>, or <em>functions</em>. A primitive value is a member of one of the following built-in types: <b>Undefined</b>, <b>Null</b>, <b>Boolean</b>, <b>Number</b>, <b>BigInt</b>, <b>String</b>, and <b>Symbol;</b> an object is a member of the built-in type <b>Object</b>; and a function is a callable object. A function that is associated with an object via a property is called a <em>method</em>.</p>
    <p>ECMAScript defines a collection of <em>built-in objects</em> that round out the definition of ECMAScript entities. These built-in objects include the global object; objects that are fundamental to the runtime semantics of the language including `Object`, `Function`, `Boolean`, `Symbol`, and various `Error` objects; objects that represent and manipulate numeric values including `Math`, `Number`, and `Date`; the text processing objects `String` and `RegExp`; objects that are indexed collections of values including `Array` and nine different kinds of Typed Arrays whose elements all have a specific numeric data representation; keyed collections including `Map` and `Set` objects; objects supporting structured data including the `JSON` object, `ArrayBuffer`, `SharedArrayBuffer`, and `DataView`; objects supporting control abstractions including generator functions and `Promise` objects; and reflection objects including `Proxy` and `Reflect`.</p>
    <p>ECMAScript also defines a set of built-in <em>operators</em>. ECMAScript operators include various unary operations, multiplicative operators, additive operators, bitwise shift operators, relational operators, equality operators, binary bitwise operators, binary logical operators, assignment operators, and the comma operator.</p>
    <p>Large ECMAScript programs are supported by <em>modules</em> which allow a program to be divided into multiple sequences of statements and declarations. Each module explicitly identifies declarations it uses that need to be provided by other modules and which of its declarations are available for use by other modules.</p>
    <p>ECMAScript syntax intentionally resembles Java syntax. ECMAScript syntax is relaxed to enable it to serve as an easy-to-use scripting language. For example, a variable is not required to have its type declared nor are types associated with properties, and defined functions are not required to have their declarations appear textually before calls to them.</p>

    <emu-clause id="sec-objects">
      <h1>Objects</h1>
      <p>Even though ECMAScript includes syntax for class definitions, ECMAScript objects are not fundamentally class-based such as those in C++, Smalltalk, or Java. Instead objects may be created in various ways including via a literal notation or via <em>constructors</em> which create objects and then execute code that initializes all or part of them by assigning initial values to their properties. Each constructor is a function that has a property named *"prototype"* that is used to implement <em>prototype-based inheritance</em> and <em>shared properties</em>. Objects are created by using constructors in <b>new</b> expressions; for example, `new Date(2009, 11)` creates a new Date object. Invoking a constructor without using <b>new</b> has consequences that depend on the constructor. For example, `Date()` produces a string representation of the current date and time rather than an object.</p>
      <p>Every object created by a constructor has an implicit reference (called the object's <em>prototype</em>) to the value of its constructor's *"prototype"* property. Furthermore, a prototype may have a non-*null* implicit reference to its prototype, and so on; this is called the <em>prototype chain</em>. When a reference is made to a property in an object, that reference is to the property of that name in the first object in the prototype chain that contains a property of that name. In other words, first the object mentioned directly is examined for such a property; if that object contains the named property, that is the property to which the reference refers; if that object does not contain the named property, the prototype for that object is examined next; and so on.</p>
      <emu-figure id="figure-1" caption="Object/Prototype Relationships">
        <img alt="An image of lots of boxes and arrows." height="354" src="img/figure-1.svg" width="719">
      </emu-figure>
      <p>In a class-based object-oriented language, in general, state is carried by instances, methods are carried by classes, and inheritance is only of structure and behaviour. In ECMAScript, the state and methods are carried by objects, while structure, behaviour, and state are all inherited.</p>
      <p>All objects that do not directly contain a particular property that their prototype contains share that property and its value. Figure 1 illustrates this:</p>
      <p><b>CF</b> is a constructor (and also an object). Five objects have been created by using `new` expressions: <b>cf<sub>1</sub></b>, <b>cf<sub>2</sub></b>, <b>cf<sub>3</sub></b>, <b>cf<sub>4</sub></b>, and <b>cf<sub>5</sub></b>. Each of these objects contains properties named *"q1"* and *"q2"*. The dashed lines represent the implicit prototype relationship; so, for example, <b>cf<sub>3</sub></b>'s prototype is <b>CF<sub>p</sub></b>. The constructor, <b>CF</b>, has two properties itself, named *"P1"* and *"P2"*, which are not visible to <b>CF<sub>p</sub></b>, <b>cf<sub>1</sub></b>, <b>cf<sub>2</sub></b>, <b>cf<sub>3</sub></b>, <b>cf<sub>4</sub></b>, or <b>cf<sub>5</sub></b>. The property named *"CFP1"* in <b>CF<sub>p</sub></b> is shared by <b>cf<sub>1</sub></b>, <b>cf<sub>2</sub></b>, <b>cf<sub>3</sub></b>, <b>cf<sub>4</sub></b>, and <b>cf<sub>5</sub></b> (but not by <b>CF</b>), as are any properties found in <b>CF<sub>p</sub></b>'s implicit prototype chain that are not named *"q1"*, *"q2"*, or *"CFP1"*. Notice that there is no implicit prototype link between <b>CF</b> and <b>CF<sub>p</sub></b>.</p>
      <p>Unlike most class-based object languages, properties can be added to objects dynamically by assigning values to them. That is, constructors are not required to name or assign values to all or any of the constructed object's properties. In the above diagram, one could add a new shared property for <b>cf<sub>1</sub></b>, <b>cf<sub>2</sub></b>, <b>cf<sub>3</sub></b>, <b>cf<sub>4</sub></b>, and <b>cf<sub>5</sub></b> by assigning a new value to the property in <b>CF<sub>p</sub></b>.</p>
      <p>Although ECMAScript objects are not inherently class-based, it is often convenient to define class-like abstractions based upon a common pattern of constructor functions, prototype objects, and methods. The ECMAScript built-in objects themselves follow such a class-like pattern. Beginning with ECMAScript 2015, the ECMAScript language includes syntactic class definitions that permit programmers to concisely define objects that conform to the same class-like abstraction pattern used by the built-in objects.</p>
    </emu-clause>

    <emu-clause id="sec-strict-variant-of-ecmascript">
      <h1>The Strict Variant of ECMAScript</h1>
      <p>The ECMAScript Language recognizes the possibility that some users of the language may wish to restrict their usage of some features available in the language. They might do so in the interests of security, to avoid what they consider to be error-prone features, to get enhanced error checking, or for other reasons of their choosing. In support of this possibility, ECMAScript defines a strict variant of the language. The strict variant of the language excludes some specific syntactic and semantic features of the regular ECMAScript language and modifies the detailed semantics of some features. The strict variant also specifies additional error conditions that must be reported by throwing error exceptions in situations that are not specified as errors by the non-strict form of the language.</p>
      <p>The strict variant of ECMAScript is commonly referred to as the <em>strict mode</em> of the language. Strict mode selection and use of the strict mode syntax and semantics of ECMAScript is explicitly made at the level of individual ECMAScript source text units as described in <emu-xref href="#sec-strict-mode-code"></emu-xref>. Because strict mode is selected at the level of a syntactic source text unit, strict mode only imposes restrictions that have local effect within such a source text unit. Strict mode does not restrict or modify any aspect of the ECMAScript semantics that must operate consistently across multiple source text units. A complete ECMAScript program may be composed of both strict mode and non-strict mode ECMAScript source text units. In this case, strict mode only applies when actually executing code that is defined within a strict mode source text unit.</p>
      <p>In order to conform to this specification, an ECMAScript implementation must implement both the full unrestricted ECMAScript language and the strict variant of the ECMAScript language as defined by this specification. In addition, an implementation must support the combination of unrestricted and strict mode source text units into a single composite program.</p>
    </emu-clause>

<h2 id="sec-terms-and-definitions">Terms and Definitions</h2>
## Terms and Definitions
    <p>For the purposes of this document, the following terms and definitions apply.</p>

    <emu-clause id="sec-terms-and-definitions-implementation-approximated">
      <h1>implementation-approximated</h1>
      <p>an implementation-approximated facility is defined in whole or in part by an external source but has a recommended, ideal behaviour in this specification</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-implementation-defined">
      <h1>implementation-defined</h1>
      <p>an implementation-defined facility is defined in whole or in part by an external source to this specification</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-host-defined">
      <h1>host-defined</h1>
      <p>same as implementation-defined</p>
      <emu-note>
        <p>Editorially, see clause <emu-xref href="#sec-hosts-and-implementations"></emu-xref>.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-type">
      <h1>type</h1>
      <p>set of data values as defined in clause <emu-xref href="#sec-ecmascript-data-types-and-values"></emu-xref></p>
    </emu-clause>

    <emu-clause id="sec-primitive-value">
      <h1>primitive value</h1>
      <p>member of one of the types Undefined, Null, Boolean, Number, BigInt, Symbol, or String as defined in clause <emu-xref href="#sec-ecmascript-data-types-and-values"></emu-xref></p>
      <emu-note>
        <p>A primitive value is a datum that is represented directly at the lowest level of the language implementation.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-object">
      <h1>object</h1>
      <p>member of the type Object</p>
      <emu-note>
        <p>An object is a collection of properties and has a single prototype object. The prototype may be *null*.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-constructor">
      <h1>constructor</h1>
      <p>function object that creates and initializes objects</p>
      <emu-note>
        <p>The value of a constructor's *"prototype"* property is a prototype object that is used to implement inheritance and shared properties.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-prototype">
      <h1>prototype</h1>
      <p>object that provides shared properties for other objects</p>
      <emu-note>
        <p>When a constructor creates an object, that object implicitly references the constructor's *"prototype"* property for the purpose of resolving property references. The constructor's *"prototype"* property can be referenced by the program expression <code><var>constructor</var>.prototype</code>, and properties added to an object's prototype are shared, through inheritance, by all objects sharing the prototype. Alternatively, a new object may be created with an explicitly specified prototype by using the `Object.create` built-in function.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-ordinary-object">
      <h1>ordinary object</h1>
      <p>object that has the default behaviour for the essential internal methods that must be supported by all objects</p>
    </emu-clause>

    <emu-clause id="sec-exotic-object">
      <h1>exotic object</h1>
      <p>object that does not have the default behaviour for one or more of the essential internal methods</p>
      <emu-note>
        <p>Any object that is not an ordinary object is an exotic object.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-standard-object">
      <h1>standard object</h1>
      <p>object whose semantics are defined by this specification</p>
    </emu-clause>

    <emu-clause id="sec-built-in-object">
      <h1>built-in object</h1>
      <p>object specified and supplied by an ECMAScript implementation</p>
      <emu-note>
        <p>Standard built-in objects are defined in this specification. An ECMAScript implementation may specify and supply additional kinds of built-in objects.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-undefined-value">
      <h1>undefined value</h1>
      <p>primitive value used when a variable has not been assigned a value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-undefined-type">
      <h1>Undefined type</h1>
      <p>type whose sole value is the *undefined* value</p>
    </emu-clause>

    <emu-clause id="sec-null-value">
      <h1>null value</h1>
      <p>primitive value that represents the intentional absence of any object value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-null-type">
      <h1>Null type</h1>
      <p>type whose sole value is the *null* value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-boolean-value">
      <h1>Boolean value</h1>
      <p>member of the Boolean type</p>
      <emu-note>
        <p>There are only two Boolean values, *true* and *false*.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-boolean-type">
      <h1>Boolean type</h1>
      <p>type consisting of the primitive values *true* and *false*</p>
    </emu-clause>

    <emu-clause id="sec-boolean-object">
      <h1>Boolean object</h1>
      <p>member of the Object type that is an instance of the standard built-in Boolean constructor</p>
      <emu-note>
        <p>A Boolean object is created by using the Boolean constructor in a `new` expression, supplying a Boolean value as an argument. The resulting object has an internal slot whose value is the Boolean value. A Boolean object can be coerced to a Boolean value.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-string-value">
      <h1>String value</h1>
      <p>primitive value that is a finite ordered sequence of zero or more 16-bit unsigned integer values</p>
      <emu-note>
        <p>A String value is a member of the String type. Each integer value in the sequence usually represents a single 16-bit unit of UTF-16 text. However, ECMAScript does not place any restrictions or requirements on the values except that they must be 16-bit unsigned integers.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-string-type">
      <h1>String type</h1>
      <p>set of all possible String values</p>
    </emu-clause>

    <emu-clause id="sec-string-object">
      <h1>String object</h1>
      <p>member of the Object type that is an instance of the standard built-in String constructor</p>
      <emu-note>
        <p>A String object is created by using the String constructor in a `new` expression, supplying a String value as an argument. The resulting object has an internal slot whose value is the String value. A String object can be coerced to a String value by calling the String constructor as a function (<emu-xref href="#sec-string-constructor-string-value"></emu-xref>).</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-number-value">
      <h1>Number value</h1>
      <p>primitive value corresponding to a double-precision 64-bit binary format IEEE 754-2019 value</p>
      <emu-note>
        <p>A Number value is a member of the Number type and is a direct representation of a number.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-number-type">
      <h1>Number type</h1>
      <p>set of all possible Number values including the special “Not-a-Number” (NaN) value, positive infinity, and negative infinity</p>
    </emu-clause>

    <emu-clause id="sec-number-object">
      <h1>Number object</h1>
      <p>member of the Object type that is an instance of the standard built-in Number constructor</p>
      <emu-note>
        <p>A Number object is created by using the Number constructor in a `new` expression, supplying a Number value as an argument. The resulting object has an internal slot whose value is the Number value. A Number object can be coerced to a Number value by calling the Number constructor as a function (<emu-xref href="#sec-number-constructor-number-value"></emu-xref>).</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-infinity">
      <h1>Infinity</h1>
      <p>Number value that is the positive infinite Number value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-nan">
      <h1>NaN</h1>
      <p>Number value that is an IEEE 754-2019 “Not-a-Number” value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-bigint-value">
      <h1>BigInt value</h1>
      <p>primitive value corresponding to an arbitrary-precision integer value</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-bigint-type">
      <h1>BigInt type</h1>
      <p>set of all possible BigInt values</p>
    </emu-clause>

    <emu-clause id="sec-bigint-object">
      <h1>BigInt object</h1>
      <p>member of the Object type that is an instance of the standard built-in BigInt constructor</p>
    </emu-clause>

    <emu-clause id="sec-symbol-value">
      <h1>Symbol value</h1>
      <p>primitive value that represents a unique, non-String Object property key</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-symbol-type">
      <h1>Symbol type</h1>
      <p>set of all possible Symbol values</p>
    </emu-clause>

    <emu-clause id="sec-symbol-object">
      <h1>Symbol object</h1>
      <p>member of the Object type that is an instance of the standard built-in Symbol constructor</p>
    </emu-clause>

    <emu-clause id="sec-terms-and-definitions-function">
      <h1>function</h1>
      <p>member of the Object type that may be invoked as a subroutine</p>
      <emu-note>
        <p>In addition to its properties, a function contains executable code and state that determine how it behaves when invoked. A function's code may or may not be written in ECMAScript.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-built-in-function">
      <h1>built-in function</h1>
      <p>built-in object that is a function</p>
      <emu-note>
        <p>Examples of built-in functions include `parseInt` and `Math.exp`. A host or implementation may provide additional built-in functions that are not described in this specification.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-built-in-constructor">
      <h1>built-in constructor</h1>
      <p>built-in function that is a constructor</p>
      <emu-note>
        <p>Examples of built-in constructors include `Object` and `Function`. A host or implementation may provide additional built-in constructors that are not described in this specification.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-property">
      <h1>property</h1>
      <p>part of an object that associates a key (either a String value or a Symbol value) and a value</p>
      <emu-note>
        <p>Depending upon the form of the property the value may be represented either directly as a data value (a primitive value, an object, or a function object) or indirectly by a pair of accessor functions.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-method">
      <h1>method</h1>
      <p>function that is the value of a property</p>
      <emu-note>
        <p>When a function is called as a method of an object, the object is passed to the function as its *this* value.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-built-in-method">
      <h1>built-in method</h1>
      <p>method that is a built-in function</p>
      <emu-note>
        <p>Standard built-in methods are defined in this specification. A host or implementation may provide additional built-in methods that are not described in this specification.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-attribute">
      <h1>attribute</h1>
      <p>internal value that defines some characteristic of a property</p>
    </emu-clause>

    <emu-clause id="sec-own-property">
      <h1>own property</h1>
      <p>property that is directly contained by its object</p>
    </emu-clause>

    <emu-clause id="sec-inherited-property">
      <h1>inherited property</h1>
      <p>property of an object that is not an own property but is a property (either own or inherited) of the object's prototype</p>
    </emu-clause>

<h2 id="sec-organization-of-this-specification">Organization of This Specification</h2>
## Organization of This Specification
    <p>The remainder of this specification is organized as follows:</p>
    <p>Clause <emu-xref href="#sec-notational-conventions"></emu-xref> defines the notational conventions used throughout the specification.</p>
    <p>Clauses <emu-xref href="#sec-ecmascript-data-types-and-values"></emu-xref> through <emu-xref href="#sec-ordinary-and-exotic-objects-behaviours"></emu-xref> define the execution environment within which ECMAScript programs operate.</p>
    <p>Clauses <emu-xref href="#sec-ecmascript-language-source-code"></emu-xref> through <emu-xref href="#sec-error-handling-and-language-extensions"></emu-xref> define the actual ECMAScript programming language including its syntactic encoding and the execution semantics of all language features.</p>
    <p>Clauses <emu-xref href="#sec-ecmascript-standard-built-in-objects"></emu-xref> through <emu-xref href="#sec-reflection"></emu-xref> define the ECMAScript standard library. They include the definitions of all of the standard objects that are available for use by ECMAScript programs as they execute.</p>
    <p>Clause <emu-xref href="#sec-memory-model"></emu-xref> describes the memory consistency model of accesses on SharedArrayBuffer-backed memory and methods of the Atomics object.</p>

<h1 id="sec-notational-conventions"></h1>
