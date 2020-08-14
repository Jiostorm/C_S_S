<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require 'fragments/css-content.php'; ?>
  <title> Home </title>
</head>

<body>
  <?php require 'fragments/navbar.php'; ?>

  <div class="outer-container">
    <div class="container-fluid">
      <div class="jumbotron">
          <h1 class="display-4"> <i class="fa fa-hdd"></i> SHS Computerized Sectioning System </h1>
          <p class="lead"> This system is all about the csnhs senior high school sectioning system. The system handles the student's information,
            the list of sections, the informations of the teachers, list of specializations available and the list of rooms available.
          </p>
          <hr class="my-2 bg-light">
          <?php if(isset($_SESSION['username'])){ ?>
          <p> Please click the button below to proceed to the system's dashboard. </p>
          <p> <a href="dashboard.php"> <button class="btn btn-outline-light btn-md mt-4" type="button"> Go to Dashboard &raquo; </button> </a> </p>
          <?php } ?>
      </div>
    </div>
  </div>

  <?php require 'fragments/footer.php'; ?>
</body>

<?php require 'fragments/js-content.php'; ?>

</html>
