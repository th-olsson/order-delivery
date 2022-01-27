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
} from '@chakra-ui/react'
import NavLink from './NavLink';
import { GrMenu } from 'react-icons/gr';
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
        icon={<GrMenu />}
        size='lg'
        variant='ghost'
        _hover={{
          bgColor: 'orange.50'
        }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Meny</DrawerHeader>
          <DrawerBody>
            <NavLink href='/' text='Startsida' />
            {loading && <div>Loading categories...</div>}
            {/* TODO: Close menu on opening link */}
            {
              categories && categories?.map(category => (
                <NavLink href={`/category/${category?.id}`} key={category?.id} text={category?.name!} />
              ))
            }
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Stäng
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Menu;
