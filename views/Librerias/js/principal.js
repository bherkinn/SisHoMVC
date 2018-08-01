var medida;
var disponible = 1;
var cerrado = "no";
var idcursor;
var indicefila;


$(document).ready(function() {
    $("#select-cursos").select2({
        width: '300px',
    });
});

$(document).ready(function() {

    if ($(window).width() <= 675) {

        $("#select-cursos").select2({
            width: '260px'
        });


    } else {
        $("#select-cursos").select2({
            width: '300px'
        });
    }
});


$(window).resize(function() {
    if ($(window).width() <= 1200) {
        $("#tabla-acomodar").addClass("col-sm-12");
        $("#tablas-extras").removeClass("container")
        $("#tablas-extras").addClass("container-fluid");
    } else {
        $("#tabla-acomodar").removeClass("col-sm-12");
        $("#tablas-extras").removeClass("container-fluid")
        $("#tablas-extras").addClass("container");
    }
});
$(window).ready(function() {
    if ($(window).width() <= 1200) {
        $("#tabla-acomodar").addClass("col-sm-12");
        $("#tablas-extras").removeClass("container")
        $("#tablas-extras").addClass("container-fluid");
    } else {
        $("#tabla-acomodar").removeClass("col-sm-12");
        $("#tablas-extras").removeClass("container-fluid")
        $("#tablas-extras").addClass("container");
    }
});


$(window).resize(function() {
    if ($(window).width() != medida) {
        if ($(window).width() <= 675) {

            $("#select-cursos").select2({
                width: '260px'
            });

        } else {
            $("#select-cursos").select2({
                width: '300px'
            });
        }
        medida = $(window).width();
    }
});

let cboaulas;
let cbodocentes;
$(document).ready(function() {
    $.get("views/Anexos/principal.php", {accion:"cboAulas"},
        function(data) {
            cboaulas = JSON.parse(data);
        });
});

$(document).ready(function() {
    $.get("views/Anexos/principal.php", {accion:"cboDocentes"},
        function(data) {
            cbodocentes = JSON.parse(data);
        });
});
var cursostotal;
var cantidadct;
var cbocursos;
var cantidadcbc;
m = new Array();
g = new Array();


$(document).ready(function(){
    $.get("views/Anexos/principal.php",{accion:"cboCursos"},
        function(datoscursos){

            cursostotal=JSON.parse(datoscursos);
            cantidadct=Object.keys(cursostotal).length;
            ingrese=0;

            $.get("views/Anexos/principal.php",{accion:"cboPeriodos"},
            function(data){
                cboperiodo=JSON.parse(data);
                cantidadcbp=Object.keys(cboperiodo).length;
                for(i=0;i<cantidadcbp;i++)
                {
                    $("#cboperiodo").append("<option value="+cboperiodo[i]["verCurricular"]+">"+cboperiodo[i]["perAcademico"]+"</option>");
                    $("#periodo-clonar").append("<option value="+cboperiodo[i]["perAcademico"]+">"+cboperiodo[i]["perAcademico"]+"</option>");
                }
                vercurricular=$("#cboperiodo").val();
                $.get("views/Anexos/principal.php",{accion:"cboCursosPeriodo",vercurricular:vercurricular},
                function(dtcursos){
                    cbocursos=JSON.parse(dtcursos);
                    cantidadcbc=Object.keys(cbocursos).length;
                    for(a=0;a<cantidadct;a++)
                {   

                    for(i=0;i<cantidadcbc;i++)
                    {   
                        if(cursostotal[i]['nomCurso']==null)
                        {
                            cursostotal[i]['nomCurso']="xxxxxxxxxxxxxxxxxxx";
                        }

                        if(cursostotal[a]['codCurso']==cbocursos[i]['codCurso'])
                        {
                             ingrese=1;
                        }
                        
                        
                    }
                    if(ingrese==1)
                    {
                        $("#select-cursos").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
                        ingrese=0;
                    }
                    else{
                        $("#select-cursos").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
                    }  
                }
                    
                    $("#tabla-carga").removeClass("table-responsive border rounded");
                    $("#tabla-carga").html("");
                    $("#tabla-carga").html('<center><img style="height:80px;" src="views/Librerias/img/cargando.gif"/></center>').fadeIn();
                    // --------------------------
                    ciclo=$("#cboperiodo option:selected").text();
                    curso=$("#select-cursos").val();

                    correspondecia(curso,vercurricular);

/*Obtener horarios tabla*/  $.get("views/Anexos/principal.php", {accion:"MostrarHorariosTabla",
                            curso: curso,
                            ciclo: ciclo,
                            estado: 1
                        },
                        function(data) {
                            datosJSON = JSON.parse(data);
                            setTimeout("$('#tabla-carga').css({'display':'none'});$('#tabla-carga').html('');", 400);
                            setTimeout("$('#tabla-carga').fadeIn(CrearTablaPrincipal(datosJSON,cboaulas,cbodocentes));", 400);
                            // $("#tabla").html(data).fadeIn();
                            $.get("views/Anexos/principal.php",{accion:"versionCurricular"},
                                function(datosCurricular){
                                    vercurricular=JSON.parse(datosCurricular);
                                    cantidadvc=Object.keys(vercurricular).length;
                                    for(u=0;u<cantidadvc;u++)
                                    {   
                                        if(u==(cantidadvc-1))
                                        {   
                                            $("#cbocurricular").append("<option value="+vercurricular[u]["verCurricular"]+" selected >"+vercurricular[u]["verCurricular"]+"</option>");
                                        }
                                        else
                                        {
                                            $("#cbocurricular").append("<option value="+vercurricular[u]["verCurricular"]+" >"+vercurricular[u]["verCurricular"]+"</option>");
                                        }
                                    }
                                });
                        });

                });

            });

        });
});

