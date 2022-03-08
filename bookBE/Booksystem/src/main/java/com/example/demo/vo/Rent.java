package com.example.demo.vo;

import lombok.Data;

@Data
public class Rent {

	private int book_no;
	private int user_no;
	private String user_id;
	private String rent_date;
	private String return_date;
}
