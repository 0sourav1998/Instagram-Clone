import React from 'react'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import { useFetchAllPosts } from '@/hooks/usefetchAllPosts'
import { useGetSuggestedUsers } from '@/hooks/useGetSuggestedUsers'

const Home = () => {
  useFetchAllPosts();
  useGetSuggestedUsers();
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed/>
        <Outlet/>
      </div>
      <RightSidebar/>
    </div>
  )
}

export default Home
