// import axios from "axios";



// export const ApiGetCategories = async (id) => {
//   const BASE_URL = `${import.meta.env.VITE_APP_API_URL}category/`;
//   // const token = JSON.parse(localStorage.getItem("token"));
//   const token: string | null = JSON.parse(
//     localStorage.getItem("token") || "null"
//   );

//   const response = await axios.get(BASE_URL, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data.payload;
// };