$(document).ready(function () {
  // Initialize Tabs
  $('#tabs').tab()

  // Initialize datepicker
  var date_input = $('.Date-Picker')
  var container = 'body'
  var options = {
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true
  }
  
  date_input.datepicker(options)
})
