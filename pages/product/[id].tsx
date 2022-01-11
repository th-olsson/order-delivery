import { GetStaticPropsContext } from "next";
import NextLink from "next/link";
import apolloClient from "lib/apolloClient";
import { GetAllProductsQuery, GetSingleProductQuery } from "lib/graphql/generated";
import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS } from "lib/graphql/queries";

function SingleProduct({ product }: GetSingleProductQuery) {
  return (
    <>
      <NextLink href="/" passHref>
        <a>Go back</a>
      </NextLink>
      <h2>{product?.name}</h2>
      <p>{product?.price} sek</p>
      <p>{product?.description}</p>
    </>
  )
}

export async function getStaticPaths() {
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