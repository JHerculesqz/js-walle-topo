/**
 * Created by LQQ on 2016/11/14.
 */
(function($){
    $.CTopo = function(){
        var self = this;
        this.WIDGET_NAME = "CTopo";

        //region Fields

        this.Renderer = new $.CTopoRenderer();
        this.m_oRenderer = undefined;

        var m_oCTopoScene = new $.CTopoScene();
        this.m_oScene = undefined;

        var m_oCTopoLight = new $.CTopoLight();

        var m_oCTopoCamera = new $.CTopoCamera();
        this.m_oCamera = undefined;

        var m_oCTopoNode = new $.CTopoNode(self);
        var m_oCTopoLink = new $.CTopoLink(self);
        var m_oCTopoEvent = new $.CTopoEvent(self);

        this.Api = new $.CTopoApi(self);
        this.DB = new $.CTopoDB(self);
        this.m_oDicImg = { };

        //endregion

        //region init

        this.init = function(strContainerId, arrImg){
            //1.initRenderer
            self.m_oRenderer = self.Renderer.initRenderer(strContainerId);

            //2.initScene
            self.m_oScene = m_oCTopoScene.initScene();

            //3.initLight
            m_oCTopoLight.initLight(self.m_oScene);

            //4.initCamera
            self.m_oCamera = m_oCTopoCamera.initCamera();

            //5._initRegImg
            for(var i = 0; i < arrImg.length; i++){
                _regImg(arrImg[i]);
            }
        };

        //endregion

        //region draw

        this.draw = function(arrNodes, arrLinks){
            //1.initCache
            self.DB.initCache(arrNodes, arrLinks);

            var oLight = self.m_oScene.children[0];
            self.m_oScene.children = [];
            self.m_oScene.children[0] = oLight;

            //1.drawNode
            m_oCTopoNode.drawNode(self.m_oScene, self.m_oDicImg, arrNodes, function(arrMeshNodes){

                //2.drawLink
                var arrMesh4Links = m_oCTopoLink.drawLink(self.m_oScene, self.m_oDicImg, arrNodes, arrLinks );

                //3.initEvent
                m_oCTopoEvent.initEvent(self.m_oCamera, self.m_oRenderer, arrMeshNodes, arrMesh4Links);

                //4.render
                self.Renderer.render(self.m_oCamera, self.m_oScene, self.m_oRenderer);
            });
        };

        //endregion

        //region _regImg

        var _regImg = function(strImgPath){
            //var loader = new THREE.TextureLoader();
            //loader.load(strImgPath, function(oTexture){
            //    self.m_oDicImg[strImgPath] = oTexture;
            //});

            var oMtlLoader = new THREE.MTLLoader();
            oMtlLoader.load(strImgPath + '.mtl', function(oMaterials){
                oMaterials.preload();
                self.m_oDicImg[strImgPath] = oMaterials;
            });
        };

        //endregion
    }
})(jQuery);
