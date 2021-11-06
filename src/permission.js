import router from './router';
import {getUserInfo} from '@/api/login'
router.beforeEach((to,from,next) => {
    const token = localStorage.getItem("token");
    console.log(to.path);
    if(!token){
        if(to.path == "/login"){
            next()
        }else{
            next({path:'/login'})
        }
    }else{
        if(to.path === "/login"){
            next();
        }else{
            const userInfo = localStorage.getItem("uid");
            if(userInfo){
                next();
            }else{
                getUserInfo(token).then(response => {
                    const resp = response.data;
                    if(resp.flag){
                        localStorage.setItem("uid",JSON.stringify(resp.data))
                    }else{
                        next({path:'/login'})
                    }
                })
            }
        }
    }
})