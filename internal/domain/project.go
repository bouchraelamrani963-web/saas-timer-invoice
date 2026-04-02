package domain

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID          string    `json:"id"`
	UserID      string    `json:"user_id"`
	Name        string    `json:"name"`
	ClientName  string    `json:"client_name"`
	ClientEmail string    `json:"client_email"`
	HourlyRate  float64   `json:"hourly_rate"`
	Currency    string    `json:"currency"`
	CreatedAt   time.Time `json:"created_at"`
}

func NewProject(userID, name, clientName, clientEmail string, hourlyRate float64, currency string) *Project {
	if currency == "" {
		currency = "USD"
	}
	return &Project{
		ID:          uuid.New().String(),
		UserID:      userID,
		Name:        name,
		ClientName:  clientName,
		ClientEmail: clientEmail,
		HourlyRate:  hourlyRate,
		Currency:    currency,
		CreatedAt:   time.Now().UTC(),
	}
}
