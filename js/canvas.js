


// Objet pour dessiner sur le canvas avec la souris

var DrawingCanvas = {
    // initialise la fonction qui permet de dessiner et d 'executer les actions de la souris'
    init: function () {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        var gradient = this.ctx.createLinearGradient(0,0,this.canvas.width,0);
        gradient.addColorStop("0","DeepSkyBLue");
        gradient.addColorStop("0.5","orange");
        gradient.addColorStop("1","green");
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth=5;
        this.cursorX = '';
		this.cursorY = '';
		





//evenement de la souris
        this.canvas.addEventListener("mousemove", e => {
            
            if (this.canDraw) {
                this.ctx.lineTo(e.offsetX, e.offsetY);  
                this.ctx.stroke();   
            }

        });


       

        this.canvas.addEventListener("mousedown", e => {
            this.canDraw = true;
            this.ctx.beginPath();
        });

     
     	


        this.canvas.addEventListener("mouseup", e => {
            this.canDraw = false;
        });




// pour mobiles
        this.canvas.addEventListener("touchstart", e => {
            mousePos = getTouchPos(this.canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
            reservation.formulaireDeGauche.style.display="none";//le fomulaire de gauche disparait uniquement sur ecrans tactiles pour laisser plus de place
        }, false);


        this.canvas.addEventListener("touchend", e => {
            var mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(mouseEvent);
        }, false);


        this.canvas.addEventListener("touchmove", e => {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, false);

        // Prise de la position du Touch
        function getTouchPos(canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            };
        };




        //effacer le dessin lorsque je clique sur effacer
        this.eraseBtn = document.getElementById('stopsignature');
            this.eraseBtn.addEventListener('click', e => {
            this.eraseDrawing();
        }); 

        //au bouton annuler du canvas ; effacer le dessin puis faire repartir le formulaire de gauche
        this.eraseBtns = document.getElementById('annulation'); //a l'annulation , le canvas s'efface
            this.eraseBtns.addEventListener('click', e => {
            document.getElementById("formulaire").style.left ="-100%";
            this.eraseDrawing();
         });
        //effacer le dessins lorsque j'annule la reservation ayant commencée en bas de la page 
             this.eraseBtnsi = document.getElementById('stopReservation'); //a l'annulation , le canvas s'efface
            this.eraseBtnsi.addEventListener('click', e => {
           
            this.eraseDrawing();
         });   

                


        },
        //fonction effacer
        eraseDrawing: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
        },

 }   

;

var drawingCanvas = Object.create(DrawingCanvas);
drawingCanvas.init();



