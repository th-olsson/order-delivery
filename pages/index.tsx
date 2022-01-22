import { Heading, Link as ChakraLink } from '@chakra-ui/react';
import Head from 'next/head'
import NextLink from 'next/link';
import Image from 'next/image';
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery } from 'lib/graphql/generated';
import { GET_CATEGORIES_WITH_PRODUCTS } from "lib/graphql/queries";
import Product from 'components/product/Product';
import Category from 'components/category/Category';

const host = process.env.NEXT_PUBLIC_HOST_URL || '';
console.log(host)

function Home({ categories }: GetCategoriesWithProductsQuery) {

  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Heading as="h1">Order delivery</Heading>

      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Category
              page="home"
              id={category.id}
              name={category.name}
              imageUrl={category.image?.url}
            />

            <ul>
              {category.products?.map(({ id, name, price, image }) => (
                <li key={id}>
                  <Product page='home' id={id}
                    name={name}
                    price={price}
                    imageUrl={image?.url} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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
