/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopoCamera = function(){
        var self = this;
        var WIDGET_NAME = "CTopoCamera";
        this.initCamera = function(){
            var oCamera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,1000);
            oCamera.position.z = 500;
            return oCamera;
        }
    }
})(jQuery);
