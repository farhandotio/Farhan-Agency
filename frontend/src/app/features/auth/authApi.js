import axios from "axios";

export const getUser = async () => {
  try {
    const { data } = await axios.get(
      "https://farhan-agency.onrender.com/api/auth/profile",
      {
        withCredentials: true,
      }
    );
    return data.user;
  } catch (error) {
    return null;
  }
};

// ---------------------- register function ----------------------

export const registerUser = async (payload) => {
  try {
    let body = payload;
    let config = {
      withCredentials: true,
    };

    if (!(payload instanceof FormData)) {
      const hasFile = payload?.picture instanceof File;
      if (hasFile) {
        const form = new FormData();
        if (payload.firstName !== undefined)
          form.append("fullname.firstName", payload.firstName);
        if (payload.lastName !== undefined)
          form.append("fullname.lastName", payload.lastName);
        if (payload.email !== undefined) form.append("email", payload.email);
        if (payload.password !== undefined)
          form.append("password", payload.password);
        form.append("picture", payload.picture);
        body = form;
      } else {
        body = payload;
      }
    }

    const url = "https://farhan-agency.onrender.com/api/auth/register";
    const { data } = await axios.post(url, body, config);

    return data.user;
  } catch (error) {
    const msg =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(msg);
  }
};

// ---------------------- login function ----------------------
export const loginUser = async (payload) => {
  try {
    let config = {
      withCredentials: true,
    };

    const url = "https://farhan-agency.onrender.com/api/auth/login";
    const { data } = await axios.post(url, payload, config);

    return data.user;
  } catch (error) {
    const msg =
      error.response?.data?.message || error.message || "Login failed";
    throw new Error(msg);
  }
};
