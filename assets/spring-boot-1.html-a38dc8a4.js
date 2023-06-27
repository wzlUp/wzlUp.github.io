import{_ as s,p as a,q as t,s as n,Y as p}from"./framework-e1bed10d.js";const e={},c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"博客简介"),n("p",null,"在 springBoot 后台中，发起 http 的 get、post 请求，编写 HttpUtil 工具类，记录代码")],-1),o=p(`<h2 id="一、引入类库" tabindex="-1"><a class="header-anchor" href="#一、引入类库" aria-hidden="true">#</a> 一、引入类库</h2><p><strong>在 <code>pom</code> 文件中引入 <code>httpclient</code> 类库</strong></p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.httpcomponents<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>httpclient<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.5.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、编写工具类" tabindex="-1"><a class="header-anchor" href="#二、编写工具类" aria-hidden="true">#</a> 二、编写工具类</h2><p><strong>编写程序请求中所需的请求 <code>工具类</code></strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>water<span class="token punctuation">.</span>common<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpMethod</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">MultiValueMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">RestTemplate</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* @ClassName: HttpClient
* @Description: http的请求工具类
* <span class="token keyword">@version</span> V1.0
*/</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpClientUtil</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">client</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">,</span> <span class="token class-name">HttpMethod</span> method<span class="token punctuation">,</span> <span class="token class-name">MultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RestTemplate</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> responseEntity <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> responseEntity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、调用实例" tabindex="-1"><a class="header-anchor" href="#三、调用实例" aria-hidden="true">#</a> 三、调用实例</h2><p><strong>在application.properties 中配置http的访问地址</strong></p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">url.userrights</span><span class="token punctuation">=</span><span class="token value attr-value">http://127.0.0.1:8082/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>编写请求的调用实例</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// api地址</span>
<span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${url.userrights}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> userRightsUrl<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">HttpClientUtil</span> httpClient<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testConnection</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">&quot;xxx/api?abc=1&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">HttpMethod</span> method <span class="token operator">=</span> <span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">;</span>
    <span class="token class-name">MultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedMultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> apiUrl <span class="token operator">=</span> userRightsUrl <span class="token operator">+</span> url
    <span class="token class-name">String</span> result <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">client</span><span class="token punctuation">(</span>apiUrl<span class="token punctuation">,</span> method<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、附http工具类" tabindex="-1"><a class="header-anchor" href="#四、附http工具类" aria-hidden="true">#</a> 四、附http工具类</h2><p><strong>附一个请求类型和参数更多的 <code>http请求</code> 工具类，供大家参考</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>water<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>beanutils<span class="token punctuation">.</span></span><span class="token class-name">DynaBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>weaver<span class="token punctuation">.</span>ast<span class="token punctuation">.</span></span><span class="token class-name">Var</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpHeaders</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpMethod</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">MediaType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">LinkedMultiValueMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">MultiValueMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">RestTemplate</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>water<span class="token punctuation">.</span>common<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">DynaBeanPluginsUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>water<span class="token punctuation">.</span>common<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JsonPluginsUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>water<span class="token punctuation">.</span>common<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">Util</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * @ClassName: HttpClient 
 * @Description: http的请求工具类 
 * <span class="token keyword">@version</span> V1.0
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpClientUtil</span> <span class="token punctuation">{</span>
	
	<span class="token doc-comment comment">/**
	 * @Title: client 
	 * @Description: 普通get方式
	 * <span class="token keyword">@param</span> @param url
	 * <span class="token keyword">@param</span> @param method
	 * <span class="token keyword">@param</span> @param params
	 * <span class="token keyword">@param</span> @return
	 * <span class="token keyword">@return</span> String
	 * <span class="token keyword">@version</span> V1.0
	 */</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">clientGet</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">RestTemplate</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> responseEntity <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> responseEntity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * @Title: clientWithHeader 
	 * @Description: 带有单个header的获取方式
	 * <span class="token keyword">@param</span> @param url
	 * <span class="token keyword">@param</span> @param method
	 * <span class="token keyword">@param</span> @param params
	 * <span class="token keyword">@param</span> @return
	 * <span class="token keyword">@return</span> String
	 * <span class="token keyword">@version</span> V1.0
	 */</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">clientGet</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">,</span> <span class="token class-name">String</span> hKey<span class="token punctuation">,</span> <span class="token class-name">String</span> hVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">RestTemplate</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">HttpHeaders</span> requestHeaders <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        requestHeaders<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> hVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> requestEntity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> requestHeaders<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> responseEntity <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> requestEntity<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> responseEntity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * @Title: client 
	 * @Description: 带有多个header的获取方式
	 * <span class="token keyword">@param</span> @param url
	 * <span class="token keyword">@param</span> @param method
	 * <span class="token keyword">@param</span> @param params
	 * <span class="token keyword">@param</span> @param hList
	 * <span class="token keyword">@param</span> @return
	 * <span class="token keyword">@return</span> String
	 * <span class="token keyword">@version</span> V1.0
	 */</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">client</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">,</span> <span class="token class-name">HttpMethod</span> method<span class="token punctuation">,</span> <span class="token class-name">MultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> params<span class="token punctuation">,</span> 
			<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DynaBean</span><span class="token punctuation">&gt;</span></span> hList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">RestTemplate</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">HttpHeaders</span> requestHeaders <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">DynaBean</span> dynaBean <span class="token operator">:</span> hList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">String</span> hKey <span class="token operator">=</span> <span class="token class-name">Util</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>dynaBean<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">String</span> hVal <span class="token operator">=</span> <span class="token class-name">Util</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>dynaBean<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;val&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			requestHeaders<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> hVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
        <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> requestEntity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> requestHeaders<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> responseEntity <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> method<span class="token punctuation">,</span> requestEntity<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> responseEntity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * @Title: clientPost 
	 * @Description: 发送post的http请求
	 * <span class="token keyword">@param</span> @param url
	 * <span class="token keyword">@param</span> @param params
	 * <span class="token keyword">@param</span> @return
	 * <span class="token keyword">@return</span> String
	 * <span class="token keyword">@version</span> V1.0     
	 */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">clientPost</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">,</span> <span class="token class-name">String</span> json<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RestTemplate</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpHeaders</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpMethod</span> method <span class="token operator">=</span> <span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">;</span>
        <span class="token comment">// 以表单的方式提交</span>
        headers<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//将请求头部和参数合成一个请求</span>
        <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> requestEntity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> headers<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//执行HTTP请求，将返回的结构使用ResultVO类格式化</span>
        <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> method<span class="token punctuation">,</span> requestEntity<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),l=[c,o];function i(u,k){return a(),t("div",null,l)}const d=s(e,[["render",i],["__file","spring-boot-1.html.vue"]]);export{d as default};
