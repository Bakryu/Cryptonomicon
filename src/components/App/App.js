import React, { useState } from "react";
import Header from "../Header";
import CurrencyList from "../CurrencyList";
import ContentSeparator from "../ContentSeparator";
import Graph from "../Graph";
import "./app.css";

const initialState = {
  currencyData: [
    { currency: "Rub", price: "1100" },
    { currency: "Eur", price: "100" },
    { currency: "Zlt", price: "400" },
  ],
  activeCurrencyItem: null,
};

export default function App() {
  const [state, setCurrencyData] = useState(initialState);
  const { currencyData, activeCurrencyItem } = state;

  const dividingLine = currencyData.length > 0 ? <ContentSeparator /> : "";

  const addCurrencyItem = (currencyName) => {
    setCurrencyData({
      ...state,
      currencyData: [...currencyData, { currency: currencyName, price: "-" }],
    });
  };

  const selectCurrencyItem = (currencyName) => {
    setCurrencyData({ ...state, activeCurrencyItem: currencyName });
  };

  const cleanActiveCurrencyItem = () => {
    setCurrencyData({ ...state, activeCurrencyItem: null });
  };

  const deleteCurrencyItem = (currency, event) => {
    const itemIndex = currencyData.findIndex(
      (item) => item.currency === currency
    );
    setCurrencyData({
      ...state,
      currencyData: [
        ...currencyData.slice(0, itemIndex),
        ...currencyData.slice(itemIndex + 1),
      ],
    });
    event.stopPropagation();
  };

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <div className="w-full my-4"></div>
        <Header addCurrencyItem={addCurrencyItem} />
        {dividingLine}
        <CurrencyList
          deleteCurrencyItem={deleteCurrencyItem}
          selectCurrencyItem={selectCurrencyItem}
          currencyData={currencyData}
          activeCurrencyItem={activeCurrencyItem}
        />
        {dividingLine}
        {activeCurrencyItem ? (
          <Graph
            cleanActiveCurrencyItem={cleanActiveCurrencyItem}
            activeCurrencyItem={activeCurrencyItem}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
