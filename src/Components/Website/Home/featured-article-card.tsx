import { Link, useNavigate } from "react-router-dom";
import dummyPost from "@assets/media/images/dashboard-images/postImage.png";

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
  id,
  date,
}) => {
  const navigate = useNavigate();
  return (
    <article onClick={() => navigate(`/blog/${id}`)} className="w-full cursor-pointer">
      <figure className="w-full  aspect-[723/387] overflow-hidden rounded-lg">
        <img
          src={image?.url}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="mt-4 flex flex-wrap  justify-between items-center text-[16px] font-medium text-gray-700">
        <div>
          <span className="font-semibold text-black">{category}</span>
          <span className="mx-1">•</span>
          <span>Published:&nbsp;{published}</span>
        </div>

        <div>
          <span className="text-[#2DB3FF]">{typeLabel}</span>
          <span className="mx-1">•</span>
          <span>{readTime}</span>
        </div>
      </div>

      <h1 className="mt-2 md:text-[30px] text-[20px] font-bold text-gray-900">
        {title?.length > 15 ? title?.slice(0, 100) + "..." : title}
      </h1>

      {title?.length > 15 && (
        <Link
          to={link}
          className="mt-2 inline-block text-[16px] font-semibold text-[#2DB3FF] "
        >
          Read&nbsp;More
        </Link>
      )}

    </article>
  );
};

export default FeaturedArticleCard;
