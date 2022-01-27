import {
  Heading,
  UnorderedList as Ul,
  ListItem as Li,
  VStack,
  Container,
  Text,
  SimpleGrid,
  Box
} from '@chakra-ui/react';
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
        <title>Skicka blommor inom Stockholm | Blommis</title>
      </Head>
      <Box
        borderRadius='3xl'
        ml='5'
        mr='5'
        pl='15'
        pr='15'
        pt='4rem'
      >
        <Container pt='5' pb='5'>
          <Heading as="h1"
            textAlign='center'
            fontStyle='italic'
            size='xl'
            pb='5'
          >Skicka blommor inom Stockholm</Heading>
          <Text fontSize='xl' textAlign='center'>
            Välkommen till Blommis blommor! <br /> Här kan du beställa blomsterbud. <br /> Vi levererar till adresser inom Stockholm.
          </Text>
        </Container>

        <Ul styleType='none' m='auto'>
          <VStack spacing={4} justifyItems='center'>
            {categories?.map((category) => (
              <Li key={category.id} w='full'>
                <Category
                  page="home"
                  id={category.id}
                  name={category.name}
                  imageUrl={category.image?.url}
                />

                <Ul styleType='none' m='auto'>
                  <SimpleGrid
                    columns={{ sm: 2, md: 2, lg: 3, xl: 4 }}
                    spacingX={{ sm: 0, md: 10, lg: 10, xl: 10 }}
                  >
                    {category.products?.map(({ id, name, price, image }) => (
                      <Li key={id}
                        pb='10'
                        pl={['1', '1.5', '25', '25']}
                        pr={['1', '1.5', '25', '25']}
                      >
                        <Product
                          page='home'
                          id={id}
                          name={name}
                          price={price}
                          imageUrl={image?.url}
                        />
                      </Li>
                    ))}
                  </SimpleGrid>
                </Ul>
              </Li>
            ))}
          </VStack>
        </Ul>
      </Box>
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
