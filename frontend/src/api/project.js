import axiosInstance from "./axios-instance";

export const saveProject = (project) => {
  if (project._id) {
    return axiosInstance
      .patch(`/projects/${project._id}`, project)
      .then((response) => response.data);
  }
  return axiosInstance
    .post("/projects", {
      title: project.title,
    })
    .then((response) => response.data);
};

export async function getProjects() {
  return axiosInstance
    .get("/projects")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function deleteProject(id) {
  return axiosInstance.delete(`/projects/${id}`);
}

export async function exportProject(id) {
  return axiosInstance.post(`/gists/export/${id}`, {}).then((res) => res.data);
}

// Mocked databased response

/*
export async function saveProject(project) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    _id: project._id
      ? project._id
      : String(Math.floor(Math.random() * 600) + 7),
    title: project.title,
    createdAt: "1991",
    creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
  };
}

export async function getProjects() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    {
      _id: "1",
      title: "project_1",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },

    {
      _id: "2",
      title: "project_2",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },

    {
      _id: "3",
      title: "project_3",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },

    {
      _id: "4",
      title: "project_4",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },

    {
      _id: "5",
      title: "project_5",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },
    {
      _id: "6",
      title: "project_6",
      createdAt: "1991",
      creator: { id: "602a9343a520593e94f6ec66", name: "Collins Uzebu" },
    },
  ];
}
*/
