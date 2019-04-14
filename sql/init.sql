# 建立数据库
create database captain_chat;

# 切换数据库
use captain_chat;

# 建表
create table user (
	uid int not null primary key auto_increment comment '用户id',
    uname varchar(18) not null unique comment '用户名',
    password varchar(18) not null comment '密码'
);
