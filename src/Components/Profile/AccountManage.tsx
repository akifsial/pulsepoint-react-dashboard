import ManagePasswordPage from "@pages/ProfilePage/ManagePasswordPage";
import ProfileDetailPage from "@pages/ProfilePage/ProfileDetailPage";
import React, { useState } from "react";

const AccountManage = () => {
  const [openBackFeed, setOpenBackFeed] = useState(false);

  return (
    <>
      {openBackFeed ? (
        <ManagePasswordPage setOpenBackFeed={setOpenBackFeed} />
      ) : (
        <ProfileDetailPage setOpenBackFeed={setOpenBackFeed} />
      )}
    </>
  );
};

export default AccountManage;
