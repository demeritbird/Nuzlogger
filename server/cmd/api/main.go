package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	//// Set Application Config ////
	var app application
	app.Domain = "nuzlogger.com"

	// Load env file
	if os.Getenv("LOCAL_ENV") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	//// Read from Command Line ////

	//// Connect to the Database ////

	//// Start a Web Server ////'
	log.Println("Starting Server on Port", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
