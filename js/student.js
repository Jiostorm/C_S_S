$(document).ready(function() {
  // Students();
  // LoadSection();
  var studentfil = "",
    sql = "";
  Students();
  //GetNewNumber();

  $(document).on("keyup input", "#search", function() {
    sql = "SELECT * FROM tbstudents_info WHERE First_Name LIKE '%" + $('#search').val() + "%' OR Last_Name LIKE '%" + $('#search').val() + "%'"
    Students();
  })

  function Students() {
    studentfil = $('#search').val();
    if (studentfil == "") {
      sql = "select * from tbstudents_info"
      LoadSection();
    }
    var students_list = GeneralCallAjax(sql, "GET_ALL_RECORD")

    var s = '<table class="table table-hover table-borderless table-sm" id="table_students" style="font-size:90%"> <thead class = "thead-dark"> '

    s = s + '<tr class="text-center"><th> LRN </th>'
    s = s + '<th> FIRST NAME </th>'
    s = s + '<th> MIDDLE NAME </th>'
    s = s + '<th> LAST NAME </th>'
    s = s + '<th> AGE </th>'
    s = s + '<th> GENDER </th>'
    s = s + '<th> BARANGAY </th>'
    s = s + '<th> MUNICIPALITY </th>'
    s = s + '<th> PROVINCE </th>'
    s = s + '<th> SECTION </th>'
    s = s + '<th> <button type="button" class="btn btn-outline-success btn-sm" id="btnadd"> <i class="fa fa-plus"></i> ADD <i class="fa fa-plus"></i> </button></th></tr>'

    $("#mytable").empty();

    for (var x = 0; x < students_list.length; x++) {

      var btnEditdel = '<a ><button type="button" id="btnfont" class= "btn btn-outline-primary btn-sm btnedit"> <i class ="fa fa-pen"></i> </button></a><a><button type="button" id="btnfont" class= "btn btn-outline-danger btn-sm btndel"> <i class ="fa fa-trash"> </i></button></a> '

      s = s + '<tr class="text-center bg-dark">'
      s = s + '<td>' + students_list[x]['Student_LRN'] + '</td>'
      s = s + '<td>' + students_list[x]['First_Name'] + '</td>'
      s = s + '<td>' + students_list[x]['Middle_Name'] + '</td>'
      s = s + '<td>' + students_list[x]['Last_Name'] + '</td>'
      s = s + '<td>' + students_list[x]['Age'] + '</td>'
      s = s + '<td>' + students_list[x]['Gender'] + '</td>'
      s = s + '<td>' + students_list[x]['Barangay'] + '</td>'
      s = s + '<td>' + students_list[x]['Municipality'] + '</td>'
      s = s + '<td>' + students_list[x]['Province'] + '</td>'
      s = s + '<td>' + students_list[x]['Section'] + '</td>'
      s = s + '<td class = "text-center" >' + btnEditdel + '</td>'
      s = s + '</tr>'
    }

    $("#mytable").append(s);
  }

  function GeneralCallAjax(sql, operation) {
    var mymsg;

    $.ajax({
      type: "POST",
      url: "../php/modules/operation.php",
      async: false,
      data: {
        sql: sql,
        operation: operation,
      },
      success: function(msg) {
        mymsg = msg;

      },
      dataType: 'json',
      error: function(xhr, ajaxOptions, thrownError) {
        alert(sql + " " + xhr.responseText);
        alert(thrownError);
      }

    });
    return mymsg;
  }

  function VerifyComboBox($p) {
    if ($p.val() == null) {
      $p.tooltip('enable');
      $p.tooltip('show');

      var delayInMilliseconds = 1000; //1 second
      setTimeout(function() {
        $p.tooltip('hide');
        $p.tooltip('disable');
      }, delayInMilliseconds);
      $p.focus();
      return false;
    } else
      return true;
  }

  function VerifyTextBox($p) {
    if ($p.val() == "") {
      $p.tooltip('enable');
      $p.tooltip('show');

      var delayInMilliseconds = 1000; //1 second
      setTimeout(function() {
        $p.tooltip('hide');
        $p.tooltip('disable');
      }, delayInMilliseconds);
      $p.focus();
      return false;
    } else
      return true;
  }

  function TextBox($p) {
    var sql = "select  Section_Name from tbsection"

    if ($p.val() == sql) {
      $p.tooltip('enable');
      $p.tooltip('show');

      var delayInMilliseconds = 1000; //1 second
      setTimeout(function() {
        $p.tooltip('hide');
        $p.tooltip('disable');
      }, delayInMilliseconds);
      $p.focus();
      return false;
    } else
      return true;
  }

  function LoadSection() {
    var sql = "select  * from tbsection"
    var section_list = GeneralCallAjax(sql, "GET_ALL_RECORD")
    $('#section').append("<option selected='selected'>" + "Select Section" + "</option>")
    for (var x = 0; x < section_list.length; x++) {
      $('#section').append("<option value=" + section_list[x]['Section_Name'] + ">" + section_list[x]['Section_Name'] + "</option>")

    }
  }

  $(document).on("keyup input", "#txtstudent", function() {

    $("#student_list").empty();
    let sql = "SELECT * FROM tbsection",
      dataOption = "";

    students = GeneralCallAjax(sql, "GET_ALL_RECORD");

    for (let i = 0; i < students.length; i++) {
      dataOption += "<option value='" + students[i]['Section_Name'] + "'></option>"
    }

    $("#student_list").append(dataOption);

  })

  $(document).on("click", ".btnedit", function() {

    var i = $(this).closest('tr').index();
    var table = document.getElementById('table_students');
    var studentlrn = table.rows[i].cells[0].innerHTML;
    var firstname = table.rows[i].cells[1].innerHTML;
    var middlename = table.rows[i].cells[2].innerHTML;
    var lastname = table.rows[i].cells[3].innerHTML;
    var age = table.rows[i].cells[4].innerHTML;
    var gender = table.rows[i].cells[5].innerHTML;
    var Barangay = table.rows[i].cells[6].innerHTML;
    var Municipality = table.rows[i].cells[7].innerHTML;
    var Province = table.rows[i].cells[8].innerHTML;
    var section = table.rows[i].cells[9].innerHTML;

    $('#idLRN').val(studentlrn)
    $('#idfname').val(firstname)
    $('#idmname').val(middlename)
    $('#idlname').val(lastname)
    $('#idage').val(age)
    $("#idgender option:contains(" + gender + ")").attr("selected", true);
    $('#idbr').val(Barangay)
    $('#idmun').val(Municipality)
    $('#idpr').val(Province)
    $('#txtstudent').val(section)
    //$("#txtstudent option:contains(" + section + ")").attr("selected", true);
    $('#idLRN').attr('disabled', true);
    $('#btn_save').attr('name', "EDIT");

    $('#mymodal').modal('show');

  })

  $(document).on("click", ".btndel", function() {

    $('#modal_confirm_delete').modal('show');

    var i = $(this).closest('tr').index();

    var table = document.getElementById('table_students');
    var studentlrnn = table.rows[i].cells[0].innerHTML;
    var fname = table.rows[i].cells[1].innerHTML;
    var lname = table.rows[i].cells[3].innerHTML;
    $('#delete_data').text("Do you want to delete data of " + fname + " " + lname + " with the LRN of " + studentlrnn + "?");
    $('#delete_data').attr('name', studentlrnn);
  })

  $(document).on("click", "#btnadd", function() {
    $('#idLRN').attr('disabled', false);
    $('#btn_save').attr('name', "ADD");
    $('#idLRN').val('');
    $('#idfname').val('');
    $('#idmname').val('');
    $('#idlname').val('');
    $('#idage').val('');
    $('#idgender').val('Select Gender');
    $('#idbr').val('');
    $('#idmun').val('');
    $('#idpr').val('');
    $('#txtstudent').val('');
    //$('#idLRN').val( GetNewNumber());
    $('#mymodal').modal('show');
  })
  $(document).on("click", "#close", function() {

    $('#idLRN').val('');
    $('#idfname').val('');
    $('#idmname').val('');
    $('#idlname').val('');
    $('#idage').val('');
    $('#idgender').val('');
    $('#idbr').val('');
    $('#idmun').val('');
    $('#idpr').val('');
    $('#txtstudent').val('');

  })

  $(document).on("click", "#btnYes", function() {
    var studentno = $('#delete_data').attr('name');
    sql = "delete from tbstudents_info "
    sql = sql + "where Student_LRN='" + studentno + "'"

    GeneralCallAjax(sql, "DELETE_RECORD")
    Students();
    $('#modal_confirm_delete').modal('hide');

  })
  $(document).on("click", "#btnNo", function() {

    $('#modal_confirm_delete').modal('hide')

  })

  $(document).on("click", "#btn_save", function _btn_save() {

    if (VerifyTextBox($('#idLRN')) == false)
      return;
    else if (VerifyTextBox($('#idfname')) == false)
      return;
    else if (VerifyTextBox($('#idmname')) == false)
      return;
    else if (VerifyTextBox($('#idlname')) == false)
      return;
    else if (VerifyTextBox($('#idage')) == false)
      return;
    else if (VerifyComboBox($('#idgender')) == false)
      return;
    else if (VerifyTextBox($('#idbr')) == false)
      return;
    else if (VerifyTextBox($('#idmun')) == false)
      return;
    else if (VerifyTextBox($('#idpr')) == false)
      return;
    else if (TextBox($('#txtstudent')) == false)
      return;
    var mode = $('#btn_save').attr('name');
    if (mode == "ADD") {
      var studentno = $('#idLRN').val()
      if (CheckPrimaryKey(studentno) == false) {
        $('#idLRN').css('background-color', 'red')
        return;
      }
      sql = "insert into tbstudents_info values ("
      sql = sql + "'" + $('#idLRN').val() + "',"
      sql = sql + "'" + $('#idfname').val() + "',"
      sql = sql + "'" + $('#idmname').val() + "',"
      sql = sql + "'" + $('#idlname').val() + "',"
      sql = sql + "'" + $('#idage').val() + "',"
      sql = sql + "'" + $('#idgender').val() + "',"
      sql = sql + "'" + $('#idbr').val() + "',"
      sql = sql + "'" + $('#idmun').val() + "',"
      sql = sql + "'" + $('#idpr').val() + "',"
      sql = sql + "'" + $('#txtstudent').val() + "')"
      GeneralCallAjax(sql, "ADD_RECORD")

      sql = "INSERT INTO tbassigned VALUES ('" + GetNewNumber() + "', '" + $('#idLRN').val() + "', '" + $('#txtstudent').val() + "', '2018 - 2019', 'Enrolled')";
      GeneralCallAjax(sql, "ADD_RECORD");
      // Students();
      // $('#mymodal').modal('hide');
    } else {
      sql = "update tbstudents_info set  "
      sql = sql + " First_Name='" + $('#idfname').val() + "',"
      sql = sql + " Middle_Name='" + $('#idmname').val() + "',"
      sql = sql + " Last_Name='" + $('#idlname').val() + "',"
      sql = sql + " Age='" + $('#idage').val() + "',"
      sql = sql + " Gender='" + $('#idgender').val() + "',"
      sql = sql + " Barangay='" + $('#idbr').val() + "',"
      sql = sql + " Municipality='" + $('#idmun').val() + "',"
      sql = sql + " Province='" + $('#idpr').val() + "',"
      sql = sql + " section='" + $('#txtstudent').val() + "'"
      sql = sql + " where Student_LRN='" + $('#idLRN').val() + "'"
      GeneralCallAjax(sql, "EDIT_RECORD")

      sql = "UPDATE tbassigned SET Section_Name = '" + $('#txtstudent').val() + "' WHERE Student_LRN = '" + $('#idLRN').val() + "'";
      GeneralCallAjax(sql, "EDIT_RECORD");

      alert("SUCCESSFULLY UPDATED");
      Students();
      $('#mymodal').modal('hide');
    }

    document.location.reload(true)
  })

  function CheckPrimaryKey(studentno) {
    var sql = "select * from tbstudents_info where Student_LRN= '" + studentno + "'"
    alert(sql)
    var i = GeneralCallAjax(sql, "COUNT_RECORD");
    alert(i)
    if (i == 0) {
      return true
    } else
      return false;
  }

  function GetNewNumber() {
    var num = 0;
    var sql = "SELECT * FROM tbassigned ORDER BY Assigned_ID DESC";
    var list = GeneralCallAjax(sql, "GET_ALL_RECORD")

    if (list.length == 0) {
      return "AS-" + zeroPad(1, 7)
    } else {
      var last_record = list[0]['Assigned_ID']
      var num = last_record.slice(-7);
      var newnumber = "AS-" + zeroPad(parseInt(num) + 1, 7);
      return newnumber;
    }
  }

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
})
