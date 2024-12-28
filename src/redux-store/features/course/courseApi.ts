import { apiSlice } from '../api/apiSlice'

export const courseApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCategory: builder.query({
      query: () => ({
        url: 'api/resource/LMS Category',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    getAllUser: builder.query({
      query: () => ({
        url: 'api/resource/User',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    getAllCurrency: builder.query({
      query: () => ({
        url: 'api/resource/Currency',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    // createCourse: builder.mutation({
    //   query: (data) => ({
    //     url: "create-course",
    //     method: "POST",
    //     body: data,
    //     credentials: "include" as const,
    //   }),
    // }),
    // createCourse: builder.mutation({
    //   query: (data) => ({
    //     url: "api/method/frappe.client.insert",
    //     method: "POST",
    //     body: {
    //       doc: {
    //         doctype: "LMS Course", // Sama seperti di Vue
    //         image: data.course_image?.file_name || "", // URL gambar
    //         instructors: data.instructors.map((instructor: string) => ({
    //           instructor,
    //         })), // Pemetaan instruktur
    //         ...data, // Data lain dari form atau input
    //       }
    //     },
    //     credentials: "include", // Untuk mengirimkan cookies jika diperlukan
    //   }),
    // }),
    uploadImage: builder.mutation({
      query: (formData: FormData) => ({
        url: 'api/method/upload_file',
        method: 'POST',
        body: formData,
        credentials: 'include' as const
      })
    }),
    removeImage: builder.mutation({
      query: (fileId: string) => ({
        url: `api/method/remove_file`,
        method: 'POST',
        body: { file_name: fileId },
        credentials: 'include' as const
      })
    }),
    getCourse: builder.query({
      query: id => ({
        url: 'api/method/frappe.client.get',
        method: 'POST',
        body: {
          doctype: 'LMS Course',
          name: id
        },
        credentials: 'include' as const
      })
    }),
    createCourse: builder.mutation({
      query: data => ({
        url: 'api/method/frappe.client.insert',
        method: 'POST',
        body: {
          doc: {
            doctype: 'LMS Course',
            ...data
          }
        },
        credentials: 'include'
      })
    }),
    editCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `api/method/frappe.client.set_value`,
        method: 'POST',
        body: {
          doctype: 'LMS Course',
          name: courseId,
          fieldname: {
            ...data
          }
        },
        credentials: 'include'
      })
    }),
    upsertChapter: builder.mutation({
      query: ({ chapter, course, name }: any) => ({
        url: 'api/method/lms.lms.api.upsert_chapter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          title: chapter.title,
          course,
          is_scorm_package: chapter.is_scorm_package || false,
          scorm_package: chapter.scorm_package || null,
          name
        },
        credentials: 'include'
      })
    }),
    insertChapterReference: builder.mutation({
      query: ({ chapterName, course }: any) => ({
        url: 'api/method/frappe.client.insert',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          doc: {
            doctype: 'Chapter Reference',
            chapter: chapterName,
            parent: course,
            parenttype: 'LMS Course',
            parentfield: 'chapters'
          }
        },
        credentials: 'include'
      })
    }),
    getCourseOutline: builder.query<any, { courseName: any; getProgress: boolean }>({
      query: ({ courseName, getProgress }) => ({
        url: 'api/method/lms.lms.utils.get_course_outline',
        method: 'POST',
        body: {
          course: courseName,
          progress: getProgress
        },
        credentials: 'include'
      })
    }),
    deleteChapter: builder.mutation({
      query: chapter => ({
        url: 'api/method/lms.lms.api.delete_chapter',
        method: 'POST',
        body: {
          chapter: chapter
        },
        credentials: 'include'
      })
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: 'get-admin-courses',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    deleteCourse: builder.mutation({
      query: id => ({
        url: 'delete-course',
        method: 'DELETE',
        body: { id },
        credentials: 'include' as const
      })
    }),
    // editCourse: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `edit-course/${id}`,
    //     method: "PUT",
    //     body: data,
    //     credentials: "include" as const,
    //   }),
    // }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: 'get-courses',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    getCourseDetails: builder.query({
      query: id => ({
        url: `get-course/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    getCourseContent: builder.query({
      query: id => ({
        url: `get-course-content/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: 'add-question',
        body: {
          question,
          courseId,
          contentId
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    addAnwerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: 'add-answer',
        body: {
          answer,
          courseId,
          contentId,
          questionId
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, reviewId, courseId }) => ({
        url: `add-reply`,
        body: {
          comment,
          reviewId,
          courseId
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    })
  })
})

export const {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnwerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,

  useGetAllCategoryQuery,
  useGetAllUserQuery,
  useGetAllCurrencyQuery,
  useCreateCourseMutation,
  useUploadImageMutation,
  useRemoveImageMutation,
  useGetCourseQuery,
  useEditCourseMutation,
  useUpsertChapterMutation,
  useInsertChapterReferenceMutation,
  useGetCourseOutlineQuery,
  useDeleteChapterMutation
} = courseApi
