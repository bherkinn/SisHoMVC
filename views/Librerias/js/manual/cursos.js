
var camposCursos=new Array();
var contador=0;
var canhoras=0;


function llenarTablaCursos(jsondatos){
	var cantidad=Object.keys(jsondatos).length;

	if(camposCursos[0])
	{
		limpiarCajas(camposCursos);
	}

	if(cantidad>=1)
	{

	if(jsondatos[0]["taburete"]=="0")
	{
		var taburete="NO";
	}
	else
	{
		var taburete="SI";
	}

	
	$(".td-periodo").html(jsondatos[0]["perAcademico"]);
	$("#nomcurso").html(jsondatos[0]["codCurso"]+" - "+jsondatos[0]["nomCurso"]);
	$("#caracteristica").html("Capacidad "+jsondatos[0]['capacidad']+" sillas <br> Con Pizarra "+jsondatos[0]["pizarra"]+" y "+taburete+" tiene taburete");
	console.log(jsondatos);
	console.log(jsondatos[0]['idHorarios']);

	var cantidad=Object.keys(jsondatos).length;
	var dia;
	
	for(i=0;i<cantidad;i++)
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

		console.log("el dia es "+dia);
		

		console.log(hinicio+""+hfinal);

		while(hinicio<hfinal)
		{	
			
			var celda = $("#c"+hinicio+dia).html();
			if(celda=="")
			{
				$("#c"+hinicio+""+dia).append(jsondatos[i]['secCurso']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#c"+hinicio+""+dia).addClass("pintado-true");
				canhoras++;
			}
			else
			{
				$("#c"+hinicio+""+dia).removeClass("pintado-true");
				$("#c"+hinicio+""+dia).append(jsondatos[i]['secCurso']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#c"+hinicio+""+dia).addClass("pintado-false");
				canhoras++;
			}

			camposCursos[contador]="#c"+hinicio+""+dia;
			hinicio++;
			contador++;
		}
	}
	contador=0;
	canhoras=0;
	}

}

function limpiarCajas(camposllenos){

	$("#nomcurso").html("");
	while(contador<camposllenos.length)
	{
		$(camposllenos[contador]).removeClass("pintado-true");
		$(camposllenos[contador]).html("");
		$(camposllenos[contador]).removeClass("pintado-false");
		contador++;
	}

	contador=0;

}