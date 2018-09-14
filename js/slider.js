

function Slider(nombreImages){

  this.image=4;
  this.nombreImages=1;
  this.slideInterval = setInterval(this.goRight, 1000);

  this.init= function(){

      //html
      this.contenantDesPages= document.getElementById("slideshow");
      this.pagesContenues= document.getElementById("slides");
      this.boutonCroixFermer= document.getElementById("ferme");
      this.p=document.querySelector("p");
      this.boutonDroite=document.querySelector(".nxt");
      this.boutonGauche=document.querySelector(".pre");
      this.page1=document.getElementById("page1");
      this.page2=document.getElementById("page2");
      this.page3=document.getElementById("page3");
      this.page4=document.getElementById("page4");
      this.boutonUtilisation=document.getElementById("utilisation");//faire apparaitre le slider
            //fonctions
      this.boutonUtilisation.addEventListener('click',()=>{
        this.ouvertureSlider();
      });


      this.boutonCroixFermer.addEventListener("click",()=>{
        this.fermerLeSlider();
      });


      this.boutonDroite.addEventListener("click",()=>{
        this.goRight();
      });


      this.boutonGauche.addEventListener("click",()=>{
        this.goLeft();
      });


    //arret du slider lors du survol de la souris
      document.getElementById("slideshow").addEventListener("mouseover",(e)=>{
       this.sliderOff();
       });

    //reprise de l'animation du slider en dehors du slideshow
      document.getElementById("slideshow").addEventListener("mouseout",(e)=>{
        this.sliderAuto();

      });


      //fonction pour commander le slider par les touches droite/gauche du clavier
      document.addEventListener("keydown", (e)=>{
          if(e.keyCode === 39){
          this.goRight();
          }
          else if(e.keyCode === 37){
          this.goLeft();
          }
        });     

    },
   

      this.goLeft=function(){
    
         if(this.image === 0 || this.image === 1){
            this.image = nombreImages + 1;

          }
        var compteurImageDroite= this.image-2;
        var slider=compteurImageDroite*-100   ;
        slider=slider + "%";
        document.getElementById("slides").style.marginLeft= slider;
        this.image--;
        
    };

    //fleche de droite

      this.goRight=function() {
      
          if(this.image===4){
            this.image=0;
          }
          var slider=this.image*-100 +"%"  ;
       
          document.getElementById("slides").style.marginLeft= slider;
          this.image++;
      
        

      };

      console.log(this.goRight);

     

     this.sliderAuto = function(){
         
          this.slideInterval = setInterval( () => {
          this.goRight();
          }, 1000);
      };



      this.sliderOff =function(){
   
            clearInterval(this.slideInterval);

      };




      this.ouvertureSlider=function(){

          if(slider.contenantDesPages.style.display="none"){
          slider.contenantDesPages.style.display="block";
          };
      };



      this.fermerLeSlider=function(){
          
          slider.contenantDesPages.style.display="none";
          
      };



};

      var slider = new Slider(4);
      slider.init();

    

