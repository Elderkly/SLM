import defaultData from "../assets/json/defaultData";
/**
 *  公用缓存写入类
*/
export default class Storage {
    /**
     * 缓存初始化
     * 判断是否存在缓存 如果不存在缓存的话就将defaultData内的数据写入缓存
     * @param null
     * @returns null
    */
    init(){
        try {
            const UserInfo = wx.getStorageSync('UserInfo')
            if (UserInfo) {
                // console.log('已经存在缓存',UserInfo)
            } else {
                console.log('初始化')
                const {calInfo,canteen,menu,schoolJson} = defaultData
                wx.setStorageSync('UserInfo', JSON.stringify(calInfo))
                wx.setStorageSync('CanTeen', JSON.stringify(canteen))
                wx.setStorageSync('Menu', JSON.stringify(menu))
                wx.setStorageSync('SchoolJson', JSON.stringify(schoolJson))
            }
        } catch (e) {
            console.error('initStorageError',e)
        }
    }
    /**
     * 根据key返回对应缓存
     * @param {String} key 
     * @returns {Object} value 
    */
    getStorage(key) {
        try{
            const _Storage = wx.getStorageSync(key)
            if (!!_Storage && JSON.parse(_Storage)) {
                return JSON.parse(_Storage)
            } else {
                return null
            }
        } catch(e) {
            console.error('getStorageError',key,e)
        }
    }
}