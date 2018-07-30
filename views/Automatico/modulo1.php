<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<title>Modulo 1</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<!-- **************************************CSS************************************* -->
	<link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/comun-tablas.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
    <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/modulos.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/select2/css/select2.min.css">
	<!-- ***************************************JS************************************* -->
	<script type="text/javascript" src="views/Librerias/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="views/Librerias/select2/js/select2.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="views/Librerias/js/fancywebsocket.js"></script>

</head>

<body>
	<?php 
         require_once("views/menu.php");
    ?>

		<div id="contenedor" class="contenedor-tapar">

			<center>
				<div class="titulo-tabla">MODULO 1 - AUTOMÁTICO</div>
			</center>

	         <div id="tabla" class="container" style="">

			</div>
			<br>

		</div>


	<script type="text/javascript">
		function CrearTabla(filas,columnas,hora){

			var dias = new  Array('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADOS','DOMINGOS');
			var cantidad="";
			var tabla=document.createElement("table");
			tabla.setAttribute("id","tabla-modulo1");
			tabla.setAttribute("class","table-responsive-horario border rounded");
			tabla.setAttribute("border","3");
		    //tabla.style.border="1px solid gray";
		    var content=document.getElementById("tabla");
		    content.appendChild(tabla);
		    var titulo="UNIVERSIDAD NACIONAL DE INGENIERIA";
		    var titulo2="FACULTAD DE INGENIERIA MECANICA";
		    var subtitulo="COMISION DE HORARIOS";
		   
			
			horainicial=hora;
			$("#tabla-modulo1").append("<tr><td colspan='3' class='cabecera-tabla cam'>"+titulo+"<br>"+titulo2+"</td>"+
										   "<td class='cam2' colspan='2' rowspan='2'></td>"+
										   "<td class='cam3' colspan='2' rowspan='2'>"+
										   "<div class='titulos-fim'>"+ 
										   "Ciclo : <br>"+
										   "Especialidad : <br>"+
										   "Periodo Academicó : </div>"+
										   "<div id='m1datos' class='datos-fim'></div>"+
										   "<div id='m1fecha' class='fecha-fim'></div>"+
										   "<div class='grupo-fim-titulo'>Grupo :</div>"+
										   "<div id='m1grupo' class='grupo-fim'></div></td></tr>");
			$("#tabla-modulo1").append("<tr><td colspan='3' class='cabecera-tabla2'>"+subtitulo+"</td></td></tr>");
			for(i=0;i<filas;i++){
				$("#tabla-modulo1").append("<tr>");
				for(u=0;u<columnas;u++)
				{
					if(i==0)
					{
						$("#tabla-modulo1").append("<th class='horas' id='"+u+"'></th>");
						if(u!=0)
						{
							$("#"+u).html(dias[u-1]);
						}
					}
					else
					{	
						$("#tabla-modulo1").append("<td id='m1"+(horainicial-1)+""+u+"'></td>");

						if(u!=0)
						{
							$("#m1"+(horainicial-1)+""+u).addClass("contenido-tabla");

							
						}
						else
						{
							$("#m1"+(horainicial-1)+""+u).addClass("horas");

							inicial=hora.toString().length;
							final=(hora+1).toString().length;
							console.log(cantidad);

							if(inicial>1&&final>1)
							{
								$("#m1"+(horainicial-1)+""+u).html(hora+"-"+(hora+1));
							}
							
							if(inicial==1&&final>1)
							{
								$("#m1"+(horainicial-1)+""+u).html("0"+hora+"-"+(hora+1));
							}

							if(inicial==1&&final==1)
							{
								$("#m1"+(horainicial-1)+""+u).html("0"+hora+"-"+"0"+(hora+1));
							}
							
							

							hora++;
							
						}
					}
				}

				horainicial++;

				$("#tabla-modulo1").append("</tr>");
				$("#0").html("HORAS");
			}
			$("#tabla").append("<div id='aviso' class='rotar'>Seleccione</div>");
			$("#tabla").append("<div id='m1vacio' class='deshabilitar'>Vacio</div>");
		}

			CrearTabla(16,7,7);
		
	</script>


    </style>
		
	<script type="text/javascript" src="views/Librerias/js/comun.js">

	</script>


</body>

</html>