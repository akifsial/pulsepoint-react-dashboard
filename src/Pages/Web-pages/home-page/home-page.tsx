// import React from "react";
// import WebMainLayout from "@layouts/WebMainLayout";

// const HomePage: React.FC = () => {
//   return (
//     <WebMainLayout>
//       <div className="default_container">Home Page</div>
//     </WebMainLayout>
//   );
// };

// export default HomePage;

// import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@components/website/shared/button";
import CategoryCard from "@components/website/home/category-card";
import ServiceCard from "@components/website/home/service-card";
import ProfessionalCard from "@components/website/home/professional-card";
import { TestimonialCarousel } from "@components/website/home/testimonial-card";
import ResourceCard from "@components/website/home/resource-card";
import ProcessStep from "@components/website/home/process-step";
import TopBar from "@components/website/layout/top-bar";
import Header from "@components/website/layout/header";
import UtilityRow from "@components/website/layout/utility-row";
import FeaturedArticleCard from "@components/website/home/featured-article-card";
import Independent from "@assets/media/website/independent.svg";
import Memory from "@assets/media/website/memory.svg";
import NursingFacility from "@assets/media/website/nursing-facility.svg";
import Assistant from "@assets/media/website/assistant.svg";
import Susan from "@assets/media/website/susan-dr.svg";
import Nancy from "@assets/media/website/nancy-dr.svg";
import Golden from "@assets/media/website/golden-dr.svg";
import MemoryDr from "@assets/media/website/memory-dr.svg";
import Travel from "@assets/media/website/travel.svg";
import Nature from "@assets/media/website/nature.svg";
import Danger from "@assets/media/website/danger.svg";
import FamilyImg from "@assets/media/website/family.png";
import Location from "@assets/media/website/location.svg";
import Bluprint from "@assets/media/website/blueprint.svg";
import Rating from "@assets/media/website/rating.svg";
import Agreement from "@assets/media/website/agreement.svg";
import Carousal from "@assets/media/website/icons/carousal-icon.svg";
import SmallArticleCard from "@components/website/home/small-article-card";
import Footer from "@components/website/layout/footer";
import ArrowButtonGroup from "@components/website/shared/arrow-button-group";
import Convience from "@components/website/home/convience";
import starIcon from "@assets/media/svgs/web-svgs/star.svg"
import userIcon from "@assets/media/svgs/dashboard-svgs/user.svg"
import searchIcon from "@assets/media/svgs/web-svgs/searchWeb.svg"
import heartIcon from "@assets/media/svgs/web-svgs/heartWeb.svg"
import tickIcon from "@assets/media/svgs/web-svgs/tickWeb.svg"
import readReviews from "@assets/media/svgs/web-svgs/readReviews.svg"

import {
  useCategory,
  useFeaturedWeakReviews,
  useGetBlogs,
  useGetCategories,
  useGetFeaturedPosts,
  useGetPopularPost,
  useRecentBlogs,
} from "@src/hooks/use-website";

// import arrowrigh
import Spinner from "@components/loaders/spinner";
// import Button from "../components/Shared/Button";

import { useRef, useState } from "react";
import LoginOrSignupModal from "@components/model/login-or-signup-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "@components/input-field";
import ReplyLoader from "@components/loaders/reply-loader";

