/*
 * Consulta catalogo de Lote
 * Despliega el resultado en una table
 * al seleccionar una fila de la tabla llena los inputs del form
 * con los datos del la moneda seleccionado
 */
$(document).ready(function(){
    $("#loadTableLote").html('<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... Esta acción puede tardar unos momentos <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>');
    $.ajax({
        type: "GET",
        url: "BAckEndSAP/PreciosMaterial.php",
        data: "action=Ex",
        success: function (text) {
            //console.log(text);
            console.log(text.data.EtPricematData);
            var date = text.data.EtPricematData.item;
            var txt = "";
            console.log(date);
            txt += '<div class="table-responsive"> <table id="3x" class="table table-striped table-bordered table-hover">';
            txt += '<thead class="table-primary"> <tr><th>Clave</th> <th>Fabrica</th> <th>Almacen</th><th>CLABS</th><th>VORMG</th></tr> </thead>';
            for (x in date) {
                txt += "<tr><td>" + date[x].Matnr + "</td>";
                txt += "<td>" + date[x].Maktg + "</td>";
                txt += "<td>" + date[x].Knumh + "</td>";
                txt += "<td>" + date[x].Kbetr + "</td>";
                txt += "<td>" + date[x].Konwa + "</td></tr>";
            }
            txt += "</table> </div>"
            document.getElementById("loadTableLote").innerHTML = txt;
            var table = $('#3x').DataTable();

            $('#3x tbody').on('click', 'tr', function () {
                var datos = table.row(this).data();
                alert(datos[0]);
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
});