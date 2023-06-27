import{_ as n,p as s,q as a,Y as e}from"./framework-e1bed10d.js";const i={},l=e(`<p>本地安装的 nginx 比较好维护，配置起来也方便，比 yum 的安装方式要更好的运维和使用，此篇技术贴亲测可用，实测了使用 nginx 代理 nacos 的服务器集群。</p><h2 id="一、安装各种依赖" tabindex="-1"><a class="header-anchor" href="#一、安装各种依赖" aria-hidden="true">#</a> 一、安装各种依赖</h2><p>gcc安装，nginx源码编译需要</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> gcc-c++

<span class="token comment">#PCRE pcre-devel 安装，nginx 的 http 模块使用 pcre 来解析正则表达式</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> pcre pcre-devel

<span class="token comment">#zlib安装，nginx 使用zlib对http包的内容进行gzip</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> zlib zlib-devel

<span class="token comment">#OpenSSL 安装，强大的安全套接字层密码库，nginx 不仅支持 http 协议，还支持 https（即在ssl协议上传输http）</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openssl openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、下载安装包" tabindex="-1"><a class="header-anchor" href="#二、下载安装包" aria-hidden="true">#</a> 二、下载安装包</h2><p>下载版本号可根据目前官网最新稳定版自行调整</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-c</span> https://nginx.org/download/nginx-1.16.1.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、开始安装" tabindex="-1"><a class="header-anchor" href="#三、开始安装" aria-hidden="true">#</a> 三、开始安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 根目录使用ls命令可以看到下载的nginx压缩包，然后解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> nginx-1.16.1.tar.gz

<span class="token comment"># 解压后进入目录</span>
<span class="token builtin class-name">cd</span> nginx-1.16.1

<span class="token comment"># 使用默认配置</span>
./configure

<span class="token comment"># 编译安装</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># 查找安装路径，默认都是这个路径</span>
<span class="token punctuation">[</span>root@VM_0_12_centos ~<span class="token punctuation">]</span><span class="token comment"># whereis nginx</span>
nginx: /usr/local/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、服务状态运维" tabindex="-1"><a class="header-anchor" href="#四、服务状态运维" aria-hidden="true">#</a> 四、服务状态运维</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动、停止nginx</span>
<span class="token builtin class-name">cd</span> /usr/local/nginx/sbin/
./nginx     <span class="token comment">#启动</span>
./nginx <span class="token parameter variable">-s</span> stop  <span class="token comment">#停止，直接查找nginx进程id再使用kill命令强制杀掉进程</span>
./nginx <span class="token parameter variable">-s</span> quit  <span class="token comment">#退出停止，等待nginx进程处理完任务再进行停止</span>
./nginx <span class="token parameter variable">-s</span> reload  <span class="token comment">#重新加载配置文件，修改nginx.conf后使用该命令，新配置即可生效</span>

<span class="token comment"># 重启nginx，建议先停止，再启动</span>
./nginx <span class="token parameter variable">-s</span> stop
./nginx

<span class="token comment"># 测试配置文件是否正确</span>
./nginx <span class="token parameter variable">-t</span>

<span class="token comment"># 查看nginx进程，如下返回，即为成功</span>
<span class="token punctuation">[</span>root@VM_0_12_centos ~<span class="token punctuation">]</span><span class="token comment"># ps aux|grep nginx</span>
root      <span class="token number">5984</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span> <span class="token number">112708</span>   <span class="token number">976</span> pts/1    R+   <span class="token number">14</span>:41   <span class="token number">0</span>:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx
root     <span class="token number">18198</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">20552</span>   <span class="token number">612</span> ?        Ss   <span class="token number">11</span>:28   <span class="token number">0</span>:00 nginx: master process ./nginx
nobody   <span class="token number">18199</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">23088</span>  <span class="token number">1632</span> ?        S    <span class="token number">11</span>:28   <span class="token number">0</span>:00 nginx: worker process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、设置开机启动" tabindex="-1"><a class="header-anchor" href="#五、设置开机启动" aria-hidden="true">#</a> 五、设置开机启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在rc.local增加启动代码即可</span>
<span class="token function">vi</span> /etc/rc.local

<span class="token comment"># 增加一行 /usr/local/nginx/sbin/nginx，增加后保存</span>
<span class="token comment"># 设置执行权限</span>
<span class="token builtin class-name">cd</span> /etc
<span class="token function">chmod</span> <span class="token number">755</span> rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[l];function t(p,r){return s(),a("div",null,c)}const o=n(i,[["render",t],["__file","star-8.html.vue"]]);export{o as default};
