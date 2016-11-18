/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopoLight = function(){
        var self = this;
        var WIDGET_NAME = "CTopoLight";

        this.initLight = function(oScene){
            var light = new THREE.AmbientLight(0xffffff);
            oScene.add(light)
        }
    }
})(jQuery);
