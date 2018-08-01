<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<title>M-Cursos</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<!-- **************************************CSS************************************* -->
	<link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/comun-tablas.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
    <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/cursos.css">
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

		<center><div class="titulo-tabla">CURSOS - MANUAL</div></center>
		<div class="centrar">
				<select id="select-cursos" class="select-cursos">	
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
	</div>



	<script type="text/javascript">

		function CrearTabla(filas,columnas,hora){

			var dias = new  Array('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADOS','DOMINGOS');
			var cantidad="";
			var tabla=document.createElement("table");
			tabla.setAttribute("id","tabla-cursos");
			tabla.setAttribute("class","table-responsive-horario border rounded");
			tabla.setAttribute("border","3");
		    //tabla.style.border="1px solid gray";
		    var content=document.getElementById("tabla");
		    content.appendChild(tabla);
		    var titulo="UNIVERSIDAD NACIONAL DE INGENIERIA - FACULTAD DE INGENIERIA MECANICA - COMISION DE HORARIOS";
			
			horainicial=hora;
			$("#tabla-cursos").append("<tr><td colspan='6' class='cabecera-tabla ca'>"+titulo+"</td><td rowspan='2' class='td-periodo'></td></tr>");
			$("#tabla-cursos").append("<tr><td id='nomcurso' colspan='6' class='cabecera-tabla2'></td></tr>");
			for(i=0;i<filas;i++){
				$("#tabla-cursos").append("<tr>");
				for(u=0;u<columnas;u++)
				{
					if(i==0)
					{
						$("#tabla-cursos").append("<th class='horas' id='"+u+"'></th>");
						if(u!=0)
						{
							$("#"+u).html(dias[u-1]);
						}
					}
					else
					{	
						$("#tabla-cursos").append("<td id='c"+(horainicial-1)+""+u+"'></td>");

						if(u!=0)
						{
							$("#c"+(horainicial-1)+""+u).addClass("contenido-tabla");

							
						}
						else
						{
							$("#c"+(horainicial-1)+""+u).addClass("horas");

							inicial=hora.toString().length;
							final=(hora+1).toString().length;

							if(inicial>1&&final>1)
							{
								$("#c"+(horainicial-1)+""+u).html(hora+"-"+(hora+1));
							}
							
							if(inicial==1&&final>1)
							{
								$("#c"+(horainicial-1)+""+u).html("0"+hora+"-"+(hora+1));
							}

							if(inicial==1&&final==1)
							{
								$("#c"+(horainicial-1)+""+u).html("0"+hora+"-"+"0"+(hora+1));
							}
							
							

							hora++;
							
						}
					}
				}

				horainicial++;

				$("#tabla-cursos").append("</tr>");
				$("#0").html("HORAS");
			}

		}

			CrearTabla(16,7,7);
		
	</script>

		
	<script type="text/javascript" src="views/Librerias/js/comun.js" >
		
	</script>

	<script type="text/javascript">

		ingrese=0;
		$(document).ready(function(){
    	$.get("views/Anexos/cursos.php",{accion:"cboCurso"},
        function(datoscursos){

            cursostotal=JSON.parse(datoscursos);
            cantidadct=Object.keys(cursostotal).length;

            $.get("views/Anexos/cursos.php",{accion:"cboPeriodo"},
            function(data){
                cboperiodo=JSON.parse(data);
                cantidadcbp=Object.keys(cboperiodo).length;
                for(i=0;i<cantidadcbp;i++)
                {
                    $("#cboperiodo").append("<option value='"+cboperiodo[i]["verCurricular"]+"'>"+cboperiodo[i]["perAcademico"]+"</option>");
                }
                vercurricular=$("#cboperiodo").val();
                $.get("views/Anexos/cursos.php",{accion:"cursoPorCurricula",vercurricular:vercurricular},
                function(dtcursos){
                    cbocursos=JSON.parse(dtcursos);
                    cantidadcbc=Object.keys(cbocursos).length;
                    for(a=0;a<cantidadct;a++)
                	{
	                    for(i=0;i<cantidadcbc;i++)
	                    {
	                        if(cursostotal[a]['codCurso']==cbocursos[i]['codCurso'])
	                        {
	                             ingrese=1;
	                        }
	                        
	                    }
	                    if(ingrese==1)
	                    {
	                        $("#select-cursos").append("<option value='"+cursostotal[a]["codCurso"]+"'>"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
	                        ingrese=0;
	                    }
	                    else{
	                        $("#select-cursos").append("<option value='"+cursostotal[a]["codCurso"]+"'>"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
	                    }  
                	}
                	mostrarCursos();
            	});
            });
         });
	});

	function mostrarCursos(){
		periodo=$("#cboperiodo option:selected").text();
		idcurso=$("#select-cursos").val();
		$.get("views/Anexos/cursos.php",{accion:"horarioCurso",idcurso:idcurso,periodo:periodo},
			function(data){
			var hcursos=JSON.parse(data);
			
				llenarTablaCursos(hcursos);
			
		});
	}
	$("#btn-actualizar-tabla").click(function(){
			mostrarCursos();
	});

    $("#cboperiodo").change(function() {
        $("#cboperiodo option:selected").each(function() {
            vercurricular=$("#cboperiodo").val();
            $.get("views/Anexos/cursos.php",{accion:"cursoPorCurricula",vercurricular:vercurricular},
            function(dtcursos){
                cbocursos=JSON.parse(dtcursos);
                cantidadcbc=Object.keys(cbocursos).length;
                $("#select-cursos").html("");
                for(a=0;a<cantidadct;a++)
                {
                    for(i=0;i<cantidadcbc;i++)
                    {
                        if(cursostotal[a]['codCurso']==cbocursos[i]['codCurso'])
                        {
                             ingrese=1;
                        }
                        
                    }
                    if(ingrese==1)
                    {
                        $("#select-cursos").append("<option value='"+cursostotal[a]["codCurso"]+"'>"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
                        ingrese=0;
                    }
                    else{
                        $("#select-cursos").append("<option value='"+cursostotal[a]["codCurso"]+"'>"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
                    }  
                }
                mostrarCursos();
            });
        });
    });

		$("#select-cursos").change(function(){
			$("#select-cursos option:selected").each(function(){
				mostrarCursos();
			});
		});
		
		var medida;

		$(window).resize(function(){
			if($(window).width()!=medida)
			{
				if ($(window).width()<=560)
				{
					
					$("#select-cursos").select2({
							width: '260px'
					});

				}
				else{
					$("#select-cursos").select2({
							width: '400px'
					});
				}
				medida=$(window).width();
			}
		});

		// ************************************************

		$(document).ready(function(){
				$("#select-cursos").select2({
					 width: '240px',
				});
			});

		$(document).ready(function(){

			if ($(window).width()<=560)
			{
				
				$("#select-cursos").select2({
						width: '260px'
				});
			

			}
			else{
				$("#select-cursos").select2({
						width: '400px'
				});
			}
		});
	</script>
	<script type="text/javascript" src="views/Librerias/js/manual/cursos.js"></script>

</body>

</html>