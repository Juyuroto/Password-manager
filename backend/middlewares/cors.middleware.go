package middlewares

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func CorsMiddleware() gin.HandlerFunc{

	url := os.Getenv("FRONTEND_URL")
	
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", url)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization, Origin, Accept, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return 
		}

		c.Next()
	}
}