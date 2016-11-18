/**
 * Created by LQQ on 2016/11/15.
 */
(function($){
    $.CTopoLink = function(){
        var self = this;
        this.WIDGET_NAME = "CTopoLink";

        this.drawLink = function(oScene, oDicImg, arrNodes, arrLinks){
           var arrLinkRes = [];

            var mapNodes = {};
            for(var i =0; i < arrNodes.length; i++){
                mapNodes[arrNodes[i].name] = arrNodes[i];
            }

            for(var i = 0; i < arrLinks.length; i++){
                var oLink = arrLinks[i];
                var oSrcNode = mapNodes[oLink.params.srcNodeName];
                var oDstNode = mapNodes[oLink.params.dstNodeName];
                _generateLink(oScene, oDicImg, oLink,oSrcNode, oDstNode, arrLinkRes);
            }

            return arrLinkRes;
        };

        var _generateLink = function(oScene, oDicImg, oLink, oSrcNode, oDstNode, arrLinkRes){
            //1._addLink
            _addLink(oScene, oLink,oSrcNode, oDstNode, arrLinkRes);

            //2._addLinkLabel
            _addLinkLabel(oScene, oLink);

            //3._addLinkAttach
            _addLinkAttach(oScene, oDicImg, oLink);
        };

        var _addLink = function(oScene, oLink, oSrcNode, oDstNode, arrLinkRes){
            var oSrcNodePos = new THREE.Vector3(oSrcNode.params.x,oSrcNode.params.y, oSrcNode.params.z );
            var oDstNodePos = new THREE.Vector3(oDstNode.params.x,oDstNode.params.y, oDstNode.params.z );
            var oGeometry = new THREE.Geometry();
            oGeometry.vertices.push(oSrcNodePos);
            oGeometry.vertices.push(oDstNodePos);
            var oLine4Mesh = undefined;
            if(oLink.params.uiRealLine){
                oLine4Mesh = new THREE.Line(oGeometry, new THREE.LineBasicMaterial({
                    color:oLink.params.uiLinkColor,
                    linewidth:oLink.params.uiLinkWidth
                }), THREE.LineSegments);
            }
            else{
                oGeometry.computeLineDistances();
                oLine4Mesh = new THREE.Line(oGeometry, new THREE.LineDashedMaterial({
                    color:oLink.params.uiLinkColor,
                    linewidth:oLink.params.uiLinkWidth,
                    dashSize:10,
                    gapSize:5
                }), THREE.LineSegments);
            }
            oScene.add(oLine4Mesh);
            arrLinkRes.push(oLine4Mesh);
            oLine4Mesh.name = oLink.name;
        };

        var _addLinkLabel = function(oScene, oLink){
            if(oLink.params.uiLabel != "" && oLink.params.uiLabel != null){
                var strLinkLabel = CTopoUtils.generateLabel(oLink.params.uiLabel, {
                    fontsize:20,
                    borderColor:{
                        r:255,
                        g:0,
                        b:0,
                        a:1.0
                    },
                    backgroundColor:{
                        r:255,
                        g:100,
                        b:100,
                        a:0.8
                    }
                });
                strLinkLabel.position.set(oLink.params.uiLabelPosX,oLink.params.uiLabelPosY,oLink.params.uiLabelPosZ);
                oScene.add(strLinkLabel);
            }
        };

        var _addLinkAttach = function(oScene, oDicImg, oLink){
            if(oLink.params.uiAttachImgPath){
                var oGeometry = new THREE.SphereGeometry(8,8,8);
                var oMaterial = new THREE.MeshBasicMaterial({map:oDicImg[oLink.params.uiAttachImgPath],overdraw:0.5});
                var oMesh4Link = new THREE.Mesh(oGeometry, oMaterial);
                oMesh4Link.position.x = oLink.params.uiAttachPosX;
                oMesh4Link.position.y = oLink.params.uiAttachPosY;
                oMesh4Link.position.z = oLink.params.uiAttachPosZ;
                oScene.add(oMesh4Link);
            }
        };
    }
})(jQuery);