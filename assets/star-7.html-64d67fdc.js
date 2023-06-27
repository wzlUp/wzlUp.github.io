import{_ as e,p as s,q as a,Y as n}from"./framework-e1bed10d.js";const i={},d=n(`<h2 id="一、在centos和red-hat系统中-首先添加epel仓库-然后更新yum源" tabindex="-1"><a class="header-anchor" href="#一、在centos和red-hat系统中-首先添加epel仓库-然后更新yum源" aria-hidden="true">#</a> 一、在CentOS和Red Hat系统中，首先添加EPEL仓库，然后更新yum源：</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> epel-release
<span class="token function">sudo</span> yum update
<span class="token punctuation">(</span>可不更新<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、然后安装redis数据库" tabindex="-1"><a class="header-anchor" href="#二、然后安装redis数据库" aria-hidden="true">#</a> 二、然后安装Redis数据库：</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> redis
安装好后启动Redis服务即可：
<span class="token function">sudo</span> systemctl start redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里同样可以使用redis-cli进入Redis命令行模式操作。</p><h2 id="三、为了可以使redis能被远程连接-需要修改配置文件-路径为-etc-redis-conf" tabindex="-1"><a class="header-anchor" href="#三、为了可以使redis能被远程连接-需要修改配置文件-路径为-etc-redis-conf" aria-hidden="true">#</a> 三、为了可以使Redis能被远程连接，需要修改配置文件，路径为/etc/redis.conf</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/redis.conf
注释这一行：
<span class="token comment"># bind 127.0.0.1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、推荐给redis设置密码-自行修-requirepass-参数" tabindex="-1"><a class="header-anchor" href="#四、推荐给redis设置密码-自行修-requirepass-参数" aria-hidden="true">#</a> 四、推荐给Redis设置密码，自行修 requirepass 参数</h2><p>修改配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>requirepass 密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后重启Redis服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加 6379 到防火墙</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、常用命令" tabindex="-1"><a class="header-anchor" href="#五、常用命令" aria-hidden="true">#</a> 五、常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动redis服务器</span>
systemctl start redis.service

<span class="token comment"># 停止redis服务器</span>
systemctl stop redis.service

<span class="token comment"># 重新启动redis服务器</span>
systemctl restart redis.service

<span class="token comment"># 获取redis服务器的运行状态</span>
systemctl status redis.service

<span class="token comment"># 开机启动redis服务器</span>
systemctl <span class="token builtin class-name">enable</span> redis.service

<span class="token comment"># 开机禁用redis服务器</span>
systemctl disable redis.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),r=[d];function l(c,t){return s(),a("div",null,r)}const o=e(i,[["render",l],["__file","star-7.html.vue"]]);export{o as default};
