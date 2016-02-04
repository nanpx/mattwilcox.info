#!/bin/sh -e

BASE=$(cd "$(dirname "$0")/../"; pwd)

rm -f $BASE/*.html

php -r "putenv('ENVIRONMENT=0'); require_once('$BASE/index.php');" > $BASE/render.html;
php -r "putenv('ENVIRONMENT=0'); require_once('$BASE/domani/index.php');" > $BASE/domani/render.html;

npm install
grunt

rm -f $BASE/render.html
rm -f $BASE/domani/render.html

exit;