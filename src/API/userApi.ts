import axios from "axios";

const URL = "https://techhack-be.onrender.com";

export const createAccount = async (data: any) => {
  try {
    const config: any = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return await axios
      .post(`${URL}/api/user/create-user`, data, config)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};
export const logIn = async (data: any) => {
  try {
    return await axios
      .post(`${URL}/api/user/login-user`, data)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const verifyAccount = async (userID: string, otp: string) => {
  try {
    return await axios
      .post(`${URL}/api/user/verify-account/${userID}`, { otp })
      .then((res: any) => {
        return res.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const readUser = async (userID: string) => {
  try {
    return await axios
      .get(`${URL}/api/user/get-user/${userID}`)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};
