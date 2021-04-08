CWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_PWD="$CWD"
WORKSPACE="${ROOT_PWD}/.dolittle/workspace.json"
LINES=$(cat $WORKSPACE | jq -rc '.ports[]')
for line in $LINES; do
    backendPort=$(echo $line | jq -r '.backend')
    webPort=$(echo $line | jq -r '.web')
    kill -9 $(lsof -ti tcp:$webPort) >/dev/null 2>&1
    kill -9 $(lsof -ti tcp:$backendPort) >/dev/null 2>&1
done

ps aux | grep 'yarn start:dev' | awk  '{print $2}' | xargs kill -9 >/dev/null 2>&1
ps aux | grep 'nodemon' | awk  '{print $2}' | xargs kill -9 >/dev/null 2>&1
ps aux | grep 'Studio/node_modules' | awk  '{print $2}' | xargs kill -9 >/dev/null 2>&1

for app in Portal Applications Events Data; do
    cd $ROOT_PWD
    cd  "Source/$app/Backend"
    yarn start:dev &

    cd $ROOT_PWD
    cd  "Source/$app/Web"
    yarn start:dev &
done
