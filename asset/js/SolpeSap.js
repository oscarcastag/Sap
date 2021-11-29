$("#regForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos  requeridos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var Nombre = $("#Nombre").val();
    //console.log(Nombre);
    var Ciudad = $("#Ciudad").val();
    // console.log(Ciudad);
    var Direccion = $("#Direccion").val();
    //console.log(Direccion);
    var CP = $("#CP").val();
    //console.log(CP);
    var Material = $("#Material").val();
    // console.log(Material);
    var Cantidad = $("#Cantidad").val();
    // console.log(Cantidad);
    var Fabrica = $("#Fabrica").val();
    //console.log(Fabrica);
    var Almacen = $("#Almacen").val();
    //console.log(Almacen);
    
    
    if (Cantidad > 10) {
        Swal({
            title: 'Error!',
            text: "MATERIAL CON EXISTENCIAS INSUFICIENTES!!",
            type: 'warning',
            confirmButtonText: 'Cerrar'
        })
    } else {
        SaveRequesSapJson(Nombre, Ciudad, Direccion, CP, Material, Cantidad);
        nextPrev(-1);
        Swal({
            title: 'Exito!',
            text: "REGISTRO AGREGADO CON EXITO!!",
            type: 'success',
            confirmButtonText: 'Cerrar'
        })
        formSuccess("");
    }

//    $.ajax({
//        type: "POST",
//        url: "BackEndSAP/SolpeSap.php",
//        data: "Nombre=" + Nombre + "&Ciudad=" + Ciudad
//                + "&Direccion=" + Direccion + "&CP=" + CP
//                + "&Material=" + Material + "&Cantidad=" + Cantidad
//                + "&Fabrica=" + Fabrica + "&Almacen=" + Almacen,
//        success: function (text) {
//            //console.log(text);
//            //console.log(text.data.EtError.item);
//            var requestSap = text.data.EtError.item;
//            if (requestSap.Znoerror == "00") {
//                SaveRequesSapJson(text);
//                var partida = text.data.EtPosDetalle.item;
//                //imprimePartida(partida);
//                //formSuccess(requestSap.Zerror);
//                nextPrev(-1);
//                Swal({
//                    title: 'Exito!',
//                    text: requestSap.Zerror,
//                    type: 'success',
//                    confirmButtonText: 'Cerrar'
//                })
//            } else {
//                formError();
//                var msgClasses = "h3 text-center text-danger";
//                //submitMSG(false, requestSap.Zerror);
//                //$("#msgSubmit").removeClass().addClass(msgClasses).html(requestSap[0].Zerror);
//                Swal({
//                    title: 'Error!',
//                    text: requestSap[0].Zerror,
//                    type: 'error',
//                    confirmButtonText: 'Cerrar'
//                })
//            }
//        }
//    });
}

function SaveRequesSapJson(clie, ciu, dir, cod, mat, cant) {
    //var Cabecero = Array.data.EtPosCabecero.item;
    //var Detalle = Array.data.EtPosDetalle.item;

    //console.log(Detalle);
    //console.log(Cabecero);

    var Mandt = "500";
    var Cliente = clie;
    var Ciudad = ciu;
    var Direccion = dir;
    var CP = cod;
    var Factura = "FTT49";
    var Ticket = "100014";
    var DocType = "ZVCA";
    var Material = mat;
    var Cantidad = cant;
    var Fabrica = "VM01";
    var Almacen = "VM1";
    var DistrChan = "15";
    var Division = "0A";
    var FechaCurrent = "18/02/2018";
    var SalesUnit = "PZA";
    var PartnNumb = "112751";
    var PedidoSap = "C1"
    var PurchNoC = "GRUPO 1";
    var Registros = "1";

    $.ajax({
        type: "POST",
        url: "BackEndSAP/SaveRequesSapJson.php",
        data: "Mandt=" + Mandt + "&Ciudad=" + Ciudad
                + "&Direccion=" + Direccion + "&CP=" + CP
                + "&Material=" + Material + "&Cantidad=" + Cantidad
                + "&Fabrica=" + Fabrica + "&Almacen=" + Almacen
                + "&Cliente=" + Cliente + "&Factura=" + Factura + "&Ticket=" + Ticket
                + "&DocType=" + DocType + "&DistrChan=" + DistrChan + "&Division=" + Division
                + "&SalesUnit=" + SalesUnit + "&PartnNumb=" + PartnNumb + "&PedidoSap=" + PedidoSap
                + "&PurchNoC=" + PurchNoC + "&Registros=" + Registros + "&FechaCurrent=" + FechaCurrent,
        success: function (text) {
            console.log(text);
        }
    });
}

