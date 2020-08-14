$(document).ready(function() {

  LoadDashboard();

  function LoadDashboard() {
    let studentlist = RequestData("SELECT * FROM tbstudents_info", "COUNT"),
      sectionlist = RequestData("SELECT * FROM tbsection", "COUNT"),
      teacherlist = RequestData("SELECT * FROM tbadviser", "COUNT"),
      specializationlist = RequestData("SELECT * FROM tbsection", "COUNT"),
      roomlist = RequestData("SELECT * FROM tbadviser", "COUNT");

    $('#lblstudentlist').text(studentlist);
    $('#lblsectionlist').text(sectionlist);
    $('#lblteacherlist').text(teacherlist);
    $('#lblspecializationlist').text(specializationlist);
    $('#lblroomlist').text(roomlist);
  }

  function RequestData(query, method) {
    let dataReturned;

    $.ajax({
      url: "../php/modules/handler.php",
      type: "POST",
      async: false,
      data: {
        approval: "approved",
        query: query,
        method: method
      },
      dataType: "JSON",
      success: function(dataReceived) {
        dataReturned = dataReceived;
      }
    })
    return dataReturned;
  }

})
