# Introduction

* | November 1996
  * started the development
* | 1997,
  * first edition
  * first adopter: Ecma General Assembly
* ECMAScript
  * := programming languages
    * MOST widely used
    * general-purpose
    * uses
      * browsers
        * FIRST uses
          * Netscape's Navigator 2.0 browser
          * Internet Explorer v3.0.
      * server
      * embedded applications
  * -- based on -- SEVERAL originating technologies
    * JavaScript (Netscape)
    * JScript (Microsoft)
  * invented by Brendan Eich
  * versions
    * TODO:
      <p>That Ecma Standard was submitted to ISO/IEC JTC 1 for adoption under the fast-track procedure, and approved as international standard ISO/IEC 16262, in April 1998.
      The Ecma General Assembly of June 1998 approved the second edition of ECMA-262 to keep it fully aligned with ISO/IEC 16262. Changes between the first and the second edition are editorial in nature.</p>
    * <p>The third edition of the Standard introduced powerful regular expressions, better string handling, new control statements, try/catch exception handling, tighter definition of errors, formatting for numeric output and minor changes in anticipation of future language growth. The third edition of the ECMAScript standard was adopted by the Ecma General Assembly of December 1999 and published as ISO/IEC 16262:2002 in June 2002.</p>
    * <p>After publication of the third edition, ECMAScript achieved massive adoption in conjunction with the World Wide Web where it has become the programming language that is supported by essentially all web browsers. Significant work was done to develop a fourth edition of ECMAScript. However, that work was not completed and not published as the fourth edition of ECMAScript but some of it was incorporated into the development of the sixth edition.</p>
    * <p>The fifth edition of ECMAScript (published as ECMA-262 5<sup>th</sup> edition) codified de facto interpretations of the language specification that have become common among browser implementations and added support for new features that had emerged since the publication of the third edition. Such features include accessor properties, reflective creation and inspection of objects, program control of property attributes, additional array manipulation functions, support for the JSON object encoding format, and a strict mode that provides enhanced error checking and program security. The fifth edition was adopted by the Ecma General Assembly of December 2009.</p>
    * v5
      * submitted -- under the fast-track procedure, to -- ISO/IEC JTC 1
      * ISO/IEC 16262:2011
        * == 's standard international text
      * v5.1
        * minor corrections
        * 's standard text == v5's standard text == ISO/IEC 16262:2011
        * | June 2011,
          * -- adopted by the -- Ecma General Assembly
    * v6
      * | 2009, started
      * goals
        * better support for large applications,
        * library creation,
        * ECMAScript -- as a -- other languages' compilation target
      * enhancements
        * foundation for regular, incremental language and library enhancements
        * major
          * modules,
          * class declarations,
          * lexical block scoping,
          * iterators and generators,
          * promises -- for -- asynchronous programming,
          * destructuring patterns,
          * proper tail calls
          * expand ECMAScript library / additional data abstractions
            * maps,
            * sets,
            * arrays of binary numeric values
            * additional support for Unicode supplementary characters | strings and regular expressions
      * | June 2015,
        * -- adopted by the -- General Assembly
    * ECMAScript 2016
      * 👀FIRST ECMAScript edition released | Ecma TC39's 👀
      * Ecma TC39
        * == development process
          * yearly release cadence
          * open
      * ECMAScript 2015's plain-text source document
        * == base -- for -- further development entirely | GitHub
      * software tools / were developed
        * Ecmarkup,
        * Ecmarkdown,
        * Grammarkdown
      * include
        * new exponentiation operator
        * `Array.prototype.includes()`
    * ECMAScript 2017
      * introduced
        * Async Functions,
          * -- provide -- syntax for promise-returning functions
        * Shared Memory and Atomics
          * == NEW memory model /
            * multi-agent program1 -- can communicate, via atomic operations, with -- multi-agent program2
              * -> well-defined execution order
                * EVEN | parallel CPUs
        * smaller language & library enhancements,
        * bug fixes,
        * editorial updates
        * Object's methods
          * `Object.values`,
          * `Object.entries`,
          * `Object.getOwnPropertyDescriptors`
    * ECMAScript 2018
      * TODO:introduced support for asynchronous iteration via the async iterator protocol and async generators. It also included four new regular expression features: the `dotAll` flag, named capture groups, Unicode property escapes, and look-behind assertions. Lastly it included object rest and spread properties.</p>
    * <p>ECMAScript 2019 introduced a few new built-in functions: `flat` and `flatMap` on `Array.prototype` for flattening arrays, `Object.fromEntries` for directly turning the return value of `Object.entries` into a new Object, and `trimStart` and `trimEnd` on `String.prototype` as better-named alternatives to the widely implemented but non-standard `String.prototype.trimLeft` and `trimRight` built-ins. In addition, it included a few minor updates to syntax and semantics. Updated syntax included optional catch binding parameters and allowing U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) in string literals to align with JSON. Other updates included requiring that `Array.prototype.sort` be a stable sort, requiring that `JSON.stringify` return well-formed UTF-8 regardless of input, and clarifying `Function.prototype.toString` by requiring that it either return the corresponding original source text or a standard placeholder.</p>
        <p>ECMAScript 2020, the 11<sup>th</sup> edition, introduced the `matchAll` method for Strings, to produce an iterator for all match objects generated by a global regular expression; `import()`, a syntax to asynchronously import Modules with a dynamic specifier; `BigInt`, a new number primitive for working with arbitrary precision integers; `Promise.allSettled`, a new Promise combinator that does not short-circuit; `globalThis`, a universal way to access the global `this` value; dedicated `export * as ns from 'module'` syntax for use within modules; increased standardization of `for-in` enumeration order; `import.meta`, a host-populated object available in Modules that may contain contextual information about the Module; as well as adding two new syntax features to improve working with “nullish” values (*undefined* or *null*): nullish coalescing, a value selection operator; and optional chaining, a property access and function invocation operator that short-circuits if the value to access/invoke is nullish.</p>
        <p>ECMAScript 2021, the 12<sup>th</sup> edition, introduced the `replaceAll` method for Strings; `Promise.any`, a Promise combinator that short-circuits when an input value is fulfilled; `AggregateError`, a new Error type to represent multiple errors at once; logical assignment operators (`??=`, `&&=`, `||=`); `WeakRef`, for referring to a target object without preserving it from garbage collection, and `FinalizationRegistry`, to manage registration and unregistration of cleanup operations performed when target objects are garbage collected; separators for numeric literals (`1_000`); and `Array.prototype.sort` was made more precise, reducing the amount of cases that result in an implementation-defined sort order.</p>
        <p>ECMAScript 2022, the 13<sup>th</sup> edition, introduced top-level `await`, allowing the keyword to be used at the top level of modules; new class elements: public and private instance fields, public and private static fields, private instance methods and accessors, and private static methods and accessors; static blocks inside classes, to perform per-class evaluation initialization; the `#x in obj` syntax, to test for presence of private fields on objects; regular expression match indices via the `/d` flag, which provides start and end indices for matched substrings; the `cause` property on `Error` objects, which can be used to record a causation chain in errors; the `at` method for Strings, Arrays, and TypedArrays, which allows relative indexing; and `Object.hasOwn`, a convenient alternative to `Object.prototype.hasOwnProperty`.</p>
        <p>ECMAScript 2023, the 14<sup>th</sup> edition, introduced the `toSorted`, `toReversed`, `with`, `findLast`, and `findLastIndex` methods on `Array.prototype` and `TypedArray.prototype`, as well as the `toSpliced` method on `Array.prototype`; added support for `#!` comments at the beginning of files to better facilitate executable ECMAScript files; and allowed the use of most Symbols as keys in weak collections.</p>
        <p>ECMAScript 2024, the 15<sup>th</sup> edition, added facilities for resizing and transferring ArrayBuffers and SharedArrayBuffers; added a new RegExp `/v` flag for creating RegExps with more advanced features for working with sets of strings; and introduced the `Promise.withResolvers` convenience method for constructing Promises, the `Object.groupBy` and `Map.groupBy` methods for aggregating data, the `Atomics.waitAsync` method for asynchronously waiting for a change to shared memory, and the `String.prototype.isWellFormed` and `String.prototype.toWellFormed` methods for checking and ensuring that strings contain only well-formed Unicode.</p>
        <p>Dozens of individuals representing many organizations have made very significant contributions within Ecma TC39 to the development of this edition and to the prior editions. In addition, a vibrant community has emerged supporting TC39's ECMAScript efforts. This community has reviewed numerous drafts, filed thousands of bug reports, performed implementation experiments, contributed test suites, and educated the world-wide developer community about ECMAScript. Unfortunately, it is impossible to identify and acknowledge every person and organization who has contributed to this effort.</p>
        <p>
          Allen Wirfs-Brock<br>
          ECMA-262, Project Editor, 6<sup>th</sup> Edition
        </p>
        <p>
          Brian Terlson<br>
          ECMA-262, Project Editor, 7<sup>th</sup> through 10<sup>th</sup> Editions
        </p>
        <p>
          Jordan Harband<br>
          ECMA-262, Project Editor, 10<sup>th</sup> through 12<sup>th</sup> Editions
        </p>
        <p>
          Shu-yu Guo<br>
          ECMA-262, Project Editor, 12<sup>th</sup> through 15<sup>th</sup> Editions
        </p>
        <p>
          Michael Ficarra<br>
          ECMA-262, Project Editor, 12<sup>th</sup> through 15<sup>th</sup> Editions
        </p>
        <p>
          Kevin Gibbons<br>
          ECMA-262, Project Editor, 12<sup>th</sup> through 15<sup>th</sup> Editions
        </p>

<h1 id="sec-scope"></h1>
