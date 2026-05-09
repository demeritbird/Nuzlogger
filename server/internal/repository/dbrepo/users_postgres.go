package dbrepo

import (
	"chaos-xiangqi-server/internal/models"
	"context"
	"database/sql"
	"time"
)

const dbTimeout = time.Second * 3

type PostgresDBRepo struct {
	DB *sql.DB
}

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) CreateUser(user *models.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `INSERT INTO users (username, email, pintoken, created_at, updated_at) 
              VALUES ($1, $2, $3, $4, $5) RETURNING id`

	var userID int
	err := m.DB.QueryRowContext(ctx, query, user.Username, user.Email, user.PinToken, time.Now(), time.Now()).Scan(&userID)
	if err != nil {
		return err
	}

	user.ID = userID
	return nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, username, pintoken,
		created_at, updated_at from users where id = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.Username,
		&user.PinToken,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) GetUserByUsername(username string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, username, pintoken,
		created_at, updated_at from users where username = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, username)
	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.Username,
		&user.PinToken,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
