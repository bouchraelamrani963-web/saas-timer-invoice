package service

import "github.com/bouchraelamrani963-web/saas-timer-invoice/internal/model"

// InvoiceService defines business logic for invoice operations.
type InvoiceService interface {
	List(userID string) ([]model.Invoice, error)
	Create(inv model.Invoice) (model.Invoice, error)
	MarkPaid(id string) (model.Invoice, error)
}
