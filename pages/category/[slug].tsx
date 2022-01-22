import { GetStaticPropsContext } from "next";
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from "next/link";
import Image from "next/image";
import apolloClient from "lib/apolloClient";
import { GetCategoriesWithProductsQuery, GetSingleCategoryQuery } from "lib/graphql/generated";
import { GET_CATEGORIES_WITH_PRODUCTS, GET_SINGLE_CATEGORY } from "lib/graphql/queries";

function SingleCategory({ category }: GetSingleCategoryQuery) {
  return (
    <>
      <NextLink href="/" passHref>
        <ChakraLink>
          <a>Go back</a>
        </ChakraLink>
      </NextLink>
      <h2>{category?.name}</h2>
      {category?.image &&
        <Image
          height="100"
          width="100"
          src={`${process.env.NEXT_PUBLIC_HOST_URL}${category.image.url}`}
          alt={`${category.name} category image`}
        />
      }

      {/* Display products of category */}
      {category?.products?.map((product: any) => (
        <li key={product.id}>
          <NextLink href={`/product/${product.id}`} passHref>
            <ChakraLink>
              {product.image &&
                <Image
                  height="100"
                  width="100"
                  src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.image.url}`}
                  alt={`${product.name} product image`}
                />
              }
              <a><p>{product.name}</p></a>
            </ChakraLink>
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