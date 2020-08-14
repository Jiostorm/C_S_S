$(document).ready(function() {
  Students();

  function Students() {
    var sql = "select * from tbspecialization"

    var students_list = GeneralCallAjax(sql, "GET_ALL_RECORD")

    var s = '<table class="table table-hover table-borderless table-sm" id="table_students"> <thead class = "thead-dark"> '
    s = s + '<tr class="text-center"><th> SPECIALIZATION ID </th>'
    s = s + '<th> TRACK </th>'
    s = s + '<th> STRAND </th>'
    s = s + '<th> SPECIALIZATION NAME </th>'
    s = s + '<th> <button type="button" class="btn btn-outline-success btn-sm" id="btnadd"> <i class="fa fa-plus"></i> ADD <i class="fa fa-plus"></i> </button> </th></tr>'

    $("#mytable").empty();

    for (var x = 0; x < students_list.length; x++) {

      var btnEditdel = '<button type="button" value="' + students_list[x]['Specialization_ID'] + '" class= "btnedit btn btn-outline-primary btn-sm"><i class="fa fa-pen"></i></button> <button type="button" value="' + students_list[x]['Specialization_ID'] + '" class="btn btn-outline-danger btn-sm btndel"><i class="fa fa-trash"></i></button>'

      s = s + '<tr class="text-center bg-dark">'
      s = s + '<td>' + students_list[x]['Specialization_ID'] + '</td>'
      s = s + '<td>' + students_list[x]['Track_Name'] + '</td>'
      s = s + '<td>' + students_list[x]['Strand_Name'] + '</td>'
      s = s + '<td>' + students_list[x]['Specialization_Name'] + '</td>'
      s = s + '<td>' + btnEditdel + '</td>'
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
        operation: operation
      },
      success: function(msg) {
        mymsg = msg;
      },
      dataType: 'JSON',
      error: function(xhr, ajaxOptions, thrownError) {
        alert(sql + " " + xhr.responseText);
        alert(thrownError);
      }

    });
    return mymsg;
  }

  $(document).on("click", ".btnedit", function() {
    var i = $(this).closest('tr').index();
    var table = document.getElementById('table_students');
    var Specialization_ID = table.rows[i].cells[0].innerHTML;
    var Track_Name = table.rows[i].cells[1].innerHTML;
    var Strand_Name = table.rows[i].cells[2].innerHTML;
    var Specialization_Name = table.rows[i].cells[3].innerHTML;

    $('#idspecID').val(Specialization_ID)
    $('#TRACK option:contains(' + Track_Name + ')').attr('selected', true)
    $('#STRAND option:contains(' + Strand_Name + ')').attr('selected', true)
    $('#SPECIALIZATION option:contains(' + Specialization_Name + ')').attr('selected', true)
    $('#idspecID').attr('disabled', true);
    $('#btn_save').attr('name', "EDIT");

    $('#mymodal').modal('show');
  })

  $(document).on("click", "#btn_save_edit", function btn_save() {

    sql = "update tbspecialization set  "
    sql = sql + "where Specialization_ID='" + Specialization_ID + "'"

    sql = sql + " Track_Name='" + $('#idtrack').val() + "',"
    sql = sql + " Strand_Name='" + $('#idstrand').val() + "',"
    sql = sql + " Specialization_Name='" + $('#idspecname').val() + "'"
    sql = sql + " where Specialization_ID='" + $('#idspecID').val() + "'"
    GeneralCallAjax(sql, "EDIT_RECORD")
    Students();
    $('#mymodal').modal('hide');

  })

  $(document).on("click", ".btndel", function() {
    let action = confirm("Do you want to delete this row?");
    if (!action) return false;

    let id = $(this).val();
    let sql = "DELETE FROM tbspecialization WHERE Specialization_ID = '" + id + "'";
    GeneralCallAjax(sql, "DELETE_RECORD");

    document.location.reload(true)
  })
  $(document).on("click", "#btnYes", function() {
    var studentno = $('#delete_data').attr('name');
    sql = "delete from tbspecialization "
    sql = sql + "where Specialization_ID'" + Specialization_ID + "'"

    GeneralCallAjax(sql, "DELETE_RECORD")
    Table_Student();
    $('#modal_confirm_delete').modal('hide')

  })

  $(document).on("click", "#btnadd", function() {
    $('#idspecID').val(GetNewNumber());
    $('#idtrack').val('');
    $('#idstrand').val('');
    $('#idspecname').val('');
    $('#mymodal').modal('show');
    $('#btn_save').attr('name', "ADD");
    $('#idspecID').attr('disabled', false);
  })
  $(document).on("click", "#close", function() {
    $('#idspecID').val('');
    $('#idtrack').val('');
    $('#idstrand').val('');
    $('#idspecname').val('');
  })

  function VerifyTextBox($p) {
    if ($p.val() == null) {
      $p.tooltip('enable');
      $p.tooltip('show');

      var delayInMilliSeconds = 1000; //1 second
      setTimeout(function() {
        $p.tooltip('hide');
        $p.tooltip('disable');
      }, delayInMilliSeconds);
      $p.focus();
      return false;
    } else
      return true;
  }

  function VerifyTextBox($p) {
    if ($p.val() == "") {
      $p.tooltip('enable');
      $p.tooltip('show');

      var delayInMilliSeconds = 1000; //1 second
      setTimeout(function() {
        $p.tooltip('hide');
        $p.tooltip('disable');
      }, delayInMilliSeconds);
      $p.focus();
      return false;
    } else
      return true;
  }

  function GetNewNumber() {
    var num = 0;
    var sql = "SELECT * FROM  tbspecialization  order by Specialization_ID desc";
    var list = GeneralCallAjax(sql, "GET_ALL_RECORD")


    if (list.length == 0) {
      return "S" + "-" + zeroPad(1, 3)
    } else {
      var last_record = list[0]['Specialization_ID']
      var num = last_record.slice(-3);
      var newnumber = "S-" + zeroPad(parseInt(num) + 1, 3);
      return newnumber;
    }
  }

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  $(document).on("click", "#btnYes", function() {
    var Specialization_ID = $('#delete_data').attr('name');
    sql = "delete from tbspecialization "
    sql = sql + "where Specialization_ID='" + Specialization_ID + "'"

    $('modal_confirm_delete').modal('hide');
    GeneralCallAjax(sql, "DELETE_RECORD");
    Student();

  })

  $(document).on("click", "#btn_save", function _btn_save() {
    if (VerifyTextBox($('#idspecID')) == false)
      return;
    else if (VerifyTextBox($('#idtrack')) == false)
      return;
    else if (VerifyTextBox($('#idstrand')) == false)
      return;
    else if (VerifyTextBox($('#idspecname')) == false)
      return;

    var mode = $('#btn_save').attr('name');

    if (mode == "ADD") {
      let sql = "insert into tbspecialization values ("
      sql = sql + "'" + $('#idspecID').val() + "',"
      sql = sql + "'" + $('#TRACK').val() + "',"
      sql = sql + "'" + $('#STRAND').val() + "',"
      sql = sql + "'" + $('#SPECIALIZATION').val() + "')"

      GeneralCallAjax(sql, "ADD_RECORD")
      Students();
      $('#mymodal').modal('hide');

    } else {
      sql = "update tbspecialization set "

      sql = sql + " Track_Name='" + $('#TRACK').val() + "',"
      sql = sql + " Strand_Name='" + $('#STRAND').val() + "',"
      sql = sql + " Specialization_Name='" + $('#SPECIALIZATION').val() + "'"
      sql = sql + " where Specialization_ID='" + $('#idspecID').val() + "'"
      GeneralCallAjax(sql, "EDIT_RECORD")
      Students();
      $('#mymodal').modal('hide');

    }

    document.location.reload(true);
  })

  function CheckPrimaryKey(studentno) {
    var sql = "select  * from tbstudent where StudentId= '" + studentno + "'"

    var i = GeneralCallAjax(sql, "COUNT_RECORD")
    if (i == 0) {
      return true;
    } else
      return false;
  }

})
