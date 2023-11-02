<?php
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: login.html");
} else {
  require 'header.php';
  require_once('../modelos/Sesion.php');
  $usuario = new Usuario();

?>


  <div class="content-wrapper">
    <section class="content">
       
      <?php
      switch ($_SESSION['tipousuario']) {
        case 'Administrador':    
          require('modulos/cancilleria.php');  
          break;
      }
      ?>
    </section>
  </div>
<?php
  require 'footer.php';
}
ob_end_flush();
?>