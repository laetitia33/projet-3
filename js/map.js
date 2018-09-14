
//création de la map
var map;
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,// ce niveau de zoom se situe entre la ville et ou les rues
      center: {lat: 45.7610908, lng: 4.8362224},
      

      //changement de style type nuit
         styles: 
 [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
      }

//appel de l'api JCDECAUX

	ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=df04de7ba250f6334cda7d17786080f29a6b9098",
		 function(reponse) {
  			var location = JSON.parse(reponse); 

		//placement des marqueur et personnalisation
		  var markers = location.map(function(donnees){
		    var marker = new google.maps.Marker({
		      position: donnees.position,
		      animation: google.maps.Animation.DROP,
		      veloDispo: donnees.available_bikes,
		      nbPlace: donnees.bike_stands,    
		      icon:"images/green.png",
		      title: donnees.name,
		      address : donnees.address,
		      contrat:donnees.contract_name,
		      status:donnees.status, 
		    });


		  //changement d'etat selon la reservation

		     if(marker.status==="OPEN") {
		        marker.status="Ouvert";
		                  
		      
		           if(marker.veloDispo===0){
		                  marker.veloDispo= "Désolé, il n'en reste plus. Revenez plus tard";
		                  marker.icon="images/orange.png";
		                         
		              }

		      }else{

		            marker.icon = "images/red.png"; 
		            marker.status="Fermé";
		            marker.veloDispo="Cette station est fermée";
		           
		            
		      };
		 

		//action des marqueurs et visualisation des données sur le formulaire apparaissant par la gauche
		    var reserveBouton=document.getElementById("reserve");
		    var indispoBouton=document.getElementById("notreserv");
		    var statusColor= document.getElementById("status");

		    marker.addListener('click', function() {
		      document.getElementById("station").innerHTML = this.title;
		      document.getElementById("address").innerHTML = this.address;
		      document.getElementById("nb-velo").innerHTML = this.veloDispo;
		      document.getElementById("nb-place").innerHTML = this.nbPlace;
		      document.getElementById("status").innerHTML = this.status;
		      document.getElementById("formulaire").style.left = "0";
		      document.getElementById("slideshow").style.display="none";//le slider disparait pour laisser plus de place à la selection
		   
		      //changement du bouton  : soit reserver , soit indisponible.. changement de la couleur du status
		 
		         if(marker.status==="OPEN"|| marker.veloDispo >0)
		          {
		            reserveBouton.style.display="block";
		            indispoBouton.style.display="none";
		            statusColor.style.color="green";
		                 

		         }else {
		            reserveBouton.style.display="none";
		            indispoBouton.style.display="block";
		            statusColor.style.color="#ba0000";
		           } ;
		  



			    });
			    return marker;
			  });



			    

			 //clusters de google. groupement de marqueurs afin de ne pas engorger la carte
			var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

			//animation des marqueurs de la map
			function toggleBounce() {
			  if (marker.getAnimation() !== null) {
			    marker.setAnimation(null);
			  } else {
			    marker.setAnimation(google.maps.Animation.BOUNCE);
			  };
			}


			//fermeture du formulaire
			var fermeForm=document.getElementById("fermeform")
			fermeForm.addEventListener("click",function(e)  {
			  document.getElementById("formulaire").style.left ="-100%";

			  })



});
