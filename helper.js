! function (root) {
    "use strict";

    var BOOLEAN_TYPE = 'boolean';
    var STRING_TYPE = 'string';
    var NUMBER_TYPE = 'number'
    var FUNCTION_TYPE = 'function';
    var UNDEFINED_TYPE = 'undefined';

    var REGEXP_OBJECT_NULL = /^\[object Null]$/;
    var REGEXP_OBJECT_OBJECT = /^\[object Object]$/;
    var REGEXP_OBJECT_ARRAY = /^\[object Array]$/;
    var REGEXP_OBJECT_HTML = /^\[object HTML[a-zA-Z]+Element]$/;
    var REGEXP_EMPTY_STRING = /^\s?$/;

    var Helper = function () {};

    Helper.prototype = {
        isBoolean: function (value) {
            return _isBoolean(value);
        },
        isString: function (value) {
            return _isString(value);
        },
        isNumber: function (value) {
            return _isNumber(value);
        },
        isFunction: function (value) {
            return _isFunction(value);
        },
        isNullable: function (value) {
            return _isNullable(value)
        },
        isLiteralObject: function (value) {
            return _isLiteralObject(value)
        },
        isArray: function (value) {
            return _isArray(value);
        },
        isHTML: function (value) {
            return _isHTML(value);
        },
        /**
         * @param value {string | literal object | array | HTML Elements}
         * @return {boolean}
         */
        isEmpty: function (value) {
            if (_isString(value)) {
                return REGEXP_EMPTY_STRING.test(value)
            }
            if (_isArray(value)) {
                return value.length === 0;
            }
            if (!_isLiteralObject(value)) {
                throw new TypeError('값의 자료형이 올바르지 않습니다. Value type is invalid');
            }
            return _getObjectSize(value) === 0;
        }
    };

    var _getObjectSize = function (value) {
        var keyCount = 0;
        for (var keyName in value) {
            if (value.hasOwnProperty(keyName)) {
                keyCount++;
            }
        }
        return keyCount;
    };
    var _isBoolean = function (value) {
        return _isEqualType(value, BOOLEAN_TYPE);
    };
    var _isString = function (value) {
        return _isEqualType(value, STRING_TYPE);
    };
    var _isNumber = function (value) {
        return _isEqualType(value, NUMBER_TYPE);
    };
    var _isFunction = function (value) {
        return _isEqualType(value, FUNCTION_TYPE);
    };
    var _isNullable = function (value) {
        return (_isEqualRegExpObjectType(value, REGEXP_OBJECT_NULL) || _isEqualType(value, UNDEFINED_TYPE));
    };
    var _isArray = (Array.isArray) ?
        Array.isArray :
        function (value) {
            return _isEqualRegExpObjectType(value, REGEXP_OBJECT_ARRAY);
        };
    var _isHTML = function (value) {
        return _isEqualRegExpObjectType(value, REGEXP_OBJECT_HTML);
    };
    var _isLiteralObject = function (value) {
        return _isEqualRegExpObjectType(value, REGEXP_OBJECT_OBJECT);
    };
    var _isEqualRegExpObjectType = function (value, regExp) {
        return regExp.test(Object.prototype.toString.call(value));
    };
    var _isEqualType = function (value, typeString) {
        return typeof value === typeString;
    };

    root.helper = new Helper();
}(window);