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
                                <i class="text-c-blue f-16 icofont icofont-user m-r-10"></i>
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
                                <i class="text-c-pink f-16 icofont icofont-calendar m-r-10"></i>
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
                                <i class="text-c-green f-16 icofont icofont-tag m-r-10"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card widget-card-1">
                    <div class="card-block-small">
                        <i class="icofont fa fa-user bg-c-yellow card1-icon"></i>
                        <span class="text-c-yellow f-w-600">Número de Solicitudes de Pedido</span>
                        <h4><span id="countSolpesSap"><span/></h4>
                        <div>
                            <span class="f-left m-t-10 text-muted">
                                <i class="text-c-yellow f-16 icofont icofont-refresh m-r-10"></i>Comparado con la semana pasada
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
                <div class="card">
                    <div class="card-header">
                        <h5>Stock en almacen VM1</h5>
                        <div class="card-header-right">                                      
                            <i class="icofont icofont-spinner-alt-5"></i>                                   
                        </div>
                    </div>
                    <div class="card-block">
                        <div id="pie-chart" style="height:300px"></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h5>Carga del servidor</h5>
                        <div class="card-header-right">               
                            <i class="icofont icofont-spinner-alt-5"></i>   
                        </div>
                    </div>
                    <div class="card-block">
                        <div id="server-load" style="height:300px"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header">
                        <h5>ZVCA</h5>
                        <div class="card-header-right">               
                            <i class="icofont icofont-spinner-alt-5"></i>       
                        </div>
                    </div>
                    <div class="card-block">
                        <div id="main" style="height:300px"></div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Ventas por equipo</h5>
                        <div class="card-header-right">                                                             <i class="icofont icofont-spinner-alt-5"></i>                                                         </div>
                    </div>
                    <div class="card-block">
                        <div id="bar_chart" style="height:300px"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Estadística</h5>
                        <div class="card-header-left ">
                        </div>
                        <div class="card-header-right">
                            <ul class="list-unstyled card-option">
                                <li><i class="icofont icofont-simple-left "></i></li>
                                <li><i class="icofont icofont-maximize full-card"></i></li>
                                <li><i class="icofont icofont-minus minimize-card"></i></li>
                                <li><i class="icofont icofont-refresh reload-card"></i></li>
                                <li><i class="icofont icofont-error close-card"></i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-block">
                        <div id="statestics-chart" style="height:330px;"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card email-sent-card">
                    <div class="card-header ">
                        <div class="card-header-left ">
                            <h5>Venta de productos</h5>
                        </div>
                        <div class="card-header-right">
                            <ul class="list-unstyled card-option">
                                <li><i class="icofont icofont-simple-left "></i></li>
                                <li><i class="icofont icofont-maximize full-card"></i></li>
                                <li><i class="icofont icofont-minus minimize-card"></i></li>
                                <li><i class="icofont icofont-refresh reload-card"></i></li>
                                <li><i class="icofont icofont-error close-card"></i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-block">
                        <div id="email-sent" style="max-width:100%;height:400px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include './footer.php'; ?>
<script src="asset/js/menuCharts.js"></script>


<script type="text/javascript" src="bower_components/jquery-slimscroll/js/jquery.slimscroll.js"></script>
<script type="text/javascript" src="bower_components/modernizr/js/modernizr.js"></script>
<script src="assets/pages/widget/amchart/amcharts.min.js"></script>
<script src="assets/pages/widget/amchart/serial.min.js"></script>
<script type="text/javascript" src="bower_components/chart.js/js/Chart.js"></script>
<script type="text/javascript" src="assets/pages/todo/todo.js "></script>

<script type="text/javascript" src="assets/pages/dashboard/custom-dashboard.min.js"></script>




<!-- echart js -->
<script src="assets/pages/chart/echarts/js/echarts-all.js" type="text/javascript"></script>

<!-- Custom js -->
<script type="text/javascript" src="assets/pages/chart/echarts/echart-custom.js"></script>
