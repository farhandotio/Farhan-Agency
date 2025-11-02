import axios from "axios";
import cookies from "js-cookie";


export const getUser = async () => {
  const token = cookies.get("token");

  if (!token) return null;

  try {
    const { data } = await axios.get("http://localhost:3000/api/auth/profile", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};


