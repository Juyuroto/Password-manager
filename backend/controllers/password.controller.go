package controllers

import (
	"lockbox/config"
	"lockbox/models"

	"github.com/gin-gonic/gin"
)

func GetAllPasswordController(c *gin.Context) {

	password := []models.Password{}
	config.DB.Find(&password)
	c.JSON(200, &password)

}

func GetPasswordByIDController(c *gin.Context) {
	
}

func UpdatePasswordController(c *gin.Context) {
	
}

func DeletePasswordController(c *gin.Context) {
	
}

func CreatePasswordController(c *gin.Context) {

	var password models.Password
	c.BindJSON(&password)

}