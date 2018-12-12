<p align="center">
  <a href="https://mvs.org/">
    <img src="https://raw.githubusercontent.com/mvs-org/lightwallet/master/src/assets/logo.png" alt="">
  </a>
  <br>
  <a href="https://travis-ci.org/canguruhh/mvs-rawsign">
     <img src="https://travis-ci.org/canguruhh/mvs-rawsign.png?branch=master" alt="Build status">
  </a>
  <br>
  Sign Metaverse blockchain transactions offline.
</p>

## Installation
Install using npm:
``` bash
npm install -g mvs-rawsign
```

## Usage
```
Usage: mvs-rawsign [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        output usage information

Commands:
  sign [options]
  decode [options]
```

You can omit any of the options. You will then get a cli menu to select or enter the missing information.

### Decode
```
Usage: decode [options]

Options:
  --tx [tx]   Hex encoded raw transaction
  --pretty    Pretty JSON format
  -h, --help  output usage information
```

Consider to use the --pretty option.

### Sign
```
Usage: sign [options]

Options:
  --tx [tx]        Hex encoded raw transaction
  --signall        Sign all inputs
  --index [index]  HD index to use
  --words [words]  Mnemonic words to use for signature
  -h, --help       output usage information

```
Output is the signed hex encoded transaction.
