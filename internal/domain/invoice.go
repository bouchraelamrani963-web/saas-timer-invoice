package domain

import (
	"time"

	"github.com/google/uuid"
)

type InvoiceStatus string

const (
	InvoiceStatusDraft   InvoiceStatus = "draft"
	InvoiceStatusSent    InvoiceStatus = "sent"
	InvoiceStatusPaid    InvoiceStatus = "paid"
	InvoiceStatusVoid    InvoiceStatus = "void"
)

type LineItem struct {
	Description string  `json:"description"`
	Hours       float64 `json:"hours"`
	Rate        float64 `json:"rate"`
	Amount      float64 `json:"amount"`
	TimerIDs    []string `json:"timer_ids,omitempty"`
}

type Invoice struct {
	ID         string        `json:"id"`
	UserID     string        `json:"user_id"`
	ProjectID  string        `json:"project_id"`
	ClientName string        `json:"client_name"`
	ClientEmail string       `json:"client_email"`
	LineItems  []LineItem    `json:"line_items"`
	Total      float64       `json:"total"`
	Currency   string        `json:"currency"`
	Status     InvoiceStatus `json:"status"`
	IssuedAt   time.Time     `json:"issued_at"`
	DueAt      time.Time     `json:"due_at"`
	Notes      string        `json:"notes,omitempty"`
}

type CreateInvoiceRequest struct {
	UserID      string     `json:"user_id"`
	ProjectID   string     `json:"project_id"`
	ClientName  string     `json:"client_name"`
	ClientEmail string     `json:"client_email"`
	LineItems   []LineItem `json:"line_items"`
	Currency    string     `json:"currency"`
	DueAt       time.Time  `json:"due_at"`
	Notes       string     `json:"notes,omitempty"`
}

func NewInvoice(req CreateInvoiceRequest) *Invoice {
	var total float64
	for i := range req.LineItems {
		req.LineItems[i].Amount = req.LineItems[i].Hours * req.LineItems[i].Rate
		total += req.LineItems[i].Amount
	}
	currency := req.Currency
	if currency == "" {
		currency = "USD"
	}
	return &Invoice{
		ID:          uuid.New().String(),
		UserID:      req.UserID,
		ProjectID:   req.ProjectID,
		ClientName:  req.ClientName,
		ClientEmail: req.ClientEmail,
		LineItems:   req.LineItems,
		Total:       total,
		Currency:    currency,
		Status:      InvoiceStatusDraft,
		IssuedAt:    time.Now().UTC(),
		DueAt:       req.DueAt,
		Notes:       req.Notes,
	}
}

func InvoiceFromTimers(userID, projectID, clientName, clientEmail string, rate float64, currency string, dueAt time.Time, timers []*Timer) *Invoice {
	var items []LineItem
	for _, t := range timers {
		if t.Status != TimerStatusStopped {
			continue
		}
		timerIDs := []string{t.ID}
		items = append(items, LineItem{
			Description: t.Description,
			Hours:       t.Hours(),
			Rate:        rate,
			Amount:      t.Hours() * rate,
			TimerIDs:    timerIDs,
		})
	}
	req := CreateInvoiceRequest{
		UserID:      userID,
		ProjectID:   projectID,
		ClientName:  clientName,
		ClientEmail: clientEmail,
		LineItems:   items,
		Currency:    currency,
		DueAt:       dueAt,
	}
	return NewInvoice(req)
}
