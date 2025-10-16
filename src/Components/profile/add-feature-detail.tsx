import { useState } from "react";
import Model from "@components/model/model";
import ChangePhoto from "./change-photo";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import InputField from "@components/input-field";
// import SelectField from "@components/SelectField";

// import Methew from "../../assets/media/svgs/dashboard-svgs/methew.svg";
import inputUser from "../../assets/media/svgs/dashboard-svgs/inputuser.svg";
import Call from "../../assets/media/svgs/dashboard-svgs/call.svg";
import Sms from "../../assets/media/svgs/dashboard-svgs/sms.svg";
// import Global from "../../assets/media/svgs/dashboard-svgs/globalField.svg";
import circle from "@assets/media/svgs/addcircle.svg"
import { LuSave } from "react-icons/lu";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbNotes } from "react-icons/tb";




const organizationOptions = [
  { value: "Hospital", label: "Hospital" },
  { value: "Private", label: "Private" },
  { value: "Government", label: "Government" },
  { value: "Other", label: "Other" },
];

const stateOptions = [
  { value: "California", label: "California" },          // USA – Tech & Hollywood hub
  { value: "New York", label: "New York" },              // USA – NYC is world-famous
  { value: "Texas", label: "Texas" },                    // USA – Known for size, oil, culture
  { value: "Florida", label: "Florida" },                // USA – Famous for tourism & Miami
  { value: "Bavaria", label: "Bavaria" },                // Germany – Munich & BMW
  { value: "Île-de-France", label: "Île-de-France" },    // France – Includes Paris
  { value: "Dubai", label: "Dubai" },                    // UAE – Luxury and architecture
  { value: "Tokyo Prefecture", label: "Tokyo Prefecture" }, // Japan – Tokyo is iconic
  { value: "Ontario", label: "Ontario" },                // Canada – Includes Toronto
  { value: "Maharashtra", label: "Maharashtra" },        // India – Includes Mumbai
];


const cityOptions = [
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

const AddFeatureDetail = ({ onChangePassword }) => {
     const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div className="overflow-y-auto rounded-[10px] h-[601px]">
         <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold mb-1 text-[#252525] text-xl leading-tight">
                  Add Features
                </h4>
              </div>
            <PrimaryButton
              btnText="Add New Plan"
              showImg={true}
              img={circle}
              btnClass="border-1 border-[#25252533] w-[196px] h-[46px] bg-black !rounded-[10px] px-4 py-[10px] text-base text-[#ffffff] font-medium leading-[33px] gap-2 flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        <div className=" rounded-[10px] bg-white p-10 ">

          <h4 className="text-xl font-bold text-[#1A1A1A] font-[Space Grotesk] mb-3">
            Plan 1 details
          </h4>

          <form>
            <div className="flex flex-wrap items-center gap-x-4">
              <InputField
                label="Plan Name:"
                id="name"
                name="name"
                type="text"
                fieldName="w-[49%]"
                icon={LuSave}
                placeholder="Enter plan name"
              />
              <InputField
                label="Price:"
                id="number"
                name="number"
                type="number"
                fieldName="w-[49%]"
                icon={MdOutlinePriceChange}
                placeholder="Enter plan name"
              />
              <InputField
                label="Description:"
                id="text"
                name="text"
                type="text"
                fieldName="w-[100%]"
                icon={TbNotes}
                placeholder="Enter plan description"
              />
            </div>


            <PrimaryButton 
              btnText="Add Plan"
              showImg={false}
              btnClass="w-[30%] h-[46px] mt-3 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
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

export default AddFeatureDetail;


