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
  Link as ChakraLink,
  VStack,
  Center,
  Divider,
} from '@chakra-ui/react'
import { BsBasket3 } from 'react-icons/bs'
import { CartContext } from 'contexts/CartContext';
import NextLink from 'next/link';
import Image from 'next/image';


function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cart, removeItem, addItem } = useContext(CartContext)

  return (
    <>
      <HStack>
        <IconButton
          onClick={onOpen}
          aria-label="open menu"
          icon={
            <>
              <BsBasket3 />
              <Text fontSize="md" pl='1' fontWeight='normal' fontFamily='monospace' >
                ({cart.length})
              </Text>
            </>
          }
          size="lg"
          variant='ghost'
          _hover={{
            bgColor: 'orange.50',
          }}
        />
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Varukorgen</DrawerHeader>
          <DrawerBody>
            {cart.length > 0 ? (
              cart.map(({ id, name, price, quantity, imageUrl }) => (
                <VStack className='cart-item' key={id}>
                  <Text fontSize='xl' fontWeight='normal' fontStyle='italic' >{name} {price} kr</Text>
                  <HStack>
                    {imageUrl &&
                      <Image
                        height="75"
                        width="75"
                        src={`${process.env.NEXT_PUBLIC_HOST_URL}${imageUrl}`}
                        alt={`${name} product image`}
                      />}
                    <Button onClick={() => { removeItem(id) }}>-</Button>
                    <Text fontWeight='semibold'>{quantity}</Text>
                    <Button onClick={() => { addItem(id, name, price, imageUrl) }}>+</Button>
                  </HStack>
                  <Divider />
                </VStack>
              ))
            ) : (
              <Text>Här var det tomt!</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <VStack>
              <Center>
                <Text fontSize='2xl' fontWeight='semibold'>
                  Totalt: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} kr
                </Text>
              </Center>
              <HStack>
                <NextLink href="/checkout" passHref>
                  <ChakraLink>
                    <Text
                      fontSize='lg'
                      fontWeight='semibold'
                      bgColor='orange.200'
                      _hover={{
                        bgColor: 'orange.100',
                      }}
                      px='2'
                      py='1'
                      rounded='sm'
                    >
                      Gå till kassan
                    </Text>
                  </ChakraLink>
                </NextLink>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Stäng
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Cart;
