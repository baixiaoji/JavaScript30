# 01 JavaScript Drum Kit 中文指南

> 作者：© [白霁baixiaoji](https://github.com/baixiaoji)
> 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。笔者是完成30天项目后，开始写这一系列的指南，现在你看到的是第 1 篇。完整指南在 [GitHub](https://github.com/baixiaoji/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

模拟了架子鼓出声，根据用户在键盘按下`ASDFGHJKL`这几个键时，页面上与之对应的按钮变大变亮，相对的鼓声也响起来。[可看看在线的效果](https://baixiaoji.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/index-baixiaoji.html)

## 核心要点

1. 键盘的键码，推荐[显示键码](http://keycode.info/)网站
2. 播放声音
3. 改变样式

## 实现思路
1. **监听键盘事件**。在window上绑定`keydown`事件
2. **对应事件处理程序**
   - 获取键码 ( 明白所有关于事件的信息都在`event`里 )
   - 根据键码获取对应元素（`querySelector` 搭配 `data-key`使用 ）
   - 改变元素状态（播放音频，改变样式）
3. **给每个`div.key`元素绑定`transitionend`事件**
   - 获取所有类为`key`的元素 （nodeList  ===> Array）
   - 绑定事件
4. **去除样式的事件处理程序**

## 一些可能你不知道的语法

### ES 6 部分语法

1. `const`：申明一个只读的常量，只能赋值一次，需要在申明时就复制，不然会报错
2. \`字符串 ${ 变量、属性名 } \`：模板字面量(Template literals)是允许嵌入表达式的字符串字面量（源自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)）。我的理解是帮助我们以后不用拼接字符串咯😄，例子如下：

```Javascript
	var name = "baixiaoji";
	// 不知道之前，可能写过这样的代码，甚至更加复杂的
	var htmlTemp = '<a href="#">我的名字是' + name + '</a>'
	// 使用模版字面量后
	var htmlTemp = `<a href="#">我的名字是${name}</a>`
```
3. 箭头函数：主要注意一下，请注意他的`this`指向问题，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
```JavaScript
  var a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl lium"
  ];
  var a2 = a.map(function(s){ return s.length });

  var a3 = a.map( s => s.length );
```
### 神奇的`forEach`
以前nodeList是没有`forEach`方法的。但现在不管什么类型都有了[forEach方法](https://developer.mozilla.org/zh-CN/search?q=forEach)

## 难点
### 如何获取对应的页面按钮？
在思路中，有涉及一个可以获取`keyCode`的网站。而当你看整个起始页面的时候，发现每一个`div`和`audio`标签都有一个`data-key`的属性，而且里面存的就是相对应的键码。这样做的目的就是，在页面监听`keydown`事件的时候，获取页面有没有这个元素，继而操作样式以及音频。
```JavaScript
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
	const key = document.querySelector(`audio[data-key="${e.keyCode}"]`)
```
### 当按键被按住不放时，如何保证鼓声连续响起？
每次播放音频之前，将播放的时间设置为 0
```JavaScript
	const audio = document.querySelector(".audio")
	audio.currentTime = 0
	audio.play();
	// 想看audio有什么属性和方法 记得打开控制台哦😆
	console.dir(audio)
```
### 改变样式的时间点在那里？或绑定那一个事件？
其实我自己在过去的，只用过鼠标和键盘的事件，这次看到这个，心里淡淡的笑了一下，有意思的一个事件。言归正传：监听过后。改变了`div`的样式，请看他的样式是怎么写的
```CSS
.key {
  ...
  transition: all .07s ease;
  ...
}
```
居然还有一个事件就叫做`transitionend`的（你想得到吗？），他的作用是在`CSS transition`结束后触发，[具体信息](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)

原本想写成是自己的回顾，一不小心写成了教程了😵。之后可能往回顾的方向写。


