#!/bin/bash
##!/data/data/com.termux/files/usr/bin/bash

prodrepo="grisner.github.io"
githuburl="git@github-privat:grisner.github.io/${prodrepo}.git"

if [ -d ./${prodrepo} ]; then
	git -C ./grisner.github.io pull
else
	git clone git@github-privat:grisner/grisner.github.io.git
	mkdir $prodrepo/thepanoply-preview/
fi

shopt -s extglob
cp -rf !($prodrepo|.git) $prodrepo/thepanoply-preview/
shopt -u extglob

git -C ./$prodrepo add .
git -C ./$prodrepo commit -m "deploy preview thepanoply.se"
git -C ./$prodrepo push
