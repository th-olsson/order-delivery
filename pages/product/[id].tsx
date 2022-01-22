import { useContext } from "react";
import { GetStaticPropsContext } from "next";
import NextLink from "next/link";
import Image from "next/image";
import apolloClient from "lib/apolloClient";
import { GetAllProductsQuery, GetSingleProductQuery } from "lib/graphql/generated";
import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS } from "lib/graphql/queries";
import { Button, useToast } from "@chakra-ui/react";
import { CartContext } from 'contexts/CartContext';

function SingleProduct({ product }: GetSingleProductQuery) {
  const { addItem } = useContext(CartContext);
  const addCartToast = useToast();

  function addToCart() {
    // Add to local storage

    // Add to cart context
    addItem(product?.id!, product?.name!, product?.price!, product?.image?.url);

    // Display a toast message
    addCartToast({
      title: `${product?.name} has been added to your cart.`,
      description: "Go to checkout.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <>
      <NextLink href="/" passHref>
        <a>Go back</a>
      </NextLink>
      {product?.image &&
        <Image
          height="100"
          width="100"
          src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.image.url}`}
          alt={`${product.name} product image`}
        />
      }
      <h2>{product?.name}</h2>
      <p>{product?.price} sek</p>
      <p>{product?.description}</p>
      <Button>Order now</Button>
      <Button onClick={addToCart}>Add to cart</Button>
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