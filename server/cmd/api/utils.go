package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

type Status string

const (
	Success Status = "success"
	Error   Status = "error"
)

type JSONResponse struct {
	Status  Status      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// example:
// err := app.writeJSON(w, http.StatusOK, payload)
func (app *application) writeJSON(w http.ResponseWriter, status int, data interface{}, headers ...http.Header) error {
	out, err := json.Marshal(data)
	if err != nil {
		return err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			w.Header()[key] = value
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_, err = w.Write(out)

	if err != nil {
		return err
	}

	return nil
}

// example:
// err := app.readJSON(w, r, &requestPayload)
func (app *application) readJSON(w http.ResponseWriter, r *http.Request, data interface{}) error {
	maxBytes := 1024 * 1024 // one megabyte
	r.Body = http.MaxBytesReader(w, r.Body, int64(maxBytes))

	dec := json.NewDecoder(r.Body)

	dec.DisallowUnknownFields()

	err := dec.Decode(data)
	if err != nil {
		return err
	}

	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		return errors.New("body must only contain a single JSON value")
	}

	return nil
}

func (app *application) successJSON(w http.ResponseWriter, status int, data interface{}) error {
	var payload JSONResponse
	payload.Status = "success"
	payload.Data = data

	return app.writeJSON(w, status, payload)
}

func (app *application) errorJSON(w http.ResponseWriter, err error, status ...int) error {
	statusCode := http.StatusBadRequest

	if len(status) > 0 {
		statusCode = status[0]
	}

	var payload JSONResponse
	payload.Status = "error"
	payload.Message = err.Error()

	return app.writeJSON(w, statusCode, payload)
}
