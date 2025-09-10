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
import { ArrowRight } from "lucide-react";
import Button from "@components/Website/Shared/Button";
import CategoryCard from "@components/Website/Home/CategoryCard";
import ServiceCard from "@components/Website/Home/ServiceCard";
import ProfessionalCard from "@components/Website/Home/ProfessionalCard";
import { TestimonialCarousel } from "@components/Website/Home/TestimonialCard";
import ResourceCard from "@components/Website/Home/ResourceCard";
import ProcessStep from "@components/Website/Home/ProcessStep";
import TopBar from "@components/Website/Layout/TopBar";
import Header from "@components/Website/Layout/Header";
import UtilityRow from "@components/Website/Layout/UtilityRow";
import FeaturedArticleCard from "@components/Website/Home/FeaturedArticleCard";
import FeatureCareImg from "@assets/media/website/feature-card.png";
import Exerciseone from "@assets/media/website/exercise-1.svg";
import Exercisetwo from "@assets/media/website/exercise-2.svg";
import Exercisethree from "@assets/media/website/exercise-3.svg";
import Exercisefour from "@assets/media/website/exercise-4.svg";
import RiverImg from "@assets/media/website/river.svg";
import CostImg from "@assets/media/website/rising-cost.svg";
import YogaImg from "@assets/media/website/yoga.svg";
import WorkImg from "@assets/media/website/work.svg";
import CalculateImg from "@assets/media/website/calculate.svg";
import GadgetImg from "@assets/media/website/gadget.svg";
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
import SmallArticleCard from "@components/Website/Home/SmallArticleCard";
import Footer from "@components/Website/Layout/Footer";
import ArrowButtonGroup from "@components/Website/Shared/ArrowButtonGroup";
import Convience from "@components/Website/Home/Convience";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import { useCategory, useFeaturedWeakReviews } from "@src/hooks/useWebsite";
import { useReview } from "@src/hooks/useWebsite";
import dummyImage from "@assets/media/images/client.png";
import { useBlog, useRecentBlogs } from "@src/hooks/useWebsite";
import { useState } from "react";
import Spinner from "@components/Loaders/Spinner";
// import Button from "../components/Shared/Button";

const HomePage = () => {
  // Sample data arrays following your pattern of using arrays for similar components

  const { data } = useRecentBlogs();
  const { data: categories, isLoading, isError } = useCategory();
  const { data: featuredReviews } = useFeaturedWeakReviews();

  // const {data:catData}=useCategory()


  if (isLoading) {
    return <p className="text-center"><Spinner/></p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );
  }

  // Agar API me `records` hai

  const services = [
    {
      title: "Independent Living",
      description:
        "For active seniors who can manage on their own but prefer the convenience of community living, often with amenities like housekeeping and social activities.",
      image: Independent,
      link: "/services/independent-living",
    },
    {
      title: "Assisted Living",
      description:
        "For those who need help with daily tasks such as bathing, dressing, or medication management, while still enjoying a level of independence.",
      image: Assistant,
      link: "/services/assisted-living",
    },
    {
      title: "Memory Care",
      description:
        "Specialized care for seniors with Alzheimer's or other forms of dementia, offering a secure and supportive environment.",
      image: Memory,
      link: "/services/memory-care",
    },
    {
      title: "Skilled Nursing Facilities",
      description:
        "Provide 24-hour medical care and rehabilitation for seniors with serious health conditions.",
      image: NursingFacility,
      link: "/services/skilled-nursing",
    },
  ];

  const featuredResources = [
    {
      title: "The Craziest Travel Deals You NEED To Know",
      date: "10 December 2025",
      excerpt:
        "Limited Travel Deals – Domestic and International flights. Limited deals on both local and internation...", // NEW
      image: Travel,
      link: "/news/1",
    },
    {
      title: "Inside The Hidden Paradise That Nobody Talks About",
      date: "10 December 2025",
      excerpt:
        "El Salvador is quickly becoming one of the top travel destinations in Central America, offering breathtaking...",
      image: Nature,
      link: "/news/2",
    },
    {
      title: "5 Shocking Dangers of Traveling Over 70..",
      date: "10 December 2025",
      excerpt:
        "Five dangers of traveling when you’re 70 plus – and how to stay safe when adventure calls in your golden years…",
      image: Danger,
      link: "/news/3",
    },
  ];

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

  return (
    <div className="min-h-screen">
      <TopBar />
      <UtilityRow />
      {/* <Header /> */}

      {/* FEATURED + SIDEBAR WRAPPER */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* One column on mobile, two equal columns ≥ lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ───── Left: featured story ───── */}
            <FeaturedArticleCard
              image={data?.records?.[0]?.image}
              category="Facilities"
              published={new Date(
                data?.records?.[0]?.created_at
              ).toLocaleString()}
              typeLabel="Article"
              readTime="4 min read"
              title={data?.records?.[0]?.title}
              link="/articles/featured"
            />

            {/* ───── Right: sidebar list ───── */}
            <div className="space-y-6">
              {data?.records?.slice(1).map((blog, i) => (
                <SmallArticleCard key={i} {...blog} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-[40px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="md:text-[36px] text-[20px] font-bold md:mb-[50px] mb-[25px] ">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.records?.map((category: any,index) => (
              <CategoryCard
                key={category.id}
                id={category.id}
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
      </section>

      {/* Explore Our Services Section */}
      <section className="bg-white py-16">
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
              {/* <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                alt="Senior care consultation"
                className="w-full h-96 object-cover rounded-lg"
              /> */}
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
                {/* <ArrowButtonGroup /> */}
              </div>
            </div>
            <div>
              <TestimonialCarousel testimonials={featuredReviews} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="bg-[#F3F8FC] py-[80px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-[135px]">
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
            {featuredResources.map((item, i) => (
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
              <h2 className="md:text-3xl text-2xl font-bold text-gray-900 mb-8">
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
                  imgClass="w-[19px] h-[19px] object-cover"
                  imgPosition="left"
                  btnClass="border-1 border-[#000] w-[292px] h-[46px] !rounded-[10px] px-4 py-[10px] text-[#252525] font-semibold leading-[33px] gap-[10px] flex items-center justify-center"
                  onClick={() => setStep(1)}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Convience />
      <Footer />
    </div>
  );
};

export default HomePage;
