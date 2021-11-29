<?php
include './session.php';
$obj = file_get_contents("SaveRequestSapJson.json");
$array = json_decode($obj);
$data = array('data'=>$array);
header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);
