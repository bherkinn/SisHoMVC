<?php 
	require_once("../../models/socket.php");

	$accion=$_GET["accion"];
	$o=new socket();
	switch ($accion) {
		case 'horarioFila':
			$indice=$_GET["idfila"];
			echo json_encode($o->MostrarDatosFila($indice));

			break;

		case 'horarioDocente':
			$indice=$_GET["idfila"];
			$base=$o->MostrarDatosFila($indice);
			foreach ($base as $a) {
				$iddocente=$a->codDocente;
				$perAcademico=$a->perAcademico;
			}
			echo json_encode($o->HorarioDocente($iddocente,$perAcademico));
			break;

		case 'horarioAula':
			$indice=$_GET["idfila"];
			$base=$o->MostrarDatosFila($indice);
			foreach ($base as $a) {
				$idaula=$a->codAula;
				$perAcademico=$a->perAcademico;
			}
			echo json_encode($o->HorarioAula($idaula,$perAcademico));
			break;

		case 'horarioCurso':
			$indice=$_GET["idfila"];
			$base=$o->MostrarDatosFila($indice);
			foreach ($base as $a) {
				$idcurso=$a->codCurso;
				$perAcademico=$a->perAcademico;
			}
			echo json_encode($o->HorarioCurso($idcurso,$perAcademico));
			break;

		case 'horarioModulo':
			$ciclo=$_GET["ciclo"];
			$grupo=$_GET["grupo"];
			$periodo=$_GET["periodo"];
			echo json_encode($o->Modulos($ciclo,$grupo,$periodo));
			break;
		
		default:
			
			break;
	}
?>