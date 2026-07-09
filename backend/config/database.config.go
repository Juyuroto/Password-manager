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

	db.AutoMigrate(&models.User{})

	if db.Migrator().HasTable(&models.User{}) {
		log.Println("Table 'users' bien créée")
	} else {
			log.Fatal("La table 'users' n'a pas été créée")
	}

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