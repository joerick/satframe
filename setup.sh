#!/bin/bash

cd "$(dirname "$0")"


if [ ! -d "env" ]; then
    echo "Creating virtual environment"
    python3 -m venv env
fi

source env/bin/activate

# deps from piwheels
sudo apt install libwebpmux3 libwebpdemux2 liblcms2-2 libopenjp2-7 libopenblas0-pthread libgfortran5

# pin some versions that work
pip install \
    pillow==10.4.0 \
    numpy==2.2.0


(cd ../inky && ./install.sh)
