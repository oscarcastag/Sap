<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SAPApi
 *
 * @author Ing. Bernabe Gutierrez Rodriguez
 */
class SAPApi {

    public function __construct() {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET'://consulta
                echo $action = $_GET['action'];
                $this->consultaExistencias($action);
                break;
            case 'POST'://inserta
                $action = $_POST['action'];
                $this->response(200, "Error", array("auth" => "Action no suported"));
                break;
            case 'PUT'://actualiza
                echo 'PUT';
                break;
            case 'DELETE'://elimina
                echo 'DELETE';
                break;
            default://metodo NO soportado
                echo 'METODO NO SOPORTADO';
                break;
        }
    }

    function consultaExistencias($action) {
        include_once './DatosMaestros.php';
        $request = new DatosMaestros();
        $json = $request->ZwsDataPto("EX", "VM1", "VM01");
        response(200, "Ok", $json);
    }

    function response($code = 200, $status = "", $message = "") {
        header('Content-Type: application/json');
        http_response_code($code);
        if (!empty($status) && !empty($message)) {
            $response = array("status" => $status, "data" => $message);
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

}
