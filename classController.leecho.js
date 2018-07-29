! function (root, _h) {
    'use strict';
    var interfaces = {};
    var addClass = function (element, value) {
        if( !_isValidElement(element)){
            throw new TypeError('첫 번쨰 매개변수는 HTML 요소여야 합니다. first parameter is required as HTML element');
        }
        if( !_isValidClassName(value)){
            throw new TypeError('두 번째 매개변수는 String 이여야 합니다. second parameter is required as String Type');
        }
        return _addClassToHTML(element,_convertStringToArray(value));
    };
    var removeClass = function (element, value) {
        if( !_isValidElement(element)){
            throw new TypeError('첫 번쨰 매개변수는 HTML 요소여야 합니다. first parameter is required as HTML element');
        }
        if( !_isValidClassName(value)){
            throw new TypeError('두 번째 매개변수는 String 이여야 합니다. second parameter is required as String Type');
        }
        return _removeClassToHTML(element,_convertStringToArray(value));
    };
    var _isValidElement = function (value) {
        return _h.isHTML(value);
    };
    var _isValidClassName = function (value) {
        return _h.isString(value);
    };
    var _convertStringToArray = function (value) {
        var parsedArray = value.split(/\s+/);
        var returnArray = [];
        for (var i = 0; i < parsedArray.length; i++) {
            var classNameString = parsedArray[i]
            if (_h.isEmpty(classNameString)) {
                continue;
            }
            returnArray.push(classNameString);
        }
        return returnArray;
    };
    var _addClassToHTML = function (element, classArray) {
        var elementClassName = _extractClassName(element); //string
        for (var i = 0; i < classArray.length; i++) {
            var targetClassName = classArray[i];
            if (!_isContainClass(elementClassName, targetClassName)) {
                elementClassName += ' '+targetClassName;
            }
        }
        element.className = _trim(elementClassName);
        return true;
    };
    var _removeClassToHTML = function (element, classArray) {
        var elementClassName = _extractClassName(element)
        for (var i = 0; i < classArray.length; i++) {
            var targetClassName = classArray[i];
            if (_isContainClass(elementClassName, targetClassName)) {
                elementClassName = elementClassName.replace(targetClassName, '');
            }
        }
        element.className = _trim(elementClassName);
        return true;
    };

    var _isEqualString = function (stringA, stringB) {
        return stringA === stringB;
    };
    var _extractClassName = function (element) {
        return element.className || '';
    };
    var _isContainClass = function (origin, value) {
        if( _h.isEmpty(origin)){
            return false;
        }
        var originClassName = _convertStringToArray(origin);
        for(var i = 0; i < originClassName.length; i ++){
            if( originClassName[i] === value){
                return true;
            }
        }
        return false;
    };
    var _trim = function(value){
        return value.replace(/^\s+|\s$/,'');
    }
    root.addClass = addClass;
    root.removeClass = removeClass;
}(window, helper);