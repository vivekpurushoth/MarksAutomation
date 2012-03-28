<?php
session_start();
$name = $_POST['username'];
$passwd = $_POST['password'];
$_SESSION['uname']=$name;
$_SESSION['passwd']=$passwd;
$con = mysql_connect('localhost',''.$name,''.$passwd);
if (!$con)
{
	echo "N";
	//die('Could not connect: ' . mysql_error());
}
else
{
	echo "Y";
}

//session_destroy();
?>