$(document).ready(function() {
    CrearCorrespondencia();
    $("#cboperiodo").change(function() {
        $("#cboperiodo option:selected").each(function() {
            vercurricular=$("#cboperiodo").val();
            $.get("views/Anexos/principal.php",{accion:"cboCursosPeriodo",vercurricular:vercurricular},
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
                        $("#select-cursos").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
                        ingrese=0;
                    }
                    else{
                        $("#select-cursos").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
                    }  
                }
                $("#tabla-carga").removeClass("table-responsive border rounded");
                $("#tabla-carga").html("");
                $("#tabla-carga").html('<center><img style="height:80px;" src="views/Librerias/img/cargando.gif"/></center>').fadeIn();
                ciclo = $("#cboperiodo option:selected").text();
                curso = $("#select-cursos").val();

                $.get("views/Anexos/principal.php", {accion:"MostrarHorariosTabla",
                        curso: curso,
                        ciclo: ciclo,
                        estado: 1
                    },
                    function(data) {
                        datosJSON = JSON.parse(data);
                        setTimeout("$('#tabla-carga').css({'display':'none'});$('#tabla-carga').html('');", 400);
                        setTimeout("$('#tabla-carga').fadeIn(CrearTablaPrincipal(datosJSON,cboaulas,cbodocentes));", 400);
                        // $("#tabla").html(data).fadeIn();
                    });
            });
        });
    });
});
/*********************Mensajes de Confirmacion**************************/

$("#btn-borrar-curso").click(function(){
    cursoeliminar=$("#select-cursos").val();
    alertify.confirm("Esta a punto de Eliminar el Horario Completo del curso "+cursoeliminar+"<br><br>¿Desea Eliminarlo?",
        function(){
              setTimeout("borrarPorCurso();",200);
        },
        function(){

        }); 
});

function borrarPorCurso(){
    alertify.confirm("¿Esta Seguro?",
        function(){
            periodo=$("#cboperiodo option:selected").text();
            curso=$("#select-cursos").val();
            $.get("views/Anexos/principal.php",{accion:"borrarPorCurso",curso:curso,periodo:periodo},
            function(){
                alertify.success("Cursos Borrados");
                $(".tr").fadeOut();
            });
        },
        function(){

        });
}

$(document).ready(function() {
    $("#select-cursos").change(function() {
        $("#select-cursos option:selected").each(function() {
            buscar();
            // ------CORRESPONDENCIA------
            vercurricular=$("#cboperiodo").val();
            curso = $("#select-cursos").val();
            correspondecia(curso,vercurricular);
        });
    });
});

correspondencia=new Array();

function CrearCorrespondencia(){
    for(q=1;q<=10;q++)
    {   
        correspondencia[q]=new Array();

        if(q==1)
        {
            correspondencia[q][1]="M3";
            correspondencia[q][2]="M3";
            correspondencia[q][3]="M4";
            correspondencia[q][4]="M4";
            correspondencia[q][5]="M5";                                                                          
            correspondencia[q][6]="M6";
            correspondencia[q][7]="M6";
            // alert(q);

        }else{
            for(r=1;r<=5;r++){
                if(q==2 && r==1)
                {
                    correspondencia[q][r]="M3-M4";
                }else
                {
                    if(r==5)
                    {
                        correspondencia[q][r]="x";
                    }
                    else{
                        correspondencia[q][r]="M"+(r+2);
                    }
                }
            }
        }
    }

}

var cadenaCorrespondecia="";

