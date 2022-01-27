import { GetStaticPropsContext } from "next";
import Head from "next/head";
import apolloClient from "lib/apolloClient";
import {
  Box,
  VStack,
  UnorderedList as Ul,
  ListItem as Li,
  SimpleGrid,
} from '@chakra-ui/react';
import { GetCategoriesWithProductsQuery, GetSingleCategoryQuery } from "lib/graphql/generated";
import { GET_CATEGORIES_WITH_PRODUCTS, GET_SINGLE_CATEGORY } from "lib/graphql/queries";
import Category from "components/category/Category";
import Product from "components/product/Product";

function SingleCategory({ category }: GetSingleCategoryQuery) {
  return (
    <>
      <Head>
        <title>{category?.name} - Skicka blommor inom Stockholm | Blommis</title>
      </Head>
      <Box
        borderRadius='3xl'
        ml='5'
        mr='5'
        pl='15'
        pr='15'
        pt='4rem'
      >

        {/* TODO: Add breadcrumbs navigation  */}
        <VStack spacing={4} justifyItems='center'>
          <Category
            page="category"
            id={category?.id!}
            name={category?.name}
            imageUrl={category?.image?.url}
          />

          <Ul styleType='none' m='auto'>
            <SimpleGrid
              columns={{ sm: 2, md: 2, lg: 3, xl: 4 }}
              spacingX={{ sm: 0, md: 10, lg: 10, xl: 10 }}

            >
              {category?.products?.map(({ id, name, price, image }) => (
                <Li key={id} pb='10'
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

        </VStack>
      </Box>
    </>
  )
}

export async function getStaticPaths() {
  // TODO: Change to GET_CATEGORIES_SLUGS

  const { data: { categories } } = await apolloClient.query<GetCategoriesWithProductsQuery>({
    query: GET_CATEGORIES_WITH_PRODUCTS,
  });

  const ids = categories?.map((category) => (category.id))
  const paths = ids?.map((id) => ({ params: { slug: id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = params?.slug;

  const { data: { category } } = await apolloClient.query<GetSingleCategoryQuery>({
    query: GET_SINGLE_CATEGORY,
    variables: { id },
  });

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      category,
    }
  };
}

export default SingleCategory;