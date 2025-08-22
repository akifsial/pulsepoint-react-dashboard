// import { useMeApi } from "@src/hooks/useUsers";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const TokenHandler = () => {
//   const navigate = useNavigate();
//   const {data}=useMeApi()

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       // Save token
//       localStorage.setItem("token", token);

//       // ⚡️ Optionally fetch user info from backend using the token
//       // const user = await fetchUserWithToken(token);
//       // localStorage.setItem("userInfo", JSON.stringify(user));

//       // Clean URL (remove ?token=...)
//       navigate("/patient/dashboard", { replace: true });
//     }
//   }, [navigate]);

//   return null;
// };




import { useMeApi } from "@src/hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TokenHandler = () => {
  const navigate = useNavigate();
  
  // Call useMeApi but enable only if token exists
  // const { data: user, isSuccess, refetch, isFetching } = useMeApi(undefined, {
  //   enabled: false, // we will manually trigger after token is saved
  // });

  const token=localStorage.getItem("token")

  const { data:user,isSuccess,refetch,isFetching, isLoading, error } = useMeApi({
  enabled: !!token, // ⬅️ only run if token exists
});

const queryClient=useQueryClient()

  useEffect(() => {
    const handleToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        // 1️⃣ Save token
        localStorage.setItem("token", tokenFromUrl);

        // 2️⃣ Clean URL (remove ?token=xxx)
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());

        // 3️⃣ Refetch user with the new token
        try {
          await refetch(); // ✅ waits until user is fetched
        } catch (err) {
          console.error("Refetch failed", err);
        }
      }
    };

    handleToken();
  }, [refetch]);


  // 3️⃣ When user info is fetched successfully, store it and redirect
  useEffect(() => {
    if (isSuccess && user) {
      localStorage.setItem("userInfo", JSON.stringify(user));

      // Redirect based on role
      switch (user.role_type) {
        case "PATIENT":
          navigate("/patient/dashboard", { replace: true });
          break;
        case "CARE_PROVIDER":
          navigate("/care-provider", { replace: true });
          break;
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    }
  }, [isSuccess, user]);

  // Optional: show loading while fetching
  if (isFetching) return <div>Loading...</div>;

  return null;
};
