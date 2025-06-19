import { useState } from "react";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import downarrow from "../../assets/media/svgs/dashboard-svgs/GreenDown.svg"
import greenarrow from "@assets/media/svgs/dashboard-svgs/greendown.svg"
import RatingStars  from "@components/Shared-components/RatingStars";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import Methew from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import { GoPerson } from "react-icons/go";
import leftarrow from "@assets/media/svgs/leftarrow.svg"
// import { IoCallOutline } from "react-icons/io5";
// import { IoMailOutline } from "react-icons/io5";
// import { CiGlobe } from "react-icons/ci";
 
const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
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
 
const EditDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
 
  return (
    <>
      <div>
         <div className="flex items-baseline gap-2">
        <img src={leftarrow} alt="" />
        <h2 className=" text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-6">
         Edit Care Provider Details
        </h2>
      </div>
 
        <div className="rounded-[10px] bg-white p-10 pb-0  mb-4">
          <div className="overflow-y-auto h-[628px]">
       
          <div className=" flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <img src={Methew} alt="Methew" className="rounded-[50%]"/>
                <div className="flex items-center">
                          <RatingStars value="5" isDisabled={true} />
                          <p className="text-[16px] text-[#252525]">5.0</p>
                        </div>
              <div className="">
               <div className="border border-[#067647] rounded-[30px] flex items-center justify-center gap-2.5 py-[5px] px-3">
                <span className="font-medium text-[14px] text-[#067647]">Active</span>
                <img src={greenarrow} alt="downarrow" className="h-2.5 w-2.5" />
              </div>
              </div>
            </div>
 
            <PrimaryButton
              btnText="Suspend Access"
              showImg={false}
              img=""
              imgClass="w-[19px] h-[19px] object-cover"
              imgPosition="left"
              btnClass="border-1 border-[#25252533] w-[159px] h-[46px] bg-[#FFE6E6] !rounded-[10px] px-4 py-[10px] text-base text-[#C22E00] font-medium leading-[33px] gap-2 flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
 
          <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Add Personal Information
          </h4>
 
          <div className="pb-4 mb-3 border-b-2 border-dashed border-[#252525]/30">
            <form>
            <div className="flex flex-wrap items-center gap-x-4">
              <InputField
                label="Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[49%]"
                icon={GoPerson}
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
                placeholder="097-765-7654"
              />
 
              <InputField
                label="Email:"
                id="email"
                name="email"
                type="email"
                fieldName="w-[49%]"
                placeholder="contact@organization.org"
              />
            </div>
 
            <InputField
              label="Website:"
              id="website"
              name="web"
              type="text"
              placeholder="https://www.topseniorspot.org"
              onChange={(e) => setWebsite(e.target.value)}
              fieldName="w-full"
            />
 
            <div className="mb-6 text-base font-medium text-black leading-[140%] tracking-[0%] font-[Geist]">
              <p className="mb-2.5">Additional Details:</p>
              <div className="text-sm font-normal text-[#252525] py-4 px-[15px] rounded-lg border border-[#2525251A] bg-[#FBFCFD]">
                <p>
                  Sunrise Hills Nursing Home is a full-service assisted living facility specializing in post-acute rehabilitation and long-term senior care. Our mission is to provide compassionate, person-centered services in a comfortable, home-like setting.Sunrise Hills Nursing Home is a full-service assisted living facility specializing in post-acute rehabilitation and long-term senior care.
                </p>
              </div>
            </div>
 
            {/* Location Info */}
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
              id="addres"
              name="text"
              type="text"
              placeholder="123 main Street,Springfield,1L 62704"
       
            />
           
          </form>
          </div>
        </div>
        </div>
      </div>
 
    </>
  );
};
 
export default EditDetails;