function CrearTablaPrincipal(datosJson, cboaulas, cbodocentes) {
    $("#tabla-carga").attr("class", "table-responsive border rounded");
    var cantidad = Object.keys(datosJSON).length;
    var cantidadAulas = Object.keys(cboaulas).length;
    var cantidadDocentes = Object.keys(cbodocentes).length;
    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla-principal");
    tabla.setAttribute("class", "tabla-principal");
    var contenedor = document.getElementById("tabla-carga");
    contenedor.appendChild(tabla);
    $("#tabla-principal").append("<tr class='head-tabla'><th style='width:2px'></th>" +
        "<th class='num th'>N.O.</th>" +
        "<th class='th'>DIA</th>" +
        "<th class='th'>HORA</th>" +
        // "<th class='th'>CURSO</th>" +
        "<th class='thseccion'>SECCION</th>" +
        "<th class='th'>T/P</th>" +
        "<th class='thaula'>AULA</th>" +
        "<th class='thaula'>AULA 2</th>" +
        "<th class='thdocente'>DOCENTE</th>" +
        "<th class='th'>C1</th>" +
        "<th class='th'>C2</th>" +
        "<th class='th'>C3</th>" +
        "<th class='th'>C4</th>" +
        "<th class='th'>C5</th>" +
        "<th class='th'>C6</th>" +
        "<th class='th'>C7</th>" +
        "<th class='th'>C8</th>" +
        "<th class='th'>C9</th>" +
        "<th class='thc10'>C10</th>" +
        "<th style='width:2px'></th>" + "</tr>");
    for (i = 0; i < cantidad; i++) {
        id = datosJSON[i]['idHorarios'];
        $("#tabla-principal").append(
            "<tr class='tr' id='" + id + "'>" +
            "<td></td>" +
            "<td><input id='txtorden" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['orden'] + "'></td>" +
            "<td><input id='txtdia" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['dia'] + "'></td>" +
            "<td><input id='txthora" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['hora'] + "'></td>" +
            // "<td><input id='txtcurso" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['codCurso'] + "'></td>" +
            "<td><input id='txtseccion" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['secCurso'] + "'></td>" +
            "<td><input id='txttp" + id + "' type='text' disabled class='i txtform' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['teopra'] + "'></td>" +
            "<td id='tdaulas'><select class='select-aulas' id='select-aulas" + id + "' disabled></select>" +
            "<td id='tdaulas2'><select class='select-aulas' id='select-aulas2" + id + "' disabled><option value=''> </option></select>" +
            "<td id='tddocentes'><select class='select-docentes' id='select-docentes" + id + "' disabled></select>" +
            "<td><input id='txtc1" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c1'] + "'></td>" +
            "<td><input id='txtc2" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c2'] + "'></td>" +
            "<td><input id='txtc3" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c3'] + "'></td>" +
            "<td><input id='txtc4" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c4'] + "'></td>" +
            "<td><input id='txtc5" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c5'] + "'></td>" +
            "<td><input id='txtc6" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c6'] + "'></td>" +
            "<td><input id='txtc7" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c7'] + "'></td>" +
            "<td><input id='txtc8" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c8'] + "'></td>" +
            "<td><input id='txtc9" + id + "' type='text' disabled class='i txtform ciclo' spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c9'] + "'></td>" +
            "<td><input id='txtc10" + id + "' type='text' disabled class='i txtform ciclo'  spellcheck='false' autocomplete='off' value='" + datosJSON[i]['c10'] + "'></td>" +
            "<td></td>" +
            "</tr>");


        for(j=1;j<=10;j++)
        {
            if($("#txtc"+j+id).val()!="")
            {   
                longitud=$("#txtc"+j+id).val().length;
                for(p=0;p<longitud;p++)
                {
                    grupo = $("#txtc"+j+id).val().substr(p,1);
                    console.log(grupo);
                    cadenaCorrespondecia=cadenaCorrespondecia+"("+grupo+") "+correspondencia[j][parseInt(grupo)]+"\n";
                }
                $("#txtc"+j+id).attr("title",cadenaCorrespondecia);
                cadenaCorrespondecia="";    
            }
        }

        for (u = 0; u < cantidadAulas; u++) {
            // AULAS1
            $("#select-aulas" + datosJSON[i]['idHorarios']).append("<option value='" + cboaulas[u]['aula'] + "'>" + cboaulas[u]['aula'] + "</option>");
            if (datosJSON[i]['codAula'] == cboaulas[u]['aula']) {
                $("#select-aulas" + datosJSON[i]['idHorarios'] + ">option" + "[value='" + datosJSON[i]['codAula'] + "']").attr("selected", "");
            }
            $("#select-aulas" + datosJSON[i]['idHorarios'] + ">option" + "[value='" + cboaulas[u]['aula'] + "']").attr(
                "title", "Capacidad: " + cboaulas[u]['capacidad'] +
                "Tipo: " + cboaulas[u]['tipSilla'] +
                "Entrada: " + cboaulas[u]['tipEntrada']);

            // AULAS2
            $("#select-aulas2" + datosJSON[i]['idHorarios']).append("<option value='" + cboaulas[u]['aula'] + "'>" + cboaulas[u]['aula'] + "</option>");
            if (datosJSON[i]['codAula2'] == cboaulas[u]['aula']) {
                $("#select-aulas2" + datosJSON[i]['idHorarios'] + ">option" + "[value='" + datosJSON[i]['codAula2'] + "']").attr("selected", "");
            }
            $("#select-aulas2" + datosJSON[i]['idHorarios'] + ">option" + "[value='" + cboaulas[u]['aula'] + "']").attr(
                "title", "Capacidad: " + cboaulas[u]['capacidad'] +
                "Tipo: " + cboaulas[u]['tipSilla'] +
                "Entrada: " + cboaulas[u]['tipEntrada']);
        }

        for (a = 0; a < cantidadDocentes; a++) {
            $("#select-docentes" + datosJSON[i]['idHorarios']).append("<option value='" + cbodocentes[a]["codDocente"] + "'>" + cbodocentes[a]['apePaterno'] + " " +
                cbodocentes[a]['apeMaterno'] + ", " + cbodocentes[a]['nombres'] + "</option>");
            if (datosJSON[i]['codDocente'] == cbodocentes[a]['codDocente']) {
                $("#select-docentes" + datosJSON[i]['idHorarios'] + ">option" + "[value='" + datosJSON[i]['codDocente'] + "']").attr("selected", "");
            }
        }

    }
    //AGREGAR FILA DE GURADAR
    $("#tabla-principal").append(
        "<tr id='agregar-fila'>" +
        "<td></td>" +
        "<td><input id='txtorden' type='text' onkeypress='return validarNumericos(event)' class='form-control-n txtform' spellcheck='false' autocomplete='off'></td>" +
        "<td><input id='txtdia' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='2'></td>" +
        "<td><input id='txthora' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='5'></td>" +
        // "<td><input id='txtcurso' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' disabled value='" + $("#select-cursos").val() + "'></td>" +
        "<td><input id='txtseccion' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='5'></td>" +
        "<td><input id='txttp' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td id='tdaulas'><select class='select-aulas' id='select-aulas'><option disabled selected >Elegir</option></select>" +
        "<td id='tdaulas2'><select class='select-aulas' id='select-aulas2'><option value=''> </option></select>" +
        "<td id='tddocentes'><select class='select-docentes' id='select-docentes'><option disabled selected >Elegir</option></select>" +
        "<td><input id='txtc1' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc2' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc3' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc4' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc5' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc6' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc7' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc8' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc9' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td><input id='txtc10' type='text' class='form-control-n txtform' spellcheck='false' autocomplete='off' maxlength='3'></td>" +
        "<td></td>" +
        "</tr>");

    for (u = 0; u < cantidadAulas; u++) {
        // AULAS1
        $("#select-aulas").append("<option value='" + cboaulas[u]['aula'] + "'>" + cboaulas[u]['aula'] + "</option>");

        $("#select-aulas>option" + "[value='" + cboaulas[u]['aula'] + "']").attr(
            "title", "Capacidad: " + cboaulas[u]['capacidad'] +
            "Tipo: " + cboaulas[u]['tipSilla'] +
            "Entrada: " + cboaulas[u]['tipEntrada']);
        // AULAS2
        $("#select-aulas2").append("<option value='" + cboaulas[u]['aula'] + "'>" + cboaulas[u]['aula'] + "</option>");

        $("#select-aulas2>option" + "[value='" + cboaulas[u]['aula'] + "']").attr(
            "title", "Capacidad: " + cboaulas[u]['capacidad'] +
            "Tipo: " + cboaulas[u]['tipSilla'] +
            "Entrada: " + cboaulas[u]['tipEntrada']);
    }

    for (a = 0; a < cantidadDocentes; a++) {
        $("#select-docentes").append("<option value='" + cbodocentes[a]["codDocente"] + "'>" + cbodocentes[a]['apePaterno'] + " " +
            cbodocentes[a]['apeMaterno'] + ", " + cbodocentes[a]['nombres'] + "</option>");
    }

    $(".select-aulas").select2({
        width: "90px"
    });
    $(".select-docentes").select2({
        width: "200px"
    });

    //***********************
    ValidarCajas();
    MenuContextual();
    AccionesDeCajas();

}

