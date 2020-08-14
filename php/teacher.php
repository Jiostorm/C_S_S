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
  <link rel="stylesheet" href="../css/teacher.css">
  <title> Teachers </title>
</head>

<body>
  <?php require 'fragments/navbar.php'; ?>

  <div class="cover-container d-flex mx-auto flex-column">

    <center>
      <h1 style="margin-top:12px">Adviser's Record</h1>
    </center>

    <header class="masthead mb-4">
      <div class="container-fluid inner">
        <input type="text" placeholder="Search" class="form-control" id="search" style="text-align:center" />

      </div>
    </header>

    <div>
      <div class="container-fluid" id="mytable">

      </div>
    </div>

  </div>

  <?php //require 'fragments/footer.php'; ?>

</body>

<div class="modal fade text-dark" id="mymodal" tabindex="-1" role="dialog" class="modal hide" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 id="lbldelete" class="modal-title">WELCOME Ma'am/Sir!</h5>
        <button type="button" class="close" id="btnclose_delete" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="modal-body" id="modalbody">
        <form action="" id="form_main">
          <input title="Enter ID" style="margin-bottom: 5px" type="text" placeholder="Adviser's ID" class="form-control" id="txtAdvisersID" readonly>
          <input title="Enter First Name" style="margin-bottom: 5px" type="text" placeholder="Adviser's First Name" class="form-control" id="txtAdvisersFirstName">
          <input title="Enter Last Name" style="margin-bottom: 5px" type="text" placeholder="Adviser's Last Name" class="form-control" id="txtAdvisersLastName">
          <input title="Enter Middle Initial" style="margin-bottom: 5px" type="text" placeholder="Adviser's Middle Initial" class="form-control" id="txtAdvisersMiddleInitial">
          <select class="custom-select" name="" id="cboGender">
            <option value="" selected disabled hidden>---------------</option>
            <option value="Male">Male</option>
            <option value="Female">Female<option>
          </select>
          <input type="text" id="txtSpecialization" class="form-control" list="adviser_list" placeholder="Specialization Name">
          <datalist id="adviser_list"></datalist>
          <div style="margin-bottom:10px;" class="input-group">
        </form>

      </div>
      <button type="button" class="btn btn-default" id="btnyes">Save</button>

    </div>
  </div>
</div>

<?php require 'fragments/js-content.php'; ?>

<script type="text/javascript" src="../js/teacher.js" charset="utf-8"></script>

</html>
