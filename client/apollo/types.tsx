export interface ActivityType {
  id: number
  name: string
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

export interface Trend {
  name: string
  averageInterval: float
  activityTypeId: number
  countRecords: number
}
