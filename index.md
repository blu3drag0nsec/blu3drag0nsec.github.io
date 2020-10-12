This is a quick reference guide

## Python


```python
from pwn import *
from timeit import default_timer as timer
import math

HOST = "chals.damctf.xyz"
PORT = 30318
p = remote(HOST, PORT)

#p = process("./side-channel.py")\

print(p.recvuntil(b'Password guessing'))
print(p.recvuntil(b'?'))

key = "0123456789abcdef"
passw = ''

for i in range(8):    
    p.send(b'0\n')
    start = timer()    
    print(p.recvuntil(b'?'))
    end = timer()
    print( (end - start) / 0.1)
    print( int((end - start) / 0.1))
    passw += key[int((end - start) / 0.1)]
    print( passw )

for i in range(8):
    p.send("{}\n".format(passw[i]))
    if i >= 7:
        print(p.interactive())
    else:
        print(p.recvuntil(b'?'))
```


```python
import requests

url = 'https://finger-warmup.chals.damctf.xyz/'

res = requests.get(url)
print(res.content)
print(res.headers)

while True:
    next = res.content.split(b'"')[1].decode('ascii')
    if not next:
        break
    
    next = url + next
    print(next)
    res = requests.get(next)
    print(res.content)
    print(res.headers)
```

```python
from PIL import Image, ImageChops
import os
import subprocess


def tryOpen(password):
    cmd = '7z -p{} x {}'.format(password, 'level_1.7z')
    print('Unzipping: {}'.format(cmd))
    res = subprocess.run([ cmd ], stdout=subprocess.PIPE, shell=True)
    print('{}'.format(res))

im1 = Image.open("level_0.png")
im2 = Image.open("lev3l_0.png")

#difference = ImageChops.difference(im1, im2)
#difference.save("difference.png")

pixoriginal = im1.load()
pixoriginal2 = im2.load()


#pixdata = difference.load()
width, height = im1.size

for y in range(height):
    for x in range(width):				
        if pixoriginal[x,y] != pixoriginal2[x,y]:            
            #print('Difference X:{} Y:{}, Pixel: {}'.format(x,y, pixdata[x,y]))
            print('X:{} Y:{}, Pixel: {}'.format(x,y, pixoriginal[x,y]))
            print('X:{} Y:{}, Pixel: {}'.format(x,y, pixoriginal2[x,y]))
                        
            r1, g1, b1 = pixoriginal[x,y]
            r2, g2, b2 = pixoriginal2[x,y]
            xy = str(x) + ':' + str(y)
            rgb1 = '{:0{}X}'.format(r1, 2) + '{:0{}X}'.format(g1, 2) + '{:0{}X}'.format(b1, 2)
            rgb2 = '{:0{}X}'.format(r2, 2) + '{:0{}X}'.format(g2, 2) + '{:0{}X}'.format(b2, 2)
            print(xy + '+' + rgb1 + '+' + rgb2)
            tryOpen(xy + '+' + rgb1 + '+' + rgb2)
            
            r1, g1, b1 = pixoriginal2[x,y]
            r2, g2, b2 = pixoriginal[x,y]

            xy = str(x) + ':' + str(y)
            rgb1 = '{:0{}X}'.format(r1, 2) + '{:0{}X}'.format(g1, 2) + '{:0{}X}'.format(b1, 2)
            rgb2 = '{:0{}X}'.format(r2, 2) + '{:0{}X}'.format(g2, 2) + '{:0{}X}'.format(b2, 2)
            print(xy + '+' + rgb1 + '+' + rgb2)
            tryOpen(xy + '+' + rgb1 + '+' + rgb2)
```

```python
import zxing
import os
import subprocess

import subprocess

while True:

    result = subprocess.run(['ls *.png'], stdout=subprocess.PIPE, shell=True)
    currentImage = result.stdout.strip().split(b'\n')[0].decode('ascii')

    print(currentImage)
    zip = currentImage.replace('.png', '.zip')
    print(zip)

    reader = zxing.BarCodeReader()
    barcodes = reader.decode(currentImage)
    print(barcodes.raw)

    with open('aux', 'w+') as f:
        f.write(barcodes.raw)


    if '<?php' in barcodes.raw:
        print('PHP?')
        res = subprocess.run(['php aux > aux.pwd'], stdout=subprocess.PIPE, shell=True)    
        res = res.stdout.strip().decode('ascii')
    elif 'print(' in barcodes.raw:
        print('python')
        res = subprocess.run(['python3 aux > aux.pwd'], stdout=subprocess.PIPE, shell=True)
        res = res.stdout.strip().decode('ascii')
    elif 'console.log' in barcodes.raw:
        print('javascript')
        res = subprocess.run(['node aux > aux.pwd'], stdout=subprocess.PIPE, shell=True)    
        res = res.stdout.strip().decode('ascii')
    elif 'public static void main'  in barcodes.raw:
        print('Java')
        res = subprocess.run(['mv aux Main.java'], stdout=subprocess.PIPE, shell=True)    
        res = subprocess.run(['javac Main.java'], stdout=subprocess.PIPE, shell=True)    
        res = subprocess.run(['java Main > aux.pwd'], stdout=subprocess.PIPE, shell=True)    
    elif 'fi;' in barcodes.raw:
        print('bash')
        res = subprocess.run(['bash aux > aux.pwd'], stdout=subprocess.PIPE, shell=True)    
    elif '++++' in barcodes.raw:
        res = subprocess.run(['./a.out aux > aux.pwd'], stdout=subprocess.PIPE, shell=True)    
    else:
        print('NO FUCKING CLUE')
        res = subprocess.run(['cat "" > aux.pwd'], stdout=subprocess.PIPE, shell=True)    

    passwd = ''
    with open('aux.pwd', 'r') as p:
        for line in p:
            passwd = line.strip()

    if passwd != '':
        cmd = '7z -p{} x {}'.format(passwd, zip)
        print('Unzipping: {}'.format(cmd))
        res = subprocess.run([ cmd ], stdout=subprocess.PIPE, shell=True)
        print('{}'.format(res))
        cmd = 'mv {} {}.processed'.format(currentImage, currentImage)
        result = subprocess.run([cmd], stdout=subprocess.PIPE, shell=True)
    else:
        print('Needs to look at this crap again, something fucked up showed up')
```


## Password hash/cracking

- Ciphey: `sudo docker run -it --rm remnux/ciphey`

## Wireshark

```
1 - Find TCP stream N
2 - Follow TCP stream
3 - Show and save data as "RAW"
4 - Get rid of the HTTP header so the raw data starts with 7f454c46020101 which is the ELF file header
5 - Save as "damyoustupidchallenge.txt"
6 - `xxd -r -p damyoustupidchallenge.txt > elffile`
```

## Social

<div>

<script src="https://tryhackme.com/badge/140786"></script>

</div>

<div>

<script src="https://www.hackthebox.eu/badge/376084"></script>

</div>