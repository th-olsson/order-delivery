import NextLink from "next/link";
import Image from "next/image";
import {
  Link as ChakraLink,
  Heading,
  Box,
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
        <Box>
          <NextLink href={`/category/${id}`} passHref>
            <ChakraLink>
              <Heading as='h3'>{name}</Heading>
              {imageUrl &&
                <Image
                  height="100"
                  width="100"
                  src={`${host}${imageUrl}`}
                  alt={`${name} category image`}
                />
              }
            </ChakraLink>
          </NextLink>
        </Box>
      }
    </>
  );
}

export default Category;
