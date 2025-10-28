import TopBar from "@components/Website/Layout/topbar";
import UtilityRow from "@components/Website/Layout/utilityrow";
import { useGetSingleBlog } from "@src/hooks/usewebsite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  const { data } = useGetSingleBlog(id);
  useEffect(() => {
    const fakePost = {
      id,
      title: "The Future of Web Development with React & Tailwind",
      author: "Fizza Khan",
      date: "September 17, 2025",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      content: `
        React continues to dominate the frontend ecosystem because of its flexibility 
        and massive community support. Combining it with Tailwind CSS allows 
        developers to create modern, responsive UIs very quickly.

        In this article, we'll explore how React and Tailwind work hand-in-hand 
        to build scalable and elegant applications.
      `,
    };
    setPost(fakePost);
  }, [id]);

  if (!post) return <div className="text-center py-20">Loading post...</div>;

  const rawUrl = data?.data?.data?._video_url;

  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    const youtubeMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(rawUrl);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <UtilityRow />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="w-full overflow-hidden">
          <p className="text-xs underline font-medium uppercase text-gray-400 px-4 ps-0 pt-4">
            Facilities
          </p>

          <h2 className="px-4 ps-0 mt-2 text-sm font-semibold text-gray-900">
            Advantage Care Facility | Highland, CA | Assisted
          </h2>

          <div className="relative w-full aspect-video mt-4">
            {embedUrl ? (
              <iframe
                className="w-full h-full rounded-b-2xl"
                src={embedUrl}
                title="Advantage Care Facility | Highland, CA | Assisted"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                No video available
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 mt-7">
          <div className="w-72  rounded-md shadow-sm p-3 bg-[#F0F0F0]">
            <h3 className="text-sm font-semibold text-blue-600 underline mb-3">
              CarePatrol
            </h3>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                URL:
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/..."
                className="w-full text-gray-400 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={data?.data?.data?._video_url}
              />
            </div>

            <div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Embed:
                </label>
                <textarea
                  placeholder='<iframe src="https://www.youtube.com/..."></iframe>'
                  rows={4}
                  className="w-full border text-gray-400 border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={`<iframe 
    src=${data?.data?.data?._video_url}  
    title="YouTube video player"  
    class="ayvpp responsive"  
    width="506"  
    height="304"  
    data-ratio="16:9"  
    frameborder="0"  
    allowfullscreen 
    allowTransparency="true">
  </iframe>`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Blog;
