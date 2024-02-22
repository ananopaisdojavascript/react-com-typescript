import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
})

const read = async(url: string) => {
  const { data } = await axiosInstance.get(url)
  return data
}

export default {
  read
}