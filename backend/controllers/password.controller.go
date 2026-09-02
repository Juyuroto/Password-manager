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

	id := c.Param("id")
	var passwords models.Password

	result := config.DB.First(&passwords, id)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "Folder Not Found",})
		return
	}

	c.JSON(200, passwords)
	
}

func UpdatePasswordController(c *gin.Context) {
	
}

func DeletePasswordController(c *gin.Context) {

	id := c.Param("id")
	var password models.Password

	result := config.DB.First(&password, id)

	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Password Not Found"})
		return
	}

	config.DB.Delete(&password)

	c.JSON(200, gin.H{"error": "Password Deleted Successfully"})
	
}

func CreatePasswordController(c *gin.Context) {

	var password models.Password
	c.BindJSON(&password)

}