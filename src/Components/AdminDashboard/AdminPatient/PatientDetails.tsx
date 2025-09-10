import { useState, useEffect } from "react";
import InputField from "@components/AdminInputField/AdminInputField";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import SelectField from "@components/AdminSelectField/AdminSelectField";
import { GoPerson } from "react-icons/go";
import leftarrow from "@assets/media/svgs/leftarrow.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";


const getAllOptions = (baseOptions, apiValue) => {
  if (!apiValue) return baseOptions; // agar value hi null/undefined hai toh base options return karo
  const exists = baseOptions.some((opt) => opt.value === apiValue);
  return exists
    ? baseOptions
    : [...baseOptions, { value: apiValue, label: apiValue }];
};

const GenderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
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

const PatientDetail = ({ goBack, userData, fetchUser }) => {
  const [fullName, setFullName] = useState(userData?.first_name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.number || "");
  const [age, setAge] = useState(userData?.age || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [city, setCity] = useState(userData?.city || "");
  const [cities, setCities] = useState([]);
  const [zip, setZip] = useState(userData?.postal_code || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [firstName, setFirstName] = useState(userData?.first_name || "");
  const [lastName, setLastName] = useState(userData?.last_name || "");

  const [image, setImage] = useState(null);

  // const genderAllOptions = getAllOptions(GenderOptions, userData?.gender);
  const genderAllOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const navigate = useNavigate();

  const autoSave = async () => {
    const formData = new FormData();
    // formData.append("name", fullName);
    formData.append("email", email);
    formData.append("number", phone);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("postal_code", zip);
    formData.append("address", address);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("status", status); // ✅ status bhi send karenge

    if (image) formData.append("image", image);
    setLoading(true);
    try {
      // const token = localStorage.getItem("token"); // token from localStorage
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
      if (response?.status == 200) {

        toast.success("Patient updated successfully");
        fetchUser();
        setLoading(false);
      }
    } catch (error) {
      console.error("Auto-save error:", error);
      toast.error(error?.response?.data?.errors[0]?.message);
      setLoading(false);
    }
  };

  // sabse upar state rakho
  const [status, setStatus] = useState(userData?.status || "ACTIVE");
  const [loading, setLoading] = useState(false);

  // fir useEffect likho
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // ✅ Agar loading true hai to kuch mat karo
        if (loading) return;

        autoSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    email,
    phone,
    age,
    gender,
    city,
    zip,
    address,
    firstName,
    lastName,
    status,
    image,
    loading,
  ]);

  // statusOptions ab niche bhi chalega
  const statusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  return (
    <>
      <div>
        <div className="flex items-baseline gap-2">
          <img
            src={leftarrow}
            alt=""
            className="cursor-pointer"
            onClick={() => goBack(false)}
          />
          <h2 className=" text-[25px] space-grotesk font-bold text-[#181D27] font-[Space Grotesk] mb-6">
            Edit Patient Details
          </h2>
        </div>

        <div className="rounded-[10px] bg-white md:p-10 p-3 mb-4">
          <div className="overflow-y-auto h-[628px]">
            {/* Profile Header */}
            <div className="flex flex-wrap md:gap-0 gap-3 items-center justify-between mb-7">
              <div className="flex items-center gap-3">
                <img
                  src={
                    userData?.image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          userData.image
                        }`
                      : dummyImage
                  }
                  alt="Patient"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = dummyImage;
                  }}
                  className="rounded-[50%] w-16 h-16 object-cover"
                />
                <h3 className="space-grotesk">{userData?.user_name}</h3>
              </div>

              <SelectField
                value={status}
                onChange={handleChange}
                options={statusOptions}
                id="status"
                className={`${
                  status === "ACTIVE"
                    ? "!border cursor-pointer text-[#067647] !border-[#067647] !rounded-[30px] px-5 !py-0 !h-9 !w-28"
                    : "!border cursor-pointer text-red-500 !border-red-500 !rounded-[30px] px-5 !py-0 !h-9 !w-28"
                }`}
                optionsClass="!text-black"
              />
            </div>

            {/* Personal Info */}
            <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Add Personal Information
            </h4>

            <div className="pb-4 mb-3 border-[#252525]/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  autoSave();
                }}
              >
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="pr-9"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    icon={GoPerson}
                    placeholder="Methew"
                  />
                  <InputField
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="pr-9"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    icon={GoPerson}
                    placeholder="Thompson"
                  />
                  <InputField
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    className="pr-9"
                    disabled={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={GoPerson}
                    placeholder="methew@gmail.com"
                  />
                  <InputField
                    label="Phone:"
                    id="tel"
                    name="tel"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1***********"
                  />
                  <InputField
                    label="Age"
                    id="age"
                    name="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="89"
                  />
                  <SelectField
                    label="Gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    options={genderAllOptions}
                  />
                </div>

                {/* Location Info */}
                <div className="mt-8">
                  <span className="font-semibold text-xl space-grotesk">Add Location</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
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
                      value={zip}
                      isZipCode={true}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="78701"
                    />
                    <div></div>
                  </div>

                  <InputField
                    label="Address:"
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 main Street, Springfield, 1L 62704"
                    className="mt-4"
                  />
                </div>
              </form>
            </div>

            {/* Save Button */}
            <div>
              <PrimaryButton
                btnText={loading ? "Saving..." : "Save Changes"}
                showImg={true}
                onClick={autoSave}
                type="submit"
                imgClass="w-4 h-4"
                btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
