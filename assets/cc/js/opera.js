//Wizard Opera
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Si es la 2a fase, carga el datatables
  if (currentTab == 1) {
    listar();
  }
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("opera").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    if (y[i].required == true) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        mensaje('Debe completar el campo '+y[i].name, 'Validación', 'error');
        // and set the current valid status to false:
        valid = false;
        return;
      }
    }

  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

$("#opera").on("keyup.autocomplete",".cliente-auto",function(e){
   var bwa = $(this).attr("ac-tabla")
   var div = $(this).attr("ac-destino")
   var forma = $(this).attr("ac-forma")
   var idd = $(this).attr("ac-controld")
   var nuev = $(this).attr("ac-nuevo")
   var ext = (forma.substr(forma.lastIndexOf("."),4)).toLowerCase()
   var nuevt = $(this).attr("ac-nuevot").toLowerCase()
   var nuevd = $(this).attr("ac-nuevod")
   var nuevf = $(this).attr("ac-filtro")
 $("#clienten").html('');
 $("#calle").html('');
 $("#colonia").html('');
 $("#ciudad").html('');
 $("#contacto").html('');
 $("#email").html('');

   $(this).autocomplete({
      source: function(request, response) {
         $.getJSON(
            '/cgi-bwp/eligede.bwp',
            { q:request.term, bwa:bwa, forma:forma, nuevo:nuev, filtro:nuevf },
            function(result){
               response(result)
            }
         )
      },
      minLength: 3,
      html: true,
      select: function(evente, ui){
         var cval = ui.item.value
         if (cval == 'Registrar'){
            $("#registrobody").html('<img src="/assets/cc/img/loading_animation.gif">')
            $("#registrobtn").click()
            var jqxhr = $.post(ui.item.id, {tipo: nuevt, destino: nuevd, ctabla:bwa, fullview:'NO' })
               .done(function(data){
                  $("#registrobody").html(data)
               })
               .fail(function(data){
                  $("#registrobody").html("error "+data)
               })
               $(this).val("")

         }else{
            if (ext == '.bwp'){
       $("#datosCliente").html('<img src="/assets/cc/img/loading_animation.gif">');
       var datos = new FormData()
       datos.append("cliente", ui.item.value)
       $.ajax({
         url: forma,
         method: "POST",
         data: datos,
         cache: false,
         contentType: false,
         processData: false,
         dataType : "json",
         success: function(respuesta){
           $("#datosCliente").html('');
           $("#clienten").html(respuesta[0].NOMBRE+' '+respuesta[0].NOMBRE2);
           $("#calle").html(respuesta[0].CALLE);
           $("#colonia").html(respuesta[0].COLONIA);
           $("#ciudad").html(respuesta[0].CP+' '+respuesta[0].CIUDAD);
           $("#contacto").html(respuesta[0].CONTACTO);
           $("#email").html(respuesta[0].EMAIL);
           $("#cliente").val(respuesta[0].CLIENTE);
           $("#descuento").val(respuesta[0].DESCUENTO);
           $("#clasifica").val(respuesta[0].CLASIFICA);
           $("#tipo").val(respuesta[0].TIPO);
           $("#nomtipo").val(respuesta[0].NOMTIPO);
           $("#vendedor").val(respuesta[0].VENDEDOR);
           $("#nomvend").val(respuesta[0].NOMVEND)

       },
       fail: function(respuesta){
         $("#datosCliente").html('');
         console.log(respuesta);
         alert('Ocurrio un error');
       }
       });


            }else{
               $("#"+div).html(ui.item.id)
            }
            $(this).val("")
            $("#"+idd).val(ui.value)
         }

      }
   }).data("ui-autocomplete")._renderItem = function (ul, item) {
      return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a>" + item.label + "</a>")
          .appendTo(ul);
 };
})

