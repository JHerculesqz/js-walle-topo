/**
 * Created by LQQ on 2016/11/15.
 */
(function($){
    $.CTopoNode = function(){
        var self = this;
        this.WIDGET_NAME = "CTopoNode";

        this.drawNode = function(oScene, oDicImg, arrNodes, oAfterLoadNode){
            var arrNodeRes = [];
            for(var i = 0; i < arrNodes.length;i++){
                var oNode = arrNodes[i];
                _generateNode(oScene,oDicImg, oNode, arrNodeRes);
            }
            //var oMtlLoader = new THREE.MTLLoader();
            //oMtlLoader.setPath('image/');
            //oMtlLoader.load('panel.mtl', function(oMaterials){
            //    oMaterials.preload();
            //    var oObjLoader = new THREE.OBJLoader();
            //    oObjLoader.setMaterials(oMaterials);
            //    oObjLoader.setPath('image/');
            //    oObjLoader.load('panel.obj', function(oMesh){
            //        oMesh.scale.x = 5;
            //        oMesh.scale.y = 0.5;
            //        oMesh.scale.z = 2;
            //        oMesh.position.x = 0;
            //        oMesh.position.y = 0;
            //        oMesh.position.z = 0;
            //        oScene.add(oMesh);
            //    });
            //});

            oAfterLoadNode(arrNodeRes);
        };

        var  _generateNode = function(oScene, oDicImg,  oNode, arrNodeRes){
            //1.addNode
            var oGeometry = new THREE.SphereGeometry(oNode.params.uiImgW,oNode.params.uiImgH,oNode.params.uiImgD);
            var oMaterial = new THREE.MeshBasicMaterial({map:oDicImg[oNode.params.uiImgPath],overdraw:0.5});
            var oMesh4Node = new THREE.Mesh(oGeometry, oMaterial);
            oMesh4Node.position.x = oNode.params.x;
            oMesh4Node.position.y = oNode.params.y;
            oMesh4Node.position.z = oNode.params.z;
            oMesh4Node.name = oNode.name;
            oScene.add(oMesh4Node);
            arrNodeRes.push(oMesh4Node);

            //2.addNodeLabel
            _addNodeSelectStyle(oScene, oNode, oMesh4Node, oGeometry);

            //3.addNodeLabel
            _addNodeLabel(oScene, oNode);

            //4.addNodeAttach
            _addNodeAttach(oScene, oDicImg, oNode);
        };

        var _addNodeSelectStyle = function(oScene, oNode, oMesh4Node, oGeometry){
            if(oNode.params.isSelect){
                var outlineMaterial = new THREE.MeshBasicMaterial({color:0xff00000, side:THREE.BackSide});
                var outlineMesh = new THREE.Mesh(oGeometry, outlineMaterial);
                outlineMesh.position.x = oMesh4Node.position.x;
                outlineMesh.position.y = oMesh4Node.position.y;
                outlineMesh.position.z = oMesh4Node.position.z;
                outlineMesh.scale.multiplyScalar(1.05);
                oScene.add(outlineMesh);
            }
        };

        var _addNodeLabel = function(oScene, oNode){
            if(null != oNode.params.uiLabel && oNode.params.uiLabel != ""){
                var strNodeLabel = CTopoUtils.generateLabel(oNode.params.uiLabel, {
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
                strNodeLabel.position.set(oNode.params.uiLabelPosX,oNode.params.uiLabelPosY,oNode.params.uiLabelPosZ);
                oScene.add(strNodeLabel);
            }
        };

        var _addNodeAttach = function(oScene, oDicImg, oNode){
            if(oNode.params.uiAttachImgPath){
                var oGeometry = new THREE.SphereGeometry(8,8,8);
                var oMaterial = new THREE.MeshBasicMaterial({map:oDicImg[oNode.params.uiAttachImgPath],overdraw:0.5});
                var oMesh4Node = new THREE.Mesh(oGeometry, oMaterial);
                oMesh4Node.position.x = oNode.params.uiAttachPosX;
                oMesh4Node.position.y = oNode.params.uiAttachPosY;
                oMesh4Node.position.z = oNode.params.uiAttachPosZ;
                oScene.add(oMesh4Node);
            }
        };
    }
})(jQuery);