import InputField from "@components/InputField";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import React, { useState } from "react";

const ManagePassword = () => {
  
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <>
      <h2 className="text-[25px] font-bold text-[#181D27] font-[Space Grotesk] mb-6">
        Password Details
      </h2>
      <div className=" rounded-[10px] bg-white p-10">
        <h4 className="font-bold text-[#252525] text-xl leading-tight mb-7">
          Update Password
        </h4>
        <form action="">
           <InputField
        label="Old Password"
        type="password"
        id="password1"
        placeholder="**********************"
        value={password}
        fieldName="w-[38%]"
        onChange={(e) => setPassword(e.target.value)}
        asterisk={false}
      />
      <InputField
        label="New Password"
        type="password"
        id="password2"
        placeholder="**********************"
        value={password1}
        fieldName="w-[38%]"
        onChange={(e) => setPassword1(e.target.value)}
        asterisk={false}
      />
       <InputField
        label="Confirm Password"
        type="password"
        id="password3"
        placeholder="**********************"
        value={password2}
        fieldName="w-[38%]"
        onChange={(e) => setPassword2(e.target.value)}
        asterisk={false}
      />
       <PrimaryButton 
                      btnText="Save Changes"
                            showImg={false}
                            btnClass="w-[22%] h-[46px] mt-6.5 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
                         />
        </form>
      </div>
    </>
  );
};

export default ManagePassword;
