;(function () {
  const DB_Table = config.DB_Table

  let db

  let event = new $.eventEmitter()

  indexDb.connect(event, DB_Table)

  event.on('connected', function (database) {
    db = database[0]

    indexDb.readAll(db, DB_Table, function (result) {
      let data = utils.convertDataToDataTable(result)
      renderTable(data)
    })
  })

  function renderTable (data) {
    $('#MainTable').DataTable({
      retrieve: true,
      data: data,
      columns: [
        { 'title': 'ID' },
        { 'title': 'Member Coverage Type' },
        { 'title': 'Member Last Names' },
        { 'title': 'Member Name' },
        { 'title': 'Member Number' },
        { 'title': 'Admission Type' },
        { 'title': 'Admiting Last Names' },
        { 'title': 'Admiting Name' },
        { 'title': 'Provider' }
      ]
    })
  }

  $('#syncAll').on('click', function () {

    // TODO: Add this feature
    alert('Your local data was uploaded to the server.')
  })
}())
