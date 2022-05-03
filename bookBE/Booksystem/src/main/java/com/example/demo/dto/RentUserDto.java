package com.example.demo.dto;

import lombok.Data;

@Data
public class RentUserDto {
	private int book_no;
	private int user_no;
	private String name;
	private String team;
	private String return_date;

}
