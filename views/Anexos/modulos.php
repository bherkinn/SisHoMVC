<?php 
	require_once("../../models/modulos_manual.php");

		$accion=$_GET["accion"];
		$o=new Modulos_Manual();
		switch ($accion) {

			case 'periodo':
				echo json_encode($o->ObtenerPeriodos());
				break;

			case 'horario':
				$periodo=$_GET["periodo"];
				$ciclo=$_GET["ciclo"];
				$grupo=$_GET["grupo"];
				echo json_encode($o->Modulos($ciclo,$grupo,$periodo));

				break;
			default:
				
				break;
		}

		
	
?>