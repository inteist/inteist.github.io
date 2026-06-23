#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
source_root="$(cd "$script_dir/.." && pwd)"
publish_root="$(cd "$source_root/../inteist.com.html" && pwd)"
commit_message="${1:-blog update}"

echo "Building site assets and Jekyll output..."
pushd "$source_root" > /dev/null
npm run build
popd > /dev/null

echo "Optimizing generated images..."
pushd "$publish_root" > /dev/null
if command -v imgoptim >/dev/null 2>&1; then
  imgoptim > /dev/null 2>&1
else
  echo "imgoptim not found, skipping image optimization."
fi
popd > /dev/null

echo "Validating generated SEO output..."
if rg -n "https?://(localhost|127\.0\.0\.1)(:[0-9]+)?" "$publish_root/sitemap.xml" "$publish_root/feed/index.xml" "$publish_root/index.html" > /dev/null; then
  echo "Refusing to deploy because generated output still contains local URLs." >&2
  exit 1
fi

echo "Preparing publish repo commit..."
pushd "$publish_root" > /dev/null
git add -A

if git diff --cached --quiet; then
  echo "No generated changes to deploy."
  popd > /dev/null
  exit 0
fi

git commit -m "$commit_message"

git push origin HEAD:main
popd > /dev/null

echo "Deploy complete."
