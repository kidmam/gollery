package main

type a interface {
	run() string
}

type man struct {
	a
}

func main() {
	he := man{}
	he.run()
}
