$(document).ready(function() {
    // ------Curso Por Curricula-----
    // dividirSeccion("A/B/C");
    // calcularHoras("12-14");
    $("#contenedor-carga-curso").append('<img class="imgcargando container-fluid" src="views/Librerias/img/cargando.gif"/>').fadeIn();
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
                        $(".imgcargando").fadeOut();
                        CrearTablaReportesCargaCurso(JSON.parse(data1), JSON.parse(data2), JSON.parse(data3));

                        dep=$("#cboDepartamento").val();
                        CambioDepartamento(dep);
                        mostrarhora();
                        
                    });
                });
        });

    $("#cboDepartamento").change(function() {
        $("#cboDepartamento option:selected").each(function() {
            dep=$("#cboDepartamento").val();
            CambioDepartamento(dep);
        });
    });

});
function mostrarhora(){ 
var f=new Date();
cad=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
window.status =cad;
$("#fecha").html(fecha()+" "+cad);
setTimeout("mostrarhora()",1000); 
}

function CambioDepartamento(departamento){
    $(".DACBAHCC").hide();
    $(".DACI").hide();
    $(".DAIA").hide();
    $("."+departamento).show();

}

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
        secDisponible=0;
        primeraSeccion=0;
        contador=0;
        _numerador=0;

        n1=1; n2=1;n3=1;
        $('#contenedor-carga-curso').append("<table border='1' id='tabla' class='tabla-carga-curso border'>");
        $('#tabla').append("<thead><th>N°</th><th>CURSOS</th>"+
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
            if(String(JsonCursos[i]["depAcademico"])==="DACI")
            {
                _numerador=n1;
                n1++;

            }
            if(String(JsonCursos[i]["depAcademico"])==="DAIA")
            {
                _numerador=n2;
                n2++;
            }
            if(String(JsonCursos[i]["depAcademico"])==="DACBAHCC")
            {
                _numerador=n3;
                n3++;
            }
            $("#tabla").append("<tr id='"+JsonCursos[i]["codCurso"]+"0' class='"+JsonCursos[i]["depAcademico"]+"'>"+
                                "<td class='ampliar"+JsonCursos[i]["codCurso"]+"'>"+_numerador+"</td>"+
                                "<td class='ampliar"+JsonCursos[i]["codCurso"]+"'>"+JsonCursos[i]["nomCurso"]+"</td>" +
                                "<td class='ampliar"+JsonCursos[i]["codCurso"]+"'>"+JsonCursos[i]["codCurso"]+"</td>" +
                                "</tr>");
             
        }

        for(u=0;u<numCurso;u++)
        {   
            cursoActual=JsonCursos[u]["codCurso"];
            cursoSiguiente="";
            departamento=JsonCursos[u]["depAcademico"];
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
                            console.log("actual: "+cursoActual);
                            if((i+1)<numCargaT)
                            {
                                cursoSiguiente=JsonCargaT[i+1]["codCurso"];
                                seccionSiguiente=JsonCargaT[i+1]["secCurso"];
                            }

                            if(JsonCargaT[i]["secCurso"]==seccionSiguiente && cursoActual==cursoSiguiente)
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;
                            }
                            else
                            {
                                totalhoras=calcularHoras(JsonCargaT[i]["hora"])+totalhoras;

                                if(identP==0)
                                {    secCadena=seccionSinSlash(JsonCargaT[i]["secCurso"]);
                                    $("#"+cursoActual+identP).append("<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+totalhoras+"</td>");
                                    
                                }
                                else
                                {
                                    if($("#"+cursoActual+(identP-1)).length > 0)
                                    {   
                                        secCadena=seccionSinSlash(JsonCargaT[i]["secCurso"]);
                                        $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"' class='"+departamento+"'><td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+totalhoras+"</td>"+"</tr>");
                                        $(".ampliar"+cursoActual).attr("rowspan",(identP+1));
                                    }
                                    else
                                    {   
                                        secCadena=seccionSinSlash(JsonCargaT[i]["secCurso"]);
                                        $("."+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"' class='"+departamento+"'><td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["secCurso"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+JsonCargaT[i]["nombres"]+"</td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+secCadena+"'>"+totalhoras+"</td>"+"</tr>");
                                        $(".ampliar"+cursoActual).attr("rowspan",(identP+1));
                                    }
                                    
                                }
        // -----------------------------En caso de Secciones
                                seccion.length=0;
                                seccion=dividirSeccion(JsonCargaT[i]["secCurso"]);
                                secCadena=seccionSinSlash(JsonCargaT[i]["secCurso"]);

                                for(t=0;t<numCargaP;t++)
                                {
                                    for(g=0;g<seccion.length;g++)
                                    {
                                        if(JsonCargaP[t]["secCurso"]==seccion[g] && JsonCargaP[t]["codCurso"]==cursoActual)
                                        {
                                            secDisponible=1;
                                        }
                                    }
                                }

                                if(secDisponible==1)
                                {
                                    for(g=0;g<seccion.length;g++)
                                    {

                                        for(t=0;t<numCargaP;t++)
                                        {   

                                            if(JsonCargaP[t]["secCurso"]==seccion[g] && JsonCargaP[t]["codCurso"]==cursoActual)
                                            {
                                                if((t+1)<numCargaP)
                                                {
                                                    curSiguiente=JsonCargaP[t+1]["codCurso"];
                                                    secSiguiente=JsonCargaP[t+1]["secCurso"];
                                                }
                                                if(JsonCargaP[t]["secCurso"]==secSiguiente && JsonCargaP[t]["codCurso"]==curSiguiente)
                                                {
                                                    subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                    if(primeraSeccion==0)
                                                    {
                                                        pase=1;
                                                    }

                                                }else{
                                                    subhorasP=calcularHoras(JsonCargaP[t]["hora"])+subhorasP;
                                                    if(primeraSeccion==0)
                                                    {
                                                        pase=1;
                                                        primeraSeccion=1;
                                                    }

                                                    if(pase==1)
                                                    {
                                                        $("#"+cursoActual+identP).append("<td>"+JsonCargaP[t]["secCurso"]+"</td>"+
                                                                                         "<td>"+JsonCargaP[t]["nombres"]+"</td>"+
                                                                                         "<td>"+subhorasP+"</td>");
                                                        pase=0;

                                                    }else{
                                                        console.log("secciones bucle : curso:"+cursoActual+"Secc"+seccion[g]);
                                                        cadenaCargaPractica=cadenaCargaPractica.replace(cursoActual+identP,"");
                                                        cadenaCargaPractica=cadenaCargaPractica+"<tr class='"+cursoActual+identP+" "+departamento+"'><td>"+JsonCargaP[t]["secCurso"]+"</td>"+
                                                                                                "<td>"+JsonCargaP[t]["nombres"]+"</td>"+
                                                                                                "<td>"+subhorasP+"</td></tr>";
                                                        console.log(cadenaCargaPractica);
                                                        rowseccion=$(".ampliar"+cursoActual+secCadena).attr("rowspan");
                                                        console.log("-----"+cursoActual+"-"+rowseccion+"-"+contador);
                                                        if(rowseccion)
                                                        {   numrowsec=parseInt(rowseccion);
                                                            $(".ampliar"+cursoActual+secCadena).attr("rowspan",numrowsec+1);
                                                        }
                                                        else{
                                                            numrowsec=1;
                                                            $(".ampliar"+cursoActual+secCadena).attr("rowspan",numrowsec+1);
                                                        }
                                                        contador++;
                                                    }
                                                    subhorasP=0;
                                                }

                                            }
                                        }
                                        
                                    }
                                    if(cadenaCargaPractica!="")
                                        {
                                            $("#"+cursoActual+identP).after(cadenaCargaPractica);
                                            $("#"+cursoActual+identP).attr("id","");

                                        }
                                        subhorasP=0;
                                        cadenaCargaPractica="";
                                }else{
                                    $("#"+cursoActual+identP).append("<td></td><td></td><td></td>");
                                }

                                if(cursoActual!=cursoSiguiente)
                                {
                                            rowcurso=$(".ampliar"+cursoActual).attr("rowspan");
                                            console.log("-----"+cursoActual+"-"+rowcurso+"-"+contador);
                                            

                                            if(rowcurso)
                                            {   
                                                numrow=parseInt(rowcurso);
                                                $(".ampliar"+cursoActual).attr("rowspan",(numrow+contador));
                                            }
                                            else{
                                                numrow=1;
                                                $(".ampliar"+cursoActual).attr("rowspan",(numrow+contador));
                                                // $(".ampliar"+cursoActual).attr("rowspan",2);
                                            }

                                            // 
                                        contador=0;
                                }
                                primeraSeccion=0;
                                secDisponible=0;
                                identP++;
                                totalhoras=0;
                            }
                           
                        }else
                        {
                            identP=0;
                        }
                    }
