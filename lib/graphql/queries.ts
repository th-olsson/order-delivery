import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      description
      price
      # images
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
        name
        description
        # images
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;
