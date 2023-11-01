<?php 
//incluir la conexion de base de datos
require "../../config/Conexion.php";
class Departamento{

public function __construct(){

}

public function insertar($nombre,$descripcion){
	date_default_timezone_set('America/Mexico_City');
	$fechacreada=date('Y-m-d H:i:s');
	$sql="INSERT INTO departamento (nombre,descripcion,fechacreada, idtipousuario) VALUES ('$nombre','$descripcion','$fechacreada', 7)";
	return ejecutarConsulta($sql);
}

public function editar($iddepartamento,$nombre,$descripcion){
	$sql="UPDATE departamento SET nombre='$nombre',descripcion='$descripcion'
	WHERE iddepartamento='$iddepartamento'";
	return ejecutarConsulta($sql);
}
public function eliminar($iddepartamento){
	$sql="DELETE FROM departamento WHERE iddepartamento='$iddepartamento'";
	return ejecutarConsulta($sql);
}

public function mostrar($iddepartamento){
	$sql="SELECT * FROM departamento WHERE iddepartamento='$iddepartamento'";
	return ejecutarConsultaSimpleFila($sql);
}

public function listar(){
	$sql="SELECT * FROM departamento WHERE idtipousuario= 7";
	return ejecutarConsulta($sql);
}

public function select(){
	$sql="SELECT * FROM departamento WHERE idtipousuario= 7";
	return ejecutarConsulta($sql);
}

public function regresaRolDepartamento($departamento){
	$sql="SELECT nombre FROM departamento where iddepartamento='$departamento'";		
	return ejecutarConsulta($sql);
}



}
