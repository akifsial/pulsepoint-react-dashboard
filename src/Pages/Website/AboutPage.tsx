import medicalImage from "@assets/media/images/dashboard-images/about-banner.png";
import aboutBanner2 from "@assets/media/images/dashboard-images/about-banner2.png";
import Footer from "@components/Website/Layout/Footer";
import TopBar from "@components/Website/Layout/TopBar";
import UtilityRow from "@components/Website/Layout/UtilityRow";
import BannerWeb from "@pages/Web-pages/Components/BannerWeb";
import CategoriesTab from "@pages/Web-pages/Components/CategoriesTab";
import nursingImg from "@assets/media/images/dashboard-images/nursing.png";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar + Utility */}
      <TopBar />
      <UtilityRow />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 pt-0 pb-0">
        <BannerWeb className="bg-white" pageName="About Us" />

        {/* <CategoriesTab categoryTitle={"Categories"} /> */}

        {/*  */}

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
              {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories?.records?.map((category: any, index) => (
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
            </div> */}
            </div>
            <div className="w-full flex justify-center h-[341px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <img className="w-full object-cover" src={aboutBanner2} alt="" />
            </div>
          </div>
        </section>

        {/*  */}

        {/*  */}

        <section className="bg-white md:py-16 pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="md:text-[36px] md:w-[320px] w-full text-[25px] font-bold text-[#252525] mb-[28px]">
                  Care That Feels Like Family
                </h2>
                <div className="space-y-4">
                  <p>
                    I am passionate about enriching the lives of older adults
                    and creating environments where seniors feel respected,
                    supported, and truly at home. With a background in
                    [healthcare | lifestyle | financial advice | technology
                    guides], etc., I’ve dedicated my career to ensuring that
                    ageing adults receive compassionate care and have access to
                    meaningful, engaging experiences every day.
                  </p>
                  <p>
                    Whether I’m helping families navigate care options,
                    coordinating wellness programs, or supporting residents in
                    their daily routines, my goal is always to promote dignity,
                    independence, and joy in later life. I believe that senior
                    living is not just about care—it’s about community,
                    connection, and quality of life.
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
