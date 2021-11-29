$(document).ready(function(){

   $(document).on("keyup.autocomplete",".autocompletar",function(e){
      var bwa = $(this).attr("ac-tabla")
      var div = $(this).attr("ac-destino")
      var forma = $(this).attr("ac-forma")
      var idd = $(this).attr("ac-controld")
      var nuev = $(this).attr("ac-nuevo")
      var ext = (forma.substr(forma.lastIndexOf("."),4)).toLowerCase()
      var nuevt = $(this).attr("ac-nuevot").toLowerCase()
      var nuevd = $(this).attr("ac-nuevod")
      var nuevf = $(this).attr("ac-filtro")

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
                  Ajax(ui.item.id, div )

               }else{
                  $("#"+div).html(ui.item.id)
               }
               $(this).val("")
               $("#"+idd).val(ui.value)
            }

         }
      })
   })

   $(".firstkey").on("blur", function(){
	   var valor = $(this).val();
	   var tabla = $(this).attr("fk-tabla");
	   var error = '<span class="glyphicon glyphicon-remove"></span>';
	   var ok = '<span class="glyphicon glyphicon-ok"></span>'

	   var datos = new FormData()
	   datos.append("valor", valor);
	   datos.append("tabla", tabla);

	   $.ajax({

			url: "/cgi-bwp/validafk.bwp",
			method: "POST",
			data: datos,
			cache: false,
			contentType: false,
			processData: false,
			success: function(respuesta){
				console.log(respuesta);
			  if (respuesta.substring(0,2) == 'No') {
				$(".firstkey-result").html(error);
				$(".firstkey").focus();
			  }else{
				$(".firstkey-result").html(ok);
			  }

			}

	   })
   })

   $(document).on("keyup.autocomplete",".cliente-auto",function(e){
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

   $(document).on("keyup.autocomplete",".producto-auto",function(e){
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
            }

         }
      }).data("ui-autocomplete")._renderItem = function (ul, item) {
         return $("<li></li>")
             .data("item.autocomplete", item)
             .append("<a>" + item.label + "</a>")
             .appendTo(ul);
	  };
   });

   // $(document).on("change",".producto-auto", function(){
		// var prod2 = $(this).val();
		// var prec = $("#clasifica").val();
		// $("#descripcion").html('<img src="/assets/cc/img/loading_animation.gif">')
   //  $("#descripcion").focus();
	 //  var datos = new FormData();
		// datos.append("prod2",prod2);
		// $.ajax({
  	// 	url: "/cgi-bwp/buscaProd.bwp",
  	// 	method: "POST",
  	// 	data: datos,
  	// 	cache: false,
  	// 	contentType: false,
  	// 	processData: false,
  	// 	dataType : "json",
  	// 	success: function(respuesta){
  	// 		console.log(respuesta);
  	// 		if (respuesta.length == 2){
  	// 			alert('Producto NO registrado');
  	// 		}else{
  	// 			$("#descripcion").html(respuesta[0].DESC1);
  	// 			$("#ncant").val(respuesta[0].U_CAJA);
  	// 			$("#ncant").focus();
  	// 			switch (prec){
  	// 				case '1':
  	// 					$("#precio").val(respuesta[0].PRECIO1);
  	// 					break;
   //
  	// 				case '2':
  	// 					$("#precio").val(respuesta[0].PRECIO2);
  	// 					break;
   //
  	// 				case '3':
  	// 					$("#precio").val(respuesta[0].PRECIO3);
  	// 					break;
   //
  	// 				case '4':
  	// 					$("#precio").val(respuesta[0].PRECIO4);
  	// 					break;
   //
  	// 				case '5':
  	// 					$("#precio").val(respuesta[0].PRECIO5);
  	// 					break;
   //
  	// 				default:
  	// 					$("#precio").val(respuesta[0].PRECIO1);
  	// 					break;
   //
  	// 			}
  	// 		}
		// 	},
		// 	fail: function(respuesta){
		// 		console.log(respuesta);
		// 		alert('Ocurrio un error');
		// 	}
		// });
   // })

   // $(document).on("click","#buscaProd", function(){
		// var prod2 = $("#selProd").val();
		// var prec = $("#clasifica").val();
		// $("#descripcion").html('<img src="/assets/cc/img/loading_animation.gif">')
	 //    var datos = new FormData();
		// datos.append("prod2",prod2);
		// $.ajax({
		// 	url: "/cgi-bwp/erp/buscaProd.bwp",
		// 	method: "POST",
		// 	data: datos,
		// 	cache: false,
		// 	contentType: false,
		// 	processData: false,
		// 	dataType : "json",
		// 	success: function(respuesta){
   //
		// 		if (respuesta.length == 2){
		// 			alert('Producto NO registrado');
		// 		}else{
		// 			console.log("Precio:" + respuesta[0].prec);
		// 			$("#descripcion").html(respuesta[0].DESC1);
		// 			$("#ncant").val(respuesta[0].U_CAJA);
		// 			$("#ncant").focus();
		// 			switch (prec){
		// 				case '1':
		// 					$("#precio").val(respuesta[0].PRECIO1);
		// 					break;
   //
		// 				case '2':
		// 					$("#precio").val(respuesta[0].PRECIO2);
		// 					break;
   //
		// 				case '3':
		// 					$("#precio").val(respuesta[0].PRECIO3);
		// 					break;
   //
		// 				case '4':
		// 					$("#precio").val(respuesta[0].PRECIO4);
		// 					break;
   //
		// 				case '5':
		// 					$("#precio").val(respuesta[0].PRECIO5);
		// 					break;
   //
		// 				default:
		// 					$("#precio").val(respuesta[0].PRECIO1);
		// 					break;
   //
		// 			}
		// 		}
		// 	},
		// 	fail: function(respuesta){
		// 		console.log(respuesta);
		// 		alert('Ocurrio un error');
		// 	}
		// });
   // })
})
