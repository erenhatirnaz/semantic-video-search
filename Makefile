port = 8000
start-server:
	cd dist/ && python -m SimpleHTTPServer $(port)
