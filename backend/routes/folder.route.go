package routes

import (
	"lockbox/controllers"

	"github.com/gin-gonic/gin"
)

func FolderRoute(router *gin.Engine) {

	router.GET("/folders", controllers.GetAllFolderController)
	router.GET("/folders/:id", controllers.GetFolderByIDController)
	router.GET("/folders/:id/passwords", controllers.GetFolderPasswordsController)
	router.POST("/folders", controllers.CreateFolderController)
	router.DELETE("/folders/:id", controllers.DeleteFolderController)
	router.PUT("/folders/:id", controllers.UpdateFolderController)
	
}