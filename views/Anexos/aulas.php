<?php 
	require_once("../../models/aulas_manual.php");

	$accion=$_GET["accion"];
	$o=new Aulas_Manual();
	switch ($accion) {
		case 'cboPeriodo':
			echo json_encode($o->cboPeriodos());
			break;

		case 'cboAulas':
			echo json_encode($o->cboAulas());
			break;

		case 'horarioAula':
			$periodo=$_GET["periodo"];
			$idaula=$_GET["idaula"];
			echo json_encode($o->HorarioAula($idaula,$periodo));
			break;
		
		default:
			
			break;
	}
?>