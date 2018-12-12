#!/usr/bin/env node

const program = require('commander');
const prompts = require('prompts');
var bitcoin = require('bitcoinjs-lib');
const Metaverse = require('metaversejs');

program
    .version('0.1.0');

program
    .command('sign')
    .option('--tx [tx]', 'Hex encoded raw transaction')
    .option('--signall', 'Sign all inputs')
    .option('--index [index]', 'HD index to use')
    .option('--words [words]', 'Mnemonic words to use for signature')
    .option('--privatekey [privatekey]', 'Private key to use for signature')
    .action(signCommand);

program
    .command('decode')
    .option('--tx [tx]', 'Hex encoded raw transaction')
    .option('--pretty', 'Pretty JSON format')
    .action(decodeCommand);


program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

async function selectInputs(cmd, inputs) {

    if (cmd.signall) {
        return [...Array(inputs.length).keys()];
    }

    let options = [];
    inputs.forEach((input, index) => {
        options.push({
            title: input.previous_output.hash + " " + input.previous_output.index + ((input.script.length) ? " signed" : ""),
            value: index
        });
    });
    return await prompts({
        type: 'multiselect',
        name: 'value',
        message: 'Select the inputs you want to sign',
        choices: options,
        hint: '- Space to select. Return to submit'
    }).then(r => r.value);

}

async function selectIndex(cmd, wallet) {

    if (cmd['index']) {
        return parseInt(cmd['index']);
    }

    let options = [];
    wallet.getAddresses(20).forEach((address, index) => {
        options.push({
            title: `${index}: ${address}`,
            value: index
        });
    });
    return await prompts({
        type: 'select',
        name: 'value',
        message: 'Choose the address of the HD index to use for signing.',
        choices: options,
        hint: '- Space or return to submit.'
    }).then(r => parseInt(r.value));

}

async function getTransaction(cmd) {
    const prompts = require('prompts');

    if (cmd.tx)
        return cmd.tx;

    return await prompts({
        type: 'text',
        name: 'tx',
        message: 'Please enter the hex encoded raw transaction'
    }).then(r => r.tx);
}


async function getMnemonicWords(cmd) {
    const prompts = require('prompts');

    return (cmd['words']) ? cmd['words'] : await prompts({
        type: 'text',
        name: 'words',
        message: 'Please enter the mnemonic words (backup words)'
    }).then(r => r.words);
}

async function sign(transaction, keyPair, address, inputs) {
    transaction.inputs.forEach(input => {
        input.script = Metaverse.script.fromASM(input.script).chunks;
    });
    inputs.forEach(i => {
        transaction.inputs[i].previous_output.address = address;
        transaction.inputs[i].script = generateInputScriptParameters(keyPair, transaction, i);
    });
    return transaction;
}

function generateInputScriptParameters(keyPair, transaction, index) {
    let unsigned_tx = transaction.clone().clearInputScripts().encode(index);
    let script_buffer = new Buffer.alloc(4);
    script_buffer.writeUInt32LE(1, 0);
    var prepared_buffer = Buffer.concat([unsigned_tx, script_buffer]);
    var sig_hash = bitcoin.crypto.sha256(bitcoin.crypto.sha256(prepared_buffer));
    let signature = keyPair.sign(sig_hash).toString('hex') + '01';
    let parameters = [Buffer.from(signature, 'hex'), keyPair.publicKey];
    return parameters;
};


function decodeCommand(cmd, options) {
    getTransaction(cmd)
        .then(rawtx => Metaverse.transaction.decode(rawtx))
        .then(tx => JSON.stringify(tx, null, 4))
        .then(console.log);
}

async function signCommand(cmd, options) {
    let rawtx = await getTransaction(cmd);
    let tx = Metaverse.transaction.decode(rawtx);

    console.log(cmd.privatekey)
    if(cmd.privatekey){
        let keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(cmd.privatekey, 'hex'))
        let payment = bitcoin.payments.p2pkh({
            pubkey: keyPair.publicKey,
            network: Metaverse.networks.mainnet
        })
        let inputs = await selectInputs(cmd, tx.inputs);
        tx = await sign(tx, keyPair, payment.address, inputs);
    } else{
        let words = await getMnemonicWords(cmd);
        let wallet = await Metaverse.wallet.fromMnemonic(words);
        let hdindex = await selectIndex(cmd, wallet);
        let node = wallet.rootnode.derive(hdindex);
        let inputs = await selectInputs(cmd, tx.inputs);
        tx = await sign(tx, node.keyPair, node.getAddress(), inputs);
    }

    console.log(tx.encode().toString('hex'));
}
