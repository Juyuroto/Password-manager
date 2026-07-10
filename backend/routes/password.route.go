package routes

import(
	"github.com/gin-gonic/gin"
	"lockbox/controllers"
)

func PasswordRoute(router *gin.Engine) {

	router.GET("/passwords", controllers.GetAllPasswordController)
	router.GET("/passwords/:id", controllers.GetPasswordByIDController)
	router.PUT("/passwords/:id", controllers.UpdatePasswordController)
	router.DELETE("/passwords/:id", controllers.DeletePasswordController)
	router.POST("/passwords", controllers.CreatePasswordController)
	
}