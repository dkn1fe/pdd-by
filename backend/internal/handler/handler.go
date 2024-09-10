package handler

import (
	"api/internal/servies"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Home(c echo.Context) error {
	res, err := servies.ReadJSONFile("storage.json")
	if err != nil {
		log.Panic(err)
	}

	return c.JSON(http.StatusOK, res)
}