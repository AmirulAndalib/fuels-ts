import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '400ms'],
      },
    });

    const {
      provider,
      wallets: [genesisWallet],
    } = launched;

    const destination = Wallet.generate({ provider });

    const transfer = await genesisWallet.createTransfer(
      destination.address,
      100,
      await provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );

    transfer.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(transfer)
    );

    const { waitForResult } = await provider.sendTransaction(transfer);
    const { isStatusSuccess } = await waitForResult();

    expect(isStatusSuccess).toBe(true);
  });
});
