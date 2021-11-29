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

    $.ajax({
        type: "POST",
        url: "BackEndSAP/SolpeSap.php",
        data: "Nombre=" + Nombre + "&Ciudad=" + Ciudad
                + "&Direccion=" + Direccion + "&CP=" + CP
                + "&Material=" + Material + "&Cantidad=" + Cantidad
                + "&Fabrica=" + Fabrica + "&Almacen=" + Almacen,
        success: function (text) {
            //console.log(text);
            //console.log(text.data.EtError.item);
            var requestSap = text.data.EtError.item;
            if (requestSap.Znoerror == "00") {
                SaveRequesSapJson(text);
                var partida = text.data.EtPosDetalle.item;
                imprimePartida(partida);
                formSuccess(requestSap.Zerror);
                nextPrev(-1);
                Swal({
                    title: 'Exito!',
                    text: requestSap.Zerror,
                    type: 'success',
                    confirmButtonText: 'Cerrar'
                })
            } else {
                formError();
                var msgClasses = "h3 text-center text-danger";
                //submitMSG(false, requestSap.Zerror);
                //$("#msgSubmit").removeClass().addClass(msgClasses).html(requestSap[0].Zerror);
                Swal({
                    title: 'Error!',
                    text: requestSap[0].Zerror,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                })
            }
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
    var table = $('#par1').DataTable({responsive: true});

    $('#par1 tbody').on('click', 'tr', function () {
        var datos = table.row(this).data();
        //alert(datos[0]);
    });
}

function SaveRequesSapJson(Array) {
    var Cabecero = Array.data.EtPosCabecero.item;
    var Detalle = Array.data.EtPosDetalle.item;

    console.log(Detalle);
    console.log(Cabecero);

    var Mandt = Cabecero.Mandt;
    var Cliente = Cabecero.Name;
    var Ciudad = Cabecero.City;
    var Direccion = Cabecero.Street;
    var CP = Cabecero.PostlCode;
    var Factura = Cabecero.Factura;
    var Ticket = Cabecero.Ticket;
    var DocType = Cabecero.DocType;
    var Material = Detalle.Material;
    var Cantidad = Detalle.ReqQty;
    var Fabrica = Detalle.Plant;
    var Almacen = Detalle.StoreLoc;
    var DistrChan = Cabecero.DistrChan;
    var Division = Cabecero.Division;
    var FechaCurrent = Cabecero.FechaCurrent;
    var SalesUnit = Detalle.SalesUnit;
    var PartnNumb = Cabecero.PartnNumb;
    var PedidoSap = Cabecero.PedidoSap;
    var PurchNoC = Cabecero.PurchNoC;
    var Registros = Cabecero.Registros;

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
    //loadDataCliente();
    //loadDataMateriales();
    //localStorage.clear();
    if (localStorage.length <= 0) {
        console.log('Buffer vacio');
        getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
        getArraytoJson("arrayExistencias", "BAckEndSAP/DatosMaestros.php"); //catalogo de clientes SAP
        loadDataCliente();
        loadDataMateriales();
    } else {
        loadDataCliente2();
        loadDataMateriales2();
    }
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
    var table = $('#3x').DataTable({responsive: true});

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
        "stateSave": true
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
function loadDataMateriales() {
    $("#loadTableMateriales").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "BAckEndSAP/Materiales.php",
        data: "action=Ex",
        success: function (text) {
            //console.log(text);
            console.log(text.data.EtItemData);
            var date = text.data.EtItemData.item;
            var txt = "";
            console.log(date);
            txt += '<div class="table-responsive"> <table id="1x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Fabrica</th> <th>Almacen</th><th>CLABS</th><th>VORMG</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].Matnr + "</td>";
                txt += "<td>" + date[x].Maktx + "</td>";
                txt += "<td>" + date[x].Matkl + "</td>";
                txt += "<td>" + date[x].Meins + "</td>";
                txt += "<td>" + date[x].Mtart + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("loadTableMateriales").innerHTML = txt;
            var table = $('#1x').DataTable({responsive: true});

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

function loadDataCliente() {
    $("#loadTableClient").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "BAckEndSAP/Clientes.php",
        data: "action=Ex",
        success: function (text) {
            console.log(text);
            console.log(text.data.EtBusinesspData);
            var date = text.data.EtBusinesspData.item;
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
            document.getElementById("loadTableClient").innerHTML = txt;
            var table = $('#3x').DataTable({responsive: true});

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