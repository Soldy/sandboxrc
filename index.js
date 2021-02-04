/*
 *  @Soldy\sandboxrc\2021.02.04\GPL3
 */
'use strict';

/*
 * @param {object} testIn 
 * @prototype
 */
const sandboxBase = function(testIn){
    /*
     * @public
     * return object
     */
    this.check = async function(testsIn){
        tests = testsIn;
        await run();
        return {
            time,
            startTime,
            endTime,
            result,
            value,
            error,
            complete
        };
    };
    /*
     * @private
     * @var any
     */
    let test = testIn;
    /*
     * @private
     * @var object
     */
    let tests = {};
    /*
     * @private
     * @var object 
     */
    let error = false;
    /*
     * @private
     * @var object 
     */
    let value = false;
    /*
     * @private
     * @var object 
     */
    let result = 0;
    /*
     * @private
     * @var integer unixmicrotimestamp
     */
    let time = 0;
    /*
     * @private
     * @var unixmicrotimestamp
     */
    let startTime;
    /*
     * @private
     * @var unixmicrotimestamp
     */
    let endTime = 0;
    /*
     * @private
     * @var boolean
     */
    let complete = false;
    /*
     * @param string {test}
     * @private
     * @var boolean
     *
     */
    const runString = function(){
        startTime = parseInt(+new Date());
        eval('value = ' + test.test);
        endTime = parseInt(+new Date());
    };
    /*
     * @param object {test}
     * @private
     * @var boolean
     *
     */
    const runObject = async function (){
        if(
            (typeof test.test.options === 'undefined')||
            (1 > test.test.options.length)
        ){
            startTime = parseInt(+new Date());
            value = await test.test['function']();
        }else{
            startTime = parseInt(+new Date());
            value = await test.test['function'](...test.test.options);
        }
        endTime = parseInt(+new Date());
    };
    /*
     * @param function {test}
     * @private
     * @var boolean
     *
     */
    const runLegacy = async function(){
        startTime = parseInt(+new Date());
        value = await test.test();
        endTime = parseInt(+new Date());
    };
    /*
     * @param any {test}
     * @private
     * @var boolean
     *
     */
    const run = async function(){
        try { 
            if(typeof test.test === 'undefined'){
                result = 4;
            }else if(typeof test.test === 'string'){
                await runString();
            }else if(typeof test.test === 'object'){
                if(typeof test.test['function'] === 'undefined'){
                    result = 4;
                } else 
                    await runObject();
            }else{
                await runLegacy();
            }
            complete = true;
        }catch(e){
            result = 3;
            error = e;
        }
        if (endTime === 0)
            endTime = parseInt(+new Date());
        time = Math.abs(parseInt(endTime - startTime)).toString();
        return true;
    };
};


exports.base = sandboxBase;
