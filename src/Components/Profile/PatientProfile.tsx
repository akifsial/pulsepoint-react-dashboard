import { useState } from "react";
import Model from "@components/Model/Model";
import ChangePhoto from "./ChangePhoto";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import userProfile from "../../assets/media/svgs/dashboard-svgs/profile1.svg"
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";

const organizationOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
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

const PatientProfile = ({ onChangePassword }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div>
        <div className="overflow-y-auto rounded-[10px] bg-white p-10 h-[601px]">
          <div className="flex items-center justify-between mb-9">
            <div className="flex items-center gap-3">
              <img src={userProfile} alt="Methew" />
              <div>
                <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                  Methew Thompson
                </h4>
                <span className="text-base font-medium text-[#181D27]/50 leading-tight">
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
                label="Full Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="Methew Thompson"
              />
              <InputField
                label="Email Address:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="methew@gmail.com"
              />
              <InputField
                label="Phone Number"
                id="tel"
                name="tel"
                type="tel"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="+1***********"
              />
              <InputField
                label="Age"
                id="age"
                name="age"
                type="age"
                fieldName="w-[32%]"
                iconUrl={""}
                placeholder="89"
              />
               <SelectField
                label="Gender"
                id="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                options={organizationOptions}
                selectName="w-[32%]"
              />
            </div>


            <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3 mt-1">
             Add Location
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
              
              <InputField
                label="Zip Code:"
                id="zip"
                name="zip"
                type="text"
                placeholder="78701"
                fieldName="w-[32%]"
              />
              <SelectField
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cityOptions}
                selectName="w-[32%]"
              />
            </div>

            <InputField
              label="Street Address:"
              id="address"
              name="text"
              type="text"
              placeholder="2301 Guadalupe Street"
            />

            <PrimaryButton
              btnText="Save Changes"
              showImg={false}
              btnClass="w-[25%] h-[46px] mt-7 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
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

export default PatientProfile;
