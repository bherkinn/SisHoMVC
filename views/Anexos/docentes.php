<?php 
	require_once("../../models/docentes_manual.php");

	$accion=$_GET["accion"];
	$o=new Docentes_Manual();
	switch ($accion) {
		case 'cboPeriodo':
			echo json_encode($o->cboPeriodos());
			break;

		case 'cboDocentes':
			echo json_encode($o->cboDocentes());
			break;

		case 'horarioDocente':
			$periodo=$_GET["periodo"];
			$iddocente=$_GET["iddocente"];
			echo json_encode($o->HorarioDocente($iddocente,$periodo));
			break;
		
		default:
			
			break;
	}
?>