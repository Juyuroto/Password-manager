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

func CreateUserController(c *gin.Context) {

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(400, gin.H{"error": "Invalid JSON data"})
        return
    }

	var existingUser models.User

	if err := config.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		c.JSON(409, gin.H{"error": "This email is already in use."})
		return
	}

	hashed, err := services.HashPassword(user.Password)
    if err != nil {
        c.JSON(500, gin.H{"error": "Error hashing the password"})
        return
    }
	user.Password = hashed

	userKey, err := services.GenerateUserKey()
	if err != nil {
		c.JSON(500, gin.H{"error": "Error creating the security key"})
		return
	}
	user.EncryptionKey = userKey

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Unable To Create User"})
		return
	}

	c.JSON(200, &user)
	
}

func LoginUserController(c *gin.Context) {
	
	var input struct {
        Email    	string 		`json:"email"`
        Password 	string 		`json:"password"`
    } 
    
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": "Invalid JSON data"})
        return
    }
    
    var user models.User
    if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
    	c.JSON(401, gin.H{"error": "Incorrect credentials"})
    	return
    }
    
    if !services.CheckPasswordHash(input.Password, user.Password) {
        c.JSON(401, gin.H{"error": "Incorrect password"})
        return
    }

    newToken, _ := services.GenerateToken(user.Email)

    config.DB.Model(&user).Update("Token", newToken)
        
    c.JSON(200, gin.H{
    	"message": "Login successful",
     	"token": newToken,
    	"user": gin.H{
        	"id": user.ID,
        	"email": user.Email,
    	},
    })
}

func DeleteUserController(c *gin.Context) {

	userID := c.MustGet("userID").(uint)

	if err := config.DB.Delete(&models.User{}, userID).Error; err != nil {
		c.JSON(500, gin.H{"error": "Unable to delete the user"})
		return
	}

	c.JSON(200, gin.H{"message": "User successfully deleted"})
	
}

func UpdateUserController(c *gin.Context) {

	var user models.User

	if err := config.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	var input struct {
        Password 	string 		`json:"password"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": "Invalid JSON data"})
        return
    }

    newHashedPassword, err := services.HashPassword(input.Password)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error hashing the new password"})
		return
	}

	if err := config.DB.Model(&user).Update("password", newHashedPassword).Error; err != nil {
		c.JSON(500, gin.H{"error": "Unable to update the password"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Password successfully updated",
	})
	
}