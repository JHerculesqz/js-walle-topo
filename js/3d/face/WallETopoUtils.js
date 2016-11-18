/**
 * Created by JHercules on 2016/11/7.
 */
function FaceUtils(){
    //#region Fields

    this.api;

    //#endregion

    //#region init

    this.init = function (strAppId, strAppPwd) {
        this.api = new FacePP(strAppId, strAppPwd, {
                apiURL: 'http://apicn.faceplusplus.com/v2'
            });
    };

    //#endregion
    
    //#region detect
    
    this.detect = function (strImgUrl, oResCallback) {
        this.api.request('detection/detect', {
            url: strImgUrl
        }, function(err, result) {
            if (err) {
                console.log('载入失败');
                return;
            }
            oResCallback(result);
        });
    };
    
    //#endregion
}
var faceUtils = new FaceUtils();