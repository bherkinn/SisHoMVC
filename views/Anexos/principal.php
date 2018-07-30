<?php 
	
	require_once("../../models/principal.php");
	if(isset($_GET["accion"]))
	{
		$accion=$_GET["accion"];
	}else{
		$accion=$_POST["accion"];
	}
	
	$o=new Principal();

		switch ($accion) {

			case 'cboAulas':
				echo json_encode($o->cboAulas());
				break;

			case 'cboDocentes':
				echo json_encode($o->cboDocentes());
				break;

			case 'cboCursos':
				echo json_encode($o->cboCursos());
				break;

			case 'cboPeriodos':
				echo json_encode($o->mostrarPeriodos());
				break;

			case 'cboCursosPeriodo':

				$vercurricular=$_GET["vercurricular"];
				echo json_encode($o->mostrarCursosPorPeriodo($vercurricular));
				break;

			case 'correspondencia':
				$codCurso=$_GET['codCurso'];
				$verCurricular=$_GET['verCurricular'];
				echo json_encode($o->MostrarCorrespondencias($codCurso,$verCurricular));
				break;

			case 'MostrarHorariosTabla':
				$curso=$_GET["curso"];
				$ciclo=$_GET["ciclo"];
				$estado=$_GET["estado"];
				echo json_encode($o->MostrarHorariosTabla($curso,$ciclo,$estado));
				break;

			case 'versionCurricular':
				echo json_encode($o->mostrarVerCurricular());
				break;

			case 'actualizar':
				$datos[0]=$_POST["txtdia"];
				$datos[1]=$_POST["txthora"];
				$datos[2]=$_POST["txtcurso"];
				$datos[3]=$_POST["txtseccion"];
				$datos[4]=$_POST["txttp"];
				$datos[5]=$_POST["cboaula"];
				$datos[6]=$_POST["cbodocente"];
				$datos[7]=$_POST["txtc1"];
				$datos[8]=$_POST["txtc2"];
				$datos[9]=$_POST["txtc3"];	 
				$datos[10]=$_POST["txtc4"];	 
				$datos[11]=$_POST["txtc5"];
				$datos[12]=$_POST["txtc6"];
				$datos[13]=$_POST["txtc7"];
				$datos[14]=$_POST["txtc8"];
				$datos[15]=$_POST["txtc9"];
				$datos[16]=$_POST["txtc10"];
				$datos[17]=$_POST["id"];
				 //Añadido Recientemente
				$datos[18]=$_POST["txtorden"];
				$datos[19]=$_POST["cboaula2"];
				$o->ActualizarDatos($datos);
				break;

			case 'cambiarCursoTotal':
				$periodo=$_POST["periodo"];
				$codCurso=$_POST["codCurso"];
				$codCursoNuevo=$_POST["codCursoNuevo"];
				$o->modificarCursoTotalTablaHorarios($periodo,$codCurso,$codCursoNuevo);
				break;

			case 'borrarPorCurso':
				$curso=$_GET["curso"];
				$periodo=$_GET["periodo"];
				$o->BorrarPorCurso($curso,$periodo);	
				break;

			case 'borrar':
				$id=$_POST["id"];
				$estado=$_POST["estado"];
				$o->Borrar($id,$estado);	
				break;

			case 'modificarCursoTablaHorarios':
				$id=$_POST["id"];
				$codCurso=$_POST["codCurso"];
				$o->modificarCursoTablaHorarios($id,$codCurso);	
				break;

			case 'nuevoPeriodo':
				$anteperiodo=$_POST["anteperiodo"];
				$neoperiodo=$_POST["neoperiodo"];
				$curricula=$_POST["curricula"];
				$o->NuevoPeriodo($anteperiodo,$neoperiodo);
				$o->agregarPeriodoPorCurricula($neoperiodo,$curricula);
				break;

			default:
				
				break;
		}
?>