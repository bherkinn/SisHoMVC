<?php 
	require_once("../../models/carga_curso.php");

	$accion=$_GET["accion"];
	$o=new CargaCurso();

		switch ($accion) {

			case 'cursos':
				echo json_encode($o->obtnerCursosPorCurricula());
				break;

			case 'reporteCursosT':
				echo json_encode($o->obtenerCargaCursosT());
				break;

			case 'reporteCursosP':
				echo json_encode($o->obtenerCargaCursosP());
				break;

			default:
				
				break;
		}
?>