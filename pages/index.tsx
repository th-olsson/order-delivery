import { Heading } from '@chakra-ui/react';
import Head from 'next/head'
import NextLink from 'next/link';
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery } from 'lib/graphql/generated';
import { GET_CATEGORIES_WITH_PRODUCTS } from "lib/graphql/queries";

function Home({ categories }: GetCategoriesWithProductsQuery) {

  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Heading as="h1">Order delivery</Heading>

      {/* TODO: make separate components */}
      {categories?.map((category: any) => (
        <div key={category.id}>
          {/* TODO: don't display category if empty */}
          <NextLink href={`/category/${category.id}`} passHref>
            <a><h2>{category.name}</h2></a>
          </NextLink>
          <ul>
            {category.products.map((product: any) => (
              <li key={product.id}>
                <NextLink href={`/product/${product.id}`} passHref>
                  <a><p>{product.name}</p></a>
                </NextLink>
                <p>{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const { data: { categories } } = await apolloClient.query<GetCategoriesWithProductsQuery>({
    query: GET_CATEGORIES_WITH_PRODUCTS
  });

  if (!categories) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categories,
    },
  };
}

export default Home
