import React, { useEffect } from 'react'
import ManagePassword from '../../components/profile/manage-password'
import { useMeApi } from '@src/hooks/use-users';
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