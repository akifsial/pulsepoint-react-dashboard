import React from 'react'
import CommunityFeed from './CommunityFeed'
import PopularCommunity from './PopularCommunity'

const Community = () => {
  return (
    <>
    <div className="flex items-start gap-3">
      <CommunityFeed />
    <PopularCommunity/>
    </div>
    </>
  )
}

export default Community