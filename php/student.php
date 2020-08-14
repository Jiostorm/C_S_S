<?php
session_start();
if(!isset($_SESSION['username'])){
  header("Location: ../php/");
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require 'fragments/css-content.php'; ?>
  <link rel="stylesheet" href="../css/student.css">
  <title> Students </title>
</head>

<body id="main">
  <?php require 'fragments/navbar.php'?>

  <div class="container-fluid" id="first">
    <div class="">
      <input type="text" placeholder="Search" class="textbox form-control" id="search" style="text-align:center">
    </div>
    <div id="mytable"></div>
  </div>
</body>

<!-- ###########################  MODAL DELETE OFFICE ####################### -->
<div class="modal fade text-dark" id="mymodal" tabindex="-1" role="dialog" class="modal hide" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 id="lbldelete" class="modal-title">Student Info</h5>
        <button type="button" class="close" id="btnclose_delete" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <!-- ============================================================== -->
      <div class="modal-body" id="modalbody">
        <input type="text" title="Enter your LRN" placeholder="LRN" class="form-control textbox" id="idLRN" />
        <input type="text" title="Enter your FirstName" placeholder="First Name" class="form-control textbox " id="idfname" />
        <input type="text" title="Enter your MiddleName" placeholder="Middle Name" class="form-control textbox" id="idmname" />
        <input type="text" title="Enter your LastName" placeholder="Last Name" class="form-control textbox" id="idlname" />
        <input type="text" title="Enter your Barangay" placeholder="Barangay" class="form-control textbox" id="idbr" />
        <input type="text" title="Enter your Municipality" placeholder="Municipality" class="form-control textbox" id="idmun" />
        <input type="text" title="Enter your Province" placeholder="Province" class="form-control textbox" id="idpr" />
        <input type="text" title="Enter your Age" placeholder="Age" class="col-md-6 form-control textbox" id="idage" />

        <div class="row">
          <div class="col-md-6">
            <select name="cbomodal_gender" class="form-control" title="Select Gender" id="idgender">
              <option disabled="disabled" selected="selected">Select Gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </div>

        <div class="row" style='margin-bottom:10px;'>
          <div class="col-md-6">
            <!-- <select name="cbomodal_section"  class="form-control"  title="Select Section" id="section" >
            </select> -->
            <input type="text" title="Enter your Section" list="student_list" id="txtstudent" class="form-control" />
            <datalist id="student_list">
              <option value=""></option>
            </datalist>
          </div>
        </div>

        <button type="button" id="btn_save" class="btn btn-primary">Save</button>


      </div>
    </div>

    <!-- ================================================================== -->
  </div>
</div>


<?php $ModalConfirmDelete?>
<!-- ########################### MODAL IMPORT ####################### -->
<div class="modal fade text-dark" id="modal_confirm_delete" tabindex="-1" role="dialog" class="modal hide" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <!-- ########################### MODAL HEADING IMPORT ####################### -->
      <div class="modal-header">
        <h5 id="delete_data" class="modal-title">Delete</h5>
        <button type="button" class="close" id="btnclose_enrolle" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <!--modal header -->

      <!-- ============================================================== -->

      <!-- ####################### MODAL BODY START IMPORT ################-->
      <div class="modal-body" id="modalbody">
        <input type="button" style="margin-left:350px" class="btn btn-default" value="Yes" id="btnYes" />
        <input type="button" class="btn btn-default" value="No" id="btnNo" />
      </div>
    </div> <!-- modal body -->
    </form>
    <!-- ================================================================== -->
  </div>
</div>

<?php require 'fragments/js-content.php'; ?>

<script type="text/javascript" src="../js/student.js" charset="utf-8"></script>

</html>
