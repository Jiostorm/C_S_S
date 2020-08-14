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
  <title> Dashboard </title>
</head>

<body>
  <?php require 'fragments/navbar.php'; ?>

  <div class="outer-container">

    <div class="container-fluid">
      <div class="jumbotron container-fluid text-center">
        <h1 class="display-4"> <i class="fa fa-hdd"></i> SHS Sectioning System Dashboard </h1>

        <div class="card-deck">

          <div class="card">
            <div class="card-body">
              <span>
                <h3 class="card-title"> <strong> Total Students </strong> </h3>
              </span>
              <span class="fas fa-stack fa-3x">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-users fa-stack-1x fa-inverse"></i>
              </span>
              <span>
                <h4 id="lblstudentlist"> <strong> 0 </strong> </h4>
              </span>
            </div>
            <div class="card-footer">
              <a href="student.php"><button type="button" class="btn btn-outline-dark btn-sm"> View Details </button></a>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <span>
                <h3 class="card-title"> <strong> Total Sections </strong> </h3>
              </span>
              <span class="fas fa-stack fa-3x">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-address-book fa-stack-1x fa-inverse"></i>
              </span>
              <span>
                <h4 id="lblsectionlist"> <strong> 0 </strong> </h4>
              </span>
            </div>
            <?php if($_SESSION['type'] == "Admin"){ ?>
            <div class="card-footer">
              <a href="section.php"><button type="button" class="btn btn-outline-dark btn-sm"> View Details </button></a>
            </div>
            <?php } ?>
          </div>

          <div class="card">
            <div class="card-body">
              <span>
                <h3 class="card-title"> <strong> Total Teachers </strong> </h3>
              </span>
              <span class="fas fa-stack fa-3x">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-chalkboard fa-stack-1x fa-inverse"></i>
              </span>
              <span>
                <h4 id="lblteacherlist"> <strong> 0 </strong> </h4>
              </span>
            </div>
            <?php if($_SESSION['type'] == "Admin"){ ?>
              <div class="card-footer">
                <a href="adviser.php"><button type="button" class="btn btn-outline-dark btn-sm"> View Details </button></a>
              </div>
            <?php } ?>
          </div>

          <div class="card">
            <div class="card-body">
              <span>
                <h3 class="card-title"> <strong> Total Specializations </strong> </h3>
              </span>
              <span class="fas fa-stack fa-3x">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-book-reader fa-stack-1x fa-inverse"></i>
              </span>
              <span>
                <h4 id="lblspecializationlist"> <strong> 0 </strong> </h4>
              </span>
            </div>
            <?php if($_SESSION['type'] == "Admin"){ ?>
              <div class="card-footer">
                <a href="specialization.php"><button type="button" class="btn btn-outline-dark btn-sm"> View Details </button></a>
              </div>
            <?php } ?>
          </div>

          <div class="card">
            <div class="card-body">
              <span>
                <h3 class="card-title"> <strong> Total Rooms </strong> </h3>
              </span>
              <span class="fas fa-stack fa-3x">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-warehouse fa-stack-1x fa-inverse"></i>
              </span>
              <span>
                <h4 id="lblroomlist"> <strong> 0 </strong> </h4>
              </span>
            </div>
            <?php if($_SESSION['type'] == "Admin"){ ?>
              <div class="card-footer">
                <a href="room.php"><button type="button" class="btn btn-outline-dark btn-sm"> View Details </button></a>
              </div>
            <?php } ?>
          </div>

        </div>

      </div>

    </div>

  </div>

  <?php require 'fragments/footer.php'; ?>
</body>

<?php require 'fragments/js-content.php'; ?>
<script type="text/javascript" src="../js/dashboard.js" charset="utf-8"></script>

</html>
