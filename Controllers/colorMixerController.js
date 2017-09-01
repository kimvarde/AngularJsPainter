var app = angular.module('ColorMixerApp', []);
app.controller('ColorMixerController', ['$scope','$timeout',
    function ($scope, $timeout) {
                
        $scope.ctx = document.getElementById("paintArea").getContext("2d");
        $scope.DrawingStarted = false;
        $scope.prevX = -1;
        $scope.prevY = -1;
        $scope.brushSize = 10;
        $scope.useGradient = false;
        $scope.canvasWidth = 800;
        $scope.canvasHeight = 480;

        $scope.RGBInputs = [
            {
                Text: 'Red',
                ColorValue: 0,
                Min: 0,
                Max: 254,
                Keyup: "handleKey($event, 'R')",
                BtnStyle: "btn-danger"
            },
            {
                Text: 'Green',
                ColorValue: 0,
                Min: 0,
                Max: 254,
                Keyup: "handleKey($event, 'G')",
                BtnStyle: "btn-success"
            },
            {
                Text: 'Blue',
                ColorValue: 0,
                Min: 0,
                Max: 254,
                Keyup: "handleKey($event, 'B')",
                BtnStyle: "btn-primary"
            }
          
        ];
              

        $scope.PalleteStyle = function () {
            return {
                "color": $scope.getRgbColorInverse(),
                "background-color": $scope.getRgbColor()                
            };
        }

        $scope.getRgbColor = function ()
        {
            if ($scope.useGradient) {
                var gradient = $scope.ctx.createLinearGradient(0, 0, 0, 480);
                gradient.addColorStop("0", "rgb(" + $scope.RGBInputs[0].ColorValue + ",0,0)");
                gradient.addColorStop("0.20", "rgb(0," + $scope.RGBInputs[1].ColorValue + ",0)");
                gradient.addColorStop("0.40", "rgb(0,0," + $scope.RGBInputs[2].ColorValue + ")");
                gradient.addColorStop("0.60", "rgb(" + $scope.RGBInputs[0].ColorValue + ",0,0)");
                gradient.addColorStop("0.80", "rgb(0," + $scope.RGBInputs[1].ColorValue + ",0)");
                gradient.addColorStop("1.0", "rgb(0,0," + $scope.RGBInputs[2].ColorValue + ")");
                return gradient;
                // Fill with gradient
                //ctx.strokeStyle = gradient;
            }
            else {
                return "rgb(" + $scope.RGBInputs[0].ColorValue + "," + $scope.RGBInputs[1].ColorValue + "," + $scope.RGBInputs[2].ColorValue + ")";
            }
        }
        $scope.getRgbColorInverse = function () {
            return "rgb(" + (255 - $scope.RGBInputs[0].ColorValue) + "," + (255 - $scope.RGBInputs[1].ColorValue) + "," + (255 - $scope.RGBInputs[2].ColorValue) + ")";
        }
    
        $scope.handleKey = function (event,colorValue) {            
            console.log("event.keyCode: " + event.keyCode + " Colorvalue:" + colorValue );                  
        }

       

        $scope.canvasStart = function (event) {
            $scope.DrawingStarted = true;            
            $scope.prevX = -1;
            $scope.prevY = -1;
            $scope.ctx.beginPath();
            $scope.ctx.lineWidth = $scope.brushSize;
        }
        $scope.canvasDraw = function (event) {        
            if ($scope.DrawingStarted) {
                if ($scope.prevX == -1 && $scope.prevY == -1) {
                    $scope.prevX = event.offsetX;
                    $scope.prevY = event.offsetY;
                }
                $scope.ctx.moveTo($scope.prevX, $scope.prevY);
                $scope.ctx.lineTo(event.offsetX, event.offsetY);
                $scope.ctx.strokeStyle = $scope.getRgbColor();
                $scope.ctx.stroke();
                $scope.prevX = event.offsetX;
                $scope.prevY = event.offsetY;
            }
        }
        $scope.canvasEnd = function (event) {
            $scope.DrawingStarted = false;            
        }

        $scope.clearDrawing = function () {
            $scope.ctx.clearRect(0, 0, $scope.canvasWidth, $scope.canvasHeight);
        }
        

    }]);
