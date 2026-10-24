use crate::money::{Money, calculate_total};
use crate::payments::charge;
use crate::{Error, Order, Receipt, Store};

/// Settle an order after a successful payment.
///
/// The order key also identifies the payment, so a retry is safe.
pub fn settle_order(order: &Order, store: &impl Store) -> Result<Receipt, Error> {
    if let Some(receipt) = store.find_receipt(&order.key)? {
        return Ok(receipt);
    }

    let total = calculate_total(&order.items);
    let receipt = charge(order, total)?;
    store.save_receipt(&receipt)?;
    Ok(receipt)
}

/// Preview the amount before collecting payment.
pub fn quote_order(order: &Order) -> Money {
    calculate_total(&order.items)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::money::LineItem;

    #[test]
    fn quote_includes_quantity_and_discount() {
        let order = Order {
            key: "quote-1".into(),
            items: vec![LineItem {
                unit_price: 1200,
                quantity: 2,
                discount_percent: 10,
            }],
        };
        assert_eq!(quote_order(&order), 2160);
    }
}
