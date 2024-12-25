import axios from "axios";

//local
// const baseUrl= axios.create({baseURL:"https://der-printer-server.vercel.app"})

//prod
const baseUrl= axios.create({baseURL:"https://der-printer-server.vercel.app"})
export default baseUrl