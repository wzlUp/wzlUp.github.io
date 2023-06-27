import{_ as e,p as t,q as i,s as n,Y as a,R as s}from"./framework-e1bed10d.js";const o={},p=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"博客简介"),n("p",null,"本文是针对 Websocket 请求在 Nginx 中的必要参数的一些配置说明")],-1),r=a(`<p><em><strong>直接通过端口可连接，但是使用nginx转发后则需要进行相关配置，否则会报以下异常</strong></em></p><p><code>QWebSocketPrivate::processHandshake: Unhandled http status code: 200 (OK).</code></p><h2 id="一、解决方案" tabindex="-1"><a class="header-anchor" href="#一、解决方案" aria-hidden="true">#</a> 一、解决方案</h2><p>参考Nginx官方文档配置websocket：http://nginx.org/en/docs/http/websocket.html</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location / <span class="token punctuation">{</span>
    proxy_pass http://119.28.180.116:9099<span class="token punctuation">;</span>
    // 这里三个选项是websocket配置配置的【直接复制即可】
    proxy_http_version <span class="token number">1.1</span><span class="token punctuation">;</span>
    proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
    proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://pic.smartasc.cn/blogPics/20230209234419.png" alt=""></p><h2 id="二、举个栗子" tabindex="-1"><a class="header-anchor" href="#二、举个栗子" aria-hidden="true">#</a> 二、举个栗子</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">8882</span><span class="token punctuation">;</span>
    server_name  <span class="token number">192.168</span>.50.229<span class="token punctuation">;</span>
    
    location /prod-api/ <span class="token punctuation">{</span>    
        proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span>
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header REMOTE-HOST <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
        proxy_pass http://192.168.50.229:8082/<span class="token punctuation">;</span>
        proxy_http_version <span class="token number">1.1</span><span class="token punctuation">;</span>    
        proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
        proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"警告"),n("p",null,[s("nginx进行websocket代理后，"),n("code",null,"60s"),s("未传输数据会被服务端断开连接")])],-1),c=a(`<p>默认情况下，如果代理的服务器在60秒内没有传输任何数据，则连接将被关闭。这个超时可以通过 <code>proxy read timeout</code> 指令来增加 。</p><p>或者，代理服务器可以配置为定期发送WebSocket ping帧以重置超时并检查连接是否仍然存在。</p><ul><li><p>1、proxy_connect_timeout：后端服务器连接的超时时间_发起握手等候响应超时时间（默认60秒）</p></li><li><p>2、proxy_read_timeout：连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）</p></li><li><p>3、proxy_send_timeout：后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据</p></li></ul><p><strong>PS</strong>：后端连接时间和后端回传时间使用默认的即可，但是等候后端服务器响应时间 <code>proxy_read_timeout</code> 需要改大一点，保持长链接状态。</p><h2 id="三、最终配置版本" tabindex="-1"><a class="header-anchor" href="#三、最终配置版本" aria-hidden="true">#</a> 三、最终配置版本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">8882</span><span class="token punctuation">;</span>
    server_name  <span class="token number">192.168</span>.50.229<span class="token punctuation">;</span>
    
    location /prod-api/ <span class="token punctuation">{</span>    
        proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span>
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header REMOTE-HOST <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
            proxy_read_timeout 86400s<span class="token punctuation">;</span>
        proxy_pass http://192.168.50.229:8082/<span class="token punctuation">;</span>
        proxy_http_version <span class="token number">1.1</span><span class="token punctuation">;</span>    
        proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
        proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d=[p,r,l,c];function u(v,_){return t(),i("div",null,d)}const m=e(o,[["render",u],["__file","nginx-1.html.vue"]]);export{m as default};
