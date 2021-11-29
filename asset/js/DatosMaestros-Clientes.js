/*
 * Consulta catalogo de Lote
 * Despliega el resultado en una table
 * al seleccionar una fila de la tabla llena los inputs del form
 * con los datos del la moneda seleccionado
 */


//$(document).ready(function () {
//    if (localStorage.getItem("arrayClientes") === null) {
//        console.log('No hay Clientes en buffer');
//        ajaxClient();
//    } else {
//        var clientes = JSON.parse(localStorage.getItem("arrayClientes"));
//        var is = isJSON(clientes);
//        if (is) {
//            console.log('Clientes en buffer');
//            arrayCliente();
//        } else {
//            console.log('Json Clientes con error');
//            //getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
//        }
//    }
//
//});
$(document).ready(function () {
    ajaxClient();
});

function arrayCliente() {
    var serverRequest = localStorage.getItem("arrayClientes");
    var myObj = JSON.parse(serverRequest);
    //var date = Object.keys(myObj.data.EtBusinesspData.item).length;
    var date = myObj.data.EtBusinesspData.item;
    var txt = "";
    console.log(date);
    txt += '<div class="table-responsive"> <table id="3x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
    txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Nombre</th> <th>Almacen</th><th>Calle</th><th>Colonia</th><th>Ciudad</th><th>Edo</th><th>País</th><th>CP</th><th>Phone</th><th>Fecha</th><th>Vkbur</th></tr> </thead>';
    for (x in date) {
        txt += "<tr><td>" + date[x].Kunnr + "</td>";
        txt += "<td>" + date[x].Name1 + "</td>";
        txt += "<td>" + date[x].Stcd1 + "</td>";
        txt += "<td>" + date[x].Ort02 + "</td>";
        txt += "<td>" + date[x].Stras + "</td>";
        txt += "<td>" + date[x].Mcod3 + "</td>";
        txt += "<td>" + date[x].Regio + "</td>";
        txt += "<td>" + date[x].Land1 + "</td>";
        txt += "<td>" + date[x].Pstlz + "</td>";
        txt += "<td>" + date[x].Telf1 + "</td>";
        txt += "<td>" + date[x].Erdat + "</td>";
        txt += "<td>" + date[x].Altkn + "</td></tr>";
    }
    txt += "</table> </div>"
    document.getElementById("loadTableLote").innerHTML = txt;
    var table = $('#3x').DataTable({responsive: true});

    $('#3x tbody').on('click', 'tr', function () {
        var datos = table.row(this).data();
        //alert(datos[0]);
    });
}

function ajaxClient() {
    $("#loadTableLote").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        //url: "BAckEndSAP/Clientes.php",
        url: "json/clientes.json",
		
        data: "action=Ex",
        success: function (text) {
            //console.log(text);
            console.log(text.data);
            //var date = text.data.EtBusinesspData.item;
            var date = text.data;
            var txt = "";            
            console.log(date);
            txt += '<div class="table-responsive"> <table id="3x" class="table table-striped table-bordered table-hover">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Nombre</th> <th>Almacen</th><th>Calle</th><th>Colonia</th><th>Ciudad</th><th>Edo</th><th>País</th><th>CP</th><th>Phone</th><th>Fecha</th><th>Vkbur</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].Mandt + "</td>";
                txt += "<td>" + date[x].Cliente + "</td>";
                txt += "<td>" + date[x].DocType + "</td>";
                txt += "<td>" + date[x].Direccion + "</td>";
                txt += "<td>" + date[x].Ciudad + "</td>";
                txt += "<td>" + date[x].Factura + "</td>";
                txt += "<td>" + date[x].Ticket + "</td>";
                txt += "<td>" + date[x].CP + "</td>";
                txt += "<td>" + date[x].Material + "</td>";
                txt += "<td>" + date[x].FechaCurrent + "</td>";
                txt += "<td>" + date[x].PartnNumb + "</td>";
                txt += "<td>" + date[x].Estatus + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("loadTableLote").innerHTML = txt;
            var table = $('#3x').DataTable();

            $('#3x tbody').on('click', 'tr', function () {
                var datos = table.row(this).data();
                //alert(datos[0]);
                //$("#Almacen").val(datos[0]);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            alert("No fue posible conectar con el servidor");
            document.getElementById("loadTableLote").innerHTML = errorThrown;
        }
    });
}


/**
 * @param Object
 * @returns boolean
 */
function isJSON(something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}
