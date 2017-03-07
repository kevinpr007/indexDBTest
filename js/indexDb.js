;(function () {
  this.indexDb = this.indexDb || {}
  var indexDb = this.indexDb

  var database
  const DB_NAME = 'HURIS_DB'
  var versionDB = 1

  indexDb.connect = function (event, dbTable) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
      let systemAlert = "Your browser doesn't support a stable version of IndexedDB."
      window.alert(systoemAlert)
      console.error(systemAlert)
    }

    var request = window.indexedDB.open(DB_NAME, versionDB)

    request.onerror = function (e) {
      console.error('error: ' + e.target.result)
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

  indexDb.insert = function (database, dtTable, data) {
    let request = database.transaction(dtTable, 'readwrite')
      .objectStore(dtTable)
      .add(data)

    request.onsuccess = function (e) {
      alert('Information successfully added to your local database.')
    }

    request.onerror = function (e) {
      alert('Unable to add data: ' + e.target.result)
    }
  }

  indexDb.readAll = function (database, dtTable, cb) {
    let transaction = database.transaction(dtTable, 'readwrite')
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
  }
}())
