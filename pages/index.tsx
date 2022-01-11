import { Heading } from '@chakra-ui/react';
import Head from 'next/head'
import NextLink from 'next/link';
import apolloClient from "lib/apolloClient";
import Nav from 'components/layout/nav/Navbar'
import { GetCategoriesWithProductsQuery } from 'lib/graphql/generated';
import { GET_CATEGORIES_WITH_PRODUCTS } from "lib/graphql/queries";

function Home({ categories }: GetCategoriesWithProductsQuery) {
  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Nav />
      <Heading as="h1">Order delivery</Heading>

      {/* TODO: make separate components */}
      {categories?.map((category: any) => (
        <div key={category.id}>
          {/* TODO: don't display category if empty */}
          <h2>{category.name}</h2>
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

  console.log(categories);

  return {
    props: {
      categories,
    },
  };
}

export default Home
