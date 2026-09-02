package routes

import(
	"github.com/gin-gonic/gin"
	"lockbox/controllers"
)

func FolderRoute(router *gin.Engine) {

	router.GET("/folders", controllers.GetAllFolderController)
	router.GET("/folders/:id", controllers.GetFolderByIDController)
	router.GET("/folders/:id/number", controllers.GetFolderNumberPasswordController)
	router.GET("/folders/:id/passwords", controllers.GetFolderPasswordsController)
	router.POST("/folders", controllers.CreateFolderController)
	router.DELETE("/folders/:id", controllers.DeleteFolderController)
	router.PUT("/folders/:id", controllers.UpdateFolderController)
	
}