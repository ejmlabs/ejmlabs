# ejm-cli film source

This take shows the actual Rust TUI fixing a retry time limit in a disposable
Node project. A local replay file supplies fixed assistant replies. The native
CLI and harness run the shell, read the source, check its hash, patch the file
and run the same five tests again. No paid model or personal account is used.
The native header identifies offline replay and the granted tools.

## Selected take

Use `../../raw/cli/clean/terminal/frames.ffconcat`. It contains 1880 by 1040 PNG
states from a 100 column by 24 row terminal. Output is sampled at 10 Hz by the
public `@ejm/shots/recording` renderer. Held states retain their real duration.
`frames.json` gives each image and timestamp. The earlier full-output take is
retained in `../../raw/cli/terminal/`; a counts-only take is retained in
`../../raw/cli/compact/`.

The film uses terminal-emulator footage from the product's actual PTY output.
It does not record Terminal.app, draw a replacement product interface or use a
website simulation. IBM Plex Mono, colors and cell layout come from ejm-ui's
existing real-product capture pipeline. Native tool details keep their native
muted color.

The fixture's `./check` runs Node's built-in TAP reporter and prints its actual
failing case names and test counts through system `sed`. Bash `pipefail` keeps
the test command's exit status. It removes long stack traces from the visible
terminal. The unfiltered before and after test reports are saved here too.

## Evidence

- `capture.json`: the recorded binary hash, original source hashes, dimensions,
  method and scene times. Its source record predates the revision below.
- `source-manifest.json`: hashes of the revised archive, its revision record,
  and the historical build command. It does not claim a new build ran.
- `source-snapshot.tar.gz`: a revised reconstruction with 149 source and build
  files plus `PROJECT-SCOPE-REVISION.md`. It includes saved lock files and local
  harness crates. It is not the unchanged source of the recorded binary.
- `replies.json`: every deterministic assistant reply and tool request.
- `native-events.json`: the native durable journal, exported from the isolated
  captured session for inspection. This is evidence of the current development
  storage format, not a new supported SDK storage API.
- `workspace.diff` and `retry.after.mjs`: the real native patch result.
- `tests.before.txt` and `tests.after.txt`: unfiltered Node results, two failing
  tests before and five passing tests after.
- `../../raw/cli/clean/recording.json`: original timed terminal bytes.
- `../../raw/cli/clean/output.ansi`: the same output without timestamps.
- `../../raw/cli/clean/native-state/`: isolated native session database and tool
  artifacts. It contains only this fixture's replay session.

This is a historical development capture. Its original CLI source included working
changes over commit `07a6e1ab6479bbee39ad345aa08200d42e5db1f4`. It is not described
as a clean checkout or signed release. The harness source is a clean export of
`943aa862209101624421ca82745cc68642169647`. The original source hashes in
`capture.json` identify what ran.
The temporary snapshot lock file was resolved offline for the clean harness
publication's local package requirements, then the saved lock file was used for
the build. The original product working trees and their lock files were not
changed by capture.

On October 20, 2026, the retained archive was revised to remove obsolete product
identities. Package manifests now use `ejm.package.json`; the archived remote
registry address uses the reserved `https://registry.example.invalid` placeholder,
which is not a service. Current product source requires an explicit registry
origin. `source-manifest.json` records all revised file hashes and the original
and revised archive digests. The recorded binary, terminal output, timings, and
test results remain historical. The revised source has not been rebuilt or
recaptured, so those results do not verify it.

## Reproduce

The following commands rebuild and capture the revised source. They do not
reproduce the original binary byte for byte. Repeat the checks before making
claims about the revised build.

Use Node 24, Bash, system sed, Google Chrome and the Rust toolchain pinned by the
source. The shared workspace's existing node-pty and xterm dependencies must be
installed. No new runtime package is required for the recorder.

```sh
mkdir -p /tmp/cli-film-source
tar -xzf launch-videos/sources/cli/source-snapshot.tar.gz -C /tmp/cli-film-source
cd /tmp/cli-film-source/ejm-cli
cargo build --offline --locked --release --jobs 2 -p ejm-cli
```

The offline build needs the crates already cached. Remove `--offline` when
fetching the locked public crates for the first time. Then, from this repository:

```sh
EJM_CLI_BINARY=/tmp/cli-film-source/ejm-cli/target/release/ejm-cli \
  EJM_CLI_FILM_BUILD="$PWD/launch-videos/sources/cli" \
  node launch-videos/capture/cli.mjs --compact --clean
node launch-videos/capture/cli.mjs --render --compact --clean
```

`EJM_CLI_FILM_BUILD` supplies the saved `source-manifest.json`. The recorder creates a new
isolated home, state directory and fixture workspace for each take. It refuses
unexpected initial test results, a wrong patch, failed final tests or a binary
that changes during capture. The full PTY capture is capped at 60 seconds and
8 MiB. Run terminal renderers one at a time on a host.

The fixture and capture source belong to ejmlabs. Generic timed PTY recording,
terminal emulation, rendering, limits and cleanup belong to the public Node-only
`@ejm/shots/recording` export in ejm-ui. This work does not change the CLI's
public behavior, guides or live site, and it does not publish a film.
