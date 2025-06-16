import { MapPin, Phone, Clock } from "lucide-react";

export interface ContactInformationCardProps {
  address: string;
  phone: string;
  weekdayHours: string;
  weekendHours: string;
  city?: string; // displayed under the map placeholder
}

export default function ContactInformationCard({
  address,
  phone,
  weekdayHours,
  weekendHours,
  city = "Your City",
}: ContactInformationCardProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

{/* Location */}
<div className="mb-4">
  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
    Location:
  </label>
  <p className="text-sm text-gray-900">4001 J St, Sacramento, CA 95819</p>
</div>

 {/* Phone */}
<div className="mb-4">
  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
    <Phone className="h-3 w-3" />
    Phone Number:
  </label>
  <p className="text-sm text-gray-900">(916) 555-8923</p>
</div>


      {/* Working Hours */}
      <div className="mb-6">
        <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
          <Clock className="h-3 w-3" />
          Working Hours
        </label>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Mon - Fri | 09:00AM -12:00AM</span>
            <span className="text-gray-900">{weekdayHours}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Sat - Sun | 09:00AM -01:00PM</span>
            <span className="text-gray-900">{weekendHours}</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center">
          <MapPin className="h-8 w-8 text-medical-blue mx-auto mb-2" />
          <p className="text-sm text-gray-600">Interactive Map</p>
          <p className="text-xs text-gray-500">{city}</p>
        </div>

        {/* Simple streets mockup */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-0.5 bg-gray-400 rotate-45" />
          <div className="absolute top-8 right-8 w-12 h-0.5 bg-gray-400 -rotate-12" />
          <div className="absolute bottom-6 left-8 w-20 h-0.5 bg-gray-400 rotate-12" />
          <div className="absolute bottom-10 right-6 w-14 h-0.5 bg-gray-400 -rotate-45" />
        </div>
      </div>
    </div>
  );
}
