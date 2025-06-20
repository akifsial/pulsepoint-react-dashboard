import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  content: string;
}

const TestimonialCard = ({ name, title, image, rating, content }: TestimonialCardProps) => {
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        {renderStars(rating)}
        <span className="ml-2 text-sm font-medium text-gray-900">({rating})</span>
      </div>
      
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{content}"
      </blockquote>
      
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
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
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-none w-96">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export { TestimonialCard, TestimonialCarousel };