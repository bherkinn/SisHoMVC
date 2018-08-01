$(document).ready(function() {
    // ------Curso Por Curricula-----
    // dividirSeccion("A/B/C");
    // calcularHoras("12-14");
    $.get("views/Anexos/carga_curso.php", {
                accion: "cursos"
            },
        function(data1) {
            // ------Datos Por Carga CursoT------ 
            $.get("views/Anexos/carga_curso.php", {
                    accion: "reporteCursosT"
                },
                function(data2) {
                    // -----Datos Por Carga CursoP
                    $.get("views/Anexos/carga_curso.php", {
                    accion: "reporteCursosP"
                    },
                    function(data3) {
                        CrearTablaReportesCargaCurso(JSON.parse(data1), JSON.parse(data2), JSON.parse(data3));
                    });
                });
        });

})

function CrearTablaReportesCargaCurso(JsonCursos,JsonCargaT,JsonCargaP){
        numCurso = Object.keys(JsonCursos).length;
        numCargaT = Object.keys(JsonCargaT).length;
        numCargaP = Object.keys(JsonCargaP).length;
        curDisponibleT = 0;
        curDisponibleP = 0;
        identP=0;
        totalhoras = 0;
        subhorasP= 0;
        seccion=new Array();
        cadenaCargaPractica="";
        $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");
        $('#tabla').append("<thead><th>CURSOS</th>"+
                                  "<th>CODIGO</th>"+
                                  "<th>SEC</th>"+
                                  "<th>PROFESOR-TEORIA</th>"+
                                  "<th>HORAS</th>"+
                                  "<th>SEC</th>"+
                                  "<th>PROFESOR-PRACTICA</th>"+
                                  "<th>HORAS</th>"+
                           "<thead>");
        for(i=0;i<numCurso;i++)
        {
             $("#tabla").append("<tr id='"+JsonCursos[i]["codCurso"]+"0'>"+
                                "<td class='ampliar"+JsonCursos[i]["codCurso"]+"'>"+JsonCursos[i]["nomCurso"]+"</td>" +
                                "<td class='ampliar"+JsonCursos[i]["codCurso"]+"'>"+JsonCursos[i]["codCurso"]+"</td>" +
                                "</tr>");
        }

        for(u=0;u<numCurso;u++)
        {   
            cursoActual=JsonCursos[u]["codCurso"];
            cursoSiguiente="";
            // Revisamos en la carga por teoria
            for(i=0;i<numCargaT;i++)
            {
                if(cursoActual==JsonCargaT[i]["codCurso"])
                {
                    curDisponibleT=1;
                }
            }
            // Revisamos en la carga por Practica
            for(i=0;i<numCargaP;i++)
            {
                if(cursoActual==JsonCargaP[i]["codCurso"])
                {
                    curDisponibleP=1;
                }
            }

            if(curDisponibleT==1 || curDisponibleP==1)
            {   
// ------------------------En caso tenga carga horaria Teorica y Practicas
                if(curDisponibleT==1 && curDisponibleP==1)
                {
                    for(i=0;i<numCargaT;i++)
                    {   
                        if(cursoActual==JsonCargaT[i]["codCurso"])
                        {   
                            //-------------------------Verificar si esta en el ultimo bucle
                            if((i+1)<numCargaT)
                            {
                                cursoSiguiente=JsonCargaT[i+1]["codCurso"];
                                seccionSiguiente=JsonCargaT[i+1]["secCurso"]
                            }
                            else{
                                cursoSiguiente="";
                                seccionSiguiente="";
                            }
                            // ------------------------Operar
                            if(JsonCargaT[i]["secCurso"]==seccionSiguiente && cursoActual==cursoSiguiente)
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;
                            }
                            else
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;

                                if(identP==0)
                                {   
                                    // ------------------------------------------------------------------CargaPractica
                                    seccion.length=0;
                                    seccion=dividirSeccion(JsonCargaT[i]["secCurso"]);
                                    if(seccion.length==1)
                                    {
                                        for(t=0;t<numCargaP;t++)
                                        {
                                            for(t=0;t<numCargaP;t++)
                                            {   
                                                if(JsonCargaP[t]["secCurso"]==seccion[0] && JsonCargaP[t]["codCurso"]==cursoActual)
                                                {
                                                    subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                    cadenaCargaPractica="<td>"+JsonCargaP[t]["secCurso"]+"</td>"+
                                                                        "<td>"+JsonCargaP[t]["nombres"]+"</td>"+
                                                                        "<td>"+subhorasP+"</td>";
                                                }
                                            }
                                            subhorasP=0;
                                        }
                                    }else{
                                        cadenaCargaPractica="";
                                        if(seccion.length>1)
                                        {
                                            for(k=0;k<seccion.length;k++)
                                            {

                                            }
                                        }
                                    }
                                    // --------------------------------------------------------------------

                                    $("#"+cursoActual+identP).append("<td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+totalhoras+"</td>"+cadenaCargaPractica);
                                    identP++;
                                }
                                else{
                                    seccion.length=0;
                                    seccion=dividirSeccion(JsonCargaT[i]["secCurso"]);
                                    if(seccion.length==1)
                                    {
                                        seccion.length=0;
                                        seccion=dividirSeccion(JsonCargaT[i]["secCurso"]);
                                        if(seccion.length==1)
                                        {
                                            for(t=0;t<numCargaP;t++)
                                            {   
                                                if(JsonCargaP[t]["secCurso"]==seccion[0] && JsonCargaP[t]["codCurso"]==cursoActual)
                                                {
                                                    subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                    cadenaCargaPractica="<td>"+JsonCargaP[t]["secCurso"]+"</td><td>"+
                                                                              JsonCargaP[t]["nombres"]+"</td><td>"+
                                                                              subhorasP+"</td>";
                                                }
                                                
                                            }
                                            subhorasP=0;
                                        }else{
                                            cadenaCargaPractica="";
                                        }  
                                    }

                                    $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"'><td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+JsonCargaT[i]["secCurso"]+"'>"+totalhoras+"</td>"+cadenaCargaPractica+"</tr>");
                                    identP++;

                                    $(".ampliar"+cursoActual).attr("rowspan",identP);
                                }
                                totalhoras=0;
                            }
                            
                        }else
                        {
                            identP=0;
                        }
                    }
// ------------------------En caso solo tenga carga horaria en Practicas
                }else if(curDisponibleT==0 && curDisponibleP==1){

                $("#"+cursoActual+"0").append("<td class='ampliar"+cursoActual+"'>Vacio</td><td class='ampliar"+cursoActual+"'>Vacio</td><td class='ampliar"+cursoActual+"'>Vacio</td>");

                    for(i=0;i<numCargaP;i++)
                    {   
                        if(cursoActual==JsonCargaP[i]["codCurso"])
                        {
                            if(JsonCargaP[i]["secCurso"]==JsonCargaP[i+1]["secCurso"] && cursoActual==JsonCargaP[i+1]["codCurso"])
                            {
                                totalhoras=calcularHoras(JsonCargaP[i]["hora"])+totalhoras;
                            }
                            else
                            {
                                totalhoras=calcularHoras(JsonCargaP[i]["hora"])+totalhoras;

                                if(identP==0)
                                {   

                                    $("#"+cursoActual+identP).append("<td>"+JsonCargaP[i]["secCurso"]+"</td>"+
                                        "<td>"+JsonCargaP[i]["nombres"]+"</td>"+
                                        "<td>"+totalhoras+"</td>");
                                    identP++;
                                }
                                else{
                                    
                                    $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"'><td>"+JsonCargaP[i]["secCurso"]+"</td>"+
                                        "<td>"+JsonCargaP[i]["nombres"]+"</td>"+
                                        "<td>"+totalhoras+"</td></tr>");
                                    identP++;

                                    $(".ampliar"+cursoActual).attr("rowspan",identP);
                                }
                                totalhoras=0;
                            }
                            
                        }else
                        {
                            identP=0;
                        }
                    }
 // ------------------------En caso solo tenga carga horaria en Teorica
                } else if(curDisponibleT==1 && curDisponibleP==0){

                    for(i=0;i<numCargaT;i++)
                    {   
                        if(cursoActual==JsonCargaT[i]["codCurso"])
                        {
                            if(JsonCargaT[i]["secCurso"]==JsonCargaT[i+1]["secCurso"] && cursoActual==JsonCargaT[i+1]["codCurso"])
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;
                            }
                            else
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;

                                if(identP==0)
                                {   
                                    $("#"+cursoActual+identP).append("<td>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td>"+totalhoras+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'>vacio</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'>vacio</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'>vacio</td>");
                                    identP++;
                                }
                                else{
                                    
                                    $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"'><td>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td>"+totalhoras+"</td></tr>");
                                    identP++;

                                    $(".ampliar"+cursoActual).attr("rowspan",identP);
                                }
                                totalhoras=0;
                            }
                            
                        }else
                        {
                            identP=0;
                        }
                    }
                }
            }
            else{
                $("#"+cursoActual+"0").append("<td>Vacio</td><td>Vacio</td><td>Vacio</td><td>Vacio</td><td>Vacio</td><td>Vacio</td>");

            }
            curDisponibleT=0;
            curDisponibleP=0;
        }   

}

