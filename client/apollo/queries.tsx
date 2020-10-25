import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      name
    }
  }
`

export const FETCH_RECORDED_ACTIVITY = gql`
  query FetchRecordedActivity($id: ID!) {
    fetchRecordedActivity(id: $id) {
      activityTypeId
      recordedAt
      activityType {
	name
      }
    }
  }
`
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
export const LIST_ACTIVITY_TYPES_WITH_ATTRIBUTE = gql`
  query ListActivityTypesWithAttribute($attributeName: String!) {
    listActivityTypes(attributeName: $attributeName) {
      id
      name
      attributeName
      attributeValue
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
  query MyActivities($date: String!) {
    timeline(date: $date) {
      activityTypeId
      name
      recordedAt
      recordedActivityId
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

export const WEEKLY_DIMENSION_STATS_BAR_CHART = gql`
  query WeeklyDimensionStatsBarChart($dimensionName: String!) {
    weeklyDimensionStatsBarChart(dimensionName: $dimensionName) {
      labels
      datasets {
	label
	data
      }
    }
  }
`

export const UPDATE_RECORDED_ACTIVITY = gql`
  mutation UpdateRecordedActivity(
    $id: ID!,
    $recordedAt: String
  ) {
    updateRecordedActivity(
      id: $id,
      recordActivityUpdate: {
        recordedAt: $recordedAt
      }
    ) {
      recordedAt
    }
  }
`

export const LOG_IN = gql`
  mutation LogIn(
    $name: String!
  ) {
    authenticate(
      signInInput: { name: $name }
    ) {
      apiToken
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
  ) {
    signUp(
      signUpInput: { name: $name }
    ) {
      apiToken
    }
  }
`

export const RECORDED_ACTIVITY_RECOMMENDATIONS = gql`
  query RecordedActivityRecommendations {
    recordedActivityTimeRecommendations {
      activityTypeId
      ofDay
      secondsOffset
    }
  }
`
