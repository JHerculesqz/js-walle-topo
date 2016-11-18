/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopoLight = function(){
        var self = this;
        var WIDGET_NAME = "CTopoLight";

        this.initLight = function(oScene){
            var light = new THREE.AmbientLight(0xffffff);
            oScene.add(light);

            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(1000,1000,1000);
            spotLight.castShadow = true;
            spotLight.intensity = 2;
            spotLight.distance = 5000;
            oScene.add(spotLight);
        }
    }
})(jQuery);
