/**
 * 打开/创建数据库
 * @param {string} dbName 数据库名称
 * @param {number} version 数据库版本
 * @returns 
 */
function openDB(dbName, version = 1) {
  return new Promise((resolve, reject) => {
    let db; // 存储数据库对象
    //打开数据库，如果没有就是创建操作
    const request = indexedDB.open(dbName, version);
    //数据库打开或者创建的时候
    request.onsuccess = function (event) {
      db = event.target.result;
      console.log("数据库打开成功");
      resolve(db);
    };
    //打开失败
    request.onerror = function (event) {
      console.log("数据库打开失败");
    };
    //数据库发生更新的时候
    //1.版本号更新 2.添加或者删除了表（对象仓库）的时候
    //当我们第一次调用open方法时，会触发这个事件
    request.onupgradeneeded = function (event) {
      console.log("数据库需要更新");
      db = event.target.result;
      //创建一个对象仓库（表），用于存储数据
      let objectStore = db.createObjectStore("stu", {
        keyPath: "stuId",//主键
        autoIncrement: true//自增
      });
      //创建索引,有了索引之后，查询速度大大增快
      objectStore.createIndex("stuId", "stuId", { unique: true });
      objectStore.createIndex("stuName", "stuName", { unique: false });
      objectStore.createIndex("stuAge", "stuAge", { unique: false });
    };
  }); 
}
/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
function closeDB(db) {
    db.close();
    console.log('数据库已关闭');
}
/**
 * 删除数据库
 * @param {string} dbName 数据库名称
 */
function deleteDB(dbName) {
    console.log(dbName);
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
      console.log("删除数据库失败");
    }
    deleteRequest.onsuccess = function (event) {
      console.log("数据库删除成功");
    }
    
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @param {*} data 数据
 */
function addData(db, storeName, data) {
    const request = db.transaction([storeName], "readwrite")//事物   
    .objectStore(storeName)//获取仓库
    .add(data);//添加数据
    request.onsuccess = function (event) {
      console.log("数据添加成功");
    }
    request.onerror = function (event) {
      console.log("数据添加失败");
    }
}
/**
 * 通过主键来读取数据
 * @param {object} db 数据库实例
 * @param {*} storeName 数据仓库名称
 * @param {*} key 主键
 */
function getDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], "readonly")
        .objectStore(storeName)
        .get(key)

        request.onsuccess = function (event) {
            resolve(request.result);
        }
        request.onerror = function (event) {
            console.log('数据查询失败');
            
        }
    })
}
/**
 * 获取全部数据
 * @param {object} db 数据库实例
 * @param {*} storeName 数据仓库名称
 * @returns 
 */
function getAllData(db, storeName) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], "readonly")
        .objectStore(storeName)
        .getAll()
        request.onsuccess = function (event) {
            resolve(request.result);
        }
        request.onerror = function (event) {
            console.log('数据查询失败');
        }
    })
}