import { gql } from 'apollo-boost'

export const SEARCH_ACTIVITY_TYPES = gql`
  query SearchActivityTypes($q: String!) {
    searchActivityTypes(q: $q) {
      name
      id
    }
  }
`
export const LIST_ACTIVITY_TYPES = gql`
  query ListActivityTypes {
    listActivityTypes {
      name
      id
    }
  }
`

export const MY_ACTIVITIES = gql`
  query MyActivities {
    timeline {
      activityTypeId
      name
      recordedAt
      recordedById
      sinceLast
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
