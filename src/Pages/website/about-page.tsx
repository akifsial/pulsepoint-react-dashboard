import medicalImage from "@assets/media/images/dashboard-images/about-banner.png";
import aboutBanner2 from "@assets/media/images/dashboard-images/about-banner2.png";
import Footer from "@components/website/layout/footer";
import TopBar from "@components/website/layout/top-bar";
import UtilityRow from "@components/website/layout/utility-row";
import BannerWeb from "@pages/web-pages/components/banner-web";
import CategoriesTab from "@pages/web-pages/components/categories-tab";
import nursingImg from "@assets/media/images/dashboard-images/nursing.png";
import { Link } from "react-router-dom";


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 pt-0 pb-0">
        <BannerWeb className="bg-white" pageName="About Us" />


        <section className={`bg-[#F3F8FC] py-[0px] md:pt-[75px] pt-[30px]  md:pb-[60px] pb-[20px]`}>
          <div>
            <div className="w-full flex justify-between flex-wrap md:gap-0 gap-5 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-5 mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="md:text-[36px] w-[365px] text-[25px] font-bold md:mb-[22px] mb-[0px] ">
                Compassionate Senior Living
              </h2>

              <p className="w-[581px] flex justify-center items-center">
                “Our mission is to enhance the quality of life for seniors by
                providing compassionate care, promoting independence, and
                creating a safe, supportive, and engaging community where every
                individual is respected and valued.”
              </p>
            </div>
            <div className="w-full flex justify-center h-[341px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <img className="w-full object-cover" src={aboutBanner2} alt="" />
            </div>
          </div>
        </section>

        <section className="bg-white md:py-16 pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="md:text-[36px] md:w-[320px] w-full text-[25px] font-bold text-[#252525] mb-[28px]">
                  Care That Feels Like Family
                </h2>
                <div className="space-y-4">
                  <p>
                    TopSeniorSpot.com is a streamlined Senior Care Comparison Directory dedicated to helping U.S. families quickly find, compare, and review local care providers. Our free ZIP-code-based searches, user-generated ratings, and authentic reviews empower informed decisions, while our premium AI chatbot offers fast, personalized support and deeper provider comparisons. With a responsive community forum and a commitment to transparency, accuracy, and accessibility, we simplify the search for high-quality senior care and connect families with trusted options in their area.

                  </p>

                </div>
              </div>
              <div className="relative">
                <img
                  src={nursingImg}
                  alt="How it works"
                  className="w-full h-[484px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
