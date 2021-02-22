import axios from "axios";
import axiosInstance from "./axios-instance";
import { BACKEND_SERVER } from "../config";

export const getTodos = (projectId) => {
  return axiosInstance.get(`/todos/${projectId}`).then((response) => {
    return response.data;
  });
};

export const saveTodo = async (projectId, todo) => {
  let URL = todo._id ? `/todos/${todo._id}` : "/todos";

  if (todo._id) {
    return axiosInstance
      .patch(URL, { ...todo, project: projectId })
      .then((response) => response.data)
      .catch((err) => console.log(err));
  }
  return axiosInstance
    .post(URL, { ...todo, project: projectId })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export async function deleteTodo(projectId, todo) {
  return axiosInstance.delete(`/todos/${todo._id}`);
}

/*
export async function getTodos() {
  return [
    {
      _id: "1",
      title: "todo_1",
      description: "extremely long text",
      project: "project_1",
      status: "pending",
      createdAt: "1991",
    },

    {
      _id: "2",
      title: "todo_2",
      description: "extremely long text",
      project: "project_1",
      status: "pending",
      createdAt: "1991",
    },
    {
      _id: "3",
      title: "todo_3",
      description: "extremely long text",
      project: "project_1",
      status: "completed",
      createdAt: "1991",
    },
    {
      _id: "4",
      title: "todo_4",
      description: "extremely long text",
      project: "project_1",
      status: "completed",
      createdAt: "1991",
    },
  ];
}

export async function saveTodod(projectId, todo) {
  return {
    ...todo,
    _id: todo._id ? todo._id : String(Math.floor(Math.random() * 600) + 7),
    status: todo.status || "pending",
    createdAt: todo.createdAt ? todo.createdAt : "2020",
    project: projectId,
  };
}
*/
