

var reservation= {
    
    init: function () {
        
        // .html
        this.boutonAnnuler = document.getElementById("stopReservation");//annuler la reservation à coté du decompte
        this.nomDuClientDansLaReservation = document.querySelector('.nomReservation');//nom de la personne qui reserve
        this.adresseDeLaReservation = document.querySelector('.addressReservation');//adresse de la station
        this.nomDeLaStationDeReservation = document.querySelector('.stationReservation');//nom de la station
        this.blocInformationsDeReservation = document.getElementById('infosreservation');//div pour afficher la reservation
        this.phrasePasDeReservation = document.querySelector('.noreservation');//phrase actuelle disant pas de reservation en cours
        this.timerDeReservation = document.querySelector('.timerReservation');//le timer
        this.phraseAvertissement = document.getElementById('messagefermeture');//phrase indiquant que tous les champs ne sont pas marqués
        this.boutonAnnulationDansFormulaire = document.getElementById("annulation");//bouton annulation dans canvas
        this.boutonReserverCanvas = document.getElementById("reservecan");//bouton reservation dans canvas
        this.formulairecanvas = document.getElementById("formcan");//formulairecanvas
        this.formulaireDeGauche = document.getElementById("formulaire");//formulaire infos station à  gauche
        this .canvas = document.getElementById("canvas");
        this.effacerButDansCanvas=document.getElementById("annulation");//annulation dans canvas
        this.reserveDansFormulaireDeGauche=document.getElementById("reserve");//reserve dans formulaire de gauche


        // Pour stocker adresse, nom, prenom et station dans "storage"
        this.clientLastName = document.getElementById('nom'); //nom indiqué dans la sauvegarde
        this.clientFirstName = document.getElementById('prenom');//prenom dans la sauvegarde
        this.stationAddress = document.getElementById("address");
        this.stationName = document.getElementById("station");

        // les fonctions des boutons
        
        this.boutonReserverCanvas.addEventListener('click', this.validation);//action du bouton "reserver" du canvas
        this.boutonAnnuler.addEventListener("click",this.annulation);
        window.addEventListener('load', this.refresh);//reactualiser 
        this.effacerButDansCanvas.addEventListener("click" ,this.annulationCanvas);//annuler le remplissage canvas
        this.reserveDansFormulaireDeGauche.addEventListener("click",this.reserveFormulaireGauche);


        },
        


            //si l'on ne renseigne pas les noms et prenoms un message d'erreur s'affichera
        validation:function(){
            if(reservation.clientFirstName.value == "" || reservation.clientLastName.value == ""){
                reservation.blocInformationsDeReservation.style.display="none";
                reservation.phraseAvertissement.style.display ="block";
               
                //sinon la fonction validation s'executera
            }else{ 

                window.location.hash="#infosreservation";//ancre vers le footer (l'affichage de la réservation)
                reservation.phraseAvertissement.style.display  ="none";//suppression de la phrase d'avertissement
                reservation.phrasePasDeReservation.style.display ="none";//suppression de la phrase de reservation
                reservation.formulaireDeGauche.style.display ="none";//blocage du formulaire de gauche pendant la reservation
                reservation.sauvegarde();
                reservation.affichage();
                timer.clear();
                timer.annulationDateActuelle();
                timer.affichageDateActuelle();
                timer.chrono(); 
            } 

        },


        sauvegarde: function(){
            sessionStorage.setItem('nom',reservation.clientLastName.value);//nom renseigné par le visiteur
            sessionStorage.setItem("prenom",reservation.clientFirstName.value) ;//prenom renseigné par le visiteur
            sessionStorage.setItem("adresse",reservation.stationAddress.textContent);//adresse de la station
            sessionStorage.setItem("nomS",reservation.stationName.textContent) ;//nom de la station     
    

        },


        affichage: function(){
            this.formulaireDeGauche.style.left = "-100%";//formulaire de gauche repart
            this.formulairecanvas.style.display ="none";//formulaire canvas disparait
            reservation.blocInformationsDeReservation.style.display ="block";//la reservation en bas s'affiche
            reservation.phrasePasDeReservation.style.display ="none";//la phrase indiquant qu'il n'y a pas de reservation disparait
            reservation.nomDuClientDansLaReservation.innerHTML = sessionStorage.getItem("nom").toUpperCase() +" "+ sessionStorage.getItem("prenom");

            reservation.adresseDeLaReservation.innerHTML = sessionStorage.getItem("adresse");
            reservation.nomDeLaStationDeReservation.innerHTML = sessionStorage.getItem('nomS');
            
        },

        refresh: function(){
//si la sauvegarde est inferieur à 4 propositions alors la reservation s'affiche sinon elle s 'efface'
            if(sessionStorage.length>= 4){
                reservation.affichage();
                reservation.formulaireDeGauche.style.display ="none";
                timer.chronoRefresh();
                    
            }else{
                sessionStorage.clear();
                    
            }
        },

        annulation: function(){
            var confirmer = confirm("Souhaitez-vous annuler votre réservation?");
                if(confirmer){
                    reservation.blocInformationsDeReservation.style.display = "none";
                    reservation.phrasePasDeReservation.style.display = "";
                    reservation.formulaireDeGauche.style.display = "block";//deblocage du formulaire apres annulation
                    window.location.hash = "#map";
                    sessionStorage.clear();
                    timer.clear();
                    
                };

        },


//commande du bouton "effacer" celui-ci annule la commande et fait disparaitre le formulaire pour revenir à la map grace à l'ancre.

        annulationCanvas:function(){

            reservation.blocInformationsDeReservation.style.display = "none";
            reservation.phrasePasDeReservation.style.display = "";
            reservation.formulaireDeGauche.style.display = "block";//deblocage du formulaire apres annulation
            reservation.formulairecanvas.style.display="none";
            window.location.hash = "#map";
            sessionStorage.clear();
           
        },


//apparition de la fenetre  formulaire canvas au clique du bouton "réserver"
        reserveFormulaireGauche:function(){

            if(reservation.formulairecanvas.style.display ="none"){
                reservation.formulairecanvas.style.display="block";
                reservation.formulairecanvas.style.display="flex";
                
            
            
            };

        },

  
}
reservation.init();