function validarNumericos(e) {
    if (e.charCode >= 48 && e.charCode <= 57) {
        return true;
    }
    return false;

}

function validarNumericosGuiones(e) {
    if (e.charCode >= 48 && e.charCode <= 57 || e.charCode == 45) {
        return true;
    }
    return false;

}

function ValidarCajas() {
    $("#txtperiodo").keyup(function() {
        var periodo = $(this);
        periodo.val(periodo.val().replace(/[A-Za-z|ñ|Ñ|{}|´|¨|+|¿|?|*|&|%|$|#|""|!|<|>|:|_|.|;|,|^|`|°|()|=|/|'|¡]/g, function(str) {
            return '';
        }));
    });

    $('#txtorden').keyup(function() {
        var nombre = $(this);
        nombre.val(nombre.val().replace(/[A-Za-z-|{}|´|¨|+|¿|?|*|-|&|%|$|#|""|!|<|>|-|:|_|.|;|,|^|`|°|()|=|/|'|¡]/g, function(str) {
            return '';
        }));
    });
    $('#txtdia').keyup(function() {
        var dia = $(this);
        dia.val(dia.val().replace(/[1-9-|{}|´|¨|+|¿|?|*|-|&|%|$|#|""|!|<|>|-|_|.|;|:|,|^|`|°|()|=|/|'|¡]/g, function(str) {
            return '';
        }));
        dia.val(dia.val().toUpperCase());
    });
    $('#txthora').keyup(function() {
        var hora = $(this);
        hora.val(hora.val().replace(/[A-Za-z|{}|´|¨|+|¿|?|*|&|%|$|#|""|!|<|>|_|.|;|:|,|^|`|°|()|=|/|'|¡]/g, function(str) {
            return '';
        }));
        hora.val(hora.val().toUpperCase());
    });
    $('#txtseccion').keyup(function() {
        var sec = $(this);
        sec.val(sec.val().replace(/[1-9-|{}|´|¨|+|¿|?|*|-|&|%|$|#|""|!|<|>|-|_|.|;|:|,|^|`|°|()|=|'|¡]/g, function(str) {
            return '';
        }));
        sec.val(sec.val().toUpperCase());
    });
    $('#txttp').keyup(function() {
        var dia = $(this);
        dia.val(dia.val().replace(/[1-9-|{}|´|¨|+|¿|?|*|-|&|%|$|#|""|!|<|>|-|_|.|;|:|,|^|`|°|()|=|'|¡]/g, function(str) {
            return '';
        }));
        dia.val(dia.val().toUpperCase());

    });

    for (i = 1; i <= 10; i++) {
        $('#txtc' + i).keyup(function() {
            var dia = $(this);
            dia.val(dia.val().replace(/[A-Za-z-|{}|´|¨|+|¿|?|*|-|&|%|$|#|""|!|<|>|-|_|.|;|:|,|^|`|°|()|=|'|¡|/]/g, function(str) {
                return '';
            }));
            dia.val(dia.val().toUpperCase());

        });
    }

}

