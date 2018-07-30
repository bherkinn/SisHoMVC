<?php 
	require_once("../../models/restaurar.php");

	$accion=$_GET["accion"];
	$o=new Restaurar();
	switch ($accion) {
		case 'docentes':
			echo json_encode($o->cboDocentes());
			break;

		case 'mostrarRestaurar':
			echo json_encode($o->Recuperar());
			break;

		case 'modificarEstado':
			$id=$_GET["id"];
			$estado=$_GET["estado"];
			$o->Borrar($id,$estado);	
			break;
		
		default:
			
			break;
	}
?>