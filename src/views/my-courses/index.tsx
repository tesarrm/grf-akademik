'use client'

// React Imports
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { SyntheticEvent, ReactElement } from 'react'
import { useLoadUserQuery } from '@/redux-store/features/api/apiSlice'

// MUI Imports
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'

// Type Imports
import type { Mode } from '@core/types'
import type { Course } from '@/types/apps/academyTypes'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import MyCourseHeader from './MyCourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'
import CustomTabList from '@core/components/mui/TabList'


const AccountTab = dynamic(() => import('@views/account-settings/account'))
const SecurityTab = dynamic(() => import('@views/account-settings/security'))
const BillingPlansTab = dynamic(() => import('@views/account-settings/billing-plans'))
const NotificationsTab = dynamic(() => import('@views/account-settings/notifications'))
const ConnectionsTab = dynamic(() => import('@views/account-settings/connections'))

type Props = {
  courseData?: Course[]
  mode: Mode,
}

// type Course = {
//   id: number;
//   name: string;
// };

// type User = {
//   data?: {
//     is_moderator?: boolean;
//     is_instructor?: boolean;
//   };
// };

// type Courses = {
//   data?: {
//     created?: Course[];
//     enrolled?: Course[];
//     [key: string]: Course[] | undefined;
//   };
// };

// const getCourses = (label: string, courses: Courses): Course[] => {
//   return courses.data?.[label] || [];
// };

const AcademyMyCourse = ({ courseData, mode }: Props) => {
  // States
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  // Redux
  const {
    data: user,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });

  console.log(user);

  // Tab
  // const [tabs, setTabs] = useState<string[]>([]);

  // const addToTabs = (tab: string) => {
  //   setTabs((prev) => [...prev, tab]);
  // };

  // useEffect(() => {
  //   const initializeTabs = () => {
  //     const newTabs: string[] = [];
  //     newTabs.push('Live', 'New', 'Upcoming');

  //     if (user?.message) {
  //       newTabs.push('Enrolled');

  //       if (
  //         user?.message.is_moderator ||
  //         user?.message.is_instructor 
  //         // (courses.data?.created && courses.data.created.length > 0)
  //       ) {
  //         newTabs.push('Created');
  //       }

  //       if (user?.message.is_moderator) {
  //         newTabs.push('Under Review');
  //       }
  //     }

  //     setTabs(newTabs);
  //   };

  //   initializeTabs();
  // }, [user]);

  const [tabs, setTabs] = useState<
    {
      label: string;
      // courses: Course[];
      // count: number;
    }[]
  >([]);

  const addToTabs = useCallback(
    (label: string) => {
      const formattedLabel = label.toLowerCase().split(' ').join('_');
      // const courseList = getCourses(formattedLabel, courses);
      setTabs((prevTabs) => [
        ...prevTabs,
        {
          label,
          // courses: courseList,
          // count: courseList.length,
        },
      ]);
    },
    // [courses]
  );

  useEffect(() => {
    const initializeTabs = () => {
      const newTabs: {
        label: string;
        // courses: Course[];
        // count: number;
      }[] = [];

      const addToNewTabs = (label: string) => {
        const formattedLabel = label.toLowerCase().split(' ').join('_');
        // const courseList = getCourses(formattedLabel, courses);
        newTabs.push({
          label,
          // courses: courseList,
          // count: courseList.length,
        });
      };

      addToNewTabs('Live');
      addToNewTabs('New');
      addToNewTabs('Upcoming');

      if (user?.message) {
        addToNewTabs('Enrolled');

        if (
          user?.message.is_moderator ||
          user?.message.is_instructor 
          // (courses.message?.created && courses.message.created.length > 0)
        ) {
          addToNewTabs('Created');
        }

        if (user?.message.is_moderator) {
          addToNewTabs('Under Review');
        }
      }

      setTabs(newTabs);
    };

    initializeTabs();
  }, [user]);

  console.log(tabs);

  // Vars
  const tabContentList = (): { [key: string]: ReactElement } => ({
    account: <AccountTab />,
    security: <SecurityTab />,
    'billing-plans': <BillingPlansTab />,
    notifications: <NotificationsTab />,
    connections: <ConnectionsTab />
  })

  //Tab
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  // Generate tab elements
  const tabElements = useMemo(() => {
    return tabs.map((tab, index) => (
      <Tab
        key={index}
        label={
          <div className="flex items-center gap-2">
            {/* {tab.icon && <span className="h-5">{tab.icon}</span>} */}
            {tab.label}
            {/* <Badge color="default" badgeContent={tab.count} /> */}
          </div>
        }
        value={index}
      />
    ))
  }, [tabs])

  // if (!hasCourses) {
  //   return null
  // }

  return (
    <TabContext value={selectedTab}>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          <MyCourseHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
        </Grid> */}

        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            {/* <Tab label='Account' icon={<i className='tabler-users' />} iconPosition='start' value='account' />
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
            <Tab label='Connections' icon={<i className='tabler-link' />} iconPosition='start' value='connections' /> */}
            {tabElements}
          </CustomTabList>
        </Grid>

        <Grid item xs={12}>
          {/* <TabPanel value={selectedTab} className='p-0'>
            {tabContentList[selectedTab]}
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
