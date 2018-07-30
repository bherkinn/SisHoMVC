var habilitar=0; /*PARA EL MENU*/

$("#link1").click(function(e){
	e.preventDefault();
});
$("#link2").click(function(e){
	e.preventDefault();
});

$(document).ready(function(){
	$('.nav li:has(ul)').click(function(){

		if($(this).hasClass('activado')){
			$(this).removeClass('activado');
			$(this).children('ul').slideUp();
		}
		else
		{
			$('.nav li ul').slideUp();
			$('.nav li').removeClass('activado');	
			$(this).addClass('activado');

			$(this).children('ul').slideDown();
		}
	});
});

$("#btn-menu").click(function(){
	if(habilitar==0)
	{
		
		$("#menu").removeClass("menu-ocultar");
		$("#menu").addClass("menu");

		$("#contenedor").removeClass("contenedor-tapar");
		$("#contenedor").addClass("contenedor");
		habilitar=1;
	}
	else
	{	
		

		$("#menu").removeClass("menu");
		$("#menu").addClass("menu-ocultar");

		$("#contenedor").removeClass("contenedor");
		$("#contenedor").addClass("contenedor-tapar");
		habilitar=0;
	}
});