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
  <link rel="stylesheet" href="../css/specialization.css">
  <title> Specialization </title>
</head>

<body id="main">
  <?php require 'fragments/navbar.php'?>

  <div class="container-fluid" id="first">
    <div>
      <div id="mytable"></div>
    </div>
  </div>
</body>

<!-- ###########################  MODAL DELETE OFFICE ####################### -->
<div class="modal fade text-dark" id="mymodal" tabindex="-1" role="dialog" class="modal hide" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 id="lbldelete" class="modal-title">SPECIALIZATION</h5>
        <button type="button" class="close" id="btnclose_delete" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <!-- ============================================================== -->
      <div class="modal-body" id="modalbody">
        <input type="text" title="Enter Specialization ID" placeholder="Specialization ID" class="form-control textbox" id="idspecID" readonly>

        <select id="TRACK" style='margin-top:5px;' class="form-control" title="Please Select a Track">
          <option selected disabled hidden> Track </option>
          <option> ACADEMICS </option>
          <option> TVL </option>
          <option> SPORTS </option>
          <option> ADT </option>

        </select>

        <select id="STRAND" style='margin-top:5px;' class="form-control" title="Please Select a Strand">
          <option selected disabled hidden> Strand </option>
          <option> GAS </option>
          <option> STEM </option>
          <option> ABM </option>
          <option> HUMMS </option>
          <option> ICT </option>
          <option> IA </option>
          <option> HE </option>
          <option> AGRICULTURE </option>

        </select>

        <select id="SPECIALIZATION" style='margin-top:5px;' class="form-control" title="Please Select a Specialization">
          <option selected disabled hidden>Specialization</option>
          <option></option>
          <option> Programming </option>
          <option> CSS </option>
          <option> AI </option>
          <option> EPAS </option>
          <option> EIM </option>
          <option> LTEM </option>
          <option> SMAW </option>
          <option> BCH </option>
          <option> BBBH </option>
          <option> BHW </option>
          <option> Fishery </option>
          <option> HortiCulture </option>
          <option> FP </option>

        </select>

        <div class="col-md-0">
          <button type="button" id="btn_save" class="btn btn-outline-primary">Save</button>

        </div>
      </div>

      <!-- ================================================================== -->
    </div>
  </div>
</div>

<?php require 'fragments/js-content.php'; ?>
<script type="text/javascript" src="../js/specialization.js" charset="utf-8"></script>

</html>
