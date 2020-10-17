import data from '../data/recordedActivityTimeRecommendations'

interface RecordedActivityTimeRecommendation {
  activityTypeId: number
  secondsOffset: number
  ofDay: number
}

const Recommendations: RecordedActivityTimeRecommendation[]  = data.data.recordedActivityTimeRecommendations

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
  desiredActivityTypeId: number | undefined,
) => RecordedActivityTimeRecommendation[] = (
  desiredActivityTypeId
) => desiredActivityTypeId === undefined ? [] : Recommendations.filter(
  ({ activityTypeId }) => parseInt(''+desiredActivityTypeId) === activityTypeId
)