function calcularHoras(hora){

    hinicial=hora.substring(0,2);
    hfinal=hora.substring(3,5);

    hinicial=parseInt(hinicial);
    hfinal=parseInt(hfinal);

    canhoras=hfinal-hinicial;

    return canhoras;
}

function dividirSeccion(seccion){
    console.log(seccion);
    sec=new Array();
    canseccion=seccion.length;
    m=0;
    if(canseccion>1)
    {
        for(k=0;k<canseccion;k++)
        {
            if(k % 2 == 0)
            {
                sec[m]=seccion.substring(k,(k+1));
                console.log(sec[m]);
                m++;
            }
        }
        return sec;
    }else{
        sec[0]=seccion;
        return sec;
    }
}


// if((t+1)<numCargaP)
                                                // {
                                                //     cursoS=JsonCargaP[t+1]["codCurso"];
                                                //     seccionS=JsonCargaP[t+1]["secCurso"]
                                                // }
                                                // else{
                                                //     cursoS="";
                                                //     seccionS="";
                                                // }
                                                // if(JsonCargaP[t]["secCurso"]==seccionS && cursoActual==cursoS)
                                                // {
                                                //     subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                // }
                                                // else
                                                // {
                                                //     subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                //     cadenaCargaPractica="<td>"+JsonCargaP[t]["secCurso"]+"</td><td>"+
                                                //                               JsonCargaP[t]["nombres"]+"</td><td>"+
                                                //                               subhorasP+"</td>";
                                                // }



