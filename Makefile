.PHONY: build run test lint tidy

BIN := bin/server

build:
	go build -o $(BIN) ./cmd/server

run: build
	./$(BIN)

test:
	go test ./...

lint:
	go vet ./...

tidy:
	go mod tidy
