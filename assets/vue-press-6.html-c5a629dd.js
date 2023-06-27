import{_ as n,p as a,q as e,s,Y as i}from"./framework-e1bed10d.js";const t={},c=s("div",{class:"custom-container tip"},[s("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[s("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[s("circle",{cx:"12",cy:"12",r:"9"}),s("path",{d:"M12 8h.01"}),s("path",{d:"M11 12h1v4h1"})])]),s("p",{class:"custom-container-title"},"博客简介"),s("p",null,"依托GitHub Pages 服务，可以把 vuepress 编译后的 博客静态文件 放置到该平台，那么就可以把静态页面发布出来，就会实现了不用购买云服务器就可以发布静态页面的功能.")],-1),l=i(`<h2 id="_1-创建仓库" tabindex="-1"><a class="header-anchor" href="#_1-创建仓库" aria-hidden="true">#</a> 1. 创建仓库</h2><p>首先，登陆 GitHub，然后，点击右上角➕找到 new repository 选项，创建一个跟用户名同名的仓库：</p><p><img src="https://pic.smartasc.cn/blogPics/20230211223447.png" alt=""></p><p>把 vuepress-reco 编译后的静态文件进行提交</p><p><img src="https://pic.smartasc.cn/blogPics/20230211224026.png" alt=""></p><p>提交以后就可访问静态文件页面了</p><p><img src="https://pic.smartasc.cn/blogPics/20230211224645.png" alt=""></p><h2 id="_2-自动部署到github" tabindex="-1"><a class="header-anchor" href="#_2-自动部署到github" aria-hidden="true">#</a> 2. 自动部署到GitHub</h2><p>🀄🀄🀄在 vuepress 项目根目录新建 deploy.sh 自动部署脚本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 生成静态文件</span>
<span class="token function">yarn</span> run build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> ./.vuepress/dist

<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;blog.smartasc.cn&#39;</span> <span class="token operator">&gt;</span> CNAME

<span class="token comment"># 报错 fatal: OpenSSL SSL_read: Connection was reset, errno 10054 方案</span>
<span class="token comment"># 1、有可能是网络卡，多尝试几次</span>
<span class="token comment"># 2、先执行一下 git config --global http.sslVerify &quot;false&quot;</span>

<span class="token comment"># 当前时间</span>
<span class="token assign-left variable">d</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y-%m-%d<span class="token variable">\`</span></span>

<span class="token comment"># 初始化仓库</span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;deploy time: <span class="token variable">$d</span>&quot;</span>

<span class="token comment"># 发布到 https://&lt;USERNAME&gt;.github.io</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> https://<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>.github.io.git master

<span class="token comment"># git push -f git@git.dev.tencent.com:shanghaobo/shanghaobo.git master</span>
<span class="token comment"># git push -f git@gitee.com:shanghaobo/shanghaobo.git master</span>

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>💄💄💄windows下执行 <code>.sh</code> 文件会报错，不过我们是安装过 <code>git</code> 环境的，在项目文件夹下右击鼠标，选择 <code>Git Bash</code></p><p><img src="https://pic.smartasc.cn/blogPics/20230211230230.png" alt=""></p><p>🎨🎨🎨执行 <code>bash deploy.sh</code> 命令，把最新的编译后的静态文件发布到 github项目 上，刷新博客页面即可看到最新的博客数据</p><p>图例一</p><p><img src="https://pic.smartasc.cn/blogPics/20230211230515.png" alt=""></p><p>图例二</p><p><img src="https://pic.smartasc.cn/blogPics/20230211230617.png" alt=""></p><h2 id="_3-转发到二级域名" tabindex="-1"><a class="header-anchor" href="#_3-转发到二级域名" aria-hidden="true">#</a> 3. 转发到二级域名</h2><blockquote><p>CNAME记录，即：别名记录。这种记录允许您将多个名字映射到同一台计算机。 通常用于同时提供WWW和MAIL服务的计算机。例如，有一台计算机名为“host.mydomain.com”（A记录）。 它同时提供WWW和MAIL服务，为了便于用户访问服务。可以为该计算机设置两个别名（CNAME）：WWW和MAIL。 --- 来自百度百科</p></blockquote><p>我是在 <code>腾讯云</code> 注册的域名，地址为 <code>http://www.smartasc.cn</code> ，在 域名解析 中添加 博客 的二级域名，域名地址为 <code>https://blog.smartasc.cn/</code></p><p>在 GitHub 发布的项目中，加入 CNAME 文件，内容为 <code>blog.smartasc.cn</code></p><p><img src="https://pic.smartasc.cn/blogPics/20230211225608.png" alt=""></p><p>在 域名解析 中添加 blog 二级域名记录，记录值填写 GitHub Pages 生成的地址 <code>wzlUp.github.io.</code></p><p><img src="https://pic.smartasc.cn/blogPics/20230211225732.png" alt=""></p>`,24),p=[c,l];function o(r,d){return a(),e("div",null,p)}const v=n(t,[["render",o],["__file","vue-press-6.html.vue"]]);export{v as default};
