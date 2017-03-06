;(function () {
  this.indexDB = this.indexDB || {}
  var indexDB = this.indexDB

  
  // Database
  const DB_NAME = 'HURIS_DB'

  
  var versionDB = 1

  indexDB.connect = function (event) {


    // prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

    // prefixes of window.IDB objects
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
    }

    request.onsuccess = function (e) {
      database = request.result
      event.trigger('connected', database)
    }

    request.onupgradeneeded = function (e) {
      var database = e.target.result

      // Delete the old datastore.
      if (database.objectStoreNames.contains(DB_Table)) {
        database.deleteObjectStore(DB_Table)
      }

      // Create a new datastore.
      var store = database.createObjectStore(DB_Table, {
        keyPath: 'id'
      })
    }

    // Close the db when the transaction is done
    request.oncomplete = function () {
      database.close()
    }
  }
}())
