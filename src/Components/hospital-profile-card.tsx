import { Bookmark } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "./Shared-components/Buttons/Common-button/CommonButton";

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
    { id: 1, name: "Emergency Care" },
    { id: 2, name: "Cardiology" },
    { id: 3, name: "Radiology" },
    { id: 4, name: "Pediatrics" },
  ];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-6">
        <img
          src={imageUrl}
          alt={`${name} building`}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">{email}</p>

          <PrimaryButton
            btnClass="text-medical-blue hover:text-blue-700 p-0"
            img={<Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />}
            onClick={handleBookmarkToggle}
            showImg={true}
            imgPosition="left"
            disabled={false}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <div className="mb-3">
          <span className="text-sm text-gray-500 block mb-1">Specialty / Type</span>
          <p className="text-sm text-gray-900 font-medium">{specialty}</p>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Services Offered Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Services Offered:
        </h3>
        {/* Example of services rendering logic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {servicesData.map((service) => (
            <div key={service.id} className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-medical-green rounded-full flex-shrink-0" />
              <span className="text-gray-700">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
