import { useParams } from "react-router-dom";
import UserInfo from "./useiInfo";
import { useEffect, useState } from "react";
import { apiServices } from "@src/shared/apiservices";

const UserInfoWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await apiServices.get(`user/${id}`);
      if (res.data.success) {
        setUserData(res.data.payload);
      } else {
        alert("Failed to fetch user details.");
      }
    } catch (error) {
      alert("Error fetching user details");
    }
  };
  useEffect(() => {

    if (id) fetchUser();
  }, [id]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <UserInfo fetchUser={fetchUser} userData={userData} goBack={() => window.history.back()} />;
    </div>
  );
};

export default UserInfoWrapper;
