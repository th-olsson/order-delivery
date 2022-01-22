import { useContext } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Text,
  HStack,
  Box,
  Link
} from '@chakra-ui/react'
import { FaShoppingBasket } from 'react-icons/fa'
import { CartContext } from 'contexts/CartContext';
import NextLink from 'next/link';
import Image from 'next/image';

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cart, removeItem, addItem } = useContext(CartContext)

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="open menu"
        icon={<FaShoppingBasket />}
      />

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            { //TODO: Make separate component for product
              cart.map(({ id, name, price, quantity, imageUrl }) => (
                <Box className='cart-item' key={id}>
                  <Text fontSize="2xl">{name} {price * quantity} </Text>
                  {imageUrl &&
                    <Image
                      height="40"
                      width="40"
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}${imageUrl}`}
                      alt={`${name} product image`}
                    />}
                  <HStack>
                    <Button onClick={() => { removeItem(id) }}>Remove one</Button>
                    <Text>{quantity}</Text>
                    <Button onClick={() => { addItem(id, name, price, imageUrl) }}>Add one</Button>
                  </HStack>
                </Box>
              ))
            }
          </DrawerBody>
          <DrawerFooter>
            <NextLink href="/checkout" passHref>
              <Link>
                <Button onClick={onClose}>Checkout</Button>
              </Link>
            </NextLink>
            <Button onClick={() => { console.log('cart', cart) }}>
              Log cart context
            </Button>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Cart;
