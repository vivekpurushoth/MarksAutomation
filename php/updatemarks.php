<?php

session_start();
$name = $_SESSION["uname"];
$passwd = $_SESSION["passwd"];
$con = mysql_connect('localhost',''.$name,''.$passwd);
mysql_select_db("ciedb",$con);
$table = $_POST['table'];
$subtab = $_POST['subtab'];
$update = $_POST["jsonMarks"];
$a = $table;
$data1 = json_decode($update);
if($subtab == 1) {
foreach($data1 as $data) {
$sql=("UPDATE `ciedb`.`$a` SET `Test_1` = '$data->col2',`Attendance%_t1` = '$data->col3' WHERE `$a`.`USN` = '$data->usn';");
echo $data->col2;
echo $data->col3;
if (mysql_query($sql)) {
echo "success";}
}
}
else if($subtab == 2) {
foreach($data1 as $data) {
$sql=("UPDATE `ciedb`.`$a` SET `Test_2` = '$data->col2',`Attendance%_t2` = '$data->col3' WHERE `$a`.`USN` = '$data->usn';");
if (!($result=mysql_query($sql,$con))) {
die('Error: ' . mysql_error());
}
}
}
else if($subtab == 3) {
foreach($data1 as $data) {
$sql=("UPDATE `ciedb`.`$a` SET `Lab_Internal` = '$data->col2',`Lab_attendance` = '$data->col3' WHERE `$a`.`USN` = '$data->usn';");
//$sql='UPDATE `ciedb`.`$table` SET `Lab_Internal` = $data->col2,`Lab_attendance` = $data->col3 WHERE `09cs303-5-b`.`USN` = $data->usn';
if (!($result=mysql_query($sql,$con))) {
die('Error: ' . mysql_error());
}
}
}
else if($subtab == 4) {
foreach($data1 as $data) {
$sql=("UPDATE `ciedb`.`$a` SET `Ty_Attendance` = '$data->col3' WHERE `$a`.`USN` = '$data->usn';");
//$sql='UPDATE `ciedb`.`$table` SET `Final_attendance%` = $data->col3 WHERE `09cs303-5-b`.`USN` = $data->usn';
if (!($result=mysql_query($sql,$con))) {
die('Error: ' . mysql_error());
}
}
}
echo "successful";
?>