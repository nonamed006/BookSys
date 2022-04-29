package com.example.demo.dto;

import lombok.Data;

@Data
public class RentMailDto {
	private int book_no;
	private String user_id;
	private String title;
	private String writer;
	private String rent_date;
}
