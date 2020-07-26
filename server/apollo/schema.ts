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

  type TimelineStat {
    activityTypeId: ID!
    name: String!
    recordedById: ID!
    recordedAt: String!
    sinceLast: String!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    me: User!
    searchActivityTypes(q: String!): [ActivityType!]
    listActivityTypes: [ActivityType!]
    recordedActivities: [RecordedActivity!]
    activityTrends: [ActivityStat!]
    timeline: [TimelineStat]
  }

  type Authorization {
    apiToken: String!
  }

  input ActivityTypeInput {
    name: String!
  }

  input SignUpInput {
    name: String!
  }

  input SignInInput {
    name: String!
  }

  input RecordedActivityInput {
    activityTypeId: ID!
    recordedAt: String!
  }

  type Mutation {
    createActivityType(activityTypeInput: ActivityTypeInput!):  ActivityType!
    signUp(signUpInput: SignUpInput!): User!
    recordActivity(recordActivityInput: RecordedActivityInput): RecordedActivity!
    authenticate(signInInput: SignInInput!): Authorization!
  }
`
