import NextLink from "next/link";
import {
  Link as ChakraLink,
  Heading,
  Box,
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
      {(page === 'home' || page === 'category') &&
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
