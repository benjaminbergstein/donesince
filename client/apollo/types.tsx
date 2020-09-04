export interface ActivityType {
  id: number
  name: string
}

export interface ActivityTypeAttribute {
  id: number
  name: string
  value: number
}

export interface RecordActivityInput {
  recordedAt: string
  activityTypeId: number
  clientId: string
}

export interface User {
  id: number
  name: string
}

export interface RecordedActivity {
  recordedAt: string
  activityType: ActivityType
  recordedBy: User
}

export interface TimelineStat {
  activityTypeId: number
  name: string
  recordedById: number
  recordedAt: string
  sinceLast: number
  ofDay: number
  humanReadableDate: string
}

export interface Trend {
  name: string
  averageInterval: number
  activityTypeId: number
  countRecords: number
  lastRecordedAt: string
}