function AccionesDeCajas() {

    var comboactivo = 0;
    var idcursor;
    var idcursoractivo;
    var open = 0;

    $("tr").click(function() {
        idcursor= $(this).attr("id");
        if(idcursor)
        {
        	if(idcursor!="agregar-fila")
        	send(idcursor);
	        editar(idcursor);
	        open = 1;
	        //*********Comprobar si el cursor esta activo**********
	        if (idcursoractivo) {
	            if (idcursor != idcursoractivo) {
	                salir(idcursoractivo);
	            }
	        }
	        idcursoractivo = idcursor;
	        comboactivo = 1;
        }
        
    });

    $("#tabla-carga").mouseleave(function() {
        if (open == 1) {
            if (comboactivo == 0) {
                salir(idcursoractivo);
                open = 0;
            }
        }

    });

    $("td, th").mouseenter(function() {
        idcelda = $(this).attr("id");
        if (idcelda) {
            comboactivo = 1;
        } else {
            if (comboactivo == 1) {
                comboactivo = 0;
            }
        }

    });
}

// ***************************************************Menu Contextual********************************************************
var trderecho;

function MenuContextual() {

    $("tr").mousedown(function(e) {
        comboactivo = 1;
        trderecho = $(this).attr("id");
        if (trderecho) {
            if (trderecho != "agregar-fila") {

                console.log(trderecho)
                if (e.which == 3) {
                    $("#" + trderecho).addClass("pintado")
                    $("#menucontextual").css("top", e.pageY - 20);
                    $("#menucontextual").css("left", e.pageX - 20);
                    $("#menucontextual").show("fast");

                    $(document).on("contextmenu", function(e) {
                        return false;
                    });
                }

            } else {
                if (e.which == 3) {
                    $("#" + trderecho).addClass("pintado")
                    $("#menucontextual-agregar").css("top", e.pageY - 20);
                    $("#menucontextual-agregar").css("left", e.pageX - 20);
                    $("#menucontextual-agregar").show("fast");

                    $(document).on("contextmenu", function(e) {
                        return false;
                    });
                }
            }


        }
    });




    $("#menucontextual").mouseleave(function() {
        $("#" + trderecho).removeClass("pintado")
        $("#menucontextual").hide("fast");
        $(document).off("contextmenu");

    });

    $("#menucontextual-agregar").mouseleave(function() {
        $("#" + trderecho).removeClass("pintado");
        $("#menucontextual-agregar").hide("fast");
        $(document).off("contextmenu");
    });
}

// --------------------------------------------------FUNCIONES DEL MENU CONTEXTUAL------------------------------------------------

$("#eliminar-fila").click(function(e) {
    e.preventDefault();
    $("#" + trderecho).fadeOut(500);
    $("#menucontextual").hide("fast");
    $.post("views/Anexos/principal.php", {accion:"borrar",
            id: trderecho,estado:0  
        },
        function(data) {
            alertify.success("Datos Borrados");
        });
});

$("#duplicar-fila").click(function(e) {
    e.preventDefault();
    duplicar(trderecho);
    $("#menucontextual").hide("fast");
    setTimeout("buscar()", 100);
});

$("#registrar-fila").click(function(e) {
    e.preventDefault();
    guardar();
    $("#menucontextual-agregar").hide("fast");
    setTimeout("buscar()", 800);
});

$("#cambiar-curso-fila").click(function(e){
    e.preventDefault();
    $('#modal-cambiar-curso').modal('show');
    $("#txtcursoinicial").val($("#select-cursos").val());
    $("#cbocursofinal").html("");
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
                        $("#cbocursofinal").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
                        ingrese=0;
                    }
                    else{
                        $("#cbocursofinal").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
                    }  
                }
});

$("#list-aulas-disponibles").click(function(e){
    e.preventDefault();

    $('#modal-aulas-disponibles').modal('show');
    dia=$("#txtdia"+trderecho).val();
    cboPeriodo=$("#cboperiodo option:selected").text();
    hora=$("#txthora"+trderecho).val();
    buscarAulasVacia(dia,hora,cboPeriodo);

});

aulasLLenas=new Array();
function buscarAulasVacia(dia,hora,periodo){
    aulasLLenas.length=0;
    
    a=0;
    $('#container-aulas-disponibles').html(dia+"-"+hora+"<br>");
    $.get("views/Anexos/principal.php",{accion:"cargaHorariaPorDia",dia:dia,periodo:periodo},
        function(data){
            
            JsonCargaPorDia=JSON.parse(data);
            canCargaPorDia=Object.keys(JsonCargaPorDia).length;
            canAulas=Object.keys(cboaulas).length;
            for(j=0;j<canCargaPorDia;j++)
            {
                if(compararHoras(hora,String(JsonCargaPorDia[j]["hora"]))=="SI")
                {
                    aulasLLenas[a]=JsonCargaPorDia[j]["codAula"];
                   
                    a++;
                    // alert("hola");
                }
                console.log(hora);
            }

            for(u=0;u<canAulas;u++)
            {   
                ocupado=0;
                for(k=0;k<aulasLLenas.length;k++)
                {
                    if(cboaulas[u]["aula"]==aulasLLenas[k])
                    {
                        ocupado=1;
                    }
                }

                if(ocupado==0)
                {
                    $('#container-aulas-disponibles').append(cboaulas[u]["aula"]+"<br>");
                }
            }
            

        });

}
function compararHoras(hora,horacarga){

    hinicial=hora.substring(0,2);
    hfinal=hora.substring(3,5);

    hinicial=parseInt(hinicial);
    hfinal=parseInt(hfinal);

    hicarga=horacarga.substring(0,2);
    hfcarga=horacarga.substring(3,5);

    hicarga=parseInt(hicarga);
    hfcarga=parseInt(hfcarga);

    ocupado="NO";

    for(inicial=hicarga;inicial<=hfcarga;inicial++)
    {
        if(inicial>=hinicial && inicial<=hfinal)
        {
            ocupado="SI";
        }
    }

    return ocupado;
}

