import { useContext } from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import apolloClient from "lib/apolloClient";
import { GetAllProductsQuery, GetSingleProductQuery } from "lib/graphql/generated";
import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS } from "lib/graphql/queries";
import { Box, Button, useToast, VStack, Text, Container, } from "@chakra-ui/react";
import { CartContext } from 'contexts/CartContext';
import Product from "components/product/Product";

function SingleProduct({ product }: GetSingleProductQuery) {
  const { addItem } = useContext(CartContext);
  const addCartToast = useToast();

  function addToCart() {
    // Add to local storage

    // Add to cart context
    addItem(product?.id!, product?.name!, product?.price!, product?.image?.url);

    // Display a toast message
    addCartToast({
      title: `${product?.name} lades till i din varukorg.`,
      status: 'success',
      duration: 2500,
      isClosable: true,
    });
  }

  return (
    <>
      <Head>
        <title>Skicka {product?.name} inom Stockholm | Blommis</title>
      </Head>
      <Box
        borderRadius='3xl'
        ml='5'
        mr='5'
        pl='15'
        pr='15'
        pt='4rem'
      >
        {/* TODO: Add breadcrumbs navigation  */}
        <VStack>
          <Product
            page='product'
            id={product?.id!}
            name={product?.name}
            price={product?.price}
            imageUrl={product?.image?.url}
          />
          <Button
            onClick={addToCart}
            bgColor='purple.100'
            _hover={
              { bgColor: 'purple.200' }
            }
          >Lägg till i varukorgen</Button>
          <Container>
            <Text>
              {product?.description}
            </Text>
          </Container>
        </VStack>
      </Box>
    </>
  )
}

export async function getStaticPaths() {
  // TODO: Change to GET_PRODUCTS_SLUGS

  const { data: { products } } = await apolloClient.query<GetAllProductsQuery>({
    query: GET_ALL_PRODUCTS,
  });

  const ids = products?.map((product) => (product.id))
  const paths = ids?.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = params?.id;

  const { data: { product } } = await apolloClient.query<GetSingleProductQuery>({
    query: GET_SINGLE_PRODUCT,
    variables: { id },
  });

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    }
  };
}

export default SingleProduct;