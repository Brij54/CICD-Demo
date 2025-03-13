import React from "react";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const Page1Card1: React.FC<Props> = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Page1Card1;
