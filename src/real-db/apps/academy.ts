// Type Imports
import type { AcademyType } from '@/types/apps/academyTypes'

export const db: AcademyType = {
  courses: [
    {
      id: 1,
      user: 'Lauretta Coie',
      image: '/images/avatars/1.png',
      tutorImg: '/images/apps/academy/1.png',
      completedTasks: 19,
      totalTasks: 25,
      userCount: 18,
      note: 20,
      view: 83,
      time: '17h 34m',
      logo: 'tabler-brand-angular',
      color: 'error',
      courseTitle: 'Basics of Angular',
      desc: 'Introductory course for Angular and framework basics with TypeScript',
      tags: 'Web',
      rating: 4.4,
      ratingCount: 8
    },
  ],

  courseDetails: {
    title: 'UI/UX Basic Fundamentals',
    about:
      'Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included!',
    instructor: 'Devonne Wallbridge',
    instructorAvatar: '/images/avatars/1.png',
    instructorPosition: 'Web Developer, Designer, and Teacher',
    skillLevel: 'All Level',
    totalStudents: 38815,
    language: 'English',
    isCaptions: true,
    length: '1.5 total hours',
    totalLectures: 19,
    description: [
      `The material of this course is also covered in my other course about web design and development with HTML5 & CSS3. Scroll to the bottom of this page to check out that course, too! If you're already taking my other course, you already have all it takes to start designing beautiful websites today!`,
      `"Best web design course: If you're interested in web design, but want more than just a "how to use WordPress" course, I highly recommend this one." — Florian Giusti`,
      `"Very helpful to us left-brained people: I am familiar with HTML, CSS, jQuery, and Twitter Bootstrap, but I needed instruction in web design. This course gave me practical, impactful techniques for making websites more beautiful and engaging." — Susan Darlene Cain`
    ],
    content: [
      {
        title: 'Course Content',
        id: 'section1',
        topics: [
          { title: 'Welcome to this course', time: '2.4 min', isCompleted: true },
          { title: 'Watch before you start', time: '4.8 min', isCompleted: true },
          { title: 'Basic Design theory', time: '5.9 min', isCompleted: false },
          { title: 'Basic Fundamentals', time: '3.6 min', isCompleted: false },
          { title: 'What is ui/ux', time: '10.6 min', isCompleted: false }
        ]
      },
      {
        title: 'Web design for Developers',
        id: 'section2',
        topics: [
          { title: 'How to use Pages in Figma', time: '8.31 min', isCompleted: false },
          { title: 'What is Lo Fi Wireframe', time: '2 min', isCompleted: false },
          { title: 'How to use color in Figma', time: '5.9 min', isCompleted: false },
          { title: 'Frames vs Groups in Figma', time: '3.6 min', isCompleted: false }
        ]
      },
      {
        title: 'Build Beautiful Websites!',
        id: 'section3',
        topics: [
          { title: 'Section & Div Block', time: '3.53 min', isCompleted: false },
          { title: 'Read-Only Version of Chat App', time: '2.03 min', isCompleted: false },
          { title: 'Webflow Autosave', time: '8 min', isCompleted: false },
          { title: 'Canvas Settings', time: '3 min', isCompleted: false },
          { title: 'HTML Tags', time: '10 min', isCompleted: false },
          { title: 'Footer (Chat App)', time: '9.10 min', isCompleted: false }
        ]
      },
      {
        title: 'Final Project',
        id: 'section4',
        topics: [
          { title: 'Responsive Blog Site', time: '10 min', isCompleted: false },
          { title: 'Responsive Portfolio', time: '13 min', isCompleted: false },
          { title: 'Basic Design theory', time: '15 min', isCompleted: false }
        ]
      }
    ]
  }
}
