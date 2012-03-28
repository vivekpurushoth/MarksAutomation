<?php
session_start();
session_destroy();
header("Location:http://localhost/CIE/login.html");
?>