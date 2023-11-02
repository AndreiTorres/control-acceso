<?php
require_once "../modelos/tipoUsuarioModel.php";
if (strlen(session_id()) < 1)
	session_start();

$tipousuario = new Tipousuario();

$idtipousuario = isset($_POST["idtipousuario"]) ? limpiarCadena($_POST["idtipousuario"]) : "";
$nombre = isset($_POST["nombre"]) ? limpiarCadena($_POST["nombre"]) : "";
$descripcion = isset($_POST["descripcion"]) ? limpiarCadena($_POST["descripcion"]) : "";

switch ($_GET["op"]) {
	case 'mostrar':
		$rspta = $tipousuario->mostrar($idtipousuario);
		echo json_encode($rspta);
		break;

	case 'selectTipousuario':
		$rspta = $tipousuario->select_general();
		echo '<option value="">seleccione...</option>';
		while ($reg = $rspta->fetch_object()) {
			echo '<option value=' . $reg->idtipousuario . '>' . $reg->nombre . '</option>';
		}
		break;

}
