package domain

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type TimerStatus string

const (
	TimerStatusRunning TimerStatus = "running"
	TimerStatusStopped TimerStatus = "stopped"
)

type Timer struct {
	ID          string      `json:"id"`
	UserID      string      `json:"user_id"`
	ProjectID   string      `json:"project_id"`
	Description string      `json:"description"`
	StartedAt   time.Time   `json:"started_at"`
	StoppedAt   *time.Time  `json:"stopped_at,omitempty"`
	Status      TimerStatus `json:"status"`
	Tags        []string    `json:"tags,omitempty"`
}

func NewTimer(userID, projectID, description string, tags []string) *Timer {
	return &Timer{
		ID:          uuid.New().String(),
		UserID:      userID,
		ProjectID:   projectID,
		Description: description,
		StartedAt:   time.Now().UTC(),
		Status:      TimerStatusRunning,
		Tags:        tags,
	}
}

func (t *Timer) Stop() error {
	if t.Status == TimerStatusStopped {
		return errors.New("timer is already stopped")
	}
	now := time.Now().UTC()
	t.StoppedAt = &now
	t.Status = TimerStatusStopped
	return nil
}

func (t *Timer) Duration() time.Duration {
	if t.StoppedAt != nil {
		return t.StoppedAt.Sub(t.StartedAt)
	}
	return time.Since(t.StartedAt)
}

func (t *Timer) Hours() float64 {
	return t.Duration().Hours()
}
