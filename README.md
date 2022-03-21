# sandboxrc

Function runner sandbox. Builded for the nanoTest (what is not so nano any more)

## init 



```javascript

const sandboxBase = require('sandboxrc').sandboxBase;
let sandbox = new sandboxBase({
    'name'     : 'top',
    'test'     : {
          'function' : function(){},
          'options'  :[
              'two2'
           ]
     }
});
```


## run a check

```javascript
sandbox.check();

```



