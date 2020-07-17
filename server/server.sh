docker build -t nodewebserver .

docker run \
-p 5000:8080 \
-d --name nodeserver \
nodewebserver