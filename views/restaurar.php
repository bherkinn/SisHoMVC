<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Recuperar</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <!-- **************************************CSS************************************* -->
      <link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/principal.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/comun-tablas.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/select2/css/select2.min.css">
	   <link rel="stylesheet" type="text/css" href="views/Librerias/AlertifyJS-master/build/css/alertify.css">
      
      <script type="text/javascript" src="views/Librerias/jquery-3.3.1.min.js"></script>
      <script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="views/Librerias/select2/js/select2.min.js"></script>
      <script type="text/javascript" src="views/Librerias/AlertifyJS-master/build/alertify.js"></script>
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
                     <li><a href="index.php"><i class="icono izquierda fas fa-registered"></i>Registrar</a></li>
                     <li><a href="restaurar.php"><i class="icono izquierda fas fa-redo-alt"></i>Restaurar</a></li>
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
                           <li><a href="views/manual/docentes.php">Docentes</a></li>
                           <li><a href="views/manual/aulas.php">Aulas</a></li>
                           <li><a href="views/manual/cursos.php">Cursos</a></li>
                           <li><a href="views/manual/modulo.php">Modulos</a></li>
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
      	<center><div class="titulo-tabla">RESTAURAR</div></center>
      	<div>
      		<div class="container-fluid">
      		<div class="container-fluid">
				   <div id="contenedor-recuperar" class="container-fluid table-responsive-bootstrap" style="">
				

      			</div>
      		</div>
      		</div>
      	</div>

      </div>


      <script type="text/javascript" src="views/Librerias/js/comun.js" ></script>
      <script type="text/javascript">

      	var jsondocentes;

      	$(document).ready(function() {
		    $.get("views/Anexos/restaurar.php", {accion:"docentes"},
		        function(data) {
		            jsondocentes = JSON.parse(data);

		            $.get("views/Anexos/restaurar.php",{accion:"mostrarRestaurar"},
	      			function(data){
	      				var recuperar=JSON.parse(data);
	      				CrearTablaRecuperar(recuperar,jsondocentes);
	      			});

		        });
		});

      	$(document).ready(function(){
      		
      		
      	});

      	function CrearTablaRecuperar(recuperar,docentes){	

      		var cantidad=Object.keys(recuperar).length;
      		var cdocentes=Object.keys(docentes).length;

      		$("#contenedor-recuperar").append("<table id='tabla-recuperar' class='table border-recuperar' ><tr class=''>" +
      			"<th style='width:50px;'></th>" +
      			"<th style='max-width:80px;'>FECHA</th>" +
      			"<th style='min-width:50px;'>HORA</th>" +
		        "<th class='num th'>N.O.</th>" +
		        "<th class='th'>DIA</th>" +
		        "<th class='th'>HORA</th>" +
		        "<th class='th'>CURSO</th>" +
		        "<th class='th'>SECCION</th>" +
		        "<th class='th'>T/P</th>" +
		        "<th class=''>AULA</th>" +
		        "<th class=''>AULA 2</th>" +
		        "<th class=''>DOCENTE</th>" +
		        "<th class='th'>C1</th>" +
		        "<th class='th'>C2</th>" +
		        "<th class='th'>C3</th>" +
		        "<th class='th'>C4</th>" +
		        "<th class='th'>C5</th>" +
		        "<th class='th'>C6</th>" +
		        "<th class='th'>C7</th>" +
		        "<th class='th'>C8</th>" +
		        "<th class='th'>C9</th>" +
		        "<th class='thc10'>C10</th></tr></table>");

      		for(i=0;i<cantidad;i++)
      		{	for(d=0;d<cdocentes;d++)
      			{
      				if(recuperar[i]["codDocente"]==docentes[d]["codDocente"])
      				{
      					recuperar[i]["codDocente"]=docentes[d]["apePaterno"]+" "+docentes[d]["apeMaterno"]+", "+docentes[d]["nombres"];
      				}
      			}

      			$("#tabla-recuperar").append("<tr id='"+recuperar[i]["idHorarios"]+"'><td><button onclick='Restaurar("+recuperar[i]["idHorarios"]+")' class='btn btn-info fas fa-reply'</button></td>"+
      			"<td>"+fecha(recuperar[i]["fecha"])+"</td>"+
      			"<td>"+hora(recuperar[i]["fecha"])+"</td>"+
      			"<td>"+recuperar[i]["orden"]+"</td>"+
      			"<td>"+recuperar[i]["dia"]+"</td>"+
      			"<td>"+recuperar[i]["hora"]+"</td>"+
      			"<td>"+recuperar[i]["codCurso"]+"</td>"+
      			"<td>"+recuperar[i]["secCurso"]+"</td>"+
      			"<td>"+recuperar[i]["teopra"]+"</td>"+
      			"<td>"+recuperar[i]["codAula"]+"</td>"+
      			"<td>"+recuperar[i]["codAula2"]+"</td>"+
      			"<td>"+recuperar[i]["codDocente"]+"</td>"+
      			"<td>"+recuperar[i]["c1"]+"</td>"+
      			"<td>"+recuperar[i]["c2"]+"</td>"+
      			"<td>"+recuperar[i]["c3"]+"</td>"+
      			"<td>"+recuperar[i]["c4"]+"</td>"+
      			"<td>"+recuperar[i]["c5"]+"</td>"+
      			"<td>"+recuperar[i]["c6"]+"</td>"+
      			"<td>"+recuperar[i]["c7"]+"</td>"+
      			"<td>"+recuperar[i]["c8"]+"</td>"+
      			"<td>"+recuperar[i]["c9"]+"</td>"+
      			"<td>"+recuperar[i]["c10"]+"</td></tr>");
      		}
      			

      	}

      	function fecha(datos){
      		año=datos.substr(0,4);
      		mes=datos.substr(5,2);
      		dia=datos.substr(8,2);

      		fechafinal=dia+"/"+mes+"/"+año;

      		return fechafinal;
      	}

      	function hora(datos){
      		horas=datos.substr(10,6);
      		return horas;
      	}

      	function Restaurar(id){

      		alertify.confirm("Ud. va a restaurar un  Horario eliminado con anterioridad <br>"+
      			"¿Desea Restaurar?",
		    function(){

		    	$.get("views/Anexos/restaurar.php", {accion:"modificarEstado",
		            id: id,estado:1
		        },
		        function(data) {
		           $("#"+id).fadeOut();
		           alertify.success('Restaurado');
		        });  
		    },
		    function(){
		      alertify.error('Cancelado');
		    });
      	}

      	      	   	

      		
      </script>
</body>
</html>