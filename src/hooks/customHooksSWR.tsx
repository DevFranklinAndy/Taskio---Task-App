import useSWR from "swr";
import { viewOneTaskioAccountAPI } from "../api/authAPI";
import {
  viewAllCompletedTask,
  viewAllTaskInProgress,
  viewAllTaskionTask,
  viewStarredTaskControlAPI,
  viewTrashedTaskAPI,
} from "../api/taskAPI";

export const useViewOneTaskioAccount = (_id: string) => {
  const { data, isLoading } = useSWR(
    `/${_id}/view-one-taskio-account`,
    () => viewOneTaskioAccountAPI(_id),
    { refreshInterval: 1000 }
  );

  return { data, isLoading };
};

export const useViewAllTaskionTask = (_id: string) => {
  const { data, isLoading } = useSWR(
    `/${_id}/view-your-task`,
    () => viewAllTaskionTask(_id),
    { refreshInterval: 1000 }
  );

  return { data, isLoading };
};

export const useViewAllTaskInProgress = (_id: string) => {
  const { data, isLoading } = useSWR(
    `/${_id}/view-in-progress-task`,
    () => viewAllTaskInProgress(_id),
    {
      refreshInterval: 1000,
    }
  );

  return { data, isLoading };
};

export const useViewAllCompletedTask = (_id: string) => {
  const { data, isLoading } = useSWR(
    `/${_id}/view-completed-task`,
    () => viewAllCompletedTask(_id),
    {
      refreshInterval: 1000,
    }
  );

  return { data, isLoading };
};

export const useViewTrashedTask = (_id: string) => {
  const { data: trash, isLoading: loading } = useSWR(
    `/${_id}/view-trashed-task`,
    () => viewTrashedTaskAPI(_id),
    {
      refreshInterval: 500,
    }
  );

  return { trash, loading };
};

export const useViewStarredTaskControlAPI = (_id: string) => {
  const { data: starred, isLoading: fetching } = useSWR(
    `/${_id}/view-starred-task`,
    () => viewStarredTaskControlAPI(_id),
    {
      refreshInterval: 500,
    }
  );

  return { starred, fetching };
};
