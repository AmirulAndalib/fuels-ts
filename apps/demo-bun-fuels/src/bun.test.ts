/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/demo.test.ts
 *
 * It ensures that built code is fully working.
 */

import { ErrorCode, FuelError, toHex, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { Sample, SampleFactory } from './sway-programs-api';

/**
 * @group node
 * @group browser
 */
describe('ExampleContract', () => {
  it('should return the input', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const factory = new SampleFactory(wallet);
    const { waitForResult } = await factory.deploy();
    const { contract } = await waitForResult();

    // Call
    const call1 = await contract.functions.return_input(1337).call();

    // Wait for result
    const { value } = await call1.waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = new Sample(contract.id, wallet);
    const call2 = await contractInstance.functions.return_input(1337).call();

    // Wait for result
    const { value: v2 } = await call2.waitForResult();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deploy method', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const deploy = await SampleFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();

    // Wait for result
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });

  it('should throw when simulating via contract factory with wallet with no resources', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });

    const deploy = await SampleFactory.deploy(fundedWallet);
    const { contract } = await deploy.waitForResult();

    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expectToThrowFuelError(
      () => contractInstance.functions.return_input(1337).simulate(),
      new FuelError(
        ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
        `Insufficient funds or too many small value coins. Consider combining UTXOs.`
      )
    );
  });

  it('should not throw when dry running via contract factory with wallet with no resources', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });

    const deploy = await SampleFactory.deploy(fundedWallet);
    const { contract } = await deploy.waitForResult();

    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const { waitForResult } = await SampleFactory.deploy(wallet);

    const { contract: depoloyed } = await waitForResult();
    const contractsIds = {
      sample: depoloyed.id,
    };

    const contract = new Sample(contractsIds.sample, wallet);

    const { value } = await contract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
  });
});
