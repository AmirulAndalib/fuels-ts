# Class: TransactionResponse

[@fuel-ts/providers](/api/Providers/index.md).TransactionResponse

Represents a response for a transaction.

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`)

Constructor for `TransactionResponse`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider. |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:98](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L98)

## Properties

### gasUsed

• **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:88](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L88)

___

### gqlTransaction

• `Optional` **gqlTransaction**: `Object`

The graphql Transaction with receipts object.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Transaction"`` |
| `gasPrice?` | ``null`` \| `string` |
| `id` | `string` |
| `rawPayload` | `string` |
| `receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] |
| `status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:90](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L90)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:84](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L84)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

Current provider

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:86](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L86)

## Methods

### decodeTransaction

▸ **decodeTransaction**&lt;`TTransactionType`\>(`transactionWithReceipts`): `Transaction`&lt;`TTransactionType`\>

Decode the raw payload of the transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionWithReceipts` | `Object` | The transaction with receipts object. |
| `transactionWithReceipts.__typename` | ``"Transaction"`` | - |
| `transactionWithReceipts.gasPrice?` | ``null`` \| `string` | - |
| `transactionWithReceipts.id` | `string` | - |
| `transactionWithReceipts.rawPayload` | `string` | - |
| `transactionWithReceipts.receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] | - |
| `transactionWithReceipts.status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } | - |

#### Returns

`Transaction`&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:150](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L150)

___

### fetch

▸ **fetch**(): `Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

Transaction with receipts query result.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:122](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L122)

___

### getTransactionSummary

▸ **getTransactionSummary**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;[`TransactionSummary`](/api/Providers/index.md#transactionsummary)&lt;`TTransactionType`\>\>

Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
fetch it from the provider

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;[`TransactionSummary`](/api/Providers/index.md#transactionsummary)&lt;`TTransactionType`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:164](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L164)

___

### wait

▸ **wait**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:226](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L226)

___

### waitForResult

▸ **waitForResult**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

The completed transaction result

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:202](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L202)

___

### create

▸ `Static` **create**(`id`, `provider`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Async constructor for `TransactionResponse`. This method can be used to create
an instance of `TransactionResponse` and wait for the transaction to be fetched
from the chain, ensuring that the `gqlTransaction` property is set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:111](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-response/transaction-response.ts#L111)