function imprimePartida(partida) {
    //console.log(partida);
    var txt = "";
    txt += '<div class="card"><div class="card-header"><h5>Detalle de la Solicitud</h5><span>Visualización de las entradas existentes</span></div> <div class="card-block">';
    txt += '<div class="table-responsive"> <table id="par1" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
    txt += '<thead class="table-primary"> <tr><th>Ticket</th> <th>Factura</th> <th>DocType</th><th>Material</th><th>Cantidad</th><th>Unidad</th><th>Fabrica</th><th>Almacen</th></tr> </thead>';
    txt += "<tr><td>" + partida.Ticket + "</td>";
    txt += "<td>" + partida.Factura + "</td>";
    txt += "<td>" + partida.DocType + "</td>";
    txt += "<td>" + partida.Material + "</td>";
    txt += "<td>" + partida.ReqQty + "</td>";
    txt += "<td>" + partida.SalesUnit + "</td>";
    txt += "<td>" + partida.Plant + "</td>";
    txt += "<td>" + partida.StoreLoc + "</td></tr>";
    txt += "</table> </div></div>"
    document.getElementById("partida").innerHTML = txt;
    var table = $('#par1').DataTable({responsive: true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

    $('#par1 tbody').on('click', 'tr', function () {
        var datos = table.row(this).data();
        //alert(datos[0]);
    });
}

function formSuccess(msg) {
    $("#regForm")[0].reset();
    //submitMSG(true, "Exito! " + msg)
}

function formError() {
    $("#regForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

$(document).ready(function () {
    loadDataCliente();
    loadDataMateriales();
    //localStorage.clear();
//    if (localStorage.length <= 0) {
//        console.log('Buffer vacio');
//        getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
//        getArraytoJson("arrayExistencias", "BAckEndSAP/DatosMaestros.php"); //catalogo de clientes SAP
//        loadDataCliente();
//        loadDataMateriales();
//    } else {
//        loadDataCliente2();
//        loadDataMateriales2();
//    }
});

function loadDataCliente2() {
    var serverRequest = localStorage.getItem("arrayClientes");
    var myObj = JSON.parse(serverRequest);
    //var date = Object.keys(myObj.data.EtBusinesspData.item).length;
    var date = myObj.data.EtBusinesspData.item;
    var txt = "";
    console.log(date);
    txt += '<div class="table-responsive"> <table id="3x" class="table table-striped table-bordered table-hover table-sm table-condensed">';
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
    document.getElementById("loadTableClient").innerHTML = txt;
    var table = $('#3x').DataTable({responsive: true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

    $('#3x tbody').on('click', 'tr', function () {
        var datos = table.row(this).data();
        //alert(datos[0]);
        $("#Nombre").val(datos[1]);
        $("#Ciudad").val(datos[5]);
        $("#Direccion").val(datos[3]);
        $("#CP").val(datos[8]);
        $("#modalClientes .close").click()
    });
}
function loadDataMateriales2() {
    var serverRequest = localStorage.getItem("arrayExistencias");
    var myObj = JSON.parse(serverRequest);
    //var count = Object.keys(myObj.data.EtStock.item).length;
    var date = myObj.data.EtStock.item;
    var txt = "";
    console.log(date);
    txt += '<div class="table-responsive"> <table id="1x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
    txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Fabrica</th> <th>Almacen</th><th>Existencias</th><th>Unidad</th></tr> </thead>';
    for (x in date) {
        txt += "<tr><td>" + date[x].Matnr + "</td>";
        txt += "<td>" + date[x].Werks + "</td>";
        txt += "<td>" + date[x].Lgort + "</td>";
        txt += "<td>" + date[x].Clabs + "</td>";
        txt += "<td>" + date[x].Vormg + "</td></tr>";
    }
    txt += "</table> </div>"
    document.getElementById("loadTableMateriales").innerHTML = txt;
    var table = $('#1x').DataTable({
        "destroy": true,
        "responsive": true,
        "stateSave": true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

    $('#1x tbody').on('click', 'tr', function () {
        var datos = table.row(this).data();
        //alert(datos[0]);
        $("#Material").val(datos[0]);
        $("#Cantidad").val("1");
        $("#Fabrica").val(datos[1]);
        $("#Almacen").val(datos[2]);
        $("#modalMateriales .close").click()
    });
}
//action=Ex
function loadDataMateriales() {
    $("#loadTableMateriales").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "json/materiales.json",
        data: "",
        success: function (text) {
            //console.log(text);
            //console.log(text.data.EtPricematData);
            //var date = text.data.EtPricematData.item;
            date = JSON.parse(text);
            var txt = "";
            //console.log(date);
            txt += '<div class="table-responsive"> <table id="1x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Fabrica</th> <th>Almacen</th><th>CLABS</th><th>VORMG</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].Matnr + "</td>";
                txt += "<td>" + date[x].Maktg + "</td>";
                txt += "<td>" + date[x].Knumh + "</td>";
                txt += "<td>" + date[x].Kbetr + "</td>";
                txt += "<td>" + date[x].Konwa + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("loadTableMateriales").innerHTML = txt;
            var table = $('#1x').DataTable({responsive: true,
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });

            $('#1x tbody').on('click', 'tr', function () {
                var datos = table.row(this).data();
                //alert(datos[0]);
                $("#Material").val(datos[0]);
                $("#Cantidad").val("1");
                $("#Fabrica").val(datos[1]);
                $("#Almacen").val(datos[2]);
                $("#modalMateriales .close").click()
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
//action=Ex
function loadDataCliente() {
    $("#loadTableClient").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "json/clientes.json",
        data: "",
        success: function (text) {
            //console.log(text);
            //console.log(text.data);
            //var date = text.data;
            date = JSON.parse(text);
            var txt = "";
            //console.log(date);
            txt += '<div class="table-responsive"> <table id="3x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Nombre</th> <th>Almacen</th><th>Calle</th><th>Colonia</th><th>Ciudad</th><th>Edo</th><th>País</th><th>CP</th><th>Phone</th><th>Fecha</th><th>Vkbur</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].PartnNumb + "</td>";
                txt += "<td>" + date[x].Cliente + "</td>";
                txt += "<td>" + date[x].Almacen + "</td>";
                txt += "<td>" + date[x].Direccion + "</td>";
                txt += "<td>" + date[x].Ciudad + "</td>";
                txt += "<td>" + date[x].Ciudad + "</td>";
                txt += "<td>" + date[x].Ciudad + "</td>";
                txt += "<td>" + date[x].Land1 + "</td>";
                txt += "<td>" + date[x].CP + "</td>";
                txt += "<td>" + date[x].Telf1 + "</td>";
                txt += "<td>" + date[x].Erdat + "</td>";
                txt += "<td>" + date[x].Altkn + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("loadTableClient").innerHTML = txt;
            var table = $('#3x').DataTable({responsive: true,
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });

            $('#3x tbody').on('click', 'tr', function () {
                var datos = table.row(this).data();
                //alert(datos[0]);
                $("#Nombre").val(datos[1]);
                $("#Ciudad").val(datos[5]);
                $("#Direccion").val(datos[3]);
                $("#CP").val(datos[8]);
                $("#modalClientes .close").click()
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            alert("No fue posible conectar con el servidor");
            document.getElementById("loadTableClient").innerHTML = "Detalle del error " + errorThrown + " Estatus: " + textStatus;
        }
    });
}

function getArraytoJson(name, getData) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            //console.log(myObj);
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem(name, JSON.stringify(myObj));
                //alert(localStorage.getItem(name));
                console.log(name);
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
            }
        }
    };
    xhttp.open("GET", getData, true);
    xhttp.send();
    // The function returns the product of p1 and p2
}
