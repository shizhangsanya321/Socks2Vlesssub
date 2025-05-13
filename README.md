# 🚀 Socks2VLESS订阅生成器 Socks2Vlesssub
这是一个可以通过 edgetunnel、epeius 项目将 Socks5 转换成 VLESS、Trojan 的订阅生成器，自适应支持多种订阅格式。

> [!WARNING]
> 注意！这是一个**公益服务项目**，请不要将私人 Socks5 放入`SOCKS5API`变量，这会让所有人都能获得此 Socks5！！！

> Telegram交流群：[@CMLiussss](https://t.me/CMLiussss)

---

## 📦 部署方式

- **Workers** 部署：复制 [_worker.js](https://github.com/cmliu/CF-Workers-docker.io/blob/main/_worker.js) 代码，`保存并部署`即可
- **Pages** 部署：`Fork` 后 `连接GitHub` 一键部署即可

---

## ⚙️ 如何使用？
- **节点链接** 填入 edgetunnel、epeius 生成的 VLESS、Trojan 的LINK地址，后点击`生成订阅`，即可生成对应的订阅链接

---

## 🔑 变量说明
| 变量名 | 示例 | 备注 | 
|--------|---------|-----|
| SOCKS5API | `socks5://123:123@64.226.95.45:1080#DE`,[JsonURL](https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json),[txtURL](https://raw.githubusercontent.com/cmliu/Socks2Vlesssub/refs/heads/main/socks5api.txt) | Socks5 代理，支持 Socks5LINK、JsonURL、txtURL（支持多元素, 元素之间使用`|`或`换行`作间隔） |
| SUBAPI | `subapi.cmliussss.net` | clash、singbox等 订阅转换后端 | 
| SUBCONFIG | [https://raw.github.../ACL4SSR_Online_Mini.ini](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini) | clash、singbox等 订阅转换配置文件 | 
| SUBNAME | `Socks2VLESS订阅生成器` | 订阅生成器名称 | 
| ICO | `https://raw.cmliussss.com/favicon.ico` | 网站图标 |
| IMG | `https://raw.cmliussss.com/keqing1080p.jpg` | 背景图片，多张图片将随机展示 （多元素`换行`作间隔） | 
| BEIAN | `提供维护: <a href='https://t.me/CMLiussss'>CMLiussss</a>` | 主页维护信息 | 
| URL302 | `https://t.me/CMLiussss` | 主页302跳转(支持多url, url之间使用`,`或`换行`作间隔, 小白别用) |
| URL | `https://blog.cmliussss.com` | 主页反代伪装(支持多url, url之间使用`,`或`换行`作间隔, 乱设容易触发反诈) |

---

# 致谢
我自己的脑洞