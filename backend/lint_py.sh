#!/usr/bin/env bash

# any file with a path including a directory in IGNORED_PATHS is ignored
# ex. foo/external/some_file.py is ignored, but
#     foo/world_domination.py is not
IGNORED_PATHS=(
  static
)

FIND_CMD=(
    find . -name '*.py'
)

for path in "${IGNORED_PATHS[@]}"; do
  FIND_CMD+=(-not \( -path "*/${path}/*" -prune \) )
done
"${FIND_CMD[@]}" | xargs pylint -j 0 --fail-under 5
lint_success=$?

black --check .
black_success=$?

if [ $lint_success -ne 0 ]; then
  exit 1
fi

if [ $black_success -ne 0 ]; then
  echo "Please run 'black' on your changes"
  exit 1
fi