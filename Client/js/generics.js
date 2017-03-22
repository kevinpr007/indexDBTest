;(function () {
  this.utils = this.utils || {}
  let utils = this.utils

  // Generic Call Ajax Example
  utils.myAjaxCallExample = function (type, url, parameters, successCallback, errorCallback) {
    $.ajax({
      type: type,
      url: url,
      data: JSON.stringify(parameters),
      contentType: 'application/json;',
      dataType: 'json',
      success: successCallback,
      error: errorCallback
    })
  }

  // Generate GUID Example
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  // then to call it, plus stitch in '4' in the third group
  utils.getUUID = function () {
    let guid = (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase()
    return guid
  }

  // Convert data to be used in the DataTable's Plugin
  utils.convertDataToDataTable = function (data) {
    let newData = []

    data.forEach(function (element) {
      let newArrayObj = []

      newArrayObj.push(element.id)

      newArrayObj.push(element.patientInfo.memberCoverageType)
      newArrayObj.push(element.patientInfo.memberLastNames)
      newArrayObj.push(element.patientInfo.memberName)
      newArrayObj.push(element.patientInfo.memberNumber)

      newArrayObj.push(element.providerInfo.admissionType)
      newArrayObj.push(element.providerInfo.admitingLastNames)
      newArrayObj.push(element.providerInfo.admitingName)
      newArrayObj.push(element.providerInfo.providerId)

      newData.push(newArrayObj)
    })

    return newData
  }
}())
