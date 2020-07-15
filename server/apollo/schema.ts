const { gql } = require('apollo-server');

  // type Player {
  //   id: ID!
  //   name: String!
  //   games: [Game]!
  // }

  // type Game {
  //   id: ID!
  //   title: String!
  //   creator: Player
  //   players: [Player]!
  // }

  // type GameAttribute {
  //   name: String!
  //   value: String!
  // }

  // type Card {
  //   id: ID!
  //   slug: String!
  // }

  // type CardAttribute {
  //   id: ID!
  //   cardId: ID!
  //   name: String!
  //   value: String!
  // }

  // input CardAttributeFilter {
  //   name: String!
  //   value: String!
  // }

    // players: [Player]!
    // me(token: String!): Player
    // gameAttributes(gameId: ID!): [GameAttribute]
    // gameCards(gameId: ID!, location: String): [Card]
    // gameCardsWithAttribute(gameId: ID!, attribute: CardAttributeFilter): [Card]
    // cardAttributes(cardIds: [ID]!): [CardAttribute]

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
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
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
