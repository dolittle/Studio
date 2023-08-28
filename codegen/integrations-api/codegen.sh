# generate petstore client in go
#docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml -g go -o /local/out/petstore/go

# curl the swagger.json for bridge-api
#curl https://inspiring-ritchie.dolittle.cloud/swagger/v1/swagger.json | jq

# generate inspiring-ritchie bridge-api client in typescript-fetch
#docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i https://inspiring-ritchie.dolittle.cloud/swagger/v1/swagger.json -g typescript-fetch -o /local/out/bridge-api/typescript-fetch

rm -rf in/integrations-api
rm -rf out/integrations-api

mkdir -p in/integrations-api
mkdir -p out/integrations-api/typescript-fetch

# wget the swagger.json for bridge-api localhost
# wget http://127.0.0.1:5000/swagger/v1/swagger.json -O ./in/integrations-api/swagger.json
wget https://inspiring-ritchie.dolittle.cloud/swagger/v1/swagger.json -O ./in/integrations-api/swagger.json

# generate bridge-api client in typescript-fetch
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/in/integrations-api/swagger.json -g typescript-fetch -o /local/out/integrations-api/typescript-fetch

# overwrite generated files to well-known folder
rm -rf ../../Source/SelfService/Web/apis/integrations/generated
mkdir -p ../../Source/SelfService/Web/apis/integrations/generated
cp -r out/integrations-api/typescript-fetch/ ../../Source/SelfService/Web/apis/integrations/generated
