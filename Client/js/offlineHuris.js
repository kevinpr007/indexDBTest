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
    indexDb.read(db, DB_Table, 'c7709984-e900-494e-3b66-622773b1ca09', function (data) {
      console.log(JSON.stringify(data))
      $.ajax({
        type: 'POST',
        url: 'http://localhost:33052/api/StagingCRs/StagingCR_DTO',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: successCallback,
        error: errorCallback
      })

      function successCallback (data) {
        alert('success: ' + JSON.stringify(data))
      }

      function errorCallback (xhr, textStatus, errorThrown) {
        console.log('error' + errorThrown)
      }
    })

    // TODO: Add this feature
    alert('Your local data was uploaded to the server.')
  })
}())
