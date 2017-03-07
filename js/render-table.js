;(function () {
  const DB_Table = 'Audit'
  let db

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

  let event = new $.eventEmitter()

  indexDb.connect(event, DB_Table)

  event.on('connected', function (database) {
    // indexDb.insert(database[0], DB_Table, tempData)
    // indexDb.readAll(database[0], DB_Table, renderTable)
    db = database[0]
  })

  function renderTable (data) {
    $('#MainTable').DataTable({
      retrieve: true,
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

  $('#syncAll').on('click', function() {
    indexDb.readAll(db, DB_Table, renderTable)
  })
}())
