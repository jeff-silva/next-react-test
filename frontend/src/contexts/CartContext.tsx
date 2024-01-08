import React, { createContext, useState } from 'react';

type CartProductProps = {
  id: string,
  name: string,
  price: number,
};

const CartContext = createContext({
  products: [],
  total: 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);

  const totalUpdate = () => {
    setTotal(items.reduce((total, o) => {
      return total + (o.product.price * o.quantity);
    }, 0));
  };

  const itemFind = (item) => {
    return items.find(o => o.product.id == item.product.id);
  };

  const itemAdd = (product, quantity=1) => {
    if (!itemFind({ quantity, product })) {
      items.push({ quantity: 0, product });
    }

    setItems(items.map(item => {
      if (item.product.id != product.id) return item;
      item.quantity += quantity;
      return item;
    }));

    totalUpdate();
  };

  const itemRemove = (item) => {
    setItems(items.filter(o => o.product.id != item.product.id));
    totalUpdate();
  };

  const itemsClear = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      total,
      totalUpdate,
      items,
      itemFind,
      itemAdd,
      itemRemove,
      itemsClear,
    }}>
      {children}
    </CartContext.Provider>
  );
};


export { CartContext, CartProvider };