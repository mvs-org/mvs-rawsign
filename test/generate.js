const expect = require('chai').expect;
const cmd = require('../cmd.js');

const cases = [
    {
        pk: "12345678901234567890123456789012",
        network: "testnet",
        target: {
            address: 't8Pt412Y9gbCnGqcLtCzN8aDQMRGpCbKVM',
            private_key:
                '3132333435363738393031323334353637383930313233343536373839303132',
            wif: 'KxsLmbRV44tG58HoKXjU6iZ22A76zbZQGAw9LUXeYT46ER9vgjwr'
        }
    },
    {
        pk: "12345678901234567890123456789012",
        network: "mainnet",
        target: {
            address: "M9NSEe5MUnujou6wTaZT2UcdwWae3Vd8Ec",
            private_key:
                '3132333435363738393031323334353637383930313233343536373839303132',
            wif: 'KxsLmbRV44tG58HoKXjU6iZ22A76zbZQGAw9LUXeYT46ER9vgjwr'
        }
    }
]

describe('Generate wallets', () => {
    cases.forEach((testcase, index) => {
        it(`generate wallet #${index + 1}`, async () => {
            let parameters = ['generate', '--pk', testcase.pk, '--network', testcase.network]
            const response = await cmd.execute(
                './index.js',
                parameters
            );
            expect(JSON.parse(response.trim())).to.deep.equal(
                testcase.target
            );
        });
    })
});