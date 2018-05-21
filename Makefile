FUSEKI = "/home/erenhatirnaz/tools/apache-jena-fuseki/fuseki"

WEB_APP_DIR = "dist/"
WEB_APP_PORT = 8080

STATUS = $(shell $(FUSEKI) status)

RED = "\033[0;31m"
GREEN = "\033[0;32m"
BLUE = "\033[0;34m"
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
	@echo $(BLUE)
	$(FUSEKI) start
	@echo $(RESET)
endif

stop-fuseki: fuseki-status
ifneq ("$(STATUS)", " * Fuseki is not running")
	@echo $(BLUE)
	$(FUSEKI) stop
	@echo $(RESET)
endif

start-web-app: start-fuseki
	@echo $(GREEN)
	cd $(WEB_APP_DIR) && python -m SimpleHTTPServer $(WEB_APP_PORT)
	@echo $(RESET)

