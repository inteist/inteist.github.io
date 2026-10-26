#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
test_root="$(mktemp -d)"
trap 'rm -rf "$test_root"' EXIT

export HOME="$test_root/home"
export XDG_CONFIG_HOME="$HOME/.config"
export GIT_CONFIG_NOSYSTEM=1
export LC_ALL=C
mkdir -p "$HOME" "$test_root/bin" "$test_root/inteist.com.main/scripts"
cp "$script_dir/deploy-site.sh" "$test_root/inteist.com.main/scripts/"

assert_equal() {
  if [[ "$1" != "$2" ]]; then
    printf 'FAIL: %s (expected <%s>, got <%s>)\n' "$3" "$1" "$2" >&2
    exit 1
  fi
}

assert_contains() {
  if ! grep -Fq "$1" "$2"; then
    printf 'FAIL: expected <%s> in %s\n' "$1" "$2" >&2
    exit 1
  fi
}

command -v rg > /dev/null

cat > "$test_root/bin/npm" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
[[ "$*" == "run build" ]]
mkdir -p ../inteist.com.html/feed
printf '<urlset/>\n' > ../inteist.com.html/sitemap.xml
printf '<feed/>\n' > ../inteist.com.html/feed/index.xml
printf '<html>Generated site</html>\n' > ../inteist.com.html/index.html
STUB
cat > "$test_root/bin/imgoptim" <<'STUB'
#!/usr/bin/env bash
exit 0
STUB
chmod +x "$test_root/bin/npm" "$test_root/bin/imgoptim"
export PATH="$test_root/bin:$PATH"

publish_root="$test_root/inteist.com.html"
remote_root="$test_root/origin.git"
git init --quiet --bare --initial-branch=main "$remote_root"
git init --quiet --initial-branch=main "$publish_root"
git -C "$publish_root" config user.name 'Deploy Test'
git -C "$publish_root" config user.email 'deploy-test@example.invalid'
printf 'Initial content\n' > "$publish_root/seed.txt"
git -C "$publish_root" add seed.txt
git -C "$publish_root" commit --quiet -m 'Initial commit'
git -C "$publish_root" remote add origin "$remote_root"
git -C "$publish_root" push --quiet origin HEAD:main
initial_head="$(git -C "$publish_root" rev-parse HEAD)"

cat > "$publish_root/.git/hooks/pre-commit" <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail
printf 'commit\n' >> .git/commit-attempts
HOOK
cat > "$remote_root/hooks/pre-receive" <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail
printf 'push\n' >> push-attempts
if [[ ! -f rejected-once ]]; then
  touch rejected-once
  echo 'Simulated first push failure' >&2
  exit 1
fi
HOOK
chmod +x "$publish_root/.git/hooks/pre-commit" "$remote_root/hooks/pre-receive"

message='Publish site: exact supplied message "with quotes"'
deploy_script="$test_root/inteist.com.main/scripts/deploy-site.sh"
if bash "$deploy_script" "$message" > "$test_root/first.log" 2>&1; then
  echo 'FAIL: first deployment must fail at push' >&2
  exit 1
fi
assert_contains 'Simulated first push failure' "$test_root/first.log"
committed_head="$(git -C "$publish_root" rev-parse HEAD)"
assert_equal 2 "$(git -C "$publish_root" rev-list --count HEAD)" 'first run commits generated output'
assert_equal "$message" "$(git -C "$publish_root" log -1 --format=%B)" 'supplied commit message is preserved exactly'
assert_equal "$initial_head" "$(git --git-dir="$remote_root" rev-parse main)" 'failed push leaves remote unchanged'
assert_equal 1 "$(wc -l < "$publish_root/.git/commit-attempts" | tr -d ' ')" 'commit hook runs'
assert_equal 1 "$(wc -l < "$remote_root/push-attempts" | tr -d ' ')" 'first push reaches remote hook'

bash "$deploy_script" "$message" > "$test_root/second.log" 2>&1
assert_contains 'No generated changes to deploy.' "$test_root/second.log"
assert_equal "$committed_head" "$(git -C "$publish_root" rev-parse HEAD)" 'retry does not create a commit'
assert_equal "$committed_head" "$(git --git-dir="$remote_root" rev-parse main)" 'retry pushes existing commit'
assert_equal 2 "$(wc -l < "$remote_root/push-attempts" | tr -d ' ')" 'retry reaches remote hook again'

bash "$deploy_script" "$message" > "$test_root/third.log" 2>&1
assert_contains 'No generated changes to deploy.' "$test_root/third.log"
assert_contains 'Everything up-to-date' "$test_root/third.log"
assert_equal "$committed_head" "$(git -C "$publish_root" rev-parse HEAD)" 'third run does not create a commit'
assert_equal "$committed_head" "$(git --git-dir="$remote_root" rev-parse main)" 'third run leaves remote current'
assert_equal 2 "$(git -C "$publish_root" rev-list --count HEAD)" 'only one generated commit exists'
assert_equal 1 "$(wc -l < "$publish_root/.git/commit-attempts" | tr -d ' ')" 'no further commit hooks run'
assert_equal '' "$(git -C "$publish_root" status --porcelain)" 'publish worktree stays clean'

printf 'PASS: failed push is retried without generated changes or extra commits; exact supplied message preserved.\n'