// else if(curDisponibleT==1 && curDisponibleP==0){

//                     for(i=0;i<numCargaT;i++)
//                     {   
//                         seccion.length=0;
//                         if(cursoActual==JsonCargaT[i]["codCurso"])
//                         {   
//                             seccion=dividirSeccion(JsonCargaT[i]["secCurso"]);
//                             canseccion=seccion.length;
//                             a=0;
//                             while(a<canseccion)
//                             {
//                                 for(c=0;c<numCargaT;c++)
//                                 {
//                                     if(cursoActual==JsonCargaT[c]["codCurso"] && JsonCargaT[c]["secCurso"].indexOf(seccion[a])!=-1)
//                                     {
                                        
//                                     }
//                                 }
//                                 a++;
//                             }
//                         }
//                     }
//                 }
//             }

            // ******************************************************************************

// function CrearTablaReportesCargaCurso(JsonCurricular, JsonCarga) {
//     numCurso = Object.keys(JsonCurricular).length;
//     numCarga = Object.keys(JsonCarga).length;
//     codigoActual = "";
//     nextcodigo = "";
//     $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");

//     for (i = 0; i < numCarga; i++) {
//         disponible = 0;
//         // Codigo Actual del Bucle
//         codigo = JsonCarga[i]["codCurso"];

//         // Verificamos si el curso existe en la Curricula
//         for (u = 0; u < numCurso; u++) {
//             if (JsonCurricular[u]["codCurso"] == JsonCarga[i]["codCurso"]) {
//                 disponible = 1;
//             }
//         }
//         // Si el curso existe en la curricula Ingresara a la condicion
//         if (disponible == 1) {
        	
//         			if (codigo == nextcodigo) {
// 	                    $("#tabla").append("<tr><td>" + JsonCarga[i]["secCurso"] + "</td>" +
// 	                        "<td>" + JsonCarga[i]["nombres"] + "</td>" +
// 	                        "<td>" + JsonCarga[i]["teopra"] + "</td>" +
// 	                        "<td>" + JsonCarga[i]["hora"] + "</td>" +
// 	                        "</tr>");
// 	                unirfilas++;
// 	                $("." + codigoActual).attr("rowspan", unirfilas);
        			
