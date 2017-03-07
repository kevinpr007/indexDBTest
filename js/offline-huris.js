;(function () {
  this.indexDb = this.indexDb || {}
  var indexDb = this.indexDb

  indexDb.insert = function (database, dtTable, data) {
    let objectStore = database.transaction(dtTable, 'readwrite').objectStore(dtTable)
    for (var i in data) {
      objectStore.add(data[i])
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

    transaction.oncomplete = function() {
      cb(objectResult)
    }

  }
}())
