## 困惑

-[x] 不明白下面代码为什么能执行
```JavaScript
document.querySelector(`audio[data-key="${e.keyCode}"]`)
```
查阅 [Stackoverflow](http://stackoverflow.com/questions/41291052/whats-wrong-with-queryselector) 明白，用法的`ES6`的占位符效果，可以写成

```javascript
document.querySelector('audio[data-key="'+e.keyCode+'"]')
```



-[ ] ​箭头函数