//         	}
// 	        	// Si el codigo del bucle es igual al codigo siguiente(ademas siempre entrara primero al else ya que nextcodigo aun no recibe un valor)

//             } else {
//                 // Verificamos que al final de la comparacion el Json siguiente no exista
//                 if (i + 1 < numCarga) {
//                     nextcodigo = JsonCarga[i + 1]["codCurso"];
//                 }
//                 codigoActual = codigo;

               
// 		    	$('#tabla').append("<tr><td class='" + codigo + " tdnomcodigo'>" + JsonCarga[i]["nomCurso"] +
//                 "<td class='" + codigo + " tdcodigo'>" + JsonCarga[i]["codCurso"] + "</td>" +
//                 "<td>" + JsonCarga[i]["secCurso"] + "</td>" +
//                 "<td>" + JsonCarga[i]["nombres"] + "</td>" +
//                 "<td>" + JsonCarga[i]["teopra"] + "</td>" +
//                 "<td>" + JsonCarga[i]["hora"] + "</td>" +
//                 "</tr>");

//                 codigo = nextcodigo;
//                 unirfilas = 1;
				       

//                 }
                
//             }
//         }


// --------------------------------------FINAL 2

// var posicionT = new Array();
// var a=0;
// var cursoActual="";
// var primerTeorico=0;
// distinto=1;

