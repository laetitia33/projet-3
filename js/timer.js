var timer = {
  
    compteur: null,
    annulerDate: null,
    dateActuelle: null,
    chrono: function () {
        var seconds = (timer.annulerDate.getTime() - timer.dateActuelle.getTime()) / 1000;
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds - minutes * 60);

        timer.compteur = setInterval(function () {
            
            // mettre le timer à 0 si la reservation à expirée 
            if (minutes == 0 && seconds == 0) {
                sessionStorage.clear();
                reservation.timerDeReservation.innerHTML = '';
                reservation.blocInformationsDeReservation.style.display="block";
                reservation.phraseAvertissement.style.display ="none";
                clearInterval(timer.compteur);
            } else if (seconds > 0) {
                seconds--;
            } else {
                seconds = 59;
                minutes--;
            }

            if (seconds < 10) {
                reservation.timerDeReservation.innerHTML = minutes + " minutes(s) " + "0" + seconds + " seconde(s)";
            } else {
                reservation.timerDeReservation.innerHTML = minutes + " minutes(s) " + seconds + " seconde(s)";
            }
        }, 1000);
    },
    affichageDateActuelle: function () {
        timer.dateActuelle = new Date();
    },
    annulationDateActuelle: function () {
        timer.annulerDate = new Date();
        timer.annulerDate.setMinutes(timer.annulerDate.getMinutes() + 20);
        sessionStorage.setItem('annulDate', timer.annulerDate);
    },
    chronoRefresh: function () {
        timer.annulerDate = new Date(sessionStorage.getItem('annulDate'));
        timer.affichageDateActuelle();
        timer.chrono();
    },
    clear: function () {
        reservation.timerDeReservation.innerHTML = '';
        clearInterval(timer.compteur);
    }
};
