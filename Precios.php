<?php include_once './headers.php'; ?>

<div class="card">
    <div class="card-header bg-fos text-right text-light">Datos Maestros SAP - Catálogo de Precios</div>
    <div class="card-body">
        <div id="loadTableLote"></div>
    </div> 
</div>

<?php include_once './footer.php'; ?>

<script type="text/javascript" src="asset/js/DatosMaestros-Precios.js"></script>

<script>
    $(document).ready(function () {
        $('#3x').DataTable();
    });
</script>