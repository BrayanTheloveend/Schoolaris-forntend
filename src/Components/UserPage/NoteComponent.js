import React, { useEffect } from 'react'
import NoteStudentItems from './NoteStudentItems'
import { useGetStudentBySubjectQuery } from '../Redux/ApiSlice'
import Nodata from './Nodata'
import CustomLoading from '../Dashboard/CustomLoading'

const NoteComponent = ({id}) => {

    const {data, isLoading, isSuccess, isError, error}=  useGetStudentBySubjectQuery(id.idSubject)

    //GET STUDENT 
  
    useEffect(() => {
        if(isError){
        if(error.status=== 401){
            //navigate('/login')
            
        }
        }else if(isSuccess){
        // showMessage('success', `${data.length} items found`, 'Task')
        }
    }, [isSuccess, isError, error, isLoading, data])


  return (
    <>

        { 
        
        !isLoading ? 

        isSuccess && data.length !== 0 ? data.map(elt=><NoteStudentItems key={elt.id}  data={{...elt, idUnits: id.idUnit}} />)

        : <Nodata/>

        : <CustomLoading/>
    
    }
    </>
    
  )
}

export default NoteComponent
