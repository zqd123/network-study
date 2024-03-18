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
        keyPath: "stuId", //主键
        autoIncrement: true, //自增
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
  console.log("数据库已关闭");
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
  };
  deleteRequest.onsuccess = function (event) {
    console.log("数据库删除成功");
  };
}

/**
 * 通过主键来读取数据（精确查询）
 * @param {object} db 数据库实例
 * @param {*} storeName 数据仓库名称
 * @param {*} key 主键
 */
function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], "readonly")
      .objectStore(storeName)
      .get(key);

    request.onsuccess = function (event) {
      resolve(request.result);
    };
    request.onerror = function (event) {
      console.log("数据查询失败");
    };
  });
}

/**
 * 通过索引来读取数据（精确查询-命中的第一条数据）
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @param {string} indexName 索引名称
 * @param {any} key 索引对应的值
 * @returns
 */
function getDataByIndex(db, storeName, indexName, key) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], "readonly")
      .objectStore(storeName)
      .index(indexName)
      .get(key);

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
}
/**
 * 通过索引和指针获取匹配数据（精确查询-所有命中的数据）
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库实例
 * @param {string} indexName 索引名称
 * @param {any} key 关键字
 * @returns 
 */
function getDataByIndexRange(db, storeName, indexName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);
    const request = index.openCursor(IDBKeyRange.only(key));
    const data = [];
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        resolve(data);
      }
    };
  });
}

/**
 * 根据游标指针获取数据（全部数据）
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @returns
 */
function getDataByCursor(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly"); //事务
    const objectStore = transaction.objectStore(storeName); //仓库
    const request = objectStore.openCursor(); //游标
    const data = []; //所有数据
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        resolve(data);
      }
    };
  });
}

/**
 * 获取全部数据
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @returns
 */
function getAllData(db, storeName) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], "readonly")
      .objectStore(storeName)
      .getAll();
    request.onsuccess = function (event) {
      resolve(request.result);
    };
    request.onerror = function (event) {
      console.log("数据查询失败");
    };
  });
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @param {*} data 数据
 */
function addData(db, storeName, data) {
  const request = db
    .transaction([storeName], "readwrite") //事务
    .objectStore(storeName) //获取对象仓库
    .add(data); //添加数据
  request.onsuccess = function (event) {
    console.log("数据添加成功");
  };
  request.onerror = function (event) {
    console.log("数据添加失败");
  };
}
/**
 * 数据更新（根据主键更新某条数据）
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库名称
 * @param {*} data 数据
 */
function upData(db, storeName, data) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.put(data);
  request.onsuccess = function (event) {
    console.log("数据更新成功");
  }
  request.onerror = function (event) {
    console.log("数据更新失败");
  }
}