package repository

import (
	"database/sql"
	"nuzlogger-server/internal/models"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	CreateUser(user *models.User) error
	GetUserByID(id int) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
}
