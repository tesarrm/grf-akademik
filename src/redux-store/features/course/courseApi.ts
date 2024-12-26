import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "api/resource/LMS Category",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "api/resource/User",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllCurrency: builder.query({
      query: () => ({
        url: "api/resource/Currency",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // createCourse: builder.mutation({
    //   query: (data) => ({
    //     url: "create-course",
    //     method: "POST",
    //     body: data,
    //     credentials: "include" as const,
    //   }),
    // }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "api/method/frappe.client.insert",
        method: "POST",
        body: {
          doc: {
            doctype: "LMS Course", // Sama seperti di Vue
            image: data.course_image?.file_name || "", // URL gambar
            instructors: data.instructors.map((instructor: string) => ({
              instructor,
            })), // Pemetaan instruktur
            ...data, // Data lain dari form atau input
          }
        },
        credentials: "include", // Untuk mengirimkan cookies jika diperlukan
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData: FormData) => ({
        url: "api/method/upload_file",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),
    removeImage: builder.mutation({
      query: (fileId: string) => ({
        url: `api/method/remove_file`, 
        method: "POST",
        body: { file_name: fileId },
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: "delete-course",
        method: "DELETE",
        body: { id },
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        body: {
          question,
          courseId,
          contentId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addAnwerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, reviewId, courseId }) => ({
        url: `add-reply`,
        body: {
          comment,
          reviewId,
          courseId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
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
} = courseApi;
