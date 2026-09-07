package services

import(
	"log"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {

	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)

	return string(bytes), err

}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    log.Printf("[bcrypt] password: '%s' | hash: '%s' | err: %v", password, hash, err)
    return err == nil
}