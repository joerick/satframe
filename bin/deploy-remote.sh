#!/bin/bash

# Usage: ./deploy-remote.sh <username> <ip-address>

set -e # Exit immediately if a command exits with a non-zero status

# 1. Validate Arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <username> <hostname_or_ip>"
    echo "Example: $0 joerick 192.168.1.15"
    exit 1
fi

REMOTE_USER=$1
REMOTE_HOST=$2
LOCAL_SCRIPT="bin/deploy.sh"
REMOTE_SCRIPT="deploy.sh"

# 2. Ensure the deploy script exists locally
if [ ! -f "$LOCAL_SCRIPT" ]; then
    echo "Error: '$LOCAL_SCRIPT' not found in the current directory."
    echo "Please ensure you are running this from the project root."
    exit 1
fi

echo "--- 🚀 Starting Deployment to $REMOTE_HOST ---"

# 3. Copy the script to the remote machine
echo "📦 Uploading $LOCAL_SCRIPT..."
scp "$LOCAL_SCRIPT" "${REMOTE_USER}@${REMOTE_HOST}:~/$REMOTE_SCRIPT"

# 4. Execute the script remotely
echo "🔧 Executing setup on remote machine..."
echo "   (You may be asked for your sudo password)"

# -t forces a pseudo-terminal allocation, allowing sudo to ask for a password
ssh -t "${REMOTE_USER}@${REMOTE_HOST}" "chmod +x ~/$REMOTE_SCRIPT && sudo ~/$REMOTE_SCRIPT"

echo "--- ✅ Deployment Triggered Successfully ---"