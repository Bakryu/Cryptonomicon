import React from "react";
import CurrencyItem from "../CurrencyItem";

export default function CurrencyList({
  currencyData,
  activeCurrencyItem,
  deleteCurrencyItem,
  selectCurrencyItem,
}) {
  const list = currencyData.map(({ currency, price }) => (
    <CurrencyItem
      currency={currency}
      price={price}
      key={currency}
      deleteCurrencyItem={deleteCurrencyItem}
      isActive={currency === activeCurrencyItem}
      selectCurrencyItem={selectCurrencyItem}
    />
  ));

  return <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">{list}</dl>;
}
