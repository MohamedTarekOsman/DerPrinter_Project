import axios from "axios";

//local
const baseUrl= axios.create({baseURL:"https://api.derprinter.softforte.site"})

//prod
// const baseUrl = axios.create({ baseURL: "http://localhost:9000" });
export default baseUrl;
