import request from '@/utils/request.js'

export default{
    // 获取所有教师列表
    getList(){
        return request({
            url:'/goods/list',
            method:'get'
        })
    },
    search(page,size,searchMap){
        return request({
            url:'/goods/list',
            method:"post",
            data:{
                page,
                size,
                searchMap
            }
        })
    },
    // 新增教师
    add(teacher){
        return request({
            url:'/goods',
            method:'post',
            data:teacher
        })
    },
    // 根据id 查询教师
    getById(id){
        return request({
            url:`/goods?id=${id}`,
            method:'get'
        })
    },
    // 根据id修改教师信息
    update(teacher){
        return request({
            url:'/goods',
            method:'put',
            data:teacher
        })
    },
    deleteByExpressNumber(expressNumber){
        return request({
            url:'/goods',
            method:'delete',
            data:{
                expressNumber:expressNumber
            }
        })
    }
}