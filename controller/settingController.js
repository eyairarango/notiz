/*inicializacion de la aplicacion*/
var app = angular.module('aplication',["ngRoute"]);

/*Configuracón de las rutas*/
app.config(function($routeProvider,$locationProvider){
        $routeProvider
            .when("/notas", {
                controller: "appCtrl",
                templateUrl: "view/home.html"
            })
            .when("/nosotros", {
                controller: "appCtrl",
                templateUrl: "view/nosotros.html"
            }).when("/contactenos", {
                controller: "appCtrl",
                templateUrl: "view/contactenos.html"
            }).otherwise({
        		redirectTo: '/'
    });
    }).controller('appCtrl', function($scope,$timeout){//inicialización de controlador de la aplicacion general
		$scope.val=false;  //variable `para visualizar el carousel

		/*control de carousel */
		if(estado()=="")
			$scope.val=true;
		else
			$scope.val=false;

	/*funcion para el control de carousel*/
	$scope.valor=function (v){
		$scope.val=v;
	}

	//llamada a la funcion screen para controllar los botones de navegacion de carousel
	$scope.screen=screen($(window).width());	

	/*funcion  para para cambiar el menu de ser horizontal, ocultandolo y mostrando el sideNav*/
	$scope.sideNav=function(val){			
		$scope.config.header.sideNav=val;
		$timeout(function() {
			$scope.$apply();//reenvia $scope para obtenerlo en tiempo real y cambiar el menu de horizontal a vertical o viseversa
		});
	}	
    /*Configuracion, este json contiene la configuracion de la aplicacion*/    
	$scope.config={
		"header": {
			"menu" : {
				"title":{
					"namet":"Notiz",
					"urlt": "#/"
				},
				"item1":{
					"name1":"Calcular Nota",
					"url1": "#/notas"
				},
				"item2":{
					"named":"Conocenos"
				},
				"drop":[
					{
						"name":"Nosotros",
						"url": "#/nosotros"
					},
					{
						"name":"Contacto",
						"url": "#/contactenos"
					}
				]
			},			
			"sideNav": true
		},
		"body": {
		  	"banner": "src",
		  	"carousel": [
		  		{
		  			"img": "img/bag.jpg",
		  			"text1": "Calcula tu nota.",
		  			"text2": ""
		  		},
			  	{
			  		"img": "img/exam.jpg",
		  			"text1": "Quieres saber si ganas la materia?",
		  			"text2": "Calcula tu nota!"
		  		},
			  	{
			  		"img": "img/lapiz.jpg",
		  			"text1": "No somos intenosos, pero...",
		  			"text2": "Calcula tu nota."
		  		},
			  	{
			  		"img": "img/pencil.jpg",
		  			"text1": "Este es el tiempo del fin, por eso debes",
		  			"text2": "Calcular tu nota."
		  		}
	  		],	  		
	  		"form": {
	  			"formContacto": {
	  				"name": {	
  						"id":"name",  
  						"name":"name",
  						"type":"text"  					
	  				},
	  				"correo": {	
  						"id":"email",  
  						"name":"email",
  						"type":"email"  					
	  				},

	  				"asunto": {	
  						"id":"asunto",  
  						"name":"asunto",
  						"type":"text"  					
	  				},
	  				"mensaje": {	
  						"id":"mensaje",  
  						"name":"mensaje",
  						"type":"text"	  					
	  				},
	  				"boton": {	
  						"id":"enviar",  
  						"name":"btn-enviar",
  						"type":"submit"	  					
	  				}
	  			}
	  		},	 
	  		"imgerror": "img/error.jpg"	
	  	},	  	
	  	"footer": {
  	        "links": [
  	        	{
  	        		"link": "https://plus.google.com/u/0/110517864076373731265",
  	        		"img" : "img/gmail.png",
  	        		"text": "Google+"
				},
  	        	{
  	        		"link": "https://www.facebook.com/YairPumaSigiloso?fref=ts",
  	        		"img" : "img/facebook.png",
  	        		"text": "Facebook"
  	        	},
  	        	{	
  	        		"link": "https://twitter.com/Earango9",
  	        		"img" : "img/twitter.png",
  	        		"text": "Twitter"
  	        	}
  	        ],
  	        "autor": "Yair Arango",
  	        "email": "eyairarango@gmail.com"


  	    }
  	}; 	

  	$('body').on('click', '#sidenav-overlay', function() {
    	$scope.sideNav(true);
  	});

  	$('body').on('click', '.drag-target', function() {
    	$scope.sideNav(true);
  	});
});

/*
//Aquí creamos la directiva
app.directive('opcion', function() {
  return { 
  };
});*/


/*
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/notas", {
                controller: "appCtrl",
                templateUrl: "webprueba/view/home.html"
            })
            .when("/opciones", {
                controller: "appCtrl",
                templateUrl: "opciones.html"
            }).otherwise({
	        	redirectTo: '/webprueba'
	    });
        $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
    }]).controller('appCtrl', function($scope){
		$scope.val=false;

		if(estado()=="")
			$scope.val=true;
		else
			$scope.val=false;


	$scope.valor=function (v){
		$scope.val=v;
	}

	$scope.screen=screen($(window).width());
	
  $scope.cliente = {
    nombre: 'Jhon',
    direccion: 'Av. Jose pardo 481'

		};

	$scope.config={
		header: {
			menu : {
				option1:"Menu 1", 
				option2:"Menu Externo", 
				option3:"Menu Cool"
			},
			sideDeploy: true,
		},
		body: {
		  	banner: "src",
		  	carousel: [
		  		{
		  			img: "webprueba/img/bag.jpg",
		  			text1: "Calcula tu nota.",
		  			text2: "",
		  		},
			  	{
			  		img: "webprueba/img/exam.jpg",
		  			text1: "Quieres saber si ganas la materia?",
		  			text2: "Calcula tu nota!",
		  		},
			  	{
			  		img: "webprueba/img/lapiz.jpg",
		  			text1: "No somos intenosos, pero...",
		  			text2: "Calcula tu nota.",
		  		},
			  	{
			  		img: "webprueba/img/pencil.jpg",
		  			text1: "Este es el tiempo del fin, por eso debes",
		  			text2: "Calcular tu nota.",
		  		},
	  		],
	  		form: {
	  			deploy: false,
	  			extructure: {
	  				name: {
	  					type:"text", 
	  					placeholder: "text",
	  					attr: {
	  						id:"name", 
	  						class:"name", 
	  						etc:"etc"
	  					}
	  				},
	  				cell: {
	  					type:"text", 
	  					placeholder: "text", 
	  					attr: {
	  						id:"name", 
	  						class:"name", 
	  						etc:"etc"
	  					}
	  				},
	  				etc: {
	  					etc:"etc"
	  				}
	  			}
	  		}
	  	},
	  	footer: {
  	        links: {
  	        	link: {
  	        		link:"url"
  	        	}
  	        }
  	    }
  	}; 	
});


*/
