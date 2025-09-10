import { useState } from "react";

const PostContent = ({ content }: { content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // split content into words
  const words = content?.split(" ") || [];
  const isLong = words.length > 80;

  const displayText = isExpanded
    ? content
    : words.slice(0, 30).join(" ") + (isLong ? "..." : "");

  return (
    <div className="text-sm text-[#252525] mb-7">
      <p>{displayText}</p>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#1D83CE] cursor-pointer font-medium hover:underline mt-2"
        >
          {/* {isExpanded ? "Show Less" : "Read More"} */}
        </button>
      )}
    </div>
  );
};

export default PostContent;
