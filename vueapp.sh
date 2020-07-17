
# docker build -t vue .

# docker run \
# -p 3000:80 \
# -d --name vueApp \
# vue

# for development, mount the files to container instead of building images again and again
docker run \
-p 3000:80 \
-d --name vuenginxnew \
--mount type=bind,source=$HOME/Desktop/vue-app/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=$HOME/Desktop/vue-app/dist,target=/usr/share/nginx/html \
nginx