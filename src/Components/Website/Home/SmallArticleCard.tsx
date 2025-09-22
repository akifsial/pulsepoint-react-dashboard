import { Link, useNavigate } from "react-router-dom";
import dummyPost from "@assets/media/images/dashboard-images/postImage.png";

interface SmallArticleCardProps {
  image: string;
  title: string;
  readTime: string;
  link: string;
}

const SmallArticleCard: React.FC<SmallArticleCardProps> = ({
  image,
  title,
  id,
  // content,
  readTime,
  link,
  created_at,
  content,
  featured_image,
}) => {
  const navigate = useNavigate();
  return (
    // <article className="flex w-full border-b-black  max-w-[468px] items-center justify-between gap-5 lg:px-12 px-0 py-4">
    <article
      onClick={() => navigate(`/blog/${id}`)}
      className="flex cursor-pointer w-full  max-w-[468px] items-start justify-between gap-5 lg:px-0 px-0 py-4"
    >
      {/* text side */}
      <div className="flex-1 border-b border-[#c4c4c4] pb-[30px]">
        <p className="text-[13px] font-medium uppercase tracking-wide text-gray-500">
          {/* { new Date(created_at).toLocaleDateString()} */}2 MIN READ
        </p>

        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold text-gray-900">
          {/* {title} */}
          {title?.rendered?.length > 12
            ? title?.rendered?.slice(0, 50) + "..."
            : title}
        </h3>

        {title?.rendered?.length > 12 && (
          <Link
            to={link}
            className="mt-2 inline-block text-[16px] font-semibold text-[#2DB3FF] "
          >
            Read&nbsp;More
          </Link>
        )}

        {/* <Link
        to={link}
        className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
      >
        Read&nbsp;More
      </Link> */}
      </div>
      {/* thumbnail */}
      <img
        src={featured_image?.url}
        // alt={title}
        className="h-[74px] w-[118px] flex-shrink-0 rounded object-cover"
      />
    </article>
  );
};

export default SmallArticleCard;
