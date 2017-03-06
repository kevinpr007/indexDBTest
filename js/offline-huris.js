;(function () {
  this.indexDb = this.indexDb || {}
  var indexDb = this.indexDb

  let tempData = [
    {
      id: '0339b2bc-6ce9-451d-22dd-58a71df5c2ea',
      memberCoverageType: 'CLASSICARE',
      lastNames: 'Del Pueblo',
      memberName: 'Juan',
      memberNumber: '1234',
      admissionType: 'EMERGENCY',
      admitingLastNames: 'Admiting Last Names',
      admitingPhysicianName: 'Admiting Physician Name',
      provider: '0123456789 - Hospital Example 1'
    }
  ]

  const DB_Table = 'Audit'
  indexDb.Event = new $.eventEmitter()

  indexDb.insert = function (database, dtTable) {
    let objectStore = database.transaction(dtTable, 'readwrite').objectStore(dtTable)
    for (var i in tempData) {
      objectStore.add(tempData[i])
    }
  }

  indexDb.readAll = function (database, dtTable, cb) {
    let objectStore = database.transaction(dtTable, 'readwrite').objectStore(dtTable)
    let objectResult = []

    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result

      if (cursor) {
        objectResult.push(cursor.value)
        cursor.continue()
      } else {
        // TODO
        // alert('No more entries!')
      }
      cb(objectResult)
    }
  }
}())
