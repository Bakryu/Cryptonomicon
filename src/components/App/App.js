import React, { useState, useEffect } from "react";
import Header from "../Header";
import CurrencyList from "../CurrencyList";
import ContentSeparator from "../ContentSeparator";
import Graph from "../Graph";
import getResource from "../../services/cryptocompareService";
import "./app.css";

const initialData = [
  { currency: "Rub", price: "1100" },
  { currency: "Eur", price: "100" },
  { currency: "Zlt", price: "400" },
];

export default function App() {
  const [data, setData] = useState(initialData);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    !!activeItem &&
      setInterval(() => {
        getResource(activeItem).then((item) => console.log(item));
      }, 3000);
  }, [activeItem]);

  const dividingLine = !!data.length && <ContentSeparator />;

  const selectCurrencyItem = (currencyName) => {
    setActiveItem(currencyName);
  };

  const cleanActiveCurrencyItem = () => {
    setActiveItem(null);
  };

  const addCurrencyItem = (currencyName) => {
    setData((prevState) => [
      ...prevState,
      { currency: currencyName, price: "-" },
    ]);
    selectCurrencyItem(currencyName);
  };

  const deleteCurrencyItem = (currency, event) => {
    const itemIndex = data.findIndex((item) => item.currency === currency);
    setData((prevState) => [
      ...prevState.slice(0, itemIndex),
      ...prevState.slice(itemIndex + 1),
    ]);
    event.stopPropagation();
    currency === activeItem && cleanActiveCurrencyItem();
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
          currencyData={data}
          activeCurrencyItem={activeItem}
        />
        {dividingLine}
        {!!activeItem && (
          <Graph
            cleanActiveCurrencyItem={cleanActiveCurrencyItem}
            activeCurrencyItem={activeItem}
          />
        )}
      </div>
    </div>
  );
}
