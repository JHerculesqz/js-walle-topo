/**
 * Created by LQQ on 2016/11/15.
 */
(function($){
    $.CTopoApi = function(oTopo){
        var self = this;
        this.WIDGET_NAME  = "CTopoApi";

        var m_oParent = oTopo;

        var m_iDefaultOffsetX4Drag = 30;
        var m_iDefaultOffsetY4Drag = 0;
        var m_iDefaultOffsetZ4Drag = 0;

        var m_iDefaultOffsetZ4Zoom = 50;

        this.getTopoCache = function(){
            return m_oParent.DB.m_oCache;
        };

        this.selectNodesBy3rd = function(arrNodeNames, bIsSelect){

        };

        this.selectLinksBy3rd = function(arrLinksNames, bIsSelect){

        };

        this.applyDelta = function(oDalta){

        };

        this.bgDragBy3rd = function(strDragType){
            if(strDragType == "LEFT"){
                m_oParent.DB.bgDragBy3rd(-m_iDefaultOffsetX4Drag, m_iDefaultOffsetY4Drag, m_iDefaultOffsetZ4Drag);
            }
            else if(strDragType == "RIGHT"){
                m_oParent.DB.bgDragBy3rd(m_iDefaultOffsetX4Drag, m_iDefaultOffsetY4Drag, m_iDefaultOffsetZ4Drag);
            }
        };

        this.zoomBy3rd = function(strZoomType){
            if(strZoomType == "ZOOM_IN"){
                m_oParent.Renderer.zoomBy3rd(m_iDefaultOffsetZ4Zoom);
            }
            else if(strZoomType == "ZOOM_OUT"){
                m_oParent.Renderer.zoomBy3rd(-m_iDefaultOffsetZ4Zoom);
            }
        }
    };
})(jQuery);
