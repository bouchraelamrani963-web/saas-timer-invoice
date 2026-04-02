package service

import "github.com/bouchraelamrani963-web/saas-timer-invoice/internal/model"

// TimerService defines business logic for timer operations.
type TimerService interface {
	List(userID string) ([]model.Timer, error)
	Create(t model.Timer) (model.Timer, error)
	Stop(id string) (model.Timer, error)
}
