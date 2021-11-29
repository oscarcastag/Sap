<?php

session_start();
unset($_SESSION["loggedin"]);
session_destroy();
echo " You are not logged in ";
header("Location: ../index.php");
exit;
?>