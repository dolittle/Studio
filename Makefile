DEVELOPMENT_CUSTOMER_ID ?= 453e04a7-4f9d-42f2-b36c-d51fa2c83fa3
DEVELOPMENT_USER_ID ?= local-dev

develop-frontend:
	cd Source/SelfService/Web && \
	yarn start:dev

develop-backend:
	cd Source/SelfService/Backend && \
	HEADER_SECRET="FAKE" \
	PROXY='{"/": "localhost:8081", "/bridge/": "127.0.0.1:5000"}' \
	SET_HEADERS='{"/bridge/": {"X-Organization-ID": "{{.Header.Get \"Tenant-ID\"}}", "Tenant-ID": "08831584-e016-42f6-bc5e-c4f098fed42b", "Authorization": "Bearer eyyyyyy"}}' \
	DEVELOPMENT_CUSTOMER_ID="${DEVELOPMENT_CUSTOMER_ID}" \
	DEVELOPMENT_USER_ID="${DEVELOPMENT_USER_ID}" \
	go run main.go
