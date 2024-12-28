import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress
} from '@mui/material'
// import { useCreateChapterMutation } from "@/redux-store/features/course/courseApi";

import useChapterResources from './Custom'

interface ChapterDialogProps {
  open: boolean
  onClose: () => void
  outlineReload: () => void
  course: any
  //   chapterDetail?: {
  //     title?: string;
  //     is_scorm_package?: boolean;
  //     scorm_package?: any;
  //   };
  chapterDetail: any
  outline: any
  //   setOutline: () => void;
  //   setOutline: (outline: any) => void;
  //   lessonDetail: any;
  refetch: any
}

const ChapterDialog: React.FC<ChapterDialogProps> = ({
  open,
  onClose,
  outlineReload,
  course,
  chapterDetail,
  outline,
  refetch
  //   setOutline,
  //   lessonDetail,
}) => {
  //   const [createChapter, { isLoading: isCreating }] = useCreateChapterMutation();
  const { addChapter, editChapter } = useChapterResources({ course, chapterDetail, refetch })

  //   console.log(chapterDetail)

  // console.log(lessonDetail)

  //   const [chapter, setChapter] = useState({
  //     title: "",
  //     is_scorm_package: false,
  //     scorm_package: null,
  //   });

  useEffect(() => {
    if (chapterDetail) {
      setChapter({
        title: chapterDetail.title || '',
        is_scorm_package: chapterDetail.is_scorm_package || false,
        scorm_package: chapterDetail.scorm_package || null
      })
    }
  }, [chapterDetail])

  const [chapter, setChapter] = useState(chapterDetail || { title: '', name: '' })

  useEffect(() => {
    setChapter(chapterDetail || { title: '', name: '' })
  }, [chapterDetail])

  const handleSubmit = async () => {
    try {
      if (!chapter.title) {
        alert('Title is required')
        return
      }

      if (chapter.is_scorm_package && !chapter.scorm_package) {
        alert('Please upload a SCORM package')
        return
      }

      // addChapter(close, chapter)
      // await addChapter(() => setOpen(false), chapterData, refetch);
      if (!chapterDetail || Object.keys(chapterDetail).length === 0) {
        await addChapter(() => close, chapter, refetch)
        setChapter(null)
      } else {
        await editChapter(() => close, chapter, refetch)
      }

      outlineReload()
      onClose()
    } catch (error) {
      console.error('Error saving chapter:', error)
      alert('Failed to save the chapter.')
    }
  }

  //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const isValid = validateFile(file);
  //       if (isValid) {
  //         setChapter((prev) => ({ ...prev, scorm_package: file }));
  //       } else {
  //         alert("Only zip files are allowed");
  //       }
  //     }
  //   };

  //   const validateFile = (file: File) => {
  //     const extension = file.name.split(".").pop()?.toLowerCase();
  //     return extension === "zip";
  //   };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
      <DialogTitle>{chapterDetail ? 'Edit Chapter' : 'Add Chapter'}</DialogTitle>
      <DialogContent>
        {/* <TextField
          label="Title"
          value={chapter.title}
          onChange={(e) =>
            setChapter((prev:any) => ({ ...prev, title: e.target.value }))
          }
          fullWidth
          margin="normal"
          required
        /> */}
        <TextField
          label='Title'
          value={chapter?.title}
          //   onChange={(e) => handleTitleChange(e.target.value)}
          onChange={e => setChapter((prev: any) => ({ ...prev, title: e.target.value }))}
          fullWidth
          margin='normal'
          required
        />
        {/* <FormControlLabel
          control={
            <Switch
              checked={chapter.is_scorm_package}
              onChange={(e) =>
                setChapter((prev) => ({
                  ...prev,
                  is_scorm_package: e.target.checked,
                }))
              }
            />
          }
          label="SCORM Package"
        /> */}
        {/* {chapter.is_scorm_package && (
          <div>
            <Button
              variant="contained"
              component="label"
              sx={{ marginY: 2 }}
            >
              Upload SCORM Package
              <input
                type="file"
                hidden
                accept=".zip"
                onChange={handleFileUpload}
              />
            </Button>
            {chapter.scorm_package && (
              <div>
                <p>{chapter.scorm_package.name}</p>
                <Button
                  variant="text"
                  color="error"
                  onClick={() =>
                    setChapter((prev) => ({ ...prev, scorm_package: null }))
                  }
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          {!chapterDetail || Object.keys(chapterDetail).length === 0 ? 'Create' : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChapterDialog
