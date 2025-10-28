import { useParams } from "react-router-dom";
import UserInfo from "./userinfo";
import { useEffect, useState } from "react";
import { apiServices } from "@src/shared/apiservices";

const UserInfoWrapperCareProvider: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const res = await apiServices.get(`user/${id}`);
      if (res.data.success) {
        setUserData(res.data.payload); 
      } else {
      }
    } catch (error) {
    }
  };
  useEffect(() => {

    if (id) fetchUser();
  }, [id]);

  if (!userData) return <p>Loading...</p>;

  return <UserInfo fetchUser={fetchUser} userData={userData} goBack={() => window.history.back()} />;
};

export default UserInfoWrapperCareProvider;
