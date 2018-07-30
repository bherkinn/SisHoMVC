
var camposDocentes=new Array();
var contador=0;
var canhoras=0;


function llenarTablaDocente(jsondatos){

	if(camposDocentes[0])
	{
		limpiarCajas(camposDocentes);
	}
	var cantidad=Object.keys(jsondatos).length;

	if(cantidad>=1)
	{
		$("#nomdocente").html(jsondatos[0]["apePaterno"]+" "+jsondatos[0]["apeMaterno"]+", "+jsondatos[0]["nombres"]+" / "+jsondatos[0]["codDocente"]+"<br>"+jsondatos[0]["celular"]+" / "+jsondatos[0]["telefono"]);
	console.log(jsondatos);
	console.log(jsondatos[0]['idHorarios']);
		$(".td-periodo").html(jsondatos[0]["perAcademico"]);

	
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
			
			var celda = $("#d"+hinicio+dia).html();
			if(celda=="")
			{
				$("#d"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"/"+jsondatos[i]['codAula']+"<br>");
				$("#d"+hinicio+""+dia).addClass("pintado-true");
				canhoras++;
			}
			else
			{
				$("#d"+hinicio+""+dia).removeClass("pintado-true");
				$("#d"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"/"+jsondatos[i]['codAula']+"<br>");
				$("#d"+hinicio+""+dia).addClass("pintado-false");
				canhoras++;
			}

			camposDocentes[contador]="#d"+hinicio+""+dia;
			hinicio++;
			contador++;
			$("#horas").html(canhoras);
		}
	}
	contador=0;
	canhoras=0;
	}

	

}


function limpiarCajas(camposllenos){

	$("#nomdocente").html("");
	$("#horas").html("");
	while(contador<camposllenos.length)
	{
		$(camposllenos[contador]).removeClass("pintado-true");
		$(camposllenos[contador]).html("");
		$(camposllenos[contador]).removeClass("pintado-false");
		contador++;
	}

	contador=0;

}