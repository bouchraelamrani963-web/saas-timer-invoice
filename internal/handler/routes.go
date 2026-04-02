package handler

import "net/http"

// RegisterRoutes registers all HTTP routes on the given mux.
func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /health", healthCheck)
	mux.HandleFunc("GET /api/v1/timers", listTimers)
	mux.HandleFunc("POST /api/v1/timers", createTimer)
	mux.HandleFunc("GET /api/v1/invoices", listInvoices)
	mux.HandleFunc("POST /api/v1/invoices", createInvoice)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok"}`))
}
