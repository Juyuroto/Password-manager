package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type JWTAuth interface {
	IsAccessTokenValid(token string) (bool, error)
}

func ValidateAccessToken(jwtAuth JWTAuth) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			auth := req.Header.Get("Authorization")
			if auth == "" {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "missing or malformed token"})
			}

			token := strings.TrimSpace(strings.Replace(auth, "Bearer", "", 1))
			if token == "" {
				return c.JSON(http.StatusForbidden, map[string]string{"message": "missing or malformed token"})
			}

			isValid, err := jwtAuth.IsAccessTokenValid(token)
			if !isValid || err != nil {
				if err != nil {
					fmt.Printf("failed to validate token: %v", err)
				}
				return c.JSON(http.StatusForbidden, map[string]string{"message": "invalid or expired token"})
			}
			return next(c)
		}
	}
}
