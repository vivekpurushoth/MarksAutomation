<?php
session_start();
$name = $_SESSION["uname"];
$passwd = $_SESSION["passwd"];
$con = mysql_connect('localhost',''.$name,''.$passwd);
if (!$con)
{
  echo "N";
  //die('Could not connect: ' . mysql_error());
  die();
}


?>
