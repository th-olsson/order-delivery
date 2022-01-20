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
import { useQuery } from '@apollo/client';
import { GetCategoriesNamesQuery, GetCategoriesNamesQueryVariables } from 'lib/graphql/generated';
import { GET_CATEGORIES_NAMES } from 'lib/graphql/queries';

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useQuery<GetCategoriesNamesQuery, GetCategoriesNamesQueryVariables>(
    GET_CATEGORIES_NAMES,
  );

  const categories = data?.categories;

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
            <NavLink href='/' text='Home' />
            {loading && <div>Categories loading...</div>}
            {
              categories && categories?.map(category => (
                <NavLink href={`/category/${category?.id}`} key={category?.id} text={category?.name!} />
              ))
            }
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => { console.log(data); console.log('loading', loading); console.log('categories', categories) }}>Log test</Button>
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
