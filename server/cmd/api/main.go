package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	//// Set Application Config ////
	var app application
	app.Domain = "nuzlogger.com"

	//// Read from Command Line ////

	//// Connect to the Database ////

	//// Start a Web Server ////'
	log.Println("Starting Server on Port", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}

}
