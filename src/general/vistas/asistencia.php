<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Control de acceso</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../../public/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/css/font-awesome.css">
    <link rel="stylesheet" href="../../public/css/AdminLTE.min.css">
    <link rel="stylesheet" href="../../public/css/blue.css">
    <link rel="shortcut icon" href="../../public/images/Nuevo Logo.jpg">
  </head>
  <body class="hold-transition lockscreen">
    <div class="lockscreen-wrapper">
      <?php ?>
        <div name="movimientos" id="movimientos">
        </div> 
      <div class="lockscreen-logo">
        <h1 href="#"><b><font color="#9D2449">REGISTRO DE ASISTENCIAS</h1></b></font>
      </div><br>
      <div class="lockscreen-name"></div>
      <div class="lockscreen-item">
        <div class="lockscreen-image">
          <img src="../../public/images/profile.png" alt="User Image">
        </div>
        <form  action="" class="lockscreen-credentials" name="formulario" id="formulario" method="POST">
          <div class="input-group">
            <input type="password" class="form-control" name="codigo_persona" id="codigo_persona" placeholder="Num. Identificación" autofocus>

            <div class="input-group-btn">
              <button type="submit" class="btn btn-primary"><i class="fa fa-arrow-right text-muted"></i></button>
            </div>
          </div>
        </form>
      </div>
      <div class="help-block text-center">
      <a href="../../../index.php" style="width: 95px;" class=" btn btn-default btn-secondary btn-lg "><strong>Salir</a>
      </div></strong>
    </div>

        <script src="../../public/js/jquery-3.1.1.min.js"></script>
        <script src="../../public/js/bootstrap.min.js"></script>
        <script src="../../public/js/bootbox.min.js"></script>
        <script type="text/javascript" src="scripts/asistencia.js"></script>
  </body>
</html> 