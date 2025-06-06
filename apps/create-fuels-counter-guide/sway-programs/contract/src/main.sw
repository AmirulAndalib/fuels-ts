contract;

// #region create-fuels-counter-guide-abi
// The abi defines the blueprint for the contract.
abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64;
}
// #endregion create-fuels-counter-guide-abi

/// The storage variables for the contract.
/// In this case, there is only one variable called `counter` which is initialized to 0.
storage {
    counter: u64 = 0,
}

// #region create-fuels-counter-guide-impl
impl Counter for Contract {
    // The `get_count` function returns the current value of the counter.
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    // The `increment_counter` function increments the counter by the given amount.
    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
// #endregion create-fuels-counter-guide-impl

#[test]
fn should_get_count() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let expected = 0;

    let actual = contract_instance.get_count();

    assert(actual == expected);
}

#[test]
fn should_increment_counter() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let count_before = contract_instance.get_count();
    let expected = count_before + 1;

    let count_after = contract_instance.increment_counter(1);

    assert(count_after == expected);
}

// #region create-fuels-counter-guide-sway-contract-test
#[test]
fn test_decrement_counter() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let _ = contract_instance.increment_counter(5);

    let count_before = contract_instance.get_count();
    let count_after = contract_instance.decrement_counter(1);
    assert(count_after == count_before - 1);
}
// #endregion create-fuels-counter-guide-sway-contract-test
