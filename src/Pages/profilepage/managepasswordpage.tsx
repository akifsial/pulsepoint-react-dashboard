import React, { useEffect } from 'react'
import ManagePassword from '../../components/profile/managepassword'
import { useMeApi } from '@src/hooks/useusers';
import { useNavigate } from 'react-router-dom';

const ManagePasswordPage = () => {
  const navigate=useNavigate()
    const { data:MeData,refetch:MeDataFetch } = useMeApi(navigate);
  
    useEffect(()=>{
      MeDataFetch()
    })
  
  return (
    <ManagePassword />
  )
}

export default ManagePasswordPage