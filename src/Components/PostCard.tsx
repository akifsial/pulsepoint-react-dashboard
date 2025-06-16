import React from "react";

// Define the interface for post data
export interface PostData {
  userImage: string;
  userName: string;
  userPost: string;
  title: string;
  desc: string;
  postImage: string;
  userTime: string;
  userReview: string;
}

// Define the interface for button data
export interface ButtonData {
  btnText: string;
  btnIcon: string;
  downarrow?: string;
}

// Define the props interface for PostCard component
interface PostCardProps {
  post: PostData;
  buttons: ButtonData[];
  showComments?: boolean; // Optional prop to control comment display
  showFullPost?: boolean; // Optional prop to control full post display
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  buttons, 
  showComments = true, 
  showFullPost = true 
}) => {
  return (
    <div className="post mb-6">
      <div className="post_content bg-white rounded-[10px] p-4">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                alt=""
                src={post.userImage}
                className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
              />
              <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]"></span>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold mb-1 text-[#252525] leading-tight">
                {post.userName}
              </p>
              <span className="text-sm text-gray-500 leading-tight">
                {post.userPost}
              </span>
            </div>
          </div>
          <div>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  d="M13.1599 14.0063C13.7508 14.0063 14.2299 13.5273 14.2299 12.9363C14.2299 12.3453 13.7508 11.8662 13.1599 11.8662C12.5689 11.8662 12.0898 12.3453 12.0898 12.9363C12.0898 13.5273 12.5689 14.0063 13.1599 14.0063Z"
                  stroke="#252525"
                  strokeWidth="2.14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.1599 6.51605C13.7508 6.51605 14.2299 6.03698 14.2299 5.44602C14.2299 4.85505 13.7508 4.37598 13.1599 4.37598C12.5689 4.37598 12.0898 4.85505 12.0898 5.44602C12.0898 6.03698 12.5689 6.51605 13.1599 6.51605Z"
                  stroke="#252525"
                  strokeWidth="2.14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.1599 21.4966C13.7508 21.4966 14.2299 21.0175 14.2299 20.4266C14.2299 19.8356 13.7508 19.3565 13.1599 19.3565C12.5689 19.3565 12.0898 19.8356 12.0898 20.4266C12.0898 21.0175 12.5689 21.4966 13.1599 21.4966Z"
                  stroke="#252525"
                  strokeWidth="2.14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Post Content */}
        <div className="">
          <h3 className="mb-2.5">{post.title}</h3>
          <p className="text-sm text-[#252525] mb-7">
            {post.desc}{" "}
            <span className="text-[#868686]">Read more..</span>
          </p>
        </div>

        {/* Post Image */}
        <div className="mb-2.5">
          <img src={post.postImage} alt="" className="rounded-md" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mb-2.5">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
            >
              <img
                src={btn.btnIcon}
                alt="icon"
                className="object-cover"
              />
              {btn.btnText}
              {btn.downarrow && (
                <img src={btn.downarrow} alt="" className="" />
              )}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        {showFullPost && (
          <div>
            <input
              type="text"
              placeholder="Join the conversation"
              className="w-full bg-white outline-0 border-[1px] rounded-[32px] py-3 px-6 text-sm mb-2"
              style={{ borderColor: "#D3D3D3" }}
            />
          </div>
        )}

        {/* Comments Section */}
        {showComments && showFullPost && (
          <>
            <div className="flex items-start gap-3 mb-5">
              <div className="">
                <img
                  alt=""
                  src={post.userImage}
                  className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <p className="font-semibold mb-1 text-[#252525] leading-tight">
                    {post.userName}
                  </p>
                  <span className="text-[12px] mb-2 text-gray-500 leading-tight">
                    {post.userTime}
                  </span>
                  <p className="text-sm mb-2.5">{post.userReview}</p>
                  <div className="flex gap-2.5 mb-2.5">
                    {buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        className="flex text-[12px] items-center gap-1 bg-[#E6E9EB] rounded-[32px] px-1 py-1.5 min-w-[75px] justify-center"
                      >
                        <img
                          src={btn.btnIcon}
                          alt="icon"
                          className="object-cover h-[19px] w-[19px]"
                        />
                        {btn.btnText}
                        {btn.downarrow && (
                          <img
                            src={btn.downarrow}
                            alt=""
                            className="object-cover h-5 w-5"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-[#007AB2]">- View 2 replies</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#007AB2] font-medium text-sm">
                Show 5 more Comments
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;