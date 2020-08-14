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
  <link rel="stylesheet" href="../css/room.css">
  <title> Rooms </title>
</head>

<body id="main">
  <?php require 'fragments/navbar.php'?>

  <div class="container-fluid" id="first">
    <div class="">
      <div id="mytable"></div>

    </div>

  </div>
</body>

</body>

<div class="modal fade text-dark" id="mymodal" tabindex="-1" role="dialog" class="modal hide" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 id="lbldelete" class="modal-title">Room No</h5>
        <button type="button" class="close" id="btnclose_delete" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="modal-body" id="modalbody">
        <input type="text" title="Enter your Room_no" placeholder="Room No." class="form-control textbox" id="idroom_no" />
        <input type="text" title="Enter your Building_no" placeholder="Building Name" class="form-control textbox" id="idbldg_no" />
        <input type="text" title="Enter your Floor" placeholder="Floor" class="form-control textbox" id="idfloor" />
        <input type="text" title="Enter your Location" placeholder="Location" class="form-control textbox" id="idlocation" />



        <button type="button" id="btn_save" class="btn btn-primary">Save</button>


      </div>
    </div>

  </div>
</div>

<?php require 'fragments/js-content.php'; ?>

<script type="text/javascript" src="../js/room.js" charset="utf-8"></script>

</html>
