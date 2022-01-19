import { createContext, useState, ReactNode } from 'react';

// Item definitions
interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Cart consists of a list of items
type Cart = Item[];

interface CartContextProps {
  cart: Cart;
  addItem: (id: Item['id'], name: Item['name'], price: Item['price']) => void;
  removeItem: (id: Item['id']) => void;
  logCart: () => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addItem: () => { },
  removeItem: () => { },
  logCart: () => { },
});

export function CartContextProvider({
  children
}: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart>(
    [ // TODO: load from local storage
      { id: 'test_id_1', name: 'product one', price: 100, quantity: 1 },
      { id: 'test_id_2', name: 'product two', price: 200, quantity: 1 },
      { id: 'test_id_3', name: 'product three', price: 300, quantity: 1 },
    ]
  );

  function addItem(id: Item['id'], name: Item['name'], price: Item['price']) {
    // TODO: If item already exists in cart, increment quantity
    const quantity = 1;
    // Adds item to context state
    const newItem = { id, name, price, quantity };
    setCart([...cart, newItem]);

    // TODO: Update local storage
  }

  function removeItem(id: Item['id']) {
    // TODO: If item exists in cart, decrement quantity

    // Removes item from context state
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);

    // TODO: Update local storage
  }

  const logCart = () => {
    console.log('Cart items:', cart);
  }

  const value = { cart, addItem, removeItem, logCart };


  return (
    <CartContext.Provider value={value} >
      {children}
    </CartContext.Provider >
  );
}