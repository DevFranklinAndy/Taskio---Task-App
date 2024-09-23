import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const apiURL: string = "https://taskio-api-build.onrender.com/api/taskio";
const customId: string = "custom-id";

export const createTaskioAccountAPI = async (data: any) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection");
  } else {
    return await axios
      .post(`${apiURL}/create-account`, data)
      .then((res: any) => {
        toast.success(res?.data?.message, {
          toastId: customId,
        });
        return res?.data?.message;
      })
      .catch((err: any) => {
        toast.error(err?.message, {
          toastId: customId,
        });
      });
  }
};

export const verifyTaskioAccountAPI = async (token: string) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection");
  } else {
    return await axios
      .get(`${apiURL}/${token}/verify-account`)
      .then((res: AxiosResponse<any, any>) => {
        toast.success("You are now a verified Taskion", {
          toastId: customId,
        });
        return res?.data?.message;
      });
  }
};

export const signIntoTaskioAccountAPI = async (data: any) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .post(`${apiURL}/sign-in-account`, data)
      .then((res: AxiosResponse<any, any>) => {
        toast.success(res.data.message, {
          toastId: customId,
        });
        return res?.data;
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error(err?.response?.data?.message, {
            toastId: customId,
          });
        } else if (err?.response?.status === 404) {
          toast.error(err?.response?.data?.message, {
            toastId: customId,
          });
        } else if (err?.response?.status === 401) {
          toast.error(err?.response?.data?.message, {
            toastId: customId,
          });
        } else if (err?.response?.status === 500) {
          toast.error("Check your Internet connection", {
            toastId: customId,
          });
        } else {
          toast.error(err?.message, {
            toastId: customId,
          });
        }
      });
  }
};

export const viewOneTaskioAccountAPI = async (_id: string) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .get(`${apiURL}/${_id}/view-one-taskio-account`)
      .then((res: AxiosResponse<any, any>) => {
        return res?.data?.data;
      })
      .catch((err: any) => {
        if (err?.response?.status === 500) {
          toast.error("Check your Internet connection", {
            toastId: customId,
          });
        } else {
          toast.error(err?.message, {
            toastId: customId,
          });
        }
      });
  }
};

export const viewAllTaskioAccountAPI = async () => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .get(`${apiURL}/view-all-account`)
      .then((res: AxiosResponse<any, any>) => {
        console.log(res);
      })
      .catch((err: any) => {
        if (err?.response?.status === 500) {
          toast.error("Check your Internet connection", {
            toastId: customId,
          });
        } else {
          toast.error(err?.message, {
            toastId: customId,
          });
        }
      });
  }
};
