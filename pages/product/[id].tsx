import { GetStaticPropsContext } from "next";
import NextLink from "next/link";
import client from "../../lib/apolloClient";
import { PRODUCT_QUERY, GET_PRODUCTS } from "../../lib/graphql";

// TODO: refactor and implement generated gql types
export function SingleProduct({ data }) {
  return (
    <>
      <NextLink href="/" passHref>
        <a>Go back</a>
      </NextLink>
      <h2>{data.product.name}</h2>
      <p>{data.product.price} sek</p>
      <p>{data.product.description}</p>
      {console.log(data)}
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  console.log('slug', slug);
  const id = slug;

  const { data, error } = await client.query({
    query: PRODUCT_QUERY,
    variables: { id: id },
  });

  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const { data, error } = await client.query({
    query: GET_PRODUCTS
  });

  const paths = [];

  if (data) {
    const products = data.products;
    products.map((product: any) => {
      paths.push({ params: { id: product.id } });
    });
  } else if (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: false,
  };
}

export default SingleProduct;