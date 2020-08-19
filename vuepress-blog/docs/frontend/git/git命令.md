# git命令

## git配置

```bash
git config --global user.name "caomey"
git config --global user.email "2728162291@qq.com"
```

## 初始化

```bash
git init //在本地生成.git文件夹，建立暂存区
```

## 工作区=>暂存区

```bash
git add 文件名
git add . // 提交当前目录所有的文件
git commit -m "提交的描述"
```

查看工作区状态

```bash
git status
```

从暂存区恢复文件到工作区

```bash
git checkout 文件
```

查看工作区和暂存区版本区别

```bash
git diff
```

查看提交到暂存区的历史版本

```bash
git log
```

恢复文件到指定个的某一个版本

```bash
git reset --hard 当前版本号
```

## 暂存区=>远程仓库

授权：生成ssh密匙

```bash
ssh-keygen -t rsa -C "邮箱地址"
```

本地找到密匙，在Github，setting => SSH and GPG keys

### 第一次提交

```bash
git  remote add origin "仓库地址"
git push -u origin marster
```

### 第二次提交

```bash
git add .
git push
```

### 从远程克隆到本地

```bash
git clone 
```

### 从远程更新代码到本地

```bash
git pull
```



## 多人合作时git流程

1. git add . 提交所有改动文件到暂存区

2. git commit  -m "update" 添加文件更改备注

3. git pull 拉取同事修改的代码,解决冲突

4. git push 解决冲突后将代码提交带仓库