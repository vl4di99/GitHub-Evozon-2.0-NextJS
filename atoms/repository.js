import { atom } from "recoil";

export const repoName = atom({
  key: "repositoryName",
  default: "evozon-summer-2022-internship",
});

export const gitUser = atom({
  key: "gitUsername",
  default: "vl4di99",
});
