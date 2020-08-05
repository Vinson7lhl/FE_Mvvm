// 加载Axios库
import axios from 'axios'
// 引入Element UI [loading]
import { Loading } from 'element-ui';


// get 请求
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

// post 请求

// put 请求

// delete 请求