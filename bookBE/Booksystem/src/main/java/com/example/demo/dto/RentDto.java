package com.example.demo.dto;

import lombok.Data;

@Data
public class RentDto {
	private int no;
	private String title;
	private String writer;
	private int price;
	private String reg_date;
	private int usebook;
	private String img;
	private int book_no;
	private int user_no;
	private String user_id;
	private String rent_date;
	private String return_date;
}
