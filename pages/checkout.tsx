import {
  useContext,
} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Box, Button, Container, HStack, useToast, VStack, Text, Divider } from '@chakra-ui/react';
import { CartContext } from 'contexts/CartContext';

function StripeCheckout() {
  const { cart, removeItem, addItem } = useContext(CartContext);

  const toast = useToast();

  const checkOut = async () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (totalPrice <= 0) {
      toast({
        title: 'Varukorgen är tom',
        description: 'Lägg till något i varukorgen för att kunna göra en köp.',
        status: 'info',
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
    
    // Redirect to stripe hosted prebuilt checkout
    window.location.href = data.url;
  }

  return (
    <>
      <Head>
        <title>Kassa - Blommis</title>
      </Head>
      <Box
        borderRadius='3xl'
        ml='5'
        mr='5'
        pl='15'
        pr='15'
        pt='4rem'
      >
        <Container>
          <VStack>
            {
              cart.map(({ id, name, price, quantity, imageUrl }) => (
                <VStack key={id} w='100%'>
                  <HStack>
                    <Text fontSize='lg' fontWeight='medium' fontStyle='italic' >{name}</Text>
                    <Text fontSize='lg' fontWeight='medium' fontStyle='italic' >{price} kr</Text>
                  </HStack>
                  <HStack justifyContent='space-evenly' w='100%'>
                    <Image
                      height="120"
                      width="120"
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${imageUrl}`}
                      alt={`${name} product image`}
                    />
                    <HStack>
                      <Button onClick={() => removeItem(id)}>-</Button>
                      <Text fontWeight='semibold'>{quantity}</Text>
                      <Button onClick={() => addItem(id, name, price, imageUrl)}>+</Button>
                    </HStack>
                  </HStack>
                  <Divider />
                </VStack>
              ))
            }

          </VStack>
          <VStack pb='2'>
            <HStack>
              <Text fontSize='2xl' fontWeight='semibold'>Totalt</Text>
              <Text fontSize='2xl' fontWeight='bold'>
                {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} kr
              </Text>
            </HStack>
            <Button
              onClick={checkOut}
              size='lg'
              rounded='sm'
              bgColor='green.300'
              _hover={
                { bgColor: 'green.200' }
              }
            >
              Betala
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default StripeCheckout;
