<?php include './headers.php'; ?>

<div class="page-header card">
    <div class="card-body">
        <!--i>row</i-->
        <div class="row">
            <div class="col-sm-4">
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
            <div class="col-sm-4"></div>
            <div class="col-sm-4"></div>
        </div>
        <!--i>end row</i-->
    </div>
</div>
<?php include './footer.php'; ?>