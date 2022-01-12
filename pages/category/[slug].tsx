import { GetStaticPropsContext } from "next";
import NextLink from "next/link";
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery, GetSingleCategoryQuery } from "lib/graphql/generated";
import { GET_CATEGORIES_WITH_PRODUCTS, GET_SINGLE_CATEGORY } from "lib/graphql/queries";
import { Button } from "@chakra-ui/react";


function SingleCategory({ category }: GetSingleCategoryQuery) {
  return (
    <>
      <NextLink href="/" passHref>
        <a>Go back</a>
      </NextLink>
      <h2>{category?.name}</h2>

      {/* Display products of category */}
      {category?.products?.map((product: any) => (
        <li key={product.id}>
          <NextLink href={`/product/${product.id}`} passHref>
            <a><p>{product.name}</p></a>
          </NextLink>
          <p>{product.price}</p>
        </li>
      ))}
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