// function CrearTablaReportesCargaCurso1(JsonCurricular,JsonCarga){
//     numCurso=Object.keys(JsonCurricular).length;
//     numCarga=Object.keys(JsonCarga).length;
//     nextcodigo="";
//     $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");
//     //---------------- Primer Bucle Llena el Curso y Nombre del Curso en la tabla
//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         // ----------Bucle Donde recorremos los cursos por curricula
//         for(u=0;u<numCurso;u++)
//             {
//                 // Verificamos si el curso esta en la curricula
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {   
//                     disponible=1;
//                 }
//             }
        
        
//             // Verificamos si encontro el curso en la curricula
//             if(disponible==1)
//             {
//                 // Verificamos que el Curso no se repita
//                 if(JsonCarga[i]["codCurso"]!=nextcodigo)
//                 {
//                     $('#tabla').append("<tr id='"+JsonCarga[i]["codCurso"]+0+"'><td class='"+JsonCarga[i]["codCurso"]+" tdnomcodigo'>"+JsonCarga[i]["nomCurso"]+"</td>"+
//                                            "<td class='"+JsonCarga[i]["codCurso"]+" tdcodigo'>"+JsonCarga[i]["codCurso"]+"</td>"+
//                                            "</tr>");
//                     posicionT[a]=i;
//                     a++;
//                     // verificamos que el siguiente codigo no salga del limite del Json
//                     if(i+1<numCarga)
//                     {
//                         nextcodigo=JsonCarga[i+1]["codCurso"];
//                     }
//                 }
//             }
//     }
//     //--------------- Segundo Bucle Llena la seccion y el  docente 
//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         for(u=0;u<numCurso;u++)
//             {
//                 // Verificamos si el curso esta en la curricula
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {   

//                     disponible=1;
//                 }
//             }
//             // Verificamos si encontro el curso en la curricula
//             if(disponible==1)
//             {   
//                     if ( $("#"+JsonCarga[i]["codCurso"]+"0").length > 0 ) {
//                         if(distinto==1)
//                         {   
//                             if(JsonCarga[i]["teopra"]==="T")
//                             { 
//                             primerTeorico=0;
//                             $("#"+JsonCarga[i]["codCurso"]+primerTeorico).append("<td id='sec"+JsonCarga[i]["codCurso"]+primerTeorico+"'>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["hora"]+"</td>");
//                             distinto=0;
//                             }
//                         }else{
//                             // Verificar si no sobrepasa el JSON
//                             if(i+1<numCarga)
//                             {
//                                 if(JsonCarga[i]["codCurso"]!=JsonCarga[i+1]["codCurso"])
//                                 {
//                                     distinto=1;
//                                 }
//                             }
                            

//                             if(JsonCarga[i]["teopra"]==="T")
//                             {   
//                                 // if()
//                                 seccion=$("#sec"+JsonCarga[i]["codCurso"]+primerTeorico).html();
//                                 if((seccion.length)>1)
//                                 {
//                                     console.log(seccion);
//                                 }
                                

//                                 $("#"+JsonCarga[i]["codCurso"]+primerTeorico).after("<tr id='"+JsonCarga[i]["codCurso"]+(primerTeorico+1)+"'>"+
//                                                                                  "<td id='sec"+JsonCarga[i]["codCurso"]+(primerTeorico+1)+"'>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["hora"]+"</td></tr>");
//                                 primerTeorico++;
//                                 $("."+JsonCarga[i]["codCurso"]).attr("rowspan",(primerTeorico+1));
//                             }
//                         }
//                     }
//                     else
//                     {

//                     }
                
//             }
//     }

// }
// ------------------------------------------------------ULTIMO
// var posicionT = new Array();
// var a=0;
// var cursoActual="";
// var primerTeorico=0;
// distinto=1;

// function CrearTablaReportesCargaCurso1(JsonCurricular,JsonCarga){
//     numCurso=Object.keys(JsonCurricular).length;
//     numCarga=Object.keys(JsonCarga).length;
//     nextcodigo="";
//     $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");
//     //---------------- Primer Bucle Llena el Curso y Nombre del Curso en la tabla
//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         // ----------Bucle Donde recorremos los cursos por curricula
//         for(u=0;u<numCurso;u++)
//             {
//                 // Verificamos si el curso esta en la curricula
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {   
//                     disponible=1;
//                 }
//             }
        
        
//             // Verificamos si encontro el curso en la curricula
//             if(disponible==1)
//             {
//                 // Verificamos que el Curso no se repita
//                 if(JsonCarga[i]["codCurso"]!=nextcodigo)
//                 {
//                     $('#tabla').append("<tr id='"+JsonCarga[i]["codCurso"]+0+"'><td class='"+JsonCarga[i]["codCurso"]+" tdnomcodigo'>"+JsonCarga[i]["nomCurso"]+"</td>"+
//                                            "<td class='"+JsonCarga[i]["codCurso"]+" tdcodigo'>"+JsonCarga[i]["codCurso"]+"</td>"+
//                                            "</tr>");
//                     posicionT[a]=i;
//                     a++;
//                     // verificamos que el siguiente codigo no salga del limite del Json
//                     if(i+1<numCarga)
//                     {
//                         nextcodigo=JsonCarga[i+1]["codCurso"];
//                     }
//                 }
//             }
//     }
//     //--------------- Segundo Bucle Llena la seccion y el  docente 
//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         for(u=0;u<numCurso;u++)
//             {
//                 // Verificamos si el curso esta en la curricula
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {   

//                     disponible=1;
//                 }
//             }
//             // Verificamos si encontro el curso en la curricula
//             if(disponible==1)
//             {   
//                     if ( $("#"+JsonCarga[i]["codCurso"]+"0").length > 0 ) {
//                         if(distinto==1)
//                         {   
//                             if(JsonCarga[i]["teopra"]==="T")
//                             { 
//                             primerTeorico=0;
//                             $("#"+JsonCarga[i]["codCurso"]+primerTeorico).append("<td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["hora"]+"</td>");
//                             distinto=0;
//                             }
//                         }else{
//                             // Verificar si no sobrepasa el JSON
//                             if(i+1<numCarga)
//                             {
//                                 if(JsonCarga[i]["codCurso"]!=JsonCarga[i+1]["codCurso"])
//                                 {
//                                     distinto=1;
//                                 }
//                             }
                            

//                             if(JsonCarga[i]["teopra"]==="T")
//                             {   
//                                 $("#"+JsonCarga[i]["codCurso"]+primerTeorico).after("<tr id='"+JsonCarga[i]["codCurso"]+(primerTeorico+1)+"'><td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                                                                  "<td>"+JsonCarga[i]["hora"]+"</td></tr>");
//                                 primerTeorico++;
//                                 $("."+JsonCarga[i]["codCurso"]).attr("rowspan",(primerTeorico+1));
//                             }
//                         }
//                     }
//                     else
//                     {

//                     }
                
//             }
//     }

// }
// var valor=$("#MB1550>td:first+td+td").html();console.log(valor);

// function CrearTablaReportesCargaCurso(JsonCurricular,JsonCarga){
//     numCurso=Object.keys(JsonCurricular).length;
//     numCarga=Object.keys(JsonCarga).length;
//     anexo="";
//     nextcodigo="";
//     $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");

//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         codigo=JsonCarga[i]["codCurso"];

//             for(u=0;u<numCurso;u++)
//             {
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {   

//                     disponible=1;
//                 }
//             }

//         if(disponible==1)
//         {
//             // Si el codigo del bucle es igual al codigo siguiente(ademas siempre entrara primero al else ya que nextcodigo aun no recibe un valor)
//             if(codigo==nextcodigo)
//             {
//                 switch(JsonCarga[i]["teopra"])
//                 {
//                     case "T":
//                             $("#tabla").append("<tr><td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["hora"]+"</td>"+
//                                    "</tr>");
//                             unirfilas++;
//                             if(anexo!="")
//                             {
//                                 $("."+anexo).attr("rowspan",unirfilas);
//                             }
//                         break;
//                     case "P":

//                         break;
//                     default:
//                 }
                
//             }
//             else
//             {
//                 switch(JsonCarga[i]["teopra"])
//                 {
//                     case "T":
//                         // Verificamos que al final de la comparacion el Json siguiente no exista
//                         if(i+1<numCarga)
//                         {
//                             nextcodigo=JsonCarga[i+1]["codCurso"];
//                         }

                        

//                         anexo=codigo;

//                         $('#tabla').append("<tr><td class='"+codigo+" tdnomcodigo'>"+JsonCarga[i]["nomCurso"]+
//                                            "<td class='"+codigo+" tdcodigo'>"+JsonCarga[i]["codCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["hora"]+"</td>"+
//                                             "</tr>");

//                         // codigo=nextcodigo;
//                         unirfilas=1;
//                         break;
//                     case "P":
//                         if(i+1<numCarga)
//                         {
//                             nextcodigo=JsonCarga[i+1]["codCurso"];
//                         }
//                         anexo=codigo;
//                         $('#tabla').append("<tr><td class='"+codigo+" tdnomcodigo'>"+JsonCarga[i]["nomCurso"]+
//                                            "<td class='"+codigo+" tdcodigo'>"+JsonCarga[i]["codCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                            "<td>"+"Vacio"+"</td>"+
//                                            "<td>"+JsonCarga[i]["hora"]+"</td>"+
//                                             "</tr>");
//                         // codigo=nextcodigo;
//                         unirfilas=1;
//                         break;
//                     default:
//                 }

                
//             }
//         }   
//     }
// }

    
//  function CrearTablaReportesCargaCurso(JsonCurricular,JsonCarga){
//     numCurso=Object.keys(JsonCurricular).length;
//     numCarga=Object.keys(JsonCarga).length;
//     anexo="";
//     nextcodigo="";
//     $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-reporte-carga-curso border'>");

//     for(i=0;i<numCarga;i++){
//         disponible=0;
//         codigo=JsonCarga[i]["codCurso"];

//             for(u=0;u<numCurso;u++)
//             {
//                 if(JsonCurricular[u]["codCurso"]==JsonCarga[i]["codCurso"])
//                 {
//                     disponible=1;
//                 }
//             }

//         if(disponible==1)
//         {
//             // Si el codigo del bucle es igual al codigo siguiente(ademas siempre entrara primero al else ya que nextcodigo aun no recibe un valor)
//             if(codigo==nextcodigo)
//             {
//                             $("#tabla").append("<tr><td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                    "<td>"+JsonCarga[i]["hora"]+"</td>"+
//                                    "</tr>");
//                             unirfilas++;
//                             if(anexo!="")
//                             {
//                                 $("."+anexo).attr("rowspan",unirfilas);
//                             }
                
//             }
//             else
//             {
//                         // Verificamos que al final de la comparacion el Json siguiente no exista
//                         if(i+1<numCarga)
//                         {
//                             nextcodigo=JsonCarga[i+1]["codCurso"];
//                         }

                        

//                         anexo=codigo;

//                         $('#tabla').append("<tr><td class='"+codigo+" tdnomcodigo'>"+JsonCarga[i]["nomCurso"]+
//                                            "<td class='"+codigo+" tdcodigo'>"+JsonCarga[i]["codCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["secCurso"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["nombres"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["teopra"]+"</td>"+
//                                            "<td>"+JsonCarga[i]["hora"]+"</td>"+
//                                             "</tr>");

//                         codigo=nextcodigo;
//                         unirfilas=1;
//             }
//         }   
//     }
// }
