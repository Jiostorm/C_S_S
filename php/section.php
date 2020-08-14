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
  <link rel="stylesheet" href="../css/section.css">
  <title> Sections </title>
</head>

<body>
  <input id="session-holder" type="hidden" value="<?php echo $_SESSION['username'].",".$_SESSION['type'] ?>">
  <?php require 'fragments/navbar.php'; ?>

  <div class="outer-container">
    <div class="main-container">

      <div class="left-container">
        <div class="container-fluid">
          <div class="card-body bg-main-color">
            <div class="card-title">
              <center>
                <h3> List of Section </h3>
              </center>
            </div>

            <div class="card-body">
              <p><input class="form-control" id="txtfilter" type="text" value="" placeholder="Search here:"></p>

              <div id="table-section-alert" class="alert alert-danger init-alert" role="alert">

              </div>
            </div>

            <div id="table-section-container" class="card-body">
              <table class="table table-borderless table-striped table-hover table-active">
                <thead class="thead-color">
                  <tr>
                    <th class="text-center"> # </th>
                    <th class="text-center"> Name of Section </th>
                  </tr>
                </thead>
                <tbody id="section-table">

                </tbody>
              </table>
            </div>

            <div class="card-footer">
              <button id="btnadd-section" class="form-control btn btn-outline-light btn-sm" type="button"> <i class="fa fa-plus"></i> Add Section <i class="fa fa-plus"></i> </button>
            </div>

            <div id="section-page-container" class="container-fluid">
              <ul id="section-pagination" class="pagination section-pagination pagination-sm justify-content-center">
                <li class="page-item" id="back-page-section">
                  <a class="page-link" href="javascript:void(0)"> &laquo; </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================================================================================================================================== -->

      <div id="right" class="right-container">

        <div id="section-info-container" class="container-fluid">
          <div class="card-body bg-main-color">
            <div class="card-header">
              <center>
                <h4> Information About the Section </h4>
              </center>
            </div>

            <div class="card-body">
              <table class="table table-borderless table-striped table-hover">
                <thead class="thead-color">
                  <tr>
                    <th class="text-center"> Name of Section </th>
                    <th class="text-center"> Adviser </th>
                    <th class="text-center"> Specialization </th>
                    <th class="text-center"> Designated Room </th>
                    <th class="text-center"> Action </th>
                  </tr>
                </thead>
                <tbody id="section-info-table">

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="section-student-container" class="container-fluid">
          <div class="card-body bg-main-color">
            <div class="card-header">
              <center>
                <h4> Assigned Students in this Section </h4>
              </center>
            </div>

            <div class="card-body mb-4">
              <div id="input-container" class="input-group justify-content-between">
                <div class="input-group-prepend">

                  <select id="cbosearch" class="custom-select w-200 select-style" name="">
                    <option value="" selected> Search Option: </option>
                    <option value="First_Name"> First Name </option>
                    <option value="Last_Name"> Last Name </option>
                    <option value="Barangay"> Barangay </option>
                    <option value="Municipality"> Municipality </option>
                  </select>

                </div>
                <input class="form-control" id="txtsearch" type="text" value="" placeholder="Search here:">
              </div>
              <p>
                <div id="table-section-student-alert" class="alert alert-danger init-alert" role="alert">

                </div>
              </p>
            </div>


            <div id="table-section-student-container" class="card-body">
              <table class="table table-borderless table-striped table-hover table-active">
                <thead class="thead-color">
                  <tr>
                    <th class="text-center"> # </th>
                    <th class="text-left"> Name of Student </th>
                    <th class="text-center"> Age </th>
                    <th class="text-center"> Gender </th>
                    <th class="text-center"> Permanent Address </th>
                    <th class="text-center"> Status </th>
                    <th class="text-center"> Action </th>
                  </tr>
                </thead>
                <tbody id="section-student-table">

                </tbody>
              </table>
              <div id="student-page-container" class="container-fluid">
                <ul id="student-pagination" class="pagination student-pagination pagination-sm justify-content-center">
                  <li class="page-item" id="back-page-student">
                    <a class="page-link" href="javascript:void(0)"> &laquo; </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

  <?php //require 'fragments/footer.php'; ?>
</body>

<?php require 'fragments/modals.php' ?>

<?php require 'fragments/js-content.php' ?>

<script type="text/javascript" src="../js/section.js" charset="utf-8"></script>

</html>
