package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/domain"
	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/store"
)

type Handler struct {
	timers   *store.TimerStore
	invoices *store.InvoiceStore
	projects *store.ProjectStore
}

func New(timers *store.TimerStore, invoices *store.InvoiceStore, projects *store.ProjectStore) *Handler {
	return &Handler{timers: timers, invoices: invoices, projects: projects}
}

func (h *Handler) Routes() *http.ServeMux {
	mux := http.NewServeMux()

	// Projects
	mux.HandleFunc("POST /projects", h.createProject)
	mux.HandleFunc("GET /projects/{id}", h.getProject)
	mux.HandleFunc("DELETE /projects/{id}", h.deleteProject)

	// Timers
	mux.HandleFunc("POST /timers", h.startTimer)
	mux.HandleFunc("GET /timers/{id}", h.getTimer)
	mux.HandleFunc("POST /timers/{id}/stop", h.stopTimer)
	mux.HandleFunc("DELETE /timers/{id}", h.deleteTimer)
	mux.HandleFunc("GET /projects/{id}/timers", h.listTimersByProject)

	// Invoices
	mux.HandleFunc("POST /invoices", h.createInvoice)
	mux.HandleFunc("POST /invoices/from-timers", h.createInvoiceFromTimers)
	mux.HandleFunc("GET /invoices/{id}", h.getInvoice)
	mux.HandleFunc("POST /invoices/{id}/send", h.sendInvoice)
	mux.HandleFunc("POST /invoices/{id}/mark-paid", h.markInvoicePaid)
	mux.HandleFunc("DELETE /invoices/{id}", h.deleteInvoice)

	// Health
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	return mux
}

// --- Projects ---

func (h *Handler) createProject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		UserID      string  `json:"user_id"`
		Name        string  `json:"name"`
		ClientName  string  `json:"client_name"`
		ClientEmail string  `json:"client_email"`
		HourlyRate  float64 `json:"hourly_rate"`
		Currency    string  `json:"currency"`
	}
	if err := decode(r, &req); err != nil {
		badRequest(w, err.Error())
		return
	}
	if req.UserID == "" || req.Name == "" {
		badRequest(w, "user_id and name are required")
		return
	}
	p := domain.NewProject(req.UserID, req.Name, req.ClientName, req.ClientEmail, req.HourlyRate, req.Currency)
	h.projects.Save(p)
	respond(w, http.StatusCreated, p)
}

func (h *Handler) getProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	p, err := h.projects.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	respond(w, http.StatusOK, p)
}

func (h *Handler) deleteProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.projects.Delete(id); err != nil {
		notFound(w)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// --- Timers ---

func (h *Handler) startTimer(w http.ResponseWriter, r *http.Request) {
	var req struct {
		UserID      string   `json:"user_id"`
		ProjectID   string   `json:"project_id"`
		Description string   `json:"description"`
		Tags        []string `json:"tags"`
	}
	if err := decode(r, &req); err != nil {
		badRequest(w, err.Error())
		return
	}
	if req.UserID == "" || req.ProjectID == "" {
		badRequest(w, "user_id and project_id are required")
		return
	}
	t := domain.NewTimer(req.UserID, req.ProjectID, req.Description, req.Tags)
	h.timers.Save(t)
	respond(w, http.StatusCreated, t)
}

func (h *Handler) getTimer(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	t, err := h.timers.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	respond(w, http.StatusOK, t)
}

func (h *Handler) stopTimer(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	t, err := h.timers.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	if err := t.Stop(); err != nil {
		badRequest(w, err.Error())
		return
	}
	h.timers.Save(t)
	respond(w, http.StatusOK, t)
}

func (h *Handler) deleteTimer(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.timers.Delete(id); err != nil {
		notFound(w)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) listTimersByProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	timers := h.timers.ListByProject(id)
	if timers == nil {
		timers = []*domain.Timer{}
	}
	respond(w, http.StatusOK, timers)
}

// --- Invoices ---

func (h *Handler) createInvoice(w http.ResponseWriter, r *http.Request) {
	var req domain.CreateInvoiceRequest
	if err := decode(r, &req); err != nil {
		badRequest(w, err.Error())
		return
	}
	if req.UserID == "" || req.ClientName == "" {
		badRequest(w, "user_id and client_name are required")
		return
	}
	inv := domain.NewInvoice(req)
	h.invoices.Save(inv)
	respond(w, http.StatusCreated, inv)
}

func (h *Handler) createInvoiceFromTimers(w http.ResponseWriter, r *http.Request) {
	var req struct {
		UserID      string    `json:"user_id"`
		ProjectID   string    `json:"project_id"`
		ClientName  string    `json:"client_name"`
		ClientEmail string    `json:"client_email"`
		Rate        float64   `json:"rate"`
		Currency    string    `json:"currency"`
		DueAt       time.Time `json:"due_at"`
	}
	if err := decode(r, &req); err != nil {
		badRequest(w, err.Error())
		return
	}
	if req.UserID == "" || req.ProjectID == "" || req.ClientName == "" {
		badRequest(w, "user_id, project_id and client_name are required")
		return
	}
	timers := h.timers.ListByProject(req.ProjectID)
	inv := domain.InvoiceFromTimers(req.UserID, req.ProjectID, req.ClientName, req.ClientEmail, req.Rate, req.Currency, req.DueAt, timers)
	h.invoices.Save(inv)
	respond(w, http.StatusCreated, inv)
}

func (h *Handler) getInvoice(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	inv, err := h.invoices.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	respond(w, http.StatusOK, inv)
}

func (h *Handler) sendInvoice(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	inv, err := h.invoices.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	if inv.Status != domain.InvoiceStatusDraft {
		badRequest(w, "only draft invoices can be sent")
		return
	}
	inv.Status = domain.InvoiceStatusSent
	h.invoices.Save(inv)
	respond(w, http.StatusOK, inv)
}

func (h *Handler) markInvoicePaid(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	inv, err := h.invoices.Get(id)
	if err != nil {
		notFound(w)
		return
	}
	if inv.Status == domain.InvoiceStatusVoid {
		badRequest(w, "voided invoices cannot be marked paid")
		return
	}
	inv.Status = domain.InvoiceStatusPaid
	h.invoices.Save(inv)
	respond(w, http.StatusOK, inv)
}

func (h *Handler) deleteInvoice(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.invoices.Delete(id); err != nil {
		notFound(w)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// --- helpers ---

func decode(r *http.Request, v any) error {
	return json.NewDecoder(r.Body).Decode(v)
}

func respond(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func badRequest(w http.ResponseWriter, msg string) {
	respond(w, http.StatusBadRequest, map[string]string{"error": msg})
}

func notFound(w http.ResponseWriter) {
	respond(w, http.StatusNotFound, map[string]string{"error": "not found"})
}

func isNotFound(err error) bool {
	return errors.Is(err, store.ErrNotFound)
}

var _ = isNotFound // used by callers
