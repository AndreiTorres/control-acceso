<?php 
require "../../config/Conexion.php";
class Tipousuario{

public function __construct(){

}

public function mostrar($idtipousuario){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario='$idtipousuario'";
	return ejecutarConsultaSimpleFila($sql);
}

public function select(){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario = 6 OR idtipousuario = 7 ORDER BY nombre ASC";
	return ejecutarConsulta($sql);
}
public function select_general(){
	$sql="SELECT * FROM tipousuario WHERE idtipousuario = 1 OR idtipousuario = 6 OR idtipousuario = 7 ORDER BY nombre ASC";
	return ejecutarConsulta($sql);
}
}
