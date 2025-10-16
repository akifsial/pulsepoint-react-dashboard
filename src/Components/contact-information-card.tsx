import { useCareProviderSingle } from "@src/hooks/use-dashboard";
import { MapPin, Phone, Clock } from "lucide-react";
import Map from "./map/map";

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
  id,
}: ContactInformationCardProps) {
  const { data } = useCareProviderSingle(id);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Contact Information
      </h3>

      {/* Location */}
      <div className="mb-4">
        <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
          Location:
        </label>
        <p className="text-sm text-gray-900">{data?.address}</p>
      </div>
{
  data?.website_url ?
      <div className="mb-4">
        <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
          Website:
        </label>
        <p className="text-sm text-gray-900">{data?.website_url}</p>
      </div> : ""
}

      {/* Phone */}
      <div className="mb-4">
        <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
          <Phone className="h-3 w-3" />
          Phone Number:
        </label>
        <p className="text-sm text-gray-900">{data?.number}</p>
      </div>

      {/* Working Hours */}
      <div className="mb-6">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            {/* <span className="text-gray-700">{data?.working_hours}</span> */}
          </div>
          <div className="flex justify-between text-sm">
            {data?.start_day ||
            data?.end_day ||
            data?.time_in ||
            data?.time_out ? (
              <>
                <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                  <Clock className="h-3 w-3" />
                  Working Hours
                </label>
                <span className="text-gray-900">{weekdayHours}</span>

                <span className="text-gray-700">
                  {data?.start_day} - {data?.end_day} | {data?.time_in} -{" "}
                  {data?.time_out}{" "}
                </span>
                <span className="text-gray-900">{weekendHours}</span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <Map
        // defaultCenter={[71.5249, 34.0151]}
        defaultCenter={[10.4515, 51.1657]} // Germany
        // onLocationSelect={(e) => console.log("eeeeee", e)}
      />
    </div>
  );
}
