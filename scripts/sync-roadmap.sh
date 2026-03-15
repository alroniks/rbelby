#!/bin/bash

# ==============================================================================
# GitHub Roadmap Sync Script
# ==============================================================================
# This script reads the markdown files in docs/specs/ and creates GitHub Issues
# for each specification, effectively building your Roadmap.
#
# PREREQUISITES:
# 1. You must have the GitHub CLI installed (`brew install gh` on macOS)
# 2. You must be logged in (`gh auth login`)
#
# USAGE:
# ./scripts/sync-roadmap.sh
# ==============================================================================

# Ensure gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI ('gh') is not installed."
    echo "Please install it (e.g., 'brew install gh') and run 'gh auth login' first."
    exit 1
fi

SPECS_DIR="docs/specs"

if [ ! -d "$SPECS_DIR" ]; then
    echo "❌ Error: Directory $SPECS_DIR does not exist."
    exit 1
fi

echo "🚀 Starting Roadmap Sync with GitHub..."

# Iterate over all spec files
for spec_file in "$SPECS_DIR"/*.md; do

    # Extract the Title (Assuming it's the first # H1)
    TITLE=$(grep -m 1 "^# " "$spec_file" | sed 's/^# Feature Specification: //' | sed 's/^# //')

    # Extract the Feature ID
    FEATURE_ID=$(grep -m 1 "^\*\*Feature\*\*:" "$spec_file" | sed -E 's/\*\*Feature\*\*: `(.*)`/\1/')

    if [ -z "$TITLE" ] || [ -z "$FEATURE_ID" ]; then
        echo "⚠️ Skipping $spec_file - Could not parse Title or Feature ID."
        continue
    fi

    # Check if an issue with this Feature ID already exists
    EXISTING_ISSUE=$(gh issue list --search "$FEATURE_ID in:body" --state all --json number --jq '.[0].number')

    # Construct the body of the issue
    BODY="### Specification: [$TITLE]($spec_file)\n\n**Feature ID**: \`$FEATURE_ID\`\n\nThis issue tracks the implementation of the $TITLE feature. Please refer to the linked specification document for User Scenarios and Technical Details.\n\n### Implementation Tasks:\n\n"

    # Append the tasks from the markdown file to the issue body
    TASKS=$(awk '/## Implementation Tasks/{flag=1; next} /^## /{flag=0} flag' "$spec_file")
    BODY+="$TASKS"

    if [ -n "$EXISTING_ISSUE" ]; then
        echo "ℹ️ Issue already exists for [$TITLE] (Issue #$EXISTING_ISSUE). Skipping creation."
        # Optional: You could add logic here to update the existing issue if needed
        # gh issue edit $EXISTING_ISSUE --body "$BODY"
    else
        echo "✨ Creating new Issue for: $TITLE"
        # Create the issue
        NEW_ISSUE_URL=$(gh issue create --title "Feature: $TITLE" --body "$BODY" --label "enhancement")
        echo "   ✅ Created: $NEW_ISSUE_URL"
    fi

done

echo ""
echo "🎉 Sync Complete!"
echo "Next Steps:"
echo "1. Go to your GitHub repository -> Projects."
echo "2. Add these newly created issues to your Roadmap board."
