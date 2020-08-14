$(document).ready(function() {
  const customSwal = swal.mixin({
    confirmButtonClass: "btn btn-outline-success",
    cancelButtonClass: "btn btn-outline-danger ml-2",
    showCloseButton: true,
    showConfirmButton: true,
    showCancelButton: true,
    buttonsStyling: false,
    animation: false,
    focusConfirm: false,
  });

  var pageLimit = 5,
    pageLimitStudent = 5,
    numOfPage = 0,
    numOfPageStudent = 0,
    currentStudent,
    sessionInfo = $('#session-holder').val().split(',');

  DisplayData("", "VIEW");

  function DisplayData(filterType, action) {
    $("#section-table").empty();
    $("#table-section-alert").empty();

    let sectionList = filterType == "" ? RequestData("SELECT * FROM tbsection ORDER BY Section_Name", "RETRIEVE") : RequestData("SELECT * FROM tbsection WHERE Section_Name LIKE '%" + filterType + "%' ORDER BY Section_Name", "RETRIEVE"),
      adviserList = RequestData("SELECT * FROM tbadviser", "RETRIEVE"),
      specializationList = RequestData("SELECT * FROM tbspecialization", "RETRIEVE"),
      roomList = RequestData("SELECT * FROM tbroom", "RETRIEVE");

    let sectionTable = sectionList.length == 0 ? action == "VIEW" ? "<center><strong> No Section Available. </strong></center>" : "<center><strong> No Section in this System has a keyword of  " + '"' + filterType + '"' + ". </strong></center>" : "",
      adviserOption, specializationOption, roomOption;

    for (let ctr = 0; ctr < sectionList.length; ctr++) {
      sectionTable += "<tr class='section-items text-center'>";
      sectionTable += "<th scope='row'><button class='btnrefer btn btn-outline-light btn-sm' value='" + sectionList[ctr]["Section_Name"] + "' data-toggle='tooltip' data-placement='right' title='Click to view this Section'><i class='fa fa-eye'></i></button>  " + (ctr + 1) + ").</th>"
      sectionTable += "<td>" + sectionList[ctr]["Section_Name"] + "</td>"
      sectionTable += "</tr>";
    }
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    if (sectionList.length > 0) {
      $("#section-table").append(sectionTable);
      document.getElementById("table-section-alert").style.display = "none";
      document.getElementById("table-section-container").style.display = "block";
      document.getElementById("section-page-container").style.display = "block";
    } else {
      $("#table-section-alert").append(sectionTable);
      document.getElementById("table-section-alert").style.display = "block";
      document.getElementById("table-section-container").style.display = "none";
      document.getElementById("section-page-container").style.display = "none";
    }

    $("#section-pagination").empty();

    let totalPage = sectionList.length;
    numOfPage = Math.ceil(totalPage / pageLimit);
    $(".section-items:gt(" + (pageLimit - 1) + ")").hide();

    let pageRender = "<li class='page-item' id='back-page-section'><a class='page-link' href='javascript:void(0)'> &laquo; </a></li>"
    pageRender += "<li class='page-item current-page-section active'><a class='page-link' href='javascript:void(0)'> 1 </a></li>";
    for (let i = 2; i <= numOfPage; i++) {
      pageRender += "<li class='page-item current-page-section'><a class='page-link' href='javascript:void(0)'> " + i + " </a></li>";
    }
    pageRender += "<li class='page-item' id='next-page-section'><a class='page-link' href='javascript:void(0)'> &raquo; </a></li>";
    $("#section-pagination").append(pageRender);

    if (action == "VIEW") {
      RetrieveDataList(adviserList, specializationList, roomList);
    }
  }

  function RetrieveDataList(adviserList, specializationList, roomList) {
    $("#list-adviser").empty();
    let adviserOption;
    for (let ctr = 0; ctr < adviserList.length; ctr++) {
      let gender = adviserList[ctr]['Adviser_Gender'] == "Male" ? "Mr. " : "Ms. ";

      adviserOption += "<option data-value='" + adviserList[ctr]['Adviser_ID'] + "' value='" + gender + adviserList[ctr]['Adviser_FN'] + " " + adviserList[ctr]['Adviser_MI'] + " " + adviserList[ctr]['Adviser_LN'] + "'></option>";
    }
    $("#list-adviser").append(adviserOption);

    $("#list-special").empty();
    let specializationOption;
    for (let ctr = 0; ctr < specializationList.length; ctr++) {
      let dash = specializationList[ctr]['Specialization_Name'] == "" ? "" : " - ";

      specializationOption += "<option data-value='" + specializationList[ctr]['Specialization_ID'] + "' value='" + specializationList[ctr]['Track_Name'] + " - " + specializationList[ctr]['Strand_Name'] + dash + specializationList[ctr]['Specialization_Name'] + "'></option>";
    }
    $("#list-special").append(specializationOption);

    $("#list-room").empty();
    let roomOption;
    for (let ctr = 0; ctr < roomList.length; ctr++) {
      roomOption += "<option data-value='" + roomList[ctr]['Room_No'] + "' value='" + roomList[ctr]['Building_Name'] + ", Room: " + roomList[ctr]['Room_No'] + "'></option>";
    }
    $("#list-room").append(roomOption);
  }

  function ViewSectionTable(sectionId) {
    document.getElementById("section-info-container").style.visibility = "visible";

    let sectionListInfo = RequestData("SELECT * FROM tbsection INNER JOIN tbadviser ON tbsection.Adviser_ID = tbadviser.Adviser_ID" +
      " INNER JOIN tbspecialization ON tbsection.Specialization_ID = tbspecialization.Specialization_ID" +
      " INNER JOIN tbroom ON tbsection.Room_No = tbroom.Room_No WHERE Section_Name = '" + sectionId + "'", "RETRIEVE");

    let sectionData,
      gender = sectionListInfo[0]['Adviser_Gender'] == "Male" ? "Mr. " : "Ms. ",
      dash = sectionListInfo[0]['Specialization_Name'] == "" ? "" : " - ";

    let adviserList = RequestData("SELECT * FROM tbadviser", "RETRIEVE"),
      specializationList = RequestData("SELECT * FROM tbspecialization", "RETRIEVE"),
      roomList = RequestData("SELECT * FROM tbroom", "RETRIEVE");

    sectionData += "<tr>";
    sectionData += "<td><input class='form-control text-center' id='txtcurrentsection' style='background-color:transparent;border:0;text-align-last:center;font-size:13px' type='text' value='" + sectionListInfo[0]['Section_Name'] + "' disabled></td>";
    // =====================================
    sectionData += "<td><input list='list-advisersection' id='txtadvisersection' class='form-control text-capitalize text-center' value='" + gender + sectionListInfo[0]['Adviser_FN'] + " " + sectionListInfo[0]['Adviser_MI'] + " " + sectionListInfo[0]['Adviser_LN'] + "' title='Enter A Valid Name Of An Adviser' style='background-color:transparent;background:transparent;border:0;font-size:13px;' disabled>";
    sectionData += "<datalist id='list-advisersection'>"

    for (let ctr = 0; ctr < adviserList.length; ctr++) {
      gender = adviserList[ctr]['Adviser_Gender'] == "Male" ? "Mr. " : "Ms. "
      sectionData += "<option data-value='" + adviserList[ctr]['Adviser_ID'] + "' value='" + gender + adviserList[ctr]['Adviser_FN'] + " " + adviserList[ctr]['Adviser_MI'] + " " + adviserList[ctr]['Adviser_LN'] + "'></option>"
    }
    sectionData += "</datalist></td>"
    // =====================================
    sectionData += "<td><input list='list-specialsection' id='txtspecialsection' class='form-control text-capitalize text-center' value='" + sectionListInfo[0]['Track_Name'] + " - " + sectionListInfo[0]['Strand_Name'] + dash + sectionListInfo[0]['Specialization_Name'] + "' title='Enter A Valid Specialization' style='background-color:transparent;background:transparent;border:0;font-size:13px;' disabled>";
    sectionData += "<datalist id='list-specialsection'>";

    for (let ctr = 0; ctr < specializationList.length; ctr++) {
      dash = specializationList[ctr]['Specialization_Name'] == "" ? "" : " - ";
      sectionData += "<option data-value='" + specializationList[ctr]['Specialization_ID'] + "' value='" + specializationList[ctr]['Track_Name'] + " - " + specializationList[ctr]['Strand_Name'] + dash + specializationList[ctr]['Specialization_Name'] + "'></option>";
    }
    sectionData += "</datalist></td>"
    // =====================================
    sectionData += "<td><input list='list-roomsection' id='txtroomsection' class='form-control text-capitalize text-center' value='" + sectionListInfo[0]['Building_Name'] + ", Room: " + sectionListInfo[0]['Room_No'] + "' title='Enter A Valid Room' style='background-color:transparent;background:transparent;border:0;font-size:13px;' disabled>";
    sectionData += "<datalist id='list-roomsection'>";

    for (let ctr = 0; ctr < roomList.length; ctr++) {
      sectionData += "<option data-value='" + roomList[ctr]['Room_No'] + "' value='" + roomList[ctr]['Building_Name'] + ", Room: " + roomList[ctr]['Room_No'] + "'></option>";
    }
    sectionData += "</datalist></td>";
    // =====================================
    sectionData += "<td class='d-flex justify-content-around'><button id='btnedit-section' class='btn btn-outline-warning btn-sm' value='" + sectionListInfo[0]['Section_Name'] + "' data-toggle='tooltip' data-placement='top' title='Click to edit this Section'><i class='fa fa-pen'></i></button>";
    sectionData += "<button id='btndelete-section' class='btn btn-outline-danger btn-sm' value='" + sectionListInfo[0]['Section_Name'] + "' data-toggle='tooltip' data-placement='top' title='Click to delete this Section'><i class='fa fa-trash'></i></button>";
    sectionData += "<button id='btnsave-section' class='btn btn-outline-success btn-sm' value='" + sectionListInfo[0]['Section_Name'] + "' data-toggle='tooltip' data-placement='top' title='Click to save this Section'><i class='fa fa-save'></i></button>";
    sectionData += "<button id='btnreturn' class='btn btn-outline-info btn-sm' data-toggle='tooltip' data-placement='top' title='Click to cancel the edit to this Section'><i class='fa fa-undo'></i></button></td>";
    sectionData += "</tr>";

    $("#section-info-table").empty();
    $("#section-info-table").append(sectionData);
    document.getElementById("btnsave-section").style.display = "none";
    document.getElementById("btnreturn").style.display = "none";

    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  function ViewSectionStudent(sectionId, action) {
    let searchOption = $("#cbosearch").val(),
      searchVal = $("#txtsearch").val(),
      query;
    if ((action == "VIEW" || searchOption == "") || searchVal == "") {
      query = "SELECT * FROM tbassigned INNER JOIN tbstudents_info ON tbassigned.Student_LRN = tbstudents_info.Student_LRN" + " WHERE Section_Name = '" + sectionId + "' ORDER BY Gender DESC, Last_Name";
    } else {
      query = "SELECT * FROM tbassigned INNER JOIN tbstudents_info ON tbassigned.Student_LRN = tbstudents_info.Student_LRN WHERE Section_Name = '" + sectionId + "' AND " + searchOption + " LIKE '%" + searchVal + "%' ORDER BY Gender DESC, Last_Name";
    }

    let studentList = RequestData(query, "RETRIEVE");

    let studentRender = studentList.length == 0 ? action == "VIEW" ? "<center><strong> No Student Assigned Yet in this Section. </strong><center>" : "<center><strong> No Student in this Section has a keyword of " + '"' + searchVal + '"' + " in their " + $("#cbosearch").val().replace("_", " ") + ". </strong><center>" : "";

    for (let ctr = 0; ctr < studentList.length; ctr++) {

      studentRender += "<tr class='student-items text-center'>";
      studentRender += "<th scope='row'><i class='fa fa-chevron-circle-right'></i> " + (ctr + 1) + ".</th>";
      studentRender += "<td class='text-left' contenteditable='false'>" + studentList[ctr]['Last_Name'].toUpperCase() + ", " + studentList[ctr]['First_Name'] + " " + studentList[ctr]['Middle_Name'].charAt(0) + ". " + "</td>";
      studentRender += "<td contenteditable='false'>" + studentList[ctr]['Age'] + "</td>";
      studentRender += "<td contenteditable='false'>" + studentList[ctr]['Gender'] + "</td>";
      studentRender += "<td contenteditable='false'>" + studentList[ctr]['Barangay'] + " " + studentList[ctr]['Municipality'] + ", " + studentList[ctr]['Province'] + "</td>";
      studentRender += "<td contenteditable='false'>" + studentList[ctr]['Status'] + "</td>";
      studentRender += "<td class='d-flex justify-content-around'><button id='btnedit-student' class='btn btn-outline-warning btn-sm' value='" + studentList[ctr]['Student_LRN'] + "' data-toggle='tooltip' data-placement='top' title='Click to edit this Student'><i class='fa fa-pen'></i></button>"
      studentRender += "<button id='btntransfer-student' class='btn btn-outline-info btn-sm' value='" + studentList[ctr]['Assigned_ID'] + "' data-toggle='tooltip' data-placement='top' title='Click to transfer this student to another Section'><i class='fa fa-exchange-alt'></i></button></td>"
      studentRender += "</tr>"
    }
    $("#section-student-table").empty();
    $("#table-section-student-alert").empty();

    document.getElementById("section-student-container").style.visibility = "visible";
    if (studentList.length > 0) {
      $("#section-student-table").append(studentRender);
      document.getElementById("input-container").style.visibility = "visible";
      document.getElementById("table-section-student-alert").style.display = "none";
      document.getElementById("table-section-student-container").style.visibility = "visible";
    } else {
      $("#table-section-student-alert").append(studentRender);
      document.getElementById("input-container").style.visibility = action == "VIEW" ? "hidden" : "visible";
      document.getElementById("table-section-student-alert").style.display = "block";
      document.getElementById("table-section-student-container").style.visibility = "hidden";
    }

    $("#student-pagination").empty();

    let totalPage = studentList.length;
    numOfPageStudent = Math.ceil(totalPage / pageLimitStudent);
    $(".student-items:gt(" + (pageLimitStudent - 1) + ")").hide();

    let pageRender = "<li class='page-item' id='back-page-student'><a class='page-link' href='javascript:void(0)'> &laquo; </a></li>"
    pageRender += "<li class='page-item current-page-student active'><a class='page-link' href='javascript:void(0)'> 1 </a></li>";
    for (let i = 2; i <= numOfPageStudent; i++) {
      pageRender += "<li class='page-item current-page-student'><a class='page-link' href='javascript:void(0)'> " + i + " </a></li>";
    }
    pageRender += "<li class='page-item' id='next-page-student'><a class='page-link' href='javascript:void(0)'> &raquo; </a></li>";
    $("#student-pagination").append(pageRender);

    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  // =============================================================================================================================================

  function RequestData(query, method) {
    let dataReturned;

    let performed = {
      "CREATE": "Inserted!",
      "UPDATE": "Updated!",
      "DELETE": "Deleted!"
    };

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
        if (method != "RETRIEVE" && method != "COUNT") {
          swal({
            type: "success",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Section Information has been " + performed[method] + "</strong>",
            showConfirmButton: false,
            timer: 2500
          }).then(function() {
            if (method != "UPDATE") {
              DisplayData("", "VIEW");
            } else {
              SectionInputs(true, "transparent", "block", "none");
            }
          });
        }
      }
    })
    return dataReturned;
  }

  function VerifyInput($element, datavalue) {
    if ($element.val() == "" || $element.val() == null || datavalue == "") {
      $element.tooltip('show');
      $element.tooltip('enable');

      setTimeout(function() {
        $element.tooltip('hide');
        $element.tooltip('disable');
      }, 5000);
      $element.focus();
      return false;
    } else {
      return true;
    }
  }

  function SectionInputs(val, color, editdelete, savereturn) {
    document.getElementById("txtadvisersection").disabled = val;
    document.getElementById("txtadvisersection").style.backgroundColor = color;
    document.getElementById("txtspecialsection").disabled = val;
    document.getElementById("txtspecialsection").style.backgroundColor = color;
    document.getElementById("txtroomsection").disabled = val;
    document.getElementById("txtroomsection").style.backgroundColor = color;

    document.getElementById("btnedit-section").style.display = editdelete;
    document.getElementById("btndelete-section").style.display = editdelete;
    document.getElementById("btnsave-section").style.display = savereturn;
    document.getElementById("btnreturn").style.display = savereturn;
  }

  function TransferStudent(id, studentid, newsection) {
    if (!VerifyInput($("#txtnewsection"), '~')) {
      swal({
        type: "error",
        title: "<strong>Server Says: </strong>",
        html: "<strong>Invalid Transfer Action!</strong>",
        showConfirmButton: false,
        timer: 2000,
      });
      VerifyInput($('#txtnewsection'), '~');
      return;
    }

    let studentQuery = "UPDATE tbstudents_info SET Section = '" + newsection + "' WHERE Student_LRN = '" + studentid + "'";
    $.ajax({
      url: "../php/modules/handler.php",
      type: "POST",
      async: false,
      data: {
        approval: "approved",
        query: studentQuery,
        method: "UPDATE"
      },
      success: function() {}
    })

    let query = "UPDATE tbassigned SET Student_LRN = '" + studentid + "', Section_Name = '" + newsection + "' WHERE Assigned_ID = '" + id + "'";
    $.ajax({
      url: "../php/modules/handler.php",
      type: "POST",
      async: false,
      data: {
        approval: "approved",
        query: query,
        method: "UPDATE"
      },
      success: function() {
        swal({
          type: "success",
          title: "<strong>Server Says: </strong>",
          html: "<strong>Selected student has been transfered!</strong>",
          showConfirmButton: false,
          showLoaderOnConfirm: true,
          timer: 2500
        }).then(function() {
          $("#transfer-student-modal").modal("hide");
          document.location.reload(true);
        });
      }
    })
  }

  function VerfiyPrimaryKey(key) {
    let query = "SELECT * FROM tbsection WHERE Section_Name = '" + key + "'"

    let i = RequestData(query, "COUNT");
    if (i == 0) {
      return true;
    } else {
      return false;
    }
  }
  // =============================================================================================================================================

  $(document).on("click", ".btnrefer", function() {
    ViewSectionTable($(this).val());
    ViewSectionStudent($(this).val(), "VIEW");
  })

  $(document).on("click", "#btnadd-section", function() {
    $("#section-form")[0].reset();
    $("#add-section-modal").modal("show");
  })

  $(document).on("click", "#btndelete-section", function() {
    let sectionId = $(this).val();

    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to delete this section?<br>Remember, you can't retrieve this information from the System if deleted!</strong>",
      confirmButtonText: "Yes! Delete It!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated shake",
      background: "#F8C471"
    }).then((result) => {
      if (result.value) {
        RequestData("DELETE FROM tbsection WHERE Section_Name = '" + sectionId + "'", "DELETE");
        $('#input-container').removeAttr('style').css('visibility', 'hidden');
        $('#table-section-student-container').removeAttr('style').css('visibility', 'hidden');
        $('#section-info-container').css('visibility', 'hidden');
        $('#section-student-container').css('visibility', 'hidden');
      }
    });
  })

  $(document).on("click", "#btnedit-section", function(event) {
    SectionInputs(false, "azure", "none", "block");
  })

  $(document).on("click", "#btnsave-section", function(event) {
    let sectionId = $(this).val(),
      newAdviser = document.querySelector("#list-advisersection option[value='" + $("#txtadvisersection").val() + "']") == null ? "" : document.querySelector("#list-advisersection option[value='" + $("#txtadvisersection").val() + "']").dataset.value,
      newSpecialization = document.querySelector("#list-specialsection option[value='" + $("#txtspecialsection").val() + "']") == null ? "" : document.querySelector("#list-specialsection option[value='" + $("#txtspecialsection").val() + "']").dataset.value,
      newRoom = document.querySelector("#list-roomsection option[value='" + $("#txtroomsection").val() + "']") == null ? "" : document.querySelector("#list-roomsection option[value='" + $("#txtroomsection").val() + "']").dataset.value;

    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to update this section?</strong>",
      confirmButtonText: "Yes! Update It!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated lightSpeedIn",
      background: "#ABEBC6"
    }).then((result) => {
      if (result.value) {
        if (!VerifyInput($("#txtadvisersection"), newAdviser) || !VerifyInput($("#txtspecialsection"), newSpecialization) || !VerifyInput($("#txtroomsection"), newRoom)) {
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Incomplete Information for the Section!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });
          VerifyInput($("#txtadvisersection"), newAdviser);
          VerifyInput($("#txtspecialsection"), newSpecialization);
          VerifyInput($("#txtroomsection"), newRoom);
          return;
        } else {
          let query = "UPDATE tbsection SET Adviser_ID = '" + newAdviser + "', Specialization_ID = '" + newSpecialization + "', Room_No = '" + newRoom + "' WHERE Section_Name = '" + sectionId + "'";
          RequestData(query, "UPDATE");
        }
      }
    });
  })

  $(document).on("click", "#btnreturn", function(event) {
    SectionInputs(true, "transparent", "block", "none");
  })

  $(document).on("submit", "#section-form", function(event) {
    event.preventDefault();

    let sectionGrade = $("#txtsectiongrade").val(),
      sectionName = $("#txtsectionname").val().toUpperCase(),
      sectionNumber = $("#txtsectionnumber").val(),
      adviser = document.querySelector("#list-adviser option[value='" + $("#txtadviser").val() + "']") == null ? "" : document.querySelector("#list-adviser option[value='" + $("#txtadviser").val() + "']").dataset.value,
      specialization = document.querySelector("#list-special option[value='" + $("#txtspecial").val() + "']") == null ? "" : document.querySelector("#list-special option[value='" + $("#txtspecial").val() + "']").dataset.value,
      room = document.querySelector("#list-room option[value='" + $("#txtroom").val() + "']") == null ? "" : document.querySelector("#list-room option[value='" + $("#txtroom").val() + "']").dataset.value;

    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to save the Section Information to the System?</strong>",
      confirmButtonText: "Yes! Save It!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated zoomInUp",
      background: "#AED6F1"
    }).then((result) => {
      if (result.value) {

        if (!VerifyInput($('#txtsectiongrade'), '~') || !VerifyInput($('#txtsectionname'), '~') || !VerifyInput($('#txtsectionnumber'), '~') || !VerifyInput($('#txtadviser'), adviser) || !VerifyInput($('#txtspecial'), specialization) || !VerifyInput($('#txtroom'), room)) {
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Incomplete Information for the Section!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });
          VerifyInput($('#txtsectiongrade'), '~');
          VerifyInput($('#txtsectionname'), '~');
          VerifyInput($('#txtsectionnumber'), '~');
          VerifyInput($('#txtadviser'), adviser);
          VerifyInput($('#txtspecial'), specialization);
          VerifyInput($('#txtroom'), room);
          return;
        } else {
          let section = sectionGrade + " - " + sectionName + " - " + sectionNumber,
            query = "INSERT INTO tbsection VALUES ('" + section + "','" + adviser + "','" + specialization + "','" + room + "')";

          $('.section').each(function() {
            $(this).css('background-color', 'white');
            $(this).blur();
          })

          if (!VerfiyPrimaryKey(section)) {
            $('.section').each(function() {
              $(this).css('background-color', 'red');
            })
            swal({
              type: "error",
              title: "<strong>Server Says: </strong>",
              html: "<strong>This Section Exists in the System!</strong>",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            RequestData(query, "CREATE");
            $("#add-section-modal").modal("hide");
          }
        }

      }
    });
  })

  // =============================================================================================================================================

  $(document).on("click", ".section-pagination li.current-page-section", function() {
    if ($(this).hasClass("active")) {
      return false;
    }
    let pageIndex = $(this).index();

    $(".section-items").hide();
    $(".section-pagination li").removeClass("active");
    $(this).addClass("active");

    let pageRequest = pageLimit * pageIndex;

    for (let i = pageRequest - pageLimit; i < pageRequest; i++) {
      $(".section-items:eq(" + i + ")").show();
    }
  })

  $(document).on("click", "#back-page-section", function() {
    let currentPage = $(".section-pagination li.active").index();
    if (currentPage == 1) {
      return false;
    }
    currentPage--;
    $(".section-items").hide();
    $(".section-pagination li").removeClass("active");

    let pageRequest = pageLimit * currentPage;

    for (let i = pageRequest - pageLimit; i < pageRequest; i++) {
      $(".section-items:eq(" + i + ")").show();
    }
    $(".section-pagination li.current-page-section:eq(" + (currentPage - 1) + ")").addClass("active");
  })

  $(document).on("click", "#next-page-section", function() {
    let currentPage = $(".section-pagination li.active").index();
    if (currentPage == numOfPage) {
      return false;
    }
    currentPage++;
    $(".section-items").hide();
    $(".section-pagination li").removeClass("active");

    let pageRequest = pageLimit * currentPage;

    for (let i = pageRequest - pageLimit; i < pageRequest; i++) {
      $(".section-items:eq(" + i + ")").show();
    }
    $(".section-pagination li.current-page-section:eq(" + (currentPage - 1) + ")").addClass("active");
  })

  $(document).on("click", ".student-pagination li.current-page-student", function() {
    if ($(this).hasClass("active")) {
      return false;
    }
    let pageIndex = $(this).index();

    $(".student-items").hide();
    $(".student-pagination li").removeClass("active");
    $(this).addClass("active");

    let pageRequest = pageLimitStudent * pageIndex;

    for (let i = pageRequest - pageLimitStudent; i < pageRequest; i++) {
      $(".student-items:eq(" + i + ")").show();
    }
  })

  $(document).on("click", "#back-page-student", function() {
    let currentPage = $(".student-pagination li.active").index();
    if (currentPage == 1) {
      return false;
    }
    currentPage--;
    $(".student-items").hide();
    $(".student-pagination li").removeClass("active");

    let pageRequest = pageLimitStudent * currentPage;

    for (let i = pageRequest - pageLimitStudent; i < pageRequest; i++) {
      $(".student-items:eq(" + i + ")").show();
    }
    $(".student-pagination li.current-page-student:eq(" + (currentPage - 1) + ")").addClass("active");
  })

  $(document).on("click", "#next-page-student", function() {
    let currentPage = $(".student-pagination li.active").index();
    if (currentPage == numOfPageStudent) {
      return false;
    }
    currentPage++;
    $(".student-items").hide();
    $(".student-pagination li").removeClass("active");

    let pageRequest = pageLimitStudent * currentPage;

    for (let i = pageRequest - pageLimitStudent; i < pageRequest; i++) {
      $(".student-items:eq(" + i + ")").show();
    }
    $(".student-pagination li.current-page-student:eq(" + (currentPage - 1) + ")").addClass("active");
  })

  // =============================================================================================================================================

  $(document).on("click", "#btntransfer", function() {
    let newSection = $("#txtnewsection").val() == "" ? "" : document.querySelector("#list-newsection option[value='" + $("#txtnewsection").val() + "']").dataset.value;
    let studentSplit = currentStudent.split(',');

    TransferStudent(studentSplit[0], studentSplit[1], newSection);
  })

  $(document).on("click", "#btntransfer-student", function() {
    $("#list-newsection").empty();

    let id = $(this).val();
    let studentInfo = RequestData("SELECT * FROM tbassigned INNER JOIN tbstudents_info ON tbassigned.Student_LRN = tbstudents_info.Student_LRN WHERE Assigned_ID ='" + id + "'", "RETRIEVE");
    let sideName = studentInfo[0]['Gender'] == "Male" ? "Mr. " : "Ms. ";

    currentStudent = id + "," + studentInfo[0]['Student_LRN'];
    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to transfer " + sideName + studentInfo[0]['Last_Name'] + " to other section?</strong>",
      confirmButtonText: "Yes! Please!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated flash",
      background: "#ABEBC6"
    }).then((result) => {
      if (result.value) {
        let sections = RequestData("SELECT * FROM tbsection", "RETRIEVE");
        let newSectionOption;
        for (let ctr = 0; ctr < sections.length; ctr++) {
          newSectionOption += "<option data-value='" + sections[ctr]['Section_Name'] + "' value='" + sections[ctr]['Section_Name'] + "'></option>"
        }
        $("#list-newsection").append(newSectionOption);
        $("#transfer-student-modal").modal("show");
      }
    });
  })

  $(document).on("click", "#btnedit-student", function() {
    $("#student-form")[0].reset();

    let studentId = $(this).val();

    let query = "SELECT * FROM tbstudents_info WHERE Student_LRN = '" + studentId + "'";

    let studentInfo = RequestData(query, "RETRIEVE");

    $("#txtstudentlrn").val(studentInfo[0]['Student_LRN']);
    $("#txtstudentfn").val(studentInfo[0]['First_Name']);
    $("#txtstudentln").val(studentInfo[0]['Last_Name']);
    $("#txtstudentmi").val(studentInfo[0]['Middle_Name']);
    $("#txtstudentage").val(studentInfo[0]['Age']);
    $("#cbostudentgender option:contains(" + studentInfo[0]['Gender'] + ")").attr("selected", true);
    $("#txtstudentbarangay").val(studentInfo[0]['Barangay']);
    $("#txtstudentmunicipality").val(studentInfo[0]['Municipality']);
    $("#txtstudentprovince").val(studentInfo[0]['Province']);

    $("#edit-student-modal").modal("show");
  })

  $(document).on("submit", "#student-form", function(event) {
    event.preventDefault();

    let lrn = $("#txtstudentlrn").val(),
      fn = $("#txtstudentfn").val(),
      ln = $("#txtstudentln").val(),
      mi = $("#txtstudentmi").val(),
      age = $("#txtstudentage").val(),
      gender = $("#cbostudentgender").val(),
      brgy = $("#txtstudentbarangay").val(),
      mun = $("#txtstudentmunicipality").val(),
      prov = $("#txtstudentprovince").val();

    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to update this student?</strong>",
      confirmButtonText: "Yes! Save It!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated lightSpeedIn",
      background: "#AED6F1"
    }).then((result) => {
      if (result.value) {
        if (!VerifyInput($('#txtstudentfn'), '~') || !VerifyInput($('#txtstudentln'), '~') || !VerifyInput($('#txtstudentmi'), '~') || !VerifyInput($('#txtstudentage')) || !VerifyInput($('#cbostudentgender'), '~') || !VerifyInput($('#txtstudentbarangay'), '~') || !VerifyInput($('#txtstudentmunicipality'), '~') || !VerifyInput($('#txtstudentprovince'), '~')) {
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Incomplete Information for the Student!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });
          VerifyInput($('#txtstudentfn'), '~');
          VerifyInput($('#txtstudentln'), '~');
          VerifyInput($('#txtstudentmi'), '~');
          VerifyInput($('#txtstudentage'), '~');
          VerifyInput($('#cbostudentgender'), '~');
          VerifyInput($('#txtstudentbarangay'), '~');
          VerifyInput($('#txtstudentmunicipality'), '~');
          VerifyInput($('#txtstudentprovince'), '~');
          return;
        } else {
          let query = "UPDATE tbstudents_info SET First_Name = '" + fn + "', Middle_Name = '" + mi + "', Last_Name = '" + ln + "', Age = " + age + ", Gender = '" + gender +
            "', Barangay = '" + brgy + "', Municipality = '" + mun + "', Province = '" + prov + "' WHERE Student_LRN = '" + lrn + "'";

          RequestData(query, "UPDATE");

          $("#edit-student-modal").modal("hide");
          ViewSectionStudent($("#txtcurrentsection").val(), "VIEW");
        }
      }
    });
  })

  $(document).on("keyup paste", "#txtfilter", function() {
    let searchVal = $(this).val();

    DisplayData(searchVal);
  })

  $(document).on("keyup paste", "#txtsearch", function() {
    let sectionId = $("#txtcurrentsection").val();
    ViewSectionStudent(sectionId, "SEARCH");
  })
})
