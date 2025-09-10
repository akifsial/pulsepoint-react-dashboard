import { Link } from "react-router-dom";

interface FeaturedArticleCardProps {
  image: string;
  category: string;
  published: string;
  typeLabel: string;
  readTime: string;
  title: string;
  link: string;
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  image,
  category,
  published,
  typeLabel,
  readTime,
  title,
  link,
}) =>
   
  
  (
  <article className="w-full">
    {/* image */}
    <figure className="w-full max-w-[723px] aspect-[723/387] overflow-hidden rounded-lg">
      <img
        src={`${import.meta.env.VITE_APP_API_IMG_URL}${image}`}
        alt={title}
        className="h-full w-full object-cover"
      />
    </figure>

    {/* meta row */}
    <div className="mt-4 flex flex-wrap  justify-between items-center text-[16px] font-medium text-gray-700">
      <div>
        <span className="font-semibold text-black">{category}</span>
        <span className="mx-1">•</span>
        <span>Published:&nbsp;{published}</span>
        {/* <span className="mx-1">•</span> */}
      </div>

      <div>
        <span className="text-[#2DB3FF]">{typeLabel}</span>
        <span className="mx-1">•</span>
        <span>{readTime}</span>
      </div>
    </div>

    {/* title */}
    <h1 className="mt-2 md:text-[30px] text-[20px] font-bold text-gray-900">
      {title?.length > 15 ? title?.slice(15) + "..." : title}
    </h1>

    {title?.length > 15 && (
      <Link
        to={link}
        className="mt-2 inline-block text-[16px] font-semibold text-[#2DB3FF] "
      >
        Read&nbsp;More
      </Link>
    )}

    {/* read-more */}
    {/* <Link
      to={link}
      className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
    >
      Read&nbsp;More
    </Link> */}
  </article>
);

export default FeaturedArticleCard;
