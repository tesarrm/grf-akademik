import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
//   Typography,
  IconButton,
  Tooltip,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ChapterDialog from './ChapterDialog';

import { useParams, useRouter } from "next/navigation";
import { useGetCourseOutlineQuery } from '@/redux-store/features/course/courseApi';


interface Chapter {
  name: string;
  title: string;
  idx: number;
  isScormPackage: boolean;
  lessons: Lesson[];
}

interface Lesson {
  name: string;
  title: string;
  icon: string;
  isComplete: boolean;
}

const sampleOutline: Chapter[] = [
  {
    name: 'chapter-1',
    title: 'Chapter 1',
    idx: 1,
    isScormPackage: false,
    lessons: [
      {
        name: 'lesson-1',
        title: 'Lesson 1',
        icon: 'icon-youtube',
        isComplete: true,
      },
      {
        name: 'lesson-2',
        title: 'Lesson 2',
        icon: 'icon-list',
        isComplete: false,
      },
    ],
  },
  {
    name: 'chapter-2',
    title: 'Chapter 2',
    idx: 2,
    isScormPackage: false,
    lessons: [],
  },
];

const ChapterOutline2: React.FC = () => {
  const [outline, setOutline] = useState(sampleOutline);
  const [allowEdit, setAllowEdit] = useState(true);

  const params = useParams();
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});
  const { data: outlineData, error, isLoading, refetch } = 
    useGetCourseOutlineQuery({courseName: params.courseName, getProgress: false});

  useEffect(() => {
    setOutline(outlineData?.message)
  },[outlineData])

  const handleAddChapter = () => {
    setModalOpen(true)
    // setCurrentChapter(chapter)
    // const newChapter: Chapter = {
    //   name: `chapter-${outline.length + 1}`,
    //   title: `Chapter ${outline.length + 1}`,
    //   idx: outline.length + 1,
    //   isScormPackage: false,
    //   lessons: [],
    // };
    // setOutline([...outline, newChapter]);
  };

  const handleEditChapter = (chapter: Chapter) => {
    setModalOpen(true)
    setCurrentChapter(chapter)

    // const newTitle = prompt('Edit Chapter Title', chapter.title);
    // if (newTitle) {
    //   setOutline(
    //     outline.map((ch) =>
    //       ch.name === chapter.name ? { ...ch, title: newTitle } : ch
    //     )
    //   );
    // }
  };

  const handleDeleteChapter = (chapter: Chapter) => {
    // if (window.confirm(`Are you sure you want to delete ${chapter.title}?`)) {
    //   setOutline(outline.filter((ch) => ch.name !== chapter.name));
    // }
  };

  const handleAddLesson = (chapter: Chapter) => {
    // const newLesson: Lesson = {
    //   name: `lesson-${chapter.lessons.length + 1}`,
    //   title: `Lesson ${chapter.lessons.length + 1}`,
    //   icon: 'icon-default',
    //   isComplete: false,
    // };
    // setOutline(
    //   outline.map((ch) =>
    //     ch.name === chapter.name
    //       ? { ...ch, lessons: [...ch.lessons, newLesson] }
    //       : ch
    //   )
    // );
  };

  const handleEditLesson = (lesson: Lesson, chapter: Chapter) => {
    setModalOpen(true)
    setCurrentChapter(chapter)
    setCurrentLesson(lesson)

    // const newTitle = prompt('Edit Lesson Title', lesson.title);
    // if (newTitle) {
    //   setOutline(
    //     outline.map((ch) =>
    //       ch.name === chapter.name
    //         ? {
    //             ...ch,
    //             lessons: ch.lessons.map((ls) =>
    //               ls.name === lesson.name ? { ...ls, title: newTitle } : ls
    //             ),
    //           }
    //         : ch
    //     )
    //   );
    // }
  };

  const handleDeleteLesson = (lesson: Lesson, chapter: Chapter) => {
    // if (window.confirm(`Are you sure you want to delete ${lesson.title}?`)) {
    //   setOutline(
    //     outline.map((ch) =>
    //       ch.name === chapter.name
    //         ? {
    //             ...ch,
    //             lessons: ch.lessons.filter((ls) => ls.name !== lesson.name),
    //           }
    //         : ch
    //     )
    //   );
    // }
  };

  const [modalOpen, setModalOpen] = useState(false);
//   const [outline, setOutline] = useState(0);

//   const sampleChapterDetail = {
//     title: "Introduction to React",
//     is_scorm_package: true,
//     scorm_package: {
//       file_name: "react-intro.zip",
//       file_size: "2.3 MB",
//     },
//   };

  const getCurrentChapter = () => {
    return currentChapter
  }

  const getCurrentLesson = () => {
    return currentLesson
  }

  const handleOutlineReload = () => {
    console.log("Outline reloaded");
    // setOutline(outline + 1);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={4} px={2}>
        <Typography variant="h6">Chapter Outline</Typography>
        {allowEdit && (
          <Button variant="contained" size="small" onClick={handleAddChapter}>
            Add Chapter
          </Button>
        )}
      </Box>

      {outline?.map((chapter:any) => (
        <Accordion key={chapter.name} defaultExpanded={chapter.idx === 1}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" width="100%">
              <Typography>{chapter.title}</Typography>
              <Box ml="auto" display="flex" gap={1}>
                {allowEdit && (
                  <>
                    <Tooltip title="Edit Chapter">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditChapter(chapter);
                        }}
                      >
                        <i className='tabler-edit text-[22px]' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Chapter">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChapter(chapter);
                        }}
                        color="error"
                      >
                        <i className='tabler-trash text-[22px]' />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {chapter.lessons.map((lesson:any) => (
                <ListItem key={lesson.name}>
                  <PlayCircleOutlineIcon sx={{ mr: 2 }} />
                  <ListItemText primary={lesson.title} />
                  {allowEdit && (
                    <Box ml="auto" display="flex" gap={1}>
                      <Tooltip title="Edit Lesson">
                        <IconButton onClick={() => handleEditLesson(lesson, chapter)}>
                            <i className='tabler-edit text-[22px]' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Lesson">
                        <IconButton
                          onClick={() => handleDeleteLesson(lesson, chapter)}
                          color="error"
                        >
                            <i className='tabler-trash text-[22px]' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
            {allowEdit && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddLesson(chapter)}
              >
                Add Lesson
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}


    {/* <ChapterDialog
      open={open}
      onClose={onClose}
      outlineReload={outlineReload}
      course={course}
      chapterDetail={currentChapter}
    /> */}
      <ChapterDialog
        open={modalOpen}
        // open={true}
        onClose={() => setModalOpen(false)}
        outlineReload={handleOutlineReload}
        course={params.courseName}
        chapterDetail={getCurrentChapter()}
        // lessonDetail={getCurrentLesson()}
        outline={outline}
        // setOutline={setOutline}
        refetch={refetch}
      />
    </Box>
  );
};

export default ChapterOutline2;
