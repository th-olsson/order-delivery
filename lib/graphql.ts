import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      title
      description
      price
      images
    }
  }
`;

export const GET_CATEGORY_NAMES = gql`
  query GetCategories {
    categories {
      id
      name
      }
    }
`;

export const GET_CATEGORIES_WITH_PRODUCTS = gql`
  query GetCategoriesWithProducts {
    categories {
      id
      name
      products {
        id
        title
        description
        price
        # images
      }
    }
  }
`;

