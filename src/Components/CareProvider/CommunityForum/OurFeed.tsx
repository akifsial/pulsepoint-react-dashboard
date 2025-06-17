import React from 'react'
import CommunityFeed from './CommunityFeed'
import PopularCommunity from './PopularCommunity'

const OurFeed = () => {
  return (
   <>
    <div className="block sm:flex sm:items-start sm:gap-6">
            <CommunityFeed />
          <PopularCommunity />
        </div>
   </>
  )
}

export default OurFeed