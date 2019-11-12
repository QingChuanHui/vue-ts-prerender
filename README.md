# hzx-backstage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### ts config
```
"trailing-comma": false, // 是否强象添加逗号
"prefer-conditional-expression": false, // for (... in ...)语句必须用if语句过滤
"no-console": true, //不能使用console
"no-floating-promises": false, //必须正确处理promise的返回函数
"no-for-in-array": false, //不允许使用for in 遍历数组
"no-implicit-dependencies": false, //不允许在项目的package.json中导入未列为依赖项的模块
"no-inferred-empty-object-type": false, //不允许在函数和构造函数中使用{}的类型推断
"no-invalid-template-strings": true, //警告在非模板字符中使用$
"no-invalid-this": true, //不允许在非class中使用 this关键字
"no-null-keyword": false, //不允许使用null关键字
"no-object-literal-type-assertion": false, //禁止object出现在类型断言表达式中
"no-return-await": true, //不允许return await
"arrow-parens": false, //箭头函数定义的参数需要括号
"adjacent-overload-signatures": false, //  Enforces function overloads to be consecutive.
"ban-comma-operator": true, //禁止逗号运算符。
"no-any": false, //不需使用any类型
"no-empty-interface": true, //禁止空接口 {}
"no-internal-module": true, //不允许内部模块
"no-magic-numbers": false, //不允许在变量赋值之外使用常量数值。当没有指定允许值列表时，默认允许-1,0和1
"no-namespace": [true, "allpw-declarations"], //不允许使用内部modules和命名空间
"no-non-null-assertion": true, //不允许使用!后缀操作符的非空断言。
"no-parameter-reassignment": true, //不允许重新分配参数
"no-reference": true, // 禁止使用/// <reference path=> 导入 ，使用import代替
"no-unnecessary-type-assertion": false, //如果类型断言没有改变表达式的类型就发出警告
"no-var-requires": true, //不允许使用var module = require("module"),用 import foo = require('foo')导入
"prefer-for-of": true, //建议使用for(..of)
"promise-function-async": false, //要求异步函数返回promise
"max-classes-per-file": [true, 1], // 一个脚本最多几个申明类
"variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore"],// 强制空格用法，// if else for while 后面接一个空格// 变量赋值的 = 两侧加空格// 运算符两侧加空格// 分隔符后加空格，<,|/|;>// 变量类型声明前加空格
"indent": [true, "spaces", 2],
"quotemark": [true, "single"],
"interface-name": false,
"ordered-imports": false,
"no-consecutive-blank-lines": true,
// 强制单行注释格式：'//' 后必跟空格
"comment-format": [true, "check-space"],
// 任何情况下，if / for / do / while 后必须通过 {} 包裹代码块
"curly": true,
// 文件必须用新的行结束
"eofline": true,
// 当使用 for in 语句遍历 object 时，强制使用 if 判断 key 是否由原型链继承 hasOwnProperty
"forin": true,
// 禁止数组中的模块全量引入，如：rxjs，需要导入其具体子模块
"import-blacklist": [true, "rxjs/Rx"],
// import { ModuleName } 确保 ModuleName 两端留有空格
"import-spacing": true,
// 声明 interface 接口，代替 type 关键字声明类型
"interface-over-type-literal": true,
// ？label 是个什么东西？只允许 labels 在 do / for / while / switch 的声明中
"label-position": true,
// 一行代码长度最长不超过 140 字符
"max-line-length": [true, 140],
// 不强制要求 class 的成员声明，例如：private || public
"member-access": false,
// 要求 class 内成员的声明顺序，不能乱放，静态属性，实例属性，静态方法，实例方法
"member-ordering": [
  true,
  {
    "order": ["static-field", "instance-field", "static-method", "instance-method"]
  }
],
// 不允许使用 arguments.callee
"no-arg": true,
// 禁止使用位操作符，
// Specifically, the following bitwise operators are banned: &, &=, |, |=, ^, ^=, <<, <<=, >>, >>=, >>>, >>>=, and ~.
// This rule does not ban the use of & and | for intersection and union types.
"no-bitwise": true,
// 不许用 new Number() String Boolean 等基础类型的构造函数，允许使用函数式调用 Number(<string>)
// More details: https://stackoverflow.com/questions/4719320/new-number-vs-number
"no-construct": true,
// 不许用 debugger
"no-debugger": true,
// 不允许两次调用 super 函数
"no-duplicate-super": true,
// 不许有空代码块 {}
"no-empty": false,
// 不许用 eval 函数
"no-eval": true,
// 声明立即被赋值的基础类型不需要声明变量类型，let state: boolean = false 删除类型声明
"no-inferrable-types": [true, "ignore-params"],
// 不要为 interface 定义 constructor 函数
"no-misused-new": true,
// Disallows non-null assertions using the ! postfix operator.
// 不许使用 params1!.func() 的语法校验参数值是否存在
// (instance, instances) => {return instances.filter((instance)=>instance.neighbors.includes(instance))}
// Disallows shadowing variable declarations.
"no-shadowed-variable": true,
// 推荐使用 obj.property 代替 obj["property"]，但是 obj["prop-erty"] 是被允许的
"no-string-literal": false,
// 不允许直接 throw 一个字符串字面量
// if (!productToAdd) {
// throw new Error("How can I add new product when no value provided?");
// }
"no-string-throw": true,
// 不允许使用 fall through，两个 switch case 之间没有 break 做分割
"no-switch-case-fall-through": true,
// 代码行尾不允许有空格
"no-trailing-whitespace": true,
// 不允许做 var|let unn = undefined 这种无意义赋值
"no-unnecessary-initializer": true,
// 禁止 unused expression
// 参考：https://eslint.org/docs/rules/no-unused-expressions
"no-unused-expression": true,
// 禁止声明前使用变量，针对 var 变量提升问题
"no-use-before-declare": true,
// 不许使用 var 声明变量
"no-var-keyword": true,
// Checks ordering of keys in object literals.
// 检查对象 key 的声明顺序
"object-literal-sort-keys": false,
// 检查流程控制代码的衔接部分和空格
"one-line": [true, "check-open-brace", "check-catch", "check-else", "check-whitespace"],
// 优先使用 const 声明变量
"prefer-const": true,
// 使用 parseInt 时需要定义 radix 参数
"radix": true,
// 每个声明后强制 ;
"semicolon":false,
// 强制用 === 替换 ==
"triple-equals": [true, "allow-null-check"],
// 冒号左侧的空格数量，下面的列表中全部不要空格，
// "call-signature" checks return type of functions.
// "index-signature" checks index type specifier of indexers.
// "parameter" checks function parameters.
// "property-declaration" checks object property declarations.
// "variable-declaration" checks variable declaration.
"typedef-whitespace": [
  true, {
    "call-signature": "nospace",
    "index-signature": "nospace",
    "parameter": "nospace",
    "property-declaration": "nospace",
    "variable-declaration": "nospace"
  }
],
// 校验两个重载函数是否可以通过 ;;rest 参数合并 (...params) => arguments
"unified-signatures": true,

"whitespace": [true, "check-branch", "check-decl", "check-operator", "check-separator", "check-type"],
// FROM Codelyzer: Angular 表达式内的空格检查
// ? checks for whitespace before and after the interpolation characters
"angular-whitespace": [true, "check-interpolation"],
// Disallows using of ViewEncapsulation.None
// ？不允许视图封装.None？
"use-view-encapsulation": true,
// 确保正确的生命周期函数声明
"contextual-life-cycle": true,
// ? () 需要包裹在 [] 内
"banana-in-box": true,
// 事件绑定不使用 'on-' 前缀
"no-output-on-prefix": true,
// 使用 class 中的 @Input 声明输入属性，而不是在元数据结构中
"use-input-property-decorator": true,
// 同上，使用 @output 声明对外输出的数据变量
"use-output-property-decorator": true,
// 使用 @HostProperty 而不是声明元数据
"use-host-property-decorator": true,
// 禁止输入属性重命名
"no-input-rename": true,
// 同上，output
"no-output-rename": true,
// 显式声明组件实例化使用的 生命周期钩子函数
"use-life-cycle-interface": true,
// 管道指令需要声明实现 PipeTransform 接口
"use-pipe-transform-interface": true,
// 组件和指令命名，需要包含关键字 'Component' || 'Direction'
"component-class-suffix": true,
"directive-class-suffix": true
```
