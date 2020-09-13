export interface CreateActivityTypeArgs {
  name: string
}

export interface UpdateRecordedActivityArgs {
  recordedAt?: string
}

export interface SignUpArgs {
  name: string
}

export interface RecordActivityArgs {
  activityTypeId: number
  recordedAt: string
}

export interface AuthenticateArgs {
  signInInput: { name: string }
}

export interface ActivityTypeAttributeArgs {
  activityTypeId: number
  name: string
  value: number
}

export interface TimelineArgs {
  offset: number
}

