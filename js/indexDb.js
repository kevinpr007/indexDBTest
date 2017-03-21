;(function () {
  this.indexDb = this.indexDb || {}
  var indexDb = this.indexDb

  const DB_NAME = config.localDBName
  var versionDB = config.versionDB

  indexDb.connect = function (event, dbTable) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
      let systemAlert = "Your browser doesn't support a stable version of IndexedDB."
      window.alert(systoemAlert)
      console.error(systemAlert)
    }

    var database
    var request = window.indexedDB.open(DB_NAME, versionDB)

    request.onerror = function (e) {
      console.error('error: ' + e.target.result)
      alert('error: ' + e.target.result)
    }

    request.onsuccess = function (e) {
      database = request.result
      event.trigger('connected', database)
    }

    request.onupgradeneeded = function (e) {
      var database = e.target.result

      if (database.objectStoreNames.contains(dbTable)) {
        database.deleteObjectStore(dbTable)
      }

      var store = database.createObjectStore(dbTable, {
        keyPath: 'id'
      })
    }

    request.oncomplete = function () {
      database.close()
    }
  }

  indexDb.insert = function (db, dtTable, data) {
    let request = db.transaction(dtTable, 'readwrite')
      .objectStore(dtTable)
      .add(data)

    request.onsuccess = function (e) {
      alert('Information successfully added to your local database.')
    }

    request.onerror = function (e) {
      console.error('Unable to add data: ' + e.target.result)
      alert('Unable to add data: ' + e.target.result)
    }
  }

  indexDb.read = function (db, dtTable, id, cb) {
    let transaction = db.transaction(dtTable)
    let objectStore = transaction.objectStore(dtTable)
    let request = objectStore.get(id)

    request.onerror = function (e) {
      console.error('error: ' + e.target.result)
      alert('error: ' + e.target.result)
    }

    request.onsuccess = function (e) {
      cb(request.result)
    }
  }

  indexDb.readAll = function (db, dtTable, cb) {
    let transaction = db.transaction(dtTable, 'readwrite')
    let objectStore = transaction.objectStore(dtTable)
    let objectResult = []

    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result

      if (cursor) {
        objectResult.push(cursor.value)
        cursor.continue()
      }
    }

    transaction.oncomplete = function () {
      cb(objectResult)
    }

    transaction.onerror = function (e) {
      console.error('error: ' + e.target.result)
      alert('error: ' + e.target.result)
    }
  }
}())
