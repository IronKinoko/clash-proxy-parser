# clash proxy parser

基于 Clash for Windows 编写

预处理各家提供的 clash 配置，转换成统一的配置

- 提供指定节点、自动选择、故障转移、香港、台湾、美国、日本分组
- 使用 [Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules) 规则集

## 使用方法

1. 进入 Settings 界面
2. 滚动至 Profiles 栏
3. 点击 Parsers 右边 Edit 打开编辑器，填入：

```yaml
parsers:
  - reg: ^.*$
    remote:
      url: https://cdn.jsdelivr.net/gh/IronKinoko/clash-proxy-parser@master/parser.js
      cache: true # 默认为false，指示是否对重复下载此预处理代码使用缓存
```

或者下载到本地，使用下面的方式导入

```yaml
parsers:
  - reg: ^.*$
    file: 'path/to/parser.js' # 下载后文件的保存位置，例如 D:/download/cfw/parser.js
```

4. CFW 左侧点击 Profiles，点击更新订阅
5. CFW 左侧点击 Proxies，在 Rule 页面的 PROXY 组选择一个使用
