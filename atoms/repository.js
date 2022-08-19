import { atom } from "recoil";

export const repoName = atom({
  key: "repositoryName",
  default: "evozon-summer-2022-internship",
});

export const gitUser = atom({
  key: "gitUsername",
  default: null,
});

export const repoInfo = atom({
  key: "repositoryInformation",
  default: null,
});

export const repoContent = atom({
  key: "repoContent",
  default: null,
});

export const axiosHeaders = atom({
  key: "axiosHeaders",
  default: null,
});

export const limitAPI = atom({
  key: "LimitAPI",
  default: false,
});
