<?php include './headers.php'; ?>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="fa fa-calendar-check-o bg-c-blue card1-icon"></i>
                        <span class="text-c-blue f-w-600">Agenda de Actividades</span>
                        <h4> <span id="countCliente" class="countCliente"><span/></h4>
                    </div>
                </div> 
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="fa fa-cloud-upload bg-c-pink card1-icon"></i>
                        <span class="text-c-pink f-w-600">Entrega de actividad</span>
                        <h4><span id="countExist"><span/></h4>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="fa fa-comments-o bg-c-green card1-icon"></i>
                        <span class="text-c-green f-w-600">Foro</span>
                        <h4><span id="countMateriales"><span/></h4>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont fa fa-user bg-c-yellow card1-icon"></i>
                        <span class="text-c-yellow f-w-600">Repositorios de la clase</span>
                        <h4><span id="countPrecios"><span/></h4>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="fa fa-user bg-fos card1-icon"></i>
                        <span class="text-c-blue f-w-600">User Admin</span>
                        <h4> <span id="countCliente" class="countCliente"><span/></h4>
                    </div>
                </div> 
            </div>
            <div class="col-sm-6">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="fa fa-book bg-danger card1-icon"></i>
                        <span class="text-c-blue f-w-600">Libro de Calculo</span>
                        <h4> <span id="countCliente" class="countCliente"><span/></h4>
                    </div>
                </div> 
            </div>
        </div>
    </div>

    <table id="example" class="table table-condensed table-responsive table-striped">
        <thead>
            <tr>
                <th>Mandt</th>
                <th>Cliente</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>CP</th>
                <th>Factura</th>
                <th>Ticket</th>
                <th>DocType</th>
                <th>Material</th>
                <th>Cantidad</th>
                <th>SalesUnit</th>
                <th>FechaCurrent</th>
                <th>PurchNoC</th>
                <th>Estatus</th>
                <th>Fabrica</th>
                <th>Almacen</th>
                <th>DistrChan</th>
                <th>Division</th>
            </tr>
        </thead>
    </table>
</div>

<?php include './footer.php'; ?>

<script>
    $(document).ready(function () {
        listar();
    });

    function listar() {
        $('#example').DataTable({
            "destroy": true,
            "responsive": true,
            "stateSave": true,
            "ajax": "BackEndSAP/getLogSolpes.php",
            "columns": [
                {"data": "Mandt"},
                {"data": "Cliente"},
                {"data": "Ciudad"},
                {"data": "Direccion"},
                {"data": "CP"},
                {"data": "Factura"},
                {"data": "Ticket"},
                {"data": "DocType"},
                {"data": "Material"},
                {"data": "Cantidad"},
                {"data": "SalesUnit"},
                {"data": "FechaCurrent"},
                {"data": "PurchNoC"},
                {"data": "Estatus"},
                {"data": "Fabrica"},
                {"data": "Almacen"},
                {"data": "DistrChan"},
                {"data": "Division"},
            ]
        });

        $('#example tbody').on('click', 'tr', function () {
            var datos = table.row(this).data();
            alert(datos[0]);
        });
    }
</script> 