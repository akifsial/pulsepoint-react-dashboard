// import { useState } from "react";
// import Model from "@components/Model/Model";
// import ChangePhoto from "./ChangePhoto";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import InputField from "@components/InputField";
// import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg";
// import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
// // import Call from "../../assets/media/svgs/dashboard-svgs/call.svg";
// // import Sms from "../../assets/media/svgs/dashboard-svgs/sms.svg";
// import { RxPerson } from "react-icons/rx";
// import { RiMailOpenLine } from "react-icons/ri";
// import { FiPhone } from "react-icons/fi";
// import share from "@assets/media/svgs/share.svg"
// import profile from "@assets/media/svgs/profileimg.svg"

// const organizationOptions = [
//   { value: "Hospital", label: "Hospital" },
//   { value: "Private", label: "Private" },
//   { value: "Government", label: "Government" },
//   { value: "Other", label: "Other" },
// ];

// const stateOptions = [
//   { value: "California", label: "California" },          // USA – Tech & Hollywood hub
//   { value: "New York", label: "New York" },              // USA – NYC is world-famous
//   { value: "Texas", label: "Texas" },                    // USA – Known for size, oil, culture
//   { value: "Florida", label: "Florida" },                // USA – Famous for tourism & Miami
//   { value: "Bavaria", label: "Bavaria" },                // Germany – Munich & BMW
//   { value: "Île-de-France", label: "Île-de-France" },    // France – Includes Paris
//   { value: "Dubai", label: "Dubai" },                    // UAE – Luxury and architecture
//   { value: "Tokyo Prefecture", label: "Tokyo Prefecture" }, // Japan – Tokyo is iconic
//   { value: "Ontario", label: "Ontario" },                // Canada – Includes Toronto
//   { value: "Maharashtra", label: "Maharashtra" },        // India – Includes Mumbai
// ];

// const cityOptions = [
//   { value: "New York", label: "New York" },
//   { value: "London", label: "London" },
//   { value: "Paris", label: "Paris" },
//   { value: "Dubai", label: "Dubai" },
//   { value: "Singapore", label: "Singapore" },
//   { value: "Tokyo", label: "Tokyo" },
//   { value: "Hong Kong", label: "Hong Kong" },
//   { value: "Zurich", label: "Zurich" },
//   { value: "Los Angeles", label: "Los Angeles" },
//   { value: "Monaco", label: "Monaco" },
// ];

// const AdminProfileDetail = ({ onChangePassword }) => {
//      const [activeTab, setActiveTab] = useState("home");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [organization, setOrganization] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");

//   return (
//     <>
//       <div>
//         <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[508px]">
//           <div className="flex items-center justify-between mb-9">
//             <div className="flex items-center gap-3">
//               <img src={profile} alt="Methew" />
//               <div>
//                 <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
//                   Methew Thompson
//                 </h4>
//               </div>
//             </div>

//             <PrimaryButton
//               btnText="Change Profile  Picture"
//               showImg={true}
//               img={share}
//               btnClass="border-1 border-[#25252533] w-[220px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
//               onClick={() => setIsModalOpen(true)}
//             />
//           </div>

//           <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
//             Add Personal Information
//           </h4>

//           <form>
//             <div className="flex flex-wrap items-center gap-x-4">
//               <InputField
//                 label="Name:"
//                 id="name"
//                 name="name"
//                 type="text"
//                 fieldName="w-[49%]"
//                 icon={RxPerson}
//                 placeholder="Admin"
//               />
//               <InputField
//                 label="Speciality/Role:"
//                 id="text"
//                 name="text"
//                 type="text"
//                 fieldName="w-[49%]"
//                 iconUrl={inputUser}
//                 placeholder="Admin"
//               />

//               <InputField
//                 label="Phone:"
//                 id="tel"
//                 name="tel"
//                 type="tel"
//                 fieldName="w-[49%]"
//                 icon={FiPhone}
//                 placeholder="097-765-7654"
//               />
//               <InputField
//                 label="Email:"
//                 id="email"
//                 name="email"
//                 type="email"
//                 fieldName="w-[49%]"
//                 icon={RiMailOpenLine}
//                 placeholder="admin@organization.com"
//               />
//             </div>

