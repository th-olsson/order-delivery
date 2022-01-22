import NextLink from "next/link";
import Image from "next/image";
import { Link as ChakraLink, Box } from "@chakra-ui/react";

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
          <p>{description}</p>
          <NextLink href={`/product/${id}`} passHref>
            <ChakraLink>
              {imageUrl &&
                <Image
                  height="100"
                  width="100"
                  src={`${host}${imageUrl}`}
                  alt={`${name} product image`}
                >
                </Image>
              }
              <p>{name}</p>
            </ChakraLink>
          </NextLink>
          <p>{price} sek</p>
        </Box>
      }
    </>
  )
}
export default Product;