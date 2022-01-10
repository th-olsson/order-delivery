import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/layout/nav/Navbar'
import client from "../lib/apolloClient";
import { GET_CATEGORIES_WITH_PRODUCTS } from "../lib/graphql";

const Home: NextPage = ({ categoriesWithProducts }: any) => {
  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Nav />
      <Heading as="h1">Order delivery</Heading>

      {/* TODO: make separate components */}
      {categoriesWithProducts.map((category: any) => (
        <div key={category.id}>
          {/* TODO: don't display category if empty */}
          <h2>{category.name}</h2>
          <ul>
            {category.products.map((product: any) => (
              <li key={product.id}>
                <p>{product.title}</p>
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
  const { data, error } = await client.query({
    query: GET_CATEGORIES_WITH_PRODUCTS
  });

  let categoriesWithProducts;

  if (data) {
    categoriesWithProducts = data.categories;
    console.log(categoriesWithProducts);
  } else if (error) {
    console.log(error);
  }

  return {
    props: {
      categoriesWithProducts,
    },
  };
}

export default Home
