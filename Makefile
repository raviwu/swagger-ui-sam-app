# Common settings
include Makefile.settings

.PHONY: all install unit-test start

start:
	sam local start-api

install:
	${INFO} "Installing Dependencies"
	cd swagger_ui && npm install
	cd swagger_json_fetcher && npm install

unit-test:
	${INFO} "Running Unit Tests"
	cd swagger_ui && npm run test

all: install unit-test
