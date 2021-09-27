develop-backend-mock:
	cd Source/SelfService/BackendMock && \
	yarn start:dev

develop-frontend:
	cd Source/SelfService/Web && \
	yarn start:dev

develop-backend:
	HEADER_SECRET="FAKE" \
	PLATFORM_API="localhost:8081" \
	DEVELOPMENT_TENANT_ID="453e04a7-4f9d-42f2-b36c-d51fa2c83fa3" \
	DEVELOPMENT_USER_ID="local-dev" \
	go run main.go

clean-local-dev:
	kubectl delete all --all -n application-11b6cf47-5d9f-438f-8116-0d9828654657
	rm -r /tmp/dolittle-local-dev || true
	mkdir -p /tmp/dolittle-local-dev
	cd /tmp/dolittle-local-dev && git init && cd -
	cp -r Environment/k3d/git/* /tmp/dolittle-local-dev
	cd Environment/k3d/k8s && kubectl apply -f namespace.yml -f rbac.yml -f tenants.yml -f mongo.yml && cd -
