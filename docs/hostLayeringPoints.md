# Host Layering Points
  <p>See <emu-xref href="#sec-hosts-and-implementations"></emu-xref> for the definition of host.</p>

  <emu-annex id="sec-host-hooks-summary">
    <h1>Host Hooks</h1>
    <p><b>HostCallJobCallback(...)</b></p>
    <p><b>HostEnqueueFinalizationRegistryCleanupJob(...)</b></p>
    <p><b>HostEnqueueGenericJob(...)</b></p>
    <p><b>HostEnqueuePromiseJob(...)</b></p>
    <p><b>HostEnqueueTimeoutJob(...)</b></p>
    <p><b>HostEnsureCanCompileStrings(...)</b></p>
    <p><b>HostFinalizeImportMeta(...)</b></p>
    <p><b>HostGetImportMetaProperties(...)</b></p>
    <p><b>HostGrowSharedArrayBuffer(...)</b></p>
    <p><b>HostHasSourceTextAvailable(...)</b></p>
    <p><b>HostLoadImportedModule(...)</b></p>
    <p><b>HostMakeJobCallback(...)</b></p>
    <p><b>HostPromiseRejectionTracker(...)</b></p>
    <p><b>HostResizeArrayBuffer(...)</b></p>
    <p><b>InitializeHostDefinedRealm(...)</b></p>
  </emu-annex>

  <emu-annex id="sec-host-defined-fields-summary">
    <h1>Host-defined Fields</h1>
    <p>[[HostDefined]] on Realm Records: See <emu-xref href="#table-realm-record-fields"></emu-xref>.</p>
    <p>[[HostDefined]] on Script Records: See <emu-xref href="#table-script-records"></emu-xref>.</p>
    <p>[[HostDefined]] on Module Records: See <emu-xref href="#table-module-record-fields"></emu-xref>.</p>
    <p>[[HostDefined]] on JobCallback Records: See <emu-xref href="#table-jobcallback-records"></emu-xref>.</p>
    <p>[[HostSynchronizesWith]] on Candidate Executions: See <emu-xref href="#table-candidate-execution-records"></emu-xref>.</p>
    <p>[[IsHTMLDDA]]: See <emu-xref href="#sec-IsHTMLDDA-internal-slot"></emu-xref>.</p>
  </emu-annex>

  <emu-annex id="sec-host-defined-objects-summary">
    <h1>Host-defined Objects</h1>
    <p>The global object: See clause <emu-xref href="#sec-global-object"></emu-xref>.</p>
  </emu-annex>

  <emu-annex id="sec-host-running-jobs">
    <h1>Running Jobs</h1>
    <p>Preparation steps before, and cleanup steps after, invocation of Job Abstract Closures. See <emu-xref href="#sec-jobs"></emu-xref>.</p>
  </emu-annex>

  <emu-annex id="sec-host-internal-methods-of-exotic-objects">
    <h1>Internal Methods of Exotic Objects</h1>
    <p>Any of the essential internal methods in <emu-xref href="#table-essential-internal-methods"></emu-xref> for any exotic object not specified within this specification.</p>
  </emu-annex>

  <emu-annex id="sec-host-built-in-objects-and-methods">
    <h1>Built-in Objects and Methods</h1>
    <p>Any built-in objects and methods not defined within this specification, except as restricted in <emu-xref href="#sec-forbidden-extensions"></emu-xref>.</p>
  </emu-annex>

<h1 id="sec-corrections-and-clarifications-in-ecmascript-2015-with-possible-compatibility-impact"></h1>
