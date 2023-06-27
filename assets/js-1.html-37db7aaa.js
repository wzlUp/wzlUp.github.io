import{_ as a,p as t,q as p,s as n,R as s,Y as c}from"./framework-e1bed10d.js";const e={},o=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"功能描述"),n("p",null,[s("本博客介绍的是，在 "),n("code",null,"JavaScript"),s(" 中怎么动态绑定事件的技术点")])],-1),i=c(`<h2 id="_1-先解绑-再绑定" tabindex="-1"><a class="header-anchor" href="#_1-先解绑-再绑定" aria-hidden="true">#</a> 1. 先解绑，再绑定</h2><p>动态绑定事件最好的方法就是，先解绑，再绑定，具体代码为：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#_btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> _xxxEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-绑定语法" tabindex="-1"><a class="header-anchor" href="#_2-绑定语法" aria-hidden="true">#</a> 2. 绑定语法</h2><p>当方法作为一个参数传递的时候，<code>不要有括号</code>，否则绑定后会立马激活绑定的方法，只是调用方法的名称，如</p><p><em><strong>🍉🍉错误的写法</strong></em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#_btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token function">_clickEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>👑👑正确的写法</strong></em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#_btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> _clickEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-事件绑定" tabindex="-1"><a class="header-anchor" href="#_3-事件绑定" aria-hidden="true">#</a> 3. 事件绑定</h2><p>动态绑定事件，并将参数传递到绑定的方法中</p><p><em><strong>🏀🏀举个栗子</strong></em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">GetCode</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">$</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;#summary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;click&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;abc&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> GetCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),u=[o,i];function l(r,k){return t(),p("div",null,u)}const v=a(e,[["render",l],["__file","js-1.html.vue"]]);export{v as default};
