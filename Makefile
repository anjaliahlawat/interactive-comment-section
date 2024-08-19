KEYWORD=FIXED

run:build
	docker run -rm interactive-release-action $(KEYWORD)

build:
	docker build --tag interactive-release-action .

test:
	./entrypoint.sh $(KEYWORD)