package rand

import (
	"testing"
)

func TestString(t *testing.T) {
	v := "test"
	if v != "test" {
		t.Error("error")
	}
}