const newsData = [
  {
    id: 1,
    title: "Tech Innovations 2025",
    description:
      "Explore the latest breakthroughs in AI, robotics, and clean energy reshaping industries worldwide.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Global Market Trends",
    description:
      "Economic experts predict steady growth in emerging markets with digital transformation at the core.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Health and Wellness",
    description:
      "Discover how modern lifestyles are evolving with a renewed focus on mental health and sustainability.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  },
];


const HomePage = () => {
  // Sample data arrays following your pattern of using arrays for similar components

  const { data: popularPost } = useGetPopularPost();

  // const { data: categories, isLoading, isError } = useGetCategories();
  const { data: featuredReviews } = useFeaturedWeakReviews();
  const [loginModal, setLoginModal] = useState(false);
  const { data: FeaturedPosts } = useGetFeaturedPosts();
  const [prod, setProd] = useState(false)
  const [loading, setLoading] = useState(false)


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };


  const processSteps = [
    {
      icon: (
        <img src={Location} alt="location icon" className="w-[60px] h-[60px]" />
      ),
      title: "Sign Up & Set Your Location",
      description: "Create a free account in just a few clicks.",
    },
    {
      icon: (
        <img
          src={Bluprint}
          alt="blueprint icon"
          className="w-[60px] h-[60px]"
        />
      ),
      title: "Find Care You Are Happy With",
      description: "Explore care near you with our AI App Help.",
    },
    {
      icon: (
        <img src={Rating} alt="rating icon" className="w-[60px] h-[60px]" />
      ),
      title: "Network & Community",
      description: "Meet wonderful pros like Ronal for support.",
    },
    {
      icon: (
        <img
          src={Agreement}
          alt="agreement icon"
          className="w-[60px] h-[60px]"
        />
      ),
      title: "Make Confident Decisions",
      description: "Trust verified pros like Rona for honest help.",
    },
  ];

  const handleLogin = () => {
    queryClient.clear();

    // disconnectSocket();

    localStorage.clear();
    navigate("/login");
  };

  const handleSignup = () => {
    queryClient.clear();

    // disconnectSocket();

    localStorage.clear();
    navigate("/signup");
  };

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setProd(true)
    }, [2000])
    console.log("kkkkkkkkkkk")
  }

  return (
    <div className="min-h-screen">
      <TopBar />
      <UtilityRow />
      <LoginOrSignupModal
        onSignup={() => handleSignup()}
        onLogin={() => handleLogin()}
        isOpen={loginModal}
        onClose={() => setLoginModal(false)}
      />
      {/* <Header /> */}

      {/* FEATURED + SIDEBAR WRAPPER */}
      {/* <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeaturedArticleCard
              image={getBlogs?.data?.data?.[0]?.featured_image}
              category="Facilities"
              published={new Date(
                getBlogs?.data?.data?.[0]?.date
              ).toLocaleString()}
              typeLabel="Article"
              readTime="4 min read"
              title={getBlogs?.data?.data?.[0]?.title}
              link={getBlogs?.data?.data?.[0]?.link}
              id={getBlogs?.data?.data?.[0]?.id}
            />

            <div className="space-y-6 flex flex-col items-end ">
              {getBlogs?.data?.data?.slice(1, 4).map((blog, i) => (
                <SmallArticleCard key={i} {...blog} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="min-h-[100vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 text-center px-4">
        {/* Headings */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mt-10">
          <span className="text-blue-600">Find, Compare, and Review</span>
          <br />
          <span className="text-gray-900">Senior Care Providers</span>
          <br />
          <span className="text-blue-600">in Your Area</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-gray-600 mb-8 mt-4">
          Free ZIP-code-based searches • Real user reviews • AI-powered support
          (Premium)
        </p>

        {/* Input and Button */}
        <div className="flex items-center justify-center flex-col sm:flex-row items-center gap-3 mb-10 w-full max-w-[700px]">
          {/* <input
            type="text"
            placeholder="Enter your ZIP code"
            className="w-full sm:flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          /> */}
          <div>

            <InputField type="text" placeholder="Enter your ZIP code" className="!w-[500px] !mb-0 h-[60px] sm:flex-1 px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
          </div>
          <div className="flex items-center h-full ">
            <button onClick={handleClick} className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-1.5 rounded-xl transition-all shadow-md">
              Get Started
            </button>
          </div>
        </div>

        {/* Buttons and Ratings */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-gray-700">
          <button onClick={()=>(navigate("/explore/reviews"))} className="cursor-pointer border border-blue-500 text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all">
            Explore Reviews
          </button>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <img src={starIcon} alt="" /> <span className="font-bold">4.8/5 Rating</span>
            <span className="mx-2">•</span>
            <img src={userIcon} alt="" /> <span className="font-bold">50K+ Families Helped</span>
          </div>
        </div>

        {
          loading ? <div className="mt-20"><ReplyLoader /></div> :

            <div className="py-12 px-4 md:px-10 lg:px-20 mt-10">
              <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Our Care Providers
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {newsData.map((news) => (
                  <>
                    <div
                      key={news.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    >
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-52 object-cover"
                      />
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{news.description}</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                          Read More
                        </button>
                      </div>
                    </div>


                  </>

                ))}
              </div>
              <button className="mt-10 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 cursor-pointer transition">
                Show More
              </button>
            </div>

        }
      </section>

      {/* <section className="bg-gray-50 py-[40px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="md:text-[36px] text-[20px] font-bold md:mb-[50px] mb-[25px] ">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.data?.data?.map((category: any, index) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                categoryName={category?.slug}

                title={category.name}
                // image={
                //   category.image
                //     ? `${import.meta.env.VITE_APP_API_IMG_URL}${category.image}`
                //     : WorkImg
                // }
                // link={`/category/${category.url_key}`}
                // image={`https://picsum.photos/id/237/300/${2}`}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Explore Our Services Section */}
      {/* <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900 mb-4">
              Explore Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              There are various types of seniors living options, including:
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[#155DFC] text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Finding the right senior care has never been easier. Follow these simple steps.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {/* <!-- Card 1 --> */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl"><img src={searchIcon} /></span>
            </div>
            <span className="absolute top-4 right-6 bg-white shadow-md text-blue-600 text-sm font-semibold px-2 py-1 rounded-full">01</span>
            <h3 className="font-bold text-lg text-gray-800 mb-3 mt-3">Enter Your ZIP Code</h3>
            <p className="text-gray-500 text-sm">Locate providers in your area instantly with our comprehensive database.</p>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl"><img src={readReviews} /></span>
            </div>
            <span className="absolute top-4 right-6 bg-white shadow-md text-blue-600 text-sm font-semibold px-2 py-1 rounded-full">02</span>
            <h3 className="font-bold text-lg text-gray-800 mb-3 mt-3">Compare & Read Reviews</h3>
            <p className="text-gray-500 text-sm">Compare providers side-by-side and read authentic user reviews.</p>
          </div>

          {/* <!-- Card 3 --> */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl"><img src={tickIcon} /></span>
            </div>
            <span className="absolute top-4 right-6 bg-white shadow-md text-blue-600 text-sm font-semibold px-2 py-1 rounded-full">03</span>
            <h3 className="font-bold text-lg text-gray-800 mb-3 mt-3">Choose Your Path</h3>
            <p className="text-gray-500 text-sm">Move forward with or without AI help, and join our community forum.</p>
          </div>

          {/* <!-- Card 4 --> */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl"><img src={heartIcon} alt="" /></span>
            </div>
            <span className="absolute top-4 right-6 bg-white shadow-md text-blue-600 text-sm font-semibold px-2 py-1 rounded-full">04</span>
            <h3 className="font-bold text-lg text-gray-800 mb-3 mt-3">Make Confident Decisions</h3>
            <p className="text-gray-500 text-sm">Feel secure in your choice with all the information you need.</p>
          </div>
        </div>
      </section>


      {/* Featured This Week Section */}
      <section className="bg-gray-50 py-[50px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="mb-8 flex flex-wrap md:gap-0 gap-5 items-center justify-between">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
              Featured this week
            </h2>
          </div>

          {/* Grid of professional cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredReviews?.records?.map((professional) => (
              <ProfessionalCard key={professional.id} {...professional} />
            ))}
          </div>
        </div>
      </section>

      {/* What Seniors are Saying Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-full min-h-[187px] flex flex-col gap-[15px]">
                <div>
                  <h2 className="font-geist font-bold md:text-[36px] text-[25px] leading-[125%] text-[#252525]">
                    What Seniors are Saying
                  </h2>
                  <p className="mt-2 font-geist font-normal text-[16px] leading-[170%] text-[#252525]">
                    We’re proud to help thousands of families make confident
                    care decisions. Here’s what real users have shared about
                    their experiences with providers they found through our
                    platform.
                  </p>
                </div>

                {/* 👇 Buttons directly below the paragraph */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={scrollLeft}
                    className="px-[20px] py-[10px] cursor-pointer bg-white border rounded-[4px] border-[#162544] hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#162544]" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="px-[20px] py-[10px] cursor-pointer bg-white border rounded-[4px] border-[#162544] hover:bg-gray-200 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-[#162544]" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <TestimonialCarousel
                ref={scrollRef}
                testimonials={featuredReviews}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="bg-[#F3F8FC] py-[80px]">
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div className="mb-8 flex md:gap-0 gap-5 flex-wrap items-center justify-between">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
              Featured Resources
            </h2>
            {/* <Button variant="primary" className="flex items-center gap-2">
              <span>See All News</span>
              <ArrowRight className="h-4 w-4" />
            </Button> */}
          </div>
          {/* cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FeaturedPosts?.data?.data?.map((item, i) => (
              <ResourceCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="md:text-3xl text-2xl font-bold text-[#155DFC] mb-8">
                How It Works
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <ProcessStep key={index} {...step} stepNumber={index + 1} />
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={FamilyImg}
                alt="How it works"
                className="w-full h-[576px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Forum Preview Section */}
      {/* <section className="bg-[#F3F8FC] text-black py-16 max-w-8xl mx-auto block justify-between sm:flex sm:items-start sm:gap-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Cody Fisher"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Cody Fisher</h3>
                  <p className="text-sm text-gray-400">
                    Posted by: caregiverSon89
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">
                How do I convince my dad to accept home care?
              </h2>
              <p className="text-black-300 mb-6">
                My 78-year-old dad is struggling with mobility, but refuses help
                at home. Has anyone had success getting through to a stubborn
                parent?
                <span className="text-blue-400 cursor-pointer hover:text-blue-300">
                  {" "}
                  Read more...
                </span>
              </p>

              <div className="relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=300&fit=crop"
                  alt="Community discussion"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
                     <div className="flex gap-2.5 mb-2.5">
                  {buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center"
                    >
                      <img src={btn.btnIcon} alt="icon" />
                      {btn.btnText}
                      {btn.downarrow && <img src={btn.downarrow} alt="" />}
                    </button>
                  ))}
                </div>
            </div>
            <div className="flex-shrink-0 w-[292px]">
              <div>
                <CommonInput
                  placeholder="Search Communities "
                  showImg={true}
                  imgSrc={searchCommunity}
                  imgLeft={true}
                  inputClassName="text-base"
                  containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-4"
                  imgClassName="w-5 h-5"
                />

                <div className="bg-white rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
                  <h4 className="mb-1.5">Popular Communities</h4>
                  {popularCommunity.map((community, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 py-[13px] border-b border-b-[#E6E6E6] last:border-b-0"
                    >
                      <img
                        src={community.icon}
                        alt={community.title}
                        className="rounded-full h-[37px] w-[37px]"
                      />
                      <p className="font-semibold">{community.title}</p>
                    </div>
                  ))}
                </div>

                <PrimaryButton
                  btnText="Create Community"
                  showImg={true}
                  img={addCommunity}
                  imgclassName="w-[19px] h-[19px] object-cover"
                  imgPosition="left"
                  btnclassName="border-1 border-[#000] w-[292px] h-[46px] !rounded-[10px] px-4 py-[10px] text-[#252525] font-semibold leading-[33px] gap-[10px] flex items-center justify-center"
                  onClick={() => setStep(1)}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* {
        userInfo?.role_type=="PATIENT" || userInfo?.role_type=="CARE_PROVIDER" ?
        <Convience setLoginModal={setLoginModal} /> : ""
      } */}

      {(userInfo?.role_type === "PATIENT" ||
        userInfo?.role_type === "CARE_PROVIDER") &&
        popularPost?.payload !== null && (
          <Convience setLoginModal={setLoginModal} />
        )}

      <Footer />
    </div>
  );
};

export default HomePage;
