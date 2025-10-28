
import { useState, useEffect } from "react";

import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import InputField from "@src/Components/adminInputfield/admininputfield";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
import { RxPerson } from "react-icons/rx";
import { RiMailOpenLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { ToastContainer, toast } from "react-toastify";
import { apiServices } from "@src/shared/apiservices";
import apiEndpoint from "@src/shared/apiendpoint";
import ProfileIcon from "@assets/media/svgs/patient-db-svgs/profile-btn-icon.svg";

const AdminProfileDetail = () => {
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); 
  const [profileImage, setProfileImage] = useState<string | null>(null); 

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
    }
  };
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

      if (selectedImage) {
        formData.append("image", selectedImage); 
      }

      const response = await apiServices.update(
        formData,
        apiEndpoint.updateUser(userId)
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        fetchUserProfile(); 
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (err) {
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
                    ? URL.createObjectURL(selectedImage) 
                    : profileImage
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${profileImage}` 
                    : dummyImage 
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

            <label
              className="border-1 cursor-pointer border-[#25252533] w-[159px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
              htmlFor="upload"
            >
              Change Photo
            </label>
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
