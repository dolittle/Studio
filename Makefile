DEVELOPMENT_CUSTOMER_ID ?= 453e04a7-4f9d-42f2-b36c-d51fa2c83fa3
DEVELOPMENT_USER_ID ?= local-dev

develop-frontend:
	cd Source/SelfService/Web && \
	yarn start:dev

develop-backend:
	cd Source/SelfService/Backend && \
	HEADER_SECRET="FAKE" \
	PLATFORM_API="localhost:8081" \
	DEVELOPMENT_CUSTOMER_ID="${DEVELOPMENT_CUSTOMER_ID}" \
	DEVELOPMENT_USER_ID="${DEVELOPMENT_USER_ID}" \
	go run main.go

develop-bridge-frontend:
	cd Source/Bridge/bridge-frontend && \
	yarn dev
