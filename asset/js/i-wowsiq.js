$("#wowsiq").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Llene los campos requeridos");
    } else {
        submitMSG(false, "");
        $("#bodyReport").empty();
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    document.getElementById("bodyReport").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... espere <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';

    // Initiate Variables With Form Content
    var Articulos = $("#Articulos").val();
    console.log('Articulos: ' + Articulos);

    var OT = $("#OT").val();
    console.log('OT: ' + OT);

    var ID = $("#ID").val();
    console.log('ID: ' + ID);

    var Vencido = $("#Vencido").val();
    console.log('Vencido: ' + Vencido);

    var OVtrv = $("#OVtrv").val();
    console.log('OVtrv: ' + OVtrv);

    var Almacen = $("#Almacen").val();
    console.log('Almacen: ' + Almacen);

    var Salida = $("#Salida").val();
    console.log('Salida: ' + Salida);

    //get JWT
    var jwt = localStorage.getItem("jwt");
    //get user login
    var myUSer = localStorage.getItem("userLog");

    $.ajax({
        type: "POST",
        url: host + "/MFG-RockJS/",
        data: "action=wowsiq&vusuario=" + myUSer + "&jwt=" + jwt + "&vpart=" + Articulos + "&vot=" + OT
                + "&vid=" + ID + "&vfecha=" + Vencido + "&vsite=" + Almacen,
        success: function (text) {
            console.log(text);
            //Validamos que la sesion este activa
            if (text.status.toString() == "Error") {
                document.getElementById("bodyReport").innerHTML = '<div class="alert alert-warning"><strong>Mensaje!</strong> ' + text.message.auth + ' <button class="btn btn-outline-warning" onclick="louout()">Log in again</button></div>';
            } else {
                var folio = text.message[0].Consulta;

                console.log(folio);
                ///mfg-pro/public_html/mfg/
                uri = host + "/mfg-pro/public_html/"+myUSer+"/" + folio.toString();

                setTimeout(function () {
                    var fileExist = doesFileExist(uri + ".prn");
                    if (fileExist) {
                        if (Salida == "Terminal") {
                            $("#bodyReport").empty();
                            readTextFile(uri + '.prn');
                        } else {
                            $("#bodyReport").empty();
                            //loadPDF(uri + '.pdf');
                            document.getElementById("bodyReport").innerHTML =
                                    '<iframe src="' + uri + '.pdf" style="width:100%;height:700px;"></iframe>';
                        }
                    } else {
                        $("#bodyReport").empty();
                        readTextFile(uri + ".err");
                    }


                }, 7000);
                formSuccess();
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            alert("No fue posible conectar con el servidor");
            submitMSG(false, "No fue posible conectar con el servidor");
        }
    });
}

//$(document).ready(function () {
//    readTextFile('reporte.rpm');
//});

function readTextFile(file) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", file, false);
    txtFile.onreadystatechange = function ()
    {
        if (txtFile.readyState === 4)
        {
            if (txtFile.status === 200 || txtFile.status == 0)
            {
                var result = txtFile.responseText;
                var lines = result.split("\n");
                console.log(result);
                for (var i = 0; i < lines.length; i++) {
                    //create option
                    var el = $('<pre value="' + i + '">' + lines[i] + '</pre>');
                    //append option to select
                    $('#bodyReport').append(el);
                }

            }
        }
    }
    txtFile.send(null);
}


function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        console.log("File doesn't exist");
        return false;
    } else {
        console.log("File exists");
        return true;
    }
}

function loadXMLDoc(uri) {
    $.get('reporte.rpm', function (data) {
        //split on new lines
        var lines = data.split('\n');
        //create select
        var dropdown = $('<select>');
        //iterate over lines of file and create a option element
        for (var i = 0; i < lines.length; i++) {
            //create option
            var el = $('<option value="' + i + '">' + lines[i] + '</option>');
            //append option to select
            $(dropdown).append(el);
        }
        //append select to page
        $('bodyReport').append(dropdown);
    });
}

function formSuccess() {
    $("#wowsiq")[0].reset();
    //submitMSG(true, "Bienvenido!");
    //location.href = "menu.html";
}

function formError() {
    $("#wowsiq").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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

function printDiv() {
    //Get the HTML of div
    var divElements = document.getElementById("bodyReport").innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
            "<html><head><title></title></head><body>" +
            divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;


}

/**
 * helper
 * Bootstrap 4 provides an easy way to create predefined alert messages:
 * @param {type} String idiv Selecciona un div 
 * @param {type} Select type success, info, warning, danger, primary
 * @param {type} String message Content to alert
 * @param {type} Boolean dismissible true, false
 * @returns {undefined}
 */
function helper(idiv, type, message, dismissible = false) {
    switch (type) {
        case 'success':
            if (dismissible) {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-success alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            } else {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-success"><strong>Mensaje!</strong> ' + message + '</div>';
            }
            break;
        case 'info':
            if (dismissible) {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-info alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            } else {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-info"><strong>Mensaje!</strong> ' + message + '</div>';
            }
            break;
        case 'warning':
            if (dismissible) {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-warning alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            } else {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-warning"><strong>Mensaje!</strong> ' + message + '</div>';
            }
            break;
        case 'danger':
            if (dismissible) {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-danger alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            } else {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-danger"><strong>Mensaje!</strong> ' + message + '</div>';
            }
            break;
        case 'primary':
            if (dismissible) {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-primary alert-primary"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            } else {
                document.getElementById(idiv).innerHTML = '<div class="alert alert-primary"><strong>Mensaje!</strong> ' + message + '</div>';
            }
            break;
        default:
            document.getElementById(idiv).innerHTML = '<div class="alert alert-dark alert-dark"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Message!</strong> ' + message + '</div>'
            break;
}
}

//
//function loadXMLDoc(uri) {
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            document.getElementById("bodyReport").innerHTML =
//                    this.responseText;
//        }
//    };
//    xhttp.open("GET", uri, true);
//    xhttp.send();
//}


