<?php include './headers.php'; ?>
<div class="card card-border-danger">
    <div class="card-header text-right bg-white cfos">Datos Maestros - Dashboard</div>
    <div class="card-body">
        <div class="row">
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont icofont-pie-chart bg-c-blue card1-icon"></i>
                        <span class="text-c-blue f-w-600">Clientes en el sistema</span>
                        <h4> <span id="countCliente" class="countCliente"><span/>GB</h4>
                        <div>
                            <span class="f-left m-t-10 text-muted">
                                <i class="text-c-blue f-16 icofont icofont-user m-r-10"></i>Ver detalles
                            </span>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont icofont-ui-home bg-c-pink card1-icon"></i>
                        <span class="text-c-pink f-w-600">Materiales con existencias</span>
                        <h4><span id="countExist"><span/></h4>
                        <div>
                            <span class="f-left m-t-10 text-muted">
                                <i class="text-c-pink f-16 icofont icofont-calendar m-r-10"></i>Last 24 hours
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont icofont-warning-alt bg-c-green card1-icon"></i>
                        <span class="text-c-green f-w-600">Catálogo de precios por material</span>
                        <h4><span id="countMateriales"><span/></h4>
                        <div>
                            <span class="f-left m-t-10 text-muted">
                                <i class="text-c-green f-16 icofont icofont-tag m-r-10"></i>Tracked from microsoft
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont fa fa-user bg-c-yellow card1-icon"></i>
                        <span class="text-c-yellow f-w-600">Lista de Precios</span>
                        <h4><span id="countPrecios"><span/></h4>
                        <div>
                            <span class="f-left m-t-10 text-muted">
                                <i class="text-c-yellow f-16 icofont icofont-refresh m-r-10"></i>Just update
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- card1 end -->
            <!-- Statistics Start -->
            <div class="col-md-12 col-xl-8">
                <div class="card">
                    <div class="card-header bg-white"><h5>Detalle de las Solicitud de Pedido</h5><span>Visualización de las entradas existentes</span></div>
                    <div class="card-block">
                        <div id="Solpes"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-xl-4">
                <div class="card widget-statstic-card bg-white">
                    <div class="card-header bg-white">
                        <div class="card-header-left">
                            <h5>Número de Solicitudes de Pedido</h5>
                            <p class="text-primary">Comparado con la semana pasada</p>
                        </div>
                    </div>
                    <div class="card-block">
                        <i class="icofont icofont-presentation-alt st-icon bg-c-blue"></i>

                        <div class="text-left">
                            <h2 class="cfos" id="countSolpesSap"></h2>
                            <i class="icofont icofont-long-arrow-up f-30 text-c-green"></i>
                            <span class="f-right">23%</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<?php include './footer.php'; ?>
<script src="asset/js/menuCharts.js"></script>
