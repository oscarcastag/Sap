<?php

$errorMSG = "";
//Mandt
if (empty($_POST["Mandt"])) {
    $errorMSG = "Mandt is required ";
} else {
    $Mandt = $_POST["Mandt"];
}
//Cliente
if (empty($_POST["Cliente"])) {
    $errorMSG .= "Cliente is required ";
} else {
    $Cliente = $_POST["Cliente"];
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
//Factura
if (empty($_POST["Factura"])) {
    $errorMSG .= "Factura is required ";
} else {
    $Factura = $_POST["Factura"];
}
//Ticket
if (empty($_POST["Ticket"])) {
    $errorMSG .= "Ticket is required ";
} else {
    $Ticket = $_POST["Ticket"];
}
//DocType
if (empty($_POST["DocType"])) {
    $errorMSG .= "DocType is required ";
} else {
    $DoctType = $_POST["DocType"];
}
//DocType
if (empty($_POST["DocType"])) {
    $errorMSG .= "DocType is required ";
} else {
    $DocType = $_POST["DocType"];
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
//DistrChan
if (empty($_POST["DistrChan"])) {
    $errorMSG .= "DistrChan is required ";
} else {
    $DistrChan = $_POST["DistrChan"];
}
//Division
if (empty($_POST["Division"])) {
    $errorMSG .= "Division is required ";
} else {
    $Division = $_POST["Division"];
}
//FechaCurrent
if (empty($_POST["FechaCurrent"])) {
    $errorMSG .= "FechaCurrent is required ";
} else {
    $FechaCurrent = $_POST["FechaCurrent"];
}
//SalesUnit
if (empty($_POST["SalesUnit"])) {
    $errorMSG .= "SalesUnit is required ";
} else {
    $SalesUnit = $_POST["SalesUnit"];
}
//PartnNumb
if (empty($_POST["PartnNumb"])) {
    $errorMSG .= "PartnNumb is required ";
} else {
    $PartnNumb = $_POST["PartnNumb"];
}
//PedidoSap
if (empty($_POST["PedidoSap"])) {
    $errorMSG .= "PedidoSap is required ";
} else {
    $PedidoSap = $_POST["PedidoSap"];
}
//PurchNoC
if (empty($_POST["PurchNoC"])) {
    $errorMSG .= "PurchNoC is required ";
} else {
    $PurchNoC = $_POST["PurchNoC"];
}
//Registros
if (empty($_POST["Registros"])) {
    $errorMSG .= "Registros is required ";
} else {
    $Registros = $_POST["Registros"];
}



// redirect to success page
if ($errorMSG == ""){
      history_request($Mandt, $Cliente, $Ciudad, $Direccion, $CP, $Factura, $Ticket, $DocType, $Material, $Cantidad, $SalesUnit, $Fabrica, $Almacen, $DistrChan, $Division, $FechaCurrent, $PartnNumb, $PedidoSap, $PurchNoC, $Registros);
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

function history_request($Mandt, $Cliente, $Ciudad, $Direccion, $CP, $Factura, $Ticket, $DocType, $Material, $Cantidad, $SalesUnit, $Fabrica, $Almacen, $DistrChan, $Division, $FechaCurrent, $PartnNumb, $PedidoSap, $PurchNoC, $Registros) {
    $DataRequest = [
        [
            "Mandt" => $Mandt,
            "Cliente" => $Cliente,
            "Ciudad" => $Ciudad,
            "Direccion" => $Direccion,
            "CP" => $CP,
            "Factura" => $Factura,
            "Ticket" => $Ticket,
            "DocType" => $DocType,
            "Material" => $Material,
            "Cantidad" => $Cantidad,
            "SalesUnit" => $SalesUnit,
            "Fabrica" => $Fabrica,
            "Almacen" => $Almacen,
            "DistrChan" => $DistrChan,
            "Division" => $Division,
            "FechaCurrent" => $FechaCurrent,
            "PartnNumb" => $PartnNumb,
            "PedidoSap" => $PedidoSap,
            "PurchNoC" => $PurchNoC,
            "Registros" => $Registros,
            "Estatus" => "Pendiente",
            "FechaSolic" => date("Y-m-d"),
        ]
    ];
    // Convert Array to JSON String
    $someJSON = json_encode($DataRequest, JSON_UNESCAPED_UNICODE);
    //echo $someJSON;
    $nombre_archivo = 'SaveRequestSapJson.json';
    $contenido = $someJSON;
    try {
        // Primero vamos a asegurarnos de que el archivo existe y es escribible.
        if (is_writable($nombre_archivo)) {
            // En nuestro ejemplo estamos abriendo $nombre_archivo en modo de adición.
            // El puntero al archivo está al final del archivo
            // donde irá $contenido cuando usemos fwrite() sobre él.
            if (!$gestor = fopen($nombre_archivo, 'a')) {
                //echo "No se puede abrir el archivo ($nombre_archivo)";
                exit;
            }
            // Escribir $contenido a nuestro archivo abierto.
            //Sin truncar contenido previo
            if (fwrite($gestor, $contenido) === FALSE) {
                //echo "No se puede escribir en el archivo ($nombre_archivo)";
                //No existe el archivo
                exit;
            }
            //echo "Éxito, se escribió ($contenido) en el archivo ($nombre_archivo)";
            fclose($gestor);
        } else {
            //Si no existe Crea un archivo nuevo
            $NewJsonHistory = fopen("SaveRequestSapJson.json", "w") or die("Unable to open file!");
            //Escribimos el contenido
            fwrite($NewJsonHistory, $someJSON);
            fclose($NewJsonHistory);
            //echo 'se creo archivo';
        }
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
    try {
        /*
         * Reemplaza ][ por , para que el json resultante no tenga errores
         * abrimos history_request.json original
         */
        $text_replace = fopen("SaveRequestSapJson.json", "r") or die("Unable to open file!");
        $jsonoriginal = fread($text_replace, filesize("SaveRequestSapJson.json"));
        fclose($text_replace);
        //Lee el texto y reemplaza ][ por ,
        $resultado = str_replace("}][{", "},{", $jsonoriginal, $contador);
        $replaceJsonParse = fopen("SaveRequestSapJson.json", "w") or die("Unable to open file!");
        fwrite($replaceJsonParse, $resultado);
        fclose($replaceJsonParse);
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}
