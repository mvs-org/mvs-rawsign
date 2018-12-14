const expect = require('chai').expect;
const cmd = require('../cmd.js');

const cases = [
  {
    address: "tPrKTz7PpKjQ7bvaYMgbRjAqycxNRGgem6",
    mnemonic: "witness trend song spice charge blast obey talk push castle melody shield pull elite life item burger bright absurd jungle opinion notable judge language",
    private_key: "bfa15f0a097823442a76b73fbc22850d63cabeac873c278d3d0225875f42dcd7",
    public_key: "024c5d48e55d22cc45787c850ba82cb455c78b44cc9c622b5ef85e013440ed7ebb",
    wif: "L3eDSN6y3kNid3FwJti2aCNRvqk8XbtoEHn4KRUpXH58vr7G8Nio",
    transaction: "04000000011f55dab5011cc82a7a39eec3b4ec18c71bc671572c9f42aa287152ef87ef3b6a0000000000ffffffff0200a3e111000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0ffb829000000001976a914b9aaa1bdc201c2cabada32593d7a22dae8fd93c888ac010000000000000000000000",
    target: "04000000011f55dab5011cc82a7a39eec3b4ec18c71bc671572c9f42aa287152ef87ef3b6a000000006a47304402203b4cdd3b569a625911f106e0843b0c7caea16043c47ff4bc799d96228a7f8f130220254750acc1ca467d6a6f269d8dba6234a0ea1667ee14f227c7fefffdf35e9d610121024c5d48e55d22cc45787c850ba82cb455c78b44cc9c622b5ef85e013440ed7ebbffffffff0200a3e111000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0ffb829000000001976a914b9aaa1bdc201c2cabada32593d7a22dae8fd93c888ac010000000000000000000000"
  },
  {
    address: "t9aBQ2w9ZG39LCJHFE5S3tceESvao7Yrmt",
    mnemonic: "genuine shoe bullet key deliver file mandate envelope require answer museum guide long below gadget bubble toy depend paper other before meadow humor popular",
    private_key: "306b67f476531790b0f97e0c9a6e69f6e9bca2f5f2e81758084c107a62989f41",
    public_key: "0304708a70a8159cb583a57163b09d546c94d23e2e7b4181b9b4e2c2ef4e67cd30",
    wif: "KxqqDfoioYghF6ZrA9KcyLNBXG73utKRyUVMgfSwcchw3w1KxrhW",
    transaction: "0400000001edcf6812284beaca6f9ffcaeb4623587eadd9f7da07ca4ee33598842244a67940000000000ffffffff0200e1f505000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0c1a435000000001976a9141d0b7b028bc3a1e371e71f4d65235b8d941a011488ac010000000000000000000000",
    target: "0400000001edcf6812284beaca6f9ffcaeb4623587eadd9f7da07ca4ee33598842244a6794000000006a473044022047cde411d93623106dc03a891e5fc1c4675a989951ba27e63796ee96bb62b8c50220615428e5ef7aa51d937af309093ee3c96ca5452b4574a448faf604dd80975bf101210304708a70a8159cb583a57163b09d546c94d23e2e7b4181b9b4e2c2ef4e67cd30ffffffff0200e1f505000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0c1a435000000001976a9141d0b7b028bc3a1e371e71f4d65235b8d941a011488ac010000000000000000000000",
  },
  {
    address : "tNZ7uVkb3oZJFwkpioL7JVZ3A2Ri5aY3H8",
    mnemonic : "faith later shield hour hip unique original wine say crazy joy alpha fine spoil short desk blast vicious bulb breeze awkward law label quick",
    private_key : "a5124ff44ae54d80a77933d893aa60f70b178b03a117108b700122eb016c8ba0",
    public_key : "03f69f4b1c13c2e8cc9f675a3cfcfb086d8f93556ea4985bfeaa43d06c05775df0",
    wif : "L2kb5XgC8KF4JntZBNjRoatk3FCLPtd3rETQCQv3z4MUcZmgcBC8",
    transaction: "04000000013031730e3eecffd31aaed3d733bea58799e1a71a8f07f0b13b55137d8d0ea3c00000000000ffffffff0200c2eb0b000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0e0ae2f000000001976a914ab71c8e4824c6b0a2252ff215bfafe2aedfaaa1f88ac010000000000000000000000",
    target: "04000000013031730e3eecffd31aaed3d733bea58799e1a71a8f07f0b13b55137d8d0ea3c0000000006b483045022100f7a4206cb41b8852ec0ebf3fe0755dcc733d99ee2ce486d253a04ae55dfdc1c402201318a2520a1316c95d292e8994c7a9cfcbbc7486db5c99010d3d3f133bfdc04f012103f69f4b1c13c2e8cc9f675a3cfcfb086d8f93556ea4985bfeaa43d06c05775df0ffffffff0200c2eb0b000000001976a9145a40f31ced32e9fcad58a9b54e6f607843efac8788ac0100000000000000f0e0ae2f000000001976a914ab71c8e4824c6b0a2252ff215bfafe2aedfaaa1f88ac010000000000000000000000"
  }
]

describe('Sign transactions from private key', () => {
  cases.forEach((testcase, index) => {
    it(`sign from private key #${index + 1}`, async () => {
      let parameters = ['sign', '--tx', testcase.transaction, '--signall', '--privatekey', testcase.private_key]
      const response = await cmd.execute(
        './index.js',
        parameters
      );
      expect(response.trim()).to.equal(
        testcase.target
      );
    });
  })
});
describe('Sign transactions from WIF', () => {
  cases.forEach((testcase, index) => {
    it(`sign from WIF #${index + 1}`, async () => {
      let parameters = ['sign', '--tx', testcase.transaction, '--signall', '--wif', testcase.wif]
      const response = await cmd.execute(
        './index.js',
        parameters
      );
      expect(response.trim()).to.equal(
        testcase.target
      );
    });
  })
});
describe('Sign transactions from backup words', () => {
  cases.forEach((testcase, index) => {
    it(`sign from backup words #${index + 1}`, async () => {
      let parameters = ['sign', '--words', testcase.mnemonic, '--index', 0, '--signall', '--tx', testcase.transaction]
      const response = await cmd.execute(
        './index.js',
        parameters
      );
      expect(response.trim()).to.equal(
        testcase.target
      );
    });
  })
});