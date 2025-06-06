import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { TransactionResultReceipt } from 'fuels';
import { bn, getRandomB256, ContractFactory, Wallet } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';

import {
  CallTestContractFactory,
  RevertErrorFactory,
  TokenContract,
  TokenContractFactory,
} from '../test/typegen';

import { fundAccount } from './predicate/utils/predicate';
import { launchTestContract } from './utils';

function launchContract() {
  return launchTestContract({
    factory: RevertErrorFactory,
  });
}

/**
 * @group node
 * @group browser
 */
describe('Revert Error Testing', () => {
  it('can pass require checks [valid]', async () => {
    using contractInstance = await launchContract();

    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { waitForResult } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    const { logs, groupedLogs } = await waitForResult();

    const expectedLogs = [
      1,
      'FOO',
      'BAR',
      'BAZ',
      99,
      100,
      { token_id: expect.toEqualBn(INPUT_TOKEN_ID), price: expect.toEqualBn(INPUT_PRICE) },
    ];
    expect(logs).toStrictEqual(expectedLogs);
    expect(groupedLogs).toStrictEqual({
      [contractInstance.id.toB256()]: expectedLogs,
    });
  });

  it('should throw for "require" revert TX [PriceCantBeZero]', async () => {
    using contractInstance = await launchContract();

    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    await expectToThrowFuelError(
      () => contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because a "require" statement has thrown "PriceCantBeZero".`,
        {
          logs: [1, 'FOO', 'PriceCantBeZero'],
          groupedLogs: {
            [contractInstance.id.toB256()]: [1, 'FOO', 'PriceCantBeZero'],
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'require',
          panic: false,
          revert: true,
        }
      )
    );
  });

  it('should throw for "require" revert TX [InvalidTokenId]', async () => {
    using contractInstance = await launchContract();

    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expectToThrowFuelError(
      async () => {
        const { waitForResult } = await contractInstance.functions
          .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
          .call();
        await waitForResult();
      },
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because a "require" statement has thrown "InvalidTokenId".`,
        {
          logs: [1, 'FOO', 'BAR', 'BAZ', 99, 'InvalidTokenId'],
          groupedLogs: {
            [contractInstance.id.toB256()]: [1, 'FOO', 'BAR', 'BAZ', 99, 'InvalidTokenId'],
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'require',
          panic: false,
          revert: true,
        }
      )
    );
  });

  it('should throw for revert TX with reason "TransferZeroCoins"', async () => {
    using contractInstance = await launchContract();

    await expectToThrowFuelError(
      () =>
        contractInstance.functions.failed_transfer_revert().txParams({ variableOutputs: 1 }).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted with reason: "TransferZeroCoins".\n\nYou can read more about this error at:\n\nhttps://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html#variant.TransferZeroCoins',
        {
          logs: [],
          groupedLogs: {},
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'TransferZeroCoins',
          panic: true,
          revert: false,
        }
      )
    );
  });

  it('should throw for "assert" revert TX', async () => {
    using contractInstance = await launchContract();

    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    const expectedLogs = [1, 'FOO', 'BAR', 'BAZ', 99, 100];
    await expectToThrowFuelError(
      () => contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted because an "assert" statement failed to evaluate to true.',
        {
          logs: expectedLogs,
          groupedLogs: {
            [contractInstance.id.toB256()]: expectedLogs,
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert',
        }
      )
    );
  });

  it('should throw for revert TX with reason "NotEnoughBalance"', async () => {
    using contractInstance = await launchContract();

    await expectToThrowFuelError(
      () => contractInstance.functions.failed_transfer().txParams({ variableOutputs: 1 }).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted with reason: "NotEnoughBalance".\n\nYou can read more about this error at:\n\nhttps://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html#variant.NotEnoughBalance',
        {
          logs: [],
          groupedLogs: {},
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: true,
          revert: false,
          reason: 'NotEnoughBalance',
        }
      )
    );
  });

  it('should throw for "assert_eq" revert TX', async () => {
    using contractInstance = await launchContract();

    const expectedLogs = ['FOO', 9, 10];
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_eq_10(9).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_eq" statement comparing 10 and 9.`,
        {
          logs: expectedLogs,
          groupedLogs: {
            [contractInstance.id.toB256()]: expectedLogs,
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_eq',
        }
      )
    );
  });

  it('should throw for "assert_ne" revert TX', async () => {
    using contractInstance = await launchContract();

    const expectedLogs = ['BAZ', 10, 5, 5];
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_ne_5(5).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_ne" statement comparing 5 and 5.`,
        {
          logs: expectedLogs,
          groupedLogs: {
            [contractInstance.id.toB256()]: expectedLogs,
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_ne',
        }
      )
    );
  });

  it('should throw for a missing OutputVariable', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(TokenContractFactory.bytecode, TokenContract.abi, wallet);
    const { waitForResult } = await factory.deploy();
    const { contract: tokenContract } = await waitForResult();

    const addresses = [
      { bits: getRandomB256() },
      { bits: getRandomB256() },
      { bits: getRandomB256() },
    ];

    const request = await tokenContract
      .multiCall([
        tokenContract.functions.mint_coins(500),
        tokenContract.functions.mint_to_addresses(addresses, 300),
      ])
      .getTransactionRequest();

    await request.estimateAndFund(wallet);

    const tx = await wallet.sendTransaction(request, {
      estimateTxDependencies: false,
    });

    await expectToThrowFuelError(
      () => tx.wait(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because it's missing an "OutputVariable".`,
        {
          logs: [],
          groupedLogs: {},
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'MissingOutputVariable',
        }
      )
    );
  });

  it('should throw UNKNOWN Error for revert', async () => {
    using contractInstance = await launchContract();

    await expectToThrowFuelError(
      () => contractInstance.functions.revert_with_0().call(),
      new FuelError(ErrorCode.UNKNOWN, `The transaction reverted with an unknown reason: 0`, {
        logs: [],
        groupedLogs: {},
        receipts: expect.any(Array<TransactionResultReceipt>),
        panic: false,
        revert: true,
        reason: 'unknown',
      })
    );
  });

  it('should ensure errors from getTransactionCost dry-run are properly thrown', async () => {
    using contractInstance = await launchContract();

    const expectedLogs = ['BAZ', 10, 5, 5];
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_ne_5(5).getTransactionCost(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_ne" statement comparing 5 and 5.`,
        {
          logs: expectedLogs,
          groupedLogs: {
            [contractInstance.id.toB256()]: expectedLogs,
          },
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_ne',
        }
      )
    );
  });

  it('should properly decode error when contract CALL receipt is not available', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });
    const {
      provider,
      wallets: [adminWallet],
      contracts: [contract],
    } = launched;

    const transferAmount = 100;
    const baseAssetId = await provider.getBaseAssetId();

    const wallet = Wallet.generate({ provider });

    await fundAccount(adminWallet, wallet, 500_000);

    contract.account = wallet;

    // Contract call requires an amount of asset A
    const scope = contract.functions.return_context_amount().callParams({
      forward: [transferAmount, TestAssetId.A.value],
    });

    const request = await scope.getTransactionRequest();

    request.gasLimit = bn(100_000);
    request.maxFee = bn(100_000);

    const baseAssetResources = await wallet.getResourcesToSpend([
      { amount: transferAmount, assetId: baseAssetId },
    ]);

    // Funding the transaction only with the base asset
    request.addResources(baseAssetResources);

    const res = await wallet.sendTransaction(request);

    await expectToThrowFuelError(() => res.waitForResult(), {
      code: ErrorCode.SCRIPT_REVERTED,
      message: expect.stringMatching(`The transaction reverted with reason: "NotEnoughBalance".`),
    });
  });
});
