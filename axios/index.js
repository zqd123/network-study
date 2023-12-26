 const control = new AbortController()
const signal = control.signal
 axios.get('https://mock.apifox.com/m1/3263409-0-default/heroList',{
    signal
 }).then(res=>{

     console.log("🚀 ~ file: index.js:2 ~ res:", res.data)
 })
control.abort()