$("#opera").on("keyup.autocomplete",".producto-auto",function(e){
   var bwa = $(this).attr("ac-tabla")
   var div = $(this).attr("ac-destino")
   var forma = $(this).attr("ac-forma")
   var idd = $(this).attr("ac-controld")
   var nuev = $(this).attr("ac-nuevo")
   var ext = (forma.substr(forma.lastIndexOf("."),4)).toLowerCase()
   var nuevt = $(this).attr("ac-nuevot").toLowerCase()
   var nuevd = $(this).attr("ac-nuevod")
   var nuevf = $(this).attr("ac-filtro")
 $("#cantidad").val('0');


   $(this).autocomplete({
      source: function(request, response) {
         $.getJSON(
            '/cgi-bwp/eligede.bwp',
            { q:request.term, bwa:bwa, forma:forma, nuevo:nuev, filtro:nuevf },
            function(result){
               response(result)
            }
         )
      },
      minLength: 3,
      html: true,
      select: function(evente, ui){
         var cval = ui.item.value
         if (cval == 'Registrar'){
            $("#registrobody").html('<img src="/assets/cc/img/loading_animation.gif">')
            $("#registrobtn").click()
            var jqxhr = $.post(ui.item.id, {tipo: nuevt, destino: nuevd, ctabla:bwa, fullview:'NO' })
               .done(function(data){
                  $("#registrobody").html(data)
               })
               .fail(function(data){
                  $("#registrobody").html("error "+data)
               })
               $(this).val("")

         }else{
            if (ext == '.bwp'){

            }else{
               $("#"+div).html(ui.item.id)
            }
            $(this).val("")
            $("#"+idd).val(ui.value)
            $("#ncant").focus();
         }

      }
   }).data("ui-autocomplete")._renderItem = function (ul, item) {
      return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a>" + item.label + "</a>")
          .appendTo(ul);
 };
});

$("#opera").on("change",".producto-auto", function(){
 var prod2 = $(this).val();
 var prec = $("#clasifica").val();
 $("#descripcion").html('<img src="/assets/cc/img/loading_animation.gif">')
 $("#descripcion").focus();
 var datos = new FormData();
 datos.append("prod2",prod2);
 $.ajax({
   url: "/cgi-bwp/buscaProd.bwp",
   method: "POST",
   data: datos,
   cache: false,
   contentType: false,
   processData: false,
   dataType : "json",
   success: function(respuesta){
     console.log(respuesta);
     if (respuesta.length == 2){
       alert('Producto NO registrado');
     }else{
       $("#descripcion").html(respuesta[0].DESC1);
       $("#ncant").val(respuesta[0].U_CAJA);
       $("#ncant").focus();
       switch (prec){
         case '1':
           $("#precio").val(respuesta[0].PRECIO1);
           break;

         case '2':
           $("#precio").val(respuesta[0].PRECIO2);
           break;

         case '3':
           $("#precio").val(respuesta[0].PRECIO3);
           break;

         case '4':
           $("#precio").val(respuesta[0].PRECIO4);
           break;

         case '5':
           $("#precio").val(respuesta[0].PRECIO5);
           break;

         default:
           $("#precio").val(respuesta[0].PRECIO1);
           break;

       }
     }
   },
   fail: function(respuesta){
     console.log(respuesta);
     alert('Ocurrio un error');
   }
 });
})

$("#opera").on("click","#buscaProd", function(){
 var prod2 = $("#selProd").val();
 var prec = $("#clasifica").val();
 $("#descripcion").html('<img src="/assets/cc/img/loading_animation.gif">')
   var datos = new FormData();
 datos.append("prod2",prod2);
 $.ajax({
   url: "/cgi-bwp/erp/buscaProd.bwp",
   method: "POST",
   data: datos,
   cache: false,
   contentType: false,
   processData: false,
   dataType : "json",
   success: function(respuesta){

     if (respuesta.length == 2){
       alert('Producto NO registrado');
     }else{
       console.log("Precio:" + respuesta[0].prec);
       $("#descripcion").html(respuesta[0].DESC1);
       $("#ncant").val(respuesta[0].U_CAJA);
       $("#ncant").focus();
       switch (prec){
         case '1':
           $("#precio").val(respuesta[0].PRECIO1);
           break;

         case '2':
           $("#precio").val(respuesta[0].PRECIO2);
           break;

         case '3':
           $("#precio").val(respuesta[0].PRECIO3);
           break;

         case '4':
           $("#precio").val(respuesta[0].PRECIO4);
           break;

         case '5':
           $("#precio").val(respuesta[0].PRECIO5);
           break;

         default:
           $("#precio").val(respuesta[0].PRECIO1);
           break;

       }
     }
   },
   fail: function(respuesta){
     console.log(respuesta);
     alert('Ocurrio un error');
   }
 });
})

