<?php

session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {

} else {
    echo " You are not logged in ";
    header("Location: index.php");
    exit;
}

$now = time();
//si el tiempo de la session se ha excedido termina
if ($now > $_SESSION['expire']) {
    session_destroy();
    echo " You are not logged in ";
    header("Location: index.php");
    exit;
}
?>