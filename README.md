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
  --testnet   Use testnet
  -h, --help  output usage information
```

Consider to use the --pretty option.

Example:
``` bash
mvs-rawsign decode --tx 0200000001ea1a27de1f3cee7c31033b93fd493717b2ff47e756df1185007d65bf7db25455010000006b483045022100f8fa56d4f3015689c01f4557351e858aec4a139d752bc19b322390093393efc3022077d706621c3e36c8b6a90c6d354e8a85dd81d39a4e2fb582c0fd28f3f1a9caec0121034593f54b073ed6a3728056d0f6595d614c717c639a9301761de7c8ef5d5fe1b4ffffffff0201000000000000001976a914f087200b95bd043a134a0cead903e0a3600d79eb88ac0100000000000000db604b00000000001976a9147f8ac2a0179a4eb308c7ae837aed878b5ed25de288ac010000000000000000000000 --pretty
```


### Sign
```
Usage: sign [options]

Options:
  --tx [tx]                  Hex encoded raw transaction
  --signall                  Sign all inputs
  --index [index]            HD index to use
  --words [words]            Mnemonic words to use for signature
  --privatekey [privatekey]  Private key to use for signature
  --wif [wif]                Private key in WIF format to use for signature
  --testnet                  Use testnet
  -h, --help                 output usage information
```

You can either use your mnemonic words or a private key. If you use the --privatekey option it will not ask you for a mnemonic. Currently the private key must be 64 characters long.

Output is the signed hex encoded transaction.

Example: 
``` bash
mvs-rawsign sign --tx 0200000001ea1a27de1f3cee7c31033b93fd493717b2ff47e756df1185007d65bf7db25455010000006b483045022100f8fa56d4f3015689c01f4557351e858aec4a139d752bc19b322390093393efc3022077d706621c3e36c8b6a90c6d354e8a85dd81d39a4e2fb582c0fd28f3f1a9caec0121034593f54b073ed6a3728056d0f6595d614c717c639a9301761de7c8ef5d5fe1b4ffffffff0201000000000000001976a914f087200b95bd043a134a0cead903e0a3600d79eb88ac0100000000000000db604b00000000001976a9147f8ac2a0179a4eb308c7ae837aed878b5ed25de288ac010000000000000000000000 --privatekey 877dc58c951086ebf8ce94e2c622502605ba20ece2fdebf60d1aff45270cc3d3 --signall
```
