/**
 * Created by zhangxincheng on 2016/11/18.
 */
function LeapUtils() {
    //#region Fields

    var TO_RAD = Math.PI / 180;
    var TO_DEG = 1 / TO_RAD;

    //#endregion

    //#region init

    this.init = function (oCallback) {
        Leap.loop({
            // frame callback is run before individual frame components
            frame: function (frame) {

            },
            // hand callbacks are run once for each hand in the frame
            hand: function (hand) {
                oCallback(hand.type, hand.id, Math.round(hand.roll() * TO_DEG));
            }
        });
    };

    //#endregion
}
var leapUtils = new LeapUtils();