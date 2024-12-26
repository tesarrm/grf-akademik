// React Imports
import type { ReactElement } from 'react'

// export default function Page() {
//   return <h1>Mapel</h1>
// }

// Component Imports
// import AcademyMyCourse from '@/views/apps/academy/my-courses'
import AcademyMyCourse from '@/views/my-courses'
import AccountSettings from '@/views/account-settings'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Data Imports
import { getAcademyData } from '@/app/server/real-actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/academy` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getAcademyData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/academy`)

  if (!res.ok) {
    throw new Error('Failed to fetch academy data')
  }

  return res.json()
} */


const MyCoursePage = async () => {
  // Vars
  const mode = getServerMode()
  const data = await getAcademyData()


  return <AcademyMyCourse mode={mode} courseData={data?.courses} />
}

export default MyCoursePage
