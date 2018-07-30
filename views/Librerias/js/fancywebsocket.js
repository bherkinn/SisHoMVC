var FancyWebSocket = function(url)
{
	var callbacks = {};
	var ws_url = url;
	var conn;
	
	this.bind = function(event_name, callback)
	{
		callbacks[event_name] = callbacks[event_name] || [];
		callbacks[event_name].push(callback);
		return this;
	};
	
	this.send = function(event_name, event_data)
	{
		this.conn.send( event_data );
		return this;
	};
	
	this.connect = function() 
	{
		if ( typeof(MozWebSocket) == 'function' )
		this.conn = new MozWebSocket(url);
		else
		this.conn = new WebSocket(url);
		
		this.conn.onmessage = function(evt)
		{
			dispatch('fila', evt.data);
		};
		
		this.conn.onclose = function(){dispatch('close',null)}
		this.conn.onopen = function(){dispatch('open',null)}
	};
	
	this.disconnect = function()
	{
		this.conn.close();
	};
	
	var dispatch = function(event_name, fila)
	 {
				if(fila)
				{
					$("#aviso").removeClass("rotar");
					$("#aviso").addClass("deshabilitar");


					$.get("views/Anexos/socket.php",{accion:"horarioDocente",idfila:fila},
					function(data){
					var hdocentes=JSON.parse(data);
					llenarTablaDocente(hdocentes);

						$.get("views/Anexos/socket.php",{accion:"horarioAula",idfila:fila},
						function(data){
						var haulas=JSON.parse(data);
						llenarTablaAulas(haulas);

							$.get("views/Anexos/socket.php",{accion:"horarioCurso",idfila:fila},
							function(data){
							var hcursos=JSON.parse(data);
							llenarTablaCursos(hcursos);
							
								$.get("views/Anexos/socket.php",{accion:"horarioFila",idfila:fila},
								function(data){
								var hciclos=JSON.parse(data);

								distribuirDatos(hciclos);

								});	

							});	
						});	

					});	
				}
	}
};

var Server;
function send( text ) 
{
    Server.send( 'fila', text );
}
$(document).ready(function() 
{
	Server = new FancyWebSocket('ws://172.20.5.110:12345');
    Server.bind('open', function()
	{
    });
    Server.bind('close', function( data ) 
	{
    });
    Server.bind('fila', function( payload ) 
	{
    });
    Server.connect();
});

var datos="";
var camposDocentes=new Array();
var camposAulas=new Array();
var camposCursos=new Array();
var camposModulo1=new Array();
var camposModulo2=new Array();
var camposModulo3=new Array();
/*---------------------------------*/
var cciclo=0;
/*---------------------------------*/
var contador=0;
var contadormodulo=0;
var canhoras=0;
var pasar=1;


function distribuirDatos(datos){
	// var ciclos=new Array();
	// var grupos=new Array();
	cciclo=0;
	ciclos=[];
	grupos=[];
	numciclo=[];

	for(i=1;i<=10;i++)
	{	
		if(datos[0]["c"+i]!="")
		{	
			longcadena=datos[0]["c"+i].length;

			for(u=0;u<longcadena;u++)
			{	
				if(cciclo<3)
				{
					ciclos[cciclo]="c"+i;
					grupos[cciclo]=datos[0]["c"+i].substr(u,1);
					idmodulo="m"+(cciclo+1);
					numerociclo=i;
					numciclo[cciclo]=i;
					cciclo++;
				}
			}

		}
	}
	if(ciclos[0])
	{
		modulosllenos(1);
		$.get("views/Anexos/socket.php",{accion:"horarioModulo",ciclo:ciclos[0],grupo:grupos[0],periodo:datos[0]['perAcademico']},
		function(data){
			hmodulos1=JSON.parse(data);
			llenarTablaModulo1(hmodulos1,numciclo[0],grupos[0]);
		});
	}
	else
	{
		limpiarCajas(camposModulo1);
		modulosvacios(1);
	}	

	if(ciclos[1])
	{	
		modulosllenos(2);
		$.get("views/Anexos/socket.php",{accion:"horarioModulo",ciclo:ciclos[1],grupo:grupos[1],periodo:datos[0]['perAcademico']},
		function(data){
			hmodulos2=JSON.parse(data);
			llenarTablaModulo2(hmodulos2,numciclo[1],grupos[1]);
		});
	}
	else
	{
		limpiarCajas(camposModulo2);
		modulosvacios(2);
	}

	if(ciclos[2])
	{	
		modulosllenos(3);
		$.get("views/Anexos/socket.php",{accion:"horarioModulo",ciclo:ciclos[2],grupo:grupos[2],periodo:datos[0]['perAcademico']},
		function(data){
			hmodulos3=JSON.parse(data);
			llenarTablaModulo3(hmodulos3,numciclo[2],grupos[2]);
		});
	}
	else
	{
		limpiarCajas(camposModulo3);
		modulosvacios(3);
	}
	
}

