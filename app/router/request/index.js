const { baseUrl, mockUrl }  = require('../api')
const axios = require('axios')
const request = new Request()

function Request(params){
    //get
    this.get = function(params){
      return requestNext(
        axios({
          ...params,
          method:'GET',
          url:params.url.includes("mock") ? mockUrl + params.url.substr(4) : baseUrl + params.url
        })
      )
    }
    //post
   this.post = function(params){
     return requestNext(
       axios({
         ...params,
         method:'POST',
         url:params.url.includes("mock") ? mockUrl + params.url.substr(4) : baseUrl + params.url
       })
     )
   }
}
const requestNext = promise => {
  return new Promise((resolve, reject) => {
    promise.then(data => {
      resolve(data);
    }).catch(err => {
      console.log(err)
      const errmsg = err.response.data.message || err.toString()
      const name = err.response.data.name || ''
      reject({ errmsg, name })
    })
  })
}
module.exports = request
