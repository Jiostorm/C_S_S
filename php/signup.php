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
  <title> Signup </title>
</head>

<body>
  <?php require 'fragments/navbar.php'; ?>

  <div class="container text-center">
    <div class="card card-color">

      <div class="card-header">
        <h3> Signup Form </h3>
      </div>

      <div class="card-body">
        <form id="signup-form" class="" method="post" autocomplete="off">
          <p> <input id="inpuser-signup" class="form-control" type="text" name="" placeholder="Username" title="Enter a Valid Username"> </p>
          <p> <input id="inpemail-signup" class="form-control" type="text" name="" placeholder="Email" title="Enter a Valid Email"> </p>
          <p> <input id="inpfname-signup" class="form-control" type="text" name="" placeholder="First Name" title="Enter a Valid First Name"> </p>
          <p> <input id="inplname-signup" class="form-control" type="text" name="" placeholder="Last Name" title="Enter a Valid Last Name"> </p>
          <p> <input id="inppass-signup" class="form-control" type="password" name="" placeholder="Password" title="Enter a Valid Password"> </p>
          <p> <input id="inprepass-signup" class="form-control" type="password" name="" placeholder="Re-type Password" title="Password did not Matched!"> </p>
          <p> <select id="cbousertype" class="custom-select select-style" name="" title="Select a Valid Account Type">
            <option value="" selected disabled hidden> Account Type: </option>
            <option value="Admin"> Admin </option>
            <option value="Local"> Local </option>
          </select> </p>

          <button id="btnsignup-user" class="form-control btn btn-outline-light btn-sm" type="submit" name="btnsignup-user" value="signup"> <i class="fa fa-stamp"></i> Sign Me Up! <i class="fa fa-stamp"></i> </button>
        </form>
      </div>
    </div>
  </div>

  <?php //require 'fragments/footer.php'; ?>
</body>

<?php require 'fragments/js-content.php'; ?>

</html>
