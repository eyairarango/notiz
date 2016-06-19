app.controller('calculo', function($scope,$timeout){		
  	
  	$scope.products = ["1"];

  	$scope.notas= {};

  	$scope.error={'estado':false,'mensaje':''};
 
  	$scope.result={"estado":"", "valor":"","porcentaje_final": "","imagen":"","mensaje1":"","mensaje2":"","mensaje3":""};

    $scope.save = function(notas) {
    	var size = Object.size($scope.notas.nota);
    	var sizep = Object.size($scope.notas.porcentaje);
    	if(size==$scope.products.length){    		
    		if(sizep==$scope.products.length){    			
	    		var porcentaje = CalculoPorcentaje();
	    		if(porcentaje>=0  && porcentaje<=100){
	    			$scope.result=$scope.set_calcular();
	    			console.log($scope.result);
	    			$('#modal').openModal();	    			
	    		}else{
	    			$scope.error={'estado':true,'mensaje':'El porcentaje debe de estar entre 0% y 100%'};
	    			$('#active').trigger('click'); 
	    		}
	    		
    		}else{
    			$scope.error={'estado':true,'mensaje':'Debe ingresar los porcentajes'};
    			$('#active').trigger('click'); 
    		}    		
    	}else{
    		$scope.error={'estado':true,'mensaje':'Debe ingresar las notas'};  
    		$('#active').trigger('click');  
    	}    		
      	
    };

    $scope.reset = function(form) {
      $scope.user = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };
 	
    $scope.reset();

    $scope.addItem = function () { 
    	if (typeof $scope.notas.nota!=="undefined") {
    		var porcentaje=CalculoPorcentaje();
    		var size = Object.size($scope.notas.nota);
    		var sizep = Object.size($scope.notas.porcentaje);
	    	if(size==$scope.products.length){    		
	    		if(sizep==$scope.products.length){
					if(porcentaje>=0  && porcentaje<100)
						$scope.products.push($scope.products.length+1); 
					else{
	        			$scope.error={'estado':true,'mensaje':'El porcentaje total debe de estar entre 0% y 100%'};     			 
	        			$('#active').trigger('click'); 
					}
	    		}else{
	    			$scope.error={'estado':true,'mensaje':'Debe ingresar las notas'};      			
	    			$('#active').trigger('click'); 
	    		}
	    	}else{
	    		$scope.error={'estado':true,'mensaje':'Debe ingresar los porcentajes'};  
	    		$('#active').trigger('click'); 
	    	}
		}else{
			$scope.error={'estado':true,'mensaje':'Debe ingresar tanto la nota como el porcentaje para empezar'}; 
			$('#active').trigger('click'); 
		}
			

    }

    $scope.removeItem = function (x) {
        $scope.errortext = "";
       	$scope.products.splice(x, 1);  

       	var size = Object.size($scope.notas.nota);

       	if (x < size) {
       	
	        delete $scope.notas.nota[x];
	        delete $scope.notas.porcentaje[x];        

	       	var array=[];
	       	var i=0;
			angular.forEach($scope.notas.nota, function(value, key) {
				  array.push(value);
			});        
	        $scope.notas.nota=toObject(array);

	        var array=[];
	        angular.forEach($scope.notas.porcentaje, function(value, key) {
				  array.push(value);
			});
	        $scope.notas.porcentaje=toObject(array);
	        delete array;
	    }
    }

    $scope.notaprom100=function(){
    	var promedio=0;
    	angular.forEach($scope.notas.porcentaje, function(value, key) {
			  promedio=promedio+(parseFloat($scope.notas.nota[key])*(parseFloat($scope.notas.porcentaje[key]*0.01)));			  
		});
		return promedio;
    } 

    function CalculoPorcentaje(){
		var porcentaje=0;
		angular.forEach($scope.notas.porcentaje, function(value, key) {
			  porcentaje=parseInt(porcentaje)+parseInt(value);
		});
		return porcentaje;
	}  

	$scope.set_calcular =function ()
	{
		var notas = [];
		var porcentaje = [];
		var porcentaje_restante = 100-CalculoPorcentaje();

		/*calcular el valor que falta*/
		if(porcentaje_restante < 0){
			 return 'error';
		}
		else if (porcentaje_restante == 0) 
		{
			var valor_notas = 0;
			var estado, mensaje1, mensaje2, mensaje3;
			angular.forEach($scope.notas.porcentaje, function(value, key) {		
				valor_notas +=( parseFloat($scope.notas.nota[key])*(parseFloat($scope.notas.porcentaje[key])/100));
			});
			valor_nota_final = Math.round( valor_notas * 100 ) / 100;
			if ( valor_nota_final >4.4 ) 
			{
				estado = 'e';
				imagen="img/excelente.jpg";
				mensaje1="Por fin";
				mensaje2="La materia quedo en: "
				mensaje3="Eres un genio."
				
			}
			else if ( valor_nota_final > 3.7 && valor_nota_final <= 4.4 )
			{
				estado = 's';
				imagen="img/sobresaliente.jpg"
				mensaje1="Por fin"
				mensaje2="La materia quedo en: "
				mensaje3="Eres bueno."
				
			}
			else if (valor_nota_final > 2.9 && valor_nota_final <= 3.7) 
			{	
				//normal=1
				estado = 'a';
				imagen="img/aceptable.jpg"
				mensaje1="Por fin"
				mensaje2="La materia quedo en: "
				mensaje3="Debes mejorar."
				
			}
			else if (valor_nota_final <= 2.9)
			{
				//mejor=3
				estado = 'i';
				imagen="img/insuficiente.jpg"
				mensaje1="Por fin"
				mensaje2="La materia quedo en: "
				mensaje3="Estas perdido."
			}
			return {"estado":estado, "valor":valor_nota_final,"porcentaje_final": 100, "imagen":imagen,"mensaje1":mensaje1,"mensaje2":mensaje2,"mensaje3":mensaje3};
		}else
		{
			var valor_notas = 0;
			var estado,imagen;


			angular.forEach($scope.notas.porcentaje, function(value, key) {		
				valor_notas += ( parseFloat($scope.notas.nota[key]) * (parseFloat($scope.notas.porcentaje[key]) / 100) );
			});

			valor_nota_final = ( 3 - valor_notas ) / ( porcentaje_restante / 100 );
			valor_nota_final = Math.round( valor_nota_final * 100 ) / 100;

			if ( valor_nota_final > 5 ) 
			{
				/*mal=0*/
				estado = 'i';
				imagen="img/insuficiente.jpg";
				mensaje1="Este semestre esta largo.";
				mensaje2="Debes sacar un ";
				mensaje3="Se puede vivir de esperanza.";
			}
			else if ( valor_nota_final > 3 && valor_nota_final <= 5 )
			{
				//normal=1
				estado = 'a';
				imagen="img/aceptable.jpg";
				mensaje1="Va regular.";
				mensaje2="Debes sacar un ";
				mensaje3="No esta complicado pero falta.";
			}
			else if (valor_nota_final > 0 && valor_nota_final <= 3) 
			{	
				//bien =2
				estado = 's';
				imagen="img/sobresaliente.jpg";
				mensaje1="Eres bueno.";
				mensaje2="Debes sacar un ";
				mensaje3="Hay que seguir trabajando.";
			}
			else if (valor_nota_final <= 0)
			{
				//mejor=3
				estado = 'e';
				imagen="img/excelente.jpg"
				valor_nota_final = null;
				mensaje1="Eres un genio.";
				mensaje2="Debes sacar un ";
				mensaje3="Deberias para trabajar en la NASA.";
			}
			porcentaje_restante = Math.round( porcentaje_restante * 100 ) / 100;
			return {"estado":estado, "valor":valor_nota_final,"porcentaje_final": porcentaje_restante, "imagen":imagen,"mensaje1":mensaje1,"mensaje2":mensaje2,"mensaje3":mensaje3};
		}
	}
});

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) 
        	size++;
    }
    return size;
}



/*

$scope.validar=function(){
		var size = Object.size($scope.notas.nota);
    	var sizep = Object.size($scope.notas.porcentaje);
    	var val=false;
    	if(size==$scope.products.length){    		
    		if(sizep==$scope.products.length){    			
	    		var porcentaje = CalculoPorcentaje();
	    		if(porcentaje>=0  && porcentaje<=100){
	    			val=true;	    			
	    		}else
	    			$scope.error={'estado':true,'mensaje':'El porcentaje debe de estar entre 0% y 100%'};  
	    		
    		}else
    			$scope.error={'estado':true,'mensaje':'Debe ingresar los porcentajes'};    			   		
    	}else
    		$scope.error={'estado':true,'mensaje':'Debe ingresar las notas'};  
    		
		return val;    	 
	}

*/