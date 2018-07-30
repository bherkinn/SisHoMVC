<?php 	
	
	if(isset($_GET["view"]))
	{
		$vista=$_GET["view"];
		switch ($vista) {

			case 'Restaurar':
				require_once("controllers/restaurar_controller.php");
				break;

			case 'CargaCurso':
				require_once("controllers/carga_curso_controller.php");
				break;

			case 'Aulas_Automatico':
				require_once("controllers/Automatico/aulas_automatico_controller.php");
				break;

			case 'Docentes_Automatico':
				require_once("controllers/Automatico/docentes_automatico_controller.php");
				break;

			case 'Cursos_Automatico':
				require_once("controllers/Automatico/cursos_automatico_controller.php");
				break;

			case 'Modulo1_Automatico':
				require_once("controllers/Automatico/modulo1_automatico_controller.php");
				break;

			case 'Modulo2_Automatico':
				require_once("controllers/Automatico/modulo2_automatico_controller.php");
				break;

			case 'Modulo3_Automatico':
				require_once("controllers/Automatico/modulo3_automatico_controller.php");
				break;

			case 'Aulas_Manual':
				require_once("controllers/Manual/aulas_manual_controller.php");
				break;

			case 'Docentes_Manual':
				require_once("controllers/Manual/docentes_manual_controller.php");
				break;

			case 'Cursos_Manual':
				require_once("controllers/Manual/cursos_manual_controller.php");
				break;

			case 'Modulo_Manual':
				require_once("controllers/Manual/modulo_manual_controller.php");
				break;

			default:
				# code...
				break;
		}
	}
	else
	{
		require_once("controllers/principal_controller.php");
	}
?>