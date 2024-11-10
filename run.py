#!/usr/bin/env python3

# generate the image
import subprocess
subprocess.run(["node", "getImage.js"], check=True)

# display the image

from inky.auto import auto

inky = auto(ask_user=True, verbose=True)

from PIL import Image

img = Image.open("output.png")
inky.set_image(img)
inky.show()
