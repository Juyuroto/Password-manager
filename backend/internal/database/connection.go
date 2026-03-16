package database

import (
	"errors"
	"fmt"
	"os"
	"time"

	"lockbox/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"
	}

	var connection *gorm.DB
	var err error
	for attempt := 1; attempt <= 10; attempt++ {
		connection, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}

		if attempt == 10 {
			panic("could not connect to the database")
		}

		fmt.Printf("database not ready (attempt %d/10), retrying...\n", attempt)
		time.Sleep(2 * time.Second)
	}

	DB = connection

	if err := connection.AutoMigrate(&models.User{}); err != nil {
		panic("could not migrate database")
	}

	if err := seedDefaultUser(connection); err != nil {
		panic("could not seed default user")
	}
}

func seedDefaultUser(db *gorm.DB) error {
	var existing models.User
	err := db.Order("id asc").First(&existing).Error
	if err == nil {
		return nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	password := os.Getenv("APP_LOGIN_PASSWORD")
	if password == "" {
		password = "lockbox123"
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return err
	}

	user := models.User{
		Name:     "Lockbox Admin",
		Email:    "admin@lockbox.local",
		Password: hash,
	}

	return db.Create(&user).Error
}
