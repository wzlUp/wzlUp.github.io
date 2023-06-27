import{_ as a,p as e,q as i,s as n,R as s,Y as p}from"./framework-e1bed10d.js";const t={},l=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,[s("在 "),n("code",null,"windows"),s(" 服务器中，系统使用的是 "),n("code",null,"node"),s(" 开发环境，使用 "),n("code",null,"pm2"),s(" 工具进行部署，在此记录相关步骤和命令")])],-1),o=p(`<h2 id="_1-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-配置文件" aria-hidden="true">#</a> 1. 配置文件</h2><p>我的项目工程目录如下：</p><p><img src="https://pic.smartasc.cn/blogPics/20230215223804.png" alt=""></p><p>工程根目录下的 <code>processes.json文件</code> 为部署配置文件，参数如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token string-property property">&quot;apps&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token string-property property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;myServer&quot;</span><span class="token punctuation">,</span>  
      <span class="token string-property property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./bin/www&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">,</span>          
      <span class="token string-property property">&quot;watch&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
          <span class="token string">&quot;bin&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;common&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;models&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;public&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;routes&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;views&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;error_file&quot;</span><span class="token operator">:</span><span class="token string">&quot;./logs/app-err.log&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;out_file&quot;</span><span class="token operator">:</span><span class="token string">&quot;./logs/app-out.log&quot;</span><span class="token punctuation">,</span>  
      <span class="token string-property property">&quot;log_date_format&quot;</span><span class="token operator">:</span><span class="token string">&quot;YYYY-MM-DD HH:mm Z&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数释义：</p><ul><li><em><strong>name</strong></em>：服务名称</li><li><em><strong>script</strong></em>：node启动文件的路径</li><li><em><strong>cwd</strong></em>：项目所在的目录</li><li><em><strong>watch</strong></em>：布尔值或文件数组，允许开启监听文件改动重启</li><li><em><strong>error_file</strong></em>：错误日志存放路径</li><li><em><strong>out_file</strong></em>：全部日志存放路径</li><li><em><strong>log_date_format</strong></em>：日志时间格式</li></ul><h2 id="_2-项目部署" tabindex="-1"><a class="header-anchor" href="#_2-项目部署" aria-hidden="true">#</a> 2. 项目部署</h2><p>首次项目部署命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 start processes.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完命令后，如果环境没有问题、程序没有报异常，那么项目就正常启动了，查看项目运行状态 ，查看状态命令为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 <span class="token function">ls</span>
or
pm2 list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://pic.smartasc.cn/blogPics/20230215224520.png" alt=""></p><h2 id="_3-pm2常用命令" tabindex="-1"><a class="header-anchor" href="#_3-pm2常用命令" aria-hidden="true">#</a> 3. pm2常用命令</h2><p>查看当前任务列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 <span class="token function">ls</span>
or
pm2 list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动任务，并自定义任务名称</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 start 脚本 <span class="token parameter variable">--name</span> 自定义任务名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用项目，使用<code>npm run</code>脚本别名的方式，注意：<code>-- run中间有一个空格，不加就凉，并且只能放在最后</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 start <span class="token function">npm</span> <span class="token parameter variable">--name</span> 自定义任务名称 – run package.json中的脚本别名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>停止任务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 stop <span class="token function">id</span><span class="token operator">|</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启任务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 restart <span class="token function">id</span><span class="token operator">|</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除任务，注意：<code>如果任务在运行中，会自动停止，all表示删除全部</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 delete <span class="token function">id</span><span class="token operator">|</span>name<span class="token operator">|</span>all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>保存，可以将当前任务列表持久化保存在电脑磁盘中，关机重启后也不会失效（<code>只要执行pm2 update命令即可还原</code>）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更新，可以将上一次执行 <code>pm2 save</code>时的状态还原</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-更新监听开关" tabindex="-1"><a class="header-anchor" href="#_4-更新监听开关" aria-hidden="true">#</a> 4. 更新监听开关</h2><p>项目部署后，后来重启了几次，刚开始watching是enabled，后来布置怎地变成了disabled</p><p>使用 pm2 show 1 ，查看程序的详细信息，【watch &amp; reload 】为 x，使用【pm2 start 1 --watch】重新启动该程序，那么watching 正常为 enabled，【watch &amp; reload 】为 ✔ 了.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>pm2 show <span class="token number">1</span>
Describing process with <span class="token function">id</span> <span class="token number">1</span> - name dspmApiSjzProd
┌───────────────────┬─────────────────────────────────────────────────────────────────── ─────┐
│ status            │ online                                                                 │
│ name              │ dspmApiSjzProd                                                         │
│ namespace         │ default                                                                │
│ version           │ <span class="token number">0.0</span>.0                                                                  │
│ restarts          │ <span class="token number">0</span>                                                                      │
│ <span class="token function">uptime</span>            │ 11s                                                                    │
│ script path       │ D:<span class="token punctuation">\\</span>project<span class="token punctuation">\\</span>shijiazhuang<span class="token punctuation">\\</span>model-project<span class="token punctuation">\\</span>dspmApiSjz_prod<span class="token punctuation">\\</span>bin<span class="token punctuation">\\</span>www          │
│ script args       │ N/A                                                                    │
│ error log path    │ D:<span class="token punctuation">\\</span>project<span class="token punctuation">\\</span>shijiazhuang<span class="token punctuation">\\</span>model-project<span class="token punctuation">\\</span>dspmApiSjz_prod<span class="token punctuation">\\</span>logs<span class="token punctuation">\\</span>app-err.log │
│ out log path      │ D:<span class="token punctuation">\\</span>project<span class="token punctuation">\\</span>shijiazhuang<span class="token punctuation">\\</span>model-project<span class="token punctuation">\\</span>dspmApiSjz_prod<span class="token punctuation">\\</span>logs<span class="token punctuation">\\</span>app-out.log │
│ pid path          │ C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>.pm2<span class="token punctuation">\\</span>pids<span class="token punctuation">\\</span>dspmApiSjzProd-1.pid                  │
│ interpreter       │ <span class="token function">node</span>                                                                   │
│ interpreter args  │ N/A                                                                    │
│ script <span class="token function">id</span>         │ <span class="token number">1</span>                                                                      │
│ <span class="token builtin class-name">exec</span> cwd          │ D:<span class="token punctuation">\\</span>project<span class="token punctuation">\\</span>shijiazhuang<span class="token punctuation">\\</span>model-project<span class="token punctuation">\\</span>dspmApiSjz_prod                  │
│ <span class="token builtin class-name">exec</span> mode         │ fork_mode                                                              │
│ node.js version   │ <span class="token number">14.17</span>.5                                                                │
│ <span class="token function">node</span> <span class="token function">env</span>          │ N/A                                                                    │
│ <span class="token function">watch</span> <span class="token operator">&amp;</span> reload    │ ✔                                                                      │
│ unstable restarts │ <span class="token number">0</span>                                                                      │
│ created at        │ <span class="token number">2023</span>-02-28T06:21:25.747Z                                               │
└───────────────────┴─────────────────────────────────────────────────────────────────── ─────┘
Actions available
┌────────────────────────┐
│ km:heapdump            │
│ km:cpu:profiling:start │
│ km:cpu:profiling:stop  │
│ km:heap:sampling:start │
│ km:heap:sampling:stop  │
└────────────────────────┘
Trigger via: pm2 trigger dspmApiSjzProd <span class="token operator">&lt;</span>action_name<span class="token operator">&gt;</span>

Code metrics value
┌────────────────────────┬───────────┐
│ Used Heap Size         │ <span class="token number">21.19</span> MiB │
│ Heap Usage             │ <span class="token number">88.78</span> %   │
│ Heap Size              │ <span class="token number">23.87</span> MiB │
│ Event Loop Latency p95 │ <span class="token number">4.04</span> ms   │
│ Event Loop Latency     │ <span class="token number">0.99</span> ms   │
│ Active handles         │ <span class="token number">6</span>         │
│ Active requests        │ <span class="token number">0</span>         │
└────────────────────────┴───────────┘
Divergent <span class="token function">env</span> variables from <span class="token builtin class-name">local</span> <span class="token function">env</span>
┌─────────────┬────────────┐
│ SESSIONNAME │ RDP-Tcp<span class="token comment">#62 │</span>
└─────────────┴────────────┘

Add your own code metrics: http://bit.ly/code-metrics
Use <span class="token variable"><span class="token variable">\`</span>pm2 logs dspmApiSjzProd <span class="token punctuation">[</span>--lines <span class="token number">1000</span><span class="token punctuation">]</span><span class="token variable">\`</span></span> to display logs
Use <span class="token variable"><span class="token variable">\`</span>pm2 <span class="token function">env</span> <span class="token number">1</span><span class="token variable">\`</span></span> to display environment variables
Use <span class="token variable"><span class="token variable">\`</span>pm2 monit<span class="token variable">\`</span></span> to monitor CPU and Memory usage dspmApiSjzProd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),c=[l,o];function r(d,u){return e(),i("div",null,c)}const v=a(t,[["render",r],["__file","pm2-1.html.vue"]]);export{v as default};
