import SuccessIcon from "@assets/media/images/reset-success-icon.png";

const DeleteReview = () => {
  return (
    <>
     <div className="flex flex-col items-center justify-center text-center py-6 px-6 text-base text-[#49475A] ">
      <img src={SuccessIcon} alt="Success" className="w-16 h-16 mb-5.5" />
      <h2 className="text-xl font-semibold text-[#2F3542] mb-1">
       Review Deleted Successfully
      </h2>
      <p className="">
      You have successfully deleted a Review.
      </p>
    </div>
    </>
  )
}

export default DeleteReview