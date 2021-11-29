<?php

$errorMSG = "";
//Nombre
if (empty($_POST["Nombre"])) {
    $errorMSG .= "Nombre is required ";
} else {
    $Nombre = $_POST["Nombre"];
}
//Ciudad
if (empty($_POST["Ciudad"])) {
    $errorMSG .= "Ciudad is required ";
} else {
    $Ciudad = $_POST["Ciudad"];
}
//Direccion
if (empty($_POST["Direccion"])) {
    $errorMSG .= "Direccion is required ";
} else {
    $Direccion = $_POST["Direccion"];
}
//CP
if (empty($_POST["CP"])) {
    $errorMSG .= "CP is required ";
} else {
    $CP = $_POST["CP"];
}
//Material
if (empty($_POST["Material"])) {
    $errorMSG .= "Material is required ";
} else {
    $Material = $_POST["Material"];
}
//Cantidad
if (empty($_POST["Cantidad"])) {
    $errorMSG .= "Cantidad is required ";
} else {
    $Cantidad = $_POST["Cantidad"];
}
//Fabrica
if (empty($_POST["Fabrica"])) {
    $errorMSG .= "Fabrica is required ";
} else {
    $Fabrica = $_POST["Fabrica"];
}
//Almacen
if (empty($_POST["Almacen"])) {
    $errorMSG .= "Almacen is required ";
} else {
    $Almacen = $_POST["Almacen"];
}

if ($errorMSG == "") {
    $SOAP_AUTH = array(
        'login' => 'webservice', //define la autenticacion
        'password' => 'webservice',
        'encoding' => 'utf-8',
        "sap-client" => "500",
    );

    $Cabecero = array(
        'item' => array(
            'Mandt' => '500',
            'Ticket' => 100014,
            'Factura' => 'FTT49',
            'DocType' => 'ZVCA',
            'FechaAlta' => '',
            'SalesOrg' => 1000,
            'DistrChan' => 15,
            'Division' => '0A',
            'SalesOff' => 'VM01',
            'PurchNoC' => 'GRUPO 1',
            'Pmnttrms' => 'NCON',
            'PartnRole' => '',
            'PartnNumb' => '112751',
            'Country' => '',
            'Langu' => '',
            'Name' => $Nombre,
            'City' => $Ciudad,
            'Street' => $Direccion,
            'PostlCode' => $CP,
            'Status' => '',
            'Registros' => '1',
            'FechaCurrent' => '2018-01-18',
            'PedidoSap' => '1',
            'EntregaSap' => '',
            'FacturaSap' => '',
            'Tipoerror' => ''
        ),
    );

    $Detalle = array(
        'item' => array(
            'Mandt' => '500',
            'Ticket' => 100014,
            'Factura' => 'FTT49',
            'DocType' => 'ZVCA',
            'ItmNumber' => '000001',
            'Material' => $Material,
            'Plant' => $Fabrica,
            'StoreLoc' => $Almacen,
            'ReqQty' => $Cantidad,
            'SalesUnit' => 'M',
            'Kbetr' => '1',
            'Lote' => '1'
        ),
    );

    try {
        $wsdl_url = 'http://s4qa:8000/sap/bc/srt/wsdl/flv_10002A101AD1/bndg_url/sap/bc/srt/rfc/sap/zws_crea_pedido/500/zws_crea_pedido/zws_crea_pedido?sap-client=500';
        $client = new SOAPClient($wsdl_url, $SOAP_AUTH);
        $params = array(
            'EtError' => array(
                'item' => array(),
            ),
            'EtPosCabecero' => $Cabecero,
            'EtPosDetalle' => $Detalle,
            'ItPosCabecero' => '',
            'ItPosDetalle' => '',
        );
        $return = $client->ZwsPosPedido($params);

        $requestSap = array("data"=> $return);
        header('Content-Type: application/json');
        echo json_encode($requestSap, JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        echo "Exception occured: " . $e;
        //response("Exception occured: " . $e);
    }
} else {
    echo $errorMSG;
}

function response($message = "") {
    header('Content-Type: application/json');
    echo json_encode($message, JSON_PRETTY_PRINT);
}
