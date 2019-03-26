# Start from golang v1.12 base image
FROM golang:1.12 as builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Set the Current Working Directory inside the container
WORKDIR $GOPATH/src/gollery

COPY Gopkg.toml .
COPY Gopkg.lock .
RUN dep ensure --vendor-only

# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

# * CGO_ENABLED=0 to build a statically-linked executable
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app .


######## Start a new stage from scratch #######
FROM scratch

# set working directory
WORKDIR /go/src/gollery

# copy the binary from builder
COPY assets ./assets
COPY views  ./views
COPY --from=builder /app .

# This container exposes port 8080 to the outside world
EXPOSE 3000

# Run the executable
ENTRYPOINT ["./app"]
CMD []
