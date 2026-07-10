package services

import (
	"math/rand"
	"time"
)

const (
	lowerChars = "abcdefghijklmnopqrstuvwxyz"
	upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	digitChars = "0123456789"
	specialChars = "!@#$%^&*()_+-=[]{}\\|;':\",.<>/?`~"
)

func PasswordGenerator(passwordLength int) string {
	password := ""

	source := rand.NewSource(time.Now().UnixNano())
	rng := rand.New(source)

	for n := 0; n < passwordLength; n++ {

		randNum := rng.Intn(4)

        switch randNum {
        case 0:
            randCharNum := rng.Intn(len(lowerChars))
            password += string(lowerChars[randCharNum])
        case 1:
            randCharNum := rng.Intn(len(upperChars))
            password += string(upperChars[randCharNum])
        case 2:
            randCharNum := rng.Intn(len(digitChars))
            password += string(digitChars[randCharNum])
        case 3:
            randCharNum := rng.Intn(len(specialChars))
            password += string(specialChars[randCharNum])
        }
    }

    return password
}