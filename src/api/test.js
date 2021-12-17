import axios from "axios";

async function getNews(){
    const resp=await axios.get("/commercial_api/banners_v3/home_up?");
    console.log(resp);
}
getNews()