// -------------------------------------------BOTONES DE LA TABLA PRINCIPAL----------------------------------------

$("#btn-cambiartotal-curso").click(function(){
    $("#modal-cambiar-curso-total").modal("show");
    $("#txtcursoinicialtotal").val($("#select-cursos").val());
    $("#cbocursofinaltotal").html("");
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
                        $("#cbocursofinaltotal").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+"</option>");
                        ingrese=0;
                    }
                    else{
                        $("#cbocursofinaltotal").append("<option value="+cursostotal[a]["codCurso"]+">"+cursostotal[a]["codCurso"]+" - "+cursostotal[a]["nomCurso"]+" -------"+"</option>");
                    }  
                }
});

$("#btn-cambiar-curso-total").click(function(){
    periodoactual=$("#cboperiodo option:selected").text();
    cursoinicial=$("#txtcursoinicialtotal").val();
    cursofinal=$("#cbocursofinaltotal").val();

    if(cursoinicial!=cursofinal)
    {
        alertify.confirm("Se pasaran los datos seleccionados del curso "+cursoinicial+" al "+cursofinal+" <br> ¿Desea Continuar?",
            function(){
                $.post("views/Anexos/principal.php",{accion:"cambiarCursoTotal",periodo:periodoactual,codCurso:cursoinicial,codCursoNuevo:cursofinal},
                    function(){
                        $('#modal-cambiar-curso-total').modal('hide');
                        $(".tr").fadeOut();
                        alertify.success("CAMBIOS REALIZADOS");
                    });
                
            },
            function(){

            });
    }
    else
    {
        alertify
          .alert("Los cursos coinciden", function(){
            
          });
    }
});

$("#btn-actualizar-tabla").click(function(){
    buscar();
    correspondecia($("#select-cursos").val(),$("#cboperiodo").val())
});

$("#btn-cambiar-curso").click(function(){
    cursoinicial=$("#txtcursoinicial").val();
    cursofinal=$("#cbocursofinal").val();

    if(cursoinicial!=cursofinal)
    {
        alertify.confirm("Se pasaran los datos seleccionados del curso "+cursoinicial+" al "+cursofinal+" <br> ¿Desea Continuar?",
            function(){
                $.post("views/Anexos/principal.php",{accion:"modificarCursoTablaHorarios",id:trderecho,codCurso:cursofinal},
                    function(){
                        $('#modal-cambiar-curso').modal('hide');
                        $("#"+trderecho).fadeOut();
                        alertify.success("CAMBIOS REALIZADOS");
                    });
                
            },
            function(){

            });
    }
    else
    {
        alertify
          .alert("Los cursos coinciden", function(){
            
          });
    }
});



$("#agregar-periodo").click(function(){
	var anteperiodo=$("#periodo-clonar").val();
	var neoperiodo=$("#txtperiodo").val();
    var curricula=$("#cbocurricular").val();
    alertify.confirm("Usted va a crear el periodo '"+neoperiodo+"' con los datos del periodo '"+anteperiodo+"' y la curricula del "+curricula+"<br>¿Desea crear Periodo?",
        function(){
            setTimeout("mostrarcargando();",1000);
            $.ajax({
                data:{accion:"nuevoPeriodo",anteperiodo:anteperiodo,neoperiodo:neoperiodo,curricula:curricula},
                url:"views/Anexos/principal.php",
                type: "post",
                success:function(data){
                    setTimeout("mostrarcheck();",5000);
                    setTimeout("mostrarcheck2();",6800);
                    setTimeout("location.reload()",7500);
                }

            });
        },
        function(){

        });
	
	// alert(anteperiodo+"  "+ neoperiodo);
});

// *****************************************************************************************************************************
function mostrarcargando()
{
	$('#carga-agregar').append("<center><img style='height:80px;' src='views/Librerias/img/cargando.gif'/></center>").fadeIn();
}
function mostrarcheck()
{
	$('#carga-agregar').html("<center><img style='height:80px;' src='views/Librerias/img/exito.gif'/></center>").fadeIn();
}
function mostrarcheck2()
{
	$('#carga-agregar').html("<center><img style='height:80px;' src='views/Librerias/img/exito.jpg'/></center>");
}
function buscar() {

    $("#tabla-carga").removeClass("table-responsive border rounded");
    $("#tabla-carga").html("");
    $("#tabla-carga").html('<center><img style="height:80px;" src="views/Librerias/img/cargando.gif"/></center>').fadeIn();
    ciclo = $("#cboperiodo option:selected").text();
    curso = $("#select-cursos").val();

    $.get("views/Anexos/principal.php", {
            accion: "MostrarHorariosTabla",
            curso: curso,
            ciclo: ciclo,
            estado: 1
        },
        function(data) {
            datosJSON = JSON.parse(data);
            setTimeout("$('#tabla-carga').css({'display':'none'});$('#tabla-carga').html('');", 400);
            setTimeout("$('#tabla-carga').fadeIn(CrearTablaPrincipal(datosJSON,cboaulas,cbodocentes));", 400);
            // $("#tabla").html(data).fadeIn();
        });
}

