import React from 'react'

const CommunityTopics = ({title, text1 ,text2 ,text3,text4 ,text5}) => {
  return (
    <>
    <div className='text-base'>
        <h6 className='font-medium  mb-2'>{title}</h6>
        <div className="flex  font-normal text-[#1A1A1A] gap-[11px] mb-5 flex-wrap">
            <div className='py-1.5  px-4 text-white bg-[#28A2FF] rounded-[20px]'><p>{text1}</p></div>
            <div className='py-1.5 px-4  bg-[#F4F4F4] rounded-[20px] hover:bg-[#DDF0FF]'><p>{text2}</p></div>
            <div className='py-1.5 px-4  bg-[#F4F4F4] rounded-[20px] hover:bg-[#DDF0FF]'><p>{text3}</p></div>
            {text4 && (
          <div className="py-1.5 px-4  bg-[#F4F4F4] rounded-[20px] hover:bg-[#DDF0FF]">
            <p>{text4}</p>
          </div>
        )}
        {text5 && (
          <div className="py-1.5 px-4  bg-[#F4F4F4] rounded-[20px] hover:bg-[#DDF0FF]">
            <p>{text5}</p>
          </div>
        )}
        </div>
    </div>
    </>
  )
}

export default CommunityTopics