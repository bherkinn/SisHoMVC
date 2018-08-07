$.get("views/Anexos/carga_docente.php",{accion:'ObtenerDocentes'},
function(data){
	JsonDocentes=JSON.parse(data);
	canDocentes=Object.keys(JsonDocentes).length;
	$.get("views/Anexos/carga_docente.php",{accion:'ObtenerHorariosDistintos'},
    function(horariosdist){
      JsonHorariosDist=JSON.parse(horariosdist);
      canHorariosDist=Object.keys(JsonHorariosDist).length;
      $.get("views/Anexos/carga_docente.php",{accion:'ObtenerHorariosTotal'},
        function(horariostotal){
          JsonHorariosTotal=JSON.parse(horariostotal);
          canHorariosTotal=Object.keys(JsonHorariosTotal).length;
          CrearTablaReportesCargaDocente(JsonDocentes,JsonHorariosDist,JsonHorariosTotal);
          mostrarhora();
          
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

function CrearTablaReportesCargaDocente(JsonDocentes,JsonHorariosDist,JsonHorariosTotal){
  primer=1;
  cadena="";
  contador=1;
  exito=0;
  total=0;
  num=1;

	$('#contenedor-carga-docente').append("<table border='1' id='tabla' class='tabla-carga-curso border'>");
        $('#tabla').append("<thead><th class='tot'>N°</th><th class='nomdocente'>APELLIDOS Y NOMBRES</th>"+
                                  "<th>CUR-SEC</th>"+
                                  "<th class='nomcurso'>NOMBRE DEL CURSO</th>"+
                                  "<th class='horash'>HT</th>"+
                                  "<th class='horash'>HP</th>"+
                                  "<th class='horash'>HL</th>"+
                                  "<th class='tot'>TOT</th>"+
                           "<thead>");
  // Creamos la tabla------------------
  for(i=0;i<canDocentes;i++)
  { 
    $("#tabla").append("<tr id='"+JsonDocentes[i]["codDocente"]+"' class='"+JsonDocentes[i]["depAcademico"]+"'><td class='"+JsonDocentes[i]["codDocente"]+" tot'>"+num+"</td><td class='"+JsonDocentes[i]["codDocente"]+"'>"+JsonDocentes[i]["nombres"]+"</td></tr>");
    for(u=0;u<canHorariosDist;u++)
    {
      if(JsonDocentes[i]["codDocente"]==JsonHorariosDist[u]["codDocente"])
      { 
        codigo=JsonDocentes[i]["codDocente"];
        curso=JsonHorariosDist[u]["codCurso"];
        sec=JsonHorariosDist[u]["secCurso"];
        secId=seccionSinSlash(JsonHorariosDist[u]["secCurso"]);

        if(primer==1)
        { 
          // console.log("here"+sec);
          $("#"+JsonDocentes[i]["codDocente"]).append("<td id='"+curso+sec+"'>"+curso+"-"+sec+"</td><td id='"+curso+"'>"+JsonHorariosDist[u]["nomCurso"]+
                                                      "</td><td class='horash' id='"+codigo+curso+secId+"T'></td>"+"<td class='horash' id='"+codigo+curso+secId+"P'></td>"+
                                                      "<td class='horash' id='"+codigo+curso+secId+"L'></td><td id='total"+
                                                      JsonDocentes[i]["codDocente"]+"' class='"+JsonDocentes[i]["codDocente"]+" tot'></td>");
          primer=0;
        }else{
          contador++;
          cadena=cadena+"<tr><td id='"+curso+sec+"'>"+curso+"-"+sec+"</td><td id='"+curso+"'>"+JsonHorariosDist[u]["nomCurso"]+"</td>"+
                            "<td class='horash' id='"+codigo+curso+secId+"T'></td><td class='horash' id='"+codigo+curso+secId+"P'></td>"+
                            "<td class='horash' id='"+codigo+curso+secId+"L'></td></tr>";
          exito=1;
          // console.log(contador);
        }

      }
      if(exito==1)
      {
        $("."+JsonDocentes[i]["codDocente"]).attr("rowspan",contador);
        $("#"+JsonDocentes[i]["codDocente"]).after(cadena);
      }
      cadena="";
    }
    contador=1;
    primer=1;
    exito=0;
    num++;
  }

  // Lllenamos la Tabla con sus horas--------------------

  for(j=0;j<canHorariosTotal;j++)
  {
    cursoActual=JsonHorariosTotal[j]["codCurso"];
    seccion=seccionSinSlash(JsonHorariosTotal[j]["secCurso"]);
    teopra=JsonHorariosTotal[j]["teopra"];
    resultHoras=calcularHoras(JsonHorariosTotal[j]["hora"]);
    docente=JsonHorariosTotal[j]["codDocente"];
    // console.log(docente);

    tdhora=$("#"+docente+cursoActual+seccion+teopra).html();

    if(tdhora)
    {
      hora=parseInt(tdhora);
    }
    else
    {
      hora=0;
    }
    
    sumatoria=hora+resultHoras;
    $("#"+docente+cursoActual+seccion+teopra).html(sumatoria);
    
  }

  for(d=0;d<canHorariosTotal;d++)
  {
    if(primer=1)
    {
      docActual=JsonHorariosTotal[d]["codDocente"];
      primer=0;
    }

    if((d+1)<canHorariosTotal)
    {
      docsiguiente=JsonHorariosTotal[d+1]["codDocente"]
    }else{
      docsiguiente="";
    }

    if(docActual==docsiguiente)
    {
      console.log("buclefinal"+docente);
      total=total+calcularHoras(JsonHorariosTotal[d]["hora"]);

    }
    else
    {
      console.log(docente);
      total=total+calcularHoras(JsonHorariosTotal[d]["hora"]);
      $("#total"+docActual).html(total);
      total=0;
    }
   
  }



}

function calcularHoras(hora){
    console.log("---------------"+hora);
    hinicial=hora.substring(0,2);
    hfinal=hora.substring(3,5);

    hinicial=parseInt(hinicial);
    hfinal=parseInt(hfinal);

    canhoras=hfinal-hinicial;

    return canhoras;
}

function seccionSinSlash(seccion){
    secc=new Array();
    canseccion=seccion.length;
    cadena='';
    m=0;
    if(canseccion>1)
    {
        for(k=0;k<canseccion;k++)
        {
            if(k % 2 == 0)
            {
                secc[m]=seccion.substring(k,(k+1));
                cadena=cadena+secc[m];
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