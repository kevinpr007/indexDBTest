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
}())
