import React, { useContext } from 'react'
import UserDetailContext from '../context/UserDetailContext'
import { useQueries, useQuery } from 'react-query'

const useFavourites = () => {

    const {userDetails,setUserDetails} = useContext(UserDetailContext)
    const querRef = useRef()

    const {data,isLoading,isError,refetch} =useQuery({
        queryFn:()
    })

  return {

  }
}
export default useFavourites
