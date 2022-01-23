import NextLink from "next/link";
import NextImage from "next/image";
import {
  Link as ChakraLink,
  Box,
  Heading,
  Text,
  Container,
  Image,
} from "@chakra-ui/react";

interface ProductProps {
  page: 'home' | 'category' | 'product' | 'cart' | 'checkout';
  id: string,
  name: string | null | undefined,
  price: any | null | undefined,
  description?: string | null | undefined,
  imageUrl: string | null | undefined,
}
const host = process.env.NEXT_PUBLIC_HOST_URL || '';

function Product({ page, id, name, price, description, imageUrl }: ProductProps) {
  return (
    <>
      {page === 'home' &&
        <Box>
          <NextLink href={`/product/${id}`} passHref>
            <ChakraLink>
              {imageUrl &&
                <Image
                  h='20vh'
                  w='100%'
                  fit='cover'
                  src={`${host}${imageUrl}`}
                  alt={`${name} product image`}
                >
                </Image>
              }
              <Heading as='h4' size='sm'>{name}</Heading>
            </ChakraLink>
          </NextLink>
          <Text>{price} sek</Text>
        </Box>
      }
    </>
  )
}
export default Product;