// Funciones específicas de Crescloud

// Convierte todos los caracteres a mayúsculas
function mayus(e) {
    return e.toUpperCase();
}

// Mensajes Sweet Alert

function mensaje(cMensaje, cTitulo, cTipo, nTimer){
  if (nTimer === undefined) {
    nTimer = null;
  }

  swal({
    type: cTipo,
    title: cTitulo,
    text: cMensaje,
    timer: nTimer
  })
}

$('#notas').maxlength({
	maxCharacters:120,
	status:true,
	statusText:"car&aacute;cteres restantes.",
	statusClass: "textochico",
	showAlert:true,
	alertText:"Ha excedido el maximo de caracteres"
});
