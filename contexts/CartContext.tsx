import { createContext, useState, ReactNode } from 'react';

// Item definition
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
    ]
  );

  function addItem(id: Item['id'], name: Item['name'], price: Item['price']) {
    // If item already exists in cart, increment quantity
    const item = cart.find(item => item.id === id);
    if (item) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          item.quantity += 1;
          return item;
        }
        return item;
      });
      setCart(newCart);
    } else { // If item does not exist in cart, add it
      const quantity = 1;
      const newItem = { id, name, price, quantity };
      setCart([...cart, newItem]);
    }
  }

  function removeItem(id: Item['id']) {
    // If item exists in cart, decrement quantity or remove item
    const item = cart.find(item => item.id === id);
    if (item) {
      if (item.quantity <= 1) { // If item quantity is 1 or less, remove item from cart
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
      } else {  // If item quantity is more than 1, decrement quantity
        const newCart = cart.map(item => {
          if (item.id === id) {
            item.quantity -= 1;
            return item;
          }
          return item;
        });
        setCart(newCart);
      }
    }
    // TODO: Update local storage
    return;
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