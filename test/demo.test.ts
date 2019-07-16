// https://github.com/power-assert-js/espower-typescript
import * as assert from 'power-assert'

const obj = {  
  arr: [1,2,3],  
  number: 10
}

describe('使用pow-assert', () => { 
  it('使用power-assert的情况， done', () => {    
    assert(obj.arr[0] === 1)     // 用assert就可以
  });

  it('使用power-assert的情况， fail', () => {    
    assert(obj.arr[0] === obj.number)     // 用assert就可以
  });
});