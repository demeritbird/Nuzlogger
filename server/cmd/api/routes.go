package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	// init router mux
	mux := chi.NewRouter()

	// middlewares
	mux.Use(middleware.Recoverer)

	// routes
	mux.Get("/", app.ping)

	return mux
}
