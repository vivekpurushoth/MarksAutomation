<?php
$json = '{"a":"hi","baa":"a;sdflkj;asdlfjk;asdlfkj","c":0,"d":4,"e":5}';
$work = json_decode($json);
echo $work->{"a"}.'<br />';
if($work->{"c"}==0)
{
	echo "It is equal to zero";
}
else
{
}
//var_dump(json_decode($json));
//var_dump(json_decode($json, true));