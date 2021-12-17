// function One(obj){
//     this.name = obj.name
//     this.age = obj.age
//   }
//   One.prototype.say = function(){
//       console.log(1)
//   }
//   function two(obj){
//       One.call(this,obj)
      
//   }
//   two.prototype = One.prototype
//   console.log(new two({"name":"wuyz","age":18}).say())
Function.prototype.mycall = function(context,...args){
    let ctx = context || window
    ctx.fn = this
    let result = ctx.fn(...args)
    delete ctx.fn
    return result
}

Function.prototype.myapply = function(context,arr){
    if(typeof this != Function){
        throw Error("not a function")
    }
    let ctx = context || window
    ctx.fn = this
    let res = ctx.fn(...arr)
    delete ctx.fn
    return res

}
Function.prototype.mybind = function(){
    if(arguments.length<1){
        throw Error("参数有误")
    }
        context = [].shift.call(arguments), // 保存需要绑定的this上下文,shift会吧第一个参数弹出去
        // 剩余的参数转为数组，slice会复制
         args = [].slice.call(arguments);     
        var self = this      // 保存原函数  
        return function () {                    // 返回一个新函数，由于是apply需要传入数组，所以需要用concat方法把这两个连接起来
            // self.apply(context,[].concat.call(args, [].slice.call(arguments)));
            self.apply(context,[...args].concat([...arguments]));
        }

}
// function test(a){
//     console.log(this.name)
//     console.log([...arguments])
//     console.log(a)
// }
function testbind(a,b,c){
    console.log(this.name)
    console.log([...arguments])
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(a + b + c)
}
obj = {
    name:"wuyz"
}
// test.mycall(obj,1,2)
// test.mycall(obj,[1,2])
var tmp = testbind.mybind(obj,10)
tmp(20,30)

Function.prototype.mybind2 = function(){
    let self = this
    let context = [].shift.call(arguments)
    let arg = [].slice.call(arguments)
    return function(){
        self.apply(context,[].concat.call(arg,[...arguments]))
    }
}
var tmp2 = testbind.mybind2(obj,10)
tmp2(20,30)