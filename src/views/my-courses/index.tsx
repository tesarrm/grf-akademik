'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'

// Type Imports
import type { Mode } from '@core/types'
import type { Course } from '@/types/apps/academyTypes'

// Component Imports
import MyCourseHeader from './MyCourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'
import CustomTabList from '@core/components/mui/TabList'

type Props = {
  courseData?: Course[]
  mode: Mode,
  tabContentList: { [key: string]: ReactElement };
}

const AcademyMyCourse = ({ courseData, mode, tabContentList }: Props) => {
  // States
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          <MyCourseHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
        </Grid> */}
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab label='Account' icon={<i className='tabler-users' />} iconPosition='start' value='account' />
            <Tab label='Security' icon={<i className='tabler-lock' />} iconPosition='start' value='security' />
            <Tab
              label='Billing & Plans'
              icon={<i className='tabler-bookmark' />}
              iconPosition='start'
              value='billing-plans'
            />
            <Tab
              label='Notifications'
              icon={<i className='tabler-bell' />}
              iconPosition='start'
              value='notifications'
            />
            <Tab label='Connections' icon={<i className='tabler-link' />} iconPosition='start' value='connections' />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          {/* <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel> */}
        </Grid>
        <Grid item xs={12}>
          <Courses courseData={courseData} searchValue={searchValue} />
        </Grid>
        {/* <Grid item xs={12}>
          <ColoredCards />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FreeCourses />
        </Grid> */}
      </Grid>
    </TabContext>
  )
}

export default AcademyMyCourse
