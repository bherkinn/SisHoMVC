<?php 
	require_once("../../models/cursos_manual.php");

	$accion=$_GET["accion"];
	$o=new Cursos_Manual();
	switch ($accion) {
		case 'cboPeriodo':
			echo json_encode($o->cboPeriodos());
			break;

		case 'cboCurso':
			echo json_encode($o->cboCursos());
			break;

		case 'horarioCurso':
			$periodo=$_GET["periodo"];
			$idcurso=$_GET["idcurso"];
			echo json_encode($o->HorarioCurso($idcurso,$periodo));
			break;
		case 'cursoPorCurricula':
			$vercurricular=$_GET["vercurricular"];
			echo json_encode($o->mostrarCursosPorPeriodo($vercurricular));
		
		default:
			
			break;
	}
?>