// Agregar partidas a la operacion

$("#btnAgregar").on("click",function(){


  var prod2=$("#selProd").val();
  var ncant=$("#ncant").val();
  var precio=$("#precio").val();

  if (prod2=='' || ncant=='' || precio=='') {
    mensaje('Debe seleccionar un producto y agregar la cantidad', 'Registro de Ventas', 'warning');
    return;
  }

  $(this).html('<i class="fa fa-cog icon-spin"> </i>')
  var datos = new FormData();
  datos.append("prod2",prod2);
  datos.append("ncant",ncant);
  datos.append("precio",precio);

  $.ajax({
    url: "/cgi-bwp/erp/agrega.bwp",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    success: function(respuesta){
      $("#btnAgregar").html('<i class="fa fa-plus"></i>');
      if (respuesta.trim()==='No'){
        alert('ocurrio un error');
        listar();
      }else{
        mensaje('Producto agregado correctamente', '', 'success', 2000);
        $("#selProd").val('');
        $("#descripcion").html('');
        $("#ncant").val('');
        $("#precio").val('');
        listar();
      }
    },
    error: function(respuesta){
      $("#btnAgregar").html('<i class="fa fa-plus"></i>');
      alert('ocurrio un error al procesar' + respuesta);
    }
  });



});

function listar(){


   var table = $("#detalleVta").DataTable({
     "destroy": true,
     "responsive": true,
     "ajax":{
       "url":"/cgi-bwp/erp/ventas/ventdete.bwp",
   "type": "POST"
     },
     "columns":[
       {"data":"PARTIDA"},
       {"data":"PRODUCTO"},
       {"data":"DESCR"},
       {"data":"CANT"},
       {"data":"PRECIO"},
       {"data":"IMPORTE"},
       {"data":"DESCUENTO"},
       {"data":"IMPORTNETO"},
     ],
     "language": idioma_espanol,
     // "dom": "<<lf><t><ip>>",
     "initComplete": function( settings, json ){
       console.log(json)
       if (json.data.length>0) {
         $("#suma").val(json.data[0].SUMA);
         $("#impuesto").val(json.data[0].IMPUESTO);
         $("#total").val(json.data[0].TOTAL);
       }
     }
   })
}

var idioma_espanol ={

 "sProcessing":     "Procesando...",
 "sLengthMenu":     "Mostrar _MENU_ registros",
 "sZeroRecords":    "No se encontraron resultados",
 "sEmptyTable":     "Venta sin productos",
 "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
 "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
 "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
 "sInfoPostFix":    "",
 "sSearch":         "Buscar:",
 "sUrl":            "",
 "sInfoThousands":  ",",
 "sLoadingRecords": "Cargando...",
 "oPaginate": {
   "sFirst":    "Primero",
   "sLast":     "Último",
   "sNext":     "Siguiente",
   "sPrevious": "Anterior"
 },
 "oAria": {
   "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
   "sSortDescending": ": Activar para ordenar la columna de manera descendente"
 }
 }

$(document).ready(function(){

  if ($("#cliente").val() !=='') {
    nextPrev(1);
  }

  // Formato de números
  $("#ncant").number(true,2);
  $("#cant").number(true,2);
  $("#precio").number(true,2);
  $("#suma").number(true,2);
  $("#impuesto").number(true,2);
  $("#total").number(true,2);


  // $("#opera").steps({
  //     headerTag: "h3",
  //     bodyTag: "fieldset",
  //     stepsContainerTag: "pasos",
  //     transitionEffect: "slideLeft",
  //     autofocus: true,
  //     titleTemplate: "#title#",
  //     //forceMoveForward: true,
  //     labels:{
  //       next: "Continuar",
  //       finish: "Finalizar"
  //     }
  //    ,saveState: true
  // });

	// listar();


})
