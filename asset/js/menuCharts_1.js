$(document).ready(function () {
    ConsultaSolpesJson();
    coutCharSolpes();
    if (localStorage.getItem("arrayClientes") === null) {
        console.log('No hay Clientes en buffer');
        getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
        chatCountClient2();
    } else {
        var clientes = JSON.parse(localStorage.getItem("arrayClientes"));
        var is = isJSON(clientes);
        if (is) {
            console.log('Clientes en buffer');
            chatCountClient();
        } else {
            console.log('Json Clientes con error');
            getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
        }
    }
    if (localStorage.getItem("arrayExistencias") === null) {
        console.log('No hay Existencias en buffer');
        getArraytoJson("arrayExistencias", "BAckEndSAP/DatosMaestros.php"); //catalogo de existencias SAP
        coutChartExistencias2();
    } else {
        var existencias = JSON.parse(localStorage.getItem("arrayExistencias"));
        var is = isJSON(existencias);
        if (is) {
            console.log('Existencias en buffer');
            chatCountExist();
        } else {
            console.log('Json existencias con error');
            getArraytoJson("arrayClientes", "BAckEndSAP/Clientes.php"); //catalogo de clientes SAP
        }
    }
    chatCountPreciosxMat();
    chatCountPrecios();
});

function chatCountPrecios() {
    $("#countPrecios").html('<i class="pe-7s-config pe-spin pe-va"></i>');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            var count = Object.keys(myObj.data.EtPricesucData.item).length;
            console.log(count);
            document.getElementById("countPrecios").innerHTML = count;
            $({Counter: 0}).animate({
                Counter: $('#countPrecios').text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $('#countPrecios').text(Math.ceil(this.Counter));
                }
            });
        }
    };
    xhttp.open("GET", "BackEndSAP/Precios.php", true);
    xhttp.send();
    // The function returns the product of p1 and p2
}

function chatCountPreciosxMat() {
    $("#countMateriales").html('<i class="pe-7s-config pe-spin pe-va"></i>');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            var count = Object.keys(myObj.data.EtPricematData.item).length;
            console.log(count);

            document.getElementById("countMateriales").innerHTML = count;

            $({Counter: 0}).animate({
                Counter: $('#countMateriales').text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $('#countMateriales').text(Math.ceil(this.Counter));
                }
            });
        }
    };
    xhttp.open("GET", "BackEndSAP/PreciosMaterial.php", true);
    xhttp.send();
    // The function returns the product of p1 and p2
}

function chatCountClient() {
    var serverRequest = localStorage.getItem("arrayClientes");
    var myObj = JSON.parse(serverRequest);
    var count = Object.keys(myObj.data.EtBusinesspData.item).length;
    console.log(count);
    document.getElementById("countCliente").innerHTML = count;
    $({Counter: 0}).animate({
        Counter: $('#countCliente').text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
            $('#countCliente').text(Math.ceil(this.Counter));
        }
    });
}
function chatCountExist() {
    var serverRequest = localStorage.getItem("arrayExistencias");
    var myObj = JSON.parse(serverRequest);
    var count = Object.keys(myObj.data.EtStock.item).length;
    console.log(count);

    document.getElementById("countExist").innerHTML = count;

    $({Counter: 0}).animate({
        Counter: $('#countExist').text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
            $('#countExist').text(Math.ceil(this.Counter));
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

function chatCountClient2() {
    $(".countCliente").html('<i class="pe-7s-config pe-spin pe-va"></i>');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            var count = Object.keys(myObj.data.EtBusinesspData.item).length;
            console.log(count);

            document.getElementById("countCliente").innerHTML = count;

            $({Counter: 0}).animate({
                Counter: $('.countCliente').text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $('.countCliente').text(Math.ceil(this.Counter));
                }
            });
        }
    };
    xhttp.open("GET", "BAckEndSAP/Clientes.php", true);
    xhttp.send();
    // The function returns the product of p1 and p2
}

function coutChartExistencias2() {
    $("#countExist").html('<i class="pe-7s-config pe-spin pe-va"></i>');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            var count = Object.keys(myObj.data.EtStock.item).length;
            console.log(count);

            document.getElementById("countExist").innerHTML = count;

            $({Counter: 0}).animate({
                Counter: $('#countExist').text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $('#countExist').text(Math.ceil(this.Counter));
                }
            });
        }
    };
    xhttp.open("GET", "BAckEndSAP/DatosMaestros.php", true);
    xhttp.send();
    // The function returns the product of p1 and p2
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

function ConsultaSolpesJson() {
    $("#Solpes").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "BackEndSAP/getLogSolpes.php",
        data: "action=Ex",
        success: function (text) {
            console.log(text);
            console.log(text.data);
            var date = text.data;
            var txt = "";
            console.log(date);
            txt += '<div class="table-responsive"> <table id="solpx3" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Estatus</th><th>Cliente</th> <th>Ciudad</th><th>Direccion</th><th>Material</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].Mandt + "</td>";
                txt += "<td>" + date[x].Estatus + "</td>";
                txt += "<td>" + date[x].Cliente + "</td>";
                txt += "<td>" + date[x].Ciudad + "</td>";
                txt += "<td>" + date[x].Direccion + "</td>";
                txt += "<td>" + date[x].Material + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("Solpes").innerHTML = txt;
            var table = $('#solpx3').DataTable({responsive: true});

            $('#solpx3 tbody').on('click', 'tr', function () {
                var datos = table.row(this).data();
                //alert(datos[0]);
//                $("#Material").val(datos[0]);
//                $("#Cantidad").val("1");
//                $("#Fabrica").val(datos[1]);
//                $("#Almacen").val(datos[2]);
//                $("#modalMateriales .close").click()
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            alert("No fue posible conectar con el servidor");
            document.getElementById("Solpes").innerHTML = errorThrown;
        }
    });
}

function coutCharSolpes() {
    $("#countSolpesSap").html('<i class="pe-7s-config pe-spin pe-va"></i>');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var serverRequest = this.responseText;
            var myObj = JSON.parse(this.responseText);
            var count = Object.keys(myObj.data).length;
            console.log(count);
            document.getElementById("countSolpesSap").innerHTML = count;
            $({Counter: 0}).animate({
                Counter: $('#countSolpesSap').text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $('#countSolpesSap').text(Math.ceil(this.Counter));
                }
            });
        }
    };
    xhttp.open("GET", "BAckEndSAP/getLogSolpes.php", true);
    xhttp.send();
    // The function returns the product of p1 and p2
}