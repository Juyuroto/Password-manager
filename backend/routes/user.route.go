package routes

import(
	"github.com/gin-gonic/gin"
	"lockbox/controllers"
)

func UserRoute(router *gin.Engine) {
	
	router.GET("/user", controllers.GetUserController)
	router.POST("/signup", controllers.CreateUserController)
	router.POST("/login", controllers.LoginUserController)
	router.DELETE("/user/:id", controllers.DeleteUserController)
	router.PUT("/user/:id", controllers.UpdateUserController)
	
}