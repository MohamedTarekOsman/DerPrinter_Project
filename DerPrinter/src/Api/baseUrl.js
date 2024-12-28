import axios from "axios";

//local
// const baseUrl= axios.create({baseURL:"https://der-printer-server.vercel.app"})

//prod
const baseUrl= axios.create({baseURL:"https://api.derprinter.softforte.site"})
export default baseUrl