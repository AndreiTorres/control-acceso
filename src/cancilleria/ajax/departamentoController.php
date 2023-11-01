<?php
require_once "../modelos/departamentoModel.php";
if (strlen(session_id()) < 1)
	session_start();

$departamento = new Departamento();

$iddepartamento = isset($_POST["iddepartamento"]) ? limpiarCadena($_POST["iddepartamento"]) : "";
$nombre = isset($_POST["nombre"]) ? limpiarCadena($_POST["nombre"]) : "";
$descripcion = isset($_POST["descripcion"]) ? limpiarCadena($_POST["descripcion"]) : "";

switch ($_GET["op"]) {
	case 'guardaryeditar':
		if (empty($iddepartamento)) {
			$rspta = $departamento->insertar($nombre, $descripcion);
			echo $rspta ? "Datos registrados correctamente" : "No se pudo registrar los datos";
		} else {
			$rspta = $departamento->editar($iddepartamento, $nombre, $descripcion);
			echo $rspta ? "Datos actualizados correctamente" : "No se pudo actualizar los datos";
		}
		break;


	case 'eliminar':
		$rspta = $departamento->eliminar($iddepartamento);
		echo $rspta ? "Puesto eliminado correctamente" : "No se pudo eliminar el puesto";
		break;

	case 'mostrar':
		$rspta = $departamento->mostrar($iddepartamento);
		echo json_encode($rspta);
		break;

	case 'listar':
		$rspta = $departamento->listar();
		$data = array();

		while ($reg = $rspta->fetch_object()) {
			$data[] = array(
				"0" => "",
				"1" => '<button class="btn btn-warning btn-xs" onclick="mostrar(' . $reg->iddepartamento . ')"><i class="fa fa-pencil"></i></button>' . ' ' . '<button class="btn btn-danger btn-xs" onclick="eliminar(' . $reg->iddepartamento . ')"><i class="fa fa-close"></i></button>',
				"2" => $reg->nombre,
			);
		}
		$results = array(
			"sEcho" => 1, 
			"iTotalRecords" => count($data), 
			"iTotalDisplayRecords" => count($data), 
			"aaData" => $data
		);
		echo json_encode($results);
		break;

	case 'selectDepartamento':
		$rspta = $departamento->select();
		echo '<option value="">seleccione...</option>';
		while ($reg = $rspta->fetch_object()) {
			echo '<option value=' . $reg->iddepartamento . '>' . $reg->nombre . '</option>';
		}
		break;
}
