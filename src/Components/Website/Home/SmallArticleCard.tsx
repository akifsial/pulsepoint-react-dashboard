import { Link } from "react-router-dom";

interface SmallArticleCardProps {
  image: string;
  title: string;
  readTime: string;
  link: string;
}

const SmallArticleCard: React.FC<SmallArticleCardProps> = ({
  image,
  title,
  content,
  readTime,
  link,
  created_at,
}) => (
  <article className="flex w-full max-w-[468px] items-center justify-between gap-5 lg:px-12 px-0 py-4">
    {/* text side */}
    <div className="flex-1">
      <p className="text-[13px] font-medium uppercase tracking-wide text-gray-500">
        {/* { new Date(created_at).toLocaleDateString()} */}2 MIN READ
        {/* {readTime} */}
      </p>

      <h3 className="mt-1 line-clamp-2 text-[16px] font-bold text-gray-900">
        {/* {title} */}
        {title.length>12 ? title?.slice(15)+"..." : title}
      </h3>


      {title.length > 12 && (
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
      src={`${import.meta.env.VITE_APP_API_IMG_URL}${image}`}
      alt={title}
      className="h-[74px] w-[118px] flex-shrink-0 rounded object-cover"
    />
  </article>
);

export default SmallArticleCard;
