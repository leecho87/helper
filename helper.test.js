! function (root, _h) {
    var testCount = 0;
    var successCount = 0;
    var failCount = 0;
    var runTest = function (actual, expect, throwable) {
        var evalActual;
        try {
            evalActual = eval(actual);
        } catch (error) {
            if (throwable === true) {
                evalActual = expect = '오류';
            } else {
                evalActual = error;
            }
        }
        console.log(
            actual,
            '[actual]',
            evalActual,
            '[expect]',
            expect
        );
        testCount++;
        if (evalActual === expect) {
            successCount++;
            return console.log("%c [성공]", "color:#0c0");
        }
        failCount++;
        return console.log("%c [실패]", "color:#f00");
    };

    console.log('helper 기능 test 시작!');
    console.log('helper 객체');
    console.log(_h);

    runTest('_h.isBoolean(1)', false);
    runTest('_h.isBoolean(!1)', true);
    runTest('_h.isBoolean(true)', true);
    runTest('_h.isBoolean("true")', false);
    runTest('_h.isBoolean(undefined)', false);

    runTest('_h.isString("")', true);
    runTest('_h.isString(1)', false);
    runTest('_h.isString(1 + "")', true);
    runTest('_h.isString(undefined)', false);
    runTest('_h.isString(null)', false);
    runTest('_h.isString([])', false);
    runTest('_h.isString({})', false);

    runTest('_h.isNumber("")', false);
    runTest('_h.isNumber(1)', true);
    runTest('_h.isNumber(1 + "")', false);
    runTest('_h.isNumber(undefined)', false);
    runTest('_h.isNumber(null)', false);
    runTest('_h.isNumber([])', false);
    runTest('_h.isNumber({})', false);

    runTest('_h.isFunction("")', false);
    runTest('_h.isFunction(1)', false);
    runTest('_h.isFunction(1 + "")', false);
    runTest('_h.isFunction(undefined)', false);
    runTest('_h.isFunction(null)', false);
    runTest('_h.isFunction([])', false);
    runTest('_h.isFunction(function(){})', true);

    runTest('_h.isNullable("")', false);
    runTest('_h.isNullable(1)', false);
    runTest('_h.isNullable(1 + "")', false);
    runTest('_h.isNullable(undefined)', true);
    runTest('_h.isNullable(null)', true);
    runTest('_h.isNullable([])', false);
    runTest('_h.isNullable(function(){})', false);

    runTest('_h.isLiteralObject("")', false);
    runTest('_h.isLiteralObject(1)', false);
    runTest('_h.isLiteralObject(1 + "")', false);
    runTest('_h.isLiteralObject(undefined)', false);
    runTest('_h.isLiteralObject(null)', false);
    runTest('_h.isLiteralObject([])', false);
    runTest('_h.isLiteralObject(function(){})', false);
    runTest('_h.isLiteralObject({})', true);

    runTest('_h.isArray("")', false);
    runTest('_h.isArray(1)', false);
    runTest('_h.isArray(1 + "")', false);
    runTest('_h.isArray(undefined)', false);
    runTest('_h.isArray(null)', false);
    runTest('_h.isArray([])', true);
    runTest('_h.isArray(function(){})', false);
    runTest('_h.isArray({})', false);

    runTest('_h.isEmpty(undefined)', '오류', true);
    runTest('_h.isEmpty("")', true);
    runTest('_h.isEmpty(" ")', true);

    console.log('총 성공', successCount , '/', testCount, '(실패 : ' , failCount,')');
}(window, helper);