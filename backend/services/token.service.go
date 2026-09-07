package services

import (
	"time"
    "os"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(name string) (string, error) {
    claims := jwt.MapClaims{
        "name": name,
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}