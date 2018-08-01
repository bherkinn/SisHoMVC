
$(document).ready(function(){
	// Obtener Periodo
	llenarComboPeriodo();
	

	$("#cbociclo").change(function() {
        $("#cbociclo option:selected").each(function() {
            llenarComboGrupo();
        });
    });

    $("#cboperiodo").change(function() {
        $("#cboperiodo option:selected").each(function() {
            Horario();
        });
    });

    $("#cbogrupo").change(function() {
        $("#cbogrupo option:selected").each(function() {
            Horario();
        });
    });

    $("#btn-actualizar-tabla").click(function(){
			Horario();
	});

});

function llenarComboPeriodo(){
	$.get("views/Anexos/modulos.php",{accion:"periodo"},
		function(data){
			JsonPeriodo=JSON.parse(data);
			CanJsonPeriodo=Object.keys(JsonPeriodo).length;
			for(i=0;i<CanJsonPeriodo;i++){
				$("#cboperiodo").append("<option value='"+JsonPeriodo[i]["verCurricular"]+"''>"+JsonPeriodo[i]["perAcademico"]+"</option>");
			}
			llenarComboGrupo();
		});
}

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


function llenarComboGrupo()
{
	$("#cbogrupo").html("");
	ciclo=$("#cbociclo").val();
	if(ciclo=="1")
	{	
		for(u=1;u<=7;u++)
		{
			$("#cbogrupo").append("<option>"+u+"</option>");
		}
	}
	else
	{
		for(u=1;u<=5;u++)
		{
			$("#cbogrupo").append("<option>"+u+"</option>");
		}
	}
	Horario();
}

function Horario()
{	
	periodo=$("#cboperiodo option:selected").text();
	numciclo=$("#cbociclo").val();
	ciclo="c"+$("#cbociclo").val();
	grupo=$("#cbogrupo").val();

	$.get("views/Anexos/modulos.php",{accion:"horario",periodo:periodo,ciclo:ciclo,grupo:grupo},
		function(data){
			JsonHorario=JSON.parse(data);
			llenarTablaModulo(JsonHorario,numciclo,grupo);
		});
}

var camposModulo=new Array();
var espacio="_";
function llenarTablaModulo(jsondatos,numerociclo,grupo)
{
	var CanJsonHorario=Object.keys(jsondatos).length;
	var dia;
	var contadormodulo=0;

	limpiarCajas(camposModulo);

	
	$("#mdatos").html(numerociclo+"° Ciclo");
	$("#mfecha").html(fecha());
	$("#mgrupo").html(grupo)
	for(i=0;i<CanJsonHorario;i++)
	{
		var hinicio=parseInt(jsondatos[i]['hora'].substr(0,2));
		var hfinal=parseInt(jsondatos[i]['hora'].substr(3,5));
		switch(jsondatos[i]['dia'])
		{
			case "LU":dia=1;
			break;
			case "MA":dia=2;
			break;
			case "MI":dia=3;
			break;
			case "JU":dia=4;
			break;
			case "VI":dia=5;
			break;
			case "SA":dia=6;
			break;
			case "DO":dia=7;
			break;
		}

		while(hinicio<hfinal)
		{	
			
			var celda = $("#m"+hinicio+dia).html();
			if(celda=="")
			{
				$("#m"+hinicio+dia).append(jsondatos[i]['codCurso']+espacio+jsondatos[i]['secCurso']+espacio+jsondatos[i]['teopra']+espacio+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m"+hinicio+dia).addClass("pintado-true");
			}
			else
			{
				$("#m"+hinicio+dia).removeClass("pintado-true");
				$("#m"+hinicio+dia).append(jsondatos[i]['codCurso']+espacio+jsondatos[i]['secCurso']+espacio+jsondatos[i]['teopra']+espacio+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m"+hinicio+dia).addClass("pintado-false");
			}

			camposModulo[contadormodulo]="#m"+hinicio+dia;
			hinicio++;
			contadormodulo++;
		}

		camposModulo[contadormodulo]="#mdatos";
		contadormodulo++;
		camposModulo[contadormodulo]="#mgrupo";
		contadormodulo++;
		camposModulo[contadormodulo]="#mfecha";
		contadormodulo++;
	}
}
contador=0;
function limpiarCajas(camposllenos){

	while(contador<camposllenos.length)
	{
		$(camposllenos[contador]).removeClass("pintado-true");
		$(camposllenos[contador]).html("");
		$(camposllenos[contador]).removeClass("pintado-false");
		contador++;
	}
	contador=0;

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
