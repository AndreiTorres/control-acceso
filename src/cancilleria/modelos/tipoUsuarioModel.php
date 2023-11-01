<?php 
//incluir la conexion de base de datos
require "../../config/Conexion.php";
class Tipousuario{


	//implementamos nuestro constructor
public function __construct(){

}

//metodo para mostrar registros
public function mostrar($idtipousuario){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario='$idtipousuario'";
	return ejecutarConsultaSimpleFila($sql);
}

//listar y mostrar en selct
public function select(){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario = 6 OR idtipousuario = 7 ORDER BY nombre ASC";
	return ejecutarConsulta($sql);
}
public function select_general(){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario = 1 OR idtipousuario = 6 OR idtipousuario = 7 ORDER BY nombre ASC";
	return ejecutarConsulta($sql);
}
}
