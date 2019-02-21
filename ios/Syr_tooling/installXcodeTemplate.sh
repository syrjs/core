#!/usr/bin/env sh

# Configuration
XCODE_SYR_TEMPLATE_DIR=$HOME'/Library/Developer/Xcode/Templates/File Templates/Syr'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Copy RIBs file templates into the local SYRs template directory
importSyrXcodeTemplate () {
  echo "==> Copying up Syr Xcode file templates..."

  if [ -d "$XCODE_SYR_TEMPLATE_DIR" ]; then
    rm -R "$XCODE_SYR_TEMPLATE_DIR"
  fi
  mkdir -p "$XCODE_SYR_TEMPLATE_DIR"

  cp -R $SCRIPT_DIR/*.xctemplate "$XCODE_SYR_TEMPLATE_DIR"
}

importSyrXcodeTemplate

echo "==> ... success!"
echo "==> Syr have been set up. In Xcode, select 'New File...' to use Syr templates."
