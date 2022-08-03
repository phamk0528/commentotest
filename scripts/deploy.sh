export APP=playitright.tv
export DOCKER=web
export DIR=/var/www
export DIST=$DIR/nginx/html/$APP
export TAR=/tmp/$APP.tar.gz

# stop web docker
docker stop $DOCKER

# clean directory
rm -rf $DIST && mkdir -p $DIST

# untar to web folder
tar -zxvf $TAR -C $DIST

# start web docker
docker start $DOCKER
