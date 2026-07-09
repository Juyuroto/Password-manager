package controllers

import (
	"lockbox/models"
	"lockbox/services"
	"lockbox/config"

	"github.com/gin-gonic/gin"
)

func GetUserController(c *gin.Context) {
	
	user := []models.User{}
	config.DB.Find(&user)
	c.JSON(200, &user)
	
}

func LoginUserController(c *gin.Context) {
	
	var input struct {
        Name    string `json:"name"`
        Password string `json:"password"`
    }
    
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": "Données invalides"})
        return
    }
    
    var user models.User
    if err := config.DB.Where("name = ?", input.Name).First(&user).Error; err != nil {
    	c.JSON(401, gin.H{"error": "Utilisateur non trouvé"})
    	return
    }
    
    if !services.CheckPasswordHash(input.Password, user.Password) {
        c.JSON(401, gin.H{"error": "Identifiants incorrects"})
        return
    }

    newToken, _ := services.GenerateToken(user.Name)

    config.DB.Model(&user).Update("Token", newToken)
        
    c.JSON(200, gin.H{
    	"message": "Connexion réussie",
     	"token": newToken,
    	"user": gin.H{
        	"id": user.ID,
        	"name": user.Name,
    	},
    })
}