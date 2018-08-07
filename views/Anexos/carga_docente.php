<?php 

	require_once("../../models/carga_docente.php");

	$accion=$_GET["accion"];
	$o=new CargaDocente();

		switch ($accion) {

			case 'ObtenerDocentes':
				echo json_encode($o->ObtenerDocentesHorarios());
				break;

			case 'ObtenerHorariosDistintos':
				echo json_encode($o->ObtenerHorariosDistintos());
				break;

			case 'ObtenerHorariosTotal':
				echo json_encode($o->ObtenerHorariosTotal());
				break;

			default:
				
				break;
		}

 ?>