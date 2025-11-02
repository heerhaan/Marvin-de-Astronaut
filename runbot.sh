while :
do
    git checkout .
    git pull
	npm install
    node marvin.js
    echo "Marvin is dood. Lang leve Marvin."
done