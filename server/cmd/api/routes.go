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
	mux.Use(app.enableCORS)

	// routes
	mux.Get("/", app.ping)
	mux.Get("/refresh", app.refresh)
	mux.Post("/login", app.login)
	mux.Post("/signup", app.signup)
	mux.Get("/logout", app.logout)

	return mux
}
