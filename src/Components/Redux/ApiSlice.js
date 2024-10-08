import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const ApiSlice = createApi({
    reducerPath: 'Api',
    tagTypes: ['Student', 'Subject', 'Unit', 'Teacher', 'Note', 'Assign', 'Payment', 'Admin', 'Role', 'Lesson', 'Like'],
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_PORT}/api`,
}),

    endpoints: (builder) =>({

        //CRUD Students 

        getStudent: builder.query({
            query: token => ({
                url:'/Student/GetStudent',
                headers: {
                    'Authorization': token
                }
            }),
            providesTags: ['Student']
        }),

        getStudentById: builder.query({
            query: id => `Student/GetStudentById/${id}`,
            providesTags: ['Student']
        }),
        getStudentBySubject: builder.query({
            query: id => `/Student/GetStudentBySubject/${id}`,
            providesTags: ['Student']
        }),

        addStudent: builder.mutation({
            query: payload => ({ 
                url: '/Student/AddStudent',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Student']
            
        }),

        deleteStudent: builder.mutation({
            query: id => ({ 
                url: `/Student/DeleteStudent/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Student']
        }),

        activeStudent: builder.mutation({
            query: id => ({ 
                url: `/Student/ActiveStudent/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Student']
        }),

        printStudentProfile: builder.mutation({
            query: payload => ({ 
                url: `/Student/PrintStudentProfile`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Student']
        }),

        getStudentInfo: builder.query({
            query: ()=> `Student/GetStudentInfo`,
        }),

        
    
        //CRUD Subjects

        getSubject: builder.query({
            query: token => ({
              url:  '/Subject/GetSubject',
            }),
            
            providesTags: ['Subject']
        }),

        getSubjectById: builder.query({
            query: id=> `/Subject/GetSubjectById/${id}`
        }),

        deleteSubject: builder.mutation({
            query: id => ({ 
                url: `/Subject/DeleteSubject/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Subject']
        }),

        addSubject: builder.mutation({
            query: payload => ({ 
                url: `/Subject/AddSubject/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Subject']
        }), 

        UpdateSubject: builder.mutation({
            query: payload => ({ 
                url: `/Subject/UdpateSubject/`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Subject']
        }), 

        //CRUD Unit Learnings


        getUnit: builder.query({
            query: ()=> '/Unit/GetUnit',
            providesTags: ['Unit']
        }),

        getUnitBySubject: builder.query({
            query: id => `/Unit/GetUnitBySubject/${id}`,
        }),

        getUnitById: builder.query({
            query: id => `/Unit/GetUnitById/${id}`,
        }),

        addUnit: builder.mutation({
            query: payload => ({ 
                url: `/Unit/AddUnit/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Unit']
        }), 

        UpdateUnit: builder.mutation({
            query: payload => ({ 
                url: `/Unit/UpdateUnit/`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Unit']
        }),
        
        deleteUnit: builder.mutation({
            query: id => ({ 
                url: `/Unit/DeleteUnit/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Unit']
        }),


        //CRUD TEACHER

        getTeacher: builder.query({
            query: ()=> '/Teacher/GetTeacher',
            providesTags: ['Teacher']
        }),

        getTeacherById: builder.query({
            query: id => ({ 
                url: `/Teacher/GetTeacherById/${id}`,
                method: 'GET',
            }),
        }),

        addTeacher: builder.mutation({
            query: payload => ({ 
                url: `/Teacher/AddTeacher/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Teacher']
        }), 

        deleteTeacher: builder.mutation({
            query: id => ({ 
                url: `/Teacher/DeleteTeacher/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Teacher']
        }),

        activeTeacher: builder.mutation({
            query: id => ({ 
                url: `/Teacher/ActiveTeacher/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Teacher']
        }),

    


        //CRUD ASSIGN

        getTeacherAssign: builder.query({
            query: id => ({ 
                url: `/AssocUnit/GetTeacherAssign/${id}`,
                method: 'GET',
            }),
            providesTags: ['Assign']
        }),

        getTeacherByUnitId: builder.query({
            query: id=> `/AssocUnit/GetTeacherByIdUnit/${id}`,
            invalidatesTags: ['Assign']
        }),

        AddTeacherAssign: builder.mutation({
            query: payload => ({ 
                url: `/AssocUnit/AddTeacherAssign/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Assign']
        }),

        UpdateTeacherAssign: builder.mutation({
            query: payload => ({ 
                url: `/AssocUnit/UpdateTeacherAssign/`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Assign']
        }),


        DeleteTeacherAssign: builder.mutation({
            query: payload => ({ 
                url: `/AssocUnit/DeleteTeacherAssign/${payload.idTeacher}/${payload.idUnit}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Assign']
        }),






        //CRUD NOTE

        getNoteByUnitAndStudent : builder.query({
            query: payload => ({ 
                url: `/Note/GetNoteByUnitAndStudent/${payload.id}/${payload.index}`,
            }),
            providesTags: ['Note']
        }),

        addNote: builder.mutation({
            query: payload => ({ 
                url: `/Note/AddNote/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Note']

        }),

        updateNote: builder.mutation({
            query: payload => ({ 
                url: `/Note/UpdateNote/`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Note']

        }),

        deleteNote: builder.mutation({
            query: id => ({ 
                url: `/Note/DeleteNote/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Note']
        }),


        //CRUD payment

        getPayment: builder.query({
            query: token =>({ 
                url: '/Payment/GetPayment',
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }),
            providesTags: ['Payment']
        }),

        AddPayment: builder.mutation({
            query: payload => ({ 
                url: `/Payment/AddPayment/`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Payment']
        }),


        getPaymentByStudentId: builder.query({
            query: payload=> ({
                
                url: `/Payment/GetPaymentByStudentId/${payload.id}`,
                method: 'GET',
                headers: {
                    'Authorization': payload.token
                }
            }),
            
            providesTags: ['Payment']
        }),


        //Auth Api

        Login: builder.mutation({
            query: payload => ({ 
                url: `/Auth/Login/`,
                method: 'POST',
                body: payload,
                headers: {
                    'Access-Control-Allow-Origin': true
                }
            }),
        }),

        verify: builder.mutation({
            query: payload => ({ 
                url: `/Auth/Verify`,
                method: 'POST',
                body: payload,
            }),
        }),

        sendCode: builder.mutation({
            query: payload => ({ 
                url: `/Auth/ResendCode`,
                method: 'POST',
                body: payload,
            }),
        }),

        //ADMIN API

        AddAdmin: builder.mutation({
            query: payload => ({ 
                url: `/User/AddUser/`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Admin']

        }),

        GetUserRoleById: builder.query({
            query: id=> `/Role/GetRoleById/${id}`,
        }),

        GetUserAndRole: builder.query({
            query: ()=> `/Role/GetRoleAndUser/`,
            providesTags: ['Admin']
        }),

        GetRole: builder.query({
            query: token => ({
              url:  '/Role/GetRole',
              headers: {
                'Authorization': token
              }
            }),
            providesTags: ['Role']
        }),

        AddRole: builder.mutation({
            query: payload => ({ 
                url: `/Role/AddRole/`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Role']
        }),

        UpdateRole: builder.mutation({
            query: payload => ({ 
                url: `/Role/UpdateRole/`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Role']

        }),

        DeleteRole: builder.mutation({
            query: id => ({ 
                url: `/Role/DeleteRole/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Role']
        }),



        //MOMO API generate Token

        GenerateToken: builder.mutation({
            query: ()=> ({ 
                url: process.env.REACT_APP_TOKEN_URL,
                method: 'POST',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                    'Cache-Control': 'no-cache',
                    "Authorization": `Basic ${btoa(process.env.REACT_APP_X_REFERENCE_ID+ ':' + process.env.REACT_APP_PASSWORD)}`,
                    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_SUBSCRIBE_KEY
                }
            }),
        }),

        RequestToPay: builder.mutation({
            query: payload => ({ 
                url: process.env.REACT_APP_REQUEST_TO_PAY_URL,
                method: 'POST',
                body : payload.body,
                headers: {
                    "X-Target-Environment": 'sandbox',
                    "Authorization": `Bearer ${payload.token}`,
                    "X-Reference-Id": process.env.REACT_APP_X_REFERENCE_ID,
                    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_SUBSCRIBE_KEY
                }
            }),
        }),


        //Lesson 

        GetLessonByUnitId: builder.query({
            query: id=> `/Lesson/GetLessonByUnitId/${id}`,
            providesTags: ['Lesson']
        }),

        GetLesson: builder.query({
            query: ()=> `/Lesson/GetLesson`,
            providesTags: ['Lesson']
        }),

        AddLesson: builder.mutation({
            query: payload => ({ 
                url: `/Lesson/AddLesson`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Lesson']
        }),

        DeleteLesson: builder.mutation({
            query: id => ({ 
                url: `/Lesson/DeleteLesson/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Lesson']
        }),


    //LIKES


    GetLikeByLessonId: builder.query({
        query: id=> `/Lesson/GetLike/${id}`,
        providesTags: ['Like']
    }),

    DeleteLessonGroup: builder.mutation({
        query: payload => ({ 
            url: `/Lesson/DeleteLessonGroup`,
            method: 'DELETE',
            body: payload
        }),
        invalidatesTags: ['Lesson']
    }),









        
        


    })


})


export const { 
    useGetStudentQuery,
    useGetStudentBySubjectQuery,
    useGetSubjectQuery,
    useAddStudentMutation,
    useGetSubjectByIdQuery,
    useDeleteStudentMutation,
    useDeleteSubjectMutation,
    useAddSubjectMutation,
    useUpdateSubjectMutation,
    useGetUnitQuery,
    useGetUnitByIdQuery,
    useAddUnitMutation,
    useDeleteUnitMutation,
    useUpdateUnitMutation,
    useGetUnitBySubjectQuery,
    useGetNoteByUnitAndStudentQuery,
    useActiveStudentMutation,
    useAddTeacherMutation,
    useGetTeacherQuery,
    useDeleteTeacherMutation,
    useActiveTeacherMutation,
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
    useGetTeacherAssignQuery,
    useAddTeacherAssignMutation,
    useUpdateTeacherAssignMutation,
    useDeleteTeacherAssignMutation,
    useGetStudentByIdQuery,
    useAddPaymentMutation,
    useGetPaymentByStudentIdQuery,
    useGetPaymentQuery,
    useRequestToPayMutation,
    useGenerateTokenMutation,
    useAddAdminMutation,
    useLoginMutation,
    useGetUserRoleByIdQuery,
    useGetUserAndRoleQuery,
    useGetRoleQuery,
    useAddRoleMutation,
    useDeleteRoleMutation,
    useUpdateRoleMutation,
    useGetStudentInfoQuery,
    usePrintStudentProfileMutation,
    useAddLessonMutation,
    useGetLessonByUnitIdQuery,
    useGetTeacherByUnitIdQuery,
    useGetTeacherByIdQuery,
    useGetLikeByLessonIdQuery,
    useDeleteLessonMutation,
    useGetLessonQuery,
    useDeleteLessonGroupMutation,
    useVerifyMutation,
    useSendCodeMutation


} = ApiSlice