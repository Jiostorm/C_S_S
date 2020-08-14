$(document).ready(function() {

  Table_tbadviser("", "VIEW");

  var teacherfil = "",
    sql = "";

  $(document).on("keyup input", "#search", function() {
    Table_tbadviser($(this).val(), "SEARCH");
  })

  function Table_tbadviser(search, action) {
    var sql, specialsql;
    if (action == "VIEW") {
      sql = "select * from tbadviser inner join tbspecialization on tbadviser.Specialization_ID = tbspecialization.Specialization_ID";
    } else {
      sql = "SELECT * FROM tbadviser inner join tbspecialization on tbadviser.Specialization_ID = tbspecialization.Specialization_ID WHERE Adviser_FN LIKE '%" + search + "%' OR Adviser_LN LIKE '%" + search + "%'"
    }

    specialsql = "select * from tbspecialization";

    var table_tbadviser = GeneralCallAjax(sql, "GET_ALL_RECORD"),
      table_tbspecial = GeneralCallAjax(specialsql, "GET_ALL_RECORD")


    var btnadd = '<button type="button" class="btn btn-outline-success" id="btnadd"><i class="fa fa-plus"></i> Add <i class="fa fa-plus"></i></button>'
    var s = '<table class="table table-borderless table-striped table-hover" id="table_tbadviser" style="table-layout:fixed;width:100%;"><thead class="thead-dark">'
    s = s + '<tr class="text-center"><th style="width:;text-align:center"> ID </th>'
    s = s + '<th> First Name </th>'
    s = s + '<th> Last Name </th>'
    s = s + '<th> Middle Initial</th>'
    s = s + '<th> Gender </th>'
    s = s + '<th> Specialization Name </th>'
    s = s + '<th id="btnadd">' + btnadd + '</th></tr></thead><tbody>'
    $("#mytable").empty();

    for (var x = 0; x < table_tbadviser.length; x++) {
      let dash = table_tbadviser[x]['Specialization_Name'] == "" ? "" : " - "
      var btnedit = '<button id="btnedit" type= "button" class="btnedit btn btn-outline-warning btn-sm"><i class="fa fa-pen"></i></button>'
      var btndelete = '<button id="btndelete" type= "button" class="btn btn-outline-danger btn-sm ml-2" value="' + table_tbadviser[x]['Adviser_ID'] + '"><i class="fa fa-trash"></i></button>'
      s = s + '<tr class="text-center bg-dark">'
      s = s + '<td>' + table_tbadviser[x]['Adviser_ID'] + '</td>'
      s = s + '<td>' + table_tbadviser[x]['Adviser_FN'] + '</td>'
      s = s + '<td>' + table_tbadviser[x]['Adviser_LN'] + '</td>'
      s = s + '<td>' + table_tbadviser[x]['Adviser_MI'] + '</td>'
      s = s + '<td>' + table_tbadviser[x]['Adviser_Gender'] + '</td>'
      s = s + '<td>' + table_tbadviser[x]['Track_Name'] + " - " + table_tbadviser[x]['Strand_Name'] + dash + table_tbadviser[x]['Specialization_Name'] + '</td>'
      s = s + '<td>' + btnedit + btndelete + '</td>'
      // s = s + '<td style="width:25%;text-align:left">' + btndelete +  '</td>'
      s = s + '</tr>'

    }
    s = s + '</tbody>'
    $("#mytable").append(s);

    $('#adviser_list').empty();
    let specialoption;
    for (let i = 0; i < table_tbspecial.length; i++) {
      let dash = table_tbspecial[i]['Specialization_Name'] == "" ? "" : " - ";
      specialoption += "<option data-value='" + table_tbspecial[i]['Specialization_ID'] + "' value='" + table_tbspecial[i]['Track_Name'] + " - " + table_tbspecial[i]['Strand_Name'] + dash + table_tbspecial[i]['Specialization_Name'] + "'></option>"
    }
    $('#adviser_list').append(specialoption);
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

  function VerifyInput($e) {
    if ($e.val() == "" || $e.val() == null) {
      $e.tooltip('show');
      $e.tooltip('enable');

      setTimeout(function() {
        $e.tooltip('hide');
        $e.tooltip('disable');
      }, 2000);
      $e.focus();
      return false;
    } else {
      return true;
    }
  }

  function GetNewNumber() {
    var num = 0;
    var sql = "SELECT * FROM tbadviser ORDER BY Adviser_ID DESC";
    var list = GeneralCallAjax(sql, "GET_ALL_RECORD")


    if (list.length == 0) {
      return "A-" + zeroPad(1, 4)
    } else {
      var last_record = list[0]['Adviser_ID']
      var num = last_record.slice(-4);
      var newnumber = "A-" + zeroPad(parseInt(num) + 1, 4);
      return newnumber;
    }
  }

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  $(document).on("click", "#btnyes", function() {
    let mode = $('#btnyes').attr('name');
    let id = $('#txtAdvisersID').val(),
      fn = $('#txtAdvisersFirstName').val(),
      ln = $('#txtAdvisersLastName').val(),
      mi = $('#txtAdvisersMiddleInitial').val(),
      gender = $('#cboGender').val(),
      spec = document.querySelector('#adviser_list option[value="' + $('#txtSpecialization').val() + '"]').dataset.value;

    if (!VerifyInput($('#txtAdvisersID')) || !VerifyInput($('#txtAdvisersFirstName')) || !VerifyInput($('#txtAdvisersLastName')) || !VerifyInput($('#txtAdvisersMiddleInitial')) || !VerifyInput($('#cboGender'))) {
      return;
    }
    alert(mode)
    if (mode == "ADD") {
      let sql = "Insert Into tbadviser VALUES ";
      sql += "('" + id + "', '" + fn + "', '" + ln + "','" + mi + "','" + gender + "', '" + spec + "')"
      GeneralCallAjax(sql, "ADD_RECORD");
    } else {
      let query = "UPDATE tbadviser SET Adviser_FN = '" + fn + "',";
      query += "Adviser_LN = '" + ln + "',";
      query += "Adviser_MI = '" + mi + "',";
      query += "Adviser_Gender = '" + gender + "',";
      query += "Specialization_ID = '" + spec + "'";
      query += " WHERE Adviser_ID = '" + id + "'";
      GeneralCallAjax(query, "EDIT_RECORD");
    }
    document.location.reload(true);
  })

  $(document).on("click", "#btnedit", function() {
    var i = $(this).closest('tr').index() + 1;
    var table = document.getElementById('table_tbadviser');
    var Adviser_ID = table.rows[i].cells[0].innerHTML;
    var Adviser_FN = table.rows[i].cells[1].innerHTML;
    var Adviser_LN = table.rows[i].cells[2].innerHTML;
    var Adviser_MI = table.rows[i].cells[3].innerHTML;
    var Adviser_Gender = table.rows[i].cells[4].innerHTML;
    var Specialization_Name = table.rows[i].cells[5].innerHTML;

    $('#txtAdvisersID').val(Adviser_ID)
    $('#txtAdvisersFirstName').val(Adviser_FN)
    $('#txtAdvisersLastName').val(Adviser_LN)
    $('#txtAdvisersMiddleInitial').val(Adviser_MI)
    $("#cboGender option:contains(" + Adviser_Gender + ")").attr("selected", true);
    //$("#cboSpecialization option:contains(" + Specialization_Name + ")").attr("selected", true);
    $("#txtSpecialization").val(Specialization_Name);

    $('#txtAdvisersID').attr('disabled', true);
    $('#btnyes').attr('name', "EDIT");
    $('#mymodal').modal('show');
  })

  $(document).on("click", "#btndelete", function() {
    let action = confirm("Do you want to delete " + $(this).val());
    if (!action) return false;

    let sql = "DELETE FROM tbadviser WHERE Adviser_ID = '" + $(this).val() + "'";

    GeneralCallAjax(sql, "DELETE_RECORD");
    document.location.reload(true);
  })

  $(document).on("click", "#btnadd", function() {
    $('#form_main')[0].reset();
    $('#txtAdvisersID').val(GetNewNumber());
    $('#btnyes').attr('name', "ADD");
    $('#mymodal').modal('show');
  })
})
