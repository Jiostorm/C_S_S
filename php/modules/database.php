<?php

class MyDatabase{
  private static $dbhost = "localhost";
  private static $dbuser = "root";
  private static $dbpass = "";
  private static $dbname = "dbsectioning";
  private static $charset = "utf8mb4";

  public static function connect(){
    try{
      $pdo = new PDO("mysql:host=".self::$dbhost.";dbname=".self::$dbname.";charset=".self::$charset.";", self::$dbuser, self::$dbpass);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    } catch(PDOException $e){
      echo "Error Occured: ".$e->errorMessage();
    }
  }
}
?>
