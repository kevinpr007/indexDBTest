;(function () {
  const DB_Table = 'Audit'
  var db

  indexDb.connect(indexDb.Event, DB_Table)

  indexDb.Event.on('connected', function (database) {
    //indexDb.insert(database[0], DB_Table)
    indexDb.readAll(database[0], DB_Table, renderTable)
  })

  function renderTable (data) {
    $('#MainTable').DataTable({
      data: data,
      columns: [
        { 'data': 'id', 'title': 'ID' },
        { 'data': 'memberCoverageType', 'title': 'Member Coverage Type' },
        { 'data': 'lastNames', 'title': 'Member Last Names' },
        { 'data': 'memberName', 'title': 'Member Name' },
        { 'data': 'memberNumber', 'title': 'Member Number' },
        { 'data': 'admissionType', 'title': 'Admission Type' },
        { 'data': 'admitingLastNames', 'title': 'Admiting Last Names' },
        { 'data': 'admitingPhysicianName', 'title': 'Admiting Name' },
        { 'data': 'provider', 'title': 'Provider' }
      ]
    })
  }
}())
