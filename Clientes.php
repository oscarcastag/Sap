<?php include_once './headers.php'; ?>

<div class="card">
    <div class="card-header bg-fos text-right text-light">Datos Maestros SAP - Catálogo de Clientes</div>
    <div class="card-body">
        <div id="loadTableLote">
            <table id="3x" class="table table-striped table-bordered table-hover table-sm dt-responsive nowrap">
                <thead class="table-primary"> <tr><th>Clave</th> <th>Nombre</th> <th>Almacen</th><th>Calle</th><th>Colonia</th><th>Ciudad</th><th>Edo</th><th>País</th><th>CP</th><th>Phone</th><th>Fecha</th><th>Vkbur</th></tr> </thead>
            </table>
        </div>
    </div> 
</div>

<?php include_once './footer.php'; ?>
<script type="text/javascript" src="asset/js/DatosClientes.js"></script>


<script>
    $(document).ready(function () {
        $('#3x').DataTable();
    });
</script>

