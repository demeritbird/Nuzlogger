package models

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	PinToken  string `json:"pintoken"`
	CreatedAt string `json:"-"`
	UpdatedAt string `json:"-"`
}

type CurrentUser struct {
	ID          int    `json:"id"`
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
}

func (u *User) PinTokenMatches(inputToken string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(u.PinToken), []byte(inputToken))
	if err != nil {
		switch {
		// tokens do not match
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		// unknown error
		default:
			return false, err
		}
	}
	return true, nil
}
