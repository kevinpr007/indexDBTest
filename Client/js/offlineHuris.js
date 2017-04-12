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

  let renderTable = (data) => {
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
        { 'title': 'Provider' },
        { 'title': 'Sync' }
      ]
    })

    $.each($('#MainTable a'), function (index, item) {
      $(this).on('click', function () {
        let id = $(this).data('id')
        indexDb.read(db, DB_Table, id, function (data) {
          syncCall(data, successCallback, errorCallback)
        })
      })
    })
  }

  function successCallback (data) {
    alert('success: ' + JSON.stringify(data))
    indexDb.delete(db, DB_Table, data.id)
    location.reload()
  }

  function errorCallback (xhr, textStatus, errorThrown) {
    console.log('error' + textStatus)
    alert('Error: ' + xhr.statusText + '. Status Code: ' + xhr.status)
  }

  let syncCall = (data, successCallback, errorCallback) => {
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
  }

  $('#syncAll').on('click', function () {
    $.each($('#MainTable a'), function (index, item) {
      let id = $(this).data('id')
      indexDb.read(db, DB_Table, id, function (data) {
        syncCall(data, function (data) {
          indexDb.delete(db, DB_Table, data.id)
        // TODO: Delete Rows
        }, errorCallback)
      })
    })
    // TODO: Delete Rows
    alert('Your local data was uploaded to the server.')
  })
}())
