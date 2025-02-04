# Structured Data

  <emu-clause id="sec-arraybuffer-objects">
    <h1>ArrayBuffer Objects</h1>

    <emu-clause id="sec-arraybuffer-notation">
      <h1>Notation</h1>
      <p>The descriptions below in this section, <emu-xref href="#sec-atomics-object"></emu-xref>, and <emu-xref href="#sec-memory-model"></emu-xref> use the read-modify-write modification function internal data structure.</p>
      <p>A <dfn variants="read-modify-write modification functions">read-modify-write modification function</dfn> is a mathematical function that is represented as an abstract closure that takes two Lists of byte values as arguments and returns a List of byte values. These abstract closures satisfy all of the following properties:</p>
      <ul>
        <li>They perform all their algorithm steps atomically.</li>
        <li>Their individual algorithm steps are not observable.</li>
      </ul>
      <emu-note>
        <p>To aid verifying that a read-modify-write modification function's algorithm steps constitute a pure, mathematical function, the following editorial conventions are recommended:</p>
        <ul>
          <li>They do not access, directly or transitively via invoked abstract operations and abstract closures, any language or specification values except their parameters and captured values.</li>
          <li>They do not invoke, directly or transitively, abstract operations and abstract closures that return Completion Records.</li>
          <li>They do not return Completion Records.</li>
        </ul>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-fixed-length-and-resizable-arraybuffer-objects">
      <h1>Fixed-length and Resizable ArrayBuffer Objects</h1>
      <p>A <dfn>fixed-length ArrayBuffer</dfn> is an ArrayBuffer whose byte length cannot change after creation.</p>
      <p>A <dfn>resizable ArrayBuffer</dfn> is an ArrayBuffer whose byte length may change after creation via calls to <emu-xref href="#sec-arraybuffer.prototype.resize" title></emu-xref>.</p>
      <p>The kind of ArrayBuffer object that is created depends on the arguments passed to <emu-xref href="#sec-arraybuffer-length" title></emu-xref>.</p>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-arraybuffer-objects">
      <h1>Abstract Operations For ArrayBuffer Objects</h1>

      <emu-clause id="sec-allocatearraybuffer" type="abstract operation">
        <h1>
          AllocateArrayBuffer (
            _constructor_: a constructor,
            _byteLength_: a non-negative integer,
            optional _maxByteLength_: a non-negative integer or ~empty~,
          ): either a normal completion containing an ArrayBuffer or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create an ArrayBuffer.</dd>
        </dl>
        <emu-alg>
          1. Let _slots_ be « [[ArrayBufferData]], [[ArrayBufferByteLength]], [[ArrayBufferDetachKey]] ».
          1. If _maxByteLength_ is present and _maxByteLength_ is not ~empty~, let _allocatingResizableBuffer_ be *true*; otherwise let _allocatingResizableBuffer_ be *false*.
          1. If _allocatingResizableBuffer_ is *true*, then
            1. If _byteLength_ > _maxByteLength_, throw a *RangeError* exception.
            1. Append [[ArrayBufferMaxByteLength]] to _slots_.
          1. Let _obj_ be ? OrdinaryCreateFromConstructor(_constructor_, *"%ArrayBuffer.prototype%"*, _slots_).
          1. Let _block_ be ? CreateByteDataBlock(_byteLength_).
          1. Set _obj_.[[ArrayBufferData]] to _block_.
          1. Set _obj_.[[ArrayBufferByteLength]] to _byteLength_.
          1. If _allocatingResizableBuffer_ is *true*, then
            1. If it is not possible to create a Data Block _block_ consisting of _maxByteLength_ bytes, throw a *RangeError* exception.
            1. NOTE: Resizable ArrayBuffers are designed to be implementable with in-place growth. Implementations may throw if, for example, virtual memory cannot be reserved up front.
            1. Set _obj_.[[ArrayBufferMaxByteLength]] to _maxByteLength_.
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybufferbytelength" type="abstract operation">
        <h1>
          ArrayBufferByteLength (
            _arrayBuffer_: an ArrayBuffer or SharedArrayBuffer,
            _order_: ~seq-cst~ or ~unordered~,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If IsSharedArrayBuffer(_arrayBuffer_) is *true* and _arrayBuffer_ has an [[ArrayBufferByteLengthData]] internal slot, then
            1. Let _bufferByteLengthBlock_ be _arrayBuffer_.[[ArrayBufferByteLengthData]].
            1. Let _rawLength_ be GetRawBytesFromSharedBlock(_bufferByteLengthBlock_, 0, ~biguint64~, *true*, _order_).
            1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
            1. Return ℝ(RawBytesToNumeric(~biguint64~, _rawLength_, _isLittleEndian_)).
          1. Assert: IsDetachedBuffer(_arrayBuffer_) is *false*.
          1. Return _arrayBuffer_.[[ArrayBufferByteLength]].
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffercopyanddetach" type="abstract operation">
        <h1>
          ArrayBufferCopyAndDetach (
            _arrayBuffer_: an ECMAScript language value,
            _newLength_: an ECMAScript language value,
            _preserveResizability_: ~preserve-resizability~ or ~fixed-length~,
          ): either a normal completion containing an ArrayBuffer or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_arrayBuffer_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_arrayBuffer_) is *true*, throw a *TypeError* exception.
          1. If _newLength_ is *undefined*, then
            1. Let _newByteLength_ be _arrayBuffer_.[[ArrayBufferByteLength]].
          1. Else,
            1. Let _newByteLength_ be ? ToIndex(_newLength_).
          1. If IsDetachedBuffer(_arrayBuffer_) is *true*, throw a *TypeError* exception.
          1. If _preserveResizability_ is ~preserve-resizability~ and IsFixedLengthArrayBuffer(_arrayBuffer_) is *false*, then
            1. Let _newMaxByteLength_ be _arrayBuffer_.[[ArrayBufferMaxByteLength]].
          1. Else,
            1. Let _newMaxByteLength_ be ~empty~.
          1. If _arrayBuffer_.[[ArrayBufferDetachKey]] is not *undefined*, throw a *TypeError* exception.
          1. Let _newBuffer_ be ? <emu-meta suppress-effects="user-code">AllocateArrayBuffer(%ArrayBuffer%, _newByteLength_, _newMaxByteLength_)</emu-meta>.
          1. Let _copyLength_ be min(_newByteLength_, _arrayBuffer_.[[ArrayBufferByteLength]]).
          1. Let _fromBlock_ be _arrayBuffer_.[[ArrayBufferData]].
          1. Let _toBlock_ be _newBuffer_.[[ArrayBufferData]].
          1. Perform CopyDataBlockBytes(_toBlock_, 0, _fromBlock_, 0, _copyLength_).
          1. NOTE: Neither creation of the new Data Block nor copying from the old Data Block are observable. Implementations may implement this method as a zero-copy move or a `realloc`.
          1. Perform ! DetachArrayBuffer(_arrayBuffer_).
          1. Return _newBuffer_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isdetachedbuffer" type="abstract operation">
        <h1>
          IsDetachedBuffer (
            _arrayBuffer_: an ArrayBuffer or a SharedArrayBuffer,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _arrayBuffer_.[[ArrayBufferData]] is *null*, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-detacharraybuffer" type="abstract operation">
        <h1>
          DetachArrayBuffer (
            _arrayBuffer_: an ArrayBuffer,
            optional _key_: anything,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
          <dt>skip global checks</dt>
          <dd>true</dd>
        </dl>
        <emu-alg>
          1. Assert: IsSharedArrayBuffer(_arrayBuffer_) is *false*.
          1. If _key_ is not present, set _key_ to *undefined*.
          1. If _arrayBuffer_.[[ArrayBufferDetachKey]] is not _key_, throw a *TypeError* exception.
          1. Set _arrayBuffer_.[[ArrayBufferData]] to *null*.
          1. Set _arrayBuffer_.[[ArrayBufferByteLength]] to 0.
          1. Return ~unused~.
        </emu-alg>
        <emu-note>
          <p>Detaching an ArrayBuffer instance disassociates the Data Block used as its backing store from the instance and sets the byte length of the buffer to 0.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-clonearraybuffer" type="abstract operation">
        <h1>
          CloneArrayBuffer (
            _srcBuffer_: an ArrayBuffer or a SharedArrayBuffer,
            _srcByteOffset_: a non-negative integer,
            _srcLength_: a non-negative integer,
          ): either a normal completion containing an ArrayBuffer or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It creates a new ArrayBuffer whose data is a copy of _srcBuffer_'s data over the range starting at _srcByteOffset_ and continuing for _srcLength_ bytes.</dd>
        </dl>
        <emu-alg>
          1. Assert: IsDetachedBuffer(_srcBuffer_) is *false*.
          1. Let _targetBuffer_ be ? <emu-meta suppress-effects="user-code">AllocateArrayBuffer(%ArrayBuffer%, _srcLength_)</emu-meta>.
          1. Let _srcBlock_ be _srcBuffer_.[[ArrayBufferData]].
          1. Let _targetBlock_ be _targetBuffer_.[[ArrayBufferData]].
          1. Perform CopyDataBlockBytes(_targetBlock_, 0, _srcBlock_, _srcByteOffset_, _srcLength_).
          1. Return _targetBuffer_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getarraybuffermaxbytelengthoption" type="abstract operation">
        <h1>
          GetArrayBufferMaxByteLengthOption (
            _options_: an ECMAScript language value,
          ): either a normal completion containing either a non-negative integer or ~empty~, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _options_ is not an Object, return ~empty~.
          1. Let _maxByteLength_ be ? Get(_options_, *"maxByteLength"*).
          1. If _maxByteLength_ is *undefined*, return ~empty~.
          1. Return ? ToIndex(_maxByteLength_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-hostresizearraybuffer" type="host-defined abstract operation">
        <h1>
          HostResizeArrayBuffer (
            _buffer_: an ArrayBuffer,
            _newByteLength_: a non-negative integer,
          ): either a normal completion containing either ~handled~ or ~unhandled~, or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It gives the host an opportunity to perform implementation-defined resizing of _buffer_. If the host chooses not to handle resizing of _buffer_, it may return ~unhandled~ for the default behaviour.</dd>
        </dl>

        <p>The implementation of HostResizeArrayBuffer must conform to the following requirements:</p>
        <ul>
          <li>The abstract operation does not detach _buffer_.</li>
          <li>If the abstract operation completes normally with ~handled~, _buffer_.[[ArrayBufferByteLength]] is _newByteLength_.</li>
        </ul>

        <p>The default implementation of HostResizeArrayBuffer is to return NormalCompletion(~unhandled~).</p>
      </emu-clause>

      <emu-clause id="sec-isfixedlengtharraybuffer" type="abstract operation">
        <h1>
          IsFixedLengthArrayBuffer (
            _arrayBuffer_: an ArrayBuffer or a SharedArrayBuffer,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _arrayBuffer_ has an [[ArrayBufferMaxByteLength]] internal slot, return *false*.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isunsignedelementtype" type="abstract operation">
        <h1>
          IsUnsignedElementType (
            _type_: a TypedArray element type,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It verifies if the argument _type_ is an unsigned TypedArray element type.</dd>
        </dl>
        <emu-alg>
          1. If _type_ is one of ~uint8~, ~uint8clamped~, ~uint16~, ~uint32~, or ~biguint64~, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isunclampedintegerelementtype" type="abstract operation">
        <h1>
          IsUnclampedIntegerElementType (
            _type_: a TypedArray element type,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It verifies if the argument _type_ is an Integer TypedArray element type not including ~uint8clamped~.</dd>
        </dl>
        <emu-alg>
          1. If _type_ is one of ~int8~, ~uint8~, ~int16~, ~uint16~, ~int32~, or ~uint32~, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isbigintelementtype" type="abstract operation">
        <h1>
          IsBigIntElementType (
            _type_: a TypedArray element type,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It verifies if the argument _type_ is a BigInt TypedArray element type.</dd>
        </dl>
        <emu-alg>
          1. If _type_ is either ~biguint64~ or ~bigint64~, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isnotearconfiguration" type="abstract operation">
        <h1>
          IsNoTearConfiguration (
            _type_: a TypedArray element type,
            _order_: ~seq-cst~, ~unordered~, or ~init~,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If IsUnclampedIntegerElementType(_type_) is *true*, return *true*.
          1. If IsBigIntElementType(_type_) is *true* and _order_ is neither ~init~ nor ~unordered~, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-rawbytestonumeric" type="abstract operation" oldids="sec-rawbytestonumber">
        <h1>
          RawBytesToNumeric (
            _type_: a TypedArray element type,
            _rawBytes_: a List of byte values,
            _isLittleEndian_: a Boolean,
          ): a Number or a BigInt
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. If _isLittleEndian_ is *false*, reverse the order of the elements of _rawBytes_.
          1. If _type_ is ~float32~, then
            1. Let _value_ be the byte elements of _rawBytes_ concatenated and interpreted as a little-endian bit string encoding of an IEEE 754-2019 binary32 value.
            1. If _value_ is an IEEE 754-2019 binary32 NaN value, return the *NaN* Number value.
            1. Return the Number value that corresponds to _value_.
          1. If _type_ is ~float64~, then
            1. Let _value_ be the byte elements of _rawBytes_ concatenated and interpreted as a little-endian bit string encoding of an IEEE 754-2019 binary64 value.
            1. If _value_ is an IEEE 754-2019 binary64 NaN value, return the *NaN* Number value.
            1. Return the Number value that corresponds to _value_.
          1. If IsUnsignedElementType(_type_) is *true*, then
            1. Let _intValue_ be the byte elements of _rawBytes_ concatenated and interpreted as a bit string encoding of an unsigned little-endian binary number.
          1. Else,
            1. Let _intValue_ be the byte elements of _rawBytes_ concatenated and interpreted as a bit string encoding of a binary little-endian two's complement number of bit length _elementSize_ × 8.
          1. If IsBigIntElementType(_type_) is *true*, return the BigInt value that corresponds to _intValue_.
          1. Otherwise, return the Number value that corresponds to _intValue_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getrawbytesfromsharedblock" type="abstract operation">
        <h1>
          GetRawBytesFromSharedBlock (
            _block_: a Shared Data Block,
            _byteIndex_: a non-negative integer,
            _type_: a TypedArray element type,
            _isTypedArray_: a Boolean,
            _order_: ~seq-cst~ or ~unordered~,
          ): a List of byte values
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
          1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
          1. If _isTypedArray_ is *true* and IsNoTearConfiguration(_type_, _order_) is *true*, let _noTear_ be *true*; otherwise let _noTear_ be *false*.
          1. Let _rawValue_ be a List of length _elementSize_ whose elements are nondeterministically chosen byte values.
          1. NOTE: In implementations, _rawValue_ is the result of a non-atomic or atomic read instruction on the underlying hardware. The nondeterminism is a semantic prescription of the memory model to describe observable behaviour of hardware with weak consistency.
          1. Let _readEvent_ be ReadSharedMemory { [[Order]]: _order_, [[NoTear]]: _noTear_, [[Block]]: _block_, [[ByteIndex]]: _byteIndex_, [[ElementSize]]: _elementSize_ }.
          1. Append _readEvent_ to _eventsRecord_.[[EventList]].
          1. Append Chosen Value Record { [[Event]]: _readEvent_, [[ChosenValue]]: _rawValue_ } to _execution_.[[ChosenValues]].
          1. Return _rawValue_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getvaluefrombuffer" type="abstract operation">
        <h1>
          GetValueFromBuffer (
            _arrayBuffer_: an ArrayBuffer or SharedArrayBuffer,
            _byteIndex_: a non-negative integer,
            _type_: a TypedArray element type,
            _isTypedArray_: a Boolean,
            _order_: ~seq-cst~ or ~unordered~,
            optional _isLittleEndian_: a Boolean,
          ): a Number or a BigInt
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsDetachedBuffer(_arrayBuffer_) is *false*.
          1. Assert: There are sufficient bytes in _arrayBuffer_ starting at _byteIndex_ to represent a value of _type_.
          1. Let _block_ be _arrayBuffer_.[[ArrayBufferData]].
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. If IsSharedArrayBuffer(_arrayBuffer_) is *true*, then
            1. Assert: _block_ is a Shared Data Block.
            1. Let _rawValue_ be GetRawBytesFromSharedBlock(_block_, _byteIndex_, _type_, _isTypedArray_, _order_).
          1. Else,
            1. Let _rawValue_ be a List whose elements are bytes from _block_ at indices in the interval from _byteIndex_ (inclusive) to _byteIndex_ + _elementSize_ (exclusive).
          1. Assert: The number of elements in _rawValue_ is _elementSize_.
          1. If _isLittleEndian_ is not present, set _isLittleEndian_ to the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Return RawBytesToNumeric(_type_, _rawValue_, _isLittleEndian_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-numerictorawbytes" type="abstract operation" oldids="sec-numbertorawbytes">
        <h1>
          NumericToRawBytes (
            _type_: a TypedArray element type,
            _value_: a Number or a BigInt,
            _isLittleEndian_: a Boolean,
          ): a List of byte values
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _type_ is ~float32~, then
            1. Let _rawBytes_ be a List whose elements are the 4 bytes that are the result of converting _value_ to IEEE 754-2019 binary32 format using roundTiesToEven mode. The bytes are arranged in little endian order. If _value_ is *NaN*, _rawBytes_ may be set to any implementation chosen IEEE 754-2019 binary32 format Not-a-Number encoding. An implementation must always choose the same encoding for each implementation distinguishable *NaN* value.
          1. Else if _type_ is ~float64~, then
            1. Let _rawBytes_ be a List whose elements are the 8 bytes that are the IEEE 754-2019 binary64 format encoding of _value_. The bytes are arranged in little endian order. If _value_ is *NaN*, _rawBytes_ may be set to any implementation chosen IEEE 754-2019 binary64 format Not-a-Number encoding. An implementation must always choose the same encoding for each implementation distinguishable *NaN* value.
          1. Else,
            1. Let _n_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
            1. Let _conversionOperation_ be the abstract operation named in the Conversion Operation column in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
            1. Let _intValue_ be ℝ(_conversionOperation_(_value_)).
            1. If _intValue_ ≥ 0, then
              1. Let _rawBytes_ be a List whose elements are the _n_-byte binary encoding of _intValue_. The bytes are ordered in little endian order.
            1. Else,
              1. Let _rawBytes_ be a List whose elements are the _n_-byte binary two's complement encoding of _intValue_. The bytes are ordered in little endian order.
          1. If _isLittleEndian_ is *false*, reverse the order of the elements of _rawBytes_.
          1. Return _rawBytes_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-setvalueinbuffer" type="abstract operation">
        <h1>
          SetValueInBuffer (
            _arrayBuffer_: an ArrayBuffer or SharedArrayBuffer,
            _byteIndex_: a non-negative integer,
            _type_: a TypedArray element type,
            _value_: a Number or a BigInt,
            _isTypedArray_: a Boolean,
            _order_: ~seq-cst~, ~unordered~, or ~init~,
            optional _isLittleEndian_: a Boolean,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsDetachedBuffer(_arrayBuffer_) is *false*.
          1. Assert: There are sufficient bytes in _arrayBuffer_ starting at _byteIndex_ to represent a value of _type_.
          1. Assert: _value_ is a BigInt if IsBigIntElementType(_type_) is *true*; otherwise, _value_ is a Number.
          1. Let _block_ be _arrayBuffer_.[[ArrayBufferData]].
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. If _isLittleEndian_ is not present, set _isLittleEndian_ to the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Let _rawBytes_ be NumericToRawBytes(_type_, _value_, _isLittleEndian_).
          1. If IsSharedArrayBuffer(_arrayBuffer_) is *true*, then
            1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
            1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
            1. If _isTypedArray_ is *true* and IsNoTearConfiguration(_type_, _order_) is *true*, let _noTear_ be *true*; otherwise let _noTear_ be *false*.
            1. Append WriteSharedMemory { [[Order]]: _order_, [[NoTear]]: _noTear_, [[Block]]: _block_, [[ByteIndex]]: _byteIndex_, [[ElementSize]]: _elementSize_, [[Payload]]: _rawBytes_ } to _eventsRecord_.[[EventList]].
          1. Else,
            1. Store the individual bytes of _rawBytes_ into _block_, starting at _block_[_byteIndex_].
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getmodifysetvalueinbuffer" type="abstract operation">
        <h1>
          GetModifySetValueInBuffer (
            _arrayBuffer_: an ArrayBuffer or a SharedArrayBuffer,
            _byteIndex_: a non-negative integer,
            _type_: a TypedArray element type,
            _value_: a Number or a BigInt,
            _op_: a read-modify-write modification function,
          ): a Number or a BigInt
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsDetachedBuffer(_arrayBuffer_) is *false*.
          1. Assert: There are sufficient bytes in _arrayBuffer_ starting at _byteIndex_ to represent a value of _type_.
          1. Assert: _value_ is a BigInt if IsBigIntElementType(_type_) is *true*; otherwise, _value_ is a Number.
          1. Let _block_ be _arrayBuffer_.[[ArrayBufferData]].
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Let _rawBytes_ be NumericToRawBytes(_type_, _value_, _isLittleEndian_).
          1. If IsSharedArrayBuffer(_arrayBuffer_) is *true*, then
            1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
            1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
            1. Let _rawBytesRead_ be a List of length _elementSize_ whose elements are nondeterministically chosen byte values.
            1. NOTE: In implementations, _rawBytesRead_ is the result of a load-link, of a load-exclusive, or of an operand of a read-modify-write instruction on the underlying hardware. The nondeterminism is a semantic prescription of the memory model to describe observable behaviour of hardware with weak consistency.
            1. Let _rmwEvent_ be ReadModifyWriteSharedMemory { [[Order]]: ~seq-cst~, [[NoTear]]: *true*, [[Block]]: _block_, [[ByteIndex]]: _byteIndex_, [[ElementSize]]: _elementSize_, [[Payload]]: _rawBytes_, [[ModifyOp]]: _op_ }.
            1. Append _rmwEvent_ to _eventsRecord_.[[EventList]].
            1. Append Chosen Value Record { [[Event]]: _rmwEvent_, [[ChosenValue]]: _rawBytesRead_ } to _execution_.[[ChosenValues]].
          1. Else,
            1. Let _rawBytesRead_ be a List of length _elementSize_ whose elements are the sequence of _elementSize_ bytes starting with _block_[_byteIndex_].
            1. Let _rawBytesModified_ be _op_(_rawBytesRead_, _rawBytes_).
            1. Store the individual bytes of _rawBytesModified_ into _block_, starting at _block_[_byteIndex_].
          1. Return RawBytesToNumeric(_type_, _rawBytesRead_, _isLittleEndian_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-arraybuffer-constructor">
      <h1>The ArrayBuffer Constructor</h1>
      <p>The ArrayBuffer constructor:</p>
      <ul>
        <li>is <dfn>%ArrayBuffer%</dfn>.</li>
        <li>is the initial value of the *"ArrayBuffer"* property of the global object.</li>
        <li>creates and initializes a new ArrayBuffer when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified ArrayBuffer behaviour must include a `super` call to the ArrayBuffer constructor to create and initialize subclass instances with the internal state necessary to support the `ArrayBuffer.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-arraybuffer-length">
        <h1>ArrayBuffer ( _length_ [ , _options_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _byteLength_ be ? ToIndex(_length_).
          1. Let _requestedMaxByteLength_ be ? GetArrayBufferMaxByteLengthOption(_options_).
          1. Return ? AllocateArrayBuffer(NewTarget, _byteLength_, _requestedMaxByteLength_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-arraybuffer-constructor">
      <h1>Properties of the ArrayBuffer Constructor</h1>
      <p>The ArrayBuffer constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-arraybuffer.isview">
        <h1>ArrayBuffer.isView ( _arg_ )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If _arg_ is not an Object, return *false*.
          1. If _arg_ has a [[ViewedArrayBuffer]] internal slot, return *true*.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype">
        <h1>ArrayBuffer.prototype</h1>
        <p>The initial value of `ArrayBuffer.prototype` is the ArrayBuffer prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-get-arraybuffer-@@species" id="sec-get-arraybuffer-%symbol.species%">
        <h1>get ArrayBuffer [ %Symbol.species% ]</h1>
        <p>`ArrayBuffer[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
        <emu-note>
          <p><emu-xref href="#sec-arraybuffer.prototype.slice" title></emu-xref> normally uses its *this* value's constructor to create a derived object. However, a subclass constructor may over-ride that default behaviour for the <emu-xref href="#sec-arraybuffer.prototype.slice" title></emu-xref> method by redefining its %Symbol.species% property.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-arraybuffer-prototype-object">
      <h1>Properties of the ArrayBuffer Prototype Object</h1>
      <p>The <dfn>ArrayBuffer prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%ArrayBuffer.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have an [[ArrayBufferData]] or [[ArrayBufferByteLength]] internal slot.</li>
      </ul>

      <emu-clause id="sec-get-arraybuffer.prototype.bytelength">
        <h1>get ArrayBuffer.prototype.byteLength</h1>
        <p>`ArrayBuffer.prototype.byteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. If IsDetachedBuffer(_O_) is *true*, return *+0*<sub>𝔽</sub>.
          1. Let _length_ be _O_.[[ArrayBufferByteLength]].
          1. Return 𝔽(_length_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype.constructor">
        <h1>ArrayBuffer.prototype.constructor</h1>
        <p>The initial value of `ArrayBuffer.prototype.constructor` is %ArrayBuffer%.</p>
      </emu-clause>

      <emu-clause id="sec-get-arraybuffer.prototype.detached">
        <h1>get ArrayBuffer.prototype.detached</h1>
        <p>`ArrayBuffer.prototype.detached` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. Return IsDetachedBuffer(_O_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-arraybuffer.prototype.maxbytelength">
        <h1>get ArrayBuffer.prototype.maxByteLength</h1>
        <p>`ArrayBuffer.prototype.maxByteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. If IsDetachedBuffer(_O_) is *true*, return *+0*<sub>𝔽</sub>.
          1. If IsFixedLengthArrayBuffer(_O_) is *true*, then
            1. Let _length_ be _O_.[[ArrayBufferByteLength]].
          1. Else,
            1. Let _length_ be _O_.[[ArrayBufferMaxByteLength]].
          1. Return 𝔽(_length_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-arraybuffer.prototype.resizable">
        <h1>get ArrayBuffer.prototype.resizable</h1>
        <p>`ArrayBuffer.prototype.resizable` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. If IsFixedLengthArrayBuffer(_O_) is *false*, return *true*; otherwise return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype.resize">
        <h1>ArrayBuffer.prototype.resize ( _newLength_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferMaxByteLength]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. Let _newByteLength_ be ? ToIndex(_newLength_).
          1. If IsDetachedBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. If _newByteLength_ > _O_.[[ArrayBufferMaxByteLength]], throw a *RangeError* exception.
          1. Let _hostHandled_ be ? HostResizeArrayBuffer(_O_, _newByteLength_).
          1. If _hostHandled_ is ~handled~, return *undefined*.
          1. Let _oldBlock_ be _O_.[[ArrayBufferData]].
          1. Let _newBlock_ be ? CreateByteDataBlock(_newByteLength_).
          1. Let _copyLength_ be min(_newByteLength_, _O_.[[ArrayBufferByteLength]]).
          1. Perform CopyDataBlockBytes(_newBlock_, 0, _oldBlock_, 0, _copyLength_).
          1. NOTE: Neither creation of the new Data Block nor copying from the old Data Block are observable. Implementations may implement this method as in-place growth or shrinkage.
          1. Set _O_.[[ArrayBufferData]] to _newBlock_.
          1. Set _O_.[[ArrayBufferByteLength]] to _newByteLength_.
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype.slice">
        <h1>ArrayBuffer.prototype.slice ( _start_, _end_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. If IsDetachedBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. Let _len_ be _O_.[[ArrayBufferByteLength]].
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _first_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _first_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _first_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _final_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _final_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _final_ be min(_relativeEnd_, _len_).
          1. Let _newLen_ be max(_final_ - _first_, 0).
          1. Let _ctor_ be ? SpeciesConstructor(_O_, %ArrayBuffer%).
          1. Let _new_ be ? Construct(_ctor_, « 𝔽(_newLen_) »).
          1. Perform ? RequireInternalSlot(_new_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_new_) is *true*, throw a *TypeError* exception.
          1. If IsDetachedBuffer(_new_) is *true*, throw a *TypeError* exception.
          1. If SameValue(_new_, _O_) is *true*, throw a *TypeError* exception.
          1. If _new_.[[ArrayBufferByteLength]] &lt; _newLen_, throw a *TypeError* exception.
          1. NOTE: Side-effects of the above steps may have detached or resized _O_.
          1. If IsDetachedBuffer(_O_) is *true*, throw a *TypeError* exception.
          1. Let _fromBuf_ be _O_.[[ArrayBufferData]].
          1. Let _toBuf_ be _new_.[[ArrayBufferData]].
          1. Let _currentLen_ be _O_.[[ArrayBufferByteLength]].
          1. If _first_ &lt; _currentLen_, then
            1. Let _count_ be min(_newLen_, _currentLen_ - _first_).
            1. Perform CopyDataBlockBytes(_toBuf_, 0, _fromBuf_, _first_, _count_).
          1. Return _new_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype.transfer">
        <h1>ArrayBuffer.prototype.transfer ( [ _newLength_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Return ? ArrayBufferCopyAndDetach(_O_, _newLength_, ~preserve-resizability~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-arraybuffer.prototype.transfertofixedlength">
        <h1>ArrayBuffer.prototype.transferToFixedLength ( [ _newLength_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Return ? ArrayBufferCopyAndDetach(_O_, _newLength_, ~fixed-length~).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-arraybuffer.prototype-@@tostringtag" id="sec-arraybuffer.prototype-%symbol.tostringtag%">
        <h1>ArrayBuffer.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"ArrayBuffer"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-arraybuffer-instances">
      <h1>Properties of ArrayBuffer Instances</h1>
      <p>ArrayBuffer instances inherit properties from the ArrayBuffer prototype object. ArrayBuffer instances each have an [[ArrayBufferData]] internal slot, an [[ArrayBufferByteLength]] internal slot, and an [[ArrayBufferDetachKey]] internal slot. ArrayBuffer instances which are resizable each have an [[ArrayBufferMaxByteLength]] internal slot.</p>
      <p>ArrayBuffer instances whose [[ArrayBufferData]] is *null* are considered to be detached and all operators to access or modify data contained in the ArrayBuffer instance will fail.</p>
      <p>ArrayBuffer instances whose [[ArrayBufferDetachKey]] is set to a value other than *undefined* need to have all DetachArrayBuffer calls passing that same "detach key" as an argument, otherwise a TypeError will result. This internal slot is only ever set by certain embedding environments, not by algorithms in this specification.</p>
    </emu-clause>

    <emu-clause id="sec-resizable-arraybuffer-guidelines">
      <h1>Resizable ArrayBuffer Guidelines</h1>
      <emu-note>
        <p>The following are guidelines for ECMAScript programmers working with resizable ArrayBuffer.</p>
        <p>We recommend that programs be tested in their deployment environments where possible. The amount of available physical memory differs greatly between hardware devices. Similarly, virtual memory subsystems also differ greatly between hardware devices as well as operating systems. An application that runs without out-of-memory errors on a 64-bit desktop web browser could run out of memory on a 32-bit mobile web browser.</p>
        <p>When choosing a value for the *"maxByteLength"* option for resizable ArrayBuffer, we recommend that the smallest possible size for the application be chosen. We recommend that *"maxByteLength"* does not exceed 1,073,741,824 (2<sup>30</sup> bytes or 1GiB).</p>
        <p>Please note that successfully constructing a resizable ArrayBuffer for a particular maximum size does not guarantee that future resizes will succeed.</p>
      </emu-note>

      <emu-note>
        <p>The following are guidelines for ECMAScript implementers implementing resizable ArrayBuffer.</p>
        <p>Resizable ArrayBuffer can be implemented as copying upon resize, as in-place growth via reserving virtual memory up front, or as a combination of both for different values of the constructor's *"maxByteLength"* option.</p>
        <p>If a host is multi-tenanted (i.e. it runs many ECMAScript applications simultaneously), such as a web browser, and its implementations choose to implement in-place growth by reserving virtual memory, we recommend that both 32-bit and 64-bit implementations throw for values of *"maxByteLength"* ≥ 1GiB to 1.5GiB. This is to reduce the likelihood a single application can exhaust the virtual memory address space and to reduce interoperability risk.</p>
        <p>If a host does not have virtual memory, such as those running on embedded devices without an MMU, or if a host only implements resizing by copying, it may accept any <emu-not-ref>Number value for</emu-not-ref> the *"maxByteLength"* option. However, we recommend a *RangeError* be thrown if a memory block of the requested size can never be allocated. For example, if the requested size is greater than the maximum amount of usable memory on the device.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-sharedarraybuffer-objects">
    <h1>SharedArrayBuffer Objects</h1>

    <emu-clause id="sec-fixed-length-and-growable-sharedarraybuffer-objects">
      <h1>Fixed-length and Growable SharedArrayBuffer Objects</h1>
      <p>A <dfn>fixed-length SharedArrayBuffer</dfn> is a SharedArrayBuffer whose byte length cannot change after creation.</p>
      <p>A <dfn>growable SharedArrayBuffer</dfn> is a SharedArrayBuffer whose byte length may increase after creation via calls to <emu-xref href="#sec-sharedarraybuffer.prototype.grow" title></emu-xref>.</p>
      <p>The kind of SharedArrayBuffer object that is created depends on the arguments passed to <emu-xref href="#sec-sharedarraybuffer-length" title></emu-xref>.</p>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-sharedarraybuffer-objects">
      <h1>Abstract Operations for SharedArrayBuffer Objects</h1>

      <emu-clause id="sec-allocatesharedarraybuffer" type="abstract operation">
        <h1>
          AllocateSharedArrayBuffer (
            _constructor_: a constructor,
            _byteLength_: a non-negative integer,
            optional _maxByteLength_: a non-negative integer or ~empty~,
          ): either a normal completion containing a SharedArrayBuffer or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used to create a SharedArrayBuffer.</dd>
        </dl>
        <emu-alg>
          1. Let _slots_ be « [[ArrayBufferData]] ».
          1. If _maxByteLength_ is present and _maxByteLength_ is not ~empty~, let _allocatingGrowableBuffer_ be *true*; otherwise let _allocatingGrowableBuffer_ be *false*.
          1. If _allocatingGrowableBuffer_ is *true*, then
            1. If _byteLength_ > _maxByteLength_, throw a *RangeError* exception.
            1. Append [[ArrayBufferByteLengthData]] and [[ArrayBufferMaxByteLength]] to _slots_.
          1. Else,
            1. Append [[ArrayBufferByteLength]] to _slots_.
          1. Let _obj_ be ? OrdinaryCreateFromConstructor(_constructor_, *"%SharedArrayBuffer.prototype%"*, _slots_).
          1. If _allocatingGrowableBuffer_ is *true*, let _allocLength_ be _maxByteLength_; otherwise let _allocLength_ be _byteLength_.
          1. Let _block_ be ? CreateSharedByteDataBlock(_allocLength_).
          1. Set _obj_.[[ArrayBufferData]] to _block_.
          1. If _allocatingGrowableBuffer_ is *true*, then
            1. Assert: _byteLength_ ≤ _maxByteLength_.
            1. Let _byteLengthBlock_ be ? CreateSharedByteDataBlock(8).
            1. Perform SetValueInBuffer(_byteLengthBlock_, 0, ~biguint64~, ℤ(_byteLength_), *true*, ~seq-cst~).
            1. Set _obj_.[[ArrayBufferByteLengthData]] to _byteLengthBlock_.
            1. Set _obj_.[[ArrayBufferMaxByteLength]] to _maxByteLength_.
          1. Else,
            1. Set _obj_.[[ArrayBufferByteLength]] to _byteLength_.
          1. Return _obj_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-issharedarraybuffer" type="abstract operation">
        <h1>
          IsSharedArrayBuffer (
            _obj_: an ArrayBuffer or a SharedArrayBuffer,
          ): a Boolean
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It tests whether an object is an ArrayBuffer, a SharedArrayBuffer, or a subtype of either.</dd>
        </dl>
        <emu-alg>
          1. Let _bufferData_ be _obj_.[[ArrayBufferData]].
          1. If _bufferData_ is *null*, return *false*.
          1. If _bufferData_ is a Data Block, return *false*.
          1. Assert: _bufferData_ is a Shared Data Block.
          1. Return *true*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-hostgrowsharedarraybuffer" type="host-defined abstract operation">
        <h1>
          HostGrowSharedArrayBuffer (
            _buffer_: a SharedArrayBuffer,
            _newByteLength_: a non-negative integer,
          ): either a normal completion containing either ~handled~ or ~unhandled~, or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It gives the host an opportunity to perform implementation-defined growing of _buffer_. If the host chooses not to handle growing of _buffer_, it may return ~unhandled~ for the default behaviour.</dd>
        </dl>
        <p>The implementation of HostGrowSharedArrayBuffer must conform to the following requirements:</p>
        <ul>
          <li>If the abstract operation does not complete normally with ~unhandled~, and _newByteLength_ &lt; the current byte length of the _buffer_ or _newByteLength_ > _buffer_.[[ArrayBufferMaxByteLength]], throw a *RangeError* exception.</li>
          <li>Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record. If the abstract operation completes normally with ~handled~, a WriteSharedMemory or ReadModifyWriteSharedMemory event whose [[Order]] is ~seq-cst~, [[Payload]] is NumericToRawBytes(~biguint64~, _newByteLength_, _isLittleEndian_), [[Block]] is _buffer_.[[ArrayBufferByteLengthData]], [[ByteIndex]] is 0, and [[ElementSize]] is 8 is added to the surrounding agent's candidate execution such that racing calls to `SharedArrayBuffer.prototype.grow` are not "lost", i.e. silently do nothing.</li>
        </ul>

        <emu-note>
          <p>The second requirement above is intentionally vague about how or when the current byte length of _buffer_ is read. Because the byte length must be updated via an atomic read-modify-write operation on the underlying hardware, architectures that use load-link/store-conditional or load-exclusive/store-exclusive instruction pairs may wish to keep the paired instructions close in the instruction stream. As such, SharedArrayBuffer.prototype.grow itself does not perform bounds checking on _newByteLength_ before calling HostGrowSharedArrayBuffer, nor is there a requirement on when the current byte length is read.</p>
          <p>This is in contrast with HostResizeArrayBuffer, which is guaranteed that the value of _newByteLength_ is ≥ 0 and ≤ _buffer_.[[ArrayBufferMaxByteLength]].</p>
        </emu-note>

        <p>The default implementation of HostGrowSharedArrayBuffer is to return NormalCompletion(~unhandled~).</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-sharedarraybuffer-constructor">
      <h1>The SharedArrayBuffer Constructor</h1>
      <p>The SharedArrayBuffer constructor:</p>
      <ul>
        <li>is <dfn>%SharedArrayBuffer%</dfn>.</li>
        <li>is the initial value of the *"SharedArrayBuffer"* property of the global object, if that property is present (see below).</li>
        <li>creates and initializes a new SharedArrayBuffer when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified SharedArrayBuffer behaviour must include a `super` call to the SharedArrayBuffer constructor to create and initialize subclass instances with the internal state necessary to support the `SharedArrayBuffer.prototype` built-in methods.</li>
      </ul>

      <p>Whenever a host does not provide concurrent access to SharedArrayBuffers it may omit the *"SharedArrayBuffer"* property of the global object.</p>

      <emu-note>
        <p>Unlike an `ArrayBuffer`, a `SharedArrayBuffer` cannot become detached, and its internal [[ArrayBufferData]] slot is never *null*.</p>
      </emu-note>

      <emu-clause id="sec-sharedarraybuffer-length">
        <h1>SharedArrayBuffer ( _length_ [ , _options_ ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Let _byteLength_ be ? ToIndex(_length_).
          1. Let _requestedMaxByteLength_ be ? GetArrayBufferMaxByteLengthOption(_options_).
          1. Return ? AllocateSharedArrayBuffer(NewTarget, _byteLength_, _requestedMaxByteLength_).
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-sharedarraybuffer-constructor">
      <h1>Properties of the SharedArrayBuffer Constructor</h1>
      <p>The SharedArrayBuffer constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-sharedarraybuffer.prototype">
        <h1>SharedArrayBuffer.prototype</h1>
        <p>The initial value of `SharedArrayBuffer.prototype` is the SharedArrayBuffer prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>

      <emu-clause oldids="sec-sharedarraybuffer-@@species" id="sec-sharedarraybuffer-%symbol.species%">
        <h1>get SharedArrayBuffer [ %Symbol.species% ]</h1>
        <p>`SharedArrayBuffer[%Symbol.species%]` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Return the *this* value.
        </emu-alg>
        <p>The value of the *"name"* property of this function is *"get [Symbol.species]"*.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-sharedarraybuffer-prototype-object">
      <h1>Properties of the SharedArrayBuffer Prototype Object</h1>
      <p>The <dfn>SharedArrayBuffer prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%SharedArrayBuffer.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have an [[ArrayBufferData]] or [[ArrayBufferByteLength]] internal slot.</li>
      </ul>

      <emu-clause id="sec-get-sharedarraybuffer.prototype.bytelength">
        <h1>get SharedArrayBuffer.prototype.byteLength</h1>
        <p>`SharedArrayBuffer.prototype.byteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *false*, throw a *TypeError* exception.
          1. Let _length_ be ArrayBufferByteLength(_O_, ~seq-cst~).
          1. Return 𝔽(_length_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-sharedarraybuffer.prototype.constructor">
        <h1>SharedArrayBuffer.prototype.constructor</h1>
        <p>The initial value of `SharedArrayBuffer.prototype.constructor` is %SharedArrayBuffer%.</p>
      </emu-clause>

      <emu-clause id="sec-sharedarraybuffer.prototype.grow">
        <h1>SharedArrayBuffer.prototype.grow ( _newLength_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferMaxByteLength]]).
          1. If IsSharedArrayBuffer(_O_) is *false*, throw a *TypeError* exception.
          1. Let _newByteLength_ be ? ToIndex(_newLength_).
          1. Let _hostHandled_ be ? HostGrowSharedArrayBuffer(_O_, _newByteLength_).
          1. If _hostHandled_ is ~handled~, return *undefined*.
          1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Let _byteLengthBlock_ be _O_.[[ArrayBufferByteLengthData]].
          1. Let _currentByteLengthRawBytes_ be GetRawBytesFromSharedBlock(_byteLengthBlock_, 0, ~biguint64~, *true*, ~seq-cst~).
          1. Let _newByteLengthRawBytes_ be NumericToRawBytes(~biguint64~, ℤ(_newByteLength_), _isLittleEndian_).
          1. Repeat,
            1. NOTE: This is a compare-and-exchange loop to ensure that parallel, racing grows of the same buffer are totally ordered, are not lost, and do not silently do nothing. The loop exits if it was able to attempt to grow uncontended.
            1. Let _currentByteLength_ be ℝ(RawBytesToNumeric(~biguint64~, _currentByteLengthRawBytes_, _isLittleEndian_)).
            1. If _newByteLength_ = _currentByteLength_, return *undefined*.
            1. If _newByteLength_ &lt; _currentByteLength_ or _newByteLength_ > _O_.[[ArrayBufferMaxByteLength]], throw a *RangeError* exception.
            1. Let _byteLengthDelta_ be _newByteLength_ - _currentByteLength_.
            1. If it is impossible to create a new Shared Data Block value consisting of _byteLengthDelta_ bytes, throw a *RangeError* exception.
            1. NOTE: No new Shared Data Block is constructed and used here. The observable behaviour of growable SharedArrayBuffers is specified by allocating a max-sized Shared Data Block at construction time, and this step captures the requirement that implementations that run out of memory must throw a *RangeError*.
            1. Let _readByteLengthRawBytes_ be AtomicCompareExchangeInSharedBlock(_byteLengthBlock_, 0, 8, _currentByteLengthRawBytes_, _newByteLengthRawBytes_).
            1. If ByteListEqual(_readByteLengthRawBytes_, _currentByteLengthRawBytes_) is *true*, return *undefined*.
            1. Set _currentByteLengthRawBytes_ to _readByteLengthRawBytes_.
        </emu-alg>
        <emu-note>
          <p>Spurious failures of the compare-exchange to update the length are prohibited. If the bounds checking for the new length passes and the implementation is not out of memory, a ReadModifyWriteSharedMemory event (i.e. a successful compare-exchange) is always added into the candidate execution.</p>
          <p>Parallel calls to SharedArrayBuffer.prototype.grow are totally ordered. For example, consider two racing calls: `sab.grow(10)` and `sab.grow(20)`. One of the two calls is guaranteed to win the race. The call to `sab.grow(10)` will never shrink `sab` even if `sab.grow(20)` happened first; in that case it will instead throw a RangeError.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-get-sharedarraybuffer.prototype.growable">
        <h1>get SharedArrayBuffer.prototype.growable</h1>
        <p>`SharedArrayBuffer.prototype.growable` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *false*, throw a *TypeError* exception.
          1. If IsFixedLengthArrayBuffer(_O_) is *false*, return *true*; otherwise return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-sharedarraybuffer.prototype.maxbytelength">
        <h1>get SharedArrayBuffer.prototype.maxByteLength</h1>
        <p>`SharedArrayBuffer.prototype.maxByteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *false*, throw a *TypeError* exception.
          1. If IsFixedLengthArrayBuffer(_O_) is *true*, then
            1. Let _length_ be _O_.[[ArrayBufferByteLength]].
          1. Else,
            1. Let _length_ be _O_.[[ArrayBufferMaxByteLength]].
          1. Return 𝔽(_length_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-sharedarraybuffer.prototype.slice">
        <h1>SharedArrayBuffer.prototype.slice ( _start_, _end_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_O_) is *false*, throw a *TypeError* exception.
          1. Let _len_ be ArrayBufferByteLength(_O_, ~seq-cst~).
          1. Let _relativeStart_ be ? ToIntegerOrInfinity(_start_).
          1. If _relativeStart_ = -∞, let _first_ be 0.
          1. Else if _relativeStart_ &lt; 0, let _first_ be max(_len_ + _relativeStart_, 0).
          1. Else, let _first_ be min(_relativeStart_, _len_).
          1. If _end_ is *undefined*, let _relativeEnd_ be _len_; else let _relativeEnd_ be ? ToIntegerOrInfinity(_end_).
          1. If _relativeEnd_ = -∞, let _final_ be 0.
          1. Else if _relativeEnd_ &lt; 0, let _final_ be max(_len_ + _relativeEnd_, 0).
          1. Else, let _final_ be min(_relativeEnd_, _len_).
          1. Let _newLen_ be max(_final_ - _first_, 0).
          1. Let _ctor_ be ? SpeciesConstructor(_O_, %SharedArrayBuffer%).
          1. Let _new_ be ? Construct(_ctor_, « 𝔽(_newLen_) »).
          1. Perform ? RequireInternalSlot(_new_, [[ArrayBufferData]]).
          1. If IsSharedArrayBuffer(_new_) is *false*, throw a *TypeError* exception.
          1. If _new_.[[ArrayBufferData]] is _O_.[[ArrayBufferData]], throw a *TypeError* exception.
          1. If ArrayBufferByteLength(_new_, ~seq-cst~) &lt; _newLen_, throw a *TypeError* exception.
          1. Let _fromBuf_ be _O_.[[ArrayBufferData]].
          1. Let _toBuf_ be _new_.[[ArrayBufferData]].
          1. Perform CopyDataBlockBytes(_toBuf_, 0, _fromBuf_, _first_, _newLen_).
          1. Return _new_.
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-sharedarraybuffer.prototype.toString,sec-sharedarraybuffer.prototype-@@tostringtag" id="sec-sharedarraybuffer.prototype-%symbol.tostringtag%">
        <h1>SharedArrayBuffer.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"SharedArrayBuffer"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-sharedarraybuffer-instances">
      <h1>Properties of SharedArrayBuffer Instances</h1>
      <p>SharedArrayBuffer instances inherit properties from the SharedArrayBuffer prototype object. SharedArrayBuffer instances each have an [[ArrayBufferData]] internal slot. SharedArrayBuffer instances which are not growable each have an [[ArrayBufferByteLength]] internal slot. SharedArrayBuffer instances which are growable each have an [[ArrayBufferByteLengthData]] internal slot and an [[ArrayBufferMaxByteLength]] internal slot.</p>

      <emu-note>
        <p>SharedArrayBuffer instances, unlike ArrayBuffer instances, are never detached.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-growable-sharedarraybuffer-guidelines">
      <h1>Growable SharedArrayBuffer Guidelines</h1>
      <emu-note>
        <p>The following are guidelines for ECMAScript programmers working with growable SharedArrayBuffer.</p>
        <p>We recommend that programs be tested in their deployment environments where possible. The amount of available physical memory differ greatly between hardware devices. Similarly, virtual memory subsystems also differ greatly between hardware devices as well as operating systems. An application that runs without out-of-memory errors on a 64-bit desktop web browser could run out of memory on a 32-bit mobile web browser.</p>
        <p>When choosing a value for the *"maxByteLength"* option for growable SharedArrayBuffer, we recommend that the smallest possible size for the application be chosen. We recommend that *"maxByteLength"* does not exceed 1073741824, or 1GiB.</p>
        <p>Please note that successfully constructing a growable SharedArrayBuffer for a particular maximum size does not guarantee that future grows will succeed.</p>
        <p>Not all loads of a growable SharedArrayBuffer's length are synchronizing ~seq-cst~ loads. Loads of the length that are for bounds-checking of an integer-indexed property access, e.g. `u8[idx]`, are not synchronizing. In general, in the absence of explicit synchronization, one property access being in-bound does not imply a subsequent property access in the same agent is also in-bound. In contrast, explicit loads of the length via the `length` and `byteLength` getters on SharedArrayBuffer, %TypedArray%.prototype, and DataView.prototype are synchronizing. Loads of the length that are performed by built-in methods to check if a TypedArray is entirely out-of-bounds are also synchronizing.</p>
      </emu-note>

      <emu-note>
        <p>The following are guidelines for ECMAScript implementers implementing growable SharedArrayBuffer.</p>
        <p>We recommend growable SharedArrayBuffer be implemented as in-place growth via reserving virtual memory up front.</p>
        <p>Because grow operations can happen in parallel with memory accesses on a growable SharedArrayBuffer, the constraints of the memory model require that even unordered accesses do not "tear" (bits of their values will not be mixed). In practice, this means the underlying data block of a growable SharedArrayBuffer cannot be grown by being copied without stopping the world. We do not recommend stopping the world as an implementation strategy because it introduces a serialization point and is slow.</p>
        <p>Grown memory must appear zeroed from the moment of its creation, including to any racy accesses in parallel. This can be accomplished via zero-filled-on-demand virtual memory pages, or careful synchronization if manually zeroing memory.</p>
        <p>Integer-indexed property access on TypedArray views of growable SharedArrayBuffers is intended to be optimizable similarly to access on TypedArray views of non-growable SharedArrayBuffers, because integer-indexed property loads on are not synchronizing on the underlying buffer's length (see programmer guidelines above). For example, bounds checks for property accesses may still be hoisted out of loops.</p>
        <p>In practice it is difficult to implement growable SharedArrayBuffer by copying on hosts that do not have virtual memory, such as those running on embedded devices without an MMU. Memory usage behaviour of growable SharedArrayBuffers on such hosts may significantly differ from that of hosts with virtual memory. Such hosts should clearly communicate memory usage expectations to users.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-dataview-objects">
    <h1>DataView Objects</h1>

    <emu-clause id="sec-abstract-operations-for-dataview-objects">
      <h1>Abstract Operations For DataView Objects</h1>

      <emu-clause id="sec-dataview-with-buffer-witness-records">
        <h1>DataView With Buffer Witness Records</h1>
        <p>A <dfn variants="DataView With Buffer Witness Records">DataView With Buffer Witness Record</dfn> is a Record value used to encapsulate a DataView along with a cached byte length of the viewed buffer. It is used to help ensure there is a single shared memory read event of the byte length data block when the viewed buffer is a growable SharedArrayBuffers.</p>
        <p>DataView With Buffer Witness Records have the fields listed in <emu-xref href="#table-dataview-with-buffer-witness-record-fields"></emu-xref>.</p>
        <emu-table id="table-dataview-with-buffer-witness-record-fields" caption="DataView With Buffer Witness Record Fields">
          <table>
            <thead>
              <tr>
                <th>
                  Field Name
                </th>
                <th>
                  Value
                </th>
                <th>
                  Meaning
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                [[Object]]
              </td>
              <td>
                a DataView
              </td>
              <td>
                The DataView object whose buffer's byte length is loaded.
              </td>
            </tr>
            <tr>
              <td>
                [[CachedBufferByteLength]]
              </td>
              <td>
                a non-negative integer or ~detached~
              </td>
              <td>
                The byte length of the object's [[ViewedArrayBuffer]] when the Record was created.
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-makedataviewwithbufferwitnessrecord" type="abstract operation">
        <h1>
          MakeDataViewWithBufferWitnessRecord (
            _obj_: a DataView,
            _order_: ~seq-cst~ or ~unordered~,
          ): a DataView With Buffer Witness Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _buffer_ be _obj_.[[ViewedArrayBuffer]].
          1. If IsDetachedBuffer(_buffer_) is *true*, then
            1. Let _byteLength_ be ~detached~.
          1. Else,
            1. Let _byteLength_ be ArrayBufferByteLength(_buffer_, _order_).
          1. Return the DataView With Buffer Witness Record { [[Object]]: _obj_, [[CachedBufferByteLength]]: _byteLength_ }.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getviewbytelength" type="abstract operation">
        <h1>
          GetViewByteLength (
            _viewRecord_: a DataView With Buffer Witness Record,
          ): a non-negative integer
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: IsViewOutOfBounds(_viewRecord_) is *false*.
          1. Let _view_ be _viewRecord_.[[Object]].
          1. If _view_.[[ByteLength]] is not ~auto~, return _view_.[[ByteLength]].
          1. Assert: IsFixedLengthArrayBuffer(_view_.[[ViewedArrayBuffer]]) is *false*.
          1. Let _byteOffset_ be _view_.[[ByteOffset]].
          1. Let _byteLength_ be _viewRecord_.[[CachedBufferByteLength]].
          1. Assert: _byteLength_ is not ~detached~.
          1. Return _byteLength_ - _byteOffset_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-isviewoutofbounds" type="abstract operation">
        <h1>
          IsViewOutOfBounds (
            _viewRecord_: a DataView With Buffer Witness Record,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _view_ be _viewRecord_.[[Object]].
          1. Let _bufferByteLength_ be _viewRecord_.[[CachedBufferByteLength]].
          1. Assert: IsDetachedBuffer(_view_.[[ViewedArrayBuffer]]) is *true* if and only if _bufferByteLength_ is ~detached~.
          1. If _bufferByteLength_ is ~detached~, return *true*.
          1. Let _byteOffsetStart_ be _view_.[[ByteOffset]].
          1. If _view_.[[ByteLength]] is ~auto~, then
            1. Let _byteOffsetEnd_ be _bufferByteLength_.
          1. Else,
            1. Let _byteOffsetEnd_ be _byteOffsetStart_ + _view_.[[ByteLength]].
          1. If _byteOffsetStart_ > _bufferByteLength_ or _byteOffsetEnd_ > _bufferByteLength_, return *true*.
          1. NOTE: 0-length DataViews are not considered out-of-bounds.
          1. Return *false*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getviewvalue" type="abstract operation">
        <h1>
          GetViewValue (
            _view_: an ECMAScript language value,
            _requestIndex_: an ECMAScript language value,
            _isLittleEndian_: an ECMAScript language value,
            _type_: a TypedArray element type,
          ): either a normal completion containing either a Number or a BigInt, or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used by functions on DataView instances to retrieve values from the view's buffer.</dd>
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_view_, [[DataView]]).
          1. Assert: _view_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _getIndex_ be ? ToIndex(_requestIndex_).
          1. Set _isLittleEndian_ to ToBoolean(_isLittleEndian_).
          1. Let _viewOffset_ be _view_.[[ByteOffset]].
          1. Let _viewRecord_ be MakeDataViewWithBufferWitnessRecord(_view_, ~unordered~).
          1. NOTE: Bounds checking is not a synchronizing operation when _view_'s backing buffer is a growable SharedArrayBuffer.
          1. If IsViewOutOfBounds(_viewRecord_) is *true*, throw a *TypeError* exception.
          1. Let _viewSize_ be GetViewByteLength(_viewRecord_).
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. If _getIndex_ + _elementSize_ > _viewSize_, throw a *RangeError* exception.
          1. Let _bufferIndex_ be _getIndex_ + _viewOffset_.
          1. Return GetValueFromBuffer(_view_.[[ViewedArrayBuffer]], _bufferIndex_, _type_, *false*, ~unordered~, _isLittleEndian_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-setviewvalue" type="abstract operation">
        <h1>
          SetViewValue (
            _view_: an ECMAScript language value,
            _requestIndex_: an ECMAScript language value,
            _isLittleEndian_: an ECMAScript language value,
            _type_: a TypedArray element type,
            _value_: an ECMAScript language value,
          ): either a normal completion containing *undefined* or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It is used by functions on DataView instances to store values into the view's buffer.</dd>
        </dl>
        <emu-alg>
          1. Perform ? RequireInternalSlot(_view_, [[DataView]]).
          1. Assert: _view_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _getIndex_ be ? ToIndex(_requestIndex_).
          1. If IsBigIntElementType(_type_) is *true*, let _numberValue_ be ? ToBigInt(_value_).
          1. Otherwise, let _numberValue_ be ? ToNumber(_value_).
          1. Set _isLittleEndian_ to ToBoolean(_isLittleEndian_).
          1. Let _viewOffset_ be _view_.[[ByteOffset]].
          1. Let _viewRecord_ be MakeDataViewWithBufferWitnessRecord(_view_, ~unordered~).
          1. NOTE: Bounds checking is not a synchronizing operation when _view_'s backing buffer is a growable SharedArrayBuffer.
          1. If IsViewOutOfBounds(_viewRecord_) is *true*, throw a *TypeError* exception.
          1. Let _viewSize_ be GetViewByteLength(_viewRecord_).
          1. Let _elementSize_ be the Element Size value specified in <emu-xref href="#table-the-typedarray-constructors"></emu-xref> for Element Type _type_.
          1. If _getIndex_ + _elementSize_ > _viewSize_, throw a *RangeError* exception.
          1. Let _bufferIndex_ be _getIndex_ + _viewOffset_.
          1. Perform SetValueInBuffer(_view_.[[ViewedArrayBuffer]], _bufferIndex_, _type_, _numberValue_, *false*, ~unordered~, _isLittleEndian_).
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-dataview-constructor">
      <h1>The DataView Constructor</h1>
      <p>The DataView constructor:</p>
      <ul>
        <li>is <dfn>%DataView%</dfn>.</li>
        <li>is the initial value of the *"DataView"* property of the global object.</li>
        <li>creates and initializes a new DataView when called as a constructor.</li>
        <li>is not intended to be called as a function and will throw an exception when called in that manner.</li>
        <li>may be used as the value of an `extends` clause of a class definition. Subclass constructors that intend to inherit the specified DataView behaviour must include a `super` call to the DataView constructor to create and initialize subclass instances with the internal state necessary to support the `DataView.prototype` built-in methods.</li>
      </ul>

      <emu-clause id="sec-dataview-buffer-byteoffset-bytelength">
        <h1>DataView ( _buffer_ [ , _byteOffset_ [ , _byteLength_ ] ] )</h1>
        <p>This function performs the following steps when called:</p>
        <emu-alg>
          1. If NewTarget is *undefined*, throw a *TypeError* exception.
          1. Perform ? RequireInternalSlot(_buffer_, [[ArrayBufferData]]).
          1. Let _offset_ be ? ToIndex(_byteOffset_).
          1. If IsDetachedBuffer(_buffer_) is *true*, throw a *TypeError* exception.
          1. Let _bufferByteLength_ be ArrayBufferByteLength(_buffer_, ~seq-cst~).
          1. If _offset_ > _bufferByteLength_, throw a *RangeError* exception.
          1. Let _bufferIsFixedLength_ be IsFixedLengthArrayBuffer(_buffer_).
          1. If _byteLength_ is *undefined*, then
            1. If _bufferIsFixedLength_ is *true*, then
              1. Let _viewByteLength_ be _bufferByteLength_ - _offset_.
            1. Else,
              1. Let _viewByteLength_ be ~auto~.
          1. Else,
            1. Let _viewByteLength_ be ? ToIndex(_byteLength_).
            1. If _offset_ + _viewByteLength_ > _bufferByteLength_, throw a *RangeError* exception.
          1. Let _O_ be ? OrdinaryCreateFromConstructor(NewTarget, *"%DataView.prototype%"*, « [[DataView]], [[ViewedArrayBuffer]], [[ByteLength]], [[ByteOffset]] »).
          1. If IsDetachedBuffer(_buffer_) is *true*, throw a *TypeError* exception.
          1. Set _bufferByteLength_ to ArrayBufferByteLength(_buffer_, ~seq-cst~).
          1. If _offset_ > _bufferByteLength_, throw a *RangeError* exception.
          1. If _byteLength_ is not *undefined*, then
            1. If _offset_ + _viewByteLength_ > _bufferByteLength_, throw a *RangeError* exception.
          1. Set _O_.[[ViewedArrayBuffer]] to _buffer_.
          1. Set _O_.[[ByteLength]] to _viewByteLength_.
          1. Set _O_.[[ByteOffset]] to _offset_.
          1. Return _O_.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-dataview-constructor">
      <h1>Properties of the DataView Constructor</h1>
      <p>The DataView constructor:</p>
      <ul>
        <li>has a [[Prototype]] internal slot whose value is %Function.prototype%.</li>
        <li>has the following properties:</li>
      </ul>

      <emu-clause id="sec-dataview.prototype">
        <h1>DataView.prototype</h1>
        <p>The initial value of `DataView.prototype` is the DataView prototype object.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *false* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-the-dataview-prototype-object">
      <h1>Properties of the DataView Prototype Object</h1>
      <p>The <dfn>DataView prototype object</dfn>:</p>
      <ul>
        <li>is <dfn>%DataView.prototype%</dfn>.</li>
        <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
        <li>is an ordinary object.</li>
        <li>does not have a [[DataView]], [[ViewedArrayBuffer]], [[ByteLength]], or [[ByteOffset]] internal slot.</li>
      </ul>

      <emu-clause id="sec-get-dataview.prototype.buffer">
        <h1>get DataView.prototype.buffer</h1>
        <p>`DataView.prototype.buffer` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[DataView]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _buffer_ be _O_.[[ViewedArrayBuffer]].
          1. Return _buffer_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-dataview.prototype.bytelength">
        <h1>get DataView.prototype.byteLength</h1>
        <p>`DataView.prototype.byteLength` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[DataView]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _viewRecord_ be MakeDataViewWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsViewOutOfBounds(_viewRecord_) is *true*, throw a *TypeError* exception.
          1. Let _size_ be GetViewByteLength(_viewRecord_).
          1. Return 𝔽(_size_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-get-dataview.prototype.byteoffset">
        <h1>get DataView.prototype.byteOffset</h1>
        <p>`DataView.prototype.byteOffset` is an accessor property whose set accessor function is *undefined*. Its get accessor function performs the following steps when called:</p>
        <emu-alg>
          1. Let _O_ be the *this* value.
          1. Perform ? RequireInternalSlot(_O_, [[DataView]]).
          1. Assert: _O_ has a [[ViewedArrayBuffer]] internal slot.
          1. Let _viewRecord_ be MakeDataViewWithBufferWitnessRecord(_O_, ~seq-cst~).
          1. If IsViewOutOfBounds(_viewRecord_) is *true*, throw a *TypeError* exception.
          1. Let _offset_ be _O_.[[ByteOffset]].
          1. Return 𝔽(_offset_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.constructor">
        <h1>DataView.prototype.constructor</h1>
        <p>The initial value of `DataView.prototype.constructor` is %DataView%.</p>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getbigint64">
        <h1>DataView.prototype.getBigInt64 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~bigint64~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getbiguint64">
        <h1>DataView.prototype.getBigUint64 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~biguint64~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getfloat32">
        <h1>DataView.prototype.getFloat32 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~float32~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getfloat64">
        <h1>DataView.prototype.getFloat64 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~float64~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getint8">
        <h1>DataView.prototype.getInt8 ( _byteOffset_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? GetViewValue(_v_, _byteOffset_, *true*, ~int8~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getint16">
        <h1>DataView.prototype.getInt16 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~int16~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getint32">
        <h1>DataView.prototype.getInt32 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~int32~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getuint8">
        <h1>DataView.prototype.getUint8 ( _byteOffset_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? GetViewValue(_v_, _byteOffset_, *true*, ~uint8~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getuint16">
        <h1>DataView.prototype.getUint16 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~uint16~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.getuint32">
        <h1>DataView.prototype.getUint32 ( _byteOffset_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? GetViewValue(_v_, _byteOffset_, _littleEndian_, ~uint32~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setbigint64">
        <h1>DataView.prototype.setBigInt64 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~bigint64~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setbiguint64">
        <h1>DataView.prototype.setBigUint64 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~biguint64~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setfloat32">
        <h1>DataView.prototype.setFloat32 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~float32~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setfloat64">
        <h1>DataView.prototype.setFloat64 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~float64~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setint8">
        <h1>DataView.prototype.setInt8 ( _byteOffset_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? SetViewValue(_v_, _byteOffset_, *true*, ~int8~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setint16">
        <h1>DataView.prototype.setInt16 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~int16~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setint32">
        <h1>DataView.prototype.setInt32 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~int32~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setuint8">
        <h1>DataView.prototype.setUint8 ( _byteOffset_, _value_ )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. Return ? SetViewValue(_v_, _byteOffset_, *true*, ~uint8~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setuint16">
        <h1>DataView.prototype.setUint16 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~uint16~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dataview.prototype.setuint32">
        <h1>DataView.prototype.setUint32 ( _byteOffset_, _value_ [ , _littleEndian_ ] )</h1>
        <p>This method performs the following steps when called:</p>
        <emu-alg>
          1. Let _v_ be the *this* value.
          1. If _littleEndian_ is not present, set _littleEndian_ to *false*.
          1. Return ? SetViewValue(_v_, _byteOffset_, _littleEndian_, ~uint32~, _value_).
        </emu-alg>
      </emu-clause>

      <emu-clause oldids="sec-dataview.prototype-@@tostringtag" id="sec-dataview.prototype-%symbol.tostringtag%">
        <h1>DataView.prototype [ %Symbol.toStringTag% ]</h1>
        <p>The initial value of the %Symbol.toStringTag% property is the String value *"DataView"*.</p>
        <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-properties-of-dataview-instances">
      <h1>Properties of DataView Instances</h1>
      <p>DataView instances are ordinary objects that inherit properties from the DataView prototype object. DataView instances each have [[DataView]], [[ViewedArrayBuffer]], [[ByteLength]], and [[ByteOffset]] internal slots.</p>
      <emu-note>
        <p>The value of the [[DataView]] internal slot is not used within this specification. The simple presence of that internal slot is used within the specification to identify objects created using the DataView constructor.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-atomics-object">
    <h1>The Atomics Object</h1>
    <p>The Atomics object:</p>
    <ul>
      <li>is <dfn>%Atomics%</dfn>.</li>
      <li>is the initial value of the *"Atomics"* property of the global object.</li>
      <li>is an ordinary object.</li>
      <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      <li>does not have a [[Construct]] internal method; it cannot be used as a constructor with the `new` operator.</li>
      <li>does not have a [[Call]] internal method; it cannot be invoked as a function.</li>
    </ul>
    <p>The Atomics object provides functions that operate indivisibly (atomically) on shared memory array cells as well as functions that let agents wait for and dispatch primitive events. When used with discipline, the Atomics functions allow multi-agent programs that communicate through shared memory to execute in a well-understood order even on parallel CPUs. The rules that govern shared-memory communication are provided by the memory model, defined below.</p>
    <emu-note>
      <p>For informative guidelines for programming and implementing shared memory in ECMAScript, please see the notes at the end of the memory model section.</p>
    </emu-note>

    <emu-clause id="sec-waiter-record">
      <h1>Waiter Record</h1>
      <p>A <dfn variants="Waiter Records">Waiter Record</dfn> is a Record value used to denote a particular call to `Atomics.wait` or `Atomics.waitAsync`.</p>
      <p>A Waiter Record has fields listed in <emu-xref href="#table-waiterrecord"></emu-xref>.</p>
      <emu-table id="table-waiterrecord" caption="Waiter Record Fields">
        <table>
          <thead>
            <tr>
              <th>
                Field Name
              </th>
              <th>
                Value
              </th>
              <th>
                Meaning
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              [[AgentSignifier]]
            </td>
            <td>
              an agent signifier
            </td>
            <td>
              The agent that called `Atomics.wait` or `Atomics.waitAsync`.
            </td>
          </tr>
          <tr>
            <td>
              [[PromiseCapability]]
            </td>
            <td>
              a PromiseCapability Record or ~blocking~
            </td>
            <td>
              If denoting a call to `Atomics.waitAsync`, the resulting promise, otherwise ~blocking~.
            </td>
          </tr>
          <tr>
            <td>
              [[TimeoutTime]]
            </td>
            <td>
              a non-negative extended mathematical value
            </td>
            <td>
              The earliest time by which timeout may be triggered; computed using time values.
            </td>
          </tr>
          <tr>
            <td>
              [[Result]]
            </td>
            <td>
              *"ok"* or *"timed-out"*
            </td>
            <td>
              The return value of the call.
            </td>
          </tr>
        </table>
      </emu-table>
    </emu-clause>

    <emu-clause id="sec-waiterlist-records" oldids="sec-waiterlist-objects">
      <h1>WaiterList Records</h1>
      <p>A <dfn variants="WaiterList Records">WaiterList Record</dfn> is used to explain waiting and notification of agents via `Atomics.wait`, `Atomics.waitAsync`, and `Atomics.notify`.</p>
      <p>A WaiterList Record has fields listed in <emu-xref href="#table-waiterlistrecord"></emu-xref>.</p>
      <emu-table id="table-waiterlistrecord" caption="WaiterList Record Fields">
        <table>
          <thead>
            <tr>
              <th>
                Field Name
              </th>
              <th>
                Value
              </th>
              <th>
                Meaning
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              [[Waiters]]
            </td>
            <td>
              a List of Waiter Records
            </td>
            <td>
              The calls to `Atomics.wait` or `Atomics.waitAsync` that are waiting on the location with which this WaiterList is associated.
            </td>
          </tr>
          <tr>
            <td>
              [[MostRecentLeaveEvent]]
            </td>
            <td>
              a Synchronize event or ~empty~
            </td>
            <td>
              The event of the most recent leaving of its critical section, or ~empty~ if its critical section has never been entered.
            </td>
          </tr>
        </table>
      </emu-table>
      <p>There can be multiple Waiter Records in a WaiterList with the same agent signifier.</p>
      <p>The agent cluster has a store of WaiterList Records; the store is indexed by (_block_, _i_), where _block_ is a Shared Data Block and _i_ a byte offset into the memory of _block_. WaiterList Records are agent-independent: a lookup in the store of WaiterList Records by (_block_, _i_) will result in the same WaiterList Record in any agent in the agent cluster.</p>
      <p>Each WaiterList Record has a <dfn variants="critical sections">critical section</dfn> that controls exclusive access to that WaiterList Record during evaluation. Only a single agent may enter a WaiterList Record's critical section at one time. Entering and leaving a WaiterList Record's critical section is controlled by the abstract operations EnterCriticalSection and LeaveCriticalSection. Operations on a WaiterList Record—adding and removing waiting agents, traversing the list of agents, suspending and notifying agents on the list, setting and retrieving the Synchronize event—may only be performed by agents that have entered the WaiterList Record's critical section.</p>
    </emu-clause>

    <emu-clause id="sec-abstract-operations-for-atomics">
      <h1>Abstract Operations for Atomics</h1>

      <emu-clause id="sec-validateintegertypedarray" type="abstract operation" oldids="sec-validatesharedintegertypedarray">
        <h1>
          ValidateIntegerTypedArray (
            _typedArray_: an ECMAScript language value,
            _waitable_: a Boolean,
          ): either a normal completion containing a TypedArray With Buffer Witness Record, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _taRecord_ be ? ValidateTypedArray(_typedArray_, ~unordered~).
          1. NOTE: Bounds checking is not a synchronizing operation when _typedArray_'s backing buffer is a growable SharedArrayBuffer.
          1. If _waitable_ is *true*, then
            1. If _typedArray_.[[TypedArrayName]] is neither *"Int32Array"* nor *"BigInt64Array"*, throw a *TypeError* exception.
          1. Else,
            1. Let _type_ be TypedArrayElementType(_typedArray_).
            1. If IsUnclampedIntegerElementType(_type_) is *false* and IsBigIntElementType(_type_) is *false*, throw a *TypeError* exception.
          1. Return _taRecord_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-validateatomicaccess" type="abstract operation">
        <h1>
          ValidateAtomicAccess (
            _taRecord_: a TypedArray With Buffer Witness Record,
            _requestIndex_: an ECMAScript language value,
          ): either a normal completion containing an integer or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _length_ be TypedArrayLength(_taRecord_).
          1. Let _accessIndex_ be ? ToIndex(_requestIndex_).
          1. Assert: _accessIndex_ ≥ 0.
          1. If _accessIndex_ ≥ _length_, throw a *RangeError* exception.
          1. Let _typedArray_ be _taRecord_.[[Object]].
          1. Let _elementSize_ be TypedArrayElementSize(_typedArray_).
          1. Let _offset_ be _typedArray_.[[ByteOffset]].
          1. Return (_accessIndex_ × _elementSize_) + _offset_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-validateatomicaccessonintegertypedarray" type="abstract operation">
        <h1>
          ValidateAtomicAccessOnIntegerTypedArray (
            _typedArray_: an ECMAScript language value,
            _requestIndex_: an ECMAScript language value,
            optional _waitable_: a Boolean,
          ): either a normal completion containing an integer or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _waitable_ is not present, set _waitable_ to *false*.
          1. Let _taRecord_ be ? ValidateIntegerTypedArray(_typedArray_, _waitable_).
          1. Return ? ValidateAtomicAccess(_taRecord_, _requestIndex_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-revalidateatomicaccess" type="abstract operation">
        <h1>
          RevalidateAtomicAccess (
            _typedArray_: a TypedArray,
            _byteIndexInBuffer_: an integer,
          ): either a normal completion containing ~unused~ or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>This operation revalidates the index within the backing buffer for atomic operations after all argument coercions are performed in Atomics methods, as argument coercions can have arbitrary side effects, which could cause the buffer to become out of bounds. This operation does not throw when _typedArray_'s backing buffer is a SharedArrayBuffer.</dd>
        </dl>
        <emu-alg>
          1. Let _taRecord_ be MakeTypedArrayWithBufferWitnessRecord(_typedArray_, ~unordered~).
          1. NOTE: Bounds checking is not a synchronizing operation when _typedArray_'s backing buffer is a growable SharedArrayBuffer.
          1. If IsTypedArrayOutOfBounds(_taRecord_) is *true*, throw a *TypeError* exception.
          1. Assert: _byteIndexInBuffer_ ≥ _typedArray_.[[ByteOffset]].
          1. If _byteIndexInBuffer_ ≥ _taRecord_.[[CachedBufferByteLength]], throw a *RangeError* exception.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-getwaiterlist" type="abstract operation">
        <h1>
          GetWaiterList (
            _block_: a Shared Data Block,
            _i_: a non-negative integer that is evenly divisible by 4,
          ): a WaiterList Record
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: _i_ and _i_ + 3 are valid byte offsets within the memory of _block_.
          1. Return the WaiterList Record that is referenced by the pair (_block_, _i_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-entercriticalsection" type="abstract operation">
        <h1>
          EnterCriticalSection (
            _WL_: a WaiterList Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is not in the critical section for any WaiterList Record.
          1. Wait until no agent is in the critical section for _WL_, then enter the critical section for _WL_ (without allowing any other agent to enter).
          1. If _WL_.[[MostRecentLeaveEvent]] is not ~empty~, then
            1. NOTE: A _WL_ whose critical section has been entered at least once has a Synchronize event set by LeaveCriticalSection.
            1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
            1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
            1. Let _enterEvent_ be a new Synchronize event.
            1. Append _enterEvent_ to _eventsRecord_.[[EventList]].
            1. Append (_WL_.[[MostRecentLeaveEvent]], _enterEvent_) to _eventsRecord_.[[AgentSynchronizesWith]].
          1. Return ~unused~.
        </emu-alg>
        <p>EnterCriticalSection has <dfn>contention</dfn> when an agent attempting to enter the critical section must wait for another agent to leave it. When there is no contention, FIFO order of EnterCriticalSection calls is observable. When there is contention, an implementation may choose an arbitrary order but may not cause an agent to wait indefinitely.</p>
      </emu-clause>

      <emu-clause id="sec-leavecriticalsection" type="abstract operation">
        <h1>
          LeaveCriticalSection (
            _WL_: a WaiterList Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
          1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
          1. Let _leaveEvent_ be a new Synchronize event.
          1. Append _leaveEvent_ to _eventsRecord_.[[EventList]].
          1. Set _WL_.[[MostRecentLeaveEvent]] to _leaveEvent_.
          1. Leave the critical section for _WL_.
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-addwaiter" type="abstract operation">
        <h1>
          AddWaiter (
            _WL_: a WaiterList Record,
            _waiterRecord_: a Waiter Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. Assert: There is no Waiter Record in _WL_.[[Waiters]] whose [[PromiseCapability]] field is _waiterRecord_.[[PromiseCapability]] and whose [[AgentSignifier]] field is _waiterRecord_.[[AgentSignifier]].
          1. Append _waiterRecord_ to _WL_.[[Waiters]].
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-removewaiter" type="abstract operation">
        <h1>
          RemoveWaiter (
            _WL_: a WaiterList Record,
            _waiterRecord_: a Waiter Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. Assert: _WL_.[[Waiters]] contains _waiterRecord_.
          1. Remove _waiterRecord_ from _WL_.[[Waiters]].
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-removewaiters" type="abstract operation">
        <h1>
          RemoveWaiters (
            _WL_: a WaiterList Record,
            _c_: a non-negative integer or +&infin;,
          ): a List of Waiter Records
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. Let _len_ be the number of elements in _WL_.[[Waiters]].
          1. Let _n_ be min(_c_, _len_).
          1. Let _L_ be a List whose elements are the first _n_ elements of _WL_.[[Waiters]].
          1. Remove the first _n_ elements of _WL_.[[Waiters]].
          1. Return _L_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-suspendthisagent" type="abstract operation" oldids="sec-suspend,sec-suspendagent">
        <h1>
          SuspendThisAgent (
            _WL_: a WaiterList Record,
            _waiterRecord_: a Waiter Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. Assert: _WL_.[[Waiters]] contains _waiterRecord_.
          1. Let _thisAgent_ be AgentSignifier().
          1. Assert: _waiterRecord_.[[AgentSignifier]] is _thisAgent_.
          1. Assert: _waiterRecord_.[[PromiseCapability]] is ~blocking~.
          1. Assert: AgentCanSuspend() is *true*.
          1. Perform LeaveCriticalSection(_WL_) and suspend the surrounding agent until the time is _waiterRecord_.[[TimeoutTime]], performing the combined operation in such a way that a notification that arrives after the critical section is exited but before the suspension takes effect is not lost. The surrounding agent can only wake from suspension due to a timeout or due to another agent calling NotifyWaiter with arguments _WL_ and _thisAgent_ (i.e. via a call to `Atomics.notify`).
          1. Perform EnterCriticalSection(_WL_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-notifywaiter" type="abstract operation">
        <h1>
          NotifyWaiter (
            _WL_: a WaiterList Record,
            _waiterRecord_: a Waiter Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Assert: The surrounding agent is in the critical section for _WL_.
          1. If _waiterRecord_.[[PromiseCapability]] is ~blocking~, then
            1. Wake the agent whose signifier is _waiterRecord_.[[AgentSignifier]] from suspension.
            1. NOTE: This causes the agent to resume execution in SuspendThisAgent.
          1. Else if AgentSignifier() is _waiterRecord_.[[AgentSignifier]], then
            1. Let _promiseCapability_ be _waiterRecord_.[[PromiseCapability]].
            1. Perform ! Call(_promiseCapability_.[[Resolve]], *undefined*, « _waiterRecord_.[[Result]] »).
          1. Else,
            1. Perform EnqueueResolveInAgentJob(_waiterRecord_.[[AgentSignifier]], _waiterRecord_.[[PromiseCapability]], _waiterRecord_.[[Result]]).
          1. Return ~unused~.
        </emu-alg>
        <emu-note>
          <p>An agent must not access another agent's promise capability in any capacity beyond passing it to the host.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-enqueueresolveinagentjob" type="abstract operation">
        <h1>
          EnqueueResolveInAgentJob (
            _agentSignifier_: an agent signifier,
            _promiseCapability_: a PromiseCapability Record,
            _resolution_: *"ok"* or *"timed-out"*,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _resolveJob_ be a new Job Abstract Closure with no parameters that captures _agentSignifier_, _promiseCapability_, and _resolution_ and performs the following steps when called:
            1. Assert: AgentSignifier() is _agentSignifier_.
            1. Perform ! Call(_promiseCapability_.[[Resolve]], *undefined*, « _resolution_ »).
            1. Return ~unused~.
          1. Let _realmInTargetAgent_ be ! GetFunctionRealm(_promiseCapability_.[[Resolve]]).
          1. Assert: _agentSignifier_ is _realmInTargetAgent_.[[AgentSignifier]].
          1. Perform HostEnqueueGenericJob(_resolveJob_, _realmInTargetAgent_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-dowait" type="abstract operation">
        <h1>
          DoWait (
            _mode_: ~sync~ or ~async~,
            _typedArray_: an ECMAScript language value,
            _index_: an ECMAScript language value,
            _value_: an ECMAScript language value,
            _timeout_: an ECMAScript language value,
          ): either a normal completion containing either an Object, *"not-equal"*, *"timed-out"*, or *"ok"*, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _taRecord_ be ? ValidateIntegerTypedArray(_typedArray_, *true*).
          1. Let _buffer_ be _taRecord_.[[Object]].[[ViewedArrayBuffer]].
          1. If IsSharedArrayBuffer(_buffer_) is *false*, throw a *TypeError* exception.
          1. Let _i_ be ? ValidateAtomicAccess(_taRecord_, _index_).
          1. Let _arrayTypeName_ be _typedArray_.[[TypedArrayName]].
          1. If _arrayTypeName_ is *"BigInt64Array"*, let _v_ be ? ToBigInt64(_value_).
          1. Else, let _v_ be ? ToInt32(_value_).
          1. Let _q_ be ? ToNumber(_timeout_).
          1. If _q_ is either *NaN* or *+∞*<sub>𝔽</sub>, let _t_ be +∞; else if _q_ is *-∞*<sub>𝔽</sub>, let _t_ be 0; else let _t_ be max(ℝ(_q_), 0).
          1. If _mode_ is ~sync~ and AgentCanSuspend() is *false*, throw a *TypeError* exception.
          1. Let _block_ be _buffer_.[[ArrayBufferData]].
          1. Let _offset_ be _typedArray_.[[ByteOffset]].
          1. Let _byteIndexInBuffer_ be (_i_ × 4) + _offset_.
          1. Let _WL_ be GetWaiterList(_block_, _byteIndexInBuffer_).
          1. If _mode_ is ~sync~, then
            1. Let _promiseCapability_ be ~blocking~.
            1. Let _resultObject_ be *undefined*.
          1. Else,
            1. Let _promiseCapability_ be ! NewPromiseCapability(%Promise%).
            1. Let _resultObject_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Perform EnterCriticalSection(_WL_).
          1. Let _elementType_ be TypedArrayElementType(_typedArray_).
          1. Let _w_ be GetValueFromBuffer(_buffer_, _byteIndexInBuffer_, _elementType_, *true*, ~seq-cst~).
          1. If _v_ ≠ _w_, then
            1. Perform LeaveCriticalSection(_WL_).
            1. If _mode_ is ~sync~, return *"not-equal"*.
            1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"async"*, *false*).
            1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"value"*, *"not-equal"*).
            1. Return _resultObject_.
          1. If _t_ = 0 and _mode_ is ~async~, then
            1. NOTE: There is no special handling of synchronous immediate timeouts. Asynchronous immediate timeouts have special handling in order to fail fast and avoid unnecessary Promise jobs.
            1. Perform LeaveCriticalSection(_WL_).
            1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"async"*, *false*).
            1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"value"*, *"timed-out"*).
            1. Return _resultObject_.
          1. Let _thisAgent_ be AgentSignifier().
          1. Let _now_ be the time value (UTC) identifying the current time.
          1. Let _additionalTimeout_ be an implementation-defined non-negative mathematical value.
          1. Let _timeoutTime_ be ℝ(_now_) + _t_ + _additionalTimeout_.
          1. NOTE: When _t_ is +∞, _timeoutTime_ is also +∞.
          1. Let _waiterRecord_ be a new Waiter Record { [[AgentSignifier]]: _thisAgent_, [[PromiseCapability]]: _promiseCapability_, [[TimeoutTime]]: _timeoutTime_, [[Result]]: *"ok"* }.
          1. Perform AddWaiter(_WL_, _waiterRecord_).
          1. If _mode_ is ~sync~, then
            1. Perform SuspendThisAgent(_WL_, _waiterRecord_).
          1. Else if _timeoutTime_ is finite, then
            1. Perform EnqueueAtomicsWaitAsyncTimeoutJob(_WL_, _waiterRecord_).
          1. Perform LeaveCriticalSection(_WL_).
          1. If _mode_ is ~sync~, return _waiterRecord_.[[Result]].
          1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"async"*, *true*).
          1. Perform ! CreateDataPropertyOrThrow(_resultObject_, *"value"*, _promiseCapability_.[[Promise]]).
          1. Return _resultObject_.
        </emu-alg>
        <emu-note>
          <p>_additionalTimeout_ allows implementations to pad timeouts as necessary, such as for reducing power consumption or coarsening timer resolution to mitigate timing attacks. This value may differ from call to call of DoWait.</p>
        </emu-note>
      </emu-clause>

      <emu-clause id="sec-enqueueatomicswaitasynctimeoutjob" type="abstract operation">
        <h1>
          EnqueueAtomicsWaitAsyncTimeoutJob (
            _WL_: a WaiterList Record,
            _waiterRecord_: a Waiter Record,
          ): ~unused~
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _timeoutJob_ be a new Job Abstract Closure with no parameters that captures _WL_ and _waiterRecord_ and performs the following steps when called:
            1. Perform EnterCriticalSection(_WL_).
            1. If _WL_.[[Waiters]] contains _waiterRecord_, then
              1. Let _timeOfJobExecution_ be the time value (UTC) identifying the current time.
              1. Assert: ℝ(_timeOfJobExecution_) ≥ _waiterRecord_.[[TimeoutTime]] (ignoring potential non-monotonicity of time values).
              1. Set _waiterRecord_.[[Result]] to *"timed-out"*.
              1. Perform RemoveWaiter(_WL_, _waiterRecord_).
              1. Perform NotifyWaiter(_WL_, _waiterRecord_).
            1. Perform LeaveCriticalSection(_WL_).
            1. Return ~unused~.
          1. Let _now_ be the time value (UTC) identifying the current time.
          1. Let _currentRealm_ be the current Realm Record.
          1. Perform HostEnqueueTimeoutJob(_timeoutJob_, _currentRealm_, 𝔽(_waiterRecord_.[[TimeoutTime]]) - _now_).
          1. Return ~unused~.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-atomiccompareexchangeinsharedblock" type="abstract operation">
        <h1>
          AtomicCompareExchangeInSharedBlock (
            _block_: a Shared Data Block,
            _byteIndexInBuffer_: an integer,
            _elementSize_: a non-negative integer,
            _expectedBytes_: a List of byte values,
            _replacementBytes_: a List of byte values,
          ): a List of byte values
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _execution_ be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
          1. Let _eventsRecord_ be the Agent Events Record of _execution_.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
          1. Let _rawBytesRead_ be a List of length _elementSize_ whose elements are nondeterministically chosen byte values.
          1. NOTE: In implementations, _rawBytesRead_ is the result of a load-link, of a load-exclusive, or of an operand of a read-modify-write instruction on the underlying hardware. The nondeterminism is a semantic prescription of the memory model to describe observable behaviour of hardware with weak consistency.
          1. NOTE: The comparison of the expected value and the read value is performed outside of the read-modify-write modification function to avoid needlessly strong synchronization when the expected value is not equal to the read value.
          1. If ByteListEqual(_rawBytesRead_, _expectedBytes_) is *true*, then
            1. Let _second_ be a new read-modify-write modification function with parameters (_oldBytes_, _newBytes_) that captures nothing and performs the following steps atomically when called:
              1. Return _newBytes_.
            1. Let _event_ be ReadModifyWriteSharedMemory { [[Order]]: ~seq-cst~, [[NoTear]]: *true*, [[Block]]: _block_, [[ByteIndex]]: _byteIndexInBuffer_, [[ElementSize]]: _elementSize_, [[Payload]]: _replacementBytes_, [[ModifyOp]]: _second_ }.
          1. Else,
            1. Let _event_ be ReadSharedMemory { [[Order]]: ~seq-cst~, [[NoTear]]: *true*, [[Block]]: _block_, [[ByteIndex]]: _byteIndexInBuffer_, [[ElementSize]]: _elementSize_ }.
          1. Append _event_ to _eventsRecord_.[[EventList]].
          1. Append Chosen Value Record { [[Event]]: _event_, [[ChosenValue]]: _rawBytesRead_ } to _execution_.[[ChosenValues]].
          1. Return _rawBytesRead_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-atomicreadmodifywrite" type="abstract operation">
        <h1>
          AtomicReadModifyWrite (
            _typedArray_: an ECMAScript language value,
            _index_: an ECMAScript language value,
            _value_: an ECMAScript language value,
            _op_: a read-modify-write modification function,
          ): either a normal completion containing either a Number or a BigInt, or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>_op_ takes two List of byte values arguments and returns a List of byte values. This operation atomically loads a value, combines it with another value, and stores the combination. It returns the loaded value.</dd>
        </dl>
        <emu-alg>
          1. Let _byteIndexInBuffer_ be ? ValidateAtomicAccessOnIntegerTypedArray(_typedArray_, _index_).
          1. If _typedArray_.[[ContentType]] is ~bigint~, let _v_ be ? ToBigInt(_value_).
          1. Otherwise, let _v_ be 𝔽(? ToIntegerOrInfinity(_value_)).
          1. Perform ? RevalidateAtomicAccess(_typedArray_, _byteIndexInBuffer_).
          1. Let _buffer_ be _typedArray_.[[ViewedArrayBuffer]].
          1. Let _elementType_ be TypedArrayElementType(_typedArray_).
          1. Return GetModifySetValueInBuffer(_buffer_, _byteIndexInBuffer_, _elementType_, _v_, _op_).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-bytelistbitwiseop" type="abstract operation">
        <h1>
          ByteListBitwiseOp (
            _op_: `&amp;`, `^`, or `|`,
            _xBytes_: a List of byte values,
            _yBytes_: a List of byte values,
          ): a List of byte values
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>The operation atomically performs a bitwise operation on all byte values of the arguments and returns a List of byte values.</dd>
        </dl>
        <emu-alg>
          1. Assert: _xBytes_ and _yBytes_ have the same number of elements.
          1. Let _result_ be a new empty List.
          1. Let _i_ be 0.
          1. For each element _xByte_ of _xBytes_, do
            1. Let _yByte_ be _yBytes_[_i_].
            1. If _op_ is `&amp;`, then
              1. Let _resultByte_ be the result of applying the bitwise AND operation to _xByte_ and _yByte_.
            1. Else if _op_ is `^`, then
              1. Let _resultByte_ be the result of applying the bitwise exclusive OR (XOR) operation to _xByte_ and _yByte_.
            1. Else,
              1. Assert: _op_ is `|`.
              1. Let _resultByte_ be the result of applying the bitwise inclusive OR operation to _xByte_ and _yByte_.
            1. Set _i_ to _i_ + 1.
            1. Append _resultByte_ to _result_.
          1. Return _result_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-bytelistequal" type="abstract operation">
        <h1>
          ByteListEqual (
            _xBytes_: a List of byte values,
            _yBytes_: a List of byte values,
          ): a Boolean
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. If _xBytes_ and _yBytes_ do not have the same number of elements, return *false*.
          1. Let _i_ be 0.
          1. For each element _xByte_ of _xBytes_, do
            1. Let _yByte_ be _yBytes_[_i_].
            1. If _xByte_ ≠ _yByte_, return *false*.
            1. Set _i_ to _i_ + 1.
          1. Return *true*.
        </emu-alg>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-atomics.add">
      <h1>Atomics.add ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _add_ be a new read-modify-write modification function with parameters (_xBytes_, _yBytes_) that captures _typedArray_ and performs the following steps atomically when called:
          1. Let _type_ be TypedArrayElementType(_typedArray_).
          1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Let _x_ be RawBytesToNumeric(_type_, _xBytes_, _isLittleEndian_).
          1. Let _y_ be RawBytesToNumeric(_type_, _yBytes_, _isLittleEndian_).
          1. If _x_ is a Number, then
            1. Let _sum_ be Number::add(_x_, _y_).
          1. Else,
            1. Assert: _x_ is a BigInt.
            1. Let _sum_ be BigInt::add(_x_, _y_).
          1. Let _sumBytes_ be NumericToRawBytes(_type_, _sum_, _isLittleEndian_).
          1. Assert: _sumBytes_, _xBytes_, and _yBytes_ have the same number of elements.
          1. Return _sumBytes_.
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _add_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.and">
      <h1>Atomics.and ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _and_ be a new read-modify-write modification function with parameters (_xBytes_, _yBytes_) that captures nothing and performs the following steps atomically when called:
          1. Return ByteListBitwiseOp(`&amp;`, _xBytes_, _yBytes_).
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _and_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.compareexchange">
      <h1>Atomics.compareExchange ( _typedArray_, _index_, _expectedValue_, _replacementValue_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _byteIndexInBuffer_ be ? ValidateAtomicAccessOnIntegerTypedArray(_typedArray_, _index_).
        1. Let _buffer_ be _typedArray_.[[ViewedArrayBuffer]].
        1. Let _block_ be _buffer_.[[ArrayBufferData]].
        1. If _typedArray_.[[ContentType]] is ~bigint~, then
          1. Let _expected_ be ? ToBigInt(_expectedValue_).
          1. Let _replacement_ be ? ToBigInt(_replacementValue_).
        1. Else,
          1. Let _expected_ be 𝔽(? ToIntegerOrInfinity(_expectedValue_)).
          1. Let _replacement_ be 𝔽(? ToIntegerOrInfinity(_replacementValue_)).
        1. Perform ? RevalidateAtomicAccess(_typedArray_, _byteIndexInBuffer_).
        1. Let _elementType_ be TypedArrayElementType(_typedArray_).
        1. Let _elementSize_ be TypedArrayElementSize(_typedArray_).
        1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
        1. Let _expectedBytes_ be NumericToRawBytes(_elementType_, _expected_, _isLittleEndian_).
        1. Let _replacementBytes_ be NumericToRawBytes(_elementType_, _replacement_, _isLittleEndian_).
        1. If IsSharedArrayBuffer(_buffer_) is *true*, then
          1. Let _rawBytesRead_ be AtomicCompareExchangeInSharedBlock(_block_, _byteIndexInBuffer_, _elementSize_, _expectedBytes_, _replacementBytes_).
        1. Else,
          1. Let _rawBytesRead_ be a List of length _elementSize_ whose elements are the sequence of _elementSize_ bytes starting with _block_[_byteIndexInBuffer_].
          1. If ByteListEqual(_rawBytesRead_, _expectedBytes_) is *true*, then
            1. Store the individual bytes of _replacementBytes_ into _block_, starting at _block_[_byteIndexInBuffer_].
        1. Return RawBytesToNumeric(_elementType_, _rawBytesRead_, _isLittleEndian_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.exchange">
      <h1>Atomics.exchange ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _second_ be a new read-modify-write modification function with parameters (_oldBytes_, _newBytes_) that captures nothing and performs the following steps atomically when called:
          1. Return _newBytes_.
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _second_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.islockfree">
      <h1>Atomics.isLockFree ( _size_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _n_ be ? ToIntegerOrInfinity(_size_).
        1. Let _AR_ be the Agent Record of the surrounding agent.
        1. If _n_ = 1, return _AR_.[[IsLockFree1]].
        1. If _n_ = 2, return _AR_.[[IsLockFree2]].
        1. If _n_ = 4, return *true*.
        1. If _n_ = 8, return _AR_.[[IsLockFree8]].
        1. Return *false*.
      </emu-alg>
      <emu-note>
        <p>This function is an optimization primitive. The intuition is that if the atomic step of an atomic primitive (`compareExchange`, `load`, `store`, `add`, `sub`, `and`, `or`, `xor`, or `exchange`) on a datum of size _n_ bytes will be performed without the surrounding agent acquiring a lock outside the _n_ bytes comprising the datum, then `Atomics.isLockFree`(_n_) will return *true*. High-performance algorithms will use this function to determine whether to use locks or atomic operations in critical sections. If an atomic primitive is not lock-free then it is often more efficient for an algorithm to provide its own locking.</p>
        <p>`Atomics.isLockFree`(4) always returns *true* as that can be supported on all known relevant hardware. Being able to assume this will generally simplify programs.</p>
        <p>Regardless of the value returned by this function, all atomic operations are guaranteed to be atomic. For example, they will never have a visible operation take place in the middle of the operation (e.g., "tearing").</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-atomics.load" oldids="sec-atomicload">
      <h1>Atomics.load ( _typedArray_, _index_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _byteIndexInBuffer_ be ? ValidateAtomicAccessOnIntegerTypedArray(_typedArray_, _index_).
        1. Perform ? RevalidateAtomicAccess(_typedArray_, _byteIndexInBuffer_).
        1. Let _buffer_ be _typedArray_.[[ViewedArrayBuffer]].
        1. Let _elementType_ be TypedArrayElementType(_typedArray_).
        1. Return GetValueFromBuffer(_buffer_, _byteIndexInBuffer_, _elementType_, *true*, ~seq-cst~).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.or">
      <h1>Atomics.or ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _or_ be a new read-modify-write modification function with parameters (_xBytes_, _yBytes_) that captures nothing and performs the following steps atomically when called:
          1. Return ByteListBitwiseOp(`|`, _xBytes_, _yBytes_).
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _or_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.store">
      <h1>Atomics.store ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _byteIndexInBuffer_ be ? ValidateAtomicAccessOnIntegerTypedArray(_typedArray_, _index_).
        1. If _typedArray_.[[ContentType]] is ~bigint~, let _v_ be ? ToBigInt(_value_).
        1. Otherwise, let _v_ be 𝔽(? ToIntegerOrInfinity(_value_)).
        1. Perform ? RevalidateAtomicAccess(_typedArray_, _byteIndexInBuffer_).
        1. Let _buffer_ be _typedArray_.[[ViewedArrayBuffer]].
        1. Let _elementType_ be TypedArrayElementType(_typedArray_).
        1. Perform SetValueInBuffer(_buffer_, _byteIndexInBuffer_, _elementType_, _v_, *true*, ~seq-cst~).
        1. Return _v_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.sub">
      <h1>Atomics.sub ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _subtract_ be a new read-modify-write modification function with parameters (_xBytes_, _yBytes_) that captures _typedArray_ and performs the following steps atomically when called:
          1. Let _type_ be TypedArrayElementType(_typedArray_).
          1. Let _isLittleEndian_ be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
          1. Let _x_ be RawBytesToNumeric(_type_, _xBytes_, _isLittleEndian_).
          1. Let _y_ be RawBytesToNumeric(_type_, _yBytes_, _isLittleEndian_).
          1. If _x_ is a Number, then
            1. Let _difference_ be Number::subtract(_x_, _y_).
          1. Else,
            1. Assert: _x_ is a BigInt.
            1. Let _difference_ be BigInt::subtract(_x_, _y_).
          1. Let _differenceBytes_ be NumericToRawBytes(_type_, _difference_, _isLittleEndian_).
          1. Assert: _differenceBytes_, _xBytes_, and _yBytes_ have the same number of elements.
          1. Return _differenceBytes_.
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _subtract_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.wait">
      <h1>Atomics.wait ( _typedArray_, _index_, _value_, _timeout_ )</h1>
      <p>This function puts the surrounding agent in a wait queue and suspends it until notified or until the wait times out, returning a String differentiating those cases.</p>
      <p>It performs the following steps when called:</p>
      <emu-alg>
        1. Return ? DoWait(~sync~, _typedArray_, _index_, _value_, _timeout_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.waitasync">
      <h1>Atomics.waitAsync ( _typedArray_, _index_, _value_, _timeout_ )</h1>
      <p>This function returns a Promise that is resolved when the calling agent is notified or the timeout is reached.</p>
      <p>It performs the following steps when called:</p>
      <emu-alg>
        1. Return ? DoWait(~async~, _typedArray_, _index_, _value_, _timeout_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.notify">
      <h1>Atomics.notify ( _typedArray_, _index_, _count_ )</h1>
      <p>This function notifies some agents that are sleeping in the wait queue.</p>
      <p>It performs the following steps when called:</p>
      <emu-alg>
        1. Let _byteIndexInBuffer_ be ? ValidateAtomicAccessOnIntegerTypedArray(_typedArray_, _index_, *true*).
        1. If _count_ is *undefined*, then
          1. Let _c_ be +∞.
        1. Else,
          1. Let _intCount_ be ? ToIntegerOrInfinity(_count_).
          1. Let _c_ be max(_intCount_, 0).
        1. Let _buffer_ be _typedArray_.[[ViewedArrayBuffer]].
        1. Let _block_ be _buffer_.[[ArrayBufferData]].
        1. If IsSharedArrayBuffer(_buffer_) is *false*, return *+0*<sub>𝔽</sub>.
        1. Let _WL_ be GetWaiterList(_block_, _byteIndexInBuffer_).
        1. Perform EnterCriticalSection(_WL_).
        1. Let _S_ be RemoveWaiters(_WL_, _c_).
        1. For each element _W_ of _S_, do
          1. Perform NotifyWaiter(_WL_, _W_).
        1. Perform LeaveCriticalSection(_WL_).
        1. Let _n_ be the number of elements in _S_.
        1. Return 𝔽(_n_).
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-atomics.xor">
      <h1>Atomics.xor ( _typedArray_, _index_, _value_ )</h1>
      <p>This function performs the following steps when called:</p>
      <emu-alg>
        1. Let _xor_ be a new read-modify-write modification function with parameters (_xBytes_, _yBytes_) that captures nothing and performs the following steps atomically when called:
          1. Return ByteListBitwiseOp(`^`, _xBytes_, _yBytes_).
        1. Return ? AtomicReadModifyWrite(_typedArray_, _index_, _value_, _xor_).
      </emu-alg>
    </emu-clause>

    <emu-clause oldids="sec-atomics-@@tostringtag" id="sec-atomics-%symbol.tostringtag%">
      <h1>Atomics [ %Symbol.toStringTag% ]</h1>
      <p>The initial value of the %Symbol.toStringTag% property is the String value *"Atomics"*.</p>
      <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-json-object">
    <h1>The JSON Object</h1>
    <p>The JSON object:</p>
    <ul>
      <li>is <dfn>%JSON%</dfn>.</li>
      <li>is the initial value of the *"JSON"* property of the global object.</li>
      <li>is an ordinary object.</li>
      <li>contains two functions, `parse` and `stringify`, that are used to parse and construct JSON texts.</li>
      <li>has a [[Prototype]] internal slot whose value is %Object.prototype%.</li>
      <li>does not have a [[Construct]] internal method; it cannot be used as a constructor with the `new` operator.</li>
      <li>does not have a [[Call]] internal method; it cannot be invoked as a function.</li>
    </ul>
    <p>The JSON Data Interchange Format is defined in ECMA-404. The JSON interchange format used in this specification is exactly that described by ECMA-404. Conforming implementations of `JSON.parse` and `JSON.stringify` must support the exact interchange format described in the ECMA-404 specification without any deletions or extensions to the format.</p>

    <emu-clause id="sec-json.parse">
      <h1>JSON.parse ( _text_ [ , _reviver_ ] )</h1>
      <p>This function parses a JSON text (a JSON-formatted String) and produces an ECMAScript language value. The JSON format represents literals, arrays, and objects with a syntax similar to the syntax for ECMAScript literals, Array Initializers, and Object Initializers. After parsing, JSON objects are realized as ECMAScript objects. JSON arrays are realized as ECMAScript Array instances. JSON strings, numbers, booleans, and null are realized as ECMAScript Strings, Numbers, Booleans, and *null*.</p>
      <p>The optional _reviver_ parameter is a function that takes two parameters, _key_ and _value_. It can filter and transform the results. It is called with each of the _key_/_value_ pairs produced by the parse, and its return value is used instead of the original value. If it returns what it received, the structure is not modified. If it returns *undefined* then the property is deleted from the result.</p>
      <emu-alg>
        1. Let _jsonString_ be ? ToString(_text_).
        1. [id="step-json-parse-validate"] Parse StringToCodePoints(_jsonString_) as a JSON text as specified in ECMA-404. Throw a *SyntaxError* exception if it is not a valid JSON text as defined in that specification.
        1. Let _scriptString_ be the string-concatenation of *"("*, _jsonString_, and *");"*.
        1. [id="step-json-parse-parse"] Let _script_ be ParseText(_scriptString_, |Script|).
        1. NOTE: The early error rules defined in <emu-xref href="#sec-object-initializer-static-semantics-early-errors"></emu-xref> have special handling for the above invocation of ParseText.
        1. Assert: _script_ is a Parse Node.
        1. [id="step-json-parse-eval"] Let _unfiltered_ be ! <emu-meta suppress-effects="user-code">Evaluation of _script_</emu-meta>.
        1. NOTE: The PropertyDefinitionEvaluation semantics defined in <emu-xref href="#sec-runtime-semantics-propertydefinitionevaluation"></emu-xref> have special handling for the above evaluation.
        1. [id="step-json-parse-assert-type"] Assert: _unfiltered_ is either a String, a Number, a Boolean, an Object that is defined by either an |ArrayLiteral| or an |ObjectLiteral|, or *null*.
        1. If IsCallable(_reviver_) is *true*, then
          1. Let _root_ be OrdinaryObjectCreate(%Object.prototype%).
          1. Let _rootName_ be the empty String.
          1. Perform ! CreateDataPropertyOrThrow(_root_, _rootName_, _unfiltered_).
          1. Return ? InternalizeJSONProperty(_root_, _rootName_, _reviver_).
        1. Else,
          1. Return _unfiltered_.
      </emu-alg>
      <p>The *"length"* property of this function is *2*<sub>𝔽</sub>.</p>
      <emu-note>
        <p>Valid JSON text is a subset of the ECMAScript |PrimaryExpression| syntax. Step <emu-xref href="#step-json-parse-validate"></emu-xref> verifies that _jsonString_ conforms to that subset, and step <emu-xref href="#step-json-parse-assert-type"></emu-xref> asserts that that parsing and evaluation returns a value of an appropriate type.</p>
        <p>However, because <emu-xref href="#sec-runtime-semantics-propertydefinitionevaluation"></emu-xref> behaves differently during `JSON.parse`, the same source text can produce different results when evaluated as a |PrimaryExpression| rather than as JSON. Furthermore, the Early Error for duplicate *"__proto__"* properties in object literals, which likewise does not apply during `JSON.parse`, means that not all texts accepted by `JSON.parse` are valid as a |PrimaryExpression|, despite matching the grammar.</p>
      </emu-note>

      <emu-clause id="sec-internalizejsonproperty" type="abstract operation">
        <h1>
          InternalizeJSONProperty (
            _holder_: an Object,
            _name_: a String,
            _reviver_: a function object,
          ): either a normal completion containing an ECMAScript language value or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-note>
          <p>This algorithm intentionally does not throw an exception if either [[Delete]] or CreateDataProperty return *false*.</p>
        </emu-note>
        <p>It performs the following steps when called:</p>
        <emu-alg>
          1. Let _val_ be ? Get(_holder_, _name_).
          1. If _val_ is an Object, then
            1. Let _isArray_ be ? IsArray(_val_).
            1. If _isArray_ is *true*, then
              1. Let _len_ be ? LengthOfArrayLike(_val_).
              1. Let _I_ be 0.
              1. Repeat, while _I_ &lt; _len_,
                1. Let _prop_ be ! ToString(𝔽(_I_)).
                1. Let _newElement_ be ? InternalizeJSONProperty(_val_, _prop_, _reviver_).
                1. If _newElement_ is *undefined*, then
                  1. Perform ? <emu-meta effects="user-code">_val_.[[Delete]]</emu-meta>(_prop_).
                1. Else,
                  1. Perform ? CreateDataProperty(_val_, _prop_, _newElement_).
                1. Set _I_ to _I_ + 1.
            1. Else,
              1. Let _keys_ be ? EnumerableOwnProperties(_val_, ~key~).
              1. For each String _P_ of _keys_, do
                1. Let _newElement_ be ? InternalizeJSONProperty(_val_, _P_, _reviver_).
                1. If _newElement_ is *undefined*, then
                  1. Perform ? <emu-meta effects="user-code">_val_.[[Delete]]</emu-meta>(_P_).
                1. Else,
                  1. Perform ? CreateDataProperty(_val_, _P_, _newElement_).
          1. Return ? Call(_reviver_, _holder_, « _name_, _val_ »).
        </emu-alg>
        <p>It is not permitted for a conforming implementation of `JSON.parse` to extend the JSON grammars. If an implementation wishes to support a modified or extended JSON interchange format it must do so by defining a different parse function.</p>
        <emu-note>
          <p>In the case where there are duplicate name Strings within an object, lexically preceding values for the same key shall be overwritten.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause id="sec-json.stringify">
      <h1>JSON.stringify ( _value_ [ , _replacer_ [ , _space_ ] ] )</h1>
      <p>This function returns a String in UTF-16 encoded JSON format representing an ECMAScript language value, or *undefined*. It can take three parameters. The _value_ parameter is an ECMAScript language value, which is usually an object or array, although it can also be a String, Boolean, Number or *null*. The optional _replacer_ parameter is either a function that alters the way objects and arrays are stringified, or an array of Strings and Numbers that acts as an inclusion list for selecting the object properties that will be stringified. The optional _space_ parameter is a String or Number that allows the result to have white space injected into it to improve human readability.</p>
      <p>It performs the following steps when called:</p>
      <emu-alg>
        1. Let _stack_ be a new empty List.
        1. Let _indent_ be the empty String.
        1. Let _PropertyList_ be *undefined*.
        1. Let _ReplacerFunction_ be *undefined*.
        1. If _replacer_ is an Object, then
          1. If IsCallable(_replacer_) is *true*, then
            1. Set _ReplacerFunction_ to _replacer_.
          1. Else,
            1. Let _isArray_ be ? IsArray(_replacer_).
            1. If _isArray_ is *true*, then
              1. Set _PropertyList_ to a new empty List.
              1. Let _len_ be ? LengthOfArrayLike(_replacer_).
              1. Let _k_ be 0.
              1. Repeat, while _k_ &lt; _len_,
                1. Let _prop_ be ! ToString(𝔽(_k_)).
                1. Let _v_ be ? Get(_replacer_, _prop_).
                1. Let _item_ be *undefined*.
                1. If _v_ is a String, then
                  1. Set _item_ to _v_.
                1. Else if _v_ is a Number, then
                  1. Set _item_ to ! ToString(_v_).
                1. Else if _v_ is an Object, then
                  1. If _v_ has a [[StringData]] or [[NumberData]] internal slot, set _item_ to ? ToString(_v_).
                1. If _item_ is not *undefined* and _PropertyList_ does not contain _item_, then
                  1. Append _item_ to _PropertyList_.
                1. Set _k_ to _k_ + 1.
        1. If _space_ is an Object, then
          1. If _space_ has a [[NumberData]] internal slot, then
            1. Set _space_ to ? ToNumber(_space_).
          1. Else if _space_ has a [[StringData]] internal slot, then
            1. Set _space_ to ? ToString(_space_).
        1. If _space_ is a Number, then
          1. Let _spaceMV_ be ! ToIntegerOrInfinity(_space_).
          1. Set _spaceMV_ to min(10, _spaceMV_).
          1. If _spaceMV_ &lt; 1, let _gap_ be the empty String; otherwise let _gap_ be the String value containing _spaceMV_ occurrences of the code unit 0x0020 (SPACE).
        1. Else if _space_ is a String, then
          1. If the length of _space_ ≤ 10, let _gap_ be _space_; otherwise let _gap_ be the substring of _space_ from 0 to 10.
        1. Else,
          1. Let _gap_ be the empty String.
        1. Let _wrapper_ be OrdinaryObjectCreate(%Object.prototype%).
        1. Perform ! CreateDataPropertyOrThrow(_wrapper_, the empty String, _value_).
        1. Let _state_ be the JSON Serialization Record { [[ReplacerFunction]]: _ReplacerFunction_, [[Stack]]: _stack_, [[Indent]]: _indent_, [[Gap]]: _gap_, [[PropertyList]]: _PropertyList_ }.
        1. Return ? SerializeJSONProperty(_state_, the empty String, _wrapper_).
      </emu-alg>
      <p>The *"length"* property of this function is *3*<sub>𝔽</sub>.</p>
      <emu-note>
        <p>JSON structures are allowed to be nested to any depth, but they must be acyclic. If _value_ is or contains a cyclic structure, then this function must throw a *TypeError* exception. This is an example of a value that cannot be stringified:</p>
        <pre><code class="javascript">
          a = [];
          a[0] = a;
          my_text = JSON.stringify(a); // This must throw a TypeError.
        </code></pre>
      </emu-note>
      <emu-note>
        <p>Symbolic primitive values are rendered as follows:</p>
        <ul>
          <li>
            The *null* value is rendered in JSON text as the String value *"null"*.
          </li>
          <li>
            The *undefined* value is not rendered.
          </li>
          <li>
            The *true* value is rendered in JSON text as the String value *"true"*.
          </li>
          <li>
            The *false* value is rendered in JSON text as the String value *"false"*.
          </li>
        </ul>
      </emu-note>
      <emu-note>
        <p>String values are wrapped in QUOTATION MARK (`"`) code units. The code units `"` and `\\` are escaped with `\\` prefixes. Control characters code units are replaced with escape sequences `\\u`HHHH, or with the shorter forms, `\\b` (BACKSPACE), `\\f` (FORM FEED), `\\n` (LINE FEED), `\\r` (CARRIAGE RETURN), `\\t` (CHARACTER TABULATION).</p>
      </emu-note>
      <emu-note>
        <p>Finite numbers are stringified as if by calling ToString(_number_). *NaN* and *Infinity* regardless of sign are represented as the String value *"null"*.</p>
      </emu-note>
      <emu-note>
        <p>Values that do not have a JSON representation (such as *undefined* and functions) do not produce a String. Instead they produce the *undefined* value. In arrays these values are represented as the String value *"null"*. In objects an unrepresentable value causes the property to be excluded from stringification.</p>
      </emu-note>
      <emu-note>
        <p>An object is rendered as U+007B (LEFT CURLY BRACKET) followed by zero or more properties, separated with a U+002C (COMMA), closed with a U+007D (RIGHT CURLY BRACKET). A property is a quoted String representing the property name, a U+003A (COLON), and then the stringified property value. An array is rendered as an opening U+005B (LEFT SQUARE BRACKET) followed by zero or more values, separated with a U+002C (COMMA), closed with a U+005D (RIGHT SQUARE BRACKET).</p>
      </emu-note>

      <emu-clause id="sec-json-serialization-record">
        <h1>JSON Serialization Record</h1>
        <p>A <dfn variants="JSON Serialization Records">JSON Serialization Record</dfn> is a Record value used to enable serialization to the JSON format.</p>
        <p>JSON Serialization Records have the fields listed in <emu-xref href="#table-json-serialization-record"></emu-xref>.</p>
        <emu-table id="table-json-serialization-record" caption="JSON Serialization Record Fields">
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tr>
              <td>[[ReplacerFunction]]</td>
              <td>a function object or *undefined*</td>
              <td>A function that can supply replacement values for object properties (from JSON.stringify's _replacer_ parameter).</td>
            </tr>
            <tr>
              <td>[[PropertyList]]</td>
              <td>either a List of Strings or *undefined*</td>
              <td>The names of properties to include when serializing a non-array object (from JSON.stringify's _replacer_ parameter).</td>
            </tr>
            <tr>
              <td>[[Gap]]</td>
              <td>a String</td>
              <td>The unit of indentation (from JSON.stringify's _space_ parameter).</td>
            </tr>
            <tr>
              <td>[[Stack]]</td>
              <td>a List of Objects</td>
              <td>The set of nested objects that are in the process of being serialized. Used to detect cyclic structures.</td>
            </tr>
            <tr>
              <td>[[Indent]]</td>
              <td>a String</td>
              <td>The current indentation.</td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-serializejsonproperty" type="abstract operation">
        <h1>
          SerializeJSONProperty (
            _state_: a JSON Serialization Record,
            _key_: a String,
            _holder_: an Object,
          ): either a normal completion containing either a String or *undefined*, or a throw completion
        </h1>
        <dl class="header">
        </dl>
        <emu-alg>
          1. Let _value_ be ? Get(_holder_, _key_).
          1. If _value_ is an Object or _value_ is a BigInt, then
            1. Let _toJSON_ be ? GetV(_value_, *"toJSON"*).
            1. If IsCallable(_toJSON_) is *true*, then
              1. Set _value_ to ? Call(_toJSON_, _value_, « _key_ »).
          1. If _state_.[[ReplacerFunction]] is not *undefined*, then
            1. Set _value_ to ? Call(_state_.[[ReplacerFunction]], _holder_, « _key_, _value_ »).
          1. If _value_ is an Object, then
            1. If _value_ has a [[NumberData]] internal slot, then
              1. Set _value_ to ? ToNumber(_value_).
            1. Else if _value_ has a [[StringData]] internal slot, then
              1. Set _value_ to ? ToString(_value_).
            1. Else if _value_ has a [[BooleanData]] internal slot, then
              1. Set _value_ to _value_.[[BooleanData]].
            1. Else if _value_ has a [[BigIntData]] internal slot, then
              1. Set _value_ to _value_.[[BigIntData]].
          1. If _value_ is *null*, return *"null"*.
          1. If _value_ is *true*, return *"true"*.
          1. If _value_ is *false*, return *"false"*.
          1. If _value_ is a String, return QuoteJSONString(_value_).
          1. If _value_ is a Number, then
            1. If _value_ is finite, return ! ToString(_value_).
            1. Return *"null"*.
          1. If _value_ is a BigInt, throw a *TypeError* exception.
          1. If _value_ is an Object and IsCallable(_value_) is *false*, then
            1. Let _isArray_ be ? IsArray(_value_).
            1. If _isArray_ is *true*, return ? SerializeJSONArray(_state_, _value_).
            1. Return ? SerializeJSONObject(_state_, _value_).
          1. Return *undefined*.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-quotejsonstring" type="abstract operation">
        <h1>
          QuoteJSONString (
            _value_: a String,
          ): a String
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It wraps _value_ in 0x0022 (QUOTATION MARK) code units and escapes certain other code units within it. This operation interprets _value_ as a sequence of UTF-16 encoded code points, as described in <emu-xref href="#sec-ecmascript-language-types-string-type"></emu-xref>.</dd>
        </dl>
        <emu-alg>
          1. Let _product_ be the String value consisting solely of the code unit 0x0022 (QUOTATION MARK).
          1. For each code point _C_ of StringToCodePoints(_value_), do
            1. If _C_ is listed in the “Code Point” column of <emu-xref href="#table-json-single-character-escapes"></emu-xref>, then
              1. Set _product_ to the string-concatenation of _product_ and the escape sequence for _C_ as specified in the “Escape Sequence” column of the corresponding row.
            1. Else if _C_ has a numeric value less than 0x0020 (SPACE) or _C_ has the same numeric value as a leading surrogate or trailing surrogate, then
              1. Let _unit_ be the code unit whose numeric value is the numeric value of _C_.
              1. Set _product_ to the string-concatenation of _product_ and UnicodeEscape(_unit_).
            1. Else,
              1. Set _product_ to the string-concatenation of _product_ and UTF16EncodeCodePoint(_C_).
          1. Set _product_ to the string-concatenation of _product_ and the code unit 0x0022 (QUOTATION MARK).
          1. Return _product_.
        </emu-alg>
        <emu-table id="table-json-single-character-escapes" caption="JSON Single Character Escape Sequences">
          <table>
            <thead>
              <tr>
                <th>
                  Code Point
                </th>
                <th>
                  Unicode Character Name
                </th>
                <th>
                  Escape Sequence
                </th>
              </tr>
            </thead>
            <tr>
              <td>
                U+0008
              </td>
              <td>
                BACKSPACE
              </td>
              <td>
                `\\b`
              </td>
            </tr>
            <tr>
              <td>
                U+0009
              </td>
              <td>
                CHARACTER TABULATION
              </td>
              <td>
                `\\t`
              </td>
            </tr>
            <tr>
              <td>
                U+000A
              </td>
              <td>
                LINE FEED (LF)
              </td>
              <td>
                `\\n`
              </td>
            </tr>
            <tr>
              <td>
                U+000C
              </td>
              <td>
                FORM FEED (FF)
              </td>
              <td>
                `\\f`
              </td>
            </tr>
            <tr>
              <td>
                U+000D
              </td>
              <td>
                CARRIAGE RETURN (CR)
              </td>
              <td>
                `\\r`
              </td>
            </tr>
            <tr>
              <td>
                U+0022
              </td>
              <td>
                QUOTATION MARK
              </td>
              <td>
                `\\"`
              </td>
            </tr>
            <tr>
              <td>
                U+005C
              </td>
              <td>
                REVERSE SOLIDUS
              </td>
              <td>
                `\\\\`
              </td>
            </tr>
          </table>
        </emu-table>
      </emu-clause>

      <emu-clause id="sec-unicodeescape" type="abstract operation">
        <h1>
          UnicodeEscape (
            _C_: a code unit,
          ): a String
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It represents _C_ as a Unicode escape sequence.</dd>
        </dl>
        <emu-alg>
          1. Let _n_ be the numeric value of _C_.
          1. Assert: _n_ ≤ 0xFFFF.
          1. Let _hex_ be the String representation of _n_, formatted as a lowercase hexadecimal number.
          1. Return the string-concatenation of the code unit 0x005C (REVERSE SOLIDUS), *"u"*, and StringPad(_hex_, 4, *"0"*, ~start~).
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-serializejsonobject" type="abstract operation">
        <h1>
          SerializeJSONObject (
            _state_: a JSON Serialization Record,
            _value_: an Object,
          ): either a normal completion containing a String or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It serializes an object.</dd>
        </dl>
        <emu-alg>
          1. If _state_.[[Stack]] contains _value_, throw a *TypeError* exception because the structure is cyclical.
          1. Append _value_ to _state_.[[Stack]].
          1. Let _stepBack_ be _state_.[[Indent]].
          1. Set _state_.[[Indent]] to the string-concatenation of _state_.[[Indent]] and _state_.[[Gap]].
          1. If _state_.[[PropertyList]] is not *undefined*, then
            1. Let _K_ be _state_.[[PropertyList]].
          1. Else,
            1. Let _K_ be ? EnumerableOwnProperties(_value_, ~key~).
          1. Let _partial_ be a new empty List.
          1. For each element _P_ of _K_, do
            1. Let _strP_ be ? SerializeJSONProperty(_state_, _P_, _value_).
            1. If _strP_ is not *undefined*, then
              1. Let _member_ be QuoteJSONString(_P_).
              1. Set _member_ to the string-concatenation of _member_ and *":"*.
              1. If _state_.[[Gap]] is not the empty String, then
                1. Set _member_ to the string-concatenation of _member_ and the code unit 0x0020 (SPACE).
              1. Set _member_ to the string-concatenation of _member_ and _strP_.
              1. Append _member_ to _partial_.
          1. If _partial_ is empty, then
            1. Let _final_ be *"{}"*.
          1. Else,
            1. If _state_.[[Gap]] is the empty String, then
              1. Let _properties_ be the String value formed by concatenating all the element Strings of _partial_ with each adjacent pair of Strings separated with the code unit 0x002C (COMMA). A comma is not inserted either before the first String or after the last String.
              1. Let _final_ be the string-concatenation of *"{"*, _properties_, and *"}"*.
            1. Else,
              1. Let _separator_ be the string-concatenation of the code unit 0x002C (COMMA), the code unit 0x000A (LINE FEED), and _state_.[[Indent]].
              1. Let _properties_ be the String value formed by concatenating all the element Strings of _partial_ with each adjacent pair of Strings separated with _separator_. The _separator_ String is not inserted either before the first String or after the last String.
              1. Let _final_ be the string-concatenation of *"{"*, the code unit 0x000A (LINE FEED), _state_.[[Indent]], _properties_, the code unit 0x000A (LINE FEED), _stepBack_, and *"}"*.
          1. Remove the last element of _state_.[[Stack]].
          1. Set _state_.[[Indent]] to _stepBack_.
          1. Return _final_.
        </emu-alg>
      </emu-clause>

      <emu-clause id="sec-serializejsonarray" type="abstract operation">
        <h1>
          SerializeJSONArray (
            _state_: a JSON Serialization Record,
            _value_: an ECMAScript language value,
          ): either a normal completion containing a String or a throw completion
        </h1>
        <dl class="header">
          <dt>description</dt>
          <dd>It serializes an array.</dd>
        </dl>
        <emu-alg>
          1. If _state_.[[Stack]] contains _value_, throw a *TypeError* exception because the structure is cyclical.
          1. Append _value_ to _state_.[[Stack]].
          1. Let _stepBack_ be _state_.[[Indent]].
          1. Set _state_.[[Indent]] to the string-concatenation of _state_.[[Indent]] and _state_.[[Gap]].
          1. Let _partial_ be a new empty List.
          1. Let _len_ be ? LengthOfArrayLike(_value_).
          1. Let _index_ be 0.
          1. Repeat, while _index_ &lt; _len_,
            1. Let _strP_ be ? SerializeJSONProperty(_state_, ! ToString(𝔽(_index_)), _value_).
            1. If _strP_ is *undefined*, then
              1. Append *"null"* to _partial_.
            1. Else,
              1. Append _strP_ to _partial_.
            1. Set _index_ to _index_ + 1.
          1. If _partial_ is empty, then
            1. Let _final_ be *"[]"*.
          1. Else,
            1. If _state_.[[Gap]] is the empty String, then
              1. Let _properties_ be the String value formed by concatenating all the element Strings of _partial_ with each adjacent pair of Strings separated with the code unit 0x002C (COMMA). A comma is not inserted either before the first String or after the last String.
              1. Let _final_ be the string-concatenation of *"["*, _properties_, and *"]"*.
            1. Else,
              1. Let _separator_ be the string-concatenation of the code unit 0x002C (COMMA), the code unit 0x000A (LINE FEED), and _state_.[[Indent]].
              1. Let _properties_ be the String value formed by concatenating all the element Strings of _partial_ with each adjacent pair of Strings separated with _separator_. The _separator_ String is not inserted either before the first String or after the last String.
              1. Let _final_ be the string-concatenation of *"["*, the code unit 0x000A (LINE FEED), _state_.[[Indent]], _properties_, the code unit 0x000A (LINE FEED), _stepBack_, and *"]"*.
          1. Remove the last element of _state_.[[Stack]].
          1. Set _state_.[[Indent]] to _stepBack_.
          1. Return _final_.
        </emu-alg>
        <emu-note>
          <p>The representation of arrays includes only the elements in the interval from *+0*<sub>𝔽</sub> (inclusive) to `array.length` (exclusive). Properties whose keys are not array indices are excluded from the stringification. An array is stringified as an opening LEFT SQUARE BRACKET, elements separated by COMMA, and a closing RIGHT SQUARE BRACKET.</p>
        </emu-note>
      </emu-clause>
    </emu-clause>

    <emu-clause oldids="sec-json-@@tostringtag" id="sec-json-%symbol.tostringtag%">
      <h1>JSON [ %Symbol.toStringTag% ]</h1>
      <p>The initial value of the %Symbol.toStringTag% property is the String value *"JSON"*.</p>
      <p>This property has the attributes { [[Writable]]: *false*, [[Enumerable]]: *false*, [[Configurable]]: *true* }.</p>
    </emu-clause>
  </emu-clause>

<h1 id="sec-managing-memory"></h1>
