package services

import (
	"time"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(name string) (string, error) {
    claims := jwt.MapClaims{
        "name": name,
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte("ta_cle_secrete"))
}