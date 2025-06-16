import { Bookmark } from "lucide-react";
import Tick from "@assets/media/svgs/patient-db-svgs/tick-circle.svg";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import { useState } from "react";

interface HospitalProfileCardProps {
  name: string;
  imageUrl: string;
  email: string;
  specialty: string;
  description: string;
}

export default function HospitalProfileCard({
  name,
  imageUrl,
  email,
  specialty,
  description,
}: HospitalProfileCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => setIsBookmarked(!isBookmarked);

  // Example services data; replace or populate as needed
  const servicesData = [
    { id: 1, name: "24/7 Nursing Care" },
    { id: 2, name: "Assisted Living Apartments" },
    { id: 3, name: "Physical & Occupational Therapy" },
    { id: 4, name: "Hospice & Palliative Care" },
    { id: 5, name: "Memory Care Unit" },
  ];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* left: avatar + headings */}
        <div className="flex items-center gap-4">
          <img
            src={ProfilePic} /* dynamic hospital image */
            alt={`${name} building`}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div className="leading-tight">
            <h2 className="font-space font-bold text-[20px] leading-[32px] text-[#181D27] align-middle [leading-trim:cap] [text-edge:cap]">
              Johns Hopkins Hospital
            </h2>
            <p className="font-geist font-normal text-[12px] leading-[100%] text-[#252525] align-middle [leading-trim:cap] [text-edge:cap]">
              support@hopkinshospital.org
            </p>
          </div>
        </div>

        {/* right: bookmark button */}
        <button
          type="button"
          onClick={handleBookmarkToggle}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark hospital"}
          className="w-10 h-10 grid place-items-center rounded-full border border-gray-300
               hover:bg-gray-100 transition-colors"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isBookmarked ? "fill-current text-medical-blue" : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <div className="mb-3">
          <span className="text-sm text-gray-500 block mb-1">
            Specialty / Type
          </span>
          <p className="text-sm text-gray-900 font-medium">{specialty}</p>
        </div>
        <h4>Geriatric Specialist | Nursing Home | Rehab Center</h4>
        <p>
          Sunrise Hills Nursing Home is a full-service assisted living facility
          specializing in post-acute rehabilitation and long-term senior care.
          Our mission is to provide compassionate, person-centered services in a
          comfortable, home-like setting.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Services Offered Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Services Offered:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {servicesData.map((service) => (
            <li
              key={service.id}
              className="flex items-center space-x-2 text-sm"
            >
              <img src={Tick} alt="" className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-700">{service.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
