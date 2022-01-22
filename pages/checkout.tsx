import {
  useContext,
  // useEffect,
  // useState
} from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { Button, HStack, useToast } from '@chakra-ui/react';
import { CartContext } from 'contexts/CartContext';

function StripeCheckout() {
  // const [publishableKey, setPublishableKey] = useState('');
  const { cart, removeItem, addItem } = useContext(CartContext);

  const toast = useToast();

  // useEffect(() => {
  //   fetch('/api/stripe/keys', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setPublishableKey(data.publishableKey);
  //     })
  //     .catch(err => console.log(err));
  // });

  const checkOut = async () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    if (totalPrice <= 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add some items to your cart',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    const response = await fetch('/api/stripe/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: totalPrice,
      })
    });
    const data = await response.json();

    window.location.href = data.url; // Redirect to stripe hosted prebuilt checkout
  }

  // if (!publishableKey) {
  //   console.log('loading');
  //   return <div>Loading...</div>;
  // }

  // const stripe = loadStripe(publishableKey);

  return (
    <>
      <h1>This is the checkout page</h1>

      {
        cart.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <HStack>
              <Button onClick={() => addItem(item.id, item.name, item.price)}>Add</Button>
              <p>{item.quantity}</p>
              <Button onClick={() => removeItem(item.id)}>Remove</Button>
            </HStack>
          </div>
        ))
      }

      <p>Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>

      <Button onClick={checkOut}>Checkout</Button>
    </>
  );
}

export default StripeCheckout;
