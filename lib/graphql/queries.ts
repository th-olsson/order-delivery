import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      description
      price
      image {
        url
      }
    }
  }
`;

export const GET_CATEGORIES_NAMES = gql`
  query GetCategoriesNames {
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
      image {
        url
      }
      products {
        id
        name
        description
        price
        image {
          url
        }
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
      image {
        url
      }
    }
  }
`;

export const GET_SINGLE_CATEGORY = gql`
  query GetSingleCategory($id: ID!) {
    category(where: { id: $id }) {
      id
      name
      image {
        url
      }
      products {
        id
        name
        price
        image {
          url
        }
      }
    }
  }
`;
