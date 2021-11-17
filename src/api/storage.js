import request from '@/utils/request.js'

export default{
    // 获取所有列表
    getList(){
        return request({
            url:'/storage/list',
            method:'get'
        })
    },
    // search(page,size,searchMap){
    //     return request({
    //         url:'/storage/list',
    //         method:"post",
    //         data:{
    //             page,
    //             size,
    //             searchMap
    //         }
    //     })
    // },
    // 新增教师
    add(teacher){
        return request({
            url:'/storage',
            method:'post',
            data:teacher
        })
    },
    // 根据id 查询教师
    getById(id){
        return request({
            url:`/storage?id=${id}`,
            method:'get'
        })
    },
    // 根据id修改教师信息
    update(teacher){
        return request({
            url:'/storage',
            method:'put',
            data:teacher
        })
    },
    deleteById(id){
        return request({
            url:'/storage',
            method:'delete',
            data:{
                id:id
            }
        })
    }
}