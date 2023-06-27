import{_ as s,p as e,q as t,s as a,R as n,Y as o}from"./framework-e1bed10d.js";const p={},c=a("div",{class:"custom-container tip"},[a("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[a("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 8h.01"}),a("path",{d:"M11 12h1v4h1"})])]),a("p",{class:"custom-container-title"},"文章简介"),a("p",null,[n("这篇博客来介绍下在 "),a("code",null,"idea"),n(" 中设置java的 "),a("code",null,"类"),n(" 和 "),a("code",null,"方法"),n(" 上面的 "),a("code",null,"注释模板"),n(".")])],-1),i=o(`<h2 id="_1-类文件自动生成注释模板" tabindex="-1"><a class="header-anchor" href="#_1-类文件自动生成注释模板" aria-hidden="true">#</a> 1. 类文件自动生成注释模板</h2><p>使用 <code>idea</code> 新建 <code>java类</code> 时，该配置会自动按照模板生成类文件的 <code>注释</code> 信息，具体的模板设置过程如下</p><p>设置路径：<code>File/Settings/Editor/File and Code Template</code>，选择 <code>Includes</code> 标签，点击 <code>File Header</code> 选项，把注释模板代码拷贝到里面.</p><p><img src="https://pic.smartasc.cn/blogPics/20230212141350.png" alt=""></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: todo
 * <span class="token keyword">@author</span>: wzl &amp; hello world
 * <span class="token keyword">@date</span>: $<span class="token punctuation">{</span>YEAR<span class="token punctuation">}</span>/$<span class="token punctuation">{</span>MONTH<span class="token punctuation">}</span>/$<span class="token punctuation">{</span>DAY<span class="token punctuation">}</span> $<span class="token punctuation">{</span>TIME<span class="token punctuation">}</span>
 * <span class="token keyword">@gitee</span>: https://gitee.com/weizl0524
 * <span class="token keyword">@github</span>: https://github.com/wzlUp
 * <span class="token keyword">@motto</span>: Stay hungry, stay foolish.
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以根据自定的爱好进行模板设定，显示效果如下：</p><p><img src="https://pic.smartasc.cn/blogPics/20230212141751.png" alt=""></p><h2 id="_2-方法自动生成注释模板" tabindex="-1"><a class="header-anchor" href="#_2-方法自动生成注释模板" aria-hidden="true">#</a> 2. 方法自动生成注释模板</h2><p>新建方法类的时候，我们来设置一个类的注释模板，快速进行代码注释</p><p>🍉🍉 设置路径：<code>File/Settings/Editor/Live Templates</code>，点击右上角的+按钮，选择 <code>Template Group...</code></p><p><img src="https://pic.smartasc.cn/blogPics/20230212133551.png" alt=""></p><p>🍣🍣 新建一个 <code>Template Group</code> 后，命名 <code>MySetting</code></p><p><img src="https://pic.smartasc.cn/blogPics/20230212134143.png" alt=""></p><p>🍤🍤 选中 <code>MySetting</code> 后，点击右侧+按钮，选择 <code>Live Template</code> 新建一个 Template，Abbreviation 输入 *，Template Text 填写如下代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token annotation punctuation">@notes</span> todo
 <span class="token operator">*</span> <span class="token annotation punctuation">@author</span> wzl <span class="token operator">&amp;</span> coffee
 <span class="token operator">*</span> <span class="token annotation punctuation">@date</span> $date$ $time$ $param$ $<span class="token keyword">return</span>$
 <span class="token operator">*</span><span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://pic.smartasc.cn/blogPics/20230212134316.png" alt=""></p><p>🍞🍞 点击右侧的 Edit variables 按钮，设置上面添加的相关参数</p><p><img src="https://pic.smartasc.cn/blogPics/20230212140658.png" alt=""></p><p><em><strong>param参数设置</strong></em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">groovyScript</span><span class="token punctuation">(</span><span class="token string">&quot;def result = &#39;&#39;;def params = \\&quot;\${_1}\\&quot;.replaceAll(&#39;[\\\\\\\\[|\\\\\\\\]|\\\\\\\\s]&#39;, &#39;&#39;).split(&#39;,&#39;).toList(); for(i = 0; i &lt; params.size(); i++) {if(params[i] != &#39;&#39;)result+=&#39;* @param &#39; + params[i] + ((i &lt; params.size() - 1) ? &#39;\\\\r\\\\n &#39; : &#39;&#39;)}; return result == &#39;&#39; ? null : &#39;\\\\r\\\\n &#39; + result&quot;</span><span class="token punctuation">,</span> <span class="token function">methodParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>return参数设置</strong></em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">groovyScript</span><span class="token punctuation">(</span><span class="token string">&quot;return \\&quot;\${_1}\\&quot; == &#39;void&#39; ? null : &#39;\\\\r\\\\n * @return &#39; + \\&quot;\${_1}\\&quot;&quot;</span><span class="token punctuation">,</span> <span class="token function">methodReturnType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当输入 <code>/*</code> 在家 <code>Tab</code> 组合键，就会按照类注释模板生成注释代码，效果如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
* <span class="token keyword">@notes</span> todo
* <span class="token keyword">@author</span> wzl &amp; coffee
* <span class="token keyword">@date</span> 2023/02/12 14:01 
* <span class="token keyword">@param</span> <span class="token parameter">key</span>
* <span class="token keyword">@param</span> <span class="token parameter">value</span>
* <span class="token keyword">@param</span> <span class="token parameter">timeout</span>
* <span class="token keyword">@param</span> <span class="token parameter">timeUnit</span> 
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),l=[c,i];function r(d,u){return e(),t("div",null,l)}const v=s(p,[["render",r],["__file","idea-1.html.vue"]]);export{v as default};