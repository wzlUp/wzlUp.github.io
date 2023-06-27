import{_ as t,p as i,q as o,s as n,R as e,t as l,Y as s,n as r}from"./framework-e1bed10d.js";const p={},c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"情况简介"),n("p",null,"记录 mongo 数据库使用 json 文件方式进行导入、导出的操作！")],-1),d=s('<p>在一次数据更新中，同事把老数据进行了清空操作，但是新的逻辑数据由于某种原因（好像是她的电脑中病毒了），一直无法正常连接数据库进行数据插入，然后下午2点左右要给甲方演示，所以要紧急恢复本地的部分数据到生产库。</p><p>在此之前我只用过 mongo 自带的命令 mongoexport 进行过导出操作，把数据库的某个 collection 导出为 json 文件，那么这次是要先导出再导入，实现了一个完整的数据迁移闭环，所以在此记录一下，以备不时之需。</p><h2 id="一、下载-mongo-工具包" tabindex="-1"><a class="header-anchor" href="#一、下载-mongo-工具包" aria-hidden="true">#</a> 一、下载 mongo 工具包</h2><p>mongo工具包包括管理数据的一些工具 exe 文件，具体如下：</p><ul><li>mongoexport.exe：导出数据命令工具</li><li>mongoimport.exe：导入数据命令工具</li><li>bsondump.exe： 用于将导出的BSON文件格式转换为JSON格式</li><li>mongodump.exe： 用于从mongodb数据库中导出BSON格式的文件，类似于mysql的dump工具mysqldump</li><li>mongofiles.exe： 用于和mongoDB的GridFS文件系统交互的命令，并可操作其中的文件，它提供了我们本地系统与GridFS文件系统之间的存储对象接口</li><li>mongorestore.exe： 用于恢复导出的BSON文件到 mongodb 数据库中</li><li>mongostat.exe： 当前 mongod 状态监控工具，像linux中监控linux的vmstat</li><li>mongotop.exe： 提供了一个跟踪mongod数据库花费在读写数据的时间，为每个collection都会记录，默认记录时间是按秒记录</li></ul>',5),u={href:"https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools",target:"_blank",rel:"noopener noreferrer"},m=s(`<p><img src="http://pic.smartasc.cn/blogPics/20230412095857.png" alt=""></p><p><img src="http://pic.smartasc.cn/blogPics/20230412095912.png" alt=""></p><h2 id="二、导出数据" tabindex="-1"><a class="header-anchor" href="#二、导出数据" aria-hidden="true">#</a> 二、导出数据</h2><p>进入到 mongo 的安装目录 bin 下，使用 mongoexport 工具进行数据的 导出 操作</p><p>1、无密码导出操作：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mongoexport.exe <span class="token parameter variable">-h</span> localhost:28007 <span class="token parameter variable">-d</span> database  <span class="token parameter variable">-c</span> result <span class="token parameter variable">-o</span> D:/project/result.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、有密码的导出操作：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mongoexport.exe <span class="token parameter variable">-h</span> localhost:28007 <span class="token parameter variable">-d</span> database <span class="token parameter variable">-u</span> admin  <span class="token parameter variable">-p</span> <span class="token number">123456</span>  <span class="token parameter variable">-c</span> result <span class="token parameter variable">-o</span> D:/project/result.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、导入数据" tabindex="-1"><a class="header-anchor" href="#三、导入数据" aria-hidden="true">#</a> 三、导入数据</h2><p>进入到 mongo 的安装目录 bin 下，使用 mongoimport 工具进行数据的 导入 操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mongoimport.exe <span class="token parameter variable">-h</span> localhost:28007 <span class="token parameter variable">-u</span> admin <span class="token parameter variable">-p</span> <span class="token number">123456</span> <span class="token parameter variable">-d</span> database <span class="token parameter variable">-c</span> result <span class="token parameter variable">--file</span> D:/project/result.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行结果如下表示导入成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>D:<span class="token punctuation">\\</span>MongoDB<span class="token punctuation">\\</span>Server<span class="token punctuation">\\</span><span class="token number">5.0</span><span class="token punctuation">\\</span>bin<span class="token operator">&gt;</span>mongoimport.exe <span class="token parameter variable">-h</span> localhost:28007 <span class="token parameter variable">-u</span> admin <span class="token parameter variable">-p</span> <span class="token number">123456</span> <span class="token parameter variable">-d</span> database <span class="token parameter variable">-c</span> result <span class="token parameter variable">--file</span> D:/project/result.json
<span class="token number">2023</span>-04-11T13:34:39.799+0800    connected to: mongodb://localhost:28007/
<span class="token number">2023</span>-04-11T13:34:42.799+0800    <span class="token punctuation">[</span><span class="token comment">#######.................] database.result 20.2MB/66.4MB (30.4%)</span>
<span class="token number">2023</span>-04-11T13:34:45.799+0800    <span class="token punctuation">[</span><span class="token comment">##############..........] database.result 40.5MB/66.4MB (61.1%)</span>
<span class="token number">2023</span>-04-11T13:34:48.799+0800    <span class="token punctuation">[</span><span class="token comment">#####################...] database.result 60.4MB/66.4MB (91.0%)</span>
<span class="token number">2023</span>-04-11T13:34:49.660+0800    <span class="token punctuation">[</span><span class="token comment">########################] database.result 66.4MB/66.4MB (100.0%)</span>
<span class="token number">2023</span>-04-11T13:34:49.660+0800    <span class="token number">386810</span> document<span class="token punctuation">(</span>s<span class="token punctuation">)</span> imported successfully. <span class="token number">0</span> document<span class="token punctuation">(</span>s<span class="token punctuation">)</span> failed to import.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://pic.smartasc.cn/blogPics/20230412100253.png" alt=""></p><p>参数释义： -h ：指的是 host 主机地址 -u ：指的是用户账号 -p ：指的是账户密码 -d ：指的是数据库 database 简称 -c ：指的是表 collection 简称 -o ：指的是导出路径 output 简称 --file ：指的是需要导入的文件</p><h2 id="四、其他" tabindex="-1"><a class="header-anchor" href="#四、其他" aria-hidden="true">#</a> 四、其他</h2><p>使用过程中可以使用 --help 进行参数意思的查看</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>D:<span class="token punctuation">\\</span>MongoDB<span class="token punctuation">\\</span>Server<span class="token punctuation">\\</span><span class="token number">5.0</span><span class="token punctuation">\\</span>bin<span class="token operator">&gt;</span>mongoimport <span class="token parameter variable">--help</span>
Usage:
  mongoimport <span class="token operator">&lt;</span>options<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>connection-string<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>

Import CSV, TSV or JSON data into MongoDB. If no <span class="token function">file</span> is provided, mongoimport reads from stdin.

Connection strings must begin with mongodb:// or mongodb+srv://.

See http://docs.mongodb.com/database-tools/mongoimport/ <span class="token keyword">for</span> <span class="token function">more</span> information.

general options:
      /help                                       print usage
      /version                                    print the tool version and <span class="token builtin class-name">exit</span>
      /config:                                    path to a configuration <span class="token function">file</span>

verbosity options:
  /v, /verbose:<span class="token operator">&lt;</span>level<span class="token operator">&gt;</span>                            <span class="token function">more</span> detailed log output <span class="token punctuation">(</span>include multiple <span class="token builtin class-name">times</span> <span class="token keyword">for</span> <span class="token function">more</span> verbosity,
                                                  e.g. -vvvvv, or specify a numeric value, e.g. <span class="token parameter variable">--verbose</span><span class="token operator">=</span>N<span class="token punctuation">)</span>
      /quiet                                      hide all log output

connection options:
  /h, /host:<span class="token operator">&lt;</span>hostname<span class="token operator">&gt;</span>                            mongodb <span class="token function">host</span> to connect to <span class="token punctuation">(</span>setname/host1,host2 <span class="token keyword">for</span> replica sets<span class="token punctuation">)</span>
      /port:<span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>                                server port <span class="token punctuation">(</span>can also use <span class="token parameter variable">--host</span> hostname:port<span class="token punctuation">)</span>

ssl options:
      /ssl                                        connect to a mongod or mongos that has ssl enabled
      /sslCAFile:<span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>                       the .pem <span class="token function">file</span> containing the root certificate chain from the
                                                  certificate authority
      /sslPEMKeyFile:<span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>                   the .pem <span class="token function">file</span> containing the certificate and key
      /sslPEMKeyPassword:<span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>               the password to decrypt the sslPEMKeyFile, <span class="token keyword">if</span> necessary
      /sslCRLFile:<span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>                      the .pem <span class="token function">file</span> containing the certificate revocation list
      /sslFIPSMode                                use FIPS mode of the installed openssl library
      /tlsInsecure                                bypass the validation <span class="token keyword">for</span> server<span class="token string">&#39;s certificate chain and host name

authentication options:
  /u, /username:&lt;username&gt;                        username for authentication
  /p, /password:&lt;password&gt;                        password for authentication
      /authenticationDatabase:&lt;database-name&gt;     database that holds the user&#39;</span>s credentials
      /authenticationMechanism:<span class="token operator">&lt;</span>mechanism<span class="token operator">&gt;</span>        authentication mechanism to use
      /awsSessionToken:<span class="token operator">&lt;</span>aws-session-token<span class="token operator">&gt;</span>        session token to authenticate via AWS IAM

kerberos options:
      /gssapiServiceName:<span class="token operator">&lt;</span>service-name<span class="token operator">&gt;</span>           <span class="token function">service</span> name to use when authenticating using GSSAPI/Kerberos
                                                  <span class="token punctuation">(</span>default: mongodb<span class="token punctuation">)</span>
      /gssapiHostName:<span class="token operator">&lt;</span>host-name<span class="token operator">&gt;</span>                 <span class="token function">hostname</span> to use when authenticating using GSSAPI/Kerberos <span class="token punctuation">(</span>default:
                                                  <span class="token operator">&lt;</span>remote server<span class="token string">&#39;s address&gt;)

namespace options:
  /d, /db:&lt;database-name&gt;                         database to use
  /c, /collection:&lt;collection-name&gt;               collection to use

uri options:
      /uri:mongodb-uri                            mongodb uri connection string

input options:
  /f, /fields:&lt;field&gt;[,&lt;field&gt;]*                  comma separated list of fields, e.g. -f name,age
      /fieldFile:&lt;filename&gt;                       file with field names - 1 per line
      /file:&lt;filename&gt;                            file to import from; if not specified, stdin is used
      /headerline                                 use first line in input source as the field list (CSV and TSV only)
      /jsonArray                                  treat input source as a JSON array
      /parseGrace:&lt;grace&gt;                         controls behavior when type coercion fails - one of: autoCast,
                                                  skipField, skipRow, stop (default: stop)
      /type:&lt;type&gt;                                input format to import: json, csv, or tsv
      /columnsHaveTypes                           indicates that the field list (from --fields, --fieldsFile, or
                                                  --headerline) specifies types; They must be in the form of
                                                  &#39;</span><span class="token operator">&lt;</span>colName<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>type<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>arg<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token string">&#39;. The type can be one of: auto, binary,
                                                  boolean, date, date_go, date_ms, date_oracle, decimal, double, int32,
                                                  int64, string. For each of the date types, the argument is a datetime
                                                  layout string. For the binary type, the argument can be one of:
                                                  base32, base64, hex. All other types take an empty argument. Only
                                                  valid for CSV and TSV imports. e.g. zipcode.string(),
                                                  thumbnail.binary(base64)
      /legacy                                     use the legacy extended JSON format
      /useArrayIndexFields                        indicates that field names may include array indexes that should be
                                                  used to construct arrays during import (e.g. foo.0,foo.1). Indexes
                                                  must start from 0 and increase sequentially (foo.1,foo.0 would fail).

ingest options:
      /drop                                       drop collection before inserting documents
      /ignoreBlanks                               ignore fields with empty values in CSV and TSV
      /maintainInsertionOrder                     insert the documents in the order of their appearance in the input
                                                  source. By default the insertions will be performed in an arbitrary
                                                  order. Setting this flag also enables the behavior of --stopOnError
                                                  and restricts NumInsertionWorkers to 1.
  /j, /numInsertionWorkers:&lt;number&gt;               number of insert operations to run concurrently
      /stopOnError                                halt after encountering any error during importing. By default,
                                                  mongoimport will attempt to continue through document validation and
                                                  DuplicateKey errors, but with this option enabled, the tool will stop
                                                  instead. A small number of documents may be inserted after
                                                  encountering an error even with this option enabled; use
                                                  --maintainInsertionOrder to halt immediately after an error
      /mode:[insert|upsert|merge|delete]          insert: insert only, skips matching documents. upsert: insert new
                                                  documents or replace existing documents. merge: insert new documents
                                                  or modify existing documents. delete: deletes matching documents
                                                  only. If upsert fields match more than one document, only one
                                                  document is deleted. (default: insert)
      /upsertFields:&lt;field&gt;[,&lt;field&gt;]*            comma-separated fields for the query part when --mode is set to
                                                  upsert or merge
      /writeConcern:&lt;write-concern-specifier&gt;     write concern options e.g. --writeConcern majority, --writeConcern
                                                  &#39;</span><span class="token punctuation">{</span>w: <span class="token number">3</span>, wtimeout: <span class="token number">500</span>, fsync: true, j: true<span class="token punctuation">}</span>&#39;
      /bypassDocumentValidation                   bypass document validation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function v(b,g){const a=r("ExternalLinkIcon");return i(),o("div",null,[c,d,n("p",null,[e("这个工具跟 mongo 的版本有关系，部分版本自带该工具包，比如下图的 4.x 版本，我用的 5.0 版本没有自带工具包，所以我需要先去官网下载工具包文件，然后把 bin 目录下的工具复制到 5.0 版本的 bin 目录下，才能进行数据的导出、导入操作。 工具包的下载地址为："),n("a",u,[e("mongo工具包下载地址"),l(a)]),e("，解压后把bin文件夹里的文件全部拷贝到 MongoDB 安装目录bin文件夹下。")]),m])}const k=t(p,[["render",v],["__file","mongo-2.html.vue"]]);export{k as default};
