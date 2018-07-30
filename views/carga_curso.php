<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Carga Curso</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <!-- **************************************CSS************************************* -->
      <link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/CargaCurso.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/menu.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/menucontextual.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/select2/css/select2.min.css">
      
      <link rel="stylesheet" type="text/css" href="views/Librerias/AlertifyJS-master/build/css/alertify.css">
      <!-- ***************************************JS************************************* -->
      <script type="text/javascript" src="views/Librerias/AlertifyJS-master/build/alertify.js"></script>
      <script type="text/javascript" src="views/Librerias/jquery-3.3.1.min.js"></script>
      <script type="text/javascript" src="views/Librerias/bootstrap4/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="views/Librerias/select2/js/select2.min.js"></script>

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
                     <li><a href="index.php"><i class="icono izquierda fas fa-registered"></i>Principal</a></li>
                     <li><a href="restaurar.php"><i class="icono izquierda fas fa-redo-alt"></i>Restaurar</a></li>
                     <li><a href="CargaCurso.php"><i class="icono izquierda fas fa-book"></i>Carga Curso</a></li>
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
       		<center>
       			<div class="cabecera-contenedor"> CARGA CURSO</div>
       		</center>
			
       		<div class="container-fluid ">
       			<div class="container-fluid">
       				<div id="contenedor-carga-curso">

       				</div>
              <br>
       			</div>
       		</div>

	   </div>

	   <script type="text/javascript" src="views/Librerias/js/comun.js" ></script>
	   <script type="text/javascript" src="views/Librerias/js/cargaCurso.js" ></script>
</body>
</html>