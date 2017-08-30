var app = angular.module('ColorMixerApp', []);
app.controller('ColorMixerController', ['$scope','$timeout',
    function ($scope, $timeout) {
                

        $scope.Headers = ['Red','Green','Blue'];

        $scope.R_Value = 0;
        $scope.G_Value = 0;
        $scope.B_Value = 0;

        $scope.PalleteStyle = function () {
            return {
                "color": "rgb(" + (255-$scope.R_Value) + "," + (255-$scope.G_Value) + "," + (255-$scope.B_Value) + ")",
                "background-color": "rgb(" + $scope.R_Value + "," + $scope.G_Value + "," + $scope.B_Value + ")",
                "width" : "100px"
            };
        }
    
        $scope.handleKey = function (event,colorValue) {            
            console.log("event.keyCode: " + event.keyCode + " " + colorValue + " R:" + $scope.R_Value + " G:" + $scope.G_Value + " B:" + $scope.B_Value);                  
        }

        $scope.ctx = document.getElementById("paintArea").getContext("2d");
        $scope.ApplyColor = function () {
            
            //ctx.strokeStyle = "rgb(" + $scope.R_Value + "," + $scope.G_Value + "," + $scope.B_Value + ")";
            //ctx.strokeRect(20, 20, 150, 100);
            $scope.ctx.fillStyle = "rgb(" + $scope.R_Value + "," + $scope.G_Value + "," + $scope.B_Value + ")";
            $scope.ctx.fillRect(30, 30, 150   , 100);
        }
        $scope.DrawingStarted = false;
        $scope.prevX = 0;
        $scope.prevY = 0;

        $scope.canvasStart = function (event) {
            $scope.DrawingStarted = true;
            $scope.ctx.beginPath();
        }
        $scope.canvasDraw = function (event) {        
            if ($scope.DrawingStarted) {
                $scope.ctx.moveTo($scope.prevX, $scope.prevY);
                $scope.ctx.lineTo(event.offsetX, event.offsetY);
                $scope.ctx.strokeStyle = "rgb(" + $scope.R_Value + "," + $scope.G_Value + "," + $scope.B_Value + ")";
                $scope.ctx.stroke();
                $scope.prevX = event.offsetX;
                $scope.prevY = event.offsetY;
            }
        }
        $scope.canvasEnd = function (event) {
            $scope.DrawingStarted = false;
        }

        

    }]);
