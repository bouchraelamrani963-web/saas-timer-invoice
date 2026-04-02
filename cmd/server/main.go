package main

import (
	"log"
	"net/http"
	"os"

	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/handler"
	"github.com/bouchraelamrani963-web/saas-timer-invoice/internal/store"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	timers := store.NewTimerStore()
	invoices := store.NewInvoiceStore()
	projects := store.NewProjectStore()

	h := handler.New(timers, invoices, projects)

	log.Printf("saas-timer-invoice server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, h.Routes()); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
