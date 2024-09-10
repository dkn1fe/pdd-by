package server

import (
	"api/internal/handler"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct{
	*echo.Echo
}
func New() Server{
	e := echo.New()
	return Server{e}
}
func (s *Server) Run(){
	s.Use(middleware.Logger())

	s.GET("/", handler.Home)
	s.Logger.Panic(s.Start(":2020"))
}