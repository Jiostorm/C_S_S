<?php
  if(isset($_POST['approval']) and $_POST['approval'] == "approved"){
    require_once 'database.php';

    $connection = MyDatabase::connect();

    $query = $_POST['query'];
    $method = $_POST['method'];

    $queryset = $connection -> prepare($query);
    $queryset -> execute();

    if($method == "RETRIEVE"){
      $recordarray = $queryset -> fetchAll();
      echo json_encode($recordarray);
    } else if($method == "COUNT"){
      $recordarray = $queryset -> rowCount();
      echo json_encode($recordarray);
    }else {
      echo json_encode("Successful");
    }
  }
?>
