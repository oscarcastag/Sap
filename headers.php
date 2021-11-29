<?php include_once './BackEndSAP/session.php'; ?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <title>DemoSAP | RockJS Framework®</title>
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta name="apple-mobile-Web-app-title" content="RockJS Framework®">
        <meta name="author" content="RockJS Framework®|Focus On Services">
        <meta name="keywords" content="Soporte tecnico,it,ti,soluciones,datacenter,consultoria,centro de datos,empresarial,administracion,proyectos,soporte multimarca, Focus On Services es un proveedor global de servicios con presencia en más de 16 países de Latinoamérica con un amplio portafolio de servicios en Tecnologías de Información y con los mejores tiempos de respuesta de la industria, Software, Desarrollo, app, apps, android, IOS, 
              Transformación digital, Software on demand, Software a la medida, Servicios de desarrollo de software, fabrica de software, Progress, 4GL, ABL, app server, PAS, Servicios Web Síncronos,protocolos REST JSON XML">
        <meta name="description" content="La forma más rápida de adoptar la Transformación Digital">
        <!-- Favicon icon -->
        <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">

        <!-- Google font-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800" rel="stylesheet">
        <!-- Required Fremwork -->
        <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/css/bootstrap.min.css">
        <!-- Font Awesome -->
        <link rel="stylesheet" type="text/css" href="assets/icon/font-awesome/css/font-awesome.min.css">
        <!-- themify-icons line icon -->
        <link rel="stylesheet" type="text/css" href="assets/icon/themify-icons/themify-icons.css">
        <!-- ico font -->
        <link rel="stylesheet" type="text/css" href="assets/icon/icofont/css/icofont.css">
        <!-- flag icon framework css -->
        <link rel="stylesheet" type="text/css" href="assets/pages/flag-icon/flag-icon.min.css">
        <!-- Menu-Search css -->
        <link rel="stylesheet" type="text/css" href="assets/pages/menu-search/css/component.css">
        <!-- Syntax highlighter Prism css -->
        <link rel="stylesheet" type="text/css" href="assets/pages/prism/prism.css">
        <!-- Style.css -->
        <link rel="stylesheet" type="text/css" href="assets/css/style.css">
        <!-- Style RockJs -->
        <link rel="stylesheet" href="asset/css/rockjs.css">
        <!-- ICON personalite CSS -->
        <link rel="stylesheet" href="asset/css/pe-icon-7-stroke/css/pe-icon-7-stroke.css">
        <link rel="stylesheet" href="asset/css/pe-icon-7-stroke/css/helper.css">
        <!-- JQuery Export datatable csv,excel pdf -->
        <!--        <link rel="stylesheet" href="asset/css/jquery.dataTables.min.css">-->
        <!--link rel="stylesheet" href="asset/css/buttons.dataTables.min.css"-->
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/r-2.2.2/datatables.min.css"/>

        <!-- Menu-Search css -->
        <link rel="stylesheet" type="text/css" href="assets/pages/menu-search/css/component.css">
        <!-- Style.css -->
        <link rel="stylesheet" type="text/css" href="assets/css/style.css">
        <link rel="stylesheet" type="text/css" href="assets/css/jquery.mCustomScrollbar.css">

        <!-- Draggable personalite CSS -->
        <script src="asset/js/sweetalert2/sweetalert2.min.js"></script>
        <link rel="stylesheet" href="asset/js/sweetalert2/sweetalert2.min.css">
        <!-- Style RockJs -->


        <link rel="stylesheet" type="text/css" href="assets/css/jquery.mCustomScrollbar.css">
        <link rel="stylesheet" type="text/css" href="assets/css/pcoded-horizontal.min.css">
        <!-- jpro forms css -->
        <link rel="stylesheet" type="text/css" href="assets/pages/j-pro/css/demo.css">
        <link rel="stylesheet" type="text/css" href="assets/pages/j-pro/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="assets/pages/j-pro/css/j-pro-modern.css">
        
        
    </head>
    <!-- Menu horizontal fixed layout -->

    <body>
        <!-- Pre-loader start -->
        <div class="theme-loader">
            <div class="ball-scale">
                <div class='contain'>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                    <div class="ring"><div class="frame"></div></div>
                </div>
            </div>
        </div>
        <!-- Pre-loader end -->

        <div id="pcoded" class="pcoded">

            <div class="pcoded-container">
                <!-- Menu header start -->
                <nav class="navbar header-navbar pcoded-header">
                    <div class="navbar-wrapper">

                        <div class="navbar-logo">
                            <a class="mobile-menu" id="mobile-collapse" href="#!">
                                <i class="ti-menu"></i>
                            </a>
                            <a class="mobile-search morphsearch-search" href="#">
                                <i class="ti-search"></i>
                            </a>
                            <a href="menu.php">
                                <img class="img-fluid" src="asset/images/sniglet-blue.png" width="10%" alt="RockJS" />
                            </a>
                            <a class="mobile-options">
                                <i class="ti-more"></i>
                            </a>
                        </div>

                        <div class="navbar-container container-fluid">
                            <ul class="nav-left">
                                <li>
                                    <div class="sidebar_toggle"><a href="javascript:void(0)"><i class="ti-menu"></i></a></div>
                                </li>
                                <li>
                                    <a href="#!" onclick="javascript:toggleFullScreen()">
                                        <i class="ti-fullscreen"></i>
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav-right">
                                <li class="header-notification">
                                    <a href="#!">
                                        <i class="ti-bell"></i>
                                        <span class="badge bg-c-pink"></span>
                                    </a>
                                    <ul class="show-notification">
                                        <li>
                                            <h6>Notifications</h6>
                                            <label class="label label-danger">New</label>
                                        </li>
                                        <li>
                                            <div class="media">
                                                <img class="d-flex align-self-center" src="assets/images/user.png" alt="Generic placeholder image">
                                                <div class="media-body">
                                                    <h5 class="notification-user">John Doe</h5>
                                                    <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                                    <span class="notification-time">30 minutes ago</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="media">
                                                <img class="d-flex align-self-center" src="assets/images/user.png" alt="Generic placeholder image">
                                                <div class="media-body">
                                                    <h5 class="notification-user">Joseph William</h5>
                                                    <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                                    <span class="notification-time">30 minutes ago</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="media">
                                                <img class="d-flex align-self-center" src="assets/images/user.png" alt="Generic placeholder image">
                                                <div class="media-body">
                                                    <h5 class="notification-user">Sara Soudein</h5>
                                                    <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                                    <span class="notification-time">30 minutes ago</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li class="user-profile header-notification">
                                    <a href="#!">
                                        <img src="asset/images/img_avatar3.png" class="img-radius" alt="User-Profile-Image">
                                        <span>Focus On Services</span>
                                        <i class="ti-angle-down"></i>
                                    </a>
                                    <ul class="show-notification profile-notification">
                                        <li>
                                            <a href="#" onclick="louout()">
                                                <i class="ti-layout-sidebar-left"></i> Salir
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <!-- search -->
                            <div id="morphsearch" class="morphsearch">
                                <form class="morphsearch-form">
                                    <input class="morphsearch-input" type="search" placeholder="Search..." />
                                    <button class="morphsearch-submit" type="submit">Search</button>
                                </form>
                                <div class="morphsearch-content">
                                    <div class="dummy-column">
                                        <h2>People</h2>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-1.jpg" alt="Sara Soueidan" />
                                            <h3>Sara Soueidan</h3>
                                        </a>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-2.jpg" alt="Shaun Dona" />
                                            <h3>Shaun Dona</h3>
                                        </a>
                                    </div>
                                    <div class="dummy-column">
                                        <h2>Popular</h2>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-3.jpg" alt="PagePreloadingEffect" />
                                            <h3>Page Preloading Effect</h3>
                                        </a>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-4.jpg" alt="DraggableDualViewSlideshow" />
                                            <h3>Draggable Dual-View Slideshow</h3>
                                        </a>
                                    </div>
                                    <div class="dummy-column">
                                        <h2>Recent</h2>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-5.jpg" alt="TooltipStylesInspiration" />
                                            <h3>Tooltip Styles Inspiration</h3>
                                        </a>
                                        <a class="dummy-media-object" href="#!">
                                            <img src="assets/images/avatar-6.jpg" alt="NotificationStyles" />
                                            <h3>Notification Styles Inspiration</h3>
                                        </a>
                                    </div>
                                </div>
                                <!-- /morphsearch-content -->
                                <span class="morphsearch-close"><i class="icofont icofont-search-alt-1"></i></span>
                            </div>
                            <!-- search end -->
                        </div>
                    </div>
                </nav>
                <!-- Menu header end -->

                <!--inicio de seccion para reemplazar el menu-->
                <div class="pcoded-main-container" style="margin-top: 60px !important;">
                    <nav class="pcoded-navbar">
                        <div class="pcoded-inner-navbar">
                            <ul class="pcoded-item pcoded-left-item">
                                <li class="pcoded-hasmenu">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="ti-layout-cta-right"></i><b>D</b></span>
                                        <span class="pcoded-mtext">Datos Maestros</span>
                                        <span class="pcoded-mcaret"></span>
                                    </a>


                                    <ul class="pcoded-submenu">
                                        <li class="pcoded-hasmenu">
                                            <a href="javascript:void(0)">
                                                <span class="pcoded-micon"><i class="ti-home"></i></span>
                                                <span class="pcoded-mtext" data-i18n="nav.dash.main">Catálogos</span>
                                                <span class="pcoded-mcaret"></span>
                                            </a>
                                            <ul class="pcoded-submenu">
                                                <li class="">
                                                    <a href="Clientes.php">
                                                        <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                                                        <span class="pcoded-mtext" data-i18n="nav.dash.default">Clientes</span>
                                                        <span class="pcoded-mcaret"></span>
                                                    </a>
                                                </li>
                                                <li class="">
                                                    <a href="Materiales.php">
                                                        <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                                                        <span class="pcoded-mtext" data-i18n="nav.dash.default">Materiales</span>
                                                        <span class="pcoded-mcaret"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="">
                                            <a href="SolpeSAP.php">
                                                <span class="pcoded-micon"><i class="ti-layout"></i></span>
                                                <span class="pcoded-mtext" data-i18n="nav.page_layout.main">Solicitud de Pedido</span>
                                                <span class="pcoded-mcaret"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <!--Fin de seccion para reemplazar el menu-->

                    <div class="pcoded-wrapper">
                        <div class="pcoded-content">
                            <div class="pcoded-inner-content">

                                <!-- Main-body start -->
                                <div class="main-body">
                                    <div class="page-wrapper">
                                        <!-- Page-header start
                                        <div class="page-header card m-t-40">
                                            <div class="row align-items-end">
                                                <div class="col-lg-8">
                                                    <div class="page-header-title">
                                                        <i class="icofont icofont-restaurant-menu bg-c-pink "></i>
                                                        <div class="d-inline">
                                                            <h4>Horizontal fixed Layout</h4>
                                                            <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="page-header-breadcrumb">
                                                        <ul class="breadcrumb-title">
                                                            <li class="breadcrumb-item">
                                                                <a href="index.html">
                                                                    <i class="icofont icofont-home"></i>
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item"><a href="#!">Page Layouts</a>
                                                            </li>
                                                            <li class="breadcrumb-item"><a href="#!">Horizontal</a>
                                                            </li>
                                                            <li class="breadcrumb-item"><a href="#!">fixed Layout</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        Page-header end -->
                                        <!-- Page body start -->
                                        <div class="page-body">

