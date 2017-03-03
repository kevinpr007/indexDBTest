;(function () {
  this.indexDB = this.indexDB || {}
  var indexDB = this.indexDB

  // Database
  const DB_NAME = 'HURIS_DB'
  var versionDB = 1

  // Object/Table
  const DB_Table = 'Audit'

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

  indexDB.read = function read (id) {
    var transaction = database.transaction([DB_Table])
    var objectStore = transaction.objectStore(DB_Table)
    var request = objectStore.get(id)

    request.onerror = function (e) {
      let error = 'Unable to retrieve data from database!'
      alert(error)
      console.error = error
    }

    request.onsuccess = function (e) {
      // Do something with the request.result!
      let result = request.result
      if (result) {
        alert(result)
      }else {
        alert("Record couldn't be found in your database!")
      }
    }
  }

  indexDB.readAll = function readAll () {
    var objectStore = database.transaction(DB_Table).objectStore(DB_Table)
    var objectResult = []

    objectStore.openCursor().onsuccess = function (e) {
      var cursor = e.target.result

      if (cursor) {
        objectResult.push(cursor.value)
        cursor.continue()
      } else {
        // TODO
        // alert('No more entries!')
      }
    }
    console.log(objectResult)
    return objectResult
  }

  indexDB.add = function add (obj) {
    var request = database.transaction([DB_Table], 'readwrite')
      .objectStore(DB_Table)
      .add(obj)

    request.onsuccess = function (e) {
      alert('Information successfully added to your database.')
    }

    request.onerror = function (e) {
      alert('Unable to add data: ' + e.target.result)
    }
  }

  indexDB.remove = function remove (id) {
    var request = database.transaction([DB_Table], 'readwrite')
      .objectStore(DB_Table)
      .delete(id)

    request.onsuccess = function (e) {
      alert('Information has been removed from your database.')
    }
  }
}())
