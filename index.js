/*
 *  @Soldy\sandboxrc\2021.02.04\GPL3
 */
'use strict';

/*
 * @param {object} testIn 
 * @prototype
 */
const sandboxBase = function(test_in){
    /*
     * @public
     * return object
     */
    this.check = async function(tests_in){
        _tests = tests_in;
        await _run();
        return {
            time:_time,
            startTime:_start_time,
            endTime:_end_time,
            result:_result,
            value:_value,
            error:_error,
            complete:_complete
        };
    };
    /*
     * @private
     * @var any
     */
    let _test = test_in;
    /*
     * @private
     * @var object
     */
    let _tests = {};
    /*
     * @private
     * @var object 
     */
    let _error = false;
    /*
     * @private
     * @var object 
     */
    let _value = false;
    /*
     * @private
     * @var object 
     */
    let _result = 0;
    /*
     * @private
     * @var integer unixmicrotimestamp
     */
    let _time = 0;
    /*
     * @private
     * @var unixmicrotimestamp
     */
    let _start_time;
    /*
     * @private
     * @var unixmicrotimestamp
     */
    let _end_time = 0;
    /*
     * @private
     * @var boolean
     */
    let _complete = false;
    /*
     * @param string {test}
     * @private
     * @var boolean
     *
     */
    const _runString = function(){
        _start_time = parseInt(+new Date());
        eval('_value = ' + _test.test);
        _end_time = parseInt(+new Date());
    };
    /*
     * @param object {test}
     * @private
     * @var boolean
     *
     */
    const _runObject = async function (){
        if(
            (typeof _test.test.options === 'undefined')||
            (1 > _test.test.options.length)
        ){
            _start_time = parseInt(Date.now());
            _value = await _test.test['function']();
        }else{
            _start_time = parseInt(Date.now());
            _value = await _test.test['function'](..._test.test.options);
        }
        _end_time = parseInt(Date.now());
    };
    /*
     * @param function {test}
     * @private
     * @var boolean
     *
     */
    const _runLegacy = async function(){
        _start_time = parseInt(Date.now());
        _value = await _test.test();
        _end_time = parseInt(Date.now());
    };
    /*
     * @param any {test}
     * @private
     * @var boolean
     *
     */
    const _run = async function(){
        try { 
            if(typeof _test.test === 'undefined'){
                _result = 4;
            }else if(typeof _test.test === 'string'){
                await _runString();
            }else if(typeof _test.test === 'object'){
                if(typeof _test.test['function'] === 'undefined'){
                    _result = 4;
                } else 
                    await _runObject();
            }else{
                await _runLegacy();
            }
            _complete = true;
        }catch(e){
            _result = 3;
            _error = e;
        }
        if (_end_time === 0)
            _end_time = parseInt(+new Date());
        _time = Math.abs(parseInt(_end_time - _start_time)).toString();
        return true;
    };
};


exports.base = sandboxBase;
