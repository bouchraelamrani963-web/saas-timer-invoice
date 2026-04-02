package handler

import (
	"encoding/json"
	"net/http"

	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/model"
)

func listTimers(w http.ResponseWriter, r *http.Request) {
	timers := []model.Timer{}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timers)
}

func createTimer(w http.ResponseWriter, r *http.Request) {
	var t model.Timer
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(t)
}
