
var camposAulas=new Array();
var contador=0;
var canhoras=0;


function llenarTablaAulas(jsondatos){

	if(camposAulas[0])
	{
		limpiarCajas(camposAulas);
	}
	var cantidad=Object.keys(jsondatos).length;
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

	$("#nomaula").html("AULA: "+jsondatos[0]["codAula"]);
	$("#caracteristica").html("Capacidad "+jsondatos[0]['capacidad']+" sillas <br> Con Pizarra "+jsondatos[0]["pizarra"]+" y "+taburete+" tiene taburete");
	$(".td-periodo").html(jsondatos[0]["perAcademico"]);
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
			
			var celda = $("#a"+hinicio+dia).html();
			if(celda=="")
			{
				$("#a"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#a"+hinicio+""+dia).addClass("pintado-true");
				canhoras++;
			}
			else
			{
				$("#a"+hinicio+""+dia).removeClass("pintado-true");
				$("#a"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#a"+hinicio+""+dia).addClass("pintado-false");
				canhoras++;
			}

			camposAulas[contador]="#a"+hinicio+""+dia;
			hinicio++;
			contador++;
		}
	}
	contador=0;
	canhoras=0;
	}
}


function limpiarCajas(camposllenos){

	$("#nomaula").html("");
	$("#caracteristica").html("");
	while(contador<camposllenos.length)
	{
		$(camposllenos[contador]).removeClass("pintado-true");
		$(camposllenos[contador]).html("");
		$(camposllenos[contador]).removeClass("pintado-false");
		contador++;
	}

	contador=0;

}