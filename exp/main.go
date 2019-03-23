package main

import (
	"fmt"

	"github.com/LIYINGZHEN/gollery/rand"
)

func main() {
	fmt.Println(rand.String(10))
	fmt.Println(rand.RememberToken())
}