// ------------------------En caso solo tenga carga horaria en Practicas
                }else if(curDisponibleT==0 && curDisponibleP==1){

                $("#"+cursoActual+"0").append("<td class='ampliar"+cursoActual+"'></td><td class='ampliar"+cursoActual+"'></td><td class='ampliar"+cursoActual+"'></td>");

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
                                    
                                    $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"' class='"+departamento+"'><td>"+JsonCargaP[i]["secCurso"]+"</td>"+
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
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'></td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'></td>"+
                                        "<td class='ampliar"+JsonCargaT[i]["codCurso"]+"'></td>");
                                    identP++;
                                }
                                else{
                                    
                                    $("#"+cursoActual+(identP-1)).after("<tr id='"+JsonCursos[u]["codCurso"]+identP+"' class='"+departamento+"'><td>"+JsonCargaT[i]["secCurso"]+"</td>"+
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
                $("#"+cursoActual+"0").append("<td></td><td></td><td></td><td></td><td></td><td></td>");

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

function seccionSinSlash(seccion){
    sec=new Array();
    canseccion=seccion.length;
    cadena='';
    m=0;
    if(canseccion>1)
    {
        for(k=0;k<canseccion;k++)
        {
            if(k % 2 == 0)
            {
                sec[m]=seccion.substring(k,(k+1));
                cadena=cadena+sec[m];
                m++;
            }
        }
        return cadena;
    }else{
        cadena=seccion;
        return cadena;
    }
}

function fecha()
{
    var a=new Date();
    var dia=a.getDate();
    var mes=(a.getMonth()+1);
    var año=a.getFullYear();

    var digitos_dia=dia.toString().length;
    var digitos_mes=mes.toString().length;
    if(digitos_dia<2)
    {
        dia="0"+dia;
    }

    if(digitos_mes<2)
    {
        mes="0"+mes;
    }

    var fechafinal=dia+"/"+mes+"/"+año;
    return fechafinal;
}
