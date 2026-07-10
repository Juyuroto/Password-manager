package models

import "gorm.io/gorm"

type Folder struct {
	gorm.Model
	Name      string     `gorm:"not null" json:"name"`
	Passwords []Password `json:"passwords"`
}

type Password struct {
	gorm.Model
	Title    string `gorm:"not null" json:"title"`
	Password string `gorm:"not null" json:"password"`
	Lenght	 int 	`gorm:"not null" json:"longueur"`

	FolderID uint   `json:"folder_id"`
	Folder   Folder `json:"folder"`
}