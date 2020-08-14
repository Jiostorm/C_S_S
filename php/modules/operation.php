<?php
require 'database.php';
$pdo = MyDatabase::connect();
$operation=$_POST['operation'];

switch($operation){

        case "GET_ALL_RECORD":
            $sql=$_POST['sql'];
            $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $q = $pdo -> prepare ($sql);
            $q ->execute ();
            $result = $q->fetchAll();
            echo json_encode ($result);
            break;
        case "ADD_RECORD":
        case "DELETE_RECORD":
        case "EDIT_RECORD":
            $sql = $_POST['sql'];
            $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $q = $pdo -> prepare ($sql);
            $q ->execute ();
            echo json_encode ("Success");
            break;
        case "COUNT_RECORD":
            $sql=$_POST['sql'];
            $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $q = $pdo -> prepare ($sql);
            $q ->execute ();
            echo json_encode ($q->rowCount());
            break;
}
?>
