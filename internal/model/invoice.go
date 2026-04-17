package model

import "time"

// Invoice represents a billable invoice.
type Invoice struct {
	ID          string      `json:"id"`
	UserID      string      `json:"user_id"`
	ClientName  string      `json:"client_name"`
	Items       []LineItem  `json:"items"`
	TotalCents  int64       `json:"total_cents"`
	Currency    string      `json:"currency"`
	IssuedAt    time.Time   `json:"issued_at"`
	DueAt       time.Time   `json:"due_at"`
	PaidAt      *time.Time  `json:"paid_at,omitempty"`
}

// LineItem is a single billable line on an invoice.
type LineItem struct {
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
	UnitCents   int64  `json:"unit_cents"`
}