//             <PrimaryButton
//               btnText="Save Changes"
//               showImg={false}
//               btnClass="w-[30%] h-[46px] mt-9 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
//             />
//           </form>
//         </div>
//       </div>

//       {isModalOpen && (
//         <Model setIsOpen={setIsModalOpen} className="max-w-[488px]">
//           <ChangePhoto />
//         </Model>
//       )}
//     </>
//   );
// };

// export default AdminProfileDetail;

import { useState, useEffect } from "react";

import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import InputField from "@components/AdminInputField/AdminInputField";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
import { RxPerson } from "react-icons/rx";
import { RiMailOpenLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { ToastContainer, toast } from "react-toastify";
import { apiServices } from "@src/Shared/apiServices";
import apiEndpoint from "@src/Shared/apiEndPoint";
import ProfileIcon from "@assets/media/svgs/patient-db-svgs/profile-btn-icon.svg";

const AdminProfileDetail = () => {
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  // const [selectedImage, setSelectedImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // only File or null
  const [profileImage, setProfileImage] = useState<string | null>(null); // backend image URL

  // State to hold user profile data
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await apiServices.get(apiEndpoint.me);
      if (response.data.success) {
        const userData = response.data.payload;
        setUserId(userData.id);
        setName(userData.full_name || "");
        setRole(userData.role_type || "");
        setPhone(userData.number || "");
        setEmail(userData.email || "");
        setOrganization(userData.organization_name || "");
        setState(userData.state || "");
        setCity(userData.city || "");
        setProfileImage(userData.image || null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) setSelectedImage(file);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
    if (!userId) return toast.error("User ID not found");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("number", phone);
      formData.append("organization_name", organization);
      formData.append("state", state);
      formData.append("city", city);

      if (selectedImage instanceof File) {
        formData.append("image", selectedImage); // ✅ only File
      }

      const response = await apiServices.update(
        formData,
        apiEndpoint.updateUser(userId)
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        fetchUserProfile(); // refresh backend image
        setSelectedImage(null); // reset local file
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[508px]">
          <div className="flex items-center flex-wrap gap-5 justify-between mb-9">
            <div className="flex items-center gap-3">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage) // preview selected file
                    : profileImage
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${profileImage}` // backend image
                    : dummyImage // fallback
                }
                alt={name || "User"}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <div className="font-bold space-grotesk mb-1 text-[#252525] text-xl leading-tight">
                  {name ? (
                    name
                  ) : (
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            {/* <label
              className="border-1 cursor-pointer border-[#25252533] w-[159px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
              htmlFor="upload"
            >
              Change Photo
            </label> */}
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedImage(file);
                }
              }}
            />
          </div>

          <h4 className="text-xl space-grotesk font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>

          <form>
            <div className="flex flex-wrap items-center gap-x-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1  ">
                  <InputField
                    label="Name:"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    fieldName="w-[100%]"
                    icon={RxPerson}
                    placeholder="Admin"
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="Speciality/Role:"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    id="text"
                    name="text"
                    type="text"
                    fieldName="w-[100%]"
                    iconUrl={inputUser}
                    placeholder="Admin"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                  <InputField
                    label="Phone:"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="tel"
                    name="tel"
                    className="pr-8"
                    type="number"
                    fieldName="w-[100%]"
                    icon={FiPhone}
                    placeholder="097-765-7654"
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="Email:"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    fieldName="w-[100%]"
                    icon={RiMailOpenLine}
                    placeholder="admin@organization.com"
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <PrimaryButton
              btnText={loading ? "Saving..." : "Save Changes"}
              onClick={handleSaveChanges}
              disabled={loading}
              showImg={false}
              btnClass="w-[150px] h-[46px] mt-9 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
            />
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </>
  );
};

export default AdminProfileDetail;
