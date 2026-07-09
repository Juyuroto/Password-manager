package routes

import(
	"github.com/gin-gonic/gin"
	"lockbox/controllers"
)

func UserRoute(router *gin.Engine) {
	
	router.GET("/user", controllers.GetUserController)
	router.POST("/login", controllers.LoginUserController)
	
}