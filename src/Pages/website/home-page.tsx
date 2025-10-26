import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Heart, Users } from "lucide-react";
import Button from "@components/website/shared/button";
import CategoryCard from "@components/website/home/category-card";
import ServiceCard from "@components/website/home/service-card";
import ProfessionalCard from "@components/website/home/professional-card";
import { TestimonialCarousel } from "@components/website/home/testimonial-card";
import ResourceCard from "@components/website/home/resource-card";
import ProcessStep from "@components/website/home/process-step";
import Header from "@components/website/layout/header";
import { useBlog, useCategory, useGetBlogs } from "@src/hooks/use-website";
import dummyImage from "@assets/media/images/dummyUser.png"
const HomePage = () => {
  const categories = [
    {
      title: "Activities",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      link: "/activities",
    },
    {
      title: "Costs",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=300&fit=crop",
      link: "/costs",
    },
    {
      title: "Exercises",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      link: "/exercises",
    },
    {
      title: "Facilities",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      link: "/facilities",
    },
    {
      title: "Financial Advice",
      image:
        "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=300&h=300&fit=crop",
      link: "/financial-advice",
    },
    {
      title: "Gadgets",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=300&fit=crop",
      link: "/gadgets",
    },
  ];

  const services = [
    {
      title: "Independent Living",
      description:
        "For active seniors who can manage on their own but prefer the convenience of community living, often with amenities like housekeeping and social activities.",
      image:
        "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=300&fit=crop",
      link: "/services/independent-living",
    },
    {
      title: "Assisted Living",
      description:
        "For those who need help with daily tasks such as bathing, dressing, or medication management, while still enjoying a level of independence.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      link: "/services/assisted-living",
    },
    {
      title: "Memory Care",
      description:
        "Specialized care for seniors with Alzheimer's or other forms of dementia, offering a secure and supportive environment.",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      link: "/services/memory-care",
    },
    {
      title: "Skilled Nursing Facilities",
      description:
        "Provide 24-hour medical care and rehabilitation for seniors with serious health conditions.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      link: "/services/skilled-nursing",
    },
  ];

  const featuredProfessionals = [
    {
      id: "1",
      name: "Dr. Susan Meadows",
      title: "Geriatric Specialist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      profileLink: "/professionals/dr-susan-meadows",
    },
    {
      id: "2",
      name: "Golden Years Rehab",
      title: "Senior Rehab Facility",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop",
      rating: 4.3,
      profileLink: "/facilities/golden-years-rehab",
    },
    {
      id: "3",
      name: "Nancy Porter",
      title: "In-Home Care Nurse",
      image:
        "https://images.unsplash.com/photo-1594824475317-1b96d0719faf?w=150&h=150&fit=crop&crop=face",
      rating: 4.3,
      profileLink: "/professionals/nancy-porter",
    },
    {
      id: "4",
      name: "Memory Care",
      title: "Alzheimer's Care Center",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop",
      rating: 4.3,
      profileLink: "/facilities/memory-care-center",
    },
  ];

  const testimonials = [
    {
      id: "1",
      name: "Patricia M.",
      title: "Dash Private Villa Project Investor",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b605?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      content:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
    },
    {
      id: "2",
      name: "Emma D.",
      title: "Dash Private Villa Project Investor",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      content:
        "We were overwhelmed until we found Harmony Heights. They gave us three excellent options and guided us through every step. Now my father feels at home again.",
    },
  ];

  const featuredResources = [
    {
      title: "The Craziest Travel Deals You NEED to Know",
      category: "In Community Tips",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
      readTime: "5 min read",
      link: "/resources/travel-deals",
    },
    {
      title: "Inside This Hidden Paradise That Nobody Talks About",
      category: "In Travel Tips",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      readTime: "7 min read",
      link: "/resources/hidden-paradise",
    },
    {
      title: "5 Shocking Dangers of Traveling Over 70+",
      category: "In Community Tips",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop",
      readTime: "4 min read",
      link: "/resources/travel-safety",
    },
  ];

  const processSteps = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
      title: "Sign Up & Set Your Location",
      description: "Create a free account in just a few clicks.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Find Care You Are Happy With",
      description: "Explore care near you with our AI App Help.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Network & Community",
      description: "Meet wonderful pros like Ronal for support.",
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-500" />,
      title: "Make Confident Decisions",
      description: "Trust verified pros like Rona for honest help.",
    },
  ];


  return (
    <div className="min-h-screen">
      <Header />
    
      <section className="bg-gray-50 py-[50px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[36px] font-bold text-black">
              Explore Categories
            </h2>
            <Button variant="primary" className="flex items-center space-x-2">
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <CategoryCard categoryUrl={category.link} key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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

      <section className="bg-gray-50 py-[50px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured this week
            </h2>
            <Button variant="primary" className="flex items-center space-x-2">
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} {...professional} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Seniors are Saying
              </h2>
              <p className="text-gray-600 mb-8">
                We're proud to help thousands of families make confident care
                decisions. Here's what real users have shared about their
                experiences with providers they found through our platform.
              </p>
              <TestimonialCarousel testimonials={testimonials} />
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                alt="Senior care consultation"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-[50px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#155DFC] mb-8">
                How It Works
              </h2>
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <ProcessStep key={index} {...step} stepNumber={index + 1} />
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=500&fit=crop"
                alt="How it works"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Cody Fisher"
                  className="w-10 object-cover h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Cody Fisher</h3>
                  <p className="text-[14px] font-normal text-[#252525]">
                    Posted by: caregiverSon89
                  </p>
                </div>
              </div>

              <h2 className="text-[24px] font-bold mb-4">
                How do I convince my dad to accept home care?
              </h2>
              <p className="text-gray-300 mb-6">
                My 78-year-old dad is struggling with mobility, but refuses help
                at home. Has anyone had success getting through to a stubborn
                parent?
              </p>

              <div className="relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=300&fit=crop"
                  alt="Community discussion"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <button className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded">
                  <span>👍</span>
                  <span>Vote</span>
                  <span className="bg-gray-700 px-2 py-0.5 rounded">0</span>
                </button>
                <button className="flex items-center space-x-2">
                  <span>💬</span>
                  <span>2.3k</span>
                </button>
                <button className="flex items-center space-x-2">
                  <span>📤</span>
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">
                Top Communities
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Doug Kerr", date: "May 21, 2006" },
                  { name: "Asher Kelman", date: "Apr 27, 2006" },
                  { name: "Jerome Marot", date: "Jan 19, 2011" },
                  { name: "Antonio Correia", date: "Feb 12, 2025" },
                ].map((doctor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={
                        doctor?.profile_icon_image
                          ? `${import.meta.env.VITE_APP_API_IMG_URL}${doctor.profile_icon_image
                          }`
                          : dummyImage
                      }
                      alt={doctor.name}
                      className="w-10 object-cover h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{doctor.name}</h4>
                      <p className="text-sm text-gray-400">{doctor.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
