const { gql } = require('apollo-server');

export default gql`
  type ActivityType {
    id: ID!
    name: String!
  }

  type ActivityTypeAttribute {
    id: ID!
    name: String!
    value: Int!
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
    ofDay: Int!
    humanReadableDate: String!
  }

  type WeeklyDimensionStat {
    dimensionName: String!
    weekNumber: Int!
    value: Int!
    previousWeekValue: Int!
    deltaVsPreviousWeek: Int!
    bestWeekValue: Int!
    deltaVsBestWeek: Int!
  }

  type TimelineDate {
    date: String!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    me: User!
    searchActivityTypes(q: String!): [ActivityType!]
    searchActivityTypeAttributes(q: String!): [ActivityTypeAttribute]!
    listActivityTypes(id: ID): [ActivityType!]
    listActivityTypeAttributes(activityTypeId: ID!): [ActivityTypeAttribute]!
    recordedActivities: [RecordedActivity!]
    activityTrends: [ActivityStat!]
    timeline(offset: Int!): [TimelineStat]
    timelineDates: [TimelineDate]!
    weeklyDimensionStats(weekNumber: Int): [WeeklyDimensionStat]!
  }

  type Authorization {
    apiToken: String!
  }

  input ActivityTypeInput {
    name: String!
  }

  input ActivityTypeAttributeInput {
    activityTypeId: ID!
    name: String!
    value: Int!
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
    setActivityTypeAttribute(activityTypeAttributeInput: ActivityTypeAttributeInput):  ActivityTypeAttribute!
    recordActivity(recordActivityInput: RecordedActivityInput): RecordedActivity!
    signUp(signUpInput: SignUpInput!): User!
    authenticate(signInInput: SignInInput!): Authorization!
  }
`
