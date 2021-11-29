<?php

/*
 * CONSULTA EXISTENCIAS DE DATOS MAESTROS DE SAP
 * 20/12/2018
 * ING. BERNABE GUTIERREZ RODRIGUEZ
 */

class DatosMaestros {

    public function ZwsDataPto($Opcion, $Almacen, $Sucursal) {



        $SOAP_AUTH = array(
            'login' => 'webservice', //define la autenticacion
            'password' => 'webservice',
            'encoding' => 'utf-8',
            "sap-client" => "500",
        );


        try {
            $wsdl_url = 'http://s4qa:8000/sap/bc/srt/wsdl/flv_10002A101AD1/bndg_url/sap/bc/srt/rfc/sap/zws_datos_maestros/500/zws_datos_maestros/zws_datos_maestros?sap-client=500';
            $client = new SOAPClient($wsdl_url, $SOAP_AUTH);
            $params = array(
                //'EX' => "EXISTENCIAS",
                //'EXISTENCIAS' => "EX",
                'EtBusinesspData' => "",
                'EtItemData' => "",
                'EtPricebpData' => "",
                'EtPricematData' => "",
                'EtPricesucData' => "",
                'EtStock' => "",
                'EtStockLote' => "",
                'Opcion' => $Opcion,
                'PAlmacen' => $Almacen,
                'PSucursal' => $Sucursal //WERK fabrica
            );

//    echo "<pre>";
//    print_r($client->__getTypes());
//    echo "</pre>";
//    echo '<pre>' . json_encode($client->__getFunctions(), JSON_PRETTY_PRINT) . '</pre>';
            $return = $client->ZwsDataPto($params);
//            echo "<pre>";
//            print_r($return);
//            echo "</pre>";

            return $return;
        } catch (Exception $e) {
            return "Exception occured: " . $e;
        }
    }

}

$request = new DatosMaestros();

$json = $request->ZwsDataPto("BP", "VM1", "VM01");

//print_r(json_encode($json, JSON_PRETTY_PRINT));

response(200, "Ok", $json);

function response($code = 200, $status = "", $message = "") {
    header('Content-Type: application/json');
    http_response_code($code);
    if (!empty($status) && !empty($message)) {
        $response = array("status" => $status, "data" => $message);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}
