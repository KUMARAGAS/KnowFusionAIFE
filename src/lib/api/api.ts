/// <reference types="vite/client" />
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:8000/api';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    try {
      const clerk = (window as any).Clerk;
      if (clerk?.session) {
        const token = await clerk.session.getToken();
        if (token) headers.set('Authorization', `Bearer ${token}`);
      }
    } catch {}
    return headers;
  },
});

export const pdfApi = createApi({
  reducerPath: 'pdfApi',
  baseQuery,
  tagTypes: ['PDF', 'Session', 'Quiz'],
  endpoints: (builder: any) => ({
    getAllPDFs: builder.query({
      query: () => '/pdf',
      transformResponse: (response: any) => response.data,
      providesTags: ['PDF'],
    }),
    uploadPdf: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append('pdf', file);
        return { url: '/pdf/upload', method: 'POST', body: formData };
      },
      invalidatesTags: ['PDF'],
    }),
    deletePDF: builder.mutation({
      query: (id: string) => ({ url: `/pdf/${id}`, method: 'DELETE' }),
      invalidatesTags: ['PDF'],
    }),
    downloadSummary: builder.query({
      query: (id: string) => ({
        url: `/pdf/${id}/download`,
        responseHandler: 'text' as const,
      }),
    }),
    askQuestion: builder.mutation({
      query: (body: any) => ({
        url: '/chat/ask',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result: any) =>
        _result?.sessionId
          ? [{ type: 'Session' as const, id: _result.sessionId }]
          : ['Session'],
    }),
    getSessionsByFileId: builder.query({
      query: (fileId: string) => `/chat/sessions/${fileId}`,
      transformResponse: (response: any) => response.data,
      providesTags: (result: any) =>
        result
          ? [...result.map((s: any) => ({ type: 'Session' as const, id: s._id })), { type: 'Session' as const, id: 'LIST' }]
          : [{ type: 'Session' as const, id: 'LIST' }],
    }),
    getSessionById: builder.query({
      query: (sessionId: string) => `/chat/session/${sessionId}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result: any, _error: any, id: string) => [{ type: 'Session' as const, id }],
    }),
    generateQuiz: builder.mutation({
      query: (body: any) => ({
        url: '/quiz/generate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Quiz'],
    }),
    submitQuizAnswers: builder.mutation({
      query: (body: any) => ({
        url: '/quiz/submit',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result: any, _error: any, { quizId }: any) =>
        [{ type: 'Quiz' as const, id: quizId }],
    }),
    getQuizSessionsByFileId: builder.query({
      query: (fileId: string) => `/quiz/sessions/${fileId}`,
      transformResponse: (response: any) => response.data,
      providesTags: (result: any) =>
        result
          ? [...result.map((s: any) => ({ type: 'Quiz' as const, id: s._id })), { type: 'Quiz' as const, id: 'LIST' }]
          : [{ type: 'Quiz' as const, id: 'LIST' }],
    }),
    getQuizSessionById: builder.query({
      query: (quizId: string) => `/quiz/session/${quizId}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result: any, _error: any, id: string) => [{ type: 'Quiz' as const, id }],
    }),
    deleteQuizSession: builder.mutation({
      query: (quizId: string) => ({
        url: `/quiz/session/${quizId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
    deleteChatSession: builder.mutation({
      query: (sessionId: string) => ({
        url: `/chat/session/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Session'],
    }),
  }),
});

export const {
  useGetAllPDFsQuery,
  useUploadPdfMutation,
  useDeletePDFMutation,
  useLazyDownloadSummaryQuery,
  useAskQuestionMutation,
  useGetSessionsByFileIdQuery,
  useLazyGetSessionByIdQuery,
  useGenerateQuizMutation,
  useSubmitQuizAnswersMutation,
  useGetQuizSessionsByFileIdQuery,
  useLazyGetQuizSessionByIdQuery,
  useDeleteQuizSessionMutation,
  useDeleteChatSessionMutation,
} = pdfApi;
