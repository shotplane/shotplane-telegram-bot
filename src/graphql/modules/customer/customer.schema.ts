import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCustomer(q: QueryGetListInput): CustomerPageData
    getOneCustomer(id: ID!): Customer
    customerGetMe: Customer
    # Add Query
  }

  type SummaryReferralAmountData {
    amount: Float
  }

  extend type Mutation {
    updateCustomer(id: ID!, data: UpdateCustomerInput!): Customer
    deleteOneCustomer(id: ID!): Customer
    loginByAddress(
      address: String!
      addressIp: String!
    ): CustomerLoginData

    customerUpdateMe(telegram: String, email: String!): Customer
  }

  type CustomerLoginData {
    token: String
    customer: Customer
  }

  input UpdateCustomerInput {
    status: String
    approved: Boolean
  }

  type CustomerLoginData {
    customer: Customer
    token: String
  }

  type Customer {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    username: String
    address: String
    referral: String
    shortUrl: String
    activedAt: DateTime
    role: String
    nonce: String
    addressIp: String

    bannerUrl: String
    avatarUrl: String
    status: String
  }

  type CustomerPageData {
    data: [Customer]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
