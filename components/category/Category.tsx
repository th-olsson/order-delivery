import NextLink from "next/link";
import NextImage from "next/image";
import {
  Link as ChakraLink,
  Heading,
  Box,
  Image,
  Center,
} from "@chakra-ui/react";

interface CategoryProps {
  page: 'home' | 'category' | 'product' | 'cart' | 'checkout';
  id: string,
  name: string | null | undefined,
  imageUrl: string | null | undefined,
}
const host = process.env.NEXT_PUBLIC_HOST_URL || '';

function Category({ page, id, name, imageUrl }: CategoryProps) {
  return (
    <>
      {page === 'home' &&
        <Box textAlign='center'>
          <NextLink href={`/category/${id}`} passHref>
            <ChakraLink>
              <Center
                width='100%'
                height='4em'
              >
                <Heading
                  color='black.600'
                  zIndex='3'
                  as='h3'
                  size='lg'
                  borderRadius='lg'
                  fontSize='xx-large'
                  fontStyle='italic'
                >
                  {name}
                </Heading>
              </Center>
            </ChakraLink>
          </NextLink>
        </Box>
      }
    </>
  );
}

export default Category;
