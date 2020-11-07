如何把repo clone到本地
clone remote repo
step1: git clone https://github.com/UCSD-Code-Farmers/frondend.git


然后建立自己的分支
step2: git checkout -b [your branch name]

检查是否在自己的分支上
step3: git branch 

然后就可以在components里添加自己的directory

step4: git add 与 git commit

step5: 检查是否在自己的branch上，然后 git pull origin main

step6: git push

step7: 在repo里自己的branch上 pull request

========================================
tip: 如果要改动公共的code（比如不是自己建的file), 先git pull origin main 防止conclicts



========================================
npm install 
在通过npm安装任何包裹之前，请在 package.json 里找到dependencies，查找是否已经安装过


components
在src文件夹下
各类components 放在这里面，可根据需求创建创建subdirectory， 例如comment，post等

providers
在src文件夹下
用于放置各类providers