function correspondecia(curso,vercurricular){

    $.get("views/Anexos/principal.php",{accion:"correspondencia",codCurso:curso,verCurricular:vercurricular},
        function(correspondencia){
            correspondencia=JSON.parse(correspondencia);
            numcorrespondencia=Object.keys(correspondencia).length;
            // alert(numcorrespondencia);
            if(numcorrespondencia!=0)
            {
                for(t=3;t<=6;t++)
                {   
                    if(correspondencia[0]['m'+t+'Ciclo']!="")
                    {
                        m[t]="C"+correspondencia[0]['m'+t+'Ciclo'];
                        cCorrespondencia=correspondencia[0]['m'+t+'Ciclo']
                        switch(t)
                        {
                          case 3: if(cCorrespondencia=="1"){
                                    g[t]="1-2";
                                  }
                                  else{
                                    g[t]="1";
                                  }
                          ; 
                          break;

                          case 4: if(cCorrespondencia=="1"){
                                    g[t]="3-4";
                                  }
                                  else{
                                    g[t]="2";
                                  }
                          break;

                          case 5: if(cCorrespondencia=="1"){
                                    g[t]="5";
                                  }
                                  else{
                                    g[t]="3";
                                  }
                          break;

                          case 6: if(cCorrespondencia=="1"){
                                    g[t]="6-7";
                                  }
                                  else{
                                    g[t]="4";
                                  }
                          break;
                        }
                    }
                    else
                    {
                        m[t]="x";
                        g[t]="-";
                    }
                }
                $("#m3,#m4,#m5,#m6").addClass("hijo-correspondencia");
                $("#m3").html("M3(<text class='text-ciclo'>"+m[3]+"</text>)(<text class='text-grupo'>"+g[3]+"</text>) ");
                $("#m4").html("M4(<text class='text-ciclo'>"+m[4]+"</text>)(<text class='text-grupo'>"+g[4]+"</text>) ");
                $("#m5").html("M5(<text class='text-ciclo'>"+m[5]+"</text>)(<text class='text-grupo'>"+g[5]+"</text>) ");
                $("#m6").html("M6(<text class='text-ciclo'>"+m[6]+"</text>)(<text class='text-grupo'>"+g[6]+"</text>)");
                $("#text-correspondencia").html("");
            }
            else{

                $("#m3,#m4,#m5,#m6").html("");
                $("#m3,#m4,#m5,#m6").removeClass("hijo-correspondencia");
                $("#text-correspondencia").html("El Curso no figura en la Curricula");
            }
        });
}

function editar(indice) {

    $("#txtorden" + indice).prop("disabled", false);
    $("#txtorden" + indice).addClass('form-control-n');
    $("#txtorden" + indice).removeClass('i');
    //*****************************
    $("#txtdia" + indice).prop("disabled", false);
    // $("#txtdia"+indice).focus();
    $("#txtdia" + indice).addClass('form-control-n');
    $("#txtdia" + indice).removeClass('i');

    //****************************
    $("#txthora" + indice).prop("disabled", false);
    $("#txthora" + indice).addClass('form-control-n');
    $("#txthora" + indice).removeClass('i');

    //****************************
    $("#txtseccion" + indice).prop("disabled", false);
    $("#txtseccion" + indice).addClass('form-control-n');
    $("#txtseccion" + indice).removeClass('i');
    //****************************
    $("#txttp" + indice).prop("disabled", false);
    $("#txttp" + indice).addClass('form-control-n');
    $("#txttp" + indice).removeClass('i');
    //****************************
    $("#select-aulas" + indice).prop("disabled", false);
    $("#select-aulas2" + indice).prop("disabled", false);
    //****************************
    $("#select-docentes" + indice).prop("disabled", false);
    //***************************
    for (i = 1; i <= 10; i++) {
        $("#txtc" + i + indice).prop("disabled", false);
        $("#txtc" + i + indice).addClass('form-control-n');
        $("#txtc" + i + indice).removeClass('i');
    }
}

function salir(indice) {

    actualizar(indice);
    $("#txtorden" + indice).prop("disabled", true);
    $("#txtorden" + indice).addClass('i');
    $("#txtorden" + indice).removeClass('form-control-n');

    $("#txtdia" + indice).prop("disabled", true);
    $("#txtdia" + indice).addClass('i');
    $("#txtdia" + indice).removeClass('form-control-n');

    //*******************************
    $("#txthora" + indice).prop("disabled", true);
    $("#txthora" + indice).addClass('i');
    $("#txthora" + indice).removeClass('form-control-n');
    //*******************************
    $("#txtseccion" + indice).prop("disabled", true);
    $("#txtseccion" + indice).addClass('i');
    $("#txtseccion" + indice).removeClass('form-control-n');
    //*******************************
    $("#txttp" + indice).prop("disabled", true);
    $("#txttp" + indice).addClass('i');
    $("#txttp" + indice).removeClass('form-control-n');
    //*******************************
    $("#select-aulas" + indice).prop("disabled", true);
    $("#select-aulas2" + indice).prop("disabled", true);
    // //*******************************
    $("#select-docentes" + indice).prop("disabled", true);
    //*******************************
    for (i = 1; i <= 10; i++) {
        $("#txtc" + i + indice).prop("disabled", true);
        $("#txtc" + i + indice).addClass('i');
        $("#txtc" + i + indice).removeClass('form-control-n');
    }
}

