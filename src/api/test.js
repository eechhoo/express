import request from '@/utils/request'

// request({
//     method:'get',
//     url:"/data.json"
// }).then(response=>{
//     console.log(response.data);
// })

export default{
    getList(){
       return request({
            method:'get',
            url:"/data.json"
        })
    }
}