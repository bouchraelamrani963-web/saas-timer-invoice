package handler

import (
	"encoding/json"
	"net/http"

	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/model"
)

func listInvoices(w http.ResponseWriter, r *http.Request) {
	invoices := []model.Invoice{}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(invoices)
}

func createInvoice(w http.ResponseWriter, r *http.Request) {
	var inv model.Invoice
	if err := json.NewDecoder(r.Body).Decode(&inv); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(inv)
}
