import { useState, useEffect } from "react";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import RatingStars from "@components/shared-components/rating-stars";
import InputField from "@components/adminInputfield/admin-input-field";
import SelectField from "@components/admin-select-field/AdminSelectField";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";

import { GoPerson } from "react-icons/go";
import leftarrow from "@assets/media/svgs/leftarrow.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
];

const cityAllOptions = [
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Paris", label: "Paris" },
  { value: "Dubai", label: "Dubai" },
  { value: "Singapore", label: "Singapore" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Zurich", label: "Zurich" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Monaco", label: "Monaco" },
];

const EditDetails = ({ goBack, userData, fetchUser }) => {
  const [organization, setOrganization] = useState(
    userData?.organization_name || ""
  );
  const [state, setState] = useState(userData?.state || "");
  const [city, setCity] = useState(userData?.city || "");
  const [cities, setCities] = useState([]);
  const [name, setName] = useState(
    userData?.full_name || userData?.user_name || ""
  );
  const [phone, setPhone] = useState(userData?.number || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [website, setWebsite] = useState(userData?.website_url || "");
  const [states, setStates] = useState([]);
  const [zip, setZip] = useState(userData?.postal_code || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [debounceTimer, setDebounceTimer] = useState<any>(null);
  const getAllOptions = (baseOptions, apiValue) => {
    if (!apiValue) return baseOptions; 
    const exists = baseOptions.some((opt) => opt.value === apiValue);
    return exists
      ? baseOptions
      : [...baseOptions, { value: apiValue, label: apiValue }];
  };


  const autoSave = async () => {
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("number", phone);
    formData.append("email", email);
    formData.append("website_url", website);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("postal_code", zip);
    formData.append("address", address);
    formData.append("status", status); 
    formData.append("organization_name", organization); 

    setLoading(true);
    try {
      const token: string | null = JSON.parse(
        localStorage.getItem("token") || "null"
      );

      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}user/${userData?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == "200") {
        fetchUser();
        setLoading(false);
        toast.success("Careprovider Updated Successfully");
      }

    } catch (error) {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ];

  const [status, setStatus] = useState(userData.status || "Active");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus); 
  };


  return (
    <div>
      <div className="flex items-baseline gap-2">
        <img
          src={leftarrow}
          alt=""
          className="cursor-pointer"
          onClick={() => goBack(false)}
        />
        <h2 className="text-[25px] space-grotesk font-bold text-[#181D27] font-[Space Grotesk] mb-6">
          Edit Care Provider Details
        </h2>
      </div>

      <div className="rounded-[10px] bg-white md:p-10 p-3 mb-4">
        <div className="overflow-y-auto h-[628px]">
          <div className="flex flex-wrap items-center justify-between mb-7">
            <div className="flex flex-wrap  items-center gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    userData?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          userData.image
                        }`
                      : dummyImage
                  }
                  alt={name || "Care Provider"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = dummyImage;
                  }}
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h3 className="space-grotesk">{userData.user_name}</h3>
                  <div className="flex items-center">
                    <RatingStars
                      value={
                        userData?.ratingData?.avg_rating > 0
                          ? userData.ratingData.avg_rating.toString()
                          : userData.role_id === 2
                          ? "2"
                          : "3"
                      }
                      isDisabled={true}
                    />
                    <p className="text-[16px] text-[#252525] ml-1">
                      {userData?.ratingData?.avg_rating > 0
                        ? userData.ratingData.avg_rating.toFixed(1)
                        : userData.role_id === 2
                        ? "2.0"
                        : "3.0"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <SelectField
                  value={status}
                  onChange={handleChange}
                  options={statusOptions}
                  gray={false}
                  id="status"
                  className={`${
                    status == "ACTIVE"
                      ? "!border cursor-pointer text-[#067647] !border-[#067647] !rounded-[30px] px-5 !py-0 !h-9 !w-28"
                      : "!border cursor-pointer text-red-500 !border-red-500 !rounded-[30px] px-5 !py-0 !h-9 !w-28"
                  }`}
                  optionsClass="!text-black"
                />
              </div>
            </div>
          </div>

          <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>

          <div className="pb-4 mb-3 border-[#252525]/30">
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!loading) {
                    autoSave();
                  }
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="User Name:"
                  id="name"
                  name="name"
                  type="text"
                  className="pr-9"
                  icon={GoPerson}
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={true}
                />

                <SelectField
                  label="Organization Type"
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  options={organizationOptions}
                />

                <InputField
                  label="Phone:"
                  id="tel"
                  name="tel"
                  type="number"
                  placeholder="097-765-7654"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <InputField
                  label="Email:"
                  id="email"
                  disabled={true}
                  name="email"
                  type="email"
                  placeholder="contact@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <InputField
                label="Website:"
                id="website"
                name="web"
                type="text"
                placeholder="https://www.topseniorspot.org"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-4"
              />

              <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3 mt-6">
                Location Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="State:"
                  id="state"
                  name="state"
                  type="text"
                  placeholder="California"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />

                <SelectField
                  label="City"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  options={cityAllOptions}
                  className="py-0 mt-1"
                />

                <InputField
                  label="Zip Code:"
                  id="zip"
                  name="zip"
                  type="number"
                  placeholder="78701"
                  value={zip}
                  isZipCode={true}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <InputField
                label="Address:"
                id="address"
                name="address"
                type="text"
                placeholder="123 main Street, Springfield, IL 62704"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-4"
              />
            </form>
          </div>

          <div>
            <PrimaryButton
              btnText={loading ? `Saving...` : "Save Changes"}
              showImg={true}
              imgClass="w-4 h-4"
              btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
              onClick={autoSave}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
