import axios from "axios";
import { toast } from "react-toastify";

const customId: string = "custom-id";
const taskAPI: string = "https://taskio-api-build.onrender.com/api/taskio/task";

export const viewAllTaskionTask = async (_id: string) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .get(`${taskAPI}/${_id}/view-your-task`)
      .then((res) => {
        return res.data.data;
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

export const viewAllTaskInProgress = async (_id: string) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .get(`${taskAPI}/${_id}/view-in-progress-task`)
      .then((res: any) => {
        return res.data.data;
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

export const viewAllCompletedTask = async (_id: string) => {
  if (!navigator.onLine) {
    toast.info("No Internet Connection", {
      toastId: customId,
    });
  } else {
    return await axios
      .get(`${taskAPI}/${_id}/view-completed-task`)
      .then((res: any) => {
        return res.data.data;
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

export const createNewTaskAPI = async (_id: string, data: any) => {
  return await axios
    .post(`${taskAPI}/${_id}/create-your-task`, data)
    .then((res: any) => {
      return res;
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
};

export const moveToProgressAPI = async (_id: string, task_id: string) => {
  return await axios
    .patch(`${taskAPI}/${_id}/${task_id}/move-task-to-progress`)
    .then((res: any) => {
      return res;
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
};

export const moveToTrashAPI = async (_id: string, task_id: string) => {
  return await axios
    .patch(`${taskAPI}/${_id}/${task_id}/move-to-trash`)
    .then((res: any) => {
      return res;
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
};

export const moveTaskToCompletedAPI = async (_id: string, task_id: string) => {
  return await axios
    .patch(`${taskAPI}/${_id}/${task_id}/move-task-to-done`)
    .then((res: any) => {
      return res;
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
};

export const moveToAllTaskAPI = async (_id: string, task_id: string) => {
  return await axios
    .patch(`${taskAPI}/${_id}/${task_id}/move-to-all-task`)
    .then((res: any) => {
      return res;
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
};

export const viewTrashedTaskAPI = async (_id: string) => {
  return await axios
    .get(`${taskAPI}/${_id}/view-trashed-task`)
    .then((res: any) => {
      return res.data.data;
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
};

export const deleteTrashedTaskAPI = async (_id: string, task_id: string) => {
  return await axios
    .delete(`${taskAPI}/${_id}/${task_id}/delete-trashed-task`)
    .then((res: any) => {
      return res;
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
};

export const starredTaskControlAPI = async (_id: string, task_id: string) => {
  return await axios
    .patch(`${taskAPI}/${_id}/${task_id}/starred-task`)
    .then((res: any) => {
      return res;
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
};

export const viewStarredTaskControlAPI = async (_id: string) => {
  return await axios
    .get(`${taskAPI}/${_id}/view-starred-task`)
    .then((res: any) => {
      console.log(res.data.data);
      return res.data.data;
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
};
