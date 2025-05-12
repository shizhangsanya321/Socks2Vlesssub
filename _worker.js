let socks5s = [];
let FileName = 'Socks2VLESS订阅生成器';
let SUBUpdateTime = 6;
let subConverter = 'url.v1.mk';
let subConfig = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2NtbGl1L0FDTDRTU1IvbWFpbi9DbGFzaC9jb25maWcvQUNMNFNTUl9PbmxpbmVfRnVsbF9NdWx0aU1vZGUuaW5p');
const fakeUserID = '00000000-0000-0000-0000-000000000000';
const fakeHostName = 'www.baidu.com';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const 路径 = url.pathname;
        const userAgentHeader = request.headers.get('User-Agent');
        const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";

        if (路径 === '/sub') {
            const 优选域名 = url.searchParams.get('address') || 'visa.cn';
            const 优选端口 = url.searchParams.get('port') || '443';
            //判断是否有参数host和uuid
            if (!url.searchParams.has('host') || !(url.searchParams.has('uuid') || url.searchParams.has('password') || url.searchParams.has('pw'))) {
                return new Response('缺少参数host或uuid', { status: 400 });
            }
            const host = url.searchParams.get('host');
            const uuid = url.searchParams.get('uuid') || url.searchParams.get('password') || url.searchParams.get('pw');
            let subConverterUrl = 替换虚假ID(url.href, uuid, host);

            // const fakeUserIDMD5 = await MD5MD5(host + uuid);
            // fakeUserID = fakeUserIDMD5.slice(0, 8) + "-" + fakeUserIDMD5.slice(8, 12) + "-" + fakeUserIDMD5.slice(12, 16) + "-" + fakeUserIDMD5.slice(16, 20) + "-" + fakeUserIDMD5.slice(20);
            // fakeHostName = fakeUserIDMD5.slice(6, 9) + "." + fakeUserIDMD5.slice(13, 19) + ".xyz";

            if (!userAgent.includes('subconverter') && (userAgent.includes('clash') && !userAgent.includes('nekobox') && !userAgent.includes('cf-workers-sub'))) {
                subConverterUrl = `https://${subConverter}/sub?target=clash&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
            } else if (!userAgent.includes('subconverter') && (userAgent.includes('sing-box') || userAgent.includes('singbox') && !userAgent.includes('cf-workers-sub'))) {
                subConverterUrl = `https://${subConverter}/sub?target=singbox&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
            } else {
                const 协议类型 = url.searchParams.has('uuid') ? atob('dmxlc3M=') : 'trojan';

                const 内置socks5api = env.SOCKS5API ? await 整理(env.SOCKS5API) : ['https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json'];
                const socks5api = url.searchParams.has('socks5api') ? await 整理(decodeURIComponent(url.searchParams.get('socks5api'))) : 内置socks5api;
                socks5s = await 获取socks5api(socks5api);

                const links = socks5s.map(socks5带地址 => {
                    const socks5 = socks5带地址.split('#')[0];
                    const hostMatch = socks5.match(/socks5:\/\/(?:.*@)?([^:\/]+):/);
                    const host名称 = hostMatch ? hostMatch[1] : '未知';

                    const 落地国家 = socks5带地址.split('#').length > 1 ? socks5带地址.split('#')[1] : host名称;

                    const link = `${协议类型}://${uuid}@${优选域名}:${优选端口}?encryption=none&security=tls&sni=${host}&fp=randomized&type=ws&host=${host}&path=%2F${encodeURIComponent(socks5)}&allowInsecure=1&fragment=1,40-60,30-50,tlshello#${encodeURIComponent(落地国家)}`;
                    return link;
                }).join('\n');

                return new Response(btoa(还原真实ID(links, uuid, host)), {
                    headers: {
                        //"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
                        "content-type": "text/plain; charset=utf-8",
                        "Profile-Update-Interval": `${SUBUpdateTime}`,
                        //"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
                    },
                });
            }
            //console.log(`subConverterUrl: ${subConverterUrl}`);

            try {
                const subConverterResponse = await fetch(subConverterUrl);

                if (!subConverterResponse.ok) {
                    throw new Error(`Error fetching subConverterUrl: ${subConverterResponse.status} ${subConverterResponse.statusText}`);
                }

                let subConverterContent = await subConverterResponse.text();
                subConverterContent = 还原真实ID(subConverterContent, uuid, host);
                return new Response(subConverterContent, {
                    headers: {
                        //"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
                        "content-type": "text/plain; charset=utf-8",
                        "Profile-Update-Interval": `${SUBUpdateTime}`,
                        //"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
                    },
                });
            } catch (error) {
                return new Response(`Error: ${error.message}`, {
                    status: 500,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            }

        } else {
            const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
            if (envKey) {
                const URLs = await 整理(env[envKey]);
                if (URLs.includes('nginx')) {
                    return new Response(await nginx(), {
                        headers: {
                            'Content-Type': 'text/html; charset=UTF-8',
                        },
                    });
                }
                const URL = URLs[Math.floor(Math.random() * URLs.length)];
                return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
            }
            return await Html(request);
        }
    },
};

