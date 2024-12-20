#!/usr/bin/env python3

print('> Generating image...')
# generate the image
import subprocess
subprocess.run(["node", "getImage.js"], check=True)

# display the image
print('> Displaying image...')
print('>> Setting up display...')
from inky.inky_ac073tc1a import Inky as InkyAC073TC1A
inky = InkyAC073TC1A()
inky.setup()

print('>> Loading image...')
from PIL import Image
img = Image.open("output.png")

print('>> Displaying image...')
inky.set_image(img)
inky.show()
