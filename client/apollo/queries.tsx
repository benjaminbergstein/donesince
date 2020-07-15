import { gql } from 'apollo-boost'

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
    recordedActivities {
      recordedAt
      activityType {
        name
      }
    }
  }
`

export const MY_TRENDS = gql`
  query MyTrends {
    activityTrends {
      name
      averageInterval
    }
  }
`
export const RECORD_ACTIVITY = gql`
  mutation RecordActivity($activityTypeId: ID!) {
    recordActivity(recordActivityInput: { activityTypeId: $activityTypeId }) {
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