function modulosllenos(llenos){
		$("#m"+llenos+"vacio").removeClass("rotar");
		$("#m"+llenos+"vacio").addClass("deshabilitar");
}

function modulosvacios(vacios){
		$("#m"+vacios+"vacio").removeClass("deshabilitar");
		$("#m"+vacios+"vacio").addClass("rotar");			
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

var espacio="_";

function llenarTablaModulo1(jsondatos,numerociclo,grupo)
{
	var cantidad=Object.keys(jsondatos).length;
	var dia;

	if(camposModulo1[0])
	{
		limpiarCajas(camposModulo1);
	}
	
	$("#m1datos").html(numerociclo+"° Ciclo");
	$("#m1fecha").html(fecha());
	$("#m1grupo").html(grupo)
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

		while(hinicio<hfinal)
		{	
			
			var celda = $("#m1"+hinicio+dia).html();
			if(celda=="")
			{
				$("#m1"+hinicio+dia).append(jsondatos[i]['codCurso']+espacio+jsondatos[i]['secCurso']+espacio+jsondatos[i]['teopra']+espacio+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m1"+hinicio+dia).addClass("pintado-true");
			}
			else
			{
				$("#m1"+hinicio+dia).removeClass("pintado-true");
				$("#m1"+hinicio+dia).append(jsondatos[i]['codCurso']+espacio+jsondatos[i]['secCurso']+espacio+jsondatos[i]['teopra']+espacio+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m1"+hinicio+dia).addClass("pintado-false");
			}

			camposModulo1[contadormodulo]="#m1"+hinicio+dia;
			hinicio++;
			contadormodulo++;
		}

		camposModulo1[contadormodulo]="#m1"+"datos";
		contadormodulo++;
		camposModulo1[contadormodulo]="#m1"+"grupo";
		contadormodulo++;
		camposModulo1[contadormodulo]="#m1"+"fecha";
		contadormodulo++;
	}
	contadormodulo=0;
}

function llenarTablaModulo2(jsondatos,numerociclo,grupo)
{
	var cantidad=Object.keys(jsondatos).length;
	var dia;

	if(camposModulo2[0])
	{
		limpiarCajas(camposModulo2);
	}
	
	$("#m2datos").html(numerociclo+"° Ciclo");
	$("#m2fecha").html(fecha());
	$("#m2grupo").html(grupo)
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

		while(hinicio<hfinal)
		{	
			
			var celda = $("#m2"+hinicio+dia).html();
			if(celda=="")
			{
				$("#m2"+hinicio+dia).append(jsondatos[i]['codCurso']+"."+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m2"+hinicio+dia).addClass("pintado-true");
			}
			else
			{
				$("#m2"+hinicio+dia).removeClass("pintado-true");
				$("#m2"+hinicio+dia).append(jsondatos[i]['codCurso']+"."+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m2"+hinicio+dia).addClass("pintado-false");
			}

			camposModulo2[contadormodulo]="#m2"+hinicio+dia;
			hinicio++;
			contadormodulo++;
		}

		camposModulo2[contadormodulo]="#m2"+"datos";
		contadormodulo++;
		camposModulo2[contadormodulo]="#m2"+"grupo";
		contadormodulo++;
		camposModulo2[contadormodulo]="#m2"+"fecha";
		contadormodulo++;

	}
	contadormodulo=0;
}

function llenarTablaModulo3(jsondatos,numerociclo,grupo)
{
	var cantidad=Object.keys(jsondatos).length;
	var dia;

	if(camposModulo3[0])
	{
		limpiarCajas(camposModulo3);
	}
	
	$("#m3datos").html(numerociclo+"° Ciclo");
	$("#m3fecha").html(fecha());
	$("#m3grupo").html(grupo)
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

		while(hinicio<hfinal)
		{	
			
			var celda = $("#m3"+hinicio+dia).html();
			if(celda=="")
			{
				$("#m3"+hinicio+dia).append(jsondatos[i]['codCurso']+"."+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m3"+hinicio+dia).addClass("pintado-true");
			}
			else
			{
				$("#m3"+hinicio+dia).removeClass("pintado-true");
				$("#m3"+hinicio+dia).append(jsondatos[i]['codCurso']+"."+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+" : "+jsondatos[i]['codAula']+"<br>"+jsondatos[i]['apePaterno']+", "+jsondatos[i]['nombres']+"<br>");
				$("#m3"+hinicio+dia).addClass("pintado-false");
			}

			camposModulo3[contadormodulo]="#m3"+hinicio+dia;
			hinicio++;
			contadormodulo++;
		}

		camposModulo3[contadormodulo]="#m3"+"datos";
		contadormodulo++;
		camposModulo3[contadormodulo]="#m3"+"grupo";
		contadormodulo++;
		camposModulo3[contadormodulo]="#m3"+"fecha";
		contadormodulo++;
	}

	contadormodulo=0;

}

function llenarTablaCursos(jsondatos){

	if(camposCursos[0])
	{
		limpiarCajas(camposCursos);
	}

	if(jsondatos[0]["taburete"]=="0")
	{
		var taburete="NO";
	}
	else
	{
		var taburete="SI";
	}

	$("#nomcurso").html(jsondatos[0]["codCurso"]+" - "+jsondatos[0]["nomCurso"]);
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

function llenarTablaAulas(jsondatos){

	if(camposAulas[0])
	{
		limpiarCajas(camposAulas);
	}

	if(jsondatos[0]["taburete"]=="0")
	{
		var taburete="NO";
	}
	else
	{
		var taburete="SI";
	}

	$("#nomaula").html("AULA: "+jsondatos[0]["codAula"]);
	$("#caracteristica").html("Capacidad "+jsondatos[0]["capacidad"]+" sillas <br> Con Pizarra "+jsondatos[0]["pizarra"]+" y "+taburete+" tiene taburete");

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


function llenarTablaDocente(jsondatos){


	if(camposDocentes[0])
	{
		limpiarCajas(camposDocentes);
	}


	// $("#nomdocente").html(jsondatos[0]["apePaterno"]+" "+jsondatos[0]["apeMaterno"]+", "+jsondatos[0]["nombres"]+" / "+jsondatos[0]["codDocente"]);
	$("#nomdocente").html(jsondatos[0]["apePaterno"]+" "+jsondatos[0]["apeMaterno"]+", "+jsondatos[0]["nombres"]+" / "+jsondatos[0]["codDocente"]+"<br>"+jsondatos[0]["celular"]+" / "+jsondatos[0]["telefono"]);
	var cantidad=Object.keys(jsondatos).length;
	var dia;
	$(".td-periodo").html(jsondatos[0]['perAcademico']);
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

		// console.log("el dia es "+dia);
		

		// console.log(hinicio+""+hfinal);

		while(hinicio<hfinal)
		{	
			
			var celda = $("#d"+hinicio+dia).html();
			if(celda=="")
			{
				$("#d"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+"."+jsondatos[i]['codAula']+"<br>");
				$("#d"+hinicio+""+dia).addClass("pintado-true");
				canhoras++;
			}
			else
			{
				$("#d"+hinicio+""+dia).removeClass("pintado-true");
				$("#d"+hinicio+""+dia).append(jsondatos[i]['codCurso']+jsondatos[i]['secCurso']+"."+jsondatos[i]['teopra']+"."+jsondatos[i]['codAula']+"<br>");
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



function actualiza_mensaje(message)
{	
	//console.log(message);
	// var JSONdata    = JSON.parse(message); //parseo la informacion
	// 			var tipo = JSONdata[0].tipo;
	// 			var mensaje = JSONdata[0].mensaje;
	// 			var fecha = JSONdata[0].fecha;
				
	// 			var contenidoDiv  = $("#"+tipo).html();
	// 			var mensajehtml   = fecha+' : '+mensaje;
				
		//		$("#"+tipo).html(contenidoDiv+'0000111'+mensajehtml);
				//$("#temporal").html(message);	
}
function actualiza_solicitud()
{
	alert("tipo de envio 2");
}
