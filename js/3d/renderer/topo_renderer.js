/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopoRenderer = function(){
        var self = this;
        var WIDGET_NAME = "CTopoRenderer";
        var mouseX = 0;
        var mouseY = 0;
        var m_oCamera = undefined;
        var m_oScene = undefined;
        var m_oCRenderer = undefined;

        this.initRenderer = function(strContainId){
            var oRenderer = new THREE.WebGLRenderer({
                alpha:true
            });
            oRenderer.setSize(window.innerWidth, window.innerHeight);
            $("#" + strContainId).append(oRenderer.domElement);
            return oRenderer;
        };

        this.render = function(oCamera, oScene, oRenderer){
            //oCamera.lookAt(oScene.position);
            //oRenderer.render(oScene, oCamera);
            m_oCamera = oCamera;
            m_oScene = oScene;
            m_oCRenderer = oRenderer;
            document.addEventListener("mousemove", onDocumentMouseMove, false);
            //_animate();
            _render();
        };

        var onDocumentMouseMove = function(event){
            //mouseX = event.clientX - window.innerWidth/2;
            mouseY = event.clientY - window.innerHeight/2;
            _render();
        };

        var  _animate = function(){
            requestAnimationFrame(_animate);
            _render();
        };

        var _render = function(){
            //m_oCamera.position.x += (mouseX - m_oCamera.position.x) * 0.05;
            m_oCamera.position.y += (mouseY - m_oCamera.position.y) * 0.05;
            m_oCamera.lookAt(m_oScene.position);
            m_oCRenderer.render(m_oScene, m_oCamera);
        };

        this.zoomBy3rd = function(iOffset){
            m_oCamera.position.x += iOffset;
            m_oCamera.position.y += iOffset;
            m_oCamera.lookAt(m_oScene.position);
            m_oCRenderer.render(m_oScene, m_oCamera);
        };
    }
})(jQuery);
