source "$(dirname "$0")/utils.sh"

check_commit_template

ts-node "$(dirname "$0")/commit-tense-check.ts" "$1" || {
  if check_internet_connection; then
    echo "Commit message tense error. Please refer to the guidelines in your browser."
    open_in_browser "$COMMIT_TEMPLATE_FILE"
  fi
  
  exit 1
}
