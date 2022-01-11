import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
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
        price
        # images
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;
