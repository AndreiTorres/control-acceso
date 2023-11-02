<?php 
require "../../config/Conexion.php";
class Asistencia{

public function __construct(){}

public function verificar_usuario($codigo_persona){
	$sql = "SELECT u.nombre,u.apellidos,u.imagen, u.idtipousuario, u.estado, (select t.nombre FROM tipousuario t where t.idtipousuario = u.idtipousuario) as tipo_usuario FROM usuarios u WHERE u.codigo_persona='$codigo_persona' AND u.estado ='1';";
	return ejecutarConsultaSimpleFila($sql);
}

public function tipo_usuario($codigo_persona){
	$sql = "SELECT (select t.nombre FROM tipousuario t where t.idtipousuario = u.idtipousuario) as tipo_usuario FROM usuarios u WHERE u.codigo_persona='$codigo_persona' AND u.estado ='1';";
	return ejecutarConsultaSimpleFila($sql);
}

public function ultima_asistencia_cancilleria($codigo_persona){
	$fecha = date("Y-m-d");
	$sql = "SELECT * FROM asistencia_cancilleria WHERE codigo_persona = '$codigo_persona' AND fecha = '$fecha' ORDER BY entrada DESC LIMIT 1;";
	return ejecutarConsultaSimpleFila($sql);
}

public function horario_dia($codigo_persona,$dia){
	$sql="SELECT $dia FROM horario WHERE codigo_persona = '$codigo_persona'";
	return ejecutarConsultaSimpleFila($sql);
}

public function registrar_entrada_cancilleria($codigo_persona,$tipo){
	date_default_timezone_set('America/Mexico_City');
	$fecha = date("Y-m-d");
	$sql = "INSERT INTO asistencia_cancilleria (codigo_persona,  tipo, fecha) VALUES ('$codigo_persona', '$tipo', '$fecha')";
	return ejecutarConsulta($sql);
}

public function registrar_salida_cancilleria($idasistencia){
	$sql = "UPDATE asistencia_cancilleria SET salida = CURRENT_TIMESTAMP WHERE idasistencia = $idasistencia";
	return ejecutarConsulta($sql);
}

}

?>