import React from "react";

const convertToCurrencyString = (num: number): string => {
    return '$' + (Math.round(num * 100) / 100).toFixed(2)
}

const Price = ({ price }: { price: number }) => {
  return <React.Fragment>{convertToCurrencyString(price)}</React.Fragment>;
};

export default Price;
