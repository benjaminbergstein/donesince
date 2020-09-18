const { gql } = require('apollo-server');

export default gql`
  type ActivityType {
    id: ID!
    name: String!
    attributeName: String
    attributeValue: Int
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
    recordedActivityId: ID!
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
    recordedActivitiesCount: Int!
  }

  type TimelineDate {
    date: String!
  }

  type User {
    id: ID!
    name: String!
  }

  type BarChartDataset {
    label: String!
    data: [Int!]
  }

  type BarChartData {
    labels: [String]!
    datasets: [BarChartDataset]!
  }

  type Query {
    me: User!
    searchActivityTypes(q: String!): [ActivityType!]
    searchActivityTypeAttributes(q: String!): [ActivityTypeAttribute]!
    listActivityTypes(id: ID, attributeName: String): [ActivityType!]!
    listActivityTypeAttributes(activityTypeId: ID!): [ActivityTypeAttribute!]!
    recordedActivities: [RecordedActivity!]
    activityTrends: [ActivityStat!]
    timeline(date: String!): [TimelineStat]
    timelineDates: [TimelineDate]!
    weeklyDimensionStats(weekNumber: Int): [WeeklyDimensionStat!]
    weeklyDimensionStatsBarChart(dimensionName: String!): BarChartData
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

  input RecordedActivityUpdate {
    recordedAt: String
  }

  type Mutation {
    createActivityType(activityTypeInput: ActivityTypeInput!):  ActivityType!
    setActivityTypeAttribute(activityTypeAttributeInput: ActivityTypeAttributeInput):  ActivityTypeAttribute!
    recordActivity(recordActivityInput: RecordedActivityInput): RecordedActivity!
    updateRecordedActivity(id: ID!, recordActivityUpdate: RecordedActivityUpdate!): RecordedActivity!
    signUp(signUpInput: SignUpInput!): User!
    authenticate(signInInput: SignInInput!): Authorization!
  }
`
