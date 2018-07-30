<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<title>M-Aulas</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<!-- **************************************CSS************************************* -->
	<link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/comun-tablas.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
    <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/css/aulas.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
	<link rel="stylesheet" type="text/css" href="views/Librerias/select2/css/select2.min.css">

	<!-- ***************************************JS************************************* -->
	<script type="text/javascript" src="views/Librerias/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="views/Librerias/select2/js/select2.min.js"></script>
	<script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.bundle.min.js"></script>

	<style type="text/css">
	 	.cboperiodo{
			padding: 5px;
			font-size: 12px;
			margin-left: 20px;
		    border-radius: 4px;
		    position: absolute;
		}
		.titulo-tabla{
			padding: 5px;
			font-weight: bold;
			font-size: 28px;
			color: #787777;
		}
	 </style>

</head>

<body>
		
		<div id="menu" class="menu-ocultar">

         <div class="menu-contenedor">
               <div class="cabecera">
                  <img class="img-logo" src="views/Librerias/img/uni.png">
                  <div class="nom-sistema">HORARIOS FIM</div>
               </div>
               <div class="nav">
                  <ul>
                     <li><a href="../../index.php"><i class="icono izquierda fas fa-registered"></i>Principal</a></li>
                     <li><a href="../../restaurar.php"><i class="icono izquierda fas fa-redo-alt"></i>Restaurar</a></li>
                     <li class="titulo-sub-menu">VISTAS</li>
                     <li>
                        <a href="#" id="link1"><i class="izquierda fas fa-eye"></i>Automatico<i class="icono derecha fas fa-chevron-down"></i></a>
                        <ul>
                           <li><a href="docentes.php"></i>Docentes</a></li>
                           <li><a href="aulas.php">Aulas</a></li>
                           <li><a href="cursos.php">Cursos</a></li>
                           <li><a href="modulo1.php">Modulo 1</a></li>
                           <li><a href="modulo2.php">Modulo 2</a></li>
                           <li><a href="modulo3.php">Modulo 3</a></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#" id="link2"><i class="icono izquierda fas fa-hand-paper"></i> Manual <i class="icono derecha fas fa-chevron-down"></i></a>
                        <ul>
                           <li><a href="docentes.php">Docentes</a></li>
                           <li><a href="aulas.php">Aulas</a></li>
                           <li><a href="cursos.php">Cursos</a></li>
                           <li><a href="modulo.php">Modulos</a></li>
                        </ul>
                     </li>
                     <li class="titulo-sub-menu">REPORTES</li>
                     <li><a href="#" id="link1"><i class="icono izquierda fas fa-user-circle"></i> Docentes</a>
                     <li><a href="#" id="link1"><i class="icono izquierda fas fa-cube"></i> Aulas</a>
                     <li><a href="#" id="link1"><i class="icono izquierda fas fa-clipboard"></i> Cursos</a>
                  </ul>
               </div>
         </div>
         

         <div class="btn-menu-contenedor">
            <center>
               <button id="btn-menu" class="btn-menu fas fa-bars"></button>
            </center>
         </div>

      </div>

      <div id="contenedor" class="contenedor-tapar">		
		
		<center><div class="titulo-tabla">AULAS - MANUAL</div></center>
		<div style="margin-bottom: 15px;">
		<center>
				<select id="select-aulas">
					
				</select>
				<select id="cboperiodo" class="cboperiodo " style="font-size: 12px;">
				</select>
		</center>
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
			tabla.setAttribute("id","tabla-docentes");
			tabla.setAttribute("class","table-responsive-horario border rounded");
			tabla.setAttribute("border","3");
		    //tabla.style.border="1px solid gray";
		    var content=document.getElementById("tabla");
		    content.appendChild(tabla);
		    var titulo="UNIVERSIDAD NACIONAL DE INGENIERIA - FACULTAD DE INGENIERIA MECANICA - COMISION DE HORARIOS";
			
			horainicial=hora;
			$("#tabla-docentes").append("<tr><td colspan='6' class='cabecera-tabla ca'>"+titulo+"</td><td class='td-periodo' rowspan='2'></td></tr>");
			$("#tabla-docentes").append("<tr><td id='nomaula' colspan='3' class='cabecera-tabla2'></td><td colspan='3' id='caracteristica' class='caract'></td></tr>");
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
						$("#tabla-docentes").append("<td id='a"+(horainicial-1)+""+u+"'></td>");

						if(u!=0)
						{
							$("#a"+(horainicial-1)+""+u).addClass("contenido-tabla");

							
						}
						else
						{
							$("#a"+(horainicial-1)+""+u).addClass("horas");

							inicial=hora.toString().length;
							final=(hora+1).toString().length;
							console.log(cantidad);

							if(inicial>1&&final>1)
							{
								$("#a"+(horainicial-1)+""+u).html(hora+"-"+(hora+1));
							}
							
							if(inicial==1&&final>1)
							{
								$("#a"+(horainicial-1)+""+u).html("0"+hora+"-"+(hora+1));
							}

							if(inicial==1&&final==1)
							{
								$("#a"+(horainicial-1)+""+u).html("0"+hora+"-"+"0"+(hora+1));
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

		
	<script type="text/javascript" src="views/Librerias/js/comun.js" >
		
	</script>

	<script type="text/javascript">

		$.get("views/Anexos/aulas.php",{accion:"cboPeriodo"},
            function(data){
                cboperiodo=JSON.parse(data);
                cantidadcbp=Object.keys(cboperiodo).length;
                for(i=0;i<cantidadcbp;i++)
                {
                    $("#cboperiodo").append("<option value="+cboperiodo[i]["perAcademico"]+">"+cboperiodo[i]["perAcademico"]+"</option>");
                }
                $.get("views/Anexos/aulas.php",{accion:"cboAulas"},
	            function(data){
	            	cboaula=JSON.parse(data);
                	cantidadaula=Object.keys(cboaula).length;
                	for(u=0;u<cantidadaula;u++)
                	{
                		$("#select-aulas").append("<option value="+cboaula[u]["aula"]+">"+cboaula[u]["aula"]+"</option>");
                	}
                	mostrarAulas();
				});
            });

		function mostrarAulas(){
			idaula=$("#select-aulas").val();
        	periodo=$("#cboperiodo").val();
			$.get("views/Anexos/aulas.php",{accion:"horarioAula",idaula:idaula,periodo:periodo},
					function(data){
					var haulas=JSON.parse(data);
					
						llenarTablaAulas(haulas);
			});
		}

		$(document).ready(function(){
			$("#select-aulas").change(function(){
				$("#select-aulas option:selected").each(function(){
					mostrarAulas();
				});
			});
		});

		$(document).ready(function(){
			$("#cboperiodo").change(function(){
				$("#cboperiodo option:selected").each(function(){
					mostrarAulas();
				});
			});
		});

		// ************************************************

		$(document).ready(function(){
				$("#select-aulas").select2({
					 width: '160px',
				});
			});

	</script>
	<script type="text/javascript" src="views/Librerias/js/manual/aulas.js"></script>

</body>

</html>