async function 获取socks5api(api) {
    if (!api || api.length === 0) return [];

    // 定义一个新的数组，用于存储处理后的结果
    let socks5数组 = [];

    // 创建一个AbortController对象，用于控制fetch请求的取消
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort(); // 取消所有请求
    }, 2000); // 2秒后触发

    try {
        // 使用Promise.allSettled等待所有API请求完成，无论成功或失败
        // 对api数组进行遍历，对每个API地址发起fetch请求
        const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'User-Agent': FileName + atob('IGNtbGl1L1NvY2tzMlZsZXNzc3Vi')
            },
            signal: controller.signal // 将AbortController的信号量添加到fetch请求中，以便于需要时可以取消请求
        }).then(response => response.ok ? response.text() : Promise.reject())));

        // 遍历所有响应
        for (const [index, response] of responses.entries()) {
            // 检查响应状态是否为'fulfilled'，即请求成功完成
            if (response.status === 'fulfilled') {
                // 获取响应的内容
                const content = await response.value;
                if (content.startsWith('[') && content.endsWith(']')) {
                    const jsonContent = JSON.parse(content);
                    for (const item of jsonContent) {
                        if (item.proxy) {
                            let country = '';
                            // 优先使用直接的country字段
                            if (item.country) {
                                country = item.country;
                            }
                            // 如果没有直接的country字段，则使用geolocation.country
                            else if (item.geolocation && item.geolocation.country) {
                                country = item.geolocation.country;
                            }

                            if (country) {
                                socks5数组.push(`${item.proxy}#${country}`);
                            } else {
                                // 如果没有国家信息，只添加代理地址
                                socks5数组.push(item.proxy);
                            }
                        }
                    }
                } else if (content.startsWith('{') && content.endsWith('}')) {
                    const jsonContent = JSON.parse(content);
                    if (jsonContent.data && Array.isArray(jsonContent.data)) {
                        for (const item of jsonContent.data) {
                            if (item.proxy) {
                                let country = '';
                                // 优先使用直接的country字段
                                if (item.country) {
                                    country = item.country;
                                }
                                // 如果没有直接的country字段，则使用geolocation.country
                                else if (item.geolocation && item.geolocation.country) {
                                    country = item.geolocation.country;
                                }

                                if (country) {
                                    socks5数组.push(`${item.proxy}#${country}`);
                                } else {
                                    // 如果没有国家信息，只添加代理地址
                                    socks5数组.push(item.proxy);
                                }
                            }
                        }
                    }
                } else {
                    const lines = content.split(/\r?\n/);
                    for (const line of lines) {
                        if (line.startsWith('socks5://')) socks5数组.push(line);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        // 无论成功或失败，最后都清除设置的超时定时器
        clearTimeout(timeout);
    }

    // 返回处理后的结果
    return socks5数组;
}

async function 整理(内容) {
    var 替换后的内容 = 内容.replace(/[\r\n]+/g, '|').replace(/\|+/g, '|');
    const 地址数组 = 替换后的内容.split('|');
    const 整理数组 = 地址数组.filter((item, index) => {
        return item !== '' && 地址数组.indexOf(item) === index;
    });

    return 整理数组;
}

function 还原真实ID(content, userID, hostName) {
    content = content.replace(new RegExp(fakeUserID, 'g'), userID).replace(new RegExp(fakeHostName, 'g'), hostName);
    return content;
}

function 替换虚假ID(content, userID, hostName) {
    content = content.replace(new RegExp(userID, 'g'), fakeUserID).replace(new RegExp(hostName, 'g'), fakeHostName);
    return content;
}

async function MD5MD5(text) {
    const encoder = new TextEncoder();

    const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
    const firstPassArray = Array.from(new Uint8Array(firstPass));
    const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
    const secondPassArray = Array.from(new Uint8Array(secondPass));
    const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return secondHex.toLowerCase();
}

async function nginx() {
    const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
    return text;
}

async function Html(request) {
    const url = new URL(request.url);
    const host = url.host;
    return new Response(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socks2VLESS订阅生成器</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .section {
            margin-bottom: 30px;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
        }
        .section-title {
            margin-top: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            color: #444;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-row {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }
        .form-row .form-group {
            flex: 1;
            margin-bottom: 0;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            height: 100px;
            resize: vertical;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 4px;
            height: 45px;
        }
        button:hover {
            background-color: #45a049;
        }
        .output-container {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .output {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            margin-top: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            height: 25px;
            line-height: 25px;
            cursor: pointer;
        }
        .error {
            color: #d9534f;
            font-size: 14px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Socks2VLESS订阅生成器</h1>
        
        <!-- 第一个板块：节点信息 -->
        <div class="section">
            <h2 class="section-title">节点信息</h2>
            <div class="form-group">
                <label for="nodeLink">节点链接（需自行部署 <a href="https://github.com/cmliu/edgetunnel" target="_blank">edgetunnel</a>、<a href="https://github.com/cmliu/epeius" target="_blank">epeius</a>）:</label>
                <input type="text" id="nodeLink" placeholder="请输入 vless://... 或 trojan://... 格式的节点链接">
                <div id="nodeLinkError" class="error"></div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="preferredDomain">优选域名:</label>
                    <input type="text" id="preferredDomain" placeholder="icook.hk">
                </div>
                <div class="form-group">
                    <label for="preferredPort">优选端口:</label>
                    <input type="text" id="preferredPort" placeholder="443">
                </div>
            </div>
        </div>
        
        <!-- 第二个板块：SOCKS5信息 -->
        <div class="section">
            <h2 class="section-title">SOCKS5</h2>
            <div class="form-group">
                <label for="socks5Api">API链接（每行一个，示例 <a href="https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json" target="_blank">Json</a> <a href="https://raw.githubusercontent.com/cmliu/Socks2Vlesssub/refs/heads/main/socks5api.txt" target="_blank">txt</a>）:</label>
                <textarea id="socks5Api" placeholder="https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json"></textarea>
            </div>
        </div>
        
        <!-- 第三个板块：生成订阅 -->
        <div class="section">
            <h2 class="section-title">订阅链接</h2>
            <div class="output-container">
                <button id="generateBtn">生成订阅</button>
                <div id="subscriptionLink" class="output" title="点击复制"></div>
            </div>
        </div>
    </div>

    <script>
        // 为输出文本框添加点击复制功能
        document.getElementById('subscriptionLink').addEventListener('click', function() {
            const text = this.textContent;
            if (text && !text.includes('点击生成按钮')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '已复制到剪贴板!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1000);
                }).catch(err => {
                    console.error('复制失败: ', err);
                });
            }
        });

        document.getElementById('generateBtn').addEventListener('click', function() {
            // 获取输入值
            const nodeLink = document.getElementById('nodeLink').value.trim();
            let preferredDomain = document.getElementById('preferredDomain').value.trim() || 'icook.hk';
            let preferredPort = document.getElementById('preferredPort').value.trim() || '443';
            let socks5Api = document.getElementById('socks5Api').value.trim() || 
                'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json';
            
            // 重置错误消息
            document.getElementById('nodeLinkError').textContent = '';
            
            // 检查节点链接格式
            if (!nodeLink) {
                document.getElementById('nodeLinkError').textContent = '请输入节点链接';
                return;
            }
            
            if (!nodeLink.startsWith('vless://') && !nodeLink.startsWith('trojan://')) {
                document.getElementById('nodeLinkError').textContent = '请输入正确格式的节点链接 (vless:// 或 trojan://)';
                return;
            }

            // 解析节点链接
            let host, uuidOrPassword, linkType;
            try {
                if (nodeLink.startsWith('vless://')) {
                    linkType = 'vless';
                } else if (nodeLink.startsWith('trojan://')) {
                    linkType = 'trojan';
                }

                uuidOrPassword = nodeLink.split('@')[0].split('://')[1];
                host = host || nodeLink.split('host=')[1].split('&')[0];

                if (!host || !uuidOrPassword) {
                    throw new Error("无法从链接中提取必要的信息");
                }

                // 调试信息
                console.log("解析结果:", {linkType, host, uuidOrPassword});
            } catch (error) {
                document.getElementById('nodeLinkError').textContent = '解析节点链接失败: ' + error.message;
                return;
            }

            // 处理 SOCKS5 API，替换换行为 | 并进行URL编码
            const processedSocks5Api = encodeURIComponent(socks5Api.replace(/[\\r\\n]+/g, '|'));

            // 生成订阅链接
            let subscriptionLink;
            if (linkType === 'vless') {
                subscriptionLink = \`https://${host}/sub?host=\${encodeURIComponent(host)}&uuid=\${encodeURIComponent(uuidOrPassword)}&address=\${encodeURIComponent(preferredDomain)}&port=\${encodeURIComponent(preferredPort)}&socks5api=\${processedSocks5Api}\`;
            } else {
                subscriptionLink = \`https://${host}/sub?host=\${encodeURIComponent(host)}&pw=\${encodeURIComponent(uuidOrPassword)}&address=\${encodeURIComponent(preferredDomain)}&port=\${encodeURIComponent(preferredPort)}&socks5api=\${processedSocks5Api}\`;
            }

            // 显示结果
            document.getElementById('subscriptionLink').textContent = subscriptionLink;
            
            // 添加调试信息
            console.log("生成的订阅链接:", subscriptionLink);
        });
    </script>
</body>
</html>`, {
        headers: {
            "content-type": "text/html;charset=UTF-8",
        },
    });
}