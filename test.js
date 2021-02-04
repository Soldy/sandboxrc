
const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const sandboxBase = require('./index.js').base;


nanoTest.add(
    'check simple ',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
                'test'     : {
                    'function' : function(){
                       return 'two2';
                    },
                    'options'  :[
                       'two2'
                    ]
                }
            });
            let out = await sandbox.check();
            return out.value;
        }
    },
    '===',
    'two2'
);
nanoTest.add(
    'check error',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
                'test'     : {
                    'function' : ()=>{
                        nofunction();
                    },
                    'options'  :[]
                },
            });
            let out = await sandbox.check();
            return out.result;
        }
    },
    '===',
    3
);
nanoTest.add(
    'check undefined test',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
            });
            let out = await sandbox.check();
            return out.result;
        }
    },
    '===',
    4
);
nanoTest.add(
    'check undefined function',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
                'test'     : {
                    'options'  :[]
                }
            });
            let out = await sandbox.check();
            return out.result;
        }
    },
    '===',
    4
);
nanoTest.add(
    'check String',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
                'test'     :  '(()=>{ return "string";})()',
            });
            let out = await sandbox.check();
            return out.value;
        }
    },
    '===',
    'string'
);
nanoTest.add(
    'check Legacy',
    {
        'function':async ()=>{
            let sandbox = new sandboxBase({
                'name'     : 'top',
                'test'     : function(){
                       return 'Legacy';
                },
            });
            let out = await sandbox.check();
            return out.value;
        }
    },
    '===',
    'Legacy'
);
nanoTest.run();
