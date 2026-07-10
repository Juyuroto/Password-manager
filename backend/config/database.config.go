package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"lockbox/models"
	"lockbox/services"
)

var DB *gorm.DB

func DatbaseConnexion() {
	host := os.Getenv("PostgreHost")
	user := os.Getenv("PostgreUser")
	password := os.Getenv("PostgrePassword")
	dbname := os.Getenv("PostgreName")
	port := os.Getenv("PostgrePort")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s",
		host, user, password, dbname, port)
	
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	if err != nil {
		log.Fatal("Impossible de se connecter à la base de données :", err)
	}

	err = db.AutoMigrate(&models.User{}, &models.Folder{}, &models.Password{})

	if err != nil {
		log.Fatal("Erreur lors de la migration des tables : ", err)
	}

	log.Println("Les tables ont bien été créées !")

	DB = db

	seedDefaultUser()
}

func seedDefaultUser() {
	var count int64
	DB.Model(&models.User{}).Count(&count)

	if count == 0 {
		hashedPassword, err := services.HashPassword(os.Getenv("DEFAULT_USER_PASSWORD"))
		if err != nil {
			log.Fatalf("Erreur hash mot de passe : %v", err)
		}

		defaultUser := models.User{
			Name:     os.Getenv("DEFAULT_USER_NAME"),
			Password: hashedPassword,
		}

		if err := DB.Create(&defaultUser).Error; err != nil {
			log.Fatalf("Erreur création utilisateur par défaut : %v", err)
		}
		log.Println("Utilisateur par défaut créé")
	} else {
		log.Println("Utilisateur déjà présent, pas de création")
	}
}