FUSEKI = "/home/erenhatirnaz/tools/apache-jena-fuseki/fuseki"
port = 8000

STATUS = $(shell $(FUSEKI) status)

RED = "\033[0;31m"
GREEN = "\033[0;32m"
RESET = "\033[0m"

ifeq ("$(STATUS)"," * Fuseki is not running")
	MESSAGE = "CURRENT STATUS: "$(RED)"Fuseki isn't running"$(RESET)
else
	MESSAGE = "CURRENT STATUS: "$(GREEN)"Fuseki is running"$(RESET)
endif

fuseki-status:
	@echo $(MESSAGE)

start-fuseki: fuseki-status
ifeq ("$(STATUS)"," * Fuseki is not running")
	$(FUSEKI) start
endif

stop-fuseki: fuseki-status
ifneq ("$(STATUS)", " * Fuseki is not running")
	$(FUSEKI) stop
endif

start-server:
	cd dist/ && python -m SimpleHTTPServer $(port)

