/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopoEvent = function(oTopo){
        var self = this;
        var WIDGET_NAME = "CTopoEvent";

        var m_oParent = oTopo;

        var m_oMousePointStart = {
            x:0,
            y:0,
            z:500
        };
        var m_oMousePointEnd = {
            x:0,
            y:0,
            z:500
        };
        var m_oMouceClickObj = {
            type:MOUSE_HIT_NODE,
            time:0,
            obj:undefined
        };
        var MOUSE_HIT_NODE = "MOUSE_HIT_NODE";
        var MOUSE_HIT_LINK = "MOUSE_HIT_LINK";
        var MOUSE_HIT_BG = "MOUSE_HIT_BG";
        var m_oDomEvent = undefined;

        this.mapEvent = {
            "nodeClick":function(oNode){
                m_oParent.DB.nodeClick(oNode);
            },
            "nodeCtrlClick":function(oNode){
                m_oParent.DB.nodeCtrlClick(oNode);
            },
            "linkClick":function(oLink){
                m_oParent.DB.linkClick(oLink);
            },
            "linkCtrlClick":function(oLink){
                m_oParent.DB.linkCtrlClick(oLink);
            },
            "linkDbClick":function(oLink){
                m_oParent.DB.linkDbClick(oLink);
            },
            "bgClick":function(){
                m_oParent.DB.bgClick();
            },
            "nodeMove":function(oMeshNode, oMousePointStart, oMousePointEnd){
                m_oParent.DB.nodeMove(oMeshNode, oMousePointStart, oMousePointEnd);
            },
            "bgMove":function( oMousePointStart, oMousePointEnd){
                m_oParent.DB.bgMove(oMousePointStart, oMousePointEnd);
            }
        };

        this.initEvent = function(oCamera, oRenderer, arrNodes, arrLinks){
            if(m_oDomEvent){
                m_oDomEvent.destroy();
            }
            m_oDomEvent = new THREEx.DomEvents(oCamera, oRenderer.domElement);

            for(var i = 0; i < arrNodes.length; i++){
               _initEvent4Node(m_oDomEvent, arrNodes[i]);
            }

            for(i = 0; i < arrLinks.length; i++){
                _initEvent4Link(m_oDomEvent, arrLinks[i]);
            }

            _initEvent4Bg();
        };

        var _initEvent4Node = function(oDomEvents, oNode){
            //oDomEvents.addEventListener(oNode, 'click', function(event){
            //    console.log("node click", oNode);
            //    //self.mapEvent["nodeClick"](oNode);
            //}, false);
            //oDomEvents.addEventListener(oNode, 'mouseover', function(event){
            //    //console.log("node mouseover", oNode);
            //}, false);
            oDomEvents.addEventListener(oNode, 'mousedown', function(event){
                //console.log("node mousedown", oNode);
                m_oMouceClickObj.type = MOUSE_HIT_NODE;
                m_oMouceClickObj.time = new Date().getTime();
                m_oMouceClickObj.obj = oNode;
            }, false);
            //oDomEvents.addEventListener(oNode, 'mouseup', function(event){
            //    console.log("node ouseup", oNode);
            //}, false);
        };

        var _initEvent4Link = function(oDomEvents, oLink){
            //oDomEvents.addEventListener(oLink, 'click', function(event){
            //    //console.log("link click", oLink);
            //    self.mapEvent["linkClick"](oLink);
            //}, false);
            //oDomEvents.addEventListener(oLink, 'dblclick', function(event){
            //    //console.log("link dblclick", oLink);
            //    self.mapEvent["linkDbClick"](oLink);
            //}, false);
            oDomEvents.addEventListener(oLink, 'mousedown', function(event){
                m_oMouceClickObj.type = MOUSE_HIT_LINK;
                m_oMouceClickObj.time = new Date().getTime();
                m_oMouceClickObj.obj = oLink;
            }, false);
        };

        var iRegCount = 1;
        var _initEvent4Bg = function(){
            if(iRegCount == 1){
                document.addEventListener("mousedown", function(event){
                    if(new Date().getTime() - m_oMouceClickObj.time >= 50){
                        m_oMouceClickObj.type = MOUSE_HIT_BG;
                        m_oMouceClickObj.time = new Date().getTime();
                    }
                    if(event.x == undefined){
                        m_oMousePointStart.x = event.clientX;
                        m_oMousePointStart.y = event.clientY;
                    }
                    else{
                        m_oMousePointStart.x = event.x;
                        m_oMousePointStart.y = event.y;
                    }

                }, false);
                document.addEventListener("mouseup", function(event){
                    if(event.x == undefined){
                        m_oMousePointEnd.x = event.clientX;
                        m_oMousePointEnd.y = event.clientY;
                    }
                    else{
                        m_oMousePointEnd.x = event.x;
                        m_oMousePointEnd.y = event.y;
                    }

                    var bIsCtrlDown = isCtrlDown();
                    if(new Date().getTime() - m_oMouceClickObj.time <= 200){
                        if(m_oMouceClickObj.type == MOUSE_HIT_NODE){
                            if(bIsCtrlDown){
                                self.mapEvent["nodeCtrlClick"](m_oMouceClickObj.obj);
                            }
                            else{
                                self.mapEvent["nodeClick"](m_oMouceClickObj.obj);
                            }

                        }
                        else if(m_oMouceClickObj.type == MOUSE_HIT_LINK){
                            if(bIsCtrlDown){
                                self.mapEvent["linkCtrlClick"](m_oMouceClickObj.obj);
                            }
                            else{
                                self.mapEvent["linkClick"](m_oMouceClickObj.obj);
                            }
                        }
                        else{
                            self.mapEvent["bgClick"]();
                        }
                    }
                    else{
                        if(m_oMouceClickObj.type == MOUSE_HIT_NODE){
                            self.mapEvent["nodeMove"](m_oMouceClickObj.obj, m_oMousePointStart, m_oMousePointEnd);
                        }
                        else if(m_oMouceClickObj.type == MOUSE_HIT_LINK){
                            // do nothing
                            // self.mapEvent["linkMove"](m_oMouceClickObj.obj);
                        }
                        else{
                            self.mapEvent["bgMove"](m_oMousePointStart, m_oMousePointEnd);
                        }
                    }
                }, false);
            }
            iRegCount++;
        };

        var isCtrlDown = function(){
            var bIsCtrlDown = false;

            for(var i = 0; i < KeyboardJS.activeKeys().length; i++){
                var strKeyName = KeyboardJS.activeKeys()[i];
                if("ctrl" == strKeyName){
                    bIsCtrlDown = true;
                    break;
                }
            }
            return bIsCtrlDown;
        }
    }
})(jQuery);
