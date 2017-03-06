;(function () {
  $.eventEmitter = function () {
    this._callbacks = {}

    this.on = function (names, callback) {
      var names = names.split(' '),
        l = names.length,
        i

      for (i = 0; i < l; i++) {
        if (!this._callbacks[names[i]]) {
          this._callbacks[names[i]] = $.Callbacks('once unique memory')
        }
        this._callbacks[names[i]].add(callback)
      }
    }

    this.off = function (names, callback) {
      var names = names.split(' '),
        l = names.length,
        i

      for (i = 0; i < l; i++) {
        if (this._callbacks[names[i]]) {
          this._callbacks[names[i]].remove(callback)
        }
      }
    }

    this.trigger = function (name) {
      if (!this._callbacks[name]) {
        this._callbacks[name] = $.Callbacks('once unique memory')
      }
      this._callbacks[name].fire(Array.prototype.slice.call(arguments, 1))
    }
  }


  // Object/Table
  const DB_Table = 'Audit'


  var Event = new $.eventEmitter()

  indexDB.connect(Event)

  Event.on('connected', function (database) {
    readAll(database)
  })

  function readAll (database) {
    var objectStore = database.transaction(DB_Table, 'readwrite').objectStore(DB_Table)
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

//   indexDB.readAll =

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
