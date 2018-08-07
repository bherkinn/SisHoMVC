<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Carga Docente</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <!-- **************************************CSS************************************* -->
      <link rel="stylesheet" type="text/css" href="views/Librerias/bootstrap4/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/fuente.css">
      <link rel="stylesheet" type="text/css" href="views/Librerias/css/CargaDocente.css">
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
	<?php 
         require_once("menu.php");
      ?>

       <div id="contenedor" class="contenedor-tapar">
       		<center>
       			<div class="cabecera-contenedor"> CARGA DOCENTE</div>
       		</center>
                              
       		<div class="container-fluid ">
       			<div class="container-fluid">
                              <div class="container-fluid">
                                    <div id="fecha" style="padding: 8px;"></div>
                                    <!-- <div style="height: 50px;width: 100%;vertical-align: center;">
                                          <select id="cboDepartamento" class="cboDepartamento">
                                                <option>DAIA</option>
                                                <option>DACBAHCC</option>
                                                <option>DACI</option>
                                          </select>
                                    </div> -->
                                    
             				<div id="contenedor-carga-docente" style="text-align:center;">
                                          
             				</div>
                              </div>
              <br>
       			</div>
       		</div>

	   </div>

	   <script type="text/javascript" src="views/Librerias/js/comun.js" ></script>
	   <script type="text/javascript" src="views/Librerias/js/cargaDocente.js" ></script>
</body>
</html>