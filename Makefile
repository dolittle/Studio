DOLITTLE_CUSTOMER_ID ?= 453e04a7-4f9d-42f2-b36c-d51fa2c83fa3
DOLITTLE_USER_ID ?= local-dev

develop-backend-mock:
	cd Source/SelfService/BackendMock && \
	yarn start:dev

develop-frontend:
	cd Source/SelfService/Web && \
	yarn start:dev

develop-backend:
	cd Source/SelfService/Backend && \
	HEADER_SECRET="FAKE" \
	PLATFORM_API="localhost:8081" \
	DEVELOPMENT_TENANT_ID="${DOLITTLE_CUSTOMER_ID}" \
	DEVELOPMENT_USER_ID="${DOLITTLE_USER_ID}" \
	go run main.go
