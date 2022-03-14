package com.example.demo.dto;

import lombok.Data;

@Data
public class CartDto {
	private int book_no;
	private String title;
	private int price;
	private String img;
	private int user_no;
	private String name;
	private String addr;
	private int cnt;
	
}
