import {
  PrismaClient,
  RecordedActivity,
  ActivityType,
  User,
} from "@prisma/client"

import { getCurrentDatestamp } from "../utils/date"
import { upload, download } from "../storage"
import getRecordedActivitySuggestions from "../queries/recordedActivityTimeRecommendations.sql"

const prisma = new PrismaClient()
const Prefix = "activityRecommendations"

const main: () => Promise<void> = async () => {
  const recommendations = await getRecordedActivitySuggestions(prisma)
  await prisma.disconnect()

  const recommendationsJSON = JSON.stringify(recommendations)
  const [month, day, year] = new Date().toLocaleDateString().split('/')
  const datestamp = `${year}-${month}-${day}`

  try {
    console.log(`Uploading to ${Prefix}/latest.json...`)
    await upload(
      `${Prefix}/latest.json`,
      recommendationsJSON
    )
    console.log("Done!")

    console.log(`Uploading to ${Prefix}/${datestamp}.json...`)
    await upload(
      `${Prefix}/${datestamp}.json`,
      recommendationsJSON
    )
    console.log("Done!")
  } catch (e) {
    console.error("Error!")
    console.error(e)
    process.exit(1)
  }
}

main().then(() => {
  console.log("Job complete!")
})