function guardar() {

    var datos = new FormData();
    datos.append("txtorden", $("#txtorden").val());
    datos.append("txtdia", $("#txtdia").val());
    datos.append("txthora", $("#txthora").val());
    datos.append("txtcurso", $("#select-cursos").val());
    datos.append("txtseccion", $("#txtseccion").val());
    datos.append("txttp", $("#txttp").val());
    datos.append("cboaula", $("#select-aulas").val());
    datos.append("cboaula2", $("#select-aulas2").val());
    datos.append("cbodocente", $("#select-docentes").val());
    datos.append("txtc1", $("#txtc1").val());
    datos.append("txtc2", $("#txtc2").val());
    datos.append("txtc3", $("#txtc3").val());
    datos.append("txtc4", $("#txtc4").val());
    datos.append("txtc5", $("#txtc5").val());
    datos.append("txtc6", $("#txtc6").val());
    datos.append("txtc7", $("#txtc7").val());
    datos.append("txtc8", $("#txtc8").val());
    datos.append("txtc9", $("#txtc9").val());
    datos.append("txtc10", $("#txtc10").val());
    datos.append("cboperiodo", $("#cboperiodo option:selected").text());
    datos.append("accion","registrar");

    $.ajax({

        type: "POST",
        data: datos,
        url: "views/Anexos/principal.php",
        contentType: false,
        processData: false,
        success: function(resultado) {
            alertify.success("Datos Registrados");
        }

    });
}

function actualizar(indice) {

    var datos = new FormData();
    datos.append("txtorden", $("#txtorden" + indice).val());
    datos.append("txtdia", $("#txtdia" + indice).val());
    datos.append("txthora", $("#txthora" + indice).val());
    datos.append("txtcurso", $("#select-cursos").val());
    datos.append("txtseccion", $("#txtseccion" + indice).val());
    datos.append("txttp", $("#txttp" + indice).val());
    datos.append("cboaula", $("#select-aulas" + indice).val());
    datos.append("cboaula2", $("#select-aulas2" + indice).val());
    datos.append("cbodocente", $("#select-docentes" + indice).val());
    datos.append("txtc1", $("#txtc1" + indice).val());
    datos.append("txtc2", $("#txtc2" + indice).val());
    datos.append("txtc3", $("#txtc3" + indice).val());
    datos.append("txtc4", $("#txtc4" + indice).val());
    datos.append("txtc5", $("#txtc5" + indice).val());
    datos.append("txtc6", $("#txtc6" + indice).val());
    datos.append("txtc7", $("#txtc7" + indice).val());
    datos.append("txtc8", $("#txtc8" + indice).val());
    datos.append("txtc9", $("#txtc9" + indice).val());
    datos.append("txtc10", $("#txtc10" + indice).val());
    datos.append("id", indice);
    datos.append("accion","actualizar");

    $.ajax({

        type: "POST",
        data: datos,
        url: "views/Anexos/principal.php",
        contentType: false,
        processData: false,
        success: function(resultado) {
            // console.log($("#select-docentes"+indice).val());
        }
    });
}

function duplicar(indice) {

    var datos = new FormData();
    datos.append("txtorden", $("#txtorden" + indice).val());
    datos.append("txtdia", $("#txtdia" + indice).val());
    datos.append("txthora", $("#txthora" + indice).val());
    datos.append("txtcurso", $("#select-cursos").val());
    datos.append("txtseccion", $("#txtseccion" + indice).val());
    datos.append("txttp", $("#txttp" + indice).val());
    datos.append("cboaula", $("#select-aulas" + indice).val());
    datos.append("cboaula2", $("#select-aulas2" + indice).val());
    datos.append("cbodocente", $("#select-docentes" + indice).val());
    datos.append("txtc1", $("#txtc1" + indice).val());
    datos.append("txtc2", $("#txtc2" + indice).val());
    datos.append("txtc3", $("#txtc3" + indice).val());
    datos.append("txtc4", $("#txtc4" + indice).val());
    datos.append("txtc5", $("#txtc5" + indice).val());
    datos.append("txtc6", $("#txtc6" + indice).val());
    datos.append("txtc7", $("#txtc7" + indice).val());
    datos.append("txtc8", $("#txtc8" + indice).val());
    datos.append("txtc9", $("#txtc9" + indice).val());
    datos.append("txtc10", $("#txtc10" + indice).val());
    datos.append("cboperiodo", $("#cboperiodo option:selected").text());
    datos.append("accion","registrar");

    $.ajax({

        type: "POST",
        data: datos,
        url: "views/Anexos/principal.php",
        contentType: false,
        processData: false,
        success: function(resultado) {
            // console.log($("#select-docentes"+indice).val());
        }
    });

}