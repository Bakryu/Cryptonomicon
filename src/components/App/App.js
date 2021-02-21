import React, { useState } from "react";
import Header from "../Header";
import CurrencyList from "../CurrencyList";
import ContentSeparator from "../ContentSeparator";
import Graph from "../Graph";
import "./app.css";

const initialState = [
  { currency: "Rub", price: "1100" },
  { currency: "Eur", price: "100" },
  { currency: "Zlt", price: "400" },
];

export default function App() {
  const [state, setCurrencyData] = useState({ currencyData: initialState });
  const { currencyData } = state;

  const dividingLine = currencyData.length > 0 ? <ContentSeparator /> : "";

  const addCurrencyItem = (currencyName) => {
    setCurrencyData({
      ...state,
      currencyData: [...currencyData, { currency: currencyName, price: "-" }],
    });
  };

  const deleteCurrencyItem = (currency) => {
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
  };

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <div className="w-full my-4"></div>
        <Header addCurrencyItem={addCurrencyItem} />
        {dividingLine}
        <CurrencyList
          deleteCurrencyItem={deleteCurrencyItem}
          currencyData={currencyData}
        />
        {dividingLine}
        <Graph />
      </div>
    </div>
  );
}
