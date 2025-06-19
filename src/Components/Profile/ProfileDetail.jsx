import { useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";

import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
import Call from "../../assets/media/svgs/dashboard-svgs/call.svg";
import Sms from "../../assets/media/svgs/dashboard-svgs/sms.svg";
import Global from "../../assets/media/svgs/dashboard-svgs/globalField.svg";

const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
  { value: "Other", label: "Other" },
];

const stateOptions = [
  { value: "United State", label: "United State" },
  { value: "Sindh", label: "Sindh" },
  { value: "Balochistan", label: "Balochistan" },
  { value: "KPK", label: "Khyber Pakhtunkhwa" },
];

const cityOptions = [
  { value: "Austin", label: "Austin" },
  { value: "Karachi", label: "Karachi" },
  { value: "Quetta", label: "Quetta" },
  { value: "Peshawar", label: "Peshawar" },
];

const ProfileDetail = ({ onChangePassword }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[601px]">
          <div className="flex items-center justify-between mb-9">
            <div className="flex items-center gap-3">
              <img src={Methew} alt="Methew" />
              <div>
                <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                  Methew Thompson
                </h4>
                <span className="text-base text-[#181D27]/50 leading-tight">
                  (Discharged Patient)
                </span>
              </div>
            </div>

            <PrimaryButton
              btnText="Change Photo"
              showImg={false}
              btnClass="border-1 border-[#25252533] w-[159px] h-[46px] bg-[#F3F3F3] !rounded-[10px] px-4 py-[10px] text-base text-[#252525] font-medium leading-[33px] gap-2 flex items-center justify-center"
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
                iconUrl={inputUser}
                placeholder="e.g., Sunrise Rehabilitation Center"
              />
              <SelectField
                label="Organization Type"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                options={organizationOptions}
                selectName="w-[49%]"
              />
              <InputField
                label="Phone:"
                id="tel"
                name="tel"
                type="tel"
                fieldName="w-[49%]"
                iconUrl={Call}
                placeholder="(123) 456-7890]"
              />
              <InputField
                label="Email:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[49%]"
                iconUrl={Sms}
                placeholder="contact@organization.org"
              />
            </div>

            <InputField
              label="Website:"
              id="website"
              name="web"
              type="text"
              iconUrl={Global}
              placeholder="https://www.topseniorspot.org"
              className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
            />

            <div className="mb-6 text-base font-medium text-black leading-[140%] tracking-[0%] font-[Geist]">
              <p className="mb-2.5">Additional Details:</p>
              <div className="text-sm font-normal text-[#252525] py-4 px-[15px] rounded-lg border border-[#2525251A] bg-[#FBFCFD]">
                <p>
                  Sunrise Hills Nursing Home is a full-service assisted living facility specializing in post-acute rehabilitation and long-term senior care. Our mission is to provide compassionate, person-centered services in a comfortable, home-like setting.Sunrise Hills Nursing Home is a full-service assisted living facility specializing in post-acute rehabilitation and long-term senior care. 
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
              Location Information
            </h4>

            <div className="flex items-center gap-4">
              <SelectField
                label="State"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                options={stateOptions}
                selectName="w-[32%]"
              />
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="w-[32%]"
              />
              <InputField
                label="Zip Code:"
                id="zip"
                name="zip"
                type="text"
                placeholder="78701"
                fieldName="w-[32%]"
              />
            </div>

            <InputField
              label="Address:"
              id="address"
              name="text"
              type="text"
              placeholder="123 main Street, Springfield, IL 62704"
            />

            <PrimaryButton
              btnText="Save Changes"
              showImg={false}
              btnClass="w-[25%] h-[46px] mt-9 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
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

export default ProfileDetail;
