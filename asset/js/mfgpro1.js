$("#ccxc").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos  requeridos");
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
    var Cobra = $("#Cobra").val();
    console.log('Cobra: ' + Cobra);

    var Solo_Abiert = $("#Solo_Abiert").val();
    console.log('Solo_Abiert: ' + Solo_Abiert);

    var Moneda = $("#Moneda").val();
    console.log('Moneda: ' + Moneda);

    var Balance = $("#Balance").val();
    console.log('Balance: ' + Balance);

    var Ord = $("#Ord").val();
    console.log('Ord: ' + Ord);

    var MonedaRep = $("#MonedaRep").val();
    console.log('MonedaRep: ' + MonedaRep);

    var Salida = $("#Salida").val();
    console.log('Salida: ' + Salida);

    //get JWT
    var jwt = localStorage.getItem("jwt");

    //document.getElementById("help2").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... espere <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';

    //$("help2").append('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... espere <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "POST",
        url: "http://localhost/MFG-RockJS/",
        data: "action=ccxc&jwt=" + jwt + "&vipcte=" + Cobra + "&vipabierto=" + "no"
                + "&vipmoneda=" + Moneda + "&vipmodeda2=" + MonedaRep + "&Salida=" + Salida
                + "&Cobra=1&Solo_Abiert=1&Moneda=1&MonedaRep=1",
        success: function (text) {
            //$("#bodyReport").empty();

            console.log(text);
            var folio = text.message[0].Consulta;

            console.log(folio);
            var uri = "http://localhost/MFG-RockJS/mfg/" + folio.toString();
            //var uri = 'reporte';
            //var txt = '<center> <iframe src="' + uri + '" width="700" height="400" frameBorder="0">Browser not compatible.</iframe></center>';
            setTimeout(function () {

                // var txt = '<a href="' + uri + '" target="_blank">View Report</a>';
                // document.getElementById("bodyReport").innerHTML = txt;
                if (Salida == "Terminal") {
                    $("#bodyReport").empty();
                    readTextFile(uri + '.prn');
                } else {
                    $("#bodyReport").empty();
                    //loadPDF(uri + '.pdf');
                    document.getElementById("bodyReport").innerHTML =
                            '<iframe src="' + uri + '.pdf" style="width:100%;height:700px;"></iframe>';
                }

            }, 5000);
            formSuccess();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            alert("No fue posible conectar con la nube. Verifique su conexión a internet");
            submitMSG(false, "No fue posible conectar con la nube :( verifique su conexión a internet");
        }
    });
}

//$(document).ready(function () {
//    readTextFile('reporte.rpm');
//});

function readTextFile(file)
{
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
    $("#ccxc")[0].reset();
    //submitMSG(true, "Bienvenido!");
    //location.href = "menu.html";
}

function formError() {
    $("#ccxc").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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


