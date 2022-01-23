import { Heading, UnorderedList as Ul, ListItem as Li, VStack, HStack, Container } from '@chakra-ui/react';
import Head from 'next/head'
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery } from 'lib/graphql/generated';
import { GET_CATEGORIES_WITH_PRODUCTS } from "lib/graphql/queries";
import Product from 'components/product/Product';
import Category from 'components/category/Category';

function Home({ categories }: GetCategoriesWithProductsQuery) {

  return (
    <>
      <Head>
        <title>Order delivery</title>
      </Head>
      <Heading as="h1" textAlign='center' size='xl'>Blomsterbutiken Stockholm</Heading>

      <Ul styleType='none' m='auto'>
        <Container>
          <VStack spacing={4}>
            {categories?.map((category) => (
              <Li key={category.id} w='full'>
                <Category
                  page="home"
                  id={category.id}
                  name={category.name}
                  imageUrl={category.image?.url}
                />

                <Ul styleType='none' m='auto'>
                  <HStack justifyContent='start'>
                    {category.products?.map(({ id, name, price, image }) => (
                      <Li key={id}>
                        <Product page='home' id={id}
                          name={name}
                          price={price}
                          imageUrl={image?.url}
                        />
                      </Li>
                    ))}
                  </HStack>
                </Ul>
              </Li>
            ))}
          </VStack>
        </Container>
      </Ul>
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
