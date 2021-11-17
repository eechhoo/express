import request from '@/utils/request.js'

export default{
    // 新增订单
    add(order){
        return request({
            url:'/order',
            method:'post',
            data:order
        })
    },
    // 获取所有教师列表
    getOrderList(){
        return request({
            url:'/order/list',
            method:'get'
        })
    },
    search(page,size,searchMap){
        return request({
            url:'/order/list',
            method:"post",
            data:{
                page,
                size,
                searchMap
            }
        })
    },
    // 新增教师
    addOrder(order){
        return request({
            url:'/order',
            method:'post',
            data:order
        })
    },
    // 根据id 查询教师
    getById(id){
        return request({
            url:`/order?id=${id}`,
            method:'get'
        })
    },
    // 根据id修改教师信息
    update(order){
        return request({
            url:'/order',
            method:'put',
            data:order
        })
    },
    deleteById(id){
        return request({
            url:'/order',
            method:'delete',
            data:{
                id:id
            }
        })
    }
}