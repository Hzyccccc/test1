
# 克隆项目
git clone http://203.100.87.14:8004/ikeep/ERAP.git

# 进入项目目录
cd ERAP

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
