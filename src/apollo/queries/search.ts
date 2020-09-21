import gql from 'graphql-tag';

export default gql`
  query search(
    $type: SearchType!
    $query: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    search(
      type: $type
      query: $query
      first: $first
      after: $after
      before: $before
    ) {
      userCount
      edges {
        cursor
        node {
          ... on Organization {
            organizationLogin: login
          }
          ... on User {
            avatarUrl
            email
            name
            login
            anyPinnableItems
            bio
            company
            url
            websiteUrl
            projects {
              totalCount
            }
            isHireable
            followers {
              totalCount
            }
            twitterUsername
            repositories {
              totalCount
            }
            location
          }
        }
      }
    }
  }
`;
