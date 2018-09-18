import axios from "axios";

// "http://localhost:51595"

export function listTargetedJobFairsGet() {
  const url = "/api/jobfairs/targeted";

  return axios.get(url);
}

export function listCityCareerFairsGet() {
  const url = "/api/jobfairs/citycareer";

  return axios.get(url);
}

export function listAllJobFairsGet() {
  const url = "/api/jobfairs";

  return axios.get(url);
}
