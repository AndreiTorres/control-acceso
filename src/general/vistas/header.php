<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CONTROL DE ACCESO</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="../../public/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../public/css/font-awesome.css">
  <link rel="stylesheet" href="../../public/css/AdminLTE.min.css">
  <link rel="stylesheet" href="../../public/css/jquery-ui.multidatespicker.css">
  <link rel="stylesheet" href="../../public/css/jquery-ui.min.css">
  <link rel="stylesheet" href="../../public/css/alertify.min.css" />
  <link rel="stylesheet" href="../../public/css/themes/default.min.css" />
  <link rel="stylesheet" href="../../public/css/styles.css" />
  <link rel="stylesheet" href="../../public/css/style_alertify.css" />
  <link rel="stylesheet" href="../../public/css/styles.css" />
  <link rel="stylesheet" href="../../public/css/_all-skins.min.css">
  <link rel="sre-logo" href="../../public/images/Nuevo Logo.png">
  <link rel="shortcut icon" href="../../public/images/Nuevo Logo.png">
  <link rel="stylesheet" type="text/css" href="../../public/datatables/jquery.dataTables.min.css">
  <link href="../../public/datatables/buttons.dataTables.min.css" rel="stylesheet" />
  <link href="../../public/datatables/responsive.dataTables.min.css" rel="stylesheet" />
  <link rel="stylesheet" type="text/css" href="../../public/css/bootstrap-select.min.css">
</head>

<body class="hold-transition skin-blue sidebar-mini">
  <div id="fb-root"></div>
  <div class="fb-customerchat" attribution=setup_tool page_id="280144326139427" theme_color="#0084ff">
  </div>
  <div class="wrapper">

    <header class="main-header">
      <a href="#" class="logo"></a>
      <nav class="navbar navbar-static-top">
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Navegación</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="../../files/usuarios/<?php echo $_SESSION['imagen']; ?>" class="user-image" alt="User Image">
                <span id="nombreu" class="hidden-xs">
                <?php echo $_SESSION['nombre'] . ' ' . $_SESSION['apellidos']; ?>
                </span>
              </a>
              <ul class="dropdown-menu">
                <li class="user-header">
                  <img src="../../files/usuarios/<?php echo $_SESSION['imagen']; ?>" class="img-circle" alt="User Image">
                  <p>
                  <?php echo $_SESSION['nombre']; ?>
                    <small>
                    <?php
                      require_once '../../config/Conexion.php';
                      $sql = "SELECT nombre FROM departamento WHERE iddepartamento =" . $_SESSION['departamento'] . ";";
                      $rspsta = ejecutarConsulta($sql);
                      $reg = $rspsta->fetch_object();
                      echo $reg->nombre;
                      ?>
                    </small>
                  </p>
                </li>
                <li class="user-footer">
                  <div class="pull-right">
                    <a href="../../general/ajax/sesion.php?op=salir" class="btn btn-default btn-flat" class="btn btn-default btn-flat">Salir</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <aside class="main-sidebar">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image">
            <img src="../../files/usuarios/<?php echo $_SESSION['imagen']; ?>" class="img-circle" style="width: 50px; height: 50px;" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>
            <?php echo $_SESSION['nombre']; ?>
            </p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <ul class="sidebar-menu tree" data-widget="tree">
          <li class="header">MENÚ DE NAVEGACIÓN</li>
          <li><a href="../../general/vistas/escritorio.php"><i class="fa fa-home" style="font-size:24px;"></i>
              <span>Escritorio</span></a></li>
              <?php
          switch ($_SESSION['tipousuario']) {
            case 'Administrador':
              ?>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-institution" aria-hidden="true"></i>
              <span class="pull-right-container">
                <span>Cancillería</span>
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="../../cancilleria/vistas/usuarioUI.php"><i class="fa fa-circle-o"></i> Usuarios</a></li>
              <li><a href="../../cancilleria/vistas/departamentoUI.php"><i class="fa fa-circle-o"></i> Puestos</a></li>
              <li><a href="../../cancilleria/vistas/reporte.php"><i class="fa fa-circle-o"></i> Reporte</a></li>
              <li><a href="../../cancilleria/vistas/entradas_salidas.php"><i class="fa fa-circle-o"></i> Entradas/Salidas</a></li>
            </ul>
          </li>
          <?php
              break;
          }
          ?>
        </ul>
      </section>

    </aside>

