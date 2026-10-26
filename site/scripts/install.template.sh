#!/bin/sh
# ejmlabs install script. Generated from releases.json when the site is built: the versions,
# URLs and SHA-256 digests below are the ones listed on https://ejmlabs.com/download/.
#
#   curl --proto '=https' --tlsv1.2 -fsSL https://ejmlabs.com/install.sh | sh -s -- cli
#   curl --proto '=https' --tlsv1.2 -fsSL https://ejmlabs.com/install.sh | sh -s -- worker
#
# Installs one file into $HOME/.local/bin. It needs no elevated privileges, edits no shell
# startup files, and never runs the downloaded program. Add --dry-run to see the plan without downloading or installing.
#
# The whole body is one function called on the last line, so a truncated download runs nothing.

say() { printf '%s\n' "$*"; }
fail() { printf 'install.sh: %s\n' "$*" >&2; }

usage() {
  say "Usage: sh install.sh [--dry-run] cli|worker"
  say "  cli     ejm-cli"
  say "  worker  ejm-harness-worker"
}

cleanup() {
  [ -z "${tmp:-}" ] || rm -rf "$tmp"
  [ -z "${staged:-}" ] || rm -f "$staged"
}

sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sum=$(sha256sum "$1") || return 1
  elif command -v shasum >/dev/null 2>&1; then
    sum=$(shasum -a 256 "$1") || return 1
  else
    return 1
  fi
  printf '%s\n' "${sum%% *}"
}

main() {
  umask 077
  dry_run=0
  product=
  for arg in "$@"; do
    case "$arg" in
      --dry-run) dry_run=1 ;;
      -h | --help) usage; return 0 ;;
      cli | worker) product=$arg ;;
      *) fail "unknown argument: $arg"; usage >&2; return 2 ;;
    esac
  done
  if [ -z "$product" ]; then
    usage >&2
    return 2
  fi

  os=$(uname -s)
  cpu=$(uname -m)
  case "$os/$cpu" in
    Linux/x86_64 | Linux/amd64) target=linux-x86_64 ;;
    Darwin/arm64 | Darwin/aarch64) target=darwin-aarch64 ;;
    Darwin/x86_64) target=darwin-x86_64 ;;
    *) target=unlisted ;;
  esac

  file=
  case "$product/$target" in
    #CASES#
    *)
      fail "no $product build is listed for $os $cpu."
      say "Listed builds: #AVAILABLE#" >&2
      say "See https://ejmlabs.com/download/ for what is available." >&2
      return 1
      ;;
  esac

  if [ -z "${HOME:-}" ]; then
    fail "HOME is not set."
    return 1
  fi
  dest="$HOME/.local/bin"

  say "$bin $version for $target"
  say "  from $url"
  say "  sha256 $sha256"
  say "  to $dest/$bin"
  if [ "$dry_run" -eq 1 ]; then
    say "Dry run: nothing was downloaded or installed."
    return 0
  fi

  if ! command -v curl >/dev/null 2>&1; then
    fail "curl is required."
    return 1
  fi
  if ! sha256_of /dev/null >/dev/null 2>&1; then
    fail "sha256sum or shasum is required to check the download. Nothing was installed."
    return 1
  fi

  tmp=$(mktemp -d "${TMPDIR:-/tmp}/ejmlabs-install.XXXXXX") || { fail "could not make a temporary directory."; return 1; }
  staged=
  trap cleanup EXIT
  trap 'exit 1' HUP INT TERM

  curl --proto '=https' --tlsv1.2 -fsSL -o "$tmp/$file" "$url" || { fail "download failed. Nothing was installed."; return 1; }
  actual=$(sha256_of "$tmp/$file") || { fail "could not compute the checksum. Nothing was installed."; return 1; }
  if [ "$actual" != "$sha256" ]; then
    fail "checksum mismatch for $file."
    fail "  expected $sha256"
    fail "  got      $actual"
    fail "Nothing was installed."
    return 1
  fi

  mkdir "$tmp/x"
  if ! tar -xzf "$tmp/$file" -C "$tmp/x"; then
    fail "could not unpack $file. Nothing was installed."
    return 1
  fi
  found=$(find "$tmp/x" -type f -name "$bin" | head -n 1)
  if [ -z "$found" ]; then
    fail "$bin is not in $file. Nothing was installed."
    return 1
  fi

  if ! (umask 022 && mkdir -p "$dest"); then
    fail "could not create $dest."
    return 1
  fi
  staged="$dest/.$bin.new.$$"
  if ! { cp "$found" "$staged" && chmod 0755 "$staged" && mv -f "$staged" "$dest/$bin"; }; then
    fail "could not install into $dest."
    return 1
  fi
  staged=

  say "Installed $bin $version to $dest/$bin."
  if [ "$notarized" != 1 ]; then
    say "This build is not signed with a developer certificate and is not notarized."
  fi
  case ":${PATH:-}:" in
    *":$dest:"*) ;;
    *) say "$dest is not on your PATH. Add it with: export PATH=\"\$HOME/.local/bin:\$PATH\"" ;;
  esac
}

main "$@"
