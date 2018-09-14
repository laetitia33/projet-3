var mentions = {

	init:function () {
			//html
			
			this.boutonFermerMentions= document.getElementById("fermem");
			this.boutonOuvrirMentions=document.getElementById("mentions");
			this.documentMentions=document.getElementById("mentionsbloc");




			//fonctions
			this.boutonFermerMentions.addEventListener("click",this.fermer);
			this.boutonOuvrirMentions.addEventListener("click",this.ouvrir);

			},

	

			ouvrir:function(){
				if(mentions.documentMentions.style.display="none"){
					mentions.documentMentions.style.display="block";
				
				}
			},


			fermer:function(){
				if(mentions.documentMentions.style.display="block"){
					mentions.documentMentions.style.display="none";
					window.location.hash="#ferme";
				
				};
			},


		};
	

mentions.init();
