package store

import (
	"errors"
	"sync"

	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/domain"
)

var (
	ErrNotFound = errors.New("not found")
	ErrConflict = errors.New("already exists")
)

// TimerStore is an in-memory store for timers.
type TimerStore struct {
	mu     sync.RWMutex
	timers map[string]*domain.Timer
}

func NewTimerStore() *TimerStore {
	return &TimerStore{timers: make(map[string]*domain.Timer)}
}

func (s *TimerStore) Save(t *domain.Timer) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.timers[t.ID] = t
}

func (s *TimerStore) Get(id string) (*domain.Timer, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	t, ok := s.timers[id]
	if !ok {
		return nil, ErrNotFound
	}
	return t, nil
}

func (s *TimerStore) ListByUser(userID string) []*domain.Timer {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var result []*domain.Timer
	for _, t := range s.timers {
		if t.UserID == userID {
			result = append(result, t)
		}
	}
	return result
}

func (s *TimerStore) ListByProject(projectID string) []*domain.Timer {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var result []*domain.Timer
	for _, t := range s.timers {
		if t.ProjectID == projectID {
			result = append(result, t)
		}
	}
	return result
}

func (s *TimerStore) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.timers[id]; !ok {
		return ErrNotFound
	}
	delete(s.timers, id)
	return nil
}

// InvoiceStore is an in-memory store for invoices.
type InvoiceStore struct {
	mu       sync.RWMutex
	invoices map[string]*domain.Invoice
}

func NewInvoiceStore() *InvoiceStore {
	return &InvoiceStore{invoices: make(map[string]*domain.Invoice)}
}

func (s *InvoiceStore) Save(inv *domain.Invoice) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.invoices[inv.ID] = inv
}

func (s *InvoiceStore) Get(id string) (*domain.Invoice, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	inv, ok := s.invoices[id]
	if !ok {
		return nil, ErrNotFound
	}
	return inv, nil
}

func (s *InvoiceStore) ListByUser(userID string) []*domain.Invoice {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var result []*domain.Invoice
	for _, inv := range s.invoices {
		if inv.UserID == userID {
			result = append(result, inv)
		}
	}
	return result
}

func (s *InvoiceStore) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.invoices[id]; !ok {
		return ErrNotFound
	}
	delete(s.invoices, id)
	return nil
}

// ProjectStore is an in-memory store for projects.
type ProjectStore struct {
	mu       sync.RWMutex
	projects map[string]*domain.Project
}

func NewProjectStore() *ProjectStore {
	return &ProjectStore{projects: make(map[string]*domain.Project)}
}

func (s *ProjectStore) Save(p *domain.Project) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.projects[p.ID] = p
}

func (s *ProjectStore) Get(id string) (*domain.Project, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	p, ok := s.projects[id]
	if !ok {
		return nil, ErrNotFound
	}
	return p, nil
}

func (s *ProjectStore) ListByUser(userID string) []*domain.Project {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var result []*domain.Project
	for _, p := range s.projects {
		if p.UserID == userID {
			result = append(result, p)
		}
	}
	return result
}

func (s *ProjectStore) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.projects[id]; !ok {
		return ErrNotFound
	}
	delete(s.projects, id)
	return nil
}
