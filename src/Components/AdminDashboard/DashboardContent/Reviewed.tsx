import React from 'react'
import TopReview from './ActionCenter.tsx/TopReview'
import Action from './ActionCenter.tsx/Action'

const Reviewed = () => {
  return (
    <div className='flex items-center gap-2.5'>
      <TopReview/>
      <Action/>
    </div>
  )
}

export default Reviewed
