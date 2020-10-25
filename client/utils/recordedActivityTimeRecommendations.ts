// import data from '../data/recordedActivityTimeRecommendations'

import {
  RecordedActivityRecommendations_recordedActivityTimeRecommendations as RecordedActivityRecommendation,
} from '../types/RecordedActivityRecommendations'

export const applyRecommendation: (
  dateForRecording: Date,
  secondsOffset: number
) => Date = (
  dateForRecording,
  secondsOffset
) => {
  const startOfDateForRecording = new Date(dateForRecording.getTime())
  startOfDateForRecording.setHours(0)
  startOfDateForRecording.setMinutes(0)
  startOfDateForRecording.setSeconds(0)
  startOfDateForRecording.setMilliseconds(0)

  return new Date(startOfDateForRecording.getTime() + (secondsOffset * 1000))
}

export const getRecommendations: (
  recommendations: RecordedActivityRecommendations[],
  desiredActivityTypeId: number | undefined,
) => RecordedActivityRecommendations[] = (
  recommendations,
  desiredActivityTypeId
) => desiredActivityTypeId === undefined ? [] : recommendations.filter(
  ({ activityTypeId }) => parseInt(''+desiredActivityTypeId) === activityTypeId
)

