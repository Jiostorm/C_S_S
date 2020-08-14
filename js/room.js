$(document).ready(function() {
  Students();

  function Students() {
    var sql = "select * from tbroom";

    var Room_list = GeneralCallAjax(sql, "GET_ALL_RECORD")

    var s = '<table class="table table-hover table-borderless table-sm" id="table_room" > <thead class = "thead-dark"> '

    s = s + '<th class = "text-center"> Room Number </th>';
    s = s + '<th class = "text-center"> Building Name </th>';
    s = s + '<th class = "text-center"> Floor </th>';
    s = s + '<th class= "text-center"> Location </th>';
    s = s + '<th class= "text-center"> <button type="button" class="btn btn-outline-success btn-md" id="btnadd"> <i class="fa fa-plus"></i> ADD <i class="fa fa-plus"></i> </button> </th>';

    $("#mytable").empty();

    for (var x = 0; x < Room_list.length; x++) {

      var btnEditdel = '<button type="button" id="btnfont" class= "btn btn-outline-primary btn-sm btnedit"><i class="fa fa-pen"></i></button><button type="button" id="btnfont" class= "btn btn-outline-danger btn-sm btndel"><i class="fa fa-trash"></i></button>'

      s = s + '<tr class="text-center bg-dark">';
      s = s + '<td>' + Room_list[x]['Room_No'] + '</td>';
      s = s + '<td>' + Room_list[x]['Building_Name'] + '</td>';
      s = s + '<td>' + Room_list[x]['Floor'] + '</td>';
      s = s + '<td>' + Room_list[x]['Location'] + '</td>';
      s = s + '<td>' + btnEditdel + '</td>';
      s = s + '</tr>';
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

  $(document).on("click", ".btnedit", function() {
    var i = $(this).closest('tr').index();
    var table = document.getElementById('table_room');
    var Room_No = table.rows[i].cells[0].innerHTML;
    var Building_No = table.rows[i].cells[1].innerHTML;
    var Floor = table.rows[i].cells[2].innerHTML;
    var Location = table.rows[i].cells[3].innerHTML;

    $('#idroom_no').val(Room_No);
    $('#idbldg_no').val(Building_No);
    $('#idfloor').val(Floor)
    $('#idlocation').val(Location);
    $('#idroom_no').attr('disabled', true);
    $('#btn_save').attr('name', "EDIT");

    $('#mymodal').modal('show');

  })

  $(document).on("click", ".btndel", function() {
    var i = $(this).closest('tr').index();
    var table = document.getElementById('table_room');
    var Room_No = table.rows[i].cells[0].innerHTML;
    alert(Room_No)
    //var Room_No = $('delete_data').attr('name');
    sql = "delete from tbroom "
    sql = sql + "where Room_No='" + Room_No + "'"

    $('#modal_confirm_delete').modal('hide');
    GeneralCallAjax(sql, "DELETE_RECORD");
    Students();

  })
  $(document).on("click", "#btnNo", function() {

    $('#modal_confirm_delete').modal('hide')


  })
  $(document).on("click", "#btnadd", function() {
    $('#idroom_no').val('');
    $('#idbldg_no').val('');
    $('#idfloor').val('');
    $('#idlocation').val('');

    $('#idroom_no').attr('disabled', false);
    $('#btn_save').attr('name', "ADD");
    $('#mymodal').modal('show');
  })

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

  $(document).on("click", "#btn_save", function _btn_save() {
    var mode = $('#btn_save').attr('name');

    if (VerifyTextBox($('#idroom_no')) == false)
      return;
    else if (VerifyTextBox($('#idbldg_no')) == false)
      return;
    else if (VerifyTextBox($('#idfloor')) == false)
      return;
    else if (VerifyTextBox($('#idlocation')) == false)
      return;
    else {
      if (mode == "ADD") {
        let action = confirm("Are you sure you want to add this record?");
        if (!action) {
          return;
        }
        sql = "insert into tbroom values ("
        sql = sql + "'" + $('#idroom_no').val() + "',"
        sql = sql + "'" + $('#idbldg_no').val() + "',"
        sql = sql + $('#idfloor').val() + ","
        sql = sql + "'" + $('#idlocation').val() + "')"
        GeneralCallAjax(sql, "ADD_RECORD")
        Students()
        $('#mymodal').modal('hide');
      } else {
        let action = confirm("Are you sure you want to update this record?");
        if (!action) {
          return;
        }
        sql = "update tbroom set Building_No = '" + $('#idbldg_no').val() + "',"
        sql = sql + " Floor = " + $('#idfloor').val() + ","
        sql = sql + " Location = '" + $('#idlocation').val() + "' WHERE Room_No = '" + $('#idroom_no').val() + "'"
        GeneralCallAjax(sql, "EDIT_RECORD")
        Students()
        $('#mymodal').modal('hide');
      }
    }

  })

})
