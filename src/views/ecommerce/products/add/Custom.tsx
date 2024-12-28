import { useInsertChapterReferenceMutation, useUpsertChapterMutation } from '@/redux-store/features/course/courseApi'
import { useState } from 'react'

interface Chapter {
  title: string
  is_scorm_package: boolean
  scorm_package?: string
  name?: string
}

interface Props {
  course: string
  chapterDetail?: { name: string }
  refetch: any
}

const useChapterResources = (props: Props) => {
  const [chapter, setChapter] = useState<Chapter>({
    title: '',
    is_scorm_package: false
  })

  const [upsertChapter] = useUpsertChapterMutation()
  const [insertChapterReference] = useInsertChapterReferenceMutation()

  const validateChapter = (chapterData: any): string | null => {
    if (!chapterData.title) {
      return 'Title is required'
    }
    // if (chapter.is_scorm_package && !chapter.scorm_package) {
    //   return 'Please upload a SCORM package';
    // }
    return null
  }

  //   const upsertChapter = async (chapterData: any): Promise<any> => {
  //     const response = await fetch('http://localhost:8003/api/method/lms.lms.api.upsert_chapter', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         title: chapterData.title,
  //         course: props.course,
  //         is_scorm_package: chapterData.is_scorm_package,
  //         scorm_package: chapterData.scorm_package,
  //         name: props.chapterDetail?.name,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.messages?.[0] || 'Failed to upsert chapter');
  //     }
  //     return response.json();
  //   };

  //   const insertChapterReference = async (chapterName: string): Promise<any> => {
  //     const response = await fetch('http://localhost:8003/api/method/frappe.client.insert', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         doc: {
  //           doctype: 'Chapter Reference',
  //           chapter: chapterName,
  //           parent: props.course,
  //           parenttype: 'LMS Course',
  //           parentfield: 'chapters',
  //         },
  //       }),
  //     });

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.messages?.[0] || 'Failed to insert chapter reference');
  //     }
  //     return response.json();
  //   };

  const addChapter = async (close: () => void, chapterData: any, refetchOutline: () => void) => {
    const validationError = validateChapter(chapterData)
    if (validationError) {
      console.log(validationError)
      return
    }

    try {
      const chapterResponse: any = await upsertChapter({
        chapter: chapterData,
        course: props.course,
        name: props.chapterDetail?.name
      }).unwrap()

      console.log(props)

      await insertChapterReference({
        chapterName: chapterResponse.message.name,
        course: props.course
      }).unwrap()

      refetchOutline()
      close()
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const editChapter = async (close: () => void, chapterData: any, refetchOutline: () => void) => {
    const validationError = validateChapter(chapterData)

    if (validationError) {
      console.log(validationError)
      return
    }

    try {
      await upsertChapter({
        chapter: chapterData,
        course: props.course,
        name: props.chapterDetail?.name
      }).unwrap()

      refetchOutline()
      close()
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return {
    chapter,
    setChapter,
    addChapter,
    editChapter
  }
}

export default useChapterResources
