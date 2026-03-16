package main

import (
	"os"

	"lockbox/internal/controllers"
	"lockbox/internal/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()
	origins := os.Getenv("CORS_ORIGINS")
	if origins == "" {
		origins = "http://localhost:5173,http://127.0.0.1:5173,http://localhost,http://127.0.0.1"
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET,POST,OPTIONS",
		AllowCredentials: true,
	}))

	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	if err := app.Listen(":" + port); err != nil {
		panic(err)
	}

}
