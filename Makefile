dev:
	go build -v -o gollery
	./gollery
docker:
	docker run --name pg -p 5432:5432 -d postgres
clean:
	rm -f gollery
test:
	go test --cover

help:
	@echo "dev - compile the source code and start"
	@echo "make clean - remove binary file and vim swp files"
