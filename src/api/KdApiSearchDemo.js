const axios = require('axios')
const md5Hex = require('md5-hex');
const querystring = require('querystring')



/**
 * @技术QQ群: 可登录官网https://www.kdniao.com/右侧查看技术群号
 * @see: https://kdniao.com/api-track
 * @copyright: 深圳市快金数据技术服务有限公司
 * ID和Key请到官网申请：https://kdniao.com/reg



 * 即时查询接口
 * 此接口用于向快递公司实时查询物流轨迹信息。该功能支持情况需查看技术文档。
 * 正式地址：https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx
 *
 *
 * 系统级参数
 * RequestData	   String	R	请求内容为JSON格式 详情可参考接口技术文档：https://www.kdniao.com/documents
 * EBusinessID	   String	R	用户ID
 * RequestType	   String	R	请求接口指令
 * DataSign	       String	R	数据内容签名，加密方法为：把(请求内容(未编码)+ApiKey)进行MD5加密--32位小写，然后Base64编码，最后进行URL(utf-8)编码
 * DataType	       String	R	DataType=2，请求、返回数据类型均为JSON格式


 * 应用级参数
 * R-必填（Required），O-可选（Optional），C-报文中该参数在一定条件下可选（Conditional）
 * OrderCode	  String(30)	O	订单编号
 * ShipperCode	  String(10)	R	快递公司编码  详细编码参考《快递鸟接口支持快递公司编码.xlsx》 https://www.kdniao.com/documents
 * LogisticCode	  String(30)	R	快递单号
 * CustomerName	  String(50)	C	ShipperCode为SF时必填，对应寄件人/收件人手机号后四位；ShipperCode为其他快递时，可不填或保留字段，不可传值

 * 请求示例
 * ZTO请求示例：
 * {
 * "OrderCode": "",
 * "ShipperCode": "ZTO",
 * "LogisticCode": "638650888018",
 * }
 *
 * JD请求示例：
 * {
 * "OrderCode": "",
 * "CustomerName": "",
 * "ShipperCode": "JD",
 * "LogisticCode": "JDVA00003618100",
 * }
 *
 * SF请求示例：
 * {
 * "OrderCode": "",
 * "CustomerName": "1234",
 * "ShipperCode": "SF",
 * "LogisticCode": "SF00003618100",
 * }
 */





//请求url --正式地址
const Url = 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx'
//用户ID，快递鸟提供，注意保管，不要泄漏
const EBusinessID = '1237100';//即用户ID，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx 
//API key，快递鸟提供，注意保管，不要泄漏
const ApiKey = '56da2cf8-c8a2-44b2-b6fa-476cd7d1ba17';//即API key，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx


post(Url,getParams()).then(res=>{
    console.log(res.data)
})
//以form表单形式提交post请求，post请求体中包含了应用级参数和系统级参数

function getParams(){
    //请求接口指令
    const RequestType  = '1002';//免费即时查询接口指令1002/在途监控即时查询接口指令8001/地图版即时查询接口指令8003
    // 组装应用级参数
    const RequestData = {
    'CustomerName': '',
    'OrderCode': '',
    'ShipperCode': 'YTO',
    'LogisticCode': 'YT00003618100',
    };
    const DataSign = Buffer.from(md5Hex(JSON.stringify(RequestData)+ApiKey)).toString('base64')
    const reqParams = {
        RequestType,
        EBusinessID,
        DataSign,
        RequestData:JSON.stringify(RequestData),
        DataType:2
    }
    return reqParams
}// 组装系统级参数

async function post(url,data){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const res = await axios.post(url,querystring.stringify(data))
    return res
}



