<?php include 'headers.php'; ?>
<style>
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #f1f1f1;
    }


    h1 {
        text-align: center;  
    }

    /* Mark input boxes that gets an error on validation: */
    input.invalid {
        background-color: #ffdddd;
    }

    /* Hide all steps by default: */
    .tab {
        display: none;
    }


    button:hover {
        opacity: 0.8;
    }

    #prevBtn {
        background-color: #bbbbbb;
    }

    /* Make circles that indicate the steps of the form: */
    .step {
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbbbbb;
        border: none;  
        border-radius: 50%;
        display: inline-block;
        opacity: 0.5;
    }

    .step.active {
        opacity: 1;
    }

    /* Mark the steps that are finished and valid: */
    .step.finish {
        background-color: #4CAF50;
    }
</style>

<div class="card">
    <div class="card-header bg-fos text-light text-right">Solicitud de pedido</div>
    <div class="card-body">
        <form role="form" id="regForm" data-toggle="validator" class="shake" autocomplete="off">
            <div class="tab">
                <div class="d-flex">
                    <div class="p-2 mr-auto">
                        <div class="page-header-title">
                            <i class="fa fa-user bg-c-pink"></i>
                            <div class="d-inline">
                                <h4>Datos del Cliente</h4>
                                <!--span><strong>Factura:</strong> FTT49 <strong>Ticket:</strong> 100014 <strong>TipoDoc:</strong> ZVCA</span-->
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card card-border-danger">
                    <div class="card-body">
                        <div class="row form-group mb-1">
                            <div class="col-sm-3">
                                <label class="col-form-label">Cliente</label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group" style="margin-bottom: 0px;">
                                    <input name="Nombre" title="Nombre del Cliente" id="Nombre" class="form-control" placeholder="Nombre del cliente" type="text" required>
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-sm btn-primary" id="search-client"  data-toggle="modal" data-target="#modalClientes"><span class="pe-7s-search"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Ciudad">Ciudad</label>
                            <input type="text" class="form-control" id="Ciudad" name="Ciudad" required>
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="Direccion">Direccion</label>
                            <input type="text" class="form-control" id="Direccion" name="Direccion" required>
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="CP">Código Postal</label>
                            <input type="text" class="form-control" id="CP" name="CP" required>
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="d-flex">
                    <div class="p-2 mr-auto">
                        <div class="page-header-title">
                            <i class="pe-7s-cart bg-c-pink"></i>
                            <div class="d-inline">
                                <h4>Datos del Pedido</h4>
                                <span><strong>Factura:</strong> FTT49 <strong>Ticket:</strong> 100014 <strong>TipoDoc:</strong> ZVCA</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card card-border-success">
                    <div class="card-body">
                        <div class="row form-group mb-1">
                            <div class="col-sm-3">
                                <label class="col-form-label">Material</label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group" style="margin-bottom: 0px;">
                                    <input name="Material" title="Material" id="Material" class="form-control" placeholder="Nombre del Material" type="text" required disabled="true">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-sm btn-primary" id="search-client" data-toggle="modal" data-target="#modalMateriales"><i class="pe-7s-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Cantidad">Cantidad</label>
                            <input type="number" max="99" min="1" class="form-control" id="Cantidad" name="Cantidad" required>
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="Fabrica">Fabrica</label>
                            <input type="text" class="form-control" id="Fabrica" name="Fabrica" required disabled="true">
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="Almacen">Almacén</label>
                            <input type="text" class="form-control" id="Almacen" name="Almacen" required disabled="true">
                            <div class="help-block with-errors text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="partida"></div>

            <div style="overflow:auto;">
                <div style="float:right;">
                    <button type="button" class="btn btn-info" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
                    <button type="button" class="btn btn-primary" id="nextBtn" onclick="nextPrev(1)">Next</button>
                    <button type="submit" id="form-submit" class="btn btn-primary" style="display: none;">Submit</button>
                </div>
            </div>
            <!-- Circles which indicates the steps of the form: -->
            <div style="text-align:center;margin-top:40px;">
                <span class="step"></span>
                <span class="step"></span>
            </div>
            <div id="msgSubmit" class="h3 text-center hidden"></div>
            <div class="clearfix"></div>
        </form>

    </div>
</div>

<!-- The Modal Clientes -->
<div class="modal" id="modalClientes">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Catálogo de clientes</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <div id="loadTableClient"></div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!-- The Modal Materiales -->
<div class="modal" id="modalMateriales">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Catálogo de materiales</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <div id="loadTableMateriales"></div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<?php
include './footer.php';
?>

<script>
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the crurrent tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
            $("#form-submit").hide();
            $("#nextBtn").show();
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
            $("#form-submit").show();
            $("#nextBtn").hide();
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(n)
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm())
            return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("regForm").submit();
            //form-submit
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
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
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
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }
</script>

<script src="asset/js/SolpeSap.js"></script>
