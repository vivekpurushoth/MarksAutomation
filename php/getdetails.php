<?php
session_start();
$name = $_SESSION["uname"];
$passwd = $_SESSION["passwd"];
//$name = 'Malashree';
//$passwd = 'Malashree';
//$passwd = $_GET['password'];
$con = mysql_connect('localhost',''.$name,''.$passwd);
if (!$con)
{
  echo "N";
  //die('Could not connect: ' . mysql_error());
  die();
}
	$na = array();
	$subs = array();
	$student = array();
	$innertemp = array();
	$t = array();
	$stud = array();
	$temp = array();
	mysql_select_db("ciedb", $con);
	$sqlq = ("SELECT * FROM teachers where User_id = '$name'");
	$name1 =mysql_query($sqlq);
	$na = mysql_fetch_array($name1);
	$temp['name'] = $na['Name']; 
	$a = $na['Teacher_id'];
	$sqlq = ("SELECT * FROM teacher_handle where Teacher_id = '".$a."'");
	$res = mysql_query($sqlq);
	$subs = mysql_fetch_array($res);
	
	if($subs['handle_1'] <> NULL)
	{
		$a = $subs['handle_1'];
		$sub = mysql_query("SELECT * FROM subject where Handle_id = '$a'");
		$subject = mysql_fetch_array($sub);
		$temp['subject'][0]['name'] = $subject['Sub_name'];
		$temp['subject'][0]['lab'] = $subject['Lab?'];
		$temp['subject'][0]['course'] = $a;
		$student = mysql_query("SELECT * FROM `$a` WHERE 1");
	
		$i=0;
		$lab = $subject['Lab?'];
		while($stud =  mysql_fetch_array($student))
		{
			if($lab <> 0)
			{
		
				$t['USN'] = $stud['USN'];
				if($stud['Ty_Internal_total'] == NULL)
					$t['Ty_Internal_total'] = '';
				else
					$t['Ty_Internal_total'] = $stud['Ty_Internal_total'];
				if($stud['Ty_Attendance'] == NULL)
					$t['Ty_Attendance'] = '';
				else
					$t['Ty_Attendance'] = $stud['Ty_Attendance'];
				if($stud['Ty_total'] == NULL)
					$t['Ty_total']='';
				else
					$t['Ty_total'] = $stud['Ty_total'];
				if($stud['Lab_Internal_total'] == NULL)
					$t['Lab_Internal_total'] = '';
				else
					$t['Lab_Internal_total'] = $stud['Lab_Internal_total'];
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
				if($stud['Lab_Internal'] == NULL)
					$t['Lab_Internal'] = '';
				else
					$t['Lab_Internal'] = $stud['Lab_Internal'];
				if($stud['Lab_attendance'] == NULL)
					$t['Lab_attendance'] = '';
				else
					$t['Lab_attendance'] = $stud['Lab_attendance'];
			}
			else
			{
				$t['USN'] = $stud['USN'];
				if($stud['Internal'] == NULL)
					$t['Internal'] = '';
				else
					$t['Internal'] = $stud['Internal'];
					
				if($stud['Attendance'] == NULL)
					$t['Attendance'] = '';					
				else
					$t['Attendance'] = $stud['Attendance'];
			
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
				
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
					
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
					
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
					
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
					
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
					
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
					
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
					
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
					
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
				
			}
			$temp['subject'][0]['student'][$i] = $t;
			//$innertemp[$i] = $t;
			$i = $i+1;
		}
	}
	if($subs['handle_2'] <> NULL)
	{
		$a = $subs['handle_2'];
		$sub = mysql_query("SELECT * FROM subject where Handle_id = '$a'");
		$subject = mysql_fetch_array($sub);
		$temp['subject'][1]['name'] = $subject['Sub_name'];
		$temp['subject'][1]['lab'] = $subject['Lab?'];
		$temp['subject'][1]['course'] = $a;
		$student = mysql_query("SELECT * FROM `$a` WHERE 1");	
		$i=0;
		$lab = $subject['Lab?'];
		while($stud =  mysql_fetch_array($student))
		{
			if($lab <> 0)
			{
				$t['USN'] = $stud['USN'];
				if($stud['Ty_Internal_total'] == NULL)
					$t['Ty_Internal_total'] = '';
				else
					$t['Ty_Internal_total'] = $stud['Ty_Internal_total'];
					
				if($stud['Ty_Attendance'] == NULL)
					$t['Ty_Attendance'] = '';
				else
					$t['Ty_Attendance'] = $stud['Ty_Attendance'];
					
				if($stud['Ty_total'] == NULL)
					$t['Ty_total']='';
				else
					$t['Ty_total'] = $stud['Ty_total'];
					
				if($stud['Lab_Internal_total'] == NULL)
					$t['Lab_Internal_total'] = '';
				else
					$t['Lab_Internal_total'] = $stud['Lab_Internal_total'];
					
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
					
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
					
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
					
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
					
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
					
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
				
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
					
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
					
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
					
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
					
				if($stud['Lab_Internal'] == NULL)
					$t['Lab_Internal'] = '';
				else
					$t['Lab_Internal'] = $stud['Lab_Internal'];
					
				if($stud['Lab_attendance'] == NULL)
					$t['Lab_attendance'] = '';
				else
					$t['Lab_attendance'] = $stud['Lab_attendance'];
			
			}
			else
			{	
				$t['USN'] = $stud['USN'];
				if($stud['Internal'] == NULL)
					$t['Internal'] = '';
				else
					$t['Internal'] = $stud['Internal'];
					
				if($stud['Attendance'] == NULL)
					$t['Attendance'] = '';					
				else
					$t['Attendance'] = $stud['Attendance'];
			
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
				
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
					
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
					
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
					
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
					
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
					
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
					
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
					
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
					
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
				
			}
			$temp['subject'][1]['student'][$i] = $t;
			$i = $i+1;
		}
	}
	
	if($subs['handle_3'] <> NULL)
	{
		$a = $subs['handle_3'];
		$sub = mysql_query("SELECT * FROM subject where Handle_id = '$a'");
		$subject = mysql_fetch_array($sub);
		$temp['subject'][2]['name'] = $subject['Sub_name'];
		$temp['subject'][2]['lab'] = $subject['Lab?'];
		$temp['subject'][2]['course'] = $a;
		$student = mysql_query("SELECT * FROM `$a` WHERE 1");
	
		$i=0;
		$lab = $subject['Lab?'];
		while($stud =  mysql_fetch_array($student))
		{
			if($lab <> 0)
			{
						$t['USN'] = $stud['USN'];
				if($stud['Ty_Internal_total'] == NULL)
					$t['Ty_Internal_total'] = '';
				else
					$t['Ty_Internal_total'] = $stud['Ty_Internal_total'];
				if($stud['Ty_Attendance'] == NULL)
					$t['Ty_Attendance'] = '';
				else
					$t['Ty_Attendance'] = $stud['Ty_Attendance'];
				if($stud['Ty_total'] == NULL)
					$t['Ty_total']='';
				else
					$t['Ty_total'] = $stud['Ty_total'];
				if($stud['Lab_Internal_total'] == NULL)
					$t['Lab_Internal_total'] = '';
				else
					$t['Lab_Internal_total'] = $stud['Lab_Internal_total'];
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
				if($stud['Lab_Internal'] == NULL)
					$t['Lab_Internal'] = '';
				else
					$t['Lab_Internal'] = $stud['Lab_Internal'];
				if($stud['Lab_attendance'] == NULL)
					$t['Lab_attendance'] = '';
				else
					$t['Lab_attendance'] = $stud['Lab_attendance'];
			}
			
			else
			{
						$t['USN'] = $stud['USN'];
				if($stud['Internal'] == NULL)
					$t['Internal'] = '';
				else
					$t['Internal'] = $stud['Internal'];
					
				if($stud['Attendance'] == NULL)
					$t['Attendance'] = '';					
				else
					$t['Attendance'] = $stud['Attendance'];
			
				if($stud['Final_CIE'] == NULL)
					$t['Final_CIE'] ='';
				else
					$t['Final_CIE'] = $stud['Final_CIE'];
				
				if($stud['Test_1'] == NULL)
					$t['Test_1'] = '';
				else
					$t['Test_1'] = $stud['Test_1'];
					
				if($stud['Mark_t1'] == NULL)
					$t['Mark_t1'] = '';
				else
					$t['Mark_t1'] = $stud['Mark_t1'];
					
				if($stud['Attendance%_t1'] == NULL)
					$t['Attendance%_t1'] = '';
				else
					$t['Attendance%_t1'] = $stud['Attendance%_t1'];
					
				if($stud['Mark_At1'] == NULL)
					$t['Mark_At1'] = '';
				else
					$t['Mark_At1'] = $stud['Mark_At1'];
					
				if($stud['Test_2'] == NULL)
					$t['Test_2'] ='';
				else
					$t['Test_2'] = $stud['Test_2'];
					
				if($stud['Mark_t2'] == NULL)
					$t['Mark_t2'] = '';
				else
					$t['Mark_t2'] = $stud['Mark_t2'];
					
				if($stud['Attendance%_t2'] == NULL)
					$t['Attendance%_t2'] = '';
				else
					$t['Attendance%_t2'] = $stud['Attendance%_t2'];
					
				if($stud['Mark_At2'] == NULL)
					$t['Mark_At2'] = '';
				else
					$t['Mark_At2'] = $stud['Mark_At2'];
					
				if($stud['Final_attendance%'] == NULL)
					$t['Final_attendance%'] = '';
				else
					$t['Final_attendance%'] = $stud['Final_attendance%'];
				
			
			}
			$temp['subject'][2]['student'][$i] = $t;
			$i = $i+1;
		
		}
	}
	$final = array();
	$final = $temp;
	echo json_encode($final);
	//header("Location:https://localhost/CIE/home.html");
	
// some code*/

?>