import { gql } from 'apollo-boost'

export const SEARCH_ACTIVITY_TYPES = gql`
  query SearchActivityTypes($q: String!) {
    searchActivityTypes(q: $q) {
      name
      id
    }
  }
`

export const SEARCH_ACTIVITY_TYPE_ATTRIBUTES = gql`
  query SearchActivityTypeAttributes($q: String!) {
    searchActivityTypeAttributes(q: $q) {
      name
      value
    }
  }
`

export const LIST_ACTIVITY_TYPES = gql`
  query ListActivityTypes($id: ID) {
    listActivityTypes(id: $id) {
      name
      id
    }
  }
`

export const LIST_ACTIVITY_TYPE_ATTRIBUTES = gql`
  query ListActivityTypeAttributes($activityTypeId: ID!) {
    listActivityTypeAttributes(activityTypeId: $activityTypeId) {
      id
      name
      value
    }
  }
`

export const MY_ACTIVITIES = gql`
  query MyActivities($offset: Int!) {
    timeline(offset: $offset) {
      activityTypeId
      name
      recordedAt
      recordedById
      sinceLast
      humanReadableDate
      ofDay
    }
  }
`

export const MY_TRENDS = gql`
  query MyTrends {
    activityTrends {
      name
      averageInterval
      lastRecordedAt
      activityTypeId
      countRecords
    }
  }
`
export const RECORD_ACTIVITY = gql`
  mutation RecordActivity($activityTypeId: ID!, $recordedAt: String!) {
    recordActivity(recordActivityInput: {
      activityTypeId: $activityTypeId,
      recordedAt: $recordedAt,
    }) {
      recordedAt
      activityTypeId
    }
  }
`

export const CREATE_ACTIVITY_TYPE = gql`
  mutation CreateActivityType($name: String!) {
    createActivityType(activityTypeInput: { name: $name }) {
      id
      name
    }
  }
`

export const NEW_ACTIVITY_TYPE = gql`
  fragment NewActivityType on ActivityType {
    id
    name
  }
`

export const SET_ACTIVITY_TYPE_ATTRIBUTE = gql`
  mutation SetActivityTypeAttribute(
    $activityTypeId: ID!,
    $name: String!,
    $value: Int!,
  ) {
    setActivityTypeAttribute(activityTypeAttributeInput: {
      activityTypeId: $activityTypeId,
      name: $name,
      value: $value
    }) {
      id
      name
      value
    }
  }
`

export const WEEKLY_DIMENSION_STATS = gql`
  query WeeklyDimensionStats($weekNumber: Int) {
    weeklyDimensionStats(weekNumber: $weekNumber) {
      weekNumber
      dimensionName
      deltaVsPreviousWeek
      previousWeekValue
      deltaVsBestWeek
      bestWeekValue
      value
    }
  }
`
