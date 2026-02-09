package main

import (
	"fmt"
	"log"
	"net/http"
	repository "nuzlogger-server/internal"
	"nuzlogger-server/internal/dbrepo"
	"os"

	"github.com/joho/godotenv"
)

const port = 8080

type application struct {
	Domain string
	DSN    string
	DB     repository.DatabaseRepo
}

func main() {
	// Load env file
	if os.Getenv("LOCAL_ENV") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	//// Set Application Config ////
	var app application
	app.Domain = "nuzlogger.com"
	app.DSN = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s timezone=UTC connect_timeout=5",
		os.Getenv("DATABASE_HOST"),
		os.Getenv("DATABASE_PORT"),
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PASS"),
		os.Getenv("DATABASE_NAME"),
		os.Getenv("DATABASE_SSLMODE"),
	)

	//// Read from Command Line ////

	//// Connect to the Database ////
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	//// Start a Web Server ////'
	log.Println("Starting Server on Port", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
