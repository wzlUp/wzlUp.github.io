import{_ as s,p as e,q as n,s as a,Y as t}from"./framework-e1bed10d.js";const i={},r=a("div",{class:"custom-container tip"},[a("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[a("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 8h.01"}),a("path",{d:"M11 12h1v4h1"})])]),a("p",{class:"custom-container-title"},"文章简介"),a("p",null,"gitlab 初体验，使用 docker 进行快速安装，遇到了端口修改不生效的问题，在此记录一下。")],-1),l=t(`<p>在正式环境中，gitlab 的容器版，应该使用 postgresql,redis,gitlab 三个组件，使用标准的 80 端口，提供稳定且有性能的企业服务。但如果是在测试环境，或是想在一个机器上运行多个服务，则 gitlab 不一定能使用到标准的 80 端口，那么，在部署时，需要如何调整配置呢？</p><p>ce 表示社区免费版、ee 表示企业收费版</p><h2 id="一、启动-gitlab-ce-镜像" tabindex="-1"><a class="header-anchor" href="#一、启动-gitlab-ce-镜像" aria-hidden="true">#</a> 一、启动 gitlab-ce 镜像</h2><p>docker run -itd <br> --publish 8443:443 <br> --publish 8180:8180 <br> --publish 8022:22 <br> --name gitlab <br> --restart unless-stopped <br> -v /mnt/gitlab/config:/etc/gitlab <br> -v /mnt/gitlab/log:/var/log/gitlab <br> -v /mnt/gitlab/data:/var/opt/gitlab <br> gitlab/gitlab-ce</p><h2 id="二、修改-gitlab-rb-文件" tabindex="-1"><a class="header-anchor" href="#二、修改-gitlab-rb-文件" aria-hidden="true">#</a> 二、修改 gitlab.rb 文件</h2><p>这是关键步骤，文件在/gitlab/etc/gitlab.rb， 假设宿主机 ip 为 192.168.0.110，external_url 和 nginx[&#39;listen_port&#39;]的端口需要和第一步的映射端口对应。</p><h1 id="该配置的端口号会显示在克隆url" tabindex="-1"><a class="header-anchor" href="#该配置的端口号会显示在克隆url" aria-hidden="true">#</a> 该配置的端口号会显示在克隆url</h1><p>external_url &#39;http://192.168.0.110:8180&#39;</p><h1 id="https需要下面这句" tabindex="-1"><a class="header-anchor" href="#https需要下面这句" aria-hidden="true">#</a> https需要下面这句</h1><h1 id="nginx-redirect-http-to-https-port-8180" tabindex="-1"><a class="header-anchor" href="#nginx-redirect-http-to-https-port-8180" aria-hidden="true">#</a> nginx[&#39;redirect_http_to_https_port&#39;] = 8180</h1><p>nginx[&#39;listen_port&#39;] = 8180</p><h1 id="配置8022端口" tabindex="-1"><a class="header-anchor" href="#配置8022端口" aria-hidden="true">#</a> 配置8022端口</h1><p>gitlab_rails[&#39;gitlab_shell_ssh_port&#39;] = 8022</p><h2 id="三、重启镜像" tabindex="-1"><a class="header-anchor" href="#三、重启镜像" aria-hidden="true">#</a> 三、重启镜像</h2><p>docker restart gitlab</p><p>查看/gitlab/data/gitlab-rails/etc/gitlab.yml 文件(这个文件是根据 gitlab.rb 自动生成的，不要修改，否则会很麻烦),看到 port 为 8180，基本就大功告成！</p><p>gitlab.yml 是由 gitlab.rb 文件生成的，不要自行修改！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># This file is managed by gitlab-ctl. Manual changes will be</span>
<span class="token comment"># erased! To change the contents below, edit /etc/gitlab/gitlab.rb</span>
<span class="token comment"># and run \`sudo gitlab-ctl reconfigure\`.</span>

production: <span class="token operator">&amp;</span>base
  <span class="token comment">#</span>
  <span class="token comment"># 1. GitLab app settings</span>
  <span class="token comment"># ==========================</span>

  <span class="token comment">## GitLab settings</span>
  gitlab:
    <span class="token comment">## Web server settings (note: host is the FQDN, do not include http://)</span>
    host: <span class="token number">192.168</span>.0.110
    port: <span class="token number">8180</span>
    https: <span class="token boolean">false</span>

    <span class="token comment"># The maximum time unicorn/puma can spend on the request. This needs to be smaller than the worker timeout.</span>
    <span class="token comment"># Default is 95% of the worker timeout</span>
    max_request_duration_seconds: <span class="token number">57</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、启动测试" tabindex="-1"><a class="header-anchor" href="#四、启动测试" aria-hidden="true">#</a> 四、启动测试</h2><p>可以看到，git clone 里，已带上了自定义的 8180 端口，搞定！</p><p><img src="https://pic.smartasc.cn/blogPics/20230617154359.png" alt=""></p><h2 id="五、进入ui页面提示密码错误-那么进入容器来修改下密码" tabindex="-1"><a class="header-anchor" href="#五、进入ui页面提示密码错误-那么进入容器来修改下密码" aria-hidden="true">#</a> 五、进入ui页面提示密码错误，那么进入容器来修改下密码</h2><p>首先，gitlab-ctl start 保证gitlab、redis同时处于启动状态。 然后使用命令进入修改密码状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> gitlab /bin/bash

gitlab-rails console                     进入gitlab串口环境下
<span class="token operator">&gt;</span>user <span class="token operator">=</span> User.where<span class="token punctuation">(</span>id: <span class="token number">1</span><span class="token punctuation">)</span>.first          定位到gitlab数据库中Users表中的一个用户，通常就是管理员用户admin@local.host
<span class="token operator">&gt;</span> <span class="token assign-left variable">user.password</span><span class="token operator">=</span><span class="token number">12345678</span>                 重置管理员密码为12345678
<span class="token operator">&gt;</span> <span class="token assign-left variable">user.password_confirmation</span><span class="token operator">=</span><span class="token number">12345678</span>    确认管理员密码为12345678，小于8位会错误提示
<span class="token operator">&gt;</span> user.save<span class="token operator">!</span>                             保存更改信息,需要使用后面的感叹号<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下提示代表成功：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> user.save<span class="token operator">!</span>
Enqueued ActionMailer::DeliveryJob <span class="token punctuation">..</span>.
<span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登陆gitlab使用新密码可以成功登陆root</p>`,27),o=[r,l];function c(p,d){return e(),n("div",null,o)}const h=s(i,[["render",c],["__file","star-6.html.vue"]]);export{h as default};
