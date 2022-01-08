import { useState } from 'react';
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
  Text
} from '@chakra-ui/react'
import { FaShoppingBasket } from 'react-icons/fa'

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [products] = useState([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
    },
    {
      id: 3,
      title: 'Product 3',
      price: 300,
    }
  ]);

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
              products.map(({ id, title, price }) => (
                <div className='product-cart' key={id}>
                  <Text fontSize="2xl">{title} {price}</Text>
                </div>
              ))
            }
          </DrawerBody>
          <DrawerFooter>
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
