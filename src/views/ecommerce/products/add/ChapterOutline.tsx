import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  ChevronRight,
  ExpandMore,
  Edit,
  Delete,
  Check,
  PlayArrow,
  HelpOutline,
  Description,
} from '@mui/icons-material';

// Example data
const outlineData = [
  {
    idx: 1,
    name: 'chapter-1',
    title: 'Introduction',
    is_scorm_package: false,
    lessons: [
      { name: 'lesson-1', title: 'Lesson 1', icon: 'icon-youtube', is_complete: true },
      { name: 'lesson-2', title: 'Lesson 2', icon: 'icon-quiz', is_complete: false },
    ],
  },
  {
    idx: 2,
    name: 'chapter-2',
    title: 'Advanced Topics',
    is_scorm_package: false,
    lessons: [
      { name: 'lesson-3', title: 'Lesson 3', icon: 'icon-list', is_complete: false },
    ],
  },
];

type Chapter = {
  idx: number;
  name: string;
  title: string;
  is_scorm_package: boolean;
  lessons: Lesson[];
};

type Lesson = {
  name: string;
  title: string;
  icon: string;
  is_complete: boolean;
};

const ChapterOutline: React.FC = () => {
  const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({});

  const toggleChapter = (chapterName: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterName]: !prev[chapterName],
    }));
  };

  const handleAddChapter = () => {
    console.log('Add Chapter');
  };

  const handleEditChapter = (chapterName: string) => {
    console.log('Edit Chapter:', chapterName);
  };

  const handleDeleteChapter = (chapterName: string) => {
    console.log('Delete Chapter:', chapterName);
  };

  const handleDeleteLesson = (lessonName: string, chapterName: string) => {
    console.log('Delete Lesson:', lessonName, 'from Chapter:', chapterName);
  };

  const renderLessonIcon = (icon: string) => {
    switch (icon) {
      case 'icon-youtube':
        return <PlayArrow fontSize="small" />;
      case 'icon-quiz':
        return <HelpOutline fontSize="small" />;
      case 'icon-list':
        return <Description fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Course Outline</Typography>
        <Button variant="contained" size="small" onClick={handleAddChapter}>
          Add Chapter
        </Button>
      </Box>

      {outlineData.map((chapter) => (
        <Box key={chapter.name} mb={2}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              onClick={() => toggleChapter(chapter.name)}
            >
              {expandedChapters[chapter.name] ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
            <Typography
              variant="body1"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleChapter(chapter.name)}
            >
              {chapter.title}
            </Typography>
            <Box ml="auto">
              <IconButton size="small" onClick={() => handleEditChapter(chapter.name)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleDeleteChapter(chapter.name)}>
                <Delete fontSize="small" color="error" />
              </IconButton>
            </Box>
          </Box>
          <Collapse in={expandedChapters[chapter.name]} timeout="auto" unmountOnExit>
            <List>
              {chapter.lessons.map((lesson) => (
                <ListItem key={lesson.name} sx={{ pl: 4 }}>
                  <Box display="flex" alignItems="center" width="100%">
                    {renderLessonIcon(lesson.icon)}
                    <ListItemText primary={lesson.title} sx={{ ml: 2 }} />
                    {lesson.is_complete && <Check fontSize="small" color="success" />}
                    <IconButton
                      size="small"
                      sx={{ ml: 'auto' }}
                      onClick={() => handleDeleteLesson(lesson.name, chapter.name)}
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ChapterOutline;
