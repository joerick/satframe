#!/bin/sh

rsync -av --exclude='env' --exclude='*.pyc' --exclude='*.pyo' --exclude='*.pyd' --exclude='node_modules' ./ joerick@satframe.local:~/satframe-dev/
