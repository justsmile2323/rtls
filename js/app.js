Vue.config.devtools = true;
var config = {
    apiKey: "AIzaSyC8OMX5S6OTBt1UQBW3qHMrEHqNYlKUP2o",
    authDomain: "prisoners-61c87.firebaseapp.com",
    databaseURL: "https://prisoners-61c87.firebaseio.com",
    projectId: "prisoners-61c87",
    storageBucket: "prisoners-61c87.appspot.com",
    messagingSenderId: "3273599200"
};
firebase.initializeApp(config);
var devicesRef = firebase.database().ref('devices');

var app = new Vue({
    el: '#app',
    data: {
        width: 500
    },
    firebase: {
        devices: devicesRef
    },
    methods: {
        startDraw(){
            let canvas = document.querySelector('canvas');
            let canvasContext = canvas.getContext('2d');
            let requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;

            canvasContext.clearRect(0,0,canvas.width,canvas.height);

// console.log(this.devices);

            if(this.devices.length) {
                let X = canvas.width;
                let Y = canvas.height;
                let REC = {};
                REC.Ax = this.devices[0].a2.x;
                REC.Ay = this.devices[0].a2.y;

                let a0 = {};
                let a1 = {};
                let a2 = {};
                let a3 = {};
                let t0 = {};

                if (REC.Ax<REC.Ay) {
                    a0.x = (X/2) - (X /(REC.Ay/REC.Ax)/2);
                    a0.y = 0;

                    a1.x = a0.x;
                    a1.y = Y;

                    a2.x = (X/2) + (X /(REC.Ay/REC.Ax)/2);
                    a2.y = Y;

                    a3.x = (X/2) - (X /(REC.Ay/REC.Ax)/2);
                    a3.y = 0;
                }
                else {
                    a0.x = 0;
                    a0.y = (Y/2) - (Y /(REC.Ax/REC.Ay)/2);

                    a1.x = 0;
                    a1.y = (Y/2) + (Y /(REC.Ax/REC.Ay)/2);

                    a2.x = X;
                    a2.y = (Y/2) + (Y /(REC.Ax/REC.Ay)/2);

                    a3.x = X;
                    a3.y = (Y/2) - (Y /(REC.Ax/REC.Ay)/2);
                }


                // a0 = this.devices[0].a0;
                // a1 = this.devices[0].a1;
                // a2 = this.devices[0].a2;
                // a3 = this.devices[0].a3;


                canvasContext.beginPath();
                canvasContext.arc(a0.x, a0.y, 5, 0, 2 * Math.PI);
                canvasContext.fillStyle = 'red';
                canvasContext.fill();
                canvasContext.closePath();

                canvasContext.beginPath();
                canvasContext.arc(a1.x, a1.y, 5, 0, 2 * Math.PI);
                canvasContext.fillStyle = 'red';
                canvasContext.fill();
                canvasContext.closePath();

                canvasContext.beginPath();
                canvasContext.arc(a2.x, a2.y, 5, 0, 2 * Math.PI);
                canvasContext.fillStyle = 'red';
                canvasContext.fill();
                canvasContext.closePath();

                canvasContext.beginPath();
                canvasContext.arc(a3.x, a3.y, 5, 0, 2 * Math.PI);
                canvasContext.fillStyle = 'red';
                canvasContext.fill();
                canvasContext.closePath();

                for (let i = 0; i < this.devices.length; i++) {



                    t0.x = a0.x + ((a2.x-a0.x) * (this.devices[i].a4.x / REC.Ay));
                    t0.y = a0.y + ((a2.y-a0.y) * (this.devices[i].a4.y / REC.Ax));
                    // t0 = this.devices[i].a4;
                    console.log(t0);
                    console.log(t0);

                    canvasContext.beginPath();
                    canvasContext.arc(t0.x, t0.y, 5, 0, 2 * Math.PI);
                    canvasContext.fillStyle = 'green';
                    canvasContext.fill();
                    canvasContext.closePath();
                }

                console.log(REC);
                console.log(a0);
                console.log(a1);
                console.log(a2);
                console.log(a3);
                console.log('_______________');


                // canvasContext.scale(-1,-1);
                // canvasContext.fillStyle = "red";
                // canvasContext.textAlign = "center";
                // canvasContext.font = "16px Arial";
                // canvasContext.fillText('x:' +this.devices[0].a4.x + 'y:'+  this.devices[0].a4.y,  this.devices[0].a4.x-10, this.devices[0].a4.y-10);
            }
            requestAnimationFrame(this.startDraw);
        },
        clearBase: function () {
            for (let i = 0; i<this.devices.length; i++){
                devicesRef.remove();
            }

        }
    },
    mounted: function () {
        setTimeout(() => {
            this.startDraw();
        }, 2000);
    }
});

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;