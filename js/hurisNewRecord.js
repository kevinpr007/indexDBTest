;(function () {
  const DB_Table = 'Audit'

  let db

  let event = new $.eventEmitter()
  indexDb.connect(event, DB_Table)

  event.on('connected', function (database) {
    db = database[0]
  })

  $('#test').click(function () {
    function successCallback (data) {
      console.log('success: ' + data.body)
    }

    function errorCallback (xhr, textStatus, errorThrown) {
      console.log('error')
    }

    // utils.myAjaxCallExample('GET', 'https://jsonplaceholder.typicode.com/posts/1', {}, successCallback, errorCallback)

    let newRecord = {
      id: utils.getUUID(),
      patientInfo: {
        memberNumber: $('#memberNumber').val(),
        memberName: $('#memberName').val(),
        memberLastNames: $('#memberLastNames').val(),
        memberCoverageType: $('#memberCoverageType').val()
      },
      providerInfo: {
        providerId: $('#provider').val(),
        admitingName: $('#admitingPhysicianName').val(),
        admitingLastNames: $('#admitingPhysicianLastName').val(),
        admissionType: $('#admissionType').val()
      }
    }

    indexDb.insert(db, DB_Table, newRecord)
    window.location.href = './offlineHuris.html'
  })
}())
