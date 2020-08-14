<?php
  if(isset($_POST['login'])){
    require 'database.php';

    $connection = MyDatabase::connect();

    $username = $_POST['user'];
    $password = $_POST['pass'];

    if(!empty($username) or !empty($password)){

      $query = "SELECT * FROM tbsignup WHERE Username = '{$username}'";

      $queryset = $connection -> prepare($query);
      $queryset -> execute();

      $records = $queryset -> fetchAll();
      foreach ($records as $record){
        if(password_verify($password, $record['Password'])){
          session_start();
          $_SESSION['username'] = $record['Username'];
          $_SESSION['type'] = $record['Type'];
          echo '../php/index.php?login=success';
          exit();
        }
      }
      echo '../php/index.php?login=failed';
    } else {
      echo '../php/';
      exit();
    }

  } else if(isset($_POST['signup'])) {
    require 'database.php';

    $connection = MyDatabase::connect();

    $username = $_POST['user'];
    $email = $_POST['email'];
    $firstname = $_POST['fname'];
    $lastname = $_POST['lname'];
    $password = $_POST['pass'];
    $type = $_POST['type'];

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      echo '?email=invalid';
      exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO tbsignup VALUES('{$username}', '{$email}', '{$firstname}', '{$lastname}', '{$hashedPassword}', '{$type}')";

    $queryset = $connection -> prepare($query);
    $queryset -> execute();

    echo '../php/index.php?signup=success';
    exit();
  } else {
    echo '../php/';
    exit();
  }
?>
