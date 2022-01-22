import { Heading, Link as ChakraLink } from '@chakra-ui/react';
import Head from 'next/head'
import NextLink from 'next/link';
import Image from 'next/image';
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery } from 'lib/graphql/generated';
import { GET_CATEGORIES_WITH_PRODUCTS } from "lib/graphql/queries";

const host = process.env.NEXT_PUBLIC_HOST_URL || '';
console.log(host)

function Home({ categories }: GetCategoriesWithProductsQuery) {

  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Heading as="h1">Order delivery</Heading>

      {/* TODO: make separate components */}
      {categories?.map((category) => (
        <div key={category.id}>
          {/* TODO: don't display category if empty */}
          <NextLink href={`/category/${category.id}`} passHref>
            <ChakraLink>
              <a><h2>{category.name}</h2></a>
              {category.image &&
                <Image
                  height="100"
                  width="100"
                  src={`${host}${category.image.url}`}
                  alt={`${category.name} category image`}
                />
              }
            </ChakraLink>
          </NextLink>

          <ul>
            {category.products?.map((product) => (
              <li key={product.id}>
                <NextLink href={`/product/${product.id}`} passHref>
                  <ChakraLink>
                    {product.image &&
                      <Image
                        height="100"
                        width="100"
                        src={`${host}${product.image.url}`}
                        alt={`${product.name} product image`}
                      >
                      </Image>
                    }
                    <a><p>{product.name}</p></a>
                  </ChakraLink>
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
