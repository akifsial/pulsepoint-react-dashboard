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
            : "text-[#D5D5D5] fill-current"
        }`}
      />
    ));
  };

  return (
    <div className="bg-[#F5F5F5] flex flex-col justify-between w-[500px] h-[300px] rounded-lg p-6 shadow-sm">
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
        <div className="flex items-center">
          <h4 className="font-bold text-[#252525] text-[20px]">
            {feedback?.patient?.first_name} {feedback?.patient?.last_name}
          </h4>
         
        </div>
      </div>
    </div>
  );
};

// TestimonialCarousel.tsx
import { useRef, forwardRef } from "react";

interface TestimonialCarouselProps {
  testimonials: any;
}

const TestimonialCarousel = forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ testimonials }, ref) => {
    return (
      <div
        ref={ref}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth"
      >
        {testimonials?.records?.map((testimonial: any) => (
          <div key={testimonial.id} className=" w-full">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    );
  }
);

export { TestimonialCarousel };
