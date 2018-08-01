<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<title>M-Docentes</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<!-- **************************************CSS************************************* -->
	<link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/comun-tablas.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
    <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/docentes.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/select2/css/select2.min.css">

	<!-- ***************************************JS************************************* -->
	<script type="text/javascript" src="views/Librerias/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="views/Librerias/select2/js/select2.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.bundle.min.js"></script>
	<!-- <script type="text/javascript" src="../../librerias/js/fancywebsocket.js"></script> -->
<!-- 	<script type="text/javascript" src="librerias/jqueryPlugintipsy/js/jquery.tipsy.js"></script> -->


	 <style type="text/css">
	 	.cboperiodo{
			margin-left: 10px;
			margin-right: 10px;
			padding: 5px;
			font-size: 12px;
		    border-radius: 4px;
		}
		.titulo-tabla{
			padding: 5px;
			font-weight: bold;
			font-size: 28px;
			color: #787777;
		}
		.btn-actualizar-tabla{
			
			border:none;
			border-radius: 4px;
		}
		.centrar{
			margin:auto;
			display: flex;
			width: 80%;
			justify-content: center;
			margin-bottom: 15px;
		}
	 </style>

	

</head>

<body>
		<?php 
         require_once("views/menu.php");
      ?>

		<div id="contenedor" class="contenedor-tapar">
		<center>
			<div class="titulo-tabla">DOCENTES - MANUAL</div>
		</center>
		<div class="centrar">  
		<select id="select-docentes">
					
		</select>
		<select id="cboperiodo" class="cboperiodo " style="font-size: 12px;">
		</select>
		<button id="btn-actualizar-tabla" class="fas fa-redo-alt btn-info btn-actualizar-tabla"></button>

		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="container-fluid">
				<center>
					<div id="tabla" class="">

					</div>
				</center>
		</div>
		</div>
		<br>
          <div id="tabla" class="container">

		</div>
		<br>
		</div>

	<script type="text/javascript">

		function CrearTabla(filas,columnas,hora){

			var dias = new  Array('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADOS','DOMINGOS');
			var cantidad="";
			var tabla=document.createElement("table");
			tabla.setAttribute("id","tabla-docentes");
			tabla.setAttribute("class","table-responsive-horario border rounded");
			tabla.setAttribute("border","3");
		    //tabla.style.border="1px solid gray";
		    var content=document.getElementById("tabla");
		    content.appendChild(tabla);
		    var titulo="UNIVERSIDAD NACIONAL DE INGENIERIA - FACULTAD DE INGENIERIA MECANICA - COMISION DE HORARIOS";
		    var carga="CARGA HORARIA/SEM.";
			
			horainicial=hora;
			$("#tabla-docentes").append("<tr><td colspan='5' class='cabecera-tabla ca'>"+titulo+"</td><td class='ca'>"+carga+"</td><td class='td-periodo' rowspan='2'></td></tr>");
			$("#tabla-docentes").append("<tr><td id='nomdocente' colspan='5' class='cabecera-tabla2'></td><td id='horas' class='hora'></td></tr>");
			for(i=0;i<filas;i++){
				$("#tabla-docentes").append("<tr>");
				for(u=0;u<columnas;u++)
				{
					if(i==0)
					{
						$("#tabla-docentes").append("<th class='horas' id='"+u+"'></th>");
						if(u!=0)
						{
							$("#"+u).html(dias[u-1]);
						}
					}
					else
					{	
						$("#tabla-docentes").append("<td id='d"+(horainicial-1)+""+u+"'></td>");

						if(u!=0)
						{
							$("#d"+(horainicial-1)+""+u).addClass("contenido-tabla");

							
						}
						else
						{
							$("#d"+(horainicial-1)+""+u).addClass("horas");

							inicial=hora.toString().length;
							final=(hora+1).toString().length;
							// console.log(cantidad);

							if(inicial>1&&final>1)
							{
								$("#d"+(horainicial-1)+""+u).html(hora+"-"+(hora+1));
							}
							
							if(inicial==1&&final>1)
							{
								$("#d"+(horainicial-1)+""+u).html("0"+hora+"-"+(hora+1));
							}

							if(inicial==1&&final==1)
							{
								$("#d"+(horainicial-1)+""+u).html("0"+hora+"-"+"0"+(hora+1));
							}
							
							

							hora++;
							
						}
					}
				}

				horainicial++;

				$("#tabla-docentes").append("</tr>");
				$("#0").html("HORAS");
			}

		}

			CrearTabla(16,7,7);
		
	</script>


    </style>
		
	<script type="text/javascript" src="views/Librerias/js/comun.js" ></script>

	<script type="text/javascript">

		$.get("views/Anexos/docentes.php",{accion:"cboPeriodo"},
            function(data){
                cboperiodo=JSON.parse(data);
                cantidadcbp=Object.keys(cboperiodo).length;
                for(i=0;i<cantidadcbp;i++)
                {
                    $("#cboperiodo").append("<option value="+cboperiodo[i]["perAcademico"]+">"+cboperiodo[i]["perAcademico"]+"</option>");
                }

                $.get("views/Anexos/docentes.php",{accion:"cboDocentes"},
	            function(data){
            	cbodocente=JSON.parse(data);
            	cantidaddocente=Object.keys(cbodocente).length;
            	for(u=0;u<cantidaddocente;u++)
            	{
            		$("#select-docentes").append("<option value="+cbodocente[u]["codDocente"]+">"+cbodocente[u]["apePaterno"]+" "+cbodocente[u]["apeMaterno"]+", "+cbodocente[u]["nombres"]+"</option>");

            	}
                mostrarDocentes();
				});
            });

		function mostrarDocentes(){
			iddocente=$("#select-docentes").val();
        	periodo=$("#cboperiodo").val();
			$.get("views/Anexos/docentes.php",{accion:"horarioDocente",iddocente:iddocente,periodo:periodo},
				function(data){
				var hdocentes=JSON.parse(data);
				
					llenarTablaDocente(hdocentes);
				
			});
		}

		$(document).ready(function(){
			$("#select-docentes").change(function(){
				$("#select-docentes option:selected").each(function(){
					mostrarDocentes();
				});
			});
			$("#btn-actualizar-tabla").click(function(){
					mostrarDocentes();
			});
		});

		$(document).ready(function(){
			$("#cboperiodo").change(function(){
				$("#cboperiodo option:selected").each(function(){
					mostrarDocentes();
				});
			});
		});
		// -------------------------------------------------------------

		var medida;
		$(window).resize(function(){
			if($(window).width()!=medida)
			{
				if ($(window).width()<=560)
				{
					
					$("#select-docentes").select2({
							width: '260px'
					});

				}
				else{
					$("#select-docentes").select2({
							width: '400px'
					});
				}
				medida=$(window).width();
			}
		});

		// ************************************************

		$(document).ready(function(){
				$("#select-docentes").select2({
					 width: '240px',
				});
			});

		$(document).ready(function(){

			if ($(window).width()<=560)
			{
				
				$("#select-docentes").select2({
						width: '260px'
				});
			

			}
			else{
				$("#select-docentes").select2({
						width: '400px'
				});
			}
		});
	</script>
	<script type="text/javascript" src="views/Librerias/js/manual/docentes.js"></script>

</body>

</html>
