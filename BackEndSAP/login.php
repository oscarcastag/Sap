<?php

$errorMSG = "";
//Nombre
if (empty($_POST["usuario"])) {
    $errorMSG .= "usuario is required ";
} else {
    $usuario = $_POST["usuario"];
}
//Nombre
if (empty($_POST["Password"])) {
    $errorMSG .= "Password is required ";
} else {
    $Password = $_POST["Password"];
}

if ($errorMSG == "") {
    if ($usuario == "Focus" && $Password == "focus") {
        print_r("success");
        // Start the session
        session_start();
        $_SESSION['loggedin'] = true;
        $_SESSION['start'] = time();
        $_SESSION['expire'] = $_SESSION['start'] + (60 * 30);
    } else {
        print_r("Datos Incorrectos");
    }
} else {
    if ($errorMSG == "") {
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}