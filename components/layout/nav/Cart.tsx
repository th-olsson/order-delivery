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
  Box
} from '@chakra-ui/react'
import { FaShoppingBasket } from 'react-icons/fa'
import { CartContext } from 'contexts/CartContext';

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
              cart.map(({ id, name, price, quantity }) => (
                <Box className='cart-item' key={id}>
                  <Text fontSize="2xl">{name} {price * quantity} {quantity}</Text>
                  <HStack>
                    <Button onClick={() => { removeItem(id) }}>Remove one</Button>
                    <Text>{quantity}</Text>
                    <Button onClick={() => { addItem(id, name, price) }}>Add one</Button>
                  </HStack>
                </Box>
              ))
            }
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => { console.log(cart) }}>
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
