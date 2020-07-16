const { gql } = require('apollo-server');

export default gql`
  type ActivityType {
    id: ID!
    name: String!
  }

  type RecordedActivity {
    recordedAt: String!
    activityTypeId: ID!
    activityType: ActivityType!
    recordedBy: User!
  }

  type ActivityStat {
    activityTypeId: ID!
    name: String!
    averageInterval: String!
    lastRecordedAt: String!
    countRecords: Int!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    searchActivityTypes(q: String!): [ActivityType!]
    listActivityTypes: [ActivityType!]
    recordedActivities: [RecordedActivity!]
    activityTrends: [ActivityStat!]
  }

  input ActivityTypeInput {
    name: String!
  }

  input SignUpInput {
    name: String!
  }

  input RecordedActivityInput {
    activityTypeId: ID!
  }

  type Mutation {
    createActivityType(activityTypeInput: ActivityTypeInput!):  ActivityType!
    signUp(signUpInput: SignUpInput!): User!
    recordActivity(recordActivityInput: RecordedActivityInput): RecordedActivity!
  }
`
