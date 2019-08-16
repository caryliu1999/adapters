const utils = require('./utils');

if (window.__globalAdapter) {
    let globalAdapter = window.__globalAdapter;
    // SystemInfo
    utils.cloneMethod(globalAdapter, my, 'getSystemInfoSync');

    // TouchEvent
    // my.onTouchStart register touch event listner on body
    // need to register on canvas
    globalAdapter.onTouchStart = function (cb) {
        window.canvas.addEventListener('touchstart', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchMove = function (cb) {
        window.canvas.addEventListener('touchmove', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchEnd = function (cb) {
        window.canvas.addEventListener('touchend', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchCancel = function (cb) {
        window.canvas.addEventListener('touchcancel', function (res) {
          cb && cb(res);
        });
    };
    
    // Audio
    utils.cloneMethod(globalAdapter, my, 'createInnerAudioContext');

    // FrameRate
    utils.cloneMethod(globalAdapter, my, 'setPreferredFramesPerSecond');

    // Keyboard
    utils.cloneMethod(globalAdapter, my, 'showKeyboard');
    utils.cloneMethod(globalAdapter, my, 'hideKeyboard');
    utils.cloneMethod(globalAdapter, my, 'updateKeyboard');
    utils.cloneMethod(globalAdapter, my, 'onKeyboardInput');
    utils.cloneMethod(globalAdapter, my, 'onKeyboardConfirm');
    utils.cloneMethod(globalAdapter, my, 'onKeyboardComplete');
    utils.cloneMethod(globalAdapter, my, 'offKeyboardInput');
    utils.cloneMethod(globalAdapter, my, 'offKeyboardConfirm');
    utils.cloneMethod(globalAdapter, my, 'offKeyboardComplete');

    // Message
    utils.cloneMethod(globalAdapter, my, 'getOpenDataContext');
    utils.cloneMethod(globalAdapter, my, 'onMessage');

    // Subpackage
    utils.cloneMethod(globalAdapter, my, 'loadSubpackage');

    // SharedCanvas
    utils.cloneMethod(globalAdapter, my, 'getSharedCanvas');

    // Font
    globalAdapter.loadFont = function (url) {
        if (my.loadFont) {
            return my.loadFont(url);
        }
        else {
            console.warn('loadFont not support yet');
            return null;
        }
    };

    // hide show Event
    utils.cloneMethod(globalAdapter, my, 'onShow');
    utils.cloneMethod(globalAdapter, my, 'onHide');

    // Accelerometer
    let accelerometerCallback = null;
    let systemInfo = my.getSystemInfoSync();
    let windowWidth = systemInfo.windowWidth;
    let windowHeight = systemInfo.windowHeight;
    let isLandscape = windowWidth > windowHeight;
    function accelerometerChangeCallback (res, cb) {
        let resClone = {};
                
        let x = res.x;
        let y = res.y;
        
        if (isLandscape) {
            let tmp = x;
            x = -y;
            y = tmp;
        }
        
        resClone.x = x;
        resClone.y = y;
        resClone.z = res.z;
        accelerometerCallback && accelerometerCallback(resClone);
    }
    Object.assign(globalAdapter, {
        startAccelerometer (cb) {
            accelerometerCallback = cb;
            my.onAccelerometerChange && my.onAccelerometerChange(accelerometerChangeCallback);
        },

        stopAccelerometer () {
            my.offAccelerometerChange && my.offAccelerometerChange(accelerometerChangeCallback);
        },
    });
}