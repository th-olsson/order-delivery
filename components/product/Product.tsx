import NextLink from "next/link";
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
        <Box
          _hover={
            {
              border: 'solid 1px tomato'
            }
          }
          _focusWithin={
            { border: 'solid 1px tomato' }
          }
          bgColor='white'
        >
          <NextLink href={`/product/${id}`} passHref>
            <ChakraLink>
              {imageUrl &&
                <Image
                  pl='1.5'
                  pr='1.5'
                  maxH='15em'
                  w='100%'
                  src={`${host}${imageUrl}`}
                  alt={`${name} product image`}
                  objectFit='cover'
                  borderRadius='xl'
                >
                </Image>
              }
              <Container>
                <Heading as='h4' size='sm' textAlign='center'>{name}</Heading>
                <Text fontSize='lg' textAlign='center' fontFamily='monospace'>{price} sek</Text>
              </Container>
            </ChakraLink>
          </NextLink>
        </Box>
      }
    </>
  )
}
export default Product;