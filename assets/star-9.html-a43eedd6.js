import{_ as a,p as n,q as s,Y as e}from"./framework-e1bed10d.js";const i={},l=e(`<h2 id="一、创建宿主机物理路径" tabindex="-1"><a class="header-anchor" href="#一、创建宿主机物理路径" aria-hidden="true">#</a> 一、创建宿主机物理路径</h2><p>新建/mydata/mysql/data、log和conf三个文件夹</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mnt/mysql/log
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mnt/mysql/data
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mnt/mysql/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /mnt/mysql/<span class="token punctuation">{</span>log,data,config<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、直接执行下面这个命令-即可创建成功mysql服务" tabindex="-1"><a class="header-anchor" href="#二、直接执行下面这个命令-即可创建成功mysql服务" aria-hidden="true">#</a> 二、直接执行下面这个命令，即可创建成功mysql服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/mysql/log
:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/mysql/data
:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/mysql/config
:/etc/mysql/conf.d <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>admin123 <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注1：</p><ul><li>-e MYSQL_ROOT_PASSWORD=admin123 其中【admin123】就是默认用户root的密码</li><li>-v 是文件挂载，冒号之前是Linux宿主机的物理位置，后面的则是映射docker容器的位置</li><li>-e 是设置密码</li><li>-d 是后台使用 mysql:5.7 启动新的容器</li></ul><p>注2：使用挂载文件位置修改mysql的配置</p><p>编辑 /mnt/mysql/config 目录，新建 my.cnf 文件，那么在 mysql 容器的 /etc/mysql 下即可看到 my.cnf 文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>client<span class="token punctuation">]</span>
default-character-set<span class="token operator">=</span>utf8

<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
default-character-set<span class="token operator">=</span>utf8

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">init_connect</span><span class="token operator">=</span><span class="token string">&#39;SET collation_connection=utf8_unicode_ci&#39;</span>
<span class="token assign-left variable">init_connect</span><span class="token operator">=</span><span class="token string">&#39;SET NAMES utf8&#39;</span>
<span class="token comment">#character-set-server=utf8</span>
<span class="token comment">#collection-server=utf8_unicode_ci</span>
skip-character-set-client-handshake
skip-name-resolve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、开放-3306-端口" tabindex="-1"><a class="header-anchor" href="#三、开放-3306-端口" aria-hidden="true">#</a> 三、开放 3306 端口</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、docker常用命令" tabindex="-1"><a class="header-anchor" href="#四、docker常用命令" aria-hidden="true">#</a> 四、docker常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>- 查看日志
<span class="token function">docker</span> logs mysql<span class="token punctuation">(</span>容器名称或者id<span class="token punctuation">)</span>

- 容器自动启动
<span class="token function">docker</span> run <span class="token parameter variable">--restart</span><span class="token operator">=</span>always 容器id或名称
<span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>always 容器id或名称

- 进入mysql容器
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),t=[l];function r(c,p){return n(),s("div",null,t)}const o=a(i,[["render",r],["__file","star-9.html.vue"]]);export{o as default};
