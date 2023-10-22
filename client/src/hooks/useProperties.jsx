import React from 'react'
import { useQuery } from 'react-query'
import { getAllProperties } from '../src/utils/api'

const useProperties = () => {

    const {data,isLoading,isError,refetch} = useQuery(
        "allProperties",
        getAllProperties,
        {refetchOnWindowFocus:false}
    )

  return {
    data,isError,isLoading,refetch
  }
}

export default useProperties
