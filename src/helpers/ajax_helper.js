// import Vue from "vue"
// const myAxios = new Vue().$axios;
// console.log("ajax helper init myAxios");
import {myAxios} from "@/main.js";

export function doGet(url,xHost,onResult,onErr) {
    myAxios({
        url,
        headers: {
            "X-Client-Info":'{"a":"3000","ch":"1002","v":"5.0.4","e":"16336136842197940923793409","bc":"110100"}',
            "X-Host": xHost,
        },
    })
        .then((res) => {
            console.log("ajaxhelper data=", res.data);
            onResult(res.data)
        })
        .catch((err) => {
            if(!onErr){
                console.log("ajaxhelper err=", err);
            }else{
                onErr(err)
            }
        });
}
