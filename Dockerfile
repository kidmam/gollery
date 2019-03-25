# Start from golang v1.11 base image
FROM golang:1.12

# Add Maintainer Info
LABEL maintainer="Max Li <maxlivinci@gmail.com>"

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Set the Current Working Directory inside the container
WORKDIR $GOPATH/src/gollery

COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only

# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

RUN go build -v -o gollery

# This container exposes port 8080 to the outside world
EXPOSE 3000

# Run the executable
ENTRYPOINT ["./gollery"]
CMD []
