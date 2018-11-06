# Common settings
include Makefile.settings

install:
	${INFO} "Installing Dependencies"
	$(shell npm --prefix ./swagger_ui install ./swagger_ui)
	$(shell npm --prefix ./swagger_json_fetcher install ./swagger_json_fetcher)
