import { useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import InputField from "@components/InputField";
import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
// import Call from "../../assets/media/svgs/dashboard-svgs/call.svg";
// import Sms from "../../assets/media/svgs/dashboard-svgs/sms.svg";
import { RxPerson } from "react-icons/rx";
import { RiMailOpenLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import share from "@assets/media/svgs/share.svg"
import profile from "@assets/media/svgs/profileimg.svg"





const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
  { value: "Other", label: "Other" },
];

const stateOptions = [
  { value: "Punjab", label: "Punjab" },
  { value: "Sindh", label: "Sindh" },
  { value: "Balochistan", label: "Balochistan" },
  { value: "KPK", label: "Khyber Pakhtunkhwa" },
];

const cityOptions = [
  { value: "Lahore", label: "Lahore" },
  { value: "Karachi", label: "Karachi" },
  { value: "Quetta", label: "Quetta" },
  { value: "Peshawar", label: "Peshawar" },
];

const AdminProfileDetail = ({ onChangePassword }) => {
     const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[508px]">
          <div className="flex items-center justify-between mb-9">
            <div className="flex items-center gap-3">
              <img src={profile} alt="Methew" />
              <div>
                <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                  Methew Thompson
                </h4>
              </div>
            </div>

            <PrimaryButton
              btnText="Change Profile  Picture"
              showImg={true}
              img={share}
              btnClass="border-1 border-[#25252533] w-[220px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>

          <form>
            <div className="flex flex-wrap items-center gap-x-4">
              <InputField
                label="Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[49%]"
                icon={RxPerson}
                placeholder="Admin"
              />
              <InputField
                label="Speciality/Role:"
                id="text"
                name="text"
                type="text"
                fieldName="w-[49%]"
                iconUrl={inputUser}
                placeholder="Admin"
              />
              
              <InputField
                label="Phone:"
                id="tel"
                name="tel"
                type="tel"
                fieldName="w-[49%]"
                icon={FiPhone}
                placeholder="097-765-7654"
              />
              <InputField
                label="Email:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[49%]"
                icon={RiMailOpenLine}
                placeholder="admin@organization.com"
              />
            </div>

           

            <PrimaryButton 
              btnText="Save Changes"
              showImg={false}
              btnClass="w-[30%] h-[46px] mt-9 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
            />
          </form>
        </div>
      </div>

      {isModalOpen && (
        <Model setIsOpen={setIsModalOpen} className="max-w-[488px]">
          <ChangePhoto />
        </Model>
      )}
    </>
  );
};

export default AdminProfileDetail;
