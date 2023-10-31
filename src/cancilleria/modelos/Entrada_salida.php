<?php 
require "../../config/Conexion.php";
class Asistencia{
public function __construct(){}

public function listar_asistencia($fecha_inicio,$fecha_fin,$codigo_persona){
	$sql="SELECT a.idasistencia,a.codigo_persona,a.entrada,a.salida,a.fecha,a.tipo,a.anotacion,u.nombre,u.apellidos FROM asistencia_cancilleria a INNER JOIN usuarios u ON  a.codigo_persona=u.codigo_persona WHERE DATE(a.fecha)>='$fecha_inicio' AND DATE(a.fecha)<='$fecha_fin' AND a.codigo_persona='$codigo_persona' ORDER BY a.entrada ASC";
	return ejecutarConsulta($sql);
}

public function nuevo_tipo($idasistencia,$tipoAsistencia,$anotacion){
	$sql = "UPDATE asistencia_cancilleria SET tipo='$tipoAsistencia',anotacion='$anotacion' WHERE asistencia_cancilleria.idasistencia = '$idasistencia';";
	return ejecutarConsulta($sql);
}

public function nueva_asistencia($codigo_persona, $fecha, $anotacion, $tipoAsistencia) {
	$sql = "INSERT INTO `asistencia_cancilleria` (`idasistencia`, `codigo_persona`, `entrada`,`salida`, `fecha`, `tipo`, `anotacion`) VALUES (NULL, '$codigo_persona', '$fecha 00:00:00', '$fecha 00:00:00', '$fecha', '$tipoAsistencia', '$anotacion')";
	return ejecutarConsulta($sql);
}

public function existe_asistencia($codigo_persona,$fecha) {
	$sql = "SELECT * FROM asistencia_cancilleria where codigo_persona = '$codigo_persona' AND fecha = '$fecha'";
	return ejecutarConsultaSimpleFila($sql);
}

public function borrar_asistencia($id_asistencia){
	$sql = "DELETE FROM asistencia_cancilleria WHERE idasistencia = $id_asistencia";
	return ejecutarConsulta($sql);
}

public function editar_entrada($id_asistencia, $hora, $dia){
	$entrada = $dia . " " . $hora;
	$sql = "UPDATE asistencia_cancilleria SET entrada = '$entrada' WHERE asistencia_cancilleria.idasistencia = '$id_asistencia';";
	return ejecutarConsulta($sql);
}

public function editar_salida($id_asistencia, $hora, $dia){
	$salida = $dia . " " . $hora;
	$sql = "UPDATE asistencia_cancilleria SET salida = '$salida' WHERE asistencia_cancilleria.idasistencia = '$id_asistencia';";
	return ejecutarConsulta($sql);
}
}

?>
