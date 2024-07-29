import { Axios } from "axios"; 

const axios = new Axios({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
      },
})

export default axios;