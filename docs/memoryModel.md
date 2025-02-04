# Memory Model
  <p>The memory consistency model, or <dfn>memory model</dfn>, specifies the possible orderings of Shared Data Block events, arising via accessing TypedArray instances backed by a SharedArrayBuffer and via methods on the Atomics object. When the program has no data races (defined below), the ordering of events appears as sequentially consistent, i.e., as an interleaving of actions from each agent. When the program has data races, shared memory operations may appear sequentially inconsistent. For example, programs may exhibit causality-violating behaviour and other astonishments. These astonishments arise from compiler transforms and the design of CPUs (e.g., out-of-order execution and speculation). The memory model defines both the precise conditions under which a program exhibits sequentially consistent behaviour as well as the possible values read from data races. To wit, there is no undefined behaviour.</p>
  <p>The memory model is defined as relational constraints on events introduced by abstract operations on SharedArrayBuffer or by methods on the Atomics object during an evaluation.</p>
  <emu-note>
    <p>This section provides an axiomatic model on events introduced by the abstract operations on SharedArrayBuffers. It bears stressing that the model is not expressible algorithmically, unlike the rest of this specification. The nondeterministic introduction of events by abstract operations is the interface between the operational semantics of ECMAScript evaluation and the axiomatic semantics of the memory model. The semantics of these events is defined by considering graphs of all events in an evaluation. These are neither Static Semantics nor Runtime Semantics. There is no demonstrated algorithmic implementation, but instead a set of constraints that determine if a particular event graph is allowed or disallowed.</p>
  </emu-note>

  <emu-clause id="sec-memory-model-fundamentals">
    <h1>Memory Model Fundamentals</h1>
    <p>Shared memory accesses (reads and writes) are divided into two groups, atomic accesses and data accesses, defined below. Atomic accesses are sequentially consistent, i.e., there is a strict total ordering of events agreed upon by all agents in an agent cluster. Non-atomic accesses do not have a strict total ordering agreed upon by all agents, i.e., unordered.</p>
    <emu-note>
      <p>No orderings weaker than sequentially consistent and stronger than unordered, such as release-acquire, are supported.</p>
    </emu-note>
    <p>A <dfn variants="Shared Data Block events">Shared Data Block event</dfn> is either a <dfn>ReadSharedMemory</dfn>, <dfn>WriteSharedMemory</dfn>, or <dfn>ReadModifyWriteSharedMemory</dfn> Record.</p>

    <emu-table id="table-readsharedmemory-fields" caption="ReadSharedMemory Event Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[Order]]</td>
          <td>~seq-cst~ or ~unordered~</td>
          <td>The weakest ordering guaranteed by the memory model for the event.</td>
        </tr>
        <tr>
          <td>[[NoTear]]</td>
          <td>a Boolean</td>
          <td>Whether this event is allowed to read from multiple write events with equal range as this event.</td>
        </tr>
        <tr>
          <td>[[Block]]</td>
          <td>a Shared Data Block</td>
          <td>The block the event operates on.</td>
        </tr>
        <tr>
          <td>[[ByteIndex]]</td>
          <td>a non-negative integer</td>
          <td>The byte address of the read in [[Block]].</td>
        </tr>
        <tr>
          <td>[[ElementSize]]</td>
          <td>a non-negative integer</td>
          <td>The size of the read.</td>
        </tr>
      </table>
    </emu-table>

    <emu-table id="table-writesharedmemory-fields" caption="WriteSharedMemory Event Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[Order]]</td>
          <td>~seq-cst~, ~unordered~, or ~init~</td>
          <td>The weakest ordering guaranteed by the memory model for the event.</td>
        </tr>
        <tr>
          <td>[[NoTear]]</td>
          <td>a Boolean</td>
          <td>Whether this event is allowed to be read from multiple read events with equal range as this event.</td>
        </tr>
        <tr>
          <td>[[Block]]</td>
          <td>a Shared Data Block</td>
          <td>The block the event operates on.</td>
        </tr>
        <tr>
          <td>[[ByteIndex]]</td>
          <td>a non-negative integer</td>
          <td>The byte address of the write in [[Block]].</td>
        </tr>
        <tr>
          <td>[[ElementSize]]</td>
          <td>a non-negative integer</td>
          <td>The size of the write.</td>
        </tr>
        <tr>
          <td>[[Payload]]</td>
          <td>a List of byte values</td>
          <td>The List of byte values to be read by other events.</td>
        </tr>
      </table>
    </emu-table>

    <emu-table id="table-rmwsharedmemory-fields" caption="ReadModifyWriteSharedMemory Event Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[Order]]</td>
          <td>~seq-cst~</td>
          <td>Read-modify-write events are always sequentially consistent.</td>
        </tr>
        <tr>
          <td>[[NoTear]]</td>
          <td>*true*</td>
          <td>Read-modify-write events cannot tear.</td>
        </tr>
        <tr>
          <td>[[Block]]</td>
          <td>a Shared Data Block</td>
          <td>The block the event operates on.</td>
        </tr>
        <tr>
          <td>[[ByteIndex]]</td>
          <td>a non-negative integer</td>
          <td>The byte address of the read-modify-write in [[Block]].</td>
        </tr>
        <tr>
          <td>[[ElementSize]]</td>
          <td>a non-negative integer</td>
          <td>The size of the read-modify-write.</td>
        </tr>
        <tr>
          <td>[[Payload]]</td>
          <td>a List of byte values</td>
          <td>The List of byte values to be passed to [[ModifyOp]].</td>
        </tr>
        <tr>
          <td>[[ModifyOp]]</td>
          <td>a read-modify-write modification function</td>
          <td>An abstract closure that returns a modified List of byte values from a read List of byte values and [[Payload]].</td>
        </tr>
      </table>
    </emu-table>

    <p>These events are introduced by abstract operations or by methods on the Atomics object.</p>
    <p>Some operations may also introduce <dfn>Synchronize</dfn> events. A <dfn variants="Synchronize events">Synchronize event</dfn> has no fields, and exists purely to directly constrain the permitted orderings of other events.</p>
    <p>In addition to Shared Data Block and Synchronize events, there are host-specific events.</p>
    <p>Let the range of a ReadSharedMemory, WriteSharedMemory, or ReadModifyWriteSharedMemory event be the Set of contiguous integers from its [[ByteIndex]] to [[ByteIndex]] + [[ElementSize]] - 1. Two events' ranges are equal when the events have the same [[Block]], and the ranges are element-wise equal. Two events' ranges are overlapping when the events have the same [[Block]], the ranges are not equal and their intersection is non-empty. Two events' ranges are disjoint when the events do not have the same [[Block]] or their ranges are neither equal nor overlapping.</p>
    <emu-note>
      <p>Examples of host-specific synchronizing events that should be accounted for are: sending a SharedArrayBuffer from one agent to another (e.g., by `postMessage` in a browser), starting and stopping agents, and communicating within the agent cluster via channels other than shared memory. For a particular execution _execution_, those events are provided by the host via the host-synchronizes-with strict partial order. Additionally, hosts can add host-specific synchronizing events to _execution_.[[EventList]] so as to participate in the is-agent-order-before Relation.</p>
    </emu-note>
    <p>Events are ordered within candidate executions by the relations defined below.</p>
  </emu-clause>

  <emu-clause id="sec-agent-event-records">
    <h1>Agent Events Records</h1>
    <p>An <dfn variants="Agent Events Records">Agent Events Record</dfn> is a Record with the following fields.</p>
    <emu-table id="table-agent-events-records" caption="Agent Events Record Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[AgentSignifier]]</td>
          <td>an agent signifier</td>
          <td>The agent whose evaluation resulted in this ordering.</td>
        </tr>
        <tr>
          <td>[[EventList]]</td>
          <td>a List of events</td>
          <td>Events are appended to the list during evaluation.</td>
        </tr>
        <tr>
          <td>[[AgentSynchronizesWith]]</td>
          <td>a List of pairs of Synchronize events</td>
          <td>Synchronize relationships introduced by the operational semantics.</td>
        </tr>
      </table>
    </emu-table>
  </emu-clause>

  <emu-clause id="sec-chosen-value-records">
    <h1>Chosen Value Records</h1>
    <p>A <dfn variants="Chosen Value Records">Chosen Value Record</dfn> is a Record with the following fields.</p>
    <emu-table id="table-chosen-value-records" caption="Chosen Value Record Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[Event]]</td>
          <td>a Shared Data Block event</td>
          <td>The ReadSharedMemory or ReadModifyWriteSharedMemory event that was introduced for this chosen value.</td>
        </tr>
        <tr>
          <td>[[ChosenValue]]</td>
          <td>a List of byte values</td>
          <td>The bytes that were nondeterministically chosen during evaluation.</td>
        </tr>
      </table>
    </emu-table>
  </emu-clause>

  <emu-clause id="sec-candidate-executions">
    <h1>Candidate Executions</h1>
    <p>A <dfn variants="candidate executions">candidate execution</dfn> of the evaluation of an agent cluster is a Record with the following fields.</p>
    <emu-table id="table-candidate-execution-records" caption="Candidate Execution Record Fields">
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Value</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tr>
          <td>[[EventsRecords]]</td>
          <td>a List of Agent Events Records</td>
          <td>Maps an agent to Lists of events appended during the evaluation.</td>
        </tr>
        <tr>
          <td>[[ChosenValues]]</td>
          <td>a List of Chosen Value Records</td>
          <td>Maps ReadSharedMemory or ReadModifyWriteSharedMemory events to the List of byte values chosen during the evaluation.</td>
        </tr>
      </table>
    </emu-table>

    <p>An <dfn variants="empty candidate executions">empty candidate execution</dfn> is a candidate execution Record whose fields are empty Lists.</p>
  </emu-clause>

  <emu-clause id="sec-abstract-operations-for-the-memory-model" oldids="sec-synchronizeeventset">
    <h1>Abstract Operations for the Memory Model</h1>

    <emu-clause id="sec-event-set" type="abstract operation">
      <h1>
        EventSet (
          _execution_: a candidate execution,
        ): a Set of events
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _events_ be an empty Set.
        1. For each Agent Events Record _aer_ of _execution_.[[EventsRecords]], do
          1. For each event _E_ of _aer_.[[EventList]], do
            1. Add _E_ to _events_.
        1. Return _events_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-sharedatablockeventset" type="abstract operation">
      <h1>
        SharedDataBlockEventSet (
          _execution_: a candidate execution,
        ): a Set of events
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _events_ be an empty Set.
        1. For each event _E_ of EventSet(_execution_), do
          1. If _E_ is a ReadSharedMemory, WriteSharedMemory, or ReadModifyWriteSharedMemory event, add _E_ to _events_.
        1. Return _events_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-hosteventset" type="abstract operation">
      <h1>
        HostEventSet (
          _execution_: a candidate execution,
        ): a Set of events
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _events_ be an empty Set.
        1. For each event _E_ of EventSet(_execution_), do
          1. If _E_ is not in SharedDataBlockEventSet(_execution_), add _E_ to _events_.
        1. Return _events_.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-composewriteeventbytes" type="abstract operation">
      <h1>
        ComposeWriteEventBytes (
          _execution_: a candidate execution,
          _byteIndex_: a non-negative integer,
          _Ws_: a List of either WriteSharedMemory or ReadModifyWriteSharedMemory events,
        ): a List of byte values
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _byteLocation_ be _byteIndex_.
        1. Let _bytesRead_ be a new empty List.
        1. For each element _W_ of _Ws_, do
          1. Assert: _W_ has _byteLocation_ in its range.
          1. Let _payloadIndex_ be _byteLocation_ - _W_.[[ByteIndex]].
          1. If _W_ is a WriteSharedMemory event, then
            1. Let _byte_ be _W_.[[Payload]][_payloadIndex_].
          1. Else,
            1. Assert: _W_ is a ReadModifyWriteSharedMemory event.
            1. Let _bytes_ be ValueOfReadEvent(_execution_, _W_).
            1. Let _bytesModified_ be _W_.[[ModifyOp]](_bytes_, _W_.[[Payload]]).
            1. Let _byte_ be _bytesModified_[_payloadIndex_].
          1. Append _byte_ to _bytesRead_.
          1. Set _byteLocation_ to _byteLocation_ + 1.
        1. Return _bytesRead_.
      </emu-alg>
      <emu-note>
        <p>The read-modify-write modification [[ModifyOp]] is given by the function properties on the Atomics object that introduce ReadModifyWriteSharedMemory events.</p>
      </emu-note>
      <emu-note>
        <p>This abstract operation composes a List of write events into a List of byte values. It is used in the event semantics of ReadSharedMemory and ReadModifyWriteSharedMemory events.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-valueofreadevent" type="abstract operation">
      <h1>
        ValueOfReadEvent (
          _execution_: a candidate execution,
          _R_: a ReadSharedMemory or ReadModifyWriteSharedMemory event,
        ): a List of byte values
      </h1>
      <dl class="header">
      </dl>
      <emu-alg>
        1. Let _Ws_ be reads-bytes-from(_R_) in _execution_.
        1. Assert: _Ws_ is a List of WriteSharedMemory or ReadModifyWriteSharedMemory events with length equal to _R_.[[ElementSize]].
        1. Return ComposeWriteEventBytes(_execution_, _R_.[[ByteIndex]], _Ws_).
      </emu-alg>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-relations-of-candidate-executions">
    <h1>Relations of Candidate Executions</h1>

    <p>The following relations and mathematical functions are parameterized over a particular candidate execution and order its events.</p>

    <emu-clause id="sec-agent-order">
      <h1>is-agent-order-before</h1>
      <p>For a candidate execution _execution_, its <dfn>is-agent-order-before</dfn> Relation is the least Relation on events that satisfies the following.</p>
      <ul>
        <li>For events _E_ and _D_, _E_ is-agent-order-before _D_ in _execution_ if there is some Agent Events Record _aer_ in _execution_.[[EventsRecords]] such that _aer_.[[EventList]] contains both _E_ and _D_ and _E_ is before _D_ in List order of _aer_.[[EventList]].</li>
      </ul>

      <emu-note>
        <p>Each agent introduces events in a per-agent strict total order during the evaluation. This is the union of those strict total orders.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-reads-bytes-from" aoid="reads-bytes-from">
      <h1>reads-bytes-from</h1>
      <p>For a candidate execution _execution_, its <em>reads-bytes-from</em> function is a mathematical function mapping events in SharedDataBlockEventSet(_execution_) to Lists of events in SharedDataBlockEventSet(_execution_) that satisfies the following conditions.</p>
      <ul>
        <li>
          <p>For each ReadSharedMemory or ReadModifyWriteSharedMemory event _R_ in SharedDataBlockEventSet(_execution_), reads-bytes-from(_R_) in _execution_ is a List of length _R_.[[ElementSize]] whose elements are WriteSharedMemory or ReadModifyWriteSharedMemory events _Ws_ such that all of the following are true.</p>
          <ul>
            <li>Each event _W_ with index _i_ in _Ws_ has _R_.[[ByteIndex]] + _i_ in its range.</li>
            <li>_R_ is not in _Ws_.</li>
          </ul>
        </li>
      </ul>
      <p>A candidate execution always admits a reads-bytes-from function.</p>
    </emu-clause>

    <emu-clause id="sec-reads-from">
      <h1>reads-from</h1>
      <p>For a candidate execution _execution_, its <dfn>reads-from</dfn> Relation is the least Relation on events that satisfies the following.</p>
      <ul>
        <li>For events _R_ and _W_, _R_ reads-from _W_ in _execution_ if SharedDataBlockEventSet(_execution_) contains both _R_ and _W_, and reads-bytes-from(_R_) in _execution_ contains _W_.</li>
      </ul>
    </emu-clause>

    <emu-clause id="sec-host-synchronizes-with">
      <h1>host-synchronizes-with</h1>
      <p>For a candidate execution _execution_, its <dfn>host-synchronizes-with</dfn> Relation is a host-provided strict partial order on host-specific events that satisfies at least the following.</p>
      <ul>
        <li>If _E_ host-synchronizes-with _D_ in _execution_, HostEventSet(_execution_) contains _E_ and _D_.</li>
        <li>There is no cycle in the union of host-synchronizes-with and is-agent-order-before in _execution_.</li>
      </ul>

      <emu-note>
        <p>For two host-specific events _E_ and _D_ in a candidate execution _execution_, _E_ host-synchronizes-with _D_ in _execution_ implies _E_ happens-before _D_ in _execution_.</p>
      </emu-note>
      <emu-note>
        <p>This Relation allows the host to provide additional synchronization mechanisms, such as `postMessage` between HTML workers.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-synchronizes-with">
      <h1>synchronizes-with</h1>
      <p>For a candidate execution _execution_, its <dfn>synchronizes-with</dfn> Relation is the least Relation on events that satisfies the following.</p>
      <ul>
        <li>
          For events _R_ and _W_, _W_ synchronizes-with _R_ in _execution_ if _R_ reads-from _W_ in _execution_, _R_.[[Order]] is ~seq-cst~, _W_.[[Order]] is ~seq-cst~, and _R_ and _W_ have equal ranges.
        </li>
        <li>
          For each element _eventsRecord_ of _execution_.[[EventsRecords]], the following is true.
          <ul>
            <li>For events _S_ and _Sw_, _S_ synchronizes-with _Sw_ in _execution_ if _eventsRecord_.[[AgentSynchronizesWith]] contains (_S_, _Sw_).</li>
          </ul>
        </li>
        <li>For events _E_ and _D_, _E_ synchronizes-with _D_ in _execution_ if _execution_.[[HostSynchronizesWith]] contains (_E_, _D_).</li>
      </ul>

      <emu-note>
        <p>Owing to convention in memory model literature, in a candidate execution _execution_, write events synchronizes-with read events, instead of read events synchronizes-with write events.</p>
      </emu-note>

      <emu-note>
        <p>In a candidate execution _execution_, ~init~ events do not participate in this Relation and are instead constrained directly by happens-before.</p>
      </emu-note>

      <emu-note>
        <p>In a candidate execution _execution_, not all ~seq-cst~ events related by reads-from are related by synchronizes-with. Only events that also have equal ranges are related by synchronizes-with.</p>
      </emu-note>

      <emu-note>
        <p>For Shared Data Block events _R_ and _W_ in a candidate execution _execution_ such that _W_ synchronizes-with _R_, _R_ may reads-from other writes than _W_.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-happens-before">
      <h1>happens-before</h1>
      <p>For a candidate execution _execution_, its <dfn>happens-before</dfn> Relation is the least Relation on events that satisfies the following.</p>

      <ul>
        <li>
          <p>For events _E_ and _D_, _E_ happens-before _D_ in _execution_ if any of the following conditions are true.</p>
          <ul>
            <li>_E_ is-agent-order-before _D_ in _execution_.</li>
            <li>_E_ synchronizes-with _D_ in _execution_.</li>
            <li>SharedDataBlockEventSet(_execution_) contains both _E_ and _D_, _E_.[[Order]] is ~init~, and _E_ and _D_ have overlapping ranges.</li>
            <li>There is an event _F_ such that _E_ happens-before _F_ and _F_ happens-before _D_ in _execution_.</li>
          </ul>
        </li>
      </ul>

      <emu-note>
        <p>Because happens-before is a superset of agent-order, a candidate execution is consistent with the single-thread evaluation semantics of ECMAScript.</p>
      </emu-note>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-properties-of-valid-executions">
    <h1>Properties of Valid Executions</h1>

    <emu-clause id="sec-valid-chosen-reads">
      <h1>Valid Chosen Reads</h1>
      <p>A candidate execution _execution_ has valid chosen reads if the following algorithm returns *true*.</p>
      <emu-alg>
        1. For each ReadSharedMemory or ReadModifyWriteSharedMemory event _R_ of SharedDataBlockEventSet(_execution_), do
          1. Let _chosenValueRecord_ be the element of _execution_.[[ChosenValues]] whose [[Event]] field is _R_.
          1. Let _chosenValue_ be _chosenValueRecord_.[[ChosenValue]].
          1. Let _readValue_ be ValueOfReadEvent(_execution_, _R_).
          1. Let _chosenLen_ be the number of elements in _chosenValue_.
          1. Let _readLen_ be the number of elements in _readValue_.
          1. If _chosenLen_ ≠ _readLen_, then
            1. Return *false*.
          1. If _chosenValue_[_i_] ≠ _readValue_[_i_] for some integer _i_ in the interval from 0 (inclusive) to _chosenLen_ (exclusive), then
            1. Return *false*.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-coherent-reads">
      <h1>Coherent Reads</h1>
      <p>A candidate execution _execution_ has coherent reads if the following algorithm returns *true*.</p>
      <emu-alg>
        1. For each ReadSharedMemory or ReadModifyWriteSharedMemory event _R_ of SharedDataBlockEventSet(_execution_), do
          1. Let _Ws_ be reads-bytes-from(_R_) in _execution_.
          1. Let _byteLocation_ be _R_.[[ByteIndex]].
          1. For each element _W_ of _Ws_, do
            1. If _R_ happens-before _W_ in _execution_, then
              1. Return *false*.
            1. If there exists a WriteSharedMemory or ReadModifyWriteSharedMemory event _V_ that has _byteLocation_ in its range such that _W_ happens-before _V_ in _execution_ and _V_ happens-before _R_ in _execution_, then
              1. Return *false*.
            1. Set _byteLocation_ to _byteLocation_ + 1.
        1. Return *true*.
      </emu-alg>
    </emu-clause>

    <emu-clause id="sec-tear-free-aligned-reads">
      <h1>Tear Free Reads</h1>
      <p>A candidate execution _execution_ has tear free reads if the following algorithm returns *true*.</p>
      <emu-alg>
        1. For each ReadSharedMemory or ReadModifyWriteSharedMemory event _R_ of SharedDataBlockEventSet(_execution_), do
          1. If _R_.[[NoTear]] is *true*, then
            1. Assert: The remainder of dividing _R_.[[ByteIndex]] by _R_.[[ElementSize]] is 0.
            1. For each event _W_ such that _R_ reads-from _W_ in _execution_ and _W_.[[NoTear]] is *true*, do
              1. If _R_ and _W_ have equal ranges and there exists an event _V_ such that _V_ and _W_ have equal ranges, _V_.[[NoTear]] is *true*, _W_ and _V_ are not the same Shared Data Block event, and _R_ reads-from _V_ in _execution_, then
                1. Return *false*.
        1. Return *true*.
      </emu-alg>

      <emu-note>
        <p>An event's [[NoTear]] field is *true* when that event was introduced via accessing an integer TypedArray, and *false* when introduced via accessing a floating point TypedArray or DataView.</p>
        <p>Intuitively, this requirement says when a memory range is accessed in an aligned fashion via an integer TypedArray, a single write event on that range must "win" when in a data race with other write events with equal ranges. More precisely, this requirement says an aligned read event cannot read a value composed of bytes from multiple, different write events all with equal ranges. It is possible, however, for an aligned read event to read from multiple write events with overlapping ranges.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-memory-order">
      <h1>Sequentially Consistent Atomics</h1>
      <p>For a candidate execution _execution_, <dfn>is-memory-order-before</dfn> is a strict total order of all events in EventSet(_execution_) that satisfies the following.</p>
      <ul>
        <li>For events _E_ and _D_, _E_ is-memory-order-before _D_ in _execution_ if _E_ happens-before _D_ in _execution_.</li>
        <li>
          <p>For events _R_ and _W_ such that _R_ reads-from _W_ in _execution_, there is no WriteSharedMemory or ReadModifyWriteSharedMemory event _V_ in SharedDataBlockEventSet(_execution_) such that _V_.[[Order]] is ~seq-cst~, _W_ is-memory-order-before _V_ in _execution_, _V_ is-memory-order-before _R_ in _execution_, and any of the following conditions are true.</p>
          <ul>
            <li>_W_ synchronizes-with _R_ in _execution_, and _V_ and _R_ have equal ranges.</li>
            <li>_W_ happens-before _R_ and _V_ happens-before _R_ in _execution_, _W_.[[Order]] is ~seq-cst~, and _W_ and _V_ have equal ranges.</li>
            <li>_W_ happens-before _R_ and _W_ happens-before _V_ in _execution_, _R_.[[Order]] is ~seq-cst~, and _V_ and _R_ have equal ranges.</li>
          </ul>
          <emu-note>
            <p>This clause additionally constrains ~seq-cst~ events on equal ranges.</p>
          </emu-note>
        </li>
        <li>
          <p>For each WriteSharedMemory or ReadModifyWriteSharedMemory event _W_ in SharedDataBlockEventSet(_execution_), if _W_.[[Order]] is ~seq-cst~, then it is not the case that there is an infinite number of ReadSharedMemory or ReadModifyWriteSharedMemory events in SharedDataBlockEventSet(_execution_) with equal range that is memory-order before _W_.</p>
          <emu-note>
            <p>This clause together with the forward progress guarantee on agents ensure the liveness condition that ~seq-cst~ writes become visible to ~seq-cst~ reads with equal range in finite time.</p>
          </emu-note>
        </li>
      </ul>
      <p>A candidate execution has sequentially consistent atomics if it admits an is-memory-order-before Relation.</p>

      <emu-note>
        <p>While is-memory-order-before includes all events in EventSet(_execution_), those that are not constrained by happens-before or synchronizes-with in _execution_ are allowed to occur anywhere in the order.</p>
      </emu-note>
    </emu-clause>

    <emu-clause id="sec-valid-executions">
      <h1>Valid Executions</h1>
      <p>A candidate execution _execution_ is a valid execution (or simply an execution) if all of the following are true.</p>
      <ul>
        <li>The host provides a host-synchronizes-with Relation for _execution_.</li>
        <li>_execution_ admits a happens-before Relation that is a strict partial order.</li>
        <li>_execution_ has valid chosen reads.</li>
        <li>_execution_ has coherent reads.</li>
        <li>_execution_ has tear free reads.</li>
        <li>_execution_ has sequentially consistent atomics.</li>
      </ul>
      <p>All programs have at least one valid execution.</p>
    </emu-clause>
  </emu-clause>

  <emu-clause id="sec-races">
    <h1>Races</h1>
    <p>For an execution _execution_ and events _E_ and _D_ that are contained in SharedDataBlockEventSet(_execution_), _E_ and _D_ are in a <em>race</em> if the following algorithm returns *true*.</p>
    <emu-alg>
      1. If _E_ and _D_ are not the same Shared Data Block event, then
        1. If it is not the case that both _E_ happens-before _D_ in _execution_ and _D_ happens-before _E_ in _execution_, then
          1. If _E_ and _D_ are both WriteSharedMemory or ReadModifyWriteSharedMemory events and _E_ and _D_ do not have disjoint ranges, then
            1. Return *true*.
          1. If _E_ reads-from _D_ in _execution_ or _D_ reads-from _E_ in _execution_, then
            1. Return *true*.
      1. Return *false*.
    </emu-alg>
  </emu-clause>

  <emu-clause id="sec-data-races">
    <h1>Data Races</h1>
    <p>For an execution _execution_ and events _E_ and _D_ that are contained in SharedDataBlockEventSet(_execution_), _E_ and _D_ are in a <dfn>data race</dfn> if the following algorithm returns *true*.</p>
    <emu-alg>
      1. If _E_ and _D_ are in a <emu-xref href="#sec-races">race</emu-xref> in _execution_, then
        1. If _E_.[[Order]] is not ~seq-cst~ or _D_.[[Order]] is not ~seq-cst~, then
          1. Return *true*.
        1. If _E_ and _D_ have overlapping ranges, then
          1. Return *true*.
      1. Return *false*.
    </emu-alg>
  </emu-clause>

  <emu-clause id="sec-data-race-freedom">
    <h1>Data Race Freedom</h1>
    <p>An execution _execution_ is <dfn>data race free</dfn> if there are no two events in SharedDataBlockEventSet(_execution_) that are in a data race.</p>
    <p>A program is data race free if all its executions are data race free.</p>
    <p>The memory model guarantees sequential consistency of all events for data race free programs.</p>
  </emu-clause>

  <emu-clause id="sec-shared-memory-guidelines">
    <h1>Shared Memory Guidelines</h1>
    <emu-note>
      <p>The following are guidelines for ECMAScript programmers working with shared memory.</p>
      <p>We recommend programs be kept data race free, i.e., make it so that it is impossible for there to be concurrent non-atomic operations on the same memory location. Data race free programs have interleaving semantics where each step in the evaluation semantics of each agent are interleaved with each other. For data race free programs, it is not necessary to understand the details of the memory model. The details are unlikely to build intuition that will help one to better write ECMAScript.</p>
      <p>More generally, even if a program is not data race free it may have predictable behaviour, so long as atomic operations are not involved in any data races and the operations that race all have the same access size. The simplest way to arrange for atomics not to be involved in races is to ensure that different memory cells are used by atomic and non-atomic operations and that atomic accesses of different sizes are not used to access the same cells at the same time. Effectively, the program should treat shared memory as strongly typed as much as possible. One still cannot depend on the ordering and timing of non-atomic accesses that race, but if memory is treated as strongly typed the racing accesses will not "tear" (bits of their values will not be mixed).</p>
    </emu-note>

    <emu-note>
      <p>The following are guidelines for ECMAScript implementers writing compiler transformations for programs using shared memory.</p>
      <p>It is desirable to allow most program transformations that are valid in a single-agent setting in a multi-agent setting, to ensure that the performance of each agent in a multi-agent program is as good as it would be in a single-agent setting. Frequently these transformations are hard to judge. We outline some rules about program transformations that are intended to be taken as normative (in that they are implied by the memory model or stronger than what the memory model implies) but which are likely not exhaustive. These rules are intended to apply to program transformations that precede the introductions of the events that make up the is-agent-order-before Relation.</p>
      <p>Let an <dfn variants="agent-order slices">agent-order slice</dfn> be the subset of the is-agent-order-before Relation pertaining to a single agent.</p>
      <p>Let <dfn>possible read values</dfn> of a read event be the set of all values of ValueOfReadEvent for that event across all valid executions.</p>
      <p>Any transformation of an agent-order slice that is valid in the absence of shared memory is valid in the presence of shared memory, with the following exceptions.</p>
      <ul>
        <li>
          <p><em>Atomics are carved in stone</em>: Program transformations must not cause the ~seq-cst~ events in an agent-order slice to be reordered with its ~unordered~ operations, nor its ~seq-cst~ operations to be reordered with each other, nor may a program transformation remove a ~seq-cst~ operation from the is-agent-order-before Relation.</p>
          <p>(In practice, the prohibition on reorderings forces a compiler to assume that every ~seq-cst~ operation is a synchronization and included in the final is-memory-order-before Relation, which it would usually have to assume anyway in the absence of inter-agent program analysis. It also forces the compiler to assume that every call where the callee's effects on the memory-order are unknown may contain ~seq-cst~ operations.)</p>
        </li>
        <li>
          <p><em>Reads must be stable</em>: Any given shared memory read must only observe a single value in an execution.</p>
          <p>(For example, if what is semantically a single read in the program is executed multiple times then the program is subsequently allowed to observe only one of the values read. A transformation known as rematerialization can violate this rule.)</p>
        </li>
        <li>
          <p><em>Writes must be stable</em>: All observable writes to shared memory must follow from program semantics in an execution.</p>
          <p>(For example, a transformation may not introduce certain observable writes, such as by using read-modify-write operations on a larger location to write a smaller datum, writing a value to memory that the program could not have written, or writing a just-read value back to the location it was read from, if that location could have been overwritten by another agent after the read.)</p>
        </li>
        <li>
          <p><em>Possible read values must be non-empty</em>: Program transformations cannot cause the possible read values of a shared memory read to become empty.</p>
          <p>(Counterintuitively, this rule in effect restricts transformations on writes, because writes have force in memory model insofar as to be read by read events. For example, writes may be moved and coalesced and sometimes reordered between two ~seq-cst~ operations, but the transformation may not remove every write that updates a location; some write must be preserved.)</p>
        </li>
      </ul>
      <p>Examples of transformations that remain valid are: merging multiple non-atomic reads from the same location, reordering non-atomic reads, introducing speculative non-atomic reads, merging multiple non-atomic writes to the same location, reordering non-atomic writes to different locations, and hoisting non-atomic reads out of loops even if that affects termination. Note in general that aliased TypedArrays make it hard to prove that locations are different.</p>
    </emu-note>

    <emu-note>
      <p>The following are guidelines for ECMAScript implementers generating machine code for shared memory accesses.</p>
      <p>For architectures with memory models no weaker than those of ARM or Power, non-atomic stores and loads may be compiled to bare stores and loads on the target architecture. Atomic stores and loads may be compiled down to instructions that guarantee sequential consistency. If no such instructions exist, memory barriers are to be employed, such as placing barriers on both sides of a bare store or load. Read-modify-write operations may be compiled to read-modify-write instructions on the target architecture, such as <code>LOCK</code>-prefixed instructions on x86, load-exclusive/store-exclusive instructions on ARM, and load-link/store-conditional instructions on Power.</p>
      <p>Specifically, the memory model is intended to allow code generation as follows.</p>
      <ul>
        <li>Every atomic operation in the program is assumed to be necessary.</li>
        <li>Atomic operations are never rearranged with each other or with non-atomic operations.</li>
        <li>Functions are always assumed to perform atomic operations.</li>
        <li>Atomic operations are never implemented as read-modify-write operations on larger data, but as non-lock-free atomics if the platform does not have atomic operations of the appropriate size. (We already assume that every platform has normal memory access operations of every interesting size.)</li>
      </ul>
      <p>Naive code generation uses these patterns:</p>
      <ul>
        <li>Regular loads and stores compile to single load and store instructions.</li>
        <li>Lock-free atomic loads and stores compile to a full (sequentially consistent) fence, a regular load or store, and a full fence.</li>
        <li>Lock-free atomic read-modify-write accesses compile to a full fence, an atomic read-modify-write instruction sequence, and a full fence.</li>
        <li>Non-lock-free atomics compile to a spinlock acquire, a full fence, a series of non-atomic load and store instructions, a full fence, and a spinlock release.</li>
      </ul>
      <p>That mapping is correct so long as an atomic operation on an address range does not race with a non-atomic write or with an atomic operation of different size. However, that is all we need: the memory model effectively demotes the atomic operations involved in a race to non-atomic status. On the other hand, the naive mapping is quite strong: it allows atomic operations to be used as sequentially consistent fences, which the memory model does not actually guarantee.</p>
      <p>Local improvements to those basic patterns are also allowed, subject to the constraints of the memory model. For example:</p>
      <ul>
        <li>There are obvious platform-dependent improvements that remove redundant fences. For example, on x86 the fences around lock-free atomic loads and stores can always be omitted except for the fence following a store, and no fence is needed for lock-free read-modify-write instructions, as these all use <code>LOCK</code>-prefixed instructions. On many platforms there are fences of several strengths, and weaker fences can be used in certain contexts without destroying sequential consistency.</li>
        <li>Most modern platforms support lock-free atomics for all the data sizes required by ECMAScript atomics. Should non-lock-free atomics be needed, the fences surrounding the body of the atomic operation can usually be folded into the lock and unlock steps. The simplest solution for non-lock-free atomics is to have a single lock word per SharedArrayBuffer.</li>
        <li>There are also more complicated platform-dependent local improvements, requiring some code analysis. For example, two back-to-back fences often have the same effect as a single fence, so if code is generated for two atomic operations in sequence, only a single fence need separate them. On x86, even a single fence separating atomic stores can be omitted, as the fence following a store is only needed to separate the store from a subsequent load.</li>
      </ul>
    </emu-note>
  </emu-clause>

<h1 id="sec-grammar-summary"></h1>
