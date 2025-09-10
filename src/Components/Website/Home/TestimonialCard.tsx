import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import dummyImage from "@assets/media/images/dummyUser.png";
interface TestimonialCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  content: string;
}

const TestimonialCard = ({
  name,
  title,
  image,
  rating,
  content,
  feedback,
  patient,
}: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-[#F5F5F5] flex flex-col justify-between h-[300px] rounded-lg p-6 shadow-sm">
      <div className="">
        <div className="flex items-center mb-4">
          {renderStars(feedback?.rating)}
          <span className="ml-2 text-sm font-medium text-gray-900">
            ({feedback?.rating})
          </span>
        </div>

        <blockquote className="text-[#252525] font-normal text-[18px] mb-[50px]  leading-relaxed">
          "{feedback?.content}"
        </blockquote>
      </div>
      <div className="flex items-center border-t-1 pt-[25px] border-[#2525251A]">
        <img
          src={
            image
              ? `${import.meta.env.VITE_APP_API_IMG_URL}${image}`
              : dummyImage
          }
          alt={name}
          className="w-[50px] h-[50px] rounded-[0px] object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-[#252525] text-[20px]">
            {feedback?.patient?.first_name} {feedback?.patient?.last_name}
          </h4>
          <p className="text-[16px] font-normal text-[#252525]">
            Dash Private Villa Project Investor
          </p>
        </div>
      </div>
    </div>
  );
};

interface TestimonialCarouselProps {
  testimonials: TestimonialCardProps[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {testimonials?.records?.map((testimonial) => (
          <div key={testimonial.id} className="flex-none w-96">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-6 space-x-2">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div> */}
    </div>
  );
};

export { TestimonialCard, TestimonialCarousel };
