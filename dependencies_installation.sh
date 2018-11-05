#!/bin/sh

echo ">> Installing libraries on swagger_ui function"
cd swagger_ui
npm install
cd ..

echo ">> Installing libraries on swagger_json_fetcher function"
cd swagger_json_fetcher
npm install
cd ..
