var obj = [
    {
        id:1,
        name:"wuyz"

},
{
    id:2,
    name:"lzl"

}
]
// foreach方法没有返回值
var result1 = obj.forEach(item=>{
    console.log(item)
})
console.log("foreach方法没有返回值,因此结果是：result1" + result1)
console.log("=======================================")
// map会改变原数组并且返回新的一个数组，因为返回新数组所以需要return
var result2 = obj.map(item=>{
    return item.id = item.id*2
    // return item
})
console.log(obj)
console.log("map会改变原数组并且返回新的一个数组，因为返回新数组所以需要return" + result2)
console.log("=======================================")
// filter不会改变原数组并且返回新的一个数组，因为返回新数组所以需要return
var result3 = obj.filter(item=>{
    return item.id > 3
})
console.log(obj)
console.log( " filter不会改变原数组并且返回新的一个数组，因为返回新数组所以需要return" )
console.log(result3)
console.log("=======================================")
var result4 = obj.find(item=>{
    return item.id == 2
})
console.log(obj)
console.log( " filter不会改变原数组并且返回新的第一个满足条件的元素，因为返回新元素所以需要return" )
console.log(result4)