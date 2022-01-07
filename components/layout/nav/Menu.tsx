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
  IconButton
} from '@chakra-ui/react'
import NavLink from './NavLink';
import { AiOutlineMenu } from 'react-icons/ai';

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [menuLinks] = useState(['See all products', 'Category 1', 'Category 2', 'About', 'Contact']);

  function strToHref(str: string) {
    return str.toLowerCase().replace(' ', '-');
  }
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="open menu"
        icon={<AiOutlineMenu />}
      />

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {
              menuLinks.map((link) => (
                <NavLink href={strToHref(link)} key={link} text={link} />
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

export default Menu;
