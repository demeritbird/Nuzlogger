package dbrepo

import (
	"database/sql"
	"errors"
	"nuzlogger-server/internal/models"
	"time"
)

type TestDBRepo struct{}

func (m *TestDBRepo) Connection() *sql.DB {
	return nil
}

func (m *TestDBRepo) CreateUser(user *models.User) error {
	return nil
}

func (m *TestDBRepo) GetUserByID(id int) (*models.User, error) {
	if id == 1 {
		user := models.User{
			ID:        1,
			Username:  "Alyssa",
			Email:     "alyssa@example.com",
			PinToken:  "123456",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
		return &user, nil
	}
	return nil, errors.New("not found")
}

func (m *TestDBRepo) GetUserByUsername(username string) (*models.User, error) {
	if username == "admin@example.com" {
		user := models.User{
			ID:        1,
			Username:  "Alyssa",
			Email:     "alyssa@example.com",
			PinToken:  "123456",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
		return &user, nil
	}
	return nil, errors.New("not found")
}
