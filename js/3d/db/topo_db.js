/**
 * Created by LQQ on 2016/11/15.
 */
(function($){
    $.CTopoDB = function(oTopo){
        var self = this;
        this.WIDGET_NAME = "CTopoDB";

        var m_oParent = oTopo;
        this.m_oCache = {
            nodes:[],
            links:[]
        };

        this.initCache = function(arrNodes, arrLinks){
            self.m_oCache.nodes = arrNodes;
            self.m_oCache.links = arrLinks;
        };

        this.nodeClick = function(oMeshNode){
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                if(oNode.name == oMeshNode.name){
                    oNode.params.isSelect = true;
                }
                else{
                    oNode.params.isSelect = false;
                }
            }

            for(var i = 0; i < self.m_oCache.links.length; i++){
                var oLink = self.m_oCache.links[i];
                oLink.params.isSelect = false;
            }

            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.nodeCtrlClick = function(oMeshNode){
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                if(oNode.name == oMeshNode.name){
                    if(oNode.params.isSelect){
                        oNode.params.isSelect = false;
                    }
                    else{
                        oNode.params.isSelect = true;
                    }
                }
            }

            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.linkClick = function(oMeshLink){
            for(var i = 0; i < self.m_oCache.links.length; i++){
                var oLink = self.m_oCache.links[i];
                if(oLink.name == oMeshLink.name){
                    oLink.params.isSelect = true;
                }
                else{
                    oLink.params.isSelect = false;
                }
            }

            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                oNode.params.isSelect = false;
            }

            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.linkCtrlClick = function(oMeshLink){
            for(var i = 0; i < self.m_oCache.links.length; i++){
                var oLink = self.m_oCache.links[i];
                if(oLink.name == oMeshLink.name){
                    if(oLink.params.isSelect){
                        oLink.params.isSelect = false;
                    }
                    else{
                        oLink.params.isSelect = true;
                    }
                }
            }
            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.linkDbClick = function(oLink){

        };

        this.bgClick = function(){
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                oNode.params.isSelect = false;
            }

            for(i = 0; i < self.m_oCache.links.length; i++){
                var oLink = self.m_oCache.links[i];
                oLink.params.isSelect = false;
            }

            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.nodeMove = function(oMeshNode, oMousePointStart, oMousePointEnd){
            var iOffsetX = oMousePointEnd.x - oMousePointStart.x;
            var iOffsetY = oMousePointEnd.y - oMousePointStart.y;
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                if(oNode.name == oMeshNode.name){
                    oNode.params.x += iOffsetX;
                    oNode.params.y += iOffsetY;
                }
            }
            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.bgMove = function( oMousePointStart, oMousePointEnd){
            var iOffsetX = oMousePointEnd.x - oMousePointStart.x;
            var iOffsetY = oMousePointEnd.y - oMousePointStart.y;
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                oNode.params.x += iOffsetX;
                oNode.params.y += iOffsetY;
            }
            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };

        this.bgDragBy3rd = function(iOffsetX, iOffsetY, iOffsetZ){
            for(var i = 0; i < self.m_oCache.nodes.length; i++){
                var oNode = self.m_oCache.nodes[i];
                oNode.params.x += iOffsetX;
                oNode.params.y += iOffsetY;
                oNode.params.z += iOffsetZ;
            }
            m_oParent.draw(self.m_oCache.nodes, self.m_oCache.links);
        };
    }
})(jQuery);
