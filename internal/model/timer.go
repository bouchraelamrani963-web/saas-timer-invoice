package model

import "time"

// Timer represents a time tracking entry.
type Timer struct {
	ID          string    `json:"id"`
	UserID      string    `json:"user_id"`
	Description string    `json:"description"`
	StartedAt   time.Time `json:"started_at"`
	StoppedAt   *time.Time `json:"stopped_at,omitempty"`
	DurationSec int64     `json:"duration_sec"`
}
