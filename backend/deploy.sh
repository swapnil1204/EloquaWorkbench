#! /bin/bash
clear;
docker ps -a;
docker stop backend_c;
docker rm backend_c;
docker rmi backend;
docker build -t backend .;
docker run -p 8066:8080 --name backend_c -d backend;