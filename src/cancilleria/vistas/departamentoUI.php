<?php
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: ../../general/vistas/loginUI.php");
}else{
  if($_SESSION['tipousuario']!=='Administrador'){
    header("Location: ../../general/vistas/escritorio.php");
  }

require '../../general/vistas/header.php';



?>
  <div class="content-wrapper">
    <section class="content">

      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border">
              <h1 class="box-title">Departamentos <button class="btn btn-primary" id="btnagregar" onclick="mostrarform(true)"><i class="fa fa-plus-circle"></i>Agregar</button></h1>
              <div class="box-tools pull-right">

              </div>
            </div>
            <div class="panel-body table-responsive" id="listadoregistros">
              <table id="tbllistado" class="table table-striped table-bordered table-condensed table-hover">
                <thead>
                  <th>No.</th>
                  <th>Opciones</th>
                  <th>Nombre</th>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                  <th>No.</th>
                  <th>Opciones</th>
                  <th>Nombre</th>
                </tfoot>
              </table>
            </div>
            <div class="panel-body" style="height: 400px;" id="formularioregistros">
              <form action="" name="formulario" id="formulario" method="POST">
                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <label for="">Nombre</label>
                  <input class="form-control" type="hidden" name="iddepartamento" id="iddepartamento">
                  <input class="form-control" type="text" name="nombre" id="nombre" maxlength="50" placeholder="Nombre" required>
                </div>
                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <label for="">Descripcion</label>
                  <input class="form-control" type="text" name="descripcion" id="descripcion" maxlength="256" placeholder="Descripcion">
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button class="btn btn-primary" type="submit" id="btnGuardar"><i class="fa fa-save"></i> Guardar</button>

                  <button class="btn btn-default" onclick="cancelarform()" type="button"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
<?php 
require '../../general/vistas/footer.php';
?>
<script src="scripts/departamentoUI.js"></script>
<?php 
}
ob_end_flush();
?>