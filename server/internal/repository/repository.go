package repository

import (
	"chaos-xiangqi-server/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	CreateUser(user *models.User) error
	GetUserByID(id